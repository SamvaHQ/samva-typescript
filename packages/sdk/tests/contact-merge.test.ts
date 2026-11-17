import { expect, it } from "@effect/vitest";
import { Effect, Layer, Schema } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import * as Contacts from "../src/effect/contacts";
import { SamvaApi } from "../src/effect/generated";
import { ContactsMerge200 } from "../src/effect/generated/contacts";
import { createClient } from "../src/promises";
import { fakeSamvaApi } from "./support/fake-samva-api";

const id = "contact_1234567890abcdef";
const from = "contact_abcdef1234567890";
const wire = {
  id,
  namespaceId: null,
  name: "Ada",
  displayName: null,
  avatar: null,
  status: "active",
  statusReason: null,
  externalId: null,
  identities: [],
  profile: null,
  preferences: null,
  tags: [],
  metadata: null,
  importProvenance: null,
  addedAt: null,
  createdAt: "2026-11-17T00:00:00Z",
  updatedAt: "2026-11-17T00:00:00Z",
};

it("merges through Promise and Effect without requiring an optional admission header", async () => {
  const contact = Schema.decodeUnknownSync(ContactsMerge200)(wire);
  const fake = fakeSamvaApi(SamvaApi)({
    Contacts: {
      contactsMerge: ({ params, payload }) => {
        expect(params.id).toBe(id);
        expect(payload).toEqual({ from });
        return Effect.succeed(contact);
      },
    },
  });
  const client = createClient({ apiKey: "test-key", fetch: fake.fetch });
  expect(await client.contacts.merge({ id, from })).toEqual(contact);
  expect(
    await Effect.runPromise(
      Contacts.merge({ id, from }).pipe(
        Effect.provide(
          Layer.provide(
            Client.layer({ apiKey: "test-key" }),
            Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fake.fetch)),
          ),
        ),
      ),
    ),
  ).toEqual(contact);
  fake.assertComplete();
  expect(fake.requests.map(({ method, path, body }) => ({ method, path, body }))).toEqual([
    { method: "POST", path: `/v1/contacts/${id}/merge`, body: { from } },
    { method: "POST", path: `/v1/contacts/${id}/merge`, body: { from } },
  ]);
});

it("preserves the conversation admission for connection proof in both clients", async () => {
  const connection = "intgacct_1234567890abcdef";
  const token = "signed-conversation-admission";
  const contact = Schema.decodeUnknownSync(ContactsMerge200)(wire);
  const fake = fakeSamvaApi(SamvaApi)({
    Contacts: {
      contactsMergeByConnection: ({ payload, headers }) => {
        expect(payload).toEqual({ connection });
        expect(headers["x-samva-conversation-agent-admission"]).toBe(token);
        return Effect.succeed(contact);
      },
    },
  });
  const client = createClient({ apiKey: "test-key", fetch: fake.fetch });
  expect(
    await client.contacts.mergeByConnection(
      { id, connection },
      { headers: { "x-samva-conversation-agent-admission": token } },
    ),
  ).toEqual(contact);
  expect(
    await Effect.runPromise(
      Contacts.mergeByConnection({ id, connection }).pipe(
        Effect.provide(
          Layer.provide(
            Client.layer({
              apiKey: "test-key",
              headers: { "x-samva-conversation-agent-admission": token },
            }),
            Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fake.fetch)),
          ),
        ),
      ),
    ),
  ).toEqual(contact);
  fake.assertComplete();
  expect(fake.requests.map(({ method, path, body }) => ({ method, path, body }))).toEqual([
    { method: "POST", path: `/v1/contacts/${id}/merge-by-connection`, body: { connection } },
    { method: "POST", path: `/v1/contacts/${id}/merge-by-connection`, body: { connection } },
  ]);
});
