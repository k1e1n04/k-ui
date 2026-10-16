import type React from "react";
/** カルーセルの項目。 @default undefined */
export interface CarouselItem {
    /** 一意な識別子。 @default undefined */
    id: string;
    /** スライドの内容。 @default undefined */
    content: React.ReactNode;
    /** スクリーンリーダー向けのラベル。 @default undefined */
    label?: string;
}
/** カルーセルのプロパティ。 @default undefined */
export interface CarouselProps {
    /** 項目一覧。 @default undefined */
    items: CarouselItem[];
    /** グループのラベル。 @default "カルーセル" */
    ariaLabel?: string;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** 横スクロールのスライドを前後ボタンとドットで切り替える。 */
export declare const Carousel: React.FC<CarouselProps>;
//# sourceMappingURL=Carousel.d.ts.map