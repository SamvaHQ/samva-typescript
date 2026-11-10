import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { HttpClient, HttpClientResponse } from "effect/http";

import * as Client from "../src/effect/client";
import * as Email from "../src/effect/email";
import * as Errors from "../src/effect/errors";
import { createClient } from "../src/promises";
import { ConflictError } from "../src/promises/errors.gen";

const input = { id: "supp_1234567890abcdef" };
const failure = {
  _tag: "ConflictError",
  message: "Suppression changed during removal; reload and retry",
  resource: "Suppression",
  id: input.id,
};
const response = () => Response.json(failure, { status: 409 });

describe("suppression removal conflicts", () => {
  it("Promise preserves the conflict without automatically resubmitting removal", async () => {
    let calls = 0;
    const client = createClient({
      apiKey: "samva_sk_test",
      fetch: async () => {
        calls += 1;
        return response();
      },
    });
    const error = await client.email.removeSuppression(input).catch((cause: unknown) => cause);
    expect(error).toBeInstanceOf(ConflictError);
    expect(error).toMatchObject({ ...failure, status: 409 });
    expect(calls).toBe(1);
  });

  it.effect("Effect preserves the conflict without automatically resubmitting removal", () => {
    let calls = 0;
    return Effect.gen(function* () {
      const error = yield* Effect.flip(Email.removeSuppression(input));
      expect(error).toBeInstanceOf(Errors.ConflictError);
      expect(error).toMatchObject(failure);
      expect(calls).toBe(1);
    }).pipe(
      Effect.provide(Client.layer({ apiKey: "samva_sk_test" })),
      Effect.provideService(
        HttpClient.HttpClient,
        HttpClient.make((request) => {
          calls += 1;
          return Effect.succeed(HttpClientResponse.fromWeb(request, response()));
        }),
      ),
    );
  });
});
