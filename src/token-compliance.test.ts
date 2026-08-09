import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const componentRoot = join(process.cwd(), "src/components");
const rawColorPattern =
  /\b(?:bg|border|text|divide|ring|fill|stroke)-(?:gray|blue|red|green|yellow|orange|purple|pink|indigo|rose|white|black)-/;

async function findComponentSources(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return findComponentSources(path);
      return entry.name.endsWith(".tsx") &&
        !entry.name.includes(".test.") &&
        !entry.name.includes(".stories.")
        ? [path]
        : [];
    }),
  );

  return files.flat();
}

describe("コンポーネントのデザイントークン準拠", () => {
  it("生のTailwindカラーとdark:プレフィックスを使わない", async () => {
    const sourceFiles = await findComponentSources(componentRoot);
    const sources = await Promise.all(
      sourceFiles.map(async (file) => ({
        file,
        source: await readFile(file, "utf8"),
      })),
    );

    for (const { file, source } of sources) {
      expect(source, file).not.toMatch(rawColorPattern);
      expect(source, file).not.toMatch(/\bdark:/);
    }
  });
});
