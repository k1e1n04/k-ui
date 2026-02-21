"use client";

import type React from "react";
import type { ReactNode } from "react";

import { cn } from "../../../utils/cn";
import { DrawerHeader } from "../../atoms/DrawerHeader";

/** ドロワーのアイテム */
export interface DrawerItem {
  /** 表示名 */
  name: string;
  /** 遷移先パス */
  path: string;
  /** アイコン */
  icon?: ReactNode;
}

/** ドロワーのセクション */
export interface DrawerSection {
  /** セクションタイトル */
  title: string;
  /** セクション内のアイテム */
  items: DrawerItem[];
}

/** リンクレンダリング用のprops */
export interface RenderLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface NavigationDrawerProps {
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

/** デフォルトのリンクレンダラー */
const defaultRenderLink = ({
  href,
  children,
  className,
  onClick,
}: RenderLinkProps) => (
  <a href={href} className={className} onClick={onClick}>
    {children}
  </a>
);

/**
 * ナビゲーションドロワーコンポーネント
 *
 * renderLink propでNext.js Linkなどのルーターリンクを注入できる
 */
export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  open,
  onClose,
  sections,
  onLogout,
  logoutLabel = "Logout",
  width = 240,
  renderLink = defaultRenderLink,
  closeButtonLabel = "Close",
}) => {
  return (
    <>
      {/* オーバーレイ */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* ドロワー */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full bg-white dark:bg-gray-800 text-black dark:text-white z-50 transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
        style={{ width: `${width}px` }}
      >
        <DrawerHeader>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={closeButtonLabel}
          >
            {/* XMarkIcon インラインSVG */}
            <svg
              className="w-6 h-6 dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </DrawerHeader>

        <div className="overflow-y-auto h-full pb-16">
          {sections.map((section, sectionIndex) => (
            <div key={section.title || `section-${sectionIndex}`}>
              <div className="text-sm text-gray-500 dark:text-gray-400 px-4 pt-2">
                {section.title}
              </div>
              {section.items.map((item) => (
                <div key={item.name} className="px-2">
                  {renderLink({
                    href: item.path,
                    className:
                      "flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200",
                    onClick: onClose,
                    children: (
                      <>
                        {item.icon && (
                          <span className="text-gray-500 dark:text-gray-400 mr-3">
                            {item.icon}
                          </span>
                        )}
                        <span>{item.name}</span>
                      </>
                    ),
                  })}
                </div>
              ))}
            </div>
          ))}

          {/* ログアウトボタン */}
          {onLogout && (
            <div className="px-2 mt-4">
              <button
                className="w-full text-left flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                onClick={onLogout}
              >
                <span>{logoutLabel}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
