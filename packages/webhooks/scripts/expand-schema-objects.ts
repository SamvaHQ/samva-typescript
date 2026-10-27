import { parseSync, Visitor } from "oxc-parser";

export const expandSchemaObjects = (source: string): string => {
  const parsed = parseSync("schemas.gen.ts", source);
  if (parsed.errors.length) {
    throw new Error(`Invalid generated webhook schemas: ${parsed.errors[0]!.message}`);
  }

  // Multiline objects keep the formatter from repeatedly fitting deeply nested schema calls.
  const positions: number[] = [];
  new Visitor({
    ObjectExpression(node) {
      if (!node.properties.length) return;
      if (source[node.start + 1] !== "\n") positions.push(node.start + 1);
      if (source[node.end - 2] !== "\n") positions.push(node.end - 1);
    },
  }).visit(parsed.program);
  positions.sort((a, b) => a - b);

  let previous = 0;
  const pieces: string[] = [];
  for (const position of positions) {
    pieces.push(source.slice(previous, position), "\n");
    previous = position;
  }
  pieces.push(source.slice(previous));
  return pieces.join("");
};
