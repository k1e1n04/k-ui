"use client";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef } from "react";
import { describe, expect, it } from "vitest";

import { useFocusTrap } from "./useFocusTrap";

interface FocusTrapFixtureProps {
  active: boolean;
}

const FocusTrapFixture = ({ active }: FocusTrapFixtureProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  useFocusTrap(containerRef, active, { initialFocusRef });

  return (
    <div ref={containerRef}>
      <button ref={initialFocusRef} type="button">
        最初
      </button>
      <button type="button">最後</button>
    </div>
  );
};

const NoFocusableFixture = ({ active }: FocusTrapFixtureProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useFocusTrap(containerRef, active);

  return (
    <div ref={containerRef} data-testid="フォーカスなし">
      説明
    </div>
  );
};

describe("useFocusTrap", () => {
  it("有効化時に指定した初期要素へフォーカスする", () => {
    render(<FocusTrapFixture active />);

    expect(screen.getByRole("button", { name: "最初" })).toHaveFocus();
  });

  it("Tab と Shift+Tab をコンテナ内で循環させる", async () => {
    const user = userEvent.setup();
    render(<FocusTrapFixture active />);

    await user.tab();
    expect(screen.getByRole("button", { name: "最後" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: "最初" })).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "最後" })).toHaveFocus();
  });

  it("無効化時に有効化前の要素へフォーカスを戻す", () => {
    const { rerender } = render(
      <>
        <button type="button">起点</button>
        <FocusTrapFixture active={false} />
      </>,
    );
    const trigger = screen.getByRole("button", { name: "起点" });
    trigger.focus();

    rerender(
      <>
        <button type="button">起点</button>
        <FocusTrapFixture active />
      </>,
    );
    expect(screen.getByRole("button", { name: "最初" })).toHaveFocus();

    rerender(
      <>
        <button type="button">起点</button>
        <FocusTrapFixture active={false} />
      </>,
    );
    expect(screen.getByRole("button", { name: "起点" })).toHaveFocus();
  });

  it("フォーカス可能な子要素がない場合はコンテナにフォーカスを保つ", async () => {
    const user = userEvent.setup();
    render(<NoFocusableFixture active />);

    const container = screen.getByTestId("フォーカスなし");
    expect(container).toHaveAttribute("tabindex", "-1");
    expect(container).toHaveFocus();

    await user.tab();
    expect(container).toHaveFocus();

    await user.tab({ shift: true });
    expect(container).toHaveFocus();
  });
});
