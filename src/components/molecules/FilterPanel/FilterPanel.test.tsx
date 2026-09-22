import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { type FilterField, FilterPanel } from "./FilterPanel";

const fields: FilterField[] = [
  {
    type: "range",
    key: "rent",
    label: "賃料",
    min: 0,
    max: 300000,
    step: 5000,
    value: [0, 150000],
    formatValue: (value) => `${value / 10000}万円`,
  },
  {
    type: "chips",
    key: "layout",
    label: "間取り",
    options: [
      { label: "1K", value: "1k" },
      { label: "1LDK", value: "1ldk" },
    ],
    value: [],
  },
  {
    type: "checkboxes",
    key: "features",
    label: "こだわり",
    options: [{ label: "オートロック", value: "auto-lock" }],
    value: [],
  },
  {
    type: "select",
    key: "walk",
    label: "徒歩分数",
    options: [{ label: "5分以内", value: "5" }],
    value: "",
    placeholder: "指定なし",
  },
  { type: "toggle", key: "available", label: "募集中のみ", value: false },
];

describe("FilterPanel", () => {
  it("各フィールドを描画する", () => {
    render(<FilterPanel fields={fields} onChange={vi.fn()} />);
    expect(screen.getByText("賃料")).toBeInTheDocument();
    expect(screen.getByText("間取り")).toBeInTheDocument();
    expect(screen.getByText("こだわり")).toBeInTheDocument();
    expect(screen.getByLabelText("募集中のみ")).toBeInTheDocument();
  });

  it("範囲スライダーの変更をキー付きで通知する", () => {
    const onChange = vi.fn();
    render(<FilterPanel fields={fields} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole("slider", { name: "賃料 下限" }), {
      key: "ArrowRight",
    });
    expect(onChange).toHaveBeenCalledWith("rent", [5000, 150000]);
  });

  it("チップの選択をキー付きで通知する", () => {
    const onChange = vi.fn();
    render(<FilterPanel fields={fields} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "1K" }));
    expect(onChange).toHaveBeenCalledWith("layout", ["1k"]);
  });

  it("チェックボックスの選択をキー付きで通知する", () => {
    const onChange = vi.fn();
    render(<FilterPanel fields={fields} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText("オートロック"));
    expect(onChange).toHaveBeenCalledWith("features", ["auto-lock"]);
  });

  it("セレクトの変更をキー付きで通知する", () => {
    const onChange = vi.fn();
    render(<FilterPanel fields={fields} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("徒歩分数"), {
      target: { value: "5" },
    });
    expect(onChange).toHaveBeenCalledWith("walk", "5");
  });

  it("トグルの変更をキー付きで通知する", () => {
    const onChange = vi.fn();
    render(<FilterPanel fields={fields} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText("募集中のみ"));
    expect(onChange).toHaveBeenCalledWith("available", true);
  });

  it("リセットと適用を通知する", () => {
    const onReset = vi.fn();
    const onSubmit = vi.fn();
    render(
      <FilterPanel
        fields={fields}
        onChange={vi.fn()}
        onReset={onReset}
        onSubmit={onSubmit}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "条件をリセット" }));
    fireEvent.click(screen.getByRole("button", { name: "この条件で適用" }));
    expect(onReset).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
