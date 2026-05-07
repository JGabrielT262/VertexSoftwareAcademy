"use client";

import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  maxRotate?: number;
};

export function Tilt({ children, className, maxRotate = 10 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const rotate = useMemo(() => Math.max(4, Math.min(16, maxRotate)), [maxRotate]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduceMotion) return;

    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const ry = (px - 0.5) * rotate * 2;
      const rx = -(py - 0.5) * rotate * 2;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px)";
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion, rotate]);

  return (
    <div className="v3d-perspective">
      <div ref={ref} className={["v3d-tilt", className].filter(Boolean).join(" ")}>
        {children}
      </div>
    </div>
  );
}

