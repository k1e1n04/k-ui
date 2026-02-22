import React, { ReactNode, RefObject } from 'react';
import { ClassValue } from 'clsx';

/** ボタンのバリアント */
type ButtonVariant = "primary" | "secondary" | "success" | "outline" | "ghost" | "danger";
/** ボタンのサイズ */
type ButtonSize = "small" | "medium" | "large";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** ボタンの種類 */
    variant?: ButtonVariant;
    /** ボタンのサイズ */
    size?: ButtonSize;
    /** フルサイズ（幅いっぱい）表示 */
    fullWidth?: boolean;
    /** アイコンのみのボタン */
    iconOnly?: boolean;
}
/**
 * 汎用ボタンコンポーネント
 */
declare const Button: React.FC<ButtonProps>;

/** チェックボックスのサイズ */
type CheckboxSize = "small" | "medium" | "large";
interface CheckboxProps {
    /** 現在のチェック状態 */
    checked: boolean;
    /** 変更ハンドラー */
    onChange: (checked: boolean) => void;
    /** 無効状態 */
    disabled?: boolean;
    /** 表示ラベル */
    label?: string;
    /** サイズ */
    size?: CheckboxSize;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * チェックボックスコンポーネント
 *
 * ON/OFFの選択に使用するチェックボックスUI
 */
declare const Checkbox: React.FC<CheckboxProps>;

interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 追加のクラス名 */
    className?: string;
}
/**
 * ドロワーのヘッダー部分のコンポーネント
 */
declare const DrawerHeader: React.FC<DrawerHeaderProps>;

/** インプットのタイプ */
type InputType = "text" | "number" | "date" | "time" | "url" | "month";
/** インプットのサイズ */
type InputSize = "small" | "medium" | "large";
interface InputProps {
    /** インプットのタイプ */
    type?: InputType;
    /** ラベルテキスト */
    label?: string;
    /** 必須フラグ（ラベルに * を付与する） */
    required?: boolean;
    /** プレースホルダー */
    placeholder?: string;
    /** エラーメッセージ（指定されるとエラー状態を表示する） */
    error?: string;
    /** 現在の値 */
    value?: string;
    /** 変更ハンドラー */
    onChange?: (value: string) => void;
    /** 無効状態 */
    disabled?: boolean;
    /** サイズ */
    size?: InputSize;
    /** 追加のクラス名（ルートラッパーに適用） */
    className?: string;
}
/**
 * インプットコンポーネント
 *
 * ラベル・バリデーションエラーをセットで管理するテキスト入力UI
 */
declare const Input: React.FC<InputProps>;

/** スピナーのサイズ */
type SpinnerSize = "small" | "medium" | "large";
interface SpinnerProps {
    /** スピナーのサイズ */
    size?: SpinnerSize;
    /** スピナー下部に表示するラベル */
    label?: string;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * ローディングスピナーコンポーネント
 */
declare const Spinner: React.FC<SpinnerProps>;

/** テキストエリアのサイズ */
type TextareaSize = "small" | "medium" | "large";
interface TextareaProps {
    /** ラベルテキスト */
    label?: string;
    /** 必須フラグ（ラベルに * を付与する） */
    required?: boolean;
    /** プレースホルダー */
    placeholder?: string;
    /** エラーメッセージ（指定されるとエラー状態を表示する） */
    error?: string;
    /** 現在の値 */
    value?: string;
    /** 変更ハンドラー */
    onChange?: (value: string) => void;
    /** 無効状態 */
    disabled?: boolean;
    /** サイズ */
    size?: TextareaSize;
    /** 行数 */
    rows?: number;
    /** 追加のクラス名（ルートラッパーに適用） */
    className?: string;
}
/**
 * テキストエリアコンポーネント
 *
 * ラベル・バリデーションエラーをセットで管理する複数行テキスト入力UI
 */
declare const Textarea: React.FC<TextareaProps>;

/** トグルスイッチのサイズ */
type ToggleSwitchSize = "small" | "medium" | "large";
interface ToggleSwitchProps {
    /** 現在の状態 */
    checked: boolean;
    /** 変更ハンドラー */
    onChange: (checked: boolean) => void;
    /** 無効状態 */
    disabled?: boolean;
    /** 表示ラベル */
    label?: string;
    /** サイズ */
    size?: ToggleSwitchSize;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * トグルスイッチコンポーネント
 *
 * ON/OFFの切り替えに使用するスイッチUI
 */
declare const ToggleSwitch: React.FC<ToggleSwitchProps>;

/** AppBarのポジション */
type AppBarPosition = "fixed" | "static" | "absolute" | "relative" | "sticky";
/** AppBarのカラー */
type AppBarColor = "primary" | "secondary" | "success" | "transparent";
interface AppBarProps extends React.HTMLAttributes<HTMLElement> {
    /** ポジション */
    position?: AppBarPosition;
    /** カラーバリアント */
    color?: AppBarColor;
}
/**
 * アプリケーションバーコンポーネント
 */
declare const AppBar: React.FC<AppBarProps>;

/** 確認ダイアログのバリアント */
type ConfirmDialogVariant = "danger" | "warning" | "info";
interface ConfirmDialogProps {
    /** ダイアログの開閉状態 */
    open: boolean;
    /** ダイアログを閉じる関数 */
    onClose: () => void;
    /** 確認関数 */
    onConfirm: () => void;
    /** ダイアログのタイトル */
    title: string;
    /** 確認メッセージ */
    message: ReactNode;
    /** 補助メッセージ */
    description?: string;
    /** バリアント */
    variant?: ConfirmDialogVariant;
    /** 処理中かどうか */
    isProcessing?: boolean;
    /** キャンセルボタンのラベル */
    cancelLabel?: string;
    /** 確認ボタンのラベル */
    confirmLabel?: string;
    /** 処理中のラベル */
    processingLabel?: string;
    /** アイコン（カスタム） */
    icon?: ReactNode;
}
/**
 * 汎用確認ダイアログコンポーネント
 */
declare const ConfirmDialog: React.FC<ConfirmDialogProps>;

/** ダイアログの最大幅 */
type DialogMaxWidth = "sm" | "md" | "lg" | "xl" | "2xl";
interface DialogProps {
    /** ダイアログの開閉状態 */
    open: boolean;
    /** ダイアログを閉じる関数 */
    onClose: () => void;
    /** ダイアログのタイトル */
    title?: string;
    /** ダイアログのコンテンツ */
    children: ReactNode;
    /** ダイアログの最大幅 */
    maxWidth?: DialogMaxWidth;
    /** 閉じるボタンを非表示にするかどうか */
    hideCloseButton?: boolean;
    /** 外クリックで閉じることを無効にするかどうか */
    disableOutsideClick?: boolean;
    /** 閉じるボタンのaria-label */
    closeButtonLabel?: string;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * 共通ダイアログコンポーネント
 *
 * - 背景をぼかして元のコンテンツが見える
 * - 外クリックでダイアログを閉じる
 * - ESCキーでダイアログを閉じる
 * - ダークモード対応
 */
declare const Dialog: React.FC<DialogProps>;

interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** リストアイテムの内容 */
    children: ReactNode;
    /** ホバーエフェクトを有効にするか */
    hoverable?: boolean;
    /** 下部ボーダーを表示するか */
    bordered?: boolean;
}
/**
 * リストアイテムコンポーネント
 */
declare const ListItem: React.FC<ListItemProps>;

interface ListLayoutProps {
    /** リストのタイトル */
    title: string;
    /** エラーメッセージ */
    errorMessage?: string | null;
    /** エラーメッセージクリア関数 */
    onClearError?: () => void;
    /** 検索キーワード */
    searchKeyword: string;
    /** 検索キーワード更新関数 */
    onSearchChange: (value: string) => void;
    /** 検索フォーム表示状態 */
    showSearchForm: boolean;
    /** 検索フォーム表示状態更新関数 */
    onToggleSearch: (show: boolean) => void;
    /** フィルターオプション表示状態 */
    showFilterOptions: boolean;
    /** フィルターオプション表示状態更新関数 */
    onToggleFilter: (show: boolean) => void;
    /** 未完了のみ表示フラグ */
    showOnlyIncomplete?: boolean;
    /** 未完了のみ表示フラグ更新関数 */
    onToggleIncomplete?: (show: boolean) => void;
    /** 未完了フィルターのラベル */
    incompleteFilterLabel: string;
    /** 追加フォーム表示状態 */
    showAddForm?: boolean;
    /** 追加フォーム表示状態更新関数 */
    onToggleAddForm?: (show: boolean) => void;
    /** 追加ボタンクリック関数（ダイアログ表示用） */
    onAddClick?: () => void;
    /** 追加フォームコンポーネント */
    addFormComponent?: ReactNode;
    /** 統計表示コンポーネント */
    statsComponent?: ReactNode;
    /** リストアイテム */
    children: ReactNode;
    /** ローディング状態 */
    isLoading?: boolean;
    /** エラー状態 */
    isError?: boolean;
    /** エラー時のリロード関数 */
    onReload?: () => void;
    /** 空状態のメッセージ */
    emptyMessage?: string;
    /** 検索結果なしのメッセージ */
    noSearchResultsMessage?: string;
    /** 未完了フィルター機能を有効にするか */
    enableIncompleteFilter?: boolean;
    /** カスタムアクションボタン */
    customActions?: ReactNode;
    /** 追加のクラス名 */
    className?: string;
    /** アイコン: 検索 */
    searchIcon?: ReactNode;
    /** アイコン: フィルター */
    filterIcon?: ReactNode;
    /** アイコン: 追加 */
    addIcon?: ReactNode;
    /** アイコン: 閉じる */
    closeIcon?: ReactNode;
    /** ラベル: 検索プレースホルダー */
    searchPlaceholder?: string;
    /** ラベル: 検索を閉じる */
    closeSearchLabel?: string;
    /** ラベル: フィルター設定タイトル */
    filterTitle?: string;
    /** ラベル: エラー時のメッセージ */
    errorFetchMessage?: string;
    /** ラベル: リロードボタン */
    reloadLabel?: string;
    /** ラベル: 未完了なしメッセージ */
    noIncompleteMessage?: string;
    /** ラベル: 検索ボタンaria-label */
    searchButtonLabel?: string;
    /** ラベル: フィルターボタンaria-label */
    filterButtonLabel?: string;
    /** ラベル: 追加ボタンaria-label */
    addButtonLabel?: string;
    /** ラベル: フォームを閉じるaria-label */
    closeFormLabel?: string;
}
/**
 * 汎用リストレイアウトコンポーネント
 *
 * 検索・フィルター・追加フォーム・統計表示・ローディング/エラー状態を統合したリストUI
 */
declare const ListLayout: React.FC<ListLayoutProps>;

interface MonthSelectorProps {
    /** 選択中の月（YYYY-MM形式） */
    selectedMonth: string;
    /** 月変更コールバック */
    onMonthChange: (month: string) => void;
    /** 選択可能な最小年 */
    minYear?: number;
    /** 選択可能な最大年 */
    maxYear?: number;
    /** 月ラベルのフォーマッター */
    formatLabel?: (year: number, month: number) => string;
    /** 前の月ボタンのaria-label */
    prevLabel?: string;
    /** 次の月ボタンのaria-label */
    nextLabel?: string;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * 月選択コンポーネント
 */
declare const MonthSelector: React.FC<MonthSelectorProps>;

/** ドロワーのアイテム */
interface DrawerItem {
    /** 表示名 */
    name: string;
    /** 遷移先パス */
    path: string;
    /** アイコン */
    icon?: ReactNode;
}
/** ドロワーのセクション */
interface DrawerSection {
    /** セクションタイトル */
    title: string;
    /** セクション内のアイテム */
    items: DrawerItem[];
}
/** リンクレンダリング用のprops */
interface RenderLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}
interface NavigationDrawerProps {
    /** ドロワーの開閉状態 */
    open: boolean;
    /** ドロワーを閉じる関数 */
    onClose: () => void;
    /** セクション一覧 */
    sections: DrawerSection[];
    /** ログアウト関数 */
    onLogout?: () => void;
    /** ログアウトボタンのラベル */
    logoutLabel?: string;
    /** ドロワーの幅（px） */
    width?: number;
    /** カスタムリンクレンダラー（Next.js Linkなどを注入） */
    renderLink?: (props: RenderLinkProps) => ReactNode;
    /** 閉じるボタンのaria-label */
    closeButtonLabel?: string;
}
/**
 * ナビゲーションドロワーコンポーネント
 *
 * renderLink propでNext.js Linkなどのルーターリンクを注入できる
 */
declare const NavigationDrawer: React.FC<NavigationDrawerProps>;

/** カードの色テーマ */
type StatCardColor = "blue" | "green" | "purple" | "red" | "yellow" | "gray";
/** 個々のカードデータ */
interface StatCardItem {
    /** カードのラベル */
    label: string;
    /** 表示する値 */
    value: string | number;
    /** 色テーマ */
    color?: StatCardColor;
}
interface StatCardsProps {
    /** カードデータの配列 */
    cards: StatCardItem[];
    /** 値のフォーマッター */
    formatValue?: (value: string | number) => string;
    /** グリッドのカラム数 */
    columns?: 1 | 2 | 3 | 4;
    /** 追加のクラス名 */
    className?: string;
}
/**
 * 統計カードコンポーネント
 */
declare const StatCards: React.FC<StatCardsProps>;

interface TooltipProps {
    /** ツールチップの内容 */
    content: ReactNode;
    /** トリガー要素 */
    children: ReactNode;
    /** 追加のクラス名 */
    className?: string;
    /** トリガーボタンのaria-label */
    triggerLabel?: string;
}
/**
 * ツールチップコンポーネント
 * クリックで開閉するポップオーバー形式
 */
declare const Tooltip: React.FC<TooltipProps>;

interface AppLayoutProps {
    /** ページコンテンツ */
    children: ReactNode;
    /** アプリケーションのタイトル */
    appTitle: string;
    /** タイトルの遷移先パス */
    titleHref?: string;
    /** ドロワーのセクション */
    drawerSections: DrawerSection[];
    /** ドロワーの幅（px） */
    drawerWidth?: number;
    /** ログアウト関数 */
    onLogout?: () => void;
    /** ログアウトボタンのラベル */
    logoutLabel?: string;
    /** カスタムリンクレンダラー */
    renderLink?: (props: RenderLinkProps) => ReactNode;
    /** タイトル横の追加コンテンツ（環境ラベル等） */
    titleSuffix?: ReactNode;
    /** AppBarのカラー */
    appBarColor?: "primary" | "secondary" | "success" | "transparent";
    /** 追加のクラス名（メインコンテンツ） */
    className?: string;
    /** メニューボタンのaria-label */
    menuButtonLabel?: string;
}
/**
 * アプリケーションレイアウトコンポーネント
 *
 * AppBar + NavigationDrawer + メインコンテンツの統合レイアウト
 * Next.js依存はrenderLinkで外から注入する
 */
declare const AppLayout: React.FC<AppLayoutProps>;

/**
 * 指定された要素の外側がクリックされたときにコールバックを実行するフック
 */
declare function useClickOutside(ref: RefObject<HTMLElement | null>, handler: () => void, enabled?: boolean): void;

/**
 * Escapeキーが押されたときにコールバックを実行するフック
 */
declare function useEscapeKey(handler: () => void, enabled?: boolean): void;

/**
 * メディアクエリにマッチするかを返すフック
 * @param query - メディアクエリ文字列 (例: "(min-width: 640px)")
 */
declare function useMediaQuery(query: string): boolean;

/**
 * Tailwindクラス名を結合・マージするユーティリティ
 * clsxで条件付きクラス名を組み立て、tailwind-mergeで競合を解決する
 */
declare function cn(...inputs: ClassValue[]): string;

export { AppBar, type AppBarColor, type AppBarPosition, type AppBarProps, AppLayout, type AppLayoutProps, Button, type ButtonProps, type ButtonSize, type ButtonVariant, Checkbox, type CheckboxProps, type CheckboxSize, ConfirmDialog, type ConfirmDialogProps, type ConfirmDialogVariant, Dialog, type DialogMaxWidth, type DialogProps, DrawerHeader, type DrawerHeaderProps, type DrawerItem, type DrawerSection, Input, type InputProps, type InputSize, type InputType, ListItem, type ListItemProps, ListLayout, type ListLayoutProps, MonthSelector, type MonthSelectorProps, NavigationDrawer, type NavigationDrawerProps, type RenderLinkProps, Spinner, type SpinnerProps, type SpinnerSize, type StatCardColor, type StatCardItem, StatCards, type StatCardsProps, Textarea, type TextareaProps, type TextareaSize, ToggleSwitch, type ToggleSwitchProps, type ToggleSwitchSize, Tooltip, type TooltipProps, cn, useClickOutside, useEscapeKey, useMediaQuery };
