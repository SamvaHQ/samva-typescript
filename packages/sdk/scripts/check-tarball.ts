import { existsSync } from "node:fs";
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";

import { declarationSpecifiers, declarationTarget } from "./declaration-specifiers";

interface Artifact {
  readonly path: string;
  readonly source: string;
}

const sdkRoot = resolve(import.meta.dir, "..");

const run = (command: ReadonlyArray<string>, cwd: string): string => {
  const result = Bun.spawnSync({
    cmd: [...command],
    cwd,
    env: process.env,
    stdout: "pipe",
    stderr: "pipe",
  });
  const stdout = result.stdout.toString();
  const stderr = result.stderr.toString();
  if (result.exitCode !== 0) {
    throw new Error(`${command.join(" ")} failed in ${cwd}\n${stdout}${stderr}`);
  }
  return stdout;
};

const files = async (path: string): Promise<ReadonlyArray<string>> => {
  const entries = await readdir(path, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) => {
        const child = join(path, entry.name);
        return entry.isDirectory() ? files(child) : Promise.resolve([child]);
      }),
    )
  ).flat();
};

const transpiler = new Bun.Transpiler({ loader: "js" });
const importSpecifiers = (source: string): ReadonlyArray<string> =>
  transpiler.scanImports(source).map((item) => item.path);

// Triple-slash directives are not module specifiers, so the emission rewriter
// leaves them alone; the boundary gate still has to see the package they name.
const declarationReferenceSpecifiers = (source: string): ReadonlyArray<string> =>
  [...source.matchAll(/^\s*\/\/\/\s*<reference\s+(?:path|types|lib)=["']([^"']+)["']/gm)].map(
    (match) => match[1]!,
  );

const isAllowedBareImport = (specifier: string): boolean =>
  specifier === "samva" ||
  specifier.startsWith("samva/") ||
  specifier === "effect" ||
  specifier.startsWith("effect/") ||
  specifier === "@samva/webhooks" ||
  specifier.startsWith("@samva/webhooks/");

const isContained = (root: string, path: string): boolean => {
  const fromRoot = relative(root, path);
  return fromRoot === "" || (!fromRoot.startsWith("..") && !isAbsolute(fromRoot));
};

const violationsOf = (
  packageRoot: string,
  artifacts: ReadonlyArray<Artifact>,
): ReadonlyArray<string> => {
  const violations: Array<string> = [];
  for (const artifact of artifacts) {
    if (artifact.path.endsWith(".js") || artifact.path.endsWith(".d.ts")) {
      const declared = artifact.path.endsWith(".d.ts")
        ? declarationSpecifiers(artifact.source)
        : [];
      const specifiers = artifact.path.endsWith(".d.ts")
        ? [
            ...declared.map(({ specifier }) => specifier),
            ...declarationReferenceSpecifiers(artifact.source),
          ]
        : importSpecifiers(artifact.source);
      for (const specifier of specifiers) {
        if (!specifier.startsWith(".") && !isAllowedBareImport(specifier)) {
          violations.push(`${artifact.path}: bare import ${specifier}`);
        }
      }
      for (const { specifier } of declared) {
        if (specifier.startsWith(".") && !/\.(?:js|json)$/.test(specifier)) {
          violations.push(
            `${artifact.path}: declaration specifier without an extension ${specifier}`,
          );
        }
      }
      if (/@samva\/(?!webhooks(?:\/|["']))/.test(artifact.source)) {
        violations.push(`${artifact.path}: private @samva reference`);
      }
    }
    if (artifact.path.endsWith(".map")) {
      const map = JSON.parse(artifact.source) as { readonly sources?: ReadonlyArray<string> };
      for (const source of map.sources ?? []) {
        const resolvedSource = resolve(dirname(artifact.path), source);
        if (!isContained(packageRoot, resolvedSource)) {
          violations.push(`${artifact.path}: external source ${source}`);
        }
        if (
          source.includes("@samva/") ||
          source.includes("packages/contracts") ||
          source.includes("packages/core")
        ) {
          violations.push(`${artifact.path}: workspace source ${source}`);
        }
      }
    }
  }
  return violations;
};

const assertClean = (violations: ReadonlyArray<string>): void => {
  if (violations.length > 0) {
    throw new Error(`Published SDK crosses the package boundary:\n${violations.join("\n")}`);
  }
};

const assertSeededViolationRejected = (label: string, artifact: Artifact): void => {
  let rejected = false;
  try {
    assertClean(violationsOf("/package", [artifact]));
  } catch {
    rejected = true;
  }
  if (!rejected) throw new Error(`Tarball boundary gate accepted seeded ${label} violation`);
};

const assertSeededArtifactClean = (label: string, artifact: Artifact): void => {
  const violations = violationsOf("/package", [artifact]);
  if (violations.length > 0) {
    throw new Error(
      `Tarball boundary gate flagged clean seeded ${label}: ${violations.join(", ")}`,
    );
  }
};

const assertDeclarationTargetsResolve = (
  packageRoot: string,
  artifacts: ReadonlyArray<Artifact>,
): void => {
  const unresolved: Array<string> = [];
  for (const artifact of artifacts) {
    if (!artifact.path.endsWith(".d.ts")) continue;
    for (const { specifier } of declarationSpecifiers(artifact.source, artifact.path)) {
      if (!specifier.startsWith(".")) continue;
      const target = resolve(dirname(artifact.path), declarationTarget(specifier));
      if (!isContained(packageRoot, target) || !existsSync(target)) {
        unresolved.push(`${artifact.path}: ${specifier}`);
      }
    }
  }
  if (unresolved.length > 0) {
    throw new Error(`Packed declarations reference missing targets:\n${unresolved.join("\n")}`);
  }
};

// Prove every published artifact kind bites before trusting the real archive.
assertSeededViolationRejected("JavaScript", {
  path: "/package/dist/effect.js",
  source: 'import "@samva/private"',
});
assertSeededViolationRejected("declaration", {
  path: "/package/dist/effect.d.ts",
  source: 'import type { Email } from "@samva/private"',
});
assertSeededViolationRejected("extensionless declaration", {
  path: "/package/dist/effect.d.ts",
  source: 'export * from "./promises/index"',
});
assertSeededViolationRejected("extensionless import() declaration", {
  path: "/package/dist/effect.d.ts",
  source: 'export declare const send: typeof import("./promises/index")',
});
assertSeededViolationRejected("reference types directive", {
  path: "/package/dist/effect.d.ts",
  source: '/// <reference types="unallowed-package" />',
});
assertSeededViolationRejected("reference lib directive", {
  path: "/package/dist/effect.d.ts",
  source: '/// <reference lib="unallowed-lib" />',
});
assertSeededArtifactClean("relative reference path", {
  path: "/package/dist/effect.d.ts",
  source: '/// <reference path="./promises/index.d.ts" />\nexport * from "./promises/index.js";',
});
assertSeededViolationRejected("sourcemap", {
  path: "/package/dist/effect.js.map",
  source: JSON.stringify({ sources: ["../../packages/core/src/shared.ts"] }),
});

const temporaryRoot = await mkdtemp(join(tmpdir(), "samva-sdk-tarball-"));
const packDirectory = join(temporaryRoot, "pack");
const extractDirectory = join(temporaryRoot, "extract");
await mkdir(packDirectory);
await mkdir(extractDirectory);

const seededRoot = join(temporaryRoot, "seeded");
const seededDeclaration = join(seededRoot, "dist/effect.d.ts");
await mkdir(dirname(seededDeclaration), { recursive: true });
await writeFile(seededDeclaration, 'export * from "./missing.js";\n');
let seededTargetRejected = false;
try {
  assertDeclarationTargetsResolve(seededRoot, [
    { path: seededDeclaration, source: 'export * from "./missing.js";\n' },
  ]);
} catch {
  seededTargetRejected = true;
}
if (!seededTargetRejected) {
  throw new Error("Packed declaration gate accepted a seeded missing module target");
}

run(["bun", "pm", "pack", "--ignore-scripts", "--destination", packDirectory, "--quiet"], sdkRoot);
const tarball = (await readdir(packDirectory)).find((entry) => entry.endsWith(".tgz"));
if (tarball === undefined) throw new Error("bun pm pack produced no tarball");
run(["tar", "-xzf", join(packDirectory, tarball), "-C", extractDirectory], sdkRoot);

const packageRoot = join(extractDirectory, "package");
const packageJson = JSON.parse(await readFile(join(packageRoot, "package.json"), "utf8")) as {
  readonly dependencies?: Readonly<Record<string, string>>;
};
const workspaceDependencies = Object.keys(packageJson.dependencies ?? {}).filter(
  (name) => name.startsWith("@samva/") && name !== "@samva/webhooks",
);
if (workspaceDependencies.length > 0) {
  throw new Error(
    `Packed manifest contains workspace dependencies: ${workspaceDependencies.join(", ")}`,
  );
}

const artifactPaths = (await files(join(packageRoot, "dist"))).filter((path) =>
  /\.(?:js|d\.ts|map)$/.test(path),
);
const artifacts = await Promise.all(
  artifactPaths.map(async (path): Promise<Artifact> => ({
    path,
    source: await readFile(path, "utf8"),
  })),
);
assertClean(violationsOf(packageRoot, artifacts));
assertDeclarationTargetsResolve(packageRoot, artifacts);

await rm(temporaryRoot, { recursive: true, force: true });
process.stdout.write(
  `Packed SDK boundary is clean and declarations resolve (${artifacts.length} artifacts inspected)\n`,
);
