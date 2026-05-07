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
            variant: "secondary",
            className: "border border-white/10 bg-white/5 text-white hover:bg-white/10",
          }),
          triggerClassName
        )}
      >
        <span className="flex items-center gap-2">
          <Mail className="size-4" />
          <span>Contáctenos</span>
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden rounded-2xl bg-[#070A12]/80 ring-1 ring-white/12 shadow-2xl backdrop-blur-xl">
        <div className="relative p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--accent-1),0.22),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(var(--accent-2),0.18),transparent_55%),radial-gradient(ellipse_at_left,rgba(var(--accent-3),0.14),transparent_60%)]" />
            <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:90px_90px]" />
          </div>

          <DialogHeader className="relative">
            <DialogTitle className="text-2xl tracking-tight">Contáctenos</DialogTitle>
            <DialogDescription className="text-white/70">
              Déjanos tus datos y te respondemos. También puedes escribirnos directo.
            </DialogDescription>
          </DialogHeader>

          <div className="relative mt-6 grid gap-6 lg:grid-cols-5">
            <form onSubmit={onSubmit} className="space-y-4 lg:col-span-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs text-white/70">Nombre</label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Tu nombre completo"
                    className="border-white/10 bg-white/5 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/70">Correo</label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    type="email"
                    className="border-white/10 bg-white/5 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs text-white/70">DNI (opcional)</label>
                  <Input
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="Solo si lo deseas"
                    inputMode="numeric"
                    className="border-white/10 bg-white/5 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/70">Celular (opcional)</label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+51 9xx xxx xxx"
                    inputMode="tel"
                    className="border-white/10 bg-white/5 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/70">Mensaje</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntanos en qué podemos ayudarte"
                  className="border-white/10 bg-white/5 rounded-lg"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-10 rounded-lg bg-gradient-to-r from-[rgba(var(--accent-1),1)] to-[rgba(var(--accent-2),1)] text-white hover:brightness-110 disabled:opacity-80 disabled:text-white"
                disabled={!canSubmit || submitting}
              >
                {submitting ? "Enviando..." : "Enviar mensaje"}
              </Button>
            </form>

            <div className="space-y-3 lg:col-span-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-medium text-white">Contacto directo</div>
                <div className="mt-3 space-y-2 text-sm text-white/70">
                  <a
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
                    href={mailtoHref}
                  >
                    <Mail className="size-4 text-white/80" />
                    <span className="truncate text-white">{contactEmail}</span>
                  </a>
                  <a
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
                    href={telHref}
                  >
                    <Phone className="size-4 text-white/80" />
                    <span className="truncate text-white">{contactPhone}</span>
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                Horario: Lunes a sábado. Si necesitas respuesta rápida, escríbenos por
                correo o llámanos.
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-white/65">
                Al enviar, aceptas que usemos tus datos solo para responder tu solicitud.
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
