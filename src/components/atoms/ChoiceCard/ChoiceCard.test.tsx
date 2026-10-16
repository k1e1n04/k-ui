import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ChoiceCard } from "./ChoiceCard";

describe("ChoiceCard", () => {
  it("選択状態を aria-pressed で示す", () => {
    render(<ChoiceCard value="relaxed" title="のんびり" selected />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("タップすると値を通知する", async () => {
    const onSelect = vi.fn();
    render(
      <ChoiceCard
        value="active"
        title="たくさん歩く"
        description="1日3万歩"
        onSelect={onSelect}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: /たくさん歩く/ }));
    expect(onSelect).toHaveBeenCalledWith("active");
  });
});
