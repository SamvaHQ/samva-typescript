/**
 * Samva SDK - TypeScript client for the Samva API.
 *
 * Ergonomic methods resolve with decoded success values and throw generated
 * plain-JavaScript error classes. The bound Hey API result surface remains
 * available under `client.raw` for transport-level access.
 *
 * @example
 * ```typescript
 * import { createClient, RateLimitedError } from "samva";
 *
 * const samva = createClient({ apiKey: "<samva-api-key>" });
 *
 * try {
 *   const { contact } = await samva.contacts.findOrCreate({
 *     create: { name: "Ada Lovelace" },
 *     lookup: { type: "email", value: "ada@example.com" },
 *   });
 *   await samva.email.send({
 *     to: contact,
 *     subject: "Hello",
 *     html: "<p>Hi there!</p>",
 *   });
 * } catch (error) {
 *   if (error instanceof RateLimitedError) console.log(error.retryAfterSeconds);
 * }
 * ```
 */

import { CLIENT_ATTRIBUTION_HEADER, clientAttribution } from "../client-attribution";
import {
  type Client,
  type Config,
  createClient as createGeneratedClient,
  mergeHeaders,
} from "../client/client";
import {
  Agents as agents,
  Analytics as analytics,
  ApiKeys as apiKeys,
  Attachments as attachments,
  Brands as brands,
  Campaigns as campaigns,
  ContactGroups as contactGroups,
  ContactEvents as contactEvents,
  Contacts as contacts,
  Conversations as conversations,
  CustomFields as customFields,
  Email as email,
  ExtensionInstallations as extensionInstallations,
  Extensions as extensions,
  Events as events,
  Feedback as feedback,
  Journeys as journeys,
  Mailboxes as mailboxes,
  Media as media,
  Messages as messages,
  Namespaces as namespaces,
  Operations as operations,
  Organizations as organizations,
  ScheduledMessages as scheduledMessages,
  Subscriptions as subscriptions,
  Templates as templates,
  Topics as topics,
  TopicForms as topicForms,
  TopicIssues as topicIssues,
  TopicPublicationDomains as topicPublicationDomains,
  Webhooks as webhooks,
  Whoami as whoami,
} from "../client/sdk.gen";
import type { MessagesSendData } from "../client/types.gen";
import {
  type InlineUpload,
  MediaUploadError,
  mediaCreateBody,
  planInlineUploads,
  withUploadedAttachments,
} from "../inline-attachments";
import {
  MailboxEventStream,
  type MailboxEventStreamConnection,
  type MailboxEventStreamOptions,
} from "../mailbox-events";
import {
  buildEmailSendPayload,
  buildMessagesSendPayload,
  replyToEmailsPayload,
} from "../normalize";
import { fromApiError, SamvaTransportError } from "./errors.gen";

export * from "./errors.gen";
export { MediaUploadError } from "../inline-attachments";
export type * from "./types.gen";
export {
  MailboxEventStream,
  MailboxEventStreamError,
  type MailboxEvent,
  type MailboxEventStreamErrorFields,
  type MailboxEventStreamErrorReason,
  type MailboxEventStreamErrorTag,
  type MailboxEventStreamFailure,
  type MailboxEventStreamOptions,
  type MailboxEventStreamReconnect,
  type MailboxEventStreamWebSocket,
  type MailboxEventType,
} from "../mailbox-events";

interface SamvaClientConfigBase extends Omit<Config, "baseUrl" | "responseStyle" | "throwOnError"> {
  /** Base URL for the API (defaults to https://api.samva.dev). */
  baseUrl?: string;
}

export type SamvaClientConfig =
  | (SamvaClientConfigBase & {
      /** Your Samva API key. The organization is derived from the key. */
      apiKey: string;
      authToken?: never;
    })
  | (SamvaClientConfigBase & {
      /** OAuth bearer token, such as one obtained by `samva login`. */
      authToken: string;
      apiKey?: never;
    });

type MessageSendBody = MessagesSendData["body"];
type MessageRecipient = MessageSendBody["to"][number];
type MessageSendRequestOptions<ThrowOnError extends boolean = false> = Omit<
  NonNullable<Parameters<typeof messages.send<ThrowOnError>>[1]>,
  "client"
>;
type MessageSendOptions<ThrowOnError extends boolean = false> =
  MessageSendRequestOptions<ThrowOnError> & {
    /** Sent as the `idempotency-key` header; defaults to a fresh UUID per call. */
    readonly idempotencyKey?: string | undefined;
  };
type MessageSendResponse<ThrowOnError extends boolean = false> = ReturnType<
  typeof messages.send<ThrowOnError>
>;
type ContactObjectRecipient = { readonly id: string };
type ErgonomicMessageRecipient = MessageRecipient | ContactObjectRecipient | string;
type EmailMessageSendBody = Extract<MessageSendBody, { readonly channel: "email" }>;
type ErgonomicReplyTo = string | ReadonlyArray<string>;
type ErgonomicEmailList = string | ReadonlyArray<string>;
type ErgonomicEmailContent = Omit<EmailMessageSendBody["email"], "replyTo"> & {
  readonly replyTo?: ErgonomicReplyTo | null | undefined;
};
type EmailAddSenderWireInput = NonNullable<Parameters<typeof email.addSender>[0]>;
type EmailAddSenderRequestOptions<ThrowOnError extends boolean = false> = Parameters<
  typeof email.addSender<ThrowOnError>
>[1];
type ErgonomicEmailAddSenderInput = Omit<
  EmailAddSenderWireInput,
  "idempotency-key" | "replyToEmails"
> & {
  readonly replyToEmails?: ErgonomicEmailList | null | undefined;
};
type EmailAddSenderOptions<ThrowOnError extends boolean = false> =
  EmailAddSenderRequestOptions<ThrowOnError> & {
    readonly idempotencyKey?: string | undefined;
  };
type ErgonomicEmailMessageSendBody = Omit<EmailMessageSendBody, "to" | "cc" | "bcc" | "email"> & {
  readonly to: ErgonomicMessageRecipient | ReadonlyArray<ErgonomicMessageRecipient>;
  readonly cc?: ErgonomicMessageRecipient | ReadonlyArray<ErgonomicMessageRecipient> | null;
  readonly bcc?: ErgonomicMessageRecipient | ReadonlyArray<ErgonomicMessageRecipient> | null;
  readonly email: ErgonomicEmailContent;
};
type ErgonomicMessageSendInput = ErgonomicEmailMessageSendBody;

type PromiseMessagesTransport = {
  readonly list: typeof messages.list;
  readonly remove: typeof messages.remove;
  readonly get: typeof messages.get;
  readonly getEmail: typeof messages.getEmail;
  readonly getStatus: typeof messages.getStatus;
  readonly getEvents: typeof messages.getEvents;
  readonly listDeliveries: typeof messages.listDeliveries;
  readonly getContent: typeof messages.getContent;
  readonly validateEmail: typeof messages.validateEmail;
  readonly send: <ThrowOnError extends boolean = false>(
    input: ErgonomicMessageSendInput,
    options?: MessageSendOptions<ThrowOnError>,
  ) => MessageSendResponse<ThrowOnError>;
};

type ErgonomicEmailSendBody = Omit<
  EmailMessageSendBody,
  "channel" | "email" | "to" | "cc" | "bcc"
> &
  ErgonomicEmailContent & {
    readonly to: ErgonomicMessageRecipient | ReadonlyArray<ErgonomicMessageRecipient>;
    readonly cc?: ErgonomicMessageRecipient | ReadonlyArray<ErgonomicMessageRecipient>;
    readonly bcc?: ErgonomicMessageRecipient | ReadonlyArray<ErgonomicMessageRecipient>;
  };

type PromiseEmailTransport = Omit<typeof email, "send"> & {
  readonly send: <ThrowOnError extends boolean = false>(
    input: ErgonomicEmailSendBody,
    options?: MessageSendOptions<ThrowOnError>,
  ) => MessageSendResponse<ThrowOnError>;
  readonly addSender: <ThrowOnError extends boolean = false>(
    input: ErgonomicEmailAddSenderInput,
    options?: EmailAddSenderOptions<ThrowOnError>,
  ) => ReturnType<typeof email.addSender<ThrowOnError>>;
};

type PromiseTemplatesTransport = typeof templates;

type RawMethod = (...arguments_: Array<never>) => PromiseLike<unknown>;
type SuccessValue<Method extends RawMethod> = Exclude<
  Awaited<ReturnType<Method>> extends infer Result
    ? Result extends { readonly data: infer Data }
      ? Data
      : never
    : never,
  undefined
>;
type ErgonomicOptions<Options> = Options extends object
  ? Omit<Options, "client" | "responseStyle" | "throwOnError">
  : Options;
type DirectArguments<Method extends RawMethod> = {
  [Key in keyof Parameters<Method>]: Key extends 1 | "1"
    ? ErgonomicOptions<Parameters<Method>[Key]>
    : Parameters<Method>[Key];
};
type DirectMethod<Method extends RawMethod> = (
  ...arguments_: DirectArguments<Method>
) => Promise<SuccessValue<Method>>;
type DirectService<Service extends object> = {
  readonly [Key in keyof Service]: Service[Key] extends RawMethod
    ? DirectMethod<Service[Key]>
    : Service[Key] extends object
      ? DirectService<Service[Key]>
      : Service[Key];
};

// oxlint-disable samva/no-hand-rolled-object-guard -- Generated client services and result envelopes are intentionally inspected shallowly without an Effect runtime dependency.
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;
// oxlint-enable samva/no-hand-rolled-object-guard

/**
 * The key a retry-safe call sends as `idempotency-key`: the `idempotencyKey`
 * option, else one the caller set in `headers`, else a fresh UUID. The
 * generated header parameter is applied after request headers, so it must carry
 * a caller-set header value rather than overwrite it.
 */
function resolveIdempotencyKey<
  Options extends {
    readonly idempotencyKey?: string | undefined;
    readonly headers?: Config["headers"];
  },
>(options: Options | undefined) {
  const { idempotencyKey, ...requestOptions } = options ?? ({} as Options);
  return {
    idempotencyKey:
      idempotencyKey ??
      mergeHeaders(requestOptions.headers).get("idempotency-key") ??
      crypto.randomUUID(),
    requestOptions,
  };
}

type CreatedUpload = Awaited<ReturnType<DirectService<typeof media>["create"]>>;

/**
 * Inline attachment content over the API's request cap travels as media instead: the largest
 * attachments are uploaded (create, put to the presigned URL, complete) and replaced by their
 * `mediaId`. The returned payload is the one request every send attempt reuses, so nothing is
 * uploaded twice.
 */
async function uploadOversizedAttachments(
  clientInstance: Client,
  payload: Record<string, unknown>,
  requestOptions: MessageSendRequestOptions<boolean>,
): Promise<Record<string, unknown>> {
  const plan = planInlineUploads(payload);
  if (plan.length === 0) return payload;
  const uploaded = new Map<number, { mediaId: string; upload: InlineUpload }>();
  const directMedia = createDirectService(createBoundService(media, clientInstance));
  // oxlint-disable no-await-in-loop -- Uploads run one at a time: the first failure stops the send before more bytes leave, and only one decoded attachment is held at once.
  for (const upload of plan) {
    const created = await directMedia.create(mediaCreateBody(upload), requestOptions);
    await putUpload(clientInstance, upload, created, requestOptions.signal ?? undefined);
    await directMedia.complete({ id: created.id }, requestOptions);
    uploaded.set(upload.index, { mediaId: created.id, upload });
  }
  // oxlint-enable no-await-in-loop
  return withUploadedAttachments(payload, uploaded);
}

/**
 * Send with oversized inline attachments uploaded first. Within the cap this is the send call
 * itself, one request and no extra await, so its result is returned unchanged.
 */
function sendWithUploads<Result extends PromiseLike<unknown>>(
  clientInstance: Client,
  payload: Record<string, unknown>,
  requestOptions: MessageSendRequestOptions<boolean>,
  send: (payload: Record<string, unknown>) => Result,
): Result {
  if (planInlineUploads(payload).length === 0) return send(payload);
  // oxlint-disable-next-line samva/no-unsafe-type-assertion -- the chained promise settles to the send's own result, which TypeScript cannot prove for a conditional result type.
  return uploadOversizedAttachments(clientInstance, payload, requestOptions).then(
    send,
  ) as unknown as Result;
}

async function putUpload(
  clientInstance: Client,
  upload: InlineUpload,
  created: CreatedUpload,
  signal: AbortSignal | undefined,
): Promise<void> {
  const fail = (status: number | undefined, cause?: unknown) =>
    new MediaUploadError({ filename: upload.filename, mediaId: created.id, status, cause });
  let response: Response;
  try {
    // The presigned URL authenticates itself, so the API key never travels to storage.
    const send = clientInstance.getConfig().fetch ?? globalThis.fetch;
    response = await send(
      new Request(created.upload.url, {
        method: created.upload.method,
        headers: created.upload.headers,
        body: upload.bytes as BodyInit,
        signal: signal ?? null,
      }),
    );
  } catch (error) {
    throw fail(undefined, error);
  }
  if (!response.ok) throw fail(response.status);
}

function createPromiseMessagesTransport(clientInstance: Client): PromiseMessagesTransport {
  const boundMessages = createBoundService(messages, clientInstance);
  return {
    list: boundMessages.list,
    remove: boundMessages.remove,
    get: boundMessages.get,
    getEmail: boundMessages.getEmail,
    getStatus: boundMessages.getStatus,
    getEvents: boundMessages.getEvents,
    listDeliveries: boundMessages.listDeliveries,
    getContent: boundMessages.getContent,
    validateEmail: boundMessages.validateEmail,
    send: <ThrowOnError extends boolean = false>(
      input: ErgonomicMessageSendInput,
      options?: MessageSendOptions<ThrowOnError>,
    ) => {
      const { idempotencyKey, requestOptions } = resolveIdempotencyKey(options);
      return sendWithUploads(
        clientInstance,
        buildMessagesSendPayload<MessageRecipient>(input),
        requestOptions,
        (payload) =>
          messages.send<ThrowOnError>(
            {
              "idempotency-key": idempotencyKey,
              ...(payload as MessageSendBody),
            },
            { ...requestOptions, client: clientInstance },
          ),
      );
    },
  };
}

function createPromiseEmailTransport(clientInstance: Client): PromiseEmailTransport {
  const boundEmail = createBoundService(email, clientInstance);
  return Object.assign(boundEmail, {
    addSender: <ThrowOnError extends boolean = false>(
      input: ErgonomicEmailAddSenderInput,
      options?: EmailAddSenderOptions<ThrowOnError>,
    ) => {
      const { replyToEmails, ...sender } = input;
      const { idempotencyKey, requestOptions } = resolveIdempotencyKey(options);
      return email.addSender<ThrowOnError>(
        {
          "idempotency-key": idempotencyKey,
          ...sender,
          ...replyToEmailsPayload(replyToEmails),
        },
        { ...requestOptions, client: clientInstance },
      );
    },
    send: <ThrowOnError extends boolean = false>(
      input: ErgonomicEmailSendBody,
      options?: MessageSendOptions<ThrowOnError>,
    ) => {
      const { idempotencyKey, requestOptions } = resolveIdempotencyKey(options);
      return sendWithUploads(
        clientInstance,
        buildEmailSendPayload<MessageRecipient>(input),
        requestOptions,
        (payload) =>
          messages.send<ThrowOnError>(
            {
              "idempotency-key": idempotencyKey,
              ...(payload as MessageSendBody),
            },
            { ...requestOptions, client: clientInstance },
          ),
      );
    },
  });
}

function createPromiseTemplatesTransport(clientInstance: Client): PromiseTemplatesTransport {
  return createBoundService(templates, clientInstance);
}

function createBoundService<Service extends object>(
  service: Service,
  clientInstance: Client,
): Service {
  const bound: Record<string, unknown> = {};
  for (const key of Object.getOwnPropertyNames(service)) {
    if (key === "length" || key === "name" || key === "prototype") continue;
    const value = (service as Record<string, unknown>)[key];
    if (typeof value === "function") {
      bound[key] =
        value.length >= 2
          ? (parameters?: Record<string, unknown>, options?: Record<string, unknown>) =>
              value(parameters ?? {}, { ...options, client: clientInstance })
          : (options?: Record<string, unknown>) => value({ ...options, client: clientInstance });
    } else if (isObject(value)) {
      bound[key] = createBoundService(value as object, clientInstance);
    } else {
      bound[key] = value;
    }
  }
  return bound as Service;
}

type RawResult = {
  readonly data?: unknown;
  readonly error?: unknown;
  readonly request?: Request;
  readonly response?: Response;
};

const directOptions = (options: unknown): Record<string, unknown> => ({
  ...(isObject(options) ? options : {}),
  responseStyle: "fields",
  throwOnError: false,
});

async function unwrap(
  method: (...arguments_: Array<unknown>) => PromiseLike<unknown>,
  arguments_: Array<unknown>,
) {
  let result: unknown;
  try {
    result = await method(...arguments_);
  } catch (error) {
    if (error instanceof MediaUploadError) throw error;
    throw fromApiError(error);
  }
  if (!isObject(result)) throw new SamvaTransportError(result);
  const raw = result as RawResult;
  const context = { request: raw.request, response: raw.response };
  if (raw.error !== undefined) throw fromApiError(raw.error, context);
  if ("data" in raw) return raw.data;
  throw new SamvaTransportError(result, context);
}

function createDirectService<Service extends object>(service: Service): DirectService<Service> {
  const direct: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(service)) {
    if (typeof value === "function") {
      direct[key] =
        value.length >= 2
          ? (parameters: unknown = {}, options: unknown = {}) =>
              unwrap(value, [parameters, directOptions(options)])
          : (options: unknown = {}) => unwrap(value, [directOptions(options)]);
    } else if (isObject(value)) {
      direct[key] = createDirectService(value as object);
    } else {
      direct[key] = value;
    }
  }
  return direct as DirectService<Service>;
}

export interface SamvaRawClient {
  /** The underlying generated HTTP client. */
  readonly client: Client;
  readonly messages: typeof messages;
  readonly scheduledMessages: typeof scheduledMessages;
  readonly brands: typeof brands;
  readonly campaigns: typeof campaigns;
  readonly email: typeof email;
  readonly media: typeof media;
  readonly templates: PromiseTemplatesTransport;
  readonly contacts: typeof contacts & typeof contactEvents;
  readonly events: typeof events;
  readonly conversations: typeof conversations;
  readonly webhooks: typeof webhooks;
  readonly operations: typeof operations;
  readonly apiKeys: typeof apiKeys;
  readonly organizations: typeof organizations;
  readonly attachments: typeof attachments;
  readonly contactGroups: typeof contactGroups;
  readonly customFields: typeof customFields;
  readonly subscriptions: typeof subscriptions;
  readonly topics: typeof topics;
  readonly topicForms: typeof topicForms;
  readonly topicIssues: typeof topicIssues;
  readonly topicPublicationDomains: typeof topicPublicationDomains;
  readonly agents: typeof agents;
  readonly analytics: typeof analytics;
  readonly feedback: typeof feedback;
  readonly whoami: typeof whoami;
  readonly journeys: typeof journeys;
  readonly mailboxes: typeof mailboxes;
  readonly namespaces: typeof namespaces;
  readonly extensions: typeof extensions;
  readonly extensionInstallations: typeof extensionInstallations;
}

/** The mailbox operations, plus the mailbox event stream. */
export type PromiseMailboxesService = DirectService<typeof mailboxes> & {
  /**
   * The organization's mailbox events over a WebSocket, as an async iterable that resumes from
   * the last handled event. See {@link MailboxEventStream}.
   */
  readonly events: (options?: MailboxEventStreamOptions) => MailboxEventStream;
};

export interface SamvaClient {
  /** Bound, unmodified Hey API methods and their original result envelopes. */
  readonly raw: SamvaRawClient;
  readonly messages: DirectService<PromiseMessagesTransport>;
  readonly scheduledMessages: DirectService<typeof scheduledMessages>;
  readonly brands: DirectService<typeof brands>;
  readonly campaigns: DirectService<typeof campaigns>;
  readonly email: DirectService<PromiseEmailTransport>;
  readonly media: DirectService<typeof media>;
  readonly templates: DirectService<PromiseTemplatesTransport>;
  readonly contacts: DirectService<typeof contacts & typeof contactEvents>;
  readonly events: DirectService<typeof events>;
  readonly conversations: DirectService<typeof conversations>;
  readonly webhooks: DirectService<typeof webhooks>;
  readonly operations: DirectService<typeof operations>;
  readonly apiKeys: DirectService<typeof apiKeys>;
  readonly organizations: DirectService<typeof organizations>;
  readonly attachments: DirectService<typeof attachments>;
  readonly contactGroups: DirectService<typeof contactGroups>;
  readonly customFields: DirectService<typeof customFields>;
  readonly subscriptions: DirectService<typeof subscriptions>;
  readonly topics: DirectService<typeof topics>;
  readonly topicForms: DirectService<typeof topicForms>;
  readonly topicIssues: DirectService<typeof topicIssues>;
  readonly topicPublicationDomains: DirectService<typeof topicPublicationDomains>;
  readonly agents: DirectService<typeof agents>;
  readonly analytics: DirectService<typeof analytics>;
  readonly feedback: DirectService<typeof feedback>;
  readonly whoami: DirectService<typeof whoami>;
  readonly journeys: DirectService<typeof journeys>;
  readonly mailboxes: PromiseMailboxesService;
  readonly namespaces: DirectService<typeof namespaces>;
  readonly extensions: DirectService<typeof extensions>;
  readonly extensionInstallations: DirectService<typeof extensionInstallations>;
}

/** Create a configured Promise client. */
export function createClient(config: SamvaClientConfig): SamvaClient {
  const authHeaders: Readonly<Record<string, string>> =
    config.authToken !== undefined
      ? { Authorization: `Bearer ${config.authToken}` }
      : { "X-API-Key": config.apiKey };
  const clientInstance = createGeneratedClient({
    ...config,
    baseUrl: config.baseUrl ?? "https://api.samva.dev",
    headers: mergeHeaders(
      { [CLIENT_ATTRIBUTION_HEADER]: clientAttribution("typescript-promise") },
      config.headers,
      authHeaders,
    ),
    responseStyle: "fields",
    throwOnError: false,
  });
  clientInstance.interceptors.request.use((request) => {
    const headers = new Headers(request.headers);
    for (const [name, value] of Object.entries(authHeaders)) headers.set(name, value);
    return new Request(request, { headers });
  });
  const raw: SamvaRawClient = {
    client: clientInstance,
    messages: createBoundService(messages, clientInstance),
    scheduledMessages: createBoundService(scheduledMessages, clientInstance),
    brands: createBoundService(brands, clientInstance),
    campaigns: createBoundService(campaigns, clientInstance),
    email: createBoundService(email, clientInstance),
    media: createBoundService(media, clientInstance),
    templates: createPromiseTemplatesTransport(clientInstance),
    contacts: Object.assign(
      createBoundService(contacts, clientInstance),
      createBoundService(contactEvents, clientInstance),
    ),
    events: createBoundService(events, clientInstance),
    conversations: createBoundService(conversations, clientInstance),
    webhooks: createBoundService(webhooks, clientInstance),
    operations: createBoundService(operations, clientInstance),
    apiKeys: createBoundService(apiKeys, clientInstance),
    organizations: createBoundService(organizations, clientInstance),
    attachments: createBoundService(attachments, clientInstance),
    contactGroups: createBoundService(contactGroups, clientInstance),
    customFields: createBoundService(customFields, clientInstance),
    subscriptions: createBoundService(subscriptions, clientInstance),
    topics: createBoundService(topics, clientInstance),
    topicForms: createBoundService(topicForms, clientInstance),
    topicIssues: createBoundService(topicIssues, clientInstance),
    topicPublicationDomains: createBoundService(topicPublicationDomains, clientInstance),
    agents: createBoundService(agents, clientInstance),
    analytics: createBoundService(analytics, clientInstance),
    feedback: createBoundService(feedback, clientInstance),
    whoami: createBoundService(whoami, clientInstance),
    journeys: createBoundService(journeys, clientInstance),
    mailboxes: createBoundService(mailboxes, clientInstance),
    namespaces: createBoundService(namespaces, clientInstance),
    extensions: createBoundService(extensions, clientInstance),
    extensionInstallations: createBoundService(extensionInstallations, clientInstance),
  };
  const streamConnection: MailboxEventStreamConnection = {
    baseUrl: config.baseUrl ?? "https://api.samva.dev",
    headers: async () =>
      Object.fromEntries(
        mergeHeaders(
          { [CLIENT_ATTRIBUTION_HEADER]: clientAttribution("typescript-promise") },
          config.headers,
          authHeaders,
        ).entries(),
      ),
    fetch: config.fetch,
  };
  const promiseMessages = createPromiseMessagesTransport(clientInstance);
  const promiseEmail = createPromiseEmailTransport(clientInstance);
  return {
    raw,
    messages: createDirectService(promiseMessages),
    scheduledMessages: createDirectService(raw.scheduledMessages),
    brands: createDirectService(raw.brands),
    campaigns: createDirectService(raw.campaigns),
    email: createDirectService(promiseEmail),
    media: createDirectService(raw.media),
    templates: createDirectService(raw.templates),
    contacts: createDirectService(raw.contacts),
    events: createDirectService(raw.events),
    conversations: createDirectService(raw.conversations),
    webhooks: createDirectService(raw.webhooks),
    operations: createDirectService(raw.operations),
    apiKeys: createDirectService(raw.apiKeys),
    organizations: createDirectService(raw.organizations),
    attachments: createDirectService(raw.attachments),
    contactGroups: createDirectService(raw.contactGroups),
    customFields: createDirectService(raw.customFields),
    subscriptions: createDirectService(raw.subscriptions),
    topics: createDirectService(raw.topics),
    topicForms: createDirectService(raw.topicForms),
    topicIssues: createDirectService(raw.topicIssues),
    topicPublicationDomains: createDirectService(raw.topicPublicationDomains),
    agents: createDirectService(raw.agents),
    analytics: createDirectService(raw.analytics),
    feedback: createDirectService(raw.feedback),
    whoami: createDirectService(raw.whoami),
    journeys: createDirectService(raw.journeys),
    mailboxes: Object.assign(createDirectService(raw.mailboxes), {
      events: (options?: MailboxEventStreamOptions) =>
        new MailboxEventStream(streamConnection, options),
    }),
    namespaces: createDirectService(raw.namespaces),
    extensions: createDirectService(raw.extensions),
    extensionInstallations: createDirectService(raw.extensionInstallations),
  };
}

export type { Client, Config } from "../client/client";
