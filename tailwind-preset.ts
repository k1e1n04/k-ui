import type { Config } from "tailwindcss";

/**
 * k1e1n04-ui Tailwindプリセット
 * 消費側の tailwind.config.ts で presets に追加して使用する
 */
const kuiPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        primary: {
          main: "var(--kui-color-primary)",
          light: "var(--kui-color-primary-hover)",
        },
        secondary: {
          main: "var(--kui-color-secondary)",
          light: "var(--kui-color-secondary-subtle)",
        },
        success: {
          main: "var(--kui-color-success)",
        },
        accent: {
          main: "var(--kui-color-accent)",
        },
      },
      animation: {
        "kui-fade-in": "kui-fade-in 0.3s ease-in-out",
        "kui-slide-down": "kui-slide-down 0.3s ease-in-out",
        "kui-slide-up": "kui-slide-up 0.3s ease-in-out",
        "kui-spin": "kui-spin 1s linear infinite",
      },
      keyframes: {
        "kui-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "kui-slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "kui-slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "kui-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
};

export default kuiPreset;
