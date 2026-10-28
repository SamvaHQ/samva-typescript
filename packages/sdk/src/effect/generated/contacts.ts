// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  BillingProviderError,
  ConflictError,
  ContactGroupId,
  ContactId,
  ContactIdentity,
  ContactIdentityId,
  ConversationId,
  Cursor,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  JsonObject,
  MessageId,
  NamespaceId,
  PaymentRequiredError,
  ResourceNotFoundError,
  TopicId,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type ContactCustomFields = { readonly [x: string]: string | number | boolean | null };
export const ContactCustomFields = /* @__PURE__ */ (() =>
  Schema.Record(
    Schema.String,
    Schema.Union([
      Schema.String,
      Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
      Schema.Boolean,
      Schema.Null,
    ]),
  ).annotate({ identifier: "ContactCustomFields" }))();
export type ContactIdentityInput = {
  readonly type: "email" | "phone";
  readonly identifier: string;
  readonly verified?: boolean | null;
};
export const ContactIdentityInput = /* @__PURE__ */ (() =>
  Schema.Struct({
    type: Schema.Union([Schema.Literal("email"), Schema.Literal("phone")]),
    identifier: Schema.String,
    verified: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  }).annotate({ identifier: "ContactIdentityInput" }))();
export type ContactLocation = {
  readonly country: string;
  readonly state: string;
  readonly city: string;
  readonly timezone: string;
};
export const ContactLocation = /* @__PURE__ */ (() =>
  Schema.Struct({
    country: Schema.String,
    state: Schema.String,
    city: Schema.String,
    timezone: Schema.String,
  }).annotate({ identifier: "ContactLocation" }))();
export type ContactPreferences = {
  readonly preferredChannels?: ReadonlyArray<"email"> | null;
  readonly language?: string | null;
  readonly timezone?: string | null;
  readonly notifications?: {
    readonly email?: boolean | null;
    readonly quiet_hours?: { readonly start: string; readonly end: string } | null;
  } | null;
};
export const ContactPreferences = /* @__PURE__ */ (() =>
  Schema.Struct({
    preferredChannels: Schema.optionalKey(
      Schema.Union([Schema.Array(Schema.Literal("email")), Schema.Null]),
    ),
    language: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    timezone: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    notifications: Schema.optionalKey(
      Schema.Union([
        Schema.Struct({
          email: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
          quiet_hours: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({ start: Schema.String, end: Schema.String }),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({ identifier: "ContactPreferences" }))();
export type ContactImportJobId = string & EffectBrand.Brand<"ContactImportJobId">;
export const ContactImportJobId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^cimport_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^cimport_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "ContactImportJobId",
    }),
  ).pipe(Schema.brand("ContactImportJobId")))();
export type BulkUpdateResult = { readonly updated: number; readonly failed: number };
export const BulkUpdateResult = /* @__PURE__ */ (() =>
  Schema.Struct({
    updated: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    failed: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  }).annotate({ identifier: "BulkUpdateResult" }))();
export type ContactLookup =
  | { readonly type: "email"; readonly value: string }
  | { readonly type: "phone"; readonly value: string }
  | { readonly type: "externalId"; readonly value: string };
export const ContactLookup = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Struct({
      type: Schema.Literal("email"),
      value: Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      ),
    }),
    Schema.Struct({
      type: Schema.Literal("phone"),
      value: Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      ),
    }),
    Schema.Struct({
      type: Schema.Literal("externalId"),
      value: Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      ),
    }),
  ]).annotate({ identifier: "ContactLookup" }))();
export type ContactActivityPage = {
  readonly items: ReadonlyArray<{
    readonly id: MessageId;
    readonly channel: string;
    readonly direction: string;
    readonly status: string;
    readonly subject: string | null;
    readonly snippet: string | null;
    readonly createdAt: string;
    readonly conversationId: ConversationId | null;
  }>;
  readonly nextCursor: string | null;
};
export const ContactActivityPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        id: MessageId,
        channel: Schema.String,
        direction: Schema.String,
        status: Schema.String,
        subject: Schema.Union([Schema.String, Schema.Null]),
        snippet: Schema.Union([Schema.String, Schema.Null]),
        createdAt: Schema.String,
        conversationId: Schema.Union([ConversationId, Schema.Null]),
      }),
    ),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "ContactActivityPage" }))();
export type ContactListMembership = {
  readonly id: ContactGroupId;
  readonly name: string;
  readonly color: "clay" | "sand" | "moss" | "sky" | "plum" | "rose" | null;
};
export const ContactListMembership = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: ContactGroupId,
    name: Schema.String,
    color: Schema.Union([
      Schema.Union([
        Schema.Literal("clay"),
        Schema.Literal("sand"),
        Schema.Literal("moss"),
        Schema.Literal("sky"),
        Schema.Literal("plum"),
        Schema.Literal("rose"),
      ]),
      Schema.Null,
    ]),
  }).annotate({ identifier: "ContactListMembership" }))();
export type ContactGroupMembershipPage = {
  readonly items: ReadonlyArray<{
    readonly id: ContactGroupId;
    readonly name: string;
    readonly type: string;
    readonly color: "clay" | "sand" | "moss" | "sky" | "plum" | "rose" | null;
    readonly role: string;
    readonly joinedAt: string;
  }>;
  readonly nextCursor: string | null;
};
export const ContactGroupMembershipPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        id: ContactGroupId,
        name: Schema.String,
        type: Schema.String,
        color: Schema.Union([
          Schema.Union([
            Schema.Literal("clay"),
            Schema.Literal("sand"),
            Schema.Literal("moss"),
            Schema.Literal("sky"),
            Schema.Literal("plum"),
            Schema.Literal("rose"),
          ]),
          Schema.Null,
        ]),
        role: Schema.String,
        joinedAt: Schema.String,
      }),
    ),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "ContactGroupMembershipPage" }))();
export type ContactProfile = {
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly company?: string | null;
  readonly jobTitle?: string | null;
  readonly location?: ContactLocation | null;
  readonly customFields?: ContactCustomFields | null;
  readonly source?: "api" | "import" | "manual" | "form" | null;
};
export const ContactProfile = /* @__PURE__ */ (() =>
  Schema.Struct({
    firstName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    lastName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    company: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    jobTitle: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    location: Schema.optionalKey(Schema.Union([ContactLocation, Schema.Null])),
    customFields: Schema.optionalKey(Schema.Union([ContactCustomFields, Schema.Null])),
    source: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Literal("api"),
          Schema.Literal("import"),
          Schema.Literal("manual"),
          Schema.Literal("form"),
        ]),
        Schema.Null,
      ]),
    ),
  }).annotate({ identifier: "ContactProfile" }))();
export type ContactProfileUpdate = {
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly company?: string | null;
  readonly jobTitle?: string | null;
  readonly location?: ContactLocation | null;
  readonly customFields?: ContactCustomFields | null;
};
export const ContactProfileUpdate = /* @__PURE__ */ (() =>
  Schema.Struct({
    firstName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    lastName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    company: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    jobTitle: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    location: Schema.optionalKey(Schema.Union([ContactLocation, Schema.Null])),
    customFields: Schema.optionalKey(Schema.Union([ContactCustomFields, Schema.Null])),
  }).annotate({ identifier: "ContactProfileUpdate" }))();
export type ContactSummary = {
  readonly id: ContactId;
  readonly namespaceId: NamespaceId | null;
  readonly name: string;
  readonly displayName: string | null;
  readonly status: "active" | "paused" | "blocked" | "archived";
  readonly email: string | null;
  readonly channels: ReadonlyArray<"email">;
  readonly tags: ReadonlyArray<string>;
  readonly lists: ReadonlyArray<ContactListMembership>;
  readonly customFields?: ContactCustomFields | null;
  readonly lastActiveAt: string | null;
  readonly createdAt: string;
};
export const ContactSummary = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: ContactId,
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
    name: Schema.String,
    displayName: Schema.Union([Schema.String, Schema.Null]),
    status: Schema.Union([
      Schema.Literal("active"),
      Schema.Literal("paused"),
      Schema.Literal("blocked"),
      Schema.Literal("archived"),
    ]),
    email: Schema.Union([Schema.String, Schema.Null]),
    channels: Schema.Array(Schema.Literal("email")),
    tags: Schema.Array(Schema.String),
    lists: Schema.Array(ContactListMembership),
    customFields: Schema.optionalKey(Schema.Union([ContactCustomFields, Schema.Null])),
    lastActiveAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
  }).annotate({ identifier: "ContactSummary" }))();
export type ContactPage = {
  readonly items: ReadonlyArray<ContactSummary>;
  readonly nextCursor: string | null;
};
export const ContactPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(ContactSummary),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "ContactPage" }))();
export type Contact = {
  readonly id: ContactId;
  readonly namespaceId: NamespaceId | null;
  readonly name: string;
  readonly displayName: string | null;
  readonly avatar: string | null;
  readonly status: "active" | "paused" | "blocked" | "archived";
  readonly statusReason: string | null;
  readonly externalId: string | null;
  readonly identities: ReadonlyArray<ContactIdentity>;
  readonly profile: ContactProfile | null;
  readonly preferences: ContactPreferences | null;
  readonly tags: ReadonlyArray<string>;
  readonly metadata: JsonObject | null;
  readonly importProvenance: {
    readonly first: {
      readonly jobId: ContactImportJobId;
      readonly topicId: TopicId;
      readonly preset: "beehiiv" | "substack" | "kit" | "mailchimp";
      readonly importedAt: string;
      readonly summary?: {
        readonly signupAt: { readonly value: string; readonly kind: "time" | "text" } | null;
        readonly sources: ReadonlyArray<string>;
        readonly omittedSources: number;
      } | null;
      readonly evidence: ReadonlyArray<{
        readonly file: string;
        readonly row: number;
        readonly declared:
          | { readonly kind: "status_column" }
          | {
              readonly kind: "export_scope";
              readonly scope: "subscribed" | "unsubscribed" | "suppressed" | "cleaned/bounced";
            };
        readonly suppressionFree: boolean;
        readonly sourceStatus: string | null;
        readonly signupAt: string | null;
        readonly source: string | null;
      }>;
    };
    readonly latest: {
      readonly jobId: ContactImportJobId;
      readonly topicId: TopicId;
      readonly preset: "beehiiv" | "substack" | "kit" | "mailchimp";
      readonly importedAt: string;
      readonly summary?: {
        readonly signupAt: { readonly value: string; readonly kind: "time" | "text" } | null;
        readonly sources: ReadonlyArray<string>;
        readonly omittedSources: number;
      } | null;
      readonly evidence: ReadonlyArray<{
        readonly file: string;
        readonly row: number;
        readonly declared:
          | { readonly kind: "status_column" }
          | {
              readonly kind: "export_scope";
              readonly scope: "subscribed" | "unsubscribed" | "suppressed" | "cleaned/bounced";
            };
        readonly suppressionFree: boolean;
        readonly sourceStatus: string | null;
        readonly signupAt: string | null;
        readonly source: string | null;
      }>;
    };
  } | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const Contact = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: ContactId,
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
    name: Schema.String,
    displayName: Schema.Union([Schema.String, Schema.Null]),
    avatar: Schema.Union([Schema.String, Schema.Null]),
    status: Schema.Union([
      Schema.Literal("active"),
      Schema.Literal("paused"),
      Schema.Literal("blocked"),
      Schema.Literal("archived"),
    ]),
    statusReason: Schema.Union([Schema.String, Schema.Null]),
    externalId: Schema.Union([Schema.String, Schema.Null]),
    identities: Schema.Array(ContactIdentity),
    profile: Schema.Union([ContactProfile, Schema.Null]),
    preferences: Schema.Union([ContactPreferences, Schema.Null]),
    tags: Schema.Array(Schema.String),
    metadata: Schema.Union([JsonObject, Schema.Null]),
    importProvenance: Schema.Union([
      Schema.Struct({
        first: Schema.Struct({
          jobId: ContactImportJobId,
          topicId: TopicId,
          preset: Schema.Union([
            Schema.Literal("beehiiv"),
            Schema.Literal("substack"),
            Schema.Literal("kit"),
            Schema.Literal("mailchimp"),
          ]),
          importedAt: Schema.String,
          summary: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                signupAt: Schema.Union([
                  Schema.Struct({
                    value: Schema.String.check(
                      Schema.isMaxCodePoints(160).annotate({
                        expected: "a string with at most 160 code points",
                      }),
                    ).check(
                      Schema.isMaxLength(160).annotate({
                        expected: "a value with a length of at most 160",
                      }),
                    ),
                    kind: Schema.Union([Schema.Literal("time"), Schema.Literal("text")]),
                  }),
                  Schema.Null,
                ]),
                sources: Schema.Array(
                  Schema.String.check(
                    Schema.isMaxCodePoints(160).annotate({
                      expected: "a string with at most 160 code points",
                    }),
                  ).check(
                    Schema.isMaxLength(160).annotate({
                      expected: "a value with a length of at most 160",
                    }),
                  ),
                ).check(
                  Schema.isMaxLength(8).annotate({
                    expected: "a value with a length of at most 8",
                  }),
                ),
                omittedSources: Schema.Finite.check(
                  Schema.isInt().annotate({ expected: "an integer" }),
                )
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
              Schema.Null,
            ]),
          ),
          evidence: Schema.Array(
            Schema.Struct({
              file: Schema.String,
              row: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
              declared: Schema.Union([
                Schema.Struct({ kind: Schema.Literal("status_column") }),
                Schema.Struct({
                  kind: Schema.Literal("export_scope"),
                  scope: Schema.Union([
                    Schema.Literal("subscribed"),
                    Schema.Literal("unsubscribed"),
                    Schema.Literal("suppressed"),
                    Schema.Literal("cleaned/bounced"),
                  ]),
                }),
              ]),
              suppressionFree: Schema.Boolean,
              sourceStatus: Schema.Union([Schema.String, Schema.Null]),
              signupAt: Schema.Union([Schema.String, Schema.Null]),
              source: Schema.Union([Schema.String, Schema.Null]),
            }),
          ),
        }),
        latest: Schema.Struct({
          jobId: ContactImportJobId,
          topicId: TopicId,
          preset: Schema.Union([
            Schema.Literal("beehiiv"),
            Schema.Literal("substack"),
            Schema.Literal("kit"),
            Schema.Literal("mailchimp"),
          ]),
          importedAt: Schema.String,
          summary: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                signupAt: Schema.Union([
                  Schema.Struct({
                    value: Schema.String.check(
                      Schema.isMaxCodePoints(160).annotate({
                        expected: "a string with at most 160 code points",
                      }),
                    ).check(
                      Schema.isMaxLength(160).annotate({
                        expected: "a value with a length of at most 160",
                      }),
                    ),
                    kind: Schema.Union([Schema.Literal("time"), Schema.Literal("text")]),
                  }),
                  Schema.Null,
                ]),
                sources: Schema.Array(
                  Schema.String.check(
                    Schema.isMaxCodePoints(160).annotate({
                      expected: "a string with at most 160 code points",
                    }),
                  ).check(
                    Schema.isMaxLength(160).annotate({
                      expected: "a value with a length of at most 160",
                    }),
                  ),
                ).check(
                  Schema.isMaxLength(8).annotate({
                    expected: "a value with a length of at most 8",
                  }),
                ),
                omittedSources: Schema.Finite.check(
                  Schema.isInt().annotate({ expected: "an integer" }),
                )
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
              Schema.Null,
            ]),
          ),
          evidence: Schema.Array(
            Schema.Struct({
              file: Schema.String,
              row: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
              declared: Schema.Union([
                Schema.Struct({ kind: Schema.Literal("status_column") }),
                Schema.Struct({
                  kind: Schema.Literal("export_scope"),
                  scope: Schema.Union([
                    Schema.Literal("subscribed"),
                    Schema.Literal("unsubscribed"),
                    Schema.Literal("suppressed"),
                    Schema.Literal("cleaned/bounced"),
                  ]),
                }),
              ]),
              suppressionFree: Schema.Boolean,
              sourceStatus: Schema.Union([Schema.String, Schema.Null]),
              signupAt: Schema.Union([Schema.String, Schema.Null]),
              source: Schema.Union([Schema.String, Schema.Null]),
            }),
          ),
        }),
      }),
      Schema.Null,
    ]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "Contact" }))();
export type ContactsListQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
  readonly namespaceId?: NamespaceId | null;
  readonly search?: string | null;
  readonly status?: "active" | "paused" | "blocked" | "archived" | null;
  readonly fields?: string | null;
  readonly customField?: string | null;
  readonly customFieldValue?: string | null;
  readonly after?: string | null;
  readonly before?: string | null;
};
export const ContactsListQuery = /* @__PURE__ */ (() =>
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
    namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
    search: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    status: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Literal("active"),
          Schema.Literal("paused"),
          Schema.Literal("blocked"),
          Schema.Literal("archived"),
        ]),
        Schema.Null,
      ]),
    ),
    fields: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    customField: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    customFieldValue: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    after: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    before: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type ContactsList200 = ContactPage;
export const ContactsList200 = ContactPage;
export type ContactsList401 = UnauthorizedError;
export const ContactsList401 = UnauthorizedError;
export type ContactsList403 = ForbiddenError;
export const ContactsList403 = ForbiddenError;
export type ContactsList422 = ValidationError;
export const ContactsList422 = ValidationError;
export type ContactsList500 = InternalError;
export const ContactsList500 = InternalError;
export type ContactsList504 = GatewayTimeoutError;
export const ContactsList504 = GatewayTimeoutError;
export type ContactsCreateRequestJson = {
  readonly namespaceId?: NamespaceId | null;
  readonly name: string;
  readonly displayName?: string | null;
  readonly avatar?: string | null;
  readonly identities?: ReadonlyArray<ContactIdentityInput> | null;
  readonly profile?: ContactProfile | null;
  readonly preferences?: ContactPreferences | null;
  readonly tags?: ReadonlyArray<string> | null;
  readonly status?: "active" | "paused" | "blocked" | "archived" | null;
  readonly statusReason?: string | null;
  readonly externalId?: string | null;
  readonly metadata?: JsonObject | null;
};
export const ContactsCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
    name: Schema.String,
    displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    avatar: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    identities: Schema.optionalKey(Schema.Union([Schema.Array(ContactIdentityInput), Schema.Null])),
    profile: Schema.optionalKey(Schema.Union([ContactProfile, Schema.Null])),
    preferences: Schema.optionalKey(Schema.Union([ContactPreferences, Schema.Null])),
    tags: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
    status: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Literal("active"),
          Schema.Literal("paused"),
          Schema.Literal("blocked"),
          Schema.Literal("archived"),
        ]),
        Schema.Null,
      ]),
    ),
    statusReason: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    externalId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    metadata: Schema.optionalKey(Schema.Union([JsonObject, Schema.Null])),
  }))();
export type ContactsCreate201 = Contact;
export const ContactsCreate201 = Contact;
export type ContactsCreate401 = UnauthorizedError;
export const ContactsCreate401 = UnauthorizedError;
export type ContactsCreate402 = PaymentRequiredError;
export const ContactsCreate402 = PaymentRequiredError;
export type ContactsCreate403 = ForbiddenError;
export const ContactsCreate403 = ForbiddenError;
export type ContactsCreate404 = ResourceNotFoundError;
export const ContactsCreate404 = ResourceNotFoundError;
export type ContactsCreate409 = ConflictError;
export const ContactsCreate409 = ConflictError;
export type ContactsCreate422 = ValidationError;
export const ContactsCreate422 = ValidationError;
export type ContactsCreate500 = InternalError;
export const ContactsCreate500 = InternalError;
export type ContactsCreate502 = BillingProviderError;
export const ContactsCreate502 = BillingProviderError;
export type ContactsCreate504 = GatewayTimeoutError;
export const ContactsCreate504 = GatewayTimeoutError;
export type ContactsGetPathParams = { readonly id: ContactId };
export const ContactsGetPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: ContactId }))();
export type ContactsGet200 = Contact;
export const ContactsGet200 = Contact;
export type ContactsGet401 = UnauthorizedError;
export const ContactsGet401 = UnauthorizedError;
export type ContactsGet403 = ForbiddenError;
export const ContactsGet403 = ForbiddenError;
export type ContactsGet404 = ResourceNotFoundError;
export const ContactsGet404 = ResourceNotFoundError;
export type ContactsGet422 = ValidationError;
export const ContactsGet422 = ValidationError;
export type ContactsGet500 = InternalError;
export const ContactsGet500 = InternalError;
export type ContactsGet504 = GatewayTimeoutError;
export const ContactsGet504 = GatewayTimeoutError;
export type ContactsRemovePathParams = { readonly id: ContactId };
export const ContactsRemovePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: ContactId }))();
export type ContactsRemove200 = { readonly success: boolean };
export const ContactsRemove200 = /* @__PURE__ */ (() =>
  Schema.Struct({ success: Schema.Boolean }))();
export type ContactsRemove401 = UnauthorizedError;
export const ContactsRemove401 = UnauthorizedError;
export type ContactsRemove403 = ForbiddenError;
export const ContactsRemove403 = ForbiddenError;
export type ContactsRemove404 = ResourceNotFoundError;
export const ContactsRemove404 = ResourceNotFoundError;
export type ContactsRemove422 = ValidationError;
export const ContactsRemove422 = ValidationError;
export type ContactsRemove500 = InternalError;
export const ContactsRemove500 = InternalError;
export type ContactsRemove502 = BillingProviderError;
export const ContactsRemove502 = BillingProviderError;
export type ContactsRemove504 = GatewayTimeoutError;
export const ContactsRemove504 = GatewayTimeoutError;
export type ContactsUpdatePathParams = { readonly id: ContactId };
export const ContactsUpdatePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: ContactId }))();
export type ContactsUpdateRequestJson = {
  readonly name?: string | null;
  readonly displayName?: string | null;
  readonly avatar?: string | null;
  readonly profile?: ContactProfileUpdate | null;
  readonly preferences?: ContactPreferences | null;
  readonly status?: "active" | "paused" | "blocked" | "archived" | null;
  readonly statusReason?: string | null;
  readonly externalId?: string | null;
  readonly metadata?: JsonObject | null;
};
export const ContactsUpdateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    avatar: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    profile: Schema.optionalKey(Schema.Union([ContactProfileUpdate, Schema.Null])),
    preferences: Schema.optionalKey(Schema.Union([ContactPreferences, Schema.Null])),
    status: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Literal("active"),
          Schema.Literal("paused"),
          Schema.Literal("blocked"),
          Schema.Literal("archived"),
        ]),
        Schema.Null,
      ]),
    ),
    statusReason: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    externalId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    metadata: Schema.optionalKey(Schema.Union([JsonObject, Schema.Null])),
  }))();
export type ContactsUpdate200 = Contact;
export const ContactsUpdate200 = Contact;
export type ContactsUpdate401 = UnauthorizedError;
export const ContactsUpdate401 = UnauthorizedError;
export type ContactsUpdate402 = PaymentRequiredError;
export const ContactsUpdate402 = PaymentRequiredError;
export type ContactsUpdate403 = ForbiddenError;
export const ContactsUpdate403 = ForbiddenError;
export type ContactsUpdate404 = ResourceNotFoundError;
export const ContactsUpdate404 = ResourceNotFoundError;
export type ContactsUpdate422 = ValidationError;
export const ContactsUpdate422 = ValidationError;
export type ContactsUpdate500 = InternalError;
export const ContactsUpdate500 = InternalError;
export type ContactsUpdate502 = BillingProviderError;
export const ContactsUpdate502 = BillingProviderError;
export type ContactsUpdate504 = GatewayTimeoutError;
export const ContactsUpdate504 = GatewayTimeoutError;
export type ContactsGetActivityTimelinePathParams = { readonly id: ContactId };
export const ContactsGetActivityTimelinePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ContactId }))();
export type ContactsGetActivityTimelineQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
  readonly channel?: "email" | null;
};
export const ContactsGetActivityTimelineQuery = /* @__PURE__ */ (() =>
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
    channel: Schema.optionalKey(Schema.Union([Schema.Literal("email"), Schema.Null])),
  }))();
export type ContactsGetActivityTimeline200 = ContactActivityPage;
export const ContactsGetActivityTimeline200 = ContactActivityPage;
export type ContactsGetActivityTimeline401 = UnauthorizedError;
export const ContactsGetActivityTimeline401 = UnauthorizedError;
export type ContactsGetActivityTimeline403 = ForbiddenError;
export const ContactsGetActivityTimeline403 = ForbiddenError;
export type ContactsGetActivityTimeline404 = ResourceNotFoundError;
export const ContactsGetActivityTimeline404 = ResourceNotFoundError;
export type ContactsGetActivityTimeline422 = ValidationError;
export const ContactsGetActivityTimeline422 = ValidationError;
export type ContactsGetActivityTimeline500 = InternalError;
export const ContactsGetActivityTimeline500 = InternalError;
export type ContactsGetActivityTimeline504 = GatewayTimeoutError;
export const ContactsGetActivityTimeline504 = GatewayTimeoutError;
export type ContactsGetEngagementPathParams = { readonly id: ContactId };
export const ContactsGetEngagementPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ContactId }))();
export type ContactsGetEngagement200 = {
  readonly totalMessages: number;
  readonly messagesSent: number;
  readonly messagesReceived: number;
  readonly activeConversations: number;
  readonly lastActivityAt: string | null;
  readonly channelsUsed: { readonly [x: string]: number };
};
export const ContactsGetEngagement200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    totalMessages: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    messagesSent: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    messagesReceived: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    activeConversations: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    lastActivityAt: Schema.Union([Schema.String, Schema.Null]),
    channelsUsed: Schema.Record(
      Schema.String,
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
  }))();
export type ContactsGetEngagement401 = UnauthorizedError;
export const ContactsGetEngagement401 = UnauthorizedError;
export type ContactsGetEngagement403 = ForbiddenError;
export const ContactsGetEngagement403 = ForbiddenError;
export type ContactsGetEngagement404 = ResourceNotFoundError;
export const ContactsGetEngagement404 = ResourceNotFoundError;
export type ContactsGetEngagement422 = ValidationError;
export const ContactsGetEngagement422 = ValidationError;
export type ContactsGetEngagement500 = InternalError;
export const ContactsGetEngagement500 = InternalError;
export type ContactsGetEngagement504 = GatewayTimeoutError;
export const ContactsGetEngagement504 = GatewayTimeoutError;
export type ContactsGetGroupMembershipsPathParams = { readonly id: ContactId };
export const ContactsGetGroupMembershipsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ContactId }))();
export type ContactsGetGroupMembershipsQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
};
export const ContactsGetGroupMembershipsQuery = /* @__PURE__ */ (() =>
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
export type ContactsGetGroupMemberships200 = ContactGroupMembershipPage;
export const ContactsGetGroupMemberships200 = ContactGroupMembershipPage;
export type ContactsGetGroupMemberships401 = UnauthorizedError;
export const ContactsGetGroupMemberships401 = UnauthorizedError;
export type ContactsGetGroupMemberships403 = ForbiddenError;
export const ContactsGetGroupMemberships403 = ForbiddenError;
export type ContactsGetGroupMemberships404 = ResourceNotFoundError;
export const ContactsGetGroupMemberships404 = ResourceNotFoundError;
export type ContactsGetGroupMemberships422 = ValidationError;
export const ContactsGetGroupMemberships422 = ValidationError;
export type ContactsGetGroupMemberships500 = InternalError;
export const ContactsGetGroupMemberships500 = InternalError;
export type ContactsGetGroupMemberships504 = GatewayTimeoutError;
export const ContactsGetGroupMemberships504 = GatewayTimeoutError;
export type ContactsAddIdentityPathParams = { readonly id: ContactId };
export const ContactsAddIdentityPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ContactId }))();
export type ContactsAddIdentityRequestJson = {
  readonly type: "email" | "phone";
  readonly identifier: string;
  readonly verified?: boolean | null;
};
export const ContactsAddIdentityRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    type: Schema.Union([Schema.Literal("email"), Schema.Literal("phone")]),
    identifier: Schema.String,
    verified: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  }))();
export type ContactsAddIdentity200 = Contact;
export const ContactsAddIdentity200 = Contact;
export type ContactsAddIdentity401 = UnauthorizedError;
export const ContactsAddIdentity401 = UnauthorizedError;
export type ContactsAddIdentity403 = ForbiddenError;
export const ContactsAddIdentity403 = ForbiddenError;
export type ContactsAddIdentity404 = ResourceNotFoundError;
export const ContactsAddIdentity404 = ResourceNotFoundError;
export type ContactsAddIdentity409 = ConflictError;
export const ContactsAddIdentity409 = ConflictError;
export type ContactsAddIdentity422 = ValidationError;
export const ContactsAddIdentity422 = ValidationError;
export type ContactsAddIdentity500 = InternalError;
export const ContactsAddIdentity500 = InternalError;
export type ContactsAddIdentity504 = GatewayTimeoutError;
export const ContactsAddIdentity504 = GatewayTimeoutError;
export type ContactsRemoveIdentityPathParams = {
  readonly id: ContactId;
  readonly identityId: ContactIdentityId;
};
export const ContactsRemoveIdentityPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ContactId, identityId: ContactIdentityId }))();
export type ContactsRemoveIdentity200 = Contact;
export const ContactsRemoveIdentity200 = Contact;
export type ContactsRemoveIdentity401 = UnauthorizedError;
export const ContactsRemoveIdentity401 = UnauthorizedError;
export type ContactsRemoveIdentity403 = ForbiddenError;
export const ContactsRemoveIdentity403 = ForbiddenError;
export type ContactsRemoveIdentity404 = ResourceNotFoundError;
export const ContactsRemoveIdentity404 = ResourceNotFoundError;
export type ContactsRemoveIdentity422 = ValidationError;
export const ContactsRemoveIdentity422 = ValidationError;
export type ContactsRemoveIdentity500 = InternalError;
export const ContactsRemoveIdentity500 = InternalError;
export type ContactsRemoveIdentity504 = GatewayTimeoutError;
export const ContactsRemoveIdentity504 = GatewayTimeoutError;
export type ContactsSetConsentPathParams = {
  readonly id: ContactId;
  readonly identityId: ContactIdentityId;
  readonly channel: "email";
};
export const ContactsSetConsentPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: ContactId,
    identityId: ContactIdentityId,
    channel: Schema.Literal("email"),
  }))();
export type ContactsSetConsentRequestJson = {
  readonly status: "opted_in" | "opted_out";
  readonly source: string;
  readonly capturedAt: string;
  readonly proof?: JsonObject | null;
};
export const ContactsSetConsentRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    status: Schema.Union([Schema.Literal("opted_in"), Schema.Literal("opted_out")]),
    source: Schema.String.annotate({
      description: "Where the consent was captured, such as a form URL or a checkout step.",
    })
      .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
      .check(
        Schema.isMaxCodePoints(200).annotate({ expected: "a string with at most 200 code points" }),
      )
      .check(
        Schema.isMaxLength(200).annotate({ expected: "a value with a length of at most 200" }),
      ),
    capturedAt: Schema.String,
    proof: Schema.optionalKey(Schema.Union([JsonObject, Schema.Null])),
  }))();
export type ContactsSetConsent200 = Contact;
export const ContactsSetConsent200 = Contact;
export type ContactsSetConsent401 = UnauthorizedError;
export const ContactsSetConsent401 = UnauthorizedError;
export type ContactsSetConsent403 = ForbiddenError;
export const ContactsSetConsent403 = ForbiddenError;
export type ContactsSetConsent404 = ResourceNotFoundError;
export const ContactsSetConsent404 = ResourceNotFoundError;
export type ContactsSetConsent422 = ValidationError;
export const ContactsSetConsent422 = ValidationError;
export type ContactsSetConsent500 = InternalError;
export const ContactsSetConsent500 = InternalError;
export type ContactsSetConsent504 = GatewayTimeoutError;
export const ContactsSetConsent504 = GatewayTimeoutError;
export type ContactsAddTagsPathParams = { readonly id: ContactId };
export const ContactsAddTagsPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: ContactId }))();
export type ContactsAddTagsRequestJson = { readonly tags: readonly [string, ...Array<string>] };
export const ContactsAddTagsRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ tags: Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]) }))();
export type ContactsAddTags200 = Contact;
export const ContactsAddTags200 = Contact;
export type ContactsAddTags401 = UnauthorizedError;
export const ContactsAddTags401 = UnauthorizedError;
export type ContactsAddTags403 = ForbiddenError;
export const ContactsAddTags403 = ForbiddenError;
export type ContactsAddTags404 = ResourceNotFoundError;
export const ContactsAddTags404 = ResourceNotFoundError;
export type ContactsAddTags422 = ValidationError;
export const ContactsAddTags422 = ValidationError;
export type ContactsAddTags500 = InternalError;
export const ContactsAddTags500 = InternalError;
export type ContactsAddTags504 = GatewayTimeoutError;
export const ContactsAddTags504 = GatewayTimeoutError;
export type ContactsRemoveTagsPathParams = { readonly id: ContactId };
export const ContactsRemoveTagsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ContactId }))();
export type ContactsRemoveTagsRequestJson = { readonly tags: readonly [string, ...Array<string>] };
export const ContactsRemoveTagsRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ tags: Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]) }))();
export type ContactsRemoveTags200 = Contact;
export const ContactsRemoveTags200 = Contact;
export type ContactsRemoveTags401 = UnauthorizedError;
export const ContactsRemoveTags401 = UnauthorizedError;
export type ContactsRemoveTags403 = ForbiddenError;
export const ContactsRemoveTags403 = ForbiddenError;
export type ContactsRemoveTags404 = ResourceNotFoundError;
export const ContactsRemoveTags404 = ResourceNotFoundError;
export type ContactsRemoveTags422 = ValidationError;
export const ContactsRemoveTags422 = ValidationError;
export type ContactsRemoveTags500 = InternalError;
export const ContactsRemoveTags500 = InternalError;
export type ContactsRemoveTags504 = GatewayTimeoutError;
export const ContactsRemoveTags504 = GatewayTimeoutError;
export type ContactsBulkDeleteRequestJson = {
  readonly ids: readonly [ContactId, ...Array<ContactId>];
};
export const ContactsBulkDeleteRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    ids: Schema.TupleWithRest(Schema.Tuple([ContactId]), [ContactId]).check(
      Schema.isMaxLength(1000).annotate({ expected: "a value with a length of at most 1000" }),
    ),
  }))();
export type ContactsBulkDelete200 = { readonly deleted: number; readonly failed: number };
export const ContactsBulkDelete200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    deleted: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    failed: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
export type ContactsBulkDelete401 = UnauthorizedError;
export const ContactsBulkDelete401 = UnauthorizedError;
export type ContactsBulkDelete403 = ForbiddenError;
export const ContactsBulkDelete403 = ForbiddenError;
export type ContactsBulkDelete422 = ValidationError;
export const ContactsBulkDelete422 = ValidationError;
export type ContactsBulkDelete500 = InternalError;
export const ContactsBulkDelete500 = InternalError;
export type ContactsBulkDelete502 = BillingProviderError;
export const ContactsBulkDelete502 = BillingProviderError;
export type ContactsBulkDelete504 = GatewayTimeoutError;
export const ContactsBulkDelete504 = GatewayTimeoutError;
export type ContactsBulkUpdateStatusRequestJson = {
  readonly ids: readonly [ContactId, ...Array<ContactId>];
  readonly status: "active" | "paused" | "blocked" | "archived";
};
export const ContactsBulkUpdateStatusRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    ids: Schema.TupleWithRest(Schema.Tuple([ContactId]), [ContactId]).check(
      Schema.isMaxLength(1000).annotate({ expected: "a value with a length of at most 1000" }),
    ),
    status: Schema.Union([
      Schema.Literal("active"),
      Schema.Literal("paused"),
      Schema.Literal("blocked"),
      Schema.Literal("archived"),
    ]),
  }))();
export type ContactsBulkUpdateStatus200 = BulkUpdateResult;
export const ContactsBulkUpdateStatus200 = BulkUpdateResult;
export type ContactsBulkUpdateStatus401 = UnauthorizedError;
export const ContactsBulkUpdateStatus401 = UnauthorizedError;
export type ContactsBulkUpdateStatus402 = PaymentRequiredError;
export const ContactsBulkUpdateStatus402 = PaymentRequiredError;
export type ContactsBulkUpdateStatus403 = ForbiddenError;
export const ContactsBulkUpdateStatus403 = ForbiddenError;
export type ContactsBulkUpdateStatus422 = ValidationError;
export const ContactsBulkUpdateStatus422 = ValidationError;
export type ContactsBulkUpdateStatus500 = InternalError;
export const ContactsBulkUpdateStatus500 = InternalError;
export type ContactsBulkUpdateStatus502 = BillingProviderError;
export const ContactsBulkUpdateStatus502 = BillingProviderError;
export type ContactsBulkUpdateStatus504 = GatewayTimeoutError;
export const ContactsBulkUpdateStatus504 = GatewayTimeoutError;
export type ContactsBulkUpdateTagsRequestJson = {
  readonly ids: readonly [ContactId, ...Array<ContactId>];
  readonly operation: "add" | "remove" | "set";
  readonly tags: readonly [string, ...Array<string>];
};
export const ContactsBulkUpdateTagsRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    ids: Schema.TupleWithRest(Schema.Tuple([ContactId]), [ContactId]).check(
      Schema.isMaxLength(1000).annotate({ expected: "a value with a length of at most 1000" }),
    ),
    operation: Schema.Union([
      Schema.Literal("add"),
      Schema.Literal("remove"),
      Schema.Literal("set"),
    ]),
    tags: Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]),
  }))();
export type ContactsBulkUpdateTags200 = BulkUpdateResult;
export const ContactsBulkUpdateTags200 = BulkUpdateResult;
export type ContactsBulkUpdateTags401 = UnauthorizedError;
export const ContactsBulkUpdateTags401 = UnauthorizedError;
export type ContactsBulkUpdateTags403 = ForbiddenError;
export const ContactsBulkUpdateTags403 = ForbiddenError;
export type ContactsBulkUpdateTags422 = ValidationError;
export const ContactsBulkUpdateTags422 = ValidationError;
export type ContactsBulkUpdateTags500 = InternalError;
export const ContactsBulkUpdateTags500 = InternalError;
export type ContactsBulkUpdateTags504 = GatewayTimeoutError;
export const ContactsBulkUpdateTags504 = GatewayTimeoutError;
export type ContactsExportRequestJson = {
  readonly ids?: ReadonlyArray<ContactId> | null;
  readonly format?: "json" | "csv" | null;
  readonly filters?: {
    readonly status?: "active" | "paused" | "blocked" | "archived" | null;
    readonly tags?: ReadonlyArray<string> | null;
  } | null;
  readonly fields?: ReadonlyArray<string> | null;
};
export const ContactsExportRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    ids: Schema.optionalKey(
      Schema.Union([
        Schema.Array(ContactId).check(
          Schema.isMaxLength(1000).annotate({ expected: "a value with a length of at most 1000" }),
        ),
        Schema.Null,
      ]),
    ),
    format: Schema.optionalKey(
      Schema.Union([Schema.Union([Schema.Literal("json"), Schema.Literal("csv")]), Schema.Null]),
    ),
    filters: Schema.optionalKey(
      Schema.Union([
        Schema.Struct({
          status: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Schema.Literal("active"),
                Schema.Literal("paused"),
                Schema.Literal("blocked"),
                Schema.Literal("archived"),
              ]),
              Schema.Null,
            ]),
          ),
          tags: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    fields: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  }))();
export type ContactsExport200 = {
  readonly data: string;
  readonly format: "json" | "csv";
  readonly count: number;
};
export const ContactsExport200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    data: Schema.String,
    format: Schema.Union([Schema.Literal("json"), Schema.Literal("csv")]),
    count: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
export type ContactsExport401 = UnauthorizedError;
export const ContactsExport401 = UnauthorizedError;
export type ContactsExport403 = ForbiddenError;
export const ContactsExport403 = ForbiddenError;
export type ContactsExport422 = ValidationError;
export const ContactsExport422 = ValidationError;
export type ContactsExport500 = InternalError;
export const ContactsExport500 = InternalError;
export type ContactsExport504 = GatewayTimeoutError;
export const ContactsExport504 = GatewayTimeoutError;
export type ContactsFindRequestJson = {
  readonly namespaceId?: NamespaceId | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly externalId?: string | null;
};
export const ContactsFindRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
    email: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    phone: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    externalId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type ContactsFind200 = Contact | null;
export const ContactsFind200 = /* @__PURE__ */ (() => Schema.Union([Contact, Schema.Null]))();
export type ContactsFind401 = UnauthorizedError;
export const ContactsFind401 = UnauthorizedError;
export type ContactsFind403 = ForbiddenError;
export const ContactsFind403 = ForbiddenError;
export type ContactsFind404 = ResourceNotFoundError;
export const ContactsFind404 = ResourceNotFoundError;
export type ContactsFind409 = ConflictError;
export const ContactsFind409 = ConflictError;
export type ContactsFind422 = ValidationError;
export const ContactsFind422 = ValidationError;
export type ContactsFind500 = InternalError;
export const ContactsFind500 = InternalError;
export type ContactsFind504 = GatewayTimeoutError;
export const ContactsFind504 = GatewayTimeoutError;
export type ContactsFindOrCreateRequestJson = {
  readonly namespaceId?: NamespaceId | null;
  readonly lookup: ContactLookup;
  readonly create?: {
    readonly name?: string | null;
    readonly displayName?: string | null;
    readonly avatar?: string | null;
    readonly identities?: ReadonlyArray<ContactIdentityInput> | null;
    readonly profile?: ContactProfile | null;
    readonly externalId?: string | null;
  } | null;
};
export const ContactsFindOrCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
    lookup: ContactLookup,
    create: Schema.optionalKey(
      Schema.Union([
        Schema.Struct({
          name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
          displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
          avatar: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
          identities: Schema.optionalKey(
            Schema.Union([Schema.Array(ContactIdentityInput), Schema.Null]),
          ),
          profile: Schema.optionalKey(Schema.Union([ContactProfile, Schema.Null])),
          externalId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
  }))();
export type ContactsFindOrCreate200 = { readonly contact: Contact; readonly created: boolean };
export const ContactsFindOrCreate200 = /* @__PURE__ */ (() =>
  Schema.Struct({ contact: Contact, created: Schema.Boolean }))();
export type ContactsFindOrCreate401 = UnauthorizedError;
export const ContactsFindOrCreate401 = UnauthorizedError;
export type ContactsFindOrCreate402 = PaymentRequiredError;
export const ContactsFindOrCreate402 = PaymentRequiredError;
export type ContactsFindOrCreate403 = ForbiddenError;
export const ContactsFindOrCreate403 = ForbiddenError;
export type ContactsFindOrCreate404 = ResourceNotFoundError;
export const ContactsFindOrCreate404 = ResourceNotFoundError;
export type ContactsFindOrCreate409 = ConflictError;
export const ContactsFindOrCreate409 = ConflictError;
export type ContactsFindOrCreate422 = ValidationError;
export const ContactsFindOrCreate422 = ValidationError;
export type ContactsFindOrCreate500 = InternalError;
export const ContactsFindOrCreate500 = InternalError;
export type ContactsFindOrCreate502 = BillingProviderError;
export const ContactsFindOrCreate502 = BillingProviderError;
export type ContactsFindOrCreate504 = GatewayTimeoutError;
export const ContactsFindOrCreate504 = GatewayTimeoutError;
export type ContactsStartImportHeaders = { readonly "idempotency-key"?: string | null };
export const ContactsStartImportHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.optionalKey(
      Schema.Union([
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
        Schema.Null,
      ]),
    ),
  }))();
export type ContactsStartImportRequestJson =
  | {
      readonly mode: "new";
      readonly input: {
        readonly preset: "beehiiv" | "substack" | "kit" | "mailchimp";
        readonly topicId: TopicId;
        readonly namespaceId?: NamespaceId | null;
        readonly files: readonly [
          {
            readonly name: string;
            readonly csv: string;
            readonly evidence:
              | { readonly kind: "status_column" }
              | {
                  readonly kind: "export_scope";
                  readonly scope: "subscribed" | "unsubscribed" | "suppressed" | "cleaned/bounced";
                };
            readonly suppressionFree?: boolean | null;
          },
          ...Array<{
            readonly name: string;
            readonly csv: string;
            readonly evidence:
              | { readonly kind: "status_column" }
              | {
                  readonly kind: "export_scope";
                  readonly scope: "subscribed" | "unsubscribed" | "suppressed" | "cleaned/bounced";
                };
            readonly suppressionFree?: boolean | null;
          }>,
        ];
      };
      readonly planHash: string;
    }
  | {
      readonly mode: "resume";
      readonly jobId: ContactImportJobId;
      readonly expectedGeneration: number;
    };
export const ContactsStartImportRequestJson = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Struct({
      mode: Schema.Literal("new"),
      input: Schema.Struct({
        preset: Schema.Union([
          Schema.Literal("beehiiv"),
          Schema.Literal("substack"),
          Schema.Literal("kit"),
          Schema.Literal("mailchimp"),
        ]),
        topicId: TopicId,
        namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
        files: Schema.TupleWithRest(
          Schema.Tuple([
            Schema.Struct({
              name: Schema.String.check(
                Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
              )
                .check(
                  Schema.isMaxCodePoints(255).annotate({
                    expected: "a string with at most 255 code points",
                  }),
                )
                .check(
                  Schema.isBetweenLength(1, 255).annotate({
                    expected: "a value with a length between 1 and 255",
                  }),
                ),
              csv: Schema.String.check(
                Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
              ),
              evidence: Schema.Union([
                Schema.Struct({ kind: Schema.Literal("status_column") }),
                Schema.Struct({
                  kind: Schema.Literal("export_scope"),
                  scope: Schema.Union([
                    Schema.Literal("subscribed"),
                    Schema.Literal("unsubscribed"),
                    Schema.Literal("suppressed"),
                    Schema.Literal("cleaned/bounced"),
                  ]),
                }),
              ]),
              suppressionFree: Schema.optionalKey(
                Schema.Union([Schema.Boolean, Schema.Null]).annotate({
                  description:
                    "The operator declares this beehiiv export was filtered to Suppression does not exist.",
                }),
              ),
            }),
          ]),
          [
            Schema.Struct({
              name: Schema.String.check(
                Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
              )
                .check(
                  Schema.isMaxCodePoints(255).annotate({
                    expected: "a string with at most 255 code points",
                  }),
                )
                .check(
                  Schema.isBetweenLength(1, 255).annotate({
                    expected: "a value with a length between 1 and 255",
                  }),
                ),
              csv: Schema.String.check(
                Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
              ),
              evidence: Schema.Union([
                Schema.Struct({ kind: Schema.Literal("status_column") }),
                Schema.Struct({
                  kind: Schema.Literal("export_scope"),
                  scope: Schema.Union([
                    Schema.Literal("subscribed"),
                    Schema.Literal("unsubscribed"),
                    Schema.Literal("suppressed"),
                    Schema.Literal("cleaned/bounced"),
                  ]),
                }),
              ]),
              suppressionFree: Schema.optionalKey(
                Schema.Union([Schema.Boolean, Schema.Null]).annotate({
                  description:
                    "The operator declares this beehiiv export was filtered to Suppression does not exist.",
                }),
              ),
            }),
          ],
        ).check(
          Schema.isMaxLength(20).annotate({ expected: "a value with a length of at most 20" }),
        ),
      }),
      planHash: Schema.String,
    }),
    Schema.Struct({
      mode: Schema.Literal("resume"),
      jobId: ContactImportJobId,
      expectedGeneration: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  ]))();
export type ContactsStartImport202 = {
  readonly id: ContactImportJobId;
  readonly namespaceId: NamespaceId | null;
  readonly topicId: TopicId;
  readonly preset: "beehiiv" | "substack" | "kit" | "mailchimp";
  readonly status: "queued" | "running" | "finalizing" | "completed" | "failed";
  readonly generation: number;
  readonly counts: {
    readonly totalRows: number;
    readonly uniqueAddresses: number;
    readonly subscribed: number;
    readonly unsubscribed: number;
    readonly suppressed: number;
    readonly skipped: number;
    readonly conflicts: number;
    readonly created: number;
    readonly existing: number;
  };
  readonly processedRows: number;
  readonly totalRows: number;
  readonly createdAt: string;
  readonly startedAt: string | null;
  readonly updatedAt: string;
  readonly completedAt: string | null;
  readonly failure: {
    readonly code: string;
    readonly message: string;
    readonly retryable: boolean;
  } | null;
  readonly resumable: boolean;
};
export const ContactsStartImport202 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: ContactImportJobId,
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
    topicId: TopicId,
    preset: Schema.Union([
      Schema.Literal("beehiiv"),
      Schema.Literal("substack"),
      Schema.Literal("kit"),
      Schema.Literal("mailchimp"),
    ]),
    status: Schema.Union([
      Schema.Literal("queued"),
      Schema.Literal("running"),
      Schema.Literal("finalizing"),
      Schema.Literal("completed"),
      Schema.Literal("failed"),
    ]),
    generation: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    counts: Schema.Struct({
      totalRows: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      uniqueAddresses: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      subscribed: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      unsubscribed: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      suppressed: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      skipped: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      conflicts: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      created: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      existing: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    processedRows: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    totalRows: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    createdAt: Schema.String,
    startedAt: Schema.Union([Schema.String, Schema.Null]),
    updatedAt: Schema.String,
    completedAt: Schema.Union([Schema.String, Schema.Null]),
    failure: Schema.Union([
      Schema.Struct({ code: Schema.String, message: Schema.String, retryable: Schema.Boolean }),
      Schema.Null,
    ]),
    resumable: Schema.Boolean,
  }))();
export type ContactsStartImport401 = UnauthorizedError;
export const ContactsStartImport401 = UnauthorizedError;
export type ContactsStartImport402 = PaymentRequiredError;
export const ContactsStartImport402 = PaymentRequiredError;
export type ContactsStartImport403 = ForbiddenError;
export const ContactsStartImport403 = ForbiddenError;
export type ContactsStartImport404 = ResourceNotFoundError;
export const ContactsStartImport404 = ResourceNotFoundError;
export type ContactsStartImport409 = ConflictError;
export const ContactsStartImport409 = ConflictError;
export type ContactsStartImport422 = ValidationError;
export const ContactsStartImport422 = ValidationError;
export type ContactsStartImport500 = InternalError;
export const ContactsStartImport500 = InternalError;
export type ContactsStartImport502 = BillingProviderError;
export const ContactsStartImport502 = BillingProviderError;
export type ContactsStartImport504 = GatewayTimeoutError;
export const ContactsStartImport504 = GatewayTimeoutError;
export type ContactsGetImportJobPathParams = { readonly id: ContactImportJobId };
export const ContactsGetImportJobPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: ContactImportJobId }))();
export type ContactsGetImportJob200 = {
  readonly id: ContactImportJobId;
  readonly namespaceId: NamespaceId | null;
  readonly topicId: TopicId;
  readonly preset: "beehiiv" | "substack" | "kit" | "mailchimp";
  readonly status: "queued" | "running" | "finalizing" | "completed" | "failed";
  readonly generation: number;
  readonly counts: {
    readonly totalRows: number;
    readonly uniqueAddresses: number;
    readonly subscribed: number;
    readonly unsubscribed: number;
    readonly suppressed: number;
    readonly skipped: number;
    readonly conflicts: number;
    readonly created: number;
    readonly existing: number;
  };
  readonly processedRows: number;
  readonly totalRows: number;
  readonly createdAt: string;
  readonly startedAt: string | null;
  readonly updatedAt: string;
  readonly completedAt: string | null;
  readonly failure: {
    readonly code: string;
    readonly message: string;
    readonly retryable: boolean;
  } | null;
  readonly resumable: boolean;
};
export const ContactsGetImportJob200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: ContactImportJobId,
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
    topicId: TopicId,
    preset: Schema.Union([
      Schema.Literal("beehiiv"),
      Schema.Literal("substack"),
      Schema.Literal("kit"),
      Schema.Literal("mailchimp"),
    ]),
    status: Schema.Union([
      Schema.Literal("queued"),
      Schema.Literal("running"),
      Schema.Literal("finalizing"),
      Schema.Literal("completed"),
      Schema.Literal("failed"),
    ]),
    generation: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    counts: Schema.Struct({
      totalRows: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      uniqueAddresses: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      subscribed: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      unsubscribed: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      suppressed: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      skipped: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      conflicts: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      created: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      existing: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    processedRows: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    totalRows: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    createdAt: Schema.String,
    startedAt: Schema.Union([Schema.String, Schema.Null]),
    updatedAt: Schema.String,
    completedAt: Schema.Union([Schema.String, Schema.Null]),
    failure: Schema.Union([
      Schema.Struct({ code: Schema.String, message: Schema.String, retryable: Schema.Boolean }),
      Schema.Null,
    ]),
    resumable: Schema.Boolean,
  }))();
export type ContactsGetImportJob401 = UnauthorizedError;
export const ContactsGetImportJob401 = UnauthorizedError;
export type ContactsGetImportJob403 = ForbiddenError;
export const ContactsGetImportJob403 = ForbiddenError;
export type ContactsGetImportJob404 = ResourceNotFoundError;
export const ContactsGetImportJob404 = ResourceNotFoundError;
export type ContactsGetImportJob422 = ValidationError;
export const ContactsGetImportJob422 = ValidationError;
export type ContactsGetImportJob500 = InternalError;
export const ContactsGetImportJob500 = InternalError;
export type ContactsGetImportJob504 = GatewayTimeoutError;
export const ContactsGetImportJob504 = GatewayTimeoutError;
export type ContactsPlanImportRequestJson = {
  readonly preset: "beehiiv" | "substack" | "kit" | "mailchimp";
  readonly topicId: TopicId;
  readonly namespaceId?: NamespaceId | null;
  readonly files: readonly [
    {
      readonly name: string;
      readonly csv: string;
      readonly evidence:
        | { readonly kind: "status_column" }
        | {
            readonly kind: "export_scope";
            readonly scope: "subscribed" | "unsubscribed" | "suppressed" | "cleaned/bounced";
          };
      readonly suppressionFree?: boolean | null;
    },
    ...Array<{
      readonly name: string;
      readonly csv: string;
      readonly evidence:
        | { readonly kind: "status_column" }
        | {
            readonly kind: "export_scope";
            readonly scope: "subscribed" | "unsubscribed" | "suppressed" | "cleaned/bounced";
          };
      readonly suppressionFree?: boolean | null;
    }>,
  ];
};
export const ContactsPlanImportRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    preset: Schema.Union([
      Schema.Literal("beehiiv"),
      Schema.Literal("substack"),
      Schema.Literal("kit"),
      Schema.Literal("mailchimp"),
    ]),
    topicId: TopicId,
    namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
    files: Schema.TupleWithRest(
      Schema.Tuple([
        Schema.Struct({
          name: Schema.String.check(
            Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
          )
            .check(
              Schema.isMaxCodePoints(255).annotate({
                expected: "a string with at most 255 code points",
              }),
            )
            .check(
              Schema.isBetweenLength(1, 255).annotate({
                expected: "a value with a length between 1 and 255",
              }),
            ),
          csv: Schema.String.check(
            Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
          ),
          evidence: Schema.Union([
            Schema.Struct({ kind: Schema.Literal("status_column") }),
            Schema.Struct({
              kind: Schema.Literal("export_scope"),
              scope: Schema.Union([
                Schema.Literal("subscribed"),
                Schema.Literal("unsubscribed"),
                Schema.Literal("suppressed"),
                Schema.Literal("cleaned/bounced"),
              ]),
            }),
          ]),
          suppressionFree: Schema.optionalKey(
            Schema.Union([Schema.Boolean, Schema.Null]).annotate({
              description:
                "The operator declares this beehiiv export was filtered to Suppression does not exist.",
            }),
          ),
        }),
      ]),
      [
        Schema.Struct({
          name: Schema.String.check(
            Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
          )
            .check(
              Schema.isMaxCodePoints(255).annotate({
                expected: "a string with at most 255 code points",
              }),
            )
            .check(
              Schema.isBetweenLength(1, 255).annotate({
                expected: "a value with a length between 1 and 255",
              }),
            ),
          csv: Schema.String.check(
            Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
          ),
          evidence: Schema.Union([
            Schema.Struct({ kind: Schema.Literal("status_column") }),
            Schema.Struct({
              kind: Schema.Literal("export_scope"),
              scope: Schema.Union([
                Schema.Literal("subscribed"),
                Schema.Literal("unsubscribed"),
                Schema.Literal("suppressed"),
                Schema.Literal("cleaned/bounced"),
              ]),
            }),
          ]),
          suppressionFree: Schema.optionalKey(
            Schema.Union([Schema.Boolean, Schema.Null]).annotate({
              description:
                "The operator declares this beehiiv export was filtered to Suppression does not exist.",
            }),
          ),
        }),
      ],
    ).check(Schema.isMaxLength(20).annotate({ expected: "a value with a length of at most 20" })),
  }))();
export type ContactsPlanImport200 = {
  readonly planHash: string;
  readonly presetVersion: string;
  readonly namespaceId: NamespaceId | null;
  readonly topicId: TopicId;
  readonly canStart: boolean;
  readonly counts: {
    readonly totalRows: number;
    readonly uniqueAddresses: number;
    readonly subscribed: number;
    readonly unsubscribed: number;
    readonly suppressed: number;
    readonly skipped: number;
    readonly conflicts: number;
    readonly created: number;
    readonly existing: number;
  };
  readonly diagnostics: ReadonlyArray<{
    readonly file: string;
    readonly row: number;
    readonly code: string;
    readonly message: string;
    readonly email?: string | null;
  }>;
  readonly diagnosticsTruncated: boolean;
};
export const ContactsPlanImport200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    planHash: Schema.String,
    presetVersion: Schema.String,
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
    topicId: TopicId,
    canStart: Schema.Boolean,
    counts: Schema.Struct({
      totalRows: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      uniqueAddresses: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      subscribed: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      unsubscribed: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      suppressed: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      skipped: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      conflicts: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      created: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      existing: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    diagnostics: Schema.Array(
      Schema.Struct({
        file: Schema.String,
        row: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        code: Schema.String,
        message: Schema.String,
        email: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      }),
    ),
    diagnosticsTruncated: Schema.Boolean,
  }))();
export type ContactsPlanImport401 = UnauthorizedError;
export const ContactsPlanImport401 = UnauthorizedError;
export type ContactsPlanImport403 = ForbiddenError;
export const ContactsPlanImport403 = ForbiddenError;
export type ContactsPlanImport404 = ResourceNotFoundError;
export const ContactsPlanImport404 = ResourceNotFoundError;
export type ContactsPlanImport422 = ValidationError;
export const ContactsPlanImport422 = ValidationError;
export type ContactsPlanImport500 = InternalError;
export const ContactsPlanImport500 = InternalError;
export type ContactsPlanImport504 = GatewayTimeoutError;
export const ContactsPlanImport504 = GatewayTimeoutError;

export class ContactsGroup extends HttpApiGroup.make("Contacts")
  .add(
    HttpApiEndpoint.get("contactsList", "/v1/contacts", {
      query: ContactsListQuery,
      success: ContactsList200,
      error: [
        ContactsList401.pipe(HttpApiSchema.status(401)),
        ContactsList403.pipe(HttpApiSchema.status(403)),
        ContactsList422.pipe(HttpApiSchema.status(422)),
        ContactsList500,
        ContactsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.list")
      .annotate(OpenApi.Summary, "List contacts")
      .annotate(
        OpenApi.Description,
        'Returns contact summaries for the organization, newest first, filterable by search term, status, and creation time (`after`, `before`). `fields` is a comma-separated list of defined custom field keys to return in each summary\'s `customFields`; omitted keys and unselected fields are not returned. Filter by one defined custom field with `customField` and a JSON-encoded scalar `customFieldValue` (for example, `"creator"`, `42`, or `true`). Both filter parameters are required together, and unknown keys or values of the wrong type are rejected. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page. Read full identities, profile, and metadata with `GET /v1/contacts/{id}`.',
      ),
    HttpApiEndpoint.post("contactsCreate", "/v1/contacts", {
      payload: ContactsCreateRequestJson,
      success: ContactsCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        ContactsCreate401.pipe(HttpApiSchema.status(401)),
        ContactsCreate402.pipe(HttpApiSchema.status(402)),
        ContactsCreate403.pipe(HttpApiSchema.status(403)),
        ContactsCreate404.pipe(HttpApiSchema.status(404)),
        ContactsCreate409.pipe(HttpApiSchema.status(409)),
        ContactsCreate422.pipe(HttpApiSchema.status(422)),
        ContactsCreate500,
        ContactsCreate502.pipe(HttpApiSchema.status(502)),
        ContactsCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.create")
      .annotate(OpenApi.Summary, "Create a contact")
      .annotate(
        OpenApi.Description,
        "Creates a contact and returns it with a 201 status. An identity another contact already holds is a conflict.",
      ),
    HttpApiEndpoint.get("contactsGet", "/v1/contacts/:id", {
      params: ContactsGetPathParams,
      success: ContactsGet200,
      error: [
        ContactsGet401.pipe(HttpApiSchema.status(401)),
        ContactsGet403.pipe(HttpApiSchema.status(403)),
        ContactsGet404.pipe(HttpApiSchema.status(404)),
        ContactsGet422.pipe(HttpApiSchema.status(422)),
        ContactsGet500,
        ContactsGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.get")
      .annotate(OpenApi.Summary, "Get a contact")
      .annotate(
        OpenApi.Description,
        "Returns a contact with its identities, profile, tags, and metadata.",
      ),
    HttpApiEndpoint.delete("contactsRemove", "/v1/contacts/:id", {
      params: ContactsRemovePathParams,
      success: ContactsRemove200,
      error: [
        ContactsRemove401.pipe(HttpApiSchema.status(401)),
        ContactsRemove403.pipe(HttpApiSchema.status(403)),
        ContactsRemove404.pipe(HttpApiSchema.status(404)),
        ContactsRemove422.pipe(HttpApiSchema.status(422)),
        ContactsRemove500,
        ContactsRemove502.pipe(HttpApiSchema.status(502)),
        ContactsRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.remove")
      .annotate(OpenApi.Summary, "Delete a contact")
      .annotate(OpenApi.Description, "Permanently deletes a contact by its ID."),
    HttpApiEndpoint.patch("contactsUpdate", "/v1/contacts/:id", {
      params: ContactsUpdatePathParams,
      payload: ContactsUpdateRequestJson,
      success: ContactsUpdate200,
      error: [
        ContactsUpdate401.pipe(HttpApiSchema.status(401)),
        ContactsUpdate402.pipe(HttpApiSchema.status(402)),
        ContactsUpdate403.pipe(HttpApiSchema.status(403)),
        ContactsUpdate404.pipe(HttpApiSchema.status(404)),
        ContactsUpdate422.pipe(HttpApiSchema.status(422)),
        ContactsUpdate500,
        ContactsUpdate502.pipe(HttpApiSchema.status(502)),
        ContactsUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.update")
      .annotate(OpenApi.Summary, "Update a contact")
      .annotate(
        OpenApi.Description,
        "Updates the fields you name and keeps the rest. `metadata` merges into the stored metadata by key, and a `null` value deletes that key. `profile` replaces each field it names and `null` clears one; its `customFields` merge by key the same way. Identities and tags are not updated here: use `POST /v1/contacts/{id}/identities`, `DELETE /v1/contacts/{id}/identities/{identityId}`, `POST /v1/contacts/{id}/tags`, and `DELETE /v1/contacts/{id}/tags`.",
      ),
    HttpApiEndpoint.get("contactsGetActivityTimeline", "/v1/contacts/:id/activity", {
      params: ContactsGetActivityTimelinePathParams,
      query: ContactsGetActivityTimelineQuery,
      success: ContactsGetActivityTimeline200,
      error: [
        ContactsGetActivityTimeline401.pipe(HttpApiSchema.status(401)),
        ContactsGetActivityTimeline403.pipe(HttpApiSchema.status(403)),
        ContactsGetActivityTimeline404.pipe(HttpApiSchema.status(404)),
        ContactsGetActivityTimeline422.pipe(HttpApiSchema.status(422)),
        ContactsGetActivityTimeline500,
        ContactsGetActivityTimeline504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.getActivityTimeline")
      .annotate(OpenApi.Summary, "Get contact activity timeline")
      .annotate(
        OpenApi.Description,
        "Returns a contact's message activity, newest first, optionally filtered by channel. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.get("contactsGetEngagement", "/v1/contacts/:id/engagement", {
      params: ContactsGetEngagementPathParams,
      success: ContactsGetEngagement200,
      error: [
        ContactsGetEngagement401.pipe(HttpApiSchema.status(401)),
        ContactsGetEngagement403.pipe(HttpApiSchema.status(403)),
        ContactsGetEngagement404.pipe(HttpApiSchema.status(404)),
        ContactsGetEngagement422.pipe(HttpApiSchema.status(422)),
        ContactsGetEngagement500,
        ContactsGetEngagement504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.getEngagement")
      .annotate(OpenApi.Summary, "Get contact engagement metrics")
      .annotate(
        OpenApi.Description,
        "Returns aggregated engagement metrics for a contact, including message counts and active conversation totals.",
      ),
    HttpApiEndpoint.get("contactsGetGroupMemberships", "/v1/contacts/:id/groups", {
      params: ContactsGetGroupMembershipsPathParams,
      query: ContactsGetGroupMembershipsQuery,
      success: ContactsGetGroupMemberships200,
      error: [
        ContactsGetGroupMemberships401.pipe(HttpApiSchema.status(401)),
        ContactsGetGroupMemberships403.pipe(HttpApiSchema.status(403)),
        ContactsGetGroupMemberships404.pipe(HttpApiSchema.status(404)),
        ContactsGetGroupMemberships422.pipe(HttpApiSchema.status(422)),
        ContactsGetGroupMemberships500,
        ContactsGetGroupMemberships504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.getGroupMemberships")
      .annotate(OpenApi.Summary, "List a contact's group memberships")
      .annotate(
        OpenApi.Description,
        "Returns the contact groups a contact belongs to, most recently joined first. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.post("contactsAddIdentity", "/v1/contacts/:id/identities", {
      params: ContactsAddIdentityPathParams,
      payload: ContactsAddIdentityRequestJson,
      success: ContactsAddIdentity200,
      error: [
        ContactsAddIdentity401.pipe(HttpApiSchema.status(401)),
        ContactsAddIdentity403.pipe(HttpApiSchema.status(403)),
        ContactsAddIdentity404.pipe(HttpApiSchema.status(404)),
        ContactsAddIdentity409.pipe(HttpApiSchema.status(409)),
        ContactsAddIdentity422.pipe(HttpApiSchema.status(422)),
        ContactsAddIdentity500,
        ContactsAddIdentity504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.addIdentity")
      .annotate(OpenApi.Summary, "Add a contact identity")
      .annotate(
        OpenApi.Description,
        "Adds an address the contact is reached at and returns the contact. Adding an address the contact already has updates whether it is verified. An address another contact holds is a conflict.",
      ),
    HttpApiEndpoint.delete("contactsRemoveIdentity", "/v1/contacts/:id/identities/:identityId", {
      params: ContactsRemoveIdentityPathParams,
      success: ContactsRemoveIdentity200,
      error: [
        ContactsRemoveIdentity401.pipe(HttpApiSchema.status(401)),
        ContactsRemoveIdentity403.pipe(HttpApiSchema.status(403)),
        ContactsRemoveIdentity404.pipe(HttpApiSchema.status(404)),
        ContactsRemoveIdentity422.pipe(HttpApiSchema.status(422)),
        ContactsRemoveIdentity500,
        ContactsRemoveIdentity504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.removeIdentity")
      .annotate(OpenApi.Summary, "Remove a contact identity")
      .annotate(
        OpenApi.Description,
        "Removes one address from the contact and returns the contact.",
      ),
    HttpApiEndpoint.put(
      "contactsSetConsent",
      "/v1/contacts/:id/identities/:identityId/consent/:channel",
      {
        params: ContactsSetConsentPathParams,
        payload: ContactsSetConsentRequestJson,
        success: ContactsSetConsent200,
        error: [
          ContactsSetConsent401.pipe(HttpApiSchema.status(401)),
          ContactsSetConsent403.pipe(HttpApiSchema.status(403)),
          ContactsSetConsent404.pipe(HttpApiSchema.status(404)),
          ContactsSetConsent422.pipe(HttpApiSchema.status(422)),
          ContactsSetConsent500,
          ContactsSetConsent504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.setConsent")
      .annotate(OpenApi.Summary, "Record contact consent")
      .annotate(
        OpenApi.Description,
        "Records the contact's consent on one channel at one of its addresses and returns the contact. `opted_out` stops every send on that channel to that address until the contact opts back in; `opted_in` is what channels that require opt-in check for. `source` and `capturedAt` say where and when the contact decided; `proof` keeps your evidence. A decision captured before the recorded one is ignored. A change publishes `contact.consent_changed`.",
      ),
    HttpApiEndpoint.post("contactsAddTags", "/v1/contacts/:id/tags", {
      params: ContactsAddTagsPathParams,
      payload: ContactsAddTagsRequestJson,
      success: ContactsAddTags200,
      error: [
        ContactsAddTags401.pipe(HttpApiSchema.status(401)),
        ContactsAddTags403.pipe(HttpApiSchema.status(403)),
        ContactsAddTags404.pipe(HttpApiSchema.status(404)),
        ContactsAddTags422.pipe(HttpApiSchema.status(422)),
        ContactsAddTags500,
        ContactsAddTags504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.addTags")
      .annotate(OpenApi.Summary, "Add contact tags")
      .annotate(
        OpenApi.Description,
        "Adds the given tags to the contact, keeping the tags it already has, and returns the contact.",
      ),
    HttpApiEndpoint.delete("contactsRemoveTags", "/v1/contacts/:id/tags", {
      params: ContactsRemoveTagsPathParams,
      payload: ContactsRemoveTagsRequestJson,
      success: ContactsRemoveTags200,
      error: [
        ContactsRemoveTags401.pipe(HttpApiSchema.status(401)),
        ContactsRemoveTags403.pipe(HttpApiSchema.status(403)),
        ContactsRemoveTags404.pipe(HttpApiSchema.status(404)),
        ContactsRemoveTags422.pipe(HttpApiSchema.status(422)),
        ContactsRemoveTags500,
        ContactsRemoveTags504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.removeTags")
      .annotate(OpenApi.Summary, "Remove contact tags")
      .annotate(
        OpenApi.Description,
        "Removes the given tags from the contact and returns the contact. A tag the contact does not have is ignored.",
      ),
    HttpApiEndpoint.post("contactsBulkDelete", "/v1/contacts/bulk-delete", {
      payload: ContactsBulkDeleteRequestJson,
      success: ContactsBulkDelete200,
      error: [
        ContactsBulkDelete401.pipe(HttpApiSchema.status(401)),
        ContactsBulkDelete403.pipe(HttpApiSchema.status(403)),
        ContactsBulkDelete422.pipe(HttpApiSchema.status(422)),
        ContactsBulkDelete500,
        ContactsBulkDelete502.pipe(HttpApiSchema.status(502)),
        ContactsBulkDelete504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.bulkDelete")
      .annotate(OpenApi.Summary, "Bulk delete contacts")
      .annotate(
        OpenApi.Description,
        "Permanently deletes multiple contacts by ID, returning counts of deleted and failed records. One request carries at most 1000 ids.",
      ),
    HttpApiEndpoint.post("contactsBulkUpdateStatus", "/v1/contacts/bulk-update-status", {
      payload: ContactsBulkUpdateStatusRequestJson,
      success: ContactsBulkUpdateStatus200,
      error: [
        ContactsBulkUpdateStatus401.pipe(HttpApiSchema.status(401)),
        ContactsBulkUpdateStatus402.pipe(HttpApiSchema.status(402)),
        ContactsBulkUpdateStatus403.pipe(HttpApiSchema.status(403)),
        ContactsBulkUpdateStatus422.pipe(HttpApiSchema.status(422)),
        ContactsBulkUpdateStatus500,
        ContactsBulkUpdateStatus502.pipe(HttpApiSchema.status(502)),
        ContactsBulkUpdateStatus504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.bulkUpdateStatus")
      .annotate(OpenApi.Summary, "Bulk update contact status")
      .annotate(
        OpenApi.Description,
        "Sets the status on multiple contacts in one request, returning counts of updated and failed records. One request carries at most 1000 ids.",
      ),
    HttpApiEndpoint.post("contactsBulkUpdateTags", "/v1/contacts/bulk-update-tags", {
      payload: ContactsBulkUpdateTagsRequestJson,
      success: ContactsBulkUpdateTags200,
      error: [
        ContactsBulkUpdateTags401.pipe(HttpApiSchema.status(401)),
        ContactsBulkUpdateTags403.pipe(HttpApiSchema.status(403)),
        ContactsBulkUpdateTags422.pipe(HttpApiSchema.status(422)),
        ContactsBulkUpdateTags500,
        ContactsBulkUpdateTags504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.bulkUpdateTags")
      .annotate(OpenApi.Summary, "Bulk update contact tags")
      .annotate(
        OpenApi.Description,
        "Adds, removes, or replaces tags on multiple contacts in one request, returning counts of updated and failed records. One request carries at most 1000 ids.",
      ),
    HttpApiEndpoint.post("contactsExport", "/v1/contacts/export", {
      payload: ContactsExportRequestJson,
      success: ContactsExport200,
      error: [
        ContactsExport401.pipe(HttpApiSchema.status(401)),
        ContactsExport403.pipe(HttpApiSchema.status(403)),
        ContactsExport422.pipe(HttpApiSchema.status(422)),
        ContactsExport500,
        ContactsExport504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.export")
      .annotate(OpenApi.Summary, "Export contacts")
      .annotate(
        OpenApi.Description,
        "Exports contacts as JSON or CSV, returning the serialized data and a count of exported records. The ids filter takes at most 1000 ids.",
      ),
    HttpApiEndpoint.post("contactsFind", "/v1/contacts/find", {
      payload: ContactsFindRequestJson,
      success: ContactsFind200,
      error: [
        ContactsFind401.pipe(HttpApiSchema.status(401)),
        ContactsFind403.pipe(HttpApiSchema.status(403)),
        ContactsFind404.pipe(HttpApiSchema.status(404)),
        ContactsFind409.pipe(HttpApiSchema.status(409)),
        ContactsFind422.pipe(HttpApiSchema.status(422)),
        ContactsFind500,
        ContactsFind504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.find")
      .annotate(OpenApi.Summary, "Find a contact")
      .annotate(
        OpenApi.Description,
        "Looks up a single contact by exactly one of email address, phone number, or external ID and returns null when no contact matches. A phone number without `+` is read in the organization's default region.",
      ),
    HttpApiEndpoint.post("contactsFindOrCreate", "/v1/contacts/find-or-create", {
      payload: ContactsFindOrCreateRequestJson,
      success: ContactsFindOrCreate200,
      error: [
        ContactsFindOrCreate401.pipe(HttpApiSchema.status(401)),
        ContactsFindOrCreate402.pipe(HttpApiSchema.status(402)),
        ContactsFindOrCreate403.pipe(HttpApiSchema.status(403)),
        ContactsFindOrCreate404.pipe(HttpApiSchema.status(404)),
        ContactsFindOrCreate409.pipe(HttpApiSchema.status(409)),
        ContactsFindOrCreate422.pipe(HttpApiSchema.status(422)),
        ContactsFindOrCreate500,
        ContactsFindOrCreate502.pipe(HttpApiSchema.status(502)),
        ContactsFindOrCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.findOrCreate")
      .annotate(OpenApi.Summary, "Find or create a contact")
      .annotate(
        OpenApi.Description,
        "Looks up exactly one identifier through `lookup: { type, value }`. Returns `{ contact, created: false }` unchanged when it exists. Otherwise creates the lookup identity (or external ID), applies `create` attributes, and returns `{ contact, created: true }`. Additional addresses belong in `create.identities`, custom fields in `create.profile.customFields`; custom field keys must be defined and values must match their types. An external ID lookup cannot be contradicted by `create.externalId`. Creation returns HTTP 409 ConflictError if an externalId or address belongs to another contact; the conflicting field is named and no contact is created. Use the update endpoint to change an existing contact.",
      ),
    HttpApiEndpoint.post("contactsStartImport", "/v1/contacts/imports", {
      headers: ContactsStartImportHeaders,
      payload: ContactsStartImportRequestJson,
      success: ContactsStartImport202.pipe(HttpApiSchema.status(202)),
      error: [
        ContactsStartImport401.pipe(HttpApiSchema.status(401)),
        ContactsStartImport402.pipe(HttpApiSchema.status(402)),
        ContactsStartImport403.pipe(HttpApiSchema.status(403)),
        ContactsStartImport404.pipe(HttpApiSchema.status(404)),
        ContactsStartImport409.pipe(HttpApiSchema.status(409)),
        ContactsStartImport422.pipe(HttpApiSchema.status(422)),
        ContactsStartImport500,
        ContactsStartImport502.pipe(HttpApiSchema.status(502)),
        ContactsStartImport504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.startImport")
      .annotate(OpenApi.Summary, "Start or resume a list migration")
      .annotate(
        OpenApi.Description,
        "The complete encoded JSON request, including new-start metadata, must not exceed 3000000 bytes. Admits a durable import using the preview hash and an Idempotency-Key header, or resumes the same persisted input at its committed cursor. The header is required for mode:new and optional for mode:resume. Only mode:new supports idempotent replay. Resume uses expectedGeneration and must not be automatically retried; read getImportJob after an ambiguous response. Imports never restore an existing unsubscribe, suppression or bounce. Namespace-scoped credentials cannot create organization-wide suppressions; those rows are conflicts and create no contact. New active contacts are billable and normal contact events apply.",
      ),
    HttpApiEndpoint.get("contactsGetImportJob", "/v1/contacts/imports/:id", {
      params: ContactsGetImportJobPathParams,
      success: ContactsGetImportJob200,
      error: [
        ContactsGetImportJob401.pipe(HttpApiSchema.status(401)),
        ContactsGetImportJob403.pipe(HttpApiSchema.status(403)),
        ContactsGetImportJob404.pipe(HttpApiSchema.status(404)),
        ContactsGetImportJob422.pipe(HttpApiSchema.status(422)),
        ContactsGetImportJob500,
        ContactsGetImportJob504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.getImportJob")
      .annotate(OpenApi.Summary, "Get list migration progress")
      .annotate(
        OpenApi.Description,
        "Returns the visible import job's committed counts, generation, terminal failure and resumability. The job persists across worker restarts and page reloads.",
      ),
    HttpApiEndpoint.post("contactsPlanImport", "/v1/contacts/imports/plan", {
      payload: ContactsPlanImportRequestJson,
      success: ContactsPlanImport200,
      error: [
        ContactsPlanImport401.pipe(HttpApiSchema.status(401)),
        ContactsPlanImport403.pipe(HttpApiSchema.status(403)),
        ContactsPlanImport404.pipe(HttpApiSchema.status(404)),
        ContactsPlanImport422.pipe(HttpApiSchema.status(422)),
        ContactsPlanImport500,
        ContactsPlanImport504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "contacts.planImport")
      .annotate(OpenApi.Summary, "Preview a list migration")
      .annotate(
        OpenApi.Description,
        "The complete encoded JSON request must not exceed 3000000 bytes. Reads multiple declared export files without changing contacts. Restrictive evidence wins per address. Returns estimated counts and at most 100 diagnostics; processing rechecks current restrictions. Filenames never establish permission. Missing required columns refuse the file; unknown status values are conflicts and never subscribe a reader.",
      ),
  )
  .annotate(
    OpenApi.Description,
    "Contact CRUD, bulk operations, engagement metrics, and activity timeline",
  ) {}
