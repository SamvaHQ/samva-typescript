/**
 * Semantic error-category helpers for the Effect SDK.
 *
 * Every operation's error channel carries the server's real tagged errors
 * ({@link import("./errors").ConflictError} …). These helpers let callers catch
 * or test by *category* — auth, validation, throttling, transient … — without
 * enumerating tags, and cover the raw transport/decode errors too. The category
 * assignments are generated from the OpenAPI category extensions.
 *
 * @example
 * ```ts
 * import { catchAuthError, isRetryable } from "samva/effect";
 *
 * samva.messages.send(input).pipe(
 *   catchAuthError((error) => Effect.logError(`auth failed: ${error.message}`)),
 *   Effect.retry({ while: isRetryable }),
 * );
 * ```
 */
import { Effect } from "effect";
import * as Predicate from "effect/Predicate";

import type {
  BillingProviderError,
  ConflictError,
  EmailChannelError,
  ExternalServiceError,
  ForbiddenError,
  FromAddressRequiredError,
  GatewayTimeoutError,
  InternalError,
  PaymentRequiredError,
  RateLimitedError,
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
  DeliveryUnavailableError,
} from "./errors";
import { SamvaErrorMetadata } from "./generated-metadata";

export type ErrorCategory =
  | "auth"
  | "validation"
  | "notFound"
  | "conflict"
  | "throttling"
  | "billing"
  | "transient";

const emailChannelCategories = (reason: unknown): ReadonlyArray<ErrorCategory> => {
  switch (reason) {
    case "auth":
      return ["auth"];
    case "rejected":
      return ["validation"];
    case "rate_limited":
      return ["throttling", "transient"];
    case "transport":
      return ["transient"];
    default:
      return [];
  }
};

export const categoriesOf = (error: unknown): ReadonlyArray<ErrorCategory> => {
  if (!Predicate.isObject(error) || typeof error._tag !== "string") return [];
  if (error._tag === "EmailChannelError") return emailChannelCategories(error.reason);
  const metadata = (
    SamvaErrorMetadata as Readonly<
      Record<
        string,
        {
          readonly categories: ReadonlyArray<string>;
          readonly retryable: boolean;
        }
      >
    >
  )[error._tag];
  return (metadata?.categories ?? []) as ReadonlyArray<ErrorCategory>;
};

export const hasCategory = (error: unknown, category: ErrorCategory): boolean =>
  categoriesOf(error).includes(category);

const isRetryableError = (error: unknown): boolean => {
  if (!Predicate.isObject(error) || typeof error._tag !== "string") return false;
  if (error._tag === "EmailChannelError") return categoriesOf(error).includes("transient");
  return (
    (SamvaErrorMetadata as Readonly<Record<string, { readonly retryable: boolean }>>)[error._tag]
      ?.retryable ?? false
  );
};

// Category → error-class map for classes whose membership is TOTAL (every
// instance belongs). Only these may be `Exclude`d from the error channel by the
// `catch*` combinators — excluding a per-instance member would be unsound.
type CategoryError = {
  readonly auth: UnauthorizedError | ForbiddenError;
  readonly validation: ValidationError | FromAddressRequiredError;
  readonly notFound: ResourceNotFoundError;
  readonly conflict: ConflictError;
  readonly throttling: RateLimitedError;
  readonly billing: PaymentRequiredError;
  readonly transient:
    | InternalError
    | GatewayTimeoutError
    | ExternalServiceError
    | BillingProviderError
    | DeliveryUnavailableError;
};

// `EmailChannelError` is categorized per instance by `reason` (auth / rejected→
// validation / rate_limited→throttling+transient / transport→transient), so a
// category handler can RECEIVE one, but the class is never narrowed out of the
// channel — instances with other reasons still flow through uncaught.
type EmailChannelCategory = "auth" | "validation" | "throttling" | "transient";
type CategoryHandlerError<Category extends ErrorCategory> =
  | CategoryError[Category]
  | (Category extends EmailChannelCategory ? EmailChannelError : never);

// ─────────────────────────────────────────────────────────────────────────────
// Predicates
// ─────────────────────────────────────────────────────────────────────────────

const categoryGuard =
  <Category extends ErrorCategory>(category: Category) =>
  (error: unknown): error is CategoryHandlerError<Category> =>
    hasCategory(error, category);

export const isAuthError = categoryGuard("auth");
export const isValidationError = categoryGuard("validation");
export const isNotFoundError = categoryGuard("notFound");
export const isConflictError = categoryGuard("conflict");
export const isThrottlingError = categoryGuard("throttling");
export const isBillingError = categoryGuard("billing");

/**
 * Network-level request failure (no HTTP response). Only `TransportError` is
 * transient/retryable: `EncodeError` and `InvalidUrlError` are deterministic
 * programmer errors (bad input, bad URL) that would fail identically on every
 * attempt — retrying them would loop forever.
 */
const isRequestTransportError = (error: unknown): boolean => {
  if (!Predicate.isTagged(error, "HttpClientError")) return false;
  const reason = (error as { readonly reason?: unknown }).reason;
  return Predicate.isObject(reason) && Predicate.isTagged(reason, "TransportError");
};

/** True for transient failures, including raw request-transport errors. */
export const isTransient = (error: unknown): boolean =>
  hasCategory(error, "transient") || isRequestTransportError(error);

/** True when an error is declared safe to retry (throttling / transient / transport). */
export const isRetryable = (error: unknown): boolean =>
  isRetryableError(error) || isRequestTransportError(error);

// ─────────────────────────────────────────────────────────────────────────────
// Catch combinators — narrow the caught category out of the error channel
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Catch every error in `category`. The handler receives the category's error
 * union — including `EmailChannelError` where its `reason` can place it in the
 * category — while only total-membership classes are narrowed out of the error
 * channel (`EmailChannelError` stays: instances with other reasons pass through).
 */
export const catchCategory =
  <Category extends ErrorCategory, A2, E2, R2>(
    category: Category,
    handler: (error: CategoryHandlerError<Category>) => Effect.Effect<A2, E2, R2>,
  ) =>
  <A, E, R>(
    effect: Effect.Effect<A, E, R>,
  ): Effect.Effect<A | A2, Exclude<E, CategoryError[Category]> | E2, R | R2> => {
    const inCategory = (error: E): error is E & CategoryHandlerError<Category> =>
      hasCategory(error, category);
    // Every instance of a `CategoryError` class is in the category, so an error
    // outside it cannot be one.
    const outsideCategory = (error: E): error is Exclude<E, CategoryError[Category]> =>
      !hasCategory(error, category);
    return Effect.catch(
      effect,
      (error): Effect.Effect<A2, Exclude<E, CategoryError[Category]> | E2, R2> => {
        if (inCategory(error)) return handler(error);
        if (outsideCategory(error)) return Effect.fail(error);
        return Effect.die(error);
      },
    );
  };

export const catchAuthError = <A2, E2, R2>(
  handler: (error: CategoryHandlerError<"auth">) => Effect.Effect<A2, E2, R2>,
) => catchCategory("auth", handler);

export const catchValidationError = <A2, E2, R2>(
  handler: (error: CategoryHandlerError<"validation">) => Effect.Effect<A2, E2, R2>,
) => catchCategory("validation", handler);

export const catchNotFoundError = <A2, E2, R2>(
  handler: (error: CategoryHandlerError<"notFound">) => Effect.Effect<A2, E2, R2>,
) => catchCategory("notFound", handler);

export const catchConflictError = <A2, E2, R2>(
  handler: (error: CategoryHandlerError<"conflict">) => Effect.Effect<A2, E2, R2>,
) => catchCategory("conflict", handler);

export const catchThrottlingError = <A2, E2, R2>(
  handler: (error: CategoryHandlerError<"throttling">) => Effect.Effect<A2, E2, R2>,
) => catchCategory("throttling", handler);

export const catchBillingError = <A2, E2, R2>(
  handler: (error: CategoryHandlerError<"billing">) => Effect.Effect<A2, E2, R2>,
) => catchCategory("billing", handler);

/**
 * Catch transient failures — including raw request-transport errors — for
 * fallback/degrade paths. The declared error channel is left intact because
 * transient covers untyped transport errors as well.
 */
export const catchTransient =
  <A2, E2, R2>(handler: (error: unknown) => Effect.Effect<A2, E2, R2>) =>
  <A, E, R>(effect: Effect.Effect<A, E, R>): Effect.Effect<A | A2, E | E2, R | R2> =>
    Effect.catchIf(effect, isTransient, handler);
