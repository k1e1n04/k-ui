import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FloatingActionButton } from "./FloatingActionButton";

describe("FloatingActionButton", () => {
  it("ラベルをアクセシブルな名前として持つ", () => {
    render(<FloatingActionButton label="AIと計画する" />);
    expect(
      screen.getByRole("button", { name: "AIと計画する" }),
    ).toBeInTheDocument();
  });

  it("拡張表示ではテキストも表示する", async () => {
    const onClick = vi.fn();
    render(
      <FloatingActionButton label="AIと計画する" extended onClick={onClick}>
        AIと計画する
      </FloatingActionButton>,
    );
    await userEvent.click(screen.getByRole("button", { name: "AIと計画する" }));
    expect(onClick).toHaveBeenCalled();
  });
});
