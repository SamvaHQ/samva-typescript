import { describe, expect, it } from "@effect/vitest";

import { ConflictError, fromApiError, SamvaTransportError } from "../src/promises/errors.gen";

describe("generated promise API errors", () => {
  it("exposes the retry hint on an in-progress send conflict", () => {
    const response = new Response(null, { status: 409, headers: { "Retry-After": "2" } });
    const error = fromApiError(
      {
        _tag: "ConflictError",
        resource: "Message",
        message: "Wait 2 seconds and retry with the same idempotency key and request body.",
      },
      { response },
    );
    expect(error).toBeInstanceOf(ConflictError);
    expect(error).toMatchObject({
      message: expect.stringContaining("retry with the same idempotency key"),
    });
    expect(error.response?.headers.get("Retry-After")).toBe("2");
  });

  it.each([
    { _tag: "constructor" },
    { _tag: "ValidationError", operation: "Email.send", message: "Invalid", unexpected: true },
  ])("rejects malformed contract error payloads", (payload) => {
    expect(fromApiError(payload)).toBeInstanceOf(SamvaTransportError);
  });
});
