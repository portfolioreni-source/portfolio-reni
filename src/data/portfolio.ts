// Edita SOLO este archivo para cambiar el contenido de tu portfolio.
//
// Imágenes: guárdalas en la carpeta /public y escríbelas aquí con "/" delante,
// por ejemplo "/projects/uno.jpg". Para las fotos tuyas, lo ideal es un PNG
// recortado (sin fondo). Si dejas una ruta vacía, se muestra un espacio de borrador.

export const profile = {
  name: "Tu Nombre",
  role: "Diseño de producto digital",
  headline:
    "Diseño productos digitales claros, desde la primera idea hasta la pantalla final.",
  availability: "Disponible para nuevos proyectos",
  cutout: "", // foto recortada para la portada, por ejemplo "/yo-portada.png"
  aboutPhoto: "", // foto recortada para "Sobre mí", por ejemplo "/yo-sobre-mi.png"
  about: [
    "Escribe aquí un párrafo sobre ti: qué haces, cómo trabajas y qué tipo de proyectos buscas.",
    "Un segundo párrafo, opcional, con algo más personal: qué te inspira o qué te gusta hacer fuera del trabajo.",
  ],
  email: "tu-mail@ejemplo.com",
  // Redes y contacto. Los nombres "LinkedIn", "Instagram" y "WhatsApp" eligen el
  // icono del dock, así que no los cambies; solo cambia las direcciones.
  // WhatsApp: "https://wa.me/" + código de país + número, todo junto y sin + ni espacios.
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/tu-usuario" },
    { label: "Instagram", href: "https://instagram.com/tu-usuario" },
    { label: "WhatsApp", href: "https://wa.me/00000000000" },
  ],
};

export const education = [
  { title: "Tu título o formación", place: "Universidad o escuela, ciudad" },
  { title: "Un curso o diplomado", place: "Institución, ciudad" },
];

export const languages = ["Español · nativo", "Inglés · intermedio"];

export const tools = ["Figma", "Next.js", "React", "TypeScript", "Tailwind", "Notion"];

// Habilidades que ofreces (se muestran como tarjetas). Puedes poner las que quieras.
export type Service = { title: string; description: string };

export const services: Service[] = [
  {
    title: "Diseño de interfaces",
    description: "Pantallas claras y coherentes, pensadas para quien las usa.",
  },
  {
    title: "Prototipado",
    description: "Prototipos navegables para probar ideas antes de construirlas.",
  },
  {
    title: "Desarrollo web",
    description: "Webs rápidas y accesibles, publicadas y listas para usar.",
  },
  {
    title: "Identidad visual",
    description: "Color, tipografía y estilo para que tu marca se reconozca.",
  },
];

// Método de trabajo: cada paso ocupa un día del calendario, de lunes a domingo.
// Con 5 pasos quedan lunes a viernes y el fin de semana se muestra como descanso.
// Admite hasta 7 pasos. (Los de abajo son de ejemplo: cámbialos por los tuyos.)
export type MethodStep = {
  title: string; // nombre corto del paso
  summary: string; // qué pasa en este paso
  deliverable: string; // qué recibe la persona al terminar el paso
};

export const method: MethodStep[] = [
  {
    title: "Escuchar",
    summary:
      "Empezamos con una conversación para entender qué necesitas, para quién es y qué tiene que lograr.",
    deliverable: "Un resumen de objetivos y alcance.",
  },
  {
    title: "Definir",
    summary:
      "Ordeno las ideas: a quién te diriges, qué contenidos hacen falta y qué va primero.",
    deliverable: "Un mapa de la web y una lista de prioridades.",
  },
  {
    title: "Diseñar",
    summary:
      "Creo las pantallas con tu identidad: color, tipografía y los componentes que se repiten.",
    deliverable: "El diseño completo en Figma.",
  },
  {
    title: "Probar",
    summary:
      "Revisamos juntos un prototipo navegable y ajusto lo que haga falta antes de construir.",
    deliverable: "Un prototipo y la lista de cambios.",
  },
  {
    title: "Entregar",
    summary:
      "Preparo los archivos finales, publico todo y te explico cómo usarlo.",
    deliverable: "La web publicada y una guía de uso.",
  },
];

// Colores disponibles para las etiquetas de cada proyecto.
export type ProjectColor = "peony" | "pistachio" | "burgundy" | "fuchsia";

export type Project = {
  title: string;
  year: string;
  role: string;
  summary: string;
  tags: string[];
  color: ProjectColor; // color de la etiqueta de la carpeta
  image?: string; // por ejemplo "/projects/uno.jpg"
  href?: string; // enlace a la web en vivo
  repo?: string; // enlace al código
};

export const projects: Project[] = [
  {
    title: "Proyecto uno",
    year: "2026",
    role: "Diseño y desarrollo",
    summary:
      "Describe en una o dos frases qué problema resolvía y qué cambió gracias a tu trabajo.",
    tags: ["Next.js", "UX"],
    color: "fuchsia",
    href: "https://ejemplo.com",
    repo: "https://github.com/tu-usuario/proyecto-uno",
  },
  {
    title: "Proyecto dos",
    year: "2025",
    role: "Diseño de interfaz",
    summary:
      "Otra descripción breve. Cuenta el resultado, no solo las herramientas que usaste.",
    tags: ["UI", "Figma"],
    color: "pistachio",
    repo: "https://github.com/tu-usuario/proyecto-dos",
  },
  {
    title: "Proyecto tres",
    year: "2025",
    role: "Identidad y web",
    summary: "Un tercer proyecto. Puedes borrar los que no uses o añadir más.",
    tags: ["Marca", "Web"],
    color: "peony",
    href: "https://ejemplo.com",
  },
  {
    title: "Proyecto cuatro",
    year: "2024",
    role: "Investigación y prototipo",
    summary: "Un cuarto proyecto, para que el escritorio no se vea vacío.",
    tags: ["Research", "Prototipo"],
    color: "burgundy",
  },
];
