// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  ContactGroupId,
  ContactId,
  ContactIdentity,
  Cursor,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  JsonValue,
  OrganizationId,
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type ContactGroupPage = {
  readonly items: ReadonlyArray<{
    readonly id: ContactGroupId;
    readonly organizationId: OrganizationId;
    readonly name: string;
    readonly description: string | null;
    readonly type: "static" | "dynamic" | "smart";
    readonly criteria: { readonly [x: string]: JsonValue } | null;
    readonly color: "clay" | "sand" | "moss" | "sky" | "plum" | "rose" | null;
    readonly icon: string | null;
    readonly parentGroupId: ContactGroupId | null;
    readonly contactCount: number;
    readonly lastCalculatedAt: string | null;
    readonly isActive: boolean;
    readonly createdAt: string;
    readonly updatedAt: string;
  }>;
  readonly nextCursor: string | null;
};
export const ContactGroupPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        id: ContactGroupId,
        organizationId: OrganizationId,
        name: Schema.String,
        description: Schema.Union([Schema.String, Schema.Null]),
        type: Schema.Union([
          Schema.Literal("static"),
          Schema.Literal("dynamic"),
          Schema.Literal("smart"),
        ]),
        criteria: Schema.Union([Schema.Record(Schema.String, JsonValue), Schema.Null]),
        color: Schema.Union([
          Schema.Union([
            Schema.Literal("clay"),
            Schema.Literal("sand"),
            Schema.Literal("moss"),
            Schema.Literal("sky"),
            Schema.Literal("plum"),
            Schema.Literal("rose"),
          ]),
          Schema.Null,
        ]).annotate({
          description:
            "The list's label color, one of six families, or null for the neutral chip. Customer-chosen and purely presentational; it carries no meaning the API enforces.",
        }),
        icon: Schema.Union([Schema.String, Schema.Null]),
        parentGroupId: Schema.Union([ContactGroupId, Schema.Null]),
        contactCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        lastCalculatedAt: Schema.Union([Schema.String, Schema.Null]),
        isActive: Schema.Boolean,
        createdAt: Schema.String,
        updatedAt: Schema.String,
      }),
    ),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "ContactGroupPage" }))();
export type ContactGroupMemberPage = {
  readonly items: ReadonlyArray<{
    readonly id: string;
    readonly organizationId: OrganizationId;
    readonly groupId: ContactGroupId;
    readonly contactId: ContactId;
    readonly role: "member" | "moderator" | "admin";
    readonly joinedAt: string;
    readonly joinedBy: ContactId | null;
    readonly expiresAt: string | null;
    readonly contact: {
      readonly id: ContactId;
      readonly name: string;
      readonly displayName: string | null;
      readonly type: string;
      readonly identities?: ReadonlyArray<ContactIdentity> | null;
    } | null;
  }>;
  readonly nextCursor: string | null;
};
export const ContactGroupMemberPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        organizationId: OrganizationId,
        groupId: ContactGroupId,
        contactId: ContactId,
        role: Schema.Union([
          Schema.Literal("member"),
          Schema.Literal("moderator"),
          Schema.Literal("admin"),
        ]),
        joinedAt: Schema.String,
        joinedBy: Schema.Union([ContactId, Schema.Null]),
        expiresAt: Schema.Union([Schema.String, Schema.Null]),
        contact: Schema.Union([
          Schema.Struct({
            id: ContactId,
            name: Schema.String,
            displayName: Schema.Union([Schema.String, Schema.Null]),
            type: Schema.String,
            identities: Schema.optionalKey(
              Schema.Union([Schema.Array(ContactIdentity), Schema.Null]),
            ),
          }),
          Schema.Null,
        ]),
      }),
    ),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "ContactGroupMemberPage" }))();
export type ContactGroupsListQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
  readonly type?:
    | "static"
    | "dynamic"
    | "smart"
    | ReadonlyArray<"static" | "dynamic" | "smart">
    | null;
  readonly isActive?: boolean | null;
};
export const ContactGroupsListQuery = /* @__PURE__ */ (() =>
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
    type: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Literal("static"),
          Schema.Literal("dynamic"),
          Schema.Literal("smart"),
        ]),
        Schema.Array(
          Schema.Union([
            Schema.Literal("static"),
            Schema.Literal("dynamic"),
            Schema.Literal("smart"),
          ]),
        ),
        Schema.Null,
      ]),
    ),
    isActive: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  }))();
export type ContactGroupsList200 = ContactGroupPage;
export const ContactGroupsList200 = ContactGroupPage;
export type ContactGroupsList401 = UnauthorizedError;
export const ContactGroupsList401 = UnauthorizedError;
export type ContactGroupsList403 = ForbiddenError;
export const ContactGroupsList403 = ForbiddenError;
export type ContactGroupsList422 = ValidationError;
export const ContactGroupsList422 = ValidationError;
export type ContactGroupsList500 = InternalError;
export const ContactGroupsList500 = InternalError;
export type ContactGroupsList504 = GatewayTimeoutError;
export const ContactGroupsList504 = GatewayTimeoutError;
export type ContactGroupsCreateRequestJson = {
  readonly name: string;
  readonly description?: string | null;
  readonly type?: "static" | "dynamic" | "smart" | null;
  readonly criteria?: { readonly [x: string]: JsonValue } | null;
  readonly color?: "clay" | "sand" | "moss" | "sky" | "plum" | "rose" | null | null;
  readonly icon?: string | null;
  readonly parentGroupId?: ContactGroupId | null;
  readonly isActive?: boolean | null;
};
export const ContactGroupsCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.String,
    description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    type: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Literal("static"),
          Schema.Literal("dynamic"),
          Schema.Literal("smart"),
        ]),
        Schema.Null,
      ]),
    ),
    criteria: Schema.optionalKey(
      Schema.Union([Schema.Record(Schema.String, JsonValue), Schema.Null]),
    ),
    color: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Union([
            Schema.Literal("clay"),
            Schema.Literal("sand"),
            Schema.Literal("moss"),
            Schema.Literal("sky"),
            Schema.Literal("plum"),
            Schema.Literal("rose"),
          ]),
          Schema.Null,
        ]).annotate({
          description:
            "The list's label color, one of six families, or null for the neutral chip. Customer-chosen and purely presentational; it carries no meaning the API enforces.",
        }),
        Schema.Null,
      ]),
    ),
    icon: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    parentGroupId: Schema.optionalKey(Schema.Union([ContactGroupId, Schema.Null])),
    isActive: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  }))();
export type ContactGroupsCreate201 = {
  readonly id: ContactGroupId;
  readonly organizationId: OrganizationId;
  readonly name: string;
  readonly description: string | null;
  readonly type: "static" | "dynamic" | "smart";
  readonly criteria: { readonly [x: string]: JsonValue } | null;
  readonly color: "clay" | "sand" | "moss" | "sky" | "plum" | "rose" | null;
  readonly icon: string | null;
  readonly parentGroupId: ContactGroupId | null;
  readonly contactCount: number;
  readonly lastCalculatedAt: string | null;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const ContactGroupsCreate201 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: ContactGroupId,
    organizationId: OrganizationId,
    name: Schema.String,
    description: Schema.Union([Schema.String, Schema.Null]),
    type: Schema.Union([
      Schema.Literal("static"),
      Schema.Literal("dynamic"),
      Schema.Literal("smart"),
    ]),
    criteria: Schema.Union([Schema.Record(Schema.String, JsonValue), Schema.Null]),
    color: Schema.Union([
      Schema.Union([
        Schema.Literal("clay"),
        Schema.Literal("sand"),
        Schema.Literal("moss"),
        Schema.Literal("sky"),
        Schema.Literal("plum"),
        Schema.Literal("rose"),
      ]),
      Schema.Null,
    ]).annotate({
      description:
        "The list's label color, one of six families, or null for the neutral chip. Customer-chosen and purely presentational; it carries no meaning the API enforces.",
    }),
    icon: Schema.Union([Schema.String, Schema.Null]),
    parentGroupId: Schema.Union([ContactGroupId, Schema.Null]),
    contactCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    lastCalculatedAt: Schema.Union([Schema.String, Schema.Null]),
    isActive: Schema.Boolean,
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }))();
export type ContactGroupsCreate401 = UnauthorizedError;
export const ContactGroupsCreate401 = UnauthorizedError;
export type ContactGroupsCreate403 = ForbiddenError;
export const ContactGroupsCreate403 = ForbiddenError;
export type ContactGroupsCreate422 = ValidationError;
export const ContactGroupsCreate422 = ValidationError;
export type ContactGroupsCreate500 = InternalError;
export const ContactGroupsCreate500 = InternalError;
export type ContactGroupsCreate504 = GatewayTimeoutError;
export const ContactGroupsCreate504 = GatewayTimeoutError;
export type ContactGroupsGetByIdPathParams = { readonly id: ContactGroupId };
export const ContactGroupsGetByIdPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ContactGroupId }))();
export type ContactGroupsGetById200 = {
  readonly id: ContactGroupId;
  readonly organizationId: OrganizationId;
  readonly name: string;
  readonly description: string | null;
  readonly type: "static" | "dynamic" | "smart";
  readonly criteria: { readonly [x: string]: JsonValue } | null;
  readonly color: "clay" | "sand" | "moss" | "sky" | "plum" | "rose" | null;
  readonly icon: string | null;
  readonly parentGroupId: ContactGroupId | null;
  readonly contactCount: number;
  readonly lastCalculatedAt: string | null;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const ContactGroupsGetById200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: ContactGroupId,
    organizationId: OrganizationId,
    name: Schema.String,
    description: Schema.Union([Schema.String, Schema.Null]),
    type: Schema.Union([
      Schema.Literal("static"),
      Schema.Literal("dynamic"),
      Schema.Literal("smart"),
    ]),
    criteria: Schema.Union([Schema.Record(Schema.String, JsonValue), Schema.Null]),
    color: Schema.Union([
      Schema.Union([
        Schema.Literal("clay"),
        Schema.Literal("sand"),
        Schema.Literal("moss"),
        Schema.Literal("sky"),
        Schema.Literal("plum"),
        Schema.Literal("rose"),
      ]),
      Schema.Null,
    ]).annotate({
      description:
        "The list's label color, one of six families, or null for the neutral chip. Customer-chosen and purely presentational; it carries no meaning the API enforces.",
    }),
    icon: Schema.Union([Schema.String, Schema.Null]),
    parentGroupId: Schema.Union([ContactGroupId, Schema.Null]),
    contactCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    lastCalculatedAt: Schema.Union([Schema.String, Schema.Null]),
    isActive: Schema.Boolean,
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }))();
export type ContactGroupsGetById401 = UnauthorizedError;
export const ContactGroupsGetById401 = UnauthorizedError;
export type ContactGroupsGetById403 = ForbiddenError;
export const ContactGroupsGetById403 = ForbiddenError;
export type ContactGroupsGetById404 = ResourceNotFoundError;
export const ContactGroupsGetById404 = ResourceNotFoundError;
export type ContactGroupsGetById422 = ValidationError;
export const ContactGroupsGetById422 = ValidationError;
export type ContactGroupsGetById500 = InternalError;
export const ContactGroupsGetById500 = InternalError;
export type ContactGroupsGetById504 = GatewayTimeoutError;
export const ContactGroupsGetById504 = GatewayTimeoutError;
export type ContactGroupsRemovePathParams = { readonly id: ContactGroupId };
export const ContactGroupsRemovePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ContactGroupId }))();
export type ContactGroupsRemove200 = { readonly success: boolean };
export const ContactGroupsRemove200 = /* @__PURE__ */ (() =>
  Schema.Struct({ success: Schema.Boolean }))();
export type ContactGroupsRemove401 = UnauthorizedError;
export const ContactGroupsRemove401 = UnauthorizedError;
export type ContactGroupsRemove403 = ForbiddenError;
export const ContactGroupsRemove403 = ForbiddenError;
export type ContactGroupsRemove404 = ResourceNotFoundError;
export const ContactGroupsRemove404 = ResourceNotFoundError;
export type ContactGroupsRemove422 = ValidationError;
export const ContactGroupsRemove422 = ValidationError;
export type ContactGroupsRemove500 = InternalError;
export const ContactGroupsRemove500 = InternalError;
export type ContactGroupsRemove504 = GatewayTimeoutError;
export const ContactGroupsRemove504 = GatewayTimeoutError;
export type ContactGroupsUpdatePathParams = { readonly id: ContactGroupId };
export const ContactGroupsUpdatePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ContactGroupId }))();
export type ContactGroupsUpdateRequestJson = {
  readonly name?: string | null;
  readonly description?: string | null;
  readonly type?: "static" | "dynamic" | "smart" | null;
  readonly criteria?: { readonly [x: string]: JsonValue } | null;
  readonly color?: "clay" | "sand" | "moss" | "sky" | "plum" | "rose" | null | null;
  readonly icon?: string | null;
  readonly parentGroupId?: ContactGroupId | null;
  readonly isActive?: boolean | null;
};
export const ContactGroupsUpdateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    type: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Literal("static"),
          Schema.Literal("dynamic"),
          Schema.Literal("smart"),
        ]),
        Schema.Null,
      ]),
    ),
    criteria: Schema.optionalKey(
      Schema.Union([Schema.Record(Schema.String, JsonValue), Schema.Null]),
    ),
    color: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Union([
            Schema.Literal("clay"),
            Schema.Literal("sand"),
            Schema.Literal("moss"),
            Schema.Literal("sky"),
            Schema.Literal("plum"),
            Schema.Literal("rose"),
          ]),
          Schema.Null,
        ]).annotate({
          description:
            "The list's label color, one of six families, or null for the neutral chip. Customer-chosen and purely presentational; it carries no meaning the API enforces.",
        }),
        Schema.Null,
      ]),
    ),
    icon: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    parentGroupId: Schema.optionalKey(Schema.Union([ContactGroupId, Schema.Null])),
    isActive: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  }))();
export type ContactGroupsUpdate200 = {
  readonly id: ContactGroupId;
  readonly organizationId: OrganizationId;
  readonly name: string;
  readonly description: string | null;
  readonly type: "static" | "dynamic" | "smart";
  readonly criteria: { readonly [x: string]: JsonValue } | null;
  readonly color: "clay" | "sand" | "moss" | "sky" | "plum" | "rose" | null;
  readonly icon: string | null;
  readonly parentGroupId: ContactGroupId | null;
  readonly contactCount: number;
  readonly lastCalculatedAt: string | null;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const ContactGroupsUpdate200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: ContactGroupId,
    organizationId: OrganizationId,
    name: Schema.String,
    description: Schema.Union([Schema.String, Schema.Null]),
    type: Schema.Union([
      Schema.Literal("static"),
      Schema.Literal("dynamic"),
      Schema.Literal("smart"),
    ]),
    criteria: Schema.Union([Schema.Record(Schema.String, JsonValue), Schema.Null]),
    color: Schema.Union([
      Schema.Union([
        Schema.Literal("clay"),
        Schema.Literal("sand"),
        Schema.Literal("moss"),
        Schema.Literal("sky"),
        Schema.Literal("plum"),
        Schema.Literal("rose"),
      ]),
      Schema.Null,
    ]).annotate({
      description:
        "The list's label color, one of six families, or null for the neutral chip. Customer-chosen and purely presentational; it carries no meaning the API enforces.",
    }),
    icon: Schema.Union([Schema.String, Schema.Null]),
    parentGroupId: Schema.Union([ContactGroupId, Schema.Null]),
    contactCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    lastCalculatedAt: Schema.Union([Schema.String, Schema.Null]),
    isActive: Schema.Boolean,
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }))();
export type ContactGroupsUpdate401 = UnauthorizedError;
export const ContactGroupsUpdate401 = UnauthorizedError;
export type ContactGroupsUpdate403 = ForbiddenError;
export const ContactGroupsUpdate403 = ForbiddenError;
export type ContactGroupsUpdate404 = ResourceNotFoundError;
export const ContactGroupsUpdate404 = ResourceNotFoundError;
export type ContactGroupsUpdate422 = ValidationError;
export const ContactGroupsUpdate422 = ValidationError;
export type ContactGroupsUpdate500 = InternalError;
export const ContactGroupsUpdate500 = InternalError;
export type ContactGroupsUpdate504 = GatewayTimeoutError;
export const ContactGroupsUpdate504 = GatewayTimeoutError;
export type ContactGroupsEvaluateDynamicPathParams = { readonly id: ContactGroupId };
export const ContactGroupsEvaluateDynamicPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ContactGroupId }))();
export type ContactGroupsEvaluateDynamic200 = {
  readonly added: number;
  readonly removed: number;
  readonly total: number;
};
export const ContactGroupsEvaluateDynamic200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    added: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    removed: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    total: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  }))();
export type ContactGroupsEvaluateDynamic401 = UnauthorizedError;
export const ContactGroupsEvaluateDynamic401 = UnauthorizedError;
export type ContactGroupsEvaluateDynamic403 = ForbiddenError;
export const ContactGroupsEvaluateDynamic403 = ForbiddenError;
export type ContactGroupsEvaluateDynamic404 = ResourceNotFoundError;
export const ContactGroupsEvaluateDynamic404 = ResourceNotFoundError;
export type ContactGroupsEvaluateDynamic422 = ValidationError;
export const ContactGroupsEvaluateDynamic422 = ValidationError;
export type ContactGroupsEvaluateDynamic500 = InternalError;
export const ContactGroupsEvaluateDynamic500 = InternalError;
export type ContactGroupsEvaluateDynamic504 = GatewayTimeoutError;
export const ContactGroupsEvaluateDynamic504 = GatewayTimeoutError;
export type ContactGroupsGetMembersPathParams = { readonly id: ContactGroupId };
export const ContactGroupsGetMembersPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ContactGroupId }))();
export type ContactGroupsGetMembersQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
};
export const ContactGroupsGetMembersQuery = /* @__PURE__ */ (() =>
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
export type ContactGroupsGetMembers200 = ContactGroupMemberPage;
export const ContactGroupsGetMembers200 = ContactGroupMemberPage;
export type ContactGroupsGetMembers401 = UnauthorizedError;
export const ContactGroupsGetMembers401 = UnauthorizedError;
export type ContactGroupsGetMembers403 = ForbiddenError;
export const ContactGroupsGetMembers403 = ForbiddenError;
export type ContactGroupsGetMembers404 = ResourceNotFoundError;
export const ContactGroupsGetMembers404 = ResourceNotFoundError;
export type ContactGroupsGetMembers422 = ValidationError;
export const ContactGroupsGetMembers422 = ValidationError;
export type ContactGroupsGetMembers500 = InternalError;
export const ContactGroupsGetMembers500 = InternalError;
export type ContactGroupsGetMembers504 = GatewayTimeoutError;
export const ContactGroupsGetMembers504 = GatewayTimeoutError;
export type ContactGroupsAddMembersPathParams = { readonly id: ContactGroupId };
export const ContactGroupsAddMembersPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ContactGroupId }))();
export type ContactGroupsAddMembersRequestJson = {
  readonly contactIds: readonly [ContactId, ...Array<ContactId>];
  readonly role?: "member" | "moderator" | "admin" | null;
};
export const ContactGroupsAddMembersRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    contactIds: Schema.TupleWithRest(Schema.Tuple([ContactId]), [ContactId]).check(
      Schema.isMaxLength(1000).annotate({ expected: "a value with a length of at most 1000" }),
    ),
    role: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Literal("member"),
          Schema.Literal("moderator"),
          Schema.Literal("admin"),
        ]),
        Schema.Null,
      ]),
    ),
  }))();
export type ContactGroupsAddMembers200 = { readonly added: number; readonly skipped: number };
export const ContactGroupsAddMembers200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    added: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    skipped: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  }))();
export type ContactGroupsAddMembers401 = UnauthorizedError;
export const ContactGroupsAddMembers401 = UnauthorizedError;
export type ContactGroupsAddMembers403 = ForbiddenError;
export const ContactGroupsAddMembers403 = ForbiddenError;
export type ContactGroupsAddMembers404 = ResourceNotFoundError;
export const ContactGroupsAddMembers404 = ResourceNotFoundError;
export type ContactGroupsAddMembers422 = ValidationError;
export const ContactGroupsAddMembers422 = ValidationError;
export type ContactGroupsAddMembers500 = InternalError;
export const ContactGroupsAddMembers500 = InternalError;
export type ContactGroupsAddMembers504 = GatewayTimeoutError;
export const ContactGroupsAddMembers504 = GatewayTimeoutError;
export type ContactGroupsRemoveMembersPathParams = { readonly id: ContactGroupId };
export const ContactGroupsRemoveMembersPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ContactGroupId }))();
export type ContactGroupsRemoveMembersRequestJson = {
  readonly contactIds: readonly [ContactId, ...Array<ContactId>];
};
export const ContactGroupsRemoveMembersRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    contactIds: Schema.TupleWithRest(Schema.Tuple([ContactId]), [ContactId]).check(
      Schema.isMaxLength(1000).annotate({ expected: "a value with a length of at most 1000" }),
    ),
  }))();
export type ContactGroupsRemoveMembers200 = { readonly removed: number };
export const ContactGroupsRemoveMembers200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    removed: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  }))();
export type ContactGroupsRemoveMembers401 = UnauthorizedError;
export const ContactGroupsRemoveMembers401 = UnauthorizedError;
export type ContactGroupsRemoveMembers403 = ForbiddenError;
export const ContactGroupsRemoveMembers403 = ForbiddenError;
export type ContactGroupsRemoveMembers404 = ResourceNotFoundError;
export const ContactGroupsRemoveMembers404 = ResourceNotFoundError;
export type ContactGroupsRemoveMembers422 = ValidationError;
export const ContactGroupsRemoveMembers422 = ValidationError;
export type ContactGroupsRemoveMembers500 = InternalError;
export const ContactGroupsRemoveMembers500 = InternalError;
export type ContactGroupsRemoveMembers504 = GatewayTimeoutError;
export const ContactGroupsRemoveMembers504 = GatewayTimeoutError;
export type ContactGroupsPreviewRequestJson = {
  readonly criteria: {
    readonly tags?: ReadonlyArray<string> | null;
    readonly channels?: ReadonlyArray<string> | null;
    readonly match?: "all" | "any" | null;
    readonly conditions?: ReadonlyArray<{
      readonly field: string;
      readonly operator: string;
      readonly value: JsonValue;
    }> | null;
  };
};
export const ContactGroupsPreviewRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    criteria: Schema.Struct({
      tags: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
      channels: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
      match: Schema.optionalKey(
        Schema.Union([Schema.Union([Schema.Literal("all"), Schema.Literal("any")]), Schema.Null]),
      ),
      conditions: Schema.optionalKey(
        Schema.Union([
          Schema.Array(
            Schema.Struct({ field: Schema.String, operator: Schema.String, value: JsonValue }),
          ),
          Schema.Null,
        ]),
      ),
    }),
  }))();
export type ContactGroupsPreview200 = {
  readonly count: number;
  readonly sample: ReadonlyArray<{
    readonly id: ContactId;
    readonly name: string;
    readonly status: string;
  }>;
};
export const ContactGroupsPreview200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    count: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    sample: Schema.Array(
      Schema.Struct({ id: ContactId, name: Schema.String, status: Schema.String }),
    ),
  }))();
export type ContactGroupsPreview401 = UnauthorizedError;
export const ContactGroupsPreview401 = UnauthorizedError;
export type ContactGroupsPreview403 = ForbiddenError;
export const ContactGroupsPreview403 = ForbiddenError;
export type ContactGroupsPreview422 = ValidationError;
export const ContactGroupsPreview422 = ValidationError;
export type ContactGroupsPreview500 = InternalError;
export const ContactGroupsPreview500 = InternalError;
export type ContactGroupsPreview504 = GatewayTimeoutError;
export const ContactGroupsPreview504 = GatewayTimeoutError;

export class ContactGroupsGroup extends HttpApiGroup.make("Contact Groups")
  .add(
    HttpApiEndpoint.get("contactGroupsList", "/v1/contact-groups", {
      query: ContactGroupsListQuery,
      success: ContactGroupsList200,
      error: [
        ContactGroupsList401.pipe(HttpApiSchema.status(401)),
        ContactGroupsList403.pipe(HttpApiSchema.status(403)),
        ContactGroupsList422.pipe(HttpApiSchema.status(422)),
        ContactGroupsList500,
        ContactGroupsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contactGroups.list")
      .annotate(OpenApi.Summary, "List contact groups")
      .annotate(
        OpenApi.Description,
        "Returns the organization's contact groups, newest first, filterable by type and active state. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.post("contactGroupsCreate", "/v1/contact-groups", {
      payload: ContactGroupsCreateRequestJson,
      success: ContactGroupsCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        ContactGroupsCreate401.pipe(HttpApiSchema.status(401)),
        ContactGroupsCreate403.pipe(HttpApiSchema.status(403)),
        ContactGroupsCreate422.pipe(HttpApiSchema.status(422)),
        ContactGroupsCreate500,
        ContactGroupsCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contactGroups.create")
      .annotate(OpenApi.Summary, "Create a contact group")
      .annotate(
        OpenApi.Description,
        "Creates a new contact group and returns it with a 201 status.",
      ),
    HttpApiEndpoint.get("contactGroupsGetById", "/v1/contact-groups/:id", {
      params: ContactGroupsGetByIdPathParams,
      success: ContactGroupsGetById200,
      error: [
        ContactGroupsGetById401.pipe(HttpApiSchema.status(401)),
        ContactGroupsGetById403.pipe(HttpApiSchema.status(403)),
        ContactGroupsGetById404.pipe(HttpApiSchema.status(404)),
        ContactGroupsGetById422.pipe(HttpApiSchema.status(422)),
        ContactGroupsGetById500,
        ContactGroupsGetById504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contactGroups.getById")
      .annotate(OpenApi.Summary, "Get a contact group")
      .annotate(OpenApi.Description, "Returns a single contact group by its ID."),
    HttpApiEndpoint.delete("contactGroupsRemove", "/v1/contact-groups/:id", {
      params: ContactGroupsRemovePathParams,
      success: ContactGroupsRemove200,
      error: [
        ContactGroupsRemove401.pipe(HttpApiSchema.status(401)),
        ContactGroupsRemove403.pipe(HttpApiSchema.status(403)),
        ContactGroupsRemove404.pipe(HttpApiSchema.status(404)),
        ContactGroupsRemove422.pipe(HttpApiSchema.status(422)),
        ContactGroupsRemove500,
        ContactGroupsRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contactGroups.remove")
      .annotate(OpenApi.Summary, "Delete a contact group")
      .annotate(OpenApi.Description, "Permanently deletes a contact group by its ID."),
    HttpApiEndpoint.patch("contactGroupsUpdate", "/v1/contact-groups/:id", {
      params: ContactGroupsUpdatePathParams,
      payload: ContactGroupsUpdateRequestJson,
      success: ContactGroupsUpdate200,
      error: [
        ContactGroupsUpdate401.pipe(HttpApiSchema.status(401)),
        ContactGroupsUpdate403.pipe(HttpApiSchema.status(403)),
        ContactGroupsUpdate404.pipe(HttpApiSchema.status(404)),
        ContactGroupsUpdate422.pipe(HttpApiSchema.status(422)),
        ContactGroupsUpdate500,
        ContactGroupsUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contactGroups.update")
      .annotate(OpenApi.Summary, "Update a contact group")
      .annotate(
        OpenApi.Description,
        "Updates an existing contact group's fields and returns the updated group.",
      ),
    HttpApiEndpoint.post("contactGroupsEvaluateDynamic", "/v1/contact-groups/:id/evaluate", {
      params: ContactGroupsEvaluateDynamicPathParams,
      success: ContactGroupsEvaluateDynamic200,
      error: [
        ContactGroupsEvaluateDynamic401.pipe(HttpApiSchema.status(401)),
        ContactGroupsEvaluateDynamic403.pipe(HttpApiSchema.status(403)),
        ContactGroupsEvaluateDynamic404.pipe(HttpApiSchema.status(404)),
        ContactGroupsEvaluateDynamic422.pipe(HttpApiSchema.status(422)),
        ContactGroupsEvaluateDynamic500,
        ContactGroupsEvaluateDynamic504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contactGroups.evaluateDynamic")
      .annotate(OpenApi.Summary, "Evaluate a dynamic contact group")
      .annotate(
        OpenApi.Description,
        "Recomputes a dynamic contact group's membership from its criteria, returning counts of added, removed, and total members.",
      ),
    HttpApiEndpoint.get("contactGroupsGetMembers", "/v1/contact-groups/:id/members", {
      params: ContactGroupsGetMembersPathParams,
      query: ContactGroupsGetMembersQuery,
      success: ContactGroupsGetMembers200,
      error: [
        ContactGroupsGetMembers401.pipe(HttpApiSchema.status(401)),
        ContactGroupsGetMembers403.pipe(HttpApiSchema.status(403)),
        ContactGroupsGetMembers404.pipe(HttpApiSchema.status(404)),
        ContactGroupsGetMembers422.pipe(HttpApiSchema.status(422)),
        ContactGroupsGetMembers500,
        ContactGroupsGetMembers504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contactGroups.getMembers")
      .annotate(OpenApi.Summary, "List members of a contact group")
      .annotate(
        OpenApi.Description,
        "Returns a contact group's members, most recently joined first. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.post("contactGroupsAddMembers", "/v1/contact-groups/:id/members", {
      params: ContactGroupsAddMembersPathParams,
      payload: ContactGroupsAddMembersRequestJson,
      success: ContactGroupsAddMembers200,
      error: [
        ContactGroupsAddMembers401.pipe(HttpApiSchema.status(401)),
        ContactGroupsAddMembers403.pipe(HttpApiSchema.status(403)),
        ContactGroupsAddMembers404.pipe(HttpApiSchema.status(404)),
        ContactGroupsAddMembers422.pipe(HttpApiSchema.status(422)),
        ContactGroupsAddMembers500,
        ContactGroupsAddMembers504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contactGroups.addMembers")
      .annotate(OpenApi.Summary, "Add members to a contact group")
      .annotate(
        OpenApi.Description,
        "Adds one or more contacts to a contact group, returning counts of added and skipped members. One request carries at most 1000 ids.",
      ),
    HttpApiEndpoint.delete("contactGroupsRemoveMembers", "/v1/contact-groups/:id/members", {
      params: ContactGroupsRemoveMembersPathParams,
      payload: ContactGroupsRemoveMembersRequestJson,
      success: ContactGroupsRemoveMembers200,
      error: [
        ContactGroupsRemoveMembers401.pipe(HttpApiSchema.status(401)),
        ContactGroupsRemoveMembers403.pipe(HttpApiSchema.status(403)),
        ContactGroupsRemoveMembers404.pipe(HttpApiSchema.status(404)),
        ContactGroupsRemoveMembers422.pipe(HttpApiSchema.status(422)),
        ContactGroupsRemoveMembers500,
        ContactGroupsRemoveMembers504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contactGroups.removeMembers")
      .annotate(OpenApi.Summary, "Remove members from a contact group")
      .annotate(
        OpenApi.Description,
        "Removes one or more contacts from a contact group, returning the count of removed members. One request carries at most 1000 ids.",
      ),
    HttpApiEndpoint.post("contactGroupsPreview", "/v1/contact-groups/preview", {
      payload: ContactGroupsPreviewRequestJson,
      success: ContactGroupsPreview200,
      error: [
        ContactGroupsPreview401.pipe(HttpApiSchema.status(401)),
        ContactGroupsPreview403.pipe(HttpApiSchema.status(403)),
        ContactGroupsPreview422.pipe(HttpApiSchema.status(422)),
        ContactGroupsPreview500,
        ContactGroupsPreview504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contactGroups.preview")
      .annotate(OpenApi.Summary, "Preview contact group criteria")
      .annotate(
        OpenApi.Description,
        "Evaluates group criteria without persisting, returning the matching contact count and a sample of matches.",
      ),
  )
  .annotate(
    OpenApi.Description,
    "Segment management — static and dynamic groups with membership operations",
  ) {}
