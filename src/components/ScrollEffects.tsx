"use client";

import { useEffect } from "react";

// Movimiento al hacer scroll. Hace tres cosas:
//  1. Los elementos con data-reveal aparecen (suben, se agrandan o entran desde
//     un lado) cuando llegan a la pantalla. Lo que ya se ve al cargar no se oculta.
//  2. Guarda cuánto has bajado en --sy, para el efecto parallax de la portada.
//  3. Guarda el avance de la página en --progress, para la barra de arriba.
// Si la persona tiene activado "reducir movimiento", no hace nada y todo se ve quieto.
export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;

    // 1) Aparición al entrar en pantalla
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "in";
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        // Ya está a la vista (o por encima): se muestra
        el.dataset.reveal = "in";
      } else {
        el.dataset.reveal = "hidden";
        io.observe(el);
      }
    });

    // 2 y 3) Posición del scroll, una vez por fotograma
    let queued = false;
    const update = () => {
      queued = false;
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--sy", String(Math.min(y, window.innerHeight * 1.2)));
      root.style.setProperty("--progress", String(max > 0 ? Math.min(1, y / max) : 0));
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
