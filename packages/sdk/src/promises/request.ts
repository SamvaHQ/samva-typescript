import { type Client, mergeHeaders } from "../client/client";
import { SamvaErrorMetadata, SamvaOperations } from "../effect/generated-metadata";
import {
  DEFAULT_TIMEOUT_MS,
  DEFAULT_UPLOAD_TIMEOUT_MS,
  isRetrySafe,
  resolveTimeout,
  type TimeoutSetting,
  validateTimeout,
} from "../request-policy";
import { fromApiError, SamvaTimeoutError, SamvaTransportError } from "./errors.gen";

export interface RequestPolicy {
  readonly maxRetries?: number | undefined;
  readonly idempotency?: ((operation: string) => string) | undefined;
  /**
   * Milliseconds each request attempt may take before it fails with `SamvaTimeoutError`
   * (default 30 000). `null` disables the bound.
   */
  readonly timeoutMs?: number | null | undefined;
  /**
   * Milliseconds each put of attachment bytes to storage may take (default 300 000). `null`
   * disables the bound.
   */
  readonly uploadTimeoutMs?: number | null | undefined;
}
export interface CallOptions {
  readonly idempotencyKey?: string | undefined;
  readonly maxRetries?: number | undefined;
  /** Overrides the client's `timeoutMs` for this call; `undefined` inherits it. */
  readonly timeoutMs?: number | null | undefined;
  readonly headers?: Parameters<typeof mergeHeaders>[0];
  readonly signal?: AbortSignal | null | undefined;
}

const policies = new WeakMap<Client, RequestPolicy>();
export const configureRequests = (client: Client, policy: RequestPolicy): void => {
  if (policy.maxRetries !== undefined) validateRetries(policy.maxRetries);
  validateTimeout("timeoutMs", policy.timeoutMs);
  validateTimeout("uploadTimeoutMs", policy.uploadTimeoutMs);
  policies.set(client, policy);
};

/** The bound on one storage put: the call's `uploadTimeoutMs`, else the client's, else the default. */
export const uploadTimeout = (client: Client, call: TimeoutSetting): number | null =>
  resolveTimeout(
    "uploadTimeoutMs",
    call,
    policies.get(client)?.uploadTimeoutMs,
    DEFAULT_UPLOAD_TIMEOUT_MS,
  );

export interface Attempt {
  /** The caller's signal joined with this attempt's own timer. */
  readonly signal: AbortSignal | undefined;
  /** The timeout, when the attempt's timer (not the caller) ended it. */
  readonly timedOut: () => SamvaTimeoutError | undefined;
  readonly end: () => void;
}

/** Each attempt gets a fresh timer, so a retry has the whole bound again. */
export const startAttempt = (
  signal: AbortSignal | null | undefined,
  timeoutMs: number | null,
): Attempt => {
  if (timeoutMs === null)
    return { signal: signal ?? undefined, timedOut: () => undefined, end: () => {} };
  const timer = new AbortController();
  const handle = setTimeout(() => timer.abort(new SamvaTimeoutError(timeoutMs)), timeoutMs);
  const joined = signal ? AbortSignal.any([signal, timer.signal]) : timer.signal;
  return {
    signal: joined,
    timedOut: () => (joined.reason instanceof SamvaTimeoutError ? joined.reason : undefined),
    end: () => clearTimeout(handle),
  };
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
  if (error instanceof SamvaTimeoutError) return true;
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

/**
 * The key belongs to a logical call, so all attempts share it and each invocation gets a fresh one.
 * Each attempt runs under its own `timeoutMs` timer joined with the caller's signal; a timed-out
 * attempt fails with `SamvaTimeoutError` and retries only where a transport failure would.
 */
export async function requestWithPolicy<Result>(
  client: Client,
  operation: keyof typeof SamvaOperations,
  options: CallOptions | undefined,
  send: (
    headers: Record<string, string | null | undefined>,
    signal: AbortSignal | undefined,
  ) => Promise<Result>,
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
  const timeoutMs = resolveTimeout(
    "timeoutMs",
    options?.timeoutMs,
    policy?.timeoutMs,
    DEFAULT_TIMEOUT_MS,
  );
  const safe = isRetrySafe(metadata, input);
  // oxlint-disable no-await-in-loop -- Retry attempts are sequential and reuse the logical call's key.
  for (let retry = 0; ; retry++) {
    let failure: unknown;
    let result: Result;
    const attempt = startAttempt(signal, timeoutMs);
    try {
      result = await send(headers, attempt.signal);
      if (!object(result) || result.error === undefined) return result;
      const timeout = attempt.timedOut();
      failure = fromApiError(timeout ?? result.error, {
        request: result.request instanceof Request ? result.request : undefined,
        response: result.response instanceof Response ? result.response : undefined,
      });
      if (timeout !== undefined) result = { ...result, error: timeout };
    } catch (thrown) {
      const error = attempt.timedOut() ?? thrown;
      failure = fromApiError(error);
      if (!safe || retry >= maxRetries || !retryable(failure) || signal?.aborted) throw error;
      await pause(delay(failure, retry), signal);
      continue;
    } finally {
      attempt.end();
    }
    if (!safe || retry >= maxRetries || !retryable(failure) || signal?.aborted) return result;
    await pause(delay(failure, retry), signal);
  }
  // oxlint-enable no-await-in-loop
}
// oxlint-enable samva/no-hand-rolled-object-guard
