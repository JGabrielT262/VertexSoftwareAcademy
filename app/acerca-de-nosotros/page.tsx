import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
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
    <div className="bg-[#f8fafc]">
      {/* Hero Section */}
      <section className="w-full px-4 pt-12 pb-16 sm:pt-16">
        <div className="mx-auto max-w-[1200px] grid gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-3">
              Misión Corporativa • Vertex Software
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 uppercase">
              Ingeniería de <span className="text-blue-600">Sistemas</span> & Formación
            </h1>
            <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-slate-500 uppercase">
              Construimos software listo para producción y ofrecemos formación técnica avanzada para que puedas operar, mantener y escalar tus sistemas con criterio técnico.
            </p>
            <p className="mt-3 max-w-xl text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">
              Enfocados en desarrollo de software, automatización industrial, integraciones de alto nivel y arquitecturas de bases de datos escalables.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="h-12 rounded-sm bg-blue-600 px-8 text-[10px] font-black uppercase tracking-widest text-white hover:bg-blue-700 shadow-xl shadow-blue-500/20">
                <Link href="/contactenos">Contactar Equipo</Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-sm border-slate-200 bg-white px-8 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50">
                <Link href="/cursos">Catálogo de Cursos</Link>
              </Button>
            </div>
          </div>

          <div className="relative group">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-2xl">
              <Image
                src={heroImageUrl}
                alt="Vertex Software Team"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply" />
            </div>
            <div className="absolute -top-4 -left-4 h-24 w-24 border-t-2 border-l-2 border-blue-600/20 -z-10" />
          </div>
        </div>
      </section>

      {/* Corporate Identity */}
      <section className="w-full px-4 pb-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-sm border border-slate-100 bg-white p-8 hover:border-blue-500 transition-all">
              <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">01. Propósito</div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Nuestra Misión</h2>
              <p className="mt-4 text-xs font-bold text-slate-500 uppercase leading-relaxed">
                Entregar software útil y formación técnica de alto impacto, con un enfoque inquebrantable en la operación real y resultados medibles.
              </p>
            </div>
            <div className="rounded-sm border border-slate-100 bg-white p-8 hover:border-blue-500 transition-all">
              <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">02. Metodología</div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Cómo Trabajamos</h2>
              <p className="mt-4 text-xs font-bold text-slate-500 uppercase leading-relaxed">
                Implementamos por hitos críticos, priorizando la mantenibilidad del código y estableciendo procesos de soporte robustos.
              </p>
            </div>
            <div className="rounded-sm border border-slate-100 bg-white p-8 md:col-span-2 group">
              <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">03. Stack Tecnológico</div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Tecnologías de Producción</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", "Supabase", "APIs"].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-slate-50 border border-slate-100 text-[9px] font-black uppercase text-slate-400 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full px-4 pb-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Portafolio</div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Capacidades Técnicas</h2>
            </div>
            <Button asChild variant="outline" className="h-10 rounded-sm border-slate-200 bg-white px-6 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50 transition-all">
              <Link href="/software">Ver Software</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {offers.map((o) => (
              <div key={o.title} className="rounded-sm border border-slate-100 bg-white p-6 hover:border-blue-500 transition-all">
                <div className="text-xs font-black text-slate-900 uppercase tracking-tight mb-3">{o.title}</div>
                <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed">{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Architecture */}
      <section className="w-full px-4 pb-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10">
            <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Ecosistema</div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter text-center md:text-left">Arquitectura de Aprendizaje</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {platform.map((p) => (
              <div key={p.title} className="rounded-sm border border-slate-100 bg-white p-6 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                <div className="text-xs font-black text-slate-900 uppercase tracking-tight mb-3">{p.title}</div>
                <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="w-full px-4 pb-16">
        <div className="mx-auto max-w-[1200px] border-y border-slate-100 py-16">
          <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] text-center mb-10">Valores Fundamentales</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <div className="text-xs font-black text-slate-900 uppercase tracking-tight mb-3">{v.title}</div>
                <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed px-4">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Segments */}
      <section className="w-full px-4 pb-16">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-10">Perfiles Destino</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whoIsFor.map((w) => (
              <div key={w.title} className="rounded-sm border border-slate-100 bg-white p-6 hover:bg-slate-50 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-1 w-4 bg-blue-600" />
                  <div className="text-xs font-black text-slate-900 uppercase tracking-tight">{w.title}</div>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Roadmap */}
      <section className="w-full px-4 pb-20">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-10">Planificación Estratégica</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {roadmap.map((r, i) => (
              <div key={r.title} className="relative p-8 bg-white border border-slate-100 rounded-sm">
                <div className="absolute -top-3 -left-3 h-8 w-8 bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">
                  0{i + 1}
                </div>
                <div className="text-xs font-black text-slate-900 uppercase tracking-tight mb-3">{r.title}</div>
                <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-slate-900 rounded-sm p-10 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-slate-900/40">
            <div className="max-w-xl">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                ¿Buscas implementación técnica o formación corporativa?
              </h3>
              <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-wide leading-relaxed">
                Desarrollamos soluciones a medida y capacitamos equipos en las tecnologías más demandadas del sector industrial.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Button asChild className="h-12 rounded-sm bg-blue-600 px-8 text-[10px] font-black uppercase tracking-widest text-white hover:bg-blue-700 transition-all">
                <Link href="/contactenos">Iniciar Consulta</Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-sm border-slate-700 bg-transparent px-8 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-slate-900 transition-all">
                <Link href="/planes">Planes de Acceso</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}
