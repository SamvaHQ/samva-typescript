import { describe, expect, it } from "@effect/vitest";

import { generatePromiseClientSources } from "../../codegen/promise-client";

const body = (schema: unknown) => ({
  required: true,
  content: { "application/json": { schema } },
});
const ok = (schema: unknown) => ({
  "200": { description: "ok", content: { "application/json": { schema } } },
});
const ref = (name: string) => ({ $ref: `#/components/schemas/${name}` });

const document = {
  openapi: "3.1.0",
  info: { title: "Test", version: "1.0.0" },
  paths: {
    "/batch": {
      post: {
        operationId: "events.batch",
        tags: ["events"],
        requestBody: body({
          type: "object",
          properties: {
            events: { type: "array", prefixItems: [{ type: "string" }], items: { type: "string" } },
            data: ref("Bag"),
          },
          required: ["events"],
        }),
        responses: ok(ref("Bag")),
      },
    },
    "/notes": {
      post: {
        operationId: "notes.create",
        tags: ["notes"],
        requestBody: body(ref("NoteInput")),
        responses: ok(ref("Note")),
      },
    },
    "/pairs": {
      post: {
        operationId: "pairs.create",
        tags: ["pairs"],
        requestBody: body({
          type: "object",
          properties: { pair: ref("Pair") },
          required: ["pair"],
        }),
        responses: ok(ref("Pair")),
      },
    },
  },
  components: {
    schemas: {
      Bag: { type: "object", additionalProperties: { type: "string" } },
      NoteInput: {
        type: "object",
        properties: { labels: { type: "object", additionalProperties: { type: "string" } } },
      },
      Note: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
      Pair: { type: "array", prefixItems: [ref("Bag")], items: ref("Bag") },
    },
  },
};

describe("Promise client read and write types", () => {
  const sources = generatePromiseClientSources(document);

  it("keeps the rest of a nonempty-array tuple in request parameters", () => {
    expect(sources.sdk).toContain("events: [string, ...Array<string>];");
    expect(sources.sdk).not.toContain("events: [string];");
  });

  it("imports only component types", () => {
    expect(sources.sdk).not.toMatch(/\bArray,/);
  });

  it("keeps a shared record exact and adds a writable variant that requests use", () => {
    expect(sources.types).toContain("export type Bag = {\n  [key: string]: string;\n};");
    expect(sources.types).toMatch(
      /export type BagWritable = \{\s+\[key: string\]: string \| undefined;/,
    );
    expect(sources.types).toContain("data?: BagWritable | undefined;");
    expect(sources.sdk).toContain("data?: BagWritable");
    expect(sources.types).toContain("  200: Bag;");
  });

  it("widens a schema only requests reach in place and names its parameter after it", () => {
    expect(sources.types).toMatch(
      /export type NoteInput = \{\s+labels\?: \{\s+\[key: string\]: string \| undefined;/,
    );
    expect(sources.types).not.toContain("NoteInputWritable");
    expect(sources.sdk).toContain("noteInput: NoteInput");
  });

  it("carries a tuple rest into the write variant", () => {
    expect(sources.types).toContain("export type Pair = [Bag, ...Array<Bag>];");
    expect(sources.types).toContain(
      "export type PairWritable = [BagWritable, ...Array<BagWritable>];",
    );
    expect(sources.sdk).toContain("pair: PairWritable");
  });

  it("keeps a root object union flat without discarding its discriminator", () => {
    const generated = generatePromiseClientSources({
      ...document,
      paths: {
        "/imports": {
          post: {
            operationId: "contacts.startImport",
            tags: ["contacts"],
            requestBody: body({
              anyOf: [
                {
                  type: "object",
                  properties: { mode: { const: "new" }, input: { type: "string" } },
                  required: ["mode", "input"],
                },
                {
                  type: "object",
                  properties: { mode: { const: "resume" }, jobId: { type: "string" } },
                  required: ["mode", "jobId"],
                },
              ],
            }),
            responses: ok(ref("Note")),
          },
        },
      },
    });
    expect(generated.sdk).toContain('mode: "new";');
    expect(generated.sdk).toContain('mode: "resume";');
    expect(generated.sdk).toContain("const params = { body: parameters };");
    expect(generated.sdk).not.toContain('key: "body", map: "body"');
  });
});
