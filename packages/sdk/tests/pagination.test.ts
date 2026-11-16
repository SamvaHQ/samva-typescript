import { describe, expect, it } from "@effect/vitest";
import { Duration, Effect, Fiber, Layer, Schema, Stream } from "effect";
import { FetchHttpClient } from "effect/http";
import { TestClock } from "effect/testing";

import {
  WhatsApp,
  WhatsAppFlows,
  WhatsAppSetupLinks,
  TemplateRegistrations,
  TemplateShareLinks,
} from "../src/effect";
import {
  Accounts,
  Integrations,
  IntegrationCatalog,
  Agents,
  Analytics,
  ApiKeys,
  ApprovalRequests,
  Attachments,
  Brands,
  Campaigns,
  ContactGroups,
  Contacts,
  Conversations,
  CustomFields,
  Email,
  Events,
  ExtensionInstallations,
  Extensions,
  Feedback,
  Journeys,
  Mailboxes,
  Media,
  Messages,
  Namespaces,
  Operations,
  Organizations,
  Policies,
  ScheduledMessages,
  Subscriptions,
  Templates,
  NewsletterIssues,
  Newsletters,
  NewsletterDomains,
  TopicForms,
  Topics,
  Webhooks,
  Whoami,
} from "../src/effect";
import * as Client from "../src/effect/client";
import * as Api from "../src/effect/generated";
import { SamvaOperations } from "../src/effect/generated-metadata";
import {
  type CursorPageEnvelope,
  streamCursorItems,
  streamCursorPages,
} from "../src/effect/pagination";
import { createClient as createPromiseClient } from "../src/promises";
import { SDK_SERVICE_OPERATIONS } from "../src/service-map";
import { fakeSamvaApi } from "./support/fake-samva-api";

/**
 * Stream pagination. The paginator core (`streamCursorPages`/`streamCursorItems`)
 * is exercised against a request-counting fake operation for traversal,
 * laziness, and empty-page semantics; the facade wiring is checked for uniform
 * `.pages()`/`.items()` availability and end-to-end decoding + retry composition
 * through a stubbed `HttpClient`.
 */

// A fake cursor list over `pages`: page n answers cursor `c<n+1>` until the last.
const fakeCursorOperation = (pages: ReadonlyArray<ReadonlyArray<number>>) => {
  const requested: Array<string | undefined> = [];
  const operation = (input: {
    readonly cursor?: string | undefined;
  }): Effect.Effect<CursorPageEnvelope<number>> =>
    Effect.sync(() => {
      requested.push(input.cursor);
      const index = input.cursor === undefined ? 0 : Number(input.cursor.slice(1));
      return {
        items: pages[index] ?? [],
        nextCursor: index + 1 < pages.length ? `c${index + 1}` : null,
      };
    });
  return { operation, requested };
};

describe("cursor paginator core (streamCursorPages / streamCursorItems)", () => {
  it.effect("follows nextCursor until it is null", () =>
    Effect.gen(function* () {
      const { operation, requested } = fakeCursorOperation([[1, 2], [3], [4]]);
      const items = yield* Stream.runCollect(streamCursorItems(operation, {}));
      expect(items).toEqual([1, 2, 3, 4]);
      expect(requested).toEqual([undefined, "c1", "c2"]);
    }),
  );

  it.effect("an empty first page yields no items and makes exactly one request", () =>
    Effect.gen(function* () {
      const { operation, requested } = fakeCursorOperation([[]]);
      const items = yield* Stream.runCollect(streamCursorItems(operation, {}));
      expect(items).toEqual([]);
      expect(requested).toEqual([undefined]);
    }),
  );

  it.effect("passes filters through on every page", () =>
    Effect.gen(function* () {
      const seen: Array<Record<string, unknown>> = [];
      const operation = (input: {
        readonly cursor?: string | undefined;
        readonly status?: string;
      }): Effect.Effect<CursorPageEnvelope<number>> =>
        Effect.sync(() => {
          seen.push({ ...input });
          return input.cursor === undefined
            ? { items: [1], nextCursor: "c1" }
            : { items: [2], nextCursor: null };
        });
      const items = yield* Stream.runCollect(streamCursorItems(operation, { status: "active" }));
      expect(items).toEqual([1, 2]);
      expect(seen).toEqual([
        { status: "active", cursor: undefined },
        { status: "active", cursor: "c1" },
      ]);
    }),
  );

  it.effect("starts at the caller's cursor and stops lazily", () =>
    Effect.gen(function* () {
      const { operation, requested } = fakeCursorOperation([[1], [2], [3], [4]]);
      const pages = yield* Stream.runCollect(
        streamCursorPages(operation, { cursor: "c1" }).pipe(Stream.take(2)),
      );
      expect(pages.map((page) => page.items)).toEqual([[2], [3]]);
      expect(requested).toEqual(["c1", "c2"]);
    }),
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Facade wiring
// ─────────────────────────────────────────────────────────────────────────────

// Page n of a domains list: its cursor names the next page until the last.
const domainsPage = (page: number, totalPages: number): Api.EmailListDomains200 =>
  Schema.decodeSync(Api.EmailListDomains200)({
    items: [
      {
        id: `dom_7q2xk9mvt4znw8r${page}`,
        domain: `example${page}.com`,
        unknownRecipientMailboxId: null,
        namespaceId: null,
        shared: false,
        phase: "ready",
        isDefault: false,
        deliverability: {
          bounceRate: 0,
          complaintRate: 0,
          windowSends: 0,
          sendingStatus: "enabled",
        },
        series: Array.from({ length: 14 }, () => 0),
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
    ],
    nextCursor: page < totalPages ? `page-${page + 1}` : null,
  });

const pageOf = (cursor: string | undefined): number =>
  cursor ? Number(cursor.slice("page-".length)) : 1;

const effectModules = {
  accounts: Accounts,
  integrations: Integrations,
  integrationCatalog: IntegrationCatalog,
  agents: Agents,
  whatsapp: WhatsApp,
  whatsappFlows: WhatsAppFlows,
  whatsappSetupLinks: WhatsAppSetupLinks,
  templateRegistrations: TemplateRegistrations,
  templateShareLinks: TemplateShareLinks,
  analytics: Analytics,
  apiKeys: ApiKeys,
  approvalRequests: ApprovalRequests,
  attachments: Attachments,
  brands: Brands,
  campaigns: Campaigns,
  contactGroups: ContactGroups,
  contacts: Contacts,
  conversations: Conversations,
  customFields: CustomFields,
  email: Email,
  events: Events,
  extensionInstallations: ExtensionInstallations,
  extensions: Extensions,
  feedback: Feedback,
  journeys: Journeys,
  mailboxes: Mailboxes,
  media: Media,
  messages: Messages,
  namespaces: Namespaces,
  operations: Operations,
  organizations: Organizations,
  policies: Policies,
  scheduledMessages: ScheduledMessages,
  subscriptions: Subscriptions,
  templates: Templates,
  newsletters: Newsletters,
  newsletterIssues: NewsletterIssues,
  newsletterDomains: NewsletterDomains,
  topicForms: TopicForms,
  topics: Topics,
  webhooks: Webhooks,
  whoami: Whoami,
} satisfies Record<keyof typeof SDK_SERVICE_OPERATIONS, object>;

describe("facade pagination wiring", () => {
  it.effect("every uniform-envelope list op exposes .pages()/.items(); non-list ops do not", () =>
    Effect.sync(() => {
      const metadata: Readonly<Record<string, { readonly paginated: boolean }>> = SamvaOperations;
      for (const [service, operations] of Object.entries(SDK_SERVICE_OPERATIONS)) {
        const domain = effectModules[service as keyof typeof effectModules] as Record<
          string,
          unknown
        >;
        for (const [method, id] of Object.entries(operations)) {
          const target = domain[method] as Record<string, unknown>;
          expect(typeof target.pages === "function", `${service}.${method}.pages`).toBe(
            metadata[id]?.paginated,
          );
          expect(typeof target.items === "function", `${service}.${method}.items`).toBe(
            metadata[id]?.paginated,
          );
        }
      }
    }),
  );

  it("attaches the Promise cursor helpers exactly where the operation is paginated", () => {
    // The Promise client reads the whole-client table when it builds each service, so this is the
    // guard that a focused Effect split did not take the Promise helpers with it.
    const client = createPromiseClient({ apiKey: "samva_sk_pagination" });
    const services = {
      ...client,
      newsletterIssues: client.newsletters.issues,
      newsletterDomains: client.newsletters.domains,
    };
    const hasCursorHelper = (target: unknown, helper: "pages" | "items"): boolean =>
      typeof target === "function" &&
      typeof (target as { readonly pages?: unknown; readonly items?: unknown })[helper] ===
        "function";
    const serviceNames = Object.keys(SDK_SERVICE_OPERATIONS) as ReadonlyArray<
      keyof typeof SDK_SERVICE_OPERATIONS
    >;
    for (const serviceName of serviceNames) {
      const service = services[serviceName] as Readonly<Record<string, unknown>>;
      for (const [method, id] of Object.entries(SDK_SERVICE_OPERATIONS[serviceName])) {
        const target = service[method];
        const paginated = SamvaOperations[id as keyof typeof SamvaOperations].paginated;
        expect(hasCursorHelper(target, "pages"), `${serviceName}.${method}.pages`).toBe(paginated);
        expect(hasCursorHelper(target, "items"), `${serviceName}.${method}.items`).toBe(paginated);
      }
    }
    // Contact events is the one wrapper a hand-written expression builds.
    const listEvents = (services.contacts as Readonly<Record<string, unknown>>).listEvents;
    expect(hasCursorHelper(listEvents, "pages")).toBe(true);
    expect(hasCursorHelper(listEvents, "items")).toBe(true);
  });

  it.effect(
    "streams decoded items across pages through the real client (one request per page)",
    () =>
      Effect.gen(function* () {
        const api = fakeSamvaApi(Api.SamvaApi)({
          Email: {
            emailListDomains: ({ query }) => Effect.succeed(domainsPage(pageOf(query.cursor), 3)),
          },
        });
        const client = Layer.provide(
          Client.layer({ apiKey: "samva_sk_test" }),
          Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, api.fetch)),
        );
        const domains = yield* Stream.runCollect(Email.listDomains.items()).pipe(
          Effect.provide(client),
        );
        expect(domains.map((domain) => domain.domain)).toEqual([
          "example1.com",
          "example2.com",
          "example3.com",
        ]);
        // Lazy full traversal: exactly one request per page, no re-fetching.
        expect(api.requests).toHaveLength(3);
        expect(api.requests.map(({ query }) => query.cursor)).toEqual([
          undefined,
          "page-2",
          "page-3",
        ]);
        api.assertComplete();
      }),
  );

  it.effect("composes with the ambient retry policy: a transient page failure is retried", () =>
    Effect.gen(function* () {
      let page2Failures = 0;
      const api = fakeSamvaApi(Api.SamvaApi)({
        Email: {
          emailListDomains: ({ query }) => {
            const page = pageOf(query.cursor);
            if (page === 2 && page2Failures === 0) {
              page2Failures += 1;
              return Effect.fail(
                Schema.decodeSync(Api.InternalError)({ _tag: "InternalError", message: "boom" }),
              );
            }
            return Effect.succeed(domainsPage(page, 2));
          },
        },
      });
      const client = Layer.provide(
        Client.layer({ apiKey: "samva_sk_test" }),
        Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, api.fetch)),
      );
      const fiber = yield* Effect.forkChild(
        Stream.runCollect(Email.listDomains.items()).pipe(Effect.provide(client)),
        { startImmediately: true },
      );
      // Advance past the backoff so the single page-2 retry fires.
      yield* TestClock.adjust(Duration.minutes(1));
      const domains = yield* Fiber.join(fiber);

      expect(domains.map((domain) => domain.domain)).toEqual(["example1.com", "example2.com"]);
      // page1 (1) + page2 failure+retry (2) = 3 requests; retry lives in the
      // per-page fetch, not around the whole stream.
      expect(api.requests).toHaveLength(3);
      expect(api.requests.map(({ query }) => query.cursor)).toEqual([
        undefined,
        "page-2",
        "page-2",
      ]);
      api.assertComplete();
    }),
  );
});
