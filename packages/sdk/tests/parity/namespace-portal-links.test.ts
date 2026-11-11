import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer, Redacted } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../../src/effect/client";
import * as Namespaces from "../../src/effect/namespaces";
import { createClient } from "../../src/promises";

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
    const requests: Array<{ path: string; method: string; body: unknown }> = [];
    const url = "https://portal.samva.dev/#token=private-token";
    const fetch: typeof globalThis.fetch = async (input, init) => {
      const request = input instanceof Request ? input : new Request(input, init);
      requests.push({
        path: new URL(request.url).pathname,
        method: request.method,
        body: await request.json(),
      });
      return Response.json({ ...link, url }, { status: 201 });
    };
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
    expect(requests).toEqual(
      [0, 1].map(() => ({
        path: `/v1/namespaces/${id}/portal-links`,
        method: "POST",
        body: { redirectUrl: link.redirectUrl, metadata: link.metadata, expiresIn: 3600 },
      })),
    );
  });

  it("addresses listing and revocation identically on both facades", async () => {
    const requests: Array<{ path: string; method: string }> = [];
    const fetch: typeof globalThis.fetch = async (input, init) => {
      const request = input instanceof Request ? input : new Request(input, init);
      const parsed = new URL(request.url);
      requests.push({ path: parsed.pathname + parsed.search, method: request.method });
      return Response.json(
        request.method === "DELETE"
          ? { ...link, revokedAt: link.createdAt }
          : { items: [link], nextCursor: null },
      );
    };
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
    expect(requests).toEqual([
      { path: `/v1/namespaces/${id}/portal-links?limit=5`, method: "GET" },
      { path: `/v1/namespaces/${id}/portal-links?limit=5`, method: "GET" },
      { path: `/v1/namespaces/${id}/portal-links/${linkId}`, method: "DELETE" },
      { path: `/v1/namespaces/${id}/portal-links/${linkId}`, method: "DELETE" },
    ]);
  });
});
