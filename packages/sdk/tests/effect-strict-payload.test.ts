import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import * as Email from "../src/effect/email";
import { SamvaApi, InternalError } from "../src/effect/generated";
import * as Retry from "../src/effect/retry";
import { fakeSamvaApi } from "./support/fake-samva-api";

describe("effect client request bodies", () => {
  const transport = () =>
    fakeSamvaApi(SamvaApi)({
      Messages: { messagesSend: () => Effect.fail(new InternalError({ message: "Captured" })) },
    });
  const send = (input: Parameters<typeof Email.send>[0], fake: ReturnType<typeof transport>) =>
    Email.send(input).pipe(
      Effect.provide([Client.layer({ apiKey: "samva_sk_test" }), Retry.layerDisabled]),
      Effect.provide(
        Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fake.fetch)),
      ),
      Effect.exit,
    );

  it.effect("refuses a field the send contract does not declare, before any request", () =>
    Effect.gen(function* () {
      const fake = transport();
      const input = {
        to: "ada@example.com",
        subject: "Hello",
        html: "<p>Hi</p>",
        typo: true,
      };
      const exit = yield* send(input, fake);

      expect(exit._tag).toBe("Failure");
      // Nothing reached the wire: the field was neither sent nor silently dropped.
      expect(fake.requests).toEqual([]);
      fake.assertComplete();
    }),
  );

  it.effect("sends a declared body unchanged", () =>
    Effect.gen(function* () {
      const fake = transport();
      yield* send({ to: "ada@example.com", subject: "Hello", html: "<p>Hi</p>" }, fake);

      expect(fake.requests.map(({ body }) => body)).toEqual([
        {
          channel: "email",
          to: [{ email: "ada@example.com" }],
          email: { subject: "Hello", html: "<p>Hi</p>" },
        },
      ]);
      fake.assertComplete();
    }),
  );
});
