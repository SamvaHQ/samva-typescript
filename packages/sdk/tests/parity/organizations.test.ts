import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer, Schema } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../../src/effect/client";
import * as Api from "../../src/effect/generated";
import * as Organizations from "../../src/effect/organizations";
import { createClient } from "../../src/promises";
import { fakeSamvaApi } from "../support/fake-samva-api";

const organization = Schema.decodeSync(Api.OrganizationsGet200)({
  id: "org_test",
  billingAccountId: "billing_test",
  name: "Test Organization",
  slug: "test-organization",
  avatarUrl: null,
  defaultRegion: "US",
  timezone: "UTC",
  plan: "launch",
  isActive: true,
  createdAt: "2026-07-12T00:00:00.000Z",
  updatedAt: "2026-07-12T00:00:00.000Z",
  metadata: null,
  replyToDefault: null,
  emailFooterEnabledDefault: null,
  messagesUsed: 0,
  messagesUsedThisMonth: 0,
  smsUsed: 0,
  smsUsedThisMonth: 0,
  whatsappUsed: 0,
  whatsappUsedThisMonth: 0,
  emailUsed: 0,
  emailUsedThisMonth: 0,
  contactsUsed: 0,
  conversationsUsed: 0,
  teamMembersUsed: 0,
  messagesResetAt: null,
});

const runEffectGet = (fetch: typeof globalThis.fetch) =>
  Effect.runPromise(
    Organizations.get().pipe(
      Effect.provide(
        Layer.provide(
          Client.layer({ apiKey: "samva_sk_test" }),
          Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
        ),
      ),
    ),
  );

describe("organization facade behavior", () => {
  it("exposes the minimal profile through both public clients", async () => {
    const profile = Schema.decodeSync(Api.OrganizationsGetProfile200)({
      id: "mem_test",
      name: "Ada",
      nickname: "Ada (Acme)",
    });
    const api = fakeSamvaApi(Api.SamvaApi)({
      Organizations: { organizationsGetProfile: () => Effect.succeed(profile) },
    });
    const { fetch } = api;
    const promise = createClient({ apiKey: "samva_sk_test", fetch });
    expect(await promise.organizations.getProfile()).toEqual(profile);
    expect(
      await Effect.runPromise(
        Organizations.getProfile().pipe(
          Effect.provide(
            Layer.provide(
              Client.layer({ apiKey: "samva_sk_test" }),
              Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
            ),
          ),
        ),
      ),
    ).toEqual(profile);
    expect(api.requests.map(({ path }) => path)).toEqual([
      "/v1/organizations/current/profile",
      "/v1/organizations/current/profile",
    ]);
    api.assertComplete();
  });
  it("carries the member namespace through both invitation clients and address options", async () => {
    const payload = {
      email: "ada@example.com",
      role: "member",
      namespaceId: "ns_7q2xk9mvt4znw8rh",
      mailboxAddress: "ada@customer.example",
    } as const;
    const invitation = Schema.decodeSync(Api.OrganizationsInviteMember200)({
      ...payload,
      id: "inv_7q2xk9mvt4znw8rh",
      status: "pending",
    });
    const options = Schema.decodeSync(Api.OrganizationsGetPersonalMailboxAddressOptions200)({
      domains: ["customer.example"],
      defaultDomain: "customer.example",
    });
    const api = fakeSamvaApi(Api.SamvaApi)({
      Organizations: {
        organizationsInviteMember: () => Effect.succeed(invitation),
        organizationsGetPersonalMailboxAddressOptions: () => Effect.succeed(options),
      },
    });
    const { fetch } = api;
    const promise = createClient({ authToken: "session-token", orgSlug: "acme", fetch });
    const layer = Layer.provide(
      Client.layer({ authToken: "session-token", orgSlug: "acme" }),
      Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
    );
    expect(await promise.organizations.inviteMember(payload)).toEqual(invitation);
    expect(
      await Effect.runPromise(Organizations.inviteMember(payload).pipe(Effect.provide(layer))),
    ).toEqual(invitation);
    await promise.organizations.getPersonalMailboxAddressOptions({
      namespaceId: payload.namespaceId,
    });
    await Effect.runPromise(
      Organizations.getPersonalMailboxAddressOptions({ namespaceId: payload.namespaceId }).pipe(
        Effect.provide(layer),
      ),
    );
    expect(
      api.requests.map(({ path, query, body }) => ({
        path: query.namespaceId ? `${path}?namespaceId=${query.namespaceId}` : path,
        body: body ?? null,
      })),
    ).toEqual([
      { path: "/v1/organizations/members/invitations", body: payload },
      { path: "/v1/organizations/members/invitations", body: payload },
      {
        path: `/v1/organizations/personal-mailboxes/address-options?namespaceId=${payload.namespaceId}`,
        body: null,
      },
      {
        path: `/v1/organizations/personal-mailboxes/address-options?namespaceId=${payload.namespaceId}`,
        body: null,
      },
    ]);
    api.assertComplete();
  });
  it("assigns and reads personal mailbox management through both public clients", async () => {
    const userId = "user_7q2xk9mvt4znw8rh";
    const mailboxId = "mbx_7q2xk9mvt4znw8rh";
    const mailboxAddress = "ada@example.com";
    const assignmentPath = `/v1/organizations/members/${userId}/personal-mailbox`;
    const assignmentsPath = "/v1/organizations/personal-mailboxes/assignments";
    const optionsPath = "/v1/organizations/personal-mailboxes/address-options";
    const assignment = Schema.decodeSync(Api.OrganizationsAssignPersonalMailbox200)({ mailboxId });
    const assignments = Schema.decodeSync(Api.OrganizationsListPersonalMailboxAssignments200)({
      items: [{ userId }],
    });
    const options = Schema.decodeSync(Api.OrganizationsGetPersonalMailboxAddressOptions200)({
      domains: ["example.com"],
      defaultDomain: "example.com",
    });
    const api = fakeSamvaApi(Api.SamvaApi)({
      Organizations: {
        organizationsAssignPersonalMailbox: () => Effect.succeed(assignment),
        organizationsListPersonalMailboxAssignments: () => Effect.succeed(assignments),
        organizationsGetPersonalMailboxAddressOptions: () => Effect.succeed(options),
      },
    });
    const { fetch } = api;
    const promise = createClient({ apiKey: "samva_sk_test", fetch });
    expect(await promise.organizations.assignPersonalMailbox({ userId, mailboxAddress })).toEqual({
      mailboxId,
    });
    expect(await promise.organizations.listPersonalMailboxAssignments()).toEqual({
      items: [{ userId }],
    });
    expect(await promise.organizations.getPersonalMailboxAddressOptions()).toEqual(options);
    const layer = Layer.provide(
      Client.layer({ apiKey: "samva_sk_test" }),
      Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
    );
    expect(
      await Effect.runPromise(
        Organizations.assignPersonalMailbox({ userId, mailboxAddress }).pipe(Effect.provide(layer)),
      ),
    ).toEqual({ mailboxId });
    expect(
      await Effect.runPromise(
        Organizations.listPersonalMailboxAssignments().pipe(Effect.provide(layer)),
      ),
    ).toEqual({ items: [{ userId }] });
    expect(
      await Effect.runPromise(
        Organizations.getPersonalMailboxAddressOptions().pipe(Effect.provide(layer)),
      ),
    ).toEqual(options);
    const expected = [
      { method: "POST", path: assignmentPath, body: { mailboxAddress } },
      { method: "GET", path: assignmentsPath, body: undefined },
      { method: "GET", path: optionsPath, body: undefined },
    ];
    expect(api.requests.map(({ method, path, body }) => ({ method, path, body }))).toEqual([
      ...expected,
      ...expected,
    ]);
    api.assertComplete();
  });

  it("decodes success into Effect-native domain values", async () => {
    const api = fakeSamvaApi(Api.SamvaApi)({
      Organizations: { organizationsGet: () => Effect.succeed(organization) },
    });
    const { fetch } = api;
    const effectResult = await runEffectGet(fetch);

    // Unannotated timestamps remain wire strings on the Effect projection.
    expect(effectResult.id).toBe("org_test");
    expect(effectResult.slug).toBe("test-organization");
    expect(effectResult.createdAt).toBe("2026-07-12T00:00:00.000Z");
    expect(effectResult.updatedAt).toBe("2026-07-12T00:00:00.000Z");
    expect(api.requests).toHaveLength(1);
    api.assertComplete();
  });

  it("fails with the server's real tagged error, catchable by Effect.catchTag", async () => {
    const unauthorized = Schema.decodeSync(Api.UnauthorizedError)({
      _tag: "UnauthorizedError",
      message: "Invalid API key",
    });
    const api = fakeSamvaApi(Api.SamvaApi)({
      Organizations: { organizationsGet: () => Effect.fail(unauthorized) },
    });
    const { fetch } = api;

    // The error carries the server's semantic tag directly — no per-status
    // wrapper (`OrganizationsGet401`) — so `catchTag("UnauthorizedError")`
    // handles it without enumerating status codes.
    const handled = await Effect.runPromise(
      Organizations.get().pipe(
        Effect.provide(Client.layer({ apiKey: "samva_sk_test" })),
        Effect.catchTag("UnauthorizedError", (error) => Effect.succeed(error.message)),
        Effect.provide(
          Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
        ),
      ),
    );

    expect(handled).toBe("Invalid API key");
    expect(api.requests).toHaveLength(1);
    api.assertComplete();
  });
});
