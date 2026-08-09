import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AvatarGroup } from "./AvatarGroup";

describe("AvatarGroup", () => {
  it("maxを超えるアバター数を表示する", () => {
    render(
      <AvatarGroup
        avatars={[{ name: "One" }, { name: "Two" }, { name: "Three" }]}
        max={2}
        className="custom"
      />,
    );
    expect(screen.getByText("+1")).toBeInTheDocument();
    expect(screen.getByRole("group")).toHaveClass("custom");
  });
});
