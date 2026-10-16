import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const tokenRoot = join(process.cwd(), "src/tokens");
const read = (file: string) => readFile(join(tokenRoot, file), "utf8");

describe("演出トークン", () => {
  it("400ms 以内の再生時間とイージングを定義する", async () => {
    const source = await read("motion.css");
    expect(source).toContain("--kui-duration-fast:");
    expect(source).toContain("--kui-duration-base:");
    expect(source).toContain("--kui-duration-slow:");
    expect(source).toMatch(/--kui-duration-slow:\s*400ms;/);
    expect(source).toContain("--kui-ease-standard:");
    expect(source).toContain("--kui-ease-decelerate:");
    expect(source).toContain("--kui-ease-accelerate:");
  });

  it("動きを減らす設定ではフェードだけにする", async () => {
    const source = await read("motion.css");
    expect(source).toContain("@media (prefers-reduced-motion: reduce)");
    expect(source).toContain(
      "--animate-kui-slide-up: kui-fade-in var(--kui-duration-base) linear;",
    );
    expect(source).toContain("transition-property:");
  });

  it("イージングを Tailwind のテーマ変数へマッピングする", async () => {
    const source = await read("theme.css");
    expect(source).toContain("--ease-standard: var(--kui-ease-standard)");
    expect(source).toContain("--ease-decelerate: var(--kui-ease-decelerate)");
    expect(source).toContain("--ease-accelerate: var(--kui-ease-accelerate)");
  });

  it("トークンのエントリポイントから読み込まれる", async () => {
    const source = await read("index.css");
    expect(source).toContain('@import "./motion.css";');
  });
});
