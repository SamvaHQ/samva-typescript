import { NewsletterIssuesGroup } from "./generated/newsletter-issues";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(NewsletterIssuesGroup);

export const list = /* @__PURE__ */ make("newsletterIssuesList");
export const open = /* @__PURE__ */ make("newsletterIssuesOpen");
export const get = /* @__PURE__ */ make("newsletterIssuesGet");
export const create = /* @__PURE__ */ make("newsletterIssuesCreate");
export const update = /* @__PURE__ */ make("newsletterIssuesUpdate");
export const remove = /* @__PURE__ */ make("newsletterIssuesRemove");
export const save = /* @__PURE__ */ make("newsletterIssuesSave");
export const check = /* @__PURE__ */ make("newsletterIssuesCheck");
export const render = /* @__PURE__ */ make("newsletterIssuesRender");
export const head = /* @__PURE__ */ make("newsletterIssuesHead");
export const history = /* @__PURE__ */ make("newsletterIssuesHistory");
