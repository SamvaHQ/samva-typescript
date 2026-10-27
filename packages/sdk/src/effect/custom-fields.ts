import { CustomFieldsGroup } from "./generated/custom-fields";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(CustomFieldsGroup);

export const list = /* @__PURE__ */ make("customFieldsList");
export const create = /* @__PURE__ */ make("customFieldsCreate");
export const update = /* @__PURE__ */ make("customFieldsUpdate");
export const remove = /* @__PURE__ */ make("customFieldsRemove");
