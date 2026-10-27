import { assert, describe, expect, it } from "@effect/vitest";
import { Cause, Effect, Exit } from "effect";

import { verify as verifyEffect, verifyRequest as verifyRequestEffect } from "../src/effect.js";
import {
  generateWebhookSecret,
  InvalidWebhookHeadersError,
  safeVerify,
  signWebhook,
  verify,
  verifyRequest,
  WEBHOOK_ID_HEADER,
  WEBHOOK_SIGNATURE_HEADER,
  WEBHOOK_TIMESTAMP_HEADER,
  WebhookSignatureError,
  type VerifyOptions,
} from "../src/promise.js";

/**
 * Every entry point reports a failed delivery as a `WebhookVerificationError` and nothing else.
 * Input that violates the declared types (here an undefined secret, as when an environment
 * variable is missing) is a programming fault: it must not reach the caller as a verification
 * result that a handler answers with a 400.
 */

const body = JSON.stringify({
  type: "message.delivered",
  timestamp: "2026-01-01T00:00:00.000Z",
  data: {
    messageId: "msg_01JQ0S9N4B7CE5A6Z4W6E3TQ8H",
    organizationId: "org_example",
    channel: "email",
  },
});

interface SignedOptions extends VerifyOptions {
  readonly id: string;
  readonly timestamp: string;
  readonly signature: string;
}

const signedOptions = async (): Promise<SignedOptions> => {
  const secret = generateWebhookSecret();
  const id = "evt_01JQ0S9N4B7CE5A6Z4W6E3TQ8H";
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = await signWebhook({ body, id, timestamp, secret });
  return { body, id, timestamp, signature, secret };
};

const requestFor = (options: SignedOptions): Request =>
  new Request("https://customer.example/webhooks/samva", {
    method: "POST",
    body,
    headers: {
      [WEBHOOK_ID_HEADER]: options.id,
      [WEBHOOK_TIMESTAMP_HEADER]: options.timestamp,
      [WEBHOOK_SIGNATURE_HEADER]: options.signature,
    },
  });

// The customer's `process.env.SAMVA_WEBHOOK_SECRET!` when the variable is unset.
const unsetEnvironment: Readonly<Record<string, string | undefined>> = {};
const missingSecret = unsetEnvironment["SAMVA_WEBHOOK_SECRET"]!;

describe("Promise entry points", () => {
  it("safeVerify returns a verification failure as a result", async () => {
    const options = await signedOptions();

    const result = await safeVerify({ ...options, secret: generateWebhookSecret() });

    assert(!result.verified);
    expect(result.error).toBeInstanceOf(WebhookSignatureError);
  });

  it("safeVerify rejects with an error that is not a verification failure", async () => {
    const options = await signedOptions();

    await expect(safeVerify({ ...options, secret: missingSecret })).rejects.toBeInstanceOf(
      TypeError,
    );
  });

  it("verify rejects with the original error for an undefined secret", async () => {
    const options = await signedOptions();

    await expect(verify({ ...options, secret: missingSecret })).rejects.toBeInstanceOf(TypeError);
  });

  it("verify rejects an absent header, as Express reports it, with a headers error naming it", async () => {
    const options = await signedOptions();

    const result = await safeVerify({ ...options, timestamp: undefined });

    assert(!result.verified);
    expect(result.error).toBeInstanceOf(InvalidWebhookHeadersError);
    expect(result.error).toMatchObject({ header: WEBHOOK_TIMESTAMP_HEADER });
  });

  it("verifyRequest rejects with the original error for an undefined secret", async () => {
    const options = await signedOptions();

    await expect(verifyRequest(requestFor(options), missingSecret)).rejects.toBeInstanceOf(
      TypeError,
    );
  });
});

const defectOf = <A, E>(exit: Exit.Exit<A, E>): unknown => {
  assert(Exit.isFailure(exit));
  assert(!Cause.hasFails(exit.cause), "expected a defect, not a typed failure");
  return Cause.squash(exit.cause);
};

describe("Effect entry points", () => {
  it.live("verify fails with a verification error", () =>
    Effect.gen(function* () {
      const options = yield* Effect.promise(signedOptions);

      const error = yield* Effect.flip(
        verifyEffect({ ...options, secret: generateWebhookSecret() }),
      );

      expect(error).toBeInstanceOf(WebhookSignatureError);
    }),
  );

  it.live("verify dies on an undefined secret", () =>
    Effect.gen(function* () {
      const options = yield* Effect.promise(signedOptions);

      const exit = yield* Effect.exit(verifyEffect({ ...options, secret: missingSecret }));

      expect(defectOf(exit)).toBeInstanceOf(TypeError);
    }),
  );

  it.live("verifyRequest fails with a verification error", () =>
    Effect.gen(function* () {
      const options = yield* Effect.promise(signedOptions);

      const error = yield* Effect.flip(
        verifyRequestEffect(requestFor(options), generateWebhookSecret()),
      );

      expect(error).toBeInstanceOf(WebhookSignatureError);
    }),
  );

  it.live("verifyRequest fails, rather than dies, on a missing header and names it", () =>
    Effect.gen(function* () {
      const options = yield* Effect.promise(signedOptions);
      const request = requestFor(options);
      request.headers.delete(WEBHOOK_SIGNATURE_HEADER);

      const error = yield* Effect.flip(verifyRequestEffect(request, options.secret));

      expect(error).toBeInstanceOf(InvalidWebhookHeadersError);
      expect(error).toMatchObject({ header: WEBHOOK_SIGNATURE_HEADER });
    }),
  );

  it.live("verifyRequest dies on an undefined secret", () =>
    Effect.gen(function* () {
      const options = yield* Effect.promise(signedOptions);

      const exit = yield* Effect.exit(verifyRequestEffect(requestFor(options), missingSecret));

      expect(defectOf(exit)).toBeInstanceOf(TypeError);
    }),
  );
});
