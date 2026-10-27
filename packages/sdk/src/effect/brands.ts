import { BrandsGroup } from "./generated/brands";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(BrandsGroup);

export { CreateBrand as CreatePayload, UpdateBrand as UpdatePayload } from "./generated/shared";

export const list = /* @__PURE__ */ make("brandsList");
export const create = /* @__PURE__ */ make("brandsCreate");
export const get = /* @__PURE__ */ make("brandsGet");
export const update = /* @__PURE__ */ make("brandsUpdate");
export const remove = /* @__PURE__ */ make("brandsRemove");
export const setDefault = /* @__PURE__ */ make("brandsSetDefault");
