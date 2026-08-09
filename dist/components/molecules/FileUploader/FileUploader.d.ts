import type React from "react";
/** ドラッグ&ドロップとファイル入力に対応するファイルアップローダーのプロパティ。 @default undefined */
export interface FileUploaderProps {
    /** 受け入れるファイル形式。 @default undefined */
    accept?: string;
    /** 複数ファイルを選択できるか。 @default false */
    multiple?: boolean;
    /** 1 ファイルあたりの最大バイト数。 @default undefined */
    maxSizeBytes?: number;
    /** 有効なファイルを選択した時の処理。 @default undefined */
    onFilesSelected: (files: File[]) => void;
    /** 無効状態。 @default false */
    disabled?: boolean;
    /** 操作ラベル。 @default "ファイルを選択" */
    label?: string;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** 選択・ドロップしたファイルを検証して通知するアップローダー。 @default undefined */
export declare const FileUploader: React.FC<FileUploaderProps>;
//# sourceMappingURL=FileUploader.d.ts.map