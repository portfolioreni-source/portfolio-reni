import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Genera HTML estático en la carpeta "out", que se puede publicar en cualquier hosting.
  output: "export",
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
