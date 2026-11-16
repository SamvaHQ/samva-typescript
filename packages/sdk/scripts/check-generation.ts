import { readdir, readFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { generateRegistry } from "../codegen/registry";
import { assertRegistrySurface } from "../codegen/registry-surface";
import { createClient } from "../src/promises/client";
import buildConfig from "../tsdown.config";

const sdkRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const generatedRoots = async () => [
  resolve(sdkRoot, "src/client"),
  resolve(sdkRoot, "src/service-map.ts"),
  ...(await readdir(resolve(sdkRoot, "src/effect")))
    .filter((name) => name.endsWith(".ts"))
    .map((name) => resolve(sdkRoot, `src/effect/${name}`)),
  resolve(sdkRoot, "src/effect/generated"),
  resolve(sdkRoot, "src/effect/descriptors"),
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
      (await generatedRoots()).map((path) =>
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

const registry = generateRegistry(
  JSON.parse(await readFile(resolve(sdkRoot, "openapi.json"), "utf8")),
);
const packageJson = JSON.parse(await readFile(resolve(sdkRoot, "package.json"), "utf8"));
const client = createClient({ apiKey: "samva_sk_generation_check" });
assertRegistrySurface({
  registry,
  packageExports: packageJson.exports,
  buildEntries: buildConfig.entry,
  effectIndex: await readFile(resolve(sdkRoot, "src/effect/index.ts"), "utf8"),
  moduleFiles: await readdir(resolve(sdkRoot, "src/effect")),
  promiseClient: client,
  rawClient: client.raw,
});
process.stdout.write(
  "SDK generation is current and deterministic; package surfaces match generated groups\n",
);
