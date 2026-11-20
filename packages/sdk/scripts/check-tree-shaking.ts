import { readdirSync, readFileSync } from "node:fs";

import { SamvaOperations } from "../src/effect/generated-metadata";
import { SDK_EFFECT_MODULES } from "../src/service-map";

const dist = process.argv[2] ?? `${import.meta.dir}/../dist`;

const MAX_HELPER_BYTES = 4_000;
// Email.send retains Messages and Media, including their complete channel schemas.
const MAX_EMAIL_BYTES = 105_000;
// The smallest domain is nearly all shared core, so this ceiling is the shared core's budget.
const MAX_FEEDBACK_BYTES = 60_000;
const MAX_NAMED_ERROR_BYTES = 25_000;
const MAX_ERRORS_BYTES = 30_000;
// A send uploads oversized attachments as media, so these entries also carry those groups.
const SEND_GROUPS = ["messages", "media"];
const EXTRA_GROUPS: Readonly<Record<string, ReadonlyArray<string>>> = {
  contacts: ["contact-events"],
  email: SEND_GROUPS,
  messages: SEND_GROUPS,
};

const assertWithinCeiling = (label: string, bytes: number, ceiling: number): void => {
  if (bytes > ceiling) throw new Error(`${label} bundle is ${bytes} bytes (limit ${ceiling})`);
};

const assertSeededBreach = (label: string, ceiling: number): void => {
  let rejected = false;
  try {
    assertWithinCeiling(label, ceiling + 1, ceiling);
  } catch {
    rejected = true;
  }
  if (!rejected) throw new Error(`${label} ceiling accepted a seeded breach`);
};

const bundle = async (contents: string): Promise<{ bytes: number; code: string }> => {
  const result = await Bun.build({
    entrypoints: ["virtual:consumer"],
    target: "browser",
    minify: true,
    external: ["effect", "effect/*"],
    plugins: [
      {
        name: "virtual-consumer",
        setup(build) {
          build.onResolve({ filter: /^virtual:consumer$/ }, () => ({
            path: "consumer",
            namespace: "virtual",
          }));
          build.onLoad({ filter: /.*/, namespace: "virtual" }, () => ({
            contents,
            loader: "js",
          }));
        },
      },
    ],
  });
  if (!result.success) throw new AggregateError(result.logs, "Tree-shaking build failed");
  return {
    bytes: result.outputs.reduce((total, output) => total + output.size, 0),
    code: (await Promise.all(result.outputs.map((output) => output.text()))).join("\n"),
  };
};

assertSeededBreach("Category helper", MAX_HELPER_BYTES);
const helper = await bundle(
  `export { isRetryable } from ${JSON.stringify(`${dist}/effect/categories.js`)}`,
);
assertWithinCeiling("Category helper", helper.bytes, MAX_HELPER_BYTES);

assertSeededBreach("Email domain", MAX_EMAIL_BYTES);
const emailPath = `${dist}/effect/email.js`;
const campaignsPath = `${dist}/effect/campaigns.js`;
const mailboxesPath = `${dist}/effect/mailboxes.js`;
const email = await bundle(`export { send } from ${JSON.stringify(emailPath)}`);
assertWithinCeiling("Email domain", email.bytes, MAX_EMAIL_BYTES);

// Operation names also occur in the shared API and metadata. A unary factory
// call distinguishes the wrapper initializer from those required declarations.
// Check both outputs so a changed build shape fails loudly instead of passing
// because the extra export alone adds bytes.
for (const [domain, path, operation, operationId] of [
  ["Campaigns", campaignsPath, "scheduleRun", "campaignsScheduleRun"],
  ["Mailboxes", mailboxesPath, "list", "mailboxesList"],
] as const) {
  const seeded = await bundle(
    `export { ${operation} as unrelated } from ${JSON.stringify(path)}; export { send } from ${JSON.stringify(emailPath)}`,
  );
  const wrapperCall = new RegExp(`[$\\w]+\\(["']${operationId}["']\\)`);
  if (wrapperCall.test(email.code)) {
    throw new Error(`Email domain retains the ${domain} wrapper (${operationId})`);
  }
  if (!wrapperCall.test(seeded.code)) {
    throw new Error(`Seeded ${domain} bundle does not expose its wrapper (${operationId})`);
  }
  process.stdout.write(`Email with seeded ${domain} wrapper: ${seeded.bytes} bytes\n`);
}

// Each domain entry loads its own group and no other. A group's endpoint paths occur only in its
// generated module, so a path string in a bundle proves that group was bundled.
const generatedDir = `${import.meta.dir}/../src/effect/generated`;
const groupPaths = new Map<string, ReadonlyArray<string>>();
for (const file of readdirSync(generatedDir)) {
  if (file === "index.ts" || file === "shared.ts") continue;
  const source = readFileSync(`${generatedDir}/${file}`, "utf8");
  const paths = [...source.matchAll(/HttpApiEndpoint\.\w+\(\s*"\w+",\s*"([^"]+)"/g)].map(
    (match) => match[1]!,
  );
  if (paths.length === 0) throw new Error(`No endpoint paths found in generated/${file}`);
  groupPaths.set(file.replace(/\.ts$/, ""), paths);
}

const bundledGroups = (code: string): ReadonlyArray<string> =>
  [...groupPaths]
    .filter(([, paths]) => paths.some((path) => code.includes(JSON.stringify(path))))
    .map(([group]) => group)
    .sort();

const assertGroups = (label: string, code: string, expected: ReadonlyArray<string>): void => {
  const actual = bundledGroups(code);
  if (actual.join() !== [...expected].sort().join()) {
    throw new Error(
      `${label} bundles groups [${actual.join(", ")}]; expected [${expected.join(", ")}]`,
    );
  }
};

// Operation metadata is per domain. A focused entry carries its own operations' descriptors, so an
// operation id from a group the bundle does not contain means a shared table retained it. A bundled
// group's own module repeats its ids as endpoint names, which is why the check allows those.
const groupTags = new Map<string, string>();
for (const file of readdirSync(generatedDir)) {
  if (file === "index.ts" || file === "shared.ts") continue;
  const tag = /HttpApiGroup\.make\(\s*"([^"]+)"/.exec(
    readFileSync(`${generatedDir}/${file}`, "utf8"),
  )?.[1];
  if (tag === undefined) throw new Error(`No group tag found in generated/${file}`);
  groupTags.set(file.replace(/\.ts$/, ""), tag);
}

const operationGroups = new Map(
  Object.entries(SamvaOperations).map(([id, metadata]) => [id, metadata.group] as const),
);

const foreignOperationIds = (
  code: string,
  groups: ReadonlyArray<string>,
): ReadonlyArray<string> => {
  const tags = new Set(groups.map((group) => groupTags.get(group)));
  // Minification removes quotes from identifier-shaped object keys. Match whole tokens so a
  // global metadata table is detected even when no operation wrapper keeps a quoted name.
  const identifiers = new Set(code.match(/[A-Za-z_$][\w$]*/g) ?? []);
  return [...operationGroups]
    .filter(([id, tag]) => !tags.has(tag) && identifiers.has(id))
    .map(([id]) => id);
};

const assertNoForeignMetadata = (
  label: string,
  code: string,
  groups: ReadonlyArray<string>,
): void => {
  const foreign = foreignOperationIds(code, groups);
  if (foreign.length > 0) {
    throw new Error(`${label} retains metadata for [${foreign.join(", ")}]`);
  }
};

assertGroups("Email.send", email.code, SEND_GROUPS);
assertNoForeignMetadata("Email.send", email.code, SEND_GROUPS);
const contactsPath = `${dist}/effect/contacts.js`;
const findOrCreate = await bundle(`export { findOrCreate } from ${JSON.stringify(contactsPath)}`);
assertGroups("Contacts.findOrCreate", findOrCreate.code, ["contacts"]);
// Contacts exposes contact events in the same facade, so its descriptor table owns both groups.
assertNoForeignMetadata("Contacts.findOrCreate", findOrCreate.code, ["contacts", "contact-events"]);
const seededContactEvents = await bundle(
  `export { findOrCreate, listEvents } from ${JSON.stringify(contactsPath)}`,
);
if (!bundledGroups(seededContactEvents.code).includes("contact-events")) {
  throw new Error("Group detection missed a seeded Contact events import");
}

const errorsPath = `${dist}/effect/errors.js`;
const namedError = await bundle(`export { InternalError } from ${JSON.stringify(errorsPath)}`);
const errors = await bundle(`export * from ${JSON.stringify(errorsPath)}`);
for (const [label, result, ceiling] of [
  ["Errors.InternalError", namedError, MAX_NAMED_ERROR_BYTES],
  ["Errors", errors, MAX_ERRORS_BYTES],
] as const) {
  assertSeededBreach(label, ceiling);
  assertWithinCeiling(label, result.bytes, ceiling);
  assertGroups(label, result.code, []);
  assertNoForeignMetadata(label, result.code, []);
  process.stdout.write(`${label}: ${result.bytes} bytes\n`);
}

const seededLeak = await bundle(
  `export * from ${JSON.stringify(`${dist}/effect/feedback.js`)}; export * as M from ${JSON.stringify(mailboxesPath)}`,
);
if (!bundledGroups(seededLeak.code).includes("mailboxes")) {
  throw new Error("Group detection missed a seeded Mailboxes import");
}
let rejectedLeak = false;
try {
  assertGroups("Seeded error-entry leak", seededLeak.code, []);
} catch {
  rejectedLeak = true;
}
if (!rejectedLeak) throw new Error("Error-entry isolation accepted a seeded group leak");

const seededMetadataLeak = await bundle(
  `export * from ${JSON.stringify(`${dist}/effect/feedback.js`)}; export * as M from ${JSON.stringify(mailboxesPath)}`,
);
if (foreignOperationIds(seededMetadataLeak.code, ["feedback"]).length === 0) {
  throw new Error("Metadata isolation missed a seeded Mailboxes import");
}

const seededGlobalMetadata = await bundle(
  `export * from ${JSON.stringify(`${dist}/effect/feedback.js`)}; export { SamvaOperations as metadata } from ${JSON.stringify(`${dist}/effect/generated-metadata.js`)}`,
);
if (foreignOperationIds(seededGlobalMetadata.code, ["feedback"]).length === 0) {
  throw new Error("Metadata isolation missed a seeded global operation table");
}

const sizes: Array<readonly [string, number]> = [];
const domainBundles = new Map<string, string>();
for (const domain of Object.keys(SDK_EFFECT_MODULES)) {
  const source = readFileSync(`${import.meta.dir}/../src/effect/${domain}.ts`, "utf8");
  const groups = [...source.matchAll(/import \{ \w+Group \} from "\.\/generated\/([^"]+)"/g)].map(
    (match) => match[1]!,
  );
  if (groups.length === 0 || groups.some((group) => !groupPaths.has(group)))
    throw new Error(`Missing generated group for ${domain}`);
  const domainBundle = await bundle(
    `export * from ${JSON.stringify(`${dist}/effect/${domain}.js`)}`,
  );
  const expected = [...new Set([...groups, ...(EXTRA_GROUPS[domain] ?? [])])].sort();
  const actual = bundledGroups(domainBundle.code);
  if (actual.join() !== expected.join()) {
    throw new Error(
      `samva/effect/${domain} bundles groups [${actual.join(", ")}]; expected [${expected.join(", ")}]`,
    );
  }
  assertNoForeignMetadata(`samva/effect/${domain}`, domainBundle.code, expected);
  domainBundles.set(domain, domainBundle.code);
  sizes.push([domain, domainBundle.bytes]);
}

assertSeededBreach("Feedback domain", MAX_FEEDBACK_BYTES);
const feedbackBytes = sizes.find(([domain]) => domain === "feedback")![1];
assertWithinCeiling("Feedback domain", feedbackBytes, MAX_FEEDBACK_BYTES);

// The budget alone cannot tell a real split from a partial one: a bundle that keeps the whole
// metadata table still fits once one lookup moves. Name a foreign operation explicitly.
for (const domain of ["feedback", "contacts"] as const) {
  const identifiers = new Set(domainBundles.get(domain)!.match(/[A-Za-z_$][\w$]*/g) ?? []);
  for (const foreign of ["mailboxesList", "campaignsScheduleRun"]) {
    if (identifiers.has(foreign)) {
      throw new Error(`samva/effect/${domain} retains the foreign operation ${foreign}`);
    }
  }
}

process.stdout.write(`Tree-shaken category helper: ${helper.bytes} bytes\n`);
process.stdout.write(`Tree-shaken Email domain: ${email.bytes} bytes\n`);
for (const [domain, bytes] of sizes) {
  process.stdout.write(`samva/effect/${domain} (whole entry): ${bytes} bytes\n`);
}
