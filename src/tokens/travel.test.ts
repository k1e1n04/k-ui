import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const tokenRoot = join(process.cwd(), "src/tokens");
const read = (file: string) => readFile(join(tokenRoot, file), "utf8");

const categories = [
  "move",
  "meal",
  "sight",
  "activity",
  "shopping",
  "stay",
  "free",
] as const;

describe("旅行用トークン", () => {
  it("カテゴリ色をライト・subtle の両方で定義する", async () => {
    const source = await read("travel.css");
    for (const category of categories) {
      expect(source).toContain(`--kui-color-cat-${category}:`);
      expect(source).toContain(`--kui-color-cat-${category}-subtle:`);
    }
  });

  it("カテゴリ色をダークテーマでも上書きする", async () => {
    const source = await read("travel.css");
    const dark = source.slice(
      source.indexOf("@media (prefers-color-scheme: dark)"),
    );
    for (const category of categories) {
      expect(dark).toContain(`--kui-color-cat-${category}:`);
    }
  });

  it("差分・二人の識別色・スクリム・セーフエリアを定義する", async () => {
    const source = await read("travel.css");
    expect(source).toContain("--kui-color-diff-add:");
    expect(source).toContain("--kui-color-diff-change:");
    expect(source).toContain("--kui-color-diff-remove:");
    expect(source).toContain("--kui-color-me:");
    expect(source).toContain("--kui-color-partner:");
    expect(source).toContain("--kui-scrim-image:");
    expect(source).toContain(
      "--kui-safe-area-bottom: env(safe-area-inset-bottom",
    );
  });

  it("大きい文字サイズを定義する", async () => {
    const source = await read("typography.css");
    expect(source).toContain("--kui-font-size-3xl:");
    expect(source).toContain("--kui-font-size-4xl:");
    expect(source).toContain("--kui-font-size-5xl:");
  });

  it("Tailwind のテーマ変数へマッピングする", async () => {
    const source = await read("theme.css");
    expect(source).toContain(
      "--color-cat-move-subtle: var(--kui-color-cat-move-subtle)",
    );
    expect(source).toContain(
      "--color-diff-remove-subtle: var(--kui-color-diff-remove-subtle)",
    );
    expect(source).toContain("--color-me: var(--kui-color-me)");
    expect(source).toContain("--color-partner: var(--kui-color-partner)");
    expect(source).toContain("--text-5xl: var(--kui-font-size-5xl)");
  });

  it("トークンのエントリポイントから読み込まれる", async () => {
    const source = await read("index.css");
    expect(source).toContain('@import "./travel.css";');
  });
});
