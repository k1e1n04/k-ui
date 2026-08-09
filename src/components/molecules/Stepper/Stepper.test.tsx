import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Stepper } from "./Stepper";

const steps = [
  { label: "入力", description: "情報を入力" },
  { label: "確認", description: "内容を確認" },
  { label: "完了" },
];

describe("Stepper", () => {
  it("現在の手順をアクセシブルに示す", () => {
    render(<Stepper steps={steps} activeStep={1} />);
    expect(screen.getByText("確認").closest("li")).toHaveAttribute(
      "aria-current",
      "step",
    );
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("現在の手順を示す aria-current を一つの意味的な要素だけに設定する", () => {
    const { container } = render(<Stepper steps={steps} activeStep={1} />);
    expect(container.querySelectorAll('[aria-current="step"]')).toHaveLength(1);
  });

  it("手順のクリックを通知する", async () => {
    const user = userEvent.setup();
    const onStepClick = vi.fn();
    render(<Stepper steps={steps} activeStep={0} onStepClick={onStepClick} />);
    await user.click(screen.getByRole("button", { name: /確認/ }));
    expect(onStepClick).toHaveBeenCalledWith(1);
  });
});
