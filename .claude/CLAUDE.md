# k1e1n04-ui

## 概要

個人プロジェクト向けUIコンポーネントライブラリ。
React 19 + Tailwind CSS v4。AIが一貫したUIを実装するためのデザインシステム。

## 規約

- コメントは日本語で記載すること
- Props の JSDoc も日本語
- コンポーネントは `"use client"` ディレクティブを付与すること
- Next.js に依存しないこと（`next/link`, `next/navigation` 等を使わない）
- アイコンライブラリに依存しないこと（アイコンは props で受け取るか、インライン SVG を使う）
- テキストをハードコードしないこと（props で受け取り、デフォルト値は英語にする）

## ディレクトリ構成

```
src/
├── tokens/            # デザイントークン（CSS変数）
│   ├── colors.css
│   ├── spacing.css
│   ├── typography.css
│   ├── shadows.css
│   ├── animations.css
│   └── index.css      # バレルインポート
├── components/
│   ├── atoms/          # 最小単位のコンポーネント
│   │   ├── Button/
│   │   ├── Spinner/
│   │   ├── DrawerHeader/
│   │   └── index.ts
│   ├── molecules/      # 複合コンポーネント
│   │   ├── AppBar/
│   │   ├── Dialog/
│   │   ├── ConfirmDialog/
│   │   ├── ListItem/
│   │   ├── ListLayout/
│   │   ├── MonthSelector/
│   │   ├── NavigationDrawer/
│   │   ├── StatCards/
│   │   ├── Tooltip/
│   │   └── index.ts
│   ├── templates/      # ページレイアウト
│   │   ├── AppLayout/
│   │   └── index.ts
│   └── index.ts
├── hooks/              # カスタムフック
├── utils/
│   └── cn.ts           # clsx + tailwind-merge ユーティリティ
└── index.ts            # メインエントリポイント
```

## コンポーネント追加手順

1. `src/components/{layer}/{ComponentName}/` ディレクトリを作成
2. `ComponentName.tsx` を作成
   - 先頭に `"use client";` を記述
   - Props interface を export する
   - JSDoc コメントを日本語で記載
3. `ComponentName.stories.tsx` を作成
   - `tags: ["autodocs"]` を含める
   - 全バリアント・サイズのストーリーを定義
4. `index.ts` を作成してバレルエクスポート
5. 親の `index.ts` にエクスポートを追加
6. `src/components/index.ts` にエクスポートを追加

## スタイリングパターン

### クラス名結合

```tsx
import { cn } from "../../utils/cn";

<div className={cn("base-class", isActive && "active-class", className)} />
```

### バリアント/サイズのオブジェクトマップ

```tsx
const variantStyles: Record<Variant, string> = {
  primary: "bg-primary-main hover:bg-primary-light text-white",
  secondary: "bg-secondary-light hover:bg-gray-200 text-primary-main",
};

const sizeStyles: Record<Size, string> = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-4 py-2",
  large: "text-base px-6 py-3",
};
```

### ダークモード

Tailwind の `dark:` プレフィックスを使用:

```tsx
"bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
```

### Next.js 依存の回避パターン

リンクレンダリングは `renderLink` render-prop で注入:

```tsx
interface Props {
  renderLink?: (props: { href: string; children: React.ReactNode; onClick?: () => void }) => React.ReactNode;
}

// デフォルトは素の <a> タグ
const defaultRenderLink = ({ href, children, onClick }) => (
  <a href={href} onClick={onClick}>{children}</a>
);
```

## デザイントークン

### 命名規則

CSS 変数は `--kui-` プレフィックスを使用:

- カラー: `--kui-color-{name}`
- スペーシング: `--kui-space-{scale}`
- フォント: `--kui-font-size-{scale}`, `--kui-font-weight-{name}`
- シャドウ: `--kui-shadow-{scale}`
- ボーダー半径: `--kui-radius-{scale}`

### トークン追加方法

1. `src/tokens/` 内の対応 CSS ファイルに変数を追加
2. ダークモード対応が必要な場合は `@media (prefers-color-scheme: dark)` ブロックにも追加

## ビルド・開発

```bash
pnpm build          # tsup でビルド
pnpm dev            # watch モードでビルド
pnpm storybook      # Storybook 開発サーバー起動
pnpm typecheck      # 型チェック
```

## 消費側での使用方法

```bash
# インストール
pnpm add k1e1n04-ui@github:k1e1n04/k1e1n04-ui
```

```css
/* globals.css */
@import "k1e1n04-ui/tokens.css";
```

```tsx
import { Button, Dialog } from "k1e1n04-ui";
```
