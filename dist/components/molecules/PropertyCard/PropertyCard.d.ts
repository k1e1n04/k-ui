import type React from "react";
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
export declare const PropertyCard: React.FC<PropertyCardProps>;
//# sourceMappingURL=PropertyCard.d.ts.map