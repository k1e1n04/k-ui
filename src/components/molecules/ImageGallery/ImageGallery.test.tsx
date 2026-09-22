import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ImageGallery } from "./ImageGallery";

const images = [
  { src: "/room1.jpg", alt: "リビング" },
  { src: "/room2.jpg", alt: "キッチン" },
];

describe("ImageGallery", () => {
  it("画像とカウンターを表示する", () => {
    render(<ImageGallery images={images} />);
    expect(screen.getByAltText("リビング")).toBeInTheDocument();
    expect(screen.getByText("1 / 2")).toBeInTheDocument();
  });

  it("次の画像へ進むと通知する", () => {
    const onIndexChange = vi.fn();
    render(<ImageGallery images={images} onIndexChange={onIndexChange} />);
    fireEvent.click(screen.getByRole("button", { name: "次の画像" }));
    expect(onIndexChange).toHaveBeenCalledWith(1);
  });

  it("前の画像は末尾へ循環する", () => {
    const onIndexChange = vi.fn();
    render(<ImageGallery images={images} onIndexChange={onIndexChange} />);
    fireEvent.click(screen.getByRole("button", { name: "前の画像" }));
    expect(onIndexChange).toHaveBeenCalledWith(1);
  });

  it("画像がない場合メッセージを表示する", () => {
    render(<ImageGallery images={[]} />);
    expect(screen.getByText("画像がありません")).toBeInTheDocument();
  });

  it("画像クリックを通知する", () => {
    const onImageClick = vi.fn();
    render(<ImageGallery images={images} onImageClick={onImageClick} />);
    fireEvent.click(screen.getByRole("button", { name: "リビングを拡大表示" }));
    expect(onImageClick).toHaveBeenCalledWith(0);
  });
});
