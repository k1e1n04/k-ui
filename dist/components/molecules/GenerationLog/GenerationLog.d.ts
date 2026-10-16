import type React from "react";
/** 生成ログの状態。 @default undefined */
export type GenerationLogStatus = "pending" | "done" | "error";
/** 生成ログの行。 @default undefined */
export interface GenerationLogItem {
    /** 一意な識別子。 @default undefined */
    id: string;
    /** 表示メッセージ。 @default undefined */
    message: React.ReactNode;
    /** 進行状況。 @default "pending" */
    status?: GenerationLogStatus;
}
/** 生成ログのプロパティ。 @default undefined */
export interface GenerationLogProps {
    /** 行一覧。 @default undefined */
    items: GenerationLogItem[];
    /** ラベル。 @default "生成の進捗" */
    ariaLabel?: string;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/**
 * 生成中のツールログ。レイアウトがガタつかないよう高さを先に確保する（§7.1）。
 * スクリーンリーダーには polite で読み上げる（§7.3）。
 */
export declare const GenerationLog: React.FC<GenerationLogProps>;
//# sourceMappingURL=GenerationLog.d.ts.map