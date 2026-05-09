import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Planes de Suscripción",
  description: "Elige el plan que mejor se adapte a tu formación técnica. Acceso total al ecosistema de aprendizaje Vertex, laboratorios y mentorías.",
};

export default async function PlanesPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const heroImageUrl = await getSiteContent<string>(
    "planes.hero.imageUrl",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
  );

  const sp = await Promise.resolve(searchParams);
  const flow = typeof sp?.flow === "string" ? sp.flow : "";
  const isOnboarding = flow === "onboarding";

  const plans = {
    gratuito: {
      name: "Gratuito",
      price: "S/ 0",
      subtitle: "Para probar la plataforma y ver material gratuito.",
      items: [
        "Contenido gratuito",
        "Primera clase grabada (seleccionada)",
        "Previews de cursos",
        "Acceso limitado al aula virtual",
      ],
      cta: {
        label: isOnboarding ? "Elegir Gratis" : "Ir al aula virtual",
        href: "/aula-virtual?plan=gratuito",
      },
    },
    medio: {
      name: "Medio (Suscripción mensual)",
      price: "S/ 59 / mes",
      subtitle:
        "Acceso a cursos en vivo y grabaciones según cronograma + soporte asíncrono.",
      items: [
        "Clases grabadas (biblioteca del plan)",
        "Acceso a cursos en vivo (según cupo/plan)",
        "Recursos descargables",
        "Chat de ayuda (asíncrono)",
        "Aula virtual (según plan)",
      ],
      cta: { label: isOnboarding ? "Elegir Medio" : "Suscribirme", href: "/aula-virtual?checkout=plan&plan=medio" },
    },
    pro: {
      name: "Pro (Suscripción mensual)",
      price: "S/ 129 / mes",
      subtitle:
        "Para avanzar rápido: clases en vivo + soporte en tiempo real + beneficios extra.",
      items: [
        "Clases grabadas + clases online (según cronograma)",
        "Chat en tiempo real para consultas",
        "Contacto directo con profesores",
        "Seguimiento de progreso",
        "Asesoramientos",
        "Aula virtual (según plan)",
        "Descuentos en cursos individuales (clases privadas)",
      ],
      cta: { label: isOnboarding ? "Elegir Pro" : "Activar Pro", href: "/aula-virtual?checkout=plan&plan=pro" },
    },
  };

  return (
    <div className="bg-[#f8fafc]">
      <section className="w-full px-4 pt-12 pb-16 sm:pt-16">
        <div className="mx-auto max-w-[1200px] grid gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-3">
              Vertex Academy • Access Plans
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 uppercase">
              Suscripción <span className="text-blue-600">Mensual</span>
            </h1>
            
            {isOnboarding && (
              <div className="mt-6 border-l-4 border-blue-600 bg-blue-50/50 p-4">
                <p className="text-[10px] font-black uppercase text-blue-700 tracking-widest">Paso 02: Configuración de Acceso</p>
                <p className="mt-1 text-xs font-bold text-slate-600 uppercase tracking-tight">
                  Selecciona un plan para activar tu entorno. El plan <span className="text-slate-900 font-black underline">Gratuito</span> permite acceso inmediato.
                </p>
              </div>
            )}

            <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-slate-500">
              Escalabilidad técnica sin permanencia. Acceso total al ecosistema de aprendizaje Vertex, laboratorios y sesiones de mentoría en vivo.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="h-12 rounded-sm bg-blue-600 px-8 text-[10px] font-black uppercase tracking-widest text-white hover:bg-blue-700 shadow-xl shadow-blue-500/20">
                <Link href="/cursos#cronograma">Ver Cronograma</Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-sm border-slate-200 bg-white px-8 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50">
                <Link href="/cursos">Explorar Cursos</Link>
              </Button>
            </div>
          </div>

          <div className="relative group">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-2xl">
              <Image
                src={heroImageUrl}
                alt="Planes Vertex Software"
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 h-32 w-32 border-b-2 border-r-2 border-blue-600/20 -z-10" />
          </div>
        </div>
      </section>

      <section className="w-full px-4 pb-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-6 md:grid-cols-3">
            {Object.entries(plans).map(([key, p]) => {
              const isPro = key === "pro";
              const isMedio = key === "medio";
              
              return (
                <div
                  key={p.name}
                  className={`relative flex flex-col border rounded-sm transition-all duration-300 ${
                    isPro 
                      ? "border-blue-600 shadow-2xl shadow-blue-500/10 scale-105 z-10 bg-white" 
                      : "border-slate-100 bg-white hover:border-slate-300 shadow-sm"
                  }`}
                >
                  {isPro && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 text-[8px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
                      Recomendado
                    </div>
                  )}
                  
                  <div className="p-8 border-b border-slate-50">
                    <h2 className={`text-[10px] font-black uppercase tracking-[0.3em] ${isPro ? 'text-blue-600' : 'text-slate-400'}`}>
                      Nivel {p.name.split(' ')[0]}
                    </h2>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{p.price.split(' ')[1]}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.price.split(' ')[2] ? '/ mes' : ''}</span>
                    </div>
                    <p className="mt-4 text-[11px] font-bold text-slate-500 leading-relaxed min-h-[40px] uppercase">
                      {p.subtitle}
                    </p>
                  </div>

                  <div className="flex-1 p-8 bg-slate-50/30">
                    <div className="space-y-4">
                      {p.items.map((it) => (
                        <div key={it} className="flex gap-3 items-start">
                          <div className={`mt-1 h-1.5 w-1.5 shrink-0 ${isPro ? 'bg-blue-600' : 'bg-slate-300'}`} />
                          <span className="text-[10px] font-bold text-slate-600 uppercase leading-tight">{it}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-8 mt-auto">
                    <Button
                      asChild
                      className={`h-12 w-full rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${
                        isPro
                          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      <Link href={p.cta.href}>{p.cta.label}</Link>
                    </Button>
                    
                    {isPro && (
                      <p className="mt-4 text-[8px] font-black text-blue-600 uppercase tracking-widest text-center">
                        ⚡ 20% Desc en Cursos Individuales
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full px-4 pb-20">
        <div className="mx-auto max-w-[1200px] grid gap-6 md:grid-cols-2">
          <div className="bg-white border border-slate-100 rounded-sm p-8 group hover:border-blue-500 transition-all">
            <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">Planificación</h4>
            <h3 className="mt-2 text-xl font-black text-slate-900 uppercase tracking-tighter">Cronograma Académico</h3>
            <p className="mt-3 text-xs font-bold text-slate-400 uppercase tracking-wide leading-relaxed">
              Consulta las fechas de inicio, cupos disponibles y lanzamientos de nuevas temporadas.
            </p>
            <div className="mt-8">
              <Button asChild className="h-10 rounded-sm bg-slate-900 px-6 text-[10px] font-black uppercase tracking-widest text-white hover:bg-slate-800">
                <Link href="/cursos#cronograma">Consultar Fechas</Link>
              </Button>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-sm p-8 group hover:border-blue-500 transition-all">
            <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">Asesoría</h4>
            <h3 className="mt-2 text-xl font-black text-slate-900 uppercase tracking-tighter">¿Necesitas Ayuda?</h3>
            <p className="mt-3 text-xs font-bold text-slate-400 uppercase tracking-wide leading-relaxed">
              Nuestro equipo técnico puede recomendarte el plan ideal según tu perfil profesional.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild className="h-10 rounded-sm bg-blue-600 px-6 text-[10px] font-black uppercase tracking-widest text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                <Link href="/contactenos">Hablar con Soporte</Link>
              </Button>
              <Button asChild variant="outline" className="h-10 rounded-sm border-slate-200 bg-white px-6 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50">
                <Link href="/cursos">Ver Catálogo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}
