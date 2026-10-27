import { mkdir, readFile, readdir, unlink, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  generateEffectMetadataSource,
  generateEffectSources,
  type SamvaOpenApiDocument,
} from "./driver";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const inputPath = resolve(root, "openapi.json");
const outputPath = resolve(root, "src/effect/generated");
const metadataOutputPath = resolve(root, "src/effect/generated-metadata.ts");

const document = JSON.parse(await readFile(inputPath, "utf8")) as SamvaOpenApiDocument;
const generated = generateEffectSources(document);
await mkdir(outputPath, { recursive: true });
await Promise.all(
  (await readdir(outputPath))
    .filter((filename) => !generated.sources.has(filename))
    .map((filename) => unlink(resolve(outputPath, filename))),
);
await Promise.all(
  [...generated.sources].map(([filename, source]) =>
    writeFile(resolve(outputPath, filename), source),
  ),
);
process.stdout.write(
  `Schema declarations: ${JSON.stringify(Object.fromEntries(generated.schemaCounts))}\n`,
);
await writeFile(metadataOutputPath, generateEffectMetadataSource(document));
process.stdout.write(`Generated ${outputPath}\n`);
process.stdout.write(`Generated ${metadataOutputPath}\n`);
