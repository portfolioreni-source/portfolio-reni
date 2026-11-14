"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { Tool, ToolLevel } from "@/data/portfolio";
import { ToolIcon } from "./ToolIcon";

// Cuántas barras se llenan en cada nivel (de 3)
const levels: Record<ToolLevel, { label: string; bars: number }> = {
  avanzado: { label: "Avanzado", bars: 3 },
  intermedio: { label: "Intermedio", bars: 2 },
};

// Grilla de herramientas. Cada icono muestra una burbuja con su nivel:
// - con mouse, al pasar por encima (o al enfocarlo con el teclado);
// - en el celular, al tocarlo. Tocar otro icono o cualquier otro lugar la cierra.
export function ToolList({ tools }: { tools: Tool[] }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest("[data-tool]")) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function toggle(i: number) {
    // Con mouse la burbuja ya sale al pasar por encima: no hace falta el clic.
    if (window.matchMedia("(hover: hover)").matches) return;
    setOpen((cur) => (cur === i ? null : i));
  }

  return (
    <ul
      aria-label="Herramientas"
      className="mx-auto mt-8 grid max-w-sm grid-cols-4 gap-x-2 gap-y-4 rounded-[1.4rem] bg-surface px-3 py-4"
    >
      {tools.map((t, i) => {
        const level = levels[t.level];
        return (
          <li
            key={t.name}
            data-tool=""
            data-open={open === i}
            data-reveal=""
            data-reveal-type="pop"
            className="group relative flex justify-center data-[open=true]:z-20 hover:z-20"
            style={{ "--rd": `${250 + i * 80}ms` } as CSSProperties}
          >
            <button
              type="button"
              aria-label={`${t.name}, nivel ${level.label.toLowerCase()}`}
              onClick={() => toggle(i)}
              className="flex flex-col items-center gap-1.5 rounded-xl outline-none transition-transform duration-200 group-hover:-translate-y-1 group-data-[open=true]:-translate-y-1 focus-visible:ring-2 focus-visible:ring-fuchsia focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <ToolIcon name={t.name} className="size-12" />
              <span className="text-center text-[0.68rem] leading-tight text-ink/80">
                {t.name === "Visual Studio Code" ? "VS Code" : t.name}
              </span>
            </button>

            {/* Burbuja con el nivel */}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-full left-1/2 mb-2 flex -translate-x-1/2 translate-y-1 flex-col items-center gap-1.5 rounded-xl bg-burgundy px-3 py-2 text-peony opacity-0 shadow-lg transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-y-0 group-has-[:focus-visible]:opacity-100 group-data-[open=true]:translate-y-0 group-data-[open=true]:opacity-100"
            >
              <span className="text-xs font-bold leading-none">{level.label}</span>
              <span className="flex gap-1">
                {[0, 1, 2].map((n) => (
                  <span
                    key={n}
                    className={`h-1.5 w-5 rounded-full ${
                      n < level.bars ? "bg-pistachio" : "bg-peony/25"
                    }`}
                  />
                ))}
              </span>
              <span className="absolute -bottom-1 size-2 rotate-45 bg-burgundy" />
            </span>
          </li>
        );
      })}
    </ul>
  );
}
