import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../../src/effect/client";
import * as Email from "../../src/effect/email";
import * as Messages from "../../src/effect/messages";
import * as Retry from "../../src/effect/retry";
import { buildEmailSendPayload } from "../../src/normalize";
import { createClient as createPromiseClient, type SamvaClient } from "../../src/promises";

/**
 * Wire-level parity: the Effect client and the Promise client are two
 * hand-written ergonomic layers over two different generated clients. They must
 * put byte-identical JSON on the wire for the same ergonomic input — this is the
 * proof that `src/normalize.ts` is their single source of truth and the layers
 * can't drift (the templateSlug drop and from-placement bugs lived in only one
 * layer each). Bodies are captured through each client's transport seam and
 * compared as parsed JSON (key order on the wire is not part of the contract).
 */

type SendService = "messages" | "email";

interface Cell {
  readonly name: string;
  readonly service: SendService;
  readonly input: Record<string, unknown>;
}

// A canned 500 lets the request fail *after* the transport has captured the
// body — the assertion is about what went on the wire, not the response.
const cannedResponse = (): Response =>
  new Response("{}", { status: 500, headers: { "content-type": "application/json" } });

// The HttpApiClient transport encodes the body as a Uint8Array. Depending on
// the runtime it arrives either on `init.body` or on a `Request` first arg, so
// read from whichever carries it. `ArrayBuffer.isView` is realm-agnostic where
// a bare `instanceof Uint8Array` check is fragile across module realms.
async function fetchBodyText(raw: unknown, input: RequestInfo | URL): Promise<string> {
  if (typeof raw === "string") return raw;
  if (ArrayBuffer.isView(raw)) return new TextDecoder().decode(raw as ArrayBufferView);
  if (raw instanceof ArrayBuffer) return new TextDecoder().decode(raw);
  if (input instanceof Request) return await input.clone().text();
  return "";
}

function captureEffectBody(cell: Cell): Promise<unknown> {
  const bodies: Array<unknown> = [];
  const fakeFetch: typeof globalThis.fetch = async (input, init) => {
    const raw = init?.body as unknown;
    const text = await fetchBodyText(raw, input);
    bodies.push(text.length > 0 ? JSON.parse(text) : undefined);
    return cannedResponse();
  };

  const program = Effect.gen(function* () {
    yield* effectSend(cell).pipe(
      Effect.provide(Client.layer({ apiKey: "samva_sk_test" })),
      Effect.exit,
    );
    return bodies[0];
  }).pipe(
    // The canned 500 is retryable; disable auto-retry so the wire capture is a
    // single shot (parity is about the first request body, not retry behavior).
    Effect.provide(
      Layer.mergeAll(
        Retry.layerDisabled,
        Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fakeFetch)),
      ),
    ),
  );

  return Effect.runPromise(program);
}

function effectSend(cell: Cell) {
  switch (cell.service) {
    case "messages":
      return Messages.send(cell.input as Parameters<typeof Messages.send>[0]);
    case "email":
      return Email.send(cell.input as Parameters<typeof Email.send>[0]);
  }
}

async function capturePromiseBody(cell: Cell): Promise<unknown> {
  let captured: unknown;
  const fakeFetch: typeof globalThis.fetch = async (input) => {
    const request = input as Request;
    captured = JSON.parse(await request.clone().text());
    return cannedResponse();
  };

  // The ergonomic Promise client rejects on the canned 500 after the transport
  // captures the body. The failure is expected; parity only needs the request.
  const client = createPromiseClient({ apiKey: "samva_sk_test", fetch: fakeFetch });
  await promiseSend(client, cell).catch(() => undefined);
  return captured;
}

function promiseSend(client: SamvaClient, cell: Cell) {
  switch (cell.service) {
    case "messages":
      return client.messages.send(cell.input as Parameters<SamvaClient["messages"]["send"]>[0]);
    case "email":
      return client.email.send(cell.input as Parameters<SamvaClient["email"]["send"]>[0]);
  }
}

// ─── Matrix ──────────────────────────────────────────────────────────────────
// Recipient forms exercised across channels: bare string, contactId object,
// {id} contact object, and a mixed array of all three.
// Contact ids must satisfy the branded `ContactId` schema (`contact_<crockford>`);
// the Effect client decodes/encodes through the real contract schema, so invalid
// placeholders would be rejected before hitting the wire.
const emailRecipients = {
  string: "ada@example.com",
  contactId: { contactId: "contact_7q2xk9mvt4znw8rh" },
  id: { id: "contact_4znw8rh7q2xk9mvt0" },
  mixed: [
    "grace@example.com",
    { contactId: "contact_mvt4znw8rh7q2xk9" },
    { id: "contact_9mvt4znw8rh7q2xk0" },
  ],
} as const;
const recipientForms = ["string", "contactId", "id", "mixed"] as const;

const cells: Array<Cell> = [];

// The axes are exercised independently rather than crossed. Every cell proves
// the same one thing — the two clients put identical JSON on the wire — so a
// cross product multiplies cells without reaching a line of `normalize.ts` the
// axes miss.
const replyToVariants = {
  none: {},
  string: { replyTo: "reply@example.com" },
  array: { replyTo: ["a@example.com", "b@example.com"] },
} as const;
const ccBccVariants = {
  none: {},
  string: { cc: "cc@example.com", bcc: "bcc@example.com" },
  array: { cc: ["cc1@example.com"], bcc: ["bcc1@example.com", "bcc2@example.com"] },
  null: { cc: null, bcc: null },
} as const;

/** The recipient form every non-recipient axis holds fixed. */
const fixedRecipientForm = "string" as const;

const emailContent = {
  from: { email: "sender@example.com", name: "Sender" },
  subject: "Hello",
  html: "<p>Hi</p>",
  tracking: { opens: false, clicks: true },
} as const;

// The recipient axis, at the replyTo and cc/bcc baseline.
for (const form of recipientForms) {
  cells.push({
    name: `email content \u00b7 ${form}`,
    service: "email",
    input: { to: emailRecipients[form], ...emailContent },
  });
}

// The replyTo axis, on one recipient form.
for (const [replyName, replyTo] of Object.entries(replyToVariants)) {
  if (replyName === "none") continue;
  cells.push({
    name: `email content \u00b7 replyTo=${replyName}`,
    service: "email",
    input: { to: emailRecipients[fixedRecipientForm], ...emailContent, ...replyTo },
  });
}

// The cc/bcc axis, on the same recipient form.
for (const [ccName, ccBcc] of Object.entries(ccBccVariants)) {
  if (ccName === "none") continue;
  cells.push({
    name: `email content \u00b7 ccbcc=${ccName}`,
    service: "email",
    input: { to: emailRecipients[fixedRecipientForm], ...emailContent, ...ccBcc },
  });
}

// The template send, which is where templateSlug and templateData placement is
// decided; the recipient axis above already covers who it addresses.
cells.push({
  name: "email template",
  service: "email",
  input: {
    to: emailRecipients[fixedRecipientForm],
    from: { email: "sender@example.com" },
    templateId: "tmpl_7q2xk9mvt4znw8rh",
    templateSlug: "welcome",
    templateData: { name: "Ada" },
  },
});

// Unified messages.send remains available through the public email API.
cells.push({
  name: "messages email with cc/bcc",
  service: "messages",
  input: {
    channel: "email",
    to: emailRecipients.mixed,
    cc: "cc@example.com",
    bcc: ["bcc@example.com"],
    from: { email: "sender@example.com" },
    email: {
      subject: "Unified",
      html: "<p>hi</p>",
      replyTo: "reply@example.com",
      tracking: { opens: false },
    },
  },
});

describe("send wire parity between effect and promise clients", () => {
  for (const cell of cells) {
    it(cell.name, async () => {
      const [effectBody, promiseBody] = await Promise.all([
        captureEffectBody(cell),
        capturePromiseBody(cell),
      ]);

      expect(effectBody, "effect client sent no request body").toBeDefined();
      expect(promiseBody, "promise client sent no request body").toBeDefined();
      expect(effectBody).toEqual(promiseBody);
    });
  }
});

it("keeps idempotency out of the email send body", () => {
  const payload = buildEmailSendPayload({
    to: "ada@example.com",
    subject: "Hello",
    html: "<p>Hi</p>",
  });

  expect(payload).toMatchObject({
    channel: "email",
    email: {
      subject: "Hello",
      html: "<p>Hi</p>",
    },
  });
  expect(payload).not.toHaveProperty("idempotencyKey");
  expect(payload.email).not.toHaveProperty("idempotencyKey");
});
