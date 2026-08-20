"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* =========================================================
   HERO SCENE — "data uplink"

   Continuous, visible motion:

     · data streams flying past the camera (the main motion)
     · a network that wires itself up on load, then breathes
     · packets running along the wiring
     · a perspective grid scrolling underfoot
     · a slow wireframe globe far behind
     · a scan sweep every few seconds

   BUILT FOR SPEED
   ---------------
   Ten draw calls total. Every moving thing is one buffer that
   gets written in place — no object allocation inside the frame
   loop, no per-frame geometry rebuilds, no post-processing (the
   usual reason a hero canvas tanks a page). Geometry is created
   once and reused; only typed arrays are touched per frame.
========================================================= */

const ACCENT = "#006FC9";
const ACCENT_LIGHT = "#60C7FF";
const CYAN = "#22D3EE";

export type HeroQuality = "low" | "high";

/** Length of the build-in sequence, in seconds. */
const INTRO = 2.1;

/* Deterministic pseudo-random — identical every reload. */
function rand(i: number, seed: number) {
  const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const easeOutExpo = (x: number) =>
  x >= 1 ? 1 : 1 - Math.pow(2, -10 * x);

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

/* =========================================================
   SHARED CLOCK

   One clock drives everything. Children read it instead of
   each keeping their own, so the intro stays in lockstep.
========================================================= */

type Clock = { t: number; intro: number };

function useClock() {
  return useRef<Clock>({ t: 0, intro: 0 });
}

/* Soft round sprite, painted at runtime — no network request. */
function useDotTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;

    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.3, "rgba(255,255,255,0.7)");
    g.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;

    return tex;
  }, []);
}

/* =========================================================
   1. DATA STREAMS — the main motion

   Points flying toward the camera. Size attenuation means they
   swell as they approach, which is what sells the speed. One
   draw call; positions written in place.
========================================================= */

function Streams({
  count,
  clock,
  dot,
  still,
}: {
  count: number;
  clock: React.RefObject<Clock>;
  dot: THREE.Texture | null;
  still: boolean;
}) {
  const points = useRef<THREE.Points>(null);

  const { geometry, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand(i, 1) - 0.5) * 42;
      positions[i * 3 + 1] = (rand(i, 2) - 0.5) * 20;
      positions[i * 3 + 2] = -60 + rand(i, 3) * 70;
      speeds[i] = 7 + rand(i, 4) * 16;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    return { geometry: geo, speeds };
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (!points.current) return;

    const d = Math.min(delta, 0.05);
    const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const array = attr.array as Float32Array;

    const material = points.current.material as THREE.PointsMaterial;

    // Streams start flowing a third of the way into the intro.
    const reveal = clamp01((clock.current.intro - 0.3) / 0.5);
    material.opacity = 0.9 * easeOutCubic(reveal);

    if (still) return;

    for (let i = 0; i < count; i++) {
      const z = i * 3 + 2;
      array[z] += speeds[i] * d;

      if (array[z] > 12) {
        // Recycle to the back with a fresh lane.
        array[z] = -60;
        array[i * 3] = (rand(i + array[z], 5) - 0.5) * 42;
        array[i * 3 + 1] = (rand(i - array[z], 6) - 0.5) * 20;
      }
    }

    attr.needsUpdate = true;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color={ACCENT_LIGHT}
        size={0.16}
        sizeAttenuation
        transparent
        opacity={0}
        map={dot ?? undefined}
        alphaTest={0.01}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        fog
      />
    </points>
  );
}

/* =========================================================
   2. NETWORK — wires itself up during the intro

   The build-in is a drawRange animation on the line buffer:
   the wiring literally draws itself, one segment at a time,
   for the cost of a single integer per frame.
========================================================= */

function Network({
  count,
  clock,
  dot,
  still,
}: {
  count: number;
  clock: React.RefObject<Clock>;
  dot: THREE.Texture | null;
  still: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const packets = useRef<THREE.Points>(null);

  const {
    nodeGeometry,
    lineGeometry,
    packetGeometry,
    vertexCount,
    edgeFrom,
    edgeTo,
    packetSpeeds,
    packetOffsets,
    packetCount,
  } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      nodes.push(
        new THREE.Vector3(
          (rand(i, 11) - 0.5) * 24,
          (rand(i, 12) - 0.5) * 10,
          (rand(i, 13) - 0.5) * 12 - 3,
        ),
      );
    }

    const linePoints: number[] = [];
    const from: THREE.Vector3[] = [];
    const to: THREE.Vector3[] = [];
    const maxEdges = count * 2;

    for (let i = 0; i < count && from.length < maxEdges; i++) {
      for (let j = i + 1; j < count && from.length < maxEdges; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 5) {
          from.push(nodes[i]);
          to.push(nodes[j]);
          linePoints.push(...nodes[i].toArray(), ...nodes[j].toArray());
        }
      }
    }

    const nodePositions = new Float32Array(count * 3);
    nodes.forEach((n, i) => {
      nodePositions[i * 3] = n.x;
      nodePositions[i * 3 + 1] = n.y;
      nodePositions[i * 3 + 2] = n.z;
    });

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePoints, 3),
    );

    // Every packet is a vertex in ONE points buffer rather than
    // its own mesh — 1 draw call instead of a dozen.
    const packetCount = Math.min(from.length, 16);
    const edgeStep = Math.max(1, Math.floor(from.length / packetCount));

    const edgeFrom: THREE.Vector3[] = [];
    const edgeTo: THREE.Vector3[] = [];
    const packetSpeeds = new Float32Array(packetCount);
    const packetOffsets = new Float32Array(packetCount);

    for (let i = 0; i < packetCount; i++) {
      const index = (i * edgeStep) % from.length;
      edgeFrom.push(from[index]);
      edgeTo.push(to[index]);
      packetSpeeds[i] = 0.4 + rand(i, 21) * 0.55;
      packetOffsets[i] = rand(i, 22);
    }

    const packetGeo = new THREE.BufferGeometry();
    packetGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(packetCount * 3), 3),
    );

    return {
      nodeGeometry: nodeGeo,
      lineGeometry: lineGeo,
      packetGeometry: packetGeo,
      vertexCount: linePoints.length / 3,
      edgeFrom,
      edgeTo,
      packetSpeeds,
      packetOffsets,
      packetCount,
    };
  }, [count]);

  useEffect(() => {
    return () => {
      nodeGeometry.dispose();
      lineGeometry.dispose();
      packetGeometry.dispose();
    };
  }, [nodeGeometry, lineGeometry, packetGeometry]);

  useFrame(() => {
    const { t, intro } = clock.current;

    /* --- build-in: draw the wiring --- */
    const wired = easeOutCubic(clamp01((intro - 0.15) / 0.65));
    lineGeometry.setDrawRange(0, Math.floor(vertexCount * wired));

    if (nodesRef.current) {
      const material = nodesRef.current.material as THREE.PointsMaterial;
      const pop = easeOutCubic(clamp01(intro / 0.5));
      material.opacity = pop;
      material.size = 0.34 * pop;
    }

    if (still) return;

    /* --- idle: slow tumble --- */
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.13) * 0.3;
      group.current.rotation.x = Math.cos(t * 0.1) * 0.12;
    }

    /* --- packets --- */
    if (packets.current && intro > 0.75) {
      const attr = packetGeometry.getAttribute(
        "position",
      ) as THREE.BufferAttribute;
      const array = attr.array as Float32Array;

      for (let i = 0; i < packetCount; i++) {
        const p = (t * packetSpeeds[i] + packetOffsets[i]) % 1;
        const a = edgeFrom[i];
        const b = edgeTo[i];

        array[i * 3] = a.x + (b.x - a.x) * p;
        array[i * 3 + 1] = a.y + (b.y - a.y) * p;
        array[i * 3 + 2] = a.z + (b.z - a.z) * p;
      }

      attr.needsUpdate = true;

      const material = packets.current.material as THREE.PointsMaterial;
      material.opacity = 0.95;
    }
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color={ACCENT}
          transparent
          opacity={0.5}
          fog
          depthWrite={false}
        />
      </lineSegments>

      <points ref={nodesRef} geometry={nodeGeometry}>
        <pointsMaterial
          color={ACCENT_LIGHT}
          size={0}
          sizeAttenuation
          transparent
          opacity={0}
          map={dot ?? undefined}
          alphaTest={0.01}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          fog
        />
      </points>

      <points ref={packets} geometry={packetGeometry}>
        <pointsMaterial
          color={CYAN}
          size={0.5}
          sizeAttenuation
          transparent
          opacity={0}
          map={dot ?? undefined}
          alphaTest={0.01}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* =========================================================
   3. GRID — scrolling floor
========================================================= */

function DataGrid({
  clock,
  still,
}: {
  clock: React.RefObject<Clock>;
  still: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.LineBasicMaterial>(null);

  const STEP = 2.4;
  const HALF = 36;

  const geometry = useMemo(() => {
    const points: number[] = [];

    for (let x = -HALF; x <= HALF; x += STEP) {
      points.push(x, 0, -HALF, x, 0, HALF);
    }

    for (let z = -HALF; z <= HALF; z += STEP) {
      points.push(-HALF, 0, z, HALF, 0, z);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));

    return geo;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(() => {
    const { t, intro } = clock.current;

    if (mat.current) {
      mat.current.opacity = 0.4 * easeOutCubic(clamp01((intro - 0.2) / 0.6));
    }

    if (still || !group.current) return;

    // Fast enough to read as movement, wrapped so it never ends.
    group.current.position.z = ((t * 5.5) % STEP) - STEP;
  });

  return (
    <group ref={group} position={[0, -4.6, 0]}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          ref={mat}
          color={ACCENT}
          transparent
          opacity={0}
          fog
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/* =========================================================
   4. GLOBE — slow wireframe sphere, far behind
========================================================= */

function Globe({
  clock,
  still,
}: {
  clock: React.RefObject<Clock>;
  still: boolean;
}) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const { t, intro } = clock.current;
    const reveal = easeOutCubic(clamp01((intro - 0.4) / 0.6));

    if (outer.current) {
      const material = outer.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.16 * reveal;
      if (!still) outer.current.rotation.y = t * 0.12;
    }

    if (inner.current) {
      const material = inner.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.1 * reveal;
      if (!still) {
        inner.current.rotation.y = -t * 0.09;
        inner.current.rotation.x = t * 0.05;
      }
    }
  });

  return (
    <group position={[0, 0, -20]}>
      <mesh ref={outer}>
        <sphereGeometry args={[8.5, 26, 18]} />
        <meshBasicMaterial
          color={ACCENT}
          wireframe
          transparent
          opacity={0}
          fog
          depthWrite={false}
        />
      </mesh>

      <mesh ref={inner}>
        <icosahedronGeometry args={[6.2, 1]} />
        <meshBasicMaterial
          color={CYAN}
          wireframe
          transparent
          opacity={0}
          fog
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   5. SCAN SWEEP — a bar of light crossing every few seconds
========================================================= */

function Scan({
  clock,
  still,
}: {
  clock: React.RefObject<Clock>;
  still: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (still || !mesh.current) return;

    const { t, intro } = clock.current;
    if (intro < 0.9) return;

    const CYCLE = 7;
    const p = (t % CYCLE) / CYCLE;

    mesh.current.position.y = -11 + p * 22;

    const material = mesh.current.material as THREE.MeshBasicMaterial;
    material.opacity = Math.sin(p * Math.PI) * 0.09;
  });

  return (
    <mesh ref={mesh} position={[0, -11, -6]} rotation={[-0.18, 0, 0]}>
      <planeGeometry args={[70, 2.6]} />
      <meshBasicMaterial
        color={ACCENT_LIGHT}
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* =========================================================
   6. SHOCKWAVE — one expanding ring on arrival
========================================================= */

function Shockwave({ clock }: { clock: React.RefObject<Clock> }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!mesh.current) return;

    const p = clamp01(clock.current.intro / 0.55);

    if (p >= 1) {
      mesh.current.visible = false;
      return;
    }

    const eased = easeOutExpo(p);

    mesh.current.scale.setScalar(0.2 + eased * 26);

    const material = mesh.current.material as THREE.MeshBasicMaterial;
    material.opacity = (1 - p) * 0.5;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -6]}>
      <ringGeometry args={[0.9, 1, 64]} />
      <meshBasicMaterial
        color={ACCENT_LIGHT}
        transparent
        opacity={0}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* =========================================================
   CAMERA — intro dolly, responsive framing, pointer drift
========================================================= */

function Rig({
  clock,
  still,
}: {
  clock: React.RefObject<Clock>;
  still: boolean;
}) {
  const { camera, size } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  const restZ = useRef(12);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  /* Widen the lens on narrow screens so the composition keeps
     its shape instead of cropping into empty space. */
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;

    if (size.width < 640) {
      cam.fov = 76;
      restZ.current = 10.5;
    } else if (size.width < 1024) {
      cam.fov = 66;
      restZ.current = 12;
    } else {
      cam.fov = 56;
      restZ.current = 12.5;
    }

    cam.updateProjectionMatrix();
  }, [camera, size.width]);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);

    clock.current.t += d;
    clock.current.intro = Math.min(1, clock.current.intro + d / INTRO);

    const { t, intro } = clock.current;

    // Dolly in from far away, easing to a stop.
    const flyIn = easeOutExpo(intro);
    const z = 46 + (restZ.current - 46) * flyIn;

    if (still) {
      camera.position.set(0, 0, restZ.current);
      camera.lookAt(0, 0, -2);
      return;
    }

    const driftX = Math.sin(t * 0.22) * 0.7;
    const driftY = Math.cos(t * 0.17) * 0.4;

    const targetX = (pointer.current.x * 1.4 + driftX) * intro;
    const targetY = (pointer.current.y * 0.7 + driftY) * intro;

    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z = z;

    // A touch of roll during the fly-in, settling to level.
    camera.rotation.z = (1 - flyIn) * 0.25;
    camera.lookAt(0, 0, -2);
  });

  return null;
}

/* =========================================================
   SCENE
========================================================= */

function Scene({ quality, still }: { quality: HeroQuality; still: boolean }) {
  const clock = useClock();
  const dot = useDotTexture();

  const high = quality === "high";

  const streamCount = high ? 260 : 120;
  const nodeCount = high ? 40 : 26;

  useEffect(() => () => dot?.dispose(), [dot]);

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 12, 52]} />

      <Rig clock={clock} still={still} />

      <Globe clock={clock} still={still} />
      <DataGrid clock={clock} still={still} />
      <Network count={nodeCount} clock={clock} dot={dot} still={still} />
      <Streams count={streamCount} clock={clock} dot={dot} still={still} />
      <Scan clock={clock} still={still} />
      <Shockwave clock={clock} />
    </>
  );
}

/* =========================================================
   CANVAS
========================================================= */

export default function HeroCanvas({
  quality = "high",
  still = false,
  active = true,
  onReady,
}: {
  quality?: HeroQuality;
  still?: boolean;
  active?: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      frameloop={still ? "demand" : active ? "always" : "never"}
      dpr={[1, quality === "high" ? 1.6 : 1.25]}
      gl={{
        antialias: quality === "high",
        alpha: false,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 46], fov: 56, near: 0.1, far: 110 }}
      onCreated={() => onReady?.()}
    >
      <Scene quality={quality} still={still} />
    </Canvas>
  );
}
