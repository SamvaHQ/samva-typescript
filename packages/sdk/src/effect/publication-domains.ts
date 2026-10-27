import { PublicationDomainsGroup } from "./generated/publication-domains";
import { forGroup } from "./internal/operation";

const make = /* @__PURE__ */ forGroup(PublicationDomainsGroup);

export const add = /* @__PURE__ */ make("topicPublicationDomainsAdd");
export const get = /* @__PURE__ */ make("topicPublicationDomainsGet");
export const remove = /* @__PURE__ */ make("topicPublicationDomainsRemove");
