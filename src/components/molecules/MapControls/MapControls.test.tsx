import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MapControls } from "./MapControls";

describe("MapControls", () => {
  it("ズーム操作を通知する", () => {
    const onZoomIn = vi.fn();
    const onZoomOut = vi.fn();
    render(<MapControls onZoomIn={onZoomIn} onZoomOut={onZoomOut} />);
    fireEvent.click(screen.getByRole("button", { name: "拡大" }));
    fireEvent.click(screen.getByRole("button", { name: "縮小" }));
    expect(onZoomIn).toHaveBeenCalledTimes(1);
    expect(onZoomOut).toHaveBeenCalledTimes(1);
  });

  it("リセットと現在地ボタンを表示する", () => {
    const onReset = vi.fn();
    const onLocate = vi.fn();
    render(<MapControls showReset onReset={onReset} onLocate={onLocate} />);
    fireEvent.click(screen.getByRole("button", { name: "表示をリセット" }));
    fireEvent.click(screen.getByRole("button", { name: "現在地へ移動" }));
    expect(onReset).toHaveBeenCalledTimes(1);
    expect(onLocate).toHaveBeenCalledTimes(1);
  });

  it("onLocate 未指定なら現在地ボタンを表示しない", () => {
    render(<MapControls onZoomIn={vi.fn()} onZoomOut={vi.fn()} />);
    expect(
      screen.queryByRole("button", { name: "現在地へ移動" }),
    ).not.toBeInTheDocument();
  });
});
