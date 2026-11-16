import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "@effect/vitest";

import { registryOverrides } from "../../codegen/facade-overrides";
import { expectArray } from "../../codegen/promise-schema";
import { generateRegistry, registryHeader } from "../../codegen/registry";
import { removeOrphanedFacades } from "../../codegen/registry-files";
import { assertRegistrySurface } from "../../codegen/registry-surface";
import document from "../../openapi.json";
import packageJson from "../../package.json";
import { createClient } from "../../src/promises/client";
import buildConfig from "../../tsdown.config";

const registry = generateRegistry(document);
const client = createClient({ apiKey: "samva_sk_fixture" });
const surface = {
  registry,
  packageExports: packageJson.exports,
  buildEntries: buildConfig.entry,
  effectIndex: readFileSync(new URL("../../src/effect/index.ts", import.meta.url), "utf8"),
  moduleFiles: [...Object.keys(registry.modules).map((name) => `${name}.ts`), "client.ts"],
  promiseClient: client,
  rawClient: client.raw,
};

describe("operation registry generation guards", () => {
  it.each(["facadePreambles", "facadeExpressions", "callKindOverrides"] as const)(
    "rejects an unused %s key",
    (table) => {
      expect(() =>
        generateRegistry(document, {
          ...registryOverrides,
          [table]: { ...registryOverrides[table], staleOperation: "unused" },
        }),
      ).toThrow(`Unused ${table} override: staleOperation`);
    },
  );

  it("rejects aliases for a removed service or operation", () => {
    expect(() =>
      generateRegistry(document, {
        ...registryOverrides,
        facadeAliases: {
          ...registryOverrides.facadeAliases,
          removedService: { send: "messagesSend" },
        },
      }),
    ).toThrow("Unused facadeAliases service: removedService");
    expect(() =>
      generateRegistry(document, {
        ...registryOverrides,
        facadeAliases: { email: { send: "removedOperation" } },
      }),
    ).toThrow("Unknown facade alias target: email.send -> removedOperation");
  });

  it("rejects an alias that collides with a real operation", () => {
    expect(() =>
      generateRegistry(document, {
        ...registryOverrides,
        facadeAliases: { ...registryOverrides.facadeAliases, contacts: { list: "contactsList" } },
      }),
    ).toThrow("Facade alias collision: contacts.list");
  });

  it("rejects name collisions when folding contactEvents into contacts", () => {
    expect(() =>
      generateRegistry({
        ...document,
        paths: {
          ...document.paths,
          "/seed": { get: { operationId: "contacts.listEvents", tags: ["Contacts"] } },
        },
      }),
    ).toThrow("Facade operation collision: contacts.listEvents");
  });

  it("pins public module names independently of schema tags", () => {
    expect(registry.modules.whatsapp?.service).toBe("whatsapp");
    expect(registry.modules["whatsapp-flows"]?.service).toBe("whatsappFlows");
    expect(registry.modules["whatsapp-setup-links"]?.service).toBe("whatsappSetupLinks");
    expect(registry.moduleSources.whatsapp).toContain("./generated/whats-app");
  });

  it("deletes a formatted orphan when imports precede its generated marker", async () => {
    const root = await mkdtemp(join(tmpdir(), "samva-registry-cleanup-"));
    const removed = join(root, "contacts.ts");
    const produced = join(root, "agents.ts");
    const handwritten = join(root, "handwritten.ts");
    try {
      await Promise.all([
        // Import sorting moves a smaller specifier above the marker, which is the shape the
        // cleanup has to recognize.
        writeFile(removed, `import { a } from "./a";\n${registry.moduleSources.contacts!}`),
        writeFile(produced, registry.moduleSources.agents!),
        writeFile(handwritten, "export const handwritten = true;\n"),
      ]);
      execFileSync(
        "bun",
        [
          "run",
          "oxfmt",
          "--config",
          fileURLToPath(new URL("../../../../oxfmt.config.ts", import.meta.url)),
          removed,
        ],
        {
          cwd: fileURLToPath(new URL("../../../../", import.meta.url)),
          stdio: "pipe",
        },
      );
      const formatted = await readFile(removed, "utf8");
      expect(formatted.startsWith(registryHeader)).toBe(false);
      expect(formatted).toContain(registryHeader.trimEnd());
      await removeOrphanedFacades(root, new Set(["agents.ts"]));
      await expect(readFile(removed, "utf8")).rejects.toMatchObject({ code: "ENOENT" });
      expect(await readFile(produced, "utf8")).toContain(registryHeader.trimEnd());
      expect(await readFile(handwritten, "utf8")).toBe("export const handwritten = true;\n");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("accepts the current package surfaces", () => {
    expect(() => assertRegistrySurface(surface)).not.toThrow();
  });

  it.each([
    "packageExports",
    "buildEntries",
    "effectIndex",
    "moduleFiles",
    "promiseClient",
    "rawClient",
  ] as const)("rejects a removed group left in %s", (field) => {
    const { whatsapp: _, ...modules } = registry.modules;
    expect(() => assertRegistrySurface({ ...surface, registry: { ...registry, modules } })).toThrow(
      "differs from generated groups",
    );
    const mutations = {
      packageExports: {
        ...packageJson.exports,
        "./effect/orphan": { import: "./dist/effect/orphan.js" },
      },
      buildEntries: [...expectArray(buildConfig.entry, "tsdown entries"), "src/effect/orphan.ts"],
      effectIndex: `${surface.effectIndex}\nexport * as Orphan from "./orphan";`,
      moduleFiles: [...surface.moduleFiles, "orphan.ts"],
      promiseClient: { ...client, orphan: { list: () => {} } },
      rawClient: { ...client.raw, orphan: { list: () => {} } },
    };
    expect(() => assertRegistrySurface({ ...surface, [field]: mutations[field] })).toThrow(
      "differs from generated groups",
    );
  });
});
