import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer, Schema } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import { SamvaApi, MailboxDraftId } from "../src/effect/generated";
import type { MailboxEmailDraft } from "../src/effect/generated/mailboxes";
import * as Mailboxes from "../src/effect/mailboxes";
import { createClient } from "../src/promises";
import { fakeSamvaApi, type ApiRequest } from "./support/fake-samva-api";

const mailboxIds = ["mbx_7q2xk9mvt4znw8rh", "mbx_8q2xk9mvt4znw8rh"];
const counts = { heldActions: 2, quarantinedMessages: 1, total: 3 };

const transport = () =>
  fakeSamvaApi(SamvaApi)({
    Mailboxes: {
      mailboxesListOrganizationThreads: ({ query }) => {
        expect(query.mailboxId).toEqual(mailboxIds);
        return Effect.succeed({ items: [], nextCursor: null });
      },
      mailboxesGetNeedsYou: () => Effect.succeed({ items: [], nextCursor: null, counts }),
    },
  });

const assertRequests = (requests: ReadonlyArray<ApiRequest>) => {
  expect(requests.map((request) => request.path)).toEqual([
    "/v1/mailboxes/threads",
    "/v1/mailboxes/needs-you",
  ]);
  expect(requests[0]?.query.state).toBe("active");
  expect(requests[0]?.query.kind).toBe("shared");
  expect(requests[1]?.query.cursor).toBe("past-end");
};

describe("mailbox triage facade transport", () => {
  it("preserves repeated mailbox filters and needs-you counts in the Promise facade", async () => {
    const { fetch, requests, assertComplete } = transport();
    const client = createClient({ apiKey: "samva_sk_test", fetch });
    expect(
      await client.mailboxes.listOrganizationThreads({
        mailboxId: mailboxIds,
        state: "active",
        kind: "shared",
      }),
    ).toEqual({ items: [], nextCursor: null });
    expect((await client.mailboxes.getNeedsYou({ cursor: "past-end", limit: 2 })).counts).toEqual(
      counts,
    );
    assertRequests(requests);
    assertComplete();
  });

  it.effect("preserves the same filters and counts through the Effect facade", () => {
    const { fetch, requests, assertComplete } = transport();
    return Effect.gen(function* () {
      expect(
        yield* Mailboxes.listOrganizationThreads({
          mailboxId: mailboxIds,
          state: "active",
          kind: "shared",
        }),
      ).toEqual({ items: [], nextCursor: null });
      expect((yield* Mailboxes.getNeedsYou({ cursor: "past-end", limit: 2 })).counts).toEqual(
        counts,
      );
      assertRequests(requests);
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

const draft: MailboxEmailDraft = {
  id: Schema.decodeSync(MailboxDraftId)("mdraft_7q2xk9mvt4znw8rh"),
  channel: "email",
  threadId: null,
  inReplyToMessageId: null,
  state: "saved",
  lockedByActionId: null,
  to: ["reader@example.com"],
  subject: "Draft",
  createdAt: "2026-11-10T00:00:00.000Z",
  updatedAt: "2026-11-10T00:01:00.000Z",
  revision: 7,
  endpointId: null,
  cc: [],
  bcc: [],
  replyTo: [],
  html: null,
  text: "Saved content",
  attachments: [],
};
const draftTransport = () =>
  fakeSamvaApi(SamvaApi)({
    Mailboxes: { mailboxesGetDraft: () => Effect.succeed(draft) },
  });

describe("mailbox draft content revision", () => {
  it("preserves the revision through the Promise draft read", async () => {
    const fake = draftTransport();
    const client = createClient({ apiKey: "samva_sk_test", fetch: fake.fetch });
    expect(
      await client.mailboxes.getDraft({ id: mailboxIds[0]!, draftId: draft.id }),
    ).toMatchObject({ revision: 7, text: "Saved content" });
    fake.assertComplete();
  });

  it.effect("preserves the revision through the Effect draft read", () => {
    const fake = draftTransport();
    return Effect.gen(function* () {
      expect(yield* Mailboxes.getDraft({ id: mailboxIds[0]!, draftId: draft.id })).toMatchObject({
        revision: 7,
        text: "Saved content",
      });
      fake.assertComplete();
    }).pipe(
      Effect.provide(
        Layer.provide(
          Client.layer({ apiKey: "samva_sk_test" }),
          Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fake.fetch)),
        ),
      ),
    );
  });
});
