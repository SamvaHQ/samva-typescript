import { assert, describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { HttpClient, HttpClientResponse } from "effect/http";

import { createClient, ResourceNotFoundError } from "../src";
import * as Client from "../src/effect/client";
import * as Logs from "../src/effect/logs";

const id = "req_missing";
const response = () =>
  Response.json(
    { _tag: "ResourceNotFoundError", resource: "Log entry", id, message: "Log entry not found" },
    { status: 404, headers: { "x-samva-request-id": "req_lookup" } },
  );

describe("message log SDK", () => {
  it("preserves the Promise error type and displays the response request ID", async () => {
    const client = createClient({ apiKey: "samva_sk_test", fetch: async () => response() });
    const error = await client.logs.get({ id }).catch((cause: unknown) => cause);
    assert(error instanceof ResourceNotFoundError);
    expect(error.requestId).toBe("req_lookup");
    expect(error.message).toContain("request: req_lookup");
  });

  it.effect("preserves the Effect error tag and displays the response request ID", () =>
    Effect.gen(function* () {
      const error = yield* Logs.get({ id }).pipe(Effect.flip);
      expect(error).toMatchObject({ _tag: "ResourceNotFoundError", requestId: "req_lookup" });
      expect(error.message).toContain("request: req_lookup");
    }).pipe(
      Effect.provide(Client.layer({ apiKey: "samva_sk_test" })),
      Effect.provideService(
        HttpClient.HttpClient,
        HttpClient.make((request) =>
          Effect.succeed(HttpClientResponse.fromWeb(request, response())),
        ),
      ),
    ),
  );
});
