/**
 * Samva Effect client capability.
 *
 * Provide {@link layer} when the application already owns an `HttpClient`, or
 * {@link layerFetch} for the standard Fetch transport. Domain modules obtain
 * the generated OpenAPI client through {@link Service}; callers do not need to
 * construct or thread a client object through their programs.
 */
export {
  type Config,
  type ConfigBase,
  type Interface,
  Service,
  layer,
  layerFetch,
} from "./internal/client";
