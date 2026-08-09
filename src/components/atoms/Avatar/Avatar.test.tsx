import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("名前からイニシャルを表示する", () => {
    render(<Avatar name="Jane Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });
  it("画像エラー時に名前へフォールバックする", () => {
    render(<Avatar src="bad" name="Jane Doe" />);
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByText("JD")).toBeInTheDocument();
  });
  it.each(["small", "medium", "large"] as const)(
    "size=%s とshapeを適用する",
    (size) => {
      render(
        <Avatar
          name="Jane Doe"
          size={size}
          shape="square"
          className="custom"
        />,
      );
      expect(screen.getByText("JD")).toHaveClass("custom");
    },
  );
});
