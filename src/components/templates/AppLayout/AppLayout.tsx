"use client";

import type { ReactNode } from "react";
import React, { useState } from "react";

import { cn } from "../../../utils/cn";
import { AppBar } from "../../molecules/AppBar";
import {
  NavigationDrawer,
  type DrawerSection,
  type RenderLinkProps,
} from "../../molecules/NavigationDrawer";

export interface AppLayoutProps {
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
export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  appTitle,
  titleHref = "/",
  drawerSections,
  drawerWidth = 240,
  onLogout,
  logoutLabel,
  renderLink,
  titleSuffix,
  appBarColor = "secondary",
  className,
  menuButtonLabel = "Open menu",
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const titleContent = (
    <span className="text-xl font-bold text-primary-main dark:text-white">
      {appTitle}
    </span>
  );

  const defaultRenderLink = ({
    href,
    children: linkChildren,
  }: RenderLinkProps) => <a href={href}>{linkChildren}</a>;

  const linkRenderer = renderLink || defaultRenderLink;

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      {/* アプリバー */}
      <AppBar position="fixed" color={appBarColor} className="shadow-none">
        <div className="flex items-center justify-between px-4 py-2">
          <h6 className="text-xl font-bold grow">
            {linkRenderer({
              href: titleHref,
              children: titleContent,
              className: "no-underline",
            })}
            {titleSuffix}
          </h6>
          <button
            className="text-primary-main dark:text-white ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={menuButtonLabel}
            onClick={() => setDrawerOpen(true)}
          >
            {/* Bars3Icon インラインSVG */}
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </AppBar>

      {/* ドロワー */}
      <NavigationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sections={drawerSections}
        onLogout={onLogout}
        logoutLabel={logoutLabel}
        width={drawerWidth}
        renderLink={renderLink}
      />

      {/* メインコンテンツ */}
      <main
        className={cn(
          "grow pt-16 px-4 mb-6 sm:px-[10%] bg-white dark:bg-gray-900 text-black dark:text-white transition-colors min-h-[calc(100vh-4rem)] pb-[env(safe-area-inset-bottom)]",
          className
        )}
      >
        {children}
      </main>
    </div>
  );
};
