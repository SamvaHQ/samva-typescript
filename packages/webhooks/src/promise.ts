import {
  readWebhookHeaders,
  verifyWebhookAt,
  WebhookVerificationError,
  type AnyWebhookVerificationError,
  type VerifiedWebhook,
} from "./protocol.js";

/* oxlint-disable samva/no-try-catch-or-throw -- safeVerify is the explicit Promise consumer adapter that converts thrown verification failures into a result and rethrows everything else */

/** A delivery's parts, for frameworks that do not expose a Fetch API `Request`. */
export interface VerifyOptions {
  /**
   * The request body exactly as received, as text or bytes. Read it before any JSON body parser
   * runs: parsing and re-serializing changes the bytes and fails the signature check.
   */
  readonly body: string | Uint8Array;
  /**
   * Value of the `webhook-id` header (`WEBHOOK_ID_HEADER`). Pass an absent header through as
   * `null` or `undefined`; verification rejects it with `InvalidWebhookHeadersError`.
   */
  readonly id: string | null | undefined;
  /** Value of the `webhook-timestamp` header (`WEBHOOK_TIMESTAMP_HEADER`), or absent. */
  readonly timestamp: string | null | undefined;
  /** Value of the `webhook-signature` header (`WEBHOOK_SIGNATURE_HEADER`), unmodified, or absent. */
  readonly signature: string | null | undefined;
  /** The endpoint's signing secret, including its `whsec_` prefix. Keep it on the server. */
  readonly secret: string;
  /** Replay tolerance in seconds; defaults to `DEFAULT_TOLERANCE_SECONDS`. */
  readonly toleranceSeconds?: number | undefined;
}

/**
 * Verifies a Samva webhook delivery from its body and header values, then returns its ID and
 * parsed event.
 *
 * Verification follows Standard Webhooks: the `webhook-timestamp` must be within the replay
 * tolerance of the current time, and an HMAC-SHA256 signature over `<id>.<timestamp>.<body>` with
 * the endpoint secret must match one entry in `webhook-signature`. Only then is the body parsed.
 * A valid delivery can arrive more than once, so handle each returned `id` once.
 *
 * Rejects with a subclass of `WebhookVerificationError`; {@link AnyWebhookVerificationError}
 * lists them. A missing or empty header rejects with `InvalidWebhookHeadersError`, whose `header`
 * names it. Use {@link safeVerify} for a result instead of a rejection.
 *
 * @example
 * ```ts
 * import { verify } from "@samva/webhooks";
 *
 * // Express: mount express.raw({ type: "application/json" }) on this route so body is a Buffer.
 * app.post("/webhooks/samva", async (req, res) => {
 *   const verified = await verify({
 *     body: req.body,
 *     id: req.header("webhook-id"),
 *     timestamp: req.header("webhook-timestamp"),
 *     signature: req.header("webhook-signature"),
 *     secret: process.env.SAMVA_WEBHOOK_SECRET!,
 *   });
 *   await handleOnce(verified.id, verified.event);
 *   res.sendStatus(204);
 * });
 * ```
 */
export const verify = (options: VerifyOptions): Promise<VerifiedWebhook> =>
  verifyWebhookAt({
    body: options.body,
    headers: {
      id: options.id,
      timestamp: options.timestamp,
      signature: options.signature,
    },
    secret: options.secret,
    toleranceSeconds: options.toleranceSeconds,
    nowMilliseconds: Date.now(),
  });

/**
 * Verifies a Samva webhook delivery received as a Fetch API `Request` (Cloudflare Workers, Bun,
 * Deno, Next.js route handlers, Hono, and similar), then returns its ID and parsed event.
 *
 * Reads the body from a clone, so the original request stays readable. Performs the same checks
 * as {@link verify} and rejects with the same errors; a missing signing header rejects with
 * `InvalidWebhookHeadersError`, whose `header` names it.
 *
 * @example
 * ```ts
 * import { verifyRequest, WebhookVerificationError } from "@samva/webhooks";
 *
 * export default {
 *   async fetch(request: Request, env: { SAMVA_WEBHOOK_SECRET: string }) {
 *     try {
 *       const { id, event } = await verifyRequest(request, env.SAMVA_WEBHOOK_SECRET);
 *       await handleOnce(id, event);
 *       return new Response(null, { status: 204 });
 *     } catch (error) {
 *       if (error instanceof WebhookVerificationError) {
 *         return new Response(null, { status: 400 });
 *       }
 *       throw error;
 *     }
 *   },
 * };
 * ```
 */
export const verifyRequest = async (
  request: Request,
  secret: string,
  options?: { readonly toleranceSeconds?: number | undefined },
): Promise<VerifiedWebhook> =>
  verifyWebhookAt({
    body: new Uint8Array(await request.clone().arrayBuffer()),
    headers: readWebhookHeaders(request.headers),
    secret,
    toleranceSeconds: options?.toleranceSeconds,
    nowMilliseconds: Date.now(),
  });

/**
 * Runs {@link verify} and resolves to a result instead of rejecting: `{ verified: true, value }`
 * on success, or `{ verified: false, error }` carrying the verification failure. Any other error,
 * such as a `TypeError` from input that violates the declared types, rejects.
 *
 * @example
 * ```ts
 * import { safeVerify, type VerifyOptions } from "@samva/webhooks";
 *
 * async function receive(delivery: VerifyOptions): Promise<Response> {
 *   const result = await safeVerify(delivery);
 *   if (!result.verified) {
 *     console.warn("rejected webhook", result.error._tag);
 *     return new Response(null, { status: 400 });
 *   }
 *   await handleOnce(result.value.id, result.value.event);
 *   return new Response(null, { status: 204 });
 * }
 * ```
 */
export const safeVerify = async (
  options: VerifyOptions,
): Promise<
  | { readonly verified: true; readonly value: VerifiedWebhook }
  | { readonly verified: false; readonly error: AnyWebhookVerificationError }
> => {
  try {
    return { verified: true, value: await verify(options) };
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      return { verified: false, error: error as AnyWebhookVerificationError };
    }
    throw error;
  }
};

export {
  DEFAULT_TOLERANCE_SECONDS,
  WEBHOOK_ID_HEADER,
  WEBHOOK_SIGNATURE_HEADER,
  WEBHOOK_TIMESTAMP_HEADER,
  isKnownEvent,
  generateWebhookSecret,
  signWebhook,
} from "./protocol.js";
export type {
  AnyWebhookVerificationError,
  SamvaWebhookEvent,
  VerifiedWebhook,
  WebhookHeaderName,
} from "./protocol.js";
export {
  InvalidWebhookHeadersError,
  InvalidWebhookSecretError,
  MalformedWebhookPayloadError,
  WebhookCryptoError,
  WebhookSignatureError,
  WebhookTimestampError,
  WebhookVerificationError,
} from "./protocol.js";

export type * from "./types.gen.js";
export { WebhookEventJsonSchemas } from "./json-schemas.gen.js";
