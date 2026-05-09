"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, Clock, ShieldCheck, ArrowRight, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function ContactenosPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const hasEnv =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      toast.error("Por favor completa los campos obligatorios.");
      return;
    }

    setSubmitting(true);
    try {
      if (!hasEnv) {
        toast.error("Servicio de contacto no configurado.");
        return;
      }

      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.from("contact_messages").insert({
        full_name: fullName.trim(),
        email: email.trim(),
        dni: dni.trim() || null,
        phone: phone.trim() || null,
        message: message.trim(),
      });

      if (error) {
        toast.error("Error al enviar el mensaje.");
        return;
      }

      toast.success("Mensaje enviado correctamente. Nos pondremos en contacto pronto.");
      setFullName("");
      setEmail("");
      setDni("");
      setPhone("");
      setMessage("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(15,23,42,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_450px]">
          
          {/* Left Column: Info & Context */}
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100/50 border border-blue-100 rounded-sm">
                <span className="flex h-2 w-2 rounded-none bg-blue-600" />
                <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.4em]">Vertex Engineering</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 uppercase italic leading-[0.95]">
                Impulsa tu <span className="text-blue-600">Empresa</span> con nosotros
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium text-slate-500 leading-relaxed">
                ¿Buscas optimizar tu operación industrial o requieres un software a medida? Nuestro equipo de ingeniería analizará tu requerimiento para proponerte la mejor solución técnica.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="p-6 rounded-sm border border-slate-100 bg-white shadow-sm space-y-4">
                <div className="h-10 w-10 rounded-sm bg-blue-50 flex items-center justify-center text-blue-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Contacto Directo</h3>
                  <p className="text-sm font-bold text-blue-600 mt-1">contacto@vertexsoftware.online</p>
                </div>
              </div>

              <div className="p-6 rounded-sm border border-slate-100 bg-white shadow-sm space-y-4">
                <div className="h-10 w-10 rounded-sm bg-blue-50 flex items-center justify-center text-blue-600">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Atención Telefónica</h3>
                  <p className="text-sm font-bold text-blue-600 mt-1">+51 900 000 000</p>
                </div>
              </div>

              <div className="p-6 rounded-sm border border-slate-100 bg-white shadow-sm space-y-4">
                <div className="h-10 w-10 rounded-sm bg-blue-50 flex items-center justify-center text-blue-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Horario Operativo</h3>
                  <p className="text-[11px] font-bold text-slate-500 mt-1 uppercase">Lunes a Sábado: 8:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="p-6 rounded-sm border border-slate-100 bg-white shadow-sm space-y-4">
                <div className="h-10 w-10 rounded-sm bg-blue-50 flex items-center justify-center text-blue-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Datos Protegidos</h3>
                  <p className="text-[11px] font-bold text-slate-500 mt-1 uppercase">Cifrado de extremo a extremo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="relative">
            <Card className="rounded-sm border border-slate-200 shadow-2xl bg-white overflow-hidden">
              <CardHeader className="pt-10 pb-8 px-10 bg-slate-50/50 border-b border-slate-100">
                <div className="w-10 h-1 bg-blue-600 mb-4" />
                <CardTitle className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">
                  Formulario de <span className="text-blue-600">Requerimiento</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-10 py-10">
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Nombre Completo</label>
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Jesus Gabriel Tovar"
                      className="h-12 rounded-sm border-slate-200 bg-white focus:border-blue-500 transition-all font-bold text-slate-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Email Corporativo</label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="empresa@tu-dominio.com"
                      type="email"
                      className="h-12 rounded-sm border-slate-200 bg-white focus:border-blue-500 transition-all font-bold text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">DNI / RUC</label>
                      <Input
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        placeholder="Identificación"
                        className="h-12 rounded-sm border-slate-200 bg-white focus:border-blue-500 transition-all font-bold text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Teléfono</label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+51 ..."
                        className="h-12 rounded-sm border-slate-200 bg-white focus:border-blue-500 transition-all font-bold text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Mensaje o Requerimiento</label>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe tu proyecto o necesidad técnica..."
                      className="min-h-32 rounded-sm border-slate-200 bg-white focus:border-blue-500 transition-all font-bold text-slate-900"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
                    disabled={submitting}
                  >
                    {submitting ? "Sincronizando..." : "Enviar Solicitud"}
                    {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </form>

                <div className="mt-8 flex items-center justify-center gap-2">
                  <MessageSquare className="h-3 w-3 text-blue-600" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Atención Inmediata vía IA</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
