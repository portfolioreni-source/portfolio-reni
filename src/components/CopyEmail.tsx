"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "ok" | "error">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("ok");
    } catch {
      setState("error");
    }
    setTimeout(() => setState("idle"), 2200);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full border border-ink/20 bg-paper px-5 py-3 font-medium transition-colors hover:border-sel hover:text-sel"
    >
      <span aria-live="polite">
        {state === "ok"
          ? "Mail copiado"
          : state === "error"
            ? "No se pudo copiar"
            : "Copiar mail"}
      </span>
    </button>
  );
}
