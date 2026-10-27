// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  ContactEvent,
  ContactId,
  Cursor,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type ContactEventPage = {
  readonly items: ReadonlyArray<ContactEvent>;
  readonly nextCursor: string | null;
};
export const ContactEventPage = /* @__PURE__ */ Schema.Struct({
  items: Schema.Array(ContactEvent),
  nextCursor: Schema.Union([Schema.String, Schema.Null]),
}).annotate({ identifier: "ContactEventPage" });
export type ContactEventsListEventsPathParams = { readonly id: ContactId };
export const ContactEventsListEventsPathParams = /* @__PURE__ */ Schema.Struct({ id: ContactId });
export type ContactEventsListEventsQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
};
export const ContactEventsListEventsQuery = /* @__PURE__ */ Schema.Struct({
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
export type ContactEventsListEvents200 = ContactEventPage;
export const ContactEventsListEvents200 = ContactEventPage;
export type ContactEventsListEvents401 = UnauthorizedError;
export const ContactEventsListEvents401 = UnauthorizedError;
export type ContactEventsListEvents403 = ForbiddenError;
export const ContactEventsListEvents403 = ForbiddenError;
export type ContactEventsListEvents404 = ResourceNotFoundError;
export const ContactEventsListEvents404 = ResourceNotFoundError;
export type ContactEventsListEvents422 = ValidationError;
export const ContactEventsListEvents422 = ValidationError;
export type ContactEventsListEvents500 = InternalError;
export const ContactEventsListEvents500 = InternalError;
export type ContactEventsListEvents504 = GatewayTimeoutError;
export const ContactEventsListEvents504 = GatewayTimeoutError;

export class ContactEventsGroup extends HttpApiGroup.make("Contact events")
  .add(
    HttpApiEndpoint.get("contactEventsListEvents", "/v1/contacts/:id/events", {
      params: ContactEventsListEventsPathParams,
      query: ContactEventsListEventsQuery,
      success: ContactEventsListEvents200,
      error: [
        ContactEventsListEvents401.pipe(HttpApiSchema.status(401)),
        ContactEventsListEvents403.pipe(HttpApiSchema.status(403)),
        ContactEventsListEvents404.pipe(HttpApiSchema.status(404)),
        ContactEventsListEvents422.pipe(HttpApiSchema.status(422)),
        ContactEventsListEvents500,
        ContactEventsListEvents504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contactEvents.listEvents")
      .annotate(OpenApi.Summary, "List contact events")
      .annotate(
        OpenApi.Description,
        "Returns custom and Samva lifecycle events, newest occurrence first, within the 90-day retention window. Pass nextCursor back as cursor for the next page.",
      ),
  )
  .annotate(OpenApi.Description, "A contact's custom and lifecycle event timeline") {}
