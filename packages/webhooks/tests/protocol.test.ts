import { describe, expect, it } from "@effect/vitest";

import {
  generateWebhookSecret,
  InvalidWebhookHeadersError,
  MalformedWebhookPayloadError,
  readWebhookHeaders,
  signWebhook,
  verifyWebhookAt,
  WEBHOOK_ID_HEADER,
  WEBHOOK_SIGNATURE_HEADER,
  WEBHOOK_TIMESTAMP_HEADER,
  WebhookTimestampError,
  WebhookVerificationError,
} from "../src/protocol.js";

const canonical = {
  secret: "whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw",
  id: "msg_p5jXN8AQM9LWM0D4loKWxJek",
  timestamp: "1614265330",
  body: '{"test": 2432232314}',
  signature: "v1,g0hM9SsE+OTPJTGt/tmIKtSyZlE3uFJELVlNIOLJ1OE=",
};

describe("Standard Webhooks v1", () => {
  it("matches the canonical signature vector with a Standard 24-byte secret", async () => {
    await expect(signWebhook(canonical)).resolves.toBe(canonical.signature);
  });

  it("generates a padded 32-byte whsec secret", () => {
    const secret = generateWebhookSecret();
    expect(secret).toMatch(/^whsec_[A-Za-z0-9+/]{43}=$/);
    expect(
      Uint8Array.from(atob(secret.slice(6)), (character) => character.charCodeAt(0)),
    ).toHaveLength(32);
  });

  it("signs the exact raw bytes", async () => {
    const secret = generateWebhookSecret();
    const compact = '{"type":"test","timestamp":"2026-01-01T00:00:00.000Z","data":{}}';
    const spaced = '{"type": "test", "timestamp": "2026-01-01T00:00:00.000Z", "data": {}}';
    await expect(
      signWebhook({ id: "evt_same", timestamp: 1_767_225_600, body: compact, secret }),
    ).resolves.not.toBe(
      await signWebhook({ id: "evt_same", timestamp: 1_767_225_600, body: spaced, secret }),
    );
  });

  it("accepts any matching v1 signature during rotation", async () => {
    const secret = generateWebhookSecret();
    const body = '{"type":"webhook.test","timestamp":"2026-01-01T00:00:00.000Z","data":{}}';
    const signature = await signWebhook({
      id: "evt_stable",
      timestamp: 1_767_225_600,
      body,
      secret,
    });
    await expect(
      verifyWebhookAt({
        body,
        headers: {
          id: "evt_stable",
          timestamp: "1767225600",
          signature: `v1,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA= ${signature}`,
        },
        secret,
        nowMilliseconds: 1_767_225_600_000,
      }),
    ).resolves.toMatchObject({ id: "evt_stable", event: { type: "webhook.test" } });
  });

  it("includes the timestamp in the signed content", async () => {
    const secret = generateWebhookSecret();
    const body = '{"type":"webhook.test","timestamp":"2026-01-01T00:00:00.000Z","data":{}}';
    const first = await signWebhook({ id: "evt_stable", timestamp: 1_767_225_600, body, secret });
    const second = await signWebhook({ id: "evt_stable", timestamp: 1_767_225_601, body, secret });
    expect(first).not.toBe(second);
  });

  it("enforces the five-minute default replay tolerance", async () => {
    const secret = generateWebhookSecret();
    const body = '{"type":"webhook.test","timestamp":"2026-01-01T00:00:00.000Z","data":{}}';
    const signature = await signWebhook({
      id: "evt_old",
      timestamp: 1_767_225_600,
      body,
      secret,
    });
    await expect(
      verifyWebhookAt({
        body,
        headers: { id: "evt_old", timestamp: "1767225600", signature },
        secret,
        nowMilliseconds: 1_767_225_901_000,
      }),
    ).rejects.toBeInstanceOf(WebhookTimestampError);
  });

  it("exposes malformed envelopes through the public verification error base class", async () => {
    const secret = generateWebhookSecret();
    const body = '{"type":"webhook.test","timestamp":"2026-01-01T00:00:00.000Z"}';
    const signature = await signWebhook({
      id: "evt_malformed",
      timestamp: 1_767_225_600,
      body,
      secret,
    });

    const failure = await verifyWebhookAt({
      body,
      headers: { id: "evt_malformed", timestamp: "1767225600", signature },
      secret,
      nowMilliseconds: 1_767_225_600_000,
    }).catch((error: unknown) => error);

    expect(failure).toBeInstanceOf(WebhookVerificationError);
    expect(failure).toBeInstanceOf(MalformedWebhookPayloadError);
  });
});

describe("readWebhookHeaders", () => {
  const complete = {
    [WEBHOOK_ID_HEADER]: canonical.id,
    [WEBHOOK_TIMESTAMP_HEADER]: canonical.timestamp,
    [WEBHOOK_SIGNATURE_HEADER]: canonical.signature,
  };

  it("returns the three header values verbatim", () => {
    expect(readWebhookHeaders(new Headers(complete))).toEqual({
      id: canonical.id,
      timestamp: canonical.timestamp,
      signature: canonical.signature,
    });
  });

  it("throws a headers error naming each header that is absent or empty", () => {
    for (const header of [WEBHOOK_ID_HEADER, WEBHOOK_TIMESTAMP_HEADER, WEBHOOK_SIGNATURE_HEADER]) {
      const absent = new Headers(complete);
      absent.delete(header);
      const empty = new Headers(complete);
      empty.set(header, "");

      for (const headers of [absent, empty]) {
        expect(() => readWebhookHeaders(headers)).toThrow(InvalidWebhookHeadersError);
        expect(() => readWebhookHeaders(headers)).toThrow(
          expect.objectContaining({ _tag: "InvalidWebhookHeadersError", header }),
        );
      }
    }
  });
});
