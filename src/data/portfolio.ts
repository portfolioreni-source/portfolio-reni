// Edita SOLO este archivo para cambiar el contenido de tu portfolio.
//
// Imágenes: guárdalas en la carpeta /public y escríbelas aquí con "/" delante,
// por ejemplo "/projects/uno.jpg". Para las fotos tuyas, lo ideal es un PNG
// recortado (sin fondo). Si dejas una ruta vacía, se muestra un espacio de borrador.

export const profile = {
  name: "Renata Kastika",
  role: "Diseñadora en comunicación visual, gráfica y digital",
  headline:
    "¿Tu marca no transmite lo que querés? Te ayudo a diseñar una identidad que te represente. Desde la comunicación en redes, producciones de fotos, hasta la página web.",
  availability: "Disponible para nuevos proyectos",
  photo: "/yo-portada.jpg", // foto de la portada (se muestra dentro de un arco, no hace falta recortarla)
  aboutPhoto: "", // foto recortada para "Sobre mí", por ejemplo "/yo-sobre-mi.png"
  about: [
    "¡Hola! Soy Renata, una apasionada de comunicar a través del diseño, los colores, las imágenes, la tipografía y la interacción.",
    "Me encanta, en cada proyecto, poder acompañar más allá de lo estético: entender el por qué de una necesidad y, con eso, llegar a un resultado que represente.",
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

// Cada item se muestra como una carpeta. "place" es el subtítulo y es opcional.
type FolderItem = { title: string; place?: string };

export const education: FolderItem[] = [
  { title: "Secundario completo", place: "Bachiller especializado en artes" },
  { title: "Licenciatura en Diseño en Comunicación Visual, Gráfica y Digital" },
];

export const awards: FolderItem[] = [
  { title: "Distinción por trayectoria escolar en 5.º año del secundario" },
  { title: "Mención especial por trayectoria académica en el secundario" },
  { title: "Mención especial por estar entre los 10 mejores promedios de primer año de la universidad" },
];

export const languages = ["Español · nativo", "Inglés · C2"];

// Palabras de la cinta que se mueve debajo de la portada.
export const marquee = [
  "Marca",
  "Identidad visual",
  "Branding",
  "Comunicación",
  "Diseño UX/UI",
  "Web",
  "Fotografía",
  "Redes sociales",
  "Moda",
];

// Herramientas que usás y con qué nivel. El nombre elige el icono (ver ToolIcon.tsx).
// Niveles posibles: "avanzado" o "intermedio". Al pasar el mouse (o tocar, en el
// celular) cada icono muestra su nivel.
export type ToolLevel = "avanzado" | "intermedio";
export type Tool = { name: string; level: ToolLevel };

export const tools: Tool[] = [
  { name: "Illustrator", level: "avanzado" },
  { name: "Photoshop", level: "avanzado" },
  { name: "Lightroom", level: "avanzado" },
  { name: "InDesign", level: "avanzado" },
  { name: "Canva", level: "avanzado" },
  { name: "Figma", level: "intermedio" },
  { name: "CapCut", level: "intermedio" },
  { name: "Visual Studio Code", level: "intermedio" },
];

// Habilidades que ofreces (se muestran como tarjetas). Puedes poner las que quieras.
// Al tocar una tarjeta se abre como ventana y muestra "more" e "includes".
export type Service = {
  title: string;
  description: string; // frase corta que se ve en la tarjeta
  more: string; // texto más largo que se ve al abrirla
  includes: string[]; // qué incluye (lista)
};

export const services: Service[] = [
  {
    title: "Identidad de marca",
    description: "Una marca que se reconoce al instante y cuenta quién sos.",
    more: "Antes de diseñar, escucho: tu historia, tus valores y a quién le querés hablar. Con eso construimos una identidad con personalidad propia, coherente en cada lugar donde aparezca tu marca.",
    includes: [
      "Logo y sus variantes",
      "Paleta de color y tipografías",
      "Manual de marca para usarla siempre bien",
    ],
  },
  {
    title: "Producción de contenido",
    description: "Fotos y piezas visuales que hablan el idioma de tu marca.",
    more: "Como fotógrafa, me encargo de todo: pienso la idea, armo la estética, hago la sesión de fotos y edito. Así cada imagen se ve profesional y parte de la misma historia.",
    includes: [
      "Sesiones de fotos de producto, marca o retrato",
      "Dirección de arte y estética de la producción",
      "Edición y piezas listas para publicar",
    ],
  },
  {
    title: "Comunicación",
    description: "Redes y piezas con un mensaje claro y una imagen coherente.",
    more: "Ordenamos qué querés decir, a quién y cómo, para que tu marca se vea y se escuche igual en redes, en piezas gráficas y en cada lugar donde aparezca.",
    includes: [
      "Estrategia y estética para redes sociales",
      "Diseño de posteos, historias y plantillas",
      "Piezas gráficas para impresión y digital",
    ],
  },
  {
    title: "Desarrollo web",
    description: "Tu web completa: diseño, programación y lista para usar.",
    more: "Me ocupo de todo el proceso: diseño las pantallas, armamos un prototipo para probarlo y después la programo. Recibís tu web publicada, rápida y lista para compartir.",
    includes: [
      "Diseño de pantallas y prototipo navegable",
      "Programación adaptada a celular y computadora",
      "Publicación online, lista para usar",
    ],
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
      "Empezamos con una conversación para entender qué necesitás, para quién es y qué tiene que lograr.",
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
      "Describí en una o dos frases qué problema resolvía y qué cambió gracias a tu trabajo.",
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
      "Otra descripción breve. Contá el resultado, no solo las herramientas que usaste.",
    tags: ["UI", "Figma"],
    color: "pistachio",
    repo: "https://github.com/tu-usuario/proyecto-dos",
  },
  {
    title: "Proyecto tres",
    year: "2025",
    role: "Identidad y web",
    summary: "Un tercer proyecto. Podés borrar los que no uses o añadir más.",
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
