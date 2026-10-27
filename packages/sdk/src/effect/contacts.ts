import { ContactEventsGroup } from "./generated/contact-events";
import { ContactsGroup } from "./generated/contacts";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(ContactsGroup);

export const list = /* @__PURE__ */ make("contactsList");
export const create = /* @__PURE__ */ make("contactsCreate");
export const find = /* @__PURE__ */ make("contactsFind");
export const findOrCreate = /* @__PURE__ */ make("contactsFindOrCreate");
export const get = /* @__PURE__ */ make("contactsGet");
export const remove = /* @__PURE__ */ make("contactsRemove");
export const update = /* @__PURE__ */ make("contactsUpdate");
export const addIdentity = /* @__PURE__ */ make("contactsAddIdentity");
export const removeIdentity = /* @__PURE__ */ make("contactsRemoveIdentity");
export const setConsent = /* @__PURE__ */ make("contactsSetConsent");
export const addTags = /* @__PURE__ */ make("contactsAddTags");
export const removeTags = /* @__PURE__ */ make("contactsRemoveTags");
export const getEngagement = /* @__PURE__ */ make("contactsGetEngagement");
export const planImport = /* @__PURE__ */ make("contactsPlanImport");
export const startImport = /* @__PURE__ */ make("contactsStartImport");
export const getImportJob = /* @__PURE__ */ make("contactsGetImportJob");
export const bulkDelete = /* @__PURE__ */ make("contactsBulkDelete");
export const bulkUpdateTags = /* @__PURE__ */ make("contactsBulkUpdateTags");
export const bulkUpdateStatus = /* @__PURE__ */ make("contactsBulkUpdateStatus");
const exportContacts = /* @__PURE__ */ make("contactsExport");
export { exportContacts as export };
export const getActivityTimeline = /* @__PURE__ */ make("contactsGetActivityTimeline");
export const getGroupMemberships = /* @__PURE__ */ make("contactsGetGroupMemberships");

export const listEvents = /* @__PURE__ */ forGroup(ContactEventsGroup)("contactEventsListEvents");
