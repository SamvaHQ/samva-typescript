import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    promise: "src/promise.ts",
    effect: "src/effect.ts",
    protocol: "src/protocol.ts",
    "schemas.gen": "src/schemas.gen.ts",
  },
  format: ["esm"],
  outDir: "dist",
  dts: false,
  sourcemap: true,
  clean: true,
  platform: "neutral",
  deps: {
    neverBundle: ["effect"],
  },
  outExtensions: () => ({ js: ".js" }),
});
