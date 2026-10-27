// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  BrandAssets,
  BrandFooter,
  ConflictError,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  ResourceNotFoundError,
  SuccessResponse,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type BrandId = string & EffectBrand.Brand<"BrandId">;
export const BrandId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^brand_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^brand_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "BrandId",
    }),
  ).pipe(Schema.brand("BrandId")))();
export type Brand = {
  readonly id: BrandId;
  readonly slug: string;
  readonly name: string;
  readonly isDefault: boolean;
  readonly css: string;
  readonly assets: BrandAssets;
  readonly footer: BrandFooter;
  readonly digest: string;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const Brand = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: BrandId,
    slug: Schema.String.annotate({
      description: "The brand's handle, unique in the organization; `samva:brand/<slug>` names it.",
    }).check(
      Schema.isPattern(new RegExp("^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$",
      }),
    ),
    name: Schema.String,
    isDefault: Schema.Boolean.annotate({
      description: "Whether bare `samva:brand` and domains without a brand resolve to this brand.",
    }),
    css: Schema.String.annotate({
      description:
        "Brand theme CSS: `@theme` variables, one dark-mode `@theme` of colors, and `@font-face` rules with https WOFF2 sources.",
    }),
    assets: BrandAssets,
    footer: BrandFooter,
    digest: Schema.String.annotate({
      description:
        "SHA-256 of the brand's css, assets and footer. A publication built against a different digest predates the brand's current content.",
    }),
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "Brand" }))();
export type BrandList = { readonly items: ReadonlyArray<Brand> };
export const BrandList = /* @__PURE__ */ (() =>
  Schema.Struct({ items: Schema.Array(Brand) }).annotate({ identifier: "BrandList" }))();
export type BrandsList200 = BrandList;
export const BrandsList200 = BrandList;
export type BrandsList401 = UnauthorizedError;
export const BrandsList401 = UnauthorizedError;
export type BrandsList403 = ForbiddenError;
export const BrandsList403 = ForbiddenError;
export type BrandsList422 = ValidationError;
export const BrandsList422 = ValidationError;
export type BrandsList500 = InternalError;
export const BrandsList500 = InternalError;
export type BrandsList504 = GatewayTimeoutError;
export const BrandsList504 = GatewayTimeoutError;
export type BrandsCreateRequestJson = {
  readonly slug: string;
  readonly name: string;
  readonly css?: string | null;
  readonly assets?: BrandAssets | null;
  readonly footer?: BrandFooter | null;
  readonly isDefault?: boolean | null;
};
export const BrandsCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    slug: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$",
      }),
    ),
    name: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(120).annotate({ expected: "a string with at most 120 code points" }),
      )
      .check(
        Schema.isMaxLength(120).annotate({ expected: "a value with a length of at most 120" }),
      ),
    css: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(32768).annotate({
            expected: "a string with at most 32768 code points",
          }),
        ).check(
          Schema.isMaxLength(32768).annotate({
            expected: "a value with a length of at most 32768",
          }),
        ),
        Schema.Null,
      ]),
    ),
    assets: Schema.optionalKey(Schema.Union([BrandAssets, Schema.Null])),
    footer: Schema.optionalKey(Schema.Union([BrandFooter, Schema.Null])),
    isDefault: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  }))();
export type BrandsCreate201 = Brand;
export const BrandsCreate201 = Brand;
export type BrandsCreate401 = UnauthorizedError;
export const BrandsCreate401 = UnauthorizedError;
export type BrandsCreate403 = ForbiddenError;
export const BrandsCreate403 = ForbiddenError;
export type BrandsCreate409 = ConflictError;
export const BrandsCreate409 = ConflictError;
export type BrandsCreate422 = ValidationError;
export const BrandsCreate422 = ValidationError;
export type BrandsCreate500 = InternalError;
export const BrandsCreate500 = InternalError;
export type BrandsCreate504 = GatewayTimeoutError;
export const BrandsCreate504 = GatewayTimeoutError;
export type BrandsGetPathParams = { readonly slug: string };
export const BrandsGetPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    slug: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$",
      }),
    ),
  }))();
export type BrandsGet200 = Brand;
export const BrandsGet200 = Brand;
export type BrandsGet401 = UnauthorizedError;
export const BrandsGet401 = UnauthorizedError;
export type BrandsGet403 = ForbiddenError;
export const BrandsGet403 = ForbiddenError;
export type BrandsGet404 = ResourceNotFoundError;
export const BrandsGet404 = ResourceNotFoundError;
export type BrandsGet422 = ValidationError;
export const BrandsGet422 = ValidationError;
export type BrandsGet500 = InternalError;
export const BrandsGet500 = InternalError;
export type BrandsGet504 = GatewayTimeoutError;
export const BrandsGet504 = GatewayTimeoutError;
export type BrandsRemovePathParams = { readonly slug: string };
export const BrandsRemovePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    slug: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$",
      }),
    ),
  }))();
export type BrandsRemove200 = SuccessResponse;
export const BrandsRemove200 = SuccessResponse;
export type BrandsRemove401 = UnauthorizedError;
export const BrandsRemove401 = UnauthorizedError;
export type BrandsRemove403 = ForbiddenError;
export const BrandsRemove403 = ForbiddenError;
export type BrandsRemove404 = ResourceNotFoundError;
export const BrandsRemove404 = ResourceNotFoundError;
export type BrandsRemove409 = ConflictError;
export const BrandsRemove409 = ConflictError;
export type BrandsRemove422 = ValidationError;
export const BrandsRemove422 = ValidationError;
export type BrandsRemove500 = InternalError;
export const BrandsRemove500 = InternalError;
export type BrandsRemove504 = GatewayTimeoutError;
export const BrandsRemove504 = GatewayTimeoutError;
export type BrandsUpdatePathParams = { readonly slug: string };
export const BrandsUpdatePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    slug: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$",
      }),
    ),
  }))();
export type BrandsUpdateRequestJson = {
  readonly newSlug?: string | null;
  readonly name?: string | null;
  readonly css?: string | null;
  readonly assets?: BrandAssets | null;
  readonly footer?: BrandFooter | null;
};
export const BrandsUpdateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    newSlug: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Renames the brand. Projects importing `samva:brand/<old slug>` stop building until they import the new slug.",
        }).check(
          Schema.isPattern(new RegExp("^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$",
          }),
        ),
        Schema.Null,
      ]),
    ),
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
    css: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(32768).annotate({
            expected: "a string with at most 32768 code points",
          }),
        ).check(
          Schema.isMaxLength(32768).annotate({
            expected: "a value with a length of at most 32768",
          }),
        ),
        Schema.Null,
      ]),
    ),
    assets: Schema.optionalKey(Schema.Union([BrandAssets, Schema.Null])),
    footer: Schema.optionalKey(Schema.Union([BrandFooter, Schema.Null])),
  }))();
export type BrandsUpdate200 = Brand;
export const BrandsUpdate200 = Brand;
export type BrandsUpdate401 = UnauthorizedError;
export const BrandsUpdate401 = UnauthorizedError;
export type BrandsUpdate403 = ForbiddenError;
export const BrandsUpdate403 = ForbiddenError;
export type BrandsUpdate404 = ResourceNotFoundError;
export const BrandsUpdate404 = ResourceNotFoundError;
export type BrandsUpdate409 = ConflictError;
export const BrandsUpdate409 = ConflictError;
export type BrandsUpdate422 = ValidationError;
export const BrandsUpdate422 = ValidationError;
export type BrandsUpdate500 = InternalError;
export const BrandsUpdate500 = InternalError;
export type BrandsUpdate504 = GatewayTimeoutError;
export const BrandsUpdate504 = GatewayTimeoutError;
export type BrandsSetDefaultPathParams = { readonly slug: string };
export const BrandsSetDefaultPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    slug: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$",
      }),
    ),
  }))();
export type BrandsSetDefault200 = Brand;
export const BrandsSetDefault200 = Brand;
export type BrandsSetDefault401 = UnauthorizedError;
export const BrandsSetDefault401 = UnauthorizedError;
export type BrandsSetDefault403 = ForbiddenError;
export const BrandsSetDefault403 = ForbiddenError;
export type BrandsSetDefault404 = ResourceNotFoundError;
export const BrandsSetDefault404 = ResourceNotFoundError;
export type BrandsSetDefault422 = ValidationError;
export const BrandsSetDefault422 = ValidationError;
export type BrandsSetDefault500 = InternalError;
export const BrandsSetDefault500 = InternalError;
export type BrandsSetDefault504 = GatewayTimeoutError;
export const BrandsSetDefault504 = GatewayTimeoutError;

export class BrandsGroup extends HttpApiGroup.make("Brands")
  .add(
    HttpApiEndpoint.get("brandsList", "/v1/brands", {
      success: BrandsList200,
      error: [
        BrandsList401.pipe(HttpApiSchema.status(401)),
        BrandsList403.pipe(HttpApiSchema.status(403)),
        BrandsList422.pipe(HttpApiSchema.status(422)),
        BrandsList500,
        BrandsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "brands.list")
      .annotate(OpenApi.Summary, "List brands")
      .annotate(OpenApi.Description, "Returns the organization's brands, the default brand first."),
    HttpApiEndpoint.post("brandsCreate", "/v1/brands", {
      payload: BrandsCreateRequestJson,
      success: BrandsCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        BrandsCreate401.pipe(HttpApiSchema.status(401)),
        BrandsCreate403.pipe(HttpApiSchema.status(403)),
        BrandsCreate409.pipe(HttpApiSchema.status(409)),
        BrandsCreate422.pipe(HttpApiSchema.status(422)),
        BrandsCreate500,
        BrandsCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "brands.create")
      .annotate(OpenApi.Summary, "Create a brand")
      .annotate(
        OpenApi.Description,
        "Creates a brand. The CSS must parse as a brand theme; a rejected theme answers 422 with located findings under `fields.css`. With `isDefault`, the new brand becomes the default. An organization holds at most 12 brands; creating one more answers 409 with a `ConflictError`.",
      ),
    HttpApiEndpoint.get("brandsGet", "/v1/brands/:slug", {
      params: BrandsGetPathParams,
      success: BrandsGet200,
      error: [
        BrandsGet401.pipe(HttpApiSchema.status(401)),
        BrandsGet403.pipe(HttpApiSchema.status(403)),
        BrandsGet404.pipe(HttpApiSchema.status(404)),
        BrandsGet422.pipe(HttpApiSchema.status(422)),
        BrandsGet500,
        BrandsGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "brands.get")
      .annotate(OpenApi.Summary, "Get a brand")
      .annotate(OpenApi.Description, "Returns one brand by its slug."),
    HttpApiEndpoint.delete("brandsRemove", "/v1/brands/:slug", {
      params: BrandsRemovePathParams,
      success: BrandsRemove200,
      error: [
        BrandsRemove401.pipe(HttpApiSchema.status(401)),
        BrandsRemove403.pipe(HttpApiSchema.status(403)),
        BrandsRemove404.pipe(HttpApiSchema.status(404)),
        BrandsRemove409.pipe(HttpApiSchema.status(409)),
        BrandsRemove422.pipe(HttpApiSchema.status(422)),
        BrandsRemove500,
        BrandsRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "brands.remove")
      .annotate(OpenApi.Summary, "Delete a brand")
      .annotate(
        OpenApi.Description,
        "Deletes a brand. The default brand cannot be deleted; domains that used the deleted brand fall back to the default.",
      ),
    HttpApiEndpoint.patch("brandsUpdate", "/v1/brands/:slug", {
      params: BrandsUpdatePathParams,
      payload: BrandsUpdateRequestJson,
      success: BrandsUpdate200,
      error: [
        BrandsUpdate401.pipe(HttpApiSchema.status(401)),
        BrandsUpdate403.pipe(HttpApiSchema.status(403)),
        BrandsUpdate404.pipe(HttpApiSchema.status(404)),
        BrandsUpdate409.pipe(HttpApiSchema.status(409)),
        BrandsUpdate422.pipe(HttpApiSchema.status(422)),
        BrandsUpdate500,
        BrandsUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "brands.update")
      .annotate(OpenApi.Summary, "Update a brand")
      .annotate(
        OpenApi.Description,
        "Updates a brand. Each section given replaces that section whole. Published templates keep the brand they were built against until they are republished.",
      ),
    HttpApiEndpoint.post("brandsSetDefault", "/v1/brands/:slug/default", {
      params: BrandsSetDefaultPathParams,
      success: BrandsSetDefault200,
      error: [
        BrandsSetDefault401.pipe(HttpApiSchema.status(401)),
        BrandsSetDefault403.pipe(HttpApiSchema.status(403)),
        BrandsSetDefault404.pipe(HttpApiSchema.status(404)),
        BrandsSetDefault422.pipe(HttpApiSchema.status(422)),
        BrandsSetDefault500,
        BrandsSetDefault504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "brands.setDefault")
      .annotate(OpenApi.Summary, "Make a brand the default")
      .annotate(
        OpenApi.Description,
        "Makes this brand the organization's default: bare `samva:brand` and domains without a brand resolve to it at their next build or send.",
      ),
  )
  .annotate(
    OpenApi.Description,
    "Brand themes, logos and footers that templates import with `samva:brand`.",
  ) {}
