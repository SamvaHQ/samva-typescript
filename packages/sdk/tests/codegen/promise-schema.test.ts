import { describe, expect, it } from "@effect/vitest";

import { printType, schemaToIr, schemaToType } from "../../codegen/promise-schema";

const typeOf = (schema: unknown) =>
  printType(
    schemaToType(schemaToIr(schema, "#"), () => {}),
    { loosenOptionals: false, loosenRecords: false },
  );

describe("Promise schema types", () => {
  it("preserves excluded union selectors as never", () => {
    expect(typeOf({ not: {} })).toBe("never");
    expect(typeOf({ type: "object", properties: { email: { not: {} } } })).toContain(
      "email?: never",
    );
  });

  it("refuses a general negation it cannot represent", () => {
    expect(() => typeOf({ not: { type: "string" } })).toThrow("Only not: {} is supported");
  });
  it("types a non-empty array as a tuple with a rest element", () => {
    expect(
      typeOf({ type: "array", prefixItems: [{ type: "string" }], items: { type: "string" } }),
    ).toBe("[string, ...Array<string>]");
  });

  it("keeps a fixed-length array a fixed tuple", () => {
    expect(typeOf({ type: "array", minItems: 2, maxItems: 2, items: { type: "string" } })).toBe(
      "[string, string]",
    );
  });

  it("types a record with constrained keys by its values", () => {
    expect(
      typeOf({
        type: "object",
        propertyNames: { type: "string", maxLength: 64 },
        additionalProperties: { type: "string" },
      }),
    ).toContain("[key: string]: string");
  });

  it("types a record with bounded entry counts by its values", () => {
    const bounded = {
      type: "object",
      minProperties: 1,
      maxProperties: 50,
      additionalProperties: { type: "string" },
    };
    expect(typeOf(bounded)).toBe(
      typeOf({ type: "object", additionalProperties: { type: "string" } }),
    );
    expect(typeOf(bounded)).toContain("[key: string]: string");
  });

  it("still refuses keywords it does not know", () => {
    expect(() => typeOf({ type: "object", unevaluatedProperties: false })).toThrow(
      'Unsupported schema keyword "unevaluatedProperties"',
    );
  });

  it("types an array closed with items: false as the empty tuple", () => {
    expect(typeOf({ type: "array", items: false })).toBe("[]");
  });

  it("keeps a closed prefix a fixed tuple", () => {
    expect(typeOf({ type: "array", prefixItems: [{ type: "string" }], items: false })).toBe(
      "[string]",
    );
  });

  it("admits undefined in record entries only when records are loosened", () => {
    const loose = printType(
      schemaToType(
        schemaToIr(
          {
            type: "object",
            properties: { data: { type: "object", additionalProperties: { type: "string" } } },
          },
          "#",
        ),
        () => {},
      ),
      { loosenOptionals: true, loosenRecords: true },
    );
    expect(loose).toContain("data?: {");
    expect(loose).toContain("[key: string]: string | undefined;");
    const exact = printType(
      schemaToType(
        schemaToIr({ type: "object", additionalProperties: { type: "string" } }, "#"),
        () => {},
      ),
      { loosenOptionals: true, loosenRecords: false },
    );
    expect(exact).toContain("[key: string]: string;");
  });
});
