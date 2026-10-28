// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  BillingProviderError,
  BrandAddressRequiredError,
  CampaignAudience,
  CampaignContentInput,
  CampaignContentMetadata,
  CampaignConversationRef,
  CampaignFooterRequiredError,
  CampaignFrom,
  CampaignId,
  CampaignLatestRun,
  CampaignReplyMailbox,
  CampaignRunId,
  ConflictError,
  ContactId,
  Cursor,
  DeliveryUnavailableError,
  EmailAttachments,
  EmailCustomHeaders,
  EmailDomainId,
  EmailFooterOverride,
  EmailTrackingOverrideV1,
  ExternalServiceError,
  FlagDisabledError,
  ForbiddenError,
  FromAddressRequiredError,
  GatewayTimeoutError,
  InternalError,
  MessageId,
  OnboardingReviewRequiredError,
  PaymentRequiredError,
  RateLimitedError,
  RenderLocale,
  RenderTimeZone,
  ReplyToAddresses,
  ResourceNotFoundError,
  SenderNotReadyError,
  SendsSeries,
  TemplateData,
  TemplateId,
  TemplateInputContractId,
  TemplatePublicationId,
  TemplateSourceError,
  TopicId,
  UnauthorizedError,
  ValidationError,
  __SamvaRuntimeAbsoluteInstant,
} from "./shared";

export type CampaignPolicy = { readonly pageSize?: number | null };
export const CampaignPolicy = /* @__PURE__ */ (() =>
  Schema.Struct({
    pageSize: Schema.optionalKey(
      Schema.Union([
        Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
          .check(
            Schema.isGreaterThanOrEqualTo(100).annotate({
              expected: "a value greater than or equal to 100",
            }),
          )
          .check(
            Schema.isLessThanOrEqualTo(1000).annotate({
              expected: "a value less than or equal to 1000",
            }),
          ),
        Schema.Null,
      ]),
    ),
  }).annotate({ identifier: "CampaignPolicy" }))();
export type CampaignDefinitionSummary = {
  readonly state: "editable" | "frozen" | "archived";
  readonly frozenAt: string | null;
};
export const CampaignDefinitionSummary = /* @__PURE__ */ (() =>
  Schema.Struct({
    state: Schema.Union([
      Schema.Literal("editable"),
      Schema.Literal("frozen"),
      Schema.Literal("archived"),
    ]),
    frozenAt: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "CampaignDefinitionSummary" }))();
export type CampaignRunSkippedReason = {
  readonly reason:
    | "unsubscribed"
    | "blocked"
    | "suppressed"
    | "opted_out"
    | "unreachable"
    | "no_identity"
    | "inactive"
    | "run_cancelled"
    | "run_failed"
    | "missing_merge_field";
  readonly count: number;
};
export const CampaignRunSkippedReason = /* @__PURE__ */ (() =>
  Schema.Struct({
    reason: Schema.Union([
      Schema.Literal("unsubscribed"),
      Schema.Literal("blocked"),
      Schema.Literal("suppressed"),
      Schema.Literal("opted_out"),
      Schema.Literal("unreachable"),
      Schema.Literal("no_identity"),
      Schema.Literal("inactive"),
      Schema.Literal("run_cancelled"),
      Schema.Literal("run_failed"),
      Schema.Literal("missing_merge_field"),
    ]),
    count: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
  }).annotate({ identifier: "CampaignRunSkippedReason" }))();
export type CampaignRecipientId = string & EffectBrand.Brand<"CampaignRecipientId">;
export const CampaignRecipientId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^crcpt_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^crcpt_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "CampaignRecipientId",
    }),
  ).pipe(Schema.brand("CampaignRecipientId")))();
export type CampaignRunReportEngagement = {
  readonly measurement: "directional";
  readonly uniqueOpens: number;
  readonly uniqueClicks: number;
};
export const CampaignRunReportEngagement = /* @__PURE__ */ (() =>
  Schema.Struct({
    measurement: Schema.Literal("directional"),
    uniqueOpens: Schema.Finite.annotate({
      description:
        "Directional unique recipients who opened, excluding machine events; not an exact measurement.",
    })
      .check(Schema.isInt().annotate({ expected: "an integer" }))
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
    uniqueClicks: Schema.Finite.annotate({
      description:
        "Directional unique recipients who clicked, excluding machine events; not an exact measurement.",
    })
      .check(Schema.isInt().annotate({ expected: "an integer" }))
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
  }).annotate({ identifier: "CampaignRunReportEngagement" }))();
export type CampaignRunReportSkippedReason = {
  readonly reason:
    | "unsubscribed"
    | "blocked"
    | "suppressed"
    | "opted_out"
    | "unreachable"
    | "no_identity"
    | "inactive"
    | "run_cancelled"
    | "run_failed"
    | "missing_merge_field";
  readonly count: number;
};
export const CampaignRunReportSkippedReason = /* @__PURE__ */ (() =>
  Schema.Struct({
    reason: Schema.Union([
      Schema.Literal("unsubscribed"),
      Schema.Literal("blocked"),
      Schema.Literal("suppressed"),
      Schema.Literal("opted_out"),
      Schema.Literal("unreachable"),
      Schema.Literal("no_identity"),
      Schema.Literal("inactive"),
      Schema.Literal("run_cancelled"),
      Schema.Literal("run_failed"),
      Schema.Literal("missing_merge_field"),
    ]),
    count: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  }).annotate({ identifier: "CampaignRunReportSkippedReason" }))();
export type CampaignPreview = {
  readonly subject: string;
  readonly preheader?: string;
  readonly html: string;
  readonly text: string;
};
export const CampaignPreview = /* @__PURE__ */ (() =>
  Schema.Struct({
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
  }).annotate({ identifier: "CampaignPreview" }))();
export type CampaignTestSend = { readonly id: MessageId };
export const CampaignTestSend = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MessageId }).annotate({ identifier: "CampaignTestSend" }))();
export type CampaignRunReportTopicUnsubscribes = {
  readonly topicId: TopicId;
  readonly count: number;
};
export const CampaignRunReportTopicUnsubscribes = /* @__PURE__ */ (() =>
  Schema.Struct({
    topicId: TopicId,
    count: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  }).annotate({ identifier: "CampaignRunReportTopicUnsubscribes" }))();
export type CampaignRecipientPage = {
  readonly items: ReadonlyArray<{
    readonly id: CampaignRecipientId;
    readonly runId: CampaignRunId;
    readonly contactId: ContactId;
    readonly status: "pending" | "dispatching" | "dispatched" | "failed" | "skipped";
    readonly messageId: string | null;
    readonly failureReason: string | null;
    readonly skippedReason:
      | "unsubscribed"
      | "blocked"
      | "suppressed"
      | "opted_out"
      | "unreachable"
      | "no_identity"
      | "inactive"
      | "run_cancelled"
      | "run_failed"
      | "missing_merge_field"
      | null;
    readonly createdAt: string;
    readonly updatedAt: string;
  }>;
  readonly nextCursor: string | null;
};
export const CampaignRecipientPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        id: CampaignRecipientId,
        runId: CampaignRunId,
        contactId: ContactId,
        status: Schema.Union([
          Schema.Literal("pending"),
          Schema.Literal("dispatching"),
          Schema.Literal("dispatched"),
          Schema.Literal("failed"),
          Schema.Literal("skipped"),
        ]),
        messageId: Schema.Union([Schema.String, Schema.Null]),
        failureReason: Schema.Union([Schema.String, Schema.Null]),
        skippedReason: Schema.Union([
          Schema.Union([
            Schema.Literal("unsubscribed"),
            Schema.Literal("blocked"),
            Schema.Literal("suppressed"),
            Schema.Literal("opted_out"),
            Schema.Literal("unreachable"),
            Schema.Literal("no_identity"),
            Schema.Literal("inactive"),
            Schema.Literal("run_cancelled"),
            Schema.Literal("run_failed"),
            Schema.Literal("missing_merge_field"),
          ]),
          Schema.Null,
        ]),
        createdAt: Schema.String,
        updatedAt: Schema.String,
      }),
    ),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "CampaignRecipientPage" }))();
export type CampaignRunReport = {
  readonly campaignId: CampaignId;
  readonly runId: CampaignRunId;
  readonly totalRecipients: number;
  readonly dispatchedCount: number;
  readonly failedCount: number;
  readonly skippedCount: number;
  readonly deliveredCount: number;
  readonly hardBounceCount: number;
  readonly softBounceCount: number;
  readonly complaintCount: number;
  readonly engagement: CampaignRunReportEngagement;
  readonly unsubscribesByTopic: ReadonlyArray<CampaignRunReportTopicUnsubscribes>;
  readonly replyCount: number;
  readonly skippedReasons: ReadonlyArray<CampaignRunReportSkippedReason>;
};
export const CampaignRunReport = /* @__PURE__ */ (() =>
  Schema.Struct({
    campaignId: CampaignId,
    runId: CampaignRunId,
    totalRecipients: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    dispatchedCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    failedCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    skippedCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    deliveredCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    hardBounceCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    softBounceCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    complaintCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    engagement: CampaignRunReportEngagement,
    unsubscribesByTopic: Schema.Array(CampaignRunReportTopicUnsubscribes),
    replyCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    skippedReasons: Schema.Array(CampaignRunReportSkippedReason),
  }).annotate({ identifier: "CampaignRunReport" }))();
export type CampaignEmailContent = {
  readonly subject?: string | null;
  readonly html?: string | null;
  readonly text?: string | null;
  readonly attachments?: EmailAttachments;
  readonly publicationId?: TemplatePublicationId;
  readonly inputContractId?: TemplateInputContractId;
  readonly templateId?: TemplateId | null;
  readonly templateSlug?: string | null;
  readonly templateData?: TemplateData;
  readonly locale?: RenderLocale;
  readonly timeZone?: RenderTimeZone;
  readonly inReplyToMessageId?: MessageId | null;
  readonly replyTo?: ReplyToAddresses;
  readonly topicId?: TopicId | null;
  readonly tracking?: EmailTrackingOverrideV1;
  readonly footer?: EmailFooterOverride;
  readonly headers?: EmailCustomHeaders | null;
  readonly preheader?: string | null;
};
export const CampaignEmailContent = /* @__PURE__ */ (() =>
  Schema.Struct({
    subject: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    html: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    text: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    attachments: Schema.optionalKey(EmailAttachments),
    publicationId: Schema.optionalKey(TemplatePublicationId),
    inputContractId: Schema.optionalKey(TemplateInputContractId),
    templateId: Schema.optionalKey(Schema.Union([TemplateId, Schema.Null])),
    templateSlug: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isPattern(new RegExp("^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
            expected: "a string matching the RegExp ^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$",
          }),
        ),
        Schema.Null,
      ]),
    ),
    templateData: Schema.optionalKey(TemplateData),
    locale: Schema.optionalKey(RenderLocale),
    timeZone: Schema.optionalKey(RenderTimeZone),
    inReplyToMessageId: Schema.optionalKey(Schema.Union([MessageId, Schema.Null])),
    replyTo: Schema.optionalKey(ReplyToAddresses),
    topicId: Schema.optionalKey(
      Schema.Union([TopicId, Schema.Null]).annotate({
        description:
          "The topic for this send. Omit to inherit the template topic; null disables topic inheritance for a direct send. Campaigns require a topic.",
      }),
    ),
    tracking: Schema.optionalKey(EmailTrackingOverrideV1),
    footer: Schema.optionalKey(EmailFooterOverride),
    headers: Schema.optionalKey(Schema.Union([EmailCustomHeaders, Schema.Null])),
    preheader: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }).annotate({ identifier: "CampaignEmailContent" }))();
export type CampaignContent = {
  readonly channel: "email";
  readonly email: CampaignEmailContent;
  readonly issue?: { readonly path: string; readonly commit: string } | null;
  readonly from?: CampaignFrom;
  readonly replyMailboxId?: CampaignReplyMailbox;
  readonly conversationId?: CampaignConversationRef;
  readonly metadata?: CampaignContentMetadata;
};
export const CampaignContent = /* @__PURE__ */ (() =>
  Schema.Struct({
    channel: Schema.Literal("email"),
    email: CampaignEmailContent,
    issue: Schema.optionalKey(
      Schema.Union([
        Schema.Struct({
          path: Schema.String.check(
            Schema.isMaxCodePoints(1024).annotate({
              expected: "a string with at most 1024 code points",
            }),
          )
            .check(
              Schema.isPattern(
                new RegExp(
                  "^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
                  "u",
                ),
              ).annotate({
                expected:
                  "a string matching the RegExp ^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
              }),
            )
            .check(
              Schema.isMaxLength(1024).annotate({
                expected: "a value with a length of at most 1024",
              }),
            ),
          commit: Schema.String.check(
            Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
              expected: "a string matching the RegExp ^[a-f0-9]{40}$",
            }),
          ),
        }),
        Schema.Null,
      ]).annotate({
        description:
          "Render a saved Markdown issue from the audience topic's repository. Its saved title and preheader supply the email content; templateData supplies recipient fallbacks.",
      }),
    ),
    from: Schema.optionalKey(CampaignFrom),
    replyMailboxId: Schema.optionalKey(CampaignReplyMailbox),
    conversationId: Schema.optionalKey(CampaignConversationRef),
    metadata: Schema.optionalKey(CampaignContentMetadata),
  }).annotate({ identifier: "CampaignContent" }))();
export type CampaignListItem = {
  readonly id: CampaignId;
  readonly name: string;
  readonly channel: "email";
  readonly content: CampaignContent;
  readonly audience: CampaignAudience;
  readonly policy: CampaignPolicy;
  readonly definition: CampaignDefinitionSummary;
  readonly latestRun: CampaignLatestRun | null;
  readonly createdBy: string | null;
  readonly actorEmail: string;
  readonly memberRole: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly series: SendsSeries;
};
export const CampaignListItem = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: CampaignId,
    name: Schema.String,
    channel: Schema.Literal("email"),
    content: CampaignContent,
    audience: CampaignAudience,
    policy: CampaignPolicy,
    definition: CampaignDefinitionSummary,
    latestRun: Schema.Union([CampaignLatestRun, Schema.Null]),
    createdBy: Schema.Union([Schema.String, Schema.Null]),
    actorEmail: Schema.String,
    memberRole: Schema.String,
    createdAt: Schema.String,
    updatedAt: Schema.String,
    series: SendsSeries,
  }).annotate({ identifier: "CampaignListItem" }))();
export type Campaign = {
  readonly id: CampaignId;
  readonly name: string;
  readonly channel: "email";
  readonly content: CampaignContent;
  readonly audience: CampaignAudience;
  readonly policy: CampaignPolicy;
  readonly definition: CampaignDefinitionSummary;
  readonly latestRun: CampaignLatestRun | null;
  readonly createdBy: string | null;
  readonly actorEmail: string;
  readonly memberRole: string;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const Campaign = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: CampaignId,
    name: Schema.String,
    channel: Schema.Literal("email"),
    content: CampaignContent,
    audience: CampaignAudience,
    policy: CampaignPolicy,
    definition: CampaignDefinitionSummary,
    latestRun: Schema.Union([CampaignLatestRun, Schema.Null]),
    createdBy: Schema.Union([Schema.String, Schema.Null]),
    actorEmail: Schema.String,
    memberRole: Schema.String,
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "Campaign" }))();
export type CampaignRun = {
  readonly id: CampaignRunId;
  readonly campaignId: CampaignId;
  readonly status:
    | "scheduled"
    | "resolving"
    | "dispatching"
    | "paused"
    | "completed"
    | "cancelled"
    | "failed";
  readonly scheduledFor: string;
  readonly idempotencyKey: string | null;
  readonly startedAt: string | null;
  readonly completedAt: string | null;
  readonly contentSnapshot: CampaignContent;
  readonly audienceSnapshot: CampaignAudience;
  readonly policySnapshot: CampaignPolicy;
  readonly totalRecipients: number;
  readonly dispatchedCount: number;
  readonly failedCount: number;
  readonly skippedCount: number;
  readonly pendingCount: number;
  readonly skippedReasons: ReadonlyArray<CampaignRunSkippedReason>;
  readonly estimatedCompletionAt: string | null;
  readonly failureReason: string | null;
  readonly holdReason: string | null;
  readonly holdDomainId: EmailDomainId | null;
  readonly holdUntil: string | null;
  readonly capacityWarning: string | null;
  readonly lastContactId: string | null;
  readonly createdBy: string | null;
  readonly actorEmail: string;
  readonly memberRole: string;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const CampaignRun = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: CampaignRunId,
    campaignId: CampaignId,
    status: Schema.Union([
      Schema.Literal("scheduled"),
      Schema.Literal("resolving"),
      Schema.Literal("dispatching"),
      Schema.Literal("paused"),
      Schema.Literal("completed"),
      Schema.Literal("cancelled"),
      Schema.Literal("failed"),
    ]),
    scheduledFor: Schema.String,
    idempotencyKey: Schema.Union([Schema.String, Schema.Null]),
    startedAt: Schema.Union([Schema.String, Schema.Null]),
    completedAt: Schema.Union([Schema.String, Schema.Null]),
    contentSnapshot: CampaignContent,
    audienceSnapshot: CampaignAudience,
    policySnapshot: CampaignPolicy,
    totalRecipients: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    dispatchedCount: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    failedCount: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    skippedCount: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    pendingCount: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    skippedReasons: Schema.Array(CampaignRunSkippedReason),
    estimatedCompletionAt: Schema.Union([Schema.String, Schema.Null]),
    failureReason: Schema.Union([Schema.String, Schema.Null]),
    holdReason: Schema.Union([Schema.String, Schema.Null]),
    holdDomainId: Schema.Union([EmailDomainId, Schema.Null]),
    holdUntil: Schema.Union([Schema.String, Schema.Null]),
    capacityWarning: Schema.Union([Schema.String, Schema.Null]),
    lastContactId: Schema.Union([Schema.String, Schema.Null]),
    createdBy: Schema.Union([Schema.String, Schema.Null]),
    actorEmail: Schema.String,
    memberRole: Schema.String,
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "CampaignRun" }))();
export type CampaignPage = {
  readonly items: ReadonlyArray<CampaignListItem>;
  readonly nextCursor: string | null;
};
export const CampaignPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(CampaignListItem),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "CampaignPage" }))();
export type CampaignRunPage = {
  readonly items: ReadonlyArray<CampaignRun>;
  readonly nextCursor: string | null;
};
export const CampaignRunPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(CampaignRun),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "CampaignRunPage" }))();
export type CampaignRunAction = { readonly success: boolean; readonly item: CampaignRun };
export const CampaignRunAction = /* @__PURE__ */ (() =>
  Schema.Struct({ success: Schema.Boolean, item: CampaignRun }).annotate({
    identifier: "CampaignRunAction",
  }))();
export type CampaignsListQuery = {
  readonly status?: "draft" | "archived" | null;
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
};
export const CampaignsListQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    status: Schema.optionalKey(
      Schema.Union([
        Schema.Union([Schema.Literal("draft"), Schema.Literal("archived")]),
        Schema.Null,
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
    cursor: Schema.optionalKey(Schema.Union([Cursor, Schema.Null])),
  }))();
export type CampaignsList200 = CampaignPage;
export const CampaignsList200 = CampaignPage;
export type CampaignsList401 = UnauthorizedError;
export const CampaignsList401 = UnauthorizedError;
export type CampaignsList403 = ForbiddenError;
export const CampaignsList403 = ForbiddenError;
export type CampaignsList422 = ValidationError;
export const CampaignsList422 = ValidationError;
export type CampaignsList500 = InternalError;
export const CampaignsList500 = InternalError;
export type CampaignsList504 = GatewayTimeoutError;
export const CampaignsList504 = GatewayTimeoutError;
export type CampaignsCreateRequestJson = {
  readonly name: string;
  readonly channel: "email";
  readonly content: CampaignContentInput;
  readonly audience: CampaignAudience;
  readonly policy?: CampaignPolicy | null;
};
export const CampaignsCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.String,
    channel: Schema.Literal("email"),
    content: CampaignContentInput,
    audience: CampaignAudience,
    policy: Schema.optionalKey(Schema.Union([CampaignPolicy, Schema.Null])),
  }))();
export type CampaignsCreate201 = Campaign;
export const CampaignsCreate201 = Campaign;
export type CampaignsCreate401 = UnauthorizedError;
export const CampaignsCreate401 = UnauthorizedError;
export type CampaignsCreate403 = FlagDisabledError | ForbiddenError;
export const CampaignsCreate403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type CampaignsCreate422 = ValidationError;
export const CampaignsCreate422 = ValidationError;
export type CampaignsCreate500 = InternalError;
export const CampaignsCreate500 = InternalError;
export type CampaignsCreate504 = GatewayTimeoutError;
export const CampaignsCreate504 = GatewayTimeoutError;
export type CampaignsGetPathParams = { readonly id: CampaignId };
export const CampaignsGetPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: CampaignId }))();
export type CampaignsGet200 = Campaign;
export const CampaignsGet200 = Campaign;
export type CampaignsGet401 = UnauthorizedError;
export const CampaignsGet401 = UnauthorizedError;
export type CampaignsGet403 = ForbiddenError;
export const CampaignsGet403 = ForbiddenError;
export type CampaignsGet404 = ResourceNotFoundError;
export const CampaignsGet404 = ResourceNotFoundError;
export type CampaignsGet422 = ValidationError;
export const CampaignsGet422 = ValidationError;
export type CampaignsGet500 = InternalError;
export const CampaignsGet500 = InternalError;
export type CampaignsGet504 = GatewayTimeoutError;
export const CampaignsGet504 = GatewayTimeoutError;
export type CampaignsUpdatePathParams = { readonly id: CampaignId };
export const CampaignsUpdatePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: CampaignId }))();
export type CampaignsUpdateRequestJson = {
  readonly name?: string | null;
  readonly content?: CampaignContentInput | null;
  readonly audience?: CampaignAudience | null;
  readonly policy?: CampaignPolicy | null;
};
export const CampaignsUpdateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    content: Schema.optionalKey(Schema.Union([CampaignContentInput, Schema.Null])),
    audience: Schema.optionalKey(Schema.Union([CampaignAudience, Schema.Null])),
    policy: Schema.optionalKey(Schema.Union([CampaignPolicy, Schema.Null])),
  }))();
export type CampaignsUpdate200 = Campaign;
export const CampaignsUpdate200 = Campaign;
export type CampaignsUpdate401 = UnauthorizedError;
export const CampaignsUpdate401 = UnauthorizedError;
export type CampaignsUpdate403 = FlagDisabledError | ForbiddenError;
export const CampaignsUpdate403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type CampaignsUpdate404 = ResourceNotFoundError;
export const CampaignsUpdate404 = ResourceNotFoundError;
export type CampaignsUpdate409 = ConflictError;
export const CampaignsUpdate409 = ConflictError;
export type CampaignsUpdate422 = ValidationError;
export const CampaignsUpdate422 = ValidationError;
export type CampaignsUpdate500 = InternalError;
export const CampaignsUpdate500 = InternalError;
export type CampaignsUpdate504 = GatewayTimeoutError;
export const CampaignsUpdate504 = GatewayTimeoutError;
export type CampaignsArchivePathParams = { readonly id: CampaignId };
export const CampaignsArchivePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: CampaignId }))();
export type CampaignsArchive200 = Campaign;
export const CampaignsArchive200 = Campaign;
export type CampaignsArchive401 = UnauthorizedError;
export const CampaignsArchive401 = UnauthorizedError;
export type CampaignsArchive403 = ForbiddenError;
export const CampaignsArchive403 = ForbiddenError;
export type CampaignsArchive404 = ResourceNotFoundError;
export const CampaignsArchive404 = ResourceNotFoundError;
export type CampaignsArchive409 = ConflictError;
export const CampaignsArchive409 = ConflictError;
export type CampaignsArchive422 = ValidationError;
export const CampaignsArchive422 = ValidationError;
export type CampaignsArchive500 = InternalError;
export const CampaignsArchive500 = InternalError;
export type CampaignsArchive504 = GatewayTimeoutError;
export const CampaignsArchive504 = GatewayTimeoutError;
export type CampaignsListRunsPathParams = { readonly id: CampaignId };
export const CampaignsListRunsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: CampaignId }))();
export type CampaignsListRunsQuery = {
  readonly status?:
    | "scheduled"
    | "resolving"
    | "dispatching"
    | "paused"
    | "completed"
    | "cancelled"
    | "failed"
    | null;
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
};
export const CampaignsListRunsQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    status: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Literal("scheduled"),
          Schema.Literal("resolving"),
          Schema.Literal("dispatching"),
          Schema.Literal("paused"),
          Schema.Literal("completed"),
          Schema.Literal("cancelled"),
          Schema.Literal("failed"),
        ]),
        Schema.Null,
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
    cursor: Schema.optionalKey(Schema.Union([Cursor, Schema.Null])),
  }))();
export type CampaignsListRuns200 = CampaignRunPage;
export const CampaignsListRuns200 = CampaignRunPage;
export type CampaignsListRuns401 = UnauthorizedError;
export const CampaignsListRuns401 = UnauthorizedError;
export type CampaignsListRuns403 = ForbiddenError;
export const CampaignsListRuns403 = ForbiddenError;
export type CampaignsListRuns404 = ResourceNotFoundError;
export const CampaignsListRuns404 = ResourceNotFoundError;
export type CampaignsListRuns422 = ValidationError;
export const CampaignsListRuns422 = ValidationError;
export type CampaignsListRuns500 = InternalError;
export const CampaignsListRuns500 = InternalError;
export type CampaignsListRuns504 = GatewayTimeoutError;
export const CampaignsListRuns504 = GatewayTimeoutError;
export type CampaignsScheduleRunPathParams = { readonly id: CampaignId };
export const CampaignsScheduleRunPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: CampaignId }))();
export type CampaignsScheduleRunHeaders = { readonly "idempotency-key"?: string | null };
export const CampaignsScheduleRunHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        )
          .check(
            Schema.isMaxCodePoints(255).annotate({
              expected: "a string with at most 255 code points",
            }),
          )
          .check(
            Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
          ),
        Schema.Null,
      ]),
    ),
  }))();
export type CampaignsScheduleRunRequestJson = {
  readonly scheduledFor?: __SamvaRuntimeAbsoluteInstant | null;
};
export const CampaignsScheduleRunRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    scheduledFor: Schema.optionalKey(Schema.Union([__SamvaRuntimeAbsoluteInstant, Schema.Null])),
  }))();
export type CampaignsScheduleRun201 = CampaignRun;
export const CampaignsScheduleRun201 = CampaignRun;
export type CampaignsScheduleRun401 = UnauthorizedError;
export const CampaignsScheduleRun401 = UnauthorizedError;
export type CampaignsScheduleRun403 = FlagDisabledError | ForbiddenError;
export const CampaignsScheduleRun403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type CampaignsScheduleRun404 = ResourceNotFoundError;
export const CampaignsScheduleRun404 = ResourceNotFoundError;
export type CampaignsScheduleRun409 = ConflictError;
export const CampaignsScheduleRun409 = ConflictError;
export type CampaignsScheduleRun422 =
  | TemplateSourceError
  | FromAddressRequiredError
  | ValidationError
  | BrandAddressRequiredError
  | CampaignFooterRequiredError;
export const CampaignsScheduleRun422 = /* @__PURE__ */ (() =>
  Schema.Union([
    TemplateSourceError,
    FromAddressRequiredError,
    ValidationError,
    BrandAddressRequiredError,
    CampaignFooterRequiredError,
  ]))();
export type CampaignsScheduleRun500 = InternalError;
export const CampaignsScheduleRun500 = InternalError;
export type CampaignsScheduleRun502 = ExternalServiceError;
export const CampaignsScheduleRun502 = ExternalServiceError;
export type CampaignsScheduleRun503 = SenderNotReadyError;
export const CampaignsScheduleRun503 = SenderNotReadyError;
export type CampaignsScheduleRun504 = GatewayTimeoutError;
export const CampaignsScheduleRun504 = GatewayTimeoutError;
export type CampaignsGetRunPathParams = { readonly id: CampaignId; readonly runId: CampaignRunId };
export const CampaignsGetRunPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: CampaignId, runId: CampaignRunId }))();
export type CampaignsGetRun200 = CampaignRun;
export const CampaignsGetRun200 = CampaignRun;
export type CampaignsGetRun401 = UnauthorizedError;
export const CampaignsGetRun401 = UnauthorizedError;
export type CampaignsGetRun403 = ForbiddenError;
export const CampaignsGetRun403 = ForbiddenError;
export type CampaignsGetRun404 = ResourceNotFoundError;
export const CampaignsGetRun404 = ResourceNotFoundError;
export type CampaignsGetRun422 = ValidationError;
export const CampaignsGetRun422 = ValidationError;
export type CampaignsGetRun500 = InternalError;
export const CampaignsGetRun500 = InternalError;
export type CampaignsGetRun504 = GatewayTimeoutError;
export const CampaignsGetRun504 = GatewayTimeoutError;
export type CampaignsCancelRunPathParams = {
  readonly id: CampaignId;
  readonly runId: CampaignRunId;
};
export const CampaignsCancelRunPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: CampaignId, runId: CampaignRunId }))();
export type CampaignsCancelRun200 = CampaignRunAction;
export const CampaignsCancelRun200 = CampaignRunAction;
export type CampaignsCancelRun401 = UnauthorizedError;
export const CampaignsCancelRun401 = UnauthorizedError;
export type CampaignsCancelRun403 = ForbiddenError;
export const CampaignsCancelRun403 = ForbiddenError;
export type CampaignsCancelRun404 = ResourceNotFoundError;
export const CampaignsCancelRun404 = ResourceNotFoundError;
export type CampaignsCancelRun409 = ConflictError;
export const CampaignsCancelRun409 = ConflictError;
export type CampaignsCancelRun422 = ValidationError;
export const CampaignsCancelRun422 = ValidationError;
export type CampaignsCancelRun500 = InternalError;
export const CampaignsCancelRun500 = InternalError;
export type CampaignsCancelRun502 = ExternalServiceError;
export const CampaignsCancelRun502 = ExternalServiceError;
export type CampaignsCancelRun504 = GatewayTimeoutError;
export const CampaignsCancelRun504 = GatewayTimeoutError;
export type CampaignsPauseRunPathParams = {
  readonly id: CampaignId;
  readonly runId: CampaignRunId;
};
export const CampaignsPauseRunPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: CampaignId, runId: CampaignRunId }))();
export type CampaignsPauseRun200 = CampaignRunAction;
export const CampaignsPauseRun200 = CampaignRunAction;
export type CampaignsPauseRun401 = UnauthorizedError;
export const CampaignsPauseRun401 = UnauthorizedError;
export type CampaignsPauseRun403 = ForbiddenError;
export const CampaignsPauseRun403 = ForbiddenError;
export type CampaignsPauseRun404 = ResourceNotFoundError;
export const CampaignsPauseRun404 = ResourceNotFoundError;
export type CampaignsPauseRun409 = ConflictError;
export const CampaignsPauseRun409 = ConflictError;
export type CampaignsPauseRun422 = ValidationError;
export const CampaignsPauseRun422 = ValidationError;
export type CampaignsPauseRun500 = InternalError;
export const CampaignsPauseRun500 = InternalError;
export type CampaignsPauseRun502 = ExternalServiceError;
export const CampaignsPauseRun502 = ExternalServiceError;
export type CampaignsPauseRun504 = GatewayTimeoutError;
export const CampaignsPauseRun504 = GatewayTimeoutError;
export type CampaignsListRecipientsPathParams = {
  readonly id: CampaignId;
  readonly runId: CampaignRunId;
};
export const CampaignsListRecipientsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: CampaignId, runId: CampaignRunId }))();
export type CampaignsListRecipientsQuery = {
  readonly status?: "pending" | "dispatching" | "dispatched" | "failed" | "skipped" | null;
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
};
export const CampaignsListRecipientsQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    status: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Literal("pending"),
          Schema.Literal("dispatching"),
          Schema.Literal("dispatched"),
          Schema.Literal("failed"),
          Schema.Literal("skipped"),
        ]),
        Schema.Null,
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
    cursor: Schema.optionalKey(Schema.Union([Cursor, Schema.Null])),
  }))();
export type CampaignsListRecipients200 = CampaignRecipientPage;
export const CampaignsListRecipients200 = CampaignRecipientPage;
export type CampaignsListRecipients401 = UnauthorizedError;
export const CampaignsListRecipients401 = UnauthorizedError;
export type CampaignsListRecipients403 = ForbiddenError;
export const CampaignsListRecipients403 = ForbiddenError;
export type CampaignsListRecipients404 = ResourceNotFoundError;
export const CampaignsListRecipients404 = ResourceNotFoundError;
export type CampaignsListRecipients422 = ValidationError;
export const CampaignsListRecipients422 = ValidationError;
export type CampaignsListRecipients500 = InternalError;
export const CampaignsListRecipients500 = InternalError;
export type CampaignsListRecipients504 = GatewayTimeoutError;
export const CampaignsListRecipients504 = GatewayTimeoutError;
export type CampaignsGetRunReportPathParams = {
  readonly id: CampaignId;
  readonly runId: CampaignRunId;
};
export const CampaignsGetRunReportPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: CampaignId, runId: CampaignRunId }))();
export type CampaignsGetRunReport200 = CampaignRunReport;
export const CampaignsGetRunReport200 = CampaignRunReport;
export type CampaignsGetRunReport401 = UnauthorizedError;
export const CampaignsGetRunReport401 = UnauthorizedError;
export type CampaignsGetRunReport403 = ForbiddenError;
export const CampaignsGetRunReport403 = ForbiddenError;
export type CampaignsGetRunReport404 = ResourceNotFoundError;
export const CampaignsGetRunReport404 = ResourceNotFoundError;
export type CampaignsGetRunReport422 = ValidationError;
export const CampaignsGetRunReport422 = ValidationError;
export type CampaignsGetRunReport500 = InternalError;
export const CampaignsGetRunReport500 = InternalError;
export type CampaignsGetRunReport504 = GatewayTimeoutError;
export const CampaignsGetRunReport504 = GatewayTimeoutError;
export type CampaignsResumeRunPathParams = {
  readonly id: CampaignId;
  readonly runId: CampaignRunId;
};
export const CampaignsResumeRunPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: CampaignId, runId: CampaignRunId }))();
export type CampaignsResumeRun200 = CampaignRunAction;
export const CampaignsResumeRun200 = CampaignRunAction;
export type CampaignsResumeRun401 = UnauthorizedError;
export const CampaignsResumeRun401 = UnauthorizedError;
export type CampaignsResumeRun403 = ForbiddenError;
export const CampaignsResumeRun403 = ForbiddenError;
export type CampaignsResumeRun404 = ResourceNotFoundError;
export const CampaignsResumeRun404 = ResourceNotFoundError;
export type CampaignsResumeRun409 = ConflictError;
export const CampaignsResumeRun409 = ConflictError;
export type CampaignsResumeRun422 = ValidationError;
export const CampaignsResumeRun422 = ValidationError;
export type CampaignsResumeRun500 = InternalError;
export const CampaignsResumeRun500 = InternalError;
export type CampaignsResumeRun502 = ExternalServiceError;
export const CampaignsResumeRun502 = ExternalServiceError;
export type CampaignsResumeRun504 = GatewayTimeoutError;
export const CampaignsResumeRun504 = GatewayTimeoutError;
export type CampaignsPreviewRequestJson = {
  readonly content: CampaignContentInput;
  readonly audience: CampaignAudience;
  readonly contactId?: ContactId | null;
};
export const CampaignsPreviewRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    content: CampaignContentInput,
    audience: CampaignAudience,
    contactId: Schema.optionalKey(Schema.Union([ContactId, Schema.Null])),
  }))();
export type CampaignsPreview200 = CampaignPreview;
export const CampaignsPreview200 = CampaignPreview;
export type CampaignsPreview401 = UnauthorizedError;
export const CampaignsPreview401 = UnauthorizedError;
export type CampaignsPreview403 = FlagDisabledError | ForbiddenError;
export const CampaignsPreview403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type CampaignsPreview404 = ResourceNotFoundError;
export const CampaignsPreview404 = ResourceNotFoundError;
export type CampaignsPreview409 = ConflictError;
export const CampaignsPreview409 = ConflictError;
export type CampaignsPreview422 = TemplateSourceError | ValidationError;
export const CampaignsPreview422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type CampaignsPreview500 = InternalError;
export const CampaignsPreview500 = InternalError;
export type CampaignsPreview504 = GatewayTimeoutError;
export const CampaignsPreview504 = GatewayTimeoutError;
export type CampaignsSendTestRequestJson = {
  readonly content: CampaignContentInput;
  readonly audience: CampaignAudience;
  readonly contactId?: ContactId | null;
};
export const CampaignsSendTestRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    content: CampaignContentInput,
    audience: CampaignAudience,
    contactId: Schema.optionalKey(Schema.Union([ContactId, Schema.Null])),
  }))();
export type CampaignsSendTest200 = CampaignTestSend;
export const CampaignsSendTest200 = CampaignTestSend;
export type CampaignsSendTest401 = UnauthorizedError;
export const CampaignsSendTest401 = UnauthorizedError;
export type CampaignsSendTest402 = PaymentRequiredError;
export const CampaignsSendTest402 = PaymentRequiredError;
export type CampaignsSendTest403 =
  | ForbiddenError
  | OnboardingReviewRequiredError
  | FlagDisabledError;
export const CampaignsSendTest403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, OnboardingReviewRequiredError, FlagDisabledError]))();
export type CampaignsSendTest404 = ResourceNotFoundError;
export const CampaignsSendTest404 = ResourceNotFoundError;
export type CampaignsSendTest409 = ConflictError;
export const CampaignsSendTest409 = ConflictError;
export type CampaignsSendTest422 =
  | TemplateSourceError
  | ValidationError
  | FromAddressRequiredError
  | BrandAddressRequiredError
  | CampaignFooterRequiredError;
export const CampaignsSendTest422 = /* @__PURE__ */ (() =>
  Schema.Union([
    TemplateSourceError,
    ValidationError,
    FromAddressRequiredError,
    BrandAddressRequiredError,
    CampaignFooterRequiredError,
  ]))();
export type CampaignsSendTest429 = RateLimitedError;
export const CampaignsSendTest429 = RateLimitedError;
export type CampaignsSendTest500 = InternalError;
export const CampaignsSendTest500 = InternalError;
export type CampaignsSendTest502 = BillingProviderError | ExternalServiceError;
export const CampaignsSendTest502 = /* @__PURE__ */ (() =>
  Schema.Union([BillingProviderError, ExternalServiceError]))();
export type CampaignsSendTest503 = SenderNotReadyError | DeliveryUnavailableError;
export const CampaignsSendTest503 = /* @__PURE__ */ (() =>
  Schema.Union([SenderNotReadyError, DeliveryUnavailableError]))();
export type CampaignsSendTest504 = GatewayTimeoutError;
export const CampaignsSendTest504 = GatewayTimeoutError;

export class CampaignsGroup extends HttpApiGroup.make("Campaigns")
  .add(
    HttpApiEndpoint.get("campaignsList", "/v1/campaigns", {
      query: CampaignsListQuery,
      success: CampaignsList200,
      error: [
        CampaignsList401.pipe(HttpApiSchema.status(401)),
        CampaignsList403.pipe(HttpApiSchema.status(403)),
        CampaignsList422.pipe(HttpApiSchema.status(422)),
        CampaignsList500,
        CampaignsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "campaigns.list")
      .annotate(OpenApi.Summary, "List campaigns")
      .annotate(
        OpenApi.Description,
        "Returns the organization's campaigns, newest first, optionally filtered by status. Each row carries `series`, the last 14 days of daily email sends the campaign produced, oldest first. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.post("campaignsCreate", "/v1/campaigns", {
      payload: CampaignsCreateRequestJson,
      success: CampaignsCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        CampaignsCreate401.pipe(HttpApiSchema.status(401)),
        CampaignsCreate403.pipe(HttpApiSchema.status(403)),
        CampaignsCreate422.pipe(HttpApiSchema.status(422)),
        CampaignsCreate500,
        CampaignsCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "campaigns.create")
      .annotate(OpenApi.Summary, "Create a campaign")
      .annotate(
        OpenApi.Description,
        "Creates an email campaign draft for the given audience and content, returning the created campaign.",
      ),
    HttpApiEndpoint.get("campaignsGet", "/v1/campaigns/:id", {
      params: CampaignsGetPathParams,
      success: CampaignsGet200,
      error: [
        CampaignsGet401.pipe(HttpApiSchema.status(401)),
        CampaignsGet403.pipe(HttpApiSchema.status(403)),
        CampaignsGet404.pipe(HttpApiSchema.status(404)),
        CampaignsGet422.pipe(HttpApiSchema.status(422)),
        CampaignsGet500,
        CampaignsGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "campaigns.get")
      .annotate(OpenApi.Summary, "Get a campaign")
      .annotate(
        OpenApi.Description,
        "Returns a single campaign, including its content, audience, and policy, by its identifier.",
      ),
    HttpApiEndpoint.patch("campaignsUpdate", "/v1/campaigns/:id", {
      params: CampaignsUpdatePathParams,
      payload: CampaignsUpdateRequestJson,
      success: CampaignsUpdate200,
      error: [
        CampaignsUpdate401.pipe(HttpApiSchema.status(401)),
        CampaignsUpdate403.pipe(HttpApiSchema.status(403)),
        CampaignsUpdate404.pipe(HttpApiSchema.status(404)),
        CampaignsUpdate409.pipe(HttpApiSchema.status(409)),
        CampaignsUpdate422.pipe(HttpApiSchema.status(422)),
        CampaignsUpdate500,
        CampaignsUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "campaigns.update")
      .annotate(OpenApi.Summary, "Update a campaign")
      .annotate(
        OpenApi.Description,
        "Updates the name, content, audience, or policy of a campaign draft.",
      ),
    HttpApiEndpoint.post("campaignsArchive", "/v1/campaigns/:id/archive", {
      params: CampaignsArchivePathParams,
      success: CampaignsArchive200,
      error: [
        CampaignsArchive401.pipe(HttpApiSchema.status(401)),
        CampaignsArchive403.pipe(HttpApiSchema.status(403)),
        CampaignsArchive404.pipe(HttpApiSchema.status(404)),
        CampaignsArchive409.pipe(HttpApiSchema.status(409)),
        CampaignsArchive422.pipe(HttpApiSchema.status(422)),
        CampaignsArchive500,
        CampaignsArchive504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "campaigns.archive")
      .annotate(OpenApi.Summary, "Archive a campaign")
      .annotate(
        OpenApi.Description,
        "Archives a draft campaign so it can no longer be scheduled, returning the archived campaign.",
      ),
    HttpApiEndpoint.get("campaignsListRuns", "/v1/campaigns/:id/runs", {
      params: CampaignsListRunsPathParams,
      query: CampaignsListRunsQuery,
      success: CampaignsListRuns200,
      error: [
        CampaignsListRuns401.pipe(HttpApiSchema.status(401)),
        CampaignsListRuns403.pipe(HttpApiSchema.status(403)),
        CampaignsListRuns404.pipe(HttpApiSchema.status(404)),
        CampaignsListRuns422.pipe(HttpApiSchema.status(422)),
        CampaignsListRuns500,
        CampaignsListRuns504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "campaigns.listRuns")
      .annotate(OpenApi.Summary, "List campaign runs")
      .annotate(
        OpenApi.Description,
        "Returns a campaign's runs, newest first, optionally filtered by status. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.post("campaignsScheduleRun", "/v1/campaigns/:id/runs", {
      params: CampaignsScheduleRunPathParams,
      headers: CampaignsScheduleRunHeaders,
      payload: CampaignsScheduleRunRequestJson,
      success: CampaignsScheduleRun201.pipe(HttpApiSchema.status(201)),
      error: [
        CampaignsScheduleRun401.pipe(HttpApiSchema.status(401)),
        CampaignsScheduleRun403.pipe(HttpApiSchema.status(403)),
        CampaignsScheduleRun404.pipe(HttpApiSchema.status(404)),
        CampaignsScheduleRun409.pipe(HttpApiSchema.status(409)),
        CampaignsScheduleRun422.pipe(HttpApiSchema.status(422)),
        CampaignsScheduleRun500,
        CampaignsScheduleRun502.pipe(HttpApiSchema.status(502)),
        CampaignsScheduleRun503.pipe(HttpApiSchema.status(503)),
        CampaignsScheduleRun504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "campaigns.scheduleRun")
      .annotate(OpenApi.Summary, "Schedule a campaign run")
      .annotate(
        OpenApi.Description,
        "Schedules an email campaign run at the absolute ISO-8601 instant in scheduledFor, or immediately when omitted. The optional Idempotency-Key header is scoped to the organization and replays return the original run. An email campaign must carry the brand footer: it is refused with CampaignFooterRequiredError when its footer is off and its template renders no BrandFooter, and with BrandAddressRequiredError when a brand that signs it off has no postal address.",
      ),
    HttpApiEndpoint.get("campaignsGetRun", "/v1/campaigns/:id/runs/:runId", {
      params: CampaignsGetRunPathParams,
      success: CampaignsGetRun200,
      error: [
        CampaignsGetRun401.pipe(HttpApiSchema.status(401)),
        CampaignsGetRun403.pipe(HttpApiSchema.status(403)),
        CampaignsGetRun404.pipe(HttpApiSchema.status(404)),
        CampaignsGetRun422.pipe(HttpApiSchema.status(422)),
        CampaignsGetRun500,
        CampaignsGetRun504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "campaigns.getRun")
      .annotate(OpenApi.Summary, "Get a campaign run")
      .annotate(OpenApi.Description, "Returns a single run of a campaign by its identifier."),
    HttpApiEndpoint.post("campaignsCancelRun", "/v1/campaigns/:id/runs/:runId/cancel", {
      params: CampaignsCancelRunPathParams,
      success: CampaignsCancelRun200,
      error: [
        CampaignsCancelRun401.pipe(HttpApiSchema.status(401)),
        CampaignsCancelRun403.pipe(HttpApiSchema.status(403)),
        CampaignsCancelRun404.pipe(HttpApiSchema.status(404)),
        CampaignsCancelRun409.pipe(HttpApiSchema.status(409)),
        CampaignsCancelRun422.pipe(HttpApiSchema.status(422)),
        CampaignsCancelRun500,
        CampaignsCancelRun502.pipe(HttpApiSchema.status(502)),
        CampaignsCancelRun504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "campaigns.cancelRun")
      .annotate(OpenApi.Summary, "Cancel a campaign run")
      .annotate(
        OpenApi.Description,
        "Best-effort cancellation: pending recipients are skipped, while deliveries already handed off for sending may finish. Returns the updated run.",
      ),
    HttpApiEndpoint.post("campaignsPauseRun", "/v1/campaigns/:id/runs/:runId/pause", {
      params: CampaignsPauseRunPathParams,
      success: CampaignsPauseRun200,
      error: [
        CampaignsPauseRun401.pipe(HttpApiSchema.status(401)),
        CampaignsPauseRun403.pipe(HttpApiSchema.status(403)),
        CampaignsPauseRun404.pipe(HttpApiSchema.status(404)),
        CampaignsPauseRun409.pipe(HttpApiSchema.status(409)),
        CampaignsPauseRun422.pipe(HttpApiSchema.status(422)),
        CampaignsPauseRun500,
        CampaignsPauseRun502.pipe(HttpApiSchema.status(502)),
        CampaignsPauseRun504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "campaigns.pauseRun")
      .annotate(OpenApi.Summary, "Pause a campaign run")
      .annotate(
        OpenApi.Description,
        "Pauses an in-progress campaign run and returns the updated run.",
      ),
    HttpApiEndpoint.get("campaignsListRecipients", "/v1/campaigns/:id/runs/:runId/recipients", {
      params: CampaignsListRecipientsPathParams,
      query: CampaignsListRecipientsQuery,
      success: CampaignsListRecipients200,
      error: [
        CampaignsListRecipients401.pipe(HttpApiSchema.status(401)),
        CampaignsListRecipients403.pipe(HttpApiSchema.status(403)),
        CampaignsListRecipients404.pipe(HttpApiSchema.status(404)),
        CampaignsListRecipients422.pipe(HttpApiSchema.status(422)),
        CampaignsListRecipients500,
        CampaignsListRecipients504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "campaigns.listRecipients")
      .annotate(OpenApi.Summary, "List campaign recipients")
      .annotate(
        OpenApi.Description,
        "Returns a campaign run's recipients in the order the run admitted them, optionally filtered by status. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.get("campaignsGetRunReport", "/v1/campaigns/:id/runs/:runId/report", {
      params: CampaignsGetRunReportPathParams,
      success: CampaignsGetRunReport200,
      error: [
        CampaignsGetRunReport401.pipe(HttpApiSchema.status(401)),
        CampaignsGetRunReport403.pipe(HttpApiSchema.status(403)),
        CampaignsGetRunReport404.pipe(HttpApiSchema.status(404)),
        CampaignsGetRunReport422.pipe(HttpApiSchema.status(422)),
        CampaignsGetRunReport500,
        CampaignsGetRunReport504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "campaigns.getRunReport")
      .annotate(OpenApi.Summary, "Get a campaign run report")
      .annotate(
        OpenApi.Description,
        "Returns delivery outcomes, topic unsubscribes, replies, and skip reasons for an email campaign run. Non-email runs return 404. Namespace-scoped reads require an existing audience topic in that namespace. Opens and clicks are directional counts of unique recipients excluding machine events, not exact measurements.",
      ),
    HttpApiEndpoint.post("campaignsResumeRun", "/v1/campaigns/:id/runs/:runId/resume", {
      params: CampaignsResumeRunPathParams,
      success: CampaignsResumeRun200,
      error: [
        CampaignsResumeRun401.pipe(HttpApiSchema.status(401)),
        CampaignsResumeRun403.pipe(HttpApiSchema.status(403)),
        CampaignsResumeRun404.pipe(HttpApiSchema.status(404)),
        CampaignsResumeRun409.pipe(HttpApiSchema.status(409)),
        CampaignsResumeRun422.pipe(HttpApiSchema.status(422)),
        CampaignsResumeRun500,
        CampaignsResumeRun502.pipe(HttpApiSchema.status(502)),
        CampaignsResumeRun504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "campaigns.resumeRun")
      .annotate(OpenApi.Summary, "Resume a campaign run")
      .annotate(OpenApi.Description, "Resumes a paused campaign run and returns the updated run."),
    HttpApiEndpoint.post("campaignsPreview", "/v1/campaigns/preview", {
      payload: CampaignsPreviewRequestJson,
      success: CampaignsPreview200,
      error: [
        CampaignsPreview401.pipe(HttpApiSchema.status(401)),
        CampaignsPreview403.pipe(HttpApiSchema.status(403)),
        CampaignsPreview404.pipe(HttpApiSchema.status(404)),
        CampaignsPreview409.pipe(HttpApiSchema.status(409)),
        CampaignsPreview422.pipe(HttpApiSchema.status(422)),
        CampaignsPreview500,
        CampaignsPreview504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "campaigns.preview")
      .annotate(OpenApi.Summary, "Preview a campaign email")
      .annotate(
        OpenApi.Description,
        "Renders draft email content using the selected contact's fields and declared templateData fallbacks. Creates no campaign run or message. Omit contactId to preview the fallback data alone.",
      ),
    HttpApiEndpoint.post("campaignsSendTest", "/v1/campaigns/test-send", {
      payload: CampaignsSendTestRequestJson,
      success: CampaignsSendTest200,
      error: [
        CampaignsSendTest401.pipe(HttpApiSchema.status(401)),
        CampaignsSendTest402.pipe(HttpApiSchema.status(402)),
        CampaignsSendTest403.pipe(HttpApiSchema.status(403)),
        CampaignsSendTest404.pipe(HttpApiSchema.status(404)),
        CampaignsSendTest409.pipe(HttpApiSchema.status(409)),
        CampaignsSendTest422.pipe(HttpApiSchema.status(422)),
        CampaignsSendTest429.pipe(HttpApiSchema.status(429)),
        CampaignsSendTest500,
        CampaignsSendTest502.pipe(HttpApiSchema.status(502)),
        CampaignsSendTest503.pipe(HttpApiSchema.status(503)),
        CampaignsSendTest504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "campaigns.sendTest")
      .annotate(OpenApi.Summary, "Send a campaign test")
      .annotate(
        OpenApi.Description,
        "Sends one rendered draft email to the authenticated actor's email address, using optional contactId only for personalization. Creates no campaign run. Normal sending permissions, billing, and delivery policies apply.",
      ),
  )
  .annotate(OpenApi.Description, "Campaign drafts and scheduled campaign runs") {}
