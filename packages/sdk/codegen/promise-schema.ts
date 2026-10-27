/**
 * OpenAPI 3.1 schema → TypeScript type expressions for the Promise client.
 *
 * Schemas are first normalized into a small intermediate representation whose shape follows the
 * rules the published Promise client's types were built with (nested `anyOf` stays nested, a
 * `prefixItems` array with a trailing `items` becomes a tuple with a rest element, object index signatures
 * union every property type), then walked into a type AST. Keeping those rules is what keeps
 * the exported types stable for consumers; any schema keyword outside the supported subset
 * fails generation instead of degrading to a looser type.
 */

import { Predicate } from "effect";

import { toCase } from "./promise-naming";

// ---------------------------------------------------------------------------------------------
// Input narrowing

export type JsonRecord = { readonly [key: string]: unknown };

export const isRecord = (value: unknown): value is JsonRecord =>
  Predicate.isObject(value) && !Array.isArray(value);

export const expectRecord = (value: unknown, context: string): JsonRecord => {
  if (!isRecord(value)) throw new Error(`${context} must be an object`);
  return value;
};

export const optionalString = (record: JsonRecord, key: string, context: string) => {
  const value = record[key];
  if (value === undefined) return undefined;
  if (typeof value !== "string") throw new Error(`${context}.${key} must be a string`);
  return value;
};

const optionalNumber = (record: JsonRecord, key: string, context: string) => {
  const value = record[key];
  if (value === undefined) return undefined;
  if (typeof value !== "number") throw new Error(`${context}.${key} must be a number`);
  return value;
};

const optionalBoolean = (record: JsonRecord, key: string, context: string) => {
  const value = record[key];
  if (value === undefined) return undefined;
  if (typeof value !== "boolean") throw new Error(`${context}.${key} must be a boolean`);
  return value;
};

export const expectArray = (value: unknown, context: string): ReadonlyArray<unknown> => {
  if (!Array.isArray(value)) throw new Error(`${context} must be an array`);
  return value;
};

const stringArray = (value: unknown, context: string): Array<string> =>
  expectArray(value, context).map((item, index) => {
    if (typeof item !== "string") throw new Error(`${context}[${index}] must be a string`);
    return item;
  });

// ---------------------------------------------------------------------------------------------
// Intermediate representation

type IrType =
  | "array"
  | "boolean"
  | "enum"
  | "integer"
  | "never"
  | "null"
  | "number"
  | "object"
  | "string"
  | "tuple"
  | "undefined"
  | "unknown";

type Literal = string | number | boolean;

export interface Ir {
  $ref?: string;
  type?: IrType;
  const?: Literal;
  items?: Array<Ir>;
  /** A tuple's trailing `items`: any number of further elements of this type. */
  rest?: Ir;
  logicalOperator?: "or";
  properties?: Record<string, Ir>;
  required?: Array<string>;
  additionalProperties?: Ir;
  title?: string;
  description?: string;
  deprecated?: boolean;
  format?: string;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  minItems?: number;
  maxItems?: number;
  pattern?: string;
}

const componentSchemaPrefix = "#/components/schemas/";

export const refToName = (ref: string): string => {
  const name = ref.slice(componentSchemaPrefix.length);
  if (!ref.startsWith(componentSchemaPrefix) || name.length === 0 || name.includes("/")) {
    throw new Error(`Only top-level component schema references are supported: ${ref}`);
  }
  return name;
};

/** Type alias name of a component schema. */
export const componentTypeName = (name: string): string => toCase(`-${name}-`, "PascalCase");

// Keywords that only constrain values (no effect on the emitted type) or annotate schemas.
const annotationKeywords = new Set([
  "description",
  "title",
  "deprecated",
  "default",
  "examples",
  "example",
  "format",
  "minLength",
  "maxLength",
  "minimum",
  "maximum",
  "exclusiveMinimum",
  "exclusiveMaximum",
  "minItems",
  "maxItems",
  // Bound a record's entry count; the emitted record type is unchanged.
  "minProperties",
  "maxProperties",
  "pattern",
  "contentMediaType",
  // Constrains a record's keys; the keys stay strings in the emitted type.
  "propertyNames",
]);

const structuralKeywords = new Set([
  "$ref",
  "type",
  "enum",
  "const",
  "anyOf",
  "not",
  "properties",
  "required",
  "additionalProperties",
  "items",
  "prefixItems",
]);

const assertSupportedKeywords = (schema: JsonRecord, context: string): void => {
  for (const key of Object.keys(schema)) {
    if (key.startsWith("x-") || annotationKeywords.has(key) || structuralKeywords.has(key)) {
      continue;
    }
    throw new Error(`Unsupported schema keyword "${key}" at ${context}`);
  }
};

const fileLikeMediaType =
  /^(application\/(pdf|rtf|msword|vnd\.(ms-|openxmlformats-officedocument\.)|zip|x-(7z|tar|rar|zip|iso)|octet-stream|gzip|x-msdownload|json\+download|xml|x-yaml|x-7z-compressed|x-tar)|text\/(yaml|css|javascript)|audio\/(mpeg|wav)|video\/(mp4|x-matroska)|image\/(vnd\.adobe\.photoshop|svg\+xml))(; ?charset=[^;]+)?$/i;

const literalOf = (value: unknown, context: string): Literal => {
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  throw new Error(`Unsupported literal ${JSON.stringify(value)} at ${context}`);
};

// Annotations every IR node inherits from its source schema.
const initIr = (schema: JsonRecord, context: string): Ir => {
  const ir: Ir = {};
  const deprecated = optionalBoolean(schema, "deprecated", context);
  if (deprecated !== undefined) ir.deprecated = deprecated;
  const description = optionalString(schema, "description", context);
  if (description) ir.description = description;
  const title = optionalString(schema, "title", context);
  if (title) ir.title = title;
  if (schema["const"] !== undefined) {
    ir.const = literalOf(schema["const"], `${context}.const`);
    if (schema["type"] === undefined) ir.type = constType(ir.const);
  }
  const format = optionalString(schema, "format", context);
  const contentMediaType = optionalString(schema, "contentMediaType", context);
  if (format === "binary" || (contentMediaType && fileLikeMediaType.test(contentMediaType))) {
    throw new Error(`Binary schemas (Blob | File) are unsupported at ${context}`);
  }
  if (format) ir.format = format;
  for (const key of [
    "exclusiveMaximum",
    "exclusiveMinimum",
    "maximum",
    "maxItems",
    "maxLength",
    "minimum",
    "minItems",
    "minLength",
  ] as const) {
    const value = optionalNumber(schema, key, context);
    if (value !== undefined) ir[key] = value;
  }
  const pattern = optionalString(schema, "pattern", context);
  if (pattern) ir.pattern = pattern;
  return ir;
};

const constType = (value: Literal): IrType => {
  if (typeof value === "string") return "string";
  if (typeof value === "boolean") return "boolean";
  return "number";
};

// A single IR item either replaces the parent (`merge`) or becomes its only item.
const addItems = (ir: Ir, items: Array<Ir>, merge: boolean): Ir => {
  if (items.length === 0) return ir;
  if (ir.type === "tuple") {
    ir.items = items;
    return ir;
  }
  const [only] = items;
  if (items.length === 1 && only !== undefined) {
    if (merge) return Object.assign(ir, only);
    ir.items = items;
    return ir;
  }
  ir.items = items;
  ir.logicalOperator = "or";
  return ir;
};

const schemaTypes = (schema: JsonRecord, context: string): Array<string> => {
  const type = schema["type"];
  if (type === undefined) return schema["properties"] === undefined ? [] : ["object"];
  if (typeof type === "string") return [type];
  const types = stringArray(type, `${context}.type`);
  if (types.length !== 1) throw new Error(`Multi-type schemas are unsupported at ${context}`);
  return types;
};

export const schemaToIr = (input: unknown, context: string): Ir => {
  const schema = expectRecord(input, context);
  assertSupportedKeywords(schema, context);
  if (schema["not"] !== undefined) {
    const denied = expectRecord(schema["not"], `${context}.not`);
    if (Object.keys(denied).length !== 0)
      throw new Error(`Only not: {} is supported at ${context}`);
    const ir = initIr(schema, context);
    ir.type = "never";
    return ir;
  }
  const ref = optionalString(schema, "$ref", context);
  if (ref !== undefined) {
    if (schema["type"] !== undefined)
      throw new Error(`$ref with type is unsupported at ${context}`);
    refToName(ref);
    const ir = initIr(schema, context);
    ir.$ref = ref;
    return ir;
  }
  if (schema["enum"] !== undefined) return enumToIr(schema, context);
  if (schema["anyOf"] !== undefined) return anyOfToIr(schema, context);
  const types = schemaTypes(schema, context);
  const ir = initIr(schema, context);
  const [type] = types;
  if (type === undefined) {
    if (ir.type !== undefined) return ir;
    ir.type = "unknown";
    return ir;
  }
  switch (type) {
    case "array":
      return arrayToIr(ir, schema, context);
    case "object":
      return objectToIr(ir, schema, context);
    case "boolean":
    case "integer":
    case "null":
    case "number":
    case "string":
      ir.type = type;
      return ir;
    default:
      throw new Error(`Unsupported schema type "${type}" at ${context}`);
  }
};

const enumToIr = (schema: JsonRecord, context: string): Ir => {
  const ir = initIr(schema, context);
  ir.type = "enum";
  const items = expectArray(schema["enum"], `${context}.enum`).map((value, index) => {
    const literal = literalOf(value, `${context}.enum[${index}]`);
    return { const: literal, type: constType(literal) } satisfies Ir;
  });
  return addItems(ir, items, false);
};

const anyOfToIr = (schema: JsonRecord, context: string): Ir => {
  if (schema["type"] !== undefined || schema["properties"] !== undefined) {
    throw new Error(`anyOf combined with type/properties is unsupported at ${context}`);
  }
  const ir = initIr(schema, context);
  const items = expectArray(schema["anyOf"], `${context}.anyOf`).map((item, index) =>
    schemaToIr(item, `${context}.anyOf[${index}]`),
  );
  return addItems(ir, items, true);
};

const hasComposition = (schema: unknown): boolean => {
  if (!isRecord(schema)) return false;
  const anyOf = schema["anyOf"];
  return Array.isArray(anyOf) && anyOf.length > 1;
};

const arrayToIr = (ir: Ir, schema: JsonRecord, context: string): Ir => {
  const prefixItems =
    schema["prefixItems"] === undefined
      ? []
      : expectArray(schema["prefixItems"], `${context}.prefixItems`);
  const fixedLength = ir.maxItems !== undefined && ir.maxItems > 0 && ir.maxItems === ir.minItems;
  // `items: false` closes the array to its prefix; with no prefix it is the empty tuple.
  const closed = schema["items"] === false;
  ir.type =
    prefixItems.length > 0 || fixedLength || closed || ir.const !== undefined ? "tuple" : "array";
  let items = prefixItems.map((item, index) =>
    schemaToIr(item, `${context}.prefixItems[${index}]`),
  );
  if (schema["items"] !== undefined && !closed) {
    const itemsIr = schemaToIr(schema["items"], `${context}.items`);
    if (items.length === 0 && fixedLength && ir.maxItems !== undefined) {
      items = Array.from({ length: ir.maxItems }, () => itemsIr);
    } else if (hasComposition(schema["items"])) {
      Object.assign(ir, itemsIr);
    } else if (items.length > 0 && !fixedLength) {
      ir.rest = itemsIr;
    } else {
      items.push(itemsIr);
    }
  }
  return addItems(ir, items, false);
};

const objectToIr = (ir: Ir, schema: JsonRecord, context: string): Ir => {
  ir.type = "object";
  const properties = schema["properties"];
  if (properties !== undefined) {
    const entries = Object.entries(expectRecord(properties, `${context}.properties`));
    if (entries.length > 0) {
      ir.properties = Object.fromEntries(
        entries.map(([name, property]) => [
          name,
          schemaToIr(property, `${context}.properties.${name}`),
        ]),
      );
    }
  }
  const additional = schema["additionalProperties"];
  if (additional === undefined) {
    if (ir.properties === undefined) ir.additionalProperties = { type: "unknown" };
  } else if (typeof additional === "boolean") {
    ir.additionalProperties = { type: additional ? "unknown" : "never" };
  } else {
    ir.additionalProperties = schemaToIr(additional, `${context}.additionalProperties`);
  }
  if (schema["required"] !== undefined) {
    ir.required = stringArray(schema["required"], `${context}.required`);
  }
  return ir;
};

// ---------------------------------------------------------------------------------------------
// Union deduplication

const isScalarType = (type: IrType | undefined): boolean =>
  type === undefined ||
  type === "boolean" ||
  type === "integer" ||
  type === "null" ||
  type === "number" ||
  type === "string" ||
  type === "unknown";

const typeId = (item: Ir, detectFormat: boolean): string =>
  [
    item.$ref ?? "",
    item.type ?? "",
    item.const === undefined ? "" : `const-${String(item.const)}`,
    item.format !== undefined && detectFormat ? `format-${item.format}` : "",
    item.minLength === undefined ? "" : `minLength-${item.minLength}`,
    item.maxLength === undefined ? "" : `maxLength-${item.maxLength}`,
    item.minimum === undefined ? "" : `minimum-${item.minimum}`,
    item.maximum === undefined ? "" : `maximum-${item.maximum}`,
    item.exclusiveMinimum === undefined ? "" : `exclusiveMinimum-${item.exclusiveMinimum}`,
    item.exclusiveMaximum === undefined ? "" : `exclusiveMaximum-${item.exclusiveMaximum}`,
    item.minItems === undefined ? "" : `minItems-${item.minItems}`,
    item.maxItems === undefined ? "" : `maxItems-${item.maxItems}`,
    item.pattern === undefined ? "" : `pattern-${item.pattern}`,
  ].join("");

/** Drops repeated scalar/reference members; a union left with one member becomes that member. */
export const deduplicate = (schema: Ir, detectFormat = true): Ir => {
  if (schema.items === undefined) return schema;
  const unique: Array<Ir> = [];
  const seen = new Set<string>();
  for (const item of schema.items) {
    if ((item.type === undefined && item.items !== undefined) || schema.type === "tuple") {
      unique.push(item);
    } else if (isScalarType(item.type)) {
      const id = typeId(item, detectFormat);
      if (!seen.has(id)) {
        seen.add(id);
        unique.push(item);
      }
    } else {
      unique.push(item);
    }
  }
  const result: Ir = { ...schema };
  const [lifted] = unique;
  if (
    unique.length <= 1 &&
    result.type !== "array" &&
    result.type !== "enum" &&
    result.type !== "tuple"
  ) {
    delete result.items;
    delete result.logicalOperator;
    if (lifted !== undefined) Object.assign(result, lifted);
  } else {
    result.items = unique;
  }
  if (result.type === "unknown") return {};
  return result;
};

// ---------------------------------------------------------------------------------------------
// Type AST

export type TypeNode =
  | { readonly kind: "reference"; readonly name: string; readonly args?: ReadonlyArray<TypeNode> }
  | { readonly kind: "keyword"; readonly name: string }
  | { readonly kind: "literal"; readonly value: Literal | null }
  | { readonly kind: "union"; readonly members: ReadonlyArray<TypeNode> }
  | { readonly kind: "intersection"; readonly members: ReadonlyArray<TypeNode> }
  | {
      readonly kind: "tuple";
      readonly elements: ReadonlyArray<TypeNode>;
      readonly rest?: TypeNode | undefined;
    }
  | { readonly kind: "object"; readonly members: ReadonlyArray<ObjectMember> }
  | { readonly kind: "indexedAccess"; readonly name: string };

export type ObjectMember =
  | {
      readonly kind: "property";
      readonly name: string;
      readonly optional: boolean;
      readonly doc: ReadonlyArray<string>;
      readonly type: TypeNode;
    }
  | { readonly kind: "index"; readonly type: TypeNode };

export const keyword = (name: string): TypeNode => ({ kind: "keyword", name });
export const reference = (name: string, args?: ReadonlyArray<TypeNode>): TypeNode =>
  args === undefined ? { kind: "reference", name } : { kind: "reference", name, args };
export const literal = (value: Literal | null): TypeNode => ({ kind: "literal", value });
export const union = (members: ReadonlyArray<TypeNode>): TypeNode => ({ kind: "union", members });

export const escapeComment = (value: string): string => {
  if (/[\r\n]/.test(value)) throw new Error(`Multi-line comments are unsupported: ${value}`);
  return value.replaceAll("*/", "*").replaceAll("/*", "*");
};

/** JSDoc lines for a schema: title, description, and deprecation, separated by blank lines. */
export const schemaComment = (schema: Ir): Array<string> => {
  const lines: Array<string> = [];
  const push = (line: string) => {
    if (lines.length > 0) lines.push("");
    lines.push(line);
  };
  if (schema.title) push(escapeComment(schema.title));
  if (schema.description) push(escapeComment(schema.description));
  if (schema.deprecated) push("@deprecated");
  return lines;
};

/** Receives each component type name a walked schema references. */
export type ReferenceSink = (typeName: string) => void;

export const schemaToType = (schema: Ir, onReference: ReferenceSink): TypeNode => {
  const walk = (ir: Ir): TypeNode => {
    if (ir.$ref !== undefined) {
      const name = componentTypeName(refToName(ir.$ref));
      onReference(name);
      return reference(name);
    }
    if (ir.type !== undefined) return typed(ir);
    if (ir.items !== undefined) {
      const deduplicated = deduplicate(ir);
      if (deduplicated.items === undefined) return walk(deduplicated);
      const members = deduplicated.items.map(walk);
      const [only] = members;
      return members.length === 1 && only !== undefined ? only : union(members);
    }
    return keyword("unknown");
  };

  const typed = (ir: Ir): TypeNode => {
    switch (ir.type) {
      case "array":
        return arrayType(ir);
      case "boolean":
      case "integer":
      case "number":
      case "string":
        if (ir.const !== undefined) return literal(ir.const);
        return keyword(ir.type === "integer" ? "number" : ir.type);
      case "enum": {
        const items = ir.items ?? [];
        if (items.length === 0) return keyword("never");
        const literals = items.flatMap((item) =>
          item.const === undefined ? [] : [literal(item.const)],
        );
        return literals.length > 0 ? union(literals) : keyword("string");
      }
      case "never":
      case "undefined":
      case "unknown":
        return keyword(ir.type);
      case "null":
        return literal(null);
      case "object":
        return objectType(ir);
      case "tuple":
        return {
          kind: "tuple",
          elements: (ir.items ?? []).map(walk),
          ...(ir.rest === undefined ? {} : { rest: walk(ir.rest) }),
        };
      default:
        throw new Error(`Untyped schema reached the typed visitor: ${JSON.stringify(ir)}`);
    }
  };

  const arrayType = (ir: Ir): TypeNode => {
    const deduplicated = deduplicate(ir);
    if (deduplicated.items === undefined) return reference("Array", [keyword("unknown")]);
    const members = deduplicated.items.map(walk);
    const [only] = members;
    return reference("Array", [members.length === 1 && only !== undefined ? only : union(members)]);
  };

  const objectType = (ir: Ir): TypeNode => {
    const required = ir.required ?? [];
    const members: Array<ObjectMember> = [];
    let indexSchemas: Array<Ir> = [];
    let hasOptionalProperties = false;
    for (const [name, property] of Object.entries(ir.properties ?? {})) {
      const isRequired = required.includes(name);
      members.push({
        kind: "property",
        name,
        optional: !isRequired,
        doc: schemaComment(property),
        type: walk(property),
      });
      indexSchemas.push(property);
      if (!isRequired) hasOptionalProperties = true;
    }
    const additional = ir.additionalProperties;
    if (additional !== undefined && (additional.type !== "never" || indexSchemas.length === 0)) {
      if (additional.type === "unknown") indexSchemas = [additional];
      else if (additional.type !== "never") indexSchemas.unshift(additional);
      else indexSchemas = [additional];
      if (hasOptionalProperties && additional.type !== "unknown") {
        indexSchemas.push({ type: "undefined" });
      }
      const [single] = indexSchemas;
      const indexSchema =
        indexSchemas.length === 1 && single !== undefined
          ? single
          : deduplicate({ items: indexSchemas, logicalOperator: "or" });
      members.push({ kind: "index", type: walk(indexSchema) });
    }
    return { kind: "object", members };
  };

  return walk(schema);
};

// ---------------------------------------------------------------------------------------------
// Printing

export const identifierName = /^[$_\p{ID_Start}][$\u200c\u200d\p{ID_Continue}]*$/u;
const numericName = /^-?\d+(\.\d+)?$/;

/** A property key as written in a type literal or object literal. */
export const propertyKey = (name: string): string => {
  if (numericName.test(name))
    return name.startsWith("-") ? JSON.stringify(name) : String(Number(name));
  return identifierName.test(name) ? name : JSON.stringify(name);
};

const printLiteral = (value: Literal | null): string =>
  typeof value === "string" ? JSON.stringify(value) : String(value);

export interface PrintOptions {
  /** Rewrites optional `key?: T` members to `key?: T | undefined`. */
  readonly loosenOptionals: boolean;
  /**
   * Rewrites record entries `[key: string]: T` to admit `undefined`. Set only for types a caller
   * writes; a record a caller reads keeps its entries exactly.
   */
  readonly loosenRecords: boolean;
  /** Names a component reference in the printed text, e.g. the local alias of an import. */
  readonly resolveReference?: ((typeName: string) => string) | undefined;
}

/** `T | undefined` is redundant when `T` already admits undefined. */
const absorbsUndefined = (type: TypeNode): boolean => {
  if (type.kind === "keyword") {
    return type.name === "undefined" || type.name === "unknown" || type.name === "any";
  }
  return type.kind === "union" && type.members.some(absorbsUndefined);
};

const isNever = (type: TypeNode): boolean => type.kind === "keyword" && type.name === "never";

export const docComment = (lines: ReadonlyArray<string>, indent: string): string => {
  if (lines.length === 0) return "";
  const body = lines.map((line) => (line === "" ? `${indent} *` : `${indent} * ${line}`));
  return `${indent}/**\n${body.join("\n")}\n${indent} */\n`;
};

const flattenUnion = (members: ReadonlyArray<TypeNode>): Array<TypeNode> =>
  members.flatMap((member) => (member.kind === "union" ? flattenUnion(member.members) : [member]));

/**
 * Prints a type expression. `looseMembers` is false only for the direct members of an
 * operation's `*Data` request envelope, which the fetch runtime assigns into exact-optional
 * request options.
 */
export const printType = (
  type: TypeNode,
  options: PrintOptions,
  indent = "",
  looseMembers = true,
): string => {
  const print = (node: TypeNode): string => printType(node, options, indent);
  switch (type.kind) {
    case "keyword":
      return type.name;
    case "literal":
      return printLiteral(type.value);
    case "reference":
      return type.args === undefined
        ? (options.resolveReference?.(type.name) ?? type.name)
        : `${type.name}<${type.args.map(print).join(", ")}>`;
    case "indexedAccess":
      return `${type.name}[keyof ${type.name}]`;
    case "union": {
      const members = flattenUnion(type.members);
      if (members.length === 0) return "never";
      return members
        .map((member) => (member.kind === "intersection" ? `(${print(member)})` : print(member)))
        .join(" | ");
    }
    case "intersection":
      return type.members
        .map((member) => (member.kind === "union" ? `(${print(member)})` : print(member)))
        .join(" & ");
    case "tuple": {
      const elements = type.elements.map(print);
      if (type.rest !== undefined) elements.push(`...Array<${print(type.rest)}>`);
      return `[${elements.join(", ")}]`;
    }
    case "object": {
      if (type.members.length === 0) return "{}";
      const inner = `${indent}  `;
      const lines = type.members.map((member) => {
        if (member.kind === "index") {
          const entryType =
            options.loosenRecords && !absorbsUndefined(member.type) && !isNever(member.type)
              ? union([member.type, keyword("undefined")])
              : member.type;
          return `${inner}[key: string]: ${printType(entryType, options, inner)};`;
        }
        const loosen =
          member.optional &&
          looseMembers &&
          options.loosenOptionals &&
          !absorbsUndefined(member.type);
        const memberType = loosen ? union([member.type, keyword("undefined")]) : member.type;
        const optional = member.optional ? "?" : "";
        return `${docComment(member.doc, inner)}${inner}${propertyKey(member.name)}${optional}: ${printType(memberType, options, inner)};`;
      });
      return `{\n${lines.join("\n")}\n${indent}}`;
    }
  }
};
