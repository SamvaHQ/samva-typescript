import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import * as TopicPublicationDomains from "../src/effect/publication-domains";
import { createClient, type SamvaClient } from "../src/promises";

const id = "unsub_1234567890abcdef";
const hostname = "news.example.com";
const idempotencyKey = "be85c605-d10d-4a62-86b5-e0df9c92261e";
const snapshot = {
  organizationId: "org_1234567890abcdef",
  topicId: id,
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
  readonly promise: (client: SamvaClient) => Promise<unknown>;
  readonly effect: () => Effect.Effect<unknown, unknown, Client.Service>;
};

const cells = [
  {
    name: "add",
    method: "POST",
    suffix: "",
    body: { hostname, idempotencyKey },
    promise: (client) => client.topicPublicationDomains.add({ id, hostname, idempotencyKey }),
    effect: () => TopicPublicationDomains.add({ id, hostname, idempotencyKey }),
  },
  {
    name: "get",
    method: "GET",
    suffix: `/${hostname}`,
    promise: (client) => client.topicPublicationDomains.get({ id, hostname }),
    effect: () => TopicPublicationDomains.get({ id, hostname }),
  },
  {
    name: "remove",
    method: "DELETE",
    suffix: `/${hostname}`,
    query: { idempotencyKey },
    promise: (client) => client.topicPublicationDomains.remove({ id, hostname, idempotencyKey }),
    effect: () => TopicPublicationDomains.remove({ id, hostname, idempotencyKey }),
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
          idempotencyKey: request.headers.get("idempotency-key"),
        });
        return Response.json(snapshot);
      };
      expect(await cell.promise(createClient({ apiKey: "samva_sk_test", fetch }))).toEqual(
        snapshot,
      );
      expect(await Effect.runPromise(provide(cell.effect(), fetch))).toEqual(snapshot);
      expect(requests).toEqual(
        Array.from({ length: 2 }, () => ({
          method: cell.method,
          path: `/v1/topics/${id}/publication/domains${cell.suffix}`,
          query: cell.query ?? {},
          body: cell.body,
          apiKey: "samva_sk_test",
          idempotencyKey: null,
        })),
      );
    },
  );

  it("preserves the Preview access error in both clients", async () => {
    const body = {
      _tag: "FlagDisabledError",
      flag: "issueWeb",
      message: "Publication is unavailable",
    };
    const fetch = async () => Response.json(body, { status: 403 });
    await expect(
      createClient({ apiKey: "samva_sk_test", fetch }).topicPublicationDomains.add({
        id,
        hostname,
        idempotencyKey,
      }),
    ).rejects.toMatchObject(body);
    expect(
      await Effect.runPromise(
        provide(
          TopicPublicationDomains.add({ id, hostname, idempotencyKey }).pipe(
            Effect.catchTag("FlagDisabledError", Effect.succeed),
          ),
          fetch,
        ),
      ),
    ).toMatchObject(body);
  });
});
