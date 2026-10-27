import { validateEvent } from "./decoder.gen.js";
import type { WebhookEvent } from "./types.gen.js";
export { isKnownEvent } from "./decoder.gen.js";

export type { SamvaWebhookEvent, WebhookEvent, UnknownWebhookEvent } from "./types.gen.js";

import {
  InvalidWebhookHeadersError,
  InvalidWebhookSecretError,
  MalformedWebhookPayloadError,
  WebhookCryptoError,
  WebhookSignatureError,
  WebhookTimestampError,
  type WebhookHeaderName,
} from "./errors.js";

/* oxlint-disable samva/no-try-catch-or-throw -- Promise/WebCrypto protocol kernel is the foreign JavaScript boundary; the Effect projection converts these typed thrown values back into its error channel */

/**
 * Header carrying the delivery's unique message ID. Retries of the same delivery reuse it, so it
 * is the key for deduplicating deliveries you have already handled.
 */
export const WEBHOOK_ID_HEADER = "webhook-id";
/** Header carrying the time Samva signed the delivery, as integer Unix seconds. */
export const WEBHOOK_TIMESTAMP_HEADER = "webhook-timestamp";
/**
 * Header carrying one or more space-separated `<version>,<base64 signature>` entries. More than one
 * entry appears while a signing secret is being rotated; a delivery verifies when any entry of the
 * expected version matches.
 */
export const WEBHOOK_SIGNATURE_HEADER = "webhook-signature";
/**
 * Replay tolerance, in seconds, used when a caller passes no `toleranceSeconds`. A delivery whose
 * `webhook-timestamp` differs from the current time by more than this, in either direction, is
 * rejected with {@link WebhookTimestampError}.
 */
export const DEFAULT_TOLERANCE_SECONDS = 300;

const SECRET_PREFIX = "whsec_";
const ASYMMETRIC_ALGORITHM = { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" } as const;
const MINIMUM_SECRET_BYTES = 24;
const MAXIMUM_SECRET_BYTES = 64;
const GENERATED_SECRET_BYTES = 32;
const encoder = new TextEncoder();

/** A delivery whose signature, timestamp, and envelope all checked out. */
export interface VerifiedWebhook {
  /**
   * The delivery's `webhook-id` header. Stable across retries of the same delivery; record it to
   * handle each delivery once, because a valid delivery may arrive more than once within the
   * replay tolerance.
   */
  readonly id: string;
  readonly event: WebhookEvent;
}

/** The three signing headers of a delivery, each present and non-empty, read verbatim. */
export interface WebhookHeaders {
  /** Value of {@link WEBHOOK_ID_HEADER}. */
  readonly id: string;
  /** Value of {@link WEBHOOK_TIMESTAMP_HEADER}. */
  readonly timestamp: string;
  /** Value of {@link WEBHOOK_SIGNATURE_HEADER}. */
  readonly signature: string;
}

/**
 * The three signing header values as your framework reports them. An absent header is `null` (as
 * Fetch API `Headers.get` returns it) or `undefined` (as Node.js and Express return it); pass it
 * through as-is and verification rejects it with {@link InvalidWebhookHeadersError}.
 */
export interface WebhookHeaderValues {
  /** Value of {@link WEBHOOK_ID_HEADER}. */
  readonly id: string | null | undefined;
  /** Value of {@link WEBHOOK_TIMESTAMP_HEADER}. */
  readonly timestamp: string | null | undefined;
  /** Value of {@link WEBHOOK_SIGNATURE_HEADER}. */
  readonly signature: string | null | undefined;
}

/** Input to {@link verifyWebhookAt}, which takes the current time explicitly. */
export interface VerifyWebhookInput {
  /**
   * The request body exactly as received. Pass the raw text or bytes; a body that was parsed and
   * re-serialized no longer matches its signature.
   */
  readonly body: string | Uint8Array;
  readonly headers: WebhookHeaderValues;
  /** The endpoint's signing secret, including its `whsec_` prefix. Keep it on the server. */
  readonly secret: string;
  /** Replay tolerance in seconds; defaults to {@link DEFAULT_TOLERANCE_SECONDS}. */
  readonly toleranceSeconds?: number | undefined;
  /** The current time in Unix milliseconds, as `Date.now()` returns it. */
  readonly nowMilliseconds: number;
}

/**
 * Signature scheme version inside a `webhook-signature` entry: `v1` is HMAC-SHA256 with the
 * endpoint's shared secret; `v2` is RSASSA-PKCS1-v1_5 with SHA-256, checked against a public key.
 */
export type WebhookSignatureVersion = "v1" | "v2";

const toBytes = (body: string | Uint8Array): Uint8Array =>
  typeof body === "string" ? encoder.encode(body) : body;

const toCryptoBytes = (bytes: Uint8Array): Uint8Array<ArrayBuffer> => new Uint8Array(bytes);

const bytesToBase64 = (bytes: Uint8Array): string => {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
};

const base64ToBytes = (encoded: string): Uint8Array => {
  const binary = atob(encoded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
};

const decodeSecret = (secret: string): Uint8Array => {
  if (!secret.startsWith(SECRET_PREFIX)) {
    throw new InvalidWebhookSecretError({ detail: "Webhook secret must start with whsec_" });
  }

  const decoded = (() => {
    try {
      return base64ToBytes(secret.slice(SECRET_PREFIX.length));
    } catch {
      throw new InvalidWebhookSecretError({ detail: "Webhook secret is not valid Base64" });
    }
  })();

  if (decoded.byteLength < MINIMUM_SECRET_BYTES || decoded.byteLength > MAXIMUM_SECRET_BYTES) {
    throw new InvalidWebhookSecretError({
      detail: `Webhook secret must decode to ${MINIMUM_SECRET_BYTES}-${MAXIMUM_SECRET_BYTES} bytes`,
    });
  }
  return decoded;
};

const importHmacKey = async (secret: string): Promise<CryptoKey> => {
  const secretBytes = decodeSecret(secret);
  try {
    return await crypto.subtle.importKey(
      "raw",
      toCryptoBytes(secretBytes),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
  } catch (cause) {
    throw new WebhookCryptoError({
      detail: `Unable to import webhook signing key: ${cause instanceof Error ? cause.message : String(cause)}`,
    });
  }
};

const importVerificationKey = async (publicKey: string): Promise<CryptoKey | undefined> => {
  try {
    return await crypto.subtle.importKey(
      "spki",
      toCryptoBytes(base64ToBytes(publicKey.trim())),
      ASYMMETRIC_ALGORITHM,
      false,
      ["verify"],
    );
  } catch {
    return undefined;
  }
};

const signedBytes = (id: string, timestamp: string, body: Uint8Array): Uint8Array => {
  const prefix = encoder.encode(`${id}.${timestamp}.`);
  const material = new Uint8Array(prefix.byteLength + body.byteLength);
  material.set(prefix);
  material.set(body, prefix.byteLength);
  return material;
};

const hmac = async (
  secret: string,
  id: string,
  timestamp: string,
  body: Uint8Array,
): Promise<Uint8Array> => {
  const key = await importHmacKey(secret);
  try {
    return new Uint8Array(
      await crypto.subtle.sign("HMAC", key, toCryptoBytes(signedBytes(id, timestamp, body))),
    );
  } catch (cause) {
    throw new WebhookCryptoError({
      detail: `Unable to sign webhook: ${cause instanceof Error ? cause.message : String(cause)}`,
    });
  }
};

const asymmetricMatch = async (
  key: CryptoKey,
  candidate: Uint8Array,
  content: Uint8Array<ArrayBuffer>,
): Promise<boolean> => {
  try {
    return await crypto.subtle.verify(ASYMMETRIC_ALGORITHM, key, toCryptoBytes(candidate), content);
  } catch {
    return false;
  }
};

const timingSafeEqual = (left: Uint8Array, right: Uint8Array): boolean => {
  if (left.byteLength !== right.byteLength) return false;
  let difference = 0;
  for (let index = 0; index < left.byteLength; index += 1) {
    difference |= (left[index] ?? 0) ^ (right[index] ?? 0);
  }
  return difference === 0;
};

const signatureCandidates = (
  header: string,
  expected: WebhookSignatureVersion,
): ReadonlyArray<Uint8Array> =>
  header
    .split(" ")
    .map((candidate) => candidate.split(",", 2))
    .flatMap(([version, encoded]) => {
      if (version !== expected || encoded === undefined) return [];
      try {
        return [base64ToBytes(encoded)];
      } catch {
        return [];
      }
    });

const parseEvent = (body: Uint8Array): WebhookEvent => {
  try {
    const parsed: unknown = JSON.parse(
      new TextDecoder("utf-8", { fatal: true, ignoreBOM: false }).decode(body),
    );
    if (!validateEvent(parsed)) {
      throw new MalformedWebhookPayloadError({
        detail: "Webhook event does not match its payload schema",
      });
    }
    return parsed;
  } catch {
    throw new MalformedWebhookPayloadError({
      detail: "Webhook body must be valid UTF-8 JSON matching a Samva event payload schema",
    });
  }
};

/**
 * Creates a random `whsec_`-prefixed signing secret from the runtime's secure random source.
 * Samva issues each endpoint's secret for you; use this to sign test deliveries with
 * {@link signWebhook}.
 */
export const generateWebhookSecret = (): string => {
  const bytes = crypto.getRandomValues(new Uint8Array(GENERATED_SECRET_BYTES));
  return `${SECRET_PREFIX}${bytesToBase64(bytes)}`;
};

/**
 * Builds the bytes every signature version covers: `<id>.<timestamp>.<body>`. Use it to verify a
 * signature with your own crypto code; {@link verifyWebhookAt} and
 * {@link verifyWebhookAtWithPublicKeys} build it for you.
 */
export const webhookSignedContent = (input: {
  readonly id: string;
  readonly timestamp: string;
  readonly body: string | Uint8Array;
}): Uint8Array => signedBytes(input.id, input.timestamp, toBytes(input.body));

/** Formats raw signature bytes as one `<version>,<base64>` entry of the `webhook-signature` header. */
export const encodeWebhookSignature = (
  version: WebhookSignatureVersion,
  signature: Uint8Array,
): string => `${version},${bytesToBase64(signature)}`;

/**
 * Computes the `v1` HMAC-SHA256 signature Samva sends, formatted as one `webhook-signature`
 * entry. Use it to produce signed test deliveries for your handler.
 *
 * `timestamp` is Unix seconds; a number is stringified, and the verifier requires an integer.
 * Rejects with {@link InvalidWebhookSecretError} for an unusable secret and
 * {@link WebhookCryptoError} when Web Crypto fails.
 */
export const signWebhook = async (input: {
  readonly body: string | Uint8Array;
  readonly id: string;
  readonly timestamp: string | number;
  readonly secret: string;
}): Promise<string> => {
  const timestamp = String(input.timestamp);
  const signature = await hmac(input.secret, input.id, timestamp, toBytes(input.body));
  return encodeWebhookSignature("v1", signature);
};

const requireHeader = (header: WebhookHeaderName, value: string | null | undefined): string => {
  if (value === null || value === undefined) {
    throw new InvalidWebhookHeadersError({ header, detail: `${header} header is missing` });
  }
  if (value.length === 0) {
    throw new InvalidWebhookHeadersError({ header, detail: `${header} header is empty` });
  }
  return value;
};

const requireHeaders = (values: WebhookHeaderValues): WebhookHeaders => ({
  id: requireHeader(WEBHOOK_ID_HEADER, values.id),
  timestamp: requireHeader(WEBHOOK_TIMESTAMP_HEADER, values.timestamp),
  signature: requireHeader(WEBHOOK_SIGNATURE_HEADER, values.signature),
});

const freshHeaders = (input: {
  readonly headers: WebhookHeaderValues;
  readonly toleranceSeconds?: number | undefined;
  readonly nowMilliseconds: number;
}): WebhookHeaders => {
  const { id, timestamp, signature } = requireHeaders(input.headers);

  const timestampSeconds = Number(timestamp);
  if (!Number.isInteger(timestampSeconds)) {
    throw new WebhookTimestampError({ detail: "webhook-timestamp must be Unix seconds" });
  }
  const toleranceSeconds = input.toleranceSeconds ?? DEFAULT_TOLERANCE_SECONDS;
  if (!Number.isFinite(toleranceSeconds) || toleranceSeconds < 0) {
    throw new WebhookTimestampError({ detail: "Webhook tolerance must be non-negative" });
  }
  if (Math.abs(input.nowMilliseconds / 1000 - timestampSeconds) > toleranceSeconds) {
    throw new WebhookTimestampError({
      detail: "Webhook timestamp is outside the replay tolerance",
    });
  }

  return { id, timestamp, signature };
};

/**
 * Verifies a `v1` (HMAC-SHA256) delivery against an explicit current time. The `verify` and
 * `verifyRequest` entry points call this with the current clock; call it directly when your
 * framework owns the clock or a test needs a fixed time.
 *
 * Checks, in order: all three headers are present and non-empty; the timestamp is integer Unix seconds within
 * `toleranceSeconds` of `nowMilliseconds`; some `v1` entry in the signature header matches, using
 * a constant-time comparison; the body has a valid envelope and known event payloads match their schema. Unknown event types pass
 * through with untyped data. The replay window rejects stale
 * deliveries but does not detect a repeat inside it; deduplicate on the returned `id`.
 *
 * Rejects with {@link InvalidWebhookHeadersError}, {@link WebhookTimestampError},
 * {@link InvalidWebhookSecretError}, {@link WebhookSignatureError},
 * {@link MalformedWebhookPayloadError}, or {@link WebhookCryptoError}.
 */
export const verifyWebhookAt = async (input: VerifyWebhookInput): Promise<VerifiedWebhook> => {
  const { id, timestamp, signature } = freshHeaders(input);

  const body = toBytes(input.body);
  const expected = await hmac(input.secret, id, timestamp, body);
  const verified = signatureCandidates(signature, "v1").some((candidate) =>
    timingSafeEqual(expected, candidate),
  );
  if (!verified) {
    throw new WebhookSignatureError({ detail: "Webhook signature verification failed" });
  }

  return { id, event: parseEvent(body) };
};

/**
 * Verifies a `v2` (RSASSA-PKCS1-v1_5, SHA-256) delivery against one or more public keys, each a
 * Base64-encoded SPKI DER key. Pass several keys during a key rotation; the delivery verifies when
 * any `v2` signature entry matches any key.
 *
 * Header, timestamp, and envelope checks match {@link verifyWebhookAt}. Keys that fail to import
 * are skipped. Rejects with {@link WebhookSignatureError} when `publicKeys` is empty or nothing
 * matches, and {@link WebhookCryptoError} when none of the keys imports.
 */
export const verifyWebhookAtWithPublicKeys = async (
  input: Omit<VerifyWebhookInput, "secret"> & {
    readonly publicKeys: ReadonlyArray<string>;
  },
): Promise<VerifiedWebhook> => {
  const { id, timestamp, signature } = freshHeaders(input);
  if (input.publicKeys.length === 0) {
    throw new WebhookSignatureError({ detail: "No webhook verification key is available" });
  }

  const keys = (await Promise.all(input.publicKeys.map(importVerificationKey))).filter(
    (key) => key !== undefined,
  );
  if (keys.length === 0) {
    throw new WebhookCryptoError({
      detail: "Unable to import any webhook verification key: keys must be Base64 SPKI DER",
    });
  }

  const body = toBytes(input.body);
  const content = toCryptoBytes(signedBytes(id, timestamp, body));
  const candidates = signatureCandidates(signature, "v2");
  const matches = await Promise.all(
    keys.flatMap((key) => candidates.map((candidate) => asymmetricMatch(key, candidate, content))),
  );
  if (!matches.includes(true)) {
    throw new WebhookSignatureError({ detail: "Webhook signature verification failed" });
  }

  return { id, event: parseEvent(body) };
};

/**
 * Reads the three signing headers from a Fetch API `Headers` object, for code that needs a header
 * value, such as the timestamp, before or beside verification. Throws
 * {@link InvalidWebhookHeadersError}, naming the header, when one is missing or empty; call it
 * inside the same error handling as the verification that follows.
 */
export const readWebhookHeaders = (headers: Headers): WebhookHeaders =>
  requireHeaders({
    id: headers.get(WEBHOOK_ID_HEADER),
    timestamp: headers.get(WEBHOOK_TIMESTAMP_HEADER),
    signature: headers.get(WEBHOOK_SIGNATURE_HEADER),
  });

export {
  InvalidWebhookHeadersError,
  InvalidWebhookSecretError,
  MalformedWebhookPayloadError,
  WebhookCryptoError,
  WebhookSignatureError,
  WebhookTimestampError,
  WebhookVerificationError,
} from "./errors.js";
export type { AnyWebhookVerificationError, WebhookHeaderName } from "./errors.js";
