// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  ConflictError,
  ConversationId,
  Cursor,
  EmailAttachments,
  EmailBccRecipients,
  EmailCcRecipients,
  EmailContent,
  EmailCustomHeaders,
  EmailFooterOverride,
  EmailRecipients,
  EmailSender,
  EmailTrackingOverrideV1,
  ExternalServiceError,
  FlagDisabledError,
  ForbiddenError,
  FromAddressRequiredError,
  GatewayTimeoutError,
  IanaTimezone,
  InternalError,
  MessageId,
  MessageMetadata,
  RenderLocale,
  RenderTimeZone,
  ReplyToAddresses,
  ResourceNotFoundError,
  SenderNotReadyError,
  TemplateData,
  TemplateId,
  TemplateInputContractId,
  TemplatePublicationId,
  TopicId,
  UnauthorizedError,
  ValidationError,
  __SamvaRuntimeAbsoluteInstant,
} from "./shared";

export type ScheduledMessageId = string & EffectBrand.Brand<"ScheduledMessageId">;
export const ScheduledMessageId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^sched_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^sched_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "ScheduledMessageId",
    }),
  ).pipe(Schema.brand("ScheduledMessageId")))();
export type EmailDispatchContent = {
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
};
export const EmailDispatchContent = /* @__PURE__ */ (() =>
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
  }).annotate({ identifier: "EmailDispatchContent" }))();
export type SendMessagePayload = {
  readonly conversationId?: ConversationId | null;
  readonly metadata?: MessageMetadata;
  readonly channel: "email";
  readonly to: EmailRecipients;
  readonly cc?: EmailCcRecipients;
  readonly bcc?: EmailBccRecipients;
  readonly from?: EmailSender;
  readonly email: EmailContent;
};
export const SendMessagePayload = /* @__PURE__ */ (() =>
  Schema.Struct({
    conversationId: Schema.optionalKey(Schema.Union([ConversationId, Schema.Null])),
    metadata: Schema.optionalKey(MessageMetadata),
    channel: Schema.Literal("email"),
    to: EmailRecipients,
    cc: Schema.optionalKey(EmailCcRecipients),
    bcc: Schema.optionalKey(EmailBccRecipients),
    from: Schema.optionalKey(EmailSender),
    email: EmailContent,
  }).annotate({ identifier: "SendMessagePayload" }))();
export type DispatchSendMessagePayload = {
  readonly conversationId?: ConversationId | null;
  readonly metadata?: MessageMetadata;
  readonly channel: "email";
  readonly to: EmailRecipients;
  readonly cc?: EmailCcRecipients;
  readonly bcc?: EmailBccRecipients;
  readonly from?: EmailSender;
  readonly email: EmailDispatchContent;
};
export const DispatchSendMessagePayload = /* @__PURE__ */ (() =>
  Schema.Struct({
    conversationId: Schema.optionalKey(Schema.Union([ConversationId, Schema.Null])),
    metadata: Schema.optionalKey(MessageMetadata),
    channel: Schema.Literal("email"),
    to: EmailRecipients,
    cc: Schema.optionalKey(EmailCcRecipients),
    bcc: Schema.optionalKey(EmailBccRecipients),
    from: Schema.optionalKey(EmailSender),
    email: EmailDispatchContent,
  }).annotate({ identifier: "DispatchSendMessagePayload" }))();
export type ScheduledMessage = {
  readonly id: ScheduledMessageId;
  readonly status: "pending" | "dispatching" | "paused" | "dispatched" | "cancelled" | "failed";
  readonly scheduledFor: string;
  readonly timezone: string;
  readonly send: SendMessagePayload;
  readonly messageId: MessageId | null;
  readonly idempotencyKey: string | null;
  readonly referenceId: string | null;
  readonly failureReason: string | null;
  readonly attempts: number;
  readonly createdBy: string | null;
  readonly actorEmail: string;
  readonly memberRole: string;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const ScheduledMessage = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: ScheduledMessageId,
    status: Schema.Union([
      Schema.Literal("pending"),
      Schema.Literal("dispatching"),
      Schema.Literal("paused"),
      Schema.Literal("dispatched"),
      Schema.Literal("cancelled"),
      Schema.Literal("failed"),
    ]),
    scheduledFor: Schema.String,
    timezone: Schema.String,
    send: SendMessagePayload,
    messageId: Schema.Union([MessageId, Schema.Null]),
    idempotencyKey: Schema.Union([Schema.String, Schema.Null]),
    referenceId: Schema.Union([Schema.String, Schema.Null]),
    failureReason: Schema.Union([Schema.String, Schema.Null]),
    attempts: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    createdBy: Schema.Union([Schema.String, Schema.Null]),
    actorEmail: Schema.String,
    memberRole: Schema.String,
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "ScheduledMessage" }))();
export type ScheduledMessagePage = {
  readonly items: ReadonlyArray<ScheduledMessage>;
  readonly nextCursor: string | null;
};
export const ScheduledMessagePage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(ScheduledMessage),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "ScheduledMessagePage" }))();
export type ScheduledMessagesListQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
  readonly status?:
    | "pending"
    | "dispatching"
    | "paused"
    | "dispatched"
    | "cancelled"
    | "failed"
    | null;
};
export const ScheduledMessagesListQuery = /* @__PURE__ */ (() =>
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
    cursor: Schema.optionalKey(Schema.Union([Cursor, Schema.Null])),
    status: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Literal("pending"),
          Schema.Literal("dispatching"),
          Schema.Literal("paused"),
          Schema.Literal("dispatched"),
          Schema.Literal("cancelled"),
          Schema.Literal("failed"),
        ]),
        Schema.Null,
      ]),
    ),
  }))();
export type ScheduledMessagesList200 = ScheduledMessagePage;
export const ScheduledMessagesList200 = ScheduledMessagePage;
export type ScheduledMessagesList401 = UnauthorizedError;
export const ScheduledMessagesList401 = UnauthorizedError;
export type ScheduledMessagesList403 = ForbiddenError;
export const ScheduledMessagesList403 = ForbiddenError;
export type ScheduledMessagesList422 = ValidationError;
export const ScheduledMessagesList422 = ValidationError;
export type ScheduledMessagesList500 = InternalError;
export const ScheduledMessagesList500 = InternalError;
export type ScheduledMessagesList504 = GatewayTimeoutError;
export const ScheduledMessagesList504 = GatewayTimeoutError;
export type ScheduledMessagesCreateHeaders = { readonly "idempotency-key"?: string | null };
export const ScheduledMessagesCreateHeaders = /* @__PURE__ */ (() =>
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
export type ScheduledMessagesCreateRequestJson = {
  readonly send: DispatchSendMessagePayload;
  readonly scheduledFor: __SamvaRuntimeAbsoluteInstant;
  readonly timezone?: IanaTimezone | null;
  readonly referenceId?: string | null;
};
export const ScheduledMessagesCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    send: DispatchSendMessagePayload,
    scheduledFor: __SamvaRuntimeAbsoluteInstant,
    timezone: Schema.optionalKey(Schema.Union([IanaTimezone, Schema.Null])),
    referenceId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type ScheduledMessagesCreate201 = ScheduledMessage;
export const ScheduledMessagesCreate201 = ScheduledMessage;
export type ScheduledMessagesCreate401 = UnauthorizedError;
export const ScheduledMessagesCreate401 = UnauthorizedError;
export type ScheduledMessagesCreate403 = FlagDisabledError | ForbiddenError;
export const ScheduledMessagesCreate403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type ScheduledMessagesCreate409 = ConflictError;
export const ScheduledMessagesCreate409 = ConflictError;
export type ScheduledMessagesCreate422 = ValidationError;
export const ScheduledMessagesCreate422 = ValidationError;
export type ScheduledMessagesCreate500 = InternalError;
export const ScheduledMessagesCreate500 = InternalError;
export type ScheduledMessagesCreate502 = ExternalServiceError;
export const ScheduledMessagesCreate502 = ExternalServiceError;
export type ScheduledMessagesCreate504 = GatewayTimeoutError;
export const ScheduledMessagesCreate504 = GatewayTimeoutError;
export type ScheduledMessagesGetPathParams = { readonly id: ScheduledMessageId };
export const ScheduledMessagesGetPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ScheduledMessageId }))();
export type ScheduledMessagesGet200 = ScheduledMessage;
export const ScheduledMessagesGet200 = ScheduledMessage;
export type ScheduledMessagesGet401 = UnauthorizedError;
export const ScheduledMessagesGet401 = UnauthorizedError;
export type ScheduledMessagesGet403 = ForbiddenError;
export const ScheduledMessagesGet403 = ForbiddenError;
export type ScheduledMessagesGet404 = ResourceNotFoundError;
export const ScheduledMessagesGet404 = ResourceNotFoundError;
export type ScheduledMessagesGet422 = ValidationError;
export const ScheduledMessagesGet422 = ValidationError;
export type ScheduledMessagesGet500 = InternalError;
export const ScheduledMessagesGet500 = InternalError;
export type ScheduledMessagesGet504 = GatewayTimeoutError;
export const ScheduledMessagesGet504 = GatewayTimeoutError;
export type ScheduledMessagesCancelPathParams = { readonly id: ScheduledMessageId };
export const ScheduledMessagesCancelPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ScheduledMessageId }))();
export type ScheduledMessagesCancel200 = {
  readonly success: boolean;
  readonly item: ScheduledMessage;
};
export const ScheduledMessagesCancel200 = /* @__PURE__ */ (() =>
  Schema.Struct({ success: Schema.Boolean, item: ScheduledMessage }))();
export type ScheduledMessagesCancel401 = UnauthorizedError;
export const ScheduledMessagesCancel401 = UnauthorizedError;
export type ScheduledMessagesCancel403 = ForbiddenError;
export const ScheduledMessagesCancel403 = ForbiddenError;
export type ScheduledMessagesCancel404 = ResourceNotFoundError;
export const ScheduledMessagesCancel404 = ResourceNotFoundError;
export type ScheduledMessagesCancel409 = ConflictError;
export const ScheduledMessagesCancel409 = ConflictError;
export type ScheduledMessagesCancel422 = ValidationError;
export const ScheduledMessagesCancel422 = ValidationError;
export type ScheduledMessagesCancel500 = InternalError;
export const ScheduledMessagesCancel500 = InternalError;
export type ScheduledMessagesCancel504 = GatewayTimeoutError;
export const ScheduledMessagesCancel504 = GatewayTimeoutError;
export type ScheduledMessagesResumePathParams = { readonly id: ScheduledMessageId };
export const ScheduledMessagesResumePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ScheduledMessageId }))();
export type ScheduledMessagesResumeRequestJson =
  | { readonly choice: "send_now" }
  | { readonly choice: "new_time"; readonly scheduledFor: __SamvaRuntimeAbsoluteInstant };
export const ScheduledMessagesResumeRequestJson = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Struct({ choice: Schema.Literal("send_now") }),
    Schema.Struct({
      choice: Schema.Literal("new_time"),
      scheduledFor: __SamvaRuntimeAbsoluteInstant,
    }),
  ]))();
export type ScheduledMessagesResume200 = ScheduledMessage;
export const ScheduledMessagesResume200 = ScheduledMessage;
export type ScheduledMessagesResume401 = UnauthorizedError;
export const ScheduledMessagesResume401 = UnauthorizedError;
export type ScheduledMessagesResume403 = ForbiddenError;
export const ScheduledMessagesResume403 = ForbiddenError;
export type ScheduledMessagesResume404 = ResourceNotFoundError;
export const ScheduledMessagesResume404 = ResourceNotFoundError;
export type ScheduledMessagesResume409 = ConflictError;
export const ScheduledMessagesResume409 = ConflictError;
export type ScheduledMessagesResume422 = FromAddressRequiredError | ValidationError;
export const ScheduledMessagesResume422 = /* @__PURE__ */ (() =>
  Schema.Union([FromAddressRequiredError, ValidationError]))();
export type ScheduledMessagesResume500 = InternalError;
export const ScheduledMessagesResume500 = InternalError;
export type ScheduledMessagesResume502 = ExternalServiceError;
export const ScheduledMessagesResume502 = ExternalServiceError;
export type ScheduledMessagesResume503 = SenderNotReadyError;
export const ScheduledMessagesResume503 = SenderNotReadyError;
export type ScheduledMessagesResume504 = GatewayTimeoutError;
export const ScheduledMessagesResume504 = GatewayTimeoutError;

export class ScheduledMessagesGroup extends HttpApiGroup.make("Scheduled Messages")
  .add(
    HttpApiEndpoint.get("scheduledMessagesList", "/v1/messages/scheduled", {
      query: ScheduledMessagesListQuery,
      success: ScheduledMessagesList200,
      error: [
        ScheduledMessagesList401.pipe(HttpApiSchema.status(401)),
        ScheduledMessagesList403.pipe(HttpApiSchema.status(403)),
        ScheduledMessagesList422.pipe(HttpApiSchema.status(422)),
        ScheduledMessagesList500,
        ScheduledMessagesList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "scheduledMessages.list")
      .annotate(OpenApi.Summary, "List scheduled messages")
      .annotate(
        OpenApi.Description,
        "Returns scheduled messages, soonest send first, optionally filtered by status. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.post("scheduledMessagesCreate", "/v1/messages/scheduled", {
      headers: ScheduledMessagesCreateHeaders,
      payload: ScheduledMessagesCreateRequestJson,
      success: ScheduledMessagesCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        ScheduledMessagesCreate401.pipe(HttpApiSchema.status(401)),
        ScheduledMessagesCreate403.pipe(HttpApiSchema.status(403)),
        ScheduledMessagesCreate409.pipe(HttpApiSchema.status(409)),
        ScheduledMessagesCreate422.pipe(HttpApiSchema.status(422)),
        ScheduledMessagesCreate500,
        ScheduledMessagesCreate502.pipe(HttpApiSchema.status(502)),
        ScheduledMessagesCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "scheduledMessages.create")
      .annotate(OpenApi.Summary, "Schedule a message")
      .annotate(
        OpenApi.Description,
        "Schedules a message for dispatch at the absolute ISO-8601 timestamp supplied in scheduledFor. Requires `messages:create` or the send permission of the channel it sends on, such as `email:send`. Optional timezone is validated IANA display metadata only and never changes the execution instant.",
      ),
    HttpApiEndpoint.get("scheduledMessagesGet", "/v1/messages/scheduled/:id", {
      params: ScheduledMessagesGetPathParams,
      success: ScheduledMessagesGet200,
      error: [
        ScheduledMessagesGet401.pipe(HttpApiSchema.status(401)),
        ScheduledMessagesGet403.pipe(HttpApiSchema.status(403)),
        ScheduledMessagesGet404.pipe(HttpApiSchema.status(404)),
        ScheduledMessagesGet422.pipe(HttpApiSchema.status(422)),
        ScheduledMessagesGet500,
        ScheduledMessagesGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "scheduledMessages.get")
      .annotate(OpenApi.Summary, "Get a scheduled message")
      .annotate(OpenApi.Description, "Returns a single scheduled message by its ID."),
    HttpApiEndpoint.post("scheduledMessagesCancel", "/v1/messages/scheduled/:id/cancel", {
      params: ScheduledMessagesCancelPathParams,
      success: ScheduledMessagesCancel200,
      error: [
        ScheduledMessagesCancel401.pipe(HttpApiSchema.status(401)),
        ScheduledMessagesCancel403.pipe(HttpApiSchema.status(403)),
        ScheduledMessagesCancel404.pipe(HttpApiSchema.status(404)),
        ScheduledMessagesCancel409.pipe(HttpApiSchema.status(409)),
        ScheduledMessagesCancel422.pipe(HttpApiSchema.status(422)),
        ScheduledMessagesCancel500,
        ScheduledMessagesCancel504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "scheduledMessages.cancel")
      .annotate(OpenApi.Summary, "Cancel a scheduled message")
      .annotate(
        OpenApi.Description,
        "Cancels a pending scheduled message so it will not be sent, and returns the updated scheduled message.",
      ),
    HttpApiEndpoint.post("scheduledMessagesResume", "/v1/messages/scheduled/:id/resume", {
      params: ScheduledMessagesResumePathParams,
      payload: ScheduledMessagesResumeRequestJson,
      success: ScheduledMessagesResume200,
      error: [
        ScheduledMessagesResume401.pipe(HttpApiSchema.status(401)),
        ScheduledMessagesResume403.pipe(HttpApiSchema.status(403)),
        ScheduledMessagesResume404.pipe(HttpApiSchema.status(404)),
        ScheduledMessagesResume409.pipe(HttpApiSchema.status(409)),
        ScheduledMessagesResume422.pipe(HttpApiSchema.status(422)),
        ScheduledMessagesResume500,
        ScheduledMessagesResume502.pipe(HttpApiSchema.status(502)),
        ScheduledMessagesResume503.pipe(HttpApiSchema.status(503)),
        ScheduledMessagesResume504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "scheduledMessages.resume")
      .annotate(OpenApi.Summary, "Resume a review-paused scheduled message")
      .annotate(
        OpenApi.Description,
        "Explicitly resumes a scheduled message after onboarding review clearance. An overdue message requires either send_now or a new future scheduledFor value.",
      ),
  )
  .annotate(OpenApi.Description, "One-off scheduled message timers") {}
