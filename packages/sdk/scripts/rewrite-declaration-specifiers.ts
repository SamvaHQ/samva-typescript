import { existsSync } from "node:fs";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";

import {
  declarationSpecifiers,
  declarationTarget,
  withJavaScriptExtensions,
} from "./declaration-specifiers";

/**
 * `tsc --emitDeclarationOnly` copies relative specifiers from `src`, which carries
 * no file extensions, so `node16`/`nodenext` consumers cannot resolve them. This
 * names the file the bundled JavaScript already imports, including the explicit
 * `index.js` a directory import needs, and refuses to emit a specifier that names
 * no declaration, so the build fails where the tree would otherwise dangle.
 */
const sdkRoot = resolve(import.meta.dir, "..");
const dist = join(sdkRoot, "dist");

const declarations = async (path: string): Promise<ReadonlyArray<string>> => {
  const entries = await readdir(path, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) => {
        const child = join(path, entry.name);
        return entry.isDirectory()
          ? declarations(child)
          : Promise.resolve(entry.name.endsWith(".d.ts") ? [child] : []);
      }),
    )
  ).flat();
};

if (!existsSync(dist)) {
  throw new Error(`No declaration output at ${dist}; run tsc --project tsconfig.build.json`);
}

const emittedSpecifier = (path: string, specifier: string): string | undefined => {
  const base = resolve(dirname(path), specifier);
  if (existsSync(`${base}.d.ts`)) return `${specifier}.js`;
  if (existsSync(join(base, "index.d.ts"))) return `${specifier}/index.js`;
  return undefined;
};

const unresolved: Array<string> = [];
const rewrites: Array<{ readonly path: string; readonly source: string }> = [];
let specifierCount = 0;

for (const path of await declarations(dist)) {
  const source = await readFile(path, "utf8");
  const specifiers = declarationSpecifiers(source, path);
  specifierCount += specifiers.length;

  for (const { specifier } of specifiers) {
    if (!specifier.startsWith(".")) continue;
    const resolved = /\.(?:js|json)$/.test(specifier)
      ? existsSync(resolve(dirname(path), declarationTarget(specifier)))
      : emittedSpecifier(path, specifier) !== undefined;
    if (!resolved) unresolved.push(`${relative(dist, path)}: ${specifier}`);
  }

  const rewritten = withJavaScriptExtensions(source, specifiers, (specifier) =>
    emittedSpecifier(path, specifier),
  );
  if (rewritten !== source) rewrites.push({ path, source: rewritten });
}

if (unresolved.length > 0) {
  throw new Error(`Declaration specifiers name no emitted declaration:\n${unresolved.join("\n")}`);
}

await Promise.all(rewrites.map(({ path, source }) => writeFile(path, source)));
process.stdout.write(
  `Declarations: ${specifierCount} module specifiers, ${rewrites.length} files carry .js\n`,
);
