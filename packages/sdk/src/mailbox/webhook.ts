import { verifyRequest } from "@samva/webhooks";

import { createClient } from "../promises/client";
import { dispatchEvent, errorMessage } from "./dispatch";
import type { ExtensionDefinition } from "./types";

type Fetch = NonNullable<Parameters<typeof createClient>[0]["fetch"]>;

export function createWebhookHandler(
  extension: ExtensionDefinition,
  options: {
    apiKey: string;
    webhookSecret: string;
    apiOrigin?: string;
    fetch?: Fetch;
  },
): (request: Request) => Promise<Response> {
  const client = createClient({
    fetch: options.fetch ?? globalThis.fetch.bind(globalThis),
    baseUrl: options.apiOrigin ?? "https://api.samva.dev",
    apiKey: options.apiKey,
  });
  return async (request) => {
    let eventId: string;
    try {
      eventId = (await verifyRequest(request, options.webhookSecret)).id;
    } catch (error) {
      return Response.json({ ok: false, error: errorMessage(error) }, { status: 401 });
    }
    try {
      const result = await dispatchEvent(
        extension,
        { eventId, attempt: 1, body: await request.text() },
        client,
      );
      return Response.json(result.ok ? { ok: true } : { ok: false, error: result.error }, {
        status: result.ok ? 200 : 500,
      });
    } catch (error) {
      return Response.json({ ok: false, error: errorMessage(error) }, { status: 500 });
    }
  };
}
