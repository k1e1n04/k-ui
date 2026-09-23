import type React from "react";
/**
 * Badgeコンポーネントのバリアント
 */
export type BadgeVariant = "info" | "success" | "warning" | "danger" | "neutral";
export interface BadgeProps extends React.ComponentPropsWithRef<"span"> {
    /**
     * バッジの種別
     * @default 'info'
     */
    variant?: BadgeVariant;
    /**
     * 表示内容
     */
    children: React.ReactNode;
}
/**
 * Badge コンポーネント
 *
 * 小さなステータスラベルを表示するためのコンポーネント
 *
 * @example
 * <Badge variant="info">Planned</Badge>
 *
 * @example
 * <Badge variant="neutral">Archived</Badge>
 */
export declare const Badge: React.FC<BadgeProps>;
//# sourceMappingURL=Badge.d.ts.map