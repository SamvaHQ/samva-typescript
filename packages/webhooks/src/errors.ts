interface WebhookVerificationFailureOptions {
  readonly detail: string;
}

/** Name of one of the three Standard Webhooks signing headers a delivery carries. */
export type WebhookHeaderName = "webhook-id" | "webhook-timestamp" | "webhook-signature";

/**
 * Base class for every failure this package reports while verifying a webhook delivery.
 *
 * Each subclass carries a literal `_tag` (also used as `name`), so you can branch on the failure
 * with a `switch` or Effect's `catchTag`. `detail` is a human-readable reason for your logs; do not
 * echo it to the sender, and do not match on its wording.
 */
export abstract class WebhookVerificationError<Tag extends string = string> extends Error {
  /** Discriminant naming the concrete failure; equal to the subclass name. */
  readonly _tag: Tag;
  /** Human-readable reason for logs. The wording is not a stable contract. */
  readonly detail: string;

  protected constructor(tag: Tag, options: WebhookVerificationFailureOptions) {
    super(options.detail);
    this.name = tag;
    this._tag = tag;
    this.detail = options.detail;
  }
}

/**
 * The signing secret is unusable: it lacks the `whsec_` prefix, the remainder is not Base64, or
 * the decoded key length is outside the accepted range (`detail` names the range). This is a
 * configuration error on the receiving side, not a bad delivery; copy the endpoint's signing
 * secret from Samva again.
 */
export class InvalidWebhookSecretError extends WebhookVerificationError<"InvalidWebhookSecretError"> {
  constructor(options: WebhookVerificationFailureOptions) {
    super("InvalidWebhookSecretError", options);
  }
}

/**
 * One of the `webhook-id`, `webhook-timestamp`, or `webhook-signature` headers is missing or
 * empty; `header` names it. The request is not a Samva delivery, or something between Samva and
 * your handler stripped the headers.
 */
export class InvalidWebhookHeadersError extends WebhookVerificationError<"InvalidWebhookHeadersError"> {
  /** The first signing header, in id, timestamp, signature order, that is missing or empty. */
  readonly header: WebhookHeaderName;

  constructor(options: WebhookVerificationFailureOptions & { readonly header: WebhookHeaderName }) {
    super("InvalidWebhookHeadersError", options);
    this.header = options.header;
  }
}

/**
 * The `webhook-timestamp` header is not an integer count of Unix seconds, it lies further from the
 * current time than the replay tolerance, or the tolerance you passed is negative or not finite.
 * A delivery outside the tolerance is rejected even when its signature is valid; that bounds how
 * long a captured request can be replayed. Repeated failures on genuine deliveries usually mean
 * the receiving server's clock is wrong.
 */
export class WebhookTimestampError extends WebhookVerificationError<"WebhookTimestampError"> {
  constructor(options: WebhookVerificationFailureOptions) {
    super("WebhookTimestampError", options);
  }
}

/**
 * No signature in the `webhook-signature` header matches the delivery, or no verification key was
 * supplied. Treat the request as forged and reject it. When genuine deliveries fail, the usual
 * causes are the wrong endpoint secret or a body that was parsed and re-serialized before
 * verification instead of passed through as the exact bytes received.
 */
export class WebhookSignatureError extends WebhookVerificationError<"WebhookSignatureError"> {
  constructor(options: WebhookVerificationFailureOptions) {
    super("WebhookSignatureError", options);
  }
}

/**
 * The signature is valid, but the body is not UTF-8 JSON holding exactly the `type`,
 * `timestamp`, and `data` fields of a Samva event envelope.
 */
export class MalformedWebhookPayloadError extends WebhookVerificationError<"MalformedWebhookPayloadError"> {
  constructor(options: WebhookVerificationFailureOptions) {
    super("MalformedWebhookPayloadError", options);
  }
}

/**
 * The runtime's Web Crypto implementation could not import a key or compute a signature, none of
 * the supplied public keys could be imported, or the Effect entrypoint could not read the request
 * body. Points at the runtime or its configuration rather than at the delivery.
 */
export class WebhookCryptoError extends WebhookVerificationError<"WebhookCryptoError"> {
  constructor(options: WebhookVerificationFailureOptions) {
    super("WebhookCryptoError", options);
  }
}

/** Every concrete failure a verification call can report, discriminated by `_tag`. */
export type AnyWebhookVerificationError =
  | InvalidWebhookSecretError
  | InvalidWebhookHeadersError
  | WebhookTimestampError
  | WebhookSignatureError
  | MalformedWebhookPayloadError
  | WebhookCryptoError;
