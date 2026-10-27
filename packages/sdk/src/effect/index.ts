/**
 * Effect-native Samva SDK.
 *
 * Domain operations are exported as Pascal-cased modules. Provide a
 * `Client.layer` once, then compose operations directly with Effect.
 *
 * @example
 * ```ts
 * import { Effect } from "effect";
 * import { Client, Email } from "samva/effect";
 *
 * const program = Email.send({
 *   to: "ada@example.com",
 *   subject: "Hello",
 *   text: "Hi",
 * }).pipe(Effect.provide(Client.layerFetch({ apiKey: "<samva-api-key>" })));
 * ```
 */

export * as Agents from "./agents";
export * as Analytics from "./analytics";
export * as ApiKeys from "./api-keys";
export * as Attachments from "./attachments";
export * as Brands from "./brands";
export * as Campaigns from "./campaigns";
export * as Client from "./client";
export * as ContactGroups from "./contact-groups";
export * as Contacts from "./contacts";
export * as Conversations from "./conversations";
export * as CustomFields from "./custom-fields";
export * as Email from "./email";
export * as ExtensionInstallations from "./extension-installations";
export * as Extensions from "./extensions";
export * as Events from "./events";
export * as Feedback from "./feedback";
export * as Journeys from "./journeys";
export * as Mailboxes from "./mailboxes";
export * as Media from "./media";
export * as Messages from "./messages";
export * as Namespaces from "./namespaces";
export * as Operations from "./operations";
export * as Organizations from "./organizations";
export * as TopicPublicationDomains from "./publication-domains";
export * as Retry from "./retry";
export * as ScheduledMessages from "./scheduled-messages";
export * as Subscriptions from "./subscriptions";
export * as Templates from "./templates";
export * as Topics from "./topics";
export * as TopicForms from "./topic-forms";
export * as TopicIssues from "./topic-issues";
export * as Webhooks from "./webhooks";
export * as Whoami from "./whoami";

export * from "./errors";

export {
  type ErrorCategory,
  categoriesOf,
  hasCategory,
  isAuthError,
  isValidationError,
  isNotFoundError,
  isConflictError,
  isThrottlingError,
  isBillingError,
  isTransient,
  isRetryable,
  catchCategory,
  catchAuthError,
  catchValidationError,
  catchNotFoundError,
  catchConflictError,
  catchThrottlingError,
  catchBillingError,
  catchTransient,
} from "./categories";

export type { CursorPageEnvelope } from "./pagination";
export type { Json as JsonValue } from "effect/Schema";
