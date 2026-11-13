import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { SamvaApi, ValidationError } from "../../src/effect/generated";
import { createClient } from "../../src/promises";
import { fakeSamvaApi } from "../support/fake-samva-api";

const id = "sched_1234567890abcdef";

describe("scheduled message resume transport", () => {
  it.each([
    { choice: "send_now" },
    { choice: "new_time", scheduledFor: "2027-01-01T10:00:00.000Z" },
  ] as const)("preserves the published body input for $choice", async (body) => {
    const fake = fakeSamvaApi(SamvaApi)({
      "Scheduled Messages": {
        scheduledMessagesResume: () =>
          Effect.fail(new ValidationError({ message: "Captured", fields: {} })),
      },
    });
    const client = createClient({ apiKey: "samva_sk_test", fetch: fake.fetch });
    await expect(client.scheduledMessages.resume({ id, body })).rejects.toThrow("Captured");
    fake.assertComplete();
    expect(
      fake.requests.map(({ path, body: requestBody }) => ({ path, body: requestBody })),
    ).toEqual([{ path: `/v1/messages/scheduled/${id}/resume`, body }]);
  });
});
