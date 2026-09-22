import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MediaCard } from "./MediaCard";

const baseProps = {
  id: "p1",
  title: "グランドメゾン渋谷",
  subtitle: "東京都渋谷区道玄坂1-1-1",
  description: "JR山手線 渋谷駅 徒歩5分",
  highlight: <span>12.8万円</span>,
  highlightCaption: "管理費 8,000円",
  meta: [
    { label: "間取り", value: "1LDK" },
    { label: "専有面積", value: "40.2㎡" },
  ],
  tags: [{ label: "新着" }],
};

describe("MediaCard", () => {
  it("タイトル・補足・主要な値を表示する", () => {
    render(<MediaCard {...baseProps} />);
    expect(screen.getByText("グランドメゾン渋谷")).toBeInTheDocument();
    expect(screen.getByText("12.8万円")).toBeInTheDocument();
    expect(screen.getByText("東京都渋谷区道玄坂1-1-1")).toBeInTheDocument();
    expect(screen.getByText("1LDK")).toBeInTheDocument();
    expect(screen.getByText("新着")).toBeInTheDocument();
  });

  it("お気に入りの変更を通知する", () => {
    const onFavoriteChange = vi.fn();
    render(
      <MediaCard
        {...baseProps}
        favorite={false}
        favoriteLabel="お気に入り"
        onFavoriteChange={onFavoriteChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "お気に入り" }));
    expect(onFavoriteChange).toHaveBeenCalledWith(true);
  });

  it("選択チェックの変更を通知する", () => {
    const onSelectedChange = vi.fn();
    render(
      <MediaCard
        {...baseProps}
        selectable
        selected={false}
        selectLabel="比較"
        onSelectedChange={onSelectedChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("比較"));
    expect(onSelectedChange).toHaveBeenCalledWith(true);
  });

  it("カード全体のクリックを通知する", () => {
    const onClick = vi.fn();
    render(<MediaCard {...baseProps} onClick={onClick} />);
    fireEvent.click(
      screen.getByRole("button", { name: "グランドメゾン渋谷を開く" }),
    );
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("ステータスを表示する", () => {
    render(<MediaCard {...baseProps} status={{ label: "募集終了" }} />);
    expect(screen.getByText("募集終了")).toBeInTheDocument();
  });
});
