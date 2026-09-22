"use client";

import type React from "react";
import { useRef, useState } from "react";

import { cn } from "../../../utils/cn";

/** ギャラリーの画像 */
export interface ImageGalleryImage {
  /** 画像URL */
  src: string;
  /** 代替テキスト */
  alt?: string;
}

export interface ImageGalleryProps {
  /** 画像一覧 */
  images: ImageGalleryImage[];
  /** 現在のインデックス（制御用） */
  index?: number;
  /** 初期インデックス（非制御用） @default 0 */
  defaultIndex?: number;
  /** インデックス変更時 */
  onIndexChange?: (index: number) => void;
  /** 画像クリック時 */
  onImageClick?: (index: number) => void;
  /** アスペクト比。 @default "4 / 3" */
  aspectRatio?: string;
  /** サムネイルを表示するか。 @default true */
  showThumbnails?: boolean;
  /** 枚数カウンターを表示するか。 @default true */
  showCounter?: boolean;
  /** 追加のクラス名 */
  className?: string;
}

const SWIPE_THRESHOLD = 40;

/**
 * ImageGallery コンポーネント
 *
 * 物件写真をスワイプ・ドラッグで切り替えられるギャラリー。
 *
 * @example
 * <ImageGallery
 *   images={[
 *     { src: "/room1.jpg", alt: "リビング" },
 *     { src: "/room2.jpg", alt: "キッチン" },
 *   ]}
 * />
 */
export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  index,
  defaultIndex = 0,
  onIndexChange,
  onImageClick,
  aspectRatio = "4 / 3",
  showThumbnails = true,
  showCounter = true,
  className,
}) => {
  const [innerIndex, setInnerIndex] = useState(defaultIndex);
  const [dragX, setDragX] = useState(0);
  const dragRef = useRef<{ startX: number; pointerId: number } | null>(null);

  const current = index ?? innerIndex;
  const total = images.length;
  const clamped = total === 0 ? 0 : Math.min(Math.max(current, 0), total - 1);

  const goTo = (next: number) => {
    if (total === 0) return;
    const bounded = (next + total) % total;
    if (index === undefined) setInnerIndex(bounded);
    onIndexChange?.(bounded);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (total <= 1) return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragRef.current = { startX: event.clientX, pointerId: event.pointerId };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId)
      return;
    setDragX(event.clientX - dragRef.current.startX);
  };

  const handlePointerUp = () => {
    if (!dragRef.current) return;
    const delta = dragX;
    dragRef.current = null;
    setDragX(0);
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    goTo(delta < 0 ? clamped + 1 : clamped - 1);
  };

  if (total === 0) {
    return (
      <div
        className={cn(
          "flex w-full items-center justify-center rounded-lg border border-dashed border-border-strong bg-surface-sunken text-muted",
          className,
        )}
        style={{ aspectRatio }}
      >
        画像がありません
      </div>
    );
  }

  const active = images[clamped];

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <section
        aria-roledescription="カルーセル"
        aria-label="物件写真"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ aspectRatio }}
        className="relative w-full touch-none overflow-hidden rounded-lg bg-surface-sunken"
      >
        <div
          className="flex h-full w-full transition-transform duration-200"
          style={{
            transform: `translateX(calc(${-clamped * 100}% + ${dragX}px))`,
          }}
        >
          {images.map((image, imageIndex) => (
            <button
              key={image.src}
              type="button"
              tabIndex={imageIndex === clamped ? 0 : -1}
              aria-label={
                image.alt ? `${image.alt}を拡大表示` : "画像を拡大表示"
              }
              aria-hidden={imageIndex !== clamped}
              onClick={() => onImageClick?.(imageIndex)}
              className="h-full w-full shrink-0 cursor-zoom-in border-0 bg-transparent p-0"
            >
              <img
                src={image.src}
                alt={image.alt ?? `物件写真 ${imageIndex + 1}`}
                draggable={false}
                className="h-full w-full select-none object-cover"
              />
            </button>
          ))}
        </div>

        {showCounter && (
          <span className="absolute bottom-2 right-2 rounded bg-foreground/70 px-2 py-0.5 text-xs text-inverse">
            {clamped + 1} / {total}
          </span>
        )}

        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="前の画像"
              onClick={() => goTo(clamped - 1)}
              className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-foreground shadow-sm hover:bg-surface"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15 5-7 7 7 7"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="次の画像"
              onClick={() => goTo(clamped + 1)}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-foreground shadow-sm hover:bg-surface"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </section>

      {showThumbnails && total > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, imageIndex) => (
            <button
              key={`thumb-${image.src}`}
              type="button"
              aria-label={`${imageIndex + 1}枚目を表示`}
              aria-current={imageIndex === clamped}
              onClick={() => goTo(imageIndex)}
              className={cn(
                "h-14 w-20 shrink-0 overflow-hidden rounded border-2",
                imageIndex === clamped
                  ? "border-primary-main"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <img
                src={image.src}
                alt=""
                draggable={false}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      <span className="sr-only" aria-live="polite">
        {`${clamped + 1}枚目: ${active.alt ?? ""}`}
      </span>
    </div>
  );
};
