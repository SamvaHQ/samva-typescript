import { readFile, readdir, unlink } from "node:fs/promises";
import { resolve } from "node:path";

import { registryHeader } from "./registry";

/** Import sorting can move the ownership marker away from the first line. */
export const removeOrphanedFacades = async (
  effectRoot: string,
  producedFiles: ReadonlySet<string>,
): Promise<void> => {
  await Promise.all(
    (await readdir(effectRoot))
      .filter((filename) => filename.endsWith(".ts") && !producedFiles.has(filename))
      .map(async (filename) => {
        const path = resolve(effectRoot, filename);
        const source = await readFile(path, "utf8");
        if (source.split(/\r?\n/).includes(registryHeader.trimEnd())) await unlink(path);
      }),
  );
};
