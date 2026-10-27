import { assert, describe, expect, it } from "@effect/vitest";

import { createClient } from "../src/promises";

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
    const client = createClient({
      apiKey: "samva_sk_test",
      fetch: async (input) => {
        assert(input instanceof Request);
        expect(new URL(input.url).pathname).toBe("/v1/topics/unsub_7q2xk9mvt4znw8rh/forms");
        expect(input.method).toBe("POST");
        expect(input.headers.get("x-api-key")).toBe("samva_sk_test");
        expect(await input.json()).toEqual(payload);
        return Response.json(
          {
            ...payload,
            id: "be85c605-d10d-4a62-86b5-e0df9c92261e",
            publicKey: "a7847b68-7c0e-4e2a-9a43-dba64d6414a0",
            topicId: "unsub_7q2xk9mvt4znw8rh",
            linkOrigin: "https://links.example.com",
            createdAt: "2026-10-25T12:00:00.000Z",
            updatedAt: "2026-10-25T12:00:00.000Z",
          },
          { status: 201 },
        );
      },
    });
    const form = await client.topicForms.create({ id: "unsub_7q2xk9mvt4znw8rh", ...payload });
    expect(form.publicKey).toBe("a7847b68-7c0e-4e2a-9a43-dba64d6414a0");
    expect(form.createdAt).toBe("2026-10-25T12:00:00.000Z");
  });
});
