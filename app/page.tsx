"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeroVisual } from "@/components/page-hero-visual";
import { Reveal } from "@/components/reveal";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function Home() {
  const fallbackHeroImageUrl =
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80";

  const hasEnv = useMemo(() => {
    return (
      !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
    );
  }, []);

  const [heroImageUrl, setHeroImageUrl] = useState(fallbackHeroImageUrl);

  useEffect(() => {
    if (!hasEnv) return;

    let canceled = false;

    (async () => {
      try {
        const supabase = createSupabaseBrowserClient();
        const { data } = await supabase
          .from("site_content")
          .select("value")
          .eq("key", "home.hero.imageUrl")
          .maybeSingle<{ value: unknown }>();

        const value = typeof data?.value === "string" ? data.value : null;
        if (!canceled && value) setHeroImageUrl(value);
      } catch {}
    })();

    return () => {
      canceled = true;
    };
  }, [hasEnv]);

  const featuredCourses = [
    {
      title: "Desarrollo Web Full Stack",
      description:
        "HTML, CSS, JavaScript, React, Next.js, Node.js y PostgreSQL con proyectos reales.",
      level: "Desde cero",
      duration: "12 semanas",
    },
    {
      title: "Python Profesional",
      description: "APIs, automatización, IA y scraping con buenas prácticas.",
      level: "Intermedio",
      duration: "8 semanas",
    },
    {
      title: "React Native",
      description: "Expo, consumo de APIs y publicación en Android/iOS.",
      level: "Intermedio",
      duration: "8 semanas",
    },
    {
      title: "SQL y Bases de Datos",
      description: "PostgreSQL + Supabase, modelado y consultas para producción.",
      level: "Desde cero",
      duration: "6 semanas",
    },
  ];

  const benefits = [
    "Proyectos reales guiados paso a paso",
    "Clases en vivo y grabadas",
    "Acceso por suscripción y control de progreso",
    "Panel del estudiante moderno",
  ];

  const tech = ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Supabase"];

  const aiAutomation = [
    {
      title: "Automatización con IA",
      text: "Crea flujos para ahorrar tiempo: extracción de datos, reportes, limpieza y generación de contenido con control y trazabilidad.",
    },
    {
      title: "Apps con IA (LLMs)",
      text: "Integra chat, asistentes y herramientas en tus apps con prompts, validación, streaming y seguridad.",
    },
    {
      title: "IA para bases de datos",
      text: "Convierte preguntas en SQL, analiza rendimiento, y documenta consultas con ayuda de IA sin perder el control del resultado.",
    },
    {
      title: "RAG básico",
      text: "Construye búsqueda con contexto: documentos, embeddings, recuperación y respuestas basadas en datos reales.",
    },
  ];

  const paths = [
    {
      title: "Ruta Full Stack",
      items: ["Web moderna", "APIs", "Auth", "Bases de datos", "Deploy"],
    },
    {
      title: "Ruta Python + Automatización",
      items: ["Scripts", "APIs", "Scraping", "Tareas programadas", "Reportes"],
    },
    {
      title: "Ruta Datos + SQL",
      items: ["SQL", "Modelado", "Optimización", "Supabase", "RLS"],
    },
    {
      title: "Ruta IA aplicada",
      items: ["Prompts", "RAG básico", "Integración en apps", "Buenas prácticas"],
    },
  ];

  const howItWorks = [
    {
      title: "Regístrate",
      text: "Crea tu cuenta y accede al aula virtual.",
    },
    {
      title: "Inscríbete",
      text: "Elige un curso o plan y se habilita el acceso según tu inscripción.",
    },
    {
      title: "Aprende por módulos",
      text: "Contenido ordenado por módulos y lecciones, con recursos y proyectos.",
    },
    {
      title: "Construye proyectos",
      text: "Avanza con entregables reales para tu portafolio.",
    },
  ];

  const faqs = [
    {
      q: "¿Necesito experiencia previa?",
      a: "No. Tenemos rutas desde cero y material complementario para nivelarte rápido.",
    },
    {
      q: "¿Cómo se accede a las clases?",
      a: "Desde tu dashboard. Si estás inscrito, verás clases en vivo y grabaciones.",
    },
    {
      q: "¿Puedo ver una clase de prueba?",
      a: "Sí. Los cursos pueden incluir lecciones de preview (is_preview) visibles sin inscripción.",
    },
    {
      q: "¿Qué incluye la suscripción?",
      a: "Acceso a cursos habilitados, recursos y seguimiento de progreso según tu plan.",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.35),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.30),transparent_55%)]" />

      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              Aprende programación desde cero y construye proyectos reales.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-4 max-w-xl text-pretty text-lg text-white/70"
            >
              Plataforma moderna para estudiar, ver clases, seguir tu progreso y
              acceder a contenido según tu suscripción.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button asChild className="bg-blue-600 hover:bg-blue-500">
                <Link href="/cursos">Ver cursos</Link>
              </Button>
              <Button asChild variant="secondary" className="bg-white/10">
                <Link href="/register">Comenzar ahora</Link>
              </Button>
              <Button asChild variant="secondary" className="bg-white/10">
                <Link href="/planes">Ver planes</Link>
              </Button>
            </motion.div>
          </div>

          <PageHeroVisual
            title="Dashboard futurista"
            subtitle="Aula virtual, progreso y recursos en un solo lugar."
            imageUrl={heroImageUrl}
            variant="violet"
          />
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-16">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Cursos destacados
              </h2>
              <p className="mt-2 text-white/70">
                Rutas claras, enfoque práctico y acceso controlado por inscripción.
              </p>
            </div>
            <Button
              asChild
              variant="secondary"
              className="hidden bg-white/10 sm:inline-flex"
            >
              <Link href="/cursos">Ver todos</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCourses.map((c) => (
              <Card
                key={c.title}
                className="v3d-tilt border-white/10 bg-white/5"
              >
                <CardHeader>
                  <CardTitle className="text-base">{c.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-white/70">
                  <p>{c.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-white/10 px-2 py-1">
                      {c.level}
                    </span>
                    <span className="rounded-full bg-white/10 px-2 py-1">
                      {c.duration}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-16">
        <Reveal delay={0.05}>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-xl">Beneficios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-white/70">
                {benefits.map((b) => (
                  <div key={b} className="flex gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                    <div>{b}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-xl">Tecnologías</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </CardContent>
            </Card>
          </div>
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-16">
        <Reveal delay={0.05}>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Programación + automatización con IA
          </h2>
          <p className="max-w-3xl text-white/70">
            Aprende a construir software y a usar IA de forma práctica: automatiza tareas,
            integra asistentes y trabaja con bases de datos con mentalidad de producción.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aiAutomation.map((a) => (
            <Card key={a.title} className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">{a.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/70">{a.text}</CardContent>
            </Card>
          ))}
        </div>
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-16">
        <Reveal delay={0.08}>
          <h2 className="text-2xl font-semibold tracking-tight">Rutas de aprendizaje</h2>
          <p className="mt-2 max-w-3xl text-white/70">
            Elige una ruta o combina varias. Cada ruta tiene cursos, módulos y proyectos.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {paths.map((p) => (
              <Card key={p.title} className="border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle className="text-base">{p.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-white/70">
                  {p.items.map((it) => (
                    <div key={it} className="flex gap-2">
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-white/50" />
                      <div>{it}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-16">
        <Reveal delay={0.08}>
          <h2 className="text-2xl font-semibold tracking-tight">Cómo funciona</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {howItWorks.map((s) => (
              <Card key={s.title} className="border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle className="text-base">{s.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-white/70">{s.text}</CardContent>
              </Card>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="faq" className="relative mx-auto max-w-6xl px-4 pb-20">
        <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map((f) => (
            <Card key={f.q} className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">{f.q}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/70">{f.a}</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
