// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  ContactId,
  ForbiddenError,
  GatewayTimeoutError,
  IntegrationAccountId,
  IntegrationId,
  IntegrationKey,
  IntegrationReturnTo,
  InternalError,
  JsonObject,
  MalformedRequestError,
  OrganizationId,
  ResourceNotFoundError,
  UnauthorizedError,
  UserId,
  ValidationError,
} from "./shared";

export type AccountStatus = "pending" | "connected" | "needsReconnect";
export const AccountStatus = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Literal("pending"),
    Schema.Literal("connected"),
    Schema.Literal("needsReconnect"),
  ]).annotate({ identifier: "AccountStatus" }))();
export type AccountInfo = {
  readonly externalId?: string;
  readonly displayName?: string;
  readonly email?: string;
  readonly verifiedEmail?: string;
  readonly timeZone?: string;
};
export const AccountInfo = /* @__PURE__ */ (() =>
  Schema.Struct({
    externalId: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(255).annotate({
            expected: "a string with at most 255 code points",
          }),
        )
        .check(
          Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
        ),
    ),
    displayName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(255).annotate({
            expected: "a string with at most 255 code points",
          }),
        )
        .check(
          Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
        ),
    ),
    email: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(255).annotate({
            expected: "a string with at most 255 code points",
          }),
        )
        .check(
          Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
        ),
    ),
    verifiedEmail: Schema.optionalKey(Schema.String),
    timeZone: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(255).annotate({
            expected: "a string with at most 255 code points",
          }),
        )
        .check(
          Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
        ),
    ),
  }).annotate({ identifier: "AccountInfo" }))();
export type AccountHealthStatus =
  | "pending"
  | "healthy"
  | "needsReconnect"
  | "forbidden"
  | "unavailable";
export const AccountHealthStatus = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Literal("pending"),
    Schema.Literal("healthy"),
    Schema.Literal("needsReconnect"),
    Schema.Literal("forbidden"),
    Schema.Literal("unavailable"),
  ]).annotate({ identifier: "AccountHealthStatus" }))();
export type DeleteAccountResponse = { readonly id: IntegrationAccountId; readonly deleted: true };
export const DeleteAccountResponse = /* @__PURE__ */ (() =>
  Schema.Struct({ id: IntegrationAccountId, deleted: Schema.Literal(true) }).annotate({
    identifier: "DeleteAccountResponse",
  }))();
export type ConnectAccountResponse = {
  readonly accountId: IntegrationAccountId;
  readonly authorizationUrl: string | null;
};
export const ConnectAccountResponse = /* @__PURE__ */ (() =>
  Schema.Struct({
    accountId: IntegrationAccountId,
    authorizationUrl: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "ConnectAccountResponse" }))();
export type IntegrationAccount = {
  readonly provider: IntegrationKey;
  readonly input: JsonObject;
  readonly id: IntegrationAccountId;
  readonly webhooks?: ReadonlyArray<{
    readonly app: string;
    readonly url: string;
    readonly events: ReadonlyArray<string>;
    readonly signatureHeader: string;
    readonly deliveryIdHeader: string;
    readonly secretSetup: string;
  }>;
  readonly status: AccountStatus;
  readonly info: AccountInfo;
  readonly grantedScopes: ReadonlyArray<string>;
  readonly connectedBy: UserId | null;
  readonly connectedAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const IntegrationAccount = /* @__PURE__ */ (() =>
  Schema.Struct({
    provider: IntegrationKey,
    input: JsonObject,
    id: IntegrationAccountId,
    webhooks: Schema.optionalKey(
      Schema.Array(
        Schema.Struct({
          app: Schema.String,
          url: Schema.String,
          events: Schema.Array(Schema.String),
          signatureHeader: Schema.String,
          deliveryIdHeader: Schema.String,
          secretSetup: Schema.String,
        }),
      ),
    ),
    status: AccountStatus,
    info: AccountInfo,
    grantedScopes: Schema.Array(Schema.String),
    connectedBy: Schema.Union([UserId, Schema.Null]),
    connectedAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "IntegrationAccount" }))();
export type IntegrationAccountHealth = {
  readonly accountId: IntegrationAccountId;
  readonly status: AccountHealthStatus;
  readonly checkedAt: string;
};
export const IntegrationAccountHealth = /* @__PURE__ */ (() =>
  Schema.Struct({
    accountId: IntegrationAccountId,
    status: AccountHealthStatus,
    checkedAt: Schema.String,
  }).annotate({ identifier: "IntegrationAccountHealth" }))();
export type IntegrationAccountList = { readonly items: ReadonlyArray<IntegrationAccount> };
export const IntegrationAccountList = /* @__PURE__ */ (() =>
  Schema.Struct({ items: Schema.Array(IntegrationAccount) }).annotate({
    identifier: "IntegrationAccountList",
  }))();
export type AccountsList200 = IntegrationAccountList;
export const AccountsList200 = IntegrationAccountList;
export type AccountsList400 = MalformedRequestError;
export const AccountsList400 = MalformedRequestError;
export type AccountsList401 = UnauthorizedError;
export const AccountsList401 = UnauthorizedError;
export type AccountsList403 = ForbiddenError;
export const AccountsList403 = ForbiddenError;
export type AccountsList422 = ValidationError;
export const AccountsList422 = ValidationError;
export type AccountsList500 = InternalError;
export const AccountsList500 = InternalError;
export type AccountsList504 = GatewayTimeoutError;
export const AccountsList504 = GatewayTimeoutError;
export type AccountsGetPathParams = { readonly accountId: IntegrationAccountId };
export const AccountsGetPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ accountId: IntegrationAccountId }))();
export type AccountsGet200 = IntegrationAccount;
export const AccountsGet200 = IntegrationAccount;
export type AccountsGet400 = MalformedRequestError;
export const AccountsGet400 = MalformedRequestError;
export type AccountsGet401 = UnauthorizedError;
export const AccountsGet401 = UnauthorizedError;
export type AccountsGet403 = ForbiddenError;
export const AccountsGet403 = ForbiddenError;
export type AccountsGet404 = ResourceNotFoundError;
export const AccountsGet404 = ResourceNotFoundError;
export type AccountsGet422 = ValidationError;
export const AccountsGet422 = ValidationError;
export type AccountsGet500 = InternalError;
export const AccountsGet500 = InternalError;
export type AccountsGet504 = GatewayTimeoutError;
export const AccountsGet504 = GatewayTimeoutError;
export type AccountsRemovePathParams = { readonly accountId: IntegrationAccountId };
export const AccountsRemovePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ accountId: IntegrationAccountId }))();
export type AccountsRemove200 = DeleteAccountResponse;
export const AccountsRemove200 = DeleteAccountResponse;
export type AccountsRemove400 = MalformedRequestError;
export const AccountsRemove400 = MalformedRequestError;
export type AccountsRemove401 = UnauthorizedError;
export const AccountsRemove401 = UnauthorizedError;
export type AccountsRemove403 = ForbiddenError;
export const AccountsRemove403 = ForbiddenError;
export type AccountsRemove404 = ResourceNotFoundError;
export const AccountsRemove404 = ResourceNotFoundError;
export type AccountsRemove422 = ValidationError;
export const AccountsRemove422 = ValidationError;
export type AccountsRemove500 = InternalError;
export const AccountsRemove500 = InternalError;
export type AccountsRemove504 = GatewayTimeoutError;
export const AccountsRemove504 = GatewayTimeoutError;
export type AccountsCheckPathParams = { readonly accountId: IntegrationAccountId };
export const AccountsCheckPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ accountId: IntegrationAccountId }))();
export type AccountsCheck200 = IntegrationAccountHealth;
export const AccountsCheck200 = IntegrationAccountHealth;
export type AccountsCheck400 = MalformedRequestError;
export const AccountsCheck400 = MalformedRequestError;
export type AccountsCheck401 = UnauthorizedError;
export const AccountsCheck401 = UnauthorizedError;
export type AccountsCheck403 = ForbiddenError;
export const AccountsCheck403 = ForbiddenError;
export type AccountsCheck404 = ResourceNotFoundError;
export const AccountsCheck404 = ResourceNotFoundError;
export type AccountsCheck422 = ValidationError;
export const AccountsCheck422 = ValidationError;
export type AccountsCheck500 = InternalError;
export const AccountsCheck500 = InternalError;
export type AccountsCheck504 = GatewayTimeoutError;
export const AccountsCheck504 = GatewayTimeoutError;
export type AccountsConnectRequestJson = {
  readonly provider: IntegrationKey;
  readonly input?: JsonObject;
  readonly credentials?: { readonly [x: string]: string };
  readonly app?: IntegrationKey;
  readonly accountId?: IntegrationAccountId;
  readonly expectedHosts?: ReadonlyArray<string>;
  readonly returnTo: IntegrationReturnTo;
};
export const AccountsConnectRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    provider: IntegrationKey,
    input: Schema.optionalKey(JsonObject),
    credentials: Schema.optionalKey(Schema.Record(Schema.String, Schema.String)),
    app: Schema.optionalKey(IntegrationKey),
    accountId: Schema.optionalKey(IntegrationAccountId),
    expectedHosts: Schema.optionalKey(Schema.Array(Schema.String)),
    returnTo: IntegrationReturnTo,
  }))();
export type AccountsConnect201 = ConnectAccountResponse;
export const AccountsConnect201 = ConnectAccountResponse;
export type AccountsConnect400 = MalformedRequestError;
export const AccountsConnect400 = MalformedRequestError;
export type AccountsConnect401 = UnauthorizedError;
export const AccountsConnect401 = UnauthorizedError;
export type AccountsConnect403 = ForbiddenError;
export const AccountsConnect403 = ForbiddenError;
export type AccountsConnect404 = ResourceNotFoundError;
export const AccountsConnect404 = ResourceNotFoundError;
export type AccountsConnect422 = ValidationError;
export const AccountsConnect422 = ValidationError;
export type AccountsConnect500 = InternalError;
export const AccountsConnect500 = InternalError;
export type AccountsConnect504 = GatewayTimeoutError;
export const AccountsConnect504 = GatewayTimeoutError;
export type AccountsListContactConnectionsQuery = { readonly provider?: IntegrationKey };
export const AccountsListContactConnectionsQuery = /* @__PURE__ */ (() =>
  Schema.Struct({ provider: Schema.optionalKey(IntegrationKey) }))();
export type AccountsListContactConnections200 = {
  readonly items: ReadonlyArray<{
    readonly organizationId: OrganizationId;
    readonly integrationId: IntegrationId;
    readonly contactId: ContactId;
    readonly accountId: IntegrationAccountId;
    readonly provider?: IntegrationKey;
    readonly info: AccountInfo;
    readonly lastUsedAt: string;
    readonly idleExpiresAt: string;
    readonly createdAt: string;
  }>;
};
export const AccountsListContactConnections200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        organizationId: OrganizationId,
        integrationId: IntegrationId,
        contactId: ContactId,
        accountId: IntegrationAccountId,
        provider: Schema.optionalKey(IntegrationKey),
        info: AccountInfo,
        lastUsedAt: Schema.String,
        idleExpiresAt: Schema.String,
        createdAt: Schema.String,
      }),
    ),
  }))();
export type AccountsListContactConnections400 = MalformedRequestError;
export const AccountsListContactConnections400 = MalformedRequestError;
export type AccountsListContactConnections401 = UnauthorizedError;
export const AccountsListContactConnections401 = UnauthorizedError;
export type AccountsListContactConnections403 = ForbiddenError;
export const AccountsListContactConnections403 = ForbiddenError;
export type AccountsListContactConnections422 = ValidationError;
export const AccountsListContactConnections422 = ValidationError;
export type AccountsListContactConnections500 = InternalError;
export const AccountsListContactConnections500 = InternalError;
export type AccountsListContactConnections504 = GatewayTimeoutError;
export const AccountsListContactConnections504 = GatewayTimeoutError;

export class AccountsGroup extends HttpApiGroup.make("Accounts")
  .add(
    HttpApiEndpoint.get("accountsList", "/v1/accounts", {
      success: AccountsList200,
      error: [
        AccountsList400.pipe(HttpApiSchema.status(400)),
        AccountsList401.pipe(HttpApiSchema.status(401)),
        AccountsList403.pipe(HttpApiSchema.status(403)),
        AccountsList422.pipe(HttpApiSchema.status(422)),
        AccountsList500,
        AccountsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "accounts.list")
      .annotate(OpenApi.Summary, "List accounts")
      .annotate(
        OpenApi.Description,
        "Returns the organization's connected provider accounts, newest first.",
      ),
    HttpApiEndpoint.get("accountsGet", "/v1/accounts/:accountId", {
      params: AccountsGetPathParams,
      success: AccountsGet200,
      error: [
        AccountsGet400.pipe(HttpApiSchema.status(400)),
        AccountsGet401.pipe(HttpApiSchema.status(401)),
        AccountsGet403.pipe(HttpApiSchema.status(403)),
        AccountsGet404.pipe(HttpApiSchema.status(404)),
        AccountsGet422.pipe(HttpApiSchema.status(422)),
        AccountsGet500,
        AccountsGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "accounts.get")
      .annotate(OpenApi.Summary, "Get an account")
      .annotate(
        OpenApi.Description,
        "Returns one account with its status and granted scopes. A Shopify account missing requested scopes, including read_products and read_legal_policies, needs reconnecting.",
      ),
    HttpApiEndpoint.delete("accountsRemove", "/v1/accounts/:accountId", {
      params: AccountsRemovePathParams,
      success: AccountsRemove200,
      error: [
        AccountsRemove400.pipe(HttpApiSchema.status(400)),
        AccountsRemove401.pipe(HttpApiSchema.status(401)),
        AccountsRemove403.pipe(HttpApiSchema.status(403)),
        AccountsRemove404.pipe(HttpApiSchema.status(404)),
        AccountsRemove422.pipe(HttpApiSchema.status(422)),
        AccountsRemove500,
        AccountsRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "accounts.remove")
      .annotate(OpenApi.Summary, "Disconnect an account")
      .annotate(
        OpenApi.Description,
        "Revokes Samva's access at the provider and deletes the account with the integrations that link it, and their grants from every agent's draft. A published agent version that granted them can no longer use them; publish the agent to drop the grants.",
      ),
    HttpApiEndpoint.post("accountsCheck", "/v1/accounts/:accountId/check", {
      params: AccountsCheckPathParams,
      success: AccountsCheck200,
      error: [
        AccountsCheck400.pipe(HttpApiSchema.status(400)),
        AccountsCheck401.pipe(HttpApiSchema.status(401)),
        AccountsCheck403.pipe(HttpApiSchema.status(403)),
        AccountsCheck404.pipe(HttpApiSchema.status(404)),
        AccountsCheck422.pipe(HttpApiSchema.status(422)),
        AccountsCheck500,
        AccountsCheck504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "accounts.check")
      .annotate(OpenApi.Summary, "Check an account")
      .annotate(
        OpenApi.Description,
        "Checks the saved credential on demand. A provider outage does not require reconnecting; refused access or missing requested scopes does.",
      ),
    HttpApiEndpoint.post("accountsConnect", "/v1/accounts/connect", {
      payload: AccountsConnectRequestJson,
      success: AccountsConnect201.pipe(HttpApiSchema.status(201)),
      error: [
        AccountsConnect400.pipe(HttpApiSchema.status(400)),
        AccountsConnect401.pipe(HttpApiSchema.status(401)),
        AccountsConnect403.pipe(HttpApiSchema.status(403)),
        AccountsConnect404.pipe(HttpApiSchema.status(404)),
        AccountsConnect422.pipe(HttpApiSchema.status(422)),
        AccountsConnect500,
        AccountsConnect504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "accounts.connect")
      .annotate(OpenApi.Summary, "Connect an account")
      .annotate(
        OpenApi.Description,
        "Connects a provider account. OAuth returns an authorization URL; credential connections return null after validation. Name an app to ask for its scopes and install it when the connection finishes. Pass accountId to reconnect an account for renewed access or additional scopes. Connecting or reconnecting Shopify with read_products and read_legal_policies creates its Shopify store knowledge source.",
      ),
    HttpApiEndpoint.get("accountsListContactConnections", "/v1/accounts/contact-connections", {
      query: AccountsListContactConnectionsQuery,
      success: AccountsListContactConnections200,
      error: [
        AccountsListContactConnections400.pipe(HttpApiSchema.status(400)),
        AccountsListContactConnections401.pipe(HttpApiSchema.status(401)),
        AccountsListContactConnections403.pipe(HttpApiSchema.status(403)),
        AccountsListContactConnections422.pipe(HttpApiSchema.status(422)),
        AccountsListContactConnections500,
        AccountsListContactConnections504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "accounts.listContactConnections")
      .annotate(OpenApi.Summary, "List contact connections")
      .annotate(
        OpenApi.Description,
        "Lists the contact credentials connected for this organization. An administrator can disconnect each account by accountId.",
      ),
  )
  .annotate(OpenApi.Description, "Provider accounts connected for integrations") {}
