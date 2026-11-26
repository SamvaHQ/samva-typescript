// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  BillingProviderError,
  CampaignId,
  ConflictError,
  CredentialsError,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  JourneyId,
  MalformedRequestError,
  MessageDeliveryId,
  NamespaceId,
  PaymentRequiredError,
  ResourceNotFoundError,
  TemplateId,
  UnauthorizedError,
  ValidationError,
  WhatsAppBusinessAccountId,
  WhatsAppChannelError,
  __SamvaRuntimeNonEmptySensitiveString,
  __SamvaRuntimeSensitiveString,
} from "./shared";

export type WhatsAppServiceWindowId = string & EffectBrand.Brand<"WhatsAppServiceWindowId">;
export const WhatsAppServiceWindowId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new globalThis.RegExp("^wasw_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^wasw_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "WhatsAppServiceWindowId",
    }),
  ).pipe(Schema.brand("WhatsAppServiceWindowId")))();
export type MoneyAmount = { readonly amount: string; readonly currency: string };
export const MoneyAmount = /* @__PURE__ */ (() =>
  Schema.Struct({
    amount: Schema.String.check(
      Schema.isPattern(new globalThis.RegExp("^\\d+\\.\\d+$", "u")).annotate({
        expected: "a string matching the RegExp ^\\d+\\.\\d+$",
      }),
    ),
    currency: Schema.String,
  }).annotate({ identifier: "MoneyAmount" }))();
export type WhatsAppTemplateStatsSource =
  | { readonly type: "campaign"; readonly campaignId: CampaignId }
  | { readonly type: "journey"; readonly journeyId: JourneyId; readonly nodeId: string }
  | { readonly type: "direct" };
export const WhatsAppTemplateStatsSource = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Struct({ type: Schema.Literal("campaign"), campaignId: CampaignId }),
    Schema.Struct({ type: Schema.Literal("journey"), journeyId: JourneyId, nodeId: Schema.String }),
    Schema.Struct({ type: Schema.Literal("direct") }),
  ]).annotate({ identifier: "WhatsAppTemplateStatsSource" }))();
export type WhatsAppTemplateStatsRow = {
  readonly templateId: TemplateId;
  readonly templateSlug: string;
  readonly name: string;
  readonly language: string;
  readonly category: "marketing" | "utility" | "authentication" | null;
  readonly source: WhatsAppTemplateStatsSource;
  readonly sent: number;
  readonly delivered: number;
  readonly read: number;
  readonly failed: number;
  readonly estimatedProviderCosts: ReadonlyArray<MoneyAmount>;
};
export const WhatsAppTemplateStatsRow = /* @__PURE__ */ (() =>
  Schema.Struct({
    templateId: TemplateId,
    templateSlug: Schema.String,
    name: Schema.String,
    language: Schema.String,
    category: Schema.Union([
      Schema.Union([
        Schema.Literal("marketing"),
        Schema.Literal("utility"),
        Schema.Literal("authentication"),
      ]),
      Schema.Null,
    ]),
    source: WhatsAppTemplateStatsSource,
    sent: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    delivered: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    read: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    failed: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    estimatedProviderCosts: Schema.Array(MoneyAmount),
  }).annotate({ identifier: "WhatsAppTemplateStatsRow" }))();
export type WhatsAppTemplateStats = { readonly items: ReadonlyArray<WhatsAppTemplateStatsRow> };
export const WhatsAppTemplateStats = /* @__PURE__ */ (() =>
  Schema.Struct({ items: Schema.Array(WhatsAppTemplateStatsRow) }).annotate({
    identifier: "WhatsAppTemplateStats",
  }))();
export type WhatsappListBusinessAccountsQuery = {
  readonly limit?: number | null;
  readonly cursor?: string;
  readonly isActive?: boolean | null;
  readonly verificationStatus?: "pending" | "verified" | "failed" | "suspended";
  readonly namespaceId?: NamespaceId;
};
export const WhatsappListBusinessAccountsQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
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
    isActive: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    verificationStatus: Schema.optionalKey(
      Schema.Union([
        Schema.Literal("pending"),
        Schema.Literal("verified"),
        Schema.Literal("failed"),
        Schema.Literal("suspended"),
      ]),
    ),
    namespaceId: Schema.optionalKey(NamespaceId),
  }))();
export type WhatsappListBusinessAccounts200 = {
  readonly items: ReadonlyArray<{
    readonly id: WhatsAppBusinessAccountId;
    readonly organizationId: string;
    readonly namespaceId: NamespaceId | null;
    readonly phoneNumber: string;
    readonly phoneNumberId: string;
    readonly displayName: string;
    readonly whatsappBusinessAccountId: string;
    readonly verificationStatus: "pending" | "verified" | "failed" | "suspended";
    readonly credentialStatus: "active" | "reconnect_required";
    readonly tokenExpiresAt: string | null;
    readonly isDefault: boolean;
    readonly webhookUrl: string | null;
    readonly qualityRating: "green" | "yellow" | "red" | "unknown";
    readonly messagingLimit: string | null;
    readonly currentLimit: number;
    readonly businessPortfolioId: string | null;
    readonly businessAppConnectedAt: string | null;
    readonly businessAppDisconnectedAt: string | null;
    readonly businessAppDisconnectReason:
      | "partnerRemoved"
      | "offboarded"
      | "accountDisconnected"
      | "businessDowngrade"
      | "changeNumber"
      | "companionInactivity"
      | "primaryInactivity"
      | "userReRegistered"
      | null;
    readonly contactsSyncRequestedAt: string | null;
    readonly historySyncStatus: "requested" | "importing" | "completed" | "declined" | null;
    readonly historySyncProgress: number | null;
    readonly isActive: boolean;
    readonly createdAt: string;
    readonly updatedAt: string;
  }>;
  readonly nextCursor: string | null;
};
export const WhatsappListBusinessAccounts200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        id: WhatsAppBusinessAccountId,
        organizationId: Schema.String,
        namespaceId: Schema.Union([NamespaceId, Schema.Null]),
        phoneNumber: Schema.String,
        phoneNumberId: Schema.String,
        displayName: Schema.String,
        whatsappBusinessAccountId: Schema.String,
        verificationStatus: Schema.Union([
          Schema.Literal("pending"),
          Schema.Literal("verified"),
          Schema.Literal("failed"),
          Schema.Literal("suspended"),
        ]),
        credentialStatus: Schema.Union([
          Schema.Literal("active"),
          Schema.Literal("reconnect_required"),
        ]),
        tokenExpiresAt: Schema.Union([Schema.String, Schema.Null]),
        isDefault: Schema.Boolean,
        webhookUrl: Schema.Union([Schema.String, Schema.Null]),
        qualityRating: Schema.Union([
          Schema.Literal("green"),
          Schema.Literal("yellow"),
          Schema.Literal("red"),
          Schema.Literal("unknown"),
        ]),
        messagingLimit: Schema.Union([Schema.String, Schema.Null]),
        currentLimit: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        businessPortfolioId: Schema.Union([Schema.String, Schema.Null]),
        businessAppConnectedAt: Schema.Union([Schema.String, Schema.Null]),
        businessAppDisconnectedAt: Schema.Union([Schema.String, Schema.Null]),
        businessAppDisconnectReason: Schema.Union([
          Schema.Union([
            Schema.Literal("partnerRemoved"),
            Schema.Literal("offboarded"),
            Schema.Literal("accountDisconnected"),
            Schema.Literal("businessDowngrade"),
            Schema.Literal("changeNumber"),
            Schema.Literal("companionInactivity"),
            Schema.Literal("primaryInactivity"),
            Schema.Literal("userReRegistered"),
          ]),
          Schema.Null,
        ]),
        contactsSyncRequestedAt: Schema.Union([Schema.String, Schema.Null]),
        historySyncStatus: Schema.Union([
          Schema.Union([
            Schema.Literal("requested"),
            Schema.Literal("importing"),
            Schema.Literal("completed"),
            Schema.Literal("declined"),
          ]),
          Schema.Null,
        ]),
        historySyncProgress: Schema.Union([
          Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
            .check(
              Schema.isGreaterThanOrEqualTo(0).annotate({
                expected: "a value greater than or equal to 0",
              }),
            )
            .check(
              Schema.isLessThanOrEqualTo(100).annotate({
                expected: "a value less than or equal to 100",
              }),
            ),
          Schema.Null,
        ]),
        isActive: Schema.Boolean,
        createdAt: Schema.String,
        updatedAt: Schema.String,
      }),
    ),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }))();
export type WhatsappListBusinessAccounts400 = MalformedRequestError;
export const WhatsappListBusinessAccounts400 = MalformedRequestError;
export type WhatsappListBusinessAccounts401 = UnauthorizedError;
export const WhatsappListBusinessAccounts401 = UnauthorizedError;
export type WhatsappListBusinessAccounts403 = ForbiddenError;
export const WhatsappListBusinessAccounts403 = ForbiddenError;
export type WhatsappListBusinessAccounts422 = ValidationError;
export const WhatsappListBusinessAccounts422 = ValidationError;
export type WhatsappListBusinessAccounts500 = InternalError;
export const WhatsappListBusinessAccounts500 = InternalError;
export type WhatsappListBusinessAccounts504 = GatewayTimeoutError;
export const WhatsappListBusinessAccounts504 = GatewayTimeoutError;
export type WhatsappConnectBusinessAccountRequestJson = {
  readonly code: __SamvaRuntimeNonEmptySensitiveString;
  readonly wabaId: string;
  readonly phoneNumberId: string;
  readonly namespaceId?: NamespaceId | null;
};
export const WhatsappConnectBusinessAccountRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    code: __SamvaRuntimeNonEmptySensitiveString,
    wabaId: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
    phoneNumberId: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
    namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
  }))();
export type WhatsappConnectBusinessAccount201 = {
  readonly id: WhatsAppBusinessAccountId;
  readonly organizationId: string;
  readonly namespaceId: NamespaceId | null;
  readonly phoneNumber: string;
  readonly phoneNumberId: string;
  readonly displayName: string;
  readonly whatsappBusinessAccountId: string;
  readonly verificationStatus: "pending" | "verified" | "failed" | "suspended";
  readonly credentialStatus: "active" | "reconnect_required";
  readonly tokenExpiresAt: string | null;
  readonly isDefault: boolean;
  readonly webhookUrl: string | null;
  readonly qualityRating: "green" | "yellow" | "red" | "unknown";
  readonly messagingLimit: string | null;
  readonly currentLimit: number;
  readonly businessPortfolioId: string | null;
  readonly businessAppConnectedAt: string | null;
  readonly businessAppDisconnectedAt: string | null;
  readonly businessAppDisconnectReason:
    | "partnerRemoved"
    | "offboarded"
    | "accountDisconnected"
    | "businessDowngrade"
    | "changeNumber"
    | "companionInactivity"
    | "primaryInactivity"
    | "userReRegistered"
    | null;
  readonly contactsSyncRequestedAt: string | null;
  readonly historySyncStatus: "requested" | "importing" | "completed" | "declined" | null;
  readonly historySyncProgress: number | null;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const WhatsappConnectBusinessAccount201 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: WhatsAppBusinessAccountId,
    organizationId: Schema.String,
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
    phoneNumber: Schema.String,
    phoneNumberId: Schema.String,
    displayName: Schema.String,
    whatsappBusinessAccountId: Schema.String,
    verificationStatus: Schema.Union([
      Schema.Literal("pending"),
      Schema.Literal("verified"),
      Schema.Literal("failed"),
      Schema.Literal("suspended"),
    ]),
    credentialStatus: Schema.Union([
      Schema.Literal("active"),
      Schema.Literal("reconnect_required"),
    ]),
    tokenExpiresAt: Schema.Union([Schema.String, Schema.Null]),
    isDefault: Schema.Boolean,
    webhookUrl: Schema.Union([Schema.String, Schema.Null]),
    qualityRating: Schema.Union([
      Schema.Literal("green"),
      Schema.Literal("yellow"),
      Schema.Literal("red"),
      Schema.Literal("unknown"),
    ]),
    messagingLimit: Schema.Union([Schema.String, Schema.Null]),
    currentLimit: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    businessPortfolioId: Schema.Union([Schema.String, Schema.Null]),
    businessAppConnectedAt: Schema.Union([Schema.String, Schema.Null]),
    businessAppDisconnectedAt: Schema.Union([Schema.String, Schema.Null]),
    businessAppDisconnectReason: Schema.Union([
      Schema.Union([
        Schema.Literal("partnerRemoved"),
        Schema.Literal("offboarded"),
        Schema.Literal("accountDisconnected"),
        Schema.Literal("businessDowngrade"),
        Schema.Literal("changeNumber"),
        Schema.Literal("companionInactivity"),
        Schema.Literal("primaryInactivity"),
        Schema.Literal("userReRegistered"),
      ]),
      Schema.Null,
    ]),
    contactsSyncRequestedAt: Schema.Union([Schema.String, Schema.Null]),
    historySyncStatus: Schema.Union([
      Schema.Union([
        Schema.Literal("requested"),
        Schema.Literal("importing"),
        Schema.Literal("completed"),
        Schema.Literal("declined"),
      ]),
      Schema.Null,
    ]),
    historySyncProgress: Schema.Union([
      Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        )
        .check(
          Schema.isLessThanOrEqualTo(100).annotate({
            expected: "a value less than or equal to 100",
          }),
        ),
      Schema.Null,
    ]),
    isActive: Schema.Boolean,
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }))();
export type WhatsappConnectBusinessAccount400 = MalformedRequestError;
export const WhatsappConnectBusinessAccount400 = MalformedRequestError;
export type WhatsappConnectBusinessAccount401 = UnauthorizedError;
export const WhatsappConnectBusinessAccount401 = UnauthorizedError;
export type WhatsappConnectBusinessAccount402 = PaymentRequiredError;
export const WhatsappConnectBusinessAccount402 = PaymentRequiredError;
export type WhatsappConnectBusinessAccount403 = ForbiddenError;
export const WhatsappConnectBusinessAccount403 = ForbiddenError;
export type WhatsappConnectBusinessAccount404 = ResourceNotFoundError;
export const WhatsappConnectBusinessAccount404 = ResourceNotFoundError;
export type WhatsappConnectBusinessAccount409 = ConflictError;
export const WhatsappConnectBusinessAccount409 = ConflictError;
export type WhatsappConnectBusinessAccount422 = ValidationError;
export const WhatsappConnectBusinessAccount422 = ValidationError;
export type WhatsappConnectBusinessAccount500 = InternalError | CredentialsError;
export const WhatsappConnectBusinessAccount500 = /* @__PURE__ */ (() =>
  Schema.Union([InternalError, CredentialsError]))();
export type WhatsappConnectBusinessAccount502 = WhatsAppChannelError | BillingProviderError;
export const WhatsappConnectBusinessAccount502 = /* @__PURE__ */ (() =>
  Schema.Union([WhatsAppChannelError, BillingProviderError]))();
export type WhatsappConnectBusinessAccount504 = GatewayTimeoutError;
export const WhatsappConnectBusinessAccount504 = GatewayTimeoutError;
export type WhatsappGetBusinessAccountPathParams = {
  readonly accountId: WhatsAppBusinessAccountId;
};
export const WhatsappGetBusinessAccountPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ accountId: WhatsAppBusinessAccountId }))();
export type WhatsappGetBusinessAccount200 = {
  readonly id: WhatsAppBusinessAccountId;
  readonly organizationId: string;
  readonly namespaceId: NamespaceId | null;
  readonly phoneNumber: string;
  readonly phoneNumberId: string;
  readonly displayName: string;
  readonly whatsappBusinessAccountId: string;
  readonly verificationStatus: "pending" | "verified" | "failed" | "suspended";
  readonly credentialStatus: "active" | "reconnect_required";
  readonly tokenExpiresAt: string | null;
  readonly isDefault: boolean;
  readonly webhookUrl: string | null;
  readonly qualityRating: "green" | "yellow" | "red" | "unknown";
  readonly messagingLimit: string | null;
  readonly currentLimit: number;
  readonly businessPortfolioId: string | null;
  readonly businessAppConnectedAt: string | null;
  readonly businessAppDisconnectedAt: string | null;
  readonly businessAppDisconnectReason:
    | "partnerRemoved"
    | "offboarded"
    | "accountDisconnected"
    | "businessDowngrade"
    | "changeNumber"
    | "companionInactivity"
    | "primaryInactivity"
    | "userReRegistered"
    | null;
  readonly contactsSyncRequestedAt: string | null;
  readonly historySyncStatus: "requested" | "importing" | "completed" | "declined" | null;
  readonly historySyncProgress: number | null;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const WhatsappGetBusinessAccount200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: WhatsAppBusinessAccountId,
    organizationId: Schema.String,
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
    phoneNumber: Schema.String,
    phoneNumberId: Schema.String,
    displayName: Schema.String,
    whatsappBusinessAccountId: Schema.String,
    verificationStatus: Schema.Union([
      Schema.Literal("pending"),
      Schema.Literal("verified"),
      Schema.Literal("failed"),
      Schema.Literal("suspended"),
    ]),
    credentialStatus: Schema.Union([
      Schema.Literal("active"),
      Schema.Literal("reconnect_required"),
    ]),
    tokenExpiresAt: Schema.Union([Schema.String, Schema.Null]),
    isDefault: Schema.Boolean,
    webhookUrl: Schema.Union([Schema.String, Schema.Null]),
    qualityRating: Schema.Union([
      Schema.Literal("green"),
      Schema.Literal("yellow"),
      Schema.Literal("red"),
      Schema.Literal("unknown"),
    ]),
    messagingLimit: Schema.Union([Schema.String, Schema.Null]),
    currentLimit: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    businessPortfolioId: Schema.Union([Schema.String, Schema.Null]),
    businessAppConnectedAt: Schema.Union([Schema.String, Schema.Null]),
    businessAppDisconnectedAt: Schema.Union([Schema.String, Schema.Null]),
    businessAppDisconnectReason: Schema.Union([
      Schema.Union([
        Schema.Literal("partnerRemoved"),
        Schema.Literal("offboarded"),
        Schema.Literal("accountDisconnected"),
        Schema.Literal("businessDowngrade"),
        Schema.Literal("changeNumber"),
        Schema.Literal("companionInactivity"),
        Schema.Literal("primaryInactivity"),
        Schema.Literal("userReRegistered"),
      ]),
      Schema.Null,
    ]),
    contactsSyncRequestedAt: Schema.Union([Schema.String, Schema.Null]),
    historySyncStatus: Schema.Union([
      Schema.Union([
        Schema.Literal("requested"),
        Schema.Literal("importing"),
        Schema.Literal("completed"),
        Schema.Literal("declined"),
      ]),
      Schema.Null,
    ]),
    historySyncProgress: Schema.Union([
      Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        )
        .check(
          Schema.isLessThanOrEqualTo(100).annotate({
            expected: "a value less than or equal to 100",
          }),
        ),
      Schema.Null,
    ]),
    isActive: Schema.Boolean,
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }))();
export type WhatsappGetBusinessAccount400 = MalformedRequestError;
export const WhatsappGetBusinessAccount400 = MalformedRequestError;
export type WhatsappGetBusinessAccount401 = UnauthorizedError;
export const WhatsappGetBusinessAccount401 = UnauthorizedError;
export type WhatsappGetBusinessAccount403 = ForbiddenError;
export const WhatsappGetBusinessAccount403 = ForbiddenError;
export type WhatsappGetBusinessAccount404 = ResourceNotFoundError;
export const WhatsappGetBusinessAccount404 = ResourceNotFoundError;
export type WhatsappGetBusinessAccount422 = ValidationError;
export const WhatsappGetBusinessAccount422 = ValidationError;
export type WhatsappGetBusinessAccount500 = InternalError;
export const WhatsappGetBusinessAccount500 = InternalError;
export type WhatsappGetBusinessAccount504 = GatewayTimeoutError;
export const WhatsappGetBusinessAccount504 = GatewayTimeoutError;
export type WhatsappDisconnectBusinessAccountPathParams = {
  readonly accountId: WhatsAppBusinessAccountId;
};
export const WhatsappDisconnectBusinessAccountPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ accountId: WhatsAppBusinessAccountId }))();
export type WhatsappDisconnectBusinessAccount200 = { readonly success: true };
export const WhatsappDisconnectBusinessAccount200 = /* @__PURE__ */ (() =>
  Schema.Struct({ success: Schema.Literal(true) }))();
export type WhatsappDisconnectBusinessAccount400 = MalformedRequestError;
export const WhatsappDisconnectBusinessAccount400 = MalformedRequestError;
export type WhatsappDisconnectBusinessAccount401 = UnauthorizedError;
export const WhatsappDisconnectBusinessAccount401 = UnauthorizedError;
export type WhatsappDisconnectBusinessAccount403 = ForbiddenError;
export const WhatsappDisconnectBusinessAccount403 = ForbiddenError;
export type WhatsappDisconnectBusinessAccount404 = ResourceNotFoundError;
export const WhatsappDisconnectBusinessAccount404 = ResourceNotFoundError;
export type WhatsappDisconnectBusinessAccount422 = ValidationError;
export const WhatsappDisconnectBusinessAccount422 = ValidationError;
export type WhatsappDisconnectBusinessAccount500 = InternalError;
export const WhatsappDisconnectBusinessAccount500 = InternalError;
export type WhatsappDisconnectBusinessAccount504 = GatewayTimeoutError;
export const WhatsappDisconnectBusinessAccount504 = GatewayTimeoutError;
export type WhatsappUpdateBusinessAccountPathParams = {
  readonly accountId: WhatsAppBusinessAccountId;
};
export const WhatsappUpdateBusinessAccountPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ accountId: WhatsAppBusinessAccountId }))();
export type WhatsappUpdateBusinessAccountRequestJson = {
  readonly displayName?: string | null;
  readonly webhookUrl?: string | null;
};
export const WhatsappUpdateBusinessAccountRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    displayName: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        ),
        Schema.Null,
      ]),
    ),
    webhookUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type WhatsappUpdateBusinessAccount200 = {
  readonly id: WhatsAppBusinessAccountId;
  readonly organizationId: string;
  readonly namespaceId: NamespaceId | null;
  readonly phoneNumber: string;
  readonly phoneNumberId: string;
  readonly displayName: string;
  readonly whatsappBusinessAccountId: string;
  readonly verificationStatus: "pending" | "verified" | "failed" | "suspended";
  readonly credentialStatus: "active" | "reconnect_required";
  readonly tokenExpiresAt: string | null;
  readonly isDefault: boolean;
  readonly webhookUrl: string | null;
  readonly qualityRating: "green" | "yellow" | "red" | "unknown";
  readonly messagingLimit: string | null;
  readonly currentLimit: number;
  readonly businessPortfolioId: string | null;
  readonly businessAppConnectedAt: string | null;
  readonly businessAppDisconnectedAt: string | null;
  readonly businessAppDisconnectReason:
    | "partnerRemoved"
    | "offboarded"
    | "accountDisconnected"
    | "businessDowngrade"
    | "changeNumber"
    | "companionInactivity"
    | "primaryInactivity"
    | "userReRegistered"
    | null;
  readonly contactsSyncRequestedAt: string | null;
  readonly historySyncStatus: "requested" | "importing" | "completed" | "declined" | null;
  readonly historySyncProgress: number | null;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const WhatsappUpdateBusinessAccount200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: WhatsAppBusinessAccountId,
    organizationId: Schema.String,
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
    phoneNumber: Schema.String,
    phoneNumberId: Schema.String,
    displayName: Schema.String,
    whatsappBusinessAccountId: Schema.String,
    verificationStatus: Schema.Union([
      Schema.Literal("pending"),
      Schema.Literal("verified"),
      Schema.Literal("failed"),
      Schema.Literal("suspended"),
    ]),
    credentialStatus: Schema.Union([
      Schema.Literal("active"),
      Schema.Literal("reconnect_required"),
    ]),
    tokenExpiresAt: Schema.Union([Schema.String, Schema.Null]),
    isDefault: Schema.Boolean,
    webhookUrl: Schema.Union([Schema.String, Schema.Null]),
    qualityRating: Schema.Union([
      Schema.Literal("green"),
      Schema.Literal("yellow"),
      Schema.Literal("red"),
      Schema.Literal("unknown"),
    ]),
    messagingLimit: Schema.Union([Schema.String, Schema.Null]),
    currentLimit: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    businessPortfolioId: Schema.Union([Schema.String, Schema.Null]),
    businessAppConnectedAt: Schema.Union([Schema.String, Schema.Null]),
    businessAppDisconnectedAt: Schema.Union([Schema.String, Schema.Null]),
    businessAppDisconnectReason: Schema.Union([
      Schema.Union([
        Schema.Literal("partnerRemoved"),
        Schema.Literal("offboarded"),
        Schema.Literal("accountDisconnected"),
        Schema.Literal("businessDowngrade"),
        Schema.Literal("changeNumber"),
        Schema.Literal("companionInactivity"),
        Schema.Literal("primaryInactivity"),
        Schema.Literal("userReRegistered"),
      ]),
      Schema.Null,
    ]),
    contactsSyncRequestedAt: Schema.Union([Schema.String, Schema.Null]),
    historySyncStatus: Schema.Union([
      Schema.Union([
        Schema.Literal("requested"),
        Schema.Literal("importing"),
        Schema.Literal("completed"),
        Schema.Literal("declined"),
      ]),
      Schema.Null,
    ]),
    historySyncProgress: Schema.Union([
      Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        )
        .check(
          Schema.isLessThanOrEqualTo(100).annotate({
            expected: "a value less than or equal to 100",
          }),
        ),
      Schema.Null,
    ]),
    isActive: Schema.Boolean,
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }))();
export type WhatsappUpdateBusinessAccount400 = MalformedRequestError;
export const WhatsappUpdateBusinessAccount400 = MalformedRequestError;
export type WhatsappUpdateBusinessAccount401 = UnauthorizedError;
export const WhatsappUpdateBusinessAccount401 = UnauthorizedError;
export type WhatsappUpdateBusinessAccount403 = ForbiddenError;
export const WhatsappUpdateBusinessAccount403 = ForbiddenError;
export type WhatsappUpdateBusinessAccount404 = ResourceNotFoundError;
export const WhatsappUpdateBusinessAccount404 = ResourceNotFoundError;
export type WhatsappUpdateBusinessAccount422 = ValidationError;
export const WhatsappUpdateBusinessAccount422 = ValidationError;
export type WhatsappUpdateBusinessAccount500 = InternalError;
export const WhatsappUpdateBusinessAccount500 = InternalError;
export type WhatsappUpdateBusinessAccount504 = GatewayTimeoutError;
export const WhatsappUpdateBusinessAccount504 = GatewayTimeoutError;
export type WhatsappSetDefaultBusinessAccountPathParams = {
  readonly accountId: WhatsAppBusinessAccountId;
};
export const WhatsappSetDefaultBusinessAccountPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ accountId: WhatsAppBusinessAccountId }))();
export type WhatsappSetDefaultBusinessAccount200 = {
  readonly id: WhatsAppBusinessAccountId;
  readonly organizationId: string;
  readonly namespaceId: NamespaceId | null;
  readonly phoneNumber: string;
  readonly phoneNumberId: string;
  readonly displayName: string;
  readonly whatsappBusinessAccountId: string;
  readonly verificationStatus: "pending" | "verified" | "failed" | "suspended";
  readonly credentialStatus: "active" | "reconnect_required";
  readonly tokenExpiresAt: string | null;
  readonly isDefault: boolean;
  readonly webhookUrl: string | null;
  readonly qualityRating: "green" | "yellow" | "red" | "unknown";
  readonly messagingLimit: string | null;
  readonly currentLimit: number;
  readonly businessPortfolioId: string | null;
  readonly businessAppConnectedAt: string | null;
  readonly businessAppDisconnectedAt: string | null;
  readonly businessAppDisconnectReason:
    | "partnerRemoved"
    | "offboarded"
    | "accountDisconnected"
    | "businessDowngrade"
    | "changeNumber"
    | "companionInactivity"
    | "primaryInactivity"
    | "userReRegistered"
    | null;
  readonly contactsSyncRequestedAt: string | null;
  readonly historySyncStatus: "requested" | "importing" | "completed" | "declined" | null;
  readonly historySyncProgress: number | null;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const WhatsappSetDefaultBusinessAccount200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: WhatsAppBusinessAccountId,
    organizationId: Schema.String,
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
    phoneNumber: Schema.String,
    phoneNumberId: Schema.String,
    displayName: Schema.String,
    whatsappBusinessAccountId: Schema.String,
    verificationStatus: Schema.Union([
      Schema.Literal("pending"),
      Schema.Literal("verified"),
      Schema.Literal("failed"),
      Schema.Literal("suspended"),
    ]),
    credentialStatus: Schema.Union([
      Schema.Literal("active"),
      Schema.Literal("reconnect_required"),
    ]),
    tokenExpiresAt: Schema.Union([Schema.String, Schema.Null]),
    isDefault: Schema.Boolean,
    webhookUrl: Schema.Union([Schema.String, Schema.Null]),
    qualityRating: Schema.Union([
      Schema.Literal("green"),
      Schema.Literal("yellow"),
      Schema.Literal("red"),
      Schema.Literal("unknown"),
    ]),
    messagingLimit: Schema.Union([Schema.String, Schema.Null]),
    currentLimit: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    businessPortfolioId: Schema.Union([Schema.String, Schema.Null]),
    businessAppConnectedAt: Schema.Union([Schema.String, Schema.Null]),
    businessAppDisconnectedAt: Schema.Union([Schema.String, Schema.Null]),
    businessAppDisconnectReason: Schema.Union([
      Schema.Union([
        Schema.Literal("partnerRemoved"),
        Schema.Literal("offboarded"),
        Schema.Literal("accountDisconnected"),
        Schema.Literal("businessDowngrade"),
        Schema.Literal("changeNumber"),
        Schema.Literal("companionInactivity"),
        Schema.Literal("primaryInactivity"),
        Schema.Literal("userReRegistered"),
      ]),
      Schema.Null,
    ]),
    contactsSyncRequestedAt: Schema.Union([Schema.String, Schema.Null]),
    historySyncStatus: Schema.Union([
      Schema.Union([
        Schema.Literal("requested"),
        Schema.Literal("importing"),
        Schema.Literal("completed"),
        Schema.Literal("declined"),
      ]),
      Schema.Null,
    ]),
    historySyncProgress: Schema.Union([
      Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        )
        .check(
          Schema.isLessThanOrEqualTo(100).annotate({
            expected: "a value less than or equal to 100",
          }),
        ),
      Schema.Null,
    ]),
    isActive: Schema.Boolean,
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }))();
export type WhatsappSetDefaultBusinessAccount400 = MalformedRequestError;
export const WhatsappSetDefaultBusinessAccount400 = MalformedRequestError;
export type WhatsappSetDefaultBusinessAccount401 = UnauthorizedError;
export const WhatsappSetDefaultBusinessAccount401 = UnauthorizedError;
export type WhatsappSetDefaultBusinessAccount403 = ForbiddenError;
export const WhatsappSetDefaultBusinessAccount403 = ForbiddenError;
export type WhatsappSetDefaultBusinessAccount404 = ResourceNotFoundError;
export const WhatsappSetDefaultBusinessAccount404 = ResourceNotFoundError;
export type WhatsappSetDefaultBusinessAccount422 = ValidationError;
export const WhatsappSetDefaultBusinessAccount422 = ValidationError;
export type WhatsappSetDefaultBusinessAccount500 = InternalError;
export const WhatsappSetDefaultBusinessAccount500 = InternalError;
export type WhatsappSetDefaultBusinessAccount504 = GatewayTimeoutError;
export const WhatsappSetDefaultBusinessAccount504 = GatewayTimeoutError;
export type WhatsappSyncAccountStatusPathParams = { readonly accountId: WhatsAppBusinessAccountId };
export const WhatsappSyncAccountStatusPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ accountId: WhatsAppBusinessAccountId }))();
export type WhatsappSyncAccountStatus200 = {
  readonly id: WhatsAppBusinessAccountId;
  readonly qualityRating: "green" | "yellow" | "red" | "unknown";
  readonly messagingLimit: string | null;
  readonly currentLimit: number;
  readonly businessPortfolioId: string | null;
  readonly verificationStatus: "pending" | "verified" | "failed" | "suspended";
  readonly syncedAt: string;
};
export const WhatsappSyncAccountStatus200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: WhatsAppBusinessAccountId,
    qualityRating: Schema.Union([
      Schema.Literal("green"),
      Schema.Literal("yellow"),
      Schema.Literal("red"),
      Schema.Literal("unknown"),
    ]),
    messagingLimit: Schema.Union([Schema.String, Schema.Null]),
    currentLimit: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    businessPortfolioId: Schema.Union([Schema.String, Schema.Null]),
    verificationStatus: Schema.Union([
      Schema.Literal("pending"),
      Schema.Literal("verified"),
      Schema.Literal("failed"),
      Schema.Literal("suspended"),
    ]),
    syncedAt: Schema.String,
  }))();
export type WhatsappSyncAccountStatus400 = MalformedRequestError;
export const WhatsappSyncAccountStatus400 = MalformedRequestError;
export type WhatsappSyncAccountStatus401 = UnauthorizedError;
export const WhatsappSyncAccountStatus401 = UnauthorizedError;
export type WhatsappSyncAccountStatus403 = ForbiddenError;
export const WhatsappSyncAccountStatus403 = ForbiddenError;
export type WhatsappSyncAccountStatus404 = ResourceNotFoundError;
export const WhatsappSyncAccountStatus404 = ResourceNotFoundError;
export type WhatsappSyncAccountStatus422 = ValidationError;
export const WhatsappSyncAccountStatus422 = ValidationError;
export type WhatsappSyncAccountStatus500 = InternalError | CredentialsError;
export const WhatsappSyncAccountStatus500 = /* @__PURE__ */ (() =>
  Schema.Union([InternalError, CredentialsError]))();
export type WhatsappSyncAccountStatus502 = WhatsAppChannelError;
export const WhatsappSyncAccountStatus502 = WhatsAppChannelError;
export type WhatsappSyncAccountStatus504 = GatewayTimeoutError;
export const WhatsappSyncAccountStatus504 = GatewayTimeoutError;
export type WhatsappGetMediaDownloadUrlPathParams = { readonly deliveryId: MessageDeliveryId };
export const WhatsappGetMediaDownloadUrlPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ deliveryId: MessageDeliveryId }))();
export type WhatsappGetMediaDownloadUrl200 = {
  readonly url: __SamvaRuntimeSensitiveString;
  readonly expiresAt: string;
};
export const WhatsappGetMediaDownloadUrl200 = /* @__PURE__ */ (() =>
  Schema.Struct({ url: __SamvaRuntimeSensitiveString, expiresAt: Schema.String }))();
export type WhatsappGetMediaDownloadUrl400 = MalformedRequestError;
export const WhatsappGetMediaDownloadUrl400 = MalformedRequestError;
export type WhatsappGetMediaDownloadUrl401 = UnauthorizedError;
export const WhatsappGetMediaDownloadUrl401 = UnauthorizedError;
export type WhatsappGetMediaDownloadUrl403 = ForbiddenError;
export const WhatsappGetMediaDownloadUrl403 = ForbiddenError;
export type WhatsappGetMediaDownloadUrl404 = ResourceNotFoundError;
export const WhatsappGetMediaDownloadUrl404 = ResourceNotFoundError;
export type WhatsappGetMediaDownloadUrl422 = ValidationError;
export const WhatsappGetMediaDownloadUrl422 = ValidationError;
export type WhatsappGetMediaDownloadUrl500 = InternalError;
export const WhatsappGetMediaDownloadUrl500 = InternalError;
export type WhatsappGetMediaDownloadUrl504 = GatewayTimeoutError;
export const WhatsappGetMediaDownloadUrl504 = GatewayTimeoutError;
export type WhatsappGetServiceWindowBillingQuery = {
  readonly serviceWindowId: WhatsAppServiceWindowId;
};
export const WhatsappGetServiceWindowBillingQuery = /* @__PURE__ */ (() =>
  Schema.Struct({ serviceWindowId: WhatsAppServiceWindowId }))();
export type WhatsappGetServiceWindowBilling200 = {
  readonly totalMessages: number;
  readonly totalFreeMessages: number;
  readonly totalPaidMessages: number;
  readonly estimatedProviderCosts: ReadonlyArray<MoneyAmount>;
};
export const WhatsappGetServiceWindowBilling200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    totalMessages: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    totalFreeMessages: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    totalPaidMessages: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    estimatedProviderCosts: Schema.Array(MoneyAmount),
  }))();
export type WhatsappGetServiceWindowBilling400 = MalformedRequestError;
export const WhatsappGetServiceWindowBilling400 = MalformedRequestError;
export type WhatsappGetServiceWindowBilling401 = UnauthorizedError;
export const WhatsappGetServiceWindowBilling401 = UnauthorizedError;
export type WhatsappGetServiceWindowBilling403 = ForbiddenError;
export const WhatsappGetServiceWindowBilling403 = ForbiddenError;
export type WhatsappGetServiceWindowBilling404 = ResourceNotFoundError;
export const WhatsappGetServiceWindowBilling404 = ResourceNotFoundError;
export type WhatsappGetServiceWindowBilling422 = ValidationError;
export const WhatsappGetServiceWindowBilling422 = ValidationError;
export type WhatsappGetServiceWindowBilling500 = InternalError;
export const WhatsappGetServiceWindowBilling500 = InternalError;
export type WhatsappGetServiceWindowBilling504 = GatewayTimeoutError;
export const WhatsappGetServiceWindowBilling504 = GatewayTimeoutError;
export type WhatsappGetServiceWindowStatusQuery = {
  readonly customerPhone: string;
  readonly businessPhone: string;
};
export const WhatsappGetServiceWindowStatusQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    customerPhone: Schema.String.check(
      Schema.isPattern(new globalThis.RegExp("^\\+[1-9]\\d{1,14}$", "u")).annotate({
        expected: "a string matching the RegExp ^\\+[1-9]\\d{1,14}$",
      }),
    ),
    businessPhone: Schema.String.check(
      Schema.isPattern(new globalThis.RegExp("^\\+[1-9]\\d{1,14}$", "u")).annotate({
        expected: "a string matching the RegExp ^\\+[1-9]\\d{1,14}$",
      }),
    ),
  }))();
export type WhatsappGetServiceWindowStatus200 = {
  readonly serviceWindowId: WhatsAppServiceWindowId;
  readonly isServiceWindowActive: boolean;
  readonly isFreeEntryPointActive: boolean;
  readonly serviceWindowExpiresAt: string | null;
  readonly freeEntryPointExpiresAt: string | null;
};
export const WhatsappGetServiceWindowStatus200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    serviceWindowId: WhatsAppServiceWindowId,
    isServiceWindowActive: Schema.Boolean,
    isFreeEntryPointActive: Schema.Boolean,
    serviceWindowExpiresAt: Schema.Union([Schema.String, Schema.Null]),
    freeEntryPointExpiresAt: Schema.Union([Schema.String, Schema.Null]),
  }))();
export type WhatsappGetServiceWindowStatus400 = MalformedRequestError;
export const WhatsappGetServiceWindowStatus400 = MalformedRequestError;
export type WhatsappGetServiceWindowStatus401 = UnauthorizedError;
export const WhatsappGetServiceWindowStatus401 = UnauthorizedError;
export type WhatsappGetServiceWindowStatus403 = ForbiddenError;
export const WhatsappGetServiceWindowStatus403 = ForbiddenError;
export type WhatsappGetServiceWindowStatus404 = ResourceNotFoundError;
export const WhatsappGetServiceWindowStatus404 = ResourceNotFoundError;
export type WhatsappGetServiceWindowStatus422 = ValidationError;
export const WhatsappGetServiceWindowStatus422 = ValidationError;
export type WhatsappGetServiceWindowStatus500 = InternalError;
export const WhatsappGetServiceWindowStatus500 = InternalError;
export type WhatsappGetServiceWindowStatus504 = GatewayTimeoutError;
export const WhatsappGetServiceWindowStatus504 = GatewayTimeoutError;
export type WhatsappGetStatsQuery = { readonly startDate?: string; readonly endDate?: string };
export const WhatsappGetStatsQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    startDate: Schema.optionalKey(Schema.String),
    endDate: Schema.optionalKey(Schema.String),
  }))();
export type WhatsappGetStats200 = {
  readonly totalSent: number;
  readonly totalDelivered: number;
  readonly totalRead: number;
  readonly totalFailed: number;
  readonly deliveryRate: number;
  readonly readRate: number;
  readonly failureRate: number;
};
export const WhatsappGetStats200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    totalSent: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    totalDelivered: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    totalRead: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    totalFailed: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    deliveryRate: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    readRate: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    failureRate: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
  }))();
export type WhatsappGetStats400 = MalformedRequestError;
export const WhatsappGetStats400 = MalformedRequestError;
export type WhatsappGetStats401 = UnauthorizedError;
export const WhatsappGetStats401 = UnauthorizedError;
export type WhatsappGetStats403 = ForbiddenError;
export const WhatsappGetStats403 = ForbiddenError;
export type WhatsappGetStats422 = ValidationError;
export const WhatsappGetStats422 = ValidationError;
export type WhatsappGetStats500 = InternalError;
export const WhatsappGetStats500 = InternalError;
export type WhatsappGetStats504 = GatewayTimeoutError;
export const WhatsappGetStats504 = GatewayTimeoutError;
export type WhatsappGetTemplateStatsQuery = {
  readonly startDate?: string;
  readonly endDate?: string;
  readonly templateId?: TemplateId;
  readonly campaignId?: CampaignId;
  readonly journeyId?: JourneyId;
};
export const WhatsappGetTemplateStatsQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    startDate: Schema.optionalKey(Schema.String),
    endDate: Schema.optionalKey(Schema.String),
    templateId: Schema.optionalKey(TemplateId),
    campaignId: Schema.optionalKey(CampaignId),
    journeyId: Schema.optionalKey(JourneyId),
  }))();
export type WhatsappGetTemplateStats200 = WhatsAppTemplateStats;
export const WhatsappGetTemplateStats200 = WhatsAppTemplateStats;
export type WhatsappGetTemplateStats400 = MalformedRequestError;
export const WhatsappGetTemplateStats400 = MalformedRequestError;
export type WhatsappGetTemplateStats401 = UnauthorizedError;
export const WhatsappGetTemplateStats401 = UnauthorizedError;
export type WhatsappGetTemplateStats403 = ForbiddenError;
export const WhatsappGetTemplateStats403 = ForbiddenError;
export type WhatsappGetTemplateStats422 = ValidationError;
export const WhatsappGetTemplateStats422 = ValidationError;
export type WhatsappGetTemplateStats500 = InternalError;
export const WhatsappGetTemplateStats500 = InternalError;
export type WhatsappGetTemplateStats504 = GatewayTimeoutError;
export const WhatsappGetTemplateStats504 = GatewayTimeoutError;

export class WhatsAppGroup extends HttpApiGroup.make("WhatsApp")
  .add(
    HttpApiEndpoint.get("whatsappListBusinessAccounts", "/v1/whatsapp/business-accounts", {
      query: WhatsappListBusinessAccountsQuery,
      success: WhatsappListBusinessAccounts200,
      error: [
        WhatsappListBusinessAccounts400.pipe(HttpApiSchema.status(400)),
        WhatsappListBusinessAccounts401.pipe(HttpApiSchema.status(401)),
        WhatsappListBusinessAccounts403.pipe(HttpApiSchema.status(403)),
        WhatsappListBusinessAccounts422.pipe(HttpApiSchema.status(422)),
        WhatsappListBusinessAccounts500,
        WhatsappListBusinessAccounts504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsapp.listBusinessAccounts")
      .annotate(OpenApi.Summary, "List WhatsApp business accounts")
      .annotate(
        OpenApi.Description,
        "Lists connected WhatsApp business accounts, newest first. Pass nextCursor back as cursor to continue.",
      ),
    HttpApiEndpoint.post("whatsappConnectBusinessAccount", "/v1/whatsapp/business-accounts", {
      payload: WhatsappConnectBusinessAccountRequestJson,
      success: WhatsappConnectBusinessAccount201.pipe(HttpApiSchema.status(201)),
      error: [
        WhatsappConnectBusinessAccount400.pipe(HttpApiSchema.status(400)),
        WhatsappConnectBusinessAccount401.pipe(HttpApiSchema.status(401)),
        WhatsappConnectBusinessAccount402.pipe(HttpApiSchema.status(402)),
        WhatsappConnectBusinessAccount403.pipe(HttpApiSchema.status(403)),
        WhatsappConnectBusinessAccount404.pipe(HttpApiSchema.status(404)),
        WhatsappConnectBusinessAccount409.pipe(HttpApiSchema.status(409)),
        WhatsappConnectBusinessAccount422.pipe(HttpApiSchema.status(422)),
        WhatsappConnectBusinessAccount500,
        WhatsappConnectBusinessAccount502.pipe(HttpApiSchema.status(502)),
        WhatsappConnectBusinessAccount504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsapp.connectBusinessAccount")
      .annotate(OpenApi.Summary, "Connect a WhatsApp business account")
      .annotate(
        OpenApi.Description,
        "Completes embedded signup: exchanges its code for the business's Meta token, checks the token grants Samva both WhatsApp permissions over the WABA, subscribes Samva to the WABA's webhooks, and registers the phone number with the Cloud API. A number that stays on the WhatsApp Business app (coexistence) is already registered, so it skips registration and Samva asks Meta to sync its contacts and chat history. A number Meta has not verified yet connects as pending; sync it once verification finishes.",
      ),
    HttpApiEndpoint.get("whatsappGetBusinessAccount", "/v1/whatsapp/business-accounts/:accountId", {
      params: WhatsappGetBusinessAccountPathParams,
      success: WhatsappGetBusinessAccount200,
      error: [
        WhatsappGetBusinessAccount400.pipe(HttpApiSchema.status(400)),
        WhatsappGetBusinessAccount401.pipe(HttpApiSchema.status(401)),
        WhatsappGetBusinessAccount403.pipe(HttpApiSchema.status(403)),
        WhatsappGetBusinessAccount404.pipe(HttpApiSchema.status(404)),
        WhatsappGetBusinessAccount422.pipe(HttpApiSchema.status(422)),
        WhatsappGetBusinessAccount500,
        WhatsappGetBusinessAccount504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsapp.getBusinessAccount")
      .annotate(OpenApi.Summary, "Get a WhatsApp business account")
      .annotate(
        OpenApi.Description,
        "Returns a single connected WhatsApp business account by its identifier.",
      ),
    HttpApiEndpoint.delete(
      "whatsappDisconnectBusinessAccount",
      "/v1/whatsapp/business-accounts/:accountId",
      {
        params: WhatsappDisconnectBusinessAccountPathParams,
        success: WhatsappDisconnectBusinessAccount200,
        error: [
          WhatsappDisconnectBusinessAccount400.pipe(HttpApiSchema.status(400)),
          WhatsappDisconnectBusinessAccount401.pipe(HttpApiSchema.status(401)),
          WhatsappDisconnectBusinessAccount403.pipe(HttpApiSchema.status(403)),
          WhatsappDisconnectBusinessAccount404.pipe(HttpApiSchema.status(404)),
          WhatsappDisconnectBusinessAccount422.pipe(HttpApiSchema.status(422)),
          WhatsappDisconnectBusinessAccount500,
          WhatsappDisconnectBusinessAccount504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsapp.disconnectBusinessAccount")
      .annotate(OpenApi.Summary, "Disconnect a WhatsApp business account")
      .annotate(
        OpenApi.Description,
        "Disconnects a WhatsApp business account from the organization.",
      ),
    HttpApiEndpoint.patch(
      "whatsappUpdateBusinessAccount",
      "/v1/whatsapp/business-accounts/:accountId",
      {
        params: WhatsappUpdateBusinessAccountPathParams,
        payload: WhatsappUpdateBusinessAccountRequestJson,
        success: WhatsappUpdateBusinessAccount200,
        error: [
          WhatsappUpdateBusinessAccount400.pipe(HttpApiSchema.status(400)),
          WhatsappUpdateBusinessAccount401.pipe(HttpApiSchema.status(401)),
          WhatsappUpdateBusinessAccount403.pipe(HttpApiSchema.status(403)),
          WhatsappUpdateBusinessAccount404.pipe(HttpApiSchema.status(404)),
          WhatsappUpdateBusinessAccount422.pipe(HttpApiSchema.status(422)),
          WhatsappUpdateBusinessAccount500,
          WhatsappUpdateBusinessAccount504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsapp.updateBusinessAccount")
      .annotate(OpenApi.Summary, "Update a WhatsApp business account")
      .annotate(
        OpenApi.Description,
        "Updates the display name or webhook settings of a connected WhatsApp business account.",
      ),
    HttpApiEndpoint.post(
      "whatsappSetDefaultBusinessAccount",
      "/v1/whatsapp/business-accounts/:accountId/set-default",
      {
        params: WhatsappSetDefaultBusinessAccountPathParams,
        success: WhatsappSetDefaultBusinessAccount200,
        error: [
          WhatsappSetDefaultBusinessAccount400.pipe(HttpApiSchema.status(400)),
          WhatsappSetDefaultBusinessAccount401.pipe(HttpApiSchema.status(401)),
          WhatsappSetDefaultBusinessAccount403.pipe(HttpApiSchema.status(403)),
          WhatsappSetDefaultBusinessAccount404.pipe(HttpApiSchema.status(404)),
          WhatsappSetDefaultBusinessAccount422.pipe(HttpApiSchema.status(422)),
          WhatsappSetDefaultBusinessAccount500,
          WhatsappSetDefaultBusinessAccount504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsapp.setDefaultBusinessAccount")
      .annotate(OpenApi.Summary, "Set the default WhatsApp business account")
      .annotate(
        OpenApi.Description,
        "Marks a connected WhatsApp business account as the organization's default and returns it.",
      ),
    HttpApiEndpoint.post(
      "whatsappSyncAccountStatus",
      "/v1/whatsapp/business-accounts/:accountId/sync",
      {
        params: WhatsappSyncAccountStatusPathParams,
        success: WhatsappSyncAccountStatus200,
        error: [
          WhatsappSyncAccountStatus400.pipe(HttpApiSchema.status(400)),
          WhatsappSyncAccountStatus401.pipe(HttpApiSchema.status(401)),
          WhatsappSyncAccountStatus403.pipe(HttpApiSchema.status(403)),
          WhatsappSyncAccountStatus404.pipe(HttpApiSchema.status(404)),
          WhatsappSyncAccountStatus422.pipe(HttpApiSchema.status(422)),
          WhatsappSyncAccountStatus500,
          WhatsappSyncAccountStatus502.pipe(HttpApiSchema.status(502)),
          WhatsappSyncAccountStatus504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsapp.syncAccountStatus")
      .annotate(OpenApi.Summary, "Sync a WhatsApp business account status")
      .annotate(
        OpenApi.Description,
        "Reads the number's quality rating, messaging limit, and registration from Meta, and registers the number with the Cloud API if it is verified but not yet registered.",
      ),
    HttpApiEndpoint.get(
      "whatsappGetMediaDownloadUrl",
      "/v1/whatsapp/media/:deliveryId/download-url",
      {
        params: WhatsappGetMediaDownloadUrlPathParams,
        success: WhatsappGetMediaDownloadUrl200,
        error: [
          WhatsappGetMediaDownloadUrl400.pipe(HttpApiSchema.status(400)),
          WhatsappGetMediaDownloadUrl401.pipe(HttpApiSchema.status(401)),
          WhatsappGetMediaDownloadUrl403.pipe(HttpApiSchema.status(403)),
          WhatsappGetMediaDownloadUrl404.pipe(HttpApiSchema.status(404)),
          WhatsappGetMediaDownloadUrl422.pipe(HttpApiSchema.status(422)),
          WhatsappGetMediaDownloadUrl500,
          WhatsappGetMediaDownloadUrl504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsapp.getMediaDownloadUrl")
      .annotate(OpenApi.Summary, "Get a WhatsApp media download URL")
      .annotate(
        OpenApi.Description,
        "Returns a short-lived URL for the media an inbound WhatsApp delivery carried, when Samva stored it.",
      ),
    HttpApiEndpoint.get("whatsappGetServiceWindowBilling", "/v1/whatsapp/service-window/billing", {
      query: WhatsappGetServiceWindowBillingQuery,
      success: WhatsappGetServiceWindowBilling200,
      error: [
        WhatsappGetServiceWindowBilling400.pipe(HttpApiSchema.status(400)),
        WhatsappGetServiceWindowBilling401.pipe(HttpApiSchema.status(401)),
        WhatsappGetServiceWindowBilling403.pipe(HttpApiSchema.status(403)),
        WhatsappGetServiceWindowBilling404.pipe(HttpApiSchema.status(404)),
        WhatsappGetServiceWindowBilling422.pipe(HttpApiSchema.status(422)),
        WhatsappGetServiceWindowBilling500,
        WhatsappGetServiceWindowBilling504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsapp.getServiceWindowBilling")
      .annotate(OpenApi.Summary, "Get WhatsApp service window billing")
      .annotate(
        OpenApi.Description,
        "Returns message counts and the estimated Meta cost for a WhatsApp service window.",
      ),
    HttpApiEndpoint.get("whatsappGetServiceWindowStatus", "/v1/whatsapp/service-window/status", {
      query: WhatsappGetServiceWindowStatusQuery,
      success: WhatsappGetServiceWindowStatus200,
      error: [
        WhatsappGetServiceWindowStatus400.pipe(HttpApiSchema.status(400)),
        WhatsappGetServiceWindowStatus401.pipe(HttpApiSchema.status(401)),
        WhatsappGetServiceWindowStatus403.pipe(HttpApiSchema.status(403)),
        WhatsappGetServiceWindowStatus404.pipe(HttpApiSchema.status(404)),
        WhatsappGetServiceWindowStatus422.pipe(HttpApiSchema.status(422)),
        WhatsappGetServiceWindowStatus500,
        WhatsappGetServiceWindowStatus504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsapp.getServiceWindowStatus")
      .annotate(OpenApi.Summary, "Get WhatsApp service window status")
      .annotate(
        OpenApi.Description,
        "Returns whether the service window and free entry point are active for a customer and business phone pair.",
      ),
    HttpApiEndpoint.get("whatsappGetStats", "/v1/whatsapp/stats", {
      query: WhatsappGetStatsQuery,
      success: WhatsappGetStats200,
      error: [
        WhatsappGetStats400.pipe(HttpApiSchema.status(400)),
        WhatsappGetStats401.pipe(HttpApiSchema.status(401)),
        WhatsappGetStats403.pipe(HttpApiSchema.status(403)),
        WhatsappGetStats422.pipe(HttpApiSchema.status(422)),
        WhatsappGetStats500,
        WhatsappGetStats504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsapp.getStats")
      .annotate(OpenApi.Summary, "Get WhatsApp messaging stats")
      .annotate(
        OpenApi.Description,
        "Returns aggregate WhatsApp delivery, read, and failure statistics for the organization.",
      ),
    HttpApiEndpoint.get("whatsappGetTemplateStats", "/v1/whatsapp/templates/stats", {
      query: WhatsappGetTemplateStatsQuery,
      success: WhatsappGetTemplateStats200,
      error: [
        WhatsappGetTemplateStats400.pipe(HttpApiSchema.status(400)),
        WhatsappGetTemplateStats401.pipe(HttpApiSchema.status(401)),
        WhatsappGetTemplateStats403.pipe(HttpApiSchema.status(403)),
        WhatsappGetTemplateStats422.pipe(HttpApiSchema.status(422)),
        WhatsappGetTemplateStats500,
        WhatsappGetTemplateStats504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsapp.getTemplateStats")
      .annotate(OpenApi.Summary, "Get WhatsApp template stats")
      .annotate(
        OpenApi.Description,
        "Returns sent, delivered, read, and failed counts and Meta's estimated cost for each WhatsApp template, split by what sent it: a campaign, a journey step, or a direct send. Filter by template, campaign, journey, or the time the message was created.",
      ),
  )
  .annotate(
    OpenApi.Description,
    "WhatsApp Cloud API messaging, service windows, and business accounts",
  ) {}
