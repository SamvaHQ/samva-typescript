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
  NewsletterId,
  OrganizationId,
  ResourceNotFoundError,
  TopicId,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type PublicationDomainCursor = string;
export const PublicationDomainCursor = /* @__PURE__ */ (() =>
  Schema.String.annotate({ identifier: "PublicationDomainCursor" }))();
export type PublicationDomainPage = {
  readonly items: ReadonlyArray<{
    readonly organizationId: OrganizationId;
    readonly topicId: TopicId;
    readonly hostname: string;
    readonly canonicalHostname: string;
    readonly phase: "pending" | "active" | "removing" | "removed" | "conflict";
    readonly active: boolean;
    readonly hostnameStatus: string | null;
    readonly sslStatus: string | null;
    readonly cname: {
      readonly type: "CNAME" | "TXT";
      readonly name: string;
      readonly value: string;
    };
    readonly verificationRecords: ReadonlyArray<{
      readonly type: "CNAME" | "TXT";
      readonly name: string;
      readonly value: string;
    }>;
    readonly verificationErrors: ReadonlyArray<string>;
  }>;
  readonly nextCursor: string | null;
};
export const PublicationDomainPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        organizationId: OrganizationId,
        topicId: TopicId,
        hostname: Schema.String.check(
          Schema.isMaxCodePoints(253).annotate({
            expected: "a string with at most 253 code points",
          }),
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
      }),
    ),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "PublicationDomainPage" }))();
export type NewsletterDomainsListPathParams = { readonly id: NewsletterId };
export const NewsletterDomainsListPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: NewsletterId }))();
export type NewsletterDomainsListQuery = {
  readonly limit?: number | null;
  readonly cursor?: PublicationDomainCursor | null;
};
export const NewsletterDomainsListQuery = /* @__PURE__ */ (() =>
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
    cursor: Schema.optionalKey(Schema.Union([PublicationDomainCursor, Schema.Null])),
  }))();
export type NewsletterDomainsList200 = PublicationDomainPage;
export const NewsletterDomainsList200 = PublicationDomainPage;
export type NewsletterDomainsList401 = UnauthorizedError;
export const NewsletterDomainsList401 = UnauthorizedError;
export type NewsletterDomainsList403 = ForbiddenError | FlagDisabledError;
export const NewsletterDomainsList403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewsletterDomainsList404 = ResourceNotFoundError;
export const NewsletterDomainsList404 = ResourceNotFoundError;
export type NewsletterDomainsList409 = ConflictError;
export const NewsletterDomainsList409 = ConflictError;
export type NewsletterDomainsList422 = ValidationError;
export const NewsletterDomainsList422 = ValidationError;
export type NewsletterDomainsList500 = InternalError;
export const NewsletterDomainsList500 = InternalError;
export type NewsletterDomainsList504 = GatewayTimeoutError;
export const NewsletterDomainsList504 = GatewayTimeoutError;
export type NewsletterDomainsAddPathParams = { readonly id: NewsletterId };
export const NewsletterDomainsAddPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: NewsletterId }))();
export type NewsletterDomainsAddHeaders = { readonly "idempotency-key"?: string | null };
export const NewsletterDomainsAddHeaders = /* @__PURE__ */ (() =>
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
export type NewsletterDomainsAddRequestJson = { readonly hostname: string };
export const NewsletterDomainsAddRequestJson = /* @__PURE__ */ (() =>
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
  }))();
export type NewsletterDomainsAdd200 = {
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
export const NewsletterDomainsAdd200 = /* @__PURE__ */ (() =>
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
export type NewsletterDomainsAdd401 = UnauthorizedError;
export const NewsletterDomainsAdd401 = UnauthorizedError;
export type NewsletterDomainsAdd403 = ForbiddenError | FlagDisabledError;
export const NewsletterDomainsAdd403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewsletterDomainsAdd404 = ResourceNotFoundError;
export const NewsletterDomainsAdd404 = ResourceNotFoundError;
export type NewsletterDomainsAdd409 = ConflictError;
export const NewsletterDomainsAdd409 = ConflictError;
export type NewsletterDomainsAdd422 = ValidationError;
export const NewsletterDomainsAdd422 = ValidationError;
export type NewsletterDomainsAdd500 = InternalError;
export const NewsletterDomainsAdd500 = InternalError;
export type NewsletterDomainsAdd504 = GatewayTimeoutError;
export const NewsletterDomainsAdd504 = GatewayTimeoutError;
export type NewsletterDomainsGetPathParams = {
  readonly id: NewsletterId;
  readonly hostname: string;
};
export const NewsletterDomainsGetPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: NewsletterId,
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
export type NewsletterDomainsGet200 = {
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
export const NewsletterDomainsGet200 = /* @__PURE__ */ (() =>
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
export type NewsletterDomainsGet401 = UnauthorizedError;
export const NewsletterDomainsGet401 = UnauthorizedError;
export type NewsletterDomainsGet403 = ForbiddenError | FlagDisabledError;
export const NewsletterDomainsGet403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewsletterDomainsGet404 = ResourceNotFoundError;
export const NewsletterDomainsGet404 = ResourceNotFoundError;
export type NewsletterDomainsGet409 = ConflictError;
export const NewsletterDomainsGet409 = ConflictError;
export type NewsletterDomainsGet422 = ValidationError;
export const NewsletterDomainsGet422 = ValidationError;
export type NewsletterDomainsGet500 = InternalError;
export const NewsletterDomainsGet500 = InternalError;
export type NewsletterDomainsGet504 = GatewayTimeoutError;
export const NewsletterDomainsGet504 = GatewayTimeoutError;
export type NewsletterDomainsRemovePathParams = {
  readonly id: NewsletterId;
  readonly hostname: string;
};
export const NewsletterDomainsRemovePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: NewsletterId,
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
export type NewsletterDomainsRemoveHeaders = { readonly "idempotency-key"?: string | null };
export const NewsletterDomainsRemoveHeaders = /* @__PURE__ */ (() =>
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
export type NewsletterDomainsRemove200 = {
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
export const NewsletterDomainsRemove200 = /* @__PURE__ */ (() =>
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
export type NewsletterDomainsRemove401 = UnauthorizedError;
export const NewsletterDomainsRemove401 = UnauthorizedError;
export type NewsletterDomainsRemove403 = ForbiddenError | FlagDisabledError;
export const NewsletterDomainsRemove403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewsletterDomainsRemove404 = ResourceNotFoundError;
export const NewsletterDomainsRemove404 = ResourceNotFoundError;
export type NewsletterDomainsRemove409 = ConflictError;
export const NewsletterDomainsRemove409 = ConflictError;
export type NewsletterDomainsRemove422 = ValidationError;
export const NewsletterDomainsRemove422 = ValidationError;
export type NewsletterDomainsRemove500 = InternalError;
export const NewsletterDomainsRemove500 = InternalError;
export type NewsletterDomainsRemove504 = GatewayTimeoutError;
export const NewsletterDomainsRemove504 = GatewayTimeoutError;

export class NewsletterDomainsGroup extends HttpApiGroup.make("Newsletter domains")
  .add(
    HttpApiEndpoint.get("newsletterDomainsList", "/v1/newsletters/:id/domains", {
      params: NewsletterDomainsListPathParams,
      query: NewsletterDomainsListQuery,
      success: NewsletterDomainsList200,
      error: [
        NewsletterDomainsList401.pipe(HttpApiSchema.status(401)),
        NewsletterDomainsList403.pipe(HttpApiSchema.status(403)),
        NewsletterDomainsList404.pipe(HttpApiSchema.status(404)),
        NewsletterDomainsList409.pipe(HttpApiSchema.status(409)),
        NewsletterDomainsList422.pipe(HttpApiSchema.status(422)),
        NewsletterDomainsList500,
        NewsletterDomainsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletterDomains.list")
      .annotate(OpenApi.Summary, "List publication domains")
      .annotate(
        OpenApi.Description,
        "Returns this newsletter's domains in hostname order with their latest recorded verification status. Removed domains are omitted. Pass nextCursor as cursor for the next page; it is null on the last page. Get a domain to recheck its current DNS and certificate status. Requires newsletters.",
      ),
    HttpApiEndpoint.post("newsletterDomainsAdd", "/v1/newsletters/:id/domains", {
      params: NewsletterDomainsAddPathParams,
      headers: NewsletterDomainsAddHeaders,
      payload: NewsletterDomainsAddRequestJson,
      success: NewsletterDomainsAdd200,
      error: [
        NewsletterDomainsAdd401.pipe(HttpApiSchema.status(401)),
        NewsletterDomainsAdd403.pipe(HttpApiSchema.status(403)),
        NewsletterDomainsAdd404.pipe(HttpApiSchema.status(404)),
        NewsletterDomainsAdd409.pipe(HttpApiSchema.status(409)),
        NewsletterDomainsAdd422.pipe(HttpApiSchema.status(422)),
        NewsletterDomainsAdd500,
        NewsletterDomainsAdd504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletterDomains.add")
      .annotate(OpenApi.Summary, "Add a publication domain")
      .annotate(
        OpenApi.Description,
        "Claims a hostname for an opt-in topic with its public archive enabled and published. Requires newsletters. Pass the same Idempotency-Key header when retrying. The hostname serves no publication until Cloudflare confirms both ownership and SSL are active.",
      ),
    HttpApiEndpoint.get("newsletterDomainsGet", "/v1/newsletters/:id/domains/:hostname", {
      params: NewsletterDomainsGetPathParams,
      success: NewsletterDomainsGet200,
      error: [
        NewsletterDomainsGet401.pipe(HttpApiSchema.status(401)),
        NewsletterDomainsGet403.pipe(HttpApiSchema.status(403)),
        NewsletterDomainsGet404.pipe(HttpApiSchema.status(404)),
        NewsletterDomainsGet409.pipe(HttpApiSchema.status(409)),
        NewsletterDomainsGet422.pipe(HttpApiSchema.status(422)),
        NewsletterDomainsGet500,
        NewsletterDomainsGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletterDomains.get")
      .annotate(OpenApi.Summary, "Get a publication domain")
      .annotate(
        OpenApi.Description,
        "Rechecks ownership and certificate status, returning DNS verification records. Domains outside this newsletter's organization or namespace return 404.",
      ),
    HttpApiEndpoint.delete("newsletterDomainsRemove", "/v1/newsletters/:id/domains/:hostname", {
      params: NewsletterDomainsRemovePathParams,
      headers: NewsletterDomainsRemoveHeaders,
      success: NewsletterDomainsRemove200,
      error: [
        NewsletterDomainsRemove401.pipe(HttpApiSchema.status(401)),
        NewsletterDomainsRemove403.pipe(HttpApiSchema.status(403)),
        NewsletterDomainsRemove404.pipe(HttpApiSchema.status(404)),
        NewsletterDomainsRemove409.pipe(HttpApiSchema.status(409)),
        NewsletterDomainsRemove422.pipe(HttpApiSchema.status(422)),
        NewsletterDomainsRemove500,
        NewsletterDomainsRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletterDomains.remove")
      .annotate(OpenApi.Summary, "Remove a publication domain")
      .annotate(
        OpenApi.Description,
        "Revokes publication lookup before removing the Cloudflare hostname. Pass the same Idempotency-Key header on retries. Pending provider teardown is reported as removing. Removal remains available after the topic archive is disabled.",
      ),
  )
  .annotate(OpenApi.Description, "Custom domains for newsletter archives") {}
