import Link from "next/link";
import Image from "next/image";

import { ContactDialog } from "@/components/contact-dialog";
import { Mail } from "lucide-react";
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
    "contacto@vertexsoftware.online"
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
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-[var(--header-bg)] backdrop-blur"
    >
      <div className="flex h-20 w-full items-center justify-between px-4">
        <Link href="/" className="flex items-center font-sans">
          <Image
            src="/vertex-logo.png"
            alt="Vertex Software"
            width={900}
            height={312}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 font-sans text-sm text-slate-600 md:flex">
          <Link href="/" data-nav="home" className="site-nav-link hover:text-slate-900">
            Inicio
          </Link>
          <Link href="/software" data-nav="software" className="site-nav-link hover:text-slate-900">
            Software
          </Link>
          <Link href="/cursos" data-nav="cursos" className="site-nav-link hover:text-slate-900">
            Cursos
          </Link>
          <Link href="/planes" data-nav="planes" className="site-nav-link hover:text-slate-900">
            Planes
          </Link>
          <Link
            href="/acerca-de-nosotros"
            data-nav="acerca"
            className="site-nav-link hover:text-slate-900"
          >
            Empresa
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button asChild variant="outline" className="border-slate-200 bg-white text-slate-900 hover:bg-slate-50">
                <Link
                  href="/aula-virtual"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Aula virtual
                </Link>
              </Button>
              <Link href="/contactenos" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
                <Mail className="size-4" />
                <span>Contáctenos</span>
              </Link>
              <UserMenu email={user.email ?? null} name={userName} />
            </>
          ) : (
            <>
              <Button asChild variant="outline" className="border-slate-200 bg-white text-slate-900 hover:bg-slate-50">
                <Link
                  href="/aula-virtual/login"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Aula virtual
                </Link>
              </Button>
              <Link href="/contactenos" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
                <Mail className="size-4" />
                <span>Contáctenos</span>
              </Link>
              <Button
                asChild
                className="bg-slate-900 text-white hover:bg-slate-800"
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
