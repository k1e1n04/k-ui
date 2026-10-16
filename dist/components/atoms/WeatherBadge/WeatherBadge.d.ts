import type React from "react";
/** 天気の種別。 @default undefined */
export type WeatherCondition = "sunny" | "cloudy" | "rainy" | "snowy" | "unknown";
/** 天気バッジのプロパティ。 @default undefined */
export interface WeatherBadgeProps {
    /** 天気。 @default undefined */
    condition: WeatherCondition;
    /** 気温（摂氏）。 @default undefined */
    temperature?: number;
    /** ラベルの上書き。 @default undefined */
    label?: string;
    /** 追加のクラス名。 @default undefined */
    className?: string;
}
/** 天気をアイコンとラベルで表示するバッジ。 */
export declare const WeatherBadge: React.FC<WeatherBadgeProps>;
//# sourceMappingURL=WeatherBadge.d.ts.map