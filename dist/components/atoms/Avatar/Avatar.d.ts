/** アバターのサイズ。 @default undefined */
export type AvatarSize = "small" | "medium" | "large";
/** アバターのプロパティ。 @default undefined */
export interface AvatarProps {
    /** 画像URL。 @default undefined */
    src?: string;
    /** 名前。 @default "" */
    name?: string;
    /** 代替テキスト。 @default name */
    alt?: string;
    /** サイズ。 @default "medium" */
    size?: AvatarSize;
    /** 形状。 @default "circle" */
    shape?: "circle" | "square";
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** アバターを表示するコンポーネント。 @default undefined */
export declare function Avatar({ src, name, alt, size, shape, className, }: AvatarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Avatar.d.ts.map