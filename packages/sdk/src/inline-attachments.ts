/**
 * Shared, pure planning for email sends whose inline attachments exceed the API's inline cap.
 *
 * The API accepts a bounded number of decoded bytes as Base64 `content` per request (larger files
 * travel as owned media and are referenced by `mediaId`). Both clients call these helpers to decide
 * which inline attachments to upload through media before the single send request, so the choice
 * cannot drift between them. No Effect, no I/O.
 */

/** Decoded bytes of inline attachment `content` one send request may carry. */
export const INLINE_ATTACHMENT_MAX_BYTES = 4 * 1024 * 1024;

/** A failed upload of an attachment's bytes to its presigned media URL. */
export class MediaUploadError extends Error {
  readonly _tag = "MediaUploadError" as const;
  /** The attachment filename the upload was for. */
  readonly filename: string;
  readonly mediaId: string;
  /** The storage response status, absent when the request never completed. */
  readonly status: number | undefined;
  override readonly cause: unknown;

  constructor(input: {
    readonly filename: string;
    readonly mediaId: string;
    readonly status?: number | undefined;
    readonly cause?: unknown;
  }) {
    super(
      input.status === undefined
        ? `Uploading attachment "${input.filename}" (${input.mediaId}) failed before storage answered`
        : `Uploading attachment "${input.filename}" (${input.mediaId}) failed with storage status ${input.status}`,
      { cause: input.cause },
    );
    this.name = "MediaUploadError";
    this.filename = input.filename;
    this.mediaId = input.mediaId;
    this.status = input.status;
    this.cause = input.cause;
  }
}

/** One inline attachment chosen for upload. */
export interface InlineUpload {
  /** Position in `email.attachments`. */
  readonly index: number;
  readonly filename: string;
  readonly contentType: string;
  /** The decoded `content`, the bytes put to storage. */
  readonly bytes: Uint8Array;
  /** The attachment's declared `size`, the bytes the API charges against the inline cap. */
  readonly sizeBytes: number;
}

/** The presigned request `POST /v1/media` returns for putting the bytes into storage. */
export interface UploadInstruction {
  readonly url: string;
  readonly headers: Readonly<Record<string, string>>;
}

type AttachmentRecord = Record<string, unknown> & { readonly content?: unknown };

// oxlint-disable samva/no-hand-rolled-object-guard -- The payload was just assembled by the send builders; this shallow shape probe keeps the Promise entrypoint free of an Effect runtime dependency.
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;
// oxlint-enable samva/no-hand-rolled-object-guard

const attachmentsOf = (payload: Record<string, unknown>): ReadonlyArray<unknown> => {
  const email = payload.email;
  if (!isRecord(email)) return [];
  const attachments = email.attachments;
  return Array.isArray(attachments) ? attachments : [];
};

/** Decoded byte length of a Base64 string, without decoding it. */
export const decodedBase64Bytes = (content: string): number => {
  const length = content.length;
  if (length === 0) return 0;
  let padding = 0;
  if (content.endsWith("==")) padding = 2;
  else if (content.endsWith("=")) padding = 1;
  return Math.floor((length * 3) / 4) - padding;
};

/** The bytes `content` encodes, or `undefined` when it is not Base64. */
const base64ToBytes = (content: string): Uint8Array | undefined => {
  let binary: string;
  try {
    binary = atob(content);
  } catch {
    return undefined;
  }
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
};

/**
 * The inline attachments to upload so the rest fit under {@link INLINE_ATTACHMENT_MAX_BYTES}:
 * largest first, stopping as soon as the remaining inline total is within the cap. Empty when the
 * request is already within the cap, carries no inline content, or carries content that is not
 * Base64: nothing is uploaded for a request the API will refuse, and its 422 names the attachment.
 */
export const planInlineUploads = (
  payload: Record<string, unknown>,
): ReadonlyArray<InlineUpload> => {
  const inline: Array<Omit<InlineUpload, "bytes"> & { readonly content: string }> = [];
  for (const [index, entry] of attachmentsOf(payload).entries()) {
    if (!isRecord(entry)) continue;
    const attachment: AttachmentRecord = entry;
    if (typeof attachment.content !== "string") continue;
    if (attachment.mediaId !== undefined) return [];
    inline.push({
      index,
      filename: typeof attachment.filename === "string" ? attachment.filename : "attachment",
      contentType:
        typeof attachment.contentType === "string"
          ? attachment.contentType
          : "application/octet-stream",
      content: attachment.content,
      // The API charges the declared size, so plan on it; the decoded length stands in only when
      // the caller left it out, and the API then rejects the attachment.
      sizeBytes:
        typeof attachment.size === "number"
          ? attachment.size
          : decodedBase64Bytes(attachment.content),
    });
  }

  let remaining = inline.reduce((total, upload) => total + upload.sizeBytes, 0);
  if (remaining <= INLINE_ATTACHMENT_MAX_BYTES) return [];

  const chosen: Array<InlineUpload> = [];
  const largestFirst = [...inline].sort(
    (left, right) => right.sizeBytes - left.sizeBytes || left.index - right.index,
  );
  for (const { content, ...upload } of largestFirst) {
    if (remaining <= INLINE_ATTACHMENT_MAX_BYTES) break;
    const bytes = base64ToBytes(content);
    if (bytes === undefined) return [];
    chosen.push({ ...upload, bytes });
    remaining -= upload.sizeBytes;
  }
  return chosen;
};

/** The `POST /v1/media` body for an inline attachment. */
export const mediaCreateBody = (upload: InlineUpload) => ({
  filename: upload.filename,
  contentType: upload.contentType,
  sizeBytes: upload.sizeBytes,
  purpose: "attachment" as const,
});

/** The `Content-Type` of the presigned request, for clients that set it from the body. */
export const uploadContentType = (headers: Readonly<Record<string, string>>): string | undefined =>
  Object.entries(headers).find(([name]) => name.toLowerCase() === "content-type")?.[1];

/** Replace each uploaded attachment with its `mediaId` form; everything else is untouched. */
export const withUploadedAttachments = (
  payload: Record<string, unknown>,
  uploaded: ReadonlyMap<number, { readonly mediaId: string; readonly upload: InlineUpload }>,
): Record<string, unknown> => {
  const email = payload.email as Record<string, unknown>;
  const attachments = (email.attachments as ReadonlyArray<unknown>).map((entry, index) => {
    const replacement = uploaded.get(index);
    if (replacement === undefined) return entry;
    const { content: _content, ...rest } = entry as AttachmentRecord;
    return { ...rest, mediaId: replacement.mediaId };
  });
  return { ...payload, email: { ...email, attachments } };
};
