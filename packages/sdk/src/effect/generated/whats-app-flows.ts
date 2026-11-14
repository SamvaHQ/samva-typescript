// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  ConflictError,
  CredentialsError,
  FlagDisabledError,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  MalformedRequestError,
  ResourceNotFoundError,
  ServiceUnavailableError,
  TemplateProjectId,
  UnauthorizedError,
  ValidationError,
  WhatsAppBusinessAccountId,
  WhatsAppChannelError,
  WhatsAppFlowId,
  WhatsAppFlowVersionId,
  __SamvaRuntimeSensitiveString,
} from "./shared";

export type WhatsAppFlowEndpoint = { readonly url: string; readonly updatedAt: string };
export const WhatsAppFlowEndpoint = /* @__PURE__ */ (() =>
  Schema.Struct({ url: Schema.String, updatedAt: Schema.String }).annotate({
    identifier: "WhatsAppFlowEndpoint",
  }))();
export type WhatsAppFlowRegistrationId = string & EffectBrand.Brand<"WhatsAppFlowRegistrationId">;
export const WhatsAppFlowRegistrationId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new globalThis.RegExp("^wafreg_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^wafreg_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "WhatsAppFlowRegistrationId",
    }),
  ).pipe(Schema.brand("WhatsAppFlowRegistrationId")))();
export type WhatsAppFlowValidationError = {
  readonly error: string;
  readonly message: string;
  readonly path?: string;
  readonly line?: number;
  readonly column?: number;
};
export const WhatsAppFlowValidationError = /* @__PURE__ */ (() =>
  Schema.Struct({
    error: Schema.String,
    message: Schema.String,
    path: Schema.optionalKey(Schema.String),
    line: Schema.optionalKey(
      Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    ),
    column: Schema.optionalKey(
      Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    ),
  }).annotate({ identifier: "WhatsAppFlowValidationError" }))();
export type WhatsAppFlowEndpointAlert = {
  readonly kind: string;
  readonly message: string;
  readonly value: number | null;
  readonly threshold: number | null;
  readonly activatedAt: string;
};
export const WhatsAppFlowEndpointAlert = /* @__PURE__ */ (() =>
  Schema.Struct({
    kind: Schema.String,
    message: Schema.String,
    value: Schema.Union([
      Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
      Schema.Null,
    ]),
    threshold: Schema.Union([
      Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
      Schema.Null,
    ]),
    activatedAt: Schema.String,
  }).annotate({ identifier: "WhatsAppFlowEndpointAlert" }))();
export type WhatsAppFlowEncryptionKey = {
  readonly wabaId: string;
  readonly publicKey: string;
  readonly phoneNumberIds: ReadonlyArray<string>;
  readonly createdAt: string;
};
export const WhatsAppFlowEncryptionKey = /* @__PURE__ */ (() =>
  Schema.Struct({
    wabaId: Schema.String,
    publicKey: Schema.String,
    phoneNumberIds: Schema.Array(Schema.String),
    createdAt: Schema.String,
  }).annotate({ identifier: "WhatsAppFlowEncryptionKey" }))();
export type WhatsAppFlowEndpointSettings = {
  readonly url: string;
  readonly updatedAt: string;
  readonly secret?: __SamvaRuntimeSensitiveString;
};
export const WhatsAppFlowEndpointSettings = /* @__PURE__ */ (() =>
  Schema.Struct({
    url: Schema.String,
    updatedAt: Schema.String,
    secret: Schema.optionalKey(__SamvaRuntimeSensitiveString),
  }).annotate({ identifier: "WhatsAppFlowEndpointSettings" }))();
export type WhatsAppFlowVersion = {
  readonly id: WhatsAppFlowVersionId;
  readonly flowId: WhatsAppFlowId;
  readonly number: number;
  readonly commitSha: string;
  readonly digest: string;
  readonly jsonVersion: string;
  readonly screens: ReadonlyArray<string>;
  readonly dataExchange: boolean;
  readonly createdAt: string;
};
export const WhatsAppFlowVersion = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: WhatsAppFlowVersionId,
    flowId: WhatsAppFlowId,
    number: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    commitSha: Schema.String.check(
      Schema.isPattern(new globalThis.RegExp("^[a-f0-9]{40}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{40}$",
      }),
    ),
    digest: Schema.String.check(
      Schema.isPattern(new globalThis.RegExp("^[a-f0-9]{64}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{64}$",
      }),
    ),
    jsonVersion: Schema.String,
    screens: Schema.Array(Schema.String),
    dataExchange: Schema.Boolean,
    createdAt: Schema.String,
  }).annotate({ identifier: "WhatsAppFlowVersion" }))();
export type WhatsAppFlowRegistration = {
  readonly id: WhatsAppFlowRegistrationId;
  readonly flowId: WhatsAppFlowId;
  readonly versionId: WhatsAppFlowVersionId;
  readonly versionNumber: number;
  readonly wabaId: string;
  readonly providerFlowId: string | null;
  readonly name: string;
  readonly status: "draft" | "published" | "throttled" | "blocked" | "deprecated";
  readonly validationErrors: ReadonlyArray<WhatsAppFlowValidationError>;
  readonly endpointAlerts: ReadonlyArray<WhatsAppFlowEndpointAlert>;
  readonly publishedAt: string | null;
  readonly statusChangedAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const WhatsAppFlowRegistration = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: WhatsAppFlowRegistrationId,
    flowId: WhatsAppFlowId,
    versionId: WhatsAppFlowVersionId,
    versionNumber: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    wabaId: Schema.String,
    providerFlowId: Schema.Union([Schema.String, Schema.Null]),
    name: Schema.String,
    status: Schema.Union([
      Schema.Literal("draft"),
      Schema.Literal("published"),
      Schema.Literal("throttled"),
      Schema.Literal("blocked"),
      Schema.Literal("deprecated"),
    ]),
    validationErrors: Schema.Array(WhatsAppFlowValidationError),
    endpointAlerts: Schema.Array(WhatsAppFlowEndpointAlert),
    publishedAt: Schema.Union([Schema.String, Schema.Null]),
    statusChangedAt: Schema.String,
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "WhatsAppFlowRegistration" }))();
export type WhatsAppFlow = {
  readonly id: WhatsAppFlowId;
  readonly projectId: TemplateProjectId;
  readonly handle: string;
  readonly path: string;
  readonly categories: ReadonlyArray<
    | "SIGN_UP"
    | "SIGN_IN"
    | "APPOINTMENT_BOOKING"
    | "LEAD_GENERATION"
    | "CONTACT_US"
    | "CUSTOMER_SUPPORT"
    | "SURVEY"
    | "OTHER"
  >;
  readonly endpoint: WhatsAppFlowEndpoint | null;
  readonly currentVersion: WhatsAppFlowVersion | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const WhatsAppFlow = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: WhatsAppFlowId,
    projectId: TemplateProjectId,
    handle: Schema.String.check(
      Schema.isMaxCodePoints(64).annotate({ expected: "a string with at most 64 code points" }),
    )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-z0-9]+(?:-[a-z0-9]+)*$",
        }),
      )
      .check(Schema.isMaxLength(64).annotate({ expected: "a value with a length of at most 64" })),
    path: Schema.String,
    categories: Schema.Array(
      Schema.Union([
        Schema.Literal("SIGN_UP"),
        Schema.Literal("SIGN_IN"),
        Schema.Literal("APPOINTMENT_BOOKING"),
        Schema.Literal("LEAD_GENERATION"),
        Schema.Literal("CONTACT_US"),
        Schema.Literal("CUSTOMER_SUPPORT"),
        Schema.Literal("SURVEY"),
        Schema.Literal("OTHER"),
      ]),
    ),
    endpoint: Schema.Union([WhatsAppFlowEndpoint, Schema.Null]),
    currentVersion: Schema.Union([WhatsAppFlowVersion, Schema.Null]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "WhatsAppFlow" }))();
export type WhatsAppFlowVersionList = { readonly data: ReadonlyArray<WhatsAppFlowVersion> };
export const WhatsAppFlowVersionList = /* @__PURE__ */ (() =>
  Schema.Struct({ data: Schema.Array(WhatsAppFlowVersion) }).annotate({
    identifier: "WhatsAppFlowVersionList",
  }))();
export type WhatsAppFlowRegistrationList = {
  readonly data: ReadonlyArray<WhatsAppFlowRegistration>;
};
export const WhatsAppFlowRegistrationList = /* @__PURE__ */ (() =>
  Schema.Struct({ data: Schema.Array(WhatsAppFlowRegistration) }).annotate({
    identifier: "WhatsAppFlowRegistrationList",
  }))();
export type WhatsAppFlowList = { readonly data: ReadonlyArray<WhatsAppFlow> };
export const WhatsAppFlowList = /* @__PURE__ */ (() =>
  Schema.Struct({ data: Schema.Array(WhatsAppFlow) }).annotate({
    identifier: "WhatsAppFlowList",
  }))();
export type WhatsappFlowsList200 = WhatsAppFlowList;
export const WhatsappFlowsList200 = WhatsAppFlowList;
export type WhatsappFlowsList400 = MalformedRequestError;
export const WhatsappFlowsList400 = MalformedRequestError;
export type WhatsappFlowsList401 = UnauthorizedError;
export const WhatsappFlowsList401 = UnauthorizedError;
export type WhatsappFlowsList403 = FlagDisabledError | ForbiddenError;
export const WhatsappFlowsList403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type WhatsappFlowsList422 = ValidationError;
export const WhatsappFlowsList422 = ValidationError;
export type WhatsappFlowsList500 = InternalError;
export const WhatsappFlowsList500 = InternalError;
export type WhatsappFlowsList504 = GatewayTimeoutError;
export const WhatsappFlowsList504 = GatewayTimeoutError;
export type WhatsappFlowsCreateRequestJson = {
  readonly projectId: TemplateProjectId;
  readonly handle: string;
  readonly categories: ReadonlyArray<
    | "SIGN_UP"
    | "SIGN_IN"
    | "APPOINTMENT_BOOKING"
    | "LEAD_GENERATION"
    | "CONTACT_US"
    | "CUSTOMER_SUPPORT"
    | "SURVEY"
    | "OTHER"
  >;
};
export const WhatsappFlowsCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    projectId: TemplateProjectId,
    handle: Schema.String.check(
      Schema.isMaxCodePoints(64).annotate({ expected: "a string with at most 64 code points" }),
    )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-z0-9]+(?:-[a-z0-9]+)*$",
        }),
      )
      .check(Schema.isMaxLength(64).annotate({ expected: "a value with a length of at most 64" })),
    categories: Schema.Array(
      Schema.Union([
        Schema.Literal("SIGN_UP"),
        Schema.Literal("SIGN_IN"),
        Schema.Literal("APPOINTMENT_BOOKING"),
        Schema.Literal("LEAD_GENERATION"),
        Schema.Literal("CONTACT_US"),
        Schema.Literal("CUSTOMER_SUPPORT"),
        Schema.Literal("SURVEY"),
        Schema.Literal("OTHER"),
      ]),
    ).check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" })),
  }))();
export type WhatsappFlowsCreate201 = WhatsAppFlow;
export const WhatsappFlowsCreate201 = WhatsAppFlow;
export type WhatsappFlowsCreate400 = MalformedRequestError;
export const WhatsappFlowsCreate400 = MalformedRequestError;
export type WhatsappFlowsCreate401 = UnauthorizedError;
export const WhatsappFlowsCreate401 = UnauthorizedError;
export type WhatsappFlowsCreate403 = FlagDisabledError | ForbiddenError;
export const WhatsappFlowsCreate403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type WhatsappFlowsCreate404 = ResourceNotFoundError;
export const WhatsappFlowsCreate404 = ResourceNotFoundError;
export type WhatsappFlowsCreate409 = ConflictError;
export const WhatsappFlowsCreate409 = ConflictError;
export type WhatsappFlowsCreate422 = ValidationError;
export const WhatsappFlowsCreate422 = ValidationError;
export type WhatsappFlowsCreate500 = InternalError;
export const WhatsappFlowsCreate500 = InternalError;
export type WhatsappFlowsCreate504 = GatewayTimeoutError;
export const WhatsappFlowsCreate504 = GatewayTimeoutError;
export type WhatsappFlowsGetPathParams = { readonly id: WhatsAppFlowId };
export const WhatsappFlowsGetPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: WhatsAppFlowId }))();
export type WhatsappFlowsGet200 = WhatsAppFlow;
export const WhatsappFlowsGet200 = WhatsAppFlow;
export type WhatsappFlowsGet400 = MalformedRequestError;
export const WhatsappFlowsGet400 = MalformedRequestError;
export type WhatsappFlowsGet401 = UnauthorizedError;
export const WhatsappFlowsGet401 = UnauthorizedError;
export type WhatsappFlowsGet403 = FlagDisabledError | ForbiddenError;
export const WhatsappFlowsGet403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type WhatsappFlowsGet404 = ResourceNotFoundError;
export const WhatsappFlowsGet404 = ResourceNotFoundError;
export type WhatsappFlowsGet422 = ValidationError;
export const WhatsappFlowsGet422 = ValidationError;
export type WhatsappFlowsGet500 = InternalError;
export const WhatsappFlowsGet500 = InternalError;
export type WhatsappFlowsGet504 = GatewayTimeoutError;
export const WhatsappFlowsGet504 = GatewayTimeoutError;
export type WhatsappFlowsSetEndpointPathParams = { readonly id: WhatsAppFlowId };
export const WhatsappFlowsSetEndpointPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: WhatsAppFlowId }))();
export type WhatsappFlowsSetEndpointRequestJson = { readonly url: string };
export const WhatsappFlowsSetEndpointRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ url: Schema.String }))();
export type WhatsappFlowsSetEndpoint200 = WhatsAppFlowEndpointSettings;
export const WhatsappFlowsSetEndpoint200 = WhatsAppFlowEndpointSettings;
export type WhatsappFlowsSetEndpoint400 = MalformedRequestError;
export const WhatsappFlowsSetEndpoint400 = MalformedRequestError;
export type WhatsappFlowsSetEndpoint401 = UnauthorizedError;
export const WhatsappFlowsSetEndpoint401 = UnauthorizedError;
export type WhatsappFlowsSetEndpoint403 = FlagDisabledError | ForbiddenError;
export const WhatsappFlowsSetEndpoint403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type WhatsappFlowsSetEndpoint404 = ResourceNotFoundError;
export const WhatsappFlowsSetEndpoint404 = ResourceNotFoundError;
export type WhatsappFlowsSetEndpoint422 = ValidationError;
export const WhatsappFlowsSetEndpoint422 = ValidationError;
export type WhatsappFlowsSetEndpoint500 = CredentialsError | InternalError;
export const WhatsappFlowsSetEndpoint500 = /* @__PURE__ */ (() =>
  Schema.Union([CredentialsError, InternalError]))();
export type WhatsappFlowsSetEndpoint504 = GatewayTimeoutError;
export const WhatsappFlowsSetEndpoint504 = GatewayTimeoutError;
export type WhatsappFlowsRotateEndpointSecretPathParams = { readonly id: WhatsAppFlowId };
export const WhatsappFlowsRotateEndpointSecretPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: WhatsAppFlowId }))();
export type WhatsappFlowsRotateEndpointSecret200 = WhatsAppFlowEndpointSettings;
export const WhatsappFlowsRotateEndpointSecret200 = WhatsAppFlowEndpointSettings;
export type WhatsappFlowsRotateEndpointSecret400 = MalformedRequestError;
export const WhatsappFlowsRotateEndpointSecret400 = MalformedRequestError;
export type WhatsappFlowsRotateEndpointSecret401 = UnauthorizedError;
export const WhatsappFlowsRotateEndpointSecret401 = UnauthorizedError;
export type WhatsappFlowsRotateEndpointSecret403 = FlagDisabledError | ForbiddenError;
export const WhatsappFlowsRotateEndpointSecret403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type WhatsappFlowsRotateEndpointSecret404 = ResourceNotFoundError;
export const WhatsappFlowsRotateEndpointSecret404 = ResourceNotFoundError;
export type WhatsappFlowsRotateEndpointSecret422 = ValidationError;
export const WhatsappFlowsRotateEndpointSecret422 = ValidationError;
export type WhatsappFlowsRotateEndpointSecret500 = CredentialsError | InternalError;
export const WhatsappFlowsRotateEndpointSecret500 = /* @__PURE__ */ (() =>
  Schema.Union([CredentialsError, InternalError]))();
export type WhatsappFlowsRotateEndpointSecret504 = GatewayTimeoutError;
export const WhatsappFlowsRotateEndpointSecret504 = GatewayTimeoutError;
export type WhatsappFlowsListRegistrationsPathParams = { readonly id: WhatsAppFlowId };
export const WhatsappFlowsListRegistrationsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: WhatsAppFlowId }))();
export type WhatsappFlowsListRegistrations200 = WhatsAppFlowRegistrationList;
export const WhatsappFlowsListRegistrations200 = WhatsAppFlowRegistrationList;
export type WhatsappFlowsListRegistrations400 = MalformedRequestError;
export const WhatsappFlowsListRegistrations400 = MalformedRequestError;
export type WhatsappFlowsListRegistrations401 = UnauthorizedError;
export const WhatsappFlowsListRegistrations401 = UnauthorizedError;
export type WhatsappFlowsListRegistrations403 = FlagDisabledError | ForbiddenError;
export const WhatsappFlowsListRegistrations403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type WhatsappFlowsListRegistrations404 = ResourceNotFoundError;
export const WhatsappFlowsListRegistrations404 = ResourceNotFoundError;
export type WhatsappFlowsListRegistrations422 = ValidationError;
export const WhatsappFlowsListRegistrations422 = ValidationError;
export type WhatsappFlowsListRegistrations500 = InternalError;
export const WhatsappFlowsListRegistrations500 = InternalError;
export type WhatsappFlowsListRegistrations504 = GatewayTimeoutError;
export const WhatsappFlowsListRegistrations504 = GatewayTimeoutError;
export type WhatsappFlowsRegisterPathParams = { readonly id: WhatsAppFlowId };
export const WhatsappFlowsRegisterPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: WhatsAppFlowId }))();
export type WhatsappFlowsRegisterRequestJson = {
  readonly businessAccountId?: WhatsAppBusinessAccountId;
};
export const WhatsappFlowsRegisterRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ businessAccountId: Schema.optionalKey(WhatsAppBusinessAccountId) }))();
export type WhatsappFlowsRegister201 = WhatsAppFlowRegistration;
export const WhatsappFlowsRegister201 = WhatsAppFlowRegistration;
export type WhatsappFlowsRegister400 = MalformedRequestError;
export const WhatsappFlowsRegister400 = MalformedRequestError;
export type WhatsappFlowsRegister401 = UnauthorizedError;
export const WhatsappFlowsRegister401 = UnauthorizedError;
export type WhatsappFlowsRegister403 = FlagDisabledError | ForbiddenError;
export const WhatsappFlowsRegister403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type WhatsappFlowsRegister404 = ResourceNotFoundError;
export const WhatsappFlowsRegister404 = ResourceNotFoundError;
export type WhatsappFlowsRegister409 = ConflictError;
export const WhatsappFlowsRegister409 = ConflictError;
export type WhatsappFlowsRegister422 = ValidationError;
export const WhatsappFlowsRegister422 = ValidationError;
export type WhatsappFlowsRegister500 = CredentialsError | InternalError;
export const WhatsappFlowsRegister500 = /* @__PURE__ */ (() =>
  Schema.Union([CredentialsError, InternalError]))();
export type WhatsappFlowsRegister502 = WhatsAppChannelError;
export const WhatsappFlowsRegister502 = WhatsAppChannelError;
export type WhatsappFlowsRegister504 = GatewayTimeoutError;
export const WhatsappFlowsRegister504 = GatewayTimeoutError;
export type WhatsappFlowsListVersionsPathParams = { readonly id: WhatsAppFlowId };
export const WhatsappFlowsListVersionsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: WhatsAppFlowId }))();
export type WhatsappFlowsListVersions200 = WhatsAppFlowVersionList;
export const WhatsappFlowsListVersions200 = WhatsAppFlowVersionList;
export type WhatsappFlowsListVersions400 = MalformedRequestError;
export const WhatsappFlowsListVersions400 = MalformedRequestError;
export type WhatsappFlowsListVersions401 = UnauthorizedError;
export const WhatsappFlowsListVersions401 = UnauthorizedError;
export type WhatsappFlowsListVersions403 = FlagDisabledError | ForbiddenError;
export const WhatsappFlowsListVersions403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type WhatsappFlowsListVersions404 = ResourceNotFoundError;
export const WhatsappFlowsListVersions404 = ResourceNotFoundError;
export type WhatsappFlowsListVersions422 = ValidationError;
export const WhatsappFlowsListVersions422 = ValidationError;
export type WhatsappFlowsListVersions500 = InternalError;
export const WhatsappFlowsListVersions500 = InternalError;
export type WhatsappFlowsListVersions504 = GatewayTimeoutError;
export const WhatsappFlowsListVersions504 = GatewayTimeoutError;
export type WhatsappFlowsRecordVersionPathParams = { readonly id: WhatsAppFlowId };
export const WhatsappFlowsRecordVersionPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: WhatsAppFlowId }))();
export type WhatsappFlowsRecordVersionRequestJson = {
  readonly commitSha: string;
  readonly expectedWorkspaceRevision: string;
};
export const WhatsappFlowsRecordVersionRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    commitSha: Schema.String.check(
      Schema.isPattern(new globalThis.RegExp("^[a-f0-9]{40}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{40}$",
      }),
    ),
    expectedWorkspaceRevision: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
  }))();
export type WhatsappFlowsRecordVersion201 = WhatsAppFlowVersion;
export const WhatsappFlowsRecordVersion201 = WhatsAppFlowVersion;
export type WhatsappFlowsRecordVersion400 = MalformedRequestError;
export const WhatsappFlowsRecordVersion400 = MalformedRequestError;
export type WhatsappFlowsRecordVersion401 = UnauthorizedError;
export const WhatsappFlowsRecordVersion401 = UnauthorizedError;
export type WhatsappFlowsRecordVersion403 = FlagDisabledError | ForbiddenError;
export const WhatsappFlowsRecordVersion403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type WhatsappFlowsRecordVersion404 = ResourceNotFoundError;
export const WhatsappFlowsRecordVersion404 = ResourceNotFoundError;
export type WhatsappFlowsRecordVersion409 = ConflictError;
export const WhatsappFlowsRecordVersion409 = ConflictError;
export type WhatsappFlowsRecordVersion422 = ValidationError;
export const WhatsappFlowsRecordVersion422 = ValidationError;
export type WhatsappFlowsRecordVersion500 = InternalError;
export const WhatsappFlowsRecordVersion500 = InternalError;
export type WhatsappFlowsRecordVersion503 = ServiceUnavailableError;
export const WhatsappFlowsRecordVersion503 = ServiceUnavailableError;
export type WhatsappFlowsRecordVersion504 = GatewayTimeoutError;
export const WhatsappFlowsRecordVersion504 = GatewayTimeoutError;
export type WhatsappFlowsRotateEncryptionKeyRequestJson = {
  readonly businessAccountId?: WhatsAppBusinessAccountId;
};
export const WhatsappFlowsRotateEncryptionKeyRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ businessAccountId: Schema.optionalKey(WhatsAppBusinessAccountId) }))();
export type WhatsappFlowsRotateEncryptionKey200 = WhatsAppFlowEncryptionKey;
export const WhatsappFlowsRotateEncryptionKey200 = WhatsAppFlowEncryptionKey;
export type WhatsappFlowsRotateEncryptionKey400 = MalformedRequestError;
export const WhatsappFlowsRotateEncryptionKey400 = MalformedRequestError;
export type WhatsappFlowsRotateEncryptionKey401 = UnauthorizedError;
export const WhatsappFlowsRotateEncryptionKey401 = UnauthorizedError;
export type WhatsappFlowsRotateEncryptionKey403 = FlagDisabledError | ForbiddenError;
export const WhatsappFlowsRotateEncryptionKey403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type WhatsappFlowsRotateEncryptionKey404 = ResourceNotFoundError;
export const WhatsappFlowsRotateEncryptionKey404 = ResourceNotFoundError;
export type WhatsappFlowsRotateEncryptionKey422 = ValidationError;
export const WhatsappFlowsRotateEncryptionKey422 = ValidationError;
export type WhatsappFlowsRotateEncryptionKey500 = CredentialsError | InternalError;
export const WhatsappFlowsRotateEncryptionKey500 = /* @__PURE__ */ (() =>
  Schema.Union([CredentialsError, InternalError]))();
export type WhatsappFlowsRotateEncryptionKey502 = WhatsAppChannelError;
export const WhatsappFlowsRotateEncryptionKey502 = WhatsAppChannelError;
export type WhatsappFlowsRotateEncryptionKey504 = GatewayTimeoutError;
export const WhatsappFlowsRotateEncryptionKey504 = GatewayTimeoutError;

export class WhatsAppFlowsGroup extends HttpApiGroup.make("WhatsApp flows")
  .add(
    HttpApiEndpoint.get("whatsappFlowsList", "/v1/whatsapp/flows", {
      success: WhatsappFlowsList200,
      error: [
        WhatsappFlowsList400.pipe(HttpApiSchema.status(400)),
        WhatsappFlowsList401.pipe(HttpApiSchema.status(401)),
        WhatsappFlowsList403.pipe(HttpApiSchema.status(403)),
        WhatsappFlowsList422.pipe(HttpApiSchema.status(422)),
        WhatsappFlowsList500,
        WhatsappFlowsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsappFlows.list")
      .annotate(OpenApi.Summary, "List flows")
      .annotate(
        OpenApi.Description,
        "Returns the organization's flows, newest first, each with its current version.",
      ),
    HttpApiEndpoint.post("whatsappFlowsCreate", "/v1/whatsapp/flows", {
      payload: WhatsappFlowsCreateRequestJson,
      success: WhatsappFlowsCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        WhatsappFlowsCreate400.pipe(HttpApiSchema.status(400)),
        WhatsappFlowsCreate401.pipe(HttpApiSchema.status(401)),
        WhatsappFlowsCreate403.pipe(HttpApiSchema.status(403)),
        WhatsappFlowsCreate404.pipe(HttpApiSchema.status(404)),
        WhatsappFlowsCreate409.pipe(HttpApiSchema.status(409)),
        WhatsappFlowsCreate422.pipe(HttpApiSchema.status(422)),
        WhatsappFlowsCreate500,
        WhatsappFlowsCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsappFlows.create")
      .annotate(OpenApi.Summary, "Create a flow")
      .annotate(
        OpenApi.Description,
        "Creates a WhatsApp flow whose versions read `flows/<handle>.json` in the template project. The handle is unique in the organization; the categories are Meta's and go with every version to Meta.",
      ),
    HttpApiEndpoint.get("whatsappFlowsGet", "/v1/whatsapp/flows/:id", {
      params: WhatsappFlowsGetPathParams,
      success: WhatsappFlowsGet200,
      error: [
        WhatsappFlowsGet400.pipe(HttpApiSchema.status(400)),
        WhatsappFlowsGet401.pipe(HttpApiSchema.status(401)),
        WhatsappFlowsGet403.pipe(HttpApiSchema.status(403)),
        WhatsappFlowsGet404.pipe(HttpApiSchema.status(404)),
        WhatsappFlowsGet422.pipe(HttpApiSchema.status(422)),
        WhatsappFlowsGet500,
        WhatsappFlowsGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsappFlows.get")
      .annotate(OpenApi.Summary, "Get a flow")
      .annotate(OpenApi.Description, "Returns one flow by its ID."),
    HttpApiEndpoint.put("whatsappFlowsSetEndpoint", "/v1/whatsapp/flows/:id/endpoint", {
      params: WhatsappFlowsSetEndpointPathParams,
      payload: WhatsappFlowsSetEndpointRequestJson,
      success: WhatsappFlowsSetEndpoint200,
      error: [
        WhatsappFlowsSetEndpoint400.pipe(HttpApiSchema.status(400)),
        WhatsappFlowsSetEndpoint401.pipe(HttpApiSchema.status(401)),
        WhatsappFlowsSetEndpoint403.pipe(HttpApiSchema.status(403)),
        WhatsappFlowsSetEndpoint404.pipe(HttpApiSchema.status(404)),
        WhatsappFlowsSetEndpoint422.pipe(HttpApiSchema.status(422)),
        WhatsappFlowsSetEndpoint500,
        WhatsappFlowsSetEndpoint504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsappFlows.setEndpoint")
      .annotate(OpenApi.Summary, "Set a flow's endpoint")
      .annotate(
        OpenApi.Description,
        "Sets the HTTPS endpoint Samva forwards the flow's data-exchange requests to, signed like a webhook delivery. The flow's first endpoint is issued a signing secret, returned once; changing the URL keeps the secret.",
      ),
    HttpApiEndpoint.post(
      "whatsappFlowsRotateEndpointSecret",
      "/v1/whatsapp/flows/:id/endpoint/rotate-secret",
      {
        params: WhatsappFlowsRotateEndpointSecretPathParams,
        success: WhatsappFlowsRotateEndpointSecret200,
        error: [
          WhatsappFlowsRotateEndpointSecret400.pipe(HttpApiSchema.status(400)),
          WhatsappFlowsRotateEndpointSecret401.pipe(HttpApiSchema.status(401)),
          WhatsappFlowsRotateEndpointSecret403.pipe(HttpApiSchema.status(403)),
          WhatsappFlowsRotateEndpointSecret404.pipe(HttpApiSchema.status(404)),
          WhatsappFlowsRotateEndpointSecret422.pipe(HttpApiSchema.status(422)),
          WhatsappFlowsRotateEndpointSecret500,
          WhatsappFlowsRotateEndpointSecret504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsappFlows.rotateEndpointSecret")
      .annotate(OpenApi.Summary, "Rotate a flow endpoint's signing secret")
      .annotate(
        OpenApi.Description,
        "Issues and returns a new signing secret. Requests carry a signature from the previous secret too for 24 hours.",
      ),
    HttpApiEndpoint.get("whatsappFlowsListRegistrations", "/v1/whatsapp/flows/:id/registrations", {
      params: WhatsappFlowsListRegistrationsPathParams,
      success: WhatsappFlowsListRegistrations200,
      error: [
        WhatsappFlowsListRegistrations400.pipe(HttpApiSchema.status(400)),
        WhatsappFlowsListRegistrations401.pipe(HttpApiSchema.status(401)),
        WhatsappFlowsListRegistrations403.pipe(HttpApiSchema.status(403)),
        WhatsappFlowsListRegistrations404.pipe(HttpApiSchema.status(404)),
        WhatsappFlowsListRegistrations422.pipe(HttpApiSchema.status(422)),
        WhatsappFlowsListRegistrations500,
        WhatsappFlowsListRegistrations504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsappFlows.listRegistrations")
      .annotate(OpenApi.Summary, "List a flow's registrations")
      .annotate(
        OpenApi.Description,
        "Returns every Meta flow the flow's versions registered as, newest version first, with its status on its business account.",
      ),
    HttpApiEndpoint.post("whatsappFlowsRegister", "/v1/whatsapp/flows/:id/registrations", {
      params: WhatsappFlowsRegisterPathParams,
      payload: WhatsappFlowsRegisterRequestJson,
      success: WhatsappFlowsRegister201.pipe(HttpApiSchema.status(201)),
      error: [
        WhatsappFlowsRegister400.pipe(HttpApiSchema.status(400)),
        WhatsappFlowsRegister401.pipe(HttpApiSchema.status(401)),
        WhatsappFlowsRegister403.pipe(HttpApiSchema.status(403)),
        WhatsappFlowsRegister404.pipe(HttpApiSchema.status(404)),
        WhatsappFlowsRegister409.pipe(HttpApiSchema.status(409)),
        WhatsappFlowsRegister422.pipe(HttpApiSchema.status(422)),
        WhatsappFlowsRegister500,
        WhatsappFlowsRegister502.pipe(HttpApiSchema.status(502)),
        WhatsappFlowsRegister504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsappFlows.register")
      .annotate(OpenApi.Summary, "Register and publish a flow")
      .annotate(
        OpenApi.Description,
        "Creates the flow's current version as a Meta flow on the business account of the named number, or of the default number, and publishes it. A version already published there returns its registration. Meta's validator findings answer a validation error and stay on the draft registration.",
      ),
    HttpApiEndpoint.get("whatsappFlowsListVersions", "/v1/whatsapp/flows/:id/versions", {
      params: WhatsappFlowsListVersionsPathParams,
      success: WhatsappFlowsListVersions200,
      error: [
        WhatsappFlowsListVersions400.pipe(HttpApiSchema.status(400)),
        WhatsappFlowsListVersions401.pipe(HttpApiSchema.status(401)),
        WhatsappFlowsListVersions403.pipe(HttpApiSchema.status(403)),
        WhatsappFlowsListVersions404.pipe(HttpApiSchema.status(404)),
        WhatsappFlowsListVersions422.pipe(HttpApiSchema.status(422)),
        WhatsappFlowsListVersions500,
        WhatsappFlowsListVersions504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsappFlows.listVersions")
      .annotate(OpenApi.Summary, "List a flow's versions")
      .annotate(OpenApi.Description, "Newest first."),
    HttpApiEndpoint.post("whatsappFlowsRecordVersion", "/v1/whatsapp/flows/:id/versions", {
      params: WhatsappFlowsRecordVersionPathParams,
      payload: WhatsappFlowsRecordVersionRequestJson,
      success: WhatsappFlowsRecordVersion201.pipe(HttpApiSchema.status(201)),
      error: [
        WhatsappFlowsRecordVersion400.pipe(HttpApiSchema.status(400)),
        WhatsappFlowsRecordVersion401.pipe(HttpApiSchema.status(401)),
        WhatsappFlowsRecordVersion403.pipe(HttpApiSchema.status(403)),
        WhatsappFlowsRecordVersion404.pipe(HttpApiSchema.status(404)),
        WhatsappFlowsRecordVersion409.pipe(HttpApiSchema.status(409)),
        WhatsappFlowsRecordVersion422.pipe(HttpApiSchema.status(422)),
        WhatsappFlowsRecordVersion500,
        WhatsappFlowsRecordVersion503.pipe(HttpApiSchema.status(503)),
        WhatsappFlowsRecordVersion504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsappFlows.recordVersion")
      .annotate(OpenApi.Summary, "Record a flow version")
      .annotate(
        OpenApi.Description,
        "Reads the flow's file at a commit on the project's default branch, checks it is Flow JSON Samva sends, and records it as the flow's current version. The same content returns the version that already recorded it.",
      ),
    HttpApiEndpoint.post(
      "whatsappFlowsRotateEncryptionKey",
      "/v1/whatsapp/flows/encryption-key/rotate",
      {
        payload: WhatsappFlowsRotateEncryptionKeyRequestJson,
        success: WhatsappFlowsRotateEncryptionKey200,
        error: [
          WhatsappFlowsRotateEncryptionKey400.pipe(HttpApiSchema.status(400)),
          WhatsappFlowsRotateEncryptionKey401.pipe(HttpApiSchema.status(401)),
          WhatsappFlowsRotateEncryptionKey403.pipe(HttpApiSchema.status(403)),
          WhatsappFlowsRotateEncryptionKey404.pipe(HttpApiSchema.status(404)),
          WhatsappFlowsRotateEncryptionKey422.pipe(HttpApiSchema.status(422)),
          WhatsappFlowsRotateEncryptionKey500,
          WhatsappFlowsRotateEncryptionKey502.pipe(HttpApiSchema.status(502)),
          WhatsappFlowsRotateEncryptionKey504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whatsappFlows.rotateEncryptionKey")
      .annotate(OpenApi.Summary, "Rotate a business account's flow encryption key")
      .annotate(
        OpenApi.Description,
        "Replaces the key WhatsApp encrypts data-exchange requests with on the business account of the named number, or of the default number, and uploads it to each of the account's numbers. The replaced key keeps decrypting for a day while clients fetch the new one.",
      ),
  )
  .annotate(
    OpenApi.Description,
    "Flows authored in template projects, their versions, and their Meta registrations.",
  ) {}
