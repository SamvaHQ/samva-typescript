import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import * as Email from "../src/effect/email";
import * as Retry from "../src/effect/retry";

describe("effect client request bodies", () => {
  const capturedBodies: Array<unknown> = [];

  const layer = Layer.mergeAll(
    Retry.layerDisabled,
    Layer.provide(
      FetchHttpClient.layer,
      Layer.succeed(FetchHttpClient.Fetch, async (_input, init) => {
        const raw = init?.body as unknown;
        const text = raw instanceof Uint8Array ? new TextDecoder().decode(raw) : String(raw ?? "");
        if (text.length > 0) capturedBodies.push(JSON.parse(text));
        return new Response("{}", { status: 500, headers: { "content-type": "application/json" } });
      }),
    ),
  );

  const send = (input: Parameters<typeof Email.send>[0]) =>
    Email.send(input).pipe(
      Effect.provide(Client.layer({ apiKey: "samva_sk_test" }).pipe(Layer.provideMerge(layer))),
      Effect.exit,
    );

  it.effect("refuses a field the send contract does not declare, before any request", () =>
    Effect.gen(function* () {
      capturedBodies.length = 0;
      const input = {
        to: "ada@example.com",
        subject: "Hello",
        html: "<p>Hi</p>",
        typo: true,
      };
      const exit = yield* send(input);

      expect(exit._tag).toBe("Failure");
      // Nothing reached the wire: the field was neither sent nor silently dropped.
      expect(capturedBodies).toEqual([]);
    }),
  );

  it.effect("sends a declared body unchanged", () =>
    Effect.gen(function* () {
      capturedBodies.length = 0;
      yield* send({ to: "ada@example.com", subject: "Hello", html: "<p>Hi</p>" });

      expect(capturedBodies).toEqual([
        {
          channel: "email",
          to: [{ email: "ada@example.com" }],
          email: { subject: "Hello", html: "<p>Hi</p>" },
        },
      ]);
    }),
  );
});
