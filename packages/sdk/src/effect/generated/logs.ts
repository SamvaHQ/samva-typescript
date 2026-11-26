// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeyId,
  ApiKeySecurityMiddleware,
  DeliveryErrorDetails,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  MailboxId,
  MalformedRequestError,
  MessageContent,
  MessageId,
  ResourceNotFoundError,
  SubmissionClient,
  UnauthorizedError,
  UserId,
  ValidationError,
  __SamvaRuntimeAbsoluteInstant,
} from "./shared";

export type LogSender = { readonly address: string; readonly name: string | null };
export const LogSender = /* @__PURE__ */ (() =>
  Schema.Struct({
    address: Schema.String,
    name: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "LogSender" }))();
export type LogCampaign = { readonly runId: string; readonly name: string };
export const LogCampaign = /* @__PURE__ */ (() =>
  Schema.Struct({ runId: Schema.String, name: Schema.String }).annotate({
    identifier: "LogCampaign",
  }))();
export type LogApiRequest = {
  readonly requestId?: string | null;
  readonly method?: string | null;
  readonly endpoint?: string | null;
  readonly headers?: { readonly [x: string]: string } | null;
  readonly query?: { readonly [x: string]: string } | null;
  readonly ipAddress?: string | null;
  readonly userAgent?: string | null;
};
export const LogApiRequest = /* @__PURE__ */ (() =>
  Schema.Struct({
    requestId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    method: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    endpoint: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    headers: Schema.optionalKey(
      Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
    ),
    query: Schema.optionalKey(
      Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
    ),
    ipAddress: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    userAgent: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }).annotate({ identifier: "LogApiRequest" }))();
export type LogStatusTimeline = {
  readonly availability: "recorded" | "unavailable";
  readonly entries: ReadonlyArray<{
    readonly status: string;
    readonly at: string;
    readonly reason: string | null;
    readonly recipientId: string | null;
  }>;
};
export const LogStatusTimeline = /* @__PURE__ */ (() =>
  Schema.Struct({
    availability: Schema.Union([Schema.Literal("recorded"), Schema.Literal("unavailable")]),
    entries: Schema.Array(
      Schema.Struct({
        status: Schema.String,
        at: Schema.String,
        reason: Schema.Union([Schema.String, Schema.Null]),
        recipientId: Schema.Union([Schema.String, Schema.Null]),
      }),
    ),
  }).annotate({ identifier: "LogStatusTimeline" }))();
export type LogUser = { readonly id: UserId; readonly email: string; readonly name: string };
export const LogUser = /* @__PURE__ */ (() =>
  Schema.Struct({ id: UserId, email: Schema.String, name: Schema.String }).annotate({
    identifier: "LogUser",
  }))();
export type LogCredential =
  | { readonly kind: "api_key"; readonly apiKeyId: ApiKeyId | null; readonly name: string | null }
  | { readonly kind: "oauth"; readonly clientId: string | null; readonly name: string | null }
  | { readonly kind: "session" };
export const LogCredential = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Struct({
      kind: Schema.Literal("api_key"),
      apiKeyId: Schema.Union([ApiKeyId, Schema.Null]),
      name: Schema.Union([Schema.String, Schema.Null]),
    }),
    Schema.Struct({
      kind: Schema.Literal("oauth"),
      clientId: Schema.Union([Schema.String, Schema.Null]),
      name: Schema.Union([Schema.String, Schema.Null]),
    }),
    Schema.Struct({ kind: Schema.Literal("session") }),
  ]).annotate({ identifier: "LogCredential" }))();
export type LogSubmission = {
  readonly origin:
    | "direct"
    | "campaign"
    | "scheduled"
    | "mailbox"
    | "forwarding"
    | "journey"
    | "businessApp";
  readonly transport: "http" | "smtp" | null;
  readonly credential: LogCredential | null;
  readonly user?: LogUser | null;
  readonly client: SubmissionClient | null;
};
export const LogSubmission = /* @__PURE__ */ (() =>
  Schema.Struct({
    origin: Schema.Union([
      Schema.Literal("direct"),
      Schema.Literal("campaign"),
      Schema.Literal("scheduled"),
      Schema.Literal("mailbox"),
      Schema.Literal("forwarding"),
      Schema.Literal("journey"),
      Schema.Literal("businessApp"),
    ]),
    transport: Schema.Union([
      Schema.Union([Schema.Literal("http"), Schema.Literal("smtp")]),
      Schema.Null,
    ]),
    credential: Schema.Union([LogCredential, Schema.Null]),
    user: Schema.optionalKey(
      Schema.Union([LogUser, Schema.Null]).annotate({
        description:
          "The acting user, or null when unavailable. Present only for callers authenticated with a member session or a member-authorized OAuth token.",
      }),
    ),
    client: Schema.Union([SubmissionClient, Schema.Null]),
  }).annotate({ identifier: "LogSubmission" }))();
export type LogLine = {
  readonly id: string;
  readonly cursor: string;
  readonly timestamp: string;
  readonly event:
    | "accepted"
    | "waiting"
    | "received"
    | "rejected"
    | "created"
    | "queued"
    | "processing"
    | "sent"
    | "delivered"
    | "read"
    | "failed"
    | "bounced"
    | "complained"
    | "replied"
    | "forwarded"
    | "deleted"
    | "archived"
    | "marked_spam"
    | "agent_processing_started"
    | "agent_processing_completed"
    | "agent_handoff"
    | "agent_escalation"
    | "opened"
    | "clicked"
    | "unsubscribed"
    | "whatsapp_read"
    | "whatsapp_deleted"
    | "retry_scheduled"
    | "retry_attempted"
    | "cost_calculated";
  readonly messageId: MessageId | null;
  readonly channel: "sms" | "whatsapp" | "email" | null;
  readonly direction: "outbound" | "inbound";
  readonly origin:
    | "direct"
    | "campaign"
    | "scheduled"
    | "mailbox"
    | "forwarding"
    | "journey"
    | "businessApp"
    | null;
  readonly from: LogSender | null;
  readonly recipient: string | null;
  readonly subject: string | null;
  readonly submission: LogSubmission | null;
  readonly requestId: string | null;
  readonly reason: string | null;
  readonly errorTag: string | null;
};
export const LogLine = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: Schema.String,
    cursor: Schema.String,
    timestamp: Schema.String,
    event: Schema.Union([
      Schema.Literal("accepted"),
      Schema.Literal("waiting"),
      Schema.Literal("received"),
      Schema.Literal("rejected"),
      Schema.Literal("created"),
      Schema.Literal("queued"),
      Schema.Literal("processing"),
      Schema.Literal("sent"),
      Schema.Literal("delivered"),
      Schema.Literal("read"),
      Schema.Literal("failed"),
      Schema.Literal("bounced"),
      Schema.Literal("complained"),
      Schema.Literal("replied"),
      Schema.Literal("forwarded"),
      Schema.Literal("deleted"),
      Schema.Literal("archived"),
      Schema.Literal("marked_spam"),
      Schema.Literal("agent_processing_started"),
      Schema.Literal("agent_processing_completed"),
      Schema.Literal("agent_handoff"),
      Schema.Literal("agent_escalation"),
      Schema.Literal("opened"),
      Schema.Literal("clicked"),
      Schema.Literal("unsubscribed"),
      Schema.Literal("whatsapp_read"),
      Schema.Literal("whatsapp_deleted"),
      Schema.Literal("retry_scheduled"),
      Schema.Literal("retry_attempted"),
      Schema.Literal("cost_calculated"),
    ]),
    messageId: Schema.Union([MessageId, Schema.Null]),
    channel: Schema.Union([
      Schema.Union([Schema.Literal("sms"), Schema.Literal("whatsapp"), Schema.Literal("email")]),
      Schema.Null,
    ]),
    direction: Schema.Union([Schema.Literal("outbound"), Schema.Literal("inbound")]),
    origin: Schema.Union([
      Schema.Union([
        Schema.Literal("direct"),
        Schema.Literal("campaign"),
        Schema.Literal("scheduled"),
        Schema.Literal("mailbox"),
        Schema.Literal("forwarding"),
        Schema.Literal("journey"),
        Schema.Literal("businessApp"),
      ]),
      Schema.Null,
    ]),
    from: Schema.Union([LogSender, Schema.Null]),
    recipient: Schema.Union([Schema.String, Schema.Null]),
    subject: Schema.Union([Schema.String, Schema.Null]),
    submission: Schema.Union([LogSubmission, Schema.Null]),
    requestId: Schema.Union([Schema.String, Schema.Null]),
    reason: Schema.Union([Schema.String, Schema.Null]),
    errorTag: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "LogLine" }))();
export type MessageLogPage = {
  readonly items: ReadonlyArray<LogLine>;
  readonly nextCursor: string | null;
};
export const MessageLogPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(LogLine),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "MessageLogPage" }))();
export type RejectedLogDetail = {
  readonly kind: "rejected";
  readonly line: LogLine;
  readonly apiRequest: LogApiRequest | null;
  readonly requestBody: string | null;
  readonly responseBody: string | null;
};
export const RejectedLogDetail = /* @__PURE__ */ (() =>
  Schema.Struct({
    kind: Schema.Literal("rejected"),
    line: LogLine,
    apiRequest: Schema.Union([LogApiRequest, Schema.Null]),
    requestBody: Schema.Union([Schema.String, Schema.Null]),
    responseBody: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "RejectedLogDetail" }))();
export type MessageLogDetail = {
  readonly kind: "message";
  readonly requestBody: string | null;
  readonly responseBody: string | null;
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
    readonly channel: "sms" | "whatsapp" | "email";
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
  readonly messageId: MessageId;
  readonly channel: "sms" | "whatsapp" | "email";
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
  readonly recipients: ReadonlyArray<{ readonly id: string; readonly address: string }>;
  readonly recipientCount: number;
  readonly from: LogSender | null;
  readonly submission: LogSubmission | null;
  readonly subject: string | null;
  readonly acceptedAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly campaign: LogCampaign | null;
  readonly content: MessageContent;
  readonly apiRequest: LogApiRequest | null;
  readonly statusTimeline: LogStatusTimeline;
};
export const MessageLogDetail = /* @__PURE__ */ (() =>
  Schema.Struct({
    kind: Schema.Literal("message"),
    requestBody: Schema.Union([Schema.String, Schema.Null]),
    responseBody: Schema.Union([Schema.String, Schema.Null]),
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
        channel: Schema.Union([
          Schema.Literal("sms"),
          Schema.Literal("whatsapp"),
          Schema.Literal("email"),
        ]),
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
        maxAttempts: Schema.Finite.check(
          Schema.isFinite().annotate({ expected: "a finite number" }),
        ),
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
    messageId: MessageId,
    channel: Schema.Union([
      Schema.Literal("sms"),
      Schema.Literal("whatsapp"),
      Schema.Literal("email"),
    ]),
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
    recipients: Schema.Array(Schema.Struct({ id: Schema.String, address: Schema.String })),
    recipientCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    from: Schema.Union([LogSender, Schema.Null]),
    submission: Schema.Union([LogSubmission, Schema.Null]),
    subject: Schema.Union([Schema.String, Schema.Null]),
    acceptedAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
    campaign: Schema.Union([LogCampaign, Schema.Null]),
    content: MessageContent,
    apiRequest: Schema.Union([LogApiRequest, Schema.Null]),
    statusTimeline: LogStatusTimeline,
  }).annotate({ identifier: "MessageLogDetail" }))();
export type LogDetail = MessageLogDetail | RejectedLogDetail;
export const LogDetail = /* @__PURE__ */ (() =>
  Schema.Union([MessageLogDetail, RejectedLogDetail]).annotate({ identifier: "LogDetail" }))();
export type LogsListQuery = {
  readonly limit?: number | null;
  readonly cursor?: string;
  readonly after?: string;
  readonly orderBy?: "timestamp" | "recorded";
  readonly order?: "asc" | "desc";
  readonly since?: __SamvaRuntimeAbsoluteInstant;
  readonly until?: __SamvaRuntimeAbsoluteInstant;
  readonly status?: string;
  readonly event?: string;
  readonly channel?: "sms" | "whatsapp" | "email";
  readonly direction?: "outbound" | "inbound";
  readonly origin?:
    | "direct"
    | "campaign"
    | "scheduled"
    | "mailbox"
    | "forwarding"
    | "journey"
    | "businessApp";
  readonly credential?: string;
  readonly from?: string;
  readonly messageId?: MessageId;
  readonly mailboxId?: MailboxId;
  readonly requestId?: string;
};
export const LogsListQuery = /* @__PURE__ */ (() =>
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
    after: Schema.optionalKey(Schema.String),
    orderBy: Schema.optionalKey(
      Schema.Union([Schema.Literal("timestamp"), Schema.Literal("recorded")]),
    ),
    order: Schema.optionalKey(Schema.Union([Schema.Literal("asc"), Schema.Literal("desc")])),
    since: Schema.optionalKey(__SamvaRuntimeAbsoluteInstant),
    until: Schema.optionalKey(__SamvaRuntimeAbsoluteInstant),
    status: Schema.optionalKey(Schema.String),
    event: Schema.optionalKey(Schema.String),
    channel: Schema.optionalKey(
      Schema.Union([Schema.Literal("sms"), Schema.Literal("whatsapp"), Schema.Literal("email")]),
    ),
    direction: Schema.optionalKey(
      Schema.Union([Schema.Literal("outbound"), Schema.Literal("inbound")]),
    ),
    origin: Schema.optionalKey(
      Schema.Union([
        Schema.Literal("direct"),
        Schema.Literal("campaign"),
        Schema.Literal("scheduled"),
        Schema.Literal("mailbox"),
        Schema.Literal("forwarding"),
        Schema.Literal("journey"),
        Schema.Literal("businessApp"),
      ]),
    ),
    credential: Schema.optionalKey(Schema.String),
    from: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      ),
    ),
    messageId: Schema.optionalKey(MessageId),
    mailboxId: Schema.optionalKey(MailboxId),
    requestId: Schema.optionalKey(
      Schema.String.check(
        Schema.isPattern(new globalThis.RegExp("^req_[a-zA-Z0-9_-]+$")).annotate({
          expected: "a string matching the RegExp ^req_[a-zA-Z0-9_-]+$",
        }),
      ),
    ),
  }))();
export type LogsList200 = MessageLogPage;
export const LogsList200 = MessageLogPage;
export type LogsList400 = MalformedRequestError;
export const LogsList400 = MalformedRequestError;
export type LogsList401 = UnauthorizedError;
export const LogsList401 = UnauthorizedError;
export type LogsList403 = ForbiddenError;
export const LogsList403 = ForbiddenError;
export type LogsList422 = ValidationError;
export const LogsList422 = ValidationError;
export type LogsList500 = InternalError;
export const LogsList500 = InternalError;
export type LogsList504 = GatewayTimeoutError;
export const LogsList504 = GatewayTimeoutError;
export type LogsGetPathParams = { readonly id: MessageId | string | string };
export const LogsGetPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: Schema.Union([
      MessageId,
      Schema.String.check(
        Schema.isPattern(new globalThis.RegExp("^rej_[a-zA-Z0-9]+$")).annotate({
          expected: "a string matching the RegExp ^rej_[a-zA-Z0-9]+$",
        }),
      ),
      Schema.String.check(
        Schema.isPattern(new globalThis.RegExp("^req_[a-zA-Z0-9_-]+$")).annotate({
          expected: "a string matching the RegExp ^req_[a-zA-Z0-9_-]+$",
        }),
      ),
    ]),
  }))();
export type LogsGet200 = LogDetail;
export const LogsGet200 = LogDetail;
export type LogsGet400 = MalformedRequestError;
export const LogsGet400 = MalformedRequestError;
export type LogsGet401 = UnauthorizedError;
export const LogsGet401 = UnauthorizedError;
export type LogsGet403 = ForbiddenError;
export const LogsGet403 = ForbiddenError;
export type LogsGet404 = ResourceNotFoundError;
export const LogsGet404 = ResourceNotFoundError;
export type LogsGet422 = ValidationError;
export const LogsGet422 = ValidationError;
export type LogsGet500 = InternalError;
export const LogsGet500 = InternalError;
export type LogsGet504 = GatewayTimeoutError;
export const LogsGet504 = GatewayTimeoutError;

export class LogsGroup extends HttpApiGroup.make("Logs")
  .add(
    HttpApiEndpoint.get("logsList", "/v1/logs", {
      query: LogsListQuery,
      success: LogsList200,
      error: [
        LogsList400.pipe(HttpApiSchema.status(400)),
        LogsList401.pipe(HttpApiSchema.status(401)),
        LogsList403.pipe(HttpApiSchema.status(403)),
        LogsList422.pipe(HttpApiSchema.status(422)),
        LogsList500,
        LogsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "logs.list")
      .annotate(OpenApi.Summary, "List message log events")
      .annotate(
        OpenApi.Description,
        "Lists the organization's message events in its plan's log window. The default sort is by event timestamp. Use orderBy=recorded and order=asc to poll events in ingestion order, including events with older timestamps. Pass the last event's cursor as after. Keep the same sort and direction when paging.",
      ),
    HttpApiEndpoint.get("logsGet", "/v1/logs/:id", {
      params: LogsGetPathParams,
      success: LogsGet200,
      error: [
        LogsGet400.pipe(HttpApiSchema.status(400)),
        LogsGet401.pipe(HttpApiSchema.status(401)),
        LogsGet403.pipe(HttpApiSchema.status(403)),
        LogsGet404.pipe(HttpApiSchema.status(404)),
        LogsGet422.pipe(HttpApiSchema.status(422)),
        LogsGet500,
        LogsGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "logs.get")
      .annotate(OpenApi.Summary, "Get message log detail")
      .annotate(
        OpenApi.Description,
        "Returns the message and its event timeline, or a rejected submission, by message, rejection, or request ID.",
      ),
  )
  .annotate(OpenApi.Description, "Message events and rejected submissions") {}
