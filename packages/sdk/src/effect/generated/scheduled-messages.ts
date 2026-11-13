// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  ConflictError,
  ContactId,
  ConversationId,
  EmailAttachments,
  EmailBccRecipients,
  EmailCcRecipients,
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
  MalformedRequestError,
  MessageId,
  MessageMetadata,
  NamespaceId,
  RenderLocale,
  RenderTimeZone,
  ReplyToAddresses,
  ResourceNotFoundError,
  SenderNotReadyError,
  SmsContent,
  SmsDispatchContent,
  SmsRecipients,
  StoredEmailAttachments,
  StoredReplyToAddresses,
  TemplateData,
  TemplateId,
  TemplateInputContractId,
  TemplatePublicationId,
  TopicId,
  UnauthorizedError,
  ValidationError,
  WhatsAppContent,
  WhatsAppRecipients,
  __SamvaRuntimeAbsoluteInstant,
} from "./shared";

export type ScheduledMessageId = string & EffectBrand.Brand<"ScheduledMessageId">;
export const ScheduledMessageId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new globalThis.RegExp("^sched_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^sched_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "ScheduledMessageId",
    }),
  ).pipe(Schema.brand("ScheduledMessageId")))();
export type SavedEmailRecipient =
  | { readonly contactId: ContactId }
  | { readonly email: string; readonly name?: string | null; readonly displayName?: string | null };
export const SavedEmailRecipient = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Struct({ contactId: ContactId }),
    Schema.Struct({
      email: Schema.String,
      name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    }),
  ]).annotate({ identifier: "SavedEmailRecipient" }))();
export type SavedPhoneRecipient =
  | { readonly contactId: ContactId }
  | { readonly phone: string; readonly name?: string | null; readonly displayName?: string | null };
export const SavedPhoneRecipient = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Struct({ contactId: ContactId }),
    Schema.Struct({
      phone: Schema.String,
      name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    }),
  ]).annotate({ identifier: "SavedPhoneRecipient" }))();
export type StoredEmailContent = {
  readonly subject?: string | null;
  readonly html?: string | null;
  readonly text?: string | null;
  readonly attachments?: StoredEmailAttachments;
  readonly publicationId?: TemplatePublicationId;
  readonly inputContractId?: TemplateInputContractId;
  readonly templateId?: TemplateId | null;
  readonly templateSlug?: string | null;
  readonly templateData?: TemplateData;
  readonly locale?: RenderLocale;
  readonly timeZone?: RenderTimeZone;
  readonly inReplyToMessageId?: MessageId | null;
  readonly replyTo?: StoredReplyToAddresses;
  readonly topicId?: TopicId | null;
  readonly tracking?: EmailTrackingOverrideV1;
  readonly footer?: EmailFooterOverride;
  readonly headers?: EmailCustomHeaders | null;
};
export const StoredEmailContent = /* @__PURE__ */ (() =>
  Schema.Struct({
    subject: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    html: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    text: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    attachments: Schema.optionalKey(StoredEmailAttachments),
    publicationId: Schema.optionalKey(TemplatePublicationId),
    inputContractId: Schema.optionalKey(TemplateInputContractId),
    templateId: Schema.optionalKey(Schema.Union([TemplateId, Schema.Null])),
    templateSlug: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isPattern(new globalThis.RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-z0-9]+(?:-[a-z0-9]+)*$",
          }),
        ),
        Schema.Null,
      ]),
    ),
    templateData: Schema.optionalKey(TemplateData),
    locale: Schema.optionalKey(RenderLocale),
    timeZone: Schema.optionalKey(RenderTimeZone),
    inReplyToMessageId: Schema.optionalKey(Schema.Union([MessageId, Schema.Null])),
    replyTo: Schema.optionalKey(StoredReplyToAddresses),
    topicId: Schema.optionalKey(
      Schema.Union([TopicId, Schema.Null]).annotate({
        description:
          "The topic for this send. Omit to inherit the template topic; null disables topic inheritance for a direct send. Campaigns require a topic.",
      }),
    ),
    tracking: Schema.optionalKey(EmailTrackingOverrideV1),
    footer: Schema.optionalKey(EmailFooterOverride),
    headers: Schema.optionalKey(Schema.Union([EmailCustomHeaders, Schema.Null])),
  }).annotate({ identifier: "StoredEmailContent" }))();
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
          Schema.isPattern(new globalThis.RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-z0-9]+(?:-[a-z0-9]+)*$",
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
export type StoredSmsSendMessage = {
  readonly conversationId?: ConversationId | null;
  readonly metadata?: MessageMetadata;
  readonly channel: "sms";
  readonly to: ReadonlyArray<SavedPhoneRecipient>;
  readonly sms: SmsContent;
};
export const StoredSmsSendMessage = /* @__PURE__ */ (() =>
  Schema.Struct({
    conversationId: Schema.optionalKey(Schema.Union([ConversationId, Schema.Null])),
    metadata: Schema.optionalKey(MessageMetadata),
    channel: Schema.Literal("sms"),
    to: Schema.Array(SavedPhoneRecipient)
      .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
      .check(Schema.isMaxLength(1).annotate({ expected: "a value with a length of at most 1" })),
    sms: SmsContent,
  }).annotate({ identifier: "StoredSmsSendMessage" }))();
export type SmsDispatchSendMessagePayload = {
  readonly conversationId?: ConversationId | null;
  readonly metadata?: MessageMetadata;
  readonly channel: "sms";
  readonly to: SmsRecipients;
  readonly sms: SmsDispatchContent;
};
export const SmsDispatchSendMessagePayload = /* @__PURE__ */ (() =>
  Schema.Struct({
    conversationId: Schema.optionalKey(Schema.Union([ConversationId, Schema.Null])),
    metadata: Schema.optionalKey(MessageMetadata),
    channel: Schema.Literal("sms"),
    to: SmsRecipients,
    sms: SmsDispatchContent,
  }).annotate({
    description:
      "The payload is accepted by the contract today and the endpoint answers 403 until the channel launches for your organization.",
    identifier: "SmsDispatchSendMessagePayload",
  }))();
export type StoredEmailSendMessage = {
  readonly conversationId?: ConversationId | null;
  readonly metadata?: MessageMetadata;
  readonly channel: "email";
  readonly to: ReadonlyArray<SavedEmailRecipient>;
  readonly cc?: ReadonlyArray<SavedEmailRecipient> | null;
  readonly bcc?: ReadonlyArray<SavedEmailRecipient> | null;
  readonly from?: { readonly email: string; readonly name?: string | null } | null;
  readonly email: StoredEmailContent;
};
export const StoredEmailSendMessage = /* @__PURE__ */ (() =>
  Schema.Struct({
    conversationId: Schema.optionalKey(Schema.Union([ConversationId, Schema.Null])),
    metadata: Schema.optionalKey(MessageMetadata),
    channel: Schema.Literal("email"),
    to: Schema.Array(SavedEmailRecipient).check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
    cc: Schema.optionalKey(Schema.Union([Schema.Array(SavedEmailRecipient), Schema.Null])),
    bcc: Schema.optionalKey(Schema.Union([Schema.Array(SavedEmailRecipient), Schema.Null])),
    from: Schema.optionalKey(
      Schema.Union([
        Schema.Struct({
          email: Schema.String.check(
            Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
          ),
          name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    email: StoredEmailContent,
  }).annotate({ identifier: "StoredEmailSendMessage" }))();
export type EmailDispatchSendMessagePayload = {
  readonly conversationId?: ConversationId | null;
  readonly metadata?: MessageMetadata;
  readonly channel: "email";
  readonly to: EmailRecipients;
  readonly cc?: EmailCcRecipients;
  readonly bcc?: EmailBccRecipients;
  readonly from?: EmailSender;
  readonly email: EmailDispatchContent;
};
export const EmailDispatchSendMessagePayload = /* @__PURE__ */ (() =>
  Schema.Struct({
    conversationId: Schema.optionalKey(Schema.Union([ConversationId, Schema.Null])),
    metadata: Schema.optionalKey(MessageMetadata),
    channel: Schema.Literal("email"),
    to: EmailRecipients,
    cc: Schema.optionalKey(EmailCcRecipients),
    bcc: Schema.optionalKey(EmailBccRecipients),
    from: Schema.optionalKey(EmailSender),
    email: EmailDispatchContent,
  }).annotate({ identifier: "EmailDispatchSendMessagePayload" }))();
export type StoredWhatsAppSendMessage = {
  readonly conversationId?: ConversationId | null;
  readonly metadata?: MessageMetadata;
  readonly channel: "whatsapp";
  readonly to: ReadonlyArray<SavedPhoneRecipient>;
  readonly whatsapp: WhatsAppContent;
};
export const StoredWhatsAppSendMessage = /* @__PURE__ */ (() =>
  Schema.Struct({
    conversationId: Schema.optionalKey(Schema.Union([ConversationId, Schema.Null])),
    metadata: Schema.optionalKey(MessageMetadata),
    channel: Schema.Literal("whatsapp"),
    to: Schema.Array(SavedPhoneRecipient)
      .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
      .check(Schema.isMaxLength(1).annotate({ expected: "a value with a length of at most 1" })),
    whatsapp: WhatsAppContent,
  }).annotate({ identifier: "StoredWhatsAppSendMessage" }))();
export type WhatsAppDispatchSendMessagePayload = {
  readonly conversationId?: ConversationId | null;
  readonly metadata?: MessageMetadata;
  readonly channel: "whatsapp";
  readonly to: WhatsAppRecipients;
  readonly whatsapp: WhatsAppContent;
};
export const WhatsAppDispatchSendMessagePayload = /* @__PURE__ */ (() =>
  Schema.Struct({
    conversationId: Schema.optionalKey(Schema.Union([ConversationId, Schema.Null])),
    metadata: Schema.optionalKey(MessageMetadata),
    channel: Schema.Literal("whatsapp"),
    to: WhatsAppRecipients,
    whatsapp: WhatsAppContent,
  }).annotate({
    description: "Send WhatsApp messages from your connected business account.",
    identifier: "WhatsAppDispatchSendMessagePayload",
  }))();
export type StoredSendMessagePayload =
  | StoredEmailSendMessage
  | StoredSmsSendMessage
  | StoredWhatsAppSendMessage;
export const StoredSendMessagePayload = /* @__PURE__ */ (() =>
  Schema.Union([StoredEmailSendMessage, StoredSmsSendMessage, StoredWhatsAppSendMessage]).annotate({
    identifier: "StoredSendMessagePayload",
  }))();
export type DispatchSendMessagePayload =
  | EmailDispatchSendMessagePayload
  | SmsDispatchSendMessagePayload
  | WhatsAppDispatchSendMessagePayload;
export const DispatchSendMessagePayload = /* @__PURE__ */ (() =>
  Schema.Union([
    EmailDispatchSendMessagePayload,
    SmsDispatchSendMessagePayload,
    WhatsAppDispatchSendMessagePayload,
  ]).annotate({ identifier: "DispatchSendMessagePayload" }))();
export type ScheduledMessage = {
  readonly id: ScheduledMessageId;
  readonly namespaceId: NamespaceId | null;
  readonly status: "pending" | "dispatching" | "paused" | "dispatched" | "cancelled" | "failed";
  readonly scheduledFor: string;
  readonly timezone: string;
  readonly send: StoredSendMessagePayload;
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
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
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
    send: StoredSendMessagePayload,
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
  readonly cursor?: string;
  readonly namespaceId?: NamespaceId;
  readonly status?: "pending" | "dispatching" | "paused" | "dispatched" | "cancelled" | "failed";
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
    cursor: Schema.optionalKey(Schema.String),
    namespaceId: Schema.optionalKey(NamespaceId),
    status: Schema.optionalKey(
      Schema.Union([
        Schema.Literal("pending"),
        Schema.Literal("dispatching"),
        Schema.Literal("paused"),
        Schema.Literal("dispatched"),
        Schema.Literal("cancelled"),
        Schema.Literal("failed"),
      ]),
    ),
  }))();
export type ScheduledMessagesList200 = ScheduledMessagePage;
export const ScheduledMessagesList200 = ScheduledMessagePage;
export type ScheduledMessagesList400 = MalformedRequestError;
export const ScheduledMessagesList400 = MalformedRequestError;
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
export type ScheduledMessagesCreateHeaders = { readonly "idempotency-key"?: string };
export const ScheduledMessagesCreateHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.optionalKey(
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
    ),
  }))();
export type ScheduledMessagesCreateRequestJson = {
  readonly namespaceId?: NamespaceId | null;
  readonly send: DispatchSendMessagePayload;
  readonly scheduledFor: __SamvaRuntimeAbsoluteInstant;
  readonly timezone?: IanaTimezone | null;
  readonly referenceId?: string | null;
};
export const ScheduledMessagesCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
    send: DispatchSendMessagePayload,
    scheduledFor: __SamvaRuntimeAbsoluteInstant,
    timezone: Schema.optionalKey(Schema.Union([IanaTimezone, Schema.Null])),
    referenceId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type ScheduledMessagesCreate201 = ScheduledMessage;
export const ScheduledMessagesCreate201 = ScheduledMessage;
export type ScheduledMessagesCreate400 = MalformedRequestError;
export const ScheduledMessagesCreate400 = MalformedRequestError;
export type ScheduledMessagesCreate401 = UnauthorizedError;
export const ScheduledMessagesCreate401 = UnauthorizedError;
export type ScheduledMessagesCreate403 = ForbiddenError | FlagDisabledError;
export const ScheduledMessagesCreate403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type ScheduledMessagesCreate404 = ResourceNotFoundError;
export const ScheduledMessagesCreate404 = ResourceNotFoundError;
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
export type ScheduledMessagesGet400 = MalformedRequestError;
export const ScheduledMessagesGet400 = MalformedRequestError;
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
export type ScheduledMessagesCancel400 = MalformedRequestError;
export const ScheduledMessagesCancel400 = MalformedRequestError;
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
export type ScheduledMessagesResume400 = MalformedRequestError;
export const ScheduledMessagesResume400 = MalformedRequestError;
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
        ScheduledMessagesList400.pipe(HttpApiSchema.status(400)),
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
        ScheduledMessagesCreate400.pipe(HttpApiSchema.status(400)),
        ScheduledMessagesCreate401.pipe(HttpApiSchema.status(401)),
        ScheduledMessagesCreate403.pipe(HttpApiSchema.status(403)),
        ScheduledMessagesCreate404.pipe(HttpApiSchema.status(404)),
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
        "Schedules a message for dispatch at the absolute ISO-8601 timestamp supplied in scheduledFor. Requires `messages:create` or the send permission of the channel it sends on, such as `email:send`. The send payload is the same channel union the immediate send accepts, with each channel's content checked at schedule time so a send that could never render fails now rather than hours later: email and WhatsApp schedules are available. Email schedules placed explicitly in a namespace require its sending setup to be ready: ValidationError means share the sender domain with namespaces or use a sender owned by that namespace. Setup that has stopped after failure also returns ValidationError and requires restarting or reconciling the domain's sending setup. ConflictError means setup is still in progress. Optional timezone is validated IANA display metadata only and never changes the execution instant.",
      ),
    HttpApiEndpoint.get("scheduledMessagesGet", "/v1/messages/scheduled/:id", {
      params: ScheduledMessagesGetPathParams,
      success: ScheduledMessagesGet200,
      error: [
        ScheduledMessagesGet400.pipe(HttpApiSchema.status(400)),
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
        ScheduledMessagesCancel400.pipe(HttpApiSchema.status(400)),
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
        ScheduledMessagesResume400.pipe(HttpApiSchema.status(400)),
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
