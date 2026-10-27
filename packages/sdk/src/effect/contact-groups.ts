import { ContactGroupsGroup } from "./generated/contact-groups";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(ContactGroupsGroup);

export const list = /* @__PURE__ */ make("contactGroupsList");
export const create = /* @__PURE__ */ make("contactGroupsCreate");
export const getById = /* @__PURE__ */ make("contactGroupsGetById");
export const update = /* @__PURE__ */ make("contactGroupsUpdate");
export const remove = /* @__PURE__ */ make("contactGroupsRemove");
export const preview = /* @__PURE__ */ make("contactGroupsPreview");
export const evaluateDynamic = /* @__PURE__ */ make("contactGroupsEvaluateDynamic");
export const getMembers = /* @__PURE__ */ make("contactGroupsGetMembers");
export const addMembers = /* @__PURE__ */ make("contactGroupsAddMembers");
export const removeMembers = /* @__PURE__ */ make("contactGroupsRemoveMembers");
