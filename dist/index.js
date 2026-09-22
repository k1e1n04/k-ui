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
  info: "bg-info-subtle text-info-main",
  success: "bg-success-subtle text-success-main",
  warning: "bg-warning-subtle text-warning-main",
  danger: "bg-danger-subtle text-danger-main",
  neutral: "bg-surface-raised text-muted border border-border"
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
  const toneStyles6 = tone === "solid" || !isSemanticVariant(variant) ? variantStyles4[variant] : semanticToneStyles[variant][tone];
  return /* @__PURE__ */ jsx5(
    "button",
    {
      className: cn(
        "font-medium transition-colors",
        iconOnly ? "rounded-full" : "rounded-md",
        toneStyles6,
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

// src/components/atoms/FavoriteButton/FavoriteButton.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
var sizeStyles3 = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-11 w-11"
};
var iconSizeStyles2 = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6"
};
var FavoriteButton = ({
  favorite,
  onChange,
  label = "\u304A\u6C17\u306B\u5165\u308A",
  size = "md",
  disabled = false,
  className
}) => {
  return /* @__PURE__ */ jsx12(
    "button",
    {
      type: "button",
      "aria-label": label,
      "aria-pressed": favorite,
      disabled,
      onClick: (event) => {
        event.stopPropagation();
        if (!disabled) onChange(!favorite);
      },
      className: cn(
        "inline-flex items-center justify-center rounded-full border border-border bg-surface/90 transition-colors",
        "hover:bg-surface-sunken focus:outline-none focus-visible:ring-2 focus-visible:ring-info-main",
        sizeStyles3[size],
        disabled && "cursor-not-allowed opacity-50",
        className
      ),
      children: /* @__PURE__ */ jsx12(
        "svg",
        {
          viewBox: "0 0 24 24",
          fill: favorite ? "currentColor" : "none",
          stroke: "currentColor",
          strokeWidth: 1.8,
          "aria-hidden": "true",
          className: cn(
            iconSizeStyles2[size],
            favorite ? "text-accent-main" : "text-muted"
          ),
          children: /* @__PURE__ */ jsx12(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M21 8.6c0 5.25-7.5 10.15-9 11.4-1.5-1.25-9-6.15-9-11.4a5 5 0 0 1 9-3.16A5 5 0 0 1 21 8.6Z"
            }
          )
        }
      )
    }
  );
};

// src/components/atoms/FormField/FormField.tsx
import { useId as useId2 } from "react";
import { jsx as jsx13, jsxs as jsxs4 } from "react/jsx-runtime";
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
          required && /* @__PURE__ */ jsx13(
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
    description && /* @__PURE__ */ jsx13(
      "p",
      {
        id: descriptionId,
        className: cn("text-muted", descriptionSizeStyles[size]),
        children: description
      }
    ),
    content,
    error && /* @__PURE__ */ jsx13(
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
import { jsx as jsx14 } from "react/jsx-runtime";
var sizeStyles4 = {
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
  return /* @__PURE__ */ jsx14(
    Component,
    {
      className: cn(className),
      style: {
        fontWeight: "var(--kui-font-weight-semibold)",
        ...sizeStyles4[size],
        ...toneStyles2[tone],
        ...style
      },
      ...props
    }
  );
};

// src/components/atoms/Input/Input.tsx
import { useId as useId3 } from "react";
import { jsx as jsx15 } from "react/jsx-runtime";
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
    return /* @__PURE__ */ jsx15(
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
      children: ({ describedBy }) => /* @__PURE__ */ jsx15(
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

// src/components/atoms/MapPin/MapPin.tsx
import { jsx as jsx16, jsxs as jsxs5 } from "react/jsx-runtime";
var toneStyles3 = {
  primary: "bg-primary-main text-inverse",
  accent: "bg-accent-main text-inverse",
  success: "bg-success-main text-inverse",
  danger: "bg-danger-main text-inverse",
  muted: "bg-surface text-foreground border border-border-strong"
};
var dotToneStyles = {
  primary: "bg-primary-main",
  accent: "bg-accent-main",
  success: "bg-success-main",
  danger: "bg-danger-main",
  muted: "bg-surface-sunken border border-border-strong"
};
var sizeStyles5 = {
  sm: "min-w-7 h-6 px-2 text-xs",
  md: "min-w-9 h-8 px-2.5 text-sm",
  lg: "min-w-11 h-10 px-3 text-base"
};
var dotSizeStyles = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3"
};
var MapPin = ({
  label,
  tone = "primary",
  size = "md",
  selected = false,
  className
}) => {
  return /* @__PURE__ */ jsxs5(
    "span",
    {
      className: cn("relative inline-flex flex-col items-center", className),
      children: [
        /* @__PURE__ */ jsx16(
          "span",
          {
            className: cn(
              "inline-flex items-center justify-center rounded-full font-semibold shadow-md transition-transform",
              toneStyles3[tone],
              sizeStyles5[size],
              selected && "ring-2 ring-accent-main ring-offset-1 scale-105"
            ),
            children: label
          }
        ),
        /* @__PURE__ */ jsx16(
          "span",
          {
            "aria-hidden": "true",
            className: cn(
              "-mt-1 h-2 w-2 rotate-45",
              tone === "muted" ? "bg-surface" : dotToneStyles[tone]
            )
          }
        ),
        /* @__PURE__ */ jsx16(
          "span",
          {
            "aria-hidden": "true",
            className: cn(
              "mt-0.5 rounded-full shadow-sm",
              dotSizeStyles[size],
              dotToneStyles[tone]
            )
          }
        )
      ]
    }
  );
};

// src/components/atoms/NumberInput/NumberInput.tsx
import { useCallback, useId as useId4, useRef, useState as useState2 } from "react";
import { Fragment, jsx as jsx17, jsxs as jsxs6 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx17(
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
      children: ({ describedBy }) => /* @__PURE__ */ jsxs6(Fragment, { children: [
        name && /* @__PURE__ */ jsx17("input", { type: "hidden", name, value: hiddenValue }),
        /* @__PURE__ */ jsxs6("div", { className: "relative flex items-center", children: [
          /* @__PURE__ */ jsx17(
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
          suffix && /* @__PURE__ */ jsx17(
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
import { jsx as jsx18, jsxs as jsxs7 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx18(
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
      children: ({ describedBy }) => /* @__PURE__ */ jsxs7("div", { className: cn("relative", className), children: [
        /* @__PURE__ */ jsx18(
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
        showToggle && /* @__PURE__ */ jsx18(
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

// src/components/atoms/Price/Price.tsx
import { jsx as jsx19, jsxs as jsxs8 } from "react/jsx-runtime";
var sizeStyles6 = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-2xl"
};
var toneStyles4 = {
  default: "text-foreground",
  primary: "text-primary-main",
  accent: "text-accent-main",
  muted: "text-muted"
};
function formatManYen(value) {
  const man = value / 1e4;
  const rounded = Math.round(man * 10) / 10;
  const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  return `${text}\u4E07\u5186`;
}
function formatYen(value) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(value);
}
var Price = ({
  value,
  format = "man",
  size = "md",
  tone = "default",
  unit,
  caption,
  className
}) => {
  const formatted = format === "yen" ? formatYen(value) : formatManYen(value);
  return /* @__PURE__ */ jsxs8("span", { className: cn("inline-flex flex-col", className), children: [
    /* @__PURE__ */ jsxs8(
      "span",
      {
        className: cn(
          "font-bold tabular-nums leading-tight",
          sizeStyles6[size],
          toneStyles4[tone]
        ),
        children: [
          formatted,
          unit && /* @__PURE__ */ jsx19("span", { className: "ml-0.5 text-xs font-medium text-muted", children: unit })
        ]
      }
    ),
    caption && /* @__PURE__ */ jsx19("span", { className: "text-xs text-muted", children: caption })
  ] });
};

// src/components/atoms/ProgressBar/ProgressBar.tsx
import { jsx as jsx20 } from "react/jsx-runtime";
var sizeStyles7 = {
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
  return /* @__PURE__ */ jsx20(
    "div",
    {
      role: "progressbar",
      "aria-valuenow": clampedValue,
      "aria-valuemin": 0,
      "aria-valuemax": safeMax,
      "aria-label": label,
      className: cn(
        "w-full overflow-hidden rounded-full bg-[var(--kui-color-info-subtle)]",
        sizeStyles7[size],
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx20(
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
import { jsx as jsx21, jsxs as jsxs9 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx21(
    FormField,
    {
      label,
      description,
      error,
      required,
      size,
      className,
      children: ({ describedBy }) => /* @__PURE__ */ jsx21(
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
          children: options.map((option, index) => /* @__PURE__ */ jsxs9(
            "label",
            {
              className: cn(
                "inline-flex items-center gap-2 text-foreground",
                (disabled || option.disabled) && "cursor-not-allowed opacity-50"
              ),
              children: [
                /* @__PURE__ */ jsx21(
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
                /* @__PURE__ */ jsx21("span", { children: option.label })
              ]
            },
            option.value
          ))
        }
      )
    }
  );
}

// src/components/atoms/RangeSlider/RangeSlider.tsx
import { useId as useId7, useRef as useRef2 } from "react";
import { jsx as jsx22, jsxs as jsxs10 } from "react/jsx-runtime";
var clamp = (value, min, max) => Math.min(max, Math.max(min, value));
var snap = (value, min, max, step) => {
  const steps = Math.round((value - min) / step);
  return clamp(min + steps * step, min, max);
};
var RangeSlider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  description,
  error,
  disabled = false,
  formatValue,
  className
}) => {
  const baseId = useId7();
  const trackRef = useRef2(null);
  const draggingRef = useRef2(null);
  const [lower, upper] = value;
  const span = max - min || 1;
  const percent = (v) => clamp((v - min) / span * 100, 0, 100);
  const format = (v) => formatValue ? formatValue(v) : String(v);
  const commit = (index, next) => {
    if (disabled) return;
    const snapped = snap(next, min, max, step);
    if (index === 0) {
      onChange([clamp(snapped, min, upper), upper]);
    } else {
      onChange([lower, clamp(snapped, lower, max)]);
    }
  };
  const valueFromClientX = (clientX) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return min;
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    return min + ratio * span;
  };
  const handleTrackPointerDown = (event) => {
    if (disabled) return;
    const next = valueFromClientX(event.clientX);
    const index = Math.abs(next - lower) <= Math.abs(next - upper) ? 0 : 1;
    draggingRef.current = index;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    commit(index, next);
  };
  const handlePointerMove = (event) => {
    const index = draggingRef.current;
    if (index === null || disabled) return;
    commit(index, valueFromClientX(event.clientX));
  };
  const endDrag = () => {
    draggingRef.current = null;
  };
  const handleKeyDown = (index, event) => {
    if (disabled) return;
    const current = index === 0 ? lower : upper;
    let next = null;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = current + step;
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = current - step;
        break;
      case "PageUp":
        next = current + step * 10;
        break;
      case "PageDown":
        next = current - step * 10;
        break;
      case "Home":
        next = min;
        break;
      case "End":
        next = max;
        break;
      default:
        return;
    }
    event.preventDefault();
    commit(index, next);
  };
  const thumbClass = cn(
    "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-surface bg-primary-main shadow-sm",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-info-main focus-visible:ring-offset-1",
    disabled && "cursor-not-allowed opacity-50"
  );
  const renderThumb = (index, current, describedBy) => /* @__PURE__ */ jsx22(
    "button",
    {
      id: `${baseId}-${index}`,
      type: "button",
      role: "slider",
      "aria-label": `${label ?? "\u7BC4\u56F2"} ${index === 0 ? "\u4E0B\u9650" : "\u4E0A\u9650"}`,
      "aria-valuemin": index === 0 ? min : lower,
      "aria-valuemax": index === 0 ? upper : max,
      "aria-valuenow": current,
      "aria-valuetext": format(current),
      "aria-describedby": describedBy,
      "aria-disabled": disabled,
      disabled,
      onKeyDown: (event) => handleKeyDown(index, event),
      onPointerDown: (event) => {
        if (disabled) return;
        draggingRef.current = index;
        event.currentTarget.setPointerCapture?.(event.pointerId);
        event.stopPropagation();
      },
      style: { left: `calc(${percent(current)}% - 0.5rem)` },
      className: thumbClass
    },
    index === 0 ? "lower" : "upper"
  );
  return /* @__PURE__ */ jsx22(
    FormField,
    {
      label,
      description,
      error,
      className,
      htmlFor: `${baseId}-0`,
      children: ({ describedBy }) => /* @__PURE__ */ jsxs10("div", { className: "w-full", children: [
        /* @__PURE__ */ jsxs10("div", { className: "flex items-center justify-between pb-1 text-xs text-muted", children: [
          /* @__PURE__ */ jsx22("span", { "aria-hidden": "true", children: format(lower) }),
          /* @__PURE__ */ jsx22("span", { "aria-hidden": "true", children: format(upper) })
        ] }),
        /* @__PURE__ */ jsxs10(
          "div",
          {
            ref: trackRef,
            "data-testid": "range-slider-track",
            onPointerDown: handleTrackPointerDown,
            onPointerMove: handlePointerMove,
            onPointerUp: endDrag,
            onPointerCancel: endDrag,
            className: cn(
              "relative h-1.5 w-full rounded-full bg-surface-sunken",
              disabled && "opacity-50"
            ),
            children: [
              /* @__PURE__ */ jsx22(
                "div",
                {
                  className: "absolute h-full rounded-full bg-primary-main",
                  style: {
                    left: `${percent(lower)}%`,
                    width: `${percent(upper) - percent(lower)}%`
                  }
                }
              ),
              renderThumb(0, lower, describedBy),
              renderThumb(1, upper, describedBy)
            ]
          }
        ),
        /* @__PURE__ */ jsx22("span", { className: "sr-only", "aria-live": "polite", children: `${format(lower)} \u304B\u3089 ${format(upper)}` })
      ] })
    }
  );
};

// src/components/atoms/Rating/Rating.tsx
import { jsx as jsx23, jsxs as jsxs11 } from "react/jsx-runtime";
var sizeStyles8 = {
  sm: "h-3.5 w-3.5",
  md: "h-5 w-5",
  lg: "h-6 w-6"
};
var textSizeStyles = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base"
};
var StarIcon = ({
  filled,
  className
}) => /* @__PURE__ */ jsx23(
  "svg",
  {
    viewBox: "0 0 24 24",
    fill: filled ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    "aria-hidden": "true",
    className,
    children: /* @__PURE__ */ jsx23(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M11.48 3.5a.56.56 0 0 1 1.04 0l2.13 5.11 5.52.44a.56.56 0 0 1 .32.99l-4.2 3.6 1.28 5.38a.56.56 0 0 1-.84.61L12 16.94l-4.73 2.69a.56.56 0 0 1-.84-.61l1.28-5.38-4.2-3.6a.56.56 0 0 1 .32-.99l5.52-.44Z"
      }
    )
  }
);
var Rating = ({
  value,
  max = 5,
  onChange,
  readOnly = false,
  size = "md",
  label = "\u8A55\u4FA1",
  showValue = false,
  className
}) => {
  const interactive = Boolean(onChange) && !readOnly;
  const stars = Array.from({ length: max }, (_, index) => index + 1);
  const content = stars.map((star) => {
    const filled = star <= Math.round(value);
    const starIcon = /* @__PURE__ */ jsx23(
      StarIcon,
      {
        filled,
        className: cn(
          sizeStyles8[size],
          filled ? "text-accent-main" : "text-border-strong"
        )
      }
    );
    if (!interactive) {
      return /* @__PURE__ */ jsx23("span", { className: "inline-flex", "aria-hidden": "true", children: starIcon }, star);
    }
    return /* @__PURE__ */ jsx23(
      "button",
      {
        type: "button",
        "aria-label": `${label} ${star}`,
        "aria-pressed": star <= Math.round(value),
        onClick: () => onChange?.(star),
        className: "inline-flex rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-info-main",
        children: starIcon
      },
      star
    );
  });
  const valueLabel = showValue ? /* @__PURE__ */ jsx23(
    "span",
    {
      className: cn("ml-1 font-medium text-foreground", textSizeStyles[size]),
      children: value.toFixed(1)
    }
  ) : null;
  if (interactive) {
    return /* @__PURE__ */ jsxs11(
      "fieldset",
      {
        className: cn(
          "m-0 inline-flex items-center gap-1 border-0 p-0",
          className
        ),
        children: [
          /* @__PURE__ */ jsx23("legend", { className: "sr-only", children: label }),
          content,
          valueLabel
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs11(
    "span",
    {
      className: cn("inline-flex items-center gap-1", className),
      role: "img",
      "aria-label": `${label} ${value} / ${max}`,
      children: [
        content,
        valueLabel
      ]
    }
  );
};

// src/components/atoms/SearchInput/SearchInput.tsx
import { jsx as jsx24, jsxs as jsxs12 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs12("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ jsx24(
      "span",
      {
        className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsx24("svg", { className: "size-5", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx24(
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
    /* @__PURE__ */ jsx24(
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
    hasValue && !disabled && /* @__PURE__ */ jsx24(
      "button",
      {
        type: "button",
        "aria-label": clearButtonAriaLabel,
        onClick: handleClear,
        className: "absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted transition-colors hover:bg-surface-sunken hover:text-foreground",
        children: /* @__PURE__ */ jsx24(
          "svg",
          {
            className: "size-4",
            viewBox: "0 0 24 24",
            fill: "none",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsx24(
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
import { useRef as useRef3 } from "react";
import { jsx as jsx25 } from "react/jsx-runtime";
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
  const optionRefs = useRef3([]);
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
  return /* @__PURE__ */ jsx25(
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
        /* @__PURE__ */ jsx25(
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
import { useId as useId8 } from "react";
import { jsx as jsx26, jsxs as jsxs13 } from "react/jsx-runtime";
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
  const baseId = useId8();
  const selectId = id ?? `${baseId}-select`;
  const selectValueProps = value !== void 0 ? { value } : placeholder ? { defaultValue: "" } : {};
  return /* @__PURE__ */ jsx26(
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
      children: ({ describedBy }) => /* @__PURE__ */ jsxs13("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs13(
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
              placeholder && /* @__PURE__ */ jsx26("option", { value: "", disabled: !clearable, children: placeholder }),
              options.map((option) => /* @__PURE__ */ jsx26(
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
        /* @__PURE__ */ jsx26(
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
            children: /* @__PURE__ */ jsx26(
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
import { jsx as jsx27 } from "react/jsx-runtime";
function Skeleton({
  variant = "text",
  animation = "pulse",
  width,
  height,
  className
}) {
  return /* @__PURE__ */ jsx27(
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
import { useId as useId9 } from "react";
import { jsx as jsx28, jsxs as jsxs14 } from "react/jsx-runtime";
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
  const id = useId9();
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
  return /* @__PURE__ */ jsx28(
    FormField,
    {
      label,
      description,
      error,
      className,
      htmlFor: `${id}-0`,
      children: ({ describedBy }) => /* @__PURE__ */ jsxs14("div", { className: cn("flex gap-2", className), children: [
        values.map((current, index) => /* @__PURE__ */ jsx28(
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
        marks && /* @__PURE__ */ jsx28("span", { "aria-hidden": "true", className: "sr-only", children: "marks" })
      ] })
    }
  );
}

// src/components/atoms/Spinner/Spinner.tsx
import { jsx as jsx29, jsxs as jsxs15 } from "react/jsx-runtime";
var sizeStyles9 = {
  small: "h-5 w-5",
  medium: "h-8 w-8",
  large: "h-12 w-12"
};
var Spinner = ({
  size = "medium",
  label,
  className
}) => {
  return /* @__PURE__ */ jsx29(
    "div",
    {
      className: cn(
        "flex items-center justify-center h-full min-h-[200px]",
        className
      ),
      children: /* @__PURE__ */ jsxs15("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx29(
          "div",
          {
            className: cn(
              "animate-spin rounded-full border-b-2 border-info-main mx-auto mb-2",
              sizeStyles9[size]
            )
          }
        ),
        label && /* @__PURE__ */ jsx29("p", { className: "text-muted text-sm", children: label })
      ] })
    }
  );
};

// src/components/atoms/Textarea/Textarea.tsx
import { useId as useId10 } from "react";
import { jsx as jsx30 } from "react/jsx-runtime";
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
  const baseId = useId10();
  const textareaId = id ?? `${baseId}-textarea`;
  return /* @__PURE__ */ jsx30(
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
      children: ({ describedBy }) => /* @__PURE__ */ jsx30(
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
import { jsx as jsx31, jsxs as jsxs16 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs16(
    "output",
    {
      ...events,
      className: cn(
        "flex min-w-72 items-start gap-3 rounded-md border p-3 text-foreground shadow-lg",
        toastStyles[variant],
        className
      ),
      children: [
        /* @__PURE__ */ jsxs16("div", { className: "flex-1", children: [
          title && /* @__PURE__ */ jsx31("p", { className: "font-medium", children: title }),
          message && /* @__PURE__ */ jsx31("p", { className: "text-sm", children: message }),
          action && /* @__PURE__ */ jsx31(
            "button",
            {
              type: "button",
              onClick: action.onClick,
              className: "mt-1 text-sm font-medium text-primary-main",
              children: action.label
            }
          )
        ] }),
        onDismiss && /* @__PURE__ */ jsx31(
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
import { jsx as jsx32, jsxs as jsxs17 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs17(
    "label",
    {
      className: cn(
        "inline-flex items-center gap-2",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      ),
      children: [
        /* @__PURE__ */ jsx32(
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
        /* @__PURE__ */ jsx32(
          "div",
          {
            "aria-hidden": "true",
            className: cn(
              "relative inline-flex items-center rounded-full transition-colors duration-200",
              trackSizeStyles[size],
              checked ? "bg-primary-main" : "bg-border-strong"
            ),
            children: /* @__PURE__ */ jsx32(
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
        label && /* @__PURE__ */ jsx32(
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
import { useId as useId11 } from "react";
import { jsx as jsx33, jsxs as jsxs18 } from "react/jsx-runtime";
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
  const baseId = useId11();
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
  return /* @__PURE__ */ jsx33(
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
      children: ({ describedBy }) => /* @__PURE__ */ jsxs18("div", { className: "relative flex items-center", children: [
        /* @__PURE__ */ jsx33(
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
        showClear && /* @__PURE__ */ jsx33(
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
import { useId as useId12, useRef as useRef4, useState as useState4 } from "react";
import { jsx as jsx34, jsxs as jsxs19 } from "react/jsx-runtime";
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
  const baseId = useId12();
  const triggers = useRef4([]);
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
  return /* @__PURE__ */ jsx34(
    "div",
    {
      className: cn("divide-y divide-border border-y border-border", className),
      children: items.map((item, index) => {
        const isOpen = openValues.includes(item.value);
        const triggerId = `${baseId}-${item.value}-trigger`;
        const panelId = `${baseId}-${item.value}-panel`;
        return /* @__PURE__ */ jsxs19("div", { children: [
          /* @__PURE__ */ jsx34("h3", { children: /* @__PURE__ */ jsxs19(
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
                /* @__PURE__ */ jsx34("span", { "aria-hidden": "true", className: "text-muted", children: isOpen ? "\u2212" : "+" })
              ]
            }
          ) }),
          isOpen && /* @__PURE__ */ jsx34(
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
import { jsx as jsx35 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx35(
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
import { jsx as jsx36, jsxs as jsxs20 } from "react/jsx-runtime";
function AvatarGroup({ avatars, max, className }) {
  const visible = max === void 0 ? avatars : avatars.slice(0, max);
  const remaining = Math.max(0, avatars.length - visible.length);
  return /* @__PURE__ */ jsxs20("fieldset", { "aria-label": "Avatars", className: cn("flex -space-x-2", className), children: [
    visible.map((avatar) => /* @__PURE__ */ jsx36(
      Avatar,
      {
        ...avatar,
        className: cn("ring-2 ring-surface", avatar.className)
      },
      `${avatar.src ?? ""}-${avatar.name ?? ""}`
    )),
    remaining > 0 && /* @__PURE__ */ jsxs20("span", { className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-sunken text-sm text-foreground ring-2 ring-surface", children: [
      "+",
      remaining
    ] })
  ] });
}

// src/components/molecules/BottomSheet/BottomSheet.tsx
import { useEffect, useId as useId13, useRef as useRef5, useState as useState5 } from "react";
import { jsx as jsx37, jsxs as jsxs21 } from "react/jsx-runtime";
var getViewportHeight = () => typeof window === "undefined" ? 800 : window.innerHeight || 800;
var BottomSheet = ({
  open,
  onClose,
  children,
  title,
  snapPoints = [0.35, 0.9],
  defaultSnapIndex = 0,
  onSnapChange,
  showBackdrop = false,
  closeOnBackdrop = true,
  handleLabel = "\u30B7\u30FC\u30C8\u306E\u9AD8\u3055\u3092\u5909\u66F4",
  className
}) => {
  const titleId = useId13();
  const [snapIndex, setSnapIndex] = useState5(defaultSnapIndex);
  const [dragFraction, setDragFraction] = useState5(null);
  const dragRef = useRef5(null);
  useEffect(() => {
    if (open) setSnapIndex(defaultSnapIndex);
  }, [open, defaultSnapIndex]);
  if (!open) return null;
  const sorted = [...snapPoints].sort((a, b) => a - b);
  const clampedIndex = Math.min(Math.max(snapIndex, 0), sorted.length - 1);
  const fraction = dragFraction ?? sorted[clampedIndex];
  const dragging = dragFraction !== null;
  const moveTo = (nextIndex) => {
    const clamped = Math.min(Math.max(nextIndex, 0), sorted.length - 1);
    setSnapIndex(clamped);
    onSnapChange?.(clamped, sorted[clamped]);
  };
  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragRef.current = {
      startY: event.clientY,
      startFraction: sorted[clampedIndex]
    };
  };
  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag) return;
    const delta = (event.clientY - drag.startY) / getViewportHeight();
    const next = Math.min(
      Math.max(drag.startFraction - delta, sorted[0]),
      sorted[sorted.length - 1]
    );
    setDragFraction(next);
  };
  const handlePointerUp = () => {
    if (dragRef.current === null) return;
    dragRef.current = null;
    const current = dragFraction ?? sorted[clampedIndex];
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    sorted.forEach((point, index) => {
      const distance2 = Math.abs(point - current);
      if (distance2 < nearestDistance) {
        nearestDistance = distance2;
        nearest = index;
      }
    });
    setDragFraction(null);
    moveTo(nearest);
  };
  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveTo(clampedIndex + 1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      moveTo(clampedIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveTo(sorted.length - 1);
    }
  };
  return /* @__PURE__ */ jsxs21(
    "div",
    {
      className: "fixed inset-x-0 bottom-0 z-[var(--kui-z-drawer)] flex flex-col justify-end",
      style: { height: "100vh", pointerEvents: "none" },
      children: [
        showBackdrop && /* @__PURE__ */ jsx37(
          "button",
          {
            type: "button",
            "aria-label": "\u30B7\u30FC\u30C8\u3092\u9589\u3058\u308B",
            disabled: !closeOnBackdrop,
            onClick: onClose,
            className: "absolute inset-0 bg-[var(--kui-color-overlay)]",
            style: { pointerEvents: "auto" }
          }
        ),
        /* @__PURE__ */ jsxs21(
          "div",
          {
            role: "dialog",
            "aria-modal": showBackdrop || void 0,
            "aria-labelledby": title ? titleId : void 0,
            "aria-label": title ? void 0 : "\u30DC\u30C8\u30E0\u30B7\u30FC\u30C8",
            style: {
              height: `${fraction * 100}vh`,
              pointerEvents: "auto"
            },
            className: cn(
              "relative flex w-full flex-col rounded-t-2xl border-t border-border bg-surface text-foreground shadow-xl",
              !dragging && "transition-[height] duration-200 ease-out",
              className
            ),
            children: [
              /* @__PURE__ */ jsxs21("div", { className: "flex flex-col items-center pt-2", children: [
                /* @__PURE__ */ jsx37(
                  "button",
                  {
                    type: "button",
                    "aria-label": handleLabel,
                    onPointerDown: handlePointerDown,
                    onPointerMove: handlePointerMove,
                    onPointerUp: handlePointerUp,
                    onPointerCancel: handlePointerUp,
                    onKeyDown: handleKeyDown,
                    className: "flex h-6 w-full cursor-grab touch-none items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-info-main active:cursor-grabbing",
                    children: /* @__PURE__ */ jsx37(
                      "span",
                      {
                        "aria-hidden": "true",
                        className: "h-1.5 w-10 rounded-full bg-border-strong"
                      }
                    )
                  }
                ),
                title && /* @__PURE__ */ jsxs21("div", { className: "flex w-full items-center justify-between px-4 pb-2", children: [
                  /* @__PURE__ */ jsx37("h2", { id: titleId, className: "font-semibold", children: title }),
                  onClose && /* @__PURE__ */ jsx37(
                    "button",
                    {
                      type: "button",
                      "aria-label": "\u9589\u3058\u308B",
                      onClick: onClose,
                      className: "rounded p-1 text-muted hover:bg-surface-sunken",
                      children: "\xD7"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsx37("div", { className: "min-h-0 flex-1 overflow-y-auto px-4 pb-6", children })
            ]
          }
        )
      ]
    }
  );
};

// src/components/molecules/DropdownMenu/DropdownMenu.tsx
import {
  cloneElement as cloneElement2,
  isValidElement as isValidElement2,
  useRef as useRef8,
  useState as useState8
} from "react";

// src/components/molecules/Popover/Popover.tsx
import {
  cloneElement,
  isValidElement,
  useEffect as useEffect5,
  useRef as useRef7,
  useState as useState7
} from "react";
import { createPortal } from "react-dom";

// src/hooks/useEscapeKey.ts
import { useEffect as useEffect2 } from "react";
function useEscapeKey(handler, enabled = true) {
  useEffect2(() => {
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
import { useEffect as useEffect3, useRef as useRef6 } from "react";
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
  const previouslyFocusedElementRef = useRef6(null);
  const { initialFocusRef, returnFocusOnDeactivate = true } = options;
  useEffect3(() => {
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
import { useEffect as useEffect4, useState as useState6 } from "react";
var hookCreatedPortalContainer = null;
var portalContainerLeaseCount = 0;
function usePortalContainer(providedContainer) {
  const [container, setContainer] = useState6(
    providedContainer ?? null
  );
  useEffect4(() => {
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
import { Fragment as Fragment2, jsx as jsx38, jsxs as jsxs22 } from "react/jsx-runtime";
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
  const [uncontrolledOpen, setUncontrolledOpen] = useState7(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const triggerRef = useRef7(null);
  const contentRef = useRef7(null);
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
  useEffect5(() => {
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
  return /* @__PURE__ */ jsxs22(Fragment2, { children: [
    triggerElement,
    open && portalContainer && createPortal(
      /* @__PURE__ */ jsx38(
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
import { jsx as jsx39 } from "react/jsx-runtime";
var DropdownMenu = ({
  trigger,
  items,
  onSelect,
  renderLink,
  className
}) => {
  const [open, setOpen] = useState8(false);
  const [activeIndex, setActiveIndex] = useState8(
    () => items.findIndex((item) => !item.disabled)
  );
  const refs = useRef8([]);
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
  return /* @__PURE__ */ jsx39(
    Popover,
    {
      trigger,
      open,
      onOpenChange: handleOpenChange,
      className: cn("p-1", className),
      children: /* @__PURE__ */ jsx39(
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
            return /* @__PURE__ */ jsx39(
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
import { Fragment as Fragment3, jsx as jsx40, jsxs as jsxs23 } from "react/jsx-runtime";
var defaultRenderLink = ({
  href,
  children,
  className
}) => /* @__PURE__ */ jsx40("a", { href, className, children });
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
  const renderItem = (item, index, total) => /* @__PURE__ */ jsxs23("span", { children: [
    index > 0 && /* @__PURE__ */ jsx40("span", { "aria-hidden": "true", className: "px-2 text-muted", children: separator }),
    item.href && index < total - 1 ? renderLink({
      href: item.href,
      className: "text-muted hover:text-foreground",
      children: item.label
    }) : /* @__PURE__ */ jsx40("span", { "aria-current": index === total - 1 ? "page" : void 0, children: item.label })
  ] }, `${String(item.label)}-${index}`);
  return /* @__PURE__ */ jsx40("nav", { "aria-label": "\u30D1\u30F3\u304F\u305A", className, children: /* @__PURE__ */ jsx40("ol", { className: "flex items-center text-sm", children: collapsed.length ? /* @__PURE__ */ jsxs23(Fragment3, { children: [
    /* @__PURE__ */ jsx40("li", { children: renderItem(visible[0], 0, visible.length) }),
    /* @__PURE__ */ jsxs23("li", { children: [
      /* @__PURE__ */ jsx40("span", { "aria-hidden": "true", className: "px-2 text-muted", children: separator }),
      /* @__PURE__ */ jsx40(
        DropdownMenu,
        {
          trigger: /* @__PURE__ */ jsx40(
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
    visible.slice(1).map((item, index) => /* @__PURE__ */ jsx40("li", { children: renderItem(item, index + 1, visible.length) }, String(item.label)))
  ] }) : visible.map((item, index) => /* @__PURE__ */ jsx40("li", { children: renderItem(item, index, visible.length) }, String(item.label))) }) });
};

// src/components/molecules/Calendar/Calendar.tsx
import { useEffect as useEffect6, useState as useState9 } from "react";
import { jsx as jsx41, jsxs as jsxs24 } from "react/jsx-runtime";
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
  const [month, setMonth] = useState9(() => toMonthDate(value ?? defaultMonth));
  useEffect6(() => {
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
  return /* @__PURE__ */ jsxs24(
    "div",
    {
      className: cn("w-72 rounded-md bg-surface text-foreground", className),
      children: [
        /* @__PURE__ */ jsxs24("div", { className: "mb-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx41(
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
          /* @__PURE__ */ jsxs24("span", { className: "font-medium", children: [
            year,
            "\u5E74",
            monthIndex + 1,
            "\u6708"
          ] }),
          /* @__PURE__ */ jsx41(
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
        /* @__PURE__ */ jsx41("div", { className: "grid grid-cols-7 text-center text-xs text-muted", children: labels.map((label) => /* @__PURE__ */ jsx41("span", { className: "py-1", children: label }, label)) }),
        /* @__PURE__ */ jsx41("div", { className: "grid grid-cols-7 gap-1", children: days.map((date) => {
          const key = toDateKey(date);
          const outside = date.getMonth() !== monthIndex;
          const disabled = isDisabled(key);
          return /* @__PURE__ */ jsx41(
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
  useEffect as useEffect7,
  useId as useId14,
  useMemo as useMemo2,
  useRef as useRef9,
  useState as useState10
} from "react";
import { jsx as jsx42, jsxs as jsxs25 } from "react/jsx-runtime";
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
  const [query, setQuery] = useState10("");
  const [open, setOpen] = useState10(false);
  const [activeIndex, setActiveIndex] = useState10(null);
  const rootRef = useRef9(null);
  const listId = useId14();
  const closeOptions = useCallback2(() => {
    setOpen(false);
    setActiveIndex(null);
  }, []);
  const selected = multiple ? Array.isArray(value) ? value : [] : typeof value === "string" ? value : "";
  const selectedOptions = options.filter(
    (option) => multiple ? selected.includes(option.value) : selected === option.value
  );
  const selectedSingleLabel = multiple ? "" : selectedOptions[0]?.label ?? "";
  useEffect7(() => {
    if (multiple) return;
    setQuery(selectedSingleLabel);
  }, [multiple, selectedSingleLabel]);
  useEffect7(() => {
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
  return /* @__PURE__ */ jsxs25("div", { ref: rootRef, className: cn("relative", className), children: [
    multiple && selectedOptions.length > 0 && /* @__PURE__ */ jsx42("div", { className: "mb-1 flex flex-wrap gap-1", children: selectedOptions.map((option) => /* @__PURE__ */ jsx42(
      "span",
      {
        className: "rounded bg-surface-sunken px-2 py-1 text-xs text-foreground",
        children: option.label
      },
      option.value
    )) }),
    /* @__PURE__ */ jsx42(
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
    open && /* @__PURE__ */ jsxs25(
      "div",
      {
        id: listId,
        role: "listbox",
        className: "absolute z-[var(--kui-z-popover)] mt-1 max-h-56 w-full overflow-auto rounded-md border border-border bg-surface p-1 shadow-lg",
        children: [
          filtered.map((option, index) => {
            const selectedOption = multiple ? selected.includes(option.value) : selected === option.value;
            return /* @__PURE__ */ jsx42(
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
          filtered.length === 0 && /* @__PURE__ */ jsx42("p", { className: "px-3 py-2 text-sm text-muted", children: "\u5019\u88DC\u304C\u3042\u308A\u307E\u305B\u3093" })
        ]
      }
    )
  ] });
};

// src/components/molecules/Dialog/Dialog.tsx
import { useEffect as useEffect8, useId as useId15, useRef as useRef10 } from "react";
import { jsx as jsx43, jsxs as jsxs26 } from "react/jsx-runtime";
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
  const dialogRef = useRef10(null);
  const closeButtonRef = useRef10(null);
  const titleId = useId15();
  useEscapeKey(onClose, open);
  useFocusTrap(dialogRef, open, { initialFocusRef: closeButtonRef });
  useEffect8(() => {
    if (!open) return;
    return lockBodyScroll();
  }, [open]);
  const handleBackdropClick = () => {
    if (!disableOutsideClick) {
      onClose();
    }
  };
  if (!open) return null;
  return /* @__PURE__ */ jsxs26(
    "div",
    {
      className: "fixed inset-0 z-[var(--kui-z-modal)] overflow-y-auto flex items-start sm:items-center justify-center p-4 pt-12 sm:pt-4",
      style: {
        backgroundColor: "var(--kui-color-overlay)",
        backdropFilter: "blur(2px)"
      },
      children: [
        /* @__PURE__ */ jsx43(
          "button",
          {
            type: "button",
            "aria-label": "Close dialog backdrop",
            className: "absolute inset-0 cursor-default",
            disabled: disableOutsideClick,
            onClick: handleBackdropClick
          }
        ),
        /* @__PURE__ */ jsxs26(
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
              (title || !hideCloseButton) && /* @__PURE__ */ jsxs26("div", { className: "flex justify-between items-center p-6 pb-4", children: [
                title && /* @__PURE__ */ jsx43(
                  "h3",
                  {
                    id: titleId,
                    className: "text-lg font-semibold text-foreground",
                    children: title
                  }
                ),
                !hideCloseButton && /* @__PURE__ */ jsx43(
                  "button",
                  {
                    ref: closeButtonRef,
                    type: "button",
                    onClick: onClose,
                    className: "text-muted hover:text-foreground transition-colors p-1",
                    "aria-label": closeButtonLabel,
                    children: /* @__PURE__ */ jsx43(
                      "svg",
                      {
                        className: "h-6 w-6",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        strokeWidth: 1.5,
                        stroke: "currentColor",
                        children: /* @__PURE__ */ jsx43(
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
              /* @__PURE__ */ jsx43("div", { className: title || !hideCloseButton ? "px-6 pb-6" : "p-6", children })
            ]
          }
        )
      ]
    }
  );
};

// src/components/molecules/ConfirmDialog/ConfirmDialog.tsx
import { jsx as jsx44, jsxs as jsxs27 } from "react/jsx-runtime";
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
var DefaultIcon = ({ className }) => /* @__PURE__ */ jsx44(
  "svg",
  {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx44(
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
  return /* @__PURE__ */ jsxs27(
    Dialog,
    {
      open,
      onClose,
      maxWidth: "sm",
      disableOutsideClick: isProcessing,
      children: [
        /* @__PURE__ */ jsxs27("div", { className: "flex items-center mb-4", children: [
          /* @__PURE__ */ jsx44(
            "div",
            {
              className: cn("rounded-full p-2 mr-3 flex-shrink-0", styles2.iconBg),
              children: icon || /* @__PURE__ */ jsx44(DefaultIcon, { className: cn("h-6 w-6", styles2.iconColor) })
            }
          ),
          /* @__PURE__ */ jsx44(
            Heading,
            {
              as: "h3",
              size: "md",
              style: { fontWeight: "var(--kui-font-weight-medium)" },
              children: title
            }
          )
        ] }),
        /* @__PURE__ */ jsxs27("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx44(Typography, { as: "div", children: message }),
          description && /* @__PURE__ */ jsx44(Typography, { className: "mt-2", variant: "body-sm", tone: "muted", children: description })
        ] }),
        /* @__PURE__ */ jsxs27("div", { className: "flex justify-end space-x-3", children: [
          /* @__PURE__ */ jsx44(
            "button",
            {
              type: "button",
              onClick: onClose,
              disabled: isProcessing,
              className: "px-4 py-2 text-sm font-medium text-foreground bg-surface-sunken hover:bg-border text rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-border-strong disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
              children: cancelLabel
            }
          ),
          /* @__PURE__ */ jsx44(
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

// src/components/molecules/ContactForm/ContactForm.tsx
import { useState as useState11 } from "react";
import { jsx as jsx45, jsxs as jsxs28 } from "react/jsx-runtime";
var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var INITIAL = {
  name: "",
  email: "",
  phone: "",
  date: "",
  message: "",
  consent: false
};
var ContactForm = ({
  title = "\u304A\u554F\u3044\u5408\u308F\u305B",
  subject,
  subjectLabel = "\u5BFE\u8C61",
  showPhone = true,
  showDate = true,
  dateLabel = "\u5E0C\u671B\u65E5",
  messageLabel = "\u304A\u554F\u3044\u5408\u308F\u305B\u5185\u5BB9",
  messagePlaceholder,
  consentLabel = "\u500B\u4EBA\u60C5\u5831\u306E\u53D6\u308A\u6271\u3044\u306B\u540C\u610F\u3057\u307E\u3059",
  submitLabel = "\u9001\u4FE1\u3059\u308B",
  defaultValues,
  onSubmit,
  loading = false,
  className
}) => {
  const [values, setValues] = useState11({
    ...INITIAL,
    ...defaultValues
  });
  const [errors, setErrors] = useState11({});
  const [submitting, setSubmitting] = useState11(false);
  const update = (partial) => {
    setValues((prev) => ({ ...prev, ...partial }));
  };
  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "\u6C0F\u540D\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002";
    if (!values.email.trim()) {
      next.email = "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002";
    } else if (!EMAIL_PATTERN.test(values.email)) {
      next.email = "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306E\u5F62\u5F0F\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002";
    }
    if (!values.message.trim()) {
      next.message = "\u5185\u5BB9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002";
    }
    if (!values.consent) {
      next.consent = "\u540C\u610F\u304C\u5FC5\u8981\u3067\u3059\u3002";
    }
    return next;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };
  const busy = loading || submitting;
  return /* @__PURE__ */ jsxs28(
    "form",
    {
      noValidate: true,
      onSubmit: handleSubmit,
      className: cn(
        "flex flex-col gap-4 rounded-lg border border-border bg-surface p-4",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs28("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx45(Heading, { as: "h3", size: "sm", children: title }),
          subject && /* @__PURE__ */ jsxs28(Typography, { variant: "caption", tone: "muted", children: [
            `${subjectLabel}: `,
            subject
          ] })
        ] }),
        /* @__PURE__ */ jsx45(
          Input,
          {
            label: "\u6C0F\u540D",
            required: true,
            value: values.name,
            onChange: (name) => update({ name }),
            error: errors.name,
            placeholder: "\u5C71\u7530 \u592A\u90CE"
          }
        ),
        /* @__PURE__ */ jsx45(
          Input,
          {
            type: "text",
            label: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9",
            required: true,
            value: values.email,
            onChange: (email) => update({ email }),
            error: errors.email,
            placeholder: "taro@example.com"
          }
        ),
        (showPhone || showDate) && /* @__PURE__ */ jsxs28("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
          showPhone && /* @__PURE__ */ jsx45(
            Input,
            {
              label: "\u96FB\u8A71\u756A\u53F7",
              value: values.phone ?? "",
              onChange: (phone) => update({ phone }),
              placeholder: "090-0000-0000"
            }
          ),
          showDate && /* @__PURE__ */ jsx45(
            Input,
            {
              type: "date",
              label: dateLabel,
              value: values.date ?? "",
              onChange: (date) => update({ date })
            }
          )
        ] }),
        /* @__PURE__ */ jsx45(
          Textarea,
          {
            label: messageLabel,
            required: true,
            rows: 4,
            value: values.message,
            onChange: (message) => update({ message }),
            error: errors.message,
            placeholder: messagePlaceholder
          }
        ),
        /* @__PURE__ */ jsxs28("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx45(
            Checkbox,
            {
              checked: values.consent,
              onChange: (consent) => update({ consent }),
              label: consentLabel
            }
          ),
          errors.consent && /* @__PURE__ */ jsx45("p", { role: "alert", className: "text-xs text-danger-main", children: errors.consent })
        ] }),
        /* @__PURE__ */ jsx45(
          Button,
          {
            type: "submit",
            variant: "primary",
            fullWidth: true,
            disabled: busy,
            "aria-busy": busy,
            children: busy ? "\u9001\u4FE1\u4E2D..." : submitLabel
          }
        )
      ]
    }
  );
};

// src/components/molecules/DataTable/DataTable.tsx
import { useMemo as useMemo3, useState as useState12 } from "react";
import { Fragment as Fragment4, jsx as jsx46, jsxs as jsxs29 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx46("div", { className: "flex flex-wrap items-center justify-end gap-2", children: resolvedActions.map((action) => /* @__PURE__ */ jsx46(
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
  const [scrollTop, setScrollTop] = useState12(0);
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
    return /* @__PURE__ */ jsx46("div", { className: cn("w-full", className), "aria-busy": "true", children: /* @__PURE__ */ jsx46(Spinner, { label: loadingLabel }) });
  }
  if (mobileMode === "cards") {
    return /* @__PURE__ */ jsxs29("div", { className: cn("w-full", className), children: [
      /* @__PURE__ */ jsx46("div", { className: "hidden md:block overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxs29("table", { className: "min-w-full border-collapse", children: [
        /* @__PURE__ */ jsx46("thead", { className: "bg-surface-raised", children: /* @__PURE__ */ jsxs29("tr", { children: [
          columns.map((column) => /* @__PURE__ */ jsx46(
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
          hasActionColumn && /* @__PURE__ */ jsx46("th", { className: "px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted", children: actionHeader })
        ] }) }),
        /* @__PURE__ */ jsx46("tbody", { className: "divide-y divide-border", children: rows.length === 0 ? /* @__PURE__ */ jsx46("tr", { children: /* @__PURE__ */ jsx46(
          "td",
          {
            colSpan: tableColumnCount,
            className: "px-4 py-8 text-center text-sm text-muted",
            children: /* @__PURE__ */ jsx46(Typography, { as: "span", tone: "muted", children: emptyMessage })
          }
        ) }) : rows.map((row, index) => /* @__PURE__ */ jsxs29("tr", { className: "bg-surface", children: [
          columns.map((column) => /* @__PURE__ */ jsx46(
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
          hasActionColumn && /* @__PURE__ */ jsx46("td", { className: "px-4 py-3 text-right", children: renderActions(row, actions) })
        ] }, getRowId(row, index))) })
      ] }) }),
      /* @__PURE__ */ jsx46("div", { className: "space-y-3 md:hidden", children: rows.length === 0 ? /* @__PURE__ */ jsx46("div", { className: "rounded-lg border border-dashed border-border-strong bg-surface-raised px-4 py-8 text-center", children: /* @__PURE__ */ jsx46(Typography, { as: "p", tone: "muted", children: emptyMessage }) }) : rows.map((row, index) => /* @__PURE__ */ jsxs29(
        "div",
        {
          className: "rounded-lg border border-border bg-surface p-4 shadow-sm",
          children: [
            /* @__PURE__ */ jsx46("dl", { className: "space-y-3", children: columns.map((column) => /* @__PURE__ */ jsxs29("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx46("dt", { className: "text-xs font-semibold uppercase tracking-wide text-muted", children: column.mobileLabel ?? column.header }),
              /* @__PURE__ */ jsx46(
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
            hasActionColumn && /* @__PURE__ */ jsx46("div", { className: "mt-4", children: renderActions(row, actions) })
          ]
        },
        getRowId(row, index)
      )) })
    ] });
  }
  return /* @__PURE__ */ jsx46(
    "div",
    {
      className: cn(
        "w-full overflow-x-auto rounded-lg border border-border",
        className
      ),
      style: tableWrapperStyle,
      onScroll: shouldVirtualize ? (event) => setScrollTop(event.currentTarget.scrollTop) : void 0,
      children: /* @__PURE__ */ jsxs29("table", { className: "min-w-full border-collapse", children: [
        /* @__PURE__ */ jsx46("thead", { className: "bg-surface-raised", children: /* @__PURE__ */ jsxs29("tr", { children: [
          columns.map((column) => /* @__PURE__ */ jsx46(
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
          hasActionColumn && /* @__PURE__ */ jsx46("th", { className: "px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted", children: actionHeader })
        ] }) }),
        /* @__PURE__ */ jsx46("tbody", { className: "divide-y divide-border", children: rows.length === 0 ? /* @__PURE__ */ jsx46("tr", { children: /* @__PURE__ */ jsx46(
          "td",
          {
            colSpan: tableColumnCount,
            className: "px-4 py-8 text-center text-sm text-muted",
            children: /* @__PURE__ */ jsx46(Typography, { as: "span", tone: "muted", children: emptyMessage })
          }
        ) }) : /* @__PURE__ */ jsxs29(Fragment4, { children: [
          shouldVirtualize && virtualizedWindow.topSpacerHeight > 0 && /* @__PURE__ */ jsx46("tr", { children: /* @__PURE__ */ jsx46(
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
            return /* @__PURE__ */ jsxs29("tr", { className: "bg-surface", children: [
              columns.map((column) => /* @__PURE__ */ jsx46(
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
              hasActionColumn && /* @__PURE__ */ jsx46("td", { className: "px-4 py-3 text-right", children: renderActions(row, actions) })
            ] }, getRowId(row, rowIndex));
          }),
          shouldVirtualize && virtualizedWindow.bottomSpacerHeight > 0 && /* @__PURE__ */ jsx46("tr", { children: /* @__PURE__ */ jsx46(
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
import { useState as useState13 } from "react";
import { jsx as jsx47, jsxs as jsxs30 } from "react/jsx-runtime";
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
  const [open, setOpen] = useState13(false);
  return /* @__PURE__ */ jsxs30("div", { className: cn("flex items-center gap-1", className), children: [
    /* @__PURE__ */ jsx47(
      Popover,
      {
        open,
        onOpenChange: setOpen,
        trigger: /* @__PURE__ */ jsxs30(
          "button",
          {
            type: "button",
            "aria-label": "\u30AB\u30EC\u30F3\u30C0\u30FC\u3092\u958B\u304F",
            disabled,
            className: "flex min-w-44 items-center justify-between rounded-md border border-border-strong bg-surface px-3 py-2 text-left text-foreground hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsx47("span", { className: value ? void 0 : "text-muted", children: value || placeholder }),
              /* @__PURE__ */ jsx47("span", { "aria-hidden": "true", children: "\u25A3" })
            ]
          }
        ),
        children: /* @__PURE__ */ jsx47(
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
    clearable && value && /* @__PURE__ */ jsx47(
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
import { useEffect as useEffect9, useId as useId16, useRef as useRef11 } from "react";
import { createPortal as createPortal2 } from "react-dom";
import { jsx as jsx48, jsxs as jsxs31 } from "react/jsx-runtime";
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
  const drawerRef = useRef11(null);
  const closeButtonRef = useRef11(null);
  const titleId = useId16();
  const container = usePortalContainer();
  useEscapeKey(onClose, open);
  useFocusTrap(drawerRef, open, { initialFocusRef: closeButtonRef });
  useEffect9(() => {
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
    /* @__PURE__ */ jsxs31("div", { className: "fixed inset-0 z-[var(--kui-z-drawer)]", children: [
      /* @__PURE__ */ jsx48(
        "button",
        {
          type: "button",
          "aria-label": "\u30C9\u30ED\u30EF\u30FC\u306E\u80CC\u666F\u3092\u9589\u3058\u308B",
          disabled: !closeOnOutsideClick,
          onClick: onClose,
          className: "absolute inset-0 cursor-default bg-[var(--kui-color-overlay)]"
        }
      ),
      /* @__PURE__ */ jsxs31(
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
            /* @__PURE__ */ jsxs31("div", { className: "flex items-center justify-between border-b border-border px-4 py-3", children: [
              title && /* @__PURE__ */ jsx48("h2", { id: titleId, className: "font-semibold", children: title }),
              /* @__PURE__ */ jsx48(
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
            /* @__PURE__ */ jsx48("div", { className: "min-h-0 flex-1 overflow-auto p-4", children }),
            footer && /* @__PURE__ */ jsx48("div", { className: "border-t border-border p-4", children: footer })
          ]
        }
      )
    ] }),
    container
  );
};

// src/components/molecules/FacilityList/FacilityList.tsx
import { jsx as jsx49, jsxs as jsxs32 } from "react/jsx-runtime";
var columnStyles = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4"
};
var sizeStyles10 = {
  sm: "text-xs",
  md: "text-sm"
};
var gapStyles = {
  sm: "gap-x-3 gap-y-1.5",
  md: "gap-x-4 gap-y-2"
};
var itemGapStyles = {
  sm: "gap-1.5",
  md: "gap-2"
};
var iconWrapStyles = {
  sm: "h-5 w-5",
  md: "h-6 w-6"
};
var DefaultIcon2 = () => /* @__PURE__ */ jsx49(
  "svg",
  {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    "aria-hidden": "true",
    className: "h-full w-full",
    children: /* @__PURE__ */ jsx49("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m5 13 4 4L19 7" })
  }
);
var FacilityList = ({
  items,
  columns = 2,
  size = "md",
  title,
  className
}) => {
  return /* @__PURE__ */ jsxs32("div", { className: cn("flex flex-col gap-3", className), children: [
    title && /* @__PURE__ */ jsx49("h3", { className: "text-sm font-semibold text-foreground", children: title }),
    /* @__PURE__ */ jsx49(
      "ul",
      {
        className: cn(
          "grid",
          columnStyles[columns],
          sizeStyles10[size],
          gapStyles[size]
        ),
        children: items.map((item) => {
          const available = item.available ?? true;
          return /* @__PURE__ */ jsxs32(
            "li",
            {
              className: cn(
                "flex items-center",
                itemGapStyles[size],
                available ? "text-foreground" : "text-muted line-through"
              ),
              children: [
                /* @__PURE__ */ jsx49(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: cn(
                      "flex shrink-0 items-center justify-center rounded-full",
                      iconWrapStyles[size],
                      available ? "bg-success-subtle text-success-main" : "bg-surface-sunken text-muted"
                    ),
                    children: item.icon ?? /* @__PURE__ */ jsx49(DefaultIcon2, {})
                  }
                ),
                /* @__PURE__ */ jsx49("span", { children: item.label })
              ]
            },
            item.key
          );
        })
      }
    )
  ] });
};

// src/components/molecules/FileUploader/FileUploader.tsx
import { useId as useId17, useRef as useRef12, useState as useState14 } from "react";
import { jsx as jsx50, jsxs as jsxs33 } from "react/jsx-runtime";
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
  const inputRef = useRef12(null);
  const inputId = useId17();
  const [error, setError] = useState14();
  const [selectedCount, setSelectedCount] = useState14(0);
  const [isDragging, setIsDragging] = useState14(false);
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
  return /* @__PURE__ */ jsxs33("div", { className, children: [
    /* @__PURE__ */ jsx50(
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
    /* @__PURE__ */ jsxs33(
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
          /* @__PURE__ */ jsx50("span", { className: "font-medium", children: label }),
          /* @__PURE__ */ jsx50("span", { className: "mt-1 text-muted", children: "\u30C9\u30E9\u30C3\u30B0&\u30C9\u30ED\u30C3\u30D7\u3067\u3082\u8FFD\u52A0\u3067\u304D\u307E\u3059" })
        ]
      }
    ),
    error && /* @__PURE__ */ jsx50(
      "p",
      {
        id: `${inputId}-error`,
        role: "alert",
        className: "mt-2 text-sm text-danger-main",
        children: error
      }
    ),
    selectedCount > 0 && !error && /* @__PURE__ */ jsxs33("output", { className: "mt-2 text-sm text-muted", children: [
      selectedCount,
      "\u4EF6\u306E\u30D5\u30A1\u30A4\u30EB\u3092\u9078\u629E\u3057\u307E\u3057\u305F"
    ] })
  ] });
};

// src/components/molecules/FilterPanel/FilterPanel.tsx
import { jsx as jsx51, jsxs as jsxs34 } from "react/jsx-runtime";
var toggleValue = (list, target) => list.includes(target) ? list.filter((item) => item !== target) : [...list, target];
var checkboxColumnStyles = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2"
};
var renderField = (field, onChange) => {
  switch (field.type) {
    case "range":
      return /* @__PURE__ */ jsx51(
        RangeSlider,
        {
          label: field.label,
          description: field.description,
          value: field.value,
          onChange: (value) => onChange(field.key, value),
          min: field.min,
          max: field.max,
          step: field.step,
          formatValue: field.formatValue
        },
        field.key
      );
    case "chips":
      return /* @__PURE__ */ jsxs34("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx51(Heading, { as: "h3", size: "sm", children: field.label }),
        /* @__PURE__ */ jsx51("div", { className: "flex flex-wrap gap-2", children: field.options.map((option) => /* @__PURE__ */ jsx51(
          Chip,
          {
            variant: "primary",
            selected: field.value.includes(option.value),
            disabled: option.disabled,
            onClick: () => onChange(field.key, toggleValue(field.value, option.value)),
            children: option.label
          },
          option.value
        )) })
      ] }, field.key);
    case "checkboxes":
      return /* @__PURE__ */ jsxs34("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx51(Heading, { as: "h3", size: "sm", children: field.label }),
        /* @__PURE__ */ jsx51(
          "div",
          {
            className: cn(
              "grid gap-2",
              checkboxColumnStyles[field.columns ?? 2]
            ),
            children: field.options.map((option) => /* @__PURE__ */ jsx51(
              Checkbox,
              {
                checked: field.value.includes(option.value),
                disabled: option.disabled,
                onChange: () => onChange(field.key, toggleValue(field.value, option.value)),
                label: option.label
              },
              option.value
            ))
          }
        )
      ] }, field.key);
    case "select":
      return /* @__PURE__ */ jsx51(
        Select,
        {
          label: field.label,
          options: field.options,
          value: field.value ?? "",
          placeholder: field.placeholder,
          clearable: field.clearable,
          onChange: (value) => onChange(field.key, value)
        },
        field.key
      );
    case "toggle":
      return /* @__PURE__ */ jsx51(
        Checkbox,
        {
          checked: field.value,
          onChange: (checked) => onChange(field.key, checked),
          label: field.label
        },
        field.key
      );
    default:
      return null;
  }
};
var FilterPanel = ({
  fields,
  onChange,
  onReset,
  onSubmit,
  title,
  resetLabel = "\u6761\u4EF6\u3092\u30EA\u30BB\u30C3\u30C8",
  submitLabel = "\u3053\u306E\u6761\u4EF6\u3067\u9069\u7528",
  summary,
  className
}) => {
  return /* @__PURE__ */ jsxs34(
    "section",
    {
      "aria-label": typeof title === "string" ? title : "\u7D5E\u308A\u8FBC\u307F\u6761\u4EF6",
      className: cn(
        "flex flex-col gap-6 rounded-lg border border-border bg-surface p-4",
        className
      ),
      children: [
        title && /* @__PURE__ */ jsx51(Heading, { as: "h2", size: "sm", children: title }),
        fields.map((field) => renderField(field, onChange)),
        (onReset || onSubmit) && /* @__PURE__ */ jsxs34("div", { className: "flex flex-col gap-2 border-t border-border pt-4 sm:flex-row", children: [
          onReset && /* @__PURE__ */ jsx51(Button, { variant: "outline", fullWidth: true, onClick: onReset, children: resetLabel }),
          onSubmit && /* @__PURE__ */ jsx51(Button, { variant: "primary", fullWidth: true, onClick: onSubmit, children: submitLabel })
        ] }),
        summary && /* @__PURE__ */ jsx51(Typography, { variant: "caption", tone: "muted", children: summary })
      ]
    }
  );
};

// src/components/molecules/ImageGallery/ImageGallery.tsx
import { useRef as useRef13, useState as useState15 } from "react";
import { Fragment as Fragment5, jsx as jsx52, jsxs as jsxs35 } from "react/jsx-runtime";
var SWIPE_THRESHOLD = 40;
var ImageGallery = ({
  images,
  index,
  defaultIndex = 0,
  onIndexChange,
  onImageClick,
  aspectRatio = "4 / 3",
  showThumbnails = true,
  showCounter = true,
  className
}) => {
  const [innerIndex, setInnerIndex] = useState15(defaultIndex);
  const [dragX, setDragX] = useState15(0);
  const dragRef = useRef13(null);
  const current = index ?? innerIndex;
  const total = images.length;
  const clamped = total === 0 ? 0 : Math.min(Math.max(current, 0), total - 1);
  const goTo = (next) => {
    if (total === 0) return;
    const bounded = (next + total) % total;
    if (index === void 0) setInnerIndex(bounded);
    onIndexChange?.(bounded);
  };
  const handlePointerDown = (event) => {
    if (total <= 1) return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragRef.current = { startX: event.clientX, pointerId: event.pointerId };
  };
  const handlePointerMove = (event) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId)
      return;
    setDragX(event.clientX - dragRef.current.startX);
  };
  const handlePointerUp = () => {
    if (!dragRef.current) return;
    const delta = dragX;
    dragRef.current = null;
    setDragX(0);
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    goTo(delta < 0 ? clamped + 1 : clamped - 1);
  };
  if (total === 0) {
    return /* @__PURE__ */ jsx52(
      "div",
      {
        className: cn(
          "flex w-full items-center justify-center rounded-lg border border-dashed border-border-strong bg-surface-sunken text-muted",
          className
        ),
        style: { aspectRatio },
        children: "\u753B\u50CF\u304C\u3042\u308A\u307E\u305B\u3093"
      }
    );
  }
  const active = images[clamped];
  return /* @__PURE__ */ jsxs35("div", { className: cn("flex flex-col gap-2", className), children: [
    /* @__PURE__ */ jsxs35(
      "section",
      {
        "aria-roledescription": "\u30AB\u30EB\u30FC\u30BB\u30EB",
        "aria-label": "\u7269\u4EF6\u5199\u771F",
        onPointerDown: handlePointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerUp,
        onPointerCancel: handlePointerUp,
        style: { aspectRatio },
        className: "relative w-full touch-none overflow-hidden rounded-lg bg-surface-sunken",
        children: [
          /* @__PURE__ */ jsx52(
            "div",
            {
              className: "flex h-full w-full transition-transform duration-200",
              style: {
                transform: `translateX(calc(${-clamped * 100}% + ${dragX}px))`
              },
              children: images.map((image, imageIndex) => /* @__PURE__ */ jsx52(
                "button",
                {
                  type: "button",
                  tabIndex: imageIndex === clamped ? 0 : -1,
                  "aria-label": image.alt ? `${image.alt}\u3092\u62E1\u5927\u8868\u793A` : "\u753B\u50CF\u3092\u62E1\u5927\u8868\u793A",
                  "aria-hidden": imageIndex !== clamped,
                  onClick: () => onImageClick?.(imageIndex),
                  className: "h-full w-full shrink-0 cursor-zoom-in border-0 bg-transparent p-0",
                  children: /* @__PURE__ */ jsx52(
                    "img",
                    {
                      src: image.src,
                      alt: image.alt ?? `\u7269\u4EF6\u5199\u771F ${imageIndex + 1}`,
                      draggable: false,
                      className: "h-full w-full select-none object-cover"
                    }
                  )
                },
                image.src
              ))
            }
          ),
          showCounter && /* @__PURE__ */ jsxs35("span", { className: "absolute bottom-2 right-2 rounded bg-foreground/70 px-2 py-0.5 text-xs text-inverse", children: [
            clamped + 1,
            " / ",
            total
          ] }),
          total > 1 && /* @__PURE__ */ jsxs35(Fragment5, { children: [
            /* @__PURE__ */ jsx52(
              "button",
              {
                type: "button",
                "aria-label": "\u524D\u306E\u753B\u50CF",
                onClick: () => goTo(clamped - 1),
                className: "absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-foreground shadow-sm hover:bg-surface",
                children: /* @__PURE__ */ jsx52(
                  "svg",
                  {
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    "aria-hidden": "true",
                    className: "h-4 w-4",
                    children: /* @__PURE__ */ jsx52(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "m15 5-7 7 7 7"
                      }
                    )
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx52(
              "button",
              {
                type: "button",
                "aria-label": "\u6B21\u306E\u753B\u50CF",
                onClick: () => goTo(clamped + 1),
                className: "absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-foreground shadow-sm hover:bg-surface",
                children: /* @__PURE__ */ jsx52(
                  "svg",
                  {
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    "aria-hidden": "true",
                    className: "h-4 w-4",
                    children: /* @__PURE__ */ jsx52(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "m9 5 7 7-7 7"
                      }
                    )
                  }
                )
              }
            )
          ] })
        ]
      }
    ),
    showThumbnails && total > 1 && /* @__PURE__ */ jsx52("div", { className: "flex gap-2 overflow-x-auto pb-1", children: images.map((image, imageIndex) => /* @__PURE__ */ jsx52(
      "button",
      {
        type: "button",
        "aria-label": `${imageIndex + 1}\u679A\u76EE\u3092\u8868\u793A`,
        "aria-current": imageIndex === clamped,
        onClick: () => goTo(imageIndex),
        className: cn(
          "h-14 w-20 shrink-0 overflow-hidden rounded border-2",
          imageIndex === clamped ? "border-primary-main" : "border-transparent opacity-70 hover:opacity-100"
        ),
        children: /* @__PURE__ */ jsx52(
          "img",
          {
            src: image.src,
            alt: "",
            draggable: false,
            className: "h-full w-full object-cover"
          }
        )
      },
      `thumb-${image.src}`
    )) }),
    /* @__PURE__ */ jsx52("span", { className: "sr-only", "aria-live": "polite", children: `${clamped + 1}\u679A\u76EE: ${active.alt ?? ""}` })
  ] });
};

// src/components/molecules/Tooltip/Tooltip.tsx
import { useCallback as useCallback3, useEffect as useEffect11, useRef as useRef14, useState as useState16 } from "react";

// src/hooks/useClickOutside.ts
import { useEffect as useEffect10 } from "react";
function useClickOutside(ref, handler, enabled = true) {
  useEffect10(() => {
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
import { jsx as jsx53, jsxs as jsxs36 } from "react/jsx-runtime";
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
  const [isOpen, setIsOpen] = useState16(false);
  const [tooltipPosition, setTooltipPosition] = useState16("right");
  const tooltipRef = useRef14(null);
  const buttonRef = useRef14(null);
  const animationFrameRef = useRef14(null);
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
  useEffect11(() => {
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
  useEffect11(() => {
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
  return /* @__PURE__ */ jsxs36("div", { className: cn("relative inline-block", className), ref: tooltipRef, children: [
    /* @__PURE__ */ jsx53(
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
    isOpen && /* @__PURE__ */ jsxs36(
      "div",
      {
        className: cn(
          tooltipClass,
          "z-[var(--kui-z-tooltip)] bg-surface rounded-lg shadow-lg border border-border animate-kui-fade-in"
        ),
        children: [
          /* @__PURE__ */ jsx53("div", { className: "p-3 text-sm text-foreground", children: content }),
          /* @__PURE__ */ jsx53("div", { className: arrowClass, "aria-hidden": "true" })
        ]
      }
    )
  ] });
};

// src/components/molecules/InfoTooltip/InfoTooltip.tsx
import { jsx as jsx54 } from "react/jsx-runtime";
var iconSizeStyles3 = {
  sm: "w-4 h-4",
  md: "w-5 h-5"
};
var InfoTooltip = ({
  content,
  label = "Info",
  size = "md",
  className
}) => {
  return /* @__PURE__ */ jsx54(Tooltip, { content, triggerLabel: label, className, children: /* @__PURE__ */ jsx54(
    "svg",
    {
      className: cn(iconSizeStyles3[size]),
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx54(
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
import { jsx as jsx55, jsxs as jsxs37 } from "react/jsx-runtime";
var toneStyles5 = {
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
  return /* @__PURE__ */ jsx55(
    "dl",
    {
      className: cn("w-full", separator && "divide-y divide-border", className),
      children: items.map((item) => /* @__PURE__ */ jsxs37(
        "div",
        {
          className: cn(
            itemPaddingStyles[size],
            layout === "horizontal" ? "flex items-baseline justify-between gap-4" : "flex flex-col gap-0.5"
          ),
          children: [
            /* @__PURE__ */ jsx55("dt", { className: cn("text-muted shrink-0", keySizeStyles[size]), children: item.key }),
            /* @__PURE__ */ jsx55(
              "dd",
              {
                className: cn(
                  "font-medium",
                  valueSizeStyles[size],
                  toneStyles5[item.tone ?? "default"],
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
import { jsx as jsx56 } from "react/jsx-runtime";
var ListItem = ({
  children,
  hoverable = true,
  bordered = true,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx56(
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
import { jsx as jsx57, jsxs as jsxs38 } from "react/jsx-runtime";
var DefaultCloseIcon = () => /* @__PURE__ */ jsx57(
  "svg",
  {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx57(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M6 18L18 6M6 6l12 12"
      }
    )
  }
);
var DefaultSearchIcon = () => /* @__PURE__ */ jsx57(
  "svg",
  {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx57(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      }
    )
  }
);
var DefaultFilterIcon = () => /* @__PURE__ */ jsx57(
  "svg",
  {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx57(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
      }
    )
  }
);
var DefaultAddIcon = () => /* @__PURE__ */ jsx57(
  "svg",
  {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx57(
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
  const SearchIconComponent = searchIcon || /* @__PURE__ */ jsx57(DefaultSearchIcon, {});
  const FilterIconComponent = filterIcon || /* @__PURE__ */ jsx57(DefaultFilterIcon, {});
  const AddIconComponent = addIcon || /* @__PURE__ */ jsx57(DefaultAddIcon, {});
  const CloseIconComponent = closeIcon || /* @__PURE__ */ jsx57(DefaultCloseIcon, {});
  return /* @__PURE__ */ jsxs38("div", { className: cn("max-w-3xl mx-auto p-4", className), children: [
    /* @__PURE__ */ jsxs38("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx57(
        Heading,
        {
          as: "h1",
          size: "xl",
          style: { fontWeight: "var(--kui-font-weight-bold)" },
          children: title
        }
      ),
      /* @__PURE__ */ jsxs38("div", { className: "flex gap-2", children: [
        customActions,
        !showSearchForm && /* @__PURE__ */ jsx57(
          "button",
          {
            type: "button",
            onClick: () => onToggleSearch(true),
            className: "p-2 rounded-full bg-info-subtle text-info-main hover:opacity-90 transition-colors",
            "aria-label": searchButtonLabel,
            children: SearchIconComponent
          }
        ),
        enableIncompleteFilter && /* @__PURE__ */ jsx57(
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
        onToggleAddForm ? /* @__PURE__ */ jsx57(
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
        ) : onAddClick && /* @__PURE__ */ jsx57(
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
    errorMessage && onClearError && /* @__PURE__ */ jsxs38("div", { className: "bg-danger-subtle text-danger-main p-3 rounded-lg mb-4 flex justify-between items-center animate-kui-slide-down shadow-sm", children: [
      /* @__PURE__ */ jsx57(Typography, { as: "p", tone: "danger", children: errorMessage }),
      /* @__PURE__ */ jsx57(
        "button",
        {
          type: "button",
          onClick: onClearError,
          className: "text-danger-main p-1 hover:bg-danger-subtle rounded-full transition-colors",
          children: CloseIconComponent
        }
      )
    ] }),
    enableIncompleteFilter && showFilterOptions && /* @__PURE__ */ jsxs38("div", { className: "mb-4 bg-info-subtle rounded-lg shadow-sm p-3 animate-kui-slide-down", children: [
      /* @__PURE__ */ jsxs38("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx57(
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
        /* @__PURE__ */ jsx57(
          "button",
          {
            type: "button",
            onClick: () => onToggleFilter(false),
            className: "text-info-main hover:opacity-90 p-1 rounded-full transition-colors",
            children: CloseIconComponent
          }
        )
      ] }),
      onToggleIncomplete && /* @__PURE__ */ jsx57("div", { className: "mt-3", children: /* @__PURE__ */ jsxs38("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx57(
          "input",
          {
            type: "checkbox",
            id: "showOnlyIncomplete",
            checked: showOnlyIncomplete,
            onChange: (e) => onToggleIncomplete(e.target.checked),
            className: "h-5 w-5 text-primary-main rounded focus:ring-primary-main bg-surface border-border-strong"
          }
        ),
        /* @__PURE__ */ jsx57("label", { htmlFor: "showOnlyIncomplete", className: "ml-2", children: /* @__PURE__ */ jsx57(Typography, { as: "span", children: incompleteFilterLabel }) })
      ] }) })
    ] }),
    showSearchForm && /* @__PURE__ */ jsxs38("div", { className: "mb-4 bg-surface rounded-lg shadow-sm p-3 relative animate-kui-slide-down", children: [
      /* @__PURE__ */ jsxs38("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx57("span", { className: "w-5 h-5 text-muted absolute left-6", children: SearchIconComponent }),
        /* @__PURE__ */ jsx57(
          "input",
          {
            type: "text",
            value: searchKeyword,
            onChange: (e) => onSearchChange(e.target.value),
            placeholder: searchPlaceholder,
            className: "w-full pl-10 pr-10 py-2 border border-border bg-surface-raised text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-info-main"
          }
        ),
        searchKeyword && /* @__PURE__ */ jsx57(
          "button",
          {
            type: "button",
            onClick: () => onSearchChange(""),
            className: "absolute right-6 text-muted hover:text-foreground p-1 hover:bg-surface-sunken rounded-full transition-colors",
            children: CloseIconComponent
          }
        )
      ] }),
      /* @__PURE__ */ jsx57("div", { className: "flex justify-end mt-3", children: /* @__PURE__ */ jsx57(
        "button",
        {
          type: "button",
          onClick: () => onToggleSearch(false),
          className: "text-sm text-info-main px-3 py-1 hover:bg-info-subtle rounded-md transition-colors",
          children: /* @__PURE__ */ jsx57(Typography, { as: "span", variant: "body-sm", tone: "info", children: closeSearchLabel })
        }
      ) })
    ] }),
    showAddForm && addFormComponent && /* @__PURE__ */ jsx57("div", { className: "mb-4", children: addFormComponent }),
    statsComponent && /* @__PURE__ */ jsx57("div", { className: "mb-6 bg-surface p-4 rounded-lg shadow-sm", children: statsComponent }),
    isLoading && /* @__PURE__ */ jsx57("div", { className: "flex justify-center items-center py-8", children: /* @__PURE__ */ jsx57("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-info-main" }) }),
    isError && onReload && /* @__PURE__ */ jsxs38("div", { className: "text-center py-8 text-danger-main bg-danger-subtle rounded-lg", children: [
      /* @__PURE__ */ jsx57(Typography, { as: "p", tone: "danger", children: errorFetchMessage }),
      /* @__PURE__ */ jsx57(
        "button",
        {
          type: "button",
          onClick: onReload,
          className: "mt-2 px-4 py-2 bg-danger-subtle text-danger-main rounded-md hover:opacity-90 transition-colors",
          children: /* @__PURE__ */ jsx57(Typography, { as: "span", variant: "body-sm", tone: "danger", children: reloadLabel })
        }
      )
    ] }),
    !isLoading && !isError && /* @__PURE__ */ jsx57("div", { className: "space-y-3", children: hasItems ? children : /* @__PURE__ */ jsx57("div", { className: "text-center py-8 text-muted bg-surface-raised rounded-lg animate-kui-fade-in", children: searchKeyword ? /* @__PURE__ */ jsx57(Typography, { as: "p", tone: "muted", children: noSearchResultsMessage }) : showOnlyIncomplete ? /* @__PURE__ */ jsx57(Typography, { as: "p", tone: "muted", children: noIncompleteMessage }) : /* @__PURE__ */ jsx57(Typography, { as: "p", tone: "muted", children: emptyMessage }) }) })
  ] });
};

// src/components/molecules/MapView/MapContext.ts
import { createContext, useContext } from "react";
var MapContext = createContext(null);
function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap \u306F MapView \u306E\u5B50\u8981\u7D20\u3067\u306E\u307F\u4F7F\u7528\u3067\u304D\u307E\u3059\u3002");
  }
  return context;
}
function useOptionalMap() {
  return useContext(MapContext);
}

// src/components/molecules/MapControls/MapControls.tsx
import { jsx as jsx58, jsxs as jsxs39 } from "react/jsx-runtime";
var positionStyles2 = {
  "top-left": "left-3 top-3",
  "top-right": "right-3 top-3",
  "bottom-left": "bottom-3 left-3",
  "bottom-right": "bottom-3 right-3"
};
var buttonClass = cn(
  "inline-flex h-9 w-9 items-center justify-center bg-surface text-foreground transition-colors",
  "hover:bg-surface-sunken focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info-main",
  "disabled:cursor-not-allowed disabled:opacity-40"
);
var iconClass = "h-4 w-4";
var MapControls = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onLocate,
  showReset = false,
  position = "bottom-right",
  className
}) => {
  const map = useOptionalMap();
  const handleZoomIn = onZoomIn ?? (map ? () => map.zoomBy(1) : void 0);
  const handleZoomOut = onZoomOut ?? (map ? () => map.zoomBy(-1) : void 0);
  return /* @__PURE__ */ jsxs39(
    "fieldset",
    {
      "aria-label": "\u5730\u56F3\u64CD\u4F5C",
      className: cn(
        "absolute z-20 m-0 inline-flex min-w-0 flex-col overflow-hidden rounded-md border border-border p-0 shadow-md",
        positionStyles2[position],
        className
      ),
      children: [
        /* @__PURE__ */ jsx58(
          "button",
          {
            type: "button",
            "aria-label": "\u62E1\u5927",
            disabled: !handleZoomIn,
            onClick: handleZoomIn,
            className: cn(buttonClass, "border-b border-border"),
            children: /* @__PURE__ */ jsx58(
              "svg",
              {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 2,
                "aria-hidden": "true",
                className: iconClass,
                children: /* @__PURE__ */ jsx58("path", { strokeLinecap: "round", d: "M12 5v14M5 12h14" })
              }
            )
          }
        ),
        /* @__PURE__ */ jsx58(
          "button",
          {
            type: "button",
            "aria-label": "\u7E2E\u5C0F",
            disabled: !handleZoomOut,
            onClick: handleZoomOut,
            className: cn(
              buttonClass,
              showReset || onLocate ? "border-b border-border" : ""
            ),
            children: /* @__PURE__ */ jsx58(
              "svg",
              {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 2,
                "aria-hidden": "true",
                className: iconClass,
                children: /* @__PURE__ */ jsx58("path", { strokeLinecap: "round", d: "M5 12h14" })
              }
            )
          }
        ),
        showReset && /* @__PURE__ */ jsx58(
          "button",
          {
            type: "button",
            "aria-label": "\u8868\u793A\u3092\u30EA\u30BB\u30C3\u30C8",
            disabled: !onReset,
            onClick: onReset,
            className: cn(buttonClass, onLocate ? "border-b border-border" : ""),
            children: /* @__PURE__ */ jsx58(
              "svg",
              {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 1.8,
                "aria-hidden": "true",
                className: iconClass,
                children: /* @__PURE__ */ jsx58(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M3 12a9 9 0 1 0 3-6.7M3 4v4h4"
                  }
                )
              }
            )
          }
        ),
        onLocate && /* @__PURE__ */ jsx58(
          "button",
          {
            type: "button",
            "aria-label": "\u73FE\u5728\u5730\u3078\u79FB\u52D5",
            onClick: onLocate,
            className: buttonClass,
            children: /* @__PURE__ */ jsxs39(
              "svg",
              {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 1.8,
                "aria-hidden": "true",
                className: iconClass,
                children: [
                  /* @__PURE__ */ jsx58("circle", { cx: "12", cy: "12", r: "3.5" }),
                  /* @__PURE__ */ jsx58("path", { strokeLinecap: "round", d: "M12 2v3M12 19v3M2 12h3M19 12h3" })
                ]
              }
            )
          }
        )
      ]
    }
  );
};

// src/components/molecules/MapMarker/MapMarker.tsx
import { jsx as jsx59 } from "react/jsx-runtime";
var MapMarker = ({
  position,
  label,
  children,
  tone = "accent",
  size = "md",
  selected = false,
  onClick,
  ariaLabel,
  className
}) => {
  const map = useMap();
  const point = map.project(position);
  const accessibleName = ariaLabel ?? (typeof label === "string" ? label : "\u30DE\u30FC\u30AB\u30FC");
  return /* @__PURE__ */ jsx59(
    "button",
    {
      type: "button",
      "aria-label": accessibleName,
      "aria-pressed": selected,
      onClick: (event) => {
        event.stopPropagation();
        onClick?.();
      },
      onPointerDown: (event) => event.stopPropagation(),
      style: {
        left: point.x,
        top: point.y,
        transform: "translate(-50%, -100%)"
      },
      className: cn(
        "absolute z-10 inline-flex cursor-pointer flex-col items-center border-0 bg-transparent p-0",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-info-main focus-visible:ring-offset-2",
        className
      ),
      children: children ?? /* @__PURE__ */ jsx59(MapPin, { label, tone, size, selected })
    }
  );
};

// src/components/molecules/MapView/MapView.tsx
import { memo, useCallback as useCallback4, useEffect as useEffect12, useMemo as useMemo4, useRef as useRef15, useState as useState17 } from "react";

// src/utils/geo.ts
var TILE_SIZE = 256;
var MAX_LATITUDE = 85.05112878;
var clamp2 = (value, min, max) => Math.min(max, Math.max(min, value));
function worldSize(zoom) {
  return TILE_SIZE * 2 ** zoom;
}
function lngToWorldX(lng, zoom) {
  return (lng + 180) / 360 * worldSize(zoom);
}
function latToWorldY(lat, zoom) {
  const clamped = clamp2(lat, -MAX_LATITUDE, MAX_LATITUDE);
  const sin = Math.sin(clamped * Math.PI / 180);
  return (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * worldSize(zoom);
}
function worldXToLng(x, zoom) {
  return x / worldSize(zoom) * 360 - 180;
}
function worldYToLat(y, zoom) {
  const n = Math.PI - 2 * Math.PI * y / worldSize(zoom);
  return 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}
function project(latlng, zoom) {
  return {
    x: lngToWorldX(latlng.lng, zoom),
    y: latToWorldY(latlng.lat, zoom)
  };
}
function unproject(point, zoom) {
  return {
    lat: worldYToLat(point.y, zoom),
    lng: worldXToLng(point.x, zoom)
  };
}
function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
function clampZoom(zoom, min, max) {
  return clamp2(zoom, min, max);
}

// src/utils/tiles.ts
var GSI_TILE_BASE_URL = "https://cyberjapandata.gsi.go.jp/xyz";
var GSI_ATTRIBUTION = "\u56FD\u571F\u5730\u7406\u9662";
var GSI_PALE_TILE_URL = (x, y, z) => `${GSI_TILE_BASE_URL}/pale/${z}/${x}/${y}.png`;
var GSI_STANDARD_TILE_URL = (x, y, z) => `${GSI_TILE_BASE_URL}/std/${z}/${x}/${y}.png`;
var GSI_PHOTO_TILE_URL = (x, y, z) => `${GSI_TILE_BASE_URL}/ort/${z}/${x}/${y}.png`;

// src/components/molecules/MapView/MapView.tsx
import { Fragment as Fragment6, jsx as jsx60, jsxs as jsxs40 } from "react/jsx-runtime";
var DEFAULT_MAP_CENTER = { lat: 35.681236, lng: 139.767125 };
var TAP_THRESHOLD = 5;
var resolveDimension = (value) => typeof value === "number" ? `${value}px` : value;
var MapChildren = memo(function MapChildren2({
  children
}) {
  return /* @__PURE__ */ jsx60(Fragment6, { children });
});
var MapView = ({
  center,
  defaultCenter = DEFAULT_MAP_CENTER,
  zoom,
  defaultZoom = 14,
  minZoom = 3,
  maxZoom = 19,
  onCenterChange,
  onZoomChange,
  onTap,
  tileUrl,
  attribution,
  showAttribution = true,
  interactive = true,
  height = 400,
  children,
  className,
  ariaLabel = "\u5730\u56F3"
}) => {
  const resolvedTileUrl = tileUrl === void 0 ? GSI_PALE_TILE_URL : tileUrl;
  const resolvedAttribution = attribution !== void 0 ? attribution : tileUrl === void 0 || tileUrl === GSI_PALE_TILE_URL ? GSI_ATTRIBUTION : void 0;
  const containerRef = useRef15(null);
  const [innerCenter, setInnerCenter] = useState17(defaultCenter);
  const [innerZoom, setInnerZoom] = useState17(defaultZoom);
  const [size, setSize] = useState17({
    width: 0,
    height: 0
  });
  const [offset2, setOffset] = useState17({ x: 0, y: 0 });
  const centerControlled = center !== void 0;
  const zoomControlled = zoom !== void 0;
  const currentCenter = center ?? innerCenter;
  const currentZoom = zoom ?? innerZoom;
  const centerControlledRef = useRef15(centerControlled);
  centerControlledRef.current = centerControlled;
  const zoomControlledRef = useRef15(zoomControlled);
  zoomControlledRef.current = zoomControlled;
  const viewRef = useRef15({ center: currentCenter, zoom: currentZoom });
  viewRef.current = { center: currentCenter, zoom: currentZoom };
  const sizeRef = useRef15(size);
  sizeRef.current = size;
  const offsetRef = useRef15(offset2);
  offsetRef.current = offset2;
  const dragRef = useRef15(null);
  const pointersRef = useRef15(/* @__PURE__ */ new Map());
  const pinchRef = useRef15(null);
  const boundsRef = useRef15({ minZoom, maxZoom });
  boundsRef.current = { minZoom, maxZoom };
  const callbacksRef = useRef15({
    onCenterChange,
    onZoomChange,
    onTap,
    interactive
  });
  callbacksRef.current = { onCenterChange, onZoomChange, onTap, interactive };
  const worldCenter = useMemo4(
    () => project(currentCenter, currentZoom),
    [currentCenter, currentZoom]
  );
  const worldCenterRef = useRef15(worldCenter);
  worldCenterRef.current = worldCenter;
  const projectToScreen = useCallback4((latlng) => {
    const { center: c, zoom: z } = viewRef.current;
    const { width, height: h } = sizeRef.current;
    const wc = project(c, z);
    const wp = project(latlng, z);
    return {
      x: wp.x - wc.x + width / 2,
      y: wp.y - wc.y + h / 2
    };
  }, []);
  const unprojectFromScreen = useCallback4((point) => {
    const { center: c, zoom: z } = viewRef.current;
    const { width, height: h } = sizeRef.current;
    const wc = project(c, z);
    const off = offsetRef.current;
    return unproject(
      {
        x: wc.x + point.x - width / 2 - off.x,
        y: wc.y + point.y - h / 2 - off.y
      },
      z
    );
  }, []);
  const commitView = useCallback4(
    (nextCenter, nextZoom) => {
      const { center: c, zoom: z } = viewRef.current;
      if (nextZoom !== null && nextZoom !== z && Number.isFinite(nextZoom)) {
        if (!zoomControlledRef.current) setInnerZoom(nextZoom);
        callbacksRef.current.onZoomChange?.(nextZoom);
      }
      if (nextCenter && (nextCenter.lat !== c.lat || nextCenter.lng !== c.lng)) {
        if (!centerControlledRef.current) setInnerCenter(nextCenter);
        callbacksRef.current.onCenterChange?.(nextCenter);
      }
    },
    []
  );
  const panBy = useCallback4(
    (dx, dy) => {
      const { center: c, zoom: z } = viewRef.current;
      const wc = project(c, z);
      const next = unproject({ x: wc.x + dx, y: wc.y + dy }, z);
      commitView(next, null);
    },
    [commitView]
  );
  const zoomAt = useCallback4(
    (anchor, nextZoomRaw) => {
      const { zoom: z } = viewRef.current;
      const { width, height: h } = sizeRef.current;
      const { minZoom: min, maxZoom: max } = boundsRef.current;
      const nextZoom = clampZoom(nextZoomRaw, min, max);
      if (nextZoom === z) return;
      const anchorLatLng = unprojectFromScreen(anchor);
      const anchorWorld = project(anchorLatLng, nextZoom);
      const nextCenter = unproject(
        {
          x: anchorWorld.x + width / 2 - anchor.x,
          y: anchorWorld.y + h / 2 - anchor.y
        },
        nextZoom
      );
      commitView(nextCenter, nextZoom);
    },
    [commitView, unprojectFromScreen]
  );
  const zoomBy = useCallback4(
    (delta) => {
      const { zoom: z } = viewRef.current;
      const { width, height: h } = sizeRef.current;
      zoomAt({ x: width / 2, y: h / 2 }, z + delta);
    },
    [zoomAt]
  );
  const setZoomLevel = useCallback4(
    (next) => {
      const { width, height: h } = sizeRef.current;
      zoomAt({ x: width / 2, y: h / 2 }, next);
    },
    [zoomAt]
  );
  useEffect12(() => {
    const element = containerRef.current;
    if (!element) return;
    const update = () => {
      const rect = element.getBoundingClientRect();
      setSize(
        (prev) => prev.width === rect.width && prev.height === rect.height ? prev : { width: rect.width, height: rect.height }
      );
    };
    update();
    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(update);
      observer.observe(element);
      return () => observer.disconnect();
    }
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  useEffect12(() => {
    const element = containerRef.current;
    if (!element || !interactive) return;
    const handleWheel = (event) => {
      event.preventDefault();
      const rect = element.getBoundingClientRect();
      const anchor = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
      const { zoom: z } = viewRef.current;
      zoomAt(anchor, z + (event.deltaY < 0 ? 1 : -1));
    };
    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, [interactive, zoomAt]);
  const handlePointerDown = (event) => {
    if (!interactive) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY
    });
    if (pointersRef.current.size === 2) {
      const [a, b] = Array.from(pointersRef.current.values());
      const pending = offsetRef.current;
      if (pending.x !== 0 || pending.y !== 0) {
        const wc = worldCenterRef.current;
        commitView(
          unproject(
            { x: wc.x - pending.x, y: wc.y - pending.y },
            viewRef.current.zoom
          ),
          null
        );
        offsetRef.current = { x: 0, y: 0 };
        setOffset({ x: 0, y: 0 });
      }
      pinchRef.current = {
        distance: Math.hypot(a.x - b.x, a.y - b.y),
        zoom: viewRef.current.zoom
      };
      dragRef.current = null;
      return;
    }
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startOffset: { ...offsetRef.current },
      moved: false
    };
  };
  const handlePointerMove = (event) => {
    if (pointersRef.current.has(event.pointerId)) {
      pointersRef.current.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY
      });
    }
    if (pointersRef.current.size === 2 && pinchRef.current) {
      const [a, b] = Array.from(pointersRef.current.values());
      const nextDistance = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchRef.current.distance > 0) {
        const ratio = nextDistance / pinchRef.current.distance;
        const rect = containerRef.current?.getBoundingClientRect();
        const anchor = {
          x: (a.x + b.x) / 2 - (rect?.left ?? 0),
          y: (a.y + b.y) / 2 - (rect?.top ?? 0)
        };
        zoomAt(anchor, pinchRef.current.zoom + Math.log2(ratio));
      }
      return;
    }
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (Math.hypot(dx, dy) > TAP_THRESHOLD) drag.moved = true;
    const nextOffset = {
      x: drag.startOffset.x + dx,
      y: drag.startOffset.y + dy
    };
    offsetRef.current = nextOffset;
    setOffset(nextOffset);
  };
  const handlePointerUp = (event) => {
    const drag = dragRef.current;
    pointersRef.current.delete(event.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;
    if (!drag || drag.pointerId !== event.pointerId) {
      dragRef.current = null;
      if (offsetRef.current.x !== 0 || offsetRef.current.y !== 0) {
        offsetRef.current = { x: 0, y: 0 };
        setOffset({ x: 0, y: 0 });
      }
      return;
    }
    dragRef.current = null;
    const currentOffset = offsetRef.current;
    offsetRef.current = { x: 0, y: 0 };
    setOffset({ x: 0, y: 0 });
    if (drag.moved) {
      const wc = worldCenterRef.current;
      commitView(
        unproject(
          { x: wc.x - currentOffset.x, y: wc.y - currentOffset.y },
          viewRef.current.zoom
        ),
        null
      );
      return;
    }
    if (!callbacksRef.current.interactive) return;
    const rect = containerRef.current?.getBoundingClientRect();
    const point = {
      x: event.clientX - (rect?.left ?? 0),
      y: event.clientY - (rect?.top ?? 0)
    };
    callbacksRef.current.onTap?.(unprojectFromScreen(point));
  };
  const handlePointerCancel = (event) => {
    pointersRef.current.delete(event.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;
    dragRef.current = null;
    offsetRef.current = { x: 0, y: 0 };
    setOffset({ x: 0, y: 0 });
  };
  const handleKeyDown = (event) => {
    if (!interactive) return;
    const step = 100;
    switch (event.key) {
      case "ArrowUp":
        panBy(0, -step);
        break;
      case "ArrowDown":
        panBy(0, step);
        break;
      case "ArrowLeft":
        panBy(-step, 0);
        break;
      case "ArrowRight":
        panBy(step, 0);
        break;
      case "+":
      case "=":
        zoomBy(1);
        break;
      case "-":
      case "_":
        zoomBy(-1);
        break;
      default:
        return;
    }
    event.preventDefault();
  };
  const tileZoom = clampZoom(Math.floor(currentZoom), 0, 19);
  const tileScale = 2 ** (currentZoom - tileZoom);
  const scaledTile = TILE_SIZE * tileScale;
  const originX = worldCenter.x - size.width / 2 - offset2.x;
  const originY = worldCenter.y - size.height / 2 - offset2.y;
  const tiles = useMemo4(() => {
    if (!resolvedTileUrl || size.width === 0 || size.height === 0) return [];
    const count = 2 ** tileZoom;
    const minX = Math.floor(originX / scaledTile);
    const maxX = Math.floor((originX + size.width) / scaledTile);
    const minY = Math.floor(originY / scaledTile);
    const maxY = Math.floor((originY + size.height) / scaledTile);
    const result = [];
    for (let y = minY; y <= maxY; y += 1) {
      if (y < 0 || y >= count) continue;
      for (let x = minX; x <= maxX; x += 1) {
        const wrappedX = (x % count + count) % count;
        result.push(
          /* @__PURE__ */ jsx60(
            "img",
            {
              src: resolvedTileUrl(wrappedX, y, tileZoom),
              alt: "",
              draggable: false,
              className: "absolute left-0 top-0 select-none",
              style: {
                transform: `translate3d(${x * scaledTile - originX}px, ${y * scaledTile - originY}px, 0)`,
                width: scaledTile + 0.5,
                height: scaledTile + 0.5
              }
            },
            `${tileZoom}-${x}-${y}`
          )
        );
      }
    }
    return result;
  }, [resolvedTileUrl, size, originX, originY, scaledTile, tileZoom]);
  const contextValue = useMemo4(
    () => ({
      center: currentCenter,
      zoom: currentZoom,
      size,
      project: projectToScreen,
      unproject: unprojectFromScreen,
      panBy,
      zoomBy,
      setZoom: setZoomLevel
    }),
    [
      currentCenter,
      currentZoom,
      size,
      projectToScreen,
      unprojectFromScreen,
      panBy,
      zoomBy,
      setZoomLevel
    ]
  );
  return /* @__PURE__ */ jsx60(MapContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxs40(
    "div",
    {
      ref: containerRef,
      role: "application",
      "aria-label": ariaLabel,
      tabIndex: interactive ? 0 : -1,
      "data-testid": "map-view",
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
      onKeyDown: handleKeyDown,
      style: { height: resolveDimension(height) },
      className: cn(
        "relative w-full select-none overflow-hidden bg-surface-sunken outline-none",
        "focus-visible:ring-2 focus-visible:ring-info-main",
        interactive ? "cursor-grab touch-none" : "cursor-default",
        className
      ),
      children: [
        !resolvedTileUrl && /* @__PURE__ */ jsx60(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute inset-0",
            style: {
              backgroundImage: "linear-gradient(var(--kui-color-border) 1px, transparent 1px), linear-gradient(90deg, var(--kui-color-border) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              backgroundPosition: `${-originX}px ${-originY}px`
            }
          }
        ),
        tiles.length > 0 && /* @__PURE__ */ jsx60(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute inset-0 will-change-transform",
            children: tiles
          }
        ),
        /* @__PURE__ */ jsx60(
          "div",
          {
            "data-testid": "map-content",
            className: "absolute inset-0 will-change-transform",
            style: {
              transform: `translate3d(${offset2.x}px, ${offset2.y}px, 0)`
            },
            children: /* @__PURE__ */ jsx60(MapChildren, { children })
          }
        ),
        showAttribution && resolvedTileUrl && resolvedAttribution && /* @__PURE__ */ jsxs40("div", { className: "pointer-events-none absolute bottom-0 left-0 z-10 bg-surface/80 px-1.5 py-0.5 text-[10px] leading-tight text-muted", children: [
          "\u51FA\u5178: ",
          resolvedAttribution
        ] })
      ]
    }
  ) });
};

// src/components/molecules/MediaCard/MediaCard.tsx
import { jsx as jsx61, jsxs as jsxs41 } from "react/jsx-runtime";
var toText = (node) => typeof node === "string" ? node : "";
var MediaPlaceholder = () => /* @__PURE__ */ jsx61(
  "div",
  {
    "aria-hidden": "true",
    className: "flex h-full w-full items-center justify-center bg-surface-sunken text-border-strong",
    children: /* @__PURE__ */ jsx61(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.5,
        className: "h-10 w-10",
        children: /* @__PURE__ */ jsx61(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M3 16.5 9 10.5l4.5 4.5 3-3L21 16.5M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25Z"
          }
        )
      }
    )
  }
);
var MediaCard = ({
  id,
  title,
  subtitle,
  description,
  imageUrl,
  imageAlt,
  mediaAspect = "4 / 3",
  tags,
  status,
  highlight,
  highlightCaption,
  meta,
  notes,
  footer,
  favorite = false,
  onFavoriteChange,
  favoriteLabel,
  selectable = false,
  selected = false,
  onSelectedChange,
  selectLabel = "\u9078\u629E",
  highlighted = false,
  onClick,
  clickLabel,
  className
}) => {
  const interactive = Boolean(onClick);
  const titleText = toText(title);
  const tagEntries = (tags ?? []).map((tag, index) => ({
    id: `tag-${index}`,
    tag
  }));
  const noteEntries = (notes ?? []).map((note, index) => ({
    id: `note-${index}`,
    note
  }));
  return /* @__PURE__ */ jsxs41(
    Card,
    {
      padding: "none",
      border: true,
      shadow: "sm",
      "data-testid": id ? `media-card-${id}` : void 0,
      className: cn(
        "group relative overflow-hidden",
        highlighted && "ring-2 ring-primary-main",
        interactive && "transition-shadow hover:shadow-md",
        className
      ),
      children: [
        interactive && /* @__PURE__ */ jsx61(
          "button",
          {
            type: "button",
            "aria-label": clickLabel ?? (titleText ? `${titleText}\u3092\u958B\u304F` : "\u8A73\u7D30\u3092\u958B\u304F"),
            onClick,
            className: "absolute inset-0 z-0 cursor-pointer"
          }
        ),
        /* @__PURE__ */ jsxs41("div", { className: "pointer-events-none relative z-[1]", children: [
          /* @__PURE__ */ jsxs41(
            "div",
            {
              className: "relative w-full overflow-hidden bg-surface-sunken",
              style: { aspectRatio: mediaAspect },
              children: [
                imageUrl ? /* @__PURE__ */ jsx61(
                  "img",
                  {
                    src: imageUrl,
                    alt: imageAlt ?? titleText,
                    loading: "lazy",
                    className: "h-full w-full object-cover"
                  }
                ) : /* @__PURE__ */ jsx61(MediaPlaceholder, {}),
                /* @__PURE__ */ jsxs41("div", { className: "absolute left-2 top-2 flex flex-wrap gap-1", children: [
                  tagEntries.map(({ id: tagId, tag }) => /* @__PURE__ */ jsx61(Badge, { variant: tag.variant ?? "info", children: tag.label }, tagId)),
                  status && /* @__PURE__ */ jsx61(Badge, { variant: status.variant ?? "neutral", children: status.label })
                ] }),
                onFavoriteChange && /* @__PURE__ */ jsx61(
                  FavoriteButton,
                  {
                    favorite,
                    onChange: onFavoriteChange,
                    label: favoriteLabel ?? "\u304A\u6C17\u306B\u5165\u308A\u306B\u8FFD\u52A0",
                    className: "pointer-events-auto absolute right-2 top-2"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs41("div", { className: "flex flex-col gap-3 p-4", children: [
            (highlight || selectable) && /* @__PURE__ */ jsxs41("div", { className: "flex items-end justify-between gap-2", children: [
              highlight ? /* @__PURE__ */ jsxs41("div", { className: "flex flex-col", children: [
                highlight,
                highlightCaption && /* @__PURE__ */ jsx61("span", { className: "text-xs text-muted", children: highlightCaption })
              ] }) : /* @__PURE__ */ jsx61("span", {}),
              selectable && onSelectedChange && /* @__PURE__ */ jsx61(
                Checkbox,
                {
                  checked: selected,
                  onChange: onSelectedChange,
                  label: selectLabel,
                  size: "small",
                  className: "pointer-events-auto shrink-0"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs41("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsx61(Heading, { as: "h3", size: "sm", className: "line-clamp-2", children: title }),
              subtitle && /* @__PURE__ */ jsx61(Typography, { variant: "caption", tone: "muted", children: subtitle }),
              description && /* @__PURE__ */ jsx61(Typography, { variant: "caption", tone: "muted", children: description })
            ] }),
            meta && meta.length > 0 && /* @__PURE__ */ jsx61("div", { className: "flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-3", children: meta.map((item) => /* @__PURE__ */ jsxs41("span", { className: "inline-flex flex-col", children: [
              /* @__PURE__ */ jsx61("span", { className: "text-xs text-muted", children: item.label }),
              /* @__PURE__ */ jsx61("span", { className: "text-sm font-medium text-foreground", children: item.value })
            ] }, item.label)) }),
            noteEntries.length > 0 && /* @__PURE__ */ jsx61("div", { className: "flex flex-wrap gap-4 text-xs text-muted", children: noteEntries.map(({ id: noteId, note }) => /* @__PURE__ */ jsx61("span", { children: note }, noteId)) }),
            footer && /* @__PURE__ */ jsx61("div", { children: footer })
          ] })
        ] })
      ]
    }
  );
};

// src/components/templates/EmptyState/EmptyState.tsx
import { jsx as jsx62, jsxs as jsxs42 } from "react/jsx-runtime";
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
var iconWrapClassMap = {
  sm: "h-12 w-12 p-3",
  md: "h-14 w-14 p-3.5",
  lg: "h-16 w-16 p-4"
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
  return /* @__PURE__ */ jsxs42(
    "div",
    {
      className: cn(
        "flex w-full flex-col justify-center border border-dashed border-border-strong bg-surface-raised",
        containerSizeClassMap[size],
        contentAlignClassMap[align],
        className
      ),
      ...props,
      children: [
        icon ? /* @__PURE__ */ jsx62(
          "div",
          {
            className: cn(
              "flex items-center justify-center rounded-full bg-surface-sunken text-muted [&_svg]:h-full [&_svg]:w-full",
              iconWrapClassMap[size]
            ),
            "aria-hidden": "true",
            children: icon
          }
        ) : null,
        /* @__PURE__ */ jsx62(Heading, { as: "h2", size: headingSizeMap[size], children: title }),
        description ? /* @__PURE__ */ jsx62(
          Typography,
          {
            className: descriptionWidthClassMap[size],
            variant: descriptionVariantMap[size],
            tone: "muted",
            children: description
          }
        ) : null,
        action && actionPlacement === "inline" ? /* @__PURE__ */ jsx62("div", { children: action }) : null,
        action && actionPlacement === "below" ? /* @__PURE__ */ jsx62("div", { className: cn("flex w-full pt-1", actionWrapAlignClassMap[align]), children: action }) : null
      ]
    }
  );
};

// src/components/molecules/MediaList/MediaList.tsx
import { jsx as jsx63, jsxs as jsxs43 } from "react/jsx-runtime";
var columnStyles2 = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
};
var CardSkeleton = () => /* @__PURE__ */ jsxs43("div", { className: "overflow-hidden rounded-lg border border-border bg-surface", children: [
  /* @__PURE__ */ jsx63(Skeleton, { variant: "rectangular", className: "h-48 rounded-none" }),
  /* @__PURE__ */ jsxs43("div", { className: "flex flex-col gap-3 p-4", children: [
    /* @__PURE__ */ jsx63(Skeleton, { width: "50%", height: "1.5rem" }),
    /* @__PURE__ */ jsx63(Skeleton, { width: "80%" }),
    /* @__PURE__ */ jsx63(Skeleton, { width: "60%" }),
    /* @__PURE__ */ jsxs43("div", { className: "flex gap-4 pt-2", children: [
      /* @__PURE__ */ jsx63(Skeleton, { width: "3rem" }),
      /* @__PURE__ */ jsx63(Skeleton, { width: "3rem" }),
      /* @__PURE__ */ jsx63(Skeleton, { width: "3rem" })
    ] })
  ] })
] });
var MediaList = ({
  items,
  columns = 1,
  loading = false,
  loadingCount = 4,
  emptyTitle = "\u8868\u793A\u3067\u304D\u308B\u9805\u76EE\u304C\u3042\u308A\u307E\u305B\u3093",
  emptyDescription = "\u6761\u4EF6\u3092\u5909\u66F4\u3057\u3066\u3001\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002",
  emptyAction,
  favoriteIds,
  onFavoriteChange,
  highlightedId,
  selectedIds,
  onSelectedChange,
  onItemClick,
  className
}) => {
  if (loading) {
    return /* @__PURE__ */ jsx63(
      "div",
      {
        role: "status",
        "aria-label": "\u8AAD\u307F\u8FBC\u307F\u4E2D",
        className: cn("grid gap-4", columnStyles2[columns], className),
        children: Array.from(
          { length: loadingCount },
          (_, index) => `media-skeleton-${index}`
        ).map((key) => /* @__PURE__ */ jsx63(CardSkeleton, {}, key))
      }
    );
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsx63(
      EmptyState,
      {
        title: emptyTitle,
        description: emptyDescription,
        action: emptyAction,
        className
      }
    );
  }
  return /* @__PURE__ */ jsx63("div", { className: cn("grid gap-4", columnStyles2[columns], className), children: items.map(({ id, ...item }) => /* @__PURE__ */ jsx63(
    MediaCard,
    {
      id,
      ...item,
      favorite: favoriteIds?.includes(id) ?? false,
      onFavoriteChange: onFavoriteChange ? (favorite) => onFavoriteChange(id, favorite) : void 0,
      highlighted: highlightedId === id,
      selectable: Boolean(onSelectedChange) || item.selectable,
      selected: selectedIds?.includes(id) ?? false,
      onSelectedChange: onSelectedChange ? (selected) => onSelectedChange(id, selected) : void 0,
      onClick: onItemClick ? () => onItemClick(id) : void 0
    },
    id
  )) });
};

// src/components/molecules/MonthSelector/MonthSelector.tsx
import { jsx as jsx64, jsxs as jsxs44 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs44("div", { className: cn("flex items-center gap-2", className), children: [
    /* @__PURE__ */ jsx64(
      "button",
      {
        type: "button",
        onClick: handlePrevMonth,
        className: "p-2 rounded-lg hover:bg-surface-sunken transition-colors",
        "aria-label": prevLabel,
        children: /* @__PURE__ */ jsx64(
          "svg",
          {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx64(
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
    /* @__PURE__ */ jsx64(
      "select",
      {
        value: selectedMonth,
        onChange: (e) => onMonthChange(e.target.value),
        className: "px-3 py-2 border border-border-strong rounded-lg bg-surface text-foreground focus:ring-2 focus:ring-info-main focus:border-transparent",
        children: monthOptions.map((option) => /* @__PURE__ */ jsx64("option", { value: option.value, children: option.label }, option.value))
      }
    ),
    /* @__PURE__ */ jsx64(
      "button",
      {
        type: "button",
        onClick: handleNextMonth,
        className: "p-2 rounded-lg hover:bg-surface-sunken transition-colors",
        "aria-label": nextLabel,
        children: /* @__PURE__ */ jsx64(
          "svg",
          {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx64(
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
import { useRef as useRef16 } from "react";
import { Fragment as Fragment7, jsx as jsx65, jsxs as jsxs45 } from "react/jsx-runtime";
var defaultRenderLink2 = ({
  href,
  children,
  className,
  onClick
}) => /* @__PURE__ */ jsx65("a", { href, className, onClick, children });
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
  const drawerRef = useRef16(null);
  const closeButtonRef = useRef16(null);
  useEscapeKey(onClose, open);
  useFocusTrap(drawerRef, open, { initialFocusRef: closeButtonRef });
  return /* @__PURE__ */ jsxs45(Fragment7, { children: [
    open && /* @__PURE__ */ jsx65(
      "div",
      {
        className: "fixed inset-0 bg-[var(--kui-color-overlay)] z-[var(--kui-z-drawer)] transition-opacity",
        onClick: onClose,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs45(
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
          /* @__PURE__ */ jsx65(DrawerHeader, { children: /* @__PURE__ */ jsx65(
            "button",
            {
              ref: closeButtonRef,
              type: "button",
              onClick: onClose,
              className: "p-2 rounded-full hover:bg-surface-sunken",
              "aria-label": closeButtonLabel,
              children: /* @__PURE__ */ jsx65(
                "svg",
                {
                  className: "w-6 h-6",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1.5,
                  stroke: "currentColor",
                  children: /* @__PURE__ */ jsx65(
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
          /* @__PURE__ */ jsxs45("div", { className: "overflow-y-auto h-full pb-16", children: [
            sections.map((section, sectionIndex) => /* @__PURE__ */ jsxs45("div", { children: [
              /* @__PURE__ */ jsx65("div", { className: "text-sm text-muted px-4 pt-2", children: section.title }),
              section.items.map((item) => /* @__PURE__ */ jsx65("div", { className: "px-2", children: renderLink({
                href: item.path,
                className: "flex items-center px-3 py-2 rounded-md hover:bg-surface-sunken text-foreground",
                onClick: onClose,
                children: /* @__PURE__ */ jsxs45(Fragment7, { children: [
                  item.icon && /* @__PURE__ */ jsx65("span", { className: "text-muted mr-3", children: item.icon }),
                  /* @__PURE__ */ jsx65("span", { children: item.name })
                ] })
              }) }, item.name))
            ] }, section.title || `section-${sectionIndex}`)),
            onLogout && /* @__PURE__ */ jsx65("div", { className: "px-2 mt-4", children: /* @__PURE__ */ jsx65(
              "button",
              {
                type: "button",
                className: "w-full text-left flex items-center px-3 py-2 rounded-md hover:bg-surface-sunken text-foreground",
                onClick: onLogout,
                children: /* @__PURE__ */ jsx65("span", { children: logoutLabel })
              }
            ) })
          ] })
        ]
      }
    )
  ] });
};

// src/components/molecules/Pagination/Pagination.tsx
import { jsx as jsx66, jsxs as jsxs46 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs46(
    "nav",
    {
      "aria-label": "\u30DA\u30FC\u30B8\u30CD\u30FC\u30B7\u30E7\u30F3",
      className: cn("flex items-center gap-1", className),
      children: [
        /* @__PURE__ */ jsx66(
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
          (item, index) => item === "ellipsis" ? /* @__PURE__ */ jsx66(
            "span",
            {
              className: "px-2 text-muted",
              children: "\u2026"
            },
            `ellipsis-${items[index + 1]}`
          ) : /* @__PURE__ */ jsx66(
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
        /* @__PURE__ */ jsx66(
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
import { useState as useState18 } from "react";
import { jsx as jsx67, jsxs as jsxs47 } from "react/jsx-runtime";
var Popconfirm = ({
  children,
  title,
  description,
  onConfirm,
  onCancel,
  confirmLabel = "\u78BA\u8A8D",
  cancelLabel = "\u30AD\u30E3\u30F3\u30BB\u30EB"
}) => {
  const [open, setOpen] = useState18(false);
  return /* @__PURE__ */ jsxs47(Popover, { trigger: children, open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx67("p", { className: "font-medium", children: title }),
    description && /* @__PURE__ */ jsx67("p", { className: "mt-1 text-sm text-muted", children: description }),
    /* @__PURE__ */ jsxs47("div", { className: "mt-3 flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx67(
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
      /* @__PURE__ */ jsx67(
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

// src/components/molecules/SelectionTray/SelectionTray.tsx
import { jsx as jsx68, jsxs as jsxs48 } from "react/jsx-runtime";
var SelectionTray = ({
  items,
  onRemove,
  onClear,
  onConfirm,
  confirmLabel = "\u5B9F\u884C\u3059\u308B",
  clearLabel = "\u30AF\u30EA\u30A2",
  maxItems = 4,
  minItems = 2,
  formatCount,
  removeLabel,
  className
}) => {
  if (items.length === 0) return null;
  const canConfirm = items.length >= minItems;
  return /* @__PURE__ */ jsx68(
    "aside",
    {
      "aria-label": "\u9078\u629E\u30EA\u30B9\u30C8",
      className: cn(
        "fixed inset-x-0 bottom-0 z-[var(--kui-z-drawer)] border-t border-border bg-surface shadow-xl",
        className
      ),
      children: /* @__PURE__ */ jsxs48("div", { className: "mx-auto flex max-w-5xl flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxs48("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx68(Typography, { variant: "label", tone: "muted", children: formatCount ? formatCount(items.length, maxItems) : `\u9078\u629E\u4E2D ${items.length} / ${maxItems} \u4EF6` }),
          /* @__PURE__ */ jsx68("ul", { className: "flex gap-2 overflow-x-auto", children: items.map((item) => /* @__PURE__ */ jsxs48(
            "li",
            {
              className: "relative flex w-40 shrink-0 items-center gap-2 rounded-md border border-border bg-surface-raised p-2",
              children: [
                item.imageUrl ? /* @__PURE__ */ jsx68(
                  "img",
                  {
                    src: item.imageUrl,
                    alt: "",
                    className: "h-10 w-10 shrink-0 rounded object-cover"
                  }
                ) : /* @__PURE__ */ jsx68(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: "h-10 w-10 shrink-0 rounded bg-surface-sunken"
                  }
                ),
                /* @__PURE__ */ jsxs48("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsx68(Typography, { variant: "caption", truncate: true, children: item.label }),
                  item.description && /* @__PURE__ */ jsx68(Typography, { variant: "caption", tone: "muted", truncate: true, children: item.description })
                ] }),
                /* @__PURE__ */ jsx68(
                  "button",
                  {
                    type: "button",
                    "aria-label": removeLabel ? removeLabel(item) : "\u9078\u629E\u304B\u3089\u524A\u9664",
                    onClick: () => onRemove(item.id),
                    className: "absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-surface text-muted hover:bg-surface-sunken",
                    children: "\xD7"
                  }
                )
              ]
            },
            item.id
          )) })
        ] }),
        /* @__PURE__ */ jsxs48("div", { className: "flex shrink-0 items-center gap-2", children: [
          onClear && /* @__PURE__ */ jsx68(Button, { variant: "ghost", size: "small", onClick: onClear, children: clearLabel }),
          /* @__PURE__ */ jsx68(
            Button,
            {
              variant: "primary",
              size: "small",
              disabled: !canConfirm,
              onClick: onConfirm,
              children: confirmLabel
            }
          )
        ] })
      ] })
    }
  );
};

// src/components/molecules/StatCards/StatCards.tsx
import { jsx as jsx69, jsxs as jsxs49 } from "react/jsx-runtime";
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
var columnStyles3 = {
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
  return /* @__PURE__ */ jsx69("div", { className: cn("grid gap-4", columnStyles3[columns], className), children: cards.map((card) => {
    const color = card.color ?? "blue";
    const styles2 = colorStyles2[color];
    return /* @__PURE__ */ jsxs49(
      "div",
      {
        className: cn("border rounded-lg p-4", styles2.bg, styles2.border),
        children: [
          /* @__PURE__ */ jsx69("h3", { className: cn("text-sm font-medium mb-1", styles2.text), children: card.label }),
          /* @__PURE__ */ jsx69("p", { className: cn("text-2xl font-bold", styles2.text), children: formatValue(card.value) })
        ]
      },
      card.label
    );
  }) });
};

// src/components/molecules/Stepper/Stepper.tsx
import { Fragment as Fragment8, jsx as jsx70, jsxs as jsxs50 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx70("ol", { className: cn("flex w-full", className), "aria-label": "\u624B\u9806", children: steps.map((step, index) => {
    const isActive = index === currentStep;
    const isCompleted = index < currentStep;
    const content = /* @__PURE__ */ jsxs50(Fragment8, { children: [
      /* @__PURE__ */ jsx70(
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
      /* @__PURE__ */ jsxs50("span", { className: "min-w-0 text-left", children: [
        /* @__PURE__ */ jsx70("span", { className: "block text-sm font-medium text-foreground", children: step.label }),
        step.description && /* @__PURE__ */ jsx70("span", { className: "block text-xs text-muted", children: step.description })
      ] })
    ] });
    return /* @__PURE__ */ jsxs50(
      "li",
      {
        "aria-current": isActive ? "step" : void 0,
        className: "flex min-w-0 flex-1 items-start",
        children: [
          onStepClick ? /* @__PURE__ */ jsx70(
            "button",
            {
              type: "button",
              disabled: step.disabled,
              onClick: () => onStepClick(index),
              className: "flex min-w-0 items-start gap-2 text-left focus-visible:outline-2 focus-visible:outline-primary-main disabled:cursor-not-allowed disabled:opacity-50",
              children: content
            }
          ) : /* @__PURE__ */ jsx70("span", { className: "flex min-w-0 items-start gap-2", children: content }),
          index < steps.length - 1 && /* @__PURE__ */ jsx70(
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
import { useId as useId18 } from "react";
import { jsx as jsx71, jsxs as jsxs51 } from "react/jsx-runtime";
var Tabs = ({
  items,
  value,
  onChange,
  className
}) => {
  const baseId = useId18();
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
  return /* @__PURE__ */ jsxs51("div", { className, children: [
    /* @__PURE__ */ jsx71("div", { role: "tablist", className: "flex border-b border-border", children: items.map((item, index) => /* @__PURE__ */ jsx71(
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
    activeItem && /* @__PURE__ */ jsx71(
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
import { jsx as jsx72, jsxs as jsxs52 } from "react/jsx-runtime";
var Timeline = ({
  items,
  align = "left",
  className
}) => /* @__PURE__ */ jsx72(
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
      return /* @__PURE__ */ jsxs52(
        "li",
        {
          className: cn(
            "relative flex w-full max-w-2xl gap-3 border-l border-border pb-6 pl-6 last:pb-0",
            rightAligned && "flex-row-reverse border-l-0 border-r pr-6 pl-0 text-right"
          ),
          children: [
            /* @__PURE__ */ jsx72(
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
            /* @__PURE__ */ jsxs52("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx72("h3", { className: "font-medium text-foreground", children: item.title }),
              item.timestamp && /* @__PURE__ */ jsx72("time", { className: "block text-sm text-muted", children: item.timestamp }),
              item.content && /* @__PURE__ */ jsx72("div", { className: "mt-1 text-sm text-foreground", children: item.content })
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
  createContext as createContext2,
  useCallback as useCallback5,
  useContext as useContext2,
  useEffect as useEffect13,
  useMemo as useMemo5,
  useRef as useRef17,
  useState as useState19
} from "react";
import { createPortal as createPortal3 } from "react-dom";
import { jsx as jsx73, jsxs as jsxs53 } from "react/jsx-runtime";
var ToastContext = createContext2(null);
var positionStyles3 = {
  "top-right": "right-4 top-4",
  "top-left": "left-4 top-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4"
};
function useToast() {
  const context = useContext2(ToastContext);
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
  const [toasts, setToasts] = useState19([]);
  const timers = useRef17(/* @__PURE__ */ new Map());
  const dismiss = useCallback5((id) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);
  const startTimer = useCallback5(
    (toast) => {
      if (toast.duration <= 0) return;
      const timer = setTimeout(() => dismiss(toast.id), toast.remaining);
      timers.current.set(toast.id, timer);
    },
    [dismiss]
  );
  const show = useCallback5(
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
  const pause = useCallback5((id) => {
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
  const resume = useCallback5(
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
  useEffect13(
    () => () => {
      timers.current.forEach(clearTimeout);
      timers.current.clear();
    },
    []
  );
  const value = useMemo5(
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
  const notices = /* @__PURE__ */ jsx73(
    "div",
    {
      "aria-live": "polite",
      className: cn(
        "fixed z-[var(--kui-z-toast)] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2",
        positionStyles3[position]
      ),
      children: toasts.map((toast) => /* @__PURE__ */ jsx73(
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
  return /* @__PURE__ */ jsxs53(ToastContext.Provider, { value, children: [
    children,
    container ? createPortal3(notices, container) : null
  ] });
}

// src/components/templates/AppLayout/AppLayout.tsx
import { useState as useState20 } from "react";
import { jsx as jsx74, jsxs as jsxs54 } from "react/jsx-runtime";
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
  const [drawerOpen, setDrawerOpen] = useState20(false);
  const titleContent = /* @__PURE__ */ jsx74("span", { className: "text-xl font-bold text-primary-main", children: appTitle });
  const defaultRenderLink3 = ({
    href,
    children: linkChildren
  }) => /* @__PURE__ */ jsx74("a", { href, children: linkChildren });
  const linkRenderer = renderLink || defaultRenderLink3;
  return /* @__PURE__ */ jsxs54("div", { className: "flex min-h-screen bg-surface", children: [
    /* @__PURE__ */ jsx74(AppBar, { position: "fixed", color: appBarColor, className: "shadow-none", children: /* @__PURE__ */ jsxs54("div", { className: "flex items-center justify-between px-4 py-2", children: [
      /* @__PURE__ */ jsxs54("h6", { className: "text-xl font-bold grow", children: [
        linkRenderer({
          href: titleHref,
          children: titleContent,
          className: "no-underline"
        }),
        titleSuffix
      ] }),
      /* @__PURE__ */ jsx74(
        "button",
        {
          type: "button",
          className: "text-primary-main ml-2 p-2 rounded-full hover:bg-surface-sunken",
          "aria-label": menuButtonLabel,
          onClick: () => setDrawerOpen(true),
          children: /* @__PURE__ */ jsx74(
            "svg",
            {
              className: "w-6 h-6",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: 1.5,
              stroke: "currentColor",
              children: /* @__PURE__ */ jsx74(
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
    /* @__PURE__ */ jsx74(
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
    /* @__PURE__ */ jsx74(
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

// src/components/templates/SplitPaneLayout/SplitPaneLayout.tsx
import { jsx as jsx75, jsxs as jsxs55 } from "react/jsx-runtime";
var resolveWidth = (value) => typeof value === "number" ? `${value}px` : value;
var SplitPaneLayout = ({
  header,
  sidebar,
  main,
  sidebarWidth = 380,
  sidebarPosition = "start",
  mainFirst = false,
  sidebarLabel = "\u30B5\u30A4\u30C9\u30D0\u30FC",
  footer,
  className
}) => {
  const sidebarElement = sidebar ? /* @__PURE__ */ jsx75(
    "aside",
    {
      "aria-label": sidebarLabel,
      className: cn(
        "w-full shrink-0 overflow-y-auto border-border bg-surface lg:w-[var(--kui-split-pane-sidebar-width)]",
        "border-b lg:border-b-0",
        sidebarPosition === "start" ? "lg:border-r" : "lg:border-l",
        mainFirst && "order-2 lg:order-1",
        sidebarPosition === "end" && !mainFirst && "lg:order-2"
      ),
      children: sidebar
    }
  ) : null;
  return /* @__PURE__ */ jsxs55(
    "div",
    {
      className: cn("flex min-h-screen flex-col bg-surface-raised", className),
      style: {
        "--kui-split-pane-sidebar-width": resolveWidth(sidebarWidth)
      },
      children: [
        header && /* @__PURE__ */ jsx75("div", { className: "shrink-0", children: header }),
        /* @__PURE__ */ jsxs55("div", { className: "flex min-h-0 flex-1 flex-col lg:flex-row", children: [
          sidebarElement,
          /* @__PURE__ */ jsx75(
            "main",
            {
              className: cn(
                "relative min-h-[50vh] flex-1 lg:min-h-0",
                mainFirst && "order-1 lg:order-2",
                sidebarPosition === "end" && !mainFirst && "lg:order-1"
              ),
              children: main
            }
          )
        ] }),
        footer
      ]
    }
  );
};

// src/hooks/useMediaQuery.ts
import { useEffect as useEffect14, useState as useState21 } from "react";
function useMediaQuery(query) {
  const [matches, setMatches] = useState21(false);
  useEffect14(() => {
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
  BottomSheet,
  Breadcrumb,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Checkbox,
  Chip,
  Combobox,
  ConfirmDialog,
  ContactForm,
  DEFAULT_MAP_CENTER,
  DataTable,
  DatePicker,
  Dialog,
  Divider,
  Drawer,
  DrawerHeader,
  DropdownMenu,
  EmptyState,
  FacilityList,
  FavoriteButton,
  FileUploader,
  FilterPanel,
  FormField,
  GSI_ATTRIBUTION,
  GSI_PALE_TILE_URL,
  GSI_PHOTO_TILE_URL,
  GSI_STANDARD_TILE_URL,
  GSI_TILE_BASE_URL,
  Heading,
  ImageGallery,
  InfoTooltip,
  Input,
  KeyValueList,
  ListItem,
  ListLayout,
  MAX_LATITUDE,
  MapContext,
  MapControls,
  MapMarker,
  MapPin,
  MapView,
  MediaCard,
  MediaList,
  MonthSelector,
  NavigationDrawer,
  NumberInput,
  Pagination,
  PasswordInput,
  Popconfirm,
  Popover,
  Price,
  ProgressBar,
  RadioGroup,
  RangeSlider,
  Rating,
  SearchInput,
  SegmentedControl,
  Select,
  SelectionTray,
  Skeleton,
  Slider,
  Spinner,
  SplitPaneLayout,
  StatCards,
  Stepper,
  TILE_SIZE,
  Tabs,
  Textarea,
  Timeline,
  Toast,
  ToastProvider,
  ToggleSwitch,
  Tooltip,
  Typography,
  YearMonthInput,
  clampZoom,
  cn,
  distance,
  formatManYen,
  formatYen,
  latToWorldY,
  lngToWorldX,
  project,
  unproject,
  useClickOutside,
  useEscapeKey,
  useFloatingElement,
  useFocusTrap,
  useMap,
  useMediaQuery,
  useOptionalMap,
  usePortalContainer,
  useToast,
  worldSize,
  worldXToLng,
  worldYToLat
};
//# sourceMappingURL=index.js.map