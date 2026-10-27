import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import * as Journeys from "../src/effect/journeys";
import { createClient, type JourneyDefinitionWritable } from "../src/promises";

const id = "jrny_7q2xk9mvt4znw8rh";
const AT = "2026-10-13T00:00:00.000Z";
const definition: JourneyDefinitionWritable = {
  trigger: { type: "contact.created" },
  rootNodeId: "done",
  nodes: { done: { type: "exit", config: {}, next: [] } },
};
const journey = {
  id,
  name: "Welcome",
  status: "draft",
  revision: "rev-1",
  draft: definition,
  publishedVersion: null,
  publishedAt: null,
  createdAt: AT,
  updatedAt: AT,
};

const recorder = () => {
  const requests: Array<{ method: string; url: URL; body: unknown }> = [];
  const fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = input instanceof Request ? input : new Request(input, init);
    const text = await request.clone().text();
    requests.push({
      method: request.method,
      url: new URL(request.url),
      body: text ? JSON.parse(text) : null,
    });
    return new Response(JSON.stringify(journey), {
      headers: { "content-type": "application/json" },
    });
  };
  return { requests, fetch };
};

describe("journeys facade", () => {
  it("sends the revision the caller read on replaceDraft and publish, on both clients", async () => {
    const { requests, fetch } = recorder();
    const promise = createClient({ apiKey: "samva_sk_test", fetch });
    await promise.journeys.replaceDraft({ id, revision: "rev-1", definition });
    await promise.journeys.publish({ id, revision: "rev-2" });
    await Effect.runPromise(
      Journeys.publish({ id, revision: "rev-3" }).pipe(
        Effect.provide(
          Layer.provide(
            Client.layer({ apiKey: "samva_sk_test" }),
            Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
          ),
        ),
      ),
    );
    expect(requests.map(({ method, url, body }) => [method, url.pathname, body])).toEqual([
      ["PUT", `/v1/journeys/${id}/draft`, { revision: "rev-1", definition }],
      ["POST", `/v1/journeys/${id}/publish`, { revision: "rev-2" }],
      ["POST", `/v1/journeys/${id}/publish`, { revision: "rev-3" }],
    ]);
  });

  it("addresses lifecycle and run reads by path and query", async () => {
    const { requests, fetch } = recorder();
    const promise = createClient({ apiKey: "samva_sk_test", fetch });
    await promise.journeys.pause({ id });
    await promise.journeys.resume({ id });
    await promise.journeys.archive({ id });
    await promise.journeys.listRuns({ id, status: "active", limit: 25 }).catch(() => undefined);
    expect(requests.map(({ method, url }) => `${method} ${url.pathname}${url.search}`)).toEqual([
      `POST /v1/journeys/${id}/pause`,
      `POST /v1/journeys/${id}/resume`,
      `POST /v1/journeys/${id}/archive`,
      `GET /v1/journeys/${id}/runs?status=active&limit=25`,
    ]);
  });
});
