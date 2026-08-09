"use client";

import type React from "react";
import type { ReactNode } from "react";
import { useRef } from "react";

import { useEscapeKey } from "../../../hooks/useEscapeKey";
import { useFocusTrap } from "../../../hooks/useFocusTrap";
import { cn } from "../../../utils/cn";
import { DrawerHeader } from "../../atoms/DrawerHeader";

/** ドロワーのアイテム。 @default undefined */
export interface DrawerItem {
  /** 表示名。 @default undefined */
  name: string;
  /** 遷移先パス。 @default undefined */
  path: string;
  /** アイコン。 @default undefined */
  icon?: ReactNode;
}

/** ドロワーのセクション。 @default undefined */
export interface DrawerSection {
  /** セクションタイトル。 @default undefined */
  title: string;
  /** セクション内のアイテム。 @default undefined */
  items: DrawerItem[];
}

/** リンクレンダリング用のプロパティ。 @default undefined */
export interface RenderLinkProps {
  /** 遷移先 URL。 @default undefined */
  href: string;
  /** リンク内容。 @default undefined */
  children: ReactNode;
  /** クリック時の処理。 @default undefined */
  onClick?: () => void;
  /** 追加のクラス名。 @default undefined */
  className?: string;
}

/** ナビゲーションドロワーのプロパティ。 @default undefined */
export interface NavigationDrawerProps {
  /** ドロワーの開閉状態。 @default undefined */
  open: boolean;
  /** ドロワーを閉じる関数。 @default undefined */
  onClose: () => void;
  /** セクション一覧。 @default undefined */
  sections: DrawerSection[];
  /** ログアウト関数。 @default undefined */
  onLogout?: () => void;
  /** ログアウトボタンのラベル。 @default "Logout" */
  logoutLabel?: string;
  /** ドロワーの幅（px）。 @default 240 */
  width?: number;
  /** カスタムリンクレンダラー（Next.js Link などを注入）。 @default defaultRenderLink */
  renderLink?: (props: RenderLinkProps) => ReactNode;
  /** 閉じるボタンの aria-label。 @default "Close" */
  closeButtonLabel?: string;
  /** ドロワーダイアログの aria-label。 @default "Navigation menu" */
  ariaLabel?: string;
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
 * ナビゲーションドロワーコンポーネント。
 *
 * renderLink propでNext.js Linkなどのルーターリンクを注入できる
 *
 * @default undefined
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
  ariaLabel = "Navigation menu",
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEscapeKey(onClose, open);
  useFocusTrap(drawerRef, open, { initialFocusRef: closeButtonRef });

  return (
    <>
      {/* オーバーレイ */}
      {open && (
        <div
          className="fixed inset-0 bg-[var(--kui-color-overlay)] z-[var(--kui-z-drawer)] transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* ドロワー */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={open ? ariaLabel : undefined}
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed top-0 right-0 h-full bg-surface text-foreground z-[var(--kui-z-overlay)] transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
        style={{ width: `${width}px` }}
      >
        <DrawerHeader>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-sunken"
            aria-label={closeButtonLabel}
          >
            {/* XMarkIcon インラインSVG */}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </DrawerHeader>

        <div className="overflow-y-auto h-full pb-16">
          {sections.map((section, sectionIndex) => (
            <div key={section.title || `section-${sectionIndex}`}>
              <div className="text-sm text-muted px-4 pt-2">
                {section.title}
              </div>
              {section.items.map((item) => (
                <div key={item.name} className="px-2">
                  {renderLink({
                    href: item.path,
                    className:
                      "flex items-center px-3 py-2 rounded-md hover:bg-surface-sunken text-foreground",
                    onClick: onClose,
                    children: (
                      <>
                        {item.icon && (
                          <span className="text-muted mr-3">{item.icon}</span>
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
                type="button"
                className="w-full text-left flex items-center px-3 py-2 rounded-md hover:bg-surface-sunken text-foreground"
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
