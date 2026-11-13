import { describe, expect, expectTypeOf, it } from "@effect/vitest";
import { Effect, Layer, Schema } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import * as Email from "../src/effect/email";
import { SamvaApi, MessageId, RateLimitedError, InternalError } from "../src/effect/generated";
import type { MessagesSend201 } from "../src/effect/generated/messages";
import * as Messages from "../src/effect/messages";
import * as Retry from "../src/effect/retry";
import * as Webhooks from "../src/effect/webhooks";
import { fakeSamvaApi } from "./support/fake-samva-api";

/**
 * Messages-group tracer: proves the `samva/effect` client, derived at runtime
 * from the generated HttpApi groups via `HttpApiClient.group`,
 * carries the server's real tagged errors in its channel, sets the auth header,
 * and decodes successes into domain types — without any workspace/codegen client.
 */

const sendInput = {
  to: "ada@example.com",
  from: { email: "sender@example.com" },
  subject: "Hello",
  html: "<p>Hi</p>",
} as const;

type SendSuccess = Effect.Success<ReturnType<typeof Messages.send>>;
type SendError = Effect.Error<ReturnType<typeof Messages.send>>;

describe("messages tracer through HttpApiClient", () => {
  it.effect("decodes skipped recipients and a review hold from an accepted send", () => {
    const expected: MessagesSend201 = {
      id: Schema.decodeSync(MessageId)("msg_aaaaaaaaaaaaaaaa"),
      status: "pending",
      createdAt: "2026-10-08T11:00:00.000Z",
      waitReason: "content-review",
      reviewExpectedAt: "2026-10-08T12:00:00.000Z",
      skippedRecipients: [{ address: "blocked@example.com", reason: "bounce" }],
    };
    const fake = fakeSamvaApi(SamvaApi)({
      Messages: { messagesSend: () => Effect.succeed(expected) },
    });
    return Effect.gen(function* () {
      const receipt = yield* Email.send(sendInput);
      expect(receipt.skippedRecipients).toEqual(expected.skippedRecipients);
      expect(receipt.waitReason).toBe(expected.waitReason);
      expect(receipt.reviewExpectedAt).toBe(expected.reviewExpectedAt);
      fake.assertComplete();
    }).pipe(
      Effect.provide(
        Layer.provide(
          Client.layer({ apiKey: "samva_sk_tracer" }),
          Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fake.fetch)),
        ),
      ),
    );
  });
  it.effect(
    "a 429 send is handled by Effect.catchTag('RateLimitedError'), and the request carries the api key",
    () => {
      const fake = fakeSamvaApi(SamvaApi)({
        Messages: {
          messagesSend: () =>
            Effect.fail(
              new RateLimitedError({
                message: "Send rate limit reached. Retry after 12 seconds.",
                retryAfterSeconds: 7,
              }),
            ),
        },
      });
      return Effect.gen(function* () {
        const retryAfter = yield* Email.send(sendInput).pipe(
          Effect.catchTag("RateLimitedError", (error) => Effect.succeed(error.retryAfterSeconds)),
        );
        expect(retryAfter).toBe(7);
        expect(fake.requests[0]?.headers.get("x-api-key")).toBe("samva_sk_tracer");
        fake.assertComplete();
      }).pipe(
        Effect.provide(
          Layer.provide(
            Layer.mergeAll(Client.layer({ apiKey: "samva_sk_tracer" }), Retry.layerDisabled),
            Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fake.fetch)),
          ),
        ),
      );
    },
  );
  it.effect("a Bearer auth token is sent as an Authorization header", () => {
    const fake = fakeSamvaApi(SamvaApi)({
      Messages: { messagesSend: () => Effect.fail(new InternalError({ message: "boom" })) },
    });
    return Effect.gen(function* () {
      yield* Email.send(sendInput).pipe(Effect.ignore);
      expect(fake.requests[0]?.headers.get("authorization")).toBe("Bearer device-token");
      fake.assertComplete();
    }).pipe(
      Effect.provide(
        Layer.provide(
          Layer.mergeAll(Client.layer({ authToken: "device-token" }), Retry.layerDisabled),
          Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fake.fetch)),
        ),
      ),
    );
  });
  it.effect("pathPayload bodies omit nested present-undefined optionals (no null clears)", () => {
    const fake = fakeSamvaApi(SamvaApi)({
      Webhooks: { webhooksUpdate: () => Effect.fail(new InternalError({ message: "boom" })) },
    });
    return Effect.gen(function* () {
      yield* Webhooks.update({
        id: "wep_7q2xk9mvt4znw8rh",
        url: "https://example.com/hook",
        name: undefined,
      }).pipe(Effect.ignore);
      expect(fake.requests[0]?.body).toEqual({ url: "https://example.com/hook" });
      fake.assertComplete();
    }).pipe(
      Effect.provide(
        Layer.provide(
          Client.layer({ apiKey: "samva_sk_tracer" }),
          Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fake.fetch)),
        ),
      ),
    );
  });

  it("the send error channel carries the semantic tags, not per-status wrappers", () => {
    expectTypeOf<"RateLimitedError" | "ValidationError" | "PaymentRequiredError">().toExtend<
      SendError["_tag"]
    >();
  });

  it("the send success keeps a branded message id and the wire's ISO timestamp", () => {
    expectTypeOf<SendSuccess["id"]>().toExtend<string>();
    expectTypeOf<SendSuccess["id"]>().not.toEqualTypeOf<string>();
    expectTypeOf<SendSuccess["createdAt"]>().toEqualTypeOf<string>();
  });
});
