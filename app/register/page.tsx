"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  confirmPassword: z.string().min(6),
  fullName: z.string().min(2),
  documentType: z.enum(["dni", "ce", "pasaporte"]),
  documentNumber: z.string().min(5).max(20),
  phone: z.string().min(7).max(20),
}).refine((v) => v.password === v.confirmPassword, {
  path: ["confirmPassword"],
  message: "Las contraseñas no coinciden.",
});

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [documentType, setDocumentType] = useState<"dni" | "ce" | "pasaporte">("dni");
  const [documentNumber, setDocumentNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "verify">("form");
  const [verifyEmail, setVerifyEmail] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = schema.safeParse({
      email,
      password,
      confirmPassword,
      fullName: fullName.trim(),
      documentType,
      documentNumber: documentNumber.trim(),
      phone: phone.trim(),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Revisa tus datos.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const origin = window.location.origin;
      const next = encodeURIComponent("/aula-virtual?flow=onboarding");
      const { error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
          data: {
            full_name: parsed.data.fullName,
            document_type: parsed.data.documentType,
            document_number: parsed.data.documentNumber,
            phone: parsed.data.phone,
          },
          emailRedirectTo: `${origin}/aula-virtual/login?next=${next}`,
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setVerifyEmail(parsed.data.email);
      setStep("verify");
      toast.success("Registro enviado. Revisa tu correo para verificar tu cuenta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full px-4 py-10 sm:py-14">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
        <Card className="relative w-full rounded-xl border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-xl">Crear cuenta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === "verify" ? (
              <div className="space-y-4 text-sm text-white/70">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-white font-medium">Verifica tu cuenta</div>
                  <div className="mt-2">
                    Te enviamos un mensaje a{" "}
                    <span className="text-white font-medium">{verifyEmail}</span>.
                    Abre el correo y confirma tu cuenta para continuar.
                  </div>
                  <div className="mt-2 text-xs text-white/60">
                    Si no lo ves, revisa Spam/Promociones.
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="button"
                    className="flex-1 rounded-lg bg-white/10 text-white hover:bg-white/15"
                    disabled={loading}
                    onClick={() => {
                      router.push(
                        `/aula-virtual/login?next=${encodeURIComponent(
                          "/aula-virtual?flow=onboarding"
                        )}`
                      );
                      router.refresh();
                    }}
                  >
                    Ya verifiqué, continuar
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1 rounded-lg bg-white/10"
                    disabled={loading}
                    onClick={() => setStep("form")}
                  >
                    Editar datos
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/80">Nombre completo</label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Tu nombre completo"
                    autoComplete="name"
                    className="rounded-lg border-white/10 bg-white/5"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-white/80">Documento</label>
                    <select
                      value={documentType}
                      onChange={(e) =>
                        setDocumentType(e.target.value as "dni" | "ce" | "pasaporte")
                      }
                      className="h-8 w-full rounded-lg border border-white/10 bg-[#0B1220] px-2.5 text-sm text-white outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                      disabled={loading}
                    >
                      <option value="dni" className="bg-[#0B1220] text-white">
                        DNI
                      </option>
                      <option value="ce" className="bg-[#0B1220] text-white">
                        Carnet de extranjería
                      </option>
                      <option value="pasaporte" className="bg-[#0B1220] text-white">
                        Pasaporte
                      </option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/80">Número</label>
                    <Input
                      value={documentNumber}
                      onChange={(e) => setDocumentNumber(e.target.value)}
                      placeholder="Número de documento"
                      className="rounded-lg border-white/10 bg-white/5"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/80">Teléfono</label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+51 9xx xxx xxx"
                    inputMode="tel"
                    autoComplete="tel"
                    className="rounded-lg border-white/10 bg-white/5"
                  />
                </div>

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
                      placeholder="Mínimo 6 caracteres"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
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

                <div className="space-y-2">
                  <label className="text-sm text-white/80">Confirmar contraseña</label>
                  <div className="relative">
                    <Input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repite tu contraseña"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      className="rounded-lg border-white/10 bg-white/5 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-white/80 hover:bg-white/10"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      aria-label={
                        showConfirmPassword ? "Ocultar confirmación" : "Mostrar confirmación"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-[rgba(var(--accent-2),1)] to-[rgba(var(--accent-3),1)] text-white hover:brightness-110"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Crear cuenta"}
                </Button>

                <div className="text-sm text-white/70">
                  ¿Ya tienes cuenta?{" "}
                  <Link
                    href="/login"
                    className="text-[color:rgba(var(--accent-3),1)] hover:brightness-110"
                  >
                    Inicia sesión
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--accent-3),0.18),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(var(--accent-2),0.22),transparent_55%)]" />
          <div className="relative">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Empieza hoy con una ruta clara.
            </h2>
            <p className="mt-3 max-w-xl text-pretty text-white/70">
              Suscripción mensual o cursos individuales. Tú decides la ruta, nosotros
              te damos el sistema para avanzar.
            </p>

            <div className="mt-7 grid gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">1</div>
                <div className="mt-1 text-sm font-medium text-white">
                  Crea tu cuenta
                </div>
                <div className="mt-1 text-xs text-white/65">
                  Accede al aula virtual y al dashboard del estudiante.
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">2</div>
                <div className="mt-1 text-sm font-medium text-white">
                  Elige un curso o plan
                </div>
                <div className="mt-1 text-xs text-white/65">
                  Planes mensuales hasta que canceles, o compra cursos individuales.
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">3</div>
                <div className="mt-1 text-sm font-medium text-white">
                  Construye proyectos
                </div>
                <div className="mt-1 text-xs text-white/65">
                  Lecciones por módulos, recursos y avances medibles.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
