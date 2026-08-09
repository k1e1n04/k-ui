import type React from "react";
import type { ReactNode } from "react";
export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** リストアイテムの内容 */
    children: ReactNode;
    /** ホバーエフェクトを有効にするか */
    hoverable?: boolean;
    /** 下部ボーダーを表示するか */
    bordered?: boolean;
}
/**
 * リストアイテムコンポーネント
 */
export declare const ListItem: React.FC<ListItemProps>;
//# sourceMappingURL=ListItem.d.ts.map