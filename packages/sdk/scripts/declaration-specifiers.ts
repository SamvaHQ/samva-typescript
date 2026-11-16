import { parseSync, Visitor } from "oxc-parser";

/**
 * A module specifier in an emitted declaration file. `start` and `end` span the
 * quoted literal, so `start + 1` and `end - 1` bound the specifier text.
 */
export interface DeclarationSpecifier {
  readonly specifier: string;
  readonly start: number;
  readonly end: number;
}

/**
 * Module specifiers in TypeScript declaration syntax: import declarations,
 * re-exports, and `import("...")` type expressions. Comments and string literal
 * types are syntax, not imports, so they are excluded.
 */
export const declarationSpecifiers = (
  source: string,
  file = "declaration.d.ts",
): ReadonlyArray<DeclarationSpecifier> => {
  const { program, errors } = parseSync(file, source);
  if (errors.length > 0) {
    throw new Error(`Cannot parse ${file}: ${errors[0]?.message ?? "unknown error"}`);
  }

  const specifiers: Array<DeclarationSpecifier> = [];
  const collect = (literal: {
    readonly value: string;
    readonly start: number;
    readonly end: number;
  }) => {
    specifiers.push({ specifier: literal.value, start: literal.start, end: literal.end });
  };
  new Visitor({
    ImportDeclaration: (node) => collect(node.source),
    ExportAllDeclaration: (node) => collect(node.source),
    ExportNamedDeclaration: (node) => {
      if (node.source !== null) collect(node.source);
    },
    TSImportType: (node) => collect(node.source),
  }).visit(program);

  return specifiers;
};

/**
 * The declaration file a relative specifier must resolve to. TypeScript maps a
 * `.js` specifier onto the sibling `.d.ts`, so a type-only module needs no
 * JavaScript sibling. JSON keeps its own extension.
 */
export const declarationTarget = (specifier: string): string => {
  if (specifier.endsWith(".json")) return specifier;
  if (specifier.endsWith(".js")) return `${specifier.slice(0, -".js".length)}.d.ts`;
  return `${specifier}.d.ts`;
};

/**
 * Rewrites every relative specifier to the explicit file its JavaScript output
 * already names. `resolve` returns the emitted specifier, or `undefined` when the
 * declaration tree has no target, which fails the build instead of publishing a
 * dangling import. Bare package specifiers are not ours to rewrite.
 */
export const withJavaScriptExtensions = (
  source: string,
  specifiers: ReadonlyArray<DeclarationSpecifier>,
  resolve: (specifier: string) => string | undefined,
): string => {
  const edits: Array<{ readonly from: number; readonly to: number; readonly text: string }> = [];
  for (const { specifier, start, end } of specifiers) {
    if (!specifier.startsWith(".") || /\.(?:js|json)$/.test(specifier)) continue;
    const rewritten = resolve(specifier);
    if (rewritten === undefined) {
      throw new Error(`No emitted declaration for ${specifier}`);
    }
    edits.push({ from: start + 1, to: end - 1, text: rewritten });
  }

  let rewritten = source;
  for (const { from, to, text } of edits.sort((left, right) => right.from - left.from)) {
    rewritten = `${rewritten.slice(0, from)}${text}${rewritten.slice(to)}`;
  }
  return rewritten;
};
