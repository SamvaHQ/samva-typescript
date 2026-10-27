import { ScheduledMessagesGroup } from "./generated/scheduled-messages";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(ScheduledMessagesGroup);

export const list = /* @__PURE__ */ make("scheduledMessagesList");
export const create = /* @__PURE__ */ make("scheduledMessagesCreate");
export const get = /* @__PURE__ */ make("scheduledMessagesGet");
export const cancel = /* @__PURE__ */ make("scheduledMessagesCancel");
export const resume = /* @__PURE__ */ make("scheduledMessagesResume");
