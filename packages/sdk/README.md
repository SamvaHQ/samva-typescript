# samva

Samva is the email API for your app: transactional and campaign sending, inbound mail, and webhooks behind one API.

TypeScript SDK for Samva's public customer API.

## Documentation

See [AGENTS.md](./AGENTS.md) for concise guidance when using this package with coding agents.

## Overview

The root entrypoint is Promise-based:

```typescript
import { createClient } from "samva";
```

The same Promise SDK is also available at `samva/promises`. Native Effect users import domain modules such as `samva/effect/email` and provide `samva/effect/client`. Both clients are generated from Samva's public OpenAPI document, while the Effect runtime does not wrap or execute the Promise client. Effect is an optional peer dependency, so Promise-only applications do not install or load it.

## Installation

```bash
npm install samva
# or
bun add samva
# or
yarn add samva
```

## Quick Start

```typescript
import { createClient } from "samva";

const client = createClient({
  baseUrl: "https://api.samva.dev",
  apiKey: "<samva-api-key>",
});

const { contact } = await client.contacts.findOrCreate({
  lookup: { type: "email", value: "ada@example.com" },
  create: { name: "Ada Lovelace" },
});

const message = await client.messages.send({
  to: [contact],
  channel: "email",
  email: {
    subject: "Hello",
    html: "<p>Hello World</p>",
    text: "Hello World",
  },
  metadata: {
    externalUserId: "user_123",
  },
});

const messages = await client.messages.list({ limit: 20 });
// Pass `messages.nextCursor` back as `cursor` for the next page; it is null on the last page.
```

Creation fails with `ConflictError` (HTTP 409) when an external ID or address belongs to another
contact. The error names the conflicting field and the creation is rolled back.

## Effect Quick Start

Install `effect` next to `samva` when using the Effect entrypoint:

```bash
bun add samva effect@4.0.5
```

```typescript
import { Effect } from "effect";
import * as Client from "samva/effect/client";
import * as Email from "samva/effect/email";

const program = Email.send({
  to: "ada@example.com",
  subject: "Welcome",
  html: "<h1>Welcome to Samva</h1>",
}).pipe(Effect.provide(Client.layerFetch({ apiKey: "<samva-api-key>" })));

const message = await Effect.runPromise(program);
```

### Serverless Runtimes

Each `samva/effect/<domain>` entrypoint loads only that domain's part of the API, so a Cloudflare
Worker or Lambda function pays at startup only for the domains it imports. A bundler can discard
unused operations and their exclusive API groups: importing only `Email.send` retains Messages
and Media, without email administration operations. Media handles oversized inline attachments.
Operations within a retained group still share that group's schemas. The `samva/effect` barrel
loads every domain on a native import; prefer focused entrypoints in serverless code.

`Client.layerFetch` does no work until the first call, and the first call to a domain prepares only
that domain, so providing the Layer costs little. In a Cloudflare Worker, provide it per request and
pass the request's abort signal, so no request waits on work another request started:

```typescript
import { Effect } from "effect";
import * as Client from "samva/effect/client";
import * as Contacts from "samva/effect/contacts";

export default {
  async fetch(request: Request, env: { SAMVA_API_KEY: string }): Promise<Response> {
    const page = await Effect.runPromise(
      Contacts.list({}).pipe(Effect.provide(Client.layerFetch({ apiKey: env.SAMVA_API_KEY }))),
      { signal: request.signal },
    );
    return Response.json(page.items);
  },
};
```

In Lambda or another runtime that keeps one process alive across invocations, build the Layer once
in a `ManagedRuntime` at module scope so each domain is prepared once for the life of the process:

```typescript
import { ManagedRuntime } from "effect";
import * as Client from "samva/effect/client";
import * as Contacts from "samva/effect/contacts";

const runtime = ManagedRuntime.make(Client.layerFetch({ apiKey: process.env.SAMVA_API_KEY! }));

export const handler = async () => {
  const page = await runtime.runPromise(Contacts.list({}));
  return page.items;
};
```

## Authentication

Samva supports two client auth modes. Use one per `createClient` instance.

### API key (automation, CI, single org)

```typescript
const client = createClient({
  apiKey: "samva_sk_live_...",
  baseUrl: "https://api.samva.dev",
});
```

- `X-API-Key` is configured automatically from `apiKey`.
- Organization context is derived from the API key — do not send `x-org-slug`.

### OAuth bearer (interactive, multi-org)

```typescript
const client = createClient({
  authToken: sessionAccessToken,
  baseUrl: "https://api.samva.dev",
  headers: { "x-org-slug": "your-org-slug" },
});
```

- Requests use `Authorization: Bearer <authToken>`.
- The token is user-scoped; send the target organization slug on every request via the `x-org-slug` header.
- There is no SDK `orgSlug` helper — pass the header directly.

For terminal workflows (`samva login`, `samva org use`, `samva email send --dry-run`), see [`@samva/cli`](https://www.npmjs.com/package/@samva/cli).

The Promise and Effect clients identify their public SDK surface and package version with the
advisory `x-samva-client` request header. Supply your own value in `headers`, or set the header to
`null` in Promise request options or `undefined` in Effect client configuration to omit it.

## Send a Published Template

Author a template as TSX with `samva templates init`, then publish an exact commit with
`samva templates publish --commit HEAD` (see [`@samva/cli`](https://www.npmjs.com/package/@samva/cli)).
A published template is addressed by its slug, which is the `id` in its `defineTemplate`:

```typescript
await client.messages.send({
  to: [{ email: "ada@example.com" }],
  channel: "email",
  email: {
    templateSlug: "order-shipped",
    templateData: { name: "Ada", orderId: "A-1042" },
  },
});
```

A template send omits `subject`, `html`, and `text`; the request fails if `templateData` does not
match the template's input schema. `samva templates types` generates TypeScript types for that input.

## Service Surface

The Promise client exposes:

- `agents`
- `analytics`
- `apiKeys`
- `attachments`
- `brands`
- `campaigns`
- `contactGroups`
- `contacts`
- `conversations`
- `customFields`
- `email`
- `extensionInstallations`
- `extensions`
- `feedback`
- `mailboxes`
- `media`
- `messages`
- `namespaces`
- `operations`
- `organizations`
- `scheduledMessages`
- `templates`
- `topics`
- `topicForms`
- `webhooks`
- `whoami`

The Effect SDK exposes Pascal-cased domain modules with lower-camel operations:

- `Agents`
- `Analytics`
- `ApiKeys`
- `Attachments`
- `Brands`
- `Campaigns`
- `ContactGroups`
- `Contacts`
- `Conversations`
- `CustomFields`
- `Email`
- `ExtensionInstallations`
- `Extensions`
- `Feedback`
- `Mailboxes`
- `Media`
- `Messages`
- `Namespaces`
- `Operations`
- `Organizations`
- `ScheduledMessages`
- `Templates`
- `Topics`
- `Webhooks`
- `Whoami`

Effect operations take direct parameter objects: body, path, and query fields are not wrapped in `payload` or `params` envelopes. Import the modules you use from `samva/effect/<lower-kebab>` and provide `Client.layerFetch` once at the program boundary.

Email attachments use organization-owned media. Call `media.create`, upload the bytes with the
returned instruction, call `media.complete`, and pass the ready `mediaId` to `email.send` or
`messages.send`. A message accepts at most 10 attachments totaling 25 MiB of raw bytes; the same
budget covers inline base64 content and owned media references. Remote URL attachments are not.

Inline base64 `content` is capped at 4 MiB of raw bytes per request. When a send carries more,
`email.send` and `messages.send` upload the largest attachments through `media` first and send them
by `mediaId`; a failed upload throws `MediaUploadError` before the send request.

Effect failures carry Samva's real tagged errors (`RateLimitedError`, `ValidationError`, `PaymentRequiredError`, …) directly in the error channel, so `Effect.catchTag("RateLimitedError", …)` works against any operation without enumerating status codes, and each error exposes its own fields (no wrapper `cause`). The SDK also exports category helpers such as `isRetryable`, `isTransient`, `catchAuthError`, and `catchTransient`. Success values decode to domain types: annotated absolute instants become `Date`, sensitive fields become `Redacted`, and unannotated wire timestamps remain strings.

Import error constructors from `samva/effect/errors` when you need `instanceof`, schema decoding,
or to construct a failure in a test:

```typescript
import { InternalError, MediaUploadError } from "samva/effect/errors";
```

These are the same constructors the operations and `samva/effect` barrel use. The focused entry
avoids loading domain modules; a native import still initializes the shared schemas. Handling an
error with `Effect.catchTag` does not require importing its constructor.

### Default-on retry

The Effect client retries safe operations out of the box, so you do not wrap calls in `Effect.retry`:

- **What retries** — read operations (`GET`/`HEAD`) and sends. Sends are safe because the client attaches an `Idempotency-Key` (below), so the server deduplicates a replayed attempt. Every other mutating operation (`create`, `update`, `remove`, …) is keyless and is never auto-retried.
- **When** — only for `isRetryable` failures: throttling (`429`), transient server errors (including a transient `BillingProviderError`), and request-transport failures. `ValidationError`, `ConflictError`, `NotFound`, auth, and billing-limit `PaymentRequiredError` failures never retry.
- **How** — jittered exponential backoff, bounded to four attempts total. A `429` honors the server's `retryAfterSeconds` hint (capped at 60s) in place of the computed delay.

Retry policy is read from context via the `Retry.Service` service. When it is absent, the default applies, so no operation gains a requirement. Override it with a Layer:

```typescript
import { Effect } from "effect";
import { isRetryable } from "samva/effect/categories";
import * as Retry from "samva/effect/retry";

// Turn auto-retry off for a program:
program.pipe(Effect.provide(Retry.layerDisabled));

// Or install a custom policy (any Effect.retry options):
program.pipe(Effect.provide(Retry.layer({ times: 6, while: isRetryable })));
```

### Idempotency keys

Each `messages.send` / `email.send` call generates an `Idempotency-Key` per logical call — stable across the built-in retries, distinct across calls — so a retried send never delivers twice. Pass an explicit key for cross-process deduplication (safe to replay the same request from a different machine):

```typescript
const send = Email.send(input, { idempotencyKey: "order-4417-receipt" });
```

Reusing a key with identical content replays the original response; reusing it with different content fails with `ConflictError`.

### Stream pagination

Every list answers `{ items, nextCursor }`: pass `nextCursor` back as `cursor` for the next page, and stop when it is null. Every list operation that pages carries two `Stream` companions, so you traverse pages without hand-rolling a cursor loop:

- **`list.items(input?)`** — a `Stream` of individual items across all pages.
- **`list.pages(input?)`** — a `Stream` of raw page envelopes.

```typescript
import { Stream } from "effect";
import * as Contacts from "samva/effect/contacts";

// Every contact, one page fetched at a time:
const allContacts = Stream.runCollect(Contacts.list.items());

// Bounded consumption is lazy — this fetches only as many pages as it needs:
const firstFifty = Stream.runCollect(Contacts.list.items().pipe(Stream.take(50)));

// Caller params (start cursor, limit, filters) are respected:
const recent = Contacts.list.items({ limit: 100, after: "2026-01-01T00:00:00Z" });
```

The companions are attached uniformly to every paginated list, including `Messages.list`, `Contacts.list`, `Campaigns.list`, `Email.listDomains`, and `Webhooks.list`. Each page fetch reuses the ambient `Retry` policy. Reads retry per page; pagination does not nest retries. Pass `limit` as a number; both clients serialize it as a query string. A list bounded by design, such as `CustomFields.list`, answers `{ items }` in one response and carries no companions. Stream pagination is Effect-only.

### Redacted secrets

Effect client configuration accepts `apiKey: string | Redacted<string>` and unwraps a Redacted key
only for authentication. Promise client configuration accepts `apiKey: string` and does not require
Effect, including in browser bundles.

Secret-bearing response fields — the plaintext API key returned by `apiKeys.create` / `apiKeys.rotate`, and the webhook signing secret from `webhooks.regenerateSecret` — decode to `Redacted<string>` on the Effect surface. The secret never leaks through logs, `String(...)`, or `JSON.stringify`; unwrap it explicitly with `Redacted.value` when you need the plaintext:

```typescript
import { Effect, Redacted } from "effect";
import * as ApiKeys from "samva/effect/api-keys";

const inspectKey = Effect.gen(function* () {
  const created = yield* ApiKeys.create({ name: "CI" });
  `${created.key}`; // "<redacted>" — safe to log
  return Redacted.value(created.key); // the plaintext key, unwrapped on purpose
});
```

The wire body and the Promise client keep plain strings; only the Effect surface is `Redacted`.

## OpenAPI vendor extensions

The published `openapi.json` carries machine-readable semantics on top of the standard schema, derived from the same contract annotations the Effect SDK uses (no second taxonomy):

| Extension      | Where             | Meaning                                                                                           |
| -------------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| `x-category`   | error schemas     | The error's semantic categories (e.g. `["throttling", "transient"]`). Omitted when uncategorized. |
| `x-retryable`  | error schemas     | `true` when the error is safe to retry.                                                           |
| `x-idempotent` | operations        | `true` when the operation accepts an `Idempotency-Key` header.                                    |
| `x-sensitive`  | schema properties | `true` for secret-bearing fields (plain `string` on the wire; `Redacted` in the Effect SDK).      |

These let MCP and third-party consumers read retry/idempotency/secret semantics straight from the spec.

## Usage Examples

### Send Email Through Unified Messages

```typescript
const { contact } = await client.contacts.findOrCreate({
  lookup: { type: "email", value: "ada@example.com" },
  create: { name: "Ada Lovelace" },
});

const response = await client.messages.send({
  to: [contact],
  channel: "email",
  email: {
    subject: "Welcome",
    html: "<h1>Welcome to Samva</h1>",
    text: "Welcome to Samva",
  },
  metadata: {
    campaign: "welcome",
  },
});
```

### Native Effect Send Email

```typescript
import * as Email from "samva/effect/email";

const message =
  yield *
  Email.send({
    to: "ada@example.com",
    subject: "Welcome",
    html: "<h1>Welcome to Samva</h1>",
  });
```

### List Conversations

```typescript
const response = await client.conversations.list({
  limit: 20,
  status: "active",
});
```

### Schedule a Message

```typescript
const scheduled = await client.scheduledMessages.create({
  send: {
    to: [{ email: "ada@example.com" }],
    channel: "email",
    email: { subject: "Reminder", html: "<p>See you tomorrow.</p>" },
  },
  scheduledFor: "2026-08-01T09:00:00Z",
});

// Later, cancel it before it dispatches
await client.scheduledMessages.cancel({ id: scheduled.id });
```

### Create and Run a Campaign

```typescript
const campaign = await client.campaigns.create({
  name: "August newsletter",
  channel: "email",
  content: {
    channel: "email",
    email: { subject: "What's new", html: "<h1>Updates</h1>" },
  },
  audience: {
    topicId: "unsub_1234567890abcdef",
    includeTags: ["subscribers"],
    excludeTags: ["bounced"],
  },
});

const run = await client.campaigns.scheduleRun({
  id: campaign.id,
  scheduledFor: "2026-08-01T09:00:00Z",
});

const recipients = await client.campaigns.listRecipients({
  id: campaign.id,
  runId: run.id,
});
```

### Follow a Mailbox Send

Mailbox send, reply, forward, and draft send return action receipts. A successful `202` records
pending work; it is not a sent confirmation. Read `receipt.state` and preserve `receipt.actionId`:

```typescript
const receipt = await client.mailboxes.sendMessage({
  id: "mbx_...",
  to: ["ada@example.com"],
  subject: "Hello",
  text: "Hello from Samva",
  "idempotency-key": "support-message-123",
});

const action = await client.mailboxes.getAction({ id: "mbx_...", actionId: receipt.actionId });
if (action.type === "sendMessage" || action.type === "reply") {
  console.log(action.state, action.send.messageId);
}
```

`approvalRequired` awaits a person; `queued` is authorized work; `accepted` has a durable
`messageId` and `acceptedAt`; `completed` has its mailbox sent item recorded. Recipient delivery
is separate. `notSent` reopens the draft; `uncertain` requires reconciliation and must not trigger
a replacement email. Until acceptance, `messageId` and `acceptedAt` are null. The action's `intent`
is the frozen public email snapshot; inspect the action type before using send-specific fields.

Preserve the original key and body after a timeout. Replaying them reads the same action's current
phase, and changing the body under that key is a conflict. `getAction` reads progress. A permitted
person can `cancelAction` before acceptance or `retryAction` when `retryEligible` is true; Retry
continues the original action and never extends `executeUntil`. API keys and extensions cannot
cancel or Retry. `approveAction` returns an action with `202` while the send is pending; accepted,
completed, and `notSent` replays return `200`. Non-send approvals execute synchronously and return
`200`, as does `denyAction`.
The same behavior applies to `samva/effect/mailboxes`.

See [mailbox approvals and receipts](https://samva.dev/docs/mailboxes/approvals) for the receipt
fields, sending deadline, approval permissions, and idempotency retention.

### Read Mailbox Events

`mailboxes.events` reads the `mailbox.*` events over a WebSocket, for a program without a public
URL for webhooks. Asking for the next event marks the previous one handled; the stream reconnects
after transient closes from the last event it holds and throws `MailboxEventStreamError` when the
caller has to act. Its `_tag` is the API error tag the host refused with (`UnauthorizedError`,
`ForbiddenError`, `ResourceNotFoundError`, `CursorExpiredError`, `ValidationError`, and the
rest), with the host's `message`, `status`, `fields`, and `retryAfterSeconds`. A `429`, `5xx`, or
`408` refusal is retried after the delay the host asked for; every other refusal ends the stream.
Pass `onReconnect` to see each retry before it waits. A connection that goes silent for 90 seconds
is closed by the client, and its error carries `reason: "idleTimeout"` instead of a `closeCode`.
It needs a runtime whose `WebSocket` accepts request headers, such as Node or Bun, or one passed
as the `WebSocket` option.

```typescript
const events = client.mailboxes.events({ cursor: savedCursor, mailboxIds: ["mbx_..."] });
for await (const event of events) {
  await handle(event.type, event.data);
  await saveCursor(event.cursor);
}
```

With Effect, `Mailboxes.events(options)` is a `Stream` of the same events that fails with a
`MailboxEventStreamFailure`, so `Effect.catchTag("CursorExpiredError", ...)` handles one cause.

### Custom Headers

```typescript
const client = createClient({
  apiKey: "<samva-api-key>",
  headers: {
    "X-Custom-Header": "value",
  },
});
```

### Error Handling

```typescript
import { RateLimitedError, SamvaApiError, SamvaTransportError } from "samva";

try {
  const message = await client.email.send({
    to: "ada@example.com",
    subject: "Test",
    html: "<p>Test</p>",
  });
  console.log(message.id);
} catch (error) {
  if (error instanceof RateLimitedError) {
    console.error(`Retry after ${error.retryAfterSeconds} seconds`);
  } else if (error instanceof SamvaApiError) {
    console.error(error._tag, error.status, error.message);
  } else if (error instanceof SamvaTransportError) {
    console.error("Transport failure", error.cause);
  } else {
    throw error;
  }
}
```

Every ergonomic method returns its decoded success value and throws a generated `SamvaApiError`
subclass for failures declared by OpenAPI. Network and malformed-response failures throw
`SamvaTransportError`.

### Raw response access

```typescript
const result = await client.raw.messages.send({
  body: {
    to: [{ contactId: "contact-id" }],
    channel: "email",
    email: { subject: "Hello", text: "Hello" },
  },
});

if (result.error) console.error(result.response?.status, result.error);
```

Use `client.raw` only when you need the generated `{ data, error, request, response }` envelope or
transport-level request options.

## Type Safety

All request and response types are generated from OpenAPI schemas:

```typescript
import type { MessagesSendData } from "samva";

const requestData: MessagesSendData = {
  body: {
    to: [{ contactId: "contact-id" }],
    channel: "email",
    email: {
      subject: "Hello",
      html: "<p>Hello World</p>",
    },
  },
};

const response = await client.messages.send(requestData.body);
```
