import { describe, expect, expectTypeOf, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { FetchHttpClient } from "effect/http";
import { HttpApi, HttpApiClient, HttpApiEndpoint, HttpApiGroup } from "effect/http-api";

import { SamvaApi } from "../src/effect/generated";
import { fakeSamvaApi, type ApiScripts } from "./support/fake-samva-api";

const Api = HttpApi.make("fake-test").add(
  HttpApiGroup.make("records").add(
    HttpApiEndpoint.post("update", "/records/:id", {
      params: { id: Schema.String },
      query: { notify: Schema.Boolean },
      payload: Schema.Struct({ name: Schema.String }),
      success: Schema.Struct({ name: Schema.String, at: Schema.Date }),
    }),
    HttpApiEndpoint.post("special", "/records/special", {
      success: Schema.String.check(Schema.isMinLength(4)),
    }),
  ),
);
const at = new Date("2026-11-13T00:00:00.000Z");
const clientFor = (fake: ReturnType<ReturnType<typeof fakeSamvaApi>>) =>
  HttpApiClient.make(Api, { baseUrl: "https://api.test" }).pipe(
    Effect.provide(FetchHttpClient.layer),
    Effect.provideService(FetchHttpClient.Fetch, fake.fetch),
  );

describe("typed Samva API transport", () => {
  it.effect("runs generated request/response codecs and records the wire request", () =>
    Effect.gen(function* () {
      const fake = fakeSamvaApi(Api)({
        records: {
          update: ({ params, query, payload }) => {
            expect(params).toEqual({ id: "record 1" });
            expect(query).toEqual({ notify: true });
            return Effect.succeed({ name: payload.name, at });
          },
        },
      });
      const client = yield* clientFor(fake);
      expect(
        yield* client.records.update({
          params: { id: "record 1" },
          query: { notify: true },
          payload: { name: "Ada" },
        }),
      ).toEqual({ name: "Ada", at });
      expect(fake.requests).toMatchObject([
        {
          method: "POST",
          path: "/records/record%201",
          params: { id: "record 1" },
          query: { notify: "true" },
          body: { name: "Ada" },
        },
      ]);
      fake.assertComplete();
    }),
  );

  it.effect("selects a static route before a parameter route", () =>
    Effect.gen(function* () {
      const fake = fakeSamvaApi(Api)({ records: { special: () => Effect.succeed("special") } });
      const client = yield* clientFor(fake);
      expect(yield* client.records.special()).toBe("special");
      expect(fake.requests[0]).toMatchObject({ operation: "special", path: "/records/special" });
      fake.assertComplete();
    }),
  );

  it("reports an unscripted known operation even if its transport error was handled", async () => {
    const fake = fakeSamvaApi(Api)({});
    await expect(
      fake.fetch("https://api.test/records/1?notify=true", {
        method: "POST",
        body: JSON.stringify({ name: "Ada" }),
      }),
    ).rejects.toThrow("Unscripted Samva API call");
    expect(() => fake.assertComplete()).toThrow("records.update");
    expect(fake.requests).toHaveLength(1);
  });

  it("records a thrown handler failure even when the caller catches fetch", async () => {
    const fake = fakeSamvaApi(Api)({
      records: {
        special: () => {
          throw new Error("broken handler");
        },
      },
    });
    await fake.fetch("https://api.test/records/special", { method: "POST" }).catch(() => undefined);
    expect(() => fake.assertComplete()).toThrow("broken handler");
  });

  it("records request decoding failures even when the caller catches fetch", async () => {
    const fake = fakeSamvaApi(Api)({
      records: { update: () => Effect.succeed({ name: "Ada", at }) },
    });
    await fake
      .fetch("https://api.test/records/1?notify=true", {
        method: "POST",
        body: JSON.stringify({ name: 123 }),
      })
      .catch(() => undefined);
    expect(() => fake.assertComplete()).toThrow("SchemaError");
  });

  it("records response encoding failures even when the caller catches fetch", async () => {
    const fake = fakeSamvaApi(Api)({ records: { special: () => Effect.succeed("bad") } });
    await fake.fetch("https://api.test/records/special", { method: "POST" }).catch(() => undefined);
    expect(() => fake.assertComplete()).toThrow("outside its contract");
  });

  it("does not record request cancellation as a broken script", async () => {
    const started = Promise.withResolvers<void>();
    const controller = new AbortController();
    const fake = fakeSamvaApi(Api)({
      records: {
        special: () => Effect.sync(() => started.resolve()).pipe(Effect.andThen(Effect.never)),
      },
    });
    const response = fake.fetch("https://api.test/records/special", {
      method: "POST",
      signal: controller.signal,
    });
    await started.promise;
    controller.abort();
    await expect(response).rejects.toThrow("API script defect");
    expect(() => fake.assertComplete()).not.toThrow();
  });

  it("rejects an unknown route", async () => {
    const fake = fakeSamvaApi(Api)({});
    await expect(fake.fetch("https://api.test/unknown")).rejects.toThrow("Unknown Samva API route");
  });
});

// These errors must remain compile errors as the helper evolves.
const invalidResponse: ApiScripts<typeof Api> = {
  records: {
    // @ts-expect-error The generated response requires a Date and a name.
    update: () => Effect.succeed({ name: 123 }),
  },
};
void invalidResponse;
type SpecialScript = NonNullable<NonNullable<ApiScripts<typeof Api>["records"]>["special"]>;
expectTypeOf<
  Effect.Error<ReturnType<Exclude<SpecialScript, { readonly status: unknown }>>>
>().toEqualTypeOf<never>();

type MailboxSendScript = NonNullable<
  NonNullable<ApiScripts<typeof SamvaApi>["Mailboxes"]>["mailboxesSendMessage"]
>;
expectTypeOf<Extract<MailboxSendScript, { readonly status: number }>["status"]>().toEqualTypeOf<
  200 | 202
>();
const invalidStatus: ApiScripts<typeof SamvaApi> = {
  Mailboxes: {
    mailboxesSendMessage: {
      // @ts-expect-error Mailbox send declares 200 and 202, not 201.
      status: 201,
      handle: () => Effect.never,
    },
  },
};
void invalidStatus;
