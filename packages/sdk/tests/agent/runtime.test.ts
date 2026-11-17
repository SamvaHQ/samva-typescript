import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import {
  defineAgent,
  defineTool,
  type AgentCallCapability,
  type AgentContext,
  type AgentModuleAuthority,
  type AgentModuleRequest,
} from "../../src/agent";
import { agentManifest } from "./fixtures/manifest";

const capability = (callId: string): AgentCallCapability => ({
  callId,
  organizationId: "org_0000000000000000",
  agentId: "agt_0000000000000000",
  versionId: "agtv_0000000000000000",
  bundleSha256: "a".repeat(64),
  expiresAt: Date.now() + 30_000,
  trigger: {
    kind: "conversation",
    conversationId: "cconv_0000000000000000",
    counterpart: { kind: "correspondent", correspondentId: "mbc_0000000000000000" },
    admissionId: callId,
    target: null,
  },
});

const authority = (id: string) => {
  const requests: AgentModuleRequest[] = [];
  const logs: ReadonlyArray<unknown>[] = [];
  const stub: AgentModuleAuthority = {
    async samva(request) {
      requests.push(request);
      return {
        status: 200,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items: [], nextCursor: null }),
      };
    },
    async connection(integrationId, tool, input) {
      return { id, integrationId, tool, input };
    },
    async searchMemory() {
      return [{ id, content: `Memory ${id}` }];
    },
    async remember() {
      throw new Error("Unexpected memory write");
    },
    async log(values) {
      logs.push(values);
    },
  };
  return { stub, requests, logs };
};

describe("hosted agent SDK RPC adapter", () => {
  it("addresses mailbox reads and replies using only the fresh host-provided target", async () => {
    const manifest = agentManifest("Target");
    const agent = defineAgent({
      manifest,
      instructions: "Answer the current conversation.",
      tools: {
        reply: defineTool({
          description: "Read and answer this conversation",
          input: Schema.Struct({}),
          replay: "unsafe",
          async execute(_input, ctx) {
            const trigger = ctx.capability.trigger;
            if (trigger.kind !== "conversation" || trigger.target === null)
              throw new Error("No mailbox target");
            const { mailboxId, threadId, messageId } = trigger.target;
            await ctx.samva.mailboxes.getThread({ id: mailboxId, threadId });
            await ctx.samva.mailboxes.reply(
              { id: mailboxId, messageId, text: "Thanks" },
              { headers: { "idempotency-key": ctx.capability.callId } },
            );
            return { threadId, messageId };
          },
        }),
      },
    });
    for (const suffix of ["1111111111111111", "2222222222222222"]) {
      const granted = authority(suffix);
      const base = capability(suffix);
      const current: AgentCallCapability = {
        ...base,
        trigger: {
          kind: "conversation",
          conversationId: `cconv_${suffix}`,
          counterpart: { kind: "contact", contactId: `contact_${suffix}` },
          admissionId: suffix,
          target: {
            mailboxId: `mbx_${suffix}`,
            threadId: `thread_${suffix}`,
            messageId: `msg_${suffix}`,
          },
        },
      };
      expect(
        await agent.__samvaAgentRuntime(
          { kind: "tool", name: "reply", input: {} },
          current,
          granted.stub,
        ),
      ).toEqual({ threadId: `thread_${suffix}`, messageId: `msg_${suffix}` });
      expect(granted.requests.map((request) => [request.method, request.path])).toEqual([
        ["GET", `/v1/mailboxes/mbx_${suffix}/threads/thread_${suffix}`],
        ["POST", `/v1/mailboxes/mbx_${suffix}/messages/msg_${suffix}/reply`],
      ]);
      for (const request of granted.requests) {
        expect(request.headers.authorization).toBeUndefined();
        expect(request.headers["x-api-key"]).toBeUndefined();
      }
    }
  });

  it("executes with fresh scoped SDK, connection and memory authority", async () => {
    const manifest = agentManifest("Runtime");
    const agent = defineAgent({
      manifest,
      instructions: async (ctx) =>
        `${ctx.capability.callId}: ${(await ctx.memory.search("context"))[0]?.content}`,
      knowledge: "Runtime knowledge",
      skills: { help: "# Help" },
      tools: {
        inspect: defineTool({
          description: "Inspect authority",
          input: Schema.Struct({ count: Schema.Int }),
          replay: "safe",
          async execute(input, ctx) {
            ctx.log("inspect", ctx.capability.callId);
            const mailboxes = await ctx.samva.mailboxes.list({});
            const connection = await ctx.connections.call("integration", "lookup", {
              count: input.count,
            });
            return { call: ctx.capability.callId, mailboxes, connection };
          },
        }),
      },
    });
    const one = authority("one");
    const two = authority("two");
    expect(
      await agent.__samvaAgentRuntime({ kind: "instructions" }, capability("first"), one.stub),
    ).toBe("first: Memory one");
    expect(
      await agent.__samvaAgentRuntime({ kind: "instructions" }, capability("second"), two.stub),
    ).toBe("second: Memory two");
    expect(
      await agent.__samvaAgentRuntime({ kind: "knowledge" }, capability("knowledge"), one.stub),
    ).toBe("Runtime knowledge");
    expect(
      await agent.__samvaAgentRuntime({ kind: "list-skills" }, capability("skills"), one.stub),
    ).toEqual(["help"]);
    expect(
      await agent.__samvaAgentRuntime(
        { kind: "load-skill", name: "help" },
        capability("skill"),
        one.stub,
      ),
    ).toBe("# Help");
    expect(
      await agent.__samvaAgentRuntime(
        { kind: "tool", name: "inspect", input: { count: 2 } },
        capability("tool"),
        two.stub,
      ),
    ).toMatchObject({
      call: "tool",
      connection: { id: "two", integrationId: "integration", tool: "lookup", input: { count: 2 } },
      mailboxes: { items: [] },
    });
    expect(one.requests).toEqual([]);
    expect(two.requests).toHaveLength(1);
    expect(two.requests[0]).toMatchObject({ method: "GET", path: "/v1/mailboxes" });
    expect(two.requests[0]?.headers["authorization"]).toBeUndefined();
    expect(two.requests[0]?.headers["x-api-key"]).toBeUndefined();
    expect(two.logs).toEqual([["inspect", "tool"]]);
    await expect(
      agent.__samvaAgentRuntime(
        { kind: "tool", name: "inspect", input: { count: "wrong" } },
        capability("bad"),
        two.stub,
      ),
    ).rejects.toThrow();
    expect(two.requests).toHaveLength(1);
  });
  it("runs mailbox and contact handlers with fresh event authority and stable retry keys", async () => {
    const events: string[] = [];
    const handler = async (event: { id: string }, ctx: AgentContext) => {
      events.push(event.id);
      ctx.log(ctx.capability.callId);
      await ctx.samva.mailboxes.reply({
        id: "mbx_0000000000000000",
        messageId: "msg_0000000000000000",
        text: "Thanks",
      });
      await ctx.samva.mailboxes.reply({
        id: "mbx_0000000000000000",
        messageId: "msg_0000000000000000",
        text: "Follow up",
      });
    };
    const agent = defineAgent({
      manifest: agentManifest("Events"),
      instructions: "Handle events",
      events: { "mailbox.message.received": handler, "appointment.confirmed": handler },
    });
    for (const type of ["mailbox.message.received", "appointment.confirmed"]) {
      const first = authority("first");
      const second = authority("second");
      const event = { id: `event-${type}`, type, timestamp: "2026-01-01T00:00:00.000Z", data: {} };
      for (const [index, granted] of [first, second].entries()) {
        const attempt = index + 1;
        const cap: AgentCallCapability = {
          ...capability(`attempt-${attempt}`),
          trigger: { kind: "event", eventId: event.id, eventType: type, attempt },
        };
        await expect(
          agent.__samvaAgentRuntime({ kind: "event", event, attempt }, cap, granted.stub),
        ).resolves.toBeNull();
      }
      expect(first.requests).toHaveLength(2);
      expect(second.requests).toHaveLength(2);
      const keys = first.requests.map((request) => request.headers["idempotency-key"]);
      expect(keys.every((key) => key?.includes(event.id))).toBe(true);
      expect(new Set(keys).size).toBe(2);
      expect(second.requests.map((request) => request.headers["idempotency-key"])).toEqual(keys);
      expect(first.logs).toEqual([["attempt-1"]]);
      expect(second.logs).toEqual([["attempt-2"]]);
      expect(first.requests[0]?.headers["authorization"]).toBeUndefined();
    }
    expect(events).toHaveLength(4);
  });

  it("refuses an event whose identity or attempt differs from its capability", async () => {
    let calls = 0;
    const agent = defineAgent({
      manifest: agentManifest("Events"),
      instructions: "Handle events",
      events: {
        "appointment.confirmed"() {
          calls += 1;
        },
      },
    });
    const event = {
      id: "event",
      type: "appointment.confirmed",
      timestamp: "2026-01-01T00:00:00.000Z",
      data: {},
    };
    const cap: AgentCallCapability = {
      ...capability("event"),
      trigger: { kind: "event", eventId: event.id, eventType: event.type, attempt: 1 },
    };
    const granted = authority("event");
    for (const operation of [
      { kind: "event" as const, event: { ...event, id: "other" }, attempt: 1 },
      { kind: "event" as const, event: { ...event, type: "other" }, attempt: 1 },
      { kind: "event" as const, event, attempt: 2 },
    ]) {
      await expect(agent.__samvaAgentRuntime(operation, cap, granted.stub)).rejects.toThrow(
        "does not match",
      );
    }
    expect(calls).toBe(0);
  });
});
