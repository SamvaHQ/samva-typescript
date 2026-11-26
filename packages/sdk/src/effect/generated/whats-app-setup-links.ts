// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  BillingProviderError,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  MalformedRequestError,
  NamespaceId,
  OrganizationId,
  PaymentRequiredError,
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
  WhatsAppBusinessAccountId,
  WhatsAppSetupLinkMetadata,
  WhatsAppSetupLinkRedirectUrl,
  WhatsAppSetupLinkUnavailableError,
  __SamvaRuntimeSensitiveString,
} from "./shared";

export type WhatsAppSetupLinkStatus = "pending" | "completed" | "revoked" | "expired";
export const WhatsAppSetupLinkStatus = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Literal("pending"),
    Schema.Literal("completed"),
    Schema.Literal("revoked"),
    Schema.Literal("expired"),
  ]).annotate({ identifier: "WhatsAppSetupLinkStatus" }))();
export type WhatsAppSetupLinkId = string & EffectBrand.Brand<"WhatsAppSetupLinkId">;
export const WhatsAppSetupLinkId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new globalThis.RegExp("^wasl_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^wasl_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "WhatsAppSetupLinkId",
    }),
  ).pipe(Schema.brand("WhatsAppSetupLinkId")))();
export type WhatsAppSetupLink = {
  readonly id: WhatsAppSetupLinkId;
  readonly organizationId: OrganizationId;
  readonly namespaceId: NamespaceId;
  readonly status: WhatsAppSetupLinkStatus;
  readonly redirectUrl: string | null;
  readonly metadata: WhatsAppSetupLinkMetadata;
  readonly expiresAt: string;
  readonly businessAccountId: WhatsAppBusinessAccountId | null;
  readonly completedAt: string | null;
  readonly revokedAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const WhatsAppSetupLink = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: WhatsAppSetupLinkId,
    organizationId: OrganizationId,
    namespaceId: NamespaceId,
    status: WhatsAppSetupLinkStatus,
    redirectUrl: Schema.Union([Schema.String, Schema.Null]),
    metadata: WhatsAppSetupLinkMetadata,
    expiresAt: Schema.String,
    businessAccountId: Schema.Union([WhatsAppBusinessAccountId, Schema.Null]),
    completedAt: Schema.Union([Schema.String, Schema.Null]),
    revokedAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "WhatsAppSetupLink" }))();
export type CreatedWhatsAppSetupLink = {
  readonly id: WhatsAppSetupLinkId;
  readonly organizationId: OrganizationId;
  readonly namespaceId: NamespaceId;
  readonly status: WhatsAppSetupLinkStatus;
  readonly redirectUrl: string | null;
  readonly metadata: WhatsAppSetupLinkMetadata;
  readonly expiresAt: string;
  readonly businessAccountId: WhatsAppBusinessAccountId | null;
  readonly completedAt: string | null;
  readonly revokedAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly url: __SamvaRuntimeSensitiveString;
};
export const CreatedWhatsAppSetupLink = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: WhatsAppSetupLinkId,
    organizationId: OrganizationId,
    namespaceId: NamespaceId,
    status: WhatsAppSetupLinkStatus,
    redirectUrl: Schema.Union([Schema.String, Schema.Null]),
    metadata: WhatsAppSetupLinkMetadata,
    expiresAt: Schema.String,
    businessAccountId: Schema.Union([WhatsAppBusinessAccountId, Schema.Null]),
    completedAt: Schema.Union([Schema.String, Schema.Null]),
    revokedAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
    url: __SamvaRuntimeSensitiveString,
  }).annotate({ identifier: "CreatedWhatsAppSetupLink" }))();
export type WhatsAppSetupLinkPage = {
  readonly items: ReadonlyArray<WhatsAppSetupLink>;
  readonly nextCursor: string | null;
};
export const WhatsAppSetupLinkPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(WhatsAppSetupLink),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "WhatsAppSetupLinkPage" }))();
export type WhatsappSetupLinksListQuery = {
  readonly limit?: number | null;
  readonly cursor?: string;
  readonly namespaceId?: NamespaceId;
  readonly status?: WhatsAppSetupLinkStatus;
};
export const WhatsappSetupLinksListQuery = /* @__PURE__ */ (() =>
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
    namespaceId: Schema.optionalKey(NamespaceId),
    status: Schema.optionalKey(WhatsAppSetupLinkStatus),
  }))();
export type WhatsappSetupLinksList200 = WhatsAppSetupLinkPage;
export const WhatsappSetupLinksList200 = WhatsAppSetupLinkPage;
export type WhatsappSetupLinksList400 = MalformedRequestError;
export const WhatsappSetupLinksList400 = MalformedRequestError;
export type WhatsappSetupLinksList401 = UnauthorizedError;
export const WhatsappSetupLinksList401 = UnauthorizedError;
export type WhatsappSetupLinksList403 = ForbiddenError;
export const WhatsappSetupLinksList403 = ForbiddenError;
export type WhatsappSetupLinksList422 = ValidationError;
export const WhatsappSetupLinksList422 = ValidationError;
export type WhatsappSetupLinksList500 = InternalError;
export const WhatsappSetupLinksList500 = InternalError;
export type WhatsappSetupLinksList504 = GatewayTimeoutError;
export const WhatsappSetupLinksList504 = GatewayTimeoutError;
export type WhatsappSetupLinksCreateRequestJson = {
  readonly namespaceId: NamespaceId;
  readonly redirectUrl?: WhatsAppSetupLinkRedirectUrl | null;
  readonly metadata?: WhatsAppSetupLinkMetadata | null;
  readonly expiresAt?: string | null;
};
export const WhatsappSetupLinksCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    namespaceId: NamespaceId,
    redirectUrl: Schema.optionalKey(Schema.Union([WhatsAppSetupLinkRedirectUrl, Schema.Null])),
    metadata: Schema.optionalKey(Schema.Union([WhatsAppSetupLinkMetadata, Schema.Null])),
    expiresAt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type WhatsappSetupLinksCreate201 = CreatedWhatsAppSetupLink;
export const WhatsappSetupLinksCreate201 = CreatedWhatsAppSetupLink;
export type WhatsappSetupLinksCreate400 = MalformedRequestError;
export const WhatsappSetupLinksCreate400 = MalformedRequestError;
export type WhatsappSetupLinksCreate401 = UnauthorizedError;
export const WhatsappSetupLinksCreate401 = UnauthorizedError;
export type WhatsappSetupLinksCreate402 = PaymentRequiredError;
export const WhatsappSetupLinksCreate402 = PaymentRequiredError;
export type WhatsappSetupLinksCreate403 = ForbiddenError;
export const WhatsappSetupLinksCreate403 = ForbiddenError;
export type WhatsappSetupLinksCreate404 = ResourceNotFoundError;
export const WhatsappSetupLinksCreate404 = ResourceNotFoundError;
export type WhatsappSetupLinksCreate422 = ValidationError;
export const WhatsappSetupLinksCreate422 = ValidationError;
export type WhatsappSetupLinksCreate500 = InternalError;
export const WhatsappSetupLinksCreate500 = InternalError;
export type WhatsappSetupLinksCreate502 = BillingProviderError;
export const WhatsappSetupLinksCreate502 = BillingProviderError;
export type WhatsappSetupLinksCreate504 = GatewayTimeoutError;
export const WhatsappSetupLinksCreate504 = GatewayTimeoutError;
export type WhatsappSetupLinksGetPathParams = { readonly linkId: WhatsAppSetupLinkId };
export const WhatsappSetupLinksGetPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ linkId: WhatsAppSetupLinkId }))();
export type WhatsappSetupLinksGet200 = WhatsAppSetupLink;
export const WhatsappSetupLinksGet200 = WhatsAppSetupLink;
export type WhatsappSetupLinksGet400 = MalformedRequestError;
export const WhatsappSetupLinksGet400 = MalformedRequestError;
export type WhatsappSetupLinksGet401 = UnauthorizedError;
export const WhatsappSetupLinksGet401 = UnauthorizedError;
export type WhatsappSetupLinksGet403 = ForbiddenError;
export const WhatsappSetupLinksGet403 = ForbiddenError;
export type WhatsappSetupLinksGet404 = ResourceNotFoundError;
export const WhatsappSetupLinksGet404 = ResourceNotFoundError;
export type WhatsappSetupLinksGet422 = ValidationError;
export const WhatsappSetupLinksGet422 = ValidationError;
export type WhatsappSetupLinksGet500 = InternalError;
export const WhatsappSetupLinksGet500 = InternalError;
export type WhatsappSetupLinksGet504 = GatewayTimeoutError;
export const WhatsappSetupLinksGet504 = GatewayTimeoutError;
export type WhatsappSetupLinksRevokePathParams = { readonly linkId: WhatsAppSetupLinkId };
export const WhatsappSetupLinksRevokePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ linkId: WhatsAppSetupLinkId }))();
export type WhatsappSetupLinksRevoke200 = WhatsAppSetupLink;
export const WhatsappSetupLinksRevoke200 = WhatsAppSetupLink;
export type WhatsappSetupLinksRevoke400 = MalformedRequestError;
export const WhatsappSetupLinksRevoke400 = MalformedRequestError;
export type WhatsappSetupLinksRevoke401 = UnauthorizedError;
export const WhatsappSetupLinksRevoke401 = UnauthorizedError;
export type WhatsappSetupLinksRevoke403 = ForbiddenError;
export const WhatsappSetupLinksRevoke403 = ForbiddenError;
export type WhatsappSetupLinksRevoke404 = ResourceNotFoundError;
export const WhatsappSetupLinksRevoke404 = ResourceNotFoundError;
export type WhatsappSetupLinksRevoke410 = WhatsAppSetupLinkUnavailableError;
export const WhatsappSetupLinksRevoke410 = WhatsAppSetupLinkUnavailableError;
export type WhatsappSetupLinksRevoke422 = ValidationError;
export const WhatsappSetupLinksRevoke422 = ValidationError;
export type WhatsappSetupLinksRevoke500 = InternalError;
export const WhatsappSetupLinksRevoke500 = InternalError;
export type WhatsappSetupLinksRevoke504 = GatewayTimeoutError;
export const WhatsappSetupLinksRevoke504 = GatewayTimeoutError;

export class WhatsAppSetupLinksGroup extends HttpApiGroup.make("WhatsApp setup links")
  .add(
    HttpApiEndpoint.get("whatsappSetupLinksList", "/v1/whatsapp/setup-links", {
      query: WhatsappSetupLinksListQuery,
      success: WhatsappSetupLinksList200,
      error: [
        WhatsappSetupLinksList400.pipe(HttpApiSchema.status(400)),
        WhatsappSetupLinksList401.pipe(HttpApiSchema.status(401)),
        WhatsappSetupLinksList403.pipe(HttpApiSchema.status(403)),
        WhatsappSetupLinksList422.pipe(HttpApiSchema.status(422)),
        WhatsappSetupLinksList500,
        WhatsappSetupLinksList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsappSetupLinks.list")
      .annotate(OpenApi.Summary, "List WhatsApp setup links")
      .annotate(
        OpenApi.Description,
        "Returns setup links newest first, by namespace and status when named.",
      ),
    HttpApiEndpoint.post("whatsappSetupLinksCreate", "/v1/whatsapp/setup-links", {
      payload: WhatsappSetupLinksCreateRequestJson,
      success: WhatsappSetupLinksCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        WhatsappSetupLinksCreate400.pipe(HttpApiSchema.status(400)),
        WhatsappSetupLinksCreate401.pipe(HttpApiSchema.status(401)),
        WhatsappSetupLinksCreate402.pipe(HttpApiSchema.status(402)),
        WhatsappSetupLinksCreate403.pipe(HttpApiSchema.status(403)),
        WhatsappSetupLinksCreate404.pipe(HttpApiSchema.status(404)),
        WhatsappSetupLinksCreate422.pipe(HttpApiSchema.status(422)),
        WhatsappSetupLinksCreate500,
        WhatsappSetupLinksCreate502.pipe(HttpApiSchema.status(502)),
        WhatsappSetupLinksCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsappSetupLinks.create")
      .annotate(OpenApi.Summary, "Create a WhatsApp setup link")
      .annotate(
        OpenApi.Description,
        "Creates a single-use link your customer opens to connect their WhatsApp number into the namespace, without a Samva account. The response carries the link's URL once; Samva keeps only a digest of its token. The link expires at `expiresAt`, at most 30 days ahead and 7 days when omitted.",
      ),
    HttpApiEndpoint.get("whatsappSetupLinksGet", "/v1/whatsapp/setup-links/:linkId", {
      params: WhatsappSetupLinksGetPathParams,
      success: WhatsappSetupLinksGet200,
      error: [
        WhatsappSetupLinksGet400.pipe(HttpApiSchema.status(400)),
        WhatsappSetupLinksGet401.pipe(HttpApiSchema.status(401)),
        WhatsappSetupLinksGet403.pipe(HttpApiSchema.status(403)),
        WhatsappSetupLinksGet404.pipe(HttpApiSchema.status(404)),
        WhatsappSetupLinksGet422.pipe(HttpApiSchema.status(422)),
        WhatsappSetupLinksGet500,
        WhatsappSetupLinksGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsappSetupLinks.get")
      .annotate(OpenApi.Summary, "Get a WhatsApp setup link")
      .annotate(OpenApi.Description, "Returns a setup link’s status and connection details."),
    HttpApiEndpoint.post("whatsappSetupLinksRevoke", "/v1/whatsapp/setup-links/:linkId/revoke", {
      params: WhatsappSetupLinksRevokePathParams,
      success: WhatsappSetupLinksRevoke200,
      error: [
        WhatsappSetupLinksRevoke400.pipe(HttpApiSchema.status(400)),
        WhatsappSetupLinksRevoke401.pipe(HttpApiSchema.status(401)),
        WhatsappSetupLinksRevoke403.pipe(HttpApiSchema.status(403)),
        WhatsappSetupLinksRevoke404.pipe(HttpApiSchema.status(404)),
        WhatsappSetupLinksRevoke410.pipe(HttpApiSchema.status(410)),
        WhatsappSetupLinksRevoke422.pipe(HttpApiSchema.status(422)),
        WhatsappSetupLinksRevoke500,
        WhatsappSetupLinksRevoke504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsappSetupLinks.revoke")
      .annotate(OpenApi.Summary, "Revoke a WhatsApp setup link")
      .annotate(
        OpenApi.Description,
        "Stops a pending link from connecting a number. A link that already connected one, was revoked, or expired answers 410.",
      ),
  )
  .annotate(
    OpenApi.Description,
    "Hosted links that connect a customer's WhatsApp number into a namespace.",
  ) {}
