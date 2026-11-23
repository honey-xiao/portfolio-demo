import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Storybook is built into public/storybook; Next.js doesn't serve a folder's
  // index.html by itself, so /storybook opens the built Storybook page.
  async redirects() {
    return [{ source: "/storybook", destination: "/storybook/index.html", permanent: false }];
  },
};

export default nextConfig;
