import { mkdtemp, mkdir, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";

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

const declarationImportSpecifiers = (source: string): ReadonlyArray<string> => {
  const specifiers: string[] = [];
  for (const line of source.split(/\r?\n/)) {
    const declaration = line.match(/^\s*(?:import|export)\b.*?\bfrom\s*["']([^"']+)["']/);
    const sideEffect = line.match(/^\s*import\s*["']([^"']+)["']/);
    const reference = line.match(/^\s*\/\/\/\s*<reference\s+(?:path|types|lib)=["']([^"']+)["']/);
    const specifier = declaration?.[1] ?? sideEffect?.[1] ?? reference?.[1];
    if (specifier !== undefined) specifiers.push(specifier);
  }
  for (const match of source.matchAll(/(?<!["'\w])import\s*\(\s*["']([^"']+)["']/g)) {
    specifiers.push(match[1]!);
  }
  return specifiers;
};

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
      const specifiers = artifact.path.endsWith(".d.ts")
        ? declarationImportSpecifiers(artifact.source)
        : importSpecifiers(artifact.source);
      for (const specifier of specifiers) {
        if (!specifier.startsWith(".") && !isAllowedBareImport(specifier)) {
          violations.push(`${artifact.path}: bare import ${specifier}`);
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

// Prove every published artifact kind bites before trusting the real archive.
assertSeededViolationRejected("JavaScript", {
  path: "/package/dist/effect.js",
  source: 'import "@samva/private"',
});
assertSeededViolationRejected("declaration", {
  path: "/package/dist/effect.d.ts",
  source: 'import type { Email } from "@samva/private"',
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

await rm(temporaryRoot, { recursive: true, force: true });
process.stdout.write(`Packed SDK boundary is clean (${artifacts.length} artifacts inspected)\n`);
