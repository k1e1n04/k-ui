import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const read = (file: string) =>
  readFile(join(process.cwd(), "src/tokens", file), "utf8");

describe("tokens/base.css", () => {
  it("モバイルでは入力コントロールを16px以上にしてiOSの自動ズームを防ぐ", async () => {
    const css = await read("base.css");
    expect(css).toMatch(/@media\s*\(max-width:\s*767px\)/);
    expect(css).toMatch(/input/);
    expect(css).toMatch(/select/);
    expect(css).toMatch(/textarea/);
    expect(css).toMatch(/font-size:\s*16px/);
  });

  it("tokens/index.css から base.css を読み込む", async () => {
    const css = await read("index.css");
    expect(css).toContain('@import "./base.css"');
  });
});
