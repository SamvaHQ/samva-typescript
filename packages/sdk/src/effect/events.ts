import { EventsGroup } from "./generated/events";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(EventsGroup);

export { CreateEventPayload } from "./generated/shared";

export const create = /* @__PURE__ */ make("eventsCreate");
export const batch = /* @__PURE__ */ make("eventsBatch");
