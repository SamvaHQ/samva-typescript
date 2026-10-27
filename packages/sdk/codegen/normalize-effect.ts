import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const generatedFiles = [
  ...(await readdir(resolve(root, "src/effect/generated"))).map((filename) =>
    resolve(root, "src/effect/generated", filename),
  ),
  resolve(root, "src/effect/generated-metadata.ts"),
];

// oxfmt 0.61 can preserve renderer-emitted spaces before a newline in long
// chained expressions. Keep generated artifacts diff-clean until that upstream
// formatter behavior is fixed; deterministic generation tests own this step.
await Promise.all(
  generatedFiles.map(async (path) => {
    const source = await readFile(path, "utf8");
    await writeFile(path, source.replace(/[\t ]+(?=\r?\n|$)/g, ""));
  }),
);
