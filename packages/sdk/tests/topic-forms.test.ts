import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";

import { SamvaApi, TopicId } from "../src/effect/generated";
import { createClient } from "../src/promises";
import { fakeSamvaApi } from "./support/fake-samva-api";

describe("topic forms client", () => {
  it("addresses the topic and decodes a created form through the ergonomic client", async () => {
    const payload = {
      allowedOrigins: ["https://newsletter.example.com"],
      confirmationTitle: "Check your inbox",
      confirmationMessage: "Confirm your email to join.",
      successTitle: "You are subscribed",
      successMessage: "Watch your inbox for the next issue.",
      redirectUrl: null,
    };
    const fake = fakeSamvaApi(SamvaApi)({
      "Topic forms": {
        topicFormsCreate: () =>
          Effect.succeed({
            ...payload,
            id: "be85c605-d10d-4a62-86b5-e0df9c92261e",
            publicKey: "a7847b68-7c0e-4e2a-9a43-dba64d6414a0",
            topicId: Schema.decodeSync(TopicId)("tpc_7q2xk9mvt4znw8rh"),
            linkOrigin: "https://links.example.com",
            createdAt: "2026-10-25T12:00:00.000Z",
            updatedAt: "2026-10-25T12:00:00.000Z",
          }),
      },
    });
    const client = createClient({ apiKey: "samva_sk_test", fetch: fake.fetch });
    const form = await client.topicForms.create({ id: "tpc_7q2xk9mvt4znw8rh", ...payload });
    fake.assertComplete();
    expect(fake.requests).toHaveLength(1);
    expect(fake.requests[0]).toMatchObject({
      method: "POST",
      path: "/v1/topics/tpc_7q2xk9mvt4znw8rh/forms",
      body: payload,
    });
    expect(fake.requests[0]?.headers.get("x-api-key")).toBe("samva_sk_test");
    expect(form.publicKey).toBe("a7847b68-7c0e-4e2a-9a43-dba64d6414a0");
    expect(form.createdAt).toBe("2026-10-25T12:00:00.000Z");
  });
});
