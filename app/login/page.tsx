"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = useMemo(
    () => searchParams.get("next") ?? "/dashboard",
    [searchParams]
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error("Revisa tu correo y contraseña.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword(parsed.data);
      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Sesión iniciada.");
      router.push(nextPath);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--accent-1),0.26),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(var(--accent-2),0.20),transparent_55%)]" />
          <div className="relative">
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Vuelve al aula y sigue construyendo.
            </h1>
            <p className="mt-3 max-w-xl text-pretty text-white/70">
              Accede a tus cursos, revisa recursos y continúa tu progreso con una
              experiencia limpia y profesional.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/75">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Dashboard
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Progreso
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Recursos
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Certificados
              </span>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">Acceso</div>
                <div className="mt-1 text-sm font-medium text-white">Seguro</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">Rutas</div>
                <div className="mt-1 text-sm font-medium text-white">Claras</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">Enfoque</div>
                <div className="mt-1 text-sm font-medium text-white">
                  Proyectos
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="relative w-full rounded-xl border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-xl">Iniciar sesión</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-white/80">Correo</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  type="email"
                  autoComplete="email"
                  className="rounded-lg border-white/10 bg-white/5"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/80">Contraseña</label>
                <div className="relative">
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="rounded-lg border-white/10 bg-white/5 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-white/80 hover:bg-white/10"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-[rgba(var(--accent-1),1)] to-[rgba(var(--accent-2),1)] text-white hover:brightness-110"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="text-sm text-white/70">
              ¿No tienes cuenta?{" "}
              <Link
                href="/register"
                className="text-[color:rgba(var(--accent-1),1)] hover:brightness-110"
              >
                Regístrate
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
