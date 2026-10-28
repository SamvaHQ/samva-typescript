/**
 * Default-on retry for the Effect SDK.
 *
 * Every retry-safe operation — reads and idempotent mutations — retries out
 * of the box: transient failures back off with jittered exponential delay, and
 * `429 RateLimitedError` honors the server's `retryAfterSeconds` hint (capped).
 * Eligibility is decided by the {@link isRetryable} category predicate; the set
 * of retry-safe operations is decided by the module adapter (GET/HEAD reads and idempotent
 * mutations), so keyless mutating operations are never auto-retried.
 *
 * The policy is read from context via {@link Service} using
 * `Effect.serviceOption`, so the default applies when the service is absent and
 * no operation gains a requirement. Install {@link layerDisabled} to turn
 * retries off, or {@link layer} for a custom schedule/options.
 *
 * @example
 * ```ts
 * import { Effect } from "effect";
 * import * as Retry from "samva/effect/retry";
 *
 * // Disable auto-retry for a program:
 * program.pipe(Effect.provide(Retry.layerDisabled));
 * ```
 */
import { Context, Duration, Effect, Layer, Option, Random, Schedule } from "effect";
import * as Predicate from "effect/Predicate";

import { isRetryable } from "./categories";

// ─────────────────────────────────────────────────────────────────────────────
// Default policy constants
// ─────────────────────────────────────────────────────────────────────────────

/** Retries beyond the initial attempt — total attempts = 1 + `MAX_RETRIES`. */
const MAX_RETRIES = 3;
/** First backoff delay; each subsequent attempt multiplies by `BACKOFF_FACTOR`. */
const BASE_DELAY = Duration.millis(200);
const BACKOFF_FACTOR = 2;
/** Ceiling on how long we honor a server `retryAfterSeconds` hint. */
const MAX_SERVER_HINT = Duration.seconds(60);

/**
 * Server-provided delay for a `429`: the `retryAfterSeconds` field the api emits
 * on `RateLimitedError`, capped at {@link MAX_SERVER_HINT}. Returns `undefined`
 * for any other error so the jittered backoff delay stands.
 */
const serverHintDelay = (error: unknown): Duration.Duration | undefined => {
  if (!Predicate.isTagged(error, "RateLimitedError")) return undefined;
  const seconds = (error as { readonly retryAfterSeconds?: unknown }).retryAfterSeconds;
  if (typeof seconds !== "number" || !Number.isFinite(seconds) || seconds < 0) return undefined;
  return Duration.min(Duration.seconds(seconds), MAX_SERVER_HINT);
};

/** Jittered exponential backoff for the transient-failure path. */
const jitteredBackoff = Schedule.jittered(Schedule.exponential(BASE_DELAY, BACKOFF_FACTOR));

/**
 * Retry a retry-safe effect under the default policy: transient/throttled
 * failures ({@link isRetryable}), bounded to {@link MAX_RETRIES}, delayed by
 * jittered exponential backoff — except a `429` whose `retryAfterSeconds` hint
 * overrides the computed delay (exactly, un-jittered, capped). The schedule
 * reads the just-failed error from its step metadata (`input`).
 */
const defaultSchedule = Schedule.modifyDelay(jitteredBackoff, ({ duration, input }) =>
  Effect.succeed(serverHintDelay(input) ?? duration),
);

const defaultRetry = <A, E, R>(effect: Effect.Effect<A, E, R>): Effect.Effect<A, E, R> =>
  Effect.retry(effect, { while: isRetryable, times: MAX_RETRIES, schedule: defaultSchedule });

// ─────────────────────────────────────────────────────────────────────────────
// Retry service
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A retry policy: the transform applied to each retry-safe operation. Modeled as
 * a function so policies can wrap the effect arbitrarily (retry options, custom
 * schedules, or no-op passthrough).
 */
export interface Interface {
  readonly retry: <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>;
}

/**
 * Context service carrying the SDK's retry policy. Absent → {@link defaultPolicy}
 * (read through `Effect.serviceOption`, so no operation gains a requirement).
 */
export class Service extends Context.Service<Service, Interface>()("samva/Retry") {}

export const defaultPolicy: Interface = { retry: defaultRetry };
export const disabledPolicy: Interface = { retry: (effect) => effect };

export const fromOptions = (options: Effect.Retry.Options<unknown>): Interface => ({
  retry: <A, E, R>(effect: Effect.Effect<A, E, R>): Effect.Effect<A, E, R> =>
    Effect.retry(effect, options as Effect.Retry.Options<E>) as Effect.Effect<A, E, R>,
});

export const layerDefault: Layer.Layer<Service> = Layer.succeed(Service, defaultPolicy);
export const layerDisabled: Layer.Layer<Service> = Layer.succeed(Service, disabledPolicy);
export const layer = (options: Effect.Retry.Options<unknown>): Layer.Layer<Service> =>
  Layer.succeed(Service, fromOptions(options));

/**
 * Apply the ambient {@link Service} policy to a retry-safe operation. Reads
 * the policy optionally (default when absent) and keeps the effect's `R`.
 */
export const withRetry = <A, E, R>(effect: Effect.Effect<A, E, R>): Effect.Effect<A, E, R> =>
  Effect.serviceOption(Service).pipe(
    Effect.flatMap((policyOption) =>
      Option.getOrElse(policyOption, () => defaultPolicy).retry(effect),
    ),
  );

// ─────────────────────────────────────────────────────────────────────────────
// Idempotency keys
// ─────────────────────────────────────────────────────────────────────────────

const HEX = "0123456789abcdef";

/**
 * Generate a v4-shaped idempotency key through Effect's `Random` service —
 * deterministic under a seeded/`TestClock` runtime and platform-neutral (no Web
 * Crypto or bare `Math.random` at the call site). Facade operations evaluate this
 * once per logical call so the key is stable across auto-retries within the call
 * and distinct across calls.
 */
export const generateIdempotencyKey: Effect.Effect<string> = Effect.gen(function* () {
  const chars: Array<string> = [];
  for (let index = 0; index < 32; index += 1) {
    let nibble = yield* Random.nextIntBetween(0, 15);
    if (index === 12) nibble = 4; // version 4
    else if (index === 16) nibble = (nibble & 0x3) | 0x8; // RFC 4122 variant
    chars.push(HEX[nibble]!);
  }
  const hex = chars.join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
});
