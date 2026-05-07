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
    <div className="min-h-[100dvh] bg-[#f8fafc] flex items-center justify-center p-4 lg:p-8 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(15,23,42,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left Side: Academy Data */}
        <div className="space-y-10 lg:pr-10 text-center lg:text-left order-2 lg:order-1">
          <div className="space-y-6">
            <div className="inline-flex h-20 w-20 bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl shadow-teal-500/20 rotate-3 transition-transform hover:rotate-0">
              <Image 
                src="/vertex-logo.png" 
                alt="Vertex Logo" 
                width={80} 
                height={80} 
                className="object-contain"
              />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-slate-900 uppercase leading-none">
                Vertex Software Academy
              </h1>
              <p className="text-teal-600 font-black text-xs lg:text-sm uppercase tracking-[0.4em] italic">
                {"Industrial Automation \u2022 Academy"}
              </p>
            </div>

            <p className="text-slate-500 font-medium text-sm lg:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
              Bienvenido al ecosistema líder en formación técnica avanzada. Accede a la plataforma de ingeniería donde la automatización y el desarrollo de software convergen para crear el futuro industrial.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
            {[
              { icon: Cpu, label: "Sistemas SCADA", color: "text-teal-600" },
              { icon: Globe, label: "Redes Industriales", color: "text-blue-600" },
              { icon: Terminal, label: "Software Dev", color: "text-purple-600" },
              { icon: Users, label: "Comunidad Pro", color: "text-amber-600" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-3xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 flex flex-col items-center lg:items-start gap-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
               <ShieldCheck className="h-4 w-4 text-teal-600" />
               <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                 Acceso Certificado por Vertex Security
               </span>
             </div>
             <footer className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
               {"\u00A9 2026 Vertex Software"}
             </footer>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
          <Card className="w-full max-w-[450px] border border-slate-200 shadow-2xl bg-white/90 backdrop-blur-xl rounded-[3rem] overflow-hidden p-2">
            <CardHeader className="pt-10 pb-6 px-10 text-center space-y-1">
              <CardTitle className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">
                Acceso al Aula
              </CardTitle>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Ingresa tus credenciales de ingeniero
              </p>
            </CardHeader>
            <CardContent className="px-10 pb-10 space-y-8">
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                    <Mail className="h-3 w-3 text-teal-600" /> Correo Electr{"\u00F3"}nico
                  </label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ingeniero@vertex.com"
                    type="email"
                    autoComplete="email"
                    className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Lock className="h-3 w-3 text-teal-600" /> Contrase{"\u00F1"}a
                    </label>
                    <Link href="#" className="text-[9px] font-black text-teal-600 uppercase hover:underline">
                      ¿Reset?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all font-bold text-slate-900 pr-14"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-teal-600 transition-colors"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98] mt-4"
                  disabled={loading}
                >
                  {loading ? "Sincronizando..." : "Iniciar Sesión"}
                  {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </form>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-100" />
                </div>
                <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.3em]">
                  <span className="bg-white px-4 text-slate-300">Conexi{"\u00F3"}n Segura</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="text-center pt-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose">
                    {"\u00BFNo tienes acceso?"} <br />
                    <Link href="/aula-virtual/register" className="text-teal-600 font-black hover:underline underline-offset-4">
                      Registrarse
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
