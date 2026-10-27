import { FeedbackGroup } from "./generated/feedback";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(FeedbackGroup);

export { SendFeedback as SendPayload } from "./generated/shared";

export const send = /* @__PURE__ */ make("feedbackSend");
