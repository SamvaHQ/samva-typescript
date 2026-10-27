/**
 * Type-level proof that the category `catch*` combinators narrow the caught
 * category out of the error channel.
 */
import { Effect } from "effect";

import {
  catchAuthError,
  catchCategory,
  catchConflictError,
  catchValidationError,
  type BillingProviderError,
  type ConflictError,
  type EmailChannelError,
  type ForbiddenError,
  type FromAddressRequiredError,
  type InternalError,
  type UnauthorizedError,
  type ValidationError,
  type DeliveryUnavailableError,
} from "../../src/effect";

type ErrorOf<Eff> = [Eff] extends [Effect.Effect<unknown, infer E, unknown>] ? E : never;
type Assert<Condition extends true> = Condition;
type Has<Union, Member> = [Member] extends [Union] ? true : false;

declare const op: Effect.Effect<
  { readonly id: string },
  UnauthorizedError | ForbiddenError | ValidationError | ConflictError | InternalError
>;

// catchAuthError removes UnauthorizedError | ForbiddenError, keeps the rest.
const afterAuth = op.pipe(catchAuthError(() => Effect.void));
type AfterAuth = ErrorOf<typeof afterAuth>;
type _AuthDropsUnauthorized = Assert<
  Has<AfterAuth, UnauthorizedError> extends false ? true : false
>;
type _AuthDropsForbidden = Assert<Has<AfterAuth, ForbiddenError> extends false ? true : false>;
type _AuthKeepsValidation = Assert<Has<AfterAuth, ValidationError>>;
type _AuthKeepsConflict = Assert<Has<AfterAuth, ConflictError>>;

// catchConflictError removes ConflictError only.
const afterConflict = op.pipe(catchConflictError(() => Effect.void));
type AfterConflict = ErrorOf<typeof afterConflict>;
type _ConflictDropsConflict = Assert<
  Has<AfterConflict, ConflictError> extends false ? true : false
>;
type _ConflictKeepsAuth = Assert<Has<AfterConflict, UnauthorizedError>>;
type _ConflictKeepsInternal = Assert<Has<AfterConflict, InternalError>>;

// catchCategory("transient") removes ALL total-membership transient classes
// (InternalError, ExternalServiceError, BillingProviderError, DeliveryUnavailableError)
// but keeps EmailChannelError in the channel: only some instances (by `reason`)
// are transient, so excluding the class would be unsound.
declare const sendOp: Effect.Effect<
  { readonly id: string },
  | InternalError
  | BillingProviderError
  | DeliveryUnavailableError
  | EmailChannelError
  | ValidationError
>;
const afterTransient = sendOp.pipe(catchCategory("transient", () => Effect.void));
type AfterTransient = ErrorOf<typeof afterTransient>;
type _TransientDropsInternal = Assert<
  Has<AfterTransient, InternalError> extends false ? true : false
>;
type _TransientDropsBillingProvider = Assert<
  Has<AfterTransient, BillingProviderError> extends false ? true : false
>;
type _TransientDropsDeliveryUnavailable = Assert<
  Has<AfterTransient, DeliveryUnavailableError> extends false ? true : false
>;
type _TransientKeepsEmailChannel = Assert<Has<AfterTransient, EmailChannelError>>;
type _TransientKeepsValidation = Assert<Has<AfterTransient, ValidationError>>;

// The catchCategory handler union includes EmailChannelError for categories its
// `reason` can place it in.
type TransientHandlerInput = Parameters<
  Parameters<typeof catchCategory<"transient", void, never, never>>[1]
>[0];
type _TransientHandlerSeesEmailChannel = Assert<Has<TransientHandlerInput, EmailChannelError>>;
type _TransientHandlerSeesDeliveryUnavailable = Assert<
  Has<TransientHandlerInput, DeliveryUnavailableError>
>;

export type {
  _AuthDropsUnauthorized,
  _AuthDropsForbidden,
  _AuthKeepsValidation,
  _AuthKeepsConflict,
  _ConflictDropsConflict,
  _ConflictKeepsAuth,
  _ConflictKeepsInternal,
  _TransientDropsInternal,
  _TransientDropsBillingProvider,
  _TransientDropsDeliveryUnavailable,
  _TransientKeepsEmailChannel,
  _TransientKeepsValidation,
  _TransientHandlerSeesEmailChannel,
  _TransientHandlerSeesDeliveryUnavailable,
};

// catchValidationError removes every validation class, FromAddressRequiredError included, and its
// handler receives each of them.
declare const sendWithoutFrom: Effect.Effect<
  { readonly id: string },
  ValidationError | FromAddressRequiredError | InternalError
>;
const afterValidation = sendWithoutFrom.pipe(catchValidationError(() => Effect.void));
type AfterValidation = ErrorOf<typeof afterValidation>;
type _ValidationDropsValidation = Assert<
  Has<AfterValidation, ValidationError> extends false ? true : false
>;
type _ValidationDropsFromAddressRequired = Assert<
  Has<AfterValidation, FromAddressRequiredError> extends false ? true : false
>;
type _ValidationKeepsInternal = Assert<Has<AfterValidation, InternalError>>;
type ValidationHandlerInput = Parameters<Parameters<typeof catchValidationError>[0]>[0];
type _ValidationHandlerSeesFromAddressRequired = Assert<
  Has<ValidationHandlerInput, FromAddressRequiredError>
>;
