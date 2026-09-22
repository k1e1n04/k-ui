import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  PropertyFilterPanel,
  type PropertyFilterValue,
} from "./PropertyFilterPanel";

const value: PropertyFilterValue = {
  rentMin: 0,
  rentMax: 100000,
  layouts: [],
  facilities: [],
  onlyAvailable: false,
};

describe("PropertyFilterPanel", () => {
  it("見出しを表示する", () => {
    render(<PropertyFilterPanel value={value} onChange={vi.fn()} />);
    expect(screen.getByText("賃料")).toBeInTheDocument();
    expect(screen.getByText("間取り")).toBeInTheDocument();
    expect(screen.getByText("こだわり条件")).toBeInTheDocument();
  });

  it("間取りを選択すると通知する", () => {
    const onChange = vi.fn();
    render(<PropertyFilterPanel value={value} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "1LDK" }));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ layouts: ["1LDK"] }),
    );
  });

  it("こだわり条件を選択すると通知する", () => {
    const onChange = vi.fn();
    render(<PropertyFilterPanel value={value} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText("オートロック"));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ facilities: ["auto-lock"] }),
    );
  });

  it("募集中のみのチェックを通知する", () => {
    const onChange = vi.fn();
    render(<PropertyFilterPanel value={value} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText("募集中の物件のみ表示"));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ onlyAvailable: true }),
    );
  });

  it("リセットと適用を通知する", () => {
    const onReset = vi.fn();
    const onSubmit = vi.fn();
    render(
      <PropertyFilterPanel
        value={value}
        onChange={vi.fn()}
        onReset={onReset}
        onSubmit={onSubmit}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "条件をリセット" }));
    fireEvent.click(screen.getByRole("button", { name: "この条件で検索" }));
    expect(onReset).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
