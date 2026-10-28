// Auto-generated from OpenAPI; do not edit.

import { HttpApi, OpenApi } from "effect/http-api";

import { AgentsGroup } from "./agents";
import { AnalyticsGroup } from "./analytics";
import { APIKeysGroup } from "./api-keys";
import { AttachmentsGroup } from "./attachments";
import { BrandsGroup } from "./brands";
import { CampaignsGroup } from "./campaigns";
import { ContactEventsGroup } from "./contact-events";
import { ContactGroupsGroup } from "./contact-groups";
import { ContactsGroup } from "./contacts";
import { ConversationsGroup } from "./conversations";
import { CustomFieldsGroup } from "./custom-fields";
import { EmailGroup } from "./email";
import { EventsGroup } from "./events";
import { ExtensionInstallationsGroup } from "./extension-installations";
import { ExtensionsGroup } from "./extensions";
import { FeedbackGroup } from "./feedback";
import { JourneysGroup } from "./journeys";
import { MailboxesGroup } from "./mailboxes";
import { MediaGroup } from "./media";
import { MessagesGroup } from "./messages";
import { NamespacesGroup } from "./namespaces";
import { NewsletterDomainsGroup } from "./newsletter-domains";
import { NewsletterIssuesGroup } from "./newsletter-issues";
import { NewslettersGroup } from "./newsletters";
import { OperationsGroup } from "./operations";
import { OrganizationsGroup } from "./organizations";
import { ScheduledMessagesGroup } from "./scheduled-messages";
import { SubscriptionsGroup } from "./subscriptions";
import { TemplatesGroup } from "./templates";
import { TopicFormsGroup } from "./topic-forms";
import { TopicsGroup } from "./topics";
import { WebhooksGroup } from "./webhooks";
import { WhoamiGroup } from "./whoami";

export * from "./shared";

export * from "./agents";

export * from "./analytics";

export * from "./api-keys";

export * from "./attachments";

export * from "./brands";

export * from "./campaigns";

export * from "./contact-groups";

export * from "./contacts";

export * from "./contact-events";

export * from "./conversations";

export * from "./custom-fields";

export * from "./email";

export * from "./events";

export * from "./extension-installations";

export * from "./extensions";

export * from "./feedback";

export * from "./journeys";

export * from "./mailboxes";

export * from "./media";

export * from "./messages";

export * from "./scheduled-messages";

export * from "./namespaces";

export * from "./newsletters";

export * from "./newsletter-domains";

export * from "./newsletter-issues";

export * from "./operations";

export * from "./organizations";

export * from "./subscriptions";

export * from "./templates";

export * from "./topics";

export * from "./topic-forms";

export * from "./webhooks";

export * from "./whoami";

export class SamvaApi extends HttpApi.make("SamvaApi")
  .annotate(OpenApi.Title, "Samva API")
  .annotate(OpenApi.Version, "1.0.0")
  .annotate(
    OpenApi.Description,
    "Samva is the email API for your app. Send transactional email in one typed call. Delivery events and customer replies come back as signed webhooks, and replies thread to the email they answer.",
  )
  .annotate(OpenApi.Servers, [{ url: "https://api.samva.dev" }])
  .add(
    AgentsGroup,
    AnalyticsGroup,
    APIKeysGroup,
    AttachmentsGroup,
    BrandsGroup,
    CampaignsGroup,
    ContactGroupsGroup,
    ContactsGroup,
    ContactEventsGroup,
    ConversationsGroup,
    CustomFieldsGroup,
    EmailGroup,
    EventsGroup,
    ExtensionInstallationsGroup,
    ExtensionsGroup,
    FeedbackGroup,
    JourneysGroup,
    MailboxesGroup,
    MediaGroup,
    MessagesGroup,
    ScheduledMessagesGroup,
    NamespacesGroup,
    NewslettersGroup,
    NewsletterDomainsGroup,
    NewsletterIssuesGroup,
    OperationsGroup,
    OrganizationsGroup,
    SubscriptionsGroup,
    TemplatesGroup,
    TopicsGroup,
    TopicFormsGroup,
    WebhooksGroup,
    WhoamiGroup,
  ) {}
