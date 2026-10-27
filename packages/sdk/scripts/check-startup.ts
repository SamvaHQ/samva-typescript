// Import cost of each domain entry, measured against the full `samva/effect` barrel in the same
// run. A ratio holds on a loaded machine where absolute milliseconds do not. Templates, the largest
// group, measures up to about half the barrel; an entry that loads the whole API again nears 1.
const MAX_RATIO_TO_BARREL = 0.6;
const RUNS = 5;
const ENTRIES = [
  "client",
  "errors",
  "feedback",
  "contacts",
  "email",
  "mailboxes",
  "templates",
] as const;

const dist = `${import.meta.dir}/../dist`;

const importMs = (path: string): number => {
  const script = [
    'await import("effect");',
    'await import("effect/http-api");',
    'await import("effect/http");',
    "const start = performance.now();",
    `await import(${JSON.stringify(path)});`,
    "console.log(performance.now() - start);",
  ].join(" ");
  const result = Bun.spawnSync([process.execPath, "-e", script], { cwd: `${import.meta.dir}/..` });
  if (result.exitCode !== 0) {
    throw new Error(`Importing ${path} failed:\n${result.stderr.toString()}`);
  }
  return Number(result.stdout.toString().trim());
};

const median = (path: string): number => {
  const samples = Array.from({ length: RUNS }, () => importMs(path)).sort((a, b) => a - b);
  return samples[Math.floor(RUNS / 2)]!;
};

const assertRatio = (label: string, ms: number, barrelMs: number): void => {
  const ratio = ms / barrelMs;
  if (ratio > MAX_RATIO_TO_BARREL) {
    throw new Error(
      `${label} import is ${ratio.toFixed(2)}× the barrel (limit ${MAX_RATIO_TO_BARREL})`,
    );
  }
};

const barrelMs = median(`${dist}/effect/index.js`);

let rejected = false;
try {
  assertRatio("Seeded barrel", barrelMs, barrelMs);
} catch {
  rejected = true;
}
if (!rejected) throw new Error("Startup ratio accepted the barrel itself");

process.stdout.write(`samva/effect (barrel): ${barrelMs.toFixed(1)} ms\n`);
for (const entry of ENTRIES) {
  const ms = median(`${dist}/effect/${entry}.js`);
  process.stdout.write(
    `samva/effect/${entry}: ${ms.toFixed(1)} ms (${(ms / barrelMs).toFixed(2)}× barrel)\n`,
  );
  assertRatio(`samva/effect/${entry}`, ms, barrelMs);
}
