import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ButtonGroup } from "./ButtonGroup";

describe("ButtonGroup", () => {
  it.each([
    "horizontal",
    "vertical",
  ] as const)("orientation=%s で子要素を連結する", (orientation) => {
    render(
      <ButtonGroup orientation={orientation} className="custom">
        <button type="button">One</button>
        <button type="button">Two</button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("group")).toHaveClass("custom");
    expect(screen.getByRole("button", { name: "One" })).toBeInTheDocument();
  });
});
