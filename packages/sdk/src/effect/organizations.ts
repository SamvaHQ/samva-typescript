import { OrganizationsGroup } from "./generated/organizations";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(OrganizationsGroup);

export const create = /* @__PURE__ */ make("organizationsCreate");
export const get = /* @__PURE__ */ make("organizationsGet");
export const getProfile = /* @__PURE__ */ make("organizationsGetProfile");
export const assignPersonalMailbox = /* @__PURE__ */ make("organizationsAssignPersonalMailbox");
export const listPersonalMailboxAssignments = /* @__PURE__ */ make(
  "organizationsListPersonalMailboxAssignments",
);
export const getPersonalMailboxAddressOptions = /* @__PURE__ */ make(
  "organizationsGetPersonalMailboxAddressOptions",
);
export const getTrustTier = /* @__PURE__ */ make("organizationsGetTrustTier");
export const update = /* @__PURE__ */ make("organizationsUpdate");
export const createAvatarUpload = /* @__PURE__ */ make("organizationsCreateAvatarUpload");
export const getUsage = /* @__PURE__ */ make("organizationsGetUsage");
const deleteOrganization = /* @__PURE__ */ make("organizationsDelete");
export { deleteOrganization as delete };
