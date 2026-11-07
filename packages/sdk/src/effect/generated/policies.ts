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
  PolicyRule,
  PolicyVersion,
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type PolicySnapshot = {
  readonly presets: ReadonlyArray<string>;
  readonly rules: ReadonlyArray<PolicyRule>;
  readonly instructions?: string | null;
  readonly version: PolicyVersion;
};
export const PolicySnapshot = /* @__PURE__ */ (() =>
  Schema.Struct({
    presets: Schema.Array(
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      ),
    ),
    rules: Schema.Array(PolicyRule),
    instructions: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    version: PolicyVersion,
  }).annotate({ identifier: "PolicySnapshot" }))();
export type PoliciesGetPolicyPathParams = {
  readonly kind: "organization" | "mailbox" | "apiKey" | "agent";
  readonly id: string;
};
export const PoliciesGetPolicyPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    kind: Schema.Union([
      Schema.Literal("organization"),
      Schema.Literal("mailbox"),
      Schema.Literal("apiKey"),
      Schema.Literal("agent"),
    ]),
    id: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
  }))();
export type PoliciesGetPolicy200 = PolicySnapshot;
export const PoliciesGetPolicy200 = PolicySnapshot;
export type PoliciesGetPolicy400 = MalformedRequestError;
export const PoliciesGetPolicy400 = MalformedRequestError;
export type PoliciesGetPolicy401 = UnauthorizedError;
export const PoliciesGetPolicy401 = UnauthorizedError;
export type PoliciesGetPolicy403 = ForbiddenError;
export const PoliciesGetPolicy403 = ForbiddenError;
export type PoliciesGetPolicy404 = ResourceNotFoundError;
export const PoliciesGetPolicy404 = ResourceNotFoundError;
export type PoliciesGetPolicy409 = ConflictError;
export const PoliciesGetPolicy409 = ConflictError;
export type PoliciesGetPolicy422 = ValidationError;
export const PoliciesGetPolicy422 = ValidationError;
export type PoliciesGetPolicy500 = InternalError;
export const PoliciesGetPolicy500 = InternalError;
export type PoliciesGetPolicy504 = GatewayTimeoutError;
export const PoliciesGetPolicy504 = GatewayTimeoutError;
export type PoliciesSetPolicyPathParams = {
  readonly kind: "organization" | "mailbox" | "apiKey" | "agent";
  readonly id: string;
};
export const PoliciesSetPolicyPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    kind: Schema.Union([
      Schema.Literal("organization"),
      Schema.Literal("mailbox"),
      Schema.Literal("apiKey"),
      Schema.Literal("agent"),
    ]),
    id: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
  }))();
export type PoliciesSetPolicyRequestJson = {
  readonly presets: ReadonlyArray<string>;
  readonly rules: ReadonlyArray<PolicyRule>;
  readonly instructions?: string | null;
  readonly ifVersion: PolicyVersion;
};
export const PoliciesSetPolicyRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    presets: Schema.Array(
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      ),
    ),
    rules: Schema.Array(PolicyRule),
    instructions: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    ifVersion: PolicyVersion,
  }))();
export type PoliciesSetPolicy200 = PolicySnapshot;
export const PoliciesSetPolicy200 = PolicySnapshot;
export type PoliciesSetPolicy400 = MalformedRequestError;
export const PoliciesSetPolicy400 = MalformedRequestError;
export type PoliciesSetPolicy401 = UnauthorizedError;
export const PoliciesSetPolicy401 = UnauthorizedError;
export type PoliciesSetPolicy403 = ForbiddenError;
export const PoliciesSetPolicy403 = ForbiddenError;
export type PoliciesSetPolicy404 = ResourceNotFoundError;
export const PoliciesSetPolicy404 = ResourceNotFoundError;
export type PoliciesSetPolicy409 = ConflictError;
export const PoliciesSetPolicy409 = ConflictError;
export type PoliciesSetPolicy422 = ValidationError;
export const PoliciesSetPolicy422 = ValidationError;
export type PoliciesSetPolicy500 = InternalError;
export const PoliciesSetPolicy500 = InternalError;
export type PoliciesSetPolicy504 = GatewayTimeoutError;
export const PoliciesSetPolicy504 = GatewayTimeoutError;
export type PoliciesDeletePolicyPathParams = {
  readonly kind: "organization" | "mailbox" | "apiKey" | "agent";
  readonly id: string;
};
export const PoliciesDeletePolicyPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    kind: Schema.Union([
      Schema.Literal("organization"),
      Schema.Literal("mailbox"),
      Schema.Literal("apiKey"),
      Schema.Literal("agent"),
    ]),
    id: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
  }))();
export type PoliciesDeletePolicyQuery = { readonly ifVersion: number };
export const PoliciesDeletePolicyQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    ifVersion: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
export type PoliciesDeletePolicy200 = PolicySnapshot;
export const PoliciesDeletePolicy200 = PolicySnapshot;
export type PoliciesDeletePolicy400 = MalformedRequestError;
export const PoliciesDeletePolicy400 = MalformedRequestError;
export type PoliciesDeletePolicy401 = UnauthorizedError;
export const PoliciesDeletePolicy401 = UnauthorizedError;
export type PoliciesDeletePolicy403 = ForbiddenError;
export const PoliciesDeletePolicy403 = ForbiddenError;
export type PoliciesDeletePolicy404 = ResourceNotFoundError;
export const PoliciesDeletePolicy404 = ResourceNotFoundError;
export type PoliciesDeletePolicy409 = ConflictError;
export const PoliciesDeletePolicy409 = ConflictError;
export type PoliciesDeletePolicy422 = ValidationError;
export const PoliciesDeletePolicy422 = ValidationError;
export type PoliciesDeletePolicy500 = InternalError;
export const PoliciesDeletePolicy500 = InternalError;
export type PoliciesDeletePolicy504 = GatewayTimeoutError;
export const PoliciesDeletePolicy504 = GatewayTimeoutError;

export class PoliciesGroup extends HttpApiGroup.make("Policies")
  .add(
    HttpApiEndpoint.get("policiesGetPolicy", "/v1/policies/:kind/:id", {
      params: PoliciesGetPolicyPathParams,
      success: PoliciesGetPolicy200,
      error: [
        PoliciesGetPolicy400.pipe(HttpApiSchema.status(400)),
        PoliciesGetPolicy401.pipe(HttpApiSchema.status(401)),
        PoliciesGetPolicy403.pipe(HttpApiSchema.status(403)),
        PoliciesGetPolicy404.pipe(HttpApiSchema.status(404)),
        PoliciesGetPolicy409.pipe(HttpApiSchema.status(409)),
        PoliciesGetPolicy422.pipe(HttpApiSchema.status(422)),
        PoliciesGetPolicy500,
        PoliciesGetPolicy504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "policies.getPolicy")
      .annotate(OpenApi.Summary, "Get decision rules")
      .annotate(
        OpenApi.Description,
        "Returns the rules and instructions for an organization, mailbox, API key, or agent in the current organization. An agent scope holds the rules added by approving its actions with `always`; they apply on top of the agent's published rules. An unset policy has version 0 and no rules or presets.",
      ),
    HttpApiEndpoint.put("policiesSetPolicy", "/v1/policies/:kind/:id", {
      params: PoliciesSetPolicyPathParams,
      payload: PoliciesSetPolicyRequestJson,
      success: PoliciesSetPolicy200,
      error: [
        PoliciesSetPolicy400.pipe(HttpApiSchema.status(400)),
        PoliciesSetPolicy401.pipe(HttpApiSchema.status(401)),
        PoliciesSetPolicy403.pipe(HttpApiSchema.status(403)),
        PoliciesSetPolicy404.pipe(HttpApiSchema.status(404)),
        PoliciesSetPolicy409.pipe(HttpApiSchema.status(409)),
        PoliciesSetPolicy422.pipe(HttpApiSchema.status(422)),
        PoliciesSetPolicy500,
        PoliciesSetPolicy504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "policies.setPolicy")
      .annotate(OpenApi.Summary, "Set decision rules")
      .annotate(
        OpenApi.Description,
        "Replaces this scope's rules and instructions only when ifVersion matches its current version. A stale version returns a conflict. More specific scopes replace defaults; atLeast floors remain binding. Identical rule matches in one scope are rejected.",
      ),
    HttpApiEndpoint.delete("policiesDeletePolicy", "/v1/policies/:kind/:id", {
      params: PoliciesDeletePolicyPathParams,
      query: PoliciesDeletePolicyQuery,
      success: PoliciesDeletePolicy200,
      error: [
        PoliciesDeletePolicy400.pipe(HttpApiSchema.status(400)),
        PoliciesDeletePolicy401.pipe(HttpApiSchema.status(401)),
        PoliciesDeletePolicy403.pipe(HttpApiSchema.status(403)),
        PoliciesDeletePolicy404.pipe(HttpApiSchema.status(404)),
        PoliciesDeletePolicy409.pipe(HttpApiSchema.status(409)),
        PoliciesDeletePolicy422.pipe(HttpApiSchema.status(422)),
        PoliciesDeletePolicy500,
        PoliciesDeletePolicy504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "policies.deletePolicy")
      .annotate(OpenApi.Summary, "Clear decision rules")
      .annotate(
        OpenApi.Description,
        "Clears this scope's rules and instructions only when ifVersion matches, and returns the next version. The stored version is retained. Other scopes and subject defaults continue to apply.",
      ),
  )
  .annotate(OpenApi.Description, "Rules governing who decides each gated action.") {}
