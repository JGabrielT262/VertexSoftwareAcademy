import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Toaster } from "sonner";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { RouteTransitions } from "@/components/route-transitions";

const vertexSans = Plus_Jakarta_Sans({
  variable: "--font-vertex-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vertex Software Academy",
  description: "Construye tu futuro con programación real.",
};

function getPageKeyFromPathname(pathname: string) {
  const segment = pathname.split("?")[0]?.split("#")[0]?.split("/")[1] ?? "";
  if (!segment) return "home";
  if (segment === "acerca-de-nosotros") return "acerca";
  if (segment === "login" || segment === "register") return "auth";
  if (segment === "dashboard") return "dashboard";
  if (segment === "admin") return "admin";
  if (segment === "aula-virtual") return "aula";
  if (segment === "cursos") return "cursos";
  if (segment === "planes") return "planes";
  if (segment === "cronograma") return "cronograma";
  return "home";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hdrs = await headers();
  const pathname = hdrs.get("x-vsa-pathname") ?? "/";
  const pageKey = getPageKeyFromPathname(pathname);
  const isAula = pageKey === "aula";

  return (
    <html
      lang="es"
      className={`${vertexSans.variable} ${geistMono.variable} dark h-full antialiased`}
      data-page={pageKey}
      data-aula={isAula ? "1" : undefined}
    >
      <body className="min-h-full flex flex-col bg-[var(--page-base)] text-white font-sans">
        {isAula ? null : (
          <div data-site-bg className="pointer-events-none fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--accent-1),0.24),transparent_52%),radial-gradient(ellipse_at_bottom,rgba(var(--accent-2),0.22),transparent_52%),radial-gradient(ellipse_at_left,rgba(var(--accent-3),0.14),transparent_55%)]" />
            <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:80px_80px]" />
            <div className="absolute inset-0 opacity-[0.10] [background-image:conic-gradient(from_180deg_at_50%_40%,rgba(var(--accent-1),0.30),rgba(var(--accent-2),0.28),rgba(var(--accent-3),0.22),rgba(var(--accent-1),0.30))]" />
          </div>
        )}
        {isAula ? null : <SiteHeader />}
        <main className="flex-1">
          <RouteTransitions>{children}</RouteTransitions>
        </main>
        {isAula ? null : <SiteFooter />}
        <Toaster richColors />
      </body>
    </html>
  );
}
