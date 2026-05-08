import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { BadgeCheck } from "lucide-react";

type Course = {
  id: string;
  title: string | null;
  slug: string | null;
  description: string | null;
  thumbnail: string | null;
  price: number | null;
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
      title: "Curso demo",
      slug,
      description:
        "Configura Supabase para ver el detalle real del curso, módulos y lecciones.",
      thumbnail: null,
      price: 0,
      level: "—",
      duration: "—",
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

  return (
    <div className="w-full px-4 py-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            {course.title ?? "Curso"}
          </h1>
          <p className="mt-3 text-slate-600">{course.description ?? "—"}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1 border border-slate-200 bg-white px-2 py-1 text-slate-900">
              <BadgeCheck className="size-3.5" />
              Certificado
            </span>
            {course.level ? (
              <span className="border border-slate-200 bg-white px-2 py-1 text-slate-700">
                {course.level}
              </span>
            ) : null}
            {course.duration ? (
              <span className="border border-slate-200 bg-white px-2 py-1 text-slate-700">
                {course.duration}
              </span>
            ) : null}
            {typeof course.price === "number" ? (
              <span className="border border-slate-200 bg-white px-2 py-1 text-slate-700">
                S/ {course.price}
              </span>
            ) : null}
          </div>
        </div>

        <div className="w-full max-w-sm">
          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="text-base text-slate-900">Acceso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-600">
              {course.id === "demo-course" ? (
                <div>
                  Vista demo. Configura Supabase y publica el curso para activar
                  el acceso real.
                </div>
              ) : userId ? (
                isEnrolled ? (
                  <div className="space-y-3">
                    <div>Ya estás inscrito.</div>
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-500">
                      <Link href="/aula-virtual">Ir al aula virtual</Link>
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-500">
                    <Link
                      href={`/aula-virtual?checkout=course&courseSlug=${encodeURIComponent(slug)}`}
                    >
                      Contratar curso
                    </Link>
                  </Button>
                )
              ) : (
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-500">
                  <Link
                    href={`/aula-virtual?checkout=course&courseSlug=${encodeURIComponent(slug)}`}
                  >
                    Contratar curso
                  </Link>
                </Button>
              )}

              <Button asChild variant="outline" className="w-full border-slate-200 bg-white text-slate-900 hover:bg-slate-50">
                <Link href="/cursos">Ver otros cursos</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <Card className="border-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="text-base text-slate-900">Módulos y lecciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-600">
            {lessonsByModule.length ? (
              lessonsByModule.map(({ module, lessons: moduleLessons }) => (
                <div key={module.id} className="space-y-2">
                  <div className="font-medium text-slate-900">
                    {module.title ?? "Módulo"}
                  </div>
                  <div className="space-y-1">
                    {moduleLessons.length ? (
                      moduleLessons.map((l) => (
                        <div
                          key={l.id}
                          className="flex items-center justify-between gap-4 border border-slate-200 bg-white px-3 py-2"
                        >
                          <div className="truncate">{l.title ?? "Lección"}</div>
                          <div className="text-xs text-slate-500">
                            {l.is_preview ? "Preview" : "Solo inscritos"}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-slate-500">Sin lecciones aún.</div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-slate-500">
                Aún no hay módulos publicados para este curso.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="text-base text-slate-900">Reproductor (MVP)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <div className="border border-slate-200 bg-slate-50 p-4">
              Integra aquí YouTube privado, Vimeo, Bunny o Cloudflare Stream.
            </div>
            <div>
              Recomendación: embebe el video y controla acceso con inscripción
              (RLS + checks en servidor).
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
