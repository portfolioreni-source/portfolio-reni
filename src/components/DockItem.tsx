"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";

// Enlace del dock. Al tocarlo (o pulsarlo) el icono se levanta y crece un
// momento, con su etiqueta encima, para que en el móvil —donde no existe
// "pasar el cursor"— se sienta igual de vivo que en el ordenador.
export function DockItem({
  href,
  label,
  external = false,
  className,
  style,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  className: string;
  style: CSSProperties;
  children: ReactNode;
}) {
  const [lift, setLift] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function press() {
    clearTimeout(timer.current);
    setLift(true);
  }

  // Se queda levantado un instante tras soltar, para que se vea aunque el toque sea rápido
  function release() {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setLift(false), 450);
  }

  return (
    <a
      // Sin dirección (por ejemplo WhatsApp todavía sin número): se ve pero no lleva a ningún lado
      href={href || undefined}
      aria-label={external && href ? `${label} (se abre en otra pestaña)` : label}
      target={external && href ? "_blank" : undefined}
      rel={external && href ? "noreferrer" : undefined}
      className={className}
      style={style}
      data-lift={lift}
      onPointerDown={press}
      onPointerUp={release}
      onPointerCancel={release}
      onClick={() => {
        // También cubre el teclado (Enter)
        press();
        release();
      }}
    >
      {children}
    </a>
  );
}
