// Auto-generated from OpenAPI; do not edit.

import type * as EffectBrand from "effect/Brand";
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  FeedbackContext,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type FeedbackId = string & EffectBrand.Brand<"FeedbackId">;
export const FeedbackId = /* @__PURE__ */ Schema.String.check(
  Schema.isPattern(new RegExp("^fdbk_[0-9a-hjkmnp-tv-z]{16,24}$", "u")).annotate({
    expected: "a string matching the RegExp ^fdbk_[0-9a-hjkmnp-tv-z]{16,24}$",
    identifier: "FeedbackId",
  }),
).pipe(Schema.brand("FeedbackId"));
export type FeedbackReceipt = { readonly id: FeedbackId; readonly createdAt: string };
export const FeedbackReceipt = /* @__PURE__ */ Schema.Struct({
  id: FeedbackId,
  createdAt: Schema.String,
}).annotate({ identifier: "FeedbackReceipt" });
export type FeedbackSendRequestJson = {
  readonly message: string;
  readonly category?: "bug" | "confusing" | "missing" | "other" | null;
  readonly context?: FeedbackContext | null;
};
export const FeedbackSendRequestJson = /* @__PURE__ */ Schema.Struct({
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
});
export type FeedbackSend201 = FeedbackReceipt;
export const FeedbackSend201 = FeedbackReceipt;
export type FeedbackSend401 = UnauthorizedError;
export const FeedbackSend401 = UnauthorizedError;
export type FeedbackSend403 = ForbiddenError;
export const FeedbackSend403 = ForbiddenError;
export type FeedbackSend422 = ValidationError;
export const FeedbackSend422 = ValidationError;
export type FeedbackSend500 = InternalError;
export const FeedbackSend500 = InternalError;
export type FeedbackSend504 = GatewayTimeoutError;
export const FeedbackSend504 = GatewayTimeoutError;

export class FeedbackGroup extends HttpApiGroup.make("Feedback")
  .add(
    HttpApiEndpoint.post("feedbackSend", "/v1/feedback", {
      payload: FeedbackSendRequestJson,
      success: FeedbackSend201.pipe(HttpApiSchema.status(201)),
      error: [
        FeedbackSend401.pipe(HttpApiSchema.status(401)),
        FeedbackSend403.pipe(HttpApiSchema.status(403)),
        FeedbackSend422.pipe(HttpApiSchema.status(422)),
        FeedbackSend500,
        FeedbackSend504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "feedback.send")
      .annotate(OpenApi.Summary, "Send feedback")
      .annotate(
        OpenApi.Description,
        "Tells Samva what was confusing, broken, or missing in the API. Programs and coding agents can call it the moment something goes wrong, naming the operation and resource involved. Samva's team reads every report; the answer is a receipt, not a reply.",
      ),
  )
  .annotate(OpenApi.Description, "Reports to Samva about the API itself.") {}
