import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MonthSelector } from "./MonthSelector";

describe("MonthSelector", () => {
  it("selectedMonth が select に反映される", () => {
    render(
      <MonthSelector
        selectedMonth="2025-03"
        onMonthChange={vi.fn()}
        minYear={2024}
        maxYear={2025}
      />,
    );

    expect(screen.getByRole("combobox")).toHaveValue("2025-03");
  });

  it("select 変更時に onMonthChange が呼ばれる", async () => {
    const user = userEvent.setup();
    const onMonthChange = vi.fn();
    render(
      <MonthSelector
        selectedMonth="2025-03"
        onMonthChange={onMonthChange}
        minYear={2024}
        maxYear={2025}
      />,
    );

    await user.selectOptions(screen.getByRole("combobox"), "2025-02");
    expect(onMonthChange).toHaveBeenCalledWith("2025-02");
  });

  it("前月/次月ボタンで月変更コールバックが呼ばれる", async () => {
    const user = userEvent.setup();
    const onMonthChange = vi.fn();
    render(
      <MonthSelector
        selectedMonth="2025-03"
        onMonthChange={onMonthChange}
        minYear={2024}
        maxYear={2026}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Previous month" }));
    await user.click(screen.getByRole("button", { name: "Next month" }));

    expect(onMonthChange).toHaveBeenNthCalledWith(1, "2025-02");
    expect(onMonthChange).toHaveBeenNthCalledWith(2, "2025-04");
  });

  it("minYear 未満には遷移しない", async () => {
    const user = userEvent.setup();
    const onMonthChange = vi.fn();
    render(
      <MonthSelector
        selectedMonth="2024-01"
        onMonthChange={onMonthChange}
        minYear={2024}
        maxYear={2026}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Previous month" }));
    expect(onMonthChange).not.toHaveBeenCalled();
  });
});
