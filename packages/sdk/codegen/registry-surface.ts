import { Predicate } from "effect";

import { expectArray, expectRecord } from "./promise-schema";
import type { generateRegistry } from "./registry";

// These modules support the client rather than expose an OpenAPI group.
const publicSupportModules = new Set(["categories", "client", "errors", "retry"]);
const sourceSupportModules = new Set([
  ...publicSupportModules,
  "generated-metadata",
  "index",
  "pagination",
  "runtime",
]);

const equalInventory = (
  label: string,
  actual: ReadonlyArray<string>,
  expected: ReadonlyArray<string>,
) => {
  if (JSON.stringify([...actual].sort()) !== JSON.stringify([...expected].sort())) {
    throw new Error(
      `${label} differs from generated groups: expected ${expected.join(", ")}; got ${actual.join(", ")}`,
    );
  }
};

const promiseServicePaths = (client: unknown, prefix = ""): string[] =>
  Object.entries(expectRecord(client, "Promise client")).flatMap(([name, value]) => {
    if (prefix === "" && (name === "raw" || name === "client")) return [];
    if (!Predicate.isObject(value)) return [];
    const path = prefix ? `${prefix}.${name}` : name;
    return [path, ...promiseServicePaths(value, path)];
  });

export const assertRegistrySurface = (input: {
  readonly registry: ReturnType<typeof generateRegistry>;
  readonly packageExports: unknown;
  readonly buildEntries: unknown;
  readonly effectIndex: string;
  readonly moduleFiles: ReadonlyArray<string>;
  readonly promiseClient: unknown;
  readonly rawClient: unknown;
}): void => {
  const expected = Object.keys(input.registry.modules);
  const exports = expectRecord(input.packageExports, "package exports");
  const exportedGroups = Object.keys(exports)
    .filter((key) => key.startsWith("./effect/") && !publicSupportModules.has(key.slice(9)))
    .map((key) => key.slice(9));
  equalInventory("package.json exports", exportedGroups, expected);
  for (const filename of expected) {
    const entry = expectRecord(exports[`./effect/${filename}`], filename);
    if (
      entry.import !== `./dist/effect/${filename}.js` ||
      entry.types !== `./dist/effect/${filename}.d.ts`
    )
      throw new Error(`Incorrect package export targets: ${filename}`);
  }
  equalInventory(
    "tsdown entries",
    expectArray(input.buildEntries, "tsdown entries")
      .map((entry) => {
        if (typeof entry !== "string") throw new Error("tsdown entries must be source paths");
        return entry;
      })
      .filter((path) => path.startsWith("src/effect/") && path.endsWith(".ts"))
      .map((path) => path.slice(11, -3))
      .filter((name) => name !== "index" && !publicSupportModules.has(name)),
    expected,
  );
  equalInventory(
    "Effect index",
    [...input.effectIndex.matchAll(/export \* as \w+ from "\.\/([\w-]+)"/g)]
      .map((match) => match[1]!)
      .filter((name) => !publicSupportModules.has(name)),
    expected,
  );
  equalInventory(
    "Effect module files",
    input.moduleFiles
      .filter((name) => name.endsWith(".ts"))
      .map((name) => name.slice(0, -3))
      .filter((name) => !sourceSupportModules.has(name)),
    expected,
  );
  const promisePaths = Object.values(input.registry.modules).map((module) => module.promisePath);
  equalInventory("Promise client", promiseServicePaths(input.promiseClient), promisePaths);
  equalInventory("raw Promise client", promiseServicePaths(input.rawClient), promisePaths);
};
