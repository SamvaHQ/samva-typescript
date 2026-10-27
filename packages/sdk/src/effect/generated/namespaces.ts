// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  ConflictError,
  Cursor,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  NamespaceId,
  NamespaceMetadata,
  NamespaceResourceType,
  ResourceNotFoundError,
  SuccessResponse,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type NamespaceSummary = {
  readonly id: NamespaceId;
  readonly name: string;
  readonly createdAt: string;
};
export const NamespaceSummary = /* @__PURE__ */ Schema.Struct({
  id: NamespaceId,
  name: Schema.String,
  createdAt: Schema.String,
}).annotate({ identifier: "NamespaceSummary" });
export type NamespaceUsage = {
  readonly namespaceId: NamespaceId;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly emailCount: number;
  readonly totalMessages: number;
};
export const NamespaceUsage = /* @__PURE__ */ Schema.Struct({
  namespaceId: NamespaceId,
  periodStart: Schema.String,
  periodEnd: Schema.String,
  emailCount: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
  totalMessages: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
}).annotate({ identifier: "NamespaceUsage" });
export type Namespace = {
  readonly id: NamespaceId;
  readonly name: string;
  readonly createdAt: string;
  readonly metadata: NamespaceMetadata;
  readonly updatedAt: string;
};
export const Namespace = /* @__PURE__ */ Schema.Struct({
  id: NamespaceId,
  name: Schema.String,
  createdAt: Schema.String,
  metadata: NamespaceMetadata,
  updatedAt: Schema.String,
}).annotate({ identifier: "Namespace" });
export type NamespaceResource = {
  readonly type: NamespaceResourceType;
  readonly id: string;
  readonly namespaceId: NamespaceId | null;
};
export const NamespaceResource = /* @__PURE__ */ Schema.Struct({
  type: NamespaceResourceType,
  id: Schema.String,
  namespaceId: Schema.Union([NamespaceId, Schema.Null]),
}).annotate({ identifier: "NamespaceResource" });
export type NamespacePage = {
  readonly items: ReadonlyArray<NamespaceSummary>;
  readonly nextCursor: string | null;
};
export const NamespacePage = /* @__PURE__ */ Schema.Struct({
  items: Schema.Array(NamespaceSummary),
  nextCursor: Schema.Union([Schema.String, Schema.Null]),
}).annotate({ identifier: "NamespacePage" });
export type NamespacesListQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
  readonly after?: string | null;
  readonly before?: string | null;
};
export const NamespacesListQuery = /* @__PURE__ */ Schema.Struct({
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
export type NamespacesList200 = NamespacePage;
export const NamespacesList200 = NamespacePage;
export type NamespacesList401 = UnauthorizedError;
export const NamespacesList401 = UnauthorizedError;
export type NamespacesList403 = ForbiddenError;
export const NamespacesList403 = ForbiddenError;
export type NamespacesList422 = ValidationError;
export const NamespacesList422 = ValidationError;
export type NamespacesList500 = InternalError;
export const NamespacesList500 = InternalError;
export type NamespacesList504 = GatewayTimeoutError;
export const NamespacesList504 = GatewayTimeoutError;
export type NamespacesCreateRequestJson = {
  readonly name: string;
  readonly metadata?: NamespaceMetadata | null;
};
export const NamespacesCreateRequestJson = /* @__PURE__ */ Schema.Struct({
  name: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(128).annotate({ expected: "a string with at most 128 code points" }),
    )
    .check(
      Schema.isPattern(new RegExp("^\\S[\\s\\S]*\\S$|^\\S$|^$", "u")).annotate({
        expected: "a string matching the RegExp ^\\S[\\s\\S]*\\S$|^\\S$|^$",
      }),
    )
    .check(Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" })),
  metadata: Schema.optionalKey(Schema.Union([NamespaceMetadata, Schema.Null])),
});
export type NamespacesCreate201 = Namespace;
export const NamespacesCreate201 = Namespace;
export type NamespacesCreate401 = UnauthorizedError;
export const NamespacesCreate401 = UnauthorizedError;
export type NamespacesCreate403 = ForbiddenError;
export const NamespacesCreate403 = ForbiddenError;
export type NamespacesCreate409 = ConflictError;
export const NamespacesCreate409 = ConflictError;
export type NamespacesCreate422 = ValidationError;
export const NamespacesCreate422 = ValidationError;
export type NamespacesCreate500 = InternalError;
export const NamespacesCreate500 = InternalError;
export type NamespacesCreate504 = GatewayTimeoutError;
export const NamespacesCreate504 = GatewayTimeoutError;
export type NamespacesGetPathParams = { readonly id: NamespaceId };
export const NamespacesGetPathParams = /* @__PURE__ */ Schema.Struct({ id: NamespaceId });
export type NamespacesGet200 = Namespace;
export const NamespacesGet200 = Namespace;
export type NamespacesGet401 = UnauthorizedError;
export const NamespacesGet401 = UnauthorizedError;
export type NamespacesGet403 = ForbiddenError;
export const NamespacesGet403 = ForbiddenError;
export type NamespacesGet404 = ResourceNotFoundError;
export const NamespacesGet404 = ResourceNotFoundError;
export type NamespacesGet422 = ValidationError;
export const NamespacesGet422 = ValidationError;
export type NamespacesGet500 = InternalError;
export const NamespacesGet500 = InternalError;
export type NamespacesGet504 = GatewayTimeoutError;
export const NamespacesGet504 = GatewayTimeoutError;
export type NamespacesRemovePathParams = { readonly id: NamespaceId };
export const NamespacesRemovePathParams = /* @__PURE__ */ Schema.Struct({ id: NamespaceId });
export type NamespacesRemove200 = SuccessResponse;
export const NamespacesRemove200 = SuccessResponse;
export type NamespacesRemove401 = UnauthorizedError;
export const NamespacesRemove401 = UnauthorizedError;
export type NamespacesRemove403 = ForbiddenError;
export const NamespacesRemove403 = ForbiddenError;
export type NamespacesRemove404 = ResourceNotFoundError;
export const NamespacesRemove404 = ResourceNotFoundError;
export type NamespacesRemove409 = ConflictError;
export const NamespacesRemove409 = ConflictError;
export type NamespacesRemove422 = ValidationError;
export const NamespacesRemove422 = ValidationError;
export type NamespacesRemove500 = InternalError;
export const NamespacesRemove500 = InternalError;
export type NamespacesRemove504 = GatewayTimeoutError;
export const NamespacesRemove504 = GatewayTimeoutError;
export type NamespacesUpdatePathParams = { readonly id: NamespaceId };
export const NamespacesUpdatePathParams = /* @__PURE__ */ Schema.Struct({ id: NamespaceId });
export type NamespacesUpdateRequestJson = {
  readonly name?: string | null;
  readonly metadata?: { readonly [x: string]: string | null } | null;
};
export const NamespacesUpdateRequestJson = /* @__PURE__ */ Schema.Struct({
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(new RegExp("^\\S[\\s\\S]*\\S$|^\\S$|^$", "u")).annotate({
            expected: "a string matching the RegExp ^\\S[\\s\\S]*\\S$|^\\S$|^$",
          }),
        )
        .check(
          Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" }),
        ),
      Schema.Null,
    ]),
  ),
  metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Union([Schema.String, Schema.Null])),
      Schema.Null,
    ]),
  ),
});
export type NamespacesUpdate200 = Namespace;
export const NamespacesUpdate200 = Namespace;
export type NamespacesUpdate401 = UnauthorizedError;
export const NamespacesUpdate401 = UnauthorizedError;
export type NamespacesUpdate403 = ForbiddenError;
export const NamespacesUpdate403 = ForbiddenError;
export type NamespacesUpdate404 = ResourceNotFoundError;
export const NamespacesUpdate404 = ResourceNotFoundError;
export type NamespacesUpdate409 = ConflictError;
export const NamespacesUpdate409 = ConflictError;
export type NamespacesUpdate422 = ValidationError;
export const NamespacesUpdate422 = ValidationError;
export type NamespacesUpdate500 = InternalError;
export const NamespacesUpdate500 = InternalError;
export type NamespacesUpdate504 = GatewayTimeoutError;
export const NamespacesUpdate504 = GatewayTimeoutError;
export type NamespacesAssignResourcePathParams = { readonly id: NamespaceId };
export const NamespacesAssignResourcePathParams = /* @__PURE__ */ Schema.Struct({
  id: NamespaceId,
});
export type NamespacesAssignResourceRequestJson = {
  readonly type: NamespaceResourceType;
  readonly resourceId: string;
};
export const NamespacesAssignResourceRequestJson = /* @__PURE__ */ Schema.Struct({
  type: NamespaceResourceType,
  resourceId: Schema.String.annotate({
    description: "The resource's id, such as `dom_...` for a domain.",
  }),
});
export type NamespacesAssignResource200 = NamespaceResource;
export const NamespacesAssignResource200 = NamespaceResource;
export type NamespacesAssignResource401 = UnauthorizedError;
export const NamespacesAssignResource401 = UnauthorizedError;
export type NamespacesAssignResource403 = ForbiddenError;
export const NamespacesAssignResource403 = ForbiddenError;
export type NamespacesAssignResource404 = ResourceNotFoundError;
export const NamespacesAssignResource404 = ResourceNotFoundError;
export type NamespacesAssignResource409 = ConflictError;
export const NamespacesAssignResource409 = ConflictError;
export type NamespacesAssignResource422 = ValidationError;
export const NamespacesAssignResource422 = ValidationError;
export type NamespacesAssignResource500 = InternalError;
export const NamespacesAssignResource500 = InternalError;
export type NamespacesAssignResource504 = GatewayTimeoutError;
export const NamespacesAssignResource504 = GatewayTimeoutError;
export type NamespacesRemoveResourcePathParams = {
  readonly id: NamespaceId;
  readonly type: NamespaceResourceType;
  readonly resourceId: string;
};
export const NamespacesRemoveResourcePathParams = /* @__PURE__ */ Schema.Struct({
  id: NamespaceId,
  type: NamespaceResourceType,
  resourceId: Schema.String,
});
export type NamespacesRemoveResource200 = NamespaceResource;
export const NamespacesRemoveResource200 = NamespaceResource;
export type NamespacesRemoveResource401 = UnauthorizedError;
export const NamespacesRemoveResource401 = UnauthorizedError;
export type NamespacesRemoveResource403 = ForbiddenError;
export const NamespacesRemoveResource403 = ForbiddenError;
export type NamespacesRemoveResource404 = ResourceNotFoundError;
export const NamespacesRemoveResource404 = ResourceNotFoundError;
export type NamespacesRemoveResource409 = ConflictError;
export const NamespacesRemoveResource409 = ConflictError;
export type NamespacesRemoveResource422 = ValidationError;
export const NamespacesRemoveResource422 = ValidationError;
export type NamespacesRemoveResource500 = InternalError;
export const NamespacesRemoveResource500 = InternalError;
export type NamespacesRemoveResource504 = GatewayTimeoutError;
export const NamespacesRemoveResource504 = GatewayTimeoutError;
export type NamespacesGetUsagePathParams = { readonly id: NamespaceId };
export const NamespacesGetUsagePathParams = /* @__PURE__ */ Schema.Struct({ id: NamespaceId });
export type NamespacesGetUsageQuery = {
  readonly after?: string | null;
  readonly before?: string | null;
};
export const NamespacesGetUsageQuery = /* @__PURE__ */ Schema.Struct({
  after: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  before: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
});
export type NamespacesGetUsage200 = NamespaceUsage;
export const NamespacesGetUsage200 = NamespaceUsage;
export type NamespacesGetUsage401 = UnauthorizedError;
export const NamespacesGetUsage401 = UnauthorizedError;
export type NamespacesGetUsage403 = ForbiddenError;
export const NamespacesGetUsage403 = ForbiddenError;
export type NamespacesGetUsage404 = ResourceNotFoundError;
export const NamespacesGetUsage404 = ResourceNotFoundError;
export type NamespacesGetUsage422 = ValidationError;
export const NamespacesGetUsage422 = ValidationError;
export type NamespacesGetUsage500 = InternalError;
export const NamespacesGetUsage500 = InternalError;
export type NamespacesGetUsage504 = GatewayTimeoutError;
export const NamespacesGetUsage504 = GatewayTimeoutError;

export class NamespacesGroup extends HttpApiGroup.make("Namespaces")
  .add(
    HttpApiEndpoint.get("namespacesList", "/v1/namespaces", {
      query: NamespacesListQuery,
      success: NamespacesList200,
      error: [
        NamespacesList401.pipe(HttpApiSchema.status(401)),
        NamespacesList403.pipe(HttpApiSchema.status(403)),
        NamespacesList422.pipe(HttpApiSchema.status(422)),
        NamespacesList500,
        NamespacesList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "namespaces.list")
      .annotate(OpenApi.Summary, "List namespaces")
      .annotate(
        OpenApi.Description,
        "Returns namespace summaries, newest first, filterable by creation time (`after`, `before`). Pass `nextCursor` back as `cursor` for the next page; it is null on the last page. Read a namespace's metadata with `GET /v1/namespaces/{id}`.",
      ),
    HttpApiEndpoint.post("namespacesCreate", "/v1/namespaces", {
      payload: NamespacesCreateRequestJson,
      success: NamespacesCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        NamespacesCreate401.pipe(HttpApiSchema.status(401)),
        NamespacesCreate403.pipe(HttpApiSchema.status(403)),
        NamespacesCreate409.pipe(HttpApiSchema.status(409)),
        NamespacesCreate422.pipe(HttpApiSchema.status(422)),
        NamespacesCreate500,
        NamespacesCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "namespaces.create")
      .annotate(OpenApi.Summary, "Create a namespace")
      .annotate(
        OpenApi.Description,
        "Creates a namespace with status 201. Names are unique within the organization; a duplicate conflicts.",
      ),
    HttpApiEndpoint.get("namespacesGet", "/v1/namespaces/:id", {
      params: NamespacesGetPathParams,
      success: NamespacesGet200,
      error: [
        NamespacesGet401.pipe(HttpApiSchema.status(401)),
        NamespacesGet403.pipe(HttpApiSchema.status(403)),
        NamespacesGet404.pipe(HttpApiSchema.status(404)),
        NamespacesGet422.pipe(HttpApiSchema.status(422)),
        NamespacesGet500,
        NamespacesGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "namespaces.get")
      .annotate(OpenApi.Summary, "Get a namespace")
      .annotate(OpenApi.Description, "Returns one namespace."),
    HttpApiEndpoint.delete("namespacesRemove", "/v1/namespaces/:id", {
      params: NamespacesRemovePathParams,
      success: NamespacesRemove200,
      error: [
        NamespacesRemove401.pipe(HttpApiSchema.status(401)),
        NamespacesRemove403.pipe(HttpApiSchema.status(403)),
        NamespacesRemove404.pipe(HttpApiSchema.status(404)),
        NamespacesRemove409.pipe(HttpApiSchema.status(409)),
        NamespacesRemove422.pipe(HttpApiSchema.status(422)),
        NamespacesRemove500,
        NamespacesRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "namespaces.remove")
      .annotate(OpenApi.Summary, "Delete a namespace")
      .annotate(
        OpenApi.Description,
        "Deletes an empty namespace. A namespace that still holds anything conflicts, and the error counts what remains: mailboxes, API keys, webhook endpoints filtered to it, domains, senders, contacts, or template projects. Delete each, or return it to organization level with `DELETE /v1/namespaces/{id}/resources/{type}/{resourceId}`; mailboxes, keys, and webhook endpoints cannot move and are deleted. Messages keep the namespace they ran in.",
      ),
    HttpApiEndpoint.patch("namespacesUpdate", "/v1/namespaces/:id", {
      params: NamespacesUpdatePathParams,
      payload: NamespacesUpdateRequestJson,
      success: NamespacesUpdate200,
      error: [
        NamespacesUpdate401.pipe(HttpApiSchema.status(401)),
        NamespacesUpdate403.pipe(HttpApiSchema.status(403)),
        NamespacesUpdate404.pipe(HttpApiSchema.status(404)),
        NamespacesUpdate409.pipe(HttpApiSchema.status(409)),
        NamespacesUpdate422.pipe(HttpApiSchema.status(422)),
        NamespacesUpdate500,
        NamespacesUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "namespaces.update")
      .annotate(OpenApi.Summary, "Update a namespace")
      .annotate(
        OpenApi.Description,
        "Updates the fields you name and keeps the rest. `metadata` merges into the stored metadata by key, and a `null` value deletes that key.",
      ),
    HttpApiEndpoint.post("namespacesAssignResource", "/v1/namespaces/:id/resources", {
      params: NamespacesAssignResourcePathParams,
      payload: NamespacesAssignResourceRequestJson,
      success: NamespacesAssignResource200,
      error: [
        NamespacesAssignResource401.pipe(HttpApiSchema.status(401)),
        NamespacesAssignResource403.pipe(HttpApiSchema.status(403)),
        NamespacesAssignResource404.pipe(HttpApiSchema.status(404)),
        NamespacesAssignResource409.pipe(HttpApiSchema.status(409)),
        NamespacesAssignResource422.pipe(HttpApiSchema.status(422)),
        NamespacesAssignResource500,
        NamespacesAssignResource504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "namespaces.assignResource")
      .annotate(OpenApi.Summary, "Move a resource into a namespace")
      .annotate(
        OpenApi.Description,
        "Moves a resource from organization level or another namespace into this one. A domain brings its senders; a sender on a domain cannot move alone (assign the domain); a contact brings its identities; a template brings every template in its project. A moved resource stops being a default. An address or external id the namespace already holds conflicts. Keys scoped to the old namespace stop reaching the resource at once. Mailboxes, API keys, and webhook endpoints keep the namespace they were created in.",
      ),
    HttpApiEndpoint.delete(
      "namespacesRemoveResource",
      "/v1/namespaces/:id/resources/:type/:resourceId",
      {
        params: NamespacesRemoveResourcePathParams,
        success: NamespacesRemoveResource200,
        error: [
          NamespacesRemoveResource401.pipe(HttpApiSchema.status(401)),
          NamespacesRemoveResource403.pipe(HttpApiSchema.status(403)),
          NamespacesRemoveResource404.pipe(HttpApiSchema.status(404)),
          NamespacesRemoveResource409.pipe(HttpApiSchema.status(409)),
          NamespacesRemoveResource422.pipe(HttpApiSchema.status(422)),
          NamespacesRemoveResource500,
          NamespacesRemoveResource504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "namespaces.removeResource")
      .annotate(OpenApi.Summary, "Return a resource to organization level")
      .annotate(
        OpenApi.Description,
        "Moves a resource out of this namespace to organization level, with what follows it as in `POST /v1/namespaces/{id}/resources`. A resource in a different namespace is not found.",
      ),
    HttpApiEndpoint.get("namespacesGetUsage", "/v1/namespaces/:id/usage", {
      params: NamespacesGetUsagePathParams,
      query: NamespacesGetUsageQuery,
      success: NamespacesGetUsage200,
      error: [
        NamespacesGetUsage401.pipe(HttpApiSchema.status(401)),
        NamespacesGetUsage403.pipe(HttpApiSchema.status(403)),
        NamespacesGetUsage404.pipe(HttpApiSchema.status(404)),
        NamespacesGetUsage422.pipe(HttpApiSchema.status(422)),
        NamespacesGetUsage500,
        NamespacesGetUsage504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "namespaces.getUsage")
      .annotate(OpenApi.Summary, "Get namespace usage")
      .annotate(
        OpenApi.Description,
        "Counts the messages the namespace sent and received in the window that count toward usage, by channel, with the same statuses as `GET /v1/organizations/usage`. A message counts toward the namespace it was sent or received in: that of the sender, mailbox, or key it used. The organization is billed for every namespace; read this to charge your own customer.",
      ),
  )
  .annotate(
    OpenApi.Description,
    "Sub-tenants that confine domains, senders, mailboxes, contacts, templates, and API keys inside an organization",
  ) {}
