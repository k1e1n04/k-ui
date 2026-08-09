import { type RefObject } from "react";
/** フォーカストラップの設定。 @default undefined */
export interface UseFocusTrapOptions {
    /** 有効化時に優先してフォーカスする要素。 @default undefined */
    initialFocusRef?: RefObject<HTMLElement | null>;
    /** 無効化時に有効化前の要素へフォーカスを戻すか。 @default true */
    returnFocusOnDeactivate?: boolean;
}
/**
 * コンテナ内でキーボードフォーカスを循環させるフック
 *
 * @param containerRef フォーカスを閉じ込めるコンテナのref
 * @param active フォーカストラップを有効にするか
 * @param options 動作設定
 * @default {}
 */
export declare function useFocusTrap(containerRef: RefObject<HTMLElement | null>, active: boolean, options?: UseFocusTrapOptions): void;
//# sourceMappingURL=useFocusTrap.d.ts.map