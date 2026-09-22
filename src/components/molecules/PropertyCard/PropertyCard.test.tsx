import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PropertyCard } from "./PropertyCard";

const baseProps = {
  id: "p1",
  title: "グランドメゾン渋谷",
  rent: 128000,
  managementFee: 8000,
  address: "東京都渋谷区道玄坂1-1-1",
  access: "JR山手線 渋谷駅 徒歩5分",
  layout: "1LDK",
  area: 40.2,
  buildingAge: 5,
  floor: "3階 / 10階建",
};

describe("PropertyCard", () => {
  it("物件情報を表示する", () => {
    render(<PropertyCard {...baseProps} />);
    expect(screen.getByText("グランドメゾン渋谷")).toBeInTheDocument();
    expect(screen.getByText("12.8万円")).toBeInTheDocument();
    expect(screen.getByText("東京都渋谷区道玄坂1-1-1")).toBeInTheDocument();
    expect(screen.getByText("1LDK")).toBeInTheDocument();
    expect(screen.getByText("40.2㎡")).toBeInTheDocument();
    expect(screen.getByText("築5年")).toBeInTheDocument();
  });

  it("お気に入りの変更を通知する", () => {
    const onFavoriteChange = vi.fn();
    render(
      <PropertyCard
        {...baseProps}
        favorite={false}
        onFavoriteChange={onFavoriteChange}
      />,
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: "グランドメゾン渋谷をお気に入りに追加",
      }),
    );
    expect(onFavoriteChange).toHaveBeenCalledWith(true);
  });

  it("比較チェックの変更を通知する", () => {
    const onCompareChange = vi.fn();
    render(
      <PropertyCard
        {...baseProps}
        compared={false}
        onCompareChange={onCompareChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("比較"));
    expect(onCompareChange).toHaveBeenCalledWith(true);
  });

  it("カード全体のクリックを通知する", () => {
    const onClick = vi.fn();
    render(<PropertyCard {...baseProps} onClick={onClick} />);
    fireEvent.click(
      screen.getByRole("button", {
        name: "グランドメゾン渋谷の詳細を開く",
      }),
    );
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("募集終了のタグを表示する", () => {
    render(<PropertyCard {...baseProps} available={false} />);
    expect(screen.getByText("募集終了")).toBeInTheDocument();
  });
});
