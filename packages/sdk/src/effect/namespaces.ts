import { NamespacesGroup } from "./generated/namespaces";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(NamespacesGroup);

export const list = /* @__PURE__ */ make("namespacesList");
export const create = /* @__PURE__ */ make("namespacesCreate");
export const get = /* @__PURE__ */ make("namespacesGet");
export const update = /* @__PURE__ */ make("namespacesUpdate");
export const remove = /* @__PURE__ */ make("namespacesRemove");
export const assignResource = /* @__PURE__ */ make("namespacesAssignResource");
export const removeResource = /* @__PURE__ */ make("namespacesRemoveResource");
export const getUsage = /* @__PURE__ */ make("namespacesGetUsage");
