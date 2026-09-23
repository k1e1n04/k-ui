import type React from "react";
/**
 * 複数の ref を1つの callback ref に合成する。
 *
 * 内部で保持する ref と、利用者から渡された ref の両方へ
 * 同じ要素を設定したい場合に使う。
 */
export declare function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T>;
//# sourceMappingURL=mergeRefs.d.ts.map