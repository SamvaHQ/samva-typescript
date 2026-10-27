import { describe, expect, expectTypeOf, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";

import type {
  PaymentRequiredError as PromisePaymentRequiredError,
  RateLimitedError as PromiseRateLimitedError,
} from "../src/client/types.gen";
import {
  PaymentRequiredError as EffectPaymentRequiredError,
  RateLimitedError as EffectRateLimitedError,
  type PaymentRequiredError as EffectPaymentRequiredErrorType,
  type RateLimitedError as EffectRateLimitedErrorType,
} from "../src/effect";

describe("finite-number contracts", () => {
  it("emits ordinary number types in both SDK clients", () => {
    expectTypeOf<PromiseRateLimitedError["retryAfterSeconds"]>().toEqualTypeOf<number>();
    expectTypeOf<PromisePaymentRequiredError["currentUsage"]>().toEqualTypeOf<number>();
    expectTypeOf<PromisePaymentRequiredError["limit"]>().toEqualTypeOf<number>();
    expectTypeOf<EffectRateLimitedErrorType["retryAfterSeconds"]>().toEqualTypeOf<number>();
    expectTypeOf<EffectPaymentRequiredErrorType["currentUsage"]>().toEqualTypeOf<number>();
    expectTypeOf<EffectPaymentRequiredErrorType["limit"]>().toEqualTypeOf<number>();
  });

  it("rejects non-finite numbers at the Effect client boundary", () => {
    // The client decodes error responses through these schemas; decoding is the
    // boundary that enforces `Schema.Finite` (a plain `Schema.is` on a tagged
    // error class checks instance identity, not a wire body).
    const decodes = <A>(schema: Schema.Codec<A, unknown, never>, body: unknown): boolean =>
      Exit.isSuccess(Effect.runSyncExit(Schema.decodeUnknownEffect(schema)(body)));

    expect(
      decodes(EffectRateLimitedError, {
        _tag: "RateLimitedError",
        message: "Send rate limit reached. Retry after 12 seconds.",
        retryAfterSeconds: 30,
      }),
    ).toBe(true);
    expect(
      decodes(EffectRateLimitedError, {
        _tag: "RateLimitedError",
        message: "Send rate limit reached. Retry after 12 seconds.",
        retryAfterSeconds: Infinity,
      }),
    ).toBe(false);
    expect(
      decodes(EffectPaymentRequiredError, {
        _tag: "PaymentRequiredError",
        message: "Plan limit reached; raise it in billing.",
        resource: "messages",
        currentUsage: Number.NaN,
        limit: 100,
      }),
    ).toBe(false);
  });
});
