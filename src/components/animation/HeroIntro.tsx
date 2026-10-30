"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Plays the hero entrance timeline on `[data-hero]` children. Content is fully visible without JS. */
export function HeroIntro({ children, className = "" }: { children: ReactNode; className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-hero='line'] > span", { yPercent: 110, duration: 1.1, stagger: 0.12 })
        .from("[data-hero='fade']", { opacity: 0, y: 24, duration: 0.8, stagger: 0.1 }, "-=0.6");
    },
    { scope },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
