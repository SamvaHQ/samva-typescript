import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer, Schema } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import { SamvaApi, ShareLinkUnavailable } from "../src/effect/generated";
import { TemplatesCreate201 } from "../src/effect/generated/templates";
import * as Templates from "../src/effect/templates";
import { createClient } from "../src/promises";
import { fakeSamvaApi } from "./support/fake-samva-api";

const source = { shareLinkSlug: "for-context-dev" };
const key = "open-context-starter";
const template = Schema.decodeSync(TemplatesCreate201)({
  id: "tmpl_1234567890abcdef",
  projectId: "tproj_1234567890abcdef",
  namespaceId: null,
  shared: false,
  entryPath: "templates/welcome.tsx",
  name: "Welcome",
  slug: "welcome",
  familyId: null,
  channel: "email",
  description: null,
  category: null,
  email: { subject: "Welcome aboard", preheader: null, headers: null },
  sms: null,
  whatsapp: null,
  publicationId: null,
  brand: null,
  inputContractId: null,
  inputSchema: null,
  usageCount: 0,
  lastUsedAt: null,
  status: "draft",
  publishedAt: null,
  fromDefault: null,
  replyToDefault: null,
  trackingDefault: null,
  createdAt: "2026-11-15T00:00:00.000Z",
  updatedAt: "2026-11-15T00:00:00.000Z",
});
const provide = <A, E>(
  effect: Effect.Effect<A, E, Client.Service>,
  fetch: typeof globalThis.fetch,
) =>
  effect.pipe(
    Effect.provide(
      Layer.provide(
        Client.layer({ apiKey: "samva_sk_test" }),
        Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
      ),
    ),
  );

describe("signed-in share link copy SDK transport", () => {
  it("Promise and Effect send the source-only payload and preserve the copied project", async () => {
    const fake = fakeSamvaApi(SamvaApi)({
      Templates: { templatesCreate: { status: 201, handle: () => Effect.succeed(template) } },
    });
    const promise = await createClient({
      apiKey: "samva_sk_test",
      fetch: fake.fetch,
    }).templates.create(source, { idempotencyKey: key });
    const effect = await Effect.runPromise(
      provide(Templates.create(source, { idempotencyKey: key }), fake.fetch),
    );
    expect(promise).toMatchObject({
      id: template.id,
      projectId: template.projectId,
      name: template.name,
    });
    expect(effect).toEqual(template);
    expect(
      fake.requests.map((request) => ({
        method: request.method,
        path: request.path,
        body: request.body,
        apiKey: request.headers.get("x-api-key"),
        idempotencyKey: request.headers.get("idempotency-key"),
      })),
    ).toEqual(
      Array.from({ length: 2 }, () => ({
        method: "POST",
        path: "/v1/templates",
        body: source,
        apiKey: "samva_sk_test",
        idempotencyKey: key,
      })),
    );
    fake.assertComplete();
  });
  it("both clients preserve the terminal unavailable-link error", async () => {
    const failure = { message: "The share link is unavailable." };
    const fake = fakeSamvaApi(SamvaApi)({
      Templates: { templatesCreate: () => Effect.fail(new ShareLinkUnavailable(failure)) },
    });
    await expect(
      createClient({ apiKey: "samva_sk_test", fetch: fake.fetch }).templates.create(source, {
        idempotencyKey: key,
      }),
    ).rejects.toMatchObject({
      _tag: "ShareLinkUnavailable",
      status: 410,
      ...failure,
    });
    const result = await Effect.runPromise(
      provide(
        Templates.create(source, { idempotencyKey: key }).pipe(
          Effect.catchTag("ShareLinkUnavailable", Effect.succeed),
        ),
        fake.fetch,
      ),
    );
    expect(result).toBeInstanceOf(ShareLinkUnavailable);
    expect(result).toMatchObject(failure);
    expect(fake.requests).toHaveLength(2);
    fake.assertComplete();
  });
});
