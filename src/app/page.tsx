import Image from "next/image";
import type { CSSProperties } from "react";
import {
  education,
  languages,
  profile,
  projects,
  tools,
} from "@/data/portfolio";
import { CopyEmail } from "@/components/CopyEmail";
import { Desktop } from "@/components/Desktop";
import { Dock } from "@/components/Dock";
import { FolderIcon } from "@/components/FolderIcon";
import { MenuBar } from "@/components/MenuBar";

// Iconos de app para las herramientas: color de fondo y de texto de cada uno.
const appColors = [
  { bg: "var(--fuchsia)", fg: "#ffffff" },
  { bg: "var(--orange)", fg: "#ffffff" },
  { bg: "var(--pistachio)", fg: "var(--burgundy)" },
  { bg: "var(--burgundy)", fg: "var(--peony)" },
  { bg: "var(--peony)", fg: "var(--burgundy)" },
  { bg: "var(--fuchsia)", fg: "#ffffff" },
];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function Cursor({ label }: { label: string }) {
  return (
    <div aria-hidden className="float pointer-events-none absolute -right-2 top-full z-20 mt-1 hidden sm:block">
      <svg viewBox="0 0 24 24" className="size-7 drop-shadow" fill="#770523" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M4 3l7 17 2.4-7.2L21 10z" />
      </svg>
      <span className="ml-5 -mt-1 inline-block rounded-full bg-ink px-3 py-1 text-xs font-semibold text-peony">
        {label}
      </span>
    </div>
  );
}

export default function Home() {
  const nameLines = profile.name.split(" ");

  return (
    <>
      <MenuBar name={profile.name} />

      <main>
        {/* ---------------- Portada ---------------- */}
        <section
          id="inicio"
          className="relative overflow-hidden bg-desk pt-8"
        >
          <div className="mx-auto grid min-h-[92svh] w-full max-w-6xl items-end gap-4 px-6 pt-20 lg:grid-cols-12">
            <div className="relative z-10 pb-16 lg:col-span-8 lg:pb-28">
              <p
                className="rise mb-6 inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-1.5 text-sm shadow-sm"
                style={delay(0)}
              >
                <span aria-hidden className="size-2 rounded-full bg-[var(--orange)] ring-4 ring-[var(--orange)]/25" />
                {profile.availability}
              </p>

              <h1
                className="rise font-display text-[clamp(4rem,15vw,10.5rem)] font-extrabold leading-[0.85] tracking-[-0.045em] text-paper lg:-mr-40"
                style={delay(80)}
              >
                {nameLines.map((word) => (
                  <span key={word} className="block">
                    {word}
                  </span>
                ))}
              </h1>

              <p className="rise mt-6" style={delay(180)}>
                <span className="inline-block rounded-full bg-pistachio px-4 py-1.5 text-lg font-bold text-burgundy">
                  {profile.role}
                </span>
              </p>
              <p
                className="rise mt-4 max-w-md text-xl leading-snug text-paper"
                style={delay(240)}
              >
                {profile.headline}
              </p>

              <div className="rise mt-8 flex flex-wrap items-center gap-3" style={delay(320)}>
                <a
                  href="#proyectos"
                  className="relative rounded-full bg-ink px-6 py-3 font-semibold text-peony transition-colors hover:bg-orange hover:text-white"
                >
                  Abrir proyectos
                  <Cursor label={nameLines[0]} />
                </a>
                <a
                  href="#contacto"
                  className="rounded-full bg-paper px-6 py-3 font-semibold text-burgundy shadow-sm transition-colors hover:bg-pistachio"
                >
                  Escríbeme
                </a>
              </div>
            </div>

            <div className="rise relative mx-auto flex w-full max-w-sm items-end justify-center lg:col-span-4 lg:max-w-none" style={delay(200)}>
              {profile.cutout ? (
                <Image
                  src={profile.cutout}
                  alt={`Retrato de ${profile.name}`}
                  width={700}
                  height={900}
                  priority
                  className="relative z-0 h-auto w-full max-w-md object-contain"
                />
              ) : (
                <div
                  aria-hidden
                  className="hatch grid h-[22rem] w-64 place-items-end rounded-t-[999px] border border-b-0 border-ink/10 pb-8 sm:h-[30rem] sm:w-80"
                >
                  <span className="px-6 text-center text-xs uppercase tracking-widest text-sel/70">
                    Tu foto recortada
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ---------------- Sobre mí ---------------- */}
        <section id="sobre-mi" className="scroll-mt-10 bg-pistachio">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 py-24 sm:py-32 md:grid-cols-12">
            <div className="md:col-span-5">
              {profile.aboutPhoto ? (
                <Image
                  src={profile.aboutPhoto}
                  alt={`Foto de ${profile.name}`}
                  width={600}
                  height={800}
                  className="mx-auto h-auto w-full max-w-sm object-contain"
                />
              ) : (
                <div
                  aria-hidden
                  className="hatch mx-auto grid aspect-[3/4] w-full max-w-sm place-items-center rounded-[2rem] border border-ink/10"
                >
                  <span className="px-6 text-center text-xs uppercase tracking-widest text-sel/70">
                    Tu foto recortada
                  </span>
                </div>
              )}

              <ul
                aria-label="Herramientas"
                className="mx-auto mt-8 flex max-w-sm flex-wrap justify-center gap-2.5 rounded-[1.4rem] bg-surface p-3"
              >
                {tools.map((t, i) => (
                  <li
                    key={t}
                    title={t}
                    className="grid size-12 place-items-center rounded-[0.85rem] text-sm font-bold shadow-sm"
                    style={{
                      background: appColors[i % appColors.length].bg,
                      color: appColors[i % appColors.length].fg,
                    }}
                  >
                    <span aria-hidden>{t.slice(0, 2)}</span>
                    <span className="sr-only">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-7">
              <h2 className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl">
                <span className="selected">sobre mí</span>
              </h2>

              <div className="mt-10 space-y-5 text-lg leading-relaxed sm:text-xl">
                {profile.about.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>

              <h3 className="mt-12 text-sm font-bold">Educación</h3>
              <ul className="mt-4 space-y-4">
                {education.map((e) => (
                  <li key={e.title} className="flex items-center gap-4">
                    <FolderIcon className="w-11 shrink-0" />
                    <p>
                      <span className="block font-medium">{e.title}</span>
                      <span className="text-sm text-muted">{e.place}</span>
                    </p>
                  </li>
                ))}
              </ul>

              <h3 className="mt-12 text-sm font-bold">Idiomas</h3>
              <ul className="mt-4 flex flex-wrap gap-3">
                {languages.map((l) => (
                  <li
                    key={l}
                    className="rounded-[1.1rem] rounded-br-md bg-sel px-4 py-2 text-sm font-medium text-white"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------- Proyectos ---------------- */}
        <section
          id="proyectos"
          className="mx-auto w-full max-w-6xl scroll-mt-10 px-6 py-24 sm:py-32"
        >
          <h2 className="mb-4 font-display text-5xl font-extrabold tracking-tight sm:text-7xl">
            <span className="selected">proyectos</span>
          </h2>
          <p className="mb-10 mt-6 max-w-md text-lg text-muted">
            Cada carpeta es un proyecto. Ábrela para ver de qué trata.
          </p>
          <Desktop projects={projects} />
        </section>

        {/* ---------------- Contacto ---------------- */}
        <section id="contacto" className="band-peony scroll-mt-10 bg-peony">
          {/* el espacio inferior evita que el dock tape el final */}
          <div className="mx-auto w-full max-w-6xl px-6 pb-40 pt-24 text-center">
          <h2 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-8xl">
            <span className="selected">hablemos</span>
            <br />
            <span className="selected mt-5">de tu proyecto</span>
          </h2>
          <p className="mx-auto mt-10 max-w-md text-lg text-muted">
            Cuéntame qué necesitas y vemos cómo ayudarte.
          </p>

          <p className="mt-8 break-words font-display text-2xl font-bold sm:text-3xl">
            <a
              href={`mailto:${profile.email}`}
              className="underline decoration-sel decoration-4 underline-offset-8 transition-colors hover:text-sel"
            >
              {profile.email}
            </a>
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CopyEmail email={profile.email} />
            {profile.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-ink/20 px-5 py-3 font-medium transition-colors hover:border-sel hover:text-sel"
              >
                {l.label} ↗
              </a>
            ))}
          </div>

          <p className="mt-20 text-sm text-muted">© 2026 {profile.name}</p>
          </div>
        </section>
      </main>

      <Dock />
    </>
  );
}
