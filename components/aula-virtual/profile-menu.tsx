"use client";

import { 
  User, 
  Settings, 
  LogOut, 
  ShieldCheck,
  CreditCard
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

interface ProfileMenuProps {
  userData: {
    name?: string | null;
    email?: string | null;
  };
}

export function ProfileMenu({ userData }: ProfileMenuProps) {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/aula-virtual/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        nativeButton={false}
        render={
          <Avatar className="h-8 w-8 ring-2 ring-slate-100 ring-offset-2 transition-transform hover:scale-105 cursor-pointer">
            <AvatarFallback className="bg-purple-600 text-[10px] text-white font-black">
              {userData.name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        }
      />
      <DropdownMenuContent align="end" className="w-56 mt-2 shadow-xl border-slate-200 bg-white text-slate-900">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal px-2 py-2">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-black leading-none text-slate-900">{userData.name}</p>
              <p className="text-xs leading-none text-slate-400 font-medium truncate">{userData.email}</p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-slate-100" />
        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem className="cursor-pointer !focus:bg-teal-50 !focus:text-teal-700 text-slate-700 font-bold">
            <User className="mr-2 h-4 w-4" />
            <span>Mi Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer !focus:bg-teal-50 !focus:text-teal-700 text-slate-700 font-bold">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer !focus:bg-teal-50 !focus:text-teal-700 text-slate-700 font-bold">
            <ShieldCheck className="mr-2 h-4 w-4" />
            <span>Privacidad</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-slate-100" />
        <div className="p-1">
          <DropdownMenuItem 
            onClick={handleLogout}
            className="cursor-pointer text-red-600 !focus:bg-red-50 !focus:text-red-700 font-black"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
