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
  NamespaceId,
  NewsletterId,
  ResourceNotFoundError,
  TemplateProjectId,
  TopicId,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type Newsletter = {
  readonly id: NewsletterId;
  readonly topicId: TopicId;
  readonly namespaceId: NamespaceId | null;
  readonly name: string;
  readonly description: string | null;
  readonly issueProjectId: TemplateProjectId | null;
  readonly archiveEnabled: boolean;
  readonly publicationSlug: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const Newsletter = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: NewsletterId,
    topicId: TopicId,
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
    name: Schema.String,
    description: Schema.Union([Schema.String, Schema.Null]),
    issueProjectId: Schema.Union([TemplateProjectId, Schema.Null]),
    archiveEnabled: Schema.Boolean,
    publicationSlug: Schema.Union([
      Schema.String.check(
        Schema.isPattern(new RegExp("^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$",
        }),
      ),
      Schema.Null,
    ]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "Newsletter" }))();
export type NewslettersListQuery = { readonly namespaceId?: NamespaceId | null };
export const NewslettersListQuery = /* @__PURE__ */ (() =>
  Schema.Struct({ namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])) }))();
export type NewslettersList200 = { readonly items: ReadonlyArray<Newsletter> };
export const NewslettersList200 = /* @__PURE__ */ (() =>
  Schema.Struct({ items: Schema.Array(Newsletter) }))();
export type NewslettersList401 = UnauthorizedError;
export const NewslettersList401 = UnauthorizedError;
export type NewslettersList403 = ForbiddenError | FlagDisabledError;
export const NewslettersList403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewslettersList404 = ResourceNotFoundError;
export const NewslettersList404 = ResourceNotFoundError;
export type NewslettersList409 = ConflictError;
export const NewslettersList409 = ConflictError;
export type NewslettersList422 = ValidationError;
export const NewslettersList422 = ValidationError;
export type NewslettersList500 = InternalError;
export const NewslettersList500 = InternalError;
export type NewslettersList504 = GatewayTimeoutError;
export const NewslettersList504 = GatewayTimeoutError;
export type NewslettersCreateHeaders = { readonly "idempotency-key"?: string | null };
export const NewslettersCreateHeaders = /* @__PURE__ */ (() =>
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
export type NewslettersCreateRequestJson = {
  readonly topicId?: TopicId | null;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly namespaceId?: NamespaceId | null;
  readonly archiveEnabled?: boolean | null;
  readonly publicationSlug?: string | null;
};
export const NewslettersCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    topicId: Schema.optionalKey(Schema.Union([TopicId, Schema.Null])),
    name: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        )
          .check(
            Schema.isMaxCodePoints(120).annotate({
              expected: "a string with at most 120 code points",
            }),
          )
          .check(
            Schema.isMaxLength(120).annotate({ expected: "a value with a length of at most 120" }),
          ),
        Schema.Null,
      ]),
    ),
    description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
    archiveEnabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    publicationSlug: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isPattern(new RegExp("^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }))();
export type NewslettersCreate201 = Newsletter;
export const NewslettersCreate201 = Newsletter;
export type NewslettersCreate401 = UnauthorizedError;
export const NewslettersCreate401 = UnauthorizedError;
export type NewslettersCreate403 = ForbiddenError | FlagDisabledError;
export const NewslettersCreate403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewslettersCreate404 = ResourceNotFoundError;
export const NewslettersCreate404 = ResourceNotFoundError;
export type NewslettersCreate409 = ConflictError;
export const NewslettersCreate409 = ConflictError;
export type NewslettersCreate422 = ValidationError;
export const NewslettersCreate422 = ValidationError;
export type NewslettersCreate500 = InternalError;
export const NewslettersCreate500 = InternalError;
export type NewslettersCreate504 = GatewayTimeoutError;
export const NewslettersCreate504 = GatewayTimeoutError;
export type NewslettersGetPathParams = { readonly id: NewsletterId };
export const NewslettersGetPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: NewsletterId }))();
export type NewslettersGet200 = Newsletter;
export const NewslettersGet200 = Newsletter;
export type NewslettersGet401 = UnauthorizedError;
export const NewslettersGet401 = UnauthorizedError;
export type NewslettersGet403 = ForbiddenError | FlagDisabledError;
export const NewslettersGet403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewslettersGet404 = ResourceNotFoundError;
export const NewslettersGet404 = ResourceNotFoundError;
export type NewslettersGet409 = ConflictError;
export const NewslettersGet409 = ConflictError;
export type NewslettersGet422 = ValidationError;
export const NewslettersGet422 = ValidationError;
export type NewslettersGet500 = InternalError;
export const NewslettersGet500 = InternalError;
export type NewslettersGet504 = GatewayTimeoutError;
export const NewslettersGet504 = GatewayTimeoutError;
export type NewslettersRemovePathParams = { readonly id: NewsletterId };
export const NewslettersRemovePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: NewsletterId }))();
export type NewslettersRemoveHeaders = { readonly "idempotency-key"?: string | null };
export const NewslettersRemoveHeaders = /* @__PURE__ */ (() =>
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
export type NewslettersRemove200 = { readonly success: boolean };
export const NewslettersRemove200 = /* @__PURE__ */ (() =>
  Schema.Struct({ success: Schema.Boolean }))();
export type NewslettersRemove401 = UnauthorizedError;
export const NewslettersRemove401 = UnauthorizedError;
export type NewslettersRemove403 = ForbiddenError | FlagDisabledError;
export const NewslettersRemove403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewslettersRemove404 = ResourceNotFoundError;
export const NewslettersRemove404 = ResourceNotFoundError;
export type NewslettersRemove409 = ConflictError;
export const NewslettersRemove409 = ConflictError;
export type NewslettersRemove422 = ValidationError;
export const NewslettersRemove422 = ValidationError;
export type NewslettersRemove500 = InternalError;
export const NewslettersRemove500 = InternalError;
export type NewslettersRemove504 = GatewayTimeoutError;
export const NewslettersRemove504 = GatewayTimeoutError;
export type NewslettersUpdatePathParams = { readonly id: NewsletterId };
export const NewslettersUpdatePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: NewsletterId }))();
export type NewslettersUpdateHeaders = { readonly "idempotency-key"?: string | null };
export const NewslettersUpdateHeaders = /* @__PURE__ */ (() =>
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
export type NewslettersUpdateRequestJson = {
  readonly archiveEnabled?: boolean | null;
  readonly publicationSlug?: string | null;
};
export const NewslettersUpdateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    archiveEnabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    publicationSlug: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isPattern(new RegExp("^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }))();
export type NewslettersUpdate200 = Newsletter;
export const NewslettersUpdate200 = Newsletter;
export type NewslettersUpdate401 = UnauthorizedError;
export const NewslettersUpdate401 = UnauthorizedError;
export type NewslettersUpdate403 = ForbiddenError | FlagDisabledError;
export const NewslettersUpdate403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewslettersUpdate404 = ResourceNotFoundError;
export const NewslettersUpdate404 = ResourceNotFoundError;
export type NewslettersUpdate409 = ConflictError;
export const NewslettersUpdate409 = ConflictError;
export type NewslettersUpdate422 = ValidationError;
export const NewslettersUpdate422 = ValidationError;
export type NewslettersUpdate500 = InternalError;
export const NewslettersUpdate500 = InternalError;
export type NewslettersUpdate504 = GatewayTimeoutError;
export const NewslettersUpdate504 = GatewayTimeoutError;

export class NewslettersGroup extends HttpApiGroup.make("Newsletters")
  .add(
    HttpApiEndpoint.get("newslettersList", "/v1/newsletters", {
      query: NewslettersListQuery,
      success: NewslettersList200,
      error: [
        NewslettersList401.pipe(HttpApiSchema.status(401)),
        NewslettersList403.pipe(HttpApiSchema.status(403)),
        NewslettersList404.pipe(HttpApiSchema.status(404)),
        NewslettersList409.pipe(HttpApiSchema.status(409)),
        NewslettersList422.pipe(HttpApiSchema.status(422)),
        NewslettersList500,
        NewslettersList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletters.list")
      .annotate(OpenApi.Summary, "List newsletters")
      .annotate(
        OpenApi.Description,
        "List visible newsletters and their consent topics and publishing settings. The topic namespace bounds access.",
      ),
    HttpApiEndpoint.post("newslettersCreate", "/v1/newsletters", {
      headers: NewslettersCreateHeaders,
      payload: NewslettersCreateRequestJson,
      success: NewslettersCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        NewslettersCreate401.pipe(HttpApiSchema.status(401)),
        NewslettersCreate403.pipe(HttpApiSchema.status(403)),
        NewslettersCreate404.pipe(HttpApiSchema.status(404)),
        NewslettersCreate409.pipe(HttpApiSchema.status(409)),
        NewslettersCreate422.pipe(HttpApiSchema.status(422)),
        NewslettersCreate500,
        NewslettersCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletters.create")
      .annotate(OpenApi.Summary, "Create a newsletter")
      .annotate(
        OpenApi.Description,
        "Creates an opt-in topic, or adopts topicId. Name is required when creating a topic. A topic belongs to at most one newsletter. Sending defaults and subscriptions belong to the topic.",
      ),
    HttpApiEndpoint.get("newslettersGet", "/v1/newsletters/:id", {
      params: NewslettersGetPathParams,
      success: NewslettersGet200,
      error: [
        NewslettersGet401.pipe(HttpApiSchema.status(401)),
        NewslettersGet403.pipe(HttpApiSchema.status(403)),
        NewslettersGet404.pipe(HttpApiSchema.status(404)),
        NewslettersGet409.pipe(HttpApiSchema.status(409)),
        NewslettersGet422.pipe(HttpApiSchema.status(422)),
        NewslettersGet500,
        NewslettersGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletters.get")
      .annotate(OpenApi.Summary, "Get a newsletter")
      .annotate(
        OpenApi.Description,
        "Read one newsletter, including its consent topic ID, issue project, archive status, and hosted slug.",
      ),
    HttpApiEndpoint.delete("newslettersRemove", "/v1/newsletters/:id", {
      params: NewslettersRemovePathParams,
      headers: NewslettersRemoveHeaders,
      success: NewslettersRemove200,
      error: [
        NewslettersRemove401.pipe(HttpApiSchema.status(401)),
        NewslettersRemove403.pipe(HttpApiSchema.status(403)),
        NewslettersRemove404.pipe(HttpApiSchema.status(404)),
        NewslettersRemove409.pipe(HttpApiSchema.status(409)),
        NewslettersRemove422.pipe(HttpApiSchema.status(422)),
        NewslettersRemove500,
        NewslettersRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletters.remove")
      .annotate(OpenApi.Summary, "Delete a newsletter")
      .annotate(
        OpenApi.Description,
        "Withdraws the public archive and removes the issue repository. The consent topic and its subscriptions remain.",
      ),
    HttpApiEndpoint.patch("newslettersUpdate", "/v1/newsletters/:id", {
      params: NewslettersUpdatePathParams,
      headers: NewslettersUpdateHeaders,
      payload: NewslettersUpdateRequestJson,
      success: NewslettersUpdate200,
      error: [
        NewslettersUpdate401.pipe(HttpApiSchema.status(401)),
        NewslettersUpdate403.pipe(HttpApiSchema.status(403)),
        NewslettersUpdate404.pipe(HttpApiSchema.status(404)),
        NewslettersUpdate409.pipe(HttpApiSchema.status(409)),
        NewslettersUpdate422.pipe(HttpApiSchema.status(422)),
        NewslettersUpdate500,
        NewslettersUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletters.update")
      .annotate(OpenApi.Summary, "Update a newsletter")
      .annotate(
        OpenApi.Description,
        "Update named publishing settings. An enabled archive requires an opt-in topic and a hosted slug. Null clears the slug when the archive is disabled.",
      ),
  )
  .annotate(OpenApi.Description, "Newsletters, their consent topics, and publishing settings") {}
