# Samva SDK consumer guide

Use `createClient` from `samva` for Promise applications. Ergonomic methods return decoded values
and throw `SamvaApiError` subclasses; use `client.raw` only when request and response envelopes are
required.

Effect applications should import Pascal-cased domain modules from focused subpaths such as
`samva/effect/email` and provide `Client.layerFetch` from `samva/effect/client`. Install the optional
peer `effect` from the `^4.0.4` range this package's `peerDependencies` names when using those
entrypoints. Prerelease tags fall outside that range. Tagged API failures remain in the
Effect error channel and can be handled with `Effect.catchTag`. In Cloudflare Workers and Lambda,
import focused entrypoints rather than the `samva/effect` barrel, which loads every domain. In a
Worker, provide the client Layer per request with the request's abort signal; in Lambda or another
long-lived process, build it once in a module-scope `ManagedRuntime`.

Import error constructors from `samva/effect/errors` for `instanceof` or schema decoding; they are
the same constructors the operations use. This entry avoids domain modules, though native imports
still initialize shared schemas. Bundlers can discard unused operation wrappers and their exclusive
API groups; operations within a retained group still share its schemas.

Treat exported request and response types as the API contract. Do not import package-internal files
or generated implementation paths; use only the subpaths declared in `package.json`.

Mailbox send operations return asynchronous action receipts. Interpret `state`, preserve `actionId`,
and read `mailboxes.getAction` (or `Mailboxes.getAction`) to follow progress. Narrow on action `type`
before reading send-specific `send` receipt and frozen `intent`. `queued` is not a sent confirmation;
`accepted` supplies `messageId` and `acceptedAt`, while `completed` records mailbox projection,
not recipient delivery. Each request attempt fails with `SamvaTimeoutError` after 30 000 ms; set
`timeoutMs` on the client (`createClient`, `Client.layerFetch`) or per call, and `null` disables
the bound. A retry after a timeout preserves the original idempotency key and body; a new key can
send another email. `uncertain` requires reconciliation. Only a permitted person can cancel before
acceptance or retry an eligible original action without extending its deadline. Approval is also
asynchronous. See https://samva.dev/docs/mailboxes/approvals for the receipt contract.

`email.send` takes `from` as `{ email, name? }`, never a string. Without `from` it falls back to the
template's `fromDefault`, then the organization default sender, then the only verified sender; a new
organization whose only sending identity is a hosted mailbox address has none, so the send fails with
`FromAddressRequiredError` (`422`, with `verifiedDomains` and `addresses`) and the example must pass `from`.
`mailboxes.sendMessage` takes plain address strings and sends from the mailbox's default email
endpoint; it has no `from` or template fields. `mailboxes.create` takes a full address on
`whoami.get()`'s `organization.hostedMailDomain`; a slug is not an address.

A thread id is not a message id: `mailboxes.getThread` returns no messages, so read a thread's
`msg_` ids from `listThreadMessages({ id, threadId })` (or `getThreadContent`) and pass an item's
`id` as `messageId` to `reply`, `replyAll`, and `forward`. A thread's folder is set when it is
created and does not move on later replies: a thread a send started stays in `sent`, so
`listThreads({ folder: "inbox" })` omits it; omit `folder` and pass `unread: true` for replies.
To confirm a send landed, poll `getAction` until `state` is `completed`, `notSent`, or `uncertain`
within `executeUntil`, then read `action.send.messageId` and `action.send.threadId`.

A mailbox email endpoint's `sendingStatus` (`mailboxes.get`) reports the address's setup: `pending`,
`ready`, or `failed`. While the organization's email onboarding review is undecided, a send from a
`ready` address stays `queued`; read `email.getOnboardingReview()` for the cause.

Each SDK method is named for its API operation, so a REST `DELETE` is `remove` (`mailboxes.remove`,
`namespaces.remove`, `webhooks.remove`, `email.removeDomain`, `newsletters.domains.remove`). The
exceptions are `apiKeys.revoke`, `whatsappSetupLinks.revoke`, `campaigns.archive`,
`templates.delete`, `templates.deleteProject`, and `templateShareLinks.delete`. The identity call is
`whoami.get()`. `apiKeys.create` and `apiKeys.rotate` return the secret in `key`; destructure it and
keep the response out of logs.

Email domain methods are flat on `client.email`: `addDomain`, `getDomainVerification`,
`advanceDomainVerification` (checks DNS now; repeat until `phase` is `ready`), `enableReceiving`
(takes `id` and optional `catchAll`, `endpointId`, `addresses`; the domain must be
verified), `getReceivingStatus`, and `removeDomain`. Only newsletter domains nest, under
`client.newsletters.domains`.

Create and publish a template from code with `templates.create({ name, slug })`, `openWorkspace`,
`patchWorkspace`, `checkWorkspace`, `saveWorkspace`, `publish`, and `renderPublication`; every
workspace call carries the workspace `revision` as `expectedRevision`, and Save also carries
`expectedHead`. See https://samva.dev/docs/sml/create-and-publish-from-code.

Use `client.policies` or `Policies` from `samva/effect/policies` to read, replace, or clear an
organization, mailbox, or API key's decision rules. Policy writes require a person's OAuth session
(`authToken` and `orgSlug`), not an API key. Each rule sets `decide` (a default) or `atLeast`
(a binding floor). Scope policy reads return a flat snapshot with `version`, initially `0` when
unset. Replacement requires the observed `ifVersion`; `deletePolicy({ kind, id, ifVersion })`
clears the configuration. Both return the next snapshot, and clear keeps the counter. On
`ConflictError` (`409`), reload and review before editing again; never automatically retry stale
full configuration with a newer version. Agent definitions carry their own `policy`.
Read an action with `mailboxes.getAction` or read its decision in `mailboxes.getNeedsYou` before
reviewing it. Both `approveAction` and `denyAction` require the observed decision's positive
`reviewRound`. A stale round returns `409`; refresh the action and review its new decision before
deciding again. Never default the round or silently substitute the latest value.
`mailboxes.approveAction({ id, actionId, reviewRound: action.decision.reviewRound, edits: { text } })`
approves replacement message text with that review identity. Needs you includes held tool calls
and reports `counts.heldActions`.

Use `client.topics` (Promise) or `Topics` from `samva/effect/topics` (Effect) for topic management
and per-channel subscription preferences. `setSubscriptions` writes explicit `subscribed` or
`unsubscribed` status; `checkSubscription` resolves effective status including topic defaults.
`subscriptions.subscribe` requires `topicId` and requests recipient confirmation; acceptance
does not create a confirmed contact or subscription. Campaigns require `audience.topicId`, and
email content accepts `topicId`.

Use `client.newsletters.issues` (Promise) or `NewsletterIssues` from `samva/effect/newsletter-issues` (Effect) to read and
edit newsletter-owned Markdown issues, check and render fixtures, and save a commit. After the first create, mutations carry
`expectedRevision`; Save also carries `expectedHead`. Keep mutation idempotency keys stable on
retries. Campaigns select saved content with `content.issue: { path, commit }` and
`audience.topicId`. Web rendering produces a preview, not a published page. See
https://samva.dev/docs/channels/email/newsletters.

Every idempotent operation generates one key per logical call and reuses it across built-in
retries. Override only through the second options argument, `{ idempotencyKey }`. Both clients
retry reads and contract-marked idempotent mutations, after a timeout too. Promise clients accept
`maxRetries` at client and call level. Storage puts of oversized inline attachments use
`uploadTimeoutMs` (default 300 000 ms) instead of `timeoutMs`. `contacts.startImport` retries only `mode: "new"`; a resume uses
a generation fence and must be followed by `getImportJob` after an ambiguous response. Promise cursor lists expose lazy `.pages(params)` and `.items(params)`
async iterators. `orgSlug` selects an organization when paired with `authToken`.

Use `client.newsletters` for newsletter management and `client.newsletters.domains` for custom archive domains. Effect entrypoints are `samva/effect/newsletters`, `samva/effect/newsletter-issues`, and `samva/effect/newsletter-domains`. A newsletter’s `topicId` names its consent and campaign audience.

`client.newsletters.domains.list({ id, cursor, limit })` returns a hostname-ordered page with
`items` and `nextCursor`. Pass the cursor back unchanged. Use `domains.get` to recheck one domain's
DNS and certificate status.

Maintainers: generate `src/service-map.ts` and the Effect domain operation lists with
`bun run generate`; ergonomic adapters and schema exports belong in `codegen/facade-overrides.ts`.

Use `client.templateShareLinks` (Promise) or `TemplateShareLinks` from
`samva/effect/template-share-links` to create, update, get, rename, or delete a share link
for a `projectId`. Create accepts an optional `slug`; update exports the project's latest Save
at the same link. Rename changes the slug and breaks the old link. Delete removes the link;
existing guest copies remain independent. Get returns the link, canonicalPath, view/open counts and update time,
or `null` when the project has no share link.

Hosted agent modules import `defineAgent`, `defineTool`, and `AgentContext` from `samva/agent`;
offline evals import `defineEval`, `runAgent`, and `runEval` from `samva/agent/test`. These
entrypoints use the optional `effect` peer for tool input schemas. Register tools, Markdown skills,
events, and schedules explicitly in the entry module. `defineAgent` derives their manifest
descriptors; do not maintain a second tool list. `defineTool` decodes unknown input before calling
`execute`. Every tool declares `replay: "safe" | "unsafe"`; optional tool approval combines with
policy floors, and stricter requirements win. Keep each call's authority in its supplied `ctx`,
never in globals shared by a warm module. Event calls expose `eventId`, `eventType`, and
`attempt` in `ctx.capability.trigger`. SDK idempotent writes derive stable keys from the agent,
event, operation, and call ordinal; preserve write order across retries, or supply an explicit
`idempotencyKey`. Eval assertions reject `runEval` on failure.
