"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, ShieldCheck, Lock, Mail, ArrowRight, ExternalLink, Cpu, Globe, Terminal, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function AulaLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const nextPath = useMemo(() => {
    const next = searchParams.get("next");
    if (next && next.startsWith("/aula-virtual")) return next;
    return "/aula-virtual";
  }, [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resending, setResending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Completa tu correo y contraseña.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) {
        const msg = (error.message ?? "").toLowerCase();
        if (msg.includes("email") && msg.includes("confirm")) {
          toast.error(
            "Tu cuenta aún no está verificada. Revisa tu correo y confirma la cuenta."
          );
        } else {
          toast.error(error.message);
        }
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo iniciar sesión.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function resendVerification() {
    if (!email.trim()) {
      toast.error("Escribe tu correo para reenviar la verificación.");
      return;
    }

    setResending(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const auth = supabase.auth as any;
      if (typeof auth.resend !== 'function') {
        toast.error("Tu versión de Supabase no soporta reenviar verificación.");
        return;
      }
      const { error } = await auth.resend({ type: "signup", email: email.trim() });
      if (error) {
        toast.error(error.message ?? "No se pudo reenviar el correo.");
        return;
      }
      toast.success("Te reenviamos el correo de verificación.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo reenviar el correo.";
      toast.error(message);
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="min-h-[100dvh] bg-[#f8fafc] flex items-center justify-center p-4 lg:p-8 font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(15,23,42,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        <div className="space-y-6 lg:pr-10 text-center lg:text-left order-2 lg:order-1">
          <div className="space-y-4">
            <Image
              src="/vertex-logo.png"
              alt="Vertex Logo"
              width={400}
              height={140}
              className="mx-auto w-[280px] max-w-full object-contain lg:mx-0 lg:w-[320px]"
              priority
            />
            
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 uppercase leading-tight">
                Vertex Software Academy
              </h1>
              <p className="text-blue-600 font-black text-[10px] lg:text-xs uppercase tracking-[0.4em] mt-2">
                {"Engineering \u2022 Technology \u2022 Training"}
              </p>
            </div>

            <p className="text-slate-500 font-medium text-sm lg:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 pt-6">
              Plataforma de alto rendimiento para el desarrollo de competencias en ingeniería. Accede a tu centro de capacitación donde gestionamos clases en vivo, laboratorios prácticos y certificaciones de industria.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
            {[
              { icon: Cpu, label: "Clases en Vivo" },
              { icon: Globe, label: "Material de Estudio" },
              { icon: Terminal, label: "Laboratorios" },
              { icon: Users, label: "Soporte Técnico" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-sm bg-white border border-slate-100 shadow-sm transition-all hover:border-blue-500">
                <item.icon className="h-4 w-4 text-blue-600" />
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col items-center lg:items-start gap-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-sm border border-slate-200">
               <ShieldCheck className="h-3 w-3 text-blue-600" />
               <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">
                 Acceso Certificado por Vertex Security
               </span>
             </div>
             <footer className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">
               {"\u00A9 2026 Vertex Software"}
             </footer>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
          <Card className="w-full max-w-[450px] border border-slate-200 shadow-2xl bg-white rounded-sm overflow-hidden">
            <CardHeader className="pt-12 pb-10 px-10 text-center space-y-3 bg-slate-50/50 border-b border-slate-100">
              <div className="mx-auto w-10 h-1 bg-blue-600 rounded-none mb-2" />
              <CardTitle className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                Aula Virtual <span className="text-blue-600">Vertex</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-10 py-10 space-y-8">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                    <Mail className="h-3 w-3 text-blue-600" /> Correo Electrónico
                  </label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ingeniero@vertex.com"
                    type="email"
                    className="h-12 rounded-sm border-slate-200 bg-white focus:border-blue-500 focus:ring-0 transition-all font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Lock className="h-3 w-3 text-blue-600" /> Contraseña
                    </label>
                    <Link href="#" className="text-[8px] font-black text-blue-600 uppercase hover:underline">
                      ¿Resetear?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      type={showPassword ? "text" : "password"}
                      className="h-12 rounded-sm border-slate-200 bg-white focus:border-blue-500 focus:ring-0 transition-all font-bold text-slate-900 pr-12"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-sm text-slate-400 hover:text-blue-600 transition-colors"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] mt-4"
                  disabled={loading}
                >
                  {loading ? "Sincronizando..." : "Iniciar Sesión"}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-100" />
                </div>
                <div className="relative flex justify-center text-[8px] font-black uppercase tracking-[0.4em]">
                  <span className="bg-white px-4 text-slate-300">Vertex Encryption</span>
                </div>
              </div>

              <div className="text-center pt-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose">
                  ¿No tienes acceso? <br />
                  <Link href="/aula-virtual/register" className="text-blue-600 font-black hover:underline underline-offset-4">
                    Registrar nueva cuenta
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
