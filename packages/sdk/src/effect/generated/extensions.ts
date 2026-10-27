// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  ConflictError,
  Cursor,
  ExtensionId,
  ExtensionVersionId,
  ExtensionVersionRef,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type ExtensionBundle = { readonly sha256: string; readonly sizeBytes: number };
export const ExtensionBundle = /* @__PURE__ */ Schema.Struct({
  sha256: Schema.String,
  sizeBytes: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
}).annotate({ identifier: "ExtensionBundle" });
export type ExtensionVersion = {
  readonly id: ExtensionVersionId;
  readonly version: string;
  readonly runtime: "hosted" | "webhook";
  readonly bundle: ExtensionBundle | null;
  readonly publishedAt: string;
  readonly manifest: {
    readonly name: string;
    readonly displayName: string;
    readonly description?: string | null;
    readonly version: string;
    readonly runtime: "hosted" | "webhook";
    readonly events: ReadonlyArray<
      | "mailbox.message.received"
      | "mailbox.message.sent"
      | "mailbox.action.pending_approval"
      | "mailbox.action.resolved"
      | "mailbox.message.quarantined"
      | "mailbox.message.released"
      | "mailbox.message.discarded"
    >;
    readonly permissions: ReadonlyArray<"read" | "update" | "send" | "quarantine.read">;
  };
};
export const ExtensionVersion = /* @__PURE__ */ Schema.Struct({
  id: ExtensionVersionId,
  version: Schema.String,
  runtime: Schema.Union([Schema.Literal("hosted"), Schema.Literal("webhook")]),
  bundle: Schema.Union([ExtensionBundle, Schema.Null]),
  publishedAt: Schema.String,
  manifest: Schema.Struct({
    name: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-z][a-z0-9-]{1,62}[a-z0-9]$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-z][a-z0-9-]{1,62}[a-z0-9]$",
      }),
    ),
    displayName: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(80).annotate({ expected: "a string with at most 80 code points" }),
      )
      .check(Schema.isMaxLength(80).annotate({ expected: "a value with a length of at most 80" })),
    description: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(500).annotate({
            expected: "a string with at most 500 code points",
          }),
        ).check(
          Schema.isMaxLength(500).annotate({ expected: "a value with a length of at most 500" }),
        ),
        Schema.Null,
      ]),
    ),
    version: Schema.String.check(
      Schema.isPattern(
        new RegExp("^\\d{1,6}\\.\\d{1,6}\\.\\d{1,6}(?:-[0-9A-Za-z.-]{1,64})?$", "u"),
      ).annotate({
        expected:
          "a string matching the RegExp ^\\d{1,6}\\.\\d{1,6}\\.\\d{1,6}(?:-[0-9A-Za-z.-]{1,64})?$",
      }),
    ),
    runtime: Schema.Union([Schema.Literal("hosted"), Schema.Literal("webhook")]),
    events: Schema.Array(
      Schema.Union([
        Schema.Literal("mailbox.message.received"),
        Schema.Literal("mailbox.message.sent"),
        Schema.Literal("mailbox.action.pending_approval"),
        Schema.Literal("mailbox.action.resolved"),
        Schema.Literal("mailbox.message.quarantined"),
        Schema.Literal("mailbox.message.released"),
        Schema.Literal("mailbox.message.discarded"),
      ]),
    ).check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" })),
    permissions: Schema.Array(
      Schema.Union([
        Schema.Literal("read"),
        Schema.Literal("update"),
        Schema.Literal("send"),
        Schema.Literal("quarantine.read"),
      ]),
    ),
  }),
}).annotate({ identifier: "ExtensionVersion" });
export type ExtensionVersionSummary = {
  readonly id: ExtensionVersionId;
  readonly version: string;
  readonly runtime: "hosted" | "webhook";
  readonly bundle: ExtensionBundle | null;
  readonly publishedAt: string;
};
export const ExtensionVersionSummary = /* @__PURE__ */ Schema.Struct({
  id: ExtensionVersionId,
  version: Schema.String,
  runtime: Schema.Union([Schema.Literal("hosted"), Schema.Literal("webhook")]),
  bundle: Schema.Union([ExtensionBundle, Schema.Null]),
  publishedAt: Schema.String,
}).annotate({ identifier: "ExtensionVersionSummary" });
export type Extension = {
  readonly id: ExtensionId;
  readonly name: string;
  readonly displayName: string;
  readonly description: string | null;
  readonly runtime: "hosted" | "webhook";
  readonly latestVersion: ExtensionVersionRef;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const Extension = /* @__PURE__ */ Schema.Struct({
  id: ExtensionId,
  name: Schema.String,
  displayName: Schema.String,
  description: Schema.Union([Schema.String, Schema.Null]),
  runtime: Schema.Union([Schema.Literal("hosted"), Schema.Literal("webhook")]),
  latestVersion: ExtensionVersionRef,
  createdAt: Schema.String,
  updatedAt: Schema.String,
}).annotate({ identifier: "Extension" });
export type ExtensionVersionPage = {
  readonly items: ReadonlyArray<ExtensionVersionSummary>;
  readonly nextCursor: string | null;
};
export const ExtensionVersionPage = /* @__PURE__ */ Schema.Struct({
  items: Schema.Array(ExtensionVersionSummary),
  nextCursor: Schema.Union([Schema.String, Schema.Null]),
}).annotate({ identifier: "ExtensionVersionPage" });
export type ExtensionPage = {
  readonly items: ReadonlyArray<Extension>;
  readonly nextCursor: string | null;
};
export const ExtensionPage = /* @__PURE__ */ Schema.Struct({
  items: Schema.Array(Extension),
  nextCursor: Schema.Union([Schema.String, Schema.Null]),
}).annotate({ identifier: "ExtensionPage" });
export type PublishExtensionVersionResponse = {
  readonly extension: Extension;
  readonly version: ExtensionVersion;
};
export const PublishExtensionVersionResponse = /* @__PURE__ */ Schema.Struct({
  extension: Extension,
  version: ExtensionVersion,
}).annotate({ identifier: "PublishExtensionVersionResponse" });
export type ExtensionsListQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
  readonly after?: string | null;
  readonly before?: string | null;
};
export const ExtensionsListQuery = /* @__PURE__ */ Schema.Struct({
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
export type ExtensionsList200 = ExtensionPage;
export const ExtensionsList200 = ExtensionPage;
export type ExtensionsList401 = UnauthorizedError;
export const ExtensionsList401 = UnauthorizedError;
export type ExtensionsList403 = ForbiddenError;
export const ExtensionsList403 = ForbiddenError;
export type ExtensionsList404 = ResourceNotFoundError;
export const ExtensionsList404 = ResourceNotFoundError;
export type ExtensionsList422 = ValidationError;
export const ExtensionsList422 = ValidationError;
export type ExtensionsList500 = InternalError;
export const ExtensionsList500 = InternalError;
export type ExtensionsList504 = GatewayTimeoutError;
export const ExtensionsList504 = GatewayTimeoutError;
export type ExtensionsPublishRequestJson = {
  readonly manifest: {
    readonly name: string;
    readonly displayName: string;
    readonly description?: string | null;
    readonly version: string;
    readonly runtime: "hosted" | "webhook";
    readonly events: ReadonlyArray<
      | "mailbox.message.received"
      | "mailbox.message.sent"
      | "mailbox.action.pending_approval"
      | "mailbox.action.resolved"
      | "mailbox.message.quarantined"
      | "mailbox.message.released"
      | "mailbox.message.discarded"
    >;
    readonly permissions: ReadonlyArray<"read" | "update" | "send" | "quarantine.read">;
  };
  readonly bundle?: string | null;
};
export const ExtensionsPublishRequestJson = /* @__PURE__ */ Schema.Struct({
  manifest: Schema.Struct({
    name: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-z][a-z0-9-]{1,62}[a-z0-9]$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-z][a-z0-9-]{1,62}[a-z0-9]$",
      }),
    ),
    displayName: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(80).annotate({ expected: "a string with at most 80 code points" }),
      )
      .check(Schema.isMaxLength(80).annotate({ expected: "a value with a length of at most 80" })),
    description: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(500).annotate({
            expected: "a string with at most 500 code points",
          }),
        ).check(
          Schema.isMaxLength(500).annotate({ expected: "a value with a length of at most 500" }),
        ),
        Schema.Null,
      ]),
    ),
    version: Schema.String.check(
      Schema.isPattern(
        new RegExp("^\\d{1,6}\\.\\d{1,6}\\.\\d{1,6}(?:-[0-9A-Za-z.-]{1,64})?$", "u"),
      ).annotate({
        expected:
          "a string matching the RegExp ^\\d{1,6}\\.\\d{1,6}\\.\\d{1,6}(?:-[0-9A-Za-z.-]{1,64})?$",
      }),
    ),
    runtime: Schema.Union([Schema.Literal("hosted"), Schema.Literal("webhook")]),
    events: Schema.Array(
      Schema.Union([
        Schema.Literal("mailbox.message.received"),
        Schema.Literal("mailbox.message.sent"),
        Schema.Literal("mailbox.action.pending_approval"),
        Schema.Literal("mailbox.action.resolved"),
        Schema.Literal("mailbox.message.quarantined"),
        Schema.Literal("mailbox.message.released"),
        Schema.Literal("mailbox.message.discarded"),
      ]),
    ).check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" })),
    permissions: Schema.Array(
      Schema.Union([
        Schema.Literal("read"),
        Schema.Literal("update"),
        Schema.Literal("send"),
        Schema.Literal("quarantine.read"),
      ]),
    ),
  }),
  bundle: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
});
export type ExtensionsPublish201 = PublishExtensionVersionResponse;
export const ExtensionsPublish201 = PublishExtensionVersionResponse;
export type ExtensionsPublish401 = UnauthorizedError;
export const ExtensionsPublish401 = UnauthorizedError;
export type ExtensionsPublish403 = ForbiddenError;
export const ExtensionsPublish403 = ForbiddenError;
export type ExtensionsPublish404 = ResourceNotFoundError;
export const ExtensionsPublish404 = ResourceNotFoundError;
export type ExtensionsPublish409 = ConflictError;
export const ExtensionsPublish409 = ConflictError;
export type ExtensionsPublish422 = ValidationError;
export const ExtensionsPublish422 = ValidationError;
export type ExtensionsPublish500 = InternalError;
export const ExtensionsPublish500 = InternalError;
export type ExtensionsPublish504 = GatewayTimeoutError;
export const ExtensionsPublish504 = GatewayTimeoutError;
export type ExtensionsGetPathParams = { readonly id: string };
export const ExtensionsGetPathParams = /* @__PURE__ */ Schema.Struct({
  id: Schema.String.annotate({ description: "The extension's id (`ext_…`) or its name." })
    .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
    .check(
      Schema.isMaxCodePoints(64).annotate({ expected: "a string with at most 64 code points" }),
    )
    .check(Schema.isMaxLength(64).annotate({ expected: "a value with a length of at most 64" })),
});
export type ExtensionsGet200 = Extension;
export const ExtensionsGet200 = Extension;
export type ExtensionsGet401 = UnauthorizedError;
export const ExtensionsGet401 = UnauthorizedError;
export type ExtensionsGet403 = ForbiddenError;
export const ExtensionsGet403 = ForbiddenError;
export type ExtensionsGet404 = ResourceNotFoundError;
export const ExtensionsGet404 = ResourceNotFoundError;
export type ExtensionsGet422 = ValidationError;
export const ExtensionsGet422 = ValidationError;
export type ExtensionsGet500 = InternalError;
export const ExtensionsGet500 = InternalError;
export type ExtensionsGet504 = GatewayTimeoutError;
export const ExtensionsGet504 = GatewayTimeoutError;
export type ExtensionsListVersionsPathParams = { readonly id: string };
export const ExtensionsListVersionsPathParams = /* @__PURE__ */ Schema.Struct({
  id: Schema.String.annotate({ description: "The extension's id (`ext_…`) or its name." })
    .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
    .check(
      Schema.isMaxCodePoints(64).annotate({ expected: "a string with at most 64 code points" }),
    )
    .check(Schema.isMaxLength(64).annotate({ expected: "a value with a length of at most 64" })),
});
export type ExtensionsListVersionsQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
};
export const ExtensionsListVersionsQuery = /* @__PURE__ */ Schema.Struct({
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
export type ExtensionsListVersions200 = ExtensionVersionPage;
export const ExtensionsListVersions200 = ExtensionVersionPage;
export type ExtensionsListVersions401 = UnauthorizedError;
export const ExtensionsListVersions401 = UnauthorizedError;
export type ExtensionsListVersions403 = ForbiddenError;
export const ExtensionsListVersions403 = ForbiddenError;
export type ExtensionsListVersions404 = ResourceNotFoundError;
export const ExtensionsListVersions404 = ResourceNotFoundError;
export type ExtensionsListVersions422 = ValidationError;
export const ExtensionsListVersions422 = ValidationError;
export type ExtensionsListVersions500 = InternalError;
export const ExtensionsListVersions500 = InternalError;
export type ExtensionsListVersions504 = GatewayTimeoutError;
export const ExtensionsListVersions504 = GatewayTimeoutError;
export type ExtensionsGetVersionPathParams = { readonly id: string; readonly versionId: string };
export const ExtensionsGetVersionPathParams = /* @__PURE__ */ Schema.Struct({
  id: Schema.String.annotate({ description: "The extension's id (`ext_…`) or its name." })
    .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
    .check(
      Schema.isMaxCodePoints(64).annotate({ expected: "a string with at most 64 code points" }),
    )
    .check(Schema.isMaxLength(64).annotate({ expected: "a value with a length of at most 64" })),
  versionId: Schema.String.annotate({
    description: "The version's id (`extver_…`) or its version string, such as `1.0.0`.",
  })
    .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
    .check(
      Schema.isMaxCodePoints(85).annotate({ expected: "a string with at most 85 code points" }),
    )
    .check(Schema.isMaxLength(85).annotate({ expected: "a value with a length of at most 85" })),
});
export type ExtensionsGetVersion200 = ExtensionVersion;
export const ExtensionsGetVersion200 = ExtensionVersion;
export type ExtensionsGetVersion401 = UnauthorizedError;
export const ExtensionsGetVersion401 = UnauthorizedError;
export type ExtensionsGetVersion403 = ForbiddenError;
export const ExtensionsGetVersion403 = ForbiddenError;
export type ExtensionsGetVersion404 = ResourceNotFoundError;
export const ExtensionsGetVersion404 = ResourceNotFoundError;
export type ExtensionsGetVersion422 = ValidationError;
export const ExtensionsGetVersion422 = ValidationError;
export type ExtensionsGetVersion500 = InternalError;
export const ExtensionsGetVersion500 = InternalError;
export type ExtensionsGetVersion504 = GatewayTimeoutError;
export const ExtensionsGetVersion504 = GatewayTimeoutError;

export class ExtensionsGroup extends HttpApiGroup.make("Extensions")
  .add(
    HttpApiEndpoint.get("extensionsList", "/v1/extensions", {
      query: ExtensionsListQuery,
      success: ExtensionsList200,
      error: [
        ExtensionsList401.pipe(HttpApiSchema.status(401)),
        ExtensionsList403.pipe(HttpApiSchema.status(403)),
        ExtensionsList404.pipe(HttpApiSchema.status(404)),
        ExtensionsList422.pipe(HttpApiSchema.status(422)),
        ExtensionsList500,
        ExtensionsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "extensions.list")
      .annotate(OpenApi.Summary, "List extensions")
      .annotate(
        OpenApi.Description,
        "Returns the organization's published extensions with their latest version, newest first, filterable by creation time (`after`, `before`). Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.post("extensionsPublish", "/v1/extensions", {
      payload: ExtensionsPublishRequestJson,
      success: ExtensionsPublish201.pipe(HttpApiSchema.status(201)),
      error: [
        ExtensionsPublish401.pipe(HttpApiSchema.status(401)),
        ExtensionsPublish403.pipe(HttpApiSchema.status(403)),
        ExtensionsPublish404.pipe(HttpApiSchema.status(404)),
        ExtensionsPublish409.pipe(HttpApiSchema.status(409)),
        ExtensionsPublish422.pipe(HttpApiSchema.status(422)),
        ExtensionsPublish500,
        ExtensionsPublish504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "extensions.publish")
      .annotate(OpenApi.Summary, "Publish an extension version")
      .annotate(
        OpenApi.Description,
        "Publishes one version from its manifest and returns it with status 201, creating the extension named by the manifest on its first version. A hosted manifest carries its bundle. Publishing a version again with the same manifest and bundle returns it; a different one conflicts, so bump the manifest's version. Only a person can publish, not an API key.",
      ),
    HttpApiEndpoint.get("extensionsGet", "/v1/extensions/:id", {
      params: ExtensionsGetPathParams,
      success: ExtensionsGet200,
      error: [
        ExtensionsGet401.pipe(HttpApiSchema.status(401)),
        ExtensionsGet403.pipe(HttpApiSchema.status(403)),
        ExtensionsGet404.pipe(HttpApiSchema.status(404)),
        ExtensionsGet422.pipe(HttpApiSchema.status(422)),
        ExtensionsGet500,
        ExtensionsGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "extensions.get")
      .annotate(OpenApi.Summary, "Get an extension")
      .annotate(
        OpenApi.Description,
        "Returns one extension by its id or name. Its versions are `GET /v1/extensions/{id}/versions`.",
      ),
    HttpApiEndpoint.get("extensionsListVersions", "/v1/extensions/:id/versions", {
      params: ExtensionsListVersionsPathParams,
      query: ExtensionsListVersionsQuery,
      success: ExtensionsListVersions200,
      error: [
        ExtensionsListVersions401.pipe(HttpApiSchema.status(401)),
        ExtensionsListVersions403.pipe(HttpApiSchema.status(403)),
        ExtensionsListVersions404.pipe(HttpApiSchema.status(404)),
        ExtensionsListVersions422.pipe(HttpApiSchema.status(422)),
        ExtensionsListVersions500,
        ExtensionsListVersions504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "extensions.listVersions")
      .annotate(OpenApi.Summary, "List an extension's versions")
      .annotate(
        OpenApi.Description,
        "Returns summaries of an extension's published versions, newest first. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page. Read a version's manifest with `GET /v1/extensions/{id}/versions/{versionId}`.",
      ),
    HttpApiEndpoint.get("extensionsGetVersion", "/v1/extensions/:id/versions/:versionId", {
      params: ExtensionsGetVersionPathParams,
      success: ExtensionsGetVersion200,
      error: [
        ExtensionsGetVersion401.pipe(HttpApiSchema.status(401)),
        ExtensionsGetVersion403.pipe(HttpApiSchema.status(403)),
        ExtensionsGetVersion404.pipe(HttpApiSchema.status(404)),
        ExtensionsGetVersion422.pipe(HttpApiSchema.status(422)),
        ExtensionsGetVersion500,
        ExtensionsGetVersion504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "extensions.getVersion")
      .annotate(OpenApi.Summary, "Get an extension version")
      .annotate(
        OpenApi.Description,
        "Returns one version, by its id or version string, with the manifest it was published with.",
      ),
  )
  .annotate(
    OpenApi.Description,
    "Code that receives mailbox events and acts through the mailbox API",
  ) {}
