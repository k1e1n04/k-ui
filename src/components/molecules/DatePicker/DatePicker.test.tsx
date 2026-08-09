import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("カレンダーで選択しクリアできる", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePicker value="2026-08-09" onChange={onChange} clearable />);
    await user.click(screen.getByRole("button", { name: "カレンダーを開く" }));
    await user.click(screen.getByRole("button", { name: "2026-08-10" }));
    expect(onChange).toHaveBeenCalledWith("2026-08-10");
    await user.click(screen.getByRole("button", { name: "クリア" }));
    expect(onChange).toHaveBeenCalledWith("");
  });
});
