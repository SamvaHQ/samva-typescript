const READ_METHODS = new Set<string>(["GET", "HEAD"]);

/** The retry-relevant part of an operation's generated metadata. */
export interface RetryPolicyMetadata {
  readonly method: string;
  readonly idempotent: boolean;
  readonly idempotentWhen?: { readonly field: string; readonly equals: string } | undefined;
}

/** Some endpoints admit both replayable requests and generation-fenced mutations. */
export const isRetrySafe = (metadata: RetryPolicyMetadata, input: unknown): boolean => {
  if (READ_METHODS.has(metadata.method)) return true;
  if (!metadata.idempotent) return false;
  const condition = metadata.idempotentWhen;
  if (condition === undefined) return true;
  // oxlint-disable-next-line samva/no-hand-rolled-object-guard -- Shared Promise policy cannot import Effect.
  if (typeof input !== "object" || input === null) return false;
  return (input as Readonly<Record<string, unknown>>)[condition.field] === condition.equals;
};
