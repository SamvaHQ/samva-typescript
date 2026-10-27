import { TopicsGroup } from "./generated/topics";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(TopicsGroup);

export const list = /* @__PURE__ */ make("topicsList");
export const get = /* @__PURE__ */ make("topicsGet");
export const create = /* @__PURE__ */ make("topicsCreate");
export const update = /* @__PURE__ */ make("topicsUpdate");
export const remove = /* @__PURE__ */ make("topicsRemove");
export const setDefault = /* @__PURE__ */ make("topicsSetDefault");
export const listSubscriptions = /* @__PURE__ */ make("topicsListSubscriptions");
export const setSubscriptions = /* @__PURE__ */ make("topicsSetSubscriptions");
export const checkSubscription = /* @__PURE__ */ make("topicsCheckSubscription");
