import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aula Virtual",
  description: "Accede al centro de capacitación técnica de Vertex Software. Clases en vivo, laboratorios prácticos y certificaciones de industria.",
  openGraph: {
    title: "Aula Virtual | Vertex Software",
    description: "Plataforma de alto rendimiento para el desarrollo de competencias en ingeniería.",
  },
};

export default function AulaVirtualLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
