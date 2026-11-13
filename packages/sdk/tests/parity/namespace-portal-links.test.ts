import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer, Redacted, Schema } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../../src/effect/client";
import * as Api from "../../src/effect/generated";
import * as Namespaces from "../../src/effect/namespaces";
import { createClient } from "../../src/promises";
import { fakeSamvaApi } from "../support/fake-samva-api";

const id = "ns_aaaaaaaaaaaaaaaa";
const linkId = "npl_aaaaaaaaaaaaaaaa";
const link = {
  id: linkId,
  namespaceId: id,
  organizationId: "org_aaaaaaaaaaaaaaaa",
  createdBy: "user_aaaaaaaaaaaaaaaa",
  expiresAt: "2026-11-17T00:00:00.000Z",
  revokedAt: null,
  redirectUrl: "https://app.example.com/settings",
  metadata: { customer: "acme" },
  createdAt: "2026-11-10T00:00:00.000Z",
};

describe("namespace portal link facades", () => {
  it("keeps path ids out of create payloads and protects the URL on the Effect surface", async () => {
    const url = "https://portal.samva.dev/#token=private-token";
    const response = Schema.decodeSync(Api.NamespacesCreatePortalLink201)({ ...link, url });
    const api = fakeSamvaApi(Api.SamvaApi)({
      Namespaces: { namespacesCreatePortalLink: () => Effect.succeed(response) },
    });
    const { fetch } = api;
    const payload = { id, redirectUrl: link.redirectUrl, metadata: link.metadata, expiresIn: 3600 };
    const promise = createClient({ apiKey: "samva_sk_test", fetch });
    expect((await promise.namespaces.createPortalLink(payload)).url).toBe(url);
    const created = await Effect.runPromise(
      Namespaces.createPortalLink(payload).pipe(
        Effect.provide(
          Layer.provide(
            Client.layer({ apiKey: "samva_sk_test" }),
            Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
          ),
        ),
      ),
    );
    expect(Redacted.isRedacted(created.url)).toBe(true);
    expect(Redacted.value(created.url)).toBe(url);
    expect(api.requests.map(({ path, method, body }) => ({ path, method, body }))).toEqual(
      [0, 1].map(() => ({
        path: `/v1/namespaces/${id}/portal-links`,
        method: "POST",
        body: { redirectUrl: link.redirectUrl, metadata: link.metadata, expiresIn: 3600 },
      })),
    );
    api.assertComplete();
  });

  it("addresses listing and revocation identically on both facades", async () => {
    const page = Schema.decodeSync(Api.NamespacesListPortalLinks200)({
      items: [link],
      nextCursor: null,
    });
    const revoked = Schema.decodeSync(Api.NamespacesRevokePortalLink200)({
      ...link,
      revokedAt: link.createdAt,
    });
    const api = fakeSamvaApi(Api.SamvaApi)({
      Namespaces: {
        namespacesListPortalLinks: () => Effect.succeed(page),
        namespacesRevokePortalLink: () => Effect.succeed(revoked),
      },
    });
    const { fetch } = api;
    const promise = createClient({ apiKey: "samva_sk_test", fetch });
    const layer = Layer.provide(
      Client.layer({ apiKey: "samva_sk_test" }),
      Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
    );
    expect((await promise.namespaces.listPortalLinks({ id, limit: 5 })).items).toHaveLength(1);
    expect(
      (
        await Effect.runPromise(
          Namespaces.listPortalLinks({ id, limit: 5 }).pipe(Effect.provide(layer)),
        )
      ).items,
    ).toHaveLength(1);
    expect((await promise.namespaces.revokePortalLink({ id, linkId })).revokedAt).toBe(
      link.createdAt,
    );
    expect(
      (
        await Effect.runPromise(
          Namespaces.revokePortalLink({ id, linkId }).pipe(Effect.provide(layer)),
        )
      ).revokedAt,
    ).toBe(link.createdAt);
    expect(
      api.requests.map(({ path, method, query }) => ({
        path: query.limit ? `${path}?limit=${query.limit}` : path,
        method,
      })),
    ).toEqual([
      { path: `/v1/namespaces/${id}/portal-links?limit=5`, method: "GET" },
      { path: `/v1/namespaces/${id}/portal-links?limit=5`, method: "GET" },
      { path: `/v1/namespaces/${id}/portal-links/${linkId}`, method: "DELETE" },
      { path: `/v1/namespaces/${id}/portal-links/${linkId}`, method: "DELETE" },
    ]);
    api.assertComplete();
  });
});
