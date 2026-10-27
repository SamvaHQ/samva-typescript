import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Campaigns from "../../src/effect/campaigns";
import * as Client from "../../src/effect/client";
import * as Contacts from "../../src/effect/contacts";
import * as Email from "../../src/effect/email";
import * as Messages from "../../src/effect/messages";
import * as Organizations from "../../src/effect/organizations";
import * as Subscriptions from "../../src/effect/subscriptions";
import * as TopicIssues from "../../src/effect/topic-issues";
import * as Topics from "../../src/effect/topics";
import { createClient as createPromiseClient, type SamvaClient } from "../../src/promises";

type CapturedRequest = {
  readonly method: string;
  readonly path: string;
  readonly body: unknown;
  readonly idempotencyKey: string | null;
};

type CallShapeCell = {
  readonly name: string;
  readonly promise: (client: SamvaClient) => Promise<unknown>;
  readonly effect: () => Effect.Effect<unknown, unknown, Client.Service>;
};

const cells = [
  {
    name: "topic issue history numeric limit",
    promise: (client) => client.topicIssues.history({ id: "unsub_1234567890abcdef", limit: 10 }),
    effect: () => TopicIssues.history({ id: "unsub_1234567890abcdef", limit: 10 }),
  },
  {
    name: "campaign create pins a saved topic issue",
    promise: (client) =>
      client.campaigns.create({
        name: "Weekly digest",
        channel: "email",
        audience: { topicId: "unsub_1234567890abcdef" },
        content: {
          channel: "email",
          email: {},
          issue: {
            path: "issues/weekly-digest.md",
            commit: "1111111111111111111111111111111111111111",
          },
        },
      }),
    effect: () =>
      Campaigns.create({
        name: "Weekly digest",
        channel: "email",
        audience: { topicId: "unsub_1234567890abcdef" },
        content: {
          channel: "email",
          email: {},
          issue: {
            path: "issues/weekly-digest.md",
            commit: "1111111111111111111111111111111111111111",
          },
        },
      }),
  },
  {
    name: "required body without optional fields",
    promise: (client) => client.campaigns.scheduleRun({ id: "camp_7q2xk9mvt4znw8rh" }),
    effect: () => Campaigns.scheduleRun({ id: "camp_7q2xk9mvt4znw8rh" }),
  },
  {
    name: "boolean query filter",
    promise: (client) => client.email.listDomains({ limit: 10, sendable: true }),
    effect: () => Email.listDomains({ limit: 10, sendable: true }),
  },
  {
    name: "false boolean query filter",
    promise: (client) => client.email.listSenders({ isActive: false, isDefault: false }),
    effect: () => Email.listSenders({ isActive: false, isDefault: false }),
  },
  {
    name: "email download query options",
    promise: (client) =>
      client.messages.getEmail({
        id: "msg_7q2xk9mvt4znw8rh",
        includeDownloadUrls: true,
        urlExpiresIn: 60,
      }),
    effect: () =>
      Messages.getEmail({
        id: "msg_7q2xk9mvt4znw8rh",
        includeDownloadUrls: true,
        urlExpiresIn: 60,
      }),
  },
  {
    name: "topics list without filters",
    promise: (client) => client.topics.list(),
    effect: () => Topics.list(),
  },
  {
    name: "topics namespace filter",
    promise: (client) => client.topics.list({ namespaceId: "ns_1234567890abcdef" }),
    effect: () => Topics.list({ namespaceId: "ns_1234567890abcdef" }),
  },
  {
    name: "topics get",
    promise: (client) => client.topics.get({ id: "unsub_1234567890abcdef" }),
    effect: () => Topics.get({ id: "unsub_1234567890abcdef" }),
  },
  {
    name: "topics create",
    promise: (client) => client.topics.create({ name: "Newsletter", default: "opt_in" }),
    effect: () => Topics.create({ name: "Newsletter", default: "opt_in" }),
  },
  {
    name: "topics update publishing defaults",
    promise: (client) =>
      client.topics.update({ id: "unsub_1234567890abcdef", replyMailboxId: null }),
    effect: () => Topics.update({ id: "unsub_1234567890abcdef", replyMailboxId: null }),
  },
  {
    name: "topics remove",
    promise: (client) => client.topics.remove({ id: "unsub_1234567890abcdef" }),
    effect: () => Topics.remove({ id: "unsub_1234567890abcdef" }),
  },
  {
    name: "topics set default",
    promise: (client) => client.topics.setDefault({ id: "unsub_1234567890abcdef" }),
    effect: () => Topics.setDefault({ id: "unsub_1234567890abcdef" }),
  },
  {
    name: "topics subscription filters",
    promise: (client) =>
      client.topics.listSubscriptions({
        id: "unsub_1234567890abcdef",
        limit: 10,
        channel: "email",
        status: "unsubscribed",
      }),
    effect: () =>
      Topics.listSubscriptions({
        id: "unsub_1234567890abcdef",
        limit: 10,
        channel: "email",
        status: "unsubscribed",
      }),
  },
  {
    name: "topics set positive subscription status",
    promise: (client) =>
      client.topics.setSubscriptions({
        id: "unsub_1234567890abcdef",
        contacts: [{ email: "ada@example.com" }],
        channel: "email",
        status: "subscribed",
        source: "import",
      }),
    effect: () =>
      Topics.setSubscriptions({
        id: "unsub_1234567890abcdef",
        contacts: [{ email: "ada@example.com" }],
        channel: "email",
        status: "subscribed",
        source: "import",
      }),
  },
  {
    name: "topics check effective subscription",
    promise: (client) =>
      client.topics.checkSubscription({
        email: "ada@example.com",
        channel: "email",
        topicIds: "unsub_1234567890abcdef",
      }),
    effect: () =>
      Topics.checkSubscription({
        email: "ada@example.com",
        channel: "email",
        topicIds: "unsub_1234567890abcdef",
      }),
  },
  {
    name: "explicitly clear template topic",
    promise: (client) =>
      client.email.send(
        {
          to: "ada@example.com",
          templateSlug: "confirmation",
          topicId: null,
        },
        { idempotencyKey: "confirm-override" },
      ),
    effect: () =>
      Email.send(
        {
          to: "ada@example.com",
          templateSlug: "confirmation",
          topicId: null,
        },
        { idempotencyKey: "confirm-override" },
      ),
  },
  {
    name: "subscription consent",
    promise: (client) =>
      client.subscriptions.subscribe({
        email: "ada@example.com",
        from: { email: "newsletter@example.com", name: "Example" },
        topicId: "unsub_7q2xk9mvt4znw8rh",
        templateSlug: "newsletter-confirmation",
        consentIp: "192.0.2.10",
        consentSource: "newsletter-form",
      }),
    effect: () =>
      Subscriptions.subscribe({
        email: "ada@example.com",
        from: { email: "newsletter@example.com", name: "Example" },
        topicId: "unsub_7q2xk9mvt4znw8rh",
        templateSlug: "newsletter-confirmation",
        consentIp: "192.0.2.10",
        consentSource: "newsletter-form",
      }),
  },
  {
    name: "payload",
    promise: (client) =>
      client.contacts.findOrCreate({ lookup: { type: "email", value: "ada@example.com" } }),
    effect: () => Contacts.findOrCreate({ lookup: { type: "email", value: "ada@example.com" } }),
  },
  {
    name: "contacts list without filters",
    promise: (client) => client.contacts.list(),
    effect: () => Contacts.list(),
  },
  {
    name: "params",
    promise: (client) => client.contacts.list({ limit: 10, cursor: "next" }),
    effect: () => Contacts.list({ limit: 10, cursor: "next" }),
  },
  {
    name: "path",
    promise: (client) => client.contacts.get({ id: "contact_7q2xk9mvt4znw8rh" }),
    effect: () => Contacts.get({ id: "contact_7q2xk9mvt4znw8rh" }),
  },
  {
    name: "path plus payload",
    promise: (client) => client.contacts.update({ id: "contact_7q2xk9mvt4znw8rh", name: "Ada" }),
    effect: () => Contacts.update({ id: "contact_7q2xk9mvt4znw8rh", name: "Ada" }),
  },
  {
    name: "path plus params",
    promise: (client) =>
      client.contacts.getActivityTimeline({
        id: "contact_7q2xk9mvt4znw8rh",
        limit: 10,
        cursor: "next",
      }),
    effect: () =>
      Contacts.getActivityTimeline({
        id: "contact_7q2xk9mvt4znw8rh",
        limit: 10,
        cursor: "next",
      }),
  },
  {
    name: "no argument",
    promise: (client) => client.organizations.get(),
    effect: () => Organizations.get(),
  },
  {
    // The Effect facade hoists `idempotencyKey` into the `idempotency-key`
    // header; the Promise leg takes the generated flat params. Only
    // `confirmationName` goes on the wire body either way.
    name: "idempotent payload",
    promise: (client) =>
      client.organizations.delete({ "idempotency-key": "idem_1", confirmationName: "Acme" }),
    effect: () => Organizations.delete({ confirmationName: "Acme", idempotencyKey: "idem_1" }),
  },
  {
    name: "idempotent path",
    promise: (client) =>
      client.email.rotateDomainDkim({
        id: "dom_7q2xk9mvt4znw8rh",
        "idempotency-key": "rotation-1",
      }),
    effect: () =>
      Email.rotateDomainDkim({ id: "dom_7q2xk9mvt4znw8rh", idempotencyKey: "rotation-1" }),
  },
  {
    name: "ergonomic idempotent sender payload",
    promise: (client) =>
      client.email.addSender(
        { email: "sender@example.com", name: "Sender" },
        { idempotencyKey: "sender-idem-1" },
      ),
    effect: () =>
      Email.addSender(
        { email: "sender@example.com", name: "Sender" },
        { idempotencyKey: "sender-idem-1" },
      ),
  },
  {
    // Both clients send the caller's key as the `idempotency-key` header and
    // leave it off the message body.
    name: "ergonomic idempotent email send",
    promise: (client) =>
      client.email.send(
        { to: "ada@example.com", subject: "Hello", html: "<p>Hi</p>" },
        { idempotencyKey: "send-idem-1" },
      ),
    effect: () =>
      Email.send(
        { to: "ada@example.com", subject: "Hello", html: "<p>Hi</p>" },
        { idempotencyKey: "send-idem-1" },
      ),
  },
  {
    name: "ergonomic idempotent message send",
    promise: (client) =>
      client.messages.send(
        { channel: "email", to: "ada@example.com", email: { subject: "Hello", html: "<p>Hi</p>" } },
        { idempotencyKey: "send-idem-2" },
      ),
    effect: () =>
      Messages.send(
        { channel: "email", to: "ada@example.com", email: { subject: "Hello", html: "<p>Hi</p>" } },
        { idempotencyKey: "send-idem-2" },
      ),
  },
  {
    // Optional properties a caller leaves `undefined` are omitted from the wire body by both clients.
    name: "campaign create with undefined optional properties",
    promise: (client) =>
      client.campaigns.create({
        name: "Launch",
        channel: "email",
        content: {
          channel: "email",
          email: {
            subject: "Hello",
            text: "Hi",
            templateData: { name: undefined, plan: "pro" },
            locale: undefined,
          },
          metadata: undefined,
        },
        audience: {
          topicId: "unsub_1234567890abcdef",
          contactIds: ["contact_7q2xk9mvt4znw8rh"],
          includeTags: undefined,
        },
        policy: undefined,
      }),
    effect: () =>
      Campaigns.create({
        name: "Launch",
        channel: "email",
        content: {
          channel: "email",
          email: {
            subject: "Hello",
            text: "Hi",
            templateData: { name: undefined, plan: "pro" },
            locale: undefined,
          },
          metadata: undefined,
        },
        audience: {
          topicId: "unsub_1234567890abcdef",
          contactIds: ["contact_7q2xk9mvt4znw8rh"],
          includeTags: undefined,
        },
        policy: undefined,
      }),
  },
] satisfies ReadonlyArray<CallShapeCell>;

const failureResponse = (): Response =>
  new Response(
    JSON.stringify({
      _tag: "InternalError",
      message: "test failure",
    }),
    {
      status: 500,
      headers: { "content-type": "application/json" },
    },
  );

const decodedBody = (body: BodyInit | null | undefined): unknown => {
  if (body === undefined || body === null) return undefined;
  const text = typeof body === "string" ? body : new TextDecoder().decode(body as Uint8Array);
  return JSON.parse(text);
};

const capturePromise = async (cell: CallShapeCell): Promise<CapturedRequest> => {
  let captured: CapturedRequest | undefined;
  const fetch: typeof globalThis.fetch = async (input: URL | RequestInfo) => {
    const request = input as Request;
    const url = new URL(request.url);
    const text = await request.clone().text();
    captured = {
      method: request.method,
      path: `${url.pathname}${url.search}`,
      body: text.length === 0 ? undefined : JSON.parse(text),
      idempotencyKey: request.headers.get("idempotency-key"),
    };
    return failureResponse();
  };

  await cell
    .promise(createPromiseClient({ apiKey: "samva_sk_test", fetch }))
    .catch(() => undefined);
  if (captured === undefined) expect.fail(`${cell.name} Promise call did not reach fetch`);
  return captured;
};

const captureEffect = (cell: CallShapeCell): Promise<CapturedRequest> => {
  let captured: CapturedRequest | undefined;
  const fetch: typeof globalThis.fetch = async (input: URL | RequestInfo, init?: RequestInit) => {
    const url = new URL(input.toString());
    captured = {
      method: init?.method ?? "GET",
      path: `${url.pathname}${url.search}`,
      body: decodedBody(init?.body),
      idempotencyKey: new Headers(init?.headers).get("idempotency-key"),
    };
    return failureResponse();
  };

  return Effect.runPromise(
    Effect.gen(function* () {
      yield* cell
        .effect()
        .pipe(Effect.provide(Client.layer({ apiKey: "samva_sk_test" })), Effect.exit);
      if (captured === undefined) expect.fail(`${cell.name} Effect call did not reach fetch`);
      return captured;
    }).pipe(
      Effect.provide(
        Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
      ),
    ),
  );
};

// The cells exercise every descriptor kind the facade adapter maps (payload,
// params, path, path+payload, path+params, none, idempotentPayload). The Effect client
// now decodes/encodes path params and payloads through the real branded contract
// schemas, so ids use valid `<prefix>_<crockford>` shapes; per-operation
// inventory parity is covered by `services.test.ts`.
describe("Promise and Effect direct call-shape parity", () => {
  for (const cell of cells) {
    it(cell.name, async () => {
      const [promiseRequest, effectRequest] = await Promise.all([
        capturePromise(cell),
        captureEffect(cell),
      ]);
      expect(effectRequest).toEqual(promiseRequest);
      if (cell.name === "required body without optional fields") {
        expect(promiseRequest.body).toEqual({});
      }
      if (cell.name === "boolean query filter") {
        const query = new URL(promiseRequest.path, "https://samva.dev").searchParams;
        expect(query.get("sendable")).toBe("true");
        expect(query.get("limit")).toBe("10");
      }
      if (cell.name === "false boolean query filter") {
        const query = new URL(promiseRequest.path, "https://samva.dev").searchParams;
        expect(query.get("isActive")).toBe("false");
        expect(query.get("isDefault")).toBe("false");
      }
      if (cell.name === "email download query options") {
        const query = new URL(promiseRequest.path, "https://samva.dev").searchParams;
        expect(query.get("includeDownloadUrls")).toBe("true");
        expect(query.get("urlExpiresIn")).toBe("60");
      }
      if (cell.name === "topic issue history numeric limit") {
        const query = new URL(promiseRequest.path, "https://samva.dev").searchParams;
        expect(promiseRequest.path.split("?")[0]).toBe(
          "/v1/topics/unsub_1234567890abcdef/issues/history",
        );
        expect(query.get("limit")).toBe("10");
      }
      if (cell.name === "campaign create pins a saved topic issue") {
        expect(promiseRequest.method).toBe("POST");
        expect(promiseRequest.path).toBe("/v1/campaigns");
        expect(promiseRequest.body).toEqual({
          name: "Weekly digest",
          channel: "email",
          audience: { topicId: "unsub_1234567890abcdef" },
          content: {
            channel: "email",
            email: {},
            issue: {
              path: "issues/weekly-digest.md",
              commit: "1111111111111111111111111111111111111111",
            },
          },
        });
      }
      if (cell.name === "explicitly clear template topic") {
        expect(promiseRequest.body).toMatchObject({
          email: { templateSlug: "confirmation", topicId: null },
        });
      }
      if (cell.name === "subscription consent") {
        expect(promiseRequest.method).toBe("POST");
        expect(promiseRequest.path).toBe("/v1/subscriptions");
        expect(promiseRequest.body).toEqual({
          email: "ada@example.com",
          from: { email: "newsletter@example.com", name: "Example" },
          topicId: "unsub_7q2xk9mvt4znw8rh",
          templateSlug: "newsletter-confirmation",
          consentIp: "192.0.2.10",
          consentSource: "newsletter-form",
        });
      }
    });
  }
});

// An operation whose only input is an all-optional body still requires the body object: a call
// with no input sends `{}` from both clients, never an empty body the API rejects.
describe("omitted all-optional request bodies", () => {
  const omitted = [
    {
      name: "organization update without arguments",
      promise: (client) => client.organizations.update(),
      effect: () => Organizations.update(),
    },
    {
      name: "organization update with only undefined fields",
      promise: (client) => client.organizations.update({ name: undefined }),
      effect: () => Organizations.update({ name: undefined }),
    },
    {
      name: "tracking defaults update without arguments",
      promise: (client) => client.email.updateTrackingDefaults(),
      effect: () => Email.updateTrackingDefaults(),
    },
  ] satisfies ReadonlyArray<CallShapeCell>;

  for (const cell of omitted) {
    it(cell.name, async () => {
      const [promiseRequest, effectRequest] = await Promise.all([
        capturePromise(cell),
        captureEffect(cell),
      ]);
      expect(promiseRequest.body).toEqual({});
      expect(effectRequest).toEqual(promiseRequest);
    });
  }

  it("keeps explicit field values on the wire", async () => {
    const cell = {
      name: "explicit null",
      promise: (client) =>
        client.campaigns.scheduleRun({ id: "camp_7q2xk9mvt4znw8rh", scheduledFor: null }),
      effect: () => Campaigns.scheduleRun({ id: "camp_7q2xk9mvt4znw8rh", scheduledFor: null }),
    } satisfies CallShapeCell;
    const [promiseRequest, effectRequest] = await Promise.all([
      capturePromise(cell),
      captureEffect(cell),
    ]);

    expect(promiseRequest.body).toEqual({ scheduledFor: null });
    expect(effectRequest).toEqual(promiseRequest);
  });
});

describe("Promise send idempotency", () => {
  const sends = {
    "email.send": (client: SamvaClient) =>
      client.email.send({ to: "ada@example.com", subject: "Hello", html: "<p>Hi</p>" }),
    "messages.send": (client: SamvaClient) =>
      client.messages.send({
        channel: "email",
        to: "ada@example.com",
        email: { subject: "Hello", html: "<p>Hi</p>" },
      }),
  } satisfies Record<string, CallShapeCell["promise"]>;

  for (const [name, promise] of Object.entries(sends)) {
    it(`${name} sends a fresh generated idempotency-key header per call`, async () => {
      const cell = { name, promise, effect: () => Effect.void };
      const first = await capturePromise(cell);
      const second = await capturePromise(cell);

      expect(first.idempotencyKey).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
      );
      expect(second.idempotencyKey).not.toBe(first.idempotencyKey);
      expect(first.body).not.toHaveProperty("idempotencyKey");
    });
  }

  it("keeps a key the caller set as a request header", async () => {
    const request = await capturePromise({
      name: "header key",
      promise: (client) =>
        client.email.send(
          { to: "ada@example.com", subject: "Hello", html: "<p>Hi</p>" },
          { headers: { "Idempotency-Key": "receipt:order-4417" } },
        ),
      effect: () => Effect.void,
    });

    expect(request.idempotencyKey).toBe("receipt:order-4417");
  });
});
