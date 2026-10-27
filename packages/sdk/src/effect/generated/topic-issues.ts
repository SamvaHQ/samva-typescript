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
  OrganizationId,
  ResourceNotFoundError,
  TemplateProjectId,
  TemplateSourceError,
  TopicId,
  UnauthorizedError,
  UserId,
  ValidationError,
} from "./shared";

export type TopicIssueDocument = {
  readonly projectId: TemplateProjectId;
  readonly revision: string;
  readonly path: string;
  readonly content: string;
};
export const TopicIssueDocument = /* @__PURE__ */ (() =>
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
  }).annotate({ identifier: "TopicIssueDocument" }))();
export type TopicIssueSend = { readonly campaignId: CampaignId; readonly run: CampaignLatestRun };
export const TopicIssueSend = /* @__PURE__ */ (() =>
  Schema.Struct({ campaignId: CampaignId, run: CampaignLatestRun }).annotate({
    identifier: "TopicIssueSend",
  }))();
export type TopicIssueListItem = {
  readonly path: string;
  readonly title: string | null;
  readonly latestSend: TopicIssueSend | null;
};
export const TopicIssueListItem = /* @__PURE__ */ (() =>
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
    latestSend: Schema.Union([TopicIssueSend, Schema.Null]),
  }).annotate({ identifier: "TopicIssueListItem" }))();
export type TopicIssueList = {
  readonly projectId: TemplateProjectId | null;
  readonly revision: string | null;
  readonly items: ReadonlyArray<TopicIssueListItem>;
};
export const TopicIssueList = /* @__PURE__ */ (() =>
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
    items: Schema.Array(TopicIssueListItem),
  }).annotate({ identifier: "TopicIssueList" }))();
export type TopicIssuesListPathParams = { readonly id: TopicId };
export const TopicIssuesListPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: TopicId }))();
export type TopicIssuesList200 = TopicIssueList;
export const TopicIssuesList200 = TopicIssueList;
export type TopicIssuesList401 = UnauthorizedError;
export const TopicIssuesList401 = UnauthorizedError;
export type TopicIssuesList403 = ForbiddenError | FlagDisabledError;
export const TopicIssuesList403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type TopicIssuesList404 = ResourceNotFoundError;
export const TopicIssuesList404 = ResourceNotFoundError;
export type TopicIssuesList409 = ConflictError;
export const TopicIssuesList409 = ConflictError;
export type TopicIssuesList422 = TemplateSourceError | ValidationError;
export const TopicIssuesList422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TopicIssuesList500 = InternalError;
export const TopicIssuesList500 = InternalError;
export type TopicIssuesList504 = GatewayTimeoutError;
export const TopicIssuesList504 = GatewayTimeoutError;
export type TopicIssuesCreatePathParams = { readonly id: TopicId };
export const TopicIssuesCreatePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: TopicId }))();
export type TopicIssuesCreateRequestJson = {
  readonly path: string;
  readonly content: string;
  readonly idempotencyKey: string;
  readonly expectedRevision?: string | null;
};
export const TopicIssuesCreateRequestJson = /* @__PURE__ */ (() =>
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
    idempotencyKey: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({ expected: "a string with at most 128 code points" }),
      )
      .check(
        Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" }),
      ),
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
export type TopicIssuesCreate200 = {
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
export const TopicIssuesCreate200 = /* @__PURE__ */ (() =>
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
export type TopicIssuesCreate401 = UnauthorizedError;
export const TopicIssuesCreate401 = UnauthorizedError;
export type TopicIssuesCreate403 = ForbiddenError | FlagDisabledError;
export const TopicIssuesCreate403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type TopicIssuesCreate404 = ResourceNotFoundError;
export const TopicIssuesCreate404 = ResourceNotFoundError;
export type TopicIssuesCreate409 = ConflictError;
export const TopicIssuesCreate409 = ConflictError;
export type TopicIssuesCreate422 = TemplateSourceError | ValidationError;
export const TopicIssuesCreate422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TopicIssuesCreate500 = InternalError;
export const TopicIssuesCreate500 = InternalError;
export type TopicIssuesCreate504 = GatewayTimeoutError;
export const TopicIssuesCreate504 = GatewayTimeoutError;
export type TopicIssuesUpdatePathParams = { readonly id: TopicId };
export const TopicIssuesUpdatePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: TopicId }))();
export type TopicIssuesUpdateRequestJson = {
  readonly path: string;
  readonly content: string;
  readonly idempotencyKey: string;
  readonly expectedRevision: string;
};
export const TopicIssuesUpdateRequestJson = /* @__PURE__ */ (() =>
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
    idempotencyKey: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({ expected: "a string with at most 128 code points" }),
      )
      .check(
        Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" }),
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
export type TopicIssuesUpdate200 = {
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
export const TopicIssuesUpdate200 = /* @__PURE__ */ (() =>
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
export type TopicIssuesUpdate401 = UnauthorizedError;
export const TopicIssuesUpdate401 = UnauthorizedError;
export type TopicIssuesUpdate403 = ForbiddenError | FlagDisabledError;
export const TopicIssuesUpdate403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type TopicIssuesUpdate404 = ResourceNotFoundError;
export const TopicIssuesUpdate404 = ResourceNotFoundError;
export type TopicIssuesUpdate409 = ConflictError;
export const TopicIssuesUpdate409 = ConflictError;
export type TopicIssuesUpdate422 = TemplateSourceError | ValidationError;
export const TopicIssuesUpdate422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TopicIssuesUpdate500 = InternalError;
export const TopicIssuesUpdate500 = InternalError;
export type TopicIssuesUpdate504 = GatewayTimeoutError;
export const TopicIssuesUpdate504 = GatewayTimeoutError;
export type TopicIssuesCheckPathParams = { readonly id: TopicId };
export const TopicIssuesCheckPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: TopicId }))();
export type TopicIssuesCheckRequestJson = {
  readonly path: string;
  readonly expectedRevision: string;
};
export const TopicIssuesCheckRequestJson = /* @__PURE__ */ (() =>
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
export type TopicIssuesCheck200 = {
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
export const TopicIssuesCheck200 = /* @__PURE__ */ (() =>
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
export type TopicIssuesCheck401 = UnauthorizedError;
export const TopicIssuesCheck401 = UnauthorizedError;
export type TopicIssuesCheck403 = ForbiddenError | FlagDisabledError;
export const TopicIssuesCheck403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type TopicIssuesCheck404 = ResourceNotFoundError;
export const TopicIssuesCheck404 = ResourceNotFoundError;
export type TopicIssuesCheck409 = ConflictError;
export const TopicIssuesCheck409 = ConflictError;
export type TopicIssuesCheck422 = TemplateSourceError | ValidationError;
export const TopicIssuesCheck422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TopicIssuesCheck500 = InternalError;
export const TopicIssuesCheck500 = InternalError;
export type TopicIssuesCheck504 = GatewayTimeoutError;
export const TopicIssuesCheck504 = GatewayTimeoutError;
export type TopicIssuesGetPathParams = { readonly id: TopicId };
export const TopicIssuesGetPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: TopicId }))();
export type TopicIssuesGetQuery = { readonly path: string; readonly expectedRevision: string };
export const TopicIssuesGetQuery = /* @__PURE__ */ (() =>
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
export type TopicIssuesGet200 = TopicIssueDocument;
export const TopicIssuesGet200 = TopicIssueDocument;
export type TopicIssuesGet401 = UnauthorizedError;
export const TopicIssuesGet401 = UnauthorizedError;
export type TopicIssuesGet403 = ForbiddenError | FlagDisabledError;
export const TopicIssuesGet403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type TopicIssuesGet404 = ResourceNotFoundError;
export const TopicIssuesGet404 = ResourceNotFoundError;
export type TopicIssuesGet409 = ConflictError;
export const TopicIssuesGet409 = ConflictError;
export type TopicIssuesGet422 = TemplateSourceError | ValidationError;
export const TopicIssuesGet422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TopicIssuesGet500 = InternalError;
export const TopicIssuesGet500 = InternalError;
export type TopicIssuesGet504 = GatewayTimeoutError;
export const TopicIssuesGet504 = GatewayTimeoutError;
export type TopicIssuesHeadPathParams = { readonly id: TopicId };
export const TopicIssuesHeadPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: TopicId }))();
export type TopicIssuesHead200 = {
  readonly projectId: TemplateProjectId;
  readonly revision: string;
  readonly remoteHead: string;
};
export const TopicIssuesHead200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    projectId: TemplateProjectId,
    revision: Schema.String,
    remoteHead: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{40}$",
      }),
    ),
  }))();
export type TopicIssuesHead401 = UnauthorizedError;
export const TopicIssuesHead401 = UnauthorizedError;
export type TopicIssuesHead403 = ForbiddenError | FlagDisabledError;
export const TopicIssuesHead403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type TopicIssuesHead404 = ResourceNotFoundError;
export const TopicIssuesHead404 = ResourceNotFoundError;
export type TopicIssuesHead409 = ConflictError;
export const TopicIssuesHead409 = ConflictError;
export type TopicIssuesHead422 = TemplateSourceError | ValidationError;
export const TopicIssuesHead422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TopicIssuesHead500 = InternalError;
export const TopicIssuesHead500 = InternalError;
export type TopicIssuesHead504 = GatewayTimeoutError;
export const TopicIssuesHead504 = GatewayTimeoutError;
export type TopicIssuesHistoryPathParams = { readonly id: TopicId };
export const TopicIssuesHistoryPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TopicId }))();
export type TopicIssuesHistoryQuery = { readonly limit?: number | null };
export const TopicIssuesHistoryQuery = /* @__PURE__ */ (() =>
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
export type TopicIssuesHistory200 = {
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
export const TopicIssuesHistory200 = /* @__PURE__ */ (() =>
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
export type TopicIssuesHistory401 = UnauthorizedError;
export const TopicIssuesHistory401 = UnauthorizedError;
export type TopicIssuesHistory403 = ForbiddenError | FlagDisabledError;
export const TopicIssuesHistory403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type TopicIssuesHistory404 = ResourceNotFoundError;
export const TopicIssuesHistory404 = ResourceNotFoundError;
export type TopicIssuesHistory409 = ConflictError;
export const TopicIssuesHistory409 = ConflictError;
export type TopicIssuesHistory422 = TemplateSourceError | ValidationError;
export const TopicIssuesHistory422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TopicIssuesHistory500 = InternalError;
export const TopicIssuesHistory500 = InternalError;
export type TopicIssuesHistory504 = GatewayTimeoutError;
export const TopicIssuesHistory504 = GatewayTimeoutError;
export type TopicIssuesRemovePathParams = { readonly id: TopicId };
export const TopicIssuesRemovePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: TopicId }))();
export type TopicIssuesRemoveRequestJson = {
  readonly path: string;
  readonly idempotencyKey: string;
  readonly expectedRevision: string;
};
export const TopicIssuesRemoveRequestJson = /* @__PURE__ */ (() =>
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
    idempotencyKey: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({ expected: "a string with at most 128 code points" }),
      )
      .check(
        Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" }),
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
export type TopicIssuesRemove200 = {
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
export const TopicIssuesRemove200 = /* @__PURE__ */ (() =>
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
export type TopicIssuesRemove401 = UnauthorizedError;
export const TopicIssuesRemove401 = UnauthorizedError;
export type TopicIssuesRemove403 = ForbiddenError | FlagDisabledError;
export const TopicIssuesRemove403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type TopicIssuesRemove404 = ResourceNotFoundError;
export const TopicIssuesRemove404 = ResourceNotFoundError;
export type TopicIssuesRemove409 = ConflictError;
export const TopicIssuesRemove409 = ConflictError;
export type TopicIssuesRemove422 = TemplateSourceError | ValidationError;
export const TopicIssuesRemove422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TopicIssuesRemove500 = InternalError;
export const TopicIssuesRemove500 = InternalError;
export type TopicIssuesRemove504 = GatewayTimeoutError;
export const TopicIssuesRemove504 = GatewayTimeoutError;
export type TopicIssuesRenderPathParams = { readonly id: TopicId };
export const TopicIssuesRenderPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: TopicId }))();
export type TopicIssuesRenderRequestJson = {
  readonly path: string;
  readonly expectedRevision: string;
  readonly fixture: string;
  readonly target: "email" | "web";
};
export const TopicIssuesRenderRequestJson = /* @__PURE__ */ (() =>
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
export type TopicIssuesRender200 = {
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
export const TopicIssuesRender200 = /* @__PURE__ */ (() =>
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
export type TopicIssuesRender401 = UnauthorizedError;
export const TopicIssuesRender401 = UnauthorizedError;
export type TopicIssuesRender403 = ForbiddenError | FlagDisabledError;
export const TopicIssuesRender403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type TopicIssuesRender404 = ResourceNotFoundError;
export const TopicIssuesRender404 = ResourceNotFoundError;
export type TopicIssuesRender409 = ConflictError;
export const TopicIssuesRender409 = ConflictError;
export type TopicIssuesRender422 = TemplateSourceError | ValidationError;
export const TopicIssuesRender422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TopicIssuesRender500 = InternalError;
export const TopicIssuesRender500 = InternalError;
export type TopicIssuesRender504 = GatewayTimeoutError;
export const TopicIssuesRender504 = GatewayTimeoutError;
export type TopicIssuesSavePathParams = { readonly id: TopicId };
export const TopicIssuesSavePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: TopicId }))();
export type TopicIssuesSaveRequestJson = {
  readonly expectedRevision: string;
  readonly expectedHead: string;
  readonly message: string;
  readonly idempotencyKey: string;
};
export const TopicIssuesSaveRequestJson = /* @__PURE__ */ (() =>
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
export type TopicIssuesSave200 = {
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
export const TopicIssuesSave200 = /* @__PURE__ */ (() =>
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
export type TopicIssuesSave401 = UnauthorizedError;
export const TopicIssuesSave401 = UnauthorizedError;
export type TopicIssuesSave403 = ForbiddenError | FlagDisabledError;
export const TopicIssuesSave403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type TopicIssuesSave404 = ResourceNotFoundError;
export const TopicIssuesSave404 = ResourceNotFoundError;
export type TopicIssuesSave409 = ConflictError;
export const TopicIssuesSave409 = ConflictError;
export type TopicIssuesSave422 = TemplateSourceError | ValidationError;
export const TopicIssuesSave422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TopicIssuesSave500 = InternalError;
export const TopicIssuesSave500 = InternalError;
export type TopicIssuesSave504 = GatewayTimeoutError;
export const TopicIssuesSave504 = GatewayTimeoutError;
export type TopicIssuesOpenPathParams = { readonly id: TopicId };
export const TopicIssuesOpenPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: TopicId }))();
export type TopicIssuesOpen200 = {
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
export const TopicIssuesOpen200 = /* @__PURE__ */ (() =>
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
export type TopicIssuesOpen401 = UnauthorizedError;
export const TopicIssuesOpen401 = UnauthorizedError;
export type TopicIssuesOpen403 = ForbiddenError | FlagDisabledError;
export const TopicIssuesOpen403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type TopicIssuesOpen404 = ResourceNotFoundError;
export const TopicIssuesOpen404 = ResourceNotFoundError;
export type TopicIssuesOpen409 = ConflictError;
export const TopicIssuesOpen409 = ConflictError;
export type TopicIssuesOpen422 = TemplateSourceError | ValidationError;
export const TopicIssuesOpen422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TopicIssuesOpen500 = InternalError;
export const TopicIssuesOpen500 = InternalError;
export type TopicIssuesOpen504 = GatewayTimeoutError;
export const TopicIssuesOpen504 = GatewayTimeoutError;

export class TopicIssuesGroup extends HttpApiGroup.make("Topic issues")
  .add(
    HttpApiEndpoint.get("topicIssuesList", "/v1/topics/:id/issues", {
      params: TopicIssuesListPathParams,
      success: TopicIssuesList200,
      error: [
        TopicIssuesList401.pipe(HttpApiSchema.status(401)),
        TopicIssuesList403.pipe(HttpApiSchema.status(403)),
        TopicIssuesList404.pipe(HttpApiSchema.status(404)),
        TopicIssuesList409.pipe(HttpApiSchema.status(409)),
        TopicIssuesList422.pipe(HttpApiSchema.status(422)),
        TopicIssuesList500,
        TopicIssuesList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicIssues.list")
      .annotate(OpenApi.Summary, "List topic issues")
      .annotate(
        OpenApi.Description,
        "Lists the Markdown issues in the topic's shared Git workspace with each draft's title and its latest campaign send. An uninitialized topic returns null projectId and revision. Requires issueContent and email.",
      ),
    HttpApiEndpoint.post("topicIssuesCreate", "/v1/topics/:id/issues", {
      params: TopicIssuesCreatePathParams,
      payload: TopicIssuesCreateRequestJson,
      success: TopicIssuesCreate200,
      error: [
        TopicIssuesCreate401.pipe(HttpApiSchema.status(401)),
        TopicIssuesCreate403.pipe(HttpApiSchema.status(403)),
        TopicIssuesCreate404.pipe(HttpApiSchema.status(404)),
        TopicIssuesCreate409.pipe(HttpApiSchema.status(409)),
        TopicIssuesCreate422.pipe(HttpApiSchema.status(422)),
        TopicIssuesCreate500,
        TopicIssuesCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicIssues.create")
      .annotate(OpenApi.Summary, "Create a topic issue")
      .annotate(
        OpenApi.Description,
        "Creates an unsaved Markdown file. The first request provisions the topic's project and layout; omit expectedRevision only for that first request or its retry. Further creates require the current revision. No template entry is registered. Requires issueContent and email.",
      ),
    HttpApiEndpoint.patch("topicIssuesUpdate", "/v1/topics/:id/issues", {
      params: TopicIssuesUpdatePathParams,
      payload: TopicIssuesUpdateRequestJson,
      success: TopicIssuesUpdate200,
      error: [
        TopicIssuesUpdate401.pipe(HttpApiSchema.status(401)),
        TopicIssuesUpdate403.pipe(HttpApiSchema.status(403)),
        TopicIssuesUpdate404.pipe(HttpApiSchema.status(404)),
        TopicIssuesUpdate409.pipe(HttpApiSchema.status(409)),
        TopicIssuesUpdate422.pipe(HttpApiSchema.status(422)),
        TopicIssuesUpdate500,
        TopicIssuesUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicIssues.update")
      .annotate(OpenApi.Summary, "Update a topic issue")
      .annotate(
        OpenApi.Description,
        "Replaces the complete Markdown file under a revision fence. Save separately to create a Git commit. Requires issueContent and email.",
      ),
    HttpApiEndpoint.post("topicIssuesCheck", "/v1/topics/:id/issues/check", {
      params: TopicIssuesCheckPathParams,
      payload: TopicIssuesCheckRequestJson,
      success: TopicIssuesCheck200,
      error: [
        TopicIssuesCheck401.pipe(HttpApiSchema.status(401)),
        TopicIssuesCheck403.pipe(HttpApiSchema.status(403)),
        TopicIssuesCheck404.pipe(HttpApiSchema.status(404)),
        TopicIssuesCheck409.pipe(HttpApiSchema.status(409)),
        TopicIssuesCheck422.pipe(HttpApiSchema.status(422)),
        TopicIssuesCheck500,
        TopicIssuesCheck504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicIssues.check")
      .annotate(OpenApi.Summary, "Check a topic issue")
      .annotate(
        OpenApi.Description,
        "Compiles the issue in its layout at the requested revision and returns diagnostics and declared fixtures. Requires issueContent and email.",
      ),
    HttpApiEndpoint.get("topicIssuesGet", "/v1/topics/:id/issues/document", {
      params: TopicIssuesGetPathParams,
      query: TopicIssuesGetQuery,
      success: TopicIssuesGet200,
      error: [
        TopicIssuesGet401.pipe(HttpApiSchema.status(401)),
        TopicIssuesGet403.pipe(HttpApiSchema.status(403)),
        TopicIssuesGet404.pipe(HttpApiSchema.status(404)),
        TopicIssuesGet409.pipe(HttpApiSchema.status(409)),
        TopicIssuesGet422.pipe(HttpApiSchema.status(422)),
        TopicIssuesGet500,
        TopicIssuesGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicIssues.get")
      .annotate(OpenApi.Summary, "Read a topic issue")
      .annotate(
        OpenApi.Description,
        "Reads one issues/*.md file at the requested workspace revision. Requires issueContent and email.",
      ),
    HttpApiEndpoint.get("topicIssuesHead", "/v1/topics/:id/issues/head", {
      params: TopicIssuesHeadPathParams,
      success: TopicIssuesHead200,
      error: [
        TopicIssuesHead401.pipe(HttpApiSchema.status(401)),
        TopicIssuesHead403.pipe(HttpApiSchema.status(403)),
        TopicIssuesHead404.pipe(HttpApiSchema.status(404)),
        TopicIssuesHead409.pipe(HttpApiSchema.status(409)),
        TopicIssuesHead422.pipe(HttpApiSchema.status(422)),
        TopicIssuesHead500,
        TopicIssuesHead504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicIssues.head")
      .annotate(OpenApi.Summary, "Read the topic issue head")
      .annotate(
        OpenApi.Description,
        "Reads the current workspace revision and repository branch head. Requires issueContent and email.",
      ),
    HttpApiEndpoint.get("topicIssuesHistory", "/v1/topics/:id/issues/history", {
      params: TopicIssuesHistoryPathParams,
      query: TopicIssuesHistoryQuery,
      success: TopicIssuesHistory200,
      error: [
        TopicIssuesHistory401.pipe(HttpApiSchema.status(401)),
        TopicIssuesHistory403.pipe(HttpApiSchema.status(403)),
        TopicIssuesHistory404.pipe(HttpApiSchema.status(404)),
        TopicIssuesHistory409.pipe(HttpApiSchema.status(409)),
        TopicIssuesHistory422.pipe(HttpApiSchema.status(422)),
        TopicIssuesHistory500,
        TopicIssuesHistory504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicIssues.history")
      .annotate(OpenApi.Summary, "Read topic issue history")
      .annotate(
        OpenApi.Description,
        "Lists saved commits in the topic repository, newest first. Requires issueContent and email.",
      ),
    HttpApiEndpoint.post("topicIssuesRemove", "/v1/topics/:id/issues/remove", {
      params: TopicIssuesRemovePathParams,
      payload: TopicIssuesRemoveRequestJson,
      success: TopicIssuesRemove200,
      error: [
        TopicIssuesRemove401.pipe(HttpApiSchema.status(401)),
        TopicIssuesRemove403.pipe(HttpApiSchema.status(403)),
        TopicIssuesRemove404.pipe(HttpApiSchema.status(404)),
        TopicIssuesRemove409.pipe(HttpApiSchema.status(409)),
        TopicIssuesRemove422.pipe(HttpApiSchema.status(422)),
        TopicIssuesRemove500,
        TopicIssuesRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicIssues.remove")
      .annotate(OpenApi.Summary, "Remove a topic issue")
      .annotate(
        OpenApi.Description,
        "Removes one Markdown file from the draft under a revision fence. The project default issue must remain. Saved commits remain readable. Requires issueContent and email.",
      ),
    HttpApiEndpoint.post("topicIssuesRender", "/v1/topics/:id/issues/render", {
      params: TopicIssuesRenderPathParams,
      payload: TopicIssuesRenderRequestJson,
      success: TopicIssuesRender200,
      error: [
        TopicIssuesRender401.pipe(HttpApiSchema.status(401)),
        TopicIssuesRender403.pipe(HttpApiSchema.status(403)),
        TopicIssuesRender404.pipe(HttpApiSchema.status(404)),
        TopicIssuesRender409.pipe(HttpApiSchema.status(409)),
        TopicIssuesRender422.pipe(HttpApiSchema.status(422)),
        TopicIssuesRender500,
        TopicIssuesRender504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicIssues.render")
      .annotate(OpenApi.Summary, "Render a topic issue fixture")
      .annotate(
        OpenApi.Description,
        "Renders a fixture declared by the layout to email or web at the requested revision. The web render is the publication page readers get, with the subscribe wall position marked. Requires issueContent and email.",
      ),
    HttpApiEndpoint.post("topicIssuesSave", "/v1/topics/:id/issues/save", {
      params: TopicIssuesSavePathParams,
      payload: TopicIssuesSaveRequestJson,
      success: TopicIssuesSave200,
      error: [
        TopicIssuesSave401.pipe(HttpApiSchema.status(401)),
        TopicIssuesSave403.pipe(HttpApiSchema.status(403)),
        TopicIssuesSave404.pipe(HttpApiSchema.status(404)),
        TopicIssuesSave409.pipe(HttpApiSchema.status(409)),
        TopicIssuesSave422.pipe(HttpApiSchema.status(422)),
        TopicIssuesSave500,
        TopicIssuesSave504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicIssues.save")
      .annotate(OpenApi.Summary, "Save topic issues")
      .annotate(
        OpenApi.Description,
        "Validates the project and saves its draft as a Git commit with revision and branch-head fences. Issue sends pin the resulting commit and issue path. Requires issueContent and email.",
      ),
    HttpApiEndpoint.get("topicIssuesOpen", "/v1/topics/:id/issues/workspace", {
      params: TopicIssuesOpenPathParams,
      success: TopicIssuesOpen200,
      error: [
        TopicIssuesOpen401.pipe(HttpApiSchema.status(401)),
        TopicIssuesOpen403.pipe(HttpApiSchema.status(403)),
        TopicIssuesOpen404.pipe(HttpApiSchema.status(404)),
        TopicIssuesOpen409.pipe(HttpApiSchema.status(409)),
        TopicIssuesOpen422.pipe(HttpApiSchema.status(422)),
        TopicIssuesOpen500,
        TopicIssuesOpen504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicIssues.open")
      .annotate(OpenApi.Summary, "Open the topic issue workspace")
      .annotate(
        OpenApi.Description,
        "Returns the existing project workspace and pulls saved Git changes. Does not create a repository. Requires issueContent and email.",
      ),
  )
  .annotate(OpenApi.Description, "Topic-owned newsletter Markdown files and their Git workspace") {}
