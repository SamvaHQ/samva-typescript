/**
 * Type-level proof that the `.pages()`/`.items()` Stream companions keep their
 * input required exactly when the underlying list operation needs it.
 *
 * A pure query-filter list (`email.listDomains`) may be streamed with no input;
 * a list carrying required path params (`campaigns.listRuns`,
 * `campaigns.listRecipients`) must not be, because an omitted path param would
 * build a request with an unsubstituted path and die at runtime.
 */
import * as Campaigns from "../../src/effect/campaigns";
import * as Conversations from "../../src/effect/conversations";
import * as Email from "../../src/effect/email";
import * as Messages from "../../src/effect/messages";

// Query-filter lists stay callable with no input, and with a filter object.
void (() => Email.listDomains.items());
void (() => Email.listDomains.pages());
void (() => Email.listDomains.items({ cursor: "next" }));
void (() => Conversations.listMessages.items({ id: "cnv_x", cursor: "next" }));
void (() => Conversations.listMessages.pages({ id: "cnv_x" }));
void (() => Messages.list.items());
void (() => Messages.list.pages({ cursor: "next", limit: 50 }));

// Path-parameterized lists REQUIRE their input on both companions: a bare call
// must not typecheck.
void (() => Campaigns.listRuns({ id: "cmp_x" }));
void (() => Campaigns.listRecipients({ id: "cmp_x", runId: "run_x" }));

// @ts-expect-error listRuns requires its `id` path param.
void (() => Campaigns.listRuns.items());
// @ts-expect-error listRuns requires its `id` path param.
void (() => Campaigns.listRuns.pages());
// @ts-expect-error listRecipients requires its `id`/`runId` path params.
void (() => Campaigns.listRecipients.items());
// @ts-expect-error listRecipients requires its `id`/`runId` path params.
void (() => Campaigns.listRecipients.pages());

// …and accept it when supplied.
void (() => Campaigns.listRuns.items({ id: "cmp_x" }));
void (() => Campaigns.listRecipients.pages({ id: "cmp_x", runId: "run_x" }));
