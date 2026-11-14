"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { Project, ProjectColor } from "@/data/portfolio";
import { FolderIcon } from "./FolderIcon";

// Cada color de etiqueta lleva su color de texto, para que siempre se lea bien.
const tagColors: Record<ProjectColor, { bg: string; fg: string }> = {
  peony: { bg: "var(--peony)", fg: "var(--burgundy)" },
  pistachio: { bg: "var(--pistachio)", fg: "var(--burgundy)" },
  burgundy: { bg: "var(--burgundy)", fg: "var(--peony)" },
  fuchsia: { bg: "var(--fuchsia)", fg: "#ffffff" },
};

const tagVars = (c: ProjectColor) =>
  ({ "--tag-bg": tagColors[c].bg, "--tag-fg": tagColors[c].fg }) as CSSProperties;

const WIN_W = 640;
const spots = [
  [6, 8],
  [34, 44],
  [60, 6],
  [74, 48],
  [14, 62],
  [46, 70],
];
function spot(i: number): [number, number] {
  const s = spots[i];
  return s ? [s[0], s[1]] : [(8 + i * 19) % 78, (10 + i * 29) % 62];
}

type Win = { id: number; z: number; x: number; y: number; wide: boolean; shaded: boolean };

const isDesktopViewport = () =>
  typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;

export function Desktop({ projects }: { projects: Project[] }) {
  const [wins, setWins] = useState<Win[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [pos, setPos] = useState(() =>
    projects.map((_, i) => ({ x: spot(i)[0], y: spot(i)[1] })),
  );

  const zCounter = useRef(10);
  const areaRef = useRef<HTMLDivElement>(null);
  const folderDrag = useRef<{ i: number; gx: number; gy: number; sx: number; sy: number } | null>(null);
  const didDrag = useRef(false);
  const winDrag = useRef<{ id: number; sx: number; sy: number; ox: number; oy: number } | null>(null);

  const close = useCallback((id: number) => {
    setWins((prev) => prev.filter((w) => w.id !== id));
    requestAnimationFrame(() => document.getElementById(`folder-${id}`)?.focus());
  }, []);

  // Escape cierra la ventana que está encima
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || wins.length === 0) return;
      const top = wins.reduce((a, b) => (a.z > b.z ? a : b));
      close(top.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [wins, close]);

  function open(id: number) {
    const z = ++zCounter.current;
    const vw = window.innerWidth;
    setSelected(id);
    setWins((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        return prev.map((w) => (w.id === id ? { ...w, z, shaded: false } : w));
      }
      const n = prev.length;
      return [
        ...prev,
        {
          id,
          z,
          x: Math.max(16, (vw - WIN_W) / 2 + n * 30 - 30),
          y: 80 + n * 28,
          wide: false,
          shaded: false,
        },
      ];
    });
  }

  function front(id: number) {
    const z = ++zCounter.current;
    setWins((prev) => prev.map((w) => (w.id === id ? { ...w, z } : w)));
  }

  function patch(id: number, p: Partial<Win>) {
    setWins((prev) => prev.map((w) => (w.id === id ? { ...w, ...p } : w)));
  }

  /* ---------- Arrastrar carpetas (solo en pantallas anchas) ---------- */
  function folderDown(e: ReactPointerEvent<HTMLButtonElement>, i: number) {
    if (!isDesktopViewport() || e.button !== 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    folderDrag.current = {
      i,
      gx: e.clientX - rect.left,
      gy: e.clientY - rect.top,
      sx: e.clientX,
      sy: e.clientY,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function folderMove(e: ReactPointerEvent<HTMLButtonElement>) {
    const d = folderDrag.current;
    const area = areaRef.current;
    if (!d || !area) return;
    if (!didDrag.current && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < 6) return;
    didDrag.current = true;
    const r = area.getBoundingClientRect();
    const x = Math.min(86, Math.max(0, ((e.clientX - r.left - d.gx) / r.width) * 100));
    const y = Math.min(78, Math.max(0, ((e.clientY - r.top - d.gy) / r.height) * 100));
    setPos((prev) => prev.map((p, idx) => (idx === d.i ? { x, y } : p)));
  }

  function folderUp() {
    folderDrag.current = null;
  }

  function folderClick(i: number) {
    if (didDrag.current) {
      didDrag.current = false;
      return;
    }
    open(i);
  }

  /* ---------- Arrastrar ventanas por la barra de título ---------- */
  function titleDown(e: ReactPointerEvent<HTMLDivElement>, w: Win) {
    if (!isDesktopViewport() || e.button !== 0) return;
    if ((e.target as HTMLElement).closest("button")) return;
    winDrag.current = { id: w.id, sx: e.clientX, sy: e.clientY, ox: w.x, oy: w.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function titleMove(e: ReactPointerEvent<HTMLDivElement>) {
    const d = winDrag.current;
    if (!d) return;
    const x = Math.min(window.innerWidth - 140, Math.max(-WIN_W + 160, d.ox + e.clientX - d.sx));
    const y = Math.min(window.innerHeight - 80, Math.max(40, d.oy + e.clientY - d.sy));
    patch(d.id, { x, y });
  }

  function titleUp() {
    winDrag.current = null;
  }

  return (
    <>
      <div
        ref={areaRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
        className="desk-surface relative grid grid-cols-2 gap-x-4 gap-y-10 rounded-[2rem] border border-ink/10 p-6 sm:grid-cols-3 md:block md:h-[640px] md:p-0"
      >
        {projects.map((p, i) => (
          <button
            key={p.title}
            id={`folder-${i}`}
            type="button"
            aria-haspopup="dialog"
            data-selected={selected === i}
            onPointerDown={(e) => folderDown(e, i)}
            onPointerMove={folderMove}
            onPointerUp={folderUp}
            onPointerCancel={folderUp}
            onClick={() => folderClick(i)}
            className="folder group flex flex-col items-center text-center md:absolute md:left-[var(--fx)] md:top-[var(--fy)] md:w-36 md:touch-none"
            style={
              {
                "--fx": `${pos[i].x}%`,
                "--fy": `${pos[i].y}%`,
              } as CSSProperties
            }
          >
            <FolderIcon className="folder-icon w-24 drop-shadow-[0_8px_10px_rgba(121,0,46,0.22)] md:w-28" />
            <span
              className="folder-label mt-2 rounded-md px-2 py-0.5 text-sm font-semibold"
              style={tagVars(p.color)}
            >
              {p.title}
            </span>
          </button>
        ))}

        <p className="col-span-full self-end text-center text-xs text-muted md:absolute md:bottom-4 md:left-0 md:right-0">
          <span className="md:hidden">Toca una carpeta para abrirla.</span>
          <span className="hidden md:inline">
            Arrastra las carpetas y haz clic para abrirlas.
          </span>
        </p>
      </div>

      {wins.map((w) => {
        const p = projects[w.id];
        return (
          <section
            key={w.id}
            role="dialog"
            aria-label={p.title}
            tabIndex={-1}
            ref={(el) => {
              // Al abrir, el foco pasa a la ventana
              if (el && !el.dataset.focused) {
                el.dataset.focused = "1";
                el.focus({ preventScroll: true });
              }
            }}
            onPointerDown={() => front(w.id)}
            className={`pop fixed left-3 right-3 top-12 flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-[0_30px_70px_-20px_rgba(18,18,22,0.5)] outline-none md:left-[var(--x)] md:right-auto md:top-[var(--y)] md:bottom-auto md:max-h-[calc(100vh-var(--y)-7rem)] md:w-[var(--w)] ${
              w.shaded ? "bottom-auto" : "bottom-24"
            }`}
            style={
              {
                zIndex: w.z + 100,
                "--x": `${w.x}px`,
                "--y": `${w.y}px`,
                "--w": w.wide ? "min(900px, 92vw)" : `${WIN_W}px`,
              } as CSSProperties
            }
          >
            <div
              onPointerDown={(e) => titleDown(e, w)}
              onPointerMove={titleMove}
              onPointerUp={titleUp}
              onPointerCancel={titleUp}
              className="flex select-none items-center gap-2 border-b border-ink/10 bg-surface px-4 py-3 cursor-act md:touch-none"
            >
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Cerrar ventana"
                  onClick={() => close(w.id)}
                  className="size-3.5 rounded-full bg-[#ff5f57] ring-1 ring-black/10 hover:brightness-90"
                />
                <button
                  type="button"
                  aria-label={w.shaded ? "Mostrar contenido" : "Ocultar contenido"}
                  aria-pressed={w.shaded}
                  onClick={() => patch(w.id, { shaded: !w.shaded })}
                  className="size-3.5 rounded-full bg-[#febc2e] ring-1 ring-black/10 hover:brightness-90"
                />
                <button
                  type="button"
                  aria-label={w.wide ? "Reducir ventana" : "Ampliar ventana"}
                  aria-pressed={w.wide}
                  onClick={() => patch(w.id, { wide: !w.wide })}
                  className="hidden size-3.5 rounded-full bg-[#28c840] ring-1 ring-black/10 hover:brightness-90 md:block"
                />
              </div>
              <p className="flex-1 pr-12 text-center text-sm font-medium md:pr-10">
                {p.title}
              </p>
            </div>

            {!w.shaded && (
              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="hatch relative aspect-[2/1]">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={`Imagen del proyecto ${p.title}`}
                      fill
                      sizes="(min-width: 768px) 640px, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center text-xs uppercase tracking-widest text-sel/70">
                      Imagen del proyecto
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-3xl font-extrabold tracking-tight">
                      {p.title}
                    </h3>
                    <span className="text-sm text-muted">{p.year}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-sel">{p.role}</p>
                  <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">
                    {p.summary}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Etiquetas">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-md px-2.5 py-1 text-xs font-semibold"
                        style={{
                          background: tagColors[p.color].bg,
                          color: tagColors[p.color].fg,
                        }}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  {(p.href || p.repo) && (
                    <p className="mt-6 flex flex-wrap gap-3">
                      {p.href && (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-sel"
                        >
                          Ver web ↗
                        </a>
                      )}
                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium transition-colors hover:border-sel hover:text-sel"
                        >
                          Código ↗
                        </a>
                      )}
                    </p>
                  )}
                </div>
              </div>
            )}
          </section>
        );
      })}
    </>
  );
}
