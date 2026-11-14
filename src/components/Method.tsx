"use client";

import { useState, type CSSProperties } from "react";
import type { MethodStep } from "@/data/portfolio";

// Cada día aparece un poco después del anterior cuando el calendario llega a pantalla
const popDelay = (i: number) => ({ "--rd": `${300 + i * 90}ms` }) as CSSProperties;

const dayShort = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];
const dayLong = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];
// Color de cada paso (se repite si hay más pasos que colores)
const stepColors = [
  "var(--fuchsia)",
  "var(--orange)",
  "var(--pistachio)",
  "var(--burgundy)",
  "var(--peony)",
];

export function Method({ steps }: { steps: MethodStep[] }) {
  const days = steps.slice(0, 7);
  const [sel, setSel] = useState(0);
  const last = days.length - 1;
  const step = days[sel];
  const color = stepColors[sel % stepColors.length];

  const go = (i: number) => setSel(Math.min(last, Math.max(0, i)));

  const navBtn =
    "grid h-9 min-w-9 place-items-center rounded-full bg-surface px-3 text-sm font-semibold text-burgundy transition-colors hover:bg-peony disabled:opacity-40 disabled:hover:bg-surface";

  return (
    <div
      data-reveal=""
      className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-paper shadow-[0_30px_70px_-30px_rgba(121,0,46,0.45)]"
    >
      {/* Barra superior, como la de la app Calendario */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 px-5 py-4">
        <div className="flex items-center gap-4">
          <div aria-hidden className="flex gap-2">
            <span className="size-3 rounded-full bg-fuchsia" />
            <span className="size-3 rounded-full bg-orange" />
            <span className="size-3 rounded-full bg-pistachio" />
          </div>
          <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Mi método de trabajo
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={navBtn}
            onClick={() => go(sel - 1)}
            disabled={sel === 0}
            aria-label="Paso anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className={navBtn}
            onClick={() => go(0)}
            disabled={sel === 0}
          >
            Inicio
          </button>
          <button
            type="button"
            className={navBtn}
            onClick={() => go(sel + 1)}
            disabled={sel === last}
            aria-label="Paso siguiente"
          >
            ›
          </button>
        </div>
      </div>

      {/* Nombres de los días (solo en pantallas anchas) */}
      <div
        aria-hidden
        className="hidden grid-cols-7 border-b border-ink/10 py-2 text-center text-sm md:grid"
      >
        {dayShort.map((d, i) => (
          <span key={d} className={i >= 5 ? "text-muted/70" : ""}>
            {d}
          </span>
        ))}
      </div>

      {/* Los siete días: cada día con paso es un botón */}
      <div className="grid divide-y divide-ink/10 md:grid-cols-7 md:divide-x md:divide-y-0">
        {dayShort.map((short, i) => {
          const s = days[i];
          if (!s) {
            return (
              <div
                key={short}
                data-reveal=""
                data-reveal-type="pop"
                style={popDelay(i)}
                className="flex min-h-16 items-center gap-3 bg-ink/5 p-3 text-muted md:min-h-44 md:flex-col md:items-stretch md:gap-0"
              >
                <span className="w-16 text-sm md:hidden">{short}</span>
                <span className="order-last grid size-8 shrink-0 place-items-center text-base md:order-none md:self-end">
                  {i + 1}
                </span>
                <span className="flex-1 text-sm md:mt-2 md:flex-none">
                  {i === 5 ? "Disfrutar el resultado" : "Ver crecer tu proyecto"}
                </span>
              </div>
            );
          }
          const c = stepColors[i % stepColors.length];
          const active = sel === i;
          return (
            <button
              key={short}
              type="button"
              aria-pressed={active}
              data-reveal=""
              data-reveal-type="pop"
              style={popDelay(i)}
              onClick={() => setSel(i)}
              className={`flex min-h-20 items-center gap-3 p-3 text-left transition-colors md:min-h-44 md:flex-col md:items-stretch md:gap-0 ${
                active ? "bg-surface" : "hover:bg-surface/60"
              }`}
            >
              <span className="flex w-16 items-center md:hidden">
                <span className="text-sm text-muted">{short}</span>
              </span>
              <span className="order-last grid size-8 shrink-0 place-items-center md:order-none md:self-end">
                <span
                  className={`grid size-8 place-items-center rounded-full text-base font-medium ${
                    active ? "bg-sel text-white" : "text-muted"
                  }`}
                >
                  {i + 1}
                </span>
              </span>
              <span
                className="block flex-1 rounded-md border-l-4 px-2 py-1.5 text-sm font-semibold leading-tight text-burgundy md:mt-2 md:flex-none"
                style={{
                  borderColor: c,
                  background: `color-mix(in srgb, ${c} 22%, white)`,
                }}
              >
                {s.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detalle del paso elegido, como el cuadro de un evento */}
      <div
        aria-live="polite"
        className="grid gap-6 border-t border-ink/10 bg-surface/50 p-6 md:grid-cols-12 md:p-8"
      >
        <div className="md:col-span-7">
          <p className="flex items-center gap-3 text-sm font-semibold text-muted">
            <span
              aria-hidden
              className="h-5 w-1.5 rounded-full"
              style={{ background: color }}
            />
            Paso {sel + 1} · {dayLong[sel]}
          </p>
          <h4 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span
              className="box-decoration-clone px-1"
              style={{
                backgroundImage: `linear-gradient(transparent 55%, color-mix(in srgb, ${color} ${color.includes("burgundy") ? 25 : 55}%, transparent) 55%)`,
              }}
            >
              {step.title}
            </span>
          </h4>
          <p className="mt-3 max-w-md text-pretty text-lg leading-relaxed text-muted">
            {step.summary}
          </p>
        </div>
        <div className="self-start rounded-2xl border border-ink/10 bg-paper p-5 md:col-span-5">
          <p className="text-pretty text-lg">{step.deliverable}</p>
        </div>
      </div>
    </div>
  );
}
