import { clientWithIdempotency, type SamvaClient } from "../promises/client";
import type { DispatchResult, ExtensionDefinition, ExtensionEvent, Invocation } from "./types";

/* oxlint-disable samva/no-hand-rolled-object-guard -- the dependency-free dispatcher checks the externally supplied JSON event envelope before exposing it to handlers */

// Preserve keys already bound to actions when an installation upgrades its extension bundle.
const sendKeyMethods: Readonly<Record<string, string>> = {
  mailboxesReply: "reply",
  mailboxesReplyAll: "replyAll",
  mailboxesForward: "forward",
  mailboxesSendMessage: "send",
};

const errorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error));
export { errorMessage };

/**
 * A run's log is the lines its handler writes with `log()`. The global console is left alone:
 * patching it would make concurrent runs in one isolate share it, and a handler that never settles
 * would hold it.
 */
export async function dispatchEvent(
  extension: ExtensionDefinition,
  invocation: Invocation,
  client: SamvaClient,
): Promise<DispatchResult> {
  const logs: string[] = [];
  const log = (...args: unknown[]) => {
    logs.push(
      args
        .map((arg) => {
          if (typeof arg === "string") return arg;
          try {
            return JSON.stringify(arg) ?? String(arg);
          } catch {
            return String(arg);
          }
        })
        .join(" "),
    );
  };
  try {
    if (
      typeof invocation.eventId !== "string" ||
      !Number.isInteger(invocation.attempt) ||
      invocation.attempt < 1 ||
      typeof invocation.body !== "string"
    ) {
      throw new Error("Invalid extension invocation");
    }
    const payload: unknown = JSON.parse(invocation.body);
    if (
      typeof payload !== "object" ||
      payload === null ||
      !("type" in payload) ||
      typeof payload.type !== "string" ||
      !("timestamp" in payload) ||
      typeof payload.timestamp !== "string" ||
      !("data" in payload) ||
      typeof payload.data !== "object" ||
      payload.data === null
    ) {
      throw new Error("Invalid extension event envelope");
    }
    if (!Object.hasOwn(extension.on, payload.type)) return { ok: true, logs };
    // Event data comes from Samva's webhook producer; preserve the encoded shape without decoding dates.
    const event = { ...payload, id: invocation.eventId } as ExtensionEvent;
    const handler = extension.on[event.type] as
      | ((
          event: ExtensionEvent,
          context: { samva: SamvaClient; log: typeof log; event: ExtensionEvent; attempt: number },
        ) => void | Promise<void>)
      | undefined;
    const counts = new Map<string, number>();
    await handler?.(event, {
      samva: clientWithIdempotency(client, (operation) => {
        const method = sendKeyMethods[operation] ?? operation;
        const n = (counts.get(method) ?? 0) + 1;
        counts.set(method, n);
        return `${event.id}:${method}:${n}`;
      }),
      log,
      event,
      attempt: invocation.attempt,
    });
    return { ok: true, logs };
  } catch (error) {
    return { ok: false, error: errorMessage(error), logs };
  }
}
