import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { generateRegistry } from "./registry";
import { removeOrphanedFacades } from "./registry-files";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const generated = generateRegistry(
  JSON.parse(await readFile(resolve(root, "openapi.json"), "utf8")),
);
const effectRoot = resolve(root, "src/effect");
await removeOrphanedFacades(
  effectRoot,
  new Set(Object.keys(generated.moduleSources).map((filename) => `${filename}.ts`)),
);
const sources = new Map([
  [resolve(root, "src/service-map.ts"), generated.registrySource],
  ...Object.entries(generated.moduleSources).map(
    ([filename, source]) => [resolve(effectRoot, `${filename}.ts`), source] as const,
  ),
]);
await Promise.all([...sources].map(([path, source]) => writeFile(path, source)));
console.log(
  `Generated ${Object.keys(generated.calls).length} calls and ${Object.keys(generated.modules).length} domain modules`,
);
execFileSync("bun", ["run", "oxfmt", "--config=../../oxfmt.config.ts", ...sources.keys()], {
  cwd: root,
  stdio: "inherit",
});
