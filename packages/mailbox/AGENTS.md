# Samva mailbox extensions guide

Use `@samva/mailbox` to write an extension that reacts to Samva mailbox events. Export
`defineExtension({ manifest, on })` as the module's default export; every handler key must appear
in `manifest.events`, and the manifest requests the smallest permission set the handlers need.

Hosted extensions call the mailbox API through the `samva` client in the handler context and never
hold credentials. Webhook extensions serve `createWebhookHandler` from `@samva/mailbox/webhook`
and keep the API key and webhook secret on the server.

Test handlers with `runExtension`, `mailboxEvent` and `createTestClient` from
`@samva/mailbox/test`. Keep sends in a stable order so a retried run reuses its idempotency keys.

Import only package subpaths declared in `package.json`.

Send receipts and send actions preserve the original refusal in `problem.error` when present.
Narrow the exported `SendRefusal` by `_tag` to read its retry, review, validation, or usage guidance.
