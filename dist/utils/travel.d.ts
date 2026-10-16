/** 予定カテゴリ。 @default undefined */
export type TravelCategory = "move" | "meal" | "sight" | "activity" | "shopping" | "stay" | "free";
/** 予定カテゴリのラベル。色だけに意味を持たせず、必ずラベルを添えるために使う。 */
export declare const TRAVEL_CATEGORY_LABELS: Record<TravelCategory, string>;
/** ざっくりしおりの時間帯。 @default undefined */
export type TimelineSlot = "morning" | "noon" | "afternoon" | "evening" | "night";
/** 時間帯の表示順。 */
export declare const TIMELINE_SLOTS: readonly TimelineSlot[];
/** 時間帯の範囲（§11）。 */
export declare const TIMELINE_SLOT_LABELS: Record<TimelineSlot, string>;
/** 差分の種別。 @default undefined */
export type DiffKind = "add" | "change" | "remove";
/**
 * 差分の表示メタ。
 * 色だけに頼らないよう、記号とラベルを必ず添える（§7.3）。
 */
export declare const DIFF_KIND_META: Record<DiffKind, {
    symbol: string;
    label: string;
}>;
//# sourceMappingURL=travel.d.ts.map