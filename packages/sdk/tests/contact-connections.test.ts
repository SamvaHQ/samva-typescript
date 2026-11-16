import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer, Schema } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Accounts from "../src/effect/accounts";
import * as Client from "../src/effect/client";
import { ForbiddenError, IntegrationAccountId, SamvaApi } from "../src/effect/generated";
import { AccountsListContactConnections200 } from "../src/effect/generated/accounts";
import { createClient } from "../src/promises";
import { fakeSamvaApi } from "./support/fake-samva-api";

const accountId = Schema.decodeSync(IntegrationAccountId)("intgacct_1234567890abcdef");
const connection = {
  organizationId: "org_1234567890abcdef",
  integrationId: "intg_1234567890abcdef",
  contactId: "contact_1234567890abcdef",
  accountId,
  provider: "samva",
  info: {},
  lastUsedAt: "2026-11-15T00:00:00.000Z",
  idleExpiresAt: "2026-12-15T00:00:00.000Z",
  createdAt: "2026-11-14T00:00:00.000Z",
};

const provide = <A, E>(
  effect: Effect.Effect<A, E, Client.Service>,
  fetch: typeof globalThis.fetch,
) =>
  effect.pipe(
    Effect.provide(
      Layer.provide(
        Client.layer({ authToken: "owner-session", orgSlug: "acme" }),
        Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
      ),
    ),
  );

describe("contact connection owner transport parity", () => {
  it("sends the provider filter through Promise and Effect clients", async () => {
    const list = Schema.decodeSync(AccountsListContactConnections200)({ items: [connection] });
    const fake = fakeSamvaApi(SamvaApi)({
      Accounts: {
        accountsListContactConnections: ({ query }) => {
          expect(query.provider).toBe("samva");
          return Effect.succeed(list);
        },
      },
    });
    const client = createClient({ authToken: "owner-session", orgSlug: "acme", fetch: fake.fetch });
    expect(await client.accounts.listContactConnections({ provider: "samva" })).toEqual(list);
    expect(
      await Effect.runPromise(
        provide(Accounts.listContactConnections({ provider: "samva" }), fake.fetch),
      ),
    ).toEqual(list);
    fake.assertComplete();
    expect(fake.requests.map((request) => request.query)).toEqual([
      { provider: "samva" },
      { provider: "samva" },
    ]);
  });

  it("lists contact accounts and revokes the selected account through Promise and Effect clients", async () => {
    const list = Schema.decodeSync(AccountsListContactConnections200)({ items: [connection] });
    const removed = { id: accountId, deleted: true as const };
    const fake = fakeSamvaApi(SamvaApi)({
      Accounts: {
        accountsListContactConnections: () => Effect.succeed(list),
        accountsRemove: ({ params }) => {
          expect(params.accountId).toBe(accountId);
          return Effect.succeed(removed);
        },
      },
    });
    const client = createClient({ authToken: "owner-session", orgSlug: "acme", fetch: fake.fetch });
    expect(await client.accounts.listContactConnections()).toEqual(list);
    expect(await client.accounts.remove({ accountId })).toEqual(removed);
    expect(await Effect.runPromise(provide(Accounts.listContactConnections(), fake.fetch))).toEqual(
      list,
    );
    expect(await Effect.runPromise(provide(Accounts.remove({ accountId }), fake.fetch))).toEqual(
      removed,
    );
    fake.assertComplete();
    const expected = [
      { method: "GET", path: "/v1/accounts/contact-connections", body: undefined },
      { method: "DELETE", path: `/v1/accounts/${accountId}`, body: undefined },
    ];
    expect(fake.requests.map(({ method, path, body }) => ({ method, path, body }))).toEqual([
      ...expected,
      ...expected,
    ]);
    for (const request of fake.requests) {
      expect(request.headers.get("authorization")).toBe("Bearer owner-session");
      expect(request.headers.get("x-org-slug")).toBe("acme");
      expect(request.headers.has("x-api-key")).toBe(false);
    }
  });

  it("preserves an owner-authorization refusal in both clients", async () => {
    const body = {
      _tag: "ForbiddenError" as const,
      message: "An organization administrator is required",
    };
    const fake = fakeSamvaApi(SamvaApi)({
      Accounts: { accountsListContactConnections: () => Effect.fail(new ForbiddenError(body)) },
    });
    await expect(
      createClient({
        authToken: "owner-session",
        orgSlug: "acme",
        fetch: fake.fetch,
      }).accounts.listContactConnections(),
    ).rejects.toMatchObject(body);
    expect(
      await Effect.runPromise(
        provide(
          Accounts.listContactConnections().pipe(Effect.catchTag("ForbiddenError", Effect.succeed)),
          fake.fetch,
        ),
      ),
    ).toMatchObject(body);
    fake.assertComplete();
  });
});
