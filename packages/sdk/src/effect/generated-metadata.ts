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
  group: "Journeys",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata66 = {
  group: "Journeys",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata67 = {
  group: "Journeys",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata68 = {
  group: "Journeys",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata69 = {
  group: "Journeys",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata70 = {
  group: "Journeys",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata71 = {
  group: "Mailboxes",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata72 = {
  group: "Mailboxes",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata73 = {
  group: "Mailboxes",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata74 = {
  group: "Mailboxes",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata75 = {
  group: "Mailboxes",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata76 = {
  group: "Mailboxes",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata77 = {
  group: "Mailboxes",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata78 = {
  group: "Media",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata79 = {
  group: "Media",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata80 = {
  group: "Media",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata81 = {
  group: "Messages",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata82 = {
  group: "Messages",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata83 = {
  group: "Messages",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata84 = {
  group: "Messages",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata85 = {
  group: "Scheduled Messages",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata86 = {
  group: "Scheduled Messages",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata87 = {
  group: "Scheduled Messages",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata88 = {
  group: "Scheduled Messages",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata89 = {
  group: "Messages",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata90 = {
  group: "Namespaces",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata91 = {
  group: "Namespaces",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata92 = {
  group: "Namespaces",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata93 = {
  group: "Namespaces",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata94 = {
  group: "Namespaces",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata95 = {
  group: "Newsletters",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata96 = {
  group: "Newsletters",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata97 = {
  group: "Newsletters",
  method: "DELETE",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata98 = {
  group: "Newsletters",
  method: "PATCH",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata99 = {
  group: "Newsletter domains",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata100 = {
  group: "Newsletter domains",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata101 = {
  group: "Newsletter domains",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata102 = {
  group: "Newsletter domains",
  method: "DELETE",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata103 = {
  group: "Newsletter issues",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata104 = {
  group: "Newsletter issues",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata105 = {
  group: "Newsletter issues",
  method: "PATCH",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata106 = {
  group: "Operations",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata107 = {
  group: "Operations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata108 = {
  group: "Operations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata109 = {
  group: "Organizations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata110 = {
  group: "Organizations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata111 = {
  group: "Organizations",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata112 = {
  group: "Organizations",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata113 = {
  group: "Policies",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata114 = {
  group: "Policies",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata115 = {
  group: "Policies",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata116 = {
  group: "Subscriptions",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata117 = {
  group: "Template share links",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata118 = {
  group: "Template share links",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata119 = {
  group: "Template share links",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata120 = {
  group: "Template share links",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata121 = {
  group: "Templates",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata122 = {
  group: "Templates",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata123 = {
  group: "Templates",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata124 = {
  group: "Templates",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata125 = {
  group: "Templates",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata126 = {
  group: "Templates",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata127 = {
  group: "Template registrations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata128 = {
  group: "Template registrations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata129 = {
  group: "Templates",
  method: "PATCH",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata130 = {
  group: "Templates",
  method: "PUT",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata131 = {
  group: "Topics",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata132 = {
  group: "Topics",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata133 = {
  group: "Topics",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata134 = {
  group: "Topics",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata135 = {
  group: "Topic forms",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata136 = {
  group: "Topic forms",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata137 = {
  group: "Topic forms",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata138 = {
  group: "Topic forms",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata139 = {
  group: "Topics",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata140 = {
  group: "Webhooks",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata141 = {
  group: "Webhooks",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata142 = {
  group: "Webhooks",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata143 = {
  group: "Webhooks",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata144 = {
  group: "Webhooks",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata145 = {
  group: "WhatsApp",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata146 = {
  group: "WhatsApp",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata147 = {
  group: "WhatsApp",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata148 = {
  group: "WhatsApp",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata149 = {
  group: "WhatsApp flows",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata150 = {
  group: "WhatsApp flows",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata151 = {
  group: "WhatsApp flows",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata152 = {
  group: "WhatsApp setup links",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata153 = {
  group: "WhatsApp setup links",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata154 = {
  group: "WhatsApp setup links",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata155 = {
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
  integrationCatalogSearch: operationMetadata63,
  journeysList: operationMetadata65,
  journeysCreate: operationMetadata66,
  journeysGet: operationMetadata67,
  journeysRemove: operationMetadata68,
  journeysUpdate: operationMetadata69,
  journeysArchive: operationMetadata66,
  journeysReplaceDraft: operationMetadata70,
  journeysPause: operationMetadata66,
  journeysPublish: operationMetadata66,
  journeysResume: operationMetadata66,
  journeysListRuns: operationMetadata65,
  journeysGetRun: operationMetadata67,
  journeysStats: operationMetadata67,
  journeysGetVersion: operationMetadata67,
  mailboxesList: operationMetadata71,
  mailboxesCreate: operationMetadata72,
  mailboxesGet: operationMetadata73,
  mailboxesRemove: operationMetadata74,
  mailboxesUpdate: operationMetadata75,
  mailboxesListActions: operationMetadata71,
  mailboxesGetAction: operationMetadata73,
  mailboxesApproveAction: operationMetadata76,
  mailboxesCancelAction: operationMetadata76,
  mailboxesDenyAction: operationMetadata76,
  mailboxesRetryAction: operationMetadata76,
  mailboxesListAddresses: operationMetadata73,
  mailboxesGetAgentActivity: operationMetadata73,
  mailboxesListDrafts: operationMetadata71,
  mailboxesCreateDraft: operationMetadata76,
  mailboxesGetDraft: operationMetadata73,
  mailboxesDeleteDraft: operationMetadata74,
  mailboxesUpdateDraft: operationMetadata75,
  mailboxesScheduleDraft: operationMetadata76,
  mailboxesSendDraft: operationMetadata72,
  mailboxesCreateEndpoint: operationMetadata76,
  mailboxesRemoveEndpoint: operationMetadata74,
  mailboxesUpdateEndpoint: operationMetadata75,
  mailboxesListEvents: operationMetadata71,
  mailboxesListFolders: operationMetadata73,
  mailboxesListGrants: operationMetadata71,
  mailboxesCreateGrant: operationMetadata76,
  mailboxesRevokeGrant: operationMetadata74,
  mailboxesUpdateGrant: operationMetadata75,
  mailboxesListImports: operationMetadata73,
  mailboxesGetImport: operationMetadata73,
  mailboxesStartImport: operationMetadata76,
  mailboxesCreateImportUpload: operationMetadata76,
  mailboxesListLabels: operationMetadata73,
  mailboxesCreateLabel: operationMetadata76,
  mailboxesDeleteLabel: operationMetadata74,
  mailboxesUpdateLabel: operationMetadata75,
  mailboxesSendMessage: operationMetadata72,
  mailboxesGetMessage: operationMetadata73,
  mailboxesGetMessageAttachment: operationMetadata73,
  mailboxesCopyMessageAttachment: operationMetadata76,
  mailboxesDiscardMessage: operationMetadata76,
  mailboxesForward: operationMetadata72,
  mailboxesGetMessageRaw: operationMetadata73,
  mailboxesReleaseMessage: operationMetadata76,
  mailboxesReply: operationMetadata72,
  mailboxesReplyAll: operationMetadata72,
  mailboxesPause: operationMetadata76,
  mailboxesListQuarantine: operationMetadata71,
  mailboxesResume: operationMetadata76,
  mailboxesListScheduledSends: operationMetadata71,
  mailboxesUnscheduleSend: operationMetadata74,
  mailboxesRescheduleSend: operationMetadata75,
  mailboxesSendScheduledNow: operationMetadata76,
  mailboxesListThreads: operationMetadata71,
  mailboxesGetThread: operationMetadata73,
  mailboxesUpdateThread: operationMetadata75,
  mailboxesGetThreadContent: operationMetadata71,
  mailboxesAddThreadLabels: operationMetadata76,
  mailboxesRemoveThreadLabels: operationMetadata74,
  mailboxesListThreadMessages: operationMetadata71,
  mailboxesListThreadNotes: operationMetadata71,
  mailboxesCreateNote: operationMetadata76,
  mailboxesDeleteNote: operationMetadata74,
  mailboxesUpdateNote: operationMetadata75,
  mailboxesListOrganizationDrafts: operationMetadata71,
  mailboxesGetNeedsYou: operationMetadata71,
  mailboxesListSplits: operationMetadata73,
  mailboxesCreateSplit: operationMetadata76,
  mailboxesUpdateSplit: operationMetadata77,
  mailboxesDeleteSplit: operationMetadata74,
  mailboxesCountSplits: operationMetadata73,
  mailboxesListOrganizationThreads: operationMetadata71,
  mediaCreate: operationMetadata78,
  mediaGetById: operationMetadata79,
  mediaRemove: operationMetadata80,
  mediaComplete: operationMetadata78,
  mediaDownloadUrl: operationMetadata79,
  messagesList: operationMetadata81,
  messagesSend: operationMetadata82,
  messagesGet: operationMetadata83,
  messagesRemove: operationMetadata84,
  messagesGetContent: operationMetadata83,
  messagesListDeliveries: operationMetadata83,
  messagesGetEmail: operationMetadata83,
  messagesGetEvents: operationMetadata81,
  messagesGetStatus: operationMetadata83,
  scheduledMessagesList: operationMetadata85,
  scheduledMessagesCreate: operationMetadata86,
  scheduledMessagesGet: operationMetadata87,
  scheduledMessagesCancel: operationMetadata88,
  scheduledMessagesResume: operationMetadata88,
  messagesValidateEmail: operationMetadata89,
  namespacesList: operationMetadata90,
  namespacesCreate: operationMetadata91,
  namespacesGet: operationMetadata92,
  namespacesRemove: operationMetadata93,
  namespacesUpdate: operationMetadata94,
  namespacesListPortalLinks: operationMetadata90,
  namespacesCreatePortalLink: operationMetadata91,
  namespacesRevokePortalLink: operationMetadata93,
  namespacesAssignResource: operationMetadata91,
  namespacesRemoveResource: operationMetadata93,
  namespacesGetUsage: operationMetadata92,
  newslettersList: operationMetadata95,
  newslettersCreate: operationMetadata96,
  newslettersGet: operationMetadata95,
  newslettersRemove: operationMetadata97,
  newslettersUpdate: operationMetadata98,
  newsletterDomainsList: operationMetadata99,
  newsletterDomainsAdd: operationMetadata100,
  newsletterDomainsGet: operationMetadata101,
  newsletterDomainsRemove: operationMetadata102,
  newsletterIssuesList: operationMetadata103,
  newsletterIssuesCreate: operationMetadata104,
  newsletterIssuesUpdate: operationMetadata105,
  newsletterIssuesCheck: operationMetadata104,
  newsletterIssuesGet: operationMetadata103,
  newsletterIssuesHead: operationMetadata103,
  newsletterIssuesHistory: operationMetadata103,
  newsletterIssuesRemove: operationMetadata104,
  newsletterIssuesRender: operationMetadata104,
  newsletterIssuesSave: operationMetadata104,
  newsletterIssuesOpen: operationMetadata103,
  operationsList: operationMetadata106,
  operationsGet: operationMetadata107,
  operationsRetry: operationMetadata108,
  organizationsCreate: operationMetadata109,
  organizationsGet: operationMetadata110,
  organizationsUpdate: operationMetadata111,
  organizationsCreateAvatarUpload: operationMetadata109,
  organizationsGetProfile: operationMetadata110,
  organizationsDelete: operationMetadata112,
  organizationsAssignPersonalMailbox: operationMetadata109,
  organizationsInviteMember: operationMetadata109,
  organizationsGetPersonalMailboxAddressOptions: operationMetadata110,
  organizationsListPersonalMailboxAssignments: operationMetadata110,
  organizationsGetTrustTier: operationMetadata110,
  organizationsGetUsage: operationMetadata110,
  policiesGetPolicy: operationMetadata113,
  policiesSetPolicy: operationMetadata114,
  policiesDeletePolicy: operationMetadata115,
  subscriptionsSubscribe: operationMetadata116,
  templateShareLinksGet: operationMetadata117,
  templateShareLinksCreate: operationMetadata118,
  templateShareLinksDelete: operationMetadata119,
  templateShareLinksRename: operationMetadata120,
  templateShareLinksUpdate: operationMetadata118,
  templatesList: operationMetadata121,
  templatesCreate: operationMetadata122,
  templatesGetById: operationMetadata123,
  templatesDelete: operationMetadata124,
  templatesUpdate: operationMetadata125,
  templatesListInputContracts: operationMetadata121,
  templatesGetInputContract: operationMetadata123,
  templatesPublish: operationMetadata126,
  templatesGetPublication: operationMetadata123,
  templatesRenderPublication: operationMetadata126,
  templateRegistrationsList: operationMetadata127,
  templateRegistrationsSubmit: operationMetadata128,
  templateRegistrationsGet: operationMetadata127,
  templatesGetGitRepository: operationMetadata123,
  templatesIssueGitCredential: operationMetadata126,
  templatesOpenWorkspace: operationMetadata126,
  templatesPatchWorkspace: operationMetadata129,
  templatesPutWorkspaceAsset: operationMetadata130,
  templatesCheckWorkspace: operationMetadata126,
  templatesResolveWorkspaceConflict: operationMetadata122,
  templatesDiffWorkspace: operationMetadata126,
  templatesRenderWorkspaceFixture: operationMetadata126,
  templatesWorkspaceHistory: operationMetadata123,
  templatesAttachWorkspaceResource: operationMetadata122,
  templatesRemoveWorkspaceResource: operationMetadata122,
  templatesRestoreWorkspace: operationMetadata122,
  templatesSaveWorkspace: operationMetadata122,
  templatesListFamilies: operationMetadata121,
  templatesCreateFamily: operationMetadata126,
  templatesGetFamily: operationMetadata123,
  templatesDeleteFamily: operationMetadata124,
  templatesRenameFamily: operationMetadata125,
  templatesAttachFamilyMember: operationMetadata126,
  templatesDetachFamilyMember: operationMetadata124,
  templatesCreateFamilyFromTemplate: operationMetadata126,
  templatesCreateFromBrief: operationMetadata122,
  templatesCreateFromWebsite: operationMetadata122,
  templatesDeleteProject: operationMetadata124,
  templatesAddEntry: operationMetadata126,
  templatesSuggestStarters: operationMetadata126,
  topicsList: operationMetadata131,
  topicsCreate: operationMetadata132,
  topicsGet: operationMetadata131,
  topicsRemove: operationMetadata133,
  topicsUpdate: operationMetadata134,
  topicsSetDefault: operationMetadata132,
  topicFormsList: operationMetadata135,
  topicFormsCreate: operationMetadata136,
  topicFormsGet: operationMetadata135,
  topicFormsRemove: operationMetadata137,
  topicFormsUpdate: operationMetadata138,
  topicsListSubscriptions: operationMetadata139,
  topicsSetSubscriptions: operationMetadata132,
  topicsCheckSubscription: operationMetadata131,
  webhooksList: operationMetadata140,
  webhooksCreate: operationMetadata141,
  webhooksGet: operationMetadata142,
  webhooksRemove: operationMetadata143,
  webhooksUpdate: operationMetadata144,
  webhooksRetryDelivery: operationMetadata141,
  webhooksGetLogs: operationMetadata140,
  webhooksRegenerateSecret: operationMetadata141,
  webhooksGetSecret: operationMetadata142,
  webhooksGetStats: operationMetadata142,
  webhooksTest: operationMetadata141,
  whatsappListBusinessAccounts: operationMetadata145,
  whatsappConnectBusinessAccount: operationMetadata146,
  whatsappGetBusinessAccount: operationMetadata145,
  whatsappDisconnectBusinessAccount: operationMetadata147,
  whatsappUpdateBusinessAccount: operationMetadata148,
  whatsappSetDefaultBusinessAccount: operationMetadata146,
  whatsappSyncAccountStatus: operationMetadata146,
  whatsappFlowsList: operationMetadata149,
  whatsappFlowsCreate: operationMetadata150,
  whatsappFlowsGet: operationMetadata149,
  whatsappFlowsSetEndpoint: operationMetadata151,
  whatsappFlowsRotateEndpointSecret: operationMetadata150,
  whatsappFlowsListRegistrations: operationMetadata149,
  whatsappFlowsRegister: operationMetadata150,
  whatsappFlowsListVersions: operationMetadata149,
  whatsappFlowsRecordVersion: operationMetadata150,
  whatsappFlowsRotateEncryptionKey: operationMetadata150,
  whatsappGetMediaDownloadUrl: operationMetadata145,
  whatsappGetServiceWindowBilling: operationMetadata145,
  whatsappGetServiceWindowStatus: operationMetadata145,
  whatsappSetupLinksList: operationMetadata152,
  whatsappSetupLinksCreate: operationMetadata153,
  whatsappSetupLinksGet: operationMetadata154,
  whatsappSetupLinksRevoke: operationMetadata153,
  whatsappGetStats: operationMetadata145,
  whatsappGetTemplateStats: operationMetadata145,
  whoamiGet: operationMetadata155,
} as const;
