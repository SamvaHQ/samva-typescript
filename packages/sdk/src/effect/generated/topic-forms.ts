// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  FlagDisabledError,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  ResourceNotFoundError,
  TopicId,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type TopicForm = {
  readonly id: string;
  readonly publicKey: string;
  readonly topicId: TopicId;
  readonly allowedOrigins: ReadonlyArray<string>;
  readonly confirmationTitle: string;
  readonly confirmationMessage: string;
  readonly successTitle: string;
  readonly successMessage: string;
  readonly redirectUrl: string | null;
  readonly linkOrigin: string;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export const TopicForm = /* @__PURE__ */ Schema.Struct({
  id: Schema.String.annotate({ format: "uuid" }).check(
    Schema.isPattern(
      new RegExp(
        "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
        "u",
      ),
    ).annotate({
      expected:
        "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
    }),
  ),
  publicKey: Schema.String.annotate({ format: "uuid" }).check(
    Schema.isPattern(
      new RegExp(
        "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
        "u",
      ),
    ).annotate({
      expected:
        "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
    }),
  ),
  topicId: TopicId,
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
  linkOrigin: Schema.String,
  createdAt: Schema.String,
  updatedAt: Schema.String,
}).annotate({ identifier: "TopicForm" });
export type TopicFormsListPathParams = { readonly id: TopicId };
export const TopicFormsListPathParams = /* @__PURE__ */ Schema.Struct({ id: TopicId });
export type TopicFormsList200 = { readonly items: ReadonlyArray<TopicForm> };
export const TopicFormsList200 = /* @__PURE__ */ Schema.Struct({ items: Schema.Array(TopicForm) });
export type TopicFormsList401 = UnauthorizedError;
export const TopicFormsList401 = UnauthorizedError;
export type TopicFormsList403 = ForbiddenError | FlagDisabledError;
export const TopicFormsList403 = /* @__PURE__ */ Schema.Union([ForbiddenError, FlagDisabledError]);
export type TopicFormsList404 = ResourceNotFoundError;
export const TopicFormsList404 = ResourceNotFoundError;
export type TopicFormsList422 = ValidationError;
export const TopicFormsList422 = ValidationError;
export type TopicFormsList500 = InternalError;
export const TopicFormsList500 = InternalError;
export type TopicFormsList504 = GatewayTimeoutError;
export const TopicFormsList504 = GatewayTimeoutError;
export type TopicFormsCreatePathParams = { readonly id: TopicId };
export const TopicFormsCreatePathParams = /* @__PURE__ */ Schema.Struct({ id: TopicId });
export type TopicFormsCreateRequestJson = {
  readonly allowedOrigins: ReadonlyArray<string>;
  readonly confirmationTitle: string;
  readonly confirmationMessage: string;
  readonly successTitle: string;
  readonly successMessage: string;
  readonly redirectUrl: string | null;
};
export const TopicFormsCreateRequestJson = /* @__PURE__ */ Schema.Struct({
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
});
export type TopicFormsCreate201 = TopicForm;
export const TopicFormsCreate201 = TopicForm;
export type TopicFormsCreate401 = UnauthorizedError;
export const TopicFormsCreate401 = UnauthorizedError;
export type TopicFormsCreate403 = ForbiddenError | FlagDisabledError;
export const TopicFormsCreate403 = /* @__PURE__ */ Schema.Union([
  ForbiddenError,
  FlagDisabledError,
]);
export type TopicFormsCreate404 = ResourceNotFoundError;
export const TopicFormsCreate404 = ResourceNotFoundError;
export type TopicFormsCreate422 = ValidationError;
export const TopicFormsCreate422 = ValidationError;
export type TopicFormsCreate500 = InternalError;
export const TopicFormsCreate500 = InternalError;
export type TopicFormsCreate504 = GatewayTimeoutError;
export const TopicFormsCreate504 = GatewayTimeoutError;
export type TopicFormsGetPathParams = { readonly id: TopicId; readonly formId: string };
export const TopicFormsGetPathParams = /* @__PURE__ */ Schema.Struct({
  id: TopicId,
  formId: Schema.String.annotate({ format: "uuid" }).check(
    Schema.isPattern(
      new RegExp(
        "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
        "u",
      ),
    ).annotate({
      expected:
        "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
    }),
  ),
});
export type TopicFormsGet200 = TopicForm;
export const TopicFormsGet200 = TopicForm;
export type TopicFormsGet401 = UnauthorizedError;
export const TopicFormsGet401 = UnauthorizedError;
export type TopicFormsGet403 = ForbiddenError | FlagDisabledError;
export const TopicFormsGet403 = /* @__PURE__ */ Schema.Union([ForbiddenError, FlagDisabledError]);
export type TopicFormsGet404 = ResourceNotFoundError;
export const TopicFormsGet404 = ResourceNotFoundError;
export type TopicFormsGet422 = ValidationError;
export const TopicFormsGet422 = ValidationError;
export type TopicFormsGet500 = InternalError;
export const TopicFormsGet500 = InternalError;
export type TopicFormsGet504 = GatewayTimeoutError;
export const TopicFormsGet504 = GatewayTimeoutError;
export type TopicFormsRemovePathParams = { readonly id: TopicId; readonly formId: string };
export const TopicFormsRemovePathParams = /* @__PURE__ */ Schema.Struct({
  id: TopicId,
  formId: Schema.String.annotate({ format: "uuid" }).check(
    Schema.isPattern(
      new RegExp(
        "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
        "u",
      ),
    ).annotate({
      expected:
        "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
    }),
  ),
});
export type TopicFormsRemove200 = { readonly success: boolean };
export const TopicFormsRemove200 = /* @__PURE__ */ Schema.Struct({ success: Schema.Boolean });
export type TopicFormsRemove401 = UnauthorizedError;
export const TopicFormsRemove401 = UnauthorizedError;
export type TopicFormsRemove403 = ForbiddenError | FlagDisabledError;
export const TopicFormsRemove403 = /* @__PURE__ */ Schema.Union([
  ForbiddenError,
  FlagDisabledError,
]);
export type TopicFormsRemove404 = ResourceNotFoundError;
export const TopicFormsRemove404 = ResourceNotFoundError;
export type TopicFormsRemove422 = ValidationError;
export const TopicFormsRemove422 = ValidationError;
export type TopicFormsRemove500 = InternalError;
export const TopicFormsRemove500 = InternalError;
export type TopicFormsRemove504 = GatewayTimeoutError;
export const TopicFormsRemove504 = GatewayTimeoutError;
export type TopicFormsUpdatePathParams = { readonly id: TopicId; readonly formId: string };
export const TopicFormsUpdatePathParams = /* @__PURE__ */ Schema.Struct({
  id: TopicId,
  formId: Schema.String.annotate({ format: "uuid" }).check(
    Schema.isPattern(
      new RegExp(
        "^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
        "u",
      ),
    ).annotate({
      expected:
        "a string matching the RegExp ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|[fF]{8}-[fF]{4}-[fF]{4}-[fF]{4}-[fF]{12})$",
    }),
  ),
});
export type TopicFormsUpdateRequestJson = {
  readonly allowedOrigins?: ReadonlyArray<string> | null;
  readonly confirmationTitle?: string | null;
  readonly confirmationMessage?: string | null;
  readonly successTitle?: string | null;
  readonly successMessage?: string | null;
  readonly redirectUrl?: string | null | null;
};
export const TopicFormsUpdateRequestJson = /* @__PURE__ */ Schema.Struct({
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
});
export type TopicFormsUpdate200 = TopicForm;
export const TopicFormsUpdate200 = TopicForm;
export type TopicFormsUpdate401 = UnauthorizedError;
export const TopicFormsUpdate401 = UnauthorizedError;
export type TopicFormsUpdate403 = ForbiddenError | FlagDisabledError;
export const TopicFormsUpdate403 = /* @__PURE__ */ Schema.Union([
  ForbiddenError,
  FlagDisabledError,
]);
export type TopicFormsUpdate404 = ResourceNotFoundError;
export const TopicFormsUpdate404 = ResourceNotFoundError;
export type TopicFormsUpdate422 = ValidationError;
export const TopicFormsUpdate422 = ValidationError;
export type TopicFormsUpdate500 = InternalError;
export const TopicFormsUpdate500 = InternalError;
export type TopicFormsUpdate504 = GatewayTimeoutError;
export const TopicFormsUpdate504 = GatewayTimeoutError;

export class TopicFormsGroup extends HttpApiGroup.make("Topic forms")
  .add(
    HttpApiEndpoint.get("topicFormsList", "/v1/topics/:id/forms", {
      params: TopicFormsListPathParams,
      success: TopicFormsList200,
      error: [
        TopicFormsList401.pipe(HttpApiSchema.status(401)),
        TopicFormsList403.pipe(HttpApiSchema.status(403)),
        TopicFormsList404.pipe(HttpApiSchema.status(404)),
        TopicFormsList422.pipe(HttpApiSchema.status(422)),
        TopicFormsList500,
        TopicFormsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicForms.list")
      .annotate(OpenApi.Summary, "List topic forms")
      .annotate(
        OpenApi.Description,
        "Lists the signup forms belonging to the visible topic. Requires topicSignup. Forms contain exact HTTPS allowed origins, bounded confirmation and success copy, an optional HTTPS redirect, and a public key for hosted or embedded signup.",
      ),
    HttpApiEndpoint.post("topicFormsCreate", "/v1/topics/:id/forms", {
      params: TopicFormsCreatePathParams,
      payload: TopicFormsCreateRequestJson,
      success: TopicFormsCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        TopicFormsCreate401.pipe(HttpApiSchema.status(401)),
        TopicFormsCreate403.pipe(HttpApiSchema.status(403)),
        TopicFormsCreate404.pipe(HttpApiSchema.status(404)),
        TopicFormsCreate422.pipe(HttpApiSchema.status(422)),
        TopicFormsCreate500,
        TopicFormsCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicForms.create")
      .annotate(OpenApi.Summary, "Create a topic form")
      .annotate(
        OpenApi.Description,
        "Creates a signup form for the visible topic and returns 201. The server generates its opaque public key. allowedOrigins contains exact HTTPS origins; the canonical web origin and current topic link origin are also accepted. Copy is plain text and redirectUrl is HTTPS or null. Requires topicSignup.",
      ),
    HttpApiEndpoint.get("topicFormsGet", "/v1/topics/:id/forms/:formId", {
      params: TopicFormsGetPathParams,
      success: TopicFormsGet200,
      error: [
        TopicFormsGet401.pipe(HttpApiSchema.status(401)),
        TopicFormsGet403.pipe(HttpApiSchema.status(403)),
        TopicFormsGet404.pipe(HttpApiSchema.status(404)),
        TopicFormsGet422.pipe(HttpApiSchema.status(422)),
        TopicFormsGet500,
        TopicFormsGet504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicForms.get")
      .annotate(OpenApi.Summary, "Get a topic form")
      .annotate(
        OpenApi.Description,
        "Returns a signup form belonging to the visible topic, including its public key and current link origin. Forms outside the caller namespace or organization return 404. Requires topicSignup.",
      ),
    HttpApiEndpoint.delete("topicFormsRemove", "/v1/topics/:id/forms/:formId", {
      params: TopicFormsRemovePathParams,
      success: TopicFormsRemove200,
      error: [
        TopicFormsRemove401.pipe(HttpApiSchema.status(401)),
        TopicFormsRemove403.pipe(HttpApiSchema.status(403)),
        TopicFormsRemove404.pipe(HttpApiSchema.status(404)),
        TopicFormsRemove422.pipe(HttpApiSchema.status(422)),
        TopicFormsRemove500,
        TopicFormsRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicForms.remove")
      .annotate(OpenApi.Summary, "Delete a topic form")
      .annotate(
        OpenApi.Description,
        "Deletes a form belonging to the visible topic. Its public key immediately stops accepting signups. Existing email confirmation links keep their snapshotted copy and remain valid until expiry. Requires topicSignup.",
      ),
    HttpApiEndpoint.patch("topicFormsUpdate", "/v1/topics/:id/forms/:formId", {
      params: TopicFormsUpdatePathParams,
      payload: TopicFormsUpdateRequestJson,
      success: TopicFormsUpdate200,
      error: [
        TopicFormsUpdate401.pipe(HttpApiSchema.status(401)),
        TopicFormsUpdate403.pipe(HttpApiSchema.status(403)),
        TopicFormsUpdate404.pipe(HttpApiSchema.status(404)),
        TopicFormsUpdate422.pipe(HttpApiSchema.status(422)),
        TopicFormsUpdate500,
        TopicFormsUpdate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "topicForms.update")
      .annotate(OpenApi.Summary, "Update a topic form")
      .annotate(
        OpenApi.Description,
        "Updates only the supplied form fields. allowedOrigins replaces the complete exact-origin allowlist; redirectUrl null clears the success redirect. The public key remains stable. Requires topicSignup.",
      ),
  )
  .annotate(OpenApi.Description, "Hosted and embedded double opt-in signup forms for topics") {}
