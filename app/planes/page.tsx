import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeroVisual } from "@/components/page-hero-visual";
import { Reveal } from "@/components/reveal";
import { getSiteContent } from "@/lib/site-content";

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
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-72 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.30),transparent_60%),radial-gradient(ellipse_at_right,rgba(34,211,238,0.16),transparent_55%)]" />
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Planes</h1>
            {isOnboarding ? (
              <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
                Paso 2: selecciona un plan para activar tu acceso. Si eliges{" "}
                <span className="text-white font-medium">Gratuito</span>, entras directo
                al aula virtual.
              </div>
            ) : null}
            <p className="mt-2 max-w-3xl text-white/70">
              La suscripción es mensual y se renueva automáticamente hasta que la
              canceles. Con tu plan accedes al aula virtual, grabaciones, soporte y a
              las clases en vivo según el cronograma y tu nivel de plan.
            </p>
            <p className="mt-2 max-w-3xl text-white/60 text-sm">
              Revisa el cronograma para ver qué cursos están activos este mes, cuáles
              vienen después y las fechas de inicio/fin.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="bg-blue-600 hover:bg-blue-500">
                <Link href="/cronograma">Ver cronograma</Link>
              </Button>
              <Button asChild variant="secondary" className="bg-white/10">
                <Link href="/cursos">Ver cursos</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <PageHeroVisual
            title="Suscripción mensual"
            subtitle="Grabaciones, soporte y clases en vivo según plan."
            imageUrl={heroImageUrl}
            variant="emerald"
          />
        </Reveal>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {Object.values(plans).map((p) => (
          <Card
            key={p.name}
            className={
              p.name.startsWith("Pro")
                ? "v3d-tilt border-blue-500/40 bg-gradient-to-b from-blue-500/10 to-violet-600/10"
                : "v3d-tilt border-white/10 bg-white/5"
            }
          >
            <CardHeader>
              <CardTitle className="text-base">{p.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-white/70">
              <div className="text-3xl font-semibold text-white">{p.price}</div>
              <div>{p.subtitle}</div>
              <div className="space-y-2 text-sm">
                {p.items.map((it) => (
                  <div key={it} className="flex gap-2">
                    <div
                      className={
                        p.name.startsWith("Pro")
                          ? "mt-2 h-1.5 w-1.5 rounded-full bg-blue-300"
                          : "mt-2 h-1.5 w-1.5 rounded-full bg-white/50"
                      }
                    />
                    <div>{it}</div>
                  </div>
                ))}
              </div>
              <Button
                asChild
                className={
                  p.name.startsWith("Pro")
                    ? "w-full bg-blue-600 hover:bg-blue-500"
                    : "w-full bg-white/10"
                }
                variant={p.name.startsWith("Pro") ? "default" : "secondary"}
              >
                <Link href={p.cta.href}>{p.cta.label}</Link>
              </Button>
              {p.name.startsWith("Pro") ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
                  Beneficio Pro: descuento de referencia{" "}
                  <span className="text-white font-medium">20%</span> en cursos
                  individuales seleccionados.
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <Reveal>
          <Card className="v3d-tilt border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-base">Cronograma</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-white/70">
              <div>
                Mira el curso activo, los próximos y los pasados con fechas de inicio y
                fin.
              </div>
              <Button asChild className="bg-blue-600 hover:bg-blue-500">
                <Link href="/cronograma">Ver cronograma</Link>
              </Button>
            </CardContent>
          </Card>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <Reveal>
          <Card className="v3d-tilt border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-base">
                ¿Y si quiero un curso específico?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-white/70">
              <div>
                Los cursos individuales se compran aparte y son independientes de la
                suscripción. Son ideales si quieres un tema puntual o clases privadas.
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/65">
                Pro: obtienes descuentos en cursos individuales seleccionados.
              </div>
              <Button asChild className="bg-blue-600 hover:bg-blue-500">
                <Link href="/cursos">Ver cursos individuales</Link>
              </Button>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.05}>
          <Card className="v3d-tilt border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-base">¿Necesitas ayuda para elegir?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-white/70">
              <div>
                Dinos tu objetivo y te recomendamos la temporada, el plan y los cursos.
              </div>
              <Button asChild variant="secondary" className="bg-white/10">
                <Link href="/contactenos">Contáctenos</Link>
              </Button>
            </CardContent>
          </Card>
        </Reveal>
      </div>
      </div>
    </div>
  );
}
