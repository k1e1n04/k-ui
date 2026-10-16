import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Carousel } from "./Carousel";

const items = [
  { id: "a", content: "一案目" },
  { id: "b", content: "二案目" },
  { id: "c", content: "三案目" },
];

describe("Carousel", () => {
  it("最初のスライドを表示し、前へは無効にする", () => {
    render(<Carousel items={items} />);
    expect(screen.getByRole("button", { name: "前へ" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "1番目を表示" })).toHaveAttribute(
      "aria-current",
      "true",
    );
  });

  it("次へでスライドを進める", async () => {
    render(<Carousel items={items} />);
    await userEvent.click(screen.getByRole("button", { name: "次へ" }));
    expect(screen.getByRole("button", { name: "2番目を表示" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(screen.getByText("二案目")).toBeInTheDocument();
  });

  it("末尾では次へを無効にする", async () => {
    render(<Carousel items={items} />);
    await userEvent.click(screen.getByRole("button", { name: "3番目を表示" }));
    expect(screen.getByRole("button", { name: "次へ" })).toBeDisabled();
  });
});
