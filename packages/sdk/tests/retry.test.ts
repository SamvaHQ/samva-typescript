import { describe, expect, it } from "@effect/vitest";
import { Duration, Effect, Fiber, Layer, Ref } from "effect";
import { HttpClient, HttpClientResponse, type HttpClientRequest } from "effect/http";
import { TestClock } from "effect/testing";

import { ConflictError, InternalError, RateLimitedError, ValidationError } from "../src/effect";
import * as Client from "../src/effect/client";
import * as Contacts from "../src/effect/contacts";
import * as Email from "../src/effect/email";
import * as Messages from "../src/effect/messages";
import * as Retry from "../src/effect/retry";

/**
 * Retry default policy + module-operation idempotency keys, driven by `TestClock`.
 * The policy is exercised directly through {@link withRetry} for timing and
 * attempt-bound assertions, and through the public modules for the
 * auto-generated `Idempotency-Key` header and the never-retry rules.
 */

// A failing effect that records its attempt count in `attempts`. The `n`-th
// invocation fails with `failures[n-1]`; once the list is exhausted it succeeds.
const scripted = (attempts: Ref.Ref<number>, failures: ReadonlyArray<unknown>) =>
  Effect.suspend(() =>
    Ref.updateAndGet(attempts, (n) => n + 1).pipe(
      Effect.flatMap((n) =>
        n <= failures.length ? Effect.fail(failures[n - 1]) : Effect.succeed("ok" as const),
      ),
    ),
  );

describe("Retry default policy", () => {
  it.effect("retries a 429 after its retryAfterSeconds hint (~2s) and succeeds", () =>
    Effect.gen(function* () {
      const attempts = yield* Ref.make(0);
      const op = scripted(attempts, [
        new RateLimitedError({
          message: "Send rate limit reached. Retry after the requested delay.",
          retryAfterSeconds: 2,
        }),
      ]);

      const fiber = yield* Effect.forkChild(Retry.withRetry(op), {
        startImmediately: true,
      });

      // Before the 2s server hint elapses, the retry has not fired.
      yield* TestClock.adjust(Duration.millis(1900));
      expect(yield* Ref.get(attempts)).toBe(1);

      // Crossing 2s triggers the single retry, which succeeds.
      yield* TestClock.adjust(Duration.millis(100));
      const result = yield* Fiber.join(fiber);
      expect(result).toBe("ok");
      expect(yield* Ref.get(attempts)).toBe(2);
    }),
  );

  it.effect("retries a transient failure with backoff then gives up after the attempt bound", () =>
    Effect.gen(function* () {
      const attempts = yield* Ref.make(0);
      const op = scripted(
        attempts,
        Array.from({ length: 10 }, () => new InternalError({ message: "boom" })),
      );

      const fiber = yield* Effect.forkChild(Effect.exit(Retry.withRetry(op)), {
        startImmediately: true,
      });
      // Advance well past every backoff delay so all retries are consumed.
      yield* TestClock.adjust(Duration.minutes(1));

      const exit = yield* Fiber.join(fiber);
      expect(exit._tag).toBe("Failure");
      // 1 initial attempt + 3 retries.
      expect(yield* Ref.get(attempts)).toBe(4);
    }),
  );

  it.effect("does not retry ValidationError or ConflictError", () =>
    Effect.gen(function* () {
      for (const error of [
        new ValidationError({ message: "bad" }),
        new ConflictError({
          message: "dup",
          resource: "message",
        }),
      ]) {
        const attempts = yield* Ref.make(0);
        const exit = yield* Effect.exit(Retry.withRetry(scripted(attempts, [error])));
        expect(exit._tag).toBe("Failure");
        expect(yield* Ref.get(attempts)).toBe(1);
      }
    }),
  );

  it.effect("Retry.layerDisabled suppresses retries of a retryable failure", () =>
    Effect.gen(function* () {
      const attempts = yield* Ref.make(0);
      const op = scripted(attempts, [new InternalError({ message: "boom" })]);
      const exit = yield* Effect.exit(
        Retry.withRetry(op).pipe(Effect.provide(Retry.layerDisabled)),
      );
      expect(exit._tag).toBe("Failure");
      expect(yield* Ref.get(attempts)).toBe(1);
    }),
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Facade integration: idempotency keys + retry-safety per operation
// ─────────────────────────────────────────────────────────────────────────────

const sendInput = {
  to: "ada@example.com",
  from: { email: "sender@example.com" },
  subject: "Hello",
  html: "<p>Hi</p>",
} as const;

const jsonResponse = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

/** Stub that records the `Idempotency-Key` header of every request it sees. */
const keyRecordingClient = (keys: Array<string | undefined>, status = 500): HttpClient.HttpClient =>
  HttpClient.make((request: HttpClientRequest.HttpClientRequest) => {
    keys.push(request.headers["idempotency-key"]);
    return Effect.succeed(
      HttpClientResponse.fromWeb(
        request,
        jsonResponse(status, {
          _tag: "InternalError",
          message: "boom",
        }),
      ),
    );
  });

/** Stub that counts requests, always failing with a retryable 500. */
const countingClient = (counter: { calls: number }): HttpClient.HttpClient =>
  HttpClient.make((request: HttpClientRequest.HttpClientRequest) => {
    counter.calls += 1;
    return Effect.succeed(
      HttpClientResponse.fromWeb(
        request,
        jsonResponse(500, {
          _tag: "InternalError",
          message: "boom",
        }),
      ),
    );
  });

describe("facade idempotency keys and retry-safety", () => {
  it.effect("retries only the replayable new-import branch with the same key", () =>
    Effect.gen(function* () {
      const keys: Array<string | undefined> = [];
      const client = Client.layer({ apiKey: "samva_sk_test" }).pipe(
        Layer.provide(Layer.succeed(HttpClient.HttpClient, keyRecordingClient(keys))),
      );
      const fiber = yield* Effect.forkChild(
        Effect.exit(
          Contacts.startImport({
            mode: "new",
            planHash: "a".repeat(64),
            input: {
              preset: "mailchimp",
              topicId: "unsub_7q2xk9mvt4znw8rh",
              files: [
                {
                  name: "readers.csv",
                  csv: "Email Address\nada@example.com",
                  evidence: { kind: "export_scope", scope: "subscribed" },
                },
              ],
            },
          }).pipe(Effect.provide(client)),
        ),
        { startImmediately: true },
      );
      yield* TestClock.adjust(Duration.minutes(1));
      yield* Fiber.join(fiber);
      expect(keys).toHaveLength(4);
      expect(keys[0]).toMatch(/^[0-9a-f-]{36}$/);
      expect(new Set(keys).size).toBe(1);

      const resume = yield* Effect.forkChild(
        Contacts.startImport(
          { mode: "resume", jobId: "cimport_7q2xk9mvt4znw8rh", expectedGeneration: 1 },
          { idempotencyKey: "resume-key" },
        ).pipe(Effect.provide(client), Effect.exit),
        { startImmediately: true },
      );
      yield* TestClock.adjust(Duration.minutes(1));
      yield* Fiber.join(resume);
      expect(keys).toEqual([...Array.from({ length: 4 }, () => keys[0]), "resume-key"]);
    }),
  );

  it.effect("uses one generated idempotency key across all retries of a logical send", () =>
    Effect.gen(function* () {
      const keys: Array<string | undefined> = [];
      const client = Client.layer({ apiKey: "samva_sk_test" }).pipe(
        Layer.provide(Layer.succeed(HttpClient.HttpClient, keyRecordingClient(keys))),
      );

      const fiber = yield* Effect.forkChild(
        Effect.exit(Email.send(sendInput).pipe(Effect.provide(client))),
        {
          startImmediately: true,
        },
      );
      yield* TestClock.adjust(Duration.minutes(1));
      yield* Fiber.join(fiber);

      // Default policy: 1 initial + 3 retries, all carrying the same key.
      expect(keys).toHaveLength(4);
      expect(new Set(keys).size).toBe(1);
      expect(keys[0]).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
      );
    }),
  );

  it.effect("reuses one generated key across retries of a non-send idempotent mutation", () =>
    Effect.gen(function* () {
      const keys: Array<string | undefined> = [];
      const client = Client.layer({ apiKey: "samva_sk_test" }).pipe(
        Layer.provide(Layer.succeed(HttpClient.HttpClient, keyRecordingClient(keys))),
      );
      const fiber = yield* Effect.forkChild(
        Effect.exit(
          Email.rotateDomainDkim({ id: "dom_7q2xk9mvt4znw8rh" }).pipe(Effect.provide(client)),
        ),
        { startImmediately: true },
      );
      yield* TestClock.adjust(Duration.minutes(1));
      yield* Fiber.join(fiber);
      expect(keys).toHaveLength(4);
      expect(new Set(keys).size).toBe(1);
      expect(keys[0]).toMatch(/^[0-9a-f-]{36}$/);
    }),
  );

  it.effect("calls the client idempotency hook once and lets options override it", () =>
    Effect.gen(function* () {
      const operations: Array<string> = [];
      const keys: Array<string | undefined> = [];
      const client = Client.layer({
        apiKey: "samva_sk_test",
        headers: { "Idempotency-Key": "header-is-not-an-override" },
        idempotency: (operation) => {
          operations.push(operation);
          return "event:rotate:1";
        },
      }).pipe(Layer.provide(Layer.succeed(HttpClient.HttpClient, keyRecordingClient(keys))));
      const fiber = yield* Effect.forkChild(
        Effect.exit(
          Email.rotateDomainDkim({ id: "dom_7q2xk9mvt4znw8rh" }).pipe(Effect.provide(client)),
        ),
        { startImmediately: true },
      );
      yield* TestClock.adjust(Duration.minutes(1));
      yield* Fiber.join(fiber);
      expect(operations).toEqual(["emailRotateDomainDkim"]);
      expect(keys).toEqual(Array.from({ length: 4 }, () => "event:rotate:1"));

      yield* Email.rotateDomainDkim(
        { id: "dom_7q2xk9mvt4znw8rh" },
        { idempotencyKey: "override" },
      ).pipe(Effect.provide([client, Retry.layerDisabled]), Effect.ignore);
      expect(operations).toEqual(["emailRotateDomainDkim"]);
      expect(keys.at(-1)).toBe("override");
    }),
  );

  it.effect("generates a distinct idempotency key per logical send", () =>
    Effect.gen(function* () {
      const keys: Array<string | undefined> = [];
      const client = Client.layer({ apiKey: "samva_sk_test" }).pipe(
        Layer.provide(Layer.succeed(HttpClient.HttpClient, keyRecordingClient(keys))),
      );

      yield* Email.send(sendInput).pipe(
        Effect.provide(Layer.mergeAll(client, Retry.layerDisabled)),
        Effect.ignore,
      );
      yield* Email.send(sendInput).pipe(
        Effect.provide(Layer.mergeAll(client, Retry.layerDisabled)),
        Effect.ignore,
      );

      expect(keys).toHaveLength(2);
      expect(keys[0]).not.toBe(keys[1]);
    }),
  );

  it.effect("passes an explicit idempotency key through unchanged", () =>
    Effect.gen(function* () {
      const keys: Array<string | undefined> = [];
      const client = Client.layer({ apiKey: "samva_sk_test" }).pipe(
        Layer.provide(Layer.succeed(HttpClient.HttpClient, keyRecordingClient(keys))),
      );

      yield* Email.send(sendInput, { idempotencyKey: "caller-supplied-key" }).pipe(
        Effect.provide(Layer.mergeAll(client, Retry.layerDisabled)),
        Effect.ignore,
      );

      expect(keys).toEqual(["caller-supplied-key"]);
    }),
  );

  it.effect("retries a read (GET) operation on a retryable failure", () =>
    Effect.gen(function* () {
      const counter = { calls: 0 };
      const client = Client.layer({ apiKey: "samva_sk_test" }).pipe(
        Layer.provide(Layer.succeed(HttpClient.HttpClient, countingClient(counter))),
      );

      const fiber = yield* Effect.forkChild(
        Effect.exit(Messages.list({}).pipe(Effect.provide(client))),
        {
          startImmediately: true,
        },
      );
      yield* TestClock.adjust(Duration.minutes(1));
      yield* Fiber.join(fiber);

      expect(counter.calls).toBe(4);
    }),
  );

  it.effect("never auto-retries a non-idempotent mutation, even with an option key", () =>
    Effect.gen(function* () {
      const counter = { calls: 0 };
      const client = Client.layer({ apiKey: "samva_sk_test" }).pipe(
        Layer.provide(Layer.succeed(HttpClient.HttpClient, countingClient(counter))),
      );

      yield* Messages.remove({ id: "msg_7q2xk9mvt4znw8rh" }).pipe(
        Effect.provide(client),
        Effect.exit,
      );

      yield* Messages.remove({ id: "msg_7q2xk9mvt4znw8rh" }, { idempotencyKey: "caller-key" }).pipe(
        Effect.provide(client),
        Effect.exit,
      );
      expect(counter.calls).toBe(2);
    }),
  );
});

describe("generateIdempotencyKey", () => {
  it.effect("produces a v4-shaped UUID and distinct values per evaluation", () =>
    Effect.gen(function* () {
      const first = yield* Retry.generateIdempotencyKey;
      const second = yield* Retry.generateIdempotencyKey;
      expect(first).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
      );
      expect(first).not.toBe(second);
    }),
  );
});
