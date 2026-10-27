import { TemplatesGroup } from "./generated/templates";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(TemplatesGroup);

export {
  CreateTemplatePayload as CreatePayload,
  UpdateTemplatePayload as UpdatePayload,
} from "./generated/shared";

export const list = /* @__PURE__ */ make("templatesList");
export const create = /* @__PURE__ */ make("templatesCreate");
export const createFromWebsite = /* @__PURE__ */ make("templatesCreateFromWebsite");
export const addEntry = /* @__PURE__ */ make("templatesAddEntry");
export const listFamilies = /* @__PURE__ */ make("templatesListFamilies");
export const createFamily = /* @__PURE__ */ make("templatesCreateFamily");
export const getFamily = /* @__PURE__ */ make("templatesGetFamily");
export const deleteFamily = /* @__PURE__ */ make("templatesDeleteFamily");
export const renameFamily = /* @__PURE__ */ make("templatesRenameFamily");
export const createFamilyFromTemplate = /* @__PURE__ */ make("templatesCreateFamilyFromTemplate");
export const attachFamilyMember = /* @__PURE__ */ make("templatesAttachFamilyMember");
export const detachFamilyMember = /* @__PURE__ */ make("templatesDetachFamilyMember");
export const getById = /* @__PURE__ */ make("templatesGetById");
export const remove = /* @__PURE__ */ make("templatesRemove");
export const update = /* @__PURE__ */ make("templatesUpdate");
export const openWorkspace = /* @__PURE__ */ make("templatesOpenWorkspace");
export const getGitRepository = /* @__PURE__ */ make("templatesGetGitRepository");
export const issueGitCredential = /* @__PURE__ */ make("templatesIssueGitCredential");
export const patchWorkspace = /* @__PURE__ */ make("templatesPatchWorkspace");
export const putWorkspaceAsset = /* @__PURE__ */ make("templatesPutWorkspaceAsset");
export const resolveWorkspaceConflict = /* @__PURE__ */ make("templatesResolveWorkspaceConflict");
export const attachWorkspaceResource = /* @__PURE__ */ make("templatesAttachWorkspaceResource");
export const removeWorkspaceResource = /* @__PURE__ */ make("templatesRemoveWorkspaceResource");
export const restoreWorkspace = /* @__PURE__ */ make("templatesRestoreWorkspace");
export const saveWorkspace = /* @__PURE__ */ make("templatesSaveWorkspace");
export const checkWorkspace = /* @__PURE__ */ make("templatesCheckWorkspace");
export const renderWorkspaceFixture = /* @__PURE__ */ make("templatesRenderWorkspaceFixture");
export const publish = /* @__PURE__ */ make("templatesPublish");
export const getPublication = /* @__PURE__ */ make("templatesGetPublication");
export const renderPublication = /* @__PURE__ */ make("templatesRenderPublication");
export const listInputContracts = /* @__PURE__ */ make("templatesListInputContracts");
export const getInputContract = /* @__PURE__ */ make("templatesGetInputContract");
export const diffWorkspace = /* @__PURE__ */ make("templatesDiffWorkspace");
export const workspaceHistory = /* @__PURE__ */ make("templatesWorkspaceHistory");
