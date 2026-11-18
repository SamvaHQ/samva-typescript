import type { Schema } from "effect";

import type { AgentModuleManifest, AgentModuleTool } from "../client/types.gen";
import type { SamvaClient } from "../promises/client";

export type { AgentModuleManifest, AgentModuleTool } from "../client/types.gen";

type DeepReadonly<T> = T extends readonly (infer A)[]
  ? readonly DeepReadonly<A>[]
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

/** Handler and tool descriptors are derived by defineAgent from the registered code. */
export type AgentManifest = DeepReadonly<
  Omit<AgentModuleManifest, "tools" | "skills" | "events" | "schedules">
>;

/** The host supplies a fresh capability for every invocation; it is never an environment binding. */
export interface AgentCallCapability {
  readonly callId: string;
  readonly organizationId: string;
  readonly agentId: string;
  readonly versionId: string;
  readonly bundleSha256: string;
  /** Unix milliseconds. */
  readonly expiresAt: number;
  readonly trigger:
    | {
        readonly kind: "conversation";
        readonly conversationId: string;
        readonly counterpart:
          | { readonly kind: "contact"; readonly contactId: string }
          | { readonly kind: "correspondent"; readonly correspondentId: string };
        readonly admissionId: string;
        /** The admitted mailbox target. The host still checks every SDK request against it. */
        readonly target: {
          readonly mailboxId: string;
          readonly threadId: string;
          readonly messageId: string;
        } | null;
      }
    | {
        readonly kind: "event";
        readonly eventId: string;
        readonly eventType: string;
        readonly attempt: number;
      }
    | { readonly kind: "schedule"; readonly cron: string; readonly scheduledAt: number };
}

export interface AgentMemoryMatch {
  readonly id: string;
  readonly content: string;
}

export interface AgentContext {
  readonly capability: AgentCallCapability;
  readonly samva: SamvaClient;
  readonly connections: {
    call(
      integrationId: string,
      tool: string,
      input: Readonly<Record<string, unknown>>,
    ): Promise<unknown>;
  };
  readonly workflows?: { start(input: AgentWorkflowStart): Promise<string> };
  readonly state?: {
    readonly agent: AgentState;
    readonly conversation: AgentState;
  };
  readonly memory: {
    search(query: string): Promise<ReadonlyArray<AgentMemoryMatch>>;
    remember(content: string): Promise<void>;
  };
  log(...values: ReadonlyArray<unknown>): void;
}

export interface AgentWorkflowStart {
  readonly exportName: string;
  readonly idempotencyKey: string;
  readonly input: Schema.Json;
}

export interface AgentState {
  call(operation: string, input: Schema.Json): Promise<Schema.Json>;
}

export interface AgentStateCall {
  readonly scope: "agent" | "conversation";
  readonly operation: string;
  readonly input: Schema.Json;
}

export interface AgentEvent<Data = unknown> {
  readonly id: string;
  readonly type: string;
  readonly timestamp: string;
  readonly data: Data;
}

export type AgentEventHandler = (
  event: AgentEvent,
  ctx: AgentContext,
) => unknown | Promise<unknown>;
export type AgentScheduleHandler = (ctx: AgentContext) => unknown | Promise<unknown>;
export type AgentInstructions = string | ((ctx: AgentContext) => string | Promise<string>);

export interface AgentTool {
  readonly input: Schema.ConstraintDecoder<unknown>;
  readonly descriptor: DeepReadonly<AgentModuleTool>;
  execute(input: unknown, ctx: AgentContext): Promise<unknown>;
}

export interface AgentDefinition<
  Tools extends Readonly<Record<string, AgentTool>> = Readonly<Record<string, AgentTool>>,
> {
  readonly manifest: DeepReadonly<AgentModuleManifest>;
  __samvaAgentRuntime(
    operation: AgentModuleOperation,
    capability: AgentCallCapability,
    authority: AgentModuleAuthority,
  ): Promise<unknown>;
  readonly instructions: AgentInstructions;
  readonly knowledge: string;
  readonly skills: Readonly<Record<string, string>>;
  readonly tools: Tools;
  readonly events: Readonly<Record<string, AgentEventHandler>>;
  readonly schedules: Readonly<Record<string, AgentScheduleHandler>>;
  readonly workflows?: ReadonlyArray<string>;
}

/** The host calls one operation with one call-local authority over Workers RPC. */
export type AgentModuleOperation =
  | { readonly kind: "instructions" }
  | { readonly kind: "knowledge" }
  | { readonly kind: "list-skills" }
  | { readonly kind: "load-skill"; readonly name: string }
  | { readonly kind: "tool"; readonly name: string; readonly input: unknown }
  | { readonly kind: "event"; readonly event: AgentEvent; readonly attempt: number }
  | { readonly kind: "schedule"; readonly cron: string; readonly scheduledAt: number };

export interface AgentModuleRequest {
  readonly method: string;
  readonly path: string;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: string | null;
}

export interface AgentModuleResponse {
  readonly status: number;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: string;
}

export interface AgentModuleAuthority {
  samva(request: AgentModuleRequest): Promise<AgentModuleResponse>;
  connection(
    integrationId: string,
    tool: string,
    input: Readonly<Record<string, unknown>>,
  ): Promise<unknown>;
  searchMemory(query: string): Promise<ReadonlyArray<AgentMemoryMatch>>;
  remember(content: string): Promise<void>;
  log(values: ReadonlyArray<unknown>): Promise<void>;
  state?(call: AgentStateCall): Promise<Schema.Json>;
  startWorkflow?(input: AgentWorkflowStart): Promise<string>;
}
