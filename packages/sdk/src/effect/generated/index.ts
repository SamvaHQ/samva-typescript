// Auto-generated from OpenAPI; do not edit.

import { HttpApi, OpenApi } from "effect/http-api";

import { AccountsGroup } from "./accounts";
import { AgentsGroup } from "./agents";
import { AnalyticsGroup } from "./analytics";
import { APIKeysGroup } from "./api-keys";
import { ApprovalRequestsGroup } from "./approval-requests";
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
import { FeedbackGroup } from "./feedback";
import { IntegrationsGroup } from "./integrations";
import { IntegrationsCatalogGroup } from "./integrations-catalog";
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
import { PoliciesGroup } from "./policies";
import { ScheduledMessagesGroup } from "./scheduled-messages";
import { SubscriptionsGroup } from "./subscriptions";
import { TemplateRegistrationsGroup } from "./template-registrations";
import { TemplateShareLinksGroup } from "./template-share-links";
import { TemplatesGroup } from "./templates";
import { TopicFormsGroup } from "./topic-forms";
import { TopicsGroup } from "./topics";
import { WebhooksGroup } from "./webhooks";
import { WhatsAppGroup } from "./whats-app";
import { WhatsAppFlowsGroup } from "./whats-app-flows";
import { WhatsAppSetupLinksGroup } from "./whats-app-setup-links";
import { WhoamiGroup } from "./whoami";

export * from "./shared";

export * from "./accounts";

export * from "./agents";

export * from "./analytics";

export * from "./api-keys";

export * from "./approval-requests";

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

export * from "./feedback";

export * from "./integrations";

export * from "./integrations-catalog";

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

export * from "./policies";

export * from "./subscriptions";

export * from "./template-share-links";

export * from "./templates";

export * from "./template-registrations";

export * from "./topics";

export * from "./topic-forms";

export * from "./webhooks";

export * from "./whats-app";

export * from "./whats-app-flows";

export * from "./whats-app-setup-links";

export * from "./whoami";

export class SamvaApi extends HttpApi.make("SamvaApi")
  .annotate(OpenApi.Title, "Samva API")
  .annotate(OpenApi.Version, "1.0.0")
  .annotate(
    OpenApi.Description,
    "Samva is the email and WhatsApp API for your app and your agents. Send in one typed call. Delivery events and customer replies come back as signed webhooks, and replies thread to the conversation they answer.",
  )
  .annotate(OpenApi.Servers, [{ url: "https://api.samva.dev" }])
  .add(
    AccountsGroup,
    AgentsGroup,
    AnalyticsGroup,
    APIKeysGroup,
    ApprovalRequestsGroup,
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
    FeedbackGroup,
    IntegrationsGroup,
    IntegrationsCatalogGroup,
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
    PoliciesGroup,
    SubscriptionsGroup,
    TemplateShareLinksGroup,
    TemplatesGroup,
    TemplateRegistrationsGroup,
    TopicsGroup,
    TopicFormsGroup,
    WebhooksGroup,
    WhatsAppGroup,
    WhatsAppFlowsGroup,
    WhatsAppSetupLinksGroup,
    WhoamiGroup,
  ) {}
