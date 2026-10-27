import { AnalyticsGroup } from "./generated/analytics";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(AnalyticsGroup);

export const getStats = /* @__PURE__ */ make("analyticsGetStats");
export const getChannelStats = /* @__PURE__ */ make("analyticsGetChannelStats");
export const getTopContacts = /* @__PURE__ */ make("analyticsGetTopContacts");
export const getHourlyDistribution = /* @__PURE__ */ make("analyticsGetHourlyDistribution");
export const getDeliveryMetrics = /* @__PURE__ */ make("analyticsGetDeliveryMetrics");
export const exportData = /* @__PURE__ */ make("analyticsExportData");
