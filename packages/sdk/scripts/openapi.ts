/**
 * Write the OpenAPI document the SDK is generated from: the public document built from the API
 * contracts (`@samva/openapi/document`) plus the one generator-specific transform below.
 */

import fs from "node:fs";

import { type OpenApiDocument, readPublicOpenApi } from "@samva/openapi/document";
import { Predicate, type Schema } from "effect";

const isObject = (value: Schema.Json | undefined): value is Schema.JsonObject =>
  Predicate.isObject(value) && !Array.isArray(value);

const HTTP_METHODS = ["get", "put", "post", "delete", "options", "head", "patch", "trace"];

const SCHEMA_REF_PREFIX = "#/components/schemas/";

/**
 * Inline a request body that is a bare `$ref` while retaining the explicitly
 * named component as a public reusable schema.
 *
 * The Promise client's flat parameters (`codegen/generate-promises.ts`) only
 * spread a request body they can see as an inline object: a `$ref` body instead
 * becomes one parameter named after the component, so
 * `messages.send({ to, email, … })` would turn into
 * `messages.send({ sendMessagePayload: { … } })`. Naming a shared payload is
 * still right for the published contract, so the request site pays instead.
 *
 * Remove this when the generator spreads a `$ref` request body itself.
 */
const inlineRequestBodies = (input: OpenApiDocument): void => {
  const { components, paths } = input;
  if (!isObject(components) || !isObject(components.schemas) || !isObject(paths)) return;
  const { schemas } = components;

  for (const pathItem of Object.values(paths)) {
    if (!isObject(pathItem)) continue;
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!HTTP_METHODS.includes(method) || !isObject(operation)) continue;
      const { requestBody } = operation;
      const content = isObject(requestBody) ? requestBody.content : undefined;
      const json = isObject(content) ? content["application/json"] : undefined;
      if (!isObject(json)) continue;
      const { schema } = json;
      if (!isObject(schema) || Object.keys(schema).length !== 1) continue;
      const ref = schema.$ref;
      if (typeof ref !== "string") continue;
      const name = ref.slice(SCHEMA_REF_PREFIX.length);
      const body = schemas[name];
      if (body === undefined) continue;
      // `buildSpec` hands this transform its own clone of the document.
      Object.assign(json, { schema: structuredClone(body) });
    }
  }
};

/** Build the SDK's generator input from the published document. */
export const buildSpec = (published: OpenApiDocument): OpenApiDocument => {
  const document = structuredClone(published);
  inlineRequestBodies(document);
  return document;
};

if (import.meta.main) {
  fs.writeFileSync("openapi.json", JSON.stringify(buildSpec(readPublicOpenApi()), null, 2));
  console.log("OpenAPI spec generated from the public document");
}
