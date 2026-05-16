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
  ShieldCheck,
  Folder,
  ChevronRight,
  ChevronLeft,
  Settings
} from "lucide-react";
import { COURSES_DATA } from "@/lib/courses-data";

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

  let userData: { 
    id?: string;
    email?: string | null; 
    name?: string | null; 
    role?: string | null;
    plan?: string | null;
    plan_expires_at?: string | null;
  } = { 
    email: "usuario@ejemplo.com", 
    name: "Usuario", 
    role: "student", 
    plan: "free" 
  };

  if (hasEnv) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    
    if (!user) redirect("/aula-virtual/login?next=/aula-virtual");
    
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, full_name, plan, plan_expires_at")
      .eq("id", user.id)
      .maybeSingle();

    userData = { 
      id: user.id,
      email: user.email, 
      name: profile?.full_name || (user.user_metadata?.full_name as string) || user.email?.split('@')[0],
      role: profile?.role || "student",
      plan: profile?.plan || "free",
      plan_expires_at: profile?.plan_expires_at
    };
  }

  const sp = await Promise.resolve(searchParams);
  const activeTab = typeof sp?.tab === "string" ? sp.tab : "inicio";

  const allTabs = [
    { id: "inicio", label: "Inicio", icon: Home, roles: ["admin", "professor", "student"] },
    { id: "clases", label: "Clases grabadas", icon: Video, roles: ["admin", "professor", "student"] },
    { id: "progreso", label: "Progreso", icon: TrendingUp, roles: ["admin", "student"] },
    { id: "cursos", label: "Cursos", icon: GraduationCap, roles: ["admin", "student"] },
    { id: "admin", label: "Panel Admin", icon: ShieldCheck, roles: ["admin"] },
    { id: "profesor", label: "Panel Profesor", icon: GraduationCap, roles: ["professor"] },
    { id: "certificados", label: "Mis Certificados", icon: Award, roles: ["admin", "student"] },
    { id: "mochila", label: "Mochila", icon: Backpack, roles: ["admin", "student"] },
    { id: "recursos", label: "Recursos", icon: Library, roles: ["admin", "student"] },
    { id: "guia", label: "Guía", icon: Compass, roles: ["admin", "student"] },
    { id: "mensajes", label: "Mensajes Contacto", icon: MessageCircle, roles: ["admin"] },
    { id: "historial", label: "Historial Clases", icon: Clock, roles: ["admin"] },
  ];

  const tabs = allTabs.filter(tab => tab.roles.includes(userData.role || "student"));

  let contactMessages: any[] = [];
  let allProfiles: any[] = [];
  let allEnrollments: any[] = [];

  if (hasEnv && userData.role === "admin") {
    const supabase = await createSupabaseServerClient();
    
    const { data: messages } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    contactMessages = messages || [];

    const { data: profiles } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    allProfiles = profiles || [];

    const { data: enrollments } = await supabase
      .from("enrollments")
      .select("*, courses(title), profiles(full_name)")
      .order("created_at", { ascending: false });
    allEnrollments = enrollments || [];
  }

  return (
    <div className="min-h-screen bg-[#edf2f7] text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 h-14 bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" prefetch={false} className="flex items-center">
              <Image
                src="/vertex-logo.png"
                alt="Vertex Software"
                width={200}
                height={36}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 h-full">
            <nav className="flex items-center h-full">
              {tabs.map((tab) => (
                <Link 
                  key={tab.id} 
                  href={`/aula-virtual?tab=${tab.id}`} 
                  prefetch={false}
                  className={`flex flex-col items-center justify-center px-2 lg:px-4 h-full transition-all relative group ${activeTab === tab.id ? 'text-teal-600' : 'text-slate-400 hover:text-teal-500'}`}
                >
                  <div className="relative">
                    <tab.icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${activeTab === tab.id ? 'scale-110' : ''}`} />
                  </div>
                  <span className="hidden xl:block text-[10px] font-bold mt-1 uppercase tracking-tighter">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-t-full" />
                  )}
                </Link>
              ))}
            </nav>
            <div className="h-8 w-px bg-slate-200 mx-2 hidden lg:block" />
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600 hover:bg-blue-100/50 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-blue-600 rounded-full border-2 border-white" />
              </Button>
              <ProfileMenu userData={userData} />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Layout */}
      <main className="mx-auto max-w-[1400px] px-4 py-6">
        <div className={`grid grid-cols-1 gap-6 ${activeTab === "inicio" ? "lg:grid-cols-[280px_1fr_300px]" : "lg:grid-cols-1"}`}>
          
          {/* Left Sidebar */}
          {activeTab === "inicio" && (
            <div className="space-y-6">
              <Card className="overflow-hidden border border-blue-100 shadow-xl shadow-blue-500/5">
                <div className="h-16 bg-gradient-to-r from-blue-700 to-indigo-600" />
                <CardContent className="relative px-4 pb-4 pt-10 bg-white">
                  <Avatar className="absolute -top-8 left-4 h-16 w-16 border-4 border-white shadow-md">
                    <AvatarFallback className="bg-blue-50 text-lg font-black text-blue-600">
                      {userData.name?.substring(0,2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-black text-blue-900 leading-tight tracking-tight">{userData.name}</h3>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      {userData.role === "admin" ? "Administrador General" : userData.role === "professor" ? "Instructor Senior" : "Desarrollador en Formación"}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        userData.plan === "pro" ? "bg-blue-600 text-white border border-blue-700 shadow-sm" :
                        userData.plan === "basico" ? "bg-indigo-100 text-indigo-700 border border-indigo-200" :
                        "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}>
                        Plan {userData.plan}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-blue-50 pt-4 space-y-2">
                    <Link href="#" prefetch={false} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
                      <User className="h-3 w-3" />
                      Perfil de {userData.role}
                    </Link>
                    {userData.plan_expires_at && (
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                        Vence: {new Date(userData.plan_expires_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-blue-100 shadow-sm overflow-hidden bg-white">
                <CardHeader className="px-4 py-3 border-b border-blue-50 bg-blue-50/30">
                  <CardTitle className="text-[10px] font-black text-blue-400 tracking-[0.2em] uppercase">
                    MIS STACKS ACTIVOS
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {COURSES_DATA.slice(0,3).map((cls) => (
                    <Link 
                      key={cls.id} 
                      href="#" 
                      prefetch={false}
                      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-blue-50/50 border-l-4 border-transparent"
                    >
                      <div className="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs bg-blue-50 text-blue-400">
                        <Code2 className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-blue-900 truncate tracking-tight">{cls.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Fase 1</p>
                      </div>
                    </Link>
                  ))}
                  <div className="p-4 bg-blue-50/10">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-[10px] font-black text-blue-600 hover:bg-blue-100/50 p-0 h-auto uppercase tracking-wider">
                      <TrendingUp className="mr-2 h-3 w-3" />
                      Explorar más cursos
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl shadow-blue-500/20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <CardContent className="p-4 space-y-3">
                  <p className="text-xs font-black uppercase tracking-widest">Soporte Técnico</p>
                  <p className="text-[11px] text-blue-50 leading-relaxed font-medium">¿Problemas con el código? Nuestro equipo de ingenieros está listo para ayudarte en Discord.</p>
                  <Button variant="secondary" size="sm" className="w-full bg-white text-blue-700 hover:bg-blue-50 font-black text-[10px] uppercase tracking-widest shadow-sm">
                    Ir a la Comunidad
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Central Section - Functional Switching */}
          <div className="space-y-6">
            
            {activeTab === "inicio" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-full bg-blue-50/50 -skew-x-12 translate-x-12" />
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-blue-900 tracking-tighter uppercase italic">
                        ¡Hola, {userData.name?.split(' ')[0]}!
                      </h2>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                        {userData.role === "admin" 
                          ? "Panel de Control Maestro • Acceso Total" 
                          : `Status: 3 Lecciones Pendientes • Plan ${userData.plan?.toUpperCase()} v4.2`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "clases" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {!sp?.course ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-blue-200 pb-4">
                      <div>
                        <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">Mis Cursos en Producción</h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {COURSES_DATA.map((course, idx) => {
                        const progress = [68, 24, 0, 45, 12, 88][idx % 6];
                        
                        return (
                          <Link 
                            key={course.id} 
                            href={`/aula-virtual?tab=clases&course=${course.id}`}
                            className="group relative bg-blue-50/30 border border-blue-100 rounded-sm overflow-hidden hover:border-blue-600 hover:shadow-2xl transition-all"
                          >
                            <div className="h-1.5 bg-blue-500 w-full" />
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div className="h-10 w-10 bg-white flex items-center justify-center rounded-sm text-blue-400">
                                  <Folder className="h-5 w-5" />
                                </div>
                                <div className="text-right">
                                  <span className="text-[10px] font-black text-blue-900 uppercase tracking-tighter">{progress}%</span>
                                </div>
                              </div>
                              <h3 className="text-xs font-black text-blue-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors truncate">
                                {course.title}
                              </h3>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 animate-in fade-in duration-500">
                     <p>Cargando curso...</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "cursos" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between border-b border-blue-200 pb-4">
                  <div>
                    <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter italic">Explorar Rutas de Especialización</h2>
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1">Nuevas certificaciones disponibles para tu perfil de ingeniería</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {COURSES_DATA.map((course) => (
                    <Card key={course.id} className="group border border-blue-100 shadow-sm bg-white rounded-sm overflow-hidden hover:border-blue-600 hover:shadow-xl hover:shadow-blue-500/10 transition-all">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative w-full sm:w-48 aspect-video sm:aspect-square overflow-hidden bg-blue-900">
                            <Image 
                              src={course.thumbnail} 
                              alt={course.title} 
                              fill 
                              className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-white" />
                          </div>
                          <div className="flex-1 p-6 flex flex-col justify-between">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <span className="bg-blue-600 text-white text-[8px] font-black px-2 py-0.5 rounded-none uppercase tracking-widest">{course.level}</span>
                                <div className="flex flex-col items-end">
                                  <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest leading-none">S/ {course.price}</span>
                                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-70">$ {course.priceUSD} USD</span>
                                </div>
                              </div>
                              <h3 className="text-base font-black text-blue-900 uppercase tracking-tight leading-tight">{course.title}</h3>
                              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">Líder Técnico: {course.instructor}</p>
                            </div>
                            <Button className="mt-6 w-full h-10 rounded-sm bg-blue-900 text-white text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/20">
                              Adquirir Certificación
                            </Button>
                          </div>
                        </div>
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

            {activeTab === "mensajes" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between border-b border-blue-200 pb-4">
                  <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter italic">Bandeja de Contacto</h2>
                </div>
                <div className="grid gap-4">
                  {contactMessages.length > 0 ? (
                    contactMessages.map((msg) => (
                      <Card key={msg.id} className="border border-blue-100 shadow-sm bg-white overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <h3 className="font-black text-blue-900 uppercase tracking-tight">{msg.full_name}</h3>
                                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 font-black uppercase tracking-widest">DNI: {msg.dni}</span>
                              </div>
                              <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">{msg.email} • {msg.phone}</p>
                              <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-sm italic text-sm text-slate-700 leading-relaxed">
                                "{msg.message}"
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                {new Date(msg.created_at).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                      No hay mensajes nuevos en la base de datos.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "admin" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between border-b border-blue-200 pb-4">
                  <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter italic">Gestión de Usuarios y Planes</h2>
                </div>
                
                <div className="bg-white border border-blue-100 rounded-sm overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-blue-50/50 border-b border-blue-100">
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest">Usuario</th>
                        <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest">Rol</th>
                        <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest">Plan Actual</th>
                        <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest">Vencimiento</th>
                        <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {allProfiles.map((profile) => (
                        <tr key={profile.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <p className="text-sm font-black text-slate-900 tracking-tight">{profile.full_name || "Sin nombre"}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{profile.email || "—"}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded-none ${
                              profile.role === "admin" ? "bg-slate-900 text-white" : "bg-blue-100 text-blue-700"
                            }`}>
                              {profile.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-bold text-slate-700 uppercase">{profile.plan || "free"}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                              {profile.plan_expires_at ? new Date(profile.plan_expires_at).toLocaleDateString() : "—"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="outline" size="sm" className="h-8 text-[9px] font-black uppercase tracking-widest border-slate-200 hover:border-blue-600 hover:text-blue-600">
                              Gestionar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "historial" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between border-b border-blue-200 pb-4">
                  <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter italic">Historial de Inscripciones y Actividad</h2>
                </div>
                
                <div className="grid gap-4">
                  {allEnrollments.length > 0 ? (
                    allEnrollments.map((enr) => (
                      <Card key={enr.id} className="border border-slate-200 bg-white overflow-hidden hover:border-blue-600 transition-all group">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="size-10 bg-blue-50 text-blue-600 rounded-sm flex items-center justify-center font-black italic">
                              {enr.courses?.title?.[0] || "C"}
                            </div>
                            <div>
                              <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{enr.courses?.title || "Curso Desconocido"}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                Alumno: <span className="text-blue-600">{enr.profiles?.full_name || "Usuario"}</span> • Inscrito el {new Date(enr.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                             <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-1 uppercase tracking-widest">Activo</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                      No hay registros de inscripciones aún.
                    </div>
                  )}
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
                  <div className="bg-blue-600 rounded-2xl p-6 border border-blue-500 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
                    <p className="text-[10px] font-black text-blue-100 text-center uppercase tracking-[0.3em] mb-4">Central de Comandos</p>
                    <div className="flex justify-center relative">
                      <Button className="bg-white hover:bg-blue-50 text-blue-600 text-[10px] font-black h-10 px-8 uppercase tracking-widest rounded-xl transition-all hover:scale-105 shadow-lg shadow-white/10">
                        Abrir Documentación API
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

          </div>

          {/* Right Sidebar */}
          {activeTab === "inicio" && (
            <div className="space-y-6">
              <Card className="border border-blue-100 shadow-xl shadow-blue-500/5 overflow-hidden bg-white">
                <CardHeader className="px-5 py-4 border-b border-blue-50 bg-blue-50/30">
                  <CardTitle className="text-[10px] font-black text-blue-400 tracking-[0.2em] uppercase">Sprint: Q2 - 2026</CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="space-y-5">
                    {[
                      { title: "Code Review: Python Bot", time: "Hoy, 6:00 PM", type: "Live", urgent: true },
                      { title: "Deadline: Script Automatización", time: "Mañana, 11:59 PM", type: "Hito" },
                    ].map((act) => (
                      <div key={act.title} className="flex gap-4 items-start group">
                        <div className={`h-10 w-10 rounded-xl flex flex-col items-center justify-center shrink-0 transition-colors ${act.urgent ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'}`}>
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-blue-900 leading-tight truncate tracking-tight">{act.title}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1">{act.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-8 bg-white border border-blue-100 hover:border-blue-600 text-blue-900 hover:text-blue-600 text-[10px] font-black h-10 shadow-sm uppercase tracking-widest rounded-xl transition-all">
                    Full Timeline
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-2xl overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-blue-900 text-white group cursor-pointer transition-all hover:translate-y-[-4px]">
                <CardContent className="p-7 relative">
                  <div className="absolute -top-6 -right-6 h-32 w-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all" />
                  <div className="space-y-5 relative z-10">
                    <div className="h-10 w-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg shadow-black/10">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg leading-none tracking-tighter uppercase italic">Master Engineer</h3>
                      <p className="text-blue-300 text-[9px] mt-2 uppercase tracking-[0.3em] font-black">Level: 4 / 5</p>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-blue-500 w-[85%] shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                    </div>
                    <Button variant="secondary" size="sm" className="w-full bg-white text-blue-900 hover:bg-blue-50 font-black text-[10px] uppercase tracking-[0.15em] h-10 rounded-xl transition-all border-none">
                      Ver Certificados
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="px-5 text-[9px] text-slate-400 font-black leading-relaxed uppercase tracking-widest">
                {"\u00A9 2026 Vertex Software"}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
