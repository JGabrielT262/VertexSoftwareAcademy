import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type CourseRow = {
  id: string;
  title: string | null;
  slug: string | null;
  published: boolean | null;
};

type ProfileRow = {
  role: string | null;
  full_name: string | null;
};

export default async function AdminPage() {
  const hasEnv =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!hasEnv) {
    return (
      <div className="w-full px-4 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">Admin</h1>
        <p className="mt-2 text-white/70">
          Configura Supabase para activar el panel administrador.
        </p>
      </div>
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role,full_name")
    .eq("id", user.id)
    .maybeSingle()
    .returns<ProfileRow | null>();

  const isAdmin = (profile?.role ?? "student") === "admin";

  if (!isAdmin) {
    return (
      <div className="w-full px-4 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">Admin</h1>
        <p className="mt-2 text-white/70">Acceso restringido.</p>
        <div className="mt-6">
          <Button asChild variant="secondary" className="bg-white/10">
            <Link href="/dashboard">Volver al dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { data: courses } = await supabase
    .from("courses")
    .select("id,title,slug,published")
    .order("created_at", { ascending: false })
    .returns<CourseRow[]>();

  return (
    <div className="w-full px-4 py-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Admin</h1>
          <p className="mt-2 text-white/70">
            Bienvenido{profile?.full_name ? `, ${profile.full_name}` : ""}.
          </p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-500">
          <Link href="/cursos">Ver catálogo</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-base">Gestión de cursos (MVP)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              Próximo paso: formularios de crear/editar cursos, subir miniatura y
              publicar.
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              Próximo paso: CRUD de módulos/lecciones y ordenamiento.
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-base">Cursos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-white/70">
            {(courses ?? []).length ? (
              (courses ?? []).slice(0, 8).map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="truncate text-white">{c.title ?? "Curso"}</div>
                  <div className="text-xs text-white/60">
                    {c.published ? "Publicado" : "Borrador"}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white/60">
                Aún no hay cursos. Crea uno desde Supabase o agrega el CRUD.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
