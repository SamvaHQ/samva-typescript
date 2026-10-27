import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";

import {
  BillingProviderError,
  catchAuthError,
  catchCategory,
  catchThrottlingError,
  categoriesOf,
  ConflictError,
  EmailChannelError,
  ExternalServiceError,
  ForbiddenError,
  InternalError,
  isRetryable,
  isTransient,
  PaymentRequiredError,
  RateLimitedError,
  UnauthorizedError,
  ValidationError,
  DeliveryUnavailableError,
} from "../src/effect";

// Raw request-side failures, as they appear in the error channel: an
// `HttpClientError` wrapping a request-side reason (no HTTP response). Only
// TransportError (network) is transient; EncodeError / InvalidUrlError are
// deterministic programmer errors that would fail identically on every retry.
const transportError = {
  _tag: "HttpClientError",
  reason: { _tag: "TransportError" },
};
const encodeError = {
  _tag: "HttpClientError",
  reason: { _tag: "EncodeError" },
};
const invalidUrlError = {
  _tag: "HttpClientError",
  reason: { _tag: "InvalidUrlError" },
};

describe("error categories", () => {
  it("assigns categories per tag, and EmailChannelError by reason", () => {
    expect(categoriesOf(new UnauthorizedError({ message: "x" }))).toEqual(["auth"]);
    expect(categoriesOf(new ForbiddenError({ message: "x" }))).toEqual(["auth"]);
    expect(categoriesOf(new ValidationError({ message: "x" }))).toEqual(["validation"]);
    expect(categoriesOf(new ConflictError({ message: "x", resource: "r" }))).toEqual(["conflict"]);
    expect(
      categoriesOf(
        new RateLimitedError({
          message: "Send rate limit reached. Retry after the requested delay.",
          retryAfterSeconds: 5,
        }),
      ),
    ).toEqual(["throttling", "transient"]);
    expect(
      categoriesOf(
        new PaymentRequiredError({
          message: "Plan limit reached; raise it in billing.",
          resource: "r",
          currentUsage: 1,
          limit: 1,
        }),
      ),
    ).toEqual(["billing"]);

    const authChannel = new EmailChannelError({
      reason: "auth",
      message: "x",
    });
    const transportChannel = new EmailChannelError({
      reason: "transport",
      message: "x",
    });
    expect(categoriesOf(authChannel)).toEqual(["auth"]);
    expect(categoriesOf(transportChannel)).toEqual(["transient"]);
  });

  it("isRetryable: true for throttled/transient/transport, false otherwise", () => {
    expect(
      isRetryable(
        new RateLimitedError({
          message: "Send rate limit reached. Retry after the requested delay.",
          retryAfterSeconds: 5,
        }),
      ),
    ).toBe(true);
    expect(isRetryable(new InternalError({ message: "x" }))).toBe(true);
    expect(
      isRetryable(
        new ExternalServiceError({
          message: "x",
        }),
      ),
    ).toBe(true);
    expect(isRetryable(transportError)).toBe(true);
    expect(isRetryable(new ValidationError({ message: "x" }))).toBe(false);
    expect(isRetryable(new ConflictError({ message: "x", resource: "r" }))).toBe(false);
    // Deterministic request-construction failures must never be retried —
    // an Effect.retry({ while: isRetryable }) would otherwise loop forever.
    expect(isRetryable(encodeError)).toBe(false);
    expect(isRetryable(invalidUrlError)).toBe(false);
  });

  it("isTransient also matches raw request-transport errors", () => {
    expect(isTransient(new InternalError({ message: "x" }))).toBe(true);
    expect(isTransient(transportError)).toBe(true);
    expect(isTransient(new ValidationError({ message: "x" }))).toBe(false);
    expect(isTransient(encodeError)).toBe(false);
    expect(isTransient(invalidUrlError)).toBe(false);
  });

  it.effect("catchAuthError handles both 401 and 403 in one combinator", () =>
    Effect.gen(function* () {
      const fromUnauthorized = yield* Effect.fail(
        new UnauthorizedError({ message: "no key" }),
      ).pipe(catchAuthError((error) => Effect.succeed(error._tag)));
      const fromForbidden = yield* Effect.fail(new ForbiddenError({ message: "denied" })).pipe(
        catchAuthError((error) => Effect.succeed(error._tag)),
      );

      expect(fromUnauthorized).toBe("UnauthorizedError");
      expect(fromForbidden).toBe("ForbiddenError");
    }),
  );

  it.effect("category combinators catch reason-categorized EmailChannelError instances", () =>
    Effect.gen(function* () {
      // A rate_limited EmailChannelError is throttling by reason; the handler
      // union includes EmailChannelError so its fields are readable.
      const throttled = yield* Effect.fail(
        new EmailChannelError({
          reason: "rate_limited",
          message: "slow down",
        }),
      ).pipe(catchThrottlingError((error) => Effect.succeed(error._tag)));
      expect(throttled).toBe("EmailChannelError");

      // An auth-reason instance passes UNTOUCHED through catchThrottlingError…
      const uncaught = yield* Effect.fail(
        new EmailChannelError({
          reason: "auth",
          message: "bad creds",
        }),
      ).pipe(
        catchThrottlingError(() => Effect.succeed("throttled" as const)),
        Effect.flip,
      );
      expect(uncaught._tag).toBe("EmailChannelError");

      // …and is caught by catchAuthError.
      const auth = yield* Effect.fail(
        new EmailChannelError({
          reason: "auth",
          message: "bad creds",
        }),
      ).pipe(catchAuthError((error) => Effect.succeed(error.message)));
      expect(auth).toBe("bad creds");
    }),
  );

  it("keeps email provider diagnostics off the encoded error", () => {
    const error = new EmailChannelError({
      reason: "transport",
      message: "Email service is temporarily unavailable",
      statusCode: 503,
    });

    expect(Schema.encodeUnknownSync(EmailChannelError)(error)).toEqual({
      _tag: "EmailChannelError",
      reason: "transport",
      message: "Email service is temporarily unavailable",
      statusCode: 503,
    });
  });

  it.effect("catchCategory('transient') catches every transient class", () =>
    Effect.gen(function* () {
      const fromDeliveryUnavailable = yield* Effect.fail(
        new DeliveryUnavailableError({ message: "retry", retryAfterSeconds: 5 }),
      ).pipe(catchCategory("transient", (error) => Effect.succeed(error._tag)));
      const fromBillingProvider = yield* Effect.fail(
        new BillingProviderError({
          message: "down",
        }),
      ).pipe(catchCategory("transient", (error) => Effect.succeed(error._tag)));

      expect(fromDeliveryUnavailable).toBe("DeliveryUnavailableError");
      expect(fromBillingProvider).toBe("BillingProviderError");
    }),
  );
});
