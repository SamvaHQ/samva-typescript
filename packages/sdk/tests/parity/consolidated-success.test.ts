import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer, Schema } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Agents from "../../src/effect/agents";
import * as Client from "../../src/effect/client";
import * as Contacts from "../../src/effect/contacts";
import * as Api from "../../src/effect/generated";
import * as Journeys from "../../src/effect/journeys";
import * as Newsletters from "../../src/effect/newsletters";
import {
  createClient,
  type AgentDefinition,
  type JourneyDefinitionWritable,
} from "../../src/promises";
import { fakeSamvaApi } from "../support/fake-samva-api";

const agentId = "agt_1234567890123456";
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
const journeyId = "jrny_7q2xk9mvt4znw8rh";
const definition = {
  trigger: { type: "contact.created" },
  rootNodeId: "done",
  nodes: { done: { type: "exit", config: {}, next: [] } },
} satisfies JourneyDefinitionWritable;
const journey = Schema.decodeSync(Api.JourneysReplaceDraft200)({
  id: journeyId,
  name: "Welcome",
  status: "draft",
  revision: "rev-1",
  draft: definition,
  publishedVersion: null,
  publishedAt: null,
  createdAt: "2026-10-13T00:00:00.000Z",
  updatedAt: "2026-10-13T00:00:00.000Z",
});
const newsletterId = "nl_1234567890abcdef";
const newsletter = Schema.decodeSync(Api.NewslettersCreate201)({
  id: newsletterId,
  topicId: "tpc_1234567890abcdef",
  namespaceId: null,
  name: "Weekly",
  description: null,
  issueProjectId: null,
  archiveEnabled: false,
  publicationSlug: null,
  createdAt: "2026-10-28T00:00:00.000Z",
  updatedAt: "2026-10-28T00:00:00.000Z",
});

describe("successful facade response parity", () => {
  it("returns agent rerun results after sending the draft on both clients", async () => {
    const result = { items: [] };
    const api = fakeSamvaApi(Api.SamvaApi)({
      Agents: { agentsRerunTests: () => Effect.succeed(result) },
    });
    const promise = createClient({ apiKey: "samva_sk_test", fetch: api.fetch });
    expect(await promise.agents.rerunTests({ id: agentId, ...draft })).toEqual(result);
    expect(
      await Effect.runPromise(
        Agents.rerunTests({ id: agentId, ...draft }).pipe(
          Effect.provide(
            Layer.provide(
              Client.layer({ apiKey: "samva_sk_test" }),
              Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, api.fetch)),
            ),
          ),
        ),
      ),
    ).toEqual(result);
    expect(api.requests.map(({ method, path, body }) => ({ method, path, body }))).toEqual(
      [0, 1].map(() => ({
        method: "POST",
        path: `/v1/agents/${agentId}/tests/rerun`,
        body: draft,
      })),
    );
    api.assertComplete();
  });

  it("returns journeys after revision writes and lifecycle changes on both clients", async () => {
    const runs = { items: [], nextCursor: null };
    const api = fakeSamvaApi(Api.SamvaApi)({
      Journeys: {
        journeysReplaceDraft: () => Effect.succeed(journey),
        journeysPublish: () => Effect.succeed(journey),
        journeysPause: () => Effect.succeed(journey),
        journeysResume: () => Effect.succeed(journey),
        journeysArchive: () => Effect.succeed(journey),
        journeysListRuns: () => Effect.succeed(runs),
      },
    });
    const promise = createClient({ apiKey: "samva_sk_test", fetch: api.fetch });
    expect(
      await promise.journeys.replaceDraft({ id: journeyId, revision: "rev-1", definition }),
    ).toEqual(journey);
    for (const revision of ["rev-2", "rev-3"]) {
      expect(await promise.journeys.publish({ id: journeyId, revision })).toEqual(journey);
    }
    expect(await promise.journeys.pause({ id: journeyId })).toEqual(journey);
    expect(await promise.journeys.resume({ id: journeyId })).toEqual(journey);
    expect(await promise.journeys.archive({ id: journeyId })).toEqual(journey);
    expect(await promise.journeys.listRuns({ id: journeyId, status: "active", limit: 25 })).toEqual(
      runs,
    );
    await Effect.runPromise(
      Effect.gen(function* () {
        expect(
          yield* Journeys.replaceDraft({ id: journeyId, revision: "rev-1", definition }),
        ).toEqual(journey);
        for (const revision of ["rev-2", "rev-3"]) {
          expect(yield* Journeys.publish({ id: journeyId, revision })).toEqual(journey);
        }
        expect(yield* Journeys.pause({ id: journeyId })).toEqual(journey);
        expect(yield* Journeys.resume({ id: journeyId })).toEqual(journey);
        expect(yield* Journeys.archive({ id: journeyId })).toEqual(journey);
        expect(yield* Journeys.listRuns({ id: journeyId, status: "active", limit: 25 })).toEqual(
          runs,
        );
      }).pipe(
        Effect.provide(
          Layer.provide(
            Client.layer({ apiKey: "samva_sk_test" }),
            Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, api.fetch)),
          ),
        ),
      ),
    );
    const expected = [
      {
        method: "PUT",
        path: `/v1/journeys/${journeyId}/draft`,
        body: { revision: "rev-1", definition },
        query: {},
      },
      ...["rev-2", "rev-3"].map((revision) => ({
        method: "POST",
        path: `/v1/journeys/${journeyId}/publish`,
        body: { revision },
        query: {},
      })),
      ...["pause", "resume", "archive"].map((operation) => ({
        method: "POST",
        path: `/v1/journeys/${journeyId}/${operation}`,
        body: undefined,
        query: {},
      })),
      {
        method: "GET",
        path: `/v1/journeys/${journeyId}/runs`,
        body: undefined,
        query: { status: "active", limit: "25" },
      },
    ];
    expect(
      api.requests.map(({ method, path, body, query }) => ({ method, path, body, query })),
    ).toEqual([...expected, ...expected]);
    api.assertComplete();
  });

  it("returns newsletter mutation results with header-only idempotency on both clients", async () => {
    const deleted = { success: true };
    const api = fakeSamvaApi(Api.SamvaApi)({
      Newsletters: {
        newslettersCreate: () => Effect.succeed(newsletter),
        newslettersUpdate: () => Effect.succeed(newsletter),
        newslettersRemove: () => Effect.succeed(deleted),
      },
    });
    const promise = createClient({ apiKey: "samva_sk_test", fetch: api.fetch });
    expect(
      await promise.newsletters.create({ name: "Weekly" }, { idempotencyKey: "create" }),
    ).toEqual(newsletter);
    expect(
      await promise.newsletters.update(
        { id: newsletterId, archiveEnabled: true, publicationSlug: "weekly" },
        { idempotencyKey: "update" },
      ),
    ).toEqual(newsletter);
    expect(
      await promise.newsletters.remove({ id: newsletterId }, { idempotencyKey: "delete" }),
    ).toEqual(deleted);
    await Effect.runPromise(
      Effect.gen(function* () {
        expect(yield* Newsletters.create({ name: "Weekly" }, { idempotencyKey: "create" })).toEqual(
          newsletter,
        );
        expect(
          yield* Newsletters.update(
            { id: newsletterId, archiveEnabled: true, publicationSlug: "weekly" },
            { idempotencyKey: "update" },
          ),
        ).toEqual(newsletter);
        expect(
          yield* Newsletters.remove({ id: newsletterId }, { idempotencyKey: "delete" }),
        ).toEqual(deleted);
      }).pipe(
        Effect.provide(
          Layer.provide(
            Client.layer({ apiKey: "samva_sk_test" }),
            Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, api.fetch)),
          ),
        ),
      ),
    );
    const expected = [
      { method: "POST", path: "/v1/newsletters", key: "create", body: { name: "Weekly" } },
      {
        method: "PATCH",
        path: `/v1/newsletters/${newsletterId}`,
        key: "update",
        body: { archiveEnabled: true, publicationSlug: "weekly" },
      },
      { method: "DELETE", path: `/v1/newsletters/${newsletterId}`, key: "delete", body: undefined },
    ];
    expect(
      api.requests.map(({ method, path, headers, body }) => ({
        method,
        path,
        key: headers.get("idempotency-key"),
        body,
      })),
    ).toEqual([...expected, ...expected]);
    api.assertComplete();
  });

  it("returns the contact event page through the contacts namespace on both clients", async () => {
    const page = { items: [], nextCursor: null };
    const api = fakeSamvaApi(Api.SamvaApi)({
      "Contact events": { contactEventsListEvents: () => Effect.succeed(page) },
    });
    const query = { id: "contact_7q2xk9mvt4znw8rh", limit: 25, cursor: "resume-here" };
    const promise = createClient({ apiKey: "samva_sk_test", fetch: api.fetch });
    expect(await promise.contacts.listEvents(query)).toEqual(page);
    expect(
      await Effect.runPromise(
        Contacts.listEvents(query).pipe(
          Effect.provide(
            Layer.provide(
              Client.layer({ apiKey: "samva_sk_test" }),
              Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, api.fetch)),
            ),
          ),
        ),
      ),
    ).toEqual(page);
    expect(
      api.requests.map(({ method, path, query: parameters }) => ({
        method,
        path,
        query: parameters,
      })),
    ).toEqual(
      [0, 1].map(() => ({
        method: "GET",
        path: `/v1/contacts/${query.id}/events`,
        query: { limit: "25", cursor: "resume-here" },
      })),
    );
    api.assertComplete();
  });
});
