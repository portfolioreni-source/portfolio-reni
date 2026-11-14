import { profile } from "@/data/portfolio";

function Icon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const items = [
  { href: "#inicio", label: "Inicio", bg: "var(--orange)", fg: "#ffffff", d: "M3 11l9-8 9 8M5 10v10h14V10" },
  { href: "#proyectos", label: "Proyectos", bg: "var(--fuchsia)", fg: "#ffffff", d: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  { href: "#sobre-mi", label: "Sobre mí", bg: "var(--pistachio)", fg: "var(--burgundy)", d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" },
  { href: "#metodo", label: "Método", bg: "#ffffff", fg: "var(--fuchsia)", desktopOnly: true, d: "M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" },
  { href: "#contacto", label: "Contacto", bg: "var(--peony)", fg: "var(--burgundy)", d: "M4 6h16v12H4zM4 7l8 6 8-6" },
];

export function Dock() {
  return (
    <nav
      aria-label="Dock"
      className="dock fixed bottom-3 left-1/2 z-50 flex -translate-x-1/2 items-end gap-2.5 rounded-[1.4rem] border border-white/70 bg-paper/60 px-3 py-2.5 sm:gap-4 sm:px-6 shadow-[0_10px_40px_-10px_rgba(121,0,46,0.4)] backdrop-blur-xl"
    >
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href}
          aria-label={it.label}
          className={`dock-item place-items-center rounded-[0.8rem] shadow-sm size-11 sm:size-12 ${
            "desktopOnly" in it && it.desktopOnly ? "hidden sm:grid" : "grid"
          }`}
          style={{ background: it.bg, color: it.fg }}
        >
          <span className="dock-tip">{it.label}</span>
          <Icon d={it.d} />
        </a>
      ))}

      <span aria-hidden className="mx-0.5 h-9 w-px self-center bg-ink/15" />

      {profile.links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${l.label} (se abre en otra pestaña)`}
          className="dock-item grid size-11 place-items-center rounded-[0.8rem] bg-ink text-sm font-bold text-[var(--peony)] shadow-sm sm:size-12"
        >
          <span className="dock-tip">{l.label}</span>
          {l.label.slice(0, 2)}
        </a>
      ))}
    </nav>
  );
}
