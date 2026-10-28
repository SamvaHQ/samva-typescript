import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import * as NewsletterDomains from "../src/effect/newsletter-domains";
import { createClient, type SamvaClient } from "../src/promises";

const id = "nl_1234567890abcdef";
const hostname = "news.example.com";
const idempotencyKey = "be85c605-d10d-4a62-86b5-e0df9c92261e";
const snapshot = {
  organizationId: "org_1234567890abcdef",
  topicId: "unsub_1234567890abcdef",
  hostname,
  canonicalHostname: "weekly-digest.samva.app",
  phase: "pending",
  active: false,
  hostnameStatus: "pending",
  sslStatus: "pending_validation",
  cname: { type: "CNAME", name: hostname, value: "origin.samva.app" },
  verificationRecords: [{ type: "TXT", name: `_verify.${hostname}`, value: "verify-domain" }],
  verificationErrors: [],
};

type Cell = {
  readonly name: string;
  readonly method: string;
  readonly suffix: string;
  readonly query?: Readonly<Record<string, string>>;
  readonly body?: unknown;
  readonly response?: unknown;
  readonly promise: (client: SamvaClient) => Promise<unknown>;
  readonly effect: () => Effect.Effect<unknown, unknown, Client.Service>;
};

const cells = [
  {
    name: "list",
    method: "GET",
    suffix: "",
    query: { limit: "2", cursor: "bmV3cy5leGFtcGxlLmNvbQ" },
    response: { items: [snapshot], nextCursor: null },
    promise: (client) =>
      client.newsletters.domains.list({ id, limit: 2, cursor: "bmV3cy5leGFtcGxlLmNvbQ" }),
    effect: () => NewsletterDomains.list({ id, limit: 2, cursor: "bmV3cy5leGFtcGxlLmNvbQ" }),
  },
  {
    name: "add",
    method: "POST",
    suffix: "",
    body: { hostname },
    promise: (client) => client.newsletters.domains.add({ id, hostname }, { idempotencyKey }),
    effect: () => NewsletterDomains.add({ id, hostname }, { idempotencyKey }),
  },
  {
    name: "get",
    method: "GET",
    suffix: `/${hostname}`,
    promise: (client) => client.newsletters.domains.get({ id, hostname }),
    effect: () => NewsletterDomains.get({ id, hostname }),
  },
  {
    name: "remove",
    method: "DELETE",
    suffix: `/${hostname}`,
    promise: (client) => client.newsletters.domains.remove({ id, hostname }, { idempotencyKey }),
    effect: () => NewsletterDomains.remove({ id, hostname }, { idempotencyKey }),
  },
] satisfies ReadonlyArray<Cell>;

const provide = <A, E>(
  effect: Effect.Effect<A, E, Client.Service>,
  fetch: typeof globalThis.fetch,
) =>
  effect.pipe(
    Effect.provide(
      Layer.provide(
        Client.layer({ apiKey: "samva_sk_test" }),
        Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
      ),
    ),
  );

describe("publication domains transport parity", () => {
  it.each(cells)(
    "$name preserves parameters and DNS verification in both clients",
    async (cell: Cell) => {
      const requests: Array<unknown> = [];
      const fetch: typeof globalThis.fetch = async (input, init) => {
        const request = input instanceof Request ? input : new Request(input, init);
        const url = new URL(request.url);
        const body = await request.text();
        requests.push({
          method: request.method,
          path: url.pathname,
          query: Object.fromEntries(url.searchParams),
          body: body === "" ? undefined : JSON.parse(body),
          apiKey: request.headers.get("x-api-key"),
          "idempotency-key": request.headers.get("idempotency-key"),
        });
        return Response.json(cell.response ?? snapshot);
      };
      expect(await cell.promise(createClient({ apiKey: "samva_sk_test", fetch }))).toEqual(
        cell.response ?? snapshot,
      );
      expect(await Effect.runPromise(provide(cell.effect(), fetch))).toEqual(
        cell.response ?? snapshot,
      );
      expect(requests).toEqual(
        Array.from({ length: 2 }, () => ({
          method: cell.method,
          path: `/v1/newsletters/${id}/domains${cell.suffix}`,
          query: cell.query ?? {},
          body: cell.body,
          apiKey: "samva_sk_test",
          "idempotency-key": cell.method === "GET" ? null : idempotencyKey,
        })),
      );
    },
  );

  it("preserves the Preview access error in both clients", async () => {
    const body = {
      _tag: "FlagDisabledError",
      flag: "newsletters",
      message: "Publication is unavailable",
    };
    const fetch = async () => Response.json(body, { status: 403 });
    await expect(
      createClient({ apiKey: "samva_sk_test", fetch }).newsletters.domains.add(
        { id, hostname },
        { idempotencyKey },
      ),
    ).rejects.toMatchObject(body);
    expect(
      await Effect.runPromise(
        provide(
          NewsletterDomains.add({ id, hostname }, { idempotencyKey }).pipe(
            Effect.catchTag("FlagDisabledError", Effect.succeed),
          ),
          fetch,
        ),
      ),
    ).toMatchObject(body);
  });
});
