import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Agents from "../../src/effect/agents";
import * as Analytics from "../../src/effect/analytics";
import * as Campaigns from "../../src/effect/campaigns";
import * as Client from "../../src/effect/client";
import * as Contacts from "../../src/effect/contacts";
import * as Email from "../../src/effect/email";
import { InternalError } from "../../src/effect/generated";
import * as Journeys from "../../src/effect/journeys";
import * as Messages from "../../src/effect/messages";
import * as NewsletterIssues from "../../src/effect/newsletter-issues";
import * as Newsletters from "../../src/effect/newsletters";
import * as Organizations from "../../src/effect/organizations";
import * as Subscriptions from "../../src/effect/subscriptions";
import * as Topics from "../../src/effect/topics";
import {
  createClient as createPromiseClient,
  type SamvaClient,
  type AgentDefinition,
  type JourneyDefinitionWritable,
} from "../../src/promises";

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
  readonly expected?: Omit<CapturedRequest, "idempotencyKey"> & {
    readonly idempotencyKey?: string;
  };
};

const agentId = "agt_1234567890123456";
const draft = {
  name: "Desk",
  definition: {
    instructions: "Answer routine questions.",
    knowledge: "",
    knowledgeSourceIds: [],
    endpointIds: [],
    integrations: [],
    policy: { presets: [], rules: [] },
    model: "standard",
    reasoning: "auto",
    workingHours: null,
    takeoverTimeoutMinutes: 30,
  } satisfies AgentDefinition,
};
const journeyId = "jrny_7q2xk9mvt4znw8rh";
const definition: JourneyDefinitionWritable = {
  trigger: { type: "contact.created" },
  rootNodeId: "done",
  nodes: { done: { type: "exit", config: {}, next: [] } },
};
const newsletterId = "nl_1234567890abcdef";

const cells: ReadonlyArray<CallShapeCell> = [
  {
    name: "agent rerun sends the draft",
    promise: (client) => client.agents.rerunTests({ id: agentId, ...draft }),
    effect: () => Agents.rerunTests({ id: agentId, ...draft }),
    expected: { method: "POST", path: `/v1/agents/${agentId}/tests/rerun`, body: draft },
  },
  {
    name: "journey draft revision",
    promise: (client) =>
      client.journeys.replaceDraft({ id: journeyId, revision: "rev-1", definition }),
    effect: () => Journeys.replaceDraft({ id: journeyId, revision: "rev-1", definition }),
    expected: {
      method: "PUT",
      path: `/v1/journeys/${journeyId}/draft`,
      body: { revision: "rev-1", definition },
    },
  },
  {
    name: "journey publish rev-2",
    promise: (client) => client.journeys.publish({ id: journeyId, revision: "rev-2" }),
    effect: () => Journeys.publish({ id: journeyId, revision: "rev-2" }),
    expected: {
      method: "POST",
      path: `/v1/journeys/${journeyId}/publish`,
      body: { revision: "rev-2" },
    },
  },
  {
    name: "journey publish rev-3",
    promise: (client) => client.journeys.publish({ id: journeyId, revision: "rev-3" }),
    effect: () => Journeys.publish({ id: journeyId, revision: "rev-3" }),
    expected: {
      method: "POST",
      path: `/v1/journeys/${journeyId}/publish`,
      body: { revision: "rev-3" },
    },
  },
  {
    name: "journey pause",
    promise: (client) => client.journeys.pause({ id: journeyId }),
    effect: () => Journeys.pause({ id: journeyId }),
    expected: { method: "POST", path: `/v1/journeys/${journeyId}/pause`, body: undefined },
  },
  {
    name: "journey resume",
    promise: (client) => client.journeys.resume({ id: journeyId }),
    effect: () => Journeys.resume({ id: journeyId }),
    expected: { method: "POST", path: `/v1/journeys/${journeyId}/resume`, body: undefined },
  },
  {
    name: "journey archive",
    promise: (client) => client.journeys.archive({ id: journeyId }),
    effect: () => Journeys.archive({ id: journeyId }),
    expected: { method: "POST", path: `/v1/journeys/${journeyId}/archive`, body: undefined },
  },
  {
    name: "journey runs filters",
    promise: (client) => client.journeys.listRuns({ id: journeyId, status: "active", limit: 25 }),
    effect: () => Journeys.listRuns({ id: journeyId, status: "active", limit: 25 }),
    expected: {
      method: "GET",
      path: `/v1/journeys/${journeyId}/runs?status=active&limit=25`,
      body: undefined,
    },
  },
  {
    name: "newsletter create",
    promise: (client) =>
      client.newsletters.create({ name: "Weekly" }, { idempotencyKey: "create" }),
    effect: () => Newsletters.create({ name: "Weekly" }, { idempotencyKey: "create" }),
    expected: {
      method: "POST",
      path: "/v1/newsletters",
      body: { name: "Weekly" },
      idempotencyKey: "create",
    },
  },
  {
    name: "newsletter update",
    promise: (client) =>
      client.newsletters.update(
        { id: newsletterId, archiveEnabled: true, publicationSlug: "weekly" },
        { idempotencyKey: "update" },
      ),
    effect: () =>
      Newsletters.update(
        { id: newsletterId, archiveEnabled: true, publicationSlug: "weekly" },
        { idempotencyKey: "update" },
      ),
    expected: {
      method: "PATCH",
      path: `/v1/newsletters/${newsletterId}`,
      body: { archiveEnabled: true, publicationSlug: "weekly" },
      idempotencyKey: "update",
    },
  },
  {
    name: "newsletter remove",
    promise: (client) =>
      client.newsletters.remove({ id: newsletterId }, { idempotencyKey: "delete" }),
    effect: () => Newsletters.remove({ id: newsletterId }, { idempotencyKey: "delete" }),
    expected: {
      method: "DELETE",
      path: `/v1/newsletters/${newsletterId}`,
      body: undefined,
      idempotencyKey: "delete",
    },
  },
  {
    name: "contact timeline filters",
    promise: (client) =>
      client.contacts.listEvents({
        id: "contact_7q2xk9mvt4znw8rh",
        limit: 25,
        cursor: "resume-here",
      }),
    effect: () =>
      Contacts.listEvents({ id: "contact_7q2xk9mvt4znw8rh", limit: 25, cursor: "resume-here" }),
    expected: {
      method: "GET",
      path: "/v1/contacts/contact_7q2xk9mvt4znw8rh/events?limit=25&cursor=resume-here",
      body: undefined,
    },
  },

  {
    name: "absolute instant query encodes Date input",
    promise: (client) => client.analytics.getStats({ after: "2026-10-01T00:00:00.000Z" }),
    effect: () => Analytics.getStats({ after: new Date("2026-10-01T00:00:00.000Z") }),
  },
  {
    name: "topic issue history numeric limit",
    promise: (client) =>
      client.newsletters.issues.history({ id: "nl_1234567890abcdef", limit: 10 }),
    effect: () => NewsletterIssues.history({ id: "nl_1234567890abcdef", limit: 10 }),
  },
  {
    name: "campaign create pins a saved topic issue",
    promise: (client) =>
      client.campaigns.create({
        name: "Weekly digest",
        channel: "email",
        audience: { topicId: "tpc_1234567890abcdef" },
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
        audience: { topicId: "tpc_1234567890abcdef" },
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
    promise: (client) =>
      client.campaigns.scheduleRun({ id: "camp_7q2xk9mvt4znw8rh" }, { idempotencyKey: "run-1" }),
    effect: () =>
      Campaigns.scheduleRun({ id: "camp_7q2xk9mvt4znw8rh" }, { idempotencyKey: "run-1" }),
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
    promise: (client) => client.topics.get({ id: "tpc_1234567890abcdef" }),
    effect: () => Topics.get({ id: "tpc_1234567890abcdef" }),
  },
  {
    name: "topics create",
    promise: (client) => client.topics.create({ name: "Newsletter", default: "opt_in" }),
    effect: () => Topics.create({ name: "Newsletter", default: "opt_in" }),
  },
  {
    name: "topics update publishing defaults",
    promise: (client) => client.topics.update({ id: "tpc_1234567890abcdef", replyMailboxId: null }),
    effect: () => Topics.update({ id: "tpc_1234567890abcdef", replyMailboxId: null }),
  },
  {
    name: "topics remove",
    promise: (client) => client.topics.remove({ id: "tpc_1234567890abcdef" }),
    effect: () => Topics.remove({ id: "tpc_1234567890abcdef" }),
  },
  {
    name: "topics set default",
    promise: (client) => client.topics.setDefault({ id: "tpc_1234567890abcdef" }),
    effect: () => Topics.setDefault({ id: "tpc_1234567890abcdef" }),
  },
  {
    name: "topics subscription filters",
    promise: (client) =>
      client.topics.listSubscriptions({
        id: "tpc_1234567890abcdef",
        limit: 10,
        channel: "email",
        status: "unsubscribed",
      }),
    effect: () =>
      Topics.listSubscriptions({
        id: "tpc_1234567890abcdef",
        limit: 10,
        channel: "email",
        status: "unsubscribed",
      }),
  },
  {
    name: "topics set positive subscription status",
    promise: (client) =>
      client.topics.setSubscriptions({
        id: "tpc_1234567890abcdef",
        contacts: [{ email: "ada@example.com" }],
        channel: "email",
        status: "subscribed",
        source: "import",
      }),
    effect: () =>
      Topics.setSubscriptions({
        id: "tpc_1234567890abcdef",
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
        topicIds: "tpc_1234567890abcdef",
      }),
    effect: () =>
      Topics.checkSubscription({
        email: "ada@example.com",
        channel: "email",
        topicIds: "tpc_1234567890abcdef",
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
        topicId: "tpc_7q2xk9mvt4znw8rh",
        templateSlug: "newsletter-confirmation",
        consentIp: "192.0.2.10",
        consentSource: "newsletter-form",
      }),
    effect: () =>
      Subscriptions.subscribe({
        email: "ada@example.com",
        from: { email: "newsletter@example.com", name: "Example" },
        topicId: "tpc_7q2xk9mvt4znw8rh",
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
    name: "idempotent payload",
    promise: (client) =>
      client.organizations.delete({ confirmationName: "Acme" }, { idempotencyKey: "idem_1" }),
    effect: () => Organizations.delete({ confirmationName: "Acme" }, { idempotencyKey: "idem_1" }),
  },
  {
    name: "idempotent path",
    promise: (client) =>
      client.email.rotateDomainDkim(
        { id: "dom_7q2xk9mvt4znw8rh" },
        { idempotencyKey: "rotation-1" },
      ),
    effect: () =>
      Email.rotateDomainDkim({ id: "dom_7q2xk9mvt4znw8rh" }, { idempotencyKey: "rotation-1" }),
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
          topicId: "tpc_1234567890abcdef",
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
          topicId: "tpc_1234567890abcdef",
          contactIds: ["contact_7q2xk9mvt4znw8rh"],
          includeTags: undefined,
        },
        policy: undefined,
      }),
  },
] satisfies ReadonlyArray<CallShapeCell>;

const failureResponse = (): Response =>
  new Response(JSON.stringify(new InternalError({ message: "test failure" })), {
    status: 500,
    headers: { "content-type": "application/json" },
  });

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
      if (cell.expected !== undefined) {
        expect(promiseRequest).toEqual({
          ...cell.expected,
          idempotencyKey: cell.expected.idempotencyKey ?? null,
        });
      }
      if (cell.name === "required body without optional fields") {
        expect(promiseRequest.body).toEqual({});
      }
      if (cell.name === "absolute instant query encodes Date input") {
        const query = new URL(effectRequest.path, "https://samva.dev").searchParams;
        expect(query.get("after")).toBe("2026-10-01T00:00:00.000Z");
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
          "/v1/newsletters/nl_1234567890abcdef/issues/history",
        );
        expect(query.get("limit")).toBe("10");
      }
      if (cell.name === "campaign create pins a saved topic issue") {
        expect(promiseRequest.method).toBe("POST");
        expect(promiseRequest.path).toBe("/v1/campaigns");
        expect(promiseRequest.body).toEqual({
          name: "Weekly digest",
          channel: "email",
          audience: { topicId: "tpc_1234567890abcdef" },
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
          topicId: "tpc_7q2xk9mvt4znw8rh",
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
        client.campaigns.scheduleRun(
          { id: "camp_7q2xk9mvt4znw8rh", scheduledFor: null },
          { idempotencyKey: "run-1" },
        ),
      effect: () =>
        Campaigns.scheduleRun(
          { id: "camp_7q2xk9mvt4znw8rh", scheduledFor: null },
          { idempotencyKey: "run-1" },
        ),
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

  it("ignores a key supplied as a request header", async () => {
    const request = await capturePromise({
      name: "header key",
      promise: (client) =>
        client.email.send(
          { to: "ada@example.com", subject: "Hello", html: "<p>Hi</p>" },
          { headers: { "Idempotency-Key": "receipt:order-4417" } },
        ),
      effect: () => Effect.void,
    });

    expect(request.idempotencyKey).not.toBe("receipt:order-4417");
    expect(request.idempotencyKey).toMatch(/^[0-9a-f-]{36}$/);
  });
});
