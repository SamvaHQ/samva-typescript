import { describe, expect, expectTypeOf, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { HttpClient, HttpClientResponse, type HttpClientRequest } from "effect/http";

import * as Client from "../src/effect/client";
import * as Email from "../src/effect/email";
import * as Messages from "../src/effect/messages";
import * as Retry from "../src/effect/retry";
import * as Webhooks from "../src/effect/webhooks";

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

const jsonResponse = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

/** Stub HttpClient that records the outgoing request and returns a canned response. */
const stubClient = (
  handler: (request: HttpClientRequest.HttpClientRequest) => Response,
): HttpClient.HttpClient =>
  HttpClient.make((request) =>
    Effect.succeed(HttpClientResponse.fromWeb(request, handler(request))),
  );

type SendSuccess = Effect.Success<ReturnType<typeof Messages.send>>;
type SendError = Effect.Error<ReturnType<typeof Messages.send>>;

describe("messages tracer through HttpApiClient", () => {
  it.effect("decodes skipped recipients and a review hold from an accepted send", () =>
    Effect.gen(function* () {
      const reviewExpectedAt = "2026-10-08T12:00:00.000Z";
      const skippedRecipients = [{ address: "blocked@example.com", reason: "bounce" }];
      const client = Client.layer({ apiKey: "samva_sk_tracer" }).pipe(
        Layer.provide(
          Layer.succeed(
            HttpClient.HttpClient,
            stubClient(() =>
              jsonResponse(201, {
                id: "msg_aaaaaaaaaaaaaaaa",
                status: "pending",
                createdAt: "2026-10-08T11:00:00.000Z",
                waitReason: "content-review",
                reviewExpectedAt,
                skippedRecipients,
              }),
            ),
          ),
        ),
      );
      const receipt = yield* Email.send(sendInput).pipe(Effect.provide(client));
      expect(receipt.skippedRecipients).toEqual(skippedRecipients);
      expect(receipt.waitReason).toBe("content-review");
      expect(receipt.reviewExpectedAt).toBe(reviewExpectedAt);
    }),
  );

  it.effect(
    "a 429 send is handled by Effect.catchTag('RateLimitedError'), and the request carries the api key",
    () =>
      Effect.gen(function* () {
        let seenApiKey: string | undefined;
        const client = Client.layer({ apiKey: "samva_sk_tracer" }).pipe(
          Layer.provide(
            Layer.succeed(
              HttpClient.HttpClient,
              stubClient((request) => {
                seenApiKey = request.headers["x-api-key"];
                return jsonResponse(429, {
                  _tag: "RateLimitedError",
                  message: "Send rate limit reached. Retry after 12 seconds.",
                  retryAfterSeconds: 7,
                });
              }),
            ),
          ),
        );

        // Disable auto-retry so the single-shot 429 surfaces immediately
        // instead of being retried per the default policy.
        const retryAfter = yield* Email.send(sendInput).pipe(
          Effect.provide(Layer.mergeAll(client, Retry.layerDisabled)),
          Effect.catchTag("RateLimitedError", (error) => Effect.succeed(error.retryAfterSeconds)),
        );

        expect(retryAfter).toBe(7);
        expect(seenApiKey).toBe("samva_sk_tracer");
      }),
  );

  it.effect("a Bearer auth token is sent as an Authorization header", () =>
    Effect.gen(function* () {
      let authorization: string | undefined;
      const client = Client.layer({ authToken: "device-token" }).pipe(
        Layer.provide(
          Layer.succeed(
            HttpClient.HttpClient,
            stubClient((request) => {
              authorization = request.headers["authorization"];
              return jsonResponse(500, {
                _tag: "InternalError",
                message: "boom",
              });
            }),
          ),
        ),
      );

      yield* Email.send(sendInput).pipe(
        Effect.provide(Layer.mergeAll(client, Retry.layerDisabled)),
        Effect.ignore,
      );
      expect(authorization).toBe("Bearer device-token");
    }),
  );

  it.effect("pathPayload bodies omit nested present-undefined optionals (no null clears)", () =>
    Effect.gen(function* () {
      let body: string | undefined;
      const client = Client.layer({ apiKey: "samva_sk_tracer" }).pipe(
        Layer.provide(
          Layer.succeed(
            HttpClient.HttpClient,
            stubClient((request) => {
              const requestBody = request.body;
              body =
                requestBody._tag === "Uint8Array"
                  ? new TextDecoder().decode(requestBody.body)
                  : undefined;
              return jsonResponse(500, {
                _tag: "InternalError",
                message: "boom",
              });
            }),
          ),
        ),
      );

      // webhooks.update is a pathPayload op: a present-but-undefined optional
      // must be omitted on the wire —
      // encoding it as `null` would unintentionally clear the server-side field.
      yield* Webhooks.update({
        id: "wep_7q2xk9mvt4znw8rh",
        url: "https://example.com/hook",
        name: undefined,
      }).pipe(Effect.provide(client), Effect.ignore);

      expect(body).toBeDefined();
      expect(JSON.parse(body!)).toEqual({
        url: "https://example.com/hook",
      });
    }),
  );

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
