// Auto-generated from OpenAPI; do not edit.

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
  TemplateChannelVariantId,
  TemplateId,
  TemplatePublicationId,
  TemplateRegistrationApproval,
  TemplateRegistrationId,
  UnauthorizedError,
  ValidationError,
  WhatsAppBusinessAccountId_1,
  WhatsAppChannelError,
} from "./shared";

export type WhatsAppRegistrationTarget = { readonly provider: "whatsapp"; readonly wabaId: string };
export const WhatsAppRegistrationTarget = /* @__PURE__ */ (() =>
  Schema.Struct({ provider: Schema.Literal("whatsapp"), wabaId: Schema.String }).annotate({
    identifier: "WhatsAppRegistrationTarget",
  }))();
export type DltRegistrationTarget = {
  readonly provider: "dlt";
  readonly entityId: string;
  readonly headerId: string;
};
export const DltRegistrationTarget = /* @__PURE__ */ (() =>
  Schema.Struct({
    provider: Schema.Literal("dlt"),
    entityId: Schema.String,
    headerId: Schema.String,
  }).annotate({ identifier: "DltRegistrationTarget" }))();
export type TemplateRegistrationTarget = WhatsAppRegistrationTarget | DltRegistrationTarget;
export const TemplateRegistrationTarget = /* @__PURE__ */ (() =>
  Schema.Union([WhatsAppRegistrationTarget, DltRegistrationTarget]).annotate({
    identifier: "TemplateRegistrationTarget",
  }))();
export type TemplateRegistration = {
  readonly id: TemplateRegistrationId;
  readonly templateId: TemplateId;
  readonly publicationId: TemplatePublicationId;
  readonly templateChannelVariantId: TemplateChannelVariantId;
  readonly target: TemplateRegistrationTarget;
  readonly name: string;
  readonly language: string;
  readonly status: "draft" | "submitted" | "approved" | "rejected" | "paused" | "disabled";
  readonly pendingTemplateChannelVariantId: TemplateChannelVariantId | null;
  readonly category:
    | "marketing"
    | "utility"
    | "authentication"
    | "transactional"
    | "service_implicit"
    | "service_explicit"
    | "promotional";
  readonly providerCategory:
    | "marketing"
    | "utility"
    | "authentication"
    | "transactional"
    | "service_implicit"
    | "service_explicit"
    | "promotional"
    | null;
  readonly providerTemplateId: string | null;
  readonly reason: string | null;
  readonly submittedAt: string | null;
  readonly statusChangedAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const TemplateRegistration = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: TemplateRegistrationId,
    templateId: TemplateId,
    publicationId: TemplatePublicationId,
    templateChannelVariantId: TemplateChannelVariantId,
    target: TemplateRegistrationTarget,
    name: Schema.String,
    language: Schema.String,
    status: Schema.Union([
      Schema.Literal("draft"),
      Schema.Literal("submitted"),
      Schema.Literal("approved"),
      Schema.Literal("rejected"),
      Schema.Literal("paused"),
      Schema.Literal("disabled"),
    ]),
    pendingTemplateChannelVariantId: Schema.Union([TemplateChannelVariantId, Schema.Null]).annotate(
      {
        description:
          "Content a submission sent to the provider whose outcome is not yet recorded, because its request failed or is still in flight; the provider may already hold it. While it is set nothing sends from this registration, even when `status` is `approved`. Submitting again settles it.",
      },
    ),
    category: Schema.Union([
      Schema.Literal("marketing"),
      Schema.Literal("utility"),
      Schema.Literal("authentication"),
      Schema.Literal("transactional"),
      Schema.Literal("service_implicit"),
      Schema.Literal("service_explicit"),
      Schema.Literal("promotional"),
    ]),
    providerCategory: Schema.Union([
      Schema.Union([
        Schema.Literal("marketing"),
        Schema.Literal("utility"),
        Schema.Literal("authentication"),
        Schema.Literal("transactional"),
        Schema.Literal("service_implicit"),
        Schema.Literal("service_explicit"),
        Schema.Literal("promotional"),
      ]),
      Schema.Null,
    ]),
    providerTemplateId: Schema.Union([Schema.String, Schema.Null]),
    reason: Schema.Union([Schema.String, Schema.Null]),
    submittedAt: Schema.Union([Schema.String, Schema.Null]),
    statusChangedAt: Schema.String,
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({
    description:
      "`templateChannelVariantId` identifies the exact content last submitted. A journey step or scheduled send pins it with `id` in `pinnedRegistration` and sends only while this registration holds that content approved.",
    identifier: "TemplateRegistration",
  }))();
export type TemplateRegistrationList = { readonly data: ReadonlyArray<TemplateRegistration> };
export const TemplateRegistrationList = /* @__PURE__ */ (() =>
  Schema.Struct({ data: Schema.Array(TemplateRegistration) }).annotate({
    identifier: "TemplateRegistrationList",
  }))();
export type TemplateRegistrationsListPathParams = { readonly id: TemplateId };
export const TemplateRegistrationsListPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplateRegistrationsList200 = TemplateRegistrationList;
export const TemplateRegistrationsList200 = TemplateRegistrationList;
export type TemplateRegistrationsList400 = MalformedRequestError;
export const TemplateRegistrationsList400 = MalformedRequestError;
export type TemplateRegistrationsList401 = UnauthorizedError;
export const TemplateRegistrationsList401 = UnauthorizedError;
export type TemplateRegistrationsList403 = FlagDisabledError | ForbiddenError;
export const TemplateRegistrationsList403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type TemplateRegistrationsList404 = ResourceNotFoundError;
export const TemplateRegistrationsList404 = ResourceNotFoundError;
export type TemplateRegistrationsList422 = ValidationError;
export const TemplateRegistrationsList422 = ValidationError;
export type TemplateRegistrationsList500 = InternalError;
export const TemplateRegistrationsList500 = InternalError;
export type TemplateRegistrationsList504 = GatewayTimeoutError;
export const TemplateRegistrationsList504 = GatewayTimeoutError;
export type TemplateRegistrationsSubmitPathParams = { readonly id: TemplateId };
export const TemplateRegistrationsSubmitPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId }))();
export type TemplateRegistrationsSubmitRequestJson = {
  readonly provider: "whatsapp";
  readonly businessAccountId?: WhatsAppBusinessAccountId_1;
  readonly approval?: TemplateRegistrationApproval;
};
export const TemplateRegistrationsSubmitRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    provider: Schema.Literal("whatsapp"),
    businessAccountId: Schema.optionalKey(WhatsAppBusinessAccountId_1),
    approval: Schema.optionalKey(TemplateRegistrationApproval),
  }))();
export type TemplateRegistrationsSubmit201 = TemplateRegistration;
export const TemplateRegistrationsSubmit201 = TemplateRegistration;
export type TemplateRegistrationsSubmit400 = MalformedRequestError;
export const TemplateRegistrationsSubmit400 = MalformedRequestError;
export type TemplateRegistrationsSubmit401 = UnauthorizedError;
export const TemplateRegistrationsSubmit401 = UnauthorizedError;
export type TemplateRegistrationsSubmit403 = ForbiddenError | FlagDisabledError;
export const TemplateRegistrationsSubmit403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, FlagDisabledError]))();
export type TemplateRegistrationsSubmit404 = ResourceNotFoundError;
export const TemplateRegistrationsSubmit404 = ResourceNotFoundError;
export type TemplateRegistrationsSubmit409 = ConflictError;
export const TemplateRegistrationsSubmit409 = ConflictError;
export type TemplateRegistrationsSubmit422 = ValidationError;
export const TemplateRegistrationsSubmit422 = ValidationError;
export type TemplateRegistrationsSubmit500 = CredentialsError | InternalError;
export const TemplateRegistrationsSubmit500 = /* @__PURE__ */ (() =>
  Schema.Union([CredentialsError, InternalError]))();
export type TemplateRegistrationsSubmit502 = WhatsAppChannelError;
export const TemplateRegistrationsSubmit502 = WhatsAppChannelError;
export type TemplateRegistrationsSubmit503 = ServiceUnavailableError;
export const TemplateRegistrationsSubmit503 = ServiceUnavailableError;
export type TemplateRegistrationsSubmit504 = GatewayTimeoutError;
export const TemplateRegistrationsSubmit504 = GatewayTimeoutError;
export type TemplateRegistrationsGetPathParams = {
  readonly id: TemplateId;
  readonly registrationId: TemplateRegistrationId;
};
export const TemplateRegistrationsGetPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: TemplateId, registrationId: TemplateRegistrationId }))();
export type TemplateRegistrationsGet200 = TemplateRegistration;
export const TemplateRegistrationsGet200 = TemplateRegistration;
export type TemplateRegistrationsGet400 = MalformedRequestError;
export const TemplateRegistrationsGet400 = MalformedRequestError;
export type TemplateRegistrationsGet401 = UnauthorizedError;
export const TemplateRegistrationsGet401 = UnauthorizedError;
export type TemplateRegistrationsGet403 = FlagDisabledError | ForbiddenError;
export const TemplateRegistrationsGet403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type TemplateRegistrationsGet404 = ResourceNotFoundError;
export const TemplateRegistrationsGet404 = ResourceNotFoundError;
export type TemplateRegistrationsGet422 = ValidationError;
export const TemplateRegistrationsGet422 = ValidationError;
export type TemplateRegistrationsGet500 = InternalError;
export const TemplateRegistrationsGet500 = InternalError;
export type TemplateRegistrationsGet504 = GatewayTimeoutError;
export const TemplateRegistrationsGet504 = GatewayTimeoutError;

export class TemplateRegistrationsGroup extends HttpApiGroup.make("Template registrations")
  .add(
    HttpApiEndpoint.get("templateRegistrationsList", "/v1/templates/:id/registrations", {
      params: TemplateRegistrationsListPathParams,
      success: TemplateRegistrationsList200,
      error: [
        TemplateRegistrationsList400.pipe(HttpApiSchema.status(400)),
        TemplateRegistrationsList401.pipe(HttpApiSchema.status(401)),
        TemplateRegistrationsList403.pipe(HttpApiSchema.status(403)),
        TemplateRegistrationsList404.pipe(HttpApiSchema.status(404)),
        TemplateRegistrationsList422.pipe(HttpApiSchema.status(422)),
        TemplateRegistrationsList500,
        TemplateRegistrationsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templateRegistrations.list")
      .annotate(OpenApi.Summary, "List a template's registrations")
      .annotate(
        OpenApi.Description,
        "Returns every provider registration of the template, newest first, with its review status and the publication it last submitted.",
      ),
    HttpApiEndpoint.post("templateRegistrationsSubmit", "/v1/templates/:id/registrations", {
      params: TemplateRegistrationsSubmitPathParams,
      payload: TemplateRegistrationsSubmitRequestJson,
      success: TemplateRegistrationsSubmit201.pipe(HttpApiSchema.status(201)),
      error: [
        TemplateRegistrationsSubmit400.pipe(HttpApiSchema.status(400)),
        TemplateRegistrationsSubmit401.pipe(HttpApiSchema.status(401)),
        TemplateRegistrationsSubmit403.pipe(HttpApiSchema.status(403)),
        TemplateRegistrationsSubmit404.pipe(HttpApiSchema.status(404)),
        TemplateRegistrationsSubmit409.pipe(HttpApiSchema.status(409)),
        TemplateRegistrationsSubmit422.pipe(HttpApiSchema.status(422)),
        TemplateRegistrationsSubmit500,
        TemplateRegistrationsSubmit502.pipe(HttpApiSchema.status(502)),
        TemplateRegistrationsSubmit503.pipe(HttpApiSchema.status(503)),
        TemplateRegistrationsSubmit504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templateRegistrations.submit")
      .annotate(OpenApi.Summary, "Submit a template registration")
      .annotate(
        OpenApi.Description,
        "Submits the template's current publication for review on a WhatsApp business account. Pass approval to bind a reviewed submission to the exact publication, workspace revision, connected number and Meta business account. A changed selection returns a conflict. An immediate submission uses the named or default number. A first submission creates the provider template. A later one resubmits through the same registration.",
      ),
    HttpApiEndpoint.get(
      "templateRegistrationsGet",
      "/v1/templates/:id/registrations/:registrationId",
      {
        params: TemplateRegistrationsGetPathParams,
        success: TemplateRegistrationsGet200,
        error: [
          TemplateRegistrationsGet400.pipe(HttpApiSchema.status(400)),
          TemplateRegistrationsGet401.pipe(HttpApiSchema.status(401)),
          TemplateRegistrationsGet403.pipe(HttpApiSchema.status(403)),
          TemplateRegistrationsGet404.pipe(HttpApiSchema.status(404)),
          TemplateRegistrationsGet422.pipe(HttpApiSchema.status(422)),
          TemplateRegistrationsGet500,
          TemplateRegistrationsGet504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "templateRegistrations.get")
      .annotate(OpenApi.Summary, "Get a template registration")
      .annotate(
        OpenApi.Description,
        "Returns one registration: its status, the category the provider assigned, and why the provider rejected, paused, or disabled it.",
      ),
  )
  .annotate(
    OpenApi.Description,
    "Provider review of template content: submission, status, and category.",
  ) {}
