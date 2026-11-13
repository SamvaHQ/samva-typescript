import { afterEach, describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { vi } from "vitest";

import {
  SamvaApi,
  EmailDomainId,
  ContactImportJobId,
  TopicId,
  ContactId,
  InternalError,
  RateLimitedError,
} from "../src/effect/generated";
import type { ContactSummary, ContactsStartImport202 } from "../src/effect/generated/contacts";
import type { EmailDkimRotation } from "../src/effect/generated/email";
import { createClient } from "../src/promises/index";
import { fakeSamvaApi } from "./support/fake-samva-api";

const domainId = Schema.decodeSync(EmailDomainId)("dom_7q2xk9mvt4znw8rh");
const rotation: EmailDkimRotation = {
  id: "rotation-1",
  domainId,
  phase: "staged",
  selector: "samva2",
  record: { name: "samva2._domainkey.example.com", type: "TXT", value: "p=key", ttl: "300" },
  formerRecord: { name: "samva1._domainkey.example.com", type: "TXT", value: "p=old" },
  minimumRetainUntil: null,
};
const job: ContactsStartImport202 = {
  id: Schema.decodeSync(ContactImportJobId)("cimport_7q2xk9mvt4znw8rh"),
  topicId: Schema.decodeSync(TopicId)("tpc_7q2xk9mvt4znw8rh"),
  namespaceId: null,
  preset: "mailchimp",
  status: "running",
  generation: 1,
  counts: {
    totalRows: 1,
    uniqueAddresses: 1,
    subscribed: 1,
    unsubscribed: 0,
    suppressed: 0,
    skipped: 0,
    conflicts: 0,
    created: 1,
    existing: 0,
  },
  processedRows: 1,
  totalRows: 1,
  createdAt: "2026-10-25T00:00:00.000Z",
  startedAt: null,
  updatedAt: "2026-10-25T00:00:00.000Z",
  completedAt: null,
  failure: null,
  resumable: false,
};
const contact = (page: number): ContactSummary => ({
  id: Schema.decodeSync(ContactId)(`contact_7q2xk9mvt4znw8r${page}`),
  namespaceId: null,
  name: "Ada",
  displayName: null,
  status: "active",
  email: "ada@example.com",
  channels: ["email"],
  tags: [],
  lists: [],
  lastActiveAt: null,
  createdAt: "2026-10-25T00:00:00.000Z",
});
afterEach(() => vi.useRealTimers());

describe("Promise request policy", () => {
  it("reuses one generated key across retries of a keyed non-send mutation", async () => {
    vi.useFakeTimers();
    const seen: Request[] = [];
    const fake = fakeSamvaApi(SamvaApi)({
      Email: {
        emailRotateDomainDkim: () =>
          seen.length === 1
            ? Effect.fail(new InternalError({ message: "retry" }))
            : Effect.succeed(rotation),
      },
    });
    const hook = vi.fn(() => "logical-call");
    const samva = createClient({
      apiKey: "test",
      idempotency: hook,
      fetch: async (input) => {
        seen.push(input instanceof Request ? input.clone() : new Request(input));
        return fake.fetch(input);
      },
    });
    const call = samva.email.rotateDomainDkim({ id: domainId });
    await vi.runAllTimersAsync();
    await call;
    expect(seen).toHaveLength(2);
    expect(seen.map((request) => request.headers.get("idempotency-key"))).toEqual([
      "logical-call",
      "logical-call",
    ]);
    expect(hook).toHaveBeenCalledExactlyOnceWith("emailRotateDomainDkim");
    fake.assertComplete();
  });

  it("uses only the options override and bypasses the hook", async () => {
    const hook = vi.fn(() => "hook");
    const seen: Request[] = [];
    const fake = fakeSamvaApi(SamvaApi)({
      Email: { emailRotateDomainDkim: () => Effect.succeed(rotation) },
    });
    const samva = createClient({
      apiKey: "test",
      idempotency: hook,
      headers: { "Idempotency-Key": "config-alias" },
      fetch: async (input) => {
        seen.push(input instanceof Request ? input.clone() : new Request(input));
        return fake.fetch(input);
      },
    });
    await samva.email.rotateDomainDkim(
      { id: domainId },
      { idempotencyKey: "override", headers: { "IDEMPOTENCY-KEY": "header-alias" } },
    );
    expect(seen[0]!.headers.get("idempotency-key")).toBe("override");
    expect(hook).not.toHaveBeenCalled();
    fake.assertComplete();
  });

  it("never retries a non-idempotent mutation", async () => {
    const fake = fakeSamvaApi(SamvaApi)({
      Email: { emailAddDomain: () => Effect.fail(new InternalError({ message: "retry" })) },
    });
    const fetch = vi.fn(fake.fetch);
    const samva = createClient({ apiKey: "test", fetch });
    await expect(samva.email.addDomain({ domain: "example.com" })).rejects.toMatchObject({
      _tag: "InternalError",
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    fake.assertComplete();
  });

  it("retries new imports with one key", async () => {
    vi.useFakeTimers();
    const seen: Request[] = [];
    const fake = fakeSamvaApi(SamvaApi)({
      Contacts: {
        contactsStartImport: () =>
          seen.length === 1
            ? Effect.fail(new InternalError({ message: "retry" }))
            : Effect.succeed(job),
      },
    });
    const samva = createClient({
      apiKey: "test",
      fetch: async (input) => {
        seen.push(input instanceof Request ? input.clone() : new Request(input));
        return fake.fetch(input);
      },
    });
    const call = samva.contacts.startImport({
      mode: "new",
      planHash: "a".repeat(64),
      input: {
        preset: "mailchimp",
        topicId: "tpc_7q2xk9mvt4znw8rh",
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
    fake.assertComplete();
  });

  it("does not replay a fenced import resume after a lost response, even with a key", async () => {
    const fetch = vi.fn(async () => {
      if (fetch.mock.calls.length === 1) throw new TypeError("accepted response was lost");
      throw new Error("Fenced resume unexpectedly retried");
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
    const fake = fakeSamvaApi(SamvaApi)({
      Messages: {
        messagesSend: () =>
          Effect.fail(new RateLimitedError({ retryAfterSeconds: 2, message: "slow" })),
      },
    });
    const fetch = vi.fn(fake.fetch);
    const samva = createClient({ apiKey: "test", maxRetries: 0, fetch });
    const call = samva.email.send(
      { to: "ada@example.com", subject: "Hello", text: "Hi" },
      { maxRetries: 1 },
    );
    const rejected = expect(call).rejects.toMatchObject({ _tag: "RateLimitedError" });
    await vi.advanceTimersByTimeAsync(1999);
    expect(fetch).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1);
    await rejected;
    expect(fetch).toHaveBeenCalledTimes(2);
    fake.assertComplete();
  });

  it("cancels a retry delay through the client abort signal", async () => {
    vi.useFakeTimers();
    const controller = new AbortController();
    const fake = fakeSamvaApi(SamvaApi)({
      Email: { emailListDomains: () => Effect.fail(new InternalError({ message: "retry" })) },
    });
    const fetch = vi.fn(fake.fetch);
    const samva = createClient({ apiKey: "test", signal: controller.signal, fetch });
    const call = samva.email.listDomains();
    const rejected = expect(call).rejects.toMatchObject({ cause: { name: "AbortError" } });
    await vi.advanceTimersByTimeAsync(0);
    controller.abort();
    await rejected;
    expect(fetch).toHaveBeenCalledTimes(1);
    fake.assertComplete();
  });

  it("selects an organization with an OAuth token", async () => {
    const seen: Request[] = [];
    const fake = fakeSamvaApi(SamvaApi)({
      Email: { emailListDomains: () => Effect.succeed({ items: [], nextCursor: null }) },
    });
    const samva = createClient({
      authToken: "token",
      orgSlug: "acme",
      fetch: async (input) => {
        seen.push(input instanceof Request ? input.clone() : new Request(input));
        return fake.fetch(input);
      },
    });
    await samva.email.listDomains();
    expect(seen[0]!.headers.get("authorization")).toBe("Bearer token");
    expect(seen[0]!.headers.get("x-org-slug")).toBe("acme");
    fake.assertComplete();
  });

  it("iterates cursor pages lazily and preserves filters", async () => {
    const seen: URL[] = [];
    const fake = fakeSamvaApi(SamvaApi)({
      Contacts: {
        contactsList: () =>
          Effect.succeed({
            items: [contact(seen.length)],
            nextCursor: seen.length === 1 ? "next" : null,
          }),
      },
    });
    const samva = createClient({
      apiKey: "test",
      fetch: async (input) => {
        const url = new URL(new Request(input).url);
        seen.push(url);
        return fake.fetch(input);
      },
    });
    const iterator = samva.contacts.list.items({ limit: 2 });
    expect(seen).toHaveLength(0);
    expect(await iterator.next()).toMatchObject({ value: { id: contact(1).id }, done: false });
    expect(seen).toHaveLength(1);
    expect(await iterator.next()).toMatchObject({ value: { id: contact(2).id }, done: false });
    expect(seen[1]!.searchParams.get("cursor")).toBe("next");
    expect(seen[1]!.searchParams.get("limit")).toBe("2");
    await iterator.return?.();
    fake.assertComplete();
  });
});
