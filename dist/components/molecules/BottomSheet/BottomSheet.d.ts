import type React from "react";
export interface BottomSheetProps {
    /** 開閉状態 */
    open: boolean;
    /** 閉じる時の処理 */
    onClose?: () => void;
    /** 表示内容 */
    children: React.ReactNode;
    /** 見出し */
    title?: React.ReactNode;
    /**
     * スナップ位置（ビューポート高さに対する割合、昇順）
     * @default [0.35, 0.9]
     */
    snapPoints?: number[];
    /** 初期スナップ位置のインデックス。 @default 0 */
    defaultSnapIndex?: number;
    /** スナップ位置変更時 */
    onSnapChange?: (index: number, fraction: number) => void;
    /** 背景オーバーレイを表示するか。 @default false */
    showBackdrop?: boolean;
    /** 背景クリックで閉じるか。 @default true */
    closeOnBackdrop?: boolean;
    /** ハンドルのアクセシブルなラベル。 @default "シートの高さを変更" */
    handleLabel?: string;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * BottomSheet コンポーネント
 *
 * 地図検索などで使うドラッグ可能なボトムシート。
 * ハンドルを上下にドラッグ、または矢印キーで高さを変更できる。
 *
 * @example
 * <BottomSheet open={open} onClose={close} snapPoints={[0.35, 0.9]}>
 *   物件一覧
 * </BottomSheet>
 */
export declare const BottomSheet: React.FC<BottomSheetProps>;
//# sourceMappingURL=BottomSheet.d.ts.map