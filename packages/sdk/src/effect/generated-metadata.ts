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
  CredentialsError: {
    categories: [],
    retryable: false,
    rules: {
      field: "retryable",
      cases: {
        true: {
          categories: ["transient"],
          retryable: true,
        },
        false: {
          categories: [],
          retryable: false,
        },
      },
    },
  },
  DeliveryUnavailableError: {
    categories: ["transient"],
    retryable: true,
  },
  EmailChannelError: {
    categories: [],
    retryable: false,
    rules: {
      field: "reason",
      cases: {
        transport: {
          categories: ["transient"],
          retryable: true,
        },
        rejected: {
          categories: ["validation"],
          retryable: false,
        },
        rate_limited: {
          categories: ["throttling", "transient"],
          retryable: true,
        },
        auth: {
          categories: ["auth"],
          retryable: false,
        },
      },
    },
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
  ShareLinkUnavailable: {
    categories: [],
    retryable: false,
  },
  SlugTaken: {
    categories: [],
    retryable: false,
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
  WhatsAppChannelError: {
    categories: [],
    retryable: false,
    rules: {
      field: "reason",
      cases: {
        transport: {
          categories: ["transient"],
          retryable: true,
        },
        rejected: {
          categories: ["validation"],
          retryable: false,
        },
        rate_limited: {
          categories: ["throttling", "transient"],
          retryable: true,
        },
        auth: {
          categories: ["auth"],
          retryable: false,
        },
        unsupported: {
          categories: [],
          retryable: false,
        },
      },
    },
  },
  WhatsAppServiceWindowClosedError: {
    categories: [],
    retryable: false,
  },
  WhatsAppSetupLinkUnavailableError: {
    categories: [],
    retryable: false,
  },
} as const;

const operationMetadata0 = {
  group: "Accounts",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata1 = {
  group: "Accounts",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata2 = {
  group: "Accounts",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata3 = {
  group: "Agents",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata4 = {
  group: "Agents",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata5 = {
  group: "Agents",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata6 = {
  group: "Agents",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata7 = {
  group: "Agents",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata8 = {
  group: "Agents",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata9 = {
  group: "Analytics",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata10 = {
  group: "Analytics",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata11 = {
  group: "API Keys",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata12 = {
  group: "API Keys",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata13 = {
  group: "API Keys",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata14 = {
  group: "API Keys",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata15 = {
  group: "Approval requests",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata16 = {
  group: "Approval requests",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata17 = {
  group: "Attachments",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata18 = {
  group: "Attachments",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata19 = {
  group: "Brands",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata20 = {
  group: "Brands",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata21 = {
  group: "Brands",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata22 = {
  group: "Brands",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata23 = {
  group: "Campaigns",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata24 = {
  group: "Campaigns",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata25 = {
  group: "Campaigns",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata26 = {
  group: "Campaigns",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata27 = {
  group: "Campaigns",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata28 = {
  group: "Contact Groups",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata29 = {
  group: "Contact Groups",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata30 = {
  group: "Contact Groups",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata31 = {
  group: "Contact Groups",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata32 = {
  group: "Contact Groups",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata33 = {
  group: "Contacts",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata34 = {
  group: "Contacts",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata35 = {
  group: "Contacts",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata36 = {
  group: "Contacts",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata37 = {
  group: "Contacts",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata38 = {
  group: "Contact events",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata39 = {
  group: "Contacts",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata40 = {
  group: "Contacts",
  method: "POST",
  idempotent: true,
  idempotentWhen: { field: "mode", equals: "new" },
  paginated: false,
} as const;

const operationMetadata41 = {
  group: "Conversations",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata42 = {
  group: "Conversations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata43 = {
  group: "Conversations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata44 = {
  group: "Conversations",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata45 = {
  group: "Conversations",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata46 = {
  group: "Custom Fields",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata47 = {
  group: "Custom Fields",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata48 = {
  group: "Custom Fields",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata49 = {
  group: "Custom Fields",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata50 = {
  group: "Email",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata51 = {
  group: "Email",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata52 = {
  group: "Email",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata53 = {
  group: "Email",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata54 = {
  group: "Email",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata55 = {
  group: "Email",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata56 = {
  group: "Events",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata57 = {
  group: "Feedback",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata58 = {
  group: "Integrations",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata59 = {
  group: "Integrations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata60 = {
  group: "Integrations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata61 = {
  group: "Integrations",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata62 = {
  group: "Integrations",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata63 = {
  group: "Integrations catalog",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata64 = {
  group: "Integrations catalog",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata65 = {
  group: "Integrations catalog",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata66 = {
  group: "Integrations catalog",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata67 = {
  group: "Journeys",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata68 = {
  group: "Journeys",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata69 = {
  group: "Journeys",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata70 = {
  group: "Journeys",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata71 = {
  group: "Journeys",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata72 = {
  group: "Journeys",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata73 = {
  group: "Logs",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata74 = {
  group: "Logs",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata75 = {
  group: "Mailboxes",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata76 = {
  group: "Mailboxes",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata77 = {
  group: "Mailboxes",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata78 = {
  group: "Mailboxes",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata79 = {
  group: "Mailboxes",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata80 = {
  group: "Mailboxes",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata81 = {
  group: "Mailboxes",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata82 = {
  group: "Media",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata83 = {
  group: "Media",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata84 = {
  group: "Media",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata85 = {
  group: "Messages",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata86 = {
  group: "Messages",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata87 = {
  group: "Messages",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata88 = {
  group: "Messages",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata89 = {
  group: "Scheduled Messages",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata90 = {
  group: "Scheduled Messages",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata91 = {
  group: "Scheduled Messages",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata92 = {
  group: "Scheduled Messages",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata93 = {
  group: "Messages",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata94 = {
  group: "Namespaces",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata95 = {
  group: "Namespaces",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata96 = {
  group: "Namespaces",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata97 = {
  group: "Namespaces",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata98 = {
  group: "Namespaces",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata99 = {
  group: "Newsletters",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata100 = {
  group: "Newsletters",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata101 = {
  group: "Newsletters",
  method: "DELETE",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata102 = {
  group: "Newsletters",
  method: "PATCH",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata103 = {
  group: "Newsletter domains",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata104 = {
  group: "Newsletter domains",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata105 = {
  group: "Newsletter domains",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata106 = {
  group: "Newsletter domains",
  method: "DELETE",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata107 = {
  group: "Newsletter issues",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata108 = {
  group: "Newsletter issues",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata109 = {
  group: "Newsletter issues",
  method: "PATCH",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata110 = {
  group: "Operations",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata111 = {
  group: "Operations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata112 = {
  group: "Operations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata113 = {
  group: "Organizations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata114 = {
  group: "Organizations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata115 = {
  group: "Organizations",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata116 = {
  group: "Organizations",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata117 = {
  group: "Policies",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata118 = {
  group: "Policies",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata119 = {
  group: "Policies",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata120 = {
  group: "Subscriptions",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata121 = {
  group: "Template share links",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata122 = {
  group: "Template share links",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata123 = {
  group: "Template share links",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata124 = {
  group: "Template share links",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata125 = {
  group: "Templates",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata126 = {
  group: "Templates",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata127 = {
  group: "Templates",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata128 = {
  group: "Templates",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata129 = {
  group: "Templates",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata130 = {
  group: "Templates",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata131 = {
  group: "Template registrations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata132 = {
  group: "Template registrations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata133 = {
  group: "Templates",
  method: "PATCH",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata134 = {
  group: "Templates",
  method: "PUT",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata135 = {
  group: "Topics",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata136 = {
  group: "Topics",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata137 = {
  group: "Topics",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata138 = {
  group: "Topics",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata139 = {
  group: "Topic forms",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata140 = {
  group: "Topic forms",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata141 = {
  group: "Topic forms",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata142 = {
  group: "Topic forms",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata143 = {
  group: "Topics",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata144 = {
  group: "Webhooks",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata145 = {
  group: "Webhooks",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata146 = {
  group: "Webhooks",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata147 = {
  group: "Webhooks",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata148 = {
  group: "Webhooks",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata149 = {
  group: "WhatsApp",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata150 = {
  group: "WhatsApp",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata151 = {
  group: "WhatsApp",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata152 = {
  group: "WhatsApp",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata153 = {
  group: "WhatsApp",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata154 = {
  group: "WhatsApp flows",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata155 = {
  group: "WhatsApp flows",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata156 = {
  group: "WhatsApp flows",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata157 = {
  group: "WhatsApp setup links",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata158 = {
  group: "WhatsApp setup links",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata159 = {
  group: "WhatsApp setup links",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata160 = {
  group: "Whoami",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

export const SamvaOperations = {
  accountsList: operationMetadata0,
  accountsGet: operationMetadata0,
  accountsRemove: operationMetadata1,
  accountsCheck: operationMetadata2,
  accountsConnect: operationMetadata2,
  accountsListContactConnections: operationMetadata0,
  agentsList: operationMetadata3,
  agentsCreate: operationMetadata4,
  agentsGet: operationMetadata5,
  agentsRemove: operationMetadata6,
  agentsUpdate: operationMetadata7,
  agentsContinueOnStandard: operationMetadata4,
  agentsReplaceDraft: operationMetadata8,
  agentsPublish: operationMetadata4,
  agentsRerunTests: operationMetadata4,
  agentsListVersions: operationMetadata3,
  agentsPublishVersion: operationMetadata4,
  agentsGetVersion: operationMetadata5,
  agentsListModels: operationMetadata5,
  analyticsGetChannelStats: operationMetadata9,
  analyticsGetDeliveryMetrics: operationMetadata9,
  analyticsExportData: operationMetadata10,
  analyticsGetHourlyDistribution: operationMetadata9,
  analyticsGetStats: operationMetadata9,
  analyticsGetTopContacts: operationMetadata9,
  apiKeysList: operationMetadata11,
  apiKeysCreate: operationMetadata12,
  apiKeysGet: operationMetadata13,
  apiKeysUpdate: operationMetadata14,
  apiKeysGetActivity: operationMetadata11,
  apiKeysRevoke: operationMetadata12,
  apiKeysRotate: operationMetadata12,
  apiKeysGetStats: operationMetadata13,
  approvalRequestsCreate: operationMetadata15,
  approvalRequestsGet: operationMetadata16,
  approvalRequestsApprove: operationMetadata15,
  approvalRequestsReject: operationMetadata15,
  attachmentsList: operationMetadata17,
  attachmentsGetById: operationMetadata17,
  attachmentsRemove: operationMetadata18,
  attachmentsDownloadUrl: operationMetadata17,
  brandsList: operationMetadata19,
  brandsCreate: operationMetadata20,
  brandsGet: operationMetadata19,
  brandsRemove: operationMetadata21,
  brandsUpdate: operationMetadata22,
  brandsSetDefault: operationMetadata20,
  campaignsList: operationMetadata23,
  campaignsCreate: operationMetadata24,
  campaignsGet: operationMetadata25,
  campaignsUpdate: operationMetadata26,
  campaignsArchive: operationMetadata24,
  campaignsListRuns: operationMetadata23,
  campaignsScheduleRun: operationMetadata27,
  campaignsGetRun: operationMetadata25,
  campaignsCancelRun: operationMetadata24,
  campaignsPauseRun: operationMetadata24,
  campaignsListRecipients: operationMetadata23,
  campaignsGetRunReport: operationMetadata25,
  campaignsResumeRun: operationMetadata24,
  campaignsPreview: operationMetadata24,
  campaignsSendTest: operationMetadata24,
  contactGroupsList: operationMetadata28,
  contactGroupsCreate: operationMetadata29,
  contactGroupsGetById: operationMetadata30,
  contactGroupsRemove: operationMetadata31,
  contactGroupsUpdate: operationMetadata32,
  contactGroupsEvaluateDynamic: operationMetadata29,
  contactGroupsGetMembers: operationMetadata28,
  contactGroupsAddMembers: operationMetadata29,
  contactGroupsRemoveMembers: operationMetadata31,
  contactGroupsPreview: operationMetadata29,
  contactsList: operationMetadata33,
  contactsCreate: operationMetadata34,
  contactsGet: operationMetadata35,
  contactsRemove: operationMetadata36,
  contactsUpdate: operationMetadata37,
  contactsGetActivityTimeline: operationMetadata33,
  contactsGetEngagement: operationMetadata35,
  contactEventsListEvents: operationMetadata38,
  contactsGetGroupMemberships: operationMetadata33,
  contactsAddIdentity: operationMetadata34,
  contactsRemoveIdentity: operationMetadata36,
  contactsSetConsent: operationMetadata39,
  contactsMerge: operationMetadata34,
  contactsMergeByConnection: operationMetadata34,
  contactsAddTags: operationMetadata34,
  contactsRemoveTags: operationMetadata36,
  contactsBulkDelete: operationMetadata34,
  contactsBulkUpdateStatus: operationMetadata34,
  contactsBulkUpdateTags: operationMetadata34,
  contactsExport: operationMetadata34,
  contactsFind: operationMetadata34,
  contactsFindOrCreate: operationMetadata34,
  contactsStartImport: operationMetadata40,
  contactsGetImportJob: operationMetadata35,
  contactsPlanImport: operationMetadata34,
  conversationsList: operationMetadata41,
  conversationsCreate: operationMetadata42,
  conversationsGetById: operationMetadata43,
  conversationsUpdate: operationMetadata44,
  conversationsAddCategories: operationMetadata42,
  conversationsRemoveCategories: operationMetadata45,
  conversationsAddChannels: operationMetadata42,
  conversationsRemoveChannels: operationMetadata45,
  conversationsAddContacts: operationMetadata42,
  conversationsRemoveContacts: operationMetadata45,
  conversationsListMessages: operationMetadata41,
  conversationsAddTags: operationMetadata42,
  conversationsRemoveTags: operationMetadata45,
  customFieldsList: operationMetadata46,
  customFieldsCreate: operationMetadata47,
  customFieldsRemove: operationMetadata48,
  customFieldsUpdate: operationMetadata49,
  emailListBlocks: operationMetadata50,
  emailAddBlock: operationMetadata51,
  emailRemoveBlock: operationMetadata52,
  emailUpdateBlock: operationMetadata53,
  emailCheckBlocked: operationMetadata51,
  emailGetBlockLogs: operationMetadata50,
  emailGetCatchAllConfig: operationMetadata54,
  emailUpdateCatchAllConfig: operationMetadata53,
  emailGetCatchAllStats: operationMetadata54,
  emailListDomains: operationMetadata50,
  emailAddDomain: operationMetadata51,
  emailGetDomainById: operationMetadata54,
  emailRemoveDomain: operationMetadata52,
  emailUpdateDomainConfig: operationMetadata53,
  emailGetCustomTracking: operationMetadata54,
  emailEnableCustomTracking: operationMetadata51,
  emailDisableCustomTracking: operationMetadata52,
  emailGetCustomTrackingDomainConnect: operationMetadata54,
  emailBuildCustomTrackingDomainConnectApplyUrl: operationMetadata51,
  emailCompleteCustomTrackingDomainConnect: operationMetadata51,
  emailRecheckCustomTracking: operationMetadata51,
  emailSetDefaultDomain: operationMetadata51,
  emailDisableCatchAll: operationMetadata51,
  emailGetDomainConnect: operationMetadata54,
  emailBuildDomainConnectApplyUrl: operationMetadata51,
  emailCompleteDomainConnect: operationMetadata51,
  emailEnableCatchAll: operationMetadata51,
  emailEnableReceiving: operationMetadata51,
  emailGetReceivingStatus: operationMetadata54,
  emailDetectRegistrar: operationMetadata51,
  emailRotateDomainDkim: operationMetadata55,
  emailGetDomainVerification: operationMetadata54,
  emailAdvanceDomainVerification: operationMetadata51,
  emailGetDomainWarming: operationMetadata54,
  emailCreateDomainWarmingPlan: operationMetadata51,
  emailCancelDomainWarmingBatch: operationMetadata52,
  emailCompleteDomainWarming: operationMetadata51,
  emailPauseDomainWarming: operationMetadata51,
  emailUpdateDomainWarmingPolicy: operationMetadata53,
  emailResumeDomainWarming: operationMetadata51,
  emailListForwardingRules: operationMetadata54,
  emailCreateForwardingRule: operationMetadata51,
  emailDeleteForwardingRule: operationMetadata52,
  emailUpdateForwardingRule: operationMetadata53,
  emailGetForwardingLog: operationMetadata50,
  emailGetOnboardingReview: operationMetadata54,
  emailReapplyOnboardingReview: operationMetadata51,
  emailRespondToOnboardingInformationRequest: operationMetadata51,
  emailListSenders: operationMetadata50,
  emailAddSender: operationMetadata55,
  emailGetSender: operationMetadata54,
  emailRemoveSender: operationMetadata52,
  emailSetDefaultSender: operationMetadata51,
  emailCheckSenderVerification: operationMetadata54,
  emailGetStats: operationMetadata54,
  emailListSuppressions: operationMetadata50,
  emailRemoveSuppression: operationMetadata52,
  emailCountSuppressions: operationMetadata54,
  emailGetTrackingDefaults: operationMetadata54,
  emailUpdateTrackingDefaults: operationMetadata53,
  emailGetRecipientTrackingPreference: operationMetadata54,
  emailUpdateRecipientTrackingPreference: operationMetadata53,
  eventsCreate: operationMetadata56,
  eventsBatch: operationMetadata56,
  feedbackSend: operationMetadata57,
  integrationsList: operationMetadata58,
  integrationsInstall: operationMetadata59,
  integrationsGet: operationMetadata60,
  integrationsRemove: operationMetadata61,
  integrationsUpdate: operationMetadata62,
  integrationsListTools: operationMetadata58,
  integrationsReadTool: operationMetadata60,
  integrationCatalogList: operationMetadata63,
  integrationCatalogPrepare: operationMetadata64,
  integrationCatalogRecipeCatalog: operationMetadata63,
  integrationCatalogRecipeConnectionHandoff: operationMetadata63,
  integrationCatalogRecipeTest: operationMetadata64,
  integrationCatalogRecipeTestReceipt: operationMetadata63,
  integrationCatalogRecipeTestHandoff: operationMetadata63,
  integrationCatalogRecipeWhatsAppChallengeBegin: operationMetadata64,
  integrationCatalogRecipeWhatsAppChallengeGet: operationMetadata63,
  integrationCatalogRecipeWhatsAppChallengeConfirm: operationMetadata64,
  integrationCatalogRecipePreview: operationMetadata64,
  integrationCatalogRecipeReadiness: operationMetadata63,
  integrationCatalogRecipeSetupsList: operationMetadata63,
  integrationCatalogRecipeSetupGet: operationMetadata63,
  integrationCatalogRecipeSetupReplace: operationMetadata65,
  integrationCatalogRecipeSetupActivate: operationMetadata64,
  integrationCatalogSearch: operationMetadata66,
  journeysList: operationMetadata67,
  journeysCreate: operationMetadata68,
  journeysGet: operationMetadata69,
  journeysRemove: operationMetadata70,
  journeysUpdate: operationMetadata71,
  journeysArchive: operationMetadata68,
  journeysReplaceDraft: operationMetadata72,
  journeysPause: operationMetadata68,
  journeysPublish: operationMetadata68,
  journeysResume: operationMetadata68,
  journeysListRuns: operationMetadata67,
  journeysGetRun: operationMetadata69,
  journeysStats: operationMetadata69,
  journeysGetVersion: operationMetadata69,
  logsList: operationMetadata73,
  logsGet: operationMetadata74,
  mailboxesList: operationMetadata75,
  mailboxesCreate: operationMetadata76,
  mailboxesGet: operationMetadata77,
  mailboxesRemove: operationMetadata78,
  mailboxesUpdate: operationMetadata79,
  mailboxesListActions: operationMetadata75,
  mailboxesGetAction: operationMetadata77,
  mailboxesApproveAction: operationMetadata80,
  mailboxesCancelAction: operationMetadata80,
  mailboxesDenyAction: operationMetadata80,
  mailboxesRetryAction: operationMetadata80,
  mailboxesListAddresses: operationMetadata77,
  mailboxesGetAgentActivity: operationMetadata77,
  mailboxesListDrafts: operationMetadata75,
  mailboxesCreateDraft: operationMetadata80,
  mailboxesGetDraft: operationMetadata77,
  mailboxesDeleteDraft: operationMetadata78,
  mailboxesUpdateDraft: operationMetadata79,
  mailboxesScheduleDraft: operationMetadata80,
  mailboxesSendDraft: operationMetadata76,
  mailboxesCreateEndpoint: operationMetadata80,
  mailboxesRemoveEndpoint: operationMetadata78,
  mailboxesUpdateEndpoint: operationMetadata79,
  mailboxesListEvents: operationMetadata75,
  mailboxesListFolders: operationMetadata77,
  mailboxesListGrants: operationMetadata75,
  mailboxesCreateGrant: operationMetadata80,
  mailboxesRevokeGrant: operationMetadata78,
  mailboxesUpdateGrant: operationMetadata79,
  mailboxesListImports: operationMetadata77,
  mailboxesGetImport: operationMetadata77,
  mailboxesDiscardImport: operationMetadata78,
  mailboxesStartImport: operationMetadata80,
  mailboxesDiscardImportUpload: operationMetadata78,
  mailboxesCompleteImportUpload: operationMetadata80,
  mailboxesSignImportUploadParts: operationMetadata80,
  mailboxesCreateImportUpload: operationMetadata80,
  mailboxesListLabels: operationMetadata77,
  mailboxesCreateLabel: operationMetadata80,
  mailboxesDeleteLabel: operationMetadata78,
  mailboxesUpdateLabel: operationMetadata79,
  mailboxesSendMessage: operationMetadata76,
  mailboxesGetMessage: operationMetadata77,
  mailboxesGetMessageAttachment: operationMetadata77,
  mailboxesCopyMessageAttachment: operationMetadata80,
  mailboxesForward: operationMetadata76,
  mailboxesGetMessageRaw: operationMetadata77,
  mailboxesReply: operationMetadata76,
  mailboxesReplyAll: operationMetadata76,
  mailboxesPause: operationMetadata80,
  mailboxesResume: operationMetadata80,
  mailboxesListScheduledSends: operationMetadata75,
  mailboxesUnscheduleSend: operationMetadata78,
  mailboxesRescheduleSend: operationMetadata79,
  mailboxesSendScheduledNow: operationMetadata80,
  mailboxesEmptySpam: operationMetadata80,
  mailboxesListSpamHeld: operationMetadata75,
  mailboxesDiscardSpamHeld: operationMetadata80,
  mailboxesListThreads: operationMetadata75,
  mailboxesGetThread: operationMetadata77,
  mailboxesDeleteThread: operationMetadata78,
  mailboxesUpdateThread: operationMetadata79,
  mailboxesGetThreadContent: operationMetadata75,
  mailboxesAddThreadLabels: operationMetadata80,
  mailboxesRemoveThreadLabels: operationMetadata78,
  mailboxesListThreadMessages: operationMetadata75,
  mailboxesListThreadNotes: operationMetadata75,
  mailboxesCreateNote: operationMetadata80,
  mailboxesDeleteNote: operationMetadata78,
  mailboxesUpdateNote: operationMetadata79,
  mailboxesEmptyTrash: operationMetadata80,
  mailboxesListOrganizationDrafts: operationMetadata75,
  mailboxesGetNeedsYou: operationMetadata75,
  mailboxesListSplits: operationMetadata77,
  mailboxesCreateSplit: operationMetadata80,
  mailboxesUpdateSplit: operationMetadata81,
  mailboxesDeleteSplit: operationMetadata78,
  mailboxesCountSplits: operationMetadata77,
  mailboxesListOrganizationThreads: operationMetadata75,
  mediaCreate: operationMetadata82,
  mediaGetById: operationMetadata83,
  mediaRemove: operationMetadata84,
  mediaComplete: operationMetadata82,
  mediaDownloadUrl: operationMetadata83,
  messagesList: operationMetadata85,
  messagesSend: operationMetadata86,
  messagesGet: operationMetadata87,
  messagesRemove: operationMetadata88,
  messagesGetContent: operationMetadata87,
  messagesListDeliveries: operationMetadata87,
  messagesGetEmail: operationMetadata87,
  messagesGetEvents: operationMetadata85,
  messagesGetStatus: operationMetadata87,
  scheduledMessagesList: operationMetadata89,
  scheduledMessagesCreate: operationMetadata90,
  scheduledMessagesGet: operationMetadata91,
  scheduledMessagesCancel: operationMetadata92,
  scheduledMessagesResume: operationMetadata92,
  messagesValidateEmail: operationMetadata93,
  namespacesList: operationMetadata94,
  namespacesCreate: operationMetadata95,
  namespacesGet: operationMetadata96,
  namespacesRemove: operationMetadata97,
  namespacesUpdate: operationMetadata98,
  namespacesListPortalLinks: operationMetadata94,
  namespacesCreatePortalLink: operationMetadata95,
  namespacesRevokePortalLink: operationMetadata97,
  namespacesAssignResource: operationMetadata95,
  namespacesRemoveResource: operationMetadata97,
  namespacesGetUsage: operationMetadata96,
  newslettersList: operationMetadata99,
  newslettersCreate: operationMetadata100,
  newslettersGet: operationMetadata99,
  newslettersRemove: operationMetadata101,
  newslettersUpdate: operationMetadata102,
  newsletterDomainsList: operationMetadata103,
  newsletterDomainsAdd: operationMetadata104,
  newsletterDomainsGet: operationMetadata105,
  newsletterDomainsRemove: operationMetadata106,
  newsletterIssuesList: operationMetadata107,
  newsletterIssuesCreate: operationMetadata108,
  newsletterIssuesUpdate: operationMetadata109,
  newsletterIssuesCheck: operationMetadata108,
  newsletterIssuesGet: operationMetadata107,
  newsletterIssuesHead: operationMetadata107,
  newsletterIssuesHistory: operationMetadata107,
  newsletterIssuesRemove: operationMetadata108,
  newsletterIssuesRender: operationMetadata108,
  newsletterIssuesSave: operationMetadata108,
  newsletterIssuesOpen: operationMetadata107,
  operationsList: operationMetadata110,
  operationsGet: operationMetadata111,
  operationsRetry: operationMetadata112,
  organizationsCreate: operationMetadata113,
  organizationsGet: operationMetadata114,
  organizationsUpdate: operationMetadata115,
  organizationsCreateAvatarUpload: operationMetadata113,
  organizationsGetProfile: operationMetadata114,
  organizationsDelete: operationMetadata116,
  organizationsAssignPersonalMailbox: operationMetadata113,
  organizationsInviteMember: operationMetadata113,
  organizationsGetPersonalMailboxAddressOptions: operationMetadata114,
  organizationsListPersonalMailboxAssignments: operationMetadata114,
  organizationsGetTrustTier: operationMetadata114,
  organizationsGetUsage: operationMetadata114,
  policiesGetPolicy: operationMetadata117,
  policiesSetPolicy: operationMetadata118,
  policiesDeletePolicy: operationMetadata119,
  subscriptionsSubscribe: operationMetadata120,
  templateShareLinksGet: operationMetadata121,
  templateShareLinksCreate: operationMetadata122,
  templateShareLinksDelete: operationMetadata123,
  templateShareLinksRename: operationMetadata124,
  templateShareLinksUpdate: operationMetadata122,
  templatesList: operationMetadata125,
  templatesCreate: operationMetadata126,
  templatesGetById: operationMetadata127,
  templatesDelete: operationMetadata128,
  templatesUpdate: operationMetadata129,
  templatesListInputContracts: operationMetadata125,
  templatesGetInputContract: operationMetadata127,
  templatesPublish: operationMetadata130,
  templatesGetPublication: operationMetadata127,
  templatesRenderPublication: operationMetadata130,
  templateRegistrationsList: operationMetadata131,
  templateRegistrationsSubmit: operationMetadata132,
  templateRegistrationsGet: operationMetadata131,
  templatesGetGitRepository: operationMetadata127,
  templatesIssueGitCredential: operationMetadata130,
  templatesOpenWorkspace: operationMetadata130,
  templatesPatchWorkspace: operationMetadata133,
  templatesPutWorkspaceAsset: operationMetadata134,
  templatesCheckWorkspace: operationMetadata130,
  templatesResolveWorkspaceConflict: operationMetadata126,
  templatesDiffWorkspace: operationMetadata130,
  templatesRenderWorkspaceFixture: operationMetadata130,
  templatesWorkspaceHistory: operationMetadata127,
  templatesAttachWorkspaceResource: operationMetadata126,
  templatesRemoveWorkspaceResource: operationMetadata126,
  templatesRestoreWorkspace: operationMetadata126,
  templatesSaveWorkspace: operationMetadata126,
  templatesListFamilies: operationMetadata125,
  templatesCreateFamily: operationMetadata130,
  templatesGetFamily: operationMetadata127,
  templatesDeleteFamily: operationMetadata128,
  templatesRenameFamily: operationMetadata129,
  templatesAttachFamilyMember: operationMetadata130,
  templatesDetachFamilyMember: operationMetadata128,
  templatesCreateFamilyFromTemplate: operationMetadata130,
  templatesCreateFromBrief: operationMetadata126,
  templatesCreateFromWebsite: operationMetadata126,
  templatesDeleteProject: operationMetadata128,
  templatesAddEntry: operationMetadata130,
  templatesSuggestStarters: operationMetadata130,
  topicsList: operationMetadata135,
  topicsCreate: operationMetadata136,
  topicsGet: operationMetadata135,
  topicsRemove: operationMetadata137,
  topicsUpdate: operationMetadata138,
  topicsSetDefault: operationMetadata136,
  topicFormsList: operationMetadata139,
  topicFormsCreate: operationMetadata140,
  topicFormsGet: operationMetadata139,
  topicFormsRemove: operationMetadata141,
  topicFormsUpdate: operationMetadata142,
  topicsListSubscriptions: operationMetadata143,
  topicsSetSubscriptions: operationMetadata136,
  topicsCheckSubscription: operationMetadata135,
  webhooksList: operationMetadata144,
  webhooksCreate: operationMetadata145,
  webhooksGet: operationMetadata146,
  webhooksRemove: operationMetadata147,
  webhooksUpdate: operationMetadata148,
  webhooksRetryDelivery: operationMetadata145,
  webhooksGetLogs: operationMetadata144,
  webhooksRegenerateSecret: operationMetadata145,
  webhooksGetSecret: operationMetadata146,
  webhooksGetStats: operationMetadata146,
  webhooksTest: operationMetadata145,
  whatsappListBusinessAccounts: operationMetadata149,
  whatsappConnectBusinessAccount: operationMetadata150,
  whatsappGetBusinessAccount: operationMetadata151,
  whatsappDisconnectBusinessAccount: operationMetadata152,
  whatsappUpdateBusinessAccount: operationMetadata153,
  whatsappSetDefaultBusinessAccount: operationMetadata150,
  whatsappSyncAccountStatus: operationMetadata150,
  whatsappFlowsList: operationMetadata154,
  whatsappFlowsCreate: operationMetadata155,
  whatsappFlowsGet: operationMetadata154,
  whatsappFlowsSetEndpoint: operationMetadata156,
  whatsappFlowsRotateEndpointSecret: operationMetadata155,
  whatsappFlowsListRegistrations: operationMetadata154,
  whatsappFlowsRegister: operationMetadata155,
  whatsappFlowsListVersions: operationMetadata154,
  whatsappFlowsRecordVersion: operationMetadata155,
  whatsappFlowsRotateEncryptionKey: operationMetadata155,
  whatsappGetMediaDownloadUrl: operationMetadata151,
  whatsappGetServiceWindowBilling: operationMetadata151,
  whatsappGetServiceWindowStatus: operationMetadata151,
  whatsappSetupLinksList: operationMetadata157,
  whatsappSetupLinksCreate: operationMetadata158,
  whatsappSetupLinksGet: operationMetadata159,
  whatsappSetupLinksRevoke: operationMetadata158,
  whatsappGetStats: operationMetadata151,
  whatsappGetTemplateStats: operationMetadata151,
  whoamiGet: operationMetadata160,
} as const;
