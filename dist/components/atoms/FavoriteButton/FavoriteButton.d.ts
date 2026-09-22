import type React from "react";
/** お気に入りボタンのサイズ */
export type FavoriteButtonSize = "sm" | "md" | "lg";
export interface FavoriteButtonProps {
    /** お気に入り状態 */
    favorite: boolean;
    /** 状態変更時の処理 */
    onChange: (favorite: boolean) => void;
    /** アクセシブルなラベル（対象名） */
    label?: string;
    /** サイズ。 @default "md" */
    size?: FavoriteButtonSize;
    /** 無効状態 */
    disabled?: boolean;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * FavoriteButton コンポーネント
 *
 * 物件のお気に入り登録をトグルするハートボタン。
 *
 * @example
 * <FavoriteButton favorite={favorite} onChange={setFavorite} label="この物件" />
 */
export declare const FavoriteButton: React.FC<FavoriteButtonProps>;
//# sourceMappingURL=FavoriteButton.d.ts.map