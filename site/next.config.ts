import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Lets the dev server be opened at 127.0.0.1 as well as localhost (handy when a
  // browser has blocked WebGL for one origin while testing heavy effects).
  allowedDevOrigins: ["127.0.0.1"],
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
};

export default nextConfig;
