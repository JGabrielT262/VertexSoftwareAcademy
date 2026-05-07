import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { 
  Home, 
  TrendingUp, 
  Backpack, 
  Bell, 
  User, 
  GraduationCap, 
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Share2,
  Calendar,
  CheckCircle2,
  Video,
  Library,
  Compass,
  Play,
  FileText,
  Clock,
  Download,
  Code2,
  Cpu,
  Bot,
  Award,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileMenu } from "@/components/aula-virtual/profile-menu";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AulaVirtualPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const hasEnv =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  let userData: { email?: string | null; name?: string | null } = { email: "usuario@ejemplo.com", name: "Usuario" };

  if (hasEnv) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/aula-virtual/login?next=/aula-virtual");
    userData = { 
      email: user.email, 
      name: (user.user_metadata?.full_name as string) || user.email?.split('@')[0] 
    };
  }

  const sp = await Promise.resolve(searchParams);
  const activeTab = typeof sp?.tab === "string" ? sp.tab : "inicio";

  const tabs = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "clases", label: "Clases grabadas", icon: Video },
    { id: "progreso", label: "Progreso", icon: TrendingUp },
    { id: "cursos", label: "Cursos", icon: GraduationCap },
    { id: "certificados", label: "Mis Certificados", icon: Award },
    { id: "mochila", label: "Mochila", icon: Backpack },
    { id: "recursos", label: "Recursos", icon: Library },
    { id: "guia", label: "Guía", icon: Compass },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 h-14 bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-9 w-9 overflow-hidden rounded-xl bg-slate-900 p-1.5 shadow-lg shadow-teal-500/20">
                <Image src="/vertex-logo.png" alt="Vertex" width={36} height={36} className="object-contain" />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-sm font-black tracking-tighter text-slate-900 uppercase leading-none">VERTEX SOFTWARE ACADEMY</span>
                <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest leading-none mt-1">AULA VIRTUAL</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 h-full">
            <nav className="flex items-center h-full">
              {tabs.map((tab) => (
                <Link 
                  key={tab.id} 
                  href={`/aula-virtual?tab=${tab.id}`} 
                  className={`flex flex-col items-center justify-center px-2 lg:px-4 h-full transition-all relative group ${activeTab === tab.id ? 'text-teal-600' : 'text-slate-400 hover:text-teal-500'}`}
                >
                  <tab.icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${activeTab === tab.id ? 'scale-110' : ''}`} />
                  <span className="hidden xl:block text-[10px] font-bold mt-1 uppercase tracking-tighter">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-t-full" />
                  )}
                </Link>
              ))}
            </nav>
            <div className="h-8 w-px bg-slate-200 mx-2 hidden lg:block" />
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-teal-600 hover:bg-teal-50 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-purple-500 rounded-full border-2 border-white" />
              </Button>
              <ProfileMenu userData={userData} />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Layout */}
      <main className="mx-auto max-w-[1400px] px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr_300px]">
          
          {/* Left Sidebar */}
          <div className="space-y-6">
            <Card className="overflow-hidden border border-slate-200 shadow-sm">
              <div className="h-16 bg-gradient-to-r from-slate-900 to-teal-800" />
              <CardContent className="relative px-4 pb-4 pt-10">
                <Avatar className="absolute -top-8 left-4 h-16 w-16 border-4 border-white shadow-md">
                  <AvatarFallback className="bg-slate-200 text-lg font-black text-slate-600">
                    {userData.name?.substring(0,2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-black text-slate-900 leading-tight tracking-tight">{userData.name}</h3>
                  <p className="text-xs font-bold text-teal-600 uppercase tracking-wider">Desarrollador en Formación</p>
                </div>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <Link href="#" className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-teal-600 transition-colors">
                    <User className="h-3 w-3" />
                    Perfil de Programador
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">
                  MIS STACKS ACTIVOS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {[
                  { name: "Python Automation", group: "PY-01", active: activeTab === "clases", icon: Code2 },
                  { name: "Node.js Backend", group: "JS-02", icon: Cpu },
                  { name: "AI & Machine Learning", group: "AI-05", icon: Bot },
                ].map((cls) => (
                  <Link 
                    key={cls.name} 
                    href="#" 
                    className={`flex items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-50 border-l-4 ${cls.active ? 'border-teal-500 bg-teal-50/30' : 'border-transparent'}`}
                  >
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs ${cls.active ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <cls.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate tracking-tight">{cls.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{cls.group} • Fase 1</p>
                    </div>
                  </Link>
                ))}
                <div className="p-4 bg-slate-50/50">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-[10px] font-black text-teal-600 hover:bg-teal-100/50 p-0 h-auto uppercase tracking-wider">
                    <TrendingUp className="mr-2 h-3 w-3" />
                    Explorar más cursos
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-sm bg-teal-600 text-white">
              <CardContent className="p-4 space-y-3">
                <p className="text-xs font-black uppercase tracking-widest">Soporte Técnico</p>
                <p className="text-[11px] text-teal-50 leading-relaxed font-medium">¿Problemas con el código? Nuestro equipo de ingenieros está listo para ayudarte en Discord.</p>
                <Button variant="secondary" size="sm" className="w-full bg-white text-teal-600 hover:bg-teal-50 font-black text-[10px] uppercase tracking-widest shadow-sm">
                  Ir a la Comunidad
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Central Section - Functional Switching */}
          <div className="space-y-6">
            
            {activeTab === "inicio" && (
              <>
                <Card className="border border-slate-200 shadow-sm">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10 ring-1 ring-slate-100">
                        <AvatarFallback className="bg-slate-100 text-slate-400 font-black text-xs">{userData.name?.substring(0,2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <textarea 
                          placeholder="Comparte un snippet o pregunta algo a la comunidad..." 
                          className="w-full min-h-[80px] p-4 text-sm bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none resize-none placeholder:text-slate-400 transition-all"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                      <div className="flex gap-1">
                        {[Code2, Share2, Backpack].map((Icon, idx) => (
                          <Button key={idx} variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl">
                            <Icon className="h-4 w-4" />
                          </Button>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <Button variant="ghost" size="sm" className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider">Cancelar</Button>
                        <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-black px-6 rounded-xl shadow-lg shadow-slate-200">Publicar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-center justify-between px-1">
                  <h2 className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Feed de Ingeniería</h2>
                  <Button variant="ghost" size="sm" className="text-xs text-teal-600 font-bold">Filtrar por stack</Button>
                </div>

                <Card className="border border-slate-200 shadow-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-5 flex gap-4">
                      <Avatar className="h-11 w-11 ring-2 ring-teal-500/20 ring-offset-2">
                        <AvatarFallback className="bg-slate-900 text-white text-xs font-black">VS</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-black text-slate-900 tracking-tight">System Admin <span className="font-bold text-slate-400 text-xs tracking-normal">anunció en</span> <span className="text-teal-600 text-xs font-black uppercase">Python Automation</span></p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Instructor Vertex • Hoy, 9:30 AM</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-4 text-sm text-slate-600 leading-relaxed font-medium">
                          ¡Atención alumnos! He desplegado los nuevos <strong>scripts de automatización industrial</strong> en el repositorio de la clase. Revisen el módulo de <code className="bg-slate-100 px-1.5 py-0.5 rounded text-teal-600 font-bold font-mono">deployment-v2</code>.
                        </div>
                        
                        <Card className="mt-5 border border-slate-100 shadow-none bg-slate-50/50 rounded-2xl overflow-hidden hover:border-teal-200 transition-colors cursor-pointer group">
                          <div className="p-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600 transition-transform group-hover:scale-110">
                                <FileText className="h-6 w-6" />
                              </div>
                              <div>
                                <p className="text-sm font-black text-slate-900 tracking-tight">Checklist de Despliegue CI/CD</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Material descargable • PDF</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-black text-teal-600 leading-none tracking-tighter">V1.2</p>
                              <p className="text-[9px] text-slate-400 font-black uppercase mt-1">Versión</p>
                            </div>
                          </div>
                        </Card>

                        <div className="mt-6 flex items-center gap-6 border-t border-slate-50 pt-4">
                          <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-teal-600 transition-colors group">
                            <ThumbsUp className="h-4 w-4 transition-transform group-hover:-rotate-12" />
                            Helpful
                          </button>
                          <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-teal-600 transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            Comentar
                          </button>
                          <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-teal-600 transition-colors">
                            <Share2 className="h-4 w-4" />
                            Guardar
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === "clases" && (
              <div className="space-y-4">
                <h2 className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Masterclasses Grabadas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="border border-slate-200 shadow-sm overflow-hidden group cursor-pointer hover:border-teal-500 transition-all">
                      <div className="aspect-video bg-slate-900 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center bg-teal-500/0 group-hover:bg-teal-500/10 transition-colors">
                          <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-transform group-hover:scale-110">
                            <Play className="h-6 w-6 text-white fill-current" />
                          </div>
                        </div>
                        <div className="absolute top-2 left-2 bg-teal-500 text-white text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest shadow-lg shadow-teal-500/40">HD 4K</div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">52:14</div>
                      </div>
                      <CardContent className="p-4 bg-white">
                        <p className="text-sm font-black text-slate-900 truncate tracking-tight">Lección {i}: Integración de APIs con Python</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Stack: Backend & Automation • 2026</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "progreso" && (
              <div className="space-y-6">
                <h2 className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Análisis de Rendimiento</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Code Quality", value: "98/100", color: "teal" },
                    { label: "PRs Approved", value: "24", color: "purple" },
                    { label: "Skills Gained", value: "12", color: "indigo" },
                  ].map((stat) => (
                    <Card key={stat.label} className="border border-slate-200 shadow-sm text-center p-6 bg-white relative overflow-hidden group">
                      <div className={`absolute top-0 left-0 w-1 h-full bg-${stat.color}-500 transition-all group-hover:w-2`} />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                      <p className={`text-3xl font-black mt-2 text-slate-900`}>{stat.value}</p>
                    </Card>
                  ))}
                </div>
                <Card className="border border-slate-200 shadow-sm p-6 bg-white">
                  <h3 className="text-[11px] font-black text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-100 pb-3">Expertise Matrix</h3>
                  <div className="space-y-6">
                    {[
                      { name: "Python Core", progress: 95 },
                      { name: "Cloud Deployment", progress: 70 },
                      { name: "Unit Testing", progress: 85 }
                    ].map((course) => (
                      <div key={course.name} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                          <span className="text-slate-600">{course.name}</span>
                          <span className="text-teal-600">{course.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className="h-full bg-teal-500 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(20,184,166,0.5)]" 
                            style={{ width: `${course.progress}%` }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "cursos" && (
              <div className="space-y-4">
                <h2 className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Rutas de Especialización</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { title: "FullStack Automation", instructor: "Ing. Marco Silva", color: "teal", icon: Code2 },
                    { title: "Robotic Process Automation", instructor: "Ing. Elena Salas", color: "purple", icon: Cpu },
                    { title: "AI Deployment Ops", instructor: "Ing. Roberto Paz", color: "indigo", icon: Bot },
                    { title: "Smart Factory 4.0", instructor: "Ing. Marco Silva", color: "amber", icon: Cpu },
                  ].map((c) => (
                    <Card key={c.title} className="border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-teal-500 transition-all bg-white">
                      <div className={`h-24 bg-${c.color}-500/5 flex items-center justify-center group-hover:bg-${c.color}-500/10 transition-colors`}>
                        <c.icon className={`h-10 w-10 text-${c.color}-600 transition-transform group-hover:scale-110`} />
                      </div>
                      <CardContent className="p-5 flex-1">
                        <h3 className="font-black text-slate-900 leading-tight tracking-tight text-base">{c.title}</h3>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Líder Técnico: {c.instructor}</p>
                        <Button className={`w-full mt-5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200`}>
                          Reanudar Código
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "certificados" && (
              <div className="space-y-4">
                <h2 className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Mis Certificaciones Vertex</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: "Python for Industry 4.0", date: "Enero 2026", id: "VRTX-9921", icon: Award },
                    { name: "Cloud Infrastructure Architect", date: "Marzo 2026", id: "VRTX-1044", icon: ShieldCheck },
                  ].map((cert) => (
                    <Card key={cert.id} className="border border-slate-200 shadow-sm bg-white overflow-hidden group hover:border-teal-500 transition-all">
                      <div className="p-6 flex flex-col items-center text-center space-y-4">
                        <div className="h-16 w-16 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 transition-transform group-hover:scale-110">
                          <cert.icon className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="font-black text-slate-900 leading-tight uppercase tracking-tight">{cert.name}</h3>
                          <p className="text-[10px] font-bold text-slate-400 mt-1">Expedido en {cert.date}</p>
                        </div>
                        <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[9px] font-black text-slate-300 tracking-widest uppercase">ID: {cert.id}</span>
                          <Button variant="ghost" size="sm" className="h-7 text-[10px] font-black text-teal-600 uppercase tracking-widest p-0 flex gap-1 items-center hover:bg-transparent">
                            Verificar <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "mochila" && (
              <div className="space-y-4">
                <h2 className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Repo de Activos</h2>
                <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                  <div className="p-0">
                    {[
                      { name: "environment_setup.yml", size: "12 KB", date: "Hace 1 hora" },
                      { name: "database_schema.sql", size: "45 KB", date: "Hace 5 horas" },
                      { name: "main_workflow.py", size: "8 KB", date: "Ayer" },
                    ].map((file) => (
                      <div key={file.name} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-none hover:bg-slate-50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 tracking-tight">{file.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{file.size} • {file.date}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-slate-300 hover:text-teal-600 rounded-lg">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "recursos" && (
              <div className="space-y-4">
                <h2 className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Documentación Técnica</h2>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { title: "Arquitectura de Microservicios", type: "JSON", category: "Docs" },
                    { title: "Manual de Seguridad en el Código", type: "PDF", category: "Seguridad" },
                    { title: "Configuración de Servidores Linux", type: "BASH", category: "DevOps" },
                  ].map((res) => (
                    <Card key={res.title} className="border border-slate-200 shadow-sm p-4 hover:border-teal-500 transition-all bg-white group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-[10px] tracking-widest shadow-lg shadow-slate-200 transition-transform group-hover:scale-105">
                            {res.type}
                          </div>
                          <div>
                            <h3 className="text-sm font-black text-slate-900 tracking-tight">{res.title}</h3>
                            <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest mt-1">{res.category}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-lg hover:border-teal-500 hover:text-teal-600">Sync</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "guia" && (
              <div className="space-y-6">
                <h2 className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Guía del Ingeniero</h2>
                <Card className="border border-slate-200 shadow-sm p-8 bg-white space-y-8 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="space-y-6 relative">
                    <div className="flex gap-5">
                      <div className="h-10 w-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-black text-base shrink-0 shadow-lg shadow-teal-500/30">1</div>
                      <div>
                        <p className="font-black text-slate-900 text-sm tracking-tight uppercase">Setup del Entorno</p>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">Clona el repositorio base y ejecuta el script de configuración automática. Asegúrate de tener Python 3.11+ instalado.</p>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <div className="h-10 w-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white font-black text-base shrink-0 shadow-lg shadow-teal-500/30">2</div>
                      <div>
                        <p className="font-black text-slate-900 text-sm tracking-tight uppercase">Control de Versiones</p>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">Usa la rama <code className="bg-slate-100 px-1 text-teal-600 font-mono">feature/student-[id]</code> para tus entregas. Todo merge requiere revisión de pares.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.1),transparent)]" />
                    <p className="text-[10px] font-black text-teal-500 text-center uppercase tracking-[0.3em] mb-4">Central de Comandos</p>
                    <div className="flex justify-center relative">
                      <Button className="bg-teal-500 hover:bg-teal-400 text-slate-900 text-[10px] font-black h-10 px-8 uppercase tracking-widest rounded-xl transition-all hover:scale-105 shadow-lg shadow-teal-500/20">
                        Abrir Documentación API
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Card className="border border-slate-200 shadow-sm overflow-hidden bg-white">
              <CardHeader className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Sprint: Q2 - 2026</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-5">
                  {[
                    { title: "Code Review: Python Bot", time: "Hoy, 6:00 PM", type: "Live", urgent: true },
                    { title: "Deadline: Script Automatización", time: "Mañana, 11:59 PM", type: "Hito" },
                  ].map((act) => (
                    <div key={act.title} className="flex gap-4 items-start group">
                      <div className={`h-10 w-10 rounded-xl flex flex-col items-center justify-center shrink-0 transition-colors ${act.urgent ? 'bg-purple-50 text-purple-600' : 'bg-teal-50 text-teal-600'}`}>
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 leading-tight truncate tracking-tight">{act.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1">{act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-8 bg-white border border-slate-200 hover:border-teal-500 text-slate-900 hover:text-teal-600 text-[10px] font-black h-10 shadow-sm uppercase tracking-widest rounded-xl transition-all">
                  Full Timeline
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 shadow-lg overflow-hidden bg-slate-900 text-white group cursor-pointer transition-all hover:translate-y-[-4px]">
              <CardContent className="p-7 relative">
                <div className="absolute -top-6 -right-6 h-32 w-32 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all" />
                <div className="space-y-5 relative z-10">
                  <div className="h-10 w-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/40">
                    <TrendingUp className="h-5 w-5 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg leading-none tracking-tighter uppercase italic">Master Engineer</h3>
                    <p className="text-teal-400 text-[9px] mt-2 uppercase tracking-[0.3em] font-black">Level: 4 / 5</p>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-teal-500 w-[85%] shadow-[0_0_12px_rgba(20,184,166,0.8)]" />
                  </div>
                  <Button variant="secondary" size="sm" className="w-full bg-white text-slate-900 hover:bg-teal-500 hover:text-white font-black text-[10px] uppercase tracking-[0.15em] h-10 rounded-xl transition-all border-none">
                    Ver Certificados
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="px-5 text-[9px] text-slate-300 font-black leading-relaxed uppercase tracking-widest">
              {"\u00A9 2026 Vertex Software"}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
