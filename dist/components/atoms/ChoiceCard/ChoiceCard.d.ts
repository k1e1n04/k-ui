import type React from "react";
/** 選択カードのプロパティ。 @default undefined */
export interface ChoiceCardProps {
    /** 選択肢の値。 @default undefined */
    value: string;
    /** 見出し。 @default undefined */
    title: React.ReactNode;
    /** 補足説明。 @default undefined */
    description?: React.ReactNode;
    /** アイコン。 @default undefined */
    icon?: React.ReactNode;
    /** 選択状態。 @default false */
    selected?: boolean;
    /** 無効状態。 @default false */
    disabled?: boolean;
    /** 選択時の処理。 @default undefined */
    onSelect?: (value: string) => void;
    /** 追加のクラス名。 @default undefined */
    className?: string;
    /** ルート要素への ref。 @default undefined */
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * AI プランナーの選択肢などに使う大きいタップカード（§7.1）。
 * タップ領域は 44px 以上を確保する。
 */
export declare const ChoiceCard: React.FC<ChoiceCardProps>;
//# sourceMappingURL=ChoiceCard.d.ts.map