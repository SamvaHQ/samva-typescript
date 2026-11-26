import { Context, Effect, Layer, Predicate, Redacted } from "effect";
import {
  HttpApi,
  HttpApiClient,
  type HttpApiEndpoint,
  type HttpApiGroup,
  HttpApiMiddleware,
} from "effect/http-api";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";

import { CLIENT_ATTRIBUTION_HEADER, clientAttribution } from "../../client-attribution";
import { MediaUploadError, uploadContentType } from "../../inline-attachments";
import type { MailboxEventStreamConnection } from "../../mailbox-events";
import { samvaRequestId, withRequestIdMessage } from "../../request-id";
import {
  DEFAULT_UPLOAD_TIMEOUT_MS,
  resolveTimeout,
  type TimeoutSetting,
  validateTimeout,
} from "../../request-policy";
import type { SamvaApi } from "../generated/index";
import { ApiKeySecurityMiddleware } from "../generated/shared";
import { type SamvaTimeoutError, withTimeout } from "./timeout";

const DEFAULT_BASE_URL = "https://api.samva.dev";

export interface ConfigBase {
  readonly baseUrl?: string;
  /** Generate the key once for each idempotent logical call. */
  readonly idempotency?: ((operation: string) => string | undefined) | undefined;
  readonly headers?: Readonly<Record<string, string | undefined>>;
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

export type Config =
  | (ConfigBase & {
      readonly apiKey: string | Redacted.Redacted<string>;
      readonly authToken?: never;
      readonly orgSlug?: never;
    })
  | (ConfigBase & {
      readonly authToken: string;
      readonly orgSlug?: string;
      readonly apiKey?: never;
    });

type Api = HttpApiClient.ForApi<typeof SamvaApi>;

type UnionToIntersection<Union> = (Union extends unknown ? (arg: Union) => void : never) extends (
  arg: infer Intersection,
) => void
  ? Intersection
  : never;

type FlattenGroups<Client> = {
  [Group in keyof Client]: {
    [Endpoint in keyof Client[Group]]: Client[Group][Endpoint];
  };
}[keyof Client];

export type FlatRaw = UnionToIntersection<FlattenGroups<Api>>;
export type Operation = keyof FlatRaw & string;

type ApiEndpoints = HttpApiGroup.Endpoints<
  (typeof SamvaApi)["groups"][keyof (typeof SamvaApi)["groups"]]
>;

type OperationSuccess<Name extends Operation> = HttpApiClient.SuccessType<
  HttpApiEndpoint.Success<Extract<ApiEndpoints, { readonly identifier: Name }>>
>;

type MethodReturn<Method> = Method extends (...args: infer _Args) => infer Return ? Return : never;

/** What one operation wrapper returns: the endpoint's decoded success and typed failure. */
export type OperationResult<Name extends Operation> = Effect.Effect<
  OperationSuccess<Name>,
  Effect.Error<MethodReturn<FlatRaw[Name]>> | SamvaTimeoutError,
  Service
>;

type RawCall = (request?: unknown) => Effect.Effect<unknown, unknown>;

/** The generated call for one endpoint, with its decoded success and typed failure. */
type OperationCall<Name extends Operation> = (request?: unknown) => OperationResult<Name>;

export interface Interface {
  readonly idempotency?: ((operation: string) => string | undefined) | undefined;
  /** The client's per-attempt request bound; `undefined` means the default, `null` none. */
  readonly timeoutMs?: number | null | undefined;
  /**
   * The generated call for one endpoint. A group's client is built on the first call to any of its
   * endpoints and reused, so a group the program never calls costs nothing.
   */
  readonly endpoint: <Name extends Operation>(
    group: HttpApiGroup.Constraint,
    name: Name,
  ) => Effect.Effect<OperationCall<Name>>;
  /** The origin and headers a connection outside HTTP requests, such as the event stream, uses. */
  readonly connection: MailboxEventStreamConnection;
  /**
   * Put bytes at a presigned storage URL through the configured transport, replaying the
   * instruction's headers exactly and sending no API credentials. Fails with the response status
   * (or the transport error, or a `SamvaTimeoutError` past the upload bound) as
   * `MediaUploadError`. `timeoutMs` overrides the client's `uploadTimeoutMs`.
   */
  readonly putUpload: (input: {
    readonly filename: string;
    readonly mediaId: string;
    readonly url: string;
    readonly method: string;
    readonly headers: Readonly<Record<string, string>>;
    readonly bytes: Uint8Array;
    readonly timeoutMs?: TimeoutSetting;
  }) => Effect.Effect<void, MediaUploadError>;
}

export class Service extends Context.Service<Service, Interface>()("samva/Client") {}

type GroupClient = Readonly<Record<string, RawCall>>;

const authHeaders = (config: Config): Readonly<Record<string, string>> =>
  config.authToken !== undefined
    ? {
        Authorization: `Bearer ${config.authToken}`,
        ...(config.orgSlug === undefined ? {} : { "x-org-slug": config.orgSlug }),
      }
    : {
        "x-api-key": Redacted.isRedacted(config.apiKey)
          ? Redacted.value(config.apiKey)
          : config.apiKey,
      };

const AuthorizationClient = HttpApiMiddleware.layerClient(
  ApiKeySecurityMiddleware,
  ({ next, request }) => next(request),
);

const ResponseRequestId = Context.Reference<{ value: string | undefined } | undefined>(
  "samva/ResponseRequestId",
  { defaultValue: () => undefined },
);

const withResponseRequestId = <A, E, R>(effect: Effect.Effect<A, E, R>) =>
  Effect.suspend(() => {
    const requestId: { value: string | undefined } = { value: undefined };
    return effect.pipe(
      Effect.mapError((error) => {
        if (
          requestId.value === undefined ||
          !Predicate.isObject(error) ||
          typeof error.message !== "string"
        )
          return error;
        Object.defineProperties(error, {
          requestId: { value: requestId.value, enumerable: true, configurable: true },
          message: {
            value: withRequestIdMessage(error.message, requestId.value),
            configurable: true,
          },
        });
        return error;
      }),
      Effect.provideService(ResponseRequestId, requestId),
    );
  });

const make = (config: Config): Effect.Effect<Interface, never, HttpClient.HttpClient> =>
  Effect.gen(function* () {
    const baseUrl = config.baseUrl ?? DEFAULT_BASE_URL;
    const removesAttribution = Object.entries(config.headers ?? {}).some(
      ([name, value]) => name.toLowerCase() === CLIENT_ATTRIBUTION_HEADER && value === undefined,
    );
    const requestHeaders = Object.fromEntries(
      Object.entries(config.headers ?? {}).filter(
        ([name]) => name.toLowerCase() !== "idempotency-key",
      ),
    );
    const storage = yield* HttpClient.HttpClient;
    const httpClient = storage.pipe(
      HttpClient.tap((response) =>
        Effect.map(ResponseRequestId, (requestId) => {
          if (requestId !== undefined)
            requestId.value = samvaRequestId(response.headers["x-samva-request-id"]);
        }),
      ),
      HttpClient.mapRequest((request) => {
        let attributed = HttpClientRequest.setHeader(
          request,
          CLIENT_ATTRIBUTION_HEADER,
          clientAttribution("typescript-effect"),
        );
        attributed = HttpClientRequest.setHeaders(attributed, requestHeaders);
        if (removesAttribution) {
          attributed = HttpClientRequest.removeHeader(attributed, CLIENT_ATTRIBUTION_HEADER);
        }
        return HttpClientRequest.setHeaders(attributed, authHeaders(config));
      }),
    );

    // Two fibers racing a group's first call may each build it; both results are equivalent.
    const groups = new Map<string, GroupClient>();
    const groupClient = (group: HttpApiGroup.Constraint): Effect.Effect<GroupClient> => {
      const built = groups.get(group.identifier);
      if (built !== undefined) return Effect.succeed(built);
      return HttpApiClient.group(
        HttpApi.make("SamvaApi")
          .add(group)
          // The deployed API refuses a body field its endpoint does not declare. Encoding with the
          // same option fails here, naming the field, instead of dropping it and reading the
          // server's success as an update that applied.
          .annotate(HttpApi.PayloadParseOptions, { onExcessProperty: "error" }),
        {
          group: group.identifier,
          httpClient,
          baseUrl,
        },
      ).pipe(
        Effect.provide(AuthorizationClient),
        Effect.map((client) => {
          const calls: GroupClient = client;
          groups.set(group.identifier, calls);
          return calls;
        }),
      );
    };

    const headers: Record<string, string> = removesAttribution
      ? {}
      : { [CLIENT_ATTRIBUTION_HEADER]: clientAttribution("typescript-effect") };
    for (const [name, value] of Object.entries(requestHeaders)) {
      if (value !== undefined) headers[name] = value;
    }

    const putUpload: Interface["putUpload"] = (input) =>
      withTimeout(
        storage.execute(
          HttpClientRequest.make(input.method as "PUT")(input.url).pipe(
            HttpClientRequest.bodyUint8Array(input.bytes, uploadContentType(input.headers)),
            HttpClientRequest.setHeaders(input.headers),
          ),
        ),
        resolveTimeout(
          "uploadTimeoutMs",
          input.timeoutMs,
          config.uploadTimeoutMs,
          DEFAULT_UPLOAD_TIMEOUT_MS,
        ),
      ).pipe(
        Effect.mapError(
          (cause) =>
            new MediaUploadError({ filename: input.filename, mediaId: input.mediaId, cause }),
        ),
        Effect.flatMap((response) =>
          response.status >= 200 && response.status < 300
            ? Effect.void
            : Effect.fail(
                new MediaUploadError({
                  filename: input.filename,
                  mediaId: input.mediaId,
                  status: response.status,
                }),
              ),
        ),
      );

    return Service.of({
      idempotency: config.idempotency,
      timeoutMs: config.timeoutMs,
      putUpload,
      endpoint: (group, name) =>
        Effect.flatMap(groupClient(group), (client) => {
          const call = client[name];
          return call === undefined
            ? Effect.die(new Error(`${name} is not an endpoint of ${group.identifier}`))
            : // The group client is a heterogeneous record keyed by endpoint name, so the
              // lookup erases the endpoint's own success and failure types.
              Effect.succeed(((request) => withResponseRequestId(call(request))) as OperationCall<
                typeof name
              >);
        }),
      connection: {
        baseUrl,
        headers: { ...headers, ...authHeaders(config) },
      },
    });
  });

/** Throws a `RangeError` for an invalid `timeoutMs` or `uploadTimeoutMs`, as the Promise client does. */
export const layer = (config: Config): Layer.Layer<Service, never, HttpClient.HttpClient> => {
  validateTimeout("timeoutMs", config.timeoutMs);
  validateTimeout("uploadTimeoutMs", config.uploadTimeoutMs);
  return Layer.effect(Service, make(config));
};

export const layerFetch = (config: Config): Layer.Layer<Service> =>
  layer(config).pipe(Layer.provide(FetchHttpClient.layer));
