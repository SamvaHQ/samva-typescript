import { clientWithIdempotency, createBoundClient } from "../promises/client";
import type {
  AgentCallCapability,
  AgentContext,
  AgentDefinition,
  AgentModuleAuthority,
  AgentModuleOperation,
} from "./types";

/** The SDK transport carries no credential: only the supplied call-local RPC stub can reach Samva. */
export async function invokeAgent(
  agent: AgentDefinition,
  operation: AgentModuleOperation,
  capability: AgentCallCapability,
  authority: AgentModuleAuthority,
): Promise<unknown> {
  const pendingLogs: Promise<void>[] = [];
  const client = createBoundClient({
    baseUrl: "https://api.samva.dev",
    maxRetries: 0,
    fetch: async (input, init) => {
      const request = new Request(input, init);
      const url = new URL(request.url);
      if (url.origin !== "https://api.samva.dev") {
        throw new Error("Agent Samva calls must target the Samva API");
      }
      const headers = new Headers(request.headers);
      headers.delete("authorization");
      headers.delete("x-api-key");
      headers.delete("cookie");
      const result = await authority.samva({
        method: request.method,
        path: `${url.pathname}${url.search}`,
        headers: Object.fromEntries(headers),
        body: request.body === null ? null : await request.text(),
      });
      return new Response(result.status === 204 || result.status === 205 ? null : result.body, {
        status: result.status,
        headers: result.headers,
      });
    },
  });
  const counts = new Map<string, number>();
  const samva =
    operation.kind === "event"
      ? clientWithIdempotency(client, (method) => {
          const count = (counts.get(method) ?? 0) + 1;
          counts.set(method, count);
          return `${capability.agentId}:${operation.event.id}:${method}:${count}`;
        })
      : client;
  const ctx: AgentContext = {
    capability,
    samva,
    connections: {
      call: (integrationId, tool, input) => authority.connection(integrationId, tool, input),
    },
    memory: {
      search: (query) => authority.searchMemory(query),
      remember: (content) => authority.remember(content),
    },
    log(...values) {
      pendingLogs.push(authority.log(values));
    },
  };
  try {
    switch (operation.kind) {
      case "instructions":
        return typeof agent.instructions === "string"
          ? agent.instructions
          : await agent.instructions(ctx);
      case "knowledge":
        return agent.knowledge;
      case "list-skills":
        return Object.keys(agent.skills).sort();
      case "load-skill": {
        const skill = agent.skills[operation.name];
        if (skill === undefined) throw new Error(`Unknown agent skill: ${operation.name}`);
        return skill;
      }
      case "event": {
        if (
          capability.trigger.kind !== "event" ||
          capability.trigger.eventId !== operation.event.id ||
          capability.trigger.eventType !== operation.event.type ||
          capability.trigger.attempt !== operation.attempt
        ) {
          throw new Error("The agent event does not match its call capability");
        }
        const handler = agent.events[operation.event.type];
        if (handler === undefined)
          throw new Error(`Unknown agent event handler: ${operation.event.type}`);
        return (await handler(operation.event, ctx)) ?? null;
      }
      case "tool": {
        const tool = agent.tools[operation.name];
        if (tool === undefined) throw new Error(`Unknown agent tool: ${operation.name}`);
        return await tool.execute(operation.input, ctx);
      }
    }
  } finally {
    await Promise.all(pendingLogs);
  }
}
