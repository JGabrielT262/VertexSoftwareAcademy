import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSiteContent } from "@/lib/site-content";

export default async function Home() {
  const heroImageUrl = await getSiteContent<string>(
    "home.hero.imageUrl",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80"
  );

  const popular = [
    "Software a medida",
    "Automatización",
    "Integraciones",
    "Cursos",
    "Aula virtual",
  ];

  return (
    <div className="relative overflow-hidden bg-slate-50/50">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1400px] pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-indigo-100/20 rounded-full blur-[100px]" />
      </div>

      <section className="relative w-full px-4 pt-10 pb-14 sm:pt-20 sm:pb-24">
        <div className="mx-auto max-w-[1400px] grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -left-8 -top-8 h-24 w-24 border-2 border-blue-600/10 rounded-full" />
            <div className="absolute -right-8 -bottom-8 h-32 w-32 border-2 border-indigo-600/10 rounded-full" />

            <div className="relative overflow-hidden rounded-sm border border-white shadow-2xl shadow-blue-500/10 group">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={heroImageUrl}
                  alt="Vertex Software"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
              </div>
            </div>

            <div className="absolute -right-6 top-12 hidden w-64 border border-white/50 bg-white/80 backdrop-blur-md p-4 rounded-sm shadow-xl sm:block transition-transform hover:-translate-y-1">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Dual Core</p>
              <p className="text-xs font-bold text-slate-700">Cursos y software industrial en una sola marca.</p>
            </div>
          </div>

          <div className="relative z-10 order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100/50 border border-blue-100 rounded-sm">
                <span className="flex h-2 w-2 rounded-none bg-blue-600 animate-pulse" />
                <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.4em]">Vertex Software</span>
              </div>
              <h1 className="text-balance text-6xl font-black tracking-tighter text-slate-900 leading-[0.95] uppercase italic">
                Domina el <span className="text-blue-600">futuro</span> con Vertex Software
              </h1>
              <p className="max-w-xl text-lg text-slate-500 leading-relaxed font-medium">
                Software industrial a medida, automatización e integraciones. Formamos a tu equipo técnico con una metodología orientada a producción.
              </p>
            </div>

            <div className="flex w-full max-w-xl gap-3">
              <Input
                placeholder="¿Qué necesitas construir?"
                className="h-14 rounded-sm border-white bg-white shadow-xl shadow-blue-900/5 text-slate-900 placeholder:text-slate-400 px-6"
              />
              <Button className="h-14 rounded-sm bg-blue-600 px-8 text-white hover:bg-blue-700 font-black uppercase tracking-widest shadow-xl shadow-blue-500/30 transition-all hover:scale-105">
                Cotizar
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-400">
              <span className="text-slate-900 mr-2">Especialidades:</span>
              {popular.map((p) => (
                <Link
                  key={p}
                  href="/contactenos"
                  className="rounded-sm border border-white bg-white/50 px-4 py-1.5 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
                >
                  {p}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="software" className="relative w-full px-4 pb-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic">
                Nuestras Soluciones
              </h2>
              <p className="mt-2 text-slate-500 font-medium">
                Software diseñado para vender, operar y escalar procesos industriales.
              </p>
            </div>
            <Link href="/contactenos" className="hidden text-xs font-black text-blue-600 uppercase tracking-widest hover:underline sm:block">
              Ver todas las categorías →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Software a medida", desc: "Paneles, módulos, roles y reportes.", icon: "01" },
              { title: "Automatización", desc: "Bots, scripts, procesos y alertas.", icon: "02" },
              { title: "Integraciones", desc: "APIs, webhooks, pagos y sistemas.", icon: "03" },
              { title: "Cursos", desc: "Formación práctica ligada al aula virtual.", icon: "04" },
            ].map((c) => (
              <div key={c.title} className="group relative rounded-2xl border border-white bg-white/50 backdrop-blur-sm p-8 transition-all hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200">
                <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  {c.icon}
                </div>
                <div className="mt-6 text-lg font-black text-slate-900 uppercase tracking-tight">
                  {c.title}
                </div>
                <div className="mt-2 text-sm text-slate-500 font-medium leading-relaxed">{c.desc}</div>
                <div className="mt-6 h-1 w-12 bg-blue-600/20 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>

          <div className="mt-16 relative overflow-hidden rounded-3xl border border-white bg-gradient-to-r from-blue-600 to-indigo-700 p-10 shadow-2xl shadow-blue-900/20 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10 space-y-2">
              <div className="text-2xl font-black text-white uppercase italic tracking-tight">
                ¿Listo para escalar tu empresa?
              </div>
              <div className="text-blue-50 font-medium max-w-xl">
                Cuéntanos tu objetivo técnico y te propondremos un plan de implementación optimizado para tu industria.
              </div>
            </div>
            <div className="mt-8 flex gap-3 sm:mt-0 relative z-10">
              <Button asChild className="h-14 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 px-8 font-black uppercase tracking-widest shadow-xl">
                <Link href="/contactenos">Contactar Ahora</Link>
              </Button>
              <Button asChild variant="outline" className="h-14 rounded-2xl border-white/30 bg-transparent text-white hover:bg-white/10 px-8 font-black uppercase tracking-widest">
                <Link href="/cursos">Explorar Cursos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
