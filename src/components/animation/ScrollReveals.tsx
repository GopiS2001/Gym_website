"use client";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Reveals every `[data-reveal]` element on the current page as it scrolls into view.
 * Sections stay Server Components; they only add the attribute.
 * `data-reveal="stagger"` children are batched so cards in a row cascade.
 */
export function ScrollReveals() {
  const pathname = usePathname();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (targets.length) {
        gsap.set(targets, { opacity: 0, y: 40 });
        ScrollTrigger.batch(targets, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, overwrite: true }),
        });
      }

      // Images inside [data-reveal-image] wipe in from a clipped state.
      gsap.utils.toArray<HTMLElement>("[data-reveal-image]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(12% 12% 12% 12% round 1.25rem)", scale: 1.04 },
          {
            clipPath: "inset(0% 0% 0% 0% round 1.25rem)",
            scale: 1,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        );
      });

      // Recalculate once fonts and images have settled the layout.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => window.removeEventListener("load", refresh);
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
