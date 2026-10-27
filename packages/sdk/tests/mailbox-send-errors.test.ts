import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { HttpClient, HttpClientResponse } from "effect/http";

import * as Client from "../src/effect/client";
import * as Mailboxes from "../src/effect/mailboxes";
import { createClient, type SendMailboxMessagePayload } from "../src/promises";

const input: SendMailboxMessagePayload & { readonly id: string } = {
  id: "mbx_1234567890123456",
  to: ["reader@example.com"],
  subject: "Hello",
  text: "Frozen content",
};
const at = "2026-10-13T00:00:00.000Z";
const errors = [
  {
    code: "rateLimited",
    error: { _tag: "RateLimitedError", message: "Slow down", retryAfterSeconds: 7 },
  },
  {
    code: "senderNotReady",
    error: {
      _tag: "SenderNotReadyError",
      message: "Identity is getting ready",
      sender: "support@example.com",
      retryAfterSeconds: 17,
    },
  },
  {
    code: "reviewPending",
    error: {
      _tag: "OnboardingReviewRequiredError",
      message: "Review is pending",
      code: "identity_review_required",
      decision: "undecided",
      stage: "manual_review",
      nextAction: "wait_for_review",
      identityId: "identity-test",
    },
  },
  {
    code: "information_required",
    error: {
      _tag: "OnboardingReviewRequiredError",
      message: "Review needs information",
      code: "information_required",
      decision: "undecided",
      stage: "information_requested",
      nextAction: "provide_information",
      identityId: "identity-test",
    },
  },
] as const;

describe("mailbox send receipt refusal identity", () => {
  for (const { code, error } of errors) {
    const stopped = code === "information_required";
    const receipt = {
      actionId: "mbxact_1234567890123456",
      draftId: null,
      threadId: null,
      state: stopped ? "notSent" : "queued",
      messageId: null,
      acceptedAt: null,
      waitReason: null,
      reviewExpectedAt: null,
      skippedRecipients: [],
      executeUntil: "2026-10-13T00:15:00.000Z",
      retryAt: stopped ? null : "2026-10-13T00:00:17.000Z",
      problem: { code, message: error.message, error },
      retryEligible: false,
      decision: {
        outcome: "allow",
        source: "grant",
        reason: null,
        policyId: null,
        decidedAt: at,
      },
      createdAt: at,
      updatedAt: at,
    };
    const response = () =>
      new Response(JSON.stringify(receipt), {
        status: stopped ? 200 : 202,
        headers: { "content-type": "application/json" },
      });

    it(`Promise preserves ${code} without throwing or resubmitting`, async () => {
      let calls = 0;
      const client = createClient({
        apiKey: "samva_sk_test",
        fetch: async () => {
          calls += 1;
          return response();
        },
      });
      const result = await client.mailboxes.sendMessage(input);
      expect(result).toEqual(receipt);
      expect(calls).toBe(1);
    });

    it.effect(`Effect decodes ${code} and retains review and approval sources`, () => {
      let calls = 0;
      return Effect.gen(function* () {
        const result = yield* Mailboxes.sendMessage(input);
        expect(result).toEqual(receipt);
        expect(calls).toBe(1);
      }).pipe(
        Effect.provide(Client.layer({ apiKey: "samva_sk_test" })),
        Effect.provideService(
          HttpClient.HttpClient,
          HttpClient.make((request) => {
            calls += 1;
            return Effect.succeed(HttpClientResponse.fromWeb(request, response()));
          }),
        ),
      );
    });
  }
});
