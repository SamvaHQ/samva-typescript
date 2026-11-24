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

/** The per-attempt bound on an API request when neither the client nor the call sets one. */
export const DEFAULT_TIMEOUT_MS = 30_000;
/** The per-attempt bound on putting attachment bytes to storage, which carries the large bodies. */
export const DEFAULT_UPLOAD_TIMEOUT_MS = 300_000;
// Timers clamp anything longer to 1 ms, so a larger bound would fire at once.
const MAX_TIMER_MS = 2_147_483_647;

/** A timeout setting: milliseconds, `null` for no bound, `undefined` to inherit. */
export type TimeoutSetting = number | null | undefined;

export const validateTimeout = (name: string, value: TimeoutSetting): TimeoutSetting => {
  if (value === null || value === undefined) return value;
  if (!Number.isFinite(value) || value <= 0 || value > MAX_TIMER_MS)
    throw new RangeError(
      `${name} must be a positive number of milliseconds up to ${MAX_TIMER_MS}, or null`,
    );
  return value;
};

/** The call's setting wins over the client's; `null` at either level disables the bound. */
export const resolveTimeout = (
  name: string,
  call: TimeoutSetting,
  client: TimeoutSetting,
  fallback: number,
): number | null => {
  const value = validateTimeout(name, call !== undefined ? call : client);
  return value === undefined ? fallback : value;
};
