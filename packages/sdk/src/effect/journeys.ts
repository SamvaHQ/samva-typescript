import { JourneysGroup } from "./generated/journeys";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(JourneysGroup);

export const list = /* @__PURE__ */ make("journeysList");
export const create = /* @__PURE__ */ make("journeysCreate");
export const get = /* @__PURE__ */ make("journeysGet");
export const update = /* @__PURE__ */ make("journeysUpdate");
export const remove = /* @__PURE__ */ make("journeysRemove");
export const replaceDraft = /* @__PURE__ */ make("journeysReplaceDraft");
export const publish = /* @__PURE__ */ make("journeysPublish");
export const pause = /* @__PURE__ */ make("journeysPause");
export const resume = /* @__PURE__ */ make("journeysResume");
export const archive = /* @__PURE__ */ make("journeysArchive");
export const getVersion = /* @__PURE__ */ make("journeysGetVersion");
export const stats = /* @__PURE__ */ make("journeysStats");
export const listRuns = /* @__PURE__ */ make("journeysListRuns");
export const getRun = /* @__PURE__ */ make("journeysGetRun");
