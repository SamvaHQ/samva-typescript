// Auto-generated from OpenAPI; do not edit.

/* oxlint-disable samva/no-id-casts-or-jsonvalue -- Generated OpenAPI wire contracts preserve the encoded JSON shapes the API answers with. */

import type * as EffectBrand from "effect/Brand";
import { HttpApiMiddleware, HttpApiSecurity } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  AbsoluteInstant as __SamvaRuntimeAbsoluteInstant,
  SensitiveString as __SamvaRuntimeSensitiveString,
} from "../runtime";

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | ReadonlyArray<JsonValue>
  | { readonly [x: string]: JsonValue };
export const JsonValue = Schema.suspend((): Schema.Codec<JsonValue> => __recursive_JsonValue);
export type Cursor = string;
export const Cursor = /* @__PURE__ */ Schema.String.annotate({ identifier: "Cursor" });
export type NamespaceId = string & EffectBrand.Brand<"NamespaceId">;
export const NamespaceId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^ns_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^ns_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "NamespaceId",
  }),
).pipe(Schema.brand("NamespaceId"));
export class UnauthorizedError extends Schema.TaggedError<UnauthorizedError>()(
  "UnauthorizedError",
  Schema.Struct({ message: Schema.String }),
) {}
export class ForbiddenError extends Schema.TaggedError<ForbiddenError>()(
  "ForbiddenError",
  Schema.Struct({ message: Schema.String }),
) {}
export class ValidationError extends Schema.TaggedError<ValidationError>()(
  "ValidationError",
  Schema.Struct({
    message: Schema.String,
    fields: Schema.optionalKey(
      Schema.Union([Schema.Record(Schema.String, Schema.Array(Schema.String)), Schema.Null]),
    ),
  }),
) {}
export class InternalError extends Schema.TaggedError<InternalError>()(
  "InternalError",
  Schema.Struct({ message: Schema.String }),
) {}
export class GatewayTimeoutError extends Schema.TaggedError<GatewayTimeoutError>()(
  "GatewayTimeoutError",
  Schema.Struct({
    message: Schema.String,
    retryAfterSeconds: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
  }),
) {}
export type AgentName = string;
export const AgentName = /* @__PURE__ */ Schema.String.check(
  Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
)
  .check(
    Schema.isMaxCodePoints(120).annotate({ expected: "a string with at most 120 code points" }),
  )
  .check(
    Schema.isPattern(new RegExp("^\\S[\\s\\S]*\\S$|^\\S$|^$", "u")).annotate({
      expected: "a string matching the RegExp ^\\S[\\s\\S]*\\S$|^\\S$|^$",
      identifier: "AgentName",
    }),
  )
  .check(Schema.isMaxLength(120).annotate({ expected: "a value with a length of at most 120" }));
export type MailboxEndpointId = string & EffectBrand.Brand<"MailboxEndpointId">;
export const MailboxEndpointId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^mbxep_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^mbxep_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "MailboxEndpointId",
  }),
).pipe(Schema.brand("MailboxEndpointId"));
export type AgentIntegrationReference = string;
export const AgentIntegrationReference = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^[a-z]{2,8}_[0-9a-z]{16}$", "u")).annotate({
    expected: "a string matching the RegExp ^[a-z]{2,8}_[0-9a-z]{16}$",
    identifier: "AgentIntegrationReference",
  }),
);
export type AgentMode = "live" | "supervised";
export const AgentMode = /* @__PURE__ */ Schema.Union([
  Schema.Literal("live"),
  Schema.Literal("supervised"),
]).annotate({ identifier: "AgentMode" });
export type AgentModel = "standard" | "max";
export const AgentModel = /* @__PURE__ */ Schema.Union([
  Schema.Literal("standard"),
  Schema.Literal("max"),
]).annotate({ identifier: "AgentModel" });
export type AgentApprovalPolicy = "toolActions" | "none";
export const AgentApprovalPolicy = /* @__PURE__ */ Schema.Union([
  Schema.Literal("toolActions"),
  Schema.Literal("none"),
]).annotate({ identifier: "AgentApprovalPolicy" });
export type TimeZone = string;
export const TimeZone = /* @__PURE__ */ Schema.String.annotate({ identifier: "TimeZone" });
export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
export const Weekday = /* @__PURE__ */ Schema.Union([
  Schema.Literal("monday"),
  Schema.Literal("tuesday"),
  Schema.Literal("wednesday"),
  Schema.Literal("thursday"),
  Schema.Literal("friday"),
  Schema.Literal("saturday"),
  Schema.Literal("sunday"),
]).annotate({ identifier: "Weekday" });
export type ClockTime = string;
export const ClockTime = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^(?:[01]\\d|2[0-3]):[0-5]\\d$", "u")).annotate({
    expected: "a string matching the RegExp ^(?:[01]\\d|2[0-3]):[0-5]\\d$",
    identifier: "ClockTime",
  }),
);
export class ResourceNotFoundError extends Schema.TaggedError<ResourceNotFoundError>()(
  "ResourceNotFoundError",
  Schema.Struct({ resource: Schema.String, id: Schema.String, message: Schema.String }),
) {}
export class ConflictError extends Schema.TaggedError<ConflictError>()(
  "ConflictError",
  Schema.Struct({
    message: Schema.String,
    resource: Schema.String,
    id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }),
) {}
export type VersionCursor = string;
export const VersionCursor = /* @__PURE__ */ Schema.String.annotate({
  identifier: "VersionCursor",
});
export class AnalyticsQueryError extends Schema.TaggedError<AnalyticsQueryError>()(
  "AnalyticsQueryError",
  Schema.Struct({ message: Schema.String }),
) {}
export type ApiKeyResourceAccess = {
  readonly messages?: "read" | "write" | null;
  readonly email?: "read" | "write" | null;
  readonly domains?: "read" | "write" | null;
  readonly phoneNumbers?: "read" | "write" | null;
  readonly contacts?: "read" | "write" | null;
  readonly conversations?: "read" | "write" | null;
  readonly templates?: "read" | "write" | null;
  readonly agents?: "read" | "write" | null;
  readonly webhooks?: "read" | "write" | null;
  readonly apiKeys?: "read" | "write" | null;
  readonly organization?: "read" | "write" | null;
  readonly billing?: "read" | "write" | null;
  readonly analytics?: "read" | "write" | null;
};
export const ApiKeyResourceAccess = /* @__PURE__ */ Schema.Struct({
  messages: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.Literal("read"), Schema.Literal("write")]), Schema.Null]),
  ),
  email: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.Literal("read"), Schema.Literal("write")]), Schema.Null]),
  ),
  domains: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.Literal("read"), Schema.Literal("write")]), Schema.Null]),
  ),
  phoneNumbers: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.Literal("read"), Schema.Literal("write")]), Schema.Null]),
  ),
  contacts: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.Literal("read"), Schema.Literal("write")]), Schema.Null]),
  ),
  conversations: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.Literal("read"), Schema.Literal("write")]), Schema.Null]),
  ),
  templates: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.Literal("read"), Schema.Literal("write")]), Schema.Null]),
  ),
  agents: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.Literal("read"), Schema.Literal("write")]), Schema.Null]),
  ),
  webhooks: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.Literal("read"), Schema.Literal("write")]), Schema.Null]),
  ),
  apiKeys: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.Literal("read"), Schema.Literal("write")]), Schema.Null]),
  ),
  organization: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.Literal("read"), Schema.Literal("write")]), Schema.Null]),
  ),
  billing: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.Literal("read"), Schema.Literal("write")]), Schema.Null]),
  ),
  analytics: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.Literal("read"), Schema.Literal("write")]), Schema.Null]),
  ),
}).annotate({ identifier: "ApiKeyResourceAccess" });
export type MailboxId = string & EffectBrand.Brand<"MailboxId">;
export const MailboxId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^mbx_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^mbx_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "MailboxId",
  }),
).pipe(Schema.brand("MailboxId"));
export type MailboxSendMode = "send" | "approval";
export const MailboxSendMode = /* @__PURE__ */ Schema.Union([
  Schema.Literal("send"),
  Schema.Literal("approval"),
]).annotate({
  description:
    "How the grantee's sends execute: `send` runs them within account limits; `approval` holds each one until a different member approves it.",
  identifier: "MailboxSendMode",
});
export class PaymentRequiredError extends Schema.TaggedError<PaymentRequiredError>()(
  "PaymentRequiredError",
  Schema.Struct({
    message: Schema.String,
    resource: Schema.String,
    currentUsage: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    limit: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
  }),
) {}
export class RateLimitedError extends Schema.TaggedError<RateLimitedError>()(
  "RateLimitedError",
  Schema.Struct({
    message: Schema.String,
    retryAfterSeconds: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
  }),
) {}
export class BillingProviderError extends Schema.TaggedError<BillingProviderError>()(
  "BillingProviderError",
  Schema.Struct({ message: Schema.String }),
) {}
export type ApiKeyId = string & EffectBrand.Brand<"ApiKeyId">;
export const ApiKeyId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^key_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^key_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "ApiKeyId",
  }),
).pipe(Schema.brand("ApiKeyId"));
export type SuccessResponse = { readonly success: boolean };
export const SuccessResponse = /* @__PURE__ */ Schema.Struct({ success: Schema.Boolean }).annotate({
  identifier: "SuccessResponse",
});
export type MessageId = string & EffectBrand.Brand<"MessageId">;
export const MessageId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^msg_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^msg_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "MessageId",
  }),
).pipe(Schema.brand("MessageId"));
export type AttachmentId = string & EffectBrand.Brand<"AttachmentId">;
export const AttachmentId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^att_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^att_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "AttachmentId",
  }),
).pipe(Schema.brand("AttachmentId"));
export type OrganizationId = string & EffectBrand.Brand<"OrganizationId">;
export const OrganizationId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^org_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^org_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "OrganizationId",
  }),
).pipe(Schema.brand("OrganizationId"));
export type BrandAssets = {
  readonly logoUrl?: string | null;
  readonly logoDarkUrl?: string | null;
  readonly iconUrl?: string | null;
};
export const BrandAssets = /* @__PURE__ */ Schema.Struct({
  logoUrl: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      )
        .check(
          Schema.isPattern(new RegExp("^https:\\/\\/[^\\s]+$", "u")).annotate({
            expected: "a string matching the RegExp ^https:\\/\\/[^\\s]+$",
          }),
        )
        .check(
          Schema.isMaxLength(2048).annotate({ expected: "a value with a length of at most 2048" }),
        ),
      Schema.Null,
    ]),
  ),
  logoDarkUrl: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      )
        .check(
          Schema.isPattern(new RegExp("^https:\\/\\/[^\\s]+$", "u")).annotate({
            expected: "a string matching the RegExp ^https:\\/\\/[^\\s]+$",
          }),
        )
        .check(
          Schema.isMaxLength(2048).annotate({ expected: "a value with a length of at most 2048" }),
        ),
      Schema.Null,
    ]),
  ),
  iconUrl: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      )
        .check(
          Schema.isPattern(new RegExp("^https:\\/\\/[^\\s]+$", "u")).annotate({
            expected: "a string matching the RegExp ^https:\\/\\/[^\\s]+$",
          }),
        )
        .check(
          Schema.isMaxLength(2048).annotate({ expected: "a value with a length of at most 2048" }),
        ),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "BrandAssets" });
export type BrandAddress = {
  readonly street1: string;
  readonly street2?: string | null;
  readonly city: string;
  readonly region: string;
  readonly postalCode: string;
  readonly country: string;
};
export const BrandAddress = /* @__PURE__ */ Schema.Struct({
  street1: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  ),
  street2: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  city: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  ),
  region: Schema.String,
  postalCode: Schema.String,
  country: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  ),
}).annotate({ identifier: "BrandAddress" });
export type BrandSocialLink = { readonly label: string; readonly url: string };
export const BrandSocialLink = /* @__PURE__ */ Schema.Struct({
  label: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(64).annotate({ expected: "a string with at most 64 code points" }),
    )
    .check(Schema.isMaxLength(64).annotate({ expected: "a value with a length of at most 64" })),
  url: Schema.String.check(
    Schema.isMaxCodePoints(2048).annotate({ expected: "a string with at most 2048 code points" }),
  )
    .check(
      Schema.isPattern(new RegExp("^https:\\/\\/[^\\s]+$", "u")).annotate({
        expected: "a string matching the RegExp ^https:\\/\\/[^\\s]+$",
      }),
    )
    .check(
      Schema.isMaxLength(2048).annotate({ expected: "a value with a length of at most 2048" }),
    ),
}).annotate({ identifier: "BrandSocialLink" });
export type CampaignId = string & EffectBrand.Brand<"CampaignId">;
export const CampaignId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^camp_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^camp_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "CampaignId",
  }),
).pipe(Schema.brand("CampaignId"));
export type MediaId = string & EffectBrand.Brand<"MediaId">;
export const MediaId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^media_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^media_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "MediaId",
  }),
).pipe(Schema.brand("MediaId"));
export type TemplatePublicationId = string & EffectBrand.Brand<"TemplatePublicationId">;
export const TemplatePublicationId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^tpub_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^tpub_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "TemplatePublicationId",
  }),
).pipe(Schema.brand("TemplatePublicationId"));
export type TemplateInputContractId = string & EffectBrand.Brand<"TemplateInputContractId">;
export const TemplateInputContractId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^tcon_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^tcon_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "TemplateInputContractId",
  }),
).pipe(Schema.brand("TemplateInputContractId"));
export type TemplateId = string & EffectBrand.Brand<"TemplateId">;
export const TemplateId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^tmpl_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^tmpl_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "TemplateId",
  }),
).pipe(Schema.brand("TemplateId"));
export type JsonObject = { readonly [x: string]: JsonValue };
export const JsonObject = /* @__PURE__ */ Schema.Record(Schema.String, JsonValue).annotate({
  identifier: "JsonObject",
});
export type RenderLocale = string;
export const RenderLocale = /* @__PURE__ */ Schema.String.check(
  Schema.isMaxCodePoints(64).annotate({
    expected: "a string with at most 64 code points",
    identifier: "RenderLocale",
  }),
).check(Schema.isMaxLength(64).annotate({ expected: "a value with a length of at most 64" }));
export type RenderTimeZone = string;
export const RenderTimeZone = /* @__PURE__ */ Schema.String.check(
  Schema.isMaxCodePoints(64).annotate({
    expected: "a string with at most 64 code points",
    identifier: "RenderTimeZone",
  }),
).check(Schema.isMaxLength(64).annotate({ expected: "a value with a length of at most 64" }));
export type ReplyToAddresses = ReadonlyArray<string> | null | null;
export const ReplyToAddresses = /* @__PURE__ */ Schema.Union([
  Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  Schema.Null,
]).annotate({ identifier: "ReplyToAddresses" });
export type TopicId = string & EffectBrand.Brand<"TopicId">;
export const TopicId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^unsub_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^unsub_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "TopicId",
  }),
).pipe(Schema.brand("TopicId"));
export type EmailTrackingOverrideV1 = { readonly opens?: boolean; readonly clicks?: boolean };
export const EmailTrackingOverrideV1 = /* @__PURE__ */ Schema.Struct({
  opens: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Override open tracking for this send. Omit to inherit the organization default. A recipient tracking opt-out always disables tracking.",
    }),
  ),
  clicks: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Override click tracking for this send. Omit to inherit the organization default. A recipient tracking opt-out always disables tracking.",
    }),
  ),
}).annotate({
  description:
    "Requested per-send engagement tracking policy. Recipient opt-out takes precedence, then explicit fields, organization defaults, and product defaults.",
  identifier: "EmailTrackingOverrideV1",
});
export type EmailFooterOverride = { readonly enabled?: boolean | null };
export const EmailFooterOverride = /* @__PURE__ */ Schema.Struct({
  enabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
}).annotate({ identifier: "EmailFooterOverride" });
export type EmailCustomHeaders = { readonly [x: string]: string };
export const EmailCustomHeaders = /* @__PURE__ */ Schema.Record(Schema.String, Schema.String)
  .annotate({
    description:
      "Custom headers copied onto the outgoing message. Each name is an RFC 5322 field name and each value is one non-empty line of printable ASCII. Names Samva or the transport own are rejected.",
  })
  .check(
    Schema.isMaxProperties(11).annotate({
      expected: "a value with at most 11 entries",
      identifier: "EmailCustomHeaders",
    }),
  );
export type CampaignFrom = { readonly email: string; readonly name?: string | null } | null;
export const CampaignFrom = /* @__PURE__ */ Schema.Union([
  Schema.Struct({
    email: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
    name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }),
  Schema.Null,
]).annotate({ identifier: "CampaignFrom" });
export type ConversationId = string & EffectBrand.Brand<"ConversationId">;
export const ConversationId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^conv_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^conv_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "ConversationId",
  }),
).pipe(Schema.brand("ConversationId"));
export type CampaignContentMetadata = { readonly [x: string]: JsonValue } | null;
export const CampaignContentMetadata = /* @__PURE__ */ Schema.Union([
  Schema.Record(Schema.String, JsonValue),
  Schema.Null,
]).annotate({ identifier: "CampaignContentMetadata" });
export type ContactId = string & EffectBrand.Brand<"ContactId">;
export const ContactId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^contact_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^contact_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "ContactId",
  }),
).pipe(Schema.brand("ContactId"));
export type ContactGroupId = string & EffectBrand.Brand<"ContactGroupId">;
export const ContactGroupId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^cgrp_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^cgrp_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "ContactGroupId",
  }),
).pipe(Schema.brand("ContactGroupId"));
export type CampaignRunId = string & EffectBrand.Brand<"CampaignRunId">;
export const CampaignRunId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^crun_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^crun_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "CampaignRunId",
  }),
).pipe(Schema.brand("CampaignRunId"));
export type SendsSeries = ReadonlyArray<number>;
export const SendsSeries = /* @__PURE__ */ Schema.Array(
  Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    )
    .check(
      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
        expected: "a value less than or equal to 9007199254740991",
      }),
    ),
).annotate({
  description:
    "Daily email sends for the last 14 calendar days in the organization's own timezone, oldest first and zero-filled. Always fourteen entries; an entity that has never sent reports fourteen zeroes.",
  identifier: "SendsSeries",
});
export class FlagDisabledError extends Schema.TaggedError<FlagDisabledError>()(
  "FlagDisabledError",
  Schema.Struct({ flag: Schema.String, message: Schema.String }),
) {}
export type EmailDomainId = string & EffectBrand.Brand<"EmailDomainId">;
export const EmailDomainId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^dom_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^dom_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "EmailDomainId",
  }),
).pipe(Schema.brand("EmailDomainId"));
export class FromAddressRequiredError extends Schema.TaggedError<FromAddressRequiredError>()(
  "FromAddressRequiredError",
  Schema.Struct({ message: Schema.String, verifiedDomains: Schema.Array(Schema.String) }),
) {}
export class BrandAddressRequiredError extends Schema.TaggedError<BrandAddressRequiredError>()(
  "BrandAddressRequiredError",
  Schema.Struct({ message: Schema.String, brand: Schema.Union([Schema.String, Schema.Null]) }),
) {}
export class CampaignFooterRequiredError extends Schema.TaggedError<CampaignFooterRequiredError>()(
  "CampaignFooterRequiredError",
  Schema.Struct({ message: Schema.String }),
) {}
export class ExternalServiceError extends Schema.TaggedError<ExternalServiceError>()(
  "ExternalServiceError",
  Schema.Struct({ message: Schema.String }),
) {}
export class SenderNotReadyError extends Schema.TaggedError<SenderNotReadyError>()(
  "SenderNotReadyError",
  Schema.Struct({
    message: Schema.String,
    sender: Schema.String,
    retryAfterSeconds: Schema.optionalKey(
      Schema.Union([
        Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
    ),
  }),
) {}
export class OnboardingReviewRequiredError extends Schema.TaggedError<OnboardingReviewRequiredError>()(
  "OnboardingReviewRequiredError",
  Schema.Struct({
    message: Schema.String,
    code: Schema.Union([
      Schema.Literal("review_required"),
      Schema.Literal("review_in_progress"),
      Schema.Literal("information_required"),
      Schema.Literal("review_rejected"),
      Schema.Literal("identity_review_required"),
      Schema.Literal("identity_review_rejected"),
      Schema.Literal("identity_changed"),
    ]),
    decision: Schema.Union([
      Schema.Literal("undecided"),
      Schema.Literal("approved"),
      Schema.Literal("rejected"),
    ]),
    stage: Schema.Union([
      Schema.Literal("collecting"),
      Schema.Literal("automated_review"),
      Schema.Literal("manual_review"),
      Schema.Literal("information_requested"),
      Schema.Literal("complete"),
    ]),
    nextAction: Schema.Union([
      Schema.Literal("wait_for_review"),
      Schema.Literal("provide_information"),
      Schema.Literal("verify_sending_identity"),
      Schema.Literal("reapply"),
      Schema.Literal("contact_support"),
    ]),
    identityId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }),
) {}
export class DeliveryUnavailableError extends Schema.TaggedError<DeliveryUnavailableError>()(
  "DeliveryUnavailableError",
  Schema.Struct({
    message: Schema.String,
    retryAfterSeconds: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
  }),
) {}
export type ContactIdentityId = string & EffectBrand.Brand<"ContactIdentityId">;
export const ContactIdentityId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^cident_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^cident_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "ContactIdentityId",
  }),
).pipe(Schema.brand("ContactIdentityId"));
export type WebhookEndpointId = string & EffectBrand.Brand<"WebhookEndpointId">;
export const WebhookEndpointId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^wep_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^wep_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "WebhookEndpointId",
  }),
).pipe(Schema.brand("WebhookEndpointId"));
export class EmailChannelError extends Schema.TaggedError<EmailChannelError>()(
  "EmailChannelError",
  Schema.Struct({
    reason: Schema.Union([
      Schema.Literal("transport"),
      Schema.Literal("rejected"),
      Schema.Literal("rate_limited"),
      Schema.Literal("auth"),
    ]),
    message: Schema.String,
    statusCode: Schema.optionalKey(
      Schema.Union([
        Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
    ),
  }),
) {}
export type OperationId = string & EffectBrand.Brand<"OperationId">;
export const OperationId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^op_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^op_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "OperationId",
  }),
).pipe(Schema.brand("OperationId"));
export type EmailSenderId = string & EffectBrand.Brand<"EmailSenderId">;
export const EmailSenderId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^sender_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^sender_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "EmailSenderId",
  }),
).pipe(Schema.brand("EmailSenderId"));
export type ExtensionId = string & EffectBrand.Brand<"ExtensionId">;
export const ExtensionId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^ext_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^ext_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "ExtensionId",
  }),
).pipe(Schema.brand("ExtensionId"));
export type ExtensionVersionId = string & EffectBrand.Brand<"ExtensionVersionId">;
export const ExtensionVersionId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^extver_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^extver_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "ExtensionVersionId",
  }),
).pipe(Schema.brand("ExtensionVersionId"));
export type UserId = string & EffectBrand.Brand<"UserId">;
export const UserId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^user_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^user_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "UserId",
  }),
).pipe(Schema.brand("UserId"));
export type FeedbackContext = {
  readonly operation?: string | null;
  readonly resourceId?: string | null;
};
export const FeedbackContext = /* @__PURE__ */ Schema.Struct({
  operation: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "The operation the report is about, as an SDK method, MCP tool, CLI command, or `METHOD /path` (for example `POST /v1/messages`).",
      })
        .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
        .check(
          Schema.isMaxCodePoints(200).annotate({
            expected: "a string with at most 200 code points",
          }),
        )
        .check(
          Schema.isMaxLength(200).annotate({ expected: "a value with a length of at most 200" }),
        ),
      Schema.Null,
    ]),
  ),
  resourceId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "The id of the resource involved, such as a message or domain id.",
      })
        .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
        .check(
          Schema.isMaxCodePoints(200).annotate({
            expected: "a string with at most 200 code points",
          }),
        )
        .check(
          Schema.isMaxLength(200).annotate({ expected: "a value with a length of at most 200" }),
        ),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "FeedbackContext" });
export type JourneyName = string;
export const JourneyName = /* @__PURE__ */ Schema.String.check(
  Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
)
  .check(
    Schema.isMaxCodePoints(200).annotate({ expected: "a string with at most 200 code points" }),
  )
  .check(
    Schema.isPattern(new RegExp("^\\S[\\s\\S]*\\S$|^\\S$|^$", "u")).annotate({
      expected: "a string matching the RegExp ^\\S[\\s\\S]*\\S$|^\\S$|^$",
      identifier: "JourneyName",
    }),
  )
  .check(Schema.isMaxLength(200).annotate({ expected: "a value with a length of at most 200" }));
export type JourneyCustomEventName = string;
export const JourneyCustomEventName = /* @__PURE__ */ Schema.String.check(
  Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
)
  .check(
    Schema.isMaxCodePoints(255).annotate({
      expected: "a string with at most 255 code points",
      identifier: "JourneyCustomEventName",
    }),
  )
  .check(Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }))
  .check(
    Schema.isPattern(
      new RegExp(
        "^(?!(?:[Cc][Oo][Nn][Tt][Aa][Cc][Tt]|[Ss][Aa][Mm][Vv][Aa])\\.)[A-Za-z][A-Za-z0-9_.-]*$",
      ),
    ).annotate({
      expected:
        "a string matching the RegExp ^(?!(?:[Cc][Oo][Nn][Tt][Aa][Cc][Tt]|[Ss][Aa][Mm][Vv][Aa])\\.)[A-Za-z][A-Za-z0-9_.-]*$",
    }),
  );
export type JourneyContactCreatedTrigger = { readonly type: "contact.created" };
export const JourneyContactCreatedTrigger = /* @__PURE__ */ Schema.Struct({
  type: Schema.Literal("contact.created"),
}).annotate({ identifier: "JourneyContactCreatedTrigger" });
export type JourneyTagAddedTrigger = { readonly type: "contact.tag_added"; readonly tag: string };
export const JourneyTagAddedTrigger = /* @__PURE__ */ Schema.Struct({
  type: Schema.Literal("contact.tag_added"),
  tag: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  ),
}).annotate({ identifier: "JourneyTagAddedTrigger" });
export type JourneyNodeId = string;
export const JourneyNodeId = /* @__PURE__ */ Schema.String.check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "JourneyNodeId",
  }),
);
export type JourneyWaitConfig = { readonly durationSeconds: number };
export const JourneyWaitConfig = /* @__PURE__ */ Schema.Struct({
  durationSeconds: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isLessThanOrEqualTo(7776000).annotate({
        expected: "a value less than or equal to 7776000",
      }),
    )
    .check(Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" })),
}).annotate({ identifier: "JourneyWaitConfig" });
export type JourneyEmptyConfig = { readonly [x: string]: never };
export const JourneyEmptyConfig = /* @__PURE__ */ Schema.Record(
  Schema.String,
  Schema.Never,
).annotate({ identifier: "JourneyEmptyConfig" });
export type JourneyTagPredicate = {
  readonly type: "tag";
  readonly tag: string;
  readonly present: boolean;
};
export const JourneyTagPredicate = /* @__PURE__ */ Schema.Struct({
  type: Schema.Literal("tag"),
  tag: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  ),
  present: Schema.Boolean,
}).annotate({ identifier: "JourneyTagPredicate" });
export type JourneyContactProperty =
  | "name"
  | "displayName"
  | "externalId"
  | "status"
  | "profile.firstName"
  | "profile.lastName"
  | "profile.company"
  | "profile.jobTitle"
  | "profile.source"
  | "profile.location.country"
  | "profile.location.state"
  | "profile.location.city"
  | "profile.location.timezone";
export const JourneyContactProperty = /* @__PURE__ */ Schema.Union([
  Schema.Literal("name"),
  Schema.Literal("displayName"),
  Schema.Literal("externalId"),
  Schema.Literal("status"),
  Schema.Literal("profile.firstName"),
  Schema.Literal("profile.lastName"),
  Schema.Literal("profile.company"),
  Schema.Literal("profile.jobTitle"),
  Schema.Literal("profile.source"),
  Schema.Literal("profile.location.country"),
  Schema.Literal("profile.location.state"),
  Schema.Literal("profile.location.city"),
  Schema.Literal("profile.location.timezone"),
]).annotate({ identifier: "JourneyContactProperty" });
export type JourneyEqualityComparison = {
  readonly operator: "eq" | "neq";
  readonly value: string | number | boolean | null;
};
export const JourneyEqualityComparison = /* @__PURE__ */ Schema.Struct({
  operator: Schema.Union([Schema.Literal("eq"), Schema.Literal("neq")]),
  value: Schema.Union([
    Schema.String,
    Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    Schema.Boolean,
    Schema.Null,
  ]),
}).annotate({ identifier: "JourneyEqualityComparison" });
export type JourneyNumericComparison = {
  readonly operator: "gt" | "gte" | "lt" | "lte";
  readonly value: number;
};
export const JourneyNumericComparison = /* @__PURE__ */ Schema.Struct({
  operator: Schema.Union([
    Schema.Literal("gt"),
    Schema.Literal("gte"),
    Schema.Literal("lt"),
    Schema.Literal("lte"),
  ]),
  value: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
}).annotate({ identifier: "JourneyNumericComparison" });
export type JourneyStringComparison = {
  readonly operator: "contains" | "not_contains" | "starts_with" | "ends_with";
  readonly value: string;
};
export const JourneyStringComparison = /* @__PURE__ */ Schema.Struct({
  operator: Schema.Union([
    Schema.Literal("contains"),
    Schema.Literal("not_contains"),
    Schema.Literal("starts_with"),
    Schema.Literal("ends_with"),
  ]),
  value: Schema.String,
}).annotate({ identifier: "JourneyStringComparison" });
export type JourneyPresenceComparison = { readonly operator: "exists" | "not_exists" };
export const JourneyPresenceComparison = /* @__PURE__ */ Schema.Struct({
  operator: Schema.Union([Schema.Literal("exists"), Schema.Literal("not_exists")]),
}).annotate({ identifier: "JourneyPresenceComparison" });
export type JourneyUpdateTagsConfig = {
  readonly add: ReadonlyArray<string>;
  readonly remove: ReadonlyArray<string>;
};
export const JourneyUpdateTagsConfig = /* @__PURE__ */ Schema.Struct({
  add: Schema.Array(
    Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
  ),
  remove: Schema.Array(
    Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
  ),
}).annotate({ identifier: "JourneyUpdateTagsConfig" });
export type MailboxChannel = "email";
export const MailboxChannel = /* @__PURE__ */ Schema.Literal("email").annotate({
  description: "The channel an endpoint, thread, or message belongs to.",
  identifier: "MailboxChannel",
});
export type MailboxMetadata = { readonly [x: string]: string };
export const MailboxMetadata = /* @__PURE__ */ Schema.Record(
  Schema.String,
  Schema.String.check(
    Schema.isMaxCodePoints(512).annotate({ expected: "a string with at most 512 code points" }),
  ).check(Schema.isMaxLength(512).annotate({ expected: "a value with a length of at most 512" })),
).check(
  Schema.isPropertyNames(
    Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ).check(
      Schema.isMaxCodePoints(64).annotate({ expected: "a string with at most 64 code points" }),
    ),
  ).annotate({
    expected: "an object with property names matching the schema",
    identifier: "MailboxMetadata",
  }),
);
export type MailboxMetadataPatch = { readonly [x: string]: string | null };
export const MailboxMetadataPatch = /* @__PURE__ */ Schema.Record(
  Schema.String,
  Schema.Union([
    Schema.String.check(
      Schema.isMaxCodePoints(512).annotate({ expected: "a string with at most 512 code points" }),
    ).check(Schema.isMaxLength(512).annotate({ expected: "a value with a length of at most 512" })),
    Schema.Null,
  ]),
).check(
  Schema.isPropertyNames(
    Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ).check(
      Schema.isMaxCodePoints(64).annotate({ expected: "a string with at most 64 code points" }),
    ),
  ).annotate({
    expected: "an object with property names matching the schema",
    identifier: "MailboxMetadataPatch",
  }),
);
export type MailboxThreadId = string & EffectBrand.Brand<"MailboxThreadId">;
export const MailboxThreadId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^thread_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^thread_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "MailboxThreadId",
  }),
).pipe(Schema.brand("MailboxThreadId"));
export type MailboxActionId = string & EffectBrand.Brand<"MailboxActionId">;
export const MailboxActionId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^mbxact_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^mbxact_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "MailboxActionId",
  }),
).pipe(Schema.brand("MailboxActionId"));
export type MailboxDraftId = string & EffectBrand.Brand<"MailboxDraftId">;
export const MailboxDraftId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^mdraft_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^mdraft_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "MailboxDraftId",
  }),
).pipe(Schema.brand("MailboxDraftId"));
export type MailboxPolicyId = string & EffectBrand.Brand<"MailboxPolicyId">;
export const MailboxPolicyId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^mbxpol_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^mbxpol_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "MailboxPolicyId",
  }),
).pipe(Schema.brand("MailboxPolicyId"));
export type MailboxSendError =
  | {
      readonly _tag: "SenderNotReadyError";
      readonly message: string;
      readonly sender: string;
      readonly retryAfterSeconds?: number | null;
    }
  | {
      readonly _tag: "RateLimitedError";
      readonly message: string;
      readonly retryAfterSeconds: number;
    }
  | {
      readonly _tag: "OnboardingReviewRequiredError";
      readonly message: string;
      readonly code:
        | "review_required"
        | "review_in_progress"
        | "information_required"
        | "review_rejected"
        | "identity_review_required"
        | "identity_review_rejected"
        | "identity_changed";
      readonly decision: "undecided" | "approved" | "rejected";
      readonly stage:
        | "collecting"
        | "automated_review"
        | "manual_review"
        | "information_requested"
        | "complete";
      readonly nextAction:
        | "wait_for_review"
        | "provide_information"
        | "verify_sending_identity"
        | "reapply"
        | "contact_support";
      readonly identityId?: string | null;
    }
  | {
      readonly _tag: "PaymentRequiredError";
      readonly message: string;
      readonly resource: string;
      readonly currentUsage: number;
      readonly limit: number;
    }
  | {
      readonly _tag: "ValidationError";
      readonly message: string;
      readonly fields?: { readonly [x: string]: ReadonlyArray<string> } | null;
    }
  | { readonly _tag: "ForbiddenError"; readonly message: string }
  | {
      readonly _tag: "ResourceNotFoundError";
      readonly resource: string;
      readonly id: string;
      readonly message: string;
    };
export const MailboxSendError = /* @__PURE__ */ Schema.Union([
  Schema.TaggedStruct("SenderNotReadyError", {
    message: Schema.String,
    sender: Schema.String,
    retryAfterSeconds: Schema.optionalKey(
      Schema.Union([
        Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
    ),
  }),
  Schema.TaggedStruct("RateLimitedError", {
    message: Schema.String,
    retryAfterSeconds: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
  }),
  Schema.TaggedStruct("OnboardingReviewRequiredError", {
    message: Schema.String,
    code: Schema.Union([
      Schema.Literal("review_required"),
      Schema.Literal("review_in_progress"),
      Schema.Literal("information_required"),
      Schema.Literal("review_rejected"),
      Schema.Literal("identity_review_required"),
      Schema.Literal("identity_review_rejected"),
      Schema.Literal("identity_changed"),
    ]),
    decision: Schema.Union([
      Schema.Literal("undecided"),
      Schema.Literal("approved"),
      Schema.Literal("rejected"),
    ]),
    stage: Schema.Union([
      Schema.Literal("collecting"),
      Schema.Literal("automated_review"),
      Schema.Literal("manual_review"),
      Schema.Literal("information_requested"),
      Schema.Literal("complete"),
    ]),
    nextAction: Schema.Union([
      Schema.Literal("wait_for_review"),
      Schema.Literal("provide_information"),
      Schema.Literal("verify_sending_identity"),
      Schema.Literal("reapply"),
      Schema.Literal("contact_support"),
    ]),
    identityId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }),
  Schema.TaggedStruct("PaymentRequiredError", {
    message: Schema.String,
    resource: Schema.String,
    currentUsage: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    limit: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
  }),
  Schema.TaggedStruct("ValidationError", {
    message: Schema.String,
    fields: Schema.optionalKey(
      Schema.Union([Schema.Record(Schema.String, Schema.Array(Schema.String)), Schema.Null]),
    ),
  }),
  Schema.TaggedStruct("ForbiddenError", { message: Schema.String }),
  Schema.TaggedStruct("ResourceNotFoundError", {
    resource: Schema.String,
    id: Schema.String,
    message: Schema.String,
  }),
]).annotate({ identifier: "MailboxSendError" });
export type MailboxThreadFolder = "inbox" | "assigned" | "pending" | "sent" | "archived" | "trash";
export const MailboxThreadFolder = /* @__PURE__ */ Schema.Union([
  Schema.Literal("inbox"),
  Schema.Literal("assigned"),
  Schema.Literal("pending"),
  Schema.Literal("sent"),
  Schema.Literal("archived"),
  Schema.Literal("trash"),
]).annotate({ identifier: "MailboxThreadFolder" });
export type MailboxGrantRole = "admin" | "collaborator" | "viewer";
export const MailboxGrantRole = /* @__PURE__ */ Schema.Union([
  Schema.Literal("admin"),
  Schema.Literal("collaborator"),
  Schema.Literal("viewer"),
]).annotate({ identifier: "MailboxGrantRole" });
export type MailboxLabelId = string & EffectBrand.Brand<"MailboxLabelId">;
export const MailboxLabelId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^label_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^label_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "MailboxLabelId",
  }),
).pipe(Schema.brand("MailboxLabelId"));
export type MailboxPolicyOutcomeKind = "requireApproval" | "deny";
export const MailboxPolicyOutcomeKind = /* @__PURE__ */ Schema.Union([
  Schema.Literal("requireApproval"),
  Schema.Literal("deny"),
]).annotate({ identifier: "MailboxPolicyOutcomeKind" });
export type MailboxThreadPriority = "low" | "normal" | "high" | "urgent";
export const MailboxThreadPriority = /* @__PURE__ */ Schema.Union([
  Schema.Literal("low"),
  Schema.Literal("normal"),
  Schema.Literal("high"),
  Schema.Literal("urgent"),
]).annotate({ identifier: "MailboxThreadPriority" });
export type MessageMetadata = { readonly [x: string]: JsonValue } | null;
export const MessageMetadata = /* @__PURE__ */ Schema.Union([
  Schema.Record(Schema.String, JsonValue),
  Schema.Null,
]).annotate({ identifier: "MessageMetadata" });
export type EmailSender = { readonly email: string; readonly name?: string | null } | null;
export const EmailSender = /* @__PURE__ */ Schema.Union([
  Schema.Struct({
    email: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
    name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }),
  Schema.Null,
]).annotate({ identifier: "EmailSender" });
export type IanaTimezone = string;
export const IanaTimezone = /* @__PURE__ */ Schema.String.annotate({ identifier: "IanaTimezone" });
export type NamespaceMetadata = { readonly [x: string]: string };
export const NamespaceMetadata = /* @__PURE__ */ Schema.Record(
  Schema.String,
  Schema.String,
).annotate({
  description:
    "Your own labels for the namespace, such as the id of your customer it serves. Samva stores them and never reads them.",
  identifier: "NamespaceMetadata",
});
export type NamespaceResourceType = "domain" | "sender" | "contact" | "template";
export const NamespaceResourceType = /* @__PURE__ */ Schema.Union([
  Schema.Literal("domain"),
  Schema.Literal("sender"),
  Schema.Literal("contact"),
  Schema.Literal("template"),
]).annotate({ identifier: "NamespaceResourceType" });
export type OperationResource = { readonly type: string; readonly id: string };
export const OperationResource = /* @__PURE__ */ Schema.Struct({
  type: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(80).annotate({ expected: "a string with at most 80 code points" }),
    )
    .check(Schema.isMaxLength(80).annotate({ expected: "a value with a length of at most 80" })),
  id: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
    )
    .check(Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" })),
}).annotate({ identifier: "OperationResource" });
export type TemplateFromDefault = { readonly email: string; readonly name?: string | null };
export const TemplateFromDefault = /* @__PURE__ */ Schema.Struct({
  email: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  ),
  name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "TemplateFromDefault" });
export type TemplateTrackingDefault = {
  readonly opens?: boolean | null;
  readonly clicks?: boolean | null;
};
export const TemplateTrackingDefault = /* @__PURE__ */ Schema.Struct({
  opens: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  clicks: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
}).annotate({ identifier: "TemplateTrackingDefault" });
export class TemplateSourceError extends Schema.TaggedError<TemplateSourceError>()(
  "TemplateSourceError",
  Schema.Struct({
    message: Schema.String,
    diagnostics: Schema.Array(
      Schema.Struct({
        code: Schema.String,
        severity: Schema.Union([
          Schema.Literal("error"),
          Schema.Literal("warning"),
          Schema.Literal("info"),
        ]),
        message: Schema.String,
        origins: Schema.Array(
          Schema.Struct({
            fileName: Schema.String,
            lineNumber: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
            columnNumber: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(1).annotate({
                  expected: "a value greater than or equal to 1",
                }),
              )
              .check(
                Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                  expected: "a value less than or equal to 9007199254740991",
                }),
              ),
          }),
        ),
        clients: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
        notes: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        provenance: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        fixtures: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
        occurrences: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.Array(
                Schema.Struct({
                  fileName: Schema.String,
                  lineNumber: Schema.Finite.check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  )
                    .check(
                      Schema.isGreaterThanOrEqualTo(1).annotate({
                        expected: "a value greater than or equal to 1",
                      }),
                    )
                    .check(
                      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                        expected: "a value less than or equal to 9007199254740991",
                      }),
                    ),
                  columnNumber: Schema.Finite.check(
                    Schema.isInt().annotate({ expected: "an integer" }),
                  )
                    .check(
                      Schema.isGreaterThanOrEqualTo(1).annotate({
                        expected: "a value greater than or equal to 1",
                      }),
                    )
                    .check(
                      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
                        expected: "a value less than or equal to 9007199254740991",
                      }),
                    ),
                }),
              ),
            ),
            Schema.Null,
          ]),
        ),
        compatibility: Schema.optionalKey(
          Schema.Union([
            Schema.Struct({
              assessment: Schema.Union([
                Schema.Literal("risk"),
                Schema.Literal("degradation"),
                Schema.Literal("unverified"),
                Schema.Literal("not-applicable"),
              ]),
              title: Schema.String,
            }),
            Schema.Null,
          ]),
        ),
      }),
    ),
    revision: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }),
) {}
export type TopicContactByEmail = { readonly email: string };
export const TopicContactByEmail = /* @__PURE__ */ Schema.Struct({ email: Schema.String }).annotate(
  { identifier: "TopicContactByEmail" },
);
export type TopicContactByPhone = { readonly phone: string };
export const TopicContactByPhone = /* @__PURE__ */ Schema.Struct({ phone: Schema.String }).annotate(
  { identifier: "TopicContactByPhone" },
);
export type AddTemplateEntryPayload = {
  readonly entryPath: string;
  readonly name: string;
  readonly slug: string;
  readonly description?: string | null | null;
  readonly category?:
    | "transactional"
    | "marketing"
    | "support"
    | "notification"
    | "verification"
    | "reminder"
    | "alert"
    | null
    | null;
};
export const AddTemplateEntryPayload = /* @__PURE__ */ Schema.Struct({
  entryPath: Schema.String.check(
    Schema.isMaxCodePoints(1024).annotate({ expected: "a string with at most 1024 code points" }),
  )
    .check(
      Schema.isPattern(
        new RegExp(
          "^(?!\\/)(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?:templates|emails)\\/.+\\.tsx$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^(?!\\/)(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?:templates|emails)\\/.+\\.tsx$",
      }),
    )
    .check(
      Schema.isMaxLength(1024).annotate({ expected: "a value with a length of at most 1024" }),
    ),
  name: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(200).annotate({ expected: "a string with at most 200 code points" }),
    )
    .check(Schema.isMaxLength(200).annotate({ expected: "a value with a length of at most 200" })),
  slug: Schema.String.check(
    Schema.isPattern(new RegExp("^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
      expected: "a string matching the RegExp ^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$",
    }),
  ),
  description: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null]),
  ),
  category: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.Union([
          Schema.Literal("transactional"),
          Schema.Literal("marketing"),
          Schema.Literal("support"),
          Schema.Literal("notification"),
          Schema.Literal("verification"),
          Schema.Literal("reminder"),
          Schema.Literal("alert"),
        ]),
        Schema.Null,
      ]),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "AddTemplateEntryPayload" });
export type ContactTags = { readonly tags: readonly [string, ...Array<string>] };
export const ContactTags = /* @__PURE__ */ Schema.Struct({
  tags: Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]),
}).annotate({ identifier: "ContactTags" });
export type ConversationCategories = { readonly categories: readonly [string, ...Array<string>] };
export const ConversationCategories = /* @__PURE__ */ Schema.Struct({
  categories: Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]),
}).annotate({ identifier: "ConversationCategories" });
export type ConversationChannels = { readonly channels: readonly ["email", ...Array<"email">] };
export const ConversationChannels = /* @__PURE__ */ Schema.Struct({
  channels: Schema.TupleWithRest(Schema.Tuple([Schema.Literal("email")]), [
    Schema.Literal("email"),
  ]),
}).annotate({ identifier: "ConversationChannels" });
export type ConversationTags = { readonly tags: readonly [string, ...Array<string>] };
export const ConversationTags = /* @__PURE__ */ Schema.Struct({
  tags: Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]),
}).annotate({ identifier: "ConversationTags" });
export type CreateDomainWarmingPlanPayload = {
  readonly identity: "new" | "migrating" | "returning";
  readonly initialDailyRecipients: number;
  readonly dailyGrowthPercent: number;
  readonly targetDailyRecipients: number;
};
export const CreateDomainWarmingPlanPayload = /* @__PURE__ */ Schema.Struct({
  identity: Schema.Union([
    Schema.Literal("new"),
    Schema.Literal("migrating"),
    Schema.Literal("returning"),
  ]),
  initialDailyRecipients: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isLessThanOrEqualTo(1000000).annotate({
        expected: "a value less than or equal to 1000000",
      }),
    )
    .check(Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" })),
  dailyGrowthPercent: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    )
    .check(
      Schema.isLessThanOrEqualTo(10000).annotate({
        expected: "a value less than or equal to 10000",
      }),
    ),
  targetDailyRecipients: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isLessThanOrEqualTo(1000000).annotate({
        expected: "a value less than or equal to 1000000",
      }),
    )
    .check(Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" })),
}).annotate({ identifier: "CreateDomainWarmingPlanPayload" });
export type CreateMailboxLabelPayload = {
  readonly slug: string;
  readonly displayName: string;
  readonly color?:
    | "billing"
    | "domain"
    | "agent"
    | "routing"
    | "important"
    | "neutral"
    | null
    | null;
};
export const CreateMailboxLabelPayload = /* @__PURE__ */ Schema.Struct({
  slug: Schema.String,
  displayName: Schema.String,
  color: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.Union([
          Schema.Literal("billing"),
          Schema.Literal("domain"),
          Schema.Literal("agent"),
          Schema.Literal("routing"),
          Schema.Literal("important"),
          Schema.Literal("neutral"),
        ]),
        Schema.Null,
      ]),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "CreateMailboxLabelPayload" });
export type CreateMailboxNotePayload = {
  readonly body: string;
  readonly color?: string | null | null;
  readonly pinned?: boolean | null;
};
export const CreateMailboxNotePayload = /* @__PURE__ */ Schema.Struct({
  body: Schema.String,
  color: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null]),
  ),
  pinned: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
}).annotate({ identifier: "CreateMailboxNotePayload" });
export type CreateMediaPayload = {
  readonly filename: string;
  readonly contentType: string;
  readonly sizeBytes: number;
  readonly purpose: "attachment" | "avatar" | "review_evidence";
  readonly checksumSha256?: string | null;
};
export const CreateMediaPayload = /* @__PURE__ */ Schema.Struct({
  filename: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
    )
    .check(Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" })),
  contentType: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(127).annotate({ expected: "a string with at most 127 code points" }),
    )
    .check(Schema.isMaxLength(127).annotate({ expected: "a value with a length of at most 127" })),
  sizeBytes: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isLessThanOrEqualTo(26214400).annotate({
        expected: "a value less than or equal to 26214400",
      }),
    )
    .check(Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" })),
  purpose: Schema.Union([
    Schema.Literal("attachment"),
    Schema.Literal("avatar"),
    Schema.Literal("review_evidence"),
  ]),
  checksumSha256: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "CreateMediaPayload" });
export type DenyMailboxActionPayload = { readonly reason: string };
export const DenyMailboxActionPayload = /* @__PURE__ */ Schema.Struct({
  reason: Schema.String,
}).annotate({ identifier: "DenyMailboxActionPayload" });
export type DomainWarmingNotePayload = { readonly note?: string | null };
export const DomainWarmingNotePayload = /* @__PURE__ */ Schema.Struct({
  note: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(500).annotate({ expected: "a string with at most 500 code points" }),
      ).check(
        Schema.isMaxLength(500).annotate({ expected: "a value with a length of at most 500" }),
      ),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "DomainWarmingNotePayload" });
export type PublishAgentPayload = { readonly revision: string };
export const PublishAgentPayload = /* @__PURE__ */ Schema.Struct({
  revision: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  ),
}).annotate({ identifier: "PublishAgentPayload" });
export type PublishExtensionVersionPayload = {
  readonly manifest: {
    readonly name: string;
    readonly displayName: string;
    readonly description?: string | null;
    readonly version: string;
    readonly runtime: "hosted" | "webhook";
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
  };
  readonly bundle?: string | null;
};
export const PublishExtensionVersionPayload = /* @__PURE__ */ Schema.Struct({
  manifest: Schema.Struct({
    name: Schema.String.check(
      Schema.isPattern(new RegExp("^[a-z][a-z0-9-]{1,62}[a-z0-9]$", "u")).annotate({
        expected: "a string matching the RegExp ^[a-z][a-z0-9-]{1,62}[a-z0-9]$",
      }),
    ),
    displayName: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(80).annotate({ expected: "a string with at most 80 code points" }),
      )
      .check(Schema.isMaxLength(80).annotate({ expected: "a value with a length of at most 80" })),
    description: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(500).annotate({
            expected: "a string with at most 500 code points",
          }),
        ).check(
          Schema.isMaxLength(500).annotate({ expected: "a value with a length of at most 500" }),
        ),
        Schema.Null,
      ]),
    ),
    version: Schema.String.check(
      Schema.isPattern(
        new RegExp("^\\d{1,6}\\.\\d{1,6}\\.\\d{1,6}(?:-[0-9A-Za-z.-]{1,64})?$", "u"),
      ).annotate({
        expected:
          "a string matching the RegExp ^\\d{1,6}\\.\\d{1,6}\\.\\d{1,6}(?:-[0-9A-Za-z.-]{1,64})?$",
      }),
    ),
    runtime: Schema.Union([Schema.Literal("hosted"), Schema.Literal("webhook")]),
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
    ).check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" })),
    permissions: Schema.Array(
      Schema.Union([
        Schema.Literal("read"),
        Schema.Literal("update"),
        Schema.Literal("send"),
        Schema.Literal("quarantine.read"),
      ]),
    ),
  }),
  bundle: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "PublishExtensionVersionPayload" });
export type PublishJourneyPayload = { readonly revision: string };
export const PublishJourneyPayload = /* @__PURE__ */ Schema.Struct({
  revision: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  ),
}).annotate({ identifier: "PublishJourneyPayload" });
export type ReapplyOnboardingReviewInput = { readonly expectedGeneration: number };
export const ReapplyOnboardingReviewInput = /* @__PURE__ */ Schema.Struct({
  expectedGeneration: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
}).annotate({ identifier: "ReapplyOnboardingReviewInput" });
export type TemplateFamilyName = { readonly name: string };
export const TemplateFamilyName = /* @__PURE__ */ Schema.Struct({
  name: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  ),
}).annotate({ identifier: "TemplateFamilyName" });
export type TestWebhookPayload = { readonly data?: { readonly [x: string]: JsonValue } | null };
export const TestWebhookPayload = /* @__PURE__ */ Schema.Struct({
  data: Schema.optionalKey(Schema.Union([Schema.Record(Schema.String, JsonValue), Schema.Null])),
}).annotate({ identifier: "TestWebhookPayload" });
export type TopicFormCreatePayload = {
  readonly allowedOrigins: ReadonlyArray<string>;
  readonly confirmationTitle: string;
  readonly confirmationMessage: string;
  readonly successTitle: string;
  readonly successMessage: string;
  readonly redirectUrl: string | null;
};
export const TopicFormCreatePayload = /* @__PURE__ */ Schema.Struct({
  allowedOrigins: Schema.Array(
    Schema.String.check(
      Schema.isMaxCodePoints(2048).annotate({ expected: "a string with at most 2048 code points" }),
    )
      .check(
        Schema.isPattern(new RegExp("^https:\\/\\/", "u")).annotate({
          expected: "a string matching the RegExp ^https:\\/\\/",
        }),
      )
      .check(
        Schema.isMaxLength(2048).annotate({ expected: "a value with a length of at most 2048" }),
      ),
  ).check(Schema.isMaxLength(20).annotate({ expected: "a value with a length of at most 20" })),
  confirmationTitle: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(120).annotate({ expected: "a string with at most 120 code points" }),
    )
    .check(Schema.isMaxLength(120).annotate({ expected: "a value with a length of at most 120" })),
  confirmationMessage: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(2000).annotate({ expected: "a string with at most 2000 code points" }),
    )
    .check(
      Schema.isMaxLength(2000).annotate({ expected: "a value with a length of at most 2000" }),
    ),
  successTitle: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(120).annotate({ expected: "a string with at most 120 code points" }),
    )
    .check(Schema.isMaxLength(120).annotate({ expected: "a value with a length of at most 120" })),
  successMessage: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(2000).annotate({ expected: "a string with at most 2000 code points" }),
    )
    .check(
      Schema.isMaxLength(2000).annotate({ expected: "a value with a length of at most 2000" }),
    ),
  redirectUrl: Schema.Union([
    Schema.String.check(
      Schema.isMaxCodePoints(2048).annotate({ expected: "a string with at most 2048 code points" }),
    )
      .check(
        Schema.isPattern(new RegExp("^https:\\/\\/", "u")).annotate({
          expected: "a string matching the RegExp ^https:\\/\\/",
        }),
      )
      .check(
        Schema.isMaxLength(2048).annotate({ expected: "a value with a length of at most 2048" }),
      ),
    Schema.Null,
  ]),
}).annotate({ identifier: "TopicFormCreatePayload" });
export type TopicFormUpdatePayload = {
  readonly allowedOrigins?: ReadonlyArray<string> | null;
  readonly confirmationTitle?: string | null;
  readonly confirmationMessage?: string | null;
  readonly successTitle?: string | null;
  readonly successMessage?: string | null;
  readonly redirectUrl?: string | null | null;
};
export const TopicFormUpdatePayload = /* @__PURE__ */ Schema.Struct({
  allowedOrigins: Schema.optionalKey(
    Schema.Union([
      Schema.Array(
        Schema.String.check(
          Schema.isMaxCodePoints(2048).annotate({
            expected: "a string with at most 2048 code points",
          }),
        )
          .check(
            Schema.isPattern(new RegExp("^https:\\/\\/", "u")).annotate({
              expected: "a string matching the RegExp ^https:\\/\\/",
            }),
          )
          .check(
            Schema.isMaxLength(2048).annotate({
              expected: "a value with a length of at most 2048",
            }),
          ),
      ).check(Schema.isMaxLength(20).annotate({ expected: "a value with a length of at most 20" })),
      Schema.Null,
    ]),
  ),
  confirmationTitle: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(120).annotate({
            expected: "a string with at most 120 code points",
          }),
        )
        .check(
          Schema.isMaxLength(120).annotate({ expected: "a value with a length of at most 120" }),
        ),
      Schema.Null,
    ]),
  ),
  confirmationMessage: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(2000).annotate({
            expected: "a string with at most 2000 code points",
          }),
        )
        .check(
          Schema.isMaxLength(2000).annotate({ expected: "a value with a length of at most 2000" }),
        ),
      Schema.Null,
    ]),
  ),
  successTitle: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(120).annotate({
            expected: "a string with at most 120 code points",
          }),
        )
        .check(
          Schema.isMaxLength(120).annotate({ expected: "a value with a length of at most 120" }),
        ),
      Schema.Null,
    ]),
  ),
  successMessage: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(2000).annotate({
            expected: "a string with at most 2000 code points",
          }),
        )
        .check(
          Schema.isMaxLength(2000).annotate({ expected: "a value with a length of at most 2000" }),
        ),
      Schema.Null,
    ]),
  ),
  redirectUrl: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(2048).annotate({
            expected: "a string with at most 2048 code points",
          }),
        )
          .check(
            Schema.isPattern(new RegExp("^https:\\/\\/", "u")).annotate({
              expected: "a string matching the RegExp ^https:\\/\\/",
            }),
          )
          .check(
            Schema.isMaxLength(2048).annotate({
              expected: "a value with a length of at most 2048",
            }),
          ),
        Schema.Null,
      ]),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "TopicFormUpdatePayload" });
export type UpdateDomainWarmingPolicyPayload = {
  readonly dailyGrowthPercent: number;
  readonly targetDailyRecipients: number;
  readonly note?: string | null;
};
export const UpdateDomainWarmingPolicyPayload = /* @__PURE__ */ Schema.Struct({
  dailyGrowthPercent: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    )
    .check(
      Schema.isLessThanOrEqualTo(10000).annotate({
        expected: "a value less than or equal to 10000",
      }),
    ),
  targetDailyRecipients: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isLessThanOrEqualTo(1000000).annotate({
        expected: "a value less than or equal to 1000000",
      }),
    )
    .check(Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" })),
  note: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(500).annotate({ expected: "a string with at most 500 code points" }),
      ).check(
        Schema.isMaxLength(500).annotate({ expected: "a value with a length of at most 500" }),
      ),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "UpdateDomainWarmingPolicyPayload" });
export type UpdateMailboxEndpointPayload = {
  readonly displayName?: string | null | null;
  readonly default?: true | null;
};
export const UpdateMailboxEndpointPayload = /* @__PURE__ */ Schema.Struct({
  displayName: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null]),
  ),
  default: Schema.optionalKey(Schema.Union([Schema.Literal(true), Schema.Null])),
}).annotate({ identifier: "UpdateMailboxEndpointPayload" });
export type UpdateMailboxLabelPayload = {
  readonly displayName?: string | null;
  readonly color?:
    | "billing"
    | "domain"
    | "agent"
    | "routing"
    | "important"
    | "neutral"
    | null
    | null;
};
export const UpdateMailboxLabelPayload = /* @__PURE__ */ Schema.Struct({
  displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  color: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.Union([
          Schema.Literal("billing"),
          Schema.Literal("domain"),
          Schema.Literal("agent"),
          Schema.Literal("routing"),
          Schema.Literal("important"),
          Schema.Literal("neutral"),
        ]),
        Schema.Null,
      ]),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "UpdateMailboxLabelPayload" });
export type UpdateMailboxNotePayload = {
  readonly body?: string | null;
  readonly color?: string | null | null;
  readonly pinned?: boolean | null;
};
export const UpdateMailboxNotePayload = /* @__PURE__ */ Schema.Struct({
  body: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  color: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null]),
  ),
  pinned: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
}).annotate({ identifier: "UpdateMailboxNotePayload" });
export type UpdateNamespacePayload = {
  readonly name?: string | null;
  readonly metadata?: { readonly [x: string]: string | null } | null;
};
export const UpdateNamespacePayload = /* @__PURE__ */ Schema.Struct({
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(new RegExp("^\\S[\\s\\S]*\\S$|^\\S$|^$", "u")).annotate({
            expected: "a string matching the RegExp ^\\S[\\s\\S]*\\S$|^\\S$|^$",
          }),
        )
        .check(
          Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" }),
        ),
      Schema.Null,
    ]),
  ),
  metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Union([Schema.String, Schema.Null])),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "UpdateNamespacePayload" });
export type CreateTemplateFromWebsitePayload = {
  readonly url: string;
  readonly name?: string | null;
  readonly namespaceId?: NamespaceId | null;
  readonly idempotencyKey: string;
};
export const CreateTemplateFromWebsitePayload = /* @__PURE__ */ Schema.Struct({
  url: Schema.String.annotate({
    description:
      "The website whose look the template should match: a public https address, or a bare domain such as `example.com`.",
  })
    .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
    .check(
      Schema.isMaxCodePoints(2048).annotate({ expected: "a string with at most 2048 code points" }),
    )
    .check(
      Schema.isMaxLength(2048).annotate({ expected: "a value with a length of at most 2048" }),
    ),
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(200).annotate({
            expected: "a string with at most 200 code points",
          }),
        )
        .check(
          Schema.isMaxLength(200).annotate({ expected: "a value with a length of at most 200" }),
        ),
      Schema.Null,
    ]),
  ),
  namespaceId: Schema.optionalKey(
    Schema.Union([NamespaceId, Schema.Null]).annotate({
      description:
        "The namespace the new template project belongs to. Omit for organization level. A namespace-scoped key always creates in its own namespace.",
    }),
  ),
  idempotencyKey: Schema.String.annotate({
    description:
      "Repeating a request with the same key, address, name, and namespace returns the project the first one created, even if the site has since stopped answering. The same key with another address, name, or namespace is refused with a 409.",
  })
    .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
    .check(
      Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
    )
    .check(Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" })),
}).annotate({ identifier: "CreateTemplateFromWebsitePayload" });
export type CreateTemplatePayload = {
  readonly name: string;
  readonly projectName?: string | null;
  readonly slug?: string | null;
  readonly galleryTemplateId?: string | null;
  readonly useBrand?: boolean | null;
  readonly description?: string | null | null;
  readonly category?:
    | "transactional"
    | "marketing"
    | "support"
    | "notification"
    | "verification"
    | "reminder"
    | "alert"
    | null
    | null;
  readonly isActive?: boolean | null;
  readonly namespaceId?: NamespaceId | null;
  readonly shared?: boolean | null;
  readonly idempotencyKey: string;
};
export const CreateTemplatePayload = /* @__PURE__ */ Schema.Struct({
  name: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(200).annotate({ expected: "a string with at most 200 code points" }),
    )
    .check(Schema.isMaxLength(200).annotate({ expected: "a value with a length of at most 200" })),
  projectName: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(200).annotate({
            expected: "a string with at most 200 code points",
          }),
        )
        .check(
          Schema.isMaxLength(200).annotate({ expected: "a value with a length of at most 200" }),
        ),
      Schema.Null,
    ]),
  ),
  slug: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isPattern(new RegExp("^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
          expected: "a string matching the RegExp ^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$",
        }),
      ),
      Schema.Null,
    ]),
  ),
  galleryTemplateId: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" }),
        ),
      Schema.Null,
    ]),
  ),
  useBrand: Schema.optionalKey(
    Schema.Union([
      Schema.Boolean.annotate({
        description:
          "With `galleryTemplateId`: whether the new project's `theme.css` imports the organization's default brand (`@import \"samva:brand\";`) over the starter's look. Defaults to false.",
      }),
      Schema.Null,
    ]),
  ),
  description: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null]),
  ),
  category: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.Union([
          Schema.Literal("transactional"),
          Schema.Literal("marketing"),
          Schema.Literal("support"),
          Schema.Literal("notification"),
          Schema.Literal("verification"),
          Schema.Literal("reminder"),
          Schema.Literal("alert"),
        ]),
        Schema.Null,
      ]),
      Schema.Null,
    ]),
  ),
  isActive: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  namespaceId: Schema.optionalKey(
    Schema.Union([NamespaceId, Schema.Null]).annotate({
      description:
        "The namespace the new template project belongs to; the project and every entry added to it share it. Omit for organization level. A namespace-scoped key always creates in its own namespace.",
    }),
  ),
  shared: Schema.optionalKey(
    Schema.Union([Schema.Boolean, Schema.Null]).annotate({
      description:
        "Share the new organization-level project with every namespace: namespace-scoped keys read and send its entries but cannot change them. Defaults to false. Not with `namespaceId`, and not from a namespace-scoped key.",
    }),
  ),
  idempotencyKey: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
    )
    .check(Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" })),
}).annotate({ identifier: "CreateTemplatePayload" });
export type UpdateAgentPayload = { readonly name: AgentName };
export const UpdateAgentPayload = /* @__PURE__ */ Schema.Struct({ name: AgentName }).annotate({
  identifier: "UpdateAgentPayload",
});
export type WorkingHoursRange = {
  readonly day: Weekday;
  readonly opens: ClockTime;
  readonly closes: ClockTime;
};
export const WorkingHoursRange = /* @__PURE__ */ Schema.Struct({
  day: Weekday,
  opens: ClockTime,
  closes: ClockTime,
}).annotate({ identifier: "WorkingHoursRange" });
export type CampaignReplyMailbox = MailboxId | null | null;
export const CampaignReplyMailbox = /* @__PURE__ */ Schema.Union([
  Schema.Union([MailboxId, Schema.Null]),
  Schema.Null,
]).annotate({
  description:
    "Omit to inherit the topic mailbox; null disables mailbox inheritance. An explicit email.replyTo overrides an inherited mailbox.",
  identifier: "CampaignReplyMailbox",
});
export type CreateWebhookPayload = {
  readonly name: string;
  readonly url: string;
  readonly eventTypes: ReadonlyArray<
    | "message.sent"
    | "message.delivered"
    | "message.read"
    | "message.failed"
    | "message.bounced"
    | "message.complained"
    | "message.received"
    | "message.opened"
    | "message.clicked"
    | "contact.created"
    | "contact.updated"
    | "contact.deleted"
    | "contact.subscribed"
    | "contact.unsubscribed"
    | "contact.resubscribed"
    | "contact.consent_changed"
    | "conversation.created"
    | "conversation.updated"
    | "conversation.archived"
    | "webhook.created"
    | "webhook.updated"
    | "webhook.deleted"
    | "webhook.test"
    | "domain.updated"
    | "domain.warming.updated"
    | "template.registration.updated"
    | "flow.registration.updated"
    | "whatsapp.number.connected"
    | "mailbox.message.received"
    | "mailbox.message.sent"
    | "mailbox.action.pending_approval"
    | "mailbox.action.resolved"
    | "mailbox.message.quarantined"
    | "mailbox.message.released"
    | "mailbox.message.discarded"
    | "mailbox.message.delivered"
    | "mailbox.message.read"
    | "mailbox.message.failed"
    | "journey.webhook"
  >;
  readonly channels?: ReadonlyArray<"email"> | null;
  readonly mailboxIds?: readonly [MailboxId, ...Array<MailboxId>] | null;
  readonly namespaceId?: NamespaceId | null;
  readonly headers?: { readonly [x: string]: string } | null;
  readonly status?: "active" | "disabled" | null;
};
export const CreateWebhookPayload = /* @__PURE__ */ Schema.Struct({
  name: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(100).annotate({ expected: "a string with at most 100 code points" }),
    )
    .check(Schema.isMaxLength(100).annotate({ expected: "a value with a length of at most 100" })),
  url: Schema.String,
  eventTypes: Schema.Array(
    Schema.Union([
      Schema.Literal("message.sent"),
      Schema.Literal("message.delivered"),
      Schema.Literal("message.read"),
      Schema.Literal("message.failed"),
      Schema.Literal("message.bounced"),
      Schema.Literal("message.complained"),
      Schema.Literal("message.received"),
      Schema.Literal("message.opened"),
      Schema.Literal("message.clicked"),
      Schema.Literal("contact.created"),
      Schema.Literal("contact.updated"),
      Schema.Literal("contact.deleted"),
      Schema.Literal("contact.subscribed"),
      Schema.Literal("contact.unsubscribed"),
      Schema.Literal("contact.resubscribed"),
      Schema.Literal("contact.consent_changed"),
      Schema.Literal("conversation.created"),
      Schema.Literal("conversation.updated"),
      Schema.Literal("conversation.archived"),
      Schema.Literal("webhook.created"),
      Schema.Literal("webhook.updated"),
      Schema.Literal("webhook.deleted"),
      Schema.Literal("webhook.test"),
      Schema.Literal("domain.updated"),
      Schema.Literal("domain.warming.updated"),
      Schema.Literal("template.registration.updated"),
      Schema.Literal("flow.registration.updated"),
      Schema.Literal("whatsapp.number.connected"),
      Schema.Literal("mailbox.message.received"),
      Schema.Literal("mailbox.message.sent"),
      Schema.Literal("mailbox.action.pending_approval"),
      Schema.Literal("mailbox.action.resolved"),
      Schema.Literal("mailbox.message.quarantined"),
      Schema.Literal("mailbox.message.released"),
      Schema.Literal("mailbox.message.discarded"),
      Schema.Literal("mailbox.message.delivered"),
      Schema.Literal("mailbox.message.read"),
      Schema.Literal("mailbox.message.failed"),
      Schema.Literal("journey.webhook"),
    ]),
  ).check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" })),
  channels: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.Literal("email")).check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      ),
      Schema.Null,
    ]),
  ),
  mailboxIds: Schema.optionalKey(
    Schema.Union([Schema.TupleWithRest(Schema.Tuple([MailboxId]), [MailboxId]), Schema.Null]),
  ),
  namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
  headers: Schema.optionalKey(
    Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
  ),
  status: Schema.optionalKey(
    Schema.Union([
      Schema.Union([Schema.Literal("active"), Schema.Literal("disabled")]),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "CreateWebhookPayload" });
export type InstallExtensionPayload = {
  readonly extension: string;
  readonly version?: string | null;
  readonly mailboxIds?: ReadonlyArray<MailboxId> | null;
  readonly namespaceId?: NamespaceId | null;
  readonly permissions?: ReadonlyArray<"read" | "update" | "send" | "quarantine.read"> | null;
  readonly sendMode?: "send" | "approval" | null;
  readonly webhookUrl?: string | null;
};
export const InstallExtensionPayload = /* @__PURE__ */ Schema.Struct({
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
}).annotate({ identifier: "InstallExtensionPayload" });
export type UpdateWebhookPayload = {
  readonly name?: string | null;
  readonly url?: string | null;
  readonly eventTypes?: ReadonlyArray<
    | "message.sent"
    | "message.delivered"
    | "message.read"
    | "message.failed"
    | "message.bounced"
    | "message.complained"
    | "message.received"
    | "message.opened"
    | "message.clicked"
    | "contact.created"
    | "contact.updated"
    | "contact.deleted"
    | "contact.subscribed"
    | "contact.unsubscribed"
    | "contact.resubscribed"
    | "contact.consent_changed"
    | "conversation.created"
    | "conversation.updated"
    | "conversation.archived"
    | "webhook.created"
    | "webhook.updated"
    | "webhook.deleted"
    | "webhook.test"
    | "domain.updated"
    | "domain.warming.updated"
    | "template.registration.updated"
    | "flow.registration.updated"
    | "whatsapp.number.connected"
    | "mailbox.message.received"
    | "mailbox.message.sent"
    | "mailbox.action.pending_approval"
    | "mailbox.action.resolved"
    | "mailbox.message.quarantined"
    | "mailbox.message.released"
    | "mailbox.message.discarded"
    | "mailbox.message.delivered"
    | "mailbox.message.read"
    | "mailbox.message.failed"
    | "journey.webhook"
  > | null;
  readonly channels?: ReadonlyArray<"email"> | null | null;
  readonly mailboxIds?: readonly [MailboxId, ...Array<MailboxId>] | null | null;
  readonly namespaceId?: NamespaceId | null | null;
  readonly headers?: { readonly [x: string]: string } | null;
  readonly status?: "active" | "disabled" | null;
};
export const UpdateWebhookPayload = /* @__PURE__ */ Schema.Struct({
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(100).annotate({
            expected: "a string with at most 100 code points",
          }),
        )
        .check(
          Schema.isMaxLength(100).annotate({ expected: "a value with a length of at most 100" }),
        ),
      Schema.Null,
    ]),
  ),
  url: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  eventTypes: Schema.optionalKey(
    Schema.Union([
      Schema.Array(
        Schema.Union([
          Schema.Literal("message.sent"),
          Schema.Literal("message.delivered"),
          Schema.Literal("message.read"),
          Schema.Literal("message.failed"),
          Schema.Literal("message.bounced"),
          Schema.Literal("message.complained"),
          Schema.Literal("message.received"),
          Schema.Literal("message.opened"),
          Schema.Literal("message.clicked"),
          Schema.Literal("contact.created"),
          Schema.Literal("contact.updated"),
          Schema.Literal("contact.deleted"),
          Schema.Literal("contact.subscribed"),
          Schema.Literal("contact.unsubscribed"),
          Schema.Literal("contact.resubscribed"),
          Schema.Literal("contact.consent_changed"),
          Schema.Literal("conversation.created"),
          Schema.Literal("conversation.updated"),
          Schema.Literal("conversation.archived"),
          Schema.Literal("webhook.created"),
          Schema.Literal("webhook.updated"),
          Schema.Literal("webhook.deleted"),
          Schema.Literal("webhook.test"),
          Schema.Literal("domain.updated"),
          Schema.Literal("domain.warming.updated"),
          Schema.Literal("template.registration.updated"),
          Schema.Literal("flow.registration.updated"),
          Schema.Literal("whatsapp.number.connected"),
          Schema.Literal("mailbox.message.received"),
          Schema.Literal("mailbox.message.sent"),
          Schema.Literal("mailbox.action.pending_approval"),
          Schema.Literal("mailbox.action.resolved"),
          Schema.Literal("mailbox.message.quarantined"),
          Schema.Literal("mailbox.message.released"),
          Schema.Literal("mailbox.message.discarded"),
          Schema.Literal("mailbox.message.delivered"),
          Schema.Literal("mailbox.message.read"),
          Schema.Literal("mailbox.message.failed"),
          Schema.Literal("journey.webhook"),
        ]),
      ).check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" })),
      Schema.Null,
    ]),
  ),
  channels: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.Array(Schema.Literal("email")).check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        ),
        Schema.Null,
      ]),
      Schema.Null,
    ]),
  ),
  mailboxIds: Schema.optionalKey(
    Schema.Union([
      Schema.Union([Schema.TupleWithRest(Schema.Tuple([MailboxId]), [MailboxId]), Schema.Null]),
      Schema.Null,
    ]),
  ),
  namespaceId: Schema.optionalKey(
    Schema.Union([Schema.Union([NamespaceId, Schema.Null]), Schema.Null]),
  ),
  headers: Schema.optionalKey(
    Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
  ),
  status: Schema.optionalKey(
    Schema.Union([
      Schema.Union([Schema.Literal("active"), Schema.Literal("disabled")]),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "UpdateWebhookPayload" });
export type ApiKeyMailboxAccess = {
  readonly permissions: readonly [
    "read" | "update" | "send" | "quarantine.read",
    ...Array<"read" | "update" | "send" | "quarantine.read">,
  ];
  readonly mailboxIds?: readonly [MailboxId, ...Array<MailboxId>] | null;
  readonly sendMode?: MailboxSendMode | null;
};
export const ApiKeyMailboxAccess = /* @__PURE__ */ Schema.Struct({
  permissions: Schema.TupleWithRest(
    Schema.Tuple([
      Schema.Union([
        Schema.Literal("read"),
        Schema.Literal("update"),
        Schema.Literal("send"),
        Schema.Literal("quarantine.read"),
      ]),
    ]),
    [
      Schema.Union([
        Schema.Literal("read"),
        Schema.Literal("update"),
        Schema.Literal("send"),
        Schema.Literal("quarantine.read"),
      ]),
    ],
  ).annotate({
    description:
      "`read` reads mailboxes, threads, and messages; `update` changes thread state, labels, drafts, and notes; `send` sends and replies; `quarantine.read` reads quarantined mail.",
  }),
  mailboxIds: Schema.optionalKey(
    Schema.Union([
      Schema.TupleWithRest(Schema.Tuple([MailboxId]), [MailboxId]),
      Schema.Null,
    ]).annotate({
      description: "The mailboxes the key may act on. Omit to reach every mailbox the owner can.",
    }),
  ),
  sendMode: Schema.optionalKey(
    Schema.Union([MailboxSendMode, Schema.Null]).annotate({
      description:
        "Defaults to `send`. With `approval`, each send waits until a person other than the key approves it.",
    }),
  ),
}).annotate({ identifier: "ApiKeyMailboxAccess" });
export type BrandFooter = {
  readonly companyName?: string | null;
  readonly websiteUrl?: string | null;
  readonly address?: BrandAddress | null;
  readonly socialLinks?: ReadonlyArray<BrandSocialLink> | null;
};
export const BrandFooter = /* @__PURE__ */ Schema.Struct({
  companyName: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
      ).check(
        Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
      ),
      Schema.Null,
    ]),
  ),
  websiteUrl: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(2048).annotate({
          expected: "a string with at most 2048 code points",
        }),
      )
        .check(
          Schema.isPattern(new RegExp("^https:\\/\\/[^\\s]+$", "u")).annotate({
            expected: "a string matching the RegExp ^https:\\/\\/[^\\s]+$",
          }),
        )
        .check(
          Schema.isMaxLength(2048).annotate({ expected: "a value with a length of at most 2048" }),
        ),
      Schema.Null,
    ]),
  ),
  address: Schema.optionalKey(Schema.Union([BrandAddress, Schema.Null])),
  socialLinks: Schema.optionalKey(
    Schema.Union([
      Schema.Array(BrandSocialLink).check(
        Schema.isMaxLength(12).annotate({ expected: "a value with a length of at most 12" }),
      ),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "BrandFooter" });
export type EmailAttachment = {
  readonly filename: string;
  readonly content?: string | null;
  readonly mediaId?: MediaId | null;
  readonly contentType: string;
  readonly size: number;
};
export const EmailAttachment = /* @__PURE__ */ Schema.Struct({
  filename: Schema.String,
  content: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  mediaId: Schema.optionalKey(Schema.Union([MediaId, Schema.Null])),
  contentType: Schema.String,
  size: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isLessThanOrEqualTo(26214400).annotate({
        expected: "a value less than or equal to 26214400",
      }),
    )
    .check(Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" })),
}).annotate({ identifier: "EmailAttachment" });
export type RespondToOnboardingInformationRequestInput = {
  readonly expectedGeneration: number;
  readonly responseText: string;
  readonly evidenceMediaIds: ReadonlyArray<MediaId>;
};
export const RespondToOnboardingInformationRequestInput = /* @__PURE__ */ Schema.Struct({
  expectedGeneration: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isLessThanOrEqualTo(9007199254740991).annotate({
        expected: "a value less than or equal to 9007199254740991",
      }),
    )
    .check(Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" })),
  responseText: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(4000).annotate({ expected: "a string with at most 4000 code points" }),
    )
    .check(
      Schema.isMaxLength(4000).annotate({ expected: "a value with a length of at most 4000" }),
    ),
  evidenceMediaIds: Schema.Array(MediaId).check(
    Schema.isMaxLength(3).annotate({ expected: "a value with a length of at most 3" }),
  ),
}).annotate({ identifier: "RespondToOnboardingInformationRequestInput" });
export type TemplateData = JsonObject | null;
export const TemplateData = /* @__PURE__ */ Schema.Union([JsonObject, Schema.Null]).annotate({
  identifier: "TemplateData",
});
export type ContactConsent = {
  readonly status: "opted_in" | "opted_out";
  readonly source: string;
  readonly capturedAt: string;
  readonly proof: JsonObject | null;
};
export const ContactConsent = /* @__PURE__ */ Schema.Struct({
  status: Schema.Union([Schema.Literal("opted_in"), Schema.Literal("opted_out")]),
  source: Schema.String,
  capturedAt: Schema.String,
  proof: Schema.Union([JsonObject, Schema.Null]),
}).annotate({ identifier: "ContactConsent" });
export type JourneyWebhookConfig = { readonly data?: JsonObject };
export const JourneyWebhookConfig = /* @__PURE__ */ Schema.Struct({
  data: Schema.optionalKey(JsonObject),
}).annotate({ identifier: "JourneyWebhookConfig" });
export type SetContactConsent = {
  readonly status: "opted_in" | "opted_out";
  readonly source: string;
  readonly capturedAt: string;
  readonly proof?: JsonObject | null;
};
export const SetContactConsent = /* @__PURE__ */ Schema.Struct({
  status: Schema.Union([Schema.Literal("opted_in"), Schema.Literal("opted_out")]),
  source: Schema.String.annotate({
    description: "Where the consent was captured, such as a form URL or a checkout step.",
  })
    .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
    .check(
      Schema.isMaxCodePoints(200).annotate({ expected: "a string with at most 200 code points" }),
    )
    .check(Schema.isMaxLength(200).annotate({ expected: "a value with a length of at most 200" })),
  capturedAt: Schema.String,
  proof: Schema.optionalKey(Schema.Union([JsonObject, Schema.Null])),
}).annotate({ identifier: "SetContactConsent" });
export type RenderTemplatePublicationPayload = {
  readonly data: { readonly [x: string]: JsonValue };
  readonly locale?: RenderLocale;
  readonly timeZone?: RenderTimeZone;
};
export const RenderTemplatePublicationPayload = /* @__PURE__ */ Schema.Struct({
  data: Schema.Record(Schema.String, JsonValue).annotate({
    description: "The input to render with, validated against the publication's input schema.",
  }),
  locale: Schema.optionalKey(RenderLocale),
  timeZone: Schema.optionalKey(RenderTimeZone),
}).annotate({ identifier: "RenderTemplatePublicationPayload" });
export type SkippedRecipient = {
  readonly address: string;
  readonly reason: "bounce" | "complaint" | "unsubscribe" | "manual" | "topic-unsubscribe";
  readonly topicId?: TopicId | null;
};
export const SkippedRecipient = /* @__PURE__ */ Schema.Struct({
  address: Schema.String,
  reason: Schema.Union([
    Schema.Literal("bounce"),
    Schema.Literal("complaint"),
    Schema.Literal("unsubscribe"),
    Schema.Literal("manual"),
    Schema.Literal("topic-unsubscribe"),
  ]),
  topicId: Schema.optionalKey(Schema.Union([TopicId, Schema.Null])),
}).annotate({ identifier: "SkippedRecipient" });
export type SubscribePayload = {
  readonly email: string;
  readonly topicId: TopicId;
  readonly from: { readonly email: string; readonly name?: string | null };
  readonly templateSlug?: string | null;
  readonly consentIp?: string | null;
  readonly consentSource?: string | null;
};
export const SubscribePayload = /* @__PURE__ */ Schema.Struct({
  email: Schema.String.annotate({
    description: "The recipient email address; confirmation proves consent for this address.",
  })
    .check(
      Schema.isMaxCodePoints(320).annotate({ expected: "a string with at most 320 code points" }),
    )
    .check(
      Schema.isPattern(new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", "u")).annotate({
        expected: "a string matching the RegExp ^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
      }),
    )
    .check(Schema.isMaxLength(320).annotate({ expected: "a value with a length of at most 320" })),
  topicId: TopicId,
  from: Schema.Struct({
    email: Schema.String,
    name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }).annotate({
    description:
      "Your verified email sender. The ordinary send pipeline selects its domain and customer brand.",
  }),
  templateSlug: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "A published email template slug receiving confirmUrl. Omit it to send the default confirmation email.",
      }).check(
        Schema.isPattern(new RegExp("^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
          expected: "a string matching the RegExp ^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$",
        }),
      ),
      Schema.Null,
    ]),
  ),
  consentIp: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "The recipient IP recorded by your server when they requested subscription.",
      })
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" }),
        ),
      Schema.Null,
    ]),
  ),
  consentSource: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "The signup page or source recorded by your server when consent was requested.",
      })
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isMaxLength(512).annotate({ expected: "a value with a length of at most 512" }),
        ),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "SubscribePayload" });
export type CampaignConversationRef = ConversationId | null | null;
export const CampaignConversationRef = /* @__PURE__ */ Schema.Union([
  Schema.Union([ConversationId, Schema.Null]),
  Schema.Null,
]).annotate({ identifier: "CampaignConversationRef" });
export type ContactEvent = {
  readonly id: string;
  readonly contactId: ContactId;
  readonly name: string;
  readonly source: "api" | "samva";
  readonly properties: JsonObject;
  readonly occurredAt: string;
  readonly recordedAt: string;
};
export const ContactEvent = /* @__PURE__ */ Schema.Struct({
  id: Schema.String,
  contactId: ContactId,
  name: Schema.String,
  source: Schema.Union([Schema.Literal("api"), Schema.Literal("samva")]),
  properties: JsonObject,
  occurredAt: Schema.String,
  recordedAt: Schema.String,
}).annotate({ identifier: "ContactEvent" });
export type ContactEventReference =
  | { readonly id: ContactId; readonly externalId?: never; readonly email?: never }
  | { readonly externalId: string; readonly id?: never; readonly email?: never }
  | { readonly email: string; readonly id?: never; readonly externalId?: never };
export const ContactEventReference = /* @__PURE__ */ Schema.Union([
  Schema.Struct({
    id: ContactId,
    externalId: Schema.optionalKey(Schema.Never),
    email: Schema.optionalKey(Schema.Never),
  }),
  Schema.Struct({
    externalId: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
    id: Schema.optionalKey(Schema.Never),
    email: Schema.optionalKey(Schema.Never),
  }),
  Schema.Struct({
    email: Schema.String.check(
      Schema.isPattern(new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", "u")).annotate({
        expected: "a string matching the RegExp ^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
      }),
    ),
    id: Schema.optionalKey(Schema.Never),
    externalId: Schema.optionalKey(Schema.Never),
  }),
]).annotate({ identifier: "ContactEventReference" });
export type EmailRecipient =
  | { readonly contactId: ContactId }
  | {
      readonly email: string;
      readonly name?: string | null;
      readonly displayName?: string | null | null;
    };
export const EmailRecipient = /* @__PURE__ */ Schema.Union([
  Schema.Struct({ contactId: ContactId }),
  Schema.Struct({
    email: Schema.String,
    name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    displayName: Schema.optionalKey(
      Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null]),
    ),
  }),
]).annotate({ identifier: "EmailRecipient" });
export type TopicContactById = { readonly contactId: ContactId };
export const TopicContactById = /* @__PURE__ */ Schema.Struct({ contactId: ContactId }).annotate({
  identifier: "TopicContactById",
});
export type ConversationContacts = {
  readonly contactIds: readonly [ContactId, ...Array<ContactId>];
};
export const ConversationContacts = /* @__PURE__ */ Schema.Struct({
  contactIds: Schema.TupleWithRest(Schema.Tuple([ContactId]), [ContactId]).check(
    Schema.isMaxLength(1000).annotate({ expected: "a value with a length of at most 1000" }),
  ),
}).annotate({ identifier: "ConversationContacts" });
export type CampaignAudience = {
  readonly topicId: TopicId;
  readonly includeTags?: ReadonlyArray<string> | null;
  readonly excludeTags?: ReadonlyArray<string> | null;
  readonly contactIds?: ReadonlyArray<ContactId> | null;
  readonly groupIds?: ReadonlyArray<ContactGroupId> | null;
};
export const CampaignAudience = /* @__PURE__ */ Schema.Struct({
  topicId: TopicId,
  includeTags: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  excludeTags: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  contactIds: Schema.optionalKey(
    Schema.Union([
      Schema.Array(ContactId).check(
        Schema.isMaxLength(25000).annotate({ expected: "a value with a length of at most 25000" }),
      ),
      Schema.Null,
    ]),
  ),
  groupIds: Schema.optionalKey(
    Schema.Union([
      Schema.Array(ContactGroupId).check(
        Schema.isMaxLength(100).annotate({ expected: "a value with a length of at most 100" }),
      ),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "CampaignAudience" });
export type JourneyGroupJoinedTrigger = {
  readonly type: "contact.joined_group";
  readonly groupId: ContactGroupId;
};
export const JourneyGroupJoinedTrigger = /* @__PURE__ */ Schema.Struct({
  type: Schema.Literal("contact.joined_group"),
  groupId: ContactGroupId,
}).annotate({ identifier: "JourneyGroupJoinedTrigger" });
export type MessageSummary = {
  readonly id: MessageId;
  readonly campaign?: { readonly campaignId: CampaignId; readonly runId: CampaignRunId } | null;
  readonly channel: "email";
  readonly direction: "outbound" | "inbound";
  readonly status:
    | "pending"
    | "scheduled"
    | "queued"
    | "processing"
    | "sent"
    | "delivered"
    | "read"
    | "failed"
    | "bounced"
    | "complained";
  readonly from: string | null;
  readonly to: ReadonlyArray<string>;
  readonly subject: string | null;
  readonly waitReason:
    | "rate"
    | "daily-quota"
    | "domain-health"
    | "sending-paused"
    | "upstream-unavailable"
    | "retry"
    | "campaign-paused"
    | "domain-warming"
    | "onboarding-review"
    | "content-review"
    | "screening-unavailable"
    | null;
  readonly createdAt: string;
};
export const MessageSummary = /* @__PURE__ */ Schema.Struct({
  id: MessageId,
  campaign: Schema.optionalKey(
    Schema.Union([Schema.Struct({ campaignId: CampaignId, runId: CampaignRunId }), Schema.Null]),
  ),
  channel: Schema.Literal("email"),
  direction: Schema.Union([Schema.Literal("outbound"), Schema.Literal("inbound")]),
  status: Schema.Union([
    Schema.Literal("pending"),
    Schema.Literal("scheduled"),
    Schema.Literal("queued"),
    Schema.Literal("processing"),
    Schema.Literal("sent"),
    Schema.Literal("delivered"),
    Schema.Literal("read"),
    Schema.Literal("failed"),
    Schema.Literal("bounced"),
    Schema.Literal("complained"),
  ]),
  from: Schema.Union([Schema.String, Schema.Null]),
  to: Schema.Array(Schema.String),
  subject: Schema.Union([Schema.String, Schema.Null]),
  waitReason: Schema.Union([
    Schema.Union([
      Schema.Literal("rate"),
      Schema.Literal("daily-quota"),
      Schema.Literal("domain-health"),
      Schema.Literal("sending-paused"),
      Schema.Literal("upstream-unavailable"),
      Schema.Literal("retry"),
      Schema.Literal("campaign-paused"),
      Schema.Literal("domain-warming"),
      Schema.Literal("onboarding-review"),
      Schema.Literal("content-review"),
      Schema.Literal("screening-unavailable"),
    ]),
    Schema.Null,
  ]),
  createdAt: Schema.String,
}).annotate({ identifier: "MessageSummary" });
export type JourneySendEmailConfig = {
  readonly template: TemplateId | string;
  readonly senderId?: EmailSenderId;
  readonly templateData?: JsonObject;
};
export const JourneySendEmailConfig = /* @__PURE__ */ Schema.Struct({
  template: Schema.Union([
    TemplateId,
    Schema.String.check(
      Schema.isPattern(new RegExp("^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
        expected: "a string matching the RegExp ^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$",
      }),
    ),
  ]),
  senderId: Schema.optionalKey(EmailSenderId),
  templateData: Schema.optionalKey(JsonObject),
}).annotate({ identifier: "JourneySendEmailConfig" });
export type TopicCreatePayload = {
  readonly name: string;
  readonly description?: string | null | null;
  readonly namespaceId?: NamespaceId | null | null;
  readonly default?: "opt_out" | "opt_in" | null;
  readonly defaultSenderId?: EmailSenderId | null | null;
  readonly replyMailboxId?: MailboxId | null | null;
  readonly templateId?: TemplateId | null | null;
};
export const TopicCreatePayload = /* @__PURE__ */ Schema.Struct({
  name: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  ),
  description: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null]),
  ),
  namespaceId: Schema.optionalKey(
    Schema.Union([Schema.Union([NamespaceId, Schema.Null]), Schema.Null]),
  ),
  default: Schema.optionalKey(
    Schema.Union([
      Schema.Union([Schema.Literal("opt_out"), Schema.Literal("opt_in")]),
      Schema.Null,
    ]),
  ),
  defaultSenderId: Schema.optionalKey(
    Schema.Union([Schema.Union([EmailSenderId, Schema.Null]), Schema.Null]),
  ),
  replyMailboxId: Schema.optionalKey(
    Schema.Union([Schema.Union([MailboxId, Schema.Null]), Schema.Null]),
  ),
  templateId: Schema.optionalKey(
    Schema.Union([Schema.Union([TemplateId, Schema.Null]), Schema.Null]),
  ),
}).annotate({ identifier: "TopicCreatePayload" });
export type TopicUpdatePayload = {
  readonly name?: string | null;
  readonly description?: string | null | null;
  readonly default?: "opt_out" | "opt_in" | null;
  readonly defaultSenderId?: EmailSenderId | null | null;
  readonly replyMailboxId?: MailboxId | null | null;
  readonly templateId?: TemplateId | null | null;
};
export const TopicUpdatePayload = /* @__PURE__ */ Schema.Struct({
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      ),
      Schema.Null,
    ]),
  ),
  description: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null]),
  ),
  default: Schema.optionalKey(
    Schema.Union([
      Schema.Union([Schema.Literal("opt_out"), Schema.Literal("opt_in")]),
      Schema.Null,
    ]),
  ),
  defaultSenderId: Schema.optionalKey(
    Schema.Union([Schema.Union([EmailSenderId, Schema.Null]), Schema.Null]),
  ),
  replyMailboxId: Schema.optionalKey(
    Schema.Union([Schema.Union([MailboxId, Schema.Null]), Schema.Null]),
  ),
  templateId: Schema.optionalKey(
    Schema.Union([Schema.Union([TemplateId, Schema.Null]), Schema.Null]),
  ),
}).annotate({ identifier: "TopicUpdatePayload" });
export type ExtensionVersionRef = { readonly id: ExtensionVersionId; readonly version: string };
export const ExtensionVersionRef = /* @__PURE__ */ Schema.Struct({
  id: ExtensionVersionId,
  version: Schema.String,
}).annotate({ identifier: "ExtensionVersionRef" });
export type UpgradeExtensionPayload = {
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
export const UpgradeExtensionPayload = /* @__PURE__ */ Schema.Struct({
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
}).annotate({ identifier: "UpgradeExtensionPayload" });
export type SendFeedback = {
  readonly message: string;
  readonly category?: "bug" | "confusing" | "missing" | "other" | null;
  readonly context?: FeedbackContext | null;
};
export const SendFeedback = /* @__PURE__ */ Schema.Struct({
  message: Schema.String.annotate({
    description:
      "What happened and what you expected, in plain language (at most 4000 characters).",
  })
    .check(
      Schema.isMaxCodePoints(4000).annotate({ expected: "a string with at most 4000 code points" }),
    )
    .check(
      Schema.isPattern(new RegExp("\\S", "u")).annotate({
        expected: "a string matching the RegExp \\S",
      }),
    )
    .check(
      Schema.isMaxLength(4000).annotate({ expected: "a value with a length of at most 4000" }),
    ),
  category: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.Literal("bug"),
        Schema.Literal("confusing"),
        Schema.Literal("missing"),
        Schema.Literal("other"),
      ]).annotate({
        description:
          "`bug`: the API behaved wrongly. `confusing`: a response, error, or doc was hard to act on. `missing`: a capability or field you needed does not exist. `other`: anything else.",
      }),
      Schema.Null,
    ]),
  ),
  context: Schema.optionalKey(Schema.Union([FeedbackContext, Schema.Null])),
}).annotate({ identifier: "SendFeedback" });
export type UpdateJourneyPayload = { readonly name: JourneyName };
export const UpdateJourneyPayload = /* @__PURE__ */ Schema.Struct({ name: JourneyName }).annotate({
  identifier: "UpdateJourneyPayload",
});
export type JourneyCustomEventTrigger = {
  readonly type: "event";
  readonly eventName: JourneyCustomEventName;
};
export const JourneyCustomEventTrigger = /* @__PURE__ */ Schema.Struct({
  type: Schema.Literal("event"),
  eventName: JourneyCustomEventName,
}).annotate({ identifier: "JourneyCustomEventTrigger" });
export type JourneyEventName =
  | JourneyCustomEventName
  | "contact.created"
  | "contact.tag_added"
  | "contact.joined_group";
export const JourneyEventName = /* @__PURE__ */ Schema.Union([
  JourneyCustomEventName,
  Schema.Union([
    Schema.Literal("contact.created"),
    Schema.Literal("contact.tag_added"),
    Schema.Literal("contact.joined_group"),
  ]),
]).annotate({ identifier: "JourneyEventName" });
export type JourneyNextEdge = { readonly nodeId: JourneyNodeId };
export const JourneyNextEdge = /* @__PURE__ */ Schema.Struct({ nodeId: JourneyNodeId }).annotate({
  identifier: "JourneyNextEdge",
});
export type JourneyWaitEventEdge = {
  readonly nodeId: JourneyNodeId;
  readonly outcome: "matched" | "timed_out";
};
export const JourneyWaitEventEdge = /* @__PURE__ */ Schema.Struct({
  nodeId: JourneyNodeId,
  outcome: Schema.Union([Schema.Literal("matched"), Schema.Literal("timed_out")]),
}).annotate({ identifier: "JourneyWaitEventEdge" });
export type JourneyExitNode = {
  readonly type: "exit";
  readonly config: JourneyEmptyConfig;
  readonly next: readonly [];
};
export const JourneyExitNode = /* @__PURE__ */ Schema.Struct({
  type: Schema.Literal("exit"),
  config: JourneyEmptyConfig,
  next: Schema.Tuple([]),
}).annotate({ identifier: "JourneyExitNode" });
export type JourneyComparison =
  | JourneyEqualityComparison
  | JourneyNumericComparison
  | JourneyStringComparison
  | JourneyPresenceComparison;
export const JourneyComparison = /* @__PURE__ */ Schema.Union([
  JourneyEqualityComparison,
  JourneyNumericComparison,
  JourneyStringComparison,
  JourneyPresenceComparison,
]).annotate({ identifier: "JourneyComparison" });
export type CreateMailboxEndpointPayload = {
  readonly channel: MailboxChannel;
  readonly address: string;
  readonly displayName?: string | null;
};
export const CreateMailboxEndpointPayload = /* @__PURE__ */ Schema.Struct({
  channel: MailboxChannel,
  address: Schema.String,
  displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "CreateMailboxEndpointPayload" });
export type UpdateMailboxPayload = {
  readonly name?: string | null;
  readonly metadata?: MailboxMetadataPatch | null;
};
export const UpdateMailboxPayload = /* @__PURE__ */ Schema.Struct({
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      ),
      Schema.Null,
    ]),
  ),
  metadata: Schema.optionalKey(Schema.Union([MailboxMetadataPatch, Schema.Null])),
}).annotate({ identifier: "UpdateMailboxPayload" });
export type MailboxActionDecision = {
  readonly outcome: "allow" | "requireApproval" | "deny";
  readonly reason: string | null;
  readonly policyId: MailboxPolicyId | null;
  readonly source: "grant" | "installation" | "policy" | null;
  readonly decidedAt: string;
};
export const MailboxActionDecision = /* @__PURE__ */ Schema.Struct({
  outcome: Schema.Union([
    Schema.Literal("allow"),
    Schema.Literal("requireApproval"),
    Schema.Literal("deny"),
  ]),
  reason: Schema.Union([Schema.String, Schema.Null]),
  policyId: Schema.Union([MailboxPolicyId, Schema.Null]),
  source: Schema.Union([
    Schema.Union([
      Schema.Literal("grant"),
      Schema.Literal("installation"),
      Schema.Literal("policy"),
    ]),
    Schema.Null,
  ]),
  decidedAt: Schema.String,
}).annotate({ identifier: "MailboxActionDecision" });
export type MailboxSendOutcome = {
  readonly code: string;
  readonly message: string;
  readonly error?: MailboxSendError | null;
};
export const MailboxSendOutcome = /* @__PURE__ */ Schema.Struct({
  code: Schema.String,
  message: Schema.String,
  error: Schema.optionalKey(Schema.Union([MailboxSendError, Schema.Null])),
}).annotate({ identifier: "MailboxSendOutcome" });
export type CreateMailboxGrantPayload = {
  readonly userId: UserId;
  readonly role: MailboxGrantRole;
  readonly sendMode?: MailboxSendMode | null;
};
export const CreateMailboxGrantPayload = /* @__PURE__ */ Schema.Struct({
  userId: UserId,
  role: MailboxGrantRole,
  sendMode: Schema.optionalKey(Schema.Union([MailboxSendMode, Schema.Null])),
}).annotate({ identifier: "CreateMailboxGrantPayload" });
export type UpdateMailboxGrantPayload = {
  readonly role?: MailboxGrantRole | null;
  readonly sendMode?: MailboxSendMode | null;
};
export const UpdateMailboxGrantPayload = /* @__PURE__ */ Schema.Struct({
  role: Schema.optionalKey(Schema.Union([MailboxGrantRole, Schema.Null])),
  sendMode: Schema.optionalKey(Schema.Union([MailboxSendMode, Schema.Null])),
}).annotate({ identifier: "UpdateMailboxGrantPayload" });
export type MailboxThreadLabels = {
  readonly labels: readonly [MailboxLabelId, ...Array<MailboxLabelId>];
};
export const MailboxThreadLabels = /* @__PURE__ */ Schema.Struct({
  labels: Schema.TupleWithRest(Schema.Tuple([MailboxLabelId]), [MailboxLabelId]),
}).annotate({ identifier: "MailboxThreadLabels" });
export type CreateMailboxPolicyPayload = {
  readonly name: string;
  readonly outcome: MailboxPolicyOutcomeKind;
  readonly reason?: string | null;
  readonly enabled?: boolean | null;
};
export const CreateMailboxPolicyPayload = /* @__PURE__ */ Schema.Struct({
  name: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(128).annotate({ expected: "a string with at most 128 code points" }),
    )
    .check(
      Schema.isPattern(new RegExp("^\\S[\\s\\S]*\\S$|^\\S$|^$", "u")).annotate({
        expected: "a string matching the RegExp ^\\S[\\s\\S]*\\S$|^\\S$|^$",
      }),
    )
    .check(Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" })),
  outcome: MailboxPolicyOutcomeKind,
  reason: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(512).annotate({ expected: "a string with at most 512 code points" }),
      ).check(
        Schema.isMaxLength(512).annotate({ expected: "a value with a length of at most 512" }),
      ),
      Schema.Null,
    ]),
  ),
  enabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
}).annotate({ identifier: "CreateMailboxPolicyPayload" });
export type UpdateMailboxPolicyPayload = {
  readonly name?: string | null;
  readonly outcome?: MailboxPolicyOutcomeKind | null;
  readonly reason?: string | null | null;
  readonly enabled?: boolean | null;
};
export const UpdateMailboxPolicyPayload = /* @__PURE__ */ Schema.Struct({
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(new RegExp("^\\S[\\s\\S]*\\S$|^\\S$|^$", "u")).annotate({
            expected: "a string matching the RegExp ^\\S[\\s\\S]*\\S$|^\\S$|^$",
          }),
        )
        .check(
          Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" }),
        ),
      Schema.Null,
    ]),
  ),
  outcome: Schema.optionalKey(Schema.Union([MailboxPolicyOutcomeKind, Schema.Null])),
  reason: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        ).check(
          Schema.isMaxLength(512).annotate({ expected: "a value with a length of at most 512" }),
        ),
        Schema.Null,
      ]),
      Schema.Null,
    ]),
  ),
  enabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
}).annotate({ identifier: "UpdateMailboxPolicyPayload" });
export type UpdateMailboxThreadPayload = {
  readonly folder?: MailboxThreadFolder | null;
  readonly priority?: MailboxThreadPriority | null;
  readonly read?: boolean | null;
  readonly starred?: boolean | null;
  readonly snoozedUntil?: string | null | null;
};
export const UpdateMailboxThreadPayload = /* @__PURE__ */ Schema.Struct({
  folder: Schema.optionalKey(Schema.Union([MailboxThreadFolder, Schema.Null])),
  priority: Schema.optionalKey(Schema.Union([MailboxThreadPriority, Schema.Null])),
  read: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  starred: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  snoozedUntil: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null]),
  ),
}).annotate({ identifier: "UpdateMailboxThreadPayload" });
export type CreateNamespacePayload = {
  readonly name: string;
  readonly metadata?: NamespaceMetadata | null;
};
export const CreateNamespacePayload = /* @__PURE__ */ Schema.Struct({
  name: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(128).annotate({ expected: "a string with at most 128 code points" }),
    )
    .check(
      Schema.isPattern(new RegExp("^\\S[\\s\\S]*\\S$|^\\S$|^$", "u")).annotate({
        expected: "a string matching the RegExp ^\\S[\\s\\S]*\\S$|^\\S$|^$",
      }),
    )
    .check(Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" })),
  metadata: Schema.optionalKey(Schema.Union([NamespaceMetadata, Schema.Null])),
}).annotate({ identifier: "CreateNamespacePayload" });
export type AssignNamespaceResourcePayload = {
  readonly type: NamespaceResourceType;
  readonly resourceId: string;
};
export const AssignNamespaceResourcePayload = /* @__PURE__ */ Schema.Struct({
  type: NamespaceResourceType,
  resourceId: Schema.String.annotate({
    description: "The resource's id, such as `dom_...` for a domain.",
  }),
}).annotate({ identifier: "AssignNamespaceResourcePayload" });
export type Operation = {
  readonly id: OperationId;
  readonly organizationId: string;
  readonly kind: "email-domain-provisioning" | "organization-deletion";
  readonly subject: OperationResource;
  readonly actor: { readonly type: "user" | "api-key" | "system"; readonly id: string };
  readonly status: "pending" | "running" | "succeeded" | "failed";
  readonly phase:
    | "accepted"
    | "dispatching"
    | "provisioning"
    | "deleting"
    | "finalizing"
    | "completed";
  readonly error: {
    readonly code:
      | "validation-failed"
      | "conflict"
      | "capacity-unavailable"
      | "rejected"
      | "unavailable"
      | "timed-out"
      | "internal";
    readonly message: string;
  } | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly startedAt: string | null;
  readonly completedAt: string | null;
};
export const Operation = /* @__PURE__ */ Schema.Struct({
  id: OperationId,
  organizationId: Schema.String,
  kind: Schema.Union([
    Schema.Literal("email-domain-provisioning"),
    Schema.Literal("organization-deletion"),
  ]),
  subject: OperationResource,
  actor: Schema.Struct({
    type: Schema.Union([
      Schema.Literal("user"),
      Schema.Literal("api-key"),
      Schema.Literal("system"),
    ]),
    id: Schema.String,
  }),
  status: Schema.Union([
    Schema.Literal("pending"),
    Schema.Literal("running"),
    Schema.Literal("succeeded"),
    Schema.Literal("failed"),
  ]),
  phase: Schema.Union([
    Schema.Literal("accepted"),
    Schema.Literal("dispatching"),
    Schema.Literal("provisioning"),
    Schema.Literal("deleting"),
    Schema.Literal("finalizing"),
    Schema.Literal("completed"),
  ]),
  error: Schema.Union([
    Schema.Struct({
      code: Schema.Union([
        Schema.Literal("validation-failed"),
        Schema.Literal("conflict"),
        Schema.Literal("capacity-unavailable"),
        Schema.Literal("rejected"),
        Schema.Literal("unavailable"),
        Schema.Literal("timed-out"),
        Schema.Literal("internal"),
      ]),
      message: Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(240).annotate({
            expected: "a string with at most 240 code points",
          }),
        )
        .check(
          Schema.isMaxLength(240).annotate({ expected: "a value with a length of at most 240" }),
        ),
    }),
    Schema.Null,
  ]),
  createdAt: Schema.String,
  updatedAt: Schema.String,
  startedAt: Schema.Union([Schema.String, Schema.Null]),
  completedAt: Schema.Union([Schema.String, Schema.Null]),
}).annotate({ identifier: "Operation" });
export type OperationResourceLink = { readonly resource: OperationResource; readonly href: string };
export const OperationResourceLink = /* @__PURE__ */ Schema.Struct({
  resource: OperationResource,
  href: Schema.String.check(
    Schema.isMaxCodePoints(500).annotate({ expected: "a string with at most 500 code points" }),
  )
    .check(
      Schema.isPattern(new RegExp("^\\/v1\\/", "u")).annotate({
        expected: "a string matching the RegExp ^\\/v1\\/",
      }),
    )
    .check(Schema.isMaxLength(500).annotate({ expected: "a value with a length of at most 500" })),
}).annotate({ identifier: "OperationResourceLink" });
export type UpdateTemplatePayload = {
  readonly data: {
    readonly name?: string | null;
    readonly slug?: string | null;
    readonly entryPath?: string | null;
    readonly description?: string | null | null;
    readonly category?:
      | "transactional"
      | "marketing"
      | "support"
      | "notification"
      | "verification"
      | "reminder"
      | "alert"
      | null
      | null;
    readonly fromDefault?: TemplateFromDefault | null | null;
    readonly replyToDefault?: ReadonlyArray<string> | null | null;
    readonly trackingDefault?: TemplateTrackingDefault | null | null;
    readonly isActive?: boolean | null;
    readonly shared?: boolean | null;
  };
};
export const UpdateTemplatePayload = /* @__PURE__ */ Schema.Struct({
  data: Schema.Struct({
    name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    slug: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isPattern(new RegExp("^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
            expected: "a string matching the RegExp ^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$",
          }),
        ),
        Schema.Null,
      ]),
    ),
    entryPath: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(1024).annotate({
            expected: "a string with at most 1024 code points",
          }),
        )
          .check(
            Schema.isPattern(
              new RegExp(
                "^(?!\\/)(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?:templates|emails)\\/.+\\.tsx$",
                "u",
              ),
            ).annotate({
              expected:
                "a string matching the RegExp ^(?!\\/)(?!.*\\\\)(?!.*(?:^|\\/)\\.{1,2}(?:\\/|$))(?!.*(?:^|\\/)\\.git(?:\\/|$))(?:templates|emails)\\/.+\\.tsx$",
            }),
          )
          .check(
            Schema.isMaxLength(1024).annotate({
              expected: "a value with a length of at most 1024",
            }),
          ),
        Schema.Null,
      ]),
    ),
    description: Schema.optionalKey(
      Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null]),
    ),
    category: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Union([
            Schema.Literal("transactional"),
            Schema.Literal("marketing"),
            Schema.Literal("support"),
            Schema.Literal("notification"),
            Schema.Literal("verification"),
            Schema.Literal("reminder"),
            Schema.Literal("alert"),
          ]),
          Schema.Null,
        ]),
        Schema.Null,
      ]),
    ),
    fromDefault: Schema.optionalKey(
      Schema.Union([Schema.Union([TemplateFromDefault, Schema.Null]), Schema.Null]),
    ),
    replyToDefault: Schema.optionalKey(
      Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.Null]), Schema.Null]),
    ),
    trackingDefault: Schema.optionalKey(
      Schema.Union([Schema.Union([TemplateTrackingDefault, Schema.Null]), Schema.Null]).annotate({
        description:
          "Engagement tracking for sends of this template: `opens` and `clicks`, each inherited from the domain and organization defaults when omitted. A send request's own `tracking` still wins. Null clears the template's default.",
      }),
    ),
    isActive: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    shared: Schema.optionalKey(
      Schema.Union([Schema.Boolean, Schema.Null]).annotate({
        description:
          "Share the template's project with every namespace, or stop sharing it. Applies to every entry in the project. Only an organization-level project is shared.",
      }),
    ),
  }),
}).annotate({ identifier: "UpdateTemplatePayload" });
export type WorkingHours = {
  readonly timeZone: TimeZone;
  readonly ranges: ReadonlyArray<WorkingHoursRange>;
};
export const WorkingHours = /* @__PURE__ */ Schema.Struct({
  timeZone: TimeZone,
  ranges: Schema.Array(WorkingHoursRange)
    .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
    .check(Schema.isMaxLength(28).annotate({ expected: "a value with a length of at most 28" })),
}).annotate({ identifier: "WorkingHours" });
export type ApiKeyAccess =
  | { readonly mode: "full" }
  | {
      readonly mode: "restricted";
      readonly resources: ApiKeyResourceAccess;
      readonly mailboxes?: ApiKeyMailboxAccess | null;
      readonly namespaceId?: NamespaceId | null;
    };
export const ApiKeyAccess = /* @__PURE__ */ Schema.Union([
  Schema.Struct({ mode: Schema.Literal("full") }),
  Schema.Struct({
    mode: Schema.Literal("restricted"),
    resources: ApiKeyResourceAccess,
    mailboxes: Schema.optionalKey(Schema.Union([ApiKeyMailboxAccess, Schema.Null])),
    namespaceId: Schema.optionalKey(
      Schema.Union([NamespaceId, Schema.Null]).annotate({
        description:
          "Confines the key to one namespace: it reaches only that namespace's domains, senders, numbers, mailboxes, contacts, templates, and messages, never organization-level ones, and only endpoints that confine to a namespace (others answer 403). It holds grants only on `mailboxes`, `messages`, `email`, `domains`, `contacts`, and `templates`. A key scoped to listed mailboxes holds mailbox access only.",
      }),
    ),
  }),
]).annotate({ identifier: "ApiKeyAccess" });
export type CreateBrand = {
  readonly slug: string;
  readonly name: string;
  readonly css?: string | null;
  readonly assets?: BrandAssets | null;
  readonly footer?: BrandFooter | null;
  readonly isDefault?: boolean | null;
};
export const CreateBrand = /* @__PURE__ */ Schema.Struct({
  slug: Schema.String.check(
    Schema.isPattern(new RegExp("^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$", "u")).annotate({
      expected: "a string matching the RegExp ^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$",
    }),
  ),
  name: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(120).annotate({ expected: "a string with at most 120 code points" }),
    )
    .check(Schema.isMaxLength(120).annotate({ expected: "a value with a length of at most 120" })),
  css: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(32768).annotate({
          expected: "a string with at most 32768 code points",
        }),
      ).check(
        Schema.isMaxLength(32768).annotate({ expected: "a value with a length of at most 32768" }),
      ),
      Schema.Null,
    ]),
  ),
  assets: Schema.optionalKey(Schema.Union([BrandAssets, Schema.Null])),
  footer: Schema.optionalKey(Schema.Union([BrandFooter, Schema.Null])),
  isDefault: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
}).annotate({ identifier: "CreateBrand" });
export type UpdateBrand = {
  readonly newSlug?: string | null;
  readonly name?: string | null;
  readonly css?: string | null;
  readonly assets?: BrandAssets | null;
  readonly footer?: BrandFooter | null;
};
export const UpdateBrand = /* @__PURE__ */ Schema.Struct({
  newSlug: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Renames the brand. Projects importing `samva:brand/<old slug>` stop building until they import the new slug.",
      }).check(
        Schema.isPattern(new RegExp("^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$",
        }),
      ),
      Schema.Null,
    ]),
  ),
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(120).annotate({
            expected: "a string with at most 120 code points",
          }),
        )
        .check(
          Schema.isMaxLength(120).annotate({ expected: "a value with a length of at most 120" }),
        ),
      Schema.Null,
    ]),
  ),
  css: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(32768).annotate({
          expected: "a string with at most 32768 code points",
        }),
      ).check(
        Schema.isMaxLength(32768).annotate({ expected: "a value with a length of at most 32768" }),
      ),
      Schema.Null,
    ]),
  ),
  assets: Schema.optionalKey(Schema.Union([BrandAssets, Schema.Null])),
  footer: Schema.optionalKey(Schema.Union([BrandFooter, Schema.Null])),
}).annotate({ identifier: "UpdateBrand" });
export type EmailAttachments = ReadonlyArray<EmailAttachment> | null;
export const EmailAttachments = /* @__PURE__ */ Schema.Union([
  Schema.Array(EmailAttachment).check(
    Schema.isMaxLength(10).annotate({ expected: "a value with a length of at most 10" }),
  ),
  Schema.Null,
]).annotate({ identifier: "EmailAttachments" });
export type CreateMailboxDraftPayload = {
  readonly channel?: "email" | null;
  readonly endpointId?: MailboxEndpointId | null;
  readonly to?: ReadonlyArray<string> | null;
  readonly cc?: ReadonlyArray<string> | null;
  readonly bcc?: ReadonlyArray<string> | null;
  readonly replyTo?: ReadonlyArray<string> | null;
  readonly subject?: string | null;
  readonly text?: string | null;
  readonly html?: string | null;
  readonly attachments?: ReadonlyArray<EmailAttachment> | null;
  readonly inReplyToMessageId?: MessageId | null;
};
export const CreateMailboxDraftPayload = /* @__PURE__ */ Schema.Struct({
  channel: Schema.optionalKey(Schema.Union([Schema.Literal("email"), Schema.Null])),
  endpointId: Schema.optionalKey(Schema.Union([MailboxEndpointId, Schema.Null])),
  to: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  cc: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  bcc: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  replyTo: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  subject: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  text: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  html: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  attachments: Schema.optionalKey(
    Schema.Union([
      Schema.Array(EmailAttachment).check(
        Schema.isMaxLength(10).annotate({ expected: "a value with a length of at most 10" }),
      ),
      Schema.Null,
    ]),
  ),
  inReplyToMessageId: Schema.optionalKey(Schema.Union([MessageId, Schema.Null])),
}).annotate({ identifier: "CreateMailboxDraftPayload" });
export type ForwardMailboxMessagePayload = {
  readonly to: readonly [string, ...Array<string>];
  readonly cc?: ReadonlyArray<string> | null;
  readonly bcc?: ReadonlyArray<string> | null;
  readonly text?: string | null;
  readonly html?: string | null;
  readonly attachments?: ReadonlyArray<EmailAttachment> | null;
};
export const ForwardMailboxMessagePayload = /* @__PURE__ */ Schema.Struct({
  to: Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]),
  cc: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  bcc: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  text: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  html: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  attachments: Schema.optionalKey(
    Schema.Union([
      Schema.Array(EmailAttachment).check(
        Schema.isMaxLength(10).annotate({ expected: "a value with a length of at most 10" }),
      ),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "ForwardMailboxMessagePayload" });
export type ReplyMailboxMessagePayload = {
  readonly channel?: "email" | null;
  readonly cc?: ReadonlyArray<string> | null;
  readonly bcc?: ReadonlyArray<string> | null;
  readonly text?: string | null;
  readonly html?: string | null;
  readonly attachments?: ReadonlyArray<EmailAttachment> | null;
};
export const ReplyMailboxMessagePayload = /* @__PURE__ */ Schema.Struct({
  channel: Schema.optionalKey(Schema.Union([Schema.Literal("email"), Schema.Null])),
  cc: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  bcc: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  text: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  html: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  attachments: Schema.optionalKey(
    Schema.Union([
      Schema.Array(EmailAttachment).check(
        Schema.isMaxLength(10).annotate({ expected: "a value with a length of at most 10" }),
      ),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "ReplyMailboxMessagePayload" });
export type SendMailboxMessagePayload = {
  readonly channel?: "email" | null;
  readonly to: readonly [string, ...Array<string>];
  readonly cc?: ReadonlyArray<string> | null;
  readonly bcc?: ReadonlyArray<string> | null;
  readonly replyTo?: ReadonlyArray<string> | null;
  readonly subject: string;
  readonly text?: string | null;
  readonly html?: string | null;
  readonly attachments?: ReadonlyArray<EmailAttachment> | null;
};
export const SendMailboxMessagePayload = /* @__PURE__ */ Schema.Struct({
  channel: Schema.optionalKey(Schema.Union([Schema.Literal("email"), Schema.Null])),
  to: Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]),
  cc: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  bcc: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  replyTo: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  subject: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  ),
  text: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  html: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  attachments: Schema.optionalKey(
    Schema.Union([
      Schema.Array(EmailAttachment).check(
        Schema.isMaxLength(10).annotate({ expected: "a value with a length of at most 10" }),
      ),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "SendMailboxMessagePayload" });
export type UpdateMailboxDraftPayload = {
  readonly to?: ReadonlyArray<string> | null;
  readonly cc?: ReadonlyArray<string> | null | null;
  readonly bcc?: ReadonlyArray<string> | null | null;
  readonly replyTo?: ReadonlyArray<string> | null | null;
  readonly subject?: string | null | null;
  readonly text?: string | null | null;
  readonly html?: string | null | null;
  readonly attachments?: ReadonlyArray<EmailAttachment> | null | null;
};
export const UpdateMailboxDraftPayload = /* @__PURE__ */ Schema.Struct({
  to: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  cc: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.Null]), Schema.Null]),
  ),
  bcc: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.Null]), Schema.Null]),
  ),
  replyTo: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.Array(Schema.String), Schema.Null]), Schema.Null]),
  ),
  subject: Schema.optionalKey(
    Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null]),
  ),
  text: Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])),
  html: Schema.optionalKey(Schema.Union([Schema.Union([Schema.String, Schema.Null]), Schema.Null])),
  attachments: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.Array(EmailAttachment).check(
          Schema.isMaxLength(10).annotate({ expected: "a value with a length of at most 10" }),
        ),
        Schema.Null,
      ]),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "UpdateMailboxDraftPayload" });
export type ContactIdentityChannel = {
  readonly channel: "email";
  readonly reachability: "unknown" | "reachable" | "unreachable";
  readonly consent: ContactConsent | null;
};
export const ContactIdentityChannel = /* @__PURE__ */ Schema.Struct({
  channel: Schema.Literal("email"),
  reachability: Schema.Union([
    Schema.Literal("unknown"),
    Schema.Literal("reachable"),
    Schema.Literal("unreachable"),
  ]),
  consent: Schema.Union([ContactConsent, Schema.Null]),
}).annotate({ identifier: "ContactIdentityChannel" });
export type CreateEventPayload = {
  readonly contact: ContactEventReference;
  readonly name: string;
  readonly properties?: JsonObject | null;
  readonly occurredAt?: string | null;
  readonly idempotencyKey?: string | null;
};
export const CreateEventPayload = /* @__PURE__ */ Schema.Struct({
  contact: ContactEventReference,
  name: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  )
    .check(
      Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
    )
    .check(Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }))
    .check(
      Schema.isPattern(
        new RegExp(
          "^(?!(?:[Cc][Oo][Nn][Tt][Aa][Cc][Tt]|[Ss][Aa][Mm][Vv][Aa])\\.)[A-Za-z][A-Za-z0-9_.-]*$",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^(?!(?:[Cc][Oo][Nn][Tt][Aa][Cc][Tt]|[Ss][Aa][Mm][Vv][Aa])\\.)[A-Za-z][A-Za-z0-9_.-]*$",
      }),
    ),
  properties: Schema.optionalKey(Schema.Union([JsonObject, Schema.Null])),
  occurredAt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  idempotencyKey: Schema.optionalKey(
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
}).annotate({ identifier: "CreateEventPayload" });
export type EmailRecipients = ReadonlyArray<EmailRecipient>;
export const EmailRecipients = /* @__PURE__ */ Schema.Array(EmailRecipient).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "EmailRecipients",
  }),
);
export type EmailCcRecipients = ReadonlyArray<EmailRecipient> | null | null;
export const EmailCcRecipients = /* @__PURE__ */ Schema.Union([
  Schema.Union([Schema.Array(EmailRecipient), Schema.Null]),
  Schema.Null,
]).annotate({ identifier: "EmailCcRecipients" });
export type EmailBccRecipients = ReadonlyArray<EmailRecipient> | null | null;
export const EmailBccRecipients = /* @__PURE__ */ Schema.Union([
  Schema.Union([Schema.Array(EmailRecipient), Schema.Null]),
  Schema.Null,
]).annotate({ identifier: "EmailBccRecipients" });
export type TopicContactRef = TopicContactById | TopicContactByEmail | TopicContactByPhone;
export const TopicContactRef = /* @__PURE__ */ Schema.Union([
  TopicContactById,
  TopicContactByEmail,
  TopicContactByPhone,
]).annotate({ identifier: "TopicContactRef" });
export type MessagePage = {
  readonly items: ReadonlyArray<MessageSummary>;
  readonly nextCursor: string | null;
};
export const MessagePage = /* @__PURE__ */ Schema.Struct({
  items: Schema.Array(MessageSummary),
  nextCursor: Schema.Union([Schema.String, Schema.Null]),
}).annotate({ identifier: "MessagePage" });
export type JourneyTrigger =
  | JourneyCustomEventTrigger
  | JourneyContactCreatedTrigger
  | JourneyTagAddedTrigger
  | JourneyGroupJoinedTrigger;
export const JourneyTrigger = /* @__PURE__ */ Schema.Union([
  JourneyCustomEventTrigger,
  JourneyContactCreatedTrigger,
  JourneyTagAddedTrigger,
  JourneyGroupJoinedTrigger,
]).annotate({ identifier: "JourneyTrigger" });
export type JourneyWaitForEventConfig = {
  readonly eventName: JourneyEventName;
  readonly timeoutSeconds: number;
};
export const JourneyWaitForEventConfig = /* @__PURE__ */ Schema.Struct({
  eventName: JourneyEventName,
  timeoutSeconds: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isLessThanOrEqualTo(7776000).annotate({
        expected: "a value less than or equal to 7776000",
      }),
    )
    .check(Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" })),
}).annotate({ identifier: "JourneyWaitForEventConfig" });
export type JourneyEventPredicate = {
  readonly type: "event";
  readonly eventName: JourneyEventName;
  readonly occurred: boolean;
};
export const JourneyEventPredicate = /* @__PURE__ */ Schema.Struct({
  type: Schema.Literal("event"),
  eventName: JourneyEventName,
  occurred: Schema.Boolean,
}).annotate({ identifier: "JourneyEventPredicate" });
export type JourneyGoal = { readonly eventName: JourneyEventName };
export const JourneyGoal = /* @__PURE__ */ Schema.Struct({ eventName: JourneyEventName }).annotate({
  identifier: "JourneyGoal",
});
export type JourneySendEmailNode = {
  readonly type: "send_email";
  readonly config: JourneySendEmailConfig;
  readonly next: readonly [JourneyNextEdge];
};
export const JourneySendEmailNode = /* @__PURE__ */ Schema.Struct({
  type: Schema.Literal("send_email"),
  config: JourneySendEmailConfig,
  next: Schema.Tuple([JourneyNextEdge]),
}).annotate({ identifier: "JourneySendEmailNode" });
export type JourneyWaitNode = {
  readonly type: "wait";
  readonly config: JourneyWaitConfig;
  readonly next: readonly [JourneyNextEdge];
};
export const JourneyWaitNode = /* @__PURE__ */ Schema.Struct({
  type: Schema.Literal("wait"),
  config: JourneyWaitConfig,
  next: Schema.Tuple([JourneyNextEdge]),
}).annotate({ identifier: "JourneyWaitNode" });
export type JourneyUpdateTagsNode = {
  readonly type: "update_tags";
  readonly config: JourneyUpdateTagsConfig;
  readonly next: readonly [JourneyNextEdge];
};
export const JourneyUpdateTagsNode = /* @__PURE__ */ Schema.Struct({
  type: Schema.Literal("update_tags"),
  config: JourneyUpdateTagsConfig,
  next: Schema.Tuple([JourneyNextEdge]),
}).annotate({ identifier: "JourneyUpdateTagsNode" });
export type JourneyWebhookNode = {
  readonly type: "webhook";
  readonly config: JourneyWebhookConfig;
  readonly next: readonly [JourneyNextEdge];
};
export const JourneyWebhookNode = /* @__PURE__ */ Schema.Struct({
  type: Schema.Literal("webhook"),
  config: JourneyWebhookConfig,
  next: Schema.Tuple([JourneyNextEdge]),
}).annotate({ identifier: "JourneyWebhookNode" });
export type JourneyPropertyPredicate = {
  readonly type: "property";
  readonly field: JourneyContactProperty;
  readonly comparison: JourneyComparison;
};
export const JourneyPropertyPredicate = /* @__PURE__ */ Schema.Struct({
  type: Schema.Literal("property"),
  field: JourneyContactProperty,
  comparison: JourneyComparison,
}).annotate({ identifier: "JourneyPropertyPredicate" });
export type JourneyCustomFieldPredicate = {
  readonly type: "custom_field";
  readonly key: string;
  readonly comparison: JourneyComparison;
};
export const JourneyCustomFieldPredicate = /* @__PURE__ */ Schema.Struct({
  type: Schema.Literal("custom_field"),
  key: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  ),
  comparison: JourneyComparison,
}).annotate({ identifier: "JourneyCustomFieldPredicate" });
export type CreateMailboxPayload = {
  readonly namespaceId?: NamespaceId | null;
  readonly endpoint: CreateMailboxEndpointPayload;
  readonly name: string;
  readonly slug?: string | null;
  readonly metadata?: MailboxMetadata | null;
};
export const CreateMailboxPayload = /* @__PURE__ */ Schema.Struct({
  namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
  endpoint: CreateMailboxEndpointPayload,
  name: Schema.String,
  slug: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  metadata: Schema.optionalKey(Schema.Union([MailboxMetadata, Schema.Null])),
}).annotate({ identifier: "CreateMailboxPayload" });
export type MailboxSendReceipt = {
  readonly actionId: MailboxActionId;
  readonly draftId: MailboxDraftId | null;
  readonly messageId: MessageId | null;
  readonly threadId: MailboxThreadId | null;
  readonly state:
    | "approvalRequired"
    | "queued"
    | "accepted"
    | "completed"
    | "notSent"
    | "uncertain";
  readonly acceptedAt: string | null;
  readonly waitReason:
    | "rate"
    | "daily-quota"
    | "domain-health"
    | "sending-paused"
    | "upstream-unavailable"
    | "retry"
    | "campaign-paused"
    | "domain-warming"
    | "onboarding-review"
    | "content-review"
    | "screening-unavailable"
    | null;
  readonly reviewExpectedAt: string | null;
  readonly skippedRecipients: ReadonlyArray<SkippedRecipient>;
  readonly executeUntil: string | null;
  readonly retryAt: string | null;
  readonly problem: MailboxSendOutcome | null;
  readonly retryEligible: boolean;
  readonly decision: MailboxActionDecision | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const MailboxSendReceipt = /* @__PURE__ */ Schema.Struct({
  actionId: MailboxActionId,
  draftId: Schema.Union([MailboxDraftId, Schema.Null]),
  messageId: Schema.Union([MessageId, Schema.Null]),
  threadId: Schema.Union([MailboxThreadId, Schema.Null]),
  state: Schema.Union([
    Schema.Literal("approvalRequired"),
    Schema.Literal("queued"),
    Schema.Literal("accepted"),
    Schema.Literal("completed"),
    Schema.Literal("notSent"),
    Schema.Literal("uncertain"),
  ]),
  acceptedAt: Schema.Union([Schema.String, Schema.Null]),
  waitReason: Schema.Union([
    Schema.Union([
      Schema.Literal("rate"),
      Schema.Literal("daily-quota"),
      Schema.Literal("domain-health"),
      Schema.Literal("sending-paused"),
      Schema.Literal("upstream-unavailable"),
      Schema.Literal("retry"),
      Schema.Literal("campaign-paused"),
      Schema.Literal("domain-warming"),
      Schema.Literal("onboarding-review"),
      Schema.Literal("content-review"),
      Schema.Literal("screening-unavailable"),
    ]),
    Schema.Null,
  ]),
  reviewExpectedAt: Schema.Union([Schema.String, Schema.Null]),
  skippedRecipients: Schema.Array(SkippedRecipient),
  executeUntil: Schema.Union([Schema.String, Schema.Null]),
  retryAt: Schema.Union([Schema.String, Schema.Null]),
  problem: Schema.Union([MailboxSendOutcome, Schema.Null]),
  retryEligible: Schema.Boolean,
  decision: Schema.Union([MailboxActionDecision, Schema.Null]),
  createdAt: Schema.String,
  updatedAt: Schema.String,
}).annotate({ identifier: "MailboxSendReceipt" });
export type OperationAccepted = {
  readonly operation: Operation;
  readonly links: { readonly self: string; readonly resource: OperationResourceLink };
};
export const OperationAccepted = /* @__PURE__ */ Schema.Struct({
  operation: Operation,
  links: Schema.Struct({
    self: Schema.String.check(
      Schema.isMaxCodePoints(500).annotate({ expected: "a string with at most 500 code points" }),
    )
      .check(
        Schema.isPattern(new RegExp("^\\/v1\\/", "u")).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/",
        }),
      )
      .check(
        Schema.isMaxLength(500).annotate({ expected: "a value with a length of at most 500" }),
      ),
    resource: OperationResourceLink,
  }),
}).annotate({ identifier: "OperationAccepted" });
export type AgentDefinition = {
  readonly instructions: string;
  readonly knowledge: string;
  readonly endpointIds: ReadonlyArray<MailboxEndpointId>;
  readonly integrationIds: ReadonlyArray<AgentIntegrationReference>;
  readonly mode: AgentMode;
  readonly model: AgentModel;
  readonly approvalPolicy: AgentApprovalPolicy;
  readonly workingHours: WorkingHours | null;
  readonly takeoverTimeoutMinutes: number;
};
export const AgentDefinition = /* @__PURE__ */ Schema.Struct({
  instructions: Schema.String.check(
    Schema.isMaxCodePoints(20000).annotate({ expected: "a string with at most 20000 code points" }),
  ).check(
    Schema.isMaxLength(20000).annotate({ expected: "a value with a length of at most 20000" }),
  ),
  knowledge: Schema.String.check(
    Schema.isMaxCodePoints(100000).annotate({
      expected: "a string with at most 100000 code points",
    }),
  ).check(
    Schema.isMaxLength(100000).annotate({ expected: "a value with a length of at most 100000" }),
  ),
  endpointIds: Schema.Array(MailboxEndpointId).check(
    Schema.isMaxLength(20).annotate({ expected: "a value with a length of at most 20" }),
  ),
  integrationIds: Schema.Array(AgentIntegrationReference).check(
    Schema.isMaxLength(20).annotate({ expected: "a value with a length of at most 20" }),
  ),
  mode: AgentMode,
  model: AgentModel,
  approvalPolicy: AgentApprovalPolicy,
  workingHours: Schema.Union([WorkingHours, Schema.Null]),
  takeoverTimeoutMinutes: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(1).annotate({ expected: "a value greater than or equal to 1" }),
    )
    .check(
      Schema.isLessThanOrEqualTo(10080).annotate({
        expected: "a value less than or equal to 10080",
      }),
    ),
}).annotate({ identifier: "AgentDefinition" });
export type CampaignEmailInput = {
  readonly subject?: string | null;
  readonly html?: string | null;
  readonly text?: string | null;
  readonly attachments?: EmailAttachments;
  readonly publicationId?: TemplatePublicationId;
  readonly inputContractId?: TemplateInputContractId;
  readonly templateId?: TemplateId | null;
  readonly templateSlug?: string | null;
  readonly templateData?: TemplateData;
  readonly locale?: RenderLocale;
  readonly timeZone?: RenderTimeZone;
  readonly inReplyToMessageId?: MessageId | null;
  readonly replyTo?: ReplyToAddresses;
  readonly topicId?: TopicId | null | null;
  readonly tracking?: EmailTrackingOverrideV1;
  readonly footer?: EmailFooterOverride;
  readonly headers?: EmailCustomHeaders | null;
  readonly preheader?: string | null;
};
export const CampaignEmailInput = /* @__PURE__ */ Schema.Struct({
  subject: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  html: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  text: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  attachments: Schema.optionalKey(EmailAttachments),
  publicationId: Schema.optionalKey(TemplatePublicationId),
  inputContractId: Schema.optionalKey(TemplateInputContractId),
  templateId: Schema.optionalKey(Schema.Union([TemplateId, Schema.Null])),
  templateSlug: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isPattern(new RegExp("^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
          expected: "a string matching the RegExp ^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$",
        }),
      ),
      Schema.Null,
    ]),
  ),
  templateData: Schema.optionalKey(TemplateData),
  locale: Schema.optionalKey(RenderLocale),
  timeZone: Schema.optionalKey(RenderTimeZone),
  inReplyToMessageId: Schema.optionalKey(Schema.Union([MessageId, Schema.Null])),
  replyTo: Schema.optionalKey(ReplyToAddresses),
  topicId: Schema.optionalKey(
    Schema.Union([Schema.Union([TopicId, Schema.Null]), Schema.Null]).annotate({
      description:
        "The topic for this send. Omit to inherit the template topic; null disables topic inheritance for a direct send. Campaigns require a topic.",
    }),
  ),
  tracking: Schema.optionalKey(EmailTrackingOverrideV1),
  footer: Schema.optionalKey(EmailFooterOverride),
  headers: Schema.optionalKey(Schema.Union([EmailCustomHeaders, Schema.Null])),
  preheader: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "CampaignEmailInput" });
export type EmailContent = {
  readonly subject?: string | null;
  readonly html?: string | null;
  readonly text?: string | null;
  readonly attachments?: EmailAttachments;
  readonly publicationId?: TemplatePublicationId;
  readonly inputContractId?: TemplateInputContractId;
  readonly templateId?: TemplateId | null;
  readonly templateSlug?: string | null;
  readonly templateData?: TemplateData;
  readonly locale?: RenderLocale;
  readonly timeZone?: RenderTimeZone;
  readonly inReplyToMessageId?: MessageId | null;
  readonly replyTo?: ReplyToAddresses;
  readonly topicId?: TopicId | null | null;
  readonly tracking?: EmailTrackingOverrideV1;
  readonly footer?: EmailFooterOverride;
  readonly headers?: EmailCustomHeaders | null;
};
export const EmailContent = /* @__PURE__ */ Schema.Struct({
  subject: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  html: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  text: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  attachments: Schema.optionalKey(EmailAttachments),
  publicationId: Schema.optionalKey(TemplatePublicationId),
  inputContractId: Schema.optionalKey(TemplateInputContractId),
  templateId: Schema.optionalKey(Schema.Union([TemplateId, Schema.Null])),
  templateSlug: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isPattern(new RegExp("^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$", "u")).annotate({
          expected: "a string matching the RegExp ^(?=.{1,100}$)[a-z0-9]+(?:-[a-z0-9]+)*$",
        }),
      ),
      Schema.Null,
    ]),
  ),
  templateData: Schema.optionalKey(TemplateData),
  locale: Schema.optionalKey(RenderLocale),
  timeZone: Schema.optionalKey(RenderTimeZone),
  inReplyToMessageId: Schema.optionalKey(Schema.Union([MessageId, Schema.Null])),
  replyTo: Schema.optionalKey(ReplyToAddresses),
  topicId: Schema.optionalKey(
    Schema.Union([Schema.Union([TopicId, Schema.Null]), Schema.Null]).annotate({
      description:
        "The topic for this send. Omit to inherit the template topic; null disables topic inheritance for a direct send. Campaigns require a topic.",
    }),
  ),
  tracking: Schema.optionalKey(EmailTrackingOverrideV1),
  footer: Schema.optionalKey(EmailFooterOverride),
  headers: Schema.optionalKey(Schema.Union([EmailCustomHeaders, Schema.Null])),
}).annotate({ identifier: "EmailContent" });
export type ContactIdentity = {
  readonly id: ContactIdentityId;
  readonly type: "email" | "phone";
  readonly identifier: string;
  readonly verified: boolean;
  readonly channels: ReadonlyArray<ContactIdentityChannel>;
};
export const ContactIdentity = /* @__PURE__ */ Schema.Struct({
  id: ContactIdentityId,
  type: Schema.Union([Schema.Literal("email"), Schema.Literal("phone")]),
  identifier: Schema.String,
  verified: Schema.Boolean,
  channels: Schema.Array(ContactIdentityChannel),
}).annotate({ identifier: "ContactIdentity" });
export type BatchEventsPayload = {
  readonly events: readonly [CreateEventPayload, ...Array<CreateEventPayload>];
};
export const BatchEventsPayload = /* @__PURE__ */ Schema.Struct({
  events: Schema.TupleWithRest(Schema.Tuple([CreateEventPayload]), [CreateEventPayload]).check(
    Schema.isMaxLength(100).annotate({ expected: "a value with a length of at most 100" }),
  ),
}).annotate({ identifier: "BatchEventsPayload" });
export type TopicSetSubscriptionsPayload = {
  readonly contacts: ReadonlyArray<TopicContactRef>;
  readonly channel: "email";
  readonly status: "subscribed" | "unsubscribed";
  readonly source?: string | null;
};
export const TopicSetSubscriptionsPayload = /* @__PURE__ */ Schema.Struct({
  contacts: Schema.Array(TopicContactRef)
    .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }))
    .check(
      Schema.isMaxLength(1000).annotate({ expected: "a value with a length of at most 1000" }),
    ),
  channel: Schema.Literal("email"),
  status: Schema.Union([Schema.Literal("subscribed"), Schema.Literal("unsubscribed")]),
  source: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
      )
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isMaxLength(512).annotate({ expected: "a value with a length of at most 512" }),
        ),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "TopicSetSubscriptionsPayload" });
export type JourneyWaitForEventNode = {
  readonly type: "wait_for_event";
  readonly config: JourneyWaitForEventConfig;
  readonly next: readonly [JourneyWaitEventEdge, JourneyWaitEventEdge];
};
export const JourneyWaitForEventNode = /* @__PURE__ */ Schema.Struct({
  type: Schema.Literal("wait_for_event"),
  config: JourneyWaitForEventConfig,
  next: Schema.Tuple([JourneyWaitEventEdge, JourneyWaitEventEdge]),
}).annotate({ identifier: "JourneyWaitForEventNode" });
export type JourneyPredicate =
  | JourneyTagPredicate
  | JourneyPropertyPredicate
  | JourneyCustomFieldPredicate
  | JourneyEventPredicate;
export const JourneyPredicate = /* @__PURE__ */ Schema.Union([
  JourneyTagPredicate,
  JourneyPropertyPredicate,
  JourneyCustomFieldPredicate,
  JourneyEventPredicate,
]).annotate({ identifier: "JourneyPredicate" });
export class MailboxSendRefusedError extends Schema.TaggedError<MailboxSendRefusedError>()(
  "MailboxSendRefusedError",
  Schema.Struct({ message: Schema.String, receipt: MailboxSendReceipt }),
) {}
export class MailboxSendConflictError extends Schema.TaggedError<MailboxSendConflictError>()(
  "MailboxSendConflictError",
  Schema.Struct({
    message: Schema.String,
    resource: Schema.String,
    id: MailboxActionId,
    receipt: MailboxSendReceipt,
  }),
) {}
export type CreateAgentPayload = {
  readonly name: AgentName;
  readonly namespaceId?: NamespaceId | null;
  readonly definition?: AgentDefinition | null;
};
export const CreateAgentPayload = /* @__PURE__ */ Schema.Struct({
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
        integrationIds: [],
        mode: "supervised",
        model: "standard",
        approvalPolicy: "toolActions",
        workingHours: null,
        takeoverTimeoutMinutes: 30,
      },
    }),
  ),
}).annotate({ identifier: "CreateAgentPayload" });
export type ReplaceAgentDraftPayload = {
  readonly revision: string;
  readonly definition: AgentDefinition;
};
export const ReplaceAgentDraftPayload = /* @__PURE__ */ Schema.Struct({
  revision: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  ),
  definition: AgentDefinition,
}).annotate({ identifier: "ReplaceAgentDraftPayload" });
export type CampaignContentInput = {
  readonly channel: "email";
  readonly email: CampaignEmailInput;
  readonly from?: CampaignFrom;
  readonly replyMailboxId?: CampaignReplyMailbox;
  readonly conversationId?: CampaignConversationRef;
  readonly metadata?: CampaignContentMetadata;
};
export const CampaignContentInput = /* @__PURE__ */ Schema.Struct({
  channel: Schema.Literal("email"),
  email: CampaignEmailInput,
  from: Schema.optionalKey(CampaignFrom),
  replyMailboxId: Schema.optionalKey(CampaignReplyMailbox),
  conversationId: Schema.optionalKey(CampaignConversationRef),
  metadata: Schema.optionalKey(CampaignContentMetadata),
}).annotate({ identifier: "CampaignContentInput" });
export type EmailSendMessagePayload = {
  readonly conversationId?: ConversationId | null | null;
  readonly metadata?: MessageMetadata;
  readonly channel: "email";
  readonly to: EmailRecipients;
  readonly cc?: EmailCcRecipients;
  readonly bcc?: EmailBccRecipients;
  readonly from?: EmailSender;
  readonly email: EmailContent;
};
export const EmailSendMessagePayload = /* @__PURE__ */ Schema.Struct({
  conversationId: Schema.optionalKey(
    Schema.Union([Schema.Union([ConversationId, Schema.Null]), Schema.Null]),
  ),
  metadata: Schema.optionalKey(MessageMetadata),
  channel: Schema.Literal("email"),
  to: EmailRecipients,
  cc: Schema.optionalKey(EmailCcRecipients),
  bcc: Schema.optionalKey(EmailBccRecipients),
  from: Schema.optionalKey(EmailSender),
  email: EmailContent,
}).annotate({ identifier: "EmailSendMessagePayload" });
export type JourneyCondition = {
  readonly match: "all" | "any";
  readonly predicates: readonly [JourneyPredicate, ...Array<JourneyPredicate>];
};
export const JourneyCondition = /* @__PURE__ */ Schema.Struct({
  match: Schema.Union([Schema.Literal("all"), Schema.Literal("any")]),
  predicates: Schema.TupleWithRest(Schema.Tuple([JourneyPredicate]), [JourneyPredicate]),
}).annotate({ identifier: "JourneyCondition" });
export type CampaignComposition = {
  readonly content: CampaignContentInput;
  readonly audience: CampaignAudience;
  readonly contactId?: ContactId | null;
};
export const CampaignComposition = /* @__PURE__ */ Schema.Struct({
  content: CampaignContentInput,
  audience: CampaignAudience,
  contactId: Schema.optionalKey(Schema.Union([ContactId, Schema.Null])),
}).annotate({ identifier: "CampaignComposition" });
export type JourneyBranchEdge = {
  readonly nodeId: JourneyNodeId;
  readonly condition?: JourneyCondition;
};
export const JourneyBranchEdge = /* @__PURE__ */ Schema.Struct({
  nodeId: JourneyNodeId,
  condition: Schema.optionalKey(JourneyCondition),
}).annotate({ identifier: "JourneyBranchEdge" });
export type JourneyBranchNode = {
  readonly type: "branch";
  readonly config: JourneyEmptyConfig;
  readonly next: ReadonlyArray<JourneyBranchEdge>;
};
export const JourneyBranchNode = /* @__PURE__ */ Schema.Struct({
  type: Schema.Literal("branch"),
  config: JourneyEmptyConfig,
  next: Schema.Array(JourneyBranchEdge).check(
    Schema.isMinLength(2).annotate({ expected: "a value with a length of at least 2" }),
  ),
}).annotate({ identifier: "JourneyBranchNode" });
export type JourneyNode =
  | JourneySendEmailNode
  | JourneyWaitNode
  | JourneyWaitForEventNode
  | JourneyBranchNode
  | JourneyUpdateTagsNode
  | JourneyWebhookNode
  | JourneyExitNode;
export const JourneyNode = /* @__PURE__ */ Schema.Union([
  JourneySendEmailNode,
  JourneyWaitNode,
  JourneyWaitForEventNode,
  JourneyBranchNode,
  JourneyUpdateTagsNode,
  JourneyWebhookNode,
  JourneyExitNode,
]).annotate({ identifier: "JourneyNode" });
export type JourneyDefinition = {
  readonly trigger: JourneyTrigger;
  readonly rootNodeId: JourneyNodeId;
  readonly nodes: { readonly [x: string]: JourneyNode };
  readonly goal?: JourneyGoal;
  readonly reentry?: boolean;
};
export const JourneyDefinition = /* @__PURE__ */ Schema.Struct({
  trigger: JourneyTrigger,
  rootNodeId: JourneyNodeId,
  nodes: Schema.Record(Schema.String, JourneyNode)
    .check(Schema.isMinProperties(1).annotate({ expected: "a value with at least 1 entry" }))
    .check(Schema.isMaxProperties(200).annotate({ expected: "a value with at most 200 entries" })),
  goal: Schema.optionalKey(JourneyGoal),
  reentry: Schema.optionalKey(Schema.Boolean),
}).annotate({ identifier: "JourneyDefinition" });
export type CreateJourneyPayload = {
  readonly name: JourneyName;
  readonly definition: JourneyDefinition;
};
export const CreateJourneyPayload = /* @__PURE__ */ Schema.Struct({
  name: JourneyName,
  definition: JourneyDefinition,
}).annotate({ identifier: "CreateJourneyPayload" });
export type ReplaceJourneyDraftPayload = {
  readonly revision: string;
  readonly definition: JourneyDefinition;
};
export const ReplaceJourneyDraftPayload = /* @__PURE__ */ Schema.Struct({
  revision: Schema.String.check(
    Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
  ),
  definition: JourneyDefinition,
}).annotate({ identifier: "ReplaceJourneyDraftPayload" });
const __recursive_JsonValue = Schema.Union([
  Schema.String,
  Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
  Schema.Boolean,
  Schema.Null,
  Schema.Array(Schema.suspend((): Schema.Codec<JsonValue> => JsonValue)),
  Schema.Record(
    Schema.String,
    Schema.suspend((): Schema.Codec<JsonValue> => JsonValue),
  ),
]).annotate({ identifier: "JsonValue" });

export { __SamvaRuntimeAbsoluteInstant, __SamvaRuntimeSensitiveString };

export const ApiKeySecurity = HttpApiSecurity.apiKey({ key: "x-api-key", in: "header" });

export class ApiKeySecurityMiddleware extends HttpApiMiddleware.Service<ApiKeySecurityMiddleware>()(
  "apiKey security",
  { security: { apiKey: ApiKeySecurity } },
) {}
