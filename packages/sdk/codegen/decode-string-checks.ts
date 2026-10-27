/**
 * Decode `x-samva-string-checks` values with the generator's reader: a JSON array of extension
 * values on stdin, each one the value of one schema's extension. Exits non-zero on the first value
 * the reader rejects, so a producer of the public document can prove the generator reads what it
 * writes without importing generator code.
 */

import { readFileSync } from "node:fs";

import { Schema } from "effect";

import { decodeStringChecks } from "./string-checks";

const values = Schema.decodeSync(Schema.fromJsonString(Schema.Array(Schema.Json)))(
  readFileSync(0, "utf8"),
);
for (const value of values) decodeStringChecks(value);
process.stdout.write(`Decoded ${values.length} string check lists\n`);
