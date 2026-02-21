import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwindクラス名を結合・マージするユーティリティ
 * clsxで条件付きクラス名を組み立て、tailwind-mergeで競合を解決する
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
