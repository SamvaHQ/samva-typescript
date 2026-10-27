import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";

import * as Client from "../src/effect/client";
import * as Contacts from "../src/effect/contacts";
import {
  createClient,
  type ContactsPlanImportData,
  type ContactsStartImportData,
} from "../src/promises";

describe("contact import SDK facades", () => {
  it("preserves declared evidence, preview hash, and fenced resume on both clients", async () => {
    const id = "cimport_7q2xk9mvt4znw8rh";
    const topicId = "unsub_7q2xk9mvt4znw8rh";
    const input: ContactsPlanImportData["body"] = {
      preset: "mailchimp",
      topicId,
      files: [
        {
          name: "readers.csv",
          csv: "Email Address\nreader@example.test",
          evidence: { kind: "export_scope", scope: "subscribed" },
        },
        {
          name: "cleaned.csv",
          csv: "Email Address\nbounce@example.test",
          evidence: { kind: "export_scope", scope: "cleaned/bounced" },
        },
      ],
    };
    const counts = {
      totalRows: 2,
      uniqueAddresses: 2,
      subscribed: 1,
      unsubscribed: 0,
      suppressed: 1,
      skipped: 0,
      conflicts: 0,
      created: 2,
      existing: 0,
    };
    const plan = {
      planHash: "a".repeat(64),
      presetVersion: "1",
      namespaceId: null,
      topicId,
      canStart: true,
      counts,
      diagnostics: [],
      diagnosticsTruncated: false,
    };
    const now = "2026-10-25T00:00:00.000Z";
    const job = {
      id,
      namespaceId: null,
      topicId,
      preset: "mailchimp",
      status: "running",
      generation: 2,
      counts,
      processedRows: 1,
      totalRows: 2,
      createdAt: now,
      startedAt: now,
      updatedAt: now,
      completedAt: null,
      failure: null,
      resumable: false,
    };
    const requests: Array<{ method: string; path: string; body: unknown }> = [];
    const fetch = async (url: RequestInfo | URL, init?: RequestInit) => {
      const request = url instanceof Request ? url : new Request(url, init);
      const path = new URL(request.url).pathname;
      requests.push({
        method: request.method,
        path,
        body: request.method === "POST" ? await request.json() : null,
      });
      return new Response(JSON.stringify(path.endsWith("/plan") ? plan : job), {
        status: request.method === "POST" && !path.endsWith("/plan") ? 202 : 200,
        headers: { "content-type": "application/json" },
      });
    };
    const start: ContactsStartImportData["body"] = {
      mode: "new",
      input,
      planHash: plan.planHash,
      idempotencyKey: "migration-1",
    };
    const resume = { mode: "resume" as const, jobId: id, expectedGeneration: 1 };
    const promise = createClient({ apiKey: "samva_sk_test", fetch });
    expect(await promise.contacts.planImport(input)).toMatchObject(plan);
    expect((await promise.contacts.startImport(start)).id).toBe(id);
    expect((await promise.contacts.getImportJob({ id })).processedRows).toBe(1);
    expect((await promise.contacts.startImport(resume)).generation).toBe(2);
    await Effect.runPromise(
      Effect.gen(function* () {
        expect(yield* Contacts.planImport(input)).toMatchObject(plan);
        expect((yield* Contacts.startImport(start)).id).toBe(id);
        expect((yield* Contacts.getImportJob({ id })).processedRows).toBe(1);
        expect((yield* Contacts.startImport(resume)).generation).toBe(2);
      }).pipe(
        Effect.provide(
          Layer.provide(
            Client.layer({ apiKey: "samva_sk_test" }),
            Layer.provide(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, fetch)),
          ),
        ),
      ),
    );
    const expected = [
      { method: "POST", path: "/v1/contacts/imports/plan", body: input },
      { method: "POST", path: "/v1/contacts/imports", body: start },
      { method: "GET", path: `/v1/contacts/imports/${id}`, body: null },
      { method: "POST", path: "/v1/contacts/imports", body: resume },
    ];
    expect(requests).toEqual([...expected, ...expected]);
    expect(promise.contacts).not.toHaveProperty("bulkImport");
  });
});
