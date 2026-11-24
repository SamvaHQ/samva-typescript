# samva

Samva is email and WhatsApp for AI agents, and the API developers build on. An agent gets its own address and WhatsApp number, and the same platform covers transactional and campaign sending, inbound replies threaded into conversations, programmable mailboxes, and signed webhooks.

TypeScript SDK for Samva's public customer API.

## Author a hosted agent

Import `defineAgent` and `defineTool` from `samva/agent`, and install the optional `effect` peer
for tool input schemas. An entry module registers its tools, event handlers, schedules, and
Markdown skills explicitly. `samva agents init` scaffolds a project; `samva agents build` produces
one self-contained ES module, and `samva agents publish` publishes an immutable version.

```ts
import { Schema } from "effect";
import { defineAgent, defineTool } from "samva/agent";

const instructions = "Help customers manage their appointments.";
const reschedule = "# Reschedule\nAsk for the appointment id.";

export default defineAgent({
  manifest: {
    name: "Front desk",
    version: "1.0.0",
    endpointIds: [],
    integrations: [],
    eventTriggers: [],
    policy: { presets: [], rules: [] },
    model: "standard",
    reasoning: "auto",
    workingHours: null,
    takeoverTimeoutMinutes: 30,
  },
  instructions,
  skills: { reschedule },
  tools: {
    appointment: defineTool({
      description: "Look up an appointment",
      input: Schema.Struct({ id: Schema.String }),
      replay: "safe",
      async execute(input, ctx) {
        return await ctx.connections.call("intg_yourintegration", "get_appointment", input);
      },
    }),
  },
  events: {
    "appointment.confirmed"(event, ctx) {
      ctx.log(event.type);
    },
  },
  schedules: {
    "0 9 * * *"(ctx) {
      ctx.log("Daily check");
    },
  },
});
```

`defineTool` validates input before calling `execute`, and infers its input type from the Effect
schema. Declare `replay: "safe"` only when repeating a call is safe; otherwise use `"unsafe"`.
A tool's optional `approval` (`"run"`, `"model"`, `"person"`, or `"never"`) sets a floor combined
with Samva's decision rules: stricter requirements win. Each call receives a fresh `ctx` with its
capability identity, the Samva client, integration calls, memory, and logging. Keep authority in
that context rather than module globals. Instructions can also be a function of `ctx`; `knowledge`
can supply static business facts separately. Markdown skills are registered by name and loaded
when needed. In a project, import instructions and skills from `.md` files as text; the CLI
bundles those imports into the module.

For a conversation call, `ctx.capability.trigger.target` provides the admitted `mailboxId`,
`threadId`, and `messageId` for scoped mailbox reads and replies, or `null` when there is no
mailbox target. Include this field when constructing a fake conversation context for an eval.

Eval files are ordinary TypeScript modules. Import `defineEval`, `runAgent`, and `runEval` from
`samva/agent/test`. Supply a fake `AgentContext`; the helper runs the registered tool or handler
without a server and preserves input validation:

```ts
import type { AgentContext, AgentDefinition } from "samva/agent";
import { defineEval, runAgent, runEval } from "samva/agent/test";

declare const agent: AgentDefinition;
declare const ctx: AgentContext;

const evaluation = defineEval({
  name: "appointment lookup",
  async run(definition, context) {
    const local = runAgent(definition, context);
    await local.tool("appointment", { id: "appointment-1" });
    await local.event({
      id: "event-1",
      type: "appointment.confirmed",
      timestamp: "2026-01-01T00:00:00.000Z",
      data: { appointmentId: "appointment-1" },
    });
  },
});

await runEval(agent, evaluation, ctx);
```

Assertions thrown by an eval reject `runEval`. The runner also exposes `schedule(cron)`,
`instructions()`, and `skill(name)`; missing registrations fail explicitly.

## Give an agent a mailbox

Create a mailbox, send from it, and read what comes back. A hosted `samva.email` address needs no DNS setup.

```typescript
import { createClient } from "samva";

const samva = createClient({ apiKey: process.env.SAMVA_API_KEY! });

const { organization } = await samva.whoami.get();
const mailbox = await samva.mailboxes.create({
  endpoint: { channel: "email", address: `support@${organization.hostedMailDomain}` },
  name: "Support",
});

const receipt = await samva.mailboxes.sendMessage({
  id: mailbox.id,
  to: ["customer@example.com"],
  subject: "Your support request",
  text: "We are looking into your request.",
});
console.log(receipt.state);
```

A hosted address receives mail at once. Read each email endpoint's `sendingStatus` from
`mailboxes.get`: `pending` means sending setup is still running, and `failed` means setup failed
and support recovers the address. `ready` describes the address's setup only. While the
organization's email onboarding review is undecided, a send from a ready address returns a receipt
whose action stays `queued`; read `samva.email.getOnboardingReview()` (or run `samva email doctor`)
for the reason. See [a send that stays queued](https://samva.dev/docs/mailboxes/approvals?utm_source=readme&utm_medium=sdk#a-send-that-stays-queued).

Replies arrive as signed webhooks or over the mailbox event stream, threaded to the conversation. Give
the agent a key that reaches only its own mailbox, and set rules that hold a send for a person to
approve: see [Give an agent an inbox](https://samva.dev/docs/mailboxes?utm_source=readme&utm_medium=sdk). To drive the same mailbox
from an MCP client instead, connect it to `https://mcp.samva.dev`
([guide](https://samva.dev/docs/developers/mcp?utm_source=readme&utm_medium=sdk)).

## Documentation

See [AGENTS.md](./AGENTS.md) for concise guidance when using this package with coding agents.

## Overview

The root entrypoint is Promise-based:

```typescript
import { createClient } from "samva";
```

The same Promise SDK is also available at `samva/promises`. Native Effect users import domain modules such as `samva/effect/email` and provide `samva/effect/client`. Both clients are generated from Samva's public OpenAPI document, while the Effect runtime does not wrap or execute the Promise SDK. Effect is an optional peer dependency, so Promise-only applications do not install or load it.

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

const samva = createClient({
  baseUrl: "https://api.samva.dev",
  apiKey: process.env.SAMVA_API_KEY!,
});

const { contact } = await samva.contacts.findOrCreate({
  lookup: { type: "email", value: "ada@example.com" },
  create: { name: "Ada Lovelace" },
});

const message = await samva.email.send({
  from: { email: "hello@yourdomain.com" },
  to: [contact],
  subject: "Hello",
  html: "<p>Hello World</p>",
  text: "Hello World",
  metadata: {
    externalUserId: "user_123",
  },
});

for await (const message of samva.messages.list.items({ limit: 20 })) {
  console.log(message.id);
}
```

`from` is an object, `{ email, name? }`, never a string, on an address at a verified domain
(a hosted mailbox domain counts). Omit it only when the template sets `fromDefault`, the
organization has a default sender, or it has exactly one verified sender. A new organization whose
only sending identity is a hosted mailbox address has none of these, so the send fails with
`FromAddressRequiredError` (`422`) with its `verifiedDomains` and `addresses`; pass one of those
addresses as `from: { email }`, or set a default with `samva.email.setDefaultSender` (`samva email senders set-default`).

Creation fails with `ConflictError` (HTTP 409) when an external ID or address belongs to another
contact. The error names the conflicting field and the creation is rolled back.

## Effect Quick Start

Install `effect` next to `samva` when using the Effect entrypoint, at a version in the range `samva` lists in `peerDependencies`:

```bash
bun add samva effect
```

```typescript
import { Effect } from "effect";
import * as Client from "samva/effect/client";
import * as Email from "samva/effect/email";

const program = Email.send({
  from: { email: "hello@yourdomain.com" },
  to: "ada@example.com",
  subject: "Welcome",
  html: "<h1>Welcome to Samva</h1>",
}).pipe(Effect.provide(Client.layerFetch({ apiKey: process.env.SAMVA_API_KEY! })));

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
import { createClient } from "samva";

const samva = createClient({
  apiKey: process.env.SAMVA_API_KEY!,
  baseUrl: "https://api.samva.dev",
});
```

- `X-API-Key` is configured automatically from `apiKey`.
- Organization context is derived from the API key, so do not send `x-org-slug`.

### OAuth bearer (interactive, multi-org)

```typescript
import { createClient } from "samva";

const samva = createClient({
  authToken: process.env.SAMVA_AUTH_TOKEN!,
  baseUrl: "https://api.samva.dev",
  orgSlug: "your-org-slug",
});
```

- Requests use `Authorization: Bearer <authToken>`.
- The token is user-scoped; send the target organization slug on every request via the `x-org-slug` header.
- `orgSlug` pairs with `authToken`; API keys already select their organization.

For terminal workflows (`samva login`, `samva org use`, `samva email send --dry-run`), see [`@samva/cli`](https://www.npmjs.com/package/@samva/cli).

The Promise and Effect clients identify their public SDK surface and package version with the
advisory `x-samva-client` request header. Supply your own value in `headers`, or set the header to
`null` in Promise request options or `undefined` in Effect client configuration to omit it.

## Send a Published Template

Author a template as TSX with `samva templates init`, then publish an exact commit with
`samva templates publish --commit HEAD` (see [`@samva/cli`](https://www.npmjs.com/package/@samva/cli)).
A published template is addressed by its slug, which is the `id` in its `defineTemplate` unless
`samva templates add --slug` chose another handle. `templateSlug` takes that slug; `templateId` takes
the template's `tmpl_...` id. A send names exactly one of them:

```typescript
import { createClient } from "samva";

const samva = createClient({ apiKey: process.env.SAMVA_API_KEY! });

await samva.email.send({
  from: { email: "hello@yourdomain.com" },
  to: [{ email: "ada@example.com" }],
  templateSlug: "order-shipped",
  templateData: { name: "Ada", orderId: "A-1042" },
});
```

A template send omits `subject`, `html`, and `text`; the request fails if `templateData` does not
match the template's input schema. `from` follows the same rule as above: pass it unless the
template's `fromDefault`, the organization default sender, or a single verified sender supplies it. `samva templates types` generates TypeScript types for that input.

The SDK and CLI flatten `templateSlug`, `templateData`, `templateId`, `publicationId`, `locale`, and
`timeZone` into the call. Over REST, `POST /v1/messages` nests them under `email`:

```json
{
  "channel": "email",
  "from": { "email": "hello@yourdomain.com" },
  "to": [{ "email": "ada@example.com" }],
  "email": {
    "templateSlug": "order-shipped",
    "templateData": { "name": "Ada", "orderId": "A-1042" }
  }
}
```

To create, save, and publish a template without Git or the CLI, see
[Create and publish a template from code](https://samva.dev/docs/sml/create-and-publish-from-code?utm_source=readme&utm_medium=sdk).

## Copy a Share Link

```typescript
import { createClient } from "samva";

const samva = createClient({ apiKey: process.env.SAMVA_API_KEY! });

const copy = await samva.templates.create({ shareLinkSlug: "for-context-dev" });
console.log(copy.projectId);
```

Pass only `shareLinkSlug` to copy every exported email into the current organization. The response
is the first template entry and includes the project ID to open in the editor. Repeated opens
reuse the organization's existing copy. An unavailable share link returns `ShareLinkUnavailable`
(410); copies already created remain independent.

Effect applications use `Templates.create({ shareLinkSlug })` from `samva/effect/templates`.
The CLI accepts `samva templates create --data '{"shareLinkSlug":"for-context-dev"}' --json`.

## Method Names

Each method is named for its API operation. A REST `DELETE` is `remove`: `mailboxes.remove`,
`namespaces.remove`, `webhooks.remove`, `email.removeDomain`, `newsletters.domains.remove`. The
exceptions are `apiKeys.revoke`, `whatsappSetupLinks.revoke`, `campaigns.archive`,
`templates.delete`, `templates.deleteProject`, and `templateShareLinks.delete`. The identity call is `samva.whoami.get()`, listing sent mail is
`messages.list`, and sending from a mailbox is `mailboxes.sendMessage`. Hosted MCP tool names are
`<group>_<operation>` and can use a different verb for the same operation, such as
`namespaces_delete` for `namespaces.remove`.

## Service Surface

The Promise client exposes:

- `accounts`
- `agents`
- `analytics`
- `apiKeys`
- `approvalRequests`
- `attachments`
- `brands`
- `campaigns`
- `contactGroups`
- `contacts`
- `conversations`
- `customFields`
- `email`
- `events`
- `feedback`
- `integrationCatalog`
- `integrations`
- `journeys`
- `mailboxes`
- `media`
- `messages`
- `namespaces`
- `operations`
- `organizations`
- `policies`
- `raw`
- `scheduledMessages`
- `subscriptions`
- `templates`
- `templateRegistrations`
- `templateShareLinks`
- `whatsapp`
- `whatsappFlows`
- `whatsappSetupLinks`
- `topicForms`
- `newsletters` (Preview), including `newsletters.issues` and `newsletters.domains`
- `topics`
- `webhooks`
- `whoami`

The Effect SDK exposes Pascal-cased domain modules; see the [namespace reference](https://samva.dev/docs/developers/typescript-sdk?utm_source=readme&utm_medium=sdk#namespaces) for their import paths.

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

Both clients retry safe operations by default:

- **What retries**: reads (`GET`/`HEAD`) and requests covered by `x-idempotent` in the OpenAPI document and its optional `x-idempotent-when` condition. Both clients attach one key per logical call and reuse it across retries. Other mutations never retry.
- **When**: only for `isRetryable` failures: throttling (`429`), transient server errors (including a transient `BillingProviderError`), request-transport failures, and attempt timeouts. `ValidationError`, `ConflictError`, `NotFound`, auth, and billing-limit `PaymentRequiredError` failures never retry.
- **How**: jittered exponential backoff, bounded to four attempts total. A `429` honors the server's `retryAfterSeconds` hint (capped at 60s) in place of the computed delay.

`contacts.startImport` retries only `mode: "new"`. Resumes use a generation fence and never retry automatically, even with an explicit key. After an ambiguous resume response, read `contacts.getImportJob` before deciding what to do next.

Retry policy is read from context via the `Retry.Service` service. When it is absent, the default applies, so no operation gains a requirement. Override it with a Layer:

```typescript sdk-typecheck-skip="Retry configuration fragment applies to the program from the Effect quick start"
import { Effect } from "effect";
import { isRetryable } from "samva/effect/categories";
import * as Retry from "samva/effect/retry";

// Turn auto-retry off for a program:
program.pipe(Effect.provide(Retry.layerDisabled));

// Or install a custom policy (any Effect.retry options):
program.pipe(Effect.provide(Retry.layer({ times: 6, while: isRetryable })));
```

### Timeouts

Each request attempt has a 30 000 ms bound. An attempt that outlasts it is aborted and fails with
`SamvaTimeoutError`, which carries `timeoutMs`. Every retry starts a fresh timer, and a timeout
retries exactly where a transport failure would: on reads and idempotent operations, with the same
idempotency key. Set `timeoutMs` on the client or per call; a per-call `undefined` inherits the
client's value, and `null` at either level disables the bound. A value that is not a positive,
finite number of milliseconds throws a `RangeError`.

```typescript
import { createClient, SamvaTimeoutError } from "samva";

const samva = createClient({ apiKey: process.env.SAMVA_API_KEY!, timeoutMs: 10_000 });

try {
  await samva.email.listDomains({}, { timeoutMs: 60_000 });
} catch (error) {
  if (error instanceof SamvaTimeoutError) console.error(`No answer in ${error.timeoutMs} ms`);
  else throw error;
}
```

`SamvaTimeoutError` extends `SamvaTransportError`. Aborting your own `signal` is not a timeout: it
rejects with a `SamvaTransportError` whose `cause` is the abort. Storage puts of oversized inline
attachments have their own bound, `uploadTimeoutMs` (default 300 000 ms, same rules), on the client
and on `email.send` and `messages.send`; a put past it fails as `MediaUploadError` caused by
`SamvaTimeoutError`. The media and send requests around the put keep `timeoutMs`.

The Effect client takes the same options on `Client.layer` and `Client.layerFetch`, `timeoutMs` per
call in each operation's options, and `uploadTimeoutMs` per call on `Email.send` and
`Messages.send`. A timed-out attempt fails with the tagged `SamvaTimeoutError` from
`samva/effect/errors`, which `isRetryable` accepts; interrupting the fiber stays an interruption.

### Idempotency keys

Each idempotent operation generates an `Idempotency-Key` per logical call, stable across the built-in retries and distinct across calls, so a retried send never delivers twice. Pass an explicit key for cross-process deduplication (safe to replay the same request from a different machine):

```typescript
import { createClient } from "samva";

const samva = createClient({ apiKey: process.env.SAMVA_API_KEY! });

await samva.email.send(
  {
    from: { email: "hello@yourdomain.com" },
    to: "ada@example.com",
    subject: "Your receipt",
    html: "<p>Thanks for your order.</p>",
  },
  { idempotencyKey: "order-4417-receipt" },
);
```

For sends, reusing a key with identical content replays the original response; different content fails with `ConflictError`. Other operations retain their documented replay and conflict behavior. The only override is `{ idempotencyKey }` in the second options argument; it is never part of params or request headers.

The Promise client accepts `maxRetries` in `createClient` and per-call options (zero disables retries). A client-level `idempotency: (operation) => key` hook supplies stable keys when needed; explicit options take precedence.

### Pagination

Promise lists expose lazy async iterators: `samva.contacts.list.pages(params)` yields page envelopes and `.items(params)` yields individual items. Both preserve filters and fetch the next cursor only when consumed.

Effect pagination uses Streams:

Cursor-paginated lists answer `{ items, nextCursor }`: pass `nextCursor` back as `cursor` for the next page, and stop when it is null. Every list operation that pages carries two `Stream` companions, so you traverse pages without hand-rolling a cursor loop:

- **`list.items(input?)`**: a `Stream` of individual items across all pages.
- **`list.pages(input?)`**: a `Stream` of raw page envelopes.

```typescript
import { Effect, Stream } from "effect";
import * as Client from "samva/effect/client";
import * as Contacts from "samva/effect/contacts";

const program = Contacts.list
  .items({ limit: 100, after: "2026-01-01T00:00:00Z" })
  .pipe(
    Stream.take(50),
    Stream.runCollect,
    Effect.provide(Client.layerFetch({ apiKey: process.env.SAMVA_API_KEY! })),
  );

const contacts = await Effect.runPromise(program);
```

The companions are attached uniformly to every paginated list, including `Messages.list`, `Contacts.list`, `Campaigns.list`, `Email.listDomains`, and `Webhooks.list`. Each page fetch reuses the ambient `Retry` policy. Reads retry per page; pagination does not nest retries. Pass `limit` as a number; both clients serialize it as a query string. A list bounded by design, such as `CustomFields.list`, answers `{ items }` in one response and carries no companions. Promise pagination uses async iterators; Effect pagination uses Streams.

### Redacted secrets

Effect client configuration accepts `apiKey: string | Redacted<string>` and unwraps a Redacted key
only for authentication. Promise client configuration accepts `apiKey: string` and does not require
Effect, including in browser bundles.

Secret-bearing response fields (the plaintext API key returned by `apiKeys.create` / `apiKeys.rotate`, and the webhook signing secret from `webhooks.regenerateSecret`) decode to `Redacted<string>` on the Effect surface. The secret never leaks through logs, `String(...)`, or `JSON.stringify`; unwrap it explicitly with `Redacted.value` when you need the plaintext:

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

`apiKeys.create` and `apiKeys.rotate` return the whole key object with the secret in `key`, and the
Promise client returns it as a plain string. Destructure the secret
(`const { key: secret } = await samva.apiKeys.create({ ... })`), write it to your secret store,
and keep the response out of request logs and agent tool output. Revoke a key that was printed.
Capture the key before any redaction filter runs; a filter that blanks the response loses the only
copy.

## OpenAPI vendor extensions

The published `openapi.json` carries machine-readable semantics on top of the standard schema, derived from the same contract annotations the Effect SDK uses (no second taxonomy):

| Extension           | Where             | Meaning                                                                                           |
| ------------------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| `x-category`        | error schemas     | The error's semantic categories (e.g. `["throttling", "transient"]`). Omitted when uncategorized. |
| `x-retryable`       | error schemas     | `true` when the error is safe to retry.                                                           |
| `x-idempotent`      | operations        | `true` when the operation accepts an `Idempotency-Key` header.                                    |
| `x-idempotent-when` | operations        | Optional `{ field, equals }` condition on the request body that limits idempotent replay.         |
| `x-sensitive`       | schema properties | `true` for secret-bearing fields (plain `string` on the wire; `Redacted` in the Effect SDK).      |

These let MCP and third-party consumers read retry/idempotency/secret semantics straight from the spec.

## Usage Examples

### Send Email

```typescript
import { createClient } from "samva";

const samva = createClient({ apiKey: process.env.SAMVA_API_KEY! });

const { contact } = await samva.contacts.findOrCreate({
  lookup: { type: "email", value: "ada@example.com" },
  create: { name: "Ada Lovelace" },
});

const response = await samva.email.send({
  from: { email: "hello@yourdomain.com" },
  to: [contact],
  subject: "Welcome",
  html: "<h1>Welcome to Samva</h1>",
  text: "Welcome to Samva",
  metadata: {
    campaign: "welcome",
  },
});
```

### Native Effect Send Email

```typescript
import { Effect } from "effect";
import * as Client from "samva/effect/client";
import * as Email from "samva/effect/email";

const program = Email.send({
  from: { email: "hello@yourdomain.com" },
  to: "ada@example.com",
  subject: "Welcome",
  html: "<h1>Welcome to Samva</h1>",
}).pipe(Effect.provide(Client.layerFetch({ apiKey: process.env.SAMVA_API_KEY! })));

const message = await Effect.runPromise(program);
```

### List Conversations

```typescript
import { createClient } from "samva";

const samva = createClient({ apiKey: process.env.SAMVA_API_KEY! });

const response = await samva.conversations.list({
  limit: 20,
  status: "active",
});
```

### Add and Verify a Domain

Email domain methods are flat on `samva.email`; only newsletter domains are nested under
`samva.newsletters.domains`. There is no `samva.email.domains`.

```typescript
import { createClient } from "samva";

const samva = createClient({ apiKey: process.env.SAMVA_API_KEY! });

// Register the domain. The response lists the DNS records to publish in `dnsRecords`.
const domain = await samva.email.addDomain({ domain: "mail.example.com" });

// Read the last observed state, then check DNS now. Repeat after publishing the records
// until `phase` is "ready".
await samva.email.getDomainVerification({ id: domain.id });
const verification = await samva.email.advanceDomainVerification({ id: domain.id });
console.log(verification.phase);

// Receive mail on a verified domain.
await samva.email.enableReceiving({ id: domain.id, catchAll: true });
const receiving = await samva.email.getReceivingStatus({ id: domain.id });
console.log(receiving.ready, receiving.mx.expected);

// Delete the domain. Removal finishes in the background: the domain reads `deleting: true`
// until teardown completes, then reads as not found.
await samva.email.removeDomain({ id: domain.id });
```

`enableReceiving` on a domain that is not verified returns a `ValidationError`; check verification
first. The MX record `getReceivingStatus` reports is the one to publish for inbound mail. The same
steps over REST are `POST /v1/email/domains`, `GET /v1/email/domains/{id}/verification`,
`POST /v1/email/domains/{id}/verify`, `POST /v1/email/domains/{id}/enable-receiving`,
`GET /v1/email/domains/{id}/receiving-status`, and `DELETE /v1/email/domains/{id}`; authenticate
with the `X-API-Key` header.

### Schedule a Message

```typescript
import { createClient } from "samva";

const samva = createClient({ apiKey: process.env.SAMVA_API_KEY! });

const scheduled = await samva.scheduledMessages.create({
  send: {
    to: [{ email: "ada@example.com" }],
    channel: "email",
    email: { subject: "Reminder", html: "<p>See you tomorrow.</p>" },
  },
  scheduledFor: "2026-08-01T09:00:00Z",
});

// Later, cancel it before it dispatches
await samva.scheduledMessages.cancel({ id: scheduled.id });
```

### Create and Run a Campaign

```typescript
import { createClient } from "samva";

const samva = createClient({ apiKey: process.env.SAMVA_API_KEY! });

const campaign = await samva.campaigns.create({
  name: "August newsletter",
  channel: "email",
  content: {
    channel: "email",
    email: { subject: "What's new", html: "<h1>Updates</h1>" },
  },
  audience: {
    topicId: "tpc_1234567890abcdef",
    includeTags: ["subscribers"],
    excludeTags: ["bounced"],
  },
});

const run = await samva.campaigns.scheduleRun({
  id: campaign.id,
  scheduledFor: "2026-08-01T09:00:00Z",
});

const recipients = await samva.campaigns.listRecipients({
  id: campaign.id,
  runId: run.id,
});
```

### Follow a Mailbox Send

Mailbox send, reply, forward, and draft send return action receipts. A successful `202` records
pending work; it is not a sent confirmation. Read `receipt.state` and preserve `receipt.actionId`:

```typescript
import { createClient } from "samva";

const samva = createClient({ apiKey: process.env.SAMVA_API_KEY! });

const receipt = await samva.mailboxes.sendMessage(
  {
    id: "mbx_...",
    to: ["ada@example.com"],
    subject: "Hello",
    text: "Hello from Samva",
  },
  { idempotencyKey: "support-message-123" },
);

const action = await samva.mailboxes.getAction({ id: "mbx_...", actionId: receipt.actionId });
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
continues the original action and never extends `executeUntil`. API keys cannot
cancel or Retry. `approveAction` returns an action with `202` while the send is pending; accepted,
completed, and `notSent` replays return `200`. Non-send approvals execute synchronously and return
`200`, as does `denyAction`.
The same behavior applies to `samva/effect/mailboxes`.

See [mailbox approvals and receipts](https://samva.dev/docs/mailboxes/approvals?utm_source=readme&utm_medium=sdk) for the receipt
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

```typescript sdk-typecheck-skip="Event loop fragment uses the application cursor store and event handler"
const events = samva.mailboxes.events({ cursor: savedCursor, mailboxIds: ["mbx_..."] });
for await (const event of events) {
  await handle(event.type, event.data);
  await saveCursor(event.cursor);
}
```

With Effect, `Mailboxes.events(options)` is a `Stream` of the same events that fails with a
`MailboxEventStreamFailure`, so `Effect.catchTag("CursorExpiredError", ...)` handles one cause.

### Custom Headers

```typescript
import { createClient } from "samva";

const samva = createClient({
  apiKey: process.env.SAMVA_API_KEY!,
  headers: {
    "X-Custom-Header": "value",
  },
});
```

### Error Handling

```typescript
import { createClient, RateLimitedError, SamvaApiError, SamvaTransportError } from "samva";

const samva = createClient({ apiKey: process.env.SAMVA_API_KEY! });

try {
  const message = await samva.email.send({
    from: { email: "hello@yourdomain.com" },
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
`SamvaTransportError`; an attempt past its `timeoutMs` throws its subclass `SamvaTimeoutError`.

### Raw response access

```typescript
import { createClient } from "samva";

const samva = createClient({ apiKey: process.env.SAMVA_API_KEY! });

const result = await samva.raw.messages.get({ id: "msg_7q2xk9mvt4znw8rh" });

if (result.error) console.error(result.response?.status, result.error);
```

Use `samva.raw` only when you need the generated `{ data, error, request, response }` envelope or
transport-level request options.

## Type Safety

All request and response types are generated from OpenAPI schemas:

```typescript
import { createClient } from "samva";

const samva = createClient({ apiKey: process.env.SAMVA_API_KEY! });

type EmailInput = Parameters<typeof samva.email.send>[0];

const input = {
  from: { email: "hello@yourdomain.com" },
  to: "ada@example.com",
  subject: "Hello",
  html: "<p>Hello World</p>",
} satisfies EmailInput;

const response = await samva.email.send(input);
```

## Agent event handlers

Import `defineAgent` from `samva/agent` and register handlers in `events`. Samva invokes each
matching handler with the event envelope and a fresh `ctx`; use `ctx.samva` for API calls.
Mailbox and contact events use the same module. Offline evals use `runAgent` from
`samva/agent/test`, with an explicitly supplied context. The event trigger includes its id,
type, and attempt number. Event SDK calls receive deterministic idempotency keys per agent,
event, operation, and call ordinal; keep writes in stable order across retries. An explicit
`idempotencyKey` overrides the generated key.
