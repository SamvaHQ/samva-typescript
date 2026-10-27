import { Clock, Effect } from "effect";

import type { VerifyOptions } from "./promise.js";
import {
  verifyWebhookAt,
  WEBHOOK_ID_HEADER,
  WEBHOOK_SIGNATURE_HEADER,
  WEBHOOK_TIMESTAMP_HEADER,
  WebhookCryptoError,
  WebhookVerificationError,
  type AnyWebhookVerificationError,
  type VerifiedWebhook,
  type VerifyWebhookInput,
} from "./protocol.js";

/**
 * Fails with the verification errors `verifyWebhookAt` rejects with. Any other rejection, such as
 * a `TypeError` from input that violates the declared types, is a defect rather than a failed
 * delivery.
 */
const verifyAt = (
  input: VerifyWebhookInput,
): Effect.Effect<VerifiedWebhook, AnyWebhookVerificationError> =>
  Effect.flatten(
    Effect.promise(() =>
      verifyWebhookAt(input).then(
        (verified) => Effect.succeed(verified),
        (error: unknown) =>
          error instanceof WebhookVerificationError
            ? Effect.fail(error as AnyWebhookVerificationError)
            : // oxlint-disable-next-line eslint/no-restricted-properties -- The error channel is the verification failures the docs promise; a caller's type violation is a defect, not a failed delivery.
              Effect.die(error),
      ),
    ),
  );

/**
 * Effect version of the Promise entrypoint's `verify`: verifies a delivery from its body and
 * header values and succeeds with its ID and parsed event.
 *
 * Reads the current time from Effect's `Clock`, so `TestClock` controls the replay window in
 * tests. Fails with {@link AnyWebhookVerificationError}; branch with `Effect.catchTag`. Input
 * that violates the declared types, such as an undefined secret, dies instead.
 */
export const verify = Effect.fn("Webhooks.verify")(function* (options: VerifyOptions) {
  const nowMilliseconds = yield* Clock.currentTimeMillis;
  return yield* verifyAt({
    body: options.body,
    headers: {
      id: options.id,
      timestamp: options.timestamp,
      signature: options.signature,
    },
    secret: options.secret,
    toleranceSeconds: options.toleranceSeconds,
    nowMilliseconds,
  });
});

/**
 * Effect version of the Promise entrypoint's `verifyRequest`: verifies a delivery received as a
 * Fetch API `Request` and succeeds with its ID and parsed event. Reads the body from a clone, so
 * the original request stays readable.
 *
 * Reads the current time from Effect's `Clock`. Fails with {@link AnyWebhookVerificationError};
 * a body that cannot be read fails with {@link WebhookCryptoError}. Input that violates the
 * declared types dies instead.
 *
 * @example
 * ```ts
 * import { Effect } from "effect";
 * import * as Webhooks from "@samva/webhooks/effect";
 *
 * const receive = (request: Request, secret: string) =>
 *   Webhooks.verifyRequest(request, secret).pipe(
 *     Effect.flatMap(({ id, event }) => Effect.promise(() => handleOnce(id, event))),
 *     Effect.as(new Response(null, { status: 204 })),
 *     Effect.catchTags({
 *       WebhookSignatureError: () => Effect.succeed(new Response(null, { status: 400 })),
 *       WebhookTimestampError: () => Effect.succeed(new Response(null, { status: 400 })),
 *     }),
 *   );
 * ```
 */
export const verifyRequest = Effect.fn("Webhooks.verifyRequest")(function* (
  request: Request,
  secret: string,
  options?: { readonly toleranceSeconds?: number | undefined },
) {
  const nowMilliseconds = yield* Clock.currentTimeMillis;
  const body = yield* Effect.tryPromise({
    try: async () => new Uint8Array(await request.clone().arrayBuffer()),
    catch: () =>
      new WebhookCryptoError({
        detail: "Unable to read webhook request body",
      }),
  });
  return yield* verifyAt({
    body,
    headers: {
      id: request.headers.get(WEBHOOK_ID_HEADER),
      timestamp: request.headers.get(WEBHOOK_TIMESTAMP_HEADER),
      signature: request.headers.get(WEBHOOK_SIGNATURE_HEADER),
    },
    secret,
    toleranceSeconds: options?.toleranceSeconds,
    nowMilliseconds,
  });
});

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
export * from "./schemas.gen.js";
