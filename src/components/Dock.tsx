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
  { href: "#inicio", label: "Inicio", bg: "#ff8a5c", d: "M3 11l9-8 9 8M5 10v10h14V10" },
  { href: "#proyectos", label: "Proyectos", bg: "#4c9bff", d: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  { href: "#sobre-mi", label: "Sobre mí", bg: "#a78bfa", d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" },
  { href: "#contacto", label: "Contacto", bg: "#34c38f", d: "M4 6h16v12H4zM4 7l8 6 8-6" },
];

export function Dock() {
  return (
    <nav
      aria-label="Dock"
      className="fixed bottom-3 left-1/2 z-50 flex -translate-x-1/2 items-end gap-2.5 rounded-[1.4rem] border border-white/70 bg-paper/60 px-3 py-2.5 shadow-[0_10px_40px_-10px_rgba(18,18,22,0.35)] backdrop-blur-xl"
    >
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href}
          aria-label={it.label}
          className="dock-item grid size-11 place-items-center rounded-[0.8rem] text-white shadow-sm sm:size-12"
          style={{ background: it.bg }}
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
          className="dock-item grid size-11 place-items-center rounded-[0.8rem] bg-ink text-sm font-bold text-paper shadow-sm sm:size-12"
        >
          <span className="dock-tip">{l.label}</span>
          {l.label.slice(0, 2)}
        </a>
      ))}
    </nav>
  );
}
