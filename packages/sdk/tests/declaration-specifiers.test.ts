import { describe, expect, it } from "@effect/vitest";

import {
  declarationSpecifiers,
  declarationTarget,
  withJavaScriptExtensions,
} from "../scripts/declaration-specifiers";

const rename = (
  source: string,
  resolve: (specifier: string) => string | undefined = (specifier) => `${specifier}.js`,
): string => withJavaScriptExtensions(source, declarationSpecifiers(source), resolve);

describe("declaration module specifiers", () => {
  it("gives relative imports, re-exports, and import() types their .js extension", () => {
    const source = [
      'import type { A } from "./a";',
      'export * from "./b";',
      'export * as ns from "./c";',
      'export type { D } from "./d";',
      'export declare const send: typeof import("./e");',
      'export declare const find: import("./f").Result;',
      'import "./side-effect";',
      "",
    ].join("\n");

    expect(rename(source)).toBe(
      [
        'import type { A } from "./a.js";',
        'export * from "./b.js";',
        'export * as ns from "./c.js";',
        'export type { D } from "./d.js";',
        'export declare const send: typeof import("./e.js");',
        'export declare const find: import("./f.js").Result;',
        'import "./side-effect.js";',
        "",
      ].join("\n"),
    );
  });

  it("leaves package specifiers, comments, and string literal types alone", () => {
    const source = [
      'export { Brand } from "effect/Brand";',
      'export type { Client } from "samva/effect";',
      'export type { Event } from "@samva/webhooks/promise";',
      '/** {@link import("./retry").Service} */',
      'export type Literal = "./not-a-module";',
      "export type From = 'from \"./also-not-a-module\"';",
      'export type Template = `prefix ${import("./template").Kind} suffix`;',
      "",
    ].join("\n");

    expect(rename(source)).toBe(
      [
        'export { Brand } from "effect/Brand";',
        'export type { Client } from "samva/effect";',
        'export type { Event } from "@samva/webhooks/promise";',
        '/** {@link import("./retry").Service} */',
        'export type Literal = "./not-a-module";',
        "export type From = 'from \"./also-not-a-module\"';",
        'export type Template = `prefix ${import("./template.js").Kind} suffix`;',
        "",
      ].join("\n"),
    );
  });

  it("names the explicit index file a directory import needs", () => {
    const source = 'export * from "./generated";\nexport * from "..";\n';
    expect(
      rename(source, (specifier) =>
        specifier === "./generated" ? "./generated/index.js" : "../index.js",
      ),
    ).toBe('export * from "./generated/index.js";\nexport * from "../index.js";\n');
  });

  it("fails when a relative specifier names no emitted declaration", () => {
    expect(() => rename('export * from "./missing";\n', () => undefined)).toThrow(
      "No emitted declaration for ./missing",
    );
  });

  it("is idempotent and resolves type-only generated modules to declarations", () => {
    const once = rename('export type * from "./types.gen";\nexport * from "./index";\n');
    expect(once).toBe('export type * from "./types.gen.js";\nexport * from "./index.js";\n');
    expect(rename(once)).toBe(once);
    expect(declarationTarget("./types.gen")).toBe("./types.gen.d.ts");
    expect(declarationTarget("./client/client.js")).toBe("./client/client.d.ts");
    expect(declarationTarget("./payload.json")).toBe("./payload.json");
  });

  it("keeps every specifier position a declaration can carry", () => {
    const specifiers = declarationSpecifiers(
      'export * from "./a";\nimport type { B } from "./b";\n/** import("./c") */\nexport type C = typeof import("./d");\n',
    );
    expect(specifiers.map(({ specifier }) => specifier)).toEqual(["./a", "./b", "./d"]);
  });
});
