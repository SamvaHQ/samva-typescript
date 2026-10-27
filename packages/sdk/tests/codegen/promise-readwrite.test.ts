import { describe, expect, it } from "@effect/vitest";

import { splitReadWrite } from "../../codegen/promise-readwrite";
import { schemaToIr, type Ir } from "../../codegen/promise-schema";

const ref = (name: string) => ({ $ref: `#/components/schemas/${name}` });
const record = { type: "object", additionalProperties: { type: "string" } };

const split = (
  schemas: Record<string, unknown>,
  requests: ReadonlyArray<unknown>,
  responses: ReadonlyArray<unknown>,
) =>
  splitReadWrite(
    Object.entries(schemas).map(([name, schema]): readonly [string, Ir] => [
      name,
      schemaToIr(schema, name),
    ]),
    requests.map((schema) => schemaToIr(schema, "request")),
    responses.map((schema) => schemaToIr(schema, "response")),
  );

const emitted = (result: ReturnType<typeof split>) =>
  result.schemas.map(({ name, write }) => (write ? `${name} (write)` : name));

const referenced = (schema: Ir | undefined) => schema?.$ref?.replace("#/components/schemas/", "");

describe("read/write split", () => {
  it("emits a schema only requests reach once, as a write schema", () => {
    const result = split({ Bag: record }, [ref("Bag")], []);
    expect(emitted(result)).toEqual(["Bag (write)"]);
  });

  it("emits a schema only responses reach once, as a read schema", () => {
    const result = split({ Bag: record }, [], [ref("Bag")]);
    expect(emitted(result)).toEqual(["Bag"]);
  });

  it("splits a shared schema that holds a record", () => {
    const result = split({ Bag: record }, [ref("Bag")], [ref("Bag")]);
    expect(emitted(result)).toEqual(["Bag", "BagWritable (write)"]);
    expect(referenced(result.retarget(schemaToIr(ref("Bag"), "request")))).toBe("BagWritable");
  });

  it("keeps a shared schema without a record whole", () => {
    const plain = { type: "object", properties: { name: { type: "string" } } };
    const result = split({ Plain: plain }, [ref("Plain")], [ref("Plain")]);
    expect(emitted(result)).toEqual(["Plain"]);
    expect(referenced(result.retarget(schemaToIr(ref("Plain"), "request")))).toBe("Plain");
  });

  it("keeps a record whose entries already admit anything whole", () => {
    const open = { type: "object", additionalProperties: true };
    const result = split({ Open: open }, [ref("Open")], [ref("Open")]);
    expect(emitted(result)).toEqual(["Open"]);
  });

  it("splits a schema that reaches a split schema through a reference", () => {
    const schemas = {
      Bag: record,
      Inner: { type: "object", properties: { data: ref("Bag") } },
      Outer: { type: "object", properties: { inner: ref("Inner") }, required: ["inner"] },
      Leaf: { type: "object", properties: { id: { type: "string" } } },
      Holder: { type: "object", properties: { outer: ref("Outer"), leaf: ref("Leaf") } },
    };
    const result = split(schemas, [ref("Holder")], [ref("Holder")]);
    expect(emitted(result)).toEqual([
      "Bag",
      "BagWritable (write)",
      "Inner",
      "InnerWritable (write)",
      "Outer",
      "OuterWritable (write)",
      "Leaf",
      "Holder",
      "HolderWritable (write)",
    ]);
    const holder = result.schemas.find(({ name }) => name === "HolderWritable")?.schema;
    expect(referenced(holder?.properties?.["outer"])).toBe("OuterWritable");
    expect(referenced(holder?.properties?.["leaf"])).toBe("Leaf");
    const outer = result.schemas.find(({ name }) => name === "OuterWritable")?.schema;
    expect(referenced(outer?.properties?.["inner"])).toBe("InnerWritable");
  });

  it("points a request-only schema at the write variants of the schemas it shares", () => {
    const schemas = {
      Bag: record,
      Request: { type: "object", properties: { data: ref("Bag") } },
    };
    const result = split(schemas, [ref("Request")], [ref("Bag")]);
    expect(emitted(result)).toEqual(["Bag", "BagWritable (write)", "Request (write)"]);
    const request = result.schemas.find(({ name }) => name === "Request")?.schema;
    expect(referenced(request?.properties?.["data"])).toBe("BagWritable");
  });

  it("splits the members of a union consistently", () => {
    const schemas = {
      Node: { anyOf: [ref("SendNode"), ref("WaitNode")] },
      SendNode: {
        type: "object",
        properties: { type: { const: "send" }, data: ref("Bag") },
        required: ["type"],
      },
      WaitNode: { type: "object", properties: { type: { const: "wait" } }, required: ["type"] },
      Bag: record,
    };
    const result = split(schemas, [ref("Node")], [ref("Node")]);
    expect(emitted(result)).toEqual([
      "Node",
      "NodeWritable (write)",
      "SendNode",
      "SendNodeWritable (write)",
      "WaitNode",
      "Bag",
      "BagWritable (write)",
    ]);
    const node = result.schemas.find(({ name }) => name === "NodeWritable")?.schema;
    expect(node?.items?.map(referenced)).toEqual(["SendNodeWritable", "WaitNode"]);
    const original = result.schemas.find(({ name }) => name === "Node")?.schema;
    expect(original?.items?.map(referenced)).toEqual(["SendNode", "WaitNode"]);
  });

  it("retargets the rest of a tuple", () => {
    const schemas = {
      Bag: record,
      Pair: { type: "array", prefixItems: [ref("Bag")], items: ref("Bag") },
    };
    const result = split(schemas, [ref("Pair")], [ref("Pair")]);
    expect(emitted(result)).toEqual(["Bag", "BagWritable (write)", "Pair", "PairWritable (write)"]);
    const pair = result.schemas.find(({ name }) => name === "PairWritable")?.schema;
    expect(pair?.items?.map(referenced)).toEqual(["BagWritable"]);
    expect(referenced(pair?.rest)).toBe("BagWritable");
  });

  it("splits a schema reached through a cycle", () => {
    const schemas = {
      Tree: {
        type: "object",
        properties: { bag: ref("Bag"), children: { type: "array", items: ref("Tree") } },
      },
      Bag: record,
    };
    const result = split(schemas, [ref("Tree")], [ref("Tree")]);
    expect(emitted(result)).toEqual(["Tree", "TreeWritable (write)", "Bag", "BagWritable (write)"]);
    const tree = result.schemas.find(({ name }) => name === "TreeWritable")?.schema;
    expect(referenced(tree?.properties?.["children"]?.items?.[0])).toBe("TreeWritable");
  });

  it("fails when a write variant collides with a declared schema", () => {
    expect(() =>
      split({ Bag: record, BagWritable: { type: "string" } }, [ref("Bag")], [ref("Bag")]),
    ).toThrow("Write variant BagWritable of Bag collides with a declared schema");
  });
});
