import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer, Schema } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import * as Contacts from "../src/effect/contacts";
import { CreateEventPayload } from "../src/effect/events";
import { createClient } from "../src/promises";

const id = "contact_7q2xk9mvt4znw8rh";
describe("generated event contact selectors", () => {
  it.each([
    "contact.created",
    "CONTACT.created",
    "samva.custom",
    "Samva.custom",
    "trial started",
    "9trial",
  ])("preserves portable event-name restrictions: %s", (name) => {
    expect(() =>
      Schema.decodeSync(CreateEventPayload)({ contact: { email: "ada@example.com" }, name }),
    ).toThrow();
  });
  it.each([{ id }, { externalId: "customer-42" }, { email: "ada@example.com" }])(
    "accepts one selector: %j",
    (contact) => {
      expect(
        Schema.decodeSync(CreateEventPayload)({ contact, name: "trial.started" }).contact,
      ).toEqual(contact);
    },
  );
  it.each([
    {},
    { id, email: "ada@example.com" },
    { externalId: "42", email: "ada@example.com" },
    { id, externalId: "42" },
    { id, email: null },
    { email: "ada@example.com", externalId: null },
    { externalId: "42", id: null },
  ])("rejects missing, ambiguous, or null selectors: %j", (contact) => {
    expect(() =>
      Schema.decodeUnknownSync(CreateEventPayload)({ contact, name: "trial.started" }),
    ).toThrow();
  });
});

describe("contact timeline facade", () => {
  it("keeps the contact timeline under the contacts namespace on both clients", async () => {
    const requests: URL[] = [];
    const fetch = async (input: RequestInfo | URL) => {
      requests.push(new URL(input instanceof Request ? input.url : input.toString()));
      return new Response(JSON.stringify({ items: [], nextCursor: null }), {
        headers: { "content-type": "application/json" },
      });
    };
    const promise = createClient({ apiKey: "samva_sk_test", fetch });
    const query = { id, limit: 25, cursor: "resume-here" };
    expect(await promise.contacts.listEvents(query)).toEqual({ items: [], nextCursor: null });
    const result = await Effect.runPromise(
      Contacts.listEvents(query).pipe(
        Effect.provide(
          Layer.provide(
            Client.layer({ apiKey: "samva_sk_test" }),
            Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
          ),
        ),
      ),
    );
    expect(result).toEqual({ items: [], nextCursor: null });
    expect(requests).toHaveLength(2);
    for (const request of requests) {
      expect(request.pathname).toBe(`/v1/contacts/${id}/events`);
      expect(request.searchParams.get("limit")).toBe("25");
      expect(request.searchParams.get("cursor")).toBe("resume-here");
    }
  });
});
