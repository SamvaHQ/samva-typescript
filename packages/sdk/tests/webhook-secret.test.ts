import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer, Redacted } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import { SamvaApi } from "../src/effect/generated";
import * as Webhooks from "../src/effect/webhooks";
import { createClient } from "../src/promises";
import { fakeSamvaApi } from "./support/fake-samva-api";

const id = "wep_1234567890abcdef";
const body = {
  secret: "whsec_test_readable",
  createdAt: "2026-10-18T00:00:00.000Z",
  previousExpiresAt: "2026-10-19T00:00:00.000Z",
};
const transport = () =>
  fakeSamvaApi(SamvaApi)({
    Webhooks: {
      webhooksGetSecret: () => Effect.succeed({ ...body, secret: Redacted.make(body.secret) }),
    },
  });
const assertRequest = (fake: ReturnType<typeof transport>) => {
  fake.assertComplete();
  expect(fake.requests).toHaveLength(1);
  expect(fake.requests[0]).toMatchObject({ method: "GET", path: `/v1/webhooks/${id}/secret` });
};

describe("webhook signing secret read", () => {
  it("returns plaintext through the Promise client", async () => {
    const fake = transport();
    const client = createClient({ apiKey: "samva_sk_test", fetch: fake.fetch });
    expect(await client.webhooks.getSecret({ id })).toEqual(body);
    assertRequest(fake);
  });

  it.effect("redacts the Effect secret while retaining rotation dates", () => {
    const fake = transport();
    return Effect.gen(function* () {
      const result = yield* Webhooks.getSecret({ id }).pipe(
        Effect.provide(
          Layer.provide(
            Client.layer({ apiKey: "samva_sk_test" }),
            Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fake.fetch)),
          ),
        ),
      );
      expect(Redacted.value(result.secret)).toBe(body.secret);
      expect(String(result.secret)).toBe("<redacted>");
      expect(JSON.stringify(result)).not.toContain(body.secret);
      expect(result.createdAt).toBe(body.createdAt);
      expect(result.previousExpiresAt).toBe(body.previousExpiresAt);
      assertRequest(fake);
    });
  });
});
