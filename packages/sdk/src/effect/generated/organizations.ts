// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  BillingProviderError,
  ConflictError,
  ForbiddenError,
  GatewayTimeoutError,
  IanaTimezone,
  InternalError,
  JsonValue,
  MailboxId,
  OperationAccepted,
  PaymentRequiredError,
  ResourceNotFoundError,
  UnauthorizedError,
  UserId,
  ValidationError,
} from "./shared";

export type PhoneRegion = string;
export const PhoneRegion = /* @__PURE__ */ (() =>
  Schema.String.annotate({
    description: "An ISO 3166-1 alpha-2 region code, such as US or IN.",
  }).check(
    Schema.isPattern(new RegExp("^[A-Z]{2}$", "u")).annotate({
      expected: "a string matching the RegExp ^[A-Z]{2}$",
      identifier: "PhoneRegion",
    }),
  ))();
export type Organization = {
  readonly id: string;
  readonly billingAccountId: string;
  readonly name: string;
  readonly slug: string;
  readonly avatarUrl: string | null;
  readonly defaultRegion: PhoneRegion | null;
  readonly timezone: string;
  readonly plan: string;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly metadata: { readonly [x: string]: JsonValue } | null;
  readonly replyToDefault: ReadonlyArray<string> | null;
  readonly emailFooterEnabledDefault: boolean | null;
  readonly messagesUsed: number;
  readonly messagesUsedThisMonth: number;
  readonly emailUsed: number;
  readonly emailUsedThisMonth: number;
  readonly contactsUsed: number;
  readonly conversationsUsed: number;
  readonly teamMembersUsed: number;
  readonly messagesResetAt: string | null;
};
export const Organization = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: Schema.String,
    billingAccountId: Schema.String,
    name: Schema.String,
    slug: Schema.String,
    avatarUrl: Schema.Union([Schema.String, Schema.Null]).annotate({
      description:
        "URL of the organization's avatar image, hosted by Samva. Null when no avatar is set.",
    }),
    defaultRegion: Schema.Union([PhoneRegion, Schema.Null]),
    timezone: Schema.String,
    plan: Schema.String,
    isActive: Schema.Boolean,
    createdAt: Schema.String,
    updatedAt: Schema.String,
    metadata: Schema.Union([Schema.Record(Schema.String, JsonValue), Schema.Null]),
    replyToDefault: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    emailFooterEnabledDefault: Schema.Union([Schema.Boolean, Schema.Null]),
    messagesUsed: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    messagesUsedThisMonth: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    emailUsed: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    emailUsedThisMonth: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    contactsUsed: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    conversationsUsed: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    teamMembersUsed: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    messagesResetAt: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "Organization" }))();
export type OrganizationsCreateRequestJson = { readonly name: string };
export const OrganizationsCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.String.check(
      Schema.isMaxCodePoints(120).annotate({ expected: "a string with at most 120 code points" }),
    ).check(Schema.isMaxLength(120).annotate({ expected: "a value with a length of at most 120" })),
  }))();
export type OrganizationsCreate200 = Organization;
export const OrganizationsCreate200 = Organization;
export type OrganizationsCreate401 = UnauthorizedError;
export const OrganizationsCreate401 = UnauthorizedError;
export type OrganizationsCreate402 = PaymentRequiredError;
export const OrganizationsCreate402 = PaymentRequiredError;
export type OrganizationsCreate403 = ForbiddenError;
export const OrganizationsCreate403 = ForbiddenError;
export type OrganizationsCreate422 = ValidationError;
export const OrganizationsCreate422 = ValidationError;
export type OrganizationsCreate500 = InternalError;
export const OrganizationsCreate500 = InternalError;
export type OrganizationsCreate502 = BillingProviderError;
export const OrganizationsCreate502 = BillingProviderError;
export type OrganizationsCreate504 = GatewayTimeoutError;
export const OrganizationsCreate504 = GatewayTimeoutError;
export type OrganizationsGet200 = Organization;
export const OrganizationsGet200 = Organization;
export type OrganizationsGet401 = UnauthorizedError;
export const OrganizationsGet401 = UnauthorizedError;
export type OrganizationsGet403 = ForbiddenError;
export const OrganizationsGet403 = ForbiddenError;
export type OrganizationsGet404 = ResourceNotFoundError;
export const OrganizationsGet404 = ResourceNotFoundError;
export type OrganizationsGet422 = ValidationError;
export const OrganizationsGet422 = ValidationError;
export type OrganizationsGet500 = InternalError;
export const OrganizationsGet500 = InternalError;
export type OrganizationsGet504 = GatewayTimeoutError;
export const OrganizationsGet504 = GatewayTimeoutError;
export type OrganizationsUpdateRequestJson = {
  readonly name?: string | null;
  readonly slug?: string | null;
  readonly avatarUrl?: string | null | null;
  readonly defaultRegion?: PhoneRegion | null;
  readonly timezone?: IanaTimezone | null;
  readonly isActive?: boolean | null;
  readonly metadata?: { readonly [x: string]: JsonValue } | null;
  readonly replyToDefault?: ReadonlyArray<string> | null;
  readonly emailFooterEnabledDefault?: boolean | null;
};
export const OrganizationsUpdateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(120).annotate({
            expected: "a string with at most 120 code points",
          }),
        ).check(
          Schema.isMaxLength(120).annotate({ expected: "a value with a length of at most 120" }),
        ),
        Schema.Null,
      ]),
    ),
    slug: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    avatarUrl: Schema.optionalKey(
      Schema.Union([
        Schema.Union([Schema.String, Schema.Null]).annotate({
          description:
            "The `src` returned by an avatar upload (see `POST /v1/organizations/current/avatar-upload`). Null removes the avatar.",
        }),
        Schema.Null,
      ]),
    ),
    defaultRegion: Schema.optionalKey(Schema.Union([PhoneRegion, Schema.Null])),
    timezone: Schema.optionalKey(Schema.Union([IanaTimezone, Schema.Null])),
    isActive: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    metadata: Schema.optionalKey(
      Schema.Union([Schema.Record(Schema.String, JsonValue), Schema.Null]),
    ),
    replyToDefault: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
    emailFooterEnabledDefault: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  }))();
export type OrganizationsUpdate200 = Organization;
export const OrganizationsUpdate200 = Organization;
export type OrganizationsUpdate401 = UnauthorizedError;
export const OrganizationsUpdate401 = UnauthorizedError;
export type OrganizationsUpdate403 = ForbiddenError;
export const OrganizationsUpdate403 = ForbiddenError;
export type OrganizationsUpdate404 = ResourceNotFoundError;
export const OrganizationsUpdate404 = ResourceNotFoundError;
export type OrganizationsUpdate422 = ValidationError;
export const OrganizationsUpdate422 = ValidationError;
export type OrganizationsUpdate500 = InternalError;
export const OrganizationsUpdate500 = InternalError;
export type OrganizationsUpdate504 = GatewayTimeoutError;
export const OrganizationsUpdate504 = GatewayTimeoutError;
export type OrganizationsCreateAvatarUpload200 = {
  readonly uploadUrl: string;
  readonly maxBytes: number;
  readonly contentTypes: ReadonlyArray<string>;
};
export const OrganizationsCreateAvatarUpload200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    uploadUrl: Schema.String.annotate({ description: "The URL to PUT the image bytes to." }),
    maxBytes: Schema.Finite.annotate({
      description: "The largest image the upload accepts, in bytes.",
    }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
    contentTypes: Schema.Array(Schema.String).annotate({
      description: "The image content types the upload accepts.",
    }),
  }))();
export type OrganizationsCreateAvatarUpload401 = UnauthorizedError;
export const OrganizationsCreateAvatarUpload401 = UnauthorizedError;
export type OrganizationsCreateAvatarUpload403 = ForbiddenError;
export const OrganizationsCreateAvatarUpload403 = ForbiddenError;
export type OrganizationsCreateAvatarUpload422 = ValidationError;
export const OrganizationsCreateAvatarUpload422 = ValidationError;
export type OrganizationsCreateAvatarUpload500 = InternalError;
export const OrganizationsCreateAvatarUpload500 = InternalError;
export type OrganizationsCreateAvatarUpload504 = GatewayTimeoutError;
export const OrganizationsCreateAvatarUpload504 = GatewayTimeoutError;
export type OrganizationsGetProfile200 = {
  readonly id: string;
  readonly name: string;
  readonly nickname: string;
};
export const OrganizationsGetProfile200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: Schema.String.annotate({ description: "Opaque identity for your organization membership" }),
    name: Schema.String.annotate({ description: "Your display name" }),
    nickname: Schema.String.annotate({ description: "Your display name and organization name" }),
  }))();
export type OrganizationsGetProfile401 = UnauthorizedError;
export const OrganizationsGetProfile401 = UnauthorizedError;
export type OrganizationsGetProfile403 = ForbiddenError;
export const OrganizationsGetProfile403 = ForbiddenError;
export type OrganizationsGetProfile422 = ValidationError;
export const OrganizationsGetProfile422 = ValidationError;
export type OrganizationsGetProfile500 = InternalError;
export const OrganizationsGetProfile500 = InternalError;
export type OrganizationsGetProfile504 = GatewayTimeoutError;
export const OrganizationsGetProfile504 = GatewayTimeoutError;
export type OrganizationsDeleteHeaders = { readonly "idempotency-key": string };
export const OrganizationsDeleteHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
      )
      .check(
        Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
      ),
  }))();
export type OrganizationsDeleteRequestJson = { readonly confirmationName: string };
export const OrganizationsDeleteRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ confirmationName: Schema.String }))();
export type OrganizationsDelete202 = OperationAccepted;
export const OrganizationsDelete202 = OperationAccepted;
export type OrganizationsDelete401 = UnauthorizedError;
export const OrganizationsDelete401 = UnauthorizedError;
export type OrganizationsDelete403 = ForbiddenError;
export const OrganizationsDelete403 = ForbiddenError;
export type OrganizationsDelete409 = ConflictError;
export const OrganizationsDelete409 = ConflictError;
export type OrganizationsDelete422 = ValidationError;
export const OrganizationsDelete422 = ValidationError;
export type OrganizationsDelete500 = InternalError;
export const OrganizationsDelete500 = InternalError;
export type OrganizationsDelete504 = GatewayTimeoutError;
export const OrganizationsDelete504 = GatewayTimeoutError;
export type OrganizationsAssignPersonalMailboxPathParams = { readonly userId: UserId };
export const OrganizationsAssignPersonalMailboxPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ userId: UserId }))();
export type OrganizationsAssignPersonalMailboxRequestJson = { readonly mailboxAddress: string };
export const OrganizationsAssignPersonalMailboxRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ mailboxAddress: Schema.String }))();
export type OrganizationsAssignPersonalMailbox200 = { readonly mailboxId: MailboxId };
export const OrganizationsAssignPersonalMailbox200 = /* @__PURE__ */ (() =>
  Schema.Struct({ mailboxId: MailboxId }))();
export type OrganizationsAssignPersonalMailbox401 = UnauthorizedError;
export const OrganizationsAssignPersonalMailbox401 = UnauthorizedError;
export type OrganizationsAssignPersonalMailbox402 = PaymentRequiredError;
export const OrganizationsAssignPersonalMailbox402 = PaymentRequiredError;
export type OrganizationsAssignPersonalMailbox403 = ForbiddenError;
export const OrganizationsAssignPersonalMailbox403 = ForbiddenError;
export type OrganizationsAssignPersonalMailbox404 = ResourceNotFoundError;
export const OrganizationsAssignPersonalMailbox404 = ResourceNotFoundError;
export type OrganizationsAssignPersonalMailbox409 = ConflictError;
export const OrganizationsAssignPersonalMailbox409 = ConflictError;
export type OrganizationsAssignPersonalMailbox422 = ValidationError;
export const OrganizationsAssignPersonalMailbox422 = ValidationError;
export type OrganizationsAssignPersonalMailbox500 = InternalError;
export const OrganizationsAssignPersonalMailbox500 = InternalError;
export type OrganizationsAssignPersonalMailbox502 = BillingProviderError;
export const OrganizationsAssignPersonalMailbox502 = BillingProviderError;
export type OrganizationsAssignPersonalMailbox504 = GatewayTimeoutError;
export const OrganizationsAssignPersonalMailbox504 = GatewayTimeoutError;
export type OrganizationsGetPersonalMailboxAddressOptions200 = {
  readonly domains: ReadonlyArray<string>;
  readonly defaultDomain: string;
};
export const OrganizationsGetPersonalMailboxAddressOptions200 = /* @__PURE__ */ (() =>
  Schema.Struct({ domains: Schema.Array(Schema.String), defaultDomain: Schema.String }))();
export type OrganizationsGetPersonalMailboxAddressOptions401 = UnauthorizedError;
export const OrganizationsGetPersonalMailboxAddressOptions401 = UnauthorizedError;
export type OrganizationsGetPersonalMailboxAddressOptions403 = ForbiddenError;
export const OrganizationsGetPersonalMailboxAddressOptions403 = ForbiddenError;
export type OrganizationsGetPersonalMailboxAddressOptions422 = ValidationError;
export const OrganizationsGetPersonalMailboxAddressOptions422 = ValidationError;
export type OrganizationsGetPersonalMailboxAddressOptions500 = InternalError;
export const OrganizationsGetPersonalMailboxAddressOptions500 = InternalError;
export type OrganizationsGetPersonalMailboxAddressOptions504 = GatewayTimeoutError;
export const OrganizationsGetPersonalMailboxAddressOptions504 = GatewayTimeoutError;
export type OrganizationsListPersonalMailboxAssignments200 = {
  readonly items: ReadonlyArray<{ readonly userId: UserId }>;
};
export const OrganizationsListPersonalMailboxAssignments200 = /* @__PURE__ */ (() =>
  Schema.Struct({ items: Schema.Array(Schema.Struct({ userId: UserId })) }))();
export type OrganizationsListPersonalMailboxAssignments401 = UnauthorizedError;
export const OrganizationsListPersonalMailboxAssignments401 = UnauthorizedError;
export type OrganizationsListPersonalMailboxAssignments403 = ForbiddenError;
export const OrganizationsListPersonalMailboxAssignments403 = ForbiddenError;
export type OrganizationsListPersonalMailboxAssignments422 = ValidationError;
export const OrganizationsListPersonalMailboxAssignments422 = ValidationError;
export type OrganizationsListPersonalMailboxAssignments500 = InternalError;
export const OrganizationsListPersonalMailboxAssignments500 = InternalError;
export type OrganizationsListPersonalMailboxAssignments504 = GatewayTimeoutError;
export const OrganizationsListPersonalMailboxAssignments504 = GatewayTimeoutError;
export type OrganizationsGetTrustTier200 = {
  readonly tier: "screened" | "probation" | "established";
  readonly changedAt: string;
  readonly sendingLimits: {
    readonly sendsPerSecond: number;
    readonly dailySends: number;
    readonly probation: {
      readonly hourlyRecipients: number;
      readonly dailyRecipients: number;
      readonly domainShare: number;
      readonly domainShareFloor: number;
    } | null;
  };
  readonly graduation: {
    readonly firstSentAt: string | null;
    readonly elapsedDays: number;
    readonly sent: number;
    readonly delivered: number;
    readonly hardBounces: number;
    readonly hardBounceRate: number | null;
    readonly complaints: number;
    readonly holds: number;
    readonly requirements: {
      readonly minimumDays: number;
      readonly delivered: number;
      readonly maximumHardBounceRate: number;
    };
    readonly blockers: ReadonlyArray<
      "too_recent" | "too_few_delivered" | "held" | "complaints" | "bounce_rate"
    >;
  } | null;
};
export const OrganizationsGetTrustTier200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    tier: Schema.Union([
      Schema.Literal("screened"),
      Schema.Literal("probation"),
      Schema.Literal("established"),
    ]),
    changedAt: Schema.String,
    sendingLimits: Schema.Struct({
      sendsPerSecond: Schema.Finite.check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
      dailySends: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
      probation: Schema.Union([
        Schema.Struct({
          hourlyRecipients: Schema.Finite.check(
            Schema.isFinite().annotate({ expected: "a finite number" }),
          ),
          dailyRecipients: Schema.Finite.check(
            Schema.isFinite().annotate({ expected: "a finite number" }),
          ),
          domainShare: Schema.Finite.check(
            Schema.isFinite().annotate({ expected: "a finite number" }),
          ),
          domainShareFloor: Schema.Finite.check(
            Schema.isFinite().annotate({ expected: "a finite number" }),
          ),
        }),
        Schema.Null,
      ]),
    }),
    graduation: Schema.Union([
      Schema.Struct({
        firstSentAt: Schema.Union([Schema.String, Schema.Null]),
        elapsedDays: Schema.Finite.check(
          Schema.isFinite().annotate({ expected: "a finite number" }),
        ),
        sent: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
        delivered: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
        hardBounces: Schema.Finite.check(
          Schema.isFinite().annotate({ expected: "a finite number" }),
        ),
        hardBounceRate: Schema.Union([
          Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
          Schema.Null,
        ]),
        complaints: Schema.Finite.check(
          Schema.isFinite().annotate({ expected: "a finite number" }),
        ),
        holds: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
        requirements: Schema.Struct({
          minimumDays: Schema.Finite.check(
            Schema.isFinite().annotate({ expected: "a finite number" }),
          ),
          delivered: Schema.Finite.check(
            Schema.isFinite().annotate({ expected: "a finite number" }),
          ),
          maximumHardBounceRate: Schema.Finite.check(
            Schema.isFinite().annotate({ expected: "a finite number" }),
          ),
        }),
        blockers: Schema.Array(
          Schema.Union([
            Schema.Literal("too_recent"),
            Schema.Literal("too_few_delivered"),
            Schema.Literal("held"),
            Schema.Literal("complaints"),
            Schema.Literal("bounce_rate"),
          ]),
        ),
      }),
      Schema.Null,
    ]),
  }))();
export type OrganizationsGetTrustTier401 = UnauthorizedError;
export const OrganizationsGetTrustTier401 = UnauthorizedError;
export type OrganizationsGetTrustTier403 = ForbiddenError;
export const OrganizationsGetTrustTier403 = ForbiddenError;
export type OrganizationsGetTrustTier404 = ResourceNotFoundError;
export const OrganizationsGetTrustTier404 = ResourceNotFoundError;
export type OrganizationsGetTrustTier422 = ValidationError;
export const OrganizationsGetTrustTier422 = ValidationError;
export type OrganizationsGetTrustTier500 = InternalError;
export const OrganizationsGetTrustTier500 = InternalError;
export type OrganizationsGetTrustTier502 = BillingProviderError;
export const OrganizationsGetTrustTier502 = BillingProviderError;
export type OrganizationsGetTrustTier504 = GatewayTimeoutError;
export const OrganizationsGetTrustTier504 = GatewayTimeoutError;
export type OrganizationsGetUsageQuery = {
  readonly after?: string | null;
  readonly before?: string | null;
};
export const OrganizationsGetUsageQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    after: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    before: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type OrganizationsGetUsage200 = {
  readonly usage: {
    readonly periodStart: string;
    readonly periodEnd: string;
    readonly emailCount: number;
    readonly totalMessages: number;
  };
  readonly billing: {
    readonly currency: string;
    readonly planName: string | null;
    readonly includedCredits: number | null;
    readonly usedCredits: number | null;
    readonly overageCredits: number | null;
    readonly overageCost: number | null;
    readonly includedAiCredits: number | null;
    readonly usedAiCredits: number | null;
    readonly overageAiCredits: number | null;
    readonly overageAiCost: number | null;
    readonly aiPackCredits: number | null;
    readonly aiResetsAt: string | null;
    readonly creditsResetsAt: string | null;
  };
};
export const OrganizationsGetUsage200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    usage: Schema.Struct({
      periodStart: Schema.String,
      periodEnd: Schema.String,
      emailCount: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
      totalMessages: Schema.Finite.check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
    }),
    billing: Schema.Struct({
      currency: Schema.String,
      planName: Schema.Union([Schema.String, Schema.Null]),
      includedCredits: Schema.Union([
        Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
      usedCredits: Schema.Union([
        Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
      overageCredits: Schema.Union([
        Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
      overageCost: Schema.Union([
        Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
      includedAiCredits: Schema.Union([
        Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
      usedAiCredits: Schema.Union([
        Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
      overageAiCredits: Schema.Union([
        Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
      overageAiCost: Schema.Union([
        Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
      aiPackCredits: Schema.Union([
        Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
      aiResetsAt: Schema.Union([Schema.String, Schema.Null]),
      creditsResetsAt: Schema.Union([Schema.String, Schema.Null]),
    }),
  }))();
export type OrganizationsGetUsage401 = UnauthorizedError;
export const OrganizationsGetUsage401 = UnauthorizedError;
export type OrganizationsGetUsage403 = ForbiddenError;
export const OrganizationsGetUsage403 = ForbiddenError;
export type OrganizationsGetUsage422 = ValidationError;
export const OrganizationsGetUsage422 = ValidationError;
export type OrganizationsGetUsage500 = InternalError;
export const OrganizationsGetUsage500 = InternalError;
export type OrganizationsGetUsage504 = GatewayTimeoutError;
export const OrganizationsGetUsage504 = GatewayTimeoutError;

export class OrganizationsGroup extends HttpApiGroup.make("Organizations")
  .add(
    HttpApiEndpoint.post("organizationsCreate", "/v1/organizations", {
      payload: OrganizationsCreateRequestJson,
      success: OrganizationsCreate200,
      error: [
        OrganizationsCreate401.pipe(HttpApiSchema.status(401)),
        OrganizationsCreate402.pipe(HttpApiSchema.status(402)),
        OrganizationsCreate403.pipe(HttpApiSchema.status(403)),
        OrganizationsCreate422.pipe(HttpApiSchema.status(422)),
        OrganizationsCreate500,
        OrganizationsCreate502.pipe(HttpApiSchema.status(502)),
        OrganizationsCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "organizations.create")
      .annotate(OpenApi.Summary, "Create an organization")
      .annotate(
        OpenApi.Description,
        "Creates a new organization under the current billing account and returns it.",
      ),
    HttpApiEndpoint.get("organizationsGet", "/v1/organizations/current", {
      success: OrganizationsGet200,
      error: [
        OrganizationsGet401.pipe(HttpApiSchema.status(401)),
        OrganizationsGet403.pipe(HttpApiSchema.status(403)),
        OrganizationsGet404.pipe(HttpApiSchema.status(404)),
        OrganizationsGet422.pipe(HttpApiSchema.status(422)),
        OrganizationsGet500,
        OrganizationsGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "organizations.get")
      .annotate(OpenApi.Summary, "Get the current organization")
      .annotate(OpenApi.Description, "Returns the organization for the current billing account."),
    HttpApiEndpoint.patch("organizationsUpdate", "/v1/organizations/current", {
      payload: OrganizationsUpdateRequestJson,
      success: OrganizationsUpdate200,
      error: [
        OrganizationsUpdate401.pipe(HttpApiSchema.status(401)),
        OrganizationsUpdate403.pipe(HttpApiSchema.status(403)),
        OrganizationsUpdate404.pipe(HttpApiSchema.status(404)),
        OrganizationsUpdate422.pipe(HttpApiSchema.status(422)),
        OrganizationsUpdate500,
        OrganizationsUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "organizations.update")
      .annotate(OpenApi.Summary, "Update the current organization")
      .annotate(
        OpenApi.Description,
        "Updates the current organization's profile, avatar, regional defaults, and reply-to default and returns the saved organization. `avatarUrl` accepts only the `src` returned by an avatar upload, and null removes the avatar. `metadata` is merged into the stored value; every other field is replaced.",
      ),
    HttpApiEndpoint.post(
      "organizationsCreateAvatarUpload",
      "/v1/organizations/current/avatar-upload",
      {
        success: OrganizationsCreateAvatarUpload200,
        error: [
          OrganizationsCreateAvatarUpload401.pipe(HttpApiSchema.status(401)),
          OrganizationsCreateAvatarUpload403.pipe(HttpApiSchema.status(403)),
          OrganizationsCreateAvatarUpload422.pipe(HttpApiSchema.status(422)),
          OrganizationsCreateAvatarUpload500,
          OrganizationsCreateAvatarUpload504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "organizations.createAvatarUpload")
      .annotate(OpenApi.Summary, "Get the organization avatar upload URL")
      .annotate(
        OpenApi.Description,
        "Returns where to upload the organization avatar. PUT the png, jpeg, or webp bytes (at most `maxBytes`) to `uploadUrl` with the same credential and a matching `Content-Type`; the response is `{ src }`. Then send `PATCH /v1/organizations/current` with `{ avatarUrl: src }`.",
      ),
    HttpApiEndpoint.get("organizationsGetProfile", "/v1/organizations/current/profile", {
      success: OrganizationsGetProfile200,
      error: [
        OrganizationsGetProfile401.pipe(HttpApiSchema.status(401)),
        OrganizationsGetProfile403.pipe(HttpApiSchema.status(403)),
        OrganizationsGetProfile422.pipe(HttpApiSchema.status(422)),
        OrganizationsGetProfile500,
        OrganizationsGetProfile504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "organizations.getProfile")
      .annotate(OpenApi.Summary, "Get the current account profile")
      .annotate(
        OpenApi.Description,
        "Returns your identity in the organization authorized by your credential. The ID remains stable across reconnects and display-name changes. Removing and re-adding your membership creates a new ID.",
      ),
    HttpApiEndpoint.post("organizationsDelete", "/v1/organizations/deletion-operations", {
      headers: OrganizationsDeleteHeaders,
      payload: OrganizationsDeleteRequestJson,
      success: OrganizationsDelete202.pipe(HttpApiSchema.status(202)),
      error: [
        OrganizationsDelete401.pipe(HttpApiSchema.status(401)),
        OrganizationsDelete403.pipe(HttpApiSchema.status(403)),
        OrganizationsDelete409.pipe(HttpApiSchema.status(409)),
        OrganizationsDelete422.pipe(HttpApiSchema.status(422)),
        OrganizationsDelete500,
        OrganizationsDelete504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "organizations.delete")
      .annotate(OpenApi.Summary, "Delete the current organization")
      .annotate(
        OpenApi.Description,
        "Starts an owner-authorized organization deletion operation, confirming the organization name in the request. Repeating the same request with the same Idempotency-Key returns the existing organization-scoped operation.",
      ),
    HttpApiEndpoint.post(
      "organizationsAssignPersonalMailbox",
      "/v1/organizations/members/:userId/personal-mailbox",
      {
        params: OrganizationsAssignPersonalMailboxPathParams,
        payload: OrganizationsAssignPersonalMailboxRequestJson,
        success: OrganizationsAssignPersonalMailbox200,
        error: [
          OrganizationsAssignPersonalMailbox401.pipe(HttpApiSchema.status(401)),
          OrganizationsAssignPersonalMailbox402.pipe(HttpApiSchema.status(402)),
          OrganizationsAssignPersonalMailbox403.pipe(HttpApiSchema.status(403)),
          OrganizationsAssignPersonalMailbox404.pipe(HttpApiSchema.status(404)),
          OrganizationsAssignPersonalMailbox409.pipe(HttpApiSchema.status(409)),
          OrganizationsAssignPersonalMailbox422.pipe(HttpApiSchema.status(422)),
          OrganizationsAssignPersonalMailbox500,
          OrganizationsAssignPersonalMailbox502.pipe(HttpApiSchema.status(502)),
          OrganizationsAssignPersonalMailbox504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "organizations.assignPersonalMailbox")
      .annotate(OpenApi.Summary, "Assign a personal mailbox")
      .annotate(
        OpenApi.Description,
        "Assigns a personal address to an existing member. Only organization owners and admins may assign it; the member receives the sole user grant. Returns the mailbox ID without granting the assigner access.",
      ),
    HttpApiEndpoint.get(
      "organizationsGetPersonalMailboxAddressOptions",
      "/v1/organizations/personal-mailboxes/address-options",
      {
        success: OrganizationsGetPersonalMailboxAddressOptions200,
        error: [
          OrganizationsGetPersonalMailboxAddressOptions401.pipe(HttpApiSchema.status(401)),
          OrganizationsGetPersonalMailboxAddressOptions403.pipe(HttpApiSchema.status(403)),
          OrganizationsGetPersonalMailboxAddressOptions422.pipe(HttpApiSchema.status(422)),
          OrganizationsGetPersonalMailboxAddressOptions500,
          OrganizationsGetPersonalMailboxAddressOptions504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "organizations.getPersonalMailboxAddressOptions")
      .annotate(OpenApi.Summary, "Get personal address domains")
      .annotate(
        OpenApi.Description,
        "Returns this organization's verified active receiving domains and a default domain. When none are available, returns the organization's hosted mail domain. Only organization owners and admins may read these options.",
      ),
    HttpApiEndpoint.get(
      "organizationsListPersonalMailboxAssignments",
      "/v1/organizations/personal-mailboxes/assignments",
      {
        success: OrganizationsListPersonalMailboxAssignments200,
        error: [
          OrganizationsListPersonalMailboxAssignments401.pipe(HttpApiSchema.status(401)),
          OrganizationsListPersonalMailboxAssignments403.pipe(HttpApiSchema.status(403)),
          OrganizationsListPersonalMailboxAssignments422.pipe(HttpApiSchema.status(422)),
          OrganizationsListPersonalMailboxAssignments500,
          OrganizationsListPersonalMailboxAssignments504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "organizations.listPersonalMailboxAssignments")
      .annotate(OpenApi.Summary, "List members with personal mailboxes")
      .annotate(
        OpenApi.Description,
        "Returns the user IDs with a personal mailbox in this organization, including paused mailboxes. Only organization owners and admins may list assignments. This grants no mailbox access.",
      ),
    HttpApiEndpoint.get("organizationsGetTrustTier", "/v1/organizations/trust-tier", {
      success: OrganizationsGetTrustTier200,
      error: [
        OrganizationsGetTrustTier401.pipe(HttpApiSchema.status(401)),
        OrganizationsGetTrustTier403.pipe(HttpApiSchema.status(403)),
        OrganizationsGetTrustTier404.pipe(HttpApiSchema.status(404)),
        OrganizationsGetTrustTier422.pipe(HttpApiSchema.status(422)),
        OrganizationsGetTrustTier500,
        OrganizationsGetTrustTier502.pipe(HttpApiSchema.status(502)),
        OrganizationsGetTrustTier504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "organizations.getTrustTier")
      .annotate(OpenApi.Summary, "Get organization trust tier and sending limits")
      .annotate(
        OpenApi.Description,
        "Returns the current trust tier, plan and probation sending limits, and measured probation graduation progress. Limits are additional to billing allowance, domain readiness, and enforcement. Graduation is evaluated on delivery events.",
      ),
    HttpApiEndpoint.get("organizationsGetUsage", "/v1/organizations/usage", {
      query: OrganizationsGetUsageQuery,
      success: OrganizationsGetUsage200,
      error: [
        OrganizationsGetUsage401.pipe(HttpApiSchema.status(401)),
        OrganizationsGetUsage403.pipe(HttpApiSchema.status(403)),
        OrganizationsGetUsage422.pipe(HttpApiSchema.status(422)),
        OrganizationsGetUsage500,
        OrganizationsGetUsage504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "organizations.getUsage")
      .annotate(OpenApi.Summary, "Get organization usage")
      .annotate(
        OpenApi.Description,
        "Returns usage statistics for the current organization between `after` and `before`, which default to the current calendar month so far. `usage.periodStart` and `usage.periodEnd` echo the window counted.",
      ),
  )
  .annotate(OpenApi.Description, "Organization management and usage statistics") {}
