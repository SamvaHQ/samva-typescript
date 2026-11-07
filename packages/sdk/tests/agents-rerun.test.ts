import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Agents from "../src/effect/agents";
import * as Client from "../src/effect/client";
import { createClient, type AgentDefinition } from "../src/promises";

const id = "agt_1234567890123456";
const draft = {
  name: "Desk",
  definition: {
    instructions: "Answer routine questions.",
    knowledge: "",
    knowledgeSourceIds: [],
    endpointIds: [],
    integrations: [],
    policy: { presets: [], rules: [] },
    model: "standard",
    reasoning: "auto",
    workingHours: null,
    takeoverTimeoutMinutes: 30,
  } satisfies AgentDefinition,
};
const result = { items: [] };
const transport = () => {
  const requests: Array<{ method: string; path: string; body: unknown }> = [];
  const fetch: typeof globalThis.fetch = async (input, init) => {
    const request = new Request(input, init);
    requests.push({
      method: request.method,
      path: new URL(request.url).pathname,
      body: await request.json(),
    });
    return Response.json(result);
  };
  return { fetch, requests };
};
const expected = [{ method: "POST", path: `/v1/agents/${id}/tests/rerun`, body: draft }];

describe("agent test rerun facade transport", () => {
  it("sends the draft through the Promise facade", async () => {
    const { fetch, requests } = transport();
    expect(
      await createClient({ apiKey: "samva_sk_test", fetch }).agents.rerunTests({ id, ...draft }),
    ).toEqual(result);
    expect(requests).toEqual(expected);
  });
  it.effect("sends the same request through the focused Effect module", () => {
    const { fetch, requests } = transport();
    return Effect.gen(function* () {
      expect(yield* Agents.rerunTests({ id, ...draft })).toEqual(result);
      expect(requests).toEqual(expected);
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
