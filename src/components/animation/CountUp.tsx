"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type CountUpProps = { value: number; prefix?: string; suffix?: string };

const format = (n: number) => Math.round(n).toLocaleString("en-IN");

/** Counts from 0 to `value` when scrolled into view. Renders the final value on the server and without motion. */
export function CountUp({ value, prefix = "", suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const counter = { n: 0 };
    el.textContent = prefix + format(0) + suffix;
    gsap.to(counter, {
      n: value,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = prefix + format(counter.n) + suffix;
      },
    });
  }, [value, prefix, suffix]);

  return (
    <span ref={ref} aria-label={`${prefix}${format(value)}${suffix}`}>
      {prefix}
      {format(value)}
      {suffix}
    </span>
  );
}
