import { Effect } from "effect";

import {
  type InlineUpload,
  type MediaUploadError,
  mediaCreateBody,
  planInlineUploads,
  withUploadedAttachments,
} from "../../inline-attachments";
import { buildEmailSendPayload, buildMessagesSendPayload } from "../../normalize";
import { MediaGroup } from "../generated/media";
import { MessagesGroup } from "../generated/messages";
import type { SendMessagePayload } from "../generated/shared";
import { generateIdempotencyKey, withRetry } from "../retry";
import { type Interface, Service } from "./client";
import { callEndpoint, type OperationResult, stripUndefined } from "./operation";

type MessagePayload = typeof SendMessagePayload.Encoded;
export type MessageRecipient = MessagePayload["to"][number];
type ContactObjectRecipient = { readonly id: string };
type ErgonomicMessageRecipient = MessageRecipient | ContactObjectRecipient | string;
type EmailPayload = Extract<MessagePayload, { readonly channel: "email" }>;
type ErgonomicReplyTo = string | ReadonlyArray<string>;
export type ErgonomicEmailList = string | ReadonlyArray<string>;
type ErgonomicEmailContent = Omit<EmailPayload["email"], "replyTo"> & {
  readonly replyTo?: ErgonomicReplyTo | null | undefined;
};

export interface SendOptions {
  readonly idempotencyKey?: string;
}

export type MessageSendInput = Omit<EmailPayload, "to" | "cc" | "bcc" | "email"> & {
  readonly to: ErgonomicMessageRecipient | ReadonlyArray<ErgonomicMessageRecipient>;
  readonly cc?: ErgonomicMessageRecipient | ReadonlyArray<ErgonomicMessageRecipient> | null;
  readonly bcc?: ErgonomicMessageRecipient | ReadonlyArray<ErgonomicMessageRecipient> | null;
  readonly email: ErgonomicEmailContent;
};

export type EmailSendInput = Omit<EmailPayload, "channel" | "email" | "to" | "cc" | "bcc"> &
  ErgonomicEmailContent & {
    readonly to: ErgonomicMessageRecipient | ReadonlyArray<ErgonomicMessageRecipient>;
    readonly cc?: ErgonomicMessageRecipient | ReadonlyArray<ErgonomicMessageRecipient>;
    readonly bcc?: ErgonomicMessageRecipient | ReadonlyArray<ErgonomicMessageRecipient>;
  };

type SendResult = OperationResult<"messagesSend">;

type CreatedUpload = {
  readonly id: string;
  readonly upload: {
    readonly url: string;
    readonly method: string;
    readonly headers: Readonly<Record<string, string>>;
  };
};

type UploadFailure = MediaUploadError | Effect.Error<SendResult>;

/**
 * Inline attachment content over the API's request cap travels as media instead: the largest
 * attachments are uploaded (create, put to the presigned URL, complete) and replaced by their
 * `mediaId`. The returned payload is the one request every send attempt reuses, so nothing is
 * uploaded twice.
 */
const uploadOversizedAttachments = (
  client: Interface,
  payload: Record<string, unknown>,
): Effect.Effect<Record<string, unknown>, UploadFailure, Service> =>
  Effect.gen(function* () {
    const plan = planInlineUploads(payload);
    if (plan.length === 0) return payload;
    const uploaded = new Map<number, { mediaId: string; upload: InlineUpload }>();
    for (const upload of plan) {
      const created = (yield* callEndpoint(MediaGroup, "mediaCreate", {
        payload: mediaCreateBody(upload),
      })) as CreatedUpload;
      yield* client.putUpload({
        filename: upload.filename,
        mediaId: created.id,
        url: created.upload.url,
        method: created.upload.method,
        headers: created.upload.headers,
        bytes: upload.bytes,
      });
      yield* callEndpoint(MediaGroup, "mediaComplete", { params: { id: created.id } });
      uploaded.set(upload.index, { mediaId: created.id, upload });
    }
    return withUploadedAttachments(payload, uploaded);
  }) as Effect.Effect<Record<string, unknown>, UploadFailure, Service>;

const sendPayload = (
  payload: Record<string, unknown>,
  options?: SendOptions,
): Effect.Effect<Effect.Success<SendResult>, UploadFailure, Service> =>
  Effect.gen(function* () {
    const client = yield* Service;
    const idempotencyKey =
      options?.idempotencyKey ??
      client.idempotency?.("messagesSend") ??
      (yield* generateIdempotencyKey);
    // Uploads run once, outside the retry, so a retried send reuses the same media ids.
    const prepared = yield* uploadOversizedAttachments(client, payload);
    return yield* withRetry(
      callEndpoint(MessagesGroup, "messagesSend", {
        payload: stripUndefined(prepared as MessagePayload),
        headers: { "idempotency-key": idempotencyKey },
      }) as Effect.Effect<Effect.Success<SendResult>, Effect.Error<SendResult>, Service>,
    );
  });

export const sendMessage = Effect.fn("Messages.send")(function* (
  input: MessageSendInput,
  options?: SendOptions,
) {
  return yield* sendPayload(buildMessagesSendPayload<MessageRecipient>(input), options);
});

export const sendEmail = Effect.fn("Email.send")(function* (
  input: EmailSendInput,
  options?: SendOptions,
) {
  return yield* sendPayload(buildEmailSendPayload<MessageRecipient>(input), options);
});
