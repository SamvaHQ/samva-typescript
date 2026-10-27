/**
 * Read/write split of the OpenAPI component schemas, applied before any TypeScript is emitted.
 *
 * A record a caller writes admits `undefined` entries (the wire body omits them); a record a
 * caller reads keeps its entries exactly. A component schema reachable from both request and
 * response positions therefore needs two emissions when a record sits in it, directly or through
 * a reference: it keeps its name for reads, and a `{{name}}Writable` variant serves requests. A
 * schema reachable only from requests is emitted once, as a write schema. A schema whose write
 * and read emissions would print identically is not split.
 *
 * The pass works on the generator's schema representation and ends by retargeting the `$ref`s
 * of request positions at the write variants, so the emitter only decides per schema whether
 * record entries admit `undefined`.
 */

import { componentTypeName, printType, refToName, schemaToType, type Ir } from "./promise-schema";

/** Suffix of the variant of a shared schema that callers write. */
const WRITABLE_SUFFIX = "Writable";

/** One component schema as emitted: `write` schemas admit `undefined` in record entries. */
export interface SchemaEmission {
  readonly name: string;
  readonly schema: Ir;
  readonly write: boolean;
}

export interface ReadWriteSplit {
  /** Every component schema to emit, each write variant directly after its read schema. */
  readonly schemas: ReadonlyArray<SchemaEmission>;
  /** Points the references of a schema in request position at the write variants. */
  readonly retarget: (schema: Ir) => Ir;
}

/** Calls `visit` with the name of every component a schema references. */
const forEachReference = (schema: Ir, visit: (name: string) => void): void => {
  if (schema.$ref !== undefined) visit(refToName(schema.$ref));
  for (const item of schema.items ?? []) forEachReference(item, visit);
  if (schema.rest !== undefined) forEachReference(schema.rest, visit);
  for (const property of Object.values(schema.properties ?? {})) forEachReference(property, visit);
  if (schema.additionalProperties !== undefined) {
    forEachReference(schema.additionalProperties, visit);
  }
};

/** A copy of a schema with each component reference renamed by `rename`. */
const mapReferences = (schema: Ir, rename: (name: string) => string): Ir => {
  const copy: Ir = { ...schema };
  if (schema.$ref !== undefined) {
    copy.$ref = `#/components/schemas/${rename(refToName(schema.$ref))}`;
  }
  if (schema.items !== undefined)
    copy.items = schema.items.map((item) => mapReferences(item, rename));
  if (schema.rest !== undefined) copy.rest = mapReferences(schema.rest, rename);
  if (schema.properties !== undefined) {
    copy.properties = Object.fromEntries(
      Object.entries(schema.properties).map(([key, property]) => [
        key,
        mapReferences(property, rename),
      ]),
    );
  }
  if (schema.additionalProperties !== undefined) {
    copy.additionalProperties = mapReferences(schema.additionalProperties, rename);
  }
  return copy;
};

/** Whether loosening record entries changes the schema's own emission, references aside. */
const holdsRecord = (schema: Ir): boolean => {
  const emit = (loosenRecords: boolean) =>
    printType(
      schemaToType(schema, () => {}),
      { loosenOptionals: true, loosenRecords },
    );
  return emit(true) !== emit(false);
};

const closure = (
  roots: ReadonlyArray<Ir>,
  references: ReadonlyMap<string, ReadonlySet<string>>,
): Set<string> => {
  const pending: Array<string> = [];
  for (const root of roots) forEachReference(root, (name) => pending.push(name));
  const reached = new Set<string>();
  for (let name = pending.pop(); name !== undefined; name = pending.pop()) {
    if (reached.has(name)) continue;
    reached.add(name);
    pending.push(...(references.get(name) ?? []));
  }
  return reached;
};

/**
 * @param schemas The component schemas, keyed by component name.
 * @param requests Every schema in request position: bodies and parameters.
 * @param responses Every schema in response position, errors included.
 */
export const splitReadWrite = (
  schemas: ReadonlyArray<readonly [string, Ir]>,
  requests: ReadonlyArray<Ir>,
  responses: ReadonlyArray<Ir>,
): ReadWriteSplit => {
  const references = new Map<string, Set<string>>();
  for (const [name, schema] of schemas) {
    const found = new Set<string>();
    forEachReference(schema, (reference) => found.add(reference));
    references.set(name, found);
  }
  const written = closure(requests, references);
  const read = closure(responses, references);

  // A shared schema splits when a record sits in it, or in anything it references that splits.
  const split = new Set<string>();
  const shared = schemas.filter(([name]) => written.has(name) && read.has(name));
  for (const [name, schema] of shared) if (holdsRecord(schema)) split.add(name);
  for (let changed = true; changed;) {
    changed = false;
    for (const [name] of shared) {
      if (split.has(name)) continue;
      if ([...(references.get(name) ?? [])].some((reference) => split.has(reference))) {
        split.add(name);
        changed = true;
      }
    }
  }

  const declared = new Set(schemas.map(([name]) => componentTypeName(name)));
  const writable = new Map<string, string>();
  for (const name of split) {
    const variant = `${name}${WRITABLE_SUFFIX}`;
    if (declared.has(componentTypeName(variant))) {
      throw new Error(`Write variant ${variant} of ${name} collides with a declared schema`);
    }
    writable.set(name, variant);
  }

  const retarget = (schema: Ir): Ir => mapReferences(schema, (name) => writable.get(name) ?? name);
  const emissions: Array<SchemaEmission> = [];
  for (const [name, schema] of schemas) {
    const variant = writable.get(name);
    if (variant !== undefined) {
      emissions.push({ name, schema, write: false });
      emissions.push({ name: variant, schema: retarget(schema), write: true });
    } else if (written.has(name) && !read.has(name)) {
      emissions.push({ name, schema: retarget(schema), write: true });
    } else {
      emissions.push({ name, schema, write: false });
    }
  }
  return { schemas: emissions, retarget };
};
