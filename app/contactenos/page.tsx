"use client";

import { useState } from "react";
import { toast } from "sonner";

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
    if (!fullName.trim() || !email.trim() || !message.trim()) return;

    setSubmitting(true);
    try {
      if (!hasEnv) {
        toast.error("Falta configurar Supabase para enviar mensajes.");
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
        toast.error("No se pudo enviar el mensaje.");
        return;
      }

      toast.success("Mensaje enviado. Te responderemos pronto.");
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
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Contáctenos</h1>
      <p className="mt-2 max-w-2xl text-white/70">
        Envíanos un mensaje y te responderemos lo antes posible.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-base">Formulario</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-white/80">Nombre</label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border-white/10 bg-white/5"
                  placeholder="Tu nombre"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/80">Correo</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-white/10 bg-white/5"
                  placeholder="tu@correo.com"
                  type="email"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm text-white/80">DNI</label>
                  <Input
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    className="border-white/10 bg-white/5"
                    placeholder="Opcional"
                    inputMode="numeric"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/80">Celular</label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-white/10 bg-white/5"
                    placeholder="Opcional"
                    inputMode="tel"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/80">Mensaje</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-32 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/20"
                  placeholder="Cuéntanos en qué podemos ayudarte"
                />
              </div>
              <Button
                className="bg-blue-600 hover:bg-blue-500"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-base">Información</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-white/70">
            <div>
              Correo:{" "}
              <span className="text-white">contacto@vertexsoftwareacademy.com</span>
            </div>
            <div>
              Celular: <span className="text-white">+51 900 000 000</span>
            </div>
            <div>Horario: Lunes a sábado</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
