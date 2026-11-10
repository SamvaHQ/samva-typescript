import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import * as Mailboxes from "../src/effect/mailboxes";
import { createClient } from "../src/promises";

const mailboxIds = ["mbx_7q2xk9mvt4znw8rh", "mbx_8q2xk9mvt4znw8rh"];
const counts = { heldActions: 2, quarantinedMessages: 1, total: 3 };

const transport = () => {
  const requests: URL[] = [];
  const fetch: typeof globalThis.fetch = async (input, init) => {
    const request = input instanceof Request ? input : new Request(input, init);
    const url = new URL(request.url);
    requests.push(url);
    return Response.json(
      url.pathname.endsWith("needs-you")
        ? { items: [], nextCursor: null, counts }
        : { items: [], nextCursor: null },
    );
  };
  return { fetch, requests };
};

const assertRequests = (requests: URL[]) => {
  expect(requests.map((url) => url.pathname)).toEqual([
    "/v1/mailboxes/threads",
    "/v1/mailboxes/needs-you",
  ]);
  expect(requests[0]?.searchParams.getAll("mailboxId")).toEqual(mailboxIds);
  expect(requests[0]?.searchParams.get("state")).toBe("active");
  expect(requests[0]?.searchParams.get("kind")).toBe("shared");
  expect(requests[1]?.searchParams.get("cursor")).toBe("past-end");
};

describe("mailbox triage facade transport", () => {
  it("preserves repeated mailbox filters and needs-you counts in the Promise facade", async () => {
    const { fetch, requests } = transport();
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
  });

  it.effect("preserves the same filters and counts through the Effect facade", () => {
    const { fetch, requests } = transport();
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

const draft = {
  id: "mdraft_7q2xk9mvt4znw8rh",
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
const draftFetch: typeof globalThis.fetch = async () => Response.json(draft);

describe("mailbox draft content revision", () => {
  it("preserves the revision through the Promise draft read", async () => {
    const client = createClient({ apiKey: "samva_sk_test", fetch: draftFetch });
    expect(
      await client.mailboxes.getDraft({ id: mailboxIds[0]!, draftId: draft.id }),
    ).toMatchObject({ revision: 7, text: "Saved content" });
  });

  it.effect("preserves the revision through the Effect draft read", () =>
    Effect.gen(function* () {
      expect(yield* Mailboxes.getDraft({ id: mailboxIds[0]!, draftId: draft.id })).toMatchObject({
        revision: 7,
        text: "Saved content",
      });
    }).pipe(
      Effect.provide(
        Layer.provide(
          Client.layer({ apiKey: "samva_sk_test" }),
          Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, draftFetch)),
        ),
      ),
    ),
  );
});
