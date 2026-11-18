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
  email: "rekastikadesign@gmail.com",
  // Redes y contacto. Los nombres "LinkedIn", "Instagram" y "WhatsApp" eligen el
  // icono del dock, así que no los cambies; solo cambia las direcciones.
  // WhatsApp: "https://wa.me/" + código de país + número, todo junto y sin + ni espacios.
  // Si dejás href vacío (""), el botón se ve pero no lleva a ningún lado.
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/renata-kastika-0a77832b8" },
    { label: "Instagram", href: "https://www.instagram.com/rekastika.design" },
    { label: "WhatsApp", href: "" },
  ],
};

// Cada item se muestra como una carpeta. "place" es el subtítulo y es opcional.
// "image" (opcional) es una foto en /public: asoma en la carpeta y se abre al tocarla.
export type FolderItem = { title: string; place?: string; image?: string };

export const education: FolderItem[] = [
  {
    title: "Secundario completo",
    place: "Bachiller especializado en artes",
    image: "/sobre-mi/secundario-completo.jpg",
  },
  { title: "Licenciatura en Diseño en Comunicación Visual, Gráfica y Digital" },
];

export const awards: FolderItem[] = [
  {
    title: "Distinción por trayectoria escolar en 5.º año del secundario",
    image: "/sobre-mi/distincion-5-anio.jpg",
  },
  {
    title: "Mención especial por trayectoria académica en el secundario",
    image: "/sobre-mi/mencion-especial.jpg",
  },
  { title: "Mención especial por estar entre los 10 mejores promedios de primer año de la universidad" },
];

export const languages = ["Español · nativo", "Inglés · C2"];

// BORRADOR: características tuyas que se ven en "Sobre mí", debajo de las herramientas.
// Cambialas, borrá o agregá las que quieras (quedan mejor cortas, de una a tres palabras).
export const traits = [
  "Organizada",
  "Apasionada por la moda",
  "Dedicada",
  "Perseverante",
  "Creativa",
  "Detallista",
  "Responsable",
  "Curiosa",
  "Amante del color",
];

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
// Con 5 pasos quedan lunes a viernes y el fin de semana muestra "Disfrutar el resultado" y "Ver crecer tu proyecto".
// Admite hasta 7 pasos.
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
    deliverable: "El brief del proyecto, el plan de trabajo y las condiciones acordadas.",
  },
  {
    title: "Investigar y definir",
    summary:
      "Investigo tu rubro, tu público y tus referentes para definir el rumbo del proyecto.",
    deliverable: "Una investigación y una definición clarísima del proyecto y sus objetivos.",
  },
  {
    title: "Diseño y producción",
    summary:
      "Creo las piezas con tu identidad: color, tipografía, imágenes y todo lo que el proyecto necesite.",
    deliverable: "La producción gráfica y visual del proyecto.",
  },
  {
    title: "Ajustes",
    summary:
      "Revisamos juntos el trabajo y ajusto los detalles hasta que quede como te gusta.",
    deliverable: "El trabajo ajustado a tus gustos.",
  },
  {
    title: "Entrega",
    summary:
      "Preparo los archivos finales, los ordeno y te explico cómo usarlos.",
    deliverable: "El proyecto terminado, organizado y listo para utilizar.",
  },
];

// Colores disponibles para las etiquetas de cada proyecto.
export type ProjectColor = "peony" | "pistachio" | "burgundy" | "fuchsia";

// BORRADOR: los textos de cada proyecto los escribí a partir de las imágenes.
// Corregilos con tus palabras y agregá el año ("year") cuando lo tengas.
//
// Imágenes: van en /public/proyectos/<carpeta>/ y se listan en "images".
// La primera es la portada de la ventana. También acepta videos .mp4
// (con una imagen .jpg del mismo nombre como vista previa). Si agregás imágenes nuevas, hay que
// sumar su tamaño en src/data/project-images.json (pedímelo y lo hago).
export type Project = {
  title: string;
  kind?: string; // tipo de trabajo, se muestra debajo del título (opcional)
  year?: string;
  summary: string;
  tags: string[];
  color: ProjectColor; // color de la etiqueta de la carpeta
  images: string[];
  // Opcional: partes de la galería con su subtítulo, que se muestran después de "images".
  sections?: { title: string; images: string[] }[];
  href?: string; // enlace opcional (por ejemplo, Behance o la web del cliente)
  hrefLabel?: string; // texto del botón del enlace (si no, dice "Ver más")
};

const imgs = (folder: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/proyectos/${folder}/${String(i + 1).padStart(2, "0")}.jpg`);

export const projects: Project[] = [
  {
    title: "Acuna",
    kind: "Marca, identidad, diseño de landing y app",
    summary:
      "Acuna App acompaña el embarazo semana a semana: diario, citas médicas, contador de contracciones, checklists, comunidad y un espacio para quien acompaña. Diseñé el logo, la landing y las pantallas de la app, con una estética suave y cálida.",
    tags: ["App", "UX/UI", "Logo", "Landing", "Identidad"],
    color: "peony",
    images: imgs("acuna", 39),
    href: "https://mamadashboard.vercel.app/",
    hrefLabel: "Ver la app",
  },
  {
    title: "Centro Cultural Federico Leloir",
    kind: "Identidad visual y campaña",
    summary:
      "Identidad para un centro cultural de ciencia: logo, cartelería, afiches, agenda, revista, postales y piezas para redes. Un sistema atractivo para que la juventud se divierta con la ciencia.",
    tags: ["Sistema", "Logo", "Afiche", "Editorial", "Redes", "Identidad visual"],
    color: "fuchsia",
    images: imgs("leloir", 24),
  },
  {
    title: "A un paso(té) del cielo",
    kind: "Diseño editorial y collage",
    summary:
      "Libro cuadrado ilustrado con collage, pensado para mostrar el juego y las posibilidades de imaginación a través del collage. También se realizó el afiche de lanzamiento.",
    tags: ["Libro", "Collage", "Afiche"],
    color: "peony",
    images: (() => {
      // El video de presentación va justo después de la tapa
      const all = imgs("merienda", 10);
      return [all[0], "/proyectos/merienda/video.mp4", ...all.slice(1)];
    })(),
  },
  {
    title: "Paula Scher",
    kind: "Diseño editorial",
    summary: "Diseño de tres piezas editoriales: librito biográfico, diario y cronograma.",
    tags: ["Editorial", "Libro", "Tipografía", "Diario"],
    color: "pistachio",
    images: imgs("paula-scher", 16),
  },
  {
    title: "Tostado Café Club",
    kind: "Menú",
    summary: "Menú en formato libro para una cafetería porteña.",
    tags: ["Editorial", "Gastronomía", "Menú", "Imagen"],
    color: "burgundy",
    images: imgs("tostado", 19),
  },
  {
    title: "Fascículo barrial",
    kind: "Editorial y fotografía",
    summary: "Fascículo sobre el barrio de Belgrano con producción de fotografía propia. También se realizó el afiche de lanzamiento.",
    tags: ["Fascículo", "Fotografía", "Editorial", "Afiche"],
    color: "pistachio",
    // La portada es un mockup del fascículo; después vienen las dos partes.
    images: ["/proyectos/belgrano/portada.jpg"],
    sections: [
      { title: "Producción fotográfica", images: imgs("belgrano/fotos", 20) },
      { title: "Fascículo", images: imgs("belgrano/fasciculo", 9) },
      { title: "Afiche de lanzamiento", images: ["/proyectos/belgrano/afiche.jpg"] },
    ],
  },
  {
    title: "Sara Kerr",
    kind: "Diseño digital",
    summary:
      "Realización de actualizaciones web cada 15 días, sistema de identidad para la temporada verano 2027, manejo de redes, afiches de vía pública y cartelería del local.",
    tags: ["Banners", "E-commerce", "Redes", "Vía pública", "Identidad"],
    color: "peony",
    images: imgs("sara-kerr", 6),
  },
  {
    title: "Farmasut",
    kind: "Diseño digital",
    summary:
      "Actualización web cada 15 días, manejo y diseño de redes, y cartelería para eventos.",
    tags: ["Banners", "E-commerce", "Promoción", "Redes", "Cartelería"],
    color: "fuchsia",
    images: imgs("farmasut", 2),
  },
  {
    title: "Producción fotográfica Romance",
    kind: "Producción fotográfica",
    summary:
      "Producción de fotos para una colección de diseño de indumentaria: locación, dirección de las modelos y fotografía.",
    tags: ["Fotografía", "Moda"],
    color: "burgundy",
    images: imgs("indumentaria", 13),
  },
  {
    title: "Producción fotográfica retro",
    kind: "Producción fotográfica",
    summary: "Producción de fotos de moda: fotografía nocturna con estética retro.",
    tags: ["Fotografía", "Retrato", "Producción de moda"],
    color: "peony",
    images: imgs("retro", 7),
  },
  {
    title: "Afiches",
    summary: "Diseño de afiches, trabajo de imagen propia.",
    tags: ["Afiches", "Imagen", "Tipografía"],
    color: "pistachio",
    images: imgs("afiches", 4),
  },
];

// Todas las imágenes de un proyecto en orden: las sueltas y después las de cada parte.
export const allImages = (p: Project) => [
  ...p.images,
  ...(p.sections ?? []).flatMap((s) => s.images),
];
