import { Context, Effect, Exit, Predicate, Schema } from "effect";
import { HttpApi, type HttpApiEndpoint, type HttpApiGroup } from "effect/http-api";

import type * as GeneratedSchemas from "../../src/effect/generated";

// HttpApiSchema.status erases its literal; generated response schema exports retain it in their names.
type ResponseStatus<
  Name extends string,
  Prefix extends string,
> = Name extends `${Prefix}${infer Status extends number}`
  ? `${Status}` extends `2${string}`
    ? Status
    : never
  : never;
type DeclaredStatus<
  G extends HttpApiGroup.Constraint,
  E extends HttpApiEndpoint.Constraint,
> = ResponseStatus<
  Extract<
    keyof typeof GeneratedSchemas,
    `${Capitalize<E["identifier"]> | `${Capitalize<G["identifier"]>}${Capitalize<E["identifier"]>}`}${number}`
  >,
  Capitalize<E["identifier"]> | `${Capitalize<G["identifier"]>}${Capitalize<E["identifier"]>}`
>;
type Handler<E extends HttpApiEndpoint.Constraint> = (
  input: Omit<HttpApiEndpoint.Request<E>, "request" | "endpoint" | "group">,
) => Effect.Effect<HttpApiEndpoint.Success<E>["Type"], HttpApiEndpoint.Errors<E>>;
type GroupScripts<Groups extends HttpApiGroup.Constraint> = {
  readonly [G in Groups as G["identifier"]]?: {
    readonly [Name in keyof G["endpoints"]]?:
      | Handler<G["endpoints"][Name]>
      | {
          readonly status: DeclaredStatus<G, G["endpoints"][Name]>;
          readonly handle: Handler<G["endpoints"][Name]>;
        };
  };
};

/** Scripts keep the owning API's decoded request and response types. */
export type ApiScripts<Api> =
  Api extends HttpApi.HttpApi<infer _Id, infer Groups> ? GroupScripts<Groups> : never;

export interface ApiRequest {
  readonly group: string;
  readonly operation: string;
  readonly method: string;
  readonly path: string;
  readonly params: Readonly<Record<string, string>>;
  readonly query: Readonly<Record<string, string | string[]>>;
  readonly body: unknown;
  readonly headers: Headers;
}

// Reflection erases service requirements; the transport runs scripts and codecs without app services.
const scriptContext = Context.makeUnsafe<unknown>(new Map());
const decode = (schema: Schema.Top, input: unknown) =>
  Effect.runSyncWith(scriptContext)(Schema.decodeEffect(schema)(input));

/** A fetch transport for real generated clients, with contract-owned codecs on both sides. */
export const fakeSamvaApi =
  <Id extends string, Groups extends HttpApiGroup.Constraint>(api: HttpApi.HttpApi<Id, Groups>) =>
  (scripts: GroupScripts<Groups>) => {
    const requests: ApiRequest[] = [];
    const violations: Array<{ readonly request: string; readonly error: unknown }> = [];
    const routes: Array<{
      readonly method: string;
      readonly match: RegExp;
      readonly keys: string[];
      readonly serve: (request: Request, params: Record<string, string>) => Promise<Response>;
    }> = [];
    HttpApi.reflect(api, {
      onGroup: () => undefined,
      onEndpoint: ({ group, endpoint, successes, errors }) => {
        const keys: string[] = [];
        const match = new RegExp(
          `^${endpoint.path.replace(/\/$/, "").replace(/:([^/]+)/g, (_, key: string) => {
            keys.push(key);
            return "([^/]+)";
          })}/?$`,
        );
        routes.push({
          method: endpoint.method,
          match,
          keys,
          serve: async (request, params) => {
            const url = new URL(request.url);
            const query: Record<string, string | string[]> = {};
            for (const key of url.searchParams.keys()) {
              const values = url.searchParams.getAll(key);
              query[key] = values.length === 1 ? (values[0] ?? "") : values;
            }
            const text = await request.text();
            const body: unknown = text === "" ? undefined : JSON.parse(text);
            requests.push({
              group: group.identifier,
              operation: endpoint.identifier,
              method: request.method,
              path: url.pathname,
              params,
              query,
              body,
              headers: request.headers,
            });
            const groupScripts: unknown = Reflect.get(scripts, group.identifier);
            const script: unknown = Predicate.isObject(groupScripts)
              ? Reflect.get(groupScripts, endpoint.identifier)
              : undefined;
            const handler: unknown = Predicate.isObject(script)
              ? Reflect.get(script, "handle")
              : script;
            const status: unknown = Predicate.isObject(script)
              ? Reflect.get(script, "status")
              : undefined;
            if (status !== undefined && typeof status !== "number")
              throw new Error("Script success status must be a number");
            if (typeof handler !== "function") {
              const message = `Unscripted Samva API call: ${request.method} ${url.pathname} (${group.identifier}.${endpoint.identifier})`;
              throw new Error(message);
            }
            const input: Record<string, unknown> = {};
            if (endpoint.params) input.params = decode(endpoint.params, params);
            if (endpoint.query)
              input.query = decode(Schema.toCodecArrayFromSingle(endpoint.query), query);
            if (endpoint.headers)
              input.headers = decode(endpoint.headers, Object.fromEntries(request.headers));
            const payload = endpoint.payload.get("application/json");
            if (payload) input.payload = decode(Schema.Union(payload.schemas), body);
            const effect: unknown = handler(input);
            if (!Effect.isEffect(effect))
              throw new Error(
                `Script for ${group.identifier}.${endpoint.identifier} must return an Effect`,
              );
            const exit = await Effect.runPromiseExitWith(scriptContext)(effect, {
              signal: request.signal,
            });
            if (Exit.isSuccess(exit)) return encode(successes, exit.value, status);
            const failure = exit.cause.reasons.find((reason) => reason._tag === "Fail");
            if (failure?._tag === "Fail") return encode(errors, failure.error);
            throw new Error(`API script defect: ${String(exit.cause)}`);
          },
        });
      },
    });
    routes.sort((left, right) => left.keys.length - right.keys.length);
    const fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const request = new Request(input, init);
      try {
        const path = new URL(request.url).pathname;
        for (const route of routes) {
          if (route.method !== request.method) continue;
          const match = route.match.exec(path);
          if (!match) continue;
          const params = Object.fromEntries(
            route.keys.map((key, index) => [key, decodeURIComponent(match[index + 1] ?? "")]),
          );
          return await route.serve(request, params);
        }
        throw new Error(`Unknown Samva API route: ${request.method} ${path}`);
      } catch (error) {
        if (!request.signal.aborted) {
          violations.push({ request: `${request.method} ${request.url}`, error });
        }
        throw error;
      }
    };
    return {
      fetch,
      requests,
      assertComplete: () => {
        if (violations.length) {
          throw new Error(
            violations.map(({ request, error }) => `${request}: ${String(error)}`).join("\n"),
          );
        }
      },
    };
  };

const encode = (
  responses: ReadonlyMap<number, readonly [Schema.Top, ...Schema.Top[]]>,
  value: unknown,
  selectedStatus?: number,
): Response => {
  if (selectedStatus !== undefined && !responses.has(selectedStatus)) {
    throw new Error(`Undeclared API success status: ${selectedStatus}`);
  }
  const failures: unknown[] = [];
  for (const [status, schemas] of responses) {
    if (selectedStatus !== undefined && status !== selectedStatus) continue;
    for (const schema of schemas) {
      const result = Effect.runSyncExitWith(scriptContext)(Schema.encodeEffect(schema)(value));
      if (Exit.isFailure(result)) {
        failures.push(result.cause);
        continue;
      }
      return new Response(status === 204 ? null : JSON.stringify(result.value), {
        status,
        headers: { "content-type": "application/json" },
      });
    }
  }
  throw new Error(`API script returned a value outside its contract: ${String(failures)}`);
};
