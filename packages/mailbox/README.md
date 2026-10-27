# @samva/mailbox

Author extensions that react to Samva mailbox events and call the mailbox API.

## Hosted extension

```ts
import { defineExtension } from "@samva/mailbox";

export default defineExtension({
  manifest: {
    name: "auto-ack",
    displayName: "Auto acknowledge",
    version: "1.0.0",
    runtime: "hosted",
    events: ["mailbox.message.received"],
    permissions: ["read", "send"],
  },
  on: {
    "mailbox.message.received": async (event, { samva, log }) => {
      const reply = await samva.messages.reply(event.data.mailboxId, event.data.message.id, {
        text: "Thanks, we got it.",
      });
      // "approvalRequired" waits for a person; "queued" retries until its `executeUntil` deadline.
      log(`Reply ${reply.state}`, event.data.message.id);
    },
  },
});
```

Bundle the default export as an ES module for Samva's hosted runtime. Its `fetch(request, env)`
accepts a POST containing `{ eventId, attempt, body }` and returns `{ ok, error?, logs }`.
The runtime supplies `env.SAMVA.fetch` with the installation's authority. The SDK calls that
binding without credentials. Hosted extensions make mailbox API calls through `samva`.

The manifest names the subscribed events and requested permissions. Every extension needs `read`.
Handler keys must appear in `manifest.events`. A missing handler acknowledges the event.

Handlers receive an `ExtensionEvent` with `id`, `type`, `timestamp`, and `data`. The ID is the
webhook event ID; timestamps remain strings. Context provides `samva`, `log(...args)`, `event`,
and `attempt`. The lines a handler writes with `log()` are its run's log (the hosted run log, or the
webhook handler's result); `console` output goes to the runtime's own logs.

## Webhook server

Use `runtime: "webhook"` in the extension manifest. Keep the installation's credentials on the
server:

```ts
import { createWebhookHandler } from "@samva/mailbox/webhook";
import extension from "./extension";

Bun.serve({
  fetch: createWebhookHandler(extension, {
    apiKey: process.env.SAMVA_API_KEY!,
    webhookSecret: process.env.SAMVA_WEBHOOK_SECRET!,
  }),
});
```

`createWebhookHandler(extension, { apiKey, webhookSecret, apiOrigin?, fetch? })` verifies the raw
request with Standard Webhooks before dispatching. Bad signatures return 401. Successful handlers
return 200 `{ ok: true }`; failed handlers return 500 `{ ok: false, error }` so Samva retries.
Webhook attempts are reported as 1 because the delivery does not carry an attempt count. API calls
use `x-api-key`; `apiOrigin` defaults to `https://api.samva.dev`.

## Mailbox client

```ts
import { createSamvaClient } from "@samva/mailbox";

const samva = createSamvaClient({
  fetch,
  baseUrl: "https://api.samva.dev",
  headers: { "x-api-key": process.env.SAMVA_API_KEY! },
});

await samva.threads.list("mbx_example", { limit: 20, unread: true });
```

The client exposes:

- `messages.get(mailboxId, messageId)`
- `messages.reply(mailboxId, messageId, payload, options?)`
- `messages.replyAll(mailboxId, messageId, payload, options?)`
- `messages.forward(mailboxId, messageId, payload, options?)`
- `messages.send(mailboxId, payload, options?)`
- `actions.get(mailboxId, actionId)`: current action, frozen intent and send progress
- `actions.cancel(mailboxId, actionId)`: requires a permitted person; API keys and installations are refused
- `actions.retry(mailboxId, actionId)`: requires a permitted person and an eligible ended execution; preserves content, identity and deadline
- `threads.get(mailboxId, threadId)`
- `threads.list(mailboxId, query?)`
- `threads.messages(mailboxId, threadId, query?)`: message summaries, one page
- `threads.content(mailboxId, threadId, query?)`: messages with their bodies, one page
- `threads.update(mailboxId, threadId, payload)`: answers with where the thread stands (`MailboxThreadState`); read the full thread with `threads.get`

Payloads and responses follow the encoded mailbox API schemas, including string dates and query
values. Non-success HTTP responses throw `SamvaApiError` with `status`, `code`, `message`, `body`, and `retryAfter` (the response header, or null).

Receipt `problem.error`, when present, is a `SendRefusal` discriminated by `_tag`. It preserves
retry delays, review decisions and next actions, validation fields, or usage limits from the
original refusal. `problem.code` and `problem.message` describe the send outcome.

Sends return an action receipt, not a delivery confirmation. `approvalRequired` awaits a person;
`queued` awaits acceptance; `accepted` and `completed` expose the accepted `messageId`.
`completed` means mailbox bookkeeping completed, not recipient delivery. `notSent` proves no
acceptance; `uncertain` requires reconciliation. Observe the original action with `actions.get`.
An extension does not resubmit a held reply to advance it. Approval and policy allow start a fixed
15-minute execution window; approval holds have no pre-approval expiry. Cancellation is possible
only before acceptance. Never replace a key to recover accepted or uncertain work.

Every send carries `Idempotency-Key`. Same-key replay returns the original action's current phase;
active bindings persist until resolution, then for at least 24 hours. Reusing a key after retention
ends creates a new request that may send again. In a handler, keys are `${event.id}:${method}:${n}`, with
one counter per send method starting at 1. A retried handler with the same call order reuses the
same keys. Pass `{ idempotencyKey: "your-key" }` to override a send's key. A bare client generates
UUIDs unless an explicit key or `idempotency(method)` generator is supplied. Use stable explicit
keys when retrying bare-client operations. Idempotency protects sends; other external side effects
need their own deduplication.

## Testing and local dispatch

```ts
import { createTestClient, mailboxEvent, runExtension } from "@samva/mailbox/test";
import extension from "./extension";

const client = createTestClient();
const result = await runExtension(extension, mailboxEvent("mailbox.message.received"), { client });
console.log(result.ok, result.logs, result.calls);
```

`createTestClient(responses?)` returns a mailbox client with `calls`. Canned JSON responses are
keyed by `METHOD /path`, including query strings; unspecified responses are `{}`. Each recorded
call has `method`, `path`, `body`, and `idempotencyKey`.

`mailboxEvent(type, dataOverrides?)` builds a valid event fixture for each mailbox event type.
Overrides replace top-level data fields. `runExtension(extension, event, { client?, attempt? })`
returns `{ ok, error, logs, calls }`; calls contain only that run's recorded requests.

`dispatchEvent(extension, { eventId, attempt, body }, client)` is the shared dispatcher for hosted
runs, webhook servers, local runners, and tests. `body` is the JSON webhook envelope
`{ type, timestamp, data }`. Pass a client created by `createSamvaClient` or `createTestClient`.
