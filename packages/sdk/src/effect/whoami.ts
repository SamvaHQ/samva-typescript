import { WhoamiGroup } from "./generated/whoami";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(WhoamiGroup);

export const get = /* @__PURE__ */ make("whoamiGet");
