import { type Middleware, type OffsetOptions, type Placement, type ShiftOptions, type SizeOptions } from "@floating-ui/react-dom";
import { type CSSProperties, type RefCallback } from "react";
/** フローティング要素の設定。 @default undefined */
export interface UseFloatingElementOptions {
    /** 基準要素に対する配置。 @default "bottom-start" */
    placement?: Placement;
    /** 基準要素からの距離。 @default 8 */
    offset?: OffsetOptions;
    /** 画面外に出る場合に反対側へ反転するか。 @default true */
    flip?: boolean;
    /** 画面端からずらして収める設定。 @default { padding: 8 } */
    shift?: boolean | ShiftOptions | Middleware;
    /**
     * 利用可能領域に応じてフローティング要素のサイズを調整するか。
     * `true` を指定すると基準要素の幅に合わせる。 @default false
     */
    size?: boolean | SizeOptions;
    /** 要素位置の変化を自動追従するか。 @default true */
    autoUpdate?: boolean;
}
/** フローティング要素フックの戻り値。 @default undefined */
export interface UseFloatingElementReturn {
    /** 基準要素に設定する callback ref。 @default undefined */
    referenceRef: RefCallback<HTMLElement>;
    /** フローティング要素に設定する callback ref。 @default undefined */
    floatingRef: RefCallback<HTMLElement>;
    /** フローティング要素に設定する配置スタイル。 @default undefined */
    floatingStyles: CSSProperties;
    /** 要素位置を手動で再計算する関数。 @default undefined */
    update: () => void;
}
/**
 * Floating UI を用いて基準要素にフローティング要素を配置するフック
 *
 * @param options 配置と追従の設定
 * @returns 要素ref、配置スタイル、位置更新関数
 * @default {}
 */
export declare function useFloatingElement(options?: UseFloatingElementOptions): UseFloatingElementReturn;
//# sourceMappingURL=useFloatingElement.d.ts.map