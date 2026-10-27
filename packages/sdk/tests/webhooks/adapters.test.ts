import { describe, expect, it } from "@effect/vitest";

import {
  verifyRequest,
  WebhookSignatureError,
  WebhookTimestampError,
} from "../../src/webhooks/promise.js";

const canonical = {
  secret: "whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw",
  id: "msg_p5jXN8AQM9LWM0D4loKWxJek",
  timestamp: "1614265330",
  body: '{"type":"webhook.test","timestamp":"2021-02-25T12:22:10.000Z","data":{"test":2432232314}}',
};
const canonicalSignature = "v1,sL7hbrSbF9OxpR1AE6xHgPEUPJoWKW2N3VecElYSMrU=";

describe("verifyRequest", () => {
  it("reads exact Standard headers and preserves the original body", async () => {
    const request = new Request("https://example.com/webhooks/samva", {
      method: "POST",
      body: canonical.body,
      headers: {
        "webhook-id": canonical.id,
        "webhook-timestamp": canonical.timestamp,
        "webhook-signature": canonicalSignature,
      },
    });

    const result = await verifyRequest(request, canonical.secret, {
      toleranceSeconds: 1_000_000_000,
    });
    expect(result).toMatchObject({
      id: canonical.id,
      event: { type: "webhook.test", data: { test: 2432232314 } },
    });
    expect(await request.text()).toBe(canonical.body);
  });

  // The canonical vector is dated 2021, so verifying it under the default
  // 300-second tolerance is exactly the replay case the window exists for.
  it("rejects the canonical vector outside the default replay tolerance", async () => {
    const request = new Request("https://example.com/webhooks/samva", {
      method: "POST",
      body: canonical.body,
      headers: {
        "webhook-id": canonical.id,
        "webhook-timestamp": canonical.timestamp,
        "webhook-signature": canonicalSignature,
      },
    });

    await expect(verifyRequest(request, canonical.secret)).rejects.toBeInstanceOf(
      WebhookTimestampError,
    );
  });

  it("rejects a tampered raw body", async () => {
    const request = new Request("https://example.com/webhooks/samva", {
      method: "POST",
      body: canonical.body.replace("2432232314", "1"),
      headers: {
        "webhook-id": canonical.id,
        "webhook-timestamp": canonical.timestamp,
        "webhook-signature": canonicalSignature,
      },
    });

    await expect(
      verifyRequest(request, canonical.secret, {
        toleranceSeconds: 1_000_000_000,
      }),
    ).rejects.toBeInstanceOf(WebhookSignatureError);
  });
});
