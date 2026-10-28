// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  BillingProviderError,
  ConflictError,
  Cursor,
  EmailChannelError,
  EmailDomainId,
  EmailSenderId,
  ExternalServiceError,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  JsonValue,
  MediaId,
  MessageId,
  NamespaceId,
  OperationId,
  PaymentRequiredError,
  RateLimitedError,
  ResourceNotFoundError,
  SendsSeries,
  TopicId,
  UnauthorizedError,
  ValidationError,
  WebhookEndpointId,
} from "./shared";

export type BlockedEmailId = string & EffectBrand.Brand<"BlockedEmailId">;
export const BlockedEmailId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^blk_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^blk_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "BlockedEmailId",
    }),
  ).pipe(Schema.brand("BlockedEmailId")))();
export type SuccessResult = { readonly success: boolean; readonly message: string };
export const SuccessResult = /* @__PURE__ */ (() =>
  Schema.Struct({ success: Schema.Boolean, message: Schema.String }).annotate({
    identifier: "SuccessResult",
  }))();
export type BlockedEmailLogId = string & EffectBrand.Brand<"BlockedEmailLogId">;
export const BlockedEmailLogId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^blklog_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^blklog_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "BlockedEmailLogId",
    }),
  ).pipe(Schema.brand("BlockedEmailLogId")))();
export type DeliverabilityFacts = {
  readonly bounceRate: number;
  readonly complaintRate: number;
  readonly windowSends: number;
  readonly sendingStatus: "enabled" | "disabled" | "reinstated" | "unknown";
};
export const DeliverabilityFacts = /* @__PURE__ */ (() =>
  Schema.Struct({
    bounceRate: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" }))
      .check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      )
      .check(
        Schema.isLessThanOrEqualTo(1).annotate({ expected: "a value less than or equal to 1" }),
      ),
    complaintRate: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" }))
      .check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      )
      .check(
        Schema.isLessThanOrEqualTo(1).annotate({ expected: "a value less than or equal to 1" }),
      ),
    windowSends: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    sendingStatus: Schema.Union([
      Schema.Literal("enabled"),
      Schema.Literal("disabled"),
      Schema.Literal("reinstated"),
      Schema.Literal("unknown"),
    ]),
  }).annotate({
    description:
      "Bounce and complaint rates over the last 24 hours, as fractions between 0 and 1, with `windowSends`, the deliveries they were divided by, plus `sendingStatus`, which says whether the organization can currently send. The window matches the one the sending-pause rule reads. Below 200 sends that rule ignores the window entirely, so a rate over a smaller `windowSends` is a quotient rather than a reading. These are not a lifetime record; an identity with no traffic in the window reports zeroes.",
    identifier: "DeliverabilityFacts",
  }))();
export type CustomTrackingCertificate = {
  readonly reason: {
    readonly code:
      | "initializing"
      | "awaiting-hostname"
      | "awaiting-dcv"
      | "issuing"
      | "caa-blocked"
      | "validation-error"
      | "timed-out"
      | "verifying-route"
      | "ready"
      | "provider-unreachable";
    readonly message: string;
  };
  readonly lastCheckedAt: string | null;
  readonly nextCheckAt: string | null;
};
export const CustomTrackingCertificate = /* @__PURE__ */ (() =>
  Schema.Struct({
    reason: Schema.Struct({
      code: Schema.Union([
        Schema.Literal("initializing"),
        Schema.Literal("awaiting-hostname"),
        Schema.Literal("awaiting-dcv"),
        Schema.Literal("issuing"),
        Schema.Literal("caa-blocked"),
        Schema.Literal("validation-error"),
        Schema.Literal("timed-out"),
        Schema.Literal("verifying-route"),
        Schema.Literal("ready"),
        Schema.Literal("provider-unreachable"),
      ]),
      message: Schema.String,
    }),
    lastCheckedAt: Schema.Union([Schema.String, Schema.Null]),
    nextCheckAt: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "CustomTrackingCertificate" }))();
export type CustomTrackingDnsRecord = {
  readonly name: string;
  readonly type: string;
  readonly value: string;
};
export const CustomTrackingDnsRecord = /* @__PURE__ */ (() =>
  Schema.Struct({ name: Schema.String, type: Schema.String, value: Schema.String }).annotate({
    identifier: "CustomTrackingDnsRecord",
  }))();
export type DomainConnectEligibility =
  | {
      readonly eligible: false;
      readonly reason: "no-record" | "no-settings" | "no-sync" | "no-template" | "unavailable";
    }
  | { readonly eligible: true; readonly providerName?: string | null };
export const DomainConnectEligibility = /* @__PURE__ */ (() =>
  Schema.Union([
    Schema.Struct({
      eligible: Schema.Literal(false),
      reason: Schema.Union([
        Schema.Literal("no-record"),
        Schema.Literal("no-settings"),
        Schema.Literal("no-sync"),
        Schema.Literal("no-template"),
        Schema.Literal("unavailable"),
      ]),
    }),
    Schema.Struct({
      eligible: Schema.Literal(true),
      providerName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    }),
  ]).annotate({ identifier: "DomainConnectEligibility" }))();
export type DomainConnectApplyUrlResult = { readonly url: string };
export const DomainConnectApplyUrlResult = /* @__PURE__ */ (() =>
  Schema.Struct({ url: Schema.String }).annotate({ identifier: "DomainConnectApplyUrlResult" }))();
export type CustomTrackingDomainConnectCompleteResult = {
  readonly status: "applied" | "cancelled" | "failed" | "stale" | "invalid";
};
export const CustomTrackingDomainConnectCompleteResult = /* @__PURE__ */ (() =>
  Schema.Struct({
    status: Schema.Union([
      Schema.Literal("applied"),
      Schema.Literal("cancelled"),
      Schema.Literal("failed"),
      Schema.Literal("stale"),
      Schema.Literal("invalid"),
    ]),
  }).annotate({ identifier: "CustomTrackingDomainConnectCompleteResult" }))();
export type DomainConnectCompleteResult = {
  readonly status: "applied" | "cancelled" | "failed" | "invalid";
};
export const DomainConnectCompleteResult = /* @__PURE__ */ (() =>
  Schema.Struct({
    status: Schema.Union([
      Schema.Literal("applied"),
      Schema.Literal("cancelled"),
      Schema.Literal("failed"),
      Schema.Literal("invalid"),
    ]),
  }).annotate({ identifier: "DomainConnectCompleteResult" }))();
export type EmailDomainProvisioningExecution = {
  readonly status: "none" | "running" | "succeeded" | "failed";
  readonly generation: number;
  readonly revision: number;
};
export const EmailDomainProvisioningExecution = /* @__PURE__ */ (() =>
  Schema.Struct({
    status: Schema.Union([
      Schema.Literal("none"),
      Schema.Literal("running"),
      Schema.Literal("succeeded"),
      Schema.Literal("failed"),
    ]),
    generation: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    revision: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  }).annotate({ identifier: "EmailDomainProvisioningExecution" }))();
export type EmailDomainWarmingPlanId = string & EffectBrand.Brand<"EmailDomainWarmingPlanId">;
export const EmailDomainWarmingPlanId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^warm_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^warm_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "EmailDomainWarmingPlanId",
    }),
  ).pipe(Schema.brand("EmailDomainWarmingPlanId")))();
export type EmailDomainWarmingBatchId = string & EffectBrand.Brand<"EmailDomainWarmingBatchId">;
export const EmailDomainWarmingBatchId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^wbatch_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^wbatch_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "EmailDomainWarmingBatchId",
    }),
  ).pipe(Schema.brand("EmailDomainWarmingBatchId")))();
export type EmailDomainWarmingDecisionId = string &
  EffectBrand.Brand<"EmailDomainWarmingDecisionId">;
export const EmailDomainWarmingDecisionId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^wdec_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^wdec_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "EmailDomainWarmingDecisionId",
    }),
  ).pipe(Schema.brand("EmailDomainWarmingDecisionId")))();
export type DomainWarmingWindowHour = {
  readonly sent: number;
  readonly bounced: number;
  readonly complained: number;
};
export const DomainWarmingWindowHour = /* @__PURE__ */ (() =>
  Schema.Struct({
    sent: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    bounced: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    complained: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
  }).annotate({ identifier: "DomainWarmingWindowHour" }))();
export type DomainWarmingHolds = {
  readonly workspacePausedAt: string | null;
  readonly workspacePauseReason: string | null;
  readonly sendingStatus: "enabled" | "disabled" | "reinstated" | "unknown";
};
export const DomainWarmingHolds = /* @__PURE__ */ (() =>
  Schema.Struct({
    workspacePausedAt: Schema.Union([Schema.String, Schema.Null]),
    workspacePauseReason: Schema.Union([Schema.String, Schema.Null]),
    sendingStatus: Schema.Union([
      Schema.Literal("enabled"),
      Schema.Literal("disabled"),
      Schema.Literal("reinstated"),
      Schema.Literal("unknown"),
    ]),
  }).annotate({ identifier: "DomainWarmingHolds" }))();
export type EmailForwardingRuleId = string & EffectBrand.Brand<"EmailForwardingRuleId">;
export const EmailForwardingRuleId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^fwd_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^fwd_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "EmailForwardingRuleId",
    }),
  ).pipe(Schema.brand("EmailForwardingRuleId")))();
export type ForwardingConditions = {
  readonly subjectContains?: ReadonlyArray<string> | null;
  readonly fromContains?: ReadonlyArray<string> | null;
  readonly hasAttachments?: boolean | null;
};
export const ForwardingConditions = /* @__PURE__ */ (() =>
  Schema.Struct({
    subjectContains: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
    fromContains: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
    hasAttachments: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  }).annotate({ identifier: "ForwardingConditions" }))();
export type IdentityClearanceStatus = {
  readonly identityId: string;
  readonly decision: "undecided" | "approved" | "rejected";
  readonly generation: number;
  readonly canSend: boolean;
  readonly code:
    | "review_required"
    | "review_in_progress"
    | "information_required"
    | "review_rejected"
    | "identity_review_required"
    | "identity_review_rejected"
    | "identity_changed"
    | null;
  readonly nextAction:
    | "wait_for_review"
    | "provide_information"
    | "verify_sending_identity"
    | "reapply"
    | "contact_support"
    | null;
  readonly updatedAt: string;
};
export const IdentityClearanceStatus = /* @__PURE__ */ (() =>
  Schema.Struct({
    identityId: Schema.String,
    decision: Schema.Union([
      Schema.Literal("undecided"),
      Schema.Literal("approved"),
      Schema.Literal("rejected"),
    ]),
    generation: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    canSend: Schema.Boolean,
    code: Schema.Union([
      Schema.Union([
        Schema.Literal("review_required"),
        Schema.Literal("review_in_progress"),
        Schema.Literal("information_required"),
        Schema.Literal("review_rejected"),
        Schema.Literal("identity_review_required"),
        Schema.Literal("identity_review_rejected"),
        Schema.Literal("identity_changed"),
      ]),
      Schema.Null,
    ]),
    nextAction: Schema.Union([
      Schema.Union([
        Schema.Literal("wait_for_review"),
        Schema.Literal("provide_information"),
        Schema.Literal("verify_sending_identity"),
        Schema.Literal("reapply"),
        Schema.Literal("contact_support"),
      ]),
      Schema.Null,
    ]),
    updatedAt: Schema.String,
  }).annotate({ identifier: "IdentityClearanceStatus" }))();
export type SuppressionId = string & EffectBrand.Brand<"SuppressionId">;
export const SuppressionId = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^supp_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
      expected: "a string matching the RegExp ^supp_[0-9a-hjkmnp-tv-z]{16,24}$",
      identifier: "SuppressionId",
    }),
  ).pipe(Schema.brand("SuppressionId")))();
export type SuppressionCounts = {
  readonly bounce: number;
  readonly complaint: number;
  readonly unsubscribe: number;
  readonly manual: number;
};
export const SuppressionCounts = /* @__PURE__ */ (() =>
  Schema.Struct({
    bounce: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    complaint: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    unsubscribe: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    manual: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
  }).annotate({ identifier: "SuppressionCounts" }))();
export type EmailTrackingDefaults = { readonly opens: boolean; readonly clicks: boolean };
export const EmailTrackingDefaults = /* @__PURE__ */ (() =>
  Schema.Struct({ opens: Schema.Boolean, clicks: Schema.Boolean }).annotate({
    identifier: "EmailTrackingDefaults",
  }))();
export type TrackingRecipientEmail = string;
export const TrackingRecipientEmail = /* @__PURE__ */ (() =>
  Schema.String.check(
    Schema.isPattern(new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", "u")).annotate({
      expected: "a string matching the RegExp ^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
      identifier: "TrackingRecipientEmail",
    }),
  ))();
export type EmailDkimRotation = {
  readonly id: string;
  readonly domainId: EmailDomainId;
  readonly phase: "staged" | "cutover" | "complete";
  readonly selector: string;
  readonly record: {
    readonly name: string;
    readonly type: "TXT";
    readonly value: string;
    readonly ttl: string;
  };
  readonly formerRecord: { readonly name: string; readonly type: "TXT"; readonly value: string };
  readonly minimumRetainUntil: string | null;
};
export const EmailDkimRotation = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: Schema.String,
    domainId: EmailDomainId,
    phase: Schema.Union([
      Schema.Literal("staged"),
      Schema.Literal("cutover"),
      Schema.Literal("complete"),
    ]),
    selector: Schema.String,
    record: Schema.Struct({
      name: Schema.String,
      type: Schema.Literal("TXT"),
      value: Schema.String,
      ttl: Schema.String,
    }),
    formerRecord: Schema.Struct({
      name: Schema.String,
      type: Schema.Literal("TXT"),
      value: Schema.String,
    }),
    minimumRetainUntil: Schema.Union([Schema.String, Schema.Null]).annotate({
      description:
        "The earliest time the former DKIM record may be removed. Keep it published at least until then so mail signed with the former key still verifies.",
    }),
  }).annotate({ identifier: "EmailDkimRotation" }))();
export type DomainWarmingDomainRef = { readonly id: EmailDomainId; readonly domain: string };
export const DomainWarmingDomainRef = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId, domain: Schema.String }).annotate({
    identifier: "DomainWarmingDomainRef",
  }))();
export type BlockPage = {
  readonly items: ReadonlyArray<{
    readonly id: BlockedEmailId;
    readonly blockType: "email" | "domain";
    readonly blockValue: string;
    readonly reason: string;
    readonly notes: string | null;
    readonly isActive: boolean;
    readonly blockCount: number;
    readonly lastBlockedAt: string | null;
    readonly expiresAt: string | null;
    readonly createdAt: string;
  }>;
  readonly nextCursor: string | null;
};
export const BlockPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        id: BlockedEmailId,
        blockType: Schema.Union([Schema.Literal("email"), Schema.Literal("domain")]),
        blockValue: Schema.String,
        reason: Schema.String,
        notes: Schema.Union([Schema.String, Schema.Null]),
        isActive: Schema.Boolean,
        blockCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        lastBlockedAt: Schema.Union([Schema.String, Schema.Null]),
        expiresAt: Schema.Union([Schema.String, Schema.Null]),
        createdAt: Schema.String,
      }),
    ),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "BlockPage" }))();
export type BlockLogPage = {
  readonly items: ReadonlyArray<{
    readonly id: BlockedEmailLogId;
    readonly fromAddress: string;
    readonly toAddress: string;
    readonly subject: string | null;
    readonly blockType: "email" | "domain";
    readonly blockValue: string;
    readonly blockReason: string;
    readonly spfResult:
      | "pass"
      | "fail"
      | "softfail"
      | "neutral"
      | "none"
      | "policy"
      | "temperror"
      | "permerror"
      | null;
    readonly dkimResult:
      | "pass"
      | "fail"
      | "softfail"
      | "neutral"
      | "none"
      | "policy"
      | "temperror"
      | "permerror"
      | null;
    readonly dmarcResult:
      | "pass"
      | "fail"
      | "softfail"
      | "neutral"
      | "none"
      | "policy"
      | "temperror"
      | "permerror"
      | null;
    readonly blockedAt: string;
  }>;
  readonly nextCursor: string | null;
};
export const BlockLogPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        id: BlockedEmailLogId,
        fromAddress: Schema.String,
        toAddress: Schema.String,
        subject: Schema.Union([Schema.String, Schema.Null]),
        blockType: Schema.Union([Schema.Literal("email"), Schema.Literal("domain")]),
        blockValue: Schema.String,
        blockReason: Schema.String,
        spfResult: Schema.Union([
          Schema.Union([
            Schema.Literal("pass"),
            Schema.Literal("fail"),
            Schema.Literal("softfail"),
            Schema.Literal("neutral"),
            Schema.Literal("none"),
            Schema.Literal("policy"),
            Schema.Literal("temperror"),
            Schema.Literal("permerror"),
          ]),
          Schema.Null,
        ]),
        dkimResult: Schema.Union([
          Schema.Union([
            Schema.Literal("pass"),
            Schema.Literal("fail"),
            Schema.Literal("softfail"),
            Schema.Literal("neutral"),
            Schema.Literal("none"),
            Schema.Literal("policy"),
            Schema.Literal("temperror"),
            Schema.Literal("permerror"),
          ]),
          Schema.Null,
        ]),
        dmarcResult: Schema.Union([
          Schema.Union([
            Schema.Literal("pass"),
            Schema.Literal("fail"),
            Schema.Literal("softfail"),
            Schema.Literal("neutral"),
            Schema.Literal("none"),
            Schema.Literal("policy"),
            Schema.Literal("temperror"),
            Schema.Literal("permerror"),
          ]),
          Schema.Null,
        ]),
        blockedAt: Schema.String,
      }),
    ),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "BlockLogPage" }))();
export type ReceivingStatus = {
  readonly domain: string;
  readonly receivingHost: string;
  readonly sending: {
    readonly satisfied: boolean;
    readonly phase: "dns-setup" | "provisioning" | "verifying" | "ready" | "degraded" | "failed";
  };
  readonly destination: {
    readonly satisfied: boolean;
    readonly endpointId: WebhookEndpointId | null;
    readonly forwardingRules: number;
    readonly mailboxes: number;
  };
  readonly receiving: { readonly satisfied: boolean; readonly catchAll: boolean };
  readonly mx: {
    readonly satisfied: boolean;
    readonly state: "pointing-here" | "elsewhere" | "missing" | "unknown";
    readonly expected: { readonly exchange: string; readonly priority: number };
    readonly current: ReadonlyArray<{ readonly exchange: string; readonly priority: number }>;
  };
  readonly ready: boolean;
};
export const ReceivingStatus = /* @__PURE__ */ (() =>
  Schema.Struct({
    domain: Schema.String,
    receivingHost: Schema.String,
    sending: Schema.Struct({
      satisfied: Schema.Boolean,
      phase: Schema.Union([
        Schema.Literal("dns-setup"),
        Schema.Literal("provisioning"),
        Schema.Literal("verifying"),
        Schema.Literal("ready"),
        Schema.Literal("degraded"),
        Schema.Literal("failed"),
      ]),
    }),
    destination: Schema.Struct({
      satisfied: Schema.Boolean,
      endpointId: Schema.Union([WebhookEndpointId, Schema.Null]),
      forwardingRules: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      mailboxes: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    receiving: Schema.Struct({ satisfied: Schema.Boolean, catchAll: Schema.Boolean }),
    mx: Schema.Struct({
      satisfied: Schema.Boolean,
      state: Schema.Union([
        Schema.Literal("pointing-here"),
        Schema.Literal("elsewhere"),
        Schema.Literal("missing"),
        Schema.Literal("unknown"),
      ]),
      expected: Schema.Struct({
        exchange: Schema.String,
        priority: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      current: Schema.Array(
        Schema.Struct({
          exchange: Schema.String,
          priority: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    ready: Schema.Boolean,
  }).annotate({ identifier: "ReceivingStatus" }))();
export type EmailDomainPage = {
  readonly items: ReadonlyArray<{
    readonly id: EmailDomainId;
    readonly domain: string;
    readonly phase: "dns-setup" | "provisioning" | "verifying" | "ready" | "degraded" | "failed";
    readonly dkimSelector?: string | null;
    readonly dkimPublicKey?: string | null;
    readonly namespaceId: NamespaceId | null;
    readonly isDefault: boolean;
    readonly deliverability: DeliverabilityFacts;
    readonly series: SendsSeries;
    readonly createdAt: string;
    readonly updatedAt: string;
  }>;
  readonly nextCursor: string | null;
};
export const EmailDomainPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        id: EmailDomainId,
        domain: Schema.String,
        phase: Schema.Union([
          Schema.Literal("dns-setup"),
          Schema.Literal("provisioning"),
          Schema.Literal("verifying"),
          Schema.Literal("ready"),
          Schema.Literal("degraded"),
          Schema.Literal("failed"),
        ]),
        dkimSelector: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        dkimPublicKey: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        namespaceId: Schema.Union([NamespaceId, Schema.Null]).annotate({
          description:
            "The namespace the domain belongs to, or null at organization level. Only that namespace's keys and organization-wide callers reach it.",
        }),
        isDefault: Schema.Boolean,
        deliverability: DeliverabilityFacts,
        series: SendsSeries,
        createdAt: Schema.String,
        updatedAt: Schema.String,
      }),
    ),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "EmailDomainPage" }))();
export type EmailDomainDetailed = {
  readonly id: EmailDomainId;
  readonly domain: string;
  readonly phase: "dns-setup" | "provisioning" | "verifying" | "ready" | "degraded" | "failed";
  readonly dkimSelector?: string | null;
  readonly dkimPublicKey?: string | null;
  readonly dnsRecords: ReadonlyArray<{
    readonly type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "SOA" | "PTR" | "SRV" | "TXT" | "CAA";
    readonly name: string;
    readonly value: string;
    readonly ttl?: string | null;
    readonly description?: string | null;
    readonly priority?: number | null;
  }>;
  readonly verifiedAt: string | null;
  readonly namespaceId: NamespaceId | null;
  readonly isDefault: boolean;
  readonly deliverability: DeliverabilityFacts;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const EmailDomainDetailed = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: EmailDomainId,
    domain: Schema.String,
    phase: Schema.Union([
      Schema.Literal("dns-setup"),
      Schema.Literal("provisioning"),
      Schema.Literal("verifying"),
      Schema.Literal("ready"),
      Schema.Literal("degraded"),
      Schema.Literal("failed"),
    ]),
    dkimSelector: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    dkimPublicKey: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    dnsRecords: Schema.Array(
      Schema.Struct({
        type: Schema.Union([
          Schema.Literal("A"),
          Schema.Literal("AAAA"),
          Schema.Literal("CNAME"),
          Schema.Literal("MX"),
          Schema.Literal("NS"),
          Schema.Literal("SOA"),
          Schema.Literal("PTR"),
          Schema.Literal("SRV"),
          Schema.Literal("TXT"),
          Schema.Literal("CAA"),
        ]),
        name: Schema.String,
        value: Schema.String,
        ttl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        priority: Schema.optionalKey(
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
      }),
    ),
    verifiedAt: Schema.Union([Schema.String, Schema.Null]),
    namespaceId: Schema.Union([NamespaceId, Schema.Null]).annotate({
      description:
        "The namespace the domain belongs to, or null at organization level. Only that namespace's keys and organization-wide callers reach it.",
    }),
    isDefault: Schema.Boolean,
    deliverability: DeliverabilityFacts,
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "EmailDomainDetailed" }))();
export type CustomTrackingStatus = {
  readonly enabled: boolean;
  readonly customTracking: {
    readonly status: "pending" | "caa-blocked" | "active" | "teardown-scheduled" | "disabled";
    readonly label: string;
    readonly hostname: string;
    readonly parentDomain: string;
    readonly region: string;
    readonly sslStatus: string | null;
    readonly certificate: CustomTrackingCertificate | null;
    readonly dnsRecords: {
      readonly tracking: CustomTrackingDnsRecord | null;
      readonly dcvDelegation: CustomTrackingDnsRecord | null;
    };
    readonly caaBlocked: boolean;
    readonly verificationErrors: ReadonlyArray<string>;
    readonly teardownScheduledAt: string | null;
  } | null;
  readonly parentDomains: ReadonlyArray<string>;
};
export const CustomTrackingStatus = /* @__PURE__ */ (() =>
  Schema.Struct({
    enabled: Schema.Boolean,
    customTracking: Schema.Union([
      Schema.Struct({
        status: Schema.Union([
          Schema.Literal("pending"),
          Schema.Literal("caa-blocked"),
          Schema.Literal("active"),
          Schema.Literal("teardown-scheduled"),
          Schema.Literal("disabled"),
        ]),
        label: Schema.String,
        hostname: Schema.String,
        parentDomain: Schema.String,
        region: Schema.String,
        sslStatus: Schema.Union([Schema.String, Schema.Null]),
        certificate: Schema.Union([CustomTrackingCertificate, Schema.Null]),
        dnsRecords: Schema.Struct({
          tracking: Schema.Union([CustomTrackingDnsRecord, Schema.Null]),
          dcvDelegation: Schema.Union([CustomTrackingDnsRecord, Schema.Null]),
        }),
        caaBlocked: Schema.Boolean,
        verificationErrors: Schema.Array(Schema.String),
        teardownScheduledAt: Schema.Union([Schema.String, Schema.Null]),
      }),
      Schema.Null,
    ]),
    parentDomains: Schema.Array(Schema.String),
  }).annotate({ identifier: "CustomTrackingStatus" }))();
export type DomainWarmingPlan = {
  readonly id: EmailDomainWarmingPlanId;
  readonly status: "active" | "paused" | "completed";
  readonly identity: "new" | "migrating" | "returning";
  readonly initialDailyRecipients: number;
  readonly dailyGrowthPercent: number;
  readonly targetDailyRecipients: number;
  readonly holdReason: string | null;
  readonly heldAt: string | null;
  readonly pausedAt: string | null;
  readonly completedAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const DomainWarmingPlan = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: EmailDomainWarmingPlanId,
    status: Schema.Union([
      Schema.Literal("active"),
      Schema.Literal("paused"),
      Schema.Literal("completed"),
    ]),
    identity: Schema.Union([
      Schema.Literal("new"),
      Schema.Literal("migrating"),
      Schema.Literal("returning"),
    ]),
    initialDailyRecipients: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    dailyGrowthPercent: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    targetDailyRecipients: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    holdReason: Schema.Union([Schema.String, Schema.Null]),
    heldAt: Schema.Union([Schema.String, Schema.Null]),
    pausedAt: Schema.Union([Schema.String, Schema.Null]),
    completedAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }).annotate({ identifier: "DomainWarmingPlan" }))();
export type DomainWarmingBatch = {
  readonly id: EmailDomainWarmingBatchId;
  readonly sequence: number;
  readonly state: "scheduled" | "open" | "closed" | "cancelled";
  readonly startsAt: string;
  readonly endsAt: string;
  readonly allowanceRecipients: number;
  readonly dailyGrowthPercent: number;
  readonly targetDailyRecipients: number;
  readonly reservedRecipients: number;
  readonly acceptedRecipients: number;
  readonly cancelledAt: string | null;
  readonly createdAt: string;
};
export const DomainWarmingBatch = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: EmailDomainWarmingBatchId,
    sequence: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    state: Schema.Union([
      Schema.Literal("scheduled"),
      Schema.Literal("open"),
      Schema.Literal("closed"),
      Schema.Literal("cancelled"),
    ]),
    startsAt: Schema.String,
    endsAt: Schema.String,
    allowanceRecipients: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    dailyGrowthPercent: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    targetDailyRecipients: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    reservedRecipients: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    acceptedRecipients: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    cancelledAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
  }).annotate({ identifier: "DomainWarmingBatch" }))();
export type DomainWarmingDecision = {
  readonly id: EmailDomainWarmingDecisionId;
  readonly kind:
    | "plan-created"
    | "policy-updated"
    | "window-opened"
    | "window-cancelled"
    | "paused"
    | "resumed"
    | "held"
    | "completed";
  readonly batchId: EmailDomainWarmingBatchId | null;
  readonly actor: string;
  readonly note: string | null;
  readonly createdAt: string;
};
export const DomainWarmingDecision = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: EmailDomainWarmingDecisionId,
    kind: Schema.Union([
      Schema.Literal("plan-created"),
      Schema.Literal("policy-updated"),
      Schema.Literal("window-opened"),
      Schema.Literal("window-cancelled"),
      Schema.Literal("paused"),
      Schema.Literal("resumed"),
      Schema.Literal("held"),
      Schema.Literal("completed"),
    ]),
    batchId: Schema.Union([EmailDomainWarmingBatchId, Schema.Null]),
    actor: Schema.String,
    note: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
  }).annotate({ identifier: "DomainWarmingDecision" }))();
export type DomainWarmingEvidence = {
  readonly observedAt: string;
  readonly windowHours: number;
  readonly minimumSends: number;
  readonly sent: number;
  readonly bounced: number;
  readonly complained: number;
  readonly hourly: ReadonlyArray<DomainWarmingWindowHour>;
  readonly bounceThreshold: number;
  readonly complaintThreshold: number;
  readonly verdict: "insufficient-evidence" | "healthy" | "over-threshold";
  readonly thresholdReason: string | null;
};
export const DomainWarmingEvidence = /* @__PURE__ */ (() =>
  Schema.Struct({
    observedAt: Schema.String,
    windowHours: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    minimumSends: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    sent: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    bounced: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    complained: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    hourly: Schema.Array(DomainWarmingWindowHour),
    bounceThreshold: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    complaintThreshold: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ),
    verdict: Schema.Union([
      Schema.Literal("insufficient-evidence"),
      Schema.Literal("healthy"),
      Schema.Literal("over-threshold"),
    ]),
    thresholdReason: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "DomainWarmingEvidence" }))();
export type ForwardingRuleList = {
  readonly items: ReadonlyArray<{
    readonly id: EmailForwardingRuleId;
    readonly name: string;
    readonly description: string | null;
    readonly domainId: EmailDomainId | null;
    readonly sourcePattern: string | null;
    readonly forwardTo: ReadonlyArray<string>;
    readonly preserveHeaders: boolean;
    readonly priority: number;
    readonly isActive: boolean;
    readonly forwardCount: number;
    readonly failureCount: number;
    readonly lastForwardedAt: string | null;
    readonly createdAt: string;
  }>;
};
export const ForwardingRuleList = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        id: EmailForwardingRuleId,
        name: Schema.String,
        description: Schema.Union([Schema.String, Schema.Null]),
        domainId: Schema.Union([EmailDomainId, Schema.Null]),
        sourcePattern: Schema.Union([Schema.String, Schema.Null]),
        forwardTo: Schema.Array(Schema.String),
        preserveHeaders: Schema.Boolean,
        priority: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
          .check(
            Schema.isGreaterThanOrEqualTo(0).annotate({
              expected: "a value greater than or equal to 0",
            }),
          )
          .check(
            Schema.isLessThanOrEqualTo(2147483647).annotate({
              expected: "a value less than or equal to 2147483647",
            }),
          ),
        isActive: Schema.Boolean,
        forwardCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        failureCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
        lastForwardedAt: Schema.Union([Schema.String, Schema.Null]),
        createdAt: Schema.String,
      }),
    ).check(Schema.isMaxLength(100).annotate({ expected: "a value with a length of at most 100" })),
  }).annotate({ identifier: "ForwardingRuleList" }))();
export type ForwardingLogPage = {
  readonly items: ReadonlyArray<{
    readonly id: string;
    readonly forwardingRuleId: EmailForwardingRuleId | null;
    readonly originalFromAddress: string;
    readonly originalToAddress: string;
    readonly originalSubject: string | null;
    readonly forwardedTo: ReadonlyArray<string>;
    readonly status: "pending" | "forwarded" | "failed";
    readonly errorMessage: string | null;
    readonly messageId: MessageId | null;
    readonly forwardedAt: string | null;
    readonly createdAt: string;
  }>;
  readonly nextCursor: string | null;
};
export const ForwardingLogPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        forwardingRuleId: Schema.Union([EmailForwardingRuleId, Schema.Null]),
        originalFromAddress: Schema.String,
        originalToAddress: Schema.String,
        originalSubject: Schema.Union([Schema.String, Schema.Null]),
        forwardedTo: Schema.Array(Schema.String),
        status: Schema.Union([
          Schema.Literal("pending"),
          Schema.Literal("forwarded"),
          Schema.Literal("failed"),
        ]),
        errorMessage: Schema.Union([Schema.String, Schema.Null]),
        messageId: Schema.Union([MessageId, Schema.Null]),
        forwardedAt: Schema.Union([Schema.String, Schema.Null]),
        createdAt: Schema.String,
      }),
    ),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "ForwardingLogPage" }))();
export type OnboardingReviewStatus = {
  readonly decision: "undecided" | "approved" | "rejected";
  readonly trustTier: "screened" | "probation" | "established";
  readonly stage:
    | "collecting"
    | "automated_review"
    | "manual_review"
    | "information_requested"
    | "complete";
  readonly generation: number;
  readonly canSend: boolean;
  readonly code:
    | "review_required"
    | "review_in_progress"
    | "information_required"
    | "review_rejected"
    | "identity_review_required"
    | "identity_review_rejected"
    | "identity_changed"
    | null;
  readonly nextAction:
    | "wait_for_review"
    | "provide_information"
    | "verify_sending_identity"
    | "reapply"
    | "contact_support"
    | null;
  readonly canReapply: boolean;
  readonly informationRequest: {
    readonly id: string;
    readonly requestedFields: ReadonlyArray<string>;
    readonly requestedAt: string;
    readonly canRespond: boolean;
  } | null;
  readonly identities: ReadonlyArray<IdentityClearanceStatus>;
  readonly updatedAt: string | null;
};
export const OnboardingReviewStatus = /* @__PURE__ */ (() =>
  Schema.Struct({
    decision: Schema.Union([
      Schema.Literal("undecided"),
      Schema.Literal("approved"),
      Schema.Literal("rejected"),
    ]),
    trustTier: Schema.Union([
      Schema.Literal("screened"),
      Schema.Literal("probation"),
      Schema.Literal("established"),
    ]),
    stage: Schema.Union([
      Schema.Literal("collecting"),
      Schema.Literal("automated_review"),
      Schema.Literal("manual_review"),
      Schema.Literal("information_requested"),
      Schema.Literal("complete"),
    ]),
    generation: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    canSend: Schema.Boolean,
    code: Schema.Union([
      Schema.Union([
        Schema.Literal("review_required"),
        Schema.Literal("review_in_progress"),
        Schema.Literal("information_required"),
        Schema.Literal("review_rejected"),
        Schema.Literal("identity_review_required"),
        Schema.Literal("identity_review_rejected"),
        Schema.Literal("identity_changed"),
      ]),
      Schema.Null,
    ]),
    nextAction: Schema.Union([
      Schema.Union([
        Schema.Literal("wait_for_review"),
        Schema.Literal("provide_information"),
        Schema.Literal("verify_sending_identity"),
        Schema.Literal("reapply"),
        Schema.Literal("contact_support"),
      ]),
      Schema.Null,
    ]),
    canReapply: Schema.Boolean,
    informationRequest: Schema.Union([
      Schema.Struct({
        id: Schema.String,
        requestedFields: Schema.Array(Schema.String),
        requestedAt: Schema.String,
        canRespond: Schema.Boolean,
      }),
      Schema.Null,
    ]),
    identities: Schema.Array(IdentityClearanceStatus),
    updatedAt: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "OnboardingReviewStatus" }))();
export type EmailSenderPage = {
  readonly items: ReadonlyArray<{
    readonly id: EmailSenderId;
    readonly organizationId: string;
    readonly email: string;
    readonly name: string | null;
    readonly domainId: EmailDomainId | null;
    readonly namespaceId: NamespaceId | null;
    readonly verificationStatus: "pending" | "verified" | "failed";
    readonly verifiedAt: string | null;
    readonly verificationToken: string | null;
    readonly providerLifecycle: "provisioning" | "active" | "deleting" | "failed";
    readonly providerFailureCode: string | null;
    readonly isDefault: boolean;
    readonly replyToEmails: ReadonlyArray<string> | null;
    readonly deliverability: DeliverabilityFacts;
    readonly series: SendsSeries;
    readonly isActive: boolean;
    readonly createdAt: string;
    readonly updatedAt: string;
  }>;
  readonly nextCursor: string | null;
};
export const EmailSenderPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        id: EmailSenderId,
        organizationId: Schema.String,
        email: Schema.String,
        name: Schema.Union([Schema.String, Schema.Null]),
        domainId: Schema.Union([EmailDomainId, Schema.Null]),
        namespaceId: Schema.Union([NamespaceId, Schema.Null]).annotate({
          description:
            "The namespace the sender belongs to, or null at organization level. A sender on a domain takes the domain's namespace.",
        }),
        verificationStatus: Schema.Union([
          Schema.Literal("pending"),
          Schema.Literal("verified"),
          Schema.Literal("failed"),
        ]),
        verifiedAt: Schema.Union([Schema.String, Schema.Null]),
        verificationToken: Schema.Union([Schema.String, Schema.Null]),
        providerLifecycle: Schema.Union([
          Schema.Literal("provisioning"),
          Schema.Literal("active"),
          Schema.Literal("deleting"),
          Schema.Literal("failed"),
        ]),
        providerFailureCode: Schema.Union([Schema.String, Schema.Null]),
        isDefault: Schema.Boolean,
        replyToEmails: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
        deliverability: DeliverabilityFacts,
        series: SendsSeries,
        isActive: Schema.Boolean,
        createdAt: Schema.String,
        updatedAt: Schema.String,
      }),
    ),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "EmailSenderPage" }))();
export type SuppressionEntry = {
  readonly id: SuppressionId;
  readonly email: string;
  readonly type: "bounce" | "complaint" | "unsubscribe" | "manual";
  readonly bounceType: string | null;
  readonly bounceSubType: string | null;
  readonly reason: string | null;
  readonly messageId: MessageId | null;
  readonly isActive: boolean;
  readonly expiresAt: string | null;
  readonly createdAt: string;
};
export const SuppressionEntry = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: SuppressionId,
    email: Schema.String,
    type: Schema.Union([
      Schema.Literal("bounce"),
      Schema.Literal("complaint"),
      Schema.Literal("unsubscribe"),
      Schema.Literal("manual"),
    ]),
    bounceType: Schema.Union([Schema.String, Schema.Null]),
    bounceSubType: Schema.Union([Schema.String, Schema.Null]),
    reason: Schema.Union([Schema.String, Schema.Null]),
    messageId: Schema.Union([MessageId, Schema.Null]),
    isActive: Schema.Boolean,
    expiresAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
  }).annotate({ identifier: "SuppressionEntry" }))();
export type EmailRecipientTrackingPreference = {
  readonly email: TrackingRecipientEmail;
  readonly optedOut: boolean;
  readonly trackingOptedOutAt: string | null;
  readonly createdAt: string | null;
  readonly updatedAt: string | null;
};
export const EmailRecipientTrackingPreference = /* @__PURE__ */ (() =>
  Schema.Struct({
    email: TrackingRecipientEmail,
    optedOut: Schema.Boolean,
    trackingOptedOutAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.Union([Schema.String, Schema.Null]),
    updatedAt: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "EmailRecipientTrackingPreference" }))();
export type EmailDomainVerification = {
  readonly domainId: EmailDomainId;
  readonly domain: string;
  readonly phase: "dns-setup" | "provisioning" | "verifying" | "ready" | "degraded" | "failed";
  readonly dns: {
    readonly observed: boolean;
    readonly total: number;
    readonly satisfied: number;
    readonly missing: number;
    readonly mismatch: number;
    readonly unknown: number;
  };
  readonly requirements: ReadonlyArray<{
    readonly key: string;
    readonly record: {
      readonly type: "A" | "AAAA" | "CNAME" | "MX" | "NS" | "SOA" | "PTR" | "SRV" | "TXT" | "CAA";
      readonly name: string;
      readonly value: string;
      readonly ttl?: string | null;
      readonly description?: string | null;
      readonly priority?: number | null;
    };
    readonly status: "satisfied" | "missing" | "mismatch" | "unknown";
    readonly evidence: ReadonlyArray<
      | {
          readonly _tag: "PublicDns";
          readonly resolver: string;
          readonly status: "satisfied" | "missing" | "mismatch" | "unknown";
          readonly values: ReadonlyArray<string>;
          readonly detail: string | null;
          readonly observedAt: string;
        }
      | {
          readonly _tag: "Provider";
          readonly provider: string;
          readonly status: "satisfied" | "missing" | "mismatch" | "unknown";
          readonly values: ReadonlyArray<string>;
          readonly detail: string | null;
          readonly observedAt: string;
        }
      | {
          readonly _tag: "Host";
          readonly source: string;
          readonly status: "ok" | "pending" | "failed";
          readonly label: string;
          readonly detail: string | null;
          readonly observedAt: string;
        }
    >;
  }>;
  readonly provider: {
    readonly identity: "pending" | "verified" | "failed" | "unknown";
    readonly dkim?: "pending" | "verified" | "failed" | "unknown" | null;
    readonly mailFrom?: "pending" | "verified" | "failed" | "unknown" | null;
  } | null;
  readonly operationId: OperationId | null;
  readonly checkedAt: string | null;
  readonly nextCheckAt: string | null;
  readonly failure: {
    readonly code: string;
    readonly message: string;
    readonly failedAt: string;
  } | null;
  readonly provisioning: EmailDomainProvisioningExecution;
  readonly health: {
    readonly actionOwner: "customer" | "samva" | "upstream" | "none";
    readonly action: string;
    readonly freshness: "current" | "stale" | "unknown";
    readonly observedAt: string | null;
    readonly staleAt: string | null;
    readonly nextRetryAt: string | null;
    readonly reason:
      | "ready"
      | "dns-action-required"
      | "dns-unavailable"
      | "verification-pending"
      | "verification-failed"
      | "samva-repair"
      | "signing-custody-action-required"
      | "ownership-conflict"
      | "inactive"
      | "observation-stale"
      | "observation-unknown";
  };
  readonly sending: {
    readonly actionOwner: "customer" | "samva" | "upstream" | "none";
    readonly action: string;
    readonly freshness: "current" | "stale" | "unknown";
    readonly observedAt: string | null;
    readonly staleAt: string | null;
    readonly nextRetryAt: string | null;
    readonly status: "ready" | "blocked" | "unknown";
    readonly reason:
      | "domain-not-ready"
      | "domain-observation-stale"
      | "operator-paused"
      | "sending-paused"
      | "sending-status-unknown"
      | "ready";
  };
  readonly dmarc: {
    readonly status: "valid" | "missing" | "invalid" | "multiple" | "unknown";
    readonly source: "direct" | "organizational" | "none";
    readonly policyDomain: string | null;
    readonly policy: "none" | "quarantine" | "reject" | null;
    readonly subdomainPolicy: "none" | "quarantine" | "reject" | null;
    readonly effectivePolicy: "none" | "quarantine" | "reject" | null;
    readonly observedAt: string | null;
    readonly staleAt: string | null;
    readonly guidance: string;
  };
  readonly rotation: EmailDkimRotation | null;
};
export const EmailDomainVerification = /* @__PURE__ */ (() =>
  Schema.Struct({
    domainId: EmailDomainId,
    domain: Schema.String,
    phase: Schema.Union([
      Schema.Literal("dns-setup"),
      Schema.Literal("provisioning"),
      Schema.Literal("verifying"),
      Schema.Literal("ready"),
      Schema.Literal("degraded"),
      Schema.Literal("failed"),
    ]),
    dns: Schema.Struct({
      observed: Schema.Boolean,
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
      satisfied: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      missing: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      mismatch: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
      unknown: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    }),
    requirements: Schema.Array(
      Schema.Struct({
        key: Schema.String,
        record: Schema.Struct({
          type: Schema.Union([
            Schema.Literal("A"),
            Schema.Literal("AAAA"),
            Schema.Literal("CNAME"),
            Schema.Literal("MX"),
            Schema.Literal("NS"),
            Schema.Literal("SOA"),
            Schema.Literal("PTR"),
            Schema.Literal("SRV"),
            Schema.Literal("TXT"),
            Schema.Literal("CAA"),
          ]),
          name: Schema.String,
          value: Schema.String,
          ttl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
          description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
          priority: Schema.optionalKey(
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
        }),
        status: Schema.Union([
          Schema.Literal("satisfied"),
          Schema.Literal("missing"),
          Schema.Literal("mismatch"),
          Schema.Literal("unknown"),
        ]),
        evidence: Schema.Array(
          Schema.Union([
            Schema.TaggedStruct("PublicDns", {
              resolver: Schema.String,
              status: Schema.Union([
                Schema.Literal("satisfied"),
                Schema.Literal("missing"),
                Schema.Literal("mismatch"),
                Schema.Literal("unknown"),
              ]),
              values: Schema.Array(Schema.String),
              detail: Schema.Union([Schema.String, Schema.Null]),
              observedAt: Schema.String,
            }),
            Schema.TaggedStruct("Provider", {
              provider: Schema.String,
              status: Schema.Union([
                Schema.Literal("satisfied"),
                Schema.Literal("missing"),
                Schema.Literal("mismatch"),
                Schema.Literal("unknown"),
              ]),
              values: Schema.Array(Schema.String),
              detail: Schema.Union([Schema.String, Schema.Null]),
              observedAt: Schema.String,
            }),
            Schema.TaggedStruct("Host", {
              source: Schema.String,
              status: Schema.Union([
                Schema.Literal("ok"),
                Schema.Literal("pending"),
                Schema.Literal("failed"),
              ]),
              label: Schema.String,
              detail: Schema.Union([Schema.String, Schema.Null]),
              observedAt: Schema.String,
            }),
          ]),
        ),
      }),
    ),
    provider: Schema.Union([
      Schema.Struct({
        identity: Schema.Union([
          Schema.Literal("pending"),
          Schema.Literal("verified"),
          Schema.Literal("failed"),
          Schema.Literal("unknown"),
        ]),
        dkim: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.Literal("pending"),
              Schema.Literal("verified"),
              Schema.Literal("failed"),
              Schema.Literal("unknown"),
            ]),
            Schema.Null,
          ]),
        ),
        mailFrom: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.Literal("pending"),
              Schema.Literal("verified"),
              Schema.Literal("failed"),
              Schema.Literal("unknown"),
            ]),
            Schema.Null,
          ]),
        ),
      }),
      Schema.Null,
    ]),
    operationId: Schema.Union([OperationId, Schema.Null]),
    checkedAt: Schema.Union([Schema.String, Schema.Null]),
    nextCheckAt: Schema.Union([Schema.String, Schema.Null]),
    failure: Schema.Union([
      Schema.Struct({ code: Schema.String, message: Schema.String, failedAt: Schema.String }),
      Schema.Null,
    ]),
    provisioning: EmailDomainProvisioningExecution,
    health: Schema.Struct({
      actionOwner: Schema.Union([
        Schema.Literal("customer"),
        Schema.Literal("samva"),
        Schema.Literal("upstream"),
        Schema.Literal("none"),
      ]),
      action: Schema.String,
      freshness: Schema.Union([
        Schema.Literal("current"),
        Schema.Literal("stale"),
        Schema.Literal("unknown"),
      ]),
      observedAt: Schema.Union([Schema.String, Schema.Null]),
      staleAt: Schema.Union([Schema.String, Schema.Null]),
      nextRetryAt: Schema.Union([Schema.String, Schema.Null]),
      reason: Schema.Union([
        Schema.Literal("ready"),
        Schema.Literal("dns-action-required"),
        Schema.Literal("dns-unavailable"),
        Schema.Literal("verification-pending"),
        Schema.Literal("verification-failed"),
        Schema.Literal("samva-repair"),
        Schema.Literal("signing-custody-action-required"),
        Schema.Literal("ownership-conflict"),
        Schema.Literal("inactive"),
        Schema.Literal("observation-stale"),
        Schema.Literal("observation-unknown"),
      ]),
    }),
    sending: Schema.Struct({
      actionOwner: Schema.Union([
        Schema.Literal("customer"),
        Schema.Literal("samva"),
        Schema.Literal("upstream"),
        Schema.Literal("none"),
      ]),
      action: Schema.String,
      freshness: Schema.Union([
        Schema.Literal("current"),
        Schema.Literal("stale"),
        Schema.Literal("unknown"),
      ]),
      observedAt: Schema.Union([Schema.String, Schema.Null]),
      staleAt: Schema.Union([Schema.String, Schema.Null]),
      nextRetryAt: Schema.Union([Schema.String, Schema.Null]),
      status: Schema.Union([
        Schema.Literal("ready"),
        Schema.Literal("blocked"),
        Schema.Literal("unknown"),
      ]),
      reason: Schema.Union([
        Schema.Literal("domain-not-ready"),
        Schema.Literal("domain-observation-stale"),
        Schema.Literal("operator-paused"),
        Schema.Literal("sending-paused"),
        Schema.Literal("sending-status-unknown"),
        Schema.Literal("ready"),
      ]),
    }).annotate({
      description:
        "Whether the domain, the organization, and its sending account are healthy enough to send, as last observed. Ready does not guarantee that a particular send is accepted.",
    }),
    dmarc: Schema.Struct({
      status: Schema.Union([
        Schema.Literal("valid"),
        Schema.Literal("missing"),
        Schema.Literal("invalid"),
        Schema.Literal("multiple"),
        Schema.Literal("unknown"),
      ]),
      source: Schema.Union([
        Schema.Literal("direct"),
        Schema.Literal("organizational"),
        Schema.Literal("none"),
      ]),
      policyDomain: Schema.Union([Schema.String, Schema.Null]),
      policy: Schema.Union([
        Schema.Union([
          Schema.Literal("none"),
          Schema.Literal("quarantine"),
          Schema.Literal("reject"),
        ]),
        Schema.Null,
      ]),
      subdomainPolicy: Schema.Union([
        Schema.Union([
          Schema.Literal("none"),
          Schema.Literal("quarantine"),
          Schema.Literal("reject"),
        ]),
        Schema.Null,
      ]),
      effectivePolicy: Schema.Union([
        Schema.Union([
          Schema.Literal("none"),
          Schema.Literal("quarantine"),
          Schema.Literal("reject"),
        ]),
        Schema.Null,
      ]),
      observedAt: Schema.Union([Schema.String, Schema.Null]),
      staleAt: Schema.Union([Schema.String, Schema.Null]),
      guidance: Schema.String,
    }),
    rotation: Schema.Union([EmailDkimRotation, Schema.Null]),
  }).annotate({ identifier: "EmailDomainVerification" }))();
export type DomainWarming = {
  readonly domain: DomainWarmingDomainRef;
  readonly plan: DomainWarmingPlan | null;
  readonly batches: ReadonlyArray<DomainWarmingBatch>;
  readonly decisions: ReadonlyArray<DomainWarmingDecision>;
  readonly evidence: DomainWarmingEvidence;
  readonly holds: DomainWarmingHolds;
};
export const DomainWarming = /* @__PURE__ */ (() =>
  Schema.Struct({
    domain: DomainWarmingDomainRef,
    plan: Schema.Union([DomainWarmingPlan, Schema.Null]),
    batches: Schema.Array(DomainWarmingBatch),
    decisions: Schema.Array(DomainWarmingDecision),
    evidence: DomainWarmingEvidence,
    holds: DomainWarmingHolds,
  }).annotate({ identifier: "DomainWarming" }))();
export type SuppressionPage = {
  readonly items: ReadonlyArray<SuppressionEntry>;
  readonly nextCursor: string | null;
};
export const SuppressionPage = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(SuppressionEntry),
    nextCursor: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "SuppressionPage" }))();
export type EmailListBlocksQuery = {
  readonly blockType?: "email" | "domain" | null;
  readonly isActive?: boolean | null;
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
};
export const EmailListBlocksQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    blockType: Schema.optionalKey(
      Schema.Union([
        Schema.Union([Schema.Literal("email"), Schema.Literal("domain")]),
        Schema.Null,
      ]),
    ),
    isActive: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
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
export type EmailListBlocks200 = BlockPage;
export const EmailListBlocks200 = BlockPage;
export type EmailListBlocks401 = UnauthorizedError;
export const EmailListBlocks401 = UnauthorizedError;
export type EmailListBlocks403 = ForbiddenError;
export const EmailListBlocks403 = ForbiddenError;
export type EmailListBlocks422 = ValidationError;
export const EmailListBlocks422 = ValidationError;
export type EmailListBlocks500 = InternalError;
export const EmailListBlocks500 = InternalError;
export type EmailListBlocks504 = GatewayTimeoutError;
export const EmailListBlocks504 = GatewayTimeoutError;
export type EmailAddBlockRequestJson = {
  readonly blockType: "email" | "domain";
  readonly blockValue: string;
  readonly reason: string;
  readonly notes?: string | null;
  readonly expiresAt?: string | null;
};
export const EmailAddBlockRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    blockType: Schema.Union([Schema.Literal("email"), Schema.Literal("domain")]),
    blockValue: Schema.String,
    reason: Schema.String,
    notes: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    expiresAt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type EmailAddBlock201 = {
  readonly id: BlockedEmailId;
  readonly blockType: "email" | "domain";
  readonly blockValue: string;
  readonly reason: string;
  readonly notes: string | null;
  readonly isActive: boolean;
  readonly expiresAt: string | null;
  readonly createdAt: string;
};
export const EmailAddBlock201 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: BlockedEmailId,
    blockType: Schema.Union([Schema.Literal("email"), Schema.Literal("domain")]),
    blockValue: Schema.String,
    reason: Schema.String,
    notes: Schema.Union([Schema.String, Schema.Null]),
    isActive: Schema.Boolean,
    expiresAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
  }))();
export type EmailAddBlock401 = UnauthorizedError;
export const EmailAddBlock401 = UnauthorizedError;
export type EmailAddBlock403 = ForbiddenError;
export const EmailAddBlock403 = ForbiddenError;
export type EmailAddBlock409 = ConflictError;
export const EmailAddBlock409 = ConflictError;
export type EmailAddBlock422 = ValidationError;
export const EmailAddBlock422 = ValidationError;
export type EmailAddBlock500 = InternalError;
export const EmailAddBlock500 = InternalError;
export type EmailAddBlock504 = GatewayTimeoutError;
export const EmailAddBlock504 = GatewayTimeoutError;
export type EmailRemoveBlockPathParams = { readonly id: BlockedEmailId };
export const EmailRemoveBlockPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: BlockedEmailId }))();
export type EmailRemoveBlock200 = SuccessResult;
export const EmailRemoveBlock200 = SuccessResult;
export type EmailRemoveBlock401 = UnauthorizedError;
export const EmailRemoveBlock401 = UnauthorizedError;
export type EmailRemoveBlock403 = ForbiddenError;
export const EmailRemoveBlock403 = ForbiddenError;
export type EmailRemoveBlock404 = ResourceNotFoundError;
export const EmailRemoveBlock404 = ResourceNotFoundError;
export type EmailRemoveBlock422 = ValidationError;
export const EmailRemoveBlock422 = ValidationError;
export type EmailRemoveBlock500 = InternalError;
export const EmailRemoveBlock500 = InternalError;
export type EmailRemoveBlock504 = GatewayTimeoutError;
export const EmailRemoveBlock504 = GatewayTimeoutError;
export type EmailUpdateBlockPathParams = { readonly id: BlockedEmailId };
export const EmailUpdateBlockPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: BlockedEmailId }))();
export type EmailUpdateBlockRequestJson = {
  readonly reason?: string | null;
  readonly notes?: string | null;
  readonly isActive?: boolean | null;
  readonly expiresAt?: string | null;
};
export const EmailUpdateBlockRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    reason: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    notes: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    isActive: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    expiresAt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type EmailUpdateBlock200 = {
  readonly id: BlockedEmailId;
  readonly blockType: "email" | "domain";
  readonly blockValue: string;
  readonly reason: string;
  readonly notes: string | null;
  readonly isActive: boolean;
  readonly expiresAt: string | null;
  readonly updatedAt: string;
};
export const EmailUpdateBlock200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: BlockedEmailId,
    blockType: Schema.Union([Schema.Literal("email"), Schema.Literal("domain")]),
    blockValue: Schema.String,
    reason: Schema.String,
    notes: Schema.Union([Schema.String, Schema.Null]),
    isActive: Schema.Boolean,
    expiresAt: Schema.Union([Schema.String, Schema.Null]),
    updatedAt: Schema.String,
  }))();
export type EmailUpdateBlock401 = UnauthorizedError;
export const EmailUpdateBlock401 = UnauthorizedError;
export type EmailUpdateBlock403 = ForbiddenError;
export const EmailUpdateBlock403 = ForbiddenError;
export type EmailUpdateBlock404 = ResourceNotFoundError;
export const EmailUpdateBlock404 = ResourceNotFoundError;
export type EmailUpdateBlock422 = ValidationError;
export const EmailUpdateBlock422 = ValidationError;
export type EmailUpdateBlock500 = InternalError;
export const EmailUpdateBlock500 = InternalError;
export type EmailUpdateBlock504 = GatewayTimeoutError;
export const EmailUpdateBlock504 = GatewayTimeoutError;
export type EmailCheckBlockedRequestJson = { readonly emailAddress: string };
export const EmailCheckBlockedRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ emailAddress: Schema.String }))();
export type EmailCheckBlocked200 = {
  readonly isBlocked: boolean;
  readonly blockingRule: {
    readonly id: BlockedEmailId;
    readonly blockType: "email" | "domain";
    readonly blockValue: string;
    readonly reason: string;
    readonly expiresAt: string | null;
  } | null;
  readonly reason: string | null;
};
export const EmailCheckBlocked200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    isBlocked: Schema.Boolean,
    blockingRule: Schema.Union([
      Schema.Struct({
        id: BlockedEmailId,
        blockType: Schema.Union([Schema.Literal("email"), Schema.Literal("domain")]),
        blockValue: Schema.String,
        reason: Schema.String,
        expiresAt: Schema.Union([Schema.String, Schema.Null]),
      }),
      Schema.Null,
    ]),
    reason: Schema.Union([Schema.String, Schema.Null]),
  }))();
export type EmailCheckBlocked401 = UnauthorizedError;
export const EmailCheckBlocked401 = UnauthorizedError;
export type EmailCheckBlocked403 = ForbiddenError;
export const EmailCheckBlocked403 = ForbiddenError;
export type EmailCheckBlocked422 = ValidationError;
export const EmailCheckBlocked422 = ValidationError;
export type EmailCheckBlocked500 = InternalError;
export const EmailCheckBlocked500 = InternalError;
export type EmailCheckBlocked504 = GatewayTimeoutError;
export const EmailCheckBlocked504 = GatewayTimeoutError;
export type EmailGetBlockLogsQuery = {
  readonly blockedEmailId?: BlockedEmailId | null;
  readonly fromAddress?: string | null;
  readonly after?: string | null;
  readonly before?: string | null;
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
};
export const EmailGetBlockLogsQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    blockedEmailId: Schema.optionalKey(Schema.Union([BlockedEmailId, Schema.Null])),
    fromAddress: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    after: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    before: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
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
export type EmailGetBlockLogs200 = BlockLogPage;
export const EmailGetBlockLogs200 = BlockLogPage;
export type EmailGetBlockLogs401 = UnauthorizedError;
export const EmailGetBlockLogs401 = UnauthorizedError;
export type EmailGetBlockLogs403 = ForbiddenError;
export const EmailGetBlockLogs403 = ForbiddenError;
export type EmailGetBlockLogs422 = ValidationError;
export const EmailGetBlockLogs422 = ValidationError;
export type EmailGetBlockLogs500 = InternalError;
export const EmailGetBlockLogs500 = InternalError;
export type EmailGetBlockLogs504 = GatewayTimeoutError;
export const EmailGetBlockLogs504 = GatewayTimeoutError;
export type EmailGetCatchAllConfigQuery = { readonly domainId: EmailDomainId };
export const EmailGetCatchAllConfigQuery = /* @__PURE__ */ (() =>
  Schema.Struct({ domainId: EmailDomainId }))();
export type EmailGetCatchAllConfig200 = {
  readonly enabled: boolean;
  readonly endpointId: WebhookEndpointId | null;
  readonly emailCount: number;
  readonly lastEmailAt: string | null;
};
export const EmailGetCatchAllConfig200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    enabled: Schema.Boolean,
    endpointId: Schema.Union([WebhookEndpointId, Schema.Null]),
    emailCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    lastEmailAt: Schema.Union([Schema.String, Schema.Null]),
  }))();
export type EmailGetCatchAllConfig401 = UnauthorizedError;
export const EmailGetCatchAllConfig401 = UnauthorizedError;
export type EmailGetCatchAllConfig403 = ForbiddenError;
export const EmailGetCatchAllConfig403 = ForbiddenError;
export type EmailGetCatchAllConfig404 = ResourceNotFoundError;
export const EmailGetCatchAllConfig404 = ResourceNotFoundError;
export type EmailGetCatchAllConfig422 = ValidationError;
export const EmailGetCatchAllConfig422 = ValidationError;
export type EmailGetCatchAllConfig500 = InternalError;
export const EmailGetCatchAllConfig500 = InternalError;
export type EmailGetCatchAllConfig504 = GatewayTimeoutError;
export const EmailGetCatchAllConfig504 = GatewayTimeoutError;
export type EmailUpdateCatchAllConfigRequestJson = {
  readonly domainId: EmailDomainId;
  readonly endpointId?: WebhookEndpointId | null;
};
export const EmailUpdateCatchAllConfigRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    domainId: EmailDomainId,
    endpointId: Schema.optionalKey(Schema.Union([WebhookEndpointId, Schema.Null])),
  }))();
export type EmailUpdateCatchAllConfig200 = { readonly success: true };
export const EmailUpdateCatchAllConfig200 = /* @__PURE__ */ (() =>
  Schema.Struct({ success: Schema.Literal(true) }))();
export type EmailUpdateCatchAllConfig401 = UnauthorizedError;
export const EmailUpdateCatchAllConfig401 = UnauthorizedError;
export type EmailUpdateCatchAllConfig403 = ForbiddenError;
export const EmailUpdateCatchAllConfig403 = ForbiddenError;
export type EmailUpdateCatchAllConfig404 = ResourceNotFoundError;
export const EmailUpdateCatchAllConfig404 = ResourceNotFoundError;
export type EmailUpdateCatchAllConfig422 = ValidationError;
export const EmailUpdateCatchAllConfig422 = ValidationError;
export type EmailUpdateCatchAllConfig500 = InternalError;
export const EmailUpdateCatchAllConfig500 = InternalError;
export type EmailUpdateCatchAllConfig504 = GatewayTimeoutError;
export const EmailUpdateCatchAllConfig504 = GatewayTimeoutError;
export type EmailGetCatchAllStatsQuery = {
  readonly domainId: EmailDomainId;
  readonly after?: string | null;
  readonly before?: string | null;
};
export const EmailGetCatchAllStatsQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    domainId: EmailDomainId,
    after: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    before: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type EmailGetCatchAllStats200 = {
  readonly domain: string;
  readonly isCatchAllEnabled: boolean;
  readonly catchAllEmailCount: number;
  readonly catchAllLastEmailAt: string | null;
  readonly timeRange?: {
    readonly emailsReceived: number;
    readonly firstEmail: string | null;
    readonly lastEmail: string | null;
    readonly avgPerDay: number;
  } | null;
};
export const EmailGetCatchAllStats200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    domain: Schema.String,
    isCatchAllEnabled: Schema.Boolean,
    catchAllEmailCount: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    catchAllLastEmailAt: Schema.Union([Schema.String, Schema.Null]),
    timeRange: Schema.optionalKey(
      Schema.Union([
        Schema.Struct({
          emailsReceived: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
          firstEmail: Schema.Union([Schema.String, Schema.Null]),
          lastEmail: Schema.Union([Schema.String, Schema.Null]),
          avgPerDay: Schema.Finite.check(
            Schema.isFinite().annotate({ expected: "a finite number" }),
          ),
        }),
        Schema.Null,
      ]),
    ),
  }))();
export type EmailGetCatchAllStats401 = UnauthorizedError;
export const EmailGetCatchAllStats401 = UnauthorizedError;
export type EmailGetCatchAllStats403 = ForbiddenError;
export const EmailGetCatchAllStats403 = ForbiddenError;
export type EmailGetCatchAllStats404 = ResourceNotFoundError;
export const EmailGetCatchAllStats404 = ResourceNotFoundError;
export type EmailGetCatchAllStats422 = ValidationError;
export const EmailGetCatchAllStats422 = ValidationError;
export type EmailGetCatchAllStats500 = InternalError;
export const EmailGetCatchAllStats500 = InternalError;
export type EmailGetCatchAllStats504 = GatewayTimeoutError;
export const EmailGetCatchAllStats504 = GatewayTimeoutError;
export type EmailListDomainsQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
  readonly sendable?: true | null;
  readonly namespaceId?: NamespaceId | null;
};
export const EmailListDomainsQuery = /* @__PURE__ */ (() =>
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
    sendable: Schema.optionalKey(Schema.Union([Schema.Literal(true), Schema.Null])),
    namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
  }))();
export type EmailListDomains200 = EmailDomainPage;
export const EmailListDomains200 = EmailDomainPage;
export type EmailListDomains401 = UnauthorizedError;
export const EmailListDomains401 = UnauthorizedError;
export type EmailListDomains403 = ForbiddenError;
export const EmailListDomains403 = ForbiddenError;
export type EmailListDomains422 = ValidationError;
export const EmailListDomains422 = ValidationError;
export type EmailListDomains500 = InternalError;
export const EmailListDomains500 = InternalError;
export type EmailListDomains504 = GatewayTimeoutError;
export const EmailListDomains504 = GatewayTimeoutError;
export type EmailAddDomainRequestJson = {
  readonly domain: string;
  readonly connection?: { readonly connectionId: string; readonly zone: string } | null;
  readonly namespaceId?: NamespaceId | null;
};
export const EmailAddDomainRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    domain: Schema.String,
    connection: Schema.optionalKey(
      Schema.Union([
        Schema.Struct({ connectionId: Schema.String, zone: Schema.String }),
        Schema.Null,
      ]),
    ),
    namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
  }))();
export type EmailAddDomain201 = EmailDomainDetailed;
export const EmailAddDomain201 = EmailDomainDetailed;
export type EmailAddDomain401 = UnauthorizedError;
export const EmailAddDomain401 = UnauthorizedError;
export type EmailAddDomain402 = PaymentRequiredError;
export const EmailAddDomain402 = PaymentRequiredError;
export type EmailAddDomain403 = ForbiddenError;
export const EmailAddDomain403 = ForbiddenError;
export type EmailAddDomain404 = ResourceNotFoundError;
export const EmailAddDomain404 = ResourceNotFoundError;
export type EmailAddDomain409 = ConflictError;
export const EmailAddDomain409 = ConflictError;
export type EmailAddDomain422 = ValidationError;
export const EmailAddDomain422 = ValidationError;
export type EmailAddDomain429 = RateLimitedError;
export const EmailAddDomain429 = RateLimitedError;
export type EmailAddDomain500 = InternalError;
export const EmailAddDomain500 = InternalError;
export type EmailAddDomain502 = EmailChannelError | BillingProviderError;
export const EmailAddDomain502 = /* @__PURE__ */ (() =>
  Schema.Union([EmailChannelError, BillingProviderError]))();
export type EmailAddDomain504 = GatewayTimeoutError;
export const EmailAddDomain504 = GatewayTimeoutError;
export type EmailGetDomainByIdPathParams = { readonly id: EmailDomainId };
export const EmailGetDomainByIdPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailGetDomainById200 = EmailDomainDetailed;
export const EmailGetDomainById200 = EmailDomainDetailed;
export type EmailGetDomainById401 = UnauthorizedError;
export const EmailGetDomainById401 = UnauthorizedError;
export type EmailGetDomainById403 = ForbiddenError;
export const EmailGetDomainById403 = ForbiddenError;
export type EmailGetDomainById404 = ResourceNotFoundError;
export const EmailGetDomainById404 = ResourceNotFoundError;
export type EmailGetDomainById422 = ValidationError;
export const EmailGetDomainById422 = ValidationError;
export type EmailGetDomainById500 = InternalError;
export const EmailGetDomainById500 = InternalError;
export type EmailGetDomainById504 = GatewayTimeoutError;
export const EmailGetDomainById504 = GatewayTimeoutError;
export type EmailRemoveDomainPathParams = { readonly id: EmailDomainId };
export const EmailRemoveDomainPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailRemoveDomain200 = SuccessResult;
export const EmailRemoveDomain200 = SuccessResult;
export type EmailRemoveDomain401 = UnauthorizedError;
export const EmailRemoveDomain401 = UnauthorizedError;
export type EmailRemoveDomain403 = ForbiddenError;
export const EmailRemoveDomain403 = ForbiddenError;
export type EmailRemoveDomain404 = ResourceNotFoundError;
export const EmailRemoveDomain404 = ResourceNotFoundError;
export type EmailRemoveDomain422 = ValidationError;
export const EmailRemoveDomain422 = ValidationError;
export type EmailRemoveDomain500 = InternalError;
export const EmailRemoveDomain500 = InternalError;
export type EmailRemoveDomain502 = EmailChannelError | BillingProviderError;
export const EmailRemoveDomain502 = /* @__PURE__ */ (() =>
  Schema.Union([EmailChannelError, BillingProviderError]))();
export type EmailRemoveDomain504 = GatewayTimeoutError;
export const EmailRemoveDomain504 = GatewayTimeoutError;
export type EmailUpdateDomainConfigPathParams = { readonly id: EmailDomainId };
export const EmailUpdateDomainConfigPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailUpdateDomainConfigRequestJson = {
  readonly openTracking?: boolean | null;
  readonly clickTracking?: boolean | null;
  readonly replyTo?: ReadonlyArray<string> | null;
  readonly topicId?: TopicId | null;
  readonly footerEnabled?: boolean | null;
  readonly brandSlug?: string | null;
};
export const EmailUpdateDomainConfigRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    openTracking: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    clickTracking: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    replyTo: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
    topicId: Schema.optionalKey(Schema.Union([TopicId, Schema.Null])),
    footerEnabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    brandSlug: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isPattern(new RegExp("^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$", "u")).annotate({
            expected: "a string matching the RegExp ^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$",
          }),
        ),
        Schema.Null,
      ]),
    ),
  }))();
export type EmailUpdateDomainConfig200 = {
  readonly id: EmailDomainId;
  readonly openTracking: boolean | null;
  readonly clickTracking: boolean | null;
  readonly replyTo: ReadonlyArray<string> | null;
  readonly topicId: TopicId | null;
  readonly footerEnabled: boolean | null;
  readonly brandSlug: string | null;
};
export const EmailUpdateDomainConfig200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: EmailDomainId,
    openTracking: Schema.Union([Schema.Boolean, Schema.Null]),
    clickTracking: Schema.Union([Schema.Boolean, Schema.Null]),
    replyTo: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    topicId: Schema.Union([TopicId, Schema.Null]),
    footerEnabled: Schema.Union([Schema.Boolean, Schema.Null]),
    brandSlug: Schema.Union([
      Schema.String.check(
        Schema.isPattern(new RegExp("^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$", "u")).annotate({
          expected: "a string matching the RegExp ^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$",
        }),
      ),
      Schema.Null,
    ]),
  }))();
export type EmailUpdateDomainConfig401 = UnauthorizedError;
export const EmailUpdateDomainConfig401 = UnauthorizedError;
export type EmailUpdateDomainConfig403 = ForbiddenError;
export const EmailUpdateDomainConfig403 = ForbiddenError;
export type EmailUpdateDomainConfig404 = ResourceNotFoundError;
export const EmailUpdateDomainConfig404 = ResourceNotFoundError;
export type EmailUpdateDomainConfig422 = ValidationError;
export const EmailUpdateDomainConfig422 = ValidationError;
export type EmailUpdateDomainConfig500 = InternalError;
export const EmailUpdateDomainConfig500 = InternalError;
export type EmailUpdateDomainConfig504 = GatewayTimeoutError;
export const EmailUpdateDomainConfig504 = GatewayTimeoutError;
export type EmailGetCustomTrackingPathParams = { readonly id: EmailDomainId };
export const EmailGetCustomTrackingPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailGetCustomTracking200 = CustomTrackingStatus;
export const EmailGetCustomTracking200 = CustomTrackingStatus;
export type EmailGetCustomTracking401 = UnauthorizedError;
export const EmailGetCustomTracking401 = UnauthorizedError;
export type EmailGetCustomTracking403 = ForbiddenError;
export const EmailGetCustomTracking403 = ForbiddenError;
export type EmailGetCustomTracking404 = ResourceNotFoundError;
export const EmailGetCustomTracking404 = ResourceNotFoundError;
export type EmailGetCustomTracking422 = ValidationError;
export const EmailGetCustomTracking422 = ValidationError;
export type EmailGetCustomTracking500 = InternalError;
export const EmailGetCustomTracking500 = InternalError;
export type EmailGetCustomTracking504 = GatewayTimeoutError;
export const EmailGetCustomTracking504 = GatewayTimeoutError;
export type EmailEnableCustomTrackingPathParams = { readonly id: EmailDomainId };
export const EmailEnableCustomTrackingPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailEnableCustomTrackingRequestJson = {
  readonly label?: string | null;
  readonly parentDomain?: string | null;
};
export const EmailEnableCustomTrackingRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    label: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "First label of the tracking host. Defaults to `track`.",
        }),
        Schema.Null,
      ]),
    ),
    parentDomain: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Domain the tracking host sits directly under: the sending domain (the default) or one of its parents up to its registrable domain, listed in `parentDomains`.",
        }),
        Schema.Null,
      ]),
    ),
  }))();
export type EmailEnableCustomTracking200 = CustomTrackingStatus;
export const EmailEnableCustomTracking200 = CustomTrackingStatus;
export type EmailEnableCustomTracking401 = UnauthorizedError;
export const EmailEnableCustomTracking401 = UnauthorizedError;
export type EmailEnableCustomTracking403 = ForbiddenError;
export const EmailEnableCustomTracking403 = ForbiddenError;
export type EmailEnableCustomTracking404 = ResourceNotFoundError;
export const EmailEnableCustomTracking404 = ResourceNotFoundError;
export type EmailEnableCustomTracking409 = ConflictError;
export const EmailEnableCustomTracking409 = ConflictError;
export type EmailEnableCustomTracking422 = ValidationError;
export const EmailEnableCustomTracking422 = ValidationError;
export type EmailEnableCustomTracking500 = InternalError;
export const EmailEnableCustomTracking500 = InternalError;
export type EmailEnableCustomTracking502 = EmailChannelError | BillingProviderError;
export const EmailEnableCustomTracking502 = /* @__PURE__ */ (() =>
  Schema.Union([EmailChannelError, BillingProviderError]))();
export type EmailEnableCustomTracking504 = GatewayTimeoutError;
export const EmailEnableCustomTracking504 = GatewayTimeoutError;
export type EmailDisableCustomTrackingPathParams = { readonly id: EmailDomainId };
export const EmailDisableCustomTrackingPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailDisableCustomTracking200 = SuccessResult;
export const EmailDisableCustomTracking200 = SuccessResult;
export type EmailDisableCustomTracking401 = UnauthorizedError;
export const EmailDisableCustomTracking401 = UnauthorizedError;
export type EmailDisableCustomTracking403 = ForbiddenError;
export const EmailDisableCustomTracking403 = ForbiddenError;
export type EmailDisableCustomTracking404 = ResourceNotFoundError;
export const EmailDisableCustomTracking404 = ResourceNotFoundError;
export type EmailDisableCustomTracking409 = ConflictError;
export const EmailDisableCustomTracking409 = ConflictError;
export type EmailDisableCustomTracking422 = ValidationError;
export const EmailDisableCustomTracking422 = ValidationError;
export type EmailDisableCustomTracking500 = InternalError;
export const EmailDisableCustomTracking500 = InternalError;
export type EmailDisableCustomTracking502 = EmailChannelError;
export const EmailDisableCustomTracking502 = EmailChannelError;
export type EmailDisableCustomTracking504 = GatewayTimeoutError;
export const EmailDisableCustomTracking504 = GatewayTimeoutError;
export type EmailGetCustomTrackingDomainConnectPathParams = { readonly id: EmailDomainId };
export const EmailGetCustomTrackingDomainConnectPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailGetCustomTrackingDomainConnect200 = DomainConnectEligibility;
export const EmailGetCustomTrackingDomainConnect200 = DomainConnectEligibility;
export type EmailGetCustomTrackingDomainConnect401 = UnauthorizedError;
export const EmailGetCustomTrackingDomainConnect401 = UnauthorizedError;
export type EmailGetCustomTrackingDomainConnect403 = ForbiddenError;
export const EmailGetCustomTrackingDomainConnect403 = ForbiddenError;
export type EmailGetCustomTrackingDomainConnect404 = ResourceNotFoundError;
export const EmailGetCustomTrackingDomainConnect404 = ResourceNotFoundError;
export type EmailGetCustomTrackingDomainConnect422 = ValidationError;
export const EmailGetCustomTrackingDomainConnect422 = ValidationError;
export type EmailGetCustomTrackingDomainConnect500 = InternalError;
export const EmailGetCustomTrackingDomainConnect500 = InternalError;
export type EmailGetCustomTrackingDomainConnect504 = GatewayTimeoutError;
export const EmailGetCustomTrackingDomainConnect504 = GatewayTimeoutError;
export type EmailBuildCustomTrackingDomainConnectApplyUrlPathParams = {
  readonly id: EmailDomainId;
};
export const EmailBuildCustomTrackingDomainConnectApplyUrlPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailBuildCustomTrackingDomainConnectApplyUrl200 = DomainConnectApplyUrlResult;
export const EmailBuildCustomTrackingDomainConnectApplyUrl200 = DomainConnectApplyUrlResult;
export type EmailBuildCustomTrackingDomainConnectApplyUrl401 = UnauthorizedError;
export const EmailBuildCustomTrackingDomainConnectApplyUrl401 = UnauthorizedError;
export type EmailBuildCustomTrackingDomainConnectApplyUrl403 = ForbiddenError;
export const EmailBuildCustomTrackingDomainConnectApplyUrl403 = ForbiddenError;
export type EmailBuildCustomTrackingDomainConnectApplyUrl404 = ResourceNotFoundError;
export const EmailBuildCustomTrackingDomainConnectApplyUrl404 = ResourceNotFoundError;
export type EmailBuildCustomTrackingDomainConnectApplyUrl409 = ConflictError;
export const EmailBuildCustomTrackingDomainConnectApplyUrl409 = ConflictError;
export type EmailBuildCustomTrackingDomainConnectApplyUrl422 = ValidationError;
export const EmailBuildCustomTrackingDomainConnectApplyUrl422 = ValidationError;
export type EmailBuildCustomTrackingDomainConnectApplyUrl500 = InternalError;
export const EmailBuildCustomTrackingDomainConnectApplyUrl500 = InternalError;
export type EmailBuildCustomTrackingDomainConnectApplyUrl502 = EmailChannelError;
export const EmailBuildCustomTrackingDomainConnectApplyUrl502 = EmailChannelError;
export type EmailBuildCustomTrackingDomainConnectApplyUrl504 = GatewayTimeoutError;
export const EmailBuildCustomTrackingDomainConnectApplyUrl504 = GatewayTimeoutError;
export type EmailCompleteCustomTrackingDomainConnectPathParams = { readonly id: EmailDomainId };
export const EmailCompleteCustomTrackingDomainConnectPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailCompleteCustomTrackingDomainConnectRequestJson = {
  readonly state: string;
  readonly error?: string | null;
  readonly errorDescription?: string | null;
};
export const EmailCompleteCustomTrackingDomainConnectRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    state: Schema.String,
    error: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    errorDescription: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type EmailCompleteCustomTrackingDomainConnect200 = CustomTrackingDomainConnectCompleteResult;
export const EmailCompleteCustomTrackingDomainConnect200 =
  CustomTrackingDomainConnectCompleteResult;
export type EmailCompleteCustomTrackingDomainConnect401 = UnauthorizedError;
export const EmailCompleteCustomTrackingDomainConnect401 = UnauthorizedError;
export type EmailCompleteCustomTrackingDomainConnect403 = ForbiddenError;
export const EmailCompleteCustomTrackingDomainConnect403 = ForbiddenError;
export type EmailCompleteCustomTrackingDomainConnect404 = ResourceNotFoundError;
export const EmailCompleteCustomTrackingDomainConnect404 = ResourceNotFoundError;
export type EmailCompleteCustomTrackingDomainConnect422 = ValidationError;
export const EmailCompleteCustomTrackingDomainConnect422 = ValidationError;
export type EmailCompleteCustomTrackingDomainConnect500 = InternalError;
export const EmailCompleteCustomTrackingDomainConnect500 = InternalError;
export type EmailCompleteCustomTrackingDomainConnect504 = GatewayTimeoutError;
export const EmailCompleteCustomTrackingDomainConnect504 = GatewayTimeoutError;
export type EmailRecheckCustomTrackingPathParams = { readonly id: EmailDomainId };
export const EmailRecheckCustomTrackingPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailRecheckCustomTracking200 = CustomTrackingStatus;
export const EmailRecheckCustomTracking200 = CustomTrackingStatus;
export type EmailRecheckCustomTracking401 = UnauthorizedError;
export const EmailRecheckCustomTracking401 = UnauthorizedError;
export type EmailRecheckCustomTracking403 = ForbiddenError;
export const EmailRecheckCustomTracking403 = ForbiddenError;
export type EmailRecheckCustomTracking404 = ResourceNotFoundError;
export const EmailRecheckCustomTracking404 = ResourceNotFoundError;
export type EmailRecheckCustomTracking409 = ConflictError;
export const EmailRecheckCustomTracking409 = ConflictError;
export type EmailRecheckCustomTracking422 = ValidationError;
export const EmailRecheckCustomTracking422 = ValidationError;
export type EmailRecheckCustomTracking500 = InternalError;
export const EmailRecheckCustomTracking500 = InternalError;
export type EmailRecheckCustomTracking502 = EmailChannelError;
export const EmailRecheckCustomTracking502 = EmailChannelError;
export type EmailRecheckCustomTracking504 = GatewayTimeoutError;
export const EmailRecheckCustomTracking504 = GatewayTimeoutError;
export type EmailSetDefaultDomainPathParams = { readonly id: EmailDomainId };
export const EmailSetDefaultDomainPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailSetDefaultDomain200 = SuccessResult;
export const EmailSetDefaultDomain200 = SuccessResult;
export type EmailSetDefaultDomain401 = UnauthorizedError;
export const EmailSetDefaultDomain401 = UnauthorizedError;
export type EmailSetDefaultDomain403 = ForbiddenError;
export const EmailSetDefaultDomain403 = ForbiddenError;
export type EmailSetDefaultDomain404 = ResourceNotFoundError;
export const EmailSetDefaultDomain404 = ResourceNotFoundError;
export type EmailSetDefaultDomain422 = ValidationError;
export const EmailSetDefaultDomain422 = ValidationError;
export type EmailSetDefaultDomain500 = InternalError;
export const EmailSetDefaultDomain500 = InternalError;
export type EmailSetDefaultDomain504 = GatewayTimeoutError;
export const EmailSetDefaultDomain504 = GatewayTimeoutError;
export type EmailDisableCatchAllPathParams = { readonly id: EmailDomainId };
export const EmailDisableCatchAllPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailDisableCatchAll200 = { readonly success: true };
export const EmailDisableCatchAll200 = /* @__PURE__ */ (() =>
  Schema.Struct({ success: Schema.Literal(true) }))();
export type EmailDisableCatchAll401 = UnauthorizedError;
export const EmailDisableCatchAll401 = UnauthorizedError;
export type EmailDisableCatchAll403 = ForbiddenError;
export const EmailDisableCatchAll403 = ForbiddenError;
export type EmailDisableCatchAll404 = ResourceNotFoundError;
export const EmailDisableCatchAll404 = ResourceNotFoundError;
export type EmailDisableCatchAll422 = ValidationError;
export const EmailDisableCatchAll422 = ValidationError;
export type EmailDisableCatchAll500 = InternalError;
export const EmailDisableCatchAll500 = InternalError;
export type EmailDisableCatchAll502 = ExternalServiceError;
export const EmailDisableCatchAll502 = ExternalServiceError;
export type EmailDisableCatchAll504 = GatewayTimeoutError;
export const EmailDisableCatchAll504 = GatewayTimeoutError;
export type EmailGetDomainConnectPathParams = { readonly id: EmailDomainId };
export const EmailGetDomainConnectPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailGetDomainConnectQuery = { readonly mode: "send-only" | "send-and-receive" };
export const EmailGetDomainConnectQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    mode: Schema.Union([Schema.Literal("send-only"), Schema.Literal("send-and-receive")]),
  }))();
export type EmailGetDomainConnect200 = DomainConnectEligibility;
export const EmailGetDomainConnect200 = DomainConnectEligibility;
export type EmailGetDomainConnect401 = UnauthorizedError;
export const EmailGetDomainConnect401 = UnauthorizedError;
export type EmailGetDomainConnect403 = ForbiddenError;
export const EmailGetDomainConnect403 = ForbiddenError;
export type EmailGetDomainConnect404 = ResourceNotFoundError;
export const EmailGetDomainConnect404 = ResourceNotFoundError;
export type EmailGetDomainConnect422 = ValidationError;
export const EmailGetDomainConnect422 = ValidationError;
export type EmailGetDomainConnect500 = InternalError;
export const EmailGetDomainConnect500 = InternalError;
export type EmailGetDomainConnect504 = GatewayTimeoutError;
export const EmailGetDomainConnect504 = GatewayTimeoutError;
export type EmailBuildDomainConnectApplyUrlPathParams = { readonly id: EmailDomainId };
export const EmailBuildDomainConnectApplyUrlPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailBuildDomainConnectApplyUrlRequestJson = {
  readonly mode: "send-only" | "send-and-receive";
};
export const EmailBuildDomainConnectApplyUrlRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    mode: Schema.Union([Schema.Literal("send-only"), Schema.Literal("send-and-receive")]),
  }))();
export type EmailBuildDomainConnectApplyUrl200 = DomainConnectApplyUrlResult;
export const EmailBuildDomainConnectApplyUrl200 = DomainConnectApplyUrlResult;
export type EmailBuildDomainConnectApplyUrl401 = UnauthorizedError;
export const EmailBuildDomainConnectApplyUrl401 = UnauthorizedError;
export type EmailBuildDomainConnectApplyUrl403 = ForbiddenError;
export const EmailBuildDomainConnectApplyUrl403 = ForbiddenError;
export type EmailBuildDomainConnectApplyUrl404 = ResourceNotFoundError;
export const EmailBuildDomainConnectApplyUrl404 = ResourceNotFoundError;
export type EmailBuildDomainConnectApplyUrl409 = ConflictError;
export const EmailBuildDomainConnectApplyUrl409 = ConflictError;
export type EmailBuildDomainConnectApplyUrl422 = ValidationError;
export const EmailBuildDomainConnectApplyUrl422 = ValidationError;
export type EmailBuildDomainConnectApplyUrl500 = InternalError;
export const EmailBuildDomainConnectApplyUrl500 = InternalError;
export type EmailBuildDomainConnectApplyUrl502 = EmailChannelError;
export const EmailBuildDomainConnectApplyUrl502 = EmailChannelError;
export type EmailBuildDomainConnectApplyUrl504 = GatewayTimeoutError;
export const EmailBuildDomainConnectApplyUrl504 = GatewayTimeoutError;
export type EmailCompleteDomainConnectPathParams = { readonly id: EmailDomainId };
export const EmailCompleteDomainConnectPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailCompleteDomainConnectRequestJson = {
  readonly state: string;
  readonly error?: string | null;
  readonly errorDescription?: string | null;
};
export const EmailCompleteDomainConnectRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    state: Schema.String,
    error: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    errorDescription: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type EmailCompleteDomainConnect200 = DomainConnectCompleteResult;
export const EmailCompleteDomainConnect200 = DomainConnectCompleteResult;
export type EmailCompleteDomainConnect401 = UnauthorizedError;
export const EmailCompleteDomainConnect401 = UnauthorizedError;
export type EmailCompleteDomainConnect403 = ForbiddenError;
export const EmailCompleteDomainConnect403 = ForbiddenError;
export type EmailCompleteDomainConnect404 = ResourceNotFoundError;
export const EmailCompleteDomainConnect404 = ResourceNotFoundError;
export type EmailCompleteDomainConnect422 = ValidationError;
export const EmailCompleteDomainConnect422 = ValidationError;
export type EmailCompleteDomainConnect500 = InternalError;
export const EmailCompleteDomainConnect500 = InternalError;
export type EmailCompleteDomainConnect502 = EmailChannelError;
export const EmailCompleteDomainConnect502 = EmailChannelError;
export type EmailCompleteDomainConnect504 = GatewayTimeoutError;
export const EmailCompleteDomainConnect504 = GatewayTimeoutError;
export type EmailEnableCatchAllPathParams = { readonly id: EmailDomainId };
export const EmailEnableCatchAllPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailEnableCatchAllRequestJson = { readonly endpointId?: WebhookEndpointId | null };
export const EmailEnableCatchAllRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    endpointId: Schema.optionalKey(Schema.Union([WebhookEndpointId, Schema.Null])),
  }))();
export type EmailEnableCatchAll201 = { readonly success: true };
export const EmailEnableCatchAll201 = /* @__PURE__ */ (() =>
  Schema.Struct({ success: Schema.Literal(true) }))();
export type EmailEnableCatchAll401 = UnauthorizedError;
export const EmailEnableCatchAll401 = UnauthorizedError;
export type EmailEnableCatchAll403 = ForbiddenError;
export const EmailEnableCatchAll403 = ForbiddenError;
export type EmailEnableCatchAll404 = ResourceNotFoundError;
export const EmailEnableCatchAll404 = ResourceNotFoundError;
export type EmailEnableCatchAll422 = ValidationError;
export const EmailEnableCatchAll422 = ValidationError;
export type EmailEnableCatchAll500 = InternalError;
export const EmailEnableCatchAll500 = InternalError;
export type EmailEnableCatchAll502 = ExternalServiceError;
export const EmailEnableCatchAll502 = ExternalServiceError;
export type EmailEnableCatchAll504 = GatewayTimeoutError;
export const EmailEnableCatchAll504 = GatewayTimeoutError;
export type EmailEnableReceivingPathParams = { readonly id: EmailDomainId };
export const EmailEnableReceivingPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailEnableReceivingRequestJson = {
  readonly domain: string;
  readonly catchAll?: boolean | null;
  readonly endpointId?: WebhookEndpointId | null;
  readonly addresses?: ReadonlyArray<string> | null;
};
export const EmailEnableReceivingRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    domain: Schema.String,
    catchAll: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    endpointId: Schema.optionalKey(Schema.Union([WebhookEndpointId, Schema.Null])),
    addresses: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  }))();
export type EmailEnableReceiving200 = {
  readonly success: true;
  readonly recipients: ReadonlyArray<string>;
};
export const EmailEnableReceiving200 = /* @__PURE__ */ (() =>
  Schema.Struct({ success: Schema.Literal(true), recipients: Schema.Array(Schema.String) }))();
export type EmailEnableReceiving401 = UnauthorizedError;
export const EmailEnableReceiving401 = UnauthorizedError;
export type EmailEnableReceiving403 = ForbiddenError;
export const EmailEnableReceiving403 = ForbiddenError;
export type EmailEnableReceiving404 = ResourceNotFoundError;
export const EmailEnableReceiving404 = ResourceNotFoundError;
export type EmailEnableReceiving422 = ValidationError;
export const EmailEnableReceiving422 = ValidationError;
export type EmailEnableReceiving500 = InternalError;
export const EmailEnableReceiving500 = InternalError;
export type EmailEnableReceiving504 = GatewayTimeoutError;
export const EmailEnableReceiving504 = GatewayTimeoutError;
export type EmailGetReceivingStatusPathParams = { readonly id: EmailDomainId };
export const EmailGetReceivingStatusPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailGetReceivingStatus200 = ReceivingStatus;
export const EmailGetReceivingStatus200 = ReceivingStatus;
export type EmailGetReceivingStatus401 = UnauthorizedError;
export const EmailGetReceivingStatus401 = UnauthorizedError;
export type EmailGetReceivingStatus403 = ForbiddenError;
export const EmailGetReceivingStatus403 = ForbiddenError;
export type EmailGetReceivingStatus404 = ResourceNotFoundError;
export const EmailGetReceivingStatus404 = ResourceNotFoundError;
export type EmailGetReceivingStatus422 = ValidationError;
export const EmailGetReceivingStatus422 = ValidationError;
export type EmailGetReceivingStatus500 = InternalError;
export const EmailGetReceivingStatus500 = InternalError;
export type EmailGetReceivingStatus504 = GatewayTimeoutError;
export const EmailGetReceivingStatus504 = GatewayTimeoutError;
export type EmailDetectRegistrarPathParams = { readonly id: EmailDomainId };
export const EmailDetectRegistrarPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailDetectRegistrarRequestJson = { readonly domain: string };
export const EmailDetectRegistrarRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ domain: Schema.String }))();
export type EmailDetectRegistrar200 = {
  readonly provider: string;
  readonly name: string;
  readonly nameservers: ReadonlyArray<string>;
  readonly docsUrl: string;
};
export const EmailDetectRegistrar200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    provider: Schema.String,
    name: Schema.String,
    nameservers: Schema.Array(Schema.String),
    docsUrl: Schema.String,
  }))();
export type EmailDetectRegistrar401 = UnauthorizedError;
export const EmailDetectRegistrar401 = UnauthorizedError;
export type EmailDetectRegistrar403 = ForbiddenError;
export const EmailDetectRegistrar403 = ForbiddenError;
export type EmailDetectRegistrar404 = ResourceNotFoundError;
export const EmailDetectRegistrar404 = ResourceNotFoundError;
export type EmailDetectRegistrar422 = ValidationError;
export const EmailDetectRegistrar422 = ValidationError;
export type EmailDetectRegistrar500 = InternalError;
export const EmailDetectRegistrar500 = InternalError;
export type EmailDetectRegistrar504 = GatewayTimeoutError;
export const EmailDetectRegistrar504 = GatewayTimeoutError;
export type EmailRotateDomainDkimPathParams = { readonly id: EmailDomainId };
export const EmailRotateDomainDkimPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailRotateDomainDkimHeaders = { readonly "idempotency-key": string };
export const EmailRotateDomainDkimHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
      )
      .check(
        Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
      ),
  }))();
export type EmailRotateDomainDkim200 = EmailDkimRotation;
export const EmailRotateDomainDkim200 = EmailDkimRotation;
export type EmailRotateDomainDkim401 = UnauthorizedError;
export const EmailRotateDomainDkim401 = UnauthorizedError;
export type EmailRotateDomainDkim403 = ForbiddenError;
export const EmailRotateDomainDkim403 = ForbiddenError;
export type EmailRotateDomainDkim404 = ResourceNotFoundError;
export const EmailRotateDomainDkim404 = ResourceNotFoundError;
export type EmailRotateDomainDkim409 = ConflictError;
export const EmailRotateDomainDkim409 = ConflictError;
export type EmailRotateDomainDkim422 = ValidationError;
export const EmailRotateDomainDkim422 = ValidationError;
export type EmailRotateDomainDkim500 = InternalError;
export const EmailRotateDomainDkim500 = InternalError;
export type EmailRotateDomainDkim502 = EmailChannelError;
export const EmailRotateDomainDkim502 = EmailChannelError;
export type EmailRotateDomainDkim504 = GatewayTimeoutError;
export const EmailRotateDomainDkim504 = GatewayTimeoutError;
export type EmailGetDomainVerificationPathParams = { readonly id: EmailDomainId };
export const EmailGetDomainVerificationPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailGetDomainVerification200 = EmailDomainVerification;
export const EmailGetDomainVerification200 = EmailDomainVerification;
export type EmailGetDomainVerification401 = UnauthorizedError;
export const EmailGetDomainVerification401 = UnauthorizedError;
export type EmailGetDomainVerification403 = ForbiddenError;
export const EmailGetDomainVerification403 = ForbiddenError;
export type EmailGetDomainVerification404 = ResourceNotFoundError;
export const EmailGetDomainVerification404 = ResourceNotFoundError;
export type EmailGetDomainVerification422 = ValidationError;
export const EmailGetDomainVerification422 = ValidationError;
export type EmailGetDomainVerification500 = InternalError;
export const EmailGetDomainVerification500 = InternalError;
export type EmailGetDomainVerification504 = GatewayTimeoutError;
export const EmailGetDomainVerification504 = GatewayTimeoutError;
export type EmailAdvanceDomainVerificationPathParams = { readonly id: EmailDomainId };
export const EmailAdvanceDomainVerificationPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailAdvanceDomainVerification200 = EmailDomainVerification;
export const EmailAdvanceDomainVerification200 = EmailDomainVerification;
export type EmailAdvanceDomainVerification401 = UnauthorizedError;
export const EmailAdvanceDomainVerification401 = UnauthorizedError;
export type EmailAdvanceDomainVerification403 = ForbiddenError;
export const EmailAdvanceDomainVerification403 = ForbiddenError;
export type EmailAdvanceDomainVerification404 = ResourceNotFoundError;
export const EmailAdvanceDomainVerification404 = ResourceNotFoundError;
export type EmailAdvanceDomainVerification409 = ConflictError;
export const EmailAdvanceDomainVerification409 = ConflictError;
export type EmailAdvanceDomainVerification422 = ValidationError;
export const EmailAdvanceDomainVerification422 = ValidationError;
export type EmailAdvanceDomainVerification429 = RateLimitedError;
export const EmailAdvanceDomainVerification429 = RateLimitedError;
export type EmailAdvanceDomainVerification500 = InternalError;
export const EmailAdvanceDomainVerification500 = InternalError;
export type EmailAdvanceDomainVerification502 = EmailChannelError;
export const EmailAdvanceDomainVerification502 = EmailChannelError;
export type EmailAdvanceDomainVerification504 = GatewayTimeoutError;
export const EmailAdvanceDomainVerification504 = GatewayTimeoutError;
export type EmailGetDomainWarmingPathParams = { readonly id: EmailDomainId };
export const EmailGetDomainWarmingPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailGetDomainWarming200 = DomainWarming;
export const EmailGetDomainWarming200 = DomainWarming;
export type EmailGetDomainWarming401 = UnauthorizedError;
export const EmailGetDomainWarming401 = UnauthorizedError;
export type EmailGetDomainWarming403 = ForbiddenError;
export const EmailGetDomainWarming403 = ForbiddenError;
export type EmailGetDomainWarming404 = ResourceNotFoundError;
export const EmailGetDomainWarming404 = ResourceNotFoundError;
export type EmailGetDomainWarming422 = ValidationError;
export const EmailGetDomainWarming422 = ValidationError;
export type EmailGetDomainWarming500 = InternalError;
export const EmailGetDomainWarming500 = InternalError;
export type EmailGetDomainWarming504 = GatewayTimeoutError;
export const EmailGetDomainWarming504 = GatewayTimeoutError;
export type EmailCreateDomainWarmingPlanPathParams = { readonly id: EmailDomainId };
export const EmailCreateDomainWarmingPlanPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailCreateDomainWarmingPlanRequestJson = {
  readonly identity: "new" | "migrating" | "returning";
  readonly initialDailyRecipients: number;
  readonly dailyGrowthPercent: number;
  readonly targetDailyRecipients: number;
};
export const EmailCreateDomainWarmingPlanRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
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
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
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
  }))();
export type EmailCreateDomainWarmingPlan201 = DomainWarming;
export const EmailCreateDomainWarmingPlan201 = DomainWarming;
export type EmailCreateDomainWarmingPlan401 = UnauthorizedError;
export const EmailCreateDomainWarmingPlan401 = UnauthorizedError;
export type EmailCreateDomainWarmingPlan403 = ForbiddenError;
export const EmailCreateDomainWarmingPlan403 = ForbiddenError;
export type EmailCreateDomainWarmingPlan404 = ResourceNotFoundError;
export const EmailCreateDomainWarmingPlan404 = ResourceNotFoundError;
export type EmailCreateDomainWarmingPlan409 = ConflictError;
export const EmailCreateDomainWarmingPlan409 = ConflictError;
export type EmailCreateDomainWarmingPlan422 = ValidationError;
export const EmailCreateDomainWarmingPlan422 = ValidationError;
export type EmailCreateDomainWarmingPlan500 = InternalError;
export const EmailCreateDomainWarmingPlan500 = InternalError;
export type EmailCreateDomainWarmingPlan504 = GatewayTimeoutError;
export const EmailCreateDomainWarmingPlan504 = GatewayTimeoutError;
export type EmailCancelDomainWarmingBatchPathParams = {
  readonly id: EmailDomainId;
  readonly batchId: EmailDomainWarmingBatchId;
};
export const EmailCancelDomainWarmingBatchPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId, batchId: EmailDomainWarmingBatchId }))();
export type EmailCancelDomainWarmingBatch200 = DomainWarming;
export const EmailCancelDomainWarmingBatch200 = DomainWarming;
export type EmailCancelDomainWarmingBatch401 = UnauthorizedError;
export const EmailCancelDomainWarmingBatch401 = UnauthorizedError;
export type EmailCancelDomainWarmingBatch403 = ForbiddenError;
export const EmailCancelDomainWarmingBatch403 = ForbiddenError;
export type EmailCancelDomainWarmingBatch404 = ResourceNotFoundError;
export const EmailCancelDomainWarmingBatch404 = ResourceNotFoundError;
export type EmailCancelDomainWarmingBatch409 = ConflictError;
export const EmailCancelDomainWarmingBatch409 = ConflictError;
export type EmailCancelDomainWarmingBatch422 = ValidationError;
export const EmailCancelDomainWarmingBatch422 = ValidationError;
export type EmailCancelDomainWarmingBatch500 = InternalError;
export const EmailCancelDomainWarmingBatch500 = InternalError;
export type EmailCancelDomainWarmingBatch504 = GatewayTimeoutError;
export const EmailCancelDomainWarmingBatch504 = GatewayTimeoutError;
export type EmailCompleteDomainWarmingPathParams = { readonly id: EmailDomainId };
export const EmailCompleteDomainWarmingPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailCompleteDomainWarmingRequestJson = { readonly note?: string | null };
export const EmailCompleteDomainWarmingRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    note: Schema.optionalKey(
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
  }))();
export type EmailCompleteDomainWarming200 = DomainWarming;
export const EmailCompleteDomainWarming200 = DomainWarming;
export type EmailCompleteDomainWarming401 = UnauthorizedError;
export const EmailCompleteDomainWarming401 = UnauthorizedError;
export type EmailCompleteDomainWarming403 = ForbiddenError;
export const EmailCompleteDomainWarming403 = ForbiddenError;
export type EmailCompleteDomainWarming404 = ResourceNotFoundError;
export const EmailCompleteDomainWarming404 = ResourceNotFoundError;
export type EmailCompleteDomainWarming409 = ConflictError;
export const EmailCompleteDomainWarming409 = ConflictError;
export type EmailCompleteDomainWarming422 = ValidationError;
export const EmailCompleteDomainWarming422 = ValidationError;
export type EmailCompleteDomainWarming500 = InternalError;
export const EmailCompleteDomainWarming500 = InternalError;
export type EmailCompleteDomainWarming504 = GatewayTimeoutError;
export const EmailCompleteDomainWarming504 = GatewayTimeoutError;
export type EmailPauseDomainWarmingPathParams = { readonly id: EmailDomainId };
export const EmailPauseDomainWarmingPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailPauseDomainWarmingRequestJson = { readonly note?: string | null };
export const EmailPauseDomainWarmingRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    note: Schema.optionalKey(
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
  }))();
export type EmailPauseDomainWarming200 = DomainWarming;
export const EmailPauseDomainWarming200 = DomainWarming;
export type EmailPauseDomainWarming401 = UnauthorizedError;
export const EmailPauseDomainWarming401 = UnauthorizedError;
export type EmailPauseDomainWarming403 = ForbiddenError;
export const EmailPauseDomainWarming403 = ForbiddenError;
export type EmailPauseDomainWarming404 = ResourceNotFoundError;
export const EmailPauseDomainWarming404 = ResourceNotFoundError;
export type EmailPauseDomainWarming409 = ConflictError;
export const EmailPauseDomainWarming409 = ConflictError;
export type EmailPauseDomainWarming422 = ValidationError;
export const EmailPauseDomainWarming422 = ValidationError;
export type EmailPauseDomainWarming500 = InternalError;
export const EmailPauseDomainWarming500 = InternalError;
export type EmailPauseDomainWarming504 = GatewayTimeoutError;
export const EmailPauseDomainWarming504 = GatewayTimeoutError;
export type EmailUpdateDomainWarmingPolicyPathParams = { readonly id: EmailDomainId };
export const EmailUpdateDomainWarmingPolicyPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailUpdateDomainWarmingPolicyRequestJson = {
  readonly dailyGrowthPercent: number;
  readonly targetDailyRecipients: number;
  readonly note?: string | null;
};
export const EmailUpdateDomainWarmingPolicyRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    dailyGrowthPercent: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
      .check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
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
          Schema.isMaxCodePoints(500).annotate({
            expected: "a string with at most 500 code points",
          }),
        ).check(
          Schema.isMaxLength(500).annotate({ expected: "a value with a length of at most 500" }),
        ),
        Schema.Null,
      ]),
    ),
  }))();
export type EmailUpdateDomainWarmingPolicy200 = DomainWarming;
export const EmailUpdateDomainWarmingPolicy200 = DomainWarming;
export type EmailUpdateDomainWarmingPolicy401 = UnauthorizedError;
export const EmailUpdateDomainWarmingPolicy401 = UnauthorizedError;
export type EmailUpdateDomainWarmingPolicy403 = ForbiddenError;
export const EmailUpdateDomainWarmingPolicy403 = ForbiddenError;
export type EmailUpdateDomainWarmingPolicy404 = ResourceNotFoundError;
export const EmailUpdateDomainWarmingPolicy404 = ResourceNotFoundError;
export type EmailUpdateDomainWarmingPolicy409 = ConflictError;
export const EmailUpdateDomainWarmingPolicy409 = ConflictError;
export type EmailUpdateDomainWarmingPolicy422 = ValidationError;
export const EmailUpdateDomainWarmingPolicy422 = ValidationError;
export type EmailUpdateDomainWarmingPolicy500 = InternalError;
export const EmailUpdateDomainWarmingPolicy500 = InternalError;
export type EmailUpdateDomainWarmingPolicy504 = GatewayTimeoutError;
export const EmailUpdateDomainWarmingPolicy504 = GatewayTimeoutError;
export type EmailResumeDomainWarmingPathParams = { readonly id: EmailDomainId };
export const EmailResumeDomainWarmingPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailDomainId }))();
export type EmailResumeDomainWarmingRequestJson = { readonly note?: string | null };
export const EmailResumeDomainWarmingRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    note: Schema.optionalKey(
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
  }))();
export type EmailResumeDomainWarming200 = DomainWarming;
export const EmailResumeDomainWarming200 = DomainWarming;
export type EmailResumeDomainWarming401 = UnauthorizedError;
export const EmailResumeDomainWarming401 = UnauthorizedError;
export type EmailResumeDomainWarming403 = ForbiddenError;
export const EmailResumeDomainWarming403 = ForbiddenError;
export type EmailResumeDomainWarming404 = ResourceNotFoundError;
export const EmailResumeDomainWarming404 = ResourceNotFoundError;
export type EmailResumeDomainWarming409 = ConflictError;
export const EmailResumeDomainWarming409 = ConflictError;
export type EmailResumeDomainWarming422 = ValidationError;
export const EmailResumeDomainWarming422 = ValidationError;
export type EmailResumeDomainWarming500 = InternalError;
export const EmailResumeDomainWarming500 = InternalError;
export type EmailResumeDomainWarming504 = GatewayTimeoutError;
export const EmailResumeDomainWarming504 = GatewayTimeoutError;
export type EmailListForwardingRulesQuery = {
  readonly domainId?: EmailDomainId | null;
  readonly isActive?: boolean | null;
};
export const EmailListForwardingRulesQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    domainId: Schema.optionalKey(Schema.Union([EmailDomainId, Schema.Null])),
    isActive: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  }))();
export type EmailListForwardingRules200 = ForwardingRuleList;
export const EmailListForwardingRules200 = ForwardingRuleList;
export type EmailListForwardingRules401 = UnauthorizedError;
export const EmailListForwardingRules401 = UnauthorizedError;
export type EmailListForwardingRules403 = ForbiddenError;
export const EmailListForwardingRules403 = ForbiddenError;
export type EmailListForwardingRules422 = ValidationError;
export const EmailListForwardingRules422 = ValidationError;
export type EmailListForwardingRules500 = InternalError;
export const EmailListForwardingRules500 = InternalError;
export type EmailListForwardingRules504 = GatewayTimeoutError;
export const EmailListForwardingRules504 = GatewayTimeoutError;
export type EmailCreateForwardingRuleRequestJson = {
  readonly name: string;
  readonly description?: string | null;
  readonly domainId?: EmailDomainId | null;
  readonly sourcePattern?: string | null;
  readonly forwardTo: ReadonlyArray<string>;
  readonly preserveHeaders?: boolean | null;
  readonly appendNote?: string | null;
  readonly conditions?: ForwardingConditions | null;
  readonly priority?: number | null;
  readonly isActive?: boolean | null;
  readonly metadata?: { readonly [x: string]: JsonValue } | null;
};
export const EmailCreateForwardingRuleRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.String,
    description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    domainId: Schema.optionalKey(Schema.Union([EmailDomainId, Schema.Null])),
    sourcePattern: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    forwardTo: Schema.Array(Schema.String),
    preserveHeaders: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    appendNote: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    conditions: Schema.optionalKey(Schema.Union([ForwardingConditions, Schema.Null])),
    priority: Schema.optionalKey(
      Schema.Union([
        Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
          .check(
            Schema.isGreaterThanOrEqualTo(0).annotate({
              expected: "a value greater than or equal to 0",
            }),
          )
          .check(
            Schema.isLessThanOrEqualTo(2147483647).annotate({
              expected: "a value less than or equal to 2147483647",
            }),
          ),
        Schema.Null,
      ]),
    ),
    isActive: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    metadata: Schema.optionalKey(
      Schema.Union([Schema.Record(Schema.String, JsonValue), Schema.Null]),
    ),
  }))();
export type EmailCreateForwardingRule201 = {
  readonly id: EmailForwardingRuleId;
  readonly name: string;
  readonly forwardTo: ReadonlyArray<string>;
  readonly priority: number;
  readonly isActive: boolean;
  readonly createdAt: string;
};
export const EmailCreateForwardingRule201 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: EmailForwardingRuleId,
    name: Schema.String,
    forwardTo: Schema.Array(Schema.String),
    priority: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
      .check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      )
      .check(
        Schema.isLessThanOrEqualTo(2147483647).annotate({
          expected: "a value less than or equal to 2147483647",
        }),
      ),
    isActive: Schema.Boolean,
    createdAt: Schema.String,
  }))();
export type EmailCreateForwardingRule401 = UnauthorizedError;
export const EmailCreateForwardingRule401 = UnauthorizedError;
export type EmailCreateForwardingRule403 = ForbiddenError;
export const EmailCreateForwardingRule403 = ForbiddenError;
export type EmailCreateForwardingRule404 = ResourceNotFoundError;
export const EmailCreateForwardingRule404 = ResourceNotFoundError;
export type EmailCreateForwardingRule409 = ConflictError;
export const EmailCreateForwardingRule409 = ConflictError;
export type EmailCreateForwardingRule422 = ValidationError;
export const EmailCreateForwardingRule422 = ValidationError;
export type EmailCreateForwardingRule500 = InternalError;
export const EmailCreateForwardingRule500 = InternalError;
export type EmailCreateForwardingRule504 = GatewayTimeoutError;
export const EmailCreateForwardingRule504 = GatewayTimeoutError;
export type EmailDeleteForwardingRulePathParams = { readonly id: EmailForwardingRuleId };
export const EmailDeleteForwardingRulePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailForwardingRuleId }))();
export type EmailDeleteForwardingRule200 = SuccessResult;
export const EmailDeleteForwardingRule200 = SuccessResult;
export type EmailDeleteForwardingRule401 = UnauthorizedError;
export const EmailDeleteForwardingRule401 = UnauthorizedError;
export type EmailDeleteForwardingRule403 = ForbiddenError;
export const EmailDeleteForwardingRule403 = ForbiddenError;
export type EmailDeleteForwardingRule404 = ResourceNotFoundError;
export const EmailDeleteForwardingRule404 = ResourceNotFoundError;
export type EmailDeleteForwardingRule422 = ValidationError;
export const EmailDeleteForwardingRule422 = ValidationError;
export type EmailDeleteForwardingRule500 = InternalError;
export const EmailDeleteForwardingRule500 = InternalError;
export type EmailDeleteForwardingRule504 = GatewayTimeoutError;
export const EmailDeleteForwardingRule504 = GatewayTimeoutError;
export type EmailUpdateForwardingRulePathParams = { readonly id: EmailForwardingRuleId };
export const EmailUpdateForwardingRulePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailForwardingRuleId }))();
export type EmailUpdateForwardingRuleRequestJson = {
  readonly name?: string | null;
  readonly description?: string | null;
  readonly domainId?: EmailDomainId | null;
  readonly sourcePattern?: string | null;
  readonly forwardTo?: ReadonlyArray<string> | null;
  readonly preserveHeaders?: boolean | null;
  readonly appendNote?: string | null;
  readonly conditions?: ForwardingConditions | null;
  readonly priority?: number | null;
  readonly isActive?: boolean | null;
  readonly metadata?: { readonly [x: string]: JsonValue } | null;
};
export const EmailUpdateForwardingRuleRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    domainId: Schema.optionalKey(Schema.Union([EmailDomainId, Schema.Null])),
    sourcePattern: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    forwardTo: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
    preserveHeaders: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    appendNote: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    conditions: Schema.optionalKey(Schema.Union([ForwardingConditions, Schema.Null])),
    priority: Schema.optionalKey(
      Schema.Union([
        Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
          .check(
            Schema.isGreaterThanOrEqualTo(0).annotate({
              expected: "a value greater than or equal to 0",
            }),
          )
          .check(
            Schema.isLessThanOrEqualTo(2147483647).annotate({
              expected: "a value less than or equal to 2147483647",
            }),
          ),
        Schema.Null,
      ]),
    ),
    isActive: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    metadata: Schema.optionalKey(
      Schema.Union([Schema.Record(Schema.String, JsonValue), Schema.Null]),
    ),
  }))();
export type EmailUpdateForwardingRule200 = {
  readonly id: EmailForwardingRuleId;
  readonly name: string;
  readonly forwardTo: ReadonlyArray<string>;
  readonly priority: number;
  readonly isActive: boolean;
  readonly updatedAt: string;
};
export const EmailUpdateForwardingRule200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: EmailForwardingRuleId,
    name: Schema.String,
    forwardTo: Schema.Array(Schema.String),
    priority: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
      .check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      )
      .check(
        Schema.isLessThanOrEqualTo(2147483647).annotate({
          expected: "a value less than or equal to 2147483647",
        }),
      ),
    isActive: Schema.Boolean,
    updatedAt: Schema.String,
  }))();
export type EmailUpdateForwardingRule401 = UnauthorizedError;
export const EmailUpdateForwardingRule401 = UnauthorizedError;
export type EmailUpdateForwardingRule403 = ForbiddenError;
export const EmailUpdateForwardingRule403 = ForbiddenError;
export type EmailUpdateForwardingRule404 = ResourceNotFoundError;
export const EmailUpdateForwardingRule404 = ResourceNotFoundError;
export type EmailUpdateForwardingRule422 = ValidationError;
export const EmailUpdateForwardingRule422 = ValidationError;
export type EmailUpdateForwardingRule500 = InternalError;
export const EmailUpdateForwardingRule500 = InternalError;
export type EmailUpdateForwardingRule504 = GatewayTimeoutError;
export const EmailUpdateForwardingRule504 = GatewayTimeoutError;
export type EmailGetForwardingLogQuery = {
  readonly forwardingRuleId?: EmailForwardingRuleId | null;
  readonly status?: "pending" | "forwarded" | "failed" | null;
  readonly after?: string | null;
  readonly before?: string | null;
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
};
export const EmailGetForwardingLogQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    forwardingRuleId: Schema.optionalKey(Schema.Union([EmailForwardingRuleId, Schema.Null])),
    status: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Literal("pending"),
          Schema.Literal("forwarded"),
          Schema.Literal("failed"),
        ]),
        Schema.Null,
      ]),
    ),
    after: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    before: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
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
export type EmailGetForwardingLog200 = ForwardingLogPage;
export const EmailGetForwardingLog200 = ForwardingLogPage;
export type EmailGetForwardingLog401 = UnauthorizedError;
export const EmailGetForwardingLog401 = UnauthorizedError;
export type EmailGetForwardingLog403 = ForbiddenError;
export const EmailGetForwardingLog403 = ForbiddenError;
export type EmailGetForwardingLog422 = ValidationError;
export const EmailGetForwardingLog422 = ValidationError;
export type EmailGetForwardingLog500 = InternalError;
export const EmailGetForwardingLog500 = InternalError;
export type EmailGetForwardingLog504 = GatewayTimeoutError;
export const EmailGetForwardingLog504 = GatewayTimeoutError;
export type EmailGetOnboardingReview200 = OnboardingReviewStatus;
export const EmailGetOnboardingReview200 = OnboardingReviewStatus;
export type EmailGetOnboardingReview401 = UnauthorizedError;
export const EmailGetOnboardingReview401 = UnauthorizedError;
export type EmailGetOnboardingReview403 = ForbiddenError;
export const EmailGetOnboardingReview403 = ForbiddenError;
export type EmailGetOnboardingReview422 = ValidationError;
export const EmailGetOnboardingReview422 = ValidationError;
export type EmailGetOnboardingReview500 = InternalError;
export const EmailGetOnboardingReview500 = InternalError;
export type EmailGetOnboardingReview504 = GatewayTimeoutError;
export const EmailGetOnboardingReview504 = GatewayTimeoutError;
export type EmailReapplyOnboardingReviewRequestJson = { readonly expectedGeneration: number };
export const EmailReapplyOnboardingReviewRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
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
  }))();
export type EmailReapplyOnboardingReview200 = OnboardingReviewStatus;
export const EmailReapplyOnboardingReview200 = OnboardingReviewStatus;
export type EmailReapplyOnboardingReview401 = UnauthorizedError;
export const EmailReapplyOnboardingReview401 = UnauthorizedError;
export type EmailReapplyOnboardingReview403 = ForbiddenError;
export const EmailReapplyOnboardingReview403 = ForbiddenError;
export type EmailReapplyOnboardingReview409 = ConflictError;
export const EmailReapplyOnboardingReview409 = ConflictError;
export type EmailReapplyOnboardingReview422 = ValidationError;
export const EmailReapplyOnboardingReview422 = ValidationError;
export type EmailReapplyOnboardingReview500 = InternalError;
export const EmailReapplyOnboardingReview500 = InternalError;
export type EmailReapplyOnboardingReview504 = GatewayTimeoutError;
export const EmailReapplyOnboardingReview504 = GatewayTimeoutError;
export type EmailRespondToOnboardingInformationRequestRequestJson = {
  readonly expectedGeneration: number;
  readonly responseText: string;
  readonly evidenceMediaIds: ReadonlyArray<MediaId>;
};
export const EmailRespondToOnboardingInformationRequestRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
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
        Schema.isMaxCodePoints(4000).annotate({
          expected: "a string with at most 4000 code points",
        }),
      )
      .check(
        Schema.isMaxLength(4000).annotate({ expected: "a value with a length of at most 4000" }),
      ),
    evidenceMediaIds: Schema.Array(MediaId).check(
      Schema.isMaxLength(3).annotate({ expected: "a value with a length of at most 3" }),
    ),
  }))();
export type EmailRespondToOnboardingInformationRequest200 = OnboardingReviewStatus;
export const EmailRespondToOnboardingInformationRequest200 = OnboardingReviewStatus;
export type EmailRespondToOnboardingInformationRequest401 = UnauthorizedError;
export const EmailRespondToOnboardingInformationRequest401 = UnauthorizedError;
export type EmailRespondToOnboardingInformationRequest403 = ForbiddenError;
export const EmailRespondToOnboardingInformationRequest403 = ForbiddenError;
export type EmailRespondToOnboardingInformationRequest409 = ConflictError;
export const EmailRespondToOnboardingInformationRequest409 = ConflictError;
export type EmailRespondToOnboardingInformationRequest422 = ValidationError;
export const EmailRespondToOnboardingInformationRequest422 = ValidationError;
export type EmailRespondToOnboardingInformationRequest500 = InternalError;
export const EmailRespondToOnboardingInformationRequest500 = InternalError;
export type EmailRespondToOnboardingInformationRequest504 = GatewayTimeoutError;
export const EmailRespondToOnboardingInformationRequest504 = GatewayTimeoutError;
export type EmailListSendersQuery = {
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
  readonly verificationStatus?: "pending" | "verified" | "failed" | null;
  readonly isActive?: boolean | null;
  readonly isDefault?: boolean | null;
  readonly namespaceId?: NamespaceId | null;
};
export const EmailListSendersQuery = /* @__PURE__ */ (() =>
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
    verificationStatus: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Literal("pending"),
          Schema.Literal("verified"),
          Schema.Literal("failed"),
        ]),
        Schema.Null,
      ]),
    ),
    isActive: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    isDefault: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
    namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
  }))();
export type EmailListSenders200 = EmailSenderPage;
export const EmailListSenders200 = EmailSenderPage;
export type EmailListSenders401 = UnauthorizedError;
export const EmailListSenders401 = UnauthorizedError;
export type EmailListSenders403 = ForbiddenError;
export const EmailListSenders403 = ForbiddenError;
export type EmailListSenders422 = ValidationError;
export const EmailListSenders422 = ValidationError;
export type EmailListSenders500 = InternalError;
export const EmailListSenders500 = InternalError;
export type EmailListSenders504 = GatewayTimeoutError;
export const EmailListSenders504 = GatewayTimeoutError;
export type EmailAddSenderHeaders = { readonly "idempotency-key": string };
export const EmailAddSenderHeaders = /* @__PURE__ */ (() =>
  Schema.Struct({
    "idempotency-key": Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
      )
      .check(
        Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
      ),
  }))();
export type EmailAddSenderRequestJson = {
  readonly email: string;
  readonly domainId?: EmailDomainId | null;
  readonly name?: string | null;
  readonly replyToEmails?: ReadonlyArray<string> | null;
  readonly namespaceId?: NamespaceId | null;
};
export const EmailAddSenderRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    email: Schema.String,
    domainId: Schema.optionalKey(Schema.Union([EmailDomainId, Schema.Null])),
    name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    replyToEmails: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
    namespaceId: Schema.optionalKey(Schema.Union([NamespaceId, Schema.Null])),
  }))();
export type EmailAddSender201 = {
  readonly id: EmailSenderId;
  readonly email: string;
  readonly status: "pending" | "verified" | "failed";
  readonly providerLifecycle: "provisioning" | "active" | "deleting" | "failed";
  readonly providerFailureCode: string | null;
  readonly createdAt: string;
};
export const EmailAddSender201 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: EmailSenderId,
    email: Schema.String,
    status: Schema.Union([
      Schema.Literal("pending"),
      Schema.Literal("verified"),
      Schema.Literal("failed"),
    ]),
    providerLifecycle: Schema.Union([
      Schema.Literal("provisioning"),
      Schema.Literal("active"),
      Schema.Literal("deleting"),
      Schema.Literal("failed"),
    ]),
    providerFailureCode: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
  }))();
export type EmailAddSender401 = UnauthorizedError;
export const EmailAddSender401 = UnauthorizedError;
export type EmailAddSender403 = ForbiddenError;
export const EmailAddSender403 = ForbiddenError;
export type EmailAddSender404 = ResourceNotFoundError;
export const EmailAddSender404 = ResourceNotFoundError;
export type EmailAddSender409 = ConflictError;
export const EmailAddSender409 = ConflictError;
export type EmailAddSender422 = ValidationError;
export const EmailAddSender422 = ValidationError;
export type EmailAddSender500 = InternalError;
export const EmailAddSender500 = InternalError;
export type EmailAddSender502 = ExternalServiceError;
export const EmailAddSender502 = ExternalServiceError;
export type EmailAddSender504 = GatewayTimeoutError;
export const EmailAddSender504 = GatewayTimeoutError;
export type EmailGetSenderPathParams = { readonly id: EmailSenderId };
export const EmailGetSenderPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailSenderId }))();
export type EmailGetSender200 = {
  readonly id: EmailSenderId;
  readonly organizationId: string;
  readonly email: string;
  readonly name: string | null;
  readonly domainId: EmailDomainId | null;
  readonly namespaceId: NamespaceId | null;
  readonly verificationStatus: "pending" | "verified" | "failed";
  readonly verifiedAt: string | null;
  readonly verificationToken: string | null;
  readonly providerLifecycle: "provisioning" | "active" | "deleting" | "failed";
  readonly providerFailureCode: string | null;
  readonly isDefault: boolean;
  readonly replyToEmails: ReadonlyArray<string> | null;
  readonly deliverability: DeliverabilityFacts;
  readonly series: SendsSeries;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const EmailGetSender200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: EmailSenderId,
    organizationId: Schema.String,
    email: Schema.String,
    name: Schema.Union([Schema.String, Schema.Null]),
    domainId: Schema.Union([EmailDomainId, Schema.Null]),
    namespaceId: Schema.Union([NamespaceId, Schema.Null]).annotate({
      description:
        "The namespace the sender belongs to, or null at organization level. A sender on a domain takes the domain's namespace.",
    }),
    verificationStatus: Schema.Union([
      Schema.Literal("pending"),
      Schema.Literal("verified"),
      Schema.Literal("failed"),
    ]),
    verifiedAt: Schema.Union([Schema.String, Schema.Null]),
    verificationToken: Schema.Union([Schema.String, Schema.Null]),
    providerLifecycle: Schema.Union([
      Schema.Literal("provisioning"),
      Schema.Literal("active"),
      Schema.Literal("deleting"),
      Schema.Literal("failed"),
    ]),
    providerFailureCode: Schema.Union([Schema.String, Schema.Null]),
    isDefault: Schema.Boolean,
    replyToEmails: Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    deliverability: DeliverabilityFacts,
    series: SendsSeries,
    isActive: Schema.Boolean,
    createdAt: Schema.String,
    updatedAt: Schema.String,
  }))();
export type EmailGetSender401 = UnauthorizedError;
export const EmailGetSender401 = UnauthorizedError;
export type EmailGetSender403 = ForbiddenError;
export const EmailGetSender403 = ForbiddenError;
export type EmailGetSender404 = ResourceNotFoundError;
export const EmailGetSender404 = ResourceNotFoundError;
export type EmailGetSender422 = ValidationError;
export const EmailGetSender422 = ValidationError;
export type EmailGetSender500 = InternalError;
export const EmailGetSender500 = InternalError;
export type EmailGetSender504 = GatewayTimeoutError;
export const EmailGetSender504 = GatewayTimeoutError;
export type EmailRemoveSenderPathParams = { readonly id: EmailSenderId };
export const EmailRemoveSenderPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailSenderId }))();
export type EmailRemoveSender200 = SuccessResult;
export const EmailRemoveSender200 = SuccessResult;
export type EmailRemoveSender401 = UnauthorizedError;
export const EmailRemoveSender401 = UnauthorizedError;
export type EmailRemoveSender403 = ForbiddenError;
export const EmailRemoveSender403 = ForbiddenError;
export type EmailRemoveSender404 = ResourceNotFoundError;
export const EmailRemoveSender404 = ResourceNotFoundError;
export type EmailRemoveSender422 = ValidationError;
export const EmailRemoveSender422 = ValidationError;
export type EmailRemoveSender500 = InternalError;
export const EmailRemoveSender500 = InternalError;
export type EmailRemoveSender504 = GatewayTimeoutError;
export const EmailRemoveSender504 = GatewayTimeoutError;
export type EmailSetDefaultSenderPathParams = { readonly id: EmailSenderId };
export const EmailSetDefaultSenderPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailSenderId }))();
export type EmailSetDefaultSender200 = SuccessResult;
export const EmailSetDefaultSender200 = SuccessResult;
export type EmailSetDefaultSender401 = UnauthorizedError;
export const EmailSetDefaultSender401 = UnauthorizedError;
export type EmailSetDefaultSender403 = ForbiddenError;
export const EmailSetDefaultSender403 = ForbiddenError;
export type EmailSetDefaultSender404 = ResourceNotFoundError;
export const EmailSetDefaultSender404 = ResourceNotFoundError;
export type EmailSetDefaultSender422 = ValidationError;
export const EmailSetDefaultSender422 = ValidationError;
export type EmailSetDefaultSender500 = InternalError;
export const EmailSetDefaultSender500 = InternalError;
export type EmailSetDefaultSender504 = GatewayTimeoutError;
export const EmailSetDefaultSender504 = GatewayTimeoutError;
export type EmailCheckSenderVerificationPathParams = { readonly id: EmailSenderId };
export const EmailCheckSenderVerificationPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: EmailSenderId }))();
export type EmailCheckSenderVerification200 = {
  readonly id: EmailSenderId;
  readonly email: string;
  readonly status: "pending" | "verified" | "failed";
  readonly verifiedAt: string | null;
};
export const EmailCheckSenderVerification200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: EmailSenderId,
    email: Schema.String,
    status: Schema.Union([
      Schema.Literal("pending"),
      Schema.Literal("verified"),
      Schema.Literal("failed"),
    ]),
    verifiedAt: Schema.Union([Schema.String, Schema.Null]),
  }))();
export type EmailCheckSenderVerification401 = UnauthorizedError;
export const EmailCheckSenderVerification401 = UnauthorizedError;
export type EmailCheckSenderVerification403 = ForbiddenError;
export const EmailCheckSenderVerification403 = ForbiddenError;
export type EmailCheckSenderVerification404 = ResourceNotFoundError;
export const EmailCheckSenderVerification404 = ResourceNotFoundError;
export type EmailCheckSenderVerification422 = ValidationError;
export const EmailCheckSenderVerification422 = ValidationError;
export type EmailCheckSenderVerification500 = InternalError;
export const EmailCheckSenderVerification500 = InternalError;
export type EmailCheckSenderVerification502 = ExternalServiceError;
export const EmailCheckSenderVerification502 = ExternalServiceError;
export type EmailCheckSenderVerification504 = GatewayTimeoutError;
export const EmailCheckSenderVerification504 = GatewayTimeoutError;
export type EmailGetStatsQuery = {
  readonly after?: string | null;
  readonly before?: string | null;
};
export const EmailGetStatsQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    after: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    before: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }))();
export type EmailGetStats200 = {
  readonly totalSent: number;
  readonly totalDelivered: number;
  readonly totalBounced: number;
  readonly totalComplained: number;
  readonly deliveryRate: number;
  readonly bounceRate: number;
  readonly complaintRate: number;
};
export const EmailGetStats200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    totalSent: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    totalDelivered: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    totalBounced: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    totalComplained: Schema.Finite.check(Schema.isInt().annotate({ expected: "an integer" }))
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
    deliveryRate: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    bounceRate: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
    complaintRate: Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
  }))();
export type EmailGetStats401 = UnauthorizedError;
export const EmailGetStats401 = UnauthorizedError;
export type EmailGetStats403 = ForbiddenError;
export const EmailGetStats403 = ForbiddenError;
export type EmailGetStats422 = ValidationError;
export const EmailGetStats422 = ValidationError;
export type EmailGetStats500 = InternalError;
export const EmailGetStats500 = InternalError;
export type EmailGetStats504 = GatewayTimeoutError;
export const EmailGetStats504 = GatewayTimeoutError;
export type EmailListSuppressionsQuery = {
  readonly type?: "bounce" | "complaint" | "unsubscribe" | "manual" | null;
  readonly status?: "active" | "expired" | null;
  readonly search?: string | null;
  readonly limit?: number | null;
  readonly cursor?: Cursor | null;
};
export const EmailListSuppressionsQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    type: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.Literal("bounce"),
          Schema.Literal("complaint"),
          Schema.Literal("unsubscribe"),
          Schema.Literal("manual"),
        ]),
        Schema.Null,
      ]),
    ),
    status: Schema.optionalKey(
      Schema.Union([
        Schema.Union([Schema.Literal("active"), Schema.Literal("expired")]),
        Schema.Null,
      ]),
    ),
    search: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(256).annotate({
            expected: "a string with at most 256 code points",
          }),
        ).check(
          Schema.isMaxLength(256).annotate({ expected: "a value with a length of at most 256" }),
        ),
        Schema.Null,
      ]),
    ),
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
export type EmailListSuppressions200 = SuppressionPage;
export const EmailListSuppressions200 = SuppressionPage;
export type EmailListSuppressions401 = UnauthorizedError;
export const EmailListSuppressions401 = UnauthorizedError;
export type EmailListSuppressions403 = ForbiddenError;
export const EmailListSuppressions403 = ForbiddenError;
export type EmailListSuppressions422 = ValidationError;
export const EmailListSuppressions422 = ValidationError;
export type EmailListSuppressions500 = InternalError;
export const EmailListSuppressions500 = InternalError;
export type EmailListSuppressions504 = GatewayTimeoutError;
export const EmailListSuppressions504 = GatewayTimeoutError;
export type EmailRemoveSuppressionPathParams = { readonly id: SuppressionId };
export const EmailRemoveSuppressionPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: SuppressionId }))();
export type EmailRemoveSuppression200 = SuccessResult;
export const EmailRemoveSuppression200 = SuccessResult;
export type EmailRemoveSuppression401 = UnauthorizedError;
export const EmailRemoveSuppression401 = UnauthorizedError;
export type EmailRemoveSuppression403 = ForbiddenError;
export const EmailRemoveSuppression403 = ForbiddenError;
export type EmailRemoveSuppression404 = ResourceNotFoundError;
export const EmailRemoveSuppression404 = ResourceNotFoundError;
export type EmailRemoveSuppression422 = ValidationError;
export const EmailRemoveSuppression422 = ValidationError;
export type EmailRemoveSuppression500 = InternalError;
export const EmailRemoveSuppression500 = InternalError;
export type EmailRemoveSuppression502 = EmailChannelError;
export const EmailRemoveSuppression502 = EmailChannelError;
export type EmailRemoveSuppression504 = GatewayTimeoutError;
export const EmailRemoveSuppression504 = GatewayTimeoutError;
export type EmailCountSuppressions200 = SuppressionCounts;
export const EmailCountSuppressions200 = SuppressionCounts;
export type EmailCountSuppressions401 = UnauthorizedError;
export const EmailCountSuppressions401 = UnauthorizedError;
export type EmailCountSuppressions403 = ForbiddenError;
export const EmailCountSuppressions403 = ForbiddenError;
export type EmailCountSuppressions422 = ValidationError;
export const EmailCountSuppressions422 = ValidationError;
export type EmailCountSuppressions500 = InternalError;
export const EmailCountSuppressions500 = InternalError;
export type EmailCountSuppressions504 = GatewayTimeoutError;
export const EmailCountSuppressions504 = GatewayTimeoutError;
export type EmailGetTrackingDefaults200 = EmailTrackingDefaults;
export const EmailGetTrackingDefaults200 = EmailTrackingDefaults;
export type EmailGetTrackingDefaults401 = UnauthorizedError;
export const EmailGetTrackingDefaults401 = UnauthorizedError;
export type EmailGetTrackingDefaults403 = ForbiddenError;
export const EmailGetTrackingDefaults403 = ForbiddenError;
export type EmailGetTrackingDefaults404 = ResourceNotFoundError;
export const EmailGetTrackingDefaults404 = ResourceNotFoundError;
export type EmailGetTrackingDefaults422 = ValidationError;
export const EmailGetTrackingDefaults422 = ValidationError;
export type EmailGetTrackingDefaults500 = InternalError;
export const EmailGetTrackingDefaults500 = InternalError;
export type EmailGetTrackingDefaults504 = GatewayTimeoutError;
export const EmailGetTrackingDefaults504 = GatewayTimeoutError;
export type EmailUpdateTrackingDefaultsRequestJson = {
  readonly opens?: boolean;
  readonly clicks?: boolean;
};
export const EmailUpdateTrackingDefaultsRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    opens: Schema.optionalKey(Schema.Boolean),
    clicks: Schema.optionalKey(Schema.Boolean),
  }))();
export type EmailUpdateTrackingDefaults200 = EmailTrackingDefaults;
export const EmailUpdateTrackingDefaults200 = EmailTrackingDefaults;
export type EmailUpdateTrackingDefaults401 = UnauthorizedError;
export const EmailUpdateTrackingDefaults401 = UnauthorizedError;
export type EmailUpdateTrackingDefaults403 = ForbiddenError;
export const EmailUpdateTrackingDefaults403 = ForbiddenError;
export type EmailUpdateTrackingDefaults404 = ResourceNotFoundError;
export const EmailUpdateTrackingDefaults404 = ResourceNotFoundError;
export type EmailUpdateTrackingDefaults422 = ValidationError;
export const EmailUpdateTrackingDefaults422 = ValidationError;
export type EmailUpdateTrackingDefaults500 = InternalError;
export const EmailUpdateTrackingDefaults500 = InternalError;
export type EmailUpdateTrackingDefaults504 = GatewayTimeoutError;
export const EmailUpdateTrackingDefaults504 = GatewayTimeoutError;
export type EmailGetRecipientTrackingPreferenceQuery = { readonly email: TrackingRecipientEmail };
export const EmailGetRecipientTrackingPreferenceQuery = /* @__PURE__ */ (() =>
  Schema.Struct({ email: TrackingRecipientEmail }))();
export type EmailGetRecipientTrackingPreference200 = EmailRecipientTrackingPreference;
export const EmailGetRecipientTrackingPreference200 = EmailRecipientTrackingPreference;
export type EmailGetRecipientTrackingPreference401 = UnauthorizedError;
export const EmailGetRecipientTrackingPreference401 = UnauthorizedError;
export type EmailGetRecipientTrackingPreference403 = ForbiddenError;
export const EmailGetRecipientTrackingPreference403 = ForbiddenError;
export type EmailGetRecipientTrackingPreference422 = ValidationError;
export const EmailGetRecipientTrackingPreference422 = ValidationError;
export type EmailGetRecipientTrackingPreference500 = InternalError;
export const EmailGetRecipientTrackingPreference500 = InternalError;
export type EmailGetRecipientTrackingPreference504 = GatewayTimeoutError;
export const EmailGetRecipientTrackingPreference504 = GatewayTimeoutError;
export type EmailUpdateRecipientTrackingPreferenceRequestJson = {
  readonly email: TrackingRecipientEmail;
  readonly optedOut: boolean;
};
export const EmailUpdateRecipientTrackingPreferenceRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({ email: TrackingRecipientEmail, optedOut: Schema.Boolean }))();
export type EmailUpdateRecipientTrackingPreference200 = EmailRecipientTrackingPreference;
export const EmailUpdateRecipientTrackingPreference200 = EmailRecipientTrackingPreference;
export type EmailUpdateRecipientTrackingPreference401 = UnauthorizedError;
export const EmailUpdateRecipientTrackingPreference401 = UnauthorizedError;
export type EmailUpdateRecipientTrackingPreference403 = ForbiddenError;
export const EmailUpdateRecipientTrackingPreference403 = ForbiddenError;
export type EmailUpdateRecipientTrackingPreference422 = ValidationError;
export const EmailUpdateRecipientTrackingPreference422 = ValidationError;
export type EmailUpdateRecipientTrackingPreference500 = InternalError;
export const EmailUpdateRecipientTrackingPreference500 = InternalError;
export type EmailUpdateRecipientTrackingPreference504 = GatewayTimeoutError;
export const EmailUpdateRecipientTrackingPreference504 = GatewayTimeoutError;

export class EmailGroup extends HttpApiGroup.make("Email")
  .add(
    HttpApiEndpoint.get("emailListBlocks", "/v1/email/blocks", {
      query: EmailListBlocksQuery,
      success: EmailListBlocks200,
      error: [
        EmailListBlocks401.pipe(HttpApiSchema.status(401)),
        EmailListBlocks403.pipe(HttpApiSchema.status(403)),
        EmailListBlocks422.pipe(HttpApiSchema.status(422)),
        EmailListBlocks500,
        EmailListBlocks504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.listBlocks")
      .annotate(OpenApi.Summary, "List block entries")
      .annotate(
        OpenApi.Description,
        "Returns block entries, newest first, optionally filtered by block type and active state. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.post("emailAddBlock", "/v1/email/blocks", {
      payload: EmailAddBlockRequestJson,
      success: EmailAddBlock201.pipe(HttpApiSchema.status(201)),
      error: [
        EmailAddBlock401.pipe(HttpApiSchema.status(401)),
        EmailAddBlock403.pipe(HttpApiSchema.status(403)),
        EmailAddBlock409.pipe(HttpApiSchema.status(409)),
        EmailAddBlock422.pipe(HttpApiSchema.status(422)),
        EmailAddBlock500,
        EmailAddBlock504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.addBlock")
      .annotate(OpenApi.Summary, "Add a block entry")
      .annotate(
        OpenApi.Description,
        "Blocks an email address or domain from inbound receiving and returns the created block entry. Responds with 201.",
      ),
    HttpApiEndpoint.delete("emailRemoveBlock", "/v1/email/blocks/:id", {
      params: EmailRemoveBlockPathParams,
      success: EmailRemoveBlock200,
      error: [
        EmailRemoveBlock401.pipe(HttpApiSchema.status(401)),
        EmailRemoveBlock403.pipe(HttpApiSchema.status(403)),
        EmailRemoveBlock404.pipe(HttpApiSchema.status(404)),
        EmailRemoveBlock422.pipe(HttpApiSchema.status(422)),
        EmailRemoveBlock500,
        EmailRemoveBlock504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.removeBlock")
      .annotate(OpenApi.Summary, "Remove a block entry")
      .annotate(
        OpenApi.Description,
        "Permanently deletes a block entry, unblocking the associated address or domain.",
      ),
    HttpApiEndpoint.patch("emailUpdateBlock", "/v1/email/blocks/:id", {
      params: EmailUpdateBlockPathParams,
      payload: EmailUpdateBlockRequestJson,
      success: EmailUpdateBlock200,
      error: [
        EmailUpdateBlock401.pipe(HttpApiSchema.status(401)),
        EmailUpdateBlock403.pipe(HttpApiSchema.status(403)),
        EmailUpdateBlock404.pipe(HttpApiSchema.status(404)),
        EmailUpdateBlock422.pipe(HttpApiSchema.status(422)),
        EmailUpdateBlock500,
        EmailUpdateBlock504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.updateBlock")
      .annotate(OpenApi.Summary, "Update a block entry")
      .annotate(
        OpenApi.Description,
        "Updates a block entry's reason, notes, active state, or expiry.",
      ),
    HttpApiEndpoint.post("emailCheckBlocked", "/v1/email/blocks/check", {
      payload: EmailCheckBlockedRequestJson,
      success: EmailCheckBlocked200,
      error: [
        EmailCheckBlocked401.pipe(HttpApiSchema.status(401)),
        EmailCheckBlocked403.pipe(HttpApiSchema.status(403)),
        EmailCheckBlocked422.pipe(HttpApiSchema.status(422)),
        EmailCheckBlocked500,
        EmailCheckBlocked504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.checkBlocked")
      .annotate(OpenApi.Summary, "Check whether an address is blocked")
      .annotate(
        OpenApi.Description,
        "Checks whether an email address is currently blocked and returns the matching block rule when one applies.",
      ),
    HttpApiEndpoint.get("emailGetBlockLogs", "/v1/email/blocks/logs", {
      query: EmailGetBlockLogsQuery,
      success: EmailGetBlockLogs200,
      error: [
        EmailGetBlockLogs401.pipe(HttpApiSchema.status(401)),
        EmailGetBlockLogs403.pipe(HttpApiSchema.status(403)),
        EmailGetBlockLogs422.pipe(HttpApiSchema.status(422)),
        EmailGetBlockLogs500,
        EmailGetBlockLogs504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.getBlockLogs")
      .annotate(OpenApi.Summary, "List blocked email logs")
      .annotate(
        OpenApi.Description,
        "Returns inbound emails that were blocked, most recently blocked first, optionally filtered by block entry, sender, or block time (`after`, `before`). Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.get("emailGetCatchAllConfig", "/v1/email/catch-all/config", {
      query: EmailGetCatchAllConfigQuery,
      success: EmailGetCatchAllConfig200,
      error: [
        EmailGetCatchAllConfig401.pipe(HttpApiSchema.status(401)),
        EmailGetCatchAllConfig403.pipe(HttpApiSchema.status(403)),
        EmailGetCatchAllConfig404.pipe(HttpApiSchema.status(404)),
        EmailGetCatchAllConfig422.pipe(HttpApiSchema.status(422)),
        EmailGetCatchAllConfig500,
        EmailGetCatchAllConfig504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.getCatchAllConfig")
      .annotate(OpenApi.Summary, "Get catch-all configuration")
      .annotate(
        OpenApi.Description,
        "Returns the catch-all receiving configuration for a domain, including the webhook endpoint that receives its inbound mail and its email counts.",
      ),
    HttpApiEndpoint.patch("emailUpdateCatchAllConfig", "/v1/email/catch-all/config", {
      payload: EmailUpdateCatchAllConfigRequestJson,
      success: EmailUpdateCatchAllConfig200,
      error: [
        EmailUpdateCatchAllConfig401.pipe(HttpApiSchema.status(401)),
        EmailUpdateCatchAllConfig403.pipe(HttpApiSchema.status(403)),
        EmailUpdateCatchAllConfig404.pipe(HttpApiSchema.status(404)),
        EmailUpdateCatchAllConfig422.pipe(HttpApiSchema.status(422)),
        EmailUpdateCatchAllConfig500,
        EmailUpdateCatchAllConfig504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.updateCatchAllConfig")
      .annotate(OpenApi.Summary, "Update catch-all configuration")
      .annotate(
        OpenApi.Description,
        "Updates a domain's catch-all receiving configuration: the webhook endpoint that receives its inbound mail.",
      ),
    HttpApiEndpoint.get("emailGetCatchAllStats", "/v1/email/catch-all/stats", {
      query: EmailGetCatchAllStatsQuery,
      success: EmailGetCatchAllStats200,
      error: [
        EmailGetCatchAllStats401.pipe(HttpApiSchema.status(401)),
        EmailGetCatchAllStats403.pipe(HttpApiSchema.status(403)),
        EmailGetCatchAllStats404.pipe(HttpApiSchema.status(404)),
        EmailGetCatchAllStats422.pipe(HttpApiSchema.status(422)),
        EmailGetCatchAllStats500,
        EmailGetCatchAllStats504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.getCatchAllStats")
      .annotate(OpenApi.Summary, "Get catch-all statistics")
      .annotate(
        OpenApi.Description,
        "Returns catch-all receiving counters for a domain, adding an aggregated breakdown when `after` or `before` bounds a range: `after` inclusive, `before` exclusive.",
      ),
    HttpApiEndpoint.get("emailListDomains", "/v1/email/domains", {
      query: EmailListDomainsQuery,
      success: EmailListDomains200,
      error: [
        EmailListDomains401.pipe(HttpApiSchema.status(401)),
        EmailListDomains403.pipe(HttpApiSchema.status(403)),
        EmailListDomains422.pipe(HttpApiSchema.status(422)),
        EmailListDomains500,
        EmailListDomains504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.listDomains")
      .annotate(OpenApi.Summary, "List sending domains")
      .annotate(
        OpenApi.Description,
        "Returns the organization's sending domains, newest first. A namespace-scoped key lists only its namespace's domains; an organization-wide caller lists every domain, or one namespace's with `namespaceId`. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page. `sendable=true` lists only domains a send can use now: active, and verified, or verified before and degraded since. Each row carries `deliverability` (bounce and complaint rates over the last 24 hours, the window the 5% bounce limit is enforced over) and `series`, the last 14 days of daily email sends attributed to the domain, oldest first.",
      ),
    HttpApiEndpoint.post("emailAddDomain", "/v1/email/domains", {
      payload: EmailAddDomainRequestJson,
      success: EmailAddDomain201.pipe(HttpApiSchema.status(201)),
      error: [
        EmailAddDomain401.pipe(HttpApiSchema.status(401)),
        EmailAddDomain402.pipe(HttpApiSchema.status(402)),
        EmailAddDomain403.pipe(HttpApiSchema.status(403)),
        EmailAddDomain404.pipe(HttpApiSchema.status(404)),
        EmailAddDomain409.pipe(HttpApiSchema.status(409)),
        EmailAddDomain422.pipe(HttpApiSchema.status(422)),
        EmailAddDomain429.pipe(HttpApiSchema.status(429)),
        EmailAddDomain500,
        EmailAddDomain502.pipe(HttpApiSchema.status(502)),
        EmailAddDomain504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.addDomain")
      .annotate(OpenApi.Summary, "Add a sending domain")
      .annotate(
        OpenApi.Description,
        "Registers a domain for sending and returns it with the DNS records required to verify ownership and configure DKIM. Responds with 201. Supplying a connection attaches the domain to that DNS account; the domain must sit inside the zone given with it. When Samva cannot register another sending domain right now, this responds with 429 and no domain is created. A banned organization is refused with 403. `namespaceId` places the domain in a namespace, and only that namespace's keys and organization-wide callers reach it; a namespace-scoped key always adds to its own namespace.",
      ),
    HttpApiEndpoint.get("emailGetDomainById", "/v1/email/domains/:id", {
      params: EmailGetDomainByIdPathParams,
      success: EmailGetDomainById200,
      error: [
        EmailGetDomainById401.pipe(HttpApiSchema.status(401)),
        EmailGetDomainById403.pipe(HttpApiSchema.status(403)),
        EmailGetDomainById404.pipe(HttpApiSchema.status(404)),
        EmailGetDomainById422.pipe(HttpApiSchema.status(422)),
        EmailGetDomainById500,
        EmailGetDomainById504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.getDomainById")
      .annotate(OpenApi.Summary, "Get a sending domain")
      .annotate(
        OpenApi.Description,
        "Returns a single sending domain, including its DNS records and verification details.",
      ),
    HttpApiEndpoint.delete("emailRemoveDomain", "/v1/email/domains/:id", {
      params: EmailRemoveDomainPathParams,
      success: EmailRemoveDomain200,
      error: [
        EmailRemoveDomain401.pipe(HttpApiSchema.status(401)),
        EmailRemoveDomain403.pipe(HttpApiSchema.status(403)),
        EmailRemoveDomain404.pipe(HttpApiSchema.status(404)),
        EmailRemoveDomain422.pipe(HttpApiSchema.status(422)),
        EmailRemoveDomain500,
        EmailRemoveDomain502.pipe(HttpApiSchema.status(502)),
        EmailRemoveDomain504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.removeDomain")
      .annotate(OpenApi.Summary, "Remove a sending domain")
      .annotate(OpenApi.Description, "Permanently deletes a sending domain from the organization."),
    HttpApiEndpoint.patch("emailUpdateDomainConfig", "/v1/email/domains/:id/config", {
      params: EmailUpdateDomainConfigPathParams,
      payload: EmailUpdateDomainConfigRequestJson,
      success: EmailUpdateDomainConfig200,
      error: [
        EmailUpdateDomainConfig401.pipe(HttpApiSchema.status(401)),
        EmailUpdateDomainConfig403.pipe(HttpApiSchema.status(403)),
        EmailUpdateDomainConfig404.pipe(HttpApiSchema.status(404)),
        EmailUpdateDomainConfig422.pipe(HttpApiSchema.status(422)),
        EmailUpdateDomainConfig500,
        EmailUpdateDomainConfig504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.updateDomainConfig")
      .annotate(OpenApi.Summary, "Update a domain's send-settings config")
      .annotate(
        OpenApi.Description,
        "Overrides the domain's open/click tracking, reply-to, topic defaults, and the brand its mail uses for the settings cascade. An omitted field is left unchanged; null clears it back to the organization default. Returns the saved config.",
      ),
    HttpApiEndpoint.get("emailGetCustomTracking", "/v1/email/domains/:id/custom-tracking", {
      params: EmailGetCustomTrackingPathParams,
      success: EmailGetCustomTracking200,
      error: [
        EmailGetCustomTracking401.pipe(HttpApiSchema.status(401)),
        EmailGetCustomTracking403.pipe(HttpApiSchema.status(403)),
        EmailGetCustomTracking404.pipe(HttpApiSchema.status(404)),
        EmailGetCustomTracking422.pipe(HttpApiSchema.status(422)),
        EmailGetCustomTracking500,
        EmailGetCustomTracking504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.getCustomTracking")
      .annotate(OpenApi.Summary, "Get custom tracking status")
      .annotate(
        OpenApi.Description,
        "Returns the custom tracking state for a sending domain: lifecycle status, the required DNS records, certificate and CAA readiness, and any scheduled teardown. `enabled` is false when no custom tracking domain is provisioned.",
      ),
    HttpApiEndpoint.post("emailEnableCustomTracking", "/v1/email/domains/:id/custom-tracking", {
      params: EmailEnableCustomTrackingPathParams,
      payload: EmailEnableCustomTrackingRequestJson,
      success: EmailEnableCustomTracking200,
      error: [
        EmailEnableCustomTracking401.pipe(HttpApiSchema.status(401)),
        EmailEnableCustomTracking403.pipe(HttpApiSchema.status(403)),
        EmailEnableCustomTracking404.pipe(HttpApiSchema.status(404)),
        EmailEnableCustomTracking409.pipe(HttpApiSchema.status(409)),
        EmailEnableCustomTracking422.pipe(HttpApiSchema.status(422)),
        EmailEnableCustomTracking500,
        EmailEnableCustomTracking502.pipe(HttpApiSchema.status(502)),
        EmailEnableCustomTracking504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.enableCustomTracking")
      .annotate(OpenApi.Summary, "Enable a custom tracking domain")
      .annotate(
        OpenApi.Description,
        "Provisions a custom tracking domain for a verified sending domain so open/click links redirect through the customer's own host, `<label>.<parentDomain>` (default `track.<sending domain>`). `parentDomain` may be a parent of the sending domain, so `send.example.com` can use `track.example.com`. Calling it again with a different label or parent moves the host. Requires a plan that includes custom tracking domains. Returns the resulting state including the two DNS records the customer must create; a hostname another domain already uses is a conflict.",
      ),
    HttpApiEndpoint.delete("emailDisableCustomTracking", "/v1/email/domains/:id/custom-tracking", {
      params: EmailDisableCustomTrackingPathParams,
      success: EmailDisableCustomTracking200,
      error: [
        EmailDisableCustomTracking401.pipe(HttpApiSchema.status(401)),
        EmailDisableCustomTracking403.pipe(HttpApiSchema.status(403)),
        EmailDisableCustomTracking404.pipe(HttpApiSchema.status(404)),
        EmailDisableCustomTracking409.pipe(HttpApiSchema.status(409)),
        EmailDisableCustomTracking422.pipe(HttpApiSchema.status(422)),
        EmailDisableCustomTracking500,
        EmailDisableCustomTracking502.pipe(HttpApiSchema.status(502)),
        EmailDisableCustomTracking504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.disableCustomTracking")
      .annotate(OpenApi.Summary, "Disable a custom tracking domain")
      .annotate(
        OpenApi.Description,
        "Disables a domain's custom tracking, removes its managed resources, and immediately returns sends to the shared tracking host. Existing custom links in already-delivered mail stop working.",
      ),
    HttpApiEndpoint.get(
      "emailGetCustomTrackingDomainConnect",
      "/v1/email/domains/:id/custom-tracking/domain-connect",
      {
        params: EmailGetCustomTrackingDomainConnectPathParams,
        success: EmailGetCustomTrackingDomainConnect200,
        error: [
          EmailGetCustomTrackingDomainConnect401.pipe(HttpApiSchema.status(401)),
          EmailGetCustomTrackingDomainConnect403.pipe(HttpApiSchema.status(403)),
          EmailGetCustomTrackingDomainConnect404.pipe(HttpApiSchema.status(404)),
          EmailGetCustomTrackingDomainConnect422.pipe(HttpApiSchema.status(422)),
          EmailGetCustomTrackingDomainConnect500,
          EmailGetCustomTrackingDomainConnect504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.getCustomTrackingDomainConnect")
      .annotate(OpenApi.Summary, "Check automatic Custom Tracking Domain setup eligibility")
      .annotate(
        OpenApi.Description,
        "Reports whether the domain's DNS provider supports Domain Connect for its current Custom Tracking Domain. Ineligible is a normal result and the exact manual CNAME records remain available.",
      ),
    HttpApiEndpoint.post(
      "emailBuildCustomTrackingDomainConnectApplyUrl",
      "/v1/email/domains/:id/custom-tracking/domain-connect/apply-url",
      {
        params: EmailBuildCustomTrackingDomainConnectApplyUrlPathParams,
        success: EmailBuildCustomTrackingDomainConnectApplyUrl200,
        error: [
          EmailBuildCustomTrackingDomainConnectApplyUrl401.pipe(HttpApiSchema.status(401)),
          EmailBuildCustomTrackingDomainConnectApplyUrl403.pipe(HttpApiSchema.status(403)),
          EmailBuildCustomTrackingDomainConnectApplyUrl404.pipe(HttpApiSchema.status(404)),
          EmailBuildCustomTrackingDomainConnectApplyUrl409.pipe(HttpApiSchema.status(409)),
          EmailBuildCustomTrackingDomainConnectApplyUrl422.pipe(HttpApiSchema.status(422)),
          EmailBuildCustomTrackingDomainConnectApplyUrl500,
          EmailBuildCustomTrackingDomainConnectApplyUrl502.pipe(HttpApiSchema.status(502)),
          EmailBuildCustomTrackingDomainConnectApplyUrl504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.buildCustomTrackingDomainConnectApplyUrl")
      .annotate(OpenApi.Summary, "Build an automatic Custom Tracking Domain apply URL")
      .annotate(
        OpenApi.Description,
        "Builds the signed Domain Connect URL for the current customer-selected tracking host. Samva fills in the host and the certificate validation record; the manual CNAME records remain available.",
      ),
    HttpApiEndpoint.post(
      "emailCompleteCustomTrackingDomainConnect",
      "/v1/email/domains/:id/custom-tracking/domain-connect/complete",
      {
        params: EmailCompleteCustomTrackingDomainConnectPathParams,
        payload: EmailCompleteCustomTrackingDomainConnectRequestJson,
        success: EmailCompleteCustomTrackingDomainConnect200,
        error: [
          EmailCompleteCustomTrackingDomainConnect401.pipe(HttpApiSchema.status(401)),
          EmailCompleteCustomTrackingDomainConnect403.pipe(HttpApiSchema.status(403)),
          EmailCompleteCustomTrackingDomainConnect404.pipe(HttpApiSchema.status(404)),
          EmailCompleteCustomTrackingDomainConnect422.pipe(HttpApiSchema.status(422)),
          EmailCompleteCustomTrackingDomainConnect500,
          EmailCompleteCustomTrackingDomainConnect504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.completeCustomTrackingDomainConnect")
      .annotate(OpenApi.Summary, "Complete an automatic Custom Tracking Domain return")
      .annotate(
        OpenApi.Description,
        "Validates the signed state returned by the DNS provider, then checks the tracking host again. Returning here never marks the host ready or changes which tracking host email uses.",
      ),
    HttpApiEndpoint.post(
      "emailRecheckCustomTracking",
      "/v1/email/domains/:id/custom-tracking/recheck",
      {
        params: EmailRecheckCustomTrackingPathParams,
        success: EmailRecheckCustomTracking200,
        error: [
          EmailRecheckCustomTracking401.pipe(HttpApiSchema.status(401)),
          EmailRecheckCustomTracking403.pipe(HttpApiSchema.status(403)),
          EmailRecheckCustomTracking404.pipe(HttpApiSchema.status(404)),
          EmailRecheckCustomTracking409.pipe(HttpApiSchema.status(409)),
          EmailRecheckCustomTracking422.pipe(HttpApiSchema.status(422)),
          EmailRecheckCustomTracking500,
          EmailRecheckCustomTracking502.pipe(HttpApiSchema.status(502)),
          EmailRecheckCustomTracking504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.recheckCustomTracking")
      .annotate(OpenApi.Summary, "Recheck a custom tracking domain's certificate")
      .annotate(
        OpenApi.Description,
        "Checks the hostname's certificate now instead of waiting for the next scheduled check, and returns the refreshed state. Samva checks a hostname at most once every 30 seconds; a recheck inside that window returns the state from the last check. Returns a conflict when custom tracking is disabled or being torn down.",
      ),
    HttpApiEndpoint.post("emailSetDefaultDomain", "/v1/email/domains/:id/default", {
      params: EmailSetDefaultDomainPathParams,
      success: EmailSetDefaultDomain200,
      error: [
        EmailSetDefaultDomain401.pipe(HttpApiSchema.status(401)),
        EmailSetDefaultDomain403.pipe(HttpApiSchema.status(403)),
        EmailSetDefaultDomain404.pipe(HttpApiSchema.status(404)),
        EmailSetDefaultDomain422.pipe(HttpApiSchema.status(422)),
        EmailSetDefaultDomain500,
        EmailSetDefaultDomain504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.setDefaultDomain")
      .annotate(OpenApi.Summary, "Set the default sending domain")
      .annotate(
        OpenApi.Description,
        "Marks a verified domain as the organization's default sending domain, atomically clearing any previous default. Provisioning and inbound routing prefer the default domain when several apply. It does not choose the `from` of omitted-`from` sends; those use the organization default sender.",
      ),
    HttpApiEndpoint.post("emailDisableCatchAll", "/v1/email/domains/:id/disable-catch-all", {
      params: EmailDisableCatchAllPathParams,
      success: EmailDisableCatchAll200,
      error: [
        EmailDisableCatchAll401.pipe(HttpApiSchema.status(401)),
        EmailDisableCatchAll403.pipe(HttpApiSchema.status(403)),
        EmailDisableCatchAll404.pipe(HttpApiSchema.status(404)),
        EmailDisableCatchAll422.pipe(HttpApiSchema.status(422)),
        EmailDisableCatchAll500,
        EmailDisableCatchAll502.pipe(HttpApiSchema.status(502)),
        EmailDisableCatchAll504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.disableCatchAll")
      .annotate(OpenApi.Summary, "Disable catch-all receiving")
      .annotate(OpenApi.Description, "Disables catch-all inbound receiving for a domain."),
    HttpApiEndpoint.get("emailGetDomainConnect", "/v1/email/domains/:id/domain-connect", {
      params: EmailGetDomainConnectPathParams,
      query: EmailGetDomainConnectQuery,
      success: EmailGetDomainConnect200,
      error: [
        EmailGetDomainConnect401.pipe(HttpApiSchema.status(401)),
        EmailGetDomainConnect403.pipe(HttpApiSchema.status(403)),
        EmailGetDomainConnect404.pipe(HttpApiSchema.status(404)),
        EmailGetDomainConnect422.pipe(HttpApiSchema.status(422)),
        EmailGetDomainConnect500,
        EmailGetDomainConnect504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.getDomainConnect")
      .annotate(OpenApi.Summary, "Check one-click DNS eligibility")
      .annotate(
        OpenApi.Description,
        "Reports whether the domain's DNS provider supports Domain Connect one-click setup for Samva, and the provider's name when it does. Ineligible is a normal result — the manual DNS records remain the way to verify.",
      ),
    HttpApiEndpoint.post(
      "emailBuildDomainConnectApplyUrl",
      "/v1/email/domains/:id/domain-connect/apply-url",
      {
        params: EmailBuildDomainConnectApplyUrlPathParams,
        payload: EmailBuildDomainConnectApplyUrlRequestJson,
        success: EmailBuildDomainConnectApplyUrl200,
        error: [
          EmailBuildDomainConnectApplyUrl401.pipe(HttpApiSchema.status(401)),
          EmailBuildDomainConnectApplyUrl403.pipe(HttpApiSchema.status(403)),
          EmailBuildDomainConnectApplyUrl404.pipe(HttpApiSchema.status(404)),
          EmailBuildDomainConnectApplyUrl409.pipe(HttpApiSchema.status(409)),
          EmailBuildDomainConnectApplyUrl422.pipe(HttpApiSchema.status(422)),
          EmailBuildDomainConnectApplyUrl500,
          EmailBuildDomainConnectApplyUrl502.pipe(HttpApiSchema.status(502)),
          EmailBuildDomainConnectApplyUrl504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.buildDomainConnectApplyUrl")
      .annotate(OpenApi.Summary, "Build a one-click DNS apply URL")
      .annotate(
        OpenApi.Description,
        "Builds the signed Domain Connect apply URL for the selected sending-only or sending-and-receiving service. The sending-and-receiving service writes the apex inbound MX, so it is refused until the domain's receiving is enabled. Manual DNS remains available for either mode.",
      ),
    HttpApiEndpoint.post(
      "emailCompleteDomainConnect",
      "/v1/email/domains/:id/domain-connect/complete",
      {
        params: EmailCompleteDomainConnectPathParams,
        payload: EmailCompleteDomainConnectRequestJson,
        success: EmailCompleteDomainConnect200,
        error: [
          EmailCompleteDomainConnect401.pipe(HttpApiSchema.status(401)),
          EmailCompleteDomainConnect403.pipe(HttpApiSchema.status(403)),
          EmailCompleteDomainConnect404.pipe(HttpApiSchema.status(404)),
          EmailCompleteDomainConnect422.pipe(HttpApiSchema.status(422)),
          EmailCompleteDomainConnect500,
          EmailCompleteDomainConnect502.pipe(HttpApiSchema.status(502)),
          EmailCompleteDomainConnect504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.completeDomainConnect")
      .annotate(OpenApi.Summary, "Complete a one-click DNS return")
      .annotate(
        OpenApi.Description,
        "Consumes the Domain Connect provider's redirect. Validates the signed state and, when the DNS provider reports success, starts checking the domain's records. A DNS provider error is reported separately from a customer cancelling setup.",
      ),
    HttpApiEndpoint.post("emailEnableCatchAll", "/v1/email/domains/:id/enable-catch-all", {
      params: EmailEnableCatchAllPathParams,
      payload: EmailEnableCatchAllRequestJson,
      success: EmailEnableCatchAll201.pipe(HttpApiSchema.status(201)),
      error: [
        EmailEnableCatchAll401.pipe(HttpApiSchema.status(401)),
        EmailEnableCatchAll403.pipe(HttpApiSchema.status(403)),
        EmailEnableCatchAll404.pipe(HttpApiSchema.status(404)),
        EmailEnableCatchAll422.pipe(HttpApiSchema.status(422)),
        EmailEnableCatchAll500,
        EmailEnableCatchAll502.pipe(HttpApiSchema.status(502)),
        EmailEnableCatchAll504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.enableCatchAll")
      .annotate(OpenApi.Summary, "Enable catch-all receiving")
      .annotate(
        OpenApi.Description,
        "Enables catch-all inbound receiving for a verified domain. `endpointId` is one of the organization's webhook endpoints; every address on the domain delivers `message.received` to it. Omit it to deliver through forwarding rules alone, which needs at least one active forwarding rule covering the domain. Mail that matches neither a rule nor an endpoint is rejected as an unknown recipient. Responds with 201.",
      ),
    HttpApiEndpoint.post("emailEnableReceiving", "/v1/email/domains/:id/enable-receiving", {
      params: EmailEnableReceivingPathParams,
      payload: EmailEnableReceivingRequestJson,
      success: EmailEnableReceiving200,
      error: [
        EmailEnableReceiving401.pipe(HttpApiSchema.status(401)),
        EmailEnableReceiving403.pipe(HttpApiSchema.status(403)),
        EmailEnableReceiving404.pipe(HttpApiSchema.status(404)),
        EmailEnableReceiving422.pipe(HttpApiSchema.status(422)),
        EmailEnableReceiving500,
        EmailEnableReceiving504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.enableReceiving")
      .annotate(OpenApi.Summary, "Enable inbound email for a domain")
      .annotate(
        OpenApi.Description,
        "Enables inbound receiving for a verified domain and returns the recipient addresses it accepts. Set `catchAll` to route every address on the domain; that needs a destination: a webhook endpoint, supplied as `endpointId` or already configured on the domain, or at least one active forwarding rule that covers the domain. Mail that matches neither is rejected, never accepted and dropped.",
      ),
    HttpApiEndpoint.get("emailGetReceivingStatus", "/v1/email/domains/:id/receiving-status", {
      params: EmailGetReceivingStatusPathParams,
      success: EmailGetReceivingStatus200,
      error: [
        EmailGetReceivingStatus401.pipe(HttpApiSchema.status(401)),
        EmailGetReceivingStatus403.pipe(HttpApiSchema.status(403)),
        EmailGetReceivingStatus404.pipe(HttpApiSchema.status(404)),
        EmailGetReceivingStatus422.pipe(HttpApiSchema.status(422)),
        EmailGetReceivingStatus500,
        EmailGetReceivingStatus504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.getReceivingStatus")
      .annotate(OpenApi.Summary, "Get receiving setup status")
      .annotate(
        OpenApi.Description,
        "Reports each prerequisite for receiving a domain's mail at Samva, in order: sending verified, a destination (a webhook endpoint or an active forwarding rule), receiving enabled, and the inbound MX record. The MX answer is a live DNS lookup that names the current target when mail is routed elsewhere.",
      ),
    HttpApiEndpoint.post("emailDetectRegistrar", "/v1/email/domains/:id/registrar", {
      params: EmailDetectRegistrarPathParams,
      payload: EmailDetectRegistrarRequestJson,
      success: EmailDetectRegistrar200,
      error: [
        EmailDetectRegistrar401.pipe(HttpApiSchema.status(401)),
        EmailDetectRegistrar403.pipe(HttpApiSchema.status(403)),
        EmailDetectRegistrar404.pipe(HttpApiSchema.status(404)),
        EmailDetectRegistrar422.pipe(HttpApiSchema.status(422)),
        EmailDetectRegistrar500,
        EmailDetectRegistrar504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.detectRegistrar")
      .annotate(OpenApi.Summary, "Detect a domain's registrar")
      .annotate(
        OpenApi.Description,
        "Looks up the domain's nameservers to detect its DNS registrar and returns the provider, nameservers, and a link to its setup docs.",
      ),
    HttpApiEndpoint.post("emailRotateDomainDkim", "/v1/email/domains/:id/rotate-dkim", {
      params: EmailRotateDomainDkimPathParams,
      headers: EmailRotateDomainDkimHeaders,
      success: EmailRotateDomainDkim200,
      error: [
        EmailRotateDomainDkim401.pipe(HttpApiSchema.status(401)),
        EmailRotateDomainDkim403.pipe(HttpApiSchema.status(403)),
        EmailRotateDomainDkim404.pipe(HttpApiSchema.status(404)),
        EmailRotateDomainDkim409.pipe(HttpApiSchema.status(409)),
        EmailRotateDomainDkim422.pipe(HttpApiSchema.status(422)),
        EmailRotateDomainDkim500,
        EmailRotateDomainDkim502.pipe(HttpApiSchema.status(502)),
        EmailRotateDomainDkim504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.rotateDomainDkim")
      .annotate(OpenApi.Summary, "Stage a DKIM selector rotation")
      .annotate(
        OpenApi.Description,
        "Creates a new DKIM signing key and returns its public DKIM record. Publish it, then advance domain verification to switch signing to the new key. Keep the former record published at least until `minimumRetainUntil`.",
      ),
    HttpApiEndpoint.get("emailGetDomainVerification", "/v1/email/domains/:id/verification", {
      params: EmailGetDomainVerificationPathParams,
      success: EmailGetDomainVerification200,
      error: [
        EmailGetDomainVerification401.pipe(HttpApiSchema.status(401)),
        EmailGetDomainVerification403.pipe(HttpApiSchema.status(403)),
        EmailGetDomainVerification404.pipe(HttpApiSchema.status(404)),
        EmailGetDomainVerification422.pipe(HttpApiSchema.status(422)),
        EmailGetDomainVerification500,
        EmailGetDomainVerification504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.getDomainVerification")
      .annotate(OpenApi.Summary, "Get domain verification")
      .annotate(
        OpenApi.Description,
        "Returns the domain's last observed DNS and verification state. Reading it does not check DNS again or change anything; use advance to check now.",
      ),
    HttpApiEndpoint.post("emailAdvanceDomainVerification", "/v1/email/domains/:id/verify", {
      params: EmailAdvanceDomainVerificationPathParams,
      success: EmailAdvanceDomainVerification200,
      error: [
        EmailAdvanceDomainVerification401.pipe(HttpApiSchema.status(401)),
        EmailAdvanceDomainVerification403.pipe(HttpApiSchema.status(403)),
        EmailAdvanceDomainVerification404.pipe(HttpApiSchema.status(404)),
        EmailAdvanceDomainVerification409.pipe(HttpApiSchema.status(409)),
        EmailAdvanceDomainVerification422.pipe(HttpApiSchema.status(422)),
        EmailAdvanceDomainVerification429.pipe(HttpApiSchema.status(429)),
        EmailAdvanceDomainVerification500,
        EmailAdvanceDomainVerification502.pipe(HttpApiSchema.status(502)),
        EmailAdvanceDomainVerification504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.advanceDomainVerification")
      .annotate(OpenApi.Summary, "Advance domain verification")
      .annotate(
        OpenApi.Description,
        "Checks the required DNS records now and, once they all match, moves the domain toward verified. Safe to call repeatedly.",
      ),
    HttpApiEndpoint.get("emailGetDomainWarming", "/v1/email/domains/:id/warming", {
      params: EmailGetDomainWarmingPathParams,
      success: EmailGetDomainWarming200,
      error: [
        EmailGetDomainWarming401.pipe(HttpApiSchema.status(401)),
        EmailGetDomainWarming403.pipe(HttpApiSchema.status(403)),
        EmailGetDomainWarming404.pipe(HttpApiSchema.status(404)),
        EmailGetDomainWarming422.pipe(HttpApiSchema.status(422)),
        EmailGetDomainWarming500,
        EmailGetDomainWarming504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.getDomainWarming")
      .annotate(OpenApi.Summary, "Get domain warming")
      .annotate(
        OpenApi.Description,
        "Returns the domain's automated warming policy, its system-created 24-hour windows and policy snapshots, the rolling bounce and complaint window the safety rule reads, every pause above the plan, and the decision history. A domain without a plan returns the evidence and a null plan.",
      ),
    HttpApiEndpoint.post("emailCreateDomainWarmingPlan", "/v1/email/domains/:id/warming", {
      params: EmailCreateDomainWarmingPlanPathParams,
      payload: EmailCreateDomainWarmingPlanRequestJson,
      success: EmailCreateDomainWarmingPlan201.pipe(HttpApiSchema.status(201)),
      error: [
        EmailCreateDomainWarmingPlan401.pipe(HttpApiSchema.status(401)),
        EmailCreateDomainWarmingPlan403.pipe(HttpApiSchema.status(403)),
        EmailCreateDomainWarmingPlan404.pipe(HttpApiSchema.status(404)),
        EmailCreateDomainWarmingPlan409.pipe(HttpApiSchema.status(409)),
        EmailCreateDomainWarmingPlan422.pipe(HttpApiSchema.status(422)),
        EmailCreateDomainWarmingPlan500,
        EmailCreateDomainWarmingPlan504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.createDomainWarmingPlan")
      .annotate(OpenApi.Summary, "Start domain warming")
      .annotate(
        OpenApi.Description,
        "Starts an automated warming policy on a verified sending domain. Samva opens the first 24-hour campaign window immediately, then opens later windows from the saved growth policy after safe windows close. Direct sends are counted in the domain's window but never delayed. Responds with 201.",
      ),
    HttpApiEndpoint.delete(
      "emailCancelDomainWarmingBatch",
      "/v1/email/domains/:id/warming/batches/:batchId",
      {
        params: EmailCancelDomainWarmingBatchPathParams,
        success: EmailCancelDomainWarmingBatch200,
        error: [
          EmailCancelDomainWarmingBatch401.pipe(HttpApiSchema.status(401)),
          EmailCancelDomainWarmingBatch403.pipe(HttpApiSchema.status(403)),
          EmailCancelDomainWarmingBatch404.pipe(HttpApiSchema.status(404)),
          EmailCancelDomainWarmingBatch409.pipe(HttpApiSchema.status(409)),
          EmailCancelDomainWarmingBatch422.pipe(HttpApiSchema.status(422)),
          EmailCancelDomainWarmingBatch500,
          EmailCancelDomainWarmingBatch504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.cancelDomainWarmingBatch")
      .annotate(OpenApi.Summary, "Cancel a warming window")
      .annotate(
        OpenApi.Description,
        "Cancels a scheduled or open system-created warming window. Recipients a campaign run already reserved from it stay reserved; no further runs draw from it.",
      ),
    HttpApiEndpoint.post("emailCompleteDomainWarming", "/v1/email/domains/:id/warming/complete", {
      params: EmailCompleteDomainWarmingPathParams,
      payload: EmailCompleteDomainWarmingRequestJson,
      success: EmailCompleteDomainWarming200,
      error: [
        EmailCompleteDomainWarming401.pipe(HttpApiSchema.status(401)),
        EmailCompleteDomainWarming403.pipe(HttpApiSchema.status(403)),
        EmailCompleteDomainWarming404.pipe(HttpApiSchema.status(404)),
        EmailCompleteDomainWarming409.pipe(HttpApiSchema.status(409)),
        EmailCompleteDomainWarming422.pipe(HttpApiSchema.status(422)),
        EmailCompleteDomainWarming500,
        EmailCompleteDomainWarming504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.completeDomainWarming")
      .annotate(OpenApi.Summary, "Complete domain warming")
      .annotate(
        OpenApi.Description,
        "Ends the policy. Campaign runs from the domain are no longer gated by warming windows; the organization safeguards still apply.",
      ),
    HttpApiEndpoint.post("emailPauseDomainWarming", "/v1/email/domains/:id/warming/pause", {
      params: EmailPauseDomainWarmingPathParams,
      payload: EmailPauseDomainWarmingRequestJson,
      success: EmailPauseDomainWarming200,
      error: [
        EmailPauseDomainWarming401.pipe(HttpApiSchema.status(401)),
        EmailPauseDomainWarming403.pipe(HttpApiSchema.status(403)),
        EmailPauseDomainWarming404.pipe(HttpApiSchema.status(404)),
        EmailPauseDomainWarming409.pipe(HttpApiSchema.status(409)),
        EmailPauseDomainWarming422.pipe(HttpApiSchema.status(422)),
        EmailPauseDomainWarming500,
        EmailPauseDomainWarming504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.pauseDomainWarming")
      .annotate(OpenApi.Summary, "Pause domain warming")
      .annotate(
        OpenApi.Description,
        "Pauses the plan. Campaign runs from the domain stop at their next page and queued campaign email waits until it expires; direct sends are unaffected.",
      ),
    HttpApiEndpoint.patch(
      "emailUpdateDomainWarmingPolicy",
      "/v1/email/domains/:id/warming/policy",
      {
        params: EmailUpdateDomainWarmingPolicyPathParams,
        payload: EmailUpdateDomainWarmingPolicyRequestJson,
        success: EmailUpdateDomainWarmingPolicy200,
        error: [
          EmailUpdateDomainWarmingPolicy401.pipe(HttpApiSchema.status(401)),
          EmailUpdateDomainWarmingPolicy403.pipe(HttpApiSchema.status(403)),
          EmailUpdateDomainWarmingPolicy404.pipe(HttpApiSchema.status(404)),
          EmailUpdateDomainWarmingPolicy409.pipe(HttpApiSchema.status(409)),
          EmailUpdateDomainWarmingPolicy422.pipe(HttpApiSchema.status(422)),
          EmailUpdateDomainWarmingPolicy500,
          EmailUpdateDomainWarmingPolicy504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.updateDomainWarmingPolicy")
      .annotate(OpenApi.Summary, "Update domain warming policy")
      .annotate(
        OpenApi.Description,
        "Updates the growth percentage and daily target Samva uses for future 24-hour warming windows. Existing windows keep their policy snapshot, including a scheduled window, so prior authorization remains auditable.",
      ),
    HttpApiEndpoint.post("emailResumeDomainWarming", "/v1/email/domains/:id/warming/resume", {
      params: EmailResumeDomainWarmingPathParams,
      payload: EmailResumeDomainWarmingRequestJson,
      success: EmailResumeDomainWarming200,
      error: [
        EmailResumeDomainWarming401.pipe(HttpApiSchema.status(401)),
        EmailResumeDomainWarming403.pipe(HttpApiSchema.status(403)),
        EmailResumeDomainWarming404.pipe(HttpApiSchema.status(404)),
        EmailResumeDomainWarming409.pipe(HttpApiSchema.status(409)),
        EmailResumeDomainWarming422.pipe(HttpApiSchema.status(422)),
        EmailResumeDomainWarming500,
        EmailResumeDomainWarming504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.resumeDomainWarming")
      .annotate(OpenApi.Summary, "Resume domain warming")
      .annotate(
        OpenApi.Description,
        "Resumes a paused or held plan and the campaign runs it was holding. A plan the domain rule held resumes only once the domain's rolling window is under both limits again; until then the request is refused with the observed rate.",
      ),
    HttpApiEndpoint.get("emailListForwardingRules", "/v1/email/forwarding", {
      query: EmailListForwardingRulesQuery,
      success: EmailListForwardingRules200,
      error: [
        EmailListForwardingRules401.pipe(HttpApiSchema.status(401)),
        EmailListForwardingRules403.pipe(HttpApiSchema.status(403)),
        EmailListForwardingRules422.pipe(HttpApiSchema.status(422)),
        EmailListForwardingRules500,
        EmailListForwardingRules504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.listForwardingRules")
      .annotate(OpenApi.Summary, "List forwarding rules")
      .annotate(
        OpenApi.Description,
        "Returns every inbound email forwarding rule in the order inbound mail is matched against them: highest priority first, then an exact address before a wildcard pattern at equal priority, then oldest first. The first rule that matches is the one that forwards. Filtering by domain returns that domain's rules and the rules that apply to every domain (domainId null). An organization holds at most 100, so the list is never paged.",
      ),
    HttpApiEndpoint.post("emailCreateForwardingRule", "/v1/email/forwarding", {
      payload: EmailCreateForwardingRuleRequestJson,
      success: EmailCreateForwardingRule201.pipe(HttpApiSchema.status(201)),
      error: [
        EmailCreateForwardingRule401.pipe(HttpApiSchema.status(401)),
        EmailCreateForwardingRule403.pipe(HttpApiSchema.status(403)),
        EmailCreateForwardingRule404.pipe(HttpApiSchema.status(404)),
        EmailCreateForwardingRule409.pipe(HttpApiSchema.status(409)),
        EmailCreateForwardingRule422.pipe(HttpApiSchema.status(422)),
        EmailCreateForwardingRule500,
        EmailCreateForwardingRule504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.createForwardingRule")
      .annotate(OpenApi.Summary, "Create a forwarding rule")
      .annotate(
        OpenApi.Description,
        "Creates an inbound email forwarding rule and returns it. Responds with 201. Priority is a non-negative integer, default 0; higher priority rules are tried first, and at equal priority an exact address outranks a wildcard pattern. An organization holds at most 100 forwarding rules.",
      ),
    HttpApiEndpoint.delete("emailDeleteForwardingRule", "/v1/email/forwarding/:id", {
      params: EmailDeleteForwardingRulePathParams,
      success: EmailDeleteForwardingRule200,
      error: [
        EmailDeleteForwardingRule401.pipe(HttpApiSchema.status(401)),
        EmailDeleteForwardingRule403.pipe(HttpApiSchema.status(403)),
        EmailDeleteForwardingRule404.pipe(HttpApiSchema.status(404)),
        EmailDeleteForwardingRule422.pipe(HttpApiSchema.status(422)),
        EmailDeleteForwardingRule500,
        EmailDeleteForwardingRule504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.deleteForwardingRule")
      .annotate(OpenApi.Summary, "Delete a forwarding rule")
      .annotate(OpenApi.Description, "Permanently deletes an inbound email forwarding rule."),
    HttpApiEndpoint.patch("emailUpdateForwardingRule", "/v1/email/forwarding/:id", {
      params: EmailUpdateForwardingRulePathParams,
      payload: EmailUpdateForwardingRuleRequestJson,
      success: EmailUpdateForwardingRule200,
      error: [
        EmailUpdateForwardingRule401.pipe(HttpApiSchema.status(401)),
        EmailUpdateForwardingRule403.pipe(HttpApiSchema.status(403)),
        EmailUpdateForwardingRule404.pipe(HttpApiSchema.status(404)),
        EmailUpdateForwardingRule422.pipe(HttpApiSchema.status(422)),
        EmailUpdateForwardingRule500,
        EmailUpdateForwardingRule504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.updateForwardingRule")
      .annotate(OpenApi.Summary, "Update a forwarding rule")
      .annotate(
        OpenApi.Description,
        "Updates an inbound email forwarding rule and returns its current summary.",
      ),
    HttpApiEndpoint.get("emailGetForwardingLog", "/v1/email/forwarding/logs", {
      query: EmailGetForwardingLogQuery,
      success: EmailGetForwardingLog200,
      error: [
        EmailGetForwardingLog401.pipe(HttpApiSchema.status(401)),
        EmailGetForwardingLog403.pipe(HttpApiSchema.status(403)),
        EmailGetForwardingLog422.pipe(HttpApiSchema.status(422)),
        EmailGetForwardingLog500,
        EmailGetForwardingLog504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.getForwardingLog")
      .annotate(OpenApi.Summary, "List email forwarding logs")
      .annotate(
        OpenApi.Description,
        "Returns forwarded inbound emails with their delivery outcomes, newest first, optionally filtered by rule, status, or creation time (`after`, `before`). Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.get("emailGetOnboardingReview", "/v1/email/onboarding-review", {
      success: EmailGetOnboardingReview200,
      error: [
        EmailGetOnboardingReview401.pipe(HttpApiSchema.status(401)),
        EmailGetOnboardingReview403.pipe(HttpApiSchema.status(403)),
        EmailGetOnboardingReview422.pipe(HttpApiSchema.status(422)),
        EmailGetOnboardingReview500,
        EmailGetOnboardingReview504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.getOnboardingReview")
      .annotate(OpenApi.Summary, "Get email onboarding review status")
      .annotate(
        OpenApi.Description,
        "Returns the customer-safe organization review decision, workflow stage, next action, and current sending-identity clearances. An organization that has not been reviewed yet is returned in the blocked initial state.",
      ),
    HttpApiEndpoint.post("emailReapplyOnboardingReview", "/v1/email/onboarding-review/reapply", {
      payload: EmailReapplyOnboardingReviewRequestJson,
      success: EmailReapplyOnboardingReview200,
      error: [
        EmailReapplyOnboardingReview401.pipe(HttpApiSchema.status(401)),
        EmailReapplyOnboardingReview403.pipe(HttpApiSchema.status(403)),
        EmailReapplyOnboardingReview409.pipe(HttpApiSchema.status(409)),
        EmailReapplyOnboardingReview422.pipe(HttpApiSchema.status(422)),
        EmailReapplyOnboardingReview500,
        EmailReapplyOnboardingReview504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.reapplyOnboardingReview")
      .annotate(OpenApi.Summary, "Reapply for email onboarding review")
      .annotate(
        OpenApi.Description,
        "Allows an organization owner or admin to submit a rejected organization for review again. The expected generation prevents acting on stale status.",
      ),
    HttpApiEndpoint.post(
      "emailRespondToOnboardingInformationRequest",
      "/v1/email/onboarding-review/respond",
      {
        payload: EmailRespondToOnboardingInformationRequestRequestJson,
        success: EmailRespondToOnboardingInformationRequest200,
        error: [
          EmailRespondToOnboardingInformationRequest401.pipe(HttpApiSchema.status(401)),
          EmailRespondToOnboardingInformationRequest403.pipe(HttpApiSchema.status(403)),
          EmailRespondToOnboardingInformationRequest409.pipe(HttpApiSchema.status(409)),
          EmailRespondToOnboardingInformationRequest422.pipe(HttpApiSchema.status(422)),
          EmailRespondToOnboardingInformationRequest500,
          EmailRespondToOnboardingInformationRequest504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.respondToOnboardingInformationRequest")
      .annotate(OpenApi.Summary, "Respond to an email onboarding information request")
      .annotate(
        OpenApi.Description,
        "Allows organization owners and admins to submit a text response and up to three evidence uploads for the current information request.",
      ),
    HttpApiEndpoint.get("emailListSenders", "/v1/email/senders", {
      query: EmailListSendersQuery,
      success: EmailListSenders200,
      error: [
        EmailListSenders401.pipe(HttpApiSchema.status(401)),
        EmailListSenders403.pipe(HttpApiSchema.status(403)),
        EmailListSenders422.pipe(HttpApiSchema.status(422)),
        EmailListSenders500,
        EmailListSenders504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.listSenders")
      .annotate(OpenApi.Summary, "List senders")
      .annotate(
        OpenApi.Description,
        "Returns senders, newest first. A namespace-scoped key lists only its namespace's senders; an organization-wide caller lists every sender, or one namespace's with `namespaceId`. Optionally filtered by verification status, active state, or default flag. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page. Each row carries `deliverability` (bounce and complaint rates over the last 24 hours) and `series`, the last 14 days of daily email sends from the address, oldest first.",
      ),
    HttpApiEndpoint.post("emailAddSender", "/v1/email/senders", {
      headers: EmailAddSenderHeaders,
      payload: EmailAddSenderRequestJson,
      success: EmailAddSender201.pipe(HttpApiSchema.status(201)),
      error: [
        EmailAddSender401.pipe(HttpApiSchema.status(401)),
        EmailAddSender403.pipe(HttpApiSchema.status(403)),
        EmailAddSender404.pipe(HttpApiSchema.status(404)),
        EmailAddSender409.pipe(HttpApiSchema.status(409)),
        EmailAddSender422.pipe(HttpApiSchema.status(422)),
        EmailAddSender500,
        EmailAddSender502.pipe(HttpApiSchema.status(502)),
        EmailAddSender504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.addSender")
      .annotate(OpenApi.Summary, "Add a sender")
      .annotate(
        OpenApi.Description,
        "Creates a sender. A sender on a domain takes the domain's namespace, and a `namespaceId` that names another namespace is refused; a sender with no domain joins `namespaceId`, or its key's namespace. A namespace-scoped key cannot add a sender on a domain outside its namespace. The required Idempotency-Key replays the original sender for an identical request and conflicts when reused with different input.",
      ),
    HttpApiEndpoint.get("emailGetSender", "/v1/email/senders/:id", {
      params: EmailGetSenderPathParams,
      success: EmailGetSender200,
      error: [
        EmailGetSender401.pipe(HttpApiSchema.status(401)),
        EmailGetSender403.pipe(HttpApiSchema.status(403)),
        EmailGetSender404.pipe(HttpApiSchema.status(404)),
        EmailGetSender422.pipe(HttpApiSchema.status(422)),
        EmailGetSender500,
        EmailGetSender504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.getSender")
      .annotate(OpenApi.Summary, "Get a sender")
      .annotate(
        OpenApi.Description,
        "Returns one sender owned by the authenticated organization. Other organizations' ids are reported as not found.",
      ),
    HttpApiEndpoint.delete("emailRemoveSender", "/v1/email/senders/:id", {
      params: EmailRemoveSenderPathParams,
      success: EmailRemoveSender200,
      error: [
        EmailRemoveSender401.pipe(HttpApiSchema.status(401)),
        EmailRemoveSender403.pipe(HttpApiSchema.status(403)),
        EmailRemoveSender404.pipe(HttpApiSchema.status(404)),
        EmailRemoveSender422.pipe(HttpApiSchema.status(422)),
        EmailRemoveSender500,
        EmailRemoveSender504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.removeSender")
      .annotate(OpenApi.Summary, "Remove a sender")
      .annotate(
        OpenApi.Description,
        "Accepts sender removal and marks the sender inactive. A default sender can be removed when no other active sender remains in the organization. It reports the `deleting` lifecycle until removal finishes.",
      ),
    HttpApiEndpoint.post("emailSetDefaultSender", "/v1/email/senders/:id/default", {
      params: EmailSetDefaultSenderPathParams,
      success: EmailSetDefaultSender200,
      error: [
        EmailSetDefaultSender401.pipe(HttpApiSchema.status(401)),
        EmailSetDefaultSender403.pipe(HttpApiSchema.status(403)),
        EmailSetDefaultSender404.pipe(HttpApiSchema.status(404)),
        EmailSetDefaultSender422.pipe(HttpApiSchema.status(422)),
        EmailSetDefaultSender500,
        EmailSetDefaultSender504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.setDefaultSender")
      .annotate(OpenApi.Summary, "Set the default sender")
      .annotate(
        OpenApi.Description,
        "Marks a verified, active sender as the default of its scope, atomically clearing the previous default of the same scope: the organization level, or the sender's namespace. Omitted-`from` sends use it when neither the request nor the template names a `from`; with no default, the organization's sole verified sender is used.",
      ),
    HttpApiEndpoint.get("emailCheckSenderVerification", "/v1/email/senders/:id/verification", {
      params: EmailCheckSenderVerificationPathParams,
      success: EmailCheckSenderVerification200,
      error: [
        EmailCheckSenderVerification401.pipe(HttpApiSchema.status(401)),
        EmailCheckSenderVerification403.pipe(HttpApiSchema.status(403)),
        EmailCheckSenderVerification404.pipe(HttpApiSchema.status(404)),
        EmailCheckSenderVerification422.pipe(HttpApiSchema.status(422)),
        EmailCheckSenderVerification500,
        EmailCheckSenderVerification502.pipe(HttpApiSchema.status(502)),
        EmailCheckSenderVerification504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.checkSenderVerification")
      .annotate(OpenApi.Summary, "Check sender verification status")
      .annotate(OpenApi.Description, "Returns the current verification status of a sender."),
    HttpApiEndpoint.get("emailGetStats", "/v1/email/stats", {
      query: EmailGetStatsQuery,
      success: EmailGetStats200,
      error: [
        EmailGetStats401.pipe(HttpApiSchema.status(401)),
        EmailGetStats403.pipe(HttpApiSchema.status(403)),
        EmailGetStats422.pipe(HttpApiSchema.status(422)),
        EmailGetStats500,
        EmailGetStats504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.getStats")
      .annotate(OpenApi.Summary, "Get email statistics")
      .annotate(
        OpenApi.Description,
        "Returns aggregate email statistics — sent, delivered, bounced, and complained counts with their rates — optionally scoped to messages created from `after` (inclusive) to `before` (exclusive).",
      ),
    HttpApiEndpoint.get("emailListSuppressions", "/v1/email/suppressions", {
      query: EmailListSuppressionsQuery,
      success: EmailListSuppressions200,
      error: [
        EmailListSuppressions401.pipe(HttpApiSchema.status(401)),
        EmailListSuppressions403.pipe(HttpApiSchema.status(403)),
        EmailListSuppressions422.pipe(HttpApiSchema.status(422)),
        EmailListSuppressions500,
        EmailListSuppressions504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.listSuppressions")
      .annotate(OpenApi.Summary, "List suppressed addresses")
      .annotate(
        OpenApi.Description,
        "Returns the addresses this organization will not send to, newest first, optionally filtered by suppression type, active or expired state, and an address substring. Pass `nextCursor` back as `cursor` for the next page; it is null on the last page.",
      ),
    HttpApiEndpoint.delete("emailRemoveSuppression", "/v1/email/suppressions/:id", {
      params: EmailRemoveSuppressionPathParams,
      success: EmailRemoveSuppression200,
      error: [
        EmailRemoveSuppression401.pipe(HttpApiSchema.status(401)),
        EmailRemoveSuppression403.pipe(HttpApiSchema.status(403)),
        EmailRemoveSuppression404.pipe(HttpApiSchema.status(404)),
        EmailRemoveSuppression422.pipe(HttpApiSchema.status(422)),
        EmailRemoveSuppression500,
        EmailRemoveSuppression502.pipe(HttpApiSchema.status(502)),
        EmailRemoveSuppression504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.removeSuppression")
      .annotate(OpenApi.Summary, "Remove a suppressed address")
      .annotate(
        OpenApi.Description,
        "Deletes a suppression so this organization can send to the address again. If the deletion cannot complete, it fails rather than reporting success, and it is safe to retry. Deliverability caveat: a bounce or complaint suppression records a real delivery failure, and sending to the address again risks the reputation damage the suppression prevented.",
      ),
    HttpApiEndpoint.get("emailCountSuppressions", "/v1/email/suppressions/counts", {
      success: EmailCountSuppressions200,
      error: [
        EmailCountSuppressions401.pipe(HttpApiSchema.status(401)),
        EmailCountSuppressions403.pipe(HttpApiSchema.status(403)),
        EmailCountSuppressions422.pipe(HttpApiSchema.status(422)),
        EmailCountSuppressions500,
        EmailCountSuppressions504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.countSuppressions")
      .annotate(OpenApi.Summary, "Count suppressed addresses")
      .annotate(
        OpenApi.Description,
        "Returns how many addresses this organization will not send to now, by suppression type. Expired suppressions are not counted.",
      ),
    HttpApiEndpoint.get("emailGetTrackingDefaults", "/v1/email/tracking/defaults", {
      success: EmailGetTrackingDefaults200,
      error: [
        EmailGetTrackingDefaults401.pipe(HttpApiSchema.status(401)),
        EmailGetTrackingDefaults403.pipe(HttpApiSchema.status(403)),
        EmailGetTrackingDefaults404.pipe(HttpApiSchema.status(404)),
        EmailGetTrackingDefaults422.pipe(HttpApiSchema.status(422)),
        EmailGetTrackingDefaults500,
        EmailGetTrackingDefaults504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.getTrackingDefaults")
      .annotate(OpenApi.Summary, "Get email tracking defaults")
      .annotate(
        OpenApi.Description,
        "Returns the organization's independent defaults for open and click tracking, both enabled unless configured otherwise. Recipient opt-out takes precedence over these defaults.",
      ),
    HttpApiEndpoint.patch("emailUpdateTrackingDefaults", "/v1/email/tracking/defaults", {
      payload: EmailUpdateTrackingDefaultsRequestJson,
      success: EmailUpdateTrackingDefaults200,
      error: [
        EmailUpdateTrackingDefaults401.pipe(HttpApiSchema.status(401)),
        EmailUpdateTrackingDefaults403.pipe(HttpApiSchema.status(403)),
        EmailUpdateTrackingDefaults404.pipe(HttpApiSchema.status(404)),
        EmailUpdateTrackingDefaults422.pipe(HttpApiSchema.status(422)),
        EmailUpdateTrackingDefaults500,
        EmailUpdateTrackingDefaults504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.updateTrackingDefaults")
      .annotate(OpenApi.Summary, "Update email tracking defaults")
      .annotate(
        OpenApi.Description,
        "Updates one or both organization email tracking defaults and returns the complete saved policy. Recipient opt-out still takes precedence.",
      ),
    HttpApiEndpoint.get("emailGetRecipientTrackingPreference", "/v1/email/tracking/recipients", {
      query: EmailGetRecipientTrackingPreferenceQuery,
      success: EmailGetRecipientTrackingPreference200,
      error: [
        EmailGetRecipientTrackingPreference401.pipe(HttpApiSchema.status(401)),
        EmailGetRecipientTrackingPreference403.pipe(HttpApiSchema.status(403)),
        EmailGetRecipientTrackingPreference422.pipe(HttpApiSchema.status(422)),
        EmailGetRecipientTrackingPreference500,
        EmailGetRecipientTrackingPreference504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.getRecipientTrackingPreference")
      .annotate(OpenApi.Summary, "Get a recipient tracking preference")
      .annotate(
        OpenApi.Description,
        "Returns the organization-scoped tracking opt-out for a normalized recipient email. A missing preference reads as opted in and is not created.",
      ),
    HttpApiEndpoint.patch(
      "emailUpdateRecipientTrackingPreference",
      "/v1/email/tracking/recipients",
      {
        payload: EmailUpdateRecipientTrackingPreferenceRequestJson,
        success: EmailUpdateRecipientTrackingPreference200,
        error: [
          EmailUpdateRecipientTrackingPreference401.pipe(HttpApiSchema.status(401)),
          EmailUpdateRecipientTrackingPreference403.pipe(HttpApiSchema.status(403)),
          EmailUpdateRecipientTrackingPreference422.pipe(HttpApiSchema.status(422)),
          EmailUpdateRecipientTrackingPreference500,
          EmailUpdateRecipientTrackingPreference504.pipe(HttpApiSchema.status(504)),
        ],
      },
    )
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "email.updateRecipientTrackingPreference")
      .annotate(OpenApi.Summary, "Update a recipient tracking preference")
      .annotate(
        OpenApi.Description,
        "Opts a normalized recipient email in or out of open and click tracking. Opt-out takes precedence over per-send overrides and organization defaults without changing suppression or send eligibility.",
      ),
  )
  .annotate(
    OpenApi.Description,
    "Unified email domain for sending, domains, templates, threads, catch-all, blocking, forwarding, and onboarding",
  ) {}
