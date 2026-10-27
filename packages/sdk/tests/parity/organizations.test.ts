import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../../src/effect/client";
import * as Organizations from "../../src/effect/organizations";
import { createClient } from "../../src/promises";

const organization = {
  id: "org_test",
  billingAccountId: "billing_test",
  name: "Test Organization",
  slug: "test-organization",
  avatarUrl: null,
  defaultRegion: "US",
  timezone: "UTC",
  plan: "launch",
  isActive: true,
  createdAt: "2026-07-12T00:00:00.000Z",
  updatedAt: "2026-07-12T00:00:00.000Z",
  metadata: null,
  replyToDefault: null,
  emailFooterEnabledDefault: null,
  messagesUsed: 0,
  messagesUsedThisMonth: 0,
  smsUsed: 0,
  smsUsedThisMonth: 0,
  whatsappUsed: 0,
  whatsappUsedThisMonth: 0,
  emailUsed: 0,
  emailUsedThisMonth: 0,
  contactsUsed: 0,
  conversationsUsed: 0,
  teamMembersUsed: 0,
  messagesResetAt: null,
} as const;

const responseFetch =
  (status: number, body: unknown): typeof globalThis.fetch =>
  async () =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    });

const runEffectGet = (fetch: typeof globalThis.fetch) =>
  Effect.runPromise(
    Organizations.get().pipe(
      Effect.provide(
        Layer.provide(
          Client.layer({ apiKey: "samva_sk_test" }),
          Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
        ),
      ),
    ),
  );

describe("organization facade behavior", () => {
  it("exposes the minimal profile through both public clients", async () => {
    const profile = { id: "mem_test", name: "Ada", nickname: "Ada (Acme)" };
    const paths: string[] = [];
    const fetch = async (input: RequestInfo | URL) => {
      paths.push(new URL(input instanceof Request ? input.url : input.toString()).pathname);
      return new Response(JSON.stringify(profile), {
        headers: { "content-type": "application/json" },
      });
    };
    const promise = createClient({ apiKey: "samva_sk_test", fetch });
    expect(await promise.organizations.getProfile()).toEqual(profile);
    expect(
      await Effect.runPromise(
        Organizations.getProfile().pipe(
          Effect.provide(
            Layer.provide(
              Client.layer({ apiKey: "samva_sk_test" }),
              Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
            ),
          ),
        ),
      ),
    ).toEqual(profile);
    expect(paths).toEqual([
      "/v1/organizations/current/profile",
      "/v1/organizations/current/profile",
    ]);
  });
  it("decodes success into Effect-native domain values", async () => {
    const fetch = responseFetch(200, organization);
    const effectResult = await runEffectGet(fetch);

    // Unannotated timestamps remain wire strings on the Effect projection.
    expect(effectResult.id).toBe("org_test");
    expect(effectResult.slug).toBe("test-organization");
    expect(effectResult.createdAt).toBe("2026-07-12T00:00:00.000Z");
    expect(effectResult.updatedAt).toBe("2026-07-12T00:00:00.000Z");
  });

  it("fails with the server's real tagged error, catchable by Effect.catchTag", async () => {
    const unauthorized = {
      _tag: "UnauthorizedError",
      message: "Invalid API key",
    } as const;
    const fetch = responseFetch(401, unauthorized);

    // The error carries the server's semantic tag directly — no per-status
    // wrapper (`OrganizationsGet401`) — so `catchTag("UnauthorizedError")`
    // handles it without enumerating status codes.
    const handled = await Effect.runPromise(
      Organizations.get().pipe(
        Effect.provide(Client.layer({ apiKey: "samva_sk_test" })),
        Effect.catchTag("UnauthorizedError", (error) => Effect.succeed(error.message)),
        Effect.provide(
          Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
        ),
      ),
    );

    expect(handled).toBe("Invalid API key");
  });
});
