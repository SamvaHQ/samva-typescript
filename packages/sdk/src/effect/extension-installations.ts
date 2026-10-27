import { ExtensionInstallationsGroup } from "./generated/extension-installations";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(ExtensionInstallationsGroup);

export const list = /* @__PURE__ */ make("extensionInstallationsList");
export const install = /* @__PURE__ */ make("extensionInstallationsInstall");
export const upgrade = /* @__PURE__ */ make("extensionInstallationsUpgrade");
export const get = /* @__PURE__ */ make("extensionInstallationsGet");
export const uninstall = /* @__PURE__ */ make("extensionInstallationsUninstall");
export const disable = /* @__PURE__ */ make("extensionInstallationsDisable");
export const enable = /* @__PURE__ */ make("extensionInstallationsEnable");
export const listRuns = /* @__PURE__ */ make("extensionInstallationsListRuns");
export const getRun = /* @__PURE__ */ make("extensionInstallationsGetRun");
