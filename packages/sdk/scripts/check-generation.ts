import { readdir, readFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const sdkRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const generatedRoots = [
  resolve(sdkRoot, "src/client"),
  resolve(sdkRoot, "src/effect/generated"),
  resolve(sdkRoot, "src/effect/generated-metadata.ts"),
  resolve(sdkRoot, "src/promises/errors.gen.ts"),
  resolve(sdkRoot, "src/promises/types.gen.ts"),
];

const generatedFiles = async (path: string): Promise<ReadonlyArray<string>> => {
  const entries = await readdir(path, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const entryPath = join(path, entry.name);
      return entry.isDirectory() ? generatedFiles(entryPath) : Promise.resolve([entryPath]);
    }),
  );
  return nested.flat().sort();
};

const snapshot = async (): Promise<ReadonlyMap<string, string>> => {
  const files = (
    await Promise.all(
      generatedRoots.map((path) =>
        path.endsWith(".ts") ? Promise.resolve([path]) : generatedFiles(path),
      ),
    )
  )
    .flat()
    .sort();
  const hashes = await Promise.all(
    files.map(async (path) => {
      const hasher = new Bun.CryptoHasher("sha256");
      hasher.update(await readFile(path));
      return [relative(sdkRoot, path), hasher.digest("hex")] as const;
    }),
  );
  return new Map(hashes);
};

const runGenerate = (): void => {
  const result = Bun.spawnSync({
    cmd: ["bun", "run", "generate"],
    cwd: sdkRoot,
    env: process.env,
    stdout: "inherit",
    stderr: "inherit",
  });
  if (result.exitCode !== 0) process.exit(result.exitCode);
};

const assertEqual = (
  expected: ReadonlyMap<string, string>,
  actual: ReadonlyMap<string, string>,
  message: string,
): void => {
  const changed = [...new Set([...expected.keys(), ...actual.keys()])].filter(
    (path) => expected.get(path) !== actual.get(path),
  );
  if (changed.length > 0) {
    process.stderr.write(`${message}:\n${changed.map((path) => `- ${path}`).join("\n")}\n`);
    process.exit(1);
  }
};

const checkedIn = await snapshot();
runGenerate();
const first = await snapshot();
assertEqual(checkedIn, first, "Generated SDK files are stale");

runGenerate();
const second = await snapshot();
assertEqual(first, second, "SDK generation is not deterministic");

process.stdout.write("SDK generation is current and deterministic\n");
