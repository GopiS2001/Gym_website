"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { SceneFallback } from "./SceneFallback";

const GymHeroScene = dynamic(() => import("./GymHeroScene"), { ssr: false });

/** Give up on 3D if the scene hasn't proven it can draw within this time. */
const READY_TIMEOUT_MS = 6000;

class SceneErrorBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("[hero] 3D scene failed, showing static fallback", error);
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** True only for hardware-accelerated WebGL; software renderers get the static image. */
function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const opts = { failIfMajorPerformanceCaveat: true };
    return !!(canvas.getContext("webgl2", opts) || canvas.getContext("webgl", opts));
  } catch {
    return false;
  }
}

/**
 * Client-only wrapper for the 3D hero: detects WebGL, respects reduced motion,
 * pauses rendering off-screen and falls back to a static image on any failure —
 * including a context that silently renders nothing.
 */
export function HeroVisual() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pending" | "3d" | "static">("pending");
  const [animate, setAnimate] = useState(true);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  const handleReady = useCallback(() => setReady(true), []);
  const handleFail = useCallback(() => {
    console.warn("[hero] WebGL unavailable or not drawing, showing static fallback");
    setMode("static");
  }, []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Detection runs once on mount; browser-only APIs are why this can't happen during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(supportsWebGL() ? "3d" : "static");
    setAnimate(!motion.matches);
    const onMotion = () => setAnimate(!motion.matches);
    motion.addEventListener("change", onMotion);

    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    if (wrapper.current) io.observe(wrapper.current);
    return () => {
      motion.removeEventListener("change", onMotion);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (mode !== "3d" || ready) return;
    const timer = setTimeout(handleFail, READY_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [mode, ready, handleFail]);

  return (
    <div ref={wrapper} className="absolute inset-0">
      {(mode !== "3d" || !ready) && <SceneFallback />}
      {mode === "3d" && (
        <SceneErrorBoundary onError={handleFail}>
          <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
            <GymHeroScene active={visible} animate={animate} onReady={handleReady} onFail={handleFail} />
          </div>
        </SceneErrorBoundary>
      )}
    </div>
  );
}
