import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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

  it("時間帯ごとにグループ化して見出しを付ける", () => {
    render(
      <Timeline
        groupBySlot
        items={[
          { title: "朝の散歩", slot: "morning" },
          { title: "夕食", slot: "evening" },
          { title: "予約", timestamp: "10:00" },
        ]}
      />,
    );
    expect(
      screen.getByRole("region", { name: "タイムライン" }),
    ).toBeInTheDocument();
    expect(screen.getByText("朝（〜11時）")).toBeInTheDocument();
    expect(screen.getByText("夕方（17〜20時）")).toBeInTheDocument();
    expect(screen.getByText("時間帯未定")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("ハンドルを押すと対象の位置を通知する", () => {
    const onHandlePointerDown = vi.fn();
    render(
      <Timeline
        showHandles
        onHandlePointerDown={onHandlePointerDown}
        items={[{ title: "朝の散歩" }, { title: "夕食" }]}
      />,
    );
    const handles = screen.getAllByRole("button", {
      name: "ドラッグして並べ替え",
    });
    fireEvent.pointerDown(handles[1]);
    expect(onHandlePointerDown).toHaveBeenCalledWith(1, expect.anything());
  });
});
