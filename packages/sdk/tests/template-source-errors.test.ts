import { assert, describe, expect, expectTypeOf, it } from "@effect/vitest";
import { Effect } from "effect";
import { HttpClient, HttpClientResponse } from "effect/http";
import { ConflictError, createClient, SamvaApiError, TemplateSourceError } from "samva";
import { categoriesOf, isRetryable } from "samva/effect/categories";
import * as Client from "samva/effect/client";
import {
  ConflictError as EffectConflictError,
  TemplateSourceError as EffectTemplateSourceError,
} from "samva/effect/errors";
import * as Templates from "samva/effect/templates";

const input = {
  id: "tmpl_1234567890abcdef",
  expectedRevision: "revision-2",
  expectedHead: "a".repeat(40),
  message: "Save email source",
  idempotencyKey: "save-source-regression",
};

const sourceError = {
  _tag: "TemplateSourceError",
  message: "Template source contains errors",
  revision: "revision-3",
  diagnostics: [
    {
      code: "TS2322",
      severity: "error",
      message: "Type 'number' is not assignable to type 'string'.",
      origins: [
        { fileName: "emails/welcome.tsx", lineNumber: 12, columnNumber: 7 },
        { fileName: "components/header.tsx", lineNumber: 4, columnNumber: 3 },
      ],
      clients: ["gmail"],
      notes: "Check the heading prop",
      provenance: "typescript",
      fixtures: ["welcome"],
      occurrences: [[{ fileName: "emails/welcome.tsx", lineNumber: 12, columnNumber: 7 }]],
      compatibility: { assessment: "unverified", title: "Compilation failed" },
    },
    {
      code: "unused-style",
      severity: "warning",
      message: "Style is unused",
      origins: [{ fileName: "theme.css", lineNumber: 8, columnNumber: 1 }],
      clients: null,
      notes: null,
      provenance: null,
      fixtures: null,
      occurrences: null,
      compatibility: null,
    },
  ],
} as const;

const conflict = {
  _tag: "ConflictError",
  message: "Workspace revision changed",
  resource: input.id,
} as const;

const response = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

describe("public SDK workspace save errors", () => {
  it("Promise throws the public TemplateSourceError with typed, located diagnostics on 422", async () => {
    let calls = 0;
    const client = createClient({
      apiKey: "samva_sk_test",
      fetch: async (request) => {
        calls += 1;
        assert(request instanceof Request);
        expect(request.method).toBe("POST");
        expect(new URL(request.url).pathname).toBe(`/v1/templates/${input.id}/workspace/save`);
        return response(422, sourceError);
      },
    });

    const error = await client.templates.saveWorkspace(input).catch((cause: unknown) => cause);

    assert(error instanceof TemplateSourceError);
    expect(error).toBeInstanceOf(SamvaApiError);
    expect(error.name).toBe("TemplateSourceError");
    expect(error).toMatchObject({ ...sourceError, status: 422 });
    expect(error.diagnostics).toEqual(sourceError.diagnostics);
    const diagnostic = error.diagnostics[0]!;
    expectTypeOf(diagnostic.code).toEqualTypeOf<string>();
    expectTypeOf(diagnostic.message).toEqualTypeOf<string>();
    expectTypeOf(diagnostic.severity).toEqualTypeOf<"error" | "warning" | "info">();
    expectTypeOf(diagnostic.origins[0]!.fileName).toEqualTypeOf<string>();
    expectTypeOf(diagnostic.origins[0]!.lineNumber).toEqualTypeOf<number>();
    expectTypeOf(diagnostic.origins[0]!.columnNumber).toEqualTypeOf<number>();
    expect(categoriesOf(error)).toEqual(["validation"]);
    expect(isRetryable(error)).toBe(false);
    expect(calls).toBe(1);
  });

  it.effect("Effect catchTag receives the public TemplateSourceError and full diagnostics", () => {
    let calls = 0;
    return Effect.gen(function* () {
      const diagnostics = yield* Templates.saveWorkspace(input).pipe(
        Effect.catchTag("TemplateSourceError", (error) => {
          expect(error).toBeInstanceOf(EffectTemplateSourceError);
          expect(error.message).toBe(sourceError.message);
          expect(error.revision).toBe(sourceError.revision);
          const diagnostic = error.diagnostics[0]!;
          expectTypeOf(diagnostic.code).toEqualTypeOf<string>();
          expectTypeOf(diagnostic.message).toEqualTypeOf<string>();
          expectTypeOf(diagnostic.severity).toEqualTypeOf<"error" | "warning" | "info">();
          expectTypeOf(diagnostic.origins[0]!.fileName).toEqualTypeOf<string>();
          expectTypeOf(diagnostic.origins[0]!.lineNumber).toEqualTypeOf<number>();
          expectTypeOf(diagnostic.origins[0]!.columnNumber).toEqualTypeOf<number>();
          expect(categoriesOf(error)).toEqual(["validation"]);
          expect(isRetryable(error)).toBe(false);
          return Effect.succeed(error.diagnostics);
        }),
      );
      expect(diagnostics).toEqual(sourceError.diagnostics);
      expect(calls).toBe(1);
    }).pipe(
      Effect.provide(Client.layer({ apiKey: "samva_sk_test" })),
      Effect.provideService(
        HttpClient.HttpClient,
        HttpClient.make((request) => {
          calls += 1;
          expect(request.method).toBe("POST");
          expect(request.url).toContain(`/v1/templates/${input.id}/workspace/save`);
          return Effect.succeed(HttpClientResponse.fromWeb(request, response(422, sourceError)));
        }),
      ),
    );
  });

  it("Promise preserves ConflictError for workspace save 409", async () => {
    const client = createClient({
      apiKey: "samva_sk_test",
      fetch: async () => response(409, conflict),
    });
    const error = await client.templates.saveWorkspace(input).catch((cause: unknown) => cause);
    assert(error instanceof ConflictError);
    expect(error).toMatchObject({ ...conflict, status: 409 });
    expect(categoriesOf(error)).toEqual(["conflict"]);
  });

  it.effect(
    "Effect preserves the ConflictError tag and public constructor for workspace save 409",
    () =>
      Effect.gen(function* () {
        const refusal = yield* Templates.saveWorkspace(input).pipe(
          Effect.catchTag("ConflictError", (error) => {
            expect(error).toBeInstanceOf(EffectConflictError);
            return Effect.succeed(error);
          }),
        );
        expect(refusal).toMatchObject(conflict);
        expect(categoriesOf(refusal)).toEqual(["conflict"]);
      }).pipe(
        Effect.provide(Client.layer({ apiKey: "samva_sk_test" })),
        Effect.provideService(
          HttpClient.HttpClient,
          HttpClient.make((request) =>
            Effect.succeed(HttpClientResponse.fromWeb(request, response(409, conflict))),
          ),
        ),
      ),
  );
});
