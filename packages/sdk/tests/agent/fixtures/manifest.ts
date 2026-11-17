import type { AgentManifest } from "../../../src/agent";

export const agentManifest = (name: string): AgentManifest => ({
  name,
  version: "1.0.0",
  knowledgeSourceIds: [],
  endpointIds: [],
  integrations: [],
  eventTriggers: [],
  policy: { presets: [], rules: [] },
  model: "standard",
  reasoning: "auto",
  workingHours: null,
  takeoverTimeoutMinutes: 30,
});
