import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PropertyList } from "./PropertyList";

const properties = [
  {
    id: "p1",
    title: "物件A",
    rent: 80000,
    address: "東京都A",
  },
  {
    id: "p2",
    title: "物件B",
    rent: 120000,
    address: "東京都B",
  },
];

describe("PropertyList", () => {
  it("物件カードを一覧表示する", () => {
    render(<PropertyList properties={properties} />);
    expect(screen.getByText("物件A")).toBeInTheDocument();
    expect(screen.getByText("物件B")).toBeInTheDocument();
  });

  it("読み込み中はスケルトンを表示する", () => {
    render(<PropertyList properties={[]} loading loadingCount={3} />);
    expect(
      screen.getByRole("status", { name: "物件を読み込み中" }),
    ).toBeInTheDocument();
  });

  it("0件のとき空状態を表示する", () => {
    render(<PropertyList properties={[]} />);
    expect(
      screen.getByText("条件に一致する物件がありません"),
    ).toBeInTheDocument();
  });

  it("お気に入り変更をID付きで通知する", () => {
    const onFavoriteChange = vi.fn();
    render(
      <PropertyList
        properties={properties}
        favoriteIds={["p2"]}
        onFavoriteChange={onFavoriteChange}
      />,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "物件Aをお気に入りに追加" }),
    );
    expect(onFavoriteChange).toHaveBeenCalledWith("p1", true);
  });

  it("物件クリックをID付きで通知する", () => {
    const onPropertyClick = vi.fn();
    render(
      <PropertyList
        properties={properties}
        onPropertyClick={onPropertyClick}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "物件Bの詳細を開く" }));
    expect(onPropertyClick).toHaveBeenCalledWith("p2");
  });
});
