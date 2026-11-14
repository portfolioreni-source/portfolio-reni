// Ruta de una imagen de /public, con el prefijo de la web cuando está publicada
// en una subcarpeta (por ejemplo GitHub Pages: /portfolio-reni/yo-portada.jpg).
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) =>
  path.startsWith("/") ? `${base}${path}` : path;
