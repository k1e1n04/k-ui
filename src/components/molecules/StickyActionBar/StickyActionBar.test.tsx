import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StickyActionBar } from "./StickyActionBar";

describe("StickyActionBar", () => {
  it("sticky で下部に固定する", () => {
    render(
      <StickyActionBar>
        <button type="button">この条件で作る</button>
      </StickyActionBar>,
    );
    const bar = screen.getByText("この条件で作る").parentElement;
    expect(bar).toHaveClass("sticky");
    expect(bar?.className).toContain("--kui-safe-area-bottom");
  });

  it("fixed を選べる", () => {
    render(
      <StickyActionBar position="fixed">
        <span>保存</span>
      </StickyActionBar>,
    );
    const bar = screen.getByText("保存").parentElement;
    expect(bar).toHaveClass("fixed");
  });
});
