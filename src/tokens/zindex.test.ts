import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const tokenRoot = join(process.cwd(), "src/tokens");

describe("zindex トークン", () => {
  it("オーバーレイコンポーネント用の積層順を定義する", async () => {
    const source = await readFile(join(tokenRoot, "zindex.css"), "utf8");

    expect(source).toContain("--kui-z-dropdown: 30;");
    expect(source).toContain("--kui-z-drawer: 40;");
    expect(source).toContain("--kui-z-overlay: 45;");
    expect(source).toContain("--kui-z-modal: 50;");
    expect(source).toContain("--kui-z-popover: 60;");
    expect(source).toContain("--kui-z-toast: 70;");
    expect(source).toContain("--kui-z-tooltip: 80;");
  });

  it("トークンのエントリポイントから読み込まれる", async () => {
    const source = await readFile(join(tokenRoot, "index.css"), "utf8");

    expect(source).toContain('@import "./zindex.css";');
  });
});
