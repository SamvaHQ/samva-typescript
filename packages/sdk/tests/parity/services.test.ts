import { describe, expect, it } from "@effect/vitest";

import {
  Agents,
  Analytics,
  ApiKeys,
  Attachments,
  Brands,
  Campaigns,
  ContactGroups,
  Contacts,
  Conversations,
  CustomFields,
  Email,
  ExtensionInstallations,
  Extensions,
  Events,
  Feedback,
  Journeys,
  Mailboxes,
  Media,
  Messages,
  Namespaces,
  Operations,
  Organizations,
  ScheduledMessages,
  Subscriptions,
  Templates,
  Topics,
  TopicForms,
  Webhooks,
  Whoami,
} from "../../src/effect";
import { SamvaOperations } from "../../src/effect/generated-metadata";
import { SamvaApi } from "../../src/effect/generated/index";
import { createClient as createPromiseClient } from "../../src/promises";
import { SDK_OPERATION_CALLS, SDK_SERVICE_OPERATIONS } from "../../src/service-map";

const sortedKeys = <Value extends object>(value: Value): ReadonlyArray<string> =>
  Object.keys(value).sort();

const generatedOperationNames = (): ReadonlyArray<string> => {
  return Object.values(SamvaApi.groups)
    .flatMap((group) => Object.keys(group.endpoints))
    .sort();
};

const effectModules = {
  agents: Agents,
  analytics: Analytics,
  apiKeys: ApiKeys,
  attachments: Attachments,
  brands: Brands,
  campaigns: Campaigns,
  contactGroups: ContactGroups,
  contacts: Contacts,
  conversations: Conversations,
  customFields: CustomFields,
  email: Email,
  extensions: Extensions,
  extensionInstallations: ExtensionInstallations,
  events: Events,
  feedback: Feedback,
  journeys: Journeys,
  mailboxes: Mailboxes,
  media: Media,
  messages: Messages,
  namespaces: Namespaces,
  operations: Operations,
  organizations: Organizations,
  scheduledMessages: ScheduledMessages,
  subscriptions: Subscriptions,
  templates: Templates,
  topics: Topics,
  topicForms: TopicForms,
  webhooks: Webhooks,
  whoami: Whoami,
} satisfies Record<keyof typeof SDK_SERVICE_OPERATIONS, object>;

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
          return [name, { group: groupName, method: endpoint.method, paginated }];
        }),
      ),
    );
    expect(SamvaOperations).toEqual(expected);
  });

  it("maps every Effect module and Promise service to the public operation registry", () => {
    // Generated HttpApi endpoints are the source of truth for operation
    // coverage; the service map only supplies hand-written adaptation details.
    expect(Object.keys(SDK_OPERATION_CALLS).sort()).toEqual(generatedOperationNames());

    const serviceNames = Object.keys(SDK_SERVICE_OPERATIONS) as ReadonlyArray<
      keyof typeof SDK_SERVICE_OPERATIONS
    >;
    const promiseClient = createPromiseClient({ apiKey: "samva_sk_test" });
    for (const serviceName of serviceNames) {
      const expectedMethods = sortedKeys(SDK_SERVICE_OPERATIONS[serviceName]);
      const schemaExports =
        effectSchemaExports[serviceName as keyof typeof effectSchemaExports] ?? [];
      expect(sortedKeys(effectModules[serviceName]), `${serviceName} Effect module`).toEqual(
        [...expectedMethods, ...schemaExports].sort(),
      );
      // The event stream is a WebSocket, not an operation: the Promise service adds it.
      expect(sortedKeys(promiseClient[serviceName]), `${serviceName} Promise service`).toEqual(
        serviceName === "mailboxes" ? [...expectedMethods, "events"].sort() : expectedMethods,
      );
      const expectedRawMethods =
        serviceName === "email"
          ? expectedMethods.filter((method) => method !== "send")
          : expectedMethods;
      expect(
        sortedKeys(promiseClient.raw[serviceName]),
        `${serviceName} raw Promise service`,
      ).toEqual(expectedRawMethods);
    }

    expect(Object.keys(promiseClient).sort()).toEqual([...serviceNames, "raw"].sort());
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
        const path = endpoint.params !== undefined;
        return query === queryKinds.has(kind) && path === pathKinds.has(kind)
          ? []
          : [`${name}: kind ${kind}, query ${query}, path ${path}`];
      }),
    );
    expect(mismatches).toEqual([]);
  });
});
