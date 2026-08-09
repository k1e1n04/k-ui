import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Timeline } from "./Timeline";

describe("Timeline", () => {
  it("時刻と内容を持つ縦方向の項目をリストとして描画する", () => {
    render(
      <Timeline
        items={[
          { title: "申請を送信", timestamp: "10:00", content: "受付済み" },
          { title: "承認", timestamp: "11:00", content: "担当者が確認" },
        ]}
      />,
    );
    expect(
      screen.getByRole("list", { name: "タイムライン" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("10:00")).toBeInTheDocument();
  });

  it("交互配置を選択できる", () => {
    const { container } = render(
      <Timeline items={[{ title: "開始" }]} align="alternate" />,
    );
    expect(container.firstChild).toHaveClass("items-center");
  });

  it("右寄せと交互配置の各項目に接続線側のマーカーを一つだけ描画する", () => {
    const { container } = render(
      <Timeline
        align="alternate"
        items={[{ title: "開始" }, { title: "完了", icon: "✓" }]}
      />,
    );
    const items = container.querySelectorAll("li");
    const firstMarkers = items[0]?.querySelectorAll(
      ":scope > span[aria-hidden=true]",
    );
    const secondMarkers = items[1]?.querySelectorAll(
      ":scope > span[aria-hidden=true]",
    );

    expect(firstMarkers).toHaveLength(1);
    expect(secondMarkers).toHaveLength(1);
    expect(secondMarkers?.[0]).toHaveClass("-right-2");
    expect(secondMarkers?.[0]).toHaveTextContent("✓");
  });
});
