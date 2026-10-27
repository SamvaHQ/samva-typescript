// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  AnalyticsQueryError,
  ApiKeySecurityMiddleware,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  UnauthorizedError,
  ValidationError,
  __SamvaRuntimeAbsoluteInstant,
} from "./shared";

export type AnalyticsGetChannelStatsQuery = {
  readonly after?: __SamvaRuntimeAbsoluteInstant | null;
  readonly before?: __SamvaRuntimeAbsoluteInstant | null;
};
export const AnalyticsGetChannelStatsQuery = /* @__PURE__ */ Schema.Struct({
  after: Schema.optionalKey(Schema.Union([__SamvaRuntimeAbsoluteInstant, Schema.Null])),
  before: Schema.optionalKey(Schema.Union([__SamvaRuntimeAbsoluteInstant, Schema.Null])),
});
export type AnalyticsGetChannelStats200 = {
  readonly email: {
    readonly sent: number;
    readonly deliveryRate: number;
    readonly uniqueOpenedMessages: number;
    readonly openTrackingEligibleDeliveredMessages: number;
    readonly uniqueMessageOpenRate: number;
    readonly uniqueClickedMessages: number;
    readonly clickTrackingEligibleDeliveredMessages: number;
    readonly uniqueMessageClickRate: number;
    readonly bounceRate: number;
  };
};
export const AnalyticsGetChannelStats200 = /* @__PURE__ */ Schema.Struct({
  email: Schema.Struct({
    sent: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    deliveryRate: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    uniqueOpenedMessages: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    openTrackingEligibleDeliveredMessages: Schema.Finite.check(
      Schema.isInt().annotate({ expected: "an integer" }),
    )
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
    uniqueMessageOpenRate: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    uniqueClickedMessages: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    clickTrackingEligibleDeliveredMessages: Schema.Finite.check(
      Schema.isInt().annotate({ expected: "an integer" }),
    )
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
    uniqueMessageClickRate: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    bounceRate: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
  }),
});
export type AnalyticsGetChannelStats400 = AnalyticsQueryError;
export const AnalyticsGetChannelStats400 = AnalyticsQueryError;
export type AnalyticsGetChannelStats401 = UnauthorizedError;
export const AnalyticsGetChannelStats401 = UnauthorizedError;
export type AnalyticsGetChannelStats403 = ForbiddenError;
export const AnalyticsGetChannelStats403 = ForbiddenError;
export type AnalyticsGetChannelStats422 = ValidationError;
export const AnalyticsGetChannelStats422 = ValidationError;
export type AnalyticsGetChannelStats500 = InternalError;
export const AnalyticsGetChannelStats500 = InternalError;
export type AnalyticsGetChannelStats504 = GatewayTimeoutError;
export const AnalyticsGetChannelStats504 = GatewayTimeoutError;
export type AnalyticsGetDeliveryMetricsQuery = {
  readonly after?: __SamvaRuntimeAbsoluteInstant | null;
  readonly before?: __SamvaRuntimeAbsoluteInstant | null;
  readonly channel?: "email" | null;
};
export const AnalyticsGetDeliveryMetricsQuery = /* @__PURE__ */ Schema.Struct({
  after: Schema.optionalKey(Schema.Union([__SamvaRuntimeAbsoluteInstant, Schema.Null])),
  before: Schema.optionalKey(Schema.Union([__SamvaRuntimeAbsoluteInstant, Schema.Null])),
  channel: Schema.optionalKey(Schema.Union([Schema.Literal("email"), Schema.Null])),
});
export type AnalyticsGetDeliveryMetrics200 = {
  readonly deliveredRate: number;
  readonly failedRate: number;
  readonly pendingRate: number;
  readonly avgDeliveryTimeMs: number;
};
export const AnalyticsGetDeliveryMetrics200 = /* @__PURE__ */ Schema.Struct({
  deliveredRate: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
  failedRate: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
  pendingRate: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
  avgDeliveryTimeMs: Schema.Finite.check(
    Schema.isFinite().annotate({ expected: "a finite number" }),
  ),
});
export type AnalyticsGetDeliveryMetrics400 = AnalyticsQueryError;
export const AnalyticsGetDeliveryMetrics400 = AnalyticsQueryError;
export type AnalyticsGetDeliveryMetrics401 = UnauthorizedError;
export const AnalyticsGetDeliveryMetrics401 = UnauthorizedError;
export type AnalyticsGetDeliveryMetrics403 = ForbiddenError;
export const AnalyticsGetDeliveryMetrics403 = ForbiddenError;
export type AnalyticsGetDeliveryMetrics422 = ValidationError;
export const AnalyticsGetDeliveryMetrics422 = ValidationError;
export type AnalyticsGetDeliveryMetrics500 = InternalError;
export const AnalyticsGetDeliveryMetrics500 = InternalError;
export type AnalyticsGetDeliveryMetrics504 = GatewayTimeoutError;
export const AnalyticsGetDeliveryMetrics504 = GatewayTimeoutError;
export type AnalyticsExportDataRequestJson = {
  readonly after: __SamvaRuntimeAbsoluteInstant;
  readonly before: __SamvaRuntimeAbsoluteInstant;
  readonly format?: "csv" | "json" | null;
  readonly includeChannels?: ReadonlyArray<"email"> | null;
};
export const AnalyticsExportDataRequestJson = /* @__PURE__ */ Schema.Struct({
  after: __SamvaRuntimeAbsoluteInstant,
  before: __SamvaRuntimeAbsoluteInstant,
  format: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.Literal("csv"), Schema.Literal("json")]), Schema.Null]),
  ),
  includeChannels: Schema.optionalKey(
    Schema.Union([Schema.Array(Schema.Literal("email")), Schema.Null]),
  ),
});
export type AnalyticsExportData200 = {
  readonly content: string;
  readonly mimeType: string;
  readonly filename: string;
};
export const AnalyticsExportData200 = /* @__PURE__ */ Schema.Struct({
  content: Schema.String,
  mimeType: Schema.String,
  filename: Schema.String,
});
export type AnalyticsExportData400 = AnalyticsQueryError;
export const AnalyticsExportData400 = AnalyticsQueryError;
export type AnalyticsExportData401 = UnauthorizedError;
export const AnalyticsExportData401 = UnauthorizedError;
export type AnalyticsExportData403 = ForbiddenError;
export const AnalyticsExportData403 = ForbiddenError;
export type AnalyticsExportData422 = ValidationError;
export const AnalyticsExportData422 = ValidationError;
export type AnalyticsExportData500 = InternalError;
export const AnalyticsExportData500 = InternalError;
export type AnalyticsExportData504 = GatewayTimeoutError;
export const AnalyticsExportData504 = GatewayTimeoutError;
export type AnalyticsGetHourlyDistributionQuery = {
  readonly after?: __SamvaRuntimeAbsoluteInstant | null;
  readonly before?: __SamvaRuntimeAbsoluteInstant | null;
};
export const AnalyticsGetHourlyDistributionQuery = /* @__PURE__ */ Schema.Struct({
  after: Schema.optionalKey(Schema.Union([__SamvaRuntimeAbsoluteInstant, Schema.Null])),
  before: Schema.optionalKey(Schema.Union([__SamvaRuntimeAbsoluteInstant, Schema.Null])),
});
export type AnalyticsGetHourlyDistribution200 = ReadonlyArray<{
  readonly hour: string;
  readonly count: number;
}>;
export const AnalyticsGetHourlyDistribution200 = /* @__PURE__ */ Schema.Array(
  Schema.Struct({
    hour: Schema.String,
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
  }),
);
export type AnalyticsGetHourlyDistribution400 = AnalyticsQueryError;
export const AnalyticsGetHourlyDistribution400 = AnalyticsQueryError;
export type AnalyticsGetHourlyDistribution401 = UnauthorizedError;
export const AnalyticsGetHourlyDistribution401 = UnauthorizedError;
export type AnalyticsGetHourlyDistribution403 = ForbiddenError;
export const AnalyticsGetHourlyDistribution403 = ForbiddenError;
export type AnalyticsGetHourlyDistribution422 = ValidationError;
export const AnalyticsGetHourlyDistribution422 = ValidationError;
export type AnalyticsGetHourlyDistribution500 = InternalError;
export const AnalyticsGetHourlyDistribution500 = InternalError;
export type AnalyticsGetHourlyDistribution504 = GatewayTimeoutError;
export const AnalyticsGetHourlyDistribution504 = GatewayTimeoutError;
export type AnalyticsGetStatsQuery = {
  readonly after?: __SamvaRuntimeAbsoluteInstant | null;
  readonly before?: __SamvaRuntimeAbsoluteInstant | null;
  readonly groupBy?: "day" | "week" | "month" | null;
  readonly channel?: "email" | null;
};
export const AnalyticsGetStatsQuery = /* @__PURE__ */ Schema.Struct({
  after: Schema.optionalKey(Schema.Union([__SamvaRuntimeAbsoluteInstant, Schema.Null])),
  before: Schema.optionalKey(Schema.Union([__SamvaRuntimeAbsoluteInstant, Schema.Null])),
  groupBy: Schema.optionalKey(
    Schema.Union([
      Schema.Union([Schema.Literal("day"), Schema.Literal("week"), Schema.Literal("month")]),
      Schema.Null,
    ]),
  ),
  channel: Schema.optionalKey(Schema.Union([Schema.Literal("email"), Schema.Null])),
});
export type AnalyticsGetStats200 = {
  readonly volumeHistory: ReadonlyArray<{ readonly date: string; readonly email: number }>;
};
export const AnalyticsGetStats200 = /* @__PURE__ */ Schema.Struct({
  volumeHistory: Schema.Array(
    Schema.Struct({
      date: Schema.String,
      email: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  ),
});
export type AnalyticsGetStats400 = AnalyticsQueryError;
export const AnalyticsGetStats400 = AnalyticsQueryError;
export type AnalyticsGetStats401 = UnauthorizedError;
export const AnalyticsGetStats401 = UnauthorizedError;
export type AnalyticsGetStats403 = ForbiddenError;
export const AnalyticsGetStats403 = ForbiddenError;
export type AnalyticsGetStats422 = ValidationError;
export const AnalyticsGetStats422 = ValidationError;
export type AnalyticsGetStats500 = InternalError;
export const AnalyticsGetStats500 = InternalError;
export type AnalyticsGetStats504 = GatewayTimeoutError;
export const AnalyticsGetStats504 = GatewayTimeoutError;
export type AnalyticsGetTopContactsQuery = {
  readonly after?: __SamvaRuntimeAbsoluteInstant | null;
  readonly before?: __SamvaRuntimeAbsoluteInstant | null;
  readonly limit?: number | null;
  readonly sortBy?: "sent" | "received" | "total" | null;
};
export const AnalyticsGetTopContactsQuery = /* @__PURE__ */ Schema.Struct({
  after: Schema.optionalKey(Schema.Union([__SamvaRuntimeAbsoluteInstant, Schema.Null])),
  before: Schema.optionalKey(Schema.Union([__SamvaRuntimeAbsoluteInstant, Schema.Null])),
  limit: Schema.optionalKey(
    Schema.Union([
      Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isLessThanOrEqualTo(100).annotate({
            expected: "a value less than or equal to 100",
          }),
        )
        .check(Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" })),
      Schema.Null,
    ]),
  ),
  sortBy: Schema.optionalKey(
    Schema.Union([
      Schema.Union([Schema.Literal("sent"), Schema.Literal("received"), Schema.Literal("total")]),
      Schema.Null,
    ]),
  ),
});
export type AnalyticsGetTopContacts200 = ReadonlyArray<{
  readonly id: string;
  readonly name: string | null;
  readonly email: string | null;
  readonly phone: string | null;
  readonly messageCount: number;
}>;
export const AnalyticsGetTopContacts200 = /* @__PURE__ */ Schema.Array(
  Schema.Struct({
    id: Schema.String,
    name: Schema.Union([Schema.String, Schema.Null]),
    email: Schema.Union([Schema.String, Schema.Null]),
    phone: Schema.Union([Schema.String, Schema.Null]),
    messageCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
);
export type AnalyticsGetTopContacts400 = AnalyticsQueryError;
export const AnalyticsGetTopContacts400 = AnalyticsQueryError;
export type AnalyticsGetTopContacts401 = UnauthorizedError;
export const AnalyticsGetTopContacts401 = UnauthorizedError;
export type AnalyticsGetTopContacts403 = ForbiddenError;
export const AnalyticsGetTopContacts403 = ForbiddenError;
export type AnalyticsGetTopContacts422 = ValidationError;
export const AnalyticsGetTopContacts422 = ValidationError;
export type AnalyticsGetTopContacts500 = InternalError;
export const AnalyticsGetTopContacts500 = InternalError;
export type AnalyticsGetTopContacts504 = GatewayTimeoutError;
export const AnalyticsGetTopContacts504 = GatewayTimeoutError;

export class AnalyticsGroup extends HttpApiGroup.make("Analytics")
  .add(
    HttpApiEndpoint.get("analyticsGetChannelStats", "/v1/analytics/channel-stats", {
      query: AnalyticsGetChannelStatsQuery,
      success: AnalyticsGetChannelStats200,
      error: [
        AnalyticsGetChannelStats400.pipe(HttpApiSchema.status(400)),
        AnalyticsGetChannelStats401.pipe(HttpApiSchema.status(401)),
        AnalyticsGetChannelStats403.pipe(HttpApiSchema.status(403)),
        AnalyticsGetChannelStats422.pipe(HttpApiSchema.status(422)),
        AnalyticsGetChannelStats500,
        AnalyticsGetChannelStats504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "analytics.getChannelStats")
      .annotate(OpenApi.Summary, "Get channel performance analytics")
      .annotate(
        OpenApi.Description,
        "Returns aggregate delivery metrics plus unique-message email Open and Click rates over the selected date range. `sent` counts every outbound message accepted in the range; each rate is taken over the messages the channel actually attempted, so one still waiting to be sent neither helps nor hurts it. Each engagement rate uses the corresponding tracking-eligible delivered-message cohort; repeated provider observations do not inflate the numerator.",
      ),
    HttpApiEndpoint.get("analyticsGetDeliveryMetrics", "/v1/analytics/delivery-metrics", {
      query: AnalyticsGetDeliveryMetricsQuery,
      success: AnalyticsGetDeliveryMetrics200,
      error: [
        AnalyticsGetDeliveryMetrics400.pipe(HttpApiSchema.status(400)),
        AnalyticsGetDeliveryMetrics401.pipe(HttpApiSchema.status(401)),
        AnalyticsGetDeliveryMetrics403.pipe(HttpApiSchema.status(403)),
        AnalyticsGetDeliveryMetrics422.pipe(HttpApiSchema.status(422)),
        AnalyticsGetDeliveryMetrics500,
        AnalyticsGetDeliveryMetrics504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "analytics.getDeliveryMetrics")
      .annotate(OpenApi.Summary, "Get message delivery metrics")
      .annotate(
        OpenApi.Description,
        "Returns delivered, failed, and pending rates plus average delivery time for the outbound messages accepted in the selected date range, optionally filtered by channel. Every accepted message falls into exactly one of the three, so they always sum to 100%: a complaint counts as delivered because the message arrived, a bounce counts as failed, and anything the provider has not resolved yet counts as pending. Mail your organization received is not rated here.",
      ),
    HttpApiEndpoint.post("analyticsExportData", "/v1/analytics/export", {
      payload: AnalyticsExportDataRequestJson,
      success: AnalyticsExportData200,
      error: [
        AnalyticsExportData400.pipe(HttpApiSchema.status(400)),
        AnalyticsExportData401.pipe(HttpApiSchema.status(401)),
        AnalyticsExportData403.pipe(HttpApiSchema.status(403)),
        AnalyticsExportData422.pipe(HttpApiSchema.status(422)),
        AnalyticsExportData500,
        AnalyticsExportData504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "analytics.exportData")
      .annotate(OpenApi.Summary, "Export messaging analytics data")
      .annotate(
        OpenApi.Description,
        "Exports one record per outbound message accepted in the given date range as CSV or JSON and returns the file content inline. CSV follows RFC 4180: fields containing a quote, comma, or line break are quoted with embedded quotes doubled, and records are separated by CRLF. At most 10,000 records are returned, newest first.",
      ),
    HttpApiEndpoint.get("analyticsGetHourlyDistribution", "/v1/analytics/hourly-distribution", {
      query: AnalyticsGetHourlyDistributionQuery,
      success: AnalyticsGetHourlyDistribution200,
      error: [
        AnalyticsGetHourlyDistribution400.pipe(HttpApiSchema.status(400)),
        AnalyticsGetHourlyDistribution401.pipe(HttpApiSchema.status(401)),
        AnalyticsGetHourlyDistribution403.pipe(HttpApiSchema.status(403)),
        AnalyticsGetHourlyDistribution422.pipe(HttpApiSchema.status(422)),
        AnalyticsGetHourlyDistribution500,
        AnalyticsGetHourlyDistribution504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "analytics.getHourlyDistribution")
      .annotate(OpenApi.Summary, "Get hourly message distribution")
      .annotate(
        OpenApi.Description,
        "Returns outbound message counts over the half-open selected instant range, bucketed by organization-local hour. Empty ranges return no rows; non-empty ranges include all 24 hours.",
      ),
    HttpApiEndpoint.get("analyticsGetStats", "/v1/analytics/stats", {
      query: AnalyticsGetStatsQuery,
      success: AnalyticsGetStats200,
      error: [
        AnalyticsGetStats400.pipe(HttpApiSchema.status(400)),
        AnalyticsGetStats401.pipe(HttpApiSchema.status(401)),
        AnalyticsGetStats403.pipe(HttpApiSchema.status(403)),
        AnalyticsGetStats422.pipe(HttpApiSchema.status(422)),
        AnalyticsGetStats500,
        AnalyticsGetStats504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "analytics.getStats")
      .annotate(OpenApi.Summary, "Get message volume analytics")
      .annotate(
        OpenApi.Description,
        "Returns outbound message counts over the half-open selected instant range, grouped by organization-local calendar day, week, or month. A range with traffic returns every bucket in it, including the ones that saw none; a range with no outbound traffic at all returns no buckets. A range with no `before` runs through the current instant, so its quiet trailing buckets are reported as zero.",
      ),
    HttpApiEndpoint.get("analyticsGetTopContacts", "/v1/analytics/top-contacts", {
      query: AnalyticsGetTopContactsQuery,
      success: AnalyticsGetTopContacts200,
      error: [
        AnalyticsGetTopContacts400.pipe(HttpApiSchema.status(400)),
        AnalyticsGetTopContacts401.pipe(HttpApiSchema.status(401)),
        AnalyticsGetTopContacts403.pipe(HttpApiSchema.status(403)),
        AnalyticsGetTopContacts422.pipe(HttpApiSchema.status(422)),
        AnalyticsGetTopContacts500,
        AnalyticsGetTopContacts504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "analytics.getTopContacts")
      .annotate(OpenApi.Summary, "List top contacts by message volume")
      .annotate(
        OpenApi.Description,
        "Returns the contacts your organization exchanged the most messages with over the selected date range. `sortBy` chooses the traffic `messageCount` reports and ranks by: `sent` counts outbound messages addressed to the contact, `received` counts inbound messages the contact sent you, and `total` (the default) counts both. Contacts with no traffic in the range are omitted, and at most 100 are returned.",
      ),
  )
  .annotate(
    OpenApi.Description,
    "Messaging analytics, channel stats, and data export. Every date range is half-open — `after` inclusive, `before` exclusive — and may span at most 366 days. Both bounds are absolute ISO-8601 instants carrying `Z` or a numeric offset; a bare calendar date is rejected, because reading it as UTC midnight would shift every bucket for an organization outside UTC. `AnalyticsQueryError` refuses a longer span and a `before` sent without an `after`, which bounds nothing. Omitting both bounds reports the organization's whole history. Calendar buckets follow the organization's timezone.",
  ) {}
