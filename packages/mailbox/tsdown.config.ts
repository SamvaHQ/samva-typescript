import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/webhook.ts", "src/test.ts"],
  format: ["esm"],
  outDir: "dist",
  dts: true,
  sourcemap: true,
  clean: true,
  platform: "neutral",
});
