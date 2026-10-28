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
not recipient delivery. A timeout preserves the original idempotency key and body; a new key can
send another email. `uncertain` requires reconciliation. Only a permitted person can cancel before
acceptance or retry an eligible original action without extending its deadline. Approval is also
asynchronous. See https://samva.dev/docs/mailboxes/approvals for the receipt contract.

Use `client.topics` (Promise) or `Topics` from `samva/effect/topics` (Effect) for topic management
and per-channel subscription preferences. `setSubscriptions` writes explicit `subscribed` or
`unsubscribed` status; `checkSubscription` resolves effective status including topic defaults.
`subscriptions.subscribe` requires `topicId` and requests recipient confirmation; acceptance
does not create a confirmed contact or subscription. Campaigns require `audience.topicId`, and
email content accepts `topicId`.

Newsletter issue authoring is Preview and available only to selected organizations. Use
`client.newsletters.issues` (Promise) or `NewsletterIssues` from `samva/effect/newsletter-issues` (Effect) to read and
edit newsletter-owned Markdown issues, check and render fixtures, and save a commit. After the first create, mutations carry
`expectedRevision`; Save also carries `expectedHead`. Keep mutation idempotency keys stable on
retries. Campaigns select saved content with `content.issue: { path, commit }` and
`audience.topicId`. Web rendering produces a preview, not a published page. See
https://samva.dev/docs/channels/email/newsletters.

Every idempotent operation generates one key per logical call and reuses it across built-in
retries. Override only through the second options argument, `{ idempotencyKey }`. Both clients
retry reads and contract-marked idempotent mutations. Promise clients accept `maxRetries` at
client and call level. `contacts.startImport` retries only `mode: "new"`; a resume uses
a generation fence and must be followed by `getImportJob` after an ambiguous response. Promise cursor lists expose lazy `.pages(params)` and `.items(params)`
async iterators. `orgSlug` selects an organization when paired with `authToken`.

Mailbox extensions import `samva/mailbox`, `samva/mailbox/test`, or `samva/mailbox/webhook`.
Handlers receive the normal client and use flat calls such as
`ctx.samva.mailboxes.reply({ id, messageId, text })`. Keep sends in stable order so dispatch
reuses deterministic event keys.

Use `client.newsletters` for newsletter management and `client.newsletters.domains` for custom archive domains. Effect entrypoints are `samva/effect/newsletters`, `samva/effect/newsletter-issues`, and `samva/effect/newsletter-domains`. A newsletter’s `topicId` names its consent and campaign audience.

`client.newsletters.domains.list({ id, cursor, limit })` returns a hostname-ordered page with
`items` and `nextCursor`. Pass the cursor back unchanged. Use `domains.get` to recheck one domain's
DNS and certificate status.
