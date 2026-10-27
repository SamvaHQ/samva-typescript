import { AttachmentsGroup } from "./generated/attachments";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(AttachmentsGroup);

export const list = /* @__PURE__ */ make("attachmentsList");
export const getById = /* @__PURE__ */ make("attachmentsGetById");
export const remove = /* @__PURE__ */ make("attachmentsRemove");
export const downloadUrl = /* @__PURE__ */ make("attachmentsDownloadUrl");
