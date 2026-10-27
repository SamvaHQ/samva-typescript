import { ConversationsGroup } from "./generated/conversations";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(ConversationsGroup);

export const list = /* @__PURE__ */ make("conversationsList");
export const create = /* @__PURE__ */ make("conversationsCreate");
export const getById = /* @__PURE__ */ make("conversationsGetById");
export const listMessages = /* @__PURE__ */ make("conversationsListMessages");
export const update = /* @__PURE__ */ make("conversationsUpdate");
export const addTags = /* @__PURE__ */ make("conversationsAddTags");
export const removeTags = /* @__PURE__ */ make("conversationsRemoveTags");
export const addCategories = /* @__PURE__ */ make("conversationsAddCategories");
export const removeCategories = /* @__PURE__ */ make("conversationsRemoveCategories");
export const addChannels = /* @__PURE__ */ make("conversationsAddChannels");
export const removeChannels = /* @__PURE__ */ make("conversationsRemoveChannels");
export const addContacts = /* @__PURE__ */ make("conversationsAddContacts");
export const removeContacts = /* @__PURE__ */ make("conversationsRemoveContacts");
