import PackageJson from "../package.json" with { type: "json" };

const SDK_VERSION = PackageJson.version;
export const CLIENT_ATTRIBUTION_HEADER = "x-samva-client";

export const clientAttribution = (surface: "typescript-promise" | "typescript-effect"): string =>
  `${surface}/${SDK_VERSION}`;
