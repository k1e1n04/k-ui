import type React from "react";
/** コピーボタンのプロパティ。 @default undefined */
export interface CopyButtonProps {
    /** コピーする文字列。 @default undefined */
    value: string;
    /** 通常時のラベル。 @default "コピー" */
    label?: string;
    /** コピー後のラベル。 @default "コピーしました" */
    copiedLabel?: string;
    /** コピー完了時の処理。 @default undefined */
    onCopied?: () => void;
    /** 追加のクラス名。 @default undefined */
    className?: string;
    /** ルート要素への ref。 @default undefined */
    ref?: React.Ref<HTMLButtonElement>;
}
/** クリップボードへ文字列をコピーするボタン。 */
export declare function CopyButton({ value, label, copiedLabel, onCopied, className, ref, }: CopyButtonProps): React.JSX.Element;
//# sourceMappingURL=CopyButton.d.ts.map