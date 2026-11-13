import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer, Schema } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import { SamvaApi, TopicId } from "../src/effect/generated";
import * as Topics from "../src/effect/topics";
import { createClient } from "../src/promises";
import { fakeSamvaApi } from "./support/fake-samva-api";

const id = "tpc_1234567890abcdef";
const topic = {
  id: Schema.decodeSync(TopicId)(id),
  namespaceId: null,
  name: "Newsletter",
  description: null,
  default: "opt_out" as const,
  isDefault: false,
  defaultSenderId: null,
  replyMailboxId: null,
  templateId: null,
  createdAt: "2026-10-25T00:00:00.000Z",
  updatedAt: "2026-10-25T00:00:00.000Z",
};

describe("topic subscription counts", () => {
  it.each([
    { subscribed: 0, unsubscribed: 0 },
    { subscribed: 7, unsubscribed: 2 },
  ])("preserves explicit email counts %j through both clients", async (counts) => {
    const response = {
      ...topic,
      subscriptions: {
        email: counts,
        sms: { subscribed: 0, unsubscribed: 0 },
        whatsapp: { subscribed: 0, unsubscribed: 0 },
      },
    };
    const fake = fakeSamvaApi(SamvaApi)({
      Topics: {
        topicsList: () => Effect.succeed({ items: [response] }),
        topicsGet: () => Effect.succeed(response),
      },
    });
    const { fetch } = fake;
    const promise = createClient({ apiKey: "samva_sk_test", fetch });
    expect((await promise.topics.list()).items[0]?.subscriptions.email).toEqual(counts);
    expect((await promise.topics.get({ id })).subscriptions.email).toEqual(counts);

    const effect = await Effect.runPromise(
      Effect.gen(function* () {
        return { listed: yield* Topics.list(), read: yield* Topics.get({ id }) };
      }).pipe(
        Effect.provide(
          Layer.provide(
            Client.layer({ apiKey: "samva_sk_test" }),
            Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
          ),
        ),
      ),
    );
    expect(effect.listed.items[0]?.subscriptions.email).toEqual(counts);
    expect(effect.read.subscriptions.email).toEqual(counts);
    fake.assertComplete();
    expect(fake.requests.map((request) => request.path)).toEqual([
      "/v1/topics",
      `/v1/topics/${id}`,
      "/v1/topics",
      `/v1/topics/${id}`,
    ]);
  });
});
