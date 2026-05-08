import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
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
    <div>
      <section className="w-full px-4 pt-10 pb-14 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-sm font-semibold text-slate-600">Cronograma</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
              Temporadas
            </h1>
            <p className="mt-4 max-w-3xl text-slate-600">
              Las clases en vivo se organizan por temporadas (ciclos). Aquí ves la temporada activa, las pasadas y las próximas con fecha de inicio y fin.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild className="h-11 rounded-md bg-slate-900 px-5 text-white hover:bg-slate-800">
                <Link href="/planes">Ver planes</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-md border-slate-200 bg-white px-5 text-slate-900 hover:bg-slate-50">
                <Link href="/cursos">Ver cursos</Link>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={heroImageUrl}
                alt="Calendario de clases"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 pb-20">
        <div className="grid gap-10">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Temporada activa
            </h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {activa.length ? (
                activa.map((t) => (
                  <div key={t.id} className="rounded-md border border-slate-200 bg-white p-5">
                    <div className="text-base font-semibold text-slate-900">{t.course}</div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-700">
                      <span className="border border-slate-200 bg-white px-2 py-1">
                        {label(t.status)}
                      </span>
                      <span className="border border-slate-200 bg-white px-2 py-1">
                        Inicio: {t.startDate}
                      </span>
                      <span className="border border-slate-200 bg-white px-2 py-1">
                        Fin: {t.endDate}
                      </span>
                    </div>
                    <div className="mt-3 text-sm text-slate-600">{t.schedule}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-md border border-slate-200 bg-white p-5 lg:col-span-3">
                  <div className="text-base font-semibold text-slate-900">Sin temporada activa</div>
                  <div className="mt-2 text-sm text-slate-600">Publica una temporada para mostrarla aquí.</div>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Próximas temporadas
            </h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {proximas.map((t) => (
                <div key={t.id} className="rounded-md border border-slate-200 bg-white p-5">
                  <div className="text-base font-semibold text-slate-900">{t.course}</div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-700">
                    <span className="border border-slate-200 bg-white px-2 py-1">{label(t.status)}</span>
                    <span className="border border-slate-200 bg-white px-2 py-1">Inicio: {t.startDate}</span>
                    <span className="border border-slate-200 bg-white px-2 py-1">Fin: {t.endDate}</span>
                  </div>
                  <div className="mt-3 text-sm text-slate-600">{t.schedule}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Temporadas pasadas
            </h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {pasadas.map((t) => (
                <div key={t.id} className="rounded-md border border-slate-200 bg-white p-5">
                  <div className="text-base font-semibold text-slate-900">{t.course}</div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-700">
                    <span className="border border-slate-200 bg-white px-2 py-1">{label(t.status)}</span>
                    <span className="border border-slate-200 bg-white px-2 py-1">Inicio: {t.startDate}</span>
                    <span className="border border-slate-200 bg-white px-2 py-1">Fin: {t.endDate}</span>
                  </div>
                  <div className="mt-3 text-sm text-slate-600">{t.schedule}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
