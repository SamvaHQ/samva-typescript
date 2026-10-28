import { createBoundClient, type SamvaClient } from "../promises/client";
import { dispatchEvent } from "./dispatch";
import type { EventData, EventType, ExtensionDefinition, ExtensionEvent } from "./types";

export interface RecordedCall {
  method: string;
  path: string;
  body: unknown;
  idempotencyKey: string | null;
}
/** Canned responses are keyed by `METHOD /path`. */
export function createTestClient(responses: Record<string, unknown> = {}) {
  const calls: RecordedCall[] = [];
  const client = createBoundClient({
    baseUrl: "https://api.samva.dev",
    async fetch(input, init) {
      const request = new Request(input, init);
      const url = new URL(request.url);
      const path = url.pathname + url.search;
      const text = await request.text();
      calls.push({
        method: request.method,
        path,
        body: text ? JSON.parse(text) : undefined,
        idempotencyKey: request.headers.get("idempotency-key"),
      });
      const response = responses[`${request.method} ${path}`];
      return Response.json(response ?? {});
    },
  });
  return Object.assign(client, { calls });
}
export async function runExtension(
  extension: ExtensionDefinition,
  event: ExtensionEvent,
  options: { client?: SamvaClient & { calls?: RecordedCall[] }; attempt?: number } = {},
) {
  const client = options.client ?? createTestClient();
  const start = client.calls?.length ?? 0;
  const { id, ...body } = event;
  const result = await dispatchEvent(
    extension,
    { eventId: id, attempt: options.attempt ?? 1, body: JSON.stringify(body) },
    client,
  );
  return { ...result, error: result.error, calls: client.calls?.slice(start) ?? [] };
}
const timestamp = "2026-01-01T00:00:00.000Z";
const message = {
  id: "msg_0000000000000000",
  channel: "email" as const,
  threadId: "thread_0000000000000000",
  from: { address: "sender@example.com" },
  to: ["inbox@example.com"],
  cc: [],
  subject: "Hello",
  text: "Hello",
  replyText: "Hello",
  attachments: [],
  occurredAt: timestamp,
};
const actor = { kind: "extension", id: "exti_0000000000000000", source: "extension" } as const;
const thread = {
  id: message.threadId,
  endpointId: "mbxep_0000000000000000",
  subject: "Hello",
  preview: "Hello",
};
const common = { mailboxId: "mbx_0000000000000000", namespaceId: null };
const fixtures: EventData = {
  "mailbox.message.received": { ...common, message, thread },
  "mailbox.message.sent": {
    ...common,
    state: "completed",
    acceptedAt: timestamp,
    message,
    actor,
    actionId: "mbxact_0000000000000000",
  },
  "mailbox.action.pending_approval": {
    ...common,
    action: {
      state: "approvalRequired",
      decision: {
        outcome: "requireApproval",
        reason: "Approval required",
        policyId: null,
        source: "installation",
        decidedAt: timestamp,
      },
      id: "mbxact_0000000000000000",
      type: "sendMessage",
      threadId: message.threadId,
      reason: null,
      proposedBy: actor,
      createdAt: timestamp,
    },
    draft: { to: message.to, cc: [], subject: "Hello" },
  },
  "mailbox.action.resolved": {
    ...common,
    action: {
      id: "mbxact_0000000000000000",
      type: "sendMessage",
      threadId: message.threadId,
      proposedBy: actor,
      createdAt: timestamp,
    },
    resolution: {
      outcome: "approved",
      actor: { kind: "user", id: "user_0000000000000000", source: "humanUi" },
      resolvedAt: timestamp,
      reason: null,
    },
  },
  "mailbox.message.quarantined": {
    ...common,
    disposition: "quarantined",
    reason: "spam",
    source: "receipt",
    message: {
      id: message.id,
      from: message.from,
      subject: message.subject,
      receivedAt: timestamp,
    },
  },
  "mailbox.message.released": { ...common, message, thread, releasedBy: actor, reason: "spam" },
  "mailbox.message.discarded": {
    ...common,
    discardedBy: actor,
    disposition: "quarantined",
    reason: "spam",
    message: {
      id: message.id,
      from: message.from,
      subject: message.subject,
      receivedAt: timestamp,
    },
  },
};
/** Top-level data overrides replace the corresponding fixture field. */
export function mailboxEvent<T extends EventType>(
  type: T,
  overrides: Partial<EventData[T]> = {},
): ExtensionEvent<T> {
  return {
    id: "whevt_0000000000000000",
    type,
    timestamp,
    data: { ...structuredClone(fixtures[type]), ...overrides },
  } as ExtensionEvent<T>;
}
