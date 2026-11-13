import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import { CreateEventPayload } from "../src/effect/events";

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
