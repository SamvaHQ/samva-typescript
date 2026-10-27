import { SubscriptionsGroup } from "./generated/subscriptions";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(SubscriptionsGroup);

export const subscribe = /* @__PURE__ */ make("subscriptionsSubscribe");
