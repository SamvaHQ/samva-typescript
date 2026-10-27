/**
 * Shared, pure send-input normalization for the Effect and Promise clients.
 *
 * No Effect, no I/O — plain functions. Both ergonomic layers import these
 * directly so recipient, replyTo, and email-content shaping cannot drift
 * between the two clients. The wire-level parity tests are the proof.
 *
 * The generated payload types differ nominally between the two clients (they come
 * from two different codegen outputs) but are structurally identical, so these
 * builders return structural shapes and each client casts the assembled payload
 * to its own generated body type at the call site.
 */

/** A recipient the caller may pass in ergonomic form. */
type ErgonomicRecipient<Recipient> = Recipient | { readonly id: string } | string;

type ErgonomicReplyTo = string | ReadonlyArray<string>;
export type ErgonomicEmailList = string | ReadonlyArray<string>;

function toRecipientArray<Recipient extends object>(
  recipient: ErgonomicRecipient<Recipient> | ReadonlyArray<ErgonomicRecipient<Recipient>>,
): ReadonlyArray<ErgonomicRecipient<Recipient>> {
  return Array.isArray(recipient) ? recipient : [recipient as ErgonomicRecipient<Recipient>];
}

function normalizeMessageRecipient<Recipient extends object>(
  recipient: ErgonomicRecipient<Recipient>,
): Recipient {
  if (typeof recipient === "string") {
    return { email: recipient } as Recipient;
  }

  if ("contactId" in recipient || "email" in recipient || "phone" in recipient) {
    return recipient as Recipient;
  }

  return { contactId: (recipient as { readonly id: string }).id } as Recipient;
}

function normalizeRecipients<Recipient extends object>(
  recipient: ErgonomicRecipient<Recipient> | ReadonlyArray<ErgonomicRecipient<Recipient>>,
): Array<Recipient> {
  return toRecipientArray<Recipient>(recipient).map((item) =>
    normalizeMessageRecipient<Recipient>(item),
  );
}

/**
 * cc / bcc payload fragment. `undefined` → omitted (JSON drops it anyway),
 * `null` → passed through (explicit "no recipients"), otherwise normalized.
 * This is the single canonical rule for both clients.
 */
function ccBccPayload<Recipient extends object, Key extends "cc" | "bcc">(
  key: Key,
  value:
    | ErgonomicRecipient<Recipient>
    | ReadonlyArray<ErgonomicRecipient<Recipient>>
    | null
    | undefined,
): { readonly [K in Key]?: Array<Recipient> | null } {
  if (value === undefined) return {} as { readonly [K in Key]?: Array<Recipient> | null };
  if (value === null) return { [key]: null } as { readonly [K in Key]?: Array<Recipient> | null };
  return { [key]: normalizeRecipients<Recipient>(value) } as {
    readonly [K in Key]?: Array<Recipient> | null;
  };
}

function normalizeReplyTo(
  replyTo: ErgonomicReplyTo | null | undefined,
): Array<string> | null | undefined {
  if (replyTo === undefined || replyTo === null) return replyTo;
  return typeof replyTo === "string" ? [replyTo] : [...replyTo];
}

function normalizeEmailList(
  value: ErgonomicEmailList | null | undefined,
): Array<string> | null | undefined {
  if (value === undefined || value === null) return value;
  return typeof value === "string" ? [value] : [...value];
}

/** replyToEmails fragment for the addSender input. `undefined` → omitted. */
export function replyToEmailsPayload(replyToEmails: ErgonomicEmailList | null | undefined): {
  readonly replyToEmails?: Array<string> | null;
} {
  const normalized = normalizeEmailList(replyToEmails);
  return normalized === undefined ? {} : { replyToEmails: normalized };
}

function replyToPayload(replyTo: ErgonomicReplyTo | null | undefined): {
  readonly replyTo?: Array<string> | null;
} {
  const normalized = normalizeReplyTo(replyTo);
  return normalized === undefined ? {} : { replyTo: normalized };
}

/** Email content sub-object: fold ergonomic `replyTo` (string | string[]) to a list. */
type EmailContentInput = {
  readonly replyTo?: ErgonomicReplyTo | null | undefined;
  readonly [key: string]: unknown;
};

function normalizeEmailContent(input: EmailContentInput): Record<string, unknown> {
  const { replyTo, ...emailContent } = input;
  return {
    ...emailContent,
    ...replyToPayload(replyTo),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Send-payload builders. Each returns a fully assembled email message payload;
// callers cast the result to their generated body type.
// ─────────────────────────────────────────────────────────────────────────────

type Metadata = Record<string, unknown> | null | undefined;

export interface EmailSendFields<Recipient> {
  readonly to: ErgonomicRecipient<Recipient> | ReadonlyArray<ErgonomicRecipient<Recipient>>;
  readonly cc?:
    | ErgonomicRecipient<Recipient>
    | ReadonlyArray<ErgonomicRecipient<Recipient>>
    | null
    | undefined;
  readonly bcc?:
    | ErgonomicRecipient<Recipient>
    | ReadonlyArray<ErgonomicRecipient<Recipient>>
    | null
    | undefined;
  readonly conversationId?: string | null | undefined;
  readonly metadata?: Metadata;
  readonly from?: unknown;
  readonly replyTo?: ErgonomicReplyTo | null | undefined;
  readonly [key: string]: unknown;
}

export function buildEmailSendPayload<Recipient extends object>(
  input: EmailSendFields<Recipient>,
): Record<string, unknown> {
  const { to, cc, bcc, conversationId, metadata, from, ...emailContent } = input;
  return {
    channel: "email",
    conversationId,
    metadata,
    from,
    to: normalizeRecipients<Recipient>(to),
    ...ccBccPayload<Recipient, "cc">("cc", cc),
    ...ccBccPayload<Recipient, "bcc">("bcc", bcc),
    email: normalizeEmailContent(emailContent),
  };
}

/**
 * Unified `messages.send` payload: the caller provides the email-shaped body,
 * so only recipients and email content are normalized.
 */
export interface MessagesSendFields<Recipient> {
  readonly channel: "email";
  readonly to: ErgonomicRecipient<Recipient> | ReadonlyArray<ErgonomicRecipient<Recipient>>;
  readonly cc?:
    | ErgonomicRecipient<Recipient>
    | ReadonlyArray<ErgonomicRecipient<Recipient>>
    | null
    | undefined;
  readonly bcc?:
    | ErgonomicRecipient<Recipient>
    | ReadonlyArray<ErgonomicRecipient<Recipient>>
    | null
    | undefined;
  readonly email?: EmailContentInput;
  readonly [key: string]: unknown;
}

export function buildMessagesSendPayload<Recipient extends object>(
  input: MessagesSendFields<Recipient>,
): Record<string, unknown> {
  const base = {
    ...input,
    to: normalizeRecipients<Recipient>(input.to),
  };
  return {
    ...base,
    ...ccBccPayload<Recipient, "cc">("cc", input.cc),
    ...ccBccPayload<Recipient, "bcc">("bcc", input.bcc),
    email: normalizeEmailContent(input.email ?? {}),
  };
}
