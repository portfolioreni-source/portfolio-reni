"use client";

import { useSyncExternalStore } from "react";

// Reloj de la barra de menú. En el servidor devuelve "" para no desajustar el HTML.
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15000);
  return () => clearInterval(id);
}
function getSnapshot() {
  return new Intl.DateTimeFormat("es", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}
function getServerSnapshot() {
  return "";
}

export function MenuBar({ name }: { name: string }) {
  const clock = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div className="fixed inset-x-0 top-0 z-40 flex h-8 items-center justify-between border-b border-ink/10 bg-paper/70 px-4 text-[0.8rem] backdrop-blur-md">
      <nav aria-label="Barra de menú" className="flex items-center gap-5">
        <a href="#inicio" className="font-bold">
          {name}
        </a>
        <a href="#proyectos" className="hidden text-muted hover:text-ink sm:inline">
          Proyectos
        </a>
        <a href="#sobre-mi" className="hidden text-muted hover:text-ink sm:inline">
          Sobre mí
        </a>
        <a href="#contacto" className="hidden text-muted hover:text-ink sm:inline">
          Contacto
        </a>
      </nav>
      <span className="tabular-nums text-muted" suppressHydrationWarning>
        {clock}
      </span>
    </div>
  );
}
