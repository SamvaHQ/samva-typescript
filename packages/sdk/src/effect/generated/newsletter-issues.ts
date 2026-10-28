// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  CampaignId,
  CampaignLatestRun,
  ConflictError,
  FlagDisabledError,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  JsonValue,
  NewsletterId,
  OrganizationId,
  ResourceNotFoundError,
  TemplateProjectId,
  TemplateSourceError,
  UnauthorizedError,
  UserId,
  ValidationError,
} from "./shared";

export type NewsletterIssueDocument = {
  readonly projectId: TemplateProjectId;
  readonly revision: string;
  readonly path: string;
  readonly content: string;
};
export const NewsletterIssueDocument = /* @__PURE__ */ (() =>
  Schema.Struct({
    projectId: TemplateProjectId,
    revision: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(1024).annotate({
          expected: "a string with at most 1024 code points",
        }),
      )
      .check(
        Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
      ),
    path: Schema.String.check(
      Schema.isMaxCodePoints(1024).annotate({ expected: "a string with at most 1024 code points" }),
    )
      .check(
        Schema.isPattern(
          new RegExp(
            "^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
        }),
      )
      .check(
        Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
      ),
    content: Schema.String,
  }).annotate({ identifier: "NewsletterIssueDocument" }))();
export type NewsletterIssueSend = {
  readonly campaignId: CampaignId;
  readonly run: CampaignLatestRun;
};
export const NewsletterIssueSend = /* @__PURE__ */ (() =>
  Schema.Struct({ campaignId: CampaignId, run: CampaignLatestRun }).annotate({
    identifier: "NewsletterIssueSend",
  }))();
export type NewsletterIssueListItem = {
  readonly path: string;
  readonly title: string | null;
  readonly latestSend: NewsletterIssueSend | null;
};
export const NewsletterIssueListItem = /* @__PURE__ */ (() =>
  Schema.Struct({
    path: Schema.String.check(
      Schema.isMaxCodePoints(1024).annotate({ expected: "a string with at most 1024 code points" }),
    )
      .check(
        Schema.isPattern(
          new RegExp(
            "^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
        }),
      )
      .check(
        Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
      ),
    title: Schema.Union([Schema.String, Schema.Null]),
    latestSend: Schema.Union([NewsletterIssueSend, Schema.Null]),
  }).annotate({ identifier: "NewsletterIssueListItem" }))();
export type NewsletterIssueList = {
  readonly projectId: TemplateProjectId | null;
  readonly revision: string | null;
  readonly items: ReadonlyArray<NewsletterIssueListItem>;
};
export const NewsletterIssueList = /* @__PURE__ */ (() =>
  Schema.Struct({
    projectId: Schema.Union([TemplateProjectId, Schema.Null]),
    revision: Schema.Union([
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(1024).annotate({
            expected: "a string with at most 1024 code points",
          }),
        )
        .check(
          Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
        ),
      Schema.Null,
    ]),
    items: Schema.Array(NewsletterIssueListItem),
  }).annotate({ identifier: "NewsletterIssueList" }))();
export type NewsletterIssuesListPathParams = { readonly id: NewsletterId };
export const NewsletterIssuesListPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: NewsletterId }))();
export type NewsletterIssuesList200 = NewsletterIssueList;
export const NewsletterIssuesList200 = NewsletterIssueList;
export type NewsletterIssuesList401 = UnauthorizedError;
export const NewsletterIssuesList401 = UnauthorizedError;
export type NewsletterIssuesList403 = ForbiddenError | FlagDisabledError;
export const NewsletterIssuesList403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewsletterIssuesList404 = ResourceNotFoundError;
export const NewsletterIssuesList404 = ResourceNotFoundError;
export type NewsletterIssuesList409 = ConflictError;
export const NewsletterIssuesList409 = ConflictError;
export type NewsletterIssuesList422 = TemplateSourceError | ValidationError;
export const NewsletterIssuesList422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type NewsletterIssuesList500 = InternalError;
export const NewsletterIssuesList500 = InternalError;
export type NewsletterIssuesList504 = GatewayTimeoutError;
export const NewsletterIssuesList504 = GatewayTimeoutError;
export type NewsletterIssuesCreatePathParams = { readonly id: NewsletterId };
export const NewsletterIssuesCreatePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: NewsletterId }))();
export type NewsletterIssuesCreateHeaders = { readonly "idempotency-key"?: string | null };
export const NewsletterIssuesCreateHeaders = /* @__PURE__ */ (() =>
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
export type NewsletterIssuesCreateRequestJson = {
  readonly path: string;
  readonly content: string;
  readonly expectedRevision?: string | null;
};
export const NewsletterIssuesCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    path: Schema.String.check(
      Schema.isMaxCodePoints(1024).annotate({ expected: "a string with at most 1024 code points" }),
    )
      .check(
        Schema.isPattern(
          new RegExp(
            "^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
        }),
      )
      .check(
        Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
      ),
    content: Schema.String,
    expectedRevision: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        )
          .check(
            Schema.isMaxCodePoints(1024).annotate({
              expected: "a string with at most 1024 code points",
            }),
          )
          .check(
            Schema.isMaxLength(1024).annotate({
              expected: "a value with a length of at most 1024",
            }),
          ),
        Schema.Null,
      ]),
    ),
  }))();
export type NewsletterIssuesCreate200 = {
  readonly workspace: {
    readonly projectId: TemplateProjectId;
    readonly organizationId: OrganizationId | null;
    readonly ownerEpoch: number;
    readonly repositoryName: string;
    readonly defaultBranch: string;
    readonly baseCommit: string;
    readonly remoteHead: string;
    readonly pendingRemoteHead: string | null;
    readonly revision: string;
    readonly overlay: { readonly [x: string]: string | null };
    readonly assetChanges: ReadonlyArray<{
      readonly path: string;
      readonly status: "added" | "modified" | "deleted";
    }>;
    readonly conflicts: ReadonlyArray<{
      readonly path: string;
      readonly base: string | null;
      readonly draft: string | null;
      readonly main: string | null;
    }>;
    readonly provenance: {
      readonly references: ReadonlyArray<{
        readonly kind: string;
        readonly digest: string;
        readonly locator?: string;
      }>;
    };
    readonly mounts: ReadonlyArray<
      | { readonly kind: "project"; readonly root: "/project"; readonly access: "read-write" }
      | {
          readonly root: string;
          readonly digest: string;
          readonly fileCount: number;
          readonly byteSize: number;
          readonly kind: "started-from";
          readonly access: "read-only";
          readonly templateId: string;
          readonly slug: string;
          readonly name: string;
        }
      | {
          readonly root: string;
          readonly digest: string;
          readonly fileCount: number;
          readonly byteSize: number;
          readonly kind: "resource";
          readonly access: "read-only";
          readonly resourceId: string;
          readonly name: string;
        }
      | {
          readonly root: string;
          readonly digest: string;
          readonly fileCount: number;
          readonly byteSize: number;
          readonly kind: "library-template";
          readonly access: "read-only";
          readonly templateId: string;
          readonly slug: string;
          readonly name: string;
        }
    >;
    readonly libraryManifestDigest: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly createdBy: { readonly userId: UserId; readonly via: "api" | "mcp" | "agent" };
    readonly updatedBy: { readonly userId: UserId; readonly via: "api" | "mcp" | "agent" };
  };
  readonly files: { readonly [x: string]: string };
};
export const NewsletterIssuesCreate200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    workspace: Schema.Struct({
      projectId: TemplateProjectId,
      organizationId: Schema.Union([OrganizationId, Schema.Null]),
      ownerEpoch: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      repositoryName: Schema.String.check(
        Schema.isPattern(new RegExp("^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$", "u")).annotate({
          expected: "a string matching the RegExp ^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$",
        }),
      ),
      defaultBranch: Schema.String.check(
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
      baseCommit: Schema.String.check(
        Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-f0-9]{40}$",
        }),
      ),
      remoteHead: Schema.String.check(
        Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-f0-9]{40}$",
        }),
      ),
      pendingRemoteHead: Schema.Union([
        Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{40}$",
          }),
        ),
        Schema.Null,
      ]),
      revision: Schema.String,
      overlay: Schema.Record(Schema.String, Schema.Union([Schema.String, Schema.Null])),
      assetChanges: Schema.Array(
        Schema.Struct({
          path: Schema.String,
          status: Schema.Union([
            Schema.Literal("added"),
            Schema.Literal("modified"),
            Schema.Literal("deleted"),
          ]),
        }),
      ),
      conflicts: Schema.Array(
        Schema.Struct({
          path: Schema.String.check(
            Schema.isPattern(
              new RegExp(
                "^(?!\\/)(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$)).{1,1024}$",
              ),
            ).annotate({
              expected:
                "a string matching the RegExp ^(?!\\/)(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$)).{1,1024}$",
            }),
          ),
          base: Schema.Union([Schema.String, Schema.Null]),
          draft: Schema.Union([Schema.String, Schema.Null]),
          main: Schema.Union([Schema.String, Schema.Null]),
        }),
      ),
      provenance: Schema.Struct({
        references: Schema.Array(
          Schema.Struct({
            kind: Schema.String,
            digest: Schema.String,
            locator: Schema.optionalKey(Schema.String),
          }),
        ),
      }),
      mounts: Schema.Array(
        Schema.Union([
          Schema.Struct({
            kind: Schema.Literal("project"),
            root: Schema.Literal("/project"),
            access: Schema.Literal("read-write"),
          }),
          Schema.Struct({
            root: Schema.String.check(
              Schema.isMaxCodePoints(2048).annotate({
                expected: "a string with at most 2048 code points",
              }),
            )
              .check(
                Schema.isPattern(
                  new RegExp(
                    "^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                    "u",
                  ),
                ).annotate({
                  expected:
                    "a string matching the RegExp ^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                }),
              )
              .check(
                Schema.isMaxLength(2048).annotate({
                  expected: "a value with a length of at most 2048",
                }),
              ),
            digest: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-f0-9]{64}$",
              }),
            ),
            fileCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            byteSize: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            kind: Schema.Literal("started-from"),
            access: Schema.Literal("read-only"),
            templateId: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(128).annotate({
                  expected: "a string with at most 128 code points",
                }),
              )
              .check(
                Schema.isMaxLength(128).annotate({
                  expected: "a value with a length of at most 128",
                }),
              ),
            slug: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-z0-9]+(?:-[a-z0-9]+)*$",
              }),
            ),
            name: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(256).annotate({
                  expected: "a string with at most 256 code points",
                }),
              )
              .check(
                Schema.isMaxLength(256).annotate({
                  expected: "a value with a length of at most 256",
                }),
              ),
          }),
          Schema.Struct({
            root: Schema.String.check(
              Schema.isMaxCodePoints(2048).annotate({
                expected: "a string with at most 2048 code points",
              }),
            )
              .check(
                Schema.isPattern(
                  new RegExp(
                    "^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                    "u",
                  ),
                ).annotate({
                  expected:
                    "a string matching the RegExp ^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                }),
              )
              .check(
                Schema.isMaxLength(2048).annotate({
                  expected: "a value with a length of at most 2048",
                }),
              ),
            digest: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-f0-9]{64}$",
              }),
            ),
            fileCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            byteSize: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            kind: Schema.Literal("resource"),
            access: Schema.Literal("read-only"),
            resourceId: Schema.String.check(
              Schema.isPattern(new RegExp("^[A-Za-z0-9._-]{1,128}$", "u")).annotate({
                expected: "a string matching the RegExp ^[A-Za-z0-9._-]{1,128}$",
              }),
            ),
            name: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(256).annotate({
                  expected: "a string with at most 256 code points",
                }),
              )
              .check(
                Schema.isMaxLength(256).annotate({
                  expected: "a value with a length of at most 256",
                }),
              ),
          }),
          Schema.Struct({
            root: Schema.String.check(
              Schema.isMaxCodePoints(2048).annotate({
                expected: "a string with at most 2048 code points",
              }),
            )
              .check(
                Schema.isPattern(
                  new RegExp(
                    "^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                    "u",
                  ),
                ).annotate({
                  expected:
                    "a string matching the RegExp ^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                }),
              )
              .check(
                Schema.isMaxLength(2048).annotate({
                  expected: "a value with a length of at most 2048",
                }),
              ),
            digest: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-f0-9]{64}$",
              }),
            ),
            fileCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            byteSize: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            kind: Schema.Literal("library-template"),
            access: Schema.Literal("read-only"),
            templateId: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(128).annotate({
                  expected: "a string with at most 128 code points",
                }),
              )
              .check(
                Schema.isMaxLength(128).annotate({
                  expected: "a value with a length of at most 128",
                }),
              ),
            slug: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-z0-9]+(?:-[a-z0-9]+)*$",
              }),
            ),
            name: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(256).annotate({
                  expected: "a string with at most 256 code points",
                }),
              )
              .check(
                Schema.isMaxLength(256).annotate({
                  expected: "a value with a length of at most 256",
                }),
              ),
          }),
        ]),
      ),
      libraryManifestDigest: Schema.String.check(
        Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-f0-9]{64}$",
        }),
      ),
      createdAt: Schema.String,
      updatedAt: Schema.String,
      createdBy: Schema.Struct({
        userId: UserId,
        via: Schema.Union([Schema.Literal("api"), Schema.Literal("mcp"), Schema.Literal("agent")]),
      }),
      updatedBy: Schema.Struct({
        userId: UserId,
        via: Schema.Union([Schema.Literal("api"), Schema.Literal("mcp"), Schema.Literal("agent")]),
      }),
    }),
    files: Schema.Record(Schema.String, Schema.String),
  }))();
export type NewsletterIssuesCreate401 = UnauthorizedError;
export const NewsletterIssuesCreate401 = UnauthorizedError;
export type NewsletterIssuesCreate403 = ForbiddenError | FlagDisabledError;
export const NewsletterIssuesCreate403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewsletterIssuesCreate404 = ResourceNotFoundError;
export const NewsletterIssuesCreate404 = ResourceNotFoundError;
export type NewsletterIssuesCreate409 = ConflictError;
export const NewsletterIssuesCreate409 = ConflictError;
export type NewsletterIssuesCreate422 = TemplateSourceError | ValidationError;
export const NewsletterIssuesCreate422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type NewsletterIssuesCreate500 = InternalError;
export const NewsletterIssuesCreate500 = InternalError;
export type NewsletterIssuesCreate504 = GatewayTimeoutError;
export const NewsletterIssuesCreate504 = GatewayTimeoutError;
export type NewsletterIssuesUpdatePathParams = { readonly id: NewsletterId };
export const NewsletterIssuesUpdatePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: NewsletterId }))();
export type NewsletterIssuesUpdateHeaders = { readonly "idempotency-key"?: string | null };
export const NewsletterIssuesUpdateHeaders = /* @__PURE__ */ (() =>
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
export type NewsletterIssuesUpdateRequestJson = {
  readonly path: string;
  readonly content: string;
  readonly expectedRevision: string;
};
export const NewsletterIssuesUpdateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    path: Schema.String.check(
      Schema.isMaxCodePoints(1024).annotate({ expected: "a string with at most 1024 code points" }),
    )
      .check(
        Schema.isPattern(
          new RegExp(
            "^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
        }),
      )
      .check(
        Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
      ),
    content: Schema.String,
    expectedRevision: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(1024).annotate({
          expected: "a string with at most 1024 code points",
        }),
      )
      .check(
        Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
      ),
  }))();
export type NewsletterIssuesUpdate200 = {
  readonly workspace: {
    readonly projectId: TemplateProjectId;
    readonly organizationId: OrganizationId | null;
    readonly ownerEpoch: number;
    readonly repositoryName: string;
    readonly defaultBranch: string;
    readonly baseCommit: string;
    readonly remoteHead: string;
    readonly pendingRemoteHead: string | null;
    readonly revision: string;
    readonly overlay: { readonly [x: string]: string | null };
    readonly assetChanges: ReadonlyArray<{
      readonly path: string;
      readonly status: "added" | "modified" | "deleted";
    }>;
    readonly conflicts: ReadonlyArray<{
      readonly path: string;
      readonly base: string | null;
      readonly draft: string | null;
      readonly main: string | null;
    }>;
    readonly provenance: {
      readonly references: ReadonlyArray<{
        readonly kind: string;
        readonly digest: string;
        readonly locator?: string;
      }>;
    };
    readonly mounts: ReadonlyArray<
      | { readonly kind: "project"; readonly root: "/project"; readonly access: "read-write" }
      | {
          readonly root: string;
          readonly digest: string;
          readonly fileCount: number;
          readonly byteSize: number;
          readonly kind: "started-from";
          readonly access: "read-only";
          readonly templateId: string;
          readonly slug: string;
          readonly name: string;
        }
      | {
          readonly root: string;
          readonly digest: string;
          readonly fileCount: number;
          readonly byteSize: number;
          readonly kind: "resource";
          readonly access: "read-only";
          readonly resourceId: string;
          readonly name: string;
        }
      | {
          readonly root: string;
          readonly digest: string;
          readonly fileCount: number;
          readonly byteSize: number;
          readonly kind: "library-template";
          readonly access: "read-only";
          readonly templateId: string;
          readonly slug: string;
          readonly name: string;
        }
    >;
    readonly libraryManifestDigest: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly createdBy: { readonly userId: UserId; readonly via: "api" | "mcp" | "agent" };
    readonly updatedBy: { readonly userId: UserId; readonly via: "api" | "mcp" | "agent" };
  };
  readonly files: { readonly [x: string]: string };
};
export const NewsletterIssuesUpdate200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    workspace: Schema.Struct({
      projectId: TemplateProjectId,
      organizationId: Schema.Union([OrganizationId, Schema.Null]),
      ownerEpoch: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      repositoryName: Schema.String.check(
        Schema.isPattern(new RegExp("^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$", "u")).annotate({
          expected: "a string matching the RegExp ^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$",
        }),
      ),
      defaultBranch: Schema.String.check(
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
      baseCommit: Schema.String.check(
        Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-f0-9]{40}$",
        }),
      ),
      remoteHead: Schema.String.check(
        Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-f0-9]{40}$",
        }),
      ),
      pendingRemoteHead: Schema.Union([
        Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{40}$",
          }),
        ),
        Schema.Null,
      ]),
      revision: Schema.String,
      overlay: Schema.Record(Schema.String, Schema.Union([Schema.String, Schema.Null])),
      assetChanges: Schema.Array(
        Schema.Struct({
          path: Schema.String,
          status: Schema.Union([
            Schema.Literal("added"),
            Schema.Literal("modified"),
            Schema.Literal("deleted"),
          ]),
        }),
      ),
      conflicts: Schema.Array(
        Schema.Struct({
          path: Schema.String.check(
            Schema.isPattern(
              new RegExp(
                "^(?!\\/)(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$)).{1,1024}$",
              ),
            ).annotate({
              expected:
                "a string matching the RegExp ^(?!\\/)(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$)).{1,1024}$",
            }),
          ),
          base: Schema.Union([Schema.String, Schema.Null]),
          draft: Schema.Union([Schema.String, Schema.Null]),
          main: Schema.Union([Schema.String, Schema.Null]),
        }),
      ),
      provenance: Schema.Struct({
        references: Schema.Array(
          Schema.Struct({
            kind: Schema.String,
            digest: Schema.String,
            locator: Schema.optionalKey(Schema.String),
          }),
        ),
      }),
      mounts: Schema.Array(
        Schema.Union([
          Schema.Struct({
            kind: Schema.Literal("project"),
            root: Schema.Literal("/project"),
            access: Schema.Literal("read-write"),
          }),
          Schema.Struct({
            root: Schema.String.check(
              Schema.isMaxCodePoints(2048).annotate({
                expected: "a string with at most 2048 code points",
              }),
            )
              .check(
                Schema.isPattern(
                  new RegExp(
                    "^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                    "u",
                  ),
                ).annotate({
                  expected:
                    "a string matching the RegExp ^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                }),
              )
              .check(
                Schema.isMaxLength(2048).annotate({
                  expected: "a value with a length of at most 2048",
                }),
              ),
            digest: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-f0-9]{64}$",
              }),
            ),
            fileCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            byteSize: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            kind: Schema.Literal("started-from"),
            access: Schema.Literal("read-only"),
            templateId: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(128).annotate({
                  expected: "a string with at most 128 code points",
                }),
              )
              .check(
                Schema.isMaxLength(128).annotate({
                  expected: "a value with a length of at most 128",
                }),
              ),
            slug: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-z0-9]+(?:-[a-z0-9]+)*$",
              }),
            ),
            name: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(256).annotate({
                  expected: "a string with at most 256 code points",
                }),
              )
              .check(
                Schema.isMaxLength(256).annotate({
                  expected: "a value with a length of at most 256",
                }),
              ),
          }),
          Schema.Struct({
            root: Schema.String.check(
              Schema.isMaxCodePoints(2048).annotate({
                expected: "a string with at most 2048 code points",
              }),
            )
              .check(
                Schema.isPattern(
                  new RegExp(
                    "^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                    "u",
                  ),
                ).annotate({
                  expected:
                    "a string matching the RegExp ^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                }),
              )
              .check(
                Schema.isMaxLength(2048).annotate({
                  expected: "a value with a length of at most 2048",
                }),
              ),
            digest: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-f0-9]{64}$",
              }),
            ),
            fileCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            byteSize: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            kind: Schema.Literal("resource"),
            access: Schema.Literal("read-only"),
            resourceId: Schema.String.check(
              Schema.isPattern(new RegExp("^[A-Za-z0-9._-]{1,128}$", "u")).annotate({
                expected: "a string matching the RegExp ^[A-Za-z0-9._-]{1,128}$",
              }),
            ),
            name: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(256).annotate({
                  expected: "a string with at most 256 code points",
                }),
              )
              .check(
                Schema.isMaxLength(256).annotate({
                  expected: "a value with a length of at most 256",
                }),
              ),
          }),
          Schema.Struct({
            root: Schema.String.check(
              Schema.isMaxCodePoints(2048).annotate({
                expected: "a string with at most 2048 code points",
              }),
            )
              .check(
                Schema.isPattern(
                  new RegExp(
                    "^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                    "u",
                  ),
                ).annotate({
                  expected:
                    "a string matching the RegExp ^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                }),
              )
              .check(
                Schema.isMaxLength(2048).annotate({
                  expected: "a value with a length of at most 2048",
                }),
              ),
            digest: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-f0-9]{64}$",
              }),
            ),
            fileCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            byteSize: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            kind: Schema.Literal("library-template"),
            access: Schema.Literal("read-only"),
            templateId: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(128).annotate({
                  expected: "a string with at most 128 code points",
                }),
              )
              .check(
                Schema.isMaxLength(128).annotate({
                  expected: "a value with a length of at most 128",
                }),
              ),
            slug: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-z0-9]+(?:-[a-z0-9]+)*$",
              }),
            ),
            name: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(256).annotate({
                  expected: "a string with at most 256 code points",
                }),
              )
              .check(
                Schema.isMaxLength(256).annotate({
                  expected: "a value with a length of at most 256",
                }),
              ),
          }),
        ]),
      ),
      libraryManifestDigest: Schema.String.check(
        Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-f0-9]{64}$",
        }),
      ),
      createdAt: Schema.String,
      updatedAt: Schema.String,
      createdBy: Schema.Struct({
        userId: UserId,
        via: Schema.Union([Schema.Literal("api"), Schema.Literal("mcp"), Schema.Literal("agent")]),
      }),
      updatedBy: Schema.Struct({
        userId: UserId,
        via: Schema.Union([Schema.Literal("api"), Schema.Literal("mcp"), Schema.Literal("agent")]),
      }),
    }),
    files: Schema.Record(Schema.String, Schema.String),
  }))();
export type NewsletterIssuesUpdate401 = UnauthorizedError;
export const NewsletterIssuesUpdate401 = UnauthorizedError;
export type NewsletterIssuesUpdate403 = ForbiddenError | FlagDisabledError;
export const NewsletterIssuesUpdate403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewsletterIssuesUpdate404 = ResourceNotFoundError;
export const NewsletterIssuesUpdate404 = ResourceNotFoundError;
export type NewsletterIssuesUpdate409 = ConflictError;
export const NewsletterIssuesUpdate409 = ConflictError;
export type NewsletterIssuesUpdate422 = TemplateSourceError | ValidationError;
export const NewsletterIssuesUpdate422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type NewsletterIssuesUpdate500 = InternalError;
export const NewsletterIssuesUpdate500 = InternalError;
export type NewsletterIssuesUpdate504 = GatewayTimeoutError;
export const NewsletterIssuesUpdate504 = GatewayTimeoutError;
export type NewsletterIssuesCheckPathParams = { readonly id: NewsletterId };
export const NewsletterIssuesCheckPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: NewsletterId }))();
export type NewsletterIssuesCheckHeaders = { readonly "idempotency-key"?: string | null };
export const NewsletterIssuesCheckHeaders = /* @__PURE__ */ (() =>
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
export type NewsletterIssuesCheckRequestJson = {
  readonly path: string;
  readonly expectedRevision: string;
};
export const NewsletterIssuesCheckRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    path: Schema.String.check(
      Schema.isMaxCodePoints(1024).annotate({ expected: "a string with at most 1024 code points" }),
    )
      .check(
        Schema.isPattern(
          new RegExp(
            "^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
        }),
      )
      .check(
        Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
      ),
    expectedRevision: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(1024).annotate({
          expected: "a string with at most 1024 code points",
        }),
      )
      .check(
        Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
      ),
  }))();
export type NewsletterIssuesCheck200 = {
  readonly projectId: TemplateProjectId;
  readonly revision: string;
  readonly entryPath: string | string;
  readonly declaration: {
    readonly codeDigest: string;
    readonly templateId: string;
    readonly input: {
      readonly schema: { readonly [x: string]: JsonValue };
      readonly schemaDigest: string;
      readonly contractDigest: string;
    };
    readonly fixtures: ReadonlyArray<string>;
  } | null;
  readonly issue?: {
    readonly path: string;
    readonly frontmatter: {
      readonly title: string;
      readonly date?: string;
      readonly slug: string;
      readonly topic: string;
      readonly preheader?: string;
      readonly seo?: {
        readonly title?: string;
        readonly description?: string;
        readonly image?: string;
      };
      readonly gate?: { readonly leadIn: number };
    };
  };
  readonly diagnostics: ReadonlyArray<{
    readonly code: string;
    readonly severity: "error" | "warning" | "info";
    readonly message: string;
    readonly origins: ReadonlyArray<{
      readonly fileName: string;
      readonly lineNumber: number;
      readonly columnNumber: number;
    }>;
    readonly clients?: ReadonlyArray<string> | null;
    readonly notes?: string | null;
    readonly provenance?: string | null;
    readonly fixtures?: ReadonlyArray<string> | null;
    readonly occurrences?: ReadonlyArray<
      ReadonlyArray<{
        readonly fileName: string;
        readonly lineNumber: number;
        readonly columnNumber: number;
      }>
    > | null;
    readonly compatibility?: {
      readonly assessment: "risk" | "degradation" | "unverified" | "not-applicable";
      readonly title: string;
    } | null;
  }>;
  readonly incompatibilities: ReadonlyArray<{
    readonly code: string;
    readonly severity: "error" | "warning" | "info";
    readonly message: string;
    readonly origins: ReadonlyArray<{
      readonly fileName: string;
      readonly lineNumber: number;
      readonly columnNumber: number;
    }>;
    readonly clients?: ReadonlyArray<string> | null;
    readonly notes?: string | null;
    readonly provenance?: string | null;
    readonly fixtures?: ReadonlyArray<string> | null;
    readonly occurrences?: ReadonlyArray<
      ReadonlyArray<{
        readonly fileName: string;
        readonly lineNumber: number;
        readonly columnNumber: number;
      }>
    > | null;
    readonly compatibility?: {
      readonly assessment: "risk" | "degradation" | "unverified" | "not-applicable";
      readonly title: string;
    } | null;
  }>;
};
export const NewsletterIssuesCheck200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    projectId: TemplateProjectId,
    revision: Schema.String,
    entryPath: Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(1024).annotate({
          expected: "a string with at most 1024 code points",
        }),
      )
        .check(
          Schema.isPattern(
            new RegExp(
              "^(?!\\/)(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?:templates|emails)\\/.+\\.tsx$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(?!\\/)(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?:templates|emails)\\/.+\\.tsx$",
          }),
        )
        .check(
          Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
        ),
      Schema.String.check(
        Schema.isMaxCodePoints(1024).annotate({
          expected: "a string with at most 1024 code points",
        }),
      )
        .check(
          Schema.isPattern(
            new RegExp(
              "^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
          }),
        )
        .check(
          Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
        ),
    ]),
    declaration: Schema.Union([
      Schema.Struct({
        codeDigest: Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{64}$",
          }),
        ),
        templateId: Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        )
          .check(
            Schema.isMaxCodePoints(128).annotate({
              expected: "a string with at most 128 code points",
            }),
          )
          .check(
            Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" }),
          ),
        input: Schema.Struct({
          schema: Schema.Record(Schema.String, JsonValue),
          schemaDigest: Schema.String.check(
            Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
              expected: "a string matching the RegExp ^[a-f0-9]{64}$",
            }),
          ),
          contractDigest: Schema.String.check(
            Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
              expected: "a string matching the RegExp ^[a-f0-9]{64}$",
            }),
          ),
        }),
        fixtures: Schema.Array(
          Schema.String.check(
            Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
          )
            .check(
              Schema.isMaxCodePoints(128).annotate({
                expected: "a string with at most 128 code points",
              }),
            )
            .check(
              Schema.isMaxLength(128).annotate({
                expected: "a value with a length of at most 128",
              }),
            ),
        ),
      }),
      Schema.Null,
    ]),
    issue: Schema.optionalKey(
      Schema.Struct({
        path: Schema.String.check(
          Schema.isMaxCodePoints(1024).annotate({
            expected: "a string with at most 1024 code points",
          }),
        )
          .check(
            Schema.isPattern(
              new RegExp(
                "^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
                "u",
              ),
            ).annotate({
              expected:
                "a string matching the RegExp ^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
            }),
          )
          .check(
            Schema.isMaxLength(1024).annotate({
              expected: "a value with a length of at most 1024",
            }),
          ),
        frontmatter: Schema.Struct({
          title: Schema.String,
          date: Schema.optionalKey(Schema.String),
          slug: Schema.String,
          topic: Schema.String,
          preheader: Schema.optionalKey(Schema.String),
          seo: Schema.optionalKey(
            Schema.Struct({
              title: Schema.optionalKey(Schema.String),
              description: Schema.optionalKey(Schema.String),
              image: Schema.optionalKey(Schema.String),
            }),
          ),
          gate: Schema.optionalKey(
            Schema.Struct({
              leadIn: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        }),
      }),
    ),
    diagnostics: Schema.Array(
      Schema.Struct({
        code: Schema.String,
        severity: Schema.Union([
          Schema.Literal("error"),
          Schema.Literal("warning"),
          Schema.Literal("info"),
        ]),
        message: Schema.String,
        origins: Schema.Array(
          Schema.Struct({
            fileName: Schema.String,
            lineNumber: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            columnNumber: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
          }),
        ),
        clients: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
        notes: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        provenance: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        fixtures: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
        occurrences: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Array(
                Schema.Struct({
                  fileName: Schema.String,
                  lineNumber: Schema.Finite.check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  )
                    .check(
                      Schema.isGreaterThanOrEqualTo(1).annotate({
                        expected: "a value greater than or equal to 1",
                      }),
                    )
                    .check(
                      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                        expected: "a value less than or equal to 9007199254740991",
                      }),
                    ),
                  columnNumber: Schema.Finite.check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  )
                    .check(
                      Schema.isGreaterThanOrEqualTo(1).annotate({
                        expected: "a value greater than or equal to 1",
                      }),
                    )
                    .check(
                      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                        expected: "a value less than or equal to 9007199254740991",
                      }),
                    ),
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
        compatibility: Schema.optionalKey(
          Schema.Union([
            Schema.Struct({
              assessment: Schema.Union([
                Schema.Literal("risk"),
                Schema.Literal("degradation"),
                Schema.Literal("unverified"),
                Schema.Literal("not-applicable"),
              ]),
              title: Schema.String,
            }),
            Schema.Null,
          ]),
        ),
      }),
    ),
    incompatibilities: Schema.Array(
      Schema.Struct({
        code: Schema.String,
        severity: Schema.Union([
          Schema.Literal("error"),
          Schema.Literal("warning"),
          Schema.Literal("info"),
        ]),
        message: Schema.String,
        origins: Schema.Array(
          Schema.Struct({
            fileName: Schema.String,
            lineNumber: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            columnNumber: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
          }),
        ),
        clients: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
        notes: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        provenance: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        fixtures: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
        occurrences: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Array(
                Schema.Struct({
                  fileName: Schema.String,
                  lineNumber: Schema.Finite.check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  )
                    .check(
                      Schema.isGreaterThanOrEqualTo(1).annotate({
                        expected: "a value greater than or equal to 1",
                      }),
                    )
                    .check(
                      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                        expected: "a value less than or equal to 9007199254740991",
                      }),
                    ),
                  columnNumber: Schema.Finite.check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  )
                    .check(
                      Schema.isGreaterThanOrEqualTo(1).annotate({
                        expected: "a value greater than or equal to 1",
                      }),
                    )
                    .check(
                      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                        expected: "a value less than or equal to 9007199254740991",
                      }),
                    ),
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
        compatibility: Schema.optionalKey(
          Schema.Union([
            Schema.Struct({
              assessment: Schema.Union([
                Schema.Literal("risk"),
                Schema.Literal("degradation"),
                Schema.Literal("unverified"),
                Schema.Literal("not-applicable"),
              ]),
              title: Schema.String,
            }),
            Schema.Null,
          ]),
        ),
      }),
    ),
  }))();
export type NewsletterIssuesCheck401 = UnauthorizedError;
export const NewsletterIssuesCheck401 = UnauthorizedError;
export type NewsletterIssuesCheck403 = ForbiddenError | FlagDisabledError;
export const NewsletterIssuesCheck403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewsletterIssuesCheck404 = ResourceNotFoundError;
export const NewsletterIssuesCheck404 = ResourceNotFoundError;
export type NewsletterIssuesCheck409 = ConflictError;
export const NewsletterIssuesCheck409 = ConflictError;
export type NewsletterIssuesCheck422 = TemplateSourceError | ValidationError;
export const NewsletterIssuesCheck422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type NewsletterIssuesCheck500 = InternalError;
export const NewsletterIssuesCheck500 = InternalError;
export type NewsletterIssuesCheck504 = GatewayTimeoutError;
export const NewsletterIssuesCheck504 = GatewayTimeoutError;
export type NewsletterIssuesGetPathParams = { readonly id: NewsletterId };
export const NewsletterIssuesGetPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: NewsletterId }))();
export type NewsletterIssuesGetQuery = { readonly path: string; readonly expectedRevision: string };
export const NewsletterIssuesGetQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    path: Schema.String.check(
      Schema.isMaxCodePoints(1024).annotate({ expected: "a string with at most 1024 code points" }),
    )
      .check(
        Schema.isPattern(
          new RegExp(
            "^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
        }),
      )
      .check(
        Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
      ),
    expectedRevision: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(1024).annotate({
          expected: "a string with at most 1024 code points",
        }),
      )
      .check(
        Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
      ),
  }))();
export type NewsletterIssuesGet200 = NewsletterIssueDocument;
export const NewsletterIssuesGet200 = NewsletterIssueDocument;
export type NewsletterIssuesGet401 = UnauthorizedError;
export const NewsletterIssuesGet401 = UnauthorizedError;
export type NewsletterIssuesGet403 = ForbiddenError | FlagDisabledError;
export const NewsletterIssuesGet403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewsletterIssuesGet404 = ResourceNotFoundError;
export const NewsletterIssuesGet404 = ResourceNotFoundError;
export type NewsletterIssuesGet409 = ConflictError;
export const NewsletterIssuesGet409 = ConflictError;
export type NewsletterIssuesGet422 = TemplateSourceError | ValidationError;
export const NewsletterIssuesGet422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type NewsletterIssuesGet500 = InternalError;
export const NewsletterIssuesGet500 = InternalError;
export type NewsletterIssuesGet504 = GatewayTimeoutError;
export const NewsletterIssuesGet504 = GatewayTimeoutError;
export type NewsletterIssuesHeadPathParams = { readonly id: NewsletterId };
export const NewsletterIssuesHeadPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: NewsletterId }))();
export type NewsletterIssuesHead200 = {
  readonly projectId: TemplateProjectId;
  readonly revision: string;
  readonly remoteHead: string;
};
export const NewsletterIssuesHead200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    projectId: TemplateProjectId,
    revision: Schema.String,
    remoteHead: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{40}$",
      }),
    ),
  }))();
export type NewsletterIssuesHead401 = UnauthorizedError;
export const NewsletterIssuesHead401 = UnauthorizedError;
export type NewsletterIssuesHead403 = ForbiddenError | FlagDisabledError;
export const NewsletterIssuesHead403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewsletterIssuesHead404 = ResourceNotFoundError;
export const NewsletterIssuesHead404 = ResourceNotFoundError;
export type NewsletterIssuesHead409 = ConflictError;
export const NewsletterIssuesHead409 = ConflictError;
export type NewsletterIssuesHead422 = TemplateSourceError | ValidationError;
export const NewsletterIssuesHead422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type NewsletterIssuesHead500 = InternalError;
export const NewsletterIssuesHead500 = InternalError;
export type NewsletterIssuesHead504 = GatewayTimeoutError;
export const NewsletterIssuesHead504 = GatewayTimeoutError;
export type NewsletterIssuesHistoryPathParams = { readonly id: NewsletterId };
export const NewsletterIssuesHistoryPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: NewsletterId }))();
export type NewsletterIssuesHistoryQuery = { readonly limit?: number | null };
export const NewsletterIssuesHistoryQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    limit: Schema.optionalKey(
      Schema.Union([
        Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
          .check(
            Schema.isGreaterThanOrEqualTo(1).annotate({
              expected: "a value greater than or equal to 1",
            }),
          )
          .check(
            Schema.isLessThanOrEqualTo(100).annotate({
              expected: "a value less than or equal to 100",
            }),
          ),
        Schema.Null,
      ]),
    ),
  }))();
export type NewsletterIssuesHistory200 = {
  readonly projectId: TemplateProjectId;
  readonly head: string;
  readonly commits: ReadonlyArray<{
    readonly commit: string;
    readonly tree: string;
    readonly parentCommit: string | null;
    readonly message: string;
    readonly committedAt: string;
  }>;
};
export const NewsletterIssuesHistory200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    projectId: TemplateProjectId,
    head: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{40}$",
      }),
    ),
    commits: Schema.Array(
      Schema.Struct({
        commit: Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{40}$",
          }),
        ),
        tree: Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{40}$",
          }),
        ),
        parentCommit: Schema.Union([
          Schema.String.check(
            Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
              expected: "a string matching the RegExp ^[a-f0-9]{40}$",
            }),
          ),
          Schema.Null,
        ]),
        message: Schema.String,
        committedAt: Schema.String,
      }),
    ),
  }))();
export type NewsletterIssuesHistory401 = UnauthorizedError;
export const NewsletterIssuesHistory401 = UnauthorizedError;
export type NewsletterIssuesHistory403 = ForbiddenError | FlagDisabledError;
export const NewsletterIssuesHistory403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewsletterIssuesHistory404 = ResourceNotFoundError;
export const NewsletterIssuesHistory404 = ResourceNotFoundError;
export type NewsletterIssuesHistory409 = ConflictError;
export const NewsletterIssuesHistory409 = ConflictError;
export type NewsletterIssuesHistory422 = TemplateSourceError | ValidationError;
export const NewsletterIssuesHistory422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type NewsletterIssuesHistory500 = InternalError;
export const NewsletterIssuesHistory500 = InternalError;
export type NewsletterIssuesHistory504 = GatewayTimeoutError;
export const NewsletterIssuesHistory504 = GatewayTimeoutError;
export type NewsletterIssuesRemovePathParams = { readonly id: NewsletterId };
export const NewsletterIssuesRemovePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: NewsletterId }))();
export type NewsletterIssuesRemoveHeaders = { readonly "idempotency-key"?: string | null };
export const NewsletterIssuesRemoveHeaders = /* @__PURE__ */ (() =>
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
export type NewsletterIssuesRemoveRequestJson = {
  readonly path: string;
  readonly expectedRevision: string;
};
export const NewsletterIssuesRemoveRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    path: Schema.String.check(
      Schema.isMaxCodePoints(1024).annotate({ expected: "a string with at most 1024 code points" }),
    )
      .check(
        Schema.isPattern(
          new RegExp(
            "^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
        }),
      )
      .check(
        Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
      ),
    expectedRevision: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(1024).annotate({
          expected: "a string with at most 1024 code points",
        }),
      )
      .check(
        Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
      ),
  }))();
export type NewsletterIssuesRemove200 = {
  readonly workspace: {
    readonly projectId: TemplateProjectId;
    readonly organizationId: OrganizationId | null;
    readonly ownerEpoch: number;
    readonly repositoryName: string;
    readonly defaultBranch: string;
    readonly baseCommit: string;
    readonly remoteHead: string;
    readonly pendingRemoteHead: string | null;
    readonly revision: string;
    readonly overlay: { readonly [x: string]: string | null };
    readonly assetChanges: ReadonlyArray<{
      readonly path: string;
      readonly status: "added" | "modified" | "deleted";
    }>;
    readonly conflicts: ReadonlyArray<{
      readonly path: string;
      readonly base: string | null;
      readonly draft: string | null;
      readonly main: string | null;
    }>;
    readonly provenance: {
      readonly references: ReadonlyArray<{
        readonly kind: string;
        readonly digest: string;
        readonly locator?: string;
      }>;
    };
    readonly mounts: ReadonlyArray<
      | { readonly kind: "project"; readonly root: "/project"; readonly access: "read-write" }
      | {
          readonly root: string;
          readonly digest: string;
          readonly fileCount: number;
          readonly byteSize: number;
          readonly kind: "started-from";
          readonly access: "read-only";
          readonly templateId: string;
          readonly slug: string;
          readonly name: string;
        }
      | {
          readonly root: string;
          readonly digest: string;
          readonly fileCount: number;
          readonly byteSize: number;
          readonly kind: "resource";
          readonly access: "read-only";
          readonly resourceId: string;
          readonly name: string;
        }
      | {
          readonly root: string;
          readonly digest: string;
          readonly fileCount: number;
          readonly byteSize: number;
          readonly kind: "library-template";
          readonly access: "read-only";
          readonly templateId: string;
          readonly slug: string;
          readonly name: string;
        }
    >;
    readonly libraryManifestDigest: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly createdBy: { readonly userId: UserId; readonly via: "api" | "mcp" | "agent" };
    readonly updatedBy: { readonly userId: UserId; readonly via: "api" | "mcp" | "agent" };
  };
  readonly files: { readonly [x: string]: string };
};
export const NewsletterIssuesRemove200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    workspace: Schema.Struct({
      projectId: TemplateProjectId,
      organizationId: Schema.Union([OrganizationId, Schema.Null]),
      ownerEpoch: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      repositoryName: Schema.String.check(
        Schema.isPattern(new RegExp("^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$", "u")).annotate({
          expected: "a string matching the RegExp ^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$",
        }),
      ),
      defaultBranch: Schema.String.check(
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
      baseCommit: Schema.String.check(
        Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-f0-9]{40}$",
        }),
      ),
      remoteHead: Schema.String.check(
        Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-f0-9]{40}$",
        }),
      ),
      pendingRemoteHead: Schema.Union([
        Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{40}$",
          }),
        ),
        Schema.Null,
      ]),
      revision: Schema.String,
      overlay: Schema.Record(Schema.String, Schema.Union([Schema.String, Schema.Null])),
      assetChanges: Schema.Array(
        Schema.Struct({
          path: Schema.String,
          status: Schema.Union([
            Schema.Literal("added"),
            Schema.Literal("modified"),
            Schema.Literal("deleted"),
          ]),
        }),
      ),
      conflicts: Schema.Array(
        Schema.Struct({
          path: Schema.String.check(
            Schema.isPattern(
              new RegExp(
                "^(?!\\/)(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$)).{1,1024}$",
              ),
            ).annotate({
              expected:
                "a string matching the RegExp ^(?!\\/)(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$)).{1,1024}$",
            }),
          ),
          base: Schema.Union([Schema.String, Schema.Null]),
          draft: Schema.Union([Schema.String, Schema.Null]),
          main: Schema.Union([Schema.String, Schema.Null]),
        }),
      ),
      provenance: Schema.Struct({
        references: Schema.Array(
          Schema.Struct({
            kind: Schema.String,
            digest: Schema.String,
            locator: Schema.optionalKey(Schema.String),
          }),
        ),
      }),
      mounts: Schema.Array(
        Schema.Union([
          Schema.Struct({
            kind: Schema.Literal("project"),
            root: Schema.Literal("/project"),
            access: Schema.Literal("read-write"),
          }),
          Schema.Struct({
            root: Schema.String.check(
              Schema.isMaxCodePoints(2048).annotate({
                expected: "a string with at most 2048 code points",
              }),
            )
              .check(
                Schema.isPattern(
                  new RegExp(
                    "^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                    "u",
                  ),
                ).annotate({
                  expected:
                    "a string matching the RegExp ^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                }),
              )
              .check(
                Schema.isMaxLength(2048).annotate({
                  expected: "a value with a length of at most 2048",
                }),
              ),
            digest: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-f0-9]{64}$",
              }),
            ),
            fileCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            byteSize: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            kind: Schema.Literal("started-from"),
            access: Schema.Literal("read-only"),
            templateId: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(128).annotate({
                  expected: "a string with at most 128 code points",
                }),
              )
              .check(
                Schema.isMaxLength(128).annotate({
                  expected: "a value with a length of at most 128",
                }),
              ),
            slug: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-z0-9]+(?:-[a-z0-9]+)*$",
              }),
            ),
            name: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(256).annotate({
                  expected: "a string with at most 256 code points",
                }),
              )
              .check(
                Schema.isMaxLength(256).annotate({
                  expected: "a value with a length of at most 256",
                }),
              ),
          }),
          Schema.Struct({
            root: Schema.String.check(
              Schema.isMaxCodePoints(2048).annotate({
                expected: "a string with at most 2048 code points",
              }),
            )
              .check(
                Schema.isPattern(
                  new RegExp(
                    "^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                    "u",
                  ),
                ).annotate({
                  expected:
                    "a string matching the RegExp ^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                }),
              )
              .check(
                Schema.isMaxLength(2048).annotate({
                  expected: "a value with a length of at most 2048",
                }),
              ),
            digest: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-f0-9]{64}$",
              }),
            ),
            fileCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            byteSize: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            kind: Schema.Literal("resource"),
            access: Schema.Literal("read-only"),
            resourceId: Schema.String.check(
              Schema.isPattern(new RegExp("^[A-Za-z0-9._-]{1,128}$", "u")).annotate({
                expected: "a string matching the RegExp ^[A-Za-z0-9._-]{1,128}$",
              }),
            ),
            name: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(256).annotate({
                  expected: "a string with at most 256 code points",
                }),
              )
              .check(
                Schema.isMaxLength(256).annotate({
                  expected: "a value with a length of at most 256",
                }),
              ),
          }),
          Schema.Struct({
            root: Schema.String.check(
              Schema.isMaxCodePoints(2048).annotate({
                expected: "a string with at most 2048 code points",
              }),
            )
              .check(
                Schema.isPattern(
                  new RegExp(
                    "^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                    "u",
                  ),
                ).annotate({
                  expected:
                    "a string matching the RegExp ^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                }),
              )
              .check(
                Schema.isMaxLength(2048).annotate({
                  expected: "a value with a length of at most 2048",
                }),
              ),
            digest: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-f0-9]{64}$",
              }),
            ),
            fileCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            byteSize: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            kind: Schema.Literal("library-template"),
            access: Schema.Literal("read-only"),
            templateId: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(128).annotate({
                  expected: "a string with at most 128 code points",
                }),
              )
              .check(
                Schema.isMaxLength(128).annotate({
                  expected: "a value with a length of at most 128",
                }),
              ),
            slug: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-z0-9]+(?:-[a-z0-9]+)*$",
              }),
            ),
            name: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(256).annotate({
                  expected: "a string with at most 256 code points",
                }),
              )
              .check(
                Schema.isMaxLength(256).annotate({
                  expected: "a value with a length of at most 256",
                }),
              ),
          }),
        ]),
      ),
      libraryManifestDigest: Schema.String.check(
        Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-f0-9]{64}$",
        }),
      ),
      createdAt: Schema.String,
      updatedAt: Schema.String,
      createdBy: Schema.Struct({
        userId: UserId,
        via: Schema.Union([Schema.Literal("api"), Schema.Literal("mcp"), Schema.Literal("agent")]),
      }),
      updatedBy: Schema.Struct({
        userId: UserId,
        via: Schema.Union([Schema.Literal("api"), Schema.Literal("mcp"), Schema.Literal("agent")]),
      }),
    }),
    files: Schema.Record(Schema.String, Schema.String),
  }))();
export type NewsletterIssuesRemove401 = UnauthorizedError;
export const NewsletterIssuesRemove401 = UnauthorizedError;
export type NewsletterIssuesRemove403 = ForbiddenError | FlagDisabledError;
export const NewsletterIssuesRemove403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewsletterIssuesRemove404 = ResourceNotFoundError;
export const NewsletterIssuesRemove404 = ResourceNotFoundError;
export type NewsletterIssuesRemove409 = ConflictError;
export const NewsletterIssuesRemove409 = ConflictError;
export type NewsletterIssuesRemove422 = TemplateSourceError | ValidationError;
export const NewsletterIssuesRemove422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type NewsletterIssuesRemove500 = InternalError;
export const NewsletterIssuesRemove500 = InternalError;
export type NewsletterIssuesRemove504 = GatewayTimeoutError;
export const NewsletterIssuesRemove504 = GatewayTimeoutError;
export type NewsletterIssuesRenderPathParams = { readonly id: NewsletterId };
export const NewsletterIssuesRenderPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: NewsletterId }))();
export type NewsletterIssuesRenderHeaders = { readonly "idempotency-key"?: string | null };
export const NewsletterIssuesRenderHeaders = /* @__PURE__ */ (() =>
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
export type NewsletterIssuesRenderRequestJson = {
  readonly path: string;
  readonly expectedRevision: string;
  readonly fixture: string;
  readonly target: "email" | "web";
};
export const NewsletterIssuesRenderRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    path: Schema.String.check(
      Schema.isMaxCodePoints(1024).annotate({ expected: "a string with at most 1024 code points" }),
    )
      .check(
        Schema.isPattern(
          new RegExp(
            "^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
        }),
      )
      .check(
        Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
      ),
    expectedRevision: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(1024).annotate({
          expected: "a string with at most 1024 code points",
        }),
      )
      .check(
        Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
      ),
    fixture: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({ expected: "a string with at most 128 code points" }),
      )
      .check(
        Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" }),
      ),
    target: Schema.Union([Schema.Literal("email"), Schema.Literal("web")]),
  }))();
export type NewsletterIssuesRender200 = {
  readonly projectId: TemplateProjectId;
  readonly revision: string;
  readonly entryPath: string | string;
  readonly declaration: {
    readonly codeDigest: string;
    readonly templateId: string;
    readonly input: {
      readonly schema: { readonly [x: string]: JsonValue };
      readonly schemaDigest: string;
      readonly contractDigest: string;
    };
    readonly fixtures: ReadonlyArray<string>;
  } | null;
  readonly issue?: {
    readonly path: string;
    readonly frontmatter: {
      readonly title: string;
      readonly date?: string;
      readonly slug: string;
      readonly topic: string;
      readonly preheader?: string;
      readonly seo?: {
        readonly title?: string;
        readonly description?: string;
        readonly image?: string;
      };
      readonly gate?: { readonly leadIn: number };
    };
  };
  readonly diagnostics: ReadonlyArray<{
    readonly code: string;
    readonly severity: "error" | "warning" | "info";
    readonly message: string;
    readonly origins: ReadonlyArray<{
      readonly fileName: string;
      readonly lineNumber: number;
      readonly columnNumber: number;
    }>;
    readonly clients?: ReadonlyArray<string> | null;
    readonly notes?: string | null;
    readonly provenance?: string | null;
    readonly fixtures?: ReadonlyArray<string> | null;
    readonly occurrences?: ReadonlyArray<
      ReadonlyArray<{
        readonly fileName: string;
        readonly lineNumber: number;
        readonly columnNumber: number;
      }>
    > | null;
    readonly compatibility?: {
      readonly assessment: "risk" | "degradation" | "unverified" | "not-applicable";
      readonly title: string;
    } | null;
  }>;
  readonly incompatibilities: ReadonlyArray<{
    readonly code: string;
    readonly severity: "error" | "warning" | "info";
    readonly message: string;
    readonly origins: ReadonlyArray<{
      readonly fileName: string;
      readonly lineNumber: number;
      readonly columnNumber: number;
    }>;
    readonly clients?: ReadonlyArray<string> | null;
    readonly notes?: string | null;
    readonly provenance?: string | null;
    readonly fixtures?: ReadonlyArray<string> | null;
    readonly occurrences?: ReadonlyArray<
      ReadonlyArray<{
        readonly fileName: string;
        readonly lineNumber: number;
        readonly columnNumber: number;
      }>
    > | null;
    readonly compatibility?: {
      readonly assessment: "risk" | "degradation" | "unverified" | "not-applicable";
      readonly title: string;
    } | null;
  }>;
  readonly fixture: string;
  readonly rendered: {
    readonly subject: string;
    readonly preheader?: string;
    readonly html: string;
    readonly text: string;
    readonly selections: ReadonlyArray<{
      readonly instancePath: string;
      readonly tag: string;
      readonly origins: ReadonlyArray<{
        readonly fileName: string;
        readonly lineNumber: number;
        readonly columnNumber: number;
      }>;
      readonly authored: boolean;
      readonly occurrence: number;
      readonly occurrences: number;
      readonly parentPath?: string;
      readonly start: number;
      readonly end: number;
    }>;
    readonly sentBytes: number;
    readonly previewBytes: number;
  } | null;
  readonly page?: {
    readonly kind: "page";
    readonly html: string;
    readonly selections: ReadonlyArray<{
      readonly instancePath: string;
      readonly tag: string;
      readonly origins: ReadonlyArray<{
        readonly fileName: string;
        readonly lineNumber: number;
        readonly columnNumber: number;
      }>;
      readonly authored: boolean;
      readonly occurrence: number;
      readonly occurrences: number;
      readonly parentPath?: string;
      readonly start: number;
      readonly end: number;
    }>;
  } | null;
};
export const NewsletterIssuesRender200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    projectId: TemplateProjectId,
    revision: Schema.String,
    entryPath: Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(1024).annotate({
          expected: "a string with at most 1024 code points",
        }),
      )
        .check(
          Schema.isPattern(
            new RegExp(
              "^(?!\\/)(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?:templates|emails)\\/.+\\.tsx$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(?!\\/)(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?:templates|emails)\\/.+\\.tsx$",
          }),
        )
        .check(
          Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
        ),
      Schema.String.check(
        Schema.isMaxCodePoints(1024).annotate({
          expected: "a string with at most 1024 code points",
        }),
      )
        .check(
          Schema.isPattern(
            new RegExp(
              "^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
          }),
        )
        .check(
          Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
        ),
    ]),
    declaration: Schema.Union([
      Schema.Struct({
        codeDigest: Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{64}$",
          }),
        ),
        templateId: Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        )
          .check(
            Schema.isMaxCodePoints(128).annotate({
              expected: "a string with at most 128 code points",
            }),
          )
          .check(
            Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" }),
          ),
        input: Schema.Struct({
          schema: Schema.Record(Schema.String, JsonValue),
          schemaDigest: Schema.String.check(
            Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
              expected: "a string matching the RegExp ^[a-f0-9]{64}$",
            }),
          ),
          contractDigest: Schema.String.check(
            Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
              expected: "a string matching the RegExp ^[a-f0-9]{64}$",
            }),
          ),
        }),
        fixtures: Schema.Array(
          Schema.String.check(
            Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
          )
            .check(
              Schema.isMaxCodePoints(128).annotate({
                expected: "a string with at most 128 code points",
              }),
            )
            .check(
              Schema.isMaxLength(128).annotate({
                expected: "a value with a length of at most 128",
              }),
            ),
        ),
      }),
      Schema.Null,
    ]),
    issue: Schema.optionalKey(
      Schema.Struct({
        path: Schema.String.check(
          Schema.isMaxCodePoints(1024).annotate({
            expected: "a string with at most 1024 code points",
          }),
        )
          .check(
            Schema.isPattern(
              new RegExp(
                "^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
                "u",
              ),
            ).annotate({
              expected:
                "a string matching the RegExp ^(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?!.*\\p{Cc})issues\\/(?:[^/]+\\/)*[^/]+\\.md$",
            }),
          )
          .check(
            Schema.isMaxLength(1024).annotate({
              expected: "a value with a length of at most 1024",
            }),
          ),
        frontmatter: Schema.Struct({
          title: Schema.String,
          date: Schema.optionalKey(Schema.String),
          slug: Schema.String,
          topic: Schema.String,
          preheader: Schema.optionalKey(Schema.String),
          seo: Schema.optionalKey(
            Schema.Struct({
              title: Schema.optionalKey(Schema.String),
              description: Schema.optionalKey(Schema.String),
              image: Schema.optionalKey(Schema.String),
            }),
          ),
          gate: Schema.optionalKey(
            Schema.Struct({
              leadIn: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        }),
      }),
    ),
    diagnostics: Schema.Array(
      Schema.Struct({
        code: Schema.String,
        severity: Schema.Union([
          Schema.Literal("error"),
          Schema.Literal("warning"),
          Schema.Literal("info"),
        ]),
        message: Schema.String,
        origins: Schema.Array(
          Schema.Struct({
            fileName: Schema.String,
            lineNumber: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            columnNumber: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
          }),
        ),
        clients: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
        notes: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        provenance: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        fixtures: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
        occurrences: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Array(
                Schema.Struct({
                  fileName: Schema.String,
                  lineNumber: Schema.Finite.check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  )
                    .check(
                      Schema.isGreaterThanOrEqualTo(1).annotate({
                        expected: "a value greater than or equal to 1",
                      }),
                    )
                    .check(
                      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                        expected: "a value less than or equal to 9007199254740991",
                      }),
                    ),
                  columnNumber: Schema.Finite.check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  )
                    .check(
                      Schema.isGreaterThanOrEqualTo(1).annotate({
                        expected: "a value greater than or equal to 1",
                      }),
                    )
                    .check(
                      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                        expected: "a value less than or equal to 9007199254740991",
                      }),
                    ),
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
        compatibility: Schema.optionalKey(
          Schema.Union([
            Schema.Struct({
              assessment: Schema.Union([
                Schema.Literal("risk"),
                Schema.Literal("degradation"),
                Schema.Literal("unverified"),
                Schema.Literal("not-applicable"),
              ]),
              title: Schema.String,
            }),
            Schema.Null,
          ]),
        ),
      }),
    ),
    incompatibilities: Schema.Array(
      Schema.Struct({
        code: Schema.String,
        severity: Schema.Union([
          Schema.Literal("error"),
          Schema.Literal("warning"),
          Schema.Literal("info"),
        ]),
        message: Schema.String,
        origins: Schema.Array(
          Schema.Struct({
            fileName: Schema.String,
            lineNumber: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            columnNumber: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
          }),
        ),
        clients: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
        notes: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        provenance: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        fixtures: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
        occurrences: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Array(
                Schema.Struct({
                  fileName: Schema.String,
                  lineNumber: Schema.Finite.check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  )
                    .check(
                      Schema.isGreaterThanOrEqualTo(1).annotate({
                        expected: "a value greater than or equal to 1",
                      }),
                    )
                    .check(
                      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                        expected: "a value less than or equal to 9007199254740991",
                      }),
                    ),
                  columnNumber: Schema.Finite.check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  )
                    .check(
                      Schema.isGreaterThanOrEqualTo(1).annotate({
                        expected: "a value greater than or equal to 1",
                      }),
                    )
                    .check(
                      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                        expected: "a value less than or equal to 9007199254740991",
                      }),
                    ),
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
        compatibility: Schema.optionalKey(
          Schema.Union([
            Schema.Struct({
              assessment: Schema.Union([
                Schema.Literal("risk"),
                Schema.Literal("degradation"),
                Schema.Literal("unverified"),
                Schema.Literal("not-applicable"),
              ]),
              title: Schema.String,
            }),
            Schema.Null,
          ]),
        ),
      }),
    ),
    fixture: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({ expected: "a string with at most 128 code points" }),
      )
      .check(
        Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" }),
      ),
    rendered: Schema.Union([
      Schema.Struct({
        subject: Schema.String,
        preheader: Schema.optionalKey(Schema.String),
        html: Schema.String.check(
          Schema.isMaxCodePoints(2097152).annotate({
            expected: "a string with at most 2097152 code points",
          }),
        ).check(
          Schema.isMaxLength(2097152).annotate({
            expected: "a value with a length of at most 2097152",
          }),
        ),
        text: Schema.String.check(
          Schema.isMaxCodePoints(2097152).annotate({
            expected: "a string with at most 2097152 code points",
          }),
        ).check(
          Schema.isMaxLength(2097152).annotate({
            expected: "a value with a length of at most 2097152",
          }),
        ),
        selections: Schema.Array(
          Schema.Struct({
            instancePath: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            ),
            tag: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            ),
            origins: Schema.Array(
              Schema.Struct({
                fileName: Schema.String,
                lineNumber: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
                  .check(
                    Schema.isGreaterThanOrEqualTo(1).annotate({
                      expected: "a value greater than or equal to 1",
                    }),
                  )
                  .check(
                    Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                      expected: "a value less than or equal to 9007199254740991",
                    }),
                  ),
                columnNumber: Schema.Finite.check(
                  Schema.isInt().annotate({ expected: "an integer" }),
                )
                  .check(
                    Schema.isGreaterThanOrEqualTo(1).annotate({
                      expected: "a value greater than or equal to 1",
                    }),
                  )
                  .check(
                    Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                      expected: "a value less than or equal to 9007199254740991",
                    }),
                  ),
              }),
            ),
            authored: Schema.Boolean,
            occurrence: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            occurrences: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            parentPath: Schema.optionalKey(Schema.String),
            start: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
            end: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        sentBytes: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        previewBytes: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      }),
      Schema.Null,
    ]),
    page: Schema.optionalKey(
      Schema.Union([
        Schema.Struct({
          kind: Schema.Literal("page"),
          html: Schema.String,
          selections: Schema.Array(
            Schema.Struct({
              instancePath: Schema.String.check(
                Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
              ),
              tag: Schema.String.check(
                Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
              ),
              origins: Schema.Array(
                Schema.Struct({
                  fileName: Schema.String,
                  lineNumber: Schema.Finite.check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  )
                    .check(
                      Schema.isGreaterThanOrEqualTo(1).annotate({
                        expected: "a value greater than or equal to 1",
                      }),
                    )
                    .check(
                      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                        expected: "a value less than or equal to 9007199254740991",
                      }),
                    ),
                  columnNumber: Schema.Finite.check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  )
                    .check(
                      Schema.isGreaterThanOrEqualTo(1).annotate({
                        expected: "a value greater than or equal to 1",
                      }),
                    )
                    .check(
                      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                        expected: "a value less than or equal to 9007199254740991",
                      }),
                    ),
                }),
              ),
              authored: Schema.Boolean,
              occurrence: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
                .check(
                  Schema.isGreaterThanOrEqualTo(1).annotate({
                    expected: "a value greater than or equal to 1",
                  }),
                )
                .check(
                  Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                    expected: "a value less than or equal to 9007199254740991",
                  }),
                ),
              occurrences: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
                .check(
                  Schema.isGreaterThanOrEqualTo(1).annotate({
                    expected: "a value greater than or equal to 1",
                  }),
                )
                .check(
                  Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                    expected: "a value less than or equal to 9007199254740991",
                  }),
                ),
              parentPath: Schema.optionalKey(Schema.String),
              start: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
              end: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        }),
        Schema.Null,
      ]),
    ),
  }))();
export type NewsletterIssuesRender401 = UnauthorizedError;
export const NewsletterIssuesRender401 = UnauthorizedError;
export type NewsletterIssuesRender403 = ForbiddenError | FlagDisabledError;
export const NewsletterIssuesRender403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewsletterIssuesRender404 = ResourceNotFoundError;
export const NewsletterIssuesRender404 = ResourceNotFoundError;
export type NewsletterIssuesRender409 = ConflictError;
export const NewsletterIssuesRender409 = ConflictError;
export type NewsletterIssuesRender422 = TemplateSourceError | ValidationError;
export const NewsletterIssuesRender422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type NewsletterIssuesRender500 = InternalError;
export const NewsletterIssuesRender500 = InternalError;
export type NewsletterIssuesRender504 = GatewayTimeoutError;
export const NewsletterIssuesRender504 = GatewayTimeoutError;
export type NewsletterIssuesSavePathParams = { readonly id: NewsletterId };
export const NewsletterIssuesSavePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: NewsletterId }))();
export type NewsletterIssuesSaveHeaders = { readonly "idempotency-key"?: string | null };
export const NewsletterIssuesSaveHeaders = /* @__PURE__ */ (() =>
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
export type NewsletterIssuesSaveRequestJson = {
  readonly expectedRevision: string;
  readonly expectedHead: string;
  readonly message: string;
};
export const NewsletterIssuesSaveRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    expectedRevision: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(1024).annotate({
          expected: "a string with at most 1024 code points",
        }),
      )
      .check(
        Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
      ),
    expectedHead: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{40}$",
      }),
    ),
    message: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(512).annotate({ expected: "a string with at most 512 code points" }),
      )
      .check(
        Schema.isMaxLength(512).annotate({ expected: "a value with a length of at most 512" }),
      ),
  }))();
export type NewsletterIssuesSave200 = {
  readonly commit: string;
  readonly parentCommit: string;
  readonly tree: string;
  readonly revision: string;
  readonly changedPaths: ReadonlyArray<string>;
  readonly sourceDigest: string;
  readonly buildDigest: string;
  readonly warnings: ReadonlyArray<{
    readonly code: string;
    readonly severity: "error" | "warning" | "info";
    readonly message: string;
    readonly origins: ReadonlyArray<{
      readonly fileName: string;
      readonly lineNumber: number;
      readonly columnNumber: number;
    }>;
    readonly clients?: ReadonlyArray<string> | null;
    readonly notes?: string | null;
    readonly provenance?: string | null;
    readonly fixtures?: ReadonlyArray<string> | null;
    readonly occurrences?: ReadonlyArray<
      ReadonlyArray<{
        readonly fileName: string;
        readonly lineNumber: number;
        readonly columnNumber: number;
      }>
    > | null;
    readonly compatibility?: {
      readonly assessment: "risk" | "degradation" | "unverified" | "not-applicable";
      readonly title: string;
    } | null;
  }>;
  readonly incompatibilities: ReadonlyArray<{
    readonly code: string;
    readonly severity: "error" | "warning" | "info";
    readonly message: string;
    readonly origins: ReadonlyArray<{
      readonly fileName: string;
      readonly lineNumber: number;
      readonly columnNumber: number;
    }>;
    readonly clients?: ReadonlyArray<string> | null;
    readonly notes?: string | null;
    readonly provenance?: string | null;
    readonly fixtures?: ReadonlyArray<string> | null;
    readonly occurrences?: ReadonlyArray<
      ReadonlyArray<{
        readonly fileName: string;
        readonly lineNumber: number;
        readonly columnNumber: number;
      }>
    > | null;
    readonly compatibility?: {
      readonly assessment: "risk" | "degradation" | "unverified" | "not-applicable";
      readonly title: string;
    } | null;
  }>;
};
export const NewsletterIssuesSave200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    commit: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{40}$",
      }),
    ),
    parentCommit: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{40}$",
      }),
    ),
    tree: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{40}$",
      }),
    ),
    revision: Schema.String,
    changedPaths: Schema.Array(
      Schema.String.check(
        Schema.isPattern(
          new RegExp(
            "^(?!\\/)(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$)).{1,1024}$",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!\\/)(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$)).{1,1024}$",
        }),
      ),
    ),
    sourceDigest: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{64}$",
      }),
    ),
    buildDigest: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{64}$",
      }),
    ),
    warnings: Schema.Array(
      Schema.Struct({
        code: Schema.String,
        severity: Schema.Union([
          Schema.Literal("error"),
          Schema.Literal("warning"),
          Schema.Literal("info"),
        ]),
        message: Schema.String,
        origins: Schema.Array(
          Schema.Struct({
            fileName: Schema.String,
            lineNumber: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            columnNumber: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
          }),
        ),
        clients: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
        notes: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        provenance: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        fixtures: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
        occurrences: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Array(
                Schema.Struct({
                  fileName: Schema.String,
                  lineNumber: Schema.Finite.check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  )
                    .check(
                      Schema.isGreaterThanOrEqualTo(1).annotate({
                        expected: "a value greater than or equal to 1",
                      }),
                    )
                    .check(
                      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                        expected: "a value less than or equal to 9007199254740991",
                      }),
                    ),
                  columnNumber: Schema.Finite.check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  )
                    .check(
                      Schema.isGreaterThanOrEqualTo(1).annotate({
                        expected: "a value greater than or equal to 1",
                      }),
                    )
                    .check(
                      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                        expected: "a value less than or equal to 9007199254740991",
                      }),
                    ),
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
        compatibility: Schema.optionalKey(
          Schema.Union([
            Schema.Struct({
              assessment: Schema.Union([
                Schema.Literal("risk"),
                Schema.Literal("degradation"),
                Schema.Literal("unverified"),
                Schema.Literal("not-applicable"),
              ]),
              title: Schema.String,
            }),
            Schema.Null,
          ]),
        ),
      }),
    ),
    incompatibilities: Schema.Array(
      Schema.Struct({
        code: Schema.String,
        severity: Schema.Union([
          Schema.Literal("error"),
          Schema.Literal("warning"),
          Schema.Literal("info"),
        ]),
        message: Schema.String,
        origins: Schema.Array(
          Schema.Struct({
            fileName: Schema.String,
            lineNumber: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            columnNumber: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
          }),
        ),
        clients: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
        notes: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        provenance: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        fixtures: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
        occurrences: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Array(
                Schema.Struct({
                  fileName: Schema.String,
                  lineNumber: Schema.Finite.check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  )
                    .check(
                      Schema.isGreaterThanOrEqualTo(1).annotate({
                        expected: "a value greater than or equal to 1",
                      }),
                    )
                    .check(
                      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                        expected: "a value less than or equal to 9007199254740991",
                      }),
                    ),
                  columnNumber: Schema.Finite.check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  )
                    .check(
                      Schema.isGreaterThanOrEqualTo(1).annotate({
                        expected: "a value greater than or equal to 1",
                      }),
                    )
                    .check(
                      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                        expected: "a value less than or equal to 9007199254740991",
                      }),
                    ),
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
        compatibility: Schema.optionalKey(
          Schema.Union([
            Schema.Struct({
              assessment: Schema.Union([
                Schema.Literal("risk"),
                Schema.Literal("degradation"),
                Schema.Literal("unverified"),
                Schema.Literal("not-applicable"),
              ]),
              title: Schema.String,
            }),
            Schema.Null,
          ]),
        ),
      }),
    ),
  }))();
export type NewsletterIssuesSave401 = UnauthorizedError;
export const NewsletterIssuesSave401 = UnauthorizedError;
export type NewsletterIssuesSave403 = ForbiddenError | FlagDisabledError;
export const NewsletterIssuesSave403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewsletterIssuesSave404 = ResourceNotFoundError;
export const NewsletterIssuesSave404 = ResourceNotFoundError;
export type NewsletterIssuesSave409 = ConflictError;
export const NewsletterIssuesSave409 = ConflictError;
export type NewsletterIssuesSave422 = TemplateSourceError | ValidationError;
export const NewsletterIssuesSave422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type NewsletterIssuesSave500 = InternalError;
export const NewsletterIssuesSave500 = InternalError;
export type NewsletterIssuesSave504 = GatewayTimeoutError;
export const NewsletterIssuesSave504 = GatewayTimeoutError;
export type NewsletterIssuesOpenPathParams = { readonly id: NewsletterId };
export const NewsletterIssuesOpenPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: NewsletterId }))();
export type NewsletterIssuesOpen200 = {
  readonly workspace: {
    readonly projectId: TemplateProjectId;
    readonly organizationId: OrganizationId | null;
    readonly ownerEpoch: number;
    readonly repositoryName: string;
    readonly defaultBranch: string;
    readonly baseCommit: string;
    readonly remoteHead: string;
    readonly pendingRemoteHead: string | null;
    readonly revision: string;
    readonly overlay: { readonly [x: string]: string | null };
    readonly assetChanges: ReadonlyArray<{
      readonly path: string;
      readonly status: "added" | "modified" | "deleted";
    }>;
    readonly conflicts: ReadonlyArray<{
      readonly path: string;
      readonly base: string | null;
      readonly draft: string | null;
      readonly main: string | null;
    }>;
    readonly provenance: {
      readonly references: ReadonlyArray<{
        readonly kind: string;
        readonly digest: string;
        readonly locator?: string;
      }>;
    };
    readonly mounts: ReadonlyArray<
      | { readonly kind: "project"; readonly root: "/project"; readonly access: "read-write" }
      | {
          readonly root: string;
          readonly digest: string;
          readonly fileCount: number;
          readonly byteSize: number;
          readonly kind: "started-from";
          readonly access: "read-only";
          readonly templateId: string;
          readonly slug: string;
          readonly name: string;
        }
      | {
          readonly root: string;
          readonly digest: string;
          readonly fileCount: number;
          readonly byteSize: number;
          readonly kind: "resource";
          readonly access: "read-only";
          readonly resourceId: string;
          readonly name: string;
        }
      | {
          readonly root: string;
          readonly digest: string;
          readonly fileCount: number;
          readonly byteSize: number;
          readonly kind: "library-template";
          readonly access: "read-only";
          readonly templateId: string;
          readonly slug: string;
          readonly name: string;
        }
    >;
    readonly libraryManifestDigest: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly createdBy: { readonly userId: UserId; readonly via: "api" | "mcp" | "agent" };
    readonly updatedBy: { readonly userId: UserId; readonly via: "api" | "mcp" | "agent" };
  };
  readonly files: { readonly [x: string]: string };
};
export const NewsletterIssuesOpen200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    workspace: Schema.Struct({
      projectId: TemplateProjectId,
      organizationId: Schema.Union([OrganizationId, Schema.Null]),
      ownerEpoch: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      repositoryName: Schema.String.check(
        Schema.isPattern(new RegExp("^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$", "u")).annotate({
          expected: "a string matching the RegExp ^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$",
        }),
      ),
      defaultBranch: Schema.String.check(
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
      baseCommit: Schema.String.check(
        Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-f0-9]{40}$",
        }),
      ),
      remoteHead: Schema.String.check(
        Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-f0-9]{40}$",
        }),
      ),
      pendingRemoteHead: Schema.Union([
        Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{40}$",
          }),
        ),
        Schema.Null,
      ]),
      revision: Schema.String,
      overlay: Schema.Record(Schema.String, Schema.Union([Schema.String, Schema.Null])),
      assetChanges: Schema.Array(
        Schema.Struct({
          path: Schema.String,
          status: Schema.Union([
            Schema.Literal("added"),
            Schema.Literal("modified"),
            Schema.Literal("deleted"),
          ]),
        }),
      ),
      conflicts: Schema.Array(
        Schema.Struct({
          path: Schema.String.check(
            Schema.isPattern(
              new RegExp(
                "^(?!\\/)(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$)).{1,1024}$",
              ),
            ).annotate({
              expected:
                "a string matching the RegExp ^(?!\\/)(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$)).{1,1024}$",
            }),
          ),
          base: Schema.Union([Schema.String, Schema.Null]),
          draft: Schema.Union([Schema.String, Schema.Null]),
          main: Schema.Union([Schema.String, Schema.Null]),
        }),
      ),
      provenance: Schema.Struct({
        references: Schema.Array(
          Schema.Struct({
            kind: Schema.String,
            digest: Schema.String,
            locator: Schema.optionalKey(Schema.String),
          }),
        ),
      }),
      mounts: Schema.Array(
        Schema.Union([
          Schema.Struct({
            kind: Schema.Literal("project"),
            root: Schema.Literal("/project"),
            access: Schema.Literal("read-write"),
          }),
          Schema.Struct({
            root: Schema.String.check(
              Schema.isMaxCodePoints(2048).annotate({
                expected: "a string with at most 2048 code points",
              }),
            )
              .check(
                Schema.isPattern(
                  new RegExp(
                    "^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                    "u",
                  ),
                ).annotate({
                  expected:
                    "a string matching the RegExp ^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                }),
              )
              .check(
                Schema.isMaxLength(2048).annotate({
                  expected: "a value with a length of at most 2048",
                }),
              ),
            digest: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-f0-9]{64}$",
              }),
            ),
            fileCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            byteSize: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            kind: Schema.Literal("started-from"),
            access: Schema.Literal("read-only"),
            templateId: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(128).annotate({
                  expected: "a string with at most 128 code points",
                }),
              )
              .check(
                Schema.isMaxLength(128).annotate({
                  expected: "a value with a length of at most 128",
                }),
              ),
            slug: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-z0-9]+(?:-[a-z0-9]+)*$",
              }),
            ),
            name: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(256).annotate({
                  expected: "a string with at most 256 code points",
                }),
              )
              .check(
                Schema.isMaxLength(256).annotate({
                  expected: "a value with a length of at most 256",
                }),
              ),
          }),
          Schema.Struct({
            root: Schema.String.check(
              Schema.isMaxCodePoints(2048).annotate({
                expected: "a string with at most 2048 code points",
              }),
            )
              .check(
                Schema.isPattern(
                  new RegExp(
                    "^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                    "u",
                  ),
                ).annotate({
                  expected:
                    "a string matching the RegExp ^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                }),
              )
              .check(
                Schema.isMaxLength(2048).annotate({
                  expected: "a value with a length of at most 2048",
                }),
              ),
            digest: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-f0-9]{64}$",
              }),
            ),
            fileCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            byteSize: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            kind: Schema.Literal("resource"),
            access: Schema.Literal("read-only"),
            resourceId: Schema.String.check(
              Schema.isPattern(new RegExp("^[A-Za-z0-9._-]{1,128}$", "u")).annotate({
                expected: "a string matching the RegExp ^[A-Za-z0-9._-]{1,128}$",
              }),
            ),
            name: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(256).annotate({
                  expected: "a string with at most 256 code points",
                }),
              )
              .check(
                Schema.isMaxLength(256).annotate({
                  expected: "a value with a length of at most 256",
                }),
              ),
          }),
          Schema.Struct({
            root: Schema.String.check(
              Schema.isMaxCodePoints(2048).annotate({
                expected: "a string with at most 2048 code points",
              }),
            )
              .check(
                Schema.isPattern(
                  new RegExp(
                    "^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                    "u",
                  ),
                ).annotate({
                  expected:
                    "a string matching the RegExp ^\\/(?:project|references\\/started-from\\/[a-f0-9]{64}|resources\\/[A-Za-z0-9._-]+\\/[a-f0-9]{64}|library\\/templates\\/[a-z0-9]+(?:-[a-z0-9]+)*\\/[a-f0-9]{64})(?:\\/(?!\\.{1,2}(?:\\/|$)|\\.git(?:\\/|$))[^\\\\/]+)*$",
                }),
              )
              .check(
                Schema.isMaxLength(2048).annotate({
                  expected: "a value with a length of at most 2048",
                }),
              ),
            digest: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-f0-9]{64}$",
              }),
            ),
            fileCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            byteSize: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            kind: Schema.Literal("library-template"),
            access: Schema.Literal("read-only"),
            templateId: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(128).annotate({
                  expected: "a string with at most 128 code points",
                }),
              )
              .check(
                Schema.isMaxLength(128).annotate({
                  expected: "a value with a length of at most 128",
                }),
              ),
            slug: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-z0-9]+(?:-[a-z0-9]+)*$",
              }),
            ),
            name: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            )
              .check(
                Schema.isMaxCodePoints(256).annotate({
                  expected: "a string with at most 256 code points",
                }),
              )
              .check(
                Schema.isMaxLength(256).annotate({
                  expected: "a value with a length of at most 256",
                }),
              ),
          }),
        ]),
      ),
      libraryManifestDigest: Schema.String.check(
        Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-f0-9]{64}$",
        }),
      ),
      createdAt: Schema.String,
      updatedAt: Schema.String,
      createdBy: Schema.Struct({
        userId: UserId,
        via: Schema.Union([Schema.Literal("api"), Schema.Literal("mcp"), Schema.Literal("agent")]),
      }),
      updatedBy: Schema.Struct({
        userId: UserId,
        via: Schema.Union([Schema.Literal("api"), Schema.Literal("mcp"), Schema.Literal("agent")]),
      }),
    }),
    files: Schema.Record(Schema.String, Schema.String),
  }))();
export type NewsletterIssuesOpen401 = UnauthorizedError;
export const NewsletterIssuesOpen401 = UnauthorizedError;
export type NewsletterIssuesOpen403 = ForbiddenError | FlagDisabledError;
export const NewsletterIssuesOpen403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type NewsletterIssuesOpen404 = ResourceNotFoundError;
export const NewsletterIssuesOpen404 = ResourceNotFoundError;
export type NewsletterIssuesOpen409 = ConflictError;
export const NewsletterIssuesOpen409 = ConflictError;
export type NewsletterIssuesOpen422 = TemplateSourceError | ValidationError;
export const NewsletterIssuesOpen422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type NewsletterIssuesOpen500 = InternalError;
export const NewsletterIssuesOpen500 = InternalError;
export type NewsletterIssuesOpen504 = GatewayTimeoutError;
export const NewsletterIssuesOpen504 = GatewayTimeoutError;

export class NewsletterIssuesGroup extends HttpApiGroup.make("Newsletter issues")
  .add(
    HttpApiEndpoint.get("newsletterIssuesList", "/v1/newsletters/:id/issues", {
      params: NewsletterIssuesListPathParams,
      success: NewsletterIssuesList200,
      error: [
        NewsletterIssuesList401.pipe(HttpApiSchema.status(401)),
        NewsletterIssuesList403.pipe(HttpApiSchema.status(403)),
        NewsletterIssuesList404.pipe(HttpApiSchema.status(404)),
        NewsletterIssuesList409.pipe(HttpApiSchema.status(409)),
        NewsletterIssuesList422.pipe(HttpApiSchema.status(422)),
        NewsletterIssuesList500,
        NewsletterIssuesList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletterIssues.list")
      .annotate(OpenApi.Summary, "List newsletter issues")
      .annotate(
        OpenApi.Description,
        "Lists the Markdown issues in the newsletter's shared Git workspace with each draft's title and its latest campaign send. An uninitialized topic returns null projectId and revision. Requires newsletters and email.",
      ),
    HttpApiEndpoint.post("newsletterIssuesCreate", "/v1/newsletters/:id/issues", {
      params: NewsletterIssuesCreatePathParams,
      headers: NewsletterIssuesCreateHeaders,
      payload: NewsletterIssuesCreateRequestJson,
      success: NewsletterIssuesCreate200,
      error: [
        NewsletterIssuesCreate401.pipe(HttpApiSchema.status(401)),
        NewsletterIssuesCreate403.pipe(HttpApiSchema.status(403)),
        NewsletterIssuesCreate404.pipe(HttpApiSchema.status(404)),
        NewsletterIssuesCreate409.pipe(HttpApiSchema.status(409)),
        NewsletterIssuesCreate422.pipe(HttpApiSchema.status(422)),
        NewsletterIssuesCreate500,
        NewsletterIssuesCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletterIssues.create")
      .annotate(OpenApi.Summary, "Create a newsletter issue")
      .annotate(
        OpenApi.Description,
        "Creates an unsaved Markdown file. The first request provisions the newsletter's project and layout; omit expectedRevision only for that first request or its retry. Further creates require the current revision. No template entry is registered. Requires newsletters and email.",
      ),
    HttpApiEndpoint.patch("newsletterIssuesUpdate", "/v1/newsletters/:id/issues", {
      params: NewsletterIssuesUpdatePathParams,
      headers: NewsletterIssuesUpdateHeaders,
      payload: NewsletterIssuesUpdateRequestJson,
      success: NewsletterIssuesUpdate200,
      error: [
        NewsletterIssuesUpdate401.pipe(HttpApiSchema.status(401)),
        NewsletterIssuesUpdate403.pipe(HttpApiSchema.status(403)),
        NewsletterIssuesUpdate404.pipe(HttpApiSchema.status(404)),
        NewsletterIssuesUpdate409.pipe(HttpApiSchema.status(409)),
        NewsletterIssuesUpdate422.pipe(HttpApiSchema.status(422)),
        NewsletterIssuesUpdate500,
        NewsletterIssuesUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletterIssues.update")
      .annotate(OpenApi.Summary, "Update a newsletter issue")
      .annotate(
        OpenApi.Description,
        "Replaces the complete Markdown file under a revision fence. Save separately to create a Git commit. Requires newsletters and email.",
      ),
    HttpApiEndpoint.post("newsletterIssuesCheck", "/v1/newsletters/:id/issues/check", {
      params: NewsletterIssuesCheckPathParams,
      headers: NewsletterIssuesCheckHeaders,
      payload: NewsletterIssuesCheckRequestJson,
      success: NewsletterIssuesCheck200,
      error: [
        NewsletterIssuesCheck401.pipe(HttpApiSchema.status(401)),
        NewsletterIssuesCheck403.pipe(HttpApiSchema.status(403)),
        NewsletterIssuesCheck404.pipe(HttpApiSchema.status(404)),
        NewsletterIssuesCheck409.pipe(HttpApiSchema.status(409)),
        NewsletterIssuesCheck422.pipe(HttpApiSchema.status(422)),
        NewsletterIssuesCheck500,
        NewsletterIssuesCheck504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletterIssues.check")
      .annotate(OpenApi.Summary, "Check a newsletter issue")
      .annotate(
        OpenApi.Description,
        "Compiles the issue in its layout at the requested revision and returns diagnostics and declared fixtures. Requires newsletters and email.",
      ),
    HttpApiEndpoint.get("newsletterIssuesGet", "/v1/newsletters/:id/issues/document", {
      params: NewsletterIssuesGetPathParams,
      query: NewsletterIssuesGetQuery,
      success: NewsletterIssuesGet200,
      error: [
        NewsletterIssuesGet401.pipe(HttpApiSchema.status(401)),
        NewsletterIssuesGet403.pipe(HttpApiSchema.status(403)),
        NewsletterIssuesGet404.pipe(HttpApiSchema.status(404)),
        NewsletterIssuesGet409.pipe(HttpApiSchema.status(409)),
        NewsletterIssuesGet422.pipe(HttpApiSchema.status(422)),
        NewsletterIssuesGet500,
        NewsletterIssuesGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletterIssues.get")
      .annotate(OpenApi.Summary, "Read a newsletter issue")
      .annotate(
        OpenApi.Description,
        "Reads one issues/*.md file at the requested workspace revision. Requires newsletters and email.",
      ),
    HttpApiEndpoint.get("newsletterIssuesHead", "/v1/newsletters/:id/issues/head", {
      params: NewsletterIssuesHeadPathParams,
      success: NewsletterIssuesHead200,
      error: [
        NewsletterIssuesHead401.pipe(HttpApiSchema.status(401)),
        NewsletterIssuesHead403.pipe(HttpApiSchema.status(403)),
        NewsletterIssuesHead404.pipe(HttpApiSchema.status(404)),
        NewsletterIssuesHead409.pipe(HttpApiSchema.status(409)),
        NewsletterIssuesHead422.pipe(HttpApiSchema.status(422)),
        NewsletterIssuesHead500,
        NewsletterIssuesHead504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletterIssues.head")
      .annotate(OpenApi.Summary, "Read the newsletter issue head")
      .annotate(
        OpenApi.Description,
        "Reads the current workspace revision and repository branch head. Requires newsletters and email.",
      ),
    HttpApiEndpoint.get("newsletterIssuesHistory", "/v1/newsletters/:id/issues/history", {
      params: NewsletterIssuesHistoryPathParams,
      query: NewsletterIssuesHistoryQuery,
      success: NewsletterIssuesHistory200,
      error: [
        NewsletterIssuesHistory401.pipe(HttpApiSchema.status(401)),
        NewsletterIssuesHistory403.pipe(HttpApiSchema.status(403)),
        NewsletterIssuesHistory404.pipe(HttpApiSchema.status(404)),
        NewsletterIssuesHistory409.pipe(HttpApiSchema.status(409)),
        NewsletterIssuesHistory422.pipe(HttpApiSchema.status(422)),
        NewsletterIssuesHistory500,
        NewsletterIssuesHistory504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletterIssues.history")
      .annotate(OpenApi.Summary, "Read newsletter issue history")
      .annotate(
        OpenApi.Description,
        "Lists saved commits in the topic repository, newest first. Requires newsletters and email.",
      ),
    HttpApiEndpoint.post("newsletterIssuesRemove", "/v1/newsletters/:id/issues/remove", {
      params: NewsletterIssuesRemovePathParams,
      headers: NewsletterIssuesRemoveHeaders,
      payload: NewsletterIssuesRemoveRequestJson,
      success: NewsletterIssuesRemove200,
      error: [
        NewsletterIssuesRemove401.pipe(HttpApiSchema.status(401)),
        NewsletterIssuesRemove403.pipe(HttpApiSchema.status(403)),
        NewsletterIssuesRemove404.pipe(HttpApiSchema.status(404)),
        NewsletterIssuesRemove409.pipe(HttpApiSchema.status(409)),
        NewsletterIssuesRemove422.pipe(HttpApiSchema.status(422)),
        NewsletterIssuesRemove500,
        NewsletterIssuesRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletterIssues.remove")
      .annotate(OpenApi.Summary, "Remove a newsletter issue")
      .annotate(
        OpenApi.Description,
        "Removes one Markdown file from the draft under a revision fence. The project default issue must remain. Saved commits remain readable. Requires newsletters and email.",
      ),
    HttpApiEndpoint.post("newsletterIssuesRender", "/v1/newsletters/:id/issues/render", {
      params: NewsletterIssuesRenderPathParams,
      headers: NewsletterIssuesRenderHeaders,
      payload: NewsletterIssuesRenderRequestJson,
      success: NewsletterIssuesRender200,
      error: [
        NewsletterIssuesRender401.pipe(HttpApiSchema.status(401)),
        NewsletterIssuesRender403.pipe(HttpApiSchema.status(403)),
        NewsletterIssuesRender404.pipe(HttpApiSchema.status(404)),
        NewsletterIssuesRender409.pipe(HttpApiSchema.status(409)),
        NewsletterIssuesRender422.pipe(HttpApiSchema.status(422)),
        NewsletterIssuesRender500,
        NewsletterIssuesRender504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletterIssues.render")
      .annotate(OpenApi.Summary, "Render a newsletter issue fixture")
      .annotate(
        OpenApi.Description,
        "Renders a fixture declared by the layout to email or web at the requested revision. The web render is the publication page readers get, with the subscribe wall position marked. Requires newsletters and email.",
      ),
    HttpApiEndpoint.post("newsletterIssuesSave", "/v1/newsletters/:id/issues/save", {
      params: NewsletterIssuesSavePathParams,
      headers: NewsletterIssuesSaveHeaders,
      payload: NewsletterIssuesSaveRequestJson,
      success: NewsletterIssuesSave200,
      error: [
        NewsletterIssuesSave401.pipe(HttpApiSchema.status(401)),
        NewsletterIssuesSave403.pipe(HttpApiSchema.status(403)),
        NewsletterIssuesSave404.pipe(HttpApiSchema.status(404)),
        NewsletterIssuesSave409.pipe(HttpApiSchema.status(409)),
        NewsletterIssuesSave422.pipe(HttpApiSchema.status(422)),
        NewsletterIssuesSave500,
        NewsletterIssuesSave504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletterIssues.save")
      .annotate(OpenApi.Summary, "Save newsletter issues")
      .annotate(
        OpenApi.Description,
        "Validates the project and saves its draft as a Git commit with revision and branch-head fences. Issue sends pin the resulting commit and issue path. Requires newsletters and email.",
      ),
    HttpApiEndpoint.get("newsletterIssuesOpen", "/v1/newsletters/:id/issues/workspace", {
      params: NewsletterIssuesOpenPathParams,
      success: NewsletterIssuesOpen200,
      error: [
        NewsletterIssuesOpen401.pipe(HttpApiSchema.status(401)),
        NewsletterIssuesOpen403.pipe(HttpApiSchema.status(403)),
        NewsletterIssuesOpen404.pipe(HttpApiSchema.status(404)),
        NewsletterIssuesOpen409.pipe(HttpApiSchema.status(409)),
        NewsletterIssuesOpen422.pipe(HttpApiSchema.status(422)),
        NewsletterIssuesOpen500,
        NewsletterIssuesOpen504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "newsletterIssues.open")
      .annotate(OpenApi.Summary, "Open the newsletter issue workspace")
      .annotate(
        OpenApi.Description,
        "Returns the existing project workspace and pulls saved Git changes. Does not create a repository. Requires newsletters and email.",
      ),
  )
  .annotate(
    OpenApi.Description,
    "Newsletter-owned newsletter Markdown files and their Git workspace",
  ) {}
