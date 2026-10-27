import { createSamvaClient, type Fetch } from "./client";
import { dispatchEvent, errorMessage } from "./dispatch";
import type { EventType, ExtensionDefinition, ExtensionManifest, Invocation } from "./types";

/* oxlint-disable samva/no-try-catch-or-throw -- the public Promise authoring API reports invalid definitions by throwing and adapts hosted requests to HTTP responses */
/* oxlint-disable samva/no-error-constructor -- invalid authoring definitions use the package's documented native Error failure surface */

export * from "./types";
export { createSamvaClient, SamvaApiError } from "./client";
export type {
  ClientOptions,
  Fetch,
  SamvaClient,
  SendOptions,
  SendPayload,
  ReplyPayload,
  ForwardPayload,
  SendResult,
  SendRefusal,
  SendIntent,
  EmailSendIntent,
  ChatSendIntent,
  MailboxAction,
  Message,
  EmailMessage,
  ChatMessage,
  MessageSummary,
  MailboxThread,
  MailboxThreadState,
  PageQuery,
  ThreadSummary,
  ThreadQuery,
  ThreadList,
  ThreadMessages,
  ThreadContent,
  ThreadUpdate,
} from "./client";
export { dispatchEvent } from "./dispatch";

export function defineExtension<const M extends ExtensionManifest>(definition: {
  manifest: M;
  on: ExtensionDefinition<M["events"][number]>["on"];
}) {
  for (const key of Object.keys(definition.on)) {
    if (!definition.manifest.events.includes(key as EventType))
      throw new Error(`Handler ${key} is not listed in manifest.events`);
  }
  if (!definition.manifest.permissions.includes("read"))
    throw new Error("An extension requires the read permission");
  return {
    ...definition,
    async fetch(request: Request, env: { SAMVA: { fetch: Fetch } }): Promise<Response> {
      try {
        if (request.method !== "POST") throw new Error("Hosted invocations require POST");
        const invocation: Invocation = await request.json();
        const client = createSamvaClient({
          fetch: env.SAMVA.fetch.bind(env.SAMVA),
          baseUrl: "https://api.samva.dev",
        });
        return Response.json(await dispatchEvent(definition, invocation, client));
      } catch (error) {
        return Response.json({ ok: false, error: errorMessage(error), logs: [] });
      }
    },
  };
}
