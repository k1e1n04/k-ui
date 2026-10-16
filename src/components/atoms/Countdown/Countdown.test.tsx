import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Countdown, countdownDays } from "./Countdown";

describe("Countdown", () => {
  it("JST の暦日で残り日数を数える", () => {
    expect(countdownDays("2026-10-23", new Date("2026-10-11T00:00:00Z"))).toBe(
      12,
    );
    expect(
      countdownDays(
        "2026-10-23T00:00:00+09:00",
        new Date("2026-10-22T23:00:00+09:00"),
      ),
    ).toBe(1);
  });

  it("ラベルと残り日数を表示する", () => {
    render(
      <Countdown
        targetDate="2026-10-23"
        now={new Date("2026-10-11T00:00:00Z")}
        label="出発まで"
      />,
    );
    expect(screen.getByRole("timer")).toHaveAccessibleName("出発まで あと12日");
    expect(screen.getByRole("timer")).toHaveTextContent("12");
  });

  it("当日は今日と表示する", () => {
    render(
      <Countdown
        targetDate="2026-10-23"
        now={new Date("2026-10-23T03:00:00+09:00")}
      />,
    );
    expect(screen.getByRole("timer")).toHaveTextContent("今日");
  });

  it("maxDays より先なら表示しない", () => {
    const { container } = render(
      <Countdown
        targetDate="2026-12-01"
        now={new Date("2026-10-11T00:00:00Z")}
        maxDays={30}
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
