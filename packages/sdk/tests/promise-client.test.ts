import { inspect } from "node:util";

import { assert, describe, expect, expectTypeOf, it } from "@effect/vitest";
import { Effect, Schema } from "effect";

import PackageJson from "../package.json" with { type: "json" };
import { SamvaApi, ContactId, MessageId } from "../src/effect/generated";
import type { Contact } from "../src/effect/generated/contacts";
import type { MessagesSend201 } from "../src/effect/generated/messages";
import {
  createClient,
  GatewayTimeoutError,
  RateLimitedError,
  SamvaApiError,
  SamvaTransportError,
  type SamvaClientConfig,
} from "../src/promises";
import { fakeSamvaApi } from "./support/fake-samva-api";

const json = (body: unknown, status: number): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const contactFixture: Contact = {
  id: Schema.decodeSync(ContactId)("contact_7q2xk9mvt4znw8rh"),
  namespaceId: null,
  name: "Ada",
  displayName: null,
  avatar: null,
  status: "active",
  statusReason: null,
  externalId: null,
  identities: [],
  profile: null,
  preferences: null,
  tags: [],
  metadata: null,
  importProvenance: null,
  addedAt: null,
  createdAt: "2026-10-25T00:00:00.000Z",
  updatedAt: "2026-10-25T00:00:00.000Z",
};

describe("Promise client", () => {
  it("authenticates with a string key overriding custom authentication headers", async () => {
    expectTypeOf<
      Extract<SamvaClientConfig, { apiKey: string }>["apiKey"]
    >().toEqualTypeOf<string>();
    const key = "samva_sk_test";
    const fake = fakeSamvaApi(SamvaApi)({
      Contacts: {
        contactsFindOrCreate: () => Effect.succeed({ contact: contactFixture, created: true }),
      },
    });
    const client = createClient({
      apiKey: key,
      headers: { "x-api-key": "spoofed" },
      fetch: async (input) => {
        assert(input instanceof Request);
        expect(input.headers.get("x-api-key")).toBe(key);
        return fake.fetch(input);
      },
    });
    await client.contacts.findOrCreate({ lookup: { type: "email", value: "ada@example.com" } });
    fake.assertComplete();
  });

  it("preserves skipped recipients and review guidance on a send receipt", async () => {
    const receipt: MessagesSend201 = {
      id: Schema.decodeSync(MessageId)("msg_aaaaaaaaaaaaaaaa"),
      status: "pending",
      createdAt: "2026-10-08T11:00:00.000Z",
      waitReason: "content-review",
      reviewExpectedAt: "2026-10-08T12:00:00.000Z",
      skippedRecipients: [{ address: "blocked@example.com", reason: "bounce" }],
    };
    const fake = fakeSamvaApi(SamvaApi)({
      Messages: { messagesSend: () => Effect.succeed(receipt) },
    });
    const client = createClient({ apiKey: "samva_sk_test", fetch: fake.fetch });
    expect(
      await client.email.send({ to: "ada@example.com", subject: "Hello", text: "Hi" }),
    ).toEqual(receipt);
    fake.assertComplete();
  });

  it("returns the decoded success value directly", async () => {
    let request: Request | undefined;
    const controller = new AbortController();
    const fake = fakeSamvaApi(SamvaApi)({
      Contacts: {
        contactsFindOrCreate: () => Effect.succeed({ contact: contactFixture, created: true }),
      },
    });
    const client = createClient({
      apiKey: "samva_sk_test",
      fetch: async (input) => {
        request = input instanceof Request ? input : new Request(input);
        return fake.fetch(input);
      },
    });

    const contact = await client.contacts.findOrCreate(
      { lookup: { type: "email", value: "ada@example.com" } },
      { headers: { "x-request-id": "request_123" }, signal: controller.signal },
    );

    expect(contact).toEqual({
      contact: contactFixture,
      created: true,
    });
    expect(request?.headers.get("x-api-key")).toBe("samva_sk_test");
    expect(request?.headers.get("x-samva-client")).toBe(
      `typescript-promise/${PackageJson.version}`,
    );
    expect(request?.headers.get("x-request-id")).toBe("request_123");
    expect(request && new URL(request.url).pathname).toBe("/v1/contacts/find-or-create");
    controller.abort();
    expect(request?.signal.aborted).toBe(true);
    fake.assertComplete();
  });

  it("allows callers to override or remove attribution without replacing authentication", async () => {
    const requests: Array<Request> = [];
    const fake = fakeSamvaApi(SamvaApi)({
      Contacts: {
        contactsFindOrCreate: () => Effect.succeed({ contact: contactFixture, created: false }),
      },
    });
    const fetch = async (input: URL | RequestInfo) => {
      requests.push(input instanceof Request ? input : new Request(input));
      return fake.fetch(input);
    };
    const client = createClient({
      apiKey: "samva_sk_test",
      fetch,
      headers: { "x-samva-client": "custom-client/1.2.3" },
    });

    await client.contacts.findOrCreate(
      { lookup: { type: "email", value: "ada@example.com" } },
      { headers: { "x-api-key": "spoofed" } },
    );
    await client.contacts.findOrCreate(
      { lookup: { type: "email", value: "grace@example.com" } },
      { headers: { "x-samva-client": null } },
    );

    expect(requests[0]?.headers.get("x-samva-client")).toBe("custom-client/1.2.3");
    expect(requests[0]?.headers.get("x-api-key")).toBe("samva_sk_test");
    expect(requests[1]?.headers.get("x-samva-client")).toBeNull();
    expect(requests[1]?.headers.get("x-api-key")).toBe("samva_sk_test");
    fake.assertComplete();
  });

  it("constructs the OpenAPI-derived error class with transport context", async () => {
    const client = createClient({
      apiKey: "samva_sk_test",
      fetch: async () =>
        json(
          {
            _tag: "RateLimitedError",
            message: "Send rate limit reached. Retry after 12 seconds.",
            retryAfterSeconds: 12,
          },
          429,
        ),
    });

    const error = await client.contacts
      .findOrCreate({ lookup: { type: "email", value: "ada@example.com" } })
      .catch((cause: unknown) => cause);

    assert(error instanceof RateLimitedError);
    expect(error).toBeInstanceOf(SamvaApiError);
    expect(error).toMatchObject({
      _tag: "RateLimitedError",
      message: "Send rate limit reached. Retry after 12 seconds.",
      retryAfterSeconds: 12,
      status: 429,
    });
    assert(error.request instanceof Request);
    expect(error.request.method).toBe("POST");
    expect(new URL(error.request.url).pathname).toBe("/v1/contacts/find-or-create");
    expect(Array.from(error.request.headers)).toEqual([]);
    expect(error.response).toBeInstanceOf(Response);
  });

  it("does not retain credentials or request bodies in API errors", async () => {
    const secret = "samva_sk_must_not_escape";
    const client = createClient({
      apiKey: secret,
      fetch: async () =>
        json(
          {
            _tag: "RateLimitedError",
            message: "Send rate limit reached. Retry after 12 seconds.",
            retryAfterSeconds: 12,
          },
          429,
        ),
    });

    const error = await client.contacts
      .findOrCreate(
        { lookup: { type: "email", value: "private@example.com" } },
        { headers: { authorization: "Bearer private", cookie: "session=private" } },
      )
      .catch((cause: unknown) => cause);

    assert(error instanceof RateLimitedError);
    assert(error.request instanceof Request);
    expect(error.request.headers.get("x-api-key")).toBeNull();
    expect(error.request.headers.get("authorization")).toBeNull();
    expect(error.request.headers.get("cookie")).toBeNull();
    expect(await error.request.text()).toBe("");
    expect(inspect(error)).not.toContain(secret);
    expect(inspect(error)).not.toContain("private@example.com");
    expect(inspect(error)).not.toContain("Bearer private");
    expect(inspect(error)).not.toContain("session=private");
  });

  it("classifies non-contract failures separately", async () => {
    const client = createClient({
      apiKey: "samva_sk_test",
      fetch: async () => json({ message: "not a published error" }, 502),
    });

    const error = await client.organizations.get().catch((cause: unknown) => cause);

    assert(error instanceof SamvaTransportError);
    assert(error.request instanceof Request);
    expect(error).toMatchObject({ _tag: "SamvaTransportError", status: 502 });
    expect(Array.from(error.request.headers)).toEqual([]);
  });

  it("reads a proxy's replaced 504 as the API's deadline answer", async () => {
    const client = createClient({
      apiKey: "samva_sk_test",
      fetch: async () =>
        new Response("<!DOCTYPE html><title>504: Gateway time-out</title>", {
          status: 504,
          headers: { "content-type": "text/html", "retry-after": "120" },
        }),
    });

    const error = await client.organizations.get().catch((cause: unknown) => cause);

    assert(error instanceof GatewayTimeoutError);
    expect(error).toMatchObject({ status: 504, retryAfterSeconds: 120 });
  });

  it("rejects malformed payloads even when the error tag is recognized", async () => {
    const payload = { _tag: "RateLimitedError" };
    const client = createClient({
      apiKey: "samva_sk_test",
      fetch: async () => json(payload, 429),
    });

    const error = await client.organizations.get().catch((cause: unknown) => cause);

    expect(error).toBeInstanceOf(SamvaTransportError);
    expect(error).toMatchObject({ cause: payload, status: 429 });
  });

  it("wraps fetch failures as transport errors", async () => {
    const offline = new TypeError("network unavailable");
    const client = createClient({
      apiKey: "samva_sk_test",
      fetch: async () => {
        throw offline;
      },
    });

    const error = await client.organizations.get().catch((cause: unknown) => cause);

    expect(error).toBeInstanceOf(SamvaTransportError);
    expect(error).toMatchObject({
      _tag: "SamvaTransportError",
      message: "network unavailable",
      cause: offline,
      status: undefined,
    });
  });

  it("keeps the bound Hey API envelope under raw", async () => {
    const fake = fakeSamvaApi(SamvaApi)({
      Contacts: {
        contactsFindOrCreate: () => Effect.succeed({ contact: contactFixture, created: false }),
      },
    });
    const client = createClient({
      apiKey: "samva_sk_test",
      fetch: fake.fetch,
    });

    const result = await client.raw.contacts.findOrCreate({
      lookup: { type: "email", value: "ada@example.com" },
    });

    expect(result.data).toEqual({ contact: contactFixture, created: false });
    expect(result.error).toBeUndefined();
    expect(result.request).toBeInstanceOf(Request);
    expect(result.response).toBeInstanceOf(Response);
    fake.assertComplete();
  });
});
