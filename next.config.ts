import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Genera HTML estático en la carpeta "out", que se puede publicar en cualquier hosting.
  output: "export",
  // En GitHub Pages la web vive en una subcarpeta (/portfolio-reni). En Netlify queda vacío.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // La exportación estática no incluye el optimizador de imágenes de Next.js.
  images: { unoptimized: true },
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
