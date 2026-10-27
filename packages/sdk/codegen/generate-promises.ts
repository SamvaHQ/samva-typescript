import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { generatePromiseClientSources } from "./promise-client";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const inputPath = resolve(root, "openapi.json");
const outputDirectory = resolve(root, "src/client");

const sources = generatePromiseClientSources(JSON.parse(await readFile(inputPath, "utf8")));
const outputs = [
  [resolve(outputDirectory, "types.gen.ts"), sources.types],
  [resolve(outputDirectory, "sdk.gen.ts"), sources.sdk],
  [resolve(outputDirectory, "client.gen.ts"), sources.client],
] as const;
await Promise.all(outputs.map(([path, source]) => writeFile(path, source)));
for (const [path] of outputs) process.stdout.write(`Generated ${path}\n`);
