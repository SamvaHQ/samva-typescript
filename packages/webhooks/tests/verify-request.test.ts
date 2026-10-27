import { describe, expect, it } from "@effect/vitest";

import {
  DEFAULT_TOLERANCE_SECONDS,
  generateWebhookSecret,
  InvalidWebhookHeadersError,
  InvalidWebhookSecretError,
  MalformedWebhookPayloadError,
  signWebhook,
  verifyRequest,
  WEBHOOK_ID_HEADER,
  WEBHOOK_SIGNATURE_HEADER,
  WEBHOOK_TIMESTAMP_HEADER,
  WebhookSignatureError,
  WebhookTimestampError,
} from "../src/promise.js";

/**
 * `verifyRequest` is the published entrypoint a customer's HTTP handler calls on an
 * inbound Samva delivery. The defects it guards are the ones that let a forged or
 * replayed request reach application code: a body edited after signing, absent
 * Standard Webhooks headers, a signature produced by some other secret, and a
 * timestamp far enough outside the replay window that the delivery is a recording.
 * It also must not consume the caller's request — a handler that can no longer read
 * its own body after verifying has lost the payload.
 *
 * Every timestamp here is derived from the test's own wall clock, because
 * `verifyRequest` compares against `Date.now()`; a fixed date would drift out of the
 * tolerance window and turn these into time bombs.
 */

const envelope = JSON.stringify({
  type: "message.delivered",
  timestamp: "2026-01-01T00:00:00.000Z",
  data: {
    messageId: "msg_01JQ0S9N4B7CE5A6Z4W6E3TQ8H",
    organizationId: "org_example",
    channel: "email",
  },
});

interface Delivery {
  readonly request: Request;
  readonly secret: string;
  readonly id: string;
  readonly body: string;
}

const signedDelivery = async (options?: {
  readonly body?: string;
  readonly secret?: string;
  readonly ageSeconds?: number;
}): Promise<Delivery> => {
  const secret = options?.secret ?? generateWebhookSecret();
  const body = options?.body ?? envelope;
  const id = "evt_01JQ0S9N4B7CE5A6Z4W6E3TQ8H";
  const timestamp = String(Math.floor(Date.now() / 1000) - (options?.ageSeconds ?? 0));
  const signature = await signWebhook({ body, id, timestamp, secret });

  return {
    secret,
    id,
    body,
    request: new Request("https://customer.example/webhooks/samva", {
      method: "POST",
      body,
      headers: {
        "content-type": "application/json",
        [WEBHOOK_ID_HEADER]: id,
        [WEBHOOK_TIMESTAMP_HEADER]: timestamp,
        [WEBHOOK_SIGNATURE_HEADER]: signature,
      },
    }),
  };
};

describe("verifyRequest", () => {
  it("hands the caller the delivery id and parsed event of a correctly signed request", async () => {
    const delivery = await signedDelivery();

    await expect(verifyRequest(delivery.request, delivery.secret)).resolves.toEqual({
      id: delivery.id,
      event: {
        type: "message.delivered",
        timestamp: "2026-01-01T00:00:00.000Z",
        data: {
          messageId: "msg_01JQ0S9N4B7CE5A6Z4W6E3TQ8H",
          organizationId: "org_example",
          channel: "email",
        },
      },
    });
  });

  it("rejects a body edited after it was signed", async () => {
    const delivery = await signedDelivery();
    const tampered = new Request(delivery.request.url, {
      method: "POST",
      body: envelope.replace("message.delivered", "message.bounced"),
      headers: delivery.request.headers,
    });

    await expect(verifyRequest(tampered, delivery.secret)).rejects.toBeInstanceOf(
      WebhookSignatureError,
    );
  });

  it("rejects a request missing any Standard Webhooks header, naming that header", async () => {
    for (const absent of [WEBHOOK_ID_HEADER, WEBHOOK_TIMESTAMP_HEADER, WEBHOOK_SIGNATURE_HEADER]) {
      const delivery = await signedDelivery();
      const headers = new Headers(delivery.request.headers);
      headers.delete(absent);

      const rejection = verifyRequest(
        new Request(delivery.request.url, { method: "POST", body: delivery.body, headers }),
        delivery.secret,
      );
      await expect(rejection).rejects.toBeInstanceOf(InvalidWebhookHeadersError);
      await expect(rejection).rejects.toMatchObject({ header: absent });
    }
  });

  it("rejects a request whose signature was produced by a different secret", async () => {
    const delivery = await signedDelivery();

    await expect(verifyRequest(delivery.request, generateWebhookSecret())).rejects.toBeInstanceOf(
      WebhookSignatureError,
    );
  });

  it("rejects a malformed secret as a configuration fault, not a signature failure", async () => {
    const delivery = await signedDelivery();
    const truncated = `whsec_${btoa("12345678")}`;

    for (const secret of ["not-a-samva-secret", truncated]) {
      await expect(verifyRequest(delivery.request, secret)).rejects.toBeInstanceOf(
        InvalidWebhookSecretError,
      );
    }
  });

  it("keeps the default replay window inside a quarter hour", () => {
    expect(DEFAULT_TOLERANCE_SECONDS).toBeGreaterThan(0);
    expect(DEFAULT_TOLERANCE_SECONDS).toBeLessThanOrEqual(15 * 60);
  });

  it("rejects a correctly signed replay captured an hour ago", async () => {
    const delivery = await signedDelivery({ ageSeconds: 60 * 60 });

    await expect(verifyRequest(delivery.request, delivery.secret)).rejects.toBeInstanceOf(
      WebhookTimestampError,
    );
  });

  it("narrows the accepted replay window to a tighter tolerance override", async () => {
    const delivery = await signedDelivery({ ageSeconds: 60 });

    await expect(verifyRequest(delivery.request, delivery.secret)).resolves.toMatchObject({
      id: delivery.id,
    });
    await expect(
      verifyRequest(delivery.request, delivery.secret, { toleranceSeconds: 5 }),
    ).rejects.toBeInstanceOf(WebhookTimestampError);
  });

  it("rejects a signed body that is not a Samva event envelope", async () => {
    const delivery = await signedDelivery({ body: JSON.stringify({ messageId: "msg_bare" }) });

    await expect(verifyRequest(delivery.request, delivery.secret)).rejects.toBeInstanceOf(
      MalformedWebhookPayloadError,
    );
  });

  it("leaves the caller's own request body readable after verification", async () => {
    const delivery = await signedDelivery();

    await verifyRequest(delivery.request, delivery.secret);

    expect(delivery.request.bodyUsed).toBe(false);
    await expect(delivery.request.text()).resolves.toBe(delivery.body);
  });
});
