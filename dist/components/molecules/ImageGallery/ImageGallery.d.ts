import type React from "react";
/** ギャラリーの画像 */
export interface ImageGalleryImage {
    /** 画像URL */
    src: string;
    /** 代替テキスト */
    alt?: string;
}
export interface ImageGalleryProps {
    /** 画像一覧 */
    images: ImageGalleryImage[];
    /** 現在のインデックス（制御用） */
    index?: number;
    /** 初期インデックス（非制御用） @default 0 */
    defaultIndex?: number;
    /** インデックス変更時 */
    onIndexChange?: (index: number) => void;
    /** 画像クリック時 */
    onImageClick?: (index: number) => void;
    /** アスペクト比。 @default "4 / 3" */
    aspectRatio?: string;
    /** サムネイルを表示するか。 @default true */
    showThumbnails?: boolean;
    /** 枚数カウンターを表示するか。 @default true */
    showCounter?: boolean;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * ImageGallery コンポーネント
 *
 * 物件写真をスワイプ・ドラッグで切り替えられるギャラリー。
 *
 * @example
 * <ImageGallery
 *   images={[
 *     { src: "/room1.jpg", alt: "リビング" },
 *     { src: "/room2.jpg", alt: "キッチン" },
 *   ]}
 * />
 */
export declare const ImageGallery: React.FC<ImageGalleryProps>;
//# sourceMappingURL=ImageGallery.d.ts.map