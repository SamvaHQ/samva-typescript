import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import { MessagesSendHeaders } from "../src/effect/generated/messages";
import {
  AddTemplateEntryPayload,
  BrandAssets,
  CreateTemplatePayload,
} from "../src/effect/generated/shared";
import { TemplatesPutWorkspaceAssetRequestJson } from "../src/effect/generated/templates";

// SDK validation retains the source API's UTF-16 checks across JSON Schema projection. The same
// cases hold for the source schemas in the monorepo's consumer contract tests.
describe("generated API Unicode validation", () => {
  it.each([
    ["a".repeat(255), true],
    ["a".repeat(256), false],
    ["😀".repeat(127) + "a", true],
    ["😀".repeat(128), false],
    ["😀".repeat(255), false],
    ["", false],
    ["line\nbreak", true],
  ])("retains header and body idempotency bounds: %s", (key, accepted) => {
    expect(Schema.is(MessagesSendHeaders)({ "idempotency-key": key })).toBe(accepted);
    expect(Schema.is(CreateTemplatePayload.fields.idempotencyKey)(key)).toBe(accepted);
  });

  it.each([
    ["a".repeat(2040), true],
    ["a".repeat(2041), false],
    ["😀".repeat(1020), true],
    ["😀".repeat(1020) + "a", false],
    ["😀".repeat(2040), false],
  ])("retains public URL bounds: %s", (suffix, accepted) => {
    const value = { logoUrl: "https://" + suffix };
    expect(Schema.is(BrandAssets)(value)).toBe(accepted);
  });

  it.each([
    ["a".repeat(1010), true],
    ["a".repeat(1011), false],
    ["😀".repeat(505), true],
    ["😀".repeat(505) + "a", false],
  ])("retains entry path bounds: %s", (name, accepted) => {
    const path = "templates/" + name + ".tsx";
    expect(Schema.is(AddTemplateEntryPayload.fields.entryPath)(path)).toBe(accepted);
  });

  it.each([
    ["a".repeat(1024), true],
    ["a".repeat(1025), false],
    ["😀".repeat(512), true],
    ["😀".repeat(512) + "a", false],
    ["../file.tsx", false],
  ])("retains workspace path bounds and traversal checks: %s", (path, accepted) => {
    expect(Schema.is(TemplatesPutWorkspaceAssetRequestJson.fields.path)(path)).toBe(accepted);
  });
});
