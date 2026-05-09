"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Eye, EyeOff, ShieldCheck, Lock, Mail, User, Phone, FileText, CheckCircle2, ArrowRight, Cpu, Globe, Terminal, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const schema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string().min(6),
  fullName: z.string().min(2, "Nombre demasiado corto"),
  documentType: z.enum(["dni", "ce", "pasaporte"]),
  documentNumber: z.string().min(5, "Documento inválido").max(20),
  phone: z.string().min(7, "Teléfono inválido").max(20),
}).refine((v) => v.password === v.confirmPassword, {
  path: ["confirmPassword"],
  message: "Las contraseñas no coinciden",
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
      toast.error("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[100dvh] bg-[#f8fafc] flex items-center justify-center p-4 lg:p-8 font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(15,23,42,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Side: Info (Matched with Login) */}
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
              Plataforma de alto rendimiento para el desarrollo de competencias en ingeniería. Crea tu perfil de alumno y accede a la ruta de aprendizaje más completa del sector industrial.
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
                 Registro Certificado por Vertex Security
               </span>
             </div>
             <footer className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">
               {"\u00A9 2026 Vertex Software"}
             </footer>
          </div>
        </div>

        {/* Right Side: Register Card (Matched with Login) */}
        <div className="flex justify-center lg:justify-end order-1 lg:order-2">
          <Card className="w-full max-w-[550px] border border-slate-200 shadow-2xl bg-white rounded-sm overflow-hidden">
            <CardHeader className="pt-10 pb-8 px-10 text-center space-y-3 bg-slate-50/50 border-b border-slate-100">
              <div className="mx-auto w-10 h-1 bg-blue-600 rounded-none mb-2" />
              <CardTitle className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                {step === "verify" ? "Verificación" : "Crear Perfil"} <span className="text-blue-600">Alumno</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-10 py-10">
              {step === "verify" ? (
                <div className="space-y-8 text-center py-4">
                  <div className="p-8 rounded-sm bg-blue-50 border border-blue-100 space-y-4">
                    <CheckCircle2 className="h-12 w-12 text-blue-600 mx-auto" />
                    <div className="space-y-2">
                      <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Confirmación Enviada</p>
                      <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase">
                        Hemos enviado un enlace a <span className="text-blue-700 font-black">{verifyEmail}</span>.
                        Por favor, confirma tu correo para activar tu acceso.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Button asChild className="h-12 rounded-sm bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-lg shadow-blue-500/20">
                      <Link href="/aula-virtual/login">Ir al Login</Link>
                    </Button>
                    <Button variant="ghost" onClick={() => setStep("form")} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600">
                      Editar datos de registro
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                      <User className="h-3 w-3 text-blue-600" /> Nombre Completo
                    </label>
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Jesus Gabriel Tovar"
                      className="h-11 rounded-sm border-slate-200 bg-white focus:border-blue-500 focus:ring-0 transition-all font-bold text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                        <FileText className="h-3 w-3 text-blue-600" /> Tipo Doc
                      </label>
                      <select
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value as any)}
                        className="h-11 w-full rounded-sm border border-slate-200 bg-white px-3 text-[10px] font-black uppercase text-slate-900 outline-none focus:border-blue-500 transition-all"
                      >
                        <option value="dni">DNI</option>
                        <option value="ce">C.E.</option>
                        <option value="pasaporte">Pasaporte</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Número</label>
                      <Input
                        value={documentNumber}
                        onChange={(e) => setDocumentNumber(e.target.value)}
                        placeholder="12345678"
                        className="h-11 rounded-sm border-slate-200 bg-white focus:border-blue-500 focus:ring-0 transition-all font-bold text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                        <Phone className="h-3 w-3 text-blue-600" /> Teléfono
                      </label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+51 900..."
                        className="h-11 rounded-sm border-slate-200 bg-white focus:border-blue-500 focus:ring-0 transition-all font-bold text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                        <Mail className="h-3 w-3 text-blue-600" /> Email
                      </label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        type="email"
                        className="h-11 rounded-sm border-slate-200 bg-white focus:border-blue-500 focus:ring-0 transition-all font-bold text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                        <Lock className="h-3 w-3 text-blue-600" /> Password
                      </label>
                      <div className="relative">
                        <Input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="h-11 rounded-sm border-slate-200 bg-white focus:border-blue-500 focus:ring-0 transition-all font-bold text-slate-900 pr-10"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Confirmar</label>
                      <div className="relative">
                        <Input
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="h-11 rounded-sm border-slate-200 bg-white focus:border-blue-500 focus:ring-0 transition-all font-bold text-slate-900 pr-10"
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] mt-4"
                    disabled={loading}
                  >
                    {loading ? "Sincronizando..." : "Crear mi Cuenta"}
                    {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>

                  <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest pt-2">
                    {"¿Ya tienes cuenta? "} 
                    <Link href="/aula-virtual/login" className="text-blue-600 font-black hover:underline underline-offset-4">
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
