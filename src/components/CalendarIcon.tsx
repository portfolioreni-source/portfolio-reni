"use client";

import { useSyncExternalStore, type ReactNode } from "react";

// Icono de calendario que muestra el día de la semana y el número de hoy,
// como el de Mac. La fecha se lee en el navegador de cada persona, así que
// siempre es la suya. En el servidor (y un instante al cargar) se muestra el
// icono de reserva que llega como "children".
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60000);
  return () => clearInterval(id);
}

function getSnapshot() {
  const d = new Date();
  const weekday = new Intl.DateTimeFormat("es", { weekday: "short" })
    .format(d)
    .replace(".", "");
  const label = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  return `${label}|${d.getDate()}`;
}

function getServerSnapshot() {
  return "";
}

export function CalendarIcon({ children }: { children: ReactNode }) {
  const today = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!today) return <>{children}</>;

  const [weekday, day] = today.split("|");
  return (
    <span aria-hidden className="flex flex-col items-center leading-none">
      <span className="text-[0.62rem] font-bold text-orange">{weekday}</span>
      <span className="mt-0.5 font-display text-[1.55rem] font-medium text-burgundy">
        {day}
      </span>
    </span>
  );
}
