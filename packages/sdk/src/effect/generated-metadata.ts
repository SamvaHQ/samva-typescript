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
} as const;

const operationMetadata0 = { group: "Agents", method: "GET", paginated: true } as const;

const operationMetadata1 = { group: "Agents", method: "POST", paginated: false } as const;

const operationMetadata2 = { group: "Agents", method: "GET", paginated: false } as const;

const operationMetadata3 = { group: "Agents", method: "DELETE", paginated: false } as const;

const operationMetadata4 = { group: "Agents", method: "PATCH", paginated: false } as const;

const operationMetadata5 = { group: "Agents", method: "PUT", paginated: false } as const;

const operationMetadata6 = { group: "Analytics", method: "GET", paginated: false } as const;

const operationMetadata7 = { group: "Analytics", method: "POST", paginated: false } as const;

const operationMetadata8 = { group: "API Keys", method: "GET", paginated: true } as const;

const operationMetadata9 = { group: "API Keys", method: "POST", paginated: false } as const;

const operationMetadata10 = { group: "API Keys", method: "GET", paginated: false } as const;

const operationMetadata11 = { group: "API Keys", method: "PATCH", paginated: false } as const;

const operationMetadata12 = { group: "Attachments", method: "GET", paginated: false } as const;

const operationMetadata13 = { group: "Attachments", method: "DELETE", paginated: false } as const;

const operationMetadata14 = { group: "Brands", method: "GET", paginated: false } as const;

const operationMetadata15 = { group: "Brands", method: "POST", paginated: false } as const;

const operationMetadata16 = { group: "Brands", method: "DELETE", paginated: false } as const;

const operationMetadata17 = { group: "Brands", method: "PATCH", paginated: false } as const;

const operationMetadata18 = { group: "Campaigns", method: "GET", paginated: true } as const;

const operationMetadata19 = { group: "Campaigns", method: "POST", paginated: false } as const;

const operationMetadata20 = { group: "Campaigns", method: "GET", paginated: false } as const;

const operationMetadata21 = { group: "Campaigns", method: "PATCH", paginated: false } as const;

const operationMetadata22 = { group: "Contact Groups", method: "GET", paginated: true } as const;

const operationMetadata23 = { group: "Contact Groups", method: "POST", paginated: false } as const;

const operationMetadata24 = { group: "Contact Groups", method: "GET", paginated: false } as const;

const operationMetadata25 = {
  group: "Contact Groups",
  method: "DELETE",
  paginated: false,
} as const;

const operationMetadata26 = { group: "Contact Groups", method: "PATCH", paginated: false } as const;

const operationMetadata27 = { group: "Contacts", method: "GET", paginated: true } as const;

const operationMetadata28 = { group: "Contacts", method: "POST", paginated: false } as const;

const operationMetadata29 = { group: "Contacts", method: "GET", paginated: false } as const;

const operationMetadata30 = { group: "Contacts", method: "DELETE", paginated: false } as const;

const operationMetadata31 = { group: "Contacts", method: "PATCH", paginated: false } as const;

const operationMetadata32 = { group: "Contact events", method: "GET", paginated: true } as const;

const operationMetadata33 = { group: "Contacts", method: "PUT", paginated: false } as const;

const operationMetadata34 = { group: "Conversations", method: "GET", paginated: true } as const;

const operationMetadata35 = { group: "Conversations", method: "POST", paginated: false } as const;

const operationMetadata36 = { group: "Conversations", method: "GET", paginated: false } as const;

const operationMetadata37 = { group: "Conversations", method: "PATCH", paginated: false } as const;

const operationMetadata38 = { group: "Conversations", method: "DELETE", paginated: false } as const;

const operationMetadata39 = { group: "Custom Fields", method: "GET", paginated: false } as const;

const operationMetadata40 = { group: "Custom Fields", method: "POST", paginated: false } as const;

const operationMetadata41 = { group: "Custom Fields", method: "DELETE", paginated: false } as const;

const operationMetadata42 = { group: "Custom Fields", method: "PATCH", paginated: false } as const;

const operationMetadata43 = { group: "Email", method: "GET", paginated: true } as const;

const operationMetadata44 = { group: "Email", method: "POST", paginated: false } as const;

const operationMetadata45 = { group: "Email", method: "DELETE", paginated: false } as const;

const operationMetadata46 = { group: "Email", method: "PATCH", paginated: false } as const;

const operationMetadata47 = { group: "Email", method: "GET", paginated: false } as const;

const operationMetadata48 = { group: "Events", method: "POST", paginated: false } as const;

const operationMetadata49 = {
  group: "Extension installations",
  method: "GET",
  paginated: true,
} as const;

const operationMetadata50 = {
  group: "Extension installations",
  method: "POST",
  paginated: false,
} as const;

const operationMetadata51 = {
  group: "Extension installations",
  method: "GET",
  paginated: false,
} as const;

const operationMetadata52 = {
  group: "Extension installations",
  method: "DELETE",
  paginated: false,
} as const;

const operationMetadata53 = { group: "Extensions", method: "GET", paginated: true } as const;

const operationMetadata54 = { group: "Extensions", method: "POST", paginated: false } as const;

const operationMetadata55 = { group: "Extensions", method: "GET", paginated: false } as const;

const operationMetadata56 = { group: "Feedback", method: "POST", paginated: false } as const;

const operationMetadata57 = { group: "Journeys", method: "GET", paginated: true } as const;

const operationMetadata58 = { group: "Journeys", method: "POST", paginated: false } as const;

const operationMetadata59 = { group: "Journeys", method: "GET", paginated: false } as const;

const operationMetadata60 = { group: "Journeys", method: "DELETE", paginated: false } as const;

const operationMetadata61 = { group: "Journeys", method: "PATCH", paginated: false } as const;

const operationMetadata62 = { group: "Journeys", method: "PUT", paginated: false } as const;

const operationMetadata63 = { group: "Mailboxes", method: "GET", paginated: true } as const;

const operationMetadata64 = { group: "Mailboxes", method: "POST", paginated: false } as const;

const operationMetadata65 = { group: "Mailboxes", method: "GET", paginated: false } as const;

const operationMetadata66 = { group: "Mailboxes", method: "DELETE", paginated: false } as const;

const operationMetadata67 = { group: "Mailboxes", method: "PATCH", paginated: false } as const;

const operationMetadata68 = { group: "Media", method: "POST", paginated: false } as const;

const operationMetadata69 = { group: "Media", method: "GET", paginated: false } as const;

const operationMetadata70 = { group: "Media", method: "DELETE", paginated: false } as const;

const operationMetadata71 = { group: "Messages", method: "GET", paginated: true } as const;

const operationMetadata72 = { group: "Messages", method: "POST", paginated: false } as const;

const operationMetadata73 = { group: "Messages", method: "GET", paginated: false } as const;

const operationMetadata74 = { group: "Messages", method: "DELETE", paginated: false } as const;

const operationMetadata75 = {
  group: "Scheduled Messages",
  method: "GET",
  paginated: true,
} as const;

const operationMetadata76 = {
  group: "Scheduled Messages",
  method: "POST",
  paginated: false,
} as const;

const operationMetadata77 = {
  group: "Scheduled Messages",
  method: "GET",
  paginated: false,
} as const;

const operationMetadata78 = { group: "Namespaces", method: "GET", paginated: true } as const;

const operationMetadata79 = { group: "Namespaces", method: "POST", paginated: false } as const;

const operationMetadata80 = { group: "Namespaces", method: "GET", paginated: false } as const;

const operationMetadata81 = { group: "Namespaces", method: "DELETE", paginated: false } as const;

const operationMetadata82 = { group: "Namespaces", method: "PATCH", paginated: false } as const;

const operationMetadata83 = { group: "Operations", method: "GET", paginated: true } as const;

const operationMetadata84 = { group: "Operations", method: "GET", paginated: false } as const;

const operationMetadata85 = { group: "Operations", method: "POST", paginated: false } as const;

const operationMetadata86 = { group: "Organizations", method: "POST", paginated: false } as const;

const operationMetadata87 = { group: "Organizations", method: "GET", paginated: false } as const;

const operationMetadata88 = { group: "Organizations", method: "PATCH", paginated: false } as const;

const operationMetadata89 = { group: "Subscriptions", method: "POST", paginated: false } as const;

const operationMetadata90 = { group: "Templates", method: "GET", paginated: true } as const;

const operationMetadata91 = { group: "Templates", method: "POST", paginated: false } as const;

const operationMetadata92 = { group: "Templates", method: "GET", paginated: false } as const;

const operationMetadata93 = { group: "Templates", method: "DELETE", paginated: false } as const;

const operationMetadata94 = { group: "Templates", method: "PATCH", paginated: false } as const;

const operationMetadata95 = { group: "Templates", method: "PUT", paginated: false } as const;

const operationMetadata96 = { group: "Topics", method: "GET", paginated: false } as const;

const operationMetadata97 = { group: "Topics", method: "POST", paginated: false } as const;

const operationMetadata98 = { group: "Topics", method: "DELETE", paginated: false } as const;

const operationMetadata99 = { group: "Topics", method: "PATCH", paginated: false } as const;

const operationMetadata100 = { group: "Topic forms", method: "GET", paginated: false } as const;

const operationMetadata101 = { group: "Topic forms", method: "POST", paginated: false } as const;

const operationMetadata102 = { group: "Topic forms", method: "DELETE", paginated: false } as const;

const operationMetadata103 = { group: "Topic forms", method: "PATCH", paginated: false } as const;

const operationMetadata104 = { group: "Topic issues", method: "GET", paginated: false } as const;

const operationMetadata105 = { group: "Topic issues", method: "POST", paginated: false } as const;

const operationMetadata106 = { group: "Topic issues", method: "PATCH", paginated: false } as const;

const operationMetadata107 = {
  group: "Publication domains",
  method: "POST",
  paginated: false,
} as const;

const operationMetadata108 = {
  group: "Publication domains",
  method: "GET",
  paginated: false,
} as const;

const operationMetadata109 = {
  group: "Publication domains",
  method: "DELETE",
  paginated: false,
} as const;

const operationMetadata110 = { group: "Topics", method: "GET", paginated: true } as const;

const operationMetadata111 = { group: "Webhooks", method: "GET", paginated: true } as const;

const operationMetadata112 = { group: "Webhooks", method: "POST", paginated: false } as const;

const operationMetadata113 = { group: "Webhooks", method: "GET", paginated: false } as const;

const operationMetadata114 = { group: "Webhooks", method: "DELETE", paginated: false } as const;

const operationMetadata115 = { group: "Webhooks", method: "PATCH", paginated: false } as const;

const operationMetadata116 = { group: "Whoami", method: "GET", paginated: false } as const;

export const SamvaOperations = {
  agentsList: operationMetadata0,
  agentsCreate: operationMetadata1,
  agentsGet: operationMetadata2,
  agentsRemove: operationMetadata3,
  agentsUpdate: operationMetadata4,
  agentsReplaceDraft: operationMetadata5,
  agentsPublish: operationMetadata1,
  agentsListVersions: operationMetadata0,
  agentsGetVersion: operationMetadata2,
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
  campaignsScheduleRun: operationMetadata19,
  campaignsGetRun: operationMetadata20,
  campaignsCancelRun: operationMetadata19,
  campaignsPauseRun: operationMetadata19,
  campaignsListRecipients: operationMetadata18,
  campaignsGetRunReport: operationMetadata20,
  campaignsResumeRun: operationMetadata19,
  campaignsPreview: operationMetadata19,
  campaignsSendTest: operationMetadata19,
  contactGroupsList: operationMetadata22,
  contactGroupsCreate: operationMetadata23,
  contactGroupsGetById: operationMetadata24,
  contactGroupsRemove: operationMetadata25,
  contactGroupsUpdate: operationMetadata26,
  contactGroupsEvaluateDynamic: operationMetadata23,
  contactGroupsGetMembers: operationMetadata22,
  contactGroupsAddMembers: operationMetadata23,
  contactGroupsRemoveMembers: operationMetadata25,
  contactGroupsPreview: operationMetadata23,
  contactsList: operationMetadata27,
  contactsCreate: operationMetadata28,
  contactsGet: operationMetadata29,
  contactsRemove: operationMetadata30,
  contactsUpdate: operationMetadata31,
  contactsGetActivityTimeline: operationMetadata27,
  contactsGetEngagement: operationMetadata29,
  contactEventsListEvents: operationMetadata32,
  contactsGetGroupMemberships: operationMetadata27,
  contactsAddIdentity: operationMetadata28,
  contactsRemoveIdentity: operationMetadata30,
  contactsSetConsent: operationMetadata33,
  contactsAddTags: operationMetadata28,
  contactsRemoveTags: operationMetadata30,
  contactsBulkDelete: operationMetadata28,
  contactsBulkUpdateStatus: operationMetadata28,
  contactsBulkUpdateTags: operationMetadata28,
  contactsExport: operationMetadata28,
  contactsFind: operationMetadata28,
  contactsFindOrCreate: operationMetadata28,
  contactsStartImport: operationMetadata28,
  contactsGetImportJob: operationMetadata29,
  contactsPlanImport: operationMetadata28,
  conversationsList: operationMetadata34,
  conversationsCreate: operationMetadata35,
  conversationsGetById: operationMetadata36,
  conversationsUpdate: operationMetadata37,
  conversationsAddCategories: operationMetadata35,
  conversationsRemoveCategories: operationMetadata38,
  conversationsAddChannels: operationMetadata35,
  conversationsRemoveChannels: operationMetadata38,
  conversationsAddContacts: operationMetadata35,
  conversationsRemoveContacts: operationMetadata38,
  conversationsListMessages: operationMetadata34,
  conversationsAddTags: operationMetadata35,
  conversationsRemoveTags: operationMetadata38,
  customFieldsList: operationMetadata39,
  customFieldsCreate: operationMetadata40,
  customFieldsRemove: operationMetadata41,
  customFieldsUpdate: operationMetadata42,
  emailListBlocks: operationMetadata43,
  emailAddBlock: operationMetadata44,
  emailRemoveBlock: operationMetadata45,
  emailUpdateBlock: operationMetadata46,
  emailCheckBlocked: operationMetadata44,
  emailGetBlockLogs: operationMetadata43,
  emailGetCatchAllConfig: operationMetadata47,
  emailUpdateCatchAllConfig: operationMetadata46,
  emailGetCatchAllStats: operationMetadata47,
  emailListDomains: operationMetadata43,
  emailAddDomain: operationMetadata44,
  emailGetDomainById: operationMetadata47,
  emailRemoveDomain: operationMetadata45,
  emailUpdateDomainConfig: operationMetadata46,
  emailGetCustomTracking: operationMetadata47,
  emailEnableCustomTracking: operationMetadata44,
  emailDisableCustomTracking: operationMetadata45,
  emailGetCustomTrackingDomainConnect: operationMetadata47,
  emailBuildCustomTrackingDomainConnectApplyUrl: operationMetadata44,
  emailCompleteCustomTrackingDomainConnect: operationMetadata44,
  emailRecheckCustomTracking: operationMetadata44,
  emailSetDefaultDomain: operationMetadata44,
  emailDisableCatchAll: operationMetadata44,
  emailGetDomainConnect: operationMetadata47,
  emailBuildDomainConnectApplyUrl: operationMetadata44,
  emailCompleteDomainConnect: operationMetadata44,
  emailEnableCatchAll: operationMetadata44,
  emailEnableReceiving: operationMetadata44,
  emailGetReceivingStatus: operationMetadata47,
  emailDetectRegistrar: operationMetadata44,
  emailRotateDomainDkim: operationMetadata44,
  emailGetDomainVerification: operationMetadata47,
  emailAdvanceDomainVerification: operationMetadata44,
  emailGetDomainWarming: operationMetadata47,
  emailCreateDomainWarmingPlan: operationMetadata44,
  emailCancelDomainWarmingBatch: operationMetadata45,
  emailCompleteDomainWarming: operationMetadata44,
  emailPauseDomainWarming: operationMetadata44,
  emailUpdateDomainWarmingPolicy: operationMetadata46,
  emailResumeDomainWarming: operationMetadata44,
  emailListForwardingRules: operationMetadata47,
  emailCreateForwardingRule: operationMetadata44,
  emailDeleteForwardingRule: operationMetadata45,
  emailUpdateForwardingRule: operationMetadata46,
  emailGetForwardingLog: operationMetadata43,
  emailGetOnboardingReview: operationMetadata47,
  emailReapplyOnboardingReview: operationMetadata44,
  emailRespondToOnboardingInformationRequest: operationMetadata44,
  emailListSenders: operationMetadata43,
  emailAddSender: operationMetadata44,
  emailGetSender: operationMetadata47,
  emailRemoveSender: operationMetadata45,
  emailSetDefaultSender: operationMetadata44,
  emailCheckSenderVerification: operationMetadata47,
  emailGetStats: operationMetadata47,
  emailListSuppressions: operationMetadata43,
  emailRemoveSuppression: operationMetadata45,
  emailCountSuppressions: operationMetadata47,
  emailGetTrackingDefaults: operationMetadata47,
  emailUpdateTrackingDefaults: operationMetadata46,
  emailGetRecipientTrackingPreference: operationMetadata47,
  emailUpdateRecipientTrackingPreference: operationMetadata46,
  eventsCreate: operationMetadata48,
  eventsBatch: operationMetadata48,
  extensionInstallationsList: operationMetadata49,
  extensionInstallationsInstall: operationMetadata50,
  extensionInstallationsGet: operationMetadata51,
  extensionInstallationsUninstall: operationMetadata52,
  extensionInstallationsDisable: operationMetadata50,
  extensionInstallationsEnable: operationMetadata50,
  extensionInstallationsListRuns: operationMetadata51,
  extensionInstallationsGetRun: operationMetadata51,
  extensionInstallationsUpgrade: operationMetadata50,
  extensionsList: operationMetadata53,
  extensionsPublish: operationMetadata54,
  extensionsGet: operationMetadata55,
  extensionsListVersions: operationMetadata53,
  extensionsGetVersion: operationMetadata55,
  feedbackSend: operationMetadata56,
  journeysList: operationMetadata57,
  journeysCreate: operationMetadata58,
  journeysGet: operationMetadata59,
  journeysRemove: operationMetadata60,
  journeysUpdate: operationMetadata61,
  journeysArchive: operationMetadata58,
  journeysReplaceDraft: operationMetadata62,
  journeysPause: operationMetadata58,
  journeysPublish: operationMetadata58,
  journeysResume: operationMetadata58,
  journeysListRuns: operationMetadata57,
  journeysGetRun: operationMetadata59,
  journeysStats: operationMetadata59,
  journeysGetVersion: operationMetadata59,
  mailboxesList: operationMetadata63,
  mailboxesCreate: operationMetadata64,
  mailboxesGet: operationMetadata65,
  mailboxesRemove: operationMetadata66,
  mailboxesUpdate: operationMetadata67,
  mailboxesListActions: operationMetadata63,
  mailboxesGetAction: operationMetadata65,
  mailboxesApproveAction: operationMetadata64,
  mailboxesCancelAction: operationMetadata64,
  mailboxesDenyAction: operationMetadata64,
  mailboxesRetryAction: operationMetadata64,
  mailboxesGetAgentActivity: operationMetadata65,
  mailboxesListDrafts: operationMetadata63,
  mailboxesCreateDraft: operationMetadata64,
  mailboxesGetDraft: operationMetadata65,
  mailboxesDeleteDraft: operationMetadata66,
  mailboxesUpdateDraft: operationMetadata67,
  mailboxesSendDraft: operationMetadata64,
  mailboxesCreateEndpoint: operationMetadata64,
  mailboxesRemoveEndpoint: operationMetadata66,
  mailboxesUpdateEndpoint: operationMetadata67,
  mailboxesListEvents: operationMetadata63,
  mailboxesListFolders: operationMetadata65,
  mailboxesListGrants: operationMetadata63,
  mailboxesCreateGrant: operationMetadata64,
  mailboxesRevokeGrant: operationMetadata66,
  mailboxesUpdateGrant: operationMetadata67,
  mailboxesListLabels: operationMetadata65,
  mailboxesCreateLabel: operationMetadata64,
  mailboxesDeleteLabel: operationMetadata66,
  mailboxesUpdateLabel: operationMetadata67,
  mailboxesSendMessage: operationMetadata64,
  mailboxesGetMessage: operationMetadata65,
  mailboxesGetMessageAttachment: operationMetadata65,
  mailboxesCopyMessageAttachment: operationMetadata64,
  mailboxesDiscardMessage: operationMetadata64,
  mailboxesForward: operationMetadata64,
  mailboxesGetMessageRaw: operationMetadata65,
  mailboxesReleaseMessage: operationMetadata64,
  mailboxesReply: operationMetadata64,
  mailboxesReplyAll: operationMetadata64,
  mailboxesPause: operationMetadata64,
  mailboxesListPolicies: operationMetadata65,
  mailboxesCreatePolicy: operationMetadata64,
  mailboxesGetPolicy: operationMetadata65,
  mailboxesDeletePolicy: operationMetadata66,
  mailboxesUpdatePolicy: operationMetadata67,
  mailboxesListQuarantine: operationMetadata63,
  mailboxesResume: operationMetadata64,
  mailboxesListThreads: operationMetadata63,
  mailboxesGetThread: operationMetadata65,
  mailboxesUpdateThread: operationMetadata67,
  mailboxesGetThreadContent: operationMetadata63,
  mailboxesAddThreadLabels: operationMetadata64,
  mailboxesRemoveThreadLabels: operationMetadata66,
  mailboxesListThreadMessages: operationMetadata63,
  mailboxesListThreadNotes: operationMetadata63,
  mailboxesCreateNote: operationMetadata64,
  mailboxesDeleteNote: operationMetadata66,
  mailboxesUpdateNote: operationMetadata67,
  mediaCreate: operationMetadata68,
  mediaGetById: operationMetadata69,
  mediaRemove: operationMetadata70,
  mediaComplete: operationMetadata68,
  mediaDownloadUrl: operationMetadata69,
  messagesList: operationMetadata71,
  messagesSend: operationMetadata72,
  messagesGet: operationMetadata73,
  messagesRemove: operationMetadata74,
  messagesGetContent: operationMetadata73,
  messagesListDeliveries: operationMetadata73,
  messagesGetEmail: operationMetadata73,
  messagesGetEvents: operationMetadata71,
  messagesGetStatus: operationMetadata73,
  scheduledMessagesList: operationMetadata75,
  scheduledMessagesCreate: operationMetadata76,
  scheduledMessagesGet: operationMetadata77,
  scheduledMessagesCancel: operationMetadata76,
  scheduledMessagesResume: operationMetadata76,
  messagesValidateEmail: operationMetadata72,
  namespacesList: operationMetadata78,
  namespacesCreate: operationMetadata79,
  namespacesGet: operationMetadata80,
  namespacesRemove: operationMetadata81,
  namespacesUpdate: operationMetadata82,
  namespacesAssignResource: operationMetadata79,
  namespacesRemoveResource: operationMetadata81,
  namespacesGetUsage: operationMetadata80,
  operationsList: operationMetadata83,
  operationsGet: operationMetadata84,
  operationsRetry: operationMetadata85,
  organizationsCreate: operationMetadata86,
  organizationsGet: operationMetadata87,
  organizationsUpdate: operationMetadata88,
  organizationsCreateAvatarUpload: operationMetadata86,
  organizationsGetProfile: operationMetadata87,
  organizationsDelete: operationMetadata86,
  organizationsGetTrustTier: operationMetadata87,
  organizationsGetUsage: operationMetadata87,
  subscriptionsSubscribe: operationMetadata89,
  templatesList: operationMetadata90,
  templatesCreate: operationMetadata91,
  templatesGetById: operationMetadata92,
  templatesRemove: operationMetadata93,
  templatesUpdate: operationMetadata94,
  templatesListInputContracts: operationMetadata90,
  templatesGetInputContract: operationMetadata92,
  templatesPublish: operationMetadata91,
  templatesGetPublication: operationMetadata92,
  templatesRenderPublication: operationMetadata91,
  templatesGetGitRepository: operationMetadata92,
  templatesIssueGitCredential: operationMetadata91,
  templatesOpenWorkspace: operationMetadata91,
  templatesPatchWorkspace: operationMetadata94,
  templatesPutWorkspaceAsset: operationMetadata95,
  templatesCheckWorkspace: operationMetadata91,
  templatesResolveWorkspaceConflict: operationMetadata91,
  templatesDiffWorkspace: operationMetadata91,
  templatesRenderWorkspaceFixture: operationMetadata91,
  templatesWorkspaceHistory: operationMetadata92,
  templatesAttachWorkspaceResource: operationMetadata91,
  templatesRemoveWorkspaceResource: operationMetadata91,
  templatesRestoreWorkspace: operationMetadata91,
  templatesSaveWorkspace: operationMetadata91,
  templatesListFamilies: operationMetadata90,
  templatesCreateFamily: operationMetadata91,
  templatesGetFamily: operationMetadata92,
  templatesDeleteFamily: operationMetadata93,
  templatesRenameFamily: operationMetadata94,
  templatesAttachFamilyMember: operationMetadata91,
  templatesDetachFamilyMember: operationMetadata93,
  templatesCreateFamilyFromTemplate: operationMetadata91,
  templatesCreateFromWebsite: operationMetadata91,
  templatesAddEntry: operationMetadata91,
  topicsList: operationMetadata96,
  topicsCreate: operationMetadata97,
  topicsGet: operationMetadata96,
  topicsRemove: operationMetadata98,
  topicsUpdate: operationMetadata99,
  topicsSetDefault: operationMetadata97,
  topicFormsList: operationMetadata100,
  topicFormsCreate: operationMetadata101,
  topicFormsGet: operationMetadata100,
  topicFormsRemove: operationMetadata102,
  topicFormsUpdate: operationMetadata103,
  topicIssuesList: operationMetadata104,
  topicIssuesCreate: operationMetadata105,
  topicIssuesUpdate: operationMetadata106,
  topicIssuesCheck: operationMetadata105,
  topicIssuesGet: operationMetadata104,
  topicIssuesHead: operationMetadata104,
  topicIssuesHistory: operationMetadata104,
  topicIssuesRemove: operationMetadata105,
  topicIssuesRender: operationMetadata105,
  topicIssuesSave: operationMetadata105,
  topicIssuesOpen: operationMetadata104,
  topicPublicationDomainsAdd: operationMetadata107,
  topicPublicationDomainsGet: operationMetadata108,
  topicPublicationDomainsRemove: operationMetadata109,
  topicsListSubscriptions: operationMetadata110,
  topicsSetSubscriptions: operationMetadata97,
  topicsCheckSubscription: operationMetadata96,
  webhooksList: operationMetadata111,
  webhooksCreate: operationMetadata112,
  webhooksGet: operationMetadata113,
  webhooksRemove: operationMetadata114,
  webhooksUpdate: operationMetadata115,
  webhooksRetryDelivery: operationMetadata112,
  webhooksGetLogs: operationMetadata111,
  webhooksRegenerateSecret: operationMetadata112,
  webhooksGetSecret: operationMetadata113,
  webhooksGetStats: operationMetadata113,
  webhooksTest: operationMetadata112,
  whoamiGet: operationMetadata116,
} as const;
