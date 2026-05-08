import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type EnrollmentRow = {
  id: string;
  created_at: string | null;
  course: {
    id: string;
    title: string | null;
    slug: string | null;
  } | null;
};

export default async function DashboardPage() {
  const hasEnv =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!hasEnv) {
    return (
      <div className="w-full px-4 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-white/70">
          Configura Supabase (.env.local) para activar el dashboard real.
        </p>
        <div className="mt-6">
          <Button asChild className="bg-blue-600 hover:bg-blue-500">
            <Link href="/cursos">Ver cursos</Link>
          </Button>
        </div>
      </div>
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("id,created_at,course:courses(id,title,slug)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .returns<EnrollmentRow[]>();

  const safeEnrollments = enrollments ?? [];

  return (
    <div className="w-full px-4 py-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-white/70">
            Bienvenido{user.email ? `: ${user.email}` : ""}.
          </p>
        </div>
        <Button asChild variant="secondary" className="bg-white/10">
          <Link href="/cursos">Explorar cursos</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Card className="border-white/10 bg-white/5 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Mis cursos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-white/70">
            {safeEnrollments.length ? (
              safeEnrollments.map((e) => {
                const title = e.course?.title ?? "Curso";
                const slug = e.course?.slug ?? "";
                const href = slug ? `/cursos/${slug}` : "/cursos";
                return (
                  <div
                    key={e.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div className="truncate text-white">{title}</div>
                    <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-500">
                      <Link href={href}>Abrir</Link>
                    </Button>
                  </div>
                );
              })
            ) : (
              <div className="text-white/60">
                Aún no tienes cursos inscritos. Explora el catálogo.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-base">Progreso (MVP)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              Próximo paso: tabla de progreso por lección + “última clase vista”.
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              Próximo paso: reproductor con lista lateral y marcar completado.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
