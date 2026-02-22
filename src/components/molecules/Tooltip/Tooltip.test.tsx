import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Tooltip } from "./Tooltip";

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
});
