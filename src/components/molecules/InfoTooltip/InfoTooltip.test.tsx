import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { InfoTooltip } from "./InfoTooltip";

describe("InfoTooltip", () => {
  it("デフォルトでレンダリングされる", () => {
    render(<InfoTooltip content="Help text" />);
    expect(screen.getByRole("button", { name: "Info" })).toBeInTheDocument();
  });

  it("クリックでツールチップが表示される", async () => {
    const user = userEvent.setup();
    render(<InfoTooltip content="Help text" />);

    await user.click(screen.getByRole("button", { name: "Info" }));
    expect(screen.getByText("Help text")).toBeInTheDocument();
  });

  it("再クリックでツールチップが閉じる", async () => {
    const user = userEvent.setup();
    render(<InfoTooltip content="Help text" />);

    const trigger = screen.getByRole("button", { name: "Info" });
    await user.click(trigger);
    expect(screen.getByText("Help text")).toBeInTheDocument();

    await user.click(trigger);
    expect(screen.queryByText("Help text")).not.toBeInTheDocument();
  });

  it("カスタム label が aria-label に反映される", () => {
    render(<InfoTooltip content="Help" label="Explanation" />);
    expect(
      screen.getByRole("button", { name: "Explanation" }),
    ).toBeInTheDocument();
  });

  it("className が渡される", () => {
    const { container } = render(
      <InfoTooltip content="Help" className="ml-2" />,
    );
    expect(container.firstChild).toHaveClass("ml-2");
  });

  it.each(["sm", "md"] as const)("size=%s でレンダリングされる", (size) => {
    render(<InfoTooltip content="Help" size={size} />);
    expect(screen.getByRole("button", { name: "Info" })).toBeInTheDocument();
  });

  it("リッチコンテンツを表示できる", async () => {
    const user = userEvent.setup();
    render(
      <InfoTooltip
        content={
          <div>
            <p>Title</p>
            <p>Description</p>
          </div>
        }
      />,
    );

    await user.click(screen.getByRole("button", { name: "Info" }));
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });
});
