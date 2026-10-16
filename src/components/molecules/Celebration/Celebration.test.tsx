import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Celebration } from "./Celebration";

afterEach(() => {
  vi.useRealTimers();
});

describe("Celebration", () => {
  it("show=false のときは何も表示しない", () => {
    const { container } = render(<Celebration show={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("表示してから指定時間後に onDone を呼ぶ", () => {
    vi.useFakeTimers();
    const onDone = vi.fn();
    render(<Celebration show onDone={onDone} />);
    expect(screen.getByRole("status")).toHaveTextContent("決定しました");
    act(() => {
      vi.advanceTimersByTime(800);
    });
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("動きを減らす設定では紙吹雪を出さない", () => {
    const original = window.matchMedia;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: true,
        addEventListener: () => {},
        removeEventListener: () => {},
      })),
    });
    const { container } = render(<Celebration show />);
    expect(
      container.querySelector('div[aria-hidden="true"]'),
    ).not.toBeInTheDocument();
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: original,
    });
  });
});
