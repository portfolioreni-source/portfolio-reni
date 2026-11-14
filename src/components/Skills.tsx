"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { Service } from "@/data/portfolio";

// Colores de las tarjetas (fondo y texto, ya con buen contraste)
const colors = [
  { bg: "var(--peony)", fg: "var(--burgundy)", chip: "var(--paper)", btn: "bg-burgundy text-peony" },
  { bg: "var(--pistachio)", fg: "var(--burgundy)", chip: "var(--paper)", btn: "bg-burgundy text-pistachio" },
  { bg: "var(--burgundy)", fg: "var(--peony)", chip: "rgba(255,255,255,0.12)", btn: "bg-peony text-burgundy" },
  { bg: "#ffffff", fg: "var(--burgundy)", chip: "var(--peony)", btn: "bg-burgundy text-peony" },
];

// Los tres botones de ventana de la Mac, con su símbolo dibujado adentro
function Lights({
  onClose,
  onMinimize,
  onZoom,
  zoomed,
  onPistachio,
}: {
  onClose?: () => void;
  onMinimize?: () => void;
  onZoom?: () => void;
  zoomed?: boolean;
  onPistachio?: boolean; // en la ventana pistacho, el botón verde va en bordó para que se vea
}) {
  const dot =
    "grid size-4 place-items-center rounded-full ring-1 ring-black/15 transition-[filter] hover:brightness-90";
  const icon = "size-2.5";
  const items = [
    {
      color: "var(--fuchsia)",
      ink: "#ffffff",
      label: "Cerrar",
      on: onClose,
      path: <path d="M3 3l6 6M9 3l-6 6" />,
    },
    {
      color: "var(--orange)",
      ink: "#ffffff",
      label: "Minimizar",
      on: onMinimize,
      path: <path d="M2.5 6h7" />,
    },
    {
      color: onPistachio ? "var(--burgundy)" : "var(--pistachio)",
      ink: onPistachio ? "var(--pistachio)" : "var(--burgundy)",
      label: zoomed ? "Reducir" : "Ampliar",
      on: onZoom,
      path: zoomed ? (
        <path d="M6.5 1.5v4h4M5.5 10.5v-4h-4" fill="currentColor" stroke="none" />
      ) : (
        <path d="M2 6.5V10h3.5zM10 5.5V2H6.5z" fill="currentColor" stroke="none" />
      ),
    },
  ];
  return (
    <div className="flex gap-2">
      {items.map((it) => {
        const svg = (
          <svg
            viewBox="0 0 12 12"
            className={icon}
            style={{ color: it.ink }}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            aria-hidden
          >
            {it.path}
          </svg>
        );
        return it.on ? (
          <button
            key={it.label}
            type="button"
            aria-label={it.label}
            onClick={(e) => {
              e.stopPropagation();
              it.on?.();
            }}
            className={`${dot} cursor-act`}
            style={{ background: it.color }}
          >
            {svg}
          </button>
        ) : (
          <span key={it.label} aria-hidden className={dot} style={{ background: it.color }}>
            {svg}
          </span>
        );
      })}
    </div>
  );
}

export function Skills({ services }: { services: Service[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const win = useRef<HTMLDivElement | null>(null);

  const reduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Animación: la ventana "sale" de la tarjeta y vuelve a ella al cerrarse
  const fromCard = useCallback((i: number) => {
    const card = cards.current[i]?.getBoundingClientRect();
    const w = win.current?.getBoundingClientRect();
    if (!card || !w) return null;
    const dx = card.left + card.width / 2 - (w.left + w.width / 2);
    const dy = card.top + card.height / 2 - (w.top + w.height / 2);
    const s = Math.min(card.width / w.width, card.height / w.height);
    return `translate(${dx}px, ${dy}px) scale(${s})`;
  }, []);

  function show(i: number) {
    setZoomed(false);
    setOpen(i);
  }

  const close = useCallback(() => {
    if (open === null) return;
    const i = open;
    const done = () => {
      setOpen(null);
      // Esperar a que la tarjeta vuelva a verse para devolverle el foco
      requestAnimationFrame(() =>
        // sin trazo: así solo la tarjeta bajo el mouse lo muestra
        cards.current[i]?.focus({ preventScroll: true, focusVisible: false } as FocusOptions),
      );
    };
    const t = fromCard(i);
    if (!t || reduced() || !win.current) return done();
    win.current.animate(
      [
        { transform: "none", opacity: 1 },
        { transform: t, opacity: 0 },
      ],
      { duration: 260, easing: "cubic-bezier(0.4, 0, 0.6, 1)", fill: "forwards" },
    ).onfinish = done;
  }, [open, fromCard]);

  // Al abrir: animar desde la tarjeta, mover el foco y frenar el scroll de fondo
  useEffect(() => {
    if (open === null) return;
    const t = fromCard(open);
    if (t && !reduced()) {
      win.current?.animate(
        [
          { transform: t, opacity: 0.4 },
          { transform: "none", opacity: 1 },
        ],
        { duration: 420, easing: "cubic-bezier(0.2, 0.9, 0.25, 1.05)" },
      );
    }
    win.current?.focus({ preventScroll: true });
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [open, fromCard]);

  // Escape cierra
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const s = open !== null ? services[open] : null;
  const c = open !== null ? colors[open % colors.length] : colors[0];

  return (
    <>
      <ul className="group/list mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((sv, i) => {
          const col = colors[i % colors.length];
          return (
            <li
              key={sv.title}
              data-reveal=""
              data-reveal-type="pop"
              // Cada tarjeta aparece cuando llega a la pantalla. El pequeño
              // retraso solo se usa entre tarjetas que están en la misma fila.
              className="sm:[--rd:calc(var(--col2)*120ms)] lg:[--rd:calc(var(--col4)*120ms)]"
              style={{ "--col2": i % 2, "--col4": i % 4 } as CSSProperties}
            >
              <div
                ref={(el) => {
                  cards.current[i] = el;
                }}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`${sv.title}: ver más`}
                onClick={() => show(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    show(i);
                  }
                }}
                className={`group flex h-full cursor-act flex-col rounded-[1.75rem] border border-ink/10 p-6 outline-3 outline-offset-0 outline-transparent transition-[translate,rotate,outline-color,outline-offset] duration-300 hover:-translate-y-1 hover:rotate-[-0.6deg] hover:outline-offset-4 hover:outline-fuchsia focus-visible:rounded-[1.75rem] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-fuchsia group-hover/list:not-hover:outline-transparent group-hover/list:not-hover:outline-offset-0 sm:p-7 ${
                  open === i ? "invisible" : ""
                }`}
                style={{ background: col.bg, color: col.fg }}
              >
                <h3 className="font-display text-2xl font-bold leading-tight tracking-tight">
                  {sv.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed opacity-85">
                  {sv.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Ver más
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {s && (
        <div
          className="fixed inset-0 z-[200] grid place-items-center bg-burgundy/25 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            ref={win}
            role="dialog"
            aria-modal="true"
            aria-labelledby="skill-title"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className={`flex max-h-[calc(100svh-2rem)] w-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/10 shadow-[0_40px_90px_-30px_rgba(121,0,46,0.7)] outline-none transition-[max-width] duration-300 ${
              zoomed ? "max-w-4xl" : "max-w-xl"
            }`}
            style={{ background: c.bg, color: c.fg }}
          >
            <div className="flex items-center gap-3 border-b border-current/15 px-5 py-4">
              <Lights
                onClose={close}
                onMinimize={close}
                onZoom={() => setZoomed((z) => !z)}
                zoomed={zoomed}
                onPistachio={c.bg === "var(--pistachio)"}
              />
              <p className="flex-1 pr-16 text-center text-sm font-semibold opacity-75">
                {s.title}
              </p>
            </div>

            <div className="overflow-y-auto p-7 sm:p-10">
              <h3
                id="skill-title"
                className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl"
              >
                {s.title}
              </h3>
              <p className="mt-5 text-lg leading-relaxed sm:text-xl">{s.more}</p>

              <h4 className="mt-8 text-sm font-bold uppercase tracking-widest opacity-75">
                Qué incluye
              </h4>
              <ul
                className={`mt-4 grid gap-3 ${zoomed ? "sm:grid-cols-3" : ""}`}
              >
                {s.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl px-4 py-3 font-medium"
                    style={{ background: c.chip }}
                  >
                    <span aria-hidden className="text-fuchsia">
                      ✦
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                onClick={close}
                className={`mt-8 inline-block rounded-full px-6 py-3 font-semibold transition-colors hover:bg-orange hover:text-white ${c.btn}`}
              >
                Quiero esto
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
