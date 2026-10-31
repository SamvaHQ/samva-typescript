import { expectTypeOf } from "@effect/vitest";
import type { Effect } from "effect";

import * as Campaigns from "../../src/effect/campaigns";
import * as Client from "../../src/effect/client";
import * as Contacts from "../../src/effect/contacts";
import * as Email from "../../src/effect/email";
import * as Events from "../../src/effect/events";
import * as Journeys from "../../src/effect/journeys";
import * as Media from "../../src/effect/media";
import * as Messages from "../../src/effect/messages";
import * as Organizations from "../../src/effect/organizations";
import * as Topics from "../../src/effect/topics";
import {
  createClient,
  type JourneyDefinition,
  type MediaUploadInstruction,
  type SamvaClient,
} from "../../src/promises";

declare const promiseClient: SamvaClient;

promiseClient.topics.list().then((page) => {
  expectTypeOf(page.items[0]!.subscriptions.email.subscribed).toEqualTypeOf<number>();
  expectTypeOf(page.items[0]!.subscriptions.email.unsubscribed).toEqualTypeOf<number>();
  // @ts-expect-error phone channel fields stay outside the public SDK until launch.
  void page.items[0]!.subscriptions.sms;
});
declare const listedTopics: Effect.Success<ReturnType<typeof Topics.list>>;
expectTypeOf(listedTopics.items[0]!.subscriptions.email.subscribed).toEqualTypeOf<number>();
expectTypeOf(listedTopics.items[0]!.subscriptions.email.unsubscribed).toEqualTypeOf<number>();
// @ts-expect-error phone channel fields stay outside the public SDK until launch.
void listedTopics.items[0]!.subscriptions.whatsapp;

const payloadPromise = promiseClient.contacts.findOrCreate({
  lookup: { type: "email", value: "ada@example.com" },
});
const payloadEffect = Contacts.findOrCreate({
  lookup: { type: "email", value: "ada@example.com" },
});

promiseClient.contacts.list({ cursor: "next", limit: 10 });
promiseClient.contacts.list();
promiseClient.email.listDomains();

promiseClient.contacts.get({ id: "contact_123" });

promiseClient.contacts.startImport({ mode: "resume", jobId: "cimport_123", expectedGeneration: 1 });
const resumedImportEffect = Contacts.startImport({
  mode: "resume",
  jobId: "cimport_123",
  expectedGeneration: 1,
});
void resumedImportEffect;
// @ts-expect-error a new import requires its input, preview hash, and retry key.
promiseClient.contacts.startImport({ mode: "new" });
promiseClient.contacts.startImport({
  // @ts-expect-error the transport body is not a wrapper in the public facade.
  body: { mode: "resume", jobId: "cimport_123", expectedGeneration: 1 },
});

promiseClient.contacts.update({ id: "contact_123", name: "Ada" });

promiseClient.contacts.getActivityTimeline({ id: "contact_123", cursor: "next", limit: 10 });

promiseClient.organizations.get();

promiseClient.organizations.assignPersonalMailbox({
  userId: "user_7q2xk9mvt4znw8rh",
  mailboxAddress: "ada@example.com",
});
const personalAssignmentEffect = Organizations.assignPersonalMailbox({
  userId: "user_7q2xk9mvt4znw8rh",
  mailboxAddress: "ada@example.com",
});
void personalAssignmentEffect;
promiseClient.organizations.listPersonalMailboxAssignments();
const personalAssignmentsEffect = Organizations.listPersonalMailboxAssignments();
void personalAssignmentsEffect;
promiseClient.organizations.getPersonalMailboxAddressOptions();
const personalAddressOptionsEffect = Organizations.getPersonalMailboxAddressOptions();
void personalAddressOptionsEffect;
// @ts-expect-error assigning an address requires the target user.
const missingPersonalUser = Organizations.assignPersonalMailbox({
  mailboxAddress: "ada@example.com",
});
void missingPersonalUser;
// @ts-expect-error assigning a user requires a personal address.
promiseClient.organizations.assignPersonalMailbox({ userId: "user_7q2xk9mvt4znw8rh" });

const promiseMedia = promiseClient.media.create({
  filename: "receipt.pdf",
  contentType: "application/pdf",
  sizeBytes: 1024,
  purpose: "attachment",
});
const effectMedia = Media.create({
  filename: "receipt.pdf",
  contentType: "application/pdf",
  sizeBytes: 1024,
  purpose: "attachment",
});

payloadPromise.then((contact) => {
  void contact.contact.id;
  void contact.created;
  // @ts-expect-error ergonomic Promise methods return the value, not a result envelope
  void contact.data;
});

promiseClient.contacts.list({ cursor: "next" }, { headers: { "x-org-slug": "acme" } });
// @ts-expect-error transport result switches are only available under `raw`
promiseClient.contacts.list({ cursor: "next" }, { throwOnError: true });
// @ts-expect-error transport result switches are only available under `raw`
promiseClient.contacts.list({ cursor: "next" }, { responseStyle: "fields" });
promiseClient.raw.contacts.list({ cursor: "next" }, { throwOnError: true });

// Pagination remains a wire-string contract on the Effect modules.
const directEffects = [
  Contacts.list({ cursor: "next", limit: 10 }),
  Contacts.list(),
  Email.listDomains(),
  Contacts.get({ id: "contact_123" }),
  Contacts.update({ id: "contact_123", name: "Ada" }),
  Contacts.getActivityTimeline({ id: "contact_123", cursor: "next", limit: 10 }),
  Organizations.get(),
];

const emailSends = [
  promiseClient.messages.send({
    channel: "email",
    to: "ada@example.com",
    email: {
      subject: "Hello",
      text: "Hi",
      attachments: [
        {
          filename: "receipt.pdf",
          mediaId: "media_123",
          contentType: "application/pdf",
          size: 1024,
        },
      ],
    },
  }),
  Messages.send({
    channel: "email",
    to: "ada@example.com",
    email: {
      subject: "Hello",
      text: "Hi",
      attachments: [
        {
          filename: "receipt.pdf",
          mediaId: "media_123",
          contentType: "application/pdf",
          size: 1024,
        },
      ],
    },
  }),
];

const typedEffect: Effect.Effect<unknown, unknown, Client.Service> = payloadEffect;
const typedPromise: PromiseLike<unknown> = payloadPromise;
const typedMediaEffect: Effect.Effect<unknown, unknown, Client.Service> = effectMedia;
const typedMediaPromise: PromiseLike<unknown> = promiseMedia;
void typedEffect;
void typedPromise;
void typedMediaEffect;
void typedMediaPromise;
void directEffects;
void emailSends;

// @ts-expect-error lookup is explicit; multiple top-level lookup keys are not accepted
promiseClient.contacts.findOrCreate({ email: "ada@example.com", externalId: "user_123" });
// @ts-expect-error only one lookup type can be selected
promiseClient.contacts.findOrCreate({
  lookup: { type: ["email", "externalId"], value: "ada@example.com" },
});
// @ts-expect-error the lookup value is required
const invalidLookup = Contacts.findOrCreate({ lookup: { type: "email" } });
void invalidLookup;
// @ts-expect-error lookup selectors stay literal in the published Promise SDK
promiseClient.contacts.findOrCreate({ lookup: { type: "anything", value: "ada@example.com" } });
const invalidSelector = Contacts.findOrCreate({
  // @ts-expect-error lookup selectors stay literal in the published Effect SDK
  lookup: { type: "anything", value: "ada@example.com" },
});
void invalidSelector;
promiseClient.contacts.findOrCreate({
  lookup: { type: "email", value: "ada@example.com" },
  create: { externalId: "user_123", profile: { customFields: { plan: "creator" } } },
});
const externalIdContact = Contacts.findOrCreate({
  lookup: { type: "externalId", value: "user_123" },
  create: { identities: [{ type: "email", identifier: "ada@example.com" }] },
});

void externalIdContact;

promiseClient.events.create({ contact: { email: "ada@example.com" }, name: "trial.started" });
const eventEffect = Events.create({ contact: { email: "ada@example.com" }, name: "trial.started" });
promiseClient.events.batch({ events: [{ contact: { externalId: "42" }, name: "trial.started" }] });
promiseClient.contacts.listEvents({ id: "contact_7q2xk9mvt4znw8rh", cursor: "next", limit: 25 });

// @ts-expect-error contact event selectors are mutually exclusive
promiseClient.events.create({
  contact: { email: "ada@example.com", externalId: "42" },
  name: "trial.started",
});
// @ts-expect-error excluded selectors must be absent, not null
promiseClient.events.create({
  contact: { email: "ada@example.com", externalId: null },
  name: "trial.started",
});
// @ts-expect-error at least one contact selector is required
const missingEventContact = Events.create({ contact: {}, name: "trial.started" });
const ambiguousEventContact = Events.create({
  // @ts-expect-error Effect contact event selectors are mutually exclusive
  contact: { email: "ada@example.com", externalId: "42" },
  name: "trial.started",
});
const nullEventContact = Events.create({
  // @ts-expect-error excluded Effect selectors must be absent, not null
  contact: { email: "ada@example.com", externalId: null },
  name: "trial.started",
});

void [eventEffect, missingEventContact, ambiguousEventContact, nullEventContact];

const journeyDefinition: JourneyDefinition = {
  trigger: { type: "contact.created" },
  rootNodeId: "done",
  nodes: { done: { type: "exit", config: {}, next: [] } },
};
promiseClient.journeys.create({ name: "Welcome", definition: journeyDefinition });
promiseClient.journeys.list({ status: "active", limit: 25 });
promiseClient.journeys.replaceDraft({
  id: "jrny_7q2xk9mvt4znw8rh",
  revision: "rev",
  definition: journeyDefinition,
});
promiseClient.journeys.publish({ id: "jrny_7q2xk9mvt4znw8rh", revision: "rev" });
promiseClient.journeys.pause({ id: "jrny_7q2xk9mvt4znw8rh" });
promiseClient.journeys.listRuns({ id: "jrny_7q2xk9mvt4znw8rh", status: "active" });
const journeyPublishEffect = Journeys.publish({ id: "jrny_7q2xk9mvt4znw8rh", revision: "rev" });

void journeyPublishEffect;

// Callers pass `undefined` for record entries (template data, metadata) and optional properties;
// the wire body omits them.
promiseClient.campaigns.create({
  name: "Launch",
  channel: "email",
  content: {
    channel: "email",
    email: { subject: "Hello", templateData: { name: undefined, plan: "pro" } },
    metadata: { source: undefined },
  },
  audience: {
    topicId: "unsub_1234567890abcdef",
    contactIds: ["contact_123"],
    includeTags: undefined,
  },
  policy: undefined,
});

export const campaignCreateEffect = Campaigns.create({
  name: "Launch",
  channel: "email",
  content: {
    channel: "email",
    email: { subject: "Hello", templateData: { name: undefined, plan: "pro" } },
    metadata: { source: undefined },
  },
  audience: {
    topicId: "unsub_1234567890abcdef",
    contactIds: ["contact_123"],
    includeTags: undefined,
  },
  policy: undefined,
});

// A record a caller reads keeps its entries exact: upload headers feed `Request` and `Headers`.
declare const uploadInstruction: MediaUploadInstruction;
export const uploadHeaders: HeadersInit = uploadInstruction.headers;
export const exactHeaders: Record<string, string> = uploadInstruction.headers;

// A nonempty-array request field keeps its tuple rest: three items compile.
promiseClient.events.batch({
  events: [
    { contact: { email: "a@example.com" }, name: "a" },
    { contact: { email: "b@example.com" }, name: "b" },
    { contact: { email: "c@example.com" }, name: "c", properties: { plan: undefined } },
  ],
});

// A value read from a split schema goes back into the matching request: the write variant accepts
// everything the read type holds.
declare const journey: Awaited<ReturnType<SamvaClient["journeys"]["get"]>>;
promiseClient.journeys.create({ name: journey.name, definition: journey.draft });
promiseClient.journeys.replaceDraft({
  id: journey.id,
  revision: "rev",
  definition: journey.draft,
});

declare const contact: Awaited<ReturnType<SamvaClient["contacts"]["get"]>>;
promiseClient.contacts.update({
  id: contact.id,
  metadata: contact.metadata,
  profile: contact.profile,
});

// @ts-expect-error Numeric query values are numbers at the SDK boundary.
promiseClient.contacts.list({ limit: "10" });
// @ts-expect-error Boolean query values are booleans at the SDK boundary.
promiseClient.email.listSenders({ isActive: "true" });
// @ts-expect-error Numeric query values are numbers at the SDK boundary.
void Contacts.list({ limit: "10" });
// @ts-expect-error Boolean query values are booleans at the SDK boundary.
void Email.listSenders({ isActive: "true" });

void Email.rotateDomainDkim({ id: "dom_123" });
void Email.rotateDomainDkim({ id: "dom_123" }, { idempotencyKey: "rotation-1" });
// @ts-expect-error the only idempotency override is in the second options argument.
void Email.rotateDomainDkim({ id: "dom_123", idempotencyKey: "rotation-1" });
// @ts-expect-error wire header fields are not public operation inputs.
void Email.rotateDomainDkim({ id: "dom_123", "idempotency-key": "rotation-1" });
const oauthConfig: Client.Config = { authToken: "token", orgSlug: "acme" };
// @ts-expect-error API keys already select their organization.
const apiKeyOrgConfig: Client.Config = { apiKey: "samva_sk_test", orgSlug: "acme" };
void [oauthConfig, apiKeyOrgConfig];

promiseClient.email.rotateDomainDkim(
  { id: "dom_123" },
  { idempotencyKey: "rotation-1", maxRetries: 0 },
);
// @ts-expect-error keys are only accepted in the options argument.
promiseClient.email.rotateDomainDkim({ id: "dom_123", "idempotency-key": "rotation-1" });
// @ts-expect-error keys are only accepted in the options argument.
promiseClient.templates.create({ name: "Hello", idempotencyKey: "template-1" });
// @ts-expect-error orgSlug pairs with authToken.
createClient({ apiKey: "key", orgSlug: "acme" });
