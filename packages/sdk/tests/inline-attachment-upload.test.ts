import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import * as Email from "../src/effect/email";
import * as Messages from "../src/effect/messages";
import * as Retry from "../src/effect/retry";
import {
  decodedBase64Bytes,
  INLINE_ATTACHMENT_MAX_BYTES,
  MediaUploadError,
} from "../src/inline-attachments";
import { createClient, type EmailAttachment, SamvaApiError } from "../src/promises";

const MIB = 1024 * 1024;
const ORG = "org_0000000000000000";
const STORAGE_HOST = "storage.test";

const base64Of = (bytes: number, fill = 65): string =>
  Buffer.from(new Uint8Array(bytes).fill(fill)).toString("base64");

const json = (body: unknown, status: number): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

interface Recorded {
  readonly method: string;
  readonly host: string;
  readonly path: string;
  readonly headers: Headers;
  readonly body: Uint8Array;
}

interface FakeOptions {
  /** Status the storage PUT answers with. */
  readonly putStatus?: number;
  /** Number of leading `POST /v1/messages` requests answered with a retryable 500. */
  readonly sendFailures?: number;
}

const media = (id: string, filename: string, contentType: string, sizeBytes: number) => ({
  id,
  organizationId: ORG,
  status: "pending",
  filename,
  contentType,
  sizeBytes,
  width: null,
  height: null,
  durationMs: null,
  purpose: "attachment",
  checksumSha256: null,
  expiresAt: null,
  createdAt: "2026-10-09T10:00:00.000Z",
  confirmedAt: null,
});

/** A fake API plus presigned storage, recording every request in arrival order. */
const makeFake = (options: FakeOptions = {}) => {
  const requests: Array<Recorded> = [];
  const created = new Map<string, { filename: string; contentType: string; sizeBytes: number }>();
  let sends = 0;

  const fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const request = input instanceof Request ? input : new Request(input, init);
    const url = new URL(request.url);
    const body = new Uint8Array(await request.arrayBuffer());
    requests.push({
      method: request.method,
      host: url.host,
      path: url.pathname,
      headers: request.headers,
      body,
    });

    if (url.host === STORAGE_HOST) return new Response(null, { status: options.putStatus ?? 200 });

    if (request.method === "POST" && url.pathname === "/v1/media") {
      const payload = JSON.parse(new TextDecoder().decode(body)) as {
        filename: string;
        contentType: string;
        sizeBytes: number;
      };
      const id = `media_${String(created.size + 1).padStart(16, "0")}`;
      created.set(id, payload);
      return json(
        {
          ...media(id, payload.filename, payload.contentType, payload.sizeBytes),
          upload: {
            url: `https://${STORAGE_HOST}/upload/${id}?signature=abc`,
            method: "PUT",
            headers: { "content-type": payload.contentType, "x-amz-meta-purpose": "attachment" },
            expiresAt: "2026-10-09T11:00:00.000Z",
          },
        },
        201,
      );
    }

    const complete = /^\/v1\/media\/(media_\d+)\/complete$/.exec(url.pathname);
    if (request.method === "POST" && complete) {
      const id = complete[1]!;
      const upload = created.get(id)!;
      return json(
        {
          media: {
            ...media(id, upload.filename, upload.contentType, upload.sizeBytes),
            status: "ready",
          },
          downloadUrl: `https://${STORAGE_HOST}/download/${id}`,
        },
        200,
      );
    }

    if (request.method === "POST" && url.pathname === "/v1/messages") {
      sends += 1;
      if (sends <= (options.sendFailures ?? 0)) {
        return json({ _tag: "InternalError", message: "try again" }, 500);
      }
      return json(
        {
          id: "msg_aaaaaaaaaaaaaaaa",
          status: "pending",
          waitReason: null,
          reviewExpectedAt: null,
          skippedRecipients: [],
          createdAt: "2026-10-09T10:00:00.000Z",
        },
        201,
      );
    }

    return json({ _tag: "ResourceNotFoundError", message: "unexpected" }, 404);
  };

  const calls = () => requests.map((request) => `${request.method} ${request.path}`);
  const sendBodies = () =>
    requests
      .filter((request) => request.method === "POST" && request.path === "/v1/messages")
      .map(
        (request) =>
          JSON.parse(new TextDecoder().decode(request.body)) as {
            email: { attachments: Array<Record<string, unknown>> };
          },
      );
  return { fetch, requests, calls, sendBodies };
};

type Fake = ReturnType<typeof makeFake>;

// Sizes in the order given: index 1 is the largest, then index 2. Total 9 MiB, so two uploads
// leave 2.5 MiB inline and one would leave 5.5 MiB, over the cap.
const overCapAttachments = () =>
  [
    { filename: "a.bin", contentType: "application/x-a", content: base64Of(2.5 * MIB, 65) },
    { filename: "b.bin", contentType: "application/x-b", content: base64Of(3.5 * MIB, 66) },
    { filename: "c.bin", contentType: "application/x-c", content: base64Of(3 * MIB, 67) },
  ].map((attachment) => ({
    ...attachment,
    size: decodedBase64Bytes(attachment.content),
  }));

const expectUploadedLargestFirst = (fake: Fake) => {
  expect(fake.calls()).toEqual([
    "POST /v1/media",
    "PUT /upload/media_0000000000000001",
    "POST /v1/media/media_0000000000000001/complete",
    "POST /v1/media",
    "PUT /upload/media_0000000000000002",
    "POST /v1/media/media_0000000000000002/complete",
    "POST /v1/messages",
  ]);

  const [createB, putB, , createC, putC, , send] = fake.requests;
  expect(JSON.parse(new TextDecoder().decode(createB!.body))).toEqual({
    filename: "b.bin",
    contentType: "application/x-b",
    sizeBytes: 3.5 * MIB,
    purpose: "attachment",
  });
  expect(JSON.parse(new TextDecoder().decode(createC!.body))).toMatchObject({ filename: "c.bin" });

  // The presigned headers are replayed exactly, the bytes are the decoded content, and the API
  // credentials never reach storage.
  expect(putB!.host).toBe(STORAGE_HOST);
  expect(putB!.headers.get("content-type")).toBe("application/x-b");
  expect(putB!.headers.get("x-amz-meta-purpose")).toBe("attachment");
  expect(putB!.headers.get("x-api-key")).toBeNull();
  expect(putB!.headers.get("authorization")).toBeNull();
  expect(putB!.body.length).toBe(3.5 * MIB);
  expect(putB!.body[0]).toBe(66);
  expect(putC!.body.length).toBe(3 * MIB);
  expect(putC!.body[0]).toBe(67);
  expect(createB!.headers.get("x-api-key") ?? createB!.headers.get("authorization")).not.toBeNull();
  expect(send!.headers.get("idempotency-key")).toBeTruthy();

  const [first, second, third] = fake.sendBodies()[0]!.email.attachments;
  expect(first).toMatchObject({ filename: "a.bin", content: expect.any(String) });
  expect(second).toEqual({
    filename: "b.bin",
    mediaId: "media_0000000000000001",
    contentType: "application/x-b",
    size: 3.5 * MIB,
  });
  expect(third).toEqual({
    filename: "c.bin",
    mediaId: "media_0000000000000002",
    contentType: "application/x-c",
    size: 3 * MIB,
  });
};

const underCapAttachments = () => [
  {
    filename: "small.bin",
    contentType: "application/octet-stream",
    content: base64Of(INLINE_ATTACHMENT_MAX_BYTES),
    size: INLINE_ATTACHMENT_MAX_BYTES,
  },
];

const mediaIdAttachments = () => [
  {
    filename: "big.bin",
    contentType: "application/octet-stream",
    mediaId: "media_0000000000000009",
    size: 20 * MIB,
  },
];

const promiseSends = {
  "email.send": (fake: Fake, attachments: Array<EmailAttachment>, headers?: HeadersInit) => {
    const client = createClient({ apiKey: "samva_sk_test", fetch: fake.fetch });
    return client.email.send(
      { to: "ada@example.com", subject: "Hello", text: "Hi", attachments },
      headers === undefined ? undefined : { headers },
    );
  },
  "messages.send": (fake: Fake, attachments: Array<EmailAttachment>, headers?: HeadersInit) => {
    const client = createClient({ apiKey: "samva_sk_test", fetch: fake.fetch });
    return client.messages.send(
      {
        channel: "email",
        to: "ada@example.com",
        email: { subject: "Hello", text: "Hi", attachments },
      },
      headers === undefined ? undefined : { headers },
    );
  },
};

type EffectAttachments = NonNullable<Parameters<typeof Email.send>[0]["attachments"]>;

const effectSends = {
  "Email.send": (attachments: EffectAttachments) =>
    Email.send({ to: "ada@example.com", subject: "Hello", text: "Hi", attachments }),
  "Messages.send": (attachments: EffectAttachments) =>
    Messages.send({
      channel: "email",
      to: "ada@example.com",
      email: { subject: "Hello", text: "Hi", attachments },
    }),
};

const runEffect = <A, E>(
  fake: Fake,
  program: Effect.Effect<A, E, Client.Service>,
  retry: Layer.Layer<Retry.Service> = Retry.layerDisabled,
) =>
  Effect.runPromise(
    program.pipe(
      Effect.provide(
        Layer.mergeAll(
          Layer.provide(
            Client.layer({ apiKey: "samva_sk_test" }),
            Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fake.fetch)),
          ),
          retry,
        ),
      ),
    ),
  );

describe.each(Object.keys(promiseSends) as Array<keyof typeof promiseSends>)(
  "Promise %s with oversized inline attachments",
  (name) => {
    it("sends once when inline content is at the cap", async () => {
      const fake = makeFake();
      await promiseSends[name](fake, underCapAttachments());
      expect(fake.calls()).toEqual(["POST /v1/messages"]);
      expect(fake.sendBodies()[0]!.email.attachments[0]).toMatchObject({
        content: expect.any(String),
      });
    });

    it("does not touch media for mediaId-only attachments", async () => {
      const fake = makeFake();
      await promiseSends[name](fake, mediaIdAttachments());
      expect(fake.calls()).toEqual(["POST /v1/messages"]);
      expect(fake.sendBodies()[0]!.email.attachments).toEqual(mediaIdAttachments());
    });

    it("uploads the largest attachments through media, then sends once with mediaId", async () => {
      const fake = makeFake();
      await promiseSends[name](fake, overCapAttachments());
      expectUploadedLargestFirst(fake);
    });

    it("forwards per-call API headers to media without sending them to storage", async () => {
      const fake = makeFake();
      await promiseSends[name](fake, overCapAttachments(), { "x-org-slug": "my-org" });
      for (const request of fake.requests) {
        expect(request.headers.get("x-org-slug")).toBe(
          request.host === STORAGE_HOST ? null : "my-org",
        );
      }
    });

    it("leaves conflicting attachment sources for the API to reject without uploading", async () => {
      const fake = makeFake();
      const attachments: Array<EmailAttachment> = overCapAttachments();
      attachments[1] = { ...attachments[1]!, mediaId: "media_0000000000000009" };
      await promiseSends[name](fake, attachments);
      expect(fake.calls()).toEqual(["POST /v1/messages"]);
      expect(fake.sendBodies()[0]!.email.attachments).toEqual(attachments);
    });

    it("uploads nothing when oversized content is not Base64, leaving the API to name it", async () => {
      const fake = makeFake();
      const [a, b, c] = overCapAttachments();
      await promiseSends[name](fake, [a!, { ...b!, content: `!${b!.content.slice(1)}` }, c!]);
      expect(fake.calls()).toEqual(["POST /v1/messages"]);
    });

    it("uploads only as many attachments as needed", async () => {
      const fake = makeFake();
      const [a, b, c] = overCapAttachments();
      await promiseSends[name](fake, [
        { ...a!, content: base64Of(1 * MIB), size: 1 * MIB },
        b!,
        { ...c!, content: base64Of(1 * MIB), size: 1 * MIB },
      ]);
      // 1 + 3.5 + 1 = 5.5 MiB; uploading b alone leaves 2 MiB.
      expect(fake.calls().filter((call) => call.startsWith("PUT"))).toHaveLength(1);
      expect(fake.sendBodies()[0]!.email.attachments.map((item) => "mediaId" in item)).toEqual([
        false,
        true,
        false,
      ]);
    });

    it("surfaces a failed storage upload as MediaUploadError and sends nothing", async () => {
      const fake = makeFake({ putStatus: 403 });
      const error = await promiseSends[name](fake, overCapAttachments()).then(
        () => undefined,
        (caught: unknown) => caught,
      );
      expect(error).toBeInstanceOf(MediaUploadError);
      expect(error).toMatchObject({
        _tag: "MediaUploadError",
        filename: "b.bin",
        mediaId: "media_0000000000000001",
        status: 403,
      });
      expect((error as Error).message).toContain("b.bin");
      expect(fake.calls()).toEqual(["POST /v1/media", "PUT /upload/media_0000000000000001"]);
    });
  },
);

describe("Promise client upload errors", () => {
  it("throws the API's typed error when media creation is rejected", async () => {
    const fake = makeFake();
    const client = createClient({
      apiKey: "samva_sk_test",
      fetch: async (input, init) => {
        const request = input instanceof Request ? input : new Request(input, init);
        if (new URL(request.url).pathname === "/v1/media") {
          return json({ _tag: "ValidationError", message: "bad media" }, 422);
        }
        return fake.fetch(input, init);
      },
    });
    const error = await client.email
      .send({
        to: "ada@example.com",
        subject: "Hello",
        text: "Hi",
        attachments: overCapAttachments(),
      })
      .then(
        () => undefined,
        (caught: unknown) => caught,
      );
    expect(error).toBeInstanceOf(SamvaApiError);
    expect(fake.calls()).toEqual([]);
  });
});

describe.each(Object.keys(effectSends) as Array<keyof typeof effectSends>)(
  "Effect %s with oversized inline attachments",
  (name) => {
    it("sends once when inline content is at the cap", async () => {
      const fake = makeFake();
      await runEffect(fake, effectSends[name](underCapAttachments()));
      expect(fake.calls()).toEqual(["POST /v1/messages"]);
    });

    it("does not touch media for mediaId-only attachments", async () => {
      const fake = makeFake();
      await runEffect(fake, effectSends[name](mediaIdAttachments()));
      expect(fake.calls()).toEqual(["POST /v1/messages"]);
    });

    it("uploads the largest attachments through media, then sends once with mediaId", async () => {
      const fake = makeFake();
      await runEffect(fake, effectSends[name](overCapAttachments()));
      expectUploadedLargestFirst(fake);
    });

    it("leaves conflicting attachment sources for the API to reject without uploading", async () => {
      const fake = makeFake();
      const [a, b, c] = overCapAttachments();
      const attachments: EffectAttachments = [a!, { ...b!, mediaId: "media_0000000000000009" }, c!];
      await runEffect(fake, effectSends[name](attachments));
      expect(fake.calls()).toEqual(["POST /v1/messages"]);
      expect(fake.sendBodies()[0]!.email.attachments).toEqual(attachments);
    });

    it("reuses the uploaded payload when the send is retried", async () => {
      const fake = makeFake({ sendFailures: 1 });
      await runEffect(fake, effectSends[name](overCapAttachments()), Retry.layerDefault);
      expect(fake.calls().filter((call) => call === "POST /v1/media")).toHaveLength(2);
      expect(fake.calls().filter((call) => call === "POST /v1/messages")).toHaveLength(2);
      const [first, second] = fake.sendBodies();
      expect(second).toEqual(first);
      expect(second!.email.attachments[1]).toMatchObject({ mediaId: "media_0000000000000001" });
    });

    it("fails with MediaUploadError in the error channel and sends nothing", async () => {
      const fake = makeFake({ putStatus: 403 });
      const error = await runEffect(fake, Effect.flip(effectSends[name](overCapAttachments())));
      expect(error).toBeInstanceOf(MediaUploadError);
      expect(error).toMatchObject({ _tag: "MediaUploadError", filename: "b.bin", status: 403 });
      expect(fake.calls()).toEqual(["POST /v1/media", "PUT /upload/media_0000000000000001"]);
    });
  },
);
