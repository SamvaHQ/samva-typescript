// Hand-written schema exports and ergonomic adapters for generated domain facades.
const facadePreambles: Readonly<Record<string, string>> = {
  webhooks:
    'export {\n  CreateWebhookPayload as CreatePayload,\n  TestWebhookPayload as TestPayload,\n  UpdateWebhookPayload as UpdatePayload,\n} from "./generated/shared";',
  messages:
    'import { type MessageSendInput, sendMessage, type SendOptions } from "./internal/send";\n\nexport type { MessageSendInput, SendOptions };',
  brands:
    'export { CreateBrand as CreatePayload, UpdateBrand as UpdatePayload } from "./generated/shared";',
  "api-keys":
    'export {\n  ApiKeysCreateRequestJson as CreatePayload,\n  ApiKeysUpdateRequestJson as UpdatePayload,\n} from "./generated/api-keys";',
  email:
    'import { addEmailSender, type EmailAddSenderInput } from "./internal/email-sender";\nimport { type EmailSendInput, sendEmail, type SendOptions } from "./internal/send";\n\nexport { TrackingRecipientEmail } from "./generated/email";\n\nexport type { EmailAddSenderInput, EmailSendInput, SendOptions };',
  templates:
    'export {\n  CreateTemplatePayload as CreatePayload,\n  UpdateTemplatePayload as UpdatePayload,\n} from "./generated/shared";',
  mailboxes:
    'export { events } from "./internal/mailbox-events";\nexport {\n  type MailboxEvent,\n  MailboxEventStreamError,\n  type MailboxEventStreamErrorFields,\n  type MailboxEventStreamErrorReason,\n  type MailboxEventStreamErrorTag,\n  type MailboxEventStreamFailure,\n  type MailboxEventStreamOptions,\n  type MailboxEventStreamReconnect,\n  type MailboxEventType,\n} from "../mailbox-events";',
  logs: 'export { events, streamCursor, type LogEvent, type LogEventStreamOptions } from "./internal/log-events";',
  feedback: 'export { SendFeedback as SendPayload } from "./generated/shared";',
  events: 'export { CreateEventPayload } from "./generated/shared";',
  contacts: 'import { ContactEventsGroup } from "./generated/contact-events";',
};

const facadeExpressions: Readonly<Record<string, string>> = {
  emailSend: "sendEmail",
  messagesSend: "sendMessage",
  emailAddSender: "addEmailSender",
  contactEventsListEvents:
    '/* @__PURE__ */ forGroup(ContactEventsGroup, contactsOperations)("contactEventsListEvents")',
};

const callKindOverrides: Readonly<Record<string, string>> = {
  newslettersCreate: "optionalIdempotentPathPayload",
  newslettersUpdate: "optionalIdempotentPathPayload",
  newslettersRemove: "optionalIdempotentPath",
  newsletterIssuesCreate: "optionalIdempotentPathPayload",
  newsletterIssuesUpdate: "optionalIdempotentPathPayload",
  newsletterIssuesRemove: "optionalIdempotentPathPayload",
  newsletterIssuesSave: "optionalIdempotentPathPayload",
  newsletterIssuesCheck: "optionalIdempotentPathPayload",
  newsletterIssuesRender: "optionalIdempotentPathPayload",
  newsletterDomainsAdd: "optionalIdempotentPathPayload",
  newsletterDomainsRemove: "optionalIdempotentPath",
};

const reservedOperationNames: Readonly<Record<string, string>> = {
  contactsExport: "exportContacts",
  organizationsDelete: "deleteOrganization",
  templatesDelete: "deleteTemplate",
};

const facadeGroupNames: Readonly<Record<string, string>> = {
  integrationCatalog: "IntegrationsCatalog",
  apiKeys: "APIKeys",
  whatsapp: "WhatsApp",
  whatsappFlows: "WhatsAppFlows",
  whatsappSetupLinks: "WhatsAppSetupLinks",
};

const facadeServiceOverrides: Readonly<Record<string, string>> = {
  contactEvents: "contacts",
};

const facadeAliases: Readonly<Record<string, Readonly<Record<string, string>>>> = {
  email: { send: "messagesSend" },
};

const facadeModuleNames: Readonly<Record<string, string>> = {
  whatsapp: "whatsapp",
  whatsappFlows: "whatsapp-flows",
  whatsappSetupLinks: "whatsapp-setup-links",
};

const facadePromisePaths: Readonly<Record<string, string>> = {
  newsletterIssues: "newsletters.issues",
  newsletterDomains: "newsletters.domains",
};

export const registryOverrides = {
  facadePreambles,
  facadeExpressions,
  callKindOverrides,
  reservedOperationNames,
  facadeGroupNames,
  facadeServiceOverrides,
  facadeAliases,
  facadeModuleNames,
  facadePromisePaths,
};
