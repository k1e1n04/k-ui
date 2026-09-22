import type React from "react";
import { type BadgeVariant } from "../../atoms/Badge";
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
export declare const MediaCard: React.FC<MediaCardProps>;
//# sourceMappingURL=MediaCard.d.ts.map