import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ToastProvider, useToast } from "./ToastProvider";

const Trigger = () => {
  const toast = useToast();
  return (
    <button type="button" onClick={() => toast.success("Saved")}>
      Show
    </button>
  );
};
describe("ToastProvider", () => {
  it("フックでトーストを表示する", async () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Show" }));
    expect(screen.getByText("Saved")).toBeInTheDocument();
  });
  it("provider外でフックを使うと例外になる", () => {
    const Bad = () => {
      useToast();
      return null;
    };
    expect(() => render(<Bad />)).toThrow("ToastProvider");
  });
  it("最大件数を維持する", async () => {
    const Many = () => {
      const t = useToast();
      return (
        <button
          type="button"
          onClick={() => {
            t.info("One");
            t.info("Two");
          }}
        >
          Show
        </button>
      );
    };
    render(
      <ToastProvider maxToasts={1}>
        <Many />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Show" }));
    expect(screen.queryByText("One")).not.toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });
  it("maxToasts=0 のとき通知を描画しない", async () => {
    render(
      <ToastProvider maxToasts={0}>
        <Trigger />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Show" }));
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
  });
  it("自動で閉じる", () => {
    vi.useFakeTimers();
    render(
      <ToastProvider defaultDuration={10}>
        <Trigger />
      </ToastProvider>,
    );
    act(() => screen.getByRole("button", { name: "Show" }).click());
    act(() => vi.advanceTimersByTime(10));
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});
