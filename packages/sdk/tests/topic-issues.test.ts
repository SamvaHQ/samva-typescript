import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import * as NewsletterIssues from "../src/effect/newsletter-issues";
import { createClient, type SamvaClient } from "../src/promises";

const id = "nl_1234567890abcdef";
const projectId = "tproj_1234567890abcdef";
const revision = "draft-7";
const commit = "1111111111111111111111111111111111111111";
const path = "issues/weekly digest.md";
const content =
  "---\ntitle: Weekly digest\nslug: weekly-digest\ntopic: newsletter\n---\n\nHello!\n";
const actor = { userId: "user_1234567890abcdef", via: "api" };
const view = {
  workspace: {
    projectId,
    organizationId: "org_1234567890abcdef",
    ownerEpoch: 0,
    repositoryName: "newsletter",
    defaultBranch: "main",
    baseCommit: commit,
    remoteHead: commit,
    pendingRemoteHead: null,
    revision,
    overlay: { [path]: content },
    assetChanges: [],
    conflicts: [],
    provenance: { references: [] },
    mounts: [],
    libraryManifestDigest: "a".repeat(64),
    createdAt: "2026-10-26T12:00:00.000Z",
    updatedAt: "2026-10-26T12:00:00.000Z",
    createdBy: actor,
    updatedBy: actor,
  },
  files: { [path]: content },
};
const checked = {
  projectId,
  revision,
  entryPath: path,
  declaration: null,
  issue: { path, frontmatter: { title: "Weekly digest", slug: "weekly-digest", topic: id } },
  diagnostics: [],
  incompatibilities: [],
};
const fenced = { path, expectedRevision: revision };
const write = { ...fenced, content };
const saved = {
  commit,
  parentCommit: commit,
  tree: commit,
  revision,
  changedPaths: [path],
  sourceDigest: "a".repeat(64),
  buildDigest: "b".repeat(64),
  warnings: [],
  incompatibilities: [],
};
const save = {
  expectedRevision: revision,
  expectedHead: commit,
  message: "Save weekly digest",
};

type Cell = {
  readonly name: string;
  readonly method: string;
  readonly suffix: string;
  readonly query?: Readonly<Record<string, string>>;
  readonly body?: unknown;
  readonly idempotencyKey?: string;
  readonly response: unknown;
  readonly promise: (client: SamvaClient) => Promise<unknown>;
  readonly effect: () => Effect.Effect<unknown, unknown, Client.Service>;
};

const cells = [
  {
    name: "list",
    method: "GET",
    suffix: "",
    response: { projectId, revision, items: [{ path, title: "October", latestSend: null }] },
    promise: (client) => client.newsletters.issues.list({ id }),
    effect: () => NewsletterIssues.list({ id }),
  },
  {
    name: "open",
    method: "GET",
    suffix: "/workspace",
    response: view,
    promise: (client) => client.newsletters.issues.open({ id }),
    effect: () => NewsletterIssues.open({ id }),
  },
  {
    name: "get",
    method: "GET",
    suffix: "/document",
    query: fenced,
    response: { projectId, revision, path, content },
    promise: (client) => client.newsletters.issues.get({ id, ...fenced }),
    effect: () => NewsletterIssues.get({ id, ...fenced }),
  },
  {
    name: "first create",
    method: "POST",
    suffix: "",
    body: { path, content },
    idempotencyKey: "first-1",
    response: view,
    promise: (client) =>
      client.newsletters.issues.create({ id, path, content }, { idempotencyKey: "first-1" }),
    effect: () => NewsletterIssues.create({ id, path, content }, { idempotencyKey: "first-1" }),
  },
  {
    name: "fenced create",
    method: "POST",
    suffix: "",
    body: write,
    idempotencyKey: "edit-1",
    response: view,
    promise: (client) =>
      client.newsletters.issues.create({ id, ...write }, { idempotencyKey: "edit-1" }),
    effect: () => NewsletterIssues.create({ id, ...fenced, content }, { idempotencyKey: "edit-1" }),
  },
  {
    name: "update",
    method: "PATCH",
    suffix: "",
    body: write,
    idempotencyKey: "edit-1",
    response: view,
    promise: (client) =>
      client.newsletters.issues.update({ id, ...write }, { idempotencyKey: "edit-1" }),
    effect: () => NewsletterIssues.update({ id, ...fenced, content }, { idempotencyKey: "edit-1" }),
  },
  {
    name: "remove",
    method: "POST",
    suffix: "/remove",
    body: { ...fenced },
    idempotencyKey: "remove-1",
    response: view,
    promise: (client) =>
      client.newsletters.issues.remove({ id, ...fenced }, { idempotencyKey: "remove-1" }),
    effect: () => NewsletterIssues.remove({ id, ...fenced }, { idempotencyKey: "remove-1" }),
  },
  {
    name: "save",
    method: "POST",
    suffix: "/save",
    body: save,
    idempotencyKey: "save-1",
    response: saved,
    promise: (client) =>
      client.newsletters.issues.save({ id, ...save }, { idempotencyKey: "save-1" }),
    effect: () =>
      NewsletterIssues.save(
        { id, expectedRevision: revision, expectedHead: commit, message: save.message },
        { idempotencyKey: "save-1" },
      ),
  },
  {
    name: "check",
    method: "POST",
    suffix: "/check",
    body: fenced,
    response: checked,
    promise: (client) => client.newsletters.issues.check({ id, ...fenced }),
    effect: () => NewsletterIssues.check({ id, ...fenced }),
  },
  ...(["email", "web"] as const).map((target): Cell => ({
    name: `render ${target}`,
    method: "POST",
    suffix: "/render",
    body: { ...fenced, fixture: "default", target },
    response: {
      ...checked,
      fixture: "default",
      rendered: null,
      page: target === "web" ? { kind: "page", html: "<p>Hello!</p>", selections: [] } : null,
    },
    promise: (client) =>
      client.newsletters.issues.render({ id, ...fenced, fixture: "default", target }),
    effect: () => NewsletterIssues.render({ id, ...fenced, fixture: "default", target }),
  })),
  {
    name: "head",
    method: "GET",
    suffix: "/head",
    response: { projectId, revision, remoteHead: commit },
    promise: (client) => client.newsletters.issues.head({ id }),
    effect: () => NewsletterIssues.head({ id }),
  },
  {
    name: "history",
    method: "GET",
    suffix: "/history",
    query: { limit: "5" },
    response: {
      projectId,
      head: commit,
      commits: [
        {
          commit,
          tree: commit,
          parentCommit: null,
          message: "Initial issue",
          committedAt: "2026-10-26T12:00:00.000Z",
        },
      ],
    },
    promise: (client) => client.newsletters.issues.history({ id, limit: 5 }),
    effect: () => NewsletterIssues.history({ id, limit: 5 }),
  },
] satisfies ReadonlyArray<Cell>;

const provide = <A, E>(
  effect: Effect.Effect<A, E, Client.Service>,
  fetch: typeof globalThis.fetch,
) =>
  effect.pipe(
    Effect.provide(
      Layer.provide(
        Client.layer({ apiKey: "samva_sk_test" }),
        Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
      ),
    ),
  );

describe("topic issues service transport parity", () => {
  it.each(cells)(
    "$name preserves the public request and response in both clients",
    async (cell: Cell) => {
      const requests: Array<unknown> = [];
      const fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        const request = input instanceof Request ? input : new Request(input, init);
        const url = new URL(request.url);
        const body = await request.text();
        requests.push({
          method: request.method,
          path: url.pathname,
          query: Object.fromEntries(url.searchParams),
          apiKey: request.headers.get("x-api-key"),
          "idempotency-key": request.headers.get("idempotency-key"),
          body: body === "" ? undefined : JSON.parse(body),
        });
        return Response.json(cell.response);
      };
      const promise = await cell.promise(createClient({ apiKey: "samva_sk_test", fetch }));
      const effect = await Effect.runPromise(provide(cell.effect(), fetch));
      expect(JSON.parse(JSON.stringify(promise))).toEqual(cell.response);
      expect(JSON.parse(JSON.stringify(effect))).toEqual(cell.response);
      const expectedBody = cell.body;
      const expectedKey =
        cell.method === "GET" ? null : (cell.idempotencyKey ?? expect.any(String));
      expect(requests).toEqual(
        Array.from({ length: 2 }, () => ({
          method: cell.method,
          path: `/v1/newsletters/${id}/issues${cell.suffix}`,
          query: cell.query ?? {},
          apiKey: "samva_sk_test",
          "idempotency-key": expectedKey,
          body: expectedBody,
        })),
      );
    },
  );

  it("preserves an uninitialized topic without inventing a project or revision", async () => {
    const response = { projectId: null, revision: null, items: [] };
    const fetch = async () => Response.json(response);
    expect(
      await createClient({ apiKey: "samva_sk_test", fetch }).newsletters.issues.list({ id }),
    ).toEqual(response);
    expect(await Effect.runPromise(provide(NewsletterIssues.list({ id }), fetch))).toEqual(
      response,
    );
  });

  it.each([
    {
      status: 422,
      body: {
        _tag: "TemplateSourceError",
        message: "Issue source could not be compiled",
        revision: "draft-8",
        diagnostics: [
          {
            code: "issue-frontmatter",
            severity: "error",
            message: "Title is required",
            origins: [{ fileName: path, lineNumber: 1, columnNumber: 1 }],
            clients: null,
            notes: null,
            provenance: null,
            fixtures: null,
            occurrences: null,
            compatibility: null,
          },
        ],
      },
    },
    {
      status: 409,
      body: {
        _tag: "ConflictError",
        message: "Workspace changed",
        resource: "TemplateWorkspace",
        id,
      },
    },
    {
      status: 403,
      body: {
        _tag: "FlagDisabledError",
        flag: "newsletters",
        message: "Issue content is unavailable",
      },
    },
  ])("preserves the tagged $status failure in both clients", async ({ status, body }) => {
    const fetch = async () => Response.json(body, { status });
    await expect(
      createClient({ apiKey: "samva_sk_test", fetch }).newsletters.issues.update(
        { id, ...write },
        { idempotencyKey: "edit-1" },
      ),
    ).rejects.toMatchObject(body);
    const failure = await Effect.runPromise(
      provide(
        NewsletterIssues.update({ id, ...fenced, content }, { idempotencyKey: "edit-1" }).pipe(
          Effect.catchTags({
            ConflictError: Effect.succeed,
            FlagDisabledError: Effect.succeed,
            TemplateSourceError: Effect.succeed,
          }),
        ),
        fetch,
      ),
    );
    expect(failure).toMatchObject(body);
  });
});
