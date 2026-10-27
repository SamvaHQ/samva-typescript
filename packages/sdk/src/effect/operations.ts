import { OperationsGroup } from "./generated/operations";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(OperationsGroup);

export const list = /* @__PURE__ */ make("operationsList");
export const get = /* @__PURE__ */ make("operationsGet");
export const retry = /* @__PURE__ */ make("operationsRetry");
