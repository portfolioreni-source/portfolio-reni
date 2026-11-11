import { profile, projects, skills } from "@/data/portfolio";

const linkClass =
  "underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default function Home() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-8">
        <a href="#" className="font-medium tracking-tight">
          {profile.name}
        </a>
        <nav aria-label="Principal" className="flex gap-6 text-sm text-muted">
          <a href="#proyectos" className="hover:text-foreground">
            Proyectos
          </a>
          <a href="#sobre-mi" className="hover:text-foreground">
            Sobre mí
          </a>
          <a href="#contacto" className="hover:text-foreground">
            Contacto
          </a>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6">
        <section className="py-20 sm:py-28">
          <p className="mb-4 font-mono text-sm text-accent">{profile.role}</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Hola, soy {profile.name}.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{profile.intro}</p>
        </section>

        <section id="proyectos" className="scroll-mt-8 border-t border-line py-16">
          <h2 className="mb-10 font-mono text-sm uppercase tracking-widest text-muted">
            Proyectos
          </h2>
          <ul className="grid gap-10">
            {projects.map((p) => (
              <li key={p.title}>
                <h3 className="text-xl font-medium">{p.title}</h3>
                <p className="mt-2 text-muted">{p.description}</p>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tecnologías">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                {(p.href || p.repo) && (
                  <p className="mt-4 flex gap-5 text-sm">
                    {p.href && (
                      <a href={p.href} target="_blank" rel="noreferrer" className={linkClass}>
                        Ver web
                      </a>
                    )}
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noreferrer" className={linkClass}>
                        Código
                      </a>
                    )}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section id="sobre-mi" className="scroll-mt-8 border-t border-line py-16">
          <h2 className="mb-6 font-mono text-sm uppercase tracking-widest text-muted">
            Sobre mí
          </h2>
          <p className="max-w-xl text-lg">{profile.about}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Habilidades">
            {skills.map((s) => (
              <li
                key={s}
                className="rounded-full border border-line px-3 py-1 font-mono text-xs"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section id="contacto" className="scroll-mt-8 border-t border-line py-16">
          <h2 className="mb-6 font-mono text-sm uppercase tracking-widest text-muted">
            Contacto
          </h2>
          <p className="text-2xl font-medium sm:text-3xl">
            <a href={`mailto:${profile.email}`} className={linkClass}>
              {profile.email}
            </a>
          </p>
          <p className="mt-6 flex gap-5 text-sm">
            {profile.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className={linkClass}>
                {l.label}
              </a>
            ))}
          </p>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-3xl px-6 py-10 text-sm text-muted">
        © 2026 {profile.name}
      </footer>
    </>
  );
}
