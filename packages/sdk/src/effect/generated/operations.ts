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
  Operation,
  OperationAccepted,
  OperationId,
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type OperationPage = {
  readonly items: ReadonlyArray<Operation>;
  readonly nextCursor: string | null;
};
export const OperationPage = /* @__PURE__ */ Schema.Struct({
  items: Schema.Array(Operation),
  nextCursor: Schema.Union([Schema.String, Schema.Null]),
}).annotate({ identifier: "OperationPage" });
export type OperationsListQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
  readonly kind?: "email-domain-provisioning" | "organization-deletion" | null;
  readonly status?: "pending" | "running" | "succeeded" | "failed" | null;
};
export const OperationsListQuery = /* @__PURE__ */ Schema.Struct({
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
  kind: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.Literal("email-domain-provisioning"),
        Schema.Literal("organization-deletion"),
      ]),
      Schema.Null,
    ]),
  ),
  status: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.Literal("pending"),
        Schema.Literal("running"),
        Schema.Literal("succeeded"),
        Schema.Literal("failed"),
      ]),
      Schema.Null,
    ]),
  ),
});
export type OperationsList200 = OperationPage;
export const OperationsList200 = OperationPage;
export type OperationsList401 = UnauthorizedError;
export const OperationsList401 = UnauthorizedError;
export type OperationsList403 = ForbiddenError;
export const OperationsList403 = ForbiddenError;
export type OperationsList422 = ValidationError;
export const OperationsList422 = ValidationError;
export type OperationsList500 = InternalError;
export const OperationsList500 = InternalError;
export type OperationsList504 = GatewayTimeoutError;
export const OperationsList504 = GatewayTimeoutError;
export type OperationsGetPathParams = { readonly id: OperationId };
export const OperationsGetPathParams = /* @__PURE__ */ Schema.Struct({ id: OperationId });
export type OperationsGet200 = Operation;
export const OperationsGet200 = Operation;
export type OperationsGet401 = UnauthorizedError;
export const OperationsGet401 = UnauthorizedError;
export type OperationsGet403 = ForbiddenError;
export const OperationsGet403 = ForbiddenError;
export type OperationsGet404 = ResourceNotFoundError;
export const OperationsGet404 = ResourceNotFoundError;
export type OperationsGet422 = ValidationError;
export const OperationsGet422 = ValidationError;
export type OperationsGet500 = InternalError;
export const OperationsGet500 = InternalError;
export type OperationsGet504 = GatewayTimeoutError;
export const OperationsGet504 = GatewayTimeoutError;
export type OperationsRetryPathParams = { readonly id: OperationId };
export const OperationsRetryPathParams = /* @__PURE__ */ Schema.Struct({ id: OperationId });
export type OperationsRetry202 = OperationAccepted;
export const OperationsRetry202 = OperationAccepted;
export type OperationsRetry401 = UnauthorizedError;
export const OperationsRetry401 = UnauthorizedError;
export type OperationsRetry403 = ForbiddenError;
export const OperationsRetry403 = ForbiddenError;
export type OperationsRetry404 = ResourceNotFoundError;
export const OperationsRetry404 = ResourceNotFoundError;
export type OperationsRetry409 = ConflictError;
export const OperationsRetry409 = ConflictError;
export type OperationsRetry422 = ValidationError;
export const OperationsRetry422 = ValidationError;
export type OperationsRetry500 = InternalError;
export const OperationsRetry500 = InternalError;
export type OperationsRetry504 = GatewayTimeoutError;
export const OperationsRetry504 = GatewayTimeoutError;

export class OperationsGroup extends HttpApiGroup.make("Operations")
  .add(
    HttpApiEndpoint.get("operationsList", "/v1/operations", {
      query: OperationsListQuery,
      success: OperationsList200,
      error: [
        OperationsList401.pipe(HttpApiSchema.status(401)),
        OperationsList403.pipe(HttpApiSchema.status(403)),
        OperationsList422.pipe(HttpApiSchema.status(422)),
        OperationsList500,
        OperationsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "operations.list")
      .annotate(OpenApi.Summary, "List asynchronous operations")
      .annotate(
        OpenApi.Description,
        "Lists asynchronous operations for the active organization, newest first. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.get("operationsGet", "/v1/operations/:id", {
      params: OperationsGetPathParams,
      success: OperationsGet200,
      error: [
        OperationsGet401.pipe(HttpApiSchema.status(401)),
        OperationsGet403.pipe(HttpApiSchema.status(403)),
        OperationsGet404.pipe(HttpApiSchema.status(404)),
        OperationsGet422.pipe(HttpApiSchema.status(422)),
        OperationsGet500,
        OperationsGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "operations.get")
      .annotate(OpenApi.Summary, "Get an asynchronous operation")
      .annotate(
        OpenApi.Description,
        "Returns one asynchronous operation from the active organization.",
      ),
    HttpApiEndpoint.post("operationsRetry", "/v1/operations/:id/retry", {
      params: OperationsRetryPathParams,
      success: OperationsRetry202.pipe(HttpApiSchema.status(202)),
      error: [
        OperationsRetry401.pipe(HttpApiSchema.status(401)),
        OperationsRetry403.pipe(HttpApiSchema.status(403)),
        OperationsRetry404.pipe(HttpApiSchema.status(404)),
        OperationsRetry409.pipe(HttpApiSchema.status(409)),
        OperationsRetry422.pipe(HttpApiSchema.status(422)),
        OperationsRetry500,
        OperationsRetry504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "operations.retry")
      .annotate(OpenApi.Summary, "Retry an asynchronous operation")
      .annotate(
        OpenApi.Description,
        "Retries a failed operation in place when its error is retryable. Retrying an organization deletion additionally requires `organization:delete`.",
      ),
  )
  .annotate(OpenApi.Description, "Status of accepted asynchronous mutations") {}
