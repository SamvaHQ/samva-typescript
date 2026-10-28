import { describe, expect, it } from "@effect/vitest";
import { Schema, SchemaRepresentation } from "effect";
import { HttpApi, HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";

describe("representation identity", () => {
  it("reuses the body component while preserving each response status", () => {
    const Widget = Schema.Struct({
      id: Schema.String,
      metadata: Schema.Record(Schema.String, Schema.Unknown),
    }).annotate({ identifier: "Widget" });
    const Api = HttpApi.make("Api").add(
      HttpApiGroup.make("widgets").add(
        HttpApiEndpoint.get("get", "/widgets", { success: Widget }),
        HttpApiEndpoint.post("create", "/widgets", {
          success: Widget.pipe(HttpApiSchema.status(201)),
        }),
      ),
    );

    const spec = OpenApi.fromApi(Api);
    expect(
      Object.keys(spec.components.schemas)
        .filter((name) => name.startsWith("Widget"))
        .sort(),
    ).toEqual(["Widget"]);
    expect(spec.paths["/widgets"]?.get?.responses["200"]).toMatchObject({
      content: { "application/json": { schema: { $ref: "#/components/schemas/Widget" } } },
    });
    expect(spec.paths["/widgets"]?.post?.responses["201"]).toMatchObject({
      content: { "application/json": { schema: { $ref: "#/components/schemas/Widget" } } },
    });
  });

  it("keeps structurally different records with the same identifier distinct", () => {
    const UnknownValues = Schema.Record(Schema.String, Schema.Unknown).annotate({
      identifier: "Merged",
    });
    const NumberValues = Schema.Record(Schema.String, Schema.Finite).annotate({
      identifier: "Merged",
    });

    const represented = SchemaRepresentation.toRepresentations([
      UnknownValues.ast,
      NumberValues.ast,
    ]);

    expect(Object.keys(represented.references)).toEqual(["Merged", "Merged_1"]);
  });

  it("keeps different body property descriptions distinct across statuses", () => {
    const Base = Schema.Struct({
      id: Schema.String,
      metadata: Schema.Record(Schema.String, Schema.Unknown),
    }).annotate({ identifier: "Contextual" });
    const Documented = Schema.Struct({
      id: Schema.String.annotateKey({ description: "distinct key context" }),
      metadata: Schema.Record(Schema.String, Schema.Unknown),
    }).annotate({ identifier: "Contextual" });
    const plain = Schema.toCodecJson(Base.pipe(HttpApiSchema.status(200))).ast;
    const documented = Schema.toCodecJson(Documented.pipe(HttpApiSchema.status(201))).ast;

    const represented = SchemaRepresentation.toRepresentations([plain, documented]);

    expect(represented.representations).toEqual([
      { _tag: "Reference", $ref: "Contextual" },
      { _tag: "Reference", $ref: "Contextual_1" },
    ]);
  });
});
