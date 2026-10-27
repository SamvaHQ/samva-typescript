import { describe, expect, it } from "@effect/vitest";
import { readPublicOpenApi } from "@samva/openapi/document";
import { Predicate } from "effect";

import { buildSpec } from "../scripts/openapi";

/**
 * The SDK is generated from the public document with one generator-specific
 * change: request bodies are inlined so the Promise client keeps flat parameters.
 */

const published = readPublicOpenApi();
const spec = buildSpec(published);

const templateCreateBody = (document: unknown): unknown => {
  const paths = Predicate.isObject(document) ? document.paths : undefined;
  const pathItem = Predicate.isObject(paths) ? paths["/v1/templates"] : undefined;
  const post = Predicate.isObject(pathItem) ? pathItem.post : undefined;
  const requestBody = Predicate.isObject(post) ? post.requestBody : undefined;
  const content = Predicate.isObject(requestBody) ? requestBody.content : undefined;
  const json = Predicate.isObject(content) ? content["application/json"] : undefined;
  return Predicate.isObject(json) ? json.schema : undefined;
};

describe("SDK generator input", () => {
  it("inlines request bodies while keeping the named component", () => {
    const body = templateCreateBody(spec);
    expect(Predicate.isObject(body) && "$ref" in body).toBe(false);
    expect(Predicate.isObject(body) ? body.properties : undefined).toMatchObject({
      name: expect.anything(),
      idempotencyKey: expect.anything(),
    });
    const components = Predicate.isObject(spec.components) ? spec.components : {};
    const schemas = Predicate.isObject(components.schemas) ? components.schemas : {};
    expect(schemas.CreateTemplatePayload).toBeDefined();
  });

  it("excludes the private issue-agent surface", () => {
    const paths = Object.keys(spec.paths ?? {});
    expect(paths).toContain("/v1/topics/{id}/issues");
    expect(paths.filter((path) => path.includes("/issues/agent"))).toEqual([]);
    expect(JSON.stringify(spec)).not.toContain("topicIssueAgent.");
  });

  it("otherwise matches the published document", () => {
    expect(spec.components).toEqual(published.components);
    expect(Object.keys(spec.paths ?? {})).toEqual(Object.keys(published.paths ?? {}));
  });
});
