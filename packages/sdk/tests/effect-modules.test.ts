import { describe, expect, expectTypeOf, it } from "@effect/vitest";
import { Effect, Layer, Schema } from "effect";
import { FetchHttpClient } from "effect/http";

import PackageJson from "../package.json" with { type: "json" };
import * as Brands from "../src/effect/brands";
import * as Campaigns from "../src/effect/campaigns";
import * as Client from "../src/effect/client";
import * as Email from "../src/effect/email";
import {
  SamvaApi,
  MessageId,
  MailboxActionId,
  MailboxThreadId,
  MailboxDraftId,
  RateLimitedError,
  InternalError,
} from "../src/effect/generated";
import type { EmailAddSender201 } from "../src/effect/generated/email";
import type { MailboxesReply202 } from "../src/effect/generated/mailboxes";
import type { MessagesSend201 } from "../src/effect/generated/messages";
import * as Mailboxes from "../src/effect/mailboxes";
import * as Retry from "../src/effect/retry";
import * as Templates from "../src/effect/templates";
import * as Webhooks from "../src/effect/webhooks";
import { fakeSamvaApi } from "./support/fake-samva-api";

const input = {
  to: "ada@example.com",
  from: { email: "sender@example.com" },
  subject: "Hello",
  html: "<p>Hi</p>",
} as const;

type Send = ReturnType<typeof Email.send>;

describe("module-first Effect SDK", () => {
  it.effect("Email.send uses Client.layer and preserves tagged API errors", () => {
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
      const retryAfter = yield* Email.send(input).pipe(
        Effect.catchTag("RateLimitedError", (error) => Effect.succeed(error.retryAfterSeconds)),
      );
      expect(retryAfter).toBe(7);
      expect(fake.requests[0]?.headers.get("x-api-key")).toBe("samva_sk_module");
      expect(fake.requests[0]?.headers.get("x-samva-client")).toBe(
        `typescript-effect/${PackageJson.version}`,
      );
      fake.assertComplete();
    }).pipe(
      Effect.provide(
        Layer.provide(
          Layer.mergeAll(Retry.layerDisabled, Client.layer({ apiKey: "samva_sk_module" })),
          Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fake.fetch)),
        ),
      ),
    );
  });
  it.effect("allows attribution overrides and removals while preserving authentication", () => {
    const receipt: MessagesSend201 = {
      id: Schema.decodeSync(MessageId)("msg_7q2xk9mvt4znw8rh"),
      status: "pending",
      createdAt: "2026-10-08T00:00:00.000Z",
      waitReason: null,
      reviewExpectedAt: null,
      skippedRecipients: [],
    };
    const fake = fakeSamvaApi(SamvaApi)({
      Messages: { messagesSend: () => Effect.succeed(receipt) },
    });
    return Effect.gen(function* () {
      const invoke = (headers: Readonly<Record<string, string | undefined>>) =>
        Email.send(input).pipe(
          Effect.provide([
            Retry.layerDisabled,
            Client.layer({ apiKey: "samva_sk_module", headers }),
          ]),
        );
      yield* invoke({ "x-samva-client": "custom-client/1.2.3", "x-api-key": "spoofed" });
      yield* invoke({ "x-samva-client": undefined, "x-api-key": "spoofed" });
      expect(fake.requests[0]?.headers.get("x-samva-client")).toBe("custom-client/1.2.3");
      expect(fake.requests[0]?.headers.get("x-api-key")).toBe("samva_sk_module");
      expect(fake.requests[1]?.headers.get("x-samva-client")).toBeNull();
      expect(fake.requests[1]?.headers.get("x-api-key")).toBe("samva_sk_module");
      fake.assertComplete();
    }).pipe(
      Effect.provide(
        Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fake.fetch)),
      ),
    );
  });
  it.effect("scopes an OAuth client to its configured organization", () => {
    const fake = fakeSamvaApi(SamvaApi)({
      Email: { emailListDomains: () => Effect.succeed({ items: [], nextCursor: null }) },
    });
    return Effect.gen(function* () {
      yield* Email.listDomains();
      expect(fake.requests[0]?.headers.get("authorization")).toBe("Bearer oauth-token");
      expect(fake.requests[0]?.headers.get("x-org-slug")).toBe("acme");
      fake.assertComplete();
    }).pipe(
      Effect.provide(
        Layer.provide(
          Layer.mergeAll(
            Retry.layerDisabled,
            Client.layer({ authToken: "oauth-token", orgSlug: "acme" }),
          ),
          Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fake.fetch)),
        ),
      ),
    );
  });
  it.effect("generates optional wire keys and accepts overrides only in options", () => {
    const receipt: MailboxesReply202 = {
      actionId: Schema.decodeSync(MailboxActionId)("mbxact_1234567890123456"),
      messageId: null,
      threadId: Schema.decodeSync(MailboxThreadId)("thread_1234567890123456"),
      draftId: Schema.decodeSync(MailboxDraftId)("mdraft_1234567890123456"),
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
    };
    const fake = fakeSamvaApi(SamvaApi)({
      Mailboxes: { mailboxesReply: () => Effect.succeed(receipt) },
    });
    return Effect.gen(function* () {
      const reply = (idempotencyKey?: string) =>
        Mailboxes.reply(
          { id: "mbx_1234567890123456", messageId: "msg_1234567890123456", text: "Thanks" },
          { idempotencyKey },
        );
      yield* reply();
      yield* reply("reply-1");
      expect(fake.requests[0]?.headers.get("idempotency-key")).toMatch(/^[0-9a-f-]{36}$/);
      expect(fake.requests[1]?.headers.get("idempotency-key")).toBe("reply-1");
      fake.assertComplete();
    }).pipe(
      Effect.provide(
        Layer.provide(
          Client.layer({ apiKey: "samva_sk_module" }),
          Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fake.fetch)),
        ),
      ),
    );
  });
  it.effect("sends a campaign key in the header with no body key", () => {
    const fake = fakeSamvaApi(SamvaApi)({
      Campaigns: {
        campaignsScheduleRun: () => Effect.fail(new InternalError({ message: "boom" })),
      },
    });
    return Effect.gen(function* () {
      yield* Campaigns.scheduleRun(
        { id: "camp_1234567890abcdefgh" },
        { idempotencyKey: "launch-august" },
      ).pipe(Effect.exit);
      expect(fake.requests[0]?.body).toEqual({});
      expect(fake.requests[0]?.headers.get("idempotency-key")).toBe("launch-august");
      fake.assertComplete();
    }).pipe(
      Effect.provide(
        Layer.provide(
          Layer.mergeAll(Retry.layerDisabled, Client.layer({ apiKey: "samva_sk_module" })),
          Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fake.fetch)),
        ),
      ),
    );
  });

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
      }).name,
    ).toBe("Welcome");
    expect(Schema.decodeSync(Webhooks.TestPayload)({ data: { event: "webhook.test" } })).toEqual({
      data: { event: "webhook.test" },
    });
  });
});
