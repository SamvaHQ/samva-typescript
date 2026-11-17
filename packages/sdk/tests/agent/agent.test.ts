import { describe, expect, expectTypeOf, it } from "@effect/vitest";
import { Schema, SchemaGetter } from "effect";

import { defineAgent, defineTool, type AgentContext } from "../../src/agent";
import { createTestClient, defineEval, runAgent, runEval } from "../../src/agent/test";
import { agentManifest } from "./fixtures/manifest";
import supportEval from "./fixtures/support.eval";

const context = (callId = "call-1") => {
  const logs: ReadonlyArray<unknown>[] = [];
  const ctx: AgentContext = {
    capability: {
      callId,
      organizationId: "org_0000000000000000",
      agentId: "agt_0000000000000000",
      versionId: "agtv_0000000000000000",
      bundleSha256: "a".repeat(64),
      expiresAt: 1_800_000_000_000,
      trigger: {
        kind: "conversation",
        conversationId: "cconv_0000000000000000",
        counterpart: { kind: "contact", contactId: "contact_0000000000000000" },
        admissionId: `admission-${callId}`,
        target: null,
      },
    },
    samva: createTestClient(),
    connections: {
      async call() {
        throw new Error("Unexpected integration call");
      },
    },
    memory: {
      async search() {
        throw new Error("Unexpected memory search");
      },
      async remember() {
        throw new Error("Unexpected memory write");
      },
    },
    log(...values) {
      logs.push(values);
    },
  };
  return { ctx, logs };
};

const manifest = agentManifest("Support");

const agent = defineAgent({
  manifest,
  instructions: (ctx) => `Answer for ${ctx.capability.callId}`,
  knowledge: "Appointments last one hour.",
  skills: { reschedule: "# Reschedule\nAsk for the appointment id." },
  tools: {
    double: defineTool({
      description: "Double a number",
      input: Schema.Struct({ count: Schema.Finite }),
      approval: "person",
      replay: "safe",
      execute(input, ctx) {
        expectTypeOf(input.count).toEqualTypeOf<number>();
        ctx.log("double", ctx.capability.callId);
        return input.count * 2;
      },
    }),
  },
  events: {
    "appointment.confirmed"(event, ctx) {
      ctx.log(event.type, ctx.capability.callId);
    },
  },
  schedules: {
    "0 9 * * *"(ctx) {
      ctx.log("schedule", ctx.capability.callId);
      return "scheduled";
    },
  },
});

describe("samva/agent", () => {
  it("derives the publish descriptor from registered tools and handlers", () => {
    expect(agent.manifest.tools.double).toMatchObject({
      description: "Double a number",
      approval: "person",
      replay: "safe",
      input: { type: "object", required: ["count"], properties: { count: { type: "number" } } },
    });
    expect(agent.manifest.skills).toEqual(["reschedule"]);
    expect(agent.manifest.events).toEqual(["appointment.confirmed"]);
    expect(agent.manifest.schedules).toEqual(["0 9 * * *"]);
  });

  it("calls tools, events and schedules with fake per-call authority", async () => {
    const { ctx, logs } = context();
    const local = runAgent(agent, ctx);
    const output = await local.tool("double", { count: 5 });
    expectTypeOf(output).toEqualTypeOf<number>();
    expect(output).toBe(10);
    await local.event({
      id: "event-1",
      type: "appointment.confirmed",
      timestamp: "2026-01-01T00:00:00.000Z",
      data: {},
    });
    expect(await local.schedule("0 9 * * *")).toBe("scheduled");
    expect(logs).toEqual([
      ["double", "call-1"],
      ["appointment.confirmed", "call-1"],
      ["schedule", "call-1"],
    ]);
    expect(local.skill("reschedule")).toContain("# Reschedule");
    expect(await local.instructions()).toBe("Answer for call-1");
    expect(await runAgent(agent, context("call-2").ctx).instructions()).toBe("Answer for call-2");
  });

  it("validates unknown arguments before executing customer code", async () => {
    const { ctx, logs } = context();
    await expect(agent.tools.double.execute({ count: "wrong" }, ctx)).rejects.toThrow();
    expect(logs).toEqual([]);
  });

  it("decodes transformations before passing the inferred input to execute", async () => {
    const tool = defineTool({
      description: "Normalize a name",
      input: Schema.Struct({
        name: Schema.String.pipe(
          Schema.decodeTo(Schema.String, {
            decode: SchemaGetter.transform((name) => name.toUpperCase()),
            encode: SchemaGetter.passthrough(),
          }),
        ),
      }),
      replay: "safe",
      execute(input) {
        return input.name;
      },
    });
    expect(await tool.execute({ name: "Saatvik" }, context().ctx)).toBe("SAATVIK");
  });

  it("runs ordinary eval modules and propagates failed assertions", async () => {
    const { ctx, logs } = context();
    expect(await runEval(agent, supportEval, ctx)).toEqual({
      name: "support tool and event",
      passed: true,
    });
    expect(logs).toHaveLength(2);
    const failure = defineEval({
      name: "failure",
      run() {
        throw new Error("Failed assertion");
      },
    });
    await expect(runEval(agent, failure, ctx)).rejects.toThrow("Failed assertion");
  });

  it("reports missing handlers, schedules and skills instead of passing evals silently", async () => {
    const local = runAgent(agent, context().ctx);
    await expect(
      local.event({ id: "x", type: "missing", timestamp: "2026-01-01T00:00:00.000Z", data: {} }),
    ).rejects.toThrow("Unknown agent event handler");
    await expect(local.schedule("0 1 * * *")).rejects.toThrow("Unknown agent schedule");
    expect(() => local.skill("missing")).toThrow("Unknown agent skill");
  });
});
