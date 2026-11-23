import { inspect } from "node:util";

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
  archiveId: "e329e0f7-82f7-4656-9410-1b6d0c843b79",
  partSizeBytes: 67_108_864,
};
const uploadUrl = "https://archive.example.test/mail.mbox?signature=synthetic-private-token";
const part = { partNumber: 1, sizeBytes: input.sizeBytes };
const signInput = { id: mailboxId, importId: body.id, archiveId: body.archiveId, partNumbers: [1] };
const transport = () =>
  fakeSamvaApi(SamvaApi)({
    Mailboxes: { mailboxesCreateImportUpload: () => Effect.succeed(body) },
  });
const signedTransport = () =>
  fakeSamvaApi(SamvaApi)({
    Mailboxes: {
      mailboxesSignImportUploadParts: () =>
        Effect.succeed({ parts: [{ ...part, uploadUrl: Redacted.make(uploadUrl) }] }),
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
    "registers an archive with the Promise client and optional job reference (%s)",
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
      expect(result).toEqual(body);
      assertRequest(fake, body.id);
    });
  });
  it("returns an ordinary signed URL in the Promise client", async () => {
    const fake = signedTransport();
    const client = createClient({ apiKey: "samva_sk_test", fetch: fake.fetch });
    expect(await client.mailboxes.signImportUploadParts(signInput)).toEqual({
      parts: [{ ...part, uploadUrl }],
    });
    fake.assertComplete();
  });
  it.effect("protects the signed URL against Effect inspection until explicitly unwrapped", () => {
    const fake = signedTransport();
    return Effect.gen(function* () {
      const result = yield* Mailboxes.signImportUploadParts(signInput).pipe(
        Effect.provide(
          Layer.provide(
            Client.layer({ apiKey: "samva_sk_test" }),
            Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fake.fetch)),
          ),
        ),
      );
      const url = result.parts[0]?.uploadUrl;
      if (url === undefined) throw new Error("Missing signed part");
      expect(Redacted.isRedacted(url)).toBe(true);
      expect(Redacted.value(url)).toBe(uploadUrl);
      expect(inspect(url)).toBe("<redacted>");
      expect(JSON.stringify(result)).not.toContain(uploadUrl);
      fake.assertComplete();
    });
  });
});
