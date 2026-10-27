import { describe, expect, expectTypeOf, it, vi } from "@effect/vitest";
import type { WebhookEventType } from "@samva/webhooks";
import { Effect, Fiber, Stream } from "effect";

import * as Client from "../src/effect/internal/client";
import { events } from "../src/effect/internal/mailbox-events";
import {
  MAILBOX_EVENT_STREAM_IDLE_MILLIS,
  MAILBOX_EVENT_STREAM_PING_MILLIS,
  MailboxEventStream,
  MailboxEventStreamCloseCode,
  MailboxEventStreamError,
  type MailboxEventStreamConnection,
  type MailboxEventStreamReconnect,
  type MailboxEventStreamSocket,
  type MailboxEventType,
  mailboxEventsUrl,
} from "../src/mailbox-events";
import { createClient } from "../src/promises";

type Listener = (event: never) => void;

/** The events host's answer to a ping. */
const PONG_FRAME = '{"kind":"pong"}';

/** A scripted socket: the test plays the events host. */
class FakeSocket implements MailboxEventStreamSocket {
  static instances: FakeSocket[] = [];
  readyState = 0;
  readonly sent: Array<{ kind: string; cursor?: string }> = [];
  readonly listeners = new Map<string, Listener[]>();
  closedByClient: number | undefined;

  constructor(
    readonly url: string,
    readonly options: { readonly headers: Readonly<Record<string, string>> },
  ) {
    FakeSocket.instances.push(this);
  }

  addEventListener(type: string, listener: Listener) {
    this.listeners.set(type, [...(this.listeners.get(type) ?? []), listener]);
  }

  send(data: string) {
    this.sent.push(JSON.parse(data));
  }

  close(code = 1000) {
    if (this.readyState === 3) return;
    this.closedByClient = code;
    this.readyState = 3;
    this.emit("close", { code, reason: "" });
  }

  emit(type: string, event: unknown) {
    for (const listener of this.listeners.get(type) ?? [])
      (listener as (e: unknown) => void)(event);
  }

  open() {
    this.readyState = 1;
    this.emit("open", {});
  }

  frame(frame: unknown) {
    this.emit("message", { data: JSON.stringify(frame) });
  }

  event(cursor: number, type: MailboxEventType = "mailbox.message.received") {
    this.frame({
      kind: "event",
      cursor: String(cursor),
      id: `whevt_${cursor}`,
      event: { type, timestamp: "2026-10-07T00:00:00.000Z", data: { mailboxId: "mbx_1" } },
    });
  }

  serverClose(code: number) {
    this.readyState = 3;
    this.emit("close", { code, reason: "" });
  }
}

/** Longer than the first retry's backoff. */
const RETRY_WINDOW_MILLIS = 1_000;

const connection = (
  fetch?: MailboxEventStreamConnection["fetch"],
): MailboxEventStreamConnection => ({
  baseUrl: "https://api.samva.dev",
  headers: { "x-api-key": "samva_sk_test" },
  fetch,
});

const open = (options: ConstructorParameters<typeof MailboxEventStream>[1] = {}) => {
  FakeSocket.instances = [];
  const stream = new MailboxEventStream(connection(), {
    WebSocket: FakeSocket,
    ...options,
  });
  return { stream, iterator: stream[Symbol.asyncIterator]() };
};

const socketAt = async (index: number) => {
  for (let tries = 0; tries < 200; tries++) {
    const socket = FakeSocket.instances[index];
    if (socket !== undefined) return socket;
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
  throw new Error(`no socket ${index}`);
};

describe("mailbox event stream", () => {
  it("uses a string Promise client key for the WebSocket upgrade", async () => {
    FakeSocket.instances = [];
    const client = createClient({ apiKey: "samva_sk_test" });
    const stream = client.mailboxes.events({ WebSocket: FakeSocket });
    const iterator = stream[Symbol.asyncIterator]();
    const next = iterator.next();
    const socket = await socketAt(0);
    expect(socket.options.headers["x-api-key"]).toBe("samva_sk_test");
    socket.open();
    socket.frame({ kind: "live", cursor: "0" });
    stream.close();
    await next;
  });

  it("carries the mailbox webhook event types", () => {
    expectTypeOf<MailboxEventType>().toEqualTypeOf<
      Extract<WebhookEventType, `mailbox.${string}`>
    >();
  });

  it("derives the events URL from the API origin", () => {
    expect(
      mailboxEventsUrl(
        { baseUrl: "https://api.samva.dev" },
        { cursor: "42", mailboxIds: ["mbx_1", "mbx_2"] },
      ).toString(),
    ).toBe("wss://events.samva.dev/v1/mailboxes/events?cursor=42&mailboxId=mbx_1&mailboxId=mbx_2");
    expect(
      mailboxEventsUrl({ baseUrl: "https://api.samva.dev" }, { eventsUrl: "http://localhost:8787" })
        .href,
    ).toBe("ws://localhost:8787/v1/mailboxes/events");
    expect(() => mailboxEventsUrl({ baseUrl: "https://samva.example" }, {})).toThrow(
      MailboxEventStreamError,
    );
  });

  it("yields events, acknowledges handled ones, and authenticates the upgrade", async () => {
    const { stream, iterator } = open({ mailboxIds: ["mbx_1"] });
    const first = iterator.next();
    const socket = await socketAt(0);
    expect(socket.options.headers).toEqual({ "x-api-key": "samva_sk_test" });
    expect(socket.url).toBe("wss://events.samva.dev/v1/mailboxes/events?mailboxId=mbx_1");
    socket.open();
    socket.event(1);
    socket.event(2);
    expect((await first).value).toMatchObject({
      cursor: "1",
      id: "whevt_1",
      type: "mailbox.message.received",
      data: { mailboxId: "mbx_1" },
    });
    // Not handled until the caller asks for the next event.
    expect(stream.cursor).toBeUndefined();
    expect((await iterator.next()).value?.cursor).toBe("2");
    expect(stream.cursor).toBe("1");
    const third = iterator.next();
    // Buffer drained: everything handled is acknowledged before waiting.
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(socket.sent).toEqual([{ kind: "ack", cursor: "2" }]);
    stream.close();
    expect(await third).toEqual({ done: true, value: undefined });
    expect(socket.closedByClient).toBe(1000);
  });

  it("reconnects after a transient close from the last event it holds", async () => {
    const { stream, iterator } = open({ cursor: "10" });
    const first = iterator.next();
    const socket = await socketAt(0);
    expect(new URL(socket.url).searchParams.get("cursor")).toBe("10");
    socket.open();
    socket.event(11);
    socket.event(12);
    expect((await first).value?.cursor).toBe("11");
    socket.serverClose(MailboxEventStreamCloseCode.accessUnavailable);
    // 12 arrived before the close; it is still delivered, and never asked for again.
    expect((await iterator.next()).value?.cursor).toBe("12");
    const third = iterator.next();
    const again = await socketAt(1);
    expect(new URL(again.url).searchParams.get("cursor")).toBe("12");
    again.open();
    again.event(13);
    expect((await third).value?.cursor).toBe("13");
    expect(stream.cursor).toBe("12");
    stream.close();
  });

  it("waits for the caller to drain buffered events before reconnecting", async () => {
    const { stream, iterator } = open();
    const first = iterator.next();
    const socket = await socketAt(0);
    socket.open();
    for (const cursor of [1, 2, 3]) socket.event(cursor);
    expect((await first).value?.cursor).toBe("1");
    socket.serverClose(MailboxEventStreamCloseCode.slowConsumer);
    // Past the longest backoff a first retry takes, still one socket: 2 and 3 are unread.
    await new Promise((resolve) => setTimeout(resolve, 700));
    expect(FakeSocket.instances).toHaveLength(1);
    expect((await iterator.next()).value?.cursor).toBe("2");
    expect((await iterator.next()).value?.cursor).toBe("3");
    const fourth = iterator.next();
    const again = await socketAt(1);
    expect(new URL(again.url).searchParams.get("cursor")).toBe("3");
    again.open();
    again.event(4);
    expect((await fourth).value?.cursor).toBe("4");
    stream.close();
  });

  it("keeps the idle deadline above the ping interval", () => {
    expect(MAILBOX_EVENT_STREAM_IDLE_MILLIS).toBeGreaterThan(MAILBOX_EVENT_STREAM_PING_MILLIS);
  });

  it("reconnects from the last cursor when the socket goes silent without a close", async () => {
    vi.useFakeTimers();
    try {
      FakeSocket.instances = [];
      const stream = new MailboxEventStream(connection(), { WebSocket: FakeSocket });
      const iterator = stream[Symbol.asyncIterator]();
      const first = iterator.next();
      await vi.advanceTimersByTimeAsync(0);
      const socket = FakeSocket.instances[0];
      socket?.open();
      socket?.event(1);
      expect((await first).value?.cursor).toBe("1");
      const second = iterator.next();
      // Each ping the stream sends is answered, which keeps the connection past the deadline.
      for (let beat = 1; beat <= 5; beat++) {
        await vi.advanceTimersByTimeAsync(MAILBOX_EVENT_STREAM_PING_MILLIS);
        expect(socket?.sent.filter((frame) => frame.kind === "ping")).toHaveLength(beat);
        socket?.emit("message", { data: PONG_FRAME });
      }
      expect(FakeSocket.instances).toHaveLength(1);
      // Then nothing arrives: no frame and no close event.
      await vi.advanceTimersByTimeAsync(MAILBOX_EVENT_STREAM_IDLE_MILLIS);
      expect(socket?.closedByClient).toBe(1000);
      await vi.advanceTimersByTimeAsync(RETRY_WINDOW_MILLIS);
      const again = FakeSocket.instances[1];
      expect(again).toBeDefined();
      expect(new URL(again?.url ?? "").searchParams.get("cursor")).toBe("1");
      again?.open();
      again?.event(2);
      expect((await second).value?.cursor).toBe("2");
      stream.close();
    } finally {
      vi.useRealTimers();
    }
  });

  it("ends with a disconnect error when a silent socket meets reconnect: false", async () => {
    vi.useFakeTimers();
    try {
      FakeSocket.instances = [];
      const stream = new MailboxEventStream(connection(), {
        WebSocket: FakeSocket,
        reconnect: false,
      });
      const first = stream[Symbol.asyncIterator]().next();
      const outcome = first.catch((cause: unknown) => cause);
      await vi.advanceTimersByTimeAsync(0);
      FakeSocket.instances[0]?.open();
      await vi.advanceTimersByTimeAsync(MAILBOX_EVENT_STREAM_IDLE_MILLIS);
      const error = await outcome;
      expect(error).toMatchObject({
        _tag: "StreamDisconnectedError",
        reason: "idleTimeout",
        closeCode: undefined,
      });
      expect((error as Error).message).toContain(
        `${MAILBOX_EVENT_STREAM_IDLE_MILLIS / 1000} seconds`,
      );
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });

  it("tells a reconnect hook why the connection ended and where it resumes", async () => {
    const reconnects: MailboxEventStreamReconnect[] = [];
    const { stream, iterator } = open({
      cursor: "10",
      onReconnect: (reconnect) => reconnects.push(reconnect),
    });
    const first = iterator.next();
    const socket = await socketAt(0);
    socket.open();
    socket.event(11);
    expect((await first).value?.cursor).toBe("11");
    const second = iterator.next();
    socket.serverClose(1006);
    const again = await socketAt(1);
    again.open();
    again.event(12);
    expect((await second).value?.cursor).toBe("12");
    expect(reconnects).toHaveLength(1);
    expect(reconnects[0]).toMatchObject({
      attempt: 1,
      cursor: "11",
      error: { _tag: "StreamDisconnectedError", closeCode: 1006, reason: undefined },
    });
    stream.close();
  });

  it("hands out buffered events, then finishes, when the host closes normally", async () => {
    const onReconnect = vi.fn();
    const { iterator } = open({ onReconnect });
    const first = iterator.next();
    const socket = await socketAt(0);
    socket.open();
    socket.event(1);
    socket.event(2);
    socket.serverClose(1000);
    expect((await first).value?.cursor).toBe("1");
    expect((await iterator.next()).value?.cursor).toBe("2");
    expect((await iterator.next()).done).toBe(true);
    expect(FakeSocket.instances).toHaveLength(1);
    expect(onReconnect).not.toHaveBeenCalled();
  });

  it("lets the caller close a finished stream before its buffered events are handed out", async () => {
    const { stream, iterator } = open();
    const first = iterator.next();
    const socket = await socketAt(0);
    socket.open();
    socket.event(1);
    socket.event(2);
    socket.serverClose(1000);
    expect((await first).value?.cursor).toBe("1");
    stream.close();
    expect((await iterator.next()).done).toBe(true);
  });

  it("does not call the reconnect hook when reconnect is off", async () => {
    const onReconnect = vi.fn();
    const { iterator } = open({ reconnect: false, onReconnect });
    const first = iterator.next().catch((cause: unknown) => cause);
    const socket = await socketAt(0);
    socket.open();
    socket.serverClose(1006);
    expect(await first).toMatchObject({ _tag: "StreamDisconnectedError", closeCode: 1006 });
    expect(onReconnect).not.toHaveBeenCalled();
  });

  it("leaves no abort listener behind after a reconnect waits for the drain", async () => {
    const signal = new AbortController().signal;
    // The stream's internal signal is not reachable, so count abort listeners on every signal.
    const add = AbortSignal.prototype.addEventListener;
    const remove = AbortSignal.prototype.removeEventListener;
    const live = new Set<unknown>();
    AbortSignal.prototype.addEventListener = function (
      this: AbortSignal,
      ...[type, listener, options]: Parameters<AbortSignal["addEventListener"]>
    ) {
      if (type === "abort") live.add(listener);
      return add.call(this, type, listener, options);
    };
    AbortSignal.prototype.removeEventListener = function (
      this: AbortSignal,
      ...[type, listener, options]: Parameters<AbortSignal["removeEventListener"]>
    ) {
      if (type === "abort") live.delete(listener);
      return remove.call(this, type, listener, options);
    };
    try {
      const { stream, iterator } = open({ signal });
      const baseline = live.size;
      const first = iterator.next();
      const socket = await socketAt(0);
      socket.open();
      for (const cursor of [1, 2]) socket.event(cursor);
      expect((await first).value?.cursor).toBe("1");
      socket.serverClose(MailboxEventStreamCloseCode.slowConsumer);
      // Event 2 stays unread past the backoff, so the reconnect waits for the drain.
      await new Promise((resolve) => setTimeout(resolve, 700));
      expect(FakeSocket.instances).toHaveLength(1);
      expect((await iterator.next()).value?.cursor).toBe("2");
      const third = iterator.next();
      const again = await socketAt(1);
      again.open();
      again.event(3);
      expect((await third).value?.cursor).toBe("3");
      // The drain wait resolved: only the live connection's stop listener is added to the baseline.
      expect(live.size).toBe(baseline + 1);
      stream.close();
    } finally {
      AbortSignal.prototype.addEventListener = add;
      AbortSignal.prototype.removeEventListener = remove;
    }
  });

  it("hands out nothing more once the caller closes, even with events buffered", async () => {
    const { stream, iterator } = open();
    const first = iterator.next();
    const socket = await socketAt(0);
    socket.open();
    socket.event(1);
    socket.event(2);
    await first;
    stream.close();
    expect(await iterator.next()).toEqual({ done: true, value: undefined });
  });

  it("ends with the error a terminal close calls for", async () => {
    const { iterator } = open({ cursor: "5" });
    const first = iterator.next();
    const socket = await socketAt(0);
    socket.open();
    socket.serverClose(MailboxEventStreamCloseCode.cursorExpired);
    const error = await first.catch((cause: unknown) => cause);
    expect(error).toBeInstanceOf(MailboxEventStreamError);
    expect(error).toMatchObject({ _tag: "CursorExpiredError", closeCode: 4410, cursor: "5" });
  });

  it("reports the last handled cursor after draining events buffered before a terminal close", async () => {
    const { iterator } = open({ cursor: "5" });
    const first = iterator.next();
    const socket = await socketAt(0);
    socket.open();
    socket.event(6);
    socket.serverClose(MailboxEventStreamCloseCode.forbidden);
    expect((await first).value?.cursor).toBe("6");
    const error = await iterator.next().catch((cause: unknown) => cause);
    expect(error).toMatchObject({ _tag: "ForbiddenError", closeCode: 4403, cursor: "6" });
  });

  /** Open a stream whose every upgrade is refused, and whose diagnosing GETs answer `answer`. */
  const refused = (
    answer: () => Response,
    options: ConstructorParameters<typeof MailboxEventStream>[1] = {},
  ) => {
    const requests: string[] = [];
    FakeSocket.instances = [];
    const stream = new MailboxEventStream(
      connection(async (input) => {
        requests.push(String(input));
        return answer();
      }),
      { WebSocket: FakeSocket, ...options },
    );
    return { stream, iterator: stream[Symbol.asyncIterator](), requests };
  };

  it.each([
    [401, "UnauthorizedError"],
    [402, "StreamRefusedError"],
    [403, "ForbiddenError"],
    [404, "ResourceNotFoundError"],
    [405, "MethodNotAllowedError"],
    [410, "CursorExpiredError"],
    [422, "ValidationError"],
  ])("ends on a %s refusal as %s without retrying", async (status, tag) => {
    const { iterator, requests } = refused(
      () =>
        Response.json(
          {
            _tag: tag === "StreamRefusedError" ? "PaymentRequiredError" : tag,
            message: "Do this.",
          },
          { status },
        ),
      { cursor: "9" },
    );
    const first = iterator.next();
    (await socketAt(0)).serverClose(1006);
    const error = await first.catch((cause: unknown) => cause);
    expect(error).toBeInstanceOf(MailboxEventStreamError);
    expect(error).toMatchObject({ _tag: tag, status, message: "Do this.", cursor: "9" });
    if (tag === "StreamRefusedError")
      expect(error).toMatchObject({ serverTag: "PaymentRequiredError" });
    expect(requests).toHaveLength(1);
    await new Promise((resolve) => setTimeout(resolve, 700));
    expect(FakeSocket.instances).toHaveLength(1);
  });

  it("carries a validation refusal's field messages", async () => {
    const { iterator } = refused(() =>
      Response.json(
        {
          _tag: "ValidationError",
          message: "Fix the cursor.",
          fields: { cursor: ["Pass a cursor from an event."], mailboxId: ["Not a mailbox id."] },
        },
        { status: 422 },
      ),
    );
    const first = iterator.next();
    (await socketAt(0)).serverClose(1006);
    expect(await first.catch((cause: unknown) => cause)).toMatchObject({
      _tag: "ValidationError",
      status: 422,
      fields: { cursor: ["Pass a cursor from an event."], mailboxId: ["Not a mailbox id."] },
    });
  });

  it("maps a refusal without an API error body by its status", async () => {
    const { iterator } = refused(() => new Response("<html>nope</html>", { status: 403 }));
    const first = iterator.next();
    (await socketAt(0)).serverClose(1006);
    expect(await first.catch((cause: unknown) => cause)).toMatchObject({
      _tag: "ForbiddenError",
      status: 403,
    });
  });

  it.each([
    [429, "RateLimitedError"],
    [503, "ServiceUnavailableError"],
  ])("waits out the retryAfterSeconds of a %s refusal, then reconnects", async (status, tag) => {
    let answers = 0;
    const { stream, iterator } = refused(() => {
      answers += 1;
      return Response.json({ _tag: tag, message: "Slow down.", retryAfterSeconds: 1 }, { status });
    });
    const first = iterator.next();
    (await socketAt(0)).serverClose(1006);
    await new Promise((resolve) => setTimeout(resolve, 500));
    // The base backoff alone would have reconnected by now.
    expect(FakeSocket.instances).toHaveLength(1);
    const second = await socketAt(1);
    expect(answers).toBe(1);
    second.open();
    second.event(1);
    expect((await first).value?.cursor).toBe("1");
    stream.close();
  });

  it("reports a retryable refusal with its tag when reconnect is off", async () => {
    const { iterator } = refused(
      () =>
        Response.json(
          { _tag: "RateLimitedError", message: "Wait.", retryAfterSeconds: 4 },
          { status: 429 },
        ),
      { reconnect: false },
    );
    const first = iterator.next();
    (await socketAt(0)).serverClose(1006);
    expect(await first.catch((cause: unknown) => cause)).toMatchObject({
      _tag: "RateLimitedError",
      status: 429,
      retryAfterSeconds: 4,
    });
  });

  it("retries a 5xx or an unreachable host, and an upgrade the host would accept", async () => {
    for (const answer of [
      () => new Response("bad gateway", { status: 502 }),
      () => new Response(null, { status: 426 }),
      () => {
        throw new TypeError("fetch failed");
      },
    ]) {
      const { stream, iterator } = refused(answer);
      const first = iterator.next();
      (await socketAt(0)).serverClose(1006);
      const again = await socketAt(1);
      again.open();
      again.event(1);
      expect((await first).value?.cursor).toBe("1");
      stream.close();
    }
  });

  it("retries when a refusal's body stalls past the diagnostic deadline", async () => {
    vi.useFakeTimers();
    try {
      FakeSocket.instances = [];
      const stalled = new ReadableStream<Uint8Array>({ start: () => undefined });
      const stream = new MailboxEventStream(
        connection(async () => new Response(stalled, { status: 502 })),
        { WebSocket: FakeSocket },
      );
      const first = stream[Symbol.asyncIterator]().next();
      await vi.advanceTimersByTimeAsync(0);
      FakeSocket.instances[0]?.serverClose(1006);
      await vi.advanceTimersByTimeAsync(10_000);
      await vi.advanceTimersByTimeAsync(30_000);
      const again = FakeSocket.instances[1];
      expect(again).toBeDefined();
      again?.open();
      again?.event(1);
      expect((await first).value?.cursor).toBe("1");
      stream.close();
    } finally {
      vi.useRealTimers();
    }
  });

  it.each([
    [4400, "StreamClientError"],
    [4401, "UnauthorizedError"],
    [4403, "ForbiddenError"],
    [4404, "ResourceNotFoundError"],
    [4410, "CursorExpiredError"],
  ])("ends on close %s as %s", async (closeCode, tag) => {
    const { iterator } = open();
    const first = iterator.next();
    const socket = await socketAt(0);
    socket.open();
    socket.serverClose(closeCode);
    expect(await first.catch((cause: unknown) => cause)).toMatchObject({ _tag: tag, closeCode });
  });

  it.each([
    MailboxEventStreamCloseCode.slowConsumer,
    MailboxEventStreamCloseCode.accessUnavailable,
  ])("resumes from the last cursor after close %s", async (closeCode) => {
    const { stream, iterator } = open();
    const first = iterator.next();
    const socket = await socketAt(0);
    socket.open();
    socket.event(1);
    expect((await first).value?.cursor).toBe("1");
    const second = iterator.next();
    socket.serverClose(closeCode);
    const again = await socketAt(1);
    expect(new URL(again.url).searchParams.get("cursor")).toBe("1");
    again.open();
    again.event(2);
    expect((await second).value?.cursor).toBe("2");
    stream.close();
  });

  it("passes the cursor through opaque and filters with mailboxId", async () => {
    const { stream, iterator } = open({ cursor: "evc_Zm9v/bar+1", mailboxIds: ["mbx_1", "mbx_2"] });
    void iterator.next();
    const url = new URL((await socketAt(0)).url);
    expect(url.searchParams.get("cursor")).toBe("evc_Zm9v/bar+1");
    expect(url.searchParams.getAll("mailboxId")).toEqual(["mbx_1", "mbx_2"]);
    stream.close();
  });

  it("ends with a protocol error on a frame it cannot read", async () => {
    const { iterator } = open();
    const first = iterator.next();
    const socket = await socketAt(0);
    socket.open();
    socket.frame({ kind: "unknown", cursor: "1" });
    expect(await first.catch((cause: unknown) => cause)).toMatchObject({
      _tag: "StreamProtocolError",
    });
  });

  it("rejects an events origin with credentials", () => {
    expect(() =>
      mailboxEventsUrl(
        { baseUrl: "https://api.samva.dev" },
        { eventsUrl: "wss://key@example.com" },
      ),
    ).toThrow(MailboxEventStreamError);
  });

  it("calls onLive when replay catches up", async () => {
    let live = 0;
    const { stream, iterator } = open({ onLive: () => (live += 1) });
    void iterator.next();
    const socket = await socketAt(0);
    socket.open();
    socket.frame({ kind: "live", cursor: "3" });
    expect(live).toBe(1);
    stream.close();
  });

  it("reports a transient close instead of retrying when reconnect is off", async () => {
    const { iterator } = open({ reconnect: false });
    const first = iterator.next();
    const socket = await socketAt(0);
    socket.open();
    socket.serverClose(MailboxEventStreamCloseCode.slowConsumer);
    expect(await first.catch((cause: unknown) => cause)).toMatchObject({
      _tag: "StreamDisconnectedError",
      closeCode: 4408,
    });
  });

  it("advances to a live frame's position only when nothing is pending", async () => {
    const { stream, iterator } = open();
    const first = iterator.next();
    const socket = await socketAt(0);
    socket.open();
    socket.frame({ kind: "live", cursor: "7" });
    expect(stream.cursor).toBe("7");
    expect(socket.sent).toEqual([{ kind: "ack", cursor: "7" }]);
    socket.event(9);
    await first;
    socket.frame({ kind: "live", cursor: "12" });
    // Event 9 is in hand, so the live frame cannot move past it.
    expect(stream.cursor).toBe("7");
    // Closing mid-event does not mark it handled: a resume repeats it.
    stream.close();
    expect(stream.cursor).toBe("7");
  });

  it("advances to a progress frame's position without calling onLive", async () => {
    let live = 0;
    const { stream, iterator } = open({ onLive: () => (live += 1) });
    void iterator.next();
    const socket = await socketAt(0);
    socket.open();
    socket.frame({ kind: "progress", cursor: "9" });
    expect(stream.cursor).toBe("9");
    expect(live).toBe(0);
    stream.close();
  });

  it("takes a pong as proof of life, not as an event or a position", async () => {
    const { stream, iterator } = open();
    const first = iterator.next();
    const socket = await socketAt(0);
    socket.open();
    socket.frame({ kind: "live", cursor: "7" });
    socket.emit("message", { data: PONG_FRAME });
    expect(stream.cursor).toBe("7");
    expect(socket.sent).toEqual([{ kind: "ack", cursor: "7" }]);
    socket.event(8);
    expect((await first).value?.cursor).toBe("8");
    stream.close();
  });

  it("ends with an error when the runtime's WebSocket cannot take request headers", async () => {
    // A browser's WebSocket reads the init object as a subprotocol and throws.
    class HeaderlessSocket extends FakeSocket {
      constructor(url: string, options: { readonly headers: Readonly<Record<string, string>> }) {
        super(url, options);
        throw new SyntaxError("invalid subprotocol");
      }
    }
    const stream = new MailboxEventStream(connection(), { WebSocket: HeaderlessSocket });
    const error = await stream[Symbol.asyncIterator]()
      .next()
      .catch((cause: unknown) => cause);
    expect(error).toMatchObject({ _tag: "StreamClientError" });
  });

  it("ends when its signal aborts, and when the loop breaks", async () => {
    const controller = new AbortController();
    const { iterator } = open({ signal: controller.signal });
    const first = iterator.next();
    const socket = await socketAt(0);
    socket.open();
    controller.abort();
    expect(await first).toEqual({ done: true, value: undefined });

    const { stream } = open();
    const pending = (async () => {
      for await (const event of stream) return event.cursor;
      return undefined;
    })();
    const next = await socketAt(0);
    next.open();
    next.event(3);
    expect(await pending).toBe("3");
    expect(next.closedByClient).toBe(1000);
  });
});

describe("mailbox event stream signal", () => {
  it("detaches from a long-lived signal once the stream ends", async () => {
    const controller = new AbortController();
    const removed = vi.spyOn(controller.signal, "removeEventListener");
    FakeSocket.instances = [];
    const stream = new MailboxEventStream(connection(), {
      WebSocket: FakeSocket,
      signal: controller.signal,
    });
    const first = stream[Symbol.asyncIterator]().next();
    (await socketAt(0)).open();
    stream.close();
    await first;
    expect(removed).toHaveBeenCalledWith("abort", expect.any(Function));
  });
});

describe("mailbox event stream for Effect", () => {
  it.effect("streams events through the client's connection", () =>
    Effect.gen(function* () {
      FakeSocket.instances = [];
      const fiber = yield* events({ WebSocket: FakeSocket }).pipe(
        Stream.take(2),
        Stream.runCollect,
        Effect.forkChild,
      );
      const socket = yield* Effect.promise(() => socketAt(0));
      expect(socket.url).toBe("wss://events.samva.dev/v1/mailboxes/events");
      expect(socket.options.headers).toMatchObject({
        "x-api-key": "samva_sk_test",
        "x-samva-client": expect.stringMatching(/^typescript-effect\//),
      });
      socket.open();
      socket.event(1);
      socket.event(2, "mailbox.message.discarded");
      socket.event(3);
      const collected = yield* Fiber.join(fiber);
      expect(Array.from(collected).map((event) => [event.cursor, event.type])).toEqual([
        ["1", "mailbox.message.received"],
        ["2", "mailbox.message.discarded"],
      ]);
      expect(socket.closedByClient).toBe(1000);
      // `take` ended the stream successfully after the second event: it counts as handled.
      expect(socket.sent.at(-1)).toEqual({ kind: "ack", cursor: "2" });
    }).pipe(Effect.provide(Client.layerFetch({ apiKey: "samva_sk_test" }))),
  );

  it.effect("fails with an error Effect.catchTag narrows by the host's tag", () =>
    Effect.gen(function* () {
      FakeSocket.instances = [];
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async () =>
        Response.json(
          {
            _tag: "ValidationError",
            message: "Fix the cursor.",
            fields: { cursor: ["Pass a cursor from an event."] },
          },
          { status: 422 },
        ),
      );
      yield* Effect.addFinalizer(() => Effect.sync(() => fetchSpy.mockRestore()));
      const fiber = yield* events({ WebSocket: FakeSocket }).pipe(
        Stream.runCollect,
        Effect.catchTag("ValidationError", (error) => Effect.succeed(error.fields?.cursor ?? [])),
        Effect.forkChild,
      );
      const socket = yield* Effect.promise(() => socketAt(0));
      socket.serverClose(1006);
      expect(yield* Fiber.join(fiber)).toEqual(["Pass a cursor from an event."]);
    }).pipe(Effect.scoped, Effect.provide(Client.layerFetch({ apiKey: "samva_sk_test" }))),
  );

  it("types the stream's failure as a union over _tag", () => {
    type Failure = Stream.Error<ReturnType<typeof events>>;
    expectTypeOf<Extract<Failure, { _tag: "CursorExpiredError" }>>().not.toBeNever();
    expectTypeOf<
      Extract<Failure, { _tag: "RateLimitedError" }>["retryAfterSeconds"]
    >().toEqualTypeOf<number | undefined>();
  });
});
