import { MessagesGroup } from "./generated/messages";
import { forGroup } from "./internal/operation";
import { type MessageSendInput, sendMessage, type SendOptions } from "./internal/send";

const make = /* @__PURE__ */ forGroup(MessagesGroup);

export type { MessageSendInput, SendOptions };

export const list = /* @__PURE__ */ make("messagesList");
export const send = sendMessage;
export const validateEmail = /* @__PURE__ */ make("messagesValidateEmail");
export const get = /* @__PURE__ */ make("messagesGet");
export const getEmail = /* @__PURE__ */ make("messagesGetEmail");
export const remove = /* @__PURE__ */ make("messagesRemove");
export const getStatus = /* @__PURE__ */ make("messagesGetStatus");
export const getEvents = /* @__PURE__ */ make("messagesGetEvents");
export const listDeliveries = /* @__PURE__ */ make("messagesListDeliveries");
export const getContent = /* @__PURE__ */ make("messagesGetContent");
