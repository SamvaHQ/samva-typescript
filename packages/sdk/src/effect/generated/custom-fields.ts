// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  ConflictError,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  OrganizationId,
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type CustomFieldDefinitionId = string & EffectBrand.Brand<"CustomFieldDefinitionId">;
export const CustomFieldDefinitionId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^cfield_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^cfield_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "CustomFieldDefinitionId",
    }),
  ).pipe(Schema.brand("CustomFieldDefinitionId")))();
export type CustomFieldList = {
  readonly items: ReadonlyArray<{
    readonly id: CustomFieldDefinitionId;
    readonly organizationId: OrganizationId;
    readonly key: string;
    readonly label: string;
    readonly type: "text" | "number" | "boolean" | "date" | "select";
    readonly options: ReadonlyArray<string> | null;
    readonly defaultValue: string | null;
    readonly isRequired: boolean;
    readonly sortOrder: number;
    readonly createdAt: string;
    readonly updatedAt: string;
  }>;
};
export const CustomFieldList = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        id: CustomFieldDefinitionId,
        organizationId: OrganizationId,
        key: Schema.String,
        label: Schema.String,
        type: Schema.Union([
          Schema.Literal("text"),
          Schema.Literal("number"),
          Schema.Literal("boolean"),
          Schema.Literal("date"),
          Schema.Literal("select"),
        ]),
        options: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        defaultValue: Schema.Union([Schema.String, Schema.Null]),
        isRequired: Schema.Boolean,
        sortOrder: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        createdAt: Schema.String,
        updatedAt: Schema.String,
      }),
    ).check(Schema.isMaxLength(100).annotate({ expected: "a value with a length of at most 100" })),
  }).annotate({ identifier: "CustomFieldList" }))();
export type CustomFieldsList200 = CustomFieldList;
export const CustomFieldsList200 = CustomFieldList;
export type CustomFieldsList401 = UnauthorizedError;
export const CustomFieldsList401 = UnauthorizedError;
export type CustomFieldsList403 = ForbiddenError;
export const CustomFieldsList403 = ForbiddenError;
export type CustomFieldsList422 = ValidationError;
export const CustomFieldsList422 = ValidationError;
export type CustomFieldsList500 = InternalError;
export const CustomFieldsList500 = InternalError;
export type CustomFieldsList504 = GatewayTimeoutError;
export const CustomFieldsList504 = GatewayTimeoutError;
export type CustomFieldsCreateRequestJson = {
  readonly key: string;
  readonly label: string;
  readonly type: "text" | "number" | "boolean" | "date" | "select";
  readonly options?: ReadonlyArray<string> | null;
  readonly defaultValue?: string | null;
  readonly isRequired?: boolean | null;
  readonly sortOrder?: number | null;
};
export const CustomFieldsCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    key: Schema.String,
    label: Schema.String,
    type: Schema.Union([
      Schema.Literal("text"),
      Schema.Literal("number"),
      Schema.Literal("boolean"),
      Schema.Literal("date"),
      Schema.Literal("select"),
    ]),
    options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
    defaultValue: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    isRequired: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    sortOrder: Schema.optionalKey(
      Schema.Union([
        Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        Schema.Null,
      ]),
    ),
  }))();
export type CustomFieldsCreate201 = {
  readonly id: CustomFieldDefinitionId;
  readonly organizationId: OrganizationId;
  readonly key: string;
  readonly label: string;
  readonly type: "text" | "number" | "boolean" | "date" | "select";
  readonly options: ReadonlyArray<string> | null;
  readonly defaultValue: string | null;
  readonly isRequired: boolean;
  readonly sortOrder: number;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const CustomFieldsCreate201 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: CustomFieldDefinitionId,
    organizationId: OrganizationId,
    key: Schema.String,
    label: Schema.String,
    type: Schema.Union([
      Schema.Literal("text"),
      Schema.Literal("number"),
      Schema.Literal("boolean"),
      Schema.Literal("date"),
      Schema.Literal("select"),
    ]),
    options: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    defaultValue: Schema.Union([Schema.String, Schema.Null]),
    isRequired: Schema.Boolean,
    sortOrder: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }))();
export type CustomFieldsCreate401 = UnauthorizedError;
export const CustomFieldsCreate401 = UnauthorizedError;
export type CustomFieldsCreate403 = ForbiddenError;
export const CustomFieldsCreate403 = ForbiddenError;
export type CustomFieldsCreate409 = ConflictError;
export const CustomFieldsCreate409 = ConflictError;
export type CustomFieldsCreate422 = ValidationError;
export const CustomFieldsCreate422 = ValidationError;
export type CustomFieldsCreate500 = InternalError;
export const CustomFieldsCreate500 = InternalError;
export type CustomFieldsCreate504 = GatewayTimeoutError;
export const CustomFieldsCreate504 = GatewayTimeoutError;
export type CustomFieldsRemovePathParams = { readonly id: CustomFieldDefinitionId };
export const CustomFieldsRemovePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: CustomFieldDefinitionId }))();
export type CustomFieldsRemove200 = { readonly success: boolean };
export const CustomFieldsRemove200 = /* @__PURE__ */ (() =>
  Schema.Struct({ success: Schema.Boolean }))();
export type CustomFieldsRemove401 = UnauthorizedError;
export const CustomFieldsRemove401 = UnauthorizedError;
export type CustomFieldsRemove403 = ForbiddenError;
export const CustomFieldsRemove403 = ForbiddenError;
export type CustomFieldsRemove404 = ResourceNotFoundError;
export const CustomFieldsRemove404 = ResourceNotFoundError;
export type CustomFieldsRemove422 = ValidationError;
export const CustomFieldsRemove422 = ValidationError;
export type CustomFieldsRemove500 = InternalError;
export const CustomFieldsRemove500 = InternalError;
export type CustomFieldsRemove504 = GatewayTimeoutError;
export const CustomFieldsRemove504 = GatewayTimeoutError;
export type CustomFieldsUpdatePathParams = { readonly id: CustomFieldDefinitionId };
export const CustomFieldsUpdatePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: CustomFieldDefinitionId }))();
export type CustomFieldsUpdateRequestJson = {
  readonly label?: string | null;
  readonly options?: ReadonlyArray<string> | null;
  readonly defaultValue?: string | null;
  readonly isRequired?: boolean | null;
  readonly sortOrder?: number | null;
};
export const CustomFieldsUpdateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    label: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
    defaultValue: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    isRequired: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    sortOrder: Schema.optionalKey(
      Schema.Union([
        Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        Schema.Null,
      ]),
    ),
  }))();
export type CustomFieldsUpdate200 = {
  readonly id: CustomFieldDefinitionId;
  readonly organizationId: OrganizationId;
  readonly key: string;
  readonly label: string;
  readonly type: "text" | "number" | "boolean" | "date" | "select";
  readonly options: ReadonlyArray<string> | null;
  readonly defaultValue: string | null;
  readonly isRequired: boolean;
  readonly sortOrder: number;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const CustomFieldsUpdate200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: CustomFieldDefinitionId,
    organizationId: OrganizationId,
    key: Schema.String,
    label: Schema.String,
    type: Schema.Union([
      Schema.Literal("text"),
      Schema.Literal("number"),
      Schema.Literal("boolean"),
      Schema.Literal("date"),
      Schema.Literal("select"),
    ]),
    options: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    defaultValue: Schema.Union([Schema.String, Schema.Null]),
    isRequired: Schema.Boolean,
    sortOrder: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }))();
export type CustomFieldsUpdate401 = UnauthorizedError;
export const CustomFieldsUpdate401 = UnauthorizedError;
export type CustomFieldsUpdate403 = ForbiddenError;
export const CustomFieldsUpdate403 = ForbiddenError;
export type CustomFieldsUpdate404 = ResourceNotFoundError;
export const CustomFieldsUpdate404 = ResourceNotFoundError;
export type CustomFieldsUpdate422 = ValidationError;
export const CustomFieldsUpdate422 = ValidationError;
export type CustomFieldsUpdate500 = InternalError;
export const CustomFieldsUpdate500 = InternalError;
export type CustomFieldsUpdate504 = GatewayTimeoutError;
export const CustomFieldsUpdate504 = GatewayTimeoutError;

export class CustomFieldsGroup extends HttpApiGroup.make("Custom Fields")
  .add(
    HttpApiEndpoint.get("customFieldsList", "/v1/custom-fields", {
      success: CustomFieldsList200,
      error: [
        CustomFieldsList401.pipe(HttpApiSchema.status(401)),
        CustomFieldsList403.pipe(HttpApiSchema.status(403)),
        CustomFieldsList422.pipe(HttpApiSchema.status(422)),
        CustomFieldsList500,
        CustomFieldsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "customFields.list")
      .annotate(OpenApi.Summary, "List custom fields")
      .annotate(
        OpenApi.Description,
        "Returns every custom field definition for the organization in display order. An organization defines at most 100, so the list is never paged.",
      ),
    HttpApiEndpoint.post("customFieldsCreate", "/v1/custom-fields", {
      payload: CustomFieldsCreateRequestJson,
      success: CustomFieldsCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        CustomFieldsCreate401.pipe(HttpApiSchema.status(401)),
        CustomFieldsCreate403.pipe(HttpApiSchema.status(403)),
        CustomFieldsCreate409.pipe(HttpApiSchema.status(409)),
        CustomFieldsCreate422.pipe(HttpApiSchema.status(422)),
        CustomFieldsCreate500,
        CustomFieldsCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "customFields.create")
      .annotate(OpenApi.Summary, "Create a custom field")
      .annotate(
        OpenApi.Description,
        "Creates a new custom field definition and returns it with a 201 status; the field key must be unique, and an organization defines at most 100.",
      ),
    HttpApiEndpoint.delete("customFieldsRemove", "/v1/custom-fields/:id", {
      params: CustomFieldsRemovePathParams,
      success: CustomFieldsRemove200,
      error: [
        CustomFieldsRemove401.pipe(HttpApiSchema.status(401)),
        CustomFieldsRemove403.pipe(HttpApiSchema.status(403)),
        CustomFieldsRemove404.pipe(HttpApiSchema.status(404)),
        CustomFieldsRemove422.pipe(HttpApiSchema.status(422)),
        CustomFieldsRemove500,
        CustomFieldsRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "customFields.remove")
      .annotate(OpenApi.Summary, "Delete a custom field")
      .annotate(OpenApi.Description, "Permanently deletes a custom field definition by its ID."),
    HttpApiEndpoint.patch("customFieldsUpdate", "/v1/custom-fields/:id", {
      params: CustomFieldsUpdatePathParams,
      payload: CustomFieldsUpdateRequestJson,
      success: CustomFieldsUpdate200,
      error: [
        CustomFieldsUpdate401.pipe(HttpApiSchema.status(401)),
        CustomFieldsUpdate403.pipe(HttpApiSchema.status(403)),
        CustomFieldsUpdate404.pipe(HttpApiSchema.status(404)),
        CustomFieldsUpdate422.pipe(HttpApiSchema.status(422)),
        CustomFieldsUpdate500,
        CustomFieldsUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "customFields.update")
      .annotate(OpenApi.Summary, "Update a custom field")
      .annotate(
        OpenApi.Description,
        "Updates an existing custom field definition and returns the updated field.",
      ),
  )
  .annotate(OpenApi.Description, "Custom field definitions for contact metadata") {}
