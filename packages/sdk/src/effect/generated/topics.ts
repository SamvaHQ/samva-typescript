// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  BillingProviderError,
  ConflictError,
  ContactId,
  Cursor,
  EmailSenderId,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  MailboxId,
  NamespaceId,
  PaymentRequiredError,
  ResourceNotFoundError,
  TemplateId,
  TopicContactRef,
  TopicId,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type TopicSubscriptionCounts = {
  readonly email: { readonly subscribed: number; readonly unsubscribed: number };
};
export const TopicSubscriptionCounts = /* @__PURE__ */ (() =>
  Schema.Struct({
    email: Schema.Struct({
      subscribed: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      unsubscribed: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  }).annotate({ identifier: "TopicSubscriptionCounts" }))();
export type TopicSetSubscriptionsResult = { readonly updated: number };
export const TopicSetSubscriptionsResult = /* @__PURE__ */ (() =>
  Schema.Struct({
    updated: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  }).annotate({ identifier: "TopicSetSubscriptionsResult" }))();
export type TopicSubscription = {
  readonly contactId: ContactId;
  readonly channel: "email";
  readonly status: "subscribed" | "unsubscribed";
  readonly source: string;
  readonly subscribedAt: string | null;
  readonly unsubscribedAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const TopicSubscription = /* @__PURE__ */ (() =>
  Schema.Struct({
    contactId: ContactId,
    channel: Schema.Literal("email"),
    status: Schema.Union([Schema.Literal("subscribed"), Schema.Literal("unsubscribed")]),
    source: Schema.String,
    subscribedAt: Schema.Union([Schema.String, Schema.Null]),
    unsubscribedAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "TopicSubscription" }))();
export type TopicSubscriptionCheck = {
  readonly contactId: ContactId | null;
  readonly channel: "email";
  readonly topics: ReadonlyArray<{
    readonly topicId: TopicId;
    readonly topicName: string;
    readonly status: "subscribed" | "unsubscribed";
  }>;
};
export const TopicSubscriptionCheck = /* @__PURE__ */ (() =>
  Schema.Struct({
    contactId: Schema.Union([ContactId, Schema.Null]),
    channel: Schema.Literal("email"),
    topics: Schema.Array(
      Schema.Struct({
        topicId: TopicId,
        topicName: Schema.String,
        status: Schema.Union([Schema.Literal("subscribed"), Schema.Literal("unsubscribed")]),
      }),
    ),
  }).annotate({ identifier: "TopicSubscriptionCheck" }))();
export type Topic = {
  readonly id: TopicId;
  readonly namespaceId: NamespaceId | null;
  readonly name: string;
  readonly description: string | null;
  readonly default: "opt_out" | "opt_in";
  readonly isDefault: boolean;
  readonly defaultSenderId: EmailSenderId | null;
  readonly replyMailboxId: MailboxId | null;
  readonly templateId: TemplateId | null;
  readonly subscriptions: TopicSubscriptionCounts;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const Topic = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: TopicId,
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
    name: Schema.String,
    description: Schema.Union([Schema.String, Schema.Null]),
    default: Schema.Union([Schema.Literal("opt_out"), Schema.Literal("opt_in")]),
    isDefault: Schema.Boolean,
    defaultSenderId: Schema.Union([EmailSenderId, Schema.Null]),
    replyMailboxId: Schema.Union([MailboxId, Schema.Null]),
    templateId: Schema.Union([TemplateId, Schema.Null]),
    subscriptions: TopicSubscriptionCounts,
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "Topic" }))();
export type TopicSubscriptionPage = {
  readonly items: ReadonlyArray<TopicSubscription>;
  readonly nextCursor: string | null;
};
export const TopicSubscriptionPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(TopicSubscription),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "TopicSubscriptionPage" }))();
export type TopicList = { readonly items: ReadonlyArray<Topic> };
export const TopicList = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(Topic).check(
      Schema.isMaxLength(200).annotate({ expected: "a value with a length of at most 200" }),
    ),
  }).annotate({ identifier: "TopicList" }))();
export type TopicsListQuery = { readonly namespaceId?: NamespaceId | null };
export const TopicsListQuery = /* @__PURE__ */ (() =>
  Schema.Struct({ namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])) }))();
export type TopicsList200 = TopicList;
export const TopicsList200 = TopicList;
export type TopicsList401 = UnauthorizedError;
export const TopicsList401 = UnauthorizedError;
export type TopicsList403 = ForbiddenError;
export const TopicsList403 = ForbiddenError;
export type TopicsList422 = ValidationError;
export const TopicsList422 = ValidationError;
export type TopicsList500 = InternalError;
export const TopicsList500 = InternalError;
export type TopicsList504 = GatewayTimeoutError;
export const TopicsList504 = GatewayTimeoutError;
export type TopicsCreateRequestJson = {
  readonly name: string;
  readonly description?: string | null;
  readonly namespaceId?: NamespaceId | null;
  readonly default?: "opt_out" | "opt_in" | null;
  readonly defaultSenderId?: EmailSenderId | null;
  readonly replyMailboxId?: MailboxId | null;
  readonly templateId?: TemplateId | null;
};
export const TopicsCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
    description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
    default: Schema.optionalKey(
      Schema.Union([
        Schema.Union([Schema.Literal("opt_out"), Schema.Literal("opt_in")]),
        Schema.Null,
      ]),
    ),
    defaultSenderId: Schema.optionalKey(Schema.Union([EmailSenderId, Schema.Null])),
    replyMailboxId: Schema.optionalKey(Schema.Union([MailboxId, Schema.Null])),
    templateId: Schema.optionalKey(Schema.Union([TemplateId, Schema.Null])),
  }))();
export type TopicsCreate201 = Topic;
export const TopicsCreate201 = Topic;
export type TopicsCreate401 = UnauthorizedError;
export const TopicsCreate401 = UnauthorizedError;
export type TopicsCreate403 = ForbiddenError;
export const TopicsCreate403 = ForbiddenError;
export type TopicsCreate404 = ResourceNotFoundError;
export const TopicsCreate404 = ResourceNotFoundError;
export type TopicsCreate409 = ConflictError;
export const TopicsCreate409 = ConflictError;
export type TopicsCreate422 = ValidationError;
export const TopicsCreate422 = ValidationError;
export type TopicsCreate500 = InternalError;
export const TopicsCreate500 = InternalError;
export type TopicsCreate504 = GatewayTimeoutError;
export const TopicsCreate504 = GatewayTimeoutError;
export type TopicsGetPathParams = { readonly id: TopicId };
export const TopicsGetPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: TopicId }))();
export type TopicsGet200 = Topic;
export const TopicsGet200 = Topic;
export type TopicsGet401 = UnauthorizedError;
export const TopicsGet401 = UnauthorizedError;
export type TopicsGet403 = ForbiddenError;
export const TopicsGet403 = ForbiddenError;
export type TopicsGet404 = ResourceNotFoundError;
export const TopicsGet404 = ResourceNotFoundError;
export type TopicsGet422 = ValidationError;
export const TopicsGet422 = ValidationError;
export type TopicsGet500 = InternalError;
export const TopicsGet500 = InternalError;
export type TopicsGet504 = GatewayTimeoutError;
export const TopicsGet504 = GatewayTimeoutError;
export type TopicsRemovePathParams = { readonly id: TopicId };
export const TopicsRemovePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: TopicId }))();
export type TopicsRemove200 = { readonly success: boolean };
export const TopicsRemove200 = /* @__PURE__ */ (() => Schema.Struct({ success: Schema.Boolean }))();
export type TopicsRemove401 = UnauthorizedError;
export const TopicsRemove401 = UnauthorizedError;
export type TopicsRemove403 = ForbiddenError;
export const TopicsRemove403 = ForbiddenError;
export type TopicsRemove404 = ResourceNotFoundError;
export const TopicsRemove404 = ResourceNotFoundError;
export type TopicsRemove409 = ConflictError;
export const TopicsRemove409 = ConflictError;
export type TopicsRemove422 = ValidationError;
export const TopicsRemove422 = ValidationError;
export type TopicsRemove500 = InternalError;
export const TopicsRemove500 = InternalError;
export type TopicsRemove504 = GatewayTimeoutError;
export const TopicsRemove504 = GatewayTimeoutError;
export type TopicsUpdatePathParams = { readonly id: TopicId };
export const TopicsUpdatePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: TopicId }))();
export type TopicsUpdateRequestJson = {
  readonly name?: string | null;
  readonly description?: string | null;
  readonly default?: "opt_out" | "opt_in" | null;
  readonly defaultSenderId?: EmailSenderId | null;
  readonly replyMailboxId?: MailboxId | null;
  readonly templateId?: TemplateId | null;
};
export const TopicsUpdateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        ),
        Schema.Null,
      ]),
    ),
    description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    default: Schema.optionalKey(
      Schema.Union([
        Schema.Union([Schema.Literal("opt_out"), Schema.Literal("opt_in")]),
        Schema.Null,
      ]),
    ),
    defaultSenderId: Schema.optionalKey(Schema.Union([EmailSenderId, Schema.Null])),
    replyMailboxId: Schema.optionalKey(Schema.Union([MailboxId, Schema.Null])),
    templateId: Schema.optionalKey(Schema.Union([TemplateId, Schema.Null])),
  }))();
export type TopicsUpdate200 = Topic;
export const TopicsUpdate200 = Topic;
export type TopicsUpdate401 = UnauthorizedError;
export const TopicsUpdate401 = UnauthorizedError;
export type TopicsUpdate403 = ForbiddenError;
export const TopicsUpdate403 = ForbiddenError;
export type TopicsUpdate404 = ResourceNotFoundError;
export const TopicsUpdate404 = ResourceNotFoundError;
export type TopicsUpdate409 = ConflictError;
export const TopicsUpdate409 = ConflictError;
export type TopicsUpdate422 = ValidationError;
export const TopicsUpdate422 = ValidationError;
export type TopicsUpdate500 = InternalError;
export const TopicsUpdate500 = InternalError;
export type TopicsUpdate504 = GatewayTimeoutError;
export const TopicsUpdate504 = GatewayTimeoutError;
export type TopicsSetDefaultPathParams = { readonly id: TopicId };
export const TopicsSetDefaultPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: TopicId }))();
export type TopicsSetDefault200 = Topic;
export const TopicsSetDefault200 = Topic;
export type TopicsSetDefault401 = UnauthorizedError;
export const TopicsSetDefault401 = UnauthorizedError;
export type TopicsSetDefault403 = ForbiddenError;
export const TopicsSetDefault403 = ForbiddenError;
export type TopicsSetDefault404 = ResourceNotFoundError;
export const TopicsSetDefault404 = ResourceNotFoundError;
export type TopicsSetDefault422 = ValidationError;
export const TopicsSetDefault422 = ValidationError;
export type TopicsSetDefault500 = InternalError;
export const TopicsSetDefault500 = InternalError;
export type TopicsSetDefault504 = GatewayTimeoutError;
export const TopicsSetDefault504 = GatewayTimeoutError;
export type TopicsListSubscriptionsPathParams = { readonly id: TopicId };
export const TopicsListSubscriptionsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TopicId }))();
export type TopicsListSubscriptionsQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
  readonly channel?: "email" | null;
  readonly status?: "subscribed" | "unsubscribed" | null;
};
export const TopicsListSubscriptionsQuery = /* @__PURE__ */ (() =>
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
    channel: Schema.optionalKey(Schema.Union([Schema.Literal("email"), Schema.Null])),
    status: Schema.optionalKey(
      Schema.Union([
        Schema.Union([Schema.Literal("subscribed"), Schema.Literal("unsubscribed")]),
        Schema.Null,
      ]),
    ),
  }))();
export type TopicsListSubscriptions200 = TopicSubscriptionPage;
export const TopicsListSubscriptions200 = TopicSubscriptionPage;
export type TopicsListSubscriptions401 = UnauthorizedError;
export const TopicsListSubscriptions401 = UnauthorizedError;
export type TopicsListSubscriptions403 = ForbiddenError;
export const TopicsListSubscriptions403 = ForbiddenError;
export type TopicsListSubscriptions404 = ResourceNotFoundError;
export const TopicsListSubscriptions404 = ResourceNotFoundError;
export type TopicsListSubscriptions422 = ValidationError;
export const TopicsListSubscriptions422 = ValidationError;
export type TopicsListSubscriptions500 = InternalError;
export const TopicsListSubscriptions500 = InternalError;
export type TopicsListSubscriptions504 = GatewayTimeoutError;
export const TopicsListSubscriptions504 = GatewayTimeoutError;
export type TopicsSetSubscriptionsPathParams = { readonly id: TopicId };
export const TopicsSetSubscriptionsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TopicId }))();
export type TopicsSetSubscriptionsRequestJson = {
  readonly contacts: ReadonlyArray<TopicContactRef>;
  readonly channel: "email";
  readonly status: "subscribed" | "unsubscribed";
  readonly source?: string | null;
};
export const TopicsSetSubscriptionsRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    contacts: Schema.Array(TopicContactRef)
      .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
      .check(
        Schema.isMaxLength(1000).annotate({ expected: "a value with a length of at most 1000" }),
      ),
    channel: Schema.Literal("email"),
    status: Schema.Union([Schema.Literal("subscribed"), Schema.Literal("unsubscribed")]),
    source: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        )
          .check(
            Schema.isMaxCodePoints(512).annotate({
              expected: "a string with at most 512 code points",
            }),
          )
          .check(
            Schema.isMaxLength(512).annotate({ expected: "a value with a length of at most 512" }),
          ),
        Schema.Null,
      ]),
    ),
  }))();
export type TopicsSetSubscriptions200 = TopicSetSubscriptionsResult;
export const TopicsSetSubscriptions200 = TopicSetSubscriptionsResult;
export type TopicsSetSubscriptions401 = UnauthorizedError;
export const TopicsSetSubscriptions401 = UnauthorizedError;
export type TopicsSetSubscriptions402 = PaymentRequiredError;
export const TopicsSetSubscriptions402 = PaymentRequiredError;
export type TopicsSetSubscriptions403 = ForbiddenError;
export const TopicsSetSubscriptions403 = ForbiddenError;
export type TopicsSetSubscriptions404 = ResourceNotFoundError;
export const TopicsSetSubscriptions404 = ResourceNotFoundError;
export type TopicsSetSubscriptions422 = ValidationError;
export const TopicsSetSubscriptions422 = ValidationError;
export type TopicsSetSubscriptions500 = InternalError;
export const TopicsSetSubscriptions500 = InternalError;
export type TopicsSetSubscriptions502 = BillingProviderError;
export const TopicsSetSubscriptions502 = BillingProviderError;
export type TopicsSetSubscriptions504 = GatewayTimeoutError;
export const TopicsSetSubscriptions504 = GatewayTimeoutError;
export type TopicsCheckSubscriptionQuery = {
  readonly contactId?: ContactId | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly namespaceId?: NamespaceId | null;
  readonly channel: "email";
  readonly topicIds?: string | null;
};
export const TopicsCheckSubscriptionQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    contactId: Schema.optionalKey(Schema.Union([ContactId, Schema.Null])),
    email: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    phone: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
    channel: Schema.Literal("email"),
    topicIds: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type TopicsCheckSubscription200 = TopicSubscriptionCheck;
export const TopicsCheckSubscription200 = TopicSubscriptionCheck;
export type TopicsCheckSubscription401 = UnauthorizedError;
export const TopicsCheckSubscription401 = UnauthorizedError;
export type TopicsCheckSubscription403 = ForbiddenError;
export const TopicsCheckSubscription403 = ForbiddenError;
export type TopicsCheckSubscription404 = ResourceNotFoundError;
export const TopicsCheckSubscription404 = ResourceNotFoundError;
export type TopicsCheckSubscription422 = ValidationError;
export const TopicsCheckSubscription422 = ValidationError;
export type TopicsCheckSubscription500 = InternalError;
export const TopicsCheckSubscription500 = InternalError;
export type TopicsCheckSubscription504 = GatewayTimeoutError;
export const TopicsCheckSubscription504 = GatewayTimeoutError;

export class TopicsGroup extends HttpApiGroup.make("Topics")
  .add(
    HttpApiEndpoint.get("topicsList", "/v1/topics", {
      query: TopicsListQuery,
      success: TopicsList200,
      error: [
        TopicsList401.pipe(HttpApiSchema.status(401)),
        TopicsList403.pipe(HttpApiSchema.status(403)),
        TopicsList422.pipe(HttpApiSchema.status(422)),
        TopicsList500,
        TopicsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topics.list")
      .annotate(OpenApi.Summary, "List topics")
      .annotate(
        OpenApi.Description,
        "Lists visible topics, default first then by name. The organization holds at most 200 topics, so the list is bounded and unpaged.",
      ),
    HttpApiEndpoint.post("topicsCreate", "/v1/topics", {
      payload: TopicsCreateRequestJson,
      success: TopicsCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        TopicsCreate401.pipe(HttpApiSchema.status(401)),
        TopicsCreate403.pipe(HttpApiSchema.status(403)),
        TopicsCreate404.pipe(HttpApiSchema.status(404)),
        TopicsCreate409.pipe(HttpApiSchema.status(409)),
        TopicsCreate422.pipe(HttpApiSchema.status(422)),
        TopicsCreate500,
        TopicsCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topics.create")
      .annotate(OpenApi.Summary, "Create a topic")
      .annotate(
        OpenApi.Description,
        "Creates a topic in the caller's or requested namespace. The subscription default is opt_out when omitted. Sending defaults must be compatible with that namespace. An organization holds at most 200 topics.",
      ),
    HttpApiEndpoint.get("topicsGet", "/v1/topics/:id", {
      params: TopicsGetPathParams,
      success: TopicsGet200,
      error: [
        TopicsGet401.pipe(HttpApiSchema.status(401)),
        TopicsGet403.pipe(HttpApiSchema.status(403)),
        TopicsGet404.pipe(HttpApiSchema.status(404)),
        TopicsGet422.pipe(HttpApiSchema.status(422)),
        TopicsGet500,
        TopicsGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topics.get")
      .annotate(OpenApi.Summary, "Get a topic")
      .annotate(
        OpenApi.Description,
        "Returns a visible topic, its sending defaults, and explicit subscription counts by channel and status. Individual subscriptions are read through listSubscriptions.",
      ),
    HttpApiEndpoint.delete("topicsRemove", "/v1/topics/:id", {
      params: TopicsRemovePathParams,
      success: TopicsRemove200,
      error: [
        TopicsRemove401.pipe(HttpApiSchema.status(401)),
        TopicsRemove403.pipe(HttpApiSchema.status(403)),
        TopicsRemove404.pipe(HttpApiSchema.status(404)),
        TopicsRemove409.pipe(HttpApiSchema.status(409)),
        TopicsRemove422.pipe(HttpApiSchema.status(422)),
        TopicsRemove500,
        TopicsRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topics.remove")
      .annotate(OpenApi.Summary, "Delete a topic")
      .annotate(
        OpenApi.Description,
        "Refuses the default topic and any topic a scheduled or running campaign uses.",
      ),
    HttpApiEndpoint.patch("topicsUpdate", "/v1/topics/:id", {
      params: TopicsUpdatePathParams,
      payload: TopicsUpdateRequestJson,
      success: TopicsUpdate200,
      error: [
        TopicsUpdate401.pipe(HttpApiSchema.status(401)),
        TopicsUpdate403.pipe(HttpApiSchema.status(403)),
        TopicsUpdate404.pipe(HttpApiSchema.status(404)),
        TopicsUpdate409.pipe(HttpApiSchema.status(409)),
        TopicsUpdate422.pipe(HttpApiSchema.status(422)),
        TopicsUpdate500,
        TopicsUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topics.update")
      .annotate(OpenApi.Summary, "Update a topic")
      .annotate(
        OpenApi.Description,
        "Updates named fields. Changing the default does not change any explicit subscription status. Null clears a sending default.",
      ),
    HttpApiEndpoint.post("topicsSetDefault", "/v1/topics/:id/default", {
      params: TopicsSetDefaultPathParams,
      success: TopicsSetDefault200,
      error: [
        TopicsSetDefault401.pipe(HttpApiSchema.status(401)),
        TopicsSetDefault403.pipe(HttpApiSchema.status(403)),
        TopicsSetDefault404.pipe(HttpApiSchema.status(404)),
        TopicsSetDefault422.pipe(HttpApiSchema.status(422)),
        TopicsSetDefault500,
        TopicsSetDefault504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topics.setDefault")
      .annotate(OpenApi.Summary, "Make a topic the default")
      .annotate(
        OpenApi.Description,
        "Makes this the default category of messages in its namespace. Existing explicit subscription statuses remain unchanged.",
      ),
    HttpApiEndpoint.get("topicsListSubscriptions", "/v1/topics/:id/subscriptions", {
      params: TopicsListSubscriptionsPathParams,
      query: TopicsListSubscriptionsQuery,
      success: TopicsListSubscriptions200,
      error: [
        TopicsListSubscriptions401.pipe(HttpApiSchema.status(401)),
        TopicsListSubscriptions403.pipe(HttpApiSchema.status(403)),
        TopicsListSubscriptions404.pipe(HttpApiSchema.status(404)),
        TopicsListSubscriptions422.pipe(HttpApiSchema.status(422)),
        TopicsListSubscriptions500,
        TopicsListSubscriptions504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topics.listSubscriptions")
      .annotate(OpenApi.Summary, "List topic subscriptions")
      .annotate(
        OpenApi.Description,
        "Returns explicit per-channel subscriptions, newest first, optionally filtered by channel and status. Pass nextCursor as cursor to continue; nextCursor is null on the last page. Contacts without an explicit subscription are absent from this list.",
      ),
    HttpApiEndpoint.post("topicsSetSubscriptions", "/v1/topics/:id/subscriptions", {
      params: TopicsSetSubscriptionsPathParams,
      payload: TopicsSetSubscriptionsRequestJson,
      success: TopicsSetSubscriptions200,
      error: [
        TopicsSetSubscriptions401.pipe(HttpApiSchema.status(401)),
        TopicsSetSubscriptions402.pipe(HttpApiSchema.status(402)),
        TopicsSetSubscriptions403.pipe(HttpApiSchema.status(403)),
        TopicsSetSubscriptions404.pipe(HttpApiSchema.status(404)),
        TopicsSetSubscriptions422.pipe(HttpApiSchema.status(422)),
        TopicsSetSubscriptions500,
        TopicsSetSubscriptions502.pipe(HttpApiSchema.status(502)),
        TopicsSetSubscriptions504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topics.setSubscriptions")
      .annotate(OpenApi.Summary, "Set topic subscriptions")
      .annotate(
        OpenApi.Description,
        "Upserts explicit subscribed or unsubscribed status for one channel. Each contact is named by ID, email, or phone. New addresses create contacts in the topic's namespace. Repeating the same status is idempotent.",
      ),
    HttpApiEndpoint.get("topicsCheckSubscription", "/v1/topics/check", {
      query: TopicsCheckSubscriptionQuery,
      success: TopicsCheckSubscription200,
      error: [
        TopicsCheckSubscription401.pipe(HttpApiSchema.status(401)),
        TopicsCheckSubscription403.pipe(HttpApiSchema.status(403)),
        TopicsCheckSubscription404.pipe(HttpApiSchema.status(404)),
        TopicsCheckSubscription422.pipe(HttpApiSchema.status(422)),
        TopicsCheckSubscription500,
        TopicsCheckSubscription504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topics.checkSubscription")
      .annotate(OpenApi.Summary, "Check topic subscriptions")
      .annotate(
        OpenApi.Description,
        "Name exactly one contactId, email, or phone and a channel. Returns effective status, using the topic default when no explicit subscription exists. topicIds is an optional comma-separated list. Addresses resolve within the requested namespace; an unknown address returns contactId null and the effective defaults.",
      ),
  )
  .annotate(OpenApi.Description, "Topics and per-channel contact subscriptions") {}
