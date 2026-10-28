import { NewsletterDomainsGroup } from "./generated/newsletter-domains";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(NewsletterDomainsGroup);

export const list = /* @__PURE__ */ make("newsletterDomainsList");
export const add = /* @__PURE__ */ make("newsletterDomainsAdd");
export const get = /* @__PURE__ */ make("newsletterDomainsGet");
export const remove = /* @__PURE__ */ make("newsletterDomainsRemove");
