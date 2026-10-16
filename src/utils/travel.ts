/** 予定カテゴリ。 @default undefined */
export type TravelCategory =
  | "move"
  | "meal"
  | "sight"
  | "activity"
  | "shopping"
  | "stay"
  | "free";

/** 予定カテゴリのラベル。色だけに意味を持たせず、必ずラベルを添えるために使う。 */
export const TRAVEL_CATEGORY_LABELS: Record<TravelCategory, string> = {
  move: "移動",
  meal: "食事",
  sight: "観光",
  activity: "体験",
  shopping: "買い物",
  stay: "宿泊",
  free: "自由",
};

/** ざっくりしおりの時間帯。 @default undefined */
export type TimelineSlot =
  | "morning"
  | "noon"
  | "afternoon"
  | "evening"
  | "night";

/** 時間帯の表示順。 */
export const TIMELINE_SLOTS: readonly TimelineSlot[] = [
  "morning",
  "noon",
  "afternoon",
  "evening",
  "night",
];

/** 時間帯の範囲（§11）。 */
export const TIMELINE_SLOT_LABELS: Record<TimelineSlot, string> = {
  morning: "朝（〜11時）",
  noon: "昼（11〜14時）",
  afternoon: "午後（14〜17時）",
  evening: "夕方（17〜20時）",
  night: "夜（20時〜）",
};

/** 差分の種別。 @default undefined */
export type DiffKind = "add" | "change" | "remove";

/**
 * 差分の表示メタ。
 * 色だけに頼らないよう、記号とラベルを必ず添える（§7.3）。
 */
export const DIFF_KIND_META: Record<
  DiffKind,
  { symbol: string; label: string }
> = {
  add: { symbol: "＋", label: "追加" },
  change: { symbol: "〜", label: "変更" },
  remove: { symbol: "−", label: "削除" },
};
