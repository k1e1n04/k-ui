# k-ui

個人プロジェクト用の共通UIコンポーネントライブラリ。

React 19 + Tailwind CSS 4 + Storybook 10 で構成。

## Storybook

[https://k1e1n04.github.io/k-ui/](https://k1e1n04.github.io/k-ui/)

`main` ブランチへの push 時に GitHub Actions で自動デプロイされる。

## セットアップ

```bash
pnpm install
```

## 開発

```bash
# ライブラリのビルド（watch モード）
pnpm dev

# Storybook の起動（http://localhost:6006）
pnpm storybook
```

## ビルド

```bash
# ライブラリのビルド
pnpm build

# Storybook のビルド
pnpm build-storybook
```

## Lint / 型チェック

```bash
pnpm lint
pnpm typecheck
```

## インストール

```bash
pnpm add k-ui
```

```ts
import { Button } from "k-ui";
import "k-ui/tokens.css";
```

```tsx
import { Card, Typography } from "k-ui";

<Card padding="md" shadow="sm" border>
  <Typography variant="body-md">Card content</Typography>
</Card>;
```

```tsx
import { Select } from "k-ui";

<Select
  label="Fruit"
  name="fruit"
  placeholder="Select a fruit"
  clearable
  options={[
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]}
  onChange={(value) => console.log(value)}
/>;
```

`Select` は `name / id / onBlur / onFocus / aria-*` など標準の `select` 属性を透過できる。

Tailwind CSS プリセットも提供している。

```ts
import kuiPreset from "k-ui/tailwind-preset";
```

## Typography 運用ガイド

テキスト表現は `text-*` クラスの直書きではなく `Typography` / `Heading` を優先する。

```tsx
import { Heading, Typography } from "k-ui";

<Heading as="h1" size="xl">
  ページ見出し
</Heading>;
<Heading as="h2" size="lg">
  セクション見出し
</Heading>;
<Typography variant="body-md">本文テキスト</Typography>;
<Typography variant="body-sm" tone="muted">
  補足テキスト
</Typography>;
```

### 基本ルール

- 原則: 文字色は `tone` で指定する
- 例外: ブランド装飾など限定ケースのみ `className` で上書きする
- 推奨: 見出しは `Heading`、本文と補足は `Typography` を使い分ける
