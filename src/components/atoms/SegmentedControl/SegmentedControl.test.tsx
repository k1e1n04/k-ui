import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SegmentedControl } from "./SegmentedControl";

const options = [
  { label: "Day", value: "day" },
  { label: "Month", value: "month", disabled: true },
];
describe("SegmentedControl", () => {
  it("選択状態を表示し変更を通知する", async () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={options} value="" onChange={onChange} />);
    await userEvent.click(screen.getByRole("radio", { name: "Day" }));
    expect(onChange).toHaveBeenCalledWith("day");
  });
  it("無効選択肢を操作できない", () => {
    render(<SegmentedControl options={options} value="" onChange={vi.fn()} />);
    expect(screen.getByRole("radio", { name: "Month" })).toBeDisabled();
  });
  it("グループ名を提供し、矢印キーで次の選択肢へ移動する", async () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl
        aria-label="Period"
        options={options}
        value="day"
        onChange={onChange}
      />,
    );
    const group = screen.getByRole("radiogroup", { name: "Period" });
    await userEvent.click(screen.getByRole("radio", { name: "Day" }));
    await userEvent.keyboard("{ArrowRight}");
    expect(group).toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalledWith("month");
  });
  it("ラベル未指定でもアクセシブルなグループ名を提供する", () => {
    render(
      <SegmentedControl options={options} value="day" onChange={vi.fn()} />,
    );
    expect(screen.getByRole("radiogroup")).toHaveAccessibleName(
      "Segmented control",
    );
  });
  it("選択値が無効なとき最初の有効選択肢をタブ停止位置にする", () => {
    render(
      <SegmentedControl options={options} value="month" onChange={vi.fn()} />,
    );
    expect(screen.getByRole("radio", { name: "Day" })).toHaveAttribute(
      "tabindex",
      "0",
    );
  });
  it.each([true, false])("fullWidth=%s とclassNameを反映する", (fullWidth) => {
    render(
      <SegmentedControl
        options={options}
        value="day"
        onChange={vi.fn()}
        fullWidth={fullWidth}
        className="custom"
      />,
    );
    expect(screen.getByRole("radiogroup")).toHaveClass("custom");
  });
});
