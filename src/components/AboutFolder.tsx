"use client";

import { useEffect, useState } from "react";
import type { FolderItem } from "@/data/portfolio";
import { asset } from "@/lib/asset";
import { FolderIcon } from "./FolderIcon";

// Carpeta de "Sobre mí". Si tiene foto, la foto asoma en la carpeta
// y al tocarla se abre grande encima de la página.
export function AboutFolder({ item }: { item: FolderItem }) {
  const [open, setOpen] = useState(false);
  const photo = item.image ? asset(item.image) : undefined;

  // Escape cierra la foto
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const text = (
    <span className="block">
      <span className="block font-medium">{item.title}</span>
      {item.place && <span className="text-sm text-muted">{item.place}</span>}
    </span>
  );

  if (!photo) {
    return (
      <div className="flex items-center gap-4">
        <FolderIcon className="w-16 shrink-0" />
        {text}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="about-folder group flex items-center gap-4 text-left"
      >
        <FolderIcon
          photo={photo}
          className="w-16 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:-rotate-3"
        />
        {text}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          className="fixed inset-0 z-[9000] flex items-center justify-center bg-[rgba(18,18,22,0.88)] p-4 md:p-10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt={item.title}
            className="pop max-h-full w-auto max-w-full rounded-lg object-contain shadow-2xl"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar imagen"
            autoFocus
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-paper/90 text-xl font-bold text-ink shadow-lg transition-colors hover:bg-orange hover:text-white"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
