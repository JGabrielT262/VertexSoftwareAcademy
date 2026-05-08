import Link from "next/link";

export function SiteFooter() {
  return (
    <footer data-site-footer className="border-t border-slate-200">
      <div className="flex w-full flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-500">
          © {new Date().getFullYear()} Vertex Software
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <Link href="/software" className="hover:text-slate-900">
            Software
          </Link>
          <Link href="/planes" className="hover:text-slate-900">
            Planes
          </Link>
          <Link href="/acerca-de-nosotros" className="hover:text-slate-900">
            Empresa
          </Link>
          <Link href="/cursos" className="hover:text-slate-900">
            Cursos
          </Link>
          <Link href="/contactenos" className="hover:text-slate-900">
            Contáctenos
          </Link>
        </div>
      </div>
    </footer>
  );
}
