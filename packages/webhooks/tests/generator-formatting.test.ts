/// <reference types="node" />

import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

import { describe, expect, it } from "@effect/vitest";
import { type JsonSchema, SchemaRepresentation } from "effect";
import { parseSync } from "oxc-parser";

import { expandSchemaObjects } from "../scripts/expand-schema-objects";
import { WebhookEventJsonSchemas } from "../src/json-schemas.gen";

const ast = (source: string) => {
  const parsed = parseSync("schemas.gen.ts", source);
  expect(parsed.errors).toEqual([]);
  return JSON.stringify(parsed.program, (key, value) =>
    key === "start" || key === "end" ? undefined : value,
  );
};

describe("generated schema formatting", () => {
  it("changes only object-expression whitespace, including after Unicode and inside templates", () => {
    const source = [
      'const unicode = "😀é";',
      "type Shape = { readonly value: string };",
      "const { value } = input;",
      "function block() { return 1; }",
      "const schema = { nested: { empty: {},",
      String.raw`text: "{ \"quoted\" }", single: '{ }', pattern: /[{}]\/\w{2}/u,`,
      'template: `raw { } ${{ nested: "}" }} tail` }, ["computed}"]: 1 };',
    ].join("\n");
    const expanded = expandSchemaObjects(source);

    expect(expanded).not.toBe(source);
    expect(ast(expanded)).toBe(ast(source));
    expect(expandSchemaObjects(expanded)).toBe(expanded);
    expect(expanded).toContain("type Shape = { readonly value: string };");
    expect(expanded).toContain("const { value } = input;");
    expect(expanded).toContain("function block() { return 1; }");
    expect(expanded).toContain("empty: {}");
  });

  it("rejects invalid generated code", () => {
    expect(() => expandSchemaObjects("const schema = { nested: ;")).toThrow(
      "Invalid generated webhook schemas",
    );
  });

  it("formats the nested message.received schema within a bounded subprocess", () => {
    const document: JsonSchema.Document<"draft-2020-12"> = {
      dialect: "draft-2020-12",
      schema: { ...WebhookEventJsonSchemas["message.received"] },
      definitions: {},
    };
    const represented = SchemaRepresentation.toRepresentation(
      SchemaRepresentation.fromJsonSchemaDocument(document, { patterns: "apply" }).ast,
      { referencePolicy: () => undefined },
    );
    const code = SchemaRepresentation.toCodeDocument(
      SchemaRepresentation.toMultiDocument(represented),
    );
    const [generated] = code.codes;
    expect(generated).toBeDefined();
    const source = `export const MessageReceivedEventSchema = ${generated?.runtime};\n`;
    const expanded = expandSchemaObjects(source);
    expect(ast(expanded)).toBe(ast(source));

    const root = resolve(import.meta.dirname, "../../..");
    const format = (input: string) => {
      const result = spawnSync(
        resolve(root, "node_modules/.bin/oxfmt"),
        [
          `--config=${resolve(root, "oxfmt.config.ts")}`,
          `--stdin-filepath=${resolve(root, "packages/webhooks/src/schemas.gen.ts")}`,
        ],
        { cwd: root, input, encoding: "utf8", timeout: 10_000 },
      );
      if (result.error) throw result.error;
      expect(result.stderr).toBe("");
      expect(result.status).toBe(0);
      return result.stdout;
    };
    const formatted = format(expanded);
    expect(parseSync("schemas.gen.ts", formatted).errors).toEqual([]);
    expect(format(expanded)).toBe(formatted);
    expect(format(formatted)).toBe(formatted);
  });
});
