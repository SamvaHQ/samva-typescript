import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import * as Newsletters from "../src/effect/newsletters";
import { createClient } from "../src/promises";
const id = "nl_1234567890abcdef";
const row = {
  id,
  topicId: "unsub_1234567890abcdef",
  namespaceId: null,
  name: "Weekly",
  description: null,
  issueProjectId: null,
  archiveEnabled: false,
  publicationSlug: null,
  createdAt: "2026-10-28T00:00:00.000Z",
  updatedAt: "2026-10-28T00:00:00.000Z",
};
describe("newsletter resource transport parity", () => {
  it("sends CRUD mutations through the new resource with header-only idempotency", async () => {
    const requests: Array<{ method: string; path: string; key: string | null; body: unknown }> = [];
    const fetch: typeof globalThis.fetch = async (input, init) => {
      const request = input instanceof Request ? input : new Request(input, init);
      const text = await request.text();
      requests.push({
        method: request.method,
        path: new URL(request.url).pathname,
        key: request.headers.get("idempotency-key"),
        body: text ? JSON.parse(text) : undefined,
      });
      return Response.json(request.method === "DELETE" ? { success: true } : row, {
        status: request.method === "POST" ? 201 : 200,
      });
    };
    const client = createClient({ apiKey: "samva_sk_test", fetch });
    await client.newsletters.create({ name: "Weekly" }, { idempotencyKey: "create" });
    await client.newsletters.update(
      { id, archiveEnabled: true, publicationSlug: "weekly" },
      { idempotencyKey: "update" },
    );
    await client.newsletters.remove({ id }, { idempotencyKey: "delete" });
    const layer = Client.layer({ apiKey: "samva_sk_test" }).pipe(
      Layer.provide(
        FetchHttpClient.layer.pipe(Layer.provide(Layer.succeed(FetchHttpClient.Fetch, fetch))),
      ),
    );
    await Effect.runPromise(
      Effect.gen(function* () {
        yield* Newsletters.create({ name: "Weekly" }, { idempotencyKey: "create" });
        yield* Newsletters.update(
          { id, archiveEnabled: true, publicationSlug: "weekly" },
          { idempotencyKey: "update" },
        );
        yield* Newsletters.remove({ id }, { idempotencyKey: "delete" });
      }).pipe(Effect.provide(layer)),
    );
    const expected = [
      { method: "POST", path: "/v1/newsletters", key: "create", body: { name: "Weekly" } },
      {
        method: "PATCH",
        path: `/v1/newsletters/${id}`,
        key: "update",
        body: { archiveEnabled: true, publicationSlug: "weekly" },
      },
      { method: "DELETE", path: `/v1/newsletters/${id}`, key: "delete", body: undefined },
    ];
    expect(requests).toEqual([...expected, ...expected]);
  });
});
