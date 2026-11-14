"use client";

import { useEffect } from "react";

// Movimiento al hacer scroll. Hace cuatro cosas:
//  1. Los elementos con data-reveal aparecen (suben, se agrandan o entran desde
//     un lado) cada vez que llegan a la pantalla, tanto al bajar como al subir.
//     Cuando salen del todo, vuelven a quedar listos para la próxima vez.
//  2. Guarda la dirección del scroll en --dir (1 = bajando, -1 = subiendo), para
//     que al subir los elementos entren desde arriba.
//  3. Guarda cuánto has bajado en --sy (parallax de la portada) y el avance de
//     la página en --progress (barra de arriba).
//  4. La portada vuelve a animarse cuando regresas a ella.
// Si la persona tiene activado "reducir movimiento", no hace nada y todo se ve quieto.
export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;

    // 1) Aparición cada vez que entra en pantalla
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.12) {
            if (el.dataset.reveal !== "in") el.dataset.reveal = "in";
          } else if (!entry.isIntersecting) {
            // Solo se "reinicia" cuando ya no se ve nada de él
            if (el.dataset.reveal !== "hidden") el.dataset.reveal = "hidden";
          }
        }
      },
      { threshold: [0, 0.12], rootMargin: "0px 0px -6% 0px" },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      // Lo que ya se ve al cargar se muestra; lo demás espera a llegar
      el.dataset.reveal =
        el.getBoundingClientRect().top < window.innerHeight * 0.92 ? "in" : "hidden";
      reveal.observe(el);
    });

    // 4) La portada se reinicia al salir y se anima de nuevo al volver
    const hero = document.getElementById("inicio");
    const heroObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) hero?.classList.add("rise-reset");
          else if (entry.intersectionRatio >= 0.25) hero?.classList.remove("rise-reset");
        }
      },
      { threshold: [0, 0.25] },
    );
    if (hero) heroObserver.observe(hero);

    // 2 y 3) Posición y dirección del scroll, una vez por fotograma
    let lastY = window.scrollY;
    let queued = false;
    const update = () => {
      queued = false;
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;
      if (Math.abs(y - lastY) > 2) {
        root.style.setProperty("--dir", y > lastY ? "1" : "-1");
        lastY = y;
      }
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
      reveal.disconnect();
      heroObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
