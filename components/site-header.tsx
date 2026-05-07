import Link from "next/link";
import Image from "next/image";

import { ContactDialog } from "@/components/contact-dialog";
import { UserMenu } from "@/components/user-menu";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSiteContent } from "@/lib/site-content";

export async function SiteHeader() {
  const hasEnv =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  let user: { email?: string | null } | null = null;
  let userName: string | null = null;

  const contactEmail = await getSiteContent<string>(
    "contact.email",
    "contacto@vertexsoftwareacademy.com"
  );
  const contactPhone = await getSiteContent<string>("contact.phone", "+51 900 000 000");

  if (hasEnv) {
    try {
      const supabase = await createSupabaseServerClient();
      const { data } = await supabase.auth.getUser();
      user = data.user;
      userName =
        (data.user?.user_metadata as { full_name?: string | null } | null)?.full_name ??
        null;
    } catch {
      user = null;
      userName = null;
    }
  }

  return (
    <header
      data-site-header
      className="sticky top-0 z-50 border-b border-white/10 bg-[var(--header-bg)] backdrop-blur relative"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgba(var(--accent-1),0.70),rgba(var(--accent-2),0.70),transparent)]" />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 font-sans">
          <Image
            src="/vertex-logo.png"
            alt="Vertex Software Academy"
            width={40}
            height={40}
            className="h-10 w-10 rounded-2xl object-cover"
            priority
          />
          <span className="text-base font-semibold tracking-tight text-white">
            Vertex Software Academy
          </span>
        </Link>

        <nav className="hidden items-center gap-6 font-sans text-sm text-white/75 md:flex">
          <Link href="/" className="hover:text-white">
            Inicio
          </Link>
          <Link href="/cursos" className="hover:text-white">
            Cursos
          </Link>
          <Link href="/planes" className="hover:text-white">
            Planes
          </Link>
          <Link href="/cronograma" className="hover:text-white">
            Cronograma
          </Link>
          <Link href="/acerca-de-nosotros" className="hover:text-white">
            Acerca de nosotros
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button asChild variant="secondary" className="bg-white/10">
                <Link
                  href="/aula-virtual"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Aula virtual
                </Link>
              </Button>
              <ContactDialog
                contactEmail={contactEmail}
                contactPhone={contactPhone}
                triggerClassName="bg-white/10"
              />
              <UserMenu email={user.email ?? null} name={userName} />
            </>
          ) : (
            <>
              <Button asChild variant="secondary" className="bg-white/10">
                <Link
                  href="/aula-virtual/login"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Aula virtual
                </Link>
              </Button>
              <ContactDialog
                contactEmail={contactEmail}
                contactPhone={contactPhone}
                triggerClassName="bg-white/10"
              />
              <Button
                asChild
                className="bg-gradient-to-r from-[rgba(var(--accent-1),1)] to-[rgba(var(--accent-2),1)] text-white hover:brightness-110"
              >
                <Link
                  href="/aula-virtual/register"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Registrarse
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
