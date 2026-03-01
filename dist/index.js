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

// src/components/atoms/Badge/Badge.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx3(
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
import { jsx as jsx4 } from "react/jsx-runtime";
var variantStyles4 = {
  primary: "bg-primary-main hover:bg-primary-light text-white dark:bg-blue-700 dark:hover:bg-blue-800",
  secondary: "bg-secondary-light hover:bg-gray-200 text-primary-main dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200",
  success: "bg-[var(--kui-color-success)] hover:opacity-90 text-white",
  info: "bg-[var(--kui-color-info)] hover:opacity-90 text-white",
  outline: "bg-transparent border border-primary-main text-primary-main hover:bg-primary-main/5 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/20",
  ghost: "bg-transparent hover:bg-gray-100 text-primary-main dark:hover:bg-gray-700 dark:text-gray-300",
  danger: "bg-[var(--kui-color-danger)] hover:opacity-90 text-white"
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
var semanticToneStyles = {
  success: {
    plain: "bg-transparent text-[var(--kui-color-success)] hover:bg-[var(--kui-color-success-subtle)]",
    subtle: "bg-[var(--kui-color-success-subtle)] text-[var(--kui-color-success)] hover:opacity-90"
  },
  info: {
    plain: "bg-transparent text-[var(--kui-color-info)] hover:bg-[var(--kui-color-info-subtle)]",
    subtle: "bg-[var(--kui-color-info-subtle)] text-[var(--kui-color-info)] hover:opacity-90"
  },
  danger: {
    plain: "bg-transparent text-[var(--kui-color-danger)] hover:bg-[var(--kui-color-danger-subtle)]",
    subtle: "bg-[var(--kui-color-danger-subtle)] text-[var(--kui-color-danger)] hover:opacity-90"
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
  const toneStyles3 = tone === "solid" || !isSemanticVariant(variant) ? variantStyles4[variant] : semanticToneStyles[variant][tone];
  return /* @__PURE__ */ jsx4(
    "button",
    {
      className: cn(
        "font-medium transition-colors",
        iconOnly ? "rounded-full" : "rounded-md",
        toneStyles3,
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
import { jsx as jsx5 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx5(
    "div",
    {
      className: cn(
        "bg-white dark:bg-gray-800 rounded-lg",
        paddingMap[padding],
        shadowMap[shadow],
        border && "border border-gray-200 dark:border-gray-700",
        className
      ),
      ...props,
      children
    }
  );
};

// src/components/atoms/Checkbox/Checkbox.tsx
import { useId } from "react";
import { jsx as jsx6, jsxs } from "react/jsx-runtime";
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
        /* @__PURE__ */ jsx6(
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
        /* @__PURE__ */ jsx6(
          "span",
          {
            "aria-hidden": "true",
            className: cn(
              "inline-flex items-center justify-center shrink-0 rounded border-2 transition-colors duration-150",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2",
              boxSizeStyles[size],
              checked ? "bg-primary-main border-primary-main dark:bg-blue-600 dark:border-blue-600" : "bg-white border-gray-400 dark:bg-gray-800 dark:border-gray-500"
            ),
            children: checked && /* @__PURE__ */ jsx6(
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
                children: /* @__PURE__ */ jsx6("polyline", { points: "2,6 5,9 10,3" })
              }
            )
          }
        ),
        label && /* @__PURE__ */ jsx6(
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
import { jsx as jsx7 } from "react/jsx-runtime";
var DrawerHeader = ({
  children,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx7(
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
import { jsx as jsx8, jsxs as jsxs2 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs2("div", { className: cn("flex flex-col", className), children: [
    label && /* @__PURE__ */ jsxs2(
      "label",
      {
        htmlFor,
        className: cn(
          "font-medium text-gray-700 dark:text-gray-300",
          labelSizeStyles2[size]
        ),
        children: [
          label,
          required && /* @__PURE__ */ jsx8(
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
    description && /* @__PURE__ */ jsx8(
      "p",
      {
        id: descriptionId,
        className: cn(
          "text-gray-600 dark:text-gray-400",
          descriptionSizeStyles[size]
        ),
        children: description
      }
    ),
    content,
    error && /* @__PURE__ */ jsx8(
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
import { jsx as jsx9 } from "react/jsx-runtime";
var sizeStyles2 = {
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
  return /* @__PURE__ */ jsx9(
    Component,
    {
      className: cn(className),
      style: {
        fontWeight: "var(--kui-font-weight-semibold)",
        ...sizeStyles2[size],
        ...toneStyles2[tone],
        ...style
      },
      ...props
    }
  );
};

// src/components/atoms/Input/Input.tsx
import { useId as useId3 } from "react";
import { jsx as jsx10 } from "react/jsx-runtime";
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
    return /* @__PURE__ */ jsx10(
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
  return /* @__PURE__ */ jsx10(
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
      children: ({ describedBy }) => /* @__PURE__ */ jsx10(
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
      )
    }
  );
};

// src/components/atoms/NumberInput/NumberInput.tsx
import { useCallback, useId as useId4, useRef, useState } from "react";
import { Fragment, jsx as jsx11, jsxs as jsxs3 } from "react/jsx-runtime";
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
  const [displayValue, setDisplayValue] = useState(() => formatValue(value));
  const [isFocused, setIsFocused] = useState(false);
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
  return /* @__PURE__ */ jsx11(
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
      children: ({ describedBy }) => /* @__PURE__ */ jsxs3(Fragment, { children: [
        name && /* @__PURE__ */ jsx11("input", { type: "hidden", name, value: hiddenValue }),
        /* @__PURE__ */ jsxs3("div", { className: "relative flex items-center", children: [
          /* @__PURE__ */ jsx11(
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
                "w-full rounded-md border bg-white transition-colors duration-150",
                "text-gray-900 placeholder:text-gray-400",
                "dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500",
                inputSizeStyles2[size],
                suffix && "pr-0",
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
          suffix && /* @__PURE__ */ jsx11(
            "span",
            {
              className: cn(
                "pointer-events-none shrink-0 text-gray-500 dark:text-gray-400",
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

// src/components/atoms/ProgressBar/ProgressBar.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
var sizeStyles3 = {
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
  return /* @__PURE__ */ jsx12(
    "div",
    {
      role: "progressbar",
      "aria-valuenow": clampedValue,
      "aria-valuemin": 0,
      "aria-valuemax": safeMax,
      "aria-label": label,
      className: cn(
        "w-full overflow-hidden rounded-full bg-[var(--kui-color-info-subtle)]",
        sizeStyles3[size],
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx12(
        "div",
        {
          className: "h-full rounded-full bg-[var(--kui-color-info)] transition-all duration-500 ease-in-out",
          style: { width: `${progressPercentage}%` }
        }
      )
    }
  );
};

// src/components/atoms/SearchInput/SearchInput.tsx
import { jsx as jsx13, jsxs as jsxs4 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs4("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ jsx13(
      "span",
      {
        className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsx13("svg", { className: "size-5", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx13(
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
    /* @__PURE__ */ jsx13(
      "input",
      {
        ...rest,
        type: "text",
        value,
        onChange: (event) => onChange?.(event.target.value),
        disabled,
        placeholder,
        className: cn(
          "w-full rounded-md border bg-white py-2 pl-10 transition-colors duration-150",
          "text-sm text-gray-900 placeholder:text-gray-400",
          "dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500",
          hasValue ? "pr-10" : "pr-3",
          "border-[var(--kui-color-border-strong)] dark:border-gray-600",
          "focus:outline-none focus:ring-2 focus:ring-[var(--kui-color-info)] focus:ring-offset-1",
          disabled && "cursor-not-allowed opacity-50"
        )
      }
    ),
    hasValue && !disabled && /* @__PURE__ */ jsx13(
      "button",
      {
        type: "button",
        "aria-label": clearButtonAriaLabel,
        onClick: handleClear,
        className: "absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300",
        children: /* @__PURE__ */ jsx13(
          "svg",
          {
            className: "size-4",
            viewBox: "0 0 24 24",
            fill: "none",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsx13(
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

// src/components/atoms/Select/Select.tsx
import { useId as useId5 } from "react";
import { jsx as jsx14, jsxs as jsxs5 } from "react/jsx-runtime";
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
  const baseId = useId5();
  const selectId = id ?? `${baseId}-select`;
  const selectValueProps = value !== void 0 ? { value } : placeholder ? { defaultValue: "" } : {};
  return /* @__PURE__ */ jsx14(
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
      children: ({ describedBy }) => /* @__PURE__ */ jsxs5("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs5(
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
              selectProps.disabled && "cursor-not-allowed opacity-50"
            ),
            children: [
              placeholder && /* @__PURE__ */ jsx14("option", { value: "", disabled: !clearable, children: placeholder }),
              options.map((option) => /* @__PURE__ */ jsx14(
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
        /* @__PURE__ */ jsx14(
          "svg",
          {
            className: cn(
              "pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400",
              chevronSizeStyles[size],
              selectProps.disabled && "opacity-50"
            ),
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            viewBox: "0 0 24 24",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsx14(
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

// src/components/atoms/Spinner/Spinner.tsx
import { jsx as jsx15, jsxs as jsxs6 } from "react/jsx-runtime";
var sizeStyles4 = {
  small: "h-5 w-5",
  medium: "h-8 w-8",
  large: "h-12 w-12"
};
var Spinner = ({
  size = "medium",
  label,
  className
}) => {
  return /* @__PURE__ */ jsx15(
    "div",
    {
      className: cn(
        "flex items-center justify-center h-full min-h-[200px]",
        className
      ),
      children: /* @__PURE__ */ jsxs6("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx15(
          "div",
          {
            className: cn(
              "animate-spin rounded-full border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-2",
              sizeStyles4[size]
            )
          }
        ),
        label && /* @__PURE__ */ jsx15("p", { className: "text-gray-600 dark:text-gray-300 text-sm", children: label })
      ] })
    }
  );
};

// src/components/atoms/Textarea/Textarea.tsx
import { useId as useId6 } from "react";
import { jsx as jsx16 } from "react/jsx-runtime";
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
  const baseId = useId6();
  const textareaId = id ?? `${baseId}-textarea`;
  return /* @__PURE__ */ jsx16(
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
      children: ({ describedBy }) => /* @__PURE__ */ jsx16(
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
            textareaProps.disabled && "cursor-not-allowed opacity-50"
          )
        }
      )
    }
  );
};

// src/components/atoms/ToggleSwitch/ToggleSwitch.tsx
import { jsx as jsx17, jsxs as jsxs7 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs7(
    "label",
    {
      className: cn(
        "inline-flex items-center gap-2",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      ),
      children: [
        /* @__PURE__ */ jsx17(
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
        /* @__PURE__ */ jsx17(
          "div",
          {
            "aria-hidden": "true",
            className: cn(
              "relative inline-flex items-center rounded-full transition-colors duration-200",
              trackSizeStyles[size],
              checked ? "bg-primary-main dark:bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
            ),
            children: /* @__PURE__ */ jsx17(
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
        label && /* @__PURE__ */ jsx17(
          "span",
          {
            className: cn(
              "select-none text-gray-700 dark:text-gray-300",
              labelSizeStyles3[size]
            ),
            children: label
          }
        )
      ]
    }
  );
};

// src/components/atoms/YearMonthInput/YearMonthInput.tsx
import { useId as useId7 } from "react";
import { jsx as jsx18, jsxs as jsxs8 } from "react/jsx-runtime";
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
  const baseId = useId7();
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
  return /* @__PURE__ */ jsx18(
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
      children: ({ describedBy }) => /* @__PURE__ */ jsxs8("div", { className: "relative flex items-center", children: [
        /* @__PURE__ */ jsx18(
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
              "w-full rounded-md border bg-white transition-colors duration-150",
              "text-gray-900",
              "dark:bg-gray-800 dark:text-gray-100",
              inputSizeStyles3[size],
              showClear && "pr-8",
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
        showClear && /* @__PURE__ */ jsx18(
          "button",
          {
            type: "button",
            onClick: handleClear,
            "aria-label": "Clear",
            className: cn(
              "absolute right-1 flex items-center justify-center rounded-full",
              "text-gray-400 hover:text-gray-600 hover:bg-gray-100",
              "dark:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-gray-700",
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

// src/components/molecules/AppBar/AppBar.tsx
import { jsx as jsx19 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx19(
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
import { useEffect, useRef as useRef2 } from "react";
import { jsx as jsx20, jsxs as jsxs9 } from "react/jsx-runtime";
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
  const dialogRef = useRef2(null);
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
  return /* @__PURE__ */ jsx20(
    "div",
    {
      className: "fixed inset-0 z-50 overflow-y-auto flex items-start sm:items-center justify-center p-4 pt-12 sm:pt-4",
      style: {
        backgroundColor: "var(--kui-color-overlay)",
        backdropFilter: "blur(2px)"
      },
      onClick: handleBackdropClick,
      children: /* @__PURE__ */ jsxs9(
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
            (title || !hideCloseButton) && /* @__PURE__ */ jsxs9("div", { className: "flex justify-between items-center p-6 pb-4", children: [
              title && /* @__PURE__ */ jsx20("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: title }),
              !hideCloseButton && /* @__PURE__ */ jsx20(
                "button",
                {
                  onClick: onClose,
                  className: "text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400 transition-colors p-1",
                  "aria-label": closeButtonLabel,
                  children: /* @__PURE__ */ jsx20(
                    "svg",
                    {
                      className: "h-6 w-6",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      strokeWidth: 1.5,
                      stroke: "currentColor",
                      children: /* @__PURE__ */ jsx20(
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
            /* @__PURE__ */ jsx20("div", { className: title || !hideCloseButton ? "px-6 pb-6" : "p-6", children })
          ]
        }
      )
    }
  );
};

// src/components/molecules/ConfirmDialog/ConfirmDialog.tsx
import { jsx as jsx21, jsxs as jsxs10 } from "react/jsx-runtime";
var variantStyles5 = {
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
var DefaultIcon = ({ className }) => /* @__PURE__ */ jsx21(
  "svg",
  {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx21(
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
  const styles = variantStyles5[variant];
  return /* @__PURE__ */ jsxs10(
    Dialog,
    {
      open,
      onClose,
      maxWidth: "sm",
      disableOutsideClick: isProcessing,
      children: [
        /* @__PURE__ */ jsxs10("div", { className: "flex items-center mb-4", children: [
          /* @__PURE__ */ jsx21(
            "div",
            {
              className: cn("rounded-full p-2 mr-3 flex-shrink-0", styles.iconBg),
              children: icon || /* @__PURE__ */ jsx21(DefaultIcon, { className: cn("h-6 w-6", styles.iconColor) })
            }
          ),
          /* @__PURE__ */ jsx21(
            Heading,
            {
              as: "h3",
              size: "md",
              style: { fontWeight: "var(--kui-font-weight-medium)" },
              children: title
            }
          )
        ] }),
        /* @__PURE__ */ jsxs10("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx21(Typography, { as: "div", children: message }),
          description && /* @__PURE__ */ jsx21(Typography, { className: "mt-2", variant: "body-sm", tone: "muted", children: description })
        ] }),
        /* @__PURE__ */ jsxs10("div", { className: "flex justify-end space-x-3", children: [
          /* @__PURE__ */ jsx21(
            "button",
            {
              onClick: onClose,
              disabled: isProcessing,
              className: "px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
              children: cancelLabel
            }
          ),
          /* @__PURE__ */ jsx21(
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

// src/components/molecules/DataTable/DataTable.tsx
import { useMemo, useState as useState2 } from "react";
import { Fragment as Fragment2, jsx as jsx22, jsxs as jsxs11 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx22("div", { className: "flex flex-wrap items-center justify-end gap-2", children: resolvedActions.map((action) => /* @__PURE__ */ jsx22(
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
  const [scrollTop, setScrollTop] = useState2(0);
  const isVirtualizationEnabled = virtualization?.enabled ?? false;
  const virtualizedHeight = virtualization?.height ?? 400;
  const virtualizedRowHeight = virtualization?.rowHeight ?? 52;
  const virtualizedOverscan = virtualization?.overscan ?? 4;
  const viewportHeight = typeof virtualizedHeight === "number" ? virtualizedHeight : Number.parseInt(String(virtualizedHeight).replace("px", ""), 10) || 400;
  const shouldVirtualize = isVirtualizationEnabled && mobileMode === "scroll";
  const virtualizedWindow = useMemo(() => {
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
    return /* @__PURE__ */ jsx22("div", { className: cn("w-full", className), "aria-busy": "true", children: /* @__PURE__ */ jsx22(Spinner, { label: loadingLabel }) });
  }
  if (mobileMode === "cards") {
    return /* @__PURE__ */ jsxs11("div", { className: cn("w-full", className), children: [
      /* @__PURE__ */ jsx22("div", { className: "hidden md:block overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxs11("table", { className: "min-w-full border-collapse", children: [
        /* @__PURE__ */ jsx22("thead", { className: "bg-gray-50 dark:bg-gray-800/60", children: /* @__PURE__ */ jsxs11("tr", { children: [
          columns.map((column) => /* @__PURE__ */ jsx22(
            "th",
            {
              className: cn(
                "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300",
                column.headerClassName
              ),
              children: column.header
            },
            column.key
          )),
          hasActionColumn && /* @__PURE__ */ jsx22("th", { className: "px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300", children: actionHeader })
        ] }) }),
        /* @__PURE__ */ jsx22("tbody", { className: "divide-y divide-gray-200 dark:divide-gray-700", children: rows.length === 0 ? /* @__PURE__ */ jsx22("tr", { children: /* @__PURE__ */ jsx22(
          "td",
          {
            colSpan: tableColumnCount,
            className: "px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400",
            children: /* @__PURE__ */ jsx22(Typography, { as: "span", tone: "muted", children: emptyMessage })
          }
        ) }) : rows.map((row, index) => /* @__PURE__ */ jsxs11(
          "tr",
          {
            className: "bg-white dark:bg-gray-900",
            children: [
              columns.map((column) => /* @__PURE__ */ jsx22(
                "td",
                {
                  className: cn(
                    "px-4 py-3 text-sm text-gray-700 dark:text-gray-200",
                    column.cellClassName
                  ),
                  children: column.render(row)
                },
                column.key
              )),
              hasActionColumn && /* @__PURE__ */ jsx22("td", { className: "px-4 py-3 text-right", children: renderActions(row, actions) })
            ]
          },
          getRowId(row, index)
        )) })
      ] }) }),
      /* @__PURE__ */ jsx22("div", { className: "space-y-3 md:hidden", children: rows.length === 0 ? /* @__PURE__ */ jsx22("div", { className: "rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center dark:border-gray-700 dark:bg-gray-900/50", children: /* @__PURE__ */ jsx22(Typography, { as: "p", tone: "muted", children: emptyMessage }) }) : rows.map((row, index) => /* @__PURE__ */ jsxs11(
        "div",
        {
          className: "rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900",
          children: [
            /* @__PURE__ */ jsx22("dl", { className: "space-y-3", children: columns.map((column) => /* @__PURE__ */ jsxs11("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx22("dt", { className: "text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400", children: column.mobileLabel ?? column.header }),
              /* @__PURE__ */ jsx22(
                "dd",
                {
                  className: cn(
                    "text-sm text-gray-700 dark:text-gray-200",
                    column.cellClassName
                  ),
                  children: column.render(row)
                }
              )
            ] }, column.key)) }),
            hasActionColumn && /* @__PURE__ */ jsx22("div", { className: "mt-4", children: renderActions(row, actions) })
          ]
        },
        getRowId(row, index)
      )) })
    ] });
  }
  return /* @__PURE__ */ jsx22(
    "div",
    {
      className: cn(
        "w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700",
        className
      ),
      style: tableWrapperStyle,
      onScroll: shouldVirtualize ? (event) => setScrollTop(event.currentTarget.scrollTop) : void 0,
      children: /* @__PURE__ */ jsxs11("table", { className: "min-w-full border-collapse", children: [
        /* @__PURE__ */ jsx22("thead", { className: "bg-gray-50 dark:bg-gray-800/60", children: /* @__PURE__ */ jsxs11("tr", { children: [
          columns.map((column) => /* @__PURE__ */ jsx22(
            "th",
            {
              className: cn(
                "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300",
                column.headerClassName
              ),
              children: column.header
            },
            column.key
          )),
          hasActionColumn && /* @__PURE__ */ jsx22("th", { className: "px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300", children: actionHeader })
        ] }) }),
        /* @__PURE__ */ jsx22("tbody", { className: "divide-y divide-gray-200 dark:divide-gray-700", children: rows.length === 0 ? /* @__PURE__ */ jsx22("tr", { children: /* @__PURE__ */ jsx22(
          "td",
          {
            colSpan: tableColumnCount,
            className: "px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400",
            children: /* @__PURE__ */ jsx22(Typography, { as: "span", tone: "muted", children: emptyMessage })
          }
        ) }) : /* @__PURE__ */ jsxs11(Fragment2, { children: [
          shouldVirtualize && virtualizedWindow.topSpacerHeight > 0 && /* @__PURE__ */ jsx22("tr", { children: /* @__PURE__ */ jsx22(
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
            return /* @__PURE__ */ jsxs11(
              "tr",
              {
                className: "bg-white dark:bg-gray-900",
                children: [
                  columns.map((column) => /* @__PURE__ */ jsx22(
                    "td",
                    {
                      className: cn(
                        "px-4 py-3 text-sm text-gray-700 dark:text-gray-200",
                        column.cellClassName
                      ),
                      children: column.render(row)
                    },
                    column.key
                  )),
                  hasActionColumn && /* @__PURE__ */ jsx22("td", { className: "px-4 py-3 text-right", children: renderActions(row, actions) })
                ]
              },
              getRowId(row, rowIndex)
            );
          }),
          shouldVirtualize && virtualizedWindow.bottomSpacerHeight > 0 && /* @__PURE__ */ jsx22("tr", { children: /* @__PURE__ */ jsx22(
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

// src/components/molecules/Tooltip/Tooltip.tsx
import { useEffect as useEffect2, useRef as useRef3, useState as useState3 } from "react";
import { jsx as jsx23, jsxs as jsxs12 } from "react/jsx-runtime";
var Tooltip = ({
  content,
  children,
  className,
  triggerLabel = "Info"
}) => {
  const [isOpen, setIsOpen] = useState3(false);
  const [tooltipPosition, setTooltipPosition] = useState3("right");
  const tooltipRef = useRef3(null);
  const buttonRef = useRef3(null);
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
  return /* @__PURE__ */ jsxs12("div", { className: cn("relative inline-block", className), ref: tooltipRef, children: [
    /* @__PURE__ */ jsx23(
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
    isOpen && /* @__PURE__ */ jsxs12(
      "div",
      {
        className: cn(
          tooltipClass,
          "bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-kui-fade-in"
        ),
        children: [
          /* @__PURE__ */ jsx23("div", { className: "p-3 text-sm text-gray-700 dark:text-gray-200", children: content }),
          /* @__PURE__ */ jsx23("div", { className: arrowClass, "aria-hidden": "true" })
        ]
      }
    )
  ] });
};

// src/components/molecules/InfoTooltip/InfoTooltip.tsx
import { jsx as jsx24 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx24(Tooltip, { content, triggerLabel: label, className, children: /* @__PURE__ */ jsx24(
    "svg",
    {
      className: cn(iconSizeStyles2[size]),
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx24(
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

// src/components/molecules/ListItem/ListItem.tsx
import { jsx as jsx25 } from "react/jsx-runtime";
var ListItem = ({
  children,
  hoverable = true,
  bordered = true,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx25(
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
import { jsx as jsx26, jsxs as jsxs13 } from "react/jsx-runtime";
var DefaultCloseIcon = () => /* @__PURE__ */ jsx26(
  "svg",
  {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx26(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M6 18L18 6M6 6l12 12"
      }
    )
  }
);
var DefaultSearchIcon = () => /* @__PURE__ */ jsx26(
  "svg",
  {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx26(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      }
    )
  }
);
var DefaultFilterIcon = () => /* @__PURE__ */ jsx26(
  "svg",
  {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx26(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
      }
    )
  }
);
var DefaultAddIcon = () => /* @__PURE__ */ jsx26(
  "svg",
  {
    className: "w-5 h-5",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /* @__PURE__ */ jsx26(
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
  const SearchIconComponent = searchIcon || /* @__PURE__ */ jsx26(DefaultSearchIcon, {});
  const FilterIconComponent = filterIcon || /* @__PURE__ */ jsx26(DefaultFilterIcon, {});
  const AddIconComponent = addIcon || /* @__PURE__ */ jsx26(DefaultAddIcon, {});
  const CloseIconComponent = closeIcon || /* @__PURE__ */ jsx26(DefaultCloseIcon, {});
  return /* @__PURE__ */ jsxs13("div", { className: cn("max-w-3xl mx-auto p-4", className), children: [
    /* @__PURE__ */ jsxs13("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx26(
        Heading,
        {
          as: "h1",
          size: "xl",
          style: { fontWeight: "var(--kui-font-weight-bold)" },
          children: title
        }
      ),
      /* @__PURE__ */ jsxs13("div", { className: "flex gap-2", children: [
        customActions,
        !showSearchForm && /* @__PURE__ */ jsx26(
          "button",
          {
            onClick: () => onToggleSearch(true),
            className: "p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors",
            "aria-label": searchButtonLabel,
            children: SearchIconComponent
          }
        ),
        enableIncompleteFilter && /* @__PURE__ */ jsx26(
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
        onToggleAddForm ? /* @__PURE__ */ jsx26(
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
        ) : onAddClick && /* @__PURE__ */ jsx26(
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
    errorMessage && onClearError && /* @__PURE__ */ jsxs13("div", { className: "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg mb-4 flex justify-between items-center animate-kui-slide-down shadow-sm", children: [
      /* @__PURE__ */ jsx26(Typography, { as: "p", tone: "danger", children: errorMessage }),
      /* @__PURE__ */ jsx26(
        "button",
        {
          onClick: onClearError,
          className: "text-red-500 dark:text-red-300 p-1 hover:bg-red-100 dark:hover:bg-red-800/50 rounded-full transition-colors",
          children: CloseIconComponent
        }
      )
    ] }),
    enableIncompleteFilter && showFilterOptions && /* @__PURE__ */ jsxs13("div", { className: "mb-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg shadow-sm p-3 animate-kui-slide-down", children: [
      /* @__PURE__ */ jsxs13("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx26(
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
        /* @__PURE__ */ jsx26(
          "button",
          {
            onClick: () => onToggleFilter(false),
            className: "text-indigo-500 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 p-1 rounded-full transition-colors",
            children: CloseIconComponent
          }
        )
      ] }),
      onToggleIncomplete && /* @__PURE__ */ jsx26("div", { className: "mt-3", children: /* @__PURE__ */ jsxs13("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx26(
          "input",
          {
            type: "checkbox",
            id: "showOnlyIncomplete",
            checked: showOnlyIncomplete,
            onChange: (e) => onToggleIncomplete(e.target.checked),
            className: "h-5 w-5 text-indigo-600 dark:text-indigo-500 rounded focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600"
          }
        ),
        /* @__PURE__ */ jsx26("label", { htmlFor: "showOnlyIncomplete", className: "ml-2", children: /* @__PURE__ */ jsx26(Typography, { as: "span", children: incompleteFilterLabel }) })
      ] }) })
    ] }),
    showSearchForm && /* @__PURE__ */ jsxs13("div", { className: "mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 relative animate-kui-slide-down", children: [
      /* @__PURE__ */ jsxs13("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx26("span", { className: "w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-6", children: SearchIconComponent }),
        /* @__PURE__ */ jsx26(
          "input",
          {
            type: "text",
            value: searchKeyword,
            onChange: (e) => onSearchChange(e.target.value),
            placeholder: searchPlaceholder,
            className: "w-full pl-10 pr-10 py-2 border dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          }
        ),
        searchKeyword && /* @__PURE__ */ jsx26(
          "button",
          {
            onClick: () => onSearchChange(""),
            className: "absolute right-6 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors",
            children: CloseIconComponent
          }
        )
      ] }),
      /* @__PURE__ */ jsx26("div", { className: "flex justify-end mt-3", children: /* @__PURE__ */ jsx26(
        "button",
        {
          onClick: () => onToggleSearch(false),
          className: "text-sm text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-3 py-1 hover:bg-blue-50 dark:hover:bg-blue-800/50 rounded-md transition-colors",
          children: /* @__PURE__ */ jsx26(Typography, { as: "span", variant: "body-sm", tone: "info", children: closeSearchLabel })
        }
      ) })
    ] }),
    showAddForm && addFormComponent && /* @__PURE__ */ jsx26("div", { className: "mb-4", children: addFormComponent }),
    statsComponent && /* @__PURE__ */ jsx26("div", { className: "mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm", children: statsComponent }),
    isLoading && /* @__PURE__ */ jsx26("div", { className: "flex justify-center items-center py-8", children: /* @__PURE__ */ jsx26("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 dark:border-blue-400" }) }),
    isError && onReload && /* @__PURE__ */ jsxs13("div", { className: "text-center py-8 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/30 rounded-lg", children: [
      /* @__PURE__ */ jsx26(Typography, { as: "p", tone: "danger", children: errorFetchMessage }),
      /* @__PURE__ */ jsx26(
        "button",
        {
          onClick: onReload,
          className: "mt-2 px-4 py-2 bg-red-100 dark:bg-red-800/50 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-700/50 transition-colors",
          children: /* @__PURE__ */ jsx26(Typography, { as: "span", variant: "body-sm", tone: "danger", children: reloadLabel })
        }
      )
    ] }),
    !isLoading && !isError && /* @__PURE__ */ jsx26("div", { className: "space-y-3", children: hasItems ? children : /* @__PURE__ */ jsx26("div", { className: "text-center py-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg animate-kui-fade-in", children: searchKeyword ? /* @__PURE__ */ jsx26(Typography, { as: "p", tone: "muted", children: noSearchResultsMessage }) : showOnlyIncomplete ? /* @__PURE__ */ jsx26(Typography, { as: "p", tone: "muted", children: noIncompleteMessage }) : /* @__PURE__ */ jsx26(Typography, { as: "p", tone: "muted", children: emptyMessage }) }) })
  ] });
};

// src/components/molecules/MonthSelector/MonthSelector.tsx
import { jsx as jsx27, jsxs as jsxs14 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs14("div", { className: cn("flex items-center gap-2", className), children: [
    /* @__PURE__ */ jsx27(
      "button",
      {
        onClick: handlePrevMonth,
        className: "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
        "aria-label": prevLabel,
        children: /* @__PURE__ */ jsx27(
          "svg",
          {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx27(
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
    /* @__PURE__ */ jsx27(
      "select",
      {
        value: selectedMonth,
        onChange: (e) => onMonthChange(e.target.value),
        className: "px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        children: monthOptions.map((option) => /* @__PURE__ */ jsx27("option", { value: option.value, children: option.label }, option.value))
      }
    ),
    /* @__PURE__ */ jsx27(
      "button",
      {
        onClick: handleNextMonth,
        className: "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
        "aria-label": nextLabel,
        children: /* @__PURE__ */ jsx27(
          "svg",
          {
            className: "w-5 h-5",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx27(
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
import { Fragment as Fragment3, jsx as jsx28, jsxs as jsxs15 } from "react/jsx-runtime";
var defaultRenderLink = ({
  href,
  children,
  className,
  onClick
}) => /* @__PURE__ */ jsx28("a", { href, className, onClick, children });
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
  return /* @__PURE__ */ jsxs15(Fragment3, { children: [
    open && /* @__PURE__ */ jsx28(
      "div",
      {
        className: "fixed inset-0 bg-black/30 z-40 transition-opacity",
        onClick: onClose,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs15(
      "div",
      {
        className: cn(
          "fixed top-0 right-0 h-full bg-white dark:bg-gray-800 text-black dark:text-white z-50 transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        ),
        style: { width: `${width}px` },
        children: [
          /* @__PURE__ */ jsx28(DrawerHeader, { children: /* @__PURE__ */ jsx28(
            "button",
            {
              onClick: onClose,
              className: "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700",
              "aria-label": closeButtonLabel,
              children: /* @__PURE__ */ jsx28(
                "svg",
                {
                  className: "w-6 h-6 dark:text-white",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1.5,
                  stroke: "currentColor",
                  children: /* @__PURE__ */ jsx28(
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
          /* @__PURE__ */ jsxs15("div", { className: "overflow-y-auto h-full pb-16", children: [
            sections.map((section, sectionIndex) => /* @__PURE__ */ jsxs15("div", { children: [
              /* @__PURE__ */ jsx28("div", { className: "text-sm text-gray-500 dark:text-gray-400 px-4 pt-2", children: section.title }),
              section.items.map((item) => /* @__PURE__ */ jsx28("div", { className: "px-2", children: renderLink({
                href: item.path,
                className: "flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200",
                onClick: onClose,
                children: /* @__PURE__ */ jsxs15(Fragment3, { children: [
                  item.icon && /* @__PURE__ */ jsx28("span", { className: "text-gray-500 dark:text-gray-400 mr-3", children: item.icon }),
                  /* @__PURE__ */ jsx28("span", { children: item.name })
                ] })
              }) }, item.name))
            ] }, section.title || `section-${sectionIndex}`)),
            onLogout && /* @__PURE__ */ jsx28("div", { className: "px-2 mt-4", children: /* @__PURE__ */ jsx28(
              "button",
              {
                className: "w-full text-left flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200",
                onClick: onLogout,
                children: /* @__PURE__ */ jsx28("span", { children: logoutLabel })
              }
            ) })
          ] })
        ]
      }
    )
  ] });
};

// src/components/molecules/StatCards/StatCards.tsx
import { jsx as jsx29, jsxs as jsxs16 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx29("div", { className: cn("grid gap-4", columnStyles[columns], className), children: cards.map((card) => {
    const color = card.color ?? "blue";
    const styles = colorStyles2[color];
    return /* @__PURE__ */ jsxs16(
      "div",
      {
        className: cn("border rounded-lg p-4", styles.bg, styles.border),
        children: [
          /* @__PURE__ */ jsx29("h3", { className: cn("text-sm font-medium mb-1", styles.text), children: card.label }),
          /* @__PURE__ */ jsx29("p", { className: cn("text-2xl font-bold", styles.text), children: formatValue(card.value) })
        ]
      },
      card.label
    );
  }) });
};

// src/components/templates/AppLayout/AppLayout.tsx
import { useState as useState4 } from "react";
import { jsx as jsx30, jsxs as jsxs17 } from "react/jsx-runtime";
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
  const [drawerOpen, setDrawerOpen] = useState4(false);
  const titleContent = /* @__PURE__ */ jsx30("span", { className: "text-xl font-bold text-primary-main dark:text-white", children: appTitle });
  const defaultRenderLink2 = ({
    href,
    children: linkChildren
  }) => /* @__PURE__ */ jsx30("a", { href, children: linkChildren });
  const linkRenderer = renderLink || defaultRenderLink2;
  return /* @__PURE__ */ jsxs17("div", { className: "flex min-h-screen bg-white dark:bg-gray-900", children: [
    /* @__PURE__ */ jsx30(AppBar, { position: "fixed", color: appBarColor, className: "shadow-none", children: /* @__PURE__ */ jsxs17("div", { className: "flex items-center justify-between px-4 py-2", children: [
      /* @__PURE__ */ jsxs17("h6", { className: "text-xl font-bold grow", children: [
        linkRenderer({
          href: titleHref,
          children: titleContent,
          className: "no-underline"
        }),
        titleSuffix
      ] }),
      /* @__PURE__ */ jsx30(
        "button",
        {
          className: "text-primary-main dark:text-white ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700",
          "aria-label": menuButtonLabel,
          onClick: () => setDrawerOpen(true),
          children: /* @__PURE__ */ jsx30(
            "svg",
            {
              className: "w-6 h-6",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: 1.5,
              stroke: "currentColor",
              children: /* @__PURE__ */ jsx30(
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
    /* @__PURE__ */ jsx30(
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
    /* @__PURE__ */ jsx30(
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
import { jsx as jsx31, jsxs as jsxs18 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs18(
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
        icon ? /* @__PURE__ */ jsx31(
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
        /* @__PURE__ */ jsx31(Heading, { as: "h2", size: headingSizeMap[size], children: title }),
        description ? /* @__PURE__ */ jsx31(
          Typography,
          {
            className: descriptionWidthClassMap[size],
            variant: descriptionVariantMap[size],
            tone: "muted",
            children: description
          }
        ) : null,
        action && actionPlacement === "inline" ? /* @__PURE__ */ jsx31("div", { children: action }) : null,
        action && actionPlacement === "below" ? /* @__PURE__ */ jsx31("div", { className: cn("flex w-full pt-1", actionWrapAlignClassMap[align]), children: action }) : null
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
import { useEffect as useEffect5, useState as useState5 } from "react";
function useMediaQuery(query) {
  const [matches, setMatches] = useState5(false);
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
  Card,
  Checkbox,
  ConfirmDialog,
  DataTable,
  Dialog,
  DrawerHeader,
  EmptyState,
  FormField,
  Heading,
  InfoTooltip,
  Input,
  ListItem,
  ListLayout,
  MonthSelector,
  NavigationDrawer,
  NumberInput,
  ProgressBar,
  SearchInput,
  Select,
  Spinner,
  StatCards,
  Textarea,
  ToggleSwitch,
  Tooltip,
  Typography,
  YearMonthInput,
  cn,
  useClickOutside,
  useEscapeKey,
  useMediaQuery
};
//# sourceMappingURL=index.js.map