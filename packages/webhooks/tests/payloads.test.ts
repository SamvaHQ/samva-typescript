import { describe, expect, expectTypeOf, it, vi } from "@effect/vitest";
import { readPublicOpenApi } from "@samva/openapi/document";
import addFormats from "ajv-formats";
import Ajv from "ajv/dist/2020.js";
import { Effect, Predicate, Schema } from "effect";

import {
  MessageBouncedEventSchema,
  SamvaWebhookEventSchema,
  verify as verifyEffect,
  verifyRequest as verifyRequestEffect,
} from "../src/effect.js";
import {
  isKnownEvent,
  generateWebhookSecret,
  MalformedWebhookPayloadError,
  signWebhook,
  verify,
  verifyRequest,
  WebhookEventJsonSchemas,
  type MessageBouncedPayload,
  type MailboxMessageSentPayload,
  type MailboxActionPendingApprovalPayload,
  type MailboxActionResolvedPayload,
  type FlowRegistrationUpdatedPayload,
  type MessageReadPayload,
  type TemplateRegistrationUpdatedPayload,
  type WhatsappNumberConnectedPayload,
  type SamvaWebhookEvent,
} from "../src/promise.js";

const timestamp = "2026-10-11T00:00:00.000Z";
const bounced = {
  type: "message.bounced",
  timestamp,
  data: {
    messageId: "msg_example",
    organizationId: "org_example",
    channel: "email",
    status: "bounced",
    recipient: "recipient@example.com",
    occurredAt: "2026-10-10T23:59:00.000Z",
    toEmails: ["recipient@example.com", "other@example.com"],
  },
};

const delivery = async (event: unknown) => {
  const body = JSON.stringify(event);
  const secret = generateWebhookSecret();
  const id = "evt_payload";
  const signedAt = String(Math.floor(Date.now() / 1000));
  const signature = await signWebhook({ body, id, timestamp: signedAt, secret });
  const options = { body, secret, id, timestamp: signedAt, signature };
  const request = new Request("https://customer.example/webhook", {
    method: "POST",
    body,
    headers: { "webhook-id": id, "webhook-timestamp": signedAt, "webhook-signature": signature },
  });
  return { options, request, secret };
};

describe("typed webhook payload boundary", () => {
  it("returns recipient feedback through Promise and Effect entrypoints", async () => {
    const { options, request, secret } = await delivery(bounced);
    const results = [
      await verify(options),
      await verifyRequest(request, secret),
      await Effect.runPromise(verifyEffect(options)),
      await Effect.runPromise(verifyRequestEffect(request, secret)),
    ];
    for (const { event } of results) {
      if (!isKnownEvent(event) || event.type !== "message.bounced")
        throw new Error("Wrong event type");
      expectTypeOf(event.data).toEqualTypeOf<MessageBouncedPayload>();
      expectTypeOf(event.data.recipient).toEqualTypeOf<string>();
      expect(event.data.recipient).toBe("recipient@example.com");
      expect(event.data.occurredAt).toBe("2026-10-10T23:59:00.000Z");
    }
  });

  it.each([
    { ...bounced, data: { ...bounced.data, recipient: undefined } },
    { ...bounced, data: { ...bounced.data, occurredAt: undefined } },
    { ...bounced, data: { ...bounced.data, recipient: 42 } },
    { ...bounced, data: null },
  ])("rejects signed events that do not satisfy the public payload contract", async (invalid) => {
    const { options } = await delivery(invalid);
    await expect(verify(options)).rejects.toBeInstanceOf(MalformedWebhookPayloadError);
    const result = await Effect.runPromise(verifyEffect(options).pipe(Effect.flip));
    expect(result).toBeInstanceOf(MalformedWebhookPayloadError);
  });

  it("verifies an inbound WhatsApp message on the shared message.received event", async () => {
    const received = {
      type: "message.received",
      timestamp,
      data: {
        messageId: "msg_example",
        organizationId: "org_example",
        channel: "whatsapp",
        status: "delivered",
        direction: "inbound",
        from: "+919800000001",
        to: "+919800000002",
        body: "Is my order out for delivery?",
        messageType: "text",
        providerMessageId: "wamid.example",
        whatsapp: { text: "Is my order out for delivery?" },
      },
    };
    const { options, request, secret } = await delivery(received);
    const results = [
      await verify(options),
      await verifyRequest(request, secret),
      await Effect.runPromise(verifyEffect(options)),
      await Effect.runPromise(verifyRequestEffect(request, secret)),
    ];
    for (const { event } of results) {
      if (!isKnownEvent(event) || event.type !== "message.received")
        throw new Error("Wrong event type");
      expectTypeOf(event.data.channel).toEqualTypeOf<"sms" | "whatsapp" | "email">();
      expect(event.data.channel).toBe("whatsapp");
      expect(event.data.whatsapp?.text).toBe("Is my order out for delivery?");
    }
  });

  const suffix = "0123456789abcdefgh";
  const statusChangedAt = "2026-10-10T23:59:00.000Z";
  const whatsAppOnly = [
    {
      type: "message.read",
      timestamp,
      data: {
        messageId: `msg_${suffix}`,
        organizationId: `org_${suffix}`,
        channel: "whatsapp",
        status: "read",
        to: "+919800000001",
        from: "+919800000002",
        providerMessageId: "wamid.example",
      },
    },
    {
      type: "template.registration.updated",
      timestamp,
      data: {
        id: `treg_${suffix}`,
        templateId: `tmpl_${suffix}`,
        publicationId: `tpub_${suffix}`,
        target: { provider: "whatsapp", wabaId: "102290129340398" },
        name: "order_shipped",
        language: "en_US",
        status: "approved",
        category: "utility",
        providerCategory: "utility",
        providerTemplateId: "1234567890",
        reason: null,
        submittedAt: statusChangedAt,
        statusChangedAt,
        createdAt: statusChangedAt,
        updatedAt: statusChangedAt,
        organizationId: `org_${suffix}`,
        previousStatus: "submitted",
      },
    },
    {
      type: "flow.registration.updated",
      timestamp,
      data: {
        id: `wafreg_${suffix}`,
        flowId: `waflow_${suffix}`,
        versionId: `wafver_${suffix}`,
        versionNumber: 2,
        wabaId: "102290129340398",
        providerFlowId: "4471259376412",
        name: "Book a delivery slot",
        status: "published",
        validationErrors: [],
        endpointAlerts: [],
        publishedAt: statusChangedAt,
        statusChangedAt,
        createdAt: statusChangedAt,
        updatedAt: statusChangedAt,
        organizationId: `org_${suffix}`,
        previousStatus: "draft",
      },
    },
    {
      type: "whatsapp.number.connected",
      timestamp,
      data: {
        organizationId: `org_${suffix}`,
        namespaceId: `ns_${suffix}`,
        businessAccountId: `waba_${suffix}`,
        phoneNumber: "+919800000002",
        phoneNumberId: "106540352242922",
        whatsappBusinessAccountId: "102290129340398",
        displayName: "Example Store",
        verificationStatus: "verified",
        reconnected: false,
        setupLink: { id: `wasl_${suffix}`, metadata: { customer: "cus_123" } },
      },
    },
  ] as const;

  it.each(whatsAppOnly)(
    "verifies the WhatsApp-only $type event through Promise and Effect entrypoints",
    async (candidate) => {
      const { options, request, secret } = await delivery(candidate);
      const results = [
        await verify(options),
        await verifyRequest(request, secret),
        await Effect.runPromise(verifyEffect(options)),
        await Effect.runPromise(verifyRequestEffect(request, secret)),
      ];
      for (const { event } of results) {
        if (!isKnownEvent(event) || event.type !== candidate.type)
          throw new Error("Wrong event type");
        expect(event.data).toEqual(candidate.data);
      }
    },
  );

  it.each(whatsAppOnly)(
    "rejects a $type event whose payload breaks its contract",
    async (candidate) => {
      const { options } = await delivery({
        ...candidate,
        data: { ...candidate.data, organizationId: 42 },
      });
      await expect(verify(options)).rejects.toBeInstanceOf(MalformedWebhookPayloadError);
      const result = await Effect.runPromise(verifyEffect(options).pipe(Effect.flip));
      expect(result).toBeInstanceOf(MalformedWebhookPayloadError);
    },
  );

  it("types the WhatsApp-only payloads", async () => {
    const { options } = await delivery(whatsAppOnly[3]);
    const { event } = await verify(options);
    if (!isKnownEvent(event)) throw new Error("Unknown event");
    if (event.type === "message.read") expectTypeOf(event.data).toEqualTypeOf<MessageReadPayload>();
    if (event.type === "template.registration.updated")
      expectTypeOf(event.data).toEqualTypeOf<TemplateRegistrationUpdatedPayload>();
    if (event.type === "flow.registration.updated")
      expectTypeOf(event.data).toEqualTypeOf<FlowRegistrationUpdatedPayload>();
    if (event.type !== "whatsapp.number.connected") throw new Error("Wrong event type");
    expectTypeOf(event.data).toEqualTypeOf<WhatsappNumberConnectedPayload>();
    expectTypeOf(event.data.verificationStatus).toEqualTypeOf<
      "pending" | "verified" | "failed" | "suspended"
    >();
    expect(event.data.setupLink?.metadata).toEqual({ customer: "cus_123" });
  });

  it("passes signed unknown events through without claiming a typed payload", async () => {
    const candidate = { type: "future.event", timestamp, data: { futureField: 42 }, extra: true };
    const { options, request, secret } = await delivery(candidate);
    const results = [
      await verify(options),
      await verifyRequest(request, secret),
      await Effect.runPromise(verifyEffect(options)),
      await Effect.runPromise(verifyRequestEffect(request, secret)),
    ];
    for (const { event } of results) {
      expect(isKnownEvent(event)).toBe(false);
      expect(event).toEqual(candidate);
      if (!isKnownEvent(event)) expectTypeOf(event.data).toEqualTypeOf<unknown>();
    }
  });

  it("preserves additive event-data fields and supports customer decoding schemas", async () => {
    const candidate = {
      ...bounced,
      extra: true,
      data: { ...bounced.data, futureField: "retained" },
    };
    const { options } = await delivery(candidate);
    const verified = await verify(options);
    expect(verified.event).toEqual(candidate);
    if (!isKnownEvent(verified.event) || verified.event.type !== "message.bounced")
      throw new Error("Wrong event type");
    expectTypeOf(verified.event.data.recipient).toEqualTypeOf<string>();
    const decoded = Schema.decodeSync(MessageBouncedEventSchema)(verified.event);
    expect(decoded).toEqual(candidate);
    const ajv = new Ajv({ strict: false });
    addFormats(ajv);
    const decode = ajv.compile(WebhookEventJsonSchemas["message.bounced"]);
    expect(decode(verified.event)).toBe(true);
    expect(decode({ ...candidate, data: { ...candidate.data, recipient: 42 } })).toBe(false);
    expect(() =>
      Schema.decodeUnknownSync(MessageBouncedEventSchema)({
        ...candidate,
        data: { ...candidate.data, recipient: 42 },
      }),
    ).toThrow();
  });

  it.each(["contact.subscribed", "contact.unsubscribed", "contact.resubscribed"])(
    "narrows %s payloads without customer-declared copies",
    async (type) => {
      const subscription = {
        type,
        timestamp,
        data: {
          organizationId: "org_0000000000000000",
          contactId: "contact_0000000000000000",
          email: "reader@example.com",
          topicId: "unsub_0000000000000000",
          topicName: "Newsletter",
          channel: "email",
          consentIp: "192.0.2.1",
          consentSource: "signup",
          source: "link",
          occurredAt: timestamp,
        },
      };
      const { options } = await delivery(subscription);
      const { event } = await verify(options);
      if (
        !isKnownEvent(event) ||
        !(
          event.type === "contact.subscribed" ||
          event.type === "contact.unsubscribed" ||
          event.type === "contact.resubscribed"
        )
      )
        throw new Error("Wrong event type");
      expectTypeOf(event.data.email).toEqualTypeOf<string | null | undefined>();
      expect(event.data.email).toBe("reader@example.com");
      expectTypeOf(event.data.consentSource).toEqualTypeOf<string | null | undefined>();
      expect(event.data.consentSource).toBe("signup");
      expect(Schema.decodeSync(SamvaWebhookEventSchema)(event)).toEqual(subscription);
    },
  );

  it("verifies an older mailbox send body and delivers it to the customer handler", async () => {
    const candidate = {
      type: "mailbox.message.sent",
      timestamp,
      data: {
        mailboxId: "mbx_0000000000000000",
        namespaceId: null,
        actionId: "mbxact_0000000000000000",
        actor: { kind: "user", id: "user_example", source: "humanUi" },
        message: {
          id: "msg_0000000000000000",
          threadId: "thread_0000000000000000",
          from: { address: "sender@example.com" },
          to: ["recipient@example.com"],
          cc: [],
          subject: "Hello",
          text: "Hello",
          replyText: null,
          attachments: [],
          occurredAt: timestamp,
        },
      },
    };
    const { options, request, secret } = await delivery(candidate);
    const handler = vi.fn();
    const verified = await verifyRequest(request, secret);
    handler(verified.event);
    expect(handler).toHaveBeenCalledExactlyOnceWith(candidate);
    expect(isKnownEvent(verified.event)).toBe(true);
    expect(await Effect.runPromise(verifyEffect(options))).toEqual(verified);
    expect(Schema.decodeUnknownSync(SamvaWebhookEventSchema)(verified.event)).toEqual(candidate);
    const ajv = new Ajv({ strict: false });
    expect(ajv.compile(WebhookEventJsonSchemas["mailbox.message.sent"])(candidate)).toBe(true);
    expectTypeOf<MailboxMessageSentPayload["state"]>().toEqualTypeOf<"completed" | undefined>();
    expectTypeOf<MailboxMessageSentPayload["acceptedAt"]>().toEqualTypeOf<string | undefined>();
  });

  it("accepts older pending approval bodies while validating lifecycle fields when present", async () => {
    const candidate = {
      type: "mailbox.action.pending_approval",
      timestamp,
      data: {
        mailboxId: "mbx_0000000000000000",
        namespaceId: null,
        action: {
          id: "mbxact_0000000000000000",
          type: "sendMessage",
          threadId: null,
          reason: null,
          proposedBy: { kind: "apiKey", id: "key_example", source: "externalApi" },
          createdAt: timestamp,
        },
        draft: { to: ["recipient@example.com"], cc: [], subject: "Hello" },
      },
    };
    const { options } = await delivery(candidate);
    const { event } = await verify(options);
    expect(event).toEqual(candidate);
    expect(Schema.decodeUnknownSync(SamvaWebhookEventSchema)(event)).toEqual(candidate);
    const invalid = await delivery({
      ...candidate,
      data: { ...candidate.data, action: { ...candidate.data.action, state: "queued" } },
    });
    await expect(verify(invalid.options)).rejects.toBeInstanceOf(MalformedWebhookPayloadError);
    expectTypeOf<MailboxActionPendingApprovalPayload["action"]["state"]>().toEqualTypeOf<
      "approvalRequired" | undefined
    >();
    expectTypeOf<MailboxActionPendingApprovalPayload["action"]["decision"]>().toExtend<
      object | undefined
    >();
  });

  it("verifies a resolved approval and rejects an outcome without a producer", async () => {
    const candidate = {
      type: "mailbox.action.resolved",
      timestamp,
      data: {
        mailboxId: "mbx_0000000000000000",
        namespaceId: null,
        action: {
          id: "mbxact_0000000000000000",
          type: "reply",
          threadId: null,
          proposedBy: { kind: "apiKey", id: "key_example", source: "externalApi" },
          createdAt: timestamp,
        },
        resolution: {
          outcome: "denied",
          actor: { kind: "user", id: "user_example", displayName: "Grace", source: "humanUi" },
          resolvedAt: timestamp,
          reason: "Wrong recipient",
        },
      },
    };
    const { options } = await delivery(candidate);
    const { event } = await verify(options);
    expect(event).toEqual(candidate);
    expect(isKnownEvent(event)).toBe(true);
    expect(Schema.decodeUnknownSync(SamvaWebhookEventSchema)(event)).toEqual(candidate);
    const ajv = new Ajv({ strict: false });
    expect(ajv.compile(WebhookEventJsonSchemas["mailbox.action.resolved"])(candidate)).toBe(true);
    const invalid = await delivery({
      ...candidate,
      data: {
        ...candidate.data,
        resolution: { ...candidate.data.resolution, outcome: "expired" },
      },
    });
    await expect(verify(invalid.options)).rejects.toBeInstanceOf(MalformedWebhookPayloadError);
    expectTypeOf<MailboxActionResolvedPayload["resolution"]["outcome"]>().toEqualTypeOf<
      "approved" | "denied" | "cancelled"
    >();
  });

  it("does not narrow a manually constructed invalid known payload", () => {
    expect(isKnownEvent({ type: "message.bounced", timestamp, data: {} })).toBe(false);
  });

  it("covers every event of the public document in public types and validators", () => {
    expectTypeOf<SamvaWebhookEvent["type"]>().toEqualTypeOf<keyof typeof WebhookEventJsonSchemas>();
    const { webhooks } = readPublicOpenApi();
    expect(Object.keys(WebhookEventJsonSchemas).sort()).toEqual(
      Predicate.isObject(webhooks) ? Object.keys(webhooks).sort() : [],
    );
  });

  it.each(["message.opened", "message.clicked"])(
    "validates %s engagement details",
    async (type) => {
      const candidate = {
        type,
        timestamp,
        data: {
          messageId: "msg_0000000000000000",
          organizationId: "org_0000000000000000",
          channel: "email",
          deliveryId: "mdel_0000000000000000",
          recipient: "reader@example.com",
          occurredAt: timestamp,
          machine: true,
          machineReason: "scanner-user-agent",
          country: "US",
          city: "Boston",
          asn: 64500,
          code: "tracking-code",
          linkIndex: 0,
          destinationUrl: "https://example.com/docs",
          ...(type === "message.opened"
            ? { firstOpen: false }
            : { firstClick: false, url: "https://example.com/docs", linkTags: {} }),
        },
      };
      const { options } = await delivery(candidate);
      const { event } = await verify(options);
      if (!isKnownEvent(event)) throw new Error("Wrong event type");
      expect(Schema.decodeSync(SamvaWebhookEventSchema)(event)).toEqual(candidate);
      const invalid = await delivery({
        ...candidate,
        data: { ...candidate.data, machineReason: "unsupported" },
      });
      await expect(verify(invalid.options)).rejects.toBeInstanceOf(MalformedWebhookPayloadError);
    },
  );

  it("exports a type that closes the event list", () => {
    expectTypeOf<Extract<SamvaWebhookEvent, { type: "unknown" }>>().toEqualTypeOf<never>();
  });
});
