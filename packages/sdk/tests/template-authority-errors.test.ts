import { assert, describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { HttpClient, HttpClientResponse } from "effect/http";

import { createClient, ServiceUnavailableError } from "../src";
import { categoriesOf, isRetryable } from "../src/effect/categories";
import * as Client from "../src/effect/client";
import { ServiceUnavailableError as EffectServiceUnavailableError } from "../src/effect/errors";
import * as Retry from "../src/effect/retry";
import * as Templates from "../src/effect/templates";

const failure = {
  _tag: "ServiceUnavailableError",
  message: "Template project repository is unavailable.",
  retryAfterSeconds: 1,
};
const unavailable = () => Response.json(failure, { status: 503, headers: { "retry-after": "1" } });
const input = { id: "tmpl_1234567890abcdef" };

describe("template authority service unavailability", () => {
  it("Promise exposes a typed retryable 503 with its retry delay", async () => {
    const client = createClient({
      apiKey: "samva_sk_test",
      maxRetries: 0,
      fetch: async () => unavailable(),
    });
    const error = await client.templates.getGitRepository(input).catch((cause: unknown) => cause);
    assert(error instanceof ServiceUnavailableError);
    expect(error).toMatchObject({ ...failure, status: 503 });
    expect(error.retryAfterSeconds).toBe(1);
    expect(categoriesOf(error)).toEqual(["transient"]);
    expect(isRetryable(error)).toBe(true);
  });

  it.effect("Effect decodes the public 503 constructor and preserves retry guidance", () =>
    Effect.gen(function* () {
      const outcome = yield* Templates.getGitRepository(input).pipe(
        Effect.catchTag("ServiceUnavailableError", (error) => {
          expect(error).toBeInstanceOf(EffectServiceUnavailableError);
          return Effect.succeed(error);
        }),
      );
      expect(outcome).toMatchObject(failure);
      expect(categoriesOf(outcome)).toEqual(["transient"]);
      expect(isRetryable(outcome)).toBe(true);
    }).pipe(
      Effect.provide(
        Layer.mergeAll(Retry.layerDisabled, Client.layer({ apiKey: "samva_sk_test" })),
      ),
      Effect.provideService(
        HttpClient.HttpClient,
        HttpClient.make((request) =>
          Effect.succeed(HttpClientResponse.fromWeb(request, unavailable())),
        ),
      ),
    ),
  );
});
