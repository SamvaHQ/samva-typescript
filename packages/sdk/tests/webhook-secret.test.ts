import { describe, expect, it } from "@effect/vitest";
import { Effect, Redacted } from "effect";
import { HttpClient, HttpClientResponse } from "effect/http";

import * as Client from "../src/effect/client";
import * as Webhooks from "../src/effect/webhooks";
import { createClient } from "../src/promises";

const id = "wep_1234567890abcdef";
const body = {
  secret: "whsec_test_readable",
  createdAt: "2026-10-18T00:00:00.000Z",
  previousExpiresAt: "2026-10-19T00:00:00.000Z",
};
const response = () =>
  new Response(JSON.stringify(body), {
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

describe("webhook signing secret read", () => {
  it("returns plaintext through the Promise client", async () => {
    const client = createClient({
      apiKey: "samva_sk_test",
      fetch: async (input) => {
        expect(input).toBeInstanceOf(Request);
        if (!(input instanceof Request)) throw new Error("Expected Request");
        expect(input.method).toBe("GET");
        expect(new URL(input.url).pathname).toBe(`/v1/webhooks/${id}/secret`);
        return response();
      },
    });
    expect(await client.webhooks.getSecret({ id })).toEqual(body);
  });

  it.effect("redacts the Effect secret while retaining rotation dates", () =>
    Effect.gen(function* () {
      const result = yield* Webhooks.getSecret({ id }).pipe(
        Effect.provide(Client.layer({ apiKey: "samva_sk_test" })),
        Effect.provideService(
          HttpClient.HttpClient,
          HttpClient.make((request) => {
            expect(request.method).toBe("GET");
            expect(new URL(request.url).pathname).toBe(`/v1/webhooks/${id}/secret`);
            return Effect.succeed(HttpClientResponse.fromWeb(request, response()));
          }),
        ),
      );
      expect(Redacted.value(result.secret)).toBe(body.secret);
      expect(String(result.secret)).toBe("<redacted>");
      expect(JSON.stringify(result)).not.toContain(body.secret);
      expect(result.createdAt).toBe(body.createdAt);
      expect(result.previousExpiresAt).toBe(body.previousExpiresAt);
    }),
  );
});
