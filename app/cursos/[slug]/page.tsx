import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { 
  BadgeCheck, 
  ChevronRight, 
  PlayCircle, 
  Lock, 
  Clock, 
  BarChart, 
  BookOpen,
  ArrowLeft
} from "lucide-react";

type Course = {
  id: string;
  title: string | null;
  slug: string | null;
  description: string | null;
  thumbnail: string | null;
  price: number | null;
  priceUSD?: number | null;
  level: string | null;
  duration: string | null;
};

type ModuleRow = {
  id: string;
  title: string | null;
  position: number | null;
};

type LessonRow = {
  id: string;
  module_id: string | null;
  title: string | null;
  video_url: string | null;
  is_preview: boolean | null;
  position: number | null;
};

export default async function CourseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const hasEnv =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let course: Course | null = null;
  let modules: ModuleRow[] = [];
  let lessons: LessonRow[] = [];

  if (hasEnv) {
    const supabase = await createSupabaseServerClient();

    const { data: courseData } = await supabase
      .from("courses")
      .select("id,title,slug,description,thumbnail,price,level,duration")
      .eq("slug", slug)
      .maybeSingle()
      .returns<Course | null>();

    course = courseData ?? null;

    if (course) {
      const { data: moduleData } = await supabase
        .from("modules")
        .select("id,title,position")
        .eq("course_id", course.id)
        .order("position", { ascending: true })
        .returns<ModuleRow[]>();
      modules = moduleData ?? [];

      const moduleIds = modules.map((m) => m.id);
      if (moduleIds.length) {
        const { data: lessonData } = await supabase
          .from("lessons")
          .select("id,module_id,title,video_url,is_preview,position")
          .in("module_id", moduleIds)
          .order("position", { ascending: true })
          .returns<LessonRow[]>();
        lessons = lessonData ?? [];
      }
    }
  }

  if (!course) {
    course = {
      id: "demo-course",
      title: "Curso Demo: Ingeniería de Software",
      slug,
      description:
        "Domina los patrones de diseño y arquitectura para sistemas escalables de alta disponibilidad.",
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      price: 249,
      level: "Avanzado",
      duration: "12 Semanas",
    };
  }

  let isEnrolled = false;
  let userId: string | null = null;

  if (hasEnv) {
    try {
      const supabase = await createSupabaseServerClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      userId = user?.id ?? null;

      if (userId && course.id !== "demo-course") {
        const { data: enrollment } = await supabase
          .from("enrollments")
          .select("id")
          .eq("user_id", userId)
          .eq("course_id", course.id)
          .maybeSingle();
        isEnrolled = !!enrollment;
      }
    } catch {
      isEnrolled = false;
    }
  }

  const lessonsByModule = modules.map((m) => ({
    module: m,
    lessons: lessons.filter((l) => l.module_id === m.id),
  }));

  const enrollUrl = `/aula-virtual?checkout=course&courseSlug=${encodeURIComponent(slug)}`;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-slate-900 pt-16 pb-24 text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={course.thumbnail || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"}
            alt="Background"
            fill
            className="object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-4">
          <Link href="/cursos" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="size-3" />
            Volver al Catálogo
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-blue-600 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20">
                  {course.level}
                </span>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em]">
                  Certificación Oficial
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase italic leading-[0.95]">
                {course.title}
              </h1>
              
              <p className="max-w-xl text-lg font-medium text-slate-300 leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-8 pt-4">
                <div className="flex items-center gap-3">
                  <Clock className="size-5 text-blue-400" />
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Duración</p>
                    <p className="text-sm font-black uppercase mt-1">{course.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart className="size-5 text-blue-400" />
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Nivel</p>
                    <p className="text-sm font-black uppercase mt-1">{course.level}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="size-5 text-blue-400" />
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Recursos</p>
                    <p className="text-sm font-black uppercase mt-1">Descargables</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Card Mobile Only */}
            <div className="lg:hidden">
              <EnrollCard course={course} isEnrolled={isEnrolled} enrollUrl={enrollUrl} />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 -mt-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          
          <div className="space-y-12 pb-24">
            {/* Syllabus Section */}
            <section className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden mt-12 md:mt-0">
              <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-[10px] font-black text-blue-600 tracking-[0.3em] uppercase">Contenido del Programa</h2>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mt-1">Módulos y Lecciones</h3>
              </div>

              <div className="divide-y divide-slate-100">
                {lessonsByModule.length > 0 ? (
                  lessonsByModule.map(({ module, lessons: moduleLessons }, idx) => (
                    <div key={module.id} className="group">
                      <div className="flex items-center justify-between p-6 bg-white transition-colors group-hover:bg-slate-50 cursor-pointer">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center justify-center size-8 bg-slate-900 text-white text-xs font-black italic">
                            {(idx + 1).toString().padStart(2, '0')}
                          </span>
                          <h4 className="font-black text-slate-900 uppercase tracking-tight">{module.title}</h4>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {moduleLessons.length} Lecciones
                        </span>
                      </div>
                      
                      <div className="bg-slate-50/30 px-6 pb-6 space-y-2">
                        {moduleLessons.map((lesson) => (
                          <div 
                            key={lesson.id}
                            className="flex items-center justify-between gap-4 p-4 border border-slate-200 bg-white rounded-sm group/lesson hover:border-blue-300 transition-all"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {lesson.is_preview ? (
                                <PlayCircle className="size-4 text-blue-600 shrink-0" />
                              ) : (
                                <Lock className="size-4 text-slate-300 shrink-0" />
                              )}
                              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight truncate">
                                {lesson.title}
                              </span>
                            </div>
                            {lesson.is_preview && (
                              <span className="shrink-0 px-2 py-0.5 bg-blue-100 text-blue-700 text-[8px] font-black uppercase tracking-widest">
                                Gratis
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                    Contenido en proceso de carga operativa...
                  </div>
                )}
              </div>
            </section>

            {/* Certification Section */}
            <section className="p-8 border border-slate-200 bg-white rounded-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 size-32 bg-blue-600/5 -rotate-12 translate-x-10 -translate-y-10" />
               <div className="size-20 border-2 border-blue-600/20 bg-blue-50 flex items-center justify-center shrink-0">
                  <BadgeCheck className="size-10 text-blue-600" />
               </div>
               <div className="space-y-2 text-center md:text-left">
                  <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Certificación Vertex</h4>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-lg">
                    Al completar este stack de ingeniería, recibirás un certificado digital con validación blockchain para respaldar tus competencias técnicas ante la industria.
                  </p>
               </div>
            </section>
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block -mt-32 pb-24">
            <div className="sticky top-28">
              <EnrollCard course={course} isEnrolled={isEnrolled} enrollUrl={enrollUrl} />
            </div>
          </aside>
          
        </div>
      </div>
    </div>
  );
}

function EnrollCard({ course, isEnrolled, enrollUrl }: { course: Course, isEnrolled: boolean, enrollUrl: string }) {
  return (
    <Card className="border-2 border-white bg-white shadow-2xl rounded-sm overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <Image 
          src={course.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80"}
          alt="Course Thumbnail"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
           <PlayCircle className="size-12 text-white/80" />
        </div>
      </div>

      <CardContent className="p-8 space-y-6">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inversión Total</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">S/ {course.price}</span>
            <span className="text-sm font-black text-slate-400">/ Pago Único</span>
          </div>
          <p className="text-[10px] font-bold text-blue-600 uppercase">Acceso de por vida • Actualizaciones</p>
        </div>

        <div className="space-y-3">
          {isEnrolled ? (
            <Button asChild className="w-full h-12 bg-slate-900 text-white rounded-sm font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-slate-800 transition-all">
              <Link href="/aula-virtual" target="_blank" rel="noopener noreferrer">Ir al Aula Virtual</Link>
            </Button>
          ) : (
            <Button asChild className="w-full h-12 bg-blue-600 text-white rounded-sm font-black uppercase tracking-widest text-[10px] shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all hover:scale-[1.02]">
              <Link href={enrollUrl} target="_blank" rel="noopener noreferrer">Inscribirme Ahora</Link>
            </Button>
          )}
          
          <p className="text-[9px] text-center font-black text-slate-400 uppercase tracking-widest">Garantía de Satisfacción 100%</p>
        </div>

        <div className="pt-6 border-t border-slate-100 space-y-4">
          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">¿Qué incluye?</p>
          <ul className="space-y-3">
            {[
              "Lecciones en alta definición",
              "Archivos de proyecto descargables",
              "Soporte técnico directo",
              "Certificado de finalización",
              "Acceso al aula virtual 24/7"
            ].map(item => (
              <li key={item} className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                <ChevronRight className="size-3 text-blue-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
