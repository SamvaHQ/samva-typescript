import { readdirSync, readFileSync } from "node:fs";

const dist = process.argv[2] ?? `${import.meta.dir}/../dist`;

const MAX_HELPER_BYTES = 4_000;
// Email.send uses Messages and Media; email administration is a separate capability.
const MAX_EMAIL_BYTES = 65_000;
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
// Groups whose operations another domain entry exposes; they have no entry of their own.
const HOSTED_GROUPS = new Set(
  Object.values(EXTRA_GROUPS)
    .flat()
    .filter((group) => !SEND_GROUPS.includes(group)),
);

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
    throw new Error(`${label} bundles groups [${actual}]; expected [${expected}]`);
  }
};

assertGroups("Email.send", email.code, SEND_GROUPS);
const contactsPath = `${dist}/effect/contacts.js`;
const findOrCreate = await bundle(`export { findOrCreate } from ${JSON.stringify(contactsPath)}`);
assertGroups("Contacts.findOrCreate", findOrCreate.code, ["contacts"]);
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

const sizes: Array<readonly [string, number]> = [];
for (const domain of groupPaths.keys()) {
  if (HOSTED_GROUPS.has(domain)) continue;
  const domainBundle = await bundle(
    `export * from ${JSON.stringify(`${dist}/effect/${domain}.js`)}`,
  );
  const expected = [...new Set([domain, ...(EXTRA_GROUPS[domain] ?? [])])].sort();
  const actual = bundledGroups(domainBundle.code);
  if (actual.join() !== expected.join()) {
    throw new Error(`samva/effect/${domain} bundles groups [${actual}]; expected [${expected}]`);
  }
  sizes.push([domain, domainBundle.bytes]);
}

assertSeededBreach("Feedback domain", MAX_FEEDBACK_BYTES);
const feedbackBytes = sizes.find(([domain]) => domain === "feedback")![1];
assertWithinCeiling("Feedback domain", feedbackBytes, MAX_FEEDBACK_BYTES);

process.stdout.write(`Tree-shaken category helper: ${helper.bytes} bytes\n`);
process.stdout.write(`Tree-shaken Email domain: ${email.bytes} bytes\n`);
for (const [domain, bytes] of sizes) {
  process.stdout.write(`samva/effect/${domain} (whole entry): ${bytes} bytes\n`);
}
