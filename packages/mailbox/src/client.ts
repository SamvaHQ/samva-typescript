import type { ActionResolution, MailboxActor, CampaignAttribution } from "./types";

/* oxlint-disable samva/no-try-catch-or-throw -- the Promise HTTP client exposes transport and API failures as rejected public calls */
/* oxlint-disable samva/no-error-constructor -- clientForEvent reports misuse of the public Promise client factory with its native Error failure surface */
/* oxlint-disable samva/no-hand-rolled-object-guard -- the dependency-free HTTP client inspects untrusted JSON only to recover optional API error fields */

type AttachmentPayload = {
  readonly filename: string;
  readonly contentType: string;
  readonly size: number;
  readonly content?: string | undefined;
  readonly mediaId?: string | undefined;
};
type EmailBodyPayload = {
  readonly text?: string | undefined;
  readonly html?: string | undefined;
  readonly attachments?: readonly AttachmentPayload[] | undefined;
  readonly cc?: readonly string[] | undefined;
  readonly bcc?: readonly string[] | undefined;
};
export type ReplyPayload = EmailBodyPayload & { readonly channel?: "email" | undefined };
export type ForwardPayload = EmailBodyPayload & { readonly to: readonly [string, ...string[]] };
export type SendPayload = ReplyPayload & {
  readonly to: readonly [string, ...string[]];
  readonly subject: string;
  readonly replyTo?: readonly string[] | undefined;
};
/* oxlint-disable samva/prefer-effect-native-tagged-data -- the published dependency-free client describes encoded API refusals without importing Effect runtime constructors */
/** The original send refusal, including its tag and recovery guidance. */
export type SendRefusal =
  | {
      readonly _tag: "SenderNotReadyError";
      readonly message: string;
      readonly sender: string;
      readonly retryAfterSeconds?: number | undefined;
    }
  | {
      readonly _tag: "RateLimitedError";
      readonly message: string;
      readonly retryAfterSeconds: number;
    }
  | {
      readonly _tag: "OnboardingReviewRequiredError";
      readonly message: string;
      readonly code:
        | "review_required"
        | "review_in_progress"
        | "information_required"
        | "review_rejected"
        | "identity_review_required"
        | "identity_review_rejected"
        | "identity_changed";
      readonly decision: "undecided" | "approved" | "rejected";
      readonly stage:
        | "collecting"
        | "automated_review"
        | "manual_review"
        | "information_requested"
        | "complete";
      readonly nextAction:
        | "wait_for_review"
        | "provide_information"
        | "verify_sending_identity"
        | "reapply"
        | "contact_support";
      readonly identityId?: string | undefined;
    }
  | {
      readonly _tag: "PaymentRequiredError";
      readonly message: string;
      readonly resource: string;
      readonly currentUsage: number;
      readonly limit: number;
    }
  | {
      readonly _tag: "ValidationError";
      readonly message: string;
      readonly fields?: { readonly [key: string]: readonly string[] } | undefined;
    }
  | { readonly _tag: "ForbiddenError"; readonly message: string }
  | {
      readonly _tag: "ResourceNotFoundError";
      readonly resource: string;
      readonly id: string;
      readonly message: string;
    };
export type SendResult = {
  readonly actionId: string;
  readonly messageId: string | null;
  readonly draftId: string | null;
  readonly threadId: string | null;
  readonly state:
    | "approvalRequired"
    | "queued"
    | "accepted"
    | "completed"
    | "notSent"
    | "uncertain";
  readonly acceptedAt: string | null;
  readonly executeUntil: string | null;
  readonly retryAt: string | null;
  readonly problem: {
    readonly code: string;
    readonly message: string;
    readonly error?: SendRefusal | undefined;
  } | null;
  readonly retryEligible: boolean;
  readonly decision: {
    readonly outcome: "allow" | "requireApproval" | "deny";
    readonly reason: string | null;
    readonly policyId: string | null;
    readonly source: "grant" | "installation" | "policy" | null;
    readonly decidedAt: string;
  } | null;
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
  readonly skippedRecipients: readonly {
    readonly address: string;
    readonly reason: "bounce" | "complaint" | "unsubscribe" | "manual" | "topic-unsubscribe";
    readonly topicId?: string | undefined;
  }[];
  readonly createdAt: string;
  readonly updatedAt: string;
};
export type EmailSendIntent = {
  readonly channel: "email";
  readonly draftRevision: number;
  readonly from: string;
  readonly fromName: string | null;
  readonly to: readonly [string, ...string[]];
  readonly cc: readonly string[];
  readonly bcc: readonly string[];
  readonly replyTo: readonly string[];
  readonly subject: string;
  readonly text: string | null;
  readonly html: string | null;
  readonly attachments: readonly AttachmentPayload[];
  readonly threadId: string | null;
  readonly conversationId: string | null;
  readonly inReplyToMessageId: string | null;
};
/** A WhatsApp or SMS send frozen at admission: one recipient and free-form text or a template. */
export type ChatSendIntent = {
  readonly channel: "whatsapp" | "sms";
  readonly draftRevision: number;
  readonly endpointId: string;
  readonly sender:
    | { readonly channel: "whatsapp"; readonly businessAccountId: string }
    | { readonly channel: "sms"; readonly phoneNumberId: string };
  readonly from: string;
  readonly to: string;
  readonly text: string | null;
  readonly template: {
    readonly templateId: string;
    /** The content Meta approved when the send was proposed; only that content sends. */
    readonly templateChannelVariantId: string;
    readonly templateData: { readonly [key: string]: JsonValue } | null;
  } | null;
  readonly threadId: string | null;
  readonly conversationId: string | null;
  readonly inReplyToMessageId: string | null;
};
export type SendIntent = EmailSendIntent | ChatSendIntent;
// oxlint-disable-next-line samva/no-id-casts-or-jsonvalue -- this package ships dependency-free to npm, so it cannot use Effect's Schema.Json
type JsonValue =
  | null
  | boolean
  | number
  | string
  | readonly JsonValue[]
  | { readonly [key: string]: JsonValue };
type ActionCommon = {
  readonly id: string;
  readonly source:
    | "humanUi"
    | "externalApi"
    | "aiSdkTool"
    | "extension"
    | "externalAgent"
    | "samvaManagedAgent"
    | "system";
  readonly proposedBy: MailboxActor;
  readonly threadId: string | null;
  readonly draftId: string | null;
  readonly decision: SendResult["decision"];
  /** How a held action's approval ended; null while it waits and when it never needed one. */
  readonly resolution: ActionResolution | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};
export type MailboxAction = ActionCommon &
  (
    | {
        readonly type: "sendMessage" | "reply";
        readonly state: SendResult["state"];
        readonly send: SendResult;
        readonly intent: SendIntent | null;
      }
    | {
        readonly type:
          | "updateDraft"
          | "createNote"
          | "assignThread"
          | "changeThreadState"
          | "call"
          | "extensionRequest"
          | "toolCall";
        /** The tool a `toolCall` runs; null for every other action type. */
        readonly tool: {
          readonly name: string;
          readonly argumentsHash: string;
          readonly arguments: { readonly [key: string]: unknown };
        } | null;
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
      }
  );
type MailboxChannel = "email" | "whatsapp" | "sms";
type MessageAddress = {
  readonly address: string;
  readonly displayName?: string | undefined;
  readonly actor?: MailboxActor | undefined;
};
export type EmailMessage = {
  readonly campaign?: CampaignAttribution | undefined;
  readonly id: string;
  readonly channel: "email";
  readonly threadId: string;
  readonly conversationId: string;
  readonly direction: "inbound" | "outbound";
  readonly from: MessageAddress;
  readonly recipients: readonly (MessageAddress & { readonly kind: "to" | "cc" | "bcc" })[];
  readonly replyTo: readonly string[];
  readonly subject?: string | undefined;
  readonly text?: string | undefined;
  readonly html?: string | undefined;
  readonly replyText?: string | undefined;
  readonly headers: {
    readonly messageId: string | null;
    readonly inReplyTo: string | null;
    readonly references: readonly string[];
  };
  readonly authentication: {
    readonly spf: string | null;
    readonly dkim: string | null;
    readonly dmarc: string | null;
  } | null;
  readonly attachments: readonly {
    readonly id: string;
    readonly filename: string;
    readonly contentType: string;
    readonly size: number;
    readonly isInline: boolean;
  }[];
  readonly sentBy?: MailboxActor | undefined;
  readonly occurredAt: string;
};
/** A WhatsApp or SMS message: text and media metadata, with no subject or headers. */
export type ChatMessage = {
  readonly campaign?: CampaignAttribution | undefined;
  readonly id: string;
  readonly channel: "whatsapp" | "sms";
  readonly threadId: string;
  readonly conversationId: string;
  readonly direction: "inbound" | "outbound";
  readonly from: MessageAddress;
  readonly sentBy?: MailboxActor | undefined;
  readonly occurredAt: string;
  readonly to: readonly string[];
  readonly text: string | null;
  readonly media: readonly {
    readonly type: string;
    readonly contentType: string | null;
    readonly filename: string | null;
    readonly caption: string | null;
  }[];
  readonly template: { readonly name: string; readonly language: string } | null;
  /** A readable line for an answer, reaction, location, contact card, or form response. */
  readonly summary: string | null;
  readonly contextMessageId: string | null;
};
export type Message = EmailMessage | ChatMessage;
export type MessageSummary = {
  readonly campaign?: CampaignAttribution | undefined;
  readonly id: string;
  readonly channel: MailboxChannel;
  readonly direction: "inbound" | "outbound";
  readonly from: MessageAddress;
  readonly to: readonly string[];
  readonly subject: string | null;
  readonly preview: string | null;
  readonly hasAttachments: boolean;
  readonly occurredAt: string;
};
type ThreadFolder = "inbox" | "assigned" | "pending" | "sent" | "archived" | "trash";
type ThreadPriority = "low" | "normal" | "high" | "urgent";
export type ThreadSummary = {
  readonly id: string;
  readonly channel: MailboxChannel;
  readonly endpointId: string | null;
  readonly subject: string | null;
  readonly preview: string | null;
  readonly from: { readonly address: string | null; readonly displayName: string | null } | null;
  readonly messageCount: number;
  readonly hasAttachments: boolean;
  readonly hasDraft: boolean;
  readonly folder: ThreadFolder;
  readonly priority: ThreadPriority;
  readonly labels: readonly string[];
  readonly read: boolean;
  readonly starred: boolean;
  readonly snoozedUntil: string | null;
  readonly lastActivityAt: string;
};
export type MailboxThread = ThreadSummary & {
  readonly conversationId: string;
  readonly participants: readonly {
    readonly actor: MailboxActor;
    readonly role: "recipient" | "sender" | "assignee" | "observer";
    readonly address?: string | undefined;
  }[];
  /** Whether a free-form reply can go out on a WhatsApp thread; null on every other channel. */
  readonly whatsappServiceWindow: {
    readonly open: boolean;
    readonly expiresAt: string | null;
  } | null;
  readonly createdAt: string;
};
/**
 * Where a thread stands after a write: its folder, priority, labels, and the caller's own read,
 * star, and snooze. Read the full thread with `threads.get`.
 */
export type MailboxThreadState = Pick<
  ThreadSummary,
  "id" | "folder" | "priority" | "labels" | "read" | "starred" | "snoozedUntil"
>;
/** A page request: `cursor` is the previous page's `nextCursor`. */
export type PageQuery = {
  readonly limit?: number | undefined;
  readonly cursor?: string | undefined;
};
export type ThreadQuery = PageQuery & {
  readonly after?: string | undefined;
  readonly before?: string | undefined;
  readonly q?: string | undefined;
  readonly folder?: ThreadFolder | undefined;
  readonly label?: string | undefined;
  readonly unread?: boolean | undefined;
  readonly starred?: boolean | undefined;
  readonly snoozed?: boolean | undefined;
};
export type ThreadList = {
  readonly items: readonly ThreadSummary[];
  readonly nextCursor: string | null;
};
export type ThreadMessages = {
  readonly items: readonly MessageSummary[];
  readonly nextCursor: string | null;
};
export type ThreadContent = {
  readonly items: readonly Message[];
  readonly nextCursor: string | null;
};
export type ThreadUpdate = {
  readonly folder?: ThreadFolder | undefined;
  readonly priority?: ThreadPriority | undefined;
  readonly read?: boolean | undefined;
  readonly starred?: boolean | undefined;
  readonly snoozedUntil?: string | null | undefined;
};
export type Fetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
export interface SendOptions {
  idempotencyKey?: string;
}
export interface ClientOptions {
  fetch: Fetch;
  baseUrl: string;
  headers?: HeadersInit;
  idempotency?: (method: string) => string;
}
export class SamvaApiError extends Error {
  override readonly name = "SamvaApiError";
  constructor(
    readonly status: number,
    readonly code: string | undefined,
    message: string,
    readonly body: unknown,
    readonly retryAfter: string | null = null,
  ) {
    super(message);
  }
}
const configurations = new WeakMap<SamvaClient, ClientOptions>();
export function createSamvaClient(options: ClientOptions) {
  async function request<T>(
    method: string,
    path: string,
    body?: unknown,
    key?: string,
  ): Promise<T> {
    const headers = new Headers(options.headers);
    if (body !== undefined) headers.set("content-type", "application/json");
    if (key !== undefined) headers.set("Idempotency-Key", key);
    const response = await options.fetch(new URL(options.baseUrl.replace(/\/$/, "") + path), {
      method,
      headers,
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
    const text = await response.text();
    let value: unknown;
    try {
      value = text ? JSON.parse(text) : null;
    } catch {
      value = text;
    }
    if (!response.ok) {
      const error = typeof value === "object" && value !== null ? value : {};
      // The API and the extension host name an error by its `_tag`.
      const code = "_tag" in error && typeof error._tag === "string" ? error._tag : undefined;
      const message =
        "message" in error && typeof error.message === "string"
          ? error.message
          : `Samva API returned ${response.status}`;
      throw new SamvaApiError(
        response.status,
        code,
        message,
        value,
        response.headers.get("retry-after"),
      );
    }
    // The API owns response validation; these types describe its encoded HTTP contract.
    return value as T;
  }
  const mailbox = (id: string) => `/v1/mailboxes/${encodeURIComponent(id)}`;
  const message = (id: string, msg: string) => `${mailbox(id)}/messages/${encodeURIComponent(msg)}`;
  const thread = (id: string, tid: string) => `${mailbox(id)}/threads/${encodeURIComponent(tid)}`;
  const search = (query: Record<string, string | number | boolean | undefined>) => {
    const params = new URLSearchParams();
    for (const [name, value] of Object.entries(query))
      if (value !== undefined) params.set(name, String(value));
    return params.size ? `?${params}` : "";
  };
  const key = (method: string, explicit?: SendOptions) => {
    const generated = options.idempotency?.(method);
    return explicit?.idempotencyKey ?? generated ?? crypto.randomUUID();
  };
  const client = {
    messages: {
      get: (id: string, msg: string) => request<Message>("GET", message(id, msg)),
      reply: (id: string, msg: string, body: ReplyPayload, opts?: SendOptions) =>
        request<SendResult>("POST", `${message(id, msg)}/reply`, body, key("reply", opts)),
      replyAll: (id: string, msg: string, body: ReplyPayload, opts?: SendOptions) =>
        request<SendResult>("POST", `${message(id, msg)}/reply-all`, body, key("replyAll", opts)),
      forward: (id: string, msg: string, body: ForwardPayload, opts?: SendOptions) =>
        request<SendResult>("POST", `${message(id, msg)}/forward`, body, key("forward", opts)),
      send: (id: string, body: SendPayload, opts?: SendOptions) =>
        request<SendResult>("POST", `${mailbox(id)}/messages`, body, key("send", opts)),
    },
    actions: {
      get: (id: string, actionId: string) =>
        request<MailboxAction>("GET", `${mailbox(id)}/actions/${encodeURIComponent(actionId)}`),
      /** Only a permitted person can cancel; installation tokens and API keys are refused. */
      cancel: (id: string, actionId: string) =>
        request<SendResult>(
          "POST",
          `${mailbox(id)}/actions/${encodeURIComponent(actionId)}/cancel`,
        ),
      /** Only a permitted person can resume an eligible ended execution; never submits replacement content. */
      retry: (id: string, actionId: string) =>
        request<SendResult>("POST", `${mailbox(id)}/actions/${encodeURIComponent(actionId)}/retry`),
    },
    threads: {
      get: (id: string, tid: string) => request<MailboxThread>("GET", thread(id, tid)),
      list: (id: string, query: ThreadQuery = {}) =>
        request<ThreadList>("GET", `${mailbox(id)}/threads${search(query)}`),
      messages: (id: string, tid: string, query: PageQuery = {}) =>
        request<ThreadMessages>("GET", `${thread(id, tid)}/messages${search(query)}`),
      content: (id: string, tid: string, query: PageQuery = {}) =>
        request<ThreadContent>("GET", `${thread(id, tid)}/content${search(query)}`),
      update: (id: string, tid: string, body: ThreadUpdate) =>
        request<MailboxThreadState>("PATCH", thread(id, tid), body),
    },
  };
  configurations.set(client, options);
  return client;
}
export type SamvaClient = ReturnType<typeof createSamvaClient>;
export function clientForEvent(client: SamvaClient, eventId: string): SamvaClient {
  const options = configurations.get(client);
  if (!options) throw new Error("Dispatch requires a client created by createSamvaClient");
  const counts = new Map<string, number>();
  return createSamvaClient({
    ...options,
    idempotency(method) {
      const n = (counts.get(method) ?? 0) + 1;
      counts.set(method, n);
      return `${eventId}:${method}:${n}`;
    },
  });
}
