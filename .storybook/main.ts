import type { StorybookConfig } from "@storybook/nextjs-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: "@storybook/nextjs-vite",
  // No staticDirs: Storybook is built into public/storybook, and copying public
  // into itself fails (ERR_FS_CP_EINVAL). Component images are imported from src/assets.
  viteFinal: async (config) => {
    // Next.js runs Tailwind through its own bundler; Storybook (Vite) needs the plugin.
    config.plugins = [...(config.plugins ?? []), tailwindcss()];
    return config;
  },
};

export default config;
