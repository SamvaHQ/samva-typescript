// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  BillingProviderError,
  ConflictError,
  Cursor,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  JsonValue,
  MailboxId,
  NamespaceId,
  PaymentRequiredError,
  RateLimitedError,
  ResourceNotFoundError,
  SuccessResponse,
  UnauthorizedError,
  ValidationError,
  WebhookEndpointId,
  __SamvaRuntimeSensitiveString,
} from "./shared";

export type WebhookDeliveryCounts = {
  readonly total: number;
  readonly pending: number;
  readonly delivered: number;
  readonly exhausted: number;
  readonly cancelled: number;
};
export const WebhookDeliveryCounts = /* @__PURE__ */ (() =>
  Schema.Struct({
    total: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    pending: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    exhausted: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    cancelled: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  }).annotate({ identifier: "WebhookDeliveryCounts" }))();
export type WebhookDeliveryId = string & EffectBrand.Brand<"WebhookDeliveryId">;
export const WebhookDeliveryId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^whdel_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^whdel_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "WebhookDeliveryId",
    }),
  ).pipe(Schema.brand("WebhookDeliveryId")))();
export type WebhookAttemptId = string & EffectBrand.Brand<"WebhookAttemptId">;
export const WebhookAttemptId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^whatt_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^whatt_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "WebhookAttemptId",
    }),
  ).pipe(Schema.brand("WebhookAttemptId")))();
export type WebhookEventId = string & EffectBrand.Brand<"WebhookEventId">;
export const WebhookEventId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^whevt_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^whevt_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "WebhookEventId",
    }),
  ).pipe(Schema.brand("WebhookEventId")))();
export type WebhookDailyDeliveries = {
  readonly date: string;
  readonly pending: number;
  readonly delivered: number;
  readonly exhausted: number;
  readonly cancelled: number;
};
export const WebhookDailyDeliveries = /* @__PURE__ */ (() =>
  Schema.Struct({
    date: Schema.String,
    pending: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    exhausted: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    cancelled: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  }).annotate({ identifier: "WebhookDailyDeliveries" }))();
export type WebhookSigningSecret = {
  readonly secret: __SamvaRuntimeSensitiveString;
  readonly createdAt: string;
  readonly previousExpiresAt: string | null;
};
export const WebhookSigningSecret = /* @__PURE__ */ (() =>
  Schema.Struct({
    secret: __SamvaRuntimeSensitiveString,
    createdAt: Schema.String,
    previousExpiresAt: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "WebhookSigningSecret" }))();
export type WebhookEndpoint = {
  readonly id: WebhookEndpointId;
  readonly name: string;
  readonly url: string;
  readonly eventTypes: ReadonlyArray<
    | "message.sent"
    | "message.delivered"
    | "message.read"
    | "message.failed"
    | "message.bounced"
    | "message.complained"
    | "message.received"
    | "message.opened"
    | "message.clicked"
    | "contact.created"
    | "contact.updated"
    | "contact.deleted"
    | "contact.subscribed"
    | "contact.unsubscribed"
    | "contact.resubscribed"
    | "contact.consent_changed"
    | "conversation.created"
    | "conversation.updated"
    | "conversation.archived"
    | "webhook.created"
    | "webhook.updated"
    | "webhook.deleted"
    | "webhook.test"
    | "domain.updated"
    | "domain.warming.updated"
    | "template.registration.updated"
    | "flow.registration.updated"
    | "whatsapp.number.connected"
    | "mailbox.message.received"
    | "mailbox.message.sent"
    | "mailbox.action.pending_approval"
    | "mailbox.action.resolved"
    | "mailbox.message.quarantined"
    | "mailbox.message.released"
    | "mailbox.message.discarded"
    | "mailbox.message.delivered"
    | "mailbox.message.read"
    | "mailbox.message.failed"
    | "journey.webhook"
  >;
  readonly channels: ReadonlyArray<"email"> | null;
  readonly mailboxIds: ReadonlyArray<MailboxId> | null;
  readonly namespaceId: NamespaceId | null;
  readonly status: "active" | "disabled";
  readonly hasCustomHeaders: boolean;
  readonly failureStartedAt: string | null;
  readonly lastSucceededAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const WebhookEndpoint = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: WebhookEndpointId,
    name: Schema.String,
    url: Schema.String,
    eventTypes: Schema.Array(
      Schema.Union([
        Schema.Literal("message.sent"),
        Schema.Literal("message.delivered"),
        Schema.Literal("message.read"),
        Schema.Literal("message.failed"),
        Schema.Literal("message.bounced"),
        Schema.Literal("message.complained"),
        Schema.Literal("message.received"),
        Schema.Literal("message.opened"),
        Schema.Literal("message.clicked"),
        Schema.Literal("contact.created"),
        Schema.Literal("contact.updated"),
        Schema.Literal("contact.deleted"),
        Schema.Literal("contact.subscribed"),
        Schema.Literal("contact.unsubscribed"),
        Schema.Literal("contact.resubscribed"),
        Schema.Literal("contact.consent_changed"),
        Schema.Literal("conversation.created"),
        Schema.Literal("conversation.updated"),
        Schema.Literal("conversation.archived"),
        Schema.Literal("webhook.created"),
        Schema.Literal("webhook.updated"),
        Schema.Literal("webhook.deleted"),
        Schema.Literal("webhook.test"),
        Schema.Literal("domain.updated"),
        Schema.Literal("domain.warming.updated"),
        Schema.Literal("template.registration.updated"),
        Schema.Literal("flow.registration.updated"),
        Schema.Literal("whatsapp.number.connected"),
        Schema.Literal("mailbox.message.received"),
        Schema.Literal("mailbox.message.sent"),
        Schema.Literal("mailbox.action.pending_approval"),
        Schema.Literal("mailbox.action.resolved"),
        Schema.Literal("mailbox.message.quarantined"),
        Schema.Literal("mailbox.message.released"),
        Schema.Literal("mailbox.message.discarded"),
        Schema.Literal("mailbox.message.delivered"),
        Schema.Literal("mailbox.message.read"),
        Schema.Literal("mailbox.message.failed"),
        Schema.Literal("journey.webhook"),
      ]),
    ),
    channels: Schema.Union([Schema.Array(Schema.Literal("email")), Schema.Null]),
    mailboxIds: Schema.Union([Schema.Array(MailboxId), Schema.Null]),
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
    status: Schema.Union([Schema.Literal("active"), Schema.Literal("disabled")]),
    hasCustomHeaders: Schema.Boolean,
    failureStartedAt: Schema.Union([Schema.String, Schema.Null]),
    lastSucceededAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "WebhookEndpoint" }))();
export type WebhookEndpointListItem = {
  readonly id: WebhookEndpointId;
  readonly name: string;
  readonly url: string;
  readonly eventTypes: ReadonlyArray<
    | "message.sent"
    | "message.delivered"
    | "message.read"
    | "message.failed"
    | "message.bounced"
    | "message.complained"
    | "message.received"
    | "message.opened"
    | "message.clicked"
    | "contact.created"
    | "contact.updated"
    | "contact.deleted"
    | "contact.subscribed"
    | "contact.unsubscribed"
    | "contact.resubscribed"
    | "contact.consent_changed"
    | "conversation.created"
    | "conversation.updated"
    | "conversation.archived"
    | "webhook.created"
    | "webhook.updated"
    | "webhook.deleted"
    | "webhook.test"
    | "domain.updated"
    | "domain.warming.updated"
    | "template.registration.updated"
    | "flow.registration.updated"
    | "whatsapp.number.connected"
    | "mailbox.message.received"
    | "mailbox.message.sent"
    | "mailbox.action.pending_approval"
    | "mailbox.action.resolved"
    | "mailbox.message.quarantined"
    | "mailbox.message.released"
    | "mailbox.message.discarded"
    | "mailbox.message.delivered"
    | "mailbox.message.read"
    | "mailbox.message.failed"
    | "journey.webhook"
  >;
  readonly channels: ReadonlyArray<"email"> | null;
  readonly mailboxIds: ReadonlyArray<MailboxId> | null;
  readonly namespaceId: NamespaceId | null;
  readonly status: "active" | "disabled";
  readonly hasCustomHeaders: boolean;
  readonly failureStartedAt: string | null;
  readonly lastSucceededAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deliveries: WebhookDeliveryCounts;
};
export const WebhookEndpointListItem = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: WebhookEndpointId,
    name: Schema.String,
    url: Schema.String,
    eventTypes: Schema.Array(
      Schema.Union([
        Schema.Literal("message.sent"),
        Schema.Literal("message.delivered"),
        Schema.Literal("message.read"),
        Schema.Literal("message.failed"),
        Schema.Literal("message.bounced"),
        Schema.Literal("message.complained"),
        Schema.Literal("message.received"),
        Schema.Literal("message.opened"),
        Schema.Literal("message.clicked"),
        Schema.Literal("contact.created"),
        Schema.Literal("contact.updated"),
        Schema.Literal("contact.deleted"),
        Schema.Literal("contact.subscribed"),
        Schema.Literal("contact.unsubscribed"),
        Schema.Literal("contact.resubscribed"),
        Schema.Literal("contact.consent_changed"),
        Schema.Literal("conversation.created"),
        Schema.Literal("conversation.updated"),
        Schema.Literal("conversation.archived"),
        Schema.Literal("webhook.created"),
        Schema.Literal("webhook.updated"),
        Schema.Literal("webhook.deleted"),
        Schema.Literal("webhook.test"),
        Schema.Literal("domain.updated"),
        Schema.Literal("domain.warming.updated"),
        Schema.Literal("template.registration.updated"),
        Schema.Literal("flow.registration.updated"),
        Schema.Literal("whatsapp.number.connected"),
        Schema.Literal("mailbox.message.received"),
        Schema.Literal("mailbox.message.sent"),
        Schema.Literal("mailbox.action.pending_approval"),
        Schema.Literal("mailbox.action.resolved"),
        Schema.Literal("mailbox.message.quarantined"),
        Schema.Literal("mailbox.message.released"),
        Schema.Literal("mailbox.message.discarded"),
        Schema.Literal("mailbox.message.delivered"),
        Schema.Literal("mailbox.message.read"),
        Schema.Literal("mailbox.message.failed"),
        Schema.Literal("journey.webhook"),
      ]),
    ),
    channels: Schema.Union([Schema.Array(Schema.Literal("email")), Schema.Null]),
    mailboxIds: Schema.Union([Schema.Array(MailboxId), Schema.Null]),
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
    status: Schema.Union([Schema.Literal("active"), Schema.Literal("disabled")]),
    hasCustomHeaders: Schema.Boolean,
    failureStartedAt: Schema.Union([Schema.String, Schema.Null]),
    lastSucceededAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
    deliveries: WebhookDeliveryCounts,
  }).annotate({ identifier: "WebhookEndpointListItem" }))();
export type WebhookDeliveryPage = {
  readonly items: ReadonlyArray<{
    readonly id: WebhookDeliveryId;
    readonly eventId: WebhookEventId;
    readonly eventType: string;
    readonly occurredAt: string;
    readonly endpointId: WebhookEndpointId;
    readonly status: "pending" | "delivered" | "exhausted" | "cancelled";
    readonly automaticAttempts: number;
    readonly nextAttemptAt: string | null;
    readonly completedAt: string | null;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly attempts: ReadonlyArray<{
      readonly id: WebhookAttemptId;
      readonly deliveryId: WebhookDeliveryId;
      readonly kind: "automatic" | "manual";
      readonly attemptNumber: number;
      readonly classification: "success" | "http-error" | "network-error" | "timeout" | "cancelled";
      readonly attemptedAt: string;
      readonly responseStatus: number | null;
      readonly responseHeaders: { readonly [x: string]: string } | null;
      readonly durationMs: number | null;
      readonly errorCode: string | null;
      readonly errorMessage: string | null;
      readonly createdAt: string;
    }>;
  }>;
  readonly nextCursor: string | null;
};
export const WebhookDeliveryPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        id: WebhookDeliveryId,
        eventId: WebhookEventId,
        eventType: Schema.String,
        occurredAt: Schema.String,
        endpointId: WebhookEndpointId,
        status: Schema.Union([
          Schema.Literal("pending"),
          Schema.Literal("delivered"),
          Schema.Literal("exhausted"),
          Schema.Literal("cancelled"),
        ]),
        automaticAttempts: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        nextAttemptAt: Schema.Union([Schema.String, Schema.Null]),
        completedAt: Schema.Union([Schema.String, Schema.Null]),
        createdAt: Schema.String,
        updatedAt: Schema.String,
        attempts: Schema.Array(
          Schema.Struct({
            id: WebhookAttemptId,
            deliveryId: WebhookDeliveryId,
            kind: Schema.Union([Schema.Literal("automatic"), Schema.Literal("manual")]),
            attemptNumber: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              )
              .check(Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" })),
            classification: Schema.Union([
              Schema.Literal("success"),
              Schema.Literal("http-error"),
              Schema.Literal("network-error"),
              Schema.Literal("timeout"),
              Schema.Literal("cancelled"),
            ]),
            attemptedAt: Schema.String,
            responseStatus: Schema.Union([
              Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
              Schema.Null,
            ]),
            responseHeaders: Schema.Union([
              Schema.Record(Schema.String, Schema.String),
              Schema.Null,
            ]),
            durationMs: Schema.Union([
              Schema.Finite.check(
                Schema.isFinite().annotate({ expected: "a finite number" }),
              ).check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
              Schema.Null,
            ]),
            errorCode: Schema.Union([Schema.String, Schema.Null]),
            errorMessage: Schema.Union([Schema.String, Schema.Null]),
            createdAt: Schema.String,
          }),
        ),
      }),
    ),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "WebhookDeliveryPage" }))();
export type WebhookStatsResponse = {
  readonly total: number;
  readonly pending: number;
  readonly delivered: number;
  readonly exhausted: number;
  readonly cancelled: number;
  readonly daily: ReadonlyArray<WebhookDailyDeliveries>;
};
export const WebhookStatsResponse = /* @__PURE__ */ (() =>
  Schema.Struct({
    total: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    pending: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    exhausted: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    cancelled: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    daily: Schema.Array(WebhookDailyDeliveries),
  }).annotate({ identifier: "WebhookStatsResponse" }))();
export type WebhookEndpointPage = {
  readonly items: ReadonlyArray<WebhookEndpointListItem>;
  readonly nextCursor: string | null;
};
export const WebhookEndpointPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(WebhookEndpointListItem),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "WebhookEndpointPage" }))();
export type WebhooksListQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
  readonly search?: string | null;
  readonly status?: "active" | "disabled" | null;
};
export const WebhooksListQuery = /* @__PURE__ */ (() =>
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
    search: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    status: Schema.optionalKey(
      Schema.Union([
        Schema.Union([Schema.Literal("active"), Schema.Literal("disabled")]),
        Schema.Null,
      ]),
    ),
  }))();
export type WebhooksList200 = WebhookEndpointPage;
export const WebhooksList200 = WebhookEndpointPage;
export type WebhooksList401 = UnauthorizedError;
export const WebhooksList401 = UnauthorizedError;
export type WebhooksList403 = ForbiddenError;
export const WebhooksList403 = ForbiddenError;
export type WebhooksList422 = ValidationError;
export const WebhooksList422 = ValidationError;
export type WebhooksList500 = InternalError;
export const WebhooksList500 = InternalError;
export type WebhooksList504 = GatewayTimeoutError;
export const WebhooksList504 = GatewayTimeoutError;
export type WebhooksCreateRequestJson = {
  readonly name: string;
  readonly url: string;
  readonly eventTypes: ReadonlyArray<
    | "message.sent"
    | "message.delivered"
    | "message.read"
    | "message.failed"
    | "message.bounced"
    | "message.complained"
    | "message.received"
    | "message.opened"
    | "message.clicked"
    | "contact.created"
    | "contact.updated"
    | "contact.deleted"
    | "contact.subscribed"
    | "contact.unsubscribed"
    | "contact.resubscribed"
    | "contact.consent_changed"
    | "conversation.created"
    | "conversation.updated"
    | "conversation.archived"
    | "webhook.created"
    | "webhook.updated"
    | "webhook.deleted"
    | "webhook.test"
    | "domain.updated"
    | "domain.warming.updated"
    | "template.registration.updated"
    | "flow.registration.updated"
    | "whatsapp.number.connected"
    | "mailbox.message.received"
    | "mailbox.message.sent"
    | "mailbox.action.pending_approval"
    | "mailbox.action.resolved"
    | "mailbox.message.quarantined"
    | "mailbox.message.released"
    | "mailbox.message.discarded"
    | "mailbox.message.delivered"
    | "mailbox.message.read"
    | "mailbox.message.failed"
    | "journey.webhook"
  >;
  readonly channels?: ReadonlyArray<"email"> | null;
  readonly mailboxIds?: readonly [MailboxId, ...Array<MailboxId>] | null;
  readonly namespaceId?: NamespaceId | null;
  readonly headers?: { readonly [x: string]: string } | null;
  readonly status?: "active" | "disabled" | null;
};
export const WebhooksCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(100).annotate({ expected: "a string with at most 100 code points" }),
      )
      .check(
        Schema.isMaxLength(100).annotate({ expected: "a value with a length of at most 100" }),
      ),
    url: Schema.String,
    eventTypes: Schema.Array(
      Schema.Union([
        Schema.Literal("message.sent"),
        Schema.Literal("message.delivered"),
        Schema.Literal("message.read"),
        Schema.Literal("message.failed"),
        Schema.Literal("message.bounced"),
        Schema.Literal("message.complained"),
        Schema.Literal("message.received"),
        Schema.Literal("message.opened"),
        Schema.Literal("message.clicked"),
        Schema.Literal("contact.created"),
        Schema.Literal("contact.updated"),
        Schema.Literal("contact.deleted"),
        Schema.Literal("contact.subscribed"),
        Schema.Literal("contact.unsubscribed"),
        Schema.Literal("contact.resubscribed"),
        Schema.Literal("contact.consent_changed"),
        Schema.Literal("conversation.created"),
        Schema.Literal("conversation.updated"),
        Schema.Literal("conversation.archived"),
        Schema.Literal("webhook.created"),
        Schema.Literal("webhook.updated"),
        Schema.Literal("webhook.deleted"),
        Schema.Literal("webhook.test"),
        Schema.Literal("domain.updated"),
        Schema.Literal("domain.warming.updated"),
        Schema.Literal("template.registration.updated"),
        Schema.Literal("flow.registration.updated"),
        Schema.Literal("whatsapp.number.connected"),
        Schema.Literal("mailbox.message.received"),
        Schema.Literal("mailbox.message.sent"),
        Schema.Literal("mailbox.action.pending_approval"),
        Schema.Literal("mailbox.action.resolved"),
        Schema.Literal("mailbox.message.quarantined"),
        Schema.Literal("mailbox.message.released"),
        Schema.Literal("mailbox.message.discarded"),
        Schema.Literal("mailbox.message.delivered"),
        Schema.Literal("mailbox.message.read"),
        Schema.Literal("mailbox.message.failed"),
        Schema.Literal("journey.webhook"),
      ]),
    ).check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" })),
    channels: Schema.optionalKey(
      Schema.Union([
        Schema.Array(Schema.Literal("email")).check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        ),
        Schema.Null,
      ]),
    ),
    mailboxIds: Schema.optionalKey(
      Schema.Union([Schema.TupleWithRest(Schema.Tuple([MailboxId]), [MailboxId]), Schema.Null]),
    ),
    namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
    headers: Schema.optionalKey(
      Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
    ),
    status: Schema.optionalKey(
      Schema.Union([
        Schema.Union([Schema.Literal("active"), Schema.Literal("disabled")]),
        Schema.Null,
      ]),
    ),
  }))();
export type WebhooksCreate201 = {
  readonly endpoint: WebhookEndpoint;
  readonly secret: __SamvaRuntimeSensitiveString;
};
export const WebhooksCreate201 = /* @__PURE__ */ (() =>
  Schema.Struct({ endpoint: WebhookEndpoint, secret: __SamvaRuntimeSensitiveString }))();
export type WebhooksCreate401 = UnauthorizedError;
export const WebhooksCreate401 = UnauthorizedError;
export type WebhooksCreate402 = PaymentRequiredError;
export const WebhooksCreate402 = PaymentRequiredError;
export type WebhooksCreate403 = ForbiddenError;
export const WebhooksCreate403 = ForbiddenError;
export type WebhooksCreate404 = ResourceNotFoundError;
export const WebhooksCreate404 = ResourceNotFoundError;
export type WebhooksCreate409 = ConflictError;
export const WebhooksCreate409 = ConflictError;
export type WebhooksCreate422 = ValidationError;
export const WebhooksCreate422 = ValidationError;
export type WebhooksCreate500 = InternalError;
export const WebhooksCreate500 = InternalError;
export type WebhooksCreate502 = BillingProviderError;
export const WebhooksCreate502 = BillingProviderError;
export type WebhooksCreate504 = GatewayTimeoutError;
export const WebhooksCreate504 = GatewayTimeoutError;
export type WebhooksGetPathParams = { readonly id: WebhookEndpointId };
export const WebhooksGetPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: WebhookEndpointId }))();
export type WebhooksGet200 = WebhookEndpoint;
export const WebhooksGet200 = WebhookEndpoint;
export type WebhooksGet401 = UnauthorizedError;
export const WebhooksGet401 = UnauthorizedError;
export type WebhooksGet403 = ForbiddenError;
export const WebhooksGet403 = ForbiddenError;
export type WebhooksGet404 = ResourceNotFoundError;
export const WebhooksGet404 = ResourceNotFoundError;
export type WebhooksGet422 = ValidationError;
export const WebhooksGet422 = ValidationError;
export type WebhooksGet500 = InternalError;
export const WebhooksGet500 = InternalError;
export type WebhooksGet504 = GatewayTimeoutError;
export const WebhooksGet504 = GatewayTimeoutError;
export type WebhooksRemovePathParams = { readonly id: WebhookEndpointId };
export const WebhooksRemovePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: WebhookEndpointId }))();
export type WebhooksRemove200 = SuccessResponse;
export const WebhooksRemove200 = SuccessResponse;
export type WebhooksRemove401 = UnauthorizedError;
export const WebhooksRemove401 = UnauthorizedError;
export type WebhooksRemove403 = ForbiddenError;
export const WebhooksRemove403 = ForbiddenError;
export type WebhooksRemove404 = ResourceNotFoundError;
export const WebhooksRemove404 = ResourceNotFoundError;
export type WebhooksRemove422 = ValidationError;
export const WebhooksRemove422 = ValidationError;
export type WebhooksRemove500 = InternalError;
export const WebhooksRemove500 = InternalError;
export type WebhooksRemove502 = BillingProviderError;
export const WebhooksRemove502 = BillingProviderError;
export type WebhooksRemove504 = GatewayTimeoutError;
export const WebhooksRemove504 = GatewayTimeoutError;
export type WebhooksUpdatePathParams = { readonly id: WebhookEndpointId };
export const WebhooksUpdatePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: WebhookEndpointId }))();
export type WebhooksUpdateRequestJson = {
  readonly name?: string | null;
  readonly url?: string | null;
  readonly eventTypes?: ReadonlyArray<
    | "message.sent"
    | "message.delivered"
    | "message.read"
    | "message.failed"
    | "message.bounced"
    | "message.complained"
    | "message.received"
    | "message.opened"
    | "message.clicked"
    | "contact.created"
    | "contact.updated"
    | "contact.deleted"
    | "contact.subscribed"
    | "contact.unsubscribed"
    | "contact.resubscribed"
    | "contact.consent_changed"
    | "conversation.created"
    | "conversation.updated"
    | "conversation.archived"
    | "webhook.created"
    | "webhook.updated"
    | "webhook.deleted"
    | "webhook.test"
    | "domain.updated"
    | "domain.warming.updated"
    | "template.registration.updated"
    | "flow.registration.updated"
    | "whatsapp.number.connected"
    | "mailbox.message.received"
    | "mailbox.message.sent"
    | "mailbox.action.pending_approval"
    | "mailbox.action.resolved"
    | "mailbox.message.quarantined"
    | "mailbox.message.released"
    | "mailbox.message.discarded"
    | "mailbox.message.delivered"
    | "mailbox.message.read"
    | "mailbox.message.failed"
    | "journey.webhook"
  > | null;
  readonly channels?: ReadonlyArray<"email"> | null | null;
  readonly mailboxIds?: readonly [MailboxId, ...Array<MailboxId>] | null | null;
  readonly namespaceId?: NamespaceId | null | null;
  readonly headers?: { readonly [x: string]: string } | null;
  readonly status?: "active" | "disabled" | null;
};
export const WebhooksUpdateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        )
          .check(
            Schema.isMaxCodePoints(100).annotate({
              expected: "a string with at most 100 code points",
            }),
          )
          .check(
            Schema.isMaxLength(100).annotate({ expected: "a value with a length of at most 100" }),
          ),
        Schema.Null,
      ]),
    ),
    url: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    eventTypes: Schema.optionalKey(
      Schema.Union([
        Schema.Array(
          Schema.Union([
            Schema.Literal("message.sent"),
            Schema.Literal("message.delivered"),
            Schema.Literal("message.read"),
            Schema.Literal("message.failed"),
            Schema.Literal("message.bounced"),
            Schema.Literal("message.complained"),
            Schema.Literal("message.received"),
            Schema.Literal("message.opened"),
            Schema.Literal("message.clicked"),
            Schema.Literal("contact.created"),
            Schema.Literal("contact.updated"),
            Schema.Literal("contact.deleted"),
            Schema.Literal("contact.subscribed"),
            Schema.Literal("contact.unsubscribed"),
            Schema.Literal("contact.resubscribed"),
            Schema.Literal("contact.consent_changed"),
            Schema.Literal("conversation.created"),
            Schema.Literal("conversation.updated"),
            Schema.Literal("conversation.archived"),
            Schema.Literal("webhook.created"),
            Schema.Literal("webhook.updated"),
            Schema.Literal("webhook.deleted"),
            Schema.Literal("webhook.test"),
            Schema.Literal("domain.updated"),
            Schema.Literal("domain.warming.updated"),
            Schema.Literal("template.registration.updated"),
            Schema.Literal("flow.registration.updated"),
            Schema.Literal("whatsapp.number.connected"),
            Schema.Literal("mailbox.message.received"),
            Schema.Literal("mailbox.message.sent"),
            Schema.Literal("mailbox.action.pending_approval"),
            Schema.Literal("mailbox.action.resolved"),
            Schema.Literal("mailbox.message.quarantined"),
            Schema.Literal("mailbox.message.released"),
            Schema.Literal("mailbox.message.discarded"),
            Schema.Literal("mailbox.message.delivered"),
            Schema.Literal("mailbox.message.read"),
            Schema.Literal("mailbox.message.failed"),
            Schema.Literal("journey.webhook"),
          ]),
        ).check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        ),
        Schema.Null,
      ]),
    ),
    channels: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Array(Schema.Literal("email")).check(
            Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
          ),
          Schema.Null,
        ]),
        Schema.Null,
      ]),
    ),
    mailboxIds: Schema.optionalKey(
      Schema.Union([
        Schema.Union([Schema.TupleWithRest(Schema.Tuple([MailboxId]), [MailboxId]), Schema.Null]),
        Schema.Null,
      ]),
    ),
    namespaceId: Schema.optionalKey(
      Schema.Union([Schema.Union([NamespaceId, Schema.Null]), Schema.Null]),
    ),
    headers: Schema.optionalKey(
      Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
    ),
    status: Schema.optionalKey(
      Schema.Union([
        Schema.Union([Schema.Literal("active"), Schema.Literal("disabled")]),
        Schema.Null,
      ]),
    ),
  }))();
export type WebhooksUpdate200 = WebhookEndpoint;
export const WebhooksUpdate200 = WebhookEndpoint;
export type WebhooksUpdate401 = UnauthorizedError;
export const WebhooksUpdate401 = UnauthorizedError;
export type WebhooksUpdate403 = ForbiddenError;
export const WebhooksUpdate403 = ForbiddenError;
export type WebhooksUpdate404 = ResourceNotFoundError;
export const WebhooksUpdate404 = ResourceNotFoundError;
export type WebhooksUpdate409 = ConflictError;
export const WebhooksUpdate409 = ConflictError;
export type WebhooksUpdate422 = ValidationError;
export const WebhooksUpdate422 = ValidationError;
export type WebhooksUpdate500 = InternalError;
export const WebhooksUpdate500 = InternalError;
export type WebhooksUpdate504 = GatewayTimeoutError;
export const WebhooksUpdate504 = GatewayTimeoutError;
export type WebhooksRetryDeliveryPathParams = {
  readonly id: WebhookEndpointId;
  readonly deliveryId: WebhookDeliveryId;
};
export const WebhooksRetryDeliveryPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: WebhookEndpointId, deliveryId: WebhookDeliveryId }))();
export type WebhooksRetryDelivery200 = {
  readonly accepted: true;
  readonly deliveryId: WebhookDeliveryId;
  readonly attemptId: WebhookAttemptId;
  readonly outcome: "succeeded" | "failed";
};
export const WebhooksRetryDelivery200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    accepted: Schema.Literal(true),
    deliveryId: WebhookDeliveryId,
    attemptId: WebhookAttemptId,
    outcome: Schema.Union([Schema.Literal("succeeded"), Schema.Literal("failed")]),
  }))();
export type WebhooksRetryDelivery401 = UnauthorizedError;
export const WebhooksRetryDelivery401 = UnauthorizedError;
export type WebhooksRetryDelivery403 = ForbiddenError;
export const WebhooksRetryDelivery403 = ForbiddenError;
export type WebhooksRetryDelivery404 = ResourceNotFoundError;
export const WebhooksRetryDelivery404 = ResourceNotFoundError;
export type WebhooksRetryDelivery422 = ValidationError;
export const WebhooksRetryDelivery422 = ValidationError;
export type WebhooksRetryDelivery429 = RateLimitedError;
export const WebhooksRetryDelivery429 = RateLimitedError;
export type WebhooksRetryDelivery500 = InternalError;
export const WebhooksRetryDelivery500 = InternalError;
export type WebhooksRetryDelivery504 = GatewayTimeoutError;
export const WebhooksRetryDelivery504 = GatewayTimeoutError;
export type WebhooksGetLogsPathParams = { readonly id: WebhookEndpointId };
export const WebhooksGetLogsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: WebhookEndpointId }))();
export type WebhooksGetLogsQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
};
export const WebhooksGetLogsQuery = /* @__PURE__ */ (() =>
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
  }))();
export type WebhooksGetLogs200 = WebhookDeliveryPage;
export const WebhooksGetLogs200 = WebhookDeliveryPage;
export type WebhooksGetLogs401 = UnauthorizedError;
export const WebhooksGetLogs401 = UnauthorizedError;
export type WebhooksGetLogs403 = ForbiddenError;
export const WebhooksGetLogs403 = ForbiddenError;
export type WebhooksGetLogs404 = ResourceNotFoundError;
export const WebhooksGetLogs404 = ResourceNotFoundError;
export type WebhooksGetLogs422 = ValidationError;
export const WebhooksGetLogs422 = ValidationError;
export type WebhooksGetLogs500 = InternalError;
export const WebhooksGetLogs500 = InternalError;
export type WebhooksGetLogs504 = GatewayTimeoutError;
export const WebhooksGetLogs504 = GatewayTimeoutError;
export type WebhooksRegenerateSecretPathParams = { readonly id: WebhookEndpointId };
export const WebhooksRegenerateSecretPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: WebhookEndpointId }))();
export type WebhooksRegenerateSecret200 = { readonly secret: __SamvaRuntimeSensitiveString };
export const WebhooksRegenerateSecret200 = /* @__PURE__ */ (() =>
  Schema.Struct({ secret: __SamvaRuntimeSensitiveString }))();
export type WebhooksRegenerateSecret401 = UnauthorizedError;
export const WebhooksRegenerateSecret401 = UnauthorizedError;
export type WebhooksRegenerateSecret403 = ForbiddenError;
export const WebhooksRegenerateSecret403 = ForbiddenError;
export type WebhooksRegenerateSecret404 = ResourceNotFoundError;
export const WebhooksRegenerateSecret404 = ResourceNotFoundError;
export type WebhooksRegenerateSecret422 = ValidationError;
export const WebhooksRegenerateSecret422 = ValidationError;
export type WebhooksRegenerateSecret500 = InternalError;
export const WebhooksRegenerateSecret500 = InternalError;
export type WebhooksRegenerateSecret504 = GatewayTimeoutError;
export const WebhooksRegenerateSecret504 = GatewayTimeoutError;
export type WebhooksGetSecretPathParams = { readonly id: WebhookEndpointId };
export const WebhooksGetSecretPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: WebhookEndpointId }))();
export type WebhooksGetSecret200 = WebhookSigningSecret;
export const WebhooksGetSecret200 = WebhookSigningSecret;
export type WebhooksGetSecret401 = UnauthorizedError;
export const WebhooksGetSecret401 = UnauthorizedError;
export type WebhooksGetSecret403 = ForbiddenError;
export const WebhooksGetSecret403 = ForbiddenError;
export type WebhooksGetSecret404 = ResourceNotFoundError;
export const WebhooksGetSecret404 = ResourceNotFoundError;
export type WebhooksGetSecret422 = ValidationError;
export const WebhooksGetSecret422 = ValidationError;
export type WebhooksGetSecret500 = InternalError;
export const WebhooksGetSecret500 = InternalError;
export type WebhooksGetSecret504 = GatewayTimeoutError;
export const WebhooksGetSecret504 = GatewayTimeoutError;
export type WebhooksGetStatsPathParams = { readonly id: WebhookEndpointId };
export const WebhooksGetStatsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: WebhookEndpointId }))();
export type WebhooksGetStatsQuery = {
  readonly after?: string | null;
  readonly before?: string | null;
};
export const WebhooksGetStatsQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    after: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    before: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type WebhooksGetStats200 = WebhookStatsResponse;
export const WebhooksGetStats200 = WebhookStatsResponse;
export type WebhooksGetStats401 = UnauthorizedError;
export const WebhooksGetStats401 = UnauthorizedError;
export type WebhooksGetStats403 = ForbiddenError;
export const WebhooksGetStats403 = ForbiddenError;
export type WebhooksGetStats404 = ResourceNotFoundError;
export const WebhooksGetStats404 = ResourceNotFoundError;
export type WebhooksGetStats422 = ValidationError;
export const WebhooksGetStats422 = ValidationError;
export type WebhooksGetStats500 = InternalError;
export const WebhooksGetStats500 = InternalError;
export type WebhooksGetStats504 = GatewayTimeoutError;
export const WebhooksGetStats504 = GatewayTimeoutError;
export type WebhooksTestPathParams = { readonly id: WebhookEndpointId };
export const WebhooksTestPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: WebhookEndpointId }))();
export type WebhooksTestRequestJson = {
  readonly data?: { readonly [x: string]: JsonValue } | null;
};
export const WebhooksTestRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    data: Schema.optionalKey(Schema.Union([Schema.Record(Schema.String, JsonValue), Schema.Null])),
  }))();
export type WebhooksTest202 = {
  readonly accepted: true;
  readonly eventId: WebhookEventId;
  readonly deliveryId: WebhookDeliveryId;
};
export const WebhooksTest202 = /* @__PURE__ */ (() =>
  Schema.Struct({
    accepted: Schema.Literal(true),
    eventId: WebhookEventId,
    deliveryId: WebhookDeliveryId,
  }))();
export type WebhooksTest401 = UnauthorizedError;
export const WebhooksTest401 = UnauthorizedError;
export type WebhooksTest403 = ForbiddenError;
export const WebhooksTest403 = ForbiddenError;
export type WebhooksTest404 = ResourceNotFoundError;
export const WebhooksTest404 = ResourceNotFoundError;
export type WebhooksTest422 = ValidationError;
export const WebhooksTest422 = ValidationError;
export type WebhooksTest500 = InternalError;
export const WebhooksTest500 = InternalError;
export type WebhooksTest504 = GatewayTimeoutError;
export const WebhooksTest504 = GatewayTimeoutError;

export class WebhooksGroup extends HttpApiGroup.make("Webhooks")
  .add(
    HttpApiEndpoint.get("webhooksList", "/v1/webhooks", {
      query: WebhooksListQuery,
      success: WebhooksList200,
      error: [
        WebhooksList401.pipe(HttpApiSchema.status(401)),
        WebhooksList403.pipe(HttpApiSchema.status(403)),
        WebhooksList422.pipe(HttpApiSchema.status(422)),
        WebhooksList500,
        WebhooksList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "webhooks.list")
      .annotate(OpenApi.Summary, "List webhooks")
      .annotate(
        OpenApi.Description,
        "Returns the organization's webhook endpoints, oldest first, with each endpoint's delivery counts, optionally filtered by a search term matched against name and URL, and by status. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.post("webhooksCreate", "/v1/webhooks", {
      payload: WebhooksCreateRequestJson,
      success: WebhooksCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        WebhooksCreate401.pipe(HttpApiSchema.status(401)),
        WebhooksCreate402.pipe(HttpApiSchema.status(402)),
        WebhooksCreate403.pipe(HttpApiSchema.status(403)),
        WebhooksCreate404.pipe(HttpApiSchema.status(404)),
        WebhooksCreate409.pipe(HttpApiSchema.status(409)),
        WebhooksCreate422.pipe(HttpApiSchema.status(422)),
        WebhooksCreate500,
        WebhooksCreate502.pipe(HttpApiSchema.status(502)),
        WebhooksCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "webhooks.create")
      .annotate(OpenApi.Summary, "Create a webhook")
      .annotate(
        OpenApi.Description,
        "Creates a signed webhook endpoint for Samva delivery and inbound events, stores subscriptions, and returns the endpoint and signing secret with a 201 response. `namespaceId` confines the endpoint to one namespace's events and `mailboxIds` to those mailboxes' events; when both are set, every mailbox must belong to the namespace.",
      ),
    HttpApiEndpoint.get("webhooksGet", "/v1/webhooks/:id", {
      params: WebhooksGetPathParams,
      success: WebhooksGet200,
      error: [
        WebhooksGet401.pipe(HttpApiSchema.status(401)),
        WebhooksGet403.pipe(HttpApiSchema.status(403)),
        WebhooksGet404.pipe(HttpApiSchema.status(404)),
        WebhooksGet422.pipe(HttpApiSchema.status(422)),
        WebhooksGet500,
        WebhooksGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "webhooks.get")
      .annotate(OpenApi.Summary, "Get a webhook")
      .annotate(
        OpenApi.Description,
        "Returns the configuration of the webhook endpoint with the given ID.",
      ),
    HttpApiEndpoint.delete("webhooksRemove", "/v1/webhooks/:id", {
      params: WebhooksRemovePathParams,
      success: WebhooksRemove200,
      error: [
        WebhooksRemove401.pipe(HttpApiSchema.status(401)),
        WebhooksRemove403.pipe(HttpApiSchema.status(403)),
        WebhooksRemove404.pipe(HttpApiSchema.status(404)),
        WebhooksRemove422.pipe(HttpApiSchema.status(422)),
        WebhooksRemove500,
        WebhooksRemove502.pipe(HttpApiSchema.status(502)),
        WebhooksRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "webhooks.remove")
      .annotate(OpenApi.Summary, "Delete a webhook")
      .annotate(
        OpenApi.Description,
        "Deletes a webhook endpoint so it no longer receives event deliveries.",
      ),
    HttpApiEndpoint.patch("webhooksUpdate", "/v1/webhooks/:id", {
      params: WebhooksUpdatePathParams,
      payload: WebhooksUpdateRequestJson,
      success: WebhooksUpdate200,
      error: [
        WebhooksUpdate401.pipe(HttpApiSchema.status(401)),
        WebhooksUpdate403.pipe(HttpApiSchema.status(403)),
        WebhooksUpdate404.pipe(HttpApiSchema.status(404)),
        WebhooksUpdate409.pipe(HttpApiSchema.status(409)),
        WebhooksUpdate422.pipe(HttpApiSchema.status(422)),
        WebhooksUpdate500,
        WebhooksUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "webhooks.update")
      .annotate(OpenApi.Summary, "Update a webhook")
      .annotate(
        OpenApi.Description,
        "Updates a webhook's name, URL, subscribed events, channels, custom headers, mailbox scope, or status and returns the updated endpoint. A change to `mailboxIds` or `namespaceId` is checked as the endpoint will stand afterward: every mailbox must belong to the namespace when both are set.",
      ),
    HttpApiEndpoint.post(
      "webhooksRetryDelivery",
      "/v1/webhooks/:id/deliveries/:deliveryId/redeliver",
      {
        params: WebhooksRetryDeliveryPathParams,
        success: WebhooksRetryDelivery200,
        error: [
          WebhooksRetryDelivery401.pipe(HttpApiSchema.status(401)),
          WebhooksRetryDelivery403.pipe(HttpApiSchema.status(403)),
          WebhooksRetryDelivery404.pipe(HttpApiSchema.status(404)),
          WebhooksRetryDelivery422.pipe(HttpApiSchema.status(422)),
          WebhooksRetryDelivery429.pipe(HttpApiSchema.status(429)),
          WebhooksRetryDelivery500,
          WebhooksRetryDelivery504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "webhooks.retryDelivery")
      .annotate(OpenApi.Summary, "Retry a webhook delivery")
      .annotate(
        OpenApi.Description,
        "Performs one immediate manual redelivery attempt and returns that attempt's identity and outcome without changing the automatic retry lifecycle.",
      ),
    HttpApiEndpoint.get("webhooksGetLogs", "/v1/webhooks/:id/logs", {
      params: WebhooksGetLogsPathParams,
      query: WebhooksGetLogsQuery,
      success: WebhooksGetLogs200,
      error: [
        WebhooksGetLogs401.pipe(HttpApiSchema.status(401)),
        WebhooksGetLogs403.pipe(HttpApiSchema.status(403)),
        WebhooksGetLogs404.pipe(HttpApiSchema.status(404)),
        WebhooksGetLogs422.pipe(HttpApiSchema.status(422)),
        WebhooksGetLogs500,
        WebhooksGetLogs504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "webhooks.getLogs")
      .annotate(OpenApi.Summary, "List webhook delivery logs")
      .annotate(
        OpenApi.Description,
        "Returns a webhook endpoint's deliveries, newest first, each naming the event type and time it was made for, with its nested attempt diagnostics. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.post("webhooksRegenerateSecret", "/v1/webhooks/:id/rotate-secret", {
      params: WebhooksRegenerateSecretPathParams,
      success: WebhooksRegenerateSecret200,
      error: [
        WebhooksRegenerateSecret401.pipe(HttpApiSchema.status(401)),
        WebhooksRegenerateSecret403.pipe(HttpApiSchema.status(403)),
        WebhooksRegenerateSecret404.pipe(HttpApiSchema.status(404)),
        WebhooksRegenerateSecret422.pipe(HttpApiSchema.status(422)),
        WebhooksRegenerateSecret500,
        WebhooksRegenerateSecret504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "webhooks.regenerateSecret")
      .annotate(OpenApi.Summary, "Rotate a webhook signing secret")
      .annotate(
        OpenApi.Description,
        "Generates and returns a new signing secret. The previous secret remains valid for a 24-hour rotation overlap.",
      ),
    HttpApiEndpoint.get("webhooksGetSecret", "/v1/webhooks/:id/secret", {
      params: WebhooksGetSecretPathParams,
      success: WebhooksGetSecret200,
      error: [
        WebhooksGetSecret401.pipe(HttpApiSchema.status(401)),
        WebhooksGetSecret403.pipe(HttpApiSchema.status(403)),
        WebhooksGetSecret404.pipe(HttpApiSchema.status(404)),
        WebhooksGetSecret422.pipe(HttpApiSchema.status(422)),
        WebhooksGetSecret500,
        WebhooksGetSecret504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "webhooks.getSecret")
      .annotate(OpenApi.Summary, "Get a webhook signing secret")
      .annotate(
        OpenApi.Description,
        "Returns the endpoint's current signing secret and when a rotated-out secret stops verifying. It needs the same permission as rotating the secret.",
      ),
    HttpApiEndpoint.get("webhooksGetStats", "/v1/webhooks/:id/stats", {
      params: WebhooksGetStatsPathParams,
      query: WebhooksGetStatsQuery,
      success: WebhooksGetStats200,
      error: [
        WebhooksGetStats401.pipe(HttpApiSchema.status(401)),
        WebhooksGetStats403.pipe(HttpApiSchema.status(403)),
        WebhooksGetStats404.pipe(HttpApiSchema.status(404)),
        WebhooksGetStats422.pipe(HttpApiSchema.status(422)),
        WebhooksGetStats500,
        WebhooksGetStats504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "webhooks.getStats")
      .annotate(OpenApi.Summary, "Get webhook delivery statistics")
      .annotate(
        OpenApi.Description,
        "Returns aggregate pending, delivered, exhausted, and cancelled delivery counts for a webhook endpoint over its whole retained history, plus the same counts per organization-local calendar day between `after` and `before`, a window of at most 90 days that defaults to the last 30 days. Deliveries are retained for 90 days, so the longest window is the whole history.",
      ),
    HttpApiEndpoint.post("webhooksTest", "/v1/webhooks/:id/test", {
      params: WebhooksTestPathParams,
      payload: WebhooksTestRequestJson,
      success: WebhooksTest202.pipe(HttpApiSchema.status(202)),
      error: [
        WebhooksTest401.pipe(HttpApiSchema.status(401)),
        WebhooksTest403.pipe(HttpApiSchema.status(403)),
        WebhooksTest404.pipe(HttpApiSchema.status(404)),
        WebhooksTest422.pipe(HttpApiSchema.status(422)),
        WebhooksTest500,
        WebhooksTest504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "webhooks.test")
      .annotate(OpenApi.Summary, "Send a test webhook delivery")
      .annotate(
        OpenApi.Description,
        "Queues a signed webhook.test event through the normal delivery and retry lifecycle.",
      ),
  )
  .annotate(OpenApi.Description, "Customer event webhook management, testing, and delivery logs") {}
