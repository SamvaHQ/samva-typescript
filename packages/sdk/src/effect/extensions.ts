import { ExtensionsGroup } from "./generated/extensions";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(ExtensionsGroup);

export const list = /* @__PURE__ */ make("extensionsList");
export const publish = /* @__PURE__ */ make("extensionsPublish");
export const get = /* @__PURE__ */ make("extensionsGet");
export const listVersions = /* @__PURE__ */ make("extensionsListVersions");
export const getVersion = /* @__PURE__ */ make("extensionsGetVersion");
