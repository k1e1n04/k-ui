import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MapPin } from "./MapPin";

describe("MapPin", () => {
  it("ラベルを表示する", () => {
    render(<MapPin label="8.5万円" />);
    expect(screen.getByText("8.5万円")).toBeInTheDocument();
  });

  it("選択状態でもラベルを表示する", () => {
    const { container } = render(<MapPin label="12万円" selected />);
    expect(screen.getByText("12万円")).toBeInTheDocument();
    expect(container.querySelector(".ring-accent-main")).not.toBeNull();
  });
});
