import { Cause, Effect, Exit, Stream } from "effect";

import {
  type EventStream,
  type MailboxEventStreamConnection,
  MailboxEventStream,
  type MailboxEventStreamOptions,
  MailboxEventStreamError,
  type MailboxEventStreamFailure,
} from "../../mailbox-events";
import { Service } from "./client";

export const toStreamError = (cause: unknown): MailboxEventStreamFailure =>
  // A MailboxEventStreamError's `_tag` is one of the union's members.
  cause instanceof MailboxEventStreamError
    ? (cause as MailboxEventStreamFailure)
    : new MailboxEventStreamError({ _tag: "StreamDisconnectedError", message: String(cause) });

/**
 * The organization's mailbox events as a stream, resuming from `cursor`. An event counts as handled
 * once the stream is pulled again, or once it ends successfully after the event (as `Stream.take`
 * does); a failure or interruption leaves the event in hand unacknowledged, so a resume repeats it.
 * The stream fails with a {@link MailboxEventStreamFailure}, which `Effect.catchTag` narrows by the
 * `_tag` of the host's refusal.
 */
export const streamEvents = <Event extends { readonly cursor: string }>(
  open: (connection: MailboxEventStreamConnection) => EventStream<Event>,
): Stream.Stream<Event, MailboxEventStreamFailure, Service> =>
  Stream.scoped(
    Stream.unwrap(
      Effect.gen(function* () {
        const client = yield* Service;
        const stream = yield* Effect.acquireRelease(
          Effect.try({
            try: () => open(client.connection),
            catch: toStreamError,
          }),
          (opened, exit) =>
            Effect.sync(() => {
              if (Exit.isSuccess(exit)) opened.markHandled();
              opened.close();
            }),
        );
        const iterator = stream[Symbol.asyncIterator]();
        return Stream.fromEffectRepeat(
          Effect.tryPromise({ try: () => iterator.next(), catch: toStreamError }).pipe(
            Effect.flatMap((next) => (next.done ? Cause.done() : Effect.succeed(next.value))),
          ),
        );
      }),
    ),
  );

export const events = (options: Omit<MailboxEventStreamOptions, "signal"> = {}) =>
  streamEvents((connection) => new MailboxEventStream(connection, options));
