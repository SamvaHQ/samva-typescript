import { describe, expect, it } from "@effect/vitest";

import { fromApiError, SamvaTransportError } from "../src/promises/errors.gen";

describe("generated promise API errors", () => {
  it.each([
    { _tag: "constructor" },
    { _tag: "ValidationError", operation: "Email.send", message: "Invalid", unexpected: true },
  ])("rejects malformed contract error payloads", (payload) => {
    expect(fromApiError(payload)).toBeInstanceOf(SamvaTransportError);
  });
});
