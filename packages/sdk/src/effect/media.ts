import { MediaGroup } from "./generated/media";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(MediaGroup);

export const create = /* @__PURE__ */ make("mediaCreate");
export const getById = /* @__PURE__ */ make("mediaGetById");
export const remove = /* @__PURE__ */ make("mediaRemove");
export const complete = /* @__PURE__ */ make("mediaComplete");
export const downloadUrl = /* @__PURE__ */ make("mediaDownloadUrl");
