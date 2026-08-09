import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Tooltip } from "./Tooltip";

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("Tooltip", () => {
  it("トリガークリックで開閉する", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip body">
        <span>i</span>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Info" });
    await user.click(trigger);
    expect(screen.getByText("Tooltip body")).toBeInTheDocument();

    await user.click(trigger);
    expect(screen.queryByText("Tooltip body")).toBeNull();
  });

  it("外側クリックで閉じる", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Tooltip content="Tooltip body">
          <span>i</span>
        </Tooltip>
        <button type="button">outside</button>
      </div>,
    );

    await user.click(screen.getByRole("button", { name: "Info" }));
    expect(screen.getByText("Tooltip body")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "outside" }));
    expect(screen.queryByText("Tooltip body")).toBeNull();
  });

  it("ツールチップを専用の z-index トークンで表示する", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip body">
        <span>i</span>
      </Tooltip>,
    );

    await user.click(screen.getByRole("button", { name: "Info" }));

    expect(screen.getByText("Tooltip body").parentElement).toHaveClass(
      "z-[var(--kui-z-tooltip)]",
    );
  });

  it("開いているツールチップをリサイズ後も表示し続ける", () => {
    render(
      <Tooltip content="Tooltip body">
        <span>i</span>
      </Tooltip>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Info" }));
    fireEvent.resize(window);

    expect(screen.getByText("Tooltip body")).toBeInTheDocument();
  });

  it("閉じると保留中の配置アニメーションフレームを取り消す", () => {
    vi.useFakeTimers();
    const requestAnimationFrameSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation(() => 42);
    const cancelAnimationFrameSpy = vi.spyOn(window, "cancelAnimationFrame");
    render(
      <Tooltip content="Tooltip body">
        <span>i</span>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Info" });
    fireEvent.click(trigger);
    expect(requestAnimationFrameSpy).toHaveBeenCalledOnce();

    fireEvent.click(trigger);
    expect(cancelAnimationFrameSpy).toHaveBeenCalledWith(42);
  });

  it("リサイズ後に外側クリックで閉じたツールチップを再表示しない", () => {
    vi.useFakeTimers();
    render(
      <div>
        <Tooltip content="Tooltip body">
          <span>i</span>
        </Tooltip>
        <button type="button">outside</button>
      </div>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Info" }));
    fireEvent.resize(window);
    fireEvent.mouseDown(screen.getByRole("button", { name: "outside" }));

    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(screen.queryByText("Tooltip body")).toBeNull();
  });

  it("リサイズ後にアンマウントしたツールチップで遅延再表示を予約しない", () => {
    vi.useFakeTimers();
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 42);
    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
    const { unmount } = render(
      <Tooltip content="Tooltip body">
        <span>i</span>
      </Tooltip>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Info" }));
    fireEvent.resize(window);
    unmount();

    expect(setTimeoutSpy).not.toHaveBeenCalled();
  });
});
