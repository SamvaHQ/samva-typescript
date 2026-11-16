// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  ConflictError,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  MalformedRequestError,
  ResourceNotFoundError,
  ServiceUnavailableError,
  SlugTaken,
  TemplateProjectId,
  TemplateSourceError,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type TemplateShareLinksGetPathParams = { readonly projectId: TemplateProjectId };
export const TemplateShareLinksGetPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ projectId: TemplateProjectId }))();
export type TemplateShareLinksGet200 = {
  readonly slug: string;
  readonly url: string;
  readonly canonicalPath: string;
  readonly views: number;
  readonly opens: number;
  readonly updatedAt: string;
} | null;
export const TemplateShareLinksGet200 = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Struct({
      slug: Schema.String.check(
        Schema.isPattern(new globalThis.RegExp("^[a-z0-9-]{3,60}$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-z0-9-]{3,60}$",
        }),
      ),
      url: Schema.String,
      canonicalPath: Schema.String,
      views: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      opens: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      updatedAt: Schema.String,
    }),
    Schema.Null,
  ]))();
export type TemplateShareLinksGet400 = MalformedRequestError;
export const TemplateShareLinksGet400 = MalformedRequestError;
export type TemplateShareLinksGet401 = UnauthorizedError;
export const TemplateShareLinksGet401 = UnauthorizedError;
export type TemplateShareLinksGet403 = ForbiddenError;
export const TemplateShareLinksGet403 = ForbiddenError;
export type TemplateShareLinksGet404 = ResourceNotFoundError;
export const TemplateShareLinksGet404 = ResourceNotFoundError;
export type TemplateShareLinksGet409 = ConflictError | SlugTaken;
export const TemplateShareLinksGet409 = /* @__PURE__ */ (() =>
  Schema.Union([ConflictError, SlugTaken]))();
export type TemplateShareLinksGet422 = ValidationError | TemplateSourceError;
export const TemplateShareLinksGet422 = /* @__PURE__ */ (() =>
  Schema.Union([ValidationError, TemplateSourceError]))();
export type TemplateShareLinksGet500 = InternalError;
export const TemplateShareLinksGet500 = InternalError;
export type TemplateShareLinksGet503 = ServiceUnavailableError;
export const TemplateShareLinksGet503 = ServiceUnavailableError;
export type TemplateShareLinksGet504 = GatewayTimeoutError;
export const TemplateShareLinksGet504 = GatewayTimeoutError;
export type TemplateShareLinksCreatePathParams = { readonly projectId: TemplateProjectId };
export const TemplateShareLinksCreatePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ projectId: TemplateProjectId }))();
export type TemplateShareLinksCreateRequestJson = { readonly slug?: string | null };
export const TemplateShareLinksCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    slug: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isPattern(new globalThis.RegExp("^[a-z0-9-]{3,60}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-z0-9-]{3,60}$",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }))();
export type TemplateShareLinksCreate200 = {
  readonly slug: string;
  readonly url: string;
  readonly canonicalPath: string;
  readonly views: number;
  readonly opens: number;
  readonly updatedAt: string;
};
export const TemplateShareLinksCreate200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    slug: Schema.String.check(
      Schema.isPattern(new globalThis.RegExp("^[a-z0-9-]{3,60}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-z0-9-]{3,60}$",
      }),
    ),
    url: Schema.String,
    canonicalPath: Schema.String,
    views: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    opens: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    updatedAt: Schema.String,
  }))();
export type TemplateShareLinksCreate400 = MalformedRequestError;
export const TemplateShareLinksCreate400 = MalformedRequestError;
export type TemplateShareLinksCreate401 = UnauthorizedError;
export const TemplateShareLinksCreate401 = UnauthorizedError;
export type TemplateShareLinksCreate403 = ForbiddenError;
export const TemplateShareLinksCreate403 = ForbiddenError;
export type TemplateShareLinksCreate404 = ResourceNotFoundError;
export const TemplateShareLinksCreate404 = ResourceNotFoundError;
export type TemplateShareLinksCreate409 = ConflictError | SlugTaken;
export const TemplateShareLinksCreate409 = /* @__PURE__ */ (() =>
  Schema.Union([ConflictError, SlugTaken]))();
export type TemplateShareLinksCreate422 = ValidationError | TemplateSourceError;
export const TemplateShareLinksCreate422 = /* @__PURE__ */ (() =>
  Schema.Union([ValidationError, TemplateSourceError]))();
export type TemplateShareLinksCreate500 = InternalError;
export const TemplateShareLinksCreate500 = InternalError;
export type TemplateShareLinksCreate503 = ServiceUnavailableError;
export const TemplateShareLinksCreate503 = ServiceUnavailableError;
export type TemplateShareLinksCreate504 = GatewayTimeoutError;
export const TemplateShareLinksCreate504 = GatewayTimeoutError;
export type TemplateShareLinksDeletePathParams = { readonly projectId: TemplateProjectId };
export const TemplateShareLinksDeletePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ projectId: TemplateProjectId }))();
export type TemplateShareLinksDelete200 = { readonly deleted: boolean };
export const TemplateShareLinksDelete200 = /* @__PURE__ */ (() =>
  Schema.Struct({ deleted: Schema.Boolean }))();
export type TemplateShareLinksDelete400 = MalformedRequestError;
export const TemplateShareLinksDelete400 = MalformedRequestError;
export type TemplateShareLinksDelete401 = UnauthorizedError;
export const TemplateShareLinksDelete401 = UnauthorizedError;
export type TemplateShareLinksDelete403 = ForbiddenError;
export const TemplateShareLinksDelete403 = ForbiddenError;
export type TemplateShareLinksDelete404 = ResourceNotFoundError;
export const TemplateShareLinksDelete404 = ResourceNotFoundError;
export type TemplateShareLinksDelete409 = ConflictError | SlugTaken;
export const TemplateShareLinksDelete409 = /* @__PURE__ */ (() =>
  Schema.Union([ConflictError, SlugTaken]))();
export type TemplateShareLinksDelete422 = ValidationError | TemplateSourceError;
export const TemplateShareLinksDelete422 = /* @__PURE__ */ (() =>
  Schema.Union([ValidationError, TemplateSourceError]))();
export type TemplateShareLinksDelete500 = InternalError;
export const TemplateShareLinksDelete500 = InternalError;
export type TemplateShareLinksDelete503 = ServiceUnavailableError;
export const TemplateShareLinksDelete503 = ServiceUnavailableError;
export type TemplateShareLinksDelete504 = GatewayTimeoutError;
export const TemplateShareLinksDelete504 = GatewayTimeoutError;
export type TemplateShareLinksRenamePathParams = { readonly projectId: TemplateProjectId };
export const TemplateShareLinksRenamePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ projectId: TemplateProjectId }))();
export type TemplateShareLinksRenameRequestJson = { readonly slug: string };
export const TemplateShareLinksRenameRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    slug: Schema.String.check(
      Schema.isPattern(new globalThis.RegExp("^[a-z0-9-]{3,60}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-z0-9-]{3,60}$",
      }),
    ),
  }))();
export type TemplateShareLinksRename200 = {
  readonly slug: string;
  readonly url: string;
  readonly canonicalPath: string;
  readonly views: number;
  readonly opens: number;
  readonly updatedAt: string;
};
export const TemplateShareLinksRename200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    slug: Schema.String.check(
      Schema.isPattern(new globalThis.RegExp("^[a-z0-9-]{3,60}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-z0-9-]{3,60}$",
      }),
    ),
    url: Schema.String,
    canonicalPath: Schema.String,
    views: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    opens: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    updatedAt: Schema.String,
  }))();
export type TemplateShareLinksRename400 = MalformedRequestError;
export const TemplateShareLinksRename400 = MalformedRequestError;
export type TemplateShareLinksRename401 = UnauthorizedError;
export const TemplateShareLinksRename401 = UnauthorizedError;
export type TemplateShareLinksRename403 = ForbiddenError;
export const TemplateShareLinksRename403 = ForbiddenError;
export type TemplateShareLinksRename404 = ResourceNotFoundError;
export const TemplateShareLinksRename404 = ResourceNotFoundError;
export type TemplateShareLinksRename409 = ConflictError | SlugTaken;
export const TemplateShareLinksRename409 = /* @__PURE__ */ (() =>
  Schema.Union([ConflictError, SlugTaken]))();
export type TemplateShareLinksRename422 = ValidationError | TemplateSourceError;
export const TemplateShareLinksRename422 = /* @__PURE__ */ (() =>
  Schema.Union([ValidationError, TemplateSourceError]))();
export type TemplateShareLinksRename500 = InternalError;
export const TemplateShareLinksRename500 = InternalError;
export type TemplateShareLinksRename503 = ServiceUnavailableError;
export const TemplateShareLinksRename503 = ServiceUnavailableError;
export type TemplateShareLinksRename504 = GatewayTimeoutError;
export const TemplateShareLinksRename504 = GatewayTimeoutError;
export type TemplateShareLinksUpdatePathParams = { readonly projectId: TemplateProjectId };
export const TemplateShareLinksUpdatePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ projectId: TemplateProjectId }))();
export type TemplateShareLinksUpdate200 = {
  readonly slug: string;
  readonly url: string;
  readonly canonicalPath: string;
  readonly views: number;
  readonly opens: number;
  readonly updatedAt: string;
};
export const TemplateShareLinksUpdate200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    slug: Schema.String.check(
      Schema.isPattern(new globalThis.RegExp("^[a-z0-9-]{3,60}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-z0-9-]{3,60}$",
      }),
    ),
    url: Schema.String,
    canonicalPath: Schema.String,
    views: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    opens: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    updatedAt: Schema.String,
  }))();
export type TemplateShareLinksUpdate400 = MalformedRequestError;
export const TemplateShareLinksUpdate400 = MalformedRequestError;
export type TemplateShareLinksUpdate401 = UnauthorizedError;
export const TemplateShareLinksUpdate401 = UnauthorizedError;
export type TemplateShareLinksUpdate403 = ForbiddenError;
export const TemplateShareLinksUpdate403 = ForbiddenError;
export type TemplateShareLinksUpdate404 = ResourceNotFoundError;
export const TemplateShareLinksUpdate404 = ResourceNotFoundError;
export type TemplateShareLinksUpdate409 = ConflictError | SlugTaken;
export const TemplateShareLinksUpdate409 = /* @__PURE__ */ (() =>
  Schema.Union([ConflictError, SlugTaken]))();
export type TemplateShareLinksUpdate422 = ValidationError | TemplateSourceError;
export const TemplateShareLinksUpdate422 = /* @__PURE__ */ (() =>
  Schema.Union([ValidationError, TemplateSourceError]))();
export type TemplateShareLinksUpdate500 = InternalError;
export const TemplateShareLinksUpdate500 = InternalError;
export type TemplateShareLinksUpdate503 = ServiceUnavailableError;
export const TemplateShareLinksUpdate503 = ServiceUnavailableError;
export type TemplateShareLinksUpdate504 = GatewayTimeoutError;
export const TemplateShareLinksUpdate504 = GatewayTimeoutError;

export class TemplateShareLinksGroup extends HttpApiGroup.make("Template share links")
  .add(
    HttpApiEndpoint.get("templateShareLinksGet", "/v1/template-projects/:projectId/share-link", {
      params: TemplateShareLinksGetPathParams,
      success: TemplateShareLinksGet200,
      error: [
        TemplateShareLinksGet400.pipe(HttpApiSchema.status(400)),
        TemplateShareLinksGet401.pipe(HttpApiSchema.status(401)),
        TemplateShareLinksGet403.pipe(HttpApiSchema.status(403)),
        TemplateShareLinksGet404.pipe(HttpApiSchema.status(404)),
        TemplateShareLinksGet409.pipe(HttpApiSchema.status(409)),
        TemplateShareLinksGet422.pipe(HttpApiSchema.status(422)),
        TemplateShareLinksGet500,
        TemplateShareLinksGet503.pipe(HttpApiSchema.status(503)),
        TemplateShareLinksGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templateShareLinks.get")
      .annotate(OpenApi.Summary, "Get a project's share link")
      .annotate(
        OpenApi.Description,
        "Returns the share link and counts, or null when the project has no share link.",
      ),
    HttpApiEndpoint.post(
      "templateShareLinksCreate",
      "/v1/template-projects/:projectId/share-link",
      {
        params: TemplateShareLinksCreatePathParams,
        payload: TemplateShareLinksCreateRequestJson,
        success: TemplateShareLinksCreate200,
        error: [
          TemplateShareLinksCreate400.pipe(HttpApiSchema.status(400)),
          TemplateShareLinksCreate401.pipe(HttpApiSchema.status(401)),
          TemplateShareLinksCreate403.pipe(HttpApiSchema.status(403)),
          TemplateShareLinksCreate404.pipe(HttpApiSchema.status(404)),
          TemplateShareLinksCreate409.pipe(HttpApiSchema.status(409)),
          TemplateShareLinksCreate422.pipe(HttpApiSchema.status(422)),
          TemplateShareLinksCreate500,
          TemplateShareLinksCreate503.pipe(HttpApiSchema.status(503)),
          TemplateShareLinksCreate504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templateShareLinks.create")
      .annotate(OpenApi.Summary, "Create a share link")
      .annotate(
        OpenApi.Description,
        "Exports the project's latest Save as a share link. Omit slug to use the slugified project name.",
      ),
    HttpApiEndpoint.delete(
      "templateShareLinksDelete",
      "/v1/template-projects/:projectId/share-link",
      {
        params: TemplateShareLinksDeletePathParams,
        success: TemplateShareLinksDelete200,
        error: [
          TemplateShareLinksDelete400.pipe(HttpApiSchema.status(400)),
          TemplateShareLinksDelete401.pipe(HttpApiSchema.status(401)),
          TemplateShareLinksDelete403.pipe(HttpApiSchema.status(403)),
          TemplateShareLinksDelete404.pipe(HttpApiSchema.status(404)),
          TemplateShareLinksDelete409.pipe(HttpApiSchema.status(409)),
          TemplateShareLinksDelete422.pipe(HttpApiSchema.status(422)),
          TemplateShareLinksDelete500,
          TemplateShareLinksDelete503.pipe(HttpApiSchema.status(503)),
          TemplateShareLinksDelete504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templateShareLinks.delete")
      .annotate(OpenApi.Summary, "Delete a share link")
      .annotate(
        OpenApi.Description,
        "Disables the public link. Copies already opened remain with their owners.",
      ),
    HttpApiEndpoint.patch(
      "templateShareLinksRename",
      "/v1/template-projects/:projectId/share-link",
      {
        params: TemplateShareLinksRenamePathParams,
        payload: TemplateShareLinksRenameRequestJson,
        success: TemplateShareLinksRename200,
        error: [
          TemplateShareLinksRename400.pipe(HttpApiSchema.status(400)),
          TemplateShareLinksRename401.pipe(HttpApiSchema.status(401)),
          TemplateShareLinksRename403.pipe(HttpApiSchema.status(403)),
          TemplateShareLinksRename404.pipe(HttpApiSchema.status(404)),
          TemplateShareLinksRename409.pipe(HttpApiSchema.status(409)),
          TemplateShareLinksRename422.pipe(HttpApiSchema.status(422)),
          TemplateShareLinksRename500,
          TemplateShareLinksRename503.pipe(HttpApiSchema.status(503)),
          TemplateShareLinksRename504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templateShareLinks.rename")
      .annotate(OpenApi.Summary, "Rename a share link")
      .annotate(
        OpenApi.Description,
        "Changes the slug. The old link immediately stops working, with no redirect.",
      ),
    HttpApiEndpoint.post(
      "templateShareLinksUpdate",
      "/v1/template-projects/:projectId/share-link/update",
      {
        params: TemplateShareLinksUpdatePathParams,
        success: TemplateShareLinksUpdate200,
        error: [
          TemplateShareLinksUpdate400.pipe(HttpApiSchema.status(400)),
          TemplateShareLinksUpdate401.pipe(HttpApiSchema.status(401)),
          TemplateShareLinksUpdate403.pipe(HttpApiSchema.status(403)),
          TemplateShareLinksUpdate404.pipe(HttpApiSchema.status(404)),
          TemplateShareLinksUpdate409.pipe(HttpApiSchema.status(409)),
          TemplateShareLinksUpdate422.pipe(HttpApiSchema.status(422)),
          TemplateShareLinksUpdate500,
          TemplateShareLinksUpdate503.pipe(HttpApiSchema.status(503)),
          TemplateShareLinksUpdate504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templateShareLinks.update")
      .annotate(OpenApi.Summary, "Update a share link")
      .annotate(
        OpenApi.Description,
        "Replaces the share link snapshot from the latest Save, keeping its link and counts.",
      ),
  )
  .annotate(OpenApi.Description, "Create and maintain share link snapshots.") {}
