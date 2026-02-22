import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Typography } from "./Typography";

describe("Typography", () => {
  it("デフォルトで paragraph としてレンダリングされる", () => {
    render(<Typography>Body text</Typography>);
    const text = screen.getByText("Body text");
    expect(text.tagName).toBe("P");
  });

  it("variant と tone のスタイルを適用する", () => {
    render(
      <Typography variant="caption" tone="muted">
        Caption text
      </Typography>,
    );

    const text = screen.getByText("Caption text");
    expect(text.getAttribute("style")).toContain(
      "font-size: var(--kui-font-size-xs);",
    );
    expect(text.getAttribute("style")).toContain(
      "color: var(--kui-color-text-muted);",
    );
  });

  it("weight 指定時にフォントウェイトを適用する", () => {
    render(<Typography weight="bold">Bold text</Typography>);
    const text = screen.getByText("Bold text");
    expect(text.getAttribute("style")).toContain(
      "font-weight: var(--kui-font-weight-bold);",
    );
  });

  it("truncate=true で truncate クラスを付与する", () => {
    render(<Typography truncate>Truncated text</Typography>);
    expect(screen.getByText("Truncated text")).toHaveClass("truncate");
  });
});
