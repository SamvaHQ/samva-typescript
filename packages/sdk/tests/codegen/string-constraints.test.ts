import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import { generateEffectSources } from "../../codegen/driver";
import document from "./string-checks.openapi.json" with { type: "json" };

// Execute a generated fixture with ordinary ESM resolution; production output
// still goes through the native SDK generation pipeline.
const generatedFixture = async (sources: ReadonlyMap<string, string>, assertions: string) => {
  const folder = await mkdtemp(join(dirname(fileURLToPath(import.meta.url)), ".string-checks-"));
  const transpile = (input: string) => stripTypeScriptTypes(input);
  try {
    const runtime = await readFile(new URL("../../src/effect/runtime.ts", import.meta.url), "utf8");
    await writeFile(join(folder, "runtime.mjs"), transpile(runtime));
    const generatedFolder = join(folder, "generated");
    await mkdir(generatedFolder);
    await Promise.all(
      [...sources].map(([filename, source]) =>
        writeFile(
          join(generatedFolder, filename.replace(".ts", ".mjs")),
          transpile(source).replace(/from "(\.[^"]+)"/g, 'from "$1.mjs"'),
        ),
      ),
    );
    await writeFile(
      join(folder, "fixture.mjs"),
      `import * as Schema from "effect/Schema";\nimport { Values } from "./generated/index.mjs";${assertions}`,
    );
    const result = await import(/* @vite-ignore */ pathToFileURL(join(folder, "fixture.mjs")).href);
    return result.results;
  } finally {
    await rm(folder, { recursive: true, force: true });
  }
};

describe("source string checks across OpenAPI projection", () => {
  it("retains supplementary lower bounds, mixed length checks, and plain JSON semantics", async () => {
    // The source schema `string-checks.openapi.json` projects; the monorepo's consumer contract
    // tests prove the contracts' OpenAPI writer emits exactly that document for it.
    const Values = Schema.Struct({
      lower: Schema.String.check(Schema.isMinLength(2)),
      mixed: Schema.String.check(Schema.isMaxLength(3), Schema.isMaxCodePoints(1)),
      pattern: Schema.String.check(Schema.isPattern(/^..$/), Schema.isPattern(/^😀$/u)),
      points: Schema.String.check(Schema.isMinCodePoints(2), Schema.isMaxCodePoints(3)),
    });
    const sources = generateEffectSources(document).sources;
    const source = [...sources.values()].join("\n");
    expect(source).toContain("Schema.isMinLength(2)");
    expect(source).toContain("Schema.isMaxLength(3)");
    expect(source).toContain("Schema.isMaxCodePoints(1)");
    expect(source).not.toContain("__SamvaStringChecks");
    const cases = [
      { pattern: "😀", lower: "😀", mixed: "😀", points: "😀😀" },
      { pattern: "😀", lower: "a", mixed: "😀", points: "😀😀" },
      { pattern: "😀", lower: "😀", mixed: "ab", points: "😀😀" },
      { pattern: "😀", lower: "😀", mixed: "😀", points: "😀" },
      { pattern: "😀", lower: "ab", mixed: "a", points: "abcd" },
      { pattern: "aa", lower: "ab", mixed: "a", points: "ab" },
    ];
    const expected = [true, false, false, false, false, false];
    expect(cases.map(Schema.is(Values))).toEqual(expected);
    const results = await generatedFixture(
      sources,
      `\nexport const results = ${JSON.stringify(cases)}.map(Schema.is(Values));`,
    );
    expect(results).toEqual(expected);
  });
});
