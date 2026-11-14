import { describe, expect, it } from "@effect/vitest";
import { Predicate, Redacted, Schema } from "effect";

import { expectRecord } from "../codegen/promise-schema";
import document from "../openapi.json";
import {
  WhatsappConnectBusinessAccountRequestJson,
  WhatsappGetMediaDownloadUrl200,
} from "../src/effect/generated/whats-app";
import { WhatsAppFlowEndpointSettings } from "../src/effect/generated/whats-app-flows";
import { CreatedWhatsAppSetupLink } from "../src/effect/generated/whats-app-setup-links";

const secretFields = [
  ["signup code", WhatsappConnectBusinessAccountRequestJson.fields.code],
  ["private media URL", WhatsappGetMediaDownloadUrl200.fields.url],
  ["setup-link URL", CreatedWhatsAppSetupLink.fields.url],
  ["flow signing secret", WhatsAppFlowEndpointSettings.fields.secret],
] as const;

describe("public WhatsApp credential protection", () => {
  it.each(secretFields)("decodes %s to Redacted and keeps the wire value", (_, schema) => {
    const secret = "credential-that-must-not-appear-in-logs";
    const decoded = Schema.decodeSync(schema)(secret);
    expect(Redacted.isRedacted(decoded)).toBe(true);
    if (!Redacted.isRedacted(decoded)) throw new Error("Expected a redacted credential");
    expect(Redacted.value(decoded)).toBe(secret);
    expect(String(decoded)).toBe("<redacted>");
    expect(JSON.stringify({ value: decoded })).not.toContain(secret);
    expect(Schema.encodeUnknownSync(schema)(decoded)).toBe(secret);
  });

  it("keeps the signup code nonempty", () => {
    expect(() =>
      Schema.decodeSync(WhatsappConnectBusinessAccountRequestJson.fields.code)(""),
    ).toThrow();
  });

  it("marks every credential occurrence in all WhatsApp management operations", () => {
    const schemas: Readonly<Record<string, unknown>> = document.components.schemas;
    const sensitivePaths = (input: unknown, prefix = "", seen = new Set<string>()): string[] => {
      const node = expectRecord(input, prefix);
      if (typeof node.$ref === "string") {
        if (seen.has(node.$ref)) return [];
        return sensitivePaths(
          schemas[node.$ref.replace("#/components/schemas/", "")],
          prefix,
          new Set([...seen, node.$ref]),
        );
      }
      if (node["x-sensitive"] === true) return [prefix];
      const fields = node.properties === undefined ? {} : expectRecord(node.properties, prefix);
      return [
        ...Object.entries(fields).flatMap(([name, value]) =>
          sensitivePaths(value, prefix ? `${prefix}.${name}` : name, seen),
        ),
        ...(node.items === undefined ? [] : sensitivePaths(node.items, `${prefix}[]`, seen)),
        ...["anyOf", "oneOf", "allOf"].flatMap((key) =>
          Array.isArray(node[key])
            ? node[key].flatMap((value) => sensitivePaths(value, prefix, seen))
            : [],
        ),
      ];
    };
    const observed: string[] = [];
    let operationCount = 0;
    for (const item of Object.values(document.paths)) {
      for (const value of Object.values(item)) {
        if (!Predicate.isObject(value) || !("operationId" in value)) continue;
        const operation = expectRecord(value, "operation");
        if (
          typeof operation.operationId !== "string" ||
          !/^(whatsapp|whatsappFlows|whatsappSetupLinks|templateRegistrations)\./.test(
            operation.operationId,
          )
        )
          continue;
        operationCount++;
        const jsonSchema = (body: unknown): unknown => {
          const content = expectRecord(expectRecord(body, "body").content, "content");
          return expectRecord(content["application/json"], "JSON").schema;
        };
        if (operation.requestBody !== undefined) {
          observed.push(
            ...sensitivePaths(jsonSchema(operation.requestBody)).map(
              (path) => `${operation.operationId}.request.${path}`,
            ),
          );
        }
        for (const [status, response] of Object.entries(
          expectRecord(operation.responses, "responses"),
        )) {
          if (!status.startsWith("2")) continue;
          const body = expectRecord(response, status);
          if (body.content !== undefined)
            observed.push(
              ...sensitivePaths(jsonSchema(body)).map(
                (path) => `${operation.operationId}.response.${path}`,
              ),
            );
        }
      }
    }
    expect(operationCount).toBe(29);
    expect(observed.sort()).toEqual([
      "whatsapp.connectBusinessAccount.request.code",
      "whatsapp.getMediaDownloadUrl.response.url",
      "whatsappFlows.rotateEndpointSecret.response.secret",
      "whatsappFlows.setEndpoint.response.secret",
      "whatsappSetupLinks.create.response.url",
    ]);
  });
});
