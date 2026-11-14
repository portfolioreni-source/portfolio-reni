"use client";

import Image from "next/image";
import { asset } from "@/lib/asset";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { allImages, type Project, type ProjectColor } from "@/data/portfolio";
import imageSizes from "@/data/project-images.json";
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

// Tamaño real de cada imagen, para reservar su lugar antes de que cargue.
const sizes = imageSizes as unknown as Record<string, [number, number]>;
const dims = (src: string) => sizes[src] ?? [1600, 1200];
const isVideo = (src: string) => src.endsWith(".mp4");

function Video({ src, className }: { src: string; className?: string }) {
  const [w, h] = dims(src);
  return (
    <video
      src={asset(src)}
      poster={asset(src.replace(/\.mp4$/, ".jpg"))}
      width={w}
      height={h}
      controls
      playsInline
      preload="none"
      className={className}
    />
  );
}

const WIN_W = 760;
// Posición inicial de cada carpeta (en % del escritorio): tres filas un poco desordenadas.
const spots = [
  [4, 4],
  [28, 9],
  [52, 3],
  [76, 8],
  [14, 36],
  [40, 33],
  [64, 38],
  [86, 32],
  [3, 66],
  [30, 64],
  [56, 68],
  [80, 66],
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
  // Imagen ampliada: proyecto e índice dentro de sus imágenes
  const [zoom, setZoom] = useState<{ p: number; i: number } | null>(null);
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

  // Tocar afuera de las ventanas las cierra (salvo al tocar una carpeta o la imagen ampliada)
  useEffect(() => {
    if (wins.length === 0 || zoom) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('section[role="dialog"], .folder, [aria-modal="true"]')) return;
      setWins([]);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [wins.length, zoom]);

  // Escape cierra la ventana que está encima
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (zoom) {
        const n = allImages(projects[zoom.p]).length;
        if (e.key === "Escape") setZoom(null);
        if (e.key === "ArrowRight") setZoom({ ...zoom, i: (zoom.i + 1) % n });
        if (e.key === "ArrowLeft") setZoom({ ...zoom, i: (zoom.i - 1 + n) % n });
        return;
      }
      if (e.key !== "Escape" || wins.length === 0) return;
      const top = wins.reduce((a, b) => (a.z > b.z ? a : b));
      close(top.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [wins, close, zoom, projects]);

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
        className="desk-surface relative grid grid-cols-3 gap-x-2 gap-y-8 rounded-[2rem] border border-ink/10 px-3 py-6 sm:grid-cols-4 sm:gap-x-4 sm:p-6 md:block md:h-[720px] md:p-0"
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
            className="folder group flex flex-col items-center text-center [--rd:var(--rd-m)] sm:[--rd:var(--rd-s)] md:[--rd:var(--rd-d)] md:absolute md:left-[var(--fx)] md:top-[var(--fy)] md:w-36 md:touch-none"
            data-reveal=""
            data-reveal-type="pop"
            style={
              {
                "--fx": `${pos[i].x}%`,
                "--fy": `${pos[i].y}%`,
                // Las carpetas caen una tras otra cuando llegan a pantalla. En la grilla
                // (celular) la espera depende de la columna, así cada fila entra junta y
                // las últimas no llegan tarde; en el escritorio grande, en cascada corta.
                "--rd-m": `${(i % 3) * 120}ms`,
                "--rd-s": `${(i % 4) * 120}ms`,
                "--rd-d": `${Math.min(i * 70, 700)}ms`,
              } as CSSProperties
            }
          >
            <FolderIcon className="folder-icon w-20 drop-shadow-[0_8px_10px_rgba(121,0,46,0.22)] sm:w-24 md:w-28" />
            <span
              className="folder-label mt-2 rounded-md px-1.5 py-0.5 text-xs font-semibold leading-snug sm:px-2 sm:text-sm"
              style={tagVars(p.color)}
            >
              {p.title}
            </span>
          </button>
        ))}

        <p className="col-span-full self-end text-center text-xs text-muted md:absolute md:bottom-4 md:left-0 md:right-0">
          <span className="md:hidden">Tocá una carpeta para abrirla.</span>
          <span className="hidden md:inline">
            Arrastrá las carpetas y hacé clic para abrirlas.
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
                  className="size-3.5 rounded-full bg-fuchsia ring-1 ring-black/10 hover:brightness-90"
                />
                <button
                  type="button"
                  aria-label={w.shaded ? "Mostrar contenido" : "Ocultar contenido"}
                  aria-pressed={w.shaded}
                  onClick={() => patch(w.id, { shaded: !w.shaded })}
                  className="size-3.5 rounded-full bg-orange ring-1 ring-black/10 hover:brightness-90"
                />
                <button
                  type="button"
                  aria-label={w.wide ? "Reducir ventana" : "Ampliar ventana"}
                  aria-pressed={w.wide}
                  onClick={() => patch(w.id, { wide: !w.wide })}
                  className="hidden size-3.5 rounded-full bg-pistachio ring-1 ring-black/10 hover:brightness-90 md:block"
                />
              </div>
              <p className="flex-1 pr-12 text-center text-sm font-medium md:pr-10">
                {p.title}
              </p>
            </div>

            {!w.shaded && (
              <div className="min-h-0 flex-1 overflow-y-auto">
                <Shot project={p} pi={w.id} i={0} onZoom={setZoom} cover />

                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-3xl font-extrabold tracking-tight">
                      {p.title}
                    </h3>
                    {p.year && <span className="text-sm text-muted">{p.year}</span>}
                  </div>
                  {p.kind && <p className="mt-1 text-sm font-medium text-sel">{p.kind}</p>}
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

                  {p.href && (
                    <p className="mt-6">
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-sel"
                      >
                        {p.hrefLabel ?? "Ver más"} ↗
                      </a>
                    </p>
                  )}
                </div>

                <Gallery project={p} pi={w.id} onZoom={setZoom} />
              </div>
            )}
          </section>
        );
      })}
      {zoom && (
        <Lightbox
          project={projects[zoom.p]}
          i={zoom.i}
          onMove={(i) => setZoom({ ...zoom, i })}
          onClose={() => setZoom(null)}
        />
      )}
    </>
  );
}

/* ---------- Una imagen de la galería: al tocarla se amplía ---------- */
function Shot({
  project,
  pi,
  i,
  onZoom,
  cover = false,
}: {
  project: Project;
  pi: number;
  i: number;
  onZoom: (z: { p: number; i: number }) => void;
  cover?: boolean;
}) {
  const src = allImages(project)[i];
  const [w, h] = dims(src);
  if (isVideo(src))
    return <Video src={src} className={`block h-auto w-full bg-ink ${cover ? "" : "rounded-xl"}`} />;
  return (
    <button
      type="button"
      onClick={() => onZoom({ p: pi, i })}
      aria-label={`Ampliar imagen ${i + 1} de ${project.title}`}
      className={`group block w-full overflow-hidden bg-surface ${cover ? "" : "rounded-xl"}`}
    >
      <Image
        src={asset(src)}
        alt=""
        width={w}
        height={h}
        sizes={cover ? "(min-width: 768px) 760px, 100vw" : "(min-width: 768px) 360px, 50vw"}
        loading={cover ? "eager" : "lazy"}
        className={`h-auto w-full transition-transform duration-300 group-hover:scale-[1.03] ${
          cover ? "max-h-[70vh] object-contain" : ""
        }`}
      />
    </button>
  );
}

/* ---------- Vista ampliada, con flechas para pasar de imagen ---------- */
function Lightbox({
  project,
  i,
  onMove,
  onClose,
}: {
  project: Project;
  i: number;
  onMove: (i: number) => void;
  onClose: () => void;
}) {
  const all = allImages(project);
  const n = all.length;
  const src = all[i];
  const [w, h] = dims(src);
  const arrow =
    "grid size-11 place-items-center rounded-full bg-paper/90 text-xl font-bold text-ink shadow-lg transition-colors hover:bg-orange hover:text-white";
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title}, imagen ${i + 1} de ${n}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[9000] flex items-center justify-center bg-[rgba(18,18,22,0.88)] p-4 md:p-10"
    >
      {isVideo(src) ? (
        <Video
          key={src}
          src={src}
          className="pop max-h-full w-auto max-w-full rounded-lg bg-ink shadow-2xl"
        />
      ) : (
        <Image
          key={src}
          src={asset(src)}
          alt={`${project.title}, imagen ${i + 1} de ${n}`}
          width={w}
          height={h}
          sizes="100vw"
          className="pop max-h-full w-auto max-w-full rounded-lg object-contain shadow-2xl"
        />
      )}
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar imagen"
        autoFocus
        className={`${arrow} absolute right-4 top-4`}
      >
        ×
      </button>
      {n > 1 && (
        <>
          <button
            type="button"
            onClick={() => onMove((i - 1 + n) % n)}
            aria-label="Imagen anterior"
            className={`${arrow} absolute left-3 top-1/2 -translate-y-1/2 md:left-6`}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => onMove((i + 1) % n)}
            aria-label="Imagen siguiente"
            className={`${arrow} absolute right-3 top-1/2 -translate-y-1/2 md:right-6`}
          >
            →
          </button>
          <p className="absolute bottom-4 left-0 right-0 text-center text-sm font-medium text-white/80">
            {i + 1} / {n}
          </p>
        </>
      )}
    </div>
  );
}

/* ---------- Galería: videos a lo ancho, imágenes en dos columnas, y partes con subtítulo ---------- */
function Gallery({
  project,
  pi,
  onZoom,
}: {
  project: Project;
  pi: number;
  onZoom: (z: { p: number; i: number }) => void;
}) {
  // Índices dentro de la lista completa; el 0 es la portada y ya se mostró arriba.
  const groups: { title?: string; idx: number[] }[] = [];
  let at = 0;
  for (const g of [{ images: project.images }, ...(project.sections ?? [])]) {
    const idx = g.images.map((_, k) => at + k).filter((i) => i > 0);
    at += g.images.length;
    if (idx.length) groups.push({ title: "title" in g ? g.title : undefined, idx });
  }
  const all = allImages(project);

  return (
    <>
      {groups.map((g, gi) => (
        <div key={gi} className="pb-3">
          {g.title && (
            <h4 className="mx-6 mb-4 mt-4 border-t border-ink/10 pt-6 font-display text-xl font-extrabold tracking-tight">
              {g.title}
            </h4>
          )}
          {g.idx
            .filter((i) => isVideo(all[i]))
            .map((i) => (
              <div key={i} className="px-6 pb-3">
                <Shot project={project} pi={pi} i={i} onZoom={onZoom} />
              </div>
            ))}
          <div
            className={`gap-3 px-6 [&>*]:mb-3 ${
              g.idx.filter((i) => !isVideo(all[i])).length > 1 ? "columns-2" : ""
            }`}
          >
            {g.idx
              .filter((i) => !isVideo(all[i]))
              .map((i) => (
                <Shot key={i} project={project} pi={pi} i={i} onZoom={onZoom} />
              ))}
          </div>
        </div>
      ))}
    </>
  );
}
