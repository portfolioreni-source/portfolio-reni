// Íconos de las herramientas, dibujados a mano en SVG (sin librerías externas).
// Para agregar una herramienta nueva: sumá una entrada acá con el mismo nombre
// que usás en `tools` dentro de src/data/portfolio.ts.

type Props = { name: string; className?: string };

// Colores de la web (definidos en src/app/globals.css)
const C = {
  peony: "var(--peony)",
  pistachio: "var(--pistachio)",
  burgundy: "var(--burgundy)",
  fuchsia: "var(--fuchsia)",
  orange: "var(--orange)",
  white: "#ffffff",
};

// Los cuadrados van sin esquinas redondeadas: el redondeo de todos los iconos lo
// pone un solo recorte en `ToolIcon` (abajo), así las esquinas siempre coinciden.

// Estilo de Adobe: cuadrado de color y dos letras, sin borde.
function Adobe({ letters, bg, fg }: { letters: string; bg: string; fg: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden>
      <rect width="48" height="48" fill={bg} />
      <text
        x="24"
        y="31.5"
        textAnchor="middle"
        fontFamily="inherit"
        fontWeight="700"
        fontSize="20"
        fill={fg}
      >
        {letters}
      </text>
    </svg>
  );
}

const icons: Record<string, () => React.ReactElement> = {
  Illustrator: () => <Adobe letters="Ai" bg={C.burgundy} fg={C.peony} />,
  Photoshop: () => <Adobe letters="Ps" bg={C.fuchsia} fg={C.white} />,
  Lightroom: () => <Adobe letters="Lr" bg={C.orange} fg={C.white} />,
  InDesign: () => <Adobe letters="Id" bg={C.pistachio} fg={C.burgundy} />,

  // Logo real de Canva: degradado turquesa → violeta con la palabra "Canva" en blanco.
  // El trazo de la palabra viene del logo oficial (colección Simple Icons).
  Canva: () => (
    <svg viewBox="0 0 48 48" aria-hidden>
      <defs>
        <linearGradient id="canva-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00C4CC" />
          <stop offset="1" stopColor="#7D2AE8" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" fill="url(#canva-gradient)" />
      <path
        transform="translate(24 24) scale(1.6) translate(-12 -12)"
        fill={C.white}
        d="M6.962 7.68c.754 0 1.337.549 1.405 1.2.069.583-.171 1.097-.822 1.406-.343.171-.48.172-.549.069-.034-.069 0-.137.069-.206.617-.514.617-.926.548-1.508-.034-.378-.308-.618-.583-.618-1.2 0-2.914 2.674-2.674 4.629.103.754.549 1.646 1.509 1.646.308 0 .65-.103.96-.24.5-.264.799-.47 1.097-.8-.073-.885.704-2.046 1.851-2.046.515 0 .926.205.96.583.068.514-.377.582-.514.582s-.378-.034-.378-.17c-.034-.138.309-.07.275-.378-.035-.206-.24-.274-.446-.274-.72 0-1.131.994-1.029 1.611.035.275.172.549.447.549.205 0 .514-.31.617-.755.068-.308.343-.514.583-.514.102 0 .17.034.205.171v.138c-.034.137-.137.548-.102.651 0 .069.034.171.17.171.092 0 .436-.18.777-.459.117-.59.253-1.298.253-1.357.034-.24.137-.48.617-.48.103 0 .171.034.205.171v.138l-.136.617c.445-.583 1.097-.994 1.508-.994.172 0 .309.102.309.274 0 .103 0 .274-.069.446-.137.377-.309.96-.412 1.474 0 .137.035.274.207.274.171 0 .685-.206 1.096-.754l.007-.004c-.002-.068-.007-.134-.007-.202 0-.411.035-.754.104-.994.068-.274.411-.514.617-.514.103 0 .205.069.205.171 0 .035 0 .103-.034.137-.137.446-.24.857-.24 1.269 0 .24.034.582.102.788 0 .034.035.069.07.069.068 0 .548-.445.89-1.028-.308-.206-.48-.549-.48-.96 0-.72.446-1.097.858-1.097.343 0 .617.24.617.72 0 .308-.103.65-.274.96h.102a.77.77 0 0 0 .584-.24.293.293 0 0 1 .134-.117c.335-.425.83-.74 1.41-.74.48 0 .924.205.959.582.068.515-.378.618-.515.618l-.002-.002c-.138 0-.377-.035-.377-.172 0-.137.309-.068.274-.376-.034-.206-.24-.275-.446-.275-.686 0-1.13.891-1.028 1.611.034.275.171.583.445.583.206 0 .515-.308.652-.754.068-.274.343-.514.583-.514.103 0 .17.034.205.171 0 .069 0 .206-.137.652-.17.308-.171.48-.137.617.034.274.171.48.309.583.034.034.068.102.068.102 0 .069-.034.138-.137.138-.034 0-.068 0-.103-.035-.514-.205-.72-.548-.789-.891-.205.24-.445.377-.72.377-.445 0-.89-.411-.96-.926a1.609 1.609 0 0 1 .075-.649c-.203.13-.422.203-.623.203h-.17c-.447.652-.927 1.098-1.27 1.303a.896.896 0 0 1-.377.104c-.068 0-.171-.035-.205-.104-.095-.152-.156-.392-.193-.667-.481.527-1.145.805-1.453.805-.343 0-.548-.206-.582-.55v-.376c.102-.754.377-1.2.377-1.337a.074.074 0 0 0-.069-.07c-.24 0-1.028.824-1.166 1.373l-.103.445c-.068.309-.377.515-.582.515-.103 0-.172-.035-.206-.172v-.137l.046-.233c-.435.31-.87.508-1.075.508-.308 0-.48-.172-.514-.412-.206.274-.445.412-.754.412-.352 0-.696-.24-.862-.593-.244.275-.523.553-.852.764-.48.309-1.028.549-1.68.549-.582 0-1.097-.309-1.371-.583-.412-.377-.651-.96-.686-1.509-.205-1.68.823-3.84 2.4-4.8.378-.205.755-.343 1.132-.343zm9.77 3.291c-.104 0-.172.172-.172.343 0 .274.137.583.309.755a1.74 1.74 0 0 0 .102-.583c0-.343-.137-.515-.24-.515z"
      />
    </svg>
  ),

  Figma: () => (
    <svg viewBox="0 0 48 48" aria-hidden>
      <rect width="48" height="48" fill={C.burgundy} />
      <g transform="translate(16.5 9)">
        <path d="M0 5a5 5 0 0 1 5-5h5v10H5a5 5 0 0 1-5-5z" fill={C.orange} />
        <path d="M10 0h5a5 5 0 0 1 0 10h-5z" fill={C.peony} />
        <path d="M0 15a5 5 0 0 1 5-5h5v10H5a5 5 0 0 1-5-5z" fill={C.fuchsia} />
        <circle cx="15" cy="15" r="5" fill={C.white} />
        <path d="M0 25a5 5 0 0 1 5-5h5v5a5 5 0 0 1-10 0z" fill={C.pistachio} />
      </g>
    </svg>
  ),

  CapCut: () => (
    <svg viewBox="0 0 48 48" aria-hidden>
      <rect width="48" height="48" fill={C.pistachio} />
      <g fill="none" stroke={C.burgundy} strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M12 15h24v4" />
        <path d="M12 33h24v-4" />
        <path d="M12 19l24 10" />
        <path d="M12 29l24-10" />
      </g>
    </svg>
  ),

  "Visual Studio Code": () => (
    <svg viewBox="0 0 48 48" aria-hidden>
      <rect width="48" height="48" fill={C.fuchsia} />
      <g stroke={C.white} strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M32 11L12 28" />
        <path d="M32 37L12 20" />
      </g>
      <path d="M31 8l7.5 3.5v25L31 40z" fill={C.white} />
    </svg>
  ),
};

export function ToolIcon({ name, className }: Props) {
  const Icon = icons[name];
  return (
    <span className={`block overflow-hidden rounded-[22%] shadow-sm ${className ?? ""}`}>
      {Icon ? (
        <Icon />
      ) : (
        <span className="grid size-full place-items-center bg-sel text-sm font-bold text-white">
          {name.slice(0, 2)}
        </span>
      )}
    </span>
  );
}
