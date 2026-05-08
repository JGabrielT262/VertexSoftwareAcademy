"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

function getPageKey(pathname: string) {
  const segment = pathname.split("?")[0]?.split("#")[0]?.split("/")[1] ?? "";
  if (!segment) return "home";
  if (segment === "software") return "software";
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

export function RouteTransitions({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const isClient = typeof window !== "undefined";

  const pageKey = useMemo(() => getPageKey(pathname), [pathname]);

  const theme = useMemo(() => {
    const themes: Record<
      string,
      {
        topBlob: string;
        rightBlob: string;
        leftBlob: string;
        grid: string;
        sweep: string;
      }
    > = {
      home: {
        topBlob: "-top-28 left-1/2 -translate-x-1/2 h-[34rem] w-[34rem]",
        rightBlob: "-bottom-44 -right-36 h-[30rem] w-[30rem]",
        leftBlob: "top-24 -left-44 h-[26rem] w-[26rem]",
        grid: "[background-size:110px_110px]",
        sweep: "rotate-[14deg] scale-110",
      },
      software: {
        topBlob: "-top-32 left-[52%] -translate-x-1/2 h-[36rem] w-[36rem]",
        rightBlob: "-bottom-48 -right-44 h-[32rem] w-[32rem]",
        leftBlob: "top-28 -left-48 h-[30rem] w-[30rem]",
        grid: "[background-size:104px_104px]",
        sweep: "rotate-[10deg] scale-110",
      },
      cursos: {
        topBlob: "-top-36 left-[62%] -translate-x-1/2 h-[36rem] w-[36rem]",
        rightBlob: "-bottom-52 -right-40 h-[34rem] w-[34rem]",
        leftBlob: "top-36 -left-52 h-[30rem] w-[30rem]",
        grid: "[background-size:96px_96px]",
        sweep: "-rotate-[10deg] scale-110",
      },
      planes: {
        topBlob: "-top-24 left-[44%] -translate-x-1/2 h-[38rem] w-[38rem]",
        rightBlob: "-bottom-44 -right-44 h-[30rem] w-[30rem]",
        leftBlob: "top-10 -left-56 h-[34rem] w-[34rem]",
        grid: "[background-size:120px_120px]",
        sweep: "rotate-[22deg] scale-105",
      },
      cronograma: {
        topBlob: "-top-28 left-[56%] -translate-x-1/2 h-[34rem] w-[34rem]",
        rightBlob: "-bottom-48 -right-40 h-[32rem] w-[32rem]",
        leftBlob: "top-44 -left-44 h-[28rem] w-[28rem]",
        grid: "[background-size:88px_88px]",
        sweep: "-rotate-[18deg] scale-110",
      },
      acerca: {
        topBlob: "-top-40 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem]",
        rightBlob: "-bottom-44 -right-52 h-[34rem] w-[34rem]",
        leftBlob: "top-10 -left-48 h-[30rem] w-[30rem]",
        grid: "[background-size:128px_128px]",
        sweep: "rotate-[10deg] scale-115",
      },
      auth: {
        topBlob: "-top-32 left-[58%] -translate-x-1/2 h-[32rem] w-[32rem]",
        rightBlob: "-bottom-56 -right-40 h-[36rem] w-[36rem]",
        leftBlob: "top-32 -left-44 h-[26rem] w-[26rem]",
        grid: "[background-size:84px_84px]",
        sweep: "-rotate-[14deg] scale-110",
      },
      dashboard: {
        topBlob: "-top-28 left-[48%] -translate-x-1/2 h-[34rem] w-[34rem]",
        rightBlob: "-bottom-44 -right-44 h-[30rem] w-[30rem]",
        leftBlob: "top-44 -left-56 h-[34rem] w-[34rem]",
        grid: "[background-size:112px_112px]",
        sweep: "rotate-[18deg] scale-110",
      },
      admin: {
        topBlob: "-top-28 left-[52%] -translate-x-1/2 h-[34rem] w-[34rem]",
        rightBlob: "-bottom-52 -right-52 h-[36rem] w-[36rem]",
        leftBlob: "top-24 -left-44 h-[30rem] w-[30rem]",
        grid: "[background-size:92px_92px]",
        sweep: "-rotate-[22deg] scale-110",
      },
      aula: {
        topBlob: "-top-36 left-[46%] -translate-x-1/2 h-[36rem] w-[36rem]",
        rightBlob: "-bottom-40 -right-40 h-[30rem] w-[30rem]",
        leftBlob: "top-36 -left-52 h-[32rem] w-[32rem]",
        grid: "[background-size:116px_116px]",
        sweep: "rotate-[12deg] scale-110",
      },
    };
    return themes[pageKey] ?? themes.home;
  }, [pageKey]);

  useEffect(() => {
    document.documentElement.dataset.page = pageKey;
    if (pageKey === "aula") {
      document.documentElement.dataset.aula = "1";
    } else {
      delete document.documentElement.dataset.aula;
    }
  }, [pageKey]);

  return (
    <div className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className={[
            "absolute rounded-full blur-3xl opacity-90",
            theme.topBlob,
            "bg-[radial-gradient(circle_at_center,rgba(var(--accent-1),0.26),transparent_62%)]",
          ].join(" ")}
        />
        <div
          className={[
            "absolute rounded-full blur-3xl opacity-90",
            theme.rightBlob,
            "bg-[radial-gradient(circle_at_center,rgba(var(--accent-2),0.22),transparent_62%)]",
          ].join(" ")}
        />
        <div
          className={[
            "absolute rounded-full blur-3xl opacity-85",
            theme.leftBlob,
            "bg-[radial-gradient(circle_at_center,rgba(var(--accent-3),0.18),transparent_64%)]",
          ].join(" ")}
        />
        <div
          className={[
            "absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]",
            theme.grid,
          ].join(" ")}
        />
        <div
          className={[
            "absolute left-1/2 top-1/2 h-[62rem] w-[62rem] -translate-x-1/2 -translate-y-1/2",
            theme.sweep,
            "opacity-[0.22] blur-2xl",
            "bg-[linear-gradient(120deg,rgba(var(--accent-1),0.14),transparent_35%,rgba(var(--accent-2),0.16))]",
          ].join(" ")}
        />
      </div>

      <motion.div
        key={`${pathname}-cover`}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[#f8fafc]/50 backdrop-blur-sm" />
      </motion.div>

      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ 
          duration: 0.4, 
          ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for a "premium" feel
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
