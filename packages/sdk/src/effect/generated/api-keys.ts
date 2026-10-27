// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeyAccess,
  ApiKeyId,
  ApiKeySecurityMiddleware,
  BillingProviderError,
  Cursor,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  MailboxSendMode,
  PaymentRequiredError,
  RateLimitedError,
  ResourceNotFoundError,
  SuccessResponse,
  UnauthorizedError,
  ValidationError,
  __SamvaRuntimeSensitiveString,
} from "./shared";

export type ApiKeyOwner = { readonly id: string; readonly name: string; readonly email: string };
export const ApiKeyOwner = /* @__PURE__ */ (() =>
  Schema.Struct({ id: Schema.String, name: Schema.String, email: Schema.String }).annotate({
    identifier: "ApiKeyOwner",
  }))();
export type ApiKeyActivityPage = {
  readonly items: ReadonlyArray<{
    readonly id: string;
    readonly timestamp: string;
    readonly method: string;
    readonly endpoint: string;
    readonly statusCode: number;
    readonly latency: number;
  }>;
  readonly nextCursor: string | null;
};
export const ApiKeyActivityPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        timestamp: Schema.String,
        method: Schema.String,
        endpoint: Schema.String,
        statusCode: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
          .check(
            Schema.isGreaterThanOrEqualTo(100).annotate({
              expected: "a value greater than or equal to 100",
            }),
          )
          .check(
            Schema.isLessThanOrEqualTo(599).annotate({
              expected: "a value less than or equal to 599",
            }),
          ),
        latency: Schema.Finite.check(
          Schema.isFinite().annotate({ expected: "a finite number" }),
        ).check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        ),
      }),
    ),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "ApiKeyActivityPage" }))();
export type ApiKeyMailboxAccessUpdate = { readonly sendMode: MailboxSendMode };
export const ApiKeyMailboxAccessUpdate = /* @__PURE__ */ (() =>
  Schema.Struct({ sendMode: MailboxSendMode }).annotate({
    identifier: "ApiKeyMailboxAccessUpdate",
  }))();
export type ApiKey = {
  readonly id: string;
  readonly name: string;
  readonly key?: string | null;
  readonly start: string | null;
  readonly end: string | null;
  readonly description?: string | null;
  readonly createdAt: string;
  readonly expiresAt: string | null;
  readonly lastUsedAt: string | null;
  readonly isActive: boolean;
  readonly access: ApiKeyAccess;
  readonly owner: ApiKeyOwner | null;
};
export const ApiKey = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    key: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    start: Schema.Union([Schema.String, Schema.Null]),
    end: Schema.Union([Schema.String, Schema.Null]),
    description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    createdAt: Schema.String,
    expiresAt: Schema.Union([Schema.String, Schema.Null]),
    lastUsedAt: Schema.Union([Schema.String, Schema.Null]),
    isActive: Schema.Boolean,
    access: ApiKeyAccess,
    owner: Schema.Union([ApiKeyOwner, Schema.Null]),
  }).annotate({ identifier: "ApiKey" }))();
export type ApiKeyWithSecret = {
  readonly id: string;
  readonly name: string;
  readonly key: __SamvaRuntimeSensitiveString;
  readonly start: string | null;
  readonly end: string | null;
  readonly description?: string | null;
  readonly createdAt: string;
  readonly expiresAt: string | null;
  readonly lastUsedAt: string | null;
  readonly isActive: boolean;
  readonly access: ApiKeyAccess;
  readonly owner: ApiKeyOwner | null;
};
export const ApiKeyWithSecret = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    key: __SamvaRuntimeSensitiveString,
    start: Schema.Union([Schema.String, Schema.Null]),
    end: Schema.Union([Schema.String, Schema.Null]),
    description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    createdAt: Schema.String,
    expiresAt: Schema.Union([Schema.String, Schema.Null]),
    lastUsedAt: Schema.Union([Schema.String, Schema.Null]),
    isActive: Schema.Boolean,
    access: ApiKeyAccess,
    owner: Schema.Union([ApiKeyOwner, Schema.Null]),
  }).annotate({ identifier: "ApiKeyWithSecret" }))();
export type ApiKeyPage = {
  readonly items: ReadonlyArray<ApiKey>;
  readonly nextCursor: string | null;
};
export const ApiKeyPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(ApiKey),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "ApiKeyPage" }))();
export type ApiKeysListQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
  readonly status?: "active" | "revoked" | null;
  readonly search?: string | null;
};
export const ApiKeysListQuery = /* @__PURE__ */ (() =>
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
    status: Schema.optionalKey(
      Schema.Union([
        Schema.Union([Schema.Literal("active"), Schema.Literal("revoked")]),
        Schema.Null,
      ]),
    ),
    search: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type ApiKeysList200 = ApiKeyPage;
export const ApiKeysList200 = ApiKeyPage;
export type ApiKeysList401 = UnauthorizedError;
export const ApiKeysList401 = UnauthorizedError;
export type ApiKeysList403 = ForbiddenError;
export const ApiKeysList403 = ForbiddenError;
export type ApiKeysList422 = ValidationError;
export const ApiKeysList422 = ValidationError;
export type ApiKeysList500 = InternalError;
export const ApiKeysList500 = InternalError;
export type ApiKeysList504 = GatewayTimeoutError;
export const ApiKeysList504 = GatewayTimeoutError;
export type ApiKeysCreateRequestJson = {
  readonly name: string;
  readonly description?: string | null;
  readonly expiresAt?: string | null;
  readonly access?: ApiKeyAccess | null;
};
export const ApiKeysCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(32).annotate({ expected: "a string with at most 32 code points" }),
      )
      .check(Schema.isMaxLength(32).annotate({ expected: "a value with a length of at most 32" })),
    description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    expiresAt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    access: Schema.optionalKey(
      Schema.Union([ApiKeyAccess, Schema.Null]).annotate({
        description:
          "Defaults to full access. A restricted API key creating a key defaults to its own grants and cannot issue full access.",
      }),
    ),
  }))();
export type ApiKeysCreate201 = ApiKeyWithSecret;
export const ApiKeysCreate201 = ApiKeyWithSecret;
export type ApiKeysCreate401 = UnauthorizedError;
export const ApiKeysCreate401 = UnauthorizedError;
export type ApiKeysCreate402 = PaymentRequiredError;
export const ApiKeysCreate402 = PaymentRequiredError;
export type ApiKeysCreate403 = ForbiddenError;
export const ApiKeysCreate403 = ForbiddenError;
export type ApiKeysCreate404 = ResourceNotFoundError;
export const ApiKeysCreate404 = ResourceNotFoundError;
export type ApiKeysCreate422 = ValidationError;
export const ApiKeysCreate422 = ValidationError;
export type ApiKeysCreate429 = RateLimitedError;
export const ApiKeysCreate429 = RateLimitedError;
export type ApiKeysCreate500 = InternalError;
export const ApiKeysCreate500 = InternalError;
export type ApiKeysCreate502 = BillingProviderError;
export const ApiKeysCreate502 = BillingProviderError;
export type ApiKeysCreate504 = GatewayTimeoutError;
export const ApiKeysCreate504 = GatewayTimeoutError;
export type ApiKeysGetPathParams = { readonly id: ApiKeyId };
export const ApiKeysGetPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: ApiKeyId }))();
export type ApiKeysGet200 = ApiKey;
export const ApiKeysGet200 = ApiKey;
export type ApiKeysGet401 = UnauthorizedError;
export const ApiKeysGet401 = UnauthorizedError;
export type ApiKeysGet403 = ForbiddenError;
export const ApiKeysGet403 = ForbiddenError;
export type ApiKeysGet404 = ResourceNotFoundError;
export const ApiKeysGet404 = ResourceNotFoundError;
export type ApiKeysGet422 = ValidationError;
export const ApiKeysGet422 = ValidationError;
export type ApiKeysGet500 = InternalError;
export const ApiKeysGet500 = InternalError;
export type ApiKeysGet504 = GatewayTimeoutError;
export const ApiKeysGet504 = GatewayTimeoutError;
export type ApiKeysUpdatePathParams = { readonly id: ApiKeyId };
export const ApiKeysUpdatePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: ApiKeyId }))();
export type ApiKeysUpdateRequestJson = {
  readonly name?: string | null;
  readonly description?: string | null;
  readonly mailboxes?: ApiKeyMailboxAccessUpdate | null;
};
export const ApiKeysUpdateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        )
          .check(
            Schema.isMaxCodePoints(32).annotate({
              expected: "a string with at most 32 code points",
            }),
          )
          .check(
            Schema.isMaxLength(32).annotate({ expected: "a value with a length of at most 32" }),
          ),
        Schema.Null,
      ]),
    ),
    description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    mailboxes: Schema.optionalKey(
      Schema.Union([ApiKeyMailboxAccessUpdate, Schema.Null]).annotate({
        description:
          "Changes the mailbox send mode of a key that holds mailbox access. Only a person can change it; the change applies to the key's next request.",
      }),
    ),
  }))();
export type ApiKeysUpdate200 = ApiKey;
export const ApiKeysUpdate200 = ApiKey;
export type ApiKeysUpdate401 = UnauthorizedError;
export const ApiKeysUpdate401 = UnauthorizedError;
export type ApiKeysUpdate403 = ForbiddenError;
export const ApiKeysUpdate403 = ForbiddenError;
export type ApiKeysUpdate404 = ResourceNotFoundError;
export const ApiKeysUpdate404 = ResourceNotFoundError;
export type ApiKeysUpdate422 = ValidationError;
export const ApiKeysUpdate422 = ValidationError;
export type ApiKeysUpdate500 = InternalError;
export const ApiKeysUpdate500 = InternalError;
export type ApiKeysUpdate504 = GatewayTimeoutError;
export const ApiKeysUpdate504 = GatewayTimeoutError;
export type ApiKeysGetActivityPathParams = { readonly id: ApiKeyId };
export const ApiKeysGetActivityPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ApiKeyId }))();
export type ApiKeysGetActivityQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
};
export const ApiKeysGetActivityQuery = /* @__PURE__ */ (() =>
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
export type ApiKeysGetActivity200 = ApiKeyActivityPage;
export const ApiKeysGetActivity200 = ApiKeyActivityPage;
export type ApiKeysGetActivity401 = UnauthorizedError;
export const ApiKeysGetActivity401 = UnauthorizedError;
export type ApiKeysGetActivity403 = ForbiddenError;
export const ApiKeysGetActivity403 = ForbiddenError;
export type ApiKeysGetActivity404 = ResourceNotFoundError;
export const ApiKeysGetActivity404 = ResourceNotFoundError;
export type ApiKeysGetActivity422 = ValidationError;
export const ApiKeysGetActivity422 = ValidationError;
export type ApiKeysGetActivity500 = InternalError;
export const ApiKeysGetActivity500 = InternalError;
export type ApiKeysGetActivity504 = GatewayTimeoutError;
export const ApiKeysGetActivity504 = GatewayTimeoutError;
export type ApiKeysRevokePathParams = { readonly id: ApiKeyId };
export const ApiKeysRevokePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: ApiKeyId }))();
export type ApiKeysRevoke200 = SuccessResponse;
export const ApiKeysRevoke200 = SuccessResponse;
export type ApiKeysRevoke401 = UnauthorizedError;
export const ApiKeysRevoke401 = UnauthorizedError;
export type ApiKeysRevoke403 = ForbiddenError;
export const ApiKeysRevoke403 = ForbiddenError;
export type ApiKeysRevoke404 = ResourceNotFoundError;
export const ApiKeysRevoke404 = ResourceNotFoundError;
export type ApiKeysRevoke422 = ValidationError;
export const ApiKeysRevoke422 = ValidationError;
export type ApiKeysRevoke500 = InternalError;
export const ApiKeysRevoke500 = InternalError;
export type ApiKeysRevoke502 = BillingProviderError;
export const ApiKeysRevoke502 = BillingProviderError;
export type ApiKeysRevoke504 = GatewayTimeoutError;
export const ApiKeysRevoke504 = GatewayTimeoutError;
export type ApiKeysRotatePathParams = { readonly id: ApiKeyId };
export const ApiKeysRotatePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: ApiKeyId }))();
export type ApiKeysRotate200 = ApiKeyWithSecret;
export const ApiKeysRotate200 = ApiKeyWithSecret;
export type ApiKeysRotate401 = UnauthorizedError;
export const ApiKeysRotate401 = UnauthorizedError;
export type ApiKeysRotate403 = ForbiddenError;
export const ApiKeysRotate403 = ForbiddenError;
export type ApiKeysRotate404 = ResourceNotFoundError;
export const ApiKeysRotate404 = ResourceNotFoundError;
export type ApiKeysRotate422 = ValidationError;
export const ApiKeysRotate422 = ValidationError;
export type ApiKeysRotate500 = InternalError;
export const ApiKeysRotate500 = InternalError;
export type ApiKeysRotate504 = GatewayTimeoutError;
export const ApiKeysRotate504 = GatewayTimeoutError;
export type ApiKeysGetStatsPathParams = { readonly id: ApiKeyId };
export const ApiKeysGetStatsPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: ApiKeyId }))();
export type ApiKeysGetStatsQuery = {
  readonly after?: string | null;
  readonly before?: string | null;
};
export const ApiKeysGetStatsQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    after: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    before: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type ApiKeysGetStats200 = {
  readonly totalRequests: number;
  readonly successfulRequests: number;
  readonly failedRequests: number;
  readonly dailyVolume: ReadonlyArray<{ readonly date: string; readonly requests: number }>;
};
export const ApiKeysGetStats200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    totalRequests: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    successfulRequests: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    failedRequests: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    dailyVolume: Schema.Array(
      Schema.Struct({
        date: Schema.String,
        requests: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  }))();
export type ApiKeysGetStats401 = UnauthorizedError;
export const ApiKeysGetStats401 = UnauthorizedError;
export type ApiKeysGetStats403 = ForbiddenError;
export const ApiKeysGetStats403 = ForbiddenError;
export type ApiKeysGetStats404 = ResourceNotFoundError;
export const ApiKeysGetStats404 = ResourceNotFoundError;
export type ApiKeysGetStats422 = ValidationError;
export const ApiKeysGetStats422 = ValidationError;
export type ApiKeysGetStats500 = InternalError;
export const ApiKeysGetStats500 = InternalError;
export type ApiKeysGetStats504 = GatewayTimeoutError;
export const ApiKeysGetStats504 = GatewayTimeoutError;

export class APIKeysGroup extends HttpApiGroup.make("API Keys")
  .add(
    HttpApiEndpoint.get("apiKeysList", "/v1/api-keys", {
      query: ApiKeysListQuery,
      success: ApiKeysList200,
      error: [
        ApiKeysList401.pipe(HttpApiSchema.status(401)),
        ApiKeysList403.pipe(HttpApiSchema.status(403)),
        ApiKeysList422.pipe(HttpApiSchema.status(422)),
        ApiKeysList500,
        ApiKeysList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "apiKeys.list")
      .annotate(OpenApi.Summary, "List API keys")
      .annotate(
        OpenApi.Description,
        "Returns the organization's API keys, newest first, filterable by status and a search term matched against name and description. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.post("apiKeysCreate", "/v1/api-keys", {
      payload: ApiKeysCreateRequestJson,
      success: ApiKeysCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        ApiKeysCreate401.pipe(HttpApiSchema.status(401)),
        ApiKeysCreate402.pipe(HttpApiSchema.status(402)),
        ApiKeysCreate403.pipe(HttpApiSchema.status(403)),
        ApiKeysCreate404.pipe(HttpApiSchema.status(404)),
        ApiKeysCreate422.pipe(HttpApiSchema.status(422)),
        ApiKeysCreate429.pipe(HttpApiSchema.status(429)),
        ApiKeysCreate500,
        ApiKeysCreate502.pipe(HttpApiSchema.status(502)),
        ApiKeysCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "apiKeys.create")
      .annotate(OpenApi.Summary, "Create an API key")
      .annotate(
        OpenApi.Description,
        "Creates a new API key for the organization and returns the created key, including the plaintext secret, with a 201 response.",
      ),
    HttpApiEndpoint.get("apiKeysGet", "/v1/api-keys/:id", {
      params: ApiKeysGetPathParams,
      success: ApiKeysGet200,
      error: [
        ApiKeysGet401.pipe(HttpApiSchema.status(401)),
        ApiKeysGet403.pipe(HttpApiSchema.status(403)),
        ApiKeysGet404.pipe(HttpApiSchema.status(404)),
        ApiKeysGet422.pipe(HttpApiSchema.status(422)),
        ApiKeysGet500,
        ApiKeysGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "apiKeys.get")
      .annotate(OpenApi.Summary, "Get an API key")
      .annotate(
        OpenApi.Description,
        "Returns the API key with the given ID, including its metadata and access.",
      ),
    HttpApiEndpoint.patch("apiKeysUpdate", "/v1/api-keys/:id", {
      params: ApiKeysUpdatePathParams,
      payload: ApiKeysUpdateRequestJson,
      success: ApiKeysUpdate200,
      error: [
        ApiKeysUpdate401.pipe(HttpApiSchema.status(401)),
        ApiKeysUpdate403.pipe(HttpApiSchema.status(403)),
        ApiKeysUpdate404.pipe(HttpApiSchema.status(404)),
        ApiKeysUpdate422.pipe(HttpApiSchema.status(422)),
        ApiKeysUpdate500,
        ApiKeysUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "apiKeys.update")
      .annotate(OpenApi.Summary, "Update an API key")
      .annotate(
        OpenApi.Description,
        "Updates an API key's settings and returns the updated key. A field left out keeps its value.",
      ),
    HttpApiEndpoint.get("apiKeysGetActivity", "/v1/api-keys/:id/activity", {
      params: ApiKeysGetActivityPathParams,
      query: ApiKeysGetActivityQuery,
      success: ApiKeysGetActivity200,
      error: [
        ApiKeysGetActivity401.pipe(HttpApiSchema.status(401)),
        ApiKeysGetActivity403.pipe(HttpApiSchema.status(403)),
        ApiKeysGetActivity404.pipe(HttpApiSchema.status(404)),
        ApiKeysGetActivity422.pipe(HttpApiSchema.status(422)),
        ApiKeysGetActivity500,
        ApiKeysGetActivity504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "apiKeys.getActivity")
      .annotate(OpenApi.Summary, "List API key activity")
      .annotate(
        OpenApi.Description,
        "Returns the sends attributed to an API key, newest first. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.post("apiKeysRevoke", "/v1/api-keys/:id/revoke", {
      params: ApiKeysRevokePathParams,
      success: ApiKeysRevoke200,
      error: [
        ApiKeysRevoke401.pipe(HttpApiSchema.status(401)),
        ApiKeysRevoke403.pipe(HttpApiSchema.status(403)),
        ApiKeysRevoke404.pipe(HttpApiSchema.status(404)),
        ApiKeysRevoke422.pipe(HttpApiSchema.status(422)),
        ApiKeysRevoke500,
        ApiKeysRevoke502.pipe(HttpApiSchema.status(502)),
        ApiKeysRevoke504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "apiKeys.revoke")
      .annotate(OpenApi.Summary, "Revoke an API key")
      .annotate(
        OpenApi.Description,
        "Deactivates an API key so it can no longer authenticate requests. Revocation is final: a revoked key never authenticates again. Its record stays listable, so the messages it sent stay attributed to it.",
      ),
    HttpApiEndpoint.post("apiKeysRotate", "/v1/api-keys/:id/rotate", {
      params: ApiKeysRotatePathParams,
      success: ApiKeysRotate200,
      error: [
        ApiKeysRotate401.pipe(HttpApiSchema.status(401)),
        ApiKeysRotate403.pipe(HttpApiSchema.status(403)),
        ApiKeysRotate404.pipe(HttpApiSchema.status(404)),
        ApiKeysRotate422.pipe(HttpApiSchema.status(422)),
        ApiKeysRotate500,
        ApiKeysRotate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "apiKeys.rotate")
      .annotate(OpenApi.Summary, "Rotate an API key")
      .annotate(
        OpenApi.Description,
        "Issues a replacement with the same owner, name, and access, then deactivates the existing key. Returns the new key, including the plaintext secret.",
      ),
    HttpApiEndpoint.get("apiKeysGetStats", "/v1/api-keys/:id/stats", {
      params: ApiKeysGetStatsPathParams,
      query: ApiKeysGetStatsQuery,
      success: ApiKeysGetStats200,
      error: [
        ApiKeysGetStats401.pipe(HttpApiSchema.status(401)),
        ApiKeysGetStats403.pipe(HttpApiSchema.status(403)),
        ApiKeysGetStats404.pipe(HttpApiSchema.status(404)),
        ApiKeysGetStats422.pipe(HttpApiSchema.status(422)),
        ApiKeysGetStats500,
        ApiKeysGetStats504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "apiKeys.getStats")
      .annotate(OpenApi.Summary, "Get API key send statistics")
      .annotate(
        OpenApi.Description,
        "Returns aggregate send counts and daily volume attributed to an API key between `after` and `before`, a window of at most 90 days that defaults to the last 30 days.",
      ),
  )
  .annotate(OpenApi.Description, "API key management, rotation, and usage statistics") {}
