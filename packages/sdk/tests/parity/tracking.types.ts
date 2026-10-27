import type { Effect } from "effect";

import * as Campaigns from "../../src/effect/campaigns";
import * as Client from "../../src/effect/client";
import * as Email from "../../src/effect/email";
import * as ScheduledMessages from "../../src/effect/scheduled-messages";
import type { SamvaClient } from "../../src/promises";

declare const promiseClient: SamvaClient;

const promiseCalls: ReadonlyArray<PromiseLike<unknown>> = [
  promiseClient.email.getTrackingDefaults(),
  promiseClient.email.updateTrackingDefaults({ opens: false }),
  promiseClient.email.getRecipientTrackingPreference({ email: "reader@example.com" }),
  promiseClient.email.updateRecipientTrackingPreference({
    email: "reader@example.com",
    optedOut: true,
  }),
  promiseClient.email.send({
    to: "reader@example.com",
    subject: "Tracked",
    text: "Body",
    tracking: { opens: false },
  }),
  promiseClient.scheduledMessages.create({
    send: {
      channel: "email",
      to: [{ email: "reader@example.com" }],
      email: { subject: "Scheduled", text: "Body", tracking: { clicks: true } },
    },
    scheduledFor: "2026-08-01T09:00:00Z",
  }),
  promiseClient.campaigns.create({
    name: "Tracked campaign",
    channel: "email",
    content: {
      channel: "email",
      email: { subject: "Campaign", text: "Body", tracking: { opens: true, clicks: false } },
    },
    audience: { topicId: "unsub_1234567890abcdef", contactIds: ["contact_123"] },
  }),
];

const effectCalls: ReadonlyArray<Effect.Effect<unknown, unknown, Client.Service>> = [
  Email.getTrackingDefaults(),
  Email.updateTrackingDefaults({ opens: false }),
  Email.getRecipientTrackingPreference({ email: "reader@example.com" }),
  Email.updateRecipientTrackingPreference({
    email: "reader@example.com",
    optedOut: true,
  }),
  Email.send({
    to: "reader@example.com",
    subject: "Tracked",
    text: "Body",
    tracking: { opens: false },
  }),
  ScheduledMessages.create({
    send: {
      channel: "email",
      to: [{ email: "reader@example.com" }],
      email: { subject: "Scheduled", text: "Body", tracking: { clicks: true } },
    },
    scheduledFor: new Date("2026-08-01T09:00:00Z"),
  }),
  Campaigns.create({
    name: "Tracked campaign",
    channel: "email",
    content: {
      channel: "email",
      email: { subject: "Campaign", text: "Body", tracking: { opens: true, clicks: false } },
    },
    audience: { topicId: "unsub_1234567890abcdef", contactIds: ["contact_123"] },
  }),
];

void promiseCalls;
void effectCalls;
