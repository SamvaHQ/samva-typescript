// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  ForbiddenError,
  GatewayTimeoutError,
  IntegrationKey,
  IntegrationStatus,
  InternalError,
  JsonObject,
  MalformedRequestError,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type IntegrationCatalogSearchEntry = {
  readonly key: IntegrationKey;
  readonly kind: "mcp" | "openapi" | "graphql";
  readonly name: string;
  readonly description: string;
  readonly domain: string | null;
  readonly category:
    | "commerce"
    | "payments"
    | "shipping"
    | "calendar"
    | "crm"
    | "helpdesk"
    | "knowledge"
    | "forms"
    | "accounting"
    | "reviews"
    | "productivity"
    | "dns"
    | "channel"
    | "other";
  readonly icon: string | null;
  readonly logo?: { readonly file: string; readonly monochrome?: boolean };
  readonly featured: boolean;
  readonly connectSpec: {
    readonly provider: IntegrationKey;
    readonly auth: "discover" | "oauth" | "none" | "apiKey";
    readonly inputs: {
      readonly [x: string]: {
        readonly label: string;
        readonly description: string;
        readonly pattern: string;
        readonly maxLength: number;
        readonly example: string;
        readonly default?: string;
        readonly kind?: "hostnameLabel" | "httpsUrl";
      };
    };
    readonly credentials: { readonly [x: string]: { readonly label: string } };
  };
  readonly connectState: "ready" | "checkedAtConnect" | "unavailable";
  readonly reason: string | null;
};
export const IntegrationCatalogSearchEntry = /* @__PURE__ */ (() =>
  Schema.Struct({
    key: IntegrationKey,
    kind: Schema.Union([
      Schema.Literal("mcp"),
      Schema.Literal("openapi"),
      Schema.Literal("graphql"),
    ]),
    name: Schema.String,
    description: Schema.String,
    domain: Schema.Union([Schema.String, Schema.Null]),
    category: Schema.Union([
      Schema.Literal("commerce"),
      Schema.Literal("payments"),
      Schema.Literal("shipping"),
      Schema.Literal("calendar"),
      Schema.Literal("crm"),
      Schema.Literal("helpdesk"),
      Schema.Literal("knowledge"),
      Schema.Literal("forms"),
      Schema.Literal("accounting"),
      Schema.Literal("reviews"),
      Schema.Literal("productivity"),
      Schema.Literal("dns"),
      Schema.Literal("channel"),
      Schema.Literal("other"),
    ]),
    icon: Schema.Union([Schema.String, Schema.Null]),
    logo: Schema.optionalKey(
      Schema.Struct({
        file: Schema.String.check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        ).check(
          Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" }),
        ),
        monochrome: Schema.optionalKey(Schema.Boolean),
      }),
    ),
    featured: Schema.Boolean,
    connectSpec: Schema.Struct({
      provider: IntegrationKey,
      auth: Schema.Union([
        Schema.Literal("discover"),
        Schema.Literal("oauth"),
        Schema.Literal("none"),
        Schema.Literal("apiKey"),
      ]),
      inputs: Schema.Record(
        Schema.String,
        Schema.Struct({
          label: Schema.String.check(
            Schema.isMaxCodePoints(256).annotate({
              expected: "a string with at most 256 code points",
            }),
          ).check(
            Schema.isMaxLength(256).annotate({ expected: "a value with a length of at most 256" }),
          ),
          description: Schema.String.check(
            Schema.isMaxCodePoints(2048).annotate({
              expected: "a string with at most 2048 code points",
            }),
          ).check(
            Schema.isMaxLength(2048).annotate({
              expected: "a value with a length of at most 2048",
            }),
          ),
          pattern: Schema.String.check(
            Schema.isMaxCodePoints(512).annotate({
              expected: "a string with at most 512 code points",
            }),
          ).check(
            Schema.isMaxLength(512).annotate({ expected: "a value with a length of at most 512" }),
          ),
          maxLength: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
            .check(
              Schema.isGreaterThanOrEqualTo(1).annotate({
                expected: "a value greater than or equal to 1",
              }),
            )
            .check(
              Schema.isLessThanOrEqualTo(2048).annotate({
                expected: "a value less than or equal to 2048",
              }),
            ),
          example: Schema.String.check(
            Schema.isMaxCodePoints(2048).annotate({
              expected: "a string with at most 2048 code points",
            }),
          ).check(
            Schema.isMaxLength(2048).annotate({
              expected: "a value with a length of at most 2048",
            }),
          ),
          default: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(2048).annotate({
                expected: "a string with at most 2048 code points",
              }),
            ).check(
              Schema.isMaxLength(2048).annotate({
                expected: "a value with a length of at most 2048",
              }),
            ),
          ),
          kind: Schema.optionalKey(
            Schema.Union([Schema.Literal("hostnameLabel"), Schema.Literal("httpsUrl")]),
          ),
        }),
      ).check(
        Schema.isPropertyNames(
          Schema.String.check(
            Schema.isMaxCodePoints(128).annotate({
              expected: "a string with at most 128 code points",
            }),
          ).check(
            Schema.isPattern(new globalThis.RegExp("^[a-zA-Z][a-zA-Z0-9_-]*$", "u")).annotate({
              expected: "a string matching the RegExp ^[a-zA-Z][a-zA-Z0-9_-]*$",
            }),
          ),
        ).annotate({ expected: "an object with property names matching the schema" }),
      ),
      credentials: Schema.Record(Schema.String, Schema.Struct({ label: Schema.String })),
    }),
    connectState: Schema.Union([
      Schema.Literal("ready"),
      Schema.Literal("checkedAtConnect"),
      Schema.Literal("unavailable"),
    ]),
    reason: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "IntegrationCatalogSearchEntry" }))();
export type IntegrationCatalogConnection = {
  readonly id: string;
  readonly account: string | null;
  readonly status: IntegrationStatus;
};
export const IntegrationCatalogConnection = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: Schema.String,
    account: Schema.Union([Schema.String, Schema.Null]),
    status: IntegrationStatus,
  }).annotate({ identifier: "IntegrationCatalogConnection" }))();
export type IntegrationCatalogSearchPage = {
  readonly items: ReadonlyArray<IntegrationCatalogSearchEntry>;
  readonly total: number;
  readonly nextOffset: number | null;
};
export const IntegrationCatalogSearchPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(IntegrationCatalogSearchEntry),
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
  }).annotate({ identifier: "IntegrationCatalogSearchPage" }))();
export type IntegrationCatalogEntry = {
  readonly id: string;
  readonly name: string;
  readonly category:
    | "commerce"
    | "payments"
    | "shipping"
    | "calendar"
    | "crm"
    | "helpdesk"
    | "knowledge"
    | "forms"
    | "accounting"
    | "reviews"
    | "productivity"
    | "dns"
    | "channel"
    | "other";
  readonly blurb: string;
  readonly connect: "account" | "dns" | "channelLink";
  readonly inviteOnly?: string;
  readonly app?: IntegrationKey | null;
  readonly href?: "/whatsapp" | null;
  readonly connections: ReadonlyArray<IntegrationCatalogConnection>;
  readonly usedBy: { readonly agents: number; readonly journeys: number };
};
export const IntegrationCatalogEntry = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: Schema.String.check(
      Schema.isMaxCodePoints(64).annotate({ expected: "a string with at most 64 code points" }),
    ).check(Schema.isMaxLength(64).annotate({ expected: "a value with a length of at most 64" })),
    name: Schema.String,
    category: Schema.Union([
      Schema.Literal("commerce"),
      Schema.Literal("payments"),
      Schema.Literal("shipping"),
      Schema.Literal("calendar"),
      Schema.Literal("crm"),
      Schema.Literal("helpdesk"),
      Schema.Literal("knowledge"),
      Schema.Literal("forms"),
      Schema.Literal("accounting"),
      Schema.Literal("reviews"),
      Schema.Literal("productivity"),
      Schema.Literal("dns"),
      Schema.Literal("channel"),
      Schema.Literal("other"),
    ]),
    blurb: Schema.String,
    connect: Schema.Union([
      Schema.Literal("account"),
      Schema.Literal("dns"),
      Schema.Literal("channelLink"),
    ]),
    inviteOnly: Schema.optionalKey(Schema.String),
    app: Schema.optionalKey(Schema.Union([IntegrationKey, Schema.Null])),
    href: Schema.optionalKey(Schema.Union([Schema.Literal("/whatsapp"), Schema.Null])),
    connections: Schema.Array(IntegrationCatalogConnection),
    usedBy: Schema.Struct({
      agents: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      journeys: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    }),
  }).annotate({ identifier: "IntegrationCatalogEntry" }))();
export type IntegrationCatalogResponse = {
  readonly entries: ReadonlyArray<IntegrationCatalogEntry>;
};
export const IntegrationCatalogResponse = /* @__PURE__ */ (() =>
  Schema.Struct({ entries: Schema.Array(IntegrationCatalogEntry) }).annotate({
    identifier: "IntegrationCatalogResponse",
  }))();
export type IntegrationCatalogList200 = IntegrationCatalogResponse;
export const IntegrationCatalogList200 = IntegrationCatalogResponse;
export type IntegrationCatalogList400 = MalformedRequestError;
export const IntegrationCatalogList400 = MalformedRequestError;
export type IntegrationCatalogList401 = UnauthorizedError;
export const IntegrationCatalogList401 = UnauthorizedError;
export type IntegrationCatalogList403 = ForbiddenError;
export const IntegrationCatalogList403 = ForbiddenError;
export type IntegrationCatalogList422 = ValidationError;
export const IntegrationCatalogList422 = ValidationError;
export type IntegrationCatalogList500 = InternalError;
export const IntegrationCatalogList500 = InternalError;
export type IntegrationCatalogList504 = GatewayTimeoutError;
export const IntegrationCatalogList504 = GatewayTimeoutError;
export type IntegrationCatalogPrepareRequestJson = {
  readonly provider: IntegrationKey;
  readonly input?: JsonObject;
};
export const IntegrationCatalogPrepareRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ provider: IntegrationKey, input: Schema.optionalKey(JsonObject) }))();
export type IntegrationCatalogPrepare200 = {
  readonly connectSpec: {
    readonly provider: IntegrationKey;
    readonly auth: "discover" | "oauth" | "none" | "apiKey";
    readonly inputs: {
      readonly [x: string]: {
        readonly label: string;
        readonly description: string;
        readonly pattern: string;
        readonly maxLength: number;
        readonly example: string;
        readonly default?: string;
        readonly kind?: "hostnameLabel" | "httpsUrl";
      };
    };
    readonly credentials: { readonly [x: string]: { readonly label: string } };
  };
  readonly hosts: ReadonlyArray<string>;
  readonly connectState: "ready" | "checkedAtConnect" | "unavailable";
  readonly reason: string | null;
};
export const IntegrationCatalogPrepare200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    connectSpec: Schema.Struct({
      provider: IntegrationKey,
      auth: Schema.Union([
        Schema.Literal("discover"),
        Schema.Literal("oauth"),
        Schema.Literal("none"),
        Schema.Literal("apiKey"),
      ]),
      inputs: Schema.Record(
        Schema.String,
        Schema.Struct({
          label: Schema.String.check(
            Schema.isMaxCodePoints(256).annotate({
              expected: "a string with at most 256 code points",
            }),
          ).check(
            Schema.isMaxLength(256).annotate({ expected: "a value with a length of at most 256" }),
          ),
          description: Schema.String.check(
            Schema.isMaxCodePoints(2048).annotate({
              expected: "a string with at most 2048 code points",
            }),
          ).check(
            Schema.isMaxLength(2048).annotate({
              expected: "a value with a length of at most 2048",
            }),
          ),
          pattern: Schema.String.check(
            Schema.isMaxCodePoints(512).annotate({
              expected: "a string with at most 512 code points",
            }),
          ).check(
            Schema.isMaxLength(512).annotate({ expected: "a value with a length of at most 512" }),
          ),
          maxLength: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
            .check(
              Schema.isGreaterThanOrEqualTo(1).annotate({
                expected: "a value greater than or equal to 1",
              }),
            )
            .check(
              Schema.isLessThanOrEqualTo(2048).annotate({
                expected: "a value less than or equal to 2048",
              }),
            ),
          example: Schema.String.check(
            Schema.isMaxCodePoints(2048).annotate({
              expected: "a string with at most 2048 code points",
            }),
          ).check(
            Schema.isMaxLength(2048).annotate({
              expected: "a value with a length of at most 2048",
            }),
          ),
          default: Schema.optionalKey(
            Schema.String.check(
              Schema.isMaxCodePoints(2048).annotate({
                expected: "a string with at most 2048 code points",
              }),
            ).check(
              Schema.isMaxLength(2048).annotate({
                expected: "a value with a length of at most 2048",
              }),
            ),
          ),
          kind: Schema.optionalKey(
            Schema.Union([Schema.Literal("hostnameLabel"), Schema.Literal("httpsUrl")]),
          ),
        }),
      ).check(
        Schema.isPropertyNames(
          Schema.String.check(
            Schema.isMaxCodePoints(128).annotate({
              expected: "a string with at most 128 code points",
            }),
          ).check(
            Schema.isPattern(new globalThis.RegExp("^[a-zA-Z][a-zA-Z0-9_-]*$", "u")).annotate({
              expected: "a string matching the RegExp ^[a-zA-Z][a-zA-Z0-9_-]*$",
            }),
          ),
        ).annotate({ expected: "an object with property names matching the schema" }),
      ),
      credentials: Schema.Record(Schema.String, Schema.Struct({ label: Schema.String })),
    }),
    hosts: Schema.Array(Schema.String),
    connectState: Schema.Union([
      Schema.Literal("ready"),
      Schema.Literal("checkedAtConnect"),
      Schema.Literal("unavailable"),
    ]),
    reason: Schema.Union([Schema.String, Schema.Null]),
  }))();
export type IntegrationCatalogPrepare400 = MalformedRequestError;
export const IntegrationCatalogPrepare400 = MalformedRequestError;
export type IntegrationCatalogPrepare401 = UnauthorizedError;
export const IntegrationCatalogPrepare401 = UnauthorizedError;
export type IntegrationCatalogPrepare403 = ForbiddenError;
export const IntegrationCatalogPrepare403 = ForbiddenError;
export type IntegrationCatalogPrepare422 = ValidationError;
export const IntegrationCatalogPrepare422 = ValidationError;
export type IntegrationCatalogPrepare500 = InternalError;
export const IntegrationCatalogPrepare500 = InternalError;
export type IntegrationCatalogPrepare504 = GatewayTimeoutError;
export const IntegrationCatalogPrepare504 = GatewayTimeoutError;
export type IntegrationCatalogSearchQuery = {
  readonly key?: IntegrationKey;
  readonly query?: string;
  readonly category?:
    | "commerce"
    | "payments"
    | "shipping"
    | "calendar"
    | "crm"
    | "helpdesk"
    | "knowledge"
    | "forms"
    | "accounting"
    | "reviews"
    | "productivity"
    | "dns"
    | "channel"
    | "other";
  readonly offset?: number;
  readonly limit?: number;
};
export const IntegrationCatalogSearchQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    key: Schema.optionalKey(IntegrationKey),
    query: Schema.optionalKey(
      Schema.String.check(
        Schema.isMaxCodePoints(256).annotate({ expected: "a string with at most 256 code points" }),
      ).check(
        Schema.isMaxLength(256).annotate({ expected: "a value with a length of at most 256" }),
      ),
    ),
    category: Schema.optionalKey(
      Schema.Union([
        Schema.Literal("commerce"),
        Schema.Literal("payments"),
        Schema.Literal("shipping"),
        Schema.Literal("calendar"),
        Schema.Literal("crm"),
        Schema.Literal("helpdesk"),
        Schema.Literal("knowledge"),
        Schema.Literal("forms"),
        Schema.Literal("accounting"),
        Schema.Literal("reviews"),
        Schema.Literal("productivity"),
        Schema.Literal("dns"),
        Schema.Literal("channel"),
        Schema.Literal("other"),
      ]),
    ),
    offset: Schema.optionalKey(
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
    ),
    limit: Schema.optionalKey(
      Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(1).annotate({
            expected: "a value greater than or equal to 1",
          }),
        )
        .check(
          Schema.isLessThanOrEqualTo(100).annotate({
            expected: "a value less than or equal to 100",
          }),
        ),
    ),
  }))();
export type IntegrationCatalogSearch200 = IntegrationCatalogSearchPage;
export const IntegrationCatalogSearch200 = IntegrationCatalogSearchPage;
export type IntegrationCatalogSearch400 = MalformedRequestError;
export const IntegrationCatalogSearch400 = MalformedRequestError;
export type IntegrationCatalogSearch401 = UnauthorizedError;
export const IntegrationCatalogSearch401 = UnauthorizedError;
export type IntegrationCatalogSearch403 = ForbiddenError;
export const IntegrationCatalogSearch403 = ForbiddenError;
export type IntegrationCatalogSearch422 = ValidationError;
export const IntegrationCatalogSearch422 = ValidationError;
export type IntegrationCatalogSearch500 = InternalError;
export const IntegrationCatalogSearch500 = InternalError;
export type IntegrationCatalogSearch504 = GatewayTimeoutError;
export const IntegrationCatalogSearch504 = GatewayTimeoutError;

export class IntegrationsCatalogGroup extends HttpApiGroup.make("Integrations catalog")
  .add(
    HttpApiEndpoint.get("integrationCatalogList", "/v1/integrations/catalog", {
      success: IntegrationCatalogList200,
      error: [
        IntegrationCatalogList400.pipe(HttpApiSchema.status(400)),
        IntegrationCatalogList401.pipe(HttpApiSchema.status(401)),
        IntegrationCatalogList403.pipe(HttpApiSchema.status(403)),
        IntegrationCatalogList422.pipe(HttpApiSchema.status(422)),
        IntegrationCatalogList500,
        IntegrationCatalogList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.list")
      .annotate(OpenApi.Summary, "List the integrations catalog")
      .annotate(
        OpenApi.Description,
        "Returns the providers this organization can connect, each with its connections and the agents and journeys that use them.",
      ),
    HttpApiEndpoint.post("integrationCatalogPrepare", "/v1/integrations/catalog/prepare", {
      payload: IntegrationCatalogPrepareRequestJson,
      success: IntegrationCatalogPrepare200,
      error: [
        IntegrationCatalogPrepare400.pipe(HttpApiSchema.status(400)),
        IntegrationCatalogPrepare401.pipe(HttpApiSchema.status(401)),
        IntegrationCatalogPrepare403.pipe(HttpApiSchema.status(403)),
        IntegrationCatalogPrepare422.pipe(HttpApiSchema.status(422)),
        IntegrationCatalogPrepare500,
        IntegrationCatalogPrepare504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.prepare")
      .annotate(OpenApi.Summary, "Prepare an integration connection")
      .annotate(
        OpenApi.Description,
        "Resolves what connecting a catalog provider needs: the inputs and credentials it asks for, the hosts its API and OAuth credentials reach, and whether it can connect. Pass input for server inputs such as an API description URL. An unavailable provider carries a reason.",
      ),
    HttpApiEndpoint.get("integrationCatalogSearch", "/v1/integrations/catalog/search", {
      query: IntegrationCatalogSearchQuery,
      success: IntegrationCatalogSearch200,
      error: [
        IntegrationCatalogSearch400.pipe(HttpApiSchema.status(400)),
        IntegrationCatalogSearch401.pipe(HttpApiSchema.status(401)),
        IntegrationCatalogSearch403.pipe(HttpApiSchema.status(403)),
        IntegrationCatalogSearch422.pipe(HttpApiSchema.status(422)),
        IntegrationCatalogSearch500,
        IntegrationCatalogSearch504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "integrationCatalog.search")
      .annotate(OpenApi.Summary, "Search the integrations catalog")
      .annotate(
        OpenApi.Description,
        "Searches the providers this organization can connect, by key, text or category. Each entry carries its connection requirements and whether it can connect. Follow nextOffset until it is null.",
      ),
  )
  .annotate(OpenApi.Description, "Providers an organization can connect") {}
