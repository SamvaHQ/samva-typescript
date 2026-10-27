import { EmailGroup } from "./generated/email";
import { addEmailSender, type EmailAddSenderInput } from "./internal/email-sender";
import { forGroup } from "./internal/operation";
import { type EmailSendInput, sendEmail, type SendOptions } from "./internal/send";

export { TrackingRecipientEmail } from "./generated/email";

const make = /* @__PURE__ */ forGroup(EmailGroup);

export type { EmailAddSenderInput, EmailSendInput, SendOptions };

export const send = sendEmail;
export const getTrackingDefaults = /* @__PURE__ */ make("emailGetTrackingDefaults");
export const updateTrackingDefaults = /* @__PURE__ */ make("emailUpdateTrackingDefaults");
export const getRecipientTrackingPreference = /* @__PURE__ */ make(
  "emailGetRecipientTrackingPreference",
);
export const updateRecipientTrackingPreference = /* @__PURE__ */ make(
  "emailUpdateRecipientTrackingPreference",
);
export const listDomains = /* @__PURE__ */ make("emailListDomains");
export const addDomain = /* @__PURE__ */ make("emailAddDomain");
export const rotateDomainDkim = /* @__PURE__ */ make("emailRotateDomainDkim");
export const getDomainVerification = /* @__PURE__ */ make("emailGetDomainVerification");
export const advanceDomainVerification = /* @__PURE__ */ make("emailAdvanceDomainVerification");
export const getDomainById = /* @__PURE__ */ make("emailGetDomainById");
export const removeDomain = /* @__PURE__ */ make("emailRemoveDomain");
export const setDefaultDomain = /* @__PURE__ */ make("emailSetDefaultDomain");
export const updateDomainConfig = /* @__PURE__ */ make("emailUpdateDomainConfig");
export const detectRegistrar = /* @__PURE__ */ make("emailDetectRegistrar");
export const getDomainConnect = /* @__PURE__ */ make("emailGetDomainConnect");
export const buildDomainConnectApplyUrl = /* @__PURE__ */ make("emailBuildDomainConnectApplyUrl");
export const completeDomainConnect = /* @__PURE__ */ make("emailCompleteDomainConnect");
export const enableReceiving = /* @__PURE__ */ make("emailEnableReceiving");
export const getReceivingStatus = /* @__PURE__ */ make("emailGetReceivingStatus");
export const enableCustomTracking = /* @__PURE__ */ make("emailEnableCustomTracking");
export const getCustomTracking = /* @__PURE__ */ make("emailGetCustomTracking");
export const recheckCustomTracking = /* @__PURE__ */ make("emailRecheckCustomTracking");
export const getCustomTrackingDomainConnect = /* @__PURE__ */ make(
  "emailGetCustomTrackingDomainConnect",
);
export const buildCustomTrackingDomainConnectApplyUrl = /* @__PURE__ */ make(
  "emailBuildCustomTrackingDomainConnectApplyUrl",
);
export const completeCustomTrackingDomainConnect = /* @__PURE__ */ make(
  "emailCompleteCustomTrackingDomainConnect",
);
export const disableCustomTracking = /* @__PURE__ */ make("emailDisableCustomTracking");
export const getDomainWarming = /* @__PURE__ */ make("emailGetDomainWarming");
export const createDomainWarmingPlan = /* @__PURE__ */ make("emailCreateDomainWarmingPlan");
export const updateDomainWarmingPolicy = /* @__PURE__ */ make("emailUpdateDomainWarmingPolicy");
export const cancelDomainWarmingBatch = /* @__PURE__ */ make("emailCancelDomainWarmingBatch");
export const pauseDomainWarming = /* @__PURE__ */ make("emailPauseDomainWarming");
export const resumeDomainWarming = /* @__PURE__ */ make("emailResumeDomainWarming");
export const completeDomainWarming = /* @__PURE__ */ make("emailCompleteDomainWarming");
export const getOnboardingReview = /* @__PURE__ */ make("emailGetOnboardingReview");
export const reapplyOnboardingReview = /* @__PURE__ */ make("emailReapplyOnboardingReview");
export const respondToOnboardingInformationRequest = /* @__PURE__ */ make(
  "emailRespondToOnboardingInformationRequest",
);
export const listSenders = /* @__PURE__ */ make("emailListSenders");
export const getSender = /* @__PURE__ */ make("emailGetSender");
export const addSender = addEmailSender;
export const checkSenderVerification = /* @__PURE__ */ make("emailCheckSenderVerification");
export const removeSender = /* @__PURE__ */ make("emailRemoveSender");
export const setDefaultSender = /* @__PURE__ */ make("emailSetDefaultSender");
export const getStats = /* @__PURE__ */ make("emailGetStats");
export const enableCatchAll = /* @__PURE__ */ make("emailEnableCatchAll");
export const disableCatchAll = /* @__PURE__ */ make("emailDisableCatchAll");
export const getCatchAllConfig = /* @__PURE__ */ make("emailGetCatchAllConfig");
export const updateCatchAllConfig = /* @__PURE__ */ make("emailUpdateCatchAllConfig");
export const getCatchAllStats = /* @__PURE__ */ make("emailGetCatchAllStats");
export const listSuppressions = /* @__PURE__ */ make("emailListSuppressions");
export const countSuppressions = /* @__PURE__ */ make("emailCountSuppressions");
export const removeSuppression = /* @__PURE__ */ make("emailRemoveSuppression");
export const listBlocks = /* @__PURE__ */ make("emailListBlocks");
export const addBlock = /* @__PURE__ */ make("emailAddBlock");
export const removeBlock = /* @__PURE__ */ make("emailRemoveBlock");
export const updateBlock = /* @__PURE__ */ make("emailUpdateBlock");
export const getBlockLogs = /* @__PURE__ */ make("emailGetBlockLogs");
export const checkBlocked = /* @__PURE__ */ make("emailCheckBlocked");
export const listForwardingRules = /* @__PURE__ */ make("emailListForwardingRules");
export const createForwardingRule = /* @__PURE__ */ make("emailCreateForwardingRule");
export const deleteForwardingRule = /* @__PURE__ */ make("emailDeleteForwardingRule");
export const updateForwardingRule = /* @__PURE__ */ make("emailUpdateForwardingRule");
export const getForwardingLog = /* @__PURE__ */ make("emailGetForwardingLog");
