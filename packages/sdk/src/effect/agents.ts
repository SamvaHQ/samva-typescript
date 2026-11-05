import { AgentsGroup } from "./generated/agents";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(AgentsGroup);

export const list = /* @__PURE__ */ make("agentsList");
export const listModels = /* @__PURE__ */ make("agentsListModels");
export const create = /* @__PURE__ */ make("agentsCreate");
export const get = /* @__PURE__ */ make("agentsGet");
export const update = /* @__PURE__ */ make("agentsUpdate");
export const remove = /* @__PURE__ */ make("agentsRemove");
export const replaceDraft = /* @__PURE__ */ make("agentsReplaceDraft");
export const publish = /* @__PURE__ */ make("agentsPublish");
export const continueOnStandard = /* @__PURE__ */ make("agentsContinueOnStandard");
export const listVersions = /* @__PURE__ */ make("agentsListVersions");
export const getVersion = /* @__PURE__ */ make("agentsGetVersion");
