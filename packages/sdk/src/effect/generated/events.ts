// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  BillingProviderError,
  ConflictError,
  ContactEvent,
  ContactEventReference,
  CreateEventPayload,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  JsonObject,
  PaymentRequiredError,
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type BatchEventsResult = {
  readonly total: number;
  readonly accepted: number;
  readonly errors: number;
  readonly results: ReadonlyArray<{
    readonly index: number;
    readonly status: "accepted" | "error";
    readonly event?: ContactEvent | null;
    readonly error?: string | null;
  }>;
};
export const BatchEventsResult = /* @__PURE__ */ (() =>
  Schema.Struct({
    total: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    accepted: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    errors: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    results: Schema.Array(
      Schema.Struct({
        index: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        status: Schema.Union([Schema.Literal("accepted"), Schema.Literal("error")]),
        event: Schema.optionalKey(Schema.Union([ContactEvent, Schema.Null])),
        error: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      }),
    ),
  }).annotate({ identifier: "BatchEventsResult" }))();
export type EventsCreateHeaders = { readonly "idempotency-key"?: string | null };
export const EventsCreateHeaders = /* @__PURE__ */ (() =>
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
export type EventsCreateRequestJson = {
  readonly contact: ContactEventReference;
  readonly name: string;
  readonly properties?: JsonObject | null;
  readonly occurredAt?: string | null;
};
export const EventsCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    contact: ContactEventReference,
    name: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
      )
      .check(Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }))
      .check(
        Schema.isPattern(
          new RegExp(
            "^(?!(?:[Cc][Oo][Nn][Tt][Aa][Cc][Tt]|[Ss][Aa][Mm][Vv][Aa])\\.)[A-Za-z][A-Za-z0-9_.-]*$",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!(?:[Cc][Oo][Nn][Tt][Aa][Cc][Tt]|[Ss][Aa][Mm][Vv][Aa])\\.)[A-Za-z][A-Za-z0-9_.-]*$",
        }),
      ),
    properties: Schema.optionalKey(Schema.Union([JsonObject, Schema.Null])),
    occurredAt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type EventsCreate200 = ContactEvent;
export const EventsCreate200 = ContactEvent;
export type EventsCreate401 = UnauthorizedError;
export const EventsCreate401 = UnauthorizedError;
export type EventsCreate402 = PaymentRequiredError;
export const EventsCreate402 = PaymentRequiredError;
export type EventsCreate403 = ForbiddenError;
export const EventsCreate403 = ForbiddenError;
export type EventsCreate404 = ResourceNotFoundError;
export const EventsCreate404 = ResourceNotFoundError;
export type EventsCreate409 = ConflictError;
export const EventsCreate409 = ConflictError;
export type EventsCreate422 = ValidationError;
export const EventsCreate422 = ValidationError;
export type EventsCreate500 = InternalError;
export const EventsCreate500 = InternalError;
export type EventsCreate502 = BillingProviderError;
export const EventsCreate502 = BillingProviderError;
export type EventsCreate504 = GatewayTimeoutError;
export const EventsCreate504 = GatewayTimeoutError;
export type EventsBatchHeaders = { readonly "idempotency-key"?: string | null };
export const EventsBatchHeaders = /* @__PURE__ */ (() =>
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
export type EventsBatchRequestJson = {
  readonly events: readonly [CreateEventPayload, ...Array<CreateEventPayload>];
};
export const EventsBatchRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    events: Schema.TupleWithRest(Schema.Tuple([CreateEventPayload]), [CreateEventPayload]).check(
      Schema.isMaxLength(100).annotate({ expected: "a value with a length of at most 100" }),
    ),
  }))();
export type EventsBatch200 = BatchEventsResult;
export const EventsBatch200 = BatchEventsResult;
export type EventsBatch401 = UnauthorizedError;
export const EventsBatch401 = UnauthorizedError;
export type EventsBatch403 = ForbiddenError;
export const EventsBatch403 = ForbiddenError;
export type EventsBatch404 = ResourceNotFoundError;
export const EventsBatch404 = ResourceNotFoundError;
export type EventsBatch422 = ValidationError;
export const EventsBatch422 = ValidationError;
export type EventsBatch500 = InternalError;
export const EventsBatch500 = InternalError;
export type EventsBatch504 = GatewayTimeoutError;
export const EventsBatch504 = GatewayTimeoutError;

export class EventsGroup extends HttpApiGroup.make("Events")
  .add(
    HttpApiEndpoint.post("eventsCreate", "/v1/events", {
      headers: EventsCreateHeaders,
      payload: EventsCreateRequestJson,
      success: EventsCreate200,
      error: [
        EventsCreate401.pipe(HttpApiSchema.status(401)),
        EventsCreate402.pipe(HttpApiSchema.status(402)),
        EventsCreate403.pipe(HttpApiSchema.status(403)),
        EventsCreate404.pipe(HttpApiSchema.status(404)),
        EventsCreate409.pipe(HttpApiSchema.status(409)),
        EventsCreate422.pipe(HttpApiSchema.status(422)),
        EventsCreate500,
        EventsCreate502.pipe(HttpApiSchema.status(502)),
        EventsCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "events.create")
      .annotate(OpenApi.Summary, "Record a contact event")
      .annotate(
        OpenApi.Description,
        "Records a custom contact event. Identify the contact by exactly one ID, external ID, or email. A missing email or external ID creates a contact; an unknown contact ID returns 404. An organization-scoped idempotency key replays the original event. Event names use letters, digits, underscores, hyphens, and dots, up to 255 characters; contact. and samva. prefixes are reserved. Properties allow at most 50 keys and 32 KiB of UTF-8 JSON. Events are retained for 90 days.",
      ),
    HttpApiEndpoint.post("eventsBatch", "/v1/events/batch", {
      headers: EventsBatchHeaders,
      payload: EventsBatchRequestJson,
      success: EventsBatch200,
      error: [
        EventsBatch401.pipe(HttpApiSchema.status(401)),
        EventsBatch403.pipe(HttpApiSchema.status(403)),
        EventsBatch404.pipe(HttpApiSchema.status(404)),
        EventsBatch422.pipe(HttpApiSchema.status(422)),
        EventsBatch500,
        EventsBatch504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "events.batch")
      .annotate(OpenApi.Summary, "Record contact events in a batch")
      .annotate(
        OpenApi.Description,
        "Validates the full request shape, contact references, and event names before processing. A schema failure rejects the entire batch without writes. Between 1 and 100 valid entries are then processed in input order, with independent indexed results for properties limits, contact resolution, and domain validation. An optional Idempotency-Key header scopes the batch; retries reuse each entry's original receipt by its position in the batch.",
      ),
  )
  .annotate(OpenApi.Description, "Custom contact event ingestion") {}
