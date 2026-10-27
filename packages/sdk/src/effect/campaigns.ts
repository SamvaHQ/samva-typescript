import { CampaignsGroup } from "./generated/campaigns";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(CampaignsGroup);

export const preview = /* @__PURE__ */ make("campaignsPreview");
export const sendTest = /* @__PURE__ */ make("campaignsSendTest");

export const list = /* @__PURE__ */ make("campaignsList");
export const create = /* @__PURE__ */ make("campaignsCreate");
export const get = /* @__PURE__ */ make("campaignsGet");
export const archive = /* @__PURE__ */ make("campaignsArchive");
export const update = /* @__PURE__ */ make("campaignsUpdate");
export const listRuns = /* @__PURE__ */ make("campaignsListRuns");
export const scheduleRun = /* @__PURE__ */ make("campaignsScheduleRun");
export const getRun = /* @__PURE__ */ make("campaignsGetRun");
export const getRunReport = /* @__PURE__ */ make("campaignsGetRunReport");
export const pauseRun = /* @__PURE__ */ make("campaignsPauseRun");
export const resumeRun = /* @__PURE__ */ make("campaignsResumeRun");
export const cancelRun = /* @__PURE__ */ make("campaignsCancelRun");
export const listRecipients = /* @__PURE__ */ make("campaignsListRecipients");
