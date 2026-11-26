// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  AccountLinks,
  AnswerWithoutApproval,
  ApiKeySecurityMiddleware,
  ConflictError,
  ForbiddenError,
  GatewayTimeoutError,
  IntegrationId,
  IntegrationKey,
  IntegrationStatus,
  IntegrationTool,
  InternalError,
  JsonObject,
  MalformedRequestError,
  ResourceNotFoundError,
  UnauthorizedError,
  UserId,
  ValidationError,
} from "./shared";

export type IntegrationToolKind = "query" | "mutation";
export const IntegrationToolKind = /* @__PURE__ */ (() =>
  Schema.Union([Schema.Literal("query"), Schema.Literal("mutation")]).annotate({
    identifier: "IntegrationToolKind",
  }))();
export type DeleteIntegrationResponse = { readonly id: IntegrationId; readonly deleted: true };
export const DeleteIntegrationResponse = /* @__PURE__ */ (() =>
  Schema.Struct({ id: IntegrationId, deleted: Schema.Literal(true) }).annotate({
    identifier: "DeleteIntegrationResponse",
  }))();
export type IntegrationToolView = {
  readonly name: IntegrationTool;
  readonly title: string;
  readonly kind: IntegrationToolKind;
  readonly effect: "read" | "write" | "final";
  readonly guards: ReadonlyArray<"pinnedDestination" | "insideHours">;
  readonly granted: boolean;
  readonly unavailableReason?: "input_schema_too_large";
  readonly enabled: boolean;
  readonly runsWithoutApproval: boolean;
};
export const IntegrationToolView = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: IntegrationTool,
    title: Schema.String.check(
      Schema.isMaxCodePoints(256).annotate({ expected: "a string with at most 256 code points" }),
    ).check(Schema.isMaxLength(256).annotate({ expected: "a value with a length of at most 256" })),
    kind: IntegrationToolKind,
    effect: Schema.Union([
      Schema.Literal("read"),
      Schema.Literal("write"),
      Schema.Literal("final"),
    ]),
    guards: Schema.Array(
      Schema.Union([Schema.Literal("pinnedDestination"), Schema.Literal("insideHours")]),
    ),
    granted: Schema.Boolean,
    unavailableReason: Schema.optionalKey(Schema.Literal("input_schema_too_large")),
    enabled: Schema.Boolean,
    runsWithoutApproval: Schema.Boolean,
  }).annotate({ identifier: "IntegrationToolView" }))();
export type Integration = {
  readonly app: IntegrationKey;
  readonly settings: JsonObject;
  readonly id: IntegrationId;
  readonly status: IntegrationStatus;
  readonly accounts: AccountLinks;
  readonly supportsContactAccounts: boolean;
  readonly answerWithoutApproval: AnswerWithoutApproval;
  readonly tools: ReadonlyArray<IntegrationToolView>;
  readonly toolPage: { readonly nextCursor: string | null; readonly revision: string };
  readonly installedBy: UserId | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const Integration = /* @__PURE__ */ (() =>
  Schema.Struct({
    app: IntegrationKey,
    settings: JsonObject,
    id: IntegrationId,
    status: IntegrationStatus,
    accounts: AccountLinks,
    supportsContactAccounts: Schema.Boolean,
    answerWithoutApproval: AnswerWithoutApproval,
    tools: Schema.Array(IntegrationToolView),
    toolPage: Schema.Struct({
      nextCursor: Schema.Union([Schema.String, Schema.Null]),
      revision: Schema.String.check(
        Schema.isPattern(new globalThis.RegExp("^[a-f0-9]{64}$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-f0-9]{64}$",
        }),
      ),
    }),
    installedBy: Schema.Union([UserId, Schema.Null]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "Integration" }))();
export type IntegrationList = {
  readonly items: ReadonlyArray<Integration>;
  readonly nextCursor: string | null;
};
export const IntegrationList = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(Integration),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "IntegrationList" }))();
export type IntegrationsListQuery = { readonly limit?: number | null; readonly cursor?: string };
export const IntegrationsListQuery = /* @__PURE__ */ (() =>
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
    cursor: Schema.optionalKey(Schema.String),
  }))();
export type IntegrationsList200 = IntegrationList;
export const IntegrationsList200 = IntegrationList;
export type IntegrationsList400 = MalformedRequestError;
export const IntegrationsList400 = MalformedRequestError;
export type IntegrationsList401 = UnauthorizedError;
export const IntegrationsList401 = UnauthorizedError;
export type IntegrationsList403 = ForbiddenError;
export const IntegrationsList403 = ForbiddenError;
export type IntegrationsList422 = ValidationError;
export const IntegrationsList422 = ValidationError;
export type IntegrationsList500 = InternalError;
export const IntegrationsList500 = InternalError;
export type IntegrationsList504 = GatewayTimeoutError;
export const IntegrationsList504 = GatewayTimeoutError;
export type IntegrationsInstallRequestJson = {
  readonly app: IntegrationKey;
  readonly accounts: AccountLinks;
  readonly settings?: JsonObject;
};
export const IntegrationsInstallRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    app: IntegrationKey,
    accounts: AccountLinks,
    settings: Schema.optionalKey(JsonObject),
  }))();
export type IntegrationsInstall201 = Integration;
export const IntegrationsInstall201 = Integration;
export type IntegrationsInstall400 = MalformedRequestError;
export const IntegrationsInstall400 = MalformedRequestError;
export type IntegrationsInstall401 = UnauthorizedError;
export const IntegrationsInstall401 = UnauthorizedError;
export type IntegrationsInstall403 = ForbiddenError;
export const IntegrationsInstall403 = ForbiddenError;
export type IntegrationsInstall404 = ResourceNotFoundError;
export const IntegrationsInstall404 = ResourceNotFoundError;
export type IntegrationsInstall422 = ValidationError;
export const IntegrationsInstall422 = ValidationError;
export type IntegrationsInstall500 = InternalError;
export const IntegrationsInstall500 = InternalError;
export type IntegrationsInstall504 = GatewayTimeoutError;
export const IntegrationsInstall504 = GatewayTimeoutError;
export type IntegrationsGetPathParams = { readonly integrationId: IntegrationId };
export const IntegrationsGetPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ integrationId: IntegrationId }))();
export type IntegrationsGet200 = Integration;
export const IntegrationsGet200 = Integration;
export type IntegrationsGet400 = MalformedRequestError;
export const IntegrationsGet400 = MalformedRequestError;
export type IntegrationsGet401 = UnauthorizedError;
export const IntegrationsGet401 = UnauthorizedError;
export type IntegrationsGet403 = ForbiddenError;
export const IntegrationsGet403 = ForbiddenError;
export type IntegrationsGet404 = ResourceNotFoundError;
export const IntegrationsGet404 = ResourceNotFoundError;
export type IntegrationsGet422 = ValidationError;
export const IntegrationsGet422 = ValidationError;
export type IntegrationsGet500 = InternalError;
export const IntegrationsGet500 = InternalError;
export type IntegrationsGet504 = GatewayTimeoutError;
export const IntegrationsGet504 = GatewayTimeoutError;
export type IntegrationsRemovePathParams = { readonly integrationId: IntegrationId };
export const IntegrationsRemovePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ integrationId: IntegrationId }))();
export type IntegrationsRemove200 = DeleteIntegrationResponse;
export const IntegrationsRemove200 = DeleteIntegrationResponse;
export type IntegrationsRemove400 = MalformedRequestError;
export const IntegrationsRemove400 = MalformedRequestError;
export type IntegrationsRemove401 = UnauthorizedError;
export const IntegrationsRemove401 = UnauthorizedError;
export type IntegrationsRemove403 = ForbiddenError;
export const IntegrationsRemove403 = ForbiddenError;
export type IntegrationsRemove404 = ResourceNotFoundError;
export const IntegrationsRemove404 = ResourceNotFoundError;
export type IntegrationsRemove409 = ConflictError;
export const IntegrationsRemove409 = ConflictError;
export type IntegrationsRemove422 = ValidationError;
export const IntegrationsRemove422 = ValidationError;
export type IntegrationsRemove500 = InternalError;
export const IntegrationsRemove500 = InternalError;
export type IntegrationsRemove504 = GatewayTimeoutError;
export const IntegrationsRemove504 = GatewayTimeoutError;
export type IntegrationsUpdatePathParams = { readonly integrationId: IntegrationId };
export const IntegrationsUpdatePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ integrationId: IntegrationId }))();
export type IntegrationsUpdateRequestJson = {
  readonly answerWithoutApproval?: AnswerWithoutApproval;
  readonly enabledTools?: ReadonlyArray<IntegrationTool>;
  readonly tool?: {
    readonly name: IntegrationTool;
    readonly enabled?: boolean;
    readonly runsWithoutApproval?: boolean;
  };
  readonly settings?: JsonObject;
};
export const IntegrationsUpdateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    answerWithoutApproval: Schema.optionalKey(AnswerWithoutApproval),
    enabledTools: Schema.optionalKey(Schema.Array(IntegrationTool)),
    tool: Schema.optionalKey(
      Schema.Struct({
        name: IntegrationTool,
        enabled: Schema.optionalKey(Schema.Boolean),
        runsWithoutApproval: Schema.optionalKey(Schema.Boolean),
      }),
    ),
    settings: Schema.optionalKey(JsonObject),
  }))();
export type IntegrationsUpdate200 = Integration;
export const IntegrationsUpdate200 = Integration;
export type IntegrationsUpdate400 = MalformedRequestError;
export const IntegrationsUpdate400 = MalformedRequestError;
export type IntegrationsUpdate401 = UnauthorizedError;
export const IntegrationsUpdate401 = UnauthorizedError;
export type IntegrationsUpdate403 = ForbiddenError;
export const IntegrationsUpdate403 = ForbiddenError;
export type IntegrationsUpdate404 = ResourceNotFoundError;
export const IntegrationsUpdate404 = ResourceNotFoundError;
export type IntegrationsUpdate409 = ConflictError;
export const IntegrationsUpdate409 = ConflictError;
export type IntegrationsUpdate422 = ValidationError;
export const IntegrationsUpdate422 = ValidationError;
export type IntegrationsUpdate500 = InternalError;
export const IntegrationsUpdate500 = InternalError;
export type IntegrationsUpdate504 = GatewayTimeoutError;
export const IntegrationsUpdate504 = GatewayTimeoutError;
export type IntegrationsListToolsPathParams = { readonly integrationId: IntegrationId };
export const IntegrationsListToolsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ integrationId: IntegrationId }))();
export type IntegrationsListToolsQuery = {
  readonly limit?: number | null;
  readonly cursor?: string;
};
export const IntegrationsListToolsQuery = /* @__PURE__ */ (() =>
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
            Schema.isLessThanOrEqualTo(50).annotate({
              expected: "a value less than or equal to 50",
            }),
          ),
        Schema.Null,
      ]),
    ),
    cursor: Schema.optionalKey(Schema.String),
  }))();
export type IntegrationsListTools200 = {
  readonly items: ReadonlyArray<IntegrationToolView>;
  readonly nextCursor: string | null;
};
export const IntegrationsListTools200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(IntegrationToolView),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }))();
export type IntegrationsListTools400 = MalformedRequestError;
export const IntegrationsListTools400 = MalformedRequestError;
export type IntegrationsListTools401 = UnauthorizedError;
export const IntegrationsListTools401 = UnauthorizedError;
export type IntegrationsListTools403 = ForbiddenError;
export const IntegrationsListTools403 = ForbiddenError;
export type IntegrationsListTools404 = ResourceNotFoundError;
export const IntegrationsListTools404 = ResourceNotFoundError;
export type IntegrationsListTools409 = ConflictError;
export const IntegrationsListTools409 = ConflictError;
export type IntegrationsListTools422 = ValidationError;
export const IntegrationsListTools422 = ValidationError;
export type IntegrationsListTools500 = InternalError;
export const IntegrationsListTools500 = InternalError;
export type IntegrationsListTools504 = GatewayTimeoutError;
export const IntegrationsListTools504 = GatewayTimeoutError;
export type IntegrationsReadToolPathParams = {
  readonly integrationId: IntegrationId;
  readonly tool: IntegrationTool;
};
export const IntegrationsReadToolPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ integrationId: IntegrationId, tool: IntegrationTool }))();
export type IntegrationsReadToolQuery = {
  readonly offset?: number | null;
  readonly revision?: string;
};
export const IntegrationsReadToolQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    offset: Schema.optionalKey(
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
    revision: Schema.optionalKey(
      Schema.String.check(
        Schema.isPattern(new globalThis.RegExp("^[a-f0-9]{64}$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-f0-9]{64}$",
        }),
      ),
    ),
  }))();
export type IntegrationsReadTool200 = {
  readonly data: string;
  readonly offset: number;
  readonly nextOffset: number | null;
  readonly totalCharacters: number;
  readonly revision: string;
};
export const IntegrationsReadTool200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    data: Schema.String.check(
      Schema.isMaxCodePoints(32000).annotate({
        expected: "a string with at most 32000 code points",
      }),
    ).check(
      Schema.isMaxLength(32000).annotate({ expected: "a value with a length of at most 32000" }),
    ),
    offset: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    nextOffset: Schema.Union([
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
    totalCharacters: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    revision: Schema.String.check(
      Schema.isPattern(new globalThis.RegExp("^[a-f0-9]{64}$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-f0-9]{64}$",
      }),
    ),
  }))();
export type IntegrationsReadTool400 = MalformedRequestError;
export const IntegrationsReadTool400 = MalformedRequestError;
export type IntegrationsReadTool401 = UnauthorizedError;
export const IntegrationsReadTool401 = UnauthorizedError;
export type IntegrationsReadTool403 = ForbiddenError;
export const IntegrationsReadTool403 = ForbiddenError;
export type IntegrationsReadTool404 = ResourceNotFoundError;
export const IntegrationsReadTool404 = ResourceNotFoundError;
export type IntegrationsReadTool409 = ConflictError;
export const IntegrationsReadTool409 = ConflictError;
export type IntegrationsReadTool422 = ValidationError;
export const IntegrationsReadTool422 = ValidationError;
export type IntegrationsReadTool500 = InternalError;
export const IntegrationsReadTool500 = InternalError;
export type IntegrationsReadTool504 = GatewayTimeoutError;
export const IntegrationsReadTool504 = GatewayTimeoutError;

export class IntegrationsGroup extends HttpApiGroup.make("Integrations")
  .add(
    HttpApiEndpoint.get("integrationsList", "/v1/integrations", {
      query: IntegrationsListQuery,
      success: IntegrationsList200,
      error: [
        IntegrationsList400.pipe(HttpApiSchema.status(400)),
        IntegrationsList401.pipe(HttpApiSchema.status(401)),
        IntegrationsList403.pipe(HttpApiSchema.status(403)),
        IntegrationsList422.pipe(HttpApiSchema.status(422)),
        IntegrationsList500,
        IntegrationsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrations.list")
      .annotate(OpenApi.Summary, "List integrations")
      .annotate(
        OpenApi.Description,
        "Returns a bounded page of installed integrations, newest first, with compact tool summaries. Follow nextCursor and each integration's toolPage.nextCursor for the complete inventory.",
      ),
    HttpApiEndpoint.post("integrationsInstall", "/v1/integrations", {
      payload: IntegrationsInstallRequestJson,
      success: IntegrationsInstall201.pipe(HttpApiSchema.status(201)),
      error: [
        IntegrationsInstall400.pipe(HttpApiSchema.status(400)),
        IntegrationsInstall401.pipe(HttpApiSchema.status(401)),
        IntegrationsInstall403.pipe(HttpApiSchema.status(403)),
        IntegrationsInstall404.pipe(HttpApiSchema.status(404)),
        IntegrationsInstall422.pipe(HttpApiSchema.status(422)),
        IntegrationsInstall500,
        IntegrationsInstall504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrations.install")
      .annotate(OpenApi.Summary, "Install an integration")
      .annotate(
        OpenApi.Description,
        "Installs an app on connected accounts, one for each of the app's account slots. Installing the same app on the same accounts again returns the existing integration.",
      ),
    HttpApiEndpoint.get("integrationsGet", "/v1/integrations/:integrationId", {
      params: IntegrationsGetPathParams,
      success: IntegrationsGet200,
      error: [
        IntegrationsGet400.pipe(HttpApiSchema.status(400)),
        IntegrationsGet401.pipe(HttpApiSchema.status(401)),
        IntegrationsGet403.pipe(HttpApiSchema.status(403)),
        IntegrationsGet404.pipe(HttpApiSchema.status(404)),
        IntegrationsGet422.pipe(HttpApiSchema.status(422)),
        IntegrationsGet500,
        IntegrationsGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrations.get")
      .annotate(OpenApi.Summary, "Get an integration")
      .annotate(
        OpenApi.Description,
        "Returns one integration with its linked accounts, settings and tools. A Shopify integration needs reconnecting when its account has not granted the requested scopes, including read_products and read_legal_policies.",
      ),
    HttpApiEndpoint.delete("integrationsRemove", "/v1/integrations/:integrationId", {
      params: IntegrationsRemovePathParams,
      success: IntegrationsRemove200,
      error: [
        IntegrationsRemove400.pipe(HttpApiSchema.status(400)),
        IntegrationsRemove401.pipe(HttpApiSchema.status(401)),
        IntegrationsRemove403.pipe(HttpApiSchema.status(403)),
        IntegrationsRemove404.pipe(HttpApiSchema.status(404)),
        IntegrationsRemove409.pipe(HttpApiSchema.status(409)),
        IntegrationsRemove422.pipe(HttpApiSchema.status(422)),
        IntegrationsRemove500,
        IntegrationsRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrations.remove")
      .annotate(OpenApi.Summary, "Remove an integration")
      .annotate(
        OpenApi.Description,
        "Removes the integration and its grant from every agent's draft. Contact accounts are disconnected; organization accounts stay connected. A published agent version that granted it can no longer use it; publish the agent to drop the grant.",
      ),
    HttpApiEndpoint.patch("integrationsUpdate", "/v1/integrations/:integrationId", {
      params: IntegrationsUpdatePathParams,
      payload: IntegrationsUpdateRequestJson,
      success: IntegrationsUpdate200,
      error: [
        IntegrationsUpdate400.pipe(HttpApiSchema.status(400)),
        IntegrationsUpdate401.pipe(HttpApiSchema.status(401)),
        IntegrationsUpdate403.pipe(HttpApiSchema.status(403)),
        IntegrationsUpdate404.pipe(HttpApiSchema.status(404)),
        IntegrationsUpdate409.pipe(HttpApiSchema.status(409)),
        IntegrationsUpdate422.pipe(HttpApiSchema.status(422)),
        IntegrationsUpdate500,
        IntegrationsUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrations.update")
      .annotate(OpenApi.Summary, "Update an integration")
      .annotate(
        OpenApi.Description,
        "Changes an integration's settings, enabled tools, which tools run without approval, and whether replies using its data need approval. Changing answerWithoutApproval requires an organization owner and, for an API key, organization-wide reach. An organization owner or an API key with organization-wide reach can change a tool's runsWithoutApproval for its current effect. False makes a read tool ask first. True lets a tool that changes something run. Fields not named keep their values. What an agent may do with the integration is the agent's grant.",
      ),
    HttpApiEndpoint.get("integrationsListTools", "/v1/integrations/:integrationId/tools", {
      params: IntegrationsListToolsPathParams,
      query: IntegrationsListToolsQuery,
      success: IntegrationsListTools200,
      error: [
        IntegrationsListTools400.pipe(HttpApiSchema.status(400)),
        IntegrationsListTools401.pipe(HttpApiSchema.status(401)),
        IntegrationsListTools403.pipe(HttpApiSchema.status(403)),
        IntegrationsListTools404.pipe(HttpApiSchema.status(404)),
        IntegrationsListTools409.pipe(HttpApiSchema.status(409)),
        IntegrationsListTools422.pipe(HttpApiSchema.status(422)),
        IntegrationsListTools500,
        IntegrationsListTools504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrations.listTools")
      .annotate(OpenApi.Summary, "List integration tools")
      .annotate(
        OpenApi.Description,
        "Returns a page of the tools an integration gives agents. Pass nextCursor back as cursor. If the integration's tools change during pagination, the request returns 409. Restart without a cursor.",
      ),
    HttpApiEndpoint.get("integrationsReadTool", "/v1/integrations/:integrationId/tools/:tool", {
      params: IntegrationsReadToolPathParams,
      query: IntegrationsReadToolQuery,
      success: IntegrationsReadTool200,
      error: [
        IntegrationsReadTool400.pipe(HttpApiSchema.status(400)),
        IntegrationsReadTool401.pipe(HttpApiSchema.status(401)),
        IntegrationsReadTool403.pipe(HttpApiSchema.status(403)),
        IntegrationsReadTool404.pipe(HttpApiSchema.status(404)),
        IntegrationsReadTool409.pipe(HttpApiSchema.status(409)),
        IntegrationsReadTool422.pipe(HttpApiSchema.status(422)),
        IntegrationsReadTool500,
        IntegrationsReadTool504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrations.readTool")
      .annotate(OpenApi.Summary, "Read an integration tool descriptor")
      .annotate(
        OpenApi.Description,
        "Returns one tool's descriptor in chunks. Pass nextOffset back as offset with the same revision. A revision that no longer matches the integration's tools returns 409.",
      ),
  )
  .annotate(OpenApi.Description, "Apps installed for hosted agents, on connected accounts") {}
