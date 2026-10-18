import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    const tailwindcss = await import("@tailwindcss/vite");
    config.plugins = config.plugins || [];
    config.plugins.push(tailwindcss.default());
    // 開発サーバーをローカルホストに限定し、外部ネットワークへ公開しない
    config.server = { ...config.server, host: "127.0.0.1" };
    return config;
  },
};

export default config;
