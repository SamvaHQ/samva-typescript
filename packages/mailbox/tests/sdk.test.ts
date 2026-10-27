import { describe, expect, it, vi } from "@effect/vitest";
import { generateWebhookSecret, signWebhook } from "@samva/webhooks/protocol";

import type { Fetch } from "../src/client";
import {
  defineExtension,
  createSamvaClient,
  SamvaApiError,
  type ExtensionHandlers,
  type ExtensionManifest,
} from "../src/index";
import { createTestClient, mailboxEvent, runExtension } from "../src/test";
import { createWebhookHandler } from "../src/webhook";

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
  fetch = vi.fn<Fetch>(async () => Response.json({ state: "accepted" })),
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
  it("rejects an unlisted handler at runtime", () => {
    const on = { "mailbox.message.sent": async () => {} };
    expect(() =>
      defineExtension({ manifest, on: on as ExtensionHandlers<"mailbox.message.received"> }),
    ).toThrow("not listed");
  });
  it("constrains handler keys to manifest events", () => {
    const author = () =>
      defineExtension({
        manifest,
        on: {
          // @ts-expect-error sent is not in manifest.events
          "mailbox.message.sent": async () => {},
        },
      });
    expect(author).toThrow("not listed");
  });
  it("requires read permission", () => {
    expect(() =>
      defineExtension({ manifest: { ...manifest, permissions: ["send"] }, on: {} }),
    ).toThrow("read permission");
  });
  it("uses the hosted protocol, bound fetcher, and handler context", async () => {
    const fetch = vi.fn<Fetch>(async () => Response.json({ state: "accepted" }));
    const subject = extension({
      "mailbox.message.received": async (received, context) => {
        expect(context.event).toBe(received);
        expect(context.attempt).toBe(2);
        await context.samva.messages.reply(received.data.mailboxId, received.data.message.id, {
          text: "Thanks",
        });
      },
    });
    expect(await (await hosted(subject, fetch, 2)).json()).toEqual({ ok: true, logs: [] });
    const [url, init] = fetch.mock.calls[0]!;
    expect(String(url)).toBe(
      `https://api.samva.dev/v1/mailboxes/${event.data.mailboxId}/messages/${event.data.message.id}/reply`,
    );
    expect(init).toBeDefined();
    expect(new Headers(init?.headers).get("authorization")).toBeNull();
  });
  it("keeps the handler's log lines and leaves the console alone", async () => {
    const original = [console.log, console.info, console.warn, console.error];
    const subject = extension({
      "mailbox.message.received": async (_, { log }) => {
        expect([console.log, console.info, console.warn, console.error]).toEqual(original);
        log("explicit", { a: 1 });
      },
    });
    const response = await hosted(subject);
    expect(await response.json()).toEqual({ ok: true, logs: ['explicit {"a":1}'] });
  });

  it("returns handler errors", async () => {
    const original = console.log;
    const subject = extension({
      "mailbox.message.received": (_, { log }) => {
        log("before");
        throw new Error("boom");
      },
    });
    expect(await (await hosted(subject)).json()).toEqual({
      ok: false,
      error: "boom",
      logs: ["before"],
    });
    expect(console.log).toBe(original);
  });
  it("acknowledges unknown event types", async () => {
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
  it("keeps concurrent runs' logs apart and lets a later run pass a handler that never settles", async () => {
    const subject = extension({
      "mailbox.message.received": async (_, { attempt, log }) => {
        if (attempt === 3) return new Promise<void>(() => {});
        log(String(attempt));
        await Promise.resolve();
        log(String(attempt));
      },
    });
    void hosted(subject, undefined, 3);
    const results = await Promise.all([
      hosted(subject, undefined, 1),
      hosted(subject, undefined, 2),
    ]);
    expect(await results[0]!.json()).toEqual({ ok: true, logs: ["1", "1"] });
    expect(await results[1]!.json()).toEqual({ ok: true, logs: ["2", "2"] });
  });
});

describe("send idempotency", () => {
  it("replays stable per-method keys on retry and separates calls", async () => {
    const subject = extension({
      "mailbox.message.received": async (_, { samva }) => {
        await samva.messages.reply("mbx", "msg", { text: "one" });
        await samva.messages.reply("mbx", "msg", { text: "two" });
        await samva.messages.replyAll("mbx", "msg", { text: "all" });
        await samva.messages.forward("mbx", "msg", { to: ["a@example.com"], text: "forward" });
        await samva.messages.send("mbx", { to: ["a@example.com"], subject: "Hi", text: "new" });
      },
    });
    const client = createTestClient();
    const first = await runExtension(subject, event, { client });
    const second = await runExtension(subject, event, { client, attempt: 2 });
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
  it("honors an explicit key", async () => {
    const subject = extension({
      "mailbox.message.received": async (_, { samva }) => {
        await samva.messages.reply("mbx", "msg", { text: "hello" }, { idempotencyKey: "explicit" });
        await samva.messages.reply("mbx", "msg", { text: "next" });
      },
    });
    expect((await runExtension(subject, event)).calls.map((call) => call.idempotencyKey)).toEqual([
      "explicit",
      `${event.id}:reply:2`,
    ]);
  });
  it("generates UUIDs outside dispatch and supports custom generators", async () => {
    const client = createTestClient();
    await client.messages.reply("mbx", "msg", { text: "one" });
    await client.messages.reply("mbx", "msg", { text: "two" });
    expect(client.calls[0]?.idempotencyKey).toMatch(/^[0-9a-f-]{36}$/);
    expect(client.calls[0]?.idempotencyKey).not.toBe(client.calls[1]?.idempotencyKey);
    const fetch = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      expect(new Headers(init?.headers).get("idempotency-key")).toBe("custom-send");
      return Response.json({});
    });
    await createSamvaClient({
      fetch,
      baseUrl: "https://api.test",
      idempotency: (method) => `custom-${method}`,
    }).messages.send("mbx", { to: ["a@example.com"], subject: "Hi" });
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
  it("verifies, dispatches and authenticates API calls; redelivery replays the key", async () => {
    const keys: (string | null)[] = [];
    const fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      expect(String(input)).toContain("https://api.test/v1/mailboxes/");
      const headers = new Headers(init?.headers);
      expect(headers.get("x-api-key")).toBe("installation-key");
      keys.push(headers.get("idempotency-key"));
      return Response.json({});
    });
    const subject = extension({
      "mailbox.message.received": async (received, { samva, attempt }) => {
        expect(attempt).toBe(1);
        await samva.messages.reply(received.data.mailboxId, received.data.message.id, {
          text: "Thanks",
        });
      },
    });
    const handler = createWebhookHandler(subject, {
      apiKey: "installation-key",
      webhookSecret: secret,
      apiOrigin: "https://api.test",
      fetch,
    });
    for (let n = 0; n < 2; n++) {
      const response = await handler(await request());
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({ ok: true });
    }
    expect(keys).toEqual([`${event.id}:reply:1`, `${event.id}:reply:1`]);
  });
  it("dispatches a correctly signed sent event recorded without lifecycle fields", async () => {
    const older = mailboxEvent("mailbox.message.sent");
    const { state: _state, acceptedAt: _acceptedAt, ...data } = older.data;
    const { id, ...envelope } = older;
    const body = JSON.stringify({ ...envelope, data });
    const timestamp = String(Math.floor(Date.now() / 1000));
    const signature = await signWebhook({ body, id, timestamp, secret });
    const on = vi.fn();
    const handler = createWebhookHandler(
      defineExtension({
        manifest: { ...manifest, events: ["mailbox.message.sent"] },
        on: { "mailbox.message.sent": on },
      }),
      { apiKey: "key", webhookSecret: secret },
    );
    const response = await handler(
      new Request("https://extension.test", {
        method: "POST",
        body,
        headers: {
          "webhook-id": id,
          "webhook-timestamp": timestamp,
          "webhook-signature": signature,
        },
      }),
    );
    expect(response.status).toBe(200);
    expect(on).toHaveBeenCalledOnce();
    expect(on.mock.calls[0]?.[0]).toEqual({ ...older, data });
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

describe("mailbox API client", () => {
  it("maps structured API errors", async () => {
    const body = { _tag: "ForbiddenError", message: "No permission" };
    const client = createSamvaClient({
      fetch: async () => Response.json(body, { status: 403 }),
      baseUrl: "https://api.test",
    });
    await expect(client.messages.get("mbx", "msg")).rejects.toMatchObject({
      name: "SamvaApiError",
      status: 403,
      code: "ForbiddenError",
      message: "No permission",
      body,
    });
    await expect(client.messages.get("mbx", "msg")).rejects.toBeInstanceOf(SamvaApiError);
  });
  it("names an error by the API's `_tag`", async () => {
    for (const tag of ["ConflictError", "ValidationError"]) {
      const body = { _tag: tag, message: "Nope", fields: [{ path: "to", message: "Required" }] };
      const client = createSamvaClient({
        fetch: async () => Response.json(body, { status: 409 }),
        baseUrl: "https://api.test",
      });
      await expect(client.messages.get("mbx", "msg")).rejects.toMatchObject({
        status: 409,
        code: tag,
        message: "Nope",
        body,
      });
    }
  });
  it("preserves non-JSON errors", async () => {
    const client = createSamvaClient({
      fetch: async () => new Response("unavailable", { status: 503 }),
      baseUrl: "https://api.test",
    });
    await expect(client.messages.get("mbx", "msg")).rejects.toMatchObject({
      status: 503,
      body: "unavailable",
      message: "Samva API returned 503",
    });
  });
  it("uses the read/update endpoints, encoded query and configured headers", async () => {
    const calls: Request[] = [];
    const client = createSamvaClient({
      baseUrl: "https://api.test/",
      headers: { authorization: "Bearer local" },
      fetch: async (input, init) => {
        calls.push(new Request(input, init));
        return Response.json({ items: [] });
      },
    });
    await client.messages.get("mbx/a", "msg b");
    await client.threads.get("mbx", "tid");
    await client.threads.list("mbx", {
      limit: 10,
      unread: true,
      q: "hello world",
      after: event.timestamp,
    });
    await client.threads.messages("mbx", "tid");
    await client.threads.content("mbx", "tid", { limit: 5 });
    await client.threads.update("mbx", "tid", { read: true, snoozedUntil: event.timestamp });
    expect(calls.map((call) => `${call.method} ${new URL(call.url).pathname}`)).toEqual([
      "GET /v1/mailboxes/mbx%2Fa/messages/msg%20b",
      "GET /v1/mailboxes/mbx/threads/tid",
      "GET /v1/mailboxes/mbx/threads",
      "GET /v1/mailboxes/mbx/threads/tid/messages",
      "GET /v1/mailboxes/mbx/threads/tid/content",
      "PATCH /v1/mailboxes/mbx/threads/tid",
    ]);
    expect(new URL(calls[2]!.url).searchParams.get("q")).toBe("hello world");
    expect(new URL(calls[4]!.url).searchParams.get("limit")).toBe("5");
    expect(calls.every((call) => call.headers.get("authorization") === "Bearer local")).toBe(true);
    expect(await calls[5]!.json()).toEqual({ read: true, snoozedUntil: event.timestamp });
  });
  it("returns canned JSON and records send bodies", async () => {
    const client = createTestClient({
      "POST /v1/mailboxes/mbx/messages": {
        state: "approvalRequired",
        actionId: "act",
        threadId: "thread",
      },
    });
    expect(
      await client.messages.send("mbx", { to: ["a@example.com"], subject: "Hi", text: "hello" }),
    ).toMatchObject({ state: "approvalRequired" });
    expect(client.calls[0]).toMatchObject({
      method: "POST",
      path: "/v1/mailboxes/mbx/messages",
      body: { subject: "Hi", text: "hello" },
    });
  });
});

describe("action observation and recovery", () => {
  it("uses the original action identity without generating another send key", async () => {
    const fetch = vi.fn<Fetch>(async () => Response.json({ state: "queued" }, { status: 202 }));
    const client = createSamvaClient({ fetch, baseUrl: "https://api.samva.dev" });
    await client.actions.get("mbx/a", "action/b");
    await client.actions.cancel("mbx/a", "action/b");
    await client.actions.retry("mbx/a", "action/b");
    expect(fetch.mock.calls.map(([url, init]) => [String(url), init?.method])).toEqual([
      ["https://api.samva.dev/v1/mailboxes/mbx%2Fa/actions/action%2Fb", "GET"],
      ["https://api.samva.dev/v1/mailboxes/mbx%2Fa/actions/action%2Fb/cancel", "POST"],
      ["https://api.samva.dev/v1/mailboxes/mbx%2Fa/actions/action%2Fb/retry", "POST"],
    ]);
    for (const [, init] of fetch.mock.calls)
      expect(new Headers(init?.headers).get("idempotency-key")).toBeNull();
  });
  it("preserves an upstream retry header and typed action error body", async () => {
    const body = {
      _tag: "ConflictError",
      message: "Already accepted",
      actionId: "action",
      state: "accepted",
    };
    const client = createSamvaClient({
      fetch: async () => Response.json(body, { status: 409, headers: { "retry-after": "30" } }),
      baseUrl: "https://api.samva.dev",
    });
    await expect(client.actions.cancel("mbx", "action")).rejects.toMatchObject({
      status: 409,
      code: "ConflictError",
      body,
      retryAfter: "30",
    });
  });
});
