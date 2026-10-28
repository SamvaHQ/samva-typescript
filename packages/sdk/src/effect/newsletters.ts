import { NewslettersGroup } from "./generated/newsletters";
import { forGroup } from "./internal/operation";
const make = /* @__PURE__ */ forGroup(NewslettersGroup);
export const list = /* @__PURE__ */ make("newslettersList");
export const get = /* @__PURE__ */ make("newslettersGet");
export const create = /* @__PURE__ */ make("newslettersCreate");
export const update = /* @__PURE__ */ make("newslettersUpdate");
export const remove = /* @__PURE__ */ make("newslettersRemove");
