"use client";

import type React from "react";

import { cn } from "../../../utils/cn";
import { Badge } from "../../atoms/Badge";
import { Card } from "../../atoms/Card";
import { Checkbox } from "../../atoms/Checkbox";
import { FavoriteButton } from "../../atoms/FavoriteButton";
import { Heading } from "../../atoms/Heading";
import { formatYen, Price } from "../../atoms/Price";
import { Typography } from "../../atoms/Typography";

/** 賃貸物件のデータ */
export interface Property {
  /** 物件ID */
  id: string;
  /** 物件名 */
  title: string;
  /** 賃料（円/月） */
  rent: number;
  /** 管理費（円/月） */
  managementFee?: number;
  /** 敷金（円） */
  deposit?: number;
  /** 礼金（円） */
  keyMoney?: number;
  /** 住所 */
  address: string;
  /** 沿線・駅・徒歩分数 */
  access?: string;
  /** 間取り（例: 1LDK） */
  layout?: string;
  /** 専有面積（㎡） */
  area?: number;
  /** 築年数 */
  buildingAge?: number;
  /** 階数（例: 3階 / 5階建） */
  floor?: string;
  /** メイン画像URL */
  imageUrl?: string;
  /** タグ（新着・おすすめなど） */
  tags?: string[];
  /** 入居可能か */
  available?: boolean;
}

export interface PropertyCardProps extends Property {
  /** お気に入り状態 */
  favorite?: boolean;
  /** お気に入り変更時 */
  onFavoriteChange?: (favorite: boolean) => void;
  /** 選択状態 */
  selected?: boolean;
  /** カードクリック時（指定時はカード全体がリンク相当になる） */
  onClick?: () => void;
  /** 比較対象に含めるか */
  compared?: boolean;
  /** 比較対象の変更時（指定時のみ比較チェックを表示） */
  onCompareChange?: (compared: boolean) => void;
  /** 追加のクラス名 */
  className?: string;
}

interface SpecProps {
  label: string;
  value: string;
}

const Spec: React.FC<SpecProps> = ({ label, value }) => (
  <span className="inline-flex flex-col">
    <span className="text-xs text-muted">{label}</span>
    <span className="text-sm font-medium text-foreground">{value}</span>
  </span>
);

const ImagePlaceholder: React.FC = () => (
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
        d="M3 10.5 12 3l9 7.5M5.25 9.75V20a1 1 0 0 0 1 1h11.5a1 1 0 0 0 1-1V9.75M9.75 21v-5.25h4.5V21"
      />
    </svg>
  </div>
);

/**
 * PropertyCard コンポーネント
 *
 * 賃貸物件のサムネイル・賃料・間取り・住所などを一覧表示するカード。
 *
 * @example
 * <PropertyCard
 *   id="p-1"
 *   title="グランドメゾン渋谷"
 *   rent={128000}
 *   managementFee={8000}
 *   address="東京都渋谷区..."
 *   layout="1LDK"
 *   area={40.2}
 *   buildingAge={5}
 *   favorite={favorite}
 *   onFavoriteChange={setFavorite}
 * />
 */
export const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  rent,
  managementFee,
  deposit,
  keyMoney,
  address,
  access,
  layout,
  area,
  buildingAge,
  floor,
  imageUrl,
  tags,
  available = true,
  favorite = false,
  onFavoriteChange,
  selected = false,
  onClick,
  compared = false,
  onCompareChange,
  className,
}) => {
  const interactive = Boolean(onClick);
  const ageLabel =
    buildingAge === undefined
      ? undefined
      : buildingAge <= 0
        ? "新築"
        : `築${buildingAge}年`;

  return (
    <Card
      padding="none"
      border
      shadow="sm"
      data-testid={`property-card-${id}`}
      className={cn(
        "group relative overflow-hidden",
        selected && "ring-2 ring-primary-main",
        interactive && "transition-shadow hover:shadow-md",
        className,
      )}
    >
      {interactive && (
        <button
          type="button"
          aria-label={`${title}の詳細を開く`}
          onClick={onClick}
          className="absolute inset-0 z-0 cursor-pointer"
        />
      )}
      <div className="pointer-events-none relative z-[1]">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-sunken">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <ImagePlaceholder />
          )}
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge key={tag} variant="info">
                {tag}
              </Badge>
            ))}
            {!available && <Badge variant="neutral">募集終了</Badge>}
          </div>
          {onFavoriteChange && (
            <FavoriteButton
              favorite={favorite}
              onChange={onFavoriteChange}
              label={`${title}をお気に入りに追加`}
              className="pointer-events-auto absolute right-2 top-2"
            />
          )}
        </div>

        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-end justify-between gap-2">
            <Price
              value={rent}
              size="lg"
              tone="primary"
              unit="/月"
              caption={
                managementFee !== undefined
                  ? `管理費 ${formatYen(managementFee)}`
                  : undefined
              }
            />
            {onCompareChange && (
              <Checkbox
                checked={compared}
                onChange={onCompareChange}
                label="比較"
                size="small"
                className="pointer-events-auto shrink-0"
              />
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Heading as="h3" size="sm" className="line-clamp-2">
              {title}
            </Heading>
            <Typography variant="caption" tone="muted">
              {address}
            </Typography>
            {access && (
              <Typography variant="caption" tone="muted">
                {access}
              </Typography>
            )}
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-3">
            {layout && <Spec label="間取り" value={layout} />}
            {area !== undefined && (
              <Spec label="専有面積" value={`${area}㎡`} />
            )}
            {ageLabel && <Spec label="築年数" value={ageLabel} />}
            {floor && <Spec label="階数" value={floor} />}
          </div>

          {(deposit !== undefined || keyMoney !== undefined) && (
            <div className="flex gap-4 text-xs text-muted">
              {deposit !== undefined && <span>敷金 {formatYen(deposit)}</span>}
              {keyMoney !== undefined && (
                <span>礼金 {formatYen(keyMoney)}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
