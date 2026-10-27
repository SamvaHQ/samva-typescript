import { TopicIssuesGroup } from "./generated/topic-issues";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(TopicIssuesGroup);

export const list = /* @__PURE__ */ make("topicIssuesList");
export const open = /* @__PURE__ */ make("topicIssuesOpen");
export const get = /* @__PURE__ */ make("topicIssuesGet");
export const create = /* @__PURE__ */ make("topicIssuesCreate");
export const update = /* @__PURE__ */ make("topicIssuesUpdate");
export const remove = /* @__PURE__ */ make("topicIssuesRemove");
export const save = /* @__PURE__ */ make("topicIssuesSave");
export const check = /* @__PURE__ */ make("topicIssuesCheck");
export const render = /* @__PURE__ */ make("topicIssuesRender");
export const head = /* @__PURE__ */ make("topicIssuesHead");
export const history = /* @__PURE__ */ make("topicIssuesHistory");
