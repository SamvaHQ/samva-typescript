/**
 * Stream pagination for the Effect SDK.
 *
 * Every list operation whose success value is a page envelope gains `.pages()`
 * and `.items()` companions on its domain operation. `.pages()` streams the raw
 * envelopes; `.items()` flattens them into a stream of items. Every list pages
 * by cursor, `{ items, nextCursor }`: each step passes the previous page's
 * `nextCursor` as `cursor`, and the walk stops at a null `nextCursor`.
 *
 * The traversal is **lazy**: built on `Stream.paginate` (a pull-based source),
 * so each page is fetched only as the stream is consumed — `Stream.take(n)`
 * stops requesting further pages. Caller params (the start `cursor`,
 * `limit`, filters) are respected; only the position is advanced per step.
 *
 * Retry is **not** re-applied here: the underlying domain operation is already
 * wrapped in the ambient {@link import("./retry").Service} policy (reads are
 * retry-safe), so each page fetch retries on its own and pagination composes
 * with retry instead of nesting retries.
 */
import { Effect, Option, Stream } from "effect";

/** The page envelope every list operation returns: `nextCursor` is null on the last page. */
export interface CursorPageEnvelope<Item> {
  readonly items: ReadonlyArray<Item>;
  readonly nextCursor: string | null;
}

/** A module list operation that pages by cursor. */
type CursorListOperation<Input, Item, E, R> = (
  input: Input,
) => Effect.Effect<CursorPageEnvelope<Item>, E, R>;

/** Honor a caller-supplied start `cursor`; default to the first page otherwise. */
const startCursorOf = (input: unknown): string | undefined => {
  const cursor = (input as { readonly cursor?: unknown } | null | undefined)?.cursor;
  return typeof cursor === "string" ? cursor : undefined;
};

/** Fetch the page at `cursor`, preserving all other caller params. */
const fetchCursorPage = <Input, Item, E, R>(
  operation: CursorListOperation<Input, Item, E, R>,
  input: Input,
  cursor: string | undefined,
): Effect.Effect<CursorPageEnvelope<Item>, E, R> =>
  operation({ ...(input as object), cursor } as Input);

/** Stream the raw cursor page envelopes, one per request, from the caller's start cursor. */
export const streamCursorPages = <Input, Item, E, R>(
  operation: CursorListOperation<Input, Item, E, R>,
  input: Input,
): Stream.Stream<CursorPageEnvelope<Item>, E, R> =>
  Stream.paginate(startCursorOf(input), (cursor: string | undefined) =>
    fetchCursorPage(operation, input, cursor).pipe(
      Effect.map((result) => [[result], Option.fromNullishOr(result.nextCursor)] as const),
    ),
  );

/** Stream individual items across cursor pages, fetching the next page only when pulled. */
export const streamCursorItems = <Input, Item, E, R>(
  operation: CursorListOperation<Input, Item, E, R>,
  input: Input,
): Stream.Stream<Item, E, R> =>
  Stream.paginate(startCursorOf(input), (cursor: string | undefined) =>
    fetchCursorPage(operation, input, cursor).pipe(
      Effect.map((result) => [result.items, Option.fromNullishOr(result.nextCursor)] as const),
    ),
  );
