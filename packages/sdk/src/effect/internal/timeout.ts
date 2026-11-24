import { Duration, Effect, Schema } from "effect";

/**
 * A request attempt that did not finish within its `timeoutMs`. The request may still have reached
 * the API, so the default retry policy retries it on retry-safe operations with the same
 * idempotency key, exactly like a transport failure.
 */
export class SamvaTimeoutError extends Schema.TaggedError<SamvaTimeoutError>()(
  "SamvaTimeoutError",
  Schema.Struct({ timeoutMs: Schema.Finite }),
) {
  override get message(): string {
    return `Samva request did not finish within ${this.timeoutMs} ms`;
  }
}

/** Bound one attempt; `null` leaves it unbounded. The losing request is interrupted. */
export const withTimeout = <A, E, R>(
  effect: Effect.Effect<A, E, R>,
  timeoutMs: number | null,
): Effect.Effect<A, E | SamvaTimeoutError, R> =>
  timeoutMs === null
    ? effect
    : Effect.timeoutOrElse(effect, {
        duration: Duration.millis(timeoutMs),
        orElse: () => Effect.fail(new SamvaTimeoutError({ timeoutMs })),
      });
