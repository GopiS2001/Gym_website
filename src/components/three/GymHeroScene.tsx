"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { GymModel } from "./GymModel";

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 3]} intensity={1.6} />
      <pointLight position={[-3, -1, 2]} intensity={12} color="#ff4d1a" distance={8} />
    </>
  );
}

/** Studio reflections built from light panels — no HDR file to download. */
function SceneEnvironment() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={3} position={[0, 4, -2]} scale={[8, 1, 1]} />
      <Lightformer form="rect" intensity={2} position={[-4, 1, 1]} rotation-y={Math.PI / 2} scale={[6, 1, 1]} />
      <Lightformer form="rect" intensity={2.5} color="#ff6a3d" position={[4, 0, 1]} rotation-y={-Math.PI / 2} scale={[6, 1.5, 1]} />
      <Lightformer form="ring" intensity={1.5} position={[0, 0, 5]} scale={2} />
    </Environment>
  );
}

const CHECK_FRAME = 3;

/**
 * Takes over rendering (priority 1) so it can read back the first frames and confirm the GPU
 * actually drew the model. Some drivers create a context that renders nothing; in that case
 * we report failure and the static fallback is shown instead of an empty black box.
 */
function RenderCheck({ onReady, onFail }: { onReady: () => void; onFail: () => void }) {
  const frame = useRef(0);
  const done = useRef(false);
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    // Ensure enough frames run even when the frameloop is "demand" (reduced motion / off-screen).
    const id = setInterval(() => !done.current && invalidate(), 50);
    return () => clearInterval(id);
  }, [invalidate]);

  useFrame(({ gl, scene, camera }) => {
    gl.render(scene, camera);
    if (done.current) return;
    frame.current += 1;
    if (frame.current < CHECK_FRAME) return;
    done.current = true;

    const ctx = gl.getContext();
    const w = ctx.drawingBufferWidth;
    const h = ctx.drawingBufferHeight;
    const pixels = new Uint8Array(w * h * 4);
    ctx.readPixels(0, 0, w, h, ctx.RGBA, ctx.UNSIGNED_BYTE, pixels);
    let drawn = 0;
    for (let i = 3; i < pixels.length; i += 4 * 16) if (pixels[i] > 0) drawn++;

    if (drawn > 0) onReady();
    else onFail();
  }, 1);

  return null;
}

type GymHeroSceneProps = {
  active: boolean;
  animate: boolean;
  onReady: () => void;
  onFail: () => void;
};

export default function GymHeroScene({ active, animate, onReady, onFail }: GymHeroSceneProps) {
  return (
    <Canvas
      // Render continuously only while visible and motion is allowed.
      frameloop={active && animate ? "always" : "demand"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.2, 3.6], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      // Track the pointer across the whole page, not just over the canvas.
      eventSource={document.body}
      eventPrefix="client"
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", onFail);
      }}
      aria-hidden
    >
      <SceneLighting />
      <SceneEnvironment />
      <GymModel animate={animate} />
      <ContactShadows position={[0, -0.75, 0]} opacity={0.55} scale={6} blur={2.6} far={2} frames={1} />
      <RenderCheck onReady={onReady} onFail={onFail} />
    </Canvas>
  );
}
