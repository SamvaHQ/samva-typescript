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
  group: "Journeys",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata67 = {
  group: "Journeys",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata68 = {
  group: "Journeys",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata69 = {
  group: "Journeys",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata70 = {
  group: "Journeys",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata71 = {
  group: "Journeys",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata72 = {
  group: "Mailboxes",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata73 = {
  group: "Mailboxes",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata74 = {
  group: "Mailboxes",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata75 = {
  group: "Mailboxes",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata76 = {
  group: "Mailboxes",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata77 = {
  group: "Mailboxes",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata78 = {
  group: "Mailboxes",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata79 = {
  group: "Media",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata80 = {
  group: "Media",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata81 = {
  group: "Media",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata82 = {
  group: "Messages",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata83 = {
  group: "Messages",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata84 = {
  group: "Messages",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata85 = {
  group: "Messages",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata86 = {
  group: "Scheduled Messages",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata87 = {
  group: "Scheduled Messages",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata88 = {
  group: "Scheduled Messages",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata89 = {
  group: "Scheduled Messages",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata90 = {
  group: "Messages",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata91 = {
  group: "Namespaces",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata92 = {
  group: "Namespaces",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata93 = {
  group: "Namespaces",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata94 = {
  group: "Namespaces",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata95 = {
  group: "Namespaces",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata96 = {
  group: "Newsletters",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata97 = {
  group: "Newsletters",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata98 = {
  group: "Newsletters",
  method: "DELETE",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata99 = {
  group: "Newsletters",
  method: "PATCH",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata100 = {
  group: "Newsletter domains",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata101 = {
  group: "Newsletter domains",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata102 = {
  group: "Newsletter domains",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata103 = {
  group: "Newsletter domains",
  method: "DELETE",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata104 = {
  group: "Newsletter issues",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata105 = {
  group: "Newsletter issues",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata106 = {
  group: "Newsletter issues",
  method: "PATCH",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata107 = {
  group: "Operations",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata108 = {
  group: "Operations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata109 = {
  group: "Operations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata110 = {
  group: "Organizations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata111 = {
  group: "Organizations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata112 = {
  group: "Organizations",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata113 = {
  group: "Organizations",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata114 = {
  group: "Policies",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata115 = {
  group: "Policies",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata116 = {
  group: "Policies",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata117 = {
  group: "Subscriptions",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata118 = {
  group: "Template share links",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata119 = {
  group: "Template share links",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata120 = {
  group: "Template share links",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata121 = {
  group: "Template share links",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata122 = {
  group: "Templates",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata123 = {
  group: "Templates",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata124 = {
  group: "Templates",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata125 = {
  group: "Templates",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata126 = {
  group: "Templates",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata127 = {
  group: "Templates",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata128 = {
  group: "Template registrations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata129 = {
  group: "Template registrations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata130 = {
  group: "Templates",
  method: "PATCH",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata131 = {
  group: "Templates",
  method: "PUT",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata132 = {
  group: "Topics",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata133 = {
  group: "Topics",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata134 = {
  group: "Topics",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata135 = {
  group: "Topics",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata136 = {
  group: "Topic forms",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata137 = {
  group: "Topic forms",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata138 = {
  group: "Topic forms",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata139 = {
  group: "Topic forms",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata140 = {
  group: "Topics",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata141 = {
  group: "Webhooks",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata142 = {
  group: "Webhooks",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata143 = {
  group: "Webhooks",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata144 = {
  group: "Webhooks",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata145 = {
  group: "Webhooks",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata146 = {
  group: "WhatsApp",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata147 = {
  group: "WhatsApp",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata148 = {
  group: "WhatsApp",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata149 = {
  group: "WhatsApp",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata150 = {
  group: "WhatsApp flows",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata151 = {
  group: "WhatsApp flows",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata152 = {
  group: "WhatsApp flows",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata153 = {
  group: "WhatsApp setup links",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata154 = {
  group: "WhatsApp setup links",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata155 = {
  group: "WhatsApp setup links",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata156 = {
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
  integrationsListTools: operationMetadata60,
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
  integrationCatalogSearch: operationMetadata63,
  journeysList: operationMetadata66,
  journeysCreate: operationMetadata67,
  journeysGet: operationMetadata68,
  journeysRemove: operationMetadata69,
  journeysUpdate: operationMetadata70,
  journeysArchive: operationMetadata67,
  journeysReplaceDraft: operationMetadata71,
  journeysPause: operationMetadata67,
  journeysPublish: operationMetadata67,
  journeysResume: operationMetadata67,
  journeysListRuns: operationMetadata66,
  journeysGetRun: operationMetadata68,
  journeysStats: operationMetadata68,
  journeysGetVersion: operationMetadata68,
  mailboxesList: operationMetadata72,
  mailboxesCreate: operationMetadata73,
  mailboxesGet: operationMetadata74,
  mailboxesRemove: operationMetadata75,
  mailboxesUpdate: operationMetadata76,
  mailboxesListActions: operationMetadata72,
  mailboxesGetAction: operationMetadata74,
  mailboxesApproveAction: operationMetadata77,
  mailboxesCancelAction: operationMetadata77,
  mailboxesDenyAction: operationMetadata77,
  mailboxesRetryAction: operationMetadata77,
  mailboxesListAddresses: operationMetadata74,
  mailboxesGetAgentActivity: operationMetadata74,
  mailboxesListDrafts: operationMetadata72,
  mailboxesCreateDraft: operationMetadata77,
  mailboxesGetDraft: operationMetadata74,
  mailboxesDeleteDraft: operationMetadata75,
  mailboxesUpdateDraft: operationMetadata76,
  mailboxesScheduleDraft: operationMetadata77,
  mailboxesSendDraft: operationMetadata73,
  mailboxesCreateEndpoint: operationMetadata77,
  mailboxesRemoveEndpoint: operationMetadata75,
  mailboxesUpdateEndpoint: operationMetadata76,
  mailboxesListEvents: operationMetadata72,
  mailboxesListFolders: operationMetadata74,
  mailboxesListGrants: operationMetadata72,
  mailboxesCreateGrant: operationMetadata77,
  mailboxesRevokeGrant: operationMetadata75,
  mailboxesUpdateGrant: operationMetadata76,
  mailboxesListImports: operationMetadata74,
  mailboxesGetImport: operationMetadata74,
  mailboxesDiscardImport: operationMetadata75,
  mailboxesStartImport: operationMetadata77,
  mailboxesDiscardImportUpload: operationMetadata75,
  mailboxesCompleteImportUpload: operationMetadata77,
  mailboxesSignImportUploadParts: operationMetadata77,
  mailboxesCreateImportUpload: operationMetadata77,
  mailboxesListLabels: operationMetadata74,
  mailboxesCreateLabel: operationMetadata77,
  mailboxesDeleteLabel: operationMetadata75,
  mailboxesUpdateLabel: operationMetadata76,
  mailboxesSendMessage: operationMetadata73,
  mailboxesGetMessage: operationMetadata74,
  mailboxesGetMessageAttachment: operationMetadata74,
  mailboxesCopyMessageAttachment: operationMetadata77,
  mailboxesForward: operationMetadata73,
  mailboxesGetMessageRaw: operationMetadata74,
  mailboxesReply: operationMetadata73,
  mailboxesReplyAll: operationMetadata73,
  mailboxesPause: operationMetadata77,
  mailboxesResume: operationMetadata77,
  mailboxesListScheduledSends: operationMetadata72,
  mailboxesUnscheduleSend: operationMetadata75,
  mailboxesRescheduleSend: operationMetadata76,
  mailboxesSendScheduledNow: operationMetadata77,
  mailboxesEmptySpam: operationMetadata77,
  mailboxesListSpamHeld: operationMetadata72,
  mailboxesDiscardSpamHeld: operationMetadata77,
  mailboxesListThreads: operationMetadata72,
  mailboxesGetThread: operationMetadata74,
  mailboxesDeleteThread: operationMetadata75,
  mailboxesUpdateThread: operationMetadata76,
  mailboxesGetThreadContent: operationMetadata72,
  mailboxesAddThreadLabels: operationMetadata77,
  mailboxesRemoveThreadLabels: operationMetadata75,
  mailboxesListThreadMessages: operationMetadata72,
  mailboxesListThreadNotes: operationMetadata72,
  mailboxesCreateNote: operationMetadata77,
  mailboxesDeleteNote: operationMetadata75,
  mailboxesUpdateNote: operationMetadata76,
  mailboxesEmptyTrash: operationMetadata77,
  mailboxesListOrganizationDrafts: operationMetadata72,
  mailboxesGetNeedsYou: operationMetadata72,
  mailboxesListSplits: operationMetadata74,
  mailboxesCreateSplit: operationMetadata77,
  mailboxesUpdateSplit: operationMetadata78,
  mailboxesDeleteSplit: operationMetadata75,
  mailboxesCountSplits: operationMetadata74,
  mailboxesListOrganizationThreads: operationMetadata72,
  mediaCreate: operationMetadata79,
  mediaGetById: operationMetadata80,
  mediaRemove: operationMetadata81,
  mediaComplete: operationMetadata79,
  mediaDownloadUrl: operationMetadata80,
  messagesList: operationMetadata82,
  messagesSend: operationMetadata83,
  messagesGet: operationMetadata84,
  messagesRemove: operationMetadata85,
  messagesGetContent: operationMetadata84,
  messagesListDeliveries: operationMetadata84,
  messagesGetEmail: operationMetadata84,
  messagesGetEvents: operationMetadata82,
  messagesGetStatus: operationMetadata84,
  scheduledMessagesList: operationMetadata86,
  scheduledMessagesCreate: operationMetadata87,
  scheduledMessagesGet: operationMetadata88,
  scheduledMessagesCancel: operationMetadata89,
  scheduledMessagesResume: operationMetadata89,
  messagesValidateEmail: operationMetadata90,
  namespacesList: operationMetadata91,
  namespacesCreate: operationMetadata92,
  namespacesGet: operationMetadata93,
  namespacesRemove: operationMetadata94,
  namespacesUpdate: operationMetadata95,
  namespacesListPortalLinks: operationMetadata91,
  namespacesCreatePortalLink: operationMetadata92,
  namespacesRevokePortalLink: operationMetadata94,
  namespacesAssignResource: operationMetadata92,
  namespacesRemoveResource: operationMetadata94,
  namespacesGetUsage: operationMetadata93,
  newslettersList: operationMetadata96,
  newslettersCreate: operationMetadata97,
  newslettersGet: operationMetadata96,
  newslettersRemove: operationMetadata98,
  newslettersUpdate: operationMetadata99,
  newsletterDomainsList: operationMetadata100,
  newsletterDomainsAdd: operationMetadata101,
  newsletterDomainsGet: operationMetadata102,
  newsletterDomainsRemove: operationMetadata103,
  newsletterIssuesList: operationMetadata104,
  newsletterIssuesCreate: operationMetadata105,
  newsletterIssuesUpdate: operationMetadata106,
  newsletterIssuesCheck: operationMetadata105,
  newsletterIssuesGet: operationMetadata104,
  newsletterIssuesHead: operationMetadata104,
  newsletterIssuesHistory: operationMetadata104,
  newsletterIssuesRemove: operationMetadata105,
  newsletterIssuesRender: operationMetadata105,
  newsletterIssuesSave: operationMetadata105,
  newsletterIssuesOpen: operationMetadata104,
  operationsList: operationMetadata107,
  operationsGet: operationMetadata108,
  operationsRetry: operationMetadata109,
  organizationsCreate: operationMetadata110,
  organizationsGet: operationMetadata111,
  organizationsUpdate: operationMetadata112,
  organizationsCreateAvatarUpload: operationMetadata110,
  organizationsGetProfile: operationMetadata111,
  organizationsDelete: operationMetadata113,
  organizationsAssignPersonalMailbox: operationMetadata110,
  organizationsInviteMember: operationMetadata110,
  organizationsGetPersonalMailboxAddressOptions: operationMetadata111,
  organizationsListPersonalMailboxAssignments: operationMetadata111,
  organizationsGetTrustTier: operationMetadata111,
  organizationsGetUsage: operationMetadata111,
  policiesGetPolicy: operationMetadata114,
  policiesSetPolicy: operationMetadata115,
  policiesDeletePolicy: operationMetadata116,
  subscriptionsSubscribe: operationMetadata117,
  templateShareLinksGet: operationMetadata118,
  templateShareLinksCreate: operationMetadata119,
  templateShareLinksDelete: operationMetadata120,
  templateShareLinksRename: operationMetadata121,
  templateShareLinksUpdate: operationMetadata119,
  templatesList: operationMetadata122,
  templatesCreate: operationMetadata123,
  templatesGetById: operationMetadata124,
  templatesDelete: operationMetadata125,
  templatesUpdate: operationMetadata126,
  templatesListInputContracts: operationMetadata122,
  templatesGetInputContract: operationMetadata124,
  templatesPublish: operationMetadata127,
  templatesGetPublication: operationMetadata124,
  templatesRenderPublication: operationMetadata127,
  templateRegistrationsList: operationMetadata128,
  templateRegistrationsSubmit: operationMetadata129,
  templateRegistrationsGet: operationMetadata128,
  templatesGetGitRepository: operationMetadata124,
  templatesIssueGitCredential: operationMetadata127,
  templatesOpenWorkspace: operationMetadata127,
  templatesPatchWorkspace: operationMetadata130,
  templatesPutWorkspaceAsset: operationMetadata131,
  templatesCheckWorkspace: operationMetadata127,
  templatesResolveWorkspaceConflict: operationMetadata123,
  templatesDiffWorkspace: operationMetadata127,
  templatesRenderWorkspaceFixture: operationMetadata127,
  templatesWorkspaceHistory: operationMetadata124,
  templatesAttachWorkspaceResource: operationMetadata123,
  templatesRemoveWorkspaceResource: operationMetadata123,
  templatesRestoreWorkspace: operationMetadata123,
  templatesSaveWorkspace: operationMetadata123,
  templatesListFamilies: operationMetadata122,
  templatesCreateFamily: operationMetadata127,
  templatesGetFamily: operationMetadata124,
  templatesDeleteFamily: operationMetadata125,
  templatesRenameFamily: operationMetadata126,
  templatesAttachFamilyMember: operationMetadata127,
  templatesDetachFamilyMember: operationMetadata125,
  templatesCreateFamilyFromTemplate: operationMetadata127,
  templatesCreateFromBrief: operationMetadata123,
  templatesCreateFromWebsite: operationMetadata123,
  templatesDeleteProject: operationMetadata125,
  templatesAddEntry: operationMetadata127,
  templatesSuggestStarters: operationMetadata127,
  topicsList: operationMetadata132,
  topicsCreate: operationMetadata133,
  topicsGet: operationMetadata132,
  topicsRemove: operationMetadata134,
  topicsUpdate: operationMetadata135,
  topicsSetDefault: operationMetadata133,
  topicFormsList: operationMetadata136,
  topicFormsCreate: operationMetadata137,
  topicFormsGet: operationMetadata136,
  topicFormsRemove: operationMetadata138,
  topicFormsUpdate: operationMetadata139,
  topicsListSubscriptions: operationMetadata140,
  topicsSetSubscriptions: operationMetadata133,
  topicsCheckSubscription: operationMetadata132,
  webhooksList: operationMetadata141,
  webhooksCreate: operationMetadata142,
  webhooksGet: operationMetadata143,
  webhooksRemove: operationMetadata144,
  webhooksUpdate: operationMetadata145,
  webhooksRetryDelivery: operationMetadata142,
  webhooksGetLogs: operationMetadata141,
  webhooksRegenerateSecret: operationMetadata142,
  webhooksGetSecret: operationMetadata143,
  webhooksGetStats: operationMetadata143,
  webhooksTest: operationMetadata142,
  whatsappListBusinessAccounts: operationMetadata146,
  whatsappConnectBusinessAccount: operationMetadata147,
  whatsappGetBusinessAccount: operationMetadata146,
  whatsappDisconnectBusinessAccount: operationMetadata148,
  whatsappUpdateBusinessAccount: operationMetadata149,
  whatsappSetDefaultBusinessAccount: operationMetadata147,
  whatsappSyncAccountStatus: operationMetadata147,
  whatsappFlowsList: operationMetadata150,
  whatsappFlowsCreate: operationMetadata151,
  whatsappFlowsGet: operationMetadata150,
  whatsappFlowsSetEndpoint: operationMetadata152,
  whatsappFlowsRotateEndpointSecret: operationMetadata151,
  whatsappFlowsListRegistrations: operationMetadata150,
  whatsappFlowsRegister: operationMetadata151,
  whatsappFlowsListVersions: operationMetadata150,
  whatsappFlowsRecordVersion: operationMetadata151,
  whatsappFlowsRotateEncryptionKey: operationMetadata151,
  whatsappGetMediaDownloadUrl: operationMetadata146,
  whatsappGetServiceWindowBilling: operationMetadata146,
  whatsappGetServiceWindowStatus: operationMetadata146,
  whatsappSetupLinksList: operationMetadata153,
  whatsappSetupLinksCreate: operationMetadata154,
  whatsappSetupLinksGet: operationMetadata155,
  whatsappSetupLinksRevoke: operationMetadata154,
  whatsappGetStats: operationMetadata146,
  whatsappGetTemplateStats: operationMetadata146,
  whoamiGet: operationMetadata156,
} as const;
