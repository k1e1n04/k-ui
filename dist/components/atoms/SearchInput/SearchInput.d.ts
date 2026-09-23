import type React from "react";
export interface SearchInputProps extends Omit<React.ComponentPropsWithRef<"input">, "type" | "onChange" | "value" | "className"> {
    /** 現在の検索キーワード */
    value?: string;
    /** 変更ハンドラー（入力値のみを受け取る） */
    onChange?: (value: string) => void;
    /** クリアボタン押下時のハンドラー */
    onClear?: () => void;
    /** 追加のクラス名（ルートラッパーに適用） */
    className?: string;
    /** クリアボタンの aria-label */
    clearButtonAriaLabel?: string;
}
/**
 * 検索アイコン内包の検索入力コンポーネント
 */
export declare const SearchInput: React.FC<SearchInputProps>;
//# sourceMappingURL=SearchInput.d.ts.map