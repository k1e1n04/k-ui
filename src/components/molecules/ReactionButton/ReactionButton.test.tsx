import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ReactionButton } from "./ReactionButton";

describe("ReactionButton", () => {
  it("件数とアバターを表示する", () => {
    render(
      <ReactionButton
        label="楽しみ!"
        count={2}
        active
        avatars={[{ name: "A" }, { name: "B" }]}
      />,
    );
    const button = screen.getByRole("button", { name: /楽しみ/ });
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveTextContent("2");
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("押下状態の反転を通知する", async () => {
    const onToggled = vi.fn();
    render(<ReactionButton label="相談したい" onToggled={onToggled} />);
    await userEvent.click(screen.getByRole("button", { name: /相談したい/ }));
    expect(onToggled).toHaveBeenCalledWith(true);
  });
});
