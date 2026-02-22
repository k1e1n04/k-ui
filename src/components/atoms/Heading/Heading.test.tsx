import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Heading } from "./Heading";

describe("Heading", () => {
  it("デフォルトで h2 としてレンダリングされる", () => {
    render(<Heading>Title</Heading>);
    const heading = screen.getByRole("heading", { name: "Title" });
    expect(heading.tagName).toBe("H2");
  });

  it("as と size と tone を適用できる", () => {
    render(
      <Heading as="h1" size="xl" tone="muted">
        Page title
      </Heading>,
    );

    const heading = screen.getByRole("heading", { name: "Page title" });
    expect(heading.tagName).toBe("H1");
    expect(heading.getAttribute("style")).toContain(
      "font-size: var(--kui-font-size-2xl);",
    );
    expect(heading.getAttribute("style")).toContain(
      "color: var(--kui-color-text-muted);",
    );
  });
});
