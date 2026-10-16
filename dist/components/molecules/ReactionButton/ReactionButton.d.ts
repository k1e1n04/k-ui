import type React from "react";
import type { AvatarProps } from "../../atoms/Avatar";
/** リアクションボタンのプロパティ。 @default undefined */
export interface ReactionButtonProps extends Omit<React.ComponentPropsWithRef<"button">, "onClick"> {
    /** リアクション名（「楽しみ!」など）。 @default undefined */
    label: string;
    /** 押した人の数。 @default 0 */
    count?: number;
    /** 自分が押しているか。 @default false */
    active?: boolean;
    /** 押した人のアバター。 @default undefined */
    avatars?: AvatarProps[];
    /** 押下状態が変わった時の処理。 @default undefined */
    onToggled?: (active: boolean) => void;
}
/** アバター付きのリアクションボタン。誰が押したかを見せる（§3.3）。 */
export declare const ReactionButton: React.FC<ReactionButtonProps>;
//# sourceMappingURL=ReactionButton.d.ts.map