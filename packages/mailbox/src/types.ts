import type { SamvaClient, SendResult } from "./client";

export type ExtensionManifest = {
  readonly name: string;
  readonly displayName: string;
  readonly description?: string | undefined;
  readonly version: string;
  readonly runtime: "hosted" | "webhook";
  readonly events: readonly EventType[];
  readonly permissions: readonly ("read" | "update" | "send" | "quarantine.read")[];
};
export type Invocation = {
  readonly eventId: string;
  readonly attempt: number;
  readonly body: string;
};
export type DispatchResult = {
  readonly ok: boolean;
  readonly error?: string | undefined;
  readonly logs: readonly string[];
};
export type MailboxActor = {
  readonly kind: "user" | "apiKey" | "extension" | "externalAgent" | "samvaAgent" | "system";
  readonly id: string;
  readonly displayName?: string | undefined;
};
type WebhookActor = MailboxActor & {
  readonly source:
    | "humanUi"
    | "externalApi"
    | "externalAgent"
    | "extension"
    | "samvaManagedAgent"
    | "system";
};
/** How a held action's approval ended, and who ended it. */
export type ActionResolution = {
  readonly outcome: "approved" | "denied" | "cancelled";
  readonly actor: WebhookActor;
  readonly resolvedAt: string;
  /** The denial reason; null for an approval or a cancellation. */
  readonly reason: string | null;
};
export type CampaignAttribution = { readonly campaignId: string; readonly runId: string };

type WebhookMessage = {
  readonly campaign?: CampaignAttribution | undefined;
  readonly id: string;
  /** Deliveries recorded before the field existed omit it; they are email. */
  readonly channel?: "email" | "whatsapp" | "sms";
  readonly threadId: string;
  readonly from: { readonly address: string; readonly name?: string | undefined };
  readonly to: readonly string[];
  readonly cc: readonly string[];
  readonly subject: string | null;
  readonly text: string | null;
  readonly replyText: string | null;
  readonly attachments: readonly {
    readonly id: string;
    readonly filename: string;
    readonly contentType: string;
    readonly size: number;
  }[];
  readonly occurredAt: string;
};
type WebhookThread = {
  readonly id: string;
  /** The endpoint the message arrived at; null once it is removed. */
  readonly endpointId?: string | null;
  readonly subject: string | null;
  readonly preview: string | null;
};
type MailboxEventScope = { readonly mailboxId: string; readonly namespaceId: string | null };
type QuarantineReason =
  | "spam"
  | "dmarc"
  | "virus"
  | "virus_unscanned"
  | "phishing"
  | "fraud"
  | "prompt_injection";
export type EventData = {
  "mailbox.message.received": MailboxEventScope & {
    readonly message: WebhookMessage;
    readonly thread: WebhookThread;
  };
  "mailbox.message.sent": MailboxEventScope & {
    readonly state?: "completed";
    readonly acceptedAt?: string;
    readonly actionId: string;
    readonly actor: WebhookActor;
    readonly message: WebhookMessage;
  };
  "mailbox.action.pending_approval": MailboxEventScope & {
    readonly action: {
      readonly state?: "approvalRequired";
      readonly decision?: NonNullable<SendResult["decision"]>;
      readonly id: string;
      readonly type:
        | "sendMessage"
        | "reply"
        | "updateDraft"
        | "createNote"
        | "assignThread"
        | "changeThreadState"
        | "call"
        | "extensionRequest"
        | "toolCall";
      readonly threadId: string | null;
      readonly reason: string | null;
      readonly proposedBy: WebhookActor;
      readonly createdAt: string;
    };
    /** Who a held send goes to; null for a held tool call. */
    readonly draft: {
      readonly to: readonly string[];
      readonly cc: readonly string[];
      readonly subject: string | null;
    } | null;
    /** The tool a held tool call runs and its arguments; null for a held send. */
    readonly tool?: {
      readonly name: string;
      readonly argumentsHash: string;
      readonly arguments: { readonly [key: string]: unknown };
    } | null;
  };
  "mailbox.action.resolved": MailboxEventScope & {
    readonly action: {
      readonly id: string;
      readonly type: EventData["mailbox.action.pending_approval"]["action"]["type"];
      readonly threadId: string | null;
      readonly proposedBy: WebhookActor;
      readonly createdAt: string;
    };
    readonly resolution: ActionResolution;
  };
  "mailbox.message.quarantined": MailboxEventScope & {
    readonly disposition: "quarantined" | "isolated";
    readonly reason: QuarantineReason;
    readonly source: "receipt" | "classifier";
    readonly message: {
      readonly id: string;
      readonly from: { readonly address: string; readonly name?: string | undefined };
      readonly subject: string | null;
      readonly receivedAt: string;
    };
  };
  "mailbox.message.released": MailboxEventScope & {
    readonly releasedBy: WebhookActor;
    readonly reason: QuarantineReason;
    readonly message: WebhookMessage;
    readonly thread: WebhookThread;
  };
  "mailbox.message.discarded": MailboxEventScope & {
    readonly discardedBy: WebhookActor;
    readonly disposition: "quarantined" | "isolated";
    readonly reason: QuarantineReason;
    readonly message: {
      readonly id: string;
      readonly from: { readonly address: string; readonly name?: string | undefined };
      readonly subject: string | null;
      readonly receivedAt: string;
    };
  };
};
export type EventType = keyof EventData;
export type ExtensionEvent<T extends EventType = EventType> = {
  [K in T]: { id: string; type: K; timestamp: string; data: EventData[K] };
}[T];
export interface HandlerContext<T extends EventType = EventType> {
  samva: SamvaClient;
  log: (...args: unknown[]) => void;
  event: ExtensionEvent<T>;
  attempt: number;
}
export type ExtensionHandlers<T extends EventType = EventType> = {
  [K in T]?: (event: ExtensionEvent<K>, context: HandlerContext<K>) => void | Promise<void>;
};
export interface ExtensionDefinition<T extends EventType = EventType> {
  manifest: ExtensionManifest & { events: readonly T[] };
  on: ExtensionHandlers<T>;
}
