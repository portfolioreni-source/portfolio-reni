// Icono de carpeta dibujado en SVG (sin gradientes con id, para poder repetirlo).
// Colores de la paleta: fuchsia por detrás, peony por delante.
export function FolderIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 112 92"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6 14a8 8 0 0 1 8-8h28a8 8 0 0 1 6 2.7l5.2 6A8 8 0 0 0 59.3 17H98a8 8 0 0 1 8 8v8H6z"
        fill="#e8106a"
      />
      <rect x="6" y="25" width="100" height="61" rx="9" fill="#fbb6cf" />
      <rect x="6" y="25" width="100" height="14" rx="7" fill="#fdd3e2" />
      <rect
        x="6.75"
        y="25.75"
        width="98.5"
        height="59.5"
        rx="8.25"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.7"
        strokeWidth="1.5"
      />
    </svg>
  );
}
