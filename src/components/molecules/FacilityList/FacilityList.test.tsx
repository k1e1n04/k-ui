import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FacilityList } from "./FacilityList";

const items = [
  { key: "bath", label: "バス・トイレ別" },
  { key: "parking", label: "駐車場", available: false },
];

describe("FacilityList", () => {
  it("設備を一覧表示する", () => {
    render(<FacilityList items={items} />);
    expect(screen.getByText("バス・トイレ別")).toBeInTheDocument();
    expect(screen.getByText("駐車場")).toBeInTheDocument();
  });

  it("利用不可の設備は取り消し線で表示する", () => {
    render(<FacilityList items={items} />);
    expect(screen.getByText("駐車場").closest("li")).toHaveClass(
      "line-through",
    );
  });

  it("見出しを表示する", () => {
    render(<FacilityList items={items} title="設備・条件" />);
    expect(screen.getByText("設備・条件")).toBeInTheDocument();
  });
});
