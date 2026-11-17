import { defineEval, runAgent } from "../../../src/agent/test";

export default defineEval({
  name: "support tool and event",
  async run(agent, ctx) {
    const local = runAgent(agent, ctx);
    const result = await local.tool("double", { count: 4 });
    if (result !== 8) throw new Error("Expected the tool to double its input");
    await local.event({
      id: "event-1",
      type: "appointment.confirmed",
      timestamp: "2026-01-01T00:00:00.000Z",
      data: { appointmentId: "appointment-1" },
    });
  },
});
