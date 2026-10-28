import { toImplementation as renderHttpApi } from "@effect/openapi-generator/HttpApiTransformer";
import {
  makeDeepMutable,
  type ParsedOpenApi,
  type ParsedOpenApiSecurityScheme,
  type ParsedOperation,
  type ParsedOperationParameter,
  type ParsedOperationSecurityRequirement,
} from "@effect/openapi-generator/ParsedOperation";
import { JsonSchema, Predicate, SchemaRepresentation } from "effect";
import type {
  OpenAPISpecExternalDocs,
  OpenAPISpecLicense,
  OpenAPISpecMethodName,
  OpenAPISpecServer,
  OpenAPISpecServerVariable,
} from "effect/http-api/OpenApi";
import type { Json, JsonObject } from "effect/Schema";

import {
  decodeStringChecks,
  STRING_CHECKS_EXTENSION,
  type StringCheck,
  stringCheckRepresentations,
} from "./string-checks";

export interface SamvaOpenApiDocument extends JsonObject {
  readonly openapi: string;
  readonly info: JsonObject & { readonly title: string; readonly version: string };
  readonly paths: JsonObject;
  readonly components?: JsonObject;
}

export interface SpecialLeaf {
  readonly extension: "x-sensitive" | "x-samva-schema";
  readonly placeholder: JsonObject;
  readonly runtimeExport: string;
  readonly typeExpression: string;
  readonly encodedExpression: string;
}

/** The one registry used by substitution, rendering, and focused fixtures. */
export const SPECIAL_LEAVES = {
  SensitiveString: {
    extension: "x-sensitive",
    placeholder: { type: "string" },
    runtimeExport: "SensitiveString",
    typeExpression: "string | Redacted.Redacted<string>",
    encodedExpression: "string",
  },
  AbsoluteInstant: {
    extension: "x-samva-schema",
    placeholder: { type: "string", format: "date-time" },
    runtimeExport: "AbsoluteInstant",
    typeExpression: "Date",
    encodedExpression: "string",
  },
} as const satisfies Readonly<Record<string, SpecialLeaf>>;

type SpecialLeafName = keyof typeof SPECIAL_LEAVES;

interface StringSubstitution {
  readonly schema: JsonObject;
  readonly checks: readonly [StringCheck, ...Array<StringCheck>];
}

interface ErrorExtension {
  readonly name: string;
  readonly tag: string;
  readonly categories: ReadonlyArray<string>;
  readonly retryable: boolean;
  readonly body: JsonObject;
}

interface RuntimeSubstitution {
  readonly definitionName: string;
  readonly leafName: SpecialLeafName;
}

interface ExtensionBag {
  readonly brands: ReadonlyMap<string, string>;
  readonly strings: ReadonlyMap<string, StringSubstitution>;
  readonly errors: ReadonlyMap<string, ErrorExtension>;
  readonly runtimeSubstitutions: ReadonlyMap<string, RuntimeSubstitution>;
}

interface PreparedDocument {
  readonly document: SamvaOpenApiDocument;
  readonly extensions: ExtensionBag;
}

interface SchemaRoot {
  readonly name: string;
  readonly schema: JsonObject;
}

const methods: ReadonlyArray<OpenAPISpecMethodName> = [
  "get",
  "put",
  "post",
  "delete",
  "options",
  "head",
  "patch",
  "trace",
];

const isObject = (value: unknown): value is JsonObject => Predicate.isObject(value);

const nonEmptyString = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
};

const externalDocs = (value: unknown): OpenAPISpecExternalDocs | undefined => {
  if (!isObject(value) || typeof value.url !== "string") return undefined;
  const description = nonEmptyString(value.description);
  return { url: value.url, ...(description === undefined ? undefined : { description }) };
};

const license = (value: unknown): OpenAPISpecLicense | undefined => {
  if (!isObject(value) || typeof value.name !== "string") return undefined;
  const identifier = nonEmptyString(value.identifier);
  const url = nonEmptyString(value.url);
  return {
    name: value.name,
    ...(identifier === undefined ? undefined : { identifier }),
    ...(url === undefined ? undefined : { url }),
  };
};

const serverVariables = (value: unknown): Record<string, OpenAPISpecServerVariable> | undefined => {
  if (value === undefined) return undefined;
  if (!isObject(value)) throw new Error("Invalid OpenAPI server variables");
  return Object.fromEntries(
    Object.entries(value).map(([name, variable]) => {
      if (!isObject(variable) || typeof variable.default !== "string") {
        throw new Error(`Invalid OpenAPI server variable ${name}`);
      }
      const enumeration = Array.isArray(variable.enum)
        ? variable.enum.filter((item): item is string => typeof item === "string")
        : [];
      const description = nonEmptyString(variable.description);
      return [
        name,
        {
          default: variable.default,
          ...(enumeration.length === 0
            ? undefined
            : { enum: enumeration as [string, ...Array<string>] }),
          ...(description === undefined ? undefined : { description }),
        },
      ];
    }),
  );
};

const servers = (value: unknown): ReadonlyArray<OpenAPISpecServer> | undefined => {
  if (!Array.isArray(value)) return undefined;
  return value.map((server) => {
    if (!isObject(server) || typeof server.url !== "string")
      throw new Error("Invalid OpenAPI server");
    const description = nonEmptyString(server.description);
    const variables = serverVariables(server.variables);
    return {
      url: server.url,
      ...(description === undefined ? undefined : { description }),
      ...(variables === undefined ? undefined : { variables }),
    };
  });
};

const camelize = (value: string): string => {
  let output = "";
  let capitalize = false;
  for (const character of value) {
    const code = character.charCodeAt(0);
    const isLetter = (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
    const isDigit = code >= 48 && code <= 57;
    if (isLetter) {
      output += capitalize ? character.toUpperCase() : character;
      capitalize = false;
    } else if (isDigit && output.length > 0) {
      output += character;
      capitalize = true;
    } else if (output.length > 0) {
      capitalize = true;
    }
  }
  return output;
};

const identifier = (value: string): string => {
  const camelized = camelize(value);
  return camelized.length === 0 ? "_" : camelized.charAt(0).toUpperCase() + camelized.slice(1);
};

const pointerToken = (value: string): string => value.replaceAll("~1", "/").replaceAll("~0", "~");

const makeReferenceResolver =
  (document: SamvaOpenApiDocument) =>
  (reference: string): unknown => {
    if (!reference.startsWith("#/"))
      throw new Error(`Only local OpenAPI references are supported: ${reference}`);
    let current: unknown = document;
    for (const token of reference.slice(2).split("/").map(pointerToken)) {
      if (!isObject(current) || !Object.hasOwn(current, token)) {
        throw new Error(`Unresolved OpenAPI reference: ${reference}`);
      }
      current = current[token];
    }
    return current;
  };

const resolveReference = (input: unknown, resolveRef: (reference: string) => unknown): unknown => {
  const seen = new Set<string>();
  let current = input;
  while (isObject(current) && typeof current.$ref === "string") {
    if (seen.has(current.$ref)) throw new Error(`Cyclic non-schema reference: ${current.$ref}`);
    seen.add(current.$ref);
    current = resolveRef(current.$ref);
  }
  return current;
};

const schemasOf = (document: SamvaOpenApiDocument): JsonObject => {
  const components = document.components;
  if (components === undefined) return {};
  const schemas = components.schemas;
  if (schemas === undefined) return {};
  if (!isObject(schemas)) throw new Error("OpenAPI components.schemas must be an object");
  return schemas;
};

const allocateName = (base: string, reserved: Set<string>): string => {
  let candidate = base;
  let suffix = 2;
  while (reserved.has(candidate)) candidate = `${base}${suffix++}`;
  reserved.add(candidate);
  return candidate;
};

const literalTag = (schema: JsonObject): string | undefined => {
  if (typeof schema.const === "string") return schema.const;
  return Array.isArray(schema.enum) &&
    schema.enum.length === 1 &&
    typeof schema.enum[0] === "string"
    ? schema.enum[0]
    : undefined;
};

const errorExtension = (name: string, schema: JsonObject): ErrorExtension | undefined => {
  if (!isObject(schema.properties) || !isObject(schema.properties._tag)) return undefined;
  const tag = literalTag(schema.properties._tag);
  if (tag === undefined) return undefined;
  const categories = Array.isArray(schema["x-category"])
    ? schema["x-category"].filter((value): value is string => typeof value === "string")
    : [];
  const { _tag: _, ...properties } = schema.properties;
  const required = Array.isArray(schema.required)
    ? schema.required.filter(
        (value): value is string => typeof value === "string" && value !== "_tag",
      )
    : undefined;
  const body: JsonObject = { ...schema, properties };
  delete (body as { [key: string]: Json | undefined }).required;
  delete (body as { [key: string]: Json | undefined })["x-category"];
  delete (body as { [key: string]: Json | undefined })["x-retryable"];
  if (required !== undefined && required.length > 0) {
    (body as { [key: string]: Json }).required = required;
  }
  return {
    name,
    tag,
    categories,
    retryable: schema["x-retryable"] === true,
    body,
  };
};

const specialLeafName = (schema: JsonObject): SpecialLeafName | undefined => {
  const named = schema["x-samva-schema"];
  const sensitive = schema["x-sensitive"] === true;
  if (sensitive && typeof named === "string") {
    throw new Error("A schema node cannot declare both x-sensitive and x-samva-schema");
  }
  if (sensitive) return "SensitiveString";
  if (typeof named !== "string") return undefined;
  if (!Object.hasOwn(SPECIAL_LEAVES, named)) {
    throw new Error(`Unknown x-samva-schema value: ${named}`);
  }
  return named as SpecialLeafName;
};

export const prepareOpenApi = (input: SamvaOpenApiDocument): PreparedDocument => {
  if (!input.openapi.trim().startsWith("3.1")) {
    throw new Error(`Samva Effect codegen requires OpenAPI 3.1, received ${input.openapi}`);
  }
  const document = structuredClone(input) as SamvaOpenApiDocument;
  const schemas = schemasOf(document);
  const reserved = new Set(Object.keys(schemas));
  const brands = new Map<string, string>();
  const strings = new Map<string, StringSubstitution>();
  const stringNames = new Map<string, string>();
  const errors = new Map<string, ErrorExtension>();
  const runtimeSubstitutions = new Map<string, RuntimeSubstitution>();
  const substitutionByLeaf = new Map<SpecialLeafName, string>();

  for (const name of Object.keys(schemas).sort()) {
    const schema = schemas[name];
    if (!isObject(schema)) continue;
    if (typeof schema["x-samva-brand"] === "string") {
      brands.set(name, schema["x-samva-brand"]);
    }
    const error = errorExtension(name, schema);
    if (error !== undefined) errors.set(name, error);
  }

  const substitutionName = (leafName: SpecialLeafName): string => {
    const existing = substitutionByLeaf.get(leafName);
    if (existing !== undefined) return existing;
    const definitionName = allocateName(`__SamvaRuntime${leafName}`, reserved);
    substitutionByLeaf.set(leafName, definitionName);
    runtimeSubstitutions.set(definitionName, { definitionName, leafName });
    return definitionName;
  };

  const visit = (value: Json): Json => {
    if (Array.isArray(value)) return value.map(visit);
    if (!isObject(value)) return value;
    if (value[STRING_CHECKS_EXTENSION] !== undefined) {
      if (value.type !== "string")
        throw new Error(`${STRING_CHECKS_EXTENSION} requires a string schema`);
      const checks = decodeStringChecks(value[STRING_CHECKS_EXTENSION]);
      stringCheckRepresentations(checks);
      let schema = { ...value };
      delete schema[STRING_CHECKS_EXTENSION];
      if (checks.some((check) => check.id === "effect/schema/isPattern")) {
        // The extension carries every original pattern on this string. JSON
        // Schema Unicode regexps can reject source-valid UTF-16 matches.
        const removePatterns = (node: JsonObject): JsonObject =>
          Object.fromEntries(
            Object.entries(node)
              .filter(([key]) => key !== "pattern")
              .map(([key, child]) => [
                key,
                key === "allOf" && Array.isArray(child)
                  ? child.map((entry) => (isObject(entry) ? removePatterns(entry) : entry))
                  : child,
              ]),
          );
        schema = { ...removePatterns(schema) };
      }
      const key = JSON.stringify({ schema, checks });
      let name = stringNames.get(key);
      if (name === undefined) {
        name = allocateName("__SamvaStringChecks", reserved);
        stringNames.set(key, name);
        strings.set(name, { schema, checks });
      }
      return { $ref: `#/components/schemas/${name}` };
    }
    const leafName = specialLeafName(value);
    if (leafName !== undefined) {
      return { $ref: `#/components/schemas/${substitutionName(leafName)}` };
    }
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => {
        const transformed = visit(child);
        if ((key !== "anyOf" && key !== "oneOf") || !Array.isArray(transformed)) {
          return [key, transformed];
        }
        const seen = new Set<string>();
        return [
          key,
          transformed.filter((candidate) => {
            const encoded = JSON.stringify(candidate);
            if (seen.has(encoded)) return false;
            seen.add(encoded);
            return true;
          }),
        ];
      }),
    );
  };

  const transformed = visit(document) as SamvaOpenApiDocument;
  const transformedComponents = transformed.components ?? {};
  const transformedSchemas = schemasOf(transformed) as { [key: string]: Json };
  for (const substitution of runtimeSubstitutions.values()) {
    transformedSchemas[substitution.definitionName] =
      SPECIAL_LEAVES[substitution.leafName].placeholder;
  }
  for (const [name, substitution] of strings) transformedSchemas[name] = substitution.schema;
  (transformedComponents as { [key: string]: Json }).schemas = transformedSchemas;
  (transformed as { [key: string]: Json }).components = transformedComponents;

  // Error bodies must share the same structural substitutions as the document.
  const transformedErrors = new Map<string, ErrorExtension>();
  for (const [name, error] of errors) {
    transformedErrors.set(name, { ...error, body: visit(error.body) as JsonObject });
  }

  return {
    document: transformed,
    extensions: { brands, errors: transformedErrors, runtimeSubstitutions, strings },
  };
};

class SchemaRegistry {
  readonly roots: Array<SchemaRoot> = [];
  readonly reserved: Set<string>;

  constructor(componentNames: ReadonlyArray<string>) {
    this.reserved = new Set(componentNames);
  }

  add(baseName: string, schema: JsonObject): string {
    const name = allocateName(baseName, this.reserved);
    this.roots.push({ name, schema });
    return name;
  }
}

interface OpenApiParameter {
  readonly name: string;
  readonly in: "path" | "query" | "header" | "cookie";
  readonly required: boolean;
  readonly schema: JsonObject;
  readonly description?: string;
}

const isParameter = (value: unknown): value is OpenApiParameter =>
  isObject(value) &&
  typeof value.name === "string" &&
  (value.in === "path" || value.in === "query" || value.in === "header" || value.in === "cookie") &&
  isObject(value.schema);

const operationParameters = (
  pathParameters: unknown,
  ownParameters: unknown,
  resolveRef: (reference: string) => unknown,
): ReadonlyArray<OpenApiParameter> => {
  const output = new Map<string, OpenApiParameter>();
  for (const candidate of [
    ...(Array.isArray(pathParameters) ? pathParameters : []),
    ...(Array.isArray(ownParameters) ? ownParameters : []),
  ]) {
    const parameter = resolveReference(candidate, resolveRef);
    if (!isParameter(parameter))
      throw new Error("Every Samva operation parameter must have a schema");
    const key = `${parameter.in}:${parameter.name}`;
    output.delete(key);
    output.set(key, parameter);
  }
  return [...output.values()];
};

const parameterSchema = (parameters: ReadonlyArray<OpenApiParameter>): JsonObject | undefined => {
  if (parameters.length === 0) return undefined;
  const properties: { [key: string]: Json } = {};
  const required: Array<string> = [];
  for (const parameter of parameters) {
    properties[parameter.name] = parameter.schema;
    if (parameter.required) required.push(parameter.name);
  }
  return { type: "object", properties, required, additionalProperties: false };
};

const processPath = (
  path: string,
): { readonly pathIds: Array<string>; readonly pathTemplate: string } => {
  const pathIds: Array<string> = [];
  let pathTemplate = "";
  let index = 0;
  while (index < path.length) {
    const open = path.indexOf("{", index);
    if (open === -1) {
      pathTemplate += path.slice(index);
      break;
    }
    const close = path.indexOf("}", open + 1);
    if (close === -1) throw new Error(`Unclosed path parameter in ${path}`);
    const id = camelize(path.slice(open + 1, close));
    if (id.length === 0) throw new Error(`Empty path parameter in ${path}`);
    pathIds.push(id);
    pathTemplate += `${path.slice(index, open)}\${${id}}`;
    index = close + 1;
  }
  return { pathIds, pathTemplate: `\`${pathTemplate}\`` };
};

const cloneSecurity = (value: unknown): Array<ParsedOperationSecurityRequirement> => {
  if (!Array.isArray(value)) return [];
  return value.map((requirement) => {
    if (!isObject(requirement)) throw new Error("Invalid OpenAPI security requirement");
    return Object.fromEntries(
      Object.entries(requirement).map(([name, scopes]) => {
        if (!Array.isArray(scopes) || !scopes.every((scope) => typeof scope === "string")) {
          throw new Error(`Invalid security scopes for ${name}`);
        }
        return [name, [...scopes]];
      }),
    );
  });
};

const parseSecuritySchemes = (
  document: SamvaOpenApiDocument,
  resolveRef: (reference: string) => unknown,
): Array<ParsedOpenApiSecurityScheme> => {
  const source = document.components?.securitySchemes;
  if (source === undefined) return [];
  if (!isObject(source)) throw new Error("OpenAPI components.securitySchemes must be an object");
  const output: Array<ParsedOpenApiSecurityScheme> = [];
  for (const [name, candidate] of Object.entries(source).sort(([left], [right]) =>
    left.localeCompare(right),
  )) {
    const scheme = resolveReference(candidate, resolveRef);
    if (!isObject(scheme)) throw new Error(`Invalid security scheme ${name}`);
    if (scheme.type === "http" && typeof scheme.scheme === "string") {
      const normalized = scheme.scheme.toLowerCase();
      output.push({
        name,
        type: normalized === "basic" || normalized === "bearer" ? normalized : "http",
        description: nonEmptyString(scheme.description),
        bearerFormat: nonEmptyString(scheme.bearerFormat),
        scheme: normalized === "basic" || normalized === "bearer" ? undefined : scheme.scheme,
        key: undefined,
        in: undefined,
      });
      continue;
    }
    if (
      scheme.type === "apiKey" &&
      (scheme.in === "header" || scheme.in === "query" || scheme.in === "cookie") &&
      typeof scheme.name === "string"
    ) {
      output.push({
        name,
        type: "apiKey",
        description: nonEmptyString(scheme.description),
        bearerFormat: undefined,
        scheme: undefined,
        key: scheme.name,
        in: scheme.in,
      });
      continue;
    }
    throw new Error(`Unsupported security scheme ${name}`);
  }
  return output;
};

const assertJsonContent = (content: unknown, context: string): JsonObject | undefined => {
  if (content === undefined) return undefined;
  if (!isObject(content)) throw new Error(`${context} content must be an object`);
  const types = Object.keys(content);
  if (types.some((type) => type !== "application/json")) {
    throw new Error(`${context} uses unsupported media types: ${types.join(", ")}`);
  }
  const media = content["application/json"];
  if (media === undefined) return undefined;
  if (!isObject(media) || !isObject(media.schema))
    throw new Error(`${context} JSON content must have a schema`);
  return media.schema;
};

/** Samva-owned OpenAPI 3.1 parser, trimmed to the JSON dialect the public spec emits. */
const parseOpenApi = (document: SamvaOpenApiDocument, registry: SchemaRegistry): ParsedOpenApi => {
  const operations: Array<ParsedOperation> = [];
  const resolveRef = makeReferenceResolver(document);
  const globalSecurity = document.security;

  for (const [path, pathItem] of Object.entries(document.paths).sort(([left], [right]) =>
    left.localeCompare(right),
  )) {
    if (!isObject(pathItem)) throw new Error(`OpenAPI path item ${path} must be an object`);
    for (const method of methods) {
      const operation = pathItem[method];
      if (operation === undefined) continue;
      if (!isObject(operation))
        throw new Error(`OpenAPI operation ${method.toUpperCase()} ${path} must be an object`);
      const operationId = nonEmptyString(operation.operationId);
      if (operationId === undefined)
        throw new Error(`Missing operationId for ${method.toUpperCase()} ${path}`);
      const tags = Array.isArray(operation.tags)
        ? operation.tags.filter((tag): tag is string => typeof tag === "string")
        : [];
      if (tags.length > 1) throw new Error(`Operation ${operationId} has more than one tag`);
      const { pathIds, pathTemplate } = processPath(path);
      const description =
        nonEmptyString(operation.description) ?? nonEmptyString(operation.summary);
      const mutable = makeDeepMutable({
        id: camelize(operationId),
        method,
        description,
        pathIds,
        pathTemplate,
      });
      mutable.path = path;
      mutable.operationId = operationId;
      mutable.tags = tags;
      mutable.metadata = {
        summary: nonEmptyString(operation.summary),
        description: nonEmptyString(operation.description),
        deprecated: operation.deprecated === true,
        externalDocs: externalDocs(operation.externalDocs),
      };
      mutable.effectiveSecurity = cloneSecurity(operation.security ?? globalSecurity);
      if (mutable.effectiveSecurity.some((requirement) => Object.keys(requirement).length > 1)) {
        throw new Error(`Operation ${operationId} uses unsupported AND security requirements`);
      }

      const parameters = operationParameters(pathItem.parameters, operation.parameters, resolveRef);
      for (const parameter of parameters) {
        if (parameter.in === "cookie")
          throw new Error(`Operation ${operationId} uses an unsupported cookie parameter`);
        const parsed: ParsedOperationParameter = {
          name: parameter.name,
          in: parameter.in,
          required: parameter.required === true,
          description: nonEmptyString(parameter.description),
          schema: parameter.schema,
        };
        mutable.parameters[parameter.in].push(parsed);
      }
      const schemaId = identifier(operationId);
      const pathSchema = parameterSchema(parameters.filter((parameter) => parameter.in === "path"));
      const querySchema = parameterSchema(
        parameters.filter((parameter) => parameter.in === "query"),
      );
      const headersSchema = parameterSchema(
        parameters.filter((parameter) => parameter.in === "header"),
      );
      if (pathSchema !== undefined)
        mutable.pathSchema = registry.add(`${schemaId}PathParams`, pathSchema);
      if (querySchema !== undefined) {
        mutable.querySchema = registry.add(`${schemaId}Query`, querySchema);
        mutable.querySchemaOptional =
          !Array.isArray(querySchema.required) || querySchema.required.length === 0;
      }
      if (headersSchema !== undefined) {
        mutable.headersSchema = registry.add(`${schemaId}Headers`, headersSchema);
        mutable.headersSchemaOptional =
          !Array.isArray(headersSchema.required) || headersSchema.required.length === 0;
      }

      const requestBody = resolveReference(operation.requestBody, resolveRef);
      if (requestBody !== undefined) {
        if (method === "get" || method === "head" || method === "options" || method === "trace") {
          throw new Error(
            `Operation ${operationId} uses a request body with ${method.toUpperCase()}`,
          );
        }
        if (!isObject(requestBody))
          throw new Error(`Operation ${operationId} has an invalid request body`);
        const payload = assertJsonContent(requestBody.content, `Operation ${operationId} request`);
        if (payload === undefined)
          throw new Error(`Operation ${operationId} request has no application/json schema`);
        const payloadName = registry.add(`${schemaId}RequestJson`, payload);
        mutable.payload = payloadName;
        mutable.requestBody = {
          required: requestBody.required === true,
          contentTypes: ["application/json"],
        };
        mutable.requestBodyRepresentable = [
          { contentType: "application/json", encoding: "json", schema: payloadName },
        ];
      }

      if (!isObject(operation.responses))
        throw new Error(`Operation ${operationId} must declare responses`);
      for (const [status, candidate] of Object.entries(operation.responses).sort(
        ([left], [right]) => left.localeCompare(right),
      )) {
        const response = resolveReference(candidate, resolveRef);
        if (!isObject(response))
          throw new Error(`Operation ${operationId} response ${status} is invalid`);
        if (response.headers !== undefined)
          throw new Error(`Operation ${operationId} response ${status} has headers`);
        const mappedStatus = status === "default" ? "500" : status;
        if (!/^\d{3}$/.test(mappedStatus))
          throw new Error(`Operation ${operationId} has invalid status ${status}`);
        const schema = assertJsonContent(
          response.content,
          `Operation ${operationId} response ${status}`,
        );
        const representable = [] as Array<{
          readonly contentType: string;
          readonly encoding: "json";
          readonly schema: string;
        }>;
        if (schema !== undefined) {
          const name = registry.add(`${schemaId}${status}`, schema);
          representable.push({ contentType: "application/json", encoding: "json", schema: name });
          if (Number(mappedStatus) < 400)
            mutable.httpClientResponses.successSchemas.set(mappedStatus, name);
          else mutable.httpClientResponses.errorSchemas.set(mappedStatus, name);
        } else {
          if (Number(mappedStatus) < 400)
            mutable.httpClientResponses.voidSuccessStatuses.add(mappedStatus);
          else mutable.httpClientResponses.voidErrorStatuses.add(mappedStatus);
        }
        const parsedResponse = {
          status: mappedStatus,
          description: nonEmptyString(response.description),
          contentTypes: schema === undefined ? [] : ["application/json"],
          hasHeaders: false,
          isEmpty: schema === undefined,
          representable,
        };
        mutable.responses.push(parsedResponse);
        if (status === "default") mutable.defaultResponse = parsedResponse;
      }
      operations.push(mutable);
    }
  }

  const tags = Array.isArray(document.tags)
    ? document.tags.map((candidate) => {
        if (!isObject(candidate) || typeof candidate.name !== "string") {
          throw new Error("Invalid OpenAPI tag");
        }
        return {
          name: candidate.name,
          description: nonEmptyString(candidate.description),
          externalDocs: externalDocs(candidate.externalDocs),
        };
      })
    : [];
  return {
    metadata: {
      title: document.info.title,
      version: document.info.version,
      summary: nonEmptyString(document.info.summary),
      description: nonEmptyString(document.info.description),
      license: license(document.info.license),
      servers: servers(document.servers),
    },
    tags,
    securitySchemes: parseSecuritySchemes(document, resolveRef),
    operations,
  };
};

const openApiSchema = (schema: JsonObject): JsonSchema.JsonSchema =>
  JsonSchema.fromSchemaOpenApi3_1(schema as JsonSchema.JsonSchema).schema;

// Effect's code generator always renders objects as `Schema.Struct`. A required, unannotated
// `_tag` literal renders as `Schema.TaggedStruct` instead, so `make` fills the tag in; the
// schema decodes and encodes the same JSON either way.
const isEmptyAnnotations = (
  annotations: SchemaRepresentation.PropertySignature["annotations"],
): boolean => annotations === undefined || Object.keys(annotations).length === 0;

const taggedStruct = (
  representation: SchemaRepresentation.Objects,
): SchemaRepresentation.Representation => {
  const tag = representation.propertySignatures.find((property) => property.name === "_tag");
  if (
    tag === undefined ||
    tag.isOptional ||
    tag.isMutable ||
    !isEmptyAnnotations(tag.annotations) ||
    tag.type._tag !== "Literal" ||
    tag.type.checks.length > 0 ||
    !isEmptyAnnotations(tag.type.annotations) ||
    representation.indexSignatures.length > 0
  ) {
    return representation;
  }
  const fields: SchemaRepresentation.Objects = {
    ...representation,
    propertySignatures: representation.propertySignatures.filter((property) => property !== tag),
  };
  const toCode: SchemaRepresentation.Generation.Declaration = ({
    typeParameters: [literal, struct],
  }) => {
    const prefix = "Schema.Struct({";
    if (literal === undefined || struct === undefined || !struct.runtime.startsWith(prefix)) {
      throw new Error(`Unexpected tagged struct rendering ${struct?.runtime}`);
    }
    const rest = struct.Type.replace(/^\{\s*/, "");
    return {
      runtime: `Schema.TaggedStruct(${literal.Type}, {${struct.runtime.slice(prefix.length)}`,
      Type: `{ readonly _tag: ${literal.Type}${rest.startsWith("}") ? " " : ", "}${rest}`,
    };
  };
  return {
    _tag: "Declaration",
    typeParameters: [tag.type, fields],
    checks: [],
    annotations: { toCode },
  };
};

const runtimeRepresentation = (
  representation: SchemaRepresentation.Representation,
  strings: ReadonlyMap<string, SchemaRepresentation.String>,
): SchemaRepresentation.Representation => {
  const mapCheck = (check: SchemaRepresentation.Check): SchemaRepresentation.Check => {
    const annotations = { ...check.annotations };
    if (typeof annotations.identifier === "string" && strings.has(annotations.identifier)) {
      delete annotations.identifier;
    }
    const mappedRepresentation =
      check.representation?.schemas === undefined
        ? check.representation
        : {
            ...check.representation,
            schemas: check.representation.schemas.map((child) =>
              runtimeRepresentation(child, strings),
            ),
          };
    return check._tag === "Filter"
      ? { ...check, annotations, representation: mappedRepresentation }
      : {
          ...check,
          annotations,
          representation: mappedRepresentation,
          checks: check.checks.map(mapCheck) as [
            SchemaRepresentation.Check,
            ...Array<SchemaRepresentation.Check>,
          ],
        };
  };
  const annotations =
    representation._tag === "Reference" ? undefined : { ...representation.annotations };
  if (
    annotations !== undefined &&
    typeof annotations.identifier === "string" &&
    strings.has(annotations.identifier)
  ) {
    delete annotations.identifier;
  }
  const checks =
    representation._tag === "Reference" ? undefined : representation.checks.map(mapCheck);
  switch (representation._tag) {
    case "Number":
      return {
        _tag: "Declaration",
        typeParameters: [],
        checks: checks ?? [],
        annotations: {
          ...representation.annotations,
          toCode: () => ({ runtime: "Schema.Finite", Type: "number" }),
        },
      };
    case "Declaration":
      return {
        ...representation,
        checks: checks ?? [],
        typeParameters: representation.typeParameters.map((child) =>
          runtimeRepresentation(child, strings),
        ),
      };
    case "Suspend":
      return { ...representation, thunk: runtimeRepresentation(representation.thunk, strings) };
    case "TemplateLiteral":
      return {
        ...representation,
        checks: checks ?? [],
        parts: representation.parts.map((child) => runtimeRepresentation(child, strings)),
      };
    case "Arrays":
      return {
        ...representation,
        checks: checks ?? [],
        elements: representation.elements.map((element) => ({
          ...element,
          type: runtimeRepresentation(element.type, strings),
        })),
        rest: representation.rest.map((child) => runtimeRepresentation(child, strings)),
      };
    case "Objects":
      return taggedStruct({
        ...representation,
        checks: checks ?? [],
        propertySignatures: representation.propertySignatures.map((property) => ({
          ...property,
          type: runtimeRepresentation(property.type, strings),
        })),
        indexSignatures: representation.indexSignatures.map((signature) => ({
          parameter: runtimeRepresentation(signature.parameter, strings),
          type: runtimeRepresentation(signature.type, strings),
        })),
      });
    case "Union":
      return {
        ...representation,
        checks: checks ?? [],
        types: representation.types.map((child) => runtimeRepresentation(child, strings)),
      };
    case "Reference": {
      const replacement = strings.get(representation.$ref);
      return replacement === undefined
        ? representation
        : runtimeRepresentation(replacement, strings);
    }
    default:
      return { ...representation, annotations, checks: checks ?? [] };
  }
};

interface GeneratedSchemas {
  readonly code: SchemaRepresentation.CodeDocument;
  readonly document: SchemaRepresentation.MultiDocument;
  readonly rootNames: ReadonlyArray<string>;
  readonly componentRootNames: ReadonlyArray<string>;
  readonly componentRootStartIndex: number;
  readonly errorRootIndexes: ReadonlyMap<string, number>;
}

const generateSchemas = (
  prepared: PreparedDocument,
  roots: ReadonlyArray<SchemaRoot>,
): GeneratedSchemas => {
  const definitions = Object.fromEntries(
    Object.entries(schemasOf(prepared.document))
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([name, schema]) => {
        if (!isObject(schema)) throw new Error(`Component schema ${name} must be an object`);
        return [name, openApiSchema(schema)];
      }),
  );
  const errorRoots = [...prepared.extensions.errors.values()].sort((left, right) =>
    left.name.localeCompare(right.name),
  );
  // RC importers translate definitions only when a root reaches them. Components retained for
  // public SDK reuse can be inlined at operation sites, so make each definition an importer root
  // without rendering it as an operation root below.
  const componentRootNames = Object.keys(definitions).filter(
    (name) =>
      !prepared.extensions.errors.has(name) &&
      !prepared.extensions.runtimeSubstitutions.has(name) &&
      !prepared.extensions.strings.has(name),
  );
  const definitionRoots = componentRootNames.map((name) => ({ $ref: `#/$defs/${name}` }));
  const schemas = [
    ...roots.map((root) => openApiSchema(root.schema)),
    ...errorRoots.map((error) => openApiSchema(error.body)),
    ...definitionRoots,
  ];
  if (schemas.length === 0) throw new Error("The OpenAPI document produced no schemas");
  const imported = SchemaRepresentation.fromJsonSchemaMultiDocument(
    {
      dialect: "draft-2020-12",
      schemas: schemas as [JsonSchema.JsonSchema, ...Array<JsonSchema.JsonSchema>],
      definitions,
    },
    {
      patterns: "apply",
      onEnter(schema) {
        return schema.type === "object" && schema.additionalProperties === undefined
          ? { ...schema, additionalProperties: false }
          : schema;
      },
    },
  );
  const represented = SchemaRepresentation.toRepresentations(
    imported.map((schema) => schema.ast) as [
      (typeof imported)[number]["ast"],
      ...Array<(typeof imported)[number]["ast"]>,
    ],
  );
  const strings = new Map<string, SchemaRepresentation.String>();
  for (const [name, substitution] of prepared.extensions.strings) {
    const representation = represented.references[name];
    if (representation === undefined) continue;
    if (representation._tag !== "String") throw new Error(`Invalid string substitution ${name}`);
    const source = stringCheckRepresentations(substitution.checks);
    if (source._tag !== "String") throw new Error(`Invalid source string checks ${name}`);
    strings.set(name, { ...representation, checks: [...representation.checks, ...source.checks] });
  }
  const componentStrings = new Map<string, StringSubstitution>();
  for (const [name, schema] of Object.entries(schemasOf(prepared.document))) {
    if (isObject(schema) && typeof schema.$ref === "string") {
      const substitution = prepared.extensions.strings.get(
        schema.$ref.replace("#/components/schemas/", ""),
      );
      if (substitution !== undefined) componentStrings.set(name, substitution);
    }
  }
  const references = Object.fromEntries(
    Object.entries(represented.references)
      .filter(([name]) => !strings.has(name))
      .map(([name, representation]) => {
        const substitution = componentStrings.get(name);
        if (substitution === undefined)
          return [name, runtimeRepresentation(representation, strings)];
        if (representation._tag !== "String") throw new Error(`Invalid component string ${name}`);
        const source = stringCheckRepresentations(substitution.checks);
        if (source._tag !== "String") throw new Error(`Invalid component checks ${name}`);
        return [
          name,
          runtimeRepresentation(
            { ...representation, checks: [...representation.checks, ...source.checks] },
            strings,
          ),
        ];
      }),
  );
  const errorRootIndexes = new Map<string, number>();
  errorRoots.forEach((error, index) => errorRootIndexes.set(error.name, roots.length + index));
  const document: SchemaRepresentation.MultiDocument = {
    representations: represented.representations.map((child) =>
      runtimeRepresentation(child, strings),
    ) as [SchemaRepresentation.Representation, ...Array<SchemaRepresentation.Representation>],
    references,
  };
  return {
    document,
    code: SchemaRepresentation.toCodeDocument(document),
    rootNames: roots.map((root) => root.name),
    componentRootNames,
    componentRootStartIndex: roots.length + errorRoots.length,
    errorRootIndexes,
  };
};

const codeAt = (
  generated: GeneratedSchemas,
  index: number,
  name: string,
): SchemaRepresentation.Code => {
  const code = generated.code.codes[index];
  if (code === undefined) throw new Error(`Missing generated schema code for ${name} at ${index}`);
  return code;
};

const renderTypeAndSchema = (
  name: string,
  code: SchemaRepresentation.Code,
  brand?: string,
): string => {
  // Stable Schema brands are type-only, so the OpenAPI extension owns their reconstruction.
  const Type =
    brand === undefined ? code.Type : `(${code.Type}) & Brand.Brand<${JSON.stringify(brand)}>`;
  const runtime =
    brand === undefined
      ? code.runtime
      : `${code.runtime}.pipe(Schema.brand(${JSON.stringify(brand)}))`;
  // Mark the whole construction pure, including chained checks and brand calls.
  const initializer = runtime.includes("(") ? `/* @__PURE__ */ (() => ${runtime})()` : runtime;
  return `export type ${name} = ${Type}\nexport const ${name} = ${initializer}`;
};

const renderError = (error: ErrorExtension, code: SchemaRepresentation.Code): string =>
  `export class ${error.name} extends Schema.TaggedError<${error.name}>()(${JSON.stringify(error.tag)}, ${code.runtime}) {}`;

interface SchemaDeclaration {
  readonly name: string;
  readonly source: string;
  readonly representation: SchemaRepresentation.Representation;
  readonly recursiveSource?: string;
}

const schemaDeclarations = (
  generated: GeneratedSchemas,
  prepared: PreparedDocument,
): ReadonlyArray<SchemaDeclaration> => {
  const substitutions = prepared.extensions.runtimeSubstitutions;
  const declarations: Array<SchemaDeclaration> = [];
  const declaredNames = new Set<string>();
  const representationAt = (index: number): SchemaRepresentation.Representation => {
    const representation = generated.document.representations[index];
    if (representation === undefined) throw new Error(`Missing schema representation at ${index}`);
    return representation;
  };
  const referenceAt = (name: string): SchemaRepresentation.Representation => {
    const representation = generated.document.references[name];
    if (representation === undefined) throw new Error(`Missing schema reference ${name}`);
    return representation;
  };
  for (const [name, code] of Object.entries(generated.code.references.recursives)) {
    if (substitutions.has(name)) continue;
    if (prepared.extensions.errors.has(name))
      throw new Error(`Recursive tagged error ${name} is unsupported`);
    declarations.push({
      name,
      representation: referenceAt(name),
      source: `export type ${name} = ${code.Type}\nexport const ${name} = Schema.suspend((): Schema.Codec<${name}> => __recursive_${name})`,
      recursiveSource: `const __recursive_${name} = ${code.runtime}`,
    });
    declaredNames.add(name);
  }
  for (const { $ref: name, code } of generated.code.references.nonRecursives) {
    if (substitutions.has(name)) continue;
    const error = prepared.extensions.errors.get(name);
    const rootIndex = generated.errorRootIndexes.get(name);
    if (error !== undefined && rootIndex === undefined)
      throw new Error(`Missing error body root for ${name}`);
    declarations.push({
      name,
      representation:
        error !== undefined && rootIndex !== undefined
          ? representationAt(rootIndex)
          : referenceAt(name),
      source:
        error !== undefined && rootIndex !== undefined
          ? renderError(error, codeAt(generated, rootIndex, name))
          : renderTypeAndSchema(name, code, prepared.extensions.brands.get(name)),
    });
    declaredNames.add(name);
  }
  generated.componentRootNames.forEach((name, index) => {
    if (declaredNames.has(name)) return;
    const rootIndex = generated.componentRootStartIndex + index;
    declarations.push({
      name,
      representation: representationAt(rootIndex),
      source: renderTypeAndSchema(
        name,
        codeAt(generated, rootIndex, name),
        prepared.extensions.brands.get(name),
      ),
    });
    declaredNames.add(name);
  });
  generated.rootNames.forEach((name, index) => {
    if (declaredNames.has(name)) throw new Error(`Duplicate generated schema name ${name}`);
    declarations.push({
      name,
      representation: representationAt(index),
      source: renderTypeAndSchema(name, codeAt(generated, index, name)),
    });
    declaredNames.add(name);
  });
  return declarations;
};

// References in the structured representation, including check dependencies, own module placement.
const schemaDependencies = (
  representation: SchemaRepresentation.Representation,
): ReadonlySet<string> => {
  const references = new Set<string>();
  const visit = (value: unknown): void => {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (!Predicate.isObject(value)) return;
    if (value._tag === "Reference" && typeof value.$ref === "string") {
      references.add(value.$ref);
      return;
    }
    for (const [key, child] of Object.entries(value)) {
      if (key !== "annotations") visit(child);
    }
  };
  visit(representation);
  return references;
};

const renderImports = (generated: GeneratedSchemas, prepared: PreparedDocument): string => {
  const imports = new Set<string>([
    'import * as Schema from "effect/Schema"',
    'import { HttpApiMiddleware, HttpApiSecurity, OpenApi } from "effect/http-api"',
  ]);
  if (prepared.extensions.brands.size > 0)
    imports.add('import type * as Brand from "effect/Brand"');
  for (const artifact of generated.code.artifacts) {
    if (artifact._tag === "Import") imports.add(artifact.importDeclaration);
  }
  const substitutions = [...prepared.extensions.runtimeSubstitutions.values()].sort((left, right) =>
    left.definitionName.localeCompare(right.definitionName),
  );
  if (substitutions.length > 0) {
    imports.add(
      `import { ${substitutions.map(({ definitionName, leafName }) => `${SPECIAL_LEAVES[leafName].runtimeExport} as ${definitionName}`).join(", ")} } from "./runtime"`,
    );
  }
  return [...imports].sort().join("\n");
};

const renderErrorMetadata = (errors: ReadonlyMap<string, ErrorExtension>): string => {
  const metadata = Object.fromEntries(
    [...errors.values()]
      .sort((left, right) => left.name.localeCompare(right.name))
      .map((error) => [error.tag, { categories: error.categories, retryable: error.retryable }]),
  );
  return `export const SamvaErrorMetadata = ${JSON.stringify(metadata, null, 2)} as const`;
};

// Effect's schema renderer imports the brand module as `Brand`, which the `Brand` component schema
// would shadow; aliasing the module leaves every component name free.
const aliasBrandModule = (source: string): string =>
  source
    .replace(
      /import type \* as Brand from "effect\/Brand"/,
      'import type * as EffectBrand from "effect/Brand"',
    )
    .replace(/\bBrand\.Brand</g, "EffectBrand.Brand<");

const generatedHeader = "// Auto-generated from OpenAPI; do not edit.";
const generatedWireHeader =
  "/* oxlint-disable samva/no-id-casts-or-jsonvalue -- Generated OpenAPI wire contracts preserve the encoded JSON shapes the API answers with. */";

export interface GeneratedEffectModules {
  readonly sources: ReadonlyMap<string, string>;
  readonly schemaCounts: ReadonlyMap<string, number>;
  readonly reachableSchemaCount: number;
}

/** Partition the schema graph by endpoint reachability; rendering does not determine ownership. */
export const generateEffectSources = (input: SamvaOpenApiDocument): GeneratedEffectModules => {
  const prepared = prepareOpenApi(input);
  const registry = new SchemaRegistry(Object.keys(schemasOf(prepared.document)));
  const parsed = parseOpenApi(prepared.document, registry);
  const generated = generateSchemas(prepared, registry.roots);
  const declarations = schemaDeclarations(generated, prepared);
  const dependencies = new Map(
    declarations.map((declaration) => [
      declaration.name,
      schemaDependencies(declaration.representation),
    ]),
  );
  const closure = (roots: Iterable<string>): Set<string> => {
    const reached = new Set<string>();
    const visit = (name: string): void => {
      if (reached.has(name)) return;
      if (!dependencies.has(name) && !prepared.extensions.runtimeSubstitutions.has(name))
        throw new Error(`Missing schema dependency ${name}`);
      reached.add(name);
      dependencies.get(name)?.forEach(visit);
    };
    for (const root of roots) visit(root);
    return reached;
  };
  const groups = new Map<string, Array<ParsedOperation>>();
  for (const operation of parsed.operations) {
    const name = operation.tags[0] ?? "default";
    const operations = groups.get(name) ?? [];
    operations.push(operation);
    groups.set(name, operations);
  }
  const groupReachability = new Map(
    [...groups].map(([name, operations]) => [
      name,
      closure(
        operations.flatMap((operation) => [
          ...[
            operation.pathSchema,
            operation.querySchema,
            operation.headersSchema,
            operation.payload,
          ].filter((schemaName): schemaName is string => schemaName !== undefined),
          ...operation.responses.flatMap((response) =>
            response.representable.flatMap((media) =>
              media.schema === undefined ? [] : [media.schema],
            ),
          ),
        ]),
      ),
    ]),
  );
  const owners = new Map<string, Array<string>>();
  for (const [group, reached] of groupReachability) {
    for (const name of reached) {
      const existing = owners.get(name) ?? [];
      existing.push(group);
      owners.set(name, existing);
    }
  }
  // Retained public components with no endpoint owner still need one stable home.
  const shared = closure([
    ...declarations
      .filter(({ name }) => (owners.get(name)?.length ?? 0) !== 1)
      .map(({ name }) => name),
    ...prepared.extensions.errors.keys(),
    ...prepared.extensions.runtimeSubstitutions.keys(),
  ]);
  // The renderer separates top-level declarations with blank lines. This only partitions
  // its HttpApi source; schema ownership comes entirely from the representation graph.
  const apiStatements = renderHttpApi("Schema", "SamvaApi", parsed).split("\n\n");
  const groupStatements = apiStatements.filter(
    (statement) =>
      statement.startsWith("class ") && statement.includes(" extends HttpApiGroup.make("),
  );
  const apiStatement = apiStatements.find((statement) =>
    statement.startsWith("export class SamvaApi "),
  );
  if (apiStatement === undefined || groupStatements.length !== groups.size)
    throw new Error("HttpApi renderer group inventory does not match parsed operations");
  const securityStatements = apiStatements.filter(
    (statement) => statement !== apiStatement && !groupStatements.includes(statement),
  );
  const securityNames = securityStatements.map((statement) => {
    const name = statement.split(" ")[2];
    if (name === undefined || !statement.startsWith("export "))
      throw new Error("Unsupported HttpApi security declaration");
    return name;
  });
  const renderDeclarations = (names: ReadonlySet<string>): string =>
    [
      ...declarations.filter(({ name }) => names.has(name)).map(({ source }) => source),
      ...declarations
        .filter(({ name }) => names.has(name))
        .flatMap(({ recursiveSource }) => (recursiveSource === undefined ? [] : [recursiveSource])),
    ].join("\n");
  const sources = new Map<string, string>();
  const schemaCounts = new Map<string, number>();
  const moduleSource = (...parts: ReadonlyArray<string>): string =>
    aliasBrandModule([generatedHeader, ...parts, ""].join("\n\n"));
  const sharedImports = renderImports(generated, prepared)
    .replace(
      securityStatements.some((statement) => statement.includes("OpenApi.")) ? "" : ", OpenApi",
      "",
    )
    .replaceAll('from "./runtime"', 'from "../runtime"');
  const runtimeExports = [...prepared.extensions.runtimeSubstitutions.keys()];
  sources.set(
    "shared.ts",
    moduleSource(
      ...(shared.has("JsonValue") ? [generatedWireHeader] : []),
      sharedImports,
      renderDeclarations(shared),
      runtimeExports.length > 0 ? `export { ${runtimeExports.join(", ")} }` : "",
      ...securityStatements,
    ),
  );
  schemaCounts.set("shared.ts", declarations.filter(({ name }) => shared.has(name)).length);
  const barrelImports: Array<string> = [];
  const barrelExports = ['export * from "./shared"'];
  const filenames = new Set<string>(["shared", "index"]);
  [...groups.keys()].forEach((group, index) => {
    const statement = groupStatements[index];
    if (statement === undefined) throw new Error(`Missing rendered group ${group}`);
    const filename = group
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .toLowerCase();
    if (filenames.has(filename)) throw new Error(`Generated group filename collision: ${filename}`);
    filenames.add(filename);
    const reached = groupReachability.get(group);
    if (reached === undefined) throw new Error(`Missing reachability for ${group}`);
    const local = new Set([...reached].filter((name) => !shared.has(name)));
    const imported = [
      ...new Set([...local].flatMap((name) => [...(dependencies.get(name) ?? [])])),
    ].filter((name) => shared.has(name));
    const declarationSource = renderDeclarations(local);
    const groupSource = `export ${statement}`;
    const content = `${declarationSource}\n${groupSource}`;
    const effectImports = ["HttpApiEndpoint", "HttpApiGroup", "HttpApiSchema", "OpenApi"].filter(
      (name) => content.includes(`${name}.`),
    );
    const middlewareImports = securityNames.filter((name) =>
      groupSource.includes(`.middleware(${name})`),
    );
    sources.set(
      `${filename}.ts`,
      moduleSource(
        'import * as Schema from "effect/Schema"',
        `import { ${effectImports.join(", ")} } from "effect/http-api"`,
        ...(content.includes("Brand.Brand<") ? ['import type * as Brand from "effect/Brand"'] : []),
        ...generated.code.artifacts
          .filter((artifact) => artifact._tag === "Import")
          .map((artifact) => artifact.importDeclaration),
        `import { ${[...imported, ...middlewareImports].sort().join(", ")} } from "./shared"`,
        declarationSource,
        groupSource,
      ),
    );
    schemaCounts.set(`${filename}.ts`, declarations.filter(({ name }) => local.has(name)).length);
    barrelImports.push(`import { ${statement.split(" ")[1]} } from "./${filename}"`);
    barrelExports.push(`export * from "./${filename}"`);
  });
  sources.set(
    "index.ts",
    moduleSource(
      'import { HttpApi, OpenApi } from "effect/http-api"',
      ...barrelImports,
      ...barrelExports,
      apiStatement,
    ),
  );
  schemaCounts.set("index.ts", 0);
  return {
    sources,
    schemaCounts,
    reachableSchemaCount: declarations.filter(({ name }) => owners.has(name)).length,
  };
};

/** Generate operation and error metadata without loading the runtime API schemas. */
export const generateEffectMetadataSource = (input: SamvaOpenApiDocument): string => {
  const prepared = prepareOpenApi(input);
  const registry = new SchemaRegistry(Object.keys(schemasOf(prepared.document)));
  const parsed = parseOpenApi(prepared.document, registry);
  const resolveRef = makeReferenceResolver(prepared.document);
  const propertyNames = (schema: unknown): ReadonlySet<string> => {
    const resolved = resolveReference(schema, resolveRef);
    if (!isObject(resolved)) return new Set();
    return new Set([
      ...Object.keys(isObject(resolved.properties) ? resolved.properties : {}),
      ...(Array.isArray(resolved.allOf)
        ? resolved.allOf.flatMap((child) => [...propertyNames(child)])
        : []),
    ]);
  };
  const roots = new Map(registry.roots.map((root) => [root.name, root.schema]));
  const idempotency = (path: string, method: string) => {
    const item = input.paths[path];
    const operation = isObject(item) ? item[method] : undefined;
    const idempotent = isObject(operation) && operation["x-idempotent"] === true;
    const condition = isObject(operation) ? operation["x-idempotent-when"] : undefined;
    if (condition === undefined) return { idempotent };
    if (
      !idempotent ||
      !isObject(condition) ||
      typeof condition.field !== "string" ||
      typeof condition.equals !== "string"
    )
      throw new Error(`Invalid x-idempotent-when on ${method} ${path}`);
    return { idempotent, idempotentWhen: { field: condition.field, equals: condition.equals } };
  };
  const operations = Object.fromEntries(
    parsed.operations.map((operation) => [
      operation.id,
      {
        group: operation.tags[0] ?? "default",
        method: operation.method.toUpperCase(),
        ...idempotency(operation.path, operation.method),
        paginated: [...operation.httpClientResponses.successSchemas.values()].some((name) => {
          const properties = propertyNames(roots.get(name));
          return properties.has("items") && properties.has("nextCursor");
        }),
      },
    ]),
  );
  // Endpoints in a group share method/pagination descriptors; keep the lookup table small.
  const descriptors = new Map<string, string>();
  const entries = Object.entries(operations).map(([name, metadata]) => {
    const key = JSON.stringify(metadata);
    let descriptor = descriptors.get(key);
    if (descriptor === undefined) {
      descriptor = `operationMetadata${descriptors.size}`;
      descriptors.set(key, descriptor);
    }
    return `${JSON.stringify(name)}: ${descriptor}`;
  });
  const declarations = [...descriptors].map(
    ([metadata, name]) => `const ${name} = ${metadata} as const`,
  );
  return [
    renderErrorMetadata(prepared.extensions.errors),
    ...declarations,
    `export const SamvaOperations = {\n${entries.join(",\n")}\n} as const`,
    "",
  ].join("\n\n");
};
