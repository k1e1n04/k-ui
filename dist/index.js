"use client";

// src/utils/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/atoms/Typography/Typography.tsx
import { jsx } from "react/jsx-runtime";
var variantStyles = {
  "body-sm": {
    fontSize: "var(--kui-font-size-sm)",
    lineHeight: "var(--kui-line-height-normal)"
  },
  "body-md": {
    fontSize: "var(--kui-font-size-base)",
    lineHeight: "var(--kui-line-height-normal)"
  },
  "body-lg": {
    fontSize: "var(--kui-font-size-lg)",
    lineHeight: "var(--kui-line-height-relaxed)"
  },
  caption: {
    fontSize: "var(--kui-font-size-xs)",
    lineHeight: "var(--kui-line-height-normal)"
  },
  label: {
    fontSize: "var(--kui-font-size-sm)",
    lineHeight: "var(--kui-line-height-normal)"
  }
};
var toneStyles = {
  default: { color: "var(--kui-color-text)" },
  muted: { color: "var(--kui-color-text-muted)" },
  inverse: { color: "var(--kui-color-text-inverse)" },
  danger: { color: "var(--kui-color-danger)" },
  success: { color: "var(--kui-color-success)" },
  info: { color: "var(--kui-color-info)" },
  warning: { color: "var(--kui-color-warning)" }
};
var weightStyles = {
  normal: { fontWeight: "var(--kui-font-weight-normal)" },
  medium: { fontWeight: "var(--kui-font-weight-medium)" },
  semibold: { fontWeight: "var(--kui-font-weight-semibold)" },
  bold: { fontWeight: "var(--kui-font-weight-bold)" }
};
var variantDefaultWeight = {
  "body-sm": "normal",
  "body-md": "normal",
  "body-lg": "normal",
  caption: "normal",
  label: "medium"
};
var Typography = ({
  as = "p",
  variant = "body-md",
  tone = "default",
  weight,
  truncate = false,
  className,
  style,
  ...props
}) => {
  const Component = as;
  const resolvedWeight = weight ?? variantDefaultWeight[variant];
  return /* @__PURE__ */ jsx(
    Component,
    {
      className: cn(truncate && "truncate", className),
      style: {
        ...variantStyles[variant],
        ...toneStyles[tone],
        ...weightStyles[resolvedWeight],
        ...style
      },
      ...props
    }
  );
};

// src/components/atoms/Alert/Alert.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var variantStyles2 = {
  error: {
    backgroundColor: "var(--kui-color-danger-subtle)",
    borderColor: "var(--kui-color-danger)",
    borderLeftColor: "var(--kui-color-danger)",
    color: "var(--kui-color-danger)"
  },
  warning: {
    backgroundColor: "var(--kui-color-warning-subtle)",
    borderColor: "var(--kui-color-warning)",
    borderLeftColor: "var(--kui-color-warning)",
    color: "var(--kui-color-warning)"
  },
  info: {
    backgroundColor: "var(--kui-color-info-subtle)",
    borderColor: "var(--kui-color-info)",
    borderLeftColor: "var(--kui-color-info)",
    color: "var(--kui-color-info)"
  },
  success: {
    backgroundColor: "var(--kui-color-success-subtle)",
    borderColor: "var(--kui-color-success)",
    borderLeftColor: "var(--kui-color-success)",
    color: "var(--kui-color-success)"
  }
};
var variantToneMap = {
  error: "danger",
  warning: "warning",
  info: "info",
  success: "success"
};
var Alert = ({
  variant = "info",
  message,
  className,
  style,
  ...props
}) => {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      role: "alert",
      className: cn("rounded-md border border-l-4 px-4 py-3", className),
      style: { ...variantStyles2[variant], ...style },
      ...props,
      children: /* @__PURE__ */ jsx2(Typography, { as: "span", variant: "body-sm", tone: variantToneMap[variant], children: message })
    }
  );
};

// src/components/atoms/Avatar/Avatar.tsx
import { useState } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var sizeStyles = {
  small: "h-8 w-8 text-xs",
  medium: "h-10 w-10 text-sm",
  large: "h-14 w-14 text-base"
};
function Avatar({
  src,
  name = "",
  alt = name,
  size = "medium",
  shape = "circle",
  className
}) {
  const [failed, setFailed] = useState(false);
  const initials = name.trim().split(/\s+/).map((word) => word[0]).slice(0, 2).join("").toUpperCase() || "?";
  const common = cn(
    "inline-flex shrink-0 items-center justify-center overflow-hidden bg-secondary-light font-medium text-primary-main",
    sizeStyles[size],
    shape === "circle" ? "rounded-full" : "rounded-md",
    className
  );
  if (src && !failed)
    return /* @__PURE__ */ jsx3(
      "img",
      {
        src,
        alt,
        onError: () => setFailed(true),
        className: common
      }
    );
  return /* @__PURE__ */ jsx3("span", { role: "img", "aria-label": alt, className: common, children: initials });
}

// src/components/atoms/Badge/Badge.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var variantStyles3 = {
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
  return /* @__PURE__ */ jsx4(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded px-2 py-1 text-xs font-medium",
        variantStyles3[variant],
        className
      ),
      ...props,
      children
    }
  );
};

// src/components/atoms/Button/Button.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var variantStyles4 = {
  primary: "bg-primary-main hover:bg-primary-light text-inverse",
  secondary: "bg-secondary-light hover:bg-surface-sunken text-primary-main",
  success: "bg-success-main hover:opacity-90 text-inverse",
  info: "bg-info-main hover:opacity-90 text-inverse",
  outline: "bg-transparent border border-primary-main text-primary-main hover:bg-surface-sunken",
  ghost: "bg-transparent hover:bg-surface-sunken text-primary-main",
  danger: "bg-danger-main hover:opacity-90 text-inverse"
};
var sizeStyles2 = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-4 py-2",
  large: "text-base px-6 py-3"
};
var iconSizeStyles = {
  small: "p-1",
  medium: "p-2",
  large: "p-3"
};
var semanticToneStyles = {
  success: {
    plain: "bg-transparent text-success-main hover:bg-success-subtle",
    subtle: "bg-success-subtle text-success-main hover:opacity-90"
  },
  info: {
    plain: "bg-transparent text-info-main hover:bg-info-subtle",
    subtle: "bg-info-subtle text-info-main hover:opacity-90"
  },
  danger: {
    plain: "bg-transparent text-danger-main hover:bg-danger-subtle",
    subtle: "bg-danger-subtle text-danger-main hover:opacity-90"
  }
};
var isSemanticVariant = (variant) => {
  return variant === "success" || variant === "info" || variant === "danger";
};
var Button = ({
  variant = "primary",
  size = "medium",
  tone = "solid",
  fullWidth = false,
  iconOnly = false,
  disabled = false,
  className,
  children,
  ...props
}) => {
  const toneStyles4 = tone === "solid" || !isSemanticVariant(variant) ? variantStyles4[variant] : semanticToneStyles[variant][tone];
  return /* @__PURE__ */ jsx5(
    "button",
    {
      className: cn(
        "font-medium transition-colors",
        iconOnly ? "rounded-full" : "rounded-md",
        toneStyles4,
        iconOnly ? iconSizeStyles[size] : sizeStyles2[size],
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

// src/components/atoms/ButtonGroup/ButtonGroup.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
function ButtonGroup({
  orientation = "horizontal",
  fullWidth = false,
  className,
  children,
  ...props
}) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: ボタン群の任意の子要素を受け入れる視覚的グループ
    /* @__PURE__ */ jsx6(
      "div",
      {
        ...props,
        role: "group",
        className: cn(
          "inline-flex [&>button]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md",
          orientation === "vertical" && "flex-col [&>button:first-child]:rounded-t-md [&>button:first-child]:rounded-l-none [&>button:last-child]:rounded-b-md [&>button:last-child]:rounded-r-none",
          fullWidth && "flex w-full [&>button]:flex-1",
          className
        ),
        children
      }
    )
  );
}

// src/components/atoms/Card/Card.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
var paddingMap = {
  none: "",
  sm: "p-3",
  md: "p-6",
  lg: "p-8"
};
var shadowMap = {
  none: "",
  sm: "shadow-sm",
  md: "shadow"
};
var Card = ({
  padding = "md",
  shadow = "md",
  border = false,
  className,
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsx7(
    "div",
    {
      className: cn(
        "bg-surface rounded-lg",
        paddingMap[padding],
        shadowMap[shadow],
        border && "border border-border",
        className
      ),
      ...props,
      children
    }
  );
};

// src/components/atoms/Checkbox/Checkbox.tsx
import { useId } from "react";
import { jsx as jsx8, jsxs } from "react/jsx-runtime";
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
        /* @__PURE__ */ jsx8(
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
        /* @__PURE__ */ jsx8(
          "span",
          {
            "aria-hidden": "true",
            className: cn(
              "inline-flex items-center justify-center shrink-0 rounded border-2 transition-colors duration-150",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-info-main peer-focus-visible:ring-offset-2",
              boxSizeStyles[size],
              checked ? "bg-primary-main border-primary-main" : "bg-surface border-border-strong"
            ),
            children: checked && /* @__PURE__ */ jsx8(
              "svg",
              {
                viewBox: "0 0 12 12",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 2,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                className: cn("text-inverse", checkmarkSizeStyles[size]),
                children: /* @__PURE__ */ jsx8("polyline", { points: "2,6 5,9 10,3" })
              }
            )
          }
        ),
        label && /* @__PURE__ */ jsx8(
          "span",
          {
            className: cn("select-none text-foreground", labelSizeStyles[size]),
            children: label
          }
        )
      ]
    }
  );
};

// src/components/atoms/Chip/Chip.tsx
import { jsx as jsx9, jsxs as jsxs2 } from "react/jsx-runtime";
var styles = {
  default: "bg-surface-sunken text-foreground",
  primary: "bg-primary-light text-inverse",
  success: "bg-success-subtle text-success-main",
  info: "bg-info-subtle text-info-main",
  warning: "bg-warning-subtle text-warning-main",
  danger: "bg-danger-subtle text-danger-main"
};
function Chip({
  children,
  variant = "default",
  selected = false,
  onClick,
  onDelete,
  disabled = false,
  className
}) {
  const content = /* @__PURE__ */ jsx9("span", { className, children });
  const deleteButton = onDelete && /* @__PURE__ */ jsx9(
    "button",
    {
      type: "button",
      "aria-label": `Delete ${typeof children === "string" ? children : "chip"}`,
      onClick: onDelete,
      disabled,
      className: "ml-1 rounded text-current",
      children: "\xD7"
    }
  );
  if (onClick && onDelete)
    return /* @__PURE__ */ jsxs2(
      "span",
      {
        className: cn(
          "inline-flex items-center rounded-full px-3 py-1 text-sm",
          styles[variant],
          selected && "ring-2 ring-primary-main",
          disabled && "cursor-not-allowed opacity-50",
          className
        ),
        children: [
          /* @__PURE__ */ jsx9(
            "button",
            {
              type: "button",
              disabled,
              onClick,
              className: "inline-flex items-center",
              children: content
            }
          ),
          deleteButton
        ]
      }
    );
  if (onClick)
    return /* @__PURE__ */ jsx9(
      "span",
      {
        className: cn(
          "inline-flex items-center rounded-full px-3 py-1 text-sm",
          styles[variant],
          selected && "ring-2 ring-primary-main",
          disabled && "opacity-50",
          className
        ),
        children: /* @__PURE__ */ jsx9(
          "button",
          {
            type: "button",
            disabled,
            onClick,
            className: "inline-flex items-center",
            children: content
          }
        )
      }
    );
  return /* @__PURE__ */ jsxs2(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm",
        styles[variant],
        selected && "ring-2 ring-primary-main",
        disabled && "opacity-50",
        className
      ),
      children: [
        content,
        deleteButton
      ]
    }
  );
}

// src/components/atoms/Divider/Divider.tsx
import { jsx as jsx10, jsxs as jsxs3 } from "react/jsx-runtime";
function Divider({
  orientation = "horizontal",
  variant = "solid",
  label,
  className
}) {
  if (orientation === "vertical")
    return (
      // biome-ignore lint/a11y/useFocusableInteractive: 区切り線は非操作要素
      // biome-ignore lint/a11y/useSemanticElements: 縦方向区切り線を表現するため
      /* @__PURE__ */ jsx10(
        "div",
        {
          role: "separator",
          "aria-orientation": "vertical",
          "aria-valuenow": 0,
          className: cn(
            "self-stretch border-l border-border",
            variant === "dashed" && "border-dashed",
            className
          )
        }
      )
    );
  return (
    // biome-ignore lint/a11y/useFocusableInteractive: 区切り線は非操作要素
    // biome-ignore lint/a11y/useSemanticElements: ラベルを含む横方向区切り線を表現するため
    /* @__PURE__ */ jsxs3(
      "div",
      {
        role: "separator",
        "aria-orientation": "horizontal",
        "aria-valuenow": 0,
        className: cn("flex items-center gap-3", className),
        children: [
          /* @__PURE__ */ jsx10(
            "span",
            {
              className: cn(
                "flex-1 border-t border-border",
                variant === "dashed" && "border-dashed"
              )
            }
          ),
          label && /* @__PURE__ */ jsx10("span", { className: "text-sm text-muted", children: label }),
          label && /* @__PURE__ */ jsx10(
            "span",
            {
              className: cn(
                "flex-1 border-t border-border",
                variant === "dashed" && "border-dashed"
              )
            }
          )
        ]
      }
    )
  );
}

// src/components/atoms/DrawerHeader/DrawerHeader.tsx
import { jsx as jsx11 } from "react/jsx-runtime";
var DrawerHeader = ({
  children,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx11(
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

// src/components/atoms/FormField/FormField.tsx
import { useId as useId2 } from "react";
import { jsx as jsx12, jsxs as jsxs4 } from "react/jsx-runtime";
var labelSizeStyles2 = {
  small: "text-xs mb-1",
  medium: "text-sm mb-1",
  large: "text-base mb-1.5"
};
var descriptionSizeStyles = {
  small: "text-xs mb-1",
  medium: "text-xs mb-1",
  large: "text-sm mb-1.5"
};
var errorSizeStyles = {
  small: "text-xs mt-1",
  medium: "text-xs mt-1",
  large: "text-sm mt-1.5"
};
var FormField = ({
  label,
  description,
  required = false,
  error,
  htmlFor,
  size = "medium",
  className,
  "aria-describedby": ariaDescribedBy,
  children
}) => {
  const baseId = useId2();
  const descriptionId = `${baseId}-description`;
  const errorId = `${baseId}-error`;
  const describedBy = [
    ariaDescribedBy,
    description ? descriptionId : void 0,
    error ? errorId : void 0
  ].filter(Boolean).join(" ").trim();
  const content = typeof children === "function" ? children({
    describedBy: describedBy || void 0,
    descriptionId: description ? descriptionId : void 0,
    errorId: error ? errorId : void 0
  }) : children;
  return /* @__PURE__ */ jsxs4("div", { className: cn("flex flex-col", className), children: [
    label && /* @__PURE__ */ jsxs4(
      "label",
      {
        htmlFor,
        className: cn("font-medium text-foreground", labelSizeStyles2[size]),
        children: [
          label,
          required && /* @__PURE__ */ jsx12(
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
    description && /* @__PURE__ */ jsx12(
      "p",
      {
        id: descriptionId,
        className: cn("text-muted", descriptionSizeStyles[size]),
        children: description
      }
    ),
    content,
    error && /* @__PURE__ */ jsx12(
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

// src/components/atoms/Heading/Heading.tsx
import { jsx as jsx13 } from "react/jsx-runtime";
var sizeStyles3 = {
  xl: {
    fontSize: "var(--kui-font-size-2xl)",
    lineHeight: "var(--kui-line-height-tight)"
  },
  lg: {
    fontSize: "var(--kui-font-size-xl)",
    lineHeight: "var(--kui-line-height-tight)"
  },
  md: {
    fontSize: "var(--kui-font-size-lg)",
    lineHeight: "var(--kui-line-height-normal)"
  },
  sm: {
    fontSize: "var(--kui-font-size-base)",
    lineHeight: "var(--kui-line-height-normal)"
  }
};
var toneStyles2 = {
  default: { color: "var(--kui-color-text)" },
  muted: { color: "var(--kui-color-text-muted)" },
  inverse: { color: "var(--kui-color-text-inverse)" }
};
var Heading = ({
  as = "h2",
  size = "md",
  tone = "default",
  className,
  style,
  ...props
}) => {
  const Component = as;
  return /* @__PURE__ */ jsx13(
    Component,
    {
      className: cn(className),
      style: {
        fontWeight: "var(--kui-font-weight-semibold)",
        ...sizeStyles3[size],
        ...toneStyles2[tone],
        ...style
      },
      ...props
    }
  );
};

// src/components/atoms/Input/Input.tsx
import { useId as useId3 } from "react";
import { jsx as jsx14 } from "react/jsx-runtime";
var inputSizeStyles = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-3 py-2",
  large: "text-base px-4 py-2.5"
};
var Input = ({
  type = "text",
  label,
  required = false,
  placeholder,
  error,
  description,
  value,
  onChange,
  disabled = false,
  size = "medium",
  className,
  id,
  name,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  ...rest
}) => {
  const baseId = useId3();
  const inputId = id ?? `${baseId}-input`;
  const resolvedAriaInvalid = error ? true : ariaInvalid ?? false;
  if (type === "hidden") {
    return /* @__PURE__ */ jsx14(
      "input",
      {
        ...rest,
        type: "hidden",
        id,
        name,
        value,
        onChange: (e) => onChange?.(e.target.value)
      }
    );
  }
  return /* @__PURE__ */ jsx14(
    FormField,
    {
      label,
      description,
      required,
      error,
      size,
      className,
      htmlFor: inputId,
      "aria-describedby": ariaDescribedBy,
      children: ({ describedBy }) => /* @__PURE__ */ jsx14(
        "input",
        {
          ...rest,
          id: inputId,
          type,
          name,
          value,
          onChange: (e) => onChange?.(e.target.value),
          disabled,
          placeholder,
          required,
          "aria-invalid": resolvedAriaInvalid,
          "aria-describedby": describedBy,
          className: cn(
            "w-full rounded-md border bg-surface transition-colors duration-150",
            "text-foreground placeholder:text-muted",
            inputSizeStyles[size],
            error ? [
              "border-danger-main",
              "focus:outline-none focus:ring-2 focus:ring-danger-main focus:ring-offset-1"
            ] : [
              "border-border-strong",
              "focus:outline-none focus:ring-2 focus:ring-info-main focus:ring-offset-1"
            ],
            disabled && "cursor-not-allowed opacity-50"
          )
        }
      )
    }
  );
};

// src/components/atoms/NumberInput/NumberInput.tsx
import { useCallback, useId as useId4, useRef, useState as useState2 } from "react";
import { Fragment, jsx as jsx15, jsxs as jsxs5 } from "react/jsx-runtime";
var inputSizeStyles2 = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-3 py-2",
  large: "text-base px-4 py-2.5"
};
var suffixSizeStyles = {
  small: "text-xs pr-2",
  medium: "text-sm pr-3",
  large: "text-base pr-4"
};
var NumberInput = ({
  value,
  onValueChange,
  precision,
  min,
  max,
  step,
  suffix,
  allowNegative = false,
  emptyBehavior = "undefined",
  label,
  error,
  description,
  required = false,
  disabled = false,
  placeholder,
  size = "medium",
  className,
  id,
  name,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy
}) => {
  const baseId = useId4();
  const inputId = id ?? `${baseId}-number-input`;
  const resolvedAriaInvalid = error ? true : ariaInvalid ?? false;
  const inputRef = useRef(null);
  const formatValue = useCallback(
    (num) => {
      if (num === void 0) return "";
      if (precision !== void 0) {
        return num.toFixed(precision);
      }
      return String(num);
    },
    [precision]
  );
  const [displayValue, setDisplayValue] = useState2(() => formatValue(value));
  const [isFocused, setIsFocused] = useState2(false);
  const prevValueRef = useRef(value);
  if (prevValueRef.current !== value && !isFocused) {
    prevValueRef.current = value;
    setDisplayValue(formatValue(value));
  }
  const parseValue = useCallback(
    (str) => {
      const trimmed = str.trim();
      if (trimmed === "" || trimmed === "-") {
        return emptyBehavior === "zero" ? 0 : void 0;
      }
      const num = Number(trimmed);
      if (Number.isNaN(num)) {
        return emptyBehavior === "zero" ? 0 : void 0;
      }
      return num;
    },
    [emptyBehavior]
  );
  const clampValue = useCallback(
    (num) => {
      if (num === void 0) return void 0;
      let clamped = num;
      if (min !== void 0 && clamped < min) clamped = min;
      if (max !== void 0 && clamped > max) clamped = max;
      return clamped;
    },
    [min, max]
  );
  const isValidInput = useCallback(
    (str) => {
      if (str === "") return true;
      const pattern = allowNegative ? /^-?[0-9]*\.?[0-9]*$/ : /^[0-9]*\.?[0-9]*$/;
      return pattern.test(str);
    },
    [allowNegative]
  );
  const handleChange = (e) => {
    const raw = e.target.value;
    if (!isValidInput(raw)) return;
    setDisplayValue(raw);
    const parsed = parseValue(raw);
    const clamped = clampValue(parsed);
    onValueChange?.(clamped);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
    const parsed = parseValue(displayValue);
    const clamped = clampValue(parsed);
    setDisplayValue(formatValue(clamped));
    if (clamped !== parseValue(displayValue)) {
      onValueChange?.(clamped);
    }
    prevValueRef.current = clamped;
  };
  const hiddenValue = value !== void 0 ? String(value) : "";
  return /* @__PURE__ */ jsx15(
    FormField,
    {
      label,
      description,
      required,
      error,
      size,
      className,
      htmlFor: inputId,
      "aria-describedby": ariaDescribedBy,
      children: ({ describedBy }) => /* @__PURE__ */ jsxs5(Fragment, { children: [
        name && /* @__PURE__ */ jsx15("input", { type: "hidden", name, value: hiddenValue }),
        /* @__PURE__ */ jsxs5("div", { className: "relative flex items-center", children: [
          /* @__PURE__ */ jsx15(
            "input",
            {
              ref: inputRef,
              id: inputId,
              type: "text",
              inputMode: "decimal",
              value: displayValue,
              onChange: handleChange,
              onFocus: handleFocus,
              onBlur: handleBlur,
              disabled,
              placeholder,
              required,
              step,
              "aria-invalid": resolvedAriaInvalid,
              "aria-describedby": describedBy,
              className: cn(
                "w-full rounded-md border bg-surface transition-colors duration-150",
                "text-foreground placeholder:text-muted",
                inputSizeStyles2[size],
                suffix && "pr-0",
                error ? [
                  "border-danger-main",
                  "focus:outline-none focus:ring-2 focus:ring-danger-main focus:ring-offset-1"
                ] : [
                  "border-border-strong",
                  "focus:outline-none focus:ring-2 focus:ring-info-main focus:ring-offset-1"
                ],
                disabled && "cursor-not-allowed opacity-50"
              )
            }
          ),
          suffix && /* @__PURE__ */ jsx15(
            "span",
            {
              className: cn(
                "pointer-events-none shrink-0 text-muted",
                suffixSizeStyles[size]
              ),
              children: suffix
            }
          )
        ] })
      ] })
    }
  );
};

// src/components/atoms/PasswordInput/PasswordInput.tsx
import { useId as useId5, useState as useState3 } from "react";
import { jsx as jsx16, jsxs as jsxs6 } from "react/jsx-runtime";
function PasswordInput({
  value,
  onChange,
  label = "Password",
  description,
  error,
  showToggle = true,
  visibilityLabels = { show: "Show password", hide: "Hide password" },
  size = "medium",
  className,
  disabled = false,
  id,
  required = false,
  "aria-describedby": ariaDescribedBy,
  ...props
}) {
  const generatedId = useId5();
  const inputId = id ?? generatedId;
  const [visible, setVisible] = useState3(false);
  return /* @__PURE__ */ jsx16(
    FormField,
    {
      label,
      description,
      error,
      required,
      size,
      className,
      htmlFor: inputId,
      "aria-describedby": ariaDescribedBy,
      children: ({ describedBy }) => /* @__PURE__ */ jsxs6("div", { className: cn("relative", className), children: [
        /* @__PURE__ */ jsx16(
          "input",
          {
            ...props,
            id: inputId,
            type: visible ? "text" : "password",
            value,
            onChange: (event) => onChange?.(event.target.value),
            disabled,
            required,
            "aria-invalid": Boolean(error),
            "aria-describedby": describedBy,
            className: cn(
              "w-full rounded-md border border-border-strong bg-surface text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-info-main",
              error && "border-danger-main",
              disabled && "cursor-not-allowed opacity-50",
              showToggle && "pr-12"
            )
          }
        ),
        showToggle && /* @__PURE__ */ jsx16(
          "button",
          {
            type: "button",
            "aria-label": visible ? visibilityLabels.hide : visibilityLabels.show,
            disabled,
            onClick: () => setVisible((current) => !current),
            className: "absolute right-2 top-1/2 -translate-y-1/2 text-sm text-primary-main",
            children: visible ? "Hide" : "Show"
          }
        )
      ] })
    }
  );
}

// src/components/atoms/ProgressBar/ProgressBar.tsx
import { jsx as jsx17 } from "react/jsx-runtime";
var sizeStyles4 = {
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
  return /* @__PURE__ */ jsx17(
    "div",
    {
      role: "progressbar",
      "aria-valuenow": clampedValue,
      "aria-valuemin": 0,
      "aria-valuemax": safeMax,
      "aria-label": label,
      className: cn(
        "w-full overflow-hidden rounded-full bg-[var(--kui-color-info-subtle)]",
        sizeStyles4[size],
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx17(
        "div",
        {
          className: "h-full rounded-full bg-[var(--kui-color-info)] transition-all duration-500 ease-in-out",
          style: { width: `${progressPercentage}%` }
        }
      )
    }
  );
};

// src/components/atoms/RadioGroup/RadioGroup.tsx
import { useId as useId6 } from "react";
import { jsx as jsx18, jsxs as jsxs7 } from "react/jsx-runtime";
function RadioGroup({
  options,
  value,
  onChange,
  label,
  description,
  error,
  required = false,
  orientation = "vertical",
  size = "medium",
  disabled = false,
  name,
  className
}) {
  const id = useId6();
  return /* @__PURE__ */ jsx18(
    FormField,
    {
      label,
      description,
      error,
      required,
      size,
      className,
      children: ({ describedBy }) => /* @__PURE__ */ jsx18(
        "div",
        {
          role: "radiogroup",
          "aria-label": label,
          "aria-describedby": describedBy,
          className: cn(
            "flex gap-3",
            orientation === "vertical" && "flex-col",
            className
          ),
          children: options.map((option, index) => /* @__PURE__ */ jsxs7(
            "label",
            {
              className: cn(
                "inline-flex items-center gap-2 text-foreground",
                (disabled || option.disabled) && "cursor-not-allowed opacity-50"
              ),
              children: [
                /* @__PURE__ */ jsx18(
                  "input",
                  {
                    id: `${id}-${index}`,
                    name,
                    type: "radio",
                    value: option.value,
                    checked: value === option.value,
                    required,
                    disabled: disabled || option.disabled,
                    onChange: () => onChange(option.value),
                    "aria-invalid": Boolean(error),
                    "aria-describedby": describedBy,
                    className: "accent-primary-main"
                  }
                ),
                /* @__PURE__ */ jsx18("span", { children: option.label })
              ]
            },
            option.value
          ))
        }
      )
    }
  );
}

// src/components/atoms/SearchInput/SearchInput.tsx
import { jsx as jsx19, jsxs as jsxs8 } from "react/jsx-runtime";
var SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder = "Search...",
  className,
  disabled = false,
  clearButtonAriaLabel = "Clear search",
  ...rest
}) => {
  const hasValue = Boolean(value);
  const handleClear = () => {
    onChange?.("");
    onClear?.();
  };
  return /* @__PURE__ */ jsxs8("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ jsx19(
      "span",
      {
        className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsx19("svg", { className: "size-5", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx19(
          "path",
          {
            d: "M21 21L16.65 16.65M11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18Z",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsx19(
      "input",
      {
        ...rest,
        type: "text",
        value,
        onChange: (event) => onChange?.(event.target.value),
        disabled,
        placeholder,
        className: cn(
          "w-full rounded-md border bg-surface py-2 pl-10 transition-colors duration-150",
          "text-sm text-foreground placeholder:text-muted",
          hasValue ? "pr-10" : "pr-3",
          "border-border-strong",
          "focus:outline-none focus:ring-2 focus:ring-info-main focus:ring-offset-1",
          disabled && "cursor-not-allowed opacity-50"
        )
      }
    ),
    hasValue && !disabled && /* @__PURE__ */ jsx19(
      "button",
      {
        type: "button",
        "aria-label": clearButtonAriaLabel,
        onClick: handleClear,
        className: "absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted transition-colors hover:bg-surface-sunken hover:text-foreground",
        children: /* @__PURE__ */ jsx19(
          "svg",
          {
            className: "size-4",
            viewBox: "0 0 24 24",
            fill: "none",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsx19(
              "path",
              {
                d: "M18 6L6 18M6 6L18 18",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          }
        )
      }
    )
  ] });
};

// src/components/atoms/SegmentedControl/SegmentedControl.tsx
import { useRef as useRef2 } from "react";
import { jsx as jsx20 } from "react/jsx-runtime";
function SegmentedControl({
  options,
  value,
  onChange,
  fullWidth = false,
  disabled = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className
}) {
  const optionRefs = useRef2([]);
  const enabledIndexes = options.map((option, index) => !disabled && !option.disabled ? index : -1).filter((index) => index >= 0);
  const selectedIndex = options.findIndex(
    (option, index) => option.value === value && enabledIndexes.includes(index)
  );
  const focusIndex = selectedIndex >= 0 ? selectedIndex : enabledIndexes[0];
  const moveFocus = (index, direction) => {
    const currentIndex = enabledIndexes.indexOf(index);
    if (currentIndex < 0 || enabledIndexes.length === 0) return;
    const nextIndex = enabledIndexes[(currentIndex + direction + enabledIndexes.length) % enabledIndexes.length];
    const nextOption = options[nextIndex];
    onChange(nextOption.value);
    optionRefs.current[nextIndex]?.focus();
  };
  return /* @__PURE__ */ jsx20(
    "div",
    {
      role: "radiogroup",
      "aria-label": ariaLabel ?? (ariaLabelledBy ? void 0 : "Segmented control"),
      "aria-labelledby": ariaLabelledBy,
      className: cn(
        "inline-flex rounded-md bg-surface-sunken p-1",
        fullWidth && "w-full",
        className
      ),
      children: options.map((option, index) => (
        // biome-ignore lint/a11y/useSemanticElements: ボタン操作のセグメントをラジオグループとして公開する
        /* @__PURE__ */ jsx20(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": value === option.value,
            ref: (element) => {
              optionRefs.current[index] = element;
            },
            tabIndex: index === focusIndex ? 0 : -1,
            disabled: disabled || option.disabled,
            onClick: () => onChange(option.value),
            onKeyDown: (event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                moveFocus(index, 1);
              }
              if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                moveFocus(index, -1);
              }
            },
            className: cn(
              "rounded px-3 py-1.5 text-sm text-foreground",
              value === option.value && "bg-surface shadow-sm",
              fullWidth && "flex-1",
              (disabled || option.disabled) && "cursor-not-allowed opacity-50"
            ),
            children: option.label
          },
          option.value
        )
      ))
    }
  );
}

// src/components/atoms/Select/Select.tsx
import { useId as useId7 } from "react";
import { jsx as jsx21, jsxs as jsxs9 } from "react/jsx-runtime";
var selectSizeStyles = {
  small: "text-xs px-2 py-1 pr-7",
  medium: "text-sm px-3 py-2 pr-8",
  large: "text-base px-4 py-2.5 pr-10"
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
  description,
  placeholder,
  error,
  value,
  onChange,
  size = "medium",
  className,
  clearable = false,
  id,
  "aria-describedby": ariaDescribedBy,
  ...selectProps
}) => {
  const baseId = useId7();
  const selectId = id ?? `${baseId}-select`;
  const selectValueProps = value !== void 0 ? { value } : placeholder ? { defaultValue: "" } : {};
  return /* @__PURE__ */ jsx21(
    FormField,
    {
      label,
      description,
      required,
      error,
      size,
      className,
      htmlFor: selectId,
      "aria-describedby": ariaDescribedBy,
      children: ({ describedBy }) => /* @__PURE__ */ jsxs9("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs9(
          "select",
          {
            id: selectId,
            ...selectValueProps,
            onChange: (e) => onChange?.(e.target.value),
            required,
            ...selectProps,
            "aria-invalid": !!error,
            "aria-describedby": describedBy,
            className: cn(
              "w-full appearance-none rounded-md border bg-surface transition-colors duration-150",
              "text-foreground",
              selectSizeStyles[size],
              error ? [
                "border-danger-main",
                "focus:outline-none focus:ring-2 focus:ring-danger-main focus:ring-offset-1"
              ] : [
                "border-border-strong",
                "focus:outline-none focus:ring-2 focus:ring-info-main focus:ring-offset-1"
              ],
              selectProps.disabled && "cursor-not-allowed opacity-50"
            ),
            children: [
              placeholder && /* @__PURE__ */ jsx21("option", { value: "", disabled: !clearable, children: placeholder }),
              options.map((option) => /* @__PURE__ */ jsx21(
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
        /* @__PURE__ */ jsx21(
          "svg",
          {
            className: cn(
              "pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted",
              chevronSizeStyles[size],
              selectProps.disabled && "opacity-50"
            ),
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            viewBox: "0 0 24 24",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsx21(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M19 9l-7 7-7-7"
              }
            )
          }
        )
      ] })
    }
  );
};

// src/components/atoms/Skeleton/Skeleton.tsx
import { jsx as jsx22 } from "react/jsx-runtime";
function Skeleton({
  variant = "text",
  animation = "pulse",
  width,
  height,
  className
}) {
  return /* @__PURE__ */ jsx22(
    "output",
    {
      "aria-label": "Loading",
      style: { width, height },
      className: cn(
        "block bg-surface-sunken",
        variant === "text" && "h-4 w-full rounded",
        variant === "circular" && "h-10 w-10 rounded-full",
        variant === "rectangular" && "h-24 w-full rounded-md",
        animation === "pulse" && "animate-pulse",
        className
      )
    }
  );
}

// src/components/atoms/Slider/Slider.tsx
import { useId as useId8 } from "react";
import { jsx as jsx23, jsxs as jsxs10 } from "react/jsx-runtime";
function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  marks = false,
  label,
  description,
  error,
  disabled = false,
  className
}) {
  const id = useId8();
  const range = Array.isArray(value);
  const values = range ? value : [value];
  const update = (index, next) => {
    if (disabled) return;
    if (range) {
      const copy = [values[0], values[1]];
      copy[index] = next;
      onChange(copy);
    } else onChange(next);
  };
  return /* @__PURE__ */ jsx23(
    FormField,
    {
      label,
      description,
      error,
      className,
      htmlFor: `${id}-0`,
      children: ({ describedBy }) => /* @__PURE__ */ jsxs10("div", { className: cn("flex gap-2", className), children: [
        values.map((current, index) => /* @__PURE__ */ jsx23(
          "input",
          {
            id: `${id}-${index}`,
            type: "range",
            min,
            max,
            step,
            value: current,
            disabled,
            "aria-label": range ? `${label ?? "Range"} ${index + 1}` : label,
            "aria-describedby": describedBy,
            "aria-invalid": Boolean(error),
            onChange: (event) => update(index, Number(event.target.value)),
            className: cn(
              "w-full accent-primary-main",
              disabled && "cursor-not-allowed opacity-50"
            )
          },
          range ? index === 0 ? "minimum" : "maximum" : "value"
        )),
        marks && /* @__PURE__ */ jsx23("span", { "aria-hidden": "true", className: "sr-only", children: "marks" })
      ] })
    }
  );
}

// src/components/atoms/Spinner/Spinner.tsx
import { jsx as jsx24, jsxs as jsxs11 } from "react/jsx-runtime";
var sizeStyles5 = {
  small: "h-5 w-5",
  medium: "h-8 w-8",
  large: "h-12 w-12"
};
var Spinner = ({
  size = "medium",
  label,
  className
}) => {
  return /* @__PURE__ */ jsx24(
    "div",
    {
      className: cn(
        "flex items-center justify-center h-full min-h-[200px]",
        className
      ),
      children: /* @__PURE__ */ jsxs11("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx24(
          "div",
          {
            className: cn(
              "animate-spin rounded-full border-b-2 border-info-main mx-auto mb-2",
              sizeStyles5[size]
            )
          }
        ),
        label && /* @__PURE__ */ jsx24("p", { className: "text-muted text-sm", children: label })
      ] })
    }
  );
};

// src/components/atoms/Textarea/Textarea.tsx
import { useId as useId9 } from "react";
import { jsx as jsx25 } from "react/jsx-runtime";
var textareaSizeStyles = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-3 py-2",
  large: "text-base px-4 py-2.5"
};
var Textarea = ({
  label,
  required = false,
  error,
  description,
  value,
  onChange,
  size = "medium",
  rows = 3,
  className,
  id,
  "aria-describedby": ariaDescribedBy,
  ...textareaProps
}) => {
  const baseId = useId9();
  const textareaId = id ?? `${baseId}-textarea`;
  return /* @__PURE__ */ jsx25(
    FormField,
    {
      label,
      description,
      required,
      error,
      size,
      className,
      htmlFor: textareaId,
      "aria-describedby": ariaDescribedBy,
      children: ({ describedBy }) => /* @__PURE__ */ jsx25(
        "textarea",
        {
          id: textareaId,
          value,
          onChange: (e) => onChange?.(e.target.value),
          required,
          rows,
          ...textareaProps,
          "aria-invalid": !!error,
          "aria-describedby": describedBy,
          className: cn(
            "w-full rounded-md border bg-surface transition-colors duration-150",
            "text-foreground placeholder:text-muted",
            "resize-y",
            textareaSizeStyles[size],
            error ? [
              "border-danger-main",
              "focus:outline-none focus:ring-2 focus:ring-danger-main focus:ring-offset-1"
            ] : [
              "border-border-strong",
              "focus:outline-none focus:ring-2 focus:ring-info-main focus:ring-offset-1"
            ],
            textareaProps.disabled && "cursor-not-allowed opacity-50"
          )
        }
      )
    }
  );
};

// src/components/atoms/Toast/Toast.tsx
import { jsx as jsx26, jsxs as jsxs12 } from "react/jsx-runtime";
var toastStyles = {
  success: "border-success-main bg-success-subtle",
  info: "border-info-main bg-info-subtle",
  warning: "border-warning-main bg-warning-subtle",
  danger: "border-danger-main bg-danger-subtle"
};
function Toast({
  variant = "info",
  title,
  message,
  onDismiss,
  action,
  className,
  ...events
}) {
  return /* @__PURE__ */ jsxs12(
    "output",
    {
      ...events,
      className: cn(
        "flex min-w-72 items-start gap-3 rounded-md border p-3 text-foreground shadow-lg",
        toastStyles[variant],
        className
      ),
      children: [
        /* @__PURE__ */ jsxs12("div", { className: "flex-1", children: [
          title && /* @__PURE__ */ jsx26("p", { className: "font-medium", children: title }),
          message && /* @__PURE__ */ jsx26("p", { className: "text-sm", children: message }),
          action && /* @__PURE__ */ jsx26(
            "button",
            {
              type: "button",
              onClick: action.onClick,
              className: "mt-1 text-sm font-medium text-primary-main",
              children: action.label
            }
          )
        ] }),
        onDismiss && /* @__PURE__ */ jsx26(
          "button",
          {
            type: "button",
            "aria-label": "Dismiss notification",
            onClick: onDismiss,
            className: "text-foreground",
            children: "\xD7"
          }
        )
      ]
    }
  );
}

// src/components/atoms/ToggleSwitch/ToggleSwitch.tsx
import { jsx as jsx27, jsxs as jsxs13 } from "react/jsx-runtime";
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
var labelSizeStyles3 = {
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
  return /* @__PURE__ */ jsxs13(
    "label",
    {
      className: cn(
        "inline-flex items-center gap-2",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      ),
      children: [
        /* @__PURE__ */ jsx27(
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
        /* @__PURE__ */ jsx27(
          "div",
          {
            "aria-hidden": "true",
            className: cn(
              "relative inline-flex items-center rounded-full transition-colors duration-200",
              trackSizeStyles[size],
              checked ? "bg-primary-main" : "bg-border-strong"
            ),
            children: /* @__PURE__ */ jsx27(
              "span",
              {
                className: cn(
                  "inline-block rounded-full bg-surface shadow transform transition-transform duration-200",
                  thumbSizeStyles[size],
                  checked ? thumbTranslateStyles[size] : "translate-x-0.5"
                )
              }
            )
          }
        ),
        label && /* @__PURE__ */ jsx27(
          "span",
          {
            className: cn("select-none text-foreground", labelSizeStyles3[size]),
            children: label
          }
        )
      ]
    }
  );
};

// src/components/atoms/YearMonthInput/YearMonthInput.tsx
import { useId as useId10 } from "react";
import { jsx as jsx28, jsxs as jsxs14 } from "react/jsx-runtime";
var inputSizeStyles3 = {
  small: "text-xs px-2 py-1",
  medium: "text-sm px-3 py-2",
  large: "text-base px-4 py-2.5"
};
var clearButtonSizeStyles = {
  small: "text-xs w-5 h-5",
  medium: "text-sm w-6 h-6",
  large: "text-base w-7 h-7"
};
var YearMonthInput = ({
  value,
  onChange,
  min,
  max,
  allowClear = false,
  label,
  error,
  description,
  required = false,
  disabled = false,
  size = "medium",
  className,
  id,
  name,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy
}) => {
  const baseId = useId10();
  const inputId = id ?? `${baseId}-year-month-input`;
  const resolvedAriaInvalid = error ? true : ariaInvalid ?? false;
  const handleChange = (e) => {
    const val = e.target.value;
    onChange?.(val === "" ? void 0 : val);
  };
  const handleClear = () => {
    onChange?.(void 0);
  };
  const showClear = allowClear && !disabled && value;
  return /* @__PURE__ */ jsx28(
    FormField,
    {
      label,
      description,
      required,
      error,
      size,
      className,
      htmlFor: inputId,
      "aria-describedby": ariaDescribedBy,
      children: ({ describedBy }) => /* @__PURE__ */ jsxs14("div", { className: "relative flex items-center", children: [
        /* @__PURE__ */ jsx28(
          "input",
          {
            id: inputId,
            type: "month",
            name,
            value: value ?? "",
            onChange: handleChange,
            min,
            max,
            disabled,
            required,
            "aria-invalid": resolvedAriaInvalid,
            "aria-describedby": describedBy,
            className: cn(
              "w-full rounded-md border bg-surface transition-colors duration-150",
              "text-foreground",
              inputSizeStyles3[size],
              showClear && "pr-8",
              error ? [
                "border-danger-main",
                "focus:outline-none focus:ring-2 focus:ring-danger-main focus:ring-offset-1"
              ] : [
                "border-border-strong",
                "focus:outline-none focus:ring-2 focus:ring-info-main focus:ring-offset-1"
              ],
              disabled && "cursor-not-allowed opacity-50"
            )
          }
        ),
        showClear && /* @__PURE__ */ jsx28(
          "button",
          {
            type: "button",
            onClick: handleClear,
            "aria-label": "Clear",
            className: cn(
              "absolute right-1 flex items-center justify-center rounded-full",
              "text-muted hover:text-foreground hover:bg-surface-sunken",
              "transition-colors duration-150",
              clearButtonSizeStyles[size]
            ),
            children: "\xD7"
          }
        )
      ] })
    }
  );
};

// src/components/molecules/Accordion/Accordion.tsx
import { useId as useId11, useRef as useRef3, useState as useState4 } from "react";
import { jsx as jsx29, jsxs as jsxs15 } from "react/jsx-runtime";
var Accordion = (props) => {
  const { items, className } = props;
  const type = props.type ?? "single";
  const isMultiple = type === "multiple";
  const isControlled = props.value !== void 0;
  const [uncontrolledValue, setUncontrolledValue] = useState4(
    () => props.defaultValue ?? (isMultiple ? [] : "")
  );
  const value = isControlled ? props.value : uncontrolledValue;
  const openValues = isMultiple ? Array.isArray(value) ? value : [] : typeof value === "string" && value ? [value] : [];
  const baseId = useId11();
  const triggers = useRef3([]);
  const moveFocus = (index, direction) => {
    let next = index;
    for (let count = 0; count < items.length; count += 1) {
      next = (next + direction + items.length) % items.length;
      if (!items[next]?.disabled) {
        triggers.current[next]?.focus();
        return;
      }
    }
  };
  const setOpenValues = (next) => {
    if (!isControlled) setUncontrolledValue(next);
    props.onValueChange?.(next);
  };
  return /* @__PURE__ */ jsx29(
    "div",
    {
      className: cn("divide-y divide-border border-y border-border", className),
      children: items.map((item, index) => {
        const isOpen = openValues.includes(item.value);
        const triggerId = `${baseId}-${item.value}-trigger`;
        const panelId = `${baseId}-${item.value}-panel`;
        return /* @__PURE__ */ jsxs15("div", { children: [
          /* @__PURE__ */ jsx29("h3", { children: /* @__PURE__ */ jsxs15(
            "button",
            {
              ref: (element) => {
                triggers.current[index] = element;
              },
              id: triggerId,
              type: "button",
              disabled: item.disabled,
              "aria-expanded": isOpen,
              "aria-controls": panelId,
              onClick: () => {
                if (isMultiple) {
                  setOpenValues(
                    isOpen ? openValues.filter(
                      (valueItem) => valueItem !== item.value
                    ) : [...openValues, item.value]
                  );
                  return;
                }
                setOpenValues(isOpen ? "" : item.value);
              },
              onKeyDown: (event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  moveFocus(index, 1);
                }
                if (event.key === "ArrowUp") {
                  event.preventDefault();
                  moveFocus(index, -1);
                }
                if (event.key === "Home") {
                  event.preventDefault();
                  const first = items.findIndex(
                    (candidate) => !candidate.disabled
                  );
                  if (first !== -1) triggers.current[first]?.focus();
                }
                if (event.key === "End") {
                  event.preventDefault();
                  let last = -1;
                  for (let itemIndex = items.length - 1; itemIndex >= 0; itemIndex -= 1) {
                    if (!items[itemIndex]?.disabled) {
                      last = itemIndex;
                      break;
                    }
                  }
                  if (last !== -1) triggers.current[last]?.focus();
                }
              },
              className: "flex w-full items-center justify-between gap-4 px-4 py-3 text-left font-medium text-foreground hover:bg-surface-sunken focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-main disabled:cursor-not-allowed disabled:opacity-50",
              children: [
                item.title,
                /* @__PURE__ */ jsx29("span", { "aria-hidden": "true", className: "text-muted", children: isOpen ? "\u2212" : "+" })
              ]
            }
          ) }),
          isOpen && /* @__PURE__ */ jsx29(
            "section",
            {
              id: panelId,
              "aria-labelledby": triggerId,
              className: "px-4 pb-4 text-foreground",
              children: item.content
            }
          )
        ] }, item.value);
      })
    }
  );
};

// src/components/molecules/AppBar/AppBar.tsx
import { jsx as jsx30 } from "react/jsx-runtime";
var positionStyles = {
  fixed: "fixed top-0 left-0 right-0",
  static: "static",
  absolute: "absolute",
  relative: "relative",
  sticky: "sticky top-0"
};
var colorStyles = {
  primary: "bg-primary-main text-inverse",
  secondary: "bg-secondary-main text-primary-main",
  success: "bg-success-main text-inverse",
  transparent: "bg-transparent"
};
var AppBar = ({
  position = "static",
  color = "primary",
  className,
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsx30(
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

// src/components/molecules/AvatarGroup/AvatarGroup.tsx
import { jsx as jsx31, jsxs as jsxs16 } from "react/jsx-runtime";
function AvatarGroup({ avatars, max, className }) {
  const visible = max === void 0 ? avatars : avatars.slice(0, max);
  const remaining = Math.max(0, avatars.length - visible.length);
  return /* @__PURE__ */ jsxs16("fieldset", { "aria-label": "Avatars", className: cn("flex -space-x-2", className), children: [
    visible.map((avatar) => /* @__PURE__ */ jsx31(
      Avatar,
      {
        ...avatar,
        className: cn("ring-2 ring-surface", avatar.className)
      },
      `${avatar.src ?? ""}-${avatar.name ?? ""}`
    )),
    remaining > 0 && /* @__PURE__ */ jsxs16("span", { className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-sunken text-sm text-foreground ring-2 ring-surface", children: [
      "+",
      remaining
    ] })
  ] });
}

// src/components/molecules/DropdownMenu/DropdownMenu.tsx
import {
  cloneElement as cloneElement2,
  isValidElement as isValidElement2,
  useRef as useRef6,
  useState as useState7
} from "react";

// src/components/molecules/Popover/Popover.tsx
import {
  cloneElement,
  isValidElement,
  useEffect as useEffect4,
  useRef as useRef5,
  useState as useState6
} from "react";
import { createPortal } from "react-dom";

// src/hooks/useEscapeKey.ts
import { useEffect } from "react";
function useEscapeKey(handler, enabled = true) {
  useEffect(() => {
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

// src/hooks/useFloatingElement.ts
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating
} from "@floating-ui/react-dom";
import { useMemo } from "react";
var isMiddleware = (value) => typeof value === "object" && value !== null && "fn" in value;
function useFloatingElement(options = {}) {
  const {
    placement = "bottom-start",
    offset: offsetValue = 8,
    flip: enableFlip = true,
    shift: shiftOption,
    autoUpdate: enableAutoUpdate = true
  } = options;
  const middleware = useMemo(() => {
    const shiftMiddleware = shiftOption === false ? [] : isMiddleware(shiftOption) ? [shiftOption] : [
      shift(
        shiftOption === true || shiftOption === void 0 ? { padding: 8 } : shiftOption
      )
    ];
    return [
      offset(offsetValue),
      ...enableFlip ? [flip()] : [],
      ...shiftMiddleware
    ];
  }, [enableFlip, offsetValue, shiftOption]);
  const { floatingStyles, refs, update } = useFloating({
    middleware,
    placement,
    whileElementsMounted: enableAutoUpdate ? autoUpdate : void 0
  });
  return {
    floatingRef: refs.setFloating,
    floatingStyles,
    referenceRef: refs.setReference,
    update
  };
}

// src/hooks/useFocusTrap.ts
import { useEffect as useEffect2, useRef as useRef4 } from "react";
var focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
].join(",");
var getFocusableElements = (container) => Array.from(container.querySelectorAll(focusableSelector)).filter(
  (element) => !element.hasAttribute("disabled") && !element.hidden
);
function useFocusTrap(containerRef, active, options = {}) {
  const previouslyFocusedElementRef = useRef4(null);
  const { initialFocusRef, returnFocusOnDeactivate = true } = options;
  useEffect2(() => {
    if (!active || typeof document === "undefined") return;
    previouslyFocusedElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const container = containerRef.current;
    const initialFocusElement = initialFocusRef?.current;
    const focusableElements = container ? getFocusableElements(container) : [];
    if (initialFocusElement && container?.contains(initialFocusElement)) {
      initialFocusElement.focus();
    } else {
      const firstFocusableElement = focusableElements[0];
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      } else if (container) {
        container.tabIndex = -1;
        container.focus();
      }
    }
    const handleKeyDown = (event) => {
      if (event.key !== "Tab" || !containerRef.current) return;
      const elements = getFocusableElements(containerRef.current);
      if (elements.length === 0) {
        event.preventDefault();
        containerRef.current.tabIndex = -1;
        containerRef.current.focus();
        return;
      }
      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];
      const activeElement = document.activeElement;
      if (event.shiftKey && (activeElement === firstElement || !containerRef.current.contains(activeElement))) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && (activeElement === lastElement || !containerRef.current.contains(activeElement))) {
        event.preventDefault();
        firstElement.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (returnFocusOnDeactivate) {
        previouslyFocusedElementRef.current?.focus();
      }
    };
  }, [active, containerRef, initialFocusRef, returnFocusOnDeactivate]);
}

// src/hooks/usePortalContainer.ts
import { useEffect as useEffect3, useState as useState5 } from "react";
var hookCreatedPortalContainer = null;
var portalContainerLeaseCount = 0;
function usePortalContainer(providedContainer) {
  const [container, setContainer] = useState5(
    providedContainer ?? null
  );
  useEffect3(() => {
    if (providedContainer) {
      setContainer(providedContainer);
      return;
    }
    if (typeof document === "undefined") return;
    const existingContainer = document.getElementById("kui-portal-root");
    const portalContainer = existingContainer ?? document.createElement("div");
    const isHookCreatedContainer = portalContainer === hookCreatedPortalContainer || !existingContainer;
    if (!existingContainer) {
      portalContainer.id = "kui-portal-root";
      document.body.append(portalContainer);
      hookCreatedPortalContainer = portalContainer;
    }
    setContainer(portalContainer);
    if (!isHookCreatedContainer) return;
    portalContainerLeaseCount += 1;
    return () => {
      portalContainerLeaseCount -= 1;
      if (portalContainerLeaseCount === 0 && hookCreatedPortalContainer === portalContainer) {
        portalContainer.remove();
        hookCreatedPortalContainer = null;
      }
    };
  }, [providedContainer]);
  return container;
}

// src/components/molecules/Popover/Popover.tsx
import { Fragment as Fragment2, jsx as jsx32, jsxs as jsxs17 } from "react/jsx-runtime";
var Popover = ({
  trigger,
  children,
  open: controlledOpen,
  onOpenChange,
  placement = "bottom-start",
  closeOnOutsideClick = true,
  closeOnEscape = true,
  className
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState6(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const triggerRef = useRef5(null);
  const contentRef = useRef5(null);
  const portalContainer = usePortalContainer();
  const { referenceRef, floatingRef, floatingStyles } = useFloatingElement({
    placement
  });
  useFocusTrap(contentRef, open);
  const setOpen = (nextOpen) => {
    if (controlledOpen === void 0) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
    if (!nextOpen) triggerRef.current?.focus();
  };
  useEscapeKey(() => setOpen(false), open && closeOnEscape);
  useEffect4(() => {
    if (!open || !closeOnOutsideClick) return;
    const onPointerDown = (event) => {
      const target = event.target;
      if (!triggerRef.current?.contains(target) && !contentRef.current?.contains(target))
        setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  });
  if (!isValidElement(trigger)) return null;
  const triggerElement = cloneElement(
    trigger,
    {
      "aria-expanded": open,
      "aria-haspopup": "dialog",
      onClick: (event) => {
        trigger.props.onClick?.(event);
        if (!event.defaultPrevented) setOpen(!open);
      },
      ref: (element) => {
        triggerRef.current = element;
        referenceRef(element);
      }
    }
  );
  return /* @__PURE__ */ jsxs17(Fragment2, { children: [
    triggerElement,
    open && portalContainer && createPortal(
      /* @__PURE__ */ jsx32(
        "div",
        {
          ref: (element) => {
            contentRef.current = element;
            floatingRef(element);
          },
          role: "dialog",
          className: cn(
            "z-[var(--kui-z-popover)] min-w-48 rounded-md border border-border bg-surface p-3 text-foreground shadow-lg",
            className
          ),
          style: floatingStyles,
          children
        }
      ),
      portalContainer
    )
  ] });
};

// src/components/molecules/DropdownMenu/DropdownMenu.tsx
import { jsx as jsx33 } from "react/jsx-runtime";
var DropdownMenu = ({
  trigger,
  items,
  onSelect,
  renderLink,
  className
}) => {
  const [open, setOpen] = useState7(false);
  const [activeIndex, setActiveIndex] = useState7(
    () => items.findIndex((item) => !item.disabled)
  );
  const refs = useRef6([]);
  const findEnabledIndex = (start, direction) => {
    if (items.length === 0) return -1;
    let next = start;
    for (let count = 0; count < items.length; count += 1) {
      next = (next + direction + items.length) % items.length;
      if (!items[next].disabled) return next;
    }
    return -1;
  };
  const focusIndex = (next) => {
    setActiveIndex(next);
    refs.current[next]?.focus();
  };
  const move = (direction) => {
    const next = findEnabledIndex(activeIndex, direction);
    if (next !== -1) focusIndex(next);
  };
  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen);
    if (nextOpen) {
      const firstEnabledIndex = findEnabledIndex(-1, 1);
      if (firstEnabledIndex !== -1) setActiveIndex(firstEnabledIndex);
    }
  };
  const select = (item) => {
    if (!item.disabled) {
      onSelect?.(item.value);
      setOpen(false);
    }
  };
  return /* @__PURE__ */ jsx33(
    Popover,
    {
      trigger,
      open,
      onOpenChange: handleOpenChange,
      className: cn("p-1", className),
      children: /* @__PURE__ */ jsx33(
        "div",
        {
          role: "menu",
          onKeyDown: (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              move(1);
            }
            if (event.key === "ArrowUp") {
              event.preventDefault();
              move(-1);
            }
            if (event.key === "Home") {
              event.preventDefault();
              const firstEnabledIndex = findEnabledIndex(-1, 1);
              if (firstEnabledIndex !== -1) focusIndex(firstEnabledIndex);
            }
            if (event.key === "End") {
              event.preventDefault();
              const lastEnabledIndex = findEnabledIndex(0, -1);
              if (lastEnabledIndex !== -1) focusIndex(lastEnabledIndex);
            }
          },
          children: items.map((item, index) => {
            const itemClassName = "block w-full rounded px-3 py-2 text-left text-sm hover:bg-surface-sunken focus:bg-surface-sunken focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";
            const itemProps = {
              onFocus: () => setActiveIndex(index),
              onClick: (event) => {
                if (!event.defaultPrevented) select(item);
              },
              ref: (element) => {
                refs.current[index] = element;
              },
              role: "menuitem",
              tabIndex: index === activeIndex ? 0 : -1
            };
            if (item.href && renderLink) {
              const renderedLink = renderLink({
                href: item.href,
                children: item.label,
                className: itemClassName
              });
              if (isValidElement2(renderedLink)) {
                const originalOnClick = renderedLink.props.onClick;
                return cloneElement2(
                  renderedLink,
                  {
                    ...itemProps,
                    key: item.value,
                    onClick: (event) => {
                      originalOnClick?.(event);
                      if (!event.defaultPrevented) select(item);
                    }
                  }
                );
              }
            }
            return /* @__PURE__ */ jsx33(
              "button",
              {
                ref: itemProps.ref,
                type: "button",
                role: "menuitem",
                tabIndex: itemProps.tabIndex,
                disabled: item.disabled,
                onFocus: itemProps.onFocus,
                onClick: itemProps.onClick,
                className: itemClassName,
                children: item.label
              },
              item.value
            );
          })
        }
      )
    }
  );
};

// src/components/molecules/Breadcrumb/Breadcrumb.tsx
import { Fragment as Fragment3, jsx as jsx34, jsxs as jsxs18 } from "react/jsx-runtime";
var defaultRenderLink = ({
  href,
  children,
  className
}) => /* @__PURE__ */ jsx34("a", { href, className, children });
var Breadcrumb = ({
  items,
  maxItems,
  separator = "/",
  renderLink = defaultRenderLink,
  className
}) => {
  const resolvedMaxItems = maxItems ?? items.length;
  const collapsed = items.length > resolvedMaxItems ? items.slice(1, items.length - (resolvedMaxItems - 1)) : [];
  const visible = collapsed.length ? [items[0], ...items.slice(items.length - (resolvedMaxItems - 1))] : items;
  const renderItem = (item, index, total) => /* @__PURE__ */ jsxs18("span", { children: [
    index > 0 && /* @__PURE__ */ jsx34("span", { "aria-hidden": "true", className: "px-2 text-muted", children: separator }),
    item.href && index < total - 1 ? renderLink({
      href: item.href,
      className: "text-muted hover:text-foreground",
      children: item.label
    }) : /* @__PURE__ */ jsx34("span", { "aria-current": index === total - 1 ? "page" : void 0, children: item.label })
  ] }, `${String(item.label)}-${index}`);
  return /* @__PURE__ */ jsx34("nav", { "aria-label": "\u30D1\u30F3\u304F\u305A", className, children: /* @__PURE__ */ jsx34("ol", { className: "flex items-center text-sm", children: collapsed.length ? /* @__PURE__ */ jsxs18(Fragment3, { children: [
    /* @__PURE__ */ jsx34("li", { children: renderItem(visible[0], 0, visible.length) }),
    /* @__PURE__ */ jsxs18("li", { children: [
      /* @__PURE__ */ jsx34("span", { "aria-hidden": "true", className: "px-2 text-muted", children: separator }),
      /* @__PURE__ */ jsx34(
        DropdownMenu,
        {
          trigger: /* @__PURE__ */ jsx34(
            "button",
            {
              type: "button",
              "aria-label": "\u7701\u7565\u3057\u305F\u30D1\u30F3\u304F\u305A",
              className: "rounded px-1 hover:bg-surface-sunken",
              children: "\u2026"
            }
          ),
          items: collapsed.map((item, index) => ({
            href: item.href,
            label: item.label,
            value: String(index)
          })),
          renderLink
        }
      )
    ] }),
    visible.slice(1).map((item, index) => /* @__PURE__ */ jsx34("li", { children: renderItem(item, index + 1, visible.length) }, String(item.label)))
  ] }) : visible.map((item, index) => /* @__PURE__ */ jsx34("li", { children: renderItem(item, index, visible.length) }, String(item.label))) }) });
};

// src/components/molecules/Calendar/Calendar.tsx
import { useEffect as useEffect5, useState as useState8 } from "react";
import { jsx as jsx35, jsxs as jsxs19 } from "react/jsx-runtime";
var weekLabels = ["\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F"];
var toDateKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
var toMonthDate = (value) => value ? /* @__PURE__ */ new Date(`${value}T00:00:00`) : /* @__PURE__ */ new Date();
var Calendar = ({
  value,
  onChange,
  defaultMonth,
  minDate,
  maxDate,
  disabledDate,
  weekStartsOn = 0,
  className
}) => {
  const [month, setMonth] = useState8(() => toMonthDate(value ?? defaultMonth));
  useEffect5(() => {
    if (value) setMonth(toMonthDate(value));
  }, [value]);
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const offset2 = (firstDay.getDay() - weekStartsOn + 7) % 7;
  const days = Array.from(
    { length: 42 },
    (_, index) => new Date(year, monthIndex, index - offset2 + 1)
  );
  const isDisabled = (key) => Boolean(
    minDate && key < minDate || maxDate && key > maxDate || disabledDate?.(key)
  );
  const canMove = (delta) => {
    const target = new Date(year, monthIndex + delta, 1);
    const start = `${target.getFullYear()}-${String(target.getMonth() + 1).padStart(2, "0")}-01`;
    const end = `${target.getFullYear()}-${String(target.getMonth() + 1).padStart(2, "0")}-31`;
    return !(minDate && end < minDate) && !(maxDate && start > maxDate);
  };
  const labels = Array.from(
    { length: 7 },
    (_, index) => weekLabels[(index + weekStartsOn) % 7]
  );
  return /* @__PURE__ */ jsxs19(
    "div",
    {
      className: cn("w-72 rounded-md bg-surface text-foreground", className),
      children: [
        /* @__PURE__ */ jsxs19("div", { className: "mb-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx35(
            "button",
            {
              type: "button",
              "aria-label": "\u524D\u306E\u6708",
              disabled: !canMove(-1),
              onClick: () => setMonth(new Date(year, monthIndex - 1, 1)),
              className: "rounded p-2 hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-50",
              children: "\u2039"
            }
          ),
          /* @__PURE__ */ jsxs19("span", { className: "font-medium", children: [
            year,
            "\u5E74",
            monthIndex + 1,
            "\u6708"
          ] }),
          /* @__PURE__ */ jsx35(
            "button",
            {
              type: "button",
              "aria-label": "\u6B21\u306E\u6708",
              disabled: !canMove(1),
              onClick: () => setMonth(new Date(year, monthIndex + 1, 1)),
              className: "rounded p-2 hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-50",
              children: "\u203A"
            }
          )
        ] }),
        /* @__PURE__ */ jsx35("div", { className: "grid grid-cols-7 text-center text-xs text-muted", children: labels.map((label) => /* @__PURE__ */ jsx35("span", { className: "py-1", children: label }, label)) }),
        /* @__PURE__ */ jsx35("div", { className: "grid grid-cols-7 gap-1", children: days.map((date) => {
          const key = toDateKey(date);
          const outside = date.getMonth() !== monthIndex;
          const disabled = isDisabled(key);
          return /* @__PURE__ */ jsx35(
            "button",
            {
              type: "button",
              "aria-label": key,
              "aria-pressed": key === value,
              disabled,
              onClick: () => !disabled && onChange(key),
              className: cn(
                "rounded p-2 text-sm transition-colors hover:bg-surface-sunken focus:outline-none focus:ring-2 focus:ring-info-main",
                outside && "text-muted",
                key === value && "bg-primary-main text-inverse hover:bg-primary-main",
                disabled && "cursor-not-allowed opacity-40 hover:bg-transparent"
              ),
              children: date.getDate()
            },
            key
          );
        }) })
      ]
    }
  );
};

// src/components/molecules/Combobox/Combobox.tsx
import {
  useCallback as useCallback2,
  useEffect as useEffect6,
  useId as useId12,
  useMemo as useMemo2,
  useRef as useRef7,
  useState as useState9
} from "react";
import { jsx as jsx36, jsxs as jsxs20 } from "react/jsx-runtime";
var Combobox = ({
  options,
  value,
  onChange,
  onQuery,
  multiple = false,
  placeholder = "\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044",
  disabled = false,
  className
}) => {
  const [query, setQuery] = useState9("");
  const [open, setOpen] = useState9(false);
  const [activeIndex, setActiveIndex] = useState9(null);
  const rootRef = useRef7(null);
  const listId = useId12();
  const closeOptions = useCallback2(() => {
    setOpen(false);
    setActiveIndex(null);
  }, []);
  const selected = multiple ? Array.isArray(value) ? value : [] : typeof value === "string" ? value : "";
  const selectedOptions = options.filter(
    (option) => multiple ? selected.includes(option.value) : selected === option.value
  );
  const selectedSingleLabel = multiple ? "" : selectedOptions[0]?.label ?? "";
  useEffect6(() => {
    if (multiple) return;
    setQuery(selectedSingleLabel);
  }, [multiple, selectedSingleLabel]);
  useEffect6(() => {
    const closeOnOutsidePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        closeOptions();
      }
    };
    document.addEventListener("pointerdown", closeOnOutsidePointerDown);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointerDown);
  }, [closeOptions]);
  const filtered = useMemo2(
    () => options.filter(
      (option) => option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    ),
    [options, query]
  );
  const choose = (option) => {
    if (option.disabled) return;
    if (multiple) {
      const current = selected;
      onChange(
        current.includes(option.value) ? current.filter((item) => item !== option.value) : [...current, option.value]
      );
    } else {
      onChange(option.value);
      setQuery(option.label);
      closeOptions();
    }
  };
  const activateNextOption = () => {
    for (let offset2 = 1; offset2 <= filtered.length; offset2 += 1) {
      const nextIndex = ((activeIndex ?? -1) + offset2) % filtered.length;
      if (!filtered[nextIndex].disabled) {
        setActiveIndex(nextIndex);
        return;
      }
    }
  };
  const activatePreviousOption = () => {
    for (let offset2 = 1; offset2 <= filtered.length; offset2 += 1) {
      const previousIndex = ((activeIndex ?? 0) - offset2 + filtered.length) % filtered.length;
      if (!filtered[previousIndex].disabled) {
        setActiveIndex(previousIndex);
        return;
      }
    }
  };
  return /* @__PURE__ */ jsxs20("div", { ref: rootRef, className: cn("relative", className), children: [
    multiple && selectedOptions.length > 0 && /* @__PURE__ */ jsx36("div", { className: "mb-1 flex flex-wrap gap-1", children: selectedOptions.map((option) => /* @__PURE__ */ jsx36(
      "span",
      {
        className: "rounded bg-surface-sunken px-2 py-1 text-xs text-foreground",
        children: option.label
      },
      option.value
    )) }),
    /* @__PURE__ */ jsx36(
      "input",
      {
        role: "combobox",
        "aria-controls": listId,
        "aria-expanded": open,
        "aria-autocomplete": "list",
        "aria-haspopup": "listbox",
        "aria-activedescendant": activeIndex === null ? void 0 : `${listId}-option-${activeIndex}`,
        disabled,
        placeholder,
        value: query,
        onFocus: () => setOpen(true),
        onChange: (event) => {
          setQuery(event.target.value);
          setActiveIndex(null);
          setOpen(true);
          onQuery?.(event.target.value);
        },
        onKeyDown: (event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeOptions();
          }
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            activateNextOption();
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
            activatePreviousOption();
          }
          if (event.key === "Enter" && activeIndex !== null) {
            event.preventDefault();
            choose(filtered[activeIndex]);
          }
        },
        className: "w-full rounded-md border border-border-strong bg-surface px-3 py-2 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-info-main disabled:cursor-not-allowed disabled:opacity-50"
      }
    ),
    open && /* @__PURE__ */ jsxs20(
      "div",
      {
        id: listId,
        role: "listbox",
        className: "absolute z-[var(--kui-z-popover)] mt-1 max-h-56 w-full overflow-auto rounded-md border border-border bg-surface p-1 shadow-lg",
        children: [
          filtered.map((option, index) => {
            const selectedOption = multiple ? selected.includes(option.value) : selected === option.value;
            return /* @__PURE__ */ jsx36(
              "button",
              {
                id: `${listId}-option-${index}`,
                type: "button",
                role: "option",
                "aria-selected": selectedOption,
                "data-active": activeIndex === index || void 0,
                disabled: option.disabled,
                onClick: () => choose(option),
                className: cn(
                  "block w-full cursor-pointer rounded px-3 py-2 text-left text-sm hover:bg-surface-sunken",
                  option.disabled && "cursor-not-allowed opacity-50",
                  selectedOption && "bg-surface-sunken"
                ),
                children: option.label
              },
              option.value
            );
          }),
          filtered.length === 0 && /* @__PURE__ */ jsx36("p", { className: "px-3 py-2 text-sm text-muted", children: "\u5019\u88DC\u304C\u3042\u308A\u307E\u305B\u3093" })
        ]
      }
    )
  ] });
};

// src/components/molecules/Dialog/Dialog.tsx
import { useEffect as useEffect7, useId as useId13, useRef as useRef8 } from "react";
import { jsx as jsx37, jsxs as jsxs21 } from "react/jsx-runtime";
var maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl"
};
var activeDialogScrollLocks = 0;
var originalBodyOverflow = null;
var lockBodyScroll = () => {
  if (activeDialogScrollLocks === 0) {
    originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  activeDialogScrollLocks += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    activeDialogScrollLocks -= 1;
    if (activeDialogScrollLocks === 0) {
      document.body.style.overflow = originalBodyOverflow ?? "";
      originalBodyOverflow = null;
    }
  };
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
  ariaLabel = "Dialog",
  className
}) => {
  const dialogRef = useRef8(null);
  const closeButtonRef = useRef8(null);
  const titleId = useId13();
  useEscapeKey(onClose, open);
  useFocusTrap(dialogRef, open, { initialFocusRef: closeButtonRef });
  useEffect7(() => {
    if (!open) return;
    return lockBodyScroll();
  }, [open]);
  const handleBackdropClick = () => {
    if (!disableOutsideClick) {
      onClose();
    }
  };
  if (!open) return null;
  return /* @__PURE__ */ jsxs21(
    "div",
    {
      className: "fixed inset-0 z-[var(--kui-z-modal)] overflow-y-auto flex items-start sm:items-center justify-center p-4 pt-12 sm:pt-4",
      style: {
        backgroundColor: "var(--kui-color-overlay)",
        backdropFilter: "blur(2px)"
      },
      children: [
        /* @__PURE__ */ jsx37(
          "button",
          {
            type: "button",
            "aria-label": "Close dialog backdrop",
            className: "absolute inset-0 cursor-default",
            disabled: disableOutsideClick,
            onClick: handleBackdropClick
          }
        ),
        /* @__PURE__ */ jsxs21(
          "div",
          {
            role: "dialog",
            "aria-modal": "true",
            "aria-label": title ? void 0 : ariaLabel,
            "aria-labelledby": title ? titleId : void 0,
            ref: dialogRef,
            className: cn(
              "relative bg-surface rounded-lg shadow-xl w-full transform transition-all duration-200 ease-out",
              maxWidthClasses[maxWidth],
              className
            ),
            children: [
              (title || !hideCloseButton) && /* @__PURE__ */ jsxs21("div", { className: "flex justify-between items-center p-6 pb-4", children: [
                title && /* @__PURE__ */ jsx37(
                  "h3",
                  {
                    id: titleId,
                    className: "text-lg font-semibold text-foreground",
                    children: title
                  }
                ),
                !hideCloseButton && /* @__PURE__ */ jsx37(
                  "button",
                  {
                    ref: closeButtonRef,
                    type: "button",
                    onClick: onClose,
                    className: "text-muted hover:text-foreground transition-colors p-1",
                    "aria-label": closeButtonLabel,
                    children: /* @__PURE__ */ jsx37(
                      "svg",
                      {
                        className: "h-6 w-6",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        strokeWidth: 1.5,
                        stroke: "currentColor",
                        children: /* @__PURE__ */ jsx37(
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
              /* @__PURE__ */ jsx37("div", { className: title || !hideCloseButton ? "px-6 pb-6" : "p-6", children })
            ]
          }
        )
      ]
    }
  );
};

// src/components/molecules/ConfirmDialog/ConfirmDialog.tsx
import { jsx as jsx38, jsxs as jsxs22 } from "react/jsx-runtime";
var variantStyles5 = {
  danger: {
    iconBg: "bg-danger-subtle",
    iconColor: "text-danger-main",
    buttonBg: "bg-danger-main",
    buttonHover: "hover:opacity-90"
  },
  warning: {
    iconBg: "bg-warning-subtle",
    iconColor: "text-warning-main",
    buttonBg: "bg-warning-main",
    buttonHover: "hover:opacity-90"
  },
  info: {
    iconBg: "bg-info-subtle",
    iconColor: "text-info-main",
    buttonBg: "bg-info-main",
    buttonHover: "hover:opacity-90"
  }
};
var DefaultIcon = ({ className }) => /* @__PURE__ */ jsx38(
  "svg",
  {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx38(
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
  const styles2 = variantStyles5[variant];
  return /* @__PURE__ */ jsxs22(
    Dialog,
    {
      open,
      onClose,
      maxWidth: "sm",
      disableOutsideClick: isProcessing,
      children: [
        /* @__PURE__ */ jsxs22("div", { className: "flex items-center mb-4", children: [
          /* @__PURE__ */ jsx38(
            "div",
            {
              className: cn("rounded-full p-2 mr-3 flex-shrink-0", styles2.iconBg),
              children: icon || /* @__PURE__ */ jsx38(DefaultIcon, { className: cn("h-6 w-6", styles2.iconColor) })
            }
          ),
          /* @__PURE__ */ jsx38(
            Heading,
            {
              as: "h3",
              size: "md",
              style: { fontWeight: "var(--kui-font-weight-medium)" },
              children: title
            }
          )
        ] }),
        /* @__PURE__ */ jsxs22("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx38(Typography, { as: "div", children: message }),
          description && /* @__PURE__ */ jsx38(Typography, { className: "mt-2", variant: "body-sm", tone: "muted", children: description })
        ] }),
        /* @__PURE__ */ jsxs22("div", { className: "flex justify-end space-x-3", children: [
          /* @__PURE__ */ jsx38(
            "button",
            {
              type: "button",
              onClick: onClose,
              disabled: isProcessing,
              className: "px-4 py-2 text-sm font-medium text-foreground bg-surface-sunken hover:bg-border text rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-border-strong disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
              children: cancelLabel
            }
          ),
          /* @__PURE__ */ jsx38(
            "button",
            {
              type: "button",
              onClick: onConfirm,
              disabled: isProcessing,
              className: cn(
                "px-4 py-2 text-sm font-medium text-inverse rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                styles2.buttonBg,
                styles2.buttonHover
              ),
              children: isProcessing ? processingLabel : confirmLabel
            }
          )
        ] })
      ]
    }
  );
};

// src/components/molecules/DataTable/DataTable.tsx
import { useMemo as useMemo3, useState as useState10 } from "react";
import { Fragment as Fragment4, jsx as jsx39, jsxs as jsxs23 } from "react/jsx-runtime";
var resolveActions = (row, actions) => {
  if (!actions) return [];
  return typeof actions === "function" ? actions(row) : actions;
};
var isActionDisabled = (action, row) => {
  if (typeof action.disabled === "function") {
    return action.disabled(row);
  }
  return Boolean(action.disabled);
};
var renderActions = (row, actions) => {
  const resolvedActions = resolveActions(row, actions);
  if (resolvedActions.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx39("div", { className: "flex flex-wrap items-center justify-end gap-2", children: resolvedActions.map((action) => /* @__PURE__ */ jsx39(
    Button,
    {
      type: "button",
      size: "small",
      variant: action.variant ?? "ghost",
      "aria-label": action.ariaLabel ?? action.label,
      disabled: isActionDisabled(action, row),
      onClick: () => action.onClick(row),
      children: action.label
    },
    action.label
  )) });
};
var DataTable = ({
  columns,
  rows,
  getRowId,
  actions,
  actionHeader = "Actions",
  isLoading = false,
  loadingLabel = "Loading...",
  emptyMessage = "No data available.",
  mobileMode = "scroll",
  virtualization,
  className
}) => {
  const hasActionColumn = Boolean(actions);
  const tableColumnCount = columns.length + (hasActionColumn ? 1 : 0);
  const [scrollTop, setScrollTop] = useState10(0);
  const isVirtualizationEnabled = virtualization?.enabled ?? false;
  const virtualizedHeight = virtualization?.height ?? 400;
  const virtualizedRowHeight = virtualization?.rowHeight ?? 52;
  const virtualizedOverscan = virtualization?.overscan ?? 4;
  const viewportHeight = typeof virtualizedHeight === "number" ? virtualizedHeight : Number.parseInt(String(virtualizedHeight).replace("px", ""), 10) || 400;
  const shouldVirtualize = isVirtualizationEnabled && mobileMode === "scroll";
  const virtualizedWindow = useMemo3(() => {
    if (!shouldVirtualize || rows.length === 0) {
      return {
        startIndex: 0,
        endIndex: rows.length,
        topSpacerHeight: 0,
        bottomSpacerHeight: 0
      };
    }
    const safeRowHeight = virtualizedRowHeight > 0 ? virtualizedRowHeight : 52;
    const safeOverscan = virtualizedOverscan >= 0 ? virtualizedOverscan : 0;
    const visibleCount = Math.ceil(viewportHeight / safeRowHeight);
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / safeRowHeight) - safeOverscan
    );
    const endIndex = Math.min(
      rows.length,
      startIndex + visibleCount + safeOverscan * 2
    );
    return {
      startIndex,
      endIndex,
      topSpacerHeight: startIndex * safeRowHeight,
      bottomSpacerHeight: Math.max(0, (rows.length - endIndex) * safeRowHeight)
    };
  }, [
    shouldVirtualize,
    rows.length,
    virtualizedRowHeight,
    virtualizedOverscan,
    viewportHeight,
    scrollTop
  ]);
  const visibleRows = shouldVirtualize ? rows.slice(virtualizedWindow.startIndex, virtualizedWindow.endIndex) : rows;
  const tableWrapperStyle = shouldVirtualize ? { height: virtualizedHeight, overflowY: "auto" } : void 0;
  if (isLoading) {
    return /* @__PURE__ */ jsx39("div", { className: cn("w-full", className), "aria-busy": "true", children: /* @__PURE__ */ jsx39(Spinner, { label: loadingLabel }) });
  }
  if (mobileMode === "cards") {
    return /* @__PURE__ */ jsxs23("div", { className: cn("w-full", className), children: [
      /* @__PURE__ */ jsx39("div", { className: "hidden md:block overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxs23("table", { className: "min-w-full border-collapse", children: [
        /* @__PURE__ */ jsx39("thead", { className: "bg-surface-raised", children: /* @__PURE__ */ jsxs23("tr", { children: [
          columns.map((column) => /* @__PURE__ */ jsx39(
            "th",
            {
              className: cn(
                "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted",
                column.headerClassName
              ),
              children: column.header
            },
            column.key
          )),
          hasActionColumn && /* @__PURE__ */ jsx39("th", { className: "px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted", children: actionHeader })
        ] }) }),
        /* @__PURE__ */ jsx39("tbody", { className: "divide-y divide-border", children: rows.length === 0 ? /* @__PURE__ */ jsx39("tr", { children: /* @__PURE__ */ jsx39(
          "td",
          {
            colSpan: tableColumnCount,
            className: "px-4 py-8 text-center text-sm text-muted",
            children: /* @__PURE__ */ jsx39(Typography, { as: "span", tone: "muted", children: emptyMessage })
          }
        ) }) : rows.map((row, index) => /* @__PURE__ */ jsxs23("tr", { className: "bg-surface", children: [
          columns.map((column) => /* @__PURE__ */ jsx39(
            "td",
            {
              className: cn(
                "px-4 py-3 text-sm text-foreground",
                column.cellClassName
              ),
              children: column.render(row)
            },
            column.key
          )),
          hasActionColumn && /* @__PURE__ */ jsx39("td", { className: "px-4 py-3 text-right", children: renderActions(row, actions) })
        ] }, getRowId(row, index))) })
      ] }) }),
      /* @__PURE__ */ jsx39("div", { className: "space-y-3 md:hidden", children: rows.length === 0 ? /* @__PURE__ */ jsx39("div", { className: "rounded-lg border border-dashed border-border-strong bg-surface-raised px-4 py-8 text-center", children: /* @__PURE__ */ jsx39(Typography, { as: "p", tone: "muted", children: emptyMessage }) }) : rows.map((row, index) => /* @__PURE__ */ jsxs23(
        "div",
        {
          className: "rounded-lg border border-border bg-surface p-4 shadow-sm",
          children: [
            /* @__PURE__ */ jsx39("dl", { className: "space-y-3", children: columns.map((column) => /* @__PURE__ */ jsxs23("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx39("dt", { className: "text-xs font-semibold uppercase tracking-wide text-muted", children: column.mobileLabel ?? column.header }),
              /* @__PURE__ */ jsx39(
                "dd",
                {
                  className: cn(
                    "text-sm text-foreground",
                    column.cellClassName
                  ),
                  children: column.render(row)
                }
              )
            ] }, column.key)) }),
            hasActionColumn && /* @__PURE__ */ jsx39("div", { className: "mt-4", children: renderActions(row, actions) })
          ]
        },
        getRowId(row, index)
      )) })
    ] });
  }
  return /* @__PURE__ */ jsx39(
    "div",
    {
      className: cn(
        "w-full overflow-x-auto rounded-lg border border-border",
        className
      ),
      style: tableWrapperStyle,
      onScroll: shouldVirtualize ? (event) => setScrollTop(event.currentTarget.scrollTop) : void 0,
      children: /* @__PURE__ */ jsxs23("table", { className: "min-w-full border-collapse", children: [
        /* @__PURE__ */ jsx39("thead", { className: "bg-surface-raised", children: /* @__PURE__ */ jsxs23("tr", { children: [
          columns.map((column) => /* @__PURE__ */ jsx39(
            "th",
            {
              className: cn(
                "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted",
                column.headerClassName
              ),
              children: column.header
            },
            column.key
          )),
          hasActionColumn && /* @__PURE__ */ jsx39("th", { className: "px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted", children: actionHeader })
        ] }) }),
        /* @__PURE__ */ jsx39("tbody", { className: "divide-y divide-border", children: rows.length === 0 ? /* @__PURE__ */ jsx39("tr", { children: /* @__PURE__ */ jsx39(
          "td",
          {
            colSpan: tableColumnCount,
            className: "px-4 py-8 text-center text-sm text-muted",
            children: /* @__PURE__ */ jsx39(Typography, { as: "span", tone: "muted", children: emptyMessage })
          }
        ) }) : /* @__PURE__ */ jsxs23(Fragment4, { children: [
          shouldVirtualize && virtualizedWindow.topSpacerHeight > 0 && /* @__PURE__ */ jsx39("tr", { children: /* @__PURE__ */ jsx39(
            "td",
            {
              colSpan: tableColumnCount,
              style: {
                height: `${virtualizedWindow.topSpacerHeight}px`,
                padding: 0
              }
            }
          ) }),
          visibleRows.map((row, index) => {
            const rowIndex = shouldVirtualize ? virtualizedWindow.startIndex + index : index;
            return /* @__PURE__ */ jsxs23("tr", { className: "bg-surface", children: [
              columns.map((column) => /* @__PURE__ */ jsx39(
                "td",
                {
                  className: cn(
                    "px-4 py-3 text-sm text-foreground",
                    column.cellClassName
                  ),
                  children: column.render(row)
                },
                column.key
              )),
              hasActionColumn && /* @__PURE__ */ jsx39("td", { className: "px-4 py-3 text-right", children: renderActions(row, actions) })
            ] }, getRowId(row, rowIndex));
          }),
          shouldVirtualize && virtualizedWindow.bottomSpacerHeight > 0 && /* @__PURE__ */ jsx39("tr", { children: /* @__PURE__ */ jsx39(
            "td",
            {
              colSpan: tableColumnCount,
              style: {
                height: `${virtualizedWindow.bottomSpacerHeight}px`,
                padding: 0
              }
            }
          ) })
        ] }) })
      ] })
    }
  );
};

// src/components/molecules/DatePicker/DatePicker.tsx
import { useState as useState11 } from "react";
import { jsx as jsx40, jsxs as jsxs24 } from "react/jsx-runtime";
var DatePicker = ({
  value = "",
  onChange,
  minDate,
  maxDate,
  disabledDate,
  placeholder = "YYYY-MM-DD",
  clearable = false,
  disabled = false,
  className
}) => {
  const [open, setOpen] = useState11(false);
  return /* @__PURE__ */ jsxs24("div", { className: cn("flex items-center gap-1", className), children: [
    /* @__PURE__ */ jsx40(
      Popover,
      {
        open,
        onOpenChange: setOpen,
        trigger: /* @__PURE__ */ jsxs24(
          "button",
          {
            type: "button",
            "aria-label": "\u30AB\u30EC\u30F3\u30C0\u30FC\u3092\u958B\u304F",
            disabled,
            className: "flex min-w-44 items-center justify-between rounded-md border border-border-strong bg-surface px-3 py-2 text-left text-foreground hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsx40("span", { className: value ? void 0 : "text-muted", children: value || placeholder }),
              /* @__PURE__ */ jsx40("span", { "aria-hidden": "true", children: "\u25A3" })
            ]
          }
        ),
        children: /* @__PURE__ */ jsx40(
          Calendar,
          {
            value: value || void 0,
            onChange: (next) => {
              onChange(next);
              setOpen(false);
            },
            minDate,
            maxDate,
            disabledDate
          }
        )
      }
    ),
    clearable && value && /* @__PURE__ */ jsx40(
      "button",
      {
        type: "button",
        "aria-label": "\u30AF\u30EA\u30A2",
        onClick: () => onChange(""),
        className: "rounded p-2 text-muted hover:bg-surface-sunken hover:text-foreground",
        children: "\xD7"
      }
    )
  ] });
};

// src/components/molecules/Drawer/Drawer.tsx
import { useEffect as useEffect8, useId as useId14, useRef as useRef9 } from "react";
import { createPortal as createPortal2 } from "react-dom";
import { jsx as jsx41, jsxs as jsxs25 } from "react/jsx-runtime";
var placementClasses = {
  left: "left-0 top-0 h-full",
  right: "right-0 top-0 h-full",
  top: "left-0 top-0 w-full",
  bottom: "bottom-0 left-0 w-full"
};
var backgroundLeases = /* @__PURE__ */ new Map();
var Drawer = ({
  open,
  onClose,
  children,
  title,
  footer,
  placement = "right",
  size,
  closeOnOutsideClick = true,
  closeButtonLabel = "\u9589\u3058\u308B",
  className
}) => {
  const drawerRef = useRef9(null);
  const closeButtonRef = useRef9(null);
  const titleId = useId14();
  const container = usePortalContainer();
  useEscapeKey(onClose, open);
  useFocusTrap(drawerRef, open, { initialFocusRef: closeButtonRef });
  useEffect8(() => {
    if (!open || !container) return;
    const backgroundElements = Array.from(document.body.children).filter(
      (element) => element instanceof HTMLElement && element !== container
    );
    backgroundElements.forEach((element) => {
      const existingLease = backgroundLeases.get(element);
      if (existingLease) {
        existingLease.count += 1;
        return;
      }
      backgroundLeases.set(element, {
        ariaHidden: element.getAttribute("aria-hidden"),
        inert: element.hasAttribute("inert"),
        count: 1
      });
      element.setAttribute("inert", "");
      element.setAttribute("aria-hidden", "true");
    });
    return () => {
      backgroundElements.forEach((element) => {
        const lease = backgroundLeases.get(element);
        if (!lease) return;
        lease.count -= 1;
        if (lease.count > 0) return;
        if (lease.inert) element.setAttribute("inert", "");
        else element.removeAttribute("inert");
        if (lease.ariaHidden === null) element.removeAttribute("aria-hidden");
        else element.setAttribute("aria-hidden", lease.ariaHidden);
        backgroundLeases.delete(element);
      });
    };
  }, [container, open]);
  if (!open || !container) return null;
  const dimension = size ?? (placement === "left" || placement === "right" ? 384 : "auto");
  const style = placement === "left" || placement === "right" ? { width: typeof dimension === "number" ? `${dimension}px` : dimension } : {
    height: typeof dimension === "number" ? `${dimension}px` : dimension
  };
  return createPortal2(
    /* @__PURE__ */ jsxs25("div", { className: "fixed inset-0 z-[var(--kui-z-drawer)]", children: [
      /* @__PURE__ */ jsx41(
        "button",
        {
          type: "button",
          "aria-label": "\u30C9\u30ED\u30EF\u30FC\u306E\u80CC\u666F\u3092\u9589\u3058\u308B",
          disabled: !closeOnOutsideClick,
          onClick: onClose,
          className: "absolute inset-0 cursor-default bg-[var(--kui-color-overlay)]"
        }
      ),
      /* @__PURE__ */ jsxs25(
        "div",
        {
          ref: drawerRef,
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": title ? titleId : void 0,
          "aria-label": title ? void 0 : "Drawer",
          style,
          className: cn(
            "absolute z-[var(--kui-z-overlay)] flex bg-surface text-foreground shadow-xl",
            placementClasses[placement],
            "flex-col",
            className
          ),
          children: [
            /* @__PURE__ */ jsxs25("div", { className: "flex items-center justify-between border-b border-border px-4 py-3", children: [
              title && /* @__PURE__ */ jsx41("h2", { id: titleId, className: "font-semibold", children: title }),
              /* @__PURE__ */ jsx41(
                "button",
                {
                  ref: closeButtonRef,
                  type: "button",
                  "aria-label": closeButtonLabel,
                  onClick: onClose,
                  className: "rounded p-2 hover:bg-surface-sunken",
                  children: "\xD7"
                }
              )
            ] }),
            /* @__PURE__ */ jsx41("div", { className: "min-h-0 flex-1 overflow-auto p-4", children }),
            footer && /* @__PURE__ */ jsx41("div", { className: "border-t border-border p-4", children: footer })
          ]
        }
      )
    ] }),
    container
  );
};

// src/components/molecules/FileUploader/FileUploader.tsx
import { useId as useId15, useRef as useRef10, useState as useState12 } from "react";
import { jsx as jsx42, jsxs as jsxs26 } from "react/jsx-runtime";
var acceptsFile = (file, accept) => {
  if (!accept) return true;
  return accept.split(",").some((rule) => {
    const accepted = rule.trim().toLowerCase();
    if (!accepted) return true;
    if (accepted.startsWith("."))
      return file.name.toLowerCase().endsWith(accepted);
    if (accepted.endsWith("/*"))
      return file.type.toLowerCase().startsWith(accepted.slice(0, -1));
    return file.type.toLowerCase() === accepted;
  });
};
var FileUploader = ({
  accept,
  multiple = false,
  maxSizeBytes,
  onFilesSelected,
  disabled = false,
  label = "\u30D5\u30A1\u30A4\u30EB\u3092\u9078\u629E",
  className
}) => {
  const inputRef = useRef10(null);
  const inputId = useId15();
  const [error, setError] = useState12();
  const [selectedCount, setSelectedCount] = useState12(0);
  const [isDragging, setIsDragging] = useState12(false);
  const selectFiles = (fileList) => {
    if (disabled) return;
    const candidates = Array.from(fileList);
    const limitedCandidates = multiple ? candidates : candidates.slice(0, 1);
    const rejected = limitedCandidates.filter(
      (file) => !acceptsFile(file, accept) || maxSizeBytes !== void 0 && file.size > maxSizeBytes
    );
    const valid = limitedCandidates.filter((file) => !rejected.includes(file));
    setError(
      rejected.length ? `\u6B21\u306E\u30D5\u30A1\u30A4\u30EB\u306F\u5F62\u5F0F\u307E\u305F\u306F\u30B5\u30A4\u30BA\u306E\u6761\u4EF6\u3092\u6E80\u305F\u3057\u3066\u3044\u307E\u305B\u3093: ${rejected.map((file) => file.name).join("\u3001")}` : void 0
    );
    setSelectedCount(valid.length);
    if (valid.length) onFilesSelected(valid);
  };
  return /* @__PURE__ */ jsxs26("div", { className, children: [
    /* @__PURE__ */ jsx42(
      "input",
      {
        ref: inputRef,
        id: inputId,
        type: "file",
        accept,
        multiple,
        disabled,
        "aria-label": label,
        className: "sr-only",
        onChange: (event) => {
          if (event.target.files) selectFiles(event.target.files);
          event.target.value = "";
        }
      }
    ),
    /* @__PURE__ */ jsxs26(
      "button",
      {
        type: "button",
        disabled,
        "aria-label": label,
        "aria-describedby": error ? `${inputId}-error` : void 0,
        onClick: () => inputRef.current?.click(),
        onDragEnter: (event) => {
          event.preventDefault();
          if (!disabled) setIsDragging(true);
        },
        onDragOver: (event) => event.preventDefault(),
        onDragLeave: () => setIsDragging(false),
        onDrop: (event) => {
          event.preventDefault();
          setIsDragging(false);
          selectFiles(event.dataTransfer.files);
        },
        className: cn(
          "flex w-full flex-col items-center justify-center rounded border-2 border-dashed border-border-strong bg-surface-raised px-6 py-8 text-center text-sm text-foreground hover:bg-surface-sunken focus-visible:outline-2 focus-visible:outline-primary-main disabled:cursor-not-allowed disabled:opacity-50",
          isDragging && "border-primary-main bg-surface-sunken"
        ),
        children: [
          /* @__PURE__ */ jsx42("span", { className: "font-medium", children: label }),
          /* @__PURE__ */ jsx42("span", { className: "mt-1 text-muted", children: "\u30C9\u30E9\u30C3\u30B0&\u30C9\u30ED\u30C3\u30D7\u3067\u3082\u8FFD\u52A0\u3067\u304D\u307E\u3059" })
        ]
      }
    ),
    error && /* @__PURE__ */ jsx42(
      "p",
      {
        id: `${inputId}-error`,
        role: "alert",
        className: "mt-2 text-sm text-danger-main",
        children: error
      }
    ),
    selectedCount > 0 && !error && /* @__PURE__ */ jsxs26("output", { className: "mt-2 text-sm text-muted", children: [
      selectedCount,
      "\u4EF6\u306E\u30D5\u30A1\u30A4\u30EB\u3092\u9078\u629E\u3057\u307E\u3057\u305F"
    ] })
  ] });
};

// src/components/molecules/Tooltip/Tooltip.tsx
import { useCallback as useCallback3, useEffect as useEffect10, useRef as useRef11, useState as useState13 } from "react";

// src/hooks/useClickOutside.ts
import { useEffect as useEffect9 } from "react";
function useClickOutside(ref, handler, enabled = true) {
  useEffect9(() => {
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

// src/components/molecules/Tooltip/Tooltip.tsx
import { jsx as jsx43, jsxs as jsxs27 } from "react/jsx-runtime";
var tooltipPositionClasses = {
  left: {
    arrow: "absolute -top-2 left-4 w-4 h-4 bg-surface transform rotate-45 border-t border-l border-border",
    tooltip: "absolute w-64 sm:w-72 mt-2 left-0"
  },
  right: {
    arrow: "absolute -top-2 right-4 w-4 h-4 bg-surface transform rotate-45 border-t border-l border-border",
    tooltip: "absolute w-64 sm:w-72 mt-2 right-0"
  },
  center: {
    arrow: "absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-surface rotate-45 border-t border-l border-border",
    tooltip: "absolute w-64 sm:w-72 mt-2 left-1/2 transform -translate-x-1/2"
  }
};
var Tooltip = ({
  content,
  children,
  triggerLabel = "Info",
  className
}) => {
  const [isOpen, setIsOpen] = useState13(false);
  const [tooltipPosition, setTooltipPosition] = useState13("right");
  const tooltipRef = useRef11(null);
  const buttonRef = useRef11(null);
  const animationFrameRef = useRef11(null);
  const updateTooltipPosition = useCallback3(() => {
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
  }, []);
  useEffect10(() => {
    if (!isOpen || !buttonRef.current) return;
    animationFrameRef.current = requestAnimationFrame(() => {
      animationFrameRef.current = null;
      updateTooltipPosition();
    });
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isOpen, updateTooltipPosition]);
  useClickOutside(tooltipRef, () => setIsOpen(false), isOpen);
  useEffect10(() => {
    const handleResize = () => {
      if (isOpen) {
        updateTooltipPosition();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, updateTooltipPosition]);
  const { tooltip: tooltipClass, arrow: arrowClass } = tooltipPositionClasses[tooltipPosition];
  return /* @__PURE__ */ jsxs27("div", { className: cn("relative inline-block", className), ref: tooltipRef, children: [
    /* @__PURE__ */ jsx43(
      "button",
      {
        ref: buttonRef,
        type: "button",
        className: "text-muted hover:text-foreground focus:outline-none p-1 rounded-full hover:bg-surface-sunken",
        onClick: () => setIsOpen((currentIsOpen) => !currentIsOpen),
        "aria-label": triggerLabel,
        children
      }
    ),
    isOpen && /* @__PURE__ */ jsxs27(
      "div",
      {
        className: cn(
          tooltipClass,
          "z-[var(--kui-z-tooltip)] bg-surface rounded-lg shadow-lg border border-border animate-kui-fade-in"
        ),
        children: [
          /* @__PURE__ */ jsx43("div", { className: "p-3 text-sm text-foreground", children: content }),
          /* @__PURE__ */ jsx43("div", { className: arrowClass, "aria-hidden": "true" })
        ]
      }
    )
  ] });
};

// src/components/molecules/InfoTooltip/InfoTooltip.tsx
import { jsx as jsx44 } from "react/jsx-runtime";
var iconSizeStyles2 = {
  sm: "w-4 h-4",
  md: "w-5 h-5"
};
var InfoTooltip = ({
  content,
  label = "Info",
  size = "md",
  className
}) => {
  return /* @__PURE__ */ jsx44(Tooltip, { content, triggerLabel: label, className, children: /* @__PURE__ */ jsx44(
    "svg",
    {
      className: cn(iconSizeStyles2[size]),
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx44(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        }
      )
    }
  ) });
};

// src/components/molecules/KeyValueList/KeyValueList.tsx
import { jsx as jsx45, jsxs as jsxs28 } from "react/jsx-runtime";
var toneStyles3 = {
  default: "text-foreground",
  success: "text-success-main",
  danger: "text-danger-main"
};
var keySizeStyles = {
  sm: "text-xs",
  md: "text-sm"
};
var valueSizeStyles = {
  sm: "text-xs",
  md: "text-sm"
};
var itemPaddingStyles = {
  sm: "py-1.5",
  md: "py-2"
};
var KeyValueList = ({
  items,
  layout = "horizontal",
  size = "md",
  separator = false,
  className
}) => {
  return /* @__PURE__ */ jsx45(
    "dl",
    {
      className: cn("w-full", separator && "divide-y divide-border", className),
      children: items.map((item) => /* @__PURE__ */ jsxs28(
        "div",
        {
          className: cn(
            itemPaddingStyles[size],
            layout === "horizontal" ? "flex items-baseline justify-between gap-4" : "flex flex-col gap-0.5"
          ),
          children: [
            /* @__PURE__ */ jsx45("dt", { className: cn("text-muted shrink-0", keySizeStyles[size]), children: item.key }),
            /* @__PURE__ */ jsx45(
              "dd",
              {
                className: cn(
                  "font-medium",
                  valueSizeStyles[size],
                  toneStyles3[item.tone ?? "default"],
                  layout === "horizontal" && "text-right"
                ),
                children: item.value
              }
            )
          ]
        },
        String(item.key)
      ))
    }
  );
};

// src/components/molecules/ListItem/ListItem.tsx
import { jsx as jsx46 } from "react/jsx-runtime";
var ListItem = ({
  children,
  hoverable = true,
  bordered = true,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx46(
    "div",
    {
      className: cn(
        "px-4 py-3 bg-surface rounded-lg",
        hoverable && "hover:bg-surface-raised transition-colors",
        bordered && "border border-border",
        className
      ),
      ...props,
      children
    }
  );
};

// src/components/molecules/ListLayout/ListLayout.tsx
import React from "react";
import { jsx as jsx47, jsxs as jsxs29 } from "react/jsx-runtime";
var DefaultCloseIcon = () => /* @__PURE__ */ jsx47(
  "svg",
  {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx47(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M6 18L18 6M6 6l12 12"
      }
    )
  }
);
var DefaultSearchIcon = () => /* @__PURE__ */ jsx47(
  "svg",
  {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx47(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      }
    )
  }
);
var DefaultFilterIcon = () => /* @__PURE__ */ jsx47(
  "svg",
  {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx47(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
      }
    )
  }
);
var DefaultAddIcon = () => /* @__PURE__ */ jsx47(
  "svg",
  {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx47(
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
  const SearchIconComponent = searchIcon || /* @__PURE__ */ jsx47(DefaultSearchIcon, {});
  const FilterIconComponent = filterIcon || /* @__PURE__ */ jsx47(DefaultFilterIcon, {});
  const AddIconComponent = addIcon || /* @__PURE__ */ jsx47(DefaultAddIcon, {});
  const CloseIconComponent = closeIcon || /* @__PURE__ */ jsx47(DefaultCloseIcon, {});
  return /* @__PURE__ */ jsxs29("div", { className: cn("max-w-3xl mx-auto p-4", className), children: [
    /* @__PURE__ */ jsxs29("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx47(
        Heading,
        {
          as: "h1",
          size: "xl",
          style: { fontWeight: "var(--kui-font-weight-bold)" },
          children: title
        }
      ),
      /* @__PURE__ */ jsxs29("div", { className: "flex gap-2", children: [
        customActions,
        !showSearchForm && /* @__PURE__ */ jsx47(
          "button",
          {
            type: "button",
            onClick: () => onToggleSearch(true),
            className: "p-2 rounded-full bg-info-subtle text-info-main hover:opacity-90 transition-colors",
            "aria-label": searchButtonLabel,
            children: SearchIconComponent
          }
        ),
        enableIncompleteFilter && /* @__PURE__ */ jsx47(
          "button",
          {
            type: "button",
            onClick: () => onToggleFilter(!showFilterOptions),
            className: cn(
              "p-2 rounded-full transition-colors",
              showFilterOptions ? "bg-info-subtle text-info-main hover:opacity-90" : "bg-surface-raised text-muted hover:bg-surface-sunken"
            ),
            "aria-label": filterButtonLabel,
            children: FilterIconComponent
          }
        ),
        onToggleAddForm ? /* @__PURE__ */ jsx47(
          "button",
          {
            type: "button",
            onClick: () => onToggleAddForm(!showAddForm),
            className: cn(
              "p-2 rounded-full transition-colors",
              showAddForm ? "bg-danger-subtle text-danger-main hover:opacity-90" : "bg-accent-subtle text-accent-main hover:opacity-90"
            ),
            "aria-label": showAddForm ? closeFormLabel : addButtonLabel,
            children: showAddForm ? CloseIconComponent : AddIconComponent
          }
        ) : onAddClick && /* @__PURE__ */ jsx47(
          "button",
          {
            type: "button",
            onClick: onAddClick,
            className: "p-2 rounded-full bg-primary-main text-inverse hover:bg-primary-light transition-colors",
            "aria-label": addButtonLabel,
            children: AddIconComponent
          }
        )
      ] })
    ] }),
    errorMessage && onClearError && /* @__PURE__ */ jsxs29("div", { className: "bg-danger-subtle text-danger-main p-3 rounded-lg mb-4 flex justify-between items-center animate-kui-slide-down shadow-sm", children: [
      /* @__PURE__ */ jsx47(Typography, { as: "p", tone: "danger", children: errorMessage }),
      /* @__PURE__ */ jsx47(
        "button",
        {
          type: "button",
          onClick: onClearError,
          className: "text-danger-main p-1 hover:bg-danger-subtle rounded-full transition-colors",
          children: CloseIconComponent
        }
      )
    ] }),
    enableIncompleteFilter && showFilterOptions && /* @__PURE__ */ jsxs29("div", { className: "mb-4 bg-info-subtle rounded-lg shadow-sm p-3 animate-kui-slide-down", children: [
      /* @__PURE__ */ jsxs29("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx47(
          Heading,
          {
            as: "h3",
            size: "sm",
            style: {
              color: "var(--kui-color-info)",
              fontWeight: "var(--kui-font-weight-medium)"
            },
            children: filterTitle
          }
        ),
        /* @__PURE__ */ jsx47(
          "button",
          {
            type: "button",
            onClick: () => onToggleFilter(false),
            className: "text-info-main hover:opacity-90 p-1 rounded-full transition-colors",
            children: CloseIconComponent
          }
        )
      ] }),
      onToggleIncomplete && /* @__PURE__ */ jsx47("div", { className: "mt-3", children: /* @__PURE__ */ jsxs29("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx47(
          "input",
          {
            type: "checkbox",
            id: "showOnlyIncomplete",
            checked: showOnlyIncomplete,
            onChange: (e) => onToggleIncomplete(e.target.checked),
            className: "h-5 w-5 text-primary-main rounded focus:ring-primary-main bg-surface border-border-strong"
          }
        ),
        /* @__PURE__ */ jsx47("label", { htmlFor: "showOnlyIncomplete", className: "ml-2", children: /* @__PURE__ */ jsx47(Typography, { as: "span", children: incompleteFilterLabel }) })
      ] }) })
    ] }),
    showSearchForm && /* @__PURE__ */ jsxs29("div", { className: "mb-4 bg-surface rounded-lg shadow-sm p-3 relative animate-kui-slide-down", children: [
      /* @__PURE__ */ jsxs29("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx47("span", { className: "w-5 h-5 text-muted absolute left-6", children: SearchIconComponent }),
        /* @__PURE__ */ jsx47(
          "input",
          {
            type: "text",
            value: searchKeyword,
            onChange: (e) => onSearchChange(e.target.value),
            placeholder: searchPlaceholder,
            className: "w-full pl-10 pr-10 py-2 border border-border bg-surface-raised text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-info-main"
          }
        ),
        searchKeyword && /* @__PURE__ */ jsx47(
          "button",
          {
            type: "button",
            onClick: () => onSearchChange(""),
            className: "absolute right-6 text-muted hover:text-foreground p-1 hover:bg-surface-sunken rounded-full transition-colors",
            children: CloseIconComponent
          }
        )
      ] }),
      /* @__PURE__ */ jsx47("div", { className: "flex justify-end mt-3", children: /* @__PURE__ */ jsx47(
        "button",
        {
          type: "button",
          onClick: () => onToggleSearch(false),
          className: "text-sm text-info-main px-3 py-1 hover:bg-info-subtle rounded-md transition-colors",
          children: /* @__PURE__ */ jsx47(Typography, { as: "span", variant: "body-sm", tone: "info", children: closeSearchLabel })
        }
      ) })
    ] }),
    showAddForm && addFormComponent && /* @__PURE__ */ jsx47("div", { className: "mb-4", children: addFormComponent }),
    statsComponent && /* @__PURE__ */ jsx47("div", { className: "mb-6 bg-surface p-4 rounded-lg shadow-sm", children: statsComponent }),
    isLoading && /* @__PURE__ */ jsx47("div", { className: "flex justify-center items-center py-8", children: /* @__PURE__ */ jsx47("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-info-main" }) }),
    isError && onReload && /* @__PURE__ */ jsxs29("div", { className: "text-center py-8 text-danger-main bg-danger-subtle rounded-lg", children: [
      /* @__PURE__ */ jsx47(Typography, { as: "p", tone: "danger", children: errorFetchMessage }),
      /* @__PURE__ */ jsx47(
        "button",
        {
          type: "button",
          onClick: onReload,
          className: "mt-2 px-4 py-2 bg-danger-subtle text-danger-main rounded-md hover:opacity-90 transition-colors",
          children: /* @__PURE__ */ jsx47(Typography, { as: "span", variant: "body-sm", tone: "danger", children: reloadLabel })
        }
      )
    ] }),
    !isLoading && !isError && /* @__PURE__ */ jsx47("div", { className: "space-y-3", children: hasItems ? children : /* @__PURE__ */ jsx47("div", { className: "text-center py-8 text-muted bg-surface-raised rounded-lg animate-kui-fade-in", children: searchKeyword ? /* @__PURE__ */ jsx47(Typography, { as: "p", tone: "muted", children: noSearchResultsMessage }) : showOnlyIncomplete ? /* @__PURE__ */ jsx47(Typography, { as: "p", tone: "muted", children: noIncompleteMessage }) : /* @__PURE__ */ jsx47(Typography, { as: "p", tone: "muted", children: emptyMessage }) }) })
  ] });
};

// src/components/molecules/MonthSelector/MonthSelector.tsx
import { jsx as jsx48, jsxs as jsxs30 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs30("div", { className: cn("flex items-center gap-2", className), children: [
    /* @__PURE__ */ jsx48(
      "button",
      {
        type: "button",
        onClick: handlePrevMonth,
        className: "p-2 rounded-lg hover:bg-surface-sunken transition-colors",
        "aria-label": prevLabel,
        children: /* @__PURE__ */ jsx48(
          "svg",
          {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx48(
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
    /* @__PURE__ */ jsx48(
      "select",
      {
        value: selectedMonth,
        onChange: (e) => onMonthChange(e.target.value),
        className: "px-3 py-2 border border-border-strong rounded-lg bg-surface text-foreground focus:ring-2 focus:ring-info-main focus:border-transparent",
        children: monthOptions.map((option) => /* @__PURE__ */ jsx48("option", { value: option.value, children: option.label }, option.value))
      }
    ),
    /* @__PURE__ */ jsx48(
      "button",
      {
        type: "button",
        onClick: handleNextMonth,
        className: "p-2 rounded-lg hover:bg-surface-sunken transition-colors",
        "aria-label": nextLabel,
        children: /* @__PURE__ */ jsx48(
          "svg",
          {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx48(
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
import { useRef as useRef12 } from "react";
import { Fragment as Fragment5, jsx as jsx49, jsxs as jsxs31 } from "react/jsx-runtime";
var defaultRenderLink2 = ({
  href,
  children,
  className,
  onClick
}) => /* @__PURE__ */ jsx49("a", { href, className, onClick, children });
var NavigationDrawer = ({
  open,
  onClose,
  sections,
  onLogout,
  logoutLabel = "Logout",
  width = 240,
  renderLink = defaultRenderLink2,
  closeButtonLabel = "Close",
  ariaLabel = "Navigation menu"
}) => {
  const drawerRef = useRef12(null);
  const closeButtonRef = useRef12(null);
  useEscapeKey(onClose, open);
  useFocusTrap(drawerRef, open, { initialFocusRef: closeButtonRef });
  return /* @__PURE__ */ jsxs31(Fragment5, { children: [
    open && /* @__PURE__ */ jsx49(
      "div",
      {
        className: "fixed inset-0 bg-[var(--kui-color-overlay)] z-[var(--kui-z-drawer)] transition-opacity",
        onClick: onClose,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs31(
      "div",
      {
        ref: drawerRef,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": open ? ariaLabel : void 0,
        "aria-hidden": !open,
        inert: !open,
        className: cn(
          "fixed top-0 right-0 h-full bg-surface text-foreground z-[var(--kui-z-overlay)] transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        ),
        style: { width: `${width}px` },
        children: [
          /* @__PURE__ */ jsx49(DrawerHeader, { children: /* @__PURE__ */ jsx49(
            "button",
            {
              ref: closeButtonRef,
              type: "button",
              onClick: onClose,
              className: "p-2 rounded-full hover:bg-surface-sunken",
              "aria-label": closeButtonLabel,
              children: /* @__PURE__ */ jsx49(
                "svg",
                {
                  className: "w-6 h-6",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1.5,
                  stroke: "currentColor",
                  children: /* @__PURE__ */ jsx49(
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
          /* @__PURE__ */ jsxs31("div", { className: "overflow-y-auto h-full pb-16", children: [
            sections.map((section, sectionIndex) => /* @__PURE__ */ jsxs31("div", { children: [
              /* @__PURE__ */ jsx49("div", { className: "text-sm text-muted px-4 pt-2", children: section.title }),
              section.items.map((item) => /* @__PURE__ */ jsx49("div", { className: "px-2", children: renderLink({
                href: item.path,
                className: "flex items-center px-3 py-2 rounded-md hover:bg-surface-sunken text-foreground",
                onClick: onClose,
                children: /* @__PURE__ */ jsxs31(Fragment5, { children: [
                  item.icon && /* @__PURE__ */ jsx49("span", { className: "text-muted mr-3", children: item.icon }),
                  /* @__PURE__ */ jsx49("span", { children: item.name })
                ] })
              }) }, item.name))
            ] }, section.title || `section-${sectionIndex}`)),
            onLogout && /* @__PURE__ */ jsx49("div", { className: "px-2 mt-4", children: /* @__PURE__ */ jsx49(
              "button",
              {
                type: "button",
                className: "w-full text-left flex items-center px-3 py-2 rounded-md hover:bg-surface-sunken text-foreground",
                onClick: onLogout,
                children: /* @__PURE__ */ jsx49("span", { children: logoutLabel })
              }
            ) })
          ] })
        ]
      }
    )
  ] });
};

// src/components/molecules/Pagination/Pagination.tsx
import { jsx as jsx50, jsxs as jsxs32 } from "react/jsx-runtime";
var Pagination = ({
  page,
  totalPages,
  onChange,
  siblingCount = 2,
  previousLabel = "\u524D\u306E\u30DA\u30FC\u30B8",
  nextLabel = "\u6B21\u306E\u30DA\u30FC\u30B8",
  className
}) => {
  const pageCount = Math.max(
    1,
    Math.floor(Number.isFinite(totalPages) ? totalPages : 1)
  );
  const currentPage = Math.min(
    Math.max(1, Math.floor(Number.isFinite(page) ? page : 1)),
    pageCount
  );
  const pages = Array.from(
    { length: pageCount },
    (_, index) => index + 1
  ).filter(
    (item) => item === 1 || item === pageCount || Math.abs(item - currentPage) <= siblingCount
  );
  const items = [];
  pages.forEach((item, index) => {
    if (index > 0 && item - pages[index - 1] > 1) items.push("ellipsis");
    items.push(item);
  });
  return /* @__PURE__ */ jsxs32(
    "nav",
    {
      "aria-label": "\u30DA\u30FC\u30B8\u30CD\u30FC\u30B7\u30E7\u30F3",
      className: cn("flex items-center gap-1", className),
      children: [
        /* @__PURE__ */ jsx50(
          "button",
          {
            type: "button",
            "aria-label": previousLabel,
            disabled: currentPage <= 1,
            onClick: () => onChange(currentPage - 1),
            className: "rounded px-3 py-2 text-sm hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-50",
            children: "\u2039"
          }
        ),
        items.map(
          (item, index) => item === "ellipsis" ? /* @__PURE__ */ jsx50(
            "span",
            {
              className: "px-2 text-muted",
              children: "\u2026"
            },
            `ellipsis-${items[index + 1]}`
          ) : /* @__PURE__ */ jsx50(
            "button",
            {
              type: "button",
              "aria-label": `${item}\u30DA\u30FC\u30B8`,
              "aria-current": item === currentPage ? "page" : void 0,
              onClick: () => onChange(item),
              className: cn(
                "rounded px-3 py-2 text-sm hover:bg-surface-sunken",
                item === currentPage && "bg-primary-main text-inverse hover:bg-primary-main"
              ),
              children: item
            },
            item
          )
        ),
        /* @__PURE__ */ jsx50(
          "button",
          {
            type: "button",
            "aria-label": nextLabel,
            disabled: currentPage >= pageCount,
            onClick: () => onChange(currentPage + 1),
            className: "rounded px-3 py-2 text-sm hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-50",
            children: "\u203A"
          }
        )
      ]
    }
  );
};

// src/components/molecules/Popconfirm/Popconfirm.tsx
import { useState as useState14 } from "react";
import { jsx as jsx51, jsxs as jsxs33 } from "react/jsx-runtime";
var Popconfirm = ({
  children,
  title,
  description,
  onConfirm,
  onCancel,
  confirmLabel = "\u78BA\u8A8D",
  cancelLabel = "\u30AD\u30E3\u30F3\u30BB\u30EB"
}) => {
  const [open, setOpen] = useState14(false);
  return /* @__PURE__ */ jsxs33(Popover, { trigger: children, open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx51("p", { className: "font-medium", children: title }),
    description && /* @__PURE__ */ jsx51("p", { className: "mt-1 text-sm text-muted", children: description }),
    /* @__PURE__ */ jsxs33("div", { className: "mt-3 flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx51(
        "button",
        {
          type: "button",
          onClick: () => {
            onCancel?.();
            setOpen(false);
          },
          className: "rounded px-3 py-1.5 text-sm hover:bg-surface-sunken",
          children: cancelLabel
        }
      ),
      /* @__PURE__ */ jsx51(
        "button",
        {
          type: "button",
          onClick: () => {
            onConfirm();
            setOpen(false);
          },
          className: "rounded bg-primary-main px-3 py-1.5 text-sm text-inverse hover:bg-primary-light",
          children: confirmLabel
        }
      )
    ] })
  ] });
};

// src/components/molecules/StatCards/StatCards.tsx
import { jsx as jsx52, jsxs as jsxs34 } from "react/jsx-runtime";
var colorStyles2 = {
  blue: {
    bg: "bg-info-subtle",
    text: "text-info-main",
    border: "border-info-main"
  },
  green: {
    bg: "bg-success-subtle",
    text: "text-success-main",
    border: "border-success-main"
  },
  purple: {
    bg: "bg-accent-subtle",
    text: "text-accent-main",
    border: "border-accent-main"
  },
  red: {
    bg: "bg-danger-subtle",
    text: "text-danger-main",
    border: "border-danger-main"
  },
  yellow: {
    bg: "bg-warning-subtle",
    text: "text-warning-main",
    border: "border-warning-main"
  },
  gray: {
    bg: "bg-surface-raised",
    text: "text-foreground",
    border: "border-border"
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
  return /* @__PURE__ */ jsx52("div", { className: cn("grid gap-4", columnStyles[columns], className), children: cards.map((card) => {
    const color = card.color ?? "blue";
    const styles2 = colorStyles2[color];
    return /* @__PURE__ */ jsxs34(
      "div",
      {
        className: cn("border rounded-lg p-4", styles2.bg, styles2.border),
        children: [
          /* @__PURE__ */ jsx52("h3", { className: cn("text-sm font-medium mb-1", styles2.text), children: card.label }),
          /* @__PURE__ */ jsx52("p", { className: cn("text-2xl font-bold", styles2.text), children: formatValue(card.value) })
        ]
      },
      card.label
    );
  }) });
};

// src/components/molecules/Stepper/Stepper.tsx
import { Fragment as Fragment6, jsx as jsx53, jsxs as jsxs35 } from "react/jsx-runtime";
var Stepper = ({
  steps,
  activeStep,
  onStepClick,
  className
}) => {
  const currentStep = Math.min(
    Math.max(activeStep, 0),
    Math.max(steps.length - 1, 0)
  );
  return /* @__PURE__ */ jsx53("ol", { className: cn("flex w-full", className), "aria-label": "\u624B\u9806", children: steps.map((step, index) => {
    const isActive = index === currentStep;
    const isCompleted = index < currentStep;
    const content = /* @__PURE__ */ jsxs35(Fragment6, { children: [
      /* @__PURE__ */ jsx53(
        "span",
        {
          "aria-hidden": "true",
          className: cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-medium",
            isActive || isCompleted ? "border-primary-main bg-primary-main text-inverse" : "border-border-strong bg-surface text-muted"
          ),
          children: isCompleted ? "\u2713" : index + 1
        }
      ),
      /* @__PURE__ */ jsxs35("span", { className: "min-w-0 text-left", children: [
        /* @__PURE__ */ jsx53("span", { className: "block text-sm font-medium text-foreground", children: step.label }),
        step.description && /* @__PURE__ */ jsx53("span", { className: "block text-xs text-muted", children: step.description })
      ] })
    ] });
    return /* @__PURE__ */ jsxs35(
      "li",
      {
        "aria-current": isActive ? "step" : void 0,
        className: "flex min-w-0 flex-1 items-start",
        children: [
          onStepClick ? /* @__PURE__ */ jsx53(
            "button",
            {
              type: "button",
              disabled: step.disabled,
              onClick: () => onStepClick(index),
              className: "flex min-w-0 items-start gap-2 text-left focus-visible:outline-2 focus-visible:outline-primary-main disabled:cursor-not-allowed disabled:opacity-50",
              children: content
            }
          ) : /* @__PURE__ */ jsx53("span", { className: "flex min-w-0 items-start gap-2", children: content }),
          index < steps.length - 1 && /* @__PURE__ */ jsx53(
            "span",
            {
              "aria-hidden": "true",
              className: "mx-3 mt-3 h-px min-w-3 flex-1 bg-border"
            }
          )
        ]
      },
      step.id ?? String(step.label)
    );
  }) });
};

// src/components/molecules/Tabs/Tabs.tsx
import { useId as useId16 } from "react";
import { jsx as jsx54, jsxs as jsxs36 } from "react/jsx-runtime";
var Tabs = ({
  items,
  value,
  onChange,
  className
}) => {
  const baseId = useId16();
  const selectedIndex = Math.max(
    0,
    items.findIndex((item) => item.value === value)
  );
  const selectNext = (index, direction) => {
    let next = index;
    for (let count = 0; count < items.length; count += 1) {
      next = (next + direction + items.length) % items.length;
      if (!items[next].disabled) return next;
    }
    return index;
  };
  const activeItem = items[selectedIndex];
  return /* @__PURE__ */ jsxs36("div", { className, children: [
    /* @__PURE__ */ jsx54("div", { role: "tablist", className: "flex border-b border-border", children: items.map((item, index) => /* @__PURE__ */ jsx54(
      "button",
      {
        id: `${baseId}-${item.value}-tab`,
        type: "button",
        role: "tab",
        "aria-selected": item.value === value,
        "aria-controls": `${baseId}-${item.value}-panel`,
        tabIndex: item.value === value ? 0 : -1,
        disabled: item.disabled,
        onClick: () => onChange(item.value),
        onKeyDown: (event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            const next = selectNext(
              index,
              event.key === "ArrowRight" ? 1 : -1
            );
            onChange(items[next].value);
            event.currentTarget.parentElement?.querySelectorAll("[role=tab]")[next]?.focus();
          }
        },
        className: cn(
          "border-b-2 px-4 py-2 text-sm font-medium",
          item.value === value ? "border-primary-main text-primary-main" : "border-transparent text-muted hover:text-foreground",
          item.disabled && "cursor-not-allowed opacity-50"
        ),
        children: item.label
      },
      item.value
    )) }),
    activeItem && /* @__PURE__ */ jsx54(
      "div",
      {
        id: `${baseId}-${activeItem.value}-panel`,
        role: "tabpanel",
        "aria-labelledby": `${baseId}-${activeItem.value}-tab`,
        className: "py-4",
        children: activeItem.content
      }
    )
  ] });
};

// src/components/molecules/Timeline/Timeline.tsx
import { jsx as jsx55, jsxs as jsxs37 } from "react/jsx-runtime";
var Timeline = ({
  items,
  align = "left",
  className
}) => /* @__PURE__ */ jsx55(
  "ol",
  {
    "aria-label": "\u30BF\u30A4\u30E0\u30E9\u30A4\u30F3",
    className: cn(
      "flex flex-col",
      align === "alternate" && "items-center",
      align === "right" && "items-end",
      className
    ),
    children: items.map((item, index) => {
      const rightAligned = align === "right" || align === "alternate" && index % 2 === 1;
      return /* @__PURE__ */ jsxs37(
        "li",
        {
          className: cn(
            "relative flex w-full max-w-2xl gap-3 border-l border-border pb-6 pl-6 last:pb-0",
            rightAligned && "flex-row-reverse border-l-0 border-r pr-6 pl-0 text-right"
          ),
          children: [
            /* @__PURE__ */ jsx55(
              "span",
              {
                "aria-hidden": "true",
                className: cn(
                  "absolute top-0 flex size-4 items-center justify-center rounded-full border border-primary-main bg-surface text-xs text-primary-main",
                  rightAligned ? "-right-2" : "-left-2"
                ),
                children: item.icon ?? ""
              }
            ),
            /* @__PURE__ */ jsxs37("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx55("h3", { className: "font-medium text-foreground", children: item.title }),
              item.timestamp && /* @__PURE__ */ jsx55("time", { className: "block text-sm text-muted", children: item.timestamp }),
              item.content && /* @__PURE__ */ jsx55("div", { className: "mt-1 text-sm text-foreground", children: item.content })
            ] })
          ]
        },
        item.id ?? String(item.title)
      );
    })
  }
);

// src/components/molecules/ToastProvider/ToastProvider.tsx
import {
  createContext,
  useCallback as useCallback4,
  useContext,
  useEffect as useEffect11,
  useMemo as useMemo4,
  useRef as useRef13,
  useState as useState15
} from "react";
import { createPortal as createPortal3 } from "react-dom";
import { jsx as jsx56, jsxs as jsxs38 } from "react/jsx-runtime";
var ToastContext = createContext(null);
var positionStyles2 = {
  "top-right": "right-4 top-4",
  "top-left": "left-4 top-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4"
};
function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
function ToastProvider({
  children,
  position = "bottom-right",
  defaultDuration = 5e3,
  maxToasts = 5,
  portalContainer
}) {
  const container = usePortalContainer(portalContainer);
  const [toasts, setToasts] = useState15([]);
  const timers = useRef13(/* @__PURE__ */ new Map());
  const dismiss = useCallback4((id) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);
  const startTimer = useCallback4(
    (toast) => {
      if (toast.duration <= 0) return;
      const timer = setTimeout(() => dismiss(toast.id), toast.remaining);
      timers.current.set(toast.id, timer);
    },
    [dismiss]
  );
  const show = useCallback4(
    (message, options = {}) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const duration = options.duration ?? defaultDuration;
      const toast = {
        id,
        message,
        variant: options.variant ?? "info",
        title: options.title,
        action: options.action,
        duration,
        remaining: duration,
        startedAt: Date.now(),
        paused: false
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
    [defaultDuration, maxToasts, startTimer]
  );
  const pause = useCallback4((id) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setToasts(
      (current) => current.map(
        (toast) => toast.id === id ? {
          ...toast,
          remaining: Math.max(
            0,
            toast.remaining - (Date.now() - toast.startedAt)
          ),
          paused: true
        } : toast
      )
    );
  }, []);
  const resume = useCallback4(
    (id) => {
      setToasts(
        (current) => current.map((toast) => {
          if (toast.id !== id || !toast.paused) return toast;
          const next = { ...toast, paused: false, startedAt: Date.now() };
          startTimer(next);
          return next;
        })
      );
    },
    [startTimer]
  );
  useEffect11(
    () => () => {
      timers.current.forEach(clearTimeout);
      timers.current.clear();
    },
    []
  );
  const value = useMemo4(
    () => ({
      show,
      success: (message, options) => show(message, { ...options, variant: "success" }),
      error: (message, options) => show(message, { ...options, variant: "danger" }),
      info: (message, options) => show(message, { ...options, variant: "info" }),
      warning: (message, options) => show(message, { ...options, variant: "warning" }),
      dismiss,
      dismissAll: () => {
        timers.current.forEach(clearTimeout);
        timers.current.clear();
        setToasts([]);
      }
    }),
    [dismiss, show]
  );
  const notices = /* @__PURE__ */ jsx56(
    "div",
    {
      "aria-live": "polite",
      className: cn(
        "fixed z-[var(--kui-z-toast)] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2",
        positionStyles2[position]
      ),
      children: toasts.map((toast) => /* @__PURE__ */ jsx56(
        Toast,
        {
          variant: toast.variant,
          title: toast.title,
          message: toast.message,
          action: toast.action,
          onDismiss: () => dismiss(toast.id),
          onMouseEnter: () => pause(toast.id),
          onMouseLeave: () => resume(toast.id),
          onFocus: () => pause(toast.id),
          onBlur: () => resume(toast.id)
        },
        toast.id
      ))
    }
  );
  return /* @__PURE__ */ jsxs38(ToastContext.Provider, { value, children: [
    children,
    container ? createPortal3(notices, container) : null
  ] });
}

// src/components/templates/AppLayout/AppLayout.tsx
import { useState as useState16 } from "react";
import { jsx as jsx57, jsxs as jsxs39 } from "react/jsx-runtime";
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
  const [drawerOpen, setDrawerOpen] = useState16(false);
  const titleContent = /* @__PURE__ */ jsx57("span", { className: "text-xl font-bold text-primary-main", children: appTitle });
  const defaultRenderLink3 = ({
    href,
    children: linkChildren
  }) => /* @__PURE__ */ jsx57("a", { href, children: linkChildren });
  const linkRenderer = renderLink || defaultRenderLink3;
  return /* @__PURE__ */ jsxs39("div", { className: "flex min-h-screen bg-surface", children: [
    /* @__PURE__ */ jsx57(AppBar, { position: "fixed", color: appBarColor, className: "shadow-none", children: /* @__PURE__ */ jsxs39("div", { className: "flex items-center justify-between px-4 py-2", children: [
      /* @__PURE__ */ jsxs39("h6", { className: "text-xl font-bold grow", children: [
        linkRenderer({
          href: titleHref,
          children: titleContent,
          className: "no-underline"
        }),
        titleSuffix
      ] }),
      /* @__PURE__ */ jsx57(
        "button",
        {
          type: "button",
          className: "text-primary-main ml-2 p-2 rounded-full hover:bg-surface-sunken",
          "aria-label": menuButtonLabel,
          onClick: () => setDrawerOpen(true),
          children: /* @__PURE__ */ jsx57(
            "svg",
            {
              className: "w-6 h-6",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: 1.5,
              stroke: "currentColor",
              children: /* @__PURE__ */ jsx57(
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
    /* @__PURE__ */ jsx57(
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
    /* @__PURE__ */ jsx57(
      "main",
      {
        className: cn(
          "grow pt-16 px-4 mb-6 sm:px-[10%] bg-surface text-foreground transition-colors min-h-[calc(100vh-4rem)] pb-[env(safe-area-inset-bottom)]",
          className
        ),
        children
      }
    )
  ] });
};

// src/components/templates/EmptyState/EmptyState.tsx
import { jsx as jsx58, jsxs as jsxs40 } from "react/jsx-runtime";
var containerSizeClassMap = {
  sm: "gap-2 rounded-lg px-4 py-6",
  md: "gap-3 rounded-xl px-6 py-10",
  lg: "gap-4 rounded-2xl px-8 py-14"
};
var headingSizeMap = {
  sm: "sm",
  md: "md",
  lg: "lg"
};
var descriptionVariantMap = {
  sm: "body-sm",
  md: "body-sm",
  lg: "body-md"
};
var descriptionWidthClassMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg"
};
var iconSizeClassMap = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14"
};
var contentAlignClassMap = {
  left: "items-start text-left",
  center: "items-center text-center"
};
var actionWrapAlignClassMap = {
  left: "justify-start",
  center: "justify-center"
};
var EmptyState = ({
  icon,
  title,
  description,
  action,
  size = "md",
  align = "center",
  actionPlacement = "below",
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsxs40(
    "div",
    {
      className: cn(
        "flex w-full flex-col justify-center border border-[--kui-color-border] bg-[--kui-color-surface]",
        containerSizeClassMap[size],
        contentAlignClassMap[align],
        className
      ),
      ...props,
      children: [
        icon ? /* @__PURE__ */ jsx58(
          "div",
          {
            className: cn(
              "flex items-center justify-center text-[--kui-color-text-muted]",
              iconSizeClassMap[size]
            ),
            "aria-hidden": "true",
            children: icon
          }
        ) : null,
        /* @__PURE__ */ jsx58(Heading, { as: "h2", size: headingSizeMap[size], children: title }),
        description ? /* @__PURE__ */ jsx58(
          Typography,
          {
            className: descriptionWidthClassMap[size],
            variant: descriptionVariantMap[size],
            tone: "muted",
            children: description
          }
        ) : null,
        action && actionPlacement === "inline" ? /* @__PURE__ */ jsx58("div", { children: action }) : null,
        action && actionPlacement === "below" ? /* @__PURE__ */ jsx58("div", { className: cn("flex w-full pt-1", actionWrapAlignClassMap[align]), children: action }) : null
      ]
    }
  );
};

// src/hooks/useMediaQuery.ts
import { useEffect as useEffect12, useState as useState17 } from "react";
function useMediaQuery(query) {
  const [matches, setMatches] = useState17(false);
  useEffect12(() => {
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
  Accordion,
  Alert,
  AppBar,
  AppLayout,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Checkbox,
  Chip,
  Combobox,
  ConfirmDialog,
  DataTable,
  DatePicker,
  Dialog,
  Divider,
  Drawer,
  DrawerHeader,
  DropdownMenu,
  EmptyState,
  FileUploader,
  FormField,
  Heading,
  InfoTooltip,
  Input,
  KeyValueList,
  ListItem,
  ListLayout,
  MonthSelector,
  NavigationDrawer,
  NumberInput,
  Pagination,
  PasswordInput,
  Popconfirm,
  Popover,
  ProgressBar,
  RadioGroup,
  SearchInput,
  SegmentedControl,
  Select,
  Skeleton,
  Slider,
  Spinner,
  StatCards,
  Stepper,
  Tabs,
  Textarea,
  Timeline,
  Toast,
  ToastProvider,
  ToggleSwitch,
  Tooltip,
  Typography,
  YearMonthInput,
  cn,
  useClickOutside,
  useEscapeKey,
  useFloatingElement,
  useFocusTrap,
  useMediaQuery,
  usePortalContainer,
  useToast
};
//# sourceMappingURL=index.js.map