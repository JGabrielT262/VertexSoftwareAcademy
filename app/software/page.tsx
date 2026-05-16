import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Software y Soluciones",
  description: "Desarrollo de software a medida, ERP, automatización industrial e integraciones de alto rendimiento.",
};
import { 
  Warehouse, 
  Truck, 
  Building2, 
  Users2, 
  Zap, 
  BarChart3, 
  Globe, 
  Smartphone,
  ChevronRight
} from "lucide-react";

export default async function SoftwarePage() {
  const heroImageUrl = await getSiteContent<string>(
    "software.hero.imageUrl",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80"
  );

  const software = [
    {
      title: "Sistema de Almacén",
      desc: "Inventario, kardex, entradas/salidas, códigos de barras, alertas y reportes.",
      tags: ["Almacén", "Inventario", "Reportes"],
      icon: Warehouse,
    },
    {
      title: "Logística y Despachos",
      desc: "Rutas, órdenes, estados, tracking, entregas y panel operativo para equipos.",
      tags: ["Logística", "Operación", "Tracking"],
      icon: Truck,
    },
    {
      title: "ERP Ligero (PyME)",
      desc: "Ventas, compras, clientes, proveedores, caja y reportes financieros básicos.",
      tags: ["ERP", "Ventas", "Compras"],
      icon: Building2,
    },
    {
      title: "CRM Comercial",
      desc: "Pipeline, leads, actividades, seguimiento y tableros para cerrar más ventas.",
      tags: ["CRM", "Ventas", "Pipeline"],
      icon: Users2,
    },
    {
      title: "Integraciones (APIs/Webhooks)",
      desc: "Conecta tu sistema con pagos, facturación, WhatsApp, correo y servicios externos.",
      tags: ["Integraciones", "APIs", "Automatización"],
      icon: Zap,
    },
    {
      title: "Dashboard Ejecutivo",
      desc: "KPIs, métricas, alertas y reportes automáticos para tomar decisiones rápido.",
      tags: ["BI", "KPIs", "Alertas"],
      icon: BarChart3,
    },
    {
      title: "Páginas Web Corporativas",
      desc: "Web rápida, SEO, contenido editable y formularios conectados a tu equipo.",
      tags: ["Web", "SEO", "Marketing"],
      icon: Globe,
    },
    {
      title: "Apps Móviles (Android/iOS)",
      desc: "Apps para tu operación: ventas en campo, inventario, entregas o soporte.",
      tags: ["Mobile", "Operación", "Campo"],
      icon: Smartphone,
    },
  ];
  
    return (
      <div className="bg-[#f8fafc]">
        <section className="w-full px-4 pt-12 pb-16 sm:pt-16">
          <div className="mx-auto max-w-[1200px] grid gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-3">
                Vertex Solutions • Advanced Software
              </div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 uppercase">
                Productos y <span className="text-blue-600">Soluciones</span>
              </h1>
              <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-slate-500">
                Desarrollamos ecosistemas digitales listos para producción. Ingeniería de software aplicada a la optimización de procesos industriales y comerciales.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild className="h-12 rounded-sm bg-blue-600 px-8 text-[10px] font-black uppercase tracking-widest text-white hover:bg-blue-700 shadow-xl shadow-blue-500/20">
                  <Link href="/contactenos">Cotizar Proyecto</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-sm border-slate-200 bg-white px-8 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50"
                >
                  <Link href="/cursos">Ver Academia</Link>
                </Button>
              </div>
            </div>
   
            <div className="relative group">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-2xl">
                <Image
                  src={heroImageUrl}
                  alt="Software Vertex Software"
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -top-6 -left-6 h-32 w-32 border-t-2 border-l-2 border-blue-600/20 -z-10" />
            </div>
          </div>
        </section>
   
        <section className="w-full px-4 pb-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-[10px] font-black text-blue-600 tracking-[0.3em] uppercase">Ecosistema Vertex</h2>
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mt-1">Catálogo Operativo</h3>
                <p className="mt-3 max-w-xl text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Módulos escalables diseñados para integrarse en cualquier infraestructura.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="hidden h-10 rounded-sm border-slate-200 bg-white px-6 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50 sm:inline-flex"
              >
                <Link href="/contactenos">Solicitar Demo</Link>
              </Button>
            </div>
   
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {software.map((s) => (
                <Link key={s.title} href="/contactenos" className="group">
                  <div
                    className="relative bg-white border border-slate-100 rounded-sm p-6 transition-all duration-300 group-hover:border-blue-500 group-hover:shadow-2xl group-hover:-translate-y-1 h-full"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="h-12 w-12 border border-slate-100 bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                        <s.icon className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-200 group-hover:text-blue-500 transition-colors" />
                    </div>
                    
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                      {s.title}
                    </h4>
                    <p className="mt-3 text-[11px] font-medium text-slate-500 leading-relaxed min-h-[50px]">
                      {s.desc}
                    </p>
                    
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {s.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 border border-slate-100 bg-slate-50 text-[7px] font-black uppercase text-slate-400 group-hover:border-blue-100 group-hover:text-blue-600 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
  
            <div className="mt-12 border border-slate-200 bg-white rounded-sm p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-full w-32 bg-blue-600/5 -skew-x-12 translate-x-10" />
              <div className="relative z-10">
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
                  ¿Requieres un desarrollo específico?
                </h4>
                <p className="mt-2 text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Analizamos tu flujo y diseñamos un roadmap de implementación técnica.
                </p>
              </div>
              <div className="flex gap-4 relative z-10">
                <Button asChild className="h-11 rounded-sm bg-blue-600 px-8 text-[10px] font-black uppercase tracking-widest text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                  <Link href="/contactenos">Contactar Ingeniería</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-sm border-slate-200 bg-white px-8 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-slate-50"
                >
                  <Link href="/cursos">Explorar Academia</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

  );
}
