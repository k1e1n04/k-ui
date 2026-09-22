import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MediaList } from "./MediaList";

const items = [
  {
    id: "p1",
    title: "物件A",
    subtitle: "東京都A",
    favoriteLabel: "物件Aをお気に入り",
  },
  {
    id: "p2",
    title: "物件B",
    subtitle: "東京都B",
    favoriteLabel: "物件Bをお気に入り",
  },
];

describe("MediaList", () => {
  it("アイテムを一覧表示する", () => {
    render(<MediaList items={items} />);
    expect(screen.getByText("物件A")).toBeInTheDocument();
    expect(screen.getByText("物件B")).toBeInTheDocument();
  });

  it("読み込み中はスケルトンを表示する", () => {
    render(<MediaList items={[]} loading loadingCount={3} />);
    expect(
      screen.getByRole("status", { name: "読み込み中" }),
    ).toBeInTheDocument();
  });

  it("0件のとき空状態を表示する", () => {
    render(<MediaList items={[]} />);
    expect(screen.getByText("表示できる項目がありません")).toBeInTheDocument();
  });

  it("お気に入り変更をID付きで通知する", () => {
    const onFavoriteChange = vi.fn();
    render(
      <MediaList
        items={items}
        favoriteIds={["p2"]}
        onFavoriteChange={onFavoriteChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "物件Aをお気に入り" }));
    expect(onFavoriteChange).toHaveBeenCalledWith("p1", true);
  });

  it("アイテムクリックをID付きで通知する", () => {
    const onItemClick = vi.fn();
    render(<MediaList items={items} onItemClick={onItemClick} />);
    fireEvent.click(screen.getByRole("button", { name: "物件Bを開く" }));
    expect(onItemClick).toHaveBeenCalledWith("p2");
  });

  it("選択変更をID付きで通知する", () => {
    const onSelectedChange = vi.fn();
    render(
      <MediaList
        items={items}
        selectedIds={[]}
        onSelectedChange={onSelectedChange}
      />,
    );
    const checkboxes = screen.getAllByLabelText("選択");
    fireEvent.click(checkboxes[0]);
    expect(onSelectedChange).toHaveBeenCalledWith("p1", true);
  });
});
