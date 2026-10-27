import { describe, expect, it } from "@effect/vitest";
import { Predicate, Redacted, Schema } from "effect";

import {
  generateEffectMetadataSource,
  generateEffectSources,
  prepareOpenApi,
  SPECIAL_LEAVES,
  type SamvaOpenApiDocument,
} from "../../codegen/driver";
import { AbsoluteInstant, SensitiveString } from "../../src/effect/runtime";

const generateEffectSource = (document: SamvaOpenApiDocument): string =>
  [...generateEffectSources(document).sources.values()].join("\n");

const fixture = {
  openapi: "3.1.0",
  info: { title: "Fixture", version: "1.0.0" },
  paths: {
    "/messages/{id}": {
      get: {
        tags: ["messages"],
        operationId: "messages.get",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { $ref: "#/components/schemas/MessageId" },
          },
        ],
        responses: {
          "200": {
            description: "ok",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { $ref: "#/components/schemas/MessageId" },
                    secret: { type: "string", "x-sensitive": true },
                    createdAt: { type: "string", "x-samva-schema": "AbsoluteInstant" },
                  },
                  required: ["id", "secret", "createdAt"],
                  additionalProperties: false,
                },
              },
            },
          },
          "429": {
            description: "limited",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RateLimitedError" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      MessageId: {
        type: "string",
        pattern: "^msg_",
        "x-samva-brand": "MessageId",
      },
      RateLimitedError: {
        type: "object",
        properties: {
          _tag: { type: "string", const: "RateLimitedError" },
          operation: { type: "string" },
          retryAfter: { type: "number" },
        },
        required: ["_tag", "operation", "retryAfter"],
        additionalProperties: false,
        "x-category": ["throttling", "transient"],
        "x-retryable": true,
      },
    },
  },
  tags: [{ name: "messages" }],
} as const satisfies SamvaOpenApiDocument;

describe("structured Effect codegen driver", () => {
  it("substitutes marked leaves structurally and retains their extension metadata", () => {
    const prepared = prepareOpenApi(fixture);
    expect(
      [...prepared.extensions.runtimeSubstitutions.values()].map((entry) => entry.leafName),
    ).toEqual(["SensitiveString", "AbsoluteInstant"]);
    expect(prepared.extensions.brands.get("MessageId")).toBe("MessageId");
    expect(prepared.extensions.errors.get("RateLimitedError")).toMatchObject({
      tag: "RateLimitedError",
      categories: ["throttling", "transient"],
      retryable: true,
    });
    expect(SPECIAL_LEAVES.SensitiveString.encodedExpression).toBe("string");
  });

  it("emits brands, runtime leaves, and tagged errors from structured IR", () => {
    const source = generateEffectSource(fixture);
    expect(source).toContain('Brand.Brand<"MessageId">');
    expect(source).toContain('Schema.brand("MessageId")');
    expect(source).toContain("SensitiveString as __SamvaRuntimeSensitiveString");
    expect(source).toContain("AbsoluteInstant as __SamvaRuntimeAbsoluteInstant");
    const errorDeclaration = source
      .split("\n")
      .find((sourceLine) => sourceLine.startsWith("export class RateLimitedError"));
    expect(errorDeclaration).toContain(
      'Schema.TaggedError<RateLimitedError>()("RateLimitedError", Schema.Struct({',
    );
    expect(errorDeclaration).not.toContain('"_tag"');
    expect(source).toContain("MessagesGet429.pipe(HttpApiSchema.status(429))");
    expect(source).not.toContain("SamvaErrorMetadata");
    expect(generateEffectMetadataSource(fixture)).toContain('"throttling"');
    for (const importLine of source
      .split("\n")
      .filter((sourceLine) => sourceLine.startsWith("import "))) {
      expect(
        importLine.includes('from "effect/') ||
          importLine.endsWith('from "../runtime"') ||
          importLine.includes('from "./'),
      ).toBe(true);
    }
  });

  it("keeps exclusive schemas with their group and promotes shared and error dependencies", () => {
    const modules = generateEffectSources({
      ...fixture,
      paths: {
        ...fixture.paths,
        "/other": {
          get: {
            operationId: "other.get",
            tags: ["Other Things"],
            responses: {
              "200": {
                description: "ok",
                content: {
                  "application/json": { schema: { $ref: "#/components/schemas/OtherOnly" } },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          ...fixture.components.schemas,
          OtherOnly: {
            type: "object",
            properties: { id: { $ref: "#/components/schemas/MessageId" } },
            required: ["id"],
          },
          RateLimitedError: {
            ...fixture.components.schemas.RateLimitedError,
            properties: {
              ...fixture.components.schemas.RateLimitedError.properties,
              context: { $ref: "#/components/schemas/ErrorContext" },
            },
          },
          ErrorContext: { type: "object", properties: { detail: { type: "string" } } },
        },
      },
    }).sources;
    const shared = modules.get("shared.ts");
    const messages = modules.get("messages.ts");
    const other = modules.get("other-things.ts");
    expect(shared).toContain("export const MessageId");
    expect(shared).toContain("export const ErrorContext");
    expect(shared).toContain("export class RateLimitedError");
    expect(shared).not.toContain("export const OtherOnly");
    expect(shared).not.toContain("export const MessagesGet200");
    expect(other).toContain("export const OtherOnly");
    expect(other).toContain("export class OtherThingsGroup");
    expect(messages).toContain("export class MessagesGroup");
    expect(messages).toContain("export type MessagesGet429 = RateLimitedError");
    expect(messages).not.toContain("export const OtherOnly");
    expect(modules.get("index.ts")).toContain(".add(MessagesGroup, OtherThingsGroup)");
  });

  it("deduplicates identical union alternatives before rendering", () => {
    const duplicated = structuredClone(fixture) as SamvaOpenApiDocument;
    const operation = duplicated.paths["/messages/{id}"] as {
      get: { responses: { "429": { content: { "application/json": { schema: unknown } } } } };
    };
    const reference = { $ref: "#/components/schemas/RateLimitedError" };
    operation.get.responses["429"].content["application/json"].schema = {
      anyOf: [reference, reference],
    };

    const source = generateEffectSource(duplicated);
    expect(source).toContain("export type MessagesGet429 = RateLimitedError");
    expect(source).not.toContain("RateLimitedError | RateLimitedError");
  });

  it("renders objects with a required literal _tag as tagged structs", () => {
    const tagged = structuredClone(fixture) as SamvaOpenApiDocument;
    const operation = tagged.paths["/messages/{id}"] as {
      get: { responses: { "200": { content: { "application/json": { schema: unknown } } } } };
    };
    const variant = (tag: string) => ({
      type: "object",
      properties: { _tag: { const: tag }, detail: { type: "string" } },
      required: ["_tag", "detail"],
      additionalProperties: false,
    });
    operation.get.responses["200"].content["application/json"].schema = {
      anyOf: [variant("PublicDns"), variant("Host")],
    };

    const source = generateEffectSource(tagged);
    expect(source).toContain('Schema.TaggedStruct("PublicDns", { "detail": Schema.String })');
    expect(source).toContain('Schema.TaggedStruct("Host", { "detail": Schema.String })');
    expect(source).toContain('{ readonly _tag: "PublicDns", readonly "detail": string }');
    expect(source).not.toContain('Schema.Literal("PublicDns")');
  });

  it("brands every union alternative and retains branded references", () => {
    const brandedUnion: SamvaOpenApiDocument = {
      ...fixture,
      components: {
        schemas: {
          ...fixture.components.schemas,
          MessageId: {
            anyOf: [{ type: "string" }, { type: "number" }],
            "x-samva-brand": "MessageId",
          },
        },
      },
    };
    const source = generateEffectSource(brandedUnion);
    expect(source).toContain(
      'export type MessageId = (string | number) & EffectBrand.Brand<"MessageId">',
    );
    expect(source).toContain('Schema.brand("MessageId")');
    expect(source).toContain('export type MessagesGetPathParams = { readonly "id": MessageId }');
    expect(source).toContain('Schema.Struct({ "id": MessageId })');
  });

  it("retains brands and independent JSON constraints on source-checked strings", () => {
    const document: SamvaOpenApiDocument = {
      ...fixture,
      components: {
        schemas: {
          ...fixture.components.schemas,
          MessageId: {
            type: "string",
            maxLength: 1,
            "x-samva-brand": "MessageId",
            "x-samva-string-checks": [
              { id: "effect/schema/isMaxLength", payload: { maxLength: 3 } },
            ],
          },
        },
      },
    };
    const source = generateEffectSource(document);
    expect(source).toContain('export type MessageId = (string) & EffectBrand.Brand<"MessageId">');
    expect(source).toContain('Schema.brand("MessageId")');
    expect(source).toContain("Schema.isMaxCodePoints(1)");
    expect(source).toContain("Schema.isMaxLength(3)");
    expect(source).toContain('Schema.Struct({ "id": MessageId })');
    expect(source).not.toContain("__SamvaStringChecks");
  });

  it.each(
    [
      [],
      [{ id: "effect/schema/unsupported", payload: {} }],
      [{ id: "effect/schema/isMaxLength", payload: { maxLength: -1 } }],
      [{ id: "effect/schema/isPattern", payload: { source: "x", flags: "invalid" } }],
    ].map((checks) => ({ checks })),
  )("fails malformed or unsupported source string checks", ({ checks }) => {
    const document: SamvaOpenApiDocument = {
      ...fixture,
      components: {
        schemas: {
          ...fixture.components.schemas,
          MessageId: {
            type: "string",
            "x-samva-string-checks": checks,
          },
        },
      },
    };
    expect(() => generateEffectSource(document)).toThrow();
  });

  it("hard-fails instead of skipping an unsupported operation", () => {
    const broken = structuredClone(fixture) as SamvaOpenApiDocument;
    const operation = broken.paths["/messages/{id}"];
    if (!Predicate.isObject(operation)) {
      expect.fail("fixture path is missing");
    }
    const get = (operation as { readonly [key: string]: unknown }).get;
    if (!Predicate.isObject(get)) expect.fail("fixture operation is missing");
    (get as { responses: { [key: string]: unknown } }).responses["200"] = {
      description: "unsupported",
      content: { "text/plain": { schema: { type: "string" } } },
    };
    expect(() => generateEffectSource(broken)).toThrow("unsupported media types");
  });
});

describe("generated runtime leaves", () => {
  it("decodes sensitive strings to Redacted and encodes Redacted input", () => {
    const decoded = Schema.decodeSync(SensitiveString)("secret");
    expect(Redacted.isRedacted(decoded)).toBe(true);
    expect(Schema.encodeUnknownSync(SensitiveString)(Redacted.make("wrapped"))).toBe("wrapped");
  });

  it("accepts real absolute instants and rejects calendar rollover", () => {
    expect(Schema.decodeSync(AbsoluteInstant)("2026-08-07T10:15:30+05:30")).toBeInstanceOf(Date);
    expect(() => Schema.decodeSync(AbsoluteInstant)("2026-02-30T10:15:30Z")).toThrow();
  });
});
