import { describe, expect, expectTypeOf, it } from "@effect/vitest";
import { Effect, Layer, Redacted } from "effect";
import { HttpClient, HttpClientResponse, type HttpClientRequest } from "effect/http";

import type { ApiKeysCreateResponses } from "../src/client/types.gen";
import * as ApiKeys from "../src/effect/api-keys";
import * as Client from "../src/effect/client";

/**
 * Redacted secrets. The Effect surface decodes API-key/webhook secret
 * fields to `Redacted<string>` so they can't leak through logs or `String(...)`,
 * while the wire body and the Promise client keep plain strings.
 */

const jsonResponse = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

const stubClient = (
  handler: (request: HttpClientRequest.HttpClientRequest) => Response,
): HttpClient.HttpClient =>
  HttpClient.make((request) =>
    Effect.succeed(HttpClientResponse.fromWeb(request, handler(request))),
  );

const PLAINTEXT_KEY = "samva_sk_live_supersecret1234567890";

const createdApiKeyBody = {
  id: "apikey_7q2xk9mvt4znw8rh",
  name: "CI key",
  key: PLAINTEXT_KEY,
  start: "samva_sk_live_",
  end: "567890",
  organizationId: "org_7q2xk9mvt4znw8rh",
  createdAt: "2026-01-01T00:00:00.000Z",
  expiresAt: null,
  lastUsedAt: null,
  isActive: true,
  access: { mode: "full" },
  owner: null,
};

type CreateResult = Effect.Success<ReturnType<typeof ApiKeys.create>>;

describe("Redacted API-key secrets", () => {
  it("the Effect apiKeys.create result types `key` as Redacted<string>", () => {
    expectTypeOf<CreateResult["key"]>().toEqualTypeOf<Redacted.Redacted<string>>();
  });

  it("the Promise client keeps `key` as a plain string", () => {
    expectTypeOf<ApiKeysCreateResponses[201]["key"]>().toEqualTypeOf<string>();
  });

  it.effect("authenticates HTTP and event-stream connections with a Redacted key", () =>
    Effect.gen(function* () {
      const key = Redacted.make(PLAINTEXT_KEY);
      const client = Client.layer({ apiKey: key, headers: { "x-api-key": "spoofed" } }).pipe(
        Layer.provide(
          Layer.succeed(
            HttpClient.HttpClient,
            stubClient((request) => {
              expect(request.headers["x-api-key"]).toBe(PLAINTEXT_KEY);
              return jsonResponse(201, createdApiKeyBody);
            }),
          ),
        ),
      );

      yield* Effect.gen(function* () {
        yield* ApiKeys.create({ name: "CI key" });
        const service = yield* Client.Service;
        const headers =
          typeof service.connection.headers === "function"
            ? yield* Effect.promise(service.connection.headers)
            : service.connection.headers;
        expect(headers["x-api-key"]).toBe(PLAINTEXT_KEY);
      }).pipe(Effect.provide(client));
      expect(String(key)).toBe("<redacted>");
    }),
  );

  it.effect("decodes the key as Redacted: value unwraps, String output is redacted", () =>
    Effect.gen(function* () {
      const client = Client.layer({ apiKey: "samva_sk_test" }).pipe(
        Layer.provide(
          Layer.succeed(
            HttpClient.HttpClient,
            stubClient(() => jsonResponse(201, createdApiKeyBody)),
          ),
        ),
      );

      const result = yield* ApiKeys.create({ name: "CI key" }).pipe(Effect.provide(client));

      // The decoded field is a Redacted whose value unwraps to the plaintext.
      expect(Redacted.isRedacted(result.key)).toBe(true);
      expect(Redacted.value(result.key)).toBe(PLAINTEXT_KEY);

      // But string coercion and interpolation never expose the secret.
      expect(String(result.key)).toBe("<redacted>");
      expect(`${result.key}`).not.toContain("supersecret");
      expect(JSON.stringify({ key: result.key })).not.toContain("supersecret");
    }),
  );
});
