"use client";

import type React from "react";

import { cn } from "../../../utils/cn";
import { Badge, type BadgeVariant } from "../../atoms/Badge";
import { Card } from "../../atoms/Card";
import { Checkbox } from "../../atoms/Checkbox";
import { FavoriteButton } from "../../atoms/FavoriteButton";
import { Heading } from "../../atoms/Heading";
import { Typography } from "../../atoms/Typography";

/** カードに表示する補足情報（ラベルと値のペア） */
export interface MediaCardMeta {
  /** ラベル */
  label: string;
  /** 値 */
  value: React.ReactNode;
}

/** カードに表示するタグ */
export interface MediaCardTag {
  /** 表示内容 */
  label: React.ReactNode;
  /** バッジの種別。 @default "info" */
  variant?: BadgeVariant;
}

export interface MediaCardProps {
  /** 識別子（data-testid に使用） */
  id?: string;
  /** タイトル */
  title: React.ReactNode;
  /** 補助タイトル（住所など） */
  subtitle?: React.ReactNode;
  /** 説明文（アクセスなど） */
  description?: React.ReactNode;
  /** メディア画像URL */
  imageUrl?: string;
  /** メディアの代替テキスト */
  imageAlt?: string;
  /** メディアのアスペクト比。 @default "4 / 3" */
  mediaAspect?: string;
  /** 左上に表示するタグ */
  tags?: MediaCardTag[];
  /** ステータス表示（募集中止など） */
  status?: MediaCardTag;
  /** 強調表示する主要な値（価格など） */
  highlight?: React.ReactNode;
  /** 主要な値の補足（管理費など） */
  highlightCaption?: React.ReactNode;
  /** 補足情報の一覧（間取り・面積など） */
  meta?: MediaCardMeta[];
  /** 注記の一覧（敷金・礼金など） */
  notes?: React.ReactNode[];
  /** フッター要素 */
  footer?: React.ReactNode;
  /** お気に入り状態 */
  favorite?: boolean;
  /** お気に入り変更時 */
  onFavoriteChange?: (favorite: boolean) => void;
  /** お気に入りボタンのラベル */
  favoriteLabel?: string;
  /** 選択チェックを表示するか */
  selectable?: boolean;
  /** 選択状態 */
  selected?: boolean;
  /** 選択変更時 */
  onSelectedChange?: (selected: boolean) => void;
  /** 選択チェックのラベル。 @default "選択" */
  selectLabel?: string;
  /** カードを強調表示するか（一覧での選択状態など） */
  highlighted?: boolean;
  /** カードクリック時（指定時はカード全体がリンク相当になる） */
  onClick?: () => void;
  /** クリック時のアクセシブルなラベル */
  clickLabel?: string;
  /** 追加のクラス名 */
  className?: string;
}

const toText = (node: React.ReactNode): string =>
  typeof node === "string" ? node : "";

const MediaPlaceholder: React.FC = () => (
  <div
    aria-hidden="true"
    className="flex h-full w-full items-center justify-center bg-surface-sunken text-border-strong"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-10 w-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5 9 10.5l4.5 4.5 3-3L21 16.5M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25Z"
      />
    </svg>
  </div>
);

/**
 * MediaCard コンポーネント
 *
 * 画像・タイトル・補足情報・主要な値・タグなどをまとめて表示する汎用カード。
 * 賃貸の賃料や物件名など、ドメイン固有の内容は props で注入する。
 *
 * @example
 * <MediaCard
 *   title="グランドメゾン渋谷"
 *   subtitle="東京都渋谷区..."
 *   imageUrl="/room.jpg"
 *   highlight={<Price value={128000} />}
 *   meta={[{ label: "間取り", value: "1LDK" }]}
 *   favorite={favorite}
 *   onFavoriteChange={setFavorite}
 * />
 */
export const MediaCard: React.FC<MediaCardProps> = ({
  id,
  title,
  subtitle,
  description,
  imageUrl,
  imageAlt,
  mediaAspect = "4 / 3",
  tags,
  status,
  highlight,
  highlightCaption,
  meta,
  notes,
  footer,
  favorite = false,
  onFavoriteChange,
  favoriteLabel,
  selectable = false,
  selected = false,
  onSelectedChange,
  selectLabel = "選択",
  highlighted = false,
  onClick,
  clickLabel,
  className,
}) => {
  const interactive = Boolean(onClick);
  const titleText = toText(title);
  const tagEntries = (tags ?? []).map((tag, index) => ({
    id: `tag-${index}`,
    tag,
  }));
  const noteEntries = (notes ?? []).map((note, index) => ({
    id: `note-${index}`,
    note,
  }));

  return (
    <Card
      padding="none"
      border
      shadow="sm"
      data-testid={id ? `media-card-${id}` : undefined}
      className={cn(
        "group relative overflow-hidden",
        highlighted && "ring-2 ring-primary-main",
        interactive && "transition-shadow hover:shadow-md",
        className,
      )}
    >
      {interactive && (
        <button
          type="button"
          aria-label={
            clickLabel ?? (titleText ? `${titleText}を開く` : "詳細を開く")
          }
          onClick={onClick}
          className="absolute inset-0 z-0 cursor-pointer"
        />
      )}
      <div className="pointer-events-none relative z-[1]">
        <div
          className="relative w-full overflow-hidden bg-surface-sunken"
          style={{ aspectRatio: mediaAspect }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt ?? titleText}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <MediaPlaceholder />
          )}
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            {tagEntries.map(({ id: tagId, tag }) => (
              <Badge key={tagId} variant={tag.variant ?? "info"}>
                {tag.label}
              </Badge>
            ))}
            {status && (
              <Badge variant={status.variant ?? "neutral"}>
                {status.label}
              </Badge>
            )}
          </div>
          {onFavoriteChange && (
            <FavoriteButton
              favorite={favorite}
              onChange={onFavoriteChange}
              label={favoriteLabel ?? "お気に入りに追加"}
              className="pointer-events-auto absolute right-2 top-2"
            />
          )}
        </div>

        <div className="flex flex-col gap-3 p-4">
          {(highlight || selectable) && (
            <div className="flex items-end justify-between gap-2">
              {highlight ? (
                <div className="flex flex-col">
                  {highlight}
                  {highlightCaption && (
                    <span className="text-xs text-muted">
                      {highlightCaption}
                    </span>
                  )}
                </div>
              ) : (
                <span />
              )}
              {selectable && onSelectedChange && (
                <Checkbox
                  checked={selected}
                  onChange={onSelectedChange}
                  label={selectLabel}
                  size="small"
                  className="pointer-events-auto shrink-0"
                />
              )}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <Heading as="h3" size="sm" className="line-clamp-2">
              {title}
            </Heading>
            {subtitle && (
              <Typography variant="caption" tone="muted">
                {subtitle}
              </Typography>
            )}
            {description && (
              <Typography variant="caption" tone="muted">
                {description}
              </Typography>
            )}
          </div>

          {meta && meta.length > 0 && (
            <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-3">
              {meta.map((item) => (
                <span key={item.label} className="inline-flex flex-col">
                  <span className="text-xs text-muted">{item.label}</span>
                  <span className="text-sm font-medium text-foreground">
                    {item.value}
                  </span>
                </span>
              ))}
            </div>
          )}

          {noteEntries.length > 0 && (
            <div className="flex flex-wrap gap-4 text-xs text-muted">
              {noteEntries.map(({ id: noteId, note }) => (
                <span key={noteId}>{note}</span>
              ))}
            </div>
          )}

          {footer && <div>{footer}</div>}
        </div>
      </div>
    </Card>
  );
};
