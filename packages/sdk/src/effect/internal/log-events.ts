import { Effect, Schema } from "effect";

import {
  EventStream,
  eventStreamUrl,
  type MailboxEventStreamOptions,
  readRefusalBody,
  refusalOutcome,
} from "../../mailbox-events";
import { LogLine } from "../generated/logs";
import { Service } from "./client";
import { streamEvents, toStreamError } from "./mailbox-events";

const LOG_EVENT_STREAM_PATH = "/v1/logs/events";
const StreamCursor = Schema.Struct({
  cursor: Schema.String.check(Schema.isPattern(/^(0|[1-9]\d{0,14})$/u)),
});
const decodeCursor = Schema.decodeUnknownPromise(StreamCursor);
const decodeEvent = Schema.decodeUnknownOption(
  Schema.Struct({
    data: LogLine,
    match: Schema.Struct({
      mailboxIds: Schema.Array(Schema.String),
      senderAddresses: Schema.Array(Schema.String),
      credential: Schema.String,
    }),
  }),
);

export type LogEventStreamOptions = Omit<MailboxEventStreamOptions, "mailboxIds" | "signal">;

export interface LogEvent {
  /** The WebSocket position used to replay. The line has its own cursor for list queries. */
  readonly cursor: string;
  readonly line: LogLine;
  readonly match: {
    readonly mailboxIds: ReadonlyArray<string>;
    readonly senderAddresses: ReadonlyArray<string>;
    readonly credential: string;
  };
}

/** Follow message log events, resuming within the stream's 72-hour replay window. */
export const events = (options: LogEventStreamOptions = {}) =>
  streamEvents(
    (connection) =>
      new EventStream<LogEvent>(connection, options, LOG_EVENT_STREAM_PATH, (frame) => {
        if (frame.event.type !== "log.line") return undefined;
        const payload = decodeEvent(frame.event);
        if (payload._tag === "None") return undefined;
        return { cursor: frame.cursor, line: payload.value.data, match: payload.value.match };
      }),
  );

/** Take a stream checkpoint before fetching history so the subsequent replay covers the handoff. */
export const streamCursor = (options: Pick<LogEventStreamOptions, "eventsUrl"> = {}) =>
  Effect.gen(function* () {
    const { connection } = yield* Service;
    return yield* Effect.tryPromise({
      try: async (signal) => {
        const url = eventStreamUrl(connection, options, LOG_EVENT_STREAM_PATH);
        url.protocol = url.protocol === "wss:" ? "https:" : "http:";
        url.searchParams.set("head", "1");
        const response = await (connection.fetch ?? fetch)(url, {
          headers:
            typeof connection.headers === "function"
              ? await connection.headers()
              : connection.headers,
          signal: AbortSignal.any([signal, AbortSignal.timeout(10_000)]),
        });
        if (!response.ok) {
          return {
            error: refusalOutcome({
              status: response.status,
              body: await readRefusalBody(response),
              retryAfterSeconds: undefined,
            }).error,
          };
        }
        return await decodeCursor(await response.json());
      },
      catch: toStreamError,
    }).pipe(
      Effect.flatMap((result) =>
        "error" in result
          ? Effect.fail(toStreamError(result.error))
          : Effect.succeed(result.cursor),
      ),
    );
  });
