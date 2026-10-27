import { mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../../..");
const temporary = await mkdtemp(resolve(tmpdir(), "samva-webhook-bundle-"));
try {
  await symlink(resolve(root, "node_modules"), resolve(temporary, "node_modules"));
  for (const [runtime, ceiling] of [
    ["promise", 70_000],
    ["effect", 110_000],
  ] as const) {
    const entrypoint = resolve(temporary, `${runtime}.ts`);
    const source = `import { verifyRequest } from ${JSON.stringify(resolve(root, `packages/webhooks/dist/${runtime}.js`))};\n`;
    await writeFile(
      entrypoint,
      source +
        (runtime === "promise"
          ? "export const receive = (request: Request, secret: string) => verifyRequest(request, secret);"
          : 'import { Effect } from "effect"; export const receive = (request: Request, secret: string) => Effect.runPromise(verifyRequest(request, secret));'),
    );
    const result = await Bun.build({
      entrypoints: [entrypoint],
      target: "browser",
      format: "esm",
      minify: true,
    });
    if (!result.success || result.outputs.length !== 1)
      throw new Error(`Cannot bundle ${runtime} consumer: ${result.logs.join("\n")}`);
    const output = await result.outputs[0]!.text();
    const bytes = new TextEncoder().encode(output).length;
    console.log(
      `${runtime}: ${bytes} bytes minified, ${Bun.gzipSync(output).length} bytes gzip (ceiling ${ceiling})`,
    );
    if (bytes > ceiling) throw new Error(`${runtime} webhook consumer exceeds its bundle ceiling`);
  }
} finally {
  await rm(temporary, { recursive: true, force: true });
}
