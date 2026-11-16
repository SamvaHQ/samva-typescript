import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer, Redacted } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import { SamvaApi } from "../src/effect/generated";
import * as Mailboxes from "../src/effect/mailboxes";
import { createClient } from "../src/promises";
import { fakeSamvaApi } from "./support/fake-samva-api";

const mailboxId = "mbx_1234567890abcdef";
const input = {
  id: mailboxId,
  filename: "Takeout.mbox",
  sizeBytes: 1024,
  format: "gmail" as const,
};
const body = {
  id: "import-one",
  uploadUrl: "https://archive.example.test/mail.mbox?signature=synthetic-private-token",
};
const transport = () =>
  fakeSamvaApi(SamvaApi)({
    Mailboxes: {
      mailboxesCreateImportUpload: () =>
        Effect.succeed({ ...body, uploadUrl: Redacted.make(body.uploadUrl) }),
    },
  });
const assertRequest = (fake: ReturnType<typeof transport>, importId?: string) => {
  fake.assertComplete();
  expect(fake.requests).toHaveLength(1);
  expect(fake.requests[0]).toMatchObject({
    method: "POST",
    path: `/v1/mailboxes/${mailboxId}/imports/uploads`,
    body: {
      filename: input.filename,
      sizeBytes: input.sizeBytes,
      format: input.format,
      ...(importId === undefined ? {} : { importId }),
    },
  });
};

describe("mail history upload credential transport", () => {
  it.each([undefined, "import-one"])(
    "keeps the Promise upload credential and optional job reference (%s)",
    async (importId) => {
      const fake = transport();
      const client = createClient({ apiKey: "samva_sk_test", fetch: fake.fetch });
      expect(
        await client.mailboxes.createImportUpload({
          ...input,
          ...(importId === undefined ? {} : { importId }),
        }),
      ).toEqual(body);
      assertRequest(fake, importId);
    },
  );
  it.effect("passes an appended archive's job reference through the Effect client", () => {
    const fake = transport();
    return Effect.gen(function* () {
      const result = yield* Mailboxes.createImportUpload({ ...input, importId: body.id }).pipe(
        Effect.provide(
          Layer.provide(
            Client.layer({ apiKey: "samva_sk_test" }),
            Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fake.fetch)),
          ),
        ),
      );
      expect(result.id).toBe(body.id);
      expect(Redacted.value(result.uploadUrl)).toBe(body.uploadUrl);
      assertRequest(fake, body.id);
    });
  });
  it.effect("protects the signed URL against Effect inspection until explicitly unwrapped", () => {
    const fake = transport();
    return Effect.gen(function* () {
      const result = yield* Mailboxes.createImportUpload(input).pipe(
        Effect.provide(
          Layer.provide(
            Client.layer({ apiKey: "samva_sk_test" }),
            Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fake.fetch)),
          ),
        ),
      );
      expect(Redacted.isRedacted(result.uploadUrl)).toBe(true);
      expect(typeof result.uploadUrl).not.toBe("string");
      expect(Redacted.value(result.uploadUrl)).toBe(body.uploadUrl);
      expect(String(result.uploadUrl)).toBe("<redacted>");
      expect(JSON.stringify(result)).not.toContain(body.uploadUrl);
      assertRequest(fake);
    });
  });
});
