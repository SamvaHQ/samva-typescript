import { MailboxesGroup } from "./generated/mailboxes";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(MailboxesGroup);

export { events } from "./internal/mailbox-events";
export {
  type MailboxEvent,
  MailboxEventStreamError,
  type MailboxEventStreamErrorFields,
  type MailboxEventStreamErrorReason,
  type MailboxEventStreamErrorTag,
  type MailboxEventStreamFailure,
  type MailboxEventStreamOptions,
  type MailboxEventStreamReconnect,
  type MailboxEventType,
} from "../mailbox-events";

export const list = /* @__PURE__ */ make("mailboxesList");
export const create = /* @__PURE__ */ make("mailboxesCreate");
export const get = /* @__PURE__ */ make("mailboxesGet");
export const update = /* @__PURE__ */ make("mailboxesUpdate");
export const remove = /* @__PURE__ */ make("mailboxesRemove");
export const createEndpoint = /* @__PURE__ */ make("mailboxesCreateEndpoint");
export const updateEndpoint = /* @__PURE__ */ make("mailboxesUpdateEndpoint");
export const removeEndpoint = /* @__PURE__ */ make("mailboxesRemoveEndpoint");
export const pause = /* @__PURE__ */ make("mailboxesPause");
export const resume = /* @__PURE__ */ make("mailboxesResume");
export const getAgentActivity = /* @__PURE__ */ make("mailboxesGetAgentActivity");
export const listGrants = /* @__PURE__ */ make("mailboxesListGrants");
export const createGrant = /* @__PURE__ */ make("mailboxesCreateGrant");
export const updateGrant = /* @__PURE__ */ make("mailboxesUpdateGrant");
export const revokeGrant = /* @__PURE__ */ make("mailboxesRevokeGrant");
export const listPolicies = /* @__PURE__ */ make("mailboxesListPolicies");
export const createPolicy = /* @__PURE__ */ make("mailboxesCreatePolicy");
export const getPolicy = /* @__PURE__ */ make("mailboxesGetPolicy");
export const updatePolicy = /* @__PURE__ */ make("mailboxesUpdatePolicy");
export const deletePolicy = /* @__PURE__ */ make("mailboxesDeletePolicy");
export const listFolders = /* @__PURE__ */ make("mailboxesListFolders");
export const listLabels = /* @__PURE__ */ make("mailboxesListLabels");
export const createLabel = /* @__PURE__ */ make("mailboxesCreateLabel");
export const updateLabel = /* @__PURE__ */ make("mailboxesUpdateLabel");
export const deleteLabel = /* @__PURE__ */ make("mailboxesDeleteLabel");
export const listThreads = /* @__PURE__ */ make("mailboxesListThreads");
export const getThread = /* @__PURE__ */ make("mailboxesGetThread");
export const updateThread = /* @__PURE__ */ make("mailboxesUpdateThread");
export const addThreadLabels = /* @__PURE__ */ make("mailboxesAddThreadLabels");
export const removeThreadLabels = /* @__PURE__ */ make("mailboxesRemoveThreadLabels");
export const listThreadMessages = /* @__PURE__ */ make("mailboxesListThreadMessages");
export const getThreadContent = /* @__PURE__ */ make("mailboxesGetThreadContent");
export const listThreadNotes = /* @__PURE__ */ make("mailboxesListThreadNotes");
export const createNote = /* @__PURE__ */ make("mailboxesCreateNote");
export const updateNote = /* @__PURE__ */ make("mailboxesUpdateNote");
export const deleteNote = /* @__PURE__ */ make("mailboxesDeleteNote");
export const sendMessage = /* @__PURE__ */ make("mailboxesSendMessage");
export const getMessage = /* @__PURE__ */ make("mailboxesGetMessage");
export const getMessageRaw = /* @__PURE__ */ make("mailboxesGetMessageRaw");
export const getMessageAttachment = /* @__PURE__ */ make("mailboxesGetMessageAttachment");
export const copyMessageAttachment = /* @__PURE__ */ make("mailboxesCopyMessageAttachment");
export const reply = /* @__PURE__ */ make("mailboxesReply");
export const replyAll = /* @__PURE__ */ make("mailboxesReplyAll");
export const forward = /* @__PURE__ */ make("mailboxesForward");
export const listQuarantine = /* @__PURE__ */ make("mailboxesListQuarantine");
export const releaseMessage = /* @__PURE__ */ make("mailboxesReleaseMessage");
export const discardMessage = /* @__PURE__ */ make("mailboxesDiscardMessage");
export const listDrafts = /* @__PURE__ */ make("mailboxesListDrafts");
export const createDraft = /* @__PURE__ */ make("mailboxesCreateDraft");
export const getDraft = /* @__PURE__ */ make("mailboxesGetDraft");
export const updateDraft = /* @__PURE__ */ make("mailboxesUpdateDraft");
export const deleteDraft = /* @__PURE__ */ make("mailboxesDeleteDraft");
export const sendDraft = /* @__PURE__ */ make("mailboxesSendDraft");
export const listActions = /* @__PURE__ */ make("mailboxesListActions");
export const getAction = /* @__PURE__ */ make("mailboxesGetAction");
export const cancelAction = /* @__PURE__ */ make("mailboxesCancelAction");
export const retryAction = /* @__PURE__ */ make("mailboxesRetryAction");
export const approveAction = /* @__PURE__ */ make("mailboxesApproveAction");
export const denyAction = /* @__PURE__ */ make("mailboxesDenyAction");
export const listEvents = /* @__PURE__ */ make("mailboxesListEvents");
