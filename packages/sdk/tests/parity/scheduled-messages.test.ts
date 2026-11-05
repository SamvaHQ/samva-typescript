import { describe, expect, it } from "@effect/vitest";

import { createClient } from "../../src/promises";

const id = "sched_1234567890abcdef";

describe("scheduled message resume transport", () => {
  it.each([
    { choice: "send_now" },
    { choice: "new_time", scheduledFor: "2027-01-01T10:00:00.000Z" },
  ] as const)("preserves the published body input for $choice", async (body) => {
    const calls: Array<{ path: string; body: unknown }> = [];
    const client = createClient({
      apiKey: "samva_sk_test",
      fetch: async (input, init) => {
        const request = input instanceof Request ? input : new Request(input, init);
        calls.push({ path: new URL(request.url).pathname, body: await request.json() });
        return Response.json(
          { _tag: "ValidationError", message: "Captured", fields: {} },
          { status: 422 },
        );
      },
    });
    await expect(client.scheduledMessages.resume({ id, body })).rejects.toThrow("Captured");
    expect(calls).toEqual([{ path: `/v1/messages/scheduled/${id}/resume`, body }]);
  });
});
