import { describe, expect, it, vi } from "@effect/vitest";
import { generateWebhookSecret, signWebhook } from "@samva/webhooks/protocol";

import {
  defineExtension,
  type ExtensionHandlers,
  type ExtensionManifest,
} from "../../src/mailbox/index";
import { createTestClient, mailboxEvent, runExtension } from "../../src/mailbox/test";
import { createWebhookHandler } from "../../src/mailbox/webhook";
import { createClient } from "../../src/promises/index";

const manifest = {
  name: "auto-ack",
  displayName: "Auto acknowledge",
  version: "1.0.0",
  runtime: "hosted",
  events: ["mailbox.message.received"],
  permissions: ["read", "send"],
} as const satisfies ExtensionManifest;
const extension = (on: ExtensionHandlers<"mailbox.message.received"> = {}) =>
  defineExtension({ manifest, on });
const event = mailboxEvent("mailbox.message.received");
const invocation = (attempt = 1) => {
  const { id, ...body } = event;
  return { eventId: id, attempt, body: JSON.stringify(body) };
};
const hosted = (
  subject: ReturnType<typeof extension>,
  fetch: typeof globalThis.fetch = globalThis.fetch,
  attempt = 1,
) =>
  subject.fetch(
    new Request("https://extension.test", {
      method: "POST",
      body: JSON.stringify(invocation(attempt)),
    }),
    { SAMVA: { fetch } },
  );

describe("extension authoring", () => {
  it("constrains handler keys to manifest events", () => {
    expect(() =>
      defineExtension({
        manifest,
        on: {
          // @ts-expect-error sent is not in manifest.events
          "mailbox.message.sent": async () => {},
        },
      }),
    ).toThrow("not listed");
  });
  it("requires read permission", () => {
    expect(() =>
      defineExtension({ manifest: { ...manifest, permissions: ["send"] }, on: {} }),
    ).toThrow("read permission");
  });
  it("uses a normal Samva client through the hosted binding without credentials", async () => {
    const calls: Request[] = [];
    const subject = extension({
      "mailbox.message.received": async (received, context) => {
        expect(context.event).toBe(received);
        expect(context.attempt).toBe(2);
        expect(context.samva.contacts).toBeDefined();
        await context.samva.mailboxes.reply({
          id: received.data.mailboxId,
          messageId: received.data.message.id,
          text: "Thanks",
        });
      },
    });
    const response = await hosted(
      subject,
      async (input, init) => {
        calls.push(new Request(input, init));
        return Response.json({ state: "accepted" });
      },
      2,
    );
    expect(await response.json()).toEqual({ ok: true, logs: [] });
    expect(calls[0]?.url).toBe(
      `https://api.samva.dev/v1/mailboxes/${event.data.mailboxId}/messages/${event.data.message.id}/reply`,
    );
    expect(calls[0]?.headers.get("authorization")).toBeNull();
    expect(calls[0]?.headers.get("x-api-key")).toBeNull();
    expect(await calls[0]?.json()).toEqual({ text: "Thanks" });
  });
  it("keeps handler logs separate and captures failures", async () => {
    const original = console.log;
    const subject = extension({
      "mailbox.message.received": (_, { log, attempt }) => {
        log("attempt", attempt);
        if (attempt === 2) throw new Error("boom");
      },
    });
    const responses = await Promise.all([
      hosted(subject, undefined, 1),
      hosted(subject, undefined, 2),
    ]);
    expect(await responses[0]?.json()).toEqual({ ok: true, logs: ["attempt 1"] });
    expect(await responses[1]?.json()).toEqual({ ok: false, error: "boom", logs: ["attempt 2"] });
    expect(console.log).toBe(original);
  });
  it("acknowledges unknown event types without invoking handlers", async () => {
    const on = vi.fn();
    const subject = extension({ "mailbox.message.received": on });
    const response = await subject.fetch(
      new Request("https://extension.test", {
        method: "POST",
        body: JSON.stringify({
          ...invocation(),
          body: JSON.stringify({ type: "future.event", timestamp: event.timestamp, data: {} }),
        }),
      }),
      { SAMVA: { fetch: globalThis.fetch } },
    );
    expect(await response.json()).toEqual({ ok: true, logs: [] });
    expect(on).not.toHaveBeenCalled();
  });
  it("returns malformed invocation errors without throwing", async () => {
    const response = await extension().fetch(
      new Request("https://extension.test", { method: "POST", body: "{" }),
      { SAMVA: { fetch: globalThis.fetch } },
    );
    expect(await response.json()).toMatchObject({ ok: false, logs: [] });
  });
});

describe("per-event idempotency", () => {
  it("replays stable per-operation keys and separates repeated calls", async () => {
    const subject = extension({
      "mailbox.message.received": async (_, { samva }) => {
        await samva.mailboxes.reply({ id: "mbx", messageId: "msg", text: "one" });
        await samva.mailboxes.reply({ id: "mbx", messageId: "msg", text: "two" });
        await samva.mailboxes.replyAll({ id: "mbx", messageId: "msg", text: "all" });
        await samva.mailboxes.forward({
          id: "mbx",
          messageId: "msg",
          to: ["a@example.com"],
          text: "forward",
        });
        await samva.mailboxes.sendMessage({
          id: "mbx",
          to: ["a@example.com"],
          subject: "Hi",
          text: "new",
        });
      },
    });
    const client = createTestClient();
    const first = await runExtension(subject, event, { client });
    const second = await runExtension(subject, event, { client, attempt: 2 });
    expect(first.ok).toBe(true);
    const keys = first.calls.map((call) => call.idempotencyKey);
    expect(keys).toEqual([
      `${event.id}:reply:1`,
      `${event.id}:reply:2`,
      `${event.id}:replyAll:1`,
      `${event.id}:forward:1`,
      `${event.id}:send:1`,
    ]);
    expect(second.calls.map((call) => call.idempotencyKey)).toEqual(keys);
  });
  it("honors an explicit override without consuming a generated key", async () => {
    const subject = extension({
      "mailbox.message.received": async (_, { samva }) => {
        await samva.mailboxes.reply(
          { id: "mbx", messageId: "msg", text: "hello" },
          { idempotencyKey: "explicit" },
        );
        await samva.mailboxes.reply({ id: "mbx", messageId: "msg", text: "next" });
      },
    });
    const result = await runExtension(subject, event);
    expect(result.ok).toBe(true);
    expect(result.calls.map((call) => call.idempotencyKey)).toEqual([
      "explicit",
      `${event.id}:reply:1`,
    ]);
  });
  it("uses normal client calls outside dispatch and records only the current run", async () => {
    const client = createTestClient({
      "POST /v1/mailboxes/mbx/messages": { state: "approvalRequired" },
    });
    await client.mailboxes.sendMessage({ id: "mbx", to: ["a@example.com"], subject: "Hi" });
    expect(client.calls[0]?.idempotencyKey).toMatch(/^[0-9a-f-]{36}$/);
    const result = await runExtension(extension(), event, { client });
    expect(result.calls).toEqual([]);
  });
});

describe("webhook adapter", () => {
  const secret = generateWebhookSecret();
  async function request(valid = true) {
    const body = invocation().body;
    const timestamp = String(Math.floor(Date.now() / 1000));
    const signature = await signWebhook({ body, id: event.id, timestamp, secret });
    return new Request("https://extension.test", {
      method: "POST",
      body,
      headers: {
        "webhook-id": event.id,
        "webhook-timestamp": timestamp,
        "webhook-signature": valid ? signature : "v1,bad",
      },
    });
  }
  it("verifies signatures and replays deterministic keys on redelivery", async () => {
    const calls: Request[] = [];
    const handler = createWebhookHandler(
      extension({
        "mailbox.message.received": async (received, { samva }) => {
          await samva.mailboxes.reply({
            id: received.data.mailboxId,
            messageId: received.data.message.id,
            text: "Thanks",
          });
        },
      }),
      {
        apiKey: "installation-key",
        webhookSecret: secret,
        apiOrigin: "https://api.test",
        fetch: async (input, init) => {
          calls.push(new Request(input, init));
          return Response.json({ state: "queued" });
        },
      },
    );
    for (let n = 0; n < 2; n++) expect((await handler(await request())).status).toBe(200);
    expect(calls.map((call) => call.headers.get("x-api-key"))).toEqual([
      "installation-key",
      "installation-key",
    ]);
    expect(calls.map((call) => call.headers.get("idempotency-key"))).toEqual([
      `${event.id}:reply:1`,
      `${event.id}:reply:1`,
    ]);
  });
  it("returns 401 without dispatch on a bad signature", async () => {
    const on = vi.fn();
    const handler = createWebhookHandler(extension({ "mailbox.message.received": on }), {
      apiKey: "key",
      webhookSecret: secret,
    });
    expect((await handler(await request(false))).status).toBe(401);
    expect(on).not.toHaveBeenCalled();
  });
  it("returns 500 for handler failures", async () => {
    const handler = createWebhookHandler(
      extension({
        "mailbox.message.received": () => {
          throw new Error("failed");
        },
      }),
      { apiKey: "key", webhookSecret: secret },
    );
    const response = await handler(await request());
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ ok: false, error: "failed" });
  });
});

it("observes original actions using the normal mailbox client without a send key", async () => {
  const calls: Request[] = [];
  const client = createClient({
    apiKey: "key",
    fetch: async (input, init) => {
      calls.push(new Request(input, init));
      return Response.json({ state: "queued" });
    },
  });
  await client.mailboxes.getAction({ id: "mbx/a", actionId: "action/b" });
  await client.mailboxes.cancelAction({ id: "mbx/a", actionId: "action/b" });
  await client.mailboxes.retryAction({ id: "mbx/a", actionId: "action/b" });
  expect(calls.map((call) => [new URL(call.url).pathname, call.method])).toEqual([
    ["/v1/mailboxes/mbx%2Fa/actions/action%2Fb", "GET"],
    ["/v1/mailboxes/mbx%2Fa/actions/action%2Fb/cancel", "POST"],
    ["/v1/mailboxes/mbx%2Fa/actions/action%2Fb/retry", "POST"],
  ]);
  expect(calls.map((call) => call.headers.get("idempotency-key"))).toEqual([null, null, null]);
});
