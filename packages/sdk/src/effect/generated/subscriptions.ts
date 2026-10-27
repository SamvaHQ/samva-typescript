// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  BillingProviderError,
  BrandAddressRequiredError,
  CampaignFooterRequiredError,
  ConflictError,
  DeliveryUnavailableError,
  ExternalServiceError,
  FlagDisabledError,
  ForbiddenError,
  FromAddressRequiredError,
  GatewayTimeoutError,
  InternalError,
  OnboardingReviewRequiredError,
  PaymentRequiredError,
  RateLimitedError,
  ResourceNotFoundError,
  SenderNotReadyError,
  TopicId,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type SubscribeResult = { readonly success: boolean; readonly expiresAt: string };
export const SubscribeResult = /* @__PURE__ */ (() =>
  Schema.Struct({ success: Schema.Boolean, expiresAt: Schema.String }).annotate({
    identifier: "SubscribeResult",
  }))();
export type SubscriptionsSubscribeRequestJson = {
  readonly email: string;
  readonly topicId: TopicId;
  readonly from: { readonly email: string; readonly name?: string | null };
  readonly templateSlug?: string | null;
  readonly consentIp?: string | null;
  readonly consentSource?: string | null;
};
export const SubscriptionsSubscribeRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
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
      .check(
        Schema.isMaxLength(320).annotate({ expected: "a value with a length of at most 320" }),
      ),
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
  }))();
export type SubscriptionsSubscribe200 = SubscribeResult;
export const SubscriptionsSubscribe200 = SubscribeResult;
export type SubscriptionsSubscribe401 = UnauthorizedError;
export const SubscriptionsSubscribe401 = UnauthorizedError;
export type SubscriptionsSubscribe402 = PaymentRequiredError;
export const SubscriptionsSubscribe402 = PaymentRequiredError;
export type SubscriptionsSubscribe403 =
  | ForbiddenError
  | OnboardingReviewRequiredError
  | FlagDisabledError;
export const SubscriptionsSubscribe403 = /* @__PURE__ */ (() =>
  Schema.Union([ForbiddenError, OnboardingReviewRequiredError, FlagDisabledError]))();
export type SubscriptionsSubscribe404 = ResourceNotFoundError;
export const SubscriptionsSubscribe404 = ResourceNotFoundError;
export type SubscriptionsSubscribe409 = ConflictError;
export const SubscriptionsSubscribe409 = ConflictError;
export type SubscriptionsSubscribe422 =
  | ValidationError
  | FromAddressRequiredError
  | BrandAddressRequiredError
  | CampaignFooterRequiredError;
export const SubscriptionsSubscribe422 = /* @__PURE__ */ (() =>
  Schema.Union([
    ValidationError,
    FromAddressRequiredError,
    BrandAddressRequiredError,
    CampaignFooterRequiredError,
  ]))();
export type SubscriptionsSubscribe429 = RateLimitedError;
export const SubscriptionsSubscribe429 = RateLimitedError;
export type SubscriptionsSubscribe500 = InternalError;
export const SubscriptionsSubscribe500 = InternalError;
export type SubscriptionsSubscribe502 = BillingProviderError | ExternalServiceError;
export const SubscriptionsSubscribe502 = /* @__PURE__ */ (() =>
  Schema.Union([BillingProviderError, ExternalServiceError]))();
export type SubscriptionsSubscribe503 = SenderNotReadyError | DeliveryUnavailableError;
export const SubscriptionsSubscribe503 = /* @__PURE__ */ (() =>
  Schema.Union([SenderNotReadyError, DeliveryUnavailableError]))();
export type SubscriptionsSubscribe504 = GatewayTimeoutError;
export const SubscriptionsSubscribe504 = GatewayTimeoutError;

export class SubscriptionsGroup extends HttpApiGroup.make("Subscriptions")
  .add(
    HttpApiEndpoint.post("subscriptionsSubscribe", "/v1/subscriptions", {
      payload: SubscriptionsSubscribeRequestJson,
      success: SubscriptionsSubscribe200,
      error: [
        SubscriptionsSubscribe401.pipe(HttpApiSchema.status(401)),
        SubscriptionsSubscribe402.pipe(HttpApiSchema.status(402)),
        SubscriptionsSubscribe403.pipe(HttpApiSchema.status(403)),
        SubscriptionsSubscribe404.pipe(HttpApiSchema.status(404)),
        SubscriptionsSubscribe409.pipe(HttpApiSchema.status(409)),
        SubscriptionsSubscribe422.pipe(HttpApiSchema.status(422)),
        SubscriptionsSubscribe429.pipe(HttpApiSchema.status(429)),
        SubscriptionsSubscribe500,
        SubscriptionsSubscribe502.pipe(HttpApiSchema.status(502)),
        SubscriptionsSubscribe503.pipe(HttpApiSchema.status(503)),
        SubscriptionsSubscribe504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "subscriptions.subscribe")
      .annotate(OpenApi.Summary, "Request subscription confirmation")
      .annotate(
        OpenApi.Description,
        "Sends a confirmation email from your sender. Only the recipient's explicit confirmation creates their contact and subscribes them to the named topic. The link expires after seven days and can be used once. A custom published email template receives confirmUrl. Sending follows ordinary sender, admission, billing, and brand-footer settings. Requires email send authority in addition to the declared contact grants, including the topic subscription change.",
      ),
  )
  .annotate(OpenApi.Description, "Recipient-confirmed topic subscriptions") {}
