// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeyId,
  ApiKeySecurityMiddleware,
  AttachmentId,
  BillingProviderError,
  CampaignId,
  CampaignRunId,
  ConflictError,
  ContactId,
  ConversationId,
  Cursor,
  DeliveryUnavailableError,
  EmailBccRecipients,
  EmailCcRecipients,
  EmailContent,
  EmailRecipients,
  EmailSender,
  EmailTrackingOverrideV1,
  ExternalServiceError,
  FlagDisabledError,
  ForbiddenError,
  FromAddressRequiredError,
  GatewayTimeoutError,
  InternalError,
  JsonValue,
  MediaId,
  MessageId,
  MessageMetadata,
  MessagePage,
  NamespaceId,
  OnboardingReviewRequiredError,
  PaymentRequiredError,
  RateLimitedError,
  ResourceNotFoundError,
  SenderNotReadyError,
  SkippedRecipient,
  UnauthorizedError,
  UserId,
  ValidationError,
} from "./shared";

export type MessageSender = { readonly address: string; readonly name: string | null };
export const MessageSender = /* @__PURE__ */ Schema.Struct({
  address: Schema.String,
  name: Schema.Union([Schema.String, Schema.Null]),
}).annotate({ identifier: "MessageSender" });
export type SubmissionClient = {
  readonly surface: "typescript-promise" | "typescript-effect" | "cli" | "mcp";
  readonly version: string;
};
export const SubmissionClient = /* @__PURE__ */ Schema.Struct({
  surface: Schema.Union([
    Schema.Literal("typescript-promise"),
    Schema.Literal("typescript-effect"),
    Schema.Literal("cli"),
    Schema.Literal("mcp"),
  ]),
  version: Schema.String,
}).annotate({ identifier: "SubmissionClient" });
export type MessageDeliveryId = string & EffectBrand.Brand<"MessageDeliveryId">;
export const MessageDeliveryId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^mdel_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^mdel_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "MessageDeliveryId",
  }),
).pipe(Schema.brand("MessageDeliveryId"));
export type MessageDeliveryError = {
  readonly code: string | null;
  readonly message: string | null;
  readonly retryable: boolean | null;
};
export const MessageDeliveryError = /* @__PURE__ */ Schema.Struct({
  code: Schema.Union([Schema.String, Schema.Null]),
  message: Schema.Union([Schema.String, Schema.Null]),
  retryable: Schema.Union([Schema.Boolean, Schema.Null]),
}).annotate({ identifier: "MessageDeliveryError" });
export type EstimatedProviderCost = {
  readonly amount: string;
  readonly currency: string;
  readonly billingMode: "pass_through";
};
export const EstimatedProviderCost = /* @__PURE__ */ Schema.Struct({
  amount: Schema.String.check(
    Schema.isPattern(new RegExp("^\\d+\\.\\d+$", "u")).annotate({
      expected: "a string matching the RegExp ^\\d+\\.\\d+$",
    }),
  ),
  currency: Schema.String,
  billingMode: Schema.Literal("pass_through"),
}).annotate({ identifier: "EstimatedProviderCost" });
export type DeliveryErrorDetails = {
  readonly code?: string | null;
  readonly name?: string | null;
  readonly message?: string | null;
  readonly details?: { readonly [x: string]: string | number | null } | null;
  readonly retryable?: boolean | null;
};
export const DeliveryErrorDetails = /* @__PURE__ */ Schema.Struct({
  code: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  details: Schema.optionalKey(
    Schema.Union([
      Schema.Record(
        Schema.String,
        Schema.Union([
          Schema.String,
          Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
          Schema.Null,
        ]),
      ),
      Schema.Null,
    ]),
  ),
  retryable: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
}).annotate({ identifier: "DeliveryErrorDetails" });
export type EmailAddress = { readonly email: string; readonly name: string | null };
export const EmailAddress = /* @__PURE__ */ Schema.Struct({
  email: Schema.String,
  name: Schema.Union([Schema.String, Schema.Null]),
}).annotate({ identifier: "EmailAddress" });
export type MessageEventId = string & EffectBrand.Brand<"MessageEventId">;
export const MessageEventId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^mevt_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^mevt_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "MessageEventId",
  }),
).pipe(Schema.brand("MessageEventId"));
export type ValidateEmailResponse = {
  readonly valid: true;
  readonly from: { readonly email: string; readonly name: string | null };
  readonly recipientCount: number;
  readonly content: {
    readonly source: "inline" | "template";
    readonly subject: string;
    readonly hasHtml: boolean;
    readonly hasText: boolean;
  };
};
export const ValidateEmailResponse = /* @__PURE__ */ Schema.Struct({
  valid: Schema.Literal(true),
  from: Schema.Struct({ email: Schema.String, name: Schema.Union([Schema.String, Schema.Null]) }),
  recipientCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  content: Schema.Struct({
    source: Schema.Union([Schema.Literal("inline"), Schema.Literal("template")]),
    subject: Schema.String,
    hasHtml: Schema.Boolean,
    hasText: Schema.Boolean,
  }),
}).annotate({ identifier: "ValidateEmailResponse" });
export type SubmissionCredential =
  | { readonly kind: "api_key"; readonly apiKeyId: ApiKeyId | null }
  | { readonly kind: "oauth"; readonly clientId: string | null }
  | { readonly kind: "session" };
export const SubmissionCredential = /* @__PURE__ */ Schema.Union([
  Schema.Struct({
    kind: Schema.Literal("api_key"),
    apiKeyId: Schema.Union([ApiKeyId, Schema.Null]),
  }),
  Schema.Struct({
    kind: Schema.Literal("oauth"),
    clientId: Schema.Union([Schema.String, Schema.Null]),
  }),
  Schema.Struct({ kind: Schema.Literal("session") }),
]).annotate({ identifier: "SubmissionCredential" });
export type MessageContent = {
  readonly text?: string | null;
  readonly html?: string | null;
  readonly markdown?: string | null;
  readonly email?: {
    readonly subject?: string | null;
    readonly html?: string | null;
    readonly text?: string | null;
    readonly headers?: { readonly [x: string]: string } | null;
    readonly tracking?: EmailTrackingOverrideV1;
    readonly attachments?: ReadonlyArray<{
      readonly filename: string;
      readonly contentId?: string | null;
      readonly isInline?: boolean | null;
      readonly content?: string | null;
      readonly mediaId?: MediaId | null;
      readonly contentType: string;
      readonly size: number;
    }> | null;
  } | null;
  readonly metadata?: { readonly [x: string]: JsonValue } | null;
};
export const MessageContent = /* @__PURE__ */ Schema.Struct({
  text: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  html: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  markdown: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  email: Schema.optionalKey(
    Schema.Union([
      Schema.Struct({
        subject: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        html: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        text: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        headers: Schema.optionalKey(
          Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
        ),
        tracking: Schema.optionalKey(EmailTrackingOverrideV1),
        attachments: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Struct({
                filename: Schema.String,
                contentId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
                isInline: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
                content: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
                mediaId: Schema.optionalKey(Schema.Union([MediaId, Schema.Null])),
                contentType: Schema.String,
                size: Schema.Finite.check(
                  Schema.isFinite().annotate({ expected: "a finite number" }),
                ),
              }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      Schema.Null,
    ]),
  ),
  metadata: Schema.optionalKey(
    Schema.Union([Schema.Record(Schema.String, JsonValue), Schema.Null]),
  ),
}).annotate({ identifier: "MessageContent" });
export type MessageAddress = { readonly address: string; readonly contactId: ContactId | null };
export const MessageAddress = /* @__PURE__ */ Schema.Struct({
  address: Schema.String,
  contactId: Schema.Union([ContactId, Schema.Null]),
}).annotate({ identifier: "MessageAddress" });
export type MessageDelivery = {
  readonly id: MessageDeliveryId;
  readonly recipient: string | null;
  readonly status:
    | "pending"
    | "scheduled"
    | "queued"
    | "processing"
    | "sent"
    | "delivered"
    | "read"
    | "failed"
    | "bounced"
    | "complained";
  readonly attemptCount: number;
  readonly waitReason:
    | "rate"
    | "daily-quota"
    | "domain-health"
    | "sending-paused"
    | "upstream-unavailable"
    | "retry"
    | "campaign-paused"
    | "domain-warming"
    | "onboarding-review"
    | "content-review"
    | "screening-unavailable"
    | null;
  readonly nextRetryAt: string | null;
  readonly sentAt: string | null;
  readonly deliveredAt: string | null;
  readonly readAt: string | null;
  readonly failedAt: string | null;
  readonly error: MessageDeliveryError | null;
  readonly estimatedProviderCost: EstimatedProviderCost | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const MessageDelivery = /* @__PURE__ */ Schema.Struct({
  id: MessageDeliveryId,
  recipient: Schema.Union([Schema.String, Schema.Null]),
  status: Schema.Union([
    Schema.Literal("pending"),
    Schema.Literal("scheduled"),
    Schema.Literal("queued"),
    Schema.Literal("processing"),
    Schema.Literal("sent"),
    Schema.Literal("delivered"),
    Schema.Literal("read"),
    Schema.Literal("failed"),
    Schema.Literal("bounced"),
    Schema.Literal("complained"),
  ]),
  attemptCount: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
  waitReason: Schema.Union([
    Schema.Union([
      Schema.Literal("rate"),
      Schema.Literal("daily-quota"),
      Schema.Literal("domain-health"),
      Schema.Literal("sending-paused"),
      Schema.Literal("upstream-unavailable"),
      Schema.Literal("retry"),
      Schema.Literal("campaign-paused"),
      Schema.Literal("domain-warming"),
      Schema.Literal("onboarding-review"),
      Schema.Literal("content-review"),
      Schema.Literal("screening-unavailable"),
    ]),
    Schema.Null,
  ]),
  nextRetryAt: Schema.Union([Schema.String, Schema.Null]),
  sentAt: Schema.Union([Schema.String, Schema.Null]),
  deliveredAt: Schema.Union([Schema.String, Schema.Null]),
  readAt: Schema.Union([Schema.String, Schema.Null]),
  failedAt: Schema.Union([Schema.String, Schema.Null]),
  error: Schema.Union([MessageDeliveryError, Schema.Null]),
  estimatedProviderCost: Schema.Union([EstimatedProviderCost, Schema.Null]),
  createdAt: Schema.String,
  updatedAt: Schema.String,
}).annotate({ identifier: "MessageDelivery" });
export type MessageEventPage = {
  readonly items: ReadonlyArray<{
    readonly id: MessageEventId;
    readonly messageId: MessageId;
    readonly eventType: string;
    readonly status: string;
    readonly timestamp: string;
    readonly metadata?: { readonly [x: string]: JsonValue } | null;
  }>;
  readonly nextCursor: string | null;
};
export const MessageEventPage = /* @__PURE__ */ Schema.Struct({
  items: Schema.Array(
    Schema.Struct({
      id: MessageEventId,
      messageId: MessageId,
      eventType: Schema.String,
      status: Schema.String,
      timestamp: Schema.String,
      metadata: Schema.optionalKey(
        Schema.Union([Schema.Record(Schema.String, JsonValue), Schema.Null]),
      ),
    }),
  ),
  nextCursor: Schema.Union([Schema.String, Schema.Null]),
}).annotate({ identifier: "MessageEventPage" });
export type MessageSubmission = {
  readonly origin:
    | "direct"
    | "campaign"
    | "scheduled"
    | "mailbox"
    | "forwarding"
    | "journey"
    | "businessApp";
  readonly transport: "http" | null;
  readonly credential: SubmissionCredential | null;
  readonly userId: UserId | null;
  readonly client: SubmissionClient | null;
};
export const MessageSubmission = /* @__PURE__ */ Schema.Struct({
  origin: Schema.Union([
    Schema.Literal("direct"),
    Schema.Literal("campaign"),
    Schema.Literal("scheduled"),
    Schema.Literal("mailbox"),
    Schema.Literal("forwarding"),
    Schema.Literal("journey"),
    Schema.Literal("businessApp"),
  ]),
  transport: Schema.Union([Schema.Literal("http"), Schema.Null]),
  credential: Schema.Union([SubmissionCredential, Schema.Null]),
  userId: Schema.Union([UserId, Schema.Null]),
  client: Schema.Union([SubmissionClient, Schema.Null]),
}).annotate({ identifier: "MessageSubmission" });
export type MessageReceipt = {
  readonly id: MessageId;
  readonly status:
    | "pending"
    | "scheduled"
    | "queued"
    | "processing"
    | "sent"
    | "delivered"
    | "read"
    | "failed"
    | "bounced"
    | "complained";
  readonly waitReason:
    | "rate"
    | "daily-quota"
    | "domain-health"
    | "sending-paused"
    | "upstream-unavailable"
    | "retry"
    | "campaign-paused"
    | "domain-warming"
    | "onboarding-review"
    | "content-review"
    | "screening-unavailable"
    | null;
  readonly reviewExpectedAt: string | null;
  readonly skippedRecipients: ReadonlyArray<SkippedRecipient>;
  readonly createdAt: string;
};
export const MessageReceipt = /* @__PURE__ */ Schema.Struct({
  id: MessageId,
  status: Schema.Union([
    Schema.Literal("pending"),
    Schema.Literal("scheduled"),
    Schema.Literal("queued"),
    Schema.Literal("processing"),
    Schema.Literal("sent"),
    Schema.Literal("delivered"),
    Schema.Literal("read"),
    Schema.Literal("failed"),
    Schema.Literal("bounced"),
    Schema.Literal("complained"),
  ]),
  waitReason: Schema.Union([
    Schema.Union([
      Schema.Literal("rate"),
      Schema.Literal("daily-quota"),
      Schema.Literal("domain-health"),
      Schema.Literal("sending-paused"),
      Schema.Literal("upstream-unavailable"),
      Schema.Literal("retry"),
      Schema.Literal("campaign-paused"),
      Schema.Literal("domain-warming"),
      Schema.Literal("onboarding-review"),
      Schema.Literal("content-review"),
      Schema.Literal("screening-unavailable"),
    ]),
    Schema.Null,
  ]),
  reviewExpectedAt: Schema.Union([Schema.String, Schema.Null]),
  skippedRecipients: Schema.Array(SkippedRecipient),
  createdAt: Schema.String,
}).annotate({ identifier: "MessageReceipt" });
export type MessageDeliveryList = { readonly items: ReadonlyArray<MessageDelivery> };
export const MessageDeliveryList = /* @__PURE__ */ Schema.Struct({
  items: Schema.Array(MessageDelivery),
}).annotate({ identifier: "MessageDeliveryList" });
export type Message = {
  readonly id: MessageId;
  readonly campaign?: { readonly campaignId: CampaignId; readonly runId: CampaignRunId } | null;
  readonly channel: "email";
  readonly direction: "outbound" | "inbound";
  readonly status:
    | "pending"
    | "scheduled"
    | "queued"
    | "processing"
    | "sent"
    | "delivered"
    | "read"
    | "failed"
    | "bounced"
    | "complained";
  readonly from: MessageSender | null;
  readonly to: ReadonlyArray<MessageAddress>;
  readonly cc: ReadonlyArray<MessageAddress>;
  readonly bcc: ReadonlyArray<MessageAddress>;
  readonly replyTo: ReadonlyArray<string>;
  readonly subject: string | null;
  readonly conversationId: ConversationId | null;
  readonly inReplyToMessageId: MessageId | null;
  readonly tags: ReadonlyArray<string>;
  readonly metadata: { readonly [x: string]: JsonValue } | null;
  readonly isTest: boolean;
  readonly scheduledAt: string | null;
  readonly submission: MessageSubmission | null;
  readonly waitReason:
    | "rate"
    | "daily-quota"
    | "domain-health"
    | "sending-paused"
    | "upstream-unavailable"
    | "retry"
    | "campaign-paused"
    | "domain-warming"
    | "onboarding-review"
    | "content-review"
    | "screening-unavailable"
    | null;
  readonly reviewExpectedAt: string | null;
  readonly skippedRecipients: ReadonlyArray<SkippedRecipient>;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const Message = /* @__PURE__ */ Schema.Struct({
  id: MessageId,
  campaign: Schema.optionalKey(
    Schema.Union([Schema.Struct({ campaignId: CampaignId, runId: CampaignRunId }), Schema.Null]),
  ),
  channel: Schema.Literal("email"),
  direction: Schema.Union([Schema.Literal("outbound"), Schema.Literal("inbound")]),
  status: Schema.Union([
    Schema.Literal("pending"),
    Schema.Literal("scheduled"),
    Schema.Literal("queued"),
    Schema.Literal("processing"),
    Schema.Literal("sent"),
    Schema.Literal("delivered"),
    Schema.Literal("read"),
    Schema.Literal("failed"),
    Schema.Literal("bounced"),
    Schema.Literal("complained"),
  ]),
  from: Schema.Union([MessageSender, Schema.Null]),
  to: Schema.Array(MessageAddress),
  cc: Schema.Array(MessageAddress),
  bcc: Schema.Array(MessageAddress),
  replyTo: Schema.Array(Schema.String),
  subject: Schema.Union([Schema.String, Schema.Null]),
  conversationId: Schema.Union([ConversationId, Schema.Null]),
  inReplyToMessageId: Schema.Union([MessageId, Schema.Null]),
  tags: Schema.Array(Schema.String),
  metadata: Schema.Union([Schema.Record(Schema.String, JsonValue), Schema.Null]),
  isTest: Schema.Boolean,
  scheduledAt: Schema.Union([Schema.String, Schema.Null]),
  submission: Schema.Union([MessageSubmission, Schema.Null]),
  waitReason: Schema.Union([
    Schema.Union([
      Schema.Literal("rate"),
      Schema.Literal("daily-quota"),
      Schema.Literal("domain-health"),
      Schema.Literal("sending-paused"),
      Schema.Literal("upstream-unavailable"),
      Schema.Literal("retry"),
      Schema.Literal("campaign-paused"),
      Schema.Literal("domain-warming"),
      Schema.Literal("onboarding-review"),
      Schema.Literal("content-review"),
      Schema.Literal("screening-unavailable"),
    ]),
    Schema.Null,
  ]),
  reviewExpectedAt: Schema.Union([Schema.String, Schema.Null]),
  skippedRecipients: Schema.Array(SkippedRecipient),
  createdAt: Schema.String,
  updatedAt: Schema.String,
}).annotate({ identifier: "Message" });
export type MessagesListQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
  readonly channel?: "email" | null;
  readonly direction?: "outbound" | "inbound" | null;
  readonly status?:
    | "pending"
    | "scheduled"
    | "queued"
    | "processing"
    | "sent"
    | "delivered"
    | "read"
    | "failed"
    | "bounced"
    | "complained"
    | null;
  readonly conversationId?: ConversationId | null;
  readonly contactId?: ContactId | null;
  readonly from?: string | null;
  readonly namespaceId?: NamespaceId | null;
  readonly after?: string | null;
  readonly before?: string | null;
};
export const MessagesListQuery = /* @__PURE__ */ Schema.Struct({
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
  channel: Schema.optionalKey(Schema.Union([Schema.Literal("email"), Schema.Null])),
  direction: Schema.optionalKey(
    Schema.Union([
      Schema.Union([Schema.Literal("outbound"), Schema.Literal("inbound")]),
      Schema.Null,
    ]),
  ),
  status: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.Literal("pending"),
        Schema.Literal("scheduled"),
        Schema.Literal("queued"),
        Schema.Literal("processing"),
        Schema.Literal("sent"),
        Schema.Literal("delivered"),
        Schema.Literal("read"),
        Schema.Literal("failed"),
        Schema.Literal("bounced"),
        Schema.Literal("complained"),
      ]),
      Schema.Null,
    ]),
  ),
  conversationId: Schema.optionalKey(Schema.Union([ConversationId, Schema.Null])),
  contactId: Schema.optionalKey(Schema.Union([ContactId, Schema.Null])),
  from: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  namespaceId: Schema.optionalKey(
    Schema.Union([NamespaceId, Schema.Null]).annotate({
      description:
        "Only this namespace's messages. A key scoped to a namespace always lists its own.",
    }),
  ),
  after: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  before: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
});
export type MessagesList200 = MessagePage;
export const MessagesList200 = MessagePage;
export type MessagesList401 = UnauthorizedError;
export const MessagesList401 = UnauthorizedError;
export type MessagesList403 = ForbiddenError;
export const MessagesList403 = ForbiddenError;
export type MessagesList422 = ValidationError;
export const MessagesList422 = ValidationError;
export type MessagesList500 = InternalError;
export const MessagesList500 = InternalError;
export type MessagesList504 = GatewayTimeoutError;
export const MessagesList504 = GatewayTimeoutError;
export type MessagesSendHeaders = { readonly "idempotency-key"?: string | null };
export const MessagesSendHeaders = /* @__PURE__ */ Schema.Struct({
  "idempotency-key": Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional org-scoped key that makes a send idempotent. Repeating a request with the same key and identical payload replays the original 201 response; reusing the key with different content returns 409.",
      }).check(
        Schema.isPattern(new RegExp("^[\\s\\S]{1,255}$")).annotate({
          expected: "a string matching the RegExp ^[\\s\\S]{1,255}$",
        }),
      ),
      Schema.Null,
    ]),
  ),
});
export type MessagesSendRequestJson = {
  readonly conversationId?: ConversationId | null | null;
  readonly metadata?: MessageMetadata;
  readonly channel: "email";
  readonly to: EmailRecipients;
  readonly cc?: EmailCcRecipients;
  readonly bcc?: EmailBccRecipients;
  readonly from?: EmailSender;
  readonly email: EmailContent;
};
export const MessagesSendRequestJson = /* @__PURE__ */ Schema.Struct({
  conversationId: Schema.optionalKey(
    Schema.Union([Schema.Union([ConversationId, Schema.Null]), Schema.Null]),
  ),
  metadata: Schema.optionalKey(MessageMetadata),
  channel: Schema.Literal("email"),
  to: EmailRecipients,
  cc: Schema.optionalKey(EmailCcRecipients),
  bcc: Schema.optionalKey(EmailBccRecipients),
  from: Schema.optionalKey(EmailSender),
  email: EmailContent,
});
export type MessagesSend201 = MessageReceipt;
export const MessagesSend201 = MessageReceipt;
export type MessagesSend401 = UnauthorizedError;
export const MessagesSend401 = UnauthorizedError;
export type MessagesSend402 = PaymentRequiredError;
export const MessagesSend402 = PaymentRequiredError;
export type MessagesSend403 = ForbiddenError | OnboardingReviewRequiredError | FlagDisabledError;
export const MessagesSend403 = /* @__PURE__ */ Schema.Union([
  ForbiddenError,
  OnboardingReviewRequiredError,
  FlagDisabledError,
]);
export type MessagesSend404 = ResourceNotFoundError;
export const MessagesSend404 = ResourceNotFoundError;
export type MessagesSend409 = ConflictError;
export const MessagesSend409 = ConflictError;
export type MessagesSend422 = ValidationError | FromAddressRequiredError;
export const MessagesSend422 = /* @__PURE__ */ Schema.Union([
  ValidationError,
  FromAddressRequiredError,
]);
export type MessagesSend429 = RateLimitedError;
export const MessagesSend429 = RateLimitedError;
export type MessagesSend500 = InternalError;
export const MessagesSend500 = InternalError;
export type MessagesSend502 = BillingProviderError | ExternalServiceError;
export const MessagesSend502 = /* @__PURE__ */ Schema.Union([
  BillingProviderError,
  ExternalServiceError,
]);
export type MessagesSend503 = SenderNotReadyError | DeliveryUnavailableError;
export const MessagesSend503 = /* @__PURE__ */ Schema.Union([
  SenderNotReadyError,
  DeliveryUnavailableError,
]);
export type MessagesSend504 = GatewayTimeoutError;
export const MessagesSend504 = GatewayTimeoutError;
export type MessagesGetPathParams = { readonly id: MessageId };
export const MessagesGetPathParams = /* @__PURE__ */ Schema.Struct({ id: MessageId });
export type MessagesGet200 = Message;
export const MessagesGet200 = Message;
export type MessagesGet401 = UnauthorizedError;
export const MessagesGet401 = UnauthorizedError;
export type MessagesGet403 = ForbiddenError;
export const MessagesGet403 = ForbiddenError;
export type MessagesGet404 = ResourceNotFoundError;
export const MessagesGet404 = ResourceNotFoundError;
export type MessagesGet422 = ValidationError;
export const MessagesGet422 = ValidationError;
export type MessagesGet500 = InternalError;
export const MessagesGet500 = InternalError;
export type MessagesGet504 = GatewayTimeoutError;
export const MessagesGet504 = GatewayTimeoutError;
export type MessagesRemovePathParams = { readonly id: MessageId };
export const MessagesRemovePathParams = /* @__PURE__ */ Schema.Struct({ id: MessageId });
export type MessagesRemove200 = { readonly success: boolean; readonly message: string };
export const MessagesRemove200 = /* @__PURE__ */ Schema.Struct({
  success: Schema.Boolean,
  message: Schema.String,
});
export type MessagesRemove401 = UnauthorizedError;
export const MessagesRemove401 = UnauthorizedError;
export type MessagesRemove403 = ForbiddenError;
export const MessagesRemove403 = ForbiddenError;
export type MessagesRemove404 = ResourceNotFoundError;
export const MessagesRemove404 = ResourceNotFoundError;
export type MessagesRemove422 = ValidationError;
export const MessagesRemove422 = ValidationError;
export type MessagesRemove500 = InternalError;
export const MessagesRemove500 = InternalError;
export type MessagesRemove502 = BillingProviderError;
export const MessagesRemove502 = BillingProviderError;
export type MessagesRemove504 = GatewayTimeoutError;
export const MessagesRemove504 = GatewayTimeoutError;
export type MessagesGetContentPathParams = { readonly id: MessageId };
export const MessagesGetContentPathParams = /* @__PURE__ */ Schema.Struct({ id: MessageId });
export type MessagesGetContent200 = MessageContent;
export const MessagesGetContent200 = MessageContent;
export type MessagesGetContent401 = UnauthorizedError;
export const MessagesGetContent401 = UnauthorizedError;
export type MessagesGetContent403 = ForbiddenError;
export const MessagesGetContent403 = ForbiddenError;
export type MessagesGetContent404 = ResourceNotFoundError;
export const MessagesGetContent404 = ResourceNotFoundError;
export type MessagesGetContent422 = ValidationError;
export const MessagesGetContent422 = ValidationError;
export type MessagesGetContent500 = InternalError;
export const MessagesGetContent500 = InternalError;
export type MessagesGetContent504 = GatewayTimeoutError;
export const MessagesGetContent504 = GatewayTimeoutError;
export type MessagesListDeliveriesPathParams = { readonly id: MessageId };
export const MessagesListDeliveriesPathParams = /* @__PURE__ */ Schema.Struct({ id: MessageId });
export type MessagesListDeliveries200 = MessageDeliveryList;
export const MessagesListDeliveries200 = MessageDeliveryList;
export type MessagesListDeliveries401 = UnauthorizedError;
export const MessagesListDeliveries401 = UnauthorizedError;
export type MessagesListDeliveries403 = ForbiddenError;
export const MessagesListDeliveries403 = ForbiddenError;
export type MessagesListDeliveries404 = ResourceNotFoundError;
export const MessagesListDeliveries404 = ResourceNotFoundError;
export type MessagesListDeliveries422 = ValidationError;
export const MessagesListDeliveries422 = ValidationError;
export type MessagesListDeliveries500 = InternalError;
export const MessagesListDeliveries500 = InternalError;
export type MessagesListDeliveries504 = GatewayTimeoutError;
export const MessagesListDeliveries504 = GatewayTimeoutError;
export type MessagesGetEmailPathParams = { readonly id: MessageId };
export const MessagesGetEmailPathParams = /* @__PURE__ */ Schema.Struct({ id: MessageId });
export type MessagesGetEmailQuery = {
  readonly includeDownloadUrls?: boolean | null;
  readonly urlExpiresIn?: number | null;
};
export const MessagesGetEmailQuery = /* @__PURE__ */ Schema.Struct({
  includeDownloadUrls: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  urlExpiresIn: Schema.optionalKey(
    Schema.Union([
      Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isLessThanOrEqualTo(604800).annotate({
            expected: "a value less than or equal to 604800",
          }),
        )
        .check(Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" })),
      Schema.Null,
    ]),
  ),
});
export type MessagesGetEmail200 = {
  readonly deliveries: ReadonlyArray<{
    readonly scheduling: {
      readonly dueAt: string;
      readonly expiresAt: string;
      readonly waitReason:
        | "rate"
        | "daily-quota"
        | "domain-health"
        | "sending-paused"
        | "upstream-unavailable"
        | "retry"
        | "campaign-paused"
        | "domain-warming"
        | "onboarding-review"
        | "content-review"
        | "screening-unavailable"
        | null;
      readonly reviewExpectedAt: string | null;
    } | null;
    readonly id: string;
    readonly messageId: string;
    readonly recipientId: string | null;
    readonly channel: "email";
    readonly status:
      | "pending"
      | "scheduled"
      | "queued"
      | "processing"
      | "sent"
      | "delivered"
      | "read"
      | "failed"
      | "bounced"
      | "complained";
    readonly attemptCount: number;
    readonly maxAttempts: number;
    readonly queuedAt: string | null;
    readonly claimedAt: string | null;
    readonly lastAttemptAt: string | null;
    readonly nextRetryAt: string | null;
    readonly sentAt: string | null;
    readonly deliveredAt: string | null;
    readonly readAt: string | null;
    readonly failedAt: string | null;
    readonly terminalAt: string | null;
    readonly errorCode: string | null;
    readonly errorMessage: string | null;
    readonly errorDetails: DeliveryErrorDetails | null;
    readonly cost: string;
    readonly currency: string;
    readonly idempotencyKey: string | null;
    readonly createdAt: string;
    readonly updatedAt: string;
  }>;
  readonly id: MessageId;
  readonly organizationId: string;
  readonly conversationId: ConversationId | null;
  readonly status:
    | "pending"
    | "scheduled"
    | "queued"
    | "processing"
    | "sent"
    | "delivered"
    | "read"
    | "failed"
    | "bounced"
    | "complained";
  readonly channel: "email";
  readonly direction: "outbound" | "inbound";
  readonly subject: string | null;
  readonly fromEmail: string;
  readonly fromName: string | null;
  readonly toEmails: ReadonlyArray<EmailAddress>;
  readonly ccEmails: ReadonlyArray<EmailAddress> | null;
  readonly bccEmails: ReadonlyArray<EmailAddress> | null;
  readonly replyToEmails: ReadonlyArray<string> | null;
  readonly messageIdHeader: string;
  readonly inReplyTo: string | null;
  readonly references: ReadonlyArray<string> | null;
  readonly threadPosition: number | null;
  readonly newContent: string | null;
  readonly quotedContent: string | null;
  readonly hasQuotedContent: boolean;
  readonly dkimVerdict:
    | "pass"
    | "fail"
    | "softfail"
    | "neutral"
    | "none"
    | "policy"
    | "temperror"
    | "permerror"
    | null;
  readonly spfVerdict:
    | "pass"
    | "fail"
    | "softfail"
    | "neutral"
    | "none"
    | "policy"
    | "temperror"
    | "permerror"
    | null;
  readonly dmarcVerdict:
    | "pass"
    | "fail"
    | "softfail"
    | "neutral"
    | "none"
    | "policy"
    | "temperror"
    | "permerror"
    | null;
  readonly isAutoReply: boolean;
  readonly autoReplyReason:
    | "out-of-office"
    | "auto-response"
    | "delivery-status"
    | "read-receipt"
    | null;
  readonly listUnsubscribeUrl: string | null;
  readonly listUnsubscribeEmail: string | null;
  readonly priority: "high" | "normal" | "low" | null;
  readonly parsingErrors: ReadonlyArray<string> | null;
  readonly parsingDuration: number | null;
  readonly hasAttachments: boolean;
  readonly attachmentCount: number;
  readonly attachments: ReadonlyArray<{
    readonly id: AttachmentId;
    readonly filename: string;
    readonly contentType: string;
    readonly size: number;
    readonly isInline: boolean;
    readonly contentId: string | null;
  }>;
  readonly downloadUrls: {
    readonly rawMime: string | null;
    readonly html: string | null;
    readonly text: string | null;
    readonly expiresAt: string;
  } | null;
  readonly createdAt: string;
  readonly receivedAt: string | null;
  readonly processedAt: string | null;
};
export const MessagesGetEmail200 = /* @__PURE__ */ Schema.Struct({
  deliveries: Schema.Array(
    Schema.Struct({
      scheduling: Schema.Union([
        Schema.Struct({
          dueAt: Schema.String,
          expiresAt: Schema.String,
          waitReason: Schema.Union([
            Schema.Union([
              Schema.Literal("rate"),
              Schema.Literal("daily-quota"),
              Schema.Literal("domain-health"),
              Schema.Literal("sending-paused"),
              Schema.Literal("upstream-unavailable"),
              Schema.Literal("retry"),
              Schema.Literal("campaign-paused"),
              Schema.Literal("domain-warming"),
              Schema.Literal("onboarding-review"),
              Schema.Literal("content-review"),
              Schema.Literal("screening-unavailable"),
            ]),
            Schema.Null,
          ]),
          reviewExpectedAt: Schema.Union([Schema.String, Schema.Null]),
        }),
        Schema.Null,
      ]),
      id: Schema.String,
      messageId: Schema.String,
      recipientId: Schema.Union([Schema.String, Schema.Null]),
      channel: Schema.Literal("email"),
      status: Schema.Union([
        Schema.Literal("pending"),
        Schema.Literal("scheduled"),
        Schema.Literal("queued"),
        Schema.Literal("processing"),
        Schema.Literal("sent"),
        Schema.Literal("delivered"),
        Schema.Literal("read"),
        Schema.Literal("failed"),
        Schema.Literal("bounced"),
        Schema.Literal("complained"),
      ]),
      attemptCount: Schema.Finite.check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
      maxAttempts: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
      queuedAt: Schema.Union([Schema.String, Schema.Null]),
      claimedAt: Schema.Union([Schema.String, Schema.Null]),
      lastAttemptAt: Schema.Union([Schema.String, Schema.Null]),
      nextRetryAt: Schema.Union([Schema.String, Schema.Null]),
      sentAt: Schema.Union([Schema.String, Schema.Null]),
      deliveredAt: Schema.Union([Schema.String, Schema.Null]),
      readAt: Schema.Union([Schema.String, Schema.Null]),
      failedAt: Schema.Union([Schema.String, Schema.Null]),
      terminalAt: Schema.Union([Schema.String, Schema.Null]),
      errorCode: Schema.Union([Schema.String, Schema.Null]),
      errorMessage: Schema.Union([Schema.String, Schema.Null]),
      errorDetails: Schema.Union([DeliveryErrorDetails, Schema.Null]),
      cost: Schema.String,
      currency: Schema.String,
      idempotencyKey: Schema.Union([Schema.String, Schema.Null]),
      createdAt: Schema.String,
      updatedAt: Schema.String,
    }),
  ),
  id: MessageId,
  organizationId: Schema.String,
  conversationId: Schema.Union([ConversationId, Schema.Null]),
  status: Schema.Union([
    Schema.Literal("pending"),
    Schema.Literal("scheduled"),
    Schema.Literal("queued"),
    Schema.Literal("processing"),
    Schema.Literal("sent"),
    Schema.Literal("delivered"),
    Schema.Literal("read"),
    Schema.Literal("failed"),
    Schema.Literal("bounced"),
    Schema.Literal("complained"),
  ]),
  channel: Schema.Literal("email"),
  direction: Schema.Union([Schema.Literal("outbound"), Schema.Literal("inbound")]),
  subject: Schema.Union([Schema.String, Schema.Null]),
  fromEmail: Schema.String,
  fromName: Schema.Union([Schema.String, Schema.Null]),
  toEmails: Schema.Array(EmailAddress),
  ccEmails: Schema.Union([Schema.Array(EmailAddress), Schema.Null]),
  bccEmails: Schema.Union([Schema.Array(EmailAddress), Schema.Null]),
  replyToEmails: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  messageIdHeader: Schema.String,
  inReplyTo: Schema.Union([Schema.String, Schema.Null]),
  references: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  threadPosition: Schema.Union([
    Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    Schema.Null,
  ]),
  newContent: Schema.Union([Schema.String, Schema.Null]),
  quotedContent: Schema.Union([Schema.String, Schema.Null]),
  hasQuotedContent: Schema.Boolean,
  dkimVerdict: Schema.Union([
    Schema.Union([
      Schema.Literal("pass"),
      Schema.Literal("fail"),
      Schema.Literal("softfail"),
      Schema.Literal("neutral"),
      Schema.Literal("none"),
      Schema.Literal("policy"),
      Schema.Literal("temperror"),
      Schema.Literal("permerror"),
    ]),
    Schema.Null,
  ]),
  spfVerdict: Schema.Union([
    Schema.Union([
      Schema.Literal("pass"),
      Schema.Literal("fail"),
      Schema.Literal("softfail"),
      Schema.Literal("neutral"),
      Schema.Literal("none"),
      Schema.Literal("policy"),
      Schema.Literal("temperror"),
      Schema.Literal("permerror"),
    ]),
    Schema.Null,
  ]),
  dmarcVerdict: Schema.Union([
    Schema.Union([
      Schema.Literal("pass"),
      Schema.Literal("fail"),
      Schema.Literal("softfail"),
      Schema.Literal("neutral"),
      Schema.Literal("none"),
      Schema.Literal("policy"),
      Schema.Literal("temperror"),
      Schema.Literal("permerror"),
    ]),
    Schema.Null,
  ]),
  isAutoReply: Schema.Boolean,
  autoReplyReason: Schema.Union([
    Schema.Union([
      Schema.Literal("out-of-office"),
      Schema.Literal("auto-response"),
      Schema.Literal("delivery-status"),
      Schema.Literal("read-receipt"),
    ]),
    Schema.Null,
  ]),
  listUnsubscribeUrl: Schema.Union([Schema.String, Schema.Null]),
  listUnsubscribeEmail: Schema.Union([Schema.String, Schema.Null]),
  priority: Schema.Union([
    Schema.Union([Schema.Literal("high"), Schema.Literal("normal"), Schema.Literal("low")]),
    Schema.Null,
  ]),
  parsingErrors: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  parsingDuration: Schema.Union([
    Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })).check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
    Schema.Null,
  ]),
  hasAttachments: Schema.Boolean,
  attachmentCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    )
    .check(
      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
        expected: "a value less than or equal to 9007199254740991",
      }),
    ),
  attachments: Schema.Array(
    Schema.Struct({
      id: AttachmentId,
      filename: Schema.String,
      contentType: Schema.String,
      size: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      isInline: Schema.Boolean,
      contentId: Schema.Union([Schema.String, Schema.Null]),
    }),
  ),
  downloadUrls: Schema.Union([
    Schema.Struct({
      rawMime: Schema.Union([Schema.String, Schema.Null]),
      html: Schema.Union([Schema.String, Schema.Null]),
      text: Schema.Union([Schema.String, Schema.Null]),
      expiresAt: Schema.String,
    }),
    Schema.Null,
  ]),
  createdAt: Schema.String,
  receivedAt: Schema.Union([Schema.String, Schema.Null]).annotate({
    description:
      "When Samva's receiving server accepted the email; null for outbound email. The sender's `Date` header plays no part and stays in the raw MIME.",
  }),
  processedAt: Schema.Union([Schema.String, Schema.Null]),
});
export type MessagesGetEmail401 = UnauthorizedError;
export const MessagesGetEmail401 = UnauthorizedError;
export type MessagesGetEmail403 = ForbiddenError;
export const MessagesGetEmail403 = ForbiddenError;
export type MessagesGetEmail404 = ResourceNotFoundError;
export const MessagesGetEmail404 = ResourceNotFoundError;
export type MessagesGetEmail422 = ValidationError;
export const MessagesGetEmail422 = ValidationError;
export type MessagesGetEmail500 = InternalError;
export const MessagesGetEmail500 = InternalError;
export type MessagesGetEmail504 = GatewayTimeoutError;
export const MessagesGetEmail504 = GatewayTimeoutError;
export type MessagesGetEventsPathParams = { readonly id: MessageId };
export const MessagesGetEventsPathParams = /* @__PURE__ */ Schema.Struct({ id: MessageId });
export type MessagesGetEventsQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
};
export const MessagesGetEventsQuery = /* @__PURE__ */ Schema.Struct({
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
});
export type MessagesGetEvents200 = MessageEventPage;
export const MessagesGetEvents200 = MessageEventPage;
export type MessagesGetEvents401 = UnauthorizedError;
export const MessagesGetEvents401 = UnauthorizedError;
export type MessagesGetEvents403 = ForbiddenError;
export const MessagesGetEvents403 = ForbiddenError;
export type MessagesGetEvents404 = ResourceNotFoundError;
export const MessagesGetEvents404 = ResourceNotFoundError;
export type MessagesGetEvents422 = ValidationError;
export const MessagesGetEvents422 = ValidationError;
export type MessagesGetEvents500 = InternalError;
export const MessagesGetEvents500 = InternalError;
export type MessagesGetEvents504 = GatewayTimeoutError;
export const MessagesGetEvents504 = GatewayTimeoutError;
export type MessagesGetStatusPathParams = { readonly id: MessageId };
export const MessagesGetStatusPathParams = /* @__PURE__ */ Schema.Struct({ id: MessageId });
export type MessagesGetStatus200 = {
  readonly id: MessageId;
  readonly status:
    | "pending"
    | "scheduled"
    | "queued"
    | "processing"
    | "sent"
    | "delivered"
    | "read"
    | "failed"
    | "bounced"
    | "complained";
  readonly updatedAt: string;
};
export const MessagesGetStatus200 = /* @__PURE__ */ Schema.Struct({
  id: MessageId,
  status: Schema.Union([
    Schema.Literal("pending"),
    Schema.Literal("scheduled"),
    Schema.Literal("queued"),
    Schema.Literal("processing"),
    Schema.Literal("sent"),
    Schema.Literal("delivered"),
    Schema.Literal("read"),
    Schema.Literal("failed"),
    Schema.Literal("bounced"),
    Schema.Literal("complained"),
  ]),
  updatedAt: Schema.String,
});
export type MessagesGetStatus401 = UnauthorizedError;
export const MessagesGetStatus401 = UnauthorizedError;
export type MessagesGetStatus403 = ForbiddenError;
export const MessagesGetStatus403 = ForbiddenError;
export type MessagesGetStatus404 = ResourceNotFoundError;
export const MessagesGetStatus404 = ResourceNotFoundError;
export type MessagesGetStatus422 = ValidationError;
export const MessagesGetStatus422 = ValidationError;
export type MessagesGetStatus500 = InternalError;
export const MessagesGetStatus500 = InternalError;
export type MessagesGetStatus504 = GatewayTimeoutError;
export const MessagesGetStatus504 = GatewayTimeoutError;
export type MessagesValidateEmailRequestJson = {
  readonly conversationId?: ConversationId | null | null;
  readonly metadata?: MessageMetadata;
  readonly channel: "email";
  readonly to: EmailRecipients;
  readonly cc?: EmailCcRecipients;
  readonly bcc?: EmailBccRecipients;
  readonly from?: EmailSender;
  readonly email: EmailContent;
};
export const MessagesValidateEmailRequestJson = /* @__PURE__ */ Schema.Struct({
  conversationId: Schema.optionalKey(
    Schema.Union([Schema.Union([ConversationId, Schema.Null]), Schema.Null]),
  ),
  metadata: Schema.optionalKey(MessageMetadata),
  channel: Schema.Literal("email"),
  to: EmailRecipients,
  cc: Schema.optionalKey(EmailCcRecipients),
  bcc: Schema.optionalKey(EmailBccRecipients),
  from: Schema.optionalKey(EmailSender),
  email: EmailContent,
});
export type MessagesValidateEmail200 = ValidateEmailResponse;
export const MessagesValidateEmail200 = ValidateEmailResponse;
export type MessagesValidateEmail401 = UnauthorizedError;
export const MessagesValidateEmail401 = UnauthorizedError;
export type MessagesValidateEmail403 = ForbiddenError;
export const MessagesValidateEmail403 = ForbiddenError;
export type MessagesValidateEmail404 = ResourceNotFoundError;
export const MessagesValidateEmail404 = ResourceNotFoundError;
export type MessagesValidateEmail422 = ValidationError | FromAddressRequiredError;
export const MessagesValidateEmail422 = /* @__PURE__ */ Schema.Union([
  ValidationError,
  FromAddressRequiredError,
]);
export type MessagesValidateEmail500 = InternalError;
export const MessagesValidateEmail500 = InternalError;
export type MessagesValidateEmail503 = SenderNotReadyError;
export const MessagesValidateEmail503 = SenderNotReadyError;
export type MessagesValidateEmail504 = GatewayTimeoutError;
export const MessagesValidateEmail504 = GatewayTimeoutError;

export class MessagesGroup extends HttpApiGroup.make("Messages")
  .add(
    HttpApiEndpoint.get("messagesList", "/v1/messages", {
      query: MessagesListQuery,
      success: MessagesList200,
      error: [
        MessagesList401.pipe(HttpApiSchema.status(401)),
        MessagesList403.pipe(HttpApiSchema.status(403)),
        MessagesList422.pipe(HttpApiSchema.status(422)),
        MessagesList500,
        MessagesList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "messages.list")
      .annotate(OpenApi.Summary, "List messages")
      .annotate(
        OpenApi.Description,
        "Returns message summaries, newest first (oldest first when filtered by conversation), with optional filters for channel, direction, status, conversation, contact, sender address, and creation time. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.post("messagesSend", "/v1/messages", {
      headers: MessagesSendHeaders,
      payload: MessagesSendRequestJson,
      success: MessagesSend201.pipe(HttpApiSchema.status(201)),
      error: [
        MessagesSend401.pipe(HttpApiSchema.status(401)),
        MessagesSend402.pipe(HttpApiSchema.status(402)),
        MessagesSend403.pipe(HttpApiSchema.status(403)),
        MessagesSend404.pipe(HttpApiSchema.status(404)),
        MessagesSend409.pipe(HttpApiSchema.status(409)),
        MessagesSend422.pipe(HttpApiSchema.status(422)),
        MessagesSend429.pipe(HttpApiSchema.status(429)),
        MessagesSend500,
        MessagesSend502.pipe(HttpApiSchema.status(502)),
        MessagesSend503.pipe(HttpApiSchema.status(503)),
        MessagesSend504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "messages.send")
      .annotate(OpenApi.Summary, "Send a message")
      .annotate(
        OpenApi.Description,
        "Sends a message on the requested channel and returns its receipt (id, status, and why it waits when it does) with a 201 Created status. Requires `messages:create` or the send permission of the channel it sends on, such as `email:send`. `channel` selects the payload variant. Repeating an identical request with the same optional `Idempotency-Key` header returns the original receipt; reusing the key for different content returns a conflict.",
      ),
    HttpApiEndpoint.get("messagesGet", "/v1/messages/:id", {
      params: MessagesGetPathParams,
      success: MessagesGet200,
      error: [
        MessagesGet401.pipe(HttpApiSchema.status(401)),
        MessagesGet403.pipe(HttpApiSchema.status(403)),
        MessagesGet404.pipe(HttpApiSchema.status(404)),
        MessagesGet422.pipe(HttpApiSchema.status(422)),
        MessagesGet500,
        MessagesGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "messages.get")
      .annotate(OpenApi.Summary, "Get a message")
      .annotate(
        OpenApi.Description,
        "Returns a message by its ID: addresses, subject, status, and why it is waiting when it is. Per-recipient delivery state and the body are their own reads.",
      ),
    HttpApiEndpoint.delete("messagesRemove", "/v1/messages/:id", {
      params: MessagesRemovePathParams,
      success: MessagesRemove200,
      error: [
        MessagesRemove401.pipe(HttpApiSchema.status(401)),
        MessagesRemove403.pipe(HttpApiSchema.status(403)),
        MessagesRemove404.pipe(HttpApiSchema.status(404)),
        MessagesRemove422.pipe(HttpApiSchema.status(422)),
        MessagesRemove500,
        MessagesRemove502.pipe(HttpApiSchema.status(502)),
        MessagesRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "messages.remove")
      .annotate(OpenApi.Summary, "Delete a message")
      .annotate(OpenApi.Description, "Permanently deletes a message by its ID."),
    HttpApiEndpoint.get("messagesGetContent", "/v1/messages/:id/content", {
      params: MessagesGetContentPathParams,
      success: MessagesGetContent200,
      error: [
        MessagesGetContent401.pipe(HttpApiSchema.status(401)),
        MessagesGetContent403.pipe(HttpApiSchema.status(403)),
        MessagesGetContent404.pipe(HttpApiSchema.status(404)),
        MessagesGetContent422.pipe(HttpApiSchema.status(422)),
        MessagesGetContent500,
        MessagesGetContent504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "messages.getContent")
      .annotate(OpenApi.Summary, "Get message content")
      .annotate(OpenApi.Description, "Returns the content the message was sent or received with."),
    HttpApiEndpoint.get("messagesListDeliveries", "/v1/messages/:id/deliveries", {
      params: MessagesListDeliveriesPathParams,
      success: MessagesListDeliveries200,
      error: [
        MessagesListDeliveries401.pipe(HttpApiSchema.status(401)),
        MessagesListDeliveries403.pipe(HttpApiSchema.status(403)),
        MessagesListDeliveries404.pipe(HttpApiSchema.status(404)),
        MessagesListDeliveries422.pipe(HttpApiSchema.status(422)),
        MessagesListDeliveries500,
        MessagesListDeliveries504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "messages.listDeliveries")
      .annotate(OpenApi.Summary, "List message deliveries")
      .annotate(
        OpenApi.Description,
        "Returns one delivery per recipient: its status, attempts, delivery times, and why it failed or is waiting.",
      ),
    HttpApiEndpoint.get("messagesGetEmail", "/v1/messages/:id/email", {
      params: MessagesGetEmailPathParams,
      query: MessagesGetEmailQuery,
      success: MessagesGetEmail200,
      error: [
        MessagesGetEmail401.pipe(HttpApiSchema.status(401)),
        MessagesGetEmail403.pipe(HttpApiSchema.status(403)),
        MessagesGetEmail404.pipe(HttpApiSchema.status(404)),
        MessagesGetEmail422.pipe(HttpApiSchema.status(422)),
        MessagesGetEmail500,
        MessagesGetEmail504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "messages.getEmail")
      .annotate(OpenApi.Summary, "Get email message details")
      .annotate(
        OpenApi.Description,
        "Returns email delivery details for a message, optionally including signed URLs for its raw MIME, HTML, and text content.",
      ),
    HttpApiEndpoint.get("messagesGetEvents", "/v1/messages/:id/events", {
      params: MessagesGetEventsPathParams,
      query: MessagesGetEventsQuery,
      success: MessagesGetEvents200,
      error: [
        MessagesGetEvents401.pipe(HttpApiSchema.status(401)),
        MessagesGetEvents403.pipe(HttpApiSchema.status(403)),
        MessagesGetEvents404.pipe(HttpApiSchema.status(404)),
        MessagesGetEvents422.pipe(HttpApiSchema.status(422)),
        MessagesGetEvents500,
        MessagesGetEvents504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "messages.getEvents")
      .annotate(OpenApi.Summary, "List message events")
      .annotate(
        OpenApi.Description,
        "Returns the delivery events recorded for a message, oldest first. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.get("messagesGetStatus", "/v1/messages/:id/status", {
      params: MessagesGetStatusPathParams,
      success: MessagesGetStatus200,
      error: [
        MessagesGetStatus401.pipe(HttpApiSchema.status(401)),
        MessagesGetStatus403.pipe(HttpApiSchema.status(403)),
        MessagesGetStatus404.pipe(HttpApiSchema.status(404)),
        MessagesGetStatus422.pipe(HttpApiSchema.status(422)),
        MessagesGetStatus500,
        MessagesGetStatus504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "messages.getStatus")
      .annotate(OpenApi.Summary, "Get message delivery status")
      .annotate(OpenApi.Description, "Returns the current delivery status of a message by its ID."),
    HttpApiEndpoint.post("messagesValidateEmail", "/v1/messages/validate/email", {
      payload: MessagesValidateEmailRequestJson,
      success: MessagesValidateEmail200,
      error: [
        MessagesValidateEmail401.pipe(HttpApiSchema.status(401)),
        MessagesValidateEmail403.pipe(HttpApiSchema.status(403)),
        MessagesValidateEmail404.pipe(HttpApiSchema.status(404)),
        MessagesValidateEmail422.pipe(HttpApiSchema.status(422)),
        MessagesValidateEmail500,
        MessagesValidateEmail503.pipe(HttpApiSchema.status(503)),
        MessagesValidateEmail504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "messages.validateEmail")
      .annotate(OpenApi.Summary, "Validate an email message")
      .annotate(
        OpenApi.Description,
        "Resolves recipients, sender, and inline or published-template content without sending anything, creating contacts or messages, or counting toward your quota.",
      ),
  )
  .annotate(OpenApi.Description, "Send messages and read their delivery state and timeline.") {}
