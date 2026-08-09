import type React from "react";
export type EmptyStateSize = "sm" | "md" | "lg";
export type EmptyStateAlign = "left" | "center";
export type EmptyStateActionPlacement = "below" | "inline";
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 空状態を表すアイコン
     */
    icon?: React.ReactNode;
    /**
     * 空状態のタイトル
     */
    title: string;
    /**
     * 補足説明テキスト
     */
    description?: string;
    /**
     * アクション要素（ボタン等）
     */
    action?: React.ReactNode;
    /**
     * コンポーネント全体のサイズ
     */
    size?: EmptyStateSize;
    /**
     * コンテンツの水平方向の配置
     */
    align?: EmptyStateAlign;
    /**
     * action の配置
     */
    actionPlacement?: EmptyStateActionPlacement;
}
/**
 * EmptyState コンポーネント
 *
 * データが存在しない状態を統一した見た目で表示するテンプレート
 *
 * @example
 * <EmptyState title="No data" description="Please add items." />
 */
export declare const EmptyState: React.FC<EmptyStateProps>;
//# sourceMappingURL=EmptyState.d.ts.map