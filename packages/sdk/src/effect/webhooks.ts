import { WebhooksGroup } from "./generated/webhooks";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(WebhooksGroup);

export {
  CreateWebhookPayload as CreatePayload,
  TestWebhookPayload as TestPayload,
  UpdateWebhookPayload as UpdatePayload,
} from "./generated/shared";

export const list = /* @__PURE__ */ make("webhooksList");
export const create = /* @__PURE__ */ make("webhooksCreate");
export const getSecret = /* @__PURE__ */ make("webhooksGetSecret");
export const get = /* @__PURE__ */ make("webhooksGet");
export const remove = /* @__PURE__ */ make("webhooksRemove");
export const update = /* @__PURE__ */ make("webhooksUpdate");
export const test = /* @__PURE__ */ make("webhooksTest");
export const getLogs = /* @__PURE__ */ make("webhooksGetLogs");
export const getStats = /* @__PURE__ */ make("webhooksGetStats");
export const retryDelivery = /* @__PURE__ */ make("webhooksRetryDelivery");
export const regenerateSecret = /* @__PURE__ */ make("webhooksRegenerateSecret");
