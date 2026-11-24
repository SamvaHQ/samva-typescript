# Samva webhooks consumer guide

Use `verifyRequest` from `@samva/webhooks` in the server or edge handler that receives a Samva
webhook. Verification requires the untouched request body and the endpoint signing secret; never
expose that secret to browser code.

Effect applications can import the typed adapter from `@samva/webhooks/effect` and install the
optional peer `effect` from the `^4.0.4` range this package's `peerDependencies` names.

Import only package subpaths declared in `package.json`. The delivery, queue, persistence, retry,
and endpoint-management implementation is not part of this package.

To test a handler's failing-signature path, sign a fixture with `signWebhook` and a secret from
`generateWebhookSecret`, then change one byte of the body or drop a header: `verify` rejects with
`WebhookSignatureError` or `InvalidWebhookHeadersError`. The README has a runnable example.
