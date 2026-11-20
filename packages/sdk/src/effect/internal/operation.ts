import { type Brand, Effect, Predicate, Redacted, Stream } from "effect";
import type { HttpApiGroup } from "effect/http-api";

import { isRetrySafe } from "../../request-policy";
import type { SDK_OPERATION_CALLS } from "../../service-map";
import { type CursorPageEnvelope, streamCursorItems, streamCursorPages } from "../pagination";
import { generateIdempotencyKey, withRetry } from "../retry";
import { type FlatRaw, type Operation, type OperationResult, Service } from "./client";

export type { OperationResult };

export type SdkOperation = keyof typeof SDK_OPERATION_CALLS & Operation;

type Wire<Value> = Value extends string
  ? Value extends Brand.Brand<string>
    ? string
    : Value
  : Value extends Redacted.Redacted<infer Raw>
    ? Raw | Value
    : Value extends number | boolean | bigint | symbol | null | undefined
      ? Value
      : Value extends Date
        ? Value
        : Value extends ReadonlyArray<infer Item>
          ? ReadonlyArray<Wire<Item>>
          : Value extends object
            ? {
                readonly [Key in keyof Value]:
                  | Wire<Value[Key]>
                  | ({} extends Pick<Value, Key> ? undefined : never);
              }
            : Value;

type FlattenRequest<Request> = (Request extends { readonly params: infer Params }
  ? Params
  : unknown) &
  (Request extends { readonly query: infer Query } ? Query : unknown) &
  (Request extends { readonly payload: infer Payload } ? Payload : unknown);

export type RequestArg<Method> = Method extends (
  request: infer Request,
  ...rest: ReadonlyArray<unknown>
) => unknown
  ? Request
  : never;

type Input<Name extends SdkOperation> = Wire<
  FlattenRequest<NonNullable<RequestArg<FlatRaw[Name]>>>
>;

/**
 * The per-call options every exported operation wrapper accepts.
 *
 * @public — the exported operation wrappers in `src/effect/*.ts` carry it in their signatures, so
 * declaration emit names it for the published `samva/effect/*` entrypoints.
 */
export interface OperationOptions {
  readonly idempotencyKey?: string | undefined;
}

/**
 * What one operation wrapper reads at runtime. `codegen/generate-registry.ts` emits a table of these
 * beside each domain, so a focused entry carries its own operations' descriptors and not the API's.
 */
interface OperationDescriptor {
  readonly group: string;
  readonly method: string;
  readonly idempotent: boolean;
  readonly idempotentWhen?: { readonly field: string; readonly equals: string } | undefined;
  readonly paginated: boolean;
  readonly call: { readonly kind: string; readonly paths?: ReadonlyArray<string> | undefined };
}

export type OperationDescriptors = Readonly<Record<string, OperationDescriptor>>;

type OperationFunction<Name extends SdkOperation> = (typeof SDK_OPERATION_CALLS)[Name] extends {
  readonly kind: "none";
}
  ? (input?: never, options?: OperationOptions) => OperationResult<Name>
  : {} extends Input<Name>
    ? (input?: Input<Name>, options?: OperationOptions) => OperationResult<Name>
    : (input: Input<Name>, options?: OperationOptions) => OperationResult<Name>;

type EnvelopeItem<A> = A extends { readonly items: ReadonlyArray<infer Item> } ? Item : never;
type IsPaginated<A> = [A] extends [
  { readonly items: ReadonlyArray<unknown>; readonly nextCursor: string | null },
]
  ? true
  : false;

type PaginationCompanions<Parameters, A, E, R> = {} extends Parameters
  ? {
      readonly pages: (input?: Parameters) => Stream.Stream<A, E, R>;
      readonly items: (input?: Parameters) => Stream.Stream<EnvelopeItem<A>, E, R>;
    }
  : {
      readonly pages: (input: Parameters) => Stream.Stream<A, E, R>;
      readonly items: (input: Parameters) => Stream.Stream<EnvelopeItem<A>, E, R>;
    };

type WithPagination<Method> = Method extends (
  input: infer Parameters,
) => Effect.Effect<infer A, infer E, infer R>
  ? IsPaginated<A> extends true
    ? Method & PaginationCompanions<Parameters, A, E, R>
    : Method
  : Method;

const traceName = (descriptor: OperationDescriptor, operationName: SdkOperation): string => {
  const moduleName = descriptor.group
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
  const prefix = moduleName.charAt(0).toLowerCase() + moduleName.slice(1);
  if (!operationName.startsWith(prefix)) return `Samva.${operationName}`;
  const method = operationName.slice(prefix.length);
  return `${moduleName}.${method.charAt(0).toLowerCase()}${method.slice(1)}`;
};

export const stripUndefined = <Value>(input: Value): Value => {
  if (!Predicate.isObject(input)) return input;
  if (Array.isArray(input)) return input.map(stripUndefined) as Value;
  if (Object.getPrototypeOf(input) !== Object.prototype) return input;
  return Object.fromEntries(
    Object.entries(input as Record<string, unknown>)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, stripUndefined(value)]),
  ) as Value;
};

type PathDescriptor = { readonly kind: string; readonly paths: ReadonlyArray<string> };

const adapt = (
  descriptor: OperationDescriptor,
  operationName: SdkOperation,
  rawCall: (request?: unknown) => Effect.Effect<unknown, unknown, Service>,
  input: unknown,
  idempotencyKey: string | undefined,
): Effect.Effect<unknown, unknown, Service> => {
  const callDescriptor = descriptor.call;
  const call = (request: Record<string, unknown> = {}) => {
    const operation = rawCall({
      ...request,
      // HttpApi validates a declared headers object even when every header is optional.
      headers: {
        ...(request["headers"] as Readonly<Record<string, string>> | undefined),
        ...(idempotencyKey === undefined ? {} : { "idempotency-key": idempotencyKey }),
      },
    });
    return isRetrySafe(descriptor, input) ? withRetry(operation) : operation;
  };

  if (callDescriptor.kind === "none") return call();
  if (callDescriptor.kind === "params") return call({ query: stripUndefined(input ?? {}) });
  if (callDescriptor.kind === "payload") return call({ payload: stripUndefined(input ?? {}) });

  const pathDescriptor = callDescriptor as PathDescriptor;
  const inputRecord = (input ?? {}) as Readonly<Record<string, unknown>>;
  const params: Record<string, unknown> = {};
  for (const path of pathDescriptor.paths) {
    if (inputRecord[path] === undefined) {
      return Effect.die(new Error(`${operationName} requires path field ${path}`));
    }
    params[path] = inputRecord[path];
  }
  if (pathDescriptor.kind === "path") return call({ params });

  const remainingInput = stripUndefined(
    Object.fromEntries(
      Object.entries(inputRecord).filter(([key]) => !pathDescriptor.paths.includes(key)),
    ),
  );
  return call({
    params,
    [pathDescriptor.kind === "pathParams" ? "query" : "payload"]: remainingInput,
  });
};

const isCursorPageEnvelope = (value: unknown): value is CursorPageEnvelope<unknown> =>
  Predicate.isObject(value) &&
  Array.isArray(value.items) &&
  (value.nextCursor === null || typeof value.nextCursor === "string");

/**
 * Operation factory for one API group. Each domain module binds its own group and descriptor table,
 * so importing it loads that group's schemas and metadata and nothing else.
 */
export const forGroup =
  (group: HttpApiGroup.Constraint, descriptors: OperationDescriptors) =>
  <Name extends SdkOperation>(operationName: Name): WithPagination<OperationFunction<Name>> => {
    const descriptor = descriptors[operationName];
    if (descriptor === undefined) {
      throw new Error(`${operationName} has no descriptor in this entry`);
    }
    if (descriptor.group !== group.identifier) {
      throw new Error(`${operationName} is not an endpoint of ${group.identifier}`);
    }
    return make(group, operationName, descriptor);
  };

/** Call one endpoint with an already-shaped request, outside the direct-operation adapter. */
export const callEndpoint = <Name extends SdkOperation>(
  group: HttpApiGroup.Constraint,
  name: Name,
  request: unknown,
): OperationResult<Name> =>
  Effect.flatMap(Service, (client) =>
    Effect.flatMap(client.endpoint(group, name), (call) => call(request)),
  );

const make = <Name extends SdkOperation>(
  group: HttpApiGroup.Constraint,
  operationName: Name,
  descriptor: OperationDescriptor,
): WithPagination<OperationFunction<Name>> => {
  const call = Effect.fn(traceName(descriptor, operationName))(function* (
    input?: unknown,
    options?: OperationOptions,
  ) {
    const client = yield* Service;
    const rawCall = yield* client.endpoint(group, operationName);
    const idempotencyKey = descriptor.idempotent
      ? (options?.idempotencyKey ??
        client.idempotency?.(operationName) ??
        (yield* generateIdempotencyKey))
      : undefined;
    return yield* adapt(descriptor, operationName, rawCall, input, idempotencyKey);
  });
  const operation = call as OperationFunction<Name>;

  if (descriptor.paginated) {
    const list = (input: unknown): Effect.Effect<CursorPageEnvelope<unknown>, unknown, Service> =>
      Effect.filterOrElse(call(input), isCursorPageEnvelope, () =>
        Effect.die(new Error(`${operationName} did not return a cursor page envelope`)),
      );
    Object.assign(operation, {
      pages: (input?: unknown) => streamCursorPages(list, input ?? {}),
      items: (input?: unknown) => streamCursorItems(list, input ?? {}),
    });
  }

  return operation as WithPagination<OperationFunction<Name>>;
};
