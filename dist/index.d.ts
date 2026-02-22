import React, { ReactNode, RefObject } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { ClassValue } from 'clsx';

/**
 * Alertコンポーネントのバリアント
 */
type AlertVariant = "success" | "info" | "warning" | "error";
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * アラートの種別
     * @default 'info'
     */
    variant?: AlertVariant;
    /**
     * 表示するメッセージ
     */
    message: string;
}
/**
 * Alert コンポーネント
 *
 * エラー、警告、情報、成功のメッセージを表示するインラインアラート
 *
 * @example
 * <Alert variant="error" message="エラーが発生しました" />
 *
 * @example
 * <Alert variant="success" message="保存しました" />
 */
declare const Alert: React.FC<AlertProps>;

/**
 * Badgeコンポーネントのバリアント
 */
type BadgeVariant = "info" | "success" | "warning" | "danger" | "neutral";
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    /**
     * バッジの種別
     * @default 'info'
     */
    variant?: BadgeVariant;
    /**
     * 表示内容
     */
    children: React.ReactNode;
}
/**
 * Badge コンポーネント
 *
 * 小さなステータスラベルを表示するためのコンポーネント
 *
 * @example
 * <Badge variant="info">Planned</Badge>
 *
 * @example
 * <Badge variant="neutral">Archived</Badge>
 */
declare const Badge: React.FC<BadgeProps>;

/** ボタンのバリアント */
type ButtonVariant = "primary" | "secondary" | "success" | "info" | "outline" | "ghost" | "danger";
/** ボタンのサイズ */
type ButtonSize = "small" | "medium" | "large";
/** ボタンのトーン */
type ButtonTone = "solid" | "plain" | "subtle";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** ボタンの種類 */
    variant?: ButtonVariant;
    /** ボタンのサイズ */
    size?: ButtonSize;
    /** フルサイズ（幅いっぱい）表示 */
    fullWidth?: boolean;
    /** アイコンのみのボタン */
    iconOnly?: boolean;
    /** ボタンのトーン */
    tone?: ButtonTone;
}
/**
 * 汎用ボタンコンポーネント
 */
declare const Button: React.FC<ButtonProps>;

type PaddingSize = "none" | "sm" | "md" | "lg";
type ShadowSize = "none" | "sm" | "md";
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * パディングのサイズ
     * @default 'md'
     */
    padding?: PaddingSize;
    /**
     * シャドウのサイズ
     * @default 'md'
     */
    shadow?: ShadowSize;
    /**
     * ボーダーの表示
     * @default false
     */
    border?: boolean;
    children?: React.ReactNode;
}
/**
 * Card コンポーネント
 *
 * コンテンツを囲むカードコンポーネント
 *
 * @example
 * // 基本的な使用
 * <Card>
 *   <p>Content here</p>
 * </Card>
 *
 * @example
 * // カスタマイズ例
 * <Card padding="lg" shadow="sm" border>
 *   <p>Custom content</p>
 * </Card>
 */
declare const Card: React.FC<CardProps>;

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

/** フォームフィールドのサイズ */
type FormFieldSize = "small" | "medium" | "large";
interface FormFieldRenderProps {
    /** フィールドに設定する aria-describedby */
    describedBy?: string;
    /** 説明文の要素ID */
    descriptionId?: string;
    /** エラー要素のID */
    errorId?: string;
}
interface FormFieldProps {
    /** ラベルテキスト */
    label?: string;
    /** 補助説明 */
    description?: string;
    /** 必須フラグ（ラベルに * を付与する） */
    required?: boolean;
    /** エラーメッセージ */
    error?: string;
    /** label と入力要素を紐づける htmlFor */
    htmlFor?: string;
    /** サイズ */
    size?: FormFieldSize;
    /** 追加のクラス名（ルートラッパーに適用） */
    className?: string;
    /** 既存の aria-describedby（内部IDとマージされる） */
    "aria-describedby"?: string;
    /** フィールド本体 */
    children: React.ReactNode | ((props: FormFieldRenderProps) => React.ReactNode);
}
/**
 * フォーム入力要素向けの共通ラッパー。
 *
 * label / description / required / error の表示ルールと
 * aria-describedby のID連携を一元管理する。
 */
declare const FormField: React.FC<FormFieldProps>;

type HeadingAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingSize = "xl" | "lg" | "md" | "sm";
type HeadingTone = "default" | "muted" | "inverse";
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    /** レンダリングする見出しタグ */
    as?: HeadingAs;
    /** 見出しサイズ */
    size?: HeadingSize;
    /** 見出しカラー */
    tone?: HeadingTone;
}
/**
 * Heading コンポーネント
 *
 * ページ・セクション見出しの階層表現を統一するためのコンポーネント
 */
declare const Heading: React.FC<HeadingProps>;

/** インプットのタイプ */
type InputType = "text" | "number" | "date" | "time" | "url" | "month" | "hidden";
/** インプットのサイズ */
type InputSize = "small" | "medium" | "large";
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "onChange" | "value" | "className"> {
    /** インプットのタイプ */
    type?: InputType;
    /** ラベルテキスト */
    label?: string;
    /** エラーメッセージ（指定されるとエラー状態を表示する） */
    error?: string;
    /** 補助説明 */
    description?: string;
    /** 現在の値 */
    value?: string;
    /** 変更ハンドラー（入力値のみを受け取る） */
    onChange?: (value: string) => void;
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

/** プログレスバーのサイズ */
type ProgressBarSize = "sm" | "md" | "lg";
interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 現在の進捗値 */
    value: number;
    /** 進捗の最大値 */
    max?: number;
    /** スクリーンリーダー向けのラベル */
    label?: string;
    /** プログレスバーのサイズ */
    size?: ProgressBarSize;
}
/**
 * ProgressBar コンポーネント
 *
 * 進捗率を視覚的に表現するバーUI。
 * `role=progressbar` と ARIA 属性を自動付与する。
 */
declare const ProgressBar: React.FC<ProgressBarProps>;

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "value" | "className"> {
    /** 現在の検索キーワード */
    value?: string;
    /** 変更ハンドラー（入力値のみを受け取る） */
    onChange?: (value: string) => void;
    /** クリアボタン押下時のハンドラー */
    onClear?: () => void;
    /** 追加のクラス名（ルートラッパーに適用） */
    className?: string;
    /** クリアボタンの aria-label */
    clearButtonAriaLabel?: string;
}
/**
 * 検索アイコン内包の検索入力コンポーネント
 */
declare const SearchInput: React.FC<SearchInputProps>;

/** セレクトのサイズ */
type SelectSize = "small" | "medium" | "large";
/** セレクトの選択肢 */
interface SelectOption {
    /** 表示ラベル */
    label: string;
    /** 値 */
    value: string;
    /** 無効状態 */
    disabled?: boolean;
}
interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "size" | "value"> {
    /** 選択肢リスト */
    options: SelectOption[];
    /** ラベルテキスト */
    label?: string;
    /** 必須フラグ（ラベルに * を付与する） */
    required?: boolean;
    /** 補助説明 */
    description?: string;
    /** プレースホルダー（未選択時に表示される） */
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
    size?: SelectSize;
    /** 追加のクラス名（ルートラッパーに適用） */
    className?: string;
    /** clear 可能か（placeholder を再選択できる） */
    clearable?: boolean;
}
/**
 * セレクトコンポーネント
 *
 * ラベル・バリデーションエラーをセットで管理するドロップダウン選択UI
 */
declare const Select: React.FC<SelectProps>;

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
interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
    /** ラベルテキスト */
    label?: string;
    /** エラーメッセージ（指定されるとエラー状態を表示する） */
    error?: string;
    /** 補助説明 */
    description?: string;
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

type TypographyAs = "p" | "span" | "div" | "label" | "small";
type TypographyVariant = "body-sm" | "body-md" | "body-lg" | "caption" | "label";
type TypographyTone = "default" | "muted" | "inverse" | "danger" | "success" | "info" | "warning";
type TypographyWeight = "normal" | "medium" | "semibold" | "bold";
interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    /** レンダリングするHTML要素 */
    as?: TypographyAs;
    /** タイポグラフィの種別 */
    variant?: TypographyVariant;
    /** テキストのトーン */
    tone?: TypographyTone;
    /** 文字の太さ */
    weight?: TypographyWeight;
    /** 1行省略表示 */
    truncate?: boolean;
}
/**
 * Typography コンポーネント
 *
 * 本文・補助テキスト・ラベルなどの文字スタイルを統一するための基本コンポーネント
 */
declare const Typography: React.FC<TypographyProps>;

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

interface DataTableColumn<T> {
    /** 一意な列キー */
    key: string;
    /** 列ヘッダー */
    header: ReactNode;
    /** セルの表示内容 */
    render: (row: T) => ReactNode;
    /** モバイルカード表示時のラベル */
    mobileLabel?: ReactNode;
    /** ヘッダーセルの追加クラス */
    headerClassName?: string;
    /** データセルの追加クラス */
    cellClassName?: string;
}
interface DataTableAction<T> {
    /** ボタンラベル */
    label: string;
    /** 押下時のハンドラー */
    onClick: (row: T) => void;
    /** ボタンバリアント */
    variant?: "primary" | "secondary" | "success" | "info" | "outline" | "ghost" | "danger";
    /** aria-label */
    ariaLabel?: string;
    /** 行ごとの無効化制御 */
    disabled?: boolean | ((row: T) => boolean);
}
type DataTableActions<T> = DataTableAction<T>[] | ((row: T) => DataTableAction<T>[]);
type DataTableMobileMode = "scroll" | "cards";
interface DataTableProps<T> {
    /** カラム定義 */
    columns: DataTableColumn<T>[];
    /** 行データ */
    rows: T[];
    /** 行キー生成 */
    getRowId: (row: T, index: number) => string;
    /** 右端のアクション列 */
    actions?: DataTableActions<T>;
    /** アクション列ヘッダー */
    actionHeader?: ReactNode;
    /** ローディング状態 */
    isLoading?: boolean;
    /** ローディング文言 */
    loadingLabel?: string;
    /** 空状態文言 */
    emptyMessage?: string;
    /** モバイル表示モード */
    mobileMode?: DataTableMobileMode;
    /** 追加クラス */
    className?: string;
}
/**
 * 汎用DataTableコンポーネント
 *
 * - テーブルヘッダー / 行 / 空状態 / ローディングを提供
 * - `mobileMode="scroll"` では横スクロール対応
 * - `mobileMode="cards"` ではモバイルをカード表示に切り替え
 */
declare const DataTable: <T>({ columns, rows, getRowId, actions, actionHeader, isLoading, loadingLabel, emptyMessage, mobileMode, className, }: DataTableProps<T>) => react_jsx_runtime.JSX.Element;

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

type EmptyStateSize = "sm" | "md" | "lg";
type EmptyStateAlign = "left" | "center";
type EmptyStateActionPlacement = "below" | "inline";
interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 空状態を表すアイコン
     */
    icon?: React.ReactNode;
    /**
     * 空状態のタイトル
     */
    title: string;
    /**
     * 補足説明テキスト
     */
    description?: string;
    /**
     * アクション要素（ボタン等）
     */
    action?: React.ReactNode;
    /**
     * コンポーネント全体のサイズ
     */
    size?: EmptyStateSize;
    /**
     * コンテンツの水平方向の配置
     */
    align?: EmptyStateAlign;
    /**
     * action の配置
     */
    actionPlacement?: EmptyStateActionPlacement;
}
/**
 * EmptyState コンポーネント
 *
 * データが存在しない状態を統一した見た目で表示するテンプレート
 *
 * @example
 * <EmptyState title="No data" description="Please add items." />
 */
declare const EmptyState: React.FC<EmptyStateProps>;

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

export { Alert, type AlertProps, type AlertVariant, AppBar, type AppBarColor, type AppBarPosition, type AppBarProps, AppLayout, type AppLayoutProps, Badge, type BadgeProps, type BadgeVariant, Button, type ButtonProps, type ButtonSize, type ButtonVariant, Card, type CardProps, Checkbox, type CheckboxProps, type CheckboxSize, ConfirmDialog, type ConfirmDialogProps, type ConfirmDialogVariant, DataTable, type DataTableAction, type DataTableActions, type DataTableColumn, type DataTableMobileMode, type DataTableProps, Dialog, type DialogMaxWidth, type DialogProps, DrawerHeader, type DrawerHeaderProps, type DrawerItem, type DrawerSection, EmptyState, type EmptyStateProps, FormField, type FormFieldProps, type FormFieldRenderProps, type FormFieldSize, Heading, type HeadingAs, type HeadingProps, type HeadingSize, type HeadingTone, Input, type InputProps, type InputSize, type InputType, ListItem, type ListItemProps, ListLayout, type ListLayoutProps, MonthSelector, type MonthSelectorProps, NavigationDrawer, type NavigationDrawerProps, type PaddingSize, ProgressBar, type ProgressBarProps, type ProgressBarSize, type RenderLinkProps, SearchInput, type SearchInputProps, Select, type SelectOption, type SelectProps, type SelectSize, type ShadowSize, Spinner, type SpinnerProps, type SpinnerSize, type StatCardColor, type StatCardItem, StatCards, type StatCardsProps, Textarea, type TextareaProps, type TextareaSize, ToggleSwitch, type ToggleSwitchProps, type ToggleSwitchSize, Tooltip, type TooltipProps, Typography, type TypographyAs, type TypographyProps, type TypographyTone, type TypographyVariant, type TypographyWeight, cn, useClickOutside, useEscapeKey, useMediaQuery };
