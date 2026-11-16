// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  ConflictError,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  JsonObject,
  MalformedRequestError,
  NamespaceId,
  OrganizationId,
  ResourceNotFoundError,
  UnauthorizedError,
  UserId,
  ValidationError,
} from "./shared";

export type ApprovalRequestId = string & EffectBrand.Brand<"ApprovalRequestId">;
export const ApprovalRequestId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new globalThis.RegExp("^apr_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^apr_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "ApprovalRequestId",
    }),
  ).pipe(Schema.brand("ApprovalRequestId")))();
export type ApprovalCall = { readonly toolName: string; readonly arguments: JsonObject };
export const ApprovalCall = /* @__PURE__ */ (() =>
  Schema.Struct({
    toolName: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({ expected: "a string with at most 128 code points" }),
      )
      .check(
        Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" }),
      ),
    arguments: JsonObject,
  }).annotate({ identifier: "ApprovalCall" }))();
export type ApprovalRequest = {
  readonly id: ApprovalRequestId;
  readonly organizationId: OrganizationId;
  readonly namespaceId: NamespaceId | null;
  readonly clientId: string;
  readonly requestedBy: UserId;
  readonly intent: string;
  readonly calls: ReadonlyArray<ApprovalCall>;
  readonly status: "pending" | "executing" | "executed" | "rejected" | "failed" | "expired";
  readonly expiresAt: string;
  readonly createdAt: string;
  readonly decidedAt: string | null;
  readonly decidedBy: UserId | null;
  readonly reason: string | null;
  readonly results: ReadonlyArray<Schema.Json> | null;
  readonly error: string | null;
  readonly approvalUrl: string;
};
export const ApprovalRequest = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: ApprovalRequestId,
    organizationId: OrganizationId,
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
    clientId: Schema.String,
    requestedBy: UserId,
    intent: Schema.String,
    calls: Schema.Array(ApprovalCall)
      .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
      .check(Schema.isMaxLength(20).annotate({ expected: "a value with a length of at most 20" })),
    status: Schema.Union([
      Schema.Literal("pending"),
      Schema.Literal("executing"),
      Schema.Literal("executed"),
      Schema.Literal("rejected"),
      Schema.Literal("failed"),
      Schema.Literal("expired"),
    ]),
    expiresAt: Schema.String,
    createdAt: Schema.String,
    decidedAt: Schema.Union([Schema.String, Schema.Null]),
    decidedBy: Schema.Union([UserId, Schema.Null]),
    reason: Schema.Union([Schema.String, Schema.Null]),
    results: Schema.Union([
      Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
      Schema.Null,
    ]),
    error: Schema.Union([Schema.String, Schema.Null]),
    approvalUrl: Schema.String,
  }).annotate({ identifier: "ApprovalRequest" }))();
export type ApprovalRequestsCreateRequestJson = {
  readonly intent: string;
  readonly calls: ReadonlyArray<ApprovalCall>;
  readonly idempotencyKey: string;
};
export const ApprovalRequestsCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    intent: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(500).annotate({ expected: "a string with at most 500 code points" }),
      )
      .check(
        Schema.isMaxLength(500).annotate({ expected: "a value with a length of at most 500" }),
      ),
    calls: Schema.Array(ApprovalCall)
      .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
      .check(Schema.isMaxLength(20).annotate({ expected: "a value with a length of at most 20" })),
    idempotencyKey: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({ expected: "a string with at most 128 code points" }),
      )
      .check(
        Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" }),
      ),
  }))();
export type ApprovalRequestsCreate201 = ApprovalRequest;
export const ApprovalRequestsCreate201 = ApprovalRequest;
export type ApprovalRequestsCreate400 = MalformedRequestError;
export const ApprovalRequestsCreate400 = MalformedRequestError;
export type ApprovalRequestsCreate401 = UnauthorizedError;
export const ApprovalRequestsCreate401 = UnauthorizedError;
export type ApprovalRequestsCreate403 = ForbiddenError;
export const ApprovalRequestsCreate403 = ForbiddenError;
export type ApprovalRequestsCreate409 = ConflictError;
export const ApprovalRequestsCreate409 = ConflictError;
export type ApprovalRequestsCreate422 = ValidationError;
export const ApprovalRequestsCreate422 = ValidationError;
export type ApprovalRequestsCreate500 = InternalError;
export const ApprovalRequestsCreate500 = InternalError;
export type ApprovalRequestsCreate504 = GatewayTimeoutError;
export const ApprovalRequestsCreate504 = GatewayTimeoutError;
export type ApprovalRequestsGetPathParams = { readonly id: ApprovalRequestId };
export const ApprovalRequestsGetPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ApprovalRequestId }))();
export type ApprovalRequestsGet200 = ApprovalRequest;
export const ApprovalRequestsGet200 = ApprovalRequest;
export type ApprovalRequestsGet400 = MalformedRequestError;
export const ApprovalRequestsGet400 = MalformedRequestError;
export type ApprovalRequestsGet401 = UnauthorizedError;
export const ApprovalRequestsGet401 = UnauthorizedError;
export type ApprovalRequestsGet403 = ForbiddenError;
export const ApprovalRequestsGet403 = ForbiddenError;
export type ApprovalRequestsGet404 = ResourceNotFoundError;
export const ApprovalRequestsGet404 = ResourceNotFoundError;
export type ApprovalRequestsGet422 = ValidationError;
export const ApprovalRequestsGet422 = ValidationError;
export type ApprovalRequestsGet500 = InternalError;
export const ApprovalRequestsGet500 = InternalError;
export type ApprovalRequestsGet504 = GatewayTimeoutError;
export const ApprovalRequestsGet504 = GatewayTimeoutError;
export type ApprovalRequestsApprovePathParams = { readonly id: ApprovalRequestId };
export const ApprovalRequestsApprovePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ApprovalRequestId }))();
export type ApprovalRequestsApprove200 = ApprovalRequest;
export const ApprovalRequestsApprove200 = ApprovalRequest;
export type ApprovalRequestsApprove400 = MalformedRequestError;
export const ApprovalRequestsApprove400 = MalformedRequestError;
export type ApprovalRequestsApprove401 = UnauthorizedError;
export const ApprovalRequestsApprove401 = UnauthorizedError;
export type ApprovalRequestsApprove403 = ForbiddenError;
export const ApprovalRequestsApprove403 = ForbiddenError;
export type ApprovalRequestsApprove404 = ResourceNotFoundError;
export const ApprovalRequestsApprove404 = ResourceNotFoundError;
export type ApprovalRequestsApprove409 = ConflictError;
export const ApprovalRequestsApprove409 = ConflictError;
export type ApprovalRequestsApprove422 = ValidationError;
export const ApprovalRequestsApprove422 = ValidationError;
export type ApprovalRequestsApprove500 = InternalError;
export const ApprovalRequestsApprove500 = InternalError;
export type ApprovalRequestsApprove504 = GatewayTimeoutError;
export const ApprovalRequestsApprove504 = GatewayTimeoutError;
export type ApprovalRequestsRejectPathParams = { readonly id: ApprovalRequestId };
export const ApprovalRequestsRejectPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ApprovalRequestId }))();
export type ApprovalRequestsRejectRequestJson = { readonly reason?: string | null };
export const ApprovalRequestsRejectRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    reason: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(1000).annotate({
            expected: "a string with at most 1000 code points",
          }),
        ).check(
          Schema.isMaxLength(1000).annotate({ expected: "a value with a length of at most 1000" }),
        ),
        Schema.Null,
      ]),
    ),
  }))();
export type ApprovalRequestsReject200 = ApprovalRequest;
export const ApprovalRequestsReject200 = ApprovalRequest;
export type ApprovalRequestsReject400 = MalformedRequestError;
export const ApprovalRequestsReject400 = MalformedRequestError;
export type ApprovalRequestsReject401 = UnauthorizedError;
export const ApprovalRequestsReject401 = UnauthorizedError;
export type ApprovalRequestsReject403 = ForbiddenError;
export const ApprovalRequestsReject403 = ForbiddenError;
export type ApprovalRequestsReject404 = ResourceNotFoundError;
export const ApprovalRequestsReject404 = ResourceNotFoundError;
export type ApprovalRequestsReject409 = ConflictError;
export const ApprovalRequestsReject409 = ConflictError;
export type ApprovalRequestsReject422 = ValidationError;
export const ApprovalRequestsReject422 = ValidationError;
export type ApprovalRequestsReject500 = InternalError;
export const ApprovalRequestsReject500 = InternalError;
export type ApprovalRequestsReject504 = GatewayTimeoutError;
export const ApprovalRequestsReject504 = GatewayTimeoutError;

export class ApprovalRequestsGroup extends HttpApiGroup.make("Approval requests")
  .add(
    HttpApiEndpoint.post("approvalRequestsCreate", "/v1/approval-requests", {
      payload: ApprovalRequestsCreateRequestJson,
      success: ApprovalRequestsCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        ApprovalRequestsCreate400.pipe(HttpApiSchema.status(400)),
        ApprovalRequestsCreate401.pipe(HttpApiSchema.status(401)),
        ApprovalRequestsCreate403.pipe(HttpApiSchema.status(403)),
        ApprovalRequestsCreate409.pipe(HttpApiSchema.status(409)),
        ApprovalRequestsCreate422.pipe(HttpApiSchema.status(422)),
        ApprovalRequestsCreate500,
        ApprovalRequestsCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "approvalRequests.create")
      .annotate(OpenApi.Summary, "Request approval for an OAuth tool intent")
      .annotate(
        OpenApi.Description,
        "Creates one immutable batch of up to 20 tool calls for one intent. Only an OAuth access token may create a request. The owner opens approvalUrl and decides in a signed-in owner session. Requests expire after 30 minutes; the original OAuth token must remain valid. Repeating idempotencyKey for the same caller returns the same request; different content conflicts. Credential-bearing arguments are refused.",
      ),
    HttpApiEndpoint.get("approvalRequestsGet", "/v1/approval-requests/:id", {
      params: ApprovalRequestsGetPathParams,
      success: ApprovalRequestsGet200,
      error: [
        ApprovalRequestsGet400.pipe(HttpApiSchema.status(400)),
        ApprovalRequestsGet401.pipe(HttpApiSchema.status(401)),
        ApprovalRequestsGet403.pipe(HttpApiSchema.status(403)),
        ApprovalRequestsGet404.pipe(HttpApiSchema.status(404)),
        ApprovalRequestsGet422.pipe(HttpApiSchema.status(422)),
        ApprovalRequestsGet500,
        ApprovalRequestsGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "approvalRequests.get")
      .annotate(OpenApi.Summary, "Read an approval request")
      .annotate(
        OpenApi.Description,
        "Returns the exact calls, requester, decision and execution receipt. The original OAuth caller may read its own requests; an organization owner may read them from a signed-in session. A pending request past its deadline reads expired.",
      ),
    HttpApiEndpoint.post("approvalRequestsApprove", "/v1/approval-requests/:id/approve", {
      params: ApprovalRequestsApprovePathParams,
      success: ApprovalRequestsApprove200,
      error: [
        ApprovalRequestsApprove400.pipe(HttpApiSchema.status(400)),
        ApprovalRequestsApprove401.pipe(HttpApiSchema.status(401)),
        ApprovalRequestsApprove403.pipe(HttpApiSchema.status(403)),
        ApprovalRequestsApprove404.pipe(HttpApiSchema.status(404)),
        ApprovalRequestsApprove409.pipe(HttpApiSchema.status(409)),
        ApprovalRequestsApprove422.pipe(HttpApiSchema.status(422)),
        ApprovalRequestsApprove500,
        ApprovalRequestsApprove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "approvalRequests.approve")
      .annotate(OpenApi.Summary, "Approve and execute an OAuth tool intent")
      .annotate(
        OpenApi.Description,
        "Only an organization owner in a signed-in session may approve. Claims a pending, unexpired request once, then executes its exact calls with the original OAuth authority. Repeating a decision returns the existing receipt. Execution is never retried automatically; a failed receipt can mean some actions completed, and must be reconciled before another request is created.",
      ),
    HttpApiEndpoint.post("approvalRequestsReject", "/v1/approval-requests/:id/reject", {
      params: ApprovalRequestsRejectPathParams,
      payload: ApprovalRequestsRejectRequestJson,
      success: ApprovalRequestsReject200,
      error: [
        ApprovalRequestsReject400.pipe(HttpApiSchema.status(400)),
        ApprovalRequestsReject401.pipe(HttpApiSchema.status(401)),
        ApprovalRequestsReject403.pipe(HttpApiSchema.status(403)),
        ApprovalRequestsReject404.pipe(HttpApiSchema.status(404)),
        ApprovalRequestsReject409.pipe(HttpApiSchema.status(409)),
        ApprovalRequestsReject422.pipe(HttpApiSchema.status(422)),
        ApprovalRequestsReject500,
        ApprovalRequestsReject504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "approvalRequests.reject")
      .annotate(OpenApi.Summary, "Reject an OAuth tool intent")
      .annotate(
        OpenApi.Description,
        "Only an organization owner in a signed-in session may reject a pending request. Records the optional reason and destroys the retained execution credential. Repeated decisions return the existing receipt.",
      ),
  )
  .annotate(
    OpenApi.Description,
    "Immutable tool intents requested by OAuth clients and decided by organization owners in their signed-in sessions.",
  ) {}
