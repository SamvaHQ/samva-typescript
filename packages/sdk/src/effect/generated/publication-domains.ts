// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  ConflictError,
  FlagDisabledError,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  OrganizationId,
  ResourceNotFoundError,
  TopicId,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type TopicPublicationDomainsAddPathParams = { readonly id: TopicId };
export const TopicPublicationDomainsAddPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TopicId }))();
export type TopicPublicationDomainsAddRequestJson = {
  readonly hostname: string;
  readonly idempotencyKey: string;
};
export const TopicPublicationDomainsAddRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    hostname: Schema.String.check(
      Schema.isMaxCodePoints(253).annotate({ expected: "a string with at most 253 code points" }),
    )
      .check(
        Schema.isPattern(
          new RegExp(
            "^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?$",
        }),
      )
      .check(
        Schema.isMaxLength(253).annotate({ expected: "a value with a length of at most 253" }),
      ),
    idempotencyKey: Schema.String.annotate({ format: "uuid" }).check(
      Schema.isPattern(
        new RegExp(
          "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
      }),
    ),
  }))();
export type TopicPublicationDomainsAdd200 = {
  readonly organizationId: OrganizationId;
  readonly topicId: TopicId;
  readonly hostname: string;
  readonly canonicalHostname: string;
  readonly phase: "pending" | "active" | "removing" | "removed" | "conflict";
  readonly active: boolean;
  readonly hostnameStatus: string | null;
  readonly sslStatus: string | null;
  readonly cname: { readonly type: "CNAME" | "TXT"; readonly name: string; readonly value: string };
  readonly verificationRecords: ReadonlyArray<{
    readonly type: "CNAME" | "TXT";
    readonly name: string;
    readonly value: string;
  }>;
  readonly verificationErrors: ReadonlyArray<string>;
};
export const TopicPublicationDomainsAdd200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    organizationId: OrganizationId,
    topicId: TopicId,
    hostname: Schema.String.check(
      Schema.isMaxCodePoints(253).annotate({ expected: "a string with at most 253 code points" }),
    )
      .check(
        Schema.isPattern(
          new RegExp(
            "^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?$",
        }),
      )
      .check(
        Schema.isMaxLength(253).annotate({ expected: "a value with a length of at most 253" }),
      ),
    canonicalHostname: Schema.String,
    phase: Schema.Union([
      Schema.Literal("pending"),
      Schema.Literal("active"),
      Schema.Literal("removing"),
      Schema.Literal("removed"),
      Schema.Literal("conflict"),
    ]),
    active: Schema.Boolean,
    hostnameStatus: Schema.Union([Schema.String, Schema.Null]),
    sslStatus: Schema.Union([Schema.String, Schema.Null]),
    cname: Schema.Struct({
      type: Schema.Union([Schema.Literal("CNAME"), Schema.Literal("TXT")]),
      name: Schema.String,
      value: Schema.String,
    }),
    verificationRecords: Schema.Array(
      Schema.Struct({
        type: Schema.Union([Schema.Literal("CNAME"), Schema.Literal("TXT")]),
        name: Schema.String,
        value: Schema.String,
      }),
    ),
    verificationErrors: Schema.Array(Schema.String),
  }))();
export type TopicPublicationDomainsAdd401 = UnauthorizedError;
export const TopicPublicationDomainsAdd401 = UnauthorizedError;
export type TopicPublicationDomainsAdd403 = ForbiddenError | FlagDisabledError;
export const TopicPublicationDomainsAdd403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type TopicPublicationDomainsAdd404 = ResourceNotFoundError;
export const TopicPublicationDomainsAdd404 = ResourceNotFoundError;
export type TopicPublicationDomainsAdd409 = ConflictError;
export const TopicPublicationDomainsAdd409 = ConflictError;
export type TopicPublicationDomainsAdd422 = ValidationError;
export const TopicPublicationDomainsAdd422 = ValidationError;
export type TopicPublicationDomainsAdd500 = InternalError;
export const TopicPublicationDomainsAdd500 = InternalError;
export type TopicPublicationDomainsAdd504 = GatewayTimeoutError;
export const TopicPublicationDomainsAdd504 = GatewayTimeoutError;
export type TopicPublicationDomainsGetPathParams = {
  readonly id: TopicId;
  readonly hostname: string;
};
export const TopicPublicationDomainsGetPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: TopicId,
    hostname: Schema.String.check(
      Schema.isMaxCodePoints(253).annotate({ expected: "a string with at most 253 code points" }),
    )
      .check(
        Schema.isPattern(
          new RegExp(
            "^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?$",
        }),
      )
      .check(
        Schema.isMaxLength(253).annotate({ expected: "a value with a length of at most 253" }),
      ),
  }))();
export type TopicPublicationDomainsGet200 = {
  readonly organizationId: OrganizationId;
  readonly topicId: TopicId;
  readonly hostname: string;
  readonly canonicalHostname: string;
  readonly phase: "pending" | "active" | "removing" | "removed" | "conflict";
  readonly active: boolean;
  readonly hostnameStatus: string | null;
  readonly sslStatus: string | null;
  readonly cname: { readonly type: "CNAME" | "TXT"; readonly name: string; readonly value: string };
  readonly verificationRecords: ReadonlyArray<{
    readonly type: "CNAME" | "TXT";
    readonly name: string;
    readonly value: string;
  }>;
  readonly verificationErrors: ReadonlyArray<string>;
};
export const TopicPublicationDomainsGet200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    organizationId: OrganizationId,
    topicId: TopicId,
    hostname: Schema.String.check(
      Schema.isMaxCodePoints(253).annotate({ expected: "a string with at most 253 code points" }),
    )
      .check(
        Schema.isPattern(
          new RegExp(
            "^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?$",
        }),
      )
      .check(
        Schema.isMaxLength(253).annotate({ expected: "a value with a length of at most 253" }),
      ),
    canonicalHostname: Schema.String,
    phase: Schema.Union([
      Schema.Literal("pending"),
      Schema.Literal("active"),
      Schema.Literal("removing"),
      Schema.Literal("removed"),
      Schema.Literal("conflict"),
    ]),
    active: Schema.Boolean,
    hostnameStatus: Schema.Union([Schema.String, Schema.Null]),
    sslStatus: Schema.Union([Schema.String, Schema.Null]),
    cname: Schema.Struct({
      type: Schema.Union([Schema.Literal("CNAME"), Schema.Literal("TXT")]),
      name: Schema.String,
      value: Schema.String,
    }),
    verificationRecords: Schema.Array(
      Schema.Struct({
        type: Schema.Union([Schema.Literal("CNAME"), Schema.Literal("TXT")]),
        name: Schema.String,
        value: Schema.String,
      }),
    ),
    verificationErrors: Schema.Array(Schema.String),
  }))();
export type TopicPublicationDomainsGet401 = UnauthorizedError;
export const TopicPublicationDomainsGet401 = UnauthorizedError;
export type TopicPublicationDomainsGet403 = ForbiddenError | FlagDisabledError;
export const TopicPublicationDomainsGet403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type TopicPublicationDomainsGet404 = ResourceNotFoundError;
export const TopicPublicationDomainsGet404 = ResourceNotFoundError;
export type TopicPublicationDomainsGet409 = ConflictError;
export const TopicPublicationDomainsGet409 = ConflictError;
export type TopicPublicationDomainsGet422 = ValidationError;
export const TopicPublicationDomainsGet422 = ValidationError;
export type TopicPublicationDomainsGet500 = InternalError;
export const TopicPublicationDomainsGet500 = InternalError;
export type TopicPublicationDomainsGet504 = GatewayTimeoutError;
export const TopicPublicationDomainsGet504 = GatewayTimeoutError;
export type TopicPublicationDomainsRemovePathParams = {
  readonly id: TopicId;
  readonly hostname: string;
};
export const TopicPublicationDomainsRemovePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: TopicId,
    hostname: Schema.String.check(
      Schema.isMaxCodePoints(253).annotate({ expected: "a string with at most 253 code points" }),
    )
      .check(
        Schema.isPattern(
          new RegExp(
            "^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?$",
        }),
      )
      .check(
        Schema.isMaxLength(253).annotate({ expected: "a value with a length of at most 253" }),
      ),
  }))();
export type TopicPublicationDomainsRemoveQuery = { readonly idempotencyKey: string };
export const TopicPublicationDomainsRemoveQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    idempotencyKey: Schema.String.annotate({ format: "uuid" }).check(
      Schema.isPattern(
        new RegExp(
          "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
      }),
    ),
  }))();
export type TopicPublicationDomainsRemove200 = {
  readonly organizationId: OrganizationId;
  readonly topicId: TopicId;
  readonly hostname: string;
  readonly canonicalHostname: string;
  readonly phase: "pending" | "active" | "removing" | "removed" | "conflict";
  readonly active: boolean;
  readonly hostnameStatus: string | null;
  readonly sslStatus: string | null;
  readonly cname: { readonly type: "CNAME" | "TXT"; readonly name: string; readonly value: string };
  readonly verificationRecords: ReadonlyArray<{
    readonly type: "CNAME" | "TXT";
    readonly name: string;
    readonly value: string;
  }>;
  readonly verificationErrors: ReadonlyArray<string>;
};
export const TopicPublicationDomainsRemove200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    organizationId: OrganizationId,
    topicId: TopicId,
    hostname: Schema.String.check(
      Schema.isMaxCodePoints(253).annotate({ expected: "a string with at most 253 code points" }),
    )
      .check(
        Schema.isPattern(
          new RegExp(
            "^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?$",
        }),
      )
      .check(
        Schema.isMaxLength(253).annotate({ expected: "a value with a length of at most 253" }),
      ),
    canonicalHostname: Schema.String,
    phase: Schema.Union([
      Schema.Literal("pending"),
      Schema.Literal("active"),
      Schema.Literal("removing"),
      Schema.Literal("removed"),
      Schema.Literal("conflict"),
    ]),
    active: Schema.Boolean,
    hostnameStatus: Schema.Union([Schema.String, Schema.Null]),
    sslStatus: Schema.Union([Schema.String, Schema.Null]),
    cname: Schema.Struct({
      type: Schema.Union([Schema.Literal("CNAME"), Schema.Literal("TXT")]),
      name: Schema.String,
      value: Schema.String,
    }),
    verificationRecords: Schema.Array(
      Schema.Struct({
        type: Schema.Union([Schema.Literal("CNAME"), Schema.Literal("TXT")]),
        name: Schema.String,
        value: Schema.String,
      }),
    ),
    verificationErrors: Schema.Array(Schema.String),
  }))();
export type TopicPublicationDomainsRemove401 = UnauthorizedError;
export const TopicPublicationDomainsRemove401 = UnauthorizedError;
export type TopicPublicationDomainsRemove403 = ForbiddenError | FlagDisabledError;
export const TopicPublicationDomainsRemove403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type TopicPublicationDomainsRemove404 = ResourceNotFoundError;
export const TopicPublicationDomainsRemove404 = ResourceNotFoundError;
export type TopicPublicationDomainsRemove409 = ConflictError;
export const TopicPublicationDomainsRemove409 = ConflictError;
export type TopicPublicationDomainsRemove422 = ValidationError;
export const TopicPublicationDomainsRemove422 = ValidationError;
export type TopicPublicationDomainsRemove500 = InternalError;
export const TopicPublicationDomainsRemove500 = InternalError;
export type TopicPublicationDomainsRemove504 = GatewayTimeoutError;
export const TopicPublicationDomainsRemove504 = GatewayTimeoutError;

export class PublicationDomainsGroup extends HttpApiGroup.make("Publication domains")
  .add(
    HttpApiEndpoint.post("topicPublicationDomainsAdd", "/v1/topics/:id/publication/domains", {
      params: TopicPublicationDomainsAddPathParams,
      payload: TopicPublicationDomainsAddRequestJson,
      success: TopicPublicationDomainsAdd200,
      error: [
        TopicPublicationDomainsAdd401.pipe(HttpApiSchema.status(401)),
        TopicPublicationDomainsAdd403.pipe(HttpApiSchema.status(403)),
        TopicPublicationDomainsAdd404.pipe(HttpApiSchema.status(404)),
        TopicPublicationDomainsAdd409.pipe(HttpApiSchema.status(409)),
        TopicPublicationDomainsAdd422.pipe(HttpApiSchema.status(422)),
        TopicPublicationDomainsAdd500,
        TopicPublicationDomainsAdd504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicPublicationDomains.add")
      .annotate(OpenApi.Summary, "Add a publication domain")
      .annotate(
        OpenApi.Description,
        "Claims a hostname for an opt-in topic with its public archive enabled and published. Requires issueWeb. Reuse the UUID idempotencyKey when retrying. The hostname serves no publication until Cloudflare confirms both ownership and SSL are active.",
      ),
    HttpApiEndpoint.get(
      "topicPublicationDomainsGet",
      "/v1/topics/:id/publication/domains/:hostname",
      {
        params: TopicPublicationDomainsGetPathParams,
        success: TopicPublicationDomainsGet200,
        error: [
          TopicPublicationDomainsGet401.pipe(HttpApiSchema.status(401)),
          TopicPublicationDomainsGet403.pipe(HttpApiSchema.status(403)),
          TopicPublicationDomainsGet404.pipe(HttpApiSchema.status(404)),
          TopicPublicationDomainsGet409.pipe(HttpApiSchema.status(409)),
          TopicPublicationDomainsGet422.pipe(HttpApiSchema.status(422)),
          TopicPublicationDomainsGet500,
          TopicPublicationDomainsGet504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicPublicationDomains.get")
      .annotate(OpenApi.Summary, "Get a publication domain")
      .annotate(
        OpenApi.Description,
        "Rechecks ownership and certificate status, returning DNS verification records. Domains outside this topic's organization or namespace return 404.",
      ),
    HttpApiEndpoint.delete(
      "topicPublicationDomainsRemove",
      "/v1/topics/:id/publication/domains/:hostname",
      {
        params: TopicPublicationDomainsRemovePathParams,
        query: TopicPublicationDomainsRemoveQuery,
        success: TopicPublicationDomainsRemove200,
        error: [
          TopicPublicationDomainsRemove401.pipe(HttpApiSchema.status(401)),
          TopicPublicationDomainsRemove403.pipe(HttpApiSchema.status(403)),
          TopicPublicationDomainsRemove404.pipe(HttpApiSchema.status(404)),
          TopicPublicationDomainsRemove409.pipe(HttpApiSchema.status(409)),
          TopicPublicationDomainsRemove422.pipe(HttpApiSchema.status(422)),
          TopicPublicationDomainsRemove500,
          TopicPublicationDomainsRemove504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicPublicationDomains.remove")
      .annotate(OpenApi.Summary, "Remove a publication domain")
      .annotate(
        OpenApi.Description,
        "Revokes publication lookup before removing the Cloudflare hostname. Reuse the UUID idempotencyKey query value on retries. Pending provider teardown is reported as removing. Removal remains available after the topic archive is disabled.",
      ),
  )
  .annotate(OpenApi.Description, "Cloudflare for SaaS custom domains for public topic archives") {}
