import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { formatManYen, formatYen, Price } from "./Price";

describe("Price", () => {
  it("万円表記で表示する", () => {
    render(<Price value={85000} />);
    expect(screen.getByText("8.5万円")).toBeInTheDocument();
  });

  it("整数の万円は小数を省略する", () => {
    expect(formatManYen(120000)).toBe("12万円");
    expect(formatManYen(85500)).toBe("8.6万円");
  });

  it("yen 形式では通貨記号を付ける", () => {
    const formatted = formatYen(85000);
    expect(formatted).toContain("85,000");
    expect(formatted).toMatch(/[¥￥]/);
  });

  it("管理費のキャプションを表示する", () => {
    render(<Price value={85000} caption="管理費 5,000円" />);
    expect(screen.getByText("管理費 5,000円")).toBeInTheDocument();
  });

  it("単位を表示する", () => {
    render(<Price value={85000} unit="/月" />);
    expect(screen.getByText("/月")).toBeInTheDocument();
  });
});
