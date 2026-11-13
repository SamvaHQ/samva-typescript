import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer, Schema } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../../src/effect/client";
import * as Api from "../../src/effect/generated";
import * as Templates from "../../src/effect/templates";
import { createClient } from "../../src/promises";
import { fakeSamvaApi } from "../support/fake-samva-api";
import responses from "./template-responses.json" with { type: "json" };

describe("template response transport parity", () => {
  const id = responses.publication.templateId;

  it("reads every template channel through both clients", async () => {
    const page = Schema.decodeUnknownSync(Api.TemplatesList200)({
      items: responses.templateSummaries,
      nextCursor: null,
    });
    const templates = responses.templates.map((template) =>
      Schema.decodeUnknownSync(Api.TemplatesGetById200)(template),
    );
    const api = fakeSamvaApi(Api.SamvaApi)({
      Templates: {
        templatesList: () => Effect.succeed(page),
        templatesGetById: ({ params }) => {
          const template = templates.find((candidate) => candidate.id === params.id);
          if (!template) throw new Error(`Unscripted template: ${params.id}`);
          return Effect.succeed(template);
        },
      },
    });
    const { fetch } = api;
    const client = createClient({ apiKey: "samva_sk_test", fetch });
    const layer = Layer.provide(
      Client.layer({ apiKey: "samva_sk_test" }),
      Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
    );

    const expectedPage = { items: responses.templateSummaries, nextCursor: null };
    expect(await client.templates.list()).toEqual(expectedPage);
    expect(await Effect.runPromise(Templates.list().pipe(Effect.provide(layer)))).toEqual(
      expectedPage,
    );
    for (const template of responses.templates) {
      expect(await client.templates.getById({ id: template.id })).toEqual(template);
      expect(
        await Effect.runPromise(Templates.getById({ id: template.id }).pipe(Effect.provide(layer))),
      ).toEqual(template);
    }
    expect(api.requests).toHaveLength(2 + responses.templates.length * 2);
    api.assertComplete();
  });

  it("reads a compiled publication and its rendered brand footer", async () => {
    const response = Schema.decodeUnknownSync(Api.TemplatesGetPublication200)(
      responses.publication,
    );
    const api = fakeSamvaApi(Api.SamvaApi)({
      Templates: { templatesGetPublication: () => Effect.succeed(response) },
    });
    const { fetch } = api;
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
    expect(api.requests).toHaveLength(2);
    api.assertComplete();
  });

  it("preserves modified asset digests and deleted asset nulls", async () => {
    const response = Schema.decodeUnknownSync(Api.TemplatesDiffWorkspace200)(responses.diff);
    const api = fakeSamvaApi(Api.SamvaApi)({
      Templates: { templatesDiffWorkspace: () => Effect.succeed(response) },
    });
    const { fetch } = api;
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
    expect(api.requests).toHaveLength(2);
    api.assertComplete();
  });

  it("preserves fixture preview and sent byte counts", async () => {
    const response = Schema.decodeSync(Api.TemplatesRenderWorkspaceFixture200)(responses.fixture);
    const api = fakeSamvaApi(Api.SamvaApi)({
      Templates: { templatesRenderWorkspaceFixture: () => Effect.succeed(response) },
    });
    const { fetch } = api;
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
    expect(api.requests).toHaveLength(2);
    api.assertComplete();
  });
});
