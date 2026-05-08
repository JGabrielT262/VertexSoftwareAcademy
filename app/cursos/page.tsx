import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSiteContent } from "@/lib/site-content";
import { BadgeCheck, Clock, Calendar } from "lucide-react";
import { COURSES_DATA, Course } from "@/lib/courses-data";

type CourseRow = {
  id: string;
  title: string | null;
  slug: string | null;
  description: string | null;
  thumbnail: string | null;
  price: number | null;
  priceUSD: number | null;
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

type Temporada = {
  id: string;
  course: string;
  startDate: string;
  endDate: string;
  schedule: string;
  status: "activa" | "pasada" | "proxima";
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

  if (source === "supabase" && courses.length < 20) {
    source = "demo";
    courses = [];
    modulesByCourseId.clear();
  }

  if (source === "demo" && courses.length === 0) {
    courses = COURSES_DATA.map(c => ({
      ...c,
      title: c.title,
      slug: c.slug,
      description: c.description,
      thumbnail: c.thumbnail,
      price: c.price,
      priceUSD: c.priceUSD,
      level: c.level,
      duration: c.duration,
      published: c.published
    }));
  }

  const heroImageUrl = await getSiteContent<string>(
    "cursos.hero.imageUrl",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
  );

  return (
    <div>
    <div className="bg-[#f8fafc]">
      <section className="w-full px-4 pt-12 pb-16 sm:pt-16">
        <div className="mx-auto max-w-[1200px] grid gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-3">
              Vertex Academy • Advanced Systems
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 uppercase">
              Cursos <span className="text-blue-600">Disponibles</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-slate-500">
              Programas de especialización técnica orientados a la arquitectura de software y automatización industrial. Domina los stacks más demandados con metodología basada en proyectos.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="h-12 rounded-sm bg-slate-900 px-8 text-[10px] font-black uppercase tracking-widest text-white hover:bg-slate-800 shadow-xl shadow-slate-200">
                <Link href="/planes">Planes Elite</Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-sm border-slate-200 bg-white px-8 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50">
                <Link href="/aula-virtual">Aula Virtual</Link>
              </Button>
            </div>
          </div>

          <div className="relative group">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-2xl">
              <Image
                src={heroImageUrl}
                alt="Cursos Vertex Software"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-blue-600/5 -z-10" />
          </div>
        </div>
      </section>

      <section id="cronograma" className="w-full px-4 pb-16">
        <div className="mx-auto max-w-[1200px]">
          {(() => {
            const temporadas: Temporada[] = [
              {
                id: "t-python-2026-1",
                course: "Python Profesional",
                startDate: "12 May 2026",
                endDate: "06 Jul 2026",
                schedule: "Martes y Jueves • 19:00 - 21:30",
                status: "activa",
              },
              {
                id: "t-ia-apps-2026-1",
                course: "AI & LLMs Ops",
                startDate: "15 Jul 2026",
                endDate: "26 Ago 2026",
                schedule: "Lunes y Miércoles • 20:00 - 22:00",
                status: "proxima",
              },
              {
                id: "t-next-2026-1",
                course: "Next.js Core",
                startDate: "02 Sep 2026",
                endDate: "14 Oct 2026",
                schedule: "Sábados • 09:00 - 13:00",
                status: "proxima",
              },
            ];

            return (
              <div className="bg-white border-y border-x border-slate-200 rounded-sm overflow-hidden shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 border-b border-slate-100 bg-slate-50/50">
                  <div>
                    <h2 className="text-[10px] font-black text-blue-600 tracking-[0.3em] uppercase">Cronograma Operativo</h2>
                    <p className="text-xl font-black text-slate-900 uppercase tracking-tighter mt-1">Lanzamientos Temporada 2026</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-none bg-teal-500" />
                      <span className="text-[9px] font-black text-slate-400 uppercase">Activo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-none bg-blue-500" />
                      <span className="text-[9px] font-black text-slate-400 uppercase">Programado</span>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {temporadas.map((t) => (
                    <div 
                      key={t.id} 
                      className={`group flex flex-col md:flex-row items-center gap-6 p-6 transition-all hover:bg-slate-50 ${
                        t.status === 'activa' ? 'bg-blue-50/10' : ''
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center shrink-0 w-16 h-16 border border-slate-100 bg-white">
                        <p className="text-[9px] font-black text-slate-400 uppercase">Mes</p>
                        <p className="text-lg font-black text-slate-900 uppercase leading-none mt-1">
                          {t.startDate.split(' ')[1]}
                        </p>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight truncate">{t.course}</h4>
                          {t.status === 'activa' && (
                            <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-[8px] font-black uppercase tracking-widest">En Vivo</span>
                          )}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                          <div className="flex items-center gap-2 text-slate-400">
                            <Clock className="size-3 text-blue-600" />
                            <span className="text-[10px] font-bold uppercase">{t.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <Calendar className="size-3 text-blue-600" />
                            <span className="text-[10px] font-bold uppercase">{t.startDate} - {t.endDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-4">
                        <Button variant="outline" size="sm" className="h-9 rounded-sm border-slate-200 text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>


      <section className="w-full px-4 pb-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-[10px] font-black text-blue-600 tracking-[0.3em] uppercase">Catálogo Técnico</h2>
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mt-1">Stacks de <span className="text-blue-600">Ingeniería</span></h3>
              <p className="mt-3 max-w-xl text-xs font-bold text-slate-400 uppercase tracking-wide">
                Dominio total de herramientas industriales y patrones de desarrollo avanzado.
              </p>
            </div>
            <Button asChild variant="outline" className="hidden h-10 rounded-xl border-slate-200 bg-white px-6 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50 sm:inline-flex">
              <Link href="/contactenos">Consultar Stacks</Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const title = course.title ?? "Curso";
              const slug = course.slug ?? "";
              const href = slug ? `/cursos/${slug}` : "/cursos";
              
              return (
                <div key={course.id} className="group relative bg-white border border-slate-100 rounded-sm overflow-hidden transition-all duration-500 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {course.thumbnail ? (
                      <Image
                        src={course.thumbnail}
                        alt={title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 400px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-none text-[9px] font-black text-slate-900 uppercase tracking-widest shadow-xl">
                        {course.level ?? 'General'}
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-base font-black text-white leading-tight uppercase tracking-tighter">
                        {title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <BadgeCheck className="size-3 text-blue-400" />
                        <span className="text-[9px] font-black text-blue-100 uppercase tracking-[0.2em]">Certificación Vertex</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-medium text-slate-500 leading-relaxed min-h-[40px]">
                      {course.description ?? "Explora los fundamentos y técnicas avanzadas en este stack especializado."}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4">
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Duración</p>
                        <p className="text-[11px] font-black text-slate-900 uppercase">{course.duration ?? '8 Semanas'}</p>
                      </div>
                      <div className="h-8 w-px bg-slate-100" />
                      <div className="text-right">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Inversión</p>
                        <p className="text-base font-black text-blue-600 leading-none">
                          {typeof course.price === "number" ? `S/ ${course.price}` : 'Consultar'}
                        </p>
                        <p className="text-[10px] font-black text-slate-400 mt-1 uppercase">
                          {typeof course.priceUSD === "number" ? `$ ${course.priceUSD} USD` : ''}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <Button
                        asChild
                        variant="ghost"
                        className="h-10 rounded-sm text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                      >
                        <Link href={href}>Detalles</Link>
                      </Button>
                      <Button
                        asChild
                        className="h-10 rounded-sm bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.05]"
                      >
                        <Link href={`/aula-virtual?checkout=course&courseSlug=${encodeURIComponent(slug)}`}>
                          Inscribirme
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>

    </div>
  );
}
