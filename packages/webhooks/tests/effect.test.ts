import { assert, it } from "@effect/vitest";
import { Effect } from "effect";
import { TestClock } from "effect/testing";

import { verify } from "../src/effect.js";
import { generateWebhookSecret, signWebhook } from "../src/protocol.js";

it.effect("uses the Effect clock for replay tolerance", () =>
  Effect.gen(function* () {
    yield* TestClock.setTime(1_767_225_600_000);
    const secret = generateWebhookSecret();
    const body = '{"type":"webhook.test","timestamp":"2026-01-01T00:00:00.000Z","data":{}}';
    const signature = yield* Effect.promise(() =>
      signWebhook({ id: "evt_effect", timestamp: 1_767_225_600, body, secret }),
    );
    const value = yield* verify({
      body,
      id: "evt_effect",
      timestamp: "1767225600",
      signature,
      secret,
    });
    assert.strictEqual(value.id, "evt_effect");
  }),
);
