import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

type JsonSchema = {
  readonly type?: string;
  readonly anyOf?: ReadonlyArray<JsonSchema>;
  readonly items?: JsonSchema;
  readonly additionalProperties?: boolean | JsonSchema;
  readonly properties?: Readonly<Record<string, JsonSchema>>;
  readonly required?: ReadonlyArray<string>;
  readonly enum?: ReadonlyArray<unknown>;
  readonly $ref?: string;
  readonly [key: string]: unknown;
};

type OpenApiDocument = {
  readonly components?: {
    readonly schemas?: Readonly<Record<string, JsonSchema>>;
  };
  readonly paths?: Readonly<Record<string, unknown>>;
};

type ErrorComponent = {
  readonly name: string;
  readonly tag: string;
  readonly properties: ReadonlyArray<{ readonly name: string; readonly required: boolean }>;
};

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const inputPath = resolve(root, "openapi.json");
const outputPath = resolve(root, "src/promises/errors.gen.ts");
const clientTypesPath = resolve(root, "src/client/types.gen.ts");
const publicTypesPath = resolve(root, "src/promises/types.gen.ts");
const document = JSON.parse(await readFile(inputPath, "utf8")) as OpenApiDocument;
const schemas = document.components?.schemas ?? {};
const schemaReferencePrefix = "#/components/schemas/";

const pointerToken = (value: string): string => value.replaceAll("~1", "/").replaceAll("~0", "~");

const dereferenceSchema = (schema: JsonSchema, stack: ReadonlyArray<string> = []): JsonSchema => {
  if (schema.$ref !== undefined) {
    if (!schema.$ref.startsWith(schemaReferencePrefix)) {
      throw new Error(`Unsupported OpenAPI schema reference: ${schema.$ref}`);
    }
    const name = pointerToken(schema.$ref.slice(schemaReferencePrefix.length));
    if (stack.includes(name)) {
      throw new Error(`Cyclic OpenAPI schema reference: ${[...stack, name].join(" -> ")}`);
    }
    const target = schemas[name];
    if (target === undefined)
      throw new Error(`Unresolved OpenAPI schema reference: ${schema.$ref}`);
    const { $ref: _, ...siblings } = schema;
    return dereferenceSchema({ ...target, ...siblings }, [...stack, name]);
  }
  return {
    ...schema,
    ...(schema.anyOf === undefined
      ? undefined
      : { anyOf: schema.anyOf.map((member) => dereferenceSchema(member, stack)) }),
    ...(schema.items === undefined ? undefined : { items: dereferenceSchema(schema.items, stack) }),
    ...(typeof schema.additionalProperties !== "object"
      ? undefined
      : { additionalProperties: dereferenceSchema(schema.additionalProperties, stack) }),
    ...(schema.properties === undefined
      ? undefined
      : {
          properties: Object.fromEntries(
            Object.entries(schema.properties).map(([name, property]) => [
              name,
              dereferenceSchema(property, stack),
            ]),
          ),
        }),
  };
};

const errors = Object.entries(schemas)
  .flatMap(([name, schema]): ReadonlyArray<ErrorComponent> => {
    const tags = schema.properties?._tag?.enum;
    if (tags?.length !== 1 || typeof tags[0] !== "string") return [];
    if (tags[0] !== name) {
      throw new Error(`OpenAPI error component ${name} declares mismatched _tag ${tags[0]}`);
    }
    const required = new Set(schema.required ?? []);
    return [
      {
        name,
        tag: tags[0],
        properties: Object.keys(schema.properties ?? {})
          .filter((property) => property !== "_tag" && property !== "message")
          .sort()
          .map((property) => ({ name: property, required: required.has(property) })),
      },
    ];
  })
  .sort((left, right) => left.name.localeCompare(right.name));

if (errors.length === 0) throw new Error("OpenAPI contains no tagged error components");

const schemaType = (input: JsonSchema): string => {
  if (input.$ref !== undefined) {
    const name = pointerToken(input.$ref.slice(schemaReferencePrefix.length));
    if (!input.$ref.startsWith(schemaReferencePrefix) || schemas[name] === undefined)
      throw new Error(`Unsupported OpenAPI schema reference: ${input.$ref}`);
    return `Wire.${name}`;
  }
  const schema = input;
  if (schema.anyOf !== undefined) return schema.anyOf.map(schemaType).join(" | ");
  if (schema.enum !== undefined && schema.enum.length > 0) {
    return schema.enum.map((value) => JSON.stringify(value)).join(" | ");
  }
  switch (schema.type) {
    case "string":
      return "string";
    case "number":
    case "integer":
      return "number";
    case "boolean":
      return "boolean";
    case "null":
      return "null";
    case "array":
      return `Array<${schemaType(schema.items ?? {})}>`;
    case "object": {
      if (schema.properties !== undefined) {
        const required = new Set(schema.required ?? []);
        const properties = Object.entries(schema.properties).map(
          ([name, property]) =>
            `readonly ${JSON.stringify(name)}${required.has(name) ? "" : "?"}: ${schemaType(property)}`,
        );
        return `{ ${properties.join("; ")} }`;
      }
      return typeof schema.additionalProperties === "object"
        ? `Record<string, ${schemaType(schema.additionalProperties)}>`
        : "Record<string, unknown>";
    }
    default:
      return "unknown";
  }
};

const responseErrorRefs = new Set<string>();
const visitResponses = (value: unknown, insideResponses = false): void => {
  if (Array.isArray(value)) {
    for (const child of value) visitResponses(child, insideResponses);
    return;
  }
  // oxlint-disable-next-line samva/no-hand-rolled-object-guard -- JSON.parse already established this traversal boundary; only object entry enumeration is required here.
  if (value === null || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    const inResponses = insideResponses || key === "responses";
    if (
      inResponses &&
      key === "$ref" &&
      typeof child === "string" &&
      child.startsWith("#/components/schemas/")
    ) {
      const component = child.slice("#/components/schemas/".length);
      if (schemas[component]?.properties?._tag?.enum !== undefined)
        responseErrorRefs.add(component);
    }
    visitResponses(child, inResponses);
  }
};
visitResponses(document.paths);

const generatedNames = new Set(errors.map((error) => error.name));
const missing = [...responseErrorRefs].filter((name) => !generatedNames.has(name)).sort();
if (missing.length > 0) {
  throw new Error(`Response error components lack generated classes: ${missing.join(", ")}`);
}

const tags = errors.map(({ tag }) => `  | "${tag}"`).join("\n");
const classes = errors
  .map(({ name, tag, properties }) => {
    const schema = schemas[name];
    const required = new Set(schema?.required ?? []);
    const payloadProperties = Object.entries(schema?.properties ?? {})
      .sort(([left], [right]) => left.localeCompare(right))
      .map(
        ([property, propertySchema]) =>
          `  readonly ${JSON.stringify(property)}${required.has(property) ? "" : "?"}: ${schemaType(propertySchema)};`,
      )
      .join("\n");
    const declarations = properties
      .map(
        ({ name: property, required: isRequired }) =>
          `  declare readonly ${JSON.stringify(property)}${isRequired ? "" : "?"}: ${schemaType(schema?.properties?.[property] ?? {})};`,
      )
      .join("\n");
    return `type ${name}Payload = {
${payloadProperties}
};

export class ${name} extends SamvaApiError<"${tag}"> {
  readonly _tag = "${tag}" as const;
${declarations.length > 0 ? `${declarations}\n` : ""}
  constructor(payload: Omit<${name}Payload, "_tag">, context: SamvaApiErrorContext = {}) {
    super(messageOf("${tag}", payload), context);
    Object.assign(this, payload);
  }
}`;
  })
  .join("\n\n");
const union = errors.map(({ name }) => `  | ${name}`).join("\n");
const registry = errors.map(({ name, tag }) => `  ${tag}: ${name},`).join("\n");
const schemaRegistry = errors
  .map(({ name, tag }) => `  ${tag}: ${JSON.stringify(dereferenceSchema(schemas[name] ?? {}))},`)
  .join("\n");

const source = `// @generated by scripts/generate-promise-errors.ts from openapi.json
// Do not edit directly.

import type * as Wire from "../client/types.gen";

export type SamvaApiErrorTag =
${tags};

export interface SamvaApiErrorContext {
  readonly request?: Request | undefined;
  readonly response?: Response | undefined;
}

const redactRequest = (request: Request | undefined): Request | undefined =>
  request === undefined
    ? undefined
    : new Request(request.url, {
        method: request.method,
      });

/** Base class for failures declared by the public Samva OpenAPI contract. */
export abstract class SamvaApiError<Tag extends SamvaApiErrorTag = SamvaApiErrorTag> extends Error {
  abstract readonly _tag: Tag;
  readonly request: Request | undefined;
  readonly response: Response | undefined;
  readonly status: number | undefined;

  protected constructor(message: string, context: SamvaApiErrorContext = {}) {
    super(message);
    this.name = new.target.name;
    this.request = redactRequest(context.request);
    this.response = context.response;
    this.status = context.response?.status;
  }
}

/** A transport or malformed-response failure that is not part of the API error contract. */
export class SamvaTransportError extends Error {
  readonly _tag = "SamvaTransportError" as const;
  readonly request: Request | undefined;
  readonly response: Response | undefined;
  readonly status: number | undefined;
  override readonly cause: unknown;

  constructor(cause: unknown, context: SamvaApiErrorContext = {}) {
    super(cause instanceof Error ? cause.message : "Samva request failed", { cause });
    this.name = "SamvaTransportError";
    this.cause = cause;
    this.request = redactRequest(context.request);
    this.response = context.response;
    this.status = context.response?.status;
  }
}

const messageOf = <Payload>(tag: SamvaApiErrorTag, payload: Payload): string => {
  const message = (payload as { readonly message?: unknown }).message;
  return typeof message === "string" ? message : tag;
};

${classes}

export type AnySamvaApiError =
${union};

type ErrorConstructor = new (
  payload: never,
  context?: SamvaApiErrorContext,
) => AnySamvaApiError;

const constructors = {
${registry}
} as const satisfies Record<SamvaApiErrorTag, ErrorConstructor>;

type RuntimeSchema = {
  readonly type?: string | ReadonlyArray<string>;
  readonly anyOf?: ReadonlyArray<RuntimeSchema>;
  readonly items?: RuntimeSchema;
  readonly additionalProperties?: boolean | RuntimeSchema;
  readonly properties?: Readonly<Record<string, RuntimeSchema>>;
  readonly required?: ReadonlyArray<string>;
  readonly enum?: ReadonlyArray<unknown>;
  readonly [key: string]: unknown;
};

const payloadSchemas = {
${schemaRegistry}
} as const satisfies Record<SamvaApiErrorTag, RuntimeSchema>;

const isRecord = (value: unknown): value is Readonly<Record<string, unknown>> =>
  typeof value === "object" && value !== null;

const matchesType = (value: unknown, type: string): boolean => {
  switch (type) {
    case "string":
      return typeof value === "string";
    case "number":
      return typeof value === "number" && Number.isFinite(value);
    case "integer":
      return typeof value === "number" && Number.isInteger(value);
    case "boolean":
      return typeof value === "boolean";
    case "null":
      return value === null;
    case "array":
      return Array.isArray(value);
    case "object":
      return isRecord(value) && !Array.isArray(value);
    default:
      return false;
  }
};

const matchesSchema = (value: unknown, schema: RuntimeSchema): boolean => {
  if (schema.anyOf !== undefined && !schema.anyOf.some((member) => matchesSchema(value, member))) {
    return false;
  }
  if (schema.enum !== undefined && !schema.enum.some((member) => Object.is(value, member))) {
    return false;
  }
  if (schema.type !== undefined) {
    const types = typeof schema.type === "string" ? [schema.type] : schema.type;
    if (!types.some((type) => matchesType(value, type))) return false;
  }
  const items = schema.items;
  if (Array.isArray(value) && items !== undefined) {
    return value.every((item) => matchesSchema(item, items));
  }
  if (!isRecord(value) || Array.isArray(value)) return true;
  if (schema.required?.some((key) => !Object.hasOwn(value, key)) === true) return false;
  const properties = schema.properties ?? {};
  for (const [key, propertySchema] of Object.entries(properties)) {
    if (Object.hasOwn(value, key) && !matchesSchema(value[key], propertySchema)) return false;
  }
  if (schema.additionalProperties === false) {
    if (Object.keys(value).some((key) => !Object.hasOwn(properties, key))) return false;
  } else if (typeof schema.additionalProperties === "object") {
    for (const [key, propertyValue] of Object.entries(value)) {
      if (!Object.hasOwn(properties, key) && !matchesSchema(propertyValue, schema.additionalProperties)) {
        return false;
      }
    }
  }
  return true;
};

/** Convert a decoded error payload into its generated JavaScript error class. */
export function fromApiError(
  error: unknown,
  context: SamvaApiErrorContext = {},
): AnySamvaApiError | SamvaTransportError {
  if (error instanceof SamvaApiError) return error as AnySamvaApiError;
  if (error instanceof SamvaTransportError) return error;
  if (isRecord(error) && typeof error._tag === "string" && Object.hasOwn(constructors, error._tag)) {
    const tag = error._tag as SamvaApiErrorTag;
    if (!matchesSchema(error, payloadSchemas[tag])) return new SamvaTransportError(error, context);
    const Constructor = constructors[tag];
    return new Constructor(error as never, context);
  }
  // A proxy in front of the API (Cloudflare, for api.samva.dev) replaces the body of a 504 with its
  // own page, so the API's typed deadline answer arrives as a bare status. It means the same thing:
  // the request did not finish in time, and a keyed write may still land.
  if (context.response?.status === 504) {
    const retryAfter = Number(context.response.headers.get("retry-after"));
    return new GatewayTimeoutError(
      {
        message: "The request did not finish in time. Retry with the same idempotency key.",
        retryAfterSeconds: Number.isInteger(retryAfter) && retryAfter > 0 ? retryAfter : 1,
      },
      context,
    );
  }
  return new SamvaTransportError(error, context);
}
`;

await writeFile(outputPath, source);
const clientTypes = await readFile(clientTypesPath, "utf8");
const publicTypeNames = [...clientTypes.matchAll(/^export type ([A-Za-z_$][\w$]*)/gm)]
  .map((match) => match[1])
  .filter((name) => !generatedNames.has(name) && !/^Union\d*$/.test(name));
if (publicTypeNames.length === 0) throw new Error("Hey API generated no public client types");
await writeFile(
  publicTypesPath,
  `// @generated by scripts/generate-promise-errors.ts from src/client/types.gen.ts
// Do not edit directly.

export type {
${publicTypeNames.map((name) => `  ${name},`).join("\n")}
} from "../client/types.gen";
`,
);
process.stdout.write(`Generated ${outputPath} (${errors.length} API error classes)\n`);
process.stdout.write(
  `Generated ${publicTypesPath} (${publicTypeNames.length} public wire types)\n`,
);
