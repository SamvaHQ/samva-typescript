// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  AttachmentId,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  MessageId,
  OrganizationId,
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type AttachmentList = {
  readonly items: ReadonlyArray<{
    readonly id: AttachmentId;
    readonly messageId: MessageId;
    readonly organizationId: OrganizationId;
    readonly filename: string;
    readonly contentType: string;
    readonly size: number;
    readonly contentId: string | null;
    readonly isInline: boolean;
    readonly createdAt: string;
  }>;
};
export const AttachmentList = /* @__PURE__ */ (() =>
  Schema.Struct({
    items: Schema.Array(
      Schema.Struct({
        id: AttachmentId,
        messageId: MessageId,
        organizationId: OrganizationId,
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
        contentId: Schema.Union([Schema.String, Schema.Null]),
        isInline: Schema.Boolean,
        createdAt: Schema.String,
      }),
    ),
  }).annotate({ identifier: "AttachmentList" }))();
export type AttachmentsListQuery = { readonly messageId: MessageId };
export const AttachmentsListQuery = /* @__PURE__ */ (() =>
  Schema.Struct({ messageId: MessageId }))();
export type AttachmentsList200 = AttachmentList;
export const AttachmentsList200 = AttachmentList;
export type AttachmentsList401 = UnauthorizedError;
export const AttachmentsList401 = UnauthorizedError;
export type AttachmentsList403 = ForbiddenError;
export const AttachmentsList403 = ForbiddenError;
export type AttachmentsList404 = ResourceNotFoundError;
export const AttachmentsList404 = ResourceNotFoundError;
export type AttachmentsList422 = ValidationError;
export const AttachmentsList422 = ValidationError;
export type AttachmentsList500 = InternalError;
export const AttachmentsList500 = InternalError;
export type AttachmentsList504 = GatewayTimeoutError;
export const AttachmentsList504 = GatewayTimeoutError;
export type AttachmentsGetByIdPathParams = { readonly id: AttachmentId };
export const AttachmentsGetByIdPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: AttachmentId }))();
export type AttachmentsGetById200 = {
  readonly id: AttachmentId;
  readonly messageId: MessageId;
  readonly organizationId: OrganizationId;
  readonly filename: string;
  readonly contentType: string;
  readonly size: number;
  readonly contentId: string | null;
  readonly isInline: boolean;
  readonly createdAt: string;
};
export const AttachmentsGetById200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: AttachmentId,
    messageId: MessageId,
    organizationId: OrganizationId,
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
    contentId: Schema.Union([Schema.String, Schema.Null]),
    isInline: Schema.Boolean,
    createdAt: Schema.String,
  }))();
export type AttachmentsGetById401 = UnauthorizedError;
export const AttachmentsGetById401 = UnauthorizedError;
export type AttachmentsGetById403 = ForbiddenError;
export const AttachmentsGetById403 = ForbiddenError;
export type AttachmentsGetById404 = ResourceNotFoundError;
export const AttachmentsGetById404 = ResourceNotFoundError;
export type AttachmentsGetById422 = ValidationError;
export const AttachmentsGetById422 = ValidationError;
export type AttachmentsGetById500 = InternalError;
export const AttachmentsGetById500 = InternalError;
export type AttachmentsGetById504 = GatewayTimeoutError;
export const AttachmentsGetById504 = GatewayTimeoutError;
export type AttachmentsRemovePathParams = { readonly id: AttachmentId };
export const AttachmentsRemovePathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: AttachmentId }))();
export type AttachmentsRemove200 = { readonly success: boolean; readonly deletedId: AttachmentId };
export const AttachmentsRemove200 = /* @__PURE__ */ (() =>
  Schema.Struct({ success: Schema.Boolean, deletedId: AttachmentId }))();
export type AttachmentsRemove401 = UnauthorizedError;
export const AttachmentsRemove401 = UnauthorizedError;
export type AttachmentsRemove403 = ForbiddenError;
export const AttachmentsRemove403 = ForbiddenError;
export type AttachmentsRemove404 = ResourceNotFoundError;
export const AttachmentsRemove404 = ResourceNotFoundError;
export type AttachmentsRemove422 = ValidationError;
export const AttachmentsRemove422 = ValidationError;
export type AttachmentsRemove500 = InternalError;
export const AttachmentsRemove500 = InternalError;
export type AttachmentsRemove504 = GatewayTimeoutError;
export const AttachmentsRemove504 = GatewayTimeoutError;
export type AttachmentsDownloadUrlPathParams = { readonly id: AttachmentId };
export const AttachmentsDownloadUrlPathParams = /* @__PURE__ */ (() =>
  Schema.Struct({ id: AttachmentId }))();
export type AttachmentsDownloadUrlQuery = { readonly expiresIn?: number | null };
export const AttachmentsDownloadUrlQuery = /* @__PURE__ */ (() =>
  Schema.Struct({
    expiresIn: Schema.optionalKey(
      Schema.Union([
        Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })),
        Schema.Null,
      ]),
    ),
  }))();
export type AttachmentsDownloadUrl200 = {
  readonly url: string;
  readonly expiresAt: string;
  readonly attachment: {
    readonly id: AttachmentId;
    readonly messageId: MessageId;
    readonly organizationId: OrganizationId;
    readonly filename: string;
    readonly contentType: string;
    readonly size: number;
    readonly contentId: string | null;
    readonly isInline: boolean;
    readonly createdAt: string;
  };
};
export const AttachmentsDownloadUrl200 = /* @__PURE__ */ (() =>
  Schema.Struct({
    url: Schema.String,
    expiresAt: Schema.String,
    attachment: Schema.Struct({
      id: AttachmentId,
      messageId: MessageId,
      organizationId: OrganizationId,
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
      contentId: Schema.Union([Schema.String, Schema.Null]),
      isInline: Schema.Boolean,
      createdAt: Schema.String,
    }),
  }))();
export type AttachmentsDownloadUrl401 = UnauthorizedError;
export const AttachmentsDownloadUrl401 = UnauthorizedError;
export type AttachmentsDownloadUrl403 = ForbiddenError;
export const AttachmentsDownloadUrl403 = ForbiddenError;
export type AttachmentsDownloadUrl404 = ResourceNotFoundError;
export const AttachmentsDownloadUrl404 = ResourceNotFoundError;
export type AttachmentsDownloadUrl422 = ValidationError;
export const AttachmentsDownloadUrl422 = ValidationError;
export type AttachmentsDownloadUrl500 = InternalError;
export const AttachmentsDownloadUrl500 = InternalError;
export type AttachmentsDownloadUrl504 = GatewayTimeoutError;
export const AttachmentsDownloadUrl504 = GatewayTimeoutError;

export class AttachmentsGroup extends HttpApiGroup.make("Attachments")
  .add(
    HttpApiEndpoint.get("attachmentsList", "/v1/attachments", {
      query: AttachmentsListQuery,
      success: AttachmentsList200,
      error: [
        AttachmentsList401.pipe(HttpApiSchema.status(401)),
        AttachmentsList403.pipe(HttpApiSchema.status(403)),
        AttachmentsList404.pipe(HttpApiSchema.status(404)),
        AttachmentsList422.pipe(HttpApiSchema.status(422)),
        AttachmentsList500,
        AttachmentsList504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "attachments.list")
      .annotate(OpenApi.Summary, "List message attachments")
      .annotate(
        OpenApi.Description,
        "Returns every attachment of the given message, newest first. A message's attachments all ride that one email, so the list is never paged.",
      ),
    HttpApiEndpoint.get("attachmentsGetById", "/v1/attachments/:id", {
      params: AttachmentsGetByIdPathParams,
      success: AttachmentsGetById200,
      error: [
        AttachmentsGetById401.pipe(HttpApiSchema.status(401)),
        AttachmentsGetById403.pipe(HttpApiSchema.status(403)),
        AttachmentsGetById404.pipe(HttpApiSchema.status(404)),
        AttachmentsGetById422.pipe(HttpApiSchema.status(422)),
        AttachmentsGetById500,
        AttachmentsGetById504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "attachments.getById")
      .annotate(OpenApi.Summary, "Get an attachment")
      .annotate(
        OpenApi.Description,
        "Returns metadata for a single attachment, including filename, content type, and size.",
      ),
    HttpApiEndpoint.delete("attachmentsRemove", "/v1/attachments/:id", {
      params: AttachmentsRemovePathParams,
      success: AttachmentsRemove200,
      error: [
        AttachmentsRemove401.pipe(HttpApiSchema.status(401)),
        AttachmentsRemove403.pipe(HttpApiSchema.status(403)),
        AttachmentsRemove404.pipe(HttpApiSchema.status(404)),
        AttachmentsRemove422.pipe(HttpApiSchema.status(422)),
        AttachmentsRemove500,
        AttachmentsRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "attachments.remove")
      .annotate(OpenApi.Summary, "Delete an attachment")
      .annotate(
        OpenApi.Description,
        "Deletes an attachment and returns the deleted attachment's ID.",
      ),
    HttpApiEndpoint.get("attachmentsDownloadUrl", "/v1/attachments/:id/download-url", {
      params: AttachmentsDownloadUrlPathParams,
      query: AttachmentsDownloadUrlQuery,
      success: AttachmentsDownloadUrl200,
      error: [
        AttachmentsDownloadUrl401.pipe(HttpApiSchema.status(401)),
        AttachmentsDownloadUrl403.pipe(HttpApiSchema.status(403)),
        AttachmentsDownloadUrl404.pipe(HttpApiSchema.status(404)),
        AttachmentsDownloadUrl422.pipe(HttpApiSchema.status(422)),
        AttachmentsDownloadUrl500,
        AttachmentsDownloadUrl504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "attachments.downloadUrl")
      .annotate(OpenApi.Summary, "Get an attachment download URL")
      .annotate(
        OpenApi.Description,
        "Generates a presigned, time-limited download URL for the attachment; expiry is configurable via the expiresIn query parameter.",
      ),
  )
  .annotate(OpenApi.Description, "Email attachment metadata and secure download URLs") {}
