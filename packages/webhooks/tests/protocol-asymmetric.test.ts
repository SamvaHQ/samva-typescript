import { describe, expect, it } from "@effect/vitest";

import {
  encodeWebhookSignature,
  InvalidWebhookHeadersError,
  signWebhook,
  verifyWebhookAtWithPublicKeys,
  WebhookCryptoError,
  WebhookSignatureError,
  webhookSignedContent,
  WebhookTimestampError,
} from "../src/protocol.js";

const algorithm = {
  name: "RSASSA-PKCS1-v1_5",
  modulusLength: 2048,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: "SHA-256",
} as const;

const bytesToBase64 = (bytes: Uint8Array): string => {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
};

interface SigningIdentity {
  readonly sign: (content: Uint8Array) => Promise<string>;
  readonly publicKey: string;
}

const generateIdentity = async (): Promise<SigningIdentity> => {
  const pair = await crypto.subtle.generateKey(algorithm, true, ["sign", "verify"]);
  const spki = new Uint8Array(await crypto.subtle.exportKey("spki", pair.publicKey));
  return {
    publicKey: bytesToBase64(spki),
    sign: async (content) =>
      encodeWebhookSignature(
        "v2",
        new Uint8Array(
          await crypto.subtle.sign(algorithm.name, pair.privateKey, new Uint8Array(content)),
        ),
      ),
  };
};

const id = "evt_asymmetric";
const timestamp = "1767225600";
const nowMilliseconds = 1_767_225_600_000;
const body = '{"type":"webhook.test","timestamp":"2026-01-01T00:00:00.000Z","data":{}}';
const content = webhookSignedContent({ id, timestamp, body });

describe("Standard Webhooks v2 (asymmetric)", () => {
  it("verifies a signature produced over the signed content", async () => {
    const identity = await generateIdentity();
    await expect(
      verifyWebhookAtWithPublicKeys({
        body,
        headers: { id, timestamp, signature: await identity.sign(content) },
        publicKeys: [identity.publicKey],
        nowMilliseconds,
      }),
    ).resolves.toMatchObject({ id, event: { type: "webhook.test" } });
  });

  it("accepts a signature from any key in the rotation list", async () => {
    const retiring = await generateIdentity();
    const active = await generateIdentity();
    await expect(
      verifyWebhookAtWithPublicKeys({
        body,
        headers: { id, timestamp, signature: await active.sign(content) },
        publicKeys: [retiring.publicKey, active.publicKey],
        nowMilliseconds,
      }),
    ).resolves.toMatchObject({ id });
  });

  it("skips malformed keys and still verifies against a usable one", async () => {
    const identity = await generateIdentity();
    await expect(
      verifyWebhookAtWithPublicKeys({
        body,
        headers: { id, timestamp, signature: await identity.sign(content) },
        publicKeys: ["not-a-key", identity.publicKey],
        nowMilliseconds,
      }),
    ).resolves.toMatchObject({ id });
  });

  it("rejects a signature made by a key outside the list", async () => {
    const unrelated = await generateIdentity();
    const trusted = await generateIdentity();
    await expect(
      verifyWebhookAtWithPublicKeys({
        body,
        headers: { id, timestamp, signature: await unrelated.sign(content) },
        publicKeys: [trusted.publicKey],
        nowMilliseconds,
      }),
    ).rejects.toBeInstanceOf(WebhookSignatureError);
  });

  it("rejects content signed for a different message", async () => {
    const identity = await generateIdentity();
    const signature = await identity.sign(
      webhookSignedContent({ id: "evt_other", timestamp, body }),
    );
    await expect(
      verifyWebhookAtWithPublicKeys({
        body,
        headers: { id, timestamp, signature },
        publicKeys: [identity.publicKey],
        nowMilliseconds,
      }),
    ).rejects.toBeInstanceOf(WebhookSignatureError);
  });

  it("rejects an empty key list", async () => {
    const identity = await generateIdentity();
    await expect(
      verifyWebhookAtWithPublicKeys({
        body,
        headers: { id, timestamp, signature: await identity.sign(content) },
        publicKeys: [],
        nowMilliseconds,
      }),
    ).rejects.toBeInstanceOf(WebhookSignatureError);
  });

  it("reports a crypto error when no key can be imported", async () => {
    const identity = await generateIdentity();
    await expect(
      verifyWebhookAtWithPublicKeys({
        body,
        headers: { id, timestamp, signature: await identity.sign(content) },
        publicKeys: ["not-a-key", "also-not-a-key"],
        nowMilliseconds,
      }),
    ).rejects.toBeInstanceOf(WebhookCryptoError);
  });

  it("enforces the replay tolerance before touching the keys", async () => {
    const identity = await generateIdentity();
    await expect(
      verifyWebhookAtWithPublicKeys({
        body,
        headers: { id, timestamp, signature: await identity.sign(content) },
        publicKeys: [identity.publicKey],
        nowMilliseconds: nowMilliseconds + 301_000,
      }),
    ).rejects.toBeInstanceOf(WebhookTimestampError);
  });

  it("requires every webhook header", async () => {
    const identity = await generateIdentity();
    await expect(
      verifyWebhookAtWithPublicKeys({
        body,
        headers: { id: "", timestamp, signature: await identity.sign(content) },
        publicKeys: [identity.publicKey],
        nowMilliseconds,
      }),
    ).rejects.toBeInstanceOf(InvalidWebhookHeadersError);
  });

  it("ignores a v1 HMAC signature header", async () => {
    const identity = await generateIdentity();
    const signature = await signWebhook({
      id,
      timestamp,
      body,
      secret: "whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw",
    });
    await expect(
      verifyWebhookAtWithPublicKeys({
        body,
        headers: { id, timestamp, signature },
        publicKeys: [identity.publicKey],
        nowMilliseconds,
      }),
    ).rejects.toBeInstanceOf(WebhookSignatureError);
  });

  it("selects the v2 candidate from a mixed signature header", async () => {
    const identity = await generateIdentity();
    const hmacSignature = await signWebhook({
      id,
      timestamp,
      body,
      secret: "whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw",
    });
    await expect(
      verifyWebhookAtWithPublicKeys({
        body,
        headers: {
          id,
          timestamp,
          signature: `${hmacSignature} ${await identity.sign(content)}`,
        },
        publicKeys: [identity.publicKey],
        nowMilliseconds,
      }),
    ).resolves.toMatchObject({ id });
  });
});
