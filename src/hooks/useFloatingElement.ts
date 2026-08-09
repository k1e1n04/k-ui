"use client";

import {
  autoUpdate,
  flip,
  type Middleware,
  type OffsetOptions,
  offset,
  type Placement,
  type ShiftOptions,
  shift,
  useFloating,
} from "@floating-ui/react-dom";
import { type CSSProperties, type RefCallback, useMemo } from "react";

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

const isMiddleware = (
  value: boolean | ShiftOptions | Middleware | undefined,
): value is Middleware =>
  typeof value === "object" && value !== null && "fn" in value;

/**
 * Floating UI を用いて基準要素にフローティング要素を配置するフック
 *
 * @param options 配置と追従の設定
 * @returns 要素ref、配置スタイル、位置更新関数
 * @default {}
 */
export function useFloatingElement(
  options: UseFloatingElementOptions = {},
): UseFloatingElementReturn {
  const {
    placement = "bottom-start",
    offset: offsetValue = 8,
    flip: enableFlip = true,
    shift: shiftOption,
    autoUpdate: enableAutoUpdate = true,
  } = options;
  const middleware = useMemo(() => {
    const shiftMiddleware =
      shiftOption === false
        ? []
        : isMiddleware(shiftOption)
          ? [shiftOption]
          : [
              shift(
                shiftOption === true || shiftOption === undefined
                  ? { padding: 8 }
                  : shiftOption,
              ),
            ];

    return [
      offset(offsetValue),
      ...(enableFlip ? [flip()] : []),
      ...shiftMiddleware,
    ];
  }, [enableFlip, offsetValue, shiftOption]);
  const { floatingStyles, refs, update } = useFloating({
    middleware,
    placement,
    whileElementsMounted: enableAutoUpdate ? autoUpdate : undefined,
  });

  return {
    floatingRef: refs.setFloating,
    floatingStyles,
    referenceRef: refs.setReference,
    update,
  };
}
