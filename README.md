# Samva TypeScript packages

The source of Samva's TypeScript packages on npm:

| Package                                                            | Directory           | What it is                                                              |
| ------------------------------------------------------------------ | ------------------- | ----------------------------------------------------------------------- |
| [`samva`](https://www.npmjs.com/package/samva)                     | `packages/sdk`      | TypeScript SDK for the Samva email API, with Promise and Effect clients |
| [`@samva/webhooks`](https://www.npmjs.com/package/@samva/webhooks) | `packages/webhooks` | Runtime-neutral verification for Samva webhook deliveries               |
| [`@samva/mailbox`](https://www.npmjs.com/package/@samva/mailbox)   | `packages/mailbox`  | Authoring SDK for Samva mailbox extensions                              |

Each package's README covers installation and use.

This repository is a read-only mirror. Samva's release process writes it after every release,
copying each package's source exactly as it is built and published, and tags every version as
`<package>@<version>`, such as `samva@0.27.0`. It does not accept pull requests, and the packages do
not build here: they are generated from Samva's API description and built inside Samva's own
repository, where `workspace:` and `catalog:` dependency versions resolve. The manifests published
to npm carry the resolved versions.

The SDK and the webhook types are generated from the public OpenAPI description in
[SamvaHQ/samva-openapi](https://github.com/SamvaHQ/samva-openapi).

Report a bug or request a change as an issue in this repository. See [SECURITY.md](./SECURITY.md)
for vulnerabilities.

## License

MIT
