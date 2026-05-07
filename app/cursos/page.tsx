import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeroVisual } from "@/components/page-hero-visual";
import { Reveal } from "@/components/reveal";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSiteContent } from "@/lib/site-content";
import { BadgeCheck } from "lucide-react";

type CourseRow = {
  id: string;
  title: string | null;
  slug: string | null;
  description: string | null;
  thumbnail: string | null;
  price: number | null;
  level: string | null;
  duration: string | null;
  published: boolean | null;
};

type ModuleRow = {
  id: string;
  course_id: string | null;
  title: string | null;
  position: number | null;
};

export default async function CoursesPage() {
  const hasEnv =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  let courses: CourseRow[] = [];
  const modulesByCourseId = new Map<string, ModuleRow[]>();
  let source: "supabase" | "demo" = "demo";

  if (hasEnv) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data } = await supabase
        .from("courses")
        .select(
          "id,title,slug,description,thumbnail,price,level,duration,published"
        )
        .eq("published", true)
        .order("created_at", { ascending: false })
        .returns<CourseRow[]>();

      if (data) {
        courses = data;
        source = "supabase";
      }

      const courseIds = (data ?? []).map((c) => c.id);
      if (courseIds.length) {
        const { data: modules } = await supabase
          .from("modules")
          .select("id,course_id,title,position")
          .in("course_id", courseIds)
          .order("position", { ascending: true })
          .returns<ModuleRow[]>();

        (modules ?? []).forEach((m) => {
          const courseId = m.course_id ?? "";
          if (!courseId) return;
          const bucket = modulesByCourseId.get(courseId) ?? [];
          bucket.push(m);
          modulesByCourseId.set(courseId, bucket);
        });
      }
    } catch {
      source = "demo";
    }
  }

  if (source === "demo" && courses.length === 0) {
    courses = [
      {
        id: "demo-web-fullstack",
        title: "Desarrollo Web Full Stack",
        slug: "desarrollo-web-full-stack",
        description:
          "HTML, CSS, JavaScript, React, Next.js, Node.js y PostgreSQL con proyectos reales.",
        thumbnail:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
        price: 249,
        level: "Desde cero",
        duration: "12 semanas",
        published: true,
      },
      {
        id: "demo-python",
        title: "Python Profesional",
        slug: "python-profesional",
        description: "APIs, automatización, IA y scraping con buenas prácticas.",
        thumbnail:
          "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
        price: 199,
        level: "Intermedio",
        duration: "8 semanas",
        published: true,
      },
      {
        id: "demo-sql",
        title: "SQL y Bases de Datos",
        slug: "sql-y-bases-de-datos",
        description:
          "PostgreSQL, modelado, consultas, índices y buenas prácticas para producción.",
        thumbnail:
          "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80",
        price: 149,
        level: "Desde cero",
        duration: "6 semanas",
        published: true,
      },
      {
        id: "demo-supabase",
        title: "Supabase + PostgreSQL (RLS en serio)",
        slug: "supabase-postgresql-rls",
        description:
          "Auth, Storage, Row Level Security, políticas y patrones para apps reales.",
        thumbnail:
          "https://images.unsplash.com/photo-1555066932-e78dd8fb77bb?auto=format&fit=crop&w=1200&q=80",
        price: 179,
        level: "Intermedio",
        duration: "5 semanas",
        published: true,
      },
      {
        id: "demo-nextjs",
        title: "Next.js para Producción",
        slug: "nextjs-para-produccion",
        description:
          "App Router, auth, middleware, rendimiento, SEO y despliegue en Vercel.",
        thumbnail:
          "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=1200&q=80",
        price: 189,
        level: "Intermedio",
        duration: "6 semanas",
        published: true,
      },
      {
        id: "demo-react-native",
        title: "React Native con Expo",
        slug: "react-native-con-expo",
        description:
          "Apps Android/iOS con Expo, APIs, notificaciones y publicación.",
        thumbnail:
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
        price: 219,
        level: "Intermedio",
        duration: "8 semanas",
        published: true,
      },
      {
        id: "demo-ia-apps",
        title: "Creación de Apps con IA (LLMs)",
        slug: "creacion-de-apps-con-ia-llms",
        description:
          "Integra IA en tus aplicaciones: prompts, RAG básico, herramientas y buenas prácticas.",
        thumbnail:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
        price: 299,
        level: "Intermedio",
        duration: "6 semanas",
        published: true,
      },
      {
        id: "demo-prompt",
        title: "Prompt Engineering",
        slug: "prompt-engineering",
        description:
          "Técnicas para prompts útiles: estructura, evaluación, guardrails y contexto.",
        thumbnail:
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        price: 129,
        level: "Desde cero",
        duration: "3 semanas",
        published: true,
      },
      {
        id: "demo-ia-sql",
        title: "SQL con IA (consultas, optimización y análisis)",
        slug: "sql-con-ia",
        description:
          "Aprende a mejorar consultas con IA, interpretar planes, optimizar y documentar.",
        thumbnail:
          "https://images.unsplash.com/photo-1559136656-3db4bf6c7b1f?auto=format&fit=crop&w=1200&q=80",
        price: 169,
        level: "Intermedio",
        duration: "4 semanas",
        published: true,
      },
      {
        id: "demo-data",
        title: "Data Engineering para Devs",
        slug: "data-engineering-para-devs",
        description:
          "ETL/ELT, modelado analítico, calidad de datos y pipelines modernos.",
        thumbnail:
          "https://images.unsplash.com/photo-1451188502541-13943edb6acb?auto=format&fit=crop&w=1200&q=80",
        price: 249,
        level: "Intermedio",
        duration: "8 semanas",
        published: true,
      },
      {
        id: "demo-apis",
        title: "APIs Profesionales (REST + buenas prácticas)",
        slug: "apis-profesionales-rest",
        description:
          "Diseño de APIs, validación, auth, rate limiting y documentación.",
        thumbnail:
          "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1200&q=80",
        price: 179,
        level: "Desde cero",
        duration: "5 semanas",
        published: true,
      },
      {
        id: "demo-devops",
        title: "DevOps para Desarrolladores",
        slug: "devops-para-desarrolladores",
        description:
          "Git workflows, CI/CD, despliegue, observabilidad y prácticas para equipos.",
        thumbnail:
          "https://images.unsplash.com/photo-1551033406-611cf9a28f3a?auto=format&fit=crop&w=1200&q=80",
        price: 229,
        level: "Intermedio",
        duration: "6 semanas",
        published: true,
      },
    ];
  }

  const heroImageUrl = await getSiteContent<string>(
    "cursos.hero.imageUrl",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
  );

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-72 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.35),transparent_60%),radial-gradient(ellipse_at_left,rgba(34,211,238,0.18),transparent_55%)]" />
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Cursos</h1>
            <p className="mt-2 text-white/70">
              {source === "supabase"
                ? "Cursos publicados desde Supabase."
                : "Vista demo. Configura Supabase para ver tus cursos reales."}
            </p>
            <p className="mt-1 text-sm text-white/60">
              Aquí tienes dos formas de aprender: suscripción mensual (para cursos en
              vivo y recursos según tu plan) o compra de curso individual (clases
              privadas / contenido independiente).
            </p>
            <p className="mt-2 text-sm text-white/60">
              La suscripción es mensual y se renueva automáticamente hasta que la
              canceles. Las clases en vivo se organizan por temporadas (ciclos).
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="bg-blue-600 hover:bg-blue-500">
                <Link href="/planes">Ver planes</Link>
              </Button>
              <Button asChild variant="secondary" className="bg-white/10">
                <Link href="/cronograma">Ver cronograma</Link>
              </Button>
              <Button asChild variant="secondary" className="bg-white/10">
                <Link href="/dashboard">Ir al dashboard</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <PageHeroVisual
            title="Catálogo de cursos"
            subtitle="Cursos individuales + acceso por suscripción mensual."
            imageUrl={heroImageUrl}
            variant="blue"
          />
        </Reveal>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-base">Suscripción mensual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-white/70">
              <div>
                Tu plan se mantiene activo mes a mes hasta que lo canceles. Con la
                suscripción puedes acceder a cursos en vivo (temporadas), grabaciones y
                soporte según tu plan.
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/60">
                Revisa el cronograma para ver la temporada activa, las pasadas y las
                próximas con fechas de inicio y fin.
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-blue-600 hover:bg-blue-500">
                  <Link href="/planes">Ver planes</Link>
                </Button>
                <Button asChild variant="secondary" className="bg-white/10">
                  <Link href="/cronograma">Ver cronograma</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.05}>
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-base">Cursos individuales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-white/70">
              <div>
                Compra un curso específico por separado (independiente de la suscripción).
                Ideal si quieres un tema puntual o clases privadas.
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/60">
                Tip: si estás en una temporada activa, el acceso se gestiona por plan. Si
                compras un curso individual, el acceso es aparte.
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const title = course.title ?? "Curso";
          const slug = course.slug ?? "";
          const href = slug ? `/cursos/${slug}` : "/cursos";
          const modules = modulesByCourseId.get(course.id) ?? [];
          const topModules = modules.slice(0, 3);

          return (
            <Card key={course.id} className="v3d-tilt border-white/10 bg-white/5">
              <CardHeader>
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  {course.thumbnail ? (
                    <Image
                      src={course.thumbnail}
                      alt={title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-cover opacity-90"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-600/20" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/65 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                    <div className="truncate text-sm font-semibold text-white">{title}</div>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#0F172A]/55 px-2 py-1 text-xs text-white/85 backdrop-blur">
                      <BadgeCheck className="size-3.5" />
                      Certificado
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-white/70">
                <p>{course.description ?? "—"}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {course.level ? (
                    <span className="rounded-full bg-white/10 px-2 py-1">
                      {course.level}
                    </span>
                  ) : null}
                  {course.duration ? (
                    <span className="rounded-full bg-white/10 px-2 py-1">
                      {course.duration}
                    </span>
                  ) : null}
                  {typeof course.price === "number" ? (
                    <span className="rounded-full bg-white/10 px-2 py-1">
                      Curso individual: S/ {course.price}
                    </span>
                  ) : null}
                  {source === "supabase" ? (
                    <span className="rounded-full bg-white/10 px-2 py-1">
                      {modules.length} módulos
                    </span>
                  ) : null}
                </div>

                {source === "supabase" && topModules.length ? (
                  <div className="space-y-2">
                    <div className="text-xs text-white/60">Módulos:</div>
                    <div className="flex flex-wrap gap-2">
                      {topModules.map((m) => (
                        <span
                          key={m.id}
                          className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70"
                        >
                          {m.title ?? "Módulo"}
                        </span>
                      ))}
                      {modules.length > topModules.length ? (
                        <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/60">
                          +{modules.length - topModules.length}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                <div className="grid gap-3 sm:grid-cols-2">
                  <Button
                    asChild
                    className="w-full bg-white/10 hover:bg-white/15"
                    variant="secondary"
                    disabled={!slug}
                  >
                    <Link href={href}>Ver temario</Link>
                  </Button>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-500" disabled={!slug}>
                    <Link href={`/aula-virtual?checkout=course&courseSlug=${encodeURIComponent(slug)}`}>
                      Contratar
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      </div>
    </div>
  );
}
