## @samva/webhooks@0.32.0

### Validate resource names

Create and update requests through the SDK and CLI reject organization, mailbox, mailbox endpoint display, sender, contact, contact group, campaign, newsletter, topic, and OAuth client names longer than 120 characters. Mailbox label display names are limited to 40 characters. Existing longer names remain readable; shorten a name when changing it.

### Find a conversation's threads across mailboxes

`mailboxes.listOrganizationThreads` accepts `conversation`, a conversation ID, and lists the threads that conversation has in the mailboxes you can read, newest activity first. A conversation holds at most one thread per mailbox, and mailboxes you cannot read never appear. The `mailboxes_threads_list` MCP tool takes the same filter.

```ts
const page = await samva.mailboxes.listOrganizationThreads({ conversation: "conv_...", limit: 1 });
```

### List your drafts across mailboxes

Use `mailboxes.listOrganizationDrafts` in the Promise or Effect SDK to list your own drafts across the mailboxes you can write to. Each summary carries its mailbox's `id`, `address`, and `kind`. Repeat `mailboxId`, or filter by `kind` and `threadId`, and page with `nextCursor`. Only the author sees a draft, and a personal mailbox's drafts stay with its owner.

```ts
const page = await samva.mailboxes.listOrganizationDrafts({ kind: "shared", limit: 20 });
```

The `mailboxes_drafts_list` MCP tool returns the same bounded page.

### Organize threads and decisions across mailboxes

Use `mailboxes.listOrganizationThreads` in the Promise or Effect SDK to read threads across the mailboxes you can access. Filter by mailbox, personal or shared kind, and active or Done state. Done includes your own Done threads and closed shared conversations, each once. `mailboxes.getNeedsYou` lists held sends you can approve and quarantined messages you can release, with counts across mailboxes.

Thread updates accept `done` for the current reader and `closed` for everyone in a shared mailbox. A new live message clears every reader's Done and reopens Close. Personal mailboxes refuse Close; archive their threads instead. Read the resulting state from the thread; Done and Close emit no webhook or event-stream event.

The CLI adds `samva mailboxes all-threads` and `samva mailboxes needs-you`. Use `samva mailboxes thread-update --data` to update Done or Close.

### Retry temporary template service failures

Template operations report temporary service failures as `ServiceUnavailableError` (503), with
`retryAfterSeconds` matching the `Retry-After` header. Wait before retrying and reuse the same
idempotency key for writes.

## @samva/webhooks@0.31.0

### Filter conversations by mailbox

Pass `mailboxId` to `conversations.list` to list only conversations in that mailbox. Combine it with the existing contact, channel, status, and date filters.

## @samva/webhooks@0.30.0

### One Idempotency Option Across the SDK

**Breaking:** Pass idempotency keys in the second options argument as `{ idempotencyKey }`.
Raw HTTP callers send `Idempotency-Key`; body and query spellings are removed. Both clients
supply a fresh key for every idempotent operation and reuse it across automatic retries.

The Promise client retries reads and idempotent mutations, accepts client-level and per-call
`maxRetries`, and adds lazy `.pages()` and `.items()` async iterators to cursor lists.
OAuth clients can select an organization with `orgSlug`.

**Breaking:** Import mailbox extension helpers from `samva/mailbox`, `samva/mailbox/test`, and
`samva/mailbox/webhook`. Handlers receive the normal client and call
`ctx.samva.mailboxes.reply({ id, messageId, text })`. Event dispatch preserves deterministic
send keys. The CLI extension scaffold uses these imports and flat calls.

For `samva events send`, pass `--idempotency-key` instead of embedding a key in `--data`.

### Agent definitions hold integration grants

`AgentDefinition.integrationIds` is replaced by `integrations`, a list of grants. Each grant names
the integration, the tools the agent may use (`all`, `readOnly`, or `selected` with `names`), and
the tools that always wait for a person (`requireApproval`). Replace each id in `integrationIds`
with `{ integrationId, tools: { kind: "all" }, requireApproval: [] }`.

Publishing an agent now fails with a validation error on `definition.integrations` when a grant
names an integration the organization has not installed or a tool its app does not have.

### Newsletters own issue publishing

Use `newsletters` for newsletter management, `newsletters.issues` for issue authoring, and
`newsletters.domains` for custom domains on the Promise client. Effect callers import
`samva/effect/newsletters`, `samva/effect/newsletter-issues`, and `samva/effect/newsletter-domains`.

The API uses `/v1/newsletters/:id/issues/*` and `/v1/newsletters/:id/domains/*`; CLI commands use
`samva newsletters`. Topic issue routes, SDK namespaces, MCP `issues_*` tools, and topic archive
fields are removed. Newsletter mutations accept one optional `Idempotency-Key` header. Consent,
subscriptions, sending defaults, and campaign audiences continue to use `topicId`.

Discover archive domains with `newsletters.domains.list` or `samva newsletters domains list`.
The hostname-ordered response includes verification snapshots and an opaque `nextCursor`.

### Accept Effect 4.0.x

`samva` and `@samva/webhooks` accept `effect@^4.0.4` as their optional peer. Install 4.0.6, or any
later 4.0.x, next to those packages when using the Effect entrypoints.

### Issue frontmatter carries an optional date

The `frontmatter` that `topicIssues.check` and `topicIssues.render` return includes an optional `date` (`YYYY-MM-DD`), the value a layout's `<IssueDate />` prints.

## @samva/webhooks@0.29.1

### Use Effect 4.0.5 with the SDK and webhook adapter

Install `effect@4.0.5` when using `samva/effect` or `@samva/webhooks/effect`. Both packages require
that exact peer version.

## @samva/webhooks@0.29.0

### Author newsletter issues and pin saved content to campaigns

The SDK adds `topicIssues` on the Promise client and `TopicIssues` at
`samva/effect/topic-issues`. The CLI adds `samva topics issues` for creating and editing Markdown
issues, checking and previewing email or web output, and saving commits. Listing issues returns
each draft's title and its latest campaign send, and needs messages read access beside contacts
read access. Issue authoring is Preview and requires access for your organization.

Campaigns accept `content.issue: { path, commit }` with `audience.topicId` to select a saved issue.
The saved title and preheader supply the email content, and each run keeps its selected path and
commit. Use the CLI's `--issue-path` and `--issue-commit` options to select that content.

### Use SML 0.21 for template projects

Update your project's `@samva/markup` and `@samva/vite` packages to 0.21.0. Compiled templates use
`sml: 2`; direct renderer calls select output with `{ target: "email" }` instead of
`{ channel: "email" }`.

### Publish sent newsletter issues on the web

Publication sites are Preview and available to selected organizations. Enable an opt-in topic's
archive with `archiveEnabled` and choose its `<publicationSlug>.samva.app` hostname. Sent issues
appear in the archive, RSS feed and sitemap; saving a draft does not publish it.

The SDK adds `topicPublicationDomains` on the Promise client and `TopicPublicationDomains` at
`samva/effect/publication-domains` to add, inspect and remove custom publication domains. The CLI
adds `--archive enabled|disabled` and `--publication-slug <label|none>` to topic settings.

Email sent with publication Preview access includes a private view-in-browser link to that
delivery's frozen content. Compiled templates must support SML's web renderer; raw API HTML and
text are also supported.

## @samva/webhooks@0.28.1

### Open every package README by saying what Samva is

The `samva`, `@samva/webhooks`, `@samva/cli`, native CLI, and `@samva/mailbox` READMEs now open
with a one-line description of Samva. `@samva/cli` describes itself as an email tool and drops the
`cpaas` and `messaging` keywords.

## @samva/webhooks@0.28.0

### Send at most 1,000 contact ids per bulk request

**Breaking:** `contacts.bulkDelete`, `contacts.bulkUpdateTags`, `contacts.bulkUpdateStatus`,
`conversations.addContacts`, `conversations.removeContacts`, and the `ids` filter of
`contacts.export` accept at most 1,000 contact ids. A longer list fails with `ValidationError`
(HTTP `422`), and the Effect client refuses it before sending. Split larger selections into
batches of 1,000.

### Subscribe contacts to topics

**Breaking:** Topics replace unsubscribe groups. Use `client.topics` (Effect: `samva/effect/topics`),
`audience.topicId` on campaigns, and `topicId` when requesting a confirmation email. Set each
contact's `subscribed` or `unsubscribed` status per topic and channel with `topics.setSubscriptions`.
Existing opt-outs carry over, and `opt_in` topics reach only subscribed contacts.

- Webhooks: subscription events carry `topicId`, `topicName`, and `channel` instead of group fields.
  Skipped-recipient receipts report `topic-unsubscribe` with a `topicId`, in the SDKs and in mailbox
  extensions.
- CLI: manage topics with `samva topics`. `samva subscriptions subscribe` requires `--topic-id`; the
  contact-group and unsubscribe-group flags are removed.
- Confirmation: a confirmation request creates the contact only once the recipient confirms.
  Outstanding confirmation links that named no unsubscribe group no longer work.

### Handle template build failures as `TemplateSourceError`

**Breaking:** When a template's source fails to build, saving, opening, publishing, or restoring a
workspace fails with `TemplateSourceError` (HTTP `422`) instead of `ConflictError` (`409`). Catch
`TemplateSourceError` wherever you caught `ConflictError` to read build findings. It is a
validation error and not retryable; the Effect client exports it from `samva/effect/errors`.

Its `diagnostics` hold the compiler's findings, each with a code, severity, and `origins` locations;
a failure with no location is a single `sml/build-failed` finding. If a save pulled in an outside
commit before the build failed, the error includes `revision`: reload the workspace, fix the
source, and retry. `ConflictError` now means only a real conflict, such as a moved branch head, a
save already in progress, or a reused idempotency key.

The CLI prints each finding's location and how to fix it. `--json` and `--jsonl` include every
finding in `details.diagnostics` and the next step in `next`.

### Pass query values as numbers and booleans

**Breaking:** Query parameters take numbers and booleans instead of strings, in both SDKs and
`@samva/mailbox`: for example `limit: 20`, `urlExpiresIn: 60`, `isActive: false`, `sendable: true`,
`shared: true`, and the mailbox `unread`, `starred`, and `snoozed` filters. Replace values such as
`limit: "20"`.

A call whose body has only optional fields no longer needs one. `campaigns.scheduleRun({ id })`
schedules a run with its defaults, and the Effect `Organizations.update()` and
`Email.updateTrackingDefaults()` send `{}`. CLI flags are unchanged.

### Personalize campaigns and see which campaign a reply answers

Campaign templates merge each contact's profile and custom fields, falling back to `templateData`.
A recipient missing a required value is skipped with `missing_merge_field` and the missing field.
Campaigns can override the sender, reply mailbox, and preheader; the defaults come from the topic.

Preview a campaign as a contact with `campaigns.preview`, and send yourself a copy with
`campaigns.sendTest` without starting a run.

An authenticated reply to a campaign message carries `campaign: { campaignId, runId }` in message
and mailbox reads and in the `message.received` and `mailbox.message.received` webhooks.

### Set a brand's return website

Set `footer.websiteUrl` when creating or updating a brand to choose the HTTPS return link on its
hosted recipient pages. Brand responses include the configured URL.

### Import subscriber lists as a background job

**Breaking:** `contacts.bulkImport` is removed. Plan an import with `contacts.planImport`, start it
with `contacts.startImport` using the plan's preview hash and an idempotency key, and follow it with
`contacts.getImportJob`. Imports run as a background job instead of returning per-contact results.
List import is in Preview and must be enabled for your organization.

Import related beehiiv, Substack, Kit, or Mailchimp exports together. When files disagree about a
contact, the most restrictive status wins, and reimports keep existing unsubscribes, suppressions,
and bounces. Contact detail shows which import a contact came from.

In the CLI, preview with `samva contacts import --preset --topic --file EVIDENCE=PATH --dry-run`,
start with an idempotency key, follow progress with `samva contacts import-status`, and resume an
eligible failed job with `samva contacts import-resume`.

### Read a campaign run's results

`campaigns.getRunReport` and `samva campaigns report <campaignId> <runId>` return a run's delivery
outcomes, replies, topic unsubscribes, and skipped recipients, counted once per recipient. Opens and
clicks are marked directional and leave out those classified as automated.

### Calendar changes always wait for approval

**Breaking:** Remove `approvalPolicy` from the agent `definition` you pass to `agents.create` and
`agents.replaceDraft`. An agent's Google Calendar bookings, changes, and cancellations always wait
for a person to approve them.

### Read the source on GitHub

The packages' source is public at
[SamvaHQ/samva-typescript](https://github.com/SamvaHQ/samva-typescript), a read-only mirror updated
with each release. The npm `repository` and `bugs` links point there; report problems as issues on
that repository.

### Every agent draws AI credits

**Breaking:** Organization usage no longer has a Standard allowance: `standardGranted`,
`standardRemaining`, and `standardResetsAt` are removed, and `samva org usage` no longer prints
them. Every agent draws the plan's monthly AI credits instead. Show the balance from
`includedAiCredits`, `usedAiCredits`, `aiPackCredits`, and `aiResetsAt`.

## @samva/webhooks@0.27.0

### Manage hosted agents from the SDK

The Promise client has an `agents` service and the Effect SDK has an `Agents` module
(`samva/effect/agents`) for the hosted agents API, which is in Preview: `list`, `create`, `get`,
`update`, `remove`, `replaceDraft`, `publish`, `listVersions`, and `getVersion`.

### Construct tagged union members without `_tag`

The Effect schemas for the mailbox send errors and the domain verification evidence variants are
now `Schema.TaggedStruct`, so their `make` constructors fill in `_tag`. Decoded values and the JSON
they read and write are unchanged.

## @samva/webhooks@0.26.0

### Set custom headers on an email send

Pass `headers` on an email send: a map of header name to value, copied onto the outgoing message.
`email.send`, `messages.send`, and a scheduled email's `email` accept it. The API rejects a reserved
name, an empty value, and more than 11 headers.

## @samva/webhooks@0.24.0

### A send with no default sender fails with `FromAddressRequiredError`

When an email send omits `from` and no default sender applies, the SDK now throws (Promise) or fails
with (Effect) `FromAddressRequiredError` instead of `ValidationError`. Its `verifiedDomains` lists the
domains you can send from: pass `from` with any address on one of them, or set a default sender.
Email sends and send validation, scheduled message resume, campaign run scheduling, and subscription
requests can return it.

The SDK is generated from samva-openapi v0.31.0.

## @samva/webhooks@0.23.1

### Pass `undefined` inside template data and metadata

The Promise client's request types accept `undefined` for entries of free-form objects such as `templateData` and `metadata`, so `campaigns.create({ ... templateData: { name: user.name } })` type-checks when `user.name` may be `undefined`. Optional properties already accepted `undefined`. The entries are omitted from the request, as they are for optional properties.

Types that appear in both requests and responses keep their exact shape for reads, and a `Writable` variant describes what you send: `JsonObject` has `JsonObjectWritable`, `TemplateData` has `TemplateDataWritable`, `JourneyDefinition` has `JourneyDefinitionWritable`, and so on. Request parameters use the `Writable` types, and a value you read, such as a journey's draft, is assignable to the matching request. The `Writable` types are exported from `samva/promises`.

### Pass more than one item to list parameters

Promise client parameters that take a nonempty list, such as `to`, `tags`, `ids`, `contactIds`, `labels`, and the events in `events.batch`, are typed `[T, ...T[]]`, so a call with two or more items type-checks.

## @samva/webhooks@0.23.0

### Breaking: read compiled template publication responses

Read `publication.compiled` instead of `publication.ir`, and `publication.manifest.compiled`
instead of `publication.manifest.ir`. Their artifact and metadata fields keep the same shapes.

Read a publication brand's `renderedFooter.html`, `renderedFooter.text`, and
`renderedFooter.headCss` instead of its `withUnsubscribe` / `withoutUnsubscribe` footer blocks.
The HTML includes the unsubscribe row; the send path removes it when no unsubscribe group applies.
Replace imports of `BrandFooterBlock` with `BrandRenderedFooter`; `headCss` is a required string.

Workspace diff asset changes expose `digest` (SHA-256 for present assets, `null` for deleted
assets). Rendered email fixtures expose `sentBytes` and `previewBytes` for sent and preview HTML.

### Set the organization avatar from the SDK and CLI

`Organization` has `avatarUrl`, the image the organization switcher shows, or `null` when none is
set. `organizations.createAvatarUpload()` returns `uploadUrl`, `maxBytes`, and `contentTypes`: PUT a
PNG, JPEG, or WebP image there with the same credential, then save the returned `src` with
`organizations.update({ avatarUrl: src })`. Pass `avatarUrl: null` to remove it.

`samva org avatar set <file>` uploads an image and saves it in one step, and checks its type and size
before sending it. `samva org avatar clear` removes the avatar.

### Read AI credits in organization usage

Organization usage reports AI credits apart from sending credits: `billing.includedAiCredits`,
`usedAiCredits`, `overageAiCredits`, and `overageAiCost`. Each is `null` when the workspace has no
metered AI plan, and `overageAiCost` is also `null` outside USD. `samva org usage` shows them next to
the sending credits.

## @samva/webhooks@0.22.1

### Use Effect 4.0.4 with the SDK and webhook adapter

Install `effect@4.0.4` when using `samva/effect` or `@samva/webhooks/effect`. Both packages require
that exact peer version. Effect SDK operations preserve decoded response types and pagination
helpers with Effect 4.0.4.

## @samva/webhooks@0.22.0

### Start a template project from a website

`templates.createFromWebsite` (`POST /v1/templates/from-website`) checks that a website is a public
page that answers, creates a template project, and returns the request that makes the editor's
assistant match the site's look. The assistant proposes a brand, and the brand changes nothing until
you apply it in the editor. A site Samva cannot use creates no project; the `422` message names the
cause: not a web address, not public, no answer, a missing page, refused automated visits, or not a
web page.

`samva templates from-website <url>` does the same from the CLI and prints the editor link.

### Subscribe a webhook to every event Samva delivers

`webhooks.create` and `webhooks.update` in the SDK, and `samva webhooks create` and
`samva webhooks update` in the CLI, now accept `template.registration.updated`,
`flow.registration.updated`, and `whatsapp.number.connected` in `eventTypes`. Before, they
rejected those values even though `@samva/webhooks` types the events, so a webhook's `eventTypes`
can now name every event `@samva/webhooks` verifies.

### Typed WhatsApp read, registration, and number events in webhook verification

`verify` and `verifyRequest` in `@samva/webhooks` (and `samva/webhooks`) now type and validate
`message.read`, `template.registration.updated`, `flow.registration.updated`, and
`whatsapp.number.connected`. Before, they returned these events as `UnknownWebhookEvent` with an
unchecked payload. Each now has its event and payload types (`MessageReadPayload`,
`TemplateRegistrationUpdatedPayload`, `FlowRegistrationUpdatedPayload`,
`WhatsappNumberConnectedPayload`), and a payload that breaks its schema fails with
`MalformedWebhookPayloadError`.

### Webhook verification accepts every channel an event carries

`verify` and `verifyRequest` in `@samva/webhooks` (and `samva/webhooks`) now accept message,
mailbox message, conversation, and contact consent events from every channel Samva delivers them
on. Before, they rejected a `message.received` whose `channel` was not `email` with
`MalformedWebhookPayloadError`. The event types follow: `channel` is `"sms" | "whatsapp" | "email"`
on those events, and their channel-specific fields are typed. `message.opened` and
`message.clicked` stay `email`.

## @samva/webhooks@0.21.0

### Read a webhook signing secret

Read the current signing secret with `client.webhooks.getSecret({ id })` or Effect's
`Webhooks.getSecret({ id })` from `samva/effect/webhooks`. Both return `secret`, `createdAt`, and
`previousExpiresAt`; the Effect secret is `Redacted`. Reading requires `webhooks:update`.

### Use the current template, run, and API-key response shapes

**Breaking:** response fixtures must include `shared` on templates and template summaries, `end`
on API keys, `pendingCount` on campaign runs and latest-run summaries, `holdUntil` and
`capacityWarning` on campaign runs, and `holdReason` and `holdUntil` on journey runs and details.
Nullable fields still need an explicit `null` when absent.

Template create, update, and list operations also accept `shared` to manage or filter projects
shared with every namespace.

### Rendered brand footers carry their head rules

The `renderedFooter` blocks on a brand snapshot (`withUnsubscribe`, `withoutUnsubscribe`) gain an
optional `headCss` string: the dark-mode and logo-swap rules the footer needs in the message head.
Brands saved before this release omit it.

## @samva/webhooks@0.20.0

### `MailboxChannelUnsupportedError` is removed

Breaking: the mailbox API no longer answers a channel with `MailboxChannelUnsupportedError`, so
`samva/effect/errors` no longer exports it. A channel that is not enabled for the organization is
refused with `FlagDisabledError` (403), and a mailbox with no endpoint on the channel with
`ValidationError` (422). Remove any `catchTag("MailboxChannelUnsupportedError", ...)` and handle
those two instead.

## @samva/webhooks@0.19.0

### Unsubscribe groups key members by contact, and contacts record consent

Breaking: unsubscribe group membership belongs to a contact, so the member calls take contacts
instead of email addresses.

```ts
await samva.unsubscribeGroups.addMembers({
  id: group.id,
  members: [{ contactId: "contact_k9mvt4znw8rh7q2x" }, { email: "ada@example.com" }],
});
const { contactId, unsubscribedGroups } = await samva.unsubscribeGroups.checkSubscription({
  email: "ada@example.com",
});
```

- `addEmails` and `removeEmails` are now `addMembers` and `removeMembers`. Each takes `members`, a
  non-empty list of `{ contactId }`, `{ email }`, or `{ phone }`. An address no contact holds gets a
  new contact when you add it, and is skipped when you remove it.
- `listMembers` items carry `contactId` and no longer carry `email`.
- `checkSubscription` takes exactly one of `contactId`, `email`, or `phone`, and returns `contactId`
  (null when no contact holds the address) in place of `email`.
- `contact.subscribed`, `contact.unsubscribed`, and `contact.resubscribed` events always carry
  `contactId`; `email` is optional. The preference center payload `email` can be null.

Contacts also record consent. `contacts.setConsent` stores whether a contact opted in or out on a
channel at one of its addresses, with your `source`, when it was `capturedAt`, and optional `proof`.
Each identity's channels carry the recorded `consent` (null when none is recorded). An opt-out stops
every send to that address on that channel, and an opt-in lifts it. A confirmed double opt-in
records the email address as opted in. A change publishes the new `contact.consent_changed` webhook
event.

### Contact identities are typed `email` or `phone`

Breaking: replace `channel` with `type` wherever you send or read contact identities.

```ts
await samva.contacts.create({
  name: "Ada",
  identities: [{ type: "phone", identifier: "+14155550123" }],
});
```

- A contact identity is `{ id, type, identifier, verified, channels }`. `type` is `email` or `phone`,
  and `identifier` is stored normalized: emails lowercased, phone numbers in E.164.
- Contact lookups accept `email`, `phone`, or `externalId`.
- A phone number written without a leading `+` is read in the organization's default region. Set
  it with `organizations.update({ defaultRegion: "US" })`; without one, such a number is a
  validation error. The organization field `countryCode` is gone.
- `contact.*` webhook identities carry `type` instead of `channel`.

### See how a held send was resolved

A send held for approval now tells you how it ended, without polling.

- Every mailbox action carries `resolution`: `outcome` (`approved`, `denied`, or `cancelled`),
  the resolving `actor` (`kind`, `id`, optional `displayName`, and `source`), `resolvedAt`, and
  the denial `reason` (`null` otherwise). It is `null` while the action waits for approval and for
  an action that never needed one.
- A new `mailbox.action.resolved` event fires once when a held send is approved, denied, or
  cancelled, on webhooks, the mailbox event stream, and to extensions that list it in `events`. It
  carries the action and the same `resolution` object. An approved send still publishes
  `mailbox.message.sent` once its email is accepted.
- `samva mailboxes actions get|list|approve|deny` prints the resolution.

Types that list every mailbox event, such as an exhaustive `switch` over `MailboxEventType`, gain
`mailbox.action.resolved`.

### Mailbox event stream: `onReconnect`, and an idle timeout that says so

`samva.mailboxes.events` takes an `onReconnect` callback, called before each reconnect with the
`error` that ended the connection, the `cursor` it resumes from, the `attempt` number, and the
`delayMillis` before it connects.

A connection that goes 90 seconds without a frame is closed by the client. Its
`StreamDisconnectedError` now has `reason: "idleTimeout"` and no `closeCode`; it used to report
`closeCode: 1006`, which is what a connection dropped without a close frame still reports. Code that
treated every `1006` as a network drop can branch on `reason` to tell the two apart.
`MailboxEventStreamError` gains the `reason` field, and `MailboxEventStreamReconnect` and
`MailboxEventStreamErrorReason` are exported types.

A normal close (`1000`) from the host now ends the iteration after the events already received,
instead of reconnecting.

## @samva/webhooks@0.18.0

### Smaller Effect email bundles and focused error imports

Importing only `send` from `samva/effect/email` no longer bundles email administration. In a
minified bundle with Effect excluded, Samva's code drops from about 167 KB to 54 KB.

Import error classes from `samva/effect/errors` without loading every API domain:

```ts
import { InternalError, MediaUploadError } from "samva/effect/errors";
```

These are the same classes the operations use, so `instanceof` works across imports. Existing
imports and `Effect.catchTag` handlers keep working. Unbundled error imports still load shared
schemas.

## @samva/webhooks@0.17.0

### Journeys and contact events (preview)

The SDK and CLI now include operations for journeys and contact events. They are not available to
organizations yet: until they are enabled for yours, each call fails with `FlagDisabledError`
(HTTP 403). Guides will follow when they open.

- Journeys: `journeys.create`, `replaceDraft`, `publish`, `pause`, `resume`, `archive`, `stats`,
  `listRuns`, and `getRun`, and the `samva journeys` commands.
- Contact events: `events.create`, `events.batch`, and `contacts.listEvents`, and the
  `samva events send` and `samva contacts events` commands.

### Mailbox webhooks carry the channel and endpoint

The `@samva/webhooks` types and validators for `mailbox.*` events include two optional fields: a
message's `channel`, the channel it travelled on (`email` today), and a thread's `endpointId`, the
mailbox endpoint it arrived at. Payloads that carry them now type-check and validate.

### Faster cold starts for the Effect client in Workers and Lambda

Each `samva/effect/<domain>` entrypoint now loads only that domain, and `Client.layer` does no work
until your first call. A Cloudflare Worker that sends with `samva/effect/email` bundles about 166 KB
of Samva code instead of 547 KB, and a Worker using `samva/effect/contacts` starts several times
faster. The package also declares `sideEffects: false`, so your bundler drops modules you don't use.

To get the benefit, import focused entrypoints rather than the `samva/effect` barrel, which still
loads every domain. In a Worker, provide the client per request:

```ts
import { Effect } from "effect";
import * as Client from "samva/effect/client";
import * as Contacts from "samva/effect/contacts";

export default {
  fetch: (request: Request, env: Env) =>
    Effect.runPromise(
      Contacts.list({}).pipe(
        Effect.map((page) => Response.json(page)),
        Effect.provide(Client.layerFetch({ apiKey: env.SAMVA_API_KEY })),
      ),
      { signal: request.signal },
    ),
};
```

In Lambda or another long-lived process, build the client once in a module-scope `ManagedRuntime`.

**Breaking:** `Client.raw` and the `Raw` type are removed from `samva/effect/client`. Call the
domain operation instead, such as `Contacts.list(...)` from `samva/effect/contacts`; every endpoint
has one. The Promise client's `samva.raw` is unchanged.

## @samva/webhooks@0.16.0

### Identify the calling credential with `whoami`

`samva.whoami.get` (Promise) and `Whoami.get` (`samva/effect/whoami`) call `GET /v1/whoami`, which
returns the organization behind the request and the credential it presents: an API key with its
`id`, `name`, `start`, and `access`, or a signed-in user with their `role`. Any valid credential can
call it, including a key with no grants. `samva/effect/api-keys` also exports `CreatePayload` and
`UpdatePayload`.

### Mailbox endpoints

A mailbox owns endpoints: one address on one channel. Email is the channel a mailbox uses today.
Replies and forwards leave from the endpoint the thread arrived at, and new mail leaves from the
mailbox's default endpoint.

**Breaking:** addresses become endpoints across the mailbox API.

```ts
// Before
await samva.mailboxes.create({ address: "support@acme.samva.email", name: "Support" });
await samva.mailboxes.createAddress({ id, address: "billing@acme.samva.email" });
await samva.mailboxes.update({ id, defaultFrom: { address, displayName: "Acme Support" } });
await samva.mailboxes.removeAddress({ id, addressId: "mbxaddr_..." });

// After
await samva.mailboxes.create({
  endpoint: { channel: "email", address: "support@acme.samva.email" },
  name: "Support",
});
await samva.mailboxes.createEndpoint({ id, channel: "email", address: "billing@acme.samva.email" });
await samva.mailboxes.updateEndpoint({
  id,
  endpointId,
  displayName: "Acme Support",
  default: true,
});
await samva.mailboxes.removeEndpoint({ id, endpointId: "mbxep_..." });
```

- A mailbox returns `endpoints`, each with `id` (`mbxep_`), `channel`, `address`, `displayName`,
  and `default`, in place of `addresses` and `defaultFrom`. `mailboxes.update` no longer takes
  `defaultFrom`. Existing address ids are migrated to endpoint ids.
- Mail leaves with the endpoint's `displayName`, else the mailbox's `name`.
- A mailbox keeps at least one endpoint; removing the last is refused with `422`.
- Mailbox audit events from `mailboxes.listEvents` are renamed: `address.attached` and
  `address.detached` become `endpoint.attached` and `endpoint.detached`, and `email.received`,
  `email.released`, and `email.sent` become `message.received`, `message.released`, and
  `message.sent`.
- A new-conversation draft may name the `endpointId` it sends from.
- Thread summaries gain `channel` and `endpointId`, message summaries gain `channel`, and mailbox
  webhooks add `message.channel` and `thread.endpointId`. Both webhook fields are optional, so
  earlier deliveries still decode.

### Breaking: one default sender

An organization has one default sender, and domains no longer carry their own. Omitted-`from` sends
use the request `from`, then the template's `fromDefault`, then the organization default sender,
then the only verified sender.

**Breaking:** `email.setDomainDefaultSender` and `email.clearDomainDefaultSender` are removed, and
domains no longer return `defaultSenderId`. Set the default with `email.setDefaultSender`, which
marks a verified, active sender as the organization default.

```ts
// Before
await samva.email.setDomainDefaultSender({ id: domainId, senderId });

// After
await samva.email.setDefaultSender({ id: senderId });
```

Where a domain's default sender decided the From address, that sender becomes the organization
default, so omitted-`from` sends keep their From.

## @samva/webhooks@0.15.0

### Create a mailbox from one address and a name

**Breaking:** `mailboxes.create` takes one `address` and a `name`.

```ts
// Before
await client.mailboxes.create({
  slug: "support",
  displayName: "Support",
  addresses: [{ address: "support@acme.samva.email" }],
});

// After
await client.mailboxes.create({ address: "support@acme.samva.email", name: "Support" });
```

- `slug` is optional and defaults to the address's local part. If that slug is taken, pass your own.
- A mailbox's `displayName` is now `name` on create, update, and every read. Sender and address
  display names keep `displayName`.
- Add and remove addresses with `mailboxes.createAddress` and `mailboxes.removeAddress`. Choose the
  sending address with `mailboxes.update`.
- Mail from a mailbox with no sender name now shows the mailbox's `name` instead of a bare address.

## @samva/webhooks@0.14.0

### Mailbox storage counts sent mail

Mailbox storage usage includes the sent messages and attachments Samva keeps, not only received
mail.

### Request recipient confirmation before subscribing

Use `client.subscriptions.subscribe` or `samva subscriptions subscribe` to send a confirmation email
from your sender. The recipient joins the selected contact group only after confirming the link.
Choose a published template for the confirmation email, or use the default message.

### Tell outages apart from bad credentials

When Samva can't check a credential because of an outage, the SDK returns `InternalError`. An
invalid, removed, or disabled credential still returns `UnauthorizedError`.

### Breaking: fewer mailbox audit event types

`mailboxes.listEvents` no longer returns `thread.updated`, `draft.created`, or `draft.updated`;
remove those cases from your handlers. Mailbox webhook and notification events are unchanged.

### Render a template publication with real input

`templates.renderPublication` renders one immutable publication against the input you pass and
returns the subject, preheader, HTML, and plain text a send would produce. The input is validated
against the publication's schema as a send validates it, and nothing is sent.

### Breaking: mailbox sends return action receipts

Mailbox sends, replies, forwards, draft sends, and approvals now return `202` with a receipt while
the send is in progress. Replace `status: "sent" | "pending_approval"` checks with `state`:
`approvalRequired`, `queued`, `accepted`, `completed`, `notSent`, or `uncertain`. `messageId` stays
`null` until Samva accepts the message.

A send that is rate limited, waiting on its sender, or waiting on onboarding review no longer fails
with `429`, `503`, or `403`. It is queued and retried until its deadline, and the reason is on
`problem.error`. Policy refusals still return `403`, and validation errors `422`.

Follow a send with `mailboxes.getAction`. A person can stop it before acceptance with `cancelAction`
or resume an eligible ended send with `retryAction`. After a lost response, retry with the same idempotency key
and body to get the same receipt.

### Typed webhook events

Webhook verification returns typed events; use `isKnownEvent` to narrow by `type`. Event types
added after your SDK version still verify, with an untyped payload.

**Breaking:** a known event whose payload doesn't match its type now fails verification. Bounce and
complaint events arrive once per affected recipient, with `recipient` and `occurredAt`, so
deduplicate on `webhook-id` rather than `messageId`.

### Redacted API keys

The Effect client accepts a `Redacted` API key. The Promise client takes a string and doesn't depend
on Effect.

### Deleting a namespace

Delete a namespace's mailboxes, API keys, and webhook endpoints before deleting the namespace.

### Breaking: separate contact lookup from creation

`contacts.findOrCreate` takes `lookup: { type, value }` instead of competing lookup fields and
returns `{ contact, created }`. Put initial attributes in `create`, including `externalId`,
`identities`, and `profile.customFields`. Existing contacts return unchanged with `created: false`;
use `contacts.update` to change them. Conflicting external IDs or addresses return `ConflictError`
(HTTP 409) and roll back creation.

### Inspect contacts and custom fields

`contacts.list` can select defined custom fields with `fields` and filter one field by JSON scalar
equality with `customField` and `customFieldValue`.

`samva contacts list|get` supports search and custom-field inspection, bounded JSON output, and
streaming list pages with `list --all --jsonl`.

## @samva/webhooks@0.13.0

### Breaking: bulk import takes identities and a profile

`contacts.bulkImport` entries match `contacts.create`: send addresses as `identities` and details in
`profile`, instead of top-level `email`, `phone` and name fields. Every entry needs an identity.
`onConflict: "skip" | "update"` replaces `upsertByEmail` and matches on any identity; `"update"`
merges like `contacts.update`.

### Breaking: audiences cover people only

`contactGroups.preview` no longer takes `contactTypes` or `capabilities`, and the `type` and
`engagement.*` conditions are gone. A condition Samva can't evaluate now fails with `422` instead of
being ignored, including on stored audiences that still use these fields.

### Breaking: contact webhooks match the Contact model

`contact.*` webhook data no longer includes `type` or `organizationId`.

### Upgrade mailbox extensions in place

`extensionInstallations.upgrade` moves an installation to a published version while preserving its
identity, credentials, scope, and send mode. Use `dryRun` to review `permissionDiff`, then name each
added grant in `acceptPermissions`. The response includes the source and target versions and a
`versionChange` record for an applied change. A person credential is required.

### Handle mailbox send refusals by type

Mailbox sends, replies, forwards, draft sends, and approval execution preserve `RateLimitedError`
with `retryAfterSeconds` and `OnboardingReviewRequiredError` with its review fields and `nextAction`.
`SenderNotReadyError` identifies a sending identity that is still getting ready and carries a retry
delay when known. These errors are available through the Promise and Effect clients.

### Large attachments upload for you

A request carries at most 4 MiB of inline attachment `content`, so it stays under the API's 6 MB
request limit. `messages.send` and `email.send` upload the largest inline attachments through media
until the rest fit, then send once with their `mediaId`. A failed upload throws `MediaUploadError`.
Media attachments accept any content type, and retrying a send with the same idempotency key
replays it even when the retry uploads the same file again. In `samva/effect`, multi-megabyte
inline `content` no longer overflows the stack while the request is checked.

## @samva/webhooks@0.12.0

### Breaking: the mailbox event stream uses pings

The mailbox event stream no longer sends `heartbeat` frames. The SDK and `samva mailboxes events`
now send `{"kind":"ping"}` every 30 seconds, and the stream answers with `{"kind":"pong"}`. Upgrade
the SDK or CLI before you rely on a long-lived stream: an earlier version reads the silence of a
quiet mailbox as a dropped connection and reconnects about every 90 seconds.

If you read the WebSocket directly, send the ping yourself and treat three silent intervals as a
dropped connection. A live stream also receives a `progress` frame carrying the position it has
passed, at most every 5 minutes; resume from it when nothing is pending. Samva now re-checks an open stream's credential every 5 minutes instead of
every minute, so a revoked key can keep receiving events for up to that long.

## @samva/webhooks@0.11.0

### Mailboxes for agents

`samva.mailboxes` gives an agent or app its own email address: read and label threads, send, reply
and forward, and keep drafts and notes. Grant people and API keys access per mailbox, and hold a
key's outgoing mail for a person's approval (`listActions`, `approveAction`, `denyAction`).
Suspicious inbound mail waits in quarantine for `releaseMessage` or `discardMessage`.

`samva.mailboxes.events({ cursor, mailboxIds })` streams events as an async iterator that
reconnects on its own; save `event.cursor` to resume after a restart. In `samva/effect`,
`Mailboxes.events` is a `Stream`. `samva.extensions` and `samva.extensionInstallations` publish
and install code that runs on mailbox events. See [Mailboxes](https://samva.dev/docs/mailboxes).

### Breaking: lists page by cursor

Lists take `limit` and `cursor` and return `{ items, nextCursor }`; pass `nextCursor` back until it
is `null`. `page`, `offset`, `total` and `pagination` are gone. In `samva/effect`, `list.items()`
and `list.pages()` walk every page. Short lists (attachments, forwarding rules, custom fields,
unsubscribe groups) return `{ items }` without paging.

### Breaking: smaller read models

Lists return summaries and `get` returns the full item; internal fields such as `organizationId`
and `version` are gone.

- **Messages:** read deliveries and bodies with `messages.listDeliveries` and
  `messages.getContent`. `messages.send` returns a receipt.
- **Contacts:** `humanProfile` is now `profile`; addresses live on `identities`.
- **Templates:** the body, input schema and published content come from `templates.get`.
- **Conversations:** `contacts` replaces `participants`; `metrics` is gone.

### Breaking: updates change only what you send

`contacts.update` and `conversations.update` no longer replace lists. Use the `add*` and `remove*`
methods for identities, tags, categories and channels. `metadata` merges by key, and `null`
deletes a key.

### Breaking: consistent names

- Methods take the resource identifier as `id` (was `webhookId`, `groupId` and similar).
- Date filters are `after` and `before` (was `startDate`, `endDate` and `period`).
- `campaigns.archive` replaces delete, and `apiKeys.revoke` replaces `apiKeys.remove`.
- `messages.getEmail` takes `includeDownloadUrls` and returns `downloadUrls`.

### Also new

- **Clearer errors:** every error says what to do next, and invalid requests fail with
  `422 ValidationError` listing each bad field.
- **Skipped recipients:** send receipts list each address Samva did not send to, and why.
- **Feedback:** `samva.feedback.send({ message, category })` tells our team what was confusing,
  broken or missing.

## @samva/webhooks@0.10.0

### Stable Effect 4 support

**Breaking for Effect users:** If you use `samva/effect` or `@samva/webhooks/effect`, upgrade your application's `effect` dependency to `4.0.0` alongside this release. `4.0.0-rc.117` is no longer supported. The Promise SDK and Promise webhook helpers still work without installing Effect.

The Effect SDK preserves the API's string limits for idempotency keys, URLs, template entry paths, and workspace asset paths. The `idempotency-key` header allows at most 255 UTF-16 code units, as counted by JavaScript's `string.length`: 127 emoji plus one ASCII character fits; 128 emoji does not. API limits are unchanged.

The CLI bundles the updated SDK and stable Effect runtime. You can keep your existing commands and configuration.

## @samva/webhooks@0.9.0

### Breaking: workspace open and Save pull outside commits

The SDK removes `templates.reconcileWorkspace` and the guest workspace `reconcile` operation.
The hosted MCP tool `templates_reconcile_workspace` is removed. Reopen the workspace to pull
outside commits, then resolve any reported conflicts with the existing conflict-resolution
operation. Save also pulls before validation and commit.

For CLI projects, `git push` is picked up on the next hosted workspace open. No extra synchronization
call is needed.

## @samva/webhooks@0.8.0

### Breaking: `actorType` says `sender`, not `sender_identity`

A conversation participant sent as one of the organization's senders now reports
`actorType: "sender"`. Existing conversations report the new value too; `"sender_identity"` is gone
from the `actorType` union, so code that matches on it no longer compiles.

### Agents get a contract, a skill and a `templates/` root

- **`@samva/markup`.** Ships `@samva/markup/contract.json` and `generated/reference.md`, generated
  from the compiler: component props, the static-profile forms and the forms it refuses, formatters,
  HTML elements and every diagnostic code with its fix. The `sml` skill ships in the package under
  `skills/sml`. Every compiler finding now comes from one registry of codes
  (`DIAGNOSTIC_CODES`). The generated `sml-*-contract.json` and `sml-*-reference.md` files are
  replaced by these two.
- **Entry root.** New hosted projects, the starter and the gallery use `templates/` as the entry
  root. `emails/` is still accepted for entry paths in the API, the SDK types and the CLI
  (`samva templates add`, `move`, `publish`).

## @samva/webhooks@0.7.0

### Breaking: `sending-status-stale` removed from domain `sending.reason`

A domain's `sending` health reads the sending account's status as SES last reported it. Samva keeps
that status current from SES's own events instead of re-checking it on a timer, so it no longer goes
stale: `sending.reason` drops `sending-status-stale`, and `sending.staleAt` and
`sending.nextRetryAt` are always `null`.

### Every API error is exported from `samva/effect`

`AnalyticsQueryError`, `BrandAddressRequiredError`, `CampaignFooterRequiredError` and
`OnboardingReviewRequiredError` are exported from `samva/effect`, as they already are from `samva`,
so Effect programs can match them by class as well as by `_tag`.

### Breaking: `exempt` removed from onboarding review `decision`

New organizations send on probation instead of waiting for approval. `email.getOnboardingReview`
and `OnboardingReviewRequiredError` report `decision` as `undecided`, `approved` or `rejected`;
`exempt` is gone. The review status gains `trustTier` (`screened`, `probation` or `established`):
an `undecided` organization whose tier is not `screened` can send. A probation send over its hourly,
daily or per-domain limit fails with `RateLimitedError` and `retryAfterSeconds`.

### Mail held for content review

A probation organization's mail can wait for a content review before it sends. The delivery's
`scheduling.waitReason` is then `content-review`, and `scheduling.reviewExpectedAt` says when Samva
expects to decide. `Message` carries the same summary as top-level `waitReason` and
`reviewExpectedAt`: `content-review` when any delivery waits on review, otherwise the first
waiting delivery's reason.

### Several emails in one template project

`templates.addEntry` registers another `.tsx` file in a template project as its own template. The
file does not need to exist yet; publishing fails with `ConflictError` until a commit contains it.
Repeating the call with the same entry path, name and slug returns the existing template.

```ts
const reset = await samva.templates.addEntry({
  projectId: "tproj_abc123",
  entryPath: "emails/reset.tsx",
  name: "Password reset",
  slug: "reset",
});
```

`templates.update` takes `entryPath` to point a template at another file in its project, keeping
its id, slug and publications. `templates.list` filters by `projectId`.

### Images and fonts in a template workspace

`templates.putWorkspaceAsset` writes one png, jpg, jpeg, gif, webp or woff2 file (at most 1 MiB,
sent as base64 in `contentBase64`) into the project workspace as an unsaved file; the next Save
commits it. Pass `replace: false` to add a file and `replace: true` to change one.

### Sendable domains

`email.listDomains({ sendable: "true" })` lists only domains a send can use now.

### Gateway timeouts are typed

A 504 whose body is not a Samva error, such as a proxy's timeout page, now throws
`GatewayTimeoutError` with `retryAfterSeconds` from `Retry-After` instead of `SamvaTransportError`.
Retry with the same idempotency key.

### Breaking: `brands` replaces `design`

Brands hold an organization's brand theme CSS, logos and footer; a template imports one with
`@import "samva:brand";`. The SDK gains `brands` (`Brands` in `samva/effect/brands`) with `list`,
`create`, `get`, `update`, `remove` and `setDefault`, backed by `/v1/brands`.

```ts
const brand = await samva.brands.get({ slug: "acme" });
await samva.brands.update({
  slug: "acme",
  assets: { ...brand.assets, logoUrl: "https://cdn.example.com/logo.png" },
});
```

`brands.update` names the brand by `slug` and renames it with `newSlug`; projects that import
`samva:brand/<old slug>` stop building until they import the new slug.

The `design` resource and the `samva/effect/design` export are removed along with `/v1/design`.
The organization response no longer carries `design`, and `organizations.update` no longer accepts
it. A domain's config gains `brandSlug`, set through `email.updateDomainConfig`; a domain without one
uses the default brand.

Campaigns carry the brand footer: `campaigns.scheduleRun` and campaign sends fail with
`CampaignFooterRequiredError` when the footer is off and the template renders no `BrandFooter`, and
with `BrandAddressRequiredError` when a brand that signs the campaign off has no postal address. An
organization holds at most 12 brands; `brands.create` answers `ConflictError` beyond that.

### Publications record their brand

A template's `brand` names the brand its current publication imports, the brand's `digest` at
build time, and `stale` when the brand has changed since; publishing the same commit again picks up
the change. `templates.publish` and `templates.getPublication` return the brand the publication
was built against, with `rendersFooter` (`every`, `some` or `none`). `templates.publish` takes
`ifCurrentPublicationId` and fails with a conflict, changing nothing, when that publication is no
longer current.

### Create a template with your brand

`templates.create` takes `useBrand` with `galleryTemplateId`: the new project's `theme.css` then
imports the organization's default brand over the starter's look. It defaults to false, and
`useBrand` without a starter is refused.

## @samva/webhooks@0.6.0

### Domain Connect works with Cloudflare

Automatic DNS setup now works on subdomains and with Cloudflare. A setup the DNS provider rejects
returns `status: "failed"` with `errorDescription`.

### Breaking: `DeliveryUnavailableError` replaces `WebhookEnqueueError`

A send Samva cannot hand to delivery returns `503` `DeliveryUnavailableError` with
`retryAfterSeconds`. Nothing was sent; retry with the same `Idempotency-Key`. `isRetryable` covers
it.

### `message.sent` always includes `subject`, `toEmails`, and `providerMessageId`

Each `to`, `cc`, and `bcc` recipient gets its own event.

### Template sends reject inline content

`POST /v1/messages` returns `422` for a template send that also sets `subject`, `html`, or `text`,
matching scheduled sends.

### Breaking: public contract cleanup

- Errors drop `operation`; branch on `_tag`.
- Renamed state values:

  | Field                                                  | Old                                                                         | New                                                                 |
  | ------------------------------------------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------- |
  | domain verification `phase` (also in `domain.updated`) | `provider-setup`, `provider-verification`                                   | `provisioning`, `verifying`                                         |
  | domain `health.reason`                                 | `provider-pending`, `provider-failed`, `provider-ownership-action-required` | `verification-pending`, `verification-failed`, `ownership-conflict` |
  | domain `sending.reason`                                | `provider-paused`, `tenant-health-stale`, `tenant-health-unknown`           | `sending-paused`, `sending-status-stale`, `sending-status-unknown`  |
  | health `actionOwner`                                   | `provider`                                                                  | `upstream`                                                          |
  | delivery `scheduling.waitReason`                       | `tenant-health`, `provider-unavailable`                                     | `sending-paused`, `upstream-unavailable`                            |
  | operation `error.code`                                 | `provider-rejected`, `provider-unavailable`                                 | `rejected`, `unavailable`                                           |

- Webhooks no longer accept the `template.*` and `conversation.*` event types, which were never
  sent. An endpoint subscribed only to them is disabled.
- Removed fields: `deliveries[].metadata`, template `compliance`, `enableReceiving`'s `ruleName`,
  the catch-all `receiptRuleName`, and blocked-mail `ipAddress` and `spamScore`.
- `enableCatchAll` returns `{ success }`.

### Requires Effect 4.0.0-rc.117

The Effect SDK and webhook adapter now peer-depend on Effect 4.0.0-rc.117.

### Sends always carry an idempotency key

`email.send` and `messages.send` send an `Idempotency-Key` on every call, generated unless you pass
the `idempotencyKey` option. An `idempotencyKey` in the send input is ignored; move it to the
option.

### `safeVerify` rejects invalid input

`safeVerify` returns `{ verified: false }` only for a failed verification; invalid input, such as an
undefined secret, now throws.

### Contact groups, custom fields, unsubscribe groups, attachments, and analytics

Both clients add these resources (`samva.contactGroups`, `samva.customFields`,
`samva.unsubscribeGroups`, `samva.attachments`, `samva.analytics`, and matching `samva/effect`
modules). Paginated lists expose `.pages()` and `.items()`.

### Breaking: dashboard-only operations removed

`templates.listDashboard` and `organizations.bootstrap` are gone; use `templates.list`.

### `messageIdHeader` is never null

`Message.emailDeliveryDetails[].messageIdHeader` is typed `string`.

### Design updates merge

`PATCH /v1/organizations/current` updates only the `design` sections you send. Send `{}` to clear a
section or `design: null` to clear everything.

### Breaking: billing email and currency move to the billing account

Organizations drop `billingEmail` and `defaultCurrency`, and `organizations.update` no longer
accepts them. `organizations.getUsage` reports the billing account's currency; `overageCost` is
`null` outside USD.

### Breaking: `readWebhookHeaders` throws on a missing signing header

It throws `InvalidWebhookHeadersError`, whose new `header` field names the missing header, instead
of returning `""`. `verify` accepts `null` or `undefined` header values, so drop `?? ""` fallbacks.

### Template workspace resources hold 1–32 files

Out-of-range resources fail validation instead of returning a conflict.

### Deliverability covers the last 24 hours; list rows gain a 14-day series

Sender and domain `bounceRate` and `complaintRate` now cover the last 24 hours, with the send count
in `windowSends`. Domain, sender, and campaign list rows gain `series`, 14 days of daily sends.
Contact lists gain a `color`.

## @samva/webhooks@0.5.0

### Control domain warm-up from the SDK

Create and manage domain warm-up plans and approved campaign batches, inspect the domain's
reputation window and decision history, and see why a campaign run is waiting for more capacity.

## @samva/webhooks@0.4.0

### Breaking: send schema-validated input to executable email publications

Template sends now validate `email.templateData` against the selected publication's input contract
and render an immutable executable. Use `email.templateId` with `email.publicationId` to select an
exact publication, or with `email.inputContractId` to select the latest publication matching that
contract. These selectors are mutually exclusive. Successfully persisted delivery content is reused
on retries.

Update existing email source to `defineEmail`, publish it with the matching authoring toolchain,
and regenerate caller types with `samva templates types`. Old publication references must be
replaced after republishing; old HTML snapshots cannot serve as executable publications. Generated
SDK operations expose input contracts and the template catalog used for typed caller integration.

### Name the layer behind a 500, 502, or 504

A `500` used to arrive with an empty body, so the SDK surfaced it as a generic transport error and
the CLI printed a bare status. It now carries the same flat `InternalError` body every other API
error uses, so `samva` throws the typed, retryable `InternalError` and the CLI prints its message.

A `504` now carries a `GatewayTimeoutError` body and a `Retry-After` header instead of nothing, so a
client can tell a request that ran out of time from one that was refused.

Both responses also carry `x-samva-error-layer`, naming `sql`, `deadline`, or `provider` — the
database, the API's time limit, or a service Samva calls. See the
[error reference](https://samva.dev/docs/developers/error-reference) for the retry guidance.

### Preserve account-wide DNS grants when domains disconnect

Account-wide DNS connections now expose their excluded domains in the public API contract, so a
single domain can disconnect without revoking the provider authorization shared by other domains.

### Identify first-party API clients in developer logs

The TypeScript Promise and Effect SDKs now identify their surface and package version on API
requests. The Samva CLI identifies itself as the outermost caller, so developer logs and operational
telemetry can distinguish CLI traffic from direct SDK use.

### Connect DNS providers without account IDs

Cloudflare authorization now discovers the account that owns the requested domain after OAuth or
API-token consent. Vercel Integration continues to let Vercel select the personal or team context;
manual team IDs remain available only for the Vercel API-token fallback.

### Adopt DomainKit's standard provider connection routes

DNS provider authorization now runs through DomainKit's host-mounted start and callback routes.
The legacy domain-provisioning authorization endpoints are removed from the public API and SDK.

### Make sender lifecycle operations replay-safe

Sender creation now supports stable idempotency keys and reports provider provisioning separately
from mailbox verification. Sender deletion remains observable until provider cleanup finishes, and
the CLI now displays the provider lifecycle for sender records.

### Support Effect 4.0.0-rc.112

The Effect SDK and webhook adapter now target the exact Effect 4.0.0-rc.112 peer.

## @samva/webhooks@0.3.0

### Support Effect 4.0.0-rc.111

The webhook verifier now requires `effect@4.0.0-rc.111`.

## @samva/webhooks@0.2.0

### Choose Domain Connect setup mode explicitly

Domain Connect eligibility and apply URLs require an explicit `mode`.
The value is `send-only` or `send-and-receive`.
Manual DNS records remain available for either mode.

### Stage sending domains before provider verification

Email domains now expose exact DNS instructions and a typed verification lifecycle before provider provisioning begins. SDK and CLI consumers can read stored verification state and explicitly advance verification without a read causing provider mutations.

### Add automatic Custom Tracking Domain setup

The SDK adds Domain Connect operations for a custom tracking domain.
`email.getCustomTrackingDomainConnect` reports eligibility.
`email.buildCustomTrackingDomainConnectApplyUrl` builds the signed apply URL.
`email.completeCustomTrackingDomainConnect` completes the registrar return.
Manual CNAME records remain available.

### Rename branded tracking to custom tracking

Email domain tracking APIs use custom-tracking operations, types, and paths.
The SDK removes branded-tracking names.

### Handle domain provisioning rate limits

`email.provisionDomain` can return `RateLimitedError` when the API responds 429.
The Promise client and the Effect client both type that error.

## @samva/webhooks@0.1.1

### Release the 0.1.1 package family

`@samva/webhooks` publishes with the rest of the 0.1.1 family. It verifies Standard Webhooks for
Promise applications and Effect applications.
