// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeyAccess,
  ApiKeySecurityMiddleware,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  OrganizationId,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type WhoamiUser = { readonly id: string; readonly name: string; readonly email: string };
export const WhoamiUser = /* @__PURE__ */ Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  email: Schema.String,
}).annotate({ identifier: "WhoamiUser" });
export type WhoamiOrganization = {
  readonly id: OrganizationId;
  readonly slug: string;
  readonly name: string;
};
export const WhoamiOrganization = /* @__PURE__ */ Schema.Struct({
  id: OrganizationId,
  slug: Schema.String,
  name: Schema.String,
}).annotate({ identifier: "WhoamiOrganization" });
export type WhoamiUserCredential = {
  readonly type: "user";
  readonly user: WhoamiUser;
  readonly role: "member" | "admin" | "owner";
};
export const WhoamiUserCredential = /* @__PURE__ */ Schema.Struct({
  type: Schema.Literal("user"),
  user: WhoamiUser,
  role: Schema.Union([Schema.Literal("member"), Schema.Literal("admin"), Schema.Literal("owner")]),
}).annotate({ identifier: "WhoamiUserCredential" });
export type WhoamiApiKeyCredential = {
  readonly type: "apiKey";
  readonly id: string;
  readonly name: string;
  readonly start: string | null;
  readonly access: ApiKeyAccess;
};
export const WhoamiApiKeyCredential = /* @__PURE__ */ Schema.Struct({
  type: Schema.Literal("apiKey"),
  id: Schema.String,
  name: Schema.String,
  start: Schema.Union([Schema.String, Schema.Null]),
  access: ApiKeyAccess,
}).annotate({ identifier: "WhoamiApiKeyCredential" });
export type Whoami = {
  readonly organization: WhoamiOrganization;
  readonly credential: WhoamiApiKeyCredential | WhoamiUserCredential;
};
export const Whoami = /* @__PURE__ */ Schema.Struct({
  organization: WhoamiOrganization,
  credential: Schema.Union([WhoamiApiKeyCredential, WhoamiUserCredential]),
}).annotate({ identifier: "Whoami" });
export type WhoamiGet200 = Whoami;
export const WhoamiGet200 = Whoami;
export type WhoamiGet401 = UnauthorizedError;
export const WhoamiGet401 = UnauthorizedError;
export type WhoamiGet403 = ForbiddenError;
export const WhoamiGet403 = ForbiddenError;
export type WhoamiGet422 = ValidationError;
export const WhoamiGet422 = ValidationError;
export type WhoamiGet500 = InternalError;
export const WhoamiGet500 = InternalError;
export type WhoamiGet504 = GatewayTimeoutError;
export const WhoamiGet504 = GatewayTimeoutError;

export class WhoamiGroup extends HttpApiGroup.make("Whoami")
  .add(
    HttpApiEndpoint.get("whoamiGet", "/v1/whoami", {
      success: WhoamiGet200,
      error: [
        WhoamiGet401.pipe(HttpApiSchema.status(401)),
        WhoamiGet403.pipe(HttpApiSchema.status(403)),
        WhoamiGet422.pipe(HttpApiSchema.status(422)),
        WhoamiGet500,
        WhoamiGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "whoami.get")
      .annotate(OpenApi.Summary, "Get the calling credential")
      .annotate(
        OpenApi.Description,
        "Returns the organization the request acts in and the credential it presents: an API key with its name, prefix, and access, or a signed-in user with their role. Any valid credential may call it, whatever its grants.",
      ),
  )
  .annotate(OpenApi.Description, "The organization and credential behind the request.") {}
