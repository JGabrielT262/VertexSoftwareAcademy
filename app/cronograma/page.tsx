import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeroVisual } from "@/components/page-hero-visual";
import { Reveal } from "@/components/reveal";
import { getSiteContent } from "@/lib/site-content";

type Temporada = {
  id: string;
  course: string;
  startDate: string;
  endDate: string;
  schedule: string;
  status: "activa" | "pasada" | "proxima";
};

export default async function CronogramaPage() {
  const heroImageUrl = await getSiteContent<string>(
    "cronograma.hero.imageUrl",
    "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80"
  );

  const temporadas: Temporada[] = [
    {
      id: "t-python-2026-1",
      course: "Python Profesional",
      startDate: "2026-05-12",
      endDate: "2026-07-06",
      schedule: "2 clases en vivo/semana + grabaciones",
      status: "activa",
    },
    {
      id: "t-sql-2026-1",
      course: "SQL y Bases de Datos",
      startDate: "2026-04-01",
      endDate: "2026-05-13",
      schedule: "2 clases/semana + práctica",
      status: "pasada",
    },
    {
      id: "t-ia-apps-2026-1",
      course: "Creación de Apps con IA (LLMs)",
      startDate: "2026-07-15",
      endDate: "2026-08-26",
      schedule: "1 clase + 1 sesión de práctica/semana",
      status: "proxima",
    },
    {
      id: "t-next-2026-1",
      course: "Next.js para Producción",
      startDate: "2026-09-02",
      endDate: "2026-10-14",
      schedule: "2 clases/semana + proyecto final",
      status: "proxima",
    },
  ];

  const activa = temporadas.filter((t) => t.status === "activa");
  const pasadas = temporadas.filter((t) => t.status === "pasada");
  const proximas = temporadas.filter((t) => t.status === "proxima");

  function label(status: Temporada["status"]) {
    if (status === "activa") return "Activa";
    if (status === "pasada") return "Pasada";
    return "Próxima";
  }

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-72 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.22),transparent_60%),radial-gradient(ellipse_at_left,rgba(251,113,133,0.16),transparent_55%)]" />
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Cronograma de temporadas
            </h1>
            <p className="mt-2 max-w-3xl text-white/70">
              Las clases en vivo se organizan por temporadas (ciclos). Aquí ves la
              temporada activa, las pasadas y las próximas con fecha de inicio y fin.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="bg-blue-600 hover:bg-blue-500">
                <Link href="/planes">Ver planes</Link>
              </Button>
              <Button asChild variant="secondary" className="bg-white/10">
                <Link href="/cursos">Ver cursos</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <PageHeroVisual
            title="Calendario de clases"
            subtitle="Temporada activa, pasadas y próximas."
            imageUrl={heroImageUrl}
            variant="amber"
          />
        </Reveal>
      </div>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            Temporada activa
          </h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {activa.length ? (
              activa.map((t) => (
                <Card
                  key={t.id}
                  className="v3d-tilt border-blue-500/40 bg-gradient-to-b from-blue-500/10 to-violet-600/10"
                >
                  <CardHeader>
                    <CardTitle className="text-base">{t.course}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-white/70">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-white/10 px-2 py-1">
                        {label(t.status)}
                      </span>
                      <span className="rounded-full bg-white/10 px-2 py-1">
                        Inicio: {t.startDate}
                      </span>
                      <span className="rounded-full bg-white/10 px-2 py-1">
                        Fin: {t.endDate}
                      </span>
                    </div>
                    <div>{t.schedule}</div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="v3d-tilt border-white/10 bg-white/5 lg:col-span-3">
                <CardHeader>
                  <CardTitle className="text-base">Sin temporada activa</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-white/70">
                  Publica una temporada para mostrarla aquí.
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">Próximas temporadas</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {proximas.map((t) => (
              <Card key={t.id} className="v3d-tilt border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle className="text-base">{t.course}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-white/70">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-white/10 px-2 py-1">
                      {label(t.status)}
                    </span>
                    <span className="rounded-full bg-white/10 px-2 py-1">
                      Inicio: {t.startDate}
                    </span>
                    <span className="rounded-full bg-white/10 px-2 py-1">
                      Fin: {t.endDate}
                    </span>
                  </div>
                  <div>{t.schedule}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">Temporadas pasadas</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {pasadas.map((t) => (
              <Card key={t.id} className="v3d-tilt border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle className="text-base">{t.course}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-white/70">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-white/10 px-2 py-1">
                      {label(t.status)}
                    </span>
                    <span className="rounded-full bg-white/10 px-2 py-1">
                      Inicio: {t.startDate}
                    </span>
                    <span className="rounded-full bg-white/10 px-2 py-1">
                      Fin: {t.endDate}
                    </span>
                  </div>
                  <div>{t.schedule}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}
