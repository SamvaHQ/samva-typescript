// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  ContactId,
  ConversationId,
  Cursor,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  JsonObject,
  JsonValue,
  MessagePage,
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type UnknownRecord = { readonly [x: string]: JsonValue };
export const UnknownRecord = /* @__PURE__ */ Schema.Record(Schema.String, JsonValue).annotate({
  identifier: "UnknownRecord",
});
export type ConversationSummary = {
  readonly id: ConversationId;
  readonly title: string | null;
  readonly externalId: string | null;
  readonly status: "active" | "waiting" | "resolved" | "escalated" | "archived";
  readonly primaryChannel: "email";
  readonly channels: ReadonlyArray<"email">;
  readonly priority: number;
  readonly urgency: "low" | "medium" | "high" | "critical";
  readonly tags: ReadonlyArray<string>;
  readonly isTest: boolean;
  readonly messageCount: number;
  readonly lastActivityAt: string;
  readonly createdAt: string;
};
export const ConversationSummary = /* @__PURE__ */ Schema.Struct({
  id: ConversationId,
  title: Schema.Union([Schema.String, Schema.Null]),
  externalId: Schema.Union([Schema.String, Schema.Null]),
  status: Schema.Union([
    Schema.Literal("active"),
    Schema.Literal("waiting"),
    Schema.Literal("resolved"),
    Schema.Literal("escalated"),
    Schema.Literal("archived"),
  ]),
  primaryChannel: Schema.Literal("email"),
  channels: Schema.Array(Schema.Literal("email")),
  priority: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    )
    .check(
      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
        expected: "a value less than or equal to 9007199254740991",
      }),
    ),
  urgency: Schema.Union([
    Schema.Literal("low"),
    Schema.Literal("medium"),
    Schema.Literal("high"),
    Schema.Literal("critical"),
  ]),
  tags: Schema.Array(Schema.String),
  isTest: Schema.Boolean,
  messageCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    )
    .check(
      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
        expected: "a value less than or equal to 9007199254740991",
      }),
    ),
  lastActivityAt: Schema.String,
  createdAt: Schema.String,
}).annotate({ identifier: "ConversationSummary" });
export type ConversationContact = {
  readonly id: ContactId;
  readonly name: string;
  readonly displayName: string | null;
  readonly identities: ReadonlyArray<{
    readonly type: "email" | "phone";
    readonly identifier: string;
    readonly verified: boolean;
  }>;
};
export const ConversationContact = /* @__PURE__ */ Schema.Struct({
  id: ContactId,
  name: Schema.String,
  displayName: Schema.Union([Schema.String, Schema.Null]),
  identities: Schema.Array(
    Schema.Struct({
      type: Schema.Union([Schema.Literal("email"), Schema.Literal("phone")]),
      identifier: Schema.String,
      verified: Schema.Boolean,
    }),
  ),
}).annotate({ identifier: "ConversationContact" });
export type ConversationContext = {
  readonly customerData?: UnknownRecord | null;
  readonly previousConversations?: ReadonlyArray<string> | null;
  readonly sessionVariables?: UnknownRecord | null;
  readonly workflowState?: {
    readonly currentStep?: string | null;
    readonly completedSteps?: ReadonlyArray<string> | null;
    readonly pendingSteps?: ReadonlyArray<string> | null;
    readonly workflowData?: UnknownRecord | null;
  } | null;
};
export const ConversationContext = /* @__PURE__ */ Schema.Struct({
  customerData: Schema.optionalKey(Schema.Union([UnknownRecord, Schema.Null])),
  previousConversations: Schema.optionalKey(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  sessionVariables: Schema.optionalKey(Schema.Union([UnknownRecord, Schema.Null])),
  workflowState: Schema.optionalKey(
    Schema.Union([
      Schema.Struct({
        currentStep: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        completedSteps: Schema.optionalKey(
          Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        ),
        pendingSteps: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
        workflowData: Schema.optionalKey(Schema.Union([UnknownRecord, Schema.Null])),
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "ConversationContext" });
export type ConversationPage = {
  readonly items: ReadonlyArray<ConversationSummary>;
  readonly nextCursor: string | null;
};
export const ConversationPage = /* @__PURE__ */ Schema.Struct({
  items: Schema.Array(ConversationSummary),
  nextCursor: Schema.Union([Schema.String, Schema.Null]),
}).annotate({ identifier: "ConversationPage" });
export type Conversation = {
  readonly id: ConversationId;
  readonly title: string | null;
  readonly externalId: string | null;
  readonly status: "active" | "waiting" | "resolved" | "escalated" | "archived";
  readonly primaryChannel: "email";
  readonly channels: ReadonlyArray<"email">;
  readonly priority: number;
  readonly urgency: "low" | "medium" | "high" | "critical";
  readonly tags: ReadonlyArray<string>;
  readonly isTest: boolean;
  readonly messageCount: number;
  readonly lastActivityAt: string;
  readonly createdAt: string;
  readonly description: string | null;
  readonly parentConversationId: ConversationId | null;
  readonly statusReason: string | null;
  readonly complexity: "simple" | "moderate" | "complex";
  readonly categories: ReadonlyArray<string>;
  readonly metadata: JsonObject | null;
  readonly context: ConversationContext | null;
  readonly isInternal: boolean;
  readonly isPrivate: boolean;
  readonly contacts: ReadonlyArray<ConversationContact>;
  readonly startedAt: string;
  readonly lastHumanActivityAt: string | null;
  readonly resolvedAt: string | null;
  readonly archivedAt: string | null;
  readonly resolutionType:
    | "automated"
    | "human_assisted"
    | "escalated"
    | "abandoned"
    | "timeout"
    | null;
  readonly resolutionNotes: string | null;
  readonly updatedAt: string;
};
export const Conversation = /* @__PURE__ */ Schema.Struct({
  id: ConversationId,
  title: Schema.Union([Schema.String, Schema.Null]),
  externalId: Schema.Union([Schema.String, Schema.Null]),
  status: Schema.Union([
    Schema.Literal("active"),
    Schema.Literal("waiting"),
    Schema.Literal("resolved"),
    Schema.Literal("escalated"),
    Schema.Literal("archived"),
  ]),
  primaryChannel: Schema.Literal("email"),
  channels: Schema.Array(Schema.Literal("email")),
  priority: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    )
    .check(
      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
        expected: "a value less than or equal to 9007199254740991",
      }),
    ),
  urgency: Schema.Union([
    Schema.Literal("low"),
    Schema.Literal("medium"),
    Schema.Literal("high"),
    Schema.Literal("critical"),
  ]),
  tags: Schema.Array(Schema.String),
  isTest: Schema.Boolean,
  messageCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    )
    .check(
      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
        expected: "a value less than or equal to 9007199254740991",
      }),
    ),
  lastActivityAt: Schema.String,
  createdAt: Schema.String,
  description: Schema.Union([Schema.String, Schema.Null]),
  parentConversationId: Schema.Union([ConversationId, Schema.Null]),
  statusReason: Schema.Union([Schema.String, Schema.Null]),
  complexity: Schema.Union([
    Schema.Literal("simple"),
    Schema.Literal("moderate"),
    Schema.Literal("complex"),
  ]),
  categories: Schema.Array(Schema.String),
  metadata: Schema.Union([JsonObject, Schema.Null]),
  context: Schema.Union([ConversationContext, Schema.Null]),
  isInternal: Schema.Boolean,
  isPrivate: Schema.Boolean,
  contacts: Schema.Array(ConversationContact),
  startedAt: Schema.String,
  lastHumanActivityAt: Schema.Union([Schema.String, Schema.Null]),
  resolvedAt: Schema.Union([Schema.String, Schema.Null]),
  archivedAt: Schema.Union([Schema.String, Schema.Null]),
  resolutionType: Schema.Union([
    Schema.Union([
      Schema.Literal("automated"),
      Schema.Literal("human_assisted"),
      Schema.Literal("escalated"),
      Schema.Literal("abandoned"),
      Schema.Literal("timeout"),
    ]),
    Schema.Null,
  ]),
  resolutionNotes: Schema.Union([Schema.String, Schema.Null]),
  updatedAt: Schema.String,
}).annotate({ identifier: "Conversation" });
export type ConversationsListQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
  readonly status?: "active" | "waiting" | "resolved" | "escalated" | "archived" | null;
  readonly channel?: "email" | null;
  readonly contactId?: ContactId | null;
  readonly after?: string | null;
  readonly before?: string | null;
};
export const ConversationsListQuery = /* @__PURE__ */ Schema.Struct({
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
        Schema.Literal("active"),
        Schema.Literal("waiting"),
        Schema.Literal("resolved"),
        Schema.Literal("escalated"),
        Schema.Literal("archived"),
      ]),
      Schema.Null,
    ]),
  ),
  channel: Schema.optionalKey(Schema.Union([Schema.Literal("email"), Schema.Null])),
  contactId: Schema.optionalKey(Schema.Union([ContactId, Schema.Null])),
  after: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  before: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
});
export type ConversationsList200 = ConversationPage;
export const ConversationsList200 = ConversationPage;
export type ConversationsList401 = UnauthorizedError;
export const ConversationsList401 = UnauthorizedError;
export type ConversationsList403 = ForbiddenError;
export const ConversationsList403 = ForbiddenError;
export type ConversationsList422 = ValidationError;
export const ConversationsList422 = ValidationError;
export type ConversationsList500 = InternalError;
export const ConversationsList500 = InternalError;
export type ConversationsList504 = GatewayTimeoutError;
export const ConversationsList504 = GatewayTimeoutError;
export type ConversationsCreateRequestJson = {
  readonly title?: string | null;
  readonly description?: string | null;
  readonly externalId?: string | null;
  readonly parentConversationId?: ConversationId | null;
  readonly channels: ReadonlyArray<"email">;
  readonly primaryChannel: "email";
  readonly status?: "active" | "waiting" | "resolved" | "escalated" | "archived" | null;
  readonly statusReason?: string | null;
  readonly priority?: number | null;
  readonly urgency?: "low" | "medium" | "high" | "critical" | null;
  readonly complexity?: "simple" | "moderate" | "complex" | null;
  readonly metadata?: JsonObject | null;
  readonly context?: ConversationContext | null | null;
  readonly tags?: ReadonlyArray<string> | null;
  readonly categories?: ReadonlyArray<string> | null;
  readonly isTest?: boolean | null;
  readonly isInternal?: boolean | null;
  readonly isPrivate?: boolean | null;
};
export const ConversationsCreateRequestJson = /* @__PURE__ */ Schema.Struct({
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  externalId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  parentConversationId: Schema.optionalKey(Schema.Union([ConversationId, Schema.Null])),
  channels: Schema.Array(Schema.Literal("email")),
  primaryChannel: Schema.Literal("email"),
  status: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.Literal("active"),
        Schema.Literal("waiting"),
        Schema.Literal("resolved"),
        Schema.Literal("escalated"),
        Schema.Literal("archived"),
      ]),
      Schema.Null,
    ]),
  ),
  statusReason: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  priority: Schema.optionalKey(
    Schema.Union([
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
  ),
  urgency: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.Literal("low"),
        Schema.Literal("medium"),
        Schema.Literal("high"),
        Schema.Literal("critical"),
      ]),
      Schema.Null,
    ]),
  ),
  complexity: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.Literal("simple"),
        Schema.Literal("moderate"),
        Schema.Literal("complex"),
      ]),
      Schema.Null,
    ]),
  ),
  metadata: Schema.optionalKey(Schema.Union([JsonObject, Schema.Null])),
  context: Schema.optionalKey(
    Schema.Union([Schema.Union([ConversationContext, Schema.Null]), Schema.Null]),
  ),
  tags: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  categories: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  isTest: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  isInternal: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  isPrivate: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
});
export type ConversationsCreate201 = Conversation;
export const ConversationsCreate201 = Conversation;
export type ConversationsCreate401 = UnauthorizedError;
export const ConversationsCreate401 = UnauthorizedError;
export type ConversationsCreate403 = ForbiddenError;
export const ConversationsCreate403 = ForbiddenError;
export type ConversationsCreate422 = ValidationError;
export const ConversationsCreate422 = ValidationError;
export type ConversationsCreate500 = InternalError;
export const ConversationsCreate500 = InternalError;
export type ConversationsCreate504 = GatewayTimeoutError;
export const ConversationsCreate504 = GatewayTimeoutError;
export type ConversationsGetByIdPathParams = { readonly id: ConversationId };
export const ConversationsGetByIdPathParams = /* @__PURE__ */ Schema.Struct({ id: ConversationId });
export type ConversationsGetById200 = Conversation;
export const ConversationsGetById200 = Conversation;
export type ConversationsGetById401 = UnauthorizedError;
export const ConversationsGetById401 = UnauthorizedError;
export type ConversationsGetById403 = ForbiddenError;
export const ConversationsGetById403 = ForbiddenError;
export type ConversationsGetById404 = ResourceNotFoundError;
export const ConversationsGetById404 = ResourceNotFoundError;
export type ConversationsGetById422 = ValidationError;
export const ConversationsGetById422 = ValidationError;
export type ConversationsGetById500 = InternalError;
export const ConversationsGetById500 = InternalError;
export type ConversationsGetById504 = GatewayTimeoutError;
export const ConversationsGetById504 = GatewayTimeoutError;
export type ConversationsUpdatePathParams = { readonly id: ConversationId };
export const ConversationsUpdatePathParams = /* @__PURE__ */ Schema.Struct({ id: ConversationId });
export type ConversationsUpdateRequestJson = {
  readonly title?: string | null;
  readonly description?: string | null | null;
  readonly externalId?: string | null | null;
  readonly parentConversationId?: ConversationId | null | null;
  readonly primaryChannel?: "email" | null;
  readonly status?: "active" | "waiting" | "resolved" | "escalated" | "archived" | null;
  readonly statusReason?: string | null | null;
  readonly priority?: number | null;
  readonly urgency?: "low" | "medium" | "high" | "critical" | null;
  readonly complexity?: "simple" | "moderate" | "complex" | null;
  readonly context?: ConversationContext | null | null;
  readonly metadata?: JsonObject | null;
  readonly isTest?: boolean | null;
  readonly isInternal?: boolean | null;
  readonly isPrivate?: boolean | null;
};
export const ConversationsUpdateRequestJson = /* @__PURE__ */ Schema.Struct({
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null]),
  ),
  externalId: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null]),
  ),
  parentConversationId: Schema.optionalKey(
    Schema.Union([Schema.Union([ConversationId, Schema.Null]), Schema.Null]),
  ),
  primaryChannel: Schema.optionalKey(Schema.Union([Schema.Literal("email"), Schema.Null])),
  status: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.Literal("active"),
        Schema.Literal("waiting"),
        Schema.Literal("resolved"),
        Schema.Literal("escalated"),
        Schema.Literal("archived"),
      ]),
      Schema.Null,
    ]),
  ),
  statusReason: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null]),
  ),
  priority: Schema.optionalKey(
    Schema.Union([
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
  ),
  urgency: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.Literal("low"),
        Schema.Literal("medium"),
        Schema.Literal("high"),
        Schema.Literal("critical"),
      ]),
      Schema.Null,
    ]),
  ),
  complexity: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.Literal("simple"),
        Schema.Literal("moderate"),
        Schema.Literal("complex"),
      ]),
      Schema.Null,
    ]),
  ),
  context: Schema.optionalKey(
    Schema.Union([Schema.Union([ConversationContext, Schema.Null]), Schema.Null]),
  ),
  metadata: Schema.optionalKey(Schema.Union([JsonObject, Schema.Null])),
  isTest: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  isInternal: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  isPrivate: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
});
export type ConversationsUpdate200 = Conversation;
export const ConversationsUpdate200 = Conversation;
export type ConversationsUpdate401 = UnauthorizedError;
export const ConversationsUpdate401 = UnauthorizedError;
export type ConversationsUpdate403 = ForbiddenError;
export const ConversationsUpdate403 = ForbiddenError;
export type ConversationsUpdate404 = ResourceNotFoundError;
export const ConversationsUpdate404 = ResourceNotFoundError;
export type ConversationsUpdate422 = ValidationError;
export const ConversationsUpdate422 = ValidationError;
export type ConversationsUpdate500 = InternalError;
export const ConversationsUpdate500 = InternalError;
export type ConversationsUpdate504 = GatewayTimeoutError;
export const ConversationsUpdate504 = GatewayTimeoutError;
export type ConversationsAddCategoriesPathParams = { readonly id: ConversationId };
export const ConversationsAddCategoriesPathParams = /* @__PURE__ */ Schema.Struct({
  id: ConversationId,
});
export type ConversationsAddCategoriesRequestJson = {
  readonly categories: readonly [string, ...Array<string>];
};
export const ConversationsAddCategoriesRequestJson = /* @__PURE__ */ Schema.Struct({
  categories: Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]),
});
export type ConversationsAddCategories200 = Conversation;
export const ConversationsAddCategories200 = Conversation;
export type ConversationsAddCategories401 = UnauthorizedError;
export const ConversationsAddCategories401 = UnauthorizedError;
export type ConversationsAddCategories403 = ForbiddenError;
export const ConversationsAddCategories403 = ForbiddenError;
export type ConversationsAddCategories404 = ResourceNotFoundError;
export const ConversationsAddCategories404 = ResourceNotFoundError;
export type ConversationsAddCategories422 = ValidationError;
export const ConversationsAddCategories422 = ValidationError;
export type ConversationsAddCategories500 = InternalError;
export const ConversationsAddCategories500 = InternalError;
export type ConversationsAddCategories504 = GatewayTimeoutError;
export const ConversationsAddCategories504 = GatewayTimeoutError;
export type ConversationsRemoveCategoriesPathParams = { readonly id: ConversationId };
export const ConversationsRemoveCategoriesPathParams = /* @__PURE__ */ Schema.Struct({
  id: ConversationId,
});
export type ConversationsRemoveCategoriesRequestJson = {
  readonly categories: readonly [string, ...Array<string>];
};
export const ConversationsRemoveCategoriesRequestJson = /* @__PURE__ */ Schema.Struct({
  categories: Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]),
});
export type ConversationsRemoveCategories200 = Conversation;
export const ConversationsRemoveCategories200 = Conversation;
export type ConversationsRemoveCategories401 = UnauthorizedError;
export const ConversationsRemoveCategories401 = UnauthorizedError;
export type ConversationsRemoveCategories403 = ForbiddenError;
export const ConversationsRemoveCategories403 = ForbiddenError;
export type ConversationsRemoveCategories404 = ResourceNotFoundError;
export const ConversationsRemoveCategories404 = ResourceNotFoundError;
export type ConversationsRemoveCategories422 = ValidationError;
export const ConversationsRemoveCategories422 = ValidationError;
export type ConversationsRemoveCategories500 = InternalError;
export const ConversationsRemoveCategories500 = InternalError;
export type ConversationsRemoveCategories504 = GatewayTimeoutError;
export const ConversationsRemoveCategories504 = GatewayTimeoutError;
export type ConversationsAddChannelsPathParams = { readonly id: ConversationId };
export const ConversationsAddChannelsPathParams = /* @__PURE__ */ Schema.Struct({
  id: ConversationId,
});
export type ConversationsAddChannelsRequestJson = {
  readonly channels: readonly ["email", ...Array<"email">];
};
export const ConversationsAddChannelsRequestJson = /* @__PURE__ */ Schema.Struct({
  channels: Schema.TupleWithRest(Schema.Tuple([Schema.Literal("email")]), [
    Schema.Literal("email"),
  ]),
});
export type ConversationsAddChannels200 = Conversation;
export const ConversationsAddChannels200 = Conversation;
export type ConversationsAddChannels401 = UnauthorizedError;
export const ConversationsAddChannels401 = UnauthorizedError;
export type ConversationsAddChannels403 = ForbiddenError;
export const ConversationsAddChannels403 = ForbiddenError;
export type ConversationsAddChannels404 = ResourceNotFoundError;
export const ConversationsAddChannels404 = ResourceNotFoundError;
export type ConversationsAddChannels422 = ValidationError;
export const ConversationsAddChannels422 = ValidationError;
export type ConversationsAddChannels500 = InternalError;
export const ConversationsAddChannels500 = InternalError;
export type ConversationsAddChannels504 = GatewayTimeoutError;
export const ConversationsAddChannels504 = GatewayTimeoutError;
export type ConversationsRemoveChannelsPathParams = { readonly id: ConversationId };
export const ConversationsRemoveChannelsPathParams = /* @__PURE__ */ Schema.Struct({
  id: ConversationId,
});
export type ConversationsRemoveChannelsRequestJson = {
  readonly channels: readonly ["email", ...Array<"email">];
};
export const ConversationsRemoveChannelsRequestJson = /* @__PURE__ */ Schema.Struct({
  channels: Schema.TupleWithRest(Schema.Tuple([Schema.Literal("email")]), [
    Schema.Literal("email"),
  ]),
});
export type ConversationsRemoveChannels200 = Conversation;
export const ConversationsRemoveChannels200 = Conversation;
export type ConversationsRemoveChannels401 = UnauthorizedError;
export const ConversationsRemoveChannels401 = UnauthorizedError;
export type ConversationsRemoveChannels403 = ForbiddenError;
export const ConversationsRemoveChannels403 = ForbiddenError;
export type ConversationsRemoveChannels404 = ResourceNotFoundError;
export const ConversationsRemoveChannels404 = ResourceNotFoundError;
export type ConversationsRemoveChannels422 = ValidationError;
export const ConversationsRemoveChannels422 = ValidationError;
export type ConversationsRemoveChannels500 = InternalError;
export const ConversationsRemoveChannels500 = InternalError;
export type ConversationsRemoveChannels504 = GatewayTimeoutError;
export const ConversationsRemoveChannels504 = GatewayTimeoutError;
export type ConversationsAddContactsPathParams = { readonly id: ConversationId };
export const ConversationsAddContactsPathParams = /* @__PURE__ */ Schema.Struct({
  id: ConversationId,
});
export type ConversationsAddContactsRequestJson = {
  readonly contactIds: readonly [ContactId, ...Array<ContactId>];
};
export const ConversationsAddContactsRequestJson = /* @__PURE__ */ Schema.Struct({
  contactIds: Schema.TupleWithRest(Schema.Tuple([ContactId]), [ContactId]).check(
    Schema.isMaxLength(1000).annotate({ expected: "a value with a length of at most 1000" }),
  ),
});
export type ConversationsAddContacts200 = Conversation;
export const ConversationsAddContacts200 = Conversation;
export type ConversationsAddContacts401 = UnauthorizedError;
export const ConversationsAddContacts401 = UnauthorizedError;
export type ConversationsAddContacts403 = ForbiddenError;
export const ConversationsAddContacts403 = ForbiddenError;
export type ConversationsAddContacts404 = ResourceNotFoundError;
export const ConversationsAddContacts404 = ResourceNotFoundError;
export type ConversationsAddContacts422 = ValidationError;
export const ConversationsAddContacts422 = ValidationError;
export type ConversationsAddContacts500 = InternalError;
export const ConversationsAddContacts500 = InternalError;
export type ConversationsAddContacts504 = GatewayTimeoutError;
export const ConversationsAddContacts504 = GatewayTimeoutError;
export type ConversationsRemoveContactsPathParams = { readonly id: ConversationId };
export const ConversationsRemoveContactsPathParams = /* @__PURE__ */ Schema.Struct({
  id: ConversationId,
});
export type ConversationsRemoveContactsRequestJson = {
  readonly contactIds: readonly [ContactId, ...Array<ContactId>];
};
export const ConversationsRemoveContactsRequestJson = /* @__PURE__ */ Schema.Struct({
  contactIds: Schema.TupleWithRest(Schema.Tuple([ContactId]), [ContactId]).check(
    Schema.isMaxLength(1000).annotate({ expected: "a value with a length of at most 1000" }),
  ),
});
export type ConversationsRemoveContacts200 = Conversation;
export const ConversationsRemoveContacts200 = Conversation;
export type ConversationsRemoveContacts401 = UnauthorizedError;
export const ConversationsRemoveContacts401 = UnauthorizedError;
export type ConversationsRemoveContacts403 = ForbiddenError;
export const ConversationsRemoveContacts403 = ForbiddenError;
export type ConversationsRemoveContacts404 = ResourceNotFoundError;
export const ConversationsRemoveContacts404 = ResourceNotFoundError;
export type ConversationsRemoveContacts422 = ValidationError;
export const ConversationsRemoveContacts422 = ValidationError;
export type ConversationsRemoveContacts500 = InternalError;
export const ConversationsRemoveContacts500 = InternalError;
export type ConversationsRemoveContacts504 = GatewayTimeoutError;
export const ConversationsRemoveContacts504 = GatewayTimeoutError;
export type ConversationsListMessagesPathParams = { readonly id: ConversationId };
export const ConversationsListMessagesPathParams = /* @__PURE__ */ Schema.Struct({
  id: ConversationId,
});
export type ConversationsListMessagesQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
  readonly after?: string | null;
  readonly before?: string | null;
};
export const ConversationsListMessagesQuery = /* @__PURE__ */ Schema.Struct({
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
  after: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  before: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
});
export type ConversationsListMessages200 = MessagePage;
export const ConversationsListMessages200 = MessagePage;
export type ConversationsListMessages401 = UnauthorizedError;
export const ConversationsListMessages401 = UnauthorizedError;
export type ConversationsListMessages403 = ForbiddenError;
export const ConversationsListMessages403 = ForbiddenError;
export type ConversationsListMessages404 = ResourceNotFoundError;
export const ConversationsListMessages404 = ResourceNotFoundError;
export type ConversationsListMessages422 = ValidationError;
export const ConversationsListMessages422 = ValidationError;
export type ConversationsListMessages500 = InternalError;
export const ConversationsListMessages500 = InternalError;
export type ConversationsListMessages504 = GatewayTimeoutError;
export const ConversationsListMessages504 = GatewayTimeoutError;
export type ConversationsAddTagsPathParams = { readonly id: ConversationId };
export const ConversationsAddTagsPathParams = /* @__PURE__ */ Schema.Struct({ id: ConversationId });
export type ConversationsAddTagsRequestJson = {
  readonly tags: readonly [string, ...Array<string>];
};
export const ConversationsAddTagsRequestJson = /* @__PURE__ */ Schema.Struct({
  tags: Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]),
});
export type ConversationsAddTags200 = Conversation;
export const ConversationsAddTags200 = Conversation;
export type ConversationsAddTags401 = UnauthorizedError;
export const ConversationsAddTags401 = UnauthorizedError;
export type ConversationsAddTags403 = ForbiddenError;
export const ConversationsAddTags403 = ForbiddenError;
export type ConversationsAddTags404 = ResourceNotFoundError;
export const ConversationsAddTags404 = ResourceNotFoundError;
export type ConversationsAddTags422 = ValidationError;
export const ConversationsAddTags422 = ValidationError;
export type ConversationsAddTags500 = InternalError;
export const ConversationsAddTags500 = InternalError;
export type ConversationsAddTags504 = GatewayTimeoutError;
export const ConversationsAddTags504 = GatewayTimeoutError;
export type ConversationsRemoveTagsPathParams = { readonly id: ConversationId };
export const ConversationsRemoveTagsPathParams = /* @__PURE__ */ Schema.Struct({
  id: ConversationId,
});
export type ConversationsRemoveTagsRequestJson = {
  readonly tags: readonly [string, ...Array<string>];
};
export const ConversationsRemoveTagsRequestJson = /* @__PURE__ */ Schema.Struct({
  tags: Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]),
});
export type ConversationsRemoveTags200 = Conversation;
export const ConversationsRemoveTags200 = Conversation;
export type ConversationsRemoveTags401 = UnauthorizedError;
export const ConversationsRemoveTags401 = UnauthorizedError;
export type ConversationsRemoveTags403 = ForbiddenError;
export const ConversationsRemoveTags403 = ForbiddenError;
export type ConversationsRemoveTags404 = ResourceNotFoundError;
export const ConversationsRemoveTags404 = ResourceNotFoundError;
export type ConversationsRemoveTags422 = ValidationError;
export const ConversationsRemoveTags422 = ValidationError;
export type ConversationsRemoveTags500 = InternalError;
export const ConversationsRemoveTags500 = InternalError;
export type ConversationsRemoveTags504 = GatewayTimeoutError;
export const ConversationsRemoveTags504 = GatewayTimeoutError;

export class ConversationsGroup extends HttpApiGroup.make("Conversations")
  .add(
    HttpApiEndpoint.get("conversationsList", "/v1/conversations", {
      query: ConversationsListQuery,
      success: ConversationsList200,
      error: [
        ConversationsList401.pipe(HttpApiSchema.status(401)),
        ConversationsList403.pipe(HttpApiSchema.status(403)),
        ConversationsList422.pipe(HttpApiSchema.status(422)),
        ConversationsList500,
        ConversationsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "conversations.list")
      .annotate(OpenApi.Summary, "List conversations")
      .annotate(
        OpenApi.Description,
        "Returns conversation summaries, most recently active first, filterable by status, channel, contact, and creation time (`after`, `before`). Pass `nextCursor` back as `cursor` for the next page; it is null on the last page. A conversation that gains activity while you page moves ahead of the cursor, so a walk lists each conversation at most once. Read a conversation's contacts, metadata, and resolution with `GET /v1/conversations/{id}`.",
      ),
    HttpApiEndpoint.post("conversationsCreate", "/v1/conversations", {
      payload: ConversationsCreateRequestJson,
      success: ConversationsCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        ConversationsCreate401.pipe(HttpApiSchema.status(401)),
        ConversationsCreate403.pipe(HttpApiSchema.status(403)),
        ConversationsCreate422.pipe(HttpApiSchema.status(422)),
        ConversationsCreate500,
        ConversationsCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "conversations.create")
      .annotate(OpenApi.Summary, "Create a conversation")
      .annotate(
        OpenApi.Description,
        "Creates a new conversation with its initial contacts and returns it with a 201 status.",
      ),
    HttpApiEndpoint.get("conversationsGetById", "/v1/conversations/:id", {
      params: ConversationsGetByIdPathParams,
      success: ConversationsGetById200,
      error: [
        ConversationsGetById401.pipe(HttpApiSchema.status(401)),
        ConversationsGetById403.pipe(HttpApiSchema.status(403)),
        ConversationsGetById404.pipe(HttpApiSchema.status(404)),
        ConversationsGetById422.pipe(HttpApiSchema.status(422)),
        ConversationsGetById500,
        ConversationsGetById504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "conversations.getById")
      .annotate(OpenApi.Summary, "Get a conversation")
      .annotate(
        OpenApi.Description,
        "Returns a single conversation with the contacts taking part in it.",
      ),
    HttpApiEndpoint.patch("conversationsUpdate", "/v1/conversations/:id", {
      params: ConversationsUpdatePathParams,
      payload: ConversationsUpdateRequestJson,
      success: ConversationsUpdate200,
      error: [
        ConversationsUpdate401.pipe(HttpApiSchema.status(401)),
        ConversationsUpdate403.pipe(HttpApiSchema.status(403)),
        ConversationsUpdate404.pipe(HttpApiSchema.status(404)),
        ConversationsUpdate422.pipe(HttpApiSchema.status(422)),
        ConversationsUpdate500,
        ConversationsUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "conversations.update")
      .annotate(OpenApi.Summary, "Update a conversation")
      .annotate(
        OpenApi.Description,
        "Updates the fields you name and keeps the rest. `metadata` merges into the stored metadata by key, and a `null` value deletes that key. `primaryChannel` must be one of the conversation's channels. Tags, categories, and channels are not updated here: use `POST` and `DELETE` on `/v1/conversations/{id}/tags`, `/v1/conversations/{id}/categories`, and `/v1/conversations/{id}/channels`.",
      ),
    HttpApiEndpoint.post("conversationsAddCategories", "/v1/conversations/:id/categories", {
      params: ConversationsAddCategoriesPathParams,
      payload: ConversationsAddCategoriesRequestJson,
      success: ConversationsAddCategories200,
      error: [
        ConversationsAddCategories401.pipe(HttpApiSchema.status(401)),
        ConversationsAddCategories403.pipe(HttpApiSchema.status(403)),
        ConversationsAddCategories404.pipe(HttpApiSchema.status(404)),
        ConversationsAddCategories422.pipe(HttpApiSchema.status(422)),
        ConversationsAddCategories500,
        ConversationsAddCategories504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "conversations.addCategories")
      .annotate(OpenApi.Summary, "Add conversation categories")
      .annotate(
        OpenApi.Description,
        "Adds the given categories to the conversation, keeping the ones it already has, and returns the conversation.",
      ),
    HttpApiEndpoint.delete("conversationsRemoveCategories", "/v1/conversations/:id/categories", {
      params: ConversationsRemoveCategoriesPathParams,
      payload: ConversationsRemoveCategoriesRequestJson,
      success: ConversationsRemoveCategories200,
      error: [
        ConversationsRemoveCategories401.pipe(HttpApiSchema.status(401)),
        ConversationsRemoveCategories403.pipe(HttpApiSchema.status(403)),
        ConversationsRemoveCategories404.pipe(HttpApiSchema.status(404)),
        ConversationsRemoveCategories422.pipe(HttpApiSchema.status(422)),
        ConversationsRemoveCategories500,
        ConversationsRemoveCategories504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "conversations.removeCategories")
      .annotate(OpenApi.Summary, "Remove conversation categories")
      .annotate(
        OpenApi.Description,
        "Removes the given categories from the conversation and returns the conversation. A category the conversation does not have is ignored.",
      ),
    HttpApiEndpoint.post("conversationsAddChannels", "/v1/conversations/:id/channels", {
      params: ConversationsAddChannelsPathParams,
      payload: ConversationsAddChannelsRequestJson,
      success: ConversationsAddChannels200,
      error: [
        ConversationsAddChannels401.pipe(HttpApiSchema.status(401)),
        ConversationsAddChannels403.pipe(HttpApiSchema.status(403)),
        ConversationsAddChannels404.pipe(HttpApiSchema.status(404)),
        ConversationsAddChannels422.pipe(HttpApiSchema.status(422)),
        ConversationsAddChannels500,
        ConversationsAddChannels504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "conversations.addChannels")
      .annotate(OpenApi.Summary, "Add conversation channels")
      .annotate(
        OpenApi.Description,
        "Adds the given channels to the conversation, keeping the ones it already has, and returns the conversation.",
      ),
    HttpApiEndpoint.delete("conversationsRemoveChannels", "/v1/conversations/:id/channels", {
      params: ConversationsRemoveChannelsPathParams,
      payload: ConversationsRemoveChannelsRequestJson,
      success: ConversationsRemoveChannels200,
      error: [
        ConversationsRemoveChannels401.pipe(HttpApiSchema.status(401)),
        ConversationsRemoveChannels403.pipe(HttpApiSchema.status(403)),
        ConversationsRemoveChannels404.pipe(HttpApiSchema.status(404)),
        ConversationsRemoveChannels422.pipe(HttpApiSchema.status(422)),
        ConversationsRemoveChannels500,
        ConversationsRemoveChannels504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "conversations.removeChannels")
      .annotate(OpenApi.Summary, "Remove conversation channels")
      .annotate(
        OpenApi.Description,
        "Removes the given channels from the conversation and returns the conversation. The primary channel cannot be removed; a channel the conversation does not have is ignored.",
      ),
    HttpApiEndpoint.post("conversationsAddContacts", "/v1/conversations/:id/contacts", {
      params: ConversationsAddContactsPathParams,
      payload: ConversationsAddContactsRequestJson,
      success: ConversationsAddContacts200,
      error: [
        ConversationsAddContacts401.pipe(HttpApiSchema.status(401)),
        ConversationsAddContacts403.pipe(HttpApiSchema.status(403)),
        ConversationsAddContacts404.pipe(HttpApiSchema.status(404)),
        ConversationsAddContacts422.pipe(HttpApiSchema.status(422)),
        ConversationsAddContacts500,
        ConversationsAddContacts504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "conversations.addContacts")
      .annotate(OpenApi.Summary, "Add contacts to a conversation")
      .annotate(
        OpenApi.Description,
        "Attaches one or more contacts to a conversation and returns the updated conversation. One request carries at most 1000 ids.",
      ),
    HttpApiEndpoint.delete("conversationsRemoveContacts", "/v1/conversations/:id/contacts", {
      params: ConversationsRemoveContactsPathParams,
      payload: ConversationsRemoveContactsRequestJson,
      success: ConversationsRemoveContacts200,
      error: [
        ConversationsRemoveContacts401.pipe(HttpApiSchema.status(401)),
        ConversationsRemoveContacts403.pipe(HttpApiSchema.status(403)),
        ConversationsRemoveContacts404.pipe(HttpApiSchema.status(404)),
        ConversationsRemoveContacts422.pipe(HttpApiSchema.status(422)),
        ConversationsRemoveContacts500,
        ConversationsRemoveContacts504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "conversations.removeContacts")
      .annotate(OpenApi.Summary, "Remove contacts from a conversation")
      .annotate(
        OpenApi.Description,
        "Detaches one or more contacts from a conversation and returns the updated conversation. One request carries at most 1000 ids.",
      ),
    HttpApiEndpoint.get("conversationsListMessages", "/v1/conversations/:id/messages", {
      params: ConversationsListMessagesPathParams,
      query: ConversationsListMessagesQuery,
      success: ConversationsListMessages200,
      error: [
        ConversationsListMessages401.pipe(HttpApiSchema.status(401)),
        ConversationsListMessages403.pipe(HttpApiSchema.status(403)),
        ConversationsListMessages404.pipe(HttpApiSchema.status(404)),
        ConversationsListMessages422.pipe(HttpApiSchema.status(422)),
        ConversationsListMessages500,
        ConversationsListMessages504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "conversations.listMessages")
      .annotate(OpenApi.Summary, "List conversation messages")
      .annotate(
        OpenApi.Description,
        "Returns the conversation's message summaries, oldest first. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page. Read a message's content with `GET /v1/messages/{id}/content`.",
      ),
    HttpApiEndpoint.post("conversationsAddTags", "/v1/conversations/:id/tags", {
      params: ConversationsAddTagsPathParams,
      payload: ConversationsAddTagsRequestJson,
      success: ConversationsAddTags200,
      error: [
        ConversationsAddTags401.pipe(HttpApiSchema.status(401)),
        ConversationsAddTags403.pipe(HttpApiSchema.status(403)),
        ConversationsAddTags404.pipe(HttpApiSchema.status(404)),
        ConversationsAddTags422.pipe(HttpApiSchema.status(422)),
        ConversationsAddTags500,
        ConversationsAddTags504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "conversations.addTags")
      .annotate(OpenApi.Summary, "Add conversation tags")
      .annotate(
        OpenApi.Description,
        "Adds the given tags to the conversation, keeping the tags it already has, and returns the conversation.",
      ),
    HttpApiEndpoint.delete("conversationsRemoveTags", "/v1/conversations/:id/tags", {
      params: ConversationsRemoveTagsPathParams,
      payload: ConversationsRemoveTagsRequestJson,
      success: ConversationsRemoveTags200,
      error: [
        ConversationsRemoveTags401.pipe(HttpApiSchema.status(401)),
        ConversationsRemoveTags403.pipe(HttpApiSchema.status(403)),
        ConversationsRemoveTags404.pipe(HttpApiSchema.status(404)),
        ConversationsRemoveTags422.pipe(HttpApiSchema.status(422)),
        ConversationsRemoveTags500,
        ConversationsRemoveTags504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "conversations.removeTags")
      .annotate(OpenApi.Summary, "Remove conversation tags")
      .annotate(
        OpenApi.Description,
        "Removes the given tags from the conversation and returns the conversation. A tag the conversation does not have is ignored.",
      ),
  )
  .annotate(OpenApi.Description, "Create, update, and list conversations with your contacts.") {}
