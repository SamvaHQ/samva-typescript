## @samva/mailbox@0.7.1

### Open every package README by saying what Samva is

The `samva`, `@samva/webhooks`, `@samva/cli`, native CLI, and `@samva/mailbox` READMEs now open
with a one-line description of Samva. `@samva/cli` describes itself as an email tool and drops the
`cpaas` and `messaging` keywords.

## @samva/mailbox@0.7.0

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

### Read the source on GitHub

The packages' source is public at
[SamvaHQ/samva-typescript](https://github.com/SamvaHQ/samva-typescript), a read-only mirror updated
with each release. The npm `repository` and `bugs` links point there; report problems as issues on
that repository.

## @samva/mailbox@0.6.0

### A held approval can be a tool call

`mailbox.action.pending_approval` can now hold a tool call instead of a send: `draft` is `null` for
a held tool call and the new `tool` field names the tool, its arguments, and their hash. Check
`draft` for `null` before reading its recipients. Actions gain the `toolCall` type and a `tool`
field that carries the call on `toolCall` actions and is `null` on others, and an actor's `source`
can be `samvaManagedAgent`.

## @samva/mailbox@0.5.0

### Message and send-intent types cover WhatsApp and SMS

Breaking for TypeScript: `Message` is now `EmailMessage | ChatMessage`, so narrow on `channel`
before reading `subject`, `recipients`, or `attachments`. `SendIntent` is likewise
`EmailSendIntent | ChatSendIntent` (a chat intent carries one `to` number, `text` or `template`, and
the `sender` endpoint). `MailboxThread` gains `whatsappServiceWindow`, and `SendRefusal` gains
`WhatsAppServiceWindowClosedError`. `ChatMessage`, `EmailMessage`, `ChatSendIntent`, and
`EmailSendIntent` are exported.

## @samva/mailbox@0.4.0

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

## @samva/mailbox@0.3.0

### Channel and endpoint on mailbox events

Mailbox extension events carry `message.channel`, and `mailbox.message.received` carries
`thread.endpointId`, the endpoint the message arrived at (`null` once that endpoint is removed).
Both are optional: events recorded before they existed omit them and are email.

## @samva/mailbox@0.2.0

### Breaking: mailbox sends return action receipts

A send from an extension returns a receipt with a `state`, not a sent confirmation. Keep its
`actionId` and follow the action to learn whether the message was sent. When a send is held back,
`problem.error` carries the reason; narrow the exported `SendRefusal` type by `_tag` to read its
retry or review details.

## @samva/mailbox@0.1.1

### First release

`@samva/mailbox` is the SDK for Samva mailbox extensions. `defineExtension` declares the events and
permissions an extension needs, `@samva/mailbox/webhook` serves it from your own server, and
`@samva/mailbox/test` runs handlers locally without sending mail. `samva extensions init` scaffolds
a project that uses it. See [Mailboxes](https://samva.dev/docs/mailboxes).
