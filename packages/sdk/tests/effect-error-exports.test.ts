import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer } from "effect";
import { HttpClient, HttpClientResponse } from "effect/http";

import * as Client from "../src/effect/client";
import * as Errors from "../src/effect/errors";
import * as EffectSdk from "../src/effect/index";
import * as Organizations from "../src/effect/organizations";
import * as Retry from "../src/effect/retry";
import { MediaUploadError } from "../src/inline-attachments";
import * as PromiseErrors from "../src/promises/errors.gen";

// The generated Promise errors track the contracts' API error inventory.
const transportOnly = new Set(["SamvaApiError", "SamvaTransportError"]);
const apiErrorNames = Object.keys(PromiseErrors).filter(
  (name) => /^[A-Z]\w*Error$/.test(name) && !transportOnly.has(name),
);

describe("samva/effect/errors", () => {
  it("exports exactly the API errors and MediaUploadError", () => {
    expect(Object.keys(Errors).sort()).toEqual([...apiErrorNames, "MediaUploadError"].sort());
  });

  it.each(apiErrorNames)("shares the %s constructor with the barrel", (name) => {
    const exported = (Errors as Record<string, unknown>)[name];
    expect(exported).toBeTypeOf("function");
    expect((exported as { name: string }).name).toBe(name);
    expect(exported).toBe((EffectSdk as Record<string, unknown>)[name]);
  });

  it("shares MediaUploadError with the upload implementation and barrel", () => {
    const error = new MediaUploadError({
      filename: "image.png",
      mediaId: "media_test",
      status: 503,
    });
    expect(Errors.MediaUploadError).toBe(MediaUploadError);
    expect(EffectSdk.MediaUploadError).toBe(Errors.MediaUploadError);
    expect(error).toBeInstanceOf(Errors.MediaUploadError);
  });

  it.effect("decodes an API failure as the focused constructor and catches its tag", () =>
    Effect.gen(function* () {
      const client = Client.layer({ apiKey: "samva_sk_test" }).pipe(
        Layer.provide(
          Layer.succeed(
            HttpClient.HttpClient,
            HttpClient.make((request) =>
              Effect.succeed(
                HttpClientResponse.fromWeb(
                  request,
                  new Response(JSON.stringify({ _tag: "InternalError", message: "test failure" }), {
                    status: 500,
                    headers: { "content-type": "application/json" },
                  }),
                ),
              ),
            ),
          ),
        ),
      );
      const failure = yield* Organizations.get().pipe(
        Effect.catchTag("InternalError", (error) => {
          expect(error).toBeInstanceOf(Errors.InternalError);
          return Effect.succeed(error.message);
        }),
        Effect.provide(Layer.mergeAll(Retry.layerDisabled, client)),
      );
      expect(failure).toBe("test failure");
    }),
  );
});
