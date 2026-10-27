// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  BillingProviderError,
  ConflictError,
  ContactId,
  Cursor,
  FlagDisabledError,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  JourneyDefinition,
  JourneyName,
  JourneyNodeId,
  JsonObject,
  MessageId,
  PaymentRequiredError,
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type JourneyStatus = "draft" | "active" | "paused" | "archived";
export const JourneyStatus = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Literal("draft"),
    Schema.Literal("active"),
    Schema.Literal("paused"),
    Schema.Literal("archived"),
  ]).annotate({ identifier: "JourneyStatus" }))();
export type JourneyId = string & EffectBrand.Brand<"JourneyId">;
export const JourneyId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^jrny_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^jrny_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "JourneyId",
    }),
  ).pipe(Schema.brand("JourneyId")))();
export type JourneyRunStatus = "active" | "paused" | "exited" | "failed";
export const JourneyRunStatus = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Literal("active"),
    Schema.Literal("paused"),
    Schema.Literal("exited"),
    Schema.Literal("failed"),
  ]).annotate({ identifier: "JourneyRunStatus" }))();
export type JourneyRunId = string & EffectBrand.Brand<"JourneyRunId">;
export const JourneyRunId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^jrun_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^jrun_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "JourneyRunId",
    }),
  ).pipe(Schema.brand("JourneyRunId")))();
export type JourneyRunExitReason = "completed" | "goal" | "archived";
export const JourneyRunExitReason = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Literal("completed"),
    Schema.Literal("goal"),
    Schema.Literal("archived"),
  ]).annotate({ identifier: "JourneyRunExitReason" }))();
export type JourneyRunStepOutcome =
  | "completed"
  | "matched"
  | "timed_out"
  | "goal"
  | "archived"
  | "failed";
export const JourneyRunStepOutcome = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Literal("completed"),
    Schema.Literal("matched"),
    Schema.Literal("timed_out"),
    Schema.Literal("goal"),
    Schema.Literal("archived"),
    Schema.Literal("failed"),
  ]).annotate({ identifier: "JourneyRunStepOutcome" }))();
export type JourneyRunCounts = {
  readonly active: number;
  readonly paused: number;
  readonly exited: number;
  readonly failed: number;
};
export const JourneyRunCounts = /* @__PURE__ */ (() =>
  Schema.Struct({
    active: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    paused: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    exited: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    failed: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  }).annotate({ identifier: "JourneyRunCounts" }))();
export type JourneyRunTrigger = {
  readonly eventId: string;
  readonly eventName: string;
  readonly properties: JsonObject;
};
export const JourneyRunTrigger = /* @__PURE__ */ (() =>
  Schema.Struct({
    eventId: Schema.String,
    eventName: Schema.String,
    properties: JsonObject,
  }).annotate({ identifier: "JourneyRunTrigger" }))();
export type JourneyListItem = {
  readonly id: JourneyId;
  readonly name: string;
  readonly status: JourneyStatus;
  readonly publishedVersion: number | null;
  readonly publishedAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const JourneyListItem = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: JourneyId,
    name: Schema.String,
    status: JourneyStatus,
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
  }).annotate({ identifier: "JourneyListItem" }))();
export type DeleteJourneyResponse = { readonly id: JourneyId; readonly deleted: true };
export const DeleteJourneyResponse = /* @__PURE__ */ (() =>
  Schema.Struct({ id: JourneyId, deleted: Schema.Literal(true) }).annotate({
    identifier: "DeleteJourneyResponse",
  }))();
export type JourneyNodeStats = {
  readonly nodeId: JourneyNodeId;
  readonly current: number;
  readonly entered: number;
};
export const JourneyNodeStats = /* @__PURE__ */ (() =>
  Schema.Struct({
    nodeId: JourneyNodeId,
    current: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    entered: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  }).annotate({ identifier: "JourneyNodeStats" }))();
export type JourneyRunStep = {
  readonly nodeId: JourneyNodeId;
  readonly type: string;
  readonly enteredAt: string;
  readonly completedAt: string | null;
  readonly outcome: JourneyRunStepOutcome | null;
  readonly nextNodeId: JourneyNodeId | null;
  readonly messageId: MessageId | null;
  readonly error: string | null;
};
export const JourneyRunStep = /* @__PURE__ */ (() =>
  Schema.Struct({
    nodeId: JourneyNodeId,
    type: Schema.String,
    enteredAt: Schema.String,
    completedAt: Schema.Union([Schema.String, Schema.Null]),
    outcome: Schema.Union([JourneyRunStepOutcome, Schema.Null]),
    nextNodeId: Schema.Union([JourneyNodeId, Schema.Null]),
    messageId: Schema.Union([MessageId, Schema.Null]),
    error: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "JourneyRunStep" }))();
export type JourneyRun = {
  readonly id: JourneyRunId;
  readonly journeyId: JourneyId;
  readonly version: number;
  readonly contactId: ContactId;
  readonly status: JourneyRunStatus;
  readonly exitReason: JourneyRunExitReason | null;
  readonly failureReason: string | null;
  readonly currentNodeId: JourneyNodeId | null;
  readonly holdReason: string | null;
  readonly holdUntil: string | null;
  readonly trigger: JourneyRunTrigger;
  readonly enteredAt: string;
  readonly endedAt: string | null;
};
export const JourneyRun = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: JourneyRunId,
    journeyId: JourneyId,
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
    contactId: ContactId,
    status: JourneyRunStatus,
    exitReason: Schema.Union([JourneyRunExitReason, Schema.Null]),
    failureReason: Schema.Union([Schema.String, Schema.Null]),
    currentNodeId: Schema.Union([JourneyNodeId, Schema.Null]),
    holdReason: Schema.Union([Schema.String, Schema.Null]),
    holdUntil: Schema.Union([Schema.String, Schema.Null]),
    trigger: JourneyRunTrigger,
    enteredAt: Schema.String,
    endedAt: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "JourneyRun" }))();
export type JourneyPage = {
  readonly items: ReadonlyArray<JourneyListItem>;
  readonly nextCursor: string | null;
};
export const JourneyPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(JourneyListItem),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "JourneyPage" }))();
export type JourneyStats = {
  readonly journeyId: JourneyId;
  readonly version: number;
  readonly runs: JourneyRunCounts;
  readonly nodes: ReadonlyArray<JourneyNodeStats>;
};
export const JourneyStats = /* @__PURE__ */ (() =>
  Schema.Struct({
    journeyId: JourneyId,
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
    runs: JourneyRunCounts,
    nodes: Schema.Array(JourneyNodeStats),
  }).annotate({ identifier: "JourneyStats" }))();
export type JourneyRunDetail = {
  readonly id: JourneyRunId;
  readonly journeyId: JourneyId;
  readonly version: number;
  readonly contactId: ContactId;
  readonly status: JourneyRunStatus;
  readonly exitReason: JourneyRunExitReason | null;
  readonly failureReason: string | null;
  readonly currentNodeId: JourneyNodeId | null;
  readonly holdReason: string | null;
  readonly holdUntil: string | null;
  readonly trigger: JourneyRunTrigger;
  readonly enteredAt: string;
  readonly endedAt: string | null;
  readonly steps: ReadonlyArray<JourneyRunStep>;
};
export const JourneyRunDetail = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: JourneyRunId,
    journeyId: JourneyId,
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
    contactId: ContactId,
    status: JourneyRunStatus,
    exitReason: Schema.Union([JourneyRunExitReason, Schema.Null]),
    failureReason: Schema.Union([Schema.String, Schema.Null]),
    currentNodeId: Schema.Union([JourneyNodeId, Schema.Null]),
    holdReason: Schema.Union([Schema.String, Schema.Null]),
    holdUntil: Schema.Union([Schema.String, Schema.Null]),
    trigger: JourneyRunTrigger,
    enteredAt: Schema.String,
    endedAt: Schema.Union([Schema.String, Schema.Null]),
    steps: Schema.Array(JourneyRunStep),
  }).annotate({ identifier: "JourneyRunDetail" }))();
export type JourneyRunPage = {
  readonly items: ReadonlyArray<JourneyRun>;
  readonly nextCursor: string | null;
};
export const JourneyRunPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(JourneyRun),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "JourneyRunPage" }))();
export type Journey = {
  readonly id: JourneyId;
  readonly name: string;
  readonly status: JourneyStatus;
  readonly revision: string;
  readonly draft: JourneyDefinition;
  readonly publishedVersion: number | null;
  readonly publishedAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const Journey = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: JourneyId,
    name: Schema.String,
    status: JourneyStatus,
    revision: Schema.String,
    draft: JourneyDefinition,
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
  }).annotate({ identifier: "Journey" }))();
export type JourneyVersion = {
  readonly journeyId: JourneyId;
  readonly version: number;
  readonly definition: JourneyDefinition;
  readonly publishedAt: string;
};
export const JourneyVersion = /* @__PURE__ */ (() =>
  Schema.Struct({
    journeyId: JourneyId,
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
    definition: JourneyDefinition,
    publishedAt: Schema.String,
  }).annotate({ identifier: "JourneyVersion" }))();
export type JourneysListQuery = {
  readonly status?: JourneyStatus | null;
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
};
export const JourneysListQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    status: Schema.optionalKey(Schema.Union([JourneyStatus, Schema.Null])),
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
export type JourneysList200 = JourneyPage;
export const JourneysList200 = JourneyPage;
export type JourneysList401 = UnauthorizedError;
export const JourneysList401 = UnauthorizedError;
export type JourneysList403 = ForbiddenError;
export const JourneysList403 = ForbiddenError;
export type JourneysList422 = ValidationError;
export const JourneysList422 = ValidationError;
export type JourneysList500 = InternalError;
export const JourneysList500 = InternalError;
export type JourneysList504 = GatewayTimeoutError;
export const JourneysList504 = GatewayTimeoutError;
export type JourneysCreateRequestJson = {
  readonly name: JourneyName;
  readonly definition: JourneyDefinition;
};
export const JourneysCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ name: JourneyName, definition: JourneyDefinition }))();
export type JourneysCreate201 = Journey;
export const JourneysCreate201 = Journey;
export type JourneysCreate401 = UnauthorizedError;
export const JourneysCreate401 = UnauthorizedError;
export type JourneysCreate402 = PaymentRequiredError;
export const JourneysCreate402 = PaymentRequiredError;
export type JourneysCreate403 = FlagDisabledError | ForbiddenError;
export const JourneysCreate403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type JourneysCreate404 = ResourceNotFoundError;
export const JourneysCreate404 = ResourceNotFoundError;
export type JourneysCreate409 = ConflictError;
export const JourneysCreate409 = ConflictError;
export type JourneysCreate422 = ValidationError;
export const JourneysCreate422 = ValidationError;
export type JourneysCreate500 = InternalError;
export const JourneysCreate500 = InternalError;
export type JourneysCreate502 = BillingProviderError;
export const JourneysCreate502 = BillingProviderError;
export type JourneysCreate504 = GatewayTimeoutError;
export const JourneysCreate504 = GatewayTimeoutError;
export type JourneysGetPathParams = { readonly id: JourneyId };
export const JourneysGetPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: JourneyId }))();
export type JourneysGet200 = Journey;
export const JourneysGet200 = Journey;
export type JourneysGet401 = UnauthorizedError;
export const JourneysGet401 = UnauthorizedError;
export type JourneysGet403 = ForbiddenError;
export const JourneysGet403 = ForbiddenError;
export type JourneysGet404 = ResourceNotFoundError;
export const JourneysGet404 = ResourceNotFoundError;
export type JourneysGet422 = ValidationError;
export const JourneysGet422 = ValidationError;
export type JourneysGet500 = InternalError;
export const JourneysGet500 = InternalError;
export type JourneysGet504 = GatewayTimeoutError;
export const JourneysGet504 = GatewayTimeoutError;
export type JourneysRemovePathParams = { readonly id: JourneyId };
export const JourneysRemovePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: JourneyId }))();
export type JourneysRemove200 = DeleteJourneyResponse;
export const JourneysRemove200 = DeleteJourneyResponse;
export type JourneysRemove401 = UnauthorizedError;
export const JourneysRemove401 = UnauthorizedError;
export type JourneysRemove403 = ForbiddenError;
export const JourneysRemove403 = ForbiddenError;
export type JourneysRemove404 = ResourceNotFoundError;
export const JourneysRemove404 = ResourceNotFoundError;
export type JourneysRemove409 = ConflictError;
export const JourneysRemove409 = ConflictError;
export type JourneysRemove422 = ValidationError;
export const JourneysRemove422 = ValidationError;
export type JourneysRemove500 = InternalError;
export const JourneysRemove500 = InternalError;
export type JourneysRemove504 = GatewayTimeoutError;
export const JourneysRemove504 = GatewayTimeoutError;
export type JourneysUpdatePathParams = { readonly id: JourneyId };
export const JourneysUpdatePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: JourneyId }))();
export type JourneysUpdateRequestJson = { readonly name: JourneyName };
export const JourneysUpdateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ name: JourneyName }))();
export type JourneysUpdate200 = Journey;
export const JourneysUpdate200 = Journey;
export type JourneysUpdate401 = UnauthorizedError;
export const JourneysUpdate401 = UnauthorizedError;
export type JourneysUpdate403 = ForbiddenError;
export const JourneysUpdate403 = ForbiddenError;
export type JourneysUpdate404 = ResourceNotFoundError;
export const JourneysUpdate404 = ResourceNotFoundError;
export type JourneysUpdate422 = ValidationError;
export const JourneysUpdate422 = ValidationError;
export type JourneysUpdate500 = InternalError;
export const JourneysUpdate500 = InternalError;
export type JourneysUpdate504 = GatewayTimeoutError;
export const JourneysUpdate504 = GatewayTimeoutError;
export type JourneysArchivePathParams = { readonly id: JourneyId };
export const JourneysArchivePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: JourneyId }))();
export type JourneysArchive200 = Journey;
export const JourneysArchive200 = Journey;
export type JourneysArchive401 = UnauthorizedError;
export const JourneysArchive401 = UnauthorizedError;
export type JourneysArchive403 = ForbiddenError;
export const JourneysArchive403 = ForbiddenError;
export type JourneysArchive404 = ResourceNotFoundError;
export const JourneysArchive404 = ResourceNotFoundError;
export type JourneysArchive409 = ConflictError;
export const JourneysArchive409 = ConflictError;
export type JourneysArchive422 = ValidationError;
export const JourneysArchive422 = ValidationError;
export type JourneysArchive500 = InternalError;
export const JourneysArchive500 = InternalError;
export type JourneysArchive504 = GatewayTimeoutError;
export const JourneysArchive504 = GatewayTimeoutError;
export type JourneysReplaceDraftPathParams = { readonly id: JourneyId };
export const JourneysReplaceDraftPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: JourneyId }))();
export type JourneysReplaceDraftRequestJson = {
  readonly revision: string;
  readonly definition: JourneyDefinition;
};
export const JourneysReplaceDraftRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    revision: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
    definition: JourneyDefinition,
  }))();
export type JourneysReplaceDraft200 = Journey;
export const JourneysReplaceDraft200 = Journey;
export type JourneysReplaceDraft401 = UnauthorizedError;
export const JourneysReplaceDraft401 = UnauthorizedError;
export type JourneysReplaceDraft402 = PaymentRequiredError;
export const JourneysReplaceDraft402 = PaymentRequiredError;
export type JourneysReplaceDraft403 = FlagDisabledError | ForbiddenError;
export const JourneysReplaceDraft403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type JourneysReplaceDraft404 = ResourceNotFoundError;
export const JourneysReplaceDraft404 = ResourceNotFoundError;
export type JourneysReplaceDraft409 = ConflictError;
export const JourneysReplaceDraft409 = ConflictError;
export type JourneysReplaceDraft422 = ValidationError;
export const JourneysReplaceDraft422 = ValidationError;
export type JourneysReplaceDraft500 = InternalError;
export const JourneysReplaceDraft500 = InternalError;
export type JourneysReplaceDraft502 = BillingProviderError;
export const JourneysReplaceDraft502 = BillingProviderError;
export type JourneysReplaceDraft504 = GatewayTimeoutError;
export const JourneysReplaceDraft504 = GatewayTimeoutError;
export type JourneysPausePathParams = { readonly id: JourneyId };
export const JourneysPausePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: JourneyId }))();
export type JourneysPause200 = Journey;
export const JourneysPause200 = Journey;
export type JourneysPause401 = UnauthorizedError;
export const JourneysPause401 = UnauthorizedError;
export type JourneysPause403 = ForbiddenError;
export const JourneysPause403 = ForbiddenError;
export type JourneysPause404 = ResourceNotFoundError;
export const JourneysPause404 = ResourceNotFoundError;
export type JourneysPause409 = ConflictError;
export const JourneysPause409 = ConflictError;
export type JourneysPause422 = ValidationError;
export const JourneysPause422 = ValidationError;
export type JourneysPause500 = InternalError;
export const JourneysPause500 = InternalError;
export type JourneysPause504 = GatewayTimeoutError;
export const JourneysPause504 = GatewayTimeoutError;
export type JourneysPublishPathParams = { readonly id: JourneyId };
export const JourneysPublishPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: JourneyId }))();
export type JourneysPublishRequestJson = { readonly revision: string };
export const JourneysPublishRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    revision: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
  }))();
export type JourneysPublish200 = Journey;
export const JourneysPublish200 = Journey;
export type JourneysPublish401 = UnauthorizedError;
export const JourneysPublish401 = UnauthorizedError;
export type JourneysPublish402 = PaymentRequiredError;
export const JourneysPublish402 = PaymentRequiredError;
export type JourneysPublish403 = FlagDisabledError | ForbiddenError;
export const JourneysPublish403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type JourneysPublish404 = ResourceNotFoundError;
export const JourneysPublish404 = ResourceNotFoundError;
export type JourneysPublish409 = ConflictError;
export const JourneysPublish409 = ConflictError;
export type JourneysPublish422 = ValidationError;
export const JourneysPublish422 = ValidationError;
export type JourneysPublish500 = InternalError;
export const JourneysPublish500 = InternalError;
export type JourneysPublish502 = BillingProviderError;
export const JourneysPublish502 = BillingProviderError;
export type JourneysPublish504 = GatewayTimeoutError;
export const JourneysPublish504 = GatewayTimeoutError;
export type JourneysResumePathParams = { readonly id: JourneyId };
export const JourneysResumePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: JourneyId }))();
export type JourneysResume200 = Journey;
export const JourneysResume200 = Journey;
export type JourneysResume401 = UnauthorizedError;
export const JourneysResume401 = UnauthorizedError;
export type JourneysResume402 = PaymentRequiredError;
export const JourneysResume402 = PaymentRequiredError;
export type JourneysResume403 = FlagDisabledError | ForbiddenError;
export const JourneysResume403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type JourneysResume404 = ResourceNotFoundError;
export const JourneysResume404 = ResourceNotFoundError;
export type JourneysResume409 = ConflictError;
export const JourneysResume409 = ConflictError;
export type JourneysResume422 = ValidationError;
export const JourneysResume422 = ValidationError;
export type JourneysResume500 = InternalError;
export const JourneysResume500 = InternalError;
export type JourneysResume502 = BillingProviderError;
export const JourneysResume502 = BillingProviderError;
export type JourneysResume504 = GatewayTimeoutError;
export const JourneysResume504 = GatewayTimeoutError;
export type JourneysListRunsPathParams = { readonly id: JourneyId };
export const JourneysListRunsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: JourneyId }))();
export type JourneysListRunsQuery = {
  readonly status?: JourneyRunStatus | null;
  readonly contactId?: ContactId | null;
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
};
export const JourneysListRunsQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    status: Schema.optionalKey(Schema.Union([JourneyRunStatus, Schema.Null])),
    contactId: Schema.optionalKey(Schema.Union([ContactId, Schema.Null])),
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
export type JourneysListRuns200 = JourneyRunPage;
export const JourneysListRuns200 = JourneyRunPage;
export type JourneysListRuns401 = UnauthorizedError;
export const JourneysListRuns401 = UnauthorizedError;
export type JourneysListRuns403 = ForbiddenError;
export const JourneysListRuns403 = ForbiddenError;
export type JourneysListRuns404 = ResourceNotFoundError;
export const JourneysListRuns404 = ResourceNotFoundError;
export type JourneysListRuns422 = ValidationError;
export const JourneysListRuns422 = ValidationError;
export type JourneysListRuns500 = InternalError;
export const JourneysListRuns500 = InternalError;
export type JourneysListRuns504 = GatewayTimeoutError;
export const JourneysListRuns504 = GatewayTimeoutError;
export type JourneysGetRunPathParams = { readonly id: JourneyId; readonly runId: JourneyRunId };
export const JourneysGetRunPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: JourneyId, runId: JourneyRunId }))();
export type JourneysGetRun200 = JourneyRunDetail;
export const JourneysGetRun200 = JourneyRunDetail;
export type JourneysGetRun401 = UnauthorizedError;
export const JourneysGetRun401 = UnauthorizedError;
export type JourneysGetRun403 = ForbiddenError;
export const JourneysGetRun403 = ForbiddenError;
export type JourneysGetRun404 = ResourceNotFoundError;
export const JourneysGetRun404 = ResourceNotFoundError;
export type JourneysGetRun422 = ValidationError;
export const JourneysGetRun422 = ValidationError;
export type JourneysGetRun500 = InternalError;
export const JourneysGetRun500 = InternalError;
export type JourneysGetRun504 = GatewayTimeoutError;
export const JourneysGetRun504 = GatewayTimeoutError;
export type JourneysStatsPathParams = { readonly id: JourneyId };
export const JourneysStatsPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: JourneyId }))();
export type JourneysStatsQuery = { readonly version?: number | null };
export const JourneysStatsQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    version: Schema.optionalKey(
      Schema.Union([
        Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
          .check(
            Schema.isLessThanOrEqualTo(9007199254740991).annotate({
              expected: "a value less than or equal to 9007199254740991",
            }),
          )
          .check(Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" })),
        Schema.Null,
      ]),
    ),
  }))();
export type JourneysStats200 = JourneyStats;
export const JourneysStats200 = JourneyStats;
export type JourneysStats401 = UnauthorizedError;
export const JourneysStats401 = UnauthorizedError;
export type JourneysStats403 = ForbiddenError;
export const JourneysStats403 = ForbiddenError;
export type JourneysStats404 = ResourceNotFoundError;
export const JourneysStats404 = ResourceNotFoundError;
export type JourneysStats422 = ValidationError;
export const JourneysStats422 = ValidationError;
export type JourneysStats500 = InternalError;
export const JourneysStats500 = InternalError;
export type JourneysStats504 = GatewayTimeoutError;
export const JourneysStats504 = GatewayTimeoutError;
export type JourneysGetVersionPathParams = { readonly id: JourneyId; readonly version: string };
export const JourneysGetVersionPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: JourneyId, version: Schema.String }))();
export type JourneysGetVersion200 = JourneyVersion;
export const JourneysGetVersion200 = JourneyVersion;
export type JourneysGetVersion401 = UnauthorizedError;
export const JourneysGetVersion401 = UnauthorizedError;
export type JourneysGetVersion403 = ForbiddenError;
export const JourneysGetVersion403 = ForbiddenError;
export type JourneysGetVersion404 = ResourceNotFoundError;
export const JourneysGetVersion404 = ResourceNotFoundError;
export type JourneysGetVersion422 = ValidationError;
export const JourneysGetVersion422 = ValidationError;
export type JourneysGetVersion500 = InternalError;
export const JourneysGetVersion500 = InternalError;
export type JourneysGetVersion504 = GatewayTimeoutError;
export const JourneysGetVersion504 = GatewayTimeoutError;

export class JourneysGroup extends HttpApiGroup.make("Journeys")
  .add(
    HttpApiEndpoint.get("journeysList", "/v1/journeys", {
      query: JourneysListQuery,
      success: JourneysList200,
      error: [
        JourneysList401.pipe(HttpApiSchema.status(401)),
        JourneysList403.pipe(HttpApiSchema.status(403)),
        JourneysList422.pipe(HttpApiSchema.status(422)),
        JourneysList500,
        JourneysList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "journeys.list")
      .annotate(OpenApi.Summary, "List journeys")
      .annotate(
        OpenApi.Description,
        "Returns the organization's journeys, newest first, optionally filtered by status. Pass nextCursor back as cursor for the next page.",
      ),
    HttpApiEndpoint.post("journeysCreate", "/v1/journeys", {
      payload: JourneysCreateRequestJson,
      success: JourneysCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        JourneysCreate401.pipe(HttpApiSchema.status(401)),
        JourneysCreate402.pipe(HttpApiSchema.status(402)),
        JourneysCreate403.pipe(HttpApiSchema.status(403)),
        JourneysCreate404.pipe(HttpApiSchema.status(404)),
        JourneysCreate409.pipe(HttpApiSchema.status(409)),
        JourneysCreate422.pipe(HttpApiSchema.status(422)),
        JourneysCreate500,
        JourneysCreate502.pipe(HttpApiSchema.status(502)),
        JourneysCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "journeys.create")
      .annotate(OpenApi.Summary, "Create a journey")
      .annotate(
        OpenApi.Description,
        "Creates a draft journey from a definition: a trigger, a root node, and a graph of at most 200 nodes that is acyclic and fully reachable. Templates, senders, and groups the definition names must belong to the organization. Requires a plan that includes journeys.",
      ),
    HttpApiEndpoint.get("journeysGet", "/v1/journeys/:id", {
      params: JourneysGetPathParams,
      success: JourneysGet200,
      error: [
        JourneysGet401.pipe(HttpApiSchema.status(401)),
        JourneysGet403.pipe(HttpApiSchema.status(403)),
        JourneysGet404.pipe(HttpApiSchema.status(404)),
        JourneysGet422.pipe(HttpApiSchema.status(422)),
        JourneysGet500,
        JourneysGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "journeys.get")
      .annotate(OpenApi.Summary, "Get a journey")
      .annotate(
        OpenApi.Description,
        "Returns a journey with its draft definition, its current revision, and its newest published version number.",
      ),
    HttpApiEndpoint.delete("journeysRemove", "/v1/journeys/:id", {
      params: JourneysRemovePathParams,
      success: JourneysRemove200,
      error: [
        JourneysRemove401.pipe(HttpApiSchema.status(401)),
        JourneysRemove403.pipe(HttpApiSchema.status(403)),
        JourneysRemove404.pipe(HttpApiSchema.status(404)),
        JourneysRemove409.pipe(HttpApiSchema.status(409)),
        JourneysRemove422.pipe(HttpApiSchema.status(422)),
        JourneysRemove500,
        JourneysRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "journeys.remove")
      .annotate(OpenApi.Summary, "Delete a journey")
      .annotate(
        OpenApi.Description,
        "Deletes a journey that was never published or is archived, with its versions and runs. An active or paused journey returns 409; archive it first.",
      ),
    HttpApiEndpoint.patch("journeysUpdate", "/v1/journeys/:id", {
      params: JourneysUpdatePathParams,
      payload: JourneysUpdateRequestJson,
      success: JourneysUpdate200,
      error: [
        JourneysUpdate401.pipe(HttpApiSchema.status(401)),
        JourneysUpdate403.pipe(HttpApiSchema.status(403)),
        JourneysUpdate404.pipe(HttpApiSchema.status(404)),
        JourneysUpdate422.pipe(HttpApiSchema.status(422)),
        JourneysUpdate500,
        JourneysUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "journeys.update")
      .annotate(OpenApi.Summary, "Rename a journey")
      .annotate(OpenApi.Description, "Renames a journey."),
    HttpApiEndpoint.post("journeysArchive", "/v1/journeys/:id/archive", {
      params: JourneysArchivePathParams,
      success: JourneysArchive200,
      error: [
        JourneysArchive401.pipe(HttpApiSchema.status(401)),
        JourneysArchive403.pipe(HttpApiSchema.status(403)),
        JourneysArchive404.pipe(HttpApiSchema.status(404)),
        JourneysArchive409.pipe(HttpApiSchema.status(409)),
        JourneysArchive422.pipe(HttpApiSchema.status(422)),
        JourneysArchive500,
        JourneysArchive504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "journeys.archive")
      .annotate(OpenApi.Summary, "Archive a journey")
      .annotate(
        OpenApi.Description,
        "Stops new enrollment for good and exits every live run with exit reason archived. An archived journey cannot be edited, published, or resumed.",
      ),
    HttpApiEndpoint.put("journeysReplaceDraft", "/v1/journeys/:id/draft", {
      params: JourneysReplaceDraftPathParams,
      payload: JourneysReplaceDraftRequestJson,
      success: JourneysReplaceDraft200,
      error: [
        JourneysReplaceDraft401.pipe(HttpApiSchema.status(401)),
        JourneysReplaceDraft402.pipe(HttpApiSchema.status(402)),
        JourneysReplaceDraft403.pipe(HttpApiSchema.status(403)),
        JourneysReplaceDraft404.pipe(HttpApiSchema.status(404)),
        JourneysReplaceDraft409.pipe(HttpApiSchema.status(409)),
        JourneysReplaceDraft422.pipe(HttpApiSchema.status(422)),
        JourneysReplaceDraft500,
        JourneysReplaceDraft502.pipe(HttpApiSchema.status(502)),
        JourneysReplaceDraft504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "journeys.replaceDraft")
      .annotate(OpenApi.Summary, "Replace a journey draft")
      .annotate(
        OpenApi.Description,
        "Replaces the draft definition and returns the journey with a new revision. The request names the revision it read; a stale revision returns 409. Published versions and the runs on them do not change.",
      ),
    HttpApiEndpoint.post("journeysPause", "/v1/journeys/:id/pause", {
      params: JourneysPausePathParams,
      success: JourneysPause200,
      error: [
        JourneysPause401.pipe(HttpApiSchema.status(401)),
        JourneysPause403.pipe(HttpApiSchema.status(403)),
        JourneysPause404.pipe(HttpApiSchema.status(404)),
        JourneysPause409.pipe(HttpApiSchema.status(409)),
        JourneysPause422.pipe(HttpApiSchema.status(422)),
        JourneysPause500,
        JourneysPause504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "journeys.pause")
      .annotate(OpenApi.Summary, "Pause a journey")
      .annotate(
        OpenApi.Description,
        "Stops new enrollment and holds every live run before its next node, including a run whose wait ends while the journey is paused. Held runs report status paused.",
      ),
    HttpApiEndpoint.post("journeysPublish", "/v1/journeys/:id/publish", {
      params: JourneysPublishPathParams,
      payload: JourneysPublishRequestJson,
      success: JourneysPublish200,
      error: [
        JourneysPublish401.pipe(HttpApiSchema.status(401)),
        JourneysPublish402.pipe(HttpApiSchema.status(402)),
        JourneysPublish403.pipe(HttpApiSchema.status(403)),
        JourneysPublish404.pipe(HttpApiSchema.status(404)),
        JourneysPublish409.pipe(HttpApiSchema.status(409)),
        JourneysPublish422.pipe(HttpApiSchema.status(422)),
        JourneysPublish500,
        JourneysPublish502.pipe(HttpApiSchema.status(502)),
        JourneysPublish504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "journeys.publish")
      .annotate(OpenApi.Summary, "Publish a journey")
      .annotate(
        OpenApi.Description,
        "Publishes the draft as the next immutable version; new runs start on it and existing runs stay on the version they entered. The request names the revision it read; a stale revision returns 409. Publishing a draft identical to the newest version changes nothing. A draft journey becomes active; a paused journey stays paused. A published version sends and updates tags as its publisher, so a draft with a send_email node requires a key that can send email and one with an update_tags node requires contacts:update; without them the request returns 403.",
      ),
    HttpApiEndpoint.post("journeysResume", "/v1/journeys/:id/resume", {
      params: JourneysResumePathParams,
      success: JourneysResume200,
      error: [
        JourneysResume401.pipe(HttpApiSchema.status(401)),
        JourneysResume402.pipe(HttpApiSchema.status(402)),
        JourneysResume403.pipe(HttpApiSchema.status(403)),
        JourneysResume404.pipe(HttpApiSchema.status(404)),
        JourneysResume409.pipe(HttpApiSchema.status(409)),
        JourneysResume422.pipe(HttpApiSchema.status(422)),
        JourneysResume500,
        JourneysResume502.pipe(HttpApiSchema.status(502)),
        JourneysResume504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "journeys.resume")
      .annotate(OpenApi.Summary, "Resume a journey")
      .annotate(
        OpenApi.Description,
        "Resumes enrollment and continues the runs the pause held. Requires a plan that includes journeys.",
      ),
    HttpApiEndpoint.get("journeysListRuns", "/v1/journeys/:id/runs", {
      params: JourneysListRunsPathParams,
      query: JourneysListRunsQuery,
      success: JourneysListRuns200,
      error: [
        JourneysListRuns401.pipe(HttpApiSchema.status(401)),
        JourneysListRuns403.pipe(HttpApiSchema.status(403)),
        JourneysListRuns404.pipe(HttpApiSchema.status(404)),
        JourneysListRuns422.pipe(HttpApiSchema.status(422)),
        JourneysListRuns500,
        JourneysListRuns504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "journeys.listRuns")
      .annotate(OpenApi.Summary, "List journey runs")
      .annotate(
        OpenApi.Description,
        "Returns a journey's runs, newest first, optionally filtered by status or contact. Pass nextCursor back as cursor for the next page.",
      ),
    HttpApiEndpoint.get("journeysGetRun", "/v1/journeys/:id/runs/:runId", {
      params: JourneysGetRunPathParams,
      success: JourneysGetRun200,
      error: [
        JourneysGetRun401.pipe(HttpApiSchema.status(401)),
        JourneysGetRun403.pipe(HttpApiSchema.status(403)),
        JourneysGetRun404.pipe(HttpApiSchema.status(404)),
        JourneysGetRun422.pipe(HttpApiSchema.status(422)),
        JourneysGetRun500,
        JourneysGetRun504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "journeys.getRun")
      .annotate(OpenApi.Summary, "Get a journey run")
      .annotate(
        OpenApi.Description,
        "Returns one run with every node it entered, in order: when it entered and left, how it left, and the message a send node created.",
      ),
    HttpApiEndpoint.get("journeysStats", "/v1/journeys/:id/stats", {
      params: JourneysStatsPathParams,
      query: JourneysStatsQuery,
      success: JourneysStats200,
      error: [
        JourneysStats401.pipe(HttpApiSchema.status(401)),
        JourneysStats403.pipe(HttpApiSchema.status(403)),
        JourneysStats404.pipe(HttpApiSchema.status(404)),
        JourneysStats422.pipe(HttpApiSchema.status(422)),
        JourneysStats500,
        JourneysStats504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "journeys.stats")
      .annotate(OpenApi.Summary, "Get journey run counts")
      .annotate(
        OpenApi.Description,
        "Counts one published version's runs by status, and per node the live runs there now and the runs that have entered it. Defaults to the newest published version.",
      ),
    HttpApiEndpoint.get("journeysGetVersion", "/v1/journeys/:id/versions/:version", {
      params: JourneysGetVersionPathParams,
      success: JourneysGetVersion200,
      error: [
        JourneysGetVersion401.pipe(HttpApiSchema.status(401)),
        JourneysGetVersion403.pipe(HttpApiSchema.status(403)),
        JourneysGetVersion404.pipe(HttpApiSchema.status(404)),
        JourneysGetVersion422.pipe(HttpApiSchema.status(422)),
        JourneysGetVersion500,
        JourneysGetVersion504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "journeys.getVersion")
      .annotate(OpenApi.Summary, "Get a published journey version")
      .annotate(OpenApi.Description, "Returns the immutable definition of one published version."),
  )
  .annotate(
    OpenApi.Description,
    "Event-triggered, per-contact email flows defined as versioned node graphs",
  ) {}
