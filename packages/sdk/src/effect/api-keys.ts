import { APIKeysGroup } from "./generated/api-keys";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(APIKeysGroup);

export {
  ApiKeysCreateRequestJson as CreatePayload,
  ApiKeysUpdateRequestJson as UpdatePayload,
} from "./generated/api-keys";

export const list = /* @__PURE__ */ make("apiKeysList");
export const create = /* @__PURE__ */ make("apiKeysCreate");
export const get = /* @__PURE__ */ make("apiKeysGet");
export const revoke = /* @__PURE__ */ make("apiKeysRevoke");
export const update = /* @__PURE__ */ make("apiKeysUpdate");
export const rotate = /* @__PURE__ */ make("apiKeysRotate");
export const getStats = /* @__PURE__ */ make("apiKeysGetStats");
export const getActivity = /* @__PURE__ */ make("apiKeysGetActivity");
