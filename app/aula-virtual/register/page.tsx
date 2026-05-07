"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Eye, EyeOff, ShieldCheck, Lock, Mail, User, Phone, FileText, CheckCircle2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const schema = z.object({
  email: z.string().email("Correo inv\u00E1lido"),
  password: z.string().min(6, "La contrase\u00F1a debe tener al menos 6 caracteres"),
  confirmPassword: z.string().min(6),
  fullName: z.string().min(2, "Nombre demasiado corto"),
  documentType: z.enum(["dni", "ce", "pasaporte"]),
  documentNumber: z.string().min(5, "Documento inv\u00E1lido").max(20),
  phone: z.string().min(7, "Tel\u00E9fono inv\u00E1lido").max(20),
}).refine((v) => v.password === v.confirmPassword, {
  path: ["confirmPassword"],
  message: "Las contrase\u00F1as no coinciden",
});

export default function AulaRegisterPage() {
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
      toast.error(parsed.error.issues[0]?.message ?? "Revisa tus datos");
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
      toast.success("Registro enviado. Verifica tu correo");
    } catch (err) {
      toast.error("Ocurri\u00F3 un error inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[100dvh] bg-[#f8fafc] flex items-center justify-center p-4 lg:p-8 font-sans selection:bg-teal-100 selection:text-teal-900">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(15,23,42,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left Side: Info */}
        <div className="space-y-10 lg:pr-10 text-center lg:text-left order-2 lg:order-1">
          <div className="space-y-6">
            <div className="inline-flex h-16 w-16 bg-slate-900 rounded-2xl p-3 shadow-2xl rotate-3">
              <Image src="/vertex-logo.png" alt="Logo" width={64} height={64} className="object-contain" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 uppercase">
                Vertex Software Academy
              </h1>
              <p className="text-teal-600 font-black text-xs uppercase tracking-[0.4em]">
                {"Registro de Ingenier\u00EDa"}
              </p>
            </div>
            <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
              {"\u00BFListo para dominar la automatización industrial? Crea tu cuenta y accede a la ruta de aprendizaje m\u00E1s completa del sector."}
            </p>
          </div>

          <div className="space-y-4 max-w-md mx-auto lg:mx-0">
            {[
              { t: "Crea tu cuenta", d: "Acceso inmediato al aula virtual." },
              { t: "Elige tu ruta", d: "Planes mensuales o cursos individuales." },
              { t: "Domina la industria", d: "Lecciones pr\u00E1cticas y certificaciones." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="h-8 w-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 font-black text-xs shrink-0">
                  {i + 1}
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-black uppercase text-slate-900 tracking-tight">{item.t}</p>
                  <p className="text-[10px] text-slate-400 font-bold">{item.d}</p>
                </div>
              </div>
            ))}
          </div>

          <footer className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] pt-4">
            {"\u00A9 2026 Vertex Software"}
          </footer>
        </div>

        {/* Right Side: Register Card */}
        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
          <Card className="w-full max-w-[500px] border border-slate-200 shadow-2xl bg-white/90 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="pt-8 pb-4 px-8 text-center space-y-1">
              <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">
                {step === "verify" ? "Verificaci\u00F3n en curso" : "Crear Perfil de Alumno"}
              </CardTitle>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {step === "verify" ? "Revisa tu bandeja de entrada" : "Ingresa tus datos de ingenier\u00EDa"}
              </p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              {step === "verify" ? (
                <div className="space-y-6 text-center">
                  <div className="p-6 rounded-3xl bg-teal-50 border border-teal-100 space-y-3">
                    <CheckCircle2 className="h-10 w-10 text-teal-600 mx-auto" />
                    <p className="text-sm font-bold text-slate-700 leading-relaxed">
                      {"Hemos enviado un enlace a "} <span className="text-teal-700 font-black">{verifyEmail}</span>.
                      {" Por favor, confirma tu correo para activar tu acceso."}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button asChild className="h-12 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest">
                      <Link href="/aula-virtual/login">Ir al Login</Link>
                    </Button>
                    <Button variant="ghost" onClick={() => setStep("form")} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-teal-600">
                      Editar datos de registro
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex items-center gap-1.5">
                      <User className="h-3 w-3 text-teal-600" /> Nombre Completo
                    </label>
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Jesus Gabriel Tovar"
                      className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all font-bold text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex items-center gap-1.5">
                        <FileText className="h-3 w-3 text-teal-600" /> Tipo Doc
                      </label>
                      <select
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value as any)}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-black uppercase text-slate-900 outline-none focus:ring-2 focus:ring-teal-500/20"
                      >
                        <option value="dni">DNI</option>
                        <option value="ce">C.E.</option>
                        <option value="pasaporte">Pasaporte</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">N\u00FAmero</label>
                      <Input
                        value={documentNumber}
                        onChange={(e) => setDocumentNumber(e.target.value)}
                        placeholder="12345678"
                        className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white font-bold text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex items-center gap-1.5">
                        <Phone className="h-3 w-3 text-teal-600" /> Tel\u00E9fono
                      </label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+51 900..."
                        className="h-11 rounded-xl border-slate-200 bg-slate-50 font-bold text-slate-900"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex items-center gap-1.5">
                        <Mail className="h-3 w-3 text-teal-600" /> Email
                      </label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        type="email"
                        className="h-11 rounded-xl border-slate-200 bg-slate-50 font-bold text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex items-center gap-1.5">
                        <Lock className="h-3 w-3 text-teal-600" /> Password
                      </label>
                      <div className="relative">
                        <Input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type={showPassword ? "text" : "password"}
                          className="h-11 rounded-xl border-slate-200 bg-slate-50 font-bold text-slate-900 pr-10"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Confirmar</label>
                      <div className="relative">
                        <Input
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          type={showConfirmPassword ? "text" : "password"}
                          className="h-11 rounded-xl border-slate-200 bg-slate-50 font-bold text-slate-900 pr-10"
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600">
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-teal-500/20 transition-all hover:scale-[1.02] mt-2"
                    disabled={loading}
                  >
                    {loading ? "Procesando..." : "Crear mi Cuenta"}
                    {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>

                  <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest pt-2">
                    {"\u00BFYa tienes cuenta? "} 
                    <Link href="/aula-virtual/login" className="text-teal-600 font-black hover:underline">
                      Inicia Sesión
                    </Link>
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
