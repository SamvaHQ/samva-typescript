import { describe, expect, expectTypeOf, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { HttpClient, HttpClientResponse, type HttpClientRequest } from "effect/http";

import PackageJson from "../package.json" with { type: "json" };
import * as Brands from "../src/effect/brands";
import * as Campaigns from "../src/effect/campaigns";
import * as Client from "../src/effect/client";
import * as Email from "../src/effect/email";
import type { EmailAddSender201 } from "../src/effect/generated/email";
import type { MessagesSend201 } from "../src/effect/generated/messages";
import * as Mailboxes from "../src/effect/mailboxes";
import * as Retry from "../src/effect/retry";
import * as Templates from "../src/effect/templates";
import * as Webhooks from "../src/effect/webhooks";

const input = {
  to: "ada@example.com",
  from: { email: "sender@example.com" },
  subject: "Hello",
  html: "<p>Hi</p>",
} as const;

const response = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const stub = (
  handler: (request: HttpClientRequest.HttpClientRequest) => Response,
): HttpClient.HttpClient =>
  HttpClient.make((request) =>
    Effect.succeed(HttpClientResponse.fromWeb(request, handler(request))),
  );

type Send = ReturnType<typeof Email.send>;

describe("module-first Effect SDK", () => {
  it.effect("Email.send uses Client.layer and preserves tagged API errors", () =>
    Effect.gen(function* () {
      let apiKey: string | undefined;
      let clientAttribution: string | undefined;

      const retryAfter = yield* Email.send(input).pipe(
        Effect.catchTag("RateLimitedError", (error) => Effect.succeed(error.retryAfterSeconds)),
        Effect.provide([Retry.layerDisabled, Client.layer({ apiKey: "samva_sk_module" })]),
        Effect.provideService(
          HttpClient.HttpClient,
          stub((request) => {
            apiKey = request.headers["x-api-key"];
            clientAttribution = request.headers["x-samva-client"];
            return response(429, {
              _tag: "RateLimitedError",
              message: "Send rate limit reached. Retry after 12 seconds.",
              retryAfterSeconds: 7,
            });
          }),
        ),
      );

      expect(retryAfter).toBe(7);
      expect(apiKey).toBe("samva_sk_module");
      expect(clientAttribution).toBe(`typescript-effect/${PackageJson.version}`);
    }),
  );

  it.effect("allows attribution overrides and removals while preserving authentication", () =>
    Effect.gen(function* () {
      const seen: Array<HttpClientRequest.HttpClientRequest> = [];
      const invoke = (headers: Readonly<Record<string, string | undefined>>) =>
        Email.send(input).pipe(
          Effect.provide([
            Retry.layerDisabled,
            Client.layer({ apiKey: "samva_sk_module", headers }),
          ]),
          Effect.provideService(
            HttpClient.HttpClient,
            stub((request) => {
              seen.push(request);
              return response(200, { id: "msg_test" });
            }),
          ),
        );

      yield* Effect.exit(
        invoke({ "x-samva-client": "custom-client/1.2.3", "x-api-key": "spoofed" }),
      );
      yield* Effect.exit(invoke({ "x-samva-client": undefined, "x-api-key": "spoofed" }));

      expect(seen[0]?.headers["x-samva-client"]).toBe("custom-client/1.2.3");
      expect(seen[0]?.headers["x-api-key"]).toBe("samva_sk_module");
      expect(seen[1]?.headers["x-samva-client"]).toBeUndefined();
      expect(seen[1]?.headers["x-api-key"]).toBe("samva_sk_module");
    }),
  );

  it.effect("sends an optional idempotency key only when the caller supplies one", () =>
    Effect.gen(function* () {
      const keys: Array<string | undefined> = [];
      const reply = (idempotencyKey?: string) =>
        Mailboxes.reply({
          id: "mbx_1234567890123456",
          messageId: "msg_1234567890123456",
          text: "Thanks",
          idempotencyKey,
        }).pipe(
          Effect.provide(Client.layer({ apiKey: "samva_sk_module" })),
          Effect.provideService(
            HttpClient.HttpClient,
            stub((request) => {
              keys.push(request.headers["idempotency-key"]);
              return response(202, {
                actionId: "mbxact_1234567890123456",
                messageId: null,
                threadId: "thread_1234567890123456",
                draftId: "mdraft_1234567890123456",
                state: "approvalRequired",
                acceptedAt: null,
                executeUntil: null,
                retryAt: null,
                problem: null,
                retryEligible: false,
                decision: null,
                waitReason: null,
                reviewExpectedAt: null,
                skippedRecipients: [],
                createdAt: "2026-10-08T00:00:00.000Z",
                updatedAt: "2026-10-08T00:00:00.000Z",
              });
            }),
          ),
        );

      yield* reply();
      yield* reply("reply-1");

      expect(keys).toEqual([undefined, "reply-1"]);
    }),
  );

  it.effect("keeps a payload idempotency key in the body of a path operation", () =>
    Effect.gen(function* () {
      let body: unknown;
      yield* Effect.exit(
        Campaigns.scheduleRun({
          id: "camp_1234567890abcdefgh",
          idempotencyKey: "launch-august",
        }).pipe(
          Effect.provide(Client.layer({ apiKey: "samva_sk_module" })),
          Effect.provideService(
            HttpClient.HttpClient,
            stub((request) => {
              body =
                request.body._tag === "Uint8Array"
                  ? JSON.parse(new TextDecoder().decode(request.body.body))
                  : undefined;
              return response(500, {});
            }),
          ),
        ),
      );
      expect(body).toEqual({ idempotencyKey: "launch-august" });
    }),
  );

  it("exports direct domain operations with the Client service requirement", () => {
    expect(typeof Email.send).toBe("function");
    expect(typeof Email.listDomains.items).toBe("function");
    expect(typeof Brands.get).toBe("function");
    expectTypeOf<Effect.Services<Send>>().toEqualTypeOf<Client.Service>();
    expectTypeOf<Effect.Success<Send>>().toEqualTypeOf<MessagesSend201>();
    expectTypeOf<
      Effect.Success<ReturnType<typeof Email.addSender>>
    >().toEqualTypeOf<EmailAddSender201>();
    expectTypeOf<"RateLimitedError">().toExtend<Effect.Error<Send>["_tag"]>();
  });

  it("exports OpenAPI-derived request schemas from domain modules", () => {
    expect(Schema.decodeSync(Email.TrackingRecipientEmail)("ada@example.com")).toBe(
      "ada@example.com",
    );
    expect(
      Schema.decodeSync(Templates.CreatePayload)({
        name: "Welcome",
        idempotencyKey: "create-welcome",
      }).name,
    ).toBe("Welcome");
    expect(Schema.decodeSync(Webhooks.TestPayload)({ data: { event: "webhook.test" } })).toEqual({
      data: { event: "webhook.test" },
    });
  });
});
