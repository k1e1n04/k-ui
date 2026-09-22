import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FavoriteButton } from "./FavoriteButton";

describe("FavoriteButton", () => {
  it("お気に入り状態を aria-pressed で示す", () => {
    render(<FavoriteButton favorite onChange={vi.fn()} label="物件A" />);
    expect(screen.getByRole("button", { name: "物件A" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("クリックで状態を反転して通知する", async () => {
    const onChange = vi.fn();
    render(
      <FavoriteButton favorite={false} onChange={onChange} label="物件A" />,
    );
    await userEvent.click(screen.getByRole("button", { name: "物件A" }));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("無効時は通知しない", async () => {
    const onChange = vi.fn();
    render(<FavoriteButton favorite={false} onChange={onChange} disabled />);
    await userEvent.click(screen.getByRole("button"));
    expect(onChange).not.toHaveBeenCalled();
  });
});
