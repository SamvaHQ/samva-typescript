// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  AgentDefinition,
  AgentName,
  ApiKeySecurityMiddleware,
  ConflictError,
  Cursor,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  NamespaceId,
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
  VersionCursor,
} from "./shared";

export type AgentId = string & EffectBrand.Brand<"AgentId">;
export const AgentId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^agt_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^agt_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "AgentId",
    }),
  ).pipe(Schema.brand("AgentId")))();
export type DeleteAgentResponse = { readonly id: AgentId; readonly deleted: true };
export const DeleteAgentResponse = /* @__PURE__ */ (() =>
  Schema.Struct({ id: AgentId, deleted: Schema.Literal(true) }).annotate({
    identifier: "DeleteAgentResponse",
  }))();
export type AgentVersionSummary = {
  readonly agentId: AgentId;
  readonly version: number;
  readonly publishedAt: string;
};
export const AgentVersionSummary = /* @__PURE__ */ (() =>
  Schema.Struct({
    agentId: AgentId,
    version: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    publishedAt: Schema.String,
  }).annotate({ identifier: "AgentVersionSummary" }))();
export type AgentListItem = {
  readonly id: AgentId;
  readonly name: string;
  readonly namespaceId: NamespaceId | null;
  readonly publishedVersion: number | null;
  readonly publishedAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const AgentListItem = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: AgentId,
    name: Schema.String,
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
    publishedVersion: Schema.Union([
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
      Schema.Null,
    ]),
    publishedAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "AgentListItem" }))();
export type AgentVersionPage = {
  readonly items: ReadonlyArray<AgentVersionSummary>;
  readonly nextCursor: string | null;
};
export const AgentVersionPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(AgentVersionSummary),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "AgentVersionPage" }))();
export type AgentPage = {
  readonly items: ReadonlyArray<AgentListItem>;
  readonly nextCursor: string | null;
};
export const AgentPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(AgentListItem),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "AgentPage" }))();
export type Agent = {
  readonly id: AgentId;
  readonly name: string;
  readonly namespaceId: NamespaceId | null;
  readonly revision: string;
  readonly draft: AgentDefinition;
  readonly publishedVersion: number | null;
  readonly publishedAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const Agent = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: AgentId,
    name: Schema.String,
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
    revision: Schema.String,
    draft: AgentDefinition,
    publishedVersion: Schema.Union([
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
      Schema.Null,
    ]),
    publishedAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "Agent" }))();
export type AgentVersion = {
  readonly agentId: AgentId;
  readonly version: number;
  readonly definition: AgentDefinition;
  readonly publishedAt: string;
};
export const AgentVersion = /* @__PURE__ */ (() =>
  Schema.Struct({
    agentId: AgentId,
    version: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    definition: AgentDefinition,
    publishedAt: Schema.String,
  }).annotate({ identifier: "AgentVersion" }))();
export type PublishAgentResponse = {
  readonly agent: Agent;
  readonly version: AgentVersion;
  readonly published: boolean;
};
export const PublishAgentResponse = /* @__PURE__ */ (() =>
  Schema.Struct({ agent: Agent, version: AgentVersion, published: Schema.Boolean }).annotate({
    identifier: "PublishAgentResponse",
  }))();
export type AgentsListQuery = { readonly limit?: number | null; readonly cursor?: Cursor | null };
export const AgentsListQuery = /* @__PURE__ */ (() =>
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
export type AgentsList200 = AgentPage;
export const AgentsList200 = AgentPage;
export type AgentsList401 = UnauthorizedError;
export const AgentsList401 = UnauthorizedError;
export type AgentsList403 = ForbiddenError;
export const AgentsList403 = ForbiddenError;
export type AgentsList422 = ValidationError;
export const AgentsList422 = ValidationError;
export type AgentsList500 = InternalError;
export const AgentsList500 = InternalError;
export type AgentsList504 = GatewayTimeoutError;
export const AgentsList504 = GatewayTimeoutError;
export type AgentsCreateRequestJson = {
  readonly name: AgentName;
  readonly namespaceId?: NamespaceId | null;
  readonly definition?: AgentDefinition | null;
};
export const AgentsCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: AgentName,
    namespaceId: Schema.optionalKey(
      Schema.Union([NamespaceId, Schema.Null]).annotate({
        description:
          "The namespace the agent belongs to; it cannot move later. Omit for an organization-level agent. A namespace-scoped key always creates in its own namespace.",
      }),
    ),
    definition: Schema.optionalKey(
      Schema.Union([AgentDefinition, Schema.Null]).annotate({
        description:
          "The first draft. Defaults to an agent with no instructions, knowledge, or endpoints, in supervised mode on the standard model.",
        default: {
          instructions: "",
          knowledge: "",
          endpointIds: [],
          integrations: [],
          mode: "supervised",
          model: "standard",
          workingHours: null,
          takeoverTimeoutMinutes: 30,
        },
      }),
    ),
  }))();
export type AgentsCreate201 = Agent;
export const AgentsCreate201 = Agent;
export type AgentsCreate401 = UnauthorizedError;
export const AgentsCreate401 = UnauthorizedError;
export type AgentsCreate403 = ForbiddenError;
export const AgentsCreate403 = ForbiddenError;
export type AgentsCreate404 = ResourceNotFoundError;
export const AgentsCreate404 = ResourceNotFoundError;
export type AgentsCreate422 = ValidationError;
export const AgentsCreate422 = ValidationError;
export type AgentsCreate500 = InternalError;
export const AgentsCreate500 = InternalError;
export type AgentsCreate504 = GatewayTimeoutError;
export const AgentsCreate504 = GatewayTimeoutError;
export type AgentsGetPathParams = { readonly id: AgentId };
export const AgentsGetPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: AgentId }))();
export type AgentsGet200 = Agent;
export const AgentsGet200 = Agent;
export type AgentsGet401 = UnauthorizedError;
export const AgentsGet401 = UnauthorizedError;
export type AgentsGet403 = ForbiddenError;
export const AgentsGet403 = ForbiddenError;
export type AgentsGet404 = ResourceNotFoundError;
export const AgentsGet404 = ResourceNotFoundError;
export type AgentsGet422 = ValidationError;
export const AgentsGet422 = ValidationError;
export type AgentsGet500 = InternalError;
export const AgentsGet500 = InternalError;
export type AgentsGet504 = GatewayTimeoutError;
export const AgentsGet504 = GatewayTimeoutError;
export type AgentsRemovePathParams = { readonly id: AgentId };
export const AgentsRemovePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: AgentId }))();
export type AgentsRemove200 = DeleteAgentResponse;
export const AgentsRemove200 = DeleteAgentResponse;
export type AgentsRemove401 = UnauthorizedError;
export const AgentsRemove401 = UnauthorizedError;
export type AgentsRemove403 = ForbiddenError;
export const AgentsRemove403 = ForbiddenError;
export type AgentsRemove404 = ResourceNotFoundError;
export const AgentsRemove404 = ResourceNotFoundError;
export type AgentsRemove422 = ValidationError;
export const AgentsRemove422 = ValidationError;
export type AgentsRemove500 = InternalError;
export const AgentsRemove500 = InternalError;
export type AgentsRemove504 = GatewayTimeoutError;
export const AgentsRemove504 = GatewayTimeoutError;
export type AgentsUpdatePathParams = { readonly id: AgentId };
export const AgentsUpdatePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: AgentId }))();
export type AgentsUpdateRequestJson = { readonly name: AgentName };
export const AgentsUpdateRequestJson = /* @__PURE__ */ (() => Schema.Struct({ name: AgentName }))();
export type AgentsUpdate200 = Agent;
export const AgentsUpdate200 = Agent;
export type AgentsUpdate401 = UnauthorizedError;
export const AgentsUpdate401 = UnauthorizedError;
export type AgentsUpdate403 = ForbiddenError;
export const AgentsUpdate403 = ForbiddenError;
export type AgentsUpdate404 = ResourceNotFoundError;
export const AgentsUpdate404 = ResourceNotFoundError;
export type AgentsUpdate422 = ValidationError;
export const AgentsUpdate422 = ValidationError;
export type AgentsUpdate500 = InternalError;
export const AgentsUpdate500 = InternalError;
export type AgentsUpdate504 = GatewayTimeoutError;
export const AgentsUpdate504 = GatewayTimeoutError;
export type AgentsReplaceDraftPathParams = { readonly id: AgentId };
export const AgentsReplaceDraftPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: AgentId }))();
export type AgentsReplaceDraftRequestJson = {
  readonly revision: string;
  readonly definition: AgentDefinition;
};
export const AgentsReplaceDraftRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    revision: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
    definition: AgentDefinition,
  }))();
export type AgentsReplaceDraft200 = Agent;
export const AgentsReplaceDraft200 = Agent;
export type AgentsReplaceDraft401 = UnauthorizedError;
export const AgentsReplaceDraft401 = UnauthorizedError;
export type AgentsReplaceDraft403 = ForbiddenError;
export const AgentsReplaceDraft403 = ForbiddenError;
export type AgentsReplaceDraft404 = ResourceNotFoundError;
export const AgentsReplaceDraft404 = ResourceNotFoundError;
export type AgentsReplaceDraft409 = ConflictError;
export const AgentsReplaceDraft409 = ConflictError;
export type AgentsReplaceDraft422 = ValidationError;
export const AgentsReplaceDraft422 = ValidationError;
export type AgentsReplaceDraft500 = InternalError;
export const AgentsReplaceDraft500 = InternalError;
export type AgentsReplaceDraft504 = GatewayTimeoutError;
export const AgentsReplaceDraft504 = GatewayTimeoutError;
export type AgentsPublishPathParams = { readonly id: AgentId };
export const AgentsPublishPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: AgentId }))();
export type AgentsPublishRequestJson = { readonly revision: string };
export const AgentsPublishRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    revision: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
  }))();
export type AgentsPublish200 = PublishAgentResponse;
export const AgentsPublish200 = PublishAgentResponse;
export type AgentsPublish401 = UnauthorizedError;
export const AgentsPublish401 = UnauthorizedError;
export type AgentsPublish403 = ForbiddenError;
export const AgentsPublish403 = ForbiddenError;
export type AgentsPublish404 = ResourceNotFoundError;
export const AgentsPublish404 = ResourceNotFoundError;
export type AgentsPublish409 = ConflictError;
export const AgentsPublish409 = ConflictError;
export type AgentsPublish422 = ValidationError;
export const AgentsPublish422 = ValidationError;
export type AgentsPublish500 = InternalError;
export const AgentsPublish500 = InternalError;
export type AgentsPublish504 = GatewayTimeoutError;
export const AgentsPublish504 = GatewayTimeoutError;
export type AgentsListVersionsPathParams = { readonly id: AgentId };
export const AgentsListVersionsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: AgentId }))();
export type AgentsListVersionsQuery = {
  readonly limit?: number | null;
  readonly cursor?: VersionCursor | null;
};
export const AgentsListVersionsQuery = /* @__PURE__ */ (() =>
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
export type AgentsListVersions200 = AgentVersionPage;
export const AgentsListVersions200 = AgentVersionPage;
export type AgentsListVersions401 = UnauthorizedError;
export const AgentsListVersions401 = UnauthorizedError;
export type AgentsListVersions403 = ForbiddenError;
export const AgentsListVersions403 = ForbiddenError;
export type AgentsListVersions404 = ResourceNotFoundError;
export const AgentsListVersions404 = ResourceNotFoundError;
export type AgentsListVersions422 = ValidationError;
export const AgentsListVersions422 = ValidationError;
export type AgentsListVersions500 = InternalError;
export const AgentsListVersions500 = InternalError;
export type AgentsListVersions504 = GatewayTimeoutError;
export const AgentsListVersions504 = GatewayTimeoutError;
export type AgentsGetVersionPathParams = { readonly id: AgentId; readonly version: string };
export const AgentsGetVersionPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: AgentId, version: Schema.String }))();
export type AgentsGetVersion200 = AgentVersion;
export const AgentsGetVersion200 = AgentVersion;
export type AgentsGetVersion401 = UnauthorizedError;
export const AgentsGetVersion401 = UnauthorizedError;
export type AgentsGetVersion403 = ForbiddenError;
export const AgentsGetVersion403 = ForbiddenError;
export type AgentsGetVersion404 = ResourceNotFoundError;
export const AgentsGetVersion404 = ResourceNotFoundError;
export type AgentsGetVersion422 = ValidationError;
export const AgentsGetVersion422 = ValidationError;
export type AgentsGetVersion500 = InternalError;
export const AgentsGetVersion500 = InternalError;
export type AgentsGetVersion504 = GatewayTimeoutError;
export const AgentsGetVersion504 = GatewayTimeoutError;

export class AgentsGroup extends HttpApiGroup.make("Agents")
  .add(
    HttpApiEndpoint.get("agentsList", "/v1/agents", {
      query: AgentsListQuery,
      success: AgentsList200,
      error: [
        AgentsList401.pipe(HttpApiSchema.status(401)),
        AgentsList403.pipe(HttpApiSchema.status(403)),
        AgentsList422.pipe(HttpApiSchema.status(422)),
        AgentsList500,
        AgentsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "agents.list")
      .annotate(OpenApi.Summary, "List agents")
      .annotate(
        OpenApi.Description,
        "Returns the agents the caller can reach, newest first, without their drafts. Pass nextCursor back as cursor for the next page.",
      ),
    HttpApiEndpoint.post("agentsCreate", "/v1/agents", {
      payload: AgentsCreateRequestJson,
      success: AgentsCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        AgentsCreate401.pipe(HttpApiSchema.status(401)),
        AgentsCreate403.pipe(HttpApiSchema.status(403)),
        AgentsCreate404.pipe(HttpApiSchema.status(404)),
        AgentsCreate422.pipe(HttpApiSchema.status(422)),
        AgentsCreate500,
        AgentsCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "agents.create")
      .annotate(OpenApi.Summary, "Create an agent")
      .annotate(
        OpenApi.Description,
        "Creates an agent with a draft and returns it with status 201. The agent answers nothing until its draft is published. A new agent starts in supervised mode, so each reply waits for a person to approve it. The namespace is set at creation and cannot change.",
      ),
    HttpApiEndpoint.get("agentsGet", "/v1/agents/:id", {
      params: AgentsGetPathParams,
      success: AgentsGet200,
      error: [
        AgentsGet401.pipe(HttpApiSchema.status(401)),
        AgentsGet403.pipe(HttpApiSchema.status(403)),
        AgentsGet404.pipe(HttpApiSchema.status(404)),
        AgentsGet422.pipe(HttpApiSchema.status(422)),
        AgentsGet500,
        AgentsGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "agents.get")
      .annotate(OpenApi.Summary, "Get an agent")
      .annotate(
        OpenApi.Description,
        "Returns an agent with its draft, its current revision, and its newest published version number.",
      ),
    HttpApiEndpoint.delete("agentsRemove", "/v1/agents/:id", {
      params: AgentsRemovePathParams,
      success: AgentsRemove200,
      error: [
        AgentsRemove401.pipe(HttpApiSchema.status(401)),
        AgentsRemove403.pipe(HttpApiSchema.status(403)),
        AgentsRemove404.pipe(HttpApiSchema.status(404)),
        AgentsRemove422.pipe(HttpApiSchema.status(422)),
        AgentsRemove500,
        AgentsRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "agents.remove")
      .annotate(OpenApi.Summary, "Delete an agent")
      .annotate(
        OpenApi.Description,
        "Deletes an agent with its draft and published versions. The endpoints it answered on stop being answered by an agent. A reply already running finishes on the version it started on.",
      ),
    HttpApiEndpoint.patch("agentsUpdate", "/v1/agents/:id", {
      params: AgentsUpdatePathParams,
      payload: AgentsUpdateRequestJson,
      success: AgentsUpdate200,
      error: [
        AgentsUpdate401.pipe(HttpApiSchema.status(401)),
        AgentsUpdate403.pipe(HttpApiSchema.status(403)),
        AgentsUpdate404.pipe(HttpApiSchema.status(404)),
        AgentsUpdate422.pipe(HttpApiSchema.status(422)),
        AgentsUpdate500,
        AgentsUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "agents.update")
      .annotate(OpenApi.Summary, "Rename an agent")
      .annotate(OpenApi.Description, "Renames an agent."),
    HttpApiEndpoint.put("agentsReplaceDraft", "/v1/agents/:id/draft", {
      params: AgentsReplaceDraftPathParams,
      payload: AgentsReplaceDraftRequestJson,
      success: AgentsReplaceDraft200,
      error: [
        AgentsReplaceDraft401.pipe(HttpApiSchema.status(401)),
        AgentsReplaceDraft403.pipe(HttpApiSchema.status(403)),
        AgentsReplaceDraft404.pipe(HttpApiSchema.status(404)),
        AgentsReplaceDraft409.pipe(HttpApiSchema.status(409)),
        AgentsReplaceDraft422.pipe(HttpApiSchema.status(422)),
        AgentsReplaceDraft500,
        AgentsReplaceDraft504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "agents.replaceDraft")
      .annotate(OpenApi.Summary, "Replace an agent draft")
      .annotate(
        OpenApi.Description,
        "Replaces the whole draft and returns the agent with a new revision. The request names the revision it read; a stale revision returns 409. Published versions, and the conversations answered on them, do not change. An endpoint answers for one agent at a time: a draft that names an endpoint another agent answers on returns 409.",
      ),
    HttpApiEndpoint.post("agentsPublish", "/v1/agents/:id/publish", {
      params: AgentsPublishPathParams,
      payload: AgentsPublishRequestJson,
      success: AgentsPublish200,
      error: [
        AgentsPublish401.pipe(HttpApiSchema.status(401)),
        AgentsPublish403.pipe(HttpApiSchema.status(403)),
        AgentsPublish404.pipe(HttpApiSchema.status(404)),
        AgentsPublish409.pipe(HttpApiSchema.status(409)),
        AgentsPublish422.pipe(HttpApiSchema.status(422)),
        AgentsPublish500,
        AgentsPublish504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "agents.publish")
      .annotate(OpenApi.Summary, "Publish an agent")
      .annotate(
        OpenApi.Description,
        "Publishes the draft as the next immutable version. Each conversation moves to it from its next agent reply; a reply already running finishes on the version it started on. The request names the revision it read; a stale revision returns 409. Publishing a draft identical to the newest version changes nothing and answers published false. An endpoint answers for one agent at a time: publishing a draft whose endpoint another agent answers on returns 409. In supervised mode each reply waits for a person to approve it.",
      ),
    HttpApiEndpoint.get("agentsListVersions", "/v1/agents/:id/versions", {
      params: AgentsListVersionsPathParams,
      query: AgentsListVersionsQuery,
      success: AgentsListVersions200,
      error: [
        AgentsListVersions401.pipe(HttpApiSchema.status(401)),
        AgentsListVersions403.pipe(HttpApiSchema.status(403)),
        AgentsListVersions404.pipe(HttpApiSchema.status(404)),
        AgentsListVersions422.pipe(HttpApiSchema.status(422)),
        AgentsListVersions500,
        AgentsListVersions504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "agents.listVersions")
      .annotate(OpenApi.Summary, "List published agent versions")
      .annotate(
        OpenApi.Description,
        "Returns an agent's published versions, newest first, without their definitions. Pass nextCursor back as cursor for the next page.",
      ),
    HttpApiEndpoint.get("agentsGetVersion", "/v1/agents/:id/versions/:version", {
      params: AgentsGetVersionPathParams,
      success: AgentsGetVersion200,
      error: [
        AgentsGetVersion401.pipe(HttpApiSchema.status(401)),
        AgentsGetVersion403.pipe(HttpApiSchema.status(403)),
        AgentsGetVersion404.pipe(HttpApiSchema.status(404)),
        AgentsGetVersion422.pipe(HttpApiSchema.status(422)),
        AgentsGetVersion500,
        AgentsGetVersion504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "agents.getVersion")
      .annotate(OpenApi.Summary, "Get a published agent version")
      .annotate(OpenApi.Description, "Returns the immutable definition of one published version."),
  )
  .annotate(
    OpenApi.Description,
    "Agents that answer conversations on your mailbox endpoints, with a draft, published versions, and rules for supervision, hours, and staff takeover",
  ) {}
