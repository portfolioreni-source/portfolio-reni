import type { ReactNode } from "react";
import { profile } from "@/data/portfolio";
import { CalendarIcon } from "./CalendarIcon";
import { DockItem } from "./DockItem";

// Dibujo de un icono (trazo del color del texto). Recibe los trazos como hijos.
function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 sm:size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const phonePath =
  "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z";

// Iconos de las redes, por el nombre que tienen en portfolio.ts
const socialIcons: Record<string, ReactNode> = {
  LinkedIn: (
    <Glyph>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </Glyph>
  ),
  Instagram: (
    <Glyph>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </Glyph>
  ),
  WhatsApp: (
    <Glyph>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
      <g transform="translate(7.4 7.2) scale(0.42)">
        <path d={phonePath} />
      </g>
    </Glyph>
  ),
};

const mailIcon = (
  <Glyph>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Glyph>
);

// Tamaño de cada icono. En el móvil se calcula según el ancho de la pantalla para que
// quepan los nueve en una sola fila (entre 28 px y 44 px); desde 640 px son de 48 px.
const tile =
  "size-[clamp(1.75rem,calc((100vw_-_4.5rem)/9),2.75rem)] sm:size-12";

// Secciones de la página
const items: {
  href: string;
  label: string;
  bg: string;
  fg: string;
  icon: ReactNode;
  calendar?: boolean;
}[] = [
  {
    href: "#inicio",
    label: "Inicio",
    bg: "var(--orange)",
    fg: "#ffffff",
    icon: (
      <Glyph>
        <path d="M3 11l9-8 9 8M5 10v10h14V10" />
      </Glyph>
    ),
  },
  {
    href: "#proyectos",
    label: "Proyectos",
    bg: "var(--fuchsia)",
    fg: "#ffffff",
    icon: (
      <Glyph>
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </Glyph>
    ),
  },
  {
    href: "#sobre-mi",
    label: "Sobre mí",
    bg: "var(--pistachio)",
    fg: "var(--burgundy)",
    icon: (
      <Glyph>
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" />
      </Glyph>
    ),
  },
  {
    href: "#metodo",
    label: "Método",
    bg: "#ffffff",
    fg: "var(--fuchsia)",
    calendar: true,
    icon: (
      <Glyph>
        <path d="M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
      </Glyph>
    ),
  },
  {
    // Burbuja de conversación: representa "hablemos", el contacto
    href: "#contacto",
    label: "Contacto",
    bg: "var(--peony)",
    fg: "var(--burgundy)",
    icon: (
      <Glyph>
        <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </Glyph>
    ),
  },
];

const socialItems = [
  ...profile.links.map((l) => ({
    key: l.label,
    href: l.href,
    label: l.label,
    external: true,
    icon: socialIcons[l.label] ?? l.label.slice(0, 2),
  })),
  {
    key: "Mail",
    href: `mailto:${profile.email}`,
    label: "Mail",
    external: false,
    icon: mailIcon,
  },
];

export function Dock() {
  return (
    <nav
      aria-label="Dock"
      className="dock fixed bottom-3 left-1/2 z-50 flex -translate-x-1/2 items-end gap-1 rounded-[1.4rem] border border-white/70 bg-paper/60 px-2 py-2.5 shadow-[0_10px_40px_-10px_rgba(121,0,46,0.4)] backdrop-blur-xl sm:gap-3 sm:px-6 md:gap-4"
    >
      {items.map((it) => (
        <DockItem
          key={it.label}
          href={it.href}
          label={it.label}
          className={`dock-item ${tile} grid place-items-center rounded-[0.7rem] shadow-sm sm:rounded-[0.8rem]`}
          style={{ background: it.bg, color: it.fg }}
        >
          <span className="dock-tip">{it.label}</span>
          {it.calendar ? <CalendarIcon>{it.icon}</CalendarIcon> : it.icon}
        </DockItem>
      ))}

      <span aria-hidden className="mx-0.5 h-7 w-px self-center bg-ink/15 sm:h-9" />

      {socialItems.map((s) => (
        <DockItem
          key={s.key}
          href={s.href}
          label={s.label}
          external={s.external}
          className={`dock-item ${tile} grid place-items-center rounded-[0.7rem] bg-ink text-xs font-bold text-[var(--peony)] shadow-sm sm:rounded-[0.8rem] sm:text-sm`}
          style={{}}
        >
          <span className="dock-tip">{s.label}</span>
          {s.icon}
        </DockItem>
      ))}
    </nav>
  );
}
