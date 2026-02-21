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

Tailwind CSS プリセットも提供している。

```ts
import kuiPreset from "k-ui/tailwind-preset";
```
