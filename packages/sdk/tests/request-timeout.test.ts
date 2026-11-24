import { afterEach, describe, expect, it } from "@effect/vitest";
import { Duration, Effect, Exit, Fiber, Layer, Schema } from "effect";
import { FetchHttpClient } from "effect/http";
import { TestClock } from "effect/testing";
import { vi } from "vitest";

import * as Client from "../src/effect/client";
import * as Email from "../src/effect/email";
import * as Errors from "../src/effect/errors";
import { SamvaApi } from "../src/effect/generated";
import type { CreatedMedia, Media, MediaComplete200 } from "../src/effect/generated/media";
import { MessageReceipt } from "../src/effect/generated/messages";
import { MediaId, OrganizationId } from "../src/effect/generated/shared";
import { decodedBase64Bytes, MediaUploadError } from "../src/inline-attachments";
import { createClient, SamvaTimeoutError, SamvaTransportError } from "../src/promises";
import { fakeSamvaApi } from "./support/fake-samva-api";

const ORG = Schema.decodeSync(OrganizationId)("org_0000000000000000");
const STORAGE_HOST = "storage.test";
const receipt = () =>
  Schema.decodeSync(MessageReceipt)({
    id: "msg_aaaaaaaaaaaaaaaa",
    status: "pending",
    waitReason: null,
    reviewExpectedAt: null,
    skippedRecipients: [],
    createdAt: "2026-10-09T10:00:00.000Z",
  });
const media = (id: MediaId): Media => ({
  id,
  organizationId: ORG,
  status: "pending",
  filename: "big.bin",
  contentType: "application/octet-stream",
  sizeBytes: 5 * 1024 * 1024,
  width: null,
  height: null,
  durationMs: null,
  purpose: "attachment",
  checksumSha256: null,
  expiresAt: null,
  createdAt: "2026-10-09T10:00:00.000Z",
  confirmedAt: null,
});
const sendInput = {
  to: "ada@example.com",
  from: { email: "sender@example.com" },
  subject: "Hello",
  text: "Hi",
} as const;
const content = Buffer.from(new Uint8Array(5 * 1024 * 1024).fill(65)).toString("base64");
const oversizedSend = {
  ...sendInput,
  attachments: [
    {
      filename: "big.bin",
      contentType: "application/octet-stream",
      content,
      size: decodedBase64Bytes(content),
    },
  ],
};

/** An API that answers `messagesSend`, and the media calls an oversized attachment makes. */
const api = () => {
  const id = Schema.decodeSync(MediaId)("media_0000000000000001");
  return fakeSamvaApi(SamvaApi)({
    Media: {
      mediaCreate: () =>
        Effect.succeed({
          ...media(id),
          upload: {
            url: `https://${STORAGE_HOST}/upload/${id}`,
            method: "PUT",
            headers: { "content-type": "application/octet-stream" },
            expiresAt: "2026-10-09T11:00:00.000Z",
          },
        } satisfies CreatedMedia),
      mediaComplete: () =>
        Effect.succeed({
          media: { ...media(id), status: "ready" },
          downloadUrl: `https://${STORAGE_HOST}/download/${id}`,
        } satisfies MediaComplete200),
    },
    Messages: { messagesSend: () => Effect.succeed(receipt()) },
  });
};

/**
 * A fetch whose listed attempts (1-based) or hosts never answer until their signal aborts; the
 * rest go to `next`. A stalled request rejects with a plain `AbortError`, as a user-supplied fetch
 * may, so the SDK must recognize its own timer rather than the rejection's shape.
 */
const stalling = (
  options: {
    readonly attempts?: ReadonlyArray<number>;
    readonly host?: string;
    readonly next?: (request: Request) => Promise<Response>;
  } = {},
) => {
  const requests: Array<Request> = [];
  const fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const request = new Request(input, init);
    requests.push(request);
    const stalls =
      options.host === undefined
        ? (options.attempts ?? [requests.length]).includes(requests.length)
        : new URL(request.url).host === options.host;
    if (!stalls && options.next !== undefined) return options.next(request);
    return new Promise((_, reject) => {
      const abort = () => reject(new DOMException("The operation was aborted.", "AbortError"));
      if (request.signal.aborted) abort();
      request.signal.addEventListener("abort", abort, { once: true });
    });
  });
  return { fetch, requests };
};

afterEach(() => vi.useRealTimers());

describe("Promise request timeouts", () => {
  it("fails a stalled request after the 30 000 ms default with SamvaTimeoutError", async () => {
    vi.useFakeTimers();
    const transport = stalling();
    const samva = createClient({ apiKey: "test", maxRetries: 0, fetch: transport.fetch });
    const call = samva.email.listDomains();
    const rejected = call.catch((error: unknown) => error);
    await vi.advanceTimersByTimeAsync(29_999);
    expect(transport.requests[0]!.signal.aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    const error = await rejected;
    expect(error).toBeInstanceOf(SamvaTimeoutError);
    expect(error).toBeInstanceOf(SamvaTransportError);
    expect(error).toMatchObject({ _tag: "SamvaTimeoutError", timeoutMs: 30_000 });
    expect(transport.requests[0]!.signal.aborted).toBe(true);
    expect(transport.fetch).toHaveBeenCalledTimes(1);
  });

  it("applies the client's timeoutMs, and a per-call value overrides it", async () => {
    vi.useFakeTimers();
    const transport = stalling({ attempts: [1, 2] });
    const samva = createClient({
      apiKey: "test",
      maxRetries: 0,
      timeoutMs: 50,
      fetch: transport.fetch,
    });
    const inherited = samva.email.listDomains({}, { timeoutMs: undefined }).catch((e) => e);
    await vi.advanceTimersByTimeAsync(50);
    expect(await inherited).toMatchObject({ _tag: "SamvaTimeoutError", timeoutMs: 50 });

    const overridden = samva.email.listDomains({}, { timeoutMs: 1_000 }).catch((e) => e);
    await vi.advanceTimersByTimeAsync(999);
    expect(transport.requests[1]!.signal.aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    expect(await overridden).toMatchObject({ _tag: "SamvaTimeoutError", timeoutMs: 1_000 });
  });

  it("leaves a request unbounded with timeoutMs: null at the client or the call", async () => {
    vi.useFakeTimers();
    const transport = stalling({ attempts: [1, 2] });
    const controller = new AbortController();
    const unbounded = createClient({ apiKey: "test", timeoutMs: null, fetch: transport.fetch });
    const bounded = createClient({ apiKey: "test", timeoutMs: 50, fetch: transport.fetch });
    const first = unbounded.email.listDomains({}, { signal: controller.signal }).catch((e) => e);
    const second = bounded.email
      .listDomains({}, { timeoutMs: null, signal: controller.signal })
      .catch((e) => e);
    await vi.advanceTimersByTimeAsync(10 * 60_000);
    expect(transport.requests.map((request) => request.signal.aborted)).toEqual([false, false]);
    controller.abort();
    for (const error of [await first, await second]) {
      expect(error).toBeInstanceOf(SamvaTransportError);
      expect(error).not.toBeInstanceOf(SamvaTimeoutError);
    }
  });

  it("keeps a caller abort a caller abort, not a timeout, and does not retry it", async () => {
    const transport = stalling();
    const controller = new AbortController();
    const samva = createClient({ apiKey: "test", timeoutMs: 60_000, fetch: transport.fetch });
    const call = samva.email.listDomains({}, { signal: controller.signal });
    await vi.waitFor(() => expect(transport.fetch).toHaveBeenCalledTimes(1));
    controller.abort();
    const error = await call.catch((e: unknown) => e);
    expect(error).toBeInstanceOf(SamvaTransportError);
    expect(error).not.toBeInstanceOf(SamvaTimeoutError);
    expect(error).toMatchObject({ cause: { name: "AbortError" } });
    expect(transport.fetch).toHaveBeenCalledTimes(1);
  });

  it("retries a timed-out keyed send with the same idempotency key and a fresh timer", async () => {
    vi.useFakeTimers();
    const fake = api();
    const transport = stalling({ attempts: [1], next: fake.fetch });
    const samva = createClient({ apiKey: "test", timeoutMs: 100, fetch: transport.fetch });
    const call = samva.email.send(sendInput);
    await vi.advanceTimersByTimeAsync(100);
    expect(transport.requests[0]!.signal.aborted).toBe(true);
    await vi.runAllTimersAsync();
    expect(await call).toMatchObject({ id: "msg_aaaaaaaaaaaaaaaa" });
    const keys = transport.requests.map((request) => request.headers.get("idempotency-key"));
    expect(keys).toHaveLength(2);
    expect(keys[0]).toBeTruthy();
    expect(keys[1]).toBe(keys[0]);
    expect(transport.requests[1]!.signal.aborted).toBe(false);
    fake.assertComplete();
  });

  it("does not retry a timed-out mutation that is not retry-safe", async () => {
    vi.useFakeTimers();
    const transport = stalling({ attempts: [1, 2] });
    const samva = createClient({ apiKey: "test", timeoutMs: 100, fetch: transport.fetch });
    const call = samva.email.addDomain({ domain: "example.com" }).catch((e) => e);
    await vi.advanceTimersByTimeAsync(100);
    await vi.runAllTimersAsync();
    expect(await call).toBeInstanceOf(SamvaTimeoutError);
    expect(transport.fetch).toHaveBeenCalledTimes(1);
  });

  it("surfaces the timeout through the raw client's error envelope", async () => {
    const transport = stalling();
    const samva = createClient({
      apiKey: "test",
      maxRetries: 0,
      timeoutMs: 5,
      fetch: transport.fetch,
    });
    const result = await samva.raw.email.listDomains();
    expect(result.error).toBeInstanceOf(SamvaTimeoutError);
  });

  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY, 2 ** 31])(
    "rejects timeoutMs %s at the client and the call",
    async (value) => {
      expect(() => createClient({ apiKey: "test", timeoutMs: value })).toThrow(RangeError);
      expect(() => createClient({ apiKey: "test", uploadTimeoutMs: value })).toThrow(RangeError);
      const samva = createClient({ apiKey: "test", fetch: stalling().fetch });
      await expect(samva.email.listDomains({}, { timeoutMs: value })).rejects.toThrow(RangeError);
    },
  );

  it("bounds the storage put by uploadTimeoutMs (300 000 ms default), not timeoutMs", async () => {
    vi.useFakeTimers();
    const fake = api();
    const transport = stalling({ host: STORAGE_HOST, next: fake.fetch });
    const samva = createClient({ apiKey: "test", timeoutMs: 1_000, fetch: transport.fetch });
    const call = samva.email.send(oversizedSend).catch((e) => e);
    await vi.advanceTimersByTimeAsync(299_999);
    const put = transport.requests.find((request) => new URL(request.url).host === STORAGE_HOST);
    expect(put?.signal.aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    const error = await call;
    expect(error).toBeInstanceOf(MediaUploadError);
    expect((error as MediaUploadError).cause).toBeInstanceOf(SamvaTimeoutError);
    expect((error as MediaUploadError).cause).toMatchObject({ timeoutMs: 300_000 });
    expect(transport.requests.map((request) => new URL(request.url).pathname)).toEqual([
      "/v1/media",
      "/upload/media_0000000000000001",
    ]);
  });

  it("takes a per-call and client uploadTimeoutMs, with null disabling it", async () => {
    vi.useFakeTimers();
    const fake = api();
    const transport = stalling({ host: STORAGE_HOST, next: fake.fetch });
    const samva = createClient({ apiKey: "test", uploadTimeoutMs: 20, fetch: transport.fetch });
    const call = samva.email.send(oversizedSend, { uploadTimeoutMs: 40 }).catch((e) => e);
    await vi.advanceTimersByTimeAsync(39);
    expect(transport.requests.at(-1)!.signal.aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    expect((await call).cause).toMatchObject({ timeoutMs: 40 });

    const controller = new AbortController();
    const unbounded = samva.email
      .send(oversizedSend, { uploadTimeoutMs: null, signal: controller.signal })
      .catch((e) => e);
    await vi.advanceTimersByTimeAsync(60 * 60_000);
    expect(transport.requests.at(-1)!.signal.aborted).toBe(false);
    controller.abort();
    expect((await unbounded).cause).not.toBeInstanceOf(SamvaTimeoutError);
  });
});

/** An Effect transport over `stalling`, through the standard Fetch client. */
const effectClient = (config: Partial<Client.ConfigBase>, transport: ReturnType<typeof stalling>) =>
  Client.layer({ apiKey: "samva_sk_test", ...config }).pipe(
    Layer.provide(
      Layer.provide(
        FetchHttpClient.layer,
        Layer.succeed(FetchHttpClient.Fetch, transport.fetch as typeof globalThis.fetch),
      ),
    ),
  );

describe("Effect request timeouts", () => {
  it.effect("fails a stalled request after the 30 000 ms default with SamvaTimeoutError", () =>
    Effect.gen(function* () {
      const transport = stalling({ attempts: [1, 2, 3, 4] });
      const fiber = yield* Effect.forkChild(
        Email.addDomain({ domain: "example.com" }).pipe(
          Effect.provide(effectClient({}, transport)),
          Effect.flip,
        ),
        { startImmediately: true },
      );
      yield* TestClock.adjust(Duration.millis(29_999));
      expect(fiber.pollUnsafe()).toBeUndefined();
      yield* TestClock.adjust(Duration.millis(1));
      const error = yield* Fiber.join(fiber);
      expect(error).toBeInstanceOf(Errors.SamvaTimeoutError);
      expect(error).toMatchObject({ _tag: "SamvaTimeoutError", timeoutMs: 30_000 });
      // The interrupted attempt aborts its fetch; a mutation that is not retry-safe runs once.
      expect(transport.requests[0]!.signal.aborted).toBe(true);
      expect(transport.fetch).toHaveBeenCalledTimes(1);
    }),
  );

  it.effect("applies the layer's timeoutMs, overridden per call, and null disables it", () =>
    Effect.gen(function* () {
      const transport = stalling({ attempts: [1, 2, 3] });
      const layer = effectClient({ timeoutMs: 50 }, transport);
      const inherited = yield* Effect.forkChild(
        Email.addDomain({ domain: "example.com" }).pipe(Effect.provide(layer), Effect.flip),
        { startImmediately: true },
      );
      yield* TestClock.adjust(Duration.millis(50));
      expect(yield* Fiber.join(inherited)).toMatchObject({ timeoutMs: 50 });

      const overridden = yield* Effect.forkChild(
        Email.addDomain({ domain: "example.com" }, { timeoutMs: 500 }).pipe(
          Effect.provide(layer),
          Effect.flip,
        ),
        { startImmediately: true },
      );
      yield* TestClock.adjust(Duration.millis(499));
      expect(overridden.pollUnsafe()).toBeUndefined();
      yield* TestClock.adjust(Duration.millis(1));
      expect(yield* Fiber.join(overridden)).toMatchObject({ timeoutMs: 500 });

      const unbounded = yield* Effect.forkChild(
        Email.addDomain({ domain: "example.com" }, { timeoutMs: null }).pipe(Effect.provide(layer)),
        { startImmediately: true },
      );
      yield* TestClock.adjust(Duration.hours(1));
      expect(unbounded.pollUnsafe()).toBeUndefined();
      yield* Fiber.interrupt(unbounded);
    }),
  );

  it.effect("retries a timed-out keyed send with the same idempotency key", () =>
    Effect.gen(function* () {
      const fake = api();
      const transport = stalling({ attempts: [1], next: fake.fetch });
      const fiber = yield* Effect.forkChild(
        Email.send(sendInput).pipe(Effect.provide(effectClient({ timeoutMs: 5_000 }, transport))),
        { startImmediately: true },
      );
      yield* TestClock.adjust(Duration.millis(5_000));
      expect(transport.requests[0]!.signal.aborted).toBe(true);
      // Past the jittered backoff, but short of the second attempt's own fresh bound.
      yield* TestClock.adjust(Duration.millis(1_000));
      const result = yield* Fiber.join(fiber);
      expect(result).toMatchObject({ id: "msg_aaaaaaaaaaaaaaaa" });
      const keys = transport.requests.map((request) => request.headers.get("idempotency-key"));
      expect(keys).toHaveLength(2);
      expect(keys[0]).toBeTruthy();
      expect(keys[1]).toBe(keys[0]);
      fake.assertComplete();
    }),
  );

  it.effect("keeps an interruption an interruption, not a timeout", () =>
    Effect.gen(function* () {
      const transport = stalling();
      const fiber = yield* Effect.forkChild(
        Email.listDomains().pipe(Effect.provide(effectClient({ timeoutMs: 60_000 }, transport))),
        { startImmediately: true },
      );
      yield* TestClock.adjust(Duration.millis(10));
      const exit = yield* Fiber.interrupt(fiber).pipe(Effect.andThen(Fiber.await(fiber)));
      expect(Exit.hasInterrupts(exit)).toBe(true);
      expect(transport.fetch).toHaveBeenCalledTimes(1);
    }),
  );

  it("rejects an invalid layer timeout with a RangeError", () => {
    for (const value of [0, -5, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(() => Client.layer({ apiKey: "samva_sk_test", timeoutMs: value })).toThrow(RangeError);
      expect(() => Client.layerFetch({ apiKey: "samva_sk_test", uploadTimeoutMs: value })).toThrow(
        RangeError,
      );
    }
  });

  it.effect("bounds the storage put by uploadTimeoutMs, not timeoutMs", () =>
    Effect.gen(function* () {
      const fake = api();
      const transport = stalling({ host: STORAGE_HOST, next: fake.fetch });
      const fiber = yield* Effect.forkChild(
        Email.send(oversizedSend, { uploadTimeoutMs: 2_000 }).pipe(
          Effect.provide(effectClient({ timeoutMs: 10_000, uploadTimeoutMs: 50 }, transport)),
          Effect.flip,
        ),
        { startImmediately: true },
      );
      yield* TestClock.adjust(Duration.millis(1_999));
      expect(fiber.pollUnsafe()).toBeUndefined();
      yield* TestClock.adjust(Duration.millis(1));
      const error = yield* Fiber.join(fiber);
      expect(error).toBeInstanceOf(MediaUploadError);
      expect((error as MediaUploadError).cause).toBeInstanceOf(Errors.SamvaTimeoutError);
      expect((error as MediaUploadError).cause).toMatchObject({ timeoutMs: 2_000 });
    }),
  );
});
