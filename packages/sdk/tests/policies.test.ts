import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer, Schema } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import { SamvaApi, MailboxActionId, MessageId, PolicyVersion } from "../src/effect/generated";
import type { MailboxSendAction } from "../src/effect/generated/mailboxes";
import type { PolicySnapshot } from "../src/effect/generated/policies";
import * as Mailboxes from "../src/effect/mailboxes";
import * as Policies from "../src/effect/policies";
import { createClient, type PolicyConfiguration } from "../src/promises";
import { fakeSamvaApi } from "./support/fake-samva-api";

const mailboxId = "mbx_1234567890123456";
const scope = { kind: "mailbox", id: mailboxId } as const;
const configuration = {
  presets: [],
  rules: [{ match: { effect: "final" }, atLeast: "person" }],
  instructions: "Review commitments.",
} satisfies PolicyConfiguration;
const snapshot: PolicySnapshot = {
  ...configuration,
  version: Schema.decodeSync(PolicyVersion)(3),
};
const replaced: PolicySnapshot = {
  ...configuration,
  version: Schema.decodeSync(PolicyVersion)(4),
};
const cleared: PolicySnapshot = {
  presets: [],
  rules: [],
  version: Schema.decodeSync(PolicyVersion)(5),
};
const actionId = Schema.decodeSync(MailboxActionId)("mbxact_1234567890123456");
const date = "2026-11-05T00:00:00.000Z";
const approvedAction: MailboxSendAction = {
  id: actionId,
  type: "reply",
  state: "accepted",
  source: "humanUi",
  proposedBy: { kind: "user", id: "user_1234567890123456" },
  threadId: null,
  draftId: null,
  decision: null,
  resolution: null,
  alwaysAllow: null,
  intent: null,
  createdAt: date,
  updatedAt: date,
  send: {
    actionId,
    draftId: null,
    threadId: null,
    state: "accepted",
    messageId: Schema.decodeSync(MessageId)("msg_1234567890123456"),
    acceptedAt: date,
    waitReason: null,
    reviewExpectedAt: null,
    skippedRecipients: [],
    executeUntil: null,
    retryAt: null,
    problem: null,
    retryEligible: false,
    decision: null,
    createdAt: date,
    updatedAt: date,
  },
};
const deniedAction: MailboxSendAction = {
  ...approvedAction,
  state: "notSent",
  send: { ...approvedAction.send, state: "notSent", messageId: null, acceptedAt: null },
};
const transport = () =>
  fakeSamvaApi(SamvaApi)({
    Policies: {
      policiesGetPolicy: () => Effect.succeed(snapshot),
      policiesSetPolicy: () => Effect.succeed(replaced),
      policiesDeletePolicy: () => Effect.succeed(cleared),
    },
    Mailboxes: {
      mailboxesApproveAction: () => Effect.succeed(approvedAction),
      mailboxesDenyAction: () => Effect.succeed(deniedAction),
    },
  });
const requestShapes = (requests: ReturnType<typeof transport>["requests"]) =>
  requests.map((request) => ({
    method: request.method,
    path:
      request.operation === "policiesDeletePolicy"
        ? `${request.path}?ifVersion=${request.query.ifVersion}`
        : request.path,
    body: request.body,
  }));
const expectedRequests = [
  { method: "GET", path: `/v1/policies/mailbox/${mailboxId}`, body: undefined },
  {
    method: "PUT",
    path: `/v1/policies/mailbox/${mailboxId}`,
    body: { ...configuration, ifVersion: 3 },
  },
  { method: "DELETE", path: `/v1/policies/mailbox/${mailboxId}?ifVersion=4`, body: undefined },
  {
    method: "POST",
    path: `/v1/mailboxes/${mailboxId}/actions/${actionId}/approve`,
    body: { reviewRound: 2, edits: { text: "Reviewed reply" } },
  },
  {
    method: "POST",
    path: `/v1/mailboxes/${mailboxId}/actions/${actionId}/deny`,
    body: { reviewRound: 3, reason: "Wrong recipient" },
  },
];

describe("decision policy facade transport", () => {
  it("preserves policy scope, configuration, and approval edits through Promise methods", async () => {
    const { fetch, requests, assertComplete } = transport();
    const client = createClient({ apiKey: "samva_sk_test", fetch });
    expect(await client.policies.getPolicy(scope)).toEqual(snapshot);
    expect(await client.policies.setPolicy({ ...scope, ...configuration, ifVersion: 3 })).toEqual(
      replaced,
    );
    expect(await client.policies.deletePolicy({ ...scope, ifVersion: 4 })).toEqual(cleared);
    expect(
      await client.mailboxes.approveAction({
        id: mailboxId,
        actionId,
        reviewRound: 2,
        edits: { text: "Reviewed reply" },
      }),
    ).toEqual(approvedAction);
    expect(
      await client.mailboxes.denyAction({
        id: mailboxId,
        actionId,
        reviewRound: 3,
        reason: "Wrong recipient",
      }),
    ).toEqual(deniedAction);
    expect(requestShapes(requests)).toEqual(expectedRequests);
    assertComplete();
  });

  it.effect("preserves the same calls and decoded results through focused Effect modules", () => {
    const { fetch, requests, assertComplete } = transport();
    return Effect.gen(function* () {
      expect(yield* Policies.getPolicy(scope)).toEqual(snapshot);
      expect(yield* Policies.setPolicy({ ...scope, ...configuration, ifVersion: 3 })).toEqual(
        replaced,
      );
      expect(yield* Policies.deletePolicy({ ...scope, ifVersion: 4 })).toEqual(cleared);
      expect(
        yield* Mailboxes.approveAction({
          id: mailboxId,
          actionId,
          reviewRound: 2,
          edits: { text: "Reviewed reply" },
        }),
      ).toEqual(approvedAction);
      expect(
        yield* Mailboxes.denyAction({
          id: mailboxId,
          actionId,
          reviewRound: 3,
          reason: "Wrong recipient",
        }),
      ).toEqual(deniedAction);
      expect(requestShapes(requests)).toEqual(expectedRequests);
      assertComplete();
    }).pipe(
      Effect.provide(
        Layer.provide(
          Client.layer({ apiKey: "samva_sk_test" }),
          Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
        ),
      ),
    );
  });
});
