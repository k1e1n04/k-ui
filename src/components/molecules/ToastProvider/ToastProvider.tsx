"use client";
import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { usePortalContainer } from "../../../hooks/usePortalContainer";
import { cn } from "../../../utils/cn";
import type { ToastAction, ToastVariant } from "../../atoms/Toast";
import { Toast } from "../../atoms/Toast";
/** トースト表示オプション。 @default undefined */
export interface ToastOptions {
  /** バリアント。 @default "info" */
  variant?: ToastVariant;
  /** タイトル。 @default undefined */
  title?: string;
  /** アクション。 @default undefined */
  action?: ToastAction;
  /** 表示時間。 @default defaultDuration */
  duration?: number;
}
/** トースト操作 API。 @default undefined */
export interface ToastContextValue {
  /** トーストを表示する。 @default undefined */
  show: (message: string, options?: ToastOptions) => string;
  /** 成功トーストを表示する。 @default undefined */
  success: (message: string, options?: Omit<ToastOptions, "variant">) => string;
  /** エラートーストを表示する。 @default undefined */
  error: (message: string, options?: Omit<ToastOptions, "variant">) => string;
  /** 情報トーストを表示する。 @default undefined */
  info: (message: string, options?: Omit<ToastOptions, "variant">) => string;
  /** 警告トーストを表示する。 @default undefined */
  warning: (message: string, options?: Omit<ToastOptions, "variant">) => string;
  /** 指定したトーストを削除する。 @default undefined */
  dismiss: (id: string) => void;
  /** すべてのトーストを削除する。 @default undefined */
  dismissAll: () => void;
}
/** トーストプロバイダーのプロパティ。 @default undefined */
export interface ToastProviderProps {
  /** 子要素。 @default undefined */
  children: React.ReactNode;
  /** 表示位置。 @default "bottom-right" */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /** 標準表示時間。 @default 5000 */
  defaultDuration?: number;
  /** 最大表示数。 @default 5 */
  maxToasts?: number;
  /** ポータル先。 @default undefined */
  portalContainer?: HTMLElement | null;
}
interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  title?: string;
  action?: ToastAction;
  duration: number;
  remaining: number;
  startedAt: number;
  paused: boolean;
}
const ToastContext = createContext<ToastContextValue | null>(null);
const positionStyles: Record<
  NonNullable<ToastProviderProps["position"]>,
  string
> = {
  "top-right": "right-4 top-4",
  "top-left": "left-4 top-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
};
/** トースト操作 API を利用するフック。 @default undefined */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
/** トーストを管理・表示するプロバイダー。 @default undefined */
export function ToastProvider({
  children,
  position = "bottom-right",
  defaultDuration = 5000,
  maxToasts = 5,
  portalContainer,
}: ToastProviderProps) {
  const container = usePortalContainer(portalContainer);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);
  const startTimer = useCallback(
    (toast: ToastItem) => {
      if (toast.duration <= 0) return;
      const timer = setTimeout(() => dismiss(toast.id), toast.remaining);
      timers.current.set(toast.id, timer);
    },
    [dismiss],
  );
  const show = useCallback(
    (message: string, options: ToastOptions = {}) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const duration = options.duration ?? defaultDuration;
      const toast: ToastItem = {
        id,
        message,
        variant: options.variant ?? "info",
        title: options.title,
        action: options.action,
        duration,
        remaining: duration,
        startedAt: Date.now(),
        paused: false,
      };
      if (maxToasts <= 0) return id;
      setToasts((current) => {
        const next = [...current, toast];
        const evicted = next.slice(0, Math.max(0, next.length - maxToasts));
        evicted.forEach((item) => {
          const timer = timers.current.get(item.id);
          if (timer) clearTimeout(timer);
          timers.current.delete(item.id);
        });
        return next.slice(-maxToasts);
      });
      startTimer(toast);
      return id;
    },
    [defaultDuration, maxToasts, startTimer],
  );
  const pause = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) =>
      current.map((toast) =>
        toast.id === id
          ? {
              ...toast,
              remaining: Math.max(
                0,
                toast.remaining - (Date.now() - toast.startedAt),
              ),
              paused: true,
            }
          : toast,
      ),
    );
  }, []);
  const resume = useCallback(
    (id: string) => {
      setToasts((current) =>
        current.map((toast) => {
          if (toast.id !== id || !toast.paused) return toast;
          const next = { ...toast, paused: false, startedAt: Date.now() };
          startTimer(next);
          return next;
        }),
      );
    },
    [startTimer],
  );
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      timers.current.clear();
    },
    [],
  );
  const value = useMemo<ToastContextValue>(
    () => ({
      show,
      success: (message, options) =>
        show(message, { ...options, variant: "success" }),
      error: (message, options) =>
        show(message, { ...options, variant: "danger" }),
      info: (message, options) =>
        show(message, { ...options, variant: "info" }),
      warning: (message, options) =>
        show(message, { ...options, variant: "warning" }),
      dismiss,
      dismissAll: () => {
        timers.current.forEach(clearTimeout);
        timers.current.clear();
        setToasts([]);
      },
    }),
    [dismiss, show],
  );
  const notices = (
    <div
      aria-live="polite"
      className={cn(
        "fixed z-[var(--kui-z-toast)] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2",
        positionStyles[position],
      )}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          title={toast.title}
          message={toast.message}
          action={toast.action}
          onDismiss={() => dismiss(toast.id)}
          onMouseEnter={() => pause(toast.id)}
          onMouseLeave={() => resume(toast.id)}
          onFocus={() => pause(toast.id)}
          onBlur={() => resume(toast.id)}
        />
      ))}
    </div>
  );
  return (
    <ToastContext.Provider value={value}>
      {children}
      {container ? createPortal(notices, container) : null}
    </ToastContext.Provider>
  );
}
