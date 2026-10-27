import { Schema, SchemaTransformation } from "effect";

/** Decode wire secrets to redacted values and require redacted values when encoding. */
const Sensitive = <A, E, RD, RE>(schema: Schema.Codec<A, E, RD, RE>) =>
  Schema.RedactedFromValue(schema);

export const SensitiveString = Sensitive(Schema.String);
export type SensitiveString = typeof SensitiveString.Type;

const ABSOLUTE_ISO_INSTANT_PATTERN =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,9}))?)?(Z|([+-])(\d{2}):(\d{2}))$/;

const isValidAbsoluteInstant = (value: string): boolean => {
  const match = ABSOLUTE_ISO_INSTANT_PATTERN.exec(value);
  if (match === null) return false;
  const [
    ,
    year,
    month,
    day,
    hour,
    minute,
    second = "0",
    fraction = "",
    zone,
    sign,
    offsetHour,
    offsetMinute,
  ] = match;
  const offsetHours = Number(offsetHour ?? 0);
  const offsetMinutes = Number(offsetMinute ?? 0);
  if (offsetHours > 23 || offsetMinutes > 59) return false;
  const offset = zone === "Z" ? 0 : (sign === "-" ? -1 : 1) * (offsetHours * 60 + offsetMinutes);
  const instant = new Date(value);
  if (!Number.isFinite(instant.getTime())) return false;
  const local = new Date(instant.getTime() + offset * 60_000);
  const millisecond = Number(fraction.padEnd(3, "0").slice(0, 3));
  return (
    local.getUTCFullYear() === Number(year) &&
    local.getUTCMonth() + 1 === Number(month) &&
    local.getUTCDate() === Number(day) &&
    local.getUTCHours() === Number(hour) &&
    local.getUTCMinutes() === Number(minute) &&
    local.getUTCSeconds() === Number(second) &&
    local.getUTCMilliseconds() === millisecond
  );
};

export const AbsoluteInstant = Schema.String.check(
  Schema.isPattern(ABSOLUTE_ISO_INSTANT_PATTERN),
  Schema.makeFilter(isValidAbsoluteInstant, { message: "Invalid absolute ISO-8601 instant" }),
).pipe(Schema.decodeTo(Schema.Date, SchemaTransformation.dateFromString));
export type AbsoluteInstant = typeof AbsoluteInstant.Type;
