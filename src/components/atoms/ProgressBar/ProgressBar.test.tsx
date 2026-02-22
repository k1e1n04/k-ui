import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("role=progressbar でレンダリングされる", () => {
    render(<ProgressBar value={40} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("デフォルトで ARIA 属性が設定される", () => {
    render(<ProgressBar value={40} />);
    const progressbar = screen.getByRole("progressbar");

    expect(progressbar).toHaveAttribute("aria-valuenow", "40");
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
  });

  it("label が指定されると aria-label に反映される", () => {
    render(<ProgressBar value={20} label="進捗 2/10" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-label",
      "進捗 2/10",
    );
  });

  it("label が未指定のとき aria-label は付与されない", () => {
    render(<ProgressBar value={20} />);
    expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-label");
  });

  it.each([
    "sm",
    "md",
    "lg",
  ] as const)("size=%s でレンダリングされる", (size) => {
    render(<ProgressBar value={30} size={size} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("size=lg のとき lg スタイルが適用される", () => {
    render(<ProgressBar value={30} size="lg" />);
    expect(screen.getByRole("progressbar")).toHaveClass("h-4");
  });

  it("className が渡される", () => {
    render(<ProgressBar value={50} className="custom-class" />);
    expect(screen.getByRole("progressbar")).toHaveClass("custom-class");
  });

  it("value が 0 未満のとき 0 に丸められる", () => {
    const { container } = render(<ProgressBar value={-10} />);
    const progressbar = screen.getByRole("progressbar");
    const fill = container.querySelector('div[style="width: 0%;"]');

    expect(progressbar).toHaveAttribute("aria-valuenow", "0");
    expect(fill).toBeInTheDocument();
  });

  it("value が max を超えると max に丸められる", () => {
    const { container } = render(<ProgressBar value={120} max={100} />);
    const progressbar = screen.getByRole("progressbar");
    const fill = container.querySelector('div[style="width: 100%;"]');

    expect(progressbar).toHaveAttribute("aria-valuenow", "100");
    expect(fill).toBeInTheDocument();
  });

  it("max が 0 以下のとき 100 が使われる", () => {
    render(<ProgressBar value={10} max={0} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuemax",
      "100",
    );
  });
});
