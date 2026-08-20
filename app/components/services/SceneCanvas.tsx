"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import ServiceScene from "./ServiceScene";

/**
 * Thin client-only wrapper around the R3F canvas. Kept separate so
 * ServicesTabs can lazy-load it with `ssr: false` — three.js has no
 * business running during server rendering.
 *
 * The canvas mounts once and stays mounted; switching service only
 * changes `id`, and the scene handles the transition internally.
 * `active` pauses the render loop while the card is off screen.
 */
export default function SceneCanvas({
  id,
  active = true,
}: {
  id: string;
  active?: boolean;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 7.65], fov: 40 }}
      // A modest DPR cap keeps the animated canvas responsive on
      // high-density displays without a noticeable loss of detail.
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <ServiceScene id={id} />
      </Suspense>
    </Canvas>
  );
}
