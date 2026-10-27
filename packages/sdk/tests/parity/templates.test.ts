import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../../src/effect/client";
import * as Templates from "../../src/effect/templates";
import { createClient } from "../../src/promises";
import responses from "./template-responses.json" with { type: "json" };

describe("template response transport parity", () => {
  const id = responses.publication.templateId;

  it("reads a compiled publication and its rendered brand footer", async () => {
    const fetch = async () => Response.json(responses.publication);
    const client = createClient({ apiKey: "samva_sk_test", fetch });
    const input = { id, publicationId: responses.publication.id };
    expect(await client.templates.getPublication(input)).toEqual(responses.publication);
    expect(
      await Effect.runPromise(
        Templates.getPublication(input).pipe(
          Effect.provide(
            Layer.provide(
              Client.layer({ apiKey: "samva_sk_test" }),
              Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
            ),
          ),
        ),
      ),
    ).toEqual(responses.publication);
  });

  it("preserves modified asset digests and deleted asset nulls", async () => {
    const fetch = async () => Response.json(responses.diff);
    const client = createClient({ apiKey: "samva_sk_test", fetch });
    const input = { id, expectedRevision: responses.diff.revision };
    expect(await client.templates.diffWorkspace(input)).toEqual(responses.diff);
    expect(
      await Effect.runPromise(
        Templates.diffWorkspace(input).pipe(
          Effect.provide(
            Layer.provide(
              Client.layer({ apiKey: "samva_sk_test" }),
              Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
            ),
          ),
        ),
      ),
    ).toEqual(responses.diff);
  });

  it("preserves fixture preview and sent byte counts", async () => {
    const fetch = async () => Response.json(responses.fixture);
    const client = createClient({ apiKey: "samva_sk_test", fetch });
    const input = {
      id,
      expectedRevision: responses.fixture.revision,
      fixture: responses.fixture.fixture,
    };
    expect(await client.templates.renderWorkspaceFixture(input)).toEqual(responses.fixture);
    expect(
      await Effect.runPromise(
        Templates.renderWorkspaceFixture(input).pipe(
          Effect.provide(
            Layer.provide(
              Client.layer({ apiKey: "samva_sk_test" }),
              Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
            ),
          ),
        ),
      ),
    ).toEqual(responses.fixture);
  });
});
