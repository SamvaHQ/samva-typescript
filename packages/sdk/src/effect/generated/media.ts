// Auto-generated from OpenAPI; do not edit.

import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema, OpenApi } from "effect/http-api";
import * as Schema from "effect/Schema";

import {
  ApiKeySecurityMiddleware,
  ForbiddenError,
  GatewayTimeoutError,
  InternalError,
  MediaId,
  OrganizationId,
  ResourceNotFoundError,
  SuccessResponse,
  UnauthorizedError,
  ValidationError,
} from "./shared";

export type MediaUploadInstruction = {
  readonly url: string;
  readonly method: "PUT";
  readonly headers: { readonly [x: string]: string };
  readonly expiresAt: string;
};
export const MediaUploadInstruction = /* @__PURE__ */ (() =>
  Schema.Struct({
    url: Schema.String,
    method: Schema.Literal("PUT"),
    headers: Schema.Record(Schema.String, Schema.String),
    expiresAt: Schema.String,
  }).annotate({ identifier: "MediaUploadInstruction" }))();
export type MediaDownloadUrl = { readonly url: string; readonly expiresAt: string };
export const MediaDownloadUrl = /* @__PURE__ */ (() =>
  Schema.Struct({ url: Schema.String, expiresAt: Schema.String }).annotate({
    identifier: "MediaDownloadUrl",
  }))();
export type Media = {
  readonly id: MediaId;
  readonly organizationId: OrganizationId;
  readonly status: "pending" | "uploading" | "processing" | "ready" | "failed" | "deleted";
  readonly filename: string;
  readonly contentType: string;
  readonly sizeBytes: number;
  readonly width: number | null;
  readonly height: number | null;
  readonly durationMs: number | null;
  readonly purpose: "attachment" | "avatar" | "review_evidence";
  readonly checksumSha256: string | null;
  readonly expiresAt: string | null;
  readonly createdAt: string;
  readonly confirmedAt: string | null;
};
export const Media = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MediaId,
    organizationId: OrganizationId,
    status: Schema.Union([
      Schema.Literal("pending"),
      Schema.Literal("uploading"),
      Schema.Literal("processing"),
      Schema.Literal("ready"),
      Schema.Literal("failed"),
      Schema.Literal("deleted"),
    ]),
    filename: Schema.String,
    contentType: Schema.String,
    sizeBytes: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ).check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
    width: Schema.Union([
      Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })).check(
        Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" }),
      ),
      Schema.Null,
    ]),
    height: Schema.Union([
      Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })).check(
        Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" }),
      ),
      Schema.Null,
    ]),
    durationMs: Schema.Union([
      Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })).check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      ),
      Schema.Null,
    ]),
    purpose: Schema.Union([
      Schema.Literal("attachment"),
      Schema.Literal("avatar"),
      Schema.Literal("review_evidence"),
    ]),
    checksumSha256: Schema.Union([Schema.String, Schema.Null]),
    expiresAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
    confirmedAt: Schema.Union([Schema.String, Schema.Null]),
  }).annotate({ identifier: "Media" }))();
export type CreatedMedia = {
  readonly id: MediaId;
  readonly organizationId: OrganizationId;
  readonly status: "pending" | "uploading" | "processing" | "ready" | "failed" | "deleted";
  readonly filename: string;
  readonly contentType: string;
  readonly sizeBytes: number;
  readonly width: number | null;
  readonly height: number | null;
  readonly durationMs: number | null;
  readonly purpose: "attachment" | "avatar" | "review_evidence";
  readonly checksumSha256: string | null;
  readonly expiresAt: string | null;
  readonly createdAt: string;
  readonly confirmedAt: string | null;
  readonly upload: MediaUploadInstruction;
};
export const CreatedMedia = /* @__PURE__ */ (() =>
  Schema.Struct({
    id: MediaId,
    organizationId: OrganizationId,
    status: Schema.Union([
      Schema.Literal("pending"),
      Schema.Literal("uploading"),
      Schema.Literal("processing"),
      Schema.Literal("ready"),
      Schema.Literal("failed"),
      Schema.Literal("deleted"),
    ]),
    filename: Schema.String,
    contentType: Schema.String,
    sizeBytes: Schema.Finite.check(
      Schema.isFinite().annotate({ expected: "a finite number" }),
    ).check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
    width: Schema.Union([
      Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })).check(
        Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" }),
      ),
      Schema.Null,
    ]),
    height: Schema.Union([
      Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })).check(
        Schema.isGreaterThan(0).annotate({ expected: "a value greater than 0" }),
      ),
      Schema.Null,
    ]),
    durationMs: Schema.Union([
      Schema.Finite.check(Schema.isFinite().annotate({ expected: "a finite number" })).check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      ),
      Schema.Null,
    ]),
    purpose: Schema.Union([
      Schema.Literal("attachment"),
      Schema.Literal("avatar"),
      Schema.Literal("review_evidence"),
    ]),
    checksumSha256: Schema.Union([Schema.String, Schema.Null]),
    expiresAt: Schema.Union([Schema.String, Schema.Null]),
    createdAt: Schema.String,
    confirmedAt: Schema.Union([Schema.String, Schema.Null]),
    upload: MediaUploadInstruction,
  }).annotate({ identifier: "CreatedMedia" }))();
export type CompletedMedia = { readonly media: Media; readonly downloadUrl: string };
export const CompletedMedia = /* @__PURE__ */ (() =>
  Schema.Struct({ media: Media, downloadUrl: Schema.String }).annotate({
    identifier: "CompletedMedia",
  }))();
export type MediaCreateRequestJson = {
  readonly filename: string;
  readonly contentType: string;
  readonly sizeBytes: number;
  readonly purpose: "attachment" | "avatar" | "review_evidence";
  readonly checksumSha256?: string | null;
};
export const MediaCreateRequestJson = /* @__PURE__ */ (() =>
  Schema.Struct({
    filename: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(255).annotate({ expected: "a string with at most 255 code points" }),
      )
      .check(
        Schema.isMaxLength(255).annotate({ expected: "a value with a length of at most 255" }),
      ),
    contentType: Schema.String.check(
      Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
    )
      .check(
        Schema.isMaxCodePoints(127).annotate({ expected: "a string with at most 127 code points" }),
      )
      .check(
        Schema.isMaxLength(127).annotate({ expected: "a value with a length of at most 127" }),
      ),
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
  }))();
export type MediaCreate201 = CreatedMedia;
export const MediaCreate201 = CreatedMedia;
export type MediaCreate401 = UnauthorizedError;
export const MediaCreate401 = UnauthorizedError;
export type MediaCreate403 = ForbiddenError;
export const MediaCreate403 = ForbiddenError;
export type MediaCreate422 = ValidationError;
export const MediaCreate422 = ValidationError;
export type MediaCreate500 = InternalError;
export const MediaCreate500 = InternalError;
export type MediaCreate504 = GatewayTimeoutError;
export const MediaCreate504 = GatewayTimeoutError;
export type MediaGetByIdPathParams = { readonly id: MediaId };
export const MediaGetByIdPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: MediaId }))();
export type MediaGetById200 = Media;
export const MediaGetById200 = Media;
export type MediaGetById401 = UnauthorizedError;
export const MediaGetById401 = UnauthorizedError;
export type MediaGetById403 = ForbiddenError;
export const MediaGetById403 = ForbiddenError;
export type MediaGetById404 = ResourceNotFoundError;
export const MediaGetById404 = ResourceNotFoundError;
export type MediaGetById422 = ValidationError;
export const MediaGetById422 = ValidationError;
export type MediaGetById500 = InternalError;
export const MediaGetById500 = InternalError;
export type MediaGetById504 = GatewayTimeoutError;
export const MediaGetById504 = GatewayTimeoutError;
export type MediaRemovePathParams = { readonly id: MediaId };
export const MediaRemovePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: MediaId }))();
export type MediaRemove200 = SuccessResponse;
export const MediaRemove200 = SuccessResponse;
export type MediaRemove401 = UnauthorizedError;
export const MediaRemove401 = UnauthorizedError;
export type MediaRemove403 = ForbiddenError;
export const MediaRemove403 = ForbiddenError;
export type MediaRemove404 = ResourceNotFoundError;
export const MediaRemove404 = ResourceNotFoundError;
export type MediaRemove422 = ValidationError;
export const MediaRemove422 = ValidationError;
export type MediaRemove500 = InternalError;
export const MediaRemove500 = InternalError;
export type MediaRemove504 = GatewayTimeoutError;
export const MediaRemove504 = GatewayTimeoutError;
export type MediaCompletePathParams = { readonly id: MediaId };
export const MediaCompletePathParams = /* @__PURE__ */ (() => Schema.Struct({ id: MediaId }))();
export type MediaComplete200 = CompletedMedia;
export const MediaComplete200 = CompletedMedia;
export type MediaComplete401 = UnauthorizedError;
export const MediaComplete401 = UnauthorizedError;
export type MediaComplete403 = ForbiddenError;
export const MediaComplete403 = ForbiddenError;
export type MediaComplete404 = ResourceNotFoundError;
export const MediaComplete404 = ResourceNotFoundError;
export type MediaComplete422 = ValidationError;
export const MediaComplete422 = ValidationError;
export type MediaComplete500 = InternalError;
export const MediaComplete500 = InternalError;
export type MediaComplete504 = GatewayTimeoutError;
export const MediaComplete504 = GatewayTimeoutError;
export type MediaDownloadUrlPathParams = { readonly id: MediaId };
export const MediaDownloadUrlPathParams = /* @__PURE__ */ (() => Schema.Struct({ id: MediaId }))();
export type MediaDownloadUrl200 = MediaDownloadUrl;
export const MediaDownloadUrl200 = MediaDownloadUrl;
export type MediaDownloadUrl401 = UnauthorizedError;
export const MediaDownloadUrl401 = UnauthorizedError;
export type MediaDownloadUrl403 = ForbiddenError;
export const MediaDownloadUrl403 = ForbiddenError;
export type MediaDownloadUrl404 = ResourceNotFoundError;
export const MediaDownloadUrl404 = ResourceNotFoundError;
export type MediaDownloadUrl422 = ValidationError;
export const MediaDownloadUrl422 = ValidationError;
export type MediaDownloadUrl500 = InternalError;
export const MediaDownloadUrl500 = InternalError;
export type MediaDownloadUrl504 = GatewayTimeoutError;
export const MediaDownloadUrl504 = GatewayTimeoutError;

export class MediaGroup extends HttpApiGroup.make("Media")
  .add(
    HttpApiEndpoint.post("mediaCreate", "/v1/media", {
      payload: MediaCreateRequestJson,
      success: MediaCreate201.pipe(HttpApiSchema.status(201)),
      error: [
        MediaCreate401.pipe(HttpApiSchema.status(401)),
        MediaCreate403.pipe(HttpApiSchema.status(403)),
        MediaCreate422.pipe(HttpApiSchema.status(422)),
        MediaCreate500,
        MediaCreate504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "media.create")
      .annotate(OpenApi.Summary, "Create a media object")
      .annotate(
        OpenApi.Description,
        "Creates the media object in the pending state and returns it with the upload instruction — URL, method, and headers — for putting its bytes into storage. Requires `messages:create`, or `email:send` for `attachment` media.",
      ),
    HttpApiEndpoint.get("mediaGetById", "/v1/media/:id", {
      params: MediaGetByIdPathParams,
      success: MediaGetById200,
      error: [
        MediaGetById401.pipe(HttpApiSchema.status(401)),
        MediaGetById403.pipe(HttpApiSchema.status(403)),
        MediaGetById404.pipe(HttpApiSchema.status(404)),
        MediaGetById422.pipe(HttpApiSchema.status(422)),
        MediaGetById500,
        MediaGetById504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "media.getById")
      .annotate(OpenApi.Summary, "Get a media object")
      .annotate(
        OpenApi.Description,
        "Returns the media object's metadata, including status, dimensions, and confirmation timestamps.",
      ),
    HttpApiEndpoint.delete("mediaRemove", "/v1/media/:id", {
      params: MediaRemovePathParams,
      success: MediaRemove200,
      error: [
        MediaRemove401.pipe(HttpApiSchema.status(401)),
        MediaRemove403.pipe(HttpApiSchema.status(403)),
        MediaRemove404.pipe(HttpApiSchema.status(404)),
        MediaRemove422.pipe(HttpApiSchema.status(422)),
        MediaRemove500,
        MediaRemove504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "media.remove")
      .annotate(OpenApi.Summary, "Delete a media object")
      .annotate(
        OpenApi.Description,
        "Deletes a pending media object and the bytes stored for it. Fails if the media object is already ready.",
      ),
    HttpApiEndpoint.post("mediaComplete", "/v1/media/:id/complete", {
      params: MediaCompletePathParams,
      success: MediaComplete200,
      error: [
        MediaComplete401.pipe(HttpApiSchema.status(401)),
        MediaComplete403.pipe(HttpApiSchema.status(403)),
        MediaComplete404.pipe(HttpApiSchema.status(404)),
        MediaComplete422.pipe(HttpApiSchema.status(422)),
        MediaComplete500,
        MediaComplete504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "media.complete")
      .annotate(OpenApi.Summary, "Complete a media upload")
      .annotate(
        OpenApi.Description,
        "Verifies the uploaded object exists in storage, marks the media object ready, and returns it with a download URL. Requires the permission that creating the media object did.",
      ),
    HttpApiEndpoint.get("mediaDownloadUrl", "/v1/media/:id/url", {
      params: MediaDownloadUrlPathParams,
      success: MediaDownloadUrl200,
      error: [
        MediaDownloadUrl401.pipe(HttpApiSchema.status(401)),
        MediaDownloadUrl403.pipe(HttpApiSchema.status(403)),
        MediaDownloadUrl404.pipe(HttpApiSchema.status(404)),
        MediaDownloadUrl422.pipe(HttpApiSchema.status(422)),
        MediaDownloadUrl500,
        MediaDownloadUrl504.pipe(HttpApiSchema.status(504)),
      ],
    })
      .middleware(ApiKeySecurityMiddleware)
      .annotate(OpenApi.Identifier, "media.downloadUrl")
      .annotate(OpenApi.Summary, "Get a media download URL")
      .annotate(
        OpenApi.Description,
        "Generates a presigned, time-limited download URL for a ready media object.",
      ),
  )
  .annotate(OpenApi.Description, "Media objects and the presigned uploads that fill them") {}
