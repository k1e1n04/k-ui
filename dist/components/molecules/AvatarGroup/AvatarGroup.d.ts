import type { AvatarProps } from "../../atoms/Avatar";
/** アバターグループのプロパティ。 @default undefined */
export interface AvatarGroupProps {
    /** アバター記述子。 @default undefined */
    avatars: AvatarProps[];
    /** 最大表示数。 @default undefined */
    max?: number;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** 複数のアバターを重ねて表示するコンポーネント。 @default undefined */
export declare function AvatarGroup({ avatars, max, className }: AvatarGroupProps): import("react").JSX.Element;
//# sourceMappingURL=AvatarGroup.d.ts.map