import { defineConfig } from "tsup";
import { copyFileSync, mkdirSync } from "fs";

export default defineConfig({
  entry: ["src/index.ts", "tailwind-preset.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  banner: {
    js: '"use client";',
  },
  onSuccess: async () => {
    // トークンCSSをdistにコピー
    mkdirSync("dist", { recursive: true });
    copyFileSync("src/tokens/index.css", "dist/tokens.css");
  },
});
