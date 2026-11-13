import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer, Schema } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import { SamvaApi } from "../src/effect/generated";
import { MailboxSendReceipt } from "../src/effect/generated/shared";
import * as Mailboxes from "../src/effect/mailboxes";
import { createClient, type SendMailboxMessagePayload } from "../src/promises";
import { fakeSamvaApi } from "./support/fake-samva-api";

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
  for (const status of [200, 202] as const) {
    for (const { code, error } of errors) {
      const stopped = code === "information_required";
      const receipt = Schema.decodeSync(MailboxSendReceipt)({
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
          id: "pdec_1234567890123456",
          reviewRound: 1,
          requirement: "run",
          decider: "rule",
          outcome: "allow",
          reason: "Allowed by policy",
          scopes: [{ kind: "mailbox", id: input.id }],
        },
        createdAt: at,
        updatedAt: at,
      });
      const makeApi = () => {
        const responses: number[] = [];
        const fake = fakeSamvaApi(SamvaApi)({
          Mailboxes: { mailboxesSendMessage: { status, handle: () => Effect.succeed(receipt) } },
        });
        return {
          ...fake,
          responses,
          fetch: async (outbound: RequestInfo | URL, init?: RequestInit) => {
            const response = await fake.fetch(outbound, init);
            responses.push(response.status);
            return response;
          },
        };
      };

      it(`Promise preserves ${code} at HTTP ${status} without throwing or resubmitting`, async () => {
        const api = makeApi();
        const client = createClient({
          apiKey: "samva_sk_test",
          fetch: api.fetch,
        });
        const result = await client.mailboxes.sendMessage(input);
        expect(result).toEqual(receipt);
        expect(api.requests).toHaveLength(1);
        expect(api.responses).toEqual([status]);
        api.assertComplete();
      });

      it.effect(
        `Effect decodes ${code} at HTTP ${status} and retains review errors and policy attribution`,
        () => {
          const api = makeApi();
          return Effect.gen(function* () {
            const result = yield* Mailboxes.sendMessage(input);
            expect(result).toEqual(receipt);
            expect(api.requests).toHaveLength(1);
            expect(api.responses).toEqual([status]);
            api.assertComplete();
          }).pipe(
            Effect.provide(
              Layer.provide(
                Client.layer({ apiKey: "samva_sk_test" }),
                Layer.provide(
                  FetchHttpClient.layer,
                  Layer.succeed(FetchHttpClient.Fetch, api.fetch),
                ),
              ),
            ),
          );
        },
      );
    }
  }
});
