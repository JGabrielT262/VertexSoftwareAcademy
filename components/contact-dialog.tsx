"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Mail, Phone } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { cn } from "@/lib/utils";

type Props = {
  contactEmail: string;
  contactPhone: string;
  triggerClassName?: string;
};

export function ContactDialog({ contactEmail, contactPhone, triggerClassName }: Props) {
  const hasEnv = useMemo(() => {
    return (
      !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
    );
  }, []);

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit = fullName.trim() && email.trim() && message.trim();

  const mailtoHref = useMemo(() => {
    const safe = (contactEmail ?? "").trim();
    return safe ? `mailto:${safe}` : "mailto:";
  }, [contactEmail]);

  const telHref = useMemo(() => {
    const raw = (contactPhone ?? "").trim();
    const safe = raw.replace(/[^\d+]/g, "");
    return safe ? `tel:${safe}` : "tel:";
  }, [contactPhone]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

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
      setOpen(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(
          buttonVariants({
            variant: "outline",
            className: "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
          }),
          triggerClassName
        )}
      >
        <span className="flex items-center gap-2">
          <Mail className="size-4" />
          <span>Contáctenos</span>
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl overflow-hidden rounded-md border border-slate-200 bg-white p-0 shadow-2xl">
        <div className="p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl tracking-tight text-slate-900">
              Contáctenos
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Déjanos tus datos y te respondemos. También puedes escribirnos directo.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 grid gap-6 lg:grid-cols-5">
            <form onSubmit={onSubmit} className="space-y-4 lg:col-span-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs text-slate-600">Nombre</label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Tu nombre completo"
                    className="rounded-md border-slate-200 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-600">Correo</label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    type="email"
                    className="rounded-md border-slate-200 bg-white"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs text-slate-600">DNI (opcional)</label>
                  <Input
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="Solo si lo deseas"
                    inputMode="numeric"
                    className="rounded-md border-slate-200 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-600">Celular (opcional)</label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+51 9xx xxx xxx"
                    inputMode="tel"
                    className="rounded-md border-slate-200 bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-600">Mensaje</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntanos en qué podemos ayudarte"
                  className="min-h-32 rounded-md border-slate-200 bg-white"
                />
              </div>

              <Button
                type="submit"
                className="h-10 w-full rounded-md bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-80"
                disabled={!canSubmit || submitting}
              >
                {submitting ? "Enviando..." : "Enviar mensaje"}
              </Button>
            </form>

            <div className="space-y-3 lg:col-span-2">
              <div className="rounded-md border border-slate-200 bg-white p-4">
                <div className="text-sm font-semibold text-slate-900">
                  Contacto directo
                </div>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <a
                    className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50"
                    href={mailtoHref}
                  >
                    <Mail className="size-4 text-slate-700" />
                    <span className="truncate text-slate-900">{contactEmail}</span>
                  </a>
                  <a
                    className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50"
                    href={telHref}
                  >
                    <Phone className="size-4 text-slate-700" />
                    <span className="truncate text-slate-900">{contactPhone}</span>
                  </a>
                </div>
              </div>

              <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Horario: Lunes a sábado. Si necesitas respuesta rápida, escríbenos por
                correo o llámanos.
              </div>

              <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
                Al enviar, aceptas que usemos tus datos solo para responder tu solicitud.
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
