import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WeatherBadge } from "./WeatherBadge";

describe("WeatherBadge", () => {
  it("天気のラベルと気温を表示する", () => {
    render(<WeatherBadge condition="sunny" temperature={24} />);
    expect(screen.getByRole("img")).toHaveAccessibleName("晴れ 24度");
    expect(screen.getByRole("img")).toHaveTextContent("晴れ");
    expect(screen.getByRole("img")).toHaveTextContent("24°");
  });

  it.each(["sunny", "cloudy", "rainy", "snowy", "unknown"] as const)(
    "condition=%s をラベル付きで表示する",
    (condition) => {
      render(<WeatherBadge condition={condition} />);
      expect(screen.getByRole("img")).toHaveAccessibleName(/.+/);
    },
  );
});
