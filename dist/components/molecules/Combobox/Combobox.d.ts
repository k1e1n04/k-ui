import type React from "react";
/**
 * コンボボックスの選択肢。
 *
 * @default undefined
 */
export interface ComboboxOption {
    /** 表示ラベル。 @default undefined */
    label: string;
    /** 選択時に返す値。 @default undefined */
    value: string;
    /** 選択肢を無効化するか。 @default false */
    disabled?: boolean;
}
/**
 * コンボボックスのプロパティ。
 *
 * @default undefined
 */
export interface ComboboxProps {
    /** 選択肢の一覧。 @default undefined */
    options: ComboboxOption[];
    /** 制御された選択値。 @default undefined */
    value?: string | string[];
    /** 選択値が変わったときのコールバック。 @default undefined */
    onChange: (value: string | string[]) => void;
    /** 検索語が変わったときのコールバック。 @default undefined */
    onQuery?: (query: string) => void;
    /** 複数選択を有効にするか。 @default false */
    multiple?: boolean;
    /**
     * 候補に一致しない自由入力を許可するか（単一選択のみ）。
     * 入力した文字列がそのまま値として onChange に渡る。 @default false
     */
    freeSolo?: boolean;
    /** 入力欄のラベルテキスト。 @default undefined */
    label?: string;
    /** 値が未選択のときに表示する文言。 @default "選択してください" */
    placeholder?: string;
    /** コンボボックス全体を無効化するか。 @default false */
    disabled?: boolean;
    /** ルート要素に追加するクラス名。 @default undefined */
    className?: string;
}
/**
 * 入力による候補絞り込みと単一・複数選択に対応するコンボボックス。
 *
 * @default undefined
 */
export declare const Combobox: React.FC<ComboboxProps>;
//# sourceMappingURL=Combobox.d.ts.map