/**
 * The mailbox event stream: the `mailbox.*` events a webhook endpoint receives, delivered over a
 * WebSocket to a program that has no public URL for webhooks to reach.
 *
 * {@link MailboxEventStream} is an async iterable. The loop body handling an event is the
 * acknowledgement: asking for the next event marks the previous one handled, and the stream
 * resumes from the last handled event whenever it reconnects. Transient closes reconnect by
 * themselves, and a normal close (1000) from the host ends the loop after the events already
 * received; a close the caller has to act on ends the loop with a {@link MailboxEventStreamError}.
 *
 * This module has no runtime dependencies so the Promise and Effect clients share it.
 */

/** The WebSocket path on the events host. */
export const MAILBOX_EVENT_STREAM_PATH = "/v1/mailboxes/events";

/** Close codes the events host ends an accepted connection with. */
export const MailboxEventStreamCloseCode = {
  /** The client sent a frame that is not an acknowledgement of a cursor it was sent. */
  invalidFrame: 4400,
  /** The credential stopped authenticating: revoked, rotated, or expired. */
  unauthorized: 4401,
  /** The credential authenticates but may no longer read mailboxes. */
  forbidden: 4403,
  /** Mailboxes are unavailable to the organization. */
  gone: 4404,
  /** Too many events went unacknowledged. Reconnecting from the last handled cursor recovers. */
  slowConsumer: 4408,
  /** Events after the cursor are no longer retained. Read current state and start without one. */
  cursorExpired: 4410,
  /** Access could not be confirmed for a while. Reconnecting from the last cursor recovers. */
  accessUnavailable: 4503,
} as const;

/** The event types the stream carries: the `mailbox.*` webhook events. */
export type MailboxEventType =
  | "mailbox.message.received"
  | "mailbox.message.sent"
  | "mailbox.action.pending_approval"
  | "mailbox.action.resolved"
  | "mailbox.message.quarantined"
  | "mailbox.message.released"
  | "mailbox.message.discarded"
  | "mailbox.message.delivered"
  | "mailbox.message.read"
  | "mailbox.message.failed";

/** One event, as a webhook delivery of it would carry it, plus its stream position. */
export interface MailboxEvent {
  /** The stream position of this event. Persist it after handling to resume from here. */
  readonly cursor: string;
  /** The event id: the `webhook-id` a webhook delivery of the same event carries. */
  readonly id: string;
  readonly type: MailboxEventType;
  readonly timestamp: string;
  /** The event's `data`, exactly as the webhook body carries it. */
  readonly data: Readonly<Record<string, unknown>>;
}

/**
 * Why a stream ended, as the `_tag` of its {@link MailboxEventStreamError}. The first nine are the
 * API error tags the events host refuses with, or that a close code stands for. The rest are the
 * client's own: `StreamDisconnectedError` is a close, an idle timeout, or an unreachable host that
 * was not retried because `reconnect` is `false`, `StreamClientError` is a request this client could not make,
 * `StreamProtocolError` is a frame from the host it could not read, and `StreamRefusedError` is a refusal whose tag and status this client
 * does not know (`serverTag` carries the tag the host sent).
 */
export type MailboxEventStreamErrorTag =
  | "UnauthorizedError"
  | "ForbiddenError"
  | "ResourceNotFoundError"
  | "CursorExpiredError"
  | "ValidationError"
  | "UpgradeRequiredError"
  | "RateLimitedError"
  | "ServiceUnavailableError"
  | "MethodNotAllowedError"
  | "StreamDisconnectedError"
  | "StreamClientError"
  | "StreamProtocolError"
  | "StreamRefusedError";

/**
 * Why a {@link MailboxEventStreamError} ended a stream, when `_tag` alone does not say.
 * `idleTimeout`: the client heard no frame, not even a pong, for
 * {@link MAILBOX_EVENT_STREAM_IDLE_MILLIS}, so it closed the connection itself. No close code
 * accompanies it; a `closeCode` of `1006` is a close the client observed without a status.
 */
export type MailboxEventStreamErrorReason = "idleTimeout";

/** The refusal tags the events host answers with, keyed by the status that carries them. */
const REFUSAL_TAG_BY_STATUS: Readonly<Record<number, MailboxEventStreamErrorTag>> = {
  401: "UnauthorizedError",
  403: "ForbiddenError",
  404: "ResourceNotFoundError",
  405: "MethodNotAllowedError",
  410: "CursorExpiredError",
  422: "ValidationError",
  426: "UpgradeRequiredError",
  429: "RateLimitedError",
  503: "ServiceUnavailableError",
};

const REFUSAL_TAGS: ReadonlySet<string> = new Set(Object.values(REFUSAL_TAG_BY_STATUS));

/** Field-level validation messages, keyed by dotted path, as a `ValidationError` carries them. */
export type MailboxEventStreamErrorFields = Readonly<Record<string, ReadonlyArray<string>>>;

/**
 * A stream that ended. `_tag` names the cause and `message` says what to do next, as the host
 * wrote it when the host refused. Branch on `_tag`; in the Effect client the stream fails with
 * {@link MailboxEventStreamFailure}, which `Effect.catchTag` narrows by `_tag`.
 *
 * The stream retries by itself only where retrying can help: a transient close, an unreachable
 * host, a `408`, a `429`, or a `5xx`. Every other refusal ends it, so a caller never loops on a
 * request the host will keep refusing.
 */
export class MailboxEventStreamError<
  Tag extends MailboxEventStreamErrorTag = MailboxEventStreamErrorTag,
> extends Error {
  override readonly name = "MailboxEventStreamError";
  readonly _tag: Tag;
  /** The HTTP status, when the host refused the connection before accepting it. */
  readonly status: number | undefined;
  /** The WebSocket close code, when the host closed an accepted connection. */
  readonly closeCode: number | undefined;
  /** The last handled cursor; reconnect with it unless `_tag` is `CursorExpiredError`. */
  readonly cursor: string | undefined;
  /** A `ValidationError`'s field messages, such as `fields.cursor` or `fields.mailboxId`. */
  readonly fields: MailboxEventStreamErrorFields | undefined;
  /** How long a `RateLimitedError` or `ServiceUnavailableError` asked the caller to wait. */
  readonly retryAfterSeconds: number | undefined;
  /** The tag the host sent, when it is not one this client maps. */
  readonly serverTag: string | undefined;
  /** Set when the client ended the connection itself; see {@link MailboxEventStreamErrorReason}. */
  readonly reason: MailboxEventStreamErrorReason | undefined;

  constructor(input: {
    readonly _tag: Tag;
    readonly message: string;
    readonly status?: number | undefined;
    readonly closeCode?: number | undefined;
    readonly cursor?: string | undefined;
    readonly fields?: MailboxEventStreamErrorFields | undefined;
    readonly retryAfterSeconds?: number | undefined;
    readonly serverTag?: string | undefined;
    readonly reason?: MailboxEventStreamErrorReason | undefined;
  }) {
    super(input.message);
    this._tag = input._tag;
    this.status = input.status;
    this.closeCode = input.closeCode;
    this.cursor = input.cursor;
    this.fields = input.fields;
    this.retryAfterSeconds = input.retryAfterSeconds;
    this.serverTag = input.serverTag;
    this.reason = input.reason;
  }
}

/** Every stream error as a union over `_tag`, so `Effect.catchTag` can narrow it. */
export type MailboxEventStreamFailure = {
  [Tag in MailboxEventStreamErrorTag]: MailboxEventStreamError<Tag>;
}[MailboxEventStreamErrorTag];

/** The subset of the WebSocket API the stream uses. */
export interface MailboxEventStreamSocket {
  readonly readyState: number;
  send(data: string): void;
  close(code?: number, reason?: string): void;
  addEventListener(type: "open", listener: () => void): void;
  addEventListener(type: "message", listener: (event: { readonly data: unknown }) => void): void;
  addEventListener(type: "error", listener: () => void): void;
  addEventListener(
    type: "close",
    listener: (event: { readonly code: number; readonly reason: string }) => void,
  ): void;
}

/**
 * A WebSocket constructor that accepts request headers, as Node's, Bun's, and the `ws` package's
 * do. The stream authenticates the upgrade with the client's credential headers.
 */
export type MailboxEventStreamWebSocket = new (
  url: string,
  options: { readonly headers: Readonly<Record<string, string>> },
) => MailboxEventStreamSocket;

/** A reconnect the stream is about to make. */
export interface MailboxEventStreamReconnect {
  /** Why the connection ended: the error the stream would have ended with had it not retried. */
  readonly error: MailboxEventStreamError;
  /** The cursor the next connection resumes from; undefined when the stream started live and has none yet. */
  readonly cursor: string | undefined;
  /** Failed attempts in a row, starting at 1; a connection that went live resets it. */
  readonly attempt: number;
  /** How long the stream waits before connecting again. */
  readonly delayMillis: number;
}

export interface MailboxEventStreamOptions {
  /** Resume after this cursor: every retained event after it, then live. Omit to start live. */
  readonly cursor?: string | undefined;
  /** Only these mailboxes, within what the credential can read. Omit for every readable one. */
  readonly mailboxIds?: ReadonlyArray<string> | undefined;
  /** Ends the stream, as {@link MailboxEventStream.close} does. */
  readonly signal?: AbortSignal | undefined;
  /** Called each time replay has caught up and the stream is delivering live events. */
  readonly onLive?: (() => void) | undefined;
  /** Reconnect after transient closes. Defaults to `true`. */
  readonly reconnect?: boolean | undefined;
  /**
   * Called when a transient failure ends a connection and the stream is about to reconnect from
   * its last handled cursor, before the backoff wait. Never called when `reconnect` is `false`.
   */
  readonly onReconnect?: ((reconnect: MailboxEventStreamReconnect) => void) | undefined;
  /**
   * The events origin, such as `wss://events.samva.dev`. Defaults to the API origin with its
   * `api` host label replaced by `events`.
   */
  readonly eventsUrl?: string | undefined;
  /** Defaults to the runtime's global `WebSocket`. */
  readonly WebSocket?: MailboxEventStreamWebSocket | undefined;
}

/** What the stream needs from a configured client. */
export interface MailboxEventStreamConnection {
  readonly baseUrl: string;
  /** The credential and attribution headers every request of the client carries. */
  readonly headers:
    | Readonly<Record<string, string>>
    | (() => Promise<Readonly<Record<string, string>>>);
  readonly fetch?: typeof fetch | undefined;
}

const OPEN = 1;
/** The close code a host ends a finished stream with. */
const NORMAL_CLOSE = 1000;
/** Acknowledge after this many handled events, well inside the server's window of 256. */
const ACK_EVERY = 32;
const RETRY_BASE_MILLIS = 500;
const RETRY_MAX_MILLIS = 30_000;
/** The longest wait a host's `retryAfterSeconds` is honored for. */
const RETRY_AFTER_MAX_MILLIS = 300_000;
/** The largest refusal body read; the host's error bodies are a few hundred bytes. */
const REFUSAL_BODY_LIMIT = 64 * 1024;
/** The longest the diagnosing request and its body may take before the refusal is treated as retryable. */
const DIAGNOSE_TIMEOUT_MILLIS = 10_000;
/** The frame that asks the events host whether the connection is alive; pinned to the host's by a test. */
export const MAILBOX_EVENT_STREAM_PING_FRAME = '{"kind":"ping"}';
/** How often the stream sends a ping; pinned to the host's constant by a test. */
export const MAILBOX_EVENT_STREAM_PING_MILLIS = 30_000;
/**
 * How long a connection may stay silent before it is treated as dropped: three ping intervals, so
 * one late or lost pong does not reconnect. The host sends nothing on a quiet mailbox, so the
 * pong is the only proof of life; a socket that died without a close event is otherwise
 * indistinguishable from a quiet mailbox.
 */
export const MAILBOX_EVENT_STREAM_IDLE_MILLIS = 3 * MAILBOX_EVENT_STREAM_PING_MILLIS;

type Frame =
  | {
      readonly kind: "event";
      readonly cursor: string;
      readonly id: string;
      readonly event: { readonly type: string; readonly timestamp: string; readonly data: unknown };
    }
  | { readonly kind: "live" | "progress"; readonly cursor: string }
  | { readonly kind: "pong" };

// oxlint-disable samva/no-hand-rolled-object-guard -- Frames are checked field by field below; the stream has no runtime dependencies to decode them with.
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
// oxlint-enable samva/no-hand-rolled-object-guard

const frameText = (raw: unknown): string | undefined => {
  if (typeof raw === "string") return raw;
  if (raw instanceof ArrayBuffer || ArrayBuffer.isView(raw)) return new TextDecoder().decode(raw);
  return undefined;
};

const decodeFrame = (raw: unknown): Frame | undefined => {
  const text = frameText(raw);
  if (text === undefined) return undefined;
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return undefined;
  }
  if (isRecord(parsed) && parsed.kind === "pong") return { kind: "pong" };
  if (!isRecord(parsed) || typeof parsed.cursor !== "string") return undefined;
  if (parsed.kind === "live" || parsed.kind === "progress") {
    return { kind: parsed.kind, cursor: parsed.cursor };
  }
  if (parsed.kind !== "event" || typeof parsed.id !== "string" || !isRecord(parsed.event)) {
    return undefined;
  }
  const { type, timestamp, data } = parsed.event;
  if (typeof type !== "string" || typeof timestamp !== "string") return undefined;
  return { kind: "event", cursor: parsed.cursor, id: parsed.id, event: { type, timestamp, data } };
};

/** The events URL for an API origin: `https://api.samva.dev` → `wss://events.samva.dev/v1/…`. */
export const mailboxEventsUrl = (
  connection: Pick<MailboxEventStreamConnection, "baseUrl">,
  options: Pick<MailboxEventStreamOptions, "eventsUrl" | "cursor" | "mailboxIds">,
): URL => {
  const invalid = (message: string) =>
    new MailboxEventStreamError({ _tag: "StreamClientError", message });
  const url = URL.parse(options.eventsUrl ?? connection.baseUrl);
  if (url === null) throw invalid("The events origin is not a valid URL.");
  if (url.username !== "" || url.password !== "") {
    throw invalid("The events origin must not contain credentials.");
  }
  if (options.eventsUrl === undefined) {
    const labels = url.hostname.split(".");
    const api = labels.indexOf("api");
    if (api === -1) {
      throw invalid("The API origin has no `api` host label; pass `eventsUrl`.");
    }
    labels[api] = "events";
    url.hostname = labels.join(".");
  }
  if (url.protocol === "https:") url.protocol = "wss:";
  else if (url.protocol === "http:") url.protocol = "ws:";
  if (url.protocol !== "wss:" && url.protocol !== "ws:") {
    throw invalid("The events origin must be an http, https, ws, or wss URL.");
  }
  url.pathname = MAILBOX_EVENT_STREAM_PATH;
  url.search = "";
  url.hash = "";
  if (options.cursor !== undefined) url.searchParams.set("cursor", options.cursor);
  for (const id of options.mailboxIds ?? []) url.searchParams.append("mailboxId", id);
  return url;
};

const DESCRIPTION: Record<MailboxEventStreamErrorTag, string> = {
  UnauthorizedError: "The credential is not valid. Sign in again or use an active API key.",
  ForbiddenError: "The credential may not read mailbox events.",
  ResourceNotFoundError:
    "The mailbox event stream or a requested mailbox was not found; mailboxes may not be enabled for the organization.",
  CursorExpiredError:
    "Events after the cursor are no longer retained. Read current state from the API and start without a cursor.",
  ValidationError: "The stream request was not valid.",
  UpgradeRequiredError: "The events host expects a WebSocket upgrade.",
  RateLimitedError: "Too many streams are open. Close one or wait before connecting.",
  ServiceUnavailableError: "The events host could not confirm access. Retry shortly.",
  MethodNotAllowedError: "The events host accepts GET with a WebSocket upgrade.",
  StreamDisconnectedError: "The mailbox event stream disconnected.",
  StreamClientError: "The stream request could not be made.",
  StreamProtocolError: "The events host sent a frame this client does not understand.",
  StreamRefusedError: "The events host refused the connection.",
};

/** A failure and whether the stream may try again after it. */
interface Outcome {
  readonly error: MailboxEventStreamError;
  readonly retry: boolean;
  readonly retryAfterMillis?: number | undefined;
}

const outcomeOf = (
  _tag: MailboxEventStreamErrorTag,
  retry: boolean,
  detail: Omit<ConstructorParameters<typeof MailboxEventStreamError>[0], "_tag" | "message"> & {
    readonly message?: string | undefined;
  } = {},
): Outcome => {
  const { message, ...rest } = detail;
  return {
    retry,
    retryAfterMillis:
      detail.retryAfterSeconds === undefined
        ? undefined
        : Math.min(RETRY_AFTER_MAX_MILLIS, detail.retryAfterSeconds * 1000),
    error: new MailboxEventStreamError({ _tag, message: message ?? DESCRIPTION[_tag], ...rest }),
  };
};

/** What a close means for the stream: the error it ends with, and whether to retry first. */
const closeOutcome = (closeCode: number): Outcome => {
  switch (closeCode) {
    case MailboxEventStreamCloseCode.invalidFrame:
      return outcomeOf("StreamClientError", false, {
        closeCode,
        message: "The events host rejected a frame this client sent.",
      });
    case MailboxEventStreamCloseCode.unauthorized:
      return outcomeOf("UnauthorizedError", false, { closeCode });
    case MailboxEventStreamCloseCode.forbidden:
      return outcomeOf("ForbiddenError", false, { closeCode });
    case MailboxEventStreamCloseCode.gone:
      return outcomeOf("ResourceNotFoundError", false, { closeCode });
    case MailboxEventStreamCloseCode.cursorExpired:
      return outcomeOf("CursorExpiredError", false, { closeCode });
    case MailboxEventStreamCloseCode.accessUnavailable:
      return outcomeOf("ServiceUnavailableError", true, { closeCode });
    default:
      return outcomeOf("StreamDisconnectedError", true, { closeCode });
  }
};

/** A refused upgrade, as the plain GET that follows it read it. */
interface Refusal {
  readonly status: number;
  readonly body: unknown;
  readonly retryAfterSeconds: number | undefined;
}

const fieldsOf = (value: unknown): MailboxEventStreamErrorFields | undefined => {
  if (!isRecord(value)) return undefined;
  const fields: Record<string, ReadonlyArray<string>> = {};
  for (const [path, messages] of Object.entries(value)) {
    if (Array.isArray(messages)) {
      fields[path] = messages.filter((message): message is string => typeof message === "string");
    }
  }
  return fields;
};

/**
 * What a refusal means for the stream. Every 4xx except `408` and `429` ends it: the host will
 * keep refusing the same request. `5xx`, `408`, and `429` retry, after the delay the host asked
 * for when it asked for one.
 */
const refusalOutcome = (refusal: Refusal): Outcome => {
  const body = isRecord(refusal.body) ? refusal.body : {};
  const serverTag = typeof body._tag === "string" ? body._tag : undefined;
  const known = serverTag !== undefined && REFUSAL_TAGS.has(serverTag);
  const _tag: MailboxEventStreamErrorTag = known
    ? (serverTag as MailboxEventStreamErrorTag)
    : (REFUSAL_TAG_BY_STATUS[refusal.status] ?? "StreamRefusedError");
  const retryAfterSeconds =
    typeof body.retryAfterSeconds === "number" && body.retryAfterSeconds > 0
      ? body.retryAfterSeconds
      : refusal.retryAfterSeconds;
  const retry = refusal.status >= 500 || refusal.status === 408 || refusal.status === 429;
  return outcomeOf(_tag, retry, {
    status: refusal.status,
    message: typeof body.message === "string" ? body.message : undefined,
    fields: fieldsOf(body.fields),
    retryAfterSeconds,
    serverTag: known ? undefined : serverTag,
  });
};

/**
 * The runtime's WebSocket. The standard constructor's type omits the headers option Node and Bun
 * accept, so it is read as the narrower constructor the stream calls.
 */
const globalWebSocket = (): MailboxEventStreamWebSocket | undefined => {
  const candidate: unknown = Reflect.get(globalThis, "WebSocket");
  return typeof candidate === "function" ? (candidate as MailboxEventStreamWebSocket) : undefined;
};

const sleep = (millis: number, signal: AbortSignal) =>
  new Promise<void>((resolve) => {
    if (signal.aborted) return resolve();
    const timer = setTimeout(done, millis);
    function done() {
      clearTimeout(timer);
      signal.removeEventListener("abort", done);
      resolve();
    }
    signal.addEventListener("abort", done, { once: true });
  });

type Settled =
  | { readonly kind: "closed"; readonly code: number }
  | { readonly kind: "idle" }
  | { readonly kind: "refused" }
  | { readonly kind: "stopped" };

/**
 * A resumable stream of mailbox events. Iterate it with `for await`; break out of the loop or call
 * {@link close} to end it.
 */
export class MailboxEventStream implements AsyncIterable<MailboxEvent> {
  readonly #connection: MailboxEventStreamConnection;
  readonly #options: MailboxEventStreamOptions;
  readonly #stop = new AbortController();
  readonly #queue: MailboxEvent[] = [];
  #waiting: { resolve: () => void } | undefined;
  /** A reconnect waiting for the caller to drain what the last connection buffered. */
  #draining: { resolve: () => void } | undefined;
  #socket: MailboxEventStreamSocket | undefined;
  #error: MailboxEventStreamError | undefined;
  #ended = false;
  /** The caller ended the stream: nothing more is handed out, buffered or not. */
  #closed = false;
  #started = false;
  /** The caller's signal and the listener on it, detached once the stream ends. */
  #callerSignal: AbortSignal | undefined;
  readonly #onCallerAbort = () => this.close();
  /** The last event handed to the caller, handled once the caller asks for the next one. */
  #inHand: MailboxEvent | undefined;
  #cursor: string | undefined;
  #unacked = 0;

  constructor(connection: MailboxEventStreamConnection, options: MailboxEventStreamOptions = {}) {
    this.#connection = connection;
    this.#options = options;
    this.#cursor = options.cursor;
    // Fail before connecting when the URL cannot be built.
    mailboxEventsUrl(connection, options);
    if (options.signal?.aborted) this.close();
    else {
      this.#callerSignal = options.signal;
      options.signal?.addEventListener("abort", this.#onCallerAbort, { once: true });
    }
  }

  /**
   * The position to resume from: the last handled event's cursor, or a later position the
   * server confirmed with nothing in between for this stream. Undefined until there is one.
   */
  get cursor(): string | undefined {
    return this.#cursor;
  }

  /**
   * Mark the event in hand handled now, before asking for the next one: for a caller that stops
   * after handling it, so {@link close} acknowledges it and {@link cursor} moves past it.
   */
  markHandled(): void {
    this.#settleInHand();
  }

  /**
   * End the stream. Handled events are acknowledged; the event in hand is not, unless
   * {@link markHandled} was called, so a resume repeats it. A pending iteration finishes.
   */
  close(): void {
    // A stream that ended on its own can still hold buffered events; closing discards them.
    if (this.#closed) return;
    // The event in the caller's hands may not be handled: a throw or an abort ends the loop
    // mid-event. Only events the caller moved past are acknowledged, so a resume repeats it.
    this.#ack();
    this.#ended = true;
    this.#closed = true;
    this.#callerSignal?.removeEventListener("abort", this.#onCallerAbort);
    this.#socket?.close(1000);
    this.#stop.abort();
    this.#wake();
  }

  [Symbol.asyncIterator](): AsyncIterator<MailboxEvent> {
    return {
      next: () => this.#next(),
      return: async () => {
        this.close();
        return { done: true, value: undefined };
      },
    };
  }

  async #next(): Promise<IteratorResult<MailboxEvent>> {
    this.#settleInHand();
    if (!this.#started) {
      this.#started = true;
      this.#run().catch((cause: unknown) =>
        this.#fail(
          new MailboxEventStreamError({
            _tag: "StreamDisconnectedError",
            message: `The mailbox event stream failed: ${String(cause)}`,
            cursor: this.#cursor,
          }),
        ),
      );
    }
    for (;;) {
      // A failure still hands out what arrived before it; a caller's close does not.
      if (this.#closed) return { done: true, value: undefined };
      const event = this.#queue.shift();
      if (event !== undefined) {
        this.#inHand = event;
        return { done: false, value: event };
      }
      // Nothing buffered: let a waiting reconnect proceed, and acknowledge what was handled so
      // the server keeps sending.
      const draining = this.#draining;
      this.#draining = undefined;
      draining?.resolve();
      this.#ack();
      if (this.#error !== undefined) throw this.#errorAtCursor(this.#error);
      if (this.#ended) {
        // Buffered events are all handed out; the caller's signal no longer has anything to stop.
        this.#callerSignal?.removeEventListener("abort", this.#onCallerAbort);
        return { done: true, value: undefined };
      }
      // oxlint-disable-next-line eslint/no-await-in-loop -- waiting for the next frame is the iteration itself.
      await new Promise<void>((resolve) => {
        this.#waiting = { resolve };
      });
    }
  }

  /**
   * The failure as of the last handled event. Events buffered before the failure are still handed
   * out, so the cursor recorded when the connection ended can trail the one to resume from.
   */
  #errorAtCursor(error: MailboxEventStreamError) {
    if (error.cursor === this.#cursor) return error;
    return this.#withCursor(error);
  }

  #settleInHand() {
    if (this.#inHand === undefined) return;
    this.#cursor = this.#inHand.cursor;
    this.#inHand = undefined;
    this.#unacked += 1;
    if (this.#unacked >= ACK_EVERY) this.#ack();
  }

  #ack() {
    const socket = this.#socket;
    if (this.#unacked === 0 || this.#cursor === undefined || socket?.readyState !== OPEN) return;
    socket.send(JSON.stringify({ kind: "ack", cursor: this.#cursor }));
    this.#unacked = 0;
  }

  /** Where a new connection starts: after every event this stream already holds. */
  #resumeCursor() {
    return this.#queue.at(-1)?.cursor ?? this.#inHand?.cursor ?? this.#cursor;
  }

  #wake() {
    const waiting = this.#waiting;
    this.#waiting = undefined;
    waiting?.resolve();
  }

  #fail(error: MailboxEventStreamError) {
    if (this.#ended) return;
    this.#error = error;
    this.#ended = true;
    this.#callerSignal?.removeEventListener("abort", this.#onCallerAbort);
    this.#socket?.close(1000);
    this.#stop.abort();
    this.#wake();
  }

  async #run() {
    let attempt = 0;
    while (!this.#ended) {
      // Reconnect only once the caller has taken what the last connection buffered, so a reader
      // slower than its mail never holds more than one acknowledgement window of events.
      if (this.#queue.length > 0) {
        // oxlint-disable-next-line eslint/no-await-in-loop -- the next connection waits for the drain.
        await new Promise<void>((resolve) => {
          const done = () => {
            this.#stop.signal.removeEventListener("abort", done);
            resolve();
          };
          this.#draining = { resolve: done };
          this.#stop.signal.addEventListener("abort", done, { once: true });
        });
        if (this.#ended) return;
      }
      // oxlint-disable-next-line eslint/no-await-in-loop -- connections are sequential: one socket at a time.
      const outcome = await this.#connect(() => {
        attempt = 0;
      });
      if (this.#ended || outcome.kind === "stopped") return;
      // The host ends a finished stream with a normal close; the caller still gets what it buffered.
      if (outcome.kind === "closed" && outcome.code === NORMAL_CLOSE) {
        this.#finish();
        return;
      }
      let result: Outcome;
      if (outcome.kind === "closed") {
        result = closeOutcome(outcome.code);
      } else if (outcome.kind === "idle") {
        result = outcomeOf("StreamDisconnectedError", true, {
          reason: "idleTimeout",
          message: `No frame from the events host in ${MAILBOX_EVENT_STREAM_IDLE_MILLIS / 1000} seconds, so the stream closed the connection.`,
        });
      } else {
        // oxlint-disable-next-line eslint/no-await-in-loop -- the refusal decides whether this attempt is retried.
        const refusal = await this.#diagnose();
        result =
          refusal === undefined
            ? outcomeOf("StreamDisconnectedError", true)
            : refusalOutcome(refusal);
      }
      if (!result.retry || this.#options.reconnect === false) {
        this.#fail(this.#withCursor(result.error));
        return;
      }
      const backoff = Math.min(RETRY_MAX_MILLIS, RETRY_BASE_MILLIS * 2 ** attempt);
      attempt += 1;
      const delayMillis = result.retryAfterMillis ?? backoff / 2 + Math.random() * (backoff / 2);
      this.#options.onReconnect?.({
        error: this.#withCursor(result.error),
        cursor: this.#resumeCursor(),
        attempt,
        delayMillis,
      });
      // oxlint-disable-next-line eslint/no-await-in-loop -- backoff spaces sequential reconnect attempts.
      await sleep(delayMillis, this.#stop.signal);
    }
  }

  /** End the iteration after the buffered events, with no error. */
  #finish() {
    if (this.#ended) return;
    this.#ended = true;
    this.#stop.abort();
    this.#wake();
  }

  #withCursor(error: MailboxEventStreamError): MailboxEventStreamError {
    return new MailboxEventStreamError({ ...error, message: error.message, cursor: this.#cursor });
  }

  /** One connection, from upgrade to close. `onLive` runs once replay has caught up. */
  async #connect(onLive: () => void): Promise<Settled> {
    const headers =
      typeof this.#connection.headers === "function"
        ? await this.#connection.headers()
        : this.#connection.headers;
    if (this.#ended) return { kind: "stopped" };
    return new Promise<Settled>((resolve) => {
      const WebSocketImplementation = this.#options.WebSocket ?? globalWebSocket();
      if (WebSocketImplementation === undefined) {
        this.#fail(
          new MailboxEventStreamError({
            _tag: "StreamClientError",
            message: "This runtime has no WebSocket; pass one as the `WebSocket` option.",
          }),
        );
        return resolve({ kind: "stopped" });
      }
      const url = mailboxEventsUrl(this.#connection, {
        ...this.#options,
        cursor: this.#resumeCursor(),
      });
      let opened = false;
      let settled = false;
      let idleTimer: ReturnType<typeof setTimeout> | undefined;
      let pingTimer: ReturnType<typeof setInterval> | undefined;
      // Every frame, pongs included, proves the connection is alive. Silence past the deadline
      // closes the socket and takes the same path as a close with no status.
      const armIdle = () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          settle(opened ? { kind: "idle" } : { kind: "refused" });
          socket.close(1000);
        }, MAILBOX_EVENT_STREAM_IDLE_MILLIS);
      };
      const settle = (result: Settled) => {
        if (settled) return;
        settled = true;
        clearTimeout(idleTimer);
        clearInterval(pingTimer);
        this.#stop.signal.removeEventListener("abort", onStop);
        if (this.#socket === socket) this.#socket = undefined;
        resolve(result);
      };
      const onStop = () => settle({ kind: "stopped" });
      let socket: MailboxEventStreamSocket;
      try {
        socket = new WebSocketImplementation(url.toString(), {
          headers,
        });
      } catch (cause) {
        // A WebSocket without the headers option (a browser's) rejects the init object.
        this.#fail(
          new MailboxEventStreamError({
            _tag: "StreamClientError",
            message: `This runtime's WebSocket cannot send request headers; pass one that can as the \`WebSocket\` option. ${String(cause)}`,
            cursor: this.#cursor,
          }),
        );
        return resolve({ kind: "stopped" });
      }
      this.#socket = socket;
      this.#stop.signal.addEventListener("abort", onStop, { once: true });
      armIdle();
      socket.addEventListener("open", () => {
        opened = true;
        // The host sends nothing on a quiet mailbox; the ping makes it answer.
        pingTimer = setInterval(() => {
          if (socket.readyState === OPEN) socket.send(MAILBOX_EVENT_STREAM_PING_FRAME);
        }, MAILBOX_EVENT_STREAM_PING_MILLIS);
      });
      socket.addEventListener("message", (message) => {
        if (this.#ended) return;
        if (!settled) armIdle();
        const frame = decodeFrame(message.data);
        if (frame === undefined) {
          this.#fail(
            new MailboxEventStreamError({
              _tag: "StreamProtocolError",
              message: DESCRIPTION.StreamProtocolError,
              cursor: this.#cursor,
            }),
          );
          socket.close(1000);
          return;
        }
        if (frame.kind === "pong") return;
        if (frame.kind === "event") {
          this.#queue.push({
            cursor: frame.cursor,
            id: frame.id,
            type: frame.event.type as MailboxEventType,
            timestamp: frame.event.timestamp,
            data: isRecord(frame.event.data) ? frame.event.data : {},
          });
          this.#wake();
          return;
        }
        if (frame.kind === "live") {
          onLive();
          this.#options.onLive?.();
        }
        // Nothing is pending for this stream up to the frame's position, so resuming there skips
        // only events it would never receive.
        if (this.#queue.length === 0 && this.#inHand === undefined) {
          if (this.#cursor !== frame.cursor) this.#unacked += 1;
          this.#cursor = frame.cursor;
          this.#ack();
        }
      });
      socket.addEventListener("error", () => {
        // A close event follows and carries the outcome.
      });
      socket.addEventListener("close", (close) => {
        settle(opened ? { kind: "closed", code: close.code } : { kind: "refused" });
      });
    });
  }

  /**
   * Why an upgrade was refused. The events host answers a plain GET with the same refusal an
   * upgrade gets, so the status and the error body are readable even where the WebSocket API
   * hides them. Undefined when the host would have accepted (426) or could not be reached: both
   * are worth a retry.
   */
  async #diagnose(): Promise<Refusal | undefined> {
    const url = mailboxEventsUrl(this.#connection, {
      ...this.#options,
      cursor: this.#resumeCursor(),
    });
    url.protocol = url.protocol === "wss:" ? "https:" : "http:";
    // One deadline covers the request and its body: a proxy that sends headers and stalls the
    // body must not hold the reconnect loop.
    const deadline = new AbortController();
    const onStop = () => deadline.abort();
    this.#stop.signal.addEventListener("abort", onStop, { once: true });
    let timer: ReturnType<typeof setTimeout> | undefined;
    const expired = new Promise<undefined>((resolve) => {
      timer = setTimeout(() => {
        deadline.abort();
        resolve(undefined);
      }, DIAGNOSE_TIMEOUT_MILLIS);
    });
    const diagnosis = (async (): Promise<Refusal | undefined> => {
      try {
        const response = await (this.#connection.fetch ?? fetch)(url, {
          headers:
            typeof this.#connection.headers === "function"
              ? await this.#connection.headers()
              : this.#connection.headers,
          signal: deadline.signal,
        });
        if (response.status === 426) {
          await response.body?.cancel();
          return undefined;
        }
        const retryAfter = Number(response.headers.get("retry-after"));
        return {
          status: response.status,
          body: await readRefusalBody(response),
          retryAfterSeconds: Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : undefined,
        };
      } catch {
        return undefined;
      }
    })();
    try {
      return await Promise.race([diagnosis, expired]);
    } finally {
      clearTimeout(timer);
      this.#stop.signal.removeEventListener("abort", onStop);
    }
  }
}

/** The refusal's JSON body, or undefined when it is not JSON; reads at most {@link REFUSAL_BODY_LIMIT}. */
const readRefusalBody = async (response: Response): Promise<unknown> => {
  const reader = response.body?.getReader();
  if (reader === undefined) return undefined;
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (size < REFUSAL_BODY_LIMIT) {
      // oxlint-disable-next-line eslint/no-await-in-loop -- chunks are read in order, up to the limit.
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      size += value.byteLength;
    }
  } finally {
    await reader.cancel().catch(() => undefined);
  }
  const bytes = new Uint8Array(Math.min(size, REFUSAL_BODY_LIMIT));
  let offset = 0;
  for (const chunk of chunks) {
    const room = bytes.length - offset;
    if (room <= 0) break;
    bytes.set(chunk.subarray(0, room), offset);
    offset += Math.min(chunk.byteLength, room);
  }
  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return undefined;
  }
};
