import Image from "next/image";
import { asset } from "@/lib/asset";
import type { CSSProperties } from "react";
import {
  awards,
  education,
  languages,
  marquee,
  method,
  profile,
  projects,
  services,
  tools,
} from "@/data/portfolio";
import { CopyEmail } from "@/components/CopyEmail";
import { Desktop } from "@/components/Desktop";
import { Dock } from "@/components/Dock";
import { FolderIcon } from "@/components/FolderIcon";
import { MenuBar } from "@/components/MenuBar";
import { Method } from "@/components/Method";
import { ScrollEffects } from "@/components/ScrollEffects";
import { Skills } from "@/components/Skills";
import { ToolList } from "@/components/ToolList";

// Retraso de la animación de entrada de la portada
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
// Retraso de la aparición al hacer scroll (para que los elementos entren uno tras otro)
const stagger = (ms: number) => ({ "--rd": `${ms}ms` }) as CSSProperties;

// Palabras de la cinta que se mueve entre la portada y "Sobre mí".
// Se repiten dos veces para que la cinta nunca deje huecos, ni en pantallas muy anchas.
const marqueeWords = [...marquee, ...marquee];

export default function Home() {
  const nameLines = profile.name.split(" ");

  return (
    <>
      <ScrollEffects />
      <MenuBar name={profile.name} />
      {/* Barra de progreso de lectura, pegada bajo la barra de menú */}
      <div
        aria-hidden
        className="scroll-progress fixed inset-x-0 top-8 z-40 h-1 bg-burgundy"
      />

      <main>
        {/* ---------------- Portada ---------------- */}
        <section
          id="inicio"
          className="relative overflow-hidden bg-desk pt-8"
        >
          <div className="mx-auto grid min-h-[92svh] w-full max-w-6xl items-end gap-4 px-6 pt-20 lg:grid-cols-12">
            <div
              // En el celular el texto queda quieto y la foto sube poco, para que
              // no se pegue a los botones; en pantallas anchas se mueven más.
              className="parallax relative z-10 pb-16 [--ps:0] lg:col-span-8 lg:pb-28 lg:[--ps:0.07]"
            >
              <p
                className="rise mb-6 inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-1.5 text-sm shadow-sm"
                style={delay(0)}
              >
                <span aria-hidden className="status-dot size-2 rounded-full" />
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
                <span className="inline-block rounded-3xl bg-pistachio px-4 py-1.5 text-lg font-bold leading-snug text-burgundy sm:rounded-full">
                  {profile.role}
                </span>
              </p>
              <p
                className="rise mt-4 max-w-xl text-xl leading-snug text-paper"
                style={delay(240)}
              >
                {profile.headline}
              </p>

              <div className="rise mt-8 flex flex-wrap items-center gap-3" style={delay(320)}>
                <a
                  href="#proyectos"
                  className="relative rounded-full bg-ink px-6 py-3 font-semibold text-peony transition-colors hover:bg-orange hover:text-white"
                >
                  Ver proyectos
                </a>
                <a
                  href="#contacto"
                  className="rounded-full bg-paper px-6 py-3 font-semibold text-burgundy shadow-sm transition-colors hover:bg-pistachio"
                >
                  Escribime
                </a>
              </div>
            </div>

            <div
              className="parallax relative mx-auto flex w-full max-w-sm items-end justify-center [--ps:-0.06] lg:col-span-4 lg:max-w-none lg:[--ps:-0.08]"
            >
              <div
                className="rise flex w-full items-end justify-center pb-16 lg:pb-24"
                style={delay(200)}
              >
                {profile.photo ? (
                  <div className="relative h-[24rem] w-72 overflow-hidden rounded-b-[2rem] rounded-t-[999px] border-[5px] border-paper shadow-[0_30px_60px_-25px_rgba(121,0,46,0.55)] sm:h-[32rem] sm:w-80 lg:h-[36rem] lg:w-[24rem]">
                    <Image
                      src={asset(profile.photo)}
                      alt={`Retrato de ${profile.name}`}
                      fill
                      priority
                      sizes="(min-width: 1024px) 384px, 320px"
                      className="object-cover object-[50%_35%]"
                    />
                  </div>
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
          </div>
        </section>

        {/* Cinta en movimiento (decorativa) */}
        <div aria-hidden className="marquee">
          <div className="marquee-track font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {marqueeWords.map((w, i) => (
                  <span key={i} className="flex items-center">
                    <span className="px-6 py-4">{w}</span>
                    <span className="text-fuchsia">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- Sobre mí ---------------- */}
        <section id="sobre-mi" className="scroll-mt-10 bg-pistachio">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 py-24 sm:py-32 md:grid-cols-12">
            <div
              className="md:col-span-5"
              data-reveal=""
              data-reveal-type="left"
            >
              {profile.aboutPhoto ? (
                <Image
                  src={asset(profile.aboutPhoto)}
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

              <ToolList tools={tools} />
            </div>

            <div className="md:col-span-7">
              <h2
                className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl"
                data-reveal=""
              >
                <span className="selected">sobre mí</span>
              </h2>

              <div
                className="mt-10 space-y-5 text-lg leading-relaxed sm:text-xl"
                data-reveal=""
                style={stagger(150)}
              >
                {profile.about.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>

              {[
                { heading: "Educación", items: education },
                { heading: "Reconocimientos", items: awards },
              ].map((group) => (
                <div key={group.heading}>
                  <h3 className="mt-12 text-sm font-bold" data-reveal="">
                    {group.heading}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {group.items.map((e, i) => (
                      <li
                        key={e.title}
                        data-reveal=""
                        style={stagger(i * 120)}
                        className="flex items-center gap-4"
                      >
                        <FolderIcon className="w-11 shrink-0" />
                        <p>
                          <span className="block font-medium">{e.title}</span>
                          {e.place && (
                            <span className="text-sm text-muted">{e.place}</span>
                          )}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <h3 className="mt-12 text-sm font-bold" data-reveal="">
                Idiomas
              </h3>
              <ul className="mt-4 flex flex-wrap gap-3">
                {languages.map((l, i) => (
                  <li
                    key={l}
                    data-reveal=""
                    data-reveal-type="pop"
                    style={stagger(i * 120)}
                    className="rounded-[1.1rem] rounded-br-md bg-sel px-4 py-2 text-sm font-medium text-white"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------- Habilidades ---------------- */}
        <section
          id="habilidades"
          className="mx-auto w-full max-w-6xl scroll-mt-10 px-6 py-24 sm:py-32"
        >
          <h2
            className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl"
            data-reveal=""
          >
            <span className="selected">habilidades</span>
          </h2>
          <p
            className="mt-8 max-w-md text-lg text-muted"
            data-reveal=""
            style={stagger(120)}
          >
            Lo que puedo hacer por tu proyecto.
          </p>
          <Skills services={services} />
        </section>

        {/* ---------------- Método de trabajo ---------------- */}
        <section id="metodo" className="band-peony scroll-mt-10 bg-peony">
          <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
            <h2
              className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl"
              data-reveal=""
            >
              <span className="selected">mi método</span>
            </h2>
            <p
              className="mb-12 mt-8 max-w-xl text-lg text-muted"
              data-reveal=""
              style={stagger(120)}
            >
              <span className="block text-xl font-semibold leading-snug text-ink sm:text-2xl">
                Cada día de la semana es un paso.{" "}
                <span className="whitespace-nowrap underline decoration-fuchsia decoration-[3px] underline-offset-[6px]">
                  Tocá cada uno
                </span>{" "}
                para conocer más sobre esa etapa.
              </span>
              <span className="mt-4 block text-base">
                Es una representación: la duración de cada proyecto y de cada
                etapa se define a medida, según lo que el proyecto necesite.
              </span>
            </p>
            <Method steps={method} />
          </div>
        </section>

        {/* ---------------- Proyectos ---------------- */}
        <section
          id="proyectos"
          className="mx-auto w-full max-w-6xl scroll-mt-10 px-6 py-24 sm:py-32"
        >
          <h2
            className="mb-4 font-display text-5xl font-extrabold tracking-tight sm:text-7xl"
            data-reveal=""
          >
            <span className="selected">proyectos</span>
          </h2>
          <p
            className="mb-10 mt-6 max-w-md text-lg text-muted"
            data-reveal=""
            style={stagger(120)}
          >
            Cada carpeta es un proyecto. Abrila para ver de qué trata.
          </p>
          <Desktop projects={projects} />
        </section>

        {/* ---------------- Contacto ---------------- */}
        <section id="contacto" className="band-peony scroll-mt-10 bg-peony">
          {/* el espacio inferior evita que el dock tape el final */}
          <div className="mx-auto w-full max-w-6xl px-6 pb-40 pt-24 text-center">
            <h2
              className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-8xl"
              data-reveal=""
            >
              <span className="selected">hablemos</span>
              <br />
              <span className="selected mt-5">de tu proyecto</span>
            </h2>
            <p
              className="mx-auto mt-10 max-w-md text-lg text-muted"
              data-reveal=""
              style={stagger(150)}
            >
              Contame qué necesitás y vemos cómo ayudarte.
            </p>

            <p
              className="mt-8 break-words font-display text-2xl font-bold sm:text-3xl"
              data-reveal=""
              style={stagger(250)}
            >
              <a
                href={`mailto:${profile.email}`}
                className="underline decoration-sel decoration-4 underline-offset-8 transition-colors hover:text-sel"
              >
                {profile.email}
              </a>
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <div data-reveal="" data-reveal-type="pop" style={stagger(350)}>
                <CopyEmail email={profile.email} />
              </div>
              {profile.links.map((l, i) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  data-reveal=""
                  data-reveal-type="pop"
                  style={stagger(430 + i * 80)}
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
