import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { TestClock } from "effect/testing";

import { verify as verifyEffect } from "../../src/webhooks/effect.js";
import {
  generateWebhookSecret,
  signWebhook,
  verify,
  WebhookTimestampError,
} from "../../src/webhooks/promise.js";

const timestamp = 1_767_225_600;
const body = JSON.stringify({
  type: "message.delivered",
  timestamp: "2026-01-01T00:00:00.000Z",
  data: { messageId: "msg_example", organizationId: "org_example", channel: "email" },
});

describe("published Standard Webhooks projections", () => {
  it("the Promise projection verifies the shared implementation", async () => {
    const secret = generateWebhookSecret();
    const now = Math.floor(Date.now() / 1000);
    const signature = await signWebhook({ id: "evt_promise", timestamp: now, body, secret });
    await expect(
      verify({ id: "evt_promise", timestamp: String(now), body, signature, secret }),
    ).resolves.toMatchObject({
      id: "evt_promise",
      event: { type: "message.delivered" },
    });
  });

  it("the Promise projection rejects a timestamp outside the default tolerance", async () => {
    const secret = generateWebhookSecret();
    const expired = Math.floor(Date.now() / 1000) - 600;
    const signature = await signWebhook({ id: "evt_expired", timestamp: expired, body, secret });
    await expect(
      verify({ id: "evt_expired", timestamp: String(expired), body, signature, secret }),
    ).rejects.toBeInstanceOf(WebhookTimestampError);
  });

  it.effect("the Effect projection uses TestClock", () =>
    Effect.gen(function* () {
      yield* TestClock.setTime(timestamp * 1000);
      const secret = generateWebhookSecret();
      const signature = yield* Effect.promise(() =>
        signWebhook({ id: "evt_effect", timestamp, body, secret }),
      );
      const result = yield* verifyEffect({
        id: "evt_effect",
        timestamp: String(timestamp),
        body,
        signature,
        secret,
      });
      expect(result.id).toBe("evt_effect");
    }),
  );
});
