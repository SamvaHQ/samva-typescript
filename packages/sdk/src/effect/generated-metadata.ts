export const SamvaErrorMetadata = {
  AnalyticsQueryError: {
    categories: [],
    retryable: false,
  },
  BillingProviderError: {
    categories: ["transient"],
    retryable: true,
  },
  BrandAddressRequiredError: {
    categories: [],
    retryable: false,
  },
  CampaignFooterRequiredError: {
    categories: [],
    retryable: false,
  },
  ConflictError: {
    categories: ["conflict"],
    retryable: false,
  },
  DeliveryUnavailableError: {
    categories: ["transient"],
    retryable: true,
  },
  EmailChannelError: {
    categories: [],
    retryable: false,
  },
  ExternalServiceError: {
    categories: ["transient"],
    retryable: true,
  },
  FlagDisabledError: {
    categories: [],
    retryable: false,
  },
  ForbiddenError: {
    categories: ["auth"],
    retryable: false,
  },
  FromAddressRequiredError: {
    categories: ["validation"],
    retryable: false,
  },
  GatewayTimeoutError: {
    categories: ["transient"],
    retryable: true,
  },
  InternalError: {
    categories: ["transient"],
    retryable: true,
  },
  MailboxSendConflictError: {
    categories: [],
    retryable: false,
  },
  MailboxSendRefusedError: {
    categories: [],
    retryable: false,
  },
  MalformedRequestError: {
    categories: ["validation"],
    retryable: false,
  },
  OnboardingReviewRequiredError: {
    categories: ["validation"],
    retryable: false,
  },
  PaymentRequiredError: {
    categories: ["billing"],
    retryable: false,
  },
  RateLimitedError: {
    categories: ["throttling", "transient"],
    retryable: true,
  },
  ResourceNotFoundError: {
    categories: ["notFound"],
    retryable: false,
  },
  SenderNotReadyError: {
    categories: ["transient"],
    retryable: true,
  },
  ServiceUnavailableError: {
    categories: ["transient"],
    retryable: true,
  },
  TemplateInUseError: {
    categories: ["conflict"],
    retryable: false,
  },
  TemplateSourceError: {
    categories: ["validation"],
    retryable: false,
  },
  UnauthorizedError: {
    categories: ["auth"],
    retryable: false,
  },
  ValidationError: {
    categories: ["validation"],
    retryable: false,
  },
  WhatsAppServiceWindowClosedError: {
    categories: [],
    retryable: false,
  },
} as const;

const operationMetadata0 = {
  group: "Agents",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata1 = {
  group: "Agents",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata2 = {
  group: "Agents",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata3 = {
  group: "Agents",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata4 = {
  group: "Agents",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata5 = {
  group: "Agents",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata6 = {
  group: "Analytics",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata7 = {
  group: "Analytics",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata8 = {
  group: "API Keys",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata9 = {
  group: "API Keys",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata10 = {
  group: "API Keys",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata11 = {
  group: "API Keys",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata12 = {
  group: "Attachments",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata13 = {
  group: "Attachments",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata14 = {
  group: "Brands",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata15 = {
  group: "Brands",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata16 = {
  group: "Brands",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata17 = {
  group: "Brands",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata18 = {
  group: "Campaigns",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata19 = {
  group: "Campaigns",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata20 = {
  group: "Campaigns",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata21 = {
  group: "Campaigns",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata22 = {
  group: "Campaigns",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata23 = {
  group: "Contact Groups",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata24 = {
  group: "Contact Groups",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata25 = {
  group: "Contact Groups",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata26 = {
  group: "Contact Groups",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata27 = {
  group: "Contact Groups",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata28 = {
  group: "Contacts",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata29 = {
  group: "Contacts",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata30 = {
  group: "Contacts",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata31 = {
  group: "Contacts",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata32 = {
  group: "Contacts",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata33 = {
  group: "Contact events",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata34 = {
  group: "Contacts",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata35 = {
  group: "Contacts",
  method: "POST",
  idempotent: true,
  idempotentWhen: { field: "mode", equals: "new" },
  paginated: false,
} as const;

const operationMetadata36 = {
  group: "Conversations",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata37 = {
  group: "Conversations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata38 = {
  group: "Conversations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata39 = {
  group: "Conversations",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata40 = {
  group: "Conversations",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata41 = {
  group: "Custom Fields",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata42 = {
  group: "Custom Fields",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata43 = {
  group: "Custom Fields",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata44 = {
  group: "Custom Fields",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata45 = {
  group: "Email",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata46 = {
  group: "Email",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata47 = {
  group: "Email",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata48 = {
  group: "Email",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata49 = {
  group: "Email",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata50 = {
  group: "Email",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata51 = {
  group: "Events",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata52 = {
  group: "Extension installations",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata53 = {
  group: "Extension installations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata54 = {
  group: "Extension installations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata55 = {
  group: "Extension installations",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata56 = {
  group: "Extensions",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata57 = {
  group: "Extensions",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata58 = {
  group: "Extensions",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata59 = {
  group: "Feedback",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata60 = {
  group: "Journeys",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata61 = {
  group: "Journeys",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata62 = {
  group: "Journeys",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata63 = {
  group: "Journeys",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata64 = {
  group: "Journeys",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata65 = {
  group: "Journeys",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata66 = {
  group: "Mailboxes",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata67 = {
  group: "Mailboxes",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata68 = {
  group: "Mailboxes",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata69 = {
  group: "Mailboxes",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata70 = {
  group: "Mailboxes",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata71 = {
  group: "Mailboxes",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata72 = {
  group: "Media",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata73 = {
  group: "Media",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata74 = {
  group: "Media",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata75 = {
  group: "Messages",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata76 = {
  group: "Messages",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata77 = {
  group: "Messages",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata78 = {
  group: "Messages",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata79 = {
  group: "Scheduled Messages",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata80 = {
  group: "Scheduled Messages",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata81 = {
  group: "Scheduled Messages",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata82 = {
  group: "Scheduled Messages",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata83 = {
  group: "Messages",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata84 = {
  group: "Namespaces",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata85 = {
  group: "Namespaces",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata86 = {
  group: "Namespaces",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata87 = {
  group: "Namespaces",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata88 = {
  group: "Namespaces",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata89 = {
  group: "Newsletters",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata90 = {
  group: "Newsletters",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata91 = {
  group: "Newsletters",
  method: "DELETE",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata92 = {
  group: "Newsletters",
  method: "PATCH",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata93 = {
  group: "Newsletter domains",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata94 = {
  group: "Newsletter domains",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata95 = {
  group: "Newsletter domains",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata96 = {
  group: "Newsletter domains",
  method: "DELETE",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata97 = {
  group: "Newsletter issues",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata98 = {
  group: "Newsletter issues",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata99 = {
  group: "Newsletter issues",
  method: "PATCH",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata100 = {
  group: "Operations",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata101 = {
  group: "Operations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata102 = {
  group: "Operations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata103 = {
  group: "Organizations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata104 = {
  group: "Organizations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata105 = {
  group: "Organizations",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata106 = {
  group: "Organizations",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata107 = {
  group: "Policies",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata108 = {
  group: "Policies",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata109 = {
  group: "Policies",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata110 = {
  group: "Subscriptions",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata111 = {
  group: "Templates",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata112 = {
  group: "Templates",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata113 = {
  group: "Templates",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata114 = {
  group: "Templates",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata115 = {
  group: "Templates",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata116 = {
  group: "Templates",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata117 = {
  group: "Templates",
  method: "PATCH",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata118 = {
  group: "Templates",
  method: "PUT",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata119 = {
  group: "Topics",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata120 = {
  group: "Topics",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata121 = {
  group: "Topics",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata122 = {
  group: "Topics",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata123 = {
  group: "Topic forms",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata124 = {
  group: "Topic forms",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata125 = {
  group: "Topic forms",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata126 = {
  group: "Topic forms",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata127 = {
  group: "Topics",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata128 = {
  group: "Webhooks",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata129 = {
  group: "Webhooks",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata130 = {
  group: "Webhooks",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata131 = {
  group: "Webhooks",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata132 = {
  group: "Webhooks",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata133 = {
  group: "Whoami",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

export const SamvaOperations = {
  agentsList: operationMetadata0,
  agentsCreate: operationMetadata1,
  agentsGet: operationMetadata2,
  agentsRemove: operationMetadata3,
  agentsUpdate: operationMetadata4,
  agentsContinueOnStandard: operationMetadata1,
  agentsReplaceDraft: operationMetadata5,
  agentsPublish: operationMetadata1,
  agentsRerunTests: operationMetadata1,
  agentsListVersions: operationMetadata0,
  agentsGetVersion: operationMetadata2,
  agentsListModels: operationMetadata2,
  analyticsGetChannelStats: operationMetadata6,
  analyticsGetDeliveryMetrics: operationMetadata6,
  analyticsExportData: operationMetadata7,
  analyticsGetHourlyDistribution: operationMetadata6,
  analyticsGetStats: operationMetadata6,
  analyticsGetTopContacts: operationMetadata6,
  apiKeysList: operationMetadata8,
  apiKeysCreate: operationMetadata9,
  apiKeysGet: operationMetadata10,
  apiKeysUpdate: operationMetadata11,
  apiKeysGetActivity: operationMetadata8,
  apiKeysRevoke: operationMetadata9,
  apiKeysRotate: operationMetadata9,
  apiKeysGetStats: operationMetadata10,
  attachmentsList: operationMetadata12,
  attachmentsGetById: operationMetadata12,
  attachmentsRemove: operationMetadata13,
  attachmentsDownloadUrl: operationMetadata12,
  brandsList: operationMetadata14,
  brandsCreate: operationMetadata15,
  brandsGet: operationMetadata14,
  brandsRemove: operationMetadata16,
  brandsUpdate: operationMetadata17,
  brandsSetDefault: operationMetadata15,
  campaignsList: operationMetadata18,
  campaignsCreate: operationMetadata19,
  campaignsGet: operationMetadata20,
  campaignsUpdate: operationMetadata21,
  campaignsArchive: operationMetadata19,
  campaignsListRuns: operationMetadata18,
  campaignsScheduleRun: operationMetadata22,
  campaignsGetRun: operationMetadata20,
  campaignsCancelRun: operationMetadata19,
  campaignsPauseRun: operationMetadata19,
  campaignsListRecipients: operationMetadata18,
  campaignsGetRunReport: operationMetadata20,
  campaignsResumeRun: operationMetadata19,
  campaignsPreview: operationMetadata19,
  campaignsSendTest: operationMetadata19,
  contactGroupsList: operationMetadata23,
  contactGroupsCreate: operationMetadata24,
  contactGroupsGetById: operationMetadata25,
  contactGroupsRemove: operationMetadata26,
  contactGroupsUpdate: operationMetadata27,
  contactGroupsEvaluateDynamic: operationMetadata24,
  contactGroupsGetMembers: operationMetadata23,
  contactGroupsAddMembers: operationMetadata24,
  contactGroupsRemoveMembers: operationMetadata26,
  contactGroupsPreview: operationMetadata24,
  contactsList: operationMetadata28,
  contactsCreate: operationMetadata29,
  contactsGet: operationMetadata30,
  contactsRemove: operationMetadata31,
  contactsUpdate: operationMetadata32,
  contactsGetActivityTimeline: operationMetadata28,
  contactsGetEngagement: operationMetadata30,
  contactEventsListEvents: operationMetadata33,
  contactsGetGroupMemberships: operationMetadata28,
  contactsAddIdentity: operationMetadata29,
  contactsRemoveIdentity: operationMetadata31,
  contactsSetConsent: operationMetadata34,
  contactsAddTags: operationMetadata29,
  contactsRemoveTags: operationMetadata31,
  contactsBulkDelete: operationMetadata29,
  contactsBulkUpdateStatus: operationMetadata29,
  contactsBulkUpdateTags: operationMetadata29,
  contactsExport: operationMetadata29,
  contactsFind: operationMetadata29,
  contactsFindOrCreate: operationMetadata29,
  contactsStartImport: operationMetadata35,
  contactsGetImportJob: operationMetadata30,
  contactsPlanImport: operationMetadata29,
  conversationsList: operationMetadata36,
  conversationsCreate: operationMetadata37,
  conversationsGetById: operationMetadata38,
  conversationsUpdate: operationMetadata39,
  conversationsAddCategories: operationMetadata37,
  conversationsRemoveCategories: operationMetadata40,
  conversationsAddChannels: operationMetadata37,
  conversationsRemoveChannels: operationMetadata40,
  conversationsAddContacts: operationMetadata37,
  conversationsRemoveContacts: operationMetadata40,
  conversationsListMessages: operationMetadata36,
  conversationsAddTags: operationMetadata37,
  conversationsRemoveTags: operationMetadata40,
  customFieldsList: operationMetadata41,
  customFieldsCreate: operationMetadata42,
  customFieldsRemove: operationMetadata43,
  customFieldsUpdate: operationMetadata44,
  emailListBlocks: operationMetadata45,
  emailAddBlock: operationMetadata46,
  emailRemoveBlock: operationMetadata47,
  emailUpdateBlock: operationMetadata48,
  emailCheckBlocked: operationMetadata46,
  emailGetBlockLogs: operationMetadata45,
  emailGetCatchAllConfig: operationMetadata49,
  emailUpdateCatchAllConfig: operationMetadata48,
  emailGetCatchAllStats: operationMetadata49,
  emailListDomains: operationMetadata45,
  emailAddDomain: operationMetadata46,
  emailGetDomainById: operationMetadata49,
  emailRemoveDomain: operationMetadata47,
  emailUpdateDomainConfig: operationMetadata48,
  emailGetCustomTracking: operationMetadata49,
  emailEnableCustomTracking: operationMetadata46,
  emailDisableCustomTracking: operationMetadata47,
  emailGetCustomTrackingDomainConnect: operationMetadata49,
  emailBuildCustomTrackingDomainConnectApplyUrl: operationMetadata46,
  emailCompleteCustomTrackingDomainConnect: operationMetadata46,
  emailRecheckCustomTracking: operationMetadata46,
  emailSetDefaultDomain: operationMetadata46,
  emailDisableCatchAll: operationMetadata46,
  emailGetDomainConnect: operationMetadata49,
  emailBuildDomainConnectApplyUrl: operationMetadata46,
  emailCompleteDomainConnect: operationMetadata46,
  emailEnableCatchAll: operationMetadata46,
  emailEnableReceiving: operationMetadata46,
  emailGetReceivingStatus: operationMetadata49,
  emailDetectRegistrar: operationMetadata46,
  emailRotateDomainDkim: operationMetadata50,
  emailGetDomainVerification: operationMetadata49,
  emailAdvanceDomainVerification: operationMetadata46,
  emailGetDomainWarming: operationMetadata49,
  emailCreateDomainWarmingPlan: operationMetadata46,
  emailCancelDomainWarmingBatch: operationMetadata47,
  emailCompleteDomainWarming: operationMetadata46,
  emailPauseDomainWarming: operationMetadata46,
  emailUpdateDomainWarmingPolicy: operationMetadata48,
  emailResumeDomainWarming: operationMetadata46,
  emailListForwardingRules: operationMetadata49,
  emailCreateForwardingRule: operationMetadata46,
  emailDeleteForwardingRule: operationMetadata47,
  emailUpdateForwardingRule: operationMetadata48,
  emailGetForwardingLog: operationMetadata45,
  emailGetOnboardingReview: operationMetadata49,
  emailReapplyOnboardingReview: operationMetadata46,
  emailRespondToOnboardingInformationRequest: operationMetadata46,
  emailListSenders: operationMetadata45,
  emailAddSender: operationMetadata50,
  emailGetSender: operationMetadata49,
  emailRemoveSender: operationMetadata47,
  emailSetDefaultSender: operationMetadata46,
  emailCheckSenderVerification: operationMetadata49,
  emailGetStats: operationMetadata49,
  emailListSuppressions: operationMetadata45,
  emailRemoveSuppression: operationMetadata47,
  emailCountSuppressions: operationMetadata49,
  emailGetTrackingDefaults: operationMetadata49,
  emailUpdateTrackingDefaults: operationMetadata48,
  emailGetRecipientTrackingPreference: operationMetadata49,
  emailUpdateRecipientTrackingPreference: operationMetadata48,
  eventsCreate: operationMetadata51,
  eventsBatch: operationMetadata51,
  extensionInstallationsList: operationMetadata52,
  extensionInstallationsInstall: operationMetadata53,
  extensionInstallationsGet: operationMetadata54,
  extensionInstallationsUninstall: operationMetadata55,
  extensionInstallationsDisable: operationMetadata53,
  extensionInstallationsEnable: operationMetadata53,
  extensionInstallationsListRuns: operationMetadata54,
  extensionInstallationsGetRun: operationMetadata54,
  extensionInstallationsUpgrade: operationMetadata53,
  extensionsList: operationMetadata56,
  extensionsPublish: operationMetadata57,
  extensionsGet: operationMetadata58,
  extensionsListVersions: operationMetadata56,
  extensionsGetVersion: operationMetadata58,
  feedbackSend: operationMetadata59,
  journeysList: operationMetadata60,
  journeysCreate: operationMetadata61,
  journeysGet: operationMetadata62,
  journeysRemove: operationMetadata63,
  journeysUpdate: operationMetadata64,
  journeysArchive: operationMetadata61,
  journeysReplaceDraft: operationMetadata65,
  journeysPause: operationMetadata61,
  journeysPublish: operationMetadata61,
  journeysResume: operationMetadata61,
  journeysListRuns: operationMetadata60,
  journeysGetRun: operationMetadata62,
  journeysStats: operationMetadata62,
  journeysGetVersion: operationMetadata62,
  mailboxesList: operationMetadata66,
  mailboxesCreate: operationMetadata67,
  mailboxesGet: operationMetadata68,
  mailboxesRemove: operationMetadata69,
  mailboxesUpdate: operationMetadata70,
  mailboxesListActions: operationMetadata66,
  mailboxesGetAction: operationMetadata68,
  mailboxesApproveAction: operationMetadata71,
  mailboxesCancelAction: operationMetadata71,
  mailboxesDenyAction: operationMetadata71,
  mailboxesRetryAction: operationMetadata71,
  mailboxesGetAgentActivity: operationMetadata68,
  mailboxesListDrafts: operationMetadata66,
  mailboxesCreateDraft: operationMetadata71,
  mailboxesGetDraft: operationMetadata68,
  mailboxesDeleteDraft: operationMetadata69,
  mailboxesUpdateDraft: operationMetadata70,
  mailboxesSendDraft: operationMetadata67,
  mailboxesCreateEndpoint: operationMetadata71,
  mailboxesRemoveEndpoint: operationMetadata69,
  mailboxesUpdateEndpoint: operationMetadata70,
  mailboxesListEvents: operationMetadata66,
  mailboxesListFolders: operationMetadata68,
  mailboxesListGrants: operationMetadata66,
  mailboxesCreateGrant: operationMetadata71,
  mailboxesRevokeGrant: operationMetadata69,
  mailboxesUpdateGrant: operationMetadata70,
  mailboxesListLabels: operationMetadata68,
  mailboxesCreateLabel: operationMetadata71,
  mailboxesDeleteLabel: operationMetadata69,
  mailboxesUpdateLabel: operationMetadata70,
  mailboxesSendMessage: operationMetadata67,
  mailboxesGetMessage: operationMetadata68,
  mailboxesGetMessageAttachment: operationMetadata68,
  mailboxesCopyMessageAttachment: operationMetadata71,
  mailboxesDiscardMessage: operationMetadata71,
  mailboxesForward: operationMetadata67,
  mailboxesGetMessageRaw: operationMetadata68,
  mailboxesReleaseMessage: operationMetadata71,
  mailboxesReply: operationMetadata67,
  mailboxesReplyAll: operationMetadata67,
  mailboxesPause: operationMetadata71,
  mailboxesListQuarantine: operationMetadata66,
  mailboxesResume: operationMetadata71,
  mailboxesListThreads: operationMetadata66,
  mailboxesGetThread: operationMetadata68,
  mailboxesUpdateThread: operationMetadata70,
  mailboxesGetThreadContent: operationMetadata66,
  mailboxesAddThreadLabels: operationMetadata71,
  mailboxesRemoveThreadLabels: operationMetadata69,
  mailboxesListThreadMessages: operationMetadata66,
  mailboxesListThreadNotes: operationMetadata66,
  mailboxesCreateNote: operationMetadata71,
  mailboxesDeleteNote: operationMetadata69,
  mailboxesUpdateNote: operationMetadata70,
  mailboxesListOrganizationDrafts: operationMetadata66,
  mailboxesGetNeedsYou: operationMetadata66,
  mailboxesListOrganizationThreads: operationMetadata66,
  mediaCreate: operationMetadata72,
  mediaGetById: operationMetadata73,
  mediaRemove: operationMetadata74,
  mediaComplete: operationMetadata72,
  mediaDownloadUrl: operationMetadata73,
  messagesList: operationMetadata75,
  messagesSend: operationMetadata76,
  messagesGet: operationMetadata77,
  messagesRemove: operationMetadata78,
  messagesGetContent: operationMetadata77,
  messagesListDeliveries: operationMetadata77,
  messagesGetEmail: operationMetadata77,
  messagesGetEvents: operationMetadata75,
  messagesGetStatus: operationMetadata77,
  scheduledMessagesList: operationMetadata79,
  scheduledMessagesCreate: operationMetadata80,
  scheduledMessagesGet: operationMetadata81,
  scheduledMessagesCancel: operationMetadata82,
  scheduledMessagesResume: operationMetadata82,
  messagesValidateEmail: operationMetadata83,
  namespacesList: operationMetadata84,
  namespacesCreate: operationMetadata85,
  namespacesGet: operationMetadata86,
  namespacesRemove: operationMetadata87,
  namespacesUpdate: operationMetadata88,
  namespacesAssignResource: operationMetadata85,
  namespacesRemoveResource: operationMetadata87,
  namespacesGetUsage: operationMetadata86,
  newslettersList: operationMetadata89,
  newslettersCreate: operationMetadata90,
  newslettersGet: operationMetadata89,
  newslettersRemove: operationMetadata91,
  newslettersUpdate: operationMetadata92,
  newsletterDomainsList: operationMetadata93,
  newsletterDomainsAdd: operationMetadata94,
  newsletterDomainsGet: operationMetadata95,
  newsletterDomainsRemove: operationMetadata96,
  newsletterIssuesList: operationMetadata97,
  newsletterIssuesCreate: operationMetadata98,
  newsletterIssuesUpdate: operationMetadata99,
  newsletterIssuesCheck: operationMetadata98,
  newsletterIssuesGet: operationMetadata97,
  newsletterIssuesHead: operationMetadata97,
  newsletterIssuesHistory: operationMetadata97,
  newsletterIssuesRemove: operationMetadata98,
  newsletterIssuesRender: operationMetadata98,
  newsletterIssuesSave: operationMetadata98,
  newsletterIssuesOpen: operationMetadata97,
  operationsList: operationMetadata100,
  operationsGet: operationMetadata101,
  operationsRetry: operationMetadata102,
  organizationsCreate: operationMetadata103,
  organizationsGet: operationMetadata104,
  organizationsUpdate: operationMetadata105,
  organizationsCreateAvatarUpload: operationMetadata103,
  organizationsGetProfile: operationMetadata104,
  organizationsDelete: operationMetadata106,
  organizationsAssignPersonalMailbox: operationMetadata103,
  organizationsGetPersonalMailboxAddressOptions: operationMetadata104,
  organizationsListPersonalMailboxAssignments: operationMetadata104,
  organizationsGetTrustTier: operationMetadata104,
  organizationsGetUsage: operationMetadata104,
  policiesGetPolicy: operationMetadata107,
  policiesSetPolicy: operationMetadata108,
  policiesDeletePolicy: operationMetadata109,
  subscriptionsSubscribe: operationMetadata110,
  templatesList: operationMetadata111,
  templatesCreate: operationMetadata112,
  templatesGetById: operationMetadata113,
  templatesDelete: operationMetadata114,
  templatesUpdate: operationMetadata115,
  templatesListInputContracts: operationMetadata111,
  templatesGetInputContract: operationMetadata113,
  templatesPublish: operationMetadata116,
  templatesGetPublication: operationMetadata113,
  templatesRenderPublication: operationMetadata116,
  templatesGetGitRepository: operationMetadata113,
  templatesIssueGitCredential: operationMetadata116,
  templatesOpenWorkspace: operationMetadata116,
  templatesPatchWorkspace: operationMetadata117,
  templatesPutWorkspaceAsset: operationMetadata118,
  templatesCheckWorkspace: operationMetadata116,
  templatesResolveWorkspaceConflict: operationMetadata112,
  templatesDiffWorkspace: operationMetadata116,
  templatesRenderWorkspaceFixture: operationMetadata116,
  templatesWorkspaceHistory: operationMetadata113,
  templatesAttachWorkspaceResource: operationMetadata112,
  templatesRemoveWorkspaceResource: operationMetadata112,
  templatesRestoreWorkspace: operationMetadata112,
  templatesSaveWorkspace: operationMetadata112,
  templatesListFamilies: operationMetadata111,
  templatesCreateFamily: operationMetadata116,
  templatesGetFamily: operationMetadata113,
  templatesDeleteFamily: operationMetadata114,
  templatesRenameFamily: operationMetadata115,
  templatesAttachFamilyMember: operationMetadata116,
  templatesDetachFamilyMember: operationMetadata114,
  templatesCreateFamilyFromTemplate: operationMetadata116,
  templatesCreateFromWebsite: operationMetadata112,
  templatesDeleteProject: operationMetadata114,
  templatesAddEntry: operationMetadata116,
  topicsList: operationMetadata119,
  topicsCreate: operationMetadata120,
  topicsGet: operationMetadata119,
  topicsRemove: operationMetadata121,
  topicsUpdate: operationMetadata122,
  topicsSetDefault: operationMetadata120,
  topicFormsList: operationMetadata123,
  topicFormsCreate: operationMetadata124,
  topicFormsGet: operationMetadata123,
  topicFormsRemove: operationMetadata125,
  topicFormsUpdate: operationMetadata126,
  topicsListSubscriptions: operationMetadata127,
  topicsSetSubscriptions: operationMetadata120,
  topicsCheckSubscription: operationMetadata119,
  webhooksList: operationMetadata128,
  webhooksCreate: operationMetadata129,
  webhooksGet: operationMetadata130,
  webhooksRemove: operationMetadata131,
  webhooksUpdate: operationMetadata132,
  webhooksRetryDelivery: operationMetadata129,
  webhooksGetLogs: operationMetadata128,
  webhooksRegenerateSecret: operationMetadata129,
  webhooksGetSecret: operationMetadata130,
  webhooksGetStats: operationMetadata130,
  webhooksTest: operationMetadata129,
  whoamiGet: operationMetadata133,
} as const;
