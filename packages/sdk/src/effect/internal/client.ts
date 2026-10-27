import { Context, Effect, Layer, Redacted } from "effect";
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
import type { SamvaApi } from "../generated/index";
import { ApiKeySecurityMiddleware } from "../generated/shared";

const DEFAULT_BASE_URL = "https://api.samva.dev";

export interface ConfigBase {
  readonly baseUrl?: string;
  readonly headers?: Readonly<Record<string, string | undefined>>;
}

export type Config =
  | (ConfigBase & {
      readonly apiKey: string | Redacted.Redacted<string>;
      readonly authToken?: never;
    })
  | (ConfigBase & {
      readonly authToken: string;
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

export type OperationSuccess<Name extends Operation> = HttpApiClient.SuccessType<
  HttpApiEndpoint.Success<Extract<ApiEndpoints, { readonly identifier: Name }>>
>;

export type RawCall = (request?: unknown) => Effect.Effect<unknown, unknown>;

export interface Interface {
  /**
   * The generated call for one endpoint. A group's client is built on the first call to any of its
   * endpoints and reused, so a group the program never calls costs nothing.
   */
  readonly endpoint: (group: HttpApiGroup.Constraint, name: Operation) => Effect.Effect<RawCall>;
  /** The origin and headers a connection outside HTTP requests, such as the event stream, uses. */
  readonly connection: MailboxEventStreamConnection;
  /**
   * Put bytes at a presigned storage URL through the configured transport, replaying the
   * instruction's headers exactly and sending no API credentials. Fails with the response status
   * (or the transport error) as `MediaUploadError`.
   */
  readonly putUpload: (input: {
    readonly filename: string;
    readonly mediaId: string;
    readonly url: string;
    readonly method: string;
    readonly headers: Readonly<Record<string, string>>;
    readonly bytes: Uint8Array;
  }) => Effect.Effect<void, MediaUploadError>;
}

export class Service extends Context.Service<Service, Interface>()("samva/Client") {}

type GroupClient = Readonly<Record<string, RawCall>>;

const authHeaders = (config: Config): Readonly<Record<string, string>> =>
  config.authToken !== undefined
    ? { Authorization: `Bearer ${config.authToken}` }
    : {
        "x-api-key": Redacted.isRedacted(config.apiKey)
          ? Redacted.value(config.apiKey)
          : config.apiKey,
      };

const AuthorizationClient = HttpApiMiddleware.layerClient(
  ApiKeySecurityMiddleware,
  ({ next, request }) => next(request),
);

const make = (config: Config): Effect.Effect<Interface, never, HttpClient.HttpClient> =>
  Effect.gen(function* () {
    const baseUrl = config.baseUrl ?? DEFAULT_BASE_URL;
    const removesAttribution = Object.entries(config.headers ?? {}).some(
      ([name, value]) => name.toLowerCase() === CLIENT_ATTRIBUTION_HEADER && value === undefined,
    );
    const storage = yield* HttpClient.HttpClient;
    const httpClient = storage.pipe(
      HttpClient.mapRequest((request) => {
        let attributed = HttpClientRequest.setHeader(
          request,
          CLIENT_ATTRIBUTION_HEADER,
          clientAttribution("typescript-effect"),
        );
        if (config.headers !== undefined) {
          attributed = HttpClientRequest.setHeaders(attributed, config.headers);
        }
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
      return HttpApiClient.group(HttpApi.make("SamvaApi").add(group), {
        group: group.identifier,
        httpClient,
        baseUrl,
      }).pipe(
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
    for (const [name, value] of Object.entries(config.headers ?? {})) {
      if (value !== undefined) headers[name] = value;
    }

    const putUpload: Interface["putUpload"] = (input) =>
      storage
        .execute(
          HttpClientRequest.make(input.method as "PUT")(input.url).pipe(
            HttpClientRequest.bodyUint8Array(input.bytes, uploadContentType(input.headers)),
            HttpClientRequest.setHeaders(input.headers),
          ),
        )
        .pipe(
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
      putUpload,
      endpoint: (group, name) =>
        Effect.flatMap(groupClient(group), (client) => {
          const call = client[name];
          return call === undefined
            ? Effect.die(new Error(`${name} is not an endpoint of ${group.identifier}`))
            : Effect.succeed(call);
        }),
      connection: {
        baseUrl,
        headers: { ...headers, ...authHeaders(config) },
      },
    });
  });

export const layer = (config: Config): Layer.Layer<Service, never, HttpClient.HttpClient> =>
  Layer.effect(Service, make(config));

export const layerFetch = (config: Config): Layer.Layer<Service> =>
  layer(config).pipe(Layer.provide(FetchHttpClient.layer));
