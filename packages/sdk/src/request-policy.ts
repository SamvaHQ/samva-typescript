import { SamvaOperations } from "./effect/generated-metadata";

const READ_METHODS = new Set<string>(["GET", "HEAD"]);

/** Some endpoints admit both replayable requests and generation-fenced mutations. */
export const isRetrySafe = (operation: keyof typeof SamvaOperations, input: unknown): boolean => {
  const metadata = SamvaOperations[operation];
  if (READ_METHODS.has(metadata.method)) return true;
  if (!metadata.idempotent) return false;
  if (!("idempotentWhen" in metadata)) return true;
  // oxlint-disable-next-line samva/no-hand-rolled-object-guard -- Shared Promise policy cannot import Effect.
  if (typeof input !== "object" || input === null) return false;
  const condition = metadata.idempotentWhen;
  return (input as Readonly<Record<string, unknown>>)[condition.field] === condition.equals;
};
