"use client";

// src/utils/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/atoms/Alert/Alert.tsx
import { jsx } from "react/jsx-runtime";
var variantStyles = {
  error: "bg-[--kui-color-danger-subtle] border border-[--kui-color-danger-subtle] text-[--kui-color-danger]",
  warning: "bg-[--kui-color-warning-subtle]/30 border border-[--kui-color-warning-subtle] text-[--kui-color-warning]",
  info: "bg-[--kui-color-info-subtle]/20 border border-[--kui-color-info-subtle] text-[--kui-color-info]",
  success: "bg-[--kui-color-success-subtle] border border-[--kui-color-success-subtle] text-[--kui-color-success]"
};
var Alert = ({
  variant = "info",
  message,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "alert",
      className: cn("px-4 py-3 rounded-md", variantStyles[variant], className),
      ...props,
      children: message
    }
  );
};

// src/components/atoms/Badge/Badge.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var variantStyles2 = {
  info: "bg-[--kui-color-info-subtle] text-[--kui-color-info]",
  success: "bg-[--kui-color-success-subtle] text-[--kui-color-success]",
  warning: "bg-[--kui-color-warning-subtle] text-[--kui-color-warning]",
  danger: "bg-[--kui-color-danger-subtle] text-[--kui-color-danger]",
  neutral: "bg-[--kui-color-surface-raised] text-[--kui-color-text-muted] border border-[--kui-color-border]"
};
var Badge = ({
  variant = "info",
  className,
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsx2(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded px-2 py-1 text-xs font-medium",
        variantStyles2[variant],
        className
      ),
      ...props,
      children
    }
  );
};

// src/components/atoms/Button/Button.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var variantStyles3 = {
  primary: "bg-primary-main hover:bg-primary-light text-white dark:bg-blue-700 dark:hover:bg-blue-800",
  secondary: "bg-secondary-light hover:bg-gray-200 text-primary-main dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200",
  success: "bg-success-main hover:opacity-90 text-white dark:bg-green-700 dark:hover:bg-green-800",
  outline: "bg-transparent border border-primary-main text-primary-main hover:bg-primary-main/5 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/20",
  ghost: "bg-transparent hover:bg-gray-100 text-primary-main dark:hover:bg-gray-700 dark:text-gray-300",
  danger: "bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800"
};
var sizeStyles = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-4 py-2",
  large: "text-base px-6 py-3"
};
var iconSizeStyles = {
  small: "p-1",
  medium: "p-2",
  large: "p-3"
};
var Button = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  iconOnly = false,
  disabled = false,
  className,
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsx3(
    "button",
    {
      className: cn(
        "font-medium transition-colors",
        iconOnly ? "rounded-full" : "rounded-md",
        variantStyles3[variant],
        iconOnly ? iconSizeStyles[size] : sizeStyles[size],
        fullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed",
        className
      ),
      disabled,
      onClick: disabled ? void 0 : props.onClick,
      ...props,
      children
    }
  );
};

// src/components/atoms/Card/Card.tsx
import { jsx as jsx4 } from "react/jsx-runtime";

// src/components/atoms/Checkbox/Checkbox.tsx
import { useId } from "react";
import { jsx as jsx5, jsxs } from "react/jsx-runtime";
var boxSizeStyles = {
  small: "w-4 h-4",
  medium: "w-5 h-5",
  large: "w-6 h-6"
};
var checkmarkSizeStyles = {
  small: "w-2.5 h-2.5",
  medium: "w-3 h-3",
  large: "w-3.5 h-3.5"
};
var labelSizeStyles = {
  small: "text-xs",
  medium: "text-sm",
  large: "text-base"
};
var Checkbox = ({
  checked,
  onChange,
  disabled = false,
  label,
  size = "medium",
  className
}) => {
  const id = useId();
  return /* @__PURE__ */ jsxs(
    "label",
    {
      htmlFor: id,
      className: cn(
        "inline-flex items-center gap-2",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      ),
      children: [
        /* @__PURE__ */ jsx5(
          "input",
          {
            id,
            type: "checkbox",
            checked,
            "aria-checked": checked,
            onChange: (e) => onChange(e.target.checked),
            disabled,
            className: "sr-only peer",
            "aria-label": label
          }
        ),
        /* @__PURE__ */ jsx5(
          "span",
          {
            "aria-hidden": "true",
            className: cn(
              "inline-flex items-center justify-center shrink-0 rounded border-2 transition-colors duration-150",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2",
              boxSizeStyles[size],
              checked ? "bg-primary-main border-primary-main dark:bg-blue-600 dark:border-blue-600" : "bg-white border-gray-400 dark:bg-gray-800 dark:border-gray-500"
            ),
            children: checked && /* @__PURE__ */ jsx5(
              "svg",
              {
                viewBox: "0 0 12 12",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 2,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                className: cn("text-white", checkmarkSizeStyles[size]),
                children: /* @__PURE__ */ jsx5("polyline", { points: "2,6 5,9 10,3" })
              }
            )
          }
        ),
        label && /* @__PURE__ */ jsx5(
          "span",
          {
            className: cn(
              "select-none text-gray-700 dark:text-gray-300",
              labelSizeStyles[size]
            ),
            children: label
          }
        )
      ]
    }
  );
};

// src/components/atoms/DrawerHeader/DrawerHeader.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var DrawerHeader = ({
  children,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx6(
    "div",
    {
      className: cn(
        "flex items-center justify-end min-h-[56px] sm:min-h-[64px]",
        className
      ),
      ...props,
      children
    }
  );
};

// src/components/atoms/Input/Input.tsx
import { useId as useId2 } from "react";
import { jsx as jsx7, jsxs as jsxs2 } from "react/jsx-runtime";
var labelSizeStyles2 = {
  small: "text-xs mb-1",
  medium: "text-sm mb-1",
  large: "text-base mb-1.5"
};
var inputSizeStyles = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-3 py-2",
  large: "text-base px-4 py-2.5"
};
var errorSizeStyles = {
  small: "text-xs mt-1",
  medium: "text-xs mt-1",
  large: "text-sm mt-1.5"
};
var Input = ({
  type = "text",
  label,
  required = false,
  placeholder,
  error,
  value,
  onChange,
  disabled = false,
  size = "medium",
  className
}) => {
  const baseId = useId2();
  const inputId = `${baseId}-input`;
  const errorId = `${baseId}-error`;
  return /* @__PURE__ */ jsxs2("div", { className: cn("flex flex-col", className), children: [
    label && /* @__PURE__ */ jsxs2(
      "label",
      {
        htmlFor: inputId,
        className: cn(
          "font-medium text-gray-700 dark:text-gray-300",
          labelSizeStyles2[size]
        ),
        children: [
          label,
          required && /* @__PURE__ */ jsx7(
            "span",
            {
              "aria-hidden": "true",
              className: "ml-0.5 text-[var(--kui-color-danger)]",
              children: " *"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx7(
      "input",
      {
        id: inputId,
        type,
        value,
        onChange: (e) => onChange?.(e.target.value),
        disabled,
        placeholder,
        required,
        "aria-invalid": !!error,
        "aria-describedby": error ? errorId : void 0,
        className: cn(
          "w-full rounded-md border bg-white transition-colors duration-150",
          "text-gray-900 placeholder:text-gray-400",
          "dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500",
          inputSizeStyles[size],
          error ? [
            "border-[var(--kui-color-danger)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--kui-color-danger)] focus:ring-offset-1"
          ] : [
            "border-[var(--kui-color-border-strong)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--kui-color-info)] focus:ring-offset-1",
            "dark:border-gray-600"
          ],
          disabled && "cursor-not-allowed opacity-50"
        )
      }
    ),
    error && /* @__PURE__ */ jsx7(
      "p",
      {
        id: errorId,
        role: "alert",
        className: cn(
          "text-[var(--kui-color-danger)]",
          errorSizeStyles[size]
        ),
        children: error
      }
    )
  ] });
};

// src/components/atoms/ProgressBar/ProgressBar.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
var sizeStyles2 = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4"
};
var ProgressBar = ({
  value,
  max = 100,
  label,
  size = "md",
  className,
  ...props
}) => {
  const safeMax = max > 0 ? max : 100;
  const clampedValue = Math.min(Math.max(value, 0), safeMax);
  const progressPercentage = clampedValue / safeMax * 100;
  return /* @__PURE__ */ jsx8(
    "div",
    {
      role: "progressbar",
      "aria-valuenow": clampedValue,
      "aria-valuemin": 0,
      "aria-valuemax": safeMax,
      "aria-label": label,
      className: cn(
        "w-full overflow-hidden rounded-full bg-[--kui-color-surface-raised]",
        sizeStyles2[size],
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx8(
        "div",
        {
          className: "h-full rounded-full bg-[--kui-color-info] transition-all duration-500 ease-in-out",
          style: { width: `${progressPercentage}%` }
        }
      )
    }
  );
};

// src/components/atoms/Select/Select.tsx
import { useId as useId3 } from "react";
import { jsx as jsx9, jsxs as jsxs3 } from "react/jsx-runtime";
var labelSizeStyles3 = {
  small: "text-xs mb-1",
  medium: "text-sm mb-1",
  large: "text-base mb-1.5"
};
var selectSizeStyles = {
  small: "text-xs px-2 py-1 pr-7",
  medium: "text-sm px-3 py-2 pr-8",
  large: "text-base px-4 py-2.5 pr-10"
};
var errorSizeStyles2 = {
  small: "text-xs mt-1",
  medium: "text-xs mt-1",
  large: "text-sm mt-1.5"
};
var chevronSizeStyles = {
  small: "size-3 right-2",
  medium: "size-4 right-2.5",
  large: "size-5 right-3"
};
var Select = ({
  options,
  label,
  required = false,
  placeholder,
  error,
  value,
  onChange,
  disabled = false,
  size = "medium",
  className,
  name
}) => {
  const baseId = useId3();
  const selectId = `${baseId}-select`;
  const errorId = `${baseId}-error`;
  return /* @__PURE__ */ jsxs3("div", { className: cn("flex flex-col", className), children: [
    label && /* @__PURE__ */ jsxs3(
      "label",
      {
        htmlFor: selectId,
        className: cn(
          "font-medium text-gray-700 dark:text-gray-300",
          labelSizeStyles3[size]
        ),
        children: [
          label,
          required && /* @__PURE__ */ jsx9(
            "span",
            {
              "aria-hidden": "true",
              className: "ml-0.5 text-[var(--kui-color-danger)]",
              children: " *"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs3("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs3(
        "select",
        {
          id: selectId,
          name,
          value,
          onChange: (e) => onChange?.(e.target.value),
          disabled,
          required,
          "aria-invalid": !!error,
          "aria-describedby": error ? errorId : void 0,
          className: cn(
            "w-full appearance-none rounded-md border bg-white transition-colors duration-150",
            "text-gray-900",
            "dark:bg-gray-800 dark:text-gray-100",
            selectSizeStyles[size],
            error ? [
              "border-[var(--kui-color-danger)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--kui-color-danger)] focus:ring-offset-1"
            ] : [
              "border-[var(--kui-color-border-strong)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--kui-color-info)] focus:ring-offset-1",
              "dark:border-gray-600"
            ],
            disabled && "cursor-not-allowed opacity-50"
          ),
          children: [
            placeholder && /* @__PURE__ */ jsx9("option", { value: "", disabled: true, children: placeholder }),
            options.map((option) => /* @__PURE__ */ jsx9(
              "option",
              {
                value: option.value,
                disabled: option.disabled,
                children: option.label
              },
              option.value
            ))
          ]
        }
      ),
      /* @__PURE__ */ jsx9(
        "svg",
        {
          className: cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400",
            chevronSizeStyles[size],
            disabled && "opacity-50"
          ),
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          viewBox: "0 0 24 24",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx9(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M19 9l-7 7-7-7"
            }
          )
        }
      )
    ] }),
    error && /* @__PURE__ */ jsx9(
      "p",
      {
        id: errorId,
        role: "alert",
        className: cn(
          "text-[var(--kui-color-danger)]",
          errorSizeStyles2[size]
        ),
        children: error
      }
    )
  ] });
};

// src/components/atoms/Spinner/Spinner.tsx
import { jsx as jsx10, jsxs as jsxs4 } from "react/jsx-runtime";
var sizeStyles3 = {
  small: "h-5 w-5",
  medium: "h-8 w-8",
  large: "h-12 w-12"
};
var Spinner = ({
  size = "medium",
  label,
  className
}) => {
  return /* @__PURE__ */ jsx10(
    "div",
    {
      className: cn(
        "flex items-center justify-center h-full min-h-[200px]",
        className
      ),
      children: /* @__PURE__ */ jsxs4("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx10(
          "div",
          {
            className: cn(
              "animate-spin rounded-full border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-2",
              sizeStyles3[size]
            )
          }
        ),
        label && /* @__PURE__ */ jsx10("p", { className: "text-gray-600 dark:text-gray-300 text-sm", children: label })
      ] })
    }
  );
};

// src/components/atoms/Textarea/Textarea.tsx
import { useId as useId4 } from "react";
import { jsx as jsx11, jsxs as jsxs5 } from "react/jsx-runtime";
var labelSizeStyles4 = {
  small: "text-xs mb-1",
  medium: "text-sm mb-1",
  large: "text-base mb-1.5"
};
var textareaSizeStyles = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-3 py-2",
  large: "text-base px-4 py-2.5"
};
var errorSizeStyles3 = {
  small: "text-xs mt-1",
  medium: "text-xs mt-1",
  large: "text-sm mt-1.5"
};
var Textarea = ({
  label,
  required = false,
  placeholder,
  error,
  value,
  onChange,
  disabled = false,
  size = "medium",
  rows = 3,
  className
}) => {
  const baseId = useId4();
  const textareaId = `${baseId}-textarea`;
  const errorId = `${baseId}-error`;
  return /* @__PURE__ */ jsxs5("div", { className: cn("flex flex-col", className), children: [
    label && /* @__PURE__ */ jsxs5(
      "label",
      {
        htmlFor: textareaId,
        className: cn(
          "font-medium text-gray-700 dark:text-gray-300",
          labelSizeStyles4[size]
        ),
        children: [
          label,
          required && /* @__PURE__ */ jsx11(
            "span",
            {
              "aria-hidden": "true",
              className: "ml-0.5 text-[var(--kui-color-danger)]",
              children: " *"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx11(
      "textarea",
      {
        id: textareaId,
        value,
        onChange: (e) => onChange?.(e.target.value),
        disabled,
        placeholder,
        required,
        rows,
        "aria-invalid": !!error,
        "aria-describedby": error ? errorId : void 0,
        className: cn(
          "w-full rounded-md border bg-white transition-colors duration-150",
          "text-gray-900 placeholder:text-gray-400",
          "dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500",
          "resize-y",
          textareaSizeStyles[size],
          error ? [
            "border-[var(--kui-color-danger)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--kui-color-danger)] focus:ring-offset-1"
          ] : [
            "border-[var(--kui-color-border-strong)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--kui-color-info)] focus:ring-offset-1",
            "dark:border-gray-600"
          ],
          disabled && "cursor-not-allowed opacity-50"
        )
      }
    ),
    error && /* @__PURE__ */ jsx11(
      "p",
      {
        id: errorId,
        role: "alert",
        className: cn(
          "text-[var(--kui-color-danger)]",
          errorSizeStyles3[size]
        ),
        children: error
      }
    )
  ] });
};

// src/components/atoms/ToggleSwitch/ToggleSwitch.tsx
import { jsx as jsx12, jsxs as jsxs6 } from "react/jsx-runtime";
var trackSizeStyles = {
  small: "w-8 h-4",
  medium: "w-11 h-6",
  large: "w-14 h-7"
};
var thumbSizeStyles = {
  small: "w-3 h-3",
  medium: "w-5 h-5",
  large: "w-6 h-6"
};
var thumbTranslateStyles = {
  small: "translate-x-4",
  medium: "translate-x-5",
  large: "translate-x-7"
};
var labelSizeStyles5 = {
  small: "text-xs",
  medium: "text-sm",
  large: "text-base"
};
var ToggleSwitch = ({
  checked,
  onChange,
  disabled = false,
  label,
  size = "medium",
  className
}) => {
  return /* @__PURE__ */ jsxs6(
    "label",
    {
      className: cn(
        "inline-flex items-center gap-2",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      ),
      children: [
        /* @__PURE__ */ jsx12(
          "input",
          {
            type: "checkbox",
            role: "switch",
            checked,
            "aria-checked": checked,
            onChange: (e) => onChange(e.target.checked),
            disabled,
            className: "sr-only peer",
            "aria-label": label
          }
        ),
        /* @__PURE__ */ jsx12(
          "div",
          {
            "aria-hidden": "true",
            className: cn(
              "relative inline-flex items-center rounded-full transition-colors duration-200",
              trackSizeStyles[size],
              checked ? "bg-primary-main dark:bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
            ),
            children: /* @__PURE__ */ jsx12(
              "span",
              {
                className: cn(
                  "inline-block rounded-full bg-white shadow transform transition-transform duration-200",
                  thumbSizeStyles[size],
                  checked ? thumbTranslateStyles[size] : "translate-x-0.5"
                )
              }
            )
          }
        ),
        label && /* @__PURE__ */ jsx12(
          "span",
          {
            className: cn(
              "select-none text-gray-700 dark:text-gray-300",
              labelSizeStyles5[size]
            ),
            children: label
          }
        )
      ]
    }
  );
};

// src/components/molecules/AppBar/AppBar.tsx
import { jsx as jsx13 } from "react/jsx-runtime";
var positionStyles = {
  fixed: "fixed top-0 left-0 right-0",
  static: "static",
  absolute: "absolute",
  relative: "relative",
  sticky: "sticky top-0"
};
var colorStyles = {
  primary: "bg-primary-main text-white",
  secondary: "bg-secondary-main text-primary-main dark:bg-gray-800 dark:text-white",
  success: "bg-success-main text-white",
  transparent: "bg-transparent"
};
var AppBar = ({
  position = "static",
  color = "primary",
  className,
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsx13(
    "header",
    {
      className: cn(
        "z-50 transition-all duration-200 ease-in-out w-full",
        positionStyles[position],
        colorStyles[color],
        className
      ),
      ...props,
      children
    }
  );
};

// src/components/molecules/Dialog/Dialog.tsx
import { useEffect, useRef } from "react";
import { jsx as jsx14, jsxs as jsxs7 } from "react/jsx-runtime";
var maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl"
};
var Dialog = ({
  open,
  onClose,
  title,
  children,
  maxWidth = "md",
  hideCloseButton = false,
  disableOutsideClick = false,
  closeButtonLabel = "Close dialog",
  className
}) => {
  const dialogRef = useRef(null);
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && open) {
        onClose();
      }
    };
    if (open) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);
  const handleBackdropClick = (event) => {
    if (!disableOutsideClick && dialogRef.current && !dialogRef.current.contains(event.target)) {
      onClose();
    }
  };
  if (!open) return null;
  return /* @__PURE__ */ jsx14(
    "div",
    {
      className: "fixed inset-0 z-50 overflow-y-auto flex items-start sm:items-center justify-center p-4 pt-12 sm:pt-4",
      style: {
        backgroundColor: "var(--kui-color-overlay)",
        backdropFilter: "blur(2px)"
      },
      onClick: handleBackdropClick,
      children: /* @__PURE__ */ jsxs7(
        "div",
        {
          ref: dialogRef,
          role: "dialog",
          className: cn(
            "bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full transform transition-all duration-200 ease-out",
            maxWidthClasses[maxWidth],
            className
          ),
          onClick: (e) => e.stopPropagation(),
          children: [
            (title || !hideCloseButton) && /* @__PURE__ */ jsxs7("div", { className: "flex justify-between items-center p-6 pb-4", children: [
              title && /* @__PURE__ */ jsx14("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: title }),
              !hideCloseButton && /* @__PURE__ */ jsx14(
                "button",
                {
                  onClick: onClose,
                  className: "text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400 transition-colors p-1",
                  "aria-label": closeButtonLabel,
                  children: /* @__PURE__ */ jsx14(
                    "svg",
                    {
                      className: "h-6 w-6",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      strokeWidth: 1.5,
                      stroke: "currentColor",
                      children: /* @__PURE__ */ jsx14(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M6 18L18 6M6 6l12 12"
                        }
                      )
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsx14("div", { className: title || !hideCloseButton ? "px-6 pb-6" : "p-6", children })
          ]
        }
      )
    }
  );
};

// src/components/molecules/ConfirmDialog/ConfirmDialog.tsx
import { jsx as jsx15, jsxs as jsxs8 } from "react/jsx-runtime";
var variantStyles4 = {
  danger: {
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-600 dark:text-red-400",
    buttonBg: "bg-red-600 dark:bg-red-700",
    buttonHover: "hover:bg-red-700 dark:hover:bg-red-800"
  },
  warning: {
    iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    buttonBg: "bg-yellow-600 dark:bg-yellow-700",
    buttonHover: "hover:bg-yellow-700 dark:hover:bg-yellow-800"
  },
  info: {
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    buttonBg: "bg-blue-600 dark:bg-blue-700",
    buttonHover: "hover:bg-blue-700 dark:hover:bg-blue-800"
  }
};
var DefaultIcon = ({ className }) => /* @__PURE__ */ jsx15(
  "svg",
  {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx15(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      }
    )
  }
);
var ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  description,
  variant = "danger",
  isProcessing = false,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  processingLabel = "Processing...",
  icon
}) => {
  const styles = variantStyles4[variant];
  return /* @__PURE__ */ jsxs8(
    Dialog,
    {
      open,
      onClose,
      maxWidth: "sm",
      disableOutsideClick: isProcessing,
      children: [
        /* @__PURE__ */ jsxs8("div", { className: "flex items-center mb-4", children: [
          /* @__PURE__ */ jsx15(
            "div",
            {
              className: cn("rounded-full p-2 mr-3 flex-shrink-0", styles.iconBg),
              children: icon || /* @__PURE__ */ jsx15(DefaultIcon, { className: cn("h-6 w-6", styles.iconColor) })
            }
          ),
          /* @__PURE__ */ jsx15("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: title })
        ] }),
        /* @__PURE__ */ jsxs8("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx15("div", { className: "text-gray-700 dark:text-gray-300", children: message }),
          description && /* @__PURE__ */ jsx15("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-2", children: description })
        ] }),
        /* @__PURE__ */ jsxs8("div", { className: "flex justify-end space-x-3", children: [
          /* @__PURE__ */ jsx15(
            "button",
            {
              onClick: onClose,
              disabled: isProcessing,
              className: "px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
              children: cancelLabel
            }
          ),
          /* @__PURE__ */ jsx15(
            "button",
            {
              onClick: onConfirm,
              disabled: isProcessing,
              className: cn(
                "px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                styles.buttonBg,
                styles.buttonHover
              ),
              children: isProcessing ? processingLabel : confirmLabel
            }
          )
        ] })
      ]
    }
  );
};

// src/components/molecules/ListItem/ListItem.tsx
import { jsx as jsx16 } from "react/jsx-runtime";
var ListItem = ({
  children,
  hoverable = true,
  bordered = true,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx16(
    "div",
    {
      className: cn(
        "px-4 py-3 bg-white dark:bg-gray-800 rounded-lg",
        hoverable && "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
        bordered && "border border-gray-200 dark:border-gray-700",
        className
      ),
      ...props,
      children
    }
  );
};

// src/components/molecules/ListLayout/ListLayout.tsx
import React from "react";
import { jsx as jsx17, jsxs as jsxs9 } from "react/jsx-runtime";
var DefaultCloseIcon = () => /* @__PURE__ */ jsx17(
  "svg",
  {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx17(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M6 18L18 6M6 6l12 12"
      }
    )
  }
);
var DefaultSearchIcon = () => /* @__PURE__ */ jsx17(
  "svg",
  {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx17(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      }
    )
  }
);
var DefaultFilterIcon = () => /* @__PURE__ */ jsx17(
  "svg",
  {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx17(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
      }
    )
  }
);
var DefaultAddIcon = () => /* @__PURE__ */ jsx17(
  "svg",
  {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx17(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M12 4.5v15m7.5-7.5h-15"
      }
    )
  }
);
var ListLayout = ({
  title,
  errorMessage,
  onClearError,
  searchKeyword,
  onSearchChange,
  showSearchForm,
  onToggleSearch,
  showFilterOptions,
  onToggleFilter,
  showOnlyIncomplete,
  onToggleIncomplete,
  incompleteFilterLabel,
  showAddForm,
  onToggleAddForm,
  onAddClick,
  addFormComponent,
  statsComponent,
  children,
  isLoading = false,
  isError = false,
  onReload,
  emptyMessage = "Add items to get started",
  noSearchResultsMessage = "No matching items found",
  enableIncompleteFilter = true,
  customActions,
  className,
  searchIcon,
  filterIcon,
  addIcon,
  closeIcon,
  searchPlaceholder = "Search...",
  closeSearchLabel = "Close",
  filterTitle = "Filters",
  errorFetchMessage = "Failed to fetch data.",
  reloadLabel = "Reload",
  noIncompleteMessage = "No incomplete items",
  searchButtonLabel = "Search",
  filterButtonLabel = "Filter",
  addButtonLabel = "Add new",
  closeFormLabel = "Close form"
}) => {
  const hasItems = React.Children.count(children) > 0;
  const SearchIconComponent = searchIcon || /* @__PURE__ */ jsx17(DefaultSearchIcon, {});
  const FilterIconComponent = filterIcon || /* @__PURE__ */ jsx17(DefaultFilterIcon, {});
  const AddIconComponent = addIcon || /* @__PURE__ */ jsx17(DefaultAddIcon, {});
  const CloseIconComponent = closeIcon || /* @__PURE__ */ jsx17(DefaultCloseIcon, {});
  return /* @__PURE__ */ jsxs9("div", { className: cn("max-w-3xl mx-auto p-4", className), children: [
    /* @__PURE__ */ jsxs9("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx17("h1", { className: "text-2xl font-bold text-gray-800 dark:text-white", children: title }),
      /* @__PURE__ */ jsxs9("div", { className: "flex gap-2", children: [
        customActions,
        !showSearchForm && /* @__PURE__ */ jsx17(
          "button",
          {
            onClick: () => onToggleSearch(true),
            className: "p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors",
            "aria-label": searchButtonLabel,
            children: SearchIconComponent
          }
        ),
        enableIncompleteFilter && /* @__PURE__ */ jsx17(
          "button",
          {
            onClick: () => onToggleFilter(!showFilterOptions),
            className: cn(
              "p-2 rounded-full transition-colors",
              showFilterOptions ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/70" : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            ),
            "aria-label": filterButtonLabel,
            children: FilterIconComponent
          }
        ),
        onToggleAddForm ? /* @__PURE__ */ jsx17(
          "button",
          {
            onClick: () => onToggleAddForm(!showAddForm),
            className: cn(
              "p-2 rounded-full transition-colors",
              showAddForm ? "bg-rose-100 dark:bg-rose-900/50 text-rose-500 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-800/70" : "bg-rose-50 dark:bg-rose-900/30 text-rose-500 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-800/50"
            ),
            "aria-label": showAddForm ? closeFormLabel : addButtonLabel,
            children: showAddForm ? CloseIconComponent : AddIconComponent
          }
        ) : onAddClick && /* @__PURE__ */ jsx17(
          "button",
          {
            onClick: onAddClick,
            className: "p-2 rounded-full bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors",
            "aria-label": addButtonLabel,
            children: AddIconComponent
          }
        )
      ] })
    ] }),
    errorMessage && onClearError && /* @__PURE__ */ jsxs9("div", { className: "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg mb-4 flex justify-between items-center animate-kui-slide-down shadow-sm", children: [
      /* @__PURE__ */ jsx17("p", { children: errorMessage }),
      /* @__PURE__ */ jsx17(
        "button",
        {
          onClick: onClearError,
          className: "text-red-500 dark:text-red-300 p-1 hover:bg-red-100 dark:hover:bg-red-800/50 rounded-full transition-colors",
          children: CloseIconComponent
        }
      )
    ] }),
    enableIncompleteFilter && showFilterOptions && /* @__PURE__ */ jsxs9("div", { className: "mb-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg shadow-sm p-3 animate-kui-slide-down", children: [
      /* @__PURE__ */ jsxs9("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx17("h3", { className: "font-medium text-indigo-700 dark:text-indigo-300", children: filterTitle }),
        /* @__PURE__ */ jsx17(
          "button",
          {
            onClick: () => onToggleFilter(false),
            className: "text-indigo-500 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 p-1 rounded-full transition-colors",
            children: CloseIconComponent
          }
        )
      ] }),
      onToggleIncomplete && /* @__PURE__ */ jsx17("div", { className: "mt-3", children: /* @__PURE__ */ jsxs9("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx17(
          "input",
          {
            type: "checkbox",
            id: "showOnlyIncomplete",
            checked: showOnlyIncomplete,
            onChange: (e) => onToggleIncomplete(e.target.checked),
            className: "h-5 w-5 text-indigo-600 dark:text-indigo-500 rounded focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600"
          }
        ),
        /* @__PURE__ */ jsx17(
          "label",
          {
            htmlFor: "showOnlyIncomplete",
            className: "ml-2 text-gray-700 dark:text-gray-200",
            children: incompleteFilterLabel
          }
        )
      ] }) })
    ] }),
    showSearchForm && /* @__PURE__ */ jsxs9("div", { className: "mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 relative animate-kui-slide-down", children: [
      /* @__PURE__ */ jsxs9("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx17("span", { className: "w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-6", children: SearchIconComponent }),
        /* @__PURE__ */ jsx17(
          "input",
          {
            type: "text",
            value: searchKeyword,
            onChange: (e) => onSearchChange(e.target.value),
            placeholder: searchPlaceholder,
            className: "w-full pl-10 pr-10 py-2 border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          }
        ),
        searchKeyword && /* @__PURE__ */ jsx17(
          "button",
          {
            onClick: () => onSearchChange(""),
            className: "absolute right-6 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors",
            children: CloseIconComponent
          }
        )
      ] }),
      /* @__PURE__ */ jsx17("div", { className: "flex justify-end mt-3", children: /* @__PURE__ */ jsx17(
        "button",
        {
          onClick: () => onToggleSearch(false),
          className: "text-sm text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-3 py-1 hover:bg-blue-50 dark:hover:bg-blue-800/50 rounded-md transition-colors",
          children: closeSearchLabel
        }
      ) })
    ] }),
    showAddForm && addFormComponent && /* @__PURE__ */ jsx17("div", { className: "mb-4", children: addFormComponent }),
    statsComponent && /* @__PURE__ */ jsx17("div", { className: "mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm", children: statsComponent }),
    isLoading && /* @__PURE__ */ jsx17("div", { className: "flex justify-center items-center py-8", children: /* @__PURE__ */ jsx17("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 dark:border-blue-400" }) }),
    isError && onReload && /* @__PURE__ */ jsxs9("div", { className: "text-center py-8 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/30 rounded-lg", children: [
      /* @__PURE__ */ jsx17("p", { children: errorFetchMessage }),
      /* @__PURE__ */ jsx17(
        "button",
        {
          onClick: onReload,
          className: "mt-2 px-4 py-2 bg-red-100 dark:bg-red-800/50 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-700/50 transition-colors",
          children: reloadLabel
        }
      )
    ] }),
    !isLoading && !isError && /* @__PURE__ */ jsx17("div", { className: "space-y-3", children: hasItems ? children : /* @__PURE__ */ jsx17("div", { className: "text-center py-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg animate-kui-fade-in", children: searchKeyword ? /* @__PURE__ */ jsx17("p", { children: noSearchResultsMessage }) : showOnlyIncomplete ? /* @__PURE__ */ jsx17("p", { children: noIncompleteMessage }) : /* @__PURE__ */ jsx17("p", { children: emptyMessage }) }) })
  ] });
};

// src/components/molecules/MonthSelector/MonthSelector.tsx
import { jsx as jsx18, jsxs as jsxs10 } from "react/jsx-runtime";
var defaultFormatLabel = (year, month) => `${year}-${String(month).padStart(2, "0")}`;
var MonthSelector = ({
  selectedMonth,
  onMonthChange,
  minYear = 2020,
  maxYear,
  formatLabel = defaultFormatLabel,
  prevLabel = "Previous month",
  nextLabel = "Next month",
  className
}) => {
  const [year, month] = selectedMonth.split("-");
  const resolvedMaxYear = maxYear ?? (/* @__PURE__ */ new Date()).getFullYear() + 2;
  const generateMonthOptions = () => {
    const months = [];
    for (let y = minYear; y <= resolvedMaxYear; y++) {
      for (let m = 1; m <= 12; m++) {
        const monthStr = `${y}-${String(m).padStart(2, "0")}`;
        months.push({
          value: monthStr,
          label: formatLabel(y, m)
        });
      }
    }
    return months.reverse();
  };
  const monthOptions = generateMonthOptions();
  const handlePrevMonth = () => {
    const currentDate = /* @__PURE__ */ new Date(`${year}-${month}-01`);
    currentDate.setMonth(currentDate.getMonth() - 1);
    const newMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;
    if (currentDate.getFullYear() >= minYear) {
      onMonthChange(newMonth);
    }
  };
  const handleNextMonth = () => {
    const currentDate = /* @__PURE__ */ new Date(`${year}-${month}-01`);
    currentDate.setMonth(currentDate.getMonth() + 1);
    const newMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;
    if (currentDate.getFullYear() <= resolvedMaxYear) {
      onMonthChange(newMonth);
    }
  };
  return /* @__PURE__ */ jsxs10("div", { className: cn("flex items-center gap-2", className), children: [
    /* @__PURE__ */ jsx18(
      "button",
      {
        onClick: handlePrevMonth,
        className: "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
        "aria-label": prevLabel,
        children: /* @__PURE__ */ jsx18(
          "svg",
          {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx18(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M15 19l-7-7 7-7"
              }
            )
          }
        )
      }
    ),
    /* @__PURE__ */ jsx18(
      "select",
      {
        value: selectedMonth,
        onChange: (e) => onMonthChange(e.target.value),
        className: "px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        children: monthOptions.map((option) => /* @__PURE__ */ jsx18("option", { value: option.value, children: option.label }, option.value))
      }
    ),
    /* @__PURE__ */ jsx18(
      "button",
      {
        onClick: handleNextMonth,
        className: "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
        "aria-label": nextLabel,
        children: /* @__PURE__ */ jsx18(
          "svg",
          {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx18(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M9 5l7 7-7 7"
              }
            )
          }
        )
      }
    )
  ] });
};

// src/components/molecules/NavigationDrawer/NavigationDrawer.tsx
import { Fragment, jsx as jsx19, jsxs as jsxs11 } from "react/jsx-runtime";
var defaultRenderLink = ({
  href,
  children,
  className,
  onClick
}) => /* @__PURE__ */ jsx19("a", { href, className, onClick, children });
var NavigationDrawer = ({
  open,
  onClose,
  sections,
  onLogout,
  logoutLabel = "Logout",
  width = 240,
  renderLink = defaultRenderLink,
  closeButtonLabel = "Close"
}) => {
  return /* @__PURE__ */ jsxs11(Fragment, { children: [
    open && /* @__PURE__ */ jsx19(
      "div",
      {
        className: "fixed inset-0 bg-black/30 z-40 transition-opacity",
        onClick: onClose,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs11(
      "div",
      {
        className: cn(
          "fixed top-0 right-0 h-full bg-white dark:bg-gray-800 text-black dark:text-white z-50 transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        ),
        style: { width: `${width}px` },
        children: [
          /* @__PURE__ */ jsx19(DrawerHeader, { children: /* @__PURE__ */ jsx19(
            "button",
            {
              onClick: onClose,
              className: "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700",
              "aria-label": closeButtonLabel,
              children: /* @__PURE__ */ jsx19(
                "svg",
                {
                  className: "w-6 h-6 dark:text-white",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1.5,
                  stroke: "currentColor",
                  children: /* @__PURE__ */ jsx19(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M6 18L18 6M6 6l12 12"
                    }
                  )
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxs11("div", { className: "overflow-y-auto h-full pb-16", children: [
            sections.map((section, sectionIndex) => /* @__PURE__ */ jsxs11("div", { children: [
              /* @__PURE__ */ jsx19("div", { className: "text-sm text-gray-500 dark:text-gray-400 px-4 pt-2", children: section.title }),
              section.items.map((item) => /* @__PURE__ */ jsx19("div", { className: "px-2", children: renderLink({
                href: item.path,
                className: "flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200",
                onClick: onClose,
                children: /* @__PURE__ */ jsxs11(Fragment, { children: [
                  item.icon && /* @__PURE__ */ jsx19("span", { className: "text-gray-500 dark:text-gray-400 mr-3", children: item.icon }),
                  /* @__PURE__ */ jsx19("span", { children: item.name })
                ] })
              }) }, item.name))
            ] }, section.title || `section-${sectionIndex}`)),
            onLogout && /* @__PURE__ */ jsx19("div", { className: "px-2 mt-4", children: /* @__PURE__ */ jsx19(
              "button",
              {
                className: "w-full text-left flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200",
                onClick: onLogout,
                children: /* @__PURE__ */ jsx19("span", { children: logoutLabel })
              }
            ) })
          ] })
        ]
      }
    )
  ] });
};

// src/components/molecules/StatCards/StatCards.tsx
import { jsx as jsx20, jsxs as jsxs12 } from "react/jsx-runtime";
var colorStyles2 = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-800 dark:text-blue-200",
    border: "border-blue-200 dark:border-blue-800"
  },
  green: {
    bg: "bg-green-50 dark:bg-green-900/20",
    text: "text-green-800 dark:text-green-200",
    border: "border-green-200 dark:border-green-800"
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    text: "text-purple-800 dark:text-purple-200",
    border: "border-purple-200 dark:border-purple-800"
  },
  red: {
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-800 dark:text-red-200",
    border: "border-red-200 dark:border-red-800"
  },
  yellow: {
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    text: "text-yellow-800 dark:text-yellow-200",
    border: "border-yellow-200 dark:border-yellow-800"
  },
  gray: {
    bg: "bg-gray-50 dark:bg-gray-800",
    text: "text-gray-800 dark:text-gray-200",
    border: "border-gray-200 dark:border-gray-700"
  }
};
var columnStyles = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
};
var defaultFormatValue = (value) => String(value);
var StatCards = ({
  cards,
  formatValue = defaultFormatValue,
  columns = 3,
  className
}) => {
  return /* @__PURE__ */ jsx20("div", { className: cn("grid gap-4", columnStyles[columns], className), children: cards.map((card) => {
    const color = card.color ?? "blue";
    const styles = colorStyles2[color];
    return /* @__PURE__ */ jsxs12(
      "div",
      {
        className: cn("border rounded-lg p-4", styles.bg, styles.border),
        children: [
          /* @__PURE__ */ jsx20("h3", { className: cn("text-sm font-medium mb-1", styles.text), children: card.label }),
          /* @__PURE__ */ jsx20("p", { className: cn("text-2xl font-bold", styles.text), children: formatValue(card.value) })
        ]
      },
      card.label
    );
  }) });
};

// src/components/molecules/Tooltip/Tooltip.tsx
import { useEffect as useEffect2, useRef as useRef2, useState } from "react";
import { jsx as jsx21, jsxs as jsxs13 } from "react/jsx-runtime";
var Tooltip = ({
  content,
  children,
  className,
  triggerLabel = "Info"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState("right");
  const tooltipRef = useRef2(null);
  const buttonRef = useRef2(null);
  useEffect2(() => {
    if (isOpen && buttonRef.current) {
      requestAnimationFrame(() => {
        if (!buttonRef.current) return;
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const tooltipWidth = viewportWidth < 640 ? 256 : 288;
        const buttonCenter = buttonRect.left + buttonRect.width / 2;
        const tooltipLeft = buttonCenter - tooltipWidth / 2;
        const tooltipRight = buttonCenter + tooltipWidth / 2;
        const margin = viewportWidth < 640 ? 8 : 16;
        if (tooltipLeft < margin) {
          setTooltipPosition("left");
        } else if (tooltipRight > viewportWidth - margin) {
          setTooltipPosition("right");
        } else {
          setTooltipPosition("center");
        }
      });
    }
  }, [isOpen]);
  useEffect2(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleResize = () => {
      if (isOpen) {
        setIsOpen(false);
        setTimeout(() => setIsOpen(true), 10);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);
  const getTooltipClasses = () => {
    switch (tooltipPosition) {
      case "left":
        return {
          tooltip: "absolute z-10 w-64 sm:w-72 mt-2 left-0",
          arrow: "absolute -top-2 left-4 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45 border-t border-l border-gray-200 dark:border-gray-700"
        };
      case "right":
        return {
          tooltip: "absolute z-10 w-64 sm:w-72 mt-2 right-0",
          arrow: "absolute -top-2 right-4 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45 border-t border-l border-gray-200 dark:border-gray-700"
        };
      default:
        return {
          tooltip: "absolute z-10 w-64 sm:w-72 mt-2 left-1/2 transform -translate-x-1/2",
          arrow: "absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 rotate-45 border-t border-l border-gray-200 dark:border-gray-700"
        };
    }
  };
  const { tooltip: tooltipClass, arrow: arrowClass } = getTooltipClasses();
  return /* @__PURE__ */ jsxs13("div", { className: cn("relative inline-block", className), ref: tooltipRef, children: [
    /* @__PURE__ */ jsx21(
      "button",
      {
        ref: buttonRef,
        type: "button",
        className: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700",
        onClick: () => setIsOpen(!isOpen),
        "aria-label": triggerLabel,
        children
      }
    ),
    isOpen && /* @__PURE__ */ jsxs13(
      "div",
      {
        className: cn(
          tooltipClass,
          "bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-kui-fade-in"
        ),
        children: [
          /* @__PURE__ */ jsx21("div", { className: "p-3 text-sm text-gray-700 dark:text-gray-200", children: content }),
          /* @__PURE__ */ jsx21("div", { className: arrowClass, "aria-hidden": "true" })
        ]
      }
    )
  ] });
};

// src/components/templates/AppLayout/AppLayout.tsx
import { useState as useState2 } from "react";
import { jsx as jsx22, jsxs as jsxs14 } from "react/jsx-runtime";
var AppLayout = ({
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
  menuButtonLabel = "Open menu"
}) => {
  const [drawerOpen, setDrawerOpen] = useState2(false);
  const titleContent = /* @__PURE__ */ jsx22("span", { className: "text-xl font-bold text-primary-main dark:text-white", children: appTitle });
  const defaultRenderLink2 = ({
    href,
    children: linkChildren
  }) => /* @__PURE__ */ jsx22("a", { href, children: linkChildren });
  const linkRenderer = renderLink || defaultRenderLink2;
  return /* @__PURE__ */ jsxs14("div", { className: "flex min-h-screen bg-white dark:bg-gray-900", children: [
    /* @__PURE__ */ jsx22(AppBar, { position: "fixed", color: appBarColor, className: "shadow-none", children: /* @__PURE__ */ jsxs14("div", { className: "flex items-center justify-between px-4 py-2", children: [
      /* @__PURE__ */ jsxs14("h6", { className: "text-xl font-bold grow", children: [
        linkRenderer({
          href: titleHref,
          children: titleContent,
          className: "no-underline"
        }),
        titleSuffix
      ] }),
      /* @__PURE__ */ jsx22(
        "button",
        {
          className: "text-primary-main dark:text-white ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700",
          "aria-label": menuButtonLabel,
          onClick: () => setDrawerOpen(true),
          children: /* @__PURE__ */ jsx22(
            "svg",
            {
              className: "w-6 h-6",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: 1.5,
              stroke: "currentColor",
              children: /* @__PURE__ */ jsx22(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                }
              )
            }
          )
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx22(
      NavigationDrawer,
      {
        open: drawerOpen,
        onClose: () => setDrawerOpen(false),
        sections: drawerSections,
        onLogout,
        logoutLabel,
        width: drawerWidth,
        renderLink
      }
    ),
    /* @__PURE__ */ jsx22(
      "main",
      {
        className: cn(
          "grow pt-16 px-4 mb-6 sm:px-[10%] bg-white dark:bg-gray-900 text-black dark:text-white transition-colors min-h-[calc(100vh-4rem)] pb-[env(safe-area-inset-bottom)]",
          className
        ),
        children
      }
    )
  ] });
};

// src/components/templates/EmptyState/EmptyState.tsx
import { jsx as jsx23, jsxs as jsxs15 } from "react/jsx-runtime";
var EmptyState = ({
  icon,
  title,
  description,
  action,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsxs15(
    "div",
    {
      className: cn(
        "flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-[--kui-color-border] bg-[--kui-color-surface] px-6 py-10 text-center",
        className
      ),
      ...props,
      children: [
        icon ? /* @__PURE__ */ jsx23(
          "div",
          {
            className: "flex h-12 w-12 items-center justify-center text-[--kui-color-text-muted]",
            "aria-hidden": "true",
            children: icon
          }
        ) : null,
        /* @__PURE__ */ jsx23("h2", { className: "text-lg font-semibold text-[--kui-color-text]", children: title }),
        description ? /* @__PURE__ */ jsx23("p", { className: "max-w-md text-sm text-[--kui-color-text-muted]", children: description }) : null,
        action ? /* @__PURE__ */ jsx23("div", { className: "pt-1", children: action }) : null
      ]
    }
  );
};

// src/hooks/useClickOutside.ts
import { useEffect as useEffect3 } from "react";
function useClickOutside(ref, handler, enabled = true) {
  useEffect3(() => {
    if (!enabled) return;
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, handler, enabled]);
}

// src/hooks/useEscapeKey.ts
import { useEffect as useEffect4 } from "react";
function useEscapeKey(handler, enabled = true) {
  useEffect4(() => {
    if (!enabled) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handler();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handler, enabled]);
}

// src/hooks/useMediaQuery.ts
import { useEffect as useEffect5, useState as useState3 } from "react";
function useMediaQuery(query) {
  const [matches, setMatches] = useState3(false);
  useEffect5(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    const handler = (event) => {
      setMatches(event.matches);
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);
  return matches;
}
export {
  Alert,
  AppBar,
  AppLayout,
  Badge,
  Button,
  Checkbox,
  ConfirmDialog,
  Dialog,
  DrawerHeader,
  EmptyState,
  Input,
  ListItem,
  ListLayout,
  MonthSelector,
  NavigationDrawer,
  ProgressBar,
  Select,
  Spinner,
  StatCards,
  Textarea,
  ToggleSwitch,
  Tooltip,
  cn,
  useClickOutside,
  useEscapeKey,
  useMediaQuery
};
//# sourceMappingURL=index.js.map