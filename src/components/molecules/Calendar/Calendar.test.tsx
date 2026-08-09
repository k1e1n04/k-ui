import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Calendar } from "./Calendar";

describe("Calendar", () => {
  it("月を表示して前後の月へ移動できる", async () => {
    const user = userEvent.setup();
    render(<Calendar value="2026-08-09" onChange={vi.fn()} />);
    expect(screen.getByText("2026年8月")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "次の月" }));
    expect(screen.getByText("2026年9月")).toBeInTheDocument();
  });
  it("無効日を選択せず、範囲内の日付を選択する", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Calendar value="2026-08-09" onChange={onChange} minDate="2026-08-10" />,
    );
    await user.click(screen.getByRole("button", { name: "2026-08-09" }));
    expect(onChange).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "2026-08-10" }));
    expect(onChange).toHaveBeenCalledWith("2026-08-10");
  });
});
