import { defineConfig } from "tsup";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import postcss from "postcss";
import postcssImport from "postcss-import";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  tsconfig: "tsconfig.build.json",
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  banner: {
    js: '"use client";',
  },
  onSuccess: async () => {
    // トークンCSSを@import解決して1ファイルに結合
    mkdirSync("dist", { recursive: true });
    const css = readFileSync("src/tokens/index.css", "utf-8");
    const result = await postcss([postcssImport()]).process(css, {
      from: "src/tokens/index.css",
    });
    writeFileSync("dist/tokens.css", result.css);
  },
});
