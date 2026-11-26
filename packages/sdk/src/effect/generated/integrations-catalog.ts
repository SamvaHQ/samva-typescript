// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  AccountStatus,
  ApiKeySecurityMiddleware,
  BillingProviderError,
  BrandAddressRequiredError,
  CampaignFooterRequiredError,
  ConflictError,
  DeliveryUnavailableError,
  EmailDomainId,
  EmailSenderId,
  ExternalServiceError,
  ForbiddenError,
  FromAddressRequiredError,
  GatewayTimeoutError,
  IntegrationAccountId,
  IntegrationKey,
  IntegrationStatus,
  InternalError,
  JourneyId,
  JourneyStatus,
  JsonObject,
  MailboxEndpointId,
  MailboxId,
  MalformedRequestError,
  MessageId,
  OnboardingReviewRequiredError,
  PaymentRequiredError,
  RateLimitedError,
  RecipeSetupReferences,
  ResourceNotFoundError,
  SenderNotReadyError,
  TemplateId,
  TemplatePublicationId,
  TemplateRegistrationId,
  TopicId,
  UnauthorizedError,
  ValidationError,
  WhatsAppBusinessAccountId,
} from "./shared";

export type RecipeHandoff = {
  readonly url: string;
  readonly organizationSlug: string;
  readonly setupId: string | null;
};
export const RecipeHandoff = /* @__PURE__ */ (() =>
  Schema.Struct({
    url: Schema.String,
    organizationSlug: Schema.String,
    setupId: Schema.Union([
      Schema.String.annotate({ format: "uuid" }).check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
        }),
      ),
      Schema.Null,
    ]),
  }).annotate({ identifier: "RecipeHandoff" }))();
export type RecipeChallengeStarted = {
  readonly id: string;
  readonly expiresAt: string;
  readonly address: string;
  readonly message: string;
};
export const RecipeChallengeStarted = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: Schema.String.annotate({ format: "uuid" }).check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
      }),
    ),
    expiresAt: Schema.String,
    address: Schema.String,
    message: Schema.String,
  }).annotate({ identifier: "RecipeChallengeStarted" }))();
export type RecipeChallengeStatus = {
  readonly id: string;
  readonly expiresAt: string;
  readonly observedPhone: string | null;
  readonly confirmedAt: string | null;
};
export const RecipeChallengeStatus = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: Schema.String.annotate({ format: "uuid" }).check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
      }),
    ),
    expiresAt: Schema.String,
    observedPhone: Schema.Union([
      Schema.String.check(
        Schema.isPattern(new globalThis.RegExp("^\\+[1-9]\\d{1,14}$", "u")).annotate({
          expected: "a string matching the RegExp ^\\+[1-9]\\d{1,14}$",
        }),
      ),
      Schema.Null,
    ]),
    confirmedAt: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "RecipeChallengeStatus" }))();
export type IntegrationCatalogSearchEntry = {
  readonly key: IntegrationKey;
  readonly kind: "mcp" | "openapi" | "graphql";
  readonly name: string;
  readonly description: string;
  readonly domain: string | null;
  readonly category:
    | "commerce"
    | "payments"
    | "shipping"
    | "calendar"
    | "crm"
    | "helpdesk"
    | "knowledge"
    | "forms"
    | "accounting"
    | "reviews"
    | "productivity"
    | "dns"
    | "channel"
    | "other";
  readonly icon: string | null;
  readonly logo?: { readonly file: string; readonly monochrome?: boolean };
  readonly featured: boolean;
  readonly connectSpec: {
    readonly provider: IntegrationKey;
    readonly auth: "discover" | "oauth" | "none" | "apiKey";
    readonly inputs: {
      readonly [x: string]: {
        readonly label: string;
        readonly description: string;
        readonly pattern: string;
        readonly maxLength: number;
        readonly example: string;
        readonly default?: string;
        readonly kind?: "hostnameLabel" | "httpsUrl";
      };
    };
    readonly credentials: { readonly [x: string]: { readonly label: string } };
  };
  readonly connectState: "ready" | "checkedAtConnect" | "unavailable";
  readonly reason: string | null;
};
export const IntegrationCatalogSearchEntry = /* @__PURE__ */ (() =>
  Schema.Struct({
    key: IntegrationKey,
    kind: Schema.Union([
      Schema.Literal("mcp"),
      Schema.Literal("openapi"),
      Schema.Literal("graphql"),
    ]),
    name: Schema.String,
    description: Schema.String,
    domain: Schema.Union([Schema.String, Schema.Null]),
    category: Schema.Union([
      Schema.Literal("commerce"),
      Schema.Literal("payments"),
      Schema.Literal("shipping"),
      Schema.Literal("calendar"),
      Schema.Literal("crm"),
      Schema.Literal("helpdesk"),
      Schema.Literal("knowledge"),
      Schema.Literal("forms"),
      Schema.Literal("accounting"),
      Schema.Literal("reviews"),
      Schema.Literal("productivity"),
      Schema.Literal("dns"),
      Schema.Literal("channel"),
      Schema.Literal("other"),
    ]),
    icon: Schema.Union([Schema.String, Schema.Null]),
    logo: Schema.optionalKey(
      Schema.Struct({
        file: Schema.String.check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        ).check(
          Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" }),
        ),
        monochrome: Schema.optionalKey(Schema.Boolean),
      }),
    ),
    featured: Schema.Boolean,
    connectSpec: Schema.Struct({
      provider: IntegrationKey,
      auth: Schema.Union([
        Schema.Literal("discover"),
        Schema.Literal("oauth"),
        Schema.Literal("none"),
        Schema.Literal("apiKey"),
      ]),
      inputs: Schema.Record(
        Schema.String,
        Schema.Struct({
          label: Schema.String.check(
            Schema.isMaxCodePoints(256).annotate({
              expected: "a string with at most 256 code points",
            }),
          ).check(
            Schema.isMaxLength(256).annotate({ expected: "a value with a length of at most 256" }),
          ),
          description: Schema.String.check(
            Schema.isMaxCodePoints(2048).annotate({
              expected: "a string with at most 2048 code points",
            }),
          ).check(
            Schema.isMaxLength(2048).annotate({
              expected: "a value with a length of at most 2048",
            }),
          ),
          pattern: Schema.String.check(
            Schema.isMaxCodePoints(512).annotate({
              expected: "a string with at most 512 code points",
            }),
          ).check(
            Schema.isMaxLength(512).annotate({ expected: "a value with a length of at most 512" }),
          ),
          maxLength: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
            .check(
              Schema.isGreaterThanOrEqualTo(1).annotate({
                expected: "a value greater than or equal to 1",
              }),
            )
            .check(
              Schema.isLessThanOrEqualTo(2048).annotate({
                expected: "a value less than or equal to 2048",
              }),
            ),
          example: Schema.String.check(
            Schema.isMaxCodePoints(2048).annotate({
              expected: "a string with at most 2048 code points",
            }),
          ).check(
            Schema.isMaxLength(2048).annotate({
              expected: "a value with a length of at most 2048",
            }),
          ),
          default: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(2048).annotate({
                expected: "a string with at most 2048 code points",
              }),
            ).check(
              Schema.isMaxLength(2048).annotate({
                expected: "a value with a length of at most 2048",
              }),
            ),
          ),
          kind: Schema.optionalKey(
            Schema.Union([Schema.Literal("hostnameLabel"), Schema.Literal("httpsUrl")]),
          ),
        }),
      ).check(
        Schema.isPropertyNames(
          Schema.String.check(
            Schema.isMaxCodePoints(128).annotate({
              expected: "a string with at most 128 code points",
            }),
          ).check(
            Schema.isPattern(new globalThis.RegExp("^[a-zA-Z][a-zA-Z0-9_-]*$", "u")).annotate({
              expected: "a string matching the RegExp ^[a-zA-Z][a-zA-Z0-9_-]*$",
            }),
          ),
        ).annotate({ expected: "an object with property names matching the schema" }),
      ),
      credentials: Schema.Record(Schema.String, Schema.Struct({ label: Schema.String })),
    }),
    connectState: Schema.Union([
      Schema.Literal("ready"),
      Schema.Literal("checkedAtConnect"),
      Schema.Literal("unavailable"),
    ]),
    reason: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "IntegrationCatalogSearchEntry" }))();
export type RecipeCatalogResponse = {
  readonly recipes: ReadonlyArray<{
    readonly id: "post-delivery-check-in";
    readonly title: string;
    readonly trigger:
      | "shopify.order_created"
      | "shopify.order_fulfilled"
      | "shopify.order_delivered"
      | "shopify.refund_created"
      | "shopify.checkout_started";
    readonly stopEvent:
      | "shopify.order_created"
      | "shopify.order_fulfilled"
      | "shopify.order_delivered"
      | "shopify.refund_created"
      | "shopify.checkout_started";
    readonly waitDays: number;
    readonly channels: ReadonlyArray<"email" | "whatsapp">;
  }>;
  readonly events: ReadonlyArray<{
    readonly event:
      | "shopify.order_created"
      | "shopify.order_fulfilled"
      | "shopify.order_delivered"
      | "shopify.refund_created"
      | "shopify.checkout_started";
    readonly version: number;
    readonly producer: string;
    readonly schema: JsonObject;
    readonly paths: ReadonlyArray<{ readonly path: string; readonly mayBeEmpty: boolean }>;
    readonly samples: ReadonlyArray<{
      readonly fixture: string;
      readonly label: string;
      readonly properties: JsonObject;
    }>;
  }>;
};
export const RecipeCatalogResponse = /* @__PURE__ */ (() =>
  Schema.Struct({
    recipes: Schema.Array(
      Schema.Struct({
        id: Schema.Literal("post-delivery-check-in"),
        title: Schema.String,
        trigger: Schema.Union([
          Schema.Literal("shopify.order_created"),
          Schema.Literal("shopify.order_fulfilled"),
          Schema.Literal("shopify.order_delivered"),
          Schema.Literal("shopify.refund_created"),
          Schema.Literal("shopify.checkout_started"),
        ]),
        stopEvent: Schema.Union([
          Schema.Literal("shopify.order_created"),
          Schema.Literal("shopify.order_fulfilled"),
          Schema.Literal("shopify.order_delivered"),
          Schema.Literal("shopify.refund_created"),
          Schema.Literal("shopify.checkout_started"),
        ]),
        waitDays: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
          .check(
            Schema.isGreaterThanOrEqualTo(-9007199254740991).annotate({
              expected: "a value greater than or equal to -9007199254740991",
            }),
          )
          .check(
            Schema.isLessThanOrEqualTo(9007199254740991).annotate({
              expected: "a value less than or equal to 9007199254740991",
            }),
          ),
        channels: Schema.Array(Schema.Union([Schema.Literal("email"), Schema.Literal("whatsapp")])),
      }),
    ),
    events: Schema.Array(
      Schema.Struct({
        event: Schema.Union([
          Schema.Literal("shopify.order_created"),
          Schema.Literal("shopify.order_fulfilled"),
          Schema.Literal("shopify.order_delivered"),
          Schema.Literal("shopify.refund_created"),
          Schema.Literal("shopify.checkout_started"),
        ]),
        version: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
          .check(
            Schema.isGreaterThanOrEqualTo(-9007199254740991).annotate({
              expected: "a value greater than or equal to -9007199254740991",
            }),
          )
          .check(
            Schema.isLessThanOrEqualTo(9007199254740991).annotate({
              expected: "a value less than or equal to 9007199254740991",
            }),
          ),
        producer: Schema.String,
        schema: JsonObject,
        paths: Schema.Array(Schema.Struct({ path: Schema.String, mayBeEmpty: Schema.Boolean })),
        samples: Schema.Array(
          Schema.Struct({ fixture: Schema.String, label: Schema.String, properties: JsonObject }),
        ),
      }),
    ),
  }).annotate({ identifier: "RecipeCatalogResponse" }))();
export type RecipeTestResponse = { readonly messageId: MessageId };
export const RecipeTestResponse = /* @__PURE__ */ (() =>
  Schema.Struct({ messageId: MessageId }).annotate({ identifier: "RecipeTestResponse" }))();
export type RecipeTestReceipt = {
  readonly messageId: MessageId;
  readonly state: "queued" | "unresolved" | "rejected";
};
export const RecipeTestReceipt = /* @__PURE__ */ (() =>
  Schema.Struct({
    messageId: MessageId,
    state: Schema.Union([
      Schema.Literal("queued"),
      Schema.Literal("unresolved"),
      Schema.Literal("rejected"),
    ]),
  }).annotate({ identifier: "RecipeTestReceipt" }))();
export type RecipePreviewResponse =
  | {
      readonly fixture: string;
      readonly publicationId: TemplatePublicationId;
      readonly channel: "email";
      readonly content: {
        readonly subject: string;
        readonly preheader?: string;
        readonly html: string;
        readonly text: string;
      };
    }
  | {
      readonly fixture: string;
      readonly publicationId: TemplatePublicationId;
      readonly channel: "whatsapp";
      readonly content: JsonObject;
    };
export const RecipePreviewResponse = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Struct({
      fixture: Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(100).annotate({
            expected: "a string with at most 100 code points",
          }),
        )
        .check(
          Schema.isMaxLength(100).annotate({ expected: "a value with a length of at most 100" }),
        ),
      publicationId: TemplatePublicationId,
      channel: Schema.Literal("email"),
      content: Schema.Struct({
        subject: Schema.String,
        preheader: Schema.optionalKey(Schema.String),
        html: Schema.String.check(
          Schema.isMaxCodePoints(2097152).annotate({
            expected: "a string with at most 2097152 code points",
          }),
        ).check(
          Schema.isMaxLength(2097152).annotate({
            expected: "a value with a length of at most 2097152",
          }),
        ),
        text: Schema.String.check(
          Schema.isMaxCodePoints(2097152).annotate({
            expected: "a string with at most 2097152 code points",
          }),
        ).check(
          Schema.isMaxLength(2097152).annotate({
            expected: "a value with a length of at most 2097152",
          }),
        ),
      }),
    }),
    Schema.Struct({
      fixture: Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(100).annotate({
            expected: "a string with at most 100 code points",
          }),
        )
        .check(
          Schema.isMaxLength(100).annotate({ expected: "a value with a length of at most 100" }),
        ),
      publicationId: TemplatePublicationId,
      channel: Schema.Literal("whatsapp"),
      content: JsonObject,
    }),
  ]).annotate({ identifier: "RecipePreviewResponse" }))();
export type IntegrationCatalogConnection = {
  readonly id: string;
  readonly account: string | null;
  readonly status: IntegrationStatus;
};
export const IntegrationCatalogConnection = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: Schema.String,
    account: Schema.Union([Schema.String, Schema.Null]),
    status: IntegrationStatus,
  }).annotate({ identifier: "IntegrationCatalogConnection" }))();
export type RecipeReadinessResponse = {
  readonly ready: boolean;
  readonly channel: "email" | "whatsapp";
  readonly availability: { readonly plan: "granted" | "denied" | "unreachable" | null };
  readonly shopify: {
    readonly id: IntegrationAccountId;
    readonly status: AccountStatus;
    readonly shop: string;
  } | null;
  readonly publication: {
    readonly id: TemplatePublicationId;
    readonly templateId: TemplateId;
    readonly parameters?: ReadonlyArray<{ readonly name: string; readonly required: boolean }>;
    readonly inputIssues?: ReadonlyArray<string>;
  } | null;
  readonly email: {
    readonly senderId: EmailSenderId | null;
    readonly domainId: EmailDomainId | null;
    readonly address: string;
    readonly status: "ready" | "unverified" | "inactive";
  } | null;
  readonly whatsapp: {
    readonly accountId: WhatsAppBusinessAccountId;
    readonly address: string;
    readonly status: "ready" | "reconnect" | "unverified" | "inactive";
    readonly registration: {
      readonly id: TemplateRegistrationId;
      readonly status: "draft" | "submitted" | "approved" | "rejected" | "paused" | "disabled";
    } | null;
  } | null;
  readonly reply: {
    readonly endpointId: MailboxEndpointId;
    readonly mailboxId: MailboxId;
    readonly address: string;
    readonly status: "ready" | "inactive" | "different_account";
  } | null;
};
export const RecipeReadinessResponse = /* @__PURE__ */ (() =>
  Schema.Struct({
    ready: Schema.Boolean,
    channel: Schema.Union([Schema.Literal("email"), Schema.Literal("whatsapp")]),
    availability: Schema.Struct({
      plan: Schema.Union([
        Schema.Union([
          Schema.Literal("granted"),
          Schema.Literal("denied"),
          Schema.Literal("unreachable"),
        ]),
        Schema.Null,
      ]),
    }),
    shopify: Schema.Union([
      Schema.Struct({ id: IntegrationAccountId, status: AccountStatus, shop: Schema.String }),
      Schema.Null,
    ]),
    publication: Schema.Union([
      Schema.Struct({
        id: TemplatePublicationId,
        templateId: TemplateId,
        parameters: Schema.optionalKey(
          Schema.Array(Schema.Struct({ name: Schema.String, required: Schema.Boolean })).annotate({
            description:
              "Top-level inputs of the selected email publication or approved WhatsApp registration.",
          }),
        ),
        inputIssues: Schema.optionalKey(
          Schema.Array(Schema.String).annotate({
            description:
              "Email input diagnostics and guidance when the journey cannot fill this publication.",
          }),
        ),
      }),
      Schema.Null,
    ]),
    email: Schema.Union([
      Schema.Struct({
        senderId: Schema.Union([EmailSenderId, Schema.Null]),
        domainId: Schema.Union([EmailDomainId, Schema.Null]),
        address: Schema.String,
        status: Schema.Union([
          Schema.Literal("ready"),
          Schema.Literal("unverified"),
          Schema.Literal("inactive"),
        ]),
      }),
      Schema.Null,
    ]),
    whatsapp: Schema.Union([
      Schema.Struct({
        accountId: WhatsAppBusinessAccountId,
        address: Schema.String,
        status: Schema.Union([
          Schema.Literal("ready"),
          Schema.Literal("reconnect"),
          Schema.Literal("unverified"),
          Schema.Literal("inactive"),
        ]),
        registration: Schema.Union([
          Schema.Struct({
            id: TemplateRegistrationId,
            status: Schema.Union([
              Schema.Literal("draft"),
              Schema.Literal("submitted"),
              Schema.Literal("approved"),
              Schema.Literal("rejected"),
              Schema.Literal("paused"),
              Schema.Literal("disabled"),
            ]),
          }),
          Schema.Null,
        ]),
      }),
      Schema.Null,
    ]),
    reply: Schema.Union([
      Schema.Struct({
        endpointId: MailboxEndpointId,
        mailboxId: MailboxId,
        address: Schema.String,
        status: Schema.Union([
          Schema.Literal("ready"),
          Schema.Literal("inactive"),
          Schema.Literal("different_account"),
        ]),
      }),
      Schema.Null,
    ]),
  }).annotate({ identifier: "RecipeReadinessResponse" }))();
export type IntegrationCatalogSearchPage = {
  readonly items: ReadonlyArray<IntegrationCatalogSearchEntry>;
  readonly nextCursor: string | null;
};
export const IntegrationCatalogSearchPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(IntegrationCatalogSearchEntry),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "IntegrationCatalogSearchPage" }))();
export type IntegrationCatalogEntry = {
  readonly id: string;
  readonly name: string;
  readonly category:
    | "commerce"
    | "payments"
    | "shipping"
    | "calendar"
    | "crm"
    | "helpdesk"
    | "knowledge"
    | "forms"
    | "accounting"
    | "reviews"
    | "productivity"
    | "dns"
    | "channel"
    | "other";
  readonly blurb: string;
  readonly connect: "account" | "dns" | "channelLink";
  readonly inviteOnly?: string;
  readonly app?: IntegrationKey | null;
  readonly href?: "/whatsapp" | null;
  readonly connections: ReadonlyArray<IntegrationCatalogConnection>;
  readonly usedBy: { readonly agents: number; readonly journeys: number };
};
export const IntegrationCatalogEntry = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: Schema.String.check(
      Schema.isMaxCodePoints(64).annotate({ expected: "a string with at most 64 code points" }),
    ).check(Schema.isMaxLength(64).annotate({ expected: "a value with a length of at most 64" })),
    name: Schema.String,
    category: Schema.Union([
      Schema.Literal("commerce"),
      Schema.Literal("payments"),
      Schema.Literal("shipping"),
      Schema.Literal("calendar"),
      Schema.Literal("crm"),
      Schema.Literal("helpdesk"),
      Schema.Literal("knowledge"),
      Schema.Literal("forms"),
      Schema.Literal("accounting"),
      Schema.Literal("reviews"),
      Schema.Literal("productivity"),
      Schema.Literal("dns"),
      Schema.Literal("channel"),
      Schema.Literal("other"),
    ]),
    blurb: Schema.String,
    connect: Schema.Union([
      Schema.Literal("account"),
      Schema.Literal("dns"),
      Schema.Literal("channelLink"),
    ]),
    inviteOnly: Schema.optionalKey(Schema.String),
    app: Schema.optionalKey(Schema.Union([IntegrationKey, Schema.Null])),
    href: Schema.optionalKey(Schema.Union([Schema.Literal("/whatsapp"), Schema.Null])),
    connections: Schema.Array(IntegrationCatalogConnection),
    usedBy: Schema.Struct({
      agents: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        )
        .check(
          Schema.isLessThanOrEqualTo(9007199254740991).annotate({
            expected: "a value less than or equal to 9007199254740991",
          }),
        ),
      journeys: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        )
        .check(
          Schema.isLessThanOrEqualTo(9007199254740991).annotate({
            expected: "a value less than or equal to 9007199254740991",
          }),
        ),
    }),
  }).annotate({ identifier: "IntegrationCatalogEntry" }))();
export type RecipeSetup = {
  readonly id: string;
  readonly revision: string;
  readonly references: RecipeSetupReferences;
  readonly updatedAt: string;
};
export const RecipeSetup = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: Schema.String.annotate({ format: "uuid" }).check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
      }),
    ),
    revision: Schema.String.annotate({ format: "uuid" }).check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
      }),
    ),
    references: RecipeSetupReferences,
    updatedAt: Schema.String,
  }).annotate({ identifier: "RecipeSetup" }))();
export type IntegrationCatalogResponse = {
  readonly entries: ReadonlyArray<IntegrationCatalogEntry>;
};
export const IntegrationCatalogResponse = /* @__PURE__ */ (() =>
  Schema.Struct({ entries: Schema.Array(IntegrationCatalogEntry) }).annotate({
    identifier: "IntegrationCatalogResponse",
  }))();
export type RecipeSetups = { readonly items: ReadonlyArray<RecipeSetup> };
export const RecipeSetups = /* @__PURE__ */ (() =>
  Schema.Struct({ items: Schema.Array(RecipeSetup) }).annotate({ identifier: "RecipeSetups" }))();
export type ActivatedRecipeSetup = {
  readonly setup: RecipeSetup;
  readonly journey: {
    readonly id: JourneyId;
    readonly status: JourneyStatus;
    readonly publishedVersion: number;
  };
};
export const ActivatedRecipeSetup = /* @__PURE__ */ (() =>
  Schema.Struct({
    setup: RecipeSetup,
    journey: Schema.Struct({
      id: JourneyId,
      status: JourneyStatus,
      publishedVersion: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(-9007199254740991).annotate({
            expected: "a value greater than or equal to -9007199254740991",
          }),
        )
        .check(
          Schema.isLessThanOrEqualTo(9007199254740991).annotate({
            expected: "a value less than or equal to 9007199254740991",
          }),
        ),
    }),
  }).annotate({ identifier: "ActivatedRecipeSetup" }))();
export type IntegrationCatalogList200 = IntegrationCatalogResponse;
export const IntegrationCatalogList200 = IntegrationCatalogResponse;
export type IntegrationCatalogList400 = MalformedRequestError;
export const IntegrationCatalogList400 = MalformedRequestError;
export type IntegrationCatalogList401 = UnauthorizedError;
export const IntegrationCatalogList401 = UnauthorizedError;
export type IntegrationCatalogList403 = ForbiddenError;
export const IntegrationCatalogList403 = ForbiddenError;
export type IntegrationCatalogList422 = ValidationError;
export const IntegrationCatalogList422 = ValidationError;
export type IntegrationCatalogList500 = InternalError;
export const IntegrationCatalogList500 = InternalError;
export type IntegrationCatalogList504 = GatewayTimeoutError;
export const IntegrationCatalogList504 = GatewayTimeoutError;
export type IntegrationCatalogPrepareRequestJson = {
  readonly provider: IntegrationKey;
  readonly input?: JsonObject;
};
export const IntegrationCatalogPrepareRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ provider: IntegrationKey, input: Schema.optionalKey(JsonObject) }))();
export type IntegrationCatalogPrepare200 = {
  readonly connectSpec: {
    readonly provider: IntegrationKey;
    readonly auth: "discover" | "oauth" | "none" | "apiKey";
    readonly inputs: {
      readonly [x: string]: {
        readonly label: string;
        readonly description: string;
        readonly pattern: string;
        readonly maxLength: number;
        readonly example: string;
        readonly default?: string;
        readonly kind?: "hostnameLabel" | "httpsUrl";
      };
    };
    readonly credentials: { readonly [x: string]: { readonly label: string } };
  };
  readonly hosts: ReadonlyArray<string>;
  readonly connectState: "ready" | "checkedAtConnect" | "unavailable";
  readonly reason: string | null;
};
export const IntegrationCatalogPrepare200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    connectSpec: Schema.Struct({
      provider: IntegrationKey,
      auth: Schema.Union([
        Schema.Literal("discover"),
        Schema.Literal("oauth"),
        Schema.Literal("none"),
        Schema.Literal("apiKey"),
      ]),
      inputs: Schema.Record(
        Schema.String,
        Schema.Struct({
          label: Schema.String.check(
            Schema.isMaxCodePoints(256).annotate({
              expected: "a string with at most 256 code points",
            }),
          ).check(
            Schema.isMaxLength(256).annotate({ expected: "a value with a length of at most 256" }),
          ),
          description: Schema.String.check(
            Schema.isMaxCodePoints(2048).annotate({
              expected: "a string with at most 2048 code points",
            }),
          ).check(
            Schema.isMaxLength(2048).annotate({
              expected: "a value with a length of at most 2048",
            }),
          ),
          pattern: Schema.String.check(
            Schema.isMaxCodePoints(512).annotate({
              expected: "a string with at most 512 code points",
            }),
          ).check(
            Schema.isMaxLength(512).annotate({ expected: "a value with a length of at most 512" }),
          ),
          maxLength: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
            .check(
              Schema.isGreaterThanOrEqualTo(1).annotate({
                expected: "a value greater than or equal to 1",
              }),
            )
            .check(
              Schema.isLessThanOrEqualTo(2048).annotate({
                expected: "a value less than or equal to 2048",
              }),
            ),
          example: Schema.String.check(
            Schema.isMaxCodePoints(2048).annotate({
              expected: "a string with at most 2048 code points",
            }),
          ).check(
            Schema.isMaxLength(2048).annotate({
              expected: "a value with a length of at most 2048",
            }),
          ),
          default: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(2048).annotate({
                expected: "a string with at most 2048 code points",
              }),
            ).check(
              Schema.isMaxLength(2048).annotate({
                expected: "a value with a length of at most 2048",
              }),
            ),
          ),
          kind: Schema.optionalKey(
            Schema.Union([Schema.Literal("hostnameLabel"), Schema.Literal("httpsUrl")]),
          ),
        }),
      ).check(
        Schema.isPropertyNames(
          Schema.String.check(
            Schema.isMaxCodePoints(128).annotate({
              expected: "a string with at most 128 code points",
            }),
          ).check(
            Schema.isPattern(new globalThis.RegExp("^[a-zA-Z][a-zA-Z0-9_-]*$", "u")).annotate({
              expected: "a string matching the RegExp ^[a-zA-Z][a-zA-Z0-9_-]*$",
            }),
          ),
        ).annotate({ expected: "an object with property names matching the schema" }),
      ),
      credentials: Schema.Record(Schema.String, Schema.Struct({ label: Schema.String })),
    }),
    hosts: Schema.Array(Schema.String),
    connectState: Schema.Union([
      Schema.Literal("ready"),
      Schema.Literal("checkedAtConnect"),
      Schema.Literal("unavailable"),
    ]),
    reason: Schema.Union([Schema.String, Schema.Null]),
  }))();
export type IntegrationCatalogPrepare400 = MalformedRequestError;
export const IntegrationCatalogPrepare400 = MalformedRequestError;
export type IntegrationCatalogPrepare401 = UnauthorizedError;
export const IntegrationCatalogPrepare401 = UnauthorizedError;
export type IntegrationCatalogPrepare403 = ForbiddenError;
export const IntegrationCatalogPrepare403 = ForbiddenError;
export type IntegrationCatalogPrepare422 = ValidationError;
export const IntegrationCatalogPrepare422 = ValidationError;
export type IntegrationCatalogPrepare500 = InternalError;
export const IntegrationCatalogPrepare500 = InternalError;
export type IntegrationCatalogPrepare504 = GatewayTimeoutError;
export const IntegrationCatalogPrepare504 = GatewayTimeoutError;
export type IntegrationCatalogRecipeCatalog200 = RecipeCatalogResponse;
export const IntegrationCatalogRecipeCatalog200 = RecipeCatalogResponse;
export type IntegrationCatalogRecipeCatalog400 = MalformedRequestError;
export const IntegrationCatalogRecipeCatalog400 = MalformedRequestError;
export type IntegrationCatalogRecipeCatalog401 = UnauthorizedError;
export const IntegrationCatalogRecipeCatalog401 = UnauthorizedError;
export type IntegrationCatalogRecipeCatalog403 = ForbiddenError;
export const IntegrationCatalogRecipeCatalog403 = ForbiddenError;
export type IntegrationCatalogRecipeCatalog422 = ValidationError;
export const IntegrationCatalogRecipeCatalog422 = ValidationError;
export type IntegrationCatalogRecipeCatalog500 = InternalError;
export const IntegrationCatalogRecipeCatalog500 = InternalError;
export type IntegrationCatalogRecipeCatalog504 = GatewayTimeoutError;
export const IntegrationCatalogRecipeCatalog504 = GatewayTimeoutError;
export type IntegrationCatalogRecipeConnectionHandoffPathParams = {
  readonly provider: "shopify" | "whatsapp";
};
export const IntegrationCatalogRecipeConnectionHandoffPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    provider: Schema.Union([Schema.Literal("shopify"), Schema.Literal("whatsapp")]),
  }))();
export type IntegrationCatalogRecipeConnectionHandoffQuery = {
  readonly integrationAccountId?: IntegrationAccountId;
  readonly whatsappAccountId?: WhatsAppBusinessAccountId;
  readonly setupId?: string;
};
export const IntegrationCatalogRecipeConnectionHandoffQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    integrationAccountId: Schema.optionalKey(IntegrationAccountId),
    whatsappAccountId: Schema.optionalKey(WhatsAppBusinessAccountId),
    setupId: Schema.optionalKey(
      Schema.String.annotate({ format: "uuid" }).check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
        }),
      ),
    ),
  }))();
export type IntegrationCatalogRecipeConnectionHandoff200 = RecipeHandoff;
export const IntegrationCatalogRecipeConnectionHandoff200 = RecipeHandoff;
export type IntegrationCatalogRecipeConnectionHandoff400 = MalformedRequestError;
export const IntegrationCatalogRecipeConnectionHandoff400 = MalformedRequestError;
export type IntegrationCatalogRecipeConnectionHandoff401 = UnauthorizedError;
export const IntegrationCatalogRecipeConnectionHandoff401 = UnauthorizedError;
export type IntegrationCatalogRecipeConnectionHandoff403 = ForbiddenError;
export const IntegrationCatalogRecipeConnectionHandoff403 = ForbiddenError;
export type IntegrationCatalogRecipeConnectionHandoff404 = ResourceNotFoundError;
export const IntegrationCatalogRecipeConnectionHandoff404 = ResourceNotFoundError;
export type IntegrationCatalogRecipeConnectionHandoff422 = ValidationError;
export const IntegrationCatalogRecipeConnectionHandoff422 = ValidationError;
export type IntegrationCatalogRecipeConnectionHandoff500 = InternalError;
export const IntegrationCatalogRecipeConnectionHandoff500 = InternalError;
export type IntegrationCatalogRecipeConnectionHandoff504 = GatewayTimeoutError;
export const IntegrationCatalogRecipeConnectionHandoff504 = GatewayTimeoutError;
export type IntegrationCatalogRecipeTestRequestJson =
  | {
      readonly templateId: TemplateId;
      readonly publicationId: TemplatePublicationId;
      readonly fixture?: string;
      readonly templateData?: JsonObject;
      readonly channel: "email";
      readonly requestId: string;
      readonly mailboxEndpointId: MailboxEndpointId;
      readonly topicId?: TopicId;
      readonly senderId?: EmailSenderId;
    }
  | {
      readonly templateId: TemplateId;
      readonly publicationId: TemplatePublicationId;
      readonly fixture?: string;
      readonly templateData?: JsonObject;
      readonly channel: "whatsapp";
      readonly eventBindings?: { readonly [x: string]: string };
      readonly requestId: string;
      readonly mailboxEndpointId: MailboxEndpointId;
      readonly topicId?: TopicId;
      readonly businessAccountId: WhatsAppBusinessAccountId;
      readonly registrationId: TemplateRegistrationId;
      readonly challengeId: string;
    };
export const IntegrationCatalogRecipeTestRequestJson = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Struct({
      templateId: TemplateId,
      publicationId: TemplatePublicationId,
      fixture: Schema.optionalKey(
        Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        )
          .check(
            Schema.isMaxCodePoints(100).annotate({
              expected: "a string with at most 100 code points",
            }),
          )
          .check(
            Schema.isMaxLength(100).annotate({ expected: "a value with a length of at most 100" }),
          ),
      ),
      templateData: Schema.optionalKey(JsonObject),
      channel: Schema.Literal("email"),
      requestId: Schema.String.annotate({ format: "uuid" }).check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
        }),
      ),
      mailboxEndpointId: MailboxEndpointId,
      topicId: Schema.optionalKey(TopicId),
      senderId: Schema.optionalKey(EmailSenderId),
    }),
    Schema.Struct({
      templateId: TemplateId,
      publicationId: TemplatePublicationId,
      fixture: Schema.optionalKey(
        Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        )
          .check(
            Schema.isMaxCodePoints(100).annotate({
              expected: "a string with at most 100 code points",
            }),
          )
          .check(
            Schema.isMaxLength(100).annotate({ expected: "a value with a length of at most 100" }),
          ),
      ),
      templateData: Schema.optionalKey(JsonObject),
      channel: Schema.Literal("whatsapp"),
      eventBindings: Schema.optionalKey(
        Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(160).annotate({
              expected: "a string with at most 160 code points",
            }),
          ).check(
            Schema.isMaxLength(160).annotate({ expected: "a value with a length of at most 160" }),
          ),
        ),
      ),
      requestId: Schema.String.annotate({ format: "uuid" }).check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
        }),
      ),
      mailboxEndpointId: MailboxEndpointId,
      topicId: Schema.optionalKey(TopicId),
      businessAccountId: WhatsAppBusinessAccountId,
      registrationId: TemplateRegistrationId,
      challengeId: Schema.String.annotate({ format: "uuid" }).check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
        }),
      ),
    }),
  ]))();
export type IntegrationCatalogRecipeTest200 = RecipeTestResponse;
export const IntegrationCatalogRecipeTest200 = RecipeTestResponse;
export type IntegrationCatalogRecipeTest400 = MalformedRequestError;
export const IntegrationCatalogRecipeTest400 = MalformedRequestError;
export type IntegrationCatalogRecipeTest401 = UnauthorizedError;
export const IntegrationCatalogRecipeTest401 = UnauthorizedError;
export type IntegrationCatalogRecipeTest402 = PaymentRequiredError;
export const IntegrationCatalogRecipeTest402 = PaymentRequiredError;
export type IntegrationCatalogRecipeTest403 = ForbiddenError | OnboardingReviewRequiredError;
export const IntegrationCatalogRecipeTest403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, OnboardingReviewRequiredError]))();
export type IntegrationCatalogRecipeTest404 = ResourceNotFoundError;
export const IntegrationCatalogRecipeTest404 = ResourceNotFoundError;
export type IntegrationCatalogRecipeTest409 = ConflictError;
export const IntegrationCatalogRecipeTest409 = ConflictError;
export type IntegrationCatalogRecipeTest422 =
  | ValidationError
  | FromAddressRequiredError
  | BrandAddressRequiredError
  | CampaignFooterRequiredError;
export const IntegrationCatalogRecipeTest422 = /* @__PURE__ */ (() =>
  Schema.Union([
    ValidationError,
    FromAddressRequiredError,
    BrandAddressRequiredError,
    CampaignFooterRequiredError,
  ]))();
export type IntegrationCatalogRecipeTest429 = RateLimitedError;
export const IntegrationCatalogRecipeTest429 = RateLimitedError;
export type IntegrationCatalogRecipeTest500 = InternalError;
export const IntegrationCatalogRecipeTest500 = InternalError;
export type IntegrationCatalogRecipeTest502 = BillingProviderError | ExternalServiceError;
export const IntegrationCatalogRecipeTest502 = /* @__PURE__ */ (() =>
  Schema.Union([BillingProviderError, ExternalServiceError]))();
export type IntegrationCatalogRecipeTest503 = SenderNotReadyError | DeliveryUnavailableError;
export const IntegrationCatalogRecipeTest503 = /* @__PURE__ */ (() =>
  Schema.Union([SenderNotReadyError, DeliveryUnavailableError]))();
export type IntegrationCatalogRecipeTest504 = GatewayTimeoutError;
export const IntegrationCatalogRecipeTest504 = GatewayTimeoutError;
export type IntegrationCatalogRecipeTestReceiptPathParams = { readonly requestId: string };
export const IntegrationCatalogRecipeTestReceiptPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    requestId: Schema.String.annotate({ format: "uuid" }).check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
      }),
    ),
  }))();
export type IntegrationCatalogRecipeTestReceipt200 = RecipeTestReceipt | null;
export const IntegrationCatalogRecipeTestReceipt200 = /* @__PURE__ */ (() =>
  Schema.Union([RecipeTestReceipt, Schema.Null]))();
export type IntegrationCatalogRecipeTestReceipt400 = MalformedRequestError;
export const IntegrationCatalogRecipeTestReceipt400 = MalformedRequestError;
export type IntegrationCatalogRecipeTestReceipt401 = UnauthorizedError;
export const IntegrationCatalogRecipeTestReceipt401 = UnauthorizedError;
export type IntegrationCatalogRecipeTestReceipt403 = ForbiddenError;
export const IntegrationCatalogRecipeTestReceipt403 = ForbiddenError;
export type IntegrationCatalogRecipeTestReceipt404 = ResourceNotFoundError;
export const IntegrationCatalogRecipeTestReceipt404 = ResourceNotFoundError;
export type IntegrationCatalogRecipeTestReceipt422 = ValidationError;
export const IntegrationCatalogRecipeTestReceipt422 = ValidationError;
export type IntegrationCatalogRecipeTestReceipt500 = InternalError;
export const IntegrationCatalogRecipeTestReceipt500 = InternalError;
export type IntegrationCatalogRecipeTestReceipt504 = GatewayTimeoutError;
export const IntegrationCatalogRecipeTestReceipt504 = GatewayTimeoutError;
export type IntegrationCatalogRecipeTestHandoffQuery = {
  readonly channel: "email" | "whatsapp";
  readonly templateId: TemplateId;
  readonly publicationId: TemplatePublicationId;
  readonly mailboxEndpointId: MailboxEndpointId;
  readonly fixture?: string;
  readonly senderId?: EmailSenderId;
  readonly businessAccountId?: WhatsAppBusinessAccountId;
  readonly registrationId?: TemplateRegistrationId;
};
export const IntegrationCatalogRecipeTestHandoffQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    channel: Schema.Union([Schema.Literal("email"), Schema.Literal("whatsapp")]),
    templateId: TemplateId,
    publicationId: TemplatePublicationId,
    mailboxEndpointId: MailboxEndpointId,
    fixture: Schema.optionalKey(
      Schema.String.check(
        Schema.isMaxCodePoints(100).annotate({ expected: "a string with at most 100 code points" }),
      ).check(
        Schema.isMaxLength(100).annotate({ expected: "a value with a length of at most 100" }),
      ),
    ),
    senderId: Schema.optionalKey(EmailSenderId),
    businessAccountId: Schema.optionalKey(WhatsAppBusinessAccountId),
    registrationId: Schema.optionalKey(TemplateRegistrationId),
  }))();
export type IntegrationCatalogRecipeTestHandoff200 = RecipeHandoff;
export const IntegrationCatalogRecipeTestHandoff200 = RecipeHandoff;
export type IntegrationCatalogRecipeTestHandoff400 = MalformedRequestError;
export const IntegrationCatalogRecipeTestHandoff400 = MalformedRequestError;
export type IntegrationCatalogRecipeTestHandoff401 = UnauthorizedError;
export const IntegrationCatalogRecipeTestHandoff401 = UnauthorizedError;
export type IntegrationCatalogRecipeTestHandoff403 = ForbiddenError;
export const IntegrationCatalogRecipeTestHandoff403 = ForbiddenError;
export type IntegrationCatalogRecipeTestHandoff404 = ResourceNotFoundError;
export const IntegrationCatalogRecipeTestHandoff404 = ResourceNotFoundError;
export type IntegrationCatalogRecipeTestHandoff422 = ValidationError;
export const IntegrationCatalogRecipeTestHandoff422 = ValidationError;
export type IntegrationCatalogRecipeTestHandoff500 = InternalError;
export const IntegrationCatalogRecipeTestHandoff500 = InternalError;
export type IntegrationCatalogRecipeTestHandoff504 = GatewayTimeoutError;
export const IntegrationCatalogRecipeTestHandoff504 = GatewayTimeoutError;
export type IntegrationCatalogRecipeWhatsAppChallengeBeginPathParams = {
  readonly accountId: WhatsAppBusinessAccountId;
};
export const IntegrationCatalogRecipeWhatsAppChallengeBeginPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ accountId: WhatsAppBusinessAccountId }))();
export type IntegrationCatalogRecipeWhatsAppChallengeBegin200 = RecipeChallengeStarted;
export const IntegrationCatalogRecipeWhatsAppChallengeBegin200 = RecipeChallengeStarted;
export type IntegrationCatalogRecipeWhatsAppChallengeBegin400 = MalformedRequestError;
export const IntegrationCatalogRecipeWhatsAppChallengeBegin400 = MalformedRequestError;
export type IntegrationCatalogRecipeWhatsAppChallengeBegin401 = UnauthorizedError;
export const IntegrationCatalogRecipeWhatsAppChallengeBegin401 = UnauthorizedError;
export type IntegrationCatalogRecipeWhatsAppChallengeBegin403 = ForbiddenError;
export const IntegrationCatalogRecipeWhatsAppChallengeBegin403 = ForbiddenError;
export type IntegrationCatalogRecipeWhatsAppChallengeBegin404 = ResourceNotFoundError;
export const IntegrationCatalogRecipeWhatsAppChallengeBegin404 = ResourceNotFoundError;
export type IntegrationCatalogRecipeWhatsAppChallengeBegin409 = ConflictError;
export const IntegrationCatalogRecipeWhatsAppChallengeBegin409 = ConflictError;
export type IntegrationCatalogRecipeWhatsAppChallengeBegin422 = ValidationError;
export const IntegrationCatalogRecipeWhatsAppChallengeBegin422 = ValidationError;
export type IntegrationCatalogRecipeWhatsAppChallengeBegin500 = InternalError;
export const IntegrationCatalogRecipeWhatsAppChallengeBegin500 = InternalError;
export type IntegrationCatalogRecipeWhatsAppChallengeBegin504 = GatewayTimeoutError;
export const IntegrationCatalogRecipeWhatsAppChallengeBegin504 = GatewayTimeoutError;
export type IntegrationCatalogRecipeWhatsAppChallengeGetPathParams = {
  readonly accountId: WhatsAppBusinessAccountId;
  readonly id: string;
};
export const IntegrationCatalogRecipeWhatsAppChallengeGetPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    accountId: WhatsAppBusinessAccountId,
    id: Schema.String.annotate({ format: "uuid" }).check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
      }),
    ),
  }))();
export type IntegrationCatalogRecipeWhatsAppChallengeGet200 = RecipeChallengeStatus;
export const IntegrationCatalogRecipeWhatsAppChallengeGet200 = RecipeChallengeStatus;
export type IntegrationCatalogRecipeWhatsAppChallengeGet400 = MalformedRequestError;
export const IntegrationCatalogRecipeWhatsAppChallengeGet400 = MalformedRequestError;
export type IntegrationCatalogRecipeWhatsAppChallengeGet401 = UnauthorizedError;
export const IntegrationCatalogRecipeWhatsAppChallengeGet401 = UnauthorizedError;
export type IntegrationCatalogRecipeWhatsAppChallengeGet403 = ForbiddenError;
export const IntegrationCatalogRecipeWhatsAppChallengeGet403 = ForbiddenError;
export type IntegrationCatalogRecipeWhatsAppChallengeGet404 = ResourceNotFoundError;
export const IntegrationCatalogRecipeWhatsAppChallengeGet404 = ResourceNotFoundError;
export type IntegrationCatalogRecipeWhatsAppChallengeGet409 = ConflictError;
export const IntegrationCatalogRecipeWhatsAppChallengeGet409 = ConflictError;
export type IntegrationCatalogRecipeWhatsAppChallengeGet422 = ValidationError;
export const IntegrationCatalogRecipeWhatsAppChallengeGet422 = ValidationError;
export type IntegrationCatalogRecipeWhatsAppChallengeGet500 = InternalError;
export const IntegrationCatalogRecipeWhatsAppChallengeGet500 = InternalError;
export type IntegrationCatalogRecipeWhatsAppChallengeGet504 = GatewayTimeoutError;
export const IntegrationCatalogRecipeWhatsAppChallengeGet504 = GatewayTimeoutError;
export type IntegrationCatalogRecipeWhatsAppChallengeConfirmPathParams = {
  readonly accountId: WhatsAppBusinessAccountId;
  readonly id: string;
};
export const IntegrationCatalogRecipeWhatsAppChallengeConfirmPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    accountId: WhatsAppBusinessAccountId,
    id: Schema.String.annotate({ format: "uuid" }).check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
      }),
    ),
  }))();
export type IntegrationCatalogRecipeWhatsAppChallengeConfirmRequestJson = {
  readonly observedPhone: string;
};
export const IntegrationCatalogRecipeWhatsAppChallengeConfirmRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    observedPhone: Schema.String.check(
      Schema.isPattern(new globalThis.RegExp("^\\+[1-9]\\d{1,14}$", "u")).annotate({
        expected: "a string matching the RegExp ^\\+[1-9]\\d{1,14}$",
      }),
    ),
  }))();
export type IntegrationCatalogRecipeWhatsAppChallengeConfirm200 = RecipeChallengeStatus;
export const IntegrationCatalogRecipeWhatsAppChallengeConfirm200 = RecipeChallengeStatus;
export type IntegrationCatalogRecipeWhatsAppChallengeConfirm400 = MalformedRequestError;
export const IntegrationCatalogRecipeWhatsAppChallengeConfirm400 = MalformedRequestError;
export type IntegrationCatalogRecipeWhatsAppChallengeConfirm401 = UnauthorizedError;
export const IntegrationCatalogRecipeWhatsAppChallengeConfirm401 = UnauthorizedError;
export type IntegrationCatalogRecipeWhatsAppChallengeConfirm403 = ForbiddenError;
export const IntegrationCatalogRecipeWhatsAppChallengeConfirm403 = ForbiddenError;
export type IntegrationCatalogRecipeWhatsAppChallengeConfirm404 = ResourceNotFoundError;
export const IntegrationCatalogRecipeWhatsAppChallengeConfirm404 = ResourceNotFoundError;
export type IntegrationCatalogRecipeWhatsAppChallengeConfirm409 = ConflictError;
export const IntegrationCatalogRecipeWhatsAppChallengeConfirm409 = ConflictError;
export type IntegrationCatalogRecipeWhatsAppChallengeConfirm422 = ValidationError;
export const IntegrationCatalogRecipeWhatsAppChallengeConfirm422 = ValidationError;
export type IntegrationCatalogRecipeWhatsAppChallengeConfirm500 = InternalError;
export const IntegrationCatalogRecipeWhatsAppChallengeConfirm500 = InternalError;
export type IntegrationCatalogRecipeWhatsAppChallengeConfirm504 = GatewayTimeoutError;
export const IntegrationCatalogRecipeWhatsAppChallengeConfirm504 = GatewayTimeoutError;
export type IntegrationCatalogRecipePreviewRequestJson =
  | {
      readonly templateId: TemplateId;
      readonly publicationId: TemplatePublicationId;
      readonly fixture?: string;
      readonly templateData?: JsonObject;
      readonly channel: "email";
    }
  | {
      readonly templateId: TemplateId;
      readonly publicationId: TemplatePublicationId;
      readonly fixture?: string;
      readonly templateData?: JsonObject;
      readonly channel: "whatsapp";
      readonly eventBindings?: { readonly [x: string]: string };
    };
export const IntegrationCatalogRecipePreviewRequestJson = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Struct({
      templateId: TemplateId,
      publicationId: TemplatePublicationId,
      fixture: Schema.optionalKey(
        Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        )
          .check(
            Schema.isMaxCodePoints(100).annotate({
              expected: "a string with at most 100 code points",
            }),
          )
          .check(
            Schema.isMaxLength(100).annotate({ expected: "a value with a length of at most 100" }),
          ),
      ),
      templateData: Schema.optionalKey(JsonObject),
      channel: Schema.Literal("email"),
    }),
    Schema.Struct({
      templateId: TemplateId,
      publicationId: TemplatePublicationId,
      fixture: Schema.optionalKey(
        Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        )
          .check(
            Schema.isMaxCodePoints(100).annotate({
              expected: "a string with at most 100 code points",
            }),
          )
          .check(
            Schema.isMaxLength(100).annotate({ expected: "a value with a length of at most 100" }),
          ),
      ),
      templateData: Schema.optionalKey(JsonObject),
      channel: Schema.Literal("whatsapp"),
      eventBindings: Schema.optionalKey(
        Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(160).annotate({
              expected: "a string with at most 160 code points",
            }),
          ).check(
            Schema.isMaxLength(160).annotate({ expected: "a value with a length of at most 160" }),
          ),
        ),
      ),
    }),
  ]))();
export type IntegrationCatalogRecipePreview200 = RecipePreviewResponse;
export const IntegrationCatalogRecipePreview200 = RecipePreviewResponse;
export type IntegrationCatalogRecipePreview400 = MalformedRequestError;
export const IntegrationCatalogRecipePreview400 = MalformedRequestError;
export type IntegrationCatalogRecipePreview401 = UnauthorizedError;
export const IntegrationCatalogRecipePreview401 = UnauthorizedError;
export type IntegrationCatalogRecipePreview403 = ForbiddenError;
export const IntegrationCatalogRecipePreview403 = ForbiddenError;
export type IntegrationCatalogRecipePreview404 = ResourceNotFoundError;
export const IntegrationCatalogRecipePreview404 = ResourceNotFoundError;
export type IntegrationCatalogRecipePreview422 = ValidationError;
export const IntegrationCatalogRecipePreview422 = ValidationError;
export type IntegrationCatalogRecipePreview500 = InternalError;
export const IntegrationCatalogRecipePreview500 = InternalError;
export type IntegrationCatalogRecipePreview504 = GatewayTimeoutError;
export const IntegrationCatalogRecipePreview504 = GatewayTimeoutError;
export type IntegrationCatalogRecipeReadinessQuery = {
  readonly channel: "email" | "whatsapp";
  readonly integrationAccountId?: IntegrationAccountId;
  readonly publicationId?: TemplatePublicationId;
  readonly senderId?: EmailSenderId;
  readonly whatsappAccountId?: WhatsAppBusinessAccountId;
  readonly registrationId?: TemplateRegistrationId;
  readonly mailboxEndpointId?: MailboxEndpointId;
};
export const IntegrationCatalogRecipeReadinessQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    channel: Schema.Union([Schema.Literal("email"), Schema.Literal("whatsapp")]),
    integrationAccountId: Schema.optionalKey(IntegrationAccountId),
    publicationId: Schema.optionalKey(TemplatePublicationId),
    senderId: Schema.optionalKey(EmailSenderId),
    whatsappAccountId: Schema.optionalKey(WhatsAppBusinessAccountId),
    registrationId: Schema.optionalKey(TemplateRegistrationId),
    mailboxEndpointId: Schema.optionalKey(MailboxEndpointId),
  }))();
export type IntegrationCatalogRecipeReadiness200 = RecipeReadinessResponse;
export const IntegrationCatalogRecipeReadiness200 = RecipeReadinessResponse;
export type IntegrationCatalogRecipeReadiness400 = MalformedRequestError;
export const IntegrationCatalogRecipeReadiness400 = MalformedRequestError;
export type IntegrationCatalogRecipeReadiness401 = UnauthorizedError;
export const IntegrationCatalogRecipeReadiness401 = UnauthorizedError;
export type IntegrationCatalogRecipeReadiness403 = ForbiddenError;
export const IntegrationCatalogRecipeReadiness403 = ForbiddenError;
export type IntegrationCatalogRecipeReadiness422 = ValidationError;
export const IntegrationCatalogRecipeReadiness422 = ValidationError;
export type IntegrationCatalogRecipeReadiness500 = InternalError;
export const IntegrationCatalogRecipeReadiness500 = InternalError;
export type IntegrationCatalogRecipeReadiness502 = BillingProviderError;
export const IntegrationCatalogRecipeReadiness502 = BillingProviderError;
export type IntegrationCatalogRecipeReadiness504 = GatewayTimeoutError;
export const IntegrationCatalogRecipeReadiness504 = GatewayTimeoutError;
export type IntegrationCatalogRecipeSetupsList200 = RecipeSetups;
export const IntegrationCatalogRecipeSetupsList200 = RecipeSetups;
export type IntegrationCatalogRecipeSetupsList400 = MalformedRequestError;
export const IntegrationCatalogRecipeSetupsList400 = MalformedRequestError;
export type IntegrationCatalogRecipeSetupsList401 = UnauthorizedError;
export const IntegrationCatalogRecipeSetupsList401 = UnauthorizedError;
export type IntegrationCatalogRecipeSetupsList403 = ForbiddenError;
export const IntegrationCatalogRecipeSetupsList403 = ForbiddenError;
export type IntegrationCatalogRecipeSetupsList422 = ValidationError;
export const IntegrationCatalogRecipeSetupsList422 = ValidationError;
export type IntegrationCatalogRecipeSetupsList500 = InternalError;
export const IntegrationCatalogRecipeSetupsList500 = InternalError;
export type IntegrationCatalogRecipeSetupsList504 = GatewayTimeoutError;
export const IntegrationCatalogRecipeSetupsList504 = GatewayTimeoutError;
export type IntegrationCatalogRecipeSetupGetPathParams = { readonly id: string };
export const IntegrationCatalogRecipeSetupGetPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: Schema.String.annotate({ format: "uuid" }).check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
      }),
    ),
  }))();
export type IntegrationCatalogRecipeSetupGet200 = RecipeSetup;
export const IntegrationCatalogRecipeSetupGet200 = RecipeSetup;
export type IntegrationCatalogRecipeSetupGet400 = MalformedRequestError;
export const IntegrationCatalogRecipeSetupGet400 = MalformedRequestError;
export type IntegrationCatalogRecipeSetupGet401 = UnauthorizedError;
export const IntegrationCatalogRecipeSetupGet401 = UnauthorizedError;
export type IntegrationCatalogRecipeSetupGet403 = ForbiddenError;
export const IntegrationCatalogRecipeSetupGet403 = ForbiddenError;
export type IntegrationCatalogRecipeSetupGet404 = ResourceNotFoundError;
export const IntegrationCatalogRecipeSetupGet404 = ResourceNotFoundError;
export type IntegrationCatalogRecipeSetupGet422 = ValidationError;
export const IntegrationCatalogRecipeSetupGet422 = ValidationError;
export type IntegrationCatalogRecipeSetupGet500 = InternalError;
export const IntegrationCatalogRecipeSetupGet500 = InternalError;
export type IntegrationCatalogRecipeSetupGet504 = GatewayTimeoutError;
export const IntegrationCatalogRecipeSetupGet504 = GatewayTimeoutError;
export type IntegrationCatalogRecipeSetupReplacePathParams = { readonly id: string };
export const IntegrationCatalogRecipeSetupReplacePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: Schema.String.annotate({ format: "uuid" }).check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
      }),
    ),
  }))();
export type IntegrationCatalogRecipeSetupReplaceRequestJson = {
  readonly references: RecipeSetupReferences;
  readonly revision: string | null;
};
export const IntegrationCatalogRecipeSetupReplaceRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    references: RecipeSetupReferences,
    revision: Schema.Union([
      Schema.String.annotate({ format: "uuid" }).check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
        }),
      ),
      Schema.Null,
    ]),
  }))();
export type IntegrationCatalogRecipeSetupReplace200 = RecipeSetup;
export const IntegrationCatalogRecipeSetupReplace200 = RecipeSetup;
export type IntegrationCatalogRecipeSetupReplace400 = MalformedRequestError;
export const IntegrationCatalogRecipeSetupReplace400 = MalformedRequestError;
export type IntegrationCatalogRecipeSetupReplace401 = UnauthorizedError;
export const IntegrationCatalogRecipeSetupReplace401 = UnauthorizedError;
export type IntegrationCatalogRecipeSetupReplace403 = ForbiddenError;
export const IntegrationCatalogRecipeSetupReplace403 = ForbiddenError;
export type IntegrationCatalogRecipeSetupReplace404 = ResourceNotFoundError;
export const IntegrationCatalogRecipeSetupReplace404 = ResourceNotFoundError;
export type IntegrationCatalogRecipeSetupReplace409 = ConflictError;
export const IntegrationCatalogRecipeSetupReplace409 = ConflictError;
export type IntegrationCatalogRecipeSetupReplace422 = ValidationError;
export const IntegrationCatalogRecipeSetupReplace422 = ValidationError;
export type IntegrationCatalogRecipeSetupReplace500 = InternalError;
export const IntegrationCatalogRecipeSetupReplace500 = InternalError;
export type IntegrationCatalogRecipeSetupReplace504 = GatewayTimeoutError;
export const IntegrationCatalogRecipeSetupReplace504 = GatewayTimeoutError;
export type IntegrationCatalogRecipeSetupActivatePathParams = { readonly id: string };
export const IntegrationCatalogRecipeSetupActivatePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: Schema.String.annotate({ format: "uuid" }).check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
      }),
    ),
  }))();
export type IntegrationCatalogRecipeSetupActivateRequestJson = {
  readonly revision: string;
  readonly selection:
    | {
        readonly channel: "email";
        readonly publicationId: TemplatePublicationId;
        readonly senderId?: EmailSenderId;
      }
    | {
        readonly channel: "whatsapp";
        readonly whatsappAccountId: WhatsAppBusinessAccountId;
        readonly registrationId: TemplateRegistrationId;
        readonly eventBindings: { readonly [x: string]: string };
      };
};
export const IntegrationCatalogRecipeSetupActivateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    revision: Schema.String.annotate({ format: "uuid" }).check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
      }),
    ),
    selection: Schema.Union([
      Schema.Struct({
        channel: Schema.Literal("email"),
        publicationId: TemplatePublicationId,
        senderId: Schema.optionalKey(EmailSenderId),
      }),
      Schema.Struct({
        channel: Schema.Literal("whatsapp"),
        whatsappAccountId: WhatsAppBusinessAccountId,
        registrationId: TemplateRegistrationId,
        eventBindings: Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
          ).check(
            Schema.isPattern(
              new globalThis.RegExp("^[a-zA-Z0-9_]+(?:\\.[a-zA-Z0-9_]+)*$", "u"),
            ).annotate({
              expected: "a string matching the RegExp ^[a-zA-Z0-9_]+(?:\\.[a-zA-Z0-9_]+)*$",
            }),
          ),
        ).check(
          Schema.isPropertyNames(
            Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            ),
          ).annotate({ expected: "an object with property names matching the schema" }),
        ),
      }),
    ]),
  }))();
export type IntegrationCatalogRecipeSetupActivate200 = ActivatedRecipeSetup;
export const IntegrationCatalogRecipeSetupActivate200 = ActivatedRecipeSetup;
export type IntegrationCatalogRecipeSetupActivate400 = MalformedRequestError;
export const IntegrationCatalogRecipeSetupActivate400 = MalformedRequestError;
export type IntegrationCatalogRecipeSetupActivate401 = UnauthorizedError;
export const IntegrationCatalogRecipeSetupActivate401 = UnauthorizedError;
export type IntegrationCatalogRecipeSetupActivate402 = PaymentRequiredError;
export const IntegrationCatalogRecipeSetupActivate402 = PaymentRequiredError;
export type IntegrationCatalogRecipeSetupActivate403 = ForbiddenError;
export const IntegrationCatalogRecipeSetupActivate403 = ForbiddenError;
export type IntegrationCatalogRecipeSetupActivate404 = ResourceNotFoundError;
export const IntegrationCatalogRecipeSetupActivate404 = ResourceNotFoundError;
export type IntegrationCatalogRecipeSetupActivate409 = ConflictError;
export const IntegrationCatalogRecipeSetupActivate409 = ConflictError;
export type IntegrationCatalogRecipeSetupActivate422 = ValidationError;
export const IntegrationCatalogRecipeSetupActivate422 = ValidationError;
export type IntegrationCatalogRecipeSetupActivate500 = InternalError;
export const IntegrationCatalogRecipeSetupActivate500 = InternalError;
export type IntegrationCatalogRecipeSetupActivate502 = BillingProviderError;
export const IntegrationCatalogRecipeSetupActivate502 = BillingProviderError;
export type IntegrationCatalogRecipeSetupActivate504 = GatewayTimeoutError;
export const IntegrationCatalogRecipeSetupActivate504 = GatewayTimeoutError;
export type IntegrationCatalogSearchQuery = {
  readonly key?: IntegrationKey;
  readonly query?: string;
  readonly category?:
    | "commerce"
    | "payments"
    | "shipping"
    | "calendar"
    | "crm"
    | "helpdesk"
    | "knowledge"
    | "forms"
    | "accounting"
    | "reviews"
    | "productivity"
    | "dns"
    | "channel"
    | "other";
  readonly limit?: number | null;
  readonly cursor?: string;
};
export const IntegrationCatalogSearchQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    key: Schema.optionalKey(IntegrationKey),
    query: Schema.optionalKey(
      Schema.String.check(
        Schema.isMaxCodePoints(256).annotate({ expected: "a string with at most 256 code points" }),
      ).check(
        Schema.isMaxLength(256).annotate({ expected: "a value with a length of at most 256" }),
      ),
    ),
    category: Schema.optionalKey(
      Schema.Union([
        Schema.Literal("commerce"),
        Schema.Literal("payments"),
        Schema.Literal("shipping"),
        Schema.Literal("calendar"),
        Schema.Literal("crm"),
        Schema.Literal("helpdesk"),
        Schema.Literal("knowledge"),
        Schema.Literal("forms"),
        Schema.Literal("accounting"),
        Schema.Literal("reviews"),
        Schema.Literal("productivity"),
        Schema.Literal("dns"),
        Schema.Literal("channel"),
        Schema.Literal("other"),
      ]),
    ),
    limit: Schema.optionalKey(
      Schema.Union([
        Schema.Finite.annotate({ description: "Items per page, at most 100." })
          .check(Schema.isInt().annotate({ expected: "an integer" }))
          .check(
            Schema.isLessThanOrEqualTo(100).annotate({
              expected: "a value less than or equal to 100",
            }),
          )
          .check(Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" })),
        Schema.Null,
      ]),
    ),
    cursor: Schema.optionalKey(Schema.String),
  }))();
export type IntegrationCatalogSearch200 = IntegrationCatalogSearchPage;
export const IntegrationCatalogSearch200 = IntegrationCatalogSearchPage;
export type IntegrationCatalogSearch400 = MalformedRequestError;
export const IntegrationCatalogSearch400 = MalformedRequestError;
export type IntegrationCatalogSearch401 = UnauthorizedError;
export const IntegrationCatalogSearch401 = UnauthorizedError;
export type IntegrationCatalogSearch403 = ForbiddenError;
export const IntegrationCatalogSearch403 = ForbiddenError;
export type IntegrationCatalogSearch422 = ValidationError;
export const IntegrationCatalogSearch422 = ValidationError;
export type IntegrationCatalogSearch500 = InternalError;
export const IntegrationCatalogSearch500 = InternalError;
export type IntegrationCatalogSearch504 = GatewayTimeoutError;
export const IntegrationCatalogSearch504 = GatewayTimeoutError;

export class IntegrationsCatalogGroup extends HttpApiGroup.make("Integrations catalog")
  .add(
    HttpApiEndpoint.get("integrationCatalogList", "/v1/integrations/catalog", {
      success: IntegrationCatalogList200,
      error: [
        IntegrationCatalogList400.pipe(HttpApiSchema.status(400)),
        IntegrationCatalogList401.pipe(HttpApiSchema.status(401)),
        IntegrationCatalogList403.pipe(HttpApiSchema.status(403)),
        IntegrationCatalogList422.pipe(HttpApiSchema.status(422)),
        IntegrationCatalogList500,
        IntegrationCatalogList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.list")
      .annotate(OpenApi.Summary, "List the integrations catalog")
      .annotate(
        OpenApi.Description,
        "Returns the providers this organization can connect, each with its connections and the agents and journeys that use them.",
      ),
    HttpApiEndpoint.post("integrationCatalogPrepare", "/v1/integrations/catalog/prepare", {
      payload: IntegrationCatalogPrepareRequestJson,
      success: IntegrationCatalogPrepare200,
      error: [
        IntegrationCatalogPrepare400.pipe(HttpApiSchema.status(400)),
        IntegrationCatalogPrepare401.pipe(HttpApiSchema.status(401)),
        IntegrationCatalogPrepare403.pipe(HttpApiSchema.status(403)),
        IntegrationCatalogPrepare422.pipe(HttpApiSchema.status(422)),
        IntegrationCatalogPrepare500,
        IntegrationCatalogPrepare504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.prepare")
      .annotate(OpenApi.Summary, "Prepare an integration connection")
      .annotate(
        OpenApi.Description,
        "Resolves what connecting a catalog provider needs: the inputs and credentials it asks for, the hosts its API and OAuth credentials reach, and whether it can connect. Pass input for server inputs such as an API description URL. An unavailable provider carries a reason.",
      ),
    HttpApiEndpoint.get("integrationCatalogRecipeCatalog", "/v1/integrations/catalog/recipes", {
      success: IntegrationCatalogRecipeCatalog200,
      error: [
        IntegrationCatalogRecipeCatalog400.pipe(HttpApiSchema.status(400)),
        IntegrationCatalogRecipeCatalog401.pipe(HttpApiSchema.status(401)),
        IntegrationCatalogRecipeCatalog403.pipe(HttpApiSchema.status(403)),
        IntegrationCatalogRecipeCatalog422.pipe(HttpApiSchema.status(422)),
        IntegrationCatalogRecipeCatalog500,
        IntegrationCatalogRecipeCatalog504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.recipeCatalog")
      .annotate(OpenApi.Summary, "List Shopify journey recipes and event inputs")
      .annotate(
        OpenApi.Description,
        "Returns recipe defaults, event property schemas and labelled sample payloads.",
      ),
    HttpApiEndpoint.get(
      "integrationCatalogRecipeConnectionHandoff",
      "/v1/integrations/catalog/recipes/post-delivery-check-in/connections/:provider",
      {
        params: IntegrationCatalogRecipeConnectionHandoffPathParams,
        query: IntegrationCatalogRecipeConnectionHandoffQuery,
        success: IntegrationCatalogRecipeConnectionHandoff200,
        error: [
          IntegrationCatalogRecipeConnectionHandoff400.pipe(HttpApiSchema.status(400)),
          IntegrationCatalogRecipeConnectionHandoff401.pipe(HttpApiSchema.status(401)),
          IntegrationCatalogRecipeConnectionHandoff403.pipe(HttpApiSchema.status(403)),
          IntegrationCatalogRecipeConnectionHandoff404.pipe(HttpApiSchema.status(404)),
          IntegrationCatalogRecipeConnectionHandoff422.pipe(HttpApiSchema.status(422)),
          IntegrationCatalogRecipeConnectionHandoff500,
          IntegrationCatalogRecipeConnectionHandoff504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.recipeConnectionHandoff")
      .annotate(OpenApi.Summary, "Get a Shopify or WhatsApp browser connection handoff")
      .annotate(
        OpenApi.Description,
        "Returns a browser link for an organization administrator. Shopify opens the saved check-in when setupId is supplied and the Shopify integration page otherwise. WhatsApp opens its settings page with the specified account, if any, even when setupId is supplied. Provider authorization takes place in the browser.",
      ),
    HttpApiEndpoint.post(
      "integrationCatalogRecipeTest",
      "/v1/integrations/catalog/recipes/post-delivery-check-in/owner-test",
      {
        payload: IntegrationCatalogRecipeTestRequestJson,
        success: IntegrationCatalogRecipeTest200,
        error: [
          IntegrationCatalogRecipeTest400.pipe(HttpApiSchema.status(400)),
          IntegrationCatalogRecipeTest401.pipe(HttpApiSchema.status(401)),
          IntegrationCatalogRecipeTest402.pipe(HttpApiSchema.status(402)),
          IntegrationCatalogRecipeTest403.pipe(HttpApiSchema.status(403)),
          IntegrationCatalogRecipeTest404.pipe(HttpApiSchema.status(404)),
          IntegrationCatalogRecipeTest409.pipe(HttpApiSchema.status(409)),
          IntegrationCatalogRecipeTest422.pipe(HttpApiSchema.status(422)),
          IntegrationCatalogRecipeTest429.pipe(HttpApiSchema.status(429)),
          IntegrationCatalogRecipeTest500,
          IntegrationCatalogRecipeTest502.pipe(HttpApiSchema.status(502)),
          IntegrationCatalogRecipeTest503.pipe(HttpApiSchema.status(503)),
          IntegrationCatalogRecipeTest504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.recipeTest")
      .annotate(OpenApi.Summary, "Run an owner-only test of a Shopify check-in")
      .annotate(
        OpenApi.Description,
        "Takes no recipient. Samva resolves the acting owner's signed-in verified email or confirmed WhatsApp challenge. Normal send admission, billing, suppression and consent apply. Reuse the same request ID to reconcile an uncertain response.",
      ),
    HttpApiEndpoint.get(
      "integrationCatalogRecipeTestReceipt",
      "/v1/integrations/catalog/recipes/post-delivery-check-in/owner-test/:requestId",
      {
        params: IntegrationCatalogRecipeTestReceiptPathParams,
        success: IntegrationCatalogRecipeTestReceipt200,
        error: [
          IntegrationCatalogRecipeTestReceipt400.pipe(HttpApiSchema.status(400)),
          IntegrationCatalogRecipeTestReceipt401.pipe(HttpApiSchema.status(401)),
          IntegrationCatalogRecipeTestReceipt403.pipe(HttpApiSchema.status(403)),
          IntegrationCatalogRecipeTestReceipt404.pipe(HttpApiSchema.status(404)),
          IntegrationCatalogRecipeTestReceipt422.pipe(HttpApiSchema.status(422)),
          IntegrationCatalogRecipeTestReceipt500,
          IntegrationCatalogRecipeTestReceipt504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.recipeTestReceipt")
      .annotate(OpenApi.Summary, "Reconcile an owner test after an uncertain response")
      .annotate(
        OpenApi.Description,
        "Requires messages:read and the signed-in owner in the dashboard or Samva CLI. Returns that owner's test receipt by request ID. Read message deliveries for provider and reply state.",
      ),
    HttpApiEndpoint.get(
      "integrationCatalogRecipeTestHandoff",
      "/v1/integrations/catalog/recipes/post-delivery-check-in/owner-test/handoff",
      {
        query: IntegrationCatalogRecipeTestHandoffQuery,
        success: IntegrationCatalogRecipeTestHandoff200,
        error: [
          IntegrationCatalogRecipeTestHandoff400.pipe(HttpApiSchema.status(400)),
          IntegrationCatalogRecipeTestHandoff401.pipe(HttpApiSchema.status(401)),
          IntegrationCatalogRecipeTestHandoff403.pipe(HttpApiSchema.status(403)),
          IntegrationCatalogRecipeTestHandoff404.pipe(HttpApiSchema.status(404)),
          IntegrationCatalogRecipeTestHandoff422.pipe(HttpApiSchema.status(422)),
          IntegrationCatalogRecipeTestHandoff500,
          IntegrationCatalogRecipeTestHandoff504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.recipeTestHandoff")
      .annotate(OpenApi.Summary, "Get a browser handoff for a verified owner test")
      .annotate(
        OpenApi.Description,
        "Opens the owner review screen for the specified publication and reply mailbox endpoint. Creating this link submits no message or provider request.",
      ),
    HttpApiEndpoint.post(
      "integrationCatalogRecipeWhatsAppChallengeBegin",
      "/v1/integrations/catalog/recipes/post-delivery-check-in/owner-test/whatsapp/:accountId/challenges",
      {
        params: IntegrationCatalogRecipeWhatsAppChallengeBeginPathParams,
        success: IntegrationCatalogRecipeWhatsAppChallengeBegin200,
        error: [
          IntegrationCatalogRecipeWhatsAppChallengeBegin400.pipe(HttpApiSchema.status(400)),
          IntegrationCatalogRecipeWhatsAppChallengeBegin401.pipe(HttpApiSchema.status(401)),
          IntegrationCatalogRecipeWhatsAppChallengeBegin403.pipe(HttpApiSchema.status(403)),
          IntegrationCatalogRecipeWhatsAppChallengeBegin404.pipe(HttpApiSchema.status(404)),
          IntegrationCatalogRecipeWhatsAppChallengeBegin409.pipe(HttpApiSchema.status(409)),
          IntegrationCatalogRecipeWhatsAppChallengeBegin422.pipe(HttpApiSchema.status(422)),
          IntegrationCatalogRecipeWhatsAppChallengeBegin500,
          IntegrationCatalogRecipeWhatsAppChallengeBegin504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.recipeWhatsAppChallengeBegin")
      .annotate(OpenApi.Summary, "Open a WhatsApp owner verification challenge")
      .annotate(
        OpenApi.Description,
        "Requires a signed-in owner. The owner sends the returned code directly from their personal WhatsApp to the listed business number before the code expires.",
      ),
    HttpApiEndpoint.get(
      "integrationCatalogRecipeWhatsAppChallengeGet",
      "/v1/integrations/catalog/recipes/post-delivery-check-in/owner-test/whatsapp/:accountId/challenges/:id",
      {
        params: IntegrationCatalogRecipeWhatsAppChallengeGetPathParams,
        success: IntegrationCatalogRecipeWhatsAppChallengeGet200,
        error: [
          IntegrationCatalogRecipeWhatsAppChallengeGet400.pipe(HttpApiSchema.status(400)),
          IntegrationCatalogRecipeWhatsAppChallengeGet401.pipe(HttpApiSchema.status(401)),
          IntegrationCatalogRecipeWhatsAppChallengeGet403.pipe(HttpApiSchema.status(403)),
          IntegrationCatalogRecipeWhatsAppChallengeGet404.pipe(HttpApiSchema.status(404)),
          IntegrationCatalogRecipeWhatsAppChallengeGet409.pipe(HttpApiSchema.status(409)),
          IntegrationCatalogRecipeWhatsAppChallengeGet422.pipe(HttpApiSchema.status(422)),
          IntegrationCatalogRecipeWhatsAppChallengeGet500,
          IntegrationCatalogRecipeWhatsAppChallengeGet504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.recipeWhatsAppChallengeGet")
      .annotate(OpenApi.Summary, "Read the observed sender for a WhatsApp owner challenge")
      .annotate(
        OpenApi.Description,
        "Requires the same signed-in owner. The observed phone is available only after authenticated inbound delivery on the selected business number.",
      ),
    HttpApiEndpoint.post(
      "integrationCatalogRecipeWhatsAppChallengeConfirm",
      "/v1/integrations/catalog/recipes/post-delivery-check-in/owner-test/whatsapp/:accountId/challenges/:id/confirm",
      {
        params: IntegrationCatalogRecipeWhatsAppChallengeConfirmPathParams,
        payload: IntegrationCatalogRecipeWhatsAppChallengeConfirmRequestJson,
        success: IntegrationCatalogRecipeWhatsAppChallengeConfirm200,
        error: [
          IntegrationCatalogRecipeWhatsAppChallengeConfirm400.pipe(HttpApiSchema.status(400)),
          IntegrationCatalogRecipeWhatsAppChallengeConfirm401.pipe(HttpApiSchema.status(401)),
          IntegrationCatalogRecipeWhatsAppChallengeConfirm403.pipe(HttpApiSchema.status(403)),
          IntegrationCatalogRecipeWhatsAppChallengeConfirm404.pipe(HttpApiSchema.status(404)),
          IntegrationCatalogRecipeWhatsAppChallengeConfirm409.pipe(HttpApiSchema.status(409)),
          IntegrationCatalogRecipeWhatsAppChallengeConfirm422.pipe(HttpApiSchema.status(422)),
          IntegrationCatalogRecipeWhatsAppChallengeConfirm500,
          IntegrationCatalogRecipeWhatsAppChallengeConfirm504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.recipeWhatsAppChallengeConfirm")
      .annotate(OpenApi.Summary, "Confirm the phone observed on a WhatsApp test challenge")
      .annotate(
        OpenApi.Description,
        "Requires the same signed-in owner and an exact match with the number reported by WhatsApp. Confirmation does not record consent.",
      ),
    HttpApiEndpoint.post(
      "integrationCatalogRecipePreview",
      "/v1/integrations/catalog/recipes/post-delivery-check-in/preview",
      {
        payload: IntegrationCatalogRecipePreviewRequestJson,
        success: IntegrationCatalogRecipePreview200,
        error: [
          IntegrationCatalogRecipePreview400.pipe(HttpApiSchema.status(400)),
          IntegrationCatalogRecipePreview401.pipe(HttpApiSchema.status(401)),
          IntegrationCatalogRecipePreview403.pipe(HttpApiSchema.status(403)),
          IntegrationCatalogRecipePreview404.pipe(HttpApiSchema.status(404)),
          IntegrationCatalogRecipePreview422.pipe(HttpApiSchema.status(422)),
          IntegrationCatalogRecipePreview500,
          IntegrationCatalogRecipePreview504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.recipePreview")
      .annotate(OpenApi.Summary, "Render a check-in preview with a labelled sample order")
      .annotate(
        OpenApi.Description,
        "Renders the exact publication without sending, enrolling a recipient, or requiring a verified test destination.",
      ),
    HttpApiEndpoint.get(
      "integrationCatalogRecipeReadiness",
      "/v1/integrations/catalog/recipes/post-delivery-check-in/readiness",
      {
        query: IntegrationCatalogRecipeReadinessQuery,
        success: IntegrationCatalogRecipeReadiness200,
        error: [
          IntegrationCatalogRecipeReadiness400.pipe(HttpApiSchema.status(400)),
          IntegrationCatalogRecipeReadiness401.pipe(HttpApiSchema.status(401)),
          IntegrationCatalogRecipeReadiness403.pipe(HttpApiSchema.status(403)),
          IntegrationCatalogRecipeReadiness422.pipe(HttpApiSchema.status(422)),
          IntegrationCatalogRecipeReadiness500,
          IntegrationCatalogRecipeReadiness502.pipe(HttpApiSchema.status(502)),
          IntegrationCatalogRecipeReadiness504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.recipeReadiness")
      .annotate(OpenApi.Summary, "Read Shopify post-delivery check-in readiness")
      .annotate(
        OpenApi.Description,
        "Checks selected resources and plan access. A namespace caller sees its reachable resources. Shopify account and plan fields are null, and full recipe readiness requires organization-wide access. Omit the email sender or WhatsApp account to see the sender or number selected for the publication and caller scope. Requires email:read and domains:read for email, or whatsappAccounts:read for WhatsApp.",
      ),
    HttpApiEndpoint.get(
      "integrationCatalogRecipeSetupsList",
      "/v1/integrations/catalog/recipes/post-delivery-check-in/setups",
      {
        success: IntegrationCatalogRecipeSetupsList200,
        error: [
          IntegrationCatalogRecipeSetupsList400.pipe(HttpApiSchema.status(400)),
          IntegrationCatalogRecipeSetupsList401.pipe(HttpApiSchema.status(401)),
          IntegrationCatalogRecipeSetupsList403.pipe(HttpApiSchema.status(403)),
          IntegrationCatalogRecipeSetupsList422.pipe(HttpApiSchema.status(422)),
          IntegrationCatalogRecipeSetupsList500,
          IntegrationCatalogRecipeSetupsList504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.recipeSetupsList")
      .annotate(OpenApi.Summary, "List saved post-delivery check-in setups")
      .annotate(
        OpenApi.Description,
        "Requires organization-wide access. Lists the 100 most recently updated selections the caller can read. Read live readiness separately.",
      ),
    HttpApiEndpoint.get(
      "integrationCatalogRecipeSetupGet",
      "/v1/integrations/catalog/recipes/post-delivery-check-in/setups/:id",
      {
        params: IntegrationCatalogRecipeSetupGetPathParams,
        success: IntegrationCatalogRecipeSetupGet200,
        error: [
          IntegrationCatalogRecipeSetupGet400.pipe(HttpApiSchema.status(400)),
          IntegrationCatalogRecipeSetupGet401.pipe(HttpApiSchema.status(401)),
          IntegrationCatalogRecipeSetupGet403.pipe(HttpApiSchema.status(403)),
          IntegrationCatalogRecipeSetupGet404.pipe(HttpApiSchema.status(404)),
          IntegrationCatalogRecipeSetupGet422.pipe(HttpApiSchema.status(422)),
          IntegrationCatalogRecipeSetupGet500,
          IntegrationCatalogRecipeSetupGet504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.recipeSetupGet")
      .annotate(OpenApi.Summary, "Read post-delivery check-in setup references")
      .annotate(
        OpenApi.Description,
        "Requires organization-wide access. Returns the saved resource IDs and revision for a setup the caller can read.",
      ),
    HttpApiEndpoint.put(
      "integrationCatalogRecipeSetupReplace",
      "/v1/integrations/catalog/recipes/post-delivery-check-in/setups/:id",
      {
        params: IntegrationCatalogRecipeSetupReplacePathParams,
        payload: IntegrationCatalogRecipeSetupReplaceRequestJson,
        success: IntegrationCatalogRecipeSetupReplace200,
        error: [
          IntegrationCatalogRecipeSetupReplace400.pipe(HttpApiSchema.status(400)),
          IntegrationCatalogRecipeSetupReplace401.pipe(HttpApiSchema.status(401)),
          IntegrationCatalogRecipeSetupReplace403.pipe(HttpApiSchema.status(403)),
          IntegrationCatalogRecipeSetupReplace404.pipe(HttpApiSchema.status(404)),
          IntegrationCatalogRecipeSetupReplace409.pipe(HttpApiSchema.status(409)),
          IntegrationCatalogRecipeSetupReplace422.pipe(HttpApiSchema.status(422)),
          IntegrationCatalogRecipeSetupReplace500,
          IntegrationCatalogRecipeSetupReplace504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.recipeSetupReplace")
      .annotate(OpenApi.Summary, "Save post-delivery check-in setup references")
      .annotate(
        OpenApi.Description,
        "Requires organization-wide access. Creates a setup under a new UUID with a null revision or replaces it with its current revision. Validates references without submitting provider requests.",
      ),
    HttpApiEndpoint.post(
      "integrationCatalogRecipeSetupActivate",
      "/v1/integrations/catalog/recipes/post-delivery-check-in/setups/:id/activate",
      {
        params: IntegrationCatalogRecipeSetupActivatePathParams,
        payload: IntegrationCatalogRecipeSetupActivateRequestJson,
        success: IntegrationCatalogRecipeSetupActivate200,
        error: [
          IntegrationCatalogRecipeSetupActivate400.pipe(HttpApiSchema.status(400)),
          IntegrationCatalogRecipeSetupActivate401.pipe(HttpApiSchema.status(401)),
          IntegrationCatalogRecipeSetupActivate402.pipe(HttpApiSchema.status(402)),
          IntegrationCatalogRecipeSetupActivate403.pipe(HttpApiSchema.status(403)),
          IntegrationCatalogRecipeSetupActivate404.pipe(HttpApiSchema.status(404)),
          IntegrationCatalogRecipeSetupActivate409.pipe(HttpApiSchema.status(409)),
          IntegrationCatalogRecipeSetupActivate422.pipe(HttpApiSchema.status(422)),
          IntegrationCatalogRecipeSetupActivate500,
          IntegrationCatalogRecipeSetupActivate502.pipe(HttpApiSchema.status(502)),
          IntegrationCatalogRecipeSetupActivate504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.recipeSetupActivate")
      .annotate(OpenApi.Summary, "Activate the reviewed Shopify post-delivery check-in")
      .annotate(
        OpenApi.Description,
        "Publishes the saved setup's reviewed send selection on its own journey. Reuse the same revision and selection after an interrupted response. A changed setup returns 409. Existing runs keep their published version.",
      ),
    HttpApiEndpoint.get("integrationCatalogSearch", "/v1/integrations/catalog/search", {
      query: IntegrationCatalogSearchQuery,
      success: IntegrationCatalogSearch200,
      error: [
        IntegrationCatalogSearch400.pipe(HttpApiSchema.status(400)),
        IntegrationCatalogSearch401.pipe(HttpApiSchema.status(401)),
        IntegrationCatalogSearch403.pipe(HttpApiSchema.status(403)),
        IntegrationCatalogSearch422.pipe(HttpApiSchema.status(422)),
        IntegrationCatalogSearch500,
        IntegrationCatalogSearch504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.search")
      .annotate(OpenApi.Summary, "Search the integrations catalog")
      .annotate(
        OpenApi.Description,
        "Searches the providers this organization can connect, by key, text or category. Each entry carries its connection requirements and whether it can connect. Pass nextCursor back as cursor until it is null.",
      ),
  )
  .annotate(OpenApi.Description, "Providers an organization can connect") {}
