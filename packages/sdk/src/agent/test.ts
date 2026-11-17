import { createBoundClient } from "../promises/client";
import type { AgentContext, AgentDefinition, AgentEvent, AgentTool } from "./types";

export interface AgentTestRunner<Tools extends Readonly<Record<string, AgentTool>>> {
  tool<Name extends keyof Tools & string>(
    name: Name,
    input: Tools[Name]["input"]["Encoded"],
  ): ReturnType<Tools[Name]["execute"]>;
  event(event: AgentEvent): Promise<unknown>;
  schedule(cron: string): Promise<unknown>;
  instructions(): Promise<string>;
  skill(name: string): string;
}

/** Run the same registered handlers and validated tools with explicitly supplied fake authority. */
export function runAgent<Tools extends Readonly<Record<string, AgentTool>>>(
  agent: AgentDefinition<Tools>,
  ctx: AgentContext,
): AgentTestRunner<Tools>;
export function runAgent(agent: AgentDefinition, ctx: AgentContext) {
  return {
    async tool(name: string, input: unknown) {
      const tool = agent.tools[name];
      if (!tool) throw new Error(`Unknown agent tool: ${name}`);
      return await tool.execute(input, ctx);
    },
    async event(event: AgentEvent) {
      const handler = agent.events[event.type];
      if (!handler) throw new Error(`Unknown agent event handler: ${event.type}`);
      return await handler(event, ctx);
    },
    async schedule(cron: string) {
      const handler = agent.schedules[cron];
      if (!handler) throw new Error(`Unknown agent schedule: ${cron}`);
      return await handler(ctx);
    },
    async instructions() {
      return typeof agent.instructions === "function"
        ? await agent.instructions(ctx)
        : agent.instructions;
    },
    skill(name: string) {
      const markdown = agent.skills[name];
      if (markdown === undefined) throw new Error(`Unknown agent skill: ${name}`);
      return markdown;
    },
  };
}

export interface AgentEval<Agent extends AgentDefinition = AgentDefinition> {
  readonly name: string;
  run(agent: Agent, ctx: AgentContext): void | Promise<void>;
}

/** Eval files are ordinary modules: define assertions in run and invoke them with runEval. */
export function defineEval<Agent extends AgentDefinition>(
  evaluation: AgentEval<Agent>,
): AgentEval<Agent> {
  return evaluation;
}

/** A failed assertion rejects instead of turning an unsuccessful evaluation into a pass. */
export async function runEval<Agent extends AgentDefinition>(
  agent: Agent,
  evaluation: AgentEval<Agent>,
  ctx: AgentContext,
) {
  await evaluation.run(agent, ctx);
  return { name: evaluation.name, passed: true };
}

export interface RecordedCall {
  method: string;
  path: string;
  body: unknown;
  idempotencyKey: string | null;
}
/** Canned responses are keyed by `METHOD /path`. */
export function createTestClient(responses: Record<string, unknown> = {}) {
  const calls: RecordedCall[] = [];
  const client = createBoundClient({
    baseUrl: "https://api.samva.dev",
    async fetch(input, init) {
      const request = new Request(input, init);
      const url = new URL(request.url);
      const path = url.pathname + url.search;
      const text = await request.text();
      calls.push({
        method: request.method,
        path,
        body: text ? JSON.parse(text) : undefined,
        idempotencyKey: request.headers.get("idempotency-key"),
      });
      const response = responses[`${request.method} ${path}`];
      return Response.json(response ?? {});
    },
  });
  return Object.assign(client, { calls });
}
