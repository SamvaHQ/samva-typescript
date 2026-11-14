import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer, Redacted, Schema } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import { FlagDisabledError, SamvaApi } from "../src/effect/generated";
import { CreatedWhatsAppSetupLink } from "../src/effect/generated/whats-app-setup-links";
import * as Registrations from "../src/effect/template-registrations";
import * as WhatsApp from "../src/effect/whatsapp";
import * as Flows from "../src/effect/whatsapp-flows";
import * as SetupLinks from "../src/effect/whatsapp-setup-links";
import { createClient } from "../src/promises";
import { fakeSamvaApi } from "./support/fake-samva-api";

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

const templateId = "tmpl_1234567890abcdef";

describe("WhatsApp management transport parity", () => {
  it("reads accounts, flows, setup links, and registrations through both clients", async () => {
    const accounts = { items: [], pagination: { page: 1, limit: 2, total: 0, totalPages: 0 } };
    const records = { data: [] };
    const links = { items: [], nextCursor: null };
    const fake = fakeSamvaApi(SamvaApi)({
      WhatsApp: { whatsappListBusinessAccounts: () => Effect.succeed(accounts) },
      "WhatsApp flows": { whatsappFlowsList: () => Effect.succeed(records) },
      "WhatsApp setup links": { whatsappSetupLinksList: () => Effect.succeed(links) },
      "Template registrations": { templateRegistrationsList: () => Effect.succeed(records) },
    });
    const client = createClient({ apiKey: "samva_sk_test", fetch: fake.fetch });
    expect(await client.whatsapp.listBusinessAccounts({ page: 1, limit: 2 })).toEqual(accounts);
    expect(await client.whatsappFlows.list()).toEqual(records);
    expect(await client.whatsappSetupLinks.list({ limit: 2, cursor: "next" })).toEqual(links);
    expect(await client.templateRegistrations.list({ id: templateId })).toEqual(records);
    expect(
      await Effect.runPromise(
        provide(WhatsApp.listBusinessAccounts({ page: 1, limit: 2 }), fake.fetch),
      ),
    ).toEqual(accounts);
    expect(await Effect.runPromise(provide(Flows.list(), fake.fetch))).toEqual(records);
    expect(
      await Effect.runPromise(provide(SetupLinks.list({ limit: 2, cursor: "next" }), fake.fetch)),
    ).toEqual(links);
    expect(
      await Effect.runPromise(provide(Registrations.list({ id: templateId }), fake.fetch)),
    ).toEqual(records);
    fake.assertComplete();
    const expected = [
      { path: "/v1/whatsapp/business-accounts", query: { page: "1", limit: "2" } },
      { path: "/v1/whatsapp/flows", query: {} },
      { path: "/v1/whatsapp/setup-links", query: { limit: "2", cursor: "next" } },
      { path: `/v1/templates/${templateId}/registrations`, query: {} },
    ];
    expect(fake.requests.map((request) => ({ path: request.path, query: request.query }))).toEqual([
      ...expected,
      ...expected,
    ]);
    expect(
      fake.requests.every((request) => request.headers.get("x-api-key") === "samva_sk_test"),
    ).toBe(true);
  });

  it("creates a setup link with flat input and protects its URL in Effect", async () => {
    const input = {
      namespaceId: "ns_1234567890abcdef",
      redirectUrl: "https://platform.example.com/connected",
      metadata: { customerId: "customer-1" },
    };
    const body = {
      ...input,
      id: "wasl_1234567890abcdef",
      organizationId: "org_1234567890abcdef",
      status: "pending",
      expiresAt: "2026-11-20T00:00:00.000Z",
      businessAccountId: null,
      completedAt: null,
      revokedAt: null,
      createdAt: "2026-11-14T00:00:00.000Z",
      updatedAt: "2026-11-14T00:00:00.000Z",
      url: "https://samva.dev/connect/whatsapp#token=fixture-token",
    } satisfies typeof CreatedWhatsAppSetupLink.Encoded;
    const created = Schema.decodeSync(CreatedWhatsAppSetupLink)(body);
    const fake = fakeSamvaApi(SamvaApi)({
      "WhatsApp setup links": {
        whatsappSetupLinksCreate: { status: 201, handle: () => Effect.succeed(created) },
      },
    });
    expect(
      await createClient({ apiKey: "samva_sk_test", fetch: fake.fetch }).whatsappSetupLinks.create(
        input,
      ),
    ).toEqual(body);
    const result = await Effect.runPromise(provide(SetupLinks.create(input), fake.fetch));
    expect(Redacted.isRedacted(result.url)).toBe(true);
    expect(Redacted.value(result.url)).toBe(body.url);
    expect(result.id).toBe(body.id);
    fake.assertComplete();
    expect(
      fake.requests.map((request) => ({
        method: request.method,
        path: request.path,
        body: request.body,
      })),
    ).toEqual(
      Array.from({ length: 2 }, () => ({
        method: "POST",
        path: "/v1/whatsapp/setup-links",
        body: input,
      })),
    );
  });

  it("encodes a signup code before the channel gate", async () => {
    const body = {
      _tag: "FlagDisabledError" as const,
      flag: "whatsapp",
      message: "WhatsApp is disabled",
    };
    const input = {
      code: "fixture-signup-code",
      wabaId: "fixture-account",
      phoneNumberId: "fixture-number",
    };
    const fake = fakeSamvaApi(SamvaApi)({
      WhatsApp: {
        whatsappConnectBusinessAccount: ({ payload }) => {
          expect(Redacted.value(payload.code)).toBe(input.code);
          return Effect.fail(new FlagDisabledError(body));
        },
      },
    });
    await expect(
      createClient({
        apiKey: "samva_sk_test",
        fetch: fake.fetch,
      }).whatsapp.connectBusinessAccount(input),
    ).rejects.toMatchObject(body);
    expect(
      await Effect.runPromise(
        provide(
          WhatsApp.connectBusinessAccount({ ...input, code: Redacted.make(input.code) }).pipe(
            Effect.catchTag("FlagDisabledError", Effect.succeed),
          ),
          fake.fetch,
        ),
      ),
    ).toMatchObject(body);
    fake.assertComplete();
    expect(fake.requests.map((request) => request.body)).toEqual([input, input]);
  });

  it("keeps private-media URLs plain on the wire and Redacted in Effect", async () => {
    const body = {
      url: "https://samva.test/private/media?token=fixture-secret",
      expiresAt: "2026-11-20T00:00:00.000Z",
    };
    const fake = fakeSamvaApi(SamvaApi)({
      WhatsApp: {
        whatsappGetMediaDownloadUrl: () =>
          Effect.succeed({
            ...body,
            url: Redacted.make(body.url),
            expiresAt: body.expiresAt,
          }),
      },
    });
    const input = { deliveryId: "mdel_1234567890abcdef" };
    const promise = await createClient({
      apiKey: "samva_sk_test",
      fetch: fake.fetch,
    }).whatsapp.getMediaDownloadUrl(input);
    expect(promise.url).toBe(body.url);
    const effect = await Effect.runPromise(
      provide(WhatsApp.getMediaDownloadUrl(input), fake.fetch),
    );
    expect(Redacted.isRedacted(effect.url)).toBe(true);
    expect(Redacted.value(effect.url)).toBe(body.url);
    expect(JSON.stringify(effect)).not.toContain("fixture-secret");
    fake.assertComplete();
  });

  it("preserves the WhatsApp channel gate in both clients", async () => {
    const body = {
      _tag: "FlagDisabledError" as const,
      flag: "whatsapp",
      message: "WhatsApp is disabled",
    };
    const fake = fakeSamvaApi(SamvaApi)({
      "WhatsApp flows": { whatsappFlowsList: () => Effect.fail(new FlagDisabledError(body)) },
    });
    await expect(
      createClient({ apiKey: "samva_sk_test", fetch: fake.fetch }).whatsappFlows.list(),
    ).rejects.toMatchObject(body);
    expect(
      await Effect.runPromise(
        provide(
          Flows.list().pipe(Effect.catchTag("FlagDisabledError", Effect.succeed)),
          fake.fetch,
        ),
      ),
    ).toMatchObject(body);
    fake.assertComplete();
  });
});
