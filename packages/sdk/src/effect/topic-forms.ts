import { TopicFormsGroup } from "./generated/topic-forms";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(TopicFormsGroup);

export const list = /* @__PURE__ */ make("topicFormsList");
export const get = /* @__PURE__ */ make("topicFormsGet");
export const create = /* @__PURE__ */ make("topicFormsCreate");
export const update = /* @__PURE__ */ make("topicFormsUpdate");
export const remove = /* @__PURE__ */ make("topicFormsRemove");
