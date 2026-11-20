import { describe, expect, it } from "@effect/vitest";

import {
  WhatsApp,
  WhatsAppFlows,
  WhatsAppSetupLinks,
  TemplateRegistrations,
  TemplateShareLinks,
} from "../../src/effect";
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
  Topics,
  TopicForms,
  NewsletterIssues,
  Newsletters,
  NewsletterDomains,
  Webhooks,
  Whoami,
} from "../../src/effect";
import { accountsOperations } from "../../src/effect/descriptors/accounts";
import { agentsOperations } from "../../src/effect/descriptors/agents";
import { analyticsOperations } from "../../src/effect/descriptors/analytics";
import { apiKeysOperations } from "../../src/effect/descriptors/api-keys";
import { approvalRequestsOperations } from "../../src/effect/descriptors/approval-requests";
import { attachmentsOperations } from "../../src/effect/descriptors/attachments";
import { brandsOperations } from "../../src/effect/descriptors/brands";
import { campaignsOperations } from "../../src/effect/descriptors/campaigns";
import { contactGroupsOperations } from "../../src/effect/descriptors/contact-groups";
import { contactsOperations } from "../../src/effect/descriptors/contacts";
import { conversationsOperations } from "../../src/effect/descriptors/conversations";
import { customFieldsOperations } from "../../src/effect/descriptors/custom-fields";
import { emailOperations } from "../../src/effect/descriptors/email";
import { eventsOperations } from "../../src/effect/descriptors/events";
import { feedbackOperations } from "../../src/effect/descriptors/feedback";
import { integrationsOperations } from "../../src/effect/descriptors/integrations";
import { integrationCatalogOperations } from "../../src/effect/descriptors/integrations-catalog";
import { journeysOperations } from "../../src/effect/descriptors/journeys";
import { mailboxesOperations } from "../../src/effect/descriptors/mailboxes";
import { mediaOperations } from "../../src/effect/descriptors/media";
import { messagesOperations } from "../../src/effect/descriptors/messages";
import { namespacesOperations } from "../../src/effect/descriptors/namespaces";
import { newsletterDomainsOperations } from "../../src/effect/descriptors/newsletter-domains";
import { newsletterIssuesOperations } from "../../src/effect/descriptors/newsletter-issues";
import { newslettersOperations } from "../../src/effect/descriptors/newsletters";
import { operationsOperations } from "../../src/effect/descriptors/operations";
import { organizationsOperations } from "../../src/effect/descriptors/organizations";
import { policiesOperations } from "../../src/effect/descriptors/policies";
import { scheduledMessagesOperations } from "../../src/effect/descriptors/scheduled-messages";
import { subscriptionsOperations } from "../../src/effect/descriptors/subscriptions";
import { templateRegistrationsOperations } from "../../src/effect/descriptors/template-registrations";
import { templateShareLinksOperations } from "../../src/effect/descriptors/template-share-links";
import { templatesOperations } from "../../src/effect/descriptors/templates";
import { topicFormsOperations } from "../../src/effect/descriptors/topic-forms";
import { topicsOperations } from "../../src/effect/descriptors/topics";
import { webhooksOperations } from "../../src/effect/descriptors/webhooks";
import { whatsappOperations } from "../../src/effect/descriptors/whats-app";
import { whatsappFlowsOperations } from "../../src/effect/descriptors/whats-app-flows";
import { whatsappSetupLinksOperations } from "../../src/effect/descriptors/whats-app-setup-links";
import { whoamiOperations } from "../../src/effect/descriptors/whoami";
import { SamvaOperations } from "../../src/effect/generated-metadata";
import { SamvaApi } from "../../src/effect/generated/index";
import { createClient as createPromiseClient } from "../../src/promises";
import { SDK_OPERATION_CALLS, SDK_SERVICE_OPERATIONS } from "../../src/service-map";

const sortedKeys = <Value extends object>(value: Value): ReadonlyArray<string> =>
  Object.keys(value).sort();

const generatedOperationNames = (): ReadonlyArray<string> =>
  Object.values(SamvaApi.groups)
    .flatMap((group) => Object.keys(group.endpoints))
    .sort();

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
  topics: Topics,
  topicForms: TopicForms,
  newsletters: Newsletters,
  newsletterIssues: NewsletterIssues,
  newsletterDomains: NewsletterDomains,
  webhooks: Webhooks,
  whoami: Whoami,
} satisfies Record<keyof typeof SDK_SERVICE_OPERATIONS, object>;

/** Each domain's own descriptor table, the metadata its focused entry loads. */
const descriptorTables = {
  accounts: accountsOperations,
  integrations: integrationsOperations,
  integrationCatalog: integrationCatalogOperations,
  agents: agentsOperations,
  whatsapp: whatsappOperations,
  whatsappFlows: whatsappFlowsOperations,
  whatsappSetupLinks: whatsappSetupLinksOperations,
  templateRegistrations: templateRegistrationsOperations,
  templateShareLinks: templateShareLinksOperations,
  analytics: analyticsOperations,
  apiKeys: apiKeysOperations,
  approvalRequests: approvalRequestsOperations,
  attachments: attachmentsOperations,
  brands: brandsOperations,
  campaigns: campaignsOperations,
  contactGroups: contactGroupsOperations,
  contacts: contactsOperations,
  conversations: conversationsOperations,
  customFields: customFieldsOperations,
  email: emailOperations,
  events: eventsOperations,
  feedback: feedbackOperations,
  journeys: journeysOperations,
  mailboxes: mailboxesOperations,
  media: mediaOperations,
  messages: messagesOperations,
  namespaces: namespacesOperations,
  operations: operationsOperations,
  organizations: organizationsOperations,
  policies: policiesOperations,
  scheduledMessages: scheduledMessagesOperations,
  subscriptions: subscriptionsOperations,
  templates: templatesOperations,
  topics: topicsOperations,
  topicForms: topicFormsOperations,
  newsletters: newslettersOperations,
  newsletterIssues: newsletterIssuesOperations,
  newsletterDomains: newsletterDomainsOperations,
  webhooks: webhooksOperations,
  whoami: whoamiOperations,
} satisfies Record<keyof typeof SDK_SERVICE_OPERATIONS, object>;

type DescriptorTable = Readonly<
  Record<string, { readonly call: unknown } & Readonly<Record<string, unknown>>>
>;

const effectSchemaExports = {
  apiKeys: ["CreatePayload", "UpdatePayload"],
  brands: ["CreatePayload", "UpdatePayload"],
  email: ["TrackingRecipientEmail"],
  events: ["CreateEventPayload"],
  feedback: ["SendPayload"],
  mailboxes: ["MailboxEventStreamError", "events"],
  templates: ["CreatePayload", "UpdatePayload"],
  webhooks: ["CreatePayload", "TestPayload", "UpdatePayload"],
} as const satisfies Partial<Record<keyof typeof SDK_SERVICE_OPERATIONS, ReadonlyArray<string>>>;

describe("SDK surface inventory", () => {
  it("matches generated operation metadata to every runtime endpoint", () => {
    type SchemaNode = {
      readonly propertySignatures?: ReadonlyArray<{ readonly name: PropertyKey }>;
      readonly to?: SchemaNode;
      readonly from?: SchemaNode;
    };
    const expected = Object.fromEntries(
      Object.entries(SamvaApi.groups).flatMap(([groupName, group]) =>
        Object.entries(group.endpoints).map(([name, endpoint]) => {
          const paginated = [...endpoint.success].some((schema) => {
            const ast: SchemaNode = schema.ast;
            return [ast, ast.to, ast.from].some((node) =>
              ["items", "nextCursor"].every((field) =>
                node?.propertySignatures?.some((property) => property.name === field),
              ),
            );
          });
          const headers: SchemaNode | undefined = endpoint.headers?.ast;
          const idempotent =
            headers?.propertySignatures?.some((property) => property.name === "idempotency-key") ??
            false;
          return [name, { group: groupName, method: endpoint.method, paginated, idempotent }];
        }),
      ),
    );
    expect(Object.keys(SamvaOperations).sort()).toEqual(Object.keys(expected).sort());
    expect(SamvaOperations).toMatchObject(expected);
    expect(SamvaOperations.contactsStartImport.idempotentWhen).toEqual({
      field: "mode",
      equals: "new",
    });
  });

  it("maps every Effect module and Promise service to the public operation registry", () => {
    // Generated HttpApi endpoints are the source of truth for operation
    // coverage; the generated service map supplies facade names and call shapes.
    expect(Object.keys(SDK_OPERATION_CALLS).sort()).toEqual(generatedOperationNames());

    const serviceNames = Object.keys(SDK_SERVICE_OPERATIONS) as ReadonlyArray<
      keyof typeof SDK_SERVICE_OPERATIONS
    >;
    const promiseClient = createPromiseClient({ apiKey: "samva_sk_test" });
    const promiseServices = {
      ...promiseClient,
      newsletterIssues: promiseClient.newsletters.issues,
      newsletterDomains: promiseClient.newsletters.domains,
    };
    const rawServices = {
      ...promiseClient.raw,
      newsletterIssues: promiseClient.raw.newsletters.issues,
      newsletterDomains: promiseClient.raw.newsletters.domains,
    };
    for (const serviceName of serviceNames) {
      const expectedMethods = sortedKeys(SDK_SERVICE_OPERATIONS[serviceName]);
      const schemaExports =
        effectSchemaExports[serviceName as keyof typeof effectSchemaExports] ?? [];
      expect(sortedKeys(effectModules[serviceName]), `${serviceName} Effect module`).toEqual(
        [...expectedMethods, ...schemaExports].sort(),
      );
      // The event stream is a WebSocket, not an operation: the Promise service adds it.
      expect(
        sortedKeys(promiseServices[serviceName]).filter(
          (name) => serviceName !== "newsletters" || !["issues", "domains"].includes(name),
        ),
        `${serviceName} Promise service`,
      ).toEqual(
        serviceName === "mailboxes" ? [...expectedMethods, "events"].sort() : expectedMethods,
      );
      const expectedRawMethods =
        serviceName === "email"
          ? expectedMethods.filter((method) => method !== "send")
          : expectedMethods;
      expect(
        sortedKeys(rawServices[serviceName]).filter(
          (name) => serviceName !== "newsletters" || !["issues", "domains"].includes(name),
        ),
        `${serviceName} raw Promise service`,
      ).toEqual(expectedRawMethods);
    }

    expect(Object.keys(promiseClient).sort()).toEqual(
      [
        ...serviceNames.filter((name) => !["newsletterIssues", "newsletterDomains"].includes(name)),
        "raw",
      ].sort(),
    );
  });

  it("gives every domain its own operation descriptors", () => {
    // A focused entry loads only its domain's table, so the tables must cover exactly the
    // operations their domain binds and agree with the whole-client tables field for field.
    const covered = new Set<string>();
    for (const [service, operations] of Object.entries(SDK_SERVICE_OPERATIONS)) {
      const table = descriptorTables[service as keyof typeof descriptorTables] as DescriptorTable;
      const ids = [...new Set(Object.values(operations))].sort();
      expect(Object.keys(table).sort(), `${service} descriptor coverage`).toEqual(ids);
      for (const id of ids) {
        covered.add(id);
        const { call, ...metadata } = table[id]!;
        expect(metadata, `${id} metadata`).toEqual(SamvaOperations[id]);
        expect(call, `${id} call shape`).toEqual(SDK_OPERATION_CALLS[id]);
      }
    }
    expect([...covered].sort()).toEqual(Object.keys(SamvaOperations).sort());
  });

  it("adapts every operation's path and query fields from its generated endpoint", () => {
    // `adapt` forwards a query only for these kinds and path fields only for the
    // path kinds; a mismatch silently drops caller input such as `cursor`.
    const queryKinds = new Set(["params", "pathParams"]);
    const pathKinds = new Set([
      "path",
      "pathParams",
      "pathPayload",
      "idempotentPath",
      "optionalIdempotentPath",
      "optionalIdempotentPathPayload",
    ]);
    const mismatches = Object.values(SamvaApi.groups).flatMap((group) =>
      Object.entries(group.endpoints).flatMap(([name, endpoint]) => {
        const { kind } = SDK_OPERATION_CALLS[name as keyof typeof SDK_OPERATION_CALLS];
        const query = endpoint.query !== undefined;
        const path = endpoint.params !== undefined || name === "newslettersCreate";
        return query === queryKinds.has(kind) && path === pathKinds.has(kind)
          ? []
          : [`${name}: kind ${kind}, query ${query}, path ${path}`];
      }),
    );
    expect(mismatches).toEqual([]);
  });

  it("names every path field the generated endpoint declares", () => {
    // A renamed or dropped path field moves the value into the query or payload, so the request
    // carries the wrong shape instead of failing at the missing-field guard.
    type SchemaNode = {
      readonly propertySignatures?: ReadonlyArray<{ readonly name: PropertyKey }>;
    };
    const mismatches = Object.values(SamvaApi.groups).flatMap((group) =>
      Object.entries(group.endpoints).flatMap(([name, endpoint]) => {
        const declared =
          endpoint.params === undefined
            ? []
            : ((endpoint.params.ast as SchemaNode).propertySignatures ?? []).map((property) =>
                String(property.name),
              );
        // The newsletter create route carries its optional id in the payload, so it declares no
        // path parameter and its call shape names none.
        const expected = declared;
        const call = SDK_OPERATION_CALLS[name as keyof typeof SDK_OPERATION_CALLS] as {
          readonly paths?: ReadonlyArray<string> | undefined;
        };
        const actual = [...(call.paths ?? [])];
        return actual.join() === expected.join()
          ? []
          : [`${name}: paths [${actual.join(", ")}], endpoint [${expected.join(", ")}]`];
      }),
    );
    expect(mismatches).toEqual([]);
  });
});
