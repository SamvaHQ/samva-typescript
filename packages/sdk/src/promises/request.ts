import { type Client, mergeHeaders } from "../client/client";
import { SamvaErrorMetadata, SamvaOperations } from "../effect/generated-metadata";
import { isRetrySafe } from "../request-policy";
import { fromApiError, SamvaTransportError } from "./errors.gen";

export interface RequestPolicy {
  readonly maxRetries?: number | undefined;
  readonly idempotency?: ((operation: string) => string) | undefined;
}
export interface CallOptions {
  readonly idempotencyKey?: string | undefined;
  readonly maxRetries?: number | undefined;
  readonly headers?: Parameters<typeof mergeHeaders>[0];
  readonly signal?: AbortSignal | null | undefined;
}

const policies = new WeakMap<Client, RequestPolicy>();
export const configureRequests = (client: Client, policy: RequestPolicy): void => {
  if (policy.maxRetries !== undefined) validateRetries(policy.maxRetries);
  policies.set(client, policy);
};
const validateRetries = (value: number): number => {
  if (!Number.isInteger(value) || value < 0)
    throw new RangeError("maxRetries must be a nonnegative integer");
  return value;
};

// oxlint-disable samva/no-hand-rolled-object-guard -- Promise transport envelopes and generated error metadata are inspected without importing Effect.
const object = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;
const retryable = (error: unknown): boolean => {
  if (error instanceof SamvaTransportError)
    return error.response === undefined && error.cause instanceof TypeError;
  if (!object(error) || typeof error._tag !== "string") return false;
  if (error._tag === "EmailChannelError")
    return error.reason === "transport" || error.reason === "rate_limited";
  return (
    (SamvaErrorMetadata as Readonly<Record<string, { readonly retryable: boolean }>>)[error._tag]
      ?.retryable === true
  );
};
const delay = (error: unknown, retry: number): number => {
  if (
    object(error) &&
    error._tag === "RateLimitedError" &&
    typeof error.retryAfterSeconds === "number" &&
    Number.isFinite(error.retryAfterSeconds) &&
    error.retryAfterSeconds >= 0
  )
    return Math.min(error.retryAfterSeconds, 60) * 1000;
  return 200 * 2 ** retry * (0.8 + Math.random() * 0.4);
};
const pause = (milliseconds: number, signal: AbortSignal | null | undefined): Promise<void> =>
  new Promise((resolve, reject) => {
    signal?.throwIfAborted();
    const abort = () => {
      clearTimeout(timer);
      reject(signal?.reason);
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", abort);
      resolve();
    }, milliseconds);
    signal?.addEventListener("abort", abort, { once: true });
  });

/** The key belongs to a logical call, so all attempts share it and each invocation gets a fresh one. */
export async function requestWithPolicy<Result>(
  client: Client,
  operation: keyof typeof SamvaOperations,
  options: CallOptions | undefined,
  send: (headers: Record<string, string | null | undefined>) => Promise<Result>,
  input?: unknown,
): Promise<Result> {
  const metadata = SamvaOperations[operation];
  const policy = policies.get(client);
  const signal = options?.signal ?? client.getConfig().signal;
  const headers: Record<string, string | null | undefined> = Object.fromEntries(
    mergeHeaders(client.getConfig().headers, options?.headers),
  );
  if (
    options?.headers !== undefined &&
    !(options.headers instanceof Headers) &&
    !Array.isArray(options.headers)
  ) {
    for (const [name, value] of Object.entries(options.headers))
      if (value === null) headers[name] = null;
  }
  if (metadata.idempotent) {
    for (const name of Object.keys(headers))
      if (name.toLowerCase() === "idempotency-key") delete headers[name];
    headers["idempotency-key"] =
      options?.idempotencyKey ?? policy?.idempotency?.(operation) ?? crypto.randomUUID();
  }
  const maxRetries = validateRetries(options?.maxRetries ?? policy?.maxRetries ?? 3);
  const safe = isRetrySafe(operation, input);
  // oxlint-disable no-await-in-loop -- Retry attempts are sequential and reuse the logical call's key.
  for (let retry = 0; ; retry++) {
    let failure: unknown;
    let result: Result;
    try {
      result = await send(headers);
      if (!object(result) || result.error === undefined) return result;
      failure = fromApiError(result.error, {
        request: result.request instanceof Request ? result.request : undefined,
        response: result.response instanceof Response ? result.response : undefined,
      });
    } catch (error) {
      failure = fromApiError(error);
      if (!safe || retry >= maxRetries || !retryable(failure) || signal?.aborted) throw error;
      await pause(delay(failure, retry), signal);
      continue;
    }
    if (!safe || retry >= maxRetries || !retryable(failure) || signal?.aborted) return result;
    await pause(delay(failure, retry), signal);
  }
  // oxlint-enable no-await-in-loop
}
// oxlint-enable samva/no-hand-rolled-object-guard
