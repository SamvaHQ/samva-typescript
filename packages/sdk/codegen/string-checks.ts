/**
 * The reader of `x-samva-string-checks`: source string checks the public document records beside a
 * string schema because JSON Schema can only approximate them (UTF-16 lengths, non-Unicode
 * patterns). The generator rebuilds each check from its Effect representation.
 */

import { Schema, SchemaRepresentation } from "effect";

const Length = Schema.Finite.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0));
const StringCheck = Schema.Union([
  Schema.Struct({
    id: Schema.Literal("effect/schema/isMinLength"),
    payload: Schema.Struct({ minLength: Length }),
  }),
  Schema.Struct({
    id: Schema.Literal("effect/schema/isMaxLength"),
    payload: Schema.Struct({ maxLength: Length }),
  }),
  Schema.Struct({
    id: Schema.Literal("effect/schema/isBetweenLength"),
    payload: Schema.Struct({ minimum: Length, maximum: Length }),
  }),
  Schema.Struct({
    id: Schema.Literal("effect/schema/isPattern"),
    payload: Schema.Struct({ source: Schema.String, flags: Schema.String }),
  }),
]);
export type StringCheck = typeof StringCheck.Type;
export const STRING_CHECKS_EXTENSION = "x-samva-string-checks";
export const decodeStringChecks = Schema.decodeUnknownSync(Schema.NonEmptyArray(StringCheck));

const filter = (check: StringCheck) => {
  switch (check.id) {
    case "effect/schema/isMinLength":
      return Schema.isMinLength(check.payload.minLength);
    case "effect/schema/isMaxLength":
      return Schema.isMaxLength(check.payload.maxLength);
    case "effect/schema/isBetweenLength":
      return Schema.isBetweenLength(check.payload.minimum, check.payload.maximum);
    case "effect/schema/isPattern":
      return Schema.isPattern(new RegExp(check.payload.source, check.payload.flags));
  }
};

export const stringCheckRepresentations = ([first, ...rest]: readonly [
  StringCheck,
  ...Array<StringCheck>,
]) =>
  SchemaRepresentation.toRepresentation(Schema.String.check(filter(first), ...rest.map(filter)).ast)
    .representation;
