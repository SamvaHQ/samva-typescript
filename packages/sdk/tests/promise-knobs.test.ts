import { afterEach, describe, expect, it } from "@effect/vitest";
import { vi } from "vitest";

import { createClient } from "../src/promises/index";

const failure = () => Response.json({ _tag: "InternalError", message: "retry" }, { status: 500 });
const result = () => Response.json({ ok: true });
afterEach(() => vi.useRealTimers());

describe("Promise request policy", () => {
  it("reuses one generated key across retries of a keyed non-send mutation", async () => {
    vi.useFakeTimers();
    const seen: Request[] = [];
    const hook = vi.fn(() => "logical-call");
    const samva = createClient({
      apiKey: "test",
      idempotency: hook,
      fetch: async (input) => {
        seen.push(new Request(input));
        return seen.length === 1 ? failure() : result();
      },
    });
    const call = samva.email.rotateDomainDkim({ id: "dom_test" });
    await vi.runAllTimersAsync();
    await call;
    expect(seen).toHaveLength(2);
    expect(seen.map((request) => request.headers.get("idempotency-key"))).toEqual([
      "logical-call",
      "logical-call",
    ]);
    expect(hook).toHaveBeenCalledExactlyOnceWith("emailRotateDomainDkim");
  });

  it("uses only the options override and bypasses the hook", async () => {
    const hook = vi.fn(() => "hook");
    const seen: Request[] = [];
    const samva = createClient({
      apiKey: "test",
      idempotency: hook,
      headers: { "Idempotency-Key": "config-alias" },
      fetch: async (input) => {
        seen.push(new Request(input));
        return result();
      },
    });
    await samva.email.rotateDomainDkim(
      { id: "dom_test" },
      { idempotencyKey: "override", headers: { "IDEMPOTENCY-KEY": "header-alias" } },
    );
    expect(seen[0]!.headers.get("idempotency-key")).toBe("override");
    expect(hook).not.toHaveBeenCalled();
  });

  it("never retries a non-idempotent mutation", async () => {
    const fetch = vi.fn(async () => failure());
    const samva = createClient({ apiKey: "test", fetch });
    await expect(samva.email.addDomain({ domain: "example.com" })).rejects.toMatchObject({
      _tag: "InternalError",
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("retries new imports with one key", async () => {
    vi.useFakeTimers();
    const seen: Request[] = [];
    const samva = createClient({
      apiKey: "test",
      fetch: async (input) => {
        seen.push(new Request(input));
        return seen.length === 1 ? failure() : result();
      },
    });
    const call = samva.contacts.startImport({
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
    });
    await vi.runAllTimersAsync();
    await call;
    expect(seen).toHaveLength(2);
    const keys = seen.map((request) => request.headers.get("idempotency-key"));
    expect(keys[0]).toMatch(/^[0-9a-f-]{36}$/);
    expect(new Set(keys).size).toBe(1);
  });

  it("does not replay a fenced import resume after a lost response, even with a key", async () => {
    const fetch = vi.fn(async () => {
      if (fetch.mock.calls.length === 1) throw new TypeError("accepted response was lost");
      return Response.json({ _tag: "ConflictError", message: "stale generation" }, { status: 409 });
    });
    const samva = createClient({ apiKey: "test", fetch });
    await expect(
      samva.contacts.startImport(
        { mode: "resume", jobId: "cimport_7q2xk9mvt4znw8rh", expectedGeneration: 1 },
        { idempotencyKey: "resume-key", maxRetries: 3 },
      ),
    ).rejects.toMatchObject({ cause: { message: "accepted response was lost" } });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("honors the server's 429 delay and the per-call retry limit", async () => {
    vi.useFakeTimers();
    const fetch = vi.fn(async () =>
      Response.json(
        { _tag: "RateLimitedError", retryAfterSeconds: 2, message: "slow" },
        { status: 429 },
      ),
    );
    const samva = createClient({ apiKey: "test", maxRetries: 0, fetch });
    const call = samva.email.listDomains({}, { maxRetries: 1 });
    const rejected = expect(call).rejects.toMatchObject({ _tag: "RateLimitedError" });
    await vi.advanceTimersByTimeAsync(1999);
    expect(fetch).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1);
    await rejected;
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("cancels a retry delay through the client abort signal", async () => {
    vi.useFakeTimers();
    const controller = new AbortController();
    const fetch = vi.fn(async () => failure());
    const samva = createClient({ apiKey: "test", signal: controller.signal, fetch });
    const call = samva.email.listDomains();
    const rejected = expect(call).rejects.toMatchObject({ cause: { name: "AbortError" } });
    await vi.advanceTimersByTimeAsync(0);
    controller.abort();
    await rejected;
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("selects an organization with an OAuth token", async () => {
    const seen: Request[] = [];
    const samva = createClient({
      authToken: "token",
      orgSlug: "acme",
      fetch: async (input) => {
        seen.push(new Request(input));
        return result();
      },
    });
    await samva.email.listDomains();
    expect(seen[0]!.headers.get("authorization")).toBe("Bearer token");
    expect(seen[0]!.headers.get("x-org-slug")).toBe("acme");
  });

  it("iterates cursor pages lazily and preserves filters", async () => {
    const seen: URL[] = [];
    const samva = createClient({
      apiKey: "test",
      fetch: async (input) => {
        const url = new URL(new Request(input).url);
        seen.push(url);
        return Response.json({
          items: [{ id: seen.length }],
          nextCursor: seen.length === 1 ? "next" : null,
        });
      },
    });
    const iterator = samva.contacts.list.items({ limit: 2 });
    expect(seen).toHaveLength(0);
    expect(await iterator.next()).toMatchObject({ value: { id: 1 }, done: false });
    expect(seen).toHaveLength(1);
    expect(await iterator.next()).toMatchObject({ value: { id: 2 }, done: false });
    expect(seen[1]!.searchParams.get("cursor")).toBe("next");
    expect(seen[1]!.searchParams.get("limit")).toBe("2");
    await iterator.return?.();
  });
});
