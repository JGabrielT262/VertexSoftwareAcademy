export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  price: number;
  priceUSD: number;
  level: string;
  duration: string;
  instructor?: string;
  published: boolean;
};

export const COURSES_DATA: Course[] = [
  {
    id: "course-fullstack",
    title: "Desarrollo Web Full Stack",
    slug: "desarrollo-web-full-stack",
    description: "HTML, CSS, JavaScript, React, Next.js, Node.js y PostgreSQL con proyectos reales.",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    price: 249,
    priceUSD: 69,
    level: "Desde cero",
    duration: "12 semanas",
    instructor: "Ing. Marco Silva",
    published: true,
  },
  {
    id: "course-python",
    title: "Python Profesional",
    slug: "python-profesional",
    description: "APIs, automatización, IA y scraping con buenas prácticas industriales.",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
    price: 199,
    priceUSD: 55,
    level: "Intermedio",
    duration: "8 semanas",
    instructor: "Ing. Elena Salas",
    published: true,
  },
  {
    id: "course-sql",
    title: "SQL y Bases de Datos",
    slug: "sql-y-bases-de-datos",
    description: "PostgreSQL, modelado, consultas, índices y buenas prácticas para producción.",
    thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80",
    price: 149,
    priceUSD: 42,
    level: "Desde cero",
    duration: "6 semanas",
    instructor: "Ing. Roberto Paz",
    published: true,
  },
  {
    id: "course-automation",
    title: "FullStack Automation",
    slug: "fullstack-automation",
    description: "Sistemas de automatización de extremo a extremo utilizando Python y Node.js.",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    price: 279,
    priceUSD: 78,
    level: "Avanzado",
    duration: "10 semanas",
    instructor: "Ing. Marco Silva",
    published: true,
  },
  {
    id: "course-rpa",
    title: "Robotic Process Automation",
    slug: "robotic-process-automation",
    description: "Automatización de procesos empresariales con UiPath y bots personalizados.",
    thumbnail: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1200&q=80",
    price: 219,
    priceUSD: 61,
    level: "Intermedio",
    duration: "8 semanas",
    instructor: "Ing. Elena Salas",
    published: true,
  },
  {
    id: "course-ai-ops",
    title: "AI Deployment Ops",
    slug: "ai-deployment-ops",
    description: "Despliegue y monitoreo de modelos de IA en entornos de producción (MLOps).",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    price: 329,
    priceUSD: 92,
    level: "Avanzado",
    duration: "8 semanas",
    instructor: "Ing. Roberto Paz",
    published: true,
  },
  {
    id: "course-smart-factory",
    title: "Smart Factory 4.0",
    slug: "smart-factory-4-0",
    description: "Integración de sistemas IoT y SCADA para la industria conectada.",
    thumbnail: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
    price: 349,
    priceUSD: 97,
    level: "Avanzado",
    duration: "12 semanas",
    instructor: "Ing. Marco Silva",
    published: true,
  },
];
