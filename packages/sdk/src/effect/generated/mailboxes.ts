// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  AttachmentId,
  BillingProviderError,
  CampaignId,
  CampaignRunId,
  ConflictError,
  ConversationId,
  CreateMailboxChatDraftPayload,
  CreateMailboxEmailDraftPayload,
  CreateMailboxEndpointPayload,
  EmailAttachment,
  FlagDisabledError,
  ForbiddenError,
  GatewayTimeoutError,
  IntegrationId,
  InternalError,
  JsonObject,
  JsonValue,
  MailboxActionDecision,
  MailboxActionId,
  MailboxChannel,
  MailboxDraftId,
  MailboxEndpointId,
  MailboxGrantRole,
  MailboxId,
  MailboxLabelId,
  MailboxMetadata,
  MailboxMetadataPatch,
  MailboxSendConflictError,
  MailboxSendOutcome,
  MailboxSendReceipt,
  MailboxSendRefusedError,
  MailboxThreadFolder,
  MailboxThreadId,
  MailboxThreadPriority,
  MalformedRequestError,
  MediaId,
  MessageId,
  NamespaceId,
  OnboardingReviewRequiredError,
  PaymentRequiredError,
  PolicyDecider,
  PolicyDecisionId,
  PolicyEffect,
  PolicyRequirement,
  PolicyReviewRound,
  PolicySubject,
  RateLimitedError,
  ReplyMailboxChatPayload,
  ReplyMailboxEmailPayload,
  ResourceNotFoundError,
  SendMailboxChatPayload,
  SendMailboxEmailPayload,
  SenderNotReadyError,
  SkippedRecipient,
  SuccessResponse,
  TemplateId,
  UnauthorizedError,
  UserId,
  ValidationError,
  WhatsAppBusinessAccountId,
  WhatsAppServiceWindowClosedError,
} from "./shared";

export type MailboxKind = "personal" | "shared";
export const MailboxKind = /* @__PURE__ */ (() =>
  Schema.Union([Schema.Literal("personal"), Schema.Literal("shared")]).annotate({
    description: "Whether a mailbox belongs to one person or is shared with a team.",
    identifier: "MailboxKind",
  }))();
export type MailboxStatus = "active" | "paused";
export const MailboxStatus = /* @__PURE__ */ (() =>
  Schema.Union([Schema.Literal("active"), Schema.Literal("paused")]).annotate({
    identifier: "MailboxStatus",
  }))();
export type SmsPhoneNumberId = string & EffectBrand.Brand<"SmsPhoneNumberId">;
export const SmsPhoneNumberId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new globalThis.RegExp("^phone_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^phone_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "SmsPhoneNumberId",
    }),
  ).pipe(Schema.brand("SmsPhoneNumberId")))();
export type MailboxActionResolution = {
  readonly outcome: "approved" | "denied" | "cancelled";
  readonly actor: {
    readonly kind: "user" | "apiKey" | "extension" | "externalAgent" | "samvaAgent" | "system";
    readonly id: string;
    readonly displayName?: string | null;
    readonly source:
      | "humanUi"
      | "externalApi"
      | "externalAgent"
      | "extension"
      | "samvaManagedAgent"
      | "system";
  };
  readonly resolvedAt: string;
  readonly reason: string | null;
};
export const MailboxActionResolution = /* @__PURE__ */ (() =>
  Schema.Struct({
    outcome: Schema.Union([
      Schema.Literal("approved"),
      Schema.Literal("denied"),
      Schema.Literal("cancelled"),
    ]),
    actor: Schema.Struct({
      kind: Schema.Union([
        Schema.Literal("user"),
        Schema.Literal("apiKey"),
        Schema.Literal("extension"),
        Schema.Literal("externalAgent"),
        Schema.Literal("samvaAgent"),
        Schema.Literal("system"),
      ]),
      id: Schema.String,
      displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      source: Schema.Union([
        Schema.Literal("humanUi"),
        Schema.Literal("externalApi"),
        Schema.Literal("externalAgent"),
        Schema.Literal("extension"),
        Schema.Literal("samvaManagedAgent"),
        Schema.Literal("system"),
      ]),
    }).annotate({ description: "Who resolved the approval." }),
    resolvedAt: Schema.String,
    reason: Schema.Union([Schema.String, Schema.Null]).annotate({
      description: "The denial reason; null for an approval or a cancellation.",
    }),
  }).annotate({
    description: "How the action's approval ended.",
    identifier: "MailboxActionResolution",
  }))();
export type MailboxAlwaysAllow = {
  readonly by: "owner" | "admin" | "approver";
  readonly allowed: boolean;
};
export const MailboxAlwaysAllow = /* @__PURE__ */ (() =>
  Schema.Struct({
    by: Schema.Union([
      Schema.Literal("owner"),
      Schema.Literal("admin"),
      Schema.Literal("approver"),
    ]).annotate({
      description:
        "Who may approve with Always allow. `owner`: only the organization owner, because it lets an integration tool run without approval for every agent. `admin`: an organization owner or admin, because it adds a rule for one hosted agent or API key. `approver`: anyone who may approve the action.",
    }),
    allowed: Schema.Boolean.annotate({ description: "Whether the caller is someone `by` names." }),
  }).annotate({ identifier: "MailboxAlwaysAllow" }))();
export type TemplateChannelVariantId = string & EffectBrand.Brand<"TemplateChannelVariantId">;
export const TemplateChannelVariantId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new globalThis.RegExp("^tvar_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^tvar_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "TemplateChannelVariantId",
    }),
  ).pipe(Schema.brand("TemplateChannelVariantId")))();
export type MailboxToolCall = {
  readonly name: string;
  readonly argumentsHash: string;
  readonly arguments: { readonly [x: string]: JsonValue };
};
export const MailboxToolCall = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(128).annotate({ expected: "a string with at most 128 code points" }),
      )
      .check(
        Schema.isMaxLength(128).annotate({ expected: "a value with a length of at most 128" }),
      ),
    argumentsHash: Schema.String.check(
      Schema.isPattern(new globalThis.RegExp("^[0-9a-f]{64}$", "u")).annotate({
        expected: "a string matching the RegExp ^[0-9a-f]{64}$",
      }),
    ),
    arguments: Schema.Record(Schema.String, JsonValue),
  }).annotate({ identifier: "MailboxToolCall" }))();
export type MailboxHandoff = { readonly reason: string };
export const MailboxHandoff = /* @__PURE__ */ (() =>
  Schema.Struct({
    reason: Schema.String.annotate({
      description: "Why the conversation needs people, in the agent's words.",
    }),
  }).annotate({ identifier: "MailboxHandoff" }))();
export type MailboxAgentActivity = {
  readonly actions: {
    readonly byType: ReadonlyArray<{
      readonly type:
        | "sendMessage"
        | "reply"
        | "updateDraft"
        | "createNote"
        | "assignThread"
        | "changeThreadState"
        | "call"
        | "extensionRequest"
        | "toolCall"
        | "handoff";
      readonly count: number;
    }>;
    readonly byState: ReadonlyArray<{
      readonly state:
        | "proposed"
        | "allowed"
        | "approvalRequired"
        | "policyDenied"
        | "approved"
        | "approvalDenied"
        | "executing"
        | "executed"
        | "failed"
        | "queued"
        | "accepted"
        | "completed"
        | "notSent"
        | "uncertain";
      readonly count: number;
    }>;
  };
  readonly events: {
    readonly byType: ReadonlyArray<{
      readonly type:
        | "mailbox.created"
        | "endpoint.attached"
        | "endpoint.detached"
        | "message.received"
        | "message.released"
        | "message.sent"
        | "thread.created"
        | "action.proposed"
        | "action.policy_decided"
        | "action.approval_requested"
        | "action.approval_resolved"
        | "action.accepted"
        | "action.executed"
        | "action.failed";
      readonly count: number;
    }>;
  };
  readonly pendingApprovals: number;
};
export const MailboxAgentActivity = /* @__PURE__ */ (() =>
  Schema.Struct({
    actions: Schema.Struct({
      byType: Schema.Array(
        Schema.Struct({
          type: Schema.Union([
            Schema.Literal("sendMessage"),
            Schema.Literal("reply"),
            Schema.Literal("updateDraft"),
            Schema.Literal("createNote"),
            Schema.Literal("assignThread"),
            Schema.Literal("changeThreadState"),
            Schema.Literal("call"),
            Schema.Literal("extensionRequest"),
            Schema.Literal("toolCall"),
            Schema.Literal("handoff"),
          ]),
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
        }),
      ),
      byState: Schema.Array(
        Schema.Struct({
          state: Schema.Union([
            Schema.Literal("proposed"),
            Schema.Literal("allowed"),
            Schema.Literal("approvalRequired"),
            Schema.Literal("policyDenied"),
            Schema.Literal("approved"),
            Schema.Literal("approvalDenied"),
            Schema.Literal("executing"),
            Schema.Literal("executed"),
            Schema.Literal("failed"),
            Schema.Literal("queued"),
            Schema.Literal("accepted"),
            Schema.Literal("completed"),
            Schema.Literal("notSent"),
            Schema.Literal("uncertain"),
          ]),
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
        }),
      ),
    }),
    events: Schema.Struct({
      byType: Schema.Array(
        Schema.Struct({
          type: Schema.Union([
            Schema.Literal("mailbox.created"),
            Schema.Literal("endpoint.attached"),
            Schema.Literal("endpoint.detached"),
            Schema.Literal("message.received"),
            Schema.Literal("message.released"),
            Schema.Literal("message.sent"),
            Schema.Literal("thread.created"),
            Schema.Literal("action.proposed"),
            Schema.Literal("action.policy_decided"),
            Schema.Literal("action.approval_requested"),
            Schema.Literal("action.approval_resolved"),
            Schema.Literal("action.accepted"),
            Schema.Literal("action.executed"),
            Schema.Literal("action.failed"),
          ]),
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
        }),
      ),
    }),
    pendingApprovals: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  }).annotate({ identifier: "MailboxAgentActivity" }))();
export type MailboxDraftState = "saved" | "locked" | "sent";
export const MailboxDraftState = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Literal("saved"),
    Schema.Literal("locked"),
    Schema.Literal("sent"),
  ]).annotate({ identifier: "MailboxDraftState" }))();
export type MailboxEventId = string & EffectBrand.Brand<"MailboxEventId">;
export const MailboxEventId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new globalThis.RegExp("^mbxevt_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^mbxevt_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "MailboxEventId",
    }),
  ).pipe(Schema.brand("MailboxEventId")))();
export type MailboxGrantId = string & EffectBrand.Brand<"MailboxGrantId">;
export const MailboxGrantId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new globalThis.RegExp("^mbxacl_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^mbxacl_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "MailboxGrantId",
    }),
  ).pipe(Schema.brand("MailboxGrantId")))();
export type MailboxMessageSender = {
  readonly actor?: {
    readonly kind: "user" | "apiKey" | "extension" | "externalAgent" | "samvaAgent" | "system";
    readonly id: string;
    readonly displayName?: string | null;
  } | null;
  readonly displayName?: string | null;
  readonly address: string;
};
export const MailboxMessageSender = /* @__PURE__ */ (() =>
  Schema.Struct({
    actor: Schema.optionalKey(
      Schema.Union([
        Schema.Struct({
          kind: Schema.Union([
            Schema.Literal("user"),
            Schema.Literal("apiKey"),
            Schema.Literal("extension"),
            Schema.Literal("externalAgent"),
            Schema.Literal("samvaAgent"),
            Schema.Literal("system"),
          ]),
          id: Schema.String,
          displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    address: Schema.String,
  }).annotate({ identifier: "MailboxMessageSender" }))();
export type MailboxMessageRecipient = {
  readonly kind: "to" | "cc" | "bcc";
  readonly actor?: {
    readonly kind: "user" | "apiKey" | "extension" | "externalAgent" | "samvaAgent" | "system";
    readonly id: string;
    readonly displayName?: string | null;
  } | null;
  readonly displayName?: string | null;
  readonly address: string;
};
export const MailboxMessageRecipient = /* @__PURE__ */ (() =>
  Schema.Struct({
    kind: Schema.Union([Schema.Literal("to"), Schema.Literal("cc"), Schema.Literal("bcc")]),
    actor: Schema.optionalKey(
      Schema.Union([
        Schema.Struct({
          kind: Schema.Union([
            Schema.Literal("user"),
            Schema.Literal("apiKey"),
            Schema.Literal("extension"),
            Schema.Literal("externalAgent"),
            Schema.Literal("samvaAgent"),
            Schema.Literal("system"),
          ]),
          id: Schema.String,
          displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    address: Schema.String,
  }).annotate({ identifier: "MailboxMessageRecipient" }))();
export type MailboxMessageAuthentication = {
  readonly spf: string | null;
  readonly dkim: string | null;
  readonly dmarc: string | null;
};
export const MailboxMessageAuthentication = /* @__PURE__ */ (() =>
  Schema.Struct({
    spf: Schema.Union([Schema.String, Schema.Null]),
    dkim: Schema.Union([Schema.String, Schema.Null]),
    dmarc: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "MailboxMessageAuthentication" }))();
export type MailboxChatMedia = {
  readonly type: string;
  readonly contentType: string | null;
  readonly filename: string | null;
  readonly caption: string | null;
};
export const MailboxChatMedia = /* @__PURE__ */ (() =>
  Schema.Struct({
    type: Schema.String,
    contentType: Schema.Union([Schema.String, Schema.Null]),
    filename: Schema.Union([Schema.String, Schema.Null]),
    caption: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "MailboxChatMedia" }))();
export type MailboxChatMessageTemplate = { readonly name: string; readonly language: string };
export const MailboxChatMessageTemplate = /* @__PURE__ */ (() =>
  Schema.Struct({ name: Schema.String, language: Schema.String }).annotate({
    identifier: "MailboxChatMessageTemplate",
  }))();
export type MailboxDownloadUrl = { readonly url: string; readonly expiresAt: string };
export const MailboxDownloadUrl = /* @__PURE__ */ (() =>
  Schema.Struct({ url: Schema.String, expiresAt: Schema.String }).annotate({
    identifier: "MailboxDownloadUrl",
  }))();
export type MailboxThreadSender = {
  readonly address: string | null;
  readonly displayName: string | null;
};
export const MailboxThreadSender = /* @__PURE__ */ (() =>
  Schema.Struct({
    address: Schema.Union([Schema.String, Schema.Null]),
    displayName: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "MailboxThreadSender" }))();
export type MailboxThreadParticipant = {
  readonly actor: {
    readonly kind: "user" | "apiKey" | "extension" | "externalAgent" | "samvaAgent" | "system";
    readonly id: string;
    readonly displayName?: string | null;
  };
  readonly role: "recipient" | "sender" | "assignee" | "observer";
  readonly address?: string | null;
};
export const MailboxThreadParticipant = /* @__PURE__ */ (() =>
  Schema.Struct({
    actor: Schema.Struct({
      kind: Schema.Union([
        Schema.Literal("user"),
        Schema.Literal("apiKey"),
        Schema.Literal("extension"),
        Schema.Literal("externalAgent"),
        Schema.Literal("samvaAgent"),
        Schema.Literal("system"),
      ]),
      id: Schema.String,
      displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    }),
    role: Schema.Union([
      Schema.Literal("recipient"),
      Schema.Literal("sender"),
      Schema.Literal("assignee"),
      Schema.Literal("observer"),
    ]),
    address: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }).annotate({ identifier: "MailboxThreadParticipant" }))();
export type MailboxWhatsAppServiceWindow = {
  readonly open: boolean;
  readonly expiresAt: string | null;
};
export const MailboxWhatsAppServiceWindow = /* @__PURE__ */ (() =>
  Schema.Struct({
    open: Schema.Boolean,
    expiresAt: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "MailboxWhatsAppServiceWindow" }))();
export type MailboxNoteId = string & EffectBrand.Brand<"MailboxNoteId">;
export const MailboxNoteId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new globalThis.RegExp("^note_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^note_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "MailboxNoteId",
    }),
  ).pipe(Schema.brand("MailboxNoteId")))();
export type MailboxEmailEndpoint = {
  readonly id: MailboxEndpointId;
  readonly address: string;
  readonly displayName: string | null;
  readonly default: boolean;
  readonly channel: "email";
  readonly source: "samvaHosted" | "verifiedDomain";
  readonly domainId: string | null;
  readonly sendingStatus: "pending" | "ready" | "failed";
};
export const MailboxEmailEndpoint = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxEndpointId,
    address: Schema.String,
    displayName: Schema.Union([Schema.String, Schema.Null]),
    default: Schema.Boolean,
    channel: Schema.Literal("email"),
    source: Schema.Union([Schema.Literal("samvaHosted"), Schema.Literal("verifiedDomain")]),
    domainId: Schema.Union([Schema.String, Schema.Null]),
    sendingStatus: Schema.Union([
      Schema.Literal("pending"),
      Schema.Literal("ready"),
      Schema.Literal("failed"),
    ]).annotate({
      description:
        "Sending readiness. Pending means sending setup is incomplete. Send only when ready. If setup fails, contact support to recover the sending address.",
    }),
  }).annotate({ identifier: "MailboxEmailEndpoint" }))();
export type MailboxThreadMailbox = {
  readonly id: MailboxId;
  readonly address: string | null;
  readonly kind: "personal" | "shared";
};
export const MailboxThreadMailbox = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxId,
    address: Schema.Union([Schema.String, Schema.Null]),
    kind: Schema.Union([Schema.Literal("personal"), Schema.Literal("shared")]),
  }).annotate({ identifier: "MailboxThreadMailbox" }))();
export type MailboxCopiedAttachment = {
  readonly filename: string;
  readonly content?: string | null;
  readonly mediaId?: MediaId | null;
  readonly contentType: string;
  readonly size: number;
};
export const MailboxCopiedAttachment = /* @__PURE__ */ (() =>
  Schema.Struct({
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
  }).annotate({ identifier: "MailboxCopiedAttachment" }))();
export type PolicyAction =
  | {
      readonly effect: PolicyEffect;
      readonly resource: {
        readonly mailboxId: MailboxId;
        readonly channel?: "sms" | "whatsapp" | "email" | null;
        readonly integration?: string | null;
        readonly integrationId?: IntegrationId | null;
        readonly tool?: string | null;
      };
      readonly facts: JsonObject;
      readonly kind: "send" | "reply" | "toolCall";
      readonly args: JsonValue;
    }
  | {
      readonly effect: PolicyEffect;
      readonly resource: {
        readonly mailboxId: MailboxId;
        readonly channel?: "sms" | "whatsapp" | "email" | null;
        readonly integration?: string | null;
        readonly integrationId?: IntegrationId | null;
        readonly tool?: string | null;
      };
      readonly facts: JsonObject;
      readonly kind: "handoff";
      readonly args: { readonly reason: string; readonly draft?: JsonValue | null };
    };
export const PolicyAction = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Struct({
      effect: PolicyEffect,
      resource: Schema.Struct({
        mailboxId: MailboxId,
        channel: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.Literal("sms"),
              Schema.Literal("whatsapp"),
              Schema.Literal("email"),
            ]),
            Schema.Null,
          ]),
        ),
        integration: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            ),
            Schema.Null,
          ]),
        ),
        integrationId: Schema.optionalKey(Schema.Union([IntegrationId, Schema.Null])),
        tool: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      facts: JsonObject,
      kind: Schema.Union([
        Schema.Literal("send"),
        Schema.Literal("reply"),
        Schema.Literal("toolCall"),
      ]),
      args: JsonValue,
    }),
    Schema.Struct({
      effect: PolicyEffect,
      resource: Schema.Struct({
        mailboxId: MailboxId,
        channel: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.Literal("sms"),
              Schema.Literal("whatsapp"),
              Schema.Literal("email"),
            ]),
            Schema.Null,
          ]),
        ),
        integration: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            ),
            Schema.Null,
          ]),
        ),
        integrationId: Schema.optionalKey(Schema.Union([IntegrationId, Schema.Null])),
        tool: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            ),
            Schema.Null,
          ]),
        ),
      }),
      facts: JsonObject,
      kind: Schema.Literal("handoff"),
      args: Schema.Struct({
        reason: Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        ),
        draft: Schema.optionalKey(Schema.Union([JsonValue, Schema.Null])),
      }),
    }),
  ]).annotate({ identifier: "PolicyAction" }))();
export type MailboxWhatsAppEndpoint = {
  readonly id: MailboxEndpointId;
  readonly address: string;
  readonly displayName: string | null;
  readonly default: boolean;
  readonly channel: "whatsapp";
  readonly businessAccountId: WhatsAppBusinessAccountId;
};
export const MailboxWhatsAppEndpoint = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxEndpointId,
    address: Schema.String,
    displayName: Schema.Union([Schema.String, Schema.Null]),
    default: Schema.Boolean,
    channel: Schema.Literal("whatsapp"),
    businessAccountId: WhatsAppBusinessAccountId,
  }).annotate({ identifier: "MailboxWhatsAppEndpoint" }))();
export type MailboxWhatsAppEndpointBinding = {
  readonly channel: "whatsapp";
  readonly businessAccountId: WhatsAppBusinessAccountId;
};
export const MailboxWhatsAppEndpointBinding = /* @__PURE__ */ (() =>
  Schema.Struct({
    channel: Schema.Literal("whatsapp"),
    businessAccountId: WhatsAppBusinessAccountId,
  }).annotate({ identifier: "MailboxWhatsAppEndpointBinding" }))();
export type MailboxSummary = {
  readonly id: MailboxId;
  readonly kind: MailboxKind;
  readonly owner: UserId | null;
  readonly namespaceId: NamespaceId | null;
  readonly slug: string;
  readonly name: string;
  readonly status: MailboxStatus;
  readonly primaryAddress: string | null;
  readonly sendingStatus: "pending" | "ready" | "failed" | null;
  readonly createdAt: string;
};
export const MailboxSummary = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxId,
    kind: MailboxKind,
    owner: Schema.Union([UserId, Schema.Null]),
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
    slug: Schema.String,
    name: Schema.String,
    status: MailboxStatus,
    primaryAddress: Schema.Union([Schema.String, Schema.Null]),
    sendingStatus: Schema.Union([
      Schema.Union([Schema.Literal("pending"), Schema.Literal("ready"), Schema.Literal("failed")]),
      Schema.Null,
    ]),
    createdAt: Schema.String,
  }).annotate({ identifier: "MailboxSummary" }))();
export type MailboxSmsEndpoint = {
  readonly id: MailboxEndpointId;
  readonly address: string;
  readonly displayName: string | null;
  readonly default: boolean;
  readonly channel: "sms";
  readonly phoneNumberId: SmsPhoneNumberId;
};
export const MailboxSmsEndpoint = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxEndpointId,
    address: Schema.String,
    displayName: Schema.Union([Schema.String, Schema.Null]),
    default: Schema.Boolean,
    channel: Schema.Literal("sms"),
    phoneNumberId: SmsPhoneNumberId,
  }).annotate({ identifier: "MailboxSmsEndpoint" }))();
export type MailboxSmsEndpointBinding = {
  readonly channel: "sms";
  readonly phoneNumberId: SmsPhoneNumberId;
};
export const MailboxSmsEndpointBinding = /* @__PURE__ */ (() =>
  Schema.Struct({ channel: Schema.Literal("sms"), phoneNumberId: SmsPhoneNumberId }).annotate({
    identifier: "MailboxSmsEndpointBinding",
  }))();
export type MailboxQuarantinedMessage = {
  readonly id: MessageId;
  readonly disposition: "quarantined" | "isolated";
  readonly reason:
    | "spam"
    | "dmarc"
    | "virus"
    | "virus_unscanned"
    | "phishing"
    | "fraud"
    | "prompt_injection";
  readonly source: "receipt" | "classifier";
  readonly from: { readonly address: string; readonly name: string | null };
  readonly subject: string | null;
  readonly receivedAt: string;
  readonly heldAt: string;
  readonly releasedAt: string | null;
  readonly threadId: MailboxThreadId | null;
  readonly discardedAt: string | null;
};
export const MailboxQuarantinedMessage = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MessageId,
    disposition: Schema.Union([Schema.Literal("quarantined"), Schema.Literal("isolated")]),
    reason: Schema.Union([
      Schema.Literal("spam"),
      Schema.Literal("dmarc"),
      Schema.Literal("virus"),
      Schema.Literal("virus_unscanned"),
      Schema.Literal("phishing"),
      Schema.Literal("fraud"),
      Schema.Literal("prompt_injection"),
    ]),
    source: Schema.Union([Schema.Literal("receipt"), Schema.Literal("classifier")]),
    from: Schema.Struct({
      address: Schema.String,
      name: Schema.Union([Schema.String, Schema.Null]),
    }),
    subject: Schema.Union([Schema.String, Schema.Null]),
    receivedAt: Schema.String,
    heldAt: Schema.String,
    releasedAt: Schema.Union([Schema.String, Schema.Null]),
    threadId: Schema.Union([MailboxThreadId, Schema.Null]),
    discardedAt: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "MailboxQuarantinedMessage" }))();
export type MailboxChatTemplate = {
  readonly templateId: TemplateId;
  readonly templateChannelVariantId: TemplateChannelVariantId;
  readonly templateData: JsonObject | null;
};
export const MailboxChatTemplate = /* @__PURE__ */ (() =>
  Schema.Struct({
    templateId: TemplateId,
    templateChannelVariantId: TemplateChannelVariantId,
    templateData: Schema.Union([JsonObject, Schema.Null]),
  }).annotate({ identifier: "MailboxChatTemplate" }))();
export type MailboxDraftSummary = {
  readonly id: MailboxDraftId;
  readonly channel: MailboxChannel;
  readonly threadId: MailboxThreadId | null;
  readonly inReplyToMessageId: MessageId | null;
  readonly state: MailboxDraftState;
  readonly lockedByActionId: MailboxActionId | null;
  readonly to: ReadonlyArray<string>;
  readonly subject: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const MailboxDraftSummary = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxDraftId,
    channel: MailboxChannel,
    threadId: Schema.Union([MailboxThreadId, Schema.Null]),
    inReplyToMessageId: Schema.Union([MessageId, Schema.Null]),
    state: MailboxDraftState,
    lockedByActionId: Schema.Union([MailboxActionId, Schema.Null]),
    to: Schema.Array(Schema.String),
    subject: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "MailboxDraftSummary" }))();
export type MailboxChatDraft = {
  readonly id: MailboxDraftId;
  readonly channel: "whatsapp" | "sms";
  readonly threadId: MailboxThreadId | null;
  readonly inReplyToMessageId: MessageId | null;
  readonly state: MailboxDraftState;
  readonly lockedByActionId: MailboxActionId | null;
  readonly to: ReadonlyArray<string>;
  readonly subject: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly revision: number;
  readonly text: string | null;
};
export const MailboxChatDraft = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxDraftId,
    channel: Schema.Union([Schema.Literal("whatsapp"), Schema.Literal("sms")]),
    threadId: Schema.Union([MailboxThreadId, Schema.Null]),
    inReplyToMessageId: Schema.Union([MessageId, Schema.Null]),
    state: MailboxDraftState,
    lockedByActionId: Schema.Union([MailboxActionId, Schema.Null]),
    to: Schema.Array(Schema.String),
    subject: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
    revision: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    text: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "MailboxChatDraft" }))();
export type MailboxEvent = {
  readonly id: MailboxEventId;
  readonly type:
    | "mailbox.created"
    | "endpoint.attached"
    | "endpoint.detached"
    | "message.received"
    | "message.released"
    | "message.sent"
    | "thread.created"
    | "action.proposed"
    | "action.policy_decided"
    | "action.approval_requested"
    | "action.approval_resolved"
    | "action.accepted"
    | "action.executed"
    | "action.failed";
  readonly threadId: MailboxThreadId | null;
  readonly actionId: MailboxActionId | null;
  readonly actor: {
    readonly kind: "user" | "apiKey" | "extension" | "externalAgent" | "samvaAgent" | "system";
    readonly id: string;
    readonly displayName?: string | null;
  };
  readonly payload: { readonly [x: string]: JsonValue };
  readonly occurredAt: string;
};
export const MailboxEvent = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxEventId,
    type: Schema.Union([
      Schema.Literal("mailbox.created"),
      Schema.Literal("endpoint.attached"),
      Schema.Literal("endpoint.detached"),
      Schema.Literal("message.received"),
      Schema.Literal("message.released"),
      Schema.Literal("message.sent"),
      Schema.Literal("thread.created"),
      Schema.Literal("action.proposed"),
      Schema.Literal("action.policy_decided"),
      Schema.Literal("action.approval_requested"),
      Schema.Literal("action.approval_resolved"),
      Schema.Literal("action.accepted"),
      Schema.Literal("action.executed"),
      Schema.Literal("action.failed"),
    ]),
    threadId: Schema.Union([MailboxThreadId, Schema.Null]),
    actionId: Schema.Union([MailboxActionId, Schema.Null]),
    actor: Schema.Struct({
      kind: Schema.Union([
        Schema.Literal("user"),
        Schema.Literal("apiKey"),
        Schema.Literal("extension"),
        Schema.Literal("externalAgent"),
        Schema.Literal("samvaAgent"),
        Schema.Literal("system"),
      ]),
      id: Schema.String,
      displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    }),
    payload: Schema.Record(Schema.String, JsonValue),
    occurredAt: Schema.String,
  }).annotate({ identifier: "MailboxEvent" }))();
export type MailboxFolderCount = {
  readonly folder: MailboxThreadFolder;
  readonly count: number;
  readonly unreadCount: number;
};
export const MailboxFolderCount = /* @__PURE__ */ (() =>
  Schema.Struct({
    folder: MailboxThreadFolder,
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
    unreadCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  }).annotate({ identifier: "MailboxFolderCount" }))();
export type MailboxGrant = {
  readonly id: MailboxGrantId;
  readonly actor: {
    readonly kind: "user" | "apiKey" | "extension" | "externalAgent" | "samvaAgent" | "system";
    readonly id: string;
    readonly displayName?: string | null;
  };
  readonly permissions: ReadonlyArray<
    | "mailbox:read"
    | "mailbox:configure"
    | "thread:read"
    | "thread:write"
    | "label:write"
    | "draft:write"
    | "note:write"
    | "action:propose"
    | "action:approve"
    | "policy:read"
    | "quarantine:read"
    | "quarantine:release"
  >;
  readonly createdAt: string;
};
export const MailboxGrant = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxGrantId,
    actor: Schema.Struct({
      kind: Schema.Union([
        Schema.Literal("user"),
        Schema.Literal("apiKey"),
        Schema.Literal("extension"),
        Schema.Literal("externalAgent"),
        Schema.Literal("samvaAgent"),
        Schema.Literal("system"),
      ]),
      id: Schema.String,
      displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    }),
    permissions: Schema.Array(
      Schema.Union([
        Schema.Literal("mailbox:read"),
        Schema.Literal("mailbox:configure"),
        Schema.Literal("thread:read"),
        Schema.Literal("thread:write"),
        Schema.Literal("label:write"),
        Schema.Literal("draft:write"),
        Schema.Literal("note:write"),
        Schema.Literal("action:propose"),
        Schema.Literal("action:approve"),
        Schema.Literal("policy:read"),
        Schema.Literal("quarantine:read"),
        Schema.Literal("quarantine:release"),
      ]),
    ),
    createdAt: Schema.String,
  }).annotate({ identifier: "MailboxGrant" }))();
export type MailboxLabel = {
  readonly id: MailboxLabelId;
  readonly slug: string;
  readonly displayName: string;
  readonly color: "billing" | "domain" | "agent" | "routing" | "important" | "neutral" | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const MailboxLabel = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxLabelId,
    slug: Schema.String,
    displayName: Schema.String,
    color: Schema.Union([
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
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "MailboxLabel" }))();
export type MailboxMessageSummary = {
  readonly id: MessageId;
  readonly campaign?: { readonly campaignId: CampaignId; readonly runId: CampaignRunId } | null;
  readonly channel: MailboxChannel;
  readonly direction: "inbound" | "outbound";
  readonly from: MailboxMessageSender;
  readonly to: ReadonlyArray<string>;
  readonly subject: string | null;
  readonly preview: string | null;
  readonly hasAttachments: boolean;
  readonly occurredAt: string;
};
export const MailboxMessageSummary = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MessageId,
    campaign: Schema.optionalKey(
      Schema.Union([Schema.Struct({ campaignId: CampaignId, runId: CampaignRunId }), Schema.Null]),
    ),
    channel: MailboxChannel,
    direction: Schema.Union([Schema.Literal("inbound"), Schema.Literal("outbound")]),
    from: MailboxMessageSender,
    to: Schema.Array(Schema.String),
    subject: Schema.Union([Schema.String, Schema.Null]),
    preview: Schema.Union([Schema.String, Schema.Null]),
    hasAttachments: Schema.Boolean,
    occurredAt: Schema.String,
  }).annotate({ identifier: "MailboxMessageSummary" }))();
export type MailboxEmailMessage = {
  readonly id: MessageId;
  readonly campaign?: { readonly campaignId: CampaignId; readonly runId: CampaignRunId } | null;
  readonly threadId: MailboxThreadId;
  readonly conversationId: ConversationId;
  readonly direction: "inbound" | "outbound";
  readonly from: MailboxMessageSender;
  readonly sentBy?: {
    readonly kind: "user" | "apiKey" | "extension" | "externalAgent" | "samvaAgent" | "system";
    readonly id: string;
    readonly displayName?: string | null;
  } | null;
  readonly occurredAt: string;
  readonly channel: "email";
  readonly recipients: ReadonlyArray<MailboxMessageRecipient>;
  readonly replyTo: ReadonlyArray<string>;
  readonly subject?: string | null;
  readonly text?: string | null;
  readonly html?: string | null;
  readonly replyText?: string | null;
  readonly headers: {
    readonly messageId: string | null;
    readonly inReplyTo: string | null;
    readonly references: ReadonlyArray<string>;
  };
  readonly authentication: MailboxMessageAuthentication | null;
  readonly attachments: ReadonlyArray<{
    readonly id: AttachmentId;
    readonly filename: string;
    readonly contentType: string;
    readonly size: number;
    readonly isInline: boolean;
  }>;
};
export const MailboxEmailMessage = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MessageId,
    campaign: Schema.optionalKey(
      Schema.Union([Schema.Struct({ campaignId: CampaignId, runId: CampaignRunId }), Schema.Null]),
    ),
    threadId: MailboxThreadId,
    conversationId: ConversationId,
    direction: Schema.Union([Schema.Literal("inbound"), Schema.Literal("outbound")]),
    from: MailboxMessageSender,
    sentBy: Schema.optionalKey(
      Schema.Union([
        Schema.Struct({
          kind: Schema.Union([
            Schema.Literal("user"),
            Schema.Literal("apiKey"),
            Schema.Literal("extension"),
            Schema.Literal("externalAgent"),
            Schema.Literal("samvaAgent"),
            Schema.Literal("system"),
          ]),
          id: Schema.String,
          displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    occurredAt: Schema.String,
    channel: Schema.Literal("email"),
    recipients: Schema.Array(MailboxMessageRecipient),
    replyTo: Schema.Array(Schema.String),
    subject: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    text: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    html: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    replyText: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    headers: Schema.Struct({
      messageId: Schema.Union([Schema.String, Schema.Null]),
      inReplyTo: Schema.Union([Schema.String, Schema.Null]),
      references: Schema.Array(Schema.String),
    }),
    authentication: Schema.Union([MailboxMessageAuthentication, Schema.Null]),
    attachments: Schema.Array(
      Schema.Struct({
        id: AttachmentId,
        filename: Schema.String,
        contentType: Schema.String,
        size: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        isInline: Schema.Boolean,
      }),
    ),
  }).annotate({ identifier: "MailboxEmailMessage" }))();
export type MailboxChatMessage = {
  readonly id: MessageId;
  readonly campaign?: { readonly campaignId: CampaignId; readonly runId: CampaignRunId } | null;
  readonly threadId: MailboxThreadId;
  readonly conversationId: ConversationId;
  readonly direction: "inbound" | "outbound";
  readonly from: MailboxMessageSender;
  readonly sentBy?: {
    readonly kind: "user" | "apiKey" | "extension" | "externalAgent" | "samvaAgent" | "system";
    readonly id: string;
    readonly displayName?: string | null;
  } | null;
  readonly occurredAt: string;
  readonly channel: "whatsapp" | "sms";
  readonly to: ReadonlyArray<string>;
  readonly text: string | null;
  readonly media: ReadonlyArray<MailboxChatMedia>;
  readonly template: MailboxChatMessageTemplate | null;
  readonly summary: string | null;
  readonly contextMessageId: MessageId | null;
};
export const MailboxChatMessage = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MessageId,
    campaign: Schema.optionalKey(
      Schema.Union([Schema.Struct({ campaignId: CampaignId, runId: CampaignRunId }), Schema.Null]),
    ),
    threadId: MailboxThreadId,
    conversationId: ConversationId,
    direction: Schema.Union([Schema.Literal("inbound"), Schema.Literal("outbound")]),
    from: MailboxMessageSender,
    sentBy: Schema.optionalKey(
      Schema.Union([
        Schema.Struct({
          kind: Schema.Union([
            Schema.Literal("user"),
            Schema.Literal("apiKey"),
            Schema.Literal("extension"),
            Schema.Literal("externalAgent"),
            Schema.Literal("samvaAgent"),
            Schema.Literal("system"),
          ]),
          id: Schema.String,
          displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
    occurredAt: Schema.String,
    channel: Schema.Union([Schema.Literal("whatsapp"), Schema.Literal("sms")]),
    to: Schema.Array(Schema.String),
    text: Schema.Union([Schema.String, Schema.Null]),
    media: Schema.Array(MailboxChatMedia),
    template: Schema.Union([MailboxChatMessageTemplate, Schema.Null]),
    summary: Schema.Union([Schema.String, Schema.Null]),
    contextMessageId: Schema.Union([MessageId, Schema.Null]),
  }).annotate({ identifier: "MailboxChatMessage" }))();
export type MailboxThreadSummary = {
  readonly id: MailboxThreadId;
  readonly channel: MailboxChannel;
  readonly endpointId: MailboxEndpointId | null;
  readonly subject: string | null;
  readonly preview: string | null;
  readonly from: MailboxThreadSender | null;
  readonly messageCount: number;
  readonly hasAttachments: boolean;
  readonly hasDraft: boolean;
  readonly folder: MailboxThreadFolder;
  readonly priority: MailboxThreadPriority;
  readonly labels: ReadonlyArray<MailboxLabelId>;
  readonly read: boolean;
  readonly starred: boolean;
  readonly snoozedUntil: string | null;
  readonly doneAt: string | null;
  readonly closedAt: string | null;
  readonly closedBy: {
    readonly kind: "user" | "apiKey" | "extension" | "externalAgent" | "samvaAgent" | "system";
    readonly id: string;
    readonly displayName?: string | null;
  } | null;
  readonly lastActivityAt: string;
};
export const MailboxThreadSummary = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxThreadId,
    channel: MailboxChannel,
    endpointId: Schema.Union([MailboxEndpointId, Schema.Null]),
    subject: Schema.Union([Schema.String, Schema.Null]),
    preview: Schema.Union([Schema.String, Schema.Null]),
    from: Schema.Union([MailboxThreadSender, Schema.Null]),
    messageCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    hasAttachments: Schema.Boolean,
    hasDraft: Schema.Boolean,
    folder: MailboxThreadFolder,
    priority: MailboxThreadPriority,
    labels: Schema.Array(MailboxLabelId),
    read: Schema.Boolean,
    starred: Schema.Boolean,
    snoozedUntil: Schema.Union([Schema.String, Schema.Null]),
    doneAt: Schema.Union([Schema.String, Schema.Null]),
    closedAt: Schema.Union([Schema.String, Schema.Null]),
    closedBy: Schema.Union([
      Schema.Struct({
        kind: Schema.Union([
          Schema.Literal("user"),
          Schema.Literal("apiKey"),
          Schema.Literal("extension"),
          Schema.Literal("externalAgent"),
          Schema.Literal("samvaAgent"),
          Schema.Literal("system"),
        ]),
        id: Schema.String,
        displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
    lastActivityAt: Schema.String,
  }).annotate({ identifier: "MailboxThreadSummary" }))();
export type MailboxThreadState = {
  readonly id: MailboxThreadId;
  readonly folder: MailboxThreadFolder;
  readonly priority: MailboxThreadPriority;
  readonly labels: ReadonlyArray<MailboxLabelId>;
  readonly read: boolean;
  readonly starred: boolean;
  readonly snoozedUntil: string | null;
  readonly doneAt: string | null;
  readonly closedAt: string | null;
  readonly closedBy: {
    readonly kind: "user" | "apiKey" | "extension" | "externalAgent" | "samvaAgent" | "system";
    readonly id: string;
    readonly displayName?: string | null;
  } | null;
};
export const MailboxThreadState = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxThreadId,
    folder: MailboxThreadFolder,
    priority: MailboxThreadPriority,
    labels: Schema.Array(MailboxLabelId),
    read: Schema.Boolean,
    starred: Schema.Boolean,
    snoozedUntil: Schema.Union([Schema.String, Schema.Null]),
    doneAt: Schema.Union([Schema.String, Schema.Null]),
    closedAt: Schema.Union([Schema.String, Schema.Null]),
    closedBy: Schema.Union([
      Schema.Struct({
        kind: Schema.Union([
          Schema.Literal("user"),
          Schema.Literal("apiKey"),
          Schema.Literal("extension"),
          Schema.Literal("externalAgent"),
          Schema.Literal("samvaAgent"),
          Schema.Literal("system"),
        ]),
        id: Schema.String,
        displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
  }).annotate({ identifier: "MailboxThreadState" }))();
export type MailboxThread = {
  readonly id: MailboxThreadId;
  readonly channel: MailboxChannel;
  readonly endpointId: MailboxEndpointId | null;
  readonly subject: string | null;
  readonly preview: string | null;
  readonly from: MailboxThreadSender | null;
  readonly messageCount: number;
  readonly hasAttachments: boolean;
  readonly hasDraft: boolean;
  readonly folder: MailboxThreadFolder;
  readonly priority: MailboxThreadPriority;
  readonly labels: ReadonlyArray<MailboxLabelId>;
  readonly read: boolean;
  readonly starred: boolean;
  readonly snoozedUntil: string | null;
  readonly doneAt: string | null;
  readonly closedAt: string | null;
  readonly closedBy: {
    readonly kind: "user" | "apiKey" | "extension" | "externalAgent" | "samvaAgent" | "system";
    readonly id: string;
    readonly displayName?: string | null;
  } | null;
  readonly lastActivityAt: string;
  readonly conversationId: ConversationId;
  readonly participants: ReadonlyArray<MailboxThreadParticipant>;
  readonly whatsappServiceWindow: MailboxWhatsAppServiceWindow | null;
  readonly createdAt: string;
};
export const MailboxThread = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxThreadId,
    channel: MailboxChannel,
    endpointId: Schema.Union([MailboxEndpointId, Schema.Null]),
    subject: Schema.Union([Schema.String, Schema.Null]),
    preview: Schema.Union([Schema.String, Schema.Null]),
    from: Schema.Union([MailboxThreadSender, Schema.Null]),
    messageCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    hasAttachments: Schema.Boolean,
    hasDraft: Schema.Boolean,
    folder: MailboxThreadFolder,
    priority: MailboxThreadPriority,
    labels: Schema.Array(MailboxLabelId),
    read: Schema.Boolean,
    starred: Schema.Boolean,
    snoozedUntil: Schema.Union([Schema.String, Schema.Null]),
    doneAt: Schema.Union([Schema.String, Schema.Null]),
    closedAt: Schema.Union([Schema.String, Schema.Null]),
    closedBy: Schema.Union([
      Schema.Struct({
        kind: Schema.Union([
          Schema.Literal("user"),
          Schema.Literal("apiKey"),
          Schema.Literal("extension"),
          Schema.Literal("externalAgent"),
          Schema.Literal("samvaAgent"),
          Schema.Literal("system"),
        ]),
        id: Schema.String,
        displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
    lastActivityAt: Schema.String,
    conversationId: ConversationId,
    participants: Schema.Array(MailboxThreadParticipant),
    whatsappServiceWindow: Schema.Union([MailboxWhatsAppServiceWindow, Schema.Null]),
    createdAt: Schema.String,
  }).annotate({ identifier: "MailboxThread" }))();
export type MailboxNote = {
  readonly id: MailboxNoteId;
  readonly author: {
    readonly kind: "user" | "apiKey" | "extension" | "externalAgent" | "samvaAgent" | "system";
    readonly id: string;
    readonly displayName?: string | null;
  };
  readonly body: string;
  readonly color: string | null;
  readonly pinned: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const MailboxNote = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxNoteId,
    author: Schema.Struct({
      kind: Schema.Union([
        Schema.Literal("user"),
        Schema.Literal("apiKey"),
        Schema.Literal("extension"),
        Schema.Literal("externalAgent"),
        Schema.Literal("samvaAgent"),
        Schema.Literal("system"),
      ]),
      id: Schema.String,
      displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    }),
    body: Schema.String,
    color: Schema.Union([Schema.String, Schema.Null]),
    pinned: Schema.Boolean,
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "MailboxNote" }))();
export type OrganizationMailboxDraftSummary = {
  readonly id: MailboxDraftId;
  readonly channel: MailboxChannel;
  readonly threadId: MailboxThreadId | null;
  readonly inReplyToMessageId: MessageId | null;
  readonly state: MailboxDraftState;
  readonly lockedByActionId: MailboxActionId | null;
  readonly to: ReadonlyArray<string>;
  readonly subject: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly mailbox: MailboxThreadMailbox;
};
export const OrganizationMailboxDraftSummary = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxDraftId,
    channel: MailboxChannel,
    threadId: Schema.Union([MailboxThreadId, Schema.Null]),
    inReplyToMessageId: Schema.Union([MessageId, Schema.Null]),
    state: MailboxDraftState,
    lockedByActionId: Schema.Union([MailboxActionId, Schema.Null]),
    to: Schema.Array(Schema.String),
    subject: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
    mailbox: MailboxThreadMailbox,
  }).annotate({ identifier: "OrganizationMailboxDraftSummary" }))();
export type OrganizationMailboxThreadSummary = {
  readonly id: MailboxThreadId;
  readonly channel: MailboxChannel;
  readonly endpointId: MailboxEndpointId | null;
  readonly subject: string | null;
  readonly preview: string | null;
  readonly from: MailboxThreadSender | null;
  readonly messageCount: number;
  readonly hasAttachments: boolean;
  readonly hasDraft: boolean;
  readonly folder: MailboxThreadFolder;
  readonly priority: MailboxThreadPriority;
  readonly labels: ReadonlyArray<MailboxLabelId>;
  readonly read: boolean;
  readonly starred: boolean;
  readonly snoozedUntil: string | null;
  readonly doneAt: string | null;
  readonly closedAt: string | null;
  readonly closedBy: {
    readonly kind: "user" | "apiKey" | "extension" | "externalAgent" | "samvaAgent" | "system";
    readonly id: string;
    readonly displayName?: string | null;
  } | null;
  readonly lastActivityAt: string;
  readonly mailbox: MailboxThreadMailbox;
};
export const OrganizationMailboxThreadSummary = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxThreadId,
    channel: MailboxChannel,
    endpointId: Schema.Union([MailboxEndpointId, Schema.Null]),
    subject: Schema.Union([Schema.String, Schema.Null]),
    preview: Schema.Union([Schema.String, Schema.Null]),
    from: Schema.Union([MailboxThreadSender, Schema.Null]),
    messageCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    hasAttachments: Schema.Boolean,
    hasDraft: Schema.Boolean,
    folder: MailboxThreadFolder,
    priority: MailboxThreadPriority,
    labels: Schema.Array(MailboxLabelId),
    read: Schema.Boolean,
    starred: Schema.Boolean,
    snoozedUntil: Schema.Union([Schema.String, Schema.Null]),
    doneAt: Schema.Union([Schema.String, Schema.Null]),
    closedAt: Schema.Union([Schema.String, Schema.Null]),
    closedBy: Schema.Union([
      Schema.Struct({
        kind: Schema.Union([
          Schema.Literal("user"),
          Schema.Literal("apiKey"),
          Schema.Literal("extension"),
          Schema.Literal("externalAgent"),
          Schema.Literal("samvaAgent"),
          Schema.Literal("system"),
        ]),
        id: Schema.String,
        displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      }),
      Schema.Null,
    ]),
    lastActivityAt: Schema.String,
    mailbox: MailboxThreadMailbox,
  }).annotate({ identifier: "OrganizationMailboxThreadSummary" }))();
export type MailboxEmailSendSnapshot = {
  readonly channel: "email";
  readonly draftRevision: number;
  readonly from: string;
  readonly fromName: string | null;
  readonly to: readonly [string, ...Array<string>];
  readonly cc: ReadonlyArray<string>;
  readonly bcc: ReadonlyArray<string>;
  readonly replyTo: ReadonlyArray<string>;
  readonly subject: string;
  readonly text: string | null;
  readonly html: string | null;
  readonly attachments: ReadonlyArray<EmailAttachment>;
  readonly threadId: MailboxThreadId | null;
  readonly conversationId: ConversationId | null;
  readonly inReplyToMessageId: MessageId | null;
};
export const MailboxEmailSendSnapshot = /* @__PURE__ */ (() =>
  Schema.Struct({
    channel: Schema.Literal("email"),
    draftRevision: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
      .check(
        Schema.isLessThanOrEqualTo(9007199254740991).annotate({
          expected: "a value less than or equal to 9007199254740991",
        }),
      )
      .check(Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" })),
    from: Schema.String,
    fromName: Schema.Union([Schema.String, Schema.Null]),
    to: Schema.TupleWithRest(Schema.Tuple([Schema.String]), [Schema.String]),
    cc: Schema.Array(Schema.String),
    bcc: Schema.Array(Schema.String),
    replyTo: Schema.Array(Schema.String),
    subject: Schema.String,
    text: Schema.Union([Schema.String, Schema.Null]),
    html: Schema.Union([Schema.String, Schema.Null]),
    attachments: Schema.Array(EmailAttachment).check(
      Schema.isMaxLength(10).annotate({ expected: "a value with a length of at most 10" }),
    ),
    threadId: Schema.Union([MailboxThreadId, Schema.Null]),
    conversationId: Schema.Union([ConversationId, Schema.Null]),
    inReplyToMessageId: Schema.Union([MessageId, Schema.Null]),
  }).annotate({ identifier: "MailboxEmailSendSnapshot" }))();
export type MailboxEmailDraft = {
  readonly id: MailboxDraftId;
  readonly channel: "email";
  readonly threadId: MailboxThreadId | null;
  readonly inReplyToMessageId: MessageId | null;
  readonly state: MailboxDraftState;
  readonly lockedByActionId: MailboxActionId | null;
  readonly to: ReadonlyArray<string>;
  readonly subject: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly revision: number;
  readonly endpointId: MailboxEndpointId | null;
  readonly cc: ReadonlyArray<string>;
  readonly bcc: ReadonlyArray<string>;
  readonly replyTo: ReadonlyArray<string>;
  readonly html: string | null;
  readonly text: string | null;
  readonly attachments: ReadonlyArray<EmailAttachment>;
};
export const MailboxEmailDraft = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxDraftId,
    channel: Schema.Literal("email"),
    threadId: Schema.Union([MailboxThreadId, Schema.Null]),
    inReplyToMessageId: Schema.Union([MessageId, Schema.Null]),
    state: MailboxDraftState,
    lockedByActionId: Schema.Union([MailboxActionId, Schema.Null]),
    to: Schema.Array(Schema.String),
    subject: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
    revision: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    endpointId: Schema.Union([MailboxEndpointId, Schema.Null]),
    cc: Schema.Array(Schema.String),
    bcc: Schema.Array(Schema.String),
    replyTo: Schema.Array(Schema.String),
    html: Schema.Union([Schema.String, Schema.Null]),
    text: Schema.Union([Schema.String, Schema.Null]),
    attachments: Schema.Array(EmailAttachment).check(
      Schema.isMaxLength(10).annotate({ expected: "a value with a length of at most 10" }),
    ),
  }).annotate({ identifier: "MailboxEmailDraft" }))();
export type PolicyDecision = {
  readonly requirement: PolicyRequirement;
  readonly decider: PolicyDecider;
  readonly outcome: "allow" | "hold" | "refuse";
  readonly reason: string;
  readonly scopes: ReadonlyArray<{
    readonly kind: "organization" | "integration" | "mailbox" | "agent" | "apiKey";
    readonly id: string;
  }>;
  readonly rule?: {
    readonly scope: {
      readonly kind: "organization" | "integration" | "mailbox" | "agent" | "apiKey";
      readonly id: string;
    };
    readonly index: number;
  } | null;
  readonly guard?: string | null;
  readonly guardReason?: string | null;
  readonly id: PolicyDecisionId;
  readonly reviewRound: PolicyReviewRound;
  readonly subject: PolicySubject;
  readonly action: PolicyAction;
  readonly judge?: {
    readonly model: string;
    readonly instructionVersion?: string | null;
    readonly instructionHash?: string | null;
    readonly ms: number;
    readonly usage: JsonObject;
  } | null;
  readonly resolution?: {
    readonly by: UserId;
    readonly at: string;
    readonly as: "approved" | "edited" | "denied" | "alwaysAllowed";
    readonly diff?: {
      readonly text?: { readonly before: string | null; readonly after: string | null } | null;
      readonly html?: { readonly before: string | null; readonly after: string | null } | null;
    } | null;
  } | null;
};
export const PolicyDecision = /* @__PURE__ */ (() =>
  Schema.Struct({
    requirement: PolicyRequirement,
    decider: PolicyDecider,
    outcome: Schema.Union([
      Schema.Literal("allow"),
      Schema.Literal("hold"),
      Schema.Literal("refuse"),
    ]),
    reason: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    ),
    scopes: Schema.Array(
      Schema.Struct({
        kind: Schema.Union([
          Schema.Literal("organization"),
          Schema.Literal("integration"),
          Schema.Literal("mailbox"),
          Schema.Literal("agent"),
          Schema.Literal("apiKey"),
        ]),
        id: Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        ),
      }),
    ),
    rule: Schema.optionalKey(
      Schema.Union([
        Schema.Struct({
          scope: Schema.Struct({
            kind: Schema.Union([
              Schema.Literal("organization"),
              Schema.Literal("integration"),
              Schema.Literal("mailbox"),
              Schema.Literal("agent"),
              Schema.Literal("apiKey"),
            ]),
            id: Schema.String.check(
              Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
            ),
          }),
          index: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    guard: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        ),
        Schema.Null,
      ]),
    ),
    guardReason: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
        ),
        Schema.Null,
      ]),
    ),
    id: PolicyDecisionId,
    reviewRound: PolicyReviewRound,
    subject: PolicySubject,
    action: PolicyAction,
    judge: Schema.optionalKey(
      Schema.Union([
        Schema.Struct({
          model: Schema.String.check(
            Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
          ),
          instructionVersion: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
              ),
              Schema.Null,
            ]),
          ),
          instructionHash: Schema.optionalKey(
            Schema.Union([
              Schema.String.check(
                Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
              ),
              Schema.Null,
            ]),
          ),
          ms: Schema.Finite.check(
            Schema.isFinite().annotate({ expected: "a finite number" }),
          ).check(
            Schema.isGreaterThanOrEqualTo(0).annotate({
              expected: "a value greater than or equal to 0",
            }),
          ),
          usage: JsonObject,
        }),
        Schema.Null,
      ]),
    ),
    resolution: Schema.optionalKey(
      Schema.Union([
        Schema.Struct({
          by: UserId,
          at: Schema.String,
          as: Schema.Union([
            Schema.Literal("approved"),
            Schema.Literal("edited"),
            Schema.Literal("denied"),
            Schema.Literal("alwaysAllowed"),
          ]),
          diff: Schema.optionalKey(
            Schema.Union([
              Schema.Struct({
                text: Schema.optionalKey(
                  Schema.Union([
                    Schema.Struct({
                      before: Schema.Union([Schema.String, Schema.Null]),
                      after: Schema.Union([Schema.String, Schema.Null]),
                    }),
                    Schema.Null,
                  ]),
                ),
                html: Schema.optionalKey(
                  Schema.Union([
                    Schema.Struct({
                      before: Schema.Union([Schema.String, Schema.Null]),
                      after: Schema.Union([Schema.String, Schema.Null]),
                    }),
                    Schema.Null,
                  ]),
                ),
              }),
              Schema.Null,
            ]),
          ),
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({ identifier: "PolicyDecision" }))();
export type MailboxPage = {
  readonly items: ReadonlyArray<MailboxSummary>;
  readonly nextCursor: string | null;
};
export const MailboxPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(MailboxSummary),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "MailboxPage" }))();
export type MailboxEndpoint = MailboxEmailEndpoint | MailboxWhatsAppEndpoint | MailboxSmsEndpoint;
export const MailboxEndpoint = /* @__PURE__ */ (() =>
  Schema.Union([MailboxEmailEndpoint, MailboxWhatsAppEndpoint, MailboxSmsEndpoint]).annotate({
    identifier: "MailboxEndpoint",
  }))();
export type MailboxQuarantinePage = {
  readonly items: ReadonlyArray<MailboxQuarantinedMessage>;
  readonly nextCursor: string | null;
};
export const MailboxQuarantinePage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(MailboxQuarantinedMessage),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "MailboxQuarantinePage" }))();
export type MailboxNonSendAction = {
  readonly id: MailboxActionId;
  readonly source:
    | "humanUi"
    | "externalApi"
    | "aiSdkTool"
    | "extension"
    | "externalAgent"
    | "samvaManagedAgent"
    | "system";
  readonly proposedBy: {
    readonly kind: "user" | "apiKey" | "extension" | "externalAgent" | "samvaAgent" | "system";
    readonly id: string;
    readonly displayName?: string | null;
  };
  readonly threadId: MailboxThreadId | null;
  readonly draftId: MailboxDraftId | null;
  readonly decision: MailboxActionDecision | null;
  readonly resolution: MailboxActionResolution | null;
  readonly alwaysAllow: MailboxAlwaysAllow | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly type:
    | "updateDraft"
    | "createNote"
    | "assignThread"
    | "changeThreadState"
    | "call"
    | "extensionRequest"
    | "toolCall"
    | "handoff";
  readonly state:
    | "proposed"
    | "allowed"
    | "approvalRequired"
    | "policyDenied"
    | "approved"
    | "approvalDenied"
    | "executing"
    | "executed"
    | "failed";
  readonly tool: MailboxToolCall | null;
  readonly handoff: MailboxHandoff | null;
};
export const MailboxNonSendAction = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxActionId,
    source: Schema.Union([
      Schema.Literal("humanUi"),
      Schema.Literal("externalApi"),
      Schema.Literal("aiSdkTool"),
      Schema.Literal("extension"),
      Schema.Literal("externalAgent"),
      Schema.Literal("samvaManagedAgent"),
      Schema.Literal("system"),
    ]),
    proposedBy: Schema.Struct({
      kind: Schema.Union([
        Schema.Literal("user"),
        Schema.Literal("apiKey"),
        Schema.Literal("extension"),
        Schema.Literal("externalAgent"),
        Schema.Literal("samvaAgent"),
        Schema.Literal("system"),
      ]),
      id: Schema.String,
      displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    }),
    threadId: Schema.Union([MailboxThreadId, Schema.Null]),
    draftId: Schema.Union([MailboxDraftId, Schema.Null]),
    decision: Schema.Union([MailboxActionDecision, Schema.Null]),
    resolution: Schema.Union([MailboxActionResolution, Schema.Null]).annotate({
      description:
        "How a held action's approval ended: who approved, denied, or cancelled it, when, and the denial reason. Null while it waits for approval and for an action that never needed one.",
    }),
    alwaysAllow: Schema.Union([MailboxAlwaysAllow, Schema.Null]).annotate({
      description:
        "Who may approve this held action with Always allow, and whether the caller may. Null for an action that is not held, a hand-off, and a reply held for integration data.",
    }),
    createdAt: Schema.String,
    updatedAt: Schema.String,
    type: Schema.Union([
      Schema.Literal("updateDraft"),
      Schema.Literal("createNote"),
      Schema.Literal("assignThread"),
      Schema.Literal("changeThreadState"),
      Schema.Literal("call"),
      Schema.Literal("extensionRequest"),
      Schema.Literal("toolCall"),
      Schema.Literal("handoff"),
    ]),
    state: Schema.Union([
      Schema.Literal("proposed"),
      Schema.Literal("allowed"),
      Schema.Literal("approvalRequired"),
      Schema.Literal("policyDenied"),
      Schema.Literal("approved"),
      Schema.Literal("approvalDenied"),
      Schema.Literal("executing"),
      Schema.Literal("executed"),
      Schema.Literal("failed"),
    ]),
    tool: Schema.Union([MailboxToolCall, Schema.Null]).annotate({
      description:
        "The tool a `toolCall` runs, with its arguments and their hash; an approval covers exactly this call. Null for every other action type.",
    }),
    handoff: Schema.Union([MailboxHandoff, Schema.Null]).annotate({
      description:
        "The hand-off a `handoff` asks for, with the agent's reason for handing the conversation to people. Null for every other action type.",
    }),
  }).annotate({ identifier: "MailboxNonSendAction" }))();
export type MailboxPendingSendReceipt = {
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
export const MailboxPendingSendReceipt = /* @__PURE__ */ (() =>
  Schema.Struct({
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
  }).annotate({ identifier: "MailboxPendingSendReceipt" }))();
export type MailboxChatSendIntent = {
  readonly channel: "whatsapp" | "sms";
  readonly draftRevision: number;
  readonly endpointId: MailboxEndpointId;
  readonly sender: MailboxWhatsAppEndpointBinding | MailboxSmsEndpointBinding;
  readonly from: string;
  readonly to: string;
  readonly text: string | null;
  readonly template: MailboxChatTemplate | null;
  readonly threadId: MailboxThreadId | null;
  readonly conversationId: ConversationId | null;
  readonly inReplyToMessageId: MessageId | null;
};
export const MailboxChatSendIntent = /* @__PURE__ */ (() =>
  Schema.Struct({
    channel: Schema.Union([Schema.Literal("whatsapp"), Schema.Literal("sms")]),
    draftRevision: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
      .check(
        Schema.isLessThanOrEqualTo(9007199254740991).annotate({
          expected: "a value less than or equal to 9007199254740991",
        }),
      )
      .check(Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" })),
    endpointId: MailboxEndpointId,
    sender: Schema.Union([MailboxWhatsAppEndpointBinding, MailboxSmsEndpointBinding]),
    from: Schema.String,
    to: Schema.String,
    text: Schema.Union([Schema.String, Schema.Null]),
    template: Schema.Union([MailboxChatTemplate, Schema.Null]),
    threadId: Schema.Union([MailboxThreadId, Schema.Null]),
    conversationId: Schema.Union([ConversationId, Schema.Null]),
    inReplyToMessageId: Schema.Union([MessageId, Schema.Null]),
  }).annotate({ identifier: "MailboxChatSendIntent" }))();
export type MailboxDraftPage = {
  readonly items: ReadonlyArray<MailboxDraftSummary>;
  readonly nextCursor: string | null;
};
export const MailboxDraftPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(MailboxDraftSummary),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "MailboxDraftPage" }))();
export type MailboxEventPage = {
  readonly items: ReadonlyArray<MailboxEvent>;
  readonly nextCursor: string | null;
};
export const MailboxEventPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(MailboxEvent),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "MailboxEventPage" }))();
export type MailboxFolderCountList = { readonly items: ReadonlyArray<MailboxFolderCount> };
export const MailboxFolderCountList = /* @__PURE__ */ (() =>
  Schema.Struct({ items: Schema.Array(MailboxFolderCount) }).annotate({
    identifier: "MailboxFolderCountList",
  }))();
export type MailboxGrantPage = {
  readonly items: ReadonlyArray<MailboxGrant>;
  readonly nextCursor: string | null;
};
export const MailboxGrantPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(MailboxGrant),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "MailboxGrantPage" }))();
export type MailboxLabelList = { readonly items: ReadonlyArray<MailboxLabel> };
export const MailboxLabelList = /* @__PURE__ */ (() =>
  Schema.Struct({ items: Schema.Array(MailboxLabel) }).annotate({
    identifier: "MailboxLabelList",
  }))();
export type MailboxMessagePage = {
  readonly items: ReadonlyArray<MailboxMessageSummary>;
  readonly nextCursor: string | null;
};
export const MailboxMessagePage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(MailboxMessageSummary),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "MailboxMessagePage" }))();
export type MailboxMessage = MailboxEmailMessage | MailboxChatMessage;
export const MailboxMessage = /* @__PURE__ */ (() =>
  Schema.Union([MailboxEmailMessage, MailboxChatMessage]).annotate({
    identifier: "MailboxMessage",
  }))();
export type MailboxThreadPage = {
  readonly items: ReadonlyArray<MailboxThreadSummary>;
  readonly nextCursor: string | null;
};
export const MailboxThreadPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(MailboxThreadSummary),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "MailboxThreadPage" }))();
export type MailboxNotePage = {
  readonly items: ReadonlyArray<MailboxNote>;
  readonly nextCursor: string | null;
};
export const MailboxNotePage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(MailboxNote),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "MailboxNotePage" }))();
export type OrganizationMailboxDraftPage = {
  readonly items: ReadonlyArray<OrganizationMailboxDraftSummary>;
  readonly nextCursor: string | null;
};
export const OrganizationMailboxDraftPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(OrganizationMailboxDraftSummary),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "OrganizationMailboxDraftPage" }))();
export type OrganizationMailboxThreadPage = {
  readonly items: ReadonlyArray<OrganizationMailboxThreadSummary>;
  readonly nextCursor: string | null;
};
export const OrganizationMailboxThreadPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(OrganizationMailboxThreadSummary),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "OrganizationMailboxThreadPage" }))();
export type MailboxDraft = MailboxEmailDraft | MailboxChatDraft;
export const MailboxDraft = /* @__PURE__ */ (() =>
  Schema.Union([MailboxEmailDraft, MailboxChatDraft]).annotate({ identifier: "MailboxDraft" }))();
export type Mailbox = {
  readonly id: MailboxId;
  readonly kind: MailboxKind;
  readonly owner: UserId | null;
  readonly namespaceId: NamespaceId | null;
  readonly slug: string;
  readonly name: string;
  readonly status: MailboxStatus;
  readonly primaryAddress: string | null;
  readonly sendingStatus: "pending" | "ready" | "failed" | null;
  readonly createdAt: string;
  readonly description: string | null;
  readonly metadata: MailboxMetadata;
  readonly endpoints: ReadonlyArray<MailboxEndpoint>;
  readonly updatedAt: string;
};
export const Mailbox = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxId,
    kind: MailboxKind,
    owner: Schema.Union([UserId, Schema.Null]),
    namespaceId: Schema.Union([NamespaceId, Schema.Null]),
    slug: Schema.String,
    name: Schema.String,
    status: MailboxStatus,
    primaryAddress: Schema.Union([Schema.String, Schema.Null]),
    sendingStatus: Schema.Union([
      Schema.Union([Schema.Literal("pending"), Schema.Literal("ready"), Schema.Literal("failed")]),
      Schema.Null,
    ]),
    createdAt: Schema.String,
    description: Schema.Union([Schema.String, Schema.Null]),
    metadata: MailboxMetadata,
    endpoints: Schema.Array(MailboxEndpoint),
    updatedAt: Schema.String,
  }).annotate({ identifier: "Mailbox" }))();
export type MailboxSendSnapshot = MailboxEmailSendSnapshot | MailboxChatSendIntent;
export const MailboxSendSnapshot = /* @__PURE__ */ (() =>
  Schema.Union([MailboxEmailSendSnapshot, MailboxChatSendIntent]).annotate({
    identifier: "MailboxSendSnapshot",
  }))();
export type MailboxThreadContentPage = {
  readonly items: ReadonlyArray<MailboxMessage>;
  readonly nextCursor: string | null;
};
export const MailboxThreadContentPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(MailboxMessage),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "MailboxThreadContentPage" }))();
export type MailboxSendAction = {
  readonly id: MailboxActionId;
  readonly source:
    | "humanUi"
    | "externalApi"
    | "aiSdkTool"
    | "extension"
    | "externalAgent"
    | "samvaManagedAgent"
    | "system";
  readonly proposedBy: {
    readonly kind: "user" | "apiKey" | "extension" | "externalAgent" | "samvaAgent" | "system";
    readonly id: string;
    readonly displayName?: string | null;
  };
  readonly threadId: MailboxThreadId | null;
  readonly draftId: MailboxDraftId | null;
  readonly decision: MailboxActionDecision | null;
  readonly resolution: MailboxActionResolution | null;
  readonly alwaysAllow: MailboxAlwaysAllow | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly type: "sendMessage" | "reply";
  readonly state:
    | "approvalRequired"
    | "queued"
    | "accepted"
    | "completed"
    | "notSent"
    | "uncertain";
  readonly send: MailboxSendReceipt;
  readonly intent: MailboxSendSnapshot | null;
};
export const MailboxSendAction = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MailboxActionId,
    source: Schema.Union([
      Schema.Literal("humanUi"),
      Schema.Literal("externalApi"),
      Schema.Literal("aiSdkTool"),
      Schema.Literal("extension"),
      Schema.Literal("externalAgent"),
      Schema.Literal("samvaManagedAgent"),
      Schema.Literal("system"),
    ]),
    proposedBy: Schema.Struct({
      kind: Schema.Union([
        Schema.Literal("user"),
        Schema.Literal("apiKey"),
        Schema.Literal("extension"),
        Schema.Literal("externalAgent"),
        Schema.Literal("samvaAgent"),
        Schema.Literal("system"),
      ]),
      id: Schema.String,
      displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    }),
    threadId: Schema.Union([MailboxThreadId, Schema.Null]),
    draftId: Schema.Union([MailboxDraftId, Schema.Null]),
    decision: Schema.Union([MailboxActionDecision, Schema.Null]),
    resolution: Schema.Union([MailboxActionResolution, Schema.Null]).annotate({
      description:
        "How a held action's approval ended: who approved, denied, or cancelled it, when, and the denial reason. Null while it waits for approval and for an action that never needed one.",
    }),
    alwaysAllow: Schema.Union([MailboxAlwaysAllow, Schema.Null]).annotate({
      description:
        "Who may approve this held action with Always allow, and whether the caller may. Null for an action that is not held, a hand-off, and a reply held for integration data.",
    }),
    createdAt: Schema.String,
    updatedAt: Schema.String,
    type: Schema.Union([Schema.Literal("sendMessage"), Schema.Literal("reply")]),
    state: Schema.Union([
      Schema.Literal("approvalRequired"),
      Schema.Literal("queued"),
      Schema.Literal("accepted"),
      Schema.Literal("completed"),
      Schema.Literal("notSent"),
      Schema.Literal("uncertain"),
    ]),
    send: MailboxSendReceipt,
    intent: Schema.Union([MailboxSendSnapshot, Schema.Null]),
  }).annotate({ identifier: "MailboxSendAction" }))();
export type MailboxNeedsYouItem =
  | {
      readonly type: "heldAction";
      readonly actionType:
        | "sendMessage"
        | "reply"
        | "updateDraft"
        | "createNote"
        | "assignThread"
        | "changeThreadState"
        | "call"
        | "extensionRequest"
        | "toolCall"
        | "handoff";
      readonly decision: PolicyDecision;
      readonly tool: MailboxToolCall | null;
      readonly intent: MailboxSendSnapshot | null;
      readonly id: MailboxActionId;
      readonly mailbox: MailboxThreadMailbox;
      readonly threadId: MailboxThreadId | null;
      readonly draftId: MailboxDraftId | null;
      readonly proposedBy: {
        readonly kind: "user" | "apiKey" | "extension" | "externalAgent" | "samvaAgent" | "system";
        readonly id: string;
        readonly displayName?: string | null;
      };
      readonly source:
        | "humanUi"
        | "externalApi"
        | "aiSdkTool"
        | "extension"
        | "externalAgent"
        | "samvaManagedAgent"
        | "system";
      readonly alwaysAllow: MailboxAlwaysAllow | null;
      readonly createdAt: string;
    }
  | {
      readonly type: "quarantinedMessage";
      readonly id: MessageId;
      readonly mailbox: MailboxThreadMailbox;
      readonly reason:
        | "spam"
        | "dmarc"
        | "virus"
        | "virus_unscanned"
        | "phishing"
        | "fraud"
        | "prompt_injection";
      readonly source: "receipt" | "classifier";
      readonly heldAt: string;
    };
export const MailboxNeedsYouItem = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Struct({
      type: Schema.Literal("heldAction"),
      actionType: Schema.Union([
        Schema.Literal("sendMessage"),
        Schema.Literal("reply"),
        Schema.Literal("updateDraft"),
        Schema.Literal("createNote"),
        Schema.Literal("assignThread"),
        Schema.Literal("changeThreadState"),
        Schema.Literal("call"),
        Schema.Literal("extensionRequest"),
        Schema.Literal("toolCall"),
        Schema.Literal("handoff"),
      ]),
      decision: PolicyDecision,
      tool: Schema.Union([MailboxToolCall, Schema.Null]),
      intent: Schema.Union([MailboxSendSnapshot, Schema.Null]),
      id: MailboxActionId,
      mailbox: MailboxThreadMailbox,
      threadId: Schema.Union([MailboxThreadId, Schema.Null]),
      draftId: Schema.Union([MailboxDraftId, Schema.Null]),
      proposedBy: Schema.Struct({
        kind: Schema.Union([
          Schema.Literal("user"),
          Schema.Literal("apiKey"),
          Schema.Literal("extension"),
          Schema.Literal("externalAgent"),
          Schema.Literal("samvaAgent"),
          Schema.Literal("system"),
        ]),
        id: Schema.String,
        displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      }),
      source: Schema.Union([
        Schema.Literal("humanUi"),
        Schema.Literal("externalApi"),
        Schema.Literal("aiSdkTool"),
        Schema.Literal("extension"),
        Schema.Literal("externalAgent"),
        Schema.Literal("samvaManagedAgent"),
        Schema.Literal("system"),
      ]),
      alwaysAllow: Schema.Union([MailboxAlwaysAllow, Schema.Null]),
      createdAt: Schema.String,
    }),
    Schema.Struct({
      type: Schema.Literal("quarantinedMessage"),
      id: MessageId,
      mailbox: MailboxThreadMailbox,
      reason: Schema.Union([
        Schema.Literal("spam"),
        Schema.Literal("dmarc"),
        Schema.Literal("virus"),
        Schema.Literal("virus_unscanned"),
        Schema.Literal("phishing"),
        Schema.Literal("fraud"),
        Schema.Literal("prompt_injection"),
      ]),
      source: Schema.Union([Schema.Literal("receipt"), Schema.Literal("classifier")]),
      heldAt: Schema.String,
    }),
  ]).annotate({ identifier: "MailboxNeedsYouItem" }))();
export type MailboxAction = MailboxSendAction | MailboxNonSendAction;
export const MailboxAction = /* @__PURE__ */ (() =>
  Schema.Union([MailboxSendAction, MailboxNonSendAction]).annotate({
    identifier: "MailboxAction",
  }))();
export type MailboxPendingAction = MailboxSendAction | MailboxNonSendAction;
export const MailboxPendingAction = /* @__PURE__ */ (() =>
  Schema.Union([MailboxSendAction, MailboxNonSendAction]).annotate({
    identifier: "MailboxPendingAction",
  }))();
export type MailboxNeedsYou = {
  readonly items: ReadonlyArray<MailboxNeedsYouItem>;
  readonly nextCursor: string | null;
  readonly counts: {
    readonly heldActions: number;
    readonly quarantinedMessages: number;
    readonly total: number;
  };
};
export const MailboxNeedsYou = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(MailboxNeedsYouItem),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
    counts: Schema.Struct({
      heldActions: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      quarantinedMessages: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      total: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    }).annotate({
      description: "All items this caller may decide, independent of the current page.",
    }),
  }).annotate({ identifier: "MailboxNeedsYou" }))();
export type MailboxActionPage = {
  readonly items: ReadonlyArray<MailboxAction>;
  readonly nextCursor: string | null;
};
export const MailboxActionPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(MailboxAction),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "MailboxActionPage" }))();
export type MailboxesListQuery = {
  readonly limit?: number | null;
  readonly cursor?: string;
  readonly after?: string;
  readonly before?: string;
  readonly namespaceId?: NamespaceId;
};
export const MailboxesListQuery = /* @__PURE__ */ (() =>
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
    after: Schema.optionalKey(Schema.String),
    before: Schema.optionalKey(Schema.String),
    namespaceId: Schema.optionalKey(NamespaceId),
  }))();
export type MailboxesList200 = MailboxPage;
export const MailboxesList200 = MailboxPage;
export type MailboxesList400 = MalformedRequestError;
export const MailboxesList400 = MalformedRequestError;
export type MailboxesList401 = UnauthorizedError;
export const MailboxesList401 = UnauthorizedError;
export type MailboxesList403 = ForbiddenError;
export const MailboxesList403 = ForbiddenError;
export type MailboxesList422 = ValidationError;
export const MailboxesList422 = ValidationError;
export type MailboxesList500 = InternalError;
export const MailboxesList500 = InternalError;
export type MailboxesList504 = GatewayTimeoutError;
export const MailboxesList504 = GatewayTimeoutError;
export type MailboxesCreateHeaders = { readonly "idempotency-key"?: string };
export const MailboxesCreateHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Optional key that makes mailbox creation idempotent for the calling key or member. The same key and body return the original mailbox in its current state. A different body with the same key returns 409. Keep the key after a lost response; it remains bound for the mailbox's lifetime.",
      }).check(
        Schema.isPattern(new globalThis.RegExp("^[\\s\\S]{1,255}$")).annotate({
          expected: "a string matching the RegExp ^[\\s\\S]{1,255}$",
        }),
      ),
    ),
  }))();
export type MailboxesCreateRequestJson = {
  readonly namespaceId?: NamespaceId | null;
  readonly endpoint: CreateMailboxEndpointPayload;
  readonly name: string;
  readonly slug?: string | null;
  readonly metadata?: MailboxMetadata | null;
};
export const MailboxesCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
    endpoint: CreateMailboxEndpointPayload,
    name: Schema.String.check(
      Schema.isMaxCodePoints(120).annotate({ expected: "a string with at most 120 code points" }),
    ).check(Schema.isMaxLength(120).annotate({ expected: "a value with a length of at most 120" })),
    slug: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    metadata: Schema.optionalKey(Schema.Union([MailboxMetadata, Schema.Null])),
  }))();
export type MailboxesCreate201 = Mailbox;
export const MailboxesCreate201 = Mailbox;
export type MailboxesCreate400 = MalformedRequestError;
export const MailboxesCreate400 = MalformedRequestError;
export type MailboxesCreate401 = UnauthorizedError;
export const MailboxesCreate401 = UnauthorizedError;
export type MailboxesCreate402 = PaymentRequiredError;
export const MailboxesCreate402 = PaymentRequiredError;
export type MailboxesCreate403 = FlagDisabledError | ForbiddenError;
export const MailboxesCreate403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type MailboxesCreate404 = ResourceNotFoundError;
export const MailboxesCreate404 = ResourceNotFoundError;
export type MailboxesCreate409 = ConflictError;
export const MailboxesCreate409 = ConflictError;
export type MailboxesCreate422 = ValidationError;
export const MailboxesCreate422 = ValidationError;
export type MailboxesCreate500 = InternalError;
export const MailboxesCreate500 = InternalError;
export type MailboxesCreate502 = BillingProviderError;
export const MailboxesCreate502 = BillingProviderError;
export type MailboxesCreate504 = GatewayTimeoutError;
export const MailboxesCreate504 = GatewayTimeoutError;
export type MailboxesGetPathParams = { readonly id: MailboxId };
export const MailboxesGetPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: MailboxId }))();
export type MailboxesGet200 = Mailbox;
export const MailboxesGet200 = Mailbox;
export type MailboxesGet400 = MalformedRequestError;
export const MailboxesGet400 = MalformedRequestError;
export type MailboxesGet401 = UnauthorizedError;
export const MailboxesGet401 = UnauthorizedError;
export type MailboxesGet403 = ForbiddenError;
export const MailboxesGet403 = ForbiddenError;
export type MailboxesGet404 = ResourceNotFoundError;
export const MailboxesGet404 = ResourceNotFoundError;
export type MailboxesGet422 = ValidationError;
export const MailboxesGet422 = ValidationError;
export type MailboxesGet500 = InternalError;
export const MailboxesGet500 = InternalError;
export type MailboxesGet504 = GatewayTimeoutError;
export const MailboxesGet504 = GatewayTimeoutError;
export type MailboxesRemovePathParams = { readonly id: MailboxId };
export const MailboxesRemovePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: MailboxId }))();
export type MailboxesRemove200 = SuccessResponse;
export const MailboxesRemove200 = SuccessResponse;
export type MailboxesRemove400 = MalformedRequestError;
export const MailboxesRemove400 = MalformedRequestError;
export type MailboxesRemove401 = UnauthorizedError;
export const MailboxesRemove401 = UnauthorizedError;
export type MailboxesRemove403 = ForbiddenError;
export const MailboxesRemove403 = ForbiddenError;
export type MailboxesRemove404 = ResourceNotFoundError;
export const MailboxesRemove404 = ResourceNotFoundError;
export type MailboxesRemove422 = ValidationError;
export const MailboxesRemove422 = ValidationError;
export type MailboxesRemove500 = InternalError;
export const MailboxesRemove500 = InternalError;
export type MailboxesRemove502 = BillingProviderError;
export const MailboxesRemove502 = BillingProviderError;
export type MailboxesRemove504 = GatewayTimeoutError;
export const MailboxesRemove504 = GatewayTimeoutError;
export type MailboxesUpdatePathParams = { readonly id: MailboxId };
export const MailboxesUpdatePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: MailboxId }))();
export type MailboxesUpdateRequestJson = {
  readonly name?: string | null;
  readonly metadata?: MailboxMetadataPatch | null;
};
export const MailboxesUpdateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
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
    metadata: Schema.optionalKey(Schema.Union([MailboxMetadataPatch, Schema.Null])),
  }))();
export type MailboxesUpdate200 = Mailbox;
export const MailboxesUpdate200 = Mailbox;
export type MailboxesUpdate400 = MalformedRequestError;
export const MailboxesUpdate400 = MalformedRequestError;
export type MailboxesUpdate401 = UnauthorizedError;
export const MailboxesUpdate401 = UnauthorizedError;
export type MailboxesUpdate403 = ForbiddenError;
export const MailboxesUpdate403 = ForbiddenError;
export type MailboxesUpdate404 = ResourceNotFoundError;
export const MailboxesUpdate404 = ResourceNotFoundError;
export type MailboxesUpdate422 = ValidationError;
export const MailboxesUpdate422 = ValidationError;
export type MailboxesUpdate500 = InternalError;
export const MailboxesUpdate500 = InternalError;
export type MailboxesUpdate504 = GatewayTimeoutError;
export const MailboxesUpdate504 = GatewayTimeoutError;
export type MailboxesListActionsPathParams = { readonly id: MailboxId };
export const MailboxesListActionsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId }))();
export type MailboxesListActionsQuery = {
  readonly limit?: number | null;
  readonly cursor?: string;
  readonly threadId?: MailboxThreadId;
  readonly state?:
    | "proposed"
    | "allowed"
    | "approvalRequired"
    | "policyDenied"
    | "approved"
    | "approvalDenied"
    | "executing"
    | "executed"
    | "failed"
    | "queued"
    | "accepted"
    | "completed"
    | "notSent"
    | "uncertain";
  readonly after?: string;
  readonly before?: string;
};
export const MailboxesListActionsQuery = /* @__PURE__ */ (() =>
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
    threadId: Schema.optionalKey(MailboxThreadId),
    state: Schema.optionalKey(
      Schema.Union([
        Schema.Literal("proposed"),
        Schema.Literal("allowed"),
        Schema.Literal("approvalRequired"),
        Schema.Literal("policyDenied"),
        Schema.Literal("approved"),
        Schema.Literal("approvalDenied"),
        Schema.Literal("executing"),
        Schema.Literal("executed"),
        Schema.Literal("failed"),
        Schema.Literal("queued"),
        Schema.Literal("accepted"),
        Schema.Literal("completed"),
        Schema.Literal("notSent"),
        Schema.Literal("uncertain"),
      ]),
    ),
    after: Schema.optionalKey(Schema.String),
    before: Schema.optionalKey(Schema.String),
  }))();
export type MailboxesListActions200 = MailboxActionPage;
export const MailboxesListActions200 = MailboxActionPage;
export type MailboxesListActions400 = MalformedRequestError;
export const MailboxesListActions400 = MalformedRequestError;
export type MailboxesListActions401 = UnauthorizedError;
export const MailboxesListActions401 = UnauthorizedError;
export type MailboxesListActions403 = ForbiddenError;
export const MailboxesListActions403 = ForbiddenError;
export type MailboxesListActions404 = ResourceNotFoundError;
export const MailboxesListActions404 = ResourceNotFoundError;
export type MailboxesListActions422 = ValidationError;
export const MailboxesListActions422 = ValidationError;
export type MailboxesListActions500 = InternalError;
export const MailboxesListActions500 = InternalError;
export type MailboxesListActions504 = GatewayTimeoutError;
export const MailboxesListActions504 = GatewayTimeoutError;
export type MailboxesGetActionPathParams = {
  readonly id: MailboxId;
  readonly actionId: MailboxActionId;
};
export const MailboxesGetActionPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, actionId: MailboxActionId }))();
export type MailboxesGetAction200 = MailboxAction;
export const MailboxesGetAction200 = MailboxAction;
export type MailboxesGetAction400 = MalformedRequestError;
export const MailboxesGetAction400 = MalformedRequestError;
export type MailboxesGetAction401 = UnauthorizedError;
export const MailboxesGetAction401 = UnauthorizedError;
export type MailboxesGetAction403 = ForbiddenError;
export const MailboxesGetAction403 = ForbiddenError;
export type MailboxesGetAction404 = ResourceNotFoundError;
export const MailboxesGetAction404 = ResourceNotFoundError;
export type MailboxesGetAction422 = ValidationError;
export const MailboxesGetAction422 = ValidationError;
export type MailboxesGetAction500 = InternalError;
export const MailboxesGetAction500 = InternalError;
export type MailboxesGetAction504 = GatewayTimeoutError;
export const MailboxesGetAction504 = GatewayTimeoutError;
export type MailboxesApproveActionPathParams = {
  readonly id: MailboxId;
  readonly actionId: MailboxActionId;
};
export const MailboxesApproveActionPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, actionId: MailboxActionId }))();
export type MailboxesApproveActionRequestJson = {
  readonly reviewRound: PolicyReviewRound;
  readonly always?: boolean | null;
  readonly edits?: { readonly text?: string | null; readonly html?: string | null } | null;
};
export const MailboxesApproveActionRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    reviewRound: PolicyReviewRound,
    always: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    edits: Schema.optionalKey(
      Schema.Union([
        Schema.Struct({
          text: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
          html: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        }),
        Schema.Null,
      ]),
    ),
  }))();
export type MailboxesApproveAction200 = MailboxAction;
export const MailboxesApproveAction200 = MailboxAction;
export type MailboxesApproveAction202 = MailboxPendingAction;
export const MailboxesApproveAction202 = MailboxPendingAction;
export type MailboxesApproveAction400 = MalformedRequestError;
export const MailboxesApproveAction400 = MalformedRequestError;
export type MailboxesApproveAction401 = UnauthorizedError;
export const MailboxesApproveAction401 = UnauthorizedError;
export type MailboxesApproveAction402 = PaymentRequiredError;
export const MailboxesApproveAction402 = PaymentRequiredError;
export type MailboxesApproveAction403 =
  | FlagDisabledError
  | MailboxSendRefusedError
  | OnboardingReviewRequiredError
  | ForbiddenError;
export const MailboxesApproveAction403 = /* @__PURE__ */ (() =>
  Schema.Union([
    FlagDisabledError,
    MailboxSendRefusedError,
    OnboardingReviewRequiredError,
    ForbiddenError,
  ]))();
export type MailboxesApproveAction404 = ResourceNotFoundError;
export const MailboxesApproveAction404 = ResourceNotFoundError;
export type MailboxesApproveAction409 = MailboxSendConflictError | ConflictError;
export const MailboxesApproveAction409 = /* @__PURE__ */ (() =>
  Schema.Union([MailboxSendConflictError, ConflictError]))();
export type MailboxesApproveAction422 = WhatsAppServiceWindowClosedError | ValidationError;
export const MailboxesApproveAction422 = /* @__PURE__ */ (() =>
  Schema.Union([WhatsAppServiceWindowClosedError, ValidationError]))();
export type MailboxesApproveAction429 = RateLimitedError;
export const MailboxesApproveAction429 = RateLimitedError;
export type MailboxesApproveAction500 = InternalError;
export const MailboxesApproveAction500 = InternalError;
export type MailboxesApproveAction502 = BillingProviderError;
export const MailboxesApproveAction502 = BillingProviderError;
export type MailboxesApproveAction503 = SenderNotReadyError;
export const MailboxesApproveAction503 = SenderNotReadyError;
export type MailboxesApproveAction504 = GatewayTimeoutError;
export const MailboxesApproveAction504 = GatewayTimeoutError;
export type MailboxesCancelActionPathParams = {
  readonly id: MailboxId;
  readonly actionId: MailboxActionId;
};
export const MailboxesCancelActionPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, actionId: MailboxActionId }))();
export type MailboxesCancelAction200 = MailboxSendReceipt;
export const MailboxesCancelAction200 = MailboxSendReceipt;
export type MailboxesCancelAction202 = MailboxPendingSendReceipt;
export const MailboxesCancelAction202 = MailboxPendingSendReceipt;
export type MailboxesCancelAction400 = MalformedRequestError;
export const MailboxesCancelAction400 = MalformedRequestError;
export type MailboxesCancelAction401 = UnauthorizedError;
export const MailboxesCancelAction401 = UnauthorizedError;
export type MailboxesCancelAction402 = PaymentRequiredError;
export const MailboxesCancelAction402 = PaymentRequiredError;
export type MailboxesCancelAction403 =
  | FlagDisabledError
  | MailboxSendRefusedError
  | OnboardingReviewRequiredError
  | ForbiddenError;
export const MailboxesCancelAction403 = /* @__PURE__ */ (() =>
  Schema.Union([
    FlagDisabledError,
    MailboxSendRefusedError,
    OnboardingReviewRequiredError,
    ForbiddenError,
  ]))();
export type MailboxesCancelAction404 = ResourceNotFoundError;
export const MailboxesCancelAction404 = ResourceNotFoundError;
export type MailboxesCancelAction409 = MailboxSendConflictError | ConflictError;
export const MailboxesCancelAction409 = /* @__PURE__ */ (() =>
  Schema.Union([MailboxSendConflictError, ConflictError]))();
export type MailboxesCancelAction422 = WhatsAppServiceWindowClosedError | ValidationError;
export const MailboxesCancelAction422 = /* @__PURE__ */ (() =>
  Schema.Union([WhatsAppServiceWindowClosedError, ValidationError]))();
export type MailboxesCancelAction429 = RateLimitedError;
export const MailboxesCancelAction429 = RateLimitedError;
export type MailboxesCancelAction500 = InternalError;
export const MailboxesCancelAction500 = InternalError;
export type MailboxesCancelAction502 = BillingProviderError;
export const MailboxesCancelAction502 = BillingProviderError;
export type MailboxesCancelAction503 = SenderNotReadyError;
export const MailboxesCancelAction503 = SenderNotReadyError;
export type MailboxesCancelAction504 = GatewayTimeoutError;
export const MailboxesCancelAction504 = GatewayTimeoutError;
export type MailboxesDenyActionPathParams = {
  readonly id: MailboxId;
  readonly actionId: MailboxActionId;
};
export const MailboxesDenyActionPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, actionId: MailboxActionId }))();
export type MailboxesDenyActionRequestJson = {
  readonly reviewRound: PolicyReviewRound;
  readonly reason: string;
};
export const MailboxesDenyActionRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ reviewRound: PolicyReviewRound, reason: Schema.String }))();
export type MailboxesDenyAction200 = MailboxAction;
export const MailboxesDenyAction200 = MailboxAction;
export type MailboxesDenyAction400 = MalformedRequestError;
export const MailboxesDenyAction400 = MalformedRequestError;
export type MailboxesDenyAction401 = UnauthorizedError;
export const MailboxesDenyAction401 = UnauthorizedError;
export type MailboxesDenyAction403 = ForbiddenError;
export const MailboxesDenyAction403 = ForbiddenError;
export type MailboxesDenyAction404 = ResourceNotFoundError;
export const MailboxesDenyAction404 = ResourceNotFoundError;
export type MailboxesDenyAction409 = ConflictError | MailboxSendConflictError;
export const MailboxesDenyAction409 = /* @__PURE__ */ (() =>
  Schema.Union([ConflictError, MailboxSendConflictError]))();
export type MailboxesDenyAction422 = ValidationError;
export const MailboxesDenyAction422 = ValidationError;
export type MailboxesDenyAction500 = InternalError;
export const MailboxesDenyAction500 = InternalError;
export type MailboxesDenyAction504 = GatewayTimeoutError;
export const MailboxesDenyAction504 = GatewayTimeoutError;
export type MailboxesRetryActionPathParams = {
  readonly id: MailboxId;
  readonly actionId: MailboxActionId;
};
export const MailboxesRetryActionPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, actionId: MailboxActionId }))();
export type MailboxesRetryAction200 = MailboxSendReceipt;
export const MailboxesRetryAction200 = MailboxSendReceipt;
export type MailboxesRetryAction202 = MailboxPendingSendReceipt;
export const MailboxesRetryAction202 = MailboxPendingSendReceipt;
export type MailboxesRetryAction400 = MalformedRequestError;
export const MailboxesRetryAction400 = MalformedRequestError;
export type MailboxesRetryAction401 = UnauthorizedError;
export const MailboxesRetryAction401 = UnauthorizedError;
export type MailboxesRetryAction402 = PaymentRequiredError;
export const MailboxesRetryAction402 = PaymentRequiredError;
export type MailboxesRetryAction403 =
  | FlagDisabledError
  | MailboxSendRefusedError
  | OnboardingReviewRequiredError
  | ForbiddenError;
export const MailboxesRetryAction403 = /* @__PURE__ */ (() =>
  Schema.Union([
    FlagDisabledError,
    MailboxSendRefusedError,
    OnboardingReviewRequiredError,
    ForbiddenError,
  ]))();
export type MailboxesRetryAction404 = ResourceNotFoundError;
export const MailboxesRetryAction404 = ResourceNotFoundError;
export type MailboxesRetryAction409 = MailboxSendConflictError | ConflictError;
export const MailboxesRetryAction409 = /* @__PURE__ */ (() =>
  Schema.Union([MailboxSendConflictError, ConflictError]))();
export type MailboxesRetryAction422 = WhatsAppServiceWindowClosedError | ValidationError;
export const MailboxesRetryAction422 = /* @__PURE__ */ (() =>
  Schema.Union([WhatsAppServiceWindowClosedError, ValidationError]))();
export type MailboxesRetryAction429 = RateLimitedError;
export const MailboxesRetryAction429 = RateLimitedError;
export type MailboxesRetryAction500 = InternalError;
export const MailboxesRetryAction500 = InternalError;
export type MailboxesRetryAction502 = BillingProviderError;
export const MailboxesRetryAction502 = BillingProviderError;
export type MailboxesRetryAction503 = SenderNotReadyError;
export const MailboxesRetryAction503 = SenderNotReadyError;
export type MailboxesRetryAction504 = GatewayTimeoutError;
export const MailboxesRetryAction504 = GatewayTimeoutError;
export type MailboxesGetAgentActivityPathParams = { readonly id: MailboxId };
export const MailboxesGetAgentActivityPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId }))();
export type MailboxesGetAgentActivityQuery = { readonly after?: string; readonly before?: string };
export const MailboxesGetAgentActivityQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    after: Schema.optionalKey(Schema.String),
    before: Schema.optionalKey(Schema.String),
  }))();
export type MailboxesGetAgentActivity200 = MailboxAgentActivity;
export const MailboxesGetAgentActivity200 = MailboxAgentActivity;
export type MailboxesGetAgentActivity400 = MalformedRequestError;
export const MailboxesGetAgentActivity400 = MalformedRequestError;
export type MailboxesGetAgentActivity401 = UnauthorizedError;
export const MailboxesGetAgentActivity401 = UnauthorizedError;
export type MailboxesGetAgentActivity403 = ForbiddenError;
export const MailboxesGetAgentActivity403 = ForbiddenError;
export type MailboxesGetAgentActivity404 = ResourceNotFoundError;
export const MailboxesGetAgentActivity404 = ResourceNotFoundError;
export type MailboxesGetAgentActivity422 = ValidationError;
export const MailboxesGetAgentActivity422 = ValidationError;
export type MailboxesGetAgentActivity500 = InternalError;
export const MailboxesGetAgentActivity500 = InternalError;
export type MailboxesGetAgentActivity504 = GatewayTimeoutError;
export const MailboxesGetAgentActivity504 = GatewayTimeoutError;
export type MailboxesListDraftsPathParams = { readonly id: MailboxId };
export const MailboxesListDraftsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId }))();
export type MailboxesListDraftsQuery = {
  readonly limit?: number | null;
  readonly cursor?: string;
  readonly threadId?: MailboxThreadId;
};
export const MailboxesListDraftsQuery = /* @__PURE__ */ (() =>
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
    threadId: Schema.optionalKey(MailboxThreadId),
  }))();
export type MailboxesListDrafts200 = MailboxDraftPage;
export const MailboxesListDrafts200 = MailboxDraftPage;
export type MailboxesListDrafts400 = MalformedRequestError;
export const MailboxesListDrafts400 = MalformedRequestError;
export type MailboxesListDrafts401 = UnauthorizedError;
export const MailboxesListDrafts401 = UnauthorizedError;
export type MailboxesListDrafts403 = ForbiddenError;
export const MailboxesListDrafts403 = ForbiddenError;
export type MailboxesListDrafts404 = ResourceNotFoundError;
export const MailboxesListDrafts404 = ResourceNotFoundError;
export type MailboxesListDrafts422 = ValidationError;
export const MailboxesListDrafts422 = ValidationError;
export type MailboxesListDrafts500 = InternalError;
export const MailboxesListDrafts500 = InternalError;
export type MailboxesListDrafts504 = GatewayTimeoutError;
export const MailboxesListDrafts504 = GatewayTimeoutError;
export type MailboxesCreateDraftPathParams = { readonly id: MailboxId };
export const MailboxesCreateDraftPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId }))();
export type MailboxesCreateDraftRequestJson =
  | CreateMailboxEmailDraftPayload
  | CreateMailboxChatDraftPayload;
export const MailboxesCreateDraftRequestJson = /* @__PURE__ */ (() =>
  Schema.Union([CreateMailboxEmailDraftPayload, CreateMailboxChatDraftPayload]))();
export type MailboxesCreateDraft201 = MailboxDraft;
export const MailboxesCreateDraft201 = MailboxDraft;
export type MailboxesCreateDraft400 = MalformedRequestError;
export const MailboxesCreateDraft400 = MalformedRequestError;
export type MailboxesCreateDraft401 = UnauthorizedError;
export const MailboxesCreateDraft401 = UnauthorizedError;
export type MailboxesCreateDraft403 = ForbiddenError;
export const MailboxesCreateDraft403 = ForbiddenError;
export type MailboxesCreateDraft404 = ResourceNotFoundError;
export const MailboxesCreateDraft404 = ResourceNotFoundError;
export type MailboxesCreateDraft422 = ValidationError;
export const MailboxesCreateDraft422 = ValidationError;
export type MailboxesCreateDraft500 = InternalError;
export const MailboxesCreateDraft500 = InternalError;
export type MailboxesCreateDraft504 = GatewayTimeoutError;
export const MailboxesCreateDraft504 = GatewayTimeoutError;
export type MailboxesGetDraftPathParams = {
  readonly id: MailboxId;
  readonly draftId: MailboxDraftId;
};
export const MailboxesGetDraftPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, draftId: MailboxDraftId }))();
export type MailboxesGetDraft200 = MailboxDraft;
export const MailboxesGetDraft200 = MailboxDraft;
export type MailboxesGetDraft400 = MalformedRequestError;
export const MailboxesGetDraft400 = MalformedRequestError;
export type MailboxesGetDraft401 = UnauthorizedError;
export const MailboxesGetDraft401 = UnauthorizedError;
export type MailboxesGetDraft403 = ForbiddenError;
export const MailboxesGetDraft403 = ForbiddenError;
export type MailboxesGetDraft404 = ResourceNotFoundError;
export const MailboxesGetDraft404 = ResourceNotFoundError;
export type MailboxesGetDraft422 = ValidationError;
export const MailboxesGetDraft422 = ValidationError;
export type MailboxesGetDraft500 = InternalError;
export const MailboxesGetDraft500 = InternalError;
export type MailboxesGetDraft504 = GatewayTimeoutError;
export const MailboxesGetDraft504 = GatewayTimeoutError;
export type MailboxesDeleteDraftPathParams = {
  readonly id: MailboxId;
  readonly draftId: MailboxDraftId;
};
export const MailboxesDeleteDraftPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, draftId: MailboxDraftId }))();
export type MailboxesDeleteDraft200 = SuccessResponse;
export const MailboxesDeleteDraft200 = SuccessResponse;
export type MailboxesDeleteDraft400 = MalformedRequestError;
export const MailboxesDeleteDraft400 = MalformedRequestError;
export type MailboxesDeleteDraft401 = UnauthorizedError;
export const MailboxesDeleteDraft401 = UnauthorizedError;
export type MailboxesDeleteDraft403 = ForbiddenError;
export const MailboxesDeleteDraft403 = ForbiddenError;
export type MailboxesDeleteDraft404 = ResourceNotFoundError;
export const MailboxesDeleteDraft404 = ResourceNotFoundError;
export type MailboxesDeleteDraft422 = ValidationError;
export const MailboxesDeleteDraft422 = ValidationError;
export type MailboxesDeleteDraft500 = InternalError;
export const MailboxesDeleteDraft500 = InternalError;
export type MailboxesDeleteDraft504 = GatewayTimeoutError;
export const MailboxesDeleteDraft504 = GatewayTimeoutError;
export type MailboxesUpdateDraftPathParams = {
  readonly id: MailboxId;
  readonly draftId: MailboxDraftId;
};
export const MailboxesUpdateDraftPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, draftId: MailboxDraftId }))();
export type MailboxesUpdateDraftRequestJson = {
  readonly to?: ReadonlyArray<string> | null;
  readonly cc?: ReadonlyArray<string> | null;
  readonly bcc?: ReadonlyArray<string> | null;
  readonly replyTo?: ReadonlyArray<string> | null;
  readonly subject?: string | null;
  readonly text?: string | null;
  readonly html?: string | null;
  readonly attachments?: ReadonlyArray<EmailAttachment> | null;
};
export const MailboxesUpdateDraftRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
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
  }))();
export type MailboxesUpdateDraft200 = MailboxDraft;
export const MailboxesUpdateDraft200 = MailboxDraft;
export type MailboxesUpdateDraft400 = MalformedRequestError;
export const MailboxesUpdateDraft400 = MalformedRequestError;
export type MailboxesUpdateDraft401 = UnauthorizedError;
export const MailboxesUpdateDraft401 = UnauthorizedError;
export type MailboxesUpdateDraft403 = ForbiddenError;
export const MailboxesUpdateDraft403 = ForbiddenError;
export type MailboxesUpdateDraft404 = ResourceNotFoundError;
export const MailboxesUpdateDraft404 = ResourceNotFoundError;
export type MailboxesUpdateDraft409 = ConflictError;
export const MailboxesUpdateDraft409 = ConflictError;
export type MailboxesUpdateDraft422 = ValidationError;
export const MailboxesUpdateDraft422 = ValidationError;
export type MailboxesUpdateDraft500 = InternalError;
export const MailboxesUpdateDraft500 = InternalError;
export type MailboxesUpdateDraft504 = GatewayTimeoutError;
export const MailboxesUpdateDraft504 = GatewayTimeoutError;
export type MailboxesSendDraftPathParams = {
  readonly id: MailboxId;
  readonly draftId: MailboxDraftId;
};
export const MailboxesSendDraftPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, draftId: MailboxDraftId }))();
export type MailboxesSendDraftHeaders = { readonly "idempotency-key"?: string };
export const MailboxesSendDraftHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Optional key that makes a mailbox send idempotent for the calling key or member. Repeating the request with the same key and body returns the original action in its current state. Keep the key after a lost response. Reusing it with different content returns 409. Active actions retain their key; terminal receipts remain replayable for 24 hours.",
      }).check(
        Schema.isPattern(new globalThis.RegExp("^[\\s\\S]{1,255}$")).annotate({
          expected: "a string matching the RegExp ^[\\s\\S]{1,255}$",
        }),
      ),
    ),
  }))();
export type MailboxesSendDraft200 = MailboxSendReceipt;
export const MailboxesSendDraft200 = MailboxSendReceipt;
export type MailboxesSendDraft202 = MailboxPendingSendReceipt;
export const MailboxesSendDraft202 = MailboxPendingSendReceipt;
export type MailboxesSendDraft400 = MalformedRequestError;
export const MailboxesSendDraft400 = MalformedRequestError;
export type MailboxesSendDraft401 = UnauthorizedError;
export const MailboxesSendDraft401 = UnauthorizedError;
export type MailboxesSendDraft402 = PaymentRequiredError;
export const MailboxesSendDraft402 = PaymentRequiredError;
export type MailboxesSendDraft403 =
  | FlagDisabledError
  | MailboxSendRefusedError
  | OnboardingReviewRequiredError
  | ForbiddenError;
export const MailboxesSendDraft403 = /* @__PURE__ */ (() =>
  Schema.Union([
    FlagDisabledError,
    MailboxSendRefusedError,
    OnboardingReviewRequiredError,
    ForbiddenError,
  ]))();
export type MailboxesSendDraft404 = ResourceNotFoundError;
export const MailboxesSendDraft404 = ResourceNotFoundError;
export type MailboxesSendDraft409 = MailboxSendConflictError | ConflictError;
export const MailboxesSendDraft409 = /* @__PURE__ */ (() =>
  Schema.Union([MailboxSendConflictError, ConflictError]))();
export type MailboxesSendDraft422 = WhatsAppServiceWindowClosedError | ValidationError;
export const MailboxesSendDraft422 = /* @__PURE__ */ (() =>
  Schema.Union([WhatsAppServiceWindowClosedError, ValidationError]))();
export type MailboxesSendDraft429 = RateLimitedError;
export const MailboxesSendDraft429 = RateLimitedError;
export type MailboxesSendDraft500 = InternalError;
export const MailboxesSendDraft500 = InternalError;
export type MailboxesSendDraft502 = BillingProviderError;
export const MailboxesSendDraft502 = BillingProviderError;
export type MailboxesSendDraft503 = SenderNotReadyError;
export const MailboxesSendDraft503 = SenderNotReadyError;
export type MailboxesSendDraft504 = GatewayTimeoutError;
export const MailboxesSendDraft504 = GatewayTimeoutError;
export type MailboxesCreateEndpointPathParams = { readonly id: MailboxId };
export const MailboxesCreateEndpointPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId }))();
export type MailboxesCreateEndpointRequestJson = {
  readonly channel: MailboxChannel;
  readonly address: string;
  readonly displayName?: string | null;
};
export const MailboxesCreateEndpointRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    channel: MailboxChannel,
    address: Schema.String,
    displayName: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(120).annotate({
            expected: "a string with at most 120 code points",
          }),
        ).check(
          Schema.isMaxLength(120).annotate({ expected: "a value with a length of at most 120" }),
        ),
        Schema.Null,
      ]),
    ),
  }))();
export type MailboxesCreateEndpoint201 = Mailbox;
export const MailboxesCreateEndpoint201 = Mailbox;
export type MailboxesCreateEndpoint400 = MalformedRequestError;
export const MailboxesCreateEndpoint400 = MalformedRequestError;
export type MailboxesCreateEndpoint401 = UnauthorizedError;
export const MailboxesCreateEndpoint401 = UnauthorizedError;
export type MailboxesCreateEndpoint403 = FlagDisabledError | ForbiddenError;
export const MailboxesCreateEndpoint403 = /* @__PURE__ */ (() =>
  Schema.Union([FlagDisabledError, ForbiddenError]))();
export type MailboxesCreateEndpoint404 = ResourceNotFoundError;
export const MailboxesCreateEndpoint404 = ResourceNotFoundError;
export type MailboxesCreateEndpoint409 = ConflictError;
export const MailboxesCreateEndpoint409 = ConflictError;
export type MailboxesCreateEndpoint422 = ValidationError;
export const MailboxesCreateEndpoint422 = ValidationError;
export type MailboxesCreateEndpoint500 = InternalError;
export const MailboxesCreateEndpoint500 = InternalError;
export type MailboxesCreateEndpoint504 = GatewayTimeoutError;
export const MailboxesCreateEndpoint504 = GatewayTimeoutError;
export type MailboxesRemoveEndpointPathParams = {
  readonly id: MailboxId;
  readonly endpointId: MailboxEndpointId;
};
export const MailboxesRemoveEndpointPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, endpointId: MailboxEndpointId }))();
export type MailboxesRemoveEndpoint200 = Mailbox;
export const MailboxesRemoveEndpoint200 = Mailbox;
export type MailboxesRemoveEndpoint400 = MalformedRequestError;
export const MailboxesRemoveEndpoint400 = MalformedRequestError;
export type MailboxesRemoveEndpoint401 = UnauthorizedError;
export const MailboxesRemoveEndpoint401 = UnauthorizedError;
export type MailboxesRemoveEndpoint403 = ForbiddenError;
export const MailboxesRemoveEndpoint403 = ForbiddenError;
export type MailboxesRemoveEndpoint404 = ResourceNotFoundError;
export const MailboxesRemoveEndpoint404 = ResourceNotFoundError;
export type MailboxesRemoveEndpoint422 = ValidationError;
export const MailboxesRemoveEndpoint422 = ValidationError;
export type MailboxesRemoveEndpoint500 = InternalError;
export const MailboxesRemoveEndpoint500 = InternalError;
export type MailboxesRemoveEndpoint504 = GatewayTimeoutError;
export const MailboxesRemoveEndpoint504 = GatewayTimeoutError;
export type MailboxesUpdateEndpointPathParams = {
  readonly id: MailboxId;
  readonly endpointId: MailboxEndpointId;
};
export const MailboxesUpdateEndpointPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, endpointId: MailboxEndpointId }))();
export type MailboxesUpdateEndpointRequestJson = {
  readonly displayName?: string | null;
  readonly default?: true | null;
};
export const MailboxesUpdateEndpointRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    displayName: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(120).annotate({
            expected: "a string with at most 120 code points",
          }),
        ).check(
          Schema.isMaxLength(120).annotate({ expected: "a value with a length of at most 120" }),
        ),
        Schema.Null,
      ]),
    ),
    default: Schema.optionalKey(Schema.Union([Schema.Literal(true), Schema.Null])),
  }))();
export type MailboxesUpdateEndpoint200 = Mailbox;
export const MailboxesUpdateEndpoint200 = Mailbox;
export type MailboxesUpdateEndpoint400 = MalformedRequestError;
export const MailboxesUpdateEndpoint400 = MalformedRequestError;
export type MailboxesUpdateEndpoint401 = UnauthorizedError;
export const MailboxesUpdateEndpoint401 = UnauthorizedError;
export type MailboxesUpdateEndpoint403 = ForbiddenError;
export const MailboxesUpdateEndpoint403 = ForbiddenError;
export type MailboxesUpdateEndpoint404 = ResourceNotFoundError;
export const MailboxesUpdateEndpoint404 = ResourceNotFoundError;
export type MailboxesUpdateEndpoint422 = ValidationError;
export const MailboxesUpdateEndpoint422 = ValidationError;
export type MailboxesUpdateEndpoint500 = InternalError;
export const MailboxesUpdateEndpoint500 = InternalError;
export type MailboxesUpdateEndpoint504 = GatewayTimeoutError;
export const MailboxesUpdateEndpoint504 = GatewayTimeoutError;
export type MailboxesListEventsPathParams = { readonly id: MailboxId };
export const MailboxesListEventsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId }))();
export type MailboxesListEventsQuery = {
  readonly limit?: number | null;
  readonly cursor?: string;
  readonly after?: string;
  readonly before?: string;
};
export const MailboxesListEventsQuery = /* @__PURE__ */ (() =>
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
    after: Schema.optionalKey(Schema.String),
    before: Schema.optionalKey(Schema.String),
  }))();
export type MailboxesListEvents200 = MailboxEventPage;
export const MailboxesListEvents200 = MailboxEventPage;
export type MailboxesListEvents400 = MalformedRequestError;
export const MailboxesListEvents400 = MalformedRequestError;
export type MailboxesListEvents401 = UnauthorizedError;
export const MailboxesListEvents401 = UnauthorizedError;
export type MailboxesListEvents403 = ForbiddenError;
export const MailboxesListEvents403 = ForbiddenError;
export type MailboxesListEvents404 = ResourceNotFoundError;
export const MailboxesListEvents404 = ResourceNotFoundError;
export type MailboxesListEvents422 = ValidationError;
export const MailboxesListEvents422 = ValidationError;
export type MailboxesListEvents500 = InternalError;
export const MailboxesListEvents500 = InternalError;
export type MailboxesListEvents504 = GatewayTimeoutError;
export const MailboxesListEvents504 = GatewayTimeoutError;
export type MailboxesListFoldersPathParams = { readonly id: MailboxId };
export const MailboxesListFoldersPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId }))();
export type MailboxesListFolders200 = MailboxFolderCountList;
export const MailboxesListFolders200 = MailboxFolderCountList;
export type MailboxesListFolders400 = MalformedRequestError;
export const MailboxesListFolders400 = MalformedRequestError;
export type MailboxesListFolders401 = UnauthorizedError;
export const MailboxesListFolders401 = UnauthorizedError;
export type MailboxesListFolders403 = ForbiddenError;
export const MailboxesListFolders403 = ForbiddenError;
export type MailboxesListFolders404 = ResourceNotFoundError;
export const MailboxesListFolders404 = ResourceNotFoundError;
export type MailboxesListFolders422 = ValidationError;
export const MailboxesListFolders422 = ValidationError;
export type MailboxesListFolders500 = InternalError;
export const MailboxesListFolders500 = InternalError;
export type MailboxesListFolders504 = GatewayTimeoutError;
export const MailboxesListFolders504 = GatewayTimeoutError;
export type MailboxesListGrantsPathParams = { readonly id: MailboxId };
export const MailboxesListGrantsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId }))();
export type MailboxesListGrantsQuery = { readonly limit?: number | null; readonly cursor?: string };
export const MailboxesListGrantsQuery = /* @__PURE__ */ (() =>
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
export type MailboxesListGrants200 = MailboxGrantPage;
export const MailboxesListGrants200 = MailboxGrantPage;
export type MailboxesListGrants400 = MalformedRequestError;
export const MailboxesListGrants400 = MalformedRequestError;
export type MailboxesListGrants401 = UnauthorizedError;
export const MailboxesListGrants401 = UnauthorizedError;
export type MailboxesListGrants403 = ForbiddenError;
export const MailboxesListGrants403 = ForbiddenError;
export type MailboxesListGrants404 = ResourceNotFoundError;
export const MailboxesListGrants404 = ResourceNotFoundError;
export type MailboxesListGrants422 = ValidationError;
export const MailboxesListGrants422 = ValidationError;
export type MailboxesListGrants500 = InternalError;
export const MailboxesListGrants500 = InternalError;
export type MailboxesListGrants504 = GatewayTimeoutError;
export const MailboxesListGrants504 = GatewayTimeoutError;
export type MailboxesCreateGrantPathParams = { readonly id: MailboxId };
export const MailboxesCreateGrantPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId }))();
export type MailboxesCreateGrantRequestJson = {
  readonly userId: UserId;
  readonly role: MailboxGrantRole;
};
export const MailboxesCreateGrantRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ userId: UserId, role: MailboxGrantRole }))();
export type MailboxesCreateGrant201 = MailboxGrant;
export const MailboxesCreateGrant201 = MailboxGrant;
export type MailboxesCreateGrant400 = MalformedRequestError;
export const MailboxesCreateGrant400 = MalformedRequestError;
export type MailboxesCreateGrant401 = UnauthorizedError;
export const MailboxesCreateGrant401 = UnauthorizedError;
export type MailboxesCreateGrant403 = ForbiddenError;
export const MailboxesCreateGrant403 = ForbiddenError;
export type MailboxesCreateGrant404 = ResourceNotFoundError;
export const MailboxesCreateGrant404 = ResourceNotFoundError;
export type MailboxesCreateGrant409 = ConflictError;
export const MailboxesCreateGrant409 = ConflictError;
export type MailboxesCreateGrant422 = ValidationError;
export const MailboxesCreateGrant422 = ValidationError;
export type MailboxesCreateGrant500 = InternalError;
export const MailboxesCreateGrant500 = InternalError;
export type MailboxesCreateGrant504 = GatewayTimeoutError;
export const MailboxesCreateGrant504 = GatewayTimeoutError;
export type MailboxesRevokeGrantPathParams = {
  readonly id: MailboxId;
  readonly grantId: MailboxGrantId;
};
export const MailboxesRevokeGrantPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, grantId: MailboxGrantId }))();
export type MailboxesRevokeGrant200 = SuccessResponse;
export const MailboxesRevokeGrant200 = SuccessResponse;
export type MailboxesRevokeGrant400 = MalformedRequestError;
export const MailboxesRevokeGrant400 = MalformedRequestError;
export type MailboxesRevokeGrant401 = UnauthorizedError;
export const MailboxesRevokeGrant401 = UnauthorizedError;
export type MailboxesRevokeGrant403 = ForbiddenError;
export const MailboxesRevokeGrant403 = ForbiddenError;
export type MailboxesRevokeGrant404 = ResourceNotFoundError;
export const MailboxesRevokeGrant404 = ResourceNotFoundError;
export type MailboxesRevokeGrant409 = ConflictError;
export const MailboxesRevokeGrant409 = ConflictError;
export type MailboxesRevokeGrant422 = ValidationError;
export const MailboxesRevokeGrant422 = ValidationError;
export type MailboxesRevokeGrant500 = InternalError;
export const MailboxesRevokeGrant500 = InternalError;
export type MailboxesRevokeGrant504 = GatewayTimeoutError;
export const MailboxesRevokeGrant504 = GatewayTimeoutError;
export type MailboxesUpdateGrantPathParams = {
  readonly id: MailboxId;
  readonly grantId: MailboxGrantId;
};
export const MailboxesUpdateGrantPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, grantId: MailboxGrantId }))();
export type MailboxesUpdateGrantRequestJson = { readonly role?: MailboxGrantRole | null };
export const MailboxesUpdateGrantRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ role: Schema.optionalKey(Schema.Union([MailboxGrantRole, Schema.Null])) }))();
export type MailboxesUpdateGrant200 = MailboxGrant;
export const MailboxesUpdateGrant200 = MailboxGrant;
export type MailboxesUpdateGrant400 = MalformedRequestError;
export const MailboxesUpdateGrant400 = MalformedRequestError;
export type MailboxesUpdateGrant401 = UnauthorizedError;
export const MailboxesUpdateGrant401 = UnauthorizedError;
export type MailboxesUpdateGrant403 = ForbiddenError;
export const MailboxesUpdateGrant403 = ForbiddenError;
export type MailboxesUpdateGrant404 = ResourceNotFoundError;
export const MailboxesUpdateGrant404 = ResourceNotFoundError;
export type MailboxesUpdateGrant409 = ConflictError;
export const MailboxesUpdateGrant409 = ConflictError;
export type MailboxesUpdateGrant422 = ValidationError;
export const MailboxesUpdateGrant422 = ValidationError;
export type MailboxesUpdateGrant500 = InternalError;
export const MailboxesUpdateGrant500 = InternalError;
export type MailboxesUpdateGrant504 = GatewayTimeoutError;
export const MailboxesUpdateGrant504 = GatewayTimeoutError;
export type MailboxesListLabelsPathParams = { readonly id: MailboxId };
export const MailboxesListLabelsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId }))();
export type MailboxesListLabels200 = MailboxLabelList;
export const MailboxesListLabels200 = MailboxLabelList;
export type MailboxesListLabels400 = MalformedRequestError;
export const MailboxesListLabels400 = MalformedRequestError;
export type MailboxesListLabels401 = UnauthorizedError;
export const MailboxesListLabels401 = UnauthorizedError;
export type MailboxesListLabels403 = ForbiddenError;
export const MailboxesListLabels403 = ForbiddenError;
export type MailboxesListLabels404 = ResourceNotFoundError;
export const MailboxesListLabels404 = ResourceNotFoundError;
export type MailboxesListLabels422 = ValidationError;
export const MailboxesListLabels422 = ValidationError;
export type MailboxesListLabels500 = InternalError;
export const MailboxesListLabels500 = InternalError;
export type MailboxesListLabels504 = GatewayTimeoutError;
export const MailboxesListLabels504 = GatewayTimeoutError;
export type MailboxesCreateLabelPathParams = { readonly id: MailboxId };
export const MailboxesCreateLabelPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId }))();
export type MailboxesCreateLabelRequestJson = {
  readonly slug: string;
  readonly displayName: string;
  readonly color?: "billing" | "domain" | "agent" | "routing" | "important" | "neutral" | null;
};
export const MailboxesCreateLabelRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    slug: Schema.String,
    displayName: Schema.String.check(
      Schema.isMaxCodePoints(40).annotate({ expected: "a string with at most 40 code points" }),
    ).check(Schema.isMaxLength(40).annotate({ expected: "a value with a length of at most 40" })),
    color: Schema.optionalKey(
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
    ),
  }))();
export type MailboxesCreateLabel201 = MailboxLabel;
export const MailboxesCreateLabel201 = MailboxLabel;
export type MailboxesCreateLabel400 = MalformedRequestError;
export const MailboxesCreateLabel400 = MalformedRequestError;
export type MailboxesCreateLabel401 = UnauthorizedError;
export const MailboxesCreateLabel401 = UnauthorizedError;
export type MailboxesCreateLabel403 = ForbiddenError;
export const MailboxesCreateLabel403 = ForbiddenError;
export type MailboxesCreateLabel404 = ResourceNotFoundError;
export const MailboxesCreateLabel404 = ResourceNotFoundError;
export type MailboxesCreateLabel409 = ConflictError;
export const MailboxesCreateLabel409 = ConflictError;
export type MailboxesCreateLabel422 = ValidationError;
export const MailboxesCreateLabel422 = ValidationError;
export type MailboxesCreateLabel500 = InternalError;
export const MailboxesCreateLabel500 = InternalError;
export type MailboxesCreateLabel504 = GatewayTimeoutError;
export const MailboxesCreateLabel504 = GatewayTimeoutError;
export type MailboxesDeleteLabelPathParams = {
  readonly id: MailboxId;
  readonly labelId: MailboxLabelId;
};
export const MailboxesDeleteLabelPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, labelId: MailboxLabelId }))();
export type MailboxesDeleteLabel200 = SuccessResponse;
export const MailboxesDeleteLabel200 = SuccessResponse;
export type MailboxesDeleteLabel400 = MalformedRequestError;
export const MailboxesDeleteLabel400 = MalformedRequestError;
export type MailboxesDeleteLabel401 = UnauthorizedError;
export const MailboxesDeleteLabel401 = UnauthorizedError;
export type MailboxesDeleteLabel403 = ForbiddenError;
export const MailboxesDeleteLabel403 = ForbiddenError;
export type MailboxesDeleteLabel404 = ResourceNotFoundError;
export const MailboxesDeleteLabel404 = ResourceNotFoundError;
export type MailboxesDeleteLabel422 = ValidationError;
export const MailboxesDeleteLabel422 = ValidationError;
export type MailboxesDeleteLabel500 = InternalError;
export const MailboxesDeleteLabel500 = InternalError;
export type MailboxesDeleteLabel504 = GatewayTimeoutError;
export const MailboxesDeleteLabel504 = GatewayTimeoutError;
export type MailboxesUpdateLabelPathParams = {
  readonly id: MailboxId;
  readonly labelId: MailboxLabelId;
};
export const MailboxesUpdateLabelPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, labelId: MailboxLabelId }))();
export type MailboxesUpdateLabelRequestJson = {
  readonly displayName?: string | null;
  readonly color?: "billing" | "domain" | "agent" | "routing" | "important" | "neutral" | null;
};
export const MailboxesUpdateLabelRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    displayName: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(40).annotate({ expected: "a string with at most 40 code points" }),
        ).check(
          Schema.isMaxLength(40).annotate({ expected: "a value with a length of at most 40" }),
        ),
        Schema.Null,
      ]),
    ),
    color: Schema.optionalKey(
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
    ),
  }))();
export type MailboxesUpdateLabel200 = MailboxLabel;
export const MailboxesUpdateLabel200 = MailboxLabel;
export type MailboxesUpdateLabel400 = MalformedRequestError;
export const MailboxesUpdateLabel400 = MalformedRequestError;
export type MailboxesUpdateLabel401 = UnauthorizedError;
export const MailboxesUpdateLabel401 = UnauthorizedError;
export type MailboxesUpdateLabel403 = ForbiddenError;
export const MailboxesUpdateLabel403 = ForbiddenError;
export type MailboxesUpdateLabel404 = ResourceNotFoundError;
export const MailboxesUpdateLabel404 = ResourceNotFoundError;
export type MailboxesUpdateLabel422 = ValidationError;
export const MailboxesUpdateLabel422 = ValidationError;
export type MailboxesUpdateLabel500 = InternalError;
export const MailboxesUpdateLabel500 = InternalError;
export type MailboxesUpdateLabel504 = GatewayTimeoutError;
export const MailboxesUpdateLabel504 = GatewayTimeoutError;
export type MailboxesSendMessagePathParams = { readonly id: MailboxId };
export const MailboxesSendMessagePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId }))();
export type MailboxesSendMessageHeaders = { readonly "idempotency-key"?: string };
export const MailboxesSendMessageHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Optional key that makes a mailbox send idempotent for the calling key or member. Repeating the request with the same key and body returns the original action in its current state. Keep the key after a lost response. Reusing it with different content returns 409. Active actions retain their key; terminal receipts remain replayable for 24 hours.",
      }).check(
        Schema.isPattern(new globalThis.RegExp("^[\\s\\S]{1,255}$")).annotate({
          expected: "a string matching the RegExp ^[\\s\\S]{1,255}$",
        }),
      ),
    ),
  }))();
export type MailboxesSendMessageRequestJson = SendMailboxEmailPayload | SendMailboxChatPayload;
export const MailboxesSendMessageRequestJson = /* @__PURE__ */ (() =>
  Schema.Union([SendMailboxEmailPayload, SendMailboxChatPayload]))();
export type MailboxesSendMessage200 = MailboxSendReceipt;
export const MailboxesSendMessage200 = MailboxSendReceipt;
export type MailboxesSendMessage202 = MailboxPendingSendReceipt;
export const MailboxesSendMessage202 = MailboxPendingSendReceipt;
export type MailboxesSendMessage400 = MalformedRequestError;
export const MailboxesSendMessage400 = MalformedRequestError;
export type MailboxesSendMessage401 = UnauthorizedError;
export const MailboxesSendMessage401 = UnauthorizedError;
export type MailboxesSendMessage402 = PaymentRequiredError;
export const MailboxesSendMessage402 = PaymentRequiredError;
export type MailboxesSendMessage403 =
  | FlagDisabledError
  | MailboxSendRefusedError
  | OnboardingReviewRequiredError
  | ForbiddenError;
export const MailboxesSendMessage403 = /* @__PURE__ */ (() =>
  Schema.Union([
    FlagDisabledError,
    MailboxSendRefusedError,
    OnboardingReviewRequiredError,
    ForbiddenError,
  ]))();
export type MailboxesSendMessage404 = ResourceNotFoundError;
export const MailboxesSendMessage404 = ResourceNotFoundError;
export type MailboxesSendMessage409 = MailboxSendConflictError | ConflictError;
export const MailboxesSendMessage409 = /* @__PURE__ */ (() =>
  Schema.Union([MailboxSendConflictError, ConflictError]))();
export type MailboxesSendMessage422 = WhatsAppServiceWindowClosedError | ValidationError;
export const MailboxesSendMessage422 = /* @__PURE__ */ (() =>
  Schema.Union([WhatsAppServiceWindowClosedError, ValidationError]))();
export type MailboxesSendMessage429 = RateLimitedError;
export const MailboxesSendMessage429 = RateLimitedError;
export type MailboxesSendMessage500 = InternalError;
export const MailboxesSendMessage500 = InternalError;
export type MailboxesSendMessage502 = BillingProviderError;
export const MailboxesSendMessage502 = BillingProviderError;
export type MailboxesSendMessage503 = SenderNotReadyError;
export const MailboxesSendMessage503 = SenderNotReadyError;
export type MailboxesSendMessage504 = GatewayTimeoutError;
export const MailboxesSendMessage504 = GatewayTimeoutError;
export type MailboxesGetMessagePathParams = {
  readonly id: MailboxId;
  readonly messageId: MessageId;
};
export const MailboxesGetMessagePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, messageId: MessageId }))();
export type MailboxesGetMessage200 = MailboxMessage;
export const MailboxesGetMessage200 = MailboxMessage;
export type MailboxesGetMessage400 = MalformedRequestError;
export const MailboxesGetMessage400 = MalformedRequestError;
export type MailboxesGetMessage401 = UnauthorizedError;
export const MailboxesGetMessage401 = UnauthorizedError;
export type MailboxesGetMessage403 = ForbiddenError;
export const MailboxesGetMessage403 = ForbiddenError;
export type MailboxesGetMessage404 = ResourceNotFoundError;
export const MailboxesGetMessage404 = ResourceNotFoundError;
export type MailboxesGetMessage422 = ValidationError;
export const MailboxesGetMessage422 = ValidationError;
export type MailboxesGetMessage500 = InternalError;
export const MailboxesGetMessage500 = InternalError;
export type MailboxesGetMessage504 = GatewayTimeoutError;
export const MailboxesGetMessage504 = GatewayTimeoutError;
export type MailboxesGetMessageAttachmentPathParams = {
  readonly id: MailboxId;
  readonly messageId: MessageId;
  readonly attachmentId: AttachmentId;
};
export const MailboxesGetMessageAttachmentPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, messageId: MessageId, attachmentId: AttachmentId }))();
export type MailboxesGetMessageAttachment200 = MailboxDownloadUrl;
export const MailboxesGetMessageAttachment200 = MailboxDownloadUrl;
export type MailboxesGetMessageAttachment400 = MalformedRequestError;
export const MailboxesGetMessageAttachment400 = MalformedRequestError;
export type MailboxesGetMessageAttachment401 = UnauthorizedError;
export const MailboxesGetMessageAttachment401 = UnauthorizedError;
export type MailboxesGetMessageAttachment403 = ForbiddenError;
export const MailboxesGetMessageAttachment403 = ForbiddenError;
export type MailboxesGetMessageAttachment404 = ResourceNotFoundError;
export const MailboxesGetMessageAttachment404 = ResourceNotFoundError;
export type MailboxesGetMessageAttachment422 = ValidationError;
export const MailboxesGetMessageAttachment422 = ValidationError;
export type MailboxesGetMessageAttachment500 = InternalError;
export const MailboxesGetMessageAttachment500 = InternalError;
export type MailboxesGetMessageAttachment504 = GatewayTimeoutError;
export const MailboxesGetMessageAttachment504 = GatewayTimeoutError;
export type MailboxesCopyMessageAttachmentPathParams = {
  readonly id: MailboxId;
  readonly messageId: MessageId;
  readonly attachmentId: AttachmentId;
};
export const MailboxesCopyMessageAttachmentPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, messageId: MessageId, attachmentId: AttachmentId }))();
export type MailboxesCopyMessageAttachment201 = MailboxCopiedAttachment;
export const MailboxesCopyMessageAttachment201 = MailboxCopiedAttachment;
export type MailboxesCopyMessageAttachment400 = MalformedRequestError;
export const MailboxesCopyMessageAttachment400 = MalformedRequestError;
export type MailboxesCopyMessageAttachment401 = UnauthorizedError;
export const MailboxesCopyMessageAttachment401 = UnauthorizedError;
export type MailboxesCopyMessageAttachment403 = ForbiddenError;
export const MailboxesCopyMessageAttachment403 = ForbiddenError;
export type MailboxesCopyMessageAttachment404 = ResourceNotFoundError;
export const MailboxesCopyMessageAttachment404 = ResourceNotFoundError;
export type MailboxesCopyMessageAttachment409 = ConflictError;
export const MailboxesCopyMessageAttachment409 = ConflictError;
export type MailboxesCopyMessageAttachment422 = ValidationError;
export const MailboxesCopyMessageAttachment422 = ValidationError;
export type MailboxesCopyMessageAttachment500 = InternalError;
export const MailboxesCopyMessageAttachment500 = InternalError;
export type MailboxesCopyMessageAttachment504 = GatewayTimeoutError;
export const MailboxesCopyMessageAttachment504 = GatewayTimeoutError;
export type MailboxesDiscardMessagePathParams = {
  readonly id: MailboxId;
  readonly messageId: MessageId;
};
export const MailboxesDiscardMessagePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, messageId: MessageId }))();
export type MailboxesDiscardMessage200 = MailboxQuarantinedMessage;
export const MailboxesDiscardMessage200 = MailboxQuarantinedMessage;
export type MailboxesDiscardMessage400 = MalformedRequestError;
export const MailboxesDiscardMessage400 = MalformedRequestError;
export type MailboxesDiscardMessage401 = UnauthorizedError;
export const MailboxesDiscardMessage401 = UnauthorizedError;
export type MailboxesDiscardMessage403 = ForbiddenError;
export const MailboxesDiscardMessage403 = ForbiddenError;
export type MailboxesDiscardMessage404 = ResourceNotFoundError;
export const MailboxesDiscardMessage404 = ResourceNotFoundError;
export type MailboxesDiscardMessage409 = ConflictError;
export const MailboxesDiscardMessage409 = ConflictError;
export type MailboxesDiscardMessage422 = ValidationError;
export const MailboxesDiscardMessage422 = ValidationError;
export type MailboxesDiscardMessage500 = InternalError;
export const MailboxesDiscardMessage500 = InternalError;
export type MailboxesDiscardMessage502 = BillingProviderError;
export const MailboxesDiscardMessage502 = BillingProviderError;
export type MailboxesDiscardMessage504 = GatewayTimeoutError;
export const MailboxesDiscardMessage504 = GatewayTimeoutError;
export type MailboxesForwardPathParams = { readonly id: MailboxId; readonly messageId: MessageId };
export const MailboxesForwardPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, messageId: MessageId }))();
export type MailboxesForwardHeaders = { readonly "idempotency-key"?: string };
export const MailboxesForwardHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Optional key that makes a mailbox send idempotent for the calling key or member. Repeating the request with the same key and body returns the original action in its current state. Keep the key after a lost response. Reusing it with different content returns 409. Active actions retain their key; terminal receipts remain replayable for 24 hours.",
      }).check(
        Schema.isPattern(new globalThis.RegExp("^[\\s\\S]{1,255}$")).annotate({
          expected: "a string matching the RegExp ^[\\s\\S]{1,255}$",
        }),
      ),
    ),
  }))();
export type MailboxesForwardRequestJson = {
  readonly to: readonly [string, ...Array<string>];
  readonly cc?: ReadonlyArray<string> | null;
  readonly bcc?: ReadonlyArray<string> | null;
  readonly text?: string | null;
  readonly html?: string | null;
  readonly attachments?: ReadonlyArray<EmailAttachment> | null;
};
export const MailboxesForwardRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
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
  }))();
export type MailboxesForward200 = MailboxSendReceipt;
export const MailboxesForward200 = MailboxSendReceipt;
export type MailboxesForward202 = MailboxPendingSendReceipt;
export const MailboxesForward202 = MailboxPendingSendReceipt;
export type MailboxesForward400 = MalformedRequestError;
export const MailboxesForward400 = MalformedRequestError;
export type MailboxesForward401 = UnauthorizedError;
export const MailboxesForward401 = UnauthorizedError;
export type MailboxesForward402 = PaymentRequiredError;
export const MailboxesForward402 = PaymentRequiredError;
export type MailboxesForward403 =
  | FlagDisabledError
  | MailboxSendRefusedError
  | OnboardingReviewRequiredError
  | ForbiddenError;
export const MailboxesForward403 = /* @__PURE__ */ (() =>
  Schema.Union([
    FlagDisabledError,
    MailboxSendRefusedError,
    OnboardingReviewRequiredError,
    ForbiddenError,
  ]))();
export type MailboxesForward404 = ResourceNotFoundError;
export const MailboxesForward404 = ResourceNotFoundError;
export type MailboxesForward409 = MailboxSendConflictError | ConflictError;
export const MailboxesForward409 = /* @__PURE__ */ (() =>
  Schema.Union([MailboxSendConflictError, ConflictError]))();
export type MailboxesForward422 = WhatsAppServiceWindowClosedError | ValidationError;
export const MailboxesForward422 = /* @__PURE__ */ (() =>
  Schema.Union([WhatsAppServiceWindowClosedError, ValidationError]))();
export type MailboxesForward429 = RateLimitedError;
export const MailboxesForward429 = RateLimitedError;
export type MailboxesForward500 = InternalError;
export const MailboxesForward500 = InternalError;
export type MailboxesForward502 = BillingProviderError;
export const MailboxesForward502 = BillingProviderError;
export type MailboxesForward503 = SenderNotReadyError;
export const MailboxesForward503 = SenderNotReadyError;
export type MailboxesForward504 = GatewayTimeoutError;
export const MailboxesForward504 = GatewayTimeoutError;
export type MailboxesGetMessageRawPathParams = {
  readonly id: MailboxId;
  readonly messageId: MessageId;
};
export const MailboxesGetMessageRawPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, messageId: MessageId }))();
export type MailboxesGetMessageRaw200 = MailboxDownloadUrl;
export const MailboxesGetMessageRaw200 = MailboxDownloadUrl;
export type MailboxesGetMessageRaw400 = MalformedRequestError;
export const MailboxesGetMessageRaw400 = MalformedRequestError;
export type MailboxesGetMessageRaw401 = UnauthorizedError;
export const MailboxesGetMessageRaw401 = UnauthorizedError;
export type MailboxesGetMessageRaw403 = ForbiddenError;
export const MailboxesGetMessageRaw403 = ForbiddenError;
export type MailboxesGetMessageRaw404 = ResourceNotFoundError;
export const MailboxesGetMessageRaw404 = ResourceNotFoundError;
export type MailboxesGetMessageRaw422 = ValidationError;
export const MailboxesGetMessageRaw422 = ValidationError;
export type MailboxesGetMessageRaw500 = InternalError;
export const MailboxesGetMessageRaw500 = InternalError;
export type MailboxesGetMessageRaw504 = GatewayTimeoutError;
export const MailboxesGetMessageRaw504 = GatewayTimeoutError;
export type MailboxesReleaseMessagePathParams = {
  readonly id: MailboxId;
  readonly messageId: MessageId;
};
export const MailboxesReleaseMessagePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, messageId: MessageId }))();
export type MailboxesReleaseMessage200 = MailboxQuarantinedMessage;
export const MailboxesReleaseMessage200 = MailboxQuarantinedMessage;
export type MailboxesReleaseMessage400 = MalformedRequestError;
export const MailboxesReleaseMessage400 = MalformedRequestError;
export type MailboxesReleaseMessage401 = UnauthorizedError;
export const MailboxesReleaseMessage401 = UnauthorizedError;
export type MailboxesReleaseMessage403 = ForbiddenError;
export const MailboxesReleaseMessage403 = ForbiddenError;
export type MailboxesReleaseMessage404 = ResourceNotFoundError;
export const MailboxesReleaseMessage404 = ResourceNotFoundError;
export type MailboxesReleaseMessage409 = ConflictError;
export const MailboxesReleaseMessage409 = ConflictError;
export type MailboxesReleaseMessage422 = ValidationError;
export const MailboxesReleaseMessage422 = ValidationError;
export type MailboxesReleaseMessage500 = InternalError;
export const MailboxesReleaseMessage500 = InternalError;
export type MailboxesReleaseMessage504 = GatewayTimeoutError;
export const MailboxesReleaseMessage504 = GatewayTimeoutError;
export type MailboxesReplyPathParams = { readonly id: MailboxId; readonly messageId: MessageId };
export const MailboxesReplyPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, messageId: MessageId }))();
export type MailboxesReplyHeaders = { readonly "idempotency-key"?: string };
export const MailboxesReplyHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Optional key that makes a mailbox send idempotent for the calling key or member. Repeating the request with the same key and body returns the original action in its current state. Keep the key after a lost response. Reusing it with different content returns 409. Active actions retain their key; terminal receipts remain replayable for 24 hours.",
      }).check(
        Schema.isPattern(new globalThis.RegExp("^[\\s\\S]{1,255}$")).annotate({
          expected: "a string matching the RegExp ^[\\s\\S]{1,255}$",
        }),
      ),
    ),
  }))();
export type MailboxesReplyRequestJson = ReplyMailboxEmailPayload | ReplyMailboxChatPayload;
export const MailboxesReplyRequestJson = /* @__PURE__ */ (() =>
  Schema.Union([ReplyMailboxEmailPayload, ReplyMailboxChatPayload]))();
export type MailboxesReply200 = MailboxSendReceipt;
export const MailboxesReply200 = MailboxSendReceipt;
export type MailboxesReply202 = MailboxPendingSendReceipt;
export const MailboxesReply202 = MailboxPendingSendReceipt;
export type MailboxesReply400 = MalformedRequestError;
export const MailboxesReply400 = MalformedRequestError;
export type MailboxesReply401 = UnauthorizedError;
export const MailboxesReply401 = UnauthorizedError;
export type MailboxesReply402 = PaymentRequiredError;
export const MailboxesReply402 = PaymentRequiredError;
export type MailboxesReply403 =
  | FlagDisabledError
  | MailboxSendRefusedError
  | OnboardingReviewRequiredError
  | ForbiddenError;
export const MailboxesReply403 = /* @__PURE__ */ (() =>
  Schema.Union([
    FlagDisabledError,
    MailboxSendRefusedError,
    OnboardingReviewRequiredError,
    ForbiddenError,
  ]))();
export type MailboxesReply404 = ResourceNotFoundError;
export const MailboxesReply404 = ResourceNotFoundError;
export type MailboxesReply409 = MailboxSendConflictError | ConflictError;
export const MailboxesReply409 = /* @__PURE__ */ (() =>
  Schema.Union([MailboxSendConflictError, ConflictError]))();
export type MailboxesReply422 = WhatsAppServiceWindowClosedError | ValidationError;
export const MailboxesReply422 = /* @__PURE__ */ (() =>
  Schema.Union([WhatsAppServiceWindowClosedError, ValidationError]))();
export type MailboxesReply429 = RateLimitedError;
export const MailboxesReply429 = RateLimitedError;
export type MailboxesReply500 = InternalError;
export const MailboxesReply500 = InternalError;
export type MailboxesReply502 = BillingProviderError;
export const MailboxesReply502 = BillingProviderError;
export type MailboxesReply503 = SenderNotReadyError;
export const MailboxesReply503 = SenderNotReadyError;
export type MailboxesReply504 = GatewayTimeoutError;
export const MailboxesReply504 = GatewayTimeoutError;
export type MailboxesReplyAllPathParams = { readonly id: MailboxId; readonly messageId: MessageId };
export const MailboxesReplyAllPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, messageId: MessageId }))();
export type MailboxesReplyAllHeaders = { readonly "idempotency-key"?: string };
export const MailboxesReplyAllHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Optional key that makes a mailbox send idempotent for the calling key or member. Repeating the request with the same key and body returns the original action in its current state. Keep the key after a lost response. Reusing it with different content returns 409. Active actions retain their key; terminal receipts remain replayable for 24 hours.",
      }).check(
        Schema.isPattern(new globalThis.RegExp("^[\\s\\S]{1,255}$")).annotate({
          expected: "a string matching the RegExp ^[\\s\\S]{1,255}$",
        }),
      ),
    ),
  }))();
export type MailboxesReplyAllRequestJson = ReplyMailboxEmailPayload | ReplyMailboxChatPayload;
export const MailboxesReplyAllRequestJson = /* @__PURE__ */ (() =>
  Schema.Union([ReplyMailboxEmailPayload, ReplyMailboxChatPayload]))();
export type MailboxesReplyAll200 = MailboxSendReceipt;
export const MailboxesReplyAll200 = MailboxSendReceipt;
export type MailboxesReplyAll202 = MailboxPendingSendReceipt;
export const MailboxesReplyAll202 = MailboxPendingSendReceipt;
export type MailboxesReplyAll400 = MalformedRequestError;
export const MailboxesReplyAll400 = MalformedRequestError;
export type MailboxesReplyAll401 = UnauthorizedError;
export const MailboxesReplyAll401 = UnauthorizedError;
export type MailboxesReplyAll402 = PaymentRequiredError;
export const MailboxesReplyAll402 = PaymentRequiredError;
export type MailboxesReplyAll403 =
  | FlagDisabledError
  | MailboxSendRefusedError
  | OnboardingReviewRequiredError
  | ForbiddenError;
export const MailboxesReplyAll403 = /* @__PURE__ */ (() =>
  Schema.Union([
    FlagDisabledError,
    MailboxSendRefusedError,
    OnboardingReviewRequiredError,
    ForbiddenError,
  ]))();
export type MailboxesReplyAll404 = ResourceNotFoundError;
export const MailboxesReplyAll404 = ResourceNotFoundError;
export type MailboxesReplyAll409 = MailboxSendConflictError | ConflictError;
export const MailboxesReplyAll409 = /* @__PURE__ */ (() =>
  Schema.Union([MailboxSendConflictError, ConflictError]))();
export type MailboxesReplyAll422 = WhatsAppServiceWindowClosedError | ValidationError;
export const MailboxesReplyAll422 = /* @__PURE__ */ (() =>
  Schema.Union([WhatsAppServiceWindowClosedError, ValidationError]))();
export type MailboxesReplyAll429 = RateLimitedError;
export const MailboxesReplyAll429 = RateLimitedError;
export type MailboxesReplyAll500 = InternalError;
export const MailboxesReplyAll500 = InternalError;
export type MailboxesReplyAll502 = BillingProviderError;
export const MailboxesReplyAll502 = BillingProviderError;
export type MailboxesReplyAll503 = SenderNotReadyError;
export const MailboxesReplyAll503 = SenderNotReadyError;
export type MailboxesReplyAll504 = GatewayTimeoutError;
export const MailboxesReplyAll504 = GatewayTimeoutError;
export type MailboxesPausePathParams = { readonly id: MailboxId };
export const MailboxesPausePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: MailboxId }))();
export type MailboxesPause200 = Mailbox;
export const MailboxesPause200 = Mailbox;
export type MailboxesPause400 = MalformedRequestError;
export const MailboxesPause400 = MalformedRequestError;
export type MailboxesPause401 = UnauthorizedError;
export const MailboxesPause401 = UnauthorizedError;
export type MailboxesPause403 = ForbiddenError;
export const MailboxesPause403 = ForbiddenError;
export type MailboxesPause404 = ResourceNotFoundError;
export const MailboxesPause404 = ResourceNotFoundError;
export type MailboxesPause422 = ValidationError;
export const MailboxesPause422 = ValidationError;
export type MailboxesPause500 = InternalError;
export const MailboxesPause500 = InternalError;
export type MailboxesPause504 = GatewayTimeoutError;
export const MailboxesPause504 = GatewayTimeoutError;
export type MailboxesListQuarantinePathParams = { readonly id: MailboxId };
export const MailboxesListQuarantinePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId }))();
export type MailboxesListQuarantineQuery = {
  readonly limit?: number | null;
  readonly cursor?: string;
  readonly after?: string;
  readonly before?: string;
};
export const MailboxesListQuarantineQuery = /* @__PURE__ */ (() =>
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
    after: Schema.optionalKey(Schema.String),
    before: Schema.optionalKey(Schema.String),
  }))();
export type MailboxesListQuarantine200 = MailboxQuarantinePage;
export const MailboxesListQuarantine200 = MailboxQuarantinePage;
export type MailboxesListQuarantine400 = MalformedRequestError;
export const MailboxesListQuarantine400 = MalformedRequestError;
export type MailboxesListQuarantine401 = UnauthorizedError;
export const MailboxesListQuarantine401 = UnauthorizedError;
export type MailboxesListQuarantine403 = ForbiddenError;
export const MailboxesListQuarantine403 = ForbiddenError;
export type MailboxesListQuarantine404 = ResourceNotFoundError;
export const MailboxesListQuarantine404 = ResourceNotFoundError;
export type MailboxesListQuarantine422 = ValidationError;
export const MailboxesListQuarantine422 = ValidationError;
export type MailboxesListQuarantine500 = InternalError;
export const MailboxesListQuarantine500 = InternalError;
export type MailboxesListQuarantine504 = GatewayTimeoutError;
export const MailboxesListQuarantine504 = GatewayTimeoutError;
export type MailboxesResumePathParams = { readonly id: MailboxId };
export const MailboxesResumePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: MailboxId }))();
export type MailboxesResume200 = Mailbox;
export const MailboxesResume200 = Mailbox;
export type MailboxesResume400 = MalformedRequestError;
export const MailboxesResume400 = MalformedRequestError;
export type MailboxesResume401 = UnauthorizedError;
export const MailboxesResume401 = UnauthorizedError;
export type MailboxesResume403 = ForbiddenError;
export const MailboxesResume403 = ForbiddenError;
export type MailboxesResume404 = ResourceNotFoundError;
export const MailboxesResume404 = ResourceNotFoundError;
export type MailboxesResume422 = ValidationError;
export const MailboxesResume422 = ValidationError;
export type MailboxesResume500 = InternalError;
export const MailboxesResume500 = InternalError;
export type MailboxesResume504 = GatewayTimeoutError;
export const MailboxesResume504 = GatewayTimeoutError;
export type MailboxesListThreadsPathParams = { readonly id: MailboxId };
export const MailboxesListThreadsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId }))();
export type MailboxesListThreadsQuery = {
  readonly limit?: number | null;
  readonly cursor?: string;
  readonly after?: string;
  readonly before?: string;
  readonly q?: string;
  readonly state?: "active" | "done";
  readonly folder?: MailboxThreadFolder;
  readonly label?: MailboxLabelId;
  readonly unread?: boolean | null;
  readonly starred?: boolean | null;
  readonly snoozed?: boolean | null;
};
export const MailboxesListThreadsQuery = /* @__PURE__ */ (() =>
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
    after: Schema.optionalKey(Schema.String),
    before: Schema.optionalKey(Schema.String),
    q: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Search subjects, participants, message text, and attachment filenames by semantic and keyword relevance. Filters narrow the search. Returns up to 100 best-matching threads across cursor pages; omit q to list by recent activity. New mail can take a few seconds to become searchable. Attachment contents are not searched.",
      }),
    ),
    state: Schema.optionalKey(Schema.Union([Schema.Literal("active"), Schema.Literal("done")])),
    folder: Schema.optionalKey(MailboxThreadFolder),
    label: Schema.optionalKey(MailboxLabelId),
    unread: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    starred: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    snoozed: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  }))();
export type MailboxesListThreads200 = MailboxThreadPage;
export const MailboxesListThreads200 = MailboxThreadPage;
export type MailboxesListThreads400 = MalformedRequestError;
export const MailboxesListThreads400 = MalformedRequestError;
export type MailboxesListThreads401 = UnauthorizedError;
export const MailboxesListThreads401 = UnauthorizedError;
export type MailboxesListThreads403 = ForbiddenError;
export const MailboxesListThreads403 = ForbiddenError;
export type MailboxesListThreads404 = ResourceNotFoundError;
export const MailboxesListThreads404 = ResourceNotFoundError;
export type MailboxesListThreads422 = ValidationError;
export const MailboxesListThreads422 = ValidationError;
export type MailboxesListThreads500 = InternalError;
export const MailboxesListThreads500 = InternalError;
export type MailboxesListThreads504 = GatewayTimeoutError;
export const MailboxesListThreads504 = GatewayTimeoutError;
export type MailboxesGetThreadPathParams = {
  readonly id: MailboxId;
  readonly threadId: MailboxThreadId;
};
export const MailboxesGetThreadPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, threadId: MailboxThreadId }))();
export type MailboxesGetThread200 = MailboxThread;
export const MailboxesGetThread200 = MailboxThread;
export type MailboxesGetThread400 = MalformedRequestError;
export const MailboxesGetThread400 = MalformedRequestError;
export type MailboxesGetThread401 = UnauthorizedError;
export const MailboxesGetThread401 = UnauthorizedError;
export type MailboxesGetThread403 = ForbiddenError;
export const MailboxesGetThread403 = ForbiddenError;
export type MailboxesGetThread404 = ResourceNotFoundError;
export const MailboxesGetThread404 = ResourceNotFoundError;
export type MailboxesGetThread422 = ValidationError;
export const MailboxesGetThread422 = ValidationError;
export type MailboxesGetThread500 = InternalError;
export const MailboxesGetThread500 = InternalError;
export type MailboxesGetThread504 = GatewayTimeoutError;
export const MailboxesGetThread504 = GatewayTimeoutError;
export type MailboxesUpdateThreadPathParams = {
  readonly id: MailboxId;
  readonly threadId: MailboxThreadId;
};
export const MailboxesUpdateThreadPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, threadId: MailboxThreadId }))();
export type MailboxesUpdateThreadRequestJson = {
  readonly folder?: MailboxThreadFolder | null;
  readonly priority?: MailboxThreadPriority | null;
  readonly done?: boolean | null;
  readonly closed?: boolean | null;
  readonly read?: boolean | null;
  readonly starred?: boolean | null;
  readonly snoozedUntil?: string | null;
};
export const MailboxesUpdateThreadRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    folder: Schema.optionalKey(Schema.Union([MailboxThreadFolder, Schema.Null])),
    priority: Schema.optionalKey(Schema.Union([MailboxThreadPriority, Schema.Null])),
    done: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    closed: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    read: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    starred: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    snoozedUntil: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type MailboxesUpdateThread200 = MailboxThreadState;
export const MailboxesUpdateThread200 = MailboxThreadState;
export type MailboxesUpdateThread400 = MalformedRequestError;
export const MailboxesUpdateThread400 = MalformedRequestError;
export type MailboxesUpdateThread401 = UnauthorizedError;
export const MailboxesUpdateThread401 = UnauthorizedError;
export type MailboxesUpdateThread403 = ForbiddenError;
export const MailboxesUpdateThread403 = ForbiddenError;
export type MailboxesUpdateThread404 = ResourceNotFoundError;
export const MailboxesUpdateThread404 = ResourceNotFoundError;
export type MailboxesUpdateThread422 = ValidationError;
export const MailboxesUpdateThread422 = ValidationError;
export type MailboxesUpdateThread500 = InternalError;
export const MailboxesUpdateThread500 = InternalError;
export type MailboxesUpdateThread504 = GatewayTimeoutError;
export const MailboxesUpdateThread504 = GatewayTimeoutError;
export type MailboxesGetThreadContentPathParams = {
  readonly id: MailboxId;
  readonly threadId: MailboxThreadId;
};
export const MailboxesGetThreadContentPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, threadId: MailboxThreadId }))();
export type MailboxesGetThreadContentQuery = {
  readonly limit?: number | null;
  readonly cursor?: string;
};
export const MailboxesGetThreadContentQuery = /* @__PURE__ */ (() =>
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
export type MailboxesGetThreadContent200 = MailboxThreadContentPage;
export const MailboxesGetThreadContent200 = MailboxThreadContentPage;
export type MailboxesGetThreadContent400 = MalformedRequestError;
export const MailboxesGetThreadContent400 = MalformedRequestError;
export type MailboxesGetThreadContent401 = UnauthorizedError;
export const MailboxesGetThreadContent401 = UnauthorizedError;
export type MailboxesGetThreadContent403 = ForbiddenError;
export const MailboxesGetThreadContent403 = ForbiddenError;
export type MailboxesGetThreadContent404 = ResourceNotFoundError;
export const MailboxesGetThreadContent404 = ResourceNotFoundError;
export type MailboxesGetThreadContent422 = ValidationError;
export const MailboxesGetThreadContent422 = ValidationError;
export type MailboxesGetThreadContent500 = InternalError;
export const MailboxesGetThreadContent500 = InternalError;
export type MailboxesGetThreadContent504 = GatewayTimeoutError;
export const MailboxesGetThreadContent504 = GatewayTimeoutError;
export type MailboxesAddThreadLabelsPathParams = {
  readonly id: MailboxId;
  readonly threadId: MailboxThreadId;
};
export const MailboxesAddThreadLabelsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, threadId: MailboxThreadId }))();
export type MailboxesAddThreadLabelsRequestJson = {
  readonly labels: readonly [MailboxLabelId, ...Array<MailboxLabelId>];
};
export const MailboxesAddThreadLabelsRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    labels: Schema.TupleWithRest(Schema.Tuple([MailboxLabelId]), [MailboxLabelId]),
  }))();
export type MailboxesAddThreadLabels200 = MailboxThreadState;
export const MailboxesAddThreadLabels200 = MailboxThreadState;
export type MailboxesAddThreadLabels400 = MalformedRequestError;
export const MailboxesAddThreadLabels400 = MalformedRequestError;
export type MailboxesAddThreadLabels401 = UnauthorizedError;
export const MailboxesAddThreadLabels401 = UnauthorizedError;
export type MailboxesAddThreadLabels403 = ForbiddenError;
export const MailboxesAddThreadLabels403 = ForbiddenError;
export type MailboxesAddThreadLabels404 = ResourceNotFoundError;
export const MailboxesAddThreadLabels404 = ResourceNotFoundError;
export type MailboxesAddThreadLabels422 = ValidationError;
export const MailboxesAddThreadLabels422 = ValidationError;
export type MailboxesAddThreadLabels500 = InternalError;
export const MailboxesAddThreadLabels500 = InternalError;
export type MailboxesAddThreadLabels504 = GatewayTimeoutError;
export const MailboxesAddThreadLabels504 = GatewayTimeoutError;
export type MailboxesRemoveThreadLabelsPathParams = {
  readonly id: MailboxId;
  readonly threadId: MailboxThreadId;
};
export const MailboxesRemoveThreadLabelsPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, threadId: MailboxThreadId }))();
export type MailboxesRemoveThreadLabelsRequestJson = {
  readonly labels: readonly [MailboxLabelId, ...Array<MailboxLabelId>];
};
export const MailboxesRemoveThreadLabelsRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    labels: Schema.TupleWithRest(Schema.Tuple([MailboxLabelId]), [MailboxLabelId]),
  }))();
export type MailboxesRemoveThreadLabels200 = MailboxThreadState;
export const MailboxesRemoveThreadLabels200 = MailboxThreadState;
export type MailboxesRemoveThreadLabels400 = MalformedRequestError;
export const MailboxesRemoveThreadLabels400 = MalformedRequestError;
export type MailboxesRemoveThreadLabels401 = UnauthorizedError;
export const MailboxesRemoveThreadLabels401 = UnauthorizedError;
export type MailboxesRemoveThreadLabels403 = ForbiddenError;
export const MailboxesRemoveThreadLabels403 = ForbiddenError;
export type MailboxesRemoveThreadLabels404 = ResourceNotFoundError;
export const MailboxesRemoveThreadLabels404 = ResourceNotFoundError;
export type MailboxesRemoveThreadLabels422 = ValidationError;
export const MailboxesRemoveThreadLabels422 = ValidationError;
export type MailboxesRemoveThreadLabels500 = InternalError;
export const MailboxesRemoveThreadLabels500 = InternalError;
export type MailboxesRemoveThreadLabels504 = GatewayTimeoutError;
export const MailboxesRemoveThreadLabels504 = GatewayTimeoutError;
export type MailboxesListThreadMessagesPathParams = {
  readonly id: MailboxId;
  readonly threadId: MailboxThreadId;
};
export const MailboxesListThreadMessagesPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, threadId: MailboxThreadId }))();
export type MailboxesListThreadMessagesQuery = {
  readonly limit?: number | null;
  readonly cursor?: string;
};
export const MailboxesListThreadMessagesQuery = /* @__PURE__ */ (() =>
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
export type MailboxesListThreadMessages200 = MailboxMessagePage;
export const MailboxesListThreadMessages200 = MailboxMessagePage;
export type MailboxesListThreadMessages400 = MalformedRequestError;
export const MailboxesListThreadMessages400 = MalformedRequestError;
export type MailboxesListThreadMessages401 = UnauthorizedError;
export const MailboxesListThreadMessages401 = UnauthorizedError;
export type MailboxesListThreadMessages403 = ForbiddenError;
export const MailboxesListThreadMessages403 = ForbiddenError;
export type MailboxesListThreadMessages404 = ResourceNotFoundError;
export const MailboxesListThreadMessages404 = ResourceNotFoundError;
export type MailboxesListThreadMessages422 = ValidationError;
export const MailboxesListThreadMessages422 = ValidationError;
export type MailboxesListThreadMessages500 = InternalError;
export const MailboxesListThreadMessages500 = InternalError;
export type MailboxesListThreadMessages504 = GatewayTimeoutError;
export const MailboxesListThreadMessages504 = GatewayTimeoutError;
export type MailboxesListThreadNotesPathParams = {
  readonly id: MailboxId;
  readonly threadId: MailboxThreadId;
};
export const MailboxesListThreadNotesPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, threadId: MailboxThreadId }))();
export type MailboxesListThreadNotesQuery = {
  readonly limit?: number | null;
  readonly cursor?: string;
};
export const MailboxesListThreadNotesQuery = /* @__PURE__ */ (() =>
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
export type MailboxesListThreadNotes200 = MailboxNotePage;
export const MailboxesListThreadNotes200 = MailboxNotePage;
export type MailboxesListThreadNotes400 = MalformedRequestError;
export const MailboxesListThreadNotes400 = MalformedRequestError;
export type MailboxesListThreadNotes401 = UnauthorizedError;
export const MailboxesListThreadNotes401 = UnauthorizedError;
export type MailboxesListThreadNotes403 = ForbiddenError;
export const MailboxesListThreadNotes403 = ForbiddenError;
export type MailboxesListThreadNotes404 = ResourceNotFoundError;
export const MailboxesListThreadNotes404 = ResourceNotFoundError;
export type MailboxesListThreadNotes422 = ValidationError;
export const MailboxesListThreadNotes422 = ValidationError;
export type MailboxesListThreadNotes500 = InternalError;
export const MailboxesListThreadNotes500 = InternalError;
export type MailboxesListThreadNotes504 = GatewayTimeoutError;
export const MailboxesListThreadNotes504 = GatewayTimeoutError;
export type MailboxesCreateNotePathParams = {
  readonly id: MailboxId;
  readonly threadId: MailboxThreadId;
};
export const MailboxesCreateNotePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, threadId: MailboxThreadId }))();
export type MailboxesCreateNoteRequestJson = {
  readonly body: string;
  readonly color?: string | null;
  readonly pinned?: boolean | null;
};
export const MailboxesCreateNoteRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    body: Schema.String,
    color: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    pinned: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  }))();
export type MailboxesCreateNote201 = MailboxNote;
export const MailboxesCreateNote201 = MailboxNote;
export type MailboxesCreateNote400 = MalformedRequestError;
export const MailboxesCreateNote400 = MalformedRequestError;
export type MailboxesCreateNote401 = UnauthorizedError;
export const MailboxesCreateNote401 = UnauthorizedError;
export type MailboxesCreateNote403 = ForbiddenError;
export const MailboxesCreateNote403 = ForbiddenError;
export type MailboxesCreateNote404 = ResourceNotFoundError;
export const MailboxesCreateNote404 = ResourceNotFoundError;
export type MailboxesCreateNote422 = ValidationError;
export const MailboxesCreateNote422 = ValidationError;
export type MailboxesCreateNote500 = InternalError;
export const MailboxesCreateNote500 = InternalError;
export type MailboxesCreateNote504 = GatewayTimeoutError;
export const MailboxesCreateNote504 = GatewayTimeoutError;
export type MailboxesDeleteNotePathParams = {
  readonly id: MailboxId;
  readonly threadId: MailboxThreadId;
  readonly noteId: MailboxNoteId;
};
export const MailboxesDeleteNotePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, threadId: MailboxThreadId, noteId: MailboxNoteId }))();
export type MailboxesDeleteNote200 = SuccessResponse;
export const MailboxesDeleteNote200 = SuccessResponse;
export type MailboxesDeleteNote400 = MalformedRequestError;
export const MailboxesDeleteNote400 = MalformedRequestError;
export type MailboxesDeleteNote401 = UnauthorizedError;
export const MailboxesDeleteNote401 = UnauthorizedError;
export type MailboxesDeleteNote403 = ForbiddenError;
export const MailboxesDeleteNote403 = ForbiddenError;
export type MailboxesDeleteNote404 = ResourceNotFoundError;
export const MailboxesDeleteNote404 = ResourceNotFoundError;
export type MailboxesDeleteNote422 = ValidationError;
export const MailboxesDeleteNote422 = ValidationError;
export type MailboxesDeleteNote500 = InternalError;
export const MailboxesDeleteNote500 = InternalError;
export type MailboxesDeleteNote504 = GatewayTimeoutError;
export const MailboxesDeleteNote504 = GatewayTimeoutError;
export type MailboxesUpdateNotePathParams = {
  readonly id: MailboxId;
  readonly threadId: MailboxThreadId;
  readonly noteId: MailboxNoteId;
};
export const MailboxesUpdateNotePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: MailboxId, threadId: MailboxThreadId, noteId: MailboxNoteId }))();
export type MailboxesUpdateNoteRequestJson = {
  readonly body?: string | null;
  readonly color?: string | null;
  readonly pinned?: boolean | null;
};
export const MailboxesUpdateNoteRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    body: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    color: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    pinned: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  }))();
export type MailboxesUpdateNote200 = MailboxNote;
export const MailboxesUpdateNote200 = MailboxNote;
export type MailboxesUpdateNote400 = MalformedRequestError;
export const MailboxesUpdateNote400 = MalformedRequestError;
export type MailboxesUpdateNote401 = UnauthorizedError;
export const MailboxesUpdateNote401 = UnauthorizedError;
export type MailboxesUpdateNote403 = ForbiddenError;
export const MailboxesUpdateNote403 = ForbiddenError;
export type MailboxesUpdateNote404 = ResourceNotFoundError;
export const MailboxesUpdateNote404 = ResourceNotFoundError;
export type MailboxesUpdateNote422 = ValidationError;
export const MailboxesUpdateNote422 = ValidationError;
export type MailboxesUpdateNote500 = InternalError;
export const MailboxesUpdateNote500 = InternalError;
export type MailboxesUpdateNote504 = GatewayTimeoutError;
export const MailboxesUpdateNote504 = GatewayTimeoutError;
export type MailboxesListOrganizationDraftsQuery = {
  readonly limit?: number | null;
  readonly cursor?: string;
  readonly mailboxId?: MailboxId | ReadonlyArray<MailboxId>;
  readonly kind?: "personal" | "shared";
  readonly threadId?: MailboxThreadId;
};
export const MailboxesListOrganizationDraftsQuery = /* @__PURE__ */ (() =>
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
    mailboxId: Schema.optionalKey(Schema.Union([MailboxId, Schema.Array(MailboxId)])),
    kind: Schema.optionalKey(Schema.Union([Schema.Literal("personal"), Schema.Literal("shared")])),
    threadId: Schema.optionalKey(MailboxThreadId),
  }))();
export type MailboxesListOrganizationDrafts200 = OrganizationMailboxDraftPage;
export const MailboxesListOrganizationDrafts200 = OrganizationMailboxDraftPage;
export type MailboxesListOrganizationDrafts400 = MalformedRequestError;
export const MailboxesListOrganizationDrafts400 = MalformedRequestError;
export type MailboxesListOrganizationDrafts401 = UnauthorizedError;
export const MailboxesListOrganizationDrafts401 = UnauthorizedError;
export type MailboxesListOrganizationDrafts403 = ForbiddenError;
export const MailboxesListOrganizationDrafts403 = ForbiddenError;
export type MailboxesListOrganizationDrafts404 = ResourceNotFoundError;
export const MailboxesListOrganizationDrafts404 = ResourceNotFoundError;
export type MailboxesListOrganizationDrafts422 = ValidationError;
export const MailboxesListOrganizationDrafts422 = ValidationError;
export type MailboxesListOrganizationDrafts500 = InternalError;
export const MailboxesListOrganizationDrafts500 = InternalError;
export type MailboxesListOrganizationDrafts504 = GatewayTimeoutError;
export const MailboxesListOrganizationDrafts504 = GatewayTimeoutError;
export type MailboxesGetNeedsYouQuery = {
  readonly limit?: number | null;
  readonly cursor?: string;
};
export const MailboxesGetNeedsYouQuery = /* @__PURE__ */ (() =>
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
export type MailboxesGetNeedsYou200 = MailboxNeedsYou;
export const MailboxesGetNeedsYou200 = MailboxNeedsYou;
export type MailboxesGetNeedsYou400 = MalformedRequestError;
export const MailboxesGetNeedsYou400 = MalformedRequestError;
export type MailboxesGetNeedsYou401 = UnauthorizedError;
export const MailboxesGetNeedsYou401 = UnauthorizedError;
export type MailboxesGetNeedsYou403 = ForbiddenError;
export const MailboxesGetNeedsYou403 = ForbiddenError;
export type MailboxesGetNeedsYou422 = ValidationError;
export const MailboxesGetNeedsYou422 = ValidationError;
export type MailboxesGetNeedsYou500 = InternalError;
export const MailboxesGetNeedsYou500 = InternalError;
export type MailboxesGetNeedsYou504 = GatewayTimeoutError;
export const MailboxesGetNeedsYou504 = GatewayTimeoutError;
export type MailboxesListOrganizationThreadsQuery = {
  readonly limit?: number | null;
  readonly cursor?: string;
  readonly after?: string;
  readonly before?: string;
  readonly q?: string;
  readonly state?: "active" | "done";
  readonly folder?: MailboxThreadFolder;
  readonly label?: MailboxLabelId;
  readonly unread?: boolean | null;
  readonly starred?: boolean | null;
  readonly snoozed?: boolean | null;
  readonly mailboxId?: MailboxId | ReadonlyArray<MailboxId>;
  readonly kind?: "personal" | "shared";
  readonly conversation?: ConversationId;
};
export const MailboxesListOrganizationThreadsQuery = /* @__PURE__ */ (() =>
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
    after: Schema.optionalKey(Schema.String),
    before: Schema.optionalKey(Schema.String),
    q: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Search subjects, participants, message text, and attachment filenames by semantic and keyword relevance. Filters narrow the search. Returns up to 100 best-matching threads across cursor pages; omit q to list by recent activity. New mail can take a few seconds to become searchable. Attachment contents are not searched.",
      }),
    ),
    state: Schema.optionalKey(Schema.Union([Schema.Literal("active"), Schema.Literal("done")])),
    folder: Schema.optionalKey(MailboxThreadFolder),
    label: Schema.optionalKey(MailboxLabelId),
    unread: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    starred: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    snoozed: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    mailboxId: Schema.optionalKey(Schema.Union([MailboxId, Schema.Array(MailboxId)])),
    kind: Schema.optionalKey(Schema.Union([Schema.Literal("personal"), Schema.Literal("shared")])),
    conversation: Schema.optionalKey(ConversationId),
  }))();
export type MailboxesListOrganizationThreads200 = OrganizationMailboxThreadPage;
export const MailboxesListOrganizationThreads200 = OrganizationMailboxThreadPage;
export type MailboxesListOrganizationThreads400 = MalformedRequestError;
export const MailboxesListOrganizationThreads400 = MalformedRequestError;
export type MailboxesListOrganizationThreads401 = UnauthorizedError;
export const MailboxesListOrganizationThreads401 = UnauthorizedError;
export type MailboxesListOrganizationThreads403 = ForbiddenError;
export const MailboxesListOrganizationThreads403 = ForbiddenError;
export type MailboxesListOrganizationThreads404 = ResourceNotFoundError;
export const MailboxesListOrganizationThreads404 = ResourceNotFoundError;
export type MailboxesListOrganizationThreads422 = ValidationError;
export const MailboxesListOrganizationThreads422 = ValidationError;
export type MailboxesListOrganizationThreads500 = InternalError;
export const MailboxesListOrganizationThreads500 = InternalError;
export type MailboxesListOrganizationThreads504 = GatewayTimeoutError;
export const MailboxesListOrganizationThreads504 = GatewayTimeoutError;

export class MailboxesGroup extends HttpApiGroup.make("Mailboxes")
  .add(
    HttpApiEndpoint.get("mailboxesList", "/v1/mailboxes", {
      query: MailboxesListQuery,
      success: MailboxesList200,
      error: [
        MailboxesList400.pipe(HttpApiSchema.status(400)),
        MailboxesList401.pipe(HttpApiSchema.status(401)),
        MailboxesList403.pipe(HttpApiSchema.status(403)),
        MailboxesList422.pipe(HttpApiSchema.status(422)),
        MailboxesList500,
        MailboxesList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.list")
      .annotate(OpenApi.Summary, "List mailboxes")
      .annotate(
        OpenApi.Description,
        "Returns summaries of the mailboxes the caller can read, newest first, filterable by namespace (`namespaceId`) and creation time (`after`, `before`). Pass `nextCursor` back as `cursor` for the next page; it is null on the last page. Read a mailbox's endpoints and metadata with `GET /v1/mailboxes/{id}`.",
      ),
    HttpApiEndpoint.post("mailboxesCreate", "/v1/mailboxes", {
      headers: MailboxesCreateHeaders,
      payload: MailboxesCreateRequestJson,
      success: MailboxesCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        MailboxesCreate400.pipe(HttpApiSchema.status(400)),
        MailboxesCreate401.pipe(HttpApiSchema.status(401)),
        MailboxesCreate402.pipe(HttpApiSchema.status(402)),
        MailboxesCreate403.pipe(HttpApiSchema.status(403)),
        MailboxesCreate404.pipe(HttpApiSchema.status(404)),
        MailboxesCreate409.pipe(HttpApiSchema.status(409)),
        MailboxesCreate422.pipe(HttpApiSchema.status(422)),
        MailboxesCreate500,
        MailboxesCreate502.pipe(HttpApiSchema.status(502)),
        MailboxesCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.create")
      .annotate(OpenApi.Summary, "Create a mailbox")
      .annotate(
        OpenApi.Description,
        "Creates a mailbox with one endpoint and returns it with status 201; the caller gets an admin grant on it. An email endpoint's address must be under the organization's Samva-hosted mail domain or a verified domain with receiving enabled, and the mailbox sends from it once its sendingStatus is ready. Hosted addresses return pending while sending setup completes. A phone endpoint's address is a number the organization connected on that channel, in E.164 form. The slug defaults to the address's local part, or a phone number's digits. Pass `slug` when that is taken or not a valid slug. The mailbox receives mail from now on; mail that arrived earlier is not added to it. Pass Idempotency-Key to retry safely: the same key and body return the original mailbox in its current state; a changed body returns 409. Conflicts if the address or slug is already in use. Returns 402 when the organization is at its plan's mailbox allowance or at its mailbox storage allowance; incoming mail is still received past the storage allowance.",
      ),
    HttpApiEndpoint.get("mailboxesGet", "/v1/mailboxes/:id", {
      params: MailboxesGetPathParams,
      success: MailboxesGet200,
      error: [
        MailboxesGet400.pipe(HttpApiSchema.status(400)),
        MailboxesGet401.pipe(HttpApiSchema.status(401)),
        MailboxesGet403.pipe(HttpApiSchema.status(403)),
        MailboxesGet404.pipe(HttpApiSchema.status(404)),
        MailboxesGet422.pipe(HttpApiSchema.status(422)),
        MailboxesGet500,
        MailboxesGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.get")
      .annotate(OpenApi.Summary, "Get a mailbox")
      .annotate(
        OpenApi.Description,
        "Returns a mailbox with its endpoints and metadata; each endpoint says whether it is the mailbox's default on its channel. Its grants are `GET /v1/mailboxes/{id}/grants` and its send policies `GET /v1/mailboxes/{id}/policies`.",
      ),
    HttpApiEndpoint.delete("mailboxesRemove", "/v1/mailboxes/:id", {
      params: MailboxesRemovePathParams,
      success: MailboxesRemove200,
      error: [
        MailboxesRemove400.pipe(HttpApiSchema.status(400)),
        MailboxesRemove401.pipe(HttpApiSchema.status(401)),
        MailboxesRemove403.pipe(HttpApiSchema.status(403)),
        MailboxesRemove404.pipe(HttpApiSchema.status(404)),
        MailboxesRemove422.pipe(HttpApiSchema.status(422)),
        MailboxesRemove500,
        MailboxesRemove502.pipe(HttpApiSchema.status(502)),
        MailboxesRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.remove")
      .annotate(OpenApi.Summary, "Delete a mailbox")
      .annotate(
        OpenApi.Description,
        "Deletes a mailbox with its endpoints, threads, drafts, and history. The messages it received retain their privacy. The mailbox leaves every API key scope and webhook endpoint filter that named it; a key or endpoint left with no mailbox is disabled. A signed-in organization owner may delete a former member's personal mailbox without reading it.",
      ),
    HttpApiEndpoint.patch("mailboxesUpdate", "/v1/mailboxes/:id", {
      params: MailboxesUpdatePathParams,
      payload: MailboxesUpdateRequestJson,
      success: MailboxesUpdate200,
      error: [
        MailboxesUpdate400.pipe(HttpApiSchema.status(400)),
        MailboxesUpdate401.pipe(HttpApiSchema.status(401)),
        MailboxesUpdate403.pipe(HttpApiSchema.status(403)),
        MailboxesUpdate404.pipe(HttpApiSchema.status(404)),
        MailboxesUpdate422.pipe(HttpApiSchema.status(422)),
        MailboxesUpdate500,
        MailboxesUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.update")
      .annotate(OpenApi.Summary, "Update a mailbox")
      .annotate(
        OpenApi.Description,
        "Updates the fields you name and keeps the rest. `metadata` merges into the stored metadata by key, and a `null` value deletes that key. Change an endpoint's sender name or default with `PATCH /v1/mailboxes/{id}/endpoints/{endpointId}`.",
      ),
    HttpApiEndpoint.get("mailboxesListActions", "/v1/mailboxes/:id/actions", {
      params: MailboxesListActionsPathParams,
      query: MailboxesListActionsQuery,
      success: MailboxesListActions200,
      error: [
        MailboxesListActions400.pipe(HttpApiSchema.status(400)),
        MailboxesListActions401.pipe(HttpApiSchema.status(401)),
        MailboxesListActions403.pipe(HttpApiSchema.status(403)),
        MailboxesListActions404.pipe(HttpApiSchema.status(404)),
        MailboxesListActions422.pipe(HttpApiSchema.status(422)),
        MailboxesListActions500,
        MailboxesListActions504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.listActions")
      .annotate(OpenApi.Summary, "List mailbox actions")
      .annotate(
        OpenApi.Description,
        "Returns the actions proposed on a mailbox, newest first, filterable by `threadId`, `state` (`approvalRequired` lists the actions waiting for a person), and creation time (`after`, `before`). Filters apply together within the mailbox. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.get("mailboxesGetAction", "/v1/mailboxes/:id/actions/:actionId", {
      params: MailboxesGetActionPathParams,
      success: MailboxesGetAction200,
      error: [
        MailboxesGetAction400.pipe(HttpApiSchema.status(400)),
        MailboxesGetAction401.pipe(HttpApiSchema.status(401)),
        MailboxesGetAction403.pipe(HttpApiSchema.status(403)),
        MailboxesGetAction404.pipe(HttpApiSchema.status(404)),
        MailboxesGetAction422.pipe(HttpApiSchema.status(422)),
        MailboxesGetAction500,
        MailboxesGetAction504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.getAction")
      .annotate(OpenApi.Summary, "Get a mailbox action")
      .annotate(
        OpenApi.Description,
        "Returns one action with its current progress. Send actions expose their immutable approved content, deadline, problem, and accepted receipt. A caller with mailbox read access may inspect actions; send-only callers may inspect only their own proposals. Acceptance and mailbox completion do not mean recipient delivery.",
      ),
    HttpApiEndpoint.post("mailboxesApproveAction", "/v1/mailboxes/:id/actions/:actionId/approve", {
      params: MailboxesApproveActionPathParams,
      payload: MailboxesApproveActionRequestJson,
      success: [
        MailboxesApproveAction200,
        MailboxesApproveAction202.pipe(HttpApiSchema.status(202)),
      ],
      error: [
        MailboxesApproveAction400.pipe(HttpApiSchema.status(400)),
        MailboxesApproveAction401.pipe(HttpApiSchema.status(401)),
        MailboxesApproveAction402.pipe(HttpApiSchema.status(402)),
        MailboxesApproveAction403.pipe(HttpApiSchema.status(403)),
        MailboxesApproveAction404.pipe(HttpApiSchema.status(404)),
        MailboxesApproveAction409.pipe(HttpApiSchema.status(409)),
        MailboxesApproveAction422.pipe(HttpApiSchema.status(422)),
        MailboxesApproveAction429.pipe(HttpApiSchema.status(429)),
        MailboxesApproveAction500,
        MailboxesApproveAction502.pipe(HttpApiSchema.status(502)),
        MailboxesApproveAction503.pipe(HttpApiSchema.status(503)),
        MailboxesApproveAction504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.approveAction")
      .annotate(OpenApi.Summary, "Approve a mailbox action")
      .annotate(
        OpenApi.Description,
        "Records approval of a send and returns 202 while it is pending. A send is queued for automatic retry within 15 minutes of approval; repeating approval does not extend this deadline. Accepted, completed, and notSent replays return 200. No expiry applies before approval. Only a person signed in or through OAuth may approve, and never the proposer. Non-send approvals execute synchronously and return 200 with their own execution states. Set `always: true` to add an actor-specific rule allowing matching future actions, subject to policy floors and guards. Remembering an allowance for a hosted agent or API key requires an organization owner or admin; for a hosted agent's integration tool call it lets that tool run without approval for every agent, which only the organization owner may do. A held action's `alwaysAllow` says who may and whether the caller can. A hand-off cannot be always allowed. The action's `resolution` names the approver; approving a held send publishes one `mailbox.action.resolved` event.",
      ),
    HttpApiEndpoint.post("mailboxesCancelAction", "/v1/mailboxes/:id/actions/:actionId/cancel", {
      params: MailboxesCancelActionPathParams,
      success: [MailboxesCancelAction200, MailboxesCancelAction202.pipe(HttpApiSchema.status(202))],
      error: [
        MailboxesCancelAction400.pipe(HttpApiSchema.status(400)),
        MailboxesCancelAction401.pipe(HttpApiSchema.status(401)),
        MailboxesCancelAction402.pipe(HttpApiSchema.status(402)),
        MailboxesCancelAction403.pipe(HttpApiSchema.status(403)),
        MailboxesCancelAction404.pipe(HttpApiSchema.status(404)),
        MailboxesCancelAction409.pipe(HttpApiSchema.status(409)),
        MailboxesCancelAction422.pipe(HttpApiSchema.status(422)),
        MailboxesCancelAction429.pipe(HttpApiSchema.status(429)),
        MailboxesCancelAction500,
        MailboxesCancelAction502.pipe(HttpApiSchema.status(502)),
        MailboxesCancelAction503.pipe(HttpApiSchema.status(503)),
        MailboxesCancelAction504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.cancelAction")
      .annotate(OpenApi.Summary, "Cancel a mailbox send")
      .annotate(
        OpenApi.Description,
        "Cancels a definitely unsent action and reopens its draft atomically. Only an authorized person who proposed the send or can approve actions may cancel. Accepted sends return 409 with their winning receipt and cannot be withdrawn. An uncertain send requires reconciliation and cannot be cancelled as unsent. Cancelling a send held for approval records `resolution.outcome: cancelled` and publishes one `mailbox.action.resolved` event.",
      ),
    HttpApiEndpoint.post("mailboxesDenyAction", "/v1/mailboxes/:id/actions/:actionId/deny", {
      params: MailboxesDenyActionPathParams,
      payload: MailboxesDenyActionRequestJson,
      success: MailboxesDenyAction200,
      error: [
        MailboxesDenyAction400.pipe(HttpApiSchema.status(400)),
        MailboxesDenyAction401.pipe(HttpApiSchema.status(401)),
        MailboxesDenyAction403.pipe(HttpApiSchema.status(403)),
        MailboxesDenyAction404.pipe(HttpApiSchema.status(404)),
        MailboxesDenyAction409.pipe(HttpApiSchema.status(409)),
        MailboxesDenyAction422.pipe(HttpApiSchema.status(422)),
        MailboxesDenyAction500,
        MailboxesDenyAction504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.denyAction")
      .annotate(OpenApi.Summary, "Deny a mailbox action")
      .annotate(
        OpenApi.Description,
        "Denies an action waiting for approval with a reason and returns it without executing it. Only a person signed in or through OAuth may deny, and never the one who proposed it. The action's `resolution` records the denier and reason; denying a held send publishes one `mailbox.action.resolved` event.",
      ),
    HttpApiEndpoint.post("mailboxesRetryAction", "/v1/mailboxes/:id/actions/:actionId/retry", {
      params: MailboxesRetryActionPathParams,
      success: [MailboxesRetryAction200, MailboxesRetryAction202.pipe(HttpApiSchema.status(202))],
      error: [
        MailboxesRetryAction400.pipe(HttpApiSchema.status(400)),
        MailboxesRetryAction401.pipe(HttpApiSchema.status(401)),
        MailboxesRetryAction402.pipe(HttpApiSchema.status(402)),
        MailboxesRetryAction403.pipe(HttpApiSchema.status(403)),
        MailboxesRetryAction404.pipe(HttpApiSchema.status(404)),
        MailboxesRetryAction409.pipe(HttpApiSchema.status(409)),
        MailboxesRetryAction422.pipe(HttpApiSchema.status(422)),
        MailboxesRetryAction429.pipe(HttpApiSchema.status(429)),
        MailboxesRetryAction500,
        MailboxesRetryAction502.pipe(HttpApiSchema.status(502)),
        MailboxesRetryAction503.pipe(HttpApiSchema.status(503)),
        MailboxesRetryAction504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.retryAction")
      .annotate(OpenApi.Summary, "Resume a mailbox send")
      .annotate(
        OpenApi.Description,
        "Resumes the same eligible action while preserving its content, message identity, existing retry delays and original deadline. A queued action can resume while cleanup from an ended send attempt waits. A send attempt that is still running or whose status is unknown cannot be retried. Only an authorized person who proposed the send or can approve actions may retry. Automatic waits need no manual Retry. This does not grant new approval or resubmit an accepted or uncertain send.",
      ),
    HttpApiEndpoint.get("mailboxesGetAgentActivity", "/v1/mailboxes/:id/agent-activity", {
      params: MailboxesGetAgentActivityPathParams,
      query: MailboxesGetAgentActivityQuery,
      success: MailboxesGetAgentActivity200,
      error: [
        MailboxesGetAgentActivity400.pipe(HttpApiSchema.status(400)),
        MailboxesGetAgentActivity401.pipe(HttpApiSchema.status(401)),
        MailboxesGetAgentActivity403.pipe(HttpApiSchema.status(403)),
        MailboxesGetAgentActivity404.pipe(HttpApiSchema.status(404)),
        MailboxesGetAgentActivity422.pipe(HttpApiSchema.status(422)),
        MailboxesGetAgentActivity500,
        MailboxesGetAgentActivity504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.getAgentActivity")
      .annotate(OpenApi.Summary, "Get mailbox activity")
      .annotate(
        OpenApi.Description,
        "Counts the actions proposed and events recorded on a mailbox between `after` and `before` (omit both for all time), and the actions waiting for approval now. List the actions and events themselves with `GET /v1/mailboxes/{id}/actions` and `GET /v1/mailboxes/{id}/events`.",
      ),
    HttpApiEndpoint.get("mailboxesListDrafts", "/v1/mailboxes/:id/drafts", {
      params: MailboxesListDraftsPathParams,
      query: MailboxesListDraftsQuery,
      success: MailboxesListDrafts200,
      error: [
        MailboxesListDrafts400.pipe(HttpApiSchema.status(400)),
        MailboxesListDrafts401.pipe(HttpApiSchema.status(401)),
        MailboxesListDrafts403.pipe(HttpApiSchema.status(403)),
        MailboxesListDrafts404.pipe(HttpApiSchema.status(404)),
        MailboxesListDrafts422.pipe(HttpApiSchema.status(422)),
        MailboxesListDrafts500,
        MailboxesListDrafts504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.listDrafts")
      .annotate(OpenApi.Summary, "List drafts")
      .annotate(
        OpenApi.Description,
        "Returns summaries of the caller's unsent drafts in the mailbox, newest first, optionally for one thread. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page. Read a draft's body with `GET /v1/mailboxes/{id}/drafts/{draftId}`.",
      ),
    HttpApiEndpoint.post("mailboxesCreateDraft", "/v1/mailboxes/:id/drafts", {
      params: MailboxesCreateDraftPathParams,
      payload: MailboxesCreateDraftRequestJson,
      success: MailboxesCreateDraft201.pipe(HttpApiSchema.status(201)),
      error: [
        MailboxesCreateDraft400.pipe(HttpApiSchema.status(400)),
        MailboxesCreateDraft401.pipe(HttpApiSchema.status(401)),
        MailboxesCreateDraft403.pipe(HttpApiSchema.status(403)),
        MailboxesCreateDraft404.pipe(HttpApiSchema.status(404)),
        MailboxesCreateDraft422.pipe(HttpApiSchema.status(422)),
        MailboxesCreateDraft500,
        MailboxesCreateDraft504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.createDraft")
      .annotate(OpenApi.Summary, "Create a draft")
      .annotate(
        OpenApi.Description,
        "Saves a draft of a new message, or of a reply when `inReplyToMessageId` names a message in the mailbox, and returns it with status 201. A phone channel's draft holds a recipient number and text. Send it with `POST /v1/mailboxes/{id}/drafts/{draftId}/send`.",
      ),
    HttpApiEndpoint.get("mailboxesGetDraft", "/v1/mailboxes/:id/drafts/:draftId", {
      params: MailboxesGetDraftPathParams,
      success: MailboxesGetDraft200,
      error: [
        MailboxesGetDraft400.pipe(HttpApiSchema.status(400)),
        MailboxesGetDraft401.pipe(HttpApiSchema.status(401)),
        MailboxesGetDraft403.pipe(HttpApiSchema.status(403)),
        MailboxesGetDraft404.pipe(HttpApiSchema.status(404)),
        MailboxesGetDraft422.pipe(HttpApiSchema.status(422)),
        MailboxesGetDraft500,
        MailboxesGetDraft504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.getDraft")
      .annotate(OpenApi.Summary, "Get a draft")
      .annotate(
        OpenApi.Description,
        "Returns one of the caller's drafts, or the draft of a send waiting for approval when the caller may approve it.",
      ),
    HttpApiEndpoint.delete("mailboxesDeleteDraft", "/v1/mailboxes/:id/drafts/:draftId", {
      params: MailboxesDeleteDraftPathParams,
      success: MailboxesDeleteDraft200,
      error: [
        MailboxesDeleteDraft400.pipe(HttpApiSchema.status(400)),
        MailboxesDeleteDraft401.pipe(HttpApiSchema.status(401)),
        MailboxesDeleteDraft403.pipe(HttpApiSchema.status(403)),
        MailboxesDeleteDraft404.pipe(HttpApiSchema.status(404)),
        MailboxesDeleteDraft422.pipe(HttpApiSchema.status(422)),
        MailboxesDeleteDraft500,
        MailboxesDeleteDraft504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.deleteDraft")
      .annotate(OpenApi.Summary, "Delete a draft")
      .annotate(OpenApi.Description, "Discards an unsent draft."),
    HttpApiEndpoint.patch("mailboxesUpdateDraft", "/v1/mailboxes/:id/drafts/:draftId", {
      params: MailboxesUpdateDraftPathParams,
      payload: MailboxesUpdateDraftRequestJson,
      success: MailboxesUpdateDraft200,
      error: [
        MailboxesUpdateDraft400.pipe(HttpApiSchema.status(400)),
        MailboxesUpdateDraft401.pipe(HttpApiSchema.status(401)),
        MailboxesUpdateDraft403.pipe(HttpApiSchema.status(403)),
        MailboxesUpdateDraft404.pipe(HttpApiSchema.status(404)),
        MailboxesUpdateDraft409.pipe(HttpApiSchema.status(409)),
        MailboxesUpdateDraft422.pipe(HttpApiSchema.status(422)),
        MailboxesUpdateDraft500,
        MailboxesUpdateDraft504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.updateDraft")
      .annotate(OpenApi.Summary, "Update a draft")
      .annotate(
        OpenApi.Description,
        "Updates the fields you name and keeps the rest; `null` clears an optional field. A draft whose send waits for approval cannot change and conflicts.",
      ),
    HttpApiEndpoint.post("mailboxesSendDraft", "/v1/mailboxes/:id/drafts/:draftId/send", {
      params: MailboxesSendDraftPathParams,
      headers: MailboxesSendDraftHeaders,
      success: [MailboxesSendDraft200, MailboxesSendDraft202.pipe(HttpApiSchema.status(202))],
      error: [
        MailboxesSendDraft400.pipe(HttpApiSchema.status(400)),
        MailboxesSendDraft401.pipe(HttpApiSchema.status(401)),
        MailboxesSendDraft402.pipe(HttpApiSchema.status(402)),
        MailboxesSendDraft403.pipe(HttpApiSchema.status(403)),
        MailboxesSendDraft404.pipe(HttpApiSchema.status(404)),
        MailboxesSendDraft409.pipe(HttpApiSchema.status(409)),
        MailboxesSendDraft422.pipe(HttpApiSchema.status(422)),
        MailboxesSendDraft429.pipe(HttpApiSchema.status(429)),
        MailboxesSendDraft500,
        MailboxesSendDraft502.pipe(HttpApiSchema.status(502)),
        MailboxesSendDraft503.pipe(HttpApiSchema.status(503)),
        MailboxesSendDraft504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.sendDraft")
      .annotate(OpenApi.Summary, "Send a draft")
      .annotate(
        OpenApi.Description,
        "Sends one of the caller's drafts: a reply draft in its thread, any other draft as a new conversation. A draft needs recipients, a subject, and a body.",
      ),
    HttpApiEndpoint.post("mailboxesCreateEndpoint", "/v1/mailboxes/:id/endpoints", {
      params: MailboxesCreateEndpointPathParams,
      payload: MailboxesCreateEndpointRequestJson,
      success: MailboxesCreateEndpoint201.pipe(HttpApiSchema.status(201)),
      error: [
        MailboxesCreateEndpoint400.pipe(HttpApiSchema.status(400)),
        MailboxesCreateEndpoint401.pipe(HttpApiSchema.status(401)),
        MailboxesCreateEndpoint403.pipe(HttpApiSchema.status(403)),
        MailboxesCreateEndpoint404.pipe(HttpApiSchema.status(404)),
        MailboxesCreateEndpoint409.pipe(HttpApiSchema.status(409)),
        MailboxesCreateEndpoint422.pipe(HttpApiSchema.status(422)),
        MailboxesCreateEndpoint500,
        MailboxesCreateEndpoint504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.createEndpoint")
      .annotate(OpenApi.Summary, "Add an endpoint to a mailbox")
      .annotate(
        OpenApi.Description,
        "Adds an endpoint to a mailbox and returns the mailbox with status 201. It follows the same rules as the endpoint of a new mailbox: an email address must be under the organization's Samva-hosted mail domain or a verified domain with receiving enabled, a phone number must be one the organization connected on that channel, and no mailbox may already hold it (409). Messages sent to it reach the mailbox from now on. It becomes the default on its channel only when the mailbox has no endpoint there yet.",
      ),
    HttpApiEndpoint.delete("mailboxesRemoveEndpoint", "/v1/mailboxes/:id/endpoints/:endpointId", {
      params: MailboxesRemoveEndpointPathParams,
      success: MailboxesRemoveEndpoint200,
      error: [
        MailboxesRemoveEndpoint400.pipe(HttpApiSchema.status(400)),
        MailboxesRemoveEndpoint401.pipe(HttpApiSchema.status(401)),
        MailboxesRemoveEndpoint403.pipe(HttpApiSchema.status(403)),
        MailboxesRemoveEndpoint404.pipe(HttpApiSchema.status(404)),
        MailboxesRemoveEndpoint422.pipe(HttpApiSchema.status(422)),
        MailboxesRemoveEndpoint500,
        MailboxesRemoveEndpoint504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.removeEndpoint")
      .annotate(OpenApi.Summary, "Remove an endpoint from a mailbox")
      .annotate(
        OpenApi.Description,
        "Removes an endpoint from a mailbox and returns the mailbox. Messages sent to it stop reaching the mailbox; its existing threads and messages stay, and replies in them leave from the mailbox's default endpoint on their channel. A mailbox keeps at least one endpoint, so removing the last one is refused (422). When the removed endpoint was the default on its channel, the oldest remaining endpoint there becomes the default.",
      ),
    HttpApiEndpoint.patch("mailboxesUpdateEndpoint", "/v1/mailboxes/:id/endpoints/:endpointId", {
      params: MailboxesUpdateEndpointPathParams,
      payload: MailboxesUpdateEndpointRequestJson,
      success: MailboxesUpdateEndpoint200,
      error: [
        MailboxesUpdateEndpoint400.pipe(HttpApiSchema.status(400)),
        MailboxesUpdateEndpoint401.pipe(HttpApiSchema.status(401)),
        MailboxesUpdateEndpoint403.pipe(HttpApiSchema.status(403)),
        MailboxesUpdateEndpoint404.pipe(HttpApiSchema.status(404)),
        MailboxesUpdateEndpoint422.pipe(HttpApiSchema.status(422)),
        MailboxesUpdateEndpoint500,
        MailboxesUpdateEndpoint504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.updateEndpoint")
      .annotate(OpenApi.Summary, "Update a mailbox endpoint")
      .annotate(
        OpenApi.Description,
        "Updates the fields you name and keeps the rest, and returns the mailbox. `displayName` is the name messages sent from the endpoint carry; null falls back to the mailbox's name. `default: true` makes the endpoint the one the mailbox starts new conversations from on its channel; replies always leave from the endpoint of their thread.",
      ),
    HttpApiEndpoint.get("mailboxesListEvents", "/v1/mailboxes/:id/events", {
      params: MailboxesListEventsPathParams,
      query: MailboxesListEventsQuery,
      success: MailboxesListEvents200,
      error: [
        MailboxesListEvents400.pipe(HttpApiSchema.status(400)),
        MailboxesListEvents401.pipe(HttpApiSchema.status(401)),
        MailboxesListEvents403.pipe(HttpApiSchema.status(403)),
        MailboxesListEvents404.pipe(HttpApiSchema.status(404)),
        MailboxesListEvents422.pipe(HttpApiSchema.status(422)),
        MailboxesListEvents500,
        MailboxesListEvents504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.listEvents")
      .annotate(OpenApi.Summary, "List mailbox events")
      .annotate(
        OpenApi.Description,
        "Returns mailbox audit records, newest first, filterable by when they happened (`after`, `before`). Audit event types: `mailbox.created`, `endpoint.attached`, `endpoint.detached`, `message.received`, `message.released`, `message.sent`, `thread.created`, `action.proposed`, `action.policy_decided`, `action.approval_requested`, `action.approval_resolved`, `action.accepted`, `action.executed`, `action.failed`. Thread and draft changes have no dedicated audit event types. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.get("mailboxesListFolders", "/v1/mailboxes/:id/folders", {
      params: MailboxesListFoldersPathParams,
      success: MailboxesListFolders200,
      error: [
        MailboxesListFolders400.pipe(HttpApiSchema.status(400)),
        MailboxesListFolders401.pipe(HttpApiSchema.status(401)),
        MailboxesListFolders403.pipe(HttpApiSchema.status(403)),
        MailboxesListFolders404.pipe(HttpApiSchema.status(404)),
        MailboxesListFolders422.pipe(HttpApiSchema.status(422)),
        MailboxesListFolders500,
        MailboxesListFolders504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.listFolders")
      .annotate(OpenApi.Summary, "List mailbox folders")
      .annotate(
        OpenApi.Description,
        "Returns each folder that holds a thread with its thread count and the caller's unread count. The folder set is fixed, so the list is never paged.",
      ),
    HttpApiEndpoint.get("mailboxesListGrants", "/v1/mailboxes/:id/grants", {
      params: MailboxesListGrantsPathParams,
      query: MailboxesListGrantsQuery,
      success: MailboxesListGrants200,
      error: [
        MailboxesListGrants400.pipe(HttpApiSchema.status(400)),
        MailboxesListGrants401.pipe(HttpApiSchema.status(401)),
        MailboxesListGrants403.pipe(HttpApiSchema.status(403)),
        MailboxesListGrants404.pipe(HttpApiSchema.status(404)),
        MailboxesListGrants422.pipe(HttpApiSchema.status(422)),
        MailboxesListGrants500,
        MailboxesListGrants504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.listGrants")
      .annotate(OpenApi.Summary, "List mailbox grants")
      .annotate(
        OpenApi.Description,
        "Returns who can use the mailbox, what each grant allows, newest first. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.post("mailboxesCreateGrant", "/v1/mailboxes/:id/grants", {
      params: MailboxesCreateGrantPathParams,
      payload: MailboxesCreateGrantRequestJson,
      success: MailboxesCreateGrant201.pipe(HttpApiSchema.status(201)),
      error: [
        MailboxesCreateGrant400.pipe(HttpApiSchema.status(400)),
        MailboxesCreateGrant401.pipe(HttpApiSchema.status(401)),
        MailboxesCreateGrant403.pipe(HttpApiSchema.status(403)),
        MailboxesCreateGrant404.pipe(HttpApiSchema.status(404)),
        MailboxesCreateGrant409.pipe(HttpApiSchema.status(409)),
        MailboxesCreateGrant422.pipe(HttpApiSchema.status(422)),
        MailboxesCreateGrant500,
        MailboxesCreateGrant504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.createGrant")
      .annotate(OpenApi.Summary, "Grant a member access to a mailbox")
      .annotate(
        OpenApi.Description,
        "Shares a mailbox with an organization member and returns the grant with status 201. The member must already belong to the organization. A member who already holds a grant conflicts rather than being rewritten: change an existing grant with `PATCH /v1/mailboxes/{id}/grants/{grantId}`, so a grant is never widened as a side effect of granting. List the current grants with `GET /v1/mailboxes/{id}/grants`.",
      ),
    HttpApiEndpoint.delete("mailboxesRevokeGrant", "/v1/mailboxes/:id/grants/:grantId", {
      params: MailboxesRevokeGrantPathParams,
      success: MailboxesRevokeGrant200,
      error: [
        MailboxesRevokeGrant400.pipe(HttpApiSchema.status(400)),
        MailboxesRevokeGrant401.pipe(HttpApiSchema.status(401)),
        MailboxesRevokeGrant403.pipe(HttpApiSchema.status(403)),
        MailboxesRevokeGrant404.pipe(HttpApiSchema.status(404)),
        MailboxesRevokeGrant409.pipe(HttpApiSchema.status(409)),
        MailboxesRevokeGrant422.pipe(HttpApiSchema.status(422)),
        MailboxesRevokeGrant500,
        MailboxesRevokeGrant504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.revokeGrant")
      .annotate(OpenApi.Summary, "Revoke a mailbox grant")
      .annotate(
        OpenApi.Description,
        "Removes a member's access to a mailbox. The last grant that can configure the mailbox cannot be revoked, so a mailbox is never left with nobody able to administer it: grant a teammate the admin role before removing your own.",
      ),
    HttpApiEndpoint.patch("mailboxesUpdateGrant", "/v1/mailboxes/:id/grants/:grantId", {
      params: MailboxesUpdateGrantPathParams,
      payload: MailboxesUpdateGrantRequestJson,
      success: MailboxesUpdateGrant200,
      error: [
        MailboxesUpdateGrant400.pipe(HttpApiSchema.status(400)),
        MailboxesUpdateGrant401.pipe(HttpApiSchema.status(401)),
        MailboxesUpdateGrant403.pipe(HttpApiSchema.status(403)),
        MailboxesUpdateGrant404.pipe(HttpApiSchema.status(404)),
        MailboxesUpdateGrant409.pipe(HttpApiSchema.status(409)),
        MailboxesUpdateGrant422.pipe(HttpApiSchema.status(422)),
        MailboxesUpdateGrant500,
        MailboxesUpdateGrant504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.updateGrant")
      .annotate(OpenApi.Summary, "Update a mailbox grant")
      .annotate(
        OpenApi.Description,
        "Changes a member's role on a mailbox and returns the updated grant. A field left out keeps its value; naming neither is a validation error. Taking admin from the last grant that can configure the mailbox conflicts, as revoking it does. The change applies to the member's next request on every surface.",
      ),
    HttpApiEndpoint.get("mailboxesListLabels", "/v1/mailboxes/:id/labels", {
      params: MailboxesListLabelsPathParams,
      success: MailboxesListLabels200,
      error: [
        MailboxesListLabels400.pipe(HttpApiSchema.status(400)),
        MailboxesListLabels401.pipe(HttpApiSchema.status(401)),
        MailboxesListLabels403.pipe(HttpApiSchema.status(403)),
        MailboxesListLabels404.pipe(HttpApiSchema.status(404)),
        MailboxesListLabels422.pipe(HttpApiSchema.status(422)),
        MailboxesListLabels500,
        MailboxesListLabels504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.listLabels")
      .annotate(OpenApi.Summary, "List mailbox labels")
      .annotate(
        OpenApi.Description,
        "Returns every label defined on a mailbox, ordered by name. A mailbox holds at most 100 labels, so the list is never paged.",
      ),
    HttpApiEndpoint.post("mailboxesCreateLabel", "/v1/mailboxes/:id/labels", {
      params: MailboxesCreateLabelPathParams,
      payload: MailboxesCreateLabelRequestJson,
      success: MailboxesCreateLabel201.pipe(HttpApiSchema.status(201)),
      error: [
        MailboxesCreateLabel400.pipe(HttpApiSchema.status(400)),
        MailboxesCreateLabel401.pipe(HttpApiSchema.status(401)),
        MailboxesCreateLabel403.pipe(HttpApiSchema.status(403)),
        MailboxesCreateLabel404.pipe(HttpApiSchema.status(404)),
        MailboxesCreateLabel409.pipe(HttpApiSchema.status(409)),
        MailboxesCreateLabel422.pipe(HttpApiSchema.status(422)),
        MailboxesCreateLabel500,
        MailboxesCreateLabel504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.createLabel")
      .annotate(OpenApi.Summary, "Create a mailbox label")
      .annotate(
        OpenApi.Description,
        "Creates a label on a mailbox and returns it with status 201. Slugs are unique within the mailbox, and a mailbox holds at most 100 labels; either limit conflicts.",
      ),
    HttpApiEndpoint.delete("mailboxesDeleteLabel", "/v1/mailboxes/:id/labels/:labelId", {
      params: MailboxesDeleteLabelPathParams,
      success: MailboxesDeleteLabel200,
      error: [
        MailboxesDeleteLabel400.pipe(HttpApiSchema.status(400)),
        MailboxesDeleteLabel401.pipe(HttpApiSchema.status(401)),
        MailboxesDeleteLabel403.pipe(HttpApiSchema.status(403)),
        MailboxesDeleteLabel404.pipe(HttpApiSchema.status(404)),
        MailboxesDeleteLabel422.pipe(HttpApiSchema.status(422)),
        MailboxesDeleteLabel500,
        MailboxesDeleteLabel504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.deleteLabel")
      .annotate(OpenApi.Summary, "Delete a mailbox label")
      .annotate(
        OpenApi.Description,
        "Deletes a label and removes it from every thread that carries it.",
      ),
    HttpApiEndpoint.patch("mailboxesUpdateLabel", "/v1/mailboxes/:id/labels/:labelId", {
      params: MailboxesUpdateLabelPathParams,
      payload: MailboxesUpdateLabelRequestJson,
      success: MailboxesUpdateLabel200,
      error: [
        MailboxesUpdateLabel400.pipe(HttpApiSchema.status(400)),
        MailboxesUpdateLabel401.pipe(HttpApiSchema.status(401)),
        MailboxesUpdateLabel403.pipe(HttpApiSchema.status(403)),
        MailboxesUpdateLabel404.pipe(HttpApiSchema.status(404)),
        MailboxesUpdateLabel422.pipe(HttpApiSchema.status(422)),
        MailboxesUpdateLabel500,
        MailboxesUpdateLabel504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.updateLabel")
      .annotate(OpenApi.Summary, "Update a mailbox label")
      .annotate(OpenApi.Description, "Updates the fields you name and keeps the rest."),
    HttpApiEndpoint.post("mailboxesSendMessage", "/v1/mailboxes/:id/messages", {
      params: MailboxesSendMessagePathParams,
      headers: MailboxesSendMessageHeaders,
      payload: MailboxesSendMessageRequestJson,
      success: [MailboxesSendMessage200, MailboxesSendMessage202.pipe(HttpApiSchema.status(202))],
      error: [
        MailboxesSendMessage400.pipe(HttpApiSchema.status(400)),
        MailboxesSendMessage401.pipe(HttpApiSchema.status(401)),
        MailboxesSendMessage402.pipe(HttpApiSchema.status(402)),
        MailboxesSendMessage403.pipe(HttpApiSchema.status(403)),
        MailboxesSendMessage404.pipe(HttpApiSchema.status(404)),
        MailboxesSendMessage409.pipe(HttpApiSchema.status(409)),
        MailboxesSendMessage422.pipe(HttpApiSchema.status(422)),
        MailboxesSendMessage429.pipe(HttpApiSchema.status(429)),
        MailboxesSendMessage500,
        MailboxesSendMessage502.pipe(HttpApiSchema.status(502)),
        MailboxesSendMessage503.pipe(HttpApiSchema.status(503)),
        MailboxesSendMessage504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.sendMessage")
      .annotate(OpenApi.Summary, "Send a new message")
      .annotate(
        OpenApi.Description,
        "Starts a new conversation from the mailbox's default endpoint on the channel the body names (email when omitted); a mailbox with no endpoint on that channel is refused (422). A message to a number joins the mailbox's thread with that number when it has one. Records a send action and returns 202 with its current receipt and a Location for action status. An installation, grant, or policy may require approval; otherwise the send is queued. Observe the same action through acceptance and mailbox completion. A policy refusal returns 403 with the recorded receipt.",
      ),
    HttpApiEndpoint.get("mailboxesGetMessage", "/v1/mailboxes/:id/messages/:messageId", {
      params: MailboxesGetMessagePathParams,
      success: MailboxesGetMessage200,
      error: [
        MailboxesGetMessage400.pipe(HttpApiSchema.status(400)),
        MailboxesGetMessage401.pipe(HttpApiSchema.status(401)),
        MailboxesGetMessage403.pipe(HttpApiSchema.status(403)),
        MailboxesGetMessage404.pipe(HttpApiSchema.status(404)),
        MailboxesGetMessage422.pipe(HttpApiSchema.status(422)),
        MailboxesGetMessage500,
        MailboxesGetMessage504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.getMessage")
      .annotate(OpenApi.Summary, "Get a mailbox message")
      .annotate(
        OpenApi.Description,
        "Returns a message in the mailbox, discriminated by `channel`. An email has its text, sanitized HTML, `replyText` (what the sender wrote, without quoted history), authentication verdicts, and attachments.",
      ),
    HttpApiEndpoint.get(
      "mailboxesGetMessageAttachment",
      "/v1/mailboxes/:id/messages/:messageId/attachments/:attachmentId",
      {
        params: MailboxesGetMessageAttachmentPathParams,
        success: MailboxesGetMessageAttachment200,
        error: [
          MailboxesGetMessageAttachment400.pipe(HttpApiSchema.status(400)),
          MailboxesGetMessageAttachment401.pipe(HttpApiSchema.status(401)),
          MailboxesGetMessageAttachment403.pipe(HttpApiSchema.status(403)),
          MailboxesGetMessageAttachment404.pipe(HttpApiSchema.status(404)),
          MailboxesGetMessageAttachment422.pipe(HttpApiSchema.status(422)),
          MailboxesGetMessageAttachment500,
          MailboxesGetMessageAttachment504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.getMessageAttachment")
      .annotate(OpenApi.Summary, "Get a message attachment")
      .annotate(
        OpenApi.Description,
        "Returns a short-lived download URL for one of the message's attachments.",
      ),
    HttpApiEndpoint.post(
      "mailboxesCopyMessageAttachment",
      "/v1/mailboxes/:id/messages/:messageId/attachments/:attachmentId/copy",
      {
        params: MailboxesCopyMessageAttachmentPathParams,
        success: MailboxesCopyMessageAttachment201.pipe(HttpApiSchema.status(201)),
        error: [
          MailboxesCopyMessageAttachment400.pipe(HttpApiSchema.status(400)),
          MailboxesCopyMessageAttachment401.pipe(HttpApiSchema.status(401)),
          MailboxesCopyMessageAttachment403.pipe(HttpApiSchema.status(403)),
          MailboxesCopyMessageAttachment404.pipe(HttpApiSchema.status(404)),
          MailboxesCopyMessageAttachment409.pipe(HttpApiSchema.status(409)),
          MailboxesCopyMessageAttachment422.pipe(HttpApiSchema.status(422)),
          MailboxesCopyMessageAttachment500,
          MailboxesCopyMessageAttachment504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.copyMessageAttachment")
      .annotate(OpenApi.Summary, "Copy a message attachment")
      .annotate(
        OpenApi.Description,
        "Copies one of a received message's attachments into the organization's media and returns it as a draft attachment (`mediaId`), so a draft can carry it. A draft that forwards a message saves each original attachment this way.",
      ),
    HttpApiEndpoint.post(
      "mailboxesDiscardMessage",
      "/v1/mailboxes/:id/messages/:messageId/discard",
      {
        params: MailboxesDiscardMessagePathParams,
        success: MailboxesDiscardMessage200,
        error: [
          MailboxesDiscardMessage400.pipe(HttpApiSchema.status(400)),
          MailboxesDiscardMessage401.pipe(HttpApiSchema.status(401)),
          MailboxesDiscardMessage403.pipe(HttpApiSchema.status(403)),
          MailboxesDiscardMessage404.pipe(HttpApiSchema.status(404)),
          MailboxesDiscardMessage409.pipe(HttpApiSchema.status(409)),
          MailboxesDiscardMessage422.pipe(HttpApiSchema.status(422)),
          MailboxesDiscardMessage500,
          MailboxesDiscardMessage502.pipe(HttpApiSchema.status(502)),
          MailboxesDiscardMessage504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.discardMessage")
      .annotate(OpenApi.Summary, "Discard a quarantined message")
      .annotate(
        OpenApi.Description,
        "Removes a held message from the mailbox's quarantine for good: it leaves the quarantine list, never reaches a thread, and can no longer be released. Quarantined and isolated (malware) messages can both be discarded. Publishes one `mailbox.message.discarded` event; discarding it again returns the same result and publishes nothing. A released message is in its thread and cannot be discarded: 409. Only a person can discard; API keys never hold `quarantine.release`.",
      ),
    HttpApiEndpoint.post("mailboxesForward", "/v1/mailboxes/:id/messages/:messageId/forward", {
      params: MailboxesForwardPathParams,
      headers: MailboxesForwardHeaders,
      payload: MailboxesForwardRequestJson,
      success: [MailboxesForward200, MailboxesForward202.pipe(HttpApiSchema.status(202))],
      error: [
        MailboxesForward400.pipe(HttpApiSchema.status(400)),
        MailboxesForward401.pipe(HttpApiSchema.status(401)),
        MailboxesForward402.pipe(HttpApiSchema.status(402)),
        MailboxesForward403.pipe(HttpApiSchema.status(403)),
        MailboxesForward404.pipe(HttpApiSchema.status(404)),
        MailboxesForward409.pipe(HttpApiSchema.status(409)),
        MailboxesForward422.pipe(HttpApiSchema.status(422)),
        MailboxesForward429.pipe(HttpApiSchema.status(429)),
        MailboxesForward500,
        MailboxesForward502.pipe(HttpApiSchema.status(502)),
        MailboxesForward503.pipe(HttpApiSchema.status(503)),
        MailboxesForward504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.forward")
      .annotate(OpenApi.Summary, "Forward a message")
      .annotate(
        OpenApi.Description,
        "Forwards an email to new recipients as a new conversation from the thread's endpoint, with the original quoted below the caller's text and its attachments attached ahead of any the caller adds. The combined attachments must fit the email attachment limits.",
      ),
    HttpApiEndpoint.get("mailboxesGetMessageRaw", "/v1/mailboxes/:id/messages/:messageId/raw", {
      params: MailboxesGetMessageRawPathParams,
      success: MailboxesGetMessageRaw200,
      error: [
        MailboxesGetMessageRaw400.pipe(HttpApiSchema.status(400)),
        MailboxesGetMessageRaw401.pipe(HttpApiSchema.status(401)),
        MailboxesGetMessageRaw403.pipe(HttpApiSchema.status(403)),
        MailboxesGetMessageRaw404.pipe(HttpApiSchema.status(404)),
        MailboxesGetMessageRaw422.pipe(HttpApiSchema.status(422)),
        MailboxesGetMessageRaw500,
        MailboxesGetMessageRaw504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.getMessageRaw")
      .annotate(OpenApi.Summary, "Get a message's raw MIME")
      .annotate(
        OpenApi.Description,
        "Returns a short-lived URL for the message exactly as it was received (`message/rfc822`). Sent messages have no stored MIME.",
      ),
    HttpApiEndpoint.post(
      "mailboxesReleaseMessage",
      "/v1/mailboxes/:id/messages/:messageId/release",
      {
        params: MailboxesReleaseMessagePathParams,
        success: MailboxesReleaseMessage200,
        error: [
          MailboxesReleaseMessage400.pipe(HttpApiSchema.status(400)),
          MailboxesReleaseMessage401.pipe(HttpApiSchema.status(401)),
          MailboxesReleaseMessage403.pipe(HttpApiSchema.status(403)),
          MailboxesReleaseMessage404.pipe(HttpApiSchema.status(404)),
          MailboxesReleaseMessage409.pipe(HttpApiSchema.status(409)),
          MailboxesReleaseMessage422.pipe(HttpApiSchema.status(422)),
          MailboxesReleaseMessage500,
          MailboxesReleaseMessage504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.releaseMessage")
      .annotate(OpenApi.Summary, "Release a quarantined message")
      .annotate(
        OpenApi.Description,
        "Delivers a quarantined message into the thread it would have joined and publishes one `mailbox.message.released` event. Releasing it again returns the same result and publishes nothing. Only a person can release; API keys never hold `quarantine.release`. Isolated (malware) messages and discarded messages cannot be released: 409.",
      ),
    HttpApiEndpoint.post("mailboxesReply", "/v1/mailboxes/:id/messages/:messageId/reply", {
      params: MailboxesReplyPathParams,
      headers: MailboxesReplyHeaders,
      payload: MailboxesReplyRequestJson,
      success: [MailboxesReply200, MailboxesReply202.pipe(HttpApiSchema.status(202))],
      error: [
        MailboxesReply400.pipe(HttpApiSchema.status(400)),
        MailboxesReply401.pipe(HttpApiSchema.status(401)),
        MailboxesReply402.pipe(HttpApiSchema.status(402)),
        MailboxesReply403.pipe(HttpApiSchema.status(403)),
        MailboxesReply404.pipe(HttpApiSchema.status(404)),
        MailboxesReply409.pipe(HttpApiSchema.status(409)),
        MailboxesReply422.pipe(HttpApiSchema.status(422)),
        MailboxesReply429.pipe(HttpApiSchema.status(429)),
        MailboxesReply500,
        MailboxesReply502.pipe(HttpApiSchema.status(502)),
        MailboxesReply503.pipe(HttpApiSchema.status(503)),
        MailboxesReply504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.reply")
      .annotate(OpenApi.Summary, "Reply to a message")
      .annotate(
        OpenApi.Description,
        "Replies to the message's Reply-To address, or its sender, in the same thread and from the thread's endpoint. The server sets the recipients, subject, and threading headers. The body's `channel` must match the thread's. On a phone channel the reply goes to the number on the other side of the thread. On WhatsApp, free-form `text` needs the customer's 24-hour service window to be open, and a closed window is refused (422, `WhatsAppServiceWindowClosedError`) rather than converted; send an approved template with `templateId` instead.",
      ),
    HttpApiEndpoint.post("mailboxesReplyAll", "/v1/mailboxes/:id/messages/:messageId/reply-all", {
      params: MailboxesReplyAllPathParams,
      headers: MailboxesReplyAllHeaders,
      payload: MailboxesReplyAllRequestJson,
      success: [MailboxesReplyAll200, MailboxesReplyAll202.pipe(HttpApiSchema.status(202))],
      error: [
        MailboxesReplyAll400.pipe(HttpApiSchema.status(400)),
        MailboxesReplyAll401.pipe(HttpApiSchema.status(401)),
        MailboxesReplyAll402.pipe(HttpApiSchema.status(402)),
        MailboxesReplyAll403.pipe(HttpApiSchema.status(403)),
        MailboxesReplyAll404.pipe(HttpApiSchema.status(404)),
        MailboxesReplyAll409.pipe(HttpApiSchema.status(409)),
        MailboxesReplyAll422.pipe(HttpApiSchema.status(422)),
        MailboxesReplyAll429.pipe(HttpApiSchema.status(429)),
        MailboxesReplyAll500,
        MailboxesReplyAll502.pipe(HttpApiSchema.status(502)),
        MailboxesReplyAll503.pipe(HttpApiSchema.status(503)),
        MailboxesReplyAll504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.replyAll")
      .annotate(OpenApi.Summary, "Reply to all recipients of a message")
      .annotate(
        OpenApi.Description,
        "Replies to the sender and every other recipient of the message except the mailbox itself, in the same thread and from the thread's endpoint. A phone thread has one other side, so it answers like a reply.",
      ),
    HttpApiEndpoint.post("mailboxesPause", "/v1/mailboxes/:id/pause", {
      params: MailboxesPausePathParams,
      success: MailboxesPause200,
      error: [
        MailboxesPause400.pipe(HttpApiSchema.status(400)),
        MailboxesPause401.pipe(HttpApiSchema.status(401)),
        MailboxesPause403.pipe(HttpApiSchema.status(403)),
        MailboxesPause404.pipe(HttpApiSchema.status(404)),
        MailboxesPause422.pipe(HttpApiSchema.status(422)),
        MailboxesPause500,
        MailboxesPause504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.pause")
      .annotate(OpenApi.Summary, "Pause a mailbox")
      .annotate(
        OpenApi.Description,
        "Stops the mailbox sending and stops new inbound mail reaching it. Mail that arrives while it is paused is not added when it resumes. Resume it with `POST /v1/mailboxes/{id}/resume`.",
      ),
    HttpApiEndpoint.get("mailboxesListQuarantine", "/v1/mailboxes/:id/quarantine", {
      params: MailboxesListQuarantinePathParams,
      query: MailboxesListQuarantineQuery,
      success: MailboxesListQuarantine200,
      error: [
        MailboxesListQuarantine400.pipe(HttpApiSchema.status(400)),
        MailboxesListQuarantine401.pipe(HttpApiSchema.status(401)),
        MailboxesListQuarantine403.pipe(HttpApiSchema.status(403)),
        MailboxesListQuarantine404.pipe(HttpApiSchema.status(404)),
        MailboxesListQuarantine422.pipe(HttpApiSchema.status(422)),
        MailboxesListQuarantine500,
        MailboxesListQuarantine504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.listQuarantine")
      .annotate(OpenApi.Summary, "List quarantined messages")
      .annotate(
        OpenApi.Description,
        "Returns the messages this mailbox holds instead of delivering, most recently held first: suspected spam, phishing, fraud, or prompt injection (`quarantined`), and malware (`isolated`). Each is metadata only; a held message appears in no thread, search, or `mailbox.message.received` event until a person releases it. `after` and `before` filter by when the message was held. Needs `quarantine.read`.",
      ),
    HttpApiEndpoint.post("mailboxesResume", "/v1/mailboxes/:id/resume", {
      params: MailboxesResumePathParams,
      success: MailboxesResume200,
      error: [
        MailboxesResume400.pipe(HttpApiSchema.status(400)),
        MailboxesResume401.pipe(HttpApiSchema.status(401)),
        MailboxesResume403.pipe(HttpApiSchema.status(403)),
        MailboxesResume404.pipe(HttpApiSchema.status(404)),
        MailboxesResume422.pipe(HttpApiSchema.status(422)),
        MailboxesResume500,
        MailboxesResume504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.resume")
      .annotate(OpenApi.Summary, "Resume a mailbox")
      .annotate(OpenApi.Description, "Lets a paused mailbox send and receive again."),
    HttpApiEndpoint.get("mailboxesListThreads", "/v1/mailboxes/:id/threads", {
      params: MailboxesListThreadsPathParams,
      query: MailboxesListThreadsQuery,
      success: MailboxesListThreads200,
      error: [
        MailboxesListThreads400.pipe(HttpApiSchema.status(400)),
        MailboxesListThreads401.pipe(HttpApiSchema.status(401)),
        MailboxesListThreads403.pipe(HttpApiSchema.status(403)),
        MailboxesListThreads404.pipe(HttpApiSchema.status(404)),
        MailboxesListThreads422.pipe(HttpApiSchema.status(422)),
        MailboxesListThreads500,
        MailboxesListThreads504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.listThreads")
      .annotate(OpenApi.Summary, "List threads in a mailbox")
      .annotate(
        OpenApi.Description,
        "Returns thread summaries. With `q`, semantic and keyword search returns up to 100 best-matching threads in relevance order across cursor pages. It searches subjects, participants, message text including quoted history, and attachment filenames, not attachment contents. New mail can take a few seconds to become searchable. Other filters narrow the searchable set. Without `q`, threads use most recent activity first; `after` and `before` filter by last activity for polling. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page. In a list without `q`, a thread that gains activity while you page moves ahead of the cursor, so a walk lists each thread at most once.",
      ),
    HttpApiEndpoint.get("mailboxesGetThread", "/v1/mailboxes/:id/threads/:threadId", {
      params: MailboxesGetThreadPathParams,
      success: MailboxesGetThread200,
      error: [
        MailboxesGetThread400.pipe(HttpApiSchema.status(400)),
        MailboxesGetThread401.pipe(HttpApiSchema.status(401)),
        MailboxesGetThread403.pipe(HttpApiSchema.status(403)),
        MailboxesGetThread404.pipe(HttpApiSchema.status(404)),
        MailboxesGetThread422.pipe(HttpApiSchema.status(422)),
        MailboxesGetThread500,
        MailboxesGetThread504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.getThread")
      .annotate(OpenApi.Summary, "Get a mailbox thread")
      .annotate(
        OpenApi.Description,
        "Returns a thread with its participants and where it stands. Read its messages with `GET .../threads/{threadId}/messages` and their bodies with `GET .../threads/{threadId}/content`.",
      ),
    HttpApiEndpoint.patch("mailboxesUpdateThread", "/v1/mailboxes/:id/threads/:threadId", {
      params: MailboxesUpdateThreadPathParams,
      payload: MailboxesUpdateThreadRequestJson,
      success: MailboxesUpdateThread200,
      error: [
        MailboxesUpdateThread400.pipe(HttpApiSchema.status(400)),
        MailboxesUpdateThread401.pipe(HttpApiSchema.status(401)),
        MailboxesUpdateThread403.pipe(HttpApiSchema.status(403)),
        MailboxesUpdateThread404.pipe(HttpApiSchema.status(404)),
        MailboxesUpdateThread422.pipe(HttpApiSchema.status(422)),
        MailboxesUpdateThread500,
        MailboxesUpdateThread504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.updateThread")
      .annotate(OpenApi.Summary, "Update a mailbox thread")
      .annotate(
        OpenApi.Description,
        "Updates the fields you name and keeps the rest. `folder`, `priority`, and `closed` are shared with everyone on the mailbox; `done`, `read`, `starred`, and `snoozedUntil` are the caller's own. The Done list includes the caller's Done and shared closed conversations; changing `done` does not reopen Close. Personal mailboxes refuse `closed`; archive them with `folder: archived`. Neither Done nor Close publishes webhook or event-stream events. A new live message clears Done for all readers and reopens Close. Labels are not updated here: use `POST` and `DELETE` on `/v1/mailboxes/{id}/threads/{threadId}/labels`. Returns where the thread stands, not its messages: read those with `GET .../threads/{threadId}`.",
      ),
    HttpApiEndpoint.get(
      "mailboxesGetThreadContent",
      "/v1/mailboxes/:id/threads/:threadId/content",
      {
        params: MailboxesGetThreadContentPathParams,
        query: MailboxesGetThreadContentQuery,
        success: MailboxesGetThreadContent200,
        error: [
          MailboxesGetThreadContent400.pipe(HttpApiSchema.status(400)),
          MailboxesGetThreadContent401.pipe(HttpApiSchema.status(401)),
          MailboxesGetThreadContent403.pipe(HttpApiSchema.status(403)),
          MailboxesGetThreadContent404.pipe(HttpApiSchema.status(404)),
          MailboxesGetThreadContent422.pipe(HttpApiSchema.status(422)),
          MailboxesGetThreadContent500,
          MailboxesGetThreadContent504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.getThreadContent")
      .annotate(OpenApi.Summary, "Read a mailbox thread")
      .annotate(
        OpenApi.Description,
        "Returns the thread's messages with their text, sanitized HTML, `replyText` (what each sender wrote, without quoted history), authentication verdicts, and attachments, oldest first. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.post("mailboxesAddThreadLabels", "/v1/mailboxes/:id/threads/:threadId/labels", {
      params: MailboxesAddThreadLabelsPathParams,
      payload: MailboxesAddThreadLabelsRequestJson,
      success: MailboxesAddThreadLabels200,
      error: [
        MailboxesAddThreadLabels400.pipe(HttpApiSchema.status(400)),
        MailboxesAddThreadLabels401.pipe(HttpApiSchema.status(401)),
        MailboxesAddThreadLabels403.pipe(HttpApiSchema.status(403)),
        MailboxesAddThreadLabels404.pipe(HttpApiSchema.status(404)),
        MailboxesAddThreadLabels422.pipe(HttpApiSchema.status(422)),
        MailboxesAddThreadLabels500,
        MailboxesAddThreadLabels504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.addThreadLabels")
      .annotate(OpenApi.Summary, "Add thread labels")
      .annotate(
        OpenApi.Description,
        "Adds the given mailbox labels to the thread, keeping the labels it already has, and returns where the thread stands. Every id must be one of the mailbox's labels.",
      ),
    HttpApiEndpoint.delete(
      "mailboxesRemoveThreadLabels",
      "/v1/mailboxes/:id/threads/:threadId/labels",
      {
        params: MailboxesRemoveThreadLabelsPathParams,
        payload: MailboxesRemoveThreadLabelsRequestJson,
        success: MailboxesRemoveThreadLabels200,
        error: [
          MailboxesRemoveThreadLabels400.pipe(HttpApiSchema.status(400)),
          MailboxesRemoveThreadLabels401.pipe(HttpApiSchema.status(401)),
          MailboxesRemoveThreadLabels403.pipe(HttpApiSchema.status(403)),
          MailboxesRemoveThreadLabels404.pipe(HttpApiSchema.status(404)),
          MailboxesRemoveThreadLabels422.pipe(HttpApiSchema.status(422)),
          MailboxesRemoveThreadLabels500,
          MailboxesRemoveThreadLabels504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.removeThreadLabels")
      .annotate(OpenApi.Summary, "Remove thread labels")
      .annotate(
        OpenApi.Description,
        "Removes the given labels from the thread and returns where the thread stands. A label the thread does not carry is ignored.",
      ),
    HttpApiEndpoint.get(
      "mailboxesListThreadMessages",
      "/v1/mailboxes/:id/threads/:threadId/messages",
      {
        params: MailboxesListThreadMessagesPathParams,
        query: MailboxesListThreadMessagesQuery,
        success: MailboxesListThreadMessages200,
        error: [
          MailboxesListThreadMessages400.pipe(HttpApiSchema.status(400)),
          MailboxesListThreadMessages401.pipe(HttpApiSchema.status(401)),
          MailboxesListThreadMessages403.pipe(HttpApiSchema.status(403)),
          MailboxesListThreadMessages404.pipe(HttpApiSchema.status(404)),
          MailboxesListThreadMessages422.pipe(HttpApiSchema.status(422)),
          MailboxesListThreadMessages500,
          MailboxesListThreadMessages504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.listThreadMessages")
      .annotate(OpenApi.Summary, "List messages in a mailbox thread")
      .annotate(
        OpenApi.Description,
        "Returns the thread's message summaries, oldest first. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page. Read the bodies with `GET .../threads/{threadId}/content` or one message with `GET /v1/mailboxes/{id}/messages/{messageId}`.",
      ),
    HttpApiEndpoint.get("mailboxesListThreadNotes", "/v1/mailboxes/:id/threads/:threadId/notes", {
      params: MailboxesListThreadNotesPathParams,
      query: MailboxesListThreadNotesQuery,
      success: MailboxesListThreadNotes200,
      error: [
        MailboxesListThreadNotes400.pipe(HttpApiSchema.status(400)),
        MailboxesListThreadNotes401.pipe(HttpApiSchema.status(401)),
        MailboxesListThreadNotes403.pipe(HttpApiSchema.status(403)),
        MailboxesListThreadNotes404.pipe(HttpApiSchema.status(404)),
        MailboxesListThreadNotes422.pipe(HttpApiSchema.status(422)),
        MailboxesListThreadNotes500,
        MailboxesListThreadNotes504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.listThreadNotes")
      .annotate(OpenApi.Summary, "List notes in a mailbox thread")
      .annotate(
        OpenApi.Description,
        "Returns the internal notes on a thread with their bodies, oldest first. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.post("mailboxesCreateNote", "/v1/mailboxes/:id/threads/:threadId/notes", {
      params: MailboxesCreateNotePathParams,
      payload: MailboxesCreateNoteRequestJson,
      success: MailboxesCreateNote201.pipe(HttpApiSchema.status(201)),
      error: [
        MailboxesCreateNote400.pipe(HttpApiSchema.status(400)),
        MailboxesCreateNote401.pipe(HttpApiSchema.status(401)),
        MailboxesCreateNote403.pipe(HttpApiSchema.status(403)),
        MailboxesCreateNote404.pipe(HttpApiSchema.status(404)),
        MailboxesCreateNote422.pipe(HttpApiSchema.status(422)),
        MailboxesCreateNote500,
        MailboxesCreateNote504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.createNote")
      .annotate(OpenApi.Summary, "Create a mailbox note")
      .annotate(
        OpenApi.Description,
        "Adds an internal note to a thread and returns it with status 201. Notes are visible to everyone on the mailbox and never sent.",
      ),
    HttpApiEndpoint.delete(
      "mailboxesDeleteNote",
      "/v1/mailboxes/:id/threads/:threadId/notes/:noteId",
      {
        params: MailboxesDeleteNotePathParams,
        success: MailboxesDeleteNote200,
        error: [
          MailboxesDeleteNote400.pipe(HttpApiSchema.status(400)),
          MailboxesDeleteNote401.pipe(HttpApiSchema.status(401)),
          MailboxesDeleteNote403.pipe(HttpApiSchema.status(403)),
          MailboxesDeleteNote404.pipe(HttpApiSchema.status(404)),
          MailboxesDeleteNote422.pipe(HttpApiSchema.status(422)),
          MailboxesDeleteNote500,
          MailboxesDeleteNote504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.deleteNote")
      .annotate(OpenApi.Summary, "Delete a mailbox note")
      .annotate(OpenApi.Description, "Deletes a note. Only the note's author may."),
    HttpApiEndpoint.patch(
      "mailboxesUpdateNote",
      "/v1/mailboxes/:id/threads/:threadId/notes/:noteId",
      {
        params: MailboxesUpdateNotePathParams,
        payload: MailboxesUpdateNoteRequestJson,
        success: MailboxesUpdateNote200,
        error: [
          MailboxesUpdateNote400.pipe(HttpApiSchema.status(400)),
          MailboxesUpdateNote401.pipe(HttpApiSchema.status(401)),
          MailboxesUpdateNote403.pipe(HttpApiSchema.status(403)),
          MailboxesUpdateNote404.pipe(HttpApiSchema.status(404)),
          MailboxesUpdateNote422.pipe(HttpApiSchema.status(422)),
          MailboxesUpdateNote500,
          MailboxesUpdateNote504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.updateNote")
      .annotate(OpenApi.Summary, "Update a mailbox note")
      .annotate(
        OpenApi.Description,
        "Updates the fields you name and keeps the rest. Only the note's author may.",
      ),
    HttpApiEndpoint.get("mailboxesListOrganizationDrafts", "/v1/mailboxes/drafts", {
      query: MailboxesListOrganizationDraftsQuery,
      success: MailboxesListOrganizationDrafts200,
      error: [
        MailboxesListOrganizationDrafts400.pipe(HttpApiSchema.status(400)),
        MailboxesListOrganizationDrafts401.pipe(HttpApiSchema.status(401)),
        MailboxesListOrganizationDrafts403.pipe(HttpApiSchema.status(403)),
        MailboxesListOrganizationDrafts404.pipe(HttpApiSchema.status(404)),
        MailboxesListOrganizationDrafts422.pipe(HttpApiSchema.status(422)),
        MailboxesListOrganizationDrafts500,
        MailboxesListOrganizationDrafts504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.listOrganizationDrafts")
      .annotate(OpenApi.Summary, "List your drafts across mailboxes")
      .annotate(
        OpenApi.Description,
        "Lists only the caller's own unsent drafts in mailboxes where they may write drafts, newest first. Repeat mailboxId to narrow the scope; kind selects personal or shared mailboxes and threadId narrows to one thread. Each row carries its mailbox identity. Teammates' and agents' drafts are excluded. Pass nextCursor as cursor for the next page.",
      ),
    HttpApiEndpoint.get("mailboxesGetNeedsYou", "/v1/mailboxes/needs-you", {
      query: MailboxesGetNeedsYouQuery,
      success: MailboxesGetNeedsYou200,
      error: [
        MailboxesGetNeedsYou400.pipe(HttpApiSchema.status(400)),
        MailboxesGetNeedsYou401.pipe(HttpApiSchema.status(401)),
        MailboxesGetNeedsYou403.pipe(HttpApiSchema.status(403)),
        MailboxesGetNeedsYou422.pipe(HttpApiSchema.status(422)),
        MailboxesGetNeedsYou500,
        MailboxesGetNeedsYou504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.getNeedsYou")
      .annotate(OpenApi.Summary, "List mailbox decisions awaiting you")
      .annotate(
        OpenApi.Description,
        "Returns held actions this caller can approve and quarantined messages this caller may release across their visible mailboxes. Counts cover all actionable items, independent of the current cursor page. Metadata only; isolated messages, self approvals, and decisions the credential cannot perform are excluded.",
      ),
    HttpApiEndpoint.get("mailboxesListOrganizationThreads", "/v1/mailboxes/threads", {
      query: MailboxesListOrganizationThreadsQuery,
      success: MailboxesListOrganizationThreads200,
      error: [
        MailboxesListOrganizationThreads400.pipe(HttpApiSchema.status(400)),
        MailboxesListOrganizationThreads401.pipe(HttpApiSchema.status(401)),
        MailboxesListOrganizationThreads403.pipe(HttpApiSchema.status(403)),
        MailboxesListOrganizationThreads404.pipe(HttpApiSchema.status(404)),
        MailboxesListOrganizationThreads422.pipe(HttpApiSchema.status(422)),
        MailboxesListOrganizationThreads500,
        MailboxesListOrganizationThreads504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "mailboxes.listOrganizationThreads")
      .annotate(OpenApi.Summary, "List threads across your mailboxes")
      .annotate(
        OpenApi.Description,
        "Lists only threads in mailboxes the caller can read. With `q`, semantic and keyword search returns the best-matching threads in relevance order, capped across cursor pages. Without `q`, threads use newest activity first. Repeat mailboxId to narrow the scope; kind selects personal or shared mailboxes. conversation selects the threads of one conversation (the conversationId a thread reports), one per readable mailbox it reached. state=active excludes the caller's Done and shared closed threads; state=done selects the caller's Done plus closed shared threads, without duplicates. Other filters and cursor pagination match the per-mailbox list.",
      ),
  )
  .annotate(
    OpenApi.Description,
    "Mailboxes: endpoints, threads, messages, drafts, and governed sends",
  ) {}
