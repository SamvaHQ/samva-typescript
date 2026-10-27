# `@samva/webhooks`

Verify signed Samva webhook deliveries in Node.js, Bun, Cloudflare Workers, and other Web
Crypto-compatible runtimes.

```ts
import { isKnownEvent, verifyRequest } from "@samva/webhooks";

const verified = await verifyRequest(request, process.env.SAMVA_WEBHOOK_SECRET!);
if (isKnownEvent(verified.event) && verified.event.type === "message.bounced") {
  await suppressRecipient(verified.event.data.recipient, verified.event.data.occurredAt);
}
await persistAndHandleOnce(verified.id, verified.event);
```

Verification reads the exact request body, validates the Standard Webhooks signature and replay
window and the event-specific payload, and returns `{ id, event }`. `verified.id` matches the `webhook-id` header. Preserve the raw
request body and keep the signing secret on the server.

Effect applications can use the optional Effect entrypoint:

```ts
import { Effect } from "effect";
import * as Webhooks from "@samva/webhooks/effect";

const program = Effect.gen(function* () {
  const verified = yield* Webhooks.verifyRequest(request, secret);
  return verified.event;
});
```

Install the `effect` version this package lists in `peerDependencies` when using that entrypoint.

`VerifiedWebhook.event` is a `WebhookEvent`: a known `SamvaWebhookEvent` or an
`UnknownWebhookEvent` with `type: string` and `data: unknown`. Call `isKnownEvent(event)` before
branching on `event.type` to narrow known payloads. Per-event types such as `MessageBouncedPayload`
and `ContactUnsubscribedPayload` are exported from both entrypoints.

Signature verification is the authenticity gate. Signed new event types pass through as untyped
events; extra envelope and payload fields are accepted and preserved. Only malformed envelopes or
invalid payloads for known event types fail with `MalformedWebhookPayloadError`. Update the package
to gain types for new events. Bounce and complaint events publish once per affected address, each
with its own `webhook-id`; deduplicate using that ID rather than `messageId`.

For separate decoding, import `MessageBouncedEventSchema` or `SamvaWebhookEventSchema` from
`@samva/webhooks/schemas` (or the Effect entrypoint) and use `Schema.decodeUnknownSync`.
`WebhookEventJsonSchemas` exports the same wire contracts for JSON Schema validators.

Signing secrets are `whsec_` followed by Base64-encoded secret bytes. Copy the entire secret from
Samva; the suffix is Base64, not hex or Base64url.
