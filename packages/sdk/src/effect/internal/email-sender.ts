import { Effect } from "effect";

import { replyToEmailsPayload } from "../../normalize";
import { EmailGroup } from "../generated/email";
import { generateIdempotencyKey, withRetry } from "../retry";
import type { FlatRaw, Service } from "./client";
import { callEndpoint, type OperationResult, type RequestArg, stripUndefined } from "./operation";
import type { ErgonomicEmailList, SendOptions } from "./send";

type AddSenderRequest = NonNullable<RequestArg<FlatRaw["emailAddSender"]>>;
type AddSenderResult = OperationResult<"emailAddSender">;

export type EmailAddSenderInput = Omit<AddSenderRequest["payload"], "replyToEmails"> & {
  readonly replyToEmails?: ErgonomicEmailList | null | undefined;
};

export const addEmailSender = Effect.fn("Email.addSender")(function* (
  input: EmailAddSenderInput,
  options?: SendOptions,
) {
  const idempotencyKey = options?.idempotencyKey ?? (yield* generateIdempotencyKey);
  const { replyToEmails, ...sender } = input;
  return yield* withRetry(
    callEndpoint(EmailGroup, "emailAddSender", {
      headers: { "idempotency-key": idempotencyKey },
      payload: stripUndefined({
        ...sender,
        ...replyToEmailsPayload(replyToEmails),
      }),
    }) as Effect.Effect<Effect.Success<AddSenderResult>, Effect.Error<AddSenderResult>, Service>,
  );
});
