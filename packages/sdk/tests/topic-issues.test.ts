import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import * as TopicIssues from "../src/effect/topic-issues";
import { createClient, type SamvaClient } from "../src/promises";

const id = "unsub_1234567890abcdef";
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
const write = { ...fenced, content, idempotencyKey: "edit-1" };
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
  idempotencyKey: "save-1",
};

type Cell = {
  readonly name: string;
  readonly method: string;
  readonly suffix: string;
  readonly query?: Readonly<Record<string, string>>;
  readonly body?: unknown;
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
    promise: (client) => client.topicIssues.list({ id }),
    effect: () => TopicIssues.list({ id }),
  },
  {
    name: "open",
    method: "GET",
    suffix: "/workspace",
    response: view,
    promise: (client) => client.topicIssues.open({ id }),
    effect: () => TopicIssues.open({ id }),
  },
  {
    name: "get",
    method: "GET",
    suffix: "/document",
    query: fenced,
    response: { projectId, revision, path, content },
    promise: (client) => client.topicIssues.get({ id, ...fenced }),
    effect: () => TopicIssues.get({ id, ...fenced }),
  },
  {
    name: "first create",
    method: "POST",
    suffix: "",
    body: { path, content, idempotencyKey: "first-1" },
    response: view,
    promise: (client) =>
      client.topicIssues.create({ id, path, content, idempotencyKey: "first-1" }),
    effect: () => TopicIssues.create({ id, path, content, idempotencyKey: "first-1" }),
  },
  {
    name: "fenced create",
    method: "POST",
    suffix: "",
    body: write,
    response: view,
    promise: (client) => client.topicIssues.create({ id, ...write }),
    effect: () => TopicIssues.create({ id, ...write }),
  },
  {
    name: "update",
    method: "PATCH",
    suffix: "",
    body: write,
    response: view,
    promise: (client) => client.topicIssues.update({ id, ...write }),
    effect: () => TopicIssues.update({ id, ...write }),
  },
  {
    name: "remove",
    method: "POST",
    suffix: "/remove",
    body: { ...fenced, idempotencyKey: "remove-1" },
    response: view,
    promise: (client) => client.topicIssues.remove({ id, ...fenced, idempotencyKey: "remove-1" }),
    effect: () => TopicIssues.remove({ id, ...fenced, idempotencyKey: "remove-1" }),
  },
  {
    name: "save",
    method: "POST",
    suffix: "/save",
    body: save,
    response: saved,
    promise: (client) => client.topicIssues.save({ id, ...save }),
    effect: () => TopicIssues.save({ id, ...save }),
  },
  {
    name: "check",
    method: "POST",
    suffix: "/check",
    body: fenced,
    response: checked,
    promise: (client) => client.topicIssues.check({ id, ...fenced }),
    effect: () => TopicIssues.check({ id, ...fenced }),
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
    promise: (client) => client.topicIssues.render({ id, ...fenced, fixture: "default", target }),
    effect: () => TopicIssues.render({ id, ...fenced, fixture: "default", target }),
  })),
  {
    name: "head",
    method: "GET",
    suffix: "/head",
    response: { projectId, revision, remoteHead: commit },
    promise: (client) => client.topicIssues.head({ id }),
    effect: () => TopicIssues.head({ id }),
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
    promise: (client) => client.topicIssues.history({ id, limit: 5 }),
    effect: () => TopicIssues.history({ id, limit: 5 }),
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
          idempotencyKey: request.headers.get("idempotency-key"),
          body: body === "" ? undefined : JSON.parse(body),
        });
        return Response.json(cell.response);
      };
      const promise = await cell.promise(createClient({ apiKey: "samva_sk_test", fetch }));
      const effect = await Effect.runPromise(provide(cell.effect(), fetch));
      expect(JSON.parse(JSON.stringify(promise))).toEqual(cell.response);
      expect(JSON.parse(JSON.stringify(effect))).toEqual(cell.response);
      expect(requests).toEqual(
        Array.from({ length: 2 }, () => ({
          method: cell.method,
          path: `/v1/topics/${id}/issues${cell.suffix}`,
          query: cell.query ?? {},
          apiKey: "samva_sk_test",
          idempotencyKey: null,
          body: cell.body,
        })),
      );
    },
  );

  it("preserves an uninitialized topic without inventing a project or revision", async () => {
    const response = { projectId: null, revision: null, items: [] };
    const fetch = async () => Response.json(response);
    expect(await createClient({ apiKey: "samva_sk_test", fetch }).topicIssues.list({ id })).toEqual(
      response,
    );
    expect(await Effect.runPromise(provide(TopicIssues.list({ id }), fetch))).toEqual(response);
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
        flag: "issueContent",
        message: "Issue content is unavailable",
      },
    },
  ])("preserves the tagged $status failure in both clients", async ({ status, body }) => {
    const fetch = async () => Response.json(body, { status });
    await expect(
      createClient({ apiKey: "samva_sk_test", fetch }).topicIssues.update({ id, ...write }),
    ).rejects.toMatchObject(body);
    const failure = await Effect.runPromise(
      provide(
        TopicIssues.update({ id, ...write }).pipe(
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
