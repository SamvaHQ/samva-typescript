import { Schema } from "effect";

import type { AgentModuleTool } from "../client/types.gen";
import { invokeAgent } from "./runtime";
import type {
  AgentContext,
  AgentDefinition,
  AgentEventHandler,
  AgentInstructions,
  AgentManifest,
  AgentScheduleHandler,
  AgentTool,
} from "./types";

export * from "./types";

/** Input is decoded before execute runs, in the host and in offline evals alike. */
export function defineTool<const S extends Schema.ConstraintDecoder<unknown>, Output>(definition: {
  readonly description: string;
  readonly input: S;
  readonly approval?: AgentModuleTool["approval"];
  readonly replay: AgentModuleTool["replay"];
  readonly execute: (input: S["Type"], ctx: AgentContext) => Output;
}) {
  const document = Schema.toJsonSchemaDocument(definition.input);
  const jsonObject = Schema.Record(Schema.String, Schema.Json);
  const inputSchema = Schema.decodeUnknownSync(jsonObject)(document.schema);
  const descriptor: AgentTool["descriptor"] = {
    description: definition.description,
    input: {
      ...inputSchema,
      ...(Object.keys(document.definitions).length > 0
        ? { $defs: Schema.decodeUnknownSync(jsonObject)(document.definitions) }
        : {}),
    },
    ...(definition.approval === undefined ? {} : { approval: definition.approval }),
    replay: definition.replay,
  };
  return {
    input: definition.input,
    descriptor,
    async execute(input: unknown, ctx: AgentContext): Promise<Awaited<Output>> {
      const decoded = await Schema.decodeUnknownPromise(definition.input)(input);
      return await definition.execute(decoded, ctx);
    },
  };
}

export function defineAgent<
  const Tools extends Readonly<Record<string, AgentTool>> = Record<never, never>,
>(definition: {
  readonly manifest: AgentManifest;
  readonly instructions: AgentInstructions;
  readonly knowledge?: string;
  readonly skills?: Readonly<Record<string, string>>;
  readonly tools?: Tools;
  readonly events?: Readonly<Record<string, AgentEventHandler>>;
  readonly schedules?: Readonly<Record<string, AgentScheduleHandler>>;
  readonly workflows?: ReadonlyArray<string>;
}): AgentDefinition<Tools>;
export function defineAgent(definition: {
  readonly manifest: AgentManifest;
  readonly instructions: AgentInstructions;
  readonly knowledge?: string;
  readonly skills?: Readonly<Record<string, string>>;
  readonly tools?: Readonly<Record<string, AgentTool>>;
  readonly events?: Readonly<Record<string, AgentEventHandler>>;
  readonly schedules?: Readonly<Record<string, AgentScheduleHandler>>;
  readonly workflows?: ReadonlyArray<string>;
}): AgentDefinition {
  const skills = definition.skills ?? {};
  const tools = definition.tools ?? {};
  const events = definition.events ?? {};
  const schedules = definition.schedules ?? {};
  const agent: AgentDefinition = {
    __samvaAgentRuntime: (operation, capability, authority) =>
      invokeAgent(agent, operation, capability, authority),
    manifest: {
      ...definition.manifest,
      tools: Object.fromEntries(
        Object.entries(tools).map(([name, tool]) => [name, tool.descriptor]),
      ),
      skills: Object.keys(skills).sort(),
      events: Object.keys(events).sort(),
      schedules: Object.keys(schedules).sort(),
    },
    instructions: definition.instructions,
    knowledge: definition.knowledge ?? "",
    skills,
    tools,
    events,
    schedules,
    workflows: definition.workflows ?? [],
  };
  return agent;
}
