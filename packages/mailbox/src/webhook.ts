import { verifyRequest } from "@samva/webhooks";

import { createSamvaClient, type Fetch } from "./client";
import { dispatchEvent, errorMessage } from "./dispatch";
import type { ExtensionDefinition } from "./types";

/* oxlint-disable samva/no-try-catch-or-throw -- the Fetch webhook adapter converts verification and dispatch failures into HTTP responses */

export function createWebhookHandler(
  extension: ExtensionDefinition,
  options: {
    apiKey: string;
    webhookSecret: string;
    apiOrigin?: string;
    fetch?: Fetch;
  },
): (request: Request) => Promise<Response> {
  const client = createSamvaClient({
    fetch: options.fetch ?? globalThis.fetch.bind(globalThis),
    baseUrl: options.apiOrigin ?? "https://api.samva.dev",
    headers: { "x-api-key": options.apiKey },
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
