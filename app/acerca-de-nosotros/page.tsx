import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeroVisual } from "@/components/page-hero-visual";
import { Reveal } from "@/components/reveal";
import { getSiteContent } from "@/lib/site-content";

export default async function AcercaDeNosotrosPage() {
  const heroImageUrl = await getSiteContent<string>(
    "acerca.hero.imageUrl",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
  );

  const offers = [
    {
      title: "Cursos de software",
      text: "Frontend, backend, mobile y arquitectura con enfoque práctico.",
    },
    {
      title: "Apps con IA",
      text: "Integración de IA en productos: prompts, flujos, RAG básico y buenas prácticas.",
    },
    {
      title: "Automatización",
      text: "Scripts y sistemas para automatizar tareas, reportes y procesos con Python y APIs.",
    },
    {
      title: "Bases de datos",
      text: "SQL, PostgreSQL y Supabase con modelado, RLS y patrones de producción.",
    },
  ];

  const platform = [
    {
      title: "Aula virtual",
      text: "Acceso a tus cursos, módulos y lecciones desde un panel del estudiante.",
    },
    {
      title: "Clases grabadas y en vivo",
      text: "Reproductor de lecciones y roadmap por módulos para seguir una ruta clara.",
    },
    {
      title: "Recursos y entregables",
      text: "Material descargable, ejercicios y proyectos para tu portafolio.",
    },
    {
      title: "Acceso por suscripción",
      text: "Contenido habilitado por plan e inscripción, con control de acceso por roles.",
    },
  ];

  const whoIsFor = [
    {
      title: "Principiantes",
      text: "Empieza desde cero con rutas guiadas y ejercicios de práctica.",
    },
    {
      title: "Intermedios",
      text: "Sube de nivel con proyectos completos y buenas prácticas de producción.",
    },
    {
      title: "Emprendedores",
      text: "Aprende a construir MVPs y productos con IA integrando APIs y bases de datos.",
    },
    {
      title: "Equipos",
      text: "Formación para equipos con contenidos y soporte según necesidades.",
    },
  ];

  const roadmap = [
    {
      title: "Fase 1 (MVP)",
      text: "Landing, cursos, login/registro, aula virtual y control de acceso.",
    },
    {
      title: "Fase 2",
      text: "Pagos automáticos, panel admin completo, estadísticas y progreso avanzado.",
    },
    {
      title: "Fase 3",
      text: "Streaming en vivo, certificados, comunidad, IA integrada y app móvil.",
    },
  ];

  const values = [
    {
      title: "Aprendizaje práctico",
      text: "Menos teoría suelta, más proyectos y entregables.",
    },
    {
      title: "Ruta clara",
      text: "Módulos ordenados, progreso y objetivos por lección.",
    },
    {
      title: "Enfoque profesional",
      text: "Buenas prácticas, herramientas modernas y mentalidad de producción.",
    },
    {
      title: "Comunidad",
      text: "Acompañamiento y soporte durante el proceso.",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-72 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.28),transparent_60%),radial-gradient(ellipse_at_right,rgba(59,130,246,0.18),transparent_55%)]" />
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Acerca de nosotros
            </h1>
            <p className="mt-2 max-w-2xl text-white/70">
              Vertex Software Academy: formación práctica para construir proyectos reales.
            </p>
            <p className="mt-2 max-w-3xl text-sm text-white/60">
              Enfocados en desarrollo de software, automatización con IA, bases de datos y
              construcción de productos listos para producción.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <PageHeroVisual
            title="Formación práctica"
            subtitle="Rutas claras, proyectos y acompañamiento."
            imageUrl={heroImageUrl}
            variant="violet"
          />
        </Reveal>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-base">Misión</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-white/70">
            Ayudarte a aprender programación con un camino claro, contenido moderno y
            enfoque en proyectos.
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-base">Cómo enseñamos</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-white/70">
            Clases en vivo y grabadas, recursos descargables y seguimiento de progreso
            desde tu aula virtual.
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Tecnologías</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-white/70">
            React, Next.js, TypeScript, Node.js, Python, PostgreSQL, Supabase y
            automatización con APIs.
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Lo que ofrecemos</h2>
        <p className="mt-2 max-w-3xl text-sm text-white/70">
          Formación orientada a resultados: cursos y rutas para construir software real,
          automatizar tareas con IA y trabajar con bases de datos de forma profesional.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((o) => (
            <Card key={o.title} className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">{o.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/70">{o.text}</CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Plataforma</h2>
        <p className="mt-2 max-w-3xl text-sm text-white/70">
          La plataforma está diseñada para crecer: control de acceso por rol y por
          inscripción, contenido por módulos, y una experiencia moderna.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platform.map((p) => (
            <Card key={p.title} className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/70">{p.text}</CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Valores</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <Card key={v.title} className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">{v.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/70">{v.text}</CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">¿Para quién es?</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whoIsFor.map((w) => (
            <Card key={w.title} className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">{w.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/70">{w.text}</CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Roadmap</h2>
        <p className="mt-2 max-w-3xl text-sm text-white/70">
          Construimos por fases para mantener velocidad y calidad: primero el MVP,
          luego automatizaciones, pagos y herramientas avanzadas.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {roadmap.map((r) => (
            <Card key={r.title} className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">{r.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/70">{r.text}</CardContent>
            </Card>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
