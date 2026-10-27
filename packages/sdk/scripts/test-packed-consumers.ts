import { mkdtemp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const sdkRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const workspaceRoot = resolve(sdkRoot, "../..");
const webhooksRoot = resolve(sdkRoot, "../webhooks");
const tsc = join(workspaceRoot, "node_modules/.bin/tsc");
const sdkManifest = JSON.parse(await readFile(join(sdkRoot, "package.json"), "utf8")) as {
  readonly version: string;
  readonly peerDependencies: { readonly effect: string };
};

const run = (command: ReadonlyArray<string>, cwd: string): string => {
  const result = Bun.spawnSync({
    cmd: [...command],
    cwd,
    env: process.env,
    stdout: "pipe",
    stderr: "pipe",
  });
  const stdout = result.stdout.toString();
  const stderr = result.stderr.toString();

  if (result.exitCode !== 0) {
    process.stderr.write(`${command.join(" ")} failed in ${cwd}\n${stdout}${stderr}`);
    process.exit(1);
  }

  return stdout;
};

const writeConsumer = async (directory: string, source: string): Promise<void> => {
  await mkdir(directory, { recursive: true });
  await writeFile(
    join(directory, "package.json"),
    JSON.stringify({ name: "samva-packed-consumer", private: true, type: "module" }, null, 2),
  );
  await writeFile(
    join(directory, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2024",
          lib: ["ES2024", "DOM", "DOM.Iterable"],
          module: "Preserve",
          moduleResolution: "bundler",
          strict: true,
          skipLibCheck: true,
          noEmit: true,
        },
        include: ["consumer.ts"],
      },
      null,
      2,
    ),
  );
  await writeFile(join(directory, "consumer.ts"), source);
};

const transitiveJavaScript = async (entrypoint: string): Promise<ReadonlyMap<string, string>> => {
  const sources = new Map<string, string>();
  const visit = async (path: string): Promise<void> => {
    if (sources.has(path)) return;
    sources.set(path, "");
    const source = await readFile(path, "utf8");
    sources.set(path, source);

    const dependencies: Array<string> = [];
    for (const match of source.matchAll(/(?:from\s+|import\s+|import\s*\()["'](\.[^"']+)["']/g)) {
      const resolvedDependency = resolve(dirname(path), match[1]);
      dependencies.push(
        resolvedDependency.endsWith(".js") ? resolvedDependency : `${resolvedDependency}.js`,
      );
    }
    await Promise.all(dependencies.map(visit));
  };

  await visit(entrypoint);

  return sources;
};

const temporaryRoot = await mkdtemp(join(tmpdir(), "samva-sdk-pack-"));
const packDirectory = join(temporaryRoot, "pack");
await mkdir(packDirectory);
run(["bun", "pm", "pack", "--destination", packDirectory], sdkRoot);
run(["bun", "pm", "pack", "--destination", packDirectory], webhooksRoot);

const tarballNames = await readdir(packDirectory);
const tarballName = tarballNames.find((entry) => /^samva-\d/.test(entry));
const webhooksTarballName = tarballNames.find((entry) => entry.startsWith("samva-webhooks-"));
if (tarballName === undefined || webhooksTarballName === undefined) {
  process.stderr.write(`bun pm pack did not produce both public tarballs in ${packDirectory}\n`);
  process.exit(1);
}
const tarball = join(packDirectory, tarballName);
const webhooksTarball = join(packDirectory, webhooksTarballName);

const installPacked = async (directory: string, includeEffect: boolean): Promise<void> => {
  const manifest = JSON.parse(await readFile(join(directory, "package.json"), "utf8")) as Record<
    string,
    unknown
  >;
  manifest.dependencies = {
    samva: `file:${tarball}`,
    ...(includeEffect ? { effect: sdkManifest.peerDependencies.effect } : {}),
  };
  manifest.overrides = {
    "@samva/webhooks": `file:${webhooksTarball}`,
  };
  await writeFile(join(directory, "package.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  run(["bun", "install", "--ignore-scripts"], directory);
};

const promiseDirectory = join(temporaryRoot, "promise");
await writeConsumer(
  promiseDirectory,
  `import { createClient, type SamvaClient } from "samva";
import { isKnownEvent, generateWebhookSecret, signWebhook, verifyRequest, type SamvaWebhookEvent, type MessageBouncedPayload } from "samva/webhooks";

let requestPath: string | undefined;
let clientAttribution: string | null | undefined;
const fetch: typeof globalThis.fetch = async (input: URL | RequestInfo) => {
  const request = input as Request;
  requestPath = new URL(request.url).pathname;
  clientAttribution = request.headers.get("x-samva-client");
  if (requestPath.endsWith("/issues")) return Response.json({ projectId: null, revision: null, items: [] });
  if (requestPath.includes("/publication/domains/")) return Response.json({ _tag: "FlagDisabledError", flag: "issueWeb", message: "Publication is unavailable" }, { status: 403 });
  return new Response(JSON.stringify({ contact: { id: "contact_test" }, created: true }), {
    status: 201,
    headers: { "content-type": "application/json" },
  });
};
const client: SamvaClient = createClient({ apiKey: "samva_sk_test", fetch });
const response = await client.contacts.findOrCreate({ lookup: { type: "email", value: "ada@example.com" } });
if (
  requestPath !== "/v1/contacts/find-or-create" ||
  response.contact.id !== "contact_test" ||
  clientAttribution !== "typescript-promise/${sdkManifest.version}"
) {
  await Promise.reject(new Error("Promise packed request proof failed"));
}

const raw = await client.raw.contacts.findOrCreate({ lookup: { type: "email", value: "ada@example.com" } });
if (raw.data?.contact.id !== "contact_test" || raw.response?.status !== 201) {
  await Promise.reject(new Error("Promise packed raw-envelope proof failed"));
}

const issues = await client.topicIssues.list({ id: "unsub_1234567890abcdef" });
if (issues.projectId !== null || issues.revision !== null || issues.items.length !== 0) {
  throw new Error("Packed Promise topic issues proof failed");
}

await client.topicPublicationDomains.get({ id: "unsub_1234567890abcdef", hostname: "news.example.com" }).then(
  () => { throw new Error("Packed Promise publication domains accepted a disabled feature"); },
  (error: unknown) => {
    if (!(error instanceof Error) || error.name !== "FlagDisabledError") {
      throw new Error("Packed Promise publication domains lost the tagged error");
    }
  },
);

const narrow = (event: SamvaWebhookEvent): string | undefined => {
  if (event.type === "message.bounced") {
    const payload: MessageBouncedPayload = event.data;
    return payload.recipient;
  }
};
if (narrow({ type: "message.bounced", timestamp: "2026-01-01T00:00:00.000Z", data: { messageId: "msg_example", organizationId: "org_example", channel: "email", recipient: "ada@example.com", occurredAt: "2026-01-01T00:00:00.000Z" } }) !== "ada@example.com") {
  await Promise.reject(new Error("Packed webhook type proof failed"));
}
const secret = generateWebhookSecret();
const body = '{"type":"webhook.test","timestamp":"2026-01-01T00:00:00.000Z","data":{}}';
const timestamp = String(Math.floor(Date.now() / 1000));
const signature = await signWebhook({ id: "evt_packed", timestamp, body, secret });
const event = await verifyRequest(
  new Request("https://example.test/webhook", {
    method: "POST",
    body,
    headers: {
      "webhook-id": "evt_packed",
      "webhook-timestamp": timestamp,
      "webhook-signature": signature,
    },
  }),
  secret,
);
if (event.id !== "evt_packed" || !isKnownEvent(event.event) || event.event.type !== "webhook.test") {
  await Promise.reject(new Error("Promise packed webhook verification proof failed"));
}
const futureBody = JSON.stringify({ type: "future.event", timestamp: "2026-01-01T00:00:00.000Z", data: { futureField: true } });
const futureSignature = await signWebhook({ id: "evt_future", timestamp, body: futureBody, secret });
const future = await verifyRequest(new Request("https://example.test/webhook", {
  method: "POST", body: futureBody,
  headers: { "webhook-id": "evt_future", "webhook-timestamp": timestamp, "webhook-signature": futureSignature },
}), secret);
if (isKnownEvent(future.event) || future.event.type !== "future.event") {
  await Promise.reject(new Error("Packed future webhook compatibility proof failed"));
}
`,
);
await installPacked(promiseDirectory, false);
run([tsc, "--project", "tsconfig.json"], promiseDirectory);
run(["bun", "consumer.ts"], promiseDirectory);

const missingEffect = Bun.spawnSync({
  cmd: ["bun", "-e", 'import "effect"'],
  cwd: promiseDirectory,
  env: process.env,
  stdout: "pipe",
  stderr: "pipe",
});
if (missingEffect.exitCode === 0) {
  process.stderr.write("Promise-only packed consumer unexpectedly resolved Effect\n");
  process.exit(1);
}

const promiseRuntime = await transitiveJavaScript(
  join(promiseDirectory, "node_modules/samva/dist/index.js"),
);
if (promiseRuntime.size < 2) {
  process.stderr.write("Promise runtime traversal did not discover its bundled chunks\n");
  process.exit(1);
}
if (
  [...promiseRuntime.values()].some((source) =>
    /from\s+["']effect(?:\/|["'])|import\s+["']effect(?:\/|["'])|import\s*\(["']effect(?:\/|["'])|require\(["']effect(?:\/|["'])/.test(
      source,
    ),
  )
) {
  process.stderr.write("Promise runtime graph contains an Effect import\n");
  process.exit(1);
}

const browserConsumer = join(promiseDirectory, "browser.ts");
await writeFile(
  browserConsumer,
  'import { createClient } from "samva"; export const client = createClient({ apiKey: "samva_sk_test" });',
);
const browserBundle = await Bun.build({
  entrypoints: [browserConsumer],
  target: "browser",
  format: "esm",
  minify: true,
});
if (!browserBundle.success) {
  throw new AggregateError(
    browserBundle.logs,
    "Packed Promise browser bundle without Effect failed",
  );
}
process.stdout.write(
  `Packed Promise browser client without Effect: ${browserBundle.outputs.reduce((bytes, output) => bytes + output.size, 0)} bytes\n`,
);

const effectDirectory = join(temporaryRoot, "effect");
await writeConsumer(
  effectDirectory,
  `import { Effect, Layer, Redacted, Schema, Stream } from "effect";
import { FetchHttpClient } from "effect/http";
import { MessageBouncedEventSchema } from "samva/webhooks/effect";
import * as ApiKeys from "samva/effect/api-keys";
import * as Client from "samva/effect/client";
import * as Email from "samva/effect/email";
import * as Errors from "samva/effect/errors";
import * as EffectSdk from "samva/effect";
import * as PromiseSdk from "samva";
import * as Organizations from "samva/effect/organizations";
import * as Retry from "samva/effect/retry";
import * as Templates from "samva/effect/templates";
import * as TopicIssues from "samva/effect/topic-issues";
import * as TopicPublicationDomains from "samva/effect/publication-domains";
import * as Webhooks from "samva/effect/webhooks";

const issueFetch: typeof globalThis.fetch = async () => Response.json({ projectId: null, revision: null, items: [] });
const issues = await Effect.runPromise(TopicIssues.list({ id: "unsub_1234567890abcdef" }).pipe(
  Effect.provide(Client.layer({ apiKey: "samva_sk_test" })),
  Effect.provide(Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, issueFetch))),
));
if (issues.projectId !== null || issues.revision !== null || issues.items.length !== 0 || EffectSdk.TopicIssues.list !== TopicIssues.list) {
  throw new Error("Packed Effect topic issues proof failed");
}

const publicationFetch: typeof globalThis.fetch = async () => Response.json({ _tag: "FlagDisabledError", flag: "issueWeb", message: "Publication is unavailable" }, { status: 403 });
const publicationFailure = await Effect.runPromise(TopicPublicationDomains.get({ id: "unsub_1234567890abcdef", hostname: "news.example.com" }).pipe(
  Effect.catchTag("FlagDisabledError", Effect.succeed),
  Effect.provide(Client.layer({ apiKey: "samva_sk_test" })),
  Effect.provide(Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, publicationFetch))),
));
if (!(publicationFailure instanceof Errors.FlagDisabledError) || publicationFailure.flag !== "issueWeb" || EffectSdk.TopicPublicationDomains.get !== TopicPublicationDomains.get) {
  throw new Error("Packed Effect publication domains proof failed");
}

const templateResponses = ${await readFile(join(sdkRoot, "tests/parity/template-responses.json"), "utf8")};

const transportOnly = new Set(["SamvaApiError", "SamvaTransportError", "MailboxEventStreamError"]);
const intendedErrors = Object.keys(PromiseSdk).filter(
  (name) => /^[A-Z]\\w*Error$/.test(name) && !transportOnly.has(name),
).sort();
if (JSON.stringify(Object.keys(Errors).sort()) !== JSON.stringify(intendedErrors)) {
  throw new Error("Packed focused error inventory differs from the public API errors and MediaUploadError");
}
for (const name of Object.keys(Errors) as Array<keyof typeof Errors>) {
  if (Errors[name] !== EffectSdk[name]) {
    throw new Error("Packed focused error constructor differs from barrel: " + name);
  }
}
const uploadError = new PromiseSdk.MediaUploadError({ filename: "image.png", mediaId: "media_test", status: 503 });
if (Errors.MediaUploadError !== PromiseSdk.MediaUploadError || !(uploadError instanceof Errors.MediaUploadError)) {
  throw new Error("Packed MediaUploadError constructor identity proof failed");
}

const apiKeyBody = {
  id: "apikey_7q2xk9mvt4znw8rh",
  name: "packed",
  access: { mode: "full" },
  owner: null,
  key: "samva_sk_live_packedsecret",
  start: "samva_sk_live_",
  end: null,
  organizationId: "org_7q2xk9mvt4znw8rh",
  createdAt: "2026-01-01T00:00:00.000Z",
  expiresAt: null,
  lastUsedAt: null,
  isActive: true,
};
const domainPage = (page: number) => ({
  items: [
    {
      id: "dom_7q2xk9mvt4znw8r" + page,
      domain: "example" + page + ".com",
      phase: "ready",
      isDefault: page === 1,
      namespaceId: null,
      deliverability: { bounceRate: 0, complaintRate: 0, windowSends: 0, sendingStatus: "enabled" },
      series: Array.from({ length: 14 }, () => 0),
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    },
  ],
  nextCursor: page === 1 ? "domain-page-2" : null,
});

let requestPath: string | undefined;
let clientAttribution: string | null | undefined;
let domainRequests = 0;
const fetch: typeof globalThis.fetch = async (input: URL | RequestInfo, init?: RequestInit) => {
  const url = new URL(input instanceof Request ? input.url : input.toString());
  requestPath = url.pathname;
  clientAttribution =
    input instanceof Request
      ? input.headers.get("x-samva-client")
      : new Headers(init?.headers).get("x-samva-client");
  const templatePath = "/v1/templates/" + templateResponses.publication.templateId;
  if (url.pathname === templatePath + "/publications/" + templateResponses.publication.id) {
    return Response.json(templateResponses.publication);
  }
  if (url.pathname === templatePath + "/workspace/diff") {
    return Response.json(templateResponses.diff);
  }
  if (url.pathname === templatePath + "/workspace/fixtures") {
    return Response.json(templateResponses.fixture);
  }
  if (url.pathname === "/v1/api-keys") {
    return new Response(JSON.stringify(apiKeyBody), {
      status: 201,
      headers: { "content-type": "application/json" },
    });
  }
  if (url.pathname === "/v1/email/domains") {
    domainRequests += 1;
    const page = url.searchParams.has("cursor") ? 2 : 1;
    return new Response(JSON.stringify(domainPage(page)), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }
  if (url.pathname === "/v1/organizations/trust-tier") {
    return new Response(JSON.stringify({
      tier: "probation",
      changedAt: "2026-01-01T00:00:00.000Z",
      sendingLimits: {
        sendsPerSecond: 1,
        dailySends: 100,
        probation: { hourlyRecipients: 50, dailyRecipients: 200, domainShare: 0.6, domainShareFloor: 20 },
      },
      graduation: {
        firstSentAt: null,
        elapsedDays: 0,
        sent: 0,
        delivered: 0,
        hardBounces: 0,
        hardBounceRate: null,
        complaints: 0,
        holds: 0,
        requirements: { minimumDays: 14, delivered: 500, maximumHardBounceRate: 0.02 },
        blockers: ["too_recent", "too_few_delivered", "bounce_rate"],
      },
    }), { status: 200, headers: { "content-type": "application/json" } });
  }
  return new Response(JSON.stringify({
    _tag: "InternalError",
    operation: "organizations.get",
    message: "test failure",
  }), {
    status: 500,
    headers: { "content-type": "application/json" },
  });
};

globalThis.fetch = fetch;
const layer = Client.layerFetch({ apiKey: Redacted.make("samva_sk_test") });

const typedBounce = Schema.decodeUnknownSync(MessageBouncedEventSchema)({
  type: "message.bounced", timestamp: "2026-01-01T00:00:00.000Z",
  data: { messageId: "msg_example", organizationId: "org_example", channel: "email", recipient: "ada@example.com", occurredAt: "2026-01-01T00:00:00.000Z" },
});
if (typedBounce.data.recipient !== "ada@example.com") {
  await Promise.reject(new Error("Packed webhook schema proof failed"));
}

const templatePayload = Schema.decodeUnknownSync(Templates.CreatePayload)({
  name: "Packed",
  source: "<email><text>Hello</text></email>",
  idempotencyKey: "packed-template",
});
const webhookPayload = Schema.decodeUnknownSync(Webhooks.TestPayload)({
  data: { event: "webhook.test" },
});
if (
  templatePayload.name !== "Packed" ||
  webhookPayload.data?.event !== "webhook.test" ||
  Schema.decodeUnknownSync(Email.TrackingRecipientEmail)("ada@example.com") !== "ada@example.com"
) {
  await Promise.reject(new Error("Effect packed schema export proof failed"));
}

// 1) Tagged-error channel proof: the packed domain operation decodes the
//    server error and catchTag sees the semantic tag directly.
const failureTag = await Effect.runPromise(
  Organizations.get().pipe(
    Effect.catchTag("InternalError", (error) => {
      if (!(error instanceof Errors.InternalError)) {
        throw new Error("Packed API failure is not an instance of the focused InternalError");
      }
      return Effect.succeed(error._tag);
    }),
    Effect.provide(Retry.layerDisabled),
    Effect.provide(layer),
  ),
);
if (
  failureTag !== "InternalError" ||
  requestPath !== "/v1/organizations/current" ||
  clientAttribution !== "typescript-effect/${sdkManifest.version}"
) {
  await Promise.reject(new Error("Effect packed request proof failed"));
}

// 2) Redacted secret: the packed .d.ts types \`key\` as Redacted<string>, and the
//    runtime redacts on String() while \`Redacted.value\` unwraps the plaintext.
const createdKey = await Effect.runPromise(
  Effect.gen(function* () {
    const result = yield* ApiKeys.create({ name: "packed" });
    const key: Redacted.Redacted<string> = result.key;
    return key;
  }).pipe(Effect.provide(layer)),
);
if (
  !Redacted.isRedacted(createdKey) ||
  String(createdKey) !== "<redacted>" ||
  Redacted.value(createdKey) !== "samva_sk_live_packedsecret"
) {
  await Promise.reject(new Error("Effect packed Redacted proof failed"));
}

// 3) Stream pagination: \`.items()\` traverses every page lazily from the packed
//    surface (one request per page).
const domains = await Effect.runPromise(
  Stream.runCollect(Email.listDomains.items()).pipe(Effect.provide(layer)),
);
if (domains.length !== 2 || domainRequests !== 2) {
  await Promise.reject(new Error("Effect packed pagination proof failed"));
}

const trust = await Effect.runPromise(Organizations.getTrustTier().pipe(Effect.provide(layer)));
if (
  trust.tier !== "probation" ||
  trust.changedAt !== "2026-01-01T00:00:00.000Z" ||
  trust.sendingLimits.probation?.hourlyRecipients !== 50 ||
  !trust.graduation?.blockers.includes("too_few_delivered")
) {
  await Promise.reject(new Error("Effect packed trust-tier read proof failed"));
}

const promiseTemplates = PromiseSdk.createClient({ apiKey: "samva_sk_test", fetch }).templates;
const publicationInput = { id: templateResponses.publication.templateId, publicationId: templateResponses.publication.id };
const workspaceInput = { id: publicationInput.id, expectedRevision: templateResponses.diff.revision };
const fixtureInput = { ...workspaceInput, fixture: templateResponses.fixture.fixture };
const promisePublication = await promiseTemplates.getPublication(publicationInput);
const effectPublication = await Effect.runPromise(Templates.getPublication(publicationInput).pipe(Effect.provide(layer)));
const promiseDiff = await promiseTemplates.diffWorkspace(workspaceInput);
const effectDiff = await Effect.runPromise(Templates.diffWorkspace(workspaceInput).pipe(Effect.provide(layer)));
const promiseFixture = await promiseTemplates.renderWorkspaceFixture(fixtureInput);
const effectFixture = await Effect.runPromise(Templates.renderWorkspaceFixture(fixtureInput).pipe(Effect.provide(layer)));

for (const publication of [promisePublication, effectPublication]) {
  const artifactKey: string = publication.compiled.key;
  const compiledVersion: number = publication.manifest.compiled.version;
  const footerCss: string | undefined = publication.manifest.brand?.renderedFooter.headCss;
  if (artifactKey !== templateResponses.publication.compiled.key || compiledVersion !== 1 || footerCss !== templateResponses.publication.manifest.brand.renderedFooter.headCss) {
    throw new Error("Packed template publication response proof failed");
  }
}
for (const diff of [promiseDiff, effectDiff]) {
  const digest: string | null = diff.assetChanges[0].digest;
  if (digest !== templateResponses.diff.assetChanges[0].digest || diff.assetChanges[1].digest !== null) {
    throw new Error("Packed template asset diff response proof failed");
  }
}
for (const fixture of [promiseFixture, effectFixture]) {
  const sentBytes: number | undefined = fixture.rendered?.sentBytes;
  const previewBytes: number | undefined = fixture.rendered?.previewBytes;
  if (sentBytes !== templateResponses.fixture.rendered.sentBytes || previewBytes !== templateResponses.fixture.rendered.previewBytes) {
    throw new Error("Packed template fixture response proof failed");
  }
}
`,
);
await installPacked(effectDirectory, true);
run([tsc, "--project", "tsconfig.json"], effectDirectory);
run(["bun", "consumer.ts"], effectDirectory);

run(
  [
    "bun",
    join(sdkRoot, "scripts/check-tree-shaking.ts"),
    join(effectDirectory, "node_modules/samva/dist"),
  ],
  sdkRoot,
);

await rm(temporaryRoot, { recursive: true, force: true });
process.stdout.write("Packed Promise and Effect consumers passed\n");
