/** URLのスキーム（プロトコル）を検出する */
const PROTOCOL_PATTERN = /^([a-zA-Z][a-zA-Z0-9+.-]*):/;

/** 制御文字（0x00-0x1f, 0x7f）を含むか判定する */
function hasControlChars(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code <= 0x1f || code === 0x7f) return true;
  }
  return false;
}

/**
 * リンク先として安全な href のみを許可する。
 *
 * 相対パス、または `http:` / `https:` スキームのみを通し、
 * `javascript:` や `data:` などの危険なスキーム、プロトコル相対URL
 * （`//example.com`）、制御文字を含む値は弾いて `undefined` を返す。
 *
 * `undefined` が返った場合はリンクとして描画せず、テキスト等で
 * フォールバックすること。
 */
export function sanitizeHref(href: string | undefined): string | undefined {
  if (href === undefined) return undefined;
  const value = href.trim();
  if (value === "") return undefined;
  // 制御文字・空白・バックスラッシュ（ブラウザが"/"として解釈する）を弾く
  if (hasControlChars(value) || /\s/.test(value) || /\\/.test(value)) {
    return undefined;
  }
  // プロトコル相対URLは相対パスとして扱わない
  if (value.startsWith("//")) return undefined;
  const protocolMatch = value.match(PROTOCOL_PATTERN);
  if (protocolMatch) {
    const protocol = protocolMatch[1].toLowerCase();
    return protocol === "http" || protocol === "https" ? value : undefined;
  }
  return value;
}
