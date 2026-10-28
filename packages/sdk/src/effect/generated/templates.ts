// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  BrandAssets,
  BrandFooter,
  ConflictError,
  Cursor,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  JsonValue,
  NamespaceId,
  OrganizationId,
  RenderLocale,
  RenderTimeZone,
  ResourceNotFoundError,
  SuccessResponse,
  TemplateFromDefault,
  TemplateId,
  TemplateInputContractId,
  TemplateProjectId,
  TemplatePublicationId,
  TemplateSourceError,
  TemplateTrackingDefault,
  UnauthorizedError,
  UserId,
  ValidationError,
  VersionCursor,
} from "./shared";

export type TemplatePublicationBrand = {
  readonly slug: string;
  readonly digest: string;
  readonly stale: boolean;
};
export const TemplatePublicationBrand = /* @__PURE__ */ (() =>
  Schema.Struct({
    slug: Schema.String.annotate({ description: "The brand the publication imports." }).check(
      Schema.isPattern(new RegExp("^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$",
      }),
    ),
    digest: Schema.String.annotate({
      description: "The brand's digest when the publication was built.",
    }),
    stale: Schema.Boolean.annotate({
      description:
        "Whether the brand has changed since this publication was built. Publishing the same commit again picks up the change.",
    }),
  }).annotate({ identifier: "TemplatePublicationBrand" }))();
export type TemplateFamilyId = string & EffectBrand.Brand<"TemplateFamilyId">;
export const TemplateFamilyId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^tfam_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^tfam_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "TemplateFamilyId",
    }),
  ).pipe(Schema.brand("TemplateFamilyId")))();
export type BrandRenderedFooter = {
  readonly html: string;
  readonly text: string;
  readonly headCss: string;
};
export const BrandRenderedFooter = /* @__PURE__ */ (() =>
  Schema.Struct({ html: Schema.String, text: Schema.String, headCss: Schema.String }).annotate({
    identifier: "BrandRenderedFooter",
  }))();
export type TemplatePublicationRender = {
  readonly subject: string;
  readonly preheader?: string;
  readonly html: string;
  readonly text: string;
};
export const TemplatePublicationRender = /* @__PURE__ */ (() =>
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
  }).annotate({ identifier: "TemplatePublicationRender" }))();
export type TemplateInputContractPage = {
  readonly items: ReadonlyArray<{
    readonly id: TemplateInputContractId;
    readonly organizationId: OrganizationId;
    readonly templateId: TemplateId;
    readonly version: number;
    readonly validationDigest: string;
    readonly schema: { readonly [x: string]: JsonValue };
    readonly createdAt: string;
  }>;
  readonly nextCursor: string | null;
};
export const TemplateInputContractPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        id: TemplateInputContractId,
        organizationId: OrganizationId,
        templateId: TemplateId,
        version: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        validationDigest: Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{64}$",
          }),
        ),
        schema: Schema.Record(Schema.String, JsonValue),
        createdAt: Schema.String,
      }),
    ),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "TemplateInputContractPage" }))();
export type TemplateFamilyMember = {
  readonly id: TemplateId;
  readonly name: string;
  readonly slug: string;
  readonly channel: "email";
  readonly status: "draft" | "pending" | "approved" | "published" | "rejected" | "archived";
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const TemplateFamilyMember = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: TemplateId,
    name: Schema.String,
    slug: Schema.String,
    channel: Schema.Literal("email"),
    status: Schema.Union([
      Schema.Literal("draft"),
      Schema.Literal("pending"),
      Schema.Literal("approved"),
      Schema.Literal("published"),
      Schema.Literal("rejected"),
      Schema.Literal("archived"),
    ]),
    isActive: Schema.Boolean,
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "TemplateFamilyMember" }))();
export type TemplateSummary = {
  readonly id: TemplateId;
  readonly slug: string;
  readonly name: string;
  readonly channel: "email";
  readonly projectId: TemplateProjectId;
  readonly namespaceId: NamespaceId | null;
  readonly shared: boolean;
  readonly entryPath: string;
  readonly status: "draft" | "pending" | "approved" | "published" | "rejected" | "archived";
  readonly isActive: boolean;
  readonly publishedAt: string | null;
  readonly brand: TemplatePublicationBrand | null;
  readonly fromDefault: TemplateFromDefault | null;
  readonly usageCount: number;
  readonly lastUsedAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const TemplateSummary = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: TemplateId,
    slug: Schema.String,
    name: Schema.String,
    channel: Schema.Literal("email"),
    projectId: TemplateProjectId,
    namespaceId: Schema.Union([NamespaceId, Schema.Null]).annotate({
      description:
        "The namespace the template's project belongs to; every entry in a project shares it. Null at organization level. A namespace-scoped key reaches only its own namespace's templates and shared ones.",
    }),
    shared: Schema.Boolean.annotate({
      description:
        "Whether the template's project is shared with every namespace. Every entry in a project shares it. A namespace-scoped key reads and sends a shared template in its own namespace but cannot change it. Only an organization-level project is shared.",
    }),
    entryPath: Schema.String.check(
      Schema.isMaxCodePoints(1024).annotate({ expected: "a string with at most 1024 code points" }),
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
    status: Schema.Union([
      Schema.Literal("draft"),
      Schema.Literal("pending"),
      Schema.Literal("approved"),
      Schema.Literal("published"),
      Schema.Literal("rejected"),
      Schema.Literal("archived"),
    ]),
    isActive: Schema.Boolean,
    publishedAt: Schema.Union([Schema.String, Schema.Null]),
    brand: Schema.Union([TemplatePublicationBrand, Schema.Null]),
    fromDefault: Schema.Union([TemplateFromDefault, Schema.Null]),
    usageCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    lastUsedAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "TemplateSummary" }))();
export type Template = {
  readonly id: TemplateId;
  readonly slug: string;
  readonly name: string;
  readonly channel: "email";
  readonly projectId: TemplateProjectId;
  readonly namespaceId: NamespaceId | null;
  readonly shared: boolean;
  readonly entryPath: string;
  readonly status: "draft" | "pending" | "approved" | "published" | "rejected" | "archived";
  readonly isActive: boolean;
  readonly publishedAt: string | null;
  readonly brand: TemplatePublicationBrand | null;
  readonly fromDefault: TemplateFromDefault | null;
  readonly usageCount: number;
  readonly lastUsedAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly familyId: TemplateFamilyId | null;
  readonly description: string | null;
  readonly category:
    | "transactional"
    | "marketing"
    | "support"
    | "notification"
    | "verification"
    | "reminder"
    | "alert"
    | null;
  readonly replyToDefault: ReadonlyArray<string> | null;
  readonly trackingDefault: TemplateTrackingDefault | null;
  readonly email: {
    readonly subject: string;
    readonly preheader: string | null;
    readonly headers: { readonly [x: string]: string } | null;
  } | null;
  readonly publicationId: TemplatePublicationId | null;
  readonly inputContractId: TemplateInputContractId | null;
  readonly inputSchema: { readonly [x: string]: JsonValue } | null;
};
export const Template = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: TemplateId,
    slug: Schema.String,
    name: Schema.String,
    channel: Schema.Literal("email"),
    projectId: TemplateProjectId,
    namespaceId: Schema.Union([NamespaceId, Schema.Null]).annotate({
      description:
        "The namespace the template's project belongs to; every entry in a project shares it. Null at organization level. A namespace-scoped key reaches only its own namespace's templates and shared ones.",
    }),
    shared: Schema.Boolean.annotate({
      description:
        "Whether the template's project is shared with every namespace. Every entry in a project shares it. A namespace-scoped key reads and sends a shared template in its own namespace but cannot change it. Only an organization-level project is shared.",
    }),
    entryPath: Schema.String.check(
      Schema.isMaxCodePoints(1024).annotate({ expected: "a string with at most 1024 code points" }),
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
    status: Schema.Union([
      Schema.Literal("draft"),
      Schema.Literal("pending"),
      Schema.Literal("approved"),
      Schema.Literal("published"),
      Schema.Literal("rejected"),
      Schema.Literal("archived"),
    ]),
    isActive: Schema.Boolean,
    publishedAt: Schema.Union([Schema.String, Schema.Null]),
    brand: Schema.Union([TemplatePublicationBrand, Schema.Null]),
    fromDefault: Schema.Union([TemplateFromDefault, Schema.Null]),
    usageCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    lastUsedAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
    familyId: Schema.Union([TemplateFamilyId, Schema.Null]),
    description: Schema.Union([Schema.String, Schema.Null]),
    category: Schema.Union([
      Schema.Union([
        Schema.Literal("transactional"),
        Schema.Literal("marketing"),
        Schema.Literal("support"),
        Schema.Literal("notification"),
        Schema.Literal("verification"),
        Schema.Literal("reminder"),
        Schema.Literal("alert"),
      ]),
      Schema.Null,
    ]),
    replyToDefault: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    trackingDefault: Schema.Union([TemplateTrackingDefault, Schema.Null]),
    email: Schema.Union([
      Schema.Struct({
        subject: Schema.String,
        preheader: Schema.Union([Schema.String, Schema.Null]),
        headers: Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
      }),
      Schema.Null,
    ]),
    publicationId: Schema.Union([TemplatePublicationId, Schema.Null]),
    inputContractId: Schema.Union([TemplateInputContractId, Schema.Null]),
    inputSchema: Schema.Union([Schema.Record(Schema.String, JsonValue), Schema.Null]),
  }).annotate({ identifier: "Template" }))();
export type TemplateFamily = {
  readonly id: TemplateFamilyId;
  readonly name: string;
  readonly members: ReadonlyArray<TemplateFamilyMember>;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const TemplateFamily = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: TemplateFamilyId,
    name: Schema.String,
    members: Schema.Array(TemplateFamilyMember),
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "TemplateFamily" }))();
export type TemplatePage = {
  readonly items: ReadonlyArray<TemplateSummary>;
  readonly nextCursor: string | null;
};
export const TemplatePage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(TemplateSummary),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "TemplatePage" }))();
export type TemplateFromWebsite = {
  readonly template: Template;
  readonly website: { readonly url: string; readonly host: string };
  readonly ask: string;
};
export const TemplateFromWebsite = /* @__PURE__ */ (() =>
  Schema.Struct({
    template: Template,
    website: Schema.Struct({
      url: Schema.String.annotate({ description: "The address Samva checked, normalized." }),
      host: Schema.String,
    }),
    ask: Schema.String.annotate({
      description:
        "The request to send the template assistant in the editor. The assistant reads the site, rebuilds the project's theme and blocks to match it, and proposes a brand that changes nothing until the customer applies it.",
    }),
  }).annotate({ identifier: "TemplateFromWebsite" }))();
export type TemplateFamilyPage = {
  readonly items: ReadonlyArray<TemplateFamily>;
  readonly nextCursor: string | null;
};
export const TemplateFamilyPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(TemplateFamily),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "TemplateFamilyPage" }))();
export type TemplatesListQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
  readonly category?:
    | "transactional"
    | "marketing"
    | "support"
    | "notification"
    | "verification"
    | "reminder"
    | "alert"
    | null;
  readonly channel?: "email" | null;
  readonly status?: "draft" | "pending" | "approved" | "published" | "rejected" | "archived" | null;
  readonly search?: string | null;
  readonly projectId?: TemplateProjectId | null;
  readonly namespaceId?: NamespaceId | null;
  readonly shared?: boolean | null;
};
export const TemplatesListQuery = /* @__PURE__ */ (() =>
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
    category: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Literal("transactional"),
          Schema.Literal("marketing"),
          Schema.Literal("support"),
          Schema.Literal("notification"),
          Schema.Literal("verification"),
          Schema.Literal("reminder"),
          Schema.Literal("alert"),
        ]),
        Schema.Null,
      ]),
    ),
    channel: Schema.optionalKey(Schema.Union([Schema.Literal("email"), Schema.Null])),
    status: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Literal("draft"),
          Schema.Literal("pending"),
          Schema.Literal("approved"),
          Schema.Literal("published"),
          Schema.Literal("rejected"),
          Schema.Literal("archived"),
        ]),
        Schema.Null,
      ]),
    ),
    search: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    projectId: Schema.optionalKey(Schema.Union([TemplateProjectId, Schema.Null])),
    namespaceId: Schema.optionalKey(
      Schema.Union([NamespaceId, Schema.Null]).annotate({
        description:
          "Only the templates this namespace uses: its own and those shared with every namespace (add `shared=false` for its own only). A namespace-scoped key lists its own namespace's and shared templates.",
      }),
    ),
    shared: Schema.optionalKey(
      Schema.Union([Schema.Boolean, Schema.Null]).annotate({
        description:
          "Only templates whose project is shared with every namespace (true), or only unshared ones (false).",
      }),
    ),
  }))();
export type TemplatesList200 = TemplatePage;
export const TemplatesList200 = TemplatePage;
export type TemplatesList401 = UnauthorizedError;
export const TemplatesList401 = UnauthorizedError;
export type TemplatesList403 = ForbiddenError;
export const TemplatesList403 = ForbiddenError;
export type TemplatesList422 = ValidationError;
export const TemplatesList422 = ValidationError;
export type TemplatesList500 = InternalError;
export const TemplatesList500 = InternalError;
export type TemplatesList504 = GatewayTimeoutError;
export const TemplatesList504 = GatewayTimeoutError;
export type TemplatesCreateHeaders = { readonly "idempotency-key": string };
export const TemplatesCreateHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
      )
      .check(
        Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
      ),
  }))();
export type TemplatesCreateRequestJson = {
  readonly name: string;
  readonly projectName?: string | null;
  readonly slug?: string | null;
  readonly galleryTemplateId?: string | null;
  readonly useBrand?: boolean | null;
  readonly description?: string | null;
  readonly category?:
    | "transactional"
    | "marketing"
    | "support"
    | "notification"
    | "verification"
    | "reminder"
    | "alert"
    | null;
  readonly isActive?: boolean | null;
  readonly namespaceId?: NamespaceId | null;
  readonly shared?: boolean | null;
};
export const TemplatesCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(200).annotate({ expected: "a string with at most 200 code points" }),
      )
      .check(
        Schema.isMaxLength(200).annotate({ expected: "a value with a length of at most 200" }),
      ),
    projectName: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        )
          .check(
            Schema.isMaxCodePoints(200).annotate({
              expected: "a string with at most 200 code points",
            }),
          )
          .check(
            Schema.isMaxLength(200).annotate({ expected: "a value with a length of at most 200" }),
          ),
        Schema.Null,
      ]),
    ),
    slug: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isPattern(new RegExp("^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
            expected: "a string matching the RegExp ^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$",
          }),
        ),
        Schema.Null,
      ]),
    ),
    galleryTemplateId: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
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
        Schema.Null,
      ]),
    ),
    useBrand: Schema.optionalKey(
      Schema.Union([
        Schema.Boolean.annotate({
          description:
            "With `galleryTemplateId`: whether the new project's `theme.css` imports the organization's default brand (`@import \"samva:brand\";`) over the starter's look. Defaults to false.",
        }),
        Schema.Null,
      ]),
    ),
    description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    category: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Literal("transactional"),
          Schema.Literal("marketing"),
          Schema.Literal("support"),
          Schema.Literal("notification"),
          Schema.Literal("verification"),
          Schema.Literal("reminder"),
          Schema.Literal("alert"),
        ]),
        Schema.Null,
      ]),
    ),
    isActive: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    namespaceId: Schema.optionalKey(
      Schema.Union([NamespaceId, Schema.Null]).annotate({
        description:
          "The namespace the new template project belongs to; the project and every entry added to it share it. Omit for organization level. A namespace-scoped key always creates in its own namespace.",
      }),
    ),
    shared: Schema.optionalKey(
      Schema.Union([Schema.Boolean, Schema.Null]).annotate({
        description:
          "Share the new organization-level project with every namespace: namespace-scoped keys read and send its entries but cannot change them. Defaults to false. Not with `namespaceId`, and not from a namespace-scoped key.",
      }),
    ),
  }))();
export type TemplatesCreate201 = Template;
export const TemplatesCreate201 = Template;
export type TemplatesCreate401 = UnauthorizedError;
export const TemplatesCreate401 = UnauthorizedError;
export type TemplatesCreate403 = ForbiddenError;
export const TemplatesCreate403 = ForbiddenError;
export type TemplatesCreate404 = ResourceNotFoundError;
export const TemplatesCreate404 = ResourceNotFoundError;
export type TemplatesCreate409 = ConflictError;
export const TemplatesCreate409 = ConflictError;
export type TemplatesCreate422 = TemplateSourceError | ValidationError;
export const TemplatesCreate422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TemplatesCreate500 = InternalError;
export const TemplatesCreate500 = InternalError;
export type TemplatesCreate504 = GatewayTimeoutError;
export const TemplatesCreate504 = GatewayTimeoutError;
export type TemplatesGetByIdPathParams = { readonly id: TemplateId };
export const TemplatesGetByIdPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplatesGetById200 = Template;
export const TemplatesGetById200 = Template;
export type TemplatesGetById401 = UnauthorizedError;
export const TemplatesGetById401 = UnauthorizedError;
export type TemplatesGetById403 = ForbiddenError;
export const TemplatesGetById403 = ForbiddenError;
export type TemplatesGetById404 = ResourceNotFoundError;
export const TemplatesGetById404 = ResourceNotFoundError;
export type TemplatesGetById422 = ValidationError;
export const TemplatesGetById422 = ValidationError;
export type TemplatesGetById500 = InternalError;
export const TemplatesGetById500 = InternalError;
export type TemplatesGetById504 = GatewayTimeoutError;
export const TemplatesGetById504 = GatewayTimeoutError;
export type TemplatesRemovePathParams = { readonly id: TemplateId };
export const TemplatesRemovePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplatesRemove200 = SuccessResponse;
export const TemplatesRemove200 = SuccessResponse;
export type TemplatesRemove401 = UnauthorizedError;
export const TemplatesRemove401 = UnauthorizedError;
export type TemplatesRemove403 = ForbiddenError;
export const TemplatesRemove403 = ForbiddenError;
export type TemplatesRemove404 = ResourceNotFoundError;
export const TemplatesRemove404 = ResourceNotFoundError;
export type TemplatesRemove422 = ValidationError;
export const TemplatesRemove422 = ValidationError;
export type TemplatesRemove500 = InternalError;
export const TemplatesRemove500 = InternalError;
export type TemplatesRemove504 = GatewayTimeoutError;
export const TemplatesRemove504 = GatewayTimeoutError;
export type TemplatesUpdatePathParams = { readonly id: TemplateId };
export const TemplatesUpdatePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplatesUpdateRequestJson = {
  readonly data: {
    readonly name?: string | null;
    readonly slug?: string | null;
    readonly entryPath?: string | null;
    readonly description?: string | null;
    readonly category?:
      | "transactional"
      | "marketing"
      | "support"
      | "notification"
      | "verification"
      | "reminder"
      | "alert"
      | null;
    readonly fromDefault?: TemplateFromDefault | null;
    readonly replyToDefault?: ReadonlyArray<string> | null;
    readonly trackingDefault?: TemplateTrackingDefault | null;
    readonly isActive?: boolean | null;
    readonly shared?: boolean | null;
  };
};
export const TemplatesUpdateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    data: Schema.Struct({
      name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      slug: Schema.optionalKey(
        Schema.Union([
          Schema.String.check(
            Schema.isPattern(new RegExp("^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
              expected: "a string matching the RegExp ^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$",
            }),
          ),
          Schema.Null,
        ]),
      ),
      entryPath: Schema.optionalKey(
        Schema.Union([
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
              Schema.isMaxLength(1024).annotate({
                expected: "a value with a length of at most 1024",
              }),
            ),
          Schema.Null,
        ]),
      ),
      description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      category: Schema.optionalKey(
        Schema.Union([
          Schema.Union([
            Schema.Literal("transactional"),
            Schema.Literal("marketing"),
            Schema.Literal("support"),
            Schema.Literal("notification"),
            Schema.Literal("verification"),
            Schema.Literal("reminder"),
            Schema.Literal("alert"),
          ]),
          Schema.Null,
        ]),
      ),
      fromDefault: Schema.optionalKey(Schema.Union([TemplateFromDefault, Schema.Null])),
      replyToDefault: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
      trackingDefault: Schema.optionalKey(
        Schema.Union([TemplateTrackingDefault, Schema.Null]).annotate({
          description:
            "Engagement tracking for sends of this template: `opens` and `clicks`, each inherited from the domain and organization defaults when omitted. A send request's own `tracking` still wins. Null clears the template's default.",
        }),
      ),
      isActive: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      shared: Schema.optionalKey(
        Schema.Union([Schema.Boolean, Schema.Null]).annotate({
          description:
            "Share the template's project with every namespace, or stop sharing it. Applies to every entry in the project. Only an organization-level project is shared.",
        }),
      ),
    }),
  }))();
export type TemplatesUpdate200 = Template;
export const TemplatesUpdate200 = Template;
export type TemplatesUpdate401 = UnauthorizedError;
export const TemplatesUpdate401 = UnauthorizedError;
export type TemplatesUpdate403 = ForbiddenError;
export const TemplatesUpdate403 = ForbiddenError;
export type TemplatesUpdate404 = ResourceNotFoundError;
export const TemplatesUpdate404 = ResourceNotFoundError;
export type TemplatesUpdate409 = ConflictError;
export const TemplatesUpdate409 = ConflictError;
export type TemplatesUpdate422 = ValidationError;
export const TemplatesUpdate422 = ValidationError;
export type TemplatesUpdate500 = InternalError;
export const TemplatesUpdate500 = InternalError;
export type TemplatesUpdate504 = GatewayTimeoutError;
export const TemplatesUpdate504 = GatewayTimeoutError;
export type TemplatesListInputContractsPathParams = { readonly id: TemplateId };
export const TemplatesListInputContractsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplatesListInputContractsQuery = {
  readonly limit?: number | null;
  readonly cursor?: VersionCursor | null;
};
export const TemplatesListInputContractsQuery = /* @__PURE__ */ (() =>
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
    cursor: Schema.optionalKey(Schema.Union([VersionCursor, Schema.Null])),
  }))();
export type TemplatesListInputContracts200 = TemplateInputContractPage;
export const TemplatesListInputContracts200 = TemplateInputContractPage;
export type TemplatesListInputContracts401 = UnauthorizedError;
export const TemplatesListInputContracts401 = UnauthorizedError;
export type TemplatesListInputContracts403 = ForbiddenError;
export const TemplatesListInputContracts403 = ForbiddenError;
export type TemplatesListInputContracts404 = ResourceNotFoundError;
export const TemplatesListInputContracts404 = ResourceNotFoundError;
export type TemplatesListInputContracts422 = ValidationError;
export const TemplatesListInputContracts422 = ValidationError;
export type TemplatesListInputContracts500 = InternalError;
export const TemplatesListInputContracts500 = InternalError;
export type TemplatesListInputContracts504 = GatewayTimeoutError;
export const TemplatesListInputContracts504 = GatewayTimeoutError;
export type TemplatesGetInputContractPathParams = {
  readonly id: TemplateId;
  readonly inputContractId: TemplateInputContractId;
};
export const TemplatesGetInputContractPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId, inputContractId: TemplateInputContractId }))();
export type TemplatesGetInputContract200 = {
  readonly id: TemplateInputContractId;
  readonly organizationId: OrganizationId;
  readonly templateId: TemplateId;
  readonly version: number;
  readonly validationDigest: string;
  readonly schema: { readonly [x: string]: JsonValue };
  readonly createdAt: string;
};
export const TemplatesGetInputContract200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: TemplateInputContractId,
    organizationId: OrganizationId,
    templateId: TemplateId,
    version: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    validationDigest: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{64}$",
      }),
    ),
    schema: Schema.Record(Schema.String, JsonValue),
    createdAt: Schema.String,
  }))();
export type TemplatesGetInputContract401 = UnauthorizedError;
export const TemplatesGetInputContract401 = UnauthorizedError;
export type TemplatesGetInputContract403 = ForbiddenError;
export const TemplatesGetInputContract403 = ForbiddenError;
export type TemplatesGetInputContract404 = ResourceNotFoundError;
export const TemplatesGetInputContract404 = ResourceNotFoundError;
export type TemplatesGetInputContract422 = ValidationError;
export const TemplatesGetInputContract422 = ValidationError;
export type TemplatesGetInputContract500 = InternalError;
export const TemplatesGetInputContract500 = InternalError;
export type TemplatesGetInputContract504 = GatewayTimeoutError;
export const TemplatesGetInputContract504 = GatewayTimeoutError;
export type TemplatesPublishPathParams = { readonly id: TemplateId };
export const TemplatesPublishPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplatesPublishRequestJson = {
  readonly projectId: TemplateProjectId;
  readonly commitSha: string;
  readonly entryPath: string;
  readonly expectedWorkspaceRevision: string;
  readonly ifCurrentPublicationId?: TemplatePublicationId | null;
};
export const TemplatesPublishRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    projectId: TemplateProjectId,
    commitSha: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{40}$",
      }),
    ),
    entryPath: Schema.String.check(
      Schema.isMaxCodePoints(1024).annotate({ expected: "a string with at most 1024 code points" }),
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
    expectedWorkspaceRevision: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
    ifCurrentPublicationId: Schema.optionalKey(Schema.Union([TemplatePublicationId, Schema.Null])),
  }))();
export type TemplatesPublish201 = {
  readonly id: TemplatePublicationId;
  readonly organizationId: OrganizationId;
  readonly projectId: TemplateProjectId;
  readonly templateId: TemplateId;
  readonly inputContractId: TemplateInputContractId;
  readonly commitSha: string;
  readonly treeSha: string;
  readonly entryPath: string;
  readonly buildIdentity: string;
  readonly manifest: {
    readonly templateKey: string;
    readonly compiled: {
      readonly version: number;
      readonly digest: string;
      readonly bytes: number;
    };
    readonly compiler: string;
    readonly input: { readonly schemaDigest: string; readonly contractDigest: string };
    readonly assets: {
      readonly base: string;
      readonly entries: ReadonlyArray<{
        readonly path: string;
        readonly fileName: string;
        readonly digest: string;
        readonly bytes: number;
        readonly contentType: string;
        readonly url: string;
      }>;
    };
    readonly source: {
      readonly commitSha: string;
      readonly treeSha: string;
      readonly entryPath: string | string;
      readonly treeDigest: string;
    };
    readonly brand?: {
      readonly slug: string;
      readonly css: string;
      readonly assets: BrandAssets;
      readonly footer: BrandFooter;
      readonly renderedFooter: BrandRenderedFooter;
      readonly digest: string;
      readonly rendersFooter: "every" | "some" | "none";
    };
  };
  readonly compiled: { readonly key: string; readonly digest: string };
  readonly assets: ReadonlyArray<{
    readonly path: string;
    readonly fileName: string;
    readonly digest: string;
    readonly bytes: number;
    readonly contentType: string;
    readonly url: string;
  }>;
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
  readonly status: string;
  readonly publishedAt: string;
  readonly publishedBy: string | null;
  readonly createdAt: string;
};
export const TemplatesPublish201 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: TemplatePublicationId,
    organizationId: OrganizationId,
    projectId: TemplateProjectId,
    templateId: TemplateId,
    inputContractId: TemplateInputContractId,
    commitSha: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{40}$",
      }),
    ),
    treeSha: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{40}$",
      }),
    ),
    entryPath: Schema.String.check(
      Schema.isMaxCodePoints(1024).annotate({ expected: "a string with at most 1024 code points" }),
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
    buildIdentity: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{64}$",
      }),
    ),
    manifest: Schema.Struct({
      templateKey: Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      ),
      compiled: Schema.Struct({
        version: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        digest: Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{64}$",
          }),
        ),
        bytes: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      compiler: Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      ),
      input: Schema.Struct({
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
      assets: Schema.Struct({
        base: Schema.String.check(
          Schema.isPattern(new RegExp("^https?:\\/\\/", "u")).annotate({
            expected: "a string matching the RegExp ^https?:\\/\\/",
          }),
        ),
        entries: Schema.Array(
          Schema.Struct({
            path: Schema.String.check(
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
            fileName: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-f0-9]{64}(?:\\.[A-Za-z0-9]+)?$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-f0-9]{64}(?:\\.[A-Za-z0-9]+)?$",
              }),
            ),
            digest: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-f0-9]{64}$",
              }),
            ),
            bytes: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
            contentType: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            ),
            url: Schema.String.check(
              Schema.isPattern(new RegExp("^https?:\\/\\/", "u")).annotate({
                expected: "a string matching the RegExp ^https?:\\/\\/",
              }),
            ),
          }),
        ).check(
          Schema.isMaxLength(32).annotate({ expected: "a value with a length of at most 32" }),
        ),
      }),
      source: Schema.Struct({
        commitSha: Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{40}$",
          }),
        ),
        treeSha: Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{40}$",
          }),
        ),
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
              Schema.isMaxLength(1024).annotate({
                expected: "a value with a length of at most 1024",
              }),
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
              Schema.isMaxLength(1024).annotate({
                expected: "a value with a length of at most 1024",
              }),
            ),
        ]),
        treeDigest: Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{64}$",
          }),
        ),
      }),
      brand: Schema.optionalKey(
        Schema.Struct({
          slug: Schema.String.check(
            Schema.isPattern(new RegExp("^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$", "u")).annotate({
              expected: "a string matching the RegExp ^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$",
            }),
          ),
          css: Schema.String,
          assets: BrandAssets,
          footer: BrandFooter,
          renderedFooter: BrandRenderedFooter,
          digest: Schema.String.check(
            Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
              expected: "a string matching the RegExp ^[a-f0-9]{64}$",
            }),
          ),
          rendersFooter: Schema.Union([
            Schema.Literal("every"),
            Schema.Literal("some"),
            Schema.Literal("none"),
          ]),
        }),
      ),
    }),
    compiled: Schema.Struct({
      key: Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      ),
      digest: Schema.String.check(
        Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-f0-9]{64}$",
        }),
      ),
    }),
    assets: Schema.Array(
      Schema.Struct({
        path: Schema.String.check(
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
        fileName: Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{64}(?:\\.[A-Za-z0-9]+)?$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{64}(?:\\.[A-Za-z0-9]+)?$",
          }),
        ),
        digest: Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{64}$",
          }),
        ),
        bytes: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        contentType: Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        ),
        url: Schema.String.check(
          Schema.isPattern(new RegExp("^https?:\\/\\/", "u")).annotate({
            expected: "a string matching the RegExp ^https?:\\/\\/",
          }),
        ),
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
    status: Schema.String,
    publishedAt: Schema.String,
    publishedBy: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
  }))();
export type TemplatesPublish401 = UnauthorizedError;
export const TemplatesPublish401 = UnauthorizedError;
export type TemplatesPublish403 = ForbiddenError;
export const TemplatesPublish403 = ForbiddenError;
export type TemplatesPublish404 = ResourceNotFoundError;
export const TemplatesPublish404 = ResourceNotFoundError;
export type TemplatesPublish409 = ConflictError;
export const TemplatesPublish409 = ConflictError;
export type TemplatesPublish422 = TemplateSourceError | ValidationError;
export const TemplatesPublish422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TemplatesPublish500 = InternalError;
export const TemplatesPublish500 = InternalError;
export type TemplatesPublish504 = GatewayTimeoutError;
export const TemplatesPublish504 = GatewayTimeoutError;
export type TemplatesGetPublicationPathParams = {
  readonly id: TemplateId;
  readonly publicationId: TemplatePublicationId;
};
export const TemplatesGetPublicationPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId, publicationId: TemplatePublicationId }))();
export type TemplatesGetPublication200 = {
  readonly id: TemplatePublicationId;
  readonly organizationId: OrganizationId;
  readonly projectId: TemplateProjectId;
  readonly templateId: TemplateId;
  readonly inputContractId: TemplateInputContractId;
  readonly commitSha: string;
  readonly treeSha: string;
  readonly entryPath: string;
  readonly buildIdentity: string;
  readonly manifest: {
    readonly templateKey: string;
    readonly compiled: {
      readonly version: number;
      readonly digest: string;
      readonly bytes: number;
    };
    readonly compiler: string;
    readonly input: { readonly schemaDigest: string; readonly contractDigest: string };
    readonly assets: {
      readonly base: string;
      readonly entries: ReadonlyArray<{
        readonly path: string;
        readonly fileName: string;
        readonly digest: string;
        readonly bytes: number;
        readonly contentType: string;
        readonly url: string;
      }>;
    };
    readonly source: {
      readonly commitSha: string;
      readonly treeSha: string;
      readonly entryPath: string | string;
      readonly treeDigest: string;
    };
    readonly brand?: {
      readonly slug: string;
      readonly css: string;
      readonly assets: BrandAssets;
      readonly footer: BrandFooter;
      readonly renderedFooter: BrandRenderedFooter;
      readonly digest: string;
      readonly rendersFooter: "every" | "some" | "none";
    };
  };
  readonly compiled: { readonly key: string; readonly digest: string };
  readonly assets: ReadonlyArray<{
    readonly path: string;
    readonly fileName: string;
    readonly digest: string;
    readonly bytes: number;
    readonly contentType: string;
    readonly url: string;
  }>;
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
  readonly status: string;
  readonly publishedAt: string;
  readonly publishedBy: string | null;
  readonly createdAt: string;
};
export const TemplatesGetPublication200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: TemplatePublicationId,
    organizationId: OrganizationId,
    projectId: TemplateProjectId,
    templateId: TemplateId,
    inputContractId: TemplateInputContractId,
    commitSha: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{40}$",
      }),
    ),
    treeSha: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{40}$",
      }),
    ),
    entryPath: Schema.String.check(
      Schema.isMaxCodePoints(1024).annotate({ expected: "a string with at most 1024 code points" }),
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
    buildIdentity: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{64}$",
      }),
    ),
    manifest: Schema.Struct({
      templateKey: Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      ),
      compiled: Schema.Struct({
        version: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        digest: Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{64}$",
          }),
        ),
        bytes: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      compiler: Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      ),
      input: Schema.Struct({
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
      assets: Schema.Struct({
        base: Schema.String.check(
          Schema.isPattern(new RegExp("^https?:\\/\\/", "u")).annotate({
            expected: "a string matching the RegExp ^https?:\\/\\/",
          }),
        ),
        entries: Schema.Array(
          Schema.Struct({
            path: Schema.String.check(
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
            fileName: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-f0-9]{64}(?:\\.[A-Za-z0-9]+)?$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-f0-9]{64}(?:\\.[A-Za-z0-9]+)?$",
              }),
            ),
            digest: Schema.String.check(
              Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
                expected: "a string matching the RegExp ^[a-f0-9]{64}$",
              }),
            ),
            bytes: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
            contentType: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            ),
            url: Schema.String.check(
              Schema.isPattern(new RegExp("^https?:\\/\\/", "u")).annotate({
                expected: "a string matching the RegExp ^https?:\\/\\/",
              }),
            ),
          }),
        ).check(
          Schema.isMaxLength(32).annotate({ expected: "a value with a length of at most 32" }),
        ),
      }),
      source: Schema.Struct({
        commitSha: Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{40}$",
          }),
        ),
        treeSha: Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{40}$",
          }),
        ),
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
              Schema.isMaxLength(1024).annotate({
                expected: "a value with a length of at most 1024",
              }),
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
              Schema.isMaxLength(1024).annotate({
                expected: "a value with a length of at most 1024",
              }),
            ),
        ]),
        treeDigest: Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{64}$",
          }),
        ),
      }),
      brand: Schema.optionalKey(
        Schema.Struct({
          slug: Schema.String.check(
            Schema.isPattern(new RegExp("^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$", "u")).annotate({
              expected: "a string matching the RegExp ^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$",
            }),
          ),
          css: Schema.String,
          assets: BrandAssets,
          footer: BrandFooter,
          renderedFooter: BrandRenderedFooter,
          digest: Schema.String.check(
            Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
              expected: "a string matching the RegExp ^[a-f0-9]{64}$",
            }),
          ),
          rendersFooter: Schema.Union([
            Schema.Literal("every"),
            Schema.Literal("some"),
            Schema.Literal("none"),
          ]),
        }),
      ),
    }),
    compiled: Schema.Struct({
      key: Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      ),
      digest: Schema.String.check(
        Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-f0-9]{64}$",
        }),
      ),
    }),
    assets: Schema.Array(
      Schema.Struct({
        path: Schema.String.check(
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
        fileName: Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{64}(?:\\.[A-Za-z0-9]+)?$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{64}(?:\\.[A-Za-z0-9]+)?$",
          }),
        ),
        digest: Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{64}$",
          }),
        ),
        bytes: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        contentType: Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        ),
        url: Schema.String.check(
          Schema.isPattern(new RegExp("^https?:\\/\\/", "u")).annotate({
            expected: "a string matching the RegExp ^https?:\\/\\/",
          }),
        ),
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
    status: Schema.String,
    publishedAt: Schema.String,
    publishedBy: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
  }))();
export type TemplatesGetPublication401 = UnauthorizedError;
export const TemplatesGetPublication401 = UnauthorizedError;
export type TemplatesGetPublication403 = ForbiddenError;
export const TemplatesGetPublication403 = ForbiddenError;
export type TemplatesGetPublication404 = ResourceNotFoundError;
export const TemplatesGetPublication404 = ResourceNotFoundError;
export type TemplatesGetPublication422 = ValidationError;
export const TemplatesGetPublication422 = ValidationError;
export type TemplatesGetPublication500 = InternalError;
export const TemplatesGetPublication500 = InternalError;
export type TemplatesGetPublication504 = GatewayTimeoutError;
export const TemplatesGetPublication504 = GatewayTimeoutError;
export type TemplatesRenderPublicationPathParams = {
  readonly id: TemplateId;
  readonly publicationId: TemplatePublicationId;
};
export const TemplatesRenderPublicationPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId, publicationId: TemplatePublicationId }))();
export type TemplatesRenderPublicationRequestJson = {
  readonly data: { readonly [x: string]: JsonValue };
  readonly locale?: RenderLocale;
  readonly timeZone?: RenderTimeZone;
};
export const TemplatesRenderPublicationRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    data: Schema.Record(Schema.String, JsonValue).annotate({
      description: "The input to render with, validated against the publication's input schema.",
    }),
    locale: Schema.optionalKey(RenderLocale),
    timeZone: Schema.optionalKey(RenderTimeZone),
  }))();
export type TemplatesRenderPublication200 = TemplatePublicationRender;
export const TemplatesRenderPublication200 = TemplatePublicationRender;
export type TemplatesRenderPublication401 = UnauthorizedError;
export const TemplatesRenderPublication401 = UnauthorizedError;
export type TemplatesRenderPublication403 = ForbiddenError;
export const TemplatesRenderPublication403 = ForbiddenError;
export type TemplatesRenderPublication404 = ResourceNotFoundError;
export const TemplatesRenderPublication404 = ResourceNotFoundError;
export type TemplatesRenderPublication409 = ConflictError;
export const TemplatesRenderPublication409 = ConflictError;
export type TemplatesRenderPublication422 = ValidationError;
export const TemplatesRenderPublication422 = ValidationError;
export type TemplatesRenderPublication500 = InternalError;
export const TemplatesRenderPublication500 = InternalError;
export type TemplatesRenderPublication504 = GatewayTimeoutError;
export const TemplatesRenderPublication504 = GatewayTimeoutError;
export type TemplatesGetGitRepositoryPathParams = { readonly id: TemplateId };
export const TemplatesGetGitRepositoryPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplatesGetGitRepository200 = {
  readonly remote: string;
  readonly defaultBranch: string;
};
export const TemplatesGetGitRepository200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    remote: Schema.String.check(
      Schema.isPattern(new RegExp("^https:\\/\\/", "u")).annotate({
        expected: "a string matching the RegExp ^https:\\/\\/",
      }),
    ),
    defaultBranch: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
      )
      .check(
        Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
      ),
  }))();
export type TemplatesGetGitRepository401 = UnauthorizedError;
export const TemplatesGetGitRepository401 = UnauthorizedError;
export type TemplatesGetGitRepository403 = ForbiddenError;
export const TemplatesGetGitRepository403 = ForbiddenError;
export type TemplatesGetGitRepository404 = ResourceNotFoundError;
export const TemplatesGetGitRepository404 = ResourceNotFoundError;
export type TemplatesGetGitRepository409 = ConflictError;
export const TemplatesGetGitRepository409 = ConflictError;
export type TemplatesGetGitRepository422 = TemplateSourceError | ValidationError;
export const TemplatesGetGitRepository422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TemplatesGetGitRepository500 = InternalError;
export const TemplatesGetGitRepository500 = InternalError;
export type TemplatesGetGitRepository504 = GatewayTimeoutError;
export const TemplatesGetGitRepository504 = GatewayTimeoutError;
export type TemplatesIssueGitCredentialPathParams = { readonly id: TemplateId };
export const TemplatesIssueGitCredentialPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplatesIssueGitCredentialRequestJson = { readonly scope: "read" | "write" };
export const TemplatesIssueGitCredentialRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ scope: Schema.Union([Schema.Literal("read"), Schema.Literal("write")]) }))();
export type TemplatesIssueGitCredential200 = {
  readonly remote: string;
  readonly username: "x-access-token";
  readonly password: string;
  readonly expiresAt: string;
};
export const TemplatesIssueGitCredential200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    remote: Schema.String.check(
      Schema.isPattern(new RegExp("^https:\\/\\/", "u")).annotate({
        expected: "a string matching the RegExp ^https:\\/\\/",
      }),
    ),
    username: Schema.Literal("x-access-token"),
    password: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
    expiresAt: Schema.String,
  }))();
export type TemplatesIssueGitCredential401 = UnauthorizedError;
export const TemplatesIssueGitCredential401 = UnauthorizedError;
export type TemplatesIssueGitCredential403 = ForbiddenError;
export const TemplatesIssueGitCredential403 = ForbiddenError;
export type TemplatesIssueGitCredential404 = ResourceNotFoundError;
export const TemplatesIssueGitCredential404 = ResourceNotFoundError;
export type TemplatesIssueGitCredential409 = ConflictError;
export const TemplatesIssueGitCredential409 = ConflictError;
export type TemplatesIssueGitCredential422 = TemplateSourceError | ValidationError;
export const TemplatesIssueGitCredential422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TemplatesIssueGitCredential500 = InternalError;
export const TemplatesIssueGitCredential500 = InternalError;
export type TemplatesIssueGitCredential504 = GatewayTimeoutError;
export const TemplatesIssueGitCredential504 = GatewayTimeoutError;
export type TemplatesOpenWorkspacePathParams = { readonly id: TemplateId };
export const TemplatesOpenWorkspacePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplatesOpenWorkspace200 = {
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
export const TemplatesOpenWorkspace200 = /* @__PURE__ */ (() =>
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
export type TemplatesOpenWorkspace401 = UnauthorizedError;
export const TemplatesOpenWorkspace401 = UnauthorizedError;
export type TemplatesOpenWorkspace403 = ForbiddenError;
export const TemplatesOpenWorkspace403 = ForbiddenError;
export type TemplatesOpenWorkspace404 = ResourceNotFoundError;
export const TemplatesOpenWorkspace404 = ResourceNotFoundError;
export type TemplatesOpenWorkspace409 = ConflictError;
export const TemplatesOpenWorkspace409 = ConflictError;
export type TemplatesOpenWorkspace422 = TemplateSourceError | ValidationError;
export const TemplatesOpenWorkspace422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TemplatesOpenWorkspace500 = InternalError;
export const TemplatesOpenWorkspace500 = InternalError;
export type TemplatesOpenWorkspace504 = GatewayTimeoutError;
export const TemplatesOpenWorkspace504 = GatewayTimeoutError;
export type TemplatesPatchWorkspacePathParams = { readonly id: TemplateId };
export const TemplatesPatchWorkspacePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplatesPatchWorkspaceHeaders = { readonly "idempotency-key": string };
export const TemplatesPatchWorkspaceHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
      )
      .check(
        Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
      ),
  }))();
export type TemplatesPatchWorkspaceRequestJson = {
  readonly expectedRevision: string;
  readonly patches: ReadonlyArray<{ readonly path: string; readonly content: string | null }>;
};
export const TemplatesPatchWorkspaceRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    expectedRevision: Schema.String,
    patches: Schema.Array(
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
        content: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(1048576).annotate({
              expected: "a string with at most 1048576 code points",
            }),
          ).check(
            Schema.isMaxLength(1048576).annotate({
              expected: "a value with a length of at most 1048576",
            }),
          ),
          Schema.Null,
        ]),
      }),
    )
      .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
      .check(
        Schema.isMaxLength(512).annotate({ expected: "a value with a length of at most 512" }),
      ),
  }))();
export type TemplatesPatchWorkspace200 = {
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
export const TemplatesPatchWorkspace200 = /* @__PURE__ */ (() =>
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
export type TemplatesPatchWorkspace401 = UnauthorizedError;
export const TemplatesPatchWorkspace401 = UnauthorizedError;
export type TemplatesPatchWorkspace403 = ForbiddenError;
export const TemplatesPatchWorkspace403 = ForbiddenError;
export type TemplatesPatchWorkspace404 = ResourceNotFoundError;
export const TemplatesPatchWorkspace404 = ResourceNotFoundError;
export type TemplatesPatchWorkspace409 = ConflictError;
export const TemplatesPatchWorkspace409 = ConflictError;
export type TemplatesPatchWorkspace422 = TemplateSourceError | ValidationError;
export const TemplatesPatchWorkspace422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TemplatesPatchWorkspace500 = InternalError;
export const TemplatesPatchWorkspace500 = InternalError;
export type TemplatesPatchWorkspace504 = GatewayTimeoutError;
export const TemplatesPatchWorkspace504 = GatewayTimeoutError;
export type TemplatesPutWorkspaceAssetPathParams = { readonly id: TemplateId };
export const TemplatesPutWorkspaceAssetPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplatesPutWorkspaceAssetHeaders = { readonly "idempotency-key": string };
export const TemplatesPutWorkspaceAssetHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
      )
      .check(
        Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
      ),
  }))();
export type TemplatesPutWorkspaceAssetRequestJson = {
  readonly expectedRevision: string;
  readonly path: string;
  readonly contentBase64: string;
  readonly replace: boolean;
};
export const TemplatesPutWorkspaceAssetRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    expectedRevision: Schema.String,
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
    contentBase64: Schema.String,
    replace: Schema.Boolean,
  }))();
export type TemplatesPutWorkspaceAsset200 = {
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
export const TemplatesPutWorkspaceAsset200 = /* @__PURE__ */ (() =>
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
export type TemplatesPutWorkspaceAsset401 = UnauthorizedError;
export const TemplatesPutWorkspaceAsset401 = UnauthorizedError;
export type TemplatesPutWorkspaceAsset403 = ForbiddenError;
export const TemplatesPutWorkspaceAsset403 = ForbiddenError;
export type TemplatesPutWorkspaceAsset404 = ResourceNotFoundError;
export const TemplatesPutWorkspaceAsset404 = ResourceNotFoundError;
export type TemplatesPutWorkspaceAsset409 = ConflictError;
export const TemplatesPutWorkspaceAsset409 = ConflictError;
export type TemplatesPutWorkspaceAsset422 = TemplateSourceError | ValidationError;
export const TemplatesPutWorkspaceAsset422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TemplatesPutWorkspaceAsset500 = InternalError;
export const TemplatesPutWorkspaceAsset500 = InternalError;
export type TemplatesPutWorkspaceAsset504 = GatewayTimeoutError;
export const TemplatesPutWorkspaceAsset504 = GatewayTimeoutError;
export type TemplatesCheckWorkspacePathParams = { readonly id: TemplateId };
export const TemplatesCheckWorkspacePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplatesCheckWorkspaceRequestJson = { readonly expectedRevision: string };
export const TemplatesCheckWorkspaceRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ expectedRevision: Schema.String }))();
export type TemplatesCheckWorkspace200 = {
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
export const TemplatesCheckWorkspace200 = /* @__PURE__ */ (() =>
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
export type TemplatesCheckWorkspace401 = UnauthorizedError;
export const TemplatesCheckWorkspace401 = UnauthorizedError;
export type TemplatesCheckWorkspace403 = ForbiddenError;
export const TemplatesCheckWorkspace403 = ForbiddenError;
export type TemplatesCheckWorkspace404 = ResourceNotFoundError;
export const TemplatesCheckWorkspace404 = ResourceNotFoundError;
export type TemplatesCheckWorkspace409 = ConflictError;
export const TemplatesCheckWorkspace409 = ConflictError;
export type TemplatesCheckWorkspace422 = TemplateSourceError | ValidationError;
export const TemplatesCheckWorkspace422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TemplatesCheckWorkspace500 = InternalError;
export const TemplatesCheckWorkspace500 = InternalError;
export type TemplatesCheckWorkspace504 = GatewayTimeoutError;
export const TemplatesCheckWorkspace504 = GatewayTimeoutError;
export type TemplatesResolveWorkspaceConflictPathParams = { readonly id: TemplateId };
export const TemplatesResolveWorkspaceConflictPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplatesResolveWorkspaceConflictHeaders = { readonly "idempotency-key": string };
export const TemplatesResolveWorkspaceConflictHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
      )
      .check(
        Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
      ),
  }))();
export type TemplatesResolveWorkspaceConflictRequestJson = {
  readonly expectedRevision: string;
  readonly path: string;
  readonly resolution: "draft" | "main" | { readonly content: string | null };
};
export const TemplatesResolveWorkspaceConflictRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    expectedRevision: Schema.String,
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
    resolution: Schema.Union([
      Schema.Literal("draft"),
      Schema.Literal("main"),
      Schema.Struct({ content: Schema.Union([Schema.String, Schema.Null]) }),
    ]),
  }))();
export type TemplatesResolveWorkspaceConflict200 = {
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
export const TemplatesResolveWorkspaceConflict200 = /* @__PURE__ */ (() =>
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
export type TemplatesResolveWorkspaceConflict401 = UnauthorizedError;
export const TemplatesResolveWorkspaceConflict401 = UnauthorizedError;
export type TemplatesResolveWorkspaceConflict403 = ForbiddenError;
export const TemplatesResolveWorkspaceConflict403 = ForbiddenError;
export type TemplatesResolveWorkspaceConflict404 = ResourceNotFoundError;
export const TemplatesResolveWorkspaceConflict404 = ResourceNotFoundError;
export type TemplatesResolveWorkspaceConflict409 = ConflictError;
export const TemplatesResolveWorkspaceConflict409 = ConflictError;
export type TemplatesResolveWorkspaceConflict422 = TemplateSourceError | ValidationError;
export const TemplatesResolveWorkspaceConflict422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TemplatesResolveWorkspaceConflict500 = InternalError;
export const TemplatesResolveWorkspaceConflict500 = InternalError;
export type TemplatesResolveWorkspaceConflict504 = GatewayTimeoutError;
export const TemplatesResolveWorkspaceConflict504 = GatewayTimeoutError;
export type TemplatesDiffWorkspacePathParams = { readonly id: TemplateId };
export const TemplatesDiffWorkspacePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplatesDiffWorkspaceRequestJson = { readonly expectedRevision: string };
export const TemplatesDiffWorkspaceRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ expectedRevision: Schema.String }))();
export type TemplatesDiffWorkspace200 = {
  readonly projectId: TemplateProjectId;
  readonly baseCommit: string;
  readonly revision: string;
  readonly changes: ReadonlyArray<{
    readonly path: string;
    readonly before: string | null;
    readonly after: string | null;
    readonly status: "added" | "modified" | "deleted";
  }>;
  readonly assetChanges: ReadonlyArray<{
    readonly path: string;
    readonly status: "added" | "modified" | "deleted";
    readonly digest: string | null;
  }>;
};
export const TemplatesDiffWorkspace200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    projectId: TemplateProjectId,
    baseCommit: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{40}$",
      }),
    ),
    revision: Schema.String,
    changes: Schema.Array(
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
        before: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(1048576).annotate({
              expected: "a string with at most 1048576 code points",
            }),
          ).check(
            Schema.isMaxLength(1048576).annotate({
              expected: "a value with a length of at most 1048576",
            }),
          ),
          Schema.Null,
        ]),
        after: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(1048576).annotate({
              expected: "a string with at most 1048576 code points",
            }),
          ).check(
            Schema.isMaxLength(1048576).annotate({
              expected: "a value with a length of at most 1048576",
            }),
          ),
          Schema.Null,
        ]),
        status: Schema.Union([
          Schema.Literal("added"),
          Schema.Literal("modified"),
          Schema.Literal("deleted"),
        ]),
      }),
    ),
    assetChanges: Schema.Array(
      Schema.Struct({
        path: Schema.String,
        status: Schema.Union([
          Schema.Literal("added"),
          Schema.Literal("modified"),
          Schema.Literal("deleted"),
        ]),
        digest: Schema.Union([
          Schema.String.check(
            Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
              expected: "a string matching the RegExp ^[a-f0-9]{64}$",
            }),
          ),
          Schema.Null,
        ]),
      }),
    ),
  }))();
export type TemplatesDiffWorkspace401 = UnauthorizedError;
export const TemplatesDiffWorkspace401 = UnauthorizedError;
export type TemplatesDiffWorkspace403 = ForbiddenError;
export const TemplatesDiffWorkspace403 = ForbiddenError;
export type TemplatesDiffWorkspace404 = ResourceNotFoundError;
export const TemplatesDiffWorkspace404 = ResourceNotFoundError;
export type TemplatesDiffWorkspace409 = ConflictError;
export const TemplatesDiffWorkspace409 = ConflictError;
export type TemplatesDiffWorkspace422 = TemplateSourceError | ValidationError;
export const TemplatesDiffWorkspace422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TemplatesDiffWorkspace500 = InternalError;
export const TemplatesDiffWorkspace500 = InternalError;
export type TemplatesDiffWorkspace504 = GatewayTimeoutError;
export const TemplatesDiffWorkspace504 = GatewayTimeoutError;
export type TemplatesRenderWorkspaceFixturePathParams = { readonly id: TemplateId };
export const TemplatesRenderWorkspaceFixturePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplatesRenderWorkspaceFixtureRequestJson = {
  readonly expectedRevision: string;
  readonly fixture: string;
};
export const TemplatesRenderWorkspaceFixtureRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    expectedRevision: Schema.String,
    fixture: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({ expected: "a string with at most 128 code points" }),
      )
      .check(
        Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" }),
      ),
  }))();
export type TemplatesRenderWorkspaceFixture200 = {
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
export const TemplatesRenderWorkspaceFixture200 = /* @__PURE__ */ (() =>
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
export type TemplatesRenderWorkspaceFixture401 = UnauthorizedError;
export const TemplatesRenderWorkspaceFixture401 = UnauthorizedError;
export type TemplatesRenderWorkspaceFixture403 = ForbiddenError;
export const TemplatesRenderWorkspaceFixture403 = ForbiddenError;
export type TemplatesRenderWorkspaceFixture404 = ResourceNotFoundError;
export const TemplatesRenderWorkspaceFixture404 = ResourceNotFoundError;
export type TemplatesRenderWorkspaceFixture409 = ConflictError;
export const TemplatesRenderWorkspaceFixture409 = ConflictError;
export type TemplatesRenderWorkspaceFixture422 = TemplateSourceError | ValidationError;
export const TemplatesRenderWorkspaceFixture422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TemplatesRenderWorkspaceFixture500 = InternalError;
export const TemplatesRenderWorkspaceFixture500 = InternalError;
export type TemplatesRenderWorkspaceFixture504 = GatewayTimeoutError;
export const TemplatesRenderWorkspaceFixture504 = GatewayTimeoutError;
export type TemplatesWorkspaceHistoryPathParams = { readonly id: TemplateId };
export const TemplatesWorkspaceHistoryPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplatesWorkspaceHistoryQuery = { readonly limit?: number | null };
export const TemplatesWorkspaceHistoryQuery = /* @__PURE__ */ (() =>
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
export type TemplatesWorkspaceHistory200 = {
  readonly projectId: TemplateProjectId;
  readonly head: string;
  readonly commits: ReadonlyArray<{
    readonly commit: string;
    readonly tree: string;
    readonly parentCommit: string | null;
    readonly message: string;
    readonly committedAt: string;
  }>;
  readonly publication: { readonly id: TemplatePublicationId; readonly commit: string } | null;
};
export const TemplatesWorkspaceHistory200 = /* @__PURE__ */ (() =>
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
    publication: Schema.Union([
      Schema.Struct({
        id: TemplatePublicationId,
        commit: Schema.String.check(
          Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-f0-9]{40}$",
          }),
        ),
      }),
      Schema.Null,
    ]),
  }))();
export type TemplatesWorkspaceHistory401 = UnauthorizedError;
export const TemplatesWorkspaceHistory401 = UnauthorizedError;
export type TemplatesWorkspaceHistory403 = ForbiddenError;
export const TemplatesWorkspaceHistory403 = ForbiddenError;
export type TemplatesWorkspaceHistory404 = ResourceNotFoundError;
export const TemplatesWorkspaceHistory404 = ResourceNotFoundError;
export type TemplatesWorkspaceHistory409 = ConflictError;
export const TemplatesWorkspaceHistory409 = ConflictError;
export type TemplatesWorkspaceHistory422 = TemplateSourceError | ValidationError;
export const TemplatesWorkspaceHistory422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TemplatesWorkspaceHistory500 = InternalError;
export const TemplatesWorkspaceHistory500 = InternalError;
export type TemplatesWorkspaceHistory504 = GatewayTimeoutError;
export const TemplatesWorkspaceHistory504 = GatewayTimeoutError;
export type TemplatesAttachWorkspaceResourcePathParams = { readonly id: TemplateId };
export const TemplatesAttachWorkspaceResourcePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplatesAttachWorkspaceResourceHeaders = { readonly "idempotency-key": string };
export const TemplatesAttachWorkspaceResourceHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
      )
      .check(
        Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
      ),
  }))();
export type TemplatesAttachWorkspaceResourceRequestJson = {
  readonly expectedRevision: string;
  readonly resource: {
    readonly resourceId: string;
    readonly name: string;
    readonly files: ReadonlyArray<{
      readonly path: string;
      readonly mediaType: string;
      readonly contentBase64: string;
    }>;
  };
};
export const TemplatesAttachWorkspaceResourceRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    expectedRevision: Schema.String,
    resource: Schema.Struct({
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
          Schema.isMaxLength(256).annotate({ expected: "a value with a length of at most 256" }),
        ),
      files: Schema.Array(
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
          mediaType: Schema.String.check(
            Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
          )
            .check(
              Schema.isMaxCodePoints(255).annotate({
                expected: "a string with at most 255 code points",
              }),
            )
            .check(
              Schema.isMaxLength(255).annotate({
                expected: "a value with a length of at most 255",
              }),
            ),
          contentBase64: Schema.String.check(
            Schema.isPattern(
              new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$", "u"),
            ).annotate({
              expected:
                "a string matching the RegExp ^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$",
            }),
          ),
        }),
      )
        .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
        .check(
          Schema.isMaxLength(32).annotate({ expected: "a value with a length of at most 32" }),
        ),
    }),
  }))();
export type TemplatesAttachWorkspaceResource200 = {
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
export const TemplatesAttachWorkspaceResource200 = /* @__PURE__ */ (() =>
  Schema.Struct({
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
        Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
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
  }))();
export type TemplatesAttachWorkspaceResource401 = UnauthorizedError;
export const TemplatesAttachWorkspaceResource401 = UnauthorizedError;
export type TemplatesAttachWorkspaceResource403 = ForbiddenError;
export const TemplatesAttachWorkspaceResource403 = ForbiddenError;
export type TemplatesAttachWorkspaceResource404 = ResourceNotFoundError;
export const TemplatesAttachWorkspaceResource404 = ResourceNotFoundError;
export type TemplatesAttachWorkspaceResource409 = ConflictError;
export const TemplatesAttachWorkspaceResource409 = ConflictError;
export type TemplatesAttachWorkspaceResource422 = TemplateSourceError | ValidationError;
export const TemplatesAttachWorkspaceResource422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TemplatesAttachWorkspaceResource500 = InternalError;
export const TemplatesAttachWorkspaceResource500 = InternalError;
export type TemplatesAttachWorkspaceResource504 = GatewayTimeoutError;
export const TemplatesAttachWorkspaceResource504 = GatewayTimeoutError;
export type TemplatesRemoveWorkspaceResourcePathParams = {
  readonly id: TemplateId;
  readonly resourceId: string;
};
export const TemplatesRemoveWorkspaceResourcePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: TemplateId,
    resourceId: Schema.String.check(
      Schema.isPattern(new RegExp("^[A-Za-z0-9._-]{1,128}$", "u")).annotate({
        expected: "a string matching the RegExp ^[A-Za-z0-9._-]{1,128}$",
      }),
    ),
  }))();
export type TemplatesRemoveWorkspaceResourceHeaders = { readonly "idempotency-key": string };
export const TemplatesRemoveWorkspaceResourceHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
      )
      .check(
        Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
      ),
  }))();
export type TemplatesRemoveWorkspaceResourceRequestJson = { readonly expectedRevision: string };
export const TemplatesRemoveWorkspaceResourceRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ expectedRevision: Schema.String }))();
export type TemplatesRemoveWorkspaceResource200 = {
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
export const TemplatesRemoveWorkspaceResource200 = /* @__PURE__ */ (() =>
  Schema.Struct({
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
        Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
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
  }))();
export type TemplatesRemoveWorkspaceResource401 = UnauthorizedError;
export const TemplatesRemoveWorkspaceResource401 = UnauthorizedError;
export type TemplatesRemoveWorkspaceResource403 = ForbiddenError;
export const TemplatesRemoveWorkspaceResource403 = ForbiddenError;
export type TemplatesRemoveWorkspaceResource404 = ResourceNotFoundError;
export const TemplatesRemoveWorkspaceResource404 = ResourceNotFoundError;
export type TemplatesRemoveWorkspaceResource409 = ConflictError;
export const TemplatesRemoveWorkspaceResource409 = ConflictError;
export type TemplatesRemoveWorkspaceResource422 = TemplateSourceError | ValidationError;
export const TemplatesRemoveWorkspaceResource422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TemplatesRemoveWorkspaceResource500 = InternalError;
export const TemplatesRemoveWorkspaceResource500 = InternalError;
export type TemplatesRemoveWorkspaceResource504 = GatewayTimeoutError;
export const TemplatesRemoveWorkspaceResource504 = GatewayTimeoutError;
export type TemplatesRestoreWorkspacePathParams = { readonly id: TemplateId };
export const TemplatesRestoreWorkspacePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplatesRestoreWorkspaceHeaders = { readonly "idempotency-key": string };
export const TemplatesRestoreWorkspaceHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
      )
      .check(
        Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
      ),
  }))();
export type TemplatesRestoreWorkspaceRequestJson = {
  readonly expectedRevision: string;
  readonly commit: string;
};
export const TemplatesRestoreWorkspaceRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    expectedRevision: Schema.String,
    commit: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-f0-9]{40}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{40}$",
      }),
    ),
  }))();
export type TemplatesRestoreWorkspace200 = {
  readonly view: {
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
  readonly source: { readonly digest: string; readonly content: string };
};
export const TemplatesRestoreWorkspace200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    view: Schema.Struct({
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
          via: Schema.Union([
            Schema.Literal("api"),
            Schema.Literal("mcp"),
            Schema.Literal("agent"),
          ]),
        }),
        updatedBy: Schema.Struct({
          userId: UserId,
          via: Schema.Union([
            Schema.Literal("api"),
            Schema.Literal("mcp"),
            Schema.Literal("agent"),
          ]),
        }),
      }),
      files: Schema.Record(Schema.String, Schema.String),
    }),
    source: Schema.Struct({
      digest: Schema.String.check(
        Schema.isPattern(new RegExp("^[a-f0-9]{64}$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-f0-9]{64}$",
        }),
      ),
      content: Schema.String.check(
        Schema.isMaxCodePoints(2097152).annotate({
          expected: "a string with at most 2097152 code points",
        }),
      ).check(
        Schema.isMaxLength(2097152).annotate({
          expected: "a value with a length of at most 2097152",
        }),
      ),
    }),
  }))();
export type TemplatesRestoreWorkspace401 = UnauthorizedError;
export const TemplatesRestoreWorkspace401 = UnauthorizedError;
export type TemplatesRestoreWorkspace403 = ForbiddenError;
export const TemplatesRestoreWorkspace403 = ForbiddenError;
export type TemplatesRestoreWorkspace404 = ResourceNotFoundError;
export const TemplatesRestoreWorkspace404 = ResourceNotFoundError;
export type TemplatesRestoreWorkspace409 = ConflictError;
export const TemplatesRestoreWorkspace409 = ConflictError;
export type TemplatesRestoreWorkspace422 = TemplateSourceError | ValidationError;
export const TemplatesRestoreWorkspace422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TemplatesRestoreWorkspace500 = InternalError;
export const TemplatesRestoreWorkspace500 = InternalError;
export type TemplatesRestoreWorkspace504 = GatewayTimeoutError;
export const TemplatesRestoreWorkspace504 = GatewayTimeoutError;
export type TemplatesSaveWorkspacePathParams = { readonly id: TemplateId };
export const TemplatesSaveWorkspacePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplatesSaveWorkspaceHeaders = { readonly "idempotency-key": string };
export const TemplatesSaveWorkspaceHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
      )
      .check(
        Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
      ),
  }))();
export type TemplatesSaveWorkspaceRequestJson = {
  readonly expectedRevision: string;
  readonly expectedHead: string;
  readonly message: string;
};
export const TemplatesSaveWorkspaceRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    expectedRevision: Schema.String,
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
export type TemplatesSaveWorkspace200 = {
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
export const TemplatesSaveWorkspace200 = /* @__PURE__ */ (() =>
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
export type TemplatesSaveWorkspace401 = UnauthorizedError;
export const TemplatesSaveWorkspace401 = UnauthorizedError;
export type TemplatesSaveWorkspace403 = ForbiddenError;
export const TemplatesSaveWorkspace403 = ForbiddenError;
export type TemplatesSaveWorkspace404 = ResourceNotFoundError;
export const TemplatesSaveWorkspace404 = ResourceNotFoundError;
export type TemplatesSaveWorkspace409 = ConflictError;
export const TemplatesSaveWorkspace409 = ConflictError;
export type TemplatesSaveWorkspace422 = TemplateSourceError | ValidationError;
export const TemplatesSaveWorkspace422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TemplatesSaveWorkspace500 = InternalError;
export const TemplatesSaveWorkspace500 = InternalError;
export type TemplatesSaveWorkspace504 = GatewayTimeoutError;
export const TemplatesSaveWorkspace504 = GatewayTimeoutError;
export type TemplatesListFamiliesQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
};
export const TemplatesListFamiliesQuery = /* @__PURE__ */ (() =>
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
export type TemplatesListFamilies200 = TemplateFamilyPage;
export const TemplatesListFamilies200 = TemplateFamilyPage;
export type TemplatesListFamilies401 = UnauthorizedError;
export const TemplatesListFamilies401 = UnauthorizedError;
export type TemplatesListFamilies403 = ForbiddenError;
export const TemplatesListFamilies403 = ForbiddenError;
export type TemplatesListFamilies422 = ValidationError;
export const TemplatesListFamilies422 = ValidationError;
export type TemplatesListFamilies500 = InternalError;
export const TemplatesListFamilies500 = InternalError;
export type TemplatesListFamilies504 = GatewayTimeoutError;
export const TemplatesListFamilies504 = GatewayTimeoutError;
export type TemplatesCreateFamilyRequestJson = { readonly name: string };
export const TemplatesCreateFamilyRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
  }))();
export type TemplatesCreateFamily201 = TemplateFamily;
export const TemplatesCreateFamily201 = TemplateFamily;
export type TemplatesCreateFamily401 = UnauthorizedError;
export const TemplatesCreateFamily401 = UnauthorizedError;
export type TemplatesCreateFamily403 = ForbiddenError;
export const TemplatesCreateFamily403 = ForbiddenError;
export type TemplatesCreateFamily422 = ValidationError;
export const TemplatesCreateFamily422 = ValidationError;
export type TemplatesCreateFamily500 = InternalError;
export const TemplatesCreateFamily500 = InternalError;
export type TemplatesCreateFamily504 = GatewayTimeoutError;
export const TemplatesCreateFamily504 = GatewayTimeoutError;
export type TemplatesGetFamilyPathParams = { readonly id: TemplateFamilyId };
export const TemplatesGetFamilyPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateFamilyId }))();
export type TemplatesGetFamily200 = TemplateFamily;
export const TemplatesGetFamily200 = TemplateFamily;
export type TemplatesGetFamily401 = UnauthorizedError;
export const TemplatesGetFamily401 = UnauthorizedError;
export type TemplatesGetFamily403 = ForbiddenError;
export const TemplatesGetFamily403 = ForbiddenError;
export type TemplatesGetFamily404 = ResourceNotFoundError;
export const TemplatesGetFamily404 = ResourceNotFoundError;
export type TemplatesGetFamily422 = ValidationError;
export const TemplatesGetFamily422 = ValidationError;
export type TemplatesGetFamily500 = InternalError;
export const TemplatesGetFamily500 = InternalError;
export type TemplatesGetFamily504 = GatewayTimeoutError;
export const TemplatesGetFamily504 = GatewayTimeoutError;
export type TemplatesDeleteFamilyPathParams = { readonly id: TemplateFamilyId };
export const TemplatesDeleteFamilyPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateFamilyId }))();
export type TemplatesDeleteFamily200 = SuccessResponse;
export const TemplatesDeleteFamily200 = SuccessResponse;
export type TemplatesDeleteFamily401 = UnauthorizedError;
export const TemplatesDeleteFamily401 = UnauthorizedError;
export type TemplatesDeleteFamily403 = ForbiddenError;
export const TemplatesDeleteFamily403 = ForbiddenError;
export type TemplatesDeleteFamily404 = ResourceNotFoundError;
export const TemplatesDeleteFamily404 = ResourceNotFoundError;
export type TemplatesDeleteFamily422 = ValidationError;
export const TemplatesDeleteFamily422 = ValidationError;
export type TemplatesDeleteFamily500 = InternalError;
export const TemplatesDeleteFamily500 = InternalError;
export type TemplatesDeleteFamily504 = GatewayTimeoutError;
export const TemplatesDeleteFamily504 = GatewayTimeoutError;
export type TemplatesRenameFamilyPathParams = { readonly id: TemplateFamilyId };
export const TemplatesRenameFamilyPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateFamilyId }))();
export type TemplatesRenameFamilyRequestJson = { readonly name: string };
export const TemplatesRenameFamilyRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
  }))();
export type TemplatesRenameFamily200 = TemplateFamily;
export const TemplatesRenameFamily200 = TemplateFamily;
export type TemplatesRenameFamily401 = UnauthorizedError;
export const TemplatesRenameFamily401 = UnauthorizedError;
export type TemplatesRenameFamily403 = ForbiddenError;
export const TemplatesRenameFamily403 = ForbiddenError;
export type TemplatesRenameFamily404 = ResourceNotFoundError;
export const TemplatesRenameFamily404 = ResourceNotFoundError;
export type TemplatesRenameFamily422 = ValidationError;
export const TemplatesRenameFamily422 = ValidationError;
export type TemplatesRenameFamily500 = InternalError;
export const TemplatesRenameFamily500 = InternalError;
export type TemplatesRenameFamily504 = GatewayTimeoutError;
export const TemplatesRenameFamily504 = GatewayTimeoutError;
export type TemplatesAttachFamilyMemberPathParams = {
  readonly id: TemplateFamilyId;
  readonly templateId: TemplateId;
};
export const TemplatesAttachFamilyMemberPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateFamilyId, templateId: TemplateId }))();
export type TemplatesAttachFamilyMember200 = TemplateFamily;
export const TemplatesAttachFamilyMember200 = TemplateFamily;
export type TemplatesAttachFamilyMember401 = UnauthorizedError;
export const TemplatesAttachFamilyMember401 = UnauthorizedError;
export type TemplatesAttachFamilyMember403 = ForbiddenError;
export const TemplatesAttachFamilyMember403 = ForbiddenError;
export type TemplatesAttachFamilyMember404 = ResourceNotFoundError;
export const TemplatesAttachFamilyMember404 = ResourceNotFoundError;
export type TemplatesAttachFamilyMember409 = ConflictError;
export const TemplatesAttachFamilyMember409 = ConflictError;
export type TemplatesAttachFamilyMember422 = ValidationError;
export const TemplatesAttachFamilyMember422 = ValidationError;
export type TemplatesAttachFamilyMember500 = InternalError;
export const TemplatesAttachFamilyMember500 = InternalError;
export type TemplatesAttachFamilyMember504 = GatewayTimeoutError;
export const TemplatesAttachFamilyMember504 = GatewayTimeoutError;
export type TemplatesDetachFamilyMemberPathParams = {
  readonly id: TemplateFamilyId;
  readonly templateId: TemplateId;
};
export const TemplatesDetachFamilyMemberPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateFamilyId, templateId: TemplateId }))();
export type TemplatesDetachFamilyMember200 = TemplateFamily;
export const TemplatesDetachFamilyMember200 = TemplateFamily;
export type TemplatesDetachFamilyMember401 = UnauthorizedError;
export const TemplatesDetachFamilyMember401 = UnauthorizedError;
export type TemplatesDetachFamilyMember403 = ForbiddenError;
export const TemplatesDetachFamilyMember403 = ForbiddenError;
export type TemplatesDetachFamilyMember404 = ResourceNotFoundError;
export const TemplatesDetachFamilyMember404 = ResourceNotFoundError;
export type TemplatesDetachFamilyMember409 = ConflictError;
export const TemplatesDetachFamilyMember409 = ConflictError;
export type TemplatesDetachFamilyMember422 = ValidationError;
export const TemplatesDetachFamilyMember422 = ValidationError;
export type TemplatesDetachFamilyMember500 = InternalError;
export const TemplatesDetachFamilyMember500 = InternalError;
export type TemplatesDetachFamilyMember504 = GatewayTimeoutError;
export const TemplatesDetachFamilyMember504 = GatewayTimeoutError;
export type TemplatesCreateFamilyFromTemplatePathParams = { readonly templateId: TemplateId };
export const TemplatesCreateFamilyFromTemplatePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ templateId: TemplateId }))();
export type TemplatesCreateFamilyFromTemplateRequestJson = { readonly name: string };
export const TemplatesCreateFamilyFromTemplateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
  }))();
export type TemplatesCreateFamilyFromTemplate201 = TemplateFamily;
export const TemplatesCreateFamilyFromTemplate201 = TemplateFamily;
export type TemplatesCreateFamilyFromTemplate401 = UnauthorizedError;
export const TemplatesCreateFamilyFromTemplate401 = UnauthorizedError;
export type TemplatesCreateFamilyFromTemplate403 = ForbiddenError;
export const TemplatesCreateFamilyFromTemplate403 = ForbiddenError;
export type TemplatesCreateFamilyFromTemplate404 = ResourceNotFoundError;
export const TemplatesCreateFamilyFromTemplate404 = ResourceNotFoundError;
export type TemplatesCreateFamilyFromTemplate409 = ConflictError;
export const TemplatesCreateFamilyFromTemplate409 = ConflictError;
export type TemplatesCreateFamilyFromTemplate422 = ValidationError;
export const TemplatesCreateFamilyFromTemplate422 = ValidationError;
export type TemplatesCreateFamilyFromTemplate500 = InternalError;
export const TemplatesCreateFamilyFromTemplate500 = InternalError;
export type TemplatesCreateFamilyFromTemplate504 = GatewayTimeoutError;
export const TemplatesCreateFamilyFromTemplate504 = GatewayTimeoutError;
export type TemplatesCreateFromWebsiteHeaders = { readonly "idempotency-key": string };
export const TemplatesCreateFromWebsiteHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
      )
      .check(
        Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
      ),
  }))();
export type TemplatesCreateFromWebsiteRequestJson = {
  readonly url: string;
  readonly name?: string | null;
  readonly namespaceId?: NamespaceId | null;
};
export const TemplatesCreateFromWebsiteRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    url: Schema.String.annotate({
      description:
        "The website whose look the template should match: a public https address, or a bare domain such as `example.com`.",
    })
      .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
      .check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      )
      .check(
        Schema.isMaxLength(2048).annotate({ expected: "a value with a length of at most 2048" }),
      ),
    name: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        )
          .check(
            Schema.isMaxCodePoints(200).annotate({
              expected: "a string with at most 200 code points",
            }),
          )
          .check(
            Schema.isMaxLength(200).annotate({ expected: "a value with a length of at most 200" }),
          ),
        Schema.Null,
      ]),
    ),
    namespaceId: Schema.optionalKey(
      Schema.Union([NamespaceId, Schema.Null]).annotate({
        description:
          "The namespace the new template project belongs to. Omit for organization level. A namespace-scoped key always creates in its own namespace.",
      }),
    ),
  }))();
export type TemplatesCreateFromWebsite201 = TemplateFromWebsite;
export const TemplatesCreateFromWebsite201 = TemplateFromWebsite;
export type TemplatesCreateFromWebsite401 = UnauthorizedError;
export const TemplatesCreateFromWebsite401 = UnauthorizedError;
export type TemplatesCreateFromWebsite403 = ForbiddenError;
export const TemplatesCreateFromWebsite403 = ForbiddenError;
export type TemplatesCreateFromWebsite404 = ResourceNotFoundError;
export const TemplatesCreateFromWebsite404 = ResourceNotFoundError;
export type TemplatesCreateFromWebsite409 = ConflictError;
export const TemplatesCreateFromWebsite409 = ConflictError;
export type TemplatesCreateFromWebsite422 = TemplateSourceError | ValidationError;
export const TemplatesCreateFromWebsite422 = /* @__PURE__ */ (() =>
  Schema.Union([TemplateSourceError, ValidationError]))();
export type TemplatesCreateFromWebsite500 = InternalError;
export const TemplatesCreateFromWebsite500 = InternalError;
export type TemplatesCreateFromWebsite504 = GatewayTimeoutError;
export const TemplatesCreateFromWebsite504 = GatewayTimeoutError;
export type TemplatesAddEntryPathParams = { readonly id: TemplateProjectId };
export const TemplatesAddEntryPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateProjectId }))();
export type TemplatesAddEntryRequestJson = {
  readonly entryPath: string;
  readonly name: string;
  readonly slug: string;
  readonly description?: string | null;
  readonly category?:
    | "transactional"
    | "marketing"
    | "support"
    | "notification"
    | "verification"
    | "reminder"
    | "alert"
    | null;
};
export const TemplatesAddEntryRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    entryPath: Schema.String.check(
      Schema.isMaxCodePoints(1024).annotate({ expected: "a string with at most 1024 code points" }),
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
    name: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(200).annotate({ expected: "a string with at most 200 code points" }),
      )
      .check(
        Schema.isMaxLength(200).annotate({ expected: "a value with a length of at most 200" }),
      ),
    slug: Schema.String.check(
      Schema.isPattern(new RegExp("^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
        expected: "a string matching the RegExp ^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$",
      }),
    ),
    description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    category: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Literal("transactional"),
          Schema.Literal("marketing"),
          Schema.Literal("support"),
          Schema.Literal("notification"),
          Schema.Literal("verification"),
          Schema.Literal("reminder"),
          Schema.Literal("alert"),
        ]),
        Schema.Null,
      ]),
    ),
  }))();
export type TemplatesAddEntry201 = Template;
export const TemplatesAddEntry201 = Template;
export type TemplatesAddEntry401 = UnauthorizedError;
export const TemplatesAddEntry401 = UnauthorizedError;
export type TemplatesAddEntry403 = ForbiddenError;
export const TemplatesAddEntry403 = ForbiddenError;
export type TemplatesAddEntry404 = ResourceNotFoundError;
export const TemplatesAddEntry404 = ResourceNotFoundError;
export type TemplatesAddEntry409 = ConflictError;
export const TemplatesAddEntry409 = ConflictError;
export type TemplatesAddEntry422 = ValidationError;
export const TemplatesAddEntry422 = ValidationError;
export type TemplatesAddEntry500 = InternalError;
export const TemplatesAddEntry500 = InternalError;
export type TemplatesAddEntry504 = GatewayTimeoutError;
export const TemplatesAddEntry504 = GatewayTimeoutError;

export class TemplatesGroup extends HttpApiGroup.make("Templates")
  .add(
    HttpApiEndpoint.get("templatesList", "/v1/templates", {
      query: TemplatesListQuery,
      success: TemplatesList200,
      error: [
        TemplatesList401.pipe(HttpApiSchema.status(401)),
        TemplatesList403.pipe(HttpApiSchema.status(403)),
        TemplatesList422.pipe(HttpApiSchema.status(422)),
        TemplatesList500,
        TemplatesList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.list")
      .annotate(OpenApi.Summary, "List templates")
      .annotate(
        OpenApi.Description,
        "Returns template summaries, newest first, filterable by category, channel, status, project, and search. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page. Read a template's compiled content, current publication, and input schema with `GET /v1/templates/{id}`.",
      ),
    HttpApiEndpoint.post("templatesCreate", "/v1/templates", {
      headers: TemplatesCreateHeaders,
      payload: TemplatesCreateRequestJson,
      success: TemplatesCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        TemplatesCreate401.pipe(HttpApiSchema.status(401)),
        TemplatesCreate403.pipe(HttpApiSchema.status(403)),
        TemplatesCreate404.pipe(HttpApiSchema.status(404)),
        TemplatesCreate409.pipe(HttpApiSchema.status(409)),
        TemplatesCreate422.pipe(HttpApiSchema.status(422)),
        TemplatesCreate500,
        TemplatesCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.create")
      .annotate(OpenApi.Summary, "Create a template")
      .annotate(
        OpenApi.Description,
        "Creates an email template project from Samva's canonical TSX starter and returns its template entry with status 201.",
      ),
    HttpApiEndpoint.get("templatesGetById", "/v1/templates/:id", {
      params: TemplatesGetByIdPathParams,
      success: TemplatesGetById200,
      error: [
        TemplatesGetById401.pipe(HttpApiSchema.status(401)),
        TemplatesGetById403.pipe(HttpApiSchema.status(403)),
        TemplatesGetById404.pipe(HttpApiSchema.status(404)),
        TemplatesGetById422.pipe(HttpApiSchema.status(422)),
        TemplatesGetById500,
        TemplatesGetById504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.getById")
      .annotate(OpenApi.Summary, "Get a template")
      .annotate(
        OpenApi.Description,
        "Returns the template with its project entry path, delivery defaults, compiled channel content, current publication, and the input schema that publication validates against. Open live project files through the workspace API.",
      ),
    HttpApiEndpoint.delete("templatesRemove", "/v1/templates/:id", {
      params: TemplatesRemovePathParams,
      success: TemplatesRemove200,
      error: [
        TemplatesRemove401.pipe(HttpApiSchema.status(401)),
        TemplatesRemove403.pipe(HttpApiSchema.status(403)),
        TemplatesRemove404.pipe(HttpApiSchema.status(404)),
        TemplatesRemove422.pipe(HttpApiSchema.status(422)),
        TemplatesRemove500,
        TemplatesRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.remove")
      .annotate(OpenApi.Summary, "Delete a template")
      .annotate(
        OpenApi.Description,
        "Deletes a template from the organization and returns a success flag.",
      ),
    HttpApiEndpoint.patch("templatesUpdate", "/v1/templates/:id", {
      params: TemplatesUpdatePathParams,
      payload: TemplatesUpdateRequestJson,
      success: TemplatesUpdate200,
      error: [
        TemplatesUpdate401.pipe(HttpApiSchema.status(401)),
        TemplatesUpdate403.pipe(HttpApiSchema.status(403)),
        TemplatesUpdate404.pipe(HttpApiSchema.status(404)),
        TemplatesUpdate409.pipe(HttpApiSchema.status(409)),
        TemplatesUpdate422.pipe(HttpApiSchema.status(422)),
        TemplatesUpdate500,
        TemplatesUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.update")
      .annotate(OpenApi.Summary, "Update a template")
      .annotate(
        OpenApi.Description,
        "Updates template metadata. Setting `entryPath` points the template at another file in its project and keeps its id, slug, and publications; move the file in Git separately. Source changes use the project workspace API.",
      ),
    HttpApiEndpoint.get("templatesListInputContracts", "/v1/templates/:id/input-contracts", {
      params: TemplatesListInputContractsPathParams,
      query: TemplatesListInputContractsQuery,
      success: TemplatesListInputContracts200,
      error: [
        TemplatesListInputContracts401.pipe(HttpApiSchema.status(401)),
        TemplatesListInputContracts403.pipe(HttpApiSchema.status(403)),
        TemplatesListInputContracts404.pipe(HttpApiSchema.status(404)),
        TemplatesListInputContracts422.pipe(HttpApiSchema.status(422)),
        TemplatesListInputContracts500,
        TemplatesListInputContracts504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.listInputContracts")
      .annotate(OpenApi.Summary, "List a template's input contracts")
      .annotate(
        OpenApi.Description,
        "Returns the immutable input contracts this template has published under, newest version first. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page. Send against a contract to follow later publications that validate input identically.",
      ),
    HttpApiEndpoint.get(
      "templatesGetInputContract",
      "/v1/templates/:id/input-contracts/:inputContractId",
      {
        params: TemplatesGetInputContractPathParams,
        success: TemplatesGetInputContract200,
        error: [
          TemplatesGetInputContract401.pipe(HttpApiSchema.status(401)),
          TemplatesGetInputContract403.pipe(HttpApiSchema.status(403)),
          TemplatesGetInputContract404.pipe(HttpApiSchema.status(404)),
          TemplatesGetInputContract422.pipe(HttpApiSchema.status(422)),
          TemplatesGetInputContract500,
          TemplatesGetInputContract504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.getInputContract")
      .annotate(OpenApi.Summary, "Get a template input contract")
      .annotate(
        OpenApi.Description,
        "Returns one immutable input contract and the published schema it validates against.",
      ),
    HttpApiEndpoint.post("templatesPublish", "/v1/templates/:id/publications", {
      params: TemplatesPublishPathParams,
      payload: TemplatesPublishRequestJson,
      success: TemplatesPublish201.pipe(HttpApiSchema.status(201)),
      error: [
        TemplatesPublish401.pipe(HttpApiSchema.status(401)),
        TemplatesPublish403.pipe(HttpApiSchema.status(403)),
        TemplatesPublish404.pipe(HttpApiSchema.status(404)),
        TemplatesPublish409.pipe(HttpApiSchema.status(409)),
        TemplatesPublish422.pipe(HttpApiSchema.status(422)),
        TemplatesPublish500,
        TemplatesPublish504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.publish")
      .annotate(OpenApi.Summary, "Publish an exact template commit")
      .annotate(
        OpenApi.Description,
        "Builds an exact Git commit and entry path, stores the immutable compiled template and its assets, records the input contract it validates against, and makes that publication current. A commit that compiles to the same build as an existing publication makes that publication current again instead of recording another.",
      ),
    HttpApiEndpoint.get(
      "templatesGetPublication",
      "/v1/templates/:id/publications/:publicationId",
      {
        params: TemplatesGetPublicationPathParams,
        success: TemplatesGetPublication200,
        error: [
          TemplatesGetPublication401.pipe(HttpApiSchema.status(401)),
          TemplatesGetPublication403.pipe(HttpApiSchema.status(403)),
          TemplatesGetPublication404.pipe(HttpApiSchema.status(404)),
          TemplatesGetPublication422.pipe(HttpApiSchema.status(422)),
          TemplatesGetPublication500,
          TemplatesGetPublication504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.getPublication")
      .annotate(OpenApi.Summary, "Get a template publication")
      .annotate(
        OpenApi.Description,
        "Returns one immutable publication and its exact build receipt.",
      ),
    HttpApiEndpoint.post(
      "templatesRenderPublication",
      "/v1/templates/:id/publications/:publicationId/render",
      {
        params: TemplatesRenderPublicationPathParams,
        payload: TemplatesRenderPublicationRequestJson,
        success: TemplatesRenderPublication200,
        error: [
          TemplatesRenderPublication401.pipe(HttpApiSchema.status(401)),
          TemplatesRenderPublication403.pipe(HttpApiSchema.status(403)),
          TemplatesRenderPublication404.pipe(HttpApiSchema.status(404)),
          TemplatesRenderPublication409.pipe(HttpApiSchema.status(409)),
          TemplatesRenderPublication422.pipe(HttpApiSchema.status(422)),
          TemplatesRenderPublication500,
          TemplatesRenderPublication504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.renderPublication")
      .annotate(OpenApi.Summary, "Render a template publication")
      .annotate(
        OpenApi.Description,
        "Renders one immutable publication against the `data` you pass, formatted in the `locale` and `timeZone` you name as a send formats them, and returns the subject, preheader, HTML and plain text a send would produce. `data` is validated against the publication's input schema exactly as a send validates it; invalid input returns a validation error that names each failing field. Nothing is sent or stored. Unpublished workspace edits are never rendered: only a publication id renders.",
      ),
    HttpApiEndpoint.get("templatesGetGitRepository", "/v1/templates/:id/repository", {
      params: TemplatesGetGitRepositoryPathParams,
      success: TemplatesGetGitRepository200,
      error: [
        TemplatesGetGitRepository401.pipe(HttpApiSchema.status(401)),
        TemplatesGetGitRepository403.pipe(HttpApiSchema.status(403)),
        TemplatesGetGitRepository404.pipe(HttpApiSchema.status(404)),
        TemplatesGetGitRepository409.pipe(HttpApiSchema.status(409)),
        TemplatesGetGitRepository422.pipe(HttpApiSchema.status(422)),
        TemplatesGetGitRepository500,
        TemplatesGetGitRepository504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.getGitRepository")
      .annotate(OpenApi.Summary, "Get a template project Git repository")
      .annotate(
        OpenApi.Description,
        "Returns the credential-free HTTPS remote and default branch for the template project repository.",
      ),
    HttpApiEndpoint.post(
      "templatesIssueGitCredential",
      "/v1/templates/:id/repository/credentials",
      {
        params: TemplatesIssueGitCredentialPathParams,
        payload: TemplatesIssueGitCredentialRequestJson,
        success: TemplatesIssueGitCredential200,
        error: [
          TemplatesIssueGitCredential401.pipe(HttpApiSchema.status(401)),
          TemplatesIssueGitCredential403.pipe(HttpApiSchema.status(403)),
          TemplatesIssueGitCredential404.pipe(HttpApiSchema.status(404)),
          TemplatesIssueGitCredential409.pipe(HttpApiSchema.status(409)),
          TemplatesIssueGitCredential422.pipe(HttpApiSchema.status(422)),
          TemplatesIssueGitCredential500,
          TemplatesIssueGitCredential504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.issueGitCredential")
      .annotate(OpenApi.Summary, "Issue a template project Git credential")
      .annotate(
        OpenApi.Description,
        "Exchanges the caller's Samva authorization for a one-hour Git credential scoped to the template repository.",
      ),
    HttpApiEndpoint.post("templatesOpenWorkspace", "/v1/templates/:id/workspace", {
      params: TemplatesOpenWorkspacePathParams,
      success: TemplatesOpenWorkspace200,
      error: [
        TemplatesOpenWorkspace401.pipe(HttpApiSchema.status(401)),
        TemplatesOpenWorkspace403.pipe(HttpApiSchema.status(403)),
        TemplatesOpenWorkspace404.pipe(HttpApiSchema.status(404)),
        TemplatesOpenWorkspace409.pipe(HttpApiSchema.status(409)),
        TemplatesOpenWorkspace422.pipe(HttpApiSchema.status(422)),
        TemplatesOpenWorkspace500,
        TemplatesOpenWorkspace504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.openWorkspace")
      .annotate(OpenApi.Summary, "Open a template project workspace")
      .annotate(
        OpenApi.Description,
        "Creates or opens the shared project workspace at the latest saved version and returns its effective files.",
      ),
    HttpApiEndpoint.patch("templatesPatchWorkspace", "/v1/templates/:id/workspace", {
      params: TemplatesPatchWorkspacePathParams,
      headers: TemplatesPatchWorkspaceHeaders,
      payload: TemplatesPatchWorkspaceRequestJson,
      success: TemplatesPatchWorkspace200,
      error: [
        TemplatesPatchWorkspace401.pipe(HttpApiSchema.status(401)),
        TemplatesPatchWorkspace403.pipe(HttpApiSchema.status(403)),
        TemplatesPatchWorkspace404.pipe(HttpApiSchema.status(404)),
        TemplatesPatchWorkspace409.pipe(HttpApiSchema.status(409)),
        TemplatesPatchWorkspace422.pipe(HttpApiSchema.status(422)),
        TemplatesPatchWorkspace500,
        TemplatesPatchWorkspace504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.patchWorkspace")
      .annotate(OpenApi.Summary, "Patch template project files")
      .annotate(
        OpenApi.Description,
        "Applies revision-checked file patches to the shared project workspace overlay.",
      ),
    HttpApiEndpoint.put("templatesPutWorkspaceAsset", "/v1/templates/:id/workspace/assets", {
      params: TemplatesPutWorkspaceAssetPathParams,
      headers: TemplatesPutWorkspaceAssetHeaders,
      payload: TemplatesPutWorkspaceAssetRequestJson,
      success: TemplatesPutWorkspaceAsset200,
      error: [
        TemplatesPutWorkspaceAsset401.pipe(HttpApiSchema.status(401)),
        TemplatesPutWorkspaceAsset403.pipe(HttpApiSchema.status(403)),
        TemplatesPutWorkspaceAsset404.pipe(HttpApiSchema.status(404)),
        TemplatesPutWorkspaceAsset409.pipe(HttpApiSchema.status(409)),
        TemplatesPutWorkspaceAsset422.pipe(HttpApiSchema.status(422)),
        TemplatesPutWorkspaceAsset500,
        TemplatesPutWorkspaceAsset504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.putWorkspaceAsset")
      .annotate(OpenApi.Summary, "Put a template project asset")
      .annotate(
        OpenApi.Description,
        "Writes one image or font (png, jpg, jpeg, gif, webp, or woff2) into the shared project workspace as an unsaved file; Save commits it. The JSON body carries the file as canonical base64 in `contentBase64`, at most 1 MiB decoded, and the bytes must match the extension in `path`. `replace` must be `false` to add a new file and `true` to change an existing one.",
      ),
    HttpApiEndpoint.post("templatesCheckWorkspace", "/v1/templates/:id/workspace/check", {
      params: TemplatesCheckWorkspacePathParams,
      payload: TemplatesCheckWorkspaceRequestJson,
      success: TemplatesCheckWorkspace200,
      error: [
        TemplatesCheckWorkspace401.pipe(HttpApiSchema.status(401)),
        TemplatesCheckWorkspace403.pipe(HttpApiSchema.status(403)),
        TemplatesCheckWorkspace404.pipe(HttpApiSchema.status(404)),
        TemplatesCheckWorkspace409.pipe(HttpApiSchema.status(409)),
        TemplatesCheckWorkspace422.pipe(HttpApiSchema.status(422)),
        TemplatesCheckWorkspace500,
        TemplatesCheckWorkspace504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.checkWorkspace")
      .annotate(OpenApi.Summary, "Check a template project workspace")
      .annotate(
        OpenApi.Description,
        "Builds the template entry from the current effective workspace tree, including unsaved file patches, and returns what the template declares plus every compile and target-client finding. Nothing is written and no message is rendered.",
      ),
    HttpApiEndpoint.post(
      "templatesResolveWorkspaceConflict",
      "/v1/templates/:id/workspace/conflicts",
      {
        params: TemplatesResolveWorkspaceConflictPathParams,
        headers: TemplatesResolveWorkspaceConflictHeaders,
        payload: TemplatesResolveWorkspaceConflictRequestJson,
        success: TemplatesResolveWorkspaceConflict200,
        error: [
          TemplatesResolveWorkspaceConflict401.pipe(HttpApiSchema.status(401)),
          TemplatesResolveWorkspaceConflict403.pipe(HttpApiSchema.status(403)),
          TemplatesResolveWorkspaceConflict404.pipe(HttpApiSchema.status(404)),
          TemplatesResolveWorkspaceConflict409.pipe(HttpApiSchema.status(409)),
          TemplatesResolveWorkspaceConflict422.pipe(HttpApiSchema.status(422)),
          TemplatesResolveWorkspaceConflict500,
          TemplatesResolveWorkspaceConflict504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.resolveWorkspaceConflict")
      .annotate(OpenApi.Summary, "Resolve a template workspace conflict")
      .annotate(
        OpenApi.Description,
        "Resolves one conflicted file by keeping the draft, using main, or supplying edited source.",
      ),
    HttpApiEndpoint.post("templatesDiffWorkspace", "/v1/templates/:id/workspace/diff", {
      params: TemplatesDiffWorkspacePathParams,
      payload: TemplatesDiffWorkspaceRequestJson,
      success: TemplatesDiffWorkspace200,
      error: [
        TemplatesDiffWorkspace401.pipe(HttpApiSchema.status(401)),
        TemplatesDiffWorkspace403.pipe(HttpApiSchema.status(403)),
        TemplatesDiffWorkspace404.pipe(HttpApiSchema.status(404)),
        TemplatesDiffWorkspace409.pipe(HttpApiSchema.status(409)),
        TemplatesDiffWorkspace422.pipe(HttpApiSchema.status(422)),
        TemplatesDiffWorkspace500,
        TemplatesDiffWorkspace504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.diffWorkspace")
      .annotate(OpenApi.Summary, "Diff a template project workspace")
      .annotate(
        OpenApi.Description,
        "Returns exact added, modified, and deleted project files against the current Git base commit.",
      ),
    HttpApiEndpoint.post(
      "templatesRenderWorkspaceFixture",
      "/v1/templates/:id/workspace/fixtures",
      {
        params: TemplatesRenderWorkspaceFixturePathParams,
        payload: TemplatesRenderWorkspaceFixtureRequestJson,
        success: TemplatesRenderWorkspaceFixture200,
        error: [
          TemplatesRenderWorkspaceFixture401.pipe(HttpApiSchema.status(401)),
          TemplatesRenderWorkspaceFixture403.pipe(HttpApiSchema.status(403)),
          TemplatesRenderWorkspaceFixture404.pipe(HttpApiSchema.status(404)),
          TemplatesRenderWorkspaceFixture409.pipe(HttpApiSchema.status(409)),
          TemplatesRenderWorkspaceFixture422.pipe(HttpApiSchema.status(422)),
          TemplatesRenderWorkspaceFixture500,
          TemplatesRenderWorkspaceFixture504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.renderWorkspaceFixture")
      .annotate(OpenApi.Summary, "Render a declared template workspace fixture")
      .annotate(
        OpenApi.Description,
        "Renders one of the named inputs the template declares against the current effective workspace tree. Only declared fixtures render here; arbitrary input renders against a publication.",
      ),
    HttpApiEndpoint.get("templatesWorkspaceHistory", "/v1/templates/:id/workspace/history", {
      params: TemplatesWorkspaceHistoryPathParams,
      query: TemplatesWorkspaceHistoryQuery,
      success: TemplatesWorkspaceHistory200,
      error: [
        TemplatesWorkspaceHistory401.pipe(HttpApiSchema.status(401)),
        TemplatesWorkspaceHistory403.pipe(HttpApiSchema.status(403)),
        TemplatesWorkspaceHistory404.pipe(HttpApiSchema.status(404)),
        TemplatesWorkspaceHistory409.pipe(HttpApiSchema.status(409)),
        TemplatesWorkspaceHistory422.pipe(HttpApiSchema.status(422)),
        TemplatesWorkspaceHistory500,
        TemplatesWorkspaceHistory504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.workspaceHistory")
      .annotate(OpenApi.Summary, "List template project commit history")
      .annotate(
        OpenApi.Description,
        "Returns recent history from the template repository's default branch.",
      ),
    HttpApiEndpoint.post(
      "templatesAttachWorkspaceResource",
      "/v1/templates/:id/workspace/resources",
      {
        params: TemplatesAttachWorkspaceResourcePathParams,
        headers: TemplatesAttachWorkspaceResourceHeaders,
        payload: TemplatesAttachWorkspaceResourceRequestJson,
        success: TemplatesAttachWorkspaceResource200,
        error: [
          TemplatesAttachWorkspaceResource401.pipe(HttpApiSchema.status(401)),
          TemplatesAttachWorkspaceResource403.pipe(HttpApiSchema.status(403)),
          TemplatesAttachWorkspaceResource404.pipe(HttpApiSchema.status(404)),
          TemplatesAttachWorkspaceResource409.pipe(HttpApiSchema.status(409)),
          TemplatesAttachWorkspaceResource422.pipe(HttpApiSchema.status(422)),
          TemplatesAttachWorkspaceResource500,
          TemplatesAttachWorkspaceResource504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.attachWorkspaceResource")
      .annotate(OpenApi.Summary, "Attach a template workspace resource")
      .annotate(
        OpenApi.Description,
        "Adds or replaces one bounded persistent read-only resource and advances the workspace revision.",
      ),
    HttpApiEndpoint.post(
      "templatesRemoveWorkspaceResource",
      "/v1/templates/:id/workspace/resources/:resourceId/remove",
      {
        params: TemplatesRemoveWorkspaceResourcePathParams,
        headers: TemplatesRemoveWorkspaceResourceHeaders,
        payload: TemplatesRemoveWorkspaceResourceRequestJson,
        success: TemplatesRemoveWorkspaceResource200,
        error: [
          TemplatesRemoveWorkspaceResource401.pipe(HttpApiSchema.status(401)),
          TemplatesRemoveWorkspaceResource403.pipe(HttpApiSchema.status(403)),
          TemplatesRemoveWorkspaceResource404.pipe(HttpApiSchema.status(404)),
          TemplatesRemoveWorkspaceResource409.pipe(HttpApiSchema.status(409)),
          TemplatesRemoveWorkspaceResource422.pipe(HttpApiSchema.status(422)),
          TemplatesRemoveWorkspaceResource500,
          TemplatesRemoveWorkspaceResource504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.removeWorkspaceResource")
      .annotate(OpenApi.Summary, "Remove a template workspace resource")
      .annotate(
        OpenApi.Description,
        "Removes one persistent resource from mounted context and advances the workspace revision.",
      ),
    HttpApiEndpoint.post("templatesRestoreWorkspace", "/v1/templates/:id/workspace/restore", {
      params: TemplatesRestoreWorkspacePathParams,
      headers: TemplatesRestoreWorkspaceHeaders,
      payload: TemplatesRestoreWorkspaceRequestJson,
      success: TemplatesRestoreWorkspace200,
      error: [
        TemplatesRestoreWorkspace401.pipe(HttpApiSchema.status(401)),
        TemplatesRestoreWorkspace403.pipe(HttpApiSchema.status(403)),
        TemplatesRestoreWorkspace404.pipe(HttpApiSchema.status(404)),
        TemplatesRestoreWorkspace409.pipe(HttpApiSchema.status(409)),
        TemplatesRestoreWorkspace422.pipe(HttpApiSchema.status(422)),
        TemplatesRestoreWorkspace500,
        TemplatesRestoreWorkspace504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.restoreWorkspace")
      .annotate(OpenApi.Summary, "Stage a historical template project tree")
      .annotate(
        OpenApi.Description,
        "Builds the template entry before atomically staging a reachable historical commit and its emitted source; a later Save appends a new commit without rewriting branch history.",
      ),
    HttpApiEndpoint.post("templatesSaveWorkspace", "/v1/templates/:id/workspace/save", {
      params: TemplatesSaveWorkspacePathParams,
      headers: TemplatesSaveWorkspaceHeaders,
      payload: TemplatesSaveWorkspaceRequestJson,
      success: TemplatesSaveWorkspace200,
      error: [
        TemplatesSaveWorkspace401.pipe(HttpApiSchema.status(401)),
        TemplatesSaveWorkspace403.pipe(HttpApiSchema.status(403)),
        TemplatesSaveWorkspace404.pipe(HttpApiSchema.status(404)),
        TemplatesSaveWorkspace409.pipe(HttpApiSchema.status(409)),
        TemplatesSaveWorkspace422.pipe(HttpApiSchema.status(422)),
        TemplatesSaveWorkspace500,
        TemplatesSaveWorkspace504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.saveWorkspace")
      .annotate(OpenApi.Summary, "Save a template project workspace")
      .annotate(
        OpenApi.Description,
        "Validates the effective project tree and saves it as one Git commit on the template repository's default branch.",
      ),
    HttpApiEndpoint.get("templatesListFamilies", "/v1/templates/families", {
      query: TemplatesListFamiliesQuery,
      success: TemplatesListFamilies200,
      error: [
        TemplatesListFamilies401.pipe(HttpApiSchema.status(401)),
        TemplatesListFamilies403.pipe(HttpApiSchema.status(403)),
        TemplatesListFamilies422.pipe(HttpApiSchema.status(422)),
        TemplatesListFamilies500,
        TemplatesListFamilies504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.listFamilies")
      .annotate(OpenApi.Summary, "List template families")
      .annotate(
        OpenApi.Description,
        "Returns the organization's template families with their members, newest first. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.post("templatesCreateFamily", "/v1/templates/families", {
      payload: TemplatesCreateFamilyRequestJson,
      success: TemplatesCreateFamily201.pipe(HttpApiSchema.status(201)),
      error: [
        TemplatesCreateFamily401.pipe(HttpApiSchema.status(401)),
        TemplatesCreateFamily403.pipe(HttpApiSchema.status(403)),
        TemplatesCreateFamily422.pipe(HttpApiSchema.status(422)),
        TemplatesCreateFamily500,
        TemplatesCreateFamily504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.createFamily")
      .annotate(OpenApi.Summary, "Create a template family")
      .annotate(
        OpenApi.Description,
        "Creates an empty template family with the supplied name and returns it with status 201.",
      ),
    HttpApiEndpoint.get("templatesGetFamily", "/v1/templates/families/:id", {
      params: TemplatesGetFamilyPathParams,
      success: TemplatesGetFamily200,
      error: [
        TemplatesGetFamily401.pipe(HttpApiSchema.status(401)),
        TemplatesGetFamily403.pipe(HttpApiSchema.status(403)),
        TemplatesGetFamily404.pipe(HttpApiSchema.status(404)),
        TemplatesGetFamily422.pipe(HttpApiSchema.status(422)),
        TemplatesGetFamily500,
        TemplatesGetFamily504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.getFamily")
      .annotate(OpenApi.Summary, "Get a template family")
      .annotate(
        OpenApi.Description,
        "Returns a template family and its channel-specific member templates.",
      ),
    HttpApiEndpoint.delete("templatesDeleteFamily", "/v1/templates/families/:id", {
      params: TemplatesDeleteFamilyPathParams,
      success: TemplatesDeleteFamily200,
      error: [
        TemplatesDeleteFamily401.pipe(HttpApiSchema.status(401)),
        TemplatesDeleteFamily403.pipe(HttpApiSchema.status(403)),
        TemplatesDeleteFamily404.pipe(HttpApiSchema.status(404)),
        TemplatesDeleteFamily422.pipe(HttpApiSchema.status(422)),
        TemplatesDeleteFamily500,
        TemplatesDeleteFamily504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.deleteFamily")
      .annotate(OpenApi.Summary, "Delete a template family")
      .annotate(
        OpenApi.Description,
        "Deletes a template family without deleting its member templates.",
      ),
    HttpApiEndpoint.patch("templatesRenameFamily", "/v1/templates/families/:id", {
      params: TemplatesRenameFamilyPathParams,
      payload: TemplatesRenameFamilyRequestJson,
      success: TemplatesRenameFamily200,
      error: [
        TemplatesRenameFamily401.pipe(HttpApiSchema.status(401)),
        TemplatesRenameFamily403.pipe(HttpApiSchema.status(403)),
        TemplatesRenameFamily404.pipe(HttpApiSchema.status(404)),
        TemplatesRenameFamily422.pipe(HttpApiSchema.status(422)),
        TemplatesRenameFamily500,
        TemplatesRenameFamily504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.renameFamily")
      .annotate(OpenApi.Summary, "Rename a template family")
      .annotate(
        OpenApi.Description,
        "Changes a template family's name and returns the updated family.",
      ),
    HttpApiEndpoint.post(
      "templatesAttachFamilyMember",
      "/v1/templates/families/:id/members/:templateId",
      {
        params: TemplatesAttachFamilyMemberPathParams,
        success: TemplatesAttachFamilyMember200,
        error: [
          TemplatesAttachFamilyMember401.pipe(HttpApiSchema.status(401)),
          TemplatesAttachFamilyMember403.pipe(HttpApiSchema.status(403)),
          TemplatesAttachFamilyMember404.pipe(HttpApiSchema.status(404)),
          TemplatesAttachFamilyMember409.pipe(HttpApiSchema.status(409)),
          TemplatesAttachFamilyMember422.pipe(HttpApiSchema.status(422)),
          TemplatesAttachFamilyMember500,
          TemplatesAttachFamilyMember504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.attachFamilyMember")
      .annotate(OpenApi.Summary, "Attach a template to a family")
      .annotate(
        OpenApi.Description,
        "Adds an existing template as a channel member of the family and returns the updated family.",
      ),
    HttpApiEndpoint.delete(
      "templatesDetachFamilyMember",
      "/v1/templates/families/:id/members/:templateId",
      {
        params: TemplatesDetachFamilyMemberPathParams,
        success: TemplatesDetachFamilyMember200,
        error: [
          TemplatesDetachFamilyMember401.pipe(HttpApiSchema.status(401)),
          TemplatesDetachFamilyMember403.pipe(HttpApiSchema.status(403)),
          TemplatesDetachFamilyMember404.pipe(HttpApiSchema.status(404)),
          TemplatesDetachFamilyMember409.pipe(HttpApiSchema.status(409)),
          TemplatesDetachFamilyMember422.pipe(HttpApiSchema.status(422)),
          TemplatesDetachFamilyMember500,
          TemplatesDetachFamilyMember504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.detachFamilyMember")
      .annotate(OpenApi.Summary, "Detach a template from a family")
      .annotate(
        OpenApi.Description,
        "Removes a member template from the family without deleting the template.",
      ),
    HttpApiEndpoint.post(
      "templatesCreateFamilyFromTemplate",
      "/v1/templates/families/from-template/:templateId",
      {
        params: TemplatesCreateFamilyFromTemplatePathParams,
        payload: TemplatesCreateFamilyFromTemplateRequestJson,
        success: TemplatesCreateFamilyFromTemplate201.pipe(HttpApiSchema.status(201)),
        error: [
          TemplatesCreateFamilyFromTemplate401.pipe(HttpApiSchema.status(401)),
          TemplatesCreateFamilyFromTemplate403.pipe(HttpApiSchema.status(403)),
          TemplatesCreateFamilyFromTemplate404.pipe(HttpApiSchema.status(404)),
          TemplatesCreateFamilyFromTemplate409.pipe(HttpApiSchema.status(409)),
          TemplatesCreateFamilyFromTemplate422.pipe(HttpApiSchema.status(422)),
          TemplatesCreateFamilyFromTemplate500,
          TemplatesCreateFamilyFromTemplate504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.createFamilyFromTemplate")
      .annotate(OpenApi.Summary, "Create a family from a template")
      .annotate(
        OpenApi.Description,
        "Creates a template family containing the specified template and returns the new family with status 201.",
      ),
    HttpApiEndpoint.post("templatesCreateFromWebsite", "/v1/templates/from-website", {
      headers: TemplatesCreateFromWebsiteHeaders,
      payload: TemplatesCreateFromWebsiteRequestJson,
      success: TemplatesCreateFromWebsite201.pipe(HttpApiSchema.status(201)),
      error: [
        TemplatesCreateFromWebsite401.pipe(HttpApiSchema.status(401)),
        TemplatesCreateFromWebsite403.pipe(HttpApiSchema.status(403)),
        TemplatesCreateFromWebsite404.pipe(HttpApiSchema.status(404)),
        TemplatesCreateFromWebsite409.pipe(HttpApiSchema.status(409)),
        TemplatesCreateFromWebsite422.pipe(HttpApiSchema.status(422)),
        TemplatesCreateFromWebsite500,
        TemplatesCreateFromWebsite504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.createFromWebsite")
      .annotate(OpenApi.Summary, "Create a template from a website")
      .annotate(
        OpenApi.Description,
        "Checks that the website is a public page Samva can read, creates an email template project from Samva's canonical TSX starter, and returns the template with status 201 and the request that makes the template assistant match the site. The assistant runs when the request is sent in the editor; it rebuilds the project's theme and blocks from the site and proposes a brand that applies only after the customer approves it. A 422 names why the site cannot be matched: not a web address, not public, no answer, a missing page, refused automated visits, or not a web page.",
      ),
    HttpApiEndpoint.post("templatesAddEntry", "/v1/templates/projects/:id/entries", {
      params: TemplatesAddEntryPathParams,
      payload: TemplatesAddEntryRequestJson,
      success: TemplatesAddEntry201.pipe(HttpApiSchema.status(201)),
      error: [
        TemplatesAddEntry401.pipe(HttpApiSchema.status(401)),
        TemplatesAddEntry403.pipe(HttpApiSchema.status(403)),
        TemplatesAddEntry404.pipe(HttpApiSchema.status(404)),
        TemplatesAddEntry409.pipe(HttpApiSchema.status(409)),
        TemplatesAddEntry422.pipe(HttpApiSchema.status(422)),
        TemplatesAddEntry500,
        TemplatesAddEntry504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templates.addEntry")
      .annotate(OpenApi.Summary, "Add a template entry")
      .annotate(
        OpenApi.Description,
        "Registers a `.tsx` file under `templates/` or `emails/` in an existing template project as its own template and returns it with status 201. The file does not need to exist yet; publishing fails until a commit contains it. Repeating the call with the same entry path, name, and slug returns the existing template.",
      ),
  )
  .annotate(
    OpenApi.Description,
    "Git-backed email template projects, workspace editing, immutable publications, and delivery defaults",
  ) {}
