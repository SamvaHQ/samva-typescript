# Samva TypeScript packages

The source of Samva's TypeScript packages on npm:

| Package                                                            | Directory           | What it is                                                                                              |
| ------------------------------------------------------------------ | ------------------- | ------------------------------------------------------------------------------------------------------- |
| [`samva`](https://www.npmjs.com/package/samva)                     | `packages/sdk`      | TypeScript SDK for the Samva email API, with Promise and Effect clients and mailbox extension authoring |
| [`@samva/webhooks`](https://www.npmjs.com/package/@samva/webhooks) | `packages/webhooks` | Runtime-neutral verification for Samva webhook deliveries                                               |

Each package's README covers installation and use.

Samva's release process publishes each release's source here, exactly as it is built and published
to npm, and tags every version as `<package>@<version>`, such as `samva@0.28.0`. The packages are
generated from Samva's API description and built in Samva's own repository, where `workspace:` and
`catalog:` dependency versions resolve, so they do not build here. The manifests published to npm
carry the resolved versions.

The SDK and the webhook types are generated from the public OpenAPI description in
[SamvaHQ/samva-openapi](https://github.com/SamvaHQ/samva-openapi).

Issues and pull requests are welcome; [CONTRIBUTING.md](./CONTRIBUTING.md) explains how a pull
request reaches a release. See [SECURITY.md](./SECURITY.md) for vulnerabilities.

## License

MIT
