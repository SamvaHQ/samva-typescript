// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  ConflictError,
  Cursor,
  ExtensionId,
  ExtensionVersionId,
  ExtensionVersionRef,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  MailboxId,
  NamespaceId,
  OrganizationId,
  ResourceNotFoundError,
  SuccessResponse,
  UnauthorizedError,
  UserId,
  ValidationError,
  WebhookEndpointId,
  __SamvaRuntimeSensitiveString,
} from "./shared";

export type ExtensionInstallationId = string & EffectBrand.Brand<"ExtensionInstallationId">;
export const ExtensionInstallationId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^exti_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^exti_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "ExtensionInstallationId",
  }),
).pipe(Schema.brand("ExtensionInstallationId"));
export type ExtensionRunSummary = {
  readonly id: string;
  readonly eventId: string;
  readonly eventType:
    | "mailbox.message.received"
    | "mailbox.message.sent"
    | "mailbox.action.pending_approval"
    | "mailbox.action.resolved"
    | "mailbox.message.quarantined"
    | "mailbox.message.released"
    | "mailbox.message.discarded";
  readonly attempt: number;
  readonly startedAt: string;
  readonly durationMs: number;
  readonly outcome: "succeeded" | "failed" | "timed_out" | "budget_exhausted" | "revoked";
  readonly error: string | null;
};
export const ExtensionRunSummary = /* @__PURE__ */ Schema.Struct({
  id: Schema.String,
  eventId: Schema.String,
  eventType: Schema.Union([
    Schema.Literal("mailbox.message.received"),
    Schema.Literal("mailbox.message.sent"),
    Schema.Literal("mailbox.action.pending_approval"),
    Schema.Literal("mailbox.action.resolved"),
    Schema.Literal("mailbox.message.quarantined"),
    Schema.Literal("mailbox.message.released"),
    Schema.Literal("mailbox.message.discarded"),
  ]),
  attempt: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  startedAt: Schema.String,
  durationMs: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  outcome: Schema.Union([
    Schema.Literal("succeeded"),
    Schema.Literal("failed"),
    Schema.Literal("timed_out"),
    Schema.Literal("budget_exhausted"),
    Schema.Literal("revoked"),
  ]),
  error: Schema.Union([Schema.String, Schema.Null]),
}).annotate({ identifier: "ExtensionRunSummary" });
export type ExtensionRun = {
  readonly id: string;
  readonly eventId: string;
  readonly eventType:
    | "mailbox.message.received"
    | "mailbox.message.sent"
    | "mailbox.action.pending_approval"
    | "mailbox.action.resolved"
    | "mailbox.message.quarantined"
    | "mailbox.message.released"
    | "mailbox.message.discarded";
  readonly attempt: number;
  readonly startedAt: string;
  readonly durationMs: number;
  readonly outcome: "succeeded" | "failed" | "timed_out" | "budget_exhausted" | "revoked";
  readonly error: string | null;
  readonly logs: ReadonlyArray<string>;
};
export const ExtensionRun = /* @__PURE__ */ Schema.Struct({
  id: Schema.String,
  eventId: Schema.String,
  eventType: Schema.Union([
    Schema.Literal("mailbox.message.received"),
    Schema.Literal("mailbox.message.sent"),
    Schema.Literal("mailbox.action.pending_approval"),
    Schema.Literal("mailbox.action.resolved"),
    Schema.Literal("mailbox.message.quarantined"),
    Schema.Literal("mailbox.message.released"),
    Schema.Literal("mailbox.message.discarded"),
  ]),
  attempt: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  startedAt: Schema.String,
  durationMs: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  outcome: Schema.Union([
    Schema.Literal("succeeded"),
    Schema.Literal("failed"),
    Schema.Literal("timed_out"),
    Schema.Literal("budget_exhausted"),
    Schema.Literal("revoked"),
  ]),
  error: Schema.Union([Schema.String, Schema.Null]),
  logs: Schema.Array(Schema.String),
}).annotate({ identifier: "ExtensionRun" });
export type ExtensionPermissionDiff = {
  readonly added: ReadonlyArray<
    | "permission:read"
    | "permission:update"
    | "permission:send"
    | "permission:quarantine.read"
    | "event:mailbox.message.received"
    | "event:mailbox.message.sent"
    | "event:mailbox.action.pending_approval"
    | "event:mailbox.action.resolved"
    | "event:mailbox.message.quarantined"
    | "event:mailbox.message.released"
    | "event:mailbox.message.discarded"
  >;
  readonly removed: ReadonlyArray<
    | "permission:read"
    | "permission:update"
    | "permission:send"
    | "permission:quarantine.read"
    | "event:mailbox.message.received"
    | "event:mailbox.message.sent"
    | "event:mailbox.action.pending_approval"
    | "event:mailbox.action.resolved"
    | "event:mailbox.message.quarantined"
    | "event:mailbox.message.released"
    | "event:mailbox.message.discarded"
  >;
};
export const ExtensionPermissionDiff = /* @__PURE__ */ Schema.Struct({
  added: Schema.Array(
    Schema.Union([
      Schema.Literal("permission:read"),
      Schema.Literal("permission:update"),
      Schema.Literal("permission:send"),
      Schema.Literal("permission:quarantine.read"),
      Schema.Literal("event:mailbox.message.received"),
      Schema.Literal("event:mailbox.message.sent"),
      Schema.Literal("event:mailbox.action.pending_approval"),
      Schema.Literal("event:mailbox.action.resolved"),
      Schema.Literal("event:mailbox.message.quarantined"),
      Schema.Literal("event:mailbox.message.released"),
      Schema.Literal("event:mailbox.message.discarded"),
    ]),
  ),
  removed: Schema.Array(
    Schema.Union([
      Schema.Literal("permission:read"),
      Schema.Literal("permission:update"),
      Schema.Literal("permission:send"),
      Schema.Literal("permission:quarantine.read"),
      Schema.Literal("event:mailbox.message.received"),
      Schema.Literal("event:mailbox.message.sent"),
      Schema.Literal("event:mailbox.action.pending_approval"),
      Schema.Literal("event:mailbox.action.resolved"),
      Schema.Literal("event:mailbox.message.quarantined"),
      Schema.Literal("event:mailbox.message.released"),
      Schema.Literal("event:mailbox.message.discarded"),
    ]),
  ),
}).annotate({ identifier: "ExtensionPermissionDiff" });
export type ExtensionRunList = { readonly items: ReadonlyArray<ExtensionRunSummary> };
export const ExtensionRunList = /* @__PURE__ */ Schema.Struct({
  items: Schema.Array(ExtensionRunSummary),
}).annotate({ identifier: "ExtensionRunList" });
export type ExtensionInstallationSummary = {
  readonly id: ExtensionInstallationId;
  readonly extensionId: ExtensionId;
  readonly name: string;
  readonly displayName: string;
  readonly version: ExtensionVersionRef;
  readonly runtime: "hosted" | "webhook";
  readonly status: "active" | "disabled";
  readonly createdAt: string;
};
export const ExtensionInstallationSummary = /* @__PURE__ */ Schema.Struct({
  id: ExtensionInstallationId,
  extensionId: ExtensionId,
  name: Schema.String,
  displayName: Schema.String,
  version: ExtensionVersionRef,
  runtime: Schema.Union([Schema.Literal("hosted"), Schema.Literal("webhook")]),
  status: Schema.Union([Schema.Literal("active"), Schema.Literal("disabled")]),
  createdAt: Schema.String,
}).annotate({ identifier: "ExtensionInstallationSummary" });
export type ExtensionInstallation = {
  readonly id: ExtensionInstallationId;
  readonly extensionId: ExtensionId;
  readonly name: string;
  readonly displayName: string;
  readonly version: ExtensionVersionRef;
  readonly runtime: "hosted" | "webhook";
  readonly status: "active" | "disabled";
  readonly createdAt: string;
  readonly events: ReadonlyArray<
    | "mailbox.message.received"
    | "mailbox.message.sent"
    | "mailbox.action.pending_approval"
    | "mailbox.action.resolved"
    | "mailbox.message.quarantined"
    | "mailbox.message.released"
    | "mailbox.message.discarded"
  >;
  readonly permissions: ReadonlyArray<"read" | "update" | "send" | "quarantine.read">;
  readonly sendMode: "send" | "approval";
  readonly scope: {
    readonly mailboxIds: ReadonlyArray<MailboxId> | null;
    readonly namespaceId: NamespaceId | null;
  };
  readonly webhook: { readonly endpointId: WebhookEndpointId; readonly url: string } | null;
  readonly updatedAt: string;
  readonly disabledAt: string | null;
};
export const ExtensionInstallation = /* @__PURE__ */ Schema.Struct({
  id: ExtensionInstallationId,
  extensionId: ExtensionId,
  name: Schema.String,
  displayName: Schema.String,
  version: ExtensionVersionRef,
  runtime: Schema.Union([Schema.Literal("hosted"), Schema.Literal("webhook")]),
  status: Schema.Union([Schema.Literal("active"), Schema.Literal("disabled")]),
  createdAt: Schema.String,
  events: Schema.Array(
    Schema.Union([
      Schema.Literal("mailbox.message.received"),
      Schema.Literal("mailbox.message.sent"),
      Schema.Literal("mailbox.action.pending_approval"),
      Schema.Literal("mailbox.action.resolved"),
      Schema.Literal("mailbox.message.quarantined"),
      Schema.Literal("mailbox.message.released"),
      Schema.Literal("mailbox.message.discarded"),
    ]),
  ),
  permissions: Schema.Array(
    Schema.Union([
      Schema.Literal("read"),
      Schema.Literal("update"),
      Schema.Literal("send"),
      Schema.Literal("quarantine.read"),
    ]),
  ),
  sendMode: Schema.Union([Schema.Literal("send"), Schema.Literal("approval")]),
  scope: Schema.Struct({
    mailboxIds: Schema.Union([Schema.Array(MailboxId), Schema.Null]),
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
  }),
  webhook: Schema.Union([
    Schema.Struct({ endpointId: WebhookEndpointId, url: Schema.String }),
    Schema.Null,
  ]),
  updatedAt: Schema.String,
  disabledAt: Schema.Union([Schema.String, Schema.Null]),
}).annotate({ identifier: "ExtensionInstallation" });
export type ExtensionVersionChange = {
  readonly id: string;
  readonly organizationId: OrganizationId;
  readonly installationId: ExtensionInstallationId;
  readonly extensionId: ExtensionId;
  readonly fromVersion: ExtensionVersionRef;
  readonly toVersion: ExtensionVersionRef;
  readonly permissionDiff: ExtensionPermissionDiff;
  readonly changedBy: UserId;
  readonly changedAt: string;
};
export const ExtensionVersionChange = /* @__PURE__ */ Schema.Struct({
  id: Schema.String,
  organizationId: OrganizationId,
  installationId: ExtensionInstallationId,
  extensionId: ExtensionId,
  fromVersion: ExtensionVersionRef,
  toVersion: ExtensionVersionRef,
  permissionDiff: ExtensionPermissionDiff,
  changedBy: UserId,
  changedAt: Schema.String,
}).annotate({ identifier: "ExtensionVersionChange" });
export type ExtensionInstallationPage = {
  readonly items: ReadonlyArray<ExtensionInstallationSummary>;
  readonly nextCursor: string | null;
};
export const ExtensionInstallationPage = /* @__PURE__ */ Schema.Struct({
  items: Schema.Array(ExtensionInstallationSummary),
  nextCursor: Schema.Union([Schema.String, Schema.Null]),
}).annotate({ identifier: "ExtensionInstallationPage" });
export type InstallExtensionResponse = {
  readonly installation: ExtensionInstallation;
  readonly credentials: {
    readonly apiKey: __SamvaRuntimeSensitiveString;
    readonly webhookSecret: __SamvaRuntimeSensitiveString;
  } | null;
};
export const InstallExtensionResponse = /* @__PURE__ */ Schema.Struct({
  installation: ExtensionInstallation,
  credentials: Schema.Union([
    Schema.Struct({
      apiKey: __SamvaRuntimeSensitiveString,
      webhookSecret: __SamvaRuntimeSensitiveString,
    }),
    Schema.Null,
  ]),
}).annotate({ identifier: "InstallExtensionResponse" });
export type UpgradeExtensionResponse = {
  readonly installation: ExtensionInstallation;
  readonly fromVersion: ExtensionVersionRef;
  readonly toVersion: ExtensionVersionRef;
  readonly permissionDiff: ExtensionPermissionDiff;
  readonly dryRun: boolean;
  readonly versionChange: ExtensionVersionChange | null;
};
export const UpgradeExtensionResponse = /* @__PURE__ */ Schema.Struct({
  installation: ExtensionInstallation,
  fromVersion: ExtensionVersionRef,
  toVersion: ExtensionVersionRef,
  permissionDiff: ExtensionPermissionDiff,
  dryRun: Schema.Boolean,
  versionChange: Schema.Union([ExtensionVersionChange, Schema.Null]),
}).annotate({ identifier: "UpgradeExtensionResponse" });
export type ExtensionInstallationsListQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
  readonly after?: string | null;
  readonly before?: string | null;
};
export const ExtensionInstallationsListQuery = /* @__PURE__ */ Schema.Struct({
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
  after: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  before: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
});
export type ExtensionInstallationsList200 = ExtensionInstallationPage;
export const ExtensionInstallationsList200 = ExtensionInstallationPage;
export type ExtensionInstallationsList401 = UnauthorizedError;
export const ExtensionInstallationsList401 = UnauthorizedError;
export type ExtensionInstallationsList403 = ForbiddenError;
export const ExtensionInstallationsList403 = ForbiddenError;
export type ExtensionInstallationsList404 = ResourceNotFoundError;
export const ExtensionInstallationsList404 = ResourceNotFoundError;
export type ExtensionInstallationsList422 = ValidationError;
export const ExtensionInstallationsList422 = ValidationError;
export type ExtensionInstallationsList500 = InternalError;
export const ExtensionInstallationsList500 = InternalError;
export type ExtensionInstallationsList504 = GatewayTimeoutError;
export const ExtensionInstallationsList504 = GatewayTimeoutError;
export type ExtensionInstallationsInstallRequestJson = {
  readonly extension: string;
  readonly version?: string | null;
  readonly mailboxIds?: ReadonlyArray<MailboxId> | null;
  readonly namespaceId?: NamespaceId | null;
  readonly permissions?: ReadonlyArray<"read" | "update" | "send" | "quarantine.read"> | null;
  readonly sendMode?: "send" | "approval" | null;
  readonly webhookUrl?: string | null;
};
export const ExtensionInstallationsInstallRequestJson = /* @__PURE__ */ Schema.Struct({
  extension: Schema.String,
  version: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isPattern(
          new RegExp("^\\d{1,6}\\.\\d{1,6}\\.\\d{1,6}(?:-[0-9A-Za-z.-]{1,64})?$", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^\\d{1,6}\\.\\d{1,6}\\.\\d{1,6}(?:-[0-9A-Za-z.-]{1,64})?$",
        }),
      ),
      Schema.Null,
    ]),
  ),
  mailboxIds: Schema.optionalKey(
    Schema.Union([
      Schema.Array(MailboxId).check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      ),
      Schema.Null,
    ]),
  ),
  namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
  permissions: Schema.optionalKey(
    Schema.Union([
      Schema.Array(
        Schema.Union([
          Schema.Literal("read"),
          Schema.Literal("update"),
          Schema.Literal("send"),
          Schema.Literal("quarantine.read"),
        ]),
      ),
      Schema.Null,
    ]),
  ),
  sendMode: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.Literal("send"), Schema.Literal("approval")]), Schema.Null]),
  ),
  webhookUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
});
export type ExtensionInstallationsInstall201 = InstallExtensionResponse;
export const ExtensionInstallationsInstall201 = InstallExtensionResponse;
export type ExtensionInstallationsInstall401 = UnauthorizedError;
export const ExtensionInstallationsInstall401 = UnauthorizedError;
export type ExtensionInstallationsInstall403 = ForbiddenError;
export const ExtensionInstallationsInstall403 = ForbiddenError;
export type ExtensionInstallationsInstall404 = ResourceNotFoundError;
export const ExtensionInstallationsInstall404 = ResourceNotFoundError;
export type ExtensionInstallationsInstall409 = ConflictError;
export const ExtensionInstallationsInstall409 = ConflictError;
export type ExtensionInstallationsInstall422 = ValidationError;
export const ExtensionInstallationsInstall422 = ValidationError;
export type ExtensionInstallationsInstall500 = InternalError;
export const ExtensionInstallationsInstall500 = InternalError;
export type ExtensionInstallationsInstall504 = GatewayTimeoutError;
export const ExtensionInstallationsInstall504 = GatewayTimeoutError;
export type ExtensionInstallationsGetPathParams = { readonly id: ExtensionInstallationId };
export const ExtensionInstallationsGetPathParams = /* @__PURE__ */ Schema.Struct({
  id: ExtensionInstallationId,
});
export type ExtensionInstallationsGet200 = ExtensionInstallation;
export const ExtensionInstallationsGet200 = ExtensionInstallation;
export type ExtensionInstallationsGet401 = UnauthorizedError;
export const ExtensionInstallationsGet401 = UnauthorizedError;
export type ExtensionInstallationsGet403 = ForbiddenError;
export const ExtensionInstallationsGet403 = ForbiddenError;
export type ExtensionInstallationsGet404 = ResourceNotFoundError;
export const ExtensionInstallationsGet404 = ResourceNotFoundError;
export type ExtensionInstallationsGet422 = ValidationError;
export const ExtensionInstallationsGet422 = ValidationError;
export type ExtensionInstallationsGet500 = InternalError;
export const ExtensionInstallationsGet500 = InternalError;
export type ExtensionInstallationsGet504 = GatewayTimeoutError;
export const ExtensionInstallationsGet504 = GatewayTimeoutError;
export type ExtensionInstallationsUninstallPathParams = { readonly id: ExtensionInstallationId };
export const ExtensionInstallationsUninstallPathParams = /* @__PURE__ */ Schema.Struct({
  id: ExtensionInstallationId,
});
export type ExtensionInstallationsUninstall200 = SuccessResponse;
export const ExtensionInstallationsUninstall200 = SuccessResponse;
export type ExtensionInstallationsUninstall401 = UnauthorizedError;
export const ExtensionInstallationsUninstall401 = UnauthorizedError;
export type ExtensionInstallationsUninstall403 = ForbiddenError;
export const ExtensionInstallationsUninstall403 = ForbiddenError;
export type ExtensionInstallationsUninstall404 = ResourceNotFoundError;
export const ExtensionInstallationsUninstall404 = ResourceNotFoundError;
export type ExtensionInstallationsUninstall409 = ConflictError;
export const ExtensionInstallationsUninstall409 = ConflictError;
export type ExtensionInstallationsUninstall422 = ValidationError;
export const ExtensionInstallationsUninstall422 = ValidationError;
export type ExtensionInstallationsUninstall500 = InternalError;
export const ExtensionInstallationsUninstall500 = InternalError;
export type ExtensionInstallationsUninstall504 = GatewayTimeoutError;
export const ExtensionInstallationsUninstall504 = GatewayTimeoutError;
export type ExtensionInstallationsDisablePathParams = { readonly id: ExtensionInstallationId };
export const ExtensionInstallationsDisablePathParams = /* @__PURE__ */ Schema.Struct({
  id: ExtensionInstallationId,
});
export type ExtensionInstallationsDisable200 = ExtensionInstallation;
export const ExtensionInstallationsDisable200 = ExtensionInstallation;
export type ExtensionInstallationsDisable401 = UnauthorizedError;
export const ExtensionInstallationsDisable401 = UnauthorizedError;
export type ExtensionInstallationsDisable403 = ForbiddenError;
export const ExtensionInstallationsDisable403 = ForbiddenError;
export type ExtensionInstallationsDisable404 = ResourceNotFoundError;
export const ExtensionInstallationsDisable404 = ResourceNotFoundError;
export type ExtensionInstallationsDisable409 = ConflictError;
export const ExtensionInstallationsDisable409 = ConflictError;
export type ExtensionInstallationsDisable422 = ValidationError;
export const ExtensionInstallationsDisable422 = ValidationError;
export type ExtensionInstallationsDisable500 = InternalError;
export const ExtensionInstallationsDisable500 = InternalError;
export type ExtensionInstallationsDisable504 = GatewayTimeoutError;
export const ExtensionInstallationsDisable504 = GatewayTimeoutError;
export type ExtensionInstallationsEnablePathParams = { readonly id: ExtensionInstallationId };
export const ExtensionInstallationsEnablePathParams = /* @__PURE__ */ Schema.Struct({
  id: ExtensionInstallationId,
});
export type ExtensionInstallationsEnable200 = ExtensionInstallation;
export const ExtensionInstallationsEnable200 = ExtensionInstallation;
export type ExtensionInstallationsEnable401 = UnauthorizedError;
export const ExtensionInstallationsEnable401 = UnauthorizedError;
export type ExtensionInstallationsEnable403 = ForbiddenError;
export const ExtensionInstallationsEnable403 = ForbiddenError;
export type ExtensionInstallationsEnable404 = ResourceNotFoundError;
export const ExtensionInstallationsEnable404 = ResourceNotFoundError;
export type ExtensionInstallationsEnable409 = ConflictError;
export const ExtensionInstallationsEnable409 = ConflictError;
export type ExtensionInstallationsEnable422 = ValidationError;
export const ExtensionInstallationsEnable422 = ValidationError;
export type ExtensionInstallationsEnable500 = InternalError;
export const ExtensionInstallationsEnable500 = InternalError;
export type ExtensionInstallationsEnable504 = GatewayTimeoutError;
export const ExtensionInstallationsEnable504 = GatewayTimeoutError;
export type ExtensionInstallationsListRunsPathParams = { readonly id: ExtensionInstallationId };
export const ExtensionInstallationsListRunsPathParams = /* @__PURE__ */ Schema.Struct({
  id: ExtensionInstallationId,
});
export type ExtensionInstallationsListRuns200 = ExtensionRunList;
export const ExtensionInstallationsListRuns200 = ExtensionRunList;
export type ExtensionInstallationsListRuns401 = UnauthorizedError;
export const ExtensionInstallationsListRuns401 = UnauthorizedError;
export type ExtensionInstallationsListRuns403 = ForbiddenError;
export const ExtensionInstallationsListRuns403 = ForbiddenError;
export type ExtensionInstallationsListRuns404 = ResourceNotFoundError;
export const ExtensionInstallationsListRuns404 = ResourceNotFoundError;
export type ExtensionInstallationsListRuns422 = ValidationError;
export const ExtensionInstallationsListRuns422 = ValidationError;
export type ExtensionInstallationsListRuns500 = InternalError;
export const ExtensionInstallationsListRuns500 = InternalError;
export type ExtensionInstallationsListRuns504 = GatewayTimeoutError;
export const ExtensionInstallationsListRuns504 = GatewayTimeoutError;
export type ExtensionInstallationsGetRunPathParams = {
  readonly id: ExtensionInstallationId;
  readonly runId: string;
};
export const ExtensionInstallationsGetRunPathParams = /* @__PURE__ */ Schema.Struct({
  id: ExtensionInstallationId,
  runId: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(64).annotate({ expected: "a string with at most 64 code points" }),
    )
    .check(Schema.isMaxLength(64).annotate({ expected: "a value with a length of at most 64" })),
});
export type ExtensionInstallationsGetRun200 = ExtensionRun;
export const ExtensionInstallationsGetRun200 = ExtensionRun;
export type ExtensionInstallationsGetRun401 = UnauthorizedError;
export const ExtensionInstallationsGetRun401 = UnauthorizedError;
export type ExtensionInstallationsGetRun403 = ForbiddenError;
export const ExtensionInstallationsGetRun403 = ForbiddenError;
export type ExtensionInstallationsGetRun404 = ResourceNotFoundError;
export const ExtensionInstallationsGetRun404 = ResourceNotFoundError;
export type ExtensionInstallationsGetRun422 = ValidationError;
export const ExtensionInstallationsGetRun422 = ValidationError;
export type ExtensionInstallationsGetRun500 = InternalError;
export const ExtensionInstallationsGetRun500 = InternalError;
export type ExtensionInstallationsGetRun504 = GatewayTimeoutError;
export const ExtensionInstallationsGetRun504 = GatewayTimeoutError;
export type ExtensionInstallationsUpgradePathParams = { readonly id: ExtensionInstallationId };
export const ExtensionInstallationsUpgradePathParams = /* @__PURE__ */ Schema.Struct({
  id: ExtensionInstallationId,
});
export type ExtensionInstallationsUpgradeRequestJson = {
  readonly version?: string | ExtensionVersionId | null;
  readonly acceptPermissions?: ReadonlyArray<
    | "permission:read"
    | "permission:update"
    | "permission:send"
    | "permission:quarantine.read"
    | "event:mailbox.message.received"
    | "event:mailbox.message.sent"
    | "event:mailbox.action.pending_approval"
    | "event:mailbox.action.resolved"
    | "event:mailbox.message.quarantined"
    | "event:mailbox.message.released"
    | "event:mailbox.message.discarded"
  > | null;
  readonly dryRun?: boolean | null;
};
export const ExtensionInstallationsUpgradeRequestJson = /* @__PURE__ */ Schema.Struct({
  version: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.String.check(
          Schema.isPattern(
            new RegExp("^\\d{1,6}\\.\\d{1,6}\\.\\d{1,6}(?:-[0-9A-Za-z.-]{1,64})?$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^\\d{1,6}\\.\\d{1,6}\\.\\d{1,6}(?:-[0-9A-Za-z.-]{1,64})?$",
          }),
        ),
        ExtensionVersionId,
      ]),
      Schema.Null,
    ]),
  ),
  acceptPermissions: Schema.optionalKey(
    Schema.Union([
      Schema.Array(
        Schema.Union([
          Schema.Literal("permission:read"),
          Schema.Literal("permission:update"),
          Schema.Literal("permission:send"),
          Schema.Literal("permission:quarantine.read"),
          Schema.Literal("event:mailbox.message.received"),
          Schema.Literal("event:mailbox.message.sent"),
          Schema.Literal("event:mailbox.action.pending_approval"),
          Schema.Literal("event:mailbox.action.resolved"),
          Schema.Literal("event:mailbox.message.quarantined"),
          Schema.Literal("event:mailbox.message.released"),
          Schema.Literal("event:mailbox.message.discarded"),
        ]),
      ),
      Schema.Null,
    ]),
  ),
  dryRun: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
});
export type ExtensionInstallationsUpgrade200 = UpgradeExtensionResponse;
export const ExtensionInstallationsUpgrade200 = UpgradeExtensionResponse;
export type ExtensionInstallationsUpgrade401 = UnauthorizedError;
export const ExtensionInstallationsUpgrade401 = UnauthorizedError;
export type ExtensionInstallationsUpgrade403 = ForbiddenError;
export const ExtensionInstallationsUpgrade403 = ForbiddenError;
export type ExtensionInstallationsUpgrade404 = ResourceNotFoundError;
export const ExtensionInstallationsUpgrade404 = ResourceNotFoundError;
export type ExtensionInstallationsUpgrade409 = ConflictError;
export const ExtensionInstallationsUpgrade409 = ConflictError;
export type ExtensionInstallationsUpgrade422 = ValidationError;
export const ExtensionInstallationsUpgrade422 = ValidationError;
export type ExtensionInstallationsUpgrade500 = InternalError;
export const ExtensionInstallationsUpgrade500 = InternalError;
export type ExtensionInstallationsUpgrade504 = GatewayTimeoutError;
export const ExtensionInstallationsUpgrade504 = GatewayTimeoutError;

export class ExtensionInstallationsGroup extends HttpApiGroup.make("Extension installations")
  .add(
    HttpApiEndpoint.get("extensionInstallationsList", "/v1/extension-installations", {
      query: ExtensionInstallationsListQuery,
      success: ExtensionInstallationsList200,
      error: [
        ExtensionInstallationsList401.pipe(HttpApiSchema.status(401)),
        ExtensionInstallationsList403.pipe(HttpApiSchema.status(403)),
        ExtensionInstallationsList404.pipe(HttpApiSchema.status(404)),
        ExtensionInstallationsList422.pipe(HttpApiSchema.status(422)),
        ExtensionInstallationsList500,
        ExtensionInstallationsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "extensionInstallations.list")
      .annotate(OpenApi.Summary, "List installations")
      .annotate(
        OpenApi.Description,
        "Returns summaries of the organization's extension installations, newest first, filterable by creation time (`after`, `before`). Pass `nextCursor` back as `cursor` for the next page; it is null on the last page. Read an installation's permissions, scope, and webhook with `GET /v1/extension-installations/{id}`.",
      ),
    HttpApiEndpoint.post("extensionInstallationsInstall", "/v1/extension-installations", {
      payload: ExtensionInstallationsInstallRequestJson,
      success: ExtensionInstallationsInstall201.pipe(HttpApiSchema.status(201)),
      error: [
        ExtensionInstallationsInstall401.pipe(HttpApiSchema.status(401)),
        ExtensionInstallationsInstall403.pipe(HttpApiSchema.status(403)),
        ExtensionInstallationsInstall404.pipe(HttpApiSchema.status(404)),
        ExtensionInstallationsInstall409.pipe(HttpApiSchema.status(409)),
        ExtensionInstallationsInstall422.pipe(HttpApiSchema.status(422)),
        ExtensionInstallationsInstall500,
        ExtensionInstallationsInstall504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "extensionInstallations.install")
      .annotate(OpenApi.Summary, "Install an extension")
      .annotate(
        OpenApi.Description,
        "Installs a published version with a scope, permissions, and a send mode, and returns it with status 201. The installation acts on your grants narrowed to these; a webhook installation's API key and webhook secret are returned once. Only a person can install, not an API key.",
      ),
    HttpApiEndpoint.get("extensionInstallationsGet", "/v1/extension-installations/:id", {
      params: ExtensionInstallationsGetPathParams,
      success: ExtensionInstallationsGet200,
      error: [
        ExtensionInstallationsGet401.pipe(HttpApiSchema.status(401)),
        ExtensionInstallationsGet403.pipe(HttpApiSchema.status(403)),
        ExtensionInstallationsGet404.pipe(HttpApiSchema.status(404)),
        ExtensionInstallationsGet422.pipe(HttpApiSchema.status(422)),
        ExtensionInstallationsGet500,
        ExtensionInstallationsGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "extensionInstallations.get")
      .annotate(OpenApi.Summary, "Get an installation")
      .annotate(
        OpenApi.Description,
        "Returns one installation with its permissions, scope, send mode, and webhook endpoint.",
      ),
    HttpApiEndpoint.delete("extensionInstallationsUninstall", "/v1/extension-installations/:id", {
      params: ExtensionInstallationsUninstallPathParams,
      success: ExtensionInstallationsUninstall200,
      error: [
        ExtensionInstallationsUninstall401.pipe(HttpApiSchema.status(401)),
        ExtensionInstallationsUninstall403.pipe(HttpApiSchema.status(403)),
        ExtensionInstallationsUninstall404.pipe(HttpApiSchema.status(404)),
        ExtensionInstallationsUninstall409.pipe(HttpApiSchema.status(409)),
        ExtensionInstallationsUninstall422.pipe(HttpApiSchema.status(422)),
        ExtensionInstallationsUninstall500,
        ExtensionInstallationsUninstall504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "extensionInstallations.uninstall")
      .annotate(OpenApi.Summary, "Uninstall an extension")
      .annotate(
        OpenApi.Description,
        "Deletes the installation with its API key and webhook endpoint. Actions it took keep their attribution.",
      ),
    HttpApiEndpoint.post(
      "extensionInstallationsDisable",
      "/v1/extension-installations/:id/disable",
      {
        params: ExtensionInstallationsDisablePathParams,
        success: ExtensionInstallationsDisable200,
        error: [
          ExtensionInstallationsDisable401.pipe(HttpApiSchema.status(401)),
          ExtensionInstallationsDisable403.pipe(HttpApiSchema.status(403)),
          ExtensionInstallationsDisable404.pipe(HttpApiSchema.status(404)),
          ExtensionInstallationsDisable409.pipe(HttpApiSchema.status(409)),
          ExtensionInstallationsDisable422.pipe(HttpApiSchema.status(422)),
          ExtensionInstallationsDisable500,
          ExtensionInstallationsDisable504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "extensionInstallations.disable")
      .annotate(OpenApi.Summary, "Disable an installation")
      .annotate(
        OpenApi.Description,
        "Stops the installation at once: its events stop, and its credential is refused on every surface until it is enabled again.",
      ),
    HttpApiEndpoint.post("extensionInstallationsEnable", "/v1/extension-installations/:id/enable", {
      params: ExtensionInstallationsEnablePathParams,
      success: ExtensionInstallationsEnable200,
      error: [
        ExtensionInstallationsEnable401.pipe(HttpApiSchema.status(401)),
        ExtensionInstallationsEnable403.pipe(HttpApiSchema.status(403)),
        ExtensionInstallationsEnable404.pipe(HttpApiSchema.status(404)),
        ExtensionInstallationsEnable409.pipe(HttpApiSchema.status(409)),
        ExtensionInstallationsEnable422.pipe(HttpApiSchema.status(422)),
        ExtensionInstallationsEnable500,
        ExtensionInstallationsEnable504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "extensionInstallations.enable")
      .annotate(OpenApi.Summary, "Enable an installation")
      .annotate(
        OpenApi.Description,
        "Resumes a disabled installation. Events published while it was disabled are not delivered.",
      ),
    HttpApiEndpoint.get("extensionInstallationsListRuns", "/v1/extension-installations/:id/runs", {
      params: ExtensionInstallationsListRunsPathParams,
      success: ExtensionInstallationsListRuns200,
      error: [
        ExtensionInstallationsListRuns401.pipe(HttpApiSchema.status(401)),
        ExtensionInstallationsListRuns403.pipe(HttpApiSchema.status(403)),
        ExtensionInstallationsListRuns404.pipe(HttpApiSchema.status(404)),
        ExtensionInstallationsListRuns422.pipe(HttpApiSchema.status(422)),
        ExtensionInstallationsListRuns500,
        ExtensionInstallationsListRuns504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "extensionInstallations.listRuns")
      .annotate(OpenApi.Summary, "List a hosted installation's runs")
      .annotate(
        OpenApi.Description,
        "Returns the hosted installation's retained handler runs, newest first: outcome, duration, and error. The host keeps the last 100 runs, so the list is bounded and has no cursor. Read a run's logged lines with `GET /v1/extension-installations/{id}/runs/{runId}`.",
      ),
    HttpApiEndpoint.get(
      "extensionInstallationsGetRun",
      "/v1/extension-installations/:id/runs/:runId",
      {
        params: ExtensionInstallationsGetRunPathParams,
        success: ExtensionInstallationsGetRun200,
        error: [
          ExtensionInstallationsGetRun401.pipe(HttpApiSchema.status(401)),
          ExtensionInstallationsGetRun403.pipe(HttpApiSchema.status(403)),
          ExtensionInstallationsGetRun404.pipe(HttpApiSchema.status(404)),
          ExtensionInstallationsGetRun422.pipe(HttpApiSchema.status(422)),
          ExtensionInstallationsGetRun500,
          ExtensionInstallationsGetRun504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "extensionInstallations.getRun")
      .annotate(OpenApi.Summary, "Get a hosted run")
      .annotate(
        OpenApi.Description,
        "Returns one retained run with the lines its handler logged: at most 50 lines of 500 characters.",
      ),
    HttpApiEndpoint.post(
      "extensionInstallationsUpgrade",
      "/v1/extension-installations/:id/upgrade",
      {
        params: ExtensionInstallationsUpgradePathParams,
        payload: ExtensionInstallationsUpgradeRequestJson,
        success: ExtensionInstallationsUpgrade200,
        error: [
          ExtensionInstallationsUpgrade401.pipe(HttpApiSchema.status(401)),
          ExtensionInstallationsUpgrade403.pipe(HttpApiSchema.status(403)),
          ExtensionInstallationsUpgrade404.pipe(HttpApiSchema.status(404)),
          ExtensionInstallationsUpgrade409.pipe(HttpApiSchema.status(409)),
          ExtensionInstallationsUpgrade422.pipe(HttpApiSchema.status(422)),
          ExtensionInstallationsUpgrade500,
          ExtensionInstallationsUpgrade504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "extensionInstallations.upgrade")
      .annotate(OpenApi.Summary, "Upgrade or roll back an installation")
      .annotate(
        OpenApi.Description,
        "Changes the pinned version in place. Omit version for the latest publication, or name a version string or id, including an older version to roll back. Preview with dryRun; changing requires acceptPermissions to list exactly the added permission: and event: grants. Only a person can upgrade. Credentials, owner, scope, send mode, and status stay attached to the installation.",
      ),
  )
  .annotate(
    OpenApi.Description,
    "Extension versions installed into the organization, each acting as its own principal",
  ) {}
