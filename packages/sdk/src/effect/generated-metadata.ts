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
  group: "Extension installations",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata58 = {
  group: "Extension installations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata59 = {
  group: "Extension installations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata60 = {
  group: "Extension installations",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata61 = {
  group: "Extensions",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata62 = {
  group: "Extensions",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata63 = {
  group: "Extensions",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata64 = {
  group: "Feedback",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata65 = {
  group: "Integrations",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata66 = {
  group: "Integrations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata67 = {
  group: "Integrations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata68 = {
  group: "Integrations",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata69 = {
  group: "Integrations",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata70 = {
  group: "Integrations catalog",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata71 = {
  group: "Integrations catalog",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata72 = {
  group: "Journeys",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata73 = {
  group: "Journeys",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata74 = {
  group: "Journeys",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata75 = {
  group: "Journeys",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata76 = {
  group: "Journeys",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata77 = {
  group: "Journeys",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata78 = {
  group: "Mailboxes",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata79 = {
  group: "Mailboxes",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata80 = {
  group: "Mailboxes",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata81 = {
  group: "Mailboxes",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata82 = {
  group: "Mailboxes",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata83 = {
  group: "Mailboxes",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata84 = {
  group: "Mailboxes",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata85 = {
  group: "Media",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata86 = {
  group: "Media",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata87 = {
  group: "Media",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata88 = {
  group: "Messages",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata89 = {
  group: "Messages",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata90 = {
  group: "Messages",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata91 = {
  group: "Messages",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata92 = {
  group: "Scheduled Messages",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata93 = {
  group: "Scheduled Messages",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata94 = {
  group: "Scheduled Messages",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata95 = {
  group: "Scheduled Messages",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata96 = {
  group: "Messages",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata97 = {
  group: "Namespaces",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata98 = {
  group: "Namespaces",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata99 = {
  group: "Namespaces",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata100 = {
  group: "Namespaces",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata101 = {
  group: "Namespaces",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata102 = {
  group: "Newsletters",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata103 = {
  group: "Newsletters",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata104 = {
  group: "Newsletters",
  method: "DELETE",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata105 = {
  group: "Newsletters",
  method: "PATCH",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata106 = {
  group: "Newsletter domains",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata107 = {
  group: "Newsletter domains",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata108 = {
  group: "Newsletter domains",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata109 = {
  group: "Newsletter domains",
  method: "DELETE",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata110 = {
  group: "Newsletter issues",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata111 = {
  group: "Newsletter issues",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata112 = {
  group: "Newsletter issues",
  method: "PATCH",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata113 = {
  group: "Operations",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata114 = {
  group: "Operations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata115 = {
  group: "Operations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata116 = {
  group: "Organizations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata117 = {
  group: "Organizations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata118 = {
  group: "Organizations",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata119 = {
  group: "Organizations",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata120 = {
  group: "Policies",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata121 = {
  group: "Policies",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata122 = {
  group: "Policies",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata123 = {
  group: "Subscriptions",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata124 = {
  group: "Template share links",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata125 = {
  group: "Template share links",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata126 = {
  group: "Template share links",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata127 = {
  group: "Template share links",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata128 = {
  group: "Templates",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata129 = {
  group: "Templates",
  method: "POST",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata130 = {
  group: "Templates",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata131 = {
  group: "Templates",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata132 = {
  group: "Templates",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata133 = {
  group: "Templates",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata134 = {
  group: "Template registrations",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata135 = {
  group: "Template registrations",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata136 = {
  group: "Templates",
  method: "PATCH",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata137 = {
  group: "Templates",
  method: "PUT",
  idempotent: true,
  paginated: false,
} as const;

const operationMetadata138 = {
  group: "Topics",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata139 = {
  group: "Topics",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata140 = {
  group: "Topics",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata141 = {
  group: "Topics",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata142 = {
  group: "Topic forms",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata143 = {
  group: "Topic forms",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata144 = {
  group: "Topic forms",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata145 = {
  group: "Topic forms",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata146 = {
  group: "Topics",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata147 = {
  group: "Webhooks",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata148 = {
  group: "Webhooks",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata149 = {
  group: "Webhooks",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata150 = {
  group: "Webhooks",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata151 = {
  group: "Webhooks",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata152 = {
  group: "WhatsApp",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata153 = {
  group: "WhatsApp",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata154 = {
  group: "WhatsApp",
  method: "DELETE",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata155 = {
  group: "WhatsApp",
  method: "PATCH",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata156 = {
  group: "WhatsApp flows",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata157 = {
  group: "WhatsApp flows",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata158 = {
  group: "WhatsApp flows",
  method: "PUT",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata159 = {
  group: "WhatsApp setup links",
  method: "GET",
  idempotent: false,
  paginated: true,
} as const;

const operationMetadata160 = {
  group: "WhatsApp setup links",
  method: "POST",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata161 = {
  group: "WhatsApp setup links",
  method: "GET",
  idempotent: false,
  paginated: false,
} as const;

const operationMetadata162 = {
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
  extensionInstallationsList: operationMetadata57,
  extensionInstallationsInstall: operationMetadata58,
  extensionInstallationsGet: operationMetadata59,
  extensionInstallationsUninstall: operationMetadata60,
  extensionInstallationsDisable: operationMetadata58,
  extensionInstallationsEnable: operationMetadata58,
  extensionInstallationsListRuns: operationMetadata59,
  extensionInstallationsGetRun: operationMetadata59,
  extensionInstallationsUpgrade: operationMetadata58,
  extensionsList: operationMetadata61,
  extensionsPublish: operationMetadata62,
  extensionsGet: operationMetadata63,
  extensionsListVersions: operationMetadata61,
  extensionsGetVersion: operationMetadata63,
  feedbackSend: operationMetadata64,
  integrationsList: operationMetadata65,
  integrationsInstall: operationMetadata66,
  integrationsGet: operationMetadata67,
  integrationsRemove: operationMetadata68,
  integrationsUpdate: operationMetadata69,
  integrationsListTools: operationMetadata67,
  integrationsReadTool: operationMetadata67,
  integrationCatalogList: operationMetadata70,
  integrationCatalogPrepare: operationMetadata71,
  integrationCatalogSearch: operationMetadata70,
  journeysList: operationMetadata72,
  journeysCreate: operationMetadata73,
  journeysGet: operationMetadata74,
  journeysRemove: operationMetadata75,
  journeysUpdate: operationMetadata76,
  journeysArchive: operationMetadata73,
  journeysReplaceDraft: operationMetadata77,
  journeysPause: operationMetadata73,
  journeysPublish: operationMetadata73,
  journeysResume: operationMetadata73,
  journeysListRuns: operationMetadata72,
  journeysGetRun: operationMetadata74,
  journeysStats: operationMetadata74,
  journeysGetVersion: operationMetadata74,
  mailboxesList: operationMetadata78,
  mailboxesCreate: operationMetadata79,
  mailboxesGet: operationMetadata80,
  mailboxesRemove: operationMetadata81,
  mailboxesUpdate: operationMetadata82,
  mailboxesListActions: operationMetadata78,
  mailboxesGetAction: operationMetadata80,
  mailboxesApproveAction: operationMetadata83,
  mailboxesCancelAction: operationMetadata83,
  mailboxesDenyAction: operationMetadata83,
  mailboxesRetryAction: operationMetadata83,
  mailboxesListAddresses: operationMetadata80,
  mailboxesGetAgentActivity: operationMetadata80,
  mailboxesListDrafts: operationMetadata78,
  mailboxesCreateDraft: operationMetadata83,
  mailboxesGetDraft: operationMetadata80,
  mailboxesDeleteDraft: operationMetadata81,
  mailboxesUpdateDraft: operationMetadata82,
  mailboxesScheduleDraft: operationMetadata83,
  mailboxesSendDraft: operationMetadata79,
  mailboxesCreateEndpoint: operationMetadata83,
  mailboxesRemoveEndpoint: operationMetadata81,
  mailboxesUpdateEndpoint: operationMetadata82,
  mailboxesListEvents: operationMetadata78,
  mailboxesListFolders: operationMetadata80,
  mailboxesListGrants: operationMetadata78,
  mailboxesCreateGrant: operationMetadata83,
  mailboxesRevokeGrant: operationMetadata81,
  mailboxesUpdateGrant: operationMetadata82,
  mailboxesListImports: operationMetadata80,
  mailboxesGetImport: operationMetadata80,
  mailboxesStartImport: operationMetadata83,
  mailboxesCreateImportUpload: operationMetadata83,
  mailboxesListLabels: operationMetadata80,
  mailboxesCreateLabel: operationMetadata83,
  mailboxesDeleteLabel: operationMetadata81,
  mailboxesUpdateLabel: operationMetadata82,
  mailboxesSendMessage: operationMetadata79,
  mailboxesGetMessage: operationMetadata80,
  mailboxesGetMessageAttachment: operationMetadata80,
  mailboxesCopyMessageAttachment: operationMetadata83,
  mailboxesDiscardMessage: operationMetadata83,
  mailboxesForward: operationMetadata79,
  mailboxesGetMessageRaw: operationMetadata80,
  mailboxesReleaseMessage: operationMetadata83,
  mailboxesReply: operationMetadata79,
  mailboxesReplyAll: operationMetadata79,
  mailboxesPause: operationMetadata83,
  mailboxesListQuarantine: operationMetadata78,
  mailboxesResume: operationMetadata83,
  mailboxesListScheduledSends: operationMetadata78,
  mailboxesUnscheduleSend: operationMetadata81,
  mailboxesRescheduleSend: operationMetadata82,
  mailboxesSendScheduledNow: operationMetadata83,
  mailboxesListThreads: operationMetadata78,
  mailboxesGetThread: operationMetadata80,
  mailboxesUpdateThread: operationMetadata82,
  mailboxesGetThreadContent: operationMetadata78,
  mailboxesAddThreadLabels: operationMetadata83,
  mailboxesRemoveThreadLabels: operationMetadata81,
  mailboxesListThreadMessages: operationMetadata78,
  mailboxesListThreadNotes: operationMetadata78,
  mailboxesCreateNote: operationMetadata83,
  mailboxesDeleteNote: operationMetadata81,
  mailboxesUpdateNote: operationMetadata82,
  mailboxesListOrganizationDrafts: operationMetadata78,
  mailboxesGetNeedsYou: operationMetadata78,
  mailboxesListSplits: operationMetadata80,
  mailboxesCreateSplit: operationMetadata83,
  mailboxesUpdateSplit: operationMetadata84,
  mailboxesDeleteSplit: operationMetadata81,
  mailboxesCountSplits: operationMetadata80,
  mailboxesListOrganizationThreads: operationMetadata78,
  mediaCreate: operationMetadata85,
  mediaGetById: operationMetadata86,
  mediaRemove: operationMetadata87,
  mediaComplete: operationMetadata85,
  mediaDownloadUrl: operationMetadata86,
  messagesList: operationMetadata88,
  messagesSend: operationMetadata89,
  messagesGet: operationMetadata90,
  messagesRemove: operationMetadata91,
  messagesGetContent: operationMetadata90,
  messagesListDeliveries: operationMetadata90,
  messagesGetEmail: operationMetadata90,
  messagesGetEvents: operationMetadata88,
  messagesGetStatus: operationMetadata90,
  scheduledMessagesList: operationMetadata92,
  scheduledMessagesCreate: operationMetadata93,
  scheduledMessagesGet: operationMetadata94,
  scheduledMessagesCancel: operationMetadata95,
  scheduledMessagesResume: operationMetadata95,
  messagesValidateEmail: operationMetadata96,
  namespacesList: operationMetadata97,
  namespacesCreate: operationMetadata98,
  namespacesGet: operationMetadata99,
  namespacesRemove: operationMetadata100,
  namespacesUpdate: operationMetadata101,
  namespacesListPortalLinks: operationMetadata97,
  namespacesCreatePortalLink: operationMetadata98,
  namespacesRevokePortalLink: operationMetadata100,
  namespacesAssignResource: operationMetadata98,
  namespacesRemoveResource: operationMetadata100,
  namespacesGetUsage: operationMetadata99,
  newslettersList: operationMetadata102,
  newslettersCreate: operationMetadata103,
  newslettersGet: operationMetadata102,
  newslettersRemove: operationMetadata104,
  newslettersUpdate: operationMetadata105,
  newsletterDomainsList: operationMetadata106,
  newsletterDomainsAdd: operationMetadata107,
  newsletterDomainsGet: operationMetadata108,
  newsletterDomainsRemove: operationMetadata109,
  newsletterIssuesList: operationMetadata110,
  newsletterIssuesCreate: operationMetadata111,
  newsletterIssuesUpdate: operationMetadata112,
  newsletterIssuesCheck: operationMetadata111,
  newsletterIssuesGet: operationMetadata110,
  newsletterIssuesHead: operationMetadata110,
  newsletterIssuesHistory: operationMetadata110,
  newsletterIssuesRemove: operationMetadata111,
  newsletterIssuesRender: operationMetadata111,
  newsletterIssuesSave: operationMetadata111,
  newsletterIssuesOpen: operationMetadata110,
  operationsList: operationMetadata113,
  operationsGet: operationMetadata114,
  operationsRetry: operationMetadata115,
  organizationsCreate: operationMetadata116,
  organizationsGet: operationMetadata117,
  organizationsUpdate: operationMetadata118,
  organizationsCreateAvatarUpload: operationMetadata116,
  organizationsGetProfile: operationMetadata117,
  organizationsDelete: operationMetadata119,
  organizationsAssignPersonalMailbox: operationMetadata116,
  organizationsInviteMember: operationMetadata116,
  organizationsGetPersonalMailboxAddressOptions: operationMetadata117,
  organizationsListPersonalMailboxAssignments: operationMetadata117,
  organizationsGetTrustTier: operationMetadata117,
  organizationsGetUsage: operationMetadata117,
  policiesGetPolicy: operationMetadata120,
  policiesSetPolicy: operationMetadata121,
  policiesDeletePolicy: operationMetadata122,
  subscriptionsSubscribe: operationMetadata123,
  templateShareLinksGet: operationMetadata124,
  templateShareLinksCreate: operationMetadata125,
  templateShareLinksDelete: operationMetadata126,
  templateShareLinksRename: operationMetadata127,
  templateShareLinksUpdate: operationMetadata125,
  templatesList: operationMetadata128,
  templatesCreate: operationMetadata129,
  templatesGetById: operationMetadata130,
  templatesDelete: operationMetadata131,
  templatesUpdate: operationMetadata132,
  templatesListInputContracts: operationMetadata128,
  templatesGetInputContract: operationMetadata130,
  templatesPublish: operationMetadata133,
  templatesGetPublication: operationMetadata130,
  templatesRenderPublication: operationMetadata133,
  templateRegistrationsList: operationMetadata134,
  templateRegistrationsSubmit: operationMetadata135,
  templateRegistrationsGet: operationMetadata134,
  templatesGetGitRepository: operationMetadata130,
  templatesIssueGitCredential: operationMetadata133,
  templatesOpenWorkspace: operationMetadata133,
  templatesPatchWorkspace: operationMetadata136,
  templatesPutWorkspaceAsset: operationMetadata137,
  templatesCheckWorkspace: operationMetadata133,
  templatesResolveWorkspaceConflict: operationMetadata129,
  templatesDiffWorkspace: operationMetadata133,
  templatesRenderWorkspaceFixture: operationMetadata133,
  templatesWorkspaceHistory: operationMetadata130,
  templatesAttachWorkspaceResource: operationMetadata129,
  templatesRemoveWorkspaceResource: operationMetadata129,
  templatesRestoreWorkspace: operationMetadata129,
  templatesSaveWorkspace: operationMetadata129,
  templatesListFamilies: operationMetadata128,
  templatesCreateFamily: operationMetadata133,
  templatesGetFamily: operationMetadata130,
  templatesDeleteFamily: operationMetadata131,
  templatesRenameFamily: operationMetadata132,
  templatesAttachFamilyMember: operationMetadata133,
  templatesDetachFamilyMember: operationMetadata131,
  templatesCreateFamilyFromTemplate: operationMetadata133,
  templatesCreateFromBrief: operationMetadata129,
  templatesCreateFromWebsite: operationMetadata129,
  templatesDeleteProject: operationMetadata131,
  templatesAddEntry: operationMetadata133,
  templatesSuggestStarters: operationMetadata133,
  topicsList: operationMetadata138,
  topicsCreate: operationMetadata139,
  topicsGet: operationMetadata138,
  topicsRemove: operationMetadata140,
  topicsUpdate: operationMetadata141,
  topicsSetDefault: operationMetadata139,
  topicFormsList: operationMetadata142,
  topicFormsCreate: operationMetadata143,
  topicFormsGet: operationMetadata142,
  topicFormsRemove: operationMetadata144,
  topicFormsUpdate: operationMetadata145,
  topicsListSubscriptions: operationMetadata146,
  topicsSetSubscriptions: operationMetadata139,
  topicsCheckSubscription: operationMetadata138,
  webhooksList: operationMetadata147,
  webhooksCreate: operationMetadata148,
  webhooksGet: operationMetadata149,
  webhooksRemove: operationMetadata150,
  webhooksUpdate: operationMetadata151,
  webhooksRetryDelivery: operationMetadata148,
  webhooksGetLogs: operationMetadata147,
  webhooksRegenerateSecret: operationMetadata148,
  webhooksGetSecret: operationMetadata149,
  webhooksGetStats: operationMetadata149,
  webhooksTest: operationMetadata148,
  whatsappListBusinessAccounts: operationMetadata152,
  whatsappConnectBusinessAccount: operationMetadata153,
  whatsappGetBusinessAccount: operationMetadata152,
  whatsappDisconnectBusinessAccount: operationMetadata154,
  whatsappUpdateBusinessAccount: operationMetadata155,
  whatsappSetDefaultBusinessAccount: operationMetadata153,
  whatsappSyncAccountStatus: operationMetadata153,
  whatsappFlowsList: operationMetadata156,
  whatsappFlowsCreate: operationMetadata157,
  whatsappFlowsGet: operationMetadata156,
  whatsappFlowsSetEndpoint: operationMetadata158,
  whatsappFlowsRotateEndpointSecret: operationMetadata157,
  whatsappFlowsListRegistrations: operationMetadata156,
  whatsappFlowsRegister: operationMetadata157,
  whatsappFlowsListVersions: operationMetadata156,
  whatsappFlowsRecordVersion: operationMetadata157,
  whatsappFlowsRotateEncryptionKey: operationMetadata157,
  whatsappGetMediaDownloadUrl: operationMetadata152,
  whatsappGetServiceWindowBilling: operationMetadata152,
  whatsappGetServiceWindowStatus: operationMetadata152,
  whatsappSetupLinksList: operationMetadata159,
  whatsappSetupLinksCreate: operationMetadata160,
  whatsappSetupLinksGet: operationMetadata161,
  whatsappSetupLinksRevoke: operationMetadata160,
  whatsappGetStats: operationMetadata152,
  whatsappGetTemplateStats: operationMetadata152,
  whoamiGet: operationMetadata162,
} as const;
