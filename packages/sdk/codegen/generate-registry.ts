import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { descriptorDirectory, generateRegistry } from "./registry";
import { removeOrphanedFacades } from "./registry-files";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const generated = generateRegistry(
  JSON.parse(await readFile(resolve(root, "openapi.json"), "utf8")),
);
const effectRoot = resolve(root, "src/effect");
const descriptorRoot = resolve(effectRoot, descriptorDirectory);
await mkdir(descriptorRoot, { recursive: true });
await removeOrphanedFacades(
  effectRoot,
  new Set(Object.keys(generated.moduleSources).map((filename) => `${filename}.ts`)),
);
await removeOrphanedFacades(descriptorRoot, new Set(Object.keys(generated.descriptorSources)));
const sources = new Map([
  [resolve(root, "src/service-map.ts"), generated.registrySource],
  ...Object.entries(generated.moduleSources).map(
    ([filename, source]) => [resolve(effectRoot, `${filename}.ts`), source] as const,
  ),
  ...Object.entries(generated.descriptorSources).map(
    ([filename, source]) => [resolve(descriptorRoot, filename), source] as const,
  ),
]);
await Promise.all([...sources].map(([path, source]) => writeFile(path, source)));
console.log(
  `Generated ${Object.keys(generated.calls).length} calls, ${Object.keys(generated.modules).length} domain modules, and ${Object.keys(generated.descriptorSources).length} descriptor tables`,
);
execFileSync("bun", ["run", "oxfmt", "--config=../../oxfmt.config.ts", ...sources.keys()], {
  cwd: root,
  stdio: "inherit",
});
