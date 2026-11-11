// Edita SOLO este archivo para cambiar el contenido de tu portfolio.

export const profile = {
  name: "Tu Nombre",
  role: "Diseñadora y desarrolladora web",
  intro:
    "Creo experiencias web claras y cuidadas. Aquí tienes una selección de mis proyectos y cómo contactarme.",
  about:
    "Escribe aquí un párrafo sobre ti: qué haces, qué te apasiona y qué tipo de proyectos buscas. Mantenlo corto y en tu propia voz.",
  email: "tu-mail@ejemplo.com",
  links: [
    { label: "GitHub", href: "https://github.com/tu-usuario" },
    { label: "LinkedIn", href: "https://linkedin.com/in/tu-usuario" },
  ],
};

export const skills = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Figma"];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string; // enlace a la web en vivo
  repo?: string; // enlace al código
};

export const projects: Project[] = [
  {
    title: "Proyecto uno",
    description:
      "Describe en una o dos frases qué problema resuelve y cuál fue tu papel.",
    tags: ["Next.js", "TypeScript"],
    href: "https://ejemplo.com",
    repo: "https://github.com/tu-usuario/proyecto-uno",
  },
  {
    title: "Proyecto dos",
    description:
      "Otra descripción breve. Destaca el resultado, no solo las tecnologías.",
    tags: ["React", "Tailwind"],
    repo: "https://github.com/tu-usuario/proyecto-dos",
  },
  {
    title: "Proyecto tres",
    description: "Un tercer proyecto para completar la cuadrícula.",
    tags: ["Diseño", "Figma"],
    href: "https://ejemplo.com",
  },
];
