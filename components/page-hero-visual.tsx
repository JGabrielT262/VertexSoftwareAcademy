"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Tilt } from "@/components/tilt";

type Props = {
  title: string;
  subtitle: string;
  imageUrl: string;
  variant?: "blue" | "violet" | "emerald" | "amber";
};

export function PageHeroVisual({
  title,
  subtitle,
  imageUrl,
  variant = "blue",
}: Props) {
  const reduceMotion = useReducedMotion();

  const blobs =
    variant === "emerald"
      ? {
          a: "bg-emerald-400/18",
          b: "bg-cyan-400/16",
          c: "bg-lime-400/10",
          overlay:
            "bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.20),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(34,211,238,0.16),transparent_55%)]",
        }
      : variant === "violet"
        ? {
            a: "bg-violet-500/22",
            b: "bg-fuchsia-400/16",
            c: "bg-blue-500/10",
            overlay:
              "bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.22),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.16),transparent_55%)]",
          }
        : variant === "amber"
          ? {
              a: "bg-amber-400/18",
              b: "bg-orange-400/16",
              c: "bg-rose-400/10",
              overlay:
                "bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.18),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(251,113,133,0.14),transparent_55%)]",
            }
          : {
              a: "bg-blue-500/20",
              b: "bg-violet-500/20",
              c: "bg-sky-400/10",
              overlay:
                "bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.22),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.18),transparent_55%)]",
            };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-8 overflow-hidden rounded-3xl">
        <div className={["absolute -left-10 top-10 h-40 w-40 rounded-full blur-3xl", blobs.a].join(" ")} />
        <div className={["absolute right-0 top-0 h-56 w-56 rounded-full blur-3xl", blobs.b].join(" ")} />
        <div className={["absolute bottom-0 left-16 h-52 w-52 rounded-full blur-3xl", blobs.c].join(" ")} />
      </div>

      <Tilt
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_70px_rgba(0,0,0,0.55)]"
        maxRotate={12}
      >
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-[#0F172A]/20 to-transparent" />
          <div className={["absolute inset-0", blobs.overlay].join(" ")} />

          <div className="absolute bottom-5 left-5 right-5">
            <div className="rounded-xl border border-white/10 bg-[#0F172A]/40 px-4 py-3 backdrop-blur">
              <div className="text-sm font-semibold text-white">{title}</div>
              <div className="mt-1 text-xs text-white/70">{subtitle}</div>
            </div>
          </div>
        </div>
      </Tilt>

      {!reduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-3xl border border-white/10 bg-white/5 backdrop-blur"
          animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </div>
  );
}
