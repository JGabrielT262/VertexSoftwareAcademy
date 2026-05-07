import Link from "next/link";

export function SiteFooter() {
  return (
    <footer data-site-footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Vertex Software Academy
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/planes" className="hover:text-foreground">
            Planes
          </Link>
          <Link href="/cronograma" className="hover:text-foreground">
            Cronograma
          </Link>
          <Link href="/acerca-de-nosotros" className="hover:text-foreground">
            Acerca de
          </Link>
          <Link href="/cursos" className="hover:text-foreground">
            Cursos
          </Link>
          <Link href="/contactenos" className="hover:text-foreground">
            Contáctenos
          </Link>
        </div>
      </div>
    </footer>
  );
}
