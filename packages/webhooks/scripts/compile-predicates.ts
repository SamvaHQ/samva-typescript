import { Schema } from "effect";

/** Compile the wire-schema subset into shared predicates without a customer validation runtime. */
export const compilePredicates = () => {
  const functions: string[] = [];
  const memo = new Map<string, string>();
  const object = Schema.decodeUnknownSync(Schema.Record(Schema.String, Schema.Unknown));
  const schemas = Schema.decodeUnknownSync(
    Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
  );
  const strings = Schema.decodeUnknownSync(Schema.Array(Schema.String));
  const supported = new Set([
    "type",
    "properties",
    "required",
    "additionalProperties",
    "enum",
    "anyOf",
    "$ref",
    "items",
    "pattern",
    "description",
    "title",
    "$comment",
    "minimum",
    "maximum",
    "exclusiveMinimum",
    "exclusiveMaximum",
    "minLength",
    "maxLength",
    "minItems",
    "maxItems",
  ]);
  const compile = (input: unknown, definitions: Readonly<Record<string, unknown>>): string => {
    const schema = object(input);
    for (const key of Object.keys(schema)) {
      if (!supported.has(key)) throw new Error(`Unsupported webhook validation keyword: ${key}`);
    }
    if (schema.$ref !== undefined) {
      for (const key of Object.keys(schema)) {
        if (!["$ref", "description", "title", "$comment"].includes(key))
          throw new Error(`Unsupported webhook reference sibling: ${key}`);
      }
      const ref = Schema.decodeUnknownSync(Schema.String)(schema.$ref);
      if (!ref.startsWith("#/$defs/")) throw new Error(`Unsupported reference: ${ref}`);
      const definition = definitions[ref.slice(8)];
      if (definition === undefined) throw new Error(`Missing reference: ${ref}`);
      return compile(definition, definitions);
    }
    const tests: string[] = [];
    const name = `validate${functions.length}`;
    // Reserve before compiling children so each predicate has a distinct name.
    functions.push("");
    if (schema.type !== undefined) {
      switch (schema.type) {
        case "object":
          tests.push("isObject(value)");
          break;
        case "array":
          tests.push("Array.isArray(value)");
          break;
        case "null":
          tests.push("value === null");
          break;
        case "string":
        case "boolean":
          tests.push(`typeof value === ${JSON.stringify(schema.type)}`);
          break;
        case "integer":
          tests.push('typeof value === "number" && Number.isInteger(value)');
          break;
        case "number":
          tests.push('typeof value === "number" && Number.isFinite(value)');
          break;
        default:
          throw new Error(`Unsupported webhook schema type: ${String(schema.type)}`);
      }
    }
    for (const [key, operator] of [
      ["minimum", ">="],
      ["maximum", "<="],
      ["exclusiveMinimum", ">"],
      ["exclusiveMaximum", "<"],
    ]) {
      if (schema[key!] !== undefined)
        tests.push(
          `typeof value === "number" && value ${operator} ${Schema.decodeUnknownSync(Schema.Finite)(schema[key!])}`,
        );
    }
    for (const [key, operator] of [
      ["minLength", ">="],
      ["maxLength", "<="],
    ]) {
      if (schema[key!] !== undefined)
        tests.push(
          `typeof value === "string" && Array.from(value).length ${operator} ${Schema.decodeUnknownSync(Schema.Finite)(schema[key!])}`,
        );
    }
    for (const [key, operator] of [
      ["minItems", ">="],
      ["maxItems", "<="],
    ]) {
      if (schema[key!] !== undefined)
        tests.push(
          `Array.isArray(value) && value.length ${operator} ${Schema.decodeUnknownSync(Schema.Finite)(schema[key!])}`,
        );
    }
    if (schema.enum !== undefined) {
      const values = Schema.decodeUnknownSync(
        Schema.Array(Schema.Union([Schema.String, Schema.Finite, Schema.Boolean, Schema.Null])),
      )(schema.enum);
      tests.push(
        `(${values.map((value) => `value === ${JSON.stringify(value)}`).join(" || ") || "false"})`,
      );
    }
    if (schema.pattern !== undefined) {
      const pattern = Schema.decodeUnknownSync(Schema.String)(schema.pattern);
      tests.push(
        `typeof value === "string" && new RegExp(${JSON.stringify(pattern)}, "u").test(value)`,
      );
    }
    if (schema.anyOf !== undefined) {
      tests.push(
        `(${schemas(schema.anyOf)
          .map((member) => `${compile(member, definitions)}(value)`)
          .join(" || ")})`,
      );
    }
    if (schema.items !== undefined)
      tests.push(`Array.isArray(value) && value.every(${compile(schema.items, definitions)})`);
    if (
      schema.properties !== undefined ||
      schema.required !== undefined ||
      schema.additionalProperties !== undefined
    ) {
      tests.push("isObject(value)");
      const properties = schema.properties === undefined ? {} : object(schema.properties);
      const required = schema.required === undefined ? [] : strings(schema.required);
      for (const key of required) tests.push(`Object.hasOwn(value, ${JSON.stringify(key)})`);
      for (const [key, member] of Object.entries(properties)) {
        const property = JSON.stringify(key);
        tests.push(
          `(!Object.hasOwn(value, ${property}) || ${compile(member, definitions)}(value[${property}]))`,
        );
      }
      if (schema.additionalProperties === false) {
        tests.push(
          Object.keys(properties).length === 0
            ? "Object.keys(value).length === 0"
            : `Object.keys(value).every((key) => ${JSON.stringify(Object.keys(properties))}.includes(key))`,
        );
      } else if (
        schema.additionalProperties !== undefined &&
        schema.additionalProperties !== true
      ) {
        tests.push(
          `Object.entries(value).every(([key, item]) => ${Object.keys(properties).length === 0 ? "false" : `${JSON.stringify(Object.keys(properties))}.includes(key)`} || ${compile(schema.additionalProperties, definitions)}(item))`,
        );
      }
    }
    const expression = tests.join(" && ") || "true";
    const existing = memo.get(expression);
    if (existing !== undefined) return existing;
    memo.set(expression, name);
    functions[Number(name.slice(8))] =
      `const ${name} = (value: unknown): boolean => ${expression};`;
    return name;
  };
  return {
    compile,
    source: () =>
      'const isObject = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);\n' +
      functions.filter(Boolean).join("\n"),
  };
};
