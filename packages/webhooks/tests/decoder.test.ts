import { describe, expect, it } from "@effect/vitest";
import Ajv from "ajv/dist/2020.js";
import { Schema } from "effect";

import { compilePredicates } from "../scripts/compile-predicates.js";
import { validateEvent } from "../src/decoder.gen.js";
import { WebhookEventJsonSchemas } from "../src/json-schemas.gen.js";

const object = Schema.decodeUnknownSync(Schema.Record(Schema.String, Schema.Unknown));
const array = Schema.decodeUnknownSync(Schema.Array(Schema.Unknown));
const strings = Schema.decodeUnknownSync(Schema.Array(Schema.String));

const fixture = (input: unknown, definitions: Readonly<Record<string, unknown>>): unknown => {
  const schema = object(input);
  if (typeof schema.$ref === "string")
    return fixture(definitions[schema.$ref.slice(8)], definitions);
  if (schema.enum !== undefined) return array(schema.enum)[0];
  if (schema.anyOf !== undefined) return fixture(array(schema.anyOf)[0], definitions);
  switch (schema.type) {
    case "object": {
      const properties = object(schema.properties ?? {});
      return Object.fromEntries(
        Object.entries(properties).map(([key, member]) => [key, fixture(member, definitions)]),
      );
    }
    case "array":
      return schema.items === undefined ? [] : [fixture(schema.items, definitions)];
    case "string": {
      if (typeof schema.pattern === "string") {
        const hexLength = /^\^\[0-9a-f\]\{(\d+)\}\$$/.exec(schema.pattern)?.[1];
        if (hexLength !== undefined) return "0".repeat(Number(hexLength));
        const prefix = /^\^([a-z]+_)/.exec(schema.pattern)?.[1];
        if (prefix === undefined) throw new Error(`No fixture for pattern ${schema.pattern}`);
        return `${prefix}${"0".repeat(16)}`;
      }
      return "example";
    }
    case "number":
    case "integer":
      return typeof schema.minimum === "number" ? schema.minimum : 0;
    case "boolean":
      return true;
    case "null":
      return null;
    default:
      return {};
  }
};

const mutations = [null, "bad", 42, true, [], {}, undefined];
describe("compact webhook validation", () => {
  it.each(Object.entries(WebhookEventJsonSchemas))(
    "matches Ajv on %s payload mutations",
    (_type, input) => {
      const schema = object(input);
      const definitions = object(schema.$defs ?? {});
      const event = object(fixture(schema, definitions));
      const data = object(event.data);
      const ajv = new Ajv({ strict: false });
      const reference = ajv.compile(schema);
      expect(reference(event)).toBe(true);
      expect(validateEvent(event)).toBe(true);
      for (const key of Object.keys(data)) {
        for (const value of mutations) {
          const candidate: unknown = JSON.parse(
            JSON.stringify({ ...event, data: { ...data, [key]: value } }),
          );
          expect(validateEvent(candidate), `${_type}.${key} = ${JSON.stringify(value)}`).toBe(
            reference(candidate),
          );
        }
      }
      const payloadSchema = object(object(schema.properties).data);
      for (const key of strings(payloadSchema.required ?? [])) {
        const { [key]: _removed, ...remaining } = data;
        expect(validateEvent({ ...event, data: remaining })).toBe(false);
      }
    },
  );

  it("fails generation on unsupported constraints rather than weakening validation", () => {
    expect(() => compilePredicates().compile({ type: "string", format: "email" }, {})).toThrow(
      "Unsupported webhook validation keyword: format",
    );
    expect(() => compilePredicates().compile({ $ref: "#/$defs/Missing" }, {})).toThrow(
      "Missing reference",
    );
    expect(() =>
      compilePredicates().compile({ $ref: "#/$defs/Id", maxLength: 1 }, { Id: { type: "string" } }),
    ).toThrow("Unsupported webhook reference sibling: maxLength");
    expect(() =>
      compilePredicates().compile(
        { $ref: "#/$defs/Id", format: "email" },
        { Id: { type: "string" } },
      ),
    ).toThrow("Unsupported webhook validation keyword: format");
  });
});
