import { PoliciesGroup } from "./generated/policies";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(PoliciesGroup);

export const getPolicy = /* @__PURE__ */ make("policiesGetPolicy");
export const setPolicy = /* @__PURE__ */ make("policiesSetPolicy");
export const deletePolicy = /* @__PURE__ */ make("policiesDeletePolicy");
