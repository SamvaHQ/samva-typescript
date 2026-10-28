import { type Brand, Effect, Predicate, Redacted, Stream } from "effect";
import type { HttpApiGroup } from "effect/http-api";

import { isRetrySafe } from "../../request-policy";
import { SDK_OPERATION_CALLS } from "../../service-map";
import { SamvaOperations } from "../generated-metadata";
import { type CursorPageEnvelope, streamCursorItems, streamCursorPages } from "../pagination";
import { generateIdempotencyKey, withRetry } from "../retry";
import {
  type FlatRaw,
  type Operation,
  type OperationSuccess,
  type RawCall,
  Service,
} from "./client";

export type SdkOperation = keyof typeof SDK_OPERATION_CALLS & Operation;
type MethodReturn<Method> = Method extends (...args: infer _Args) => infer Return ? Return : never;

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

export interface OperationOptions {
  readonly idempotencyKey?: string | undefined;
}

export type OperationResult<Name extends SdkOperation> = Effect.Effect<
  OperationSuccess<Name>,
  Effect.Error<MethodReturn<FlatRaw[Name]>>,
  Service
>;

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

const MODULE_NAMES = {
  agents: "Agents",
  analytics: "Analytics",
  apiKeys: "ApiKeys",
  attachments: "Attachments",
  brands: "Brands",
  campaigns: "Campaigns",
  contactGroups: "ContactGroups",
  contacts: "Contacts",
  conversations: "Conversations",
  customFields: "CustomFields",
  email: "Email",
  extensions: "Extensions",
  feedback: "Feedback",
  mailboxes: "Mailboxes",
  media: "Media",
  messages: "Messages",
  namespaces: "Namespaces",
  operations: "Operations",
  organizations: "Organizations",
  scheduledMessages: "ScheduledMessages",
  templates: "Templates",
  topics: "Topics",
  webhooks: "Webhooks",
  whoami: "Whoami",
} as const;

const traceName = (operationName: SdkOperation): string => {
  for (const [prefix, moduleName] of Object.entries(MODULE_NAMES)) {
    if (!operationName.startsWith(prefix)) continue;
    const method = operationName.slice(prefix.length);
    return `${moduleName}.${method[0]!.toLowerCase()}${method.slice(1)}`;
  }
  return `Samva.${operationName}`;
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
  operationName: SdkOperation,
  rawCall: RawCall,
  input: unknown,
  idempotencyKey: string | undefined,
): Effect.Effect<unknown, unknown> => {
  const descriptor = SDK_OPERATION_CALLS[operationName];
  const call = (request: Record<string, unknown> = {}) => {
    const operation = rawCall({
      ...request,
      ...(idempotencyKey === undefined ? {} : { headers: { "idempotency-key": idempotencyKey } }),
    });
    return isRetrySafe(operationName, input) ? withRetry(operation) : operation;
  };

  if (descriptor.kind === "none") return call();
  if (descriptor.kind === "params") return call({ query: stripUndefined(input ?? {}) });
  if (descriptor.kind === "payload") return call({ payload: stripUndefined(input ?? {}) });

  const pathDescriptor = descriptor as PathDescriptor;
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
 * Operation factory for one API group. Each domain module binds its own group, so importing it
 * loads that group's schemas and nothing else.
 */
export const forGroup =
  (group: HttpApiGroup.Constraint) =>
  <Name extends SdkOperation>(operationName: Name): WithPagination<OperationFunction<Name>> => {
    if (SamvaOperations[operationName].group !== group.identifier) {
      throw new Error(`${operationName} is not an endpoint of ${group.identifier}`);
    }
    return make(group, operationName);
  };

/** Call one endpoint with an already-shaped request, outside the direct-operation adapter. */
export const callEndpoint = (
  group: HttpApiGroup.Constraint,
  name: SdkOperation,
  request: unknown,
): Effect.Effect<unknown, unknown, Service> =>
  Effect.flatMap(Service, (client) =>
    Effect.flatMap(client.endpoint(group, name), (call) => call(request)),
  );

const make = <Name extends SdkOperation>(
  group: HttpApiGroup.Constraint,
  operationName: Name,
): WithPagination<OperationFunction<Name>> => {
  const call = Effect.fn(traceName(operationName))(function* (
    input?: unknown,
    options?: OperationOptions,
  ) {
    const client = yield* Service;
    const rawCall = yield* client.endpoint(group, operationName);
    const idempotencyKey = SamvaOperations[operationName].idempotent
      ? (options?.idempotencyKey ??
        client.idempotency?.(operationName) ??
        (yield* generateIdempotencyKey))
      : undefined;
    return yield* adapt(operationName, rawCall, input, idempotencyKey);
  });
  const operation = call as OperationFunction<Name>;

  if (SamvaOperations[operationName].paginated) {
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
