"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

import { painters, rr, alpha, type Painter } from "./painters";

/* =========================================================
   PALETTE
========================================================= */

export const ACCENTS: Record<string, string> = {
  web: "#006FC9",
  app: "#22B8FF",
  ai: "#8B5CF6",
  software: "#10B981",
  marketing: "#EC4899",
  ecommerce: "#F59E0B",
};

const CHIP_COLORS = {
  cyan: "#22D3EE",
  sky: "#60C7FF",
  violet: "#7750eb",
  green: "#34D399",
  amber: "#FBBF24",
  pink: "#f13496",
};

/* Transition timing, in seconds. Mirrored by SWITCH_MS in ServicesTabs. */
export const SWITCH_DURATION = 0.72;

/* =========================================================
   TIME

   Every animated piece accumulates its own delta rather than
   reading clock.elapsedTime. The canvas pauses when it scrolls
   out of view, and a wall-clock reading would jump forward on
   resume — mid-sentence in the typing animation, for instance.
========================================================= */

function useLocalTime() {
  const time = useRef(0);

  const tick = (delta: number) => {
    // Clamp so a long pause or a stalled tab can't produce a jump.
    time.current += Math.min(delta, 0.05);
    return time.current;
  };

  return tick;
}

/* Cubic ease, in and out halves used separately by the flip. */
const easeIn = (x: number) => x * x * x;
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

/* =========================================================
   CANVAS TEXTURE PLUMBING
========================================================= */

function createCanvas(width: number, height: number) {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  return canvas;
}

/**
 * A plane whose texture is repainted (throttled to ~30fps) by a
 * 2D painter function — this is what makes the device screens
 * show live UI instead of a static image.
 */
function Screen({
  painter,
  accent,
  resolution,
  size,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  painter: Painter;
  accent: string;
  resolution: [number, number];
  size: [number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const [rw, rh] = resolution;

  const { texture, ctx } = useMemo(() => {
    const canvas = createCanvas(rw, rh);

    if (!canvas) {
      return { texture: null as THREE.CanvasTexture | null, ctx: null };
    }

    const context = canvas.getContext("2d");
    const tex = new THREE.CanvasTexture(canvas);

    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;

    return { texture: tex, ctx: context };
  }, [rw, rh]);

  const tick = useLocalTime();
  const since = useRef(0);

  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  useFrame((_, delta) => {
    if (!ctx || !texture) return;

    const now = tick(delta);

    since.current += delta;
    if (since.current < 1 / 30) return;
    since.current = 0;

    painter(ctx, rw, rh, now, accent);
    texture.needsUpdate = true;
  });

  if (!texture) return null;

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

/**
 * Floating tech label. Text is baked into a canvas so the 3D
 * scene never has to load a webfont.
 */
function Chip({
  label,
  color,
  position,
}: {
  label: string;
  color: string;
  position: [number, number, number];
}) {
  const { texture, planeWidth } = useMemo(() => {
    const height = 128;
    const font =
      "700 42px ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

    // Measure first so the pill is always wide enough for its label.
    const probe = createCanvas(8, 8);
    const probeCtx = probe?.getContext("2d");

    let textWidth = label.length * 27;

    if (probeCtx) {
      probeCtx.font = font;
      textWidth = probeCtx.measureText(label).width;
    }

    const width = Math.max(300, Math.ceil(textWidth) + 118);
    const canvas = createCanvas(width, height);

    if (!canvas) {
      return { texture: null as THREE.CanvasTexture | null, planeWidth: 1 };
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return { texture: null, planeWidth: 1 };

    ctx.clearRect(0, 0, width, height);

    rr(ctx, 4, 4, width - 8, height - 8, 34);
    ctx.fillStyle = "rgba(12, 28, 52, 0.95)";
    ctx.fill();

    ctx.strokeStyle = alpha(color, 0.75);
    ctx.lineWidth = 3.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(42, height / 2, 9, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textBaseline = "middle";
    ctx.fillText(label, 70, height / 2 + 2);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;

    // Constant 0.32 world height; width follows the aspect ratio.
    return { texture: tex, planeWidth: (width / height) * 0.32 };
  }, [label, color]);

  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  if (!texture) return null;

  return (
    <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.5}>
      <mesh position={position}>
        <planeGeometry args={[planeWidth, 0.32]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
    </Float>
  );
}

/* =========================================================
   SHARED PIECES
========================================================= */

function Particle({
  position,
  color,
  size = 0.038,
  speed = 1.2,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const tick = useLocalTime();

  useFrame((_, delta) => {
    if (!ref.current) return;

    const t = tick(delta);

    ref.current.position.y =
      position[1] + Math.sin(t * speed + position[0] * 2) * 0.12;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 10, 10]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

/** Thin connector between two points, built from a cylinder. */
function Link3D({
  from,
  to,
  color,
  opacity = 0.25,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  color: string;
  opacity?: number;
}) {
  const { position, quaternion, length } = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(to, from);
    const len = dir.length();

    const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);

    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize(),
    );

    return { position: mid, quaternion: q, length: len };
  }, [from, to]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[0.007, 0.007, length, 6]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

/* =========================================================
   SCENE 1 — WEB: desktop monitor running a build
========================================================= */

function WebScene({ accent }: { accent: string }) {
  const group = useRef<THREE.Group>(null);
  const tick = useLocalTime();

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(tick(delta) * 0.4) * 0.055;
  });

  return (
    <group ref={group}>
      {/* Bezel */}
      <RoundedBox
        args={[4.9, 2.95, 0.16]}
        radius={0.12}
        smoothness={5}
        position={[0, 0.5, 0]}
      >
        <meshStandardMaterial color="#FFFFFF" metalness={0.1} roughness={0.2} />
      </RoundedBox>

      {/* Screen */}
      <Screen
        painter={painters.web}
        accent={accent}
        resolution={[1024, 640]}
        size={[4.6, 2.68]}
        position={[0, 0.52, 0.09]}
      />

      {/* Stand */}
      <RoundedBox
        args={[0.5, 0.95, 0.32]}
        radius={0.07}
        smoothness={4}
        position={[0, -1.42, 0]}
      >
        <meshStandardMaterial color="#F1F5F9" metalness={0.15} roughness={0.25} />
      </RoundedBox>

      {/* Base */}
      <RoundedBox
        args={[1.5, 0.11, 0.66]}
        radius={0.05}
        smoothness={4}
        position={[0, -1.92, 0.05]}
      >
        <meshStandardMaterial color="#FFFFFF" metalness={0.15} roughness={0.25} />
      </RoundedBox>

      {/* Keyboard */}
      <group position={[0, -2.18, 1.15]} rotation={[-0.13, 0, 0]}>
        <RoundedBox args={[2.7, 0.09, 0.85]} radius={0.05} smoothness={4}>
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.1}
            roughness={0.25}
          />
        </RoundedBox>

        {[0, 1, 2].map((row) => (
          <mesh key={row} position={[0, 0.055, -0.24 + row * 0.24]}>
            <boxGeometry args={[2.34, 0.015, 0.14]} />
            <meshStandardMaterial
              color="#E2E8F0"
              emissive={accent}
              emissiveIntensity={0.15}
            />
          </mesh>
        ))}
      </group>

      <Chip label="NEXT.JS" color={CHIP_COLORS.sky} position={[-2.45, 1.55, 0.4]} />
      <Chip label="REACT" color={CHIP_COLORS.cyan} position={[2.5, 1.55, 0.4]} />
      <Chip label="TAILWIND" color={CHIP_COLORS.sky} position={[-2.45, -1.1, 0.5]} />
      <Chip label="REST API" color={CHIP_COLORS.green} position={[2.5, -1.1, 0.5]} />
    </group>
  );
}

/* =========================================================
   SCENE 2 — APP: phones running a live app
========================================================= */

function AppScene({ accent }: { accent: string }) {
  return (
    <group>
      {/* Back phone — Running Live Game */}
      <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.4}>
        <group position={[1.55, -0.2, -0.9]} rotation={[0, -0.5, 0.1]}>
          <RoundedBox args={[1.66, 3.3, 0.18]} radius={0.2} smoothness={6}>
            <meshStandardMaterial
              color="#FFFFFF"
              metalness={0.15}
              roughness={0.2}
            />
          </RoundedBox>

          <Screen
            painter={painters.game}
            accent={accent}
            resolution={[512, 1024]}
            size={[1.48, 3.08]}
            position={[0, 0, 0.1]}
          />

          <RoundedBox
            args={[0.48, 0.1, 0.02]}
            radius={0.05}
            smoothness={4}
            position={[0, 1.45, 0.11]}
          >
            <meshBasicMaterial color="#050D18" toneMapped={false} />
          </RoundedBox>
        </group>
      </Float>

      {/* Front phone */}
      <Float speed={1.5} rotationIntensity={0.14} floatIntensity={0.45}>
        <group position={[-0.55, 0, 0]} rotation={[0, 0.22, 0.02]}>
          <RoundedBox args={[2.0, 4.05, 0.22]} radius={0.24} smoothness={7}>
            <meshStandardMaterial
              color="#FFFFFF"
              metalness={0.1}
              roughness={0.18}
            />
          </RoundedBox>

          <Screen
            painter={painters.app}
            accent={accent}
            resolution={[560, 1180]}
            size={[1.79, 3.77]}
            position={[0, 0, 0.12]}
          />

          <RoundedBox
            args={[0.62, 0.14, 0.02]}
            radius={0.06}
            smoothness={4}
            position={[0, 1.79, 0.14]}
          >
            <meshBasicMaterial color="#050D18" toneMapped={false} />
          </RoundedBox>
        </group>
      </Float>

      <Chip label="FLUTTER" color={CHIP_COLORS.cyan} position={[-2.4, 1.55, 0.6]} />
      <Chip label="REACT NATIVE" color={CHIP_COLORS.sky} position={[2.3, 1.55, 0.6]} />
      <Chip label="GAME DEV" color={CHIP_COLORS.pink} position={[2.55, 0.2, 0.6]} />
      <Chip label="iOS" color={CHIP_COLORS.violet} position={[-2.5, -1.1, 0.6]} />
      <Chip label="ANDROID" color={CHIP_COLORS.green} position={[2.45, -1.1, 0.6]} />
    </group>
  );
}

/* =========================================================
   SCENE 3 — AI: neural core + streaming console
========================================================= */

function NeuralCore({ accent }: { accent: string }) {
  const group = useRef<THREE.Group>(null);
  const pulses = useRef<Array<THREE.Mesh | null>>([]);
  const tick = useLocalTime();

  const nodes = useMemo(() => {
    const count = 9;
    const list: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const radius = 1.35;

      list.push(
        new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * radius,
          Math.sin(phi) * Math.sin(theta) * radius * 0.85,
          Math.cos(phi) * radius * 0.7,
        ),
      );
    }

    return list;
  }, []);

  const origin = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((_, delta) => {
    const t = tick(delta);

    if (group.current) {
      group.current.rotation.y = t * 0.22;
      group.current.rotation.x = Math.sin(t * 0.35) * 0.14;
    }

    // Signals travelling from the core out to each node
    pulses.current.forEach((mesh, i) => {
      if (!mesh) return;

      const frac = (t * 0.55 + i / nodes.length) % 1;
      mesh.position.copy(origin).lerp(nodes[i], frac);
      mesh.scale.setScalar(0.25 + Math.sin(frac * Math.PI) * 0.9);
    });
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.45, 1]} />
        <meshBasicMaterial
          color={accent}
          wireframe
          transparent
          opacity={0.22}
          toneMapped={false}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[0.45, 2]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.72, 20, 20]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.12}
          toneMapped={false}
        />
      </mesh>

      {nodes.map((node, i) => (
        <group key={i}>
          <Link3D from={origin} to={node} color={CHIP_COLORS.cyan} opacity={0.18} />

          <mesh position={node}>
            <sphereGeometry args={[0.1, 14, 14]} />
            <meshBasicMaterial color={CHIP_COLORS.cyan} toneMapped={false} />
          </mesh>

          <mesh
            ref={(mesh) => {
              pulses.current[i] = mesh;
            }}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function AIScene({ accent }: { accent: string }) {
  return (
    <group>
      <group position={[-1.95, 0.15, 0]}>
        <NeuralCore accent={accent} />
      </group>

      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.3}>
        <group position={[1.5, 0.1, 0.2]} rotation={[0, -0.22, 0]}>
          <RoundedBox args={[3.5, 2.28, 0.14]} radius={0.12} smoothness={5}>
            <meshStandardMaterial
              color="#FFFFFF"
              metalness={0.1}
              roughness={0.2}
            />
          </RoundedBox>

          <Screen
            painter={painters.ai}
            accent={accent}
            resolution={[900, 560]}
            size={[3.28, 2.04]}
            position={[0, 0, 0.08]}
          />
        </group>
      </Float>

      <Chip
        label="MACHINE LEARNING"
        color={CHIP_COLORS.violet}
        position={[-2.1, 1.6, 0.9]}
      />
      <Chip label="LLM" color={CHIP_COLORS.cyan} position={[-2.5, -1.15, 0.9]} />
      <Chip label="AI AGENTS" color={CHIP_COLORS.sky} position={[2.45, 1.6, 0.9]} />
    </group>
  );
}

/* =========================================================
   SCENE 4 — SOFTWARE: dashboard + server rack
========================================================= */

function ServerRack({ accent }: { accent: string }) {
  const leds = useRef<Array<THREE.Mesh | null>>([]);
  const tick = useLocalTime();

  useFrame((_, delta) => {
    const t = tick(delta);

    leds.current.forEach((led, i) => {
      if (!led) return;

      const material = led.material as THREE.MeshBasicMaterial;
      material.opacity = 0.25 + Math.abs(Math.sin(t * (1.6 + i * 0.35) + i)) * 0.75;
    });
  });

  return (
    <Float speed={1.2} rotationIntensity={0.16} floatIntensity={0.5}>
      <group rotation={[0, 0.4, 0]}>
        <RoundedBox args={[0.85, 2.1, 0.6]} radius={0.07} smoothness={4}>
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.15}
            roughness={0.2}
          />
        </RoundedBox>

        {[0, 1, 2, 3, 4].map((row) => (
          <group key={row} position={[0, 0.78 - row * 0.38, 0.31]}>
            <mesh>
              <boxGeometry args={[0.72, 0.26, 0.02]} />
              <meshStandardMaterial color="#0F172A" />
            </mesh>

            <mesh
              position={[0.26, 0, 0.02]}
              ref={(mesh) => {
                leds.current[row] = mesh;
              }}
            >
              <boxGeometry args={[0.06, 0.06, 0.01]} />
              <meshBasicMaterial
                color={row === 2 ? CHIP_COLORS.amber : accent}
                transparent
                toneMapped={false}
              />
            </mesh>

            <mesh position={[-0.1, 0, 0.02]}>
              <boxGeometry args={[0.3, 0.03, 0.01]} />
              <meshBasicMaterial
                color="#FFFFFF"
                transparent
                opacity={0.15}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

function SoftwareScene({ accent }: { accent: string }) {
  return (
    <group>
      <Float speed={1} rotationIntensity={0.07} floatIntensity={0.28}>
        <group position={[0.35, 0.2, 0]} rotation={[0.02, -0.1, 0]}>
          <RoundedBox args={[4.7, 3.0, 0.15]} radius={0.13} smoothness={5}>
            <meshStandardMaterial
              color="#FFFFFF"
              metalness={0.1}
              roughness={0.2}
            />
          </RoundedBox>

          <Screen
            painter={painters.software}
            accent={accent}
            resolution={[1024, 640]}
            size={[4.44, 2.78]}
            position={[0, 0, 0.09]}
          />
        </group>
      </Float>

      <group position={[-2.6, -0.5, 0.9]}>
        <ServerRack accent={accent} />
      </group>

      <Chip label="ERP" color={CHIP_COLORS.green} position={[-2.5, 1.6, 0.9]} />
      <Chip label="CRM" color={CHIP_COLORS.cyan} position={[2.5, 1.6, 0.9]} />
      <Chip label="POSTGRES" color={CHIP_COLORS.sky} position={[2.4, -1.15, 0.9]} />
    </group>
  );
}

/* =========================================================
   SCENE 5 — MARKETING: analytics panel + floating posts
========================================================= */

function SocialTile({
  position,
  color,
  delay,
}: {
  position: [number, number, number];
  color: string;
  delay: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const tick = useLocalTime();

  useFrame((_, delta) => {
    if (!ref.current) return;

    const t = tick(delta) + delay;
    ref.current.position.y = position[1] + Math.sin(t * 0.9) * 0.16;
    ref.current.rotation.z = Math.sin(t * 0.6) * 0.08;
  });

  return (
    <group ref={ref} position={position}>
      <RoundedBox args={[0.72, 0.72, 0.06]} radius={0.14} smoothness={4}>
        <meshStandardMaterial color="#FFFFFF" metalness={0.1} roughness={0.2} />
      </RoundedBox>

      <mesh position={[0, 0.08, 0.04]}>
        <circleGeometry args={[0.13, 20]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>

      <mesh position={[0, -0.16, 0.04]}>
        <planeGeometry args={[0.4, 0.05]} />
        <meshBasicMaterial
          color="#0F172A"
          transparent
          opacity={0.25}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function MarketingScene({ accent }: { accent: string }) {
  return (
    <group>
      <Float speed={1} rotationIntensity={0.07} floatIntensity={0.28}>
        <group position={[0, 0.15, 0]} rotation={[0.02, 0.06, 0]}>
          <RoundedBox args={[4.7, 3.0, 0.15]} radius={0.13} smoothness={5}>
            <meshStandardMaterial
              color="#FFFFFF"
              metalness={0.1}
              roughness={0.2}
            />
          </RoundedBox>

          <Screen
            painter={painters.marketing}
            accent={accent}
            resolution={[1024, 640]}
            size={[4.44, 2.78]}
            position={[0, 0, 0.09]}
          />
        </group>
      </Float>

      <SocialTile position={[-2.6, 0.95, 0.9]} color={CHIP_COLORS.pink} delay={0} />
      <SocialTile position={[2.62, 0.4, 0.9]} color={CHIP_COLORS.amber} delay={1.4} />
      <SocialTile position={[-2.6, -0.85, 0.9]} color={CHIP_COLORS.cyan} delay={2.6} />

      <Chip label="SEO" color={CHIP_COLORS.pink} position={[2.5, 1.6, 1]} />
      <Chip label="PPC" color={CHIP_COLORS.amber} position={[2.5, -1.15, 1]} />
      <Chip label="ANALYTICS" color={CHIP_COLORS.cyan} position={[-2.4, 1.6, 1]} />
    </group>
  );
}

/* =========================================================
   SCENE 6 — ECOMMERCE: storefront + parcel
========================================================= */

function Parcel({ accent }: { accent: string }) {
  const ref = useRef<THREE.Group>(null);
  const tick = useLocalTime();

  useFrame((_, delta) => {
    if (!ref.current) return;

    const t = tick(delta);
    ref.current.rotation.y = t * 0.45;
    ref.current.rotation.x = Math.sin(t * 0.7) * 0.18;
  });

  return (
    <Float speed={1.3} rotationIntensity={0.1} floatIntensity={0.55}>
      <group ref={ref}>
        <RoundedBox args={[0.86, 0.86, 0.86]} radius={0.06} smoothness={4}>
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.1}
            roughness={0.25}
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.44]}>
          <planeGeometry args={[0.2, 0.87]} />
          <meshBasicMaterial color={accent} toneMapped={false} />
        </mesh>

        <mesh position={[0, 0.44, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.2, 0.87]} />
          <meshBasicMaterial color={accent} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

function EcommerceScene({ accent }: { accent: string }) {
  return (
    <group>
      <Float speed={1.1} rotationIntensity={0.07} floatIntensity={0.28}>
        <group position={[-0.15, 0.15, 0]} rotation={[0.02, 0.08, 0]}>
          <RoundedBox args={[4.7, 3.0, 0.15]} radius={0.13} smoothness={5}>
            <meshStandardMaterial
              color="#FFFFFF"
              metalness={0.1}
              roughness={0.2}
            />
          </RoundedBox>

          <Screen
            painter={painters.ecommerce}
            accent={accent}
            resolution={[1024, 640]}
            size={[4.44, 2.78]}
            position={[0, 0, 0.09]}
          />
        </group>
      </Float>

      <group position={[2.55, -0.7, 1.1]}>
        <Parcel accent={accent} />
      </group>

      <Chip label="SHOPIFY" color={CHIP_COLORS.amber} position={[-2.45, 1.6, 1]} />
      <Chip label="STRIPE" color={CHIP_COLORS.violet} position={[2.5, 1.6, 1]} />
      <Chip label="CHECKOUT" color={CHIP_COLORS.cyan} position={[-2.45, -1.15, 1]} />
    </group>
  );
}

/* =========================================================
   SCENE BODY — everything for one service
========================================================= */

function SceneBody({ id }: { id: string }) {
  const accent = ACCENTS[id] ?? "#006FC9";

  return (
    <>
      {id === "web" && <WebScene accent={accent} />}
      {id === "app" && <AppScene accent={accent} />}
      {id === "ai" && <AIScene accent={accent} />}
      {id === "software" && <SoftwareScene accent={accent} />}
      {id === "marketing" && <MarketingScene accent={accent} />}
      {id === "ecommerce" && <EcommerceScene accent={accent} />}

      <Particle position={[-2.9, 2.05, -0.6]} color={accent} />
      <Particle position={[2.95, 1.95, -0.6]} color={CHIP_COLORS.cyan} speed={1.5} />
      <Particle position={[-2.95, -1.85, -0.6]} color={CHIP_COLORS.violet} speed={0.9} />
      <Particle position={[2.9, -1.9, -0.6]} color={accent} speed={1.3} />
    </>
  );
}

/* =========================================================
   TURNTABLE

   The transition: the outgoing scene rotates a quarter turn on
   the Y axis while pulling back, and at the exact point where
   it is edge-on to the camera the incoming scene takes over and
   completes the turn. Because the handover happens at 90° there
   is nothing to see at the seam — it reads as one continuous
   rotation of a single object.
========================================================= */

const QUARTER = Math.PI / 2;

function Turntable({ id }: { id: string }) {
  const [current, setCurrent] = useState(id);
  const [previous, setPrevious] = useState<string | null>(null);

  const outgoing = useRef<THREE.Group>(null);
  const incoming = useRef<THREE.Group>(null);

  /* 0 → 1 across a switch. Starts at 0.5 so the first appearance
     plays only the incoming half, as an entrance. */
  const progress = useRef(0.5);
  const settled = useRef(false);

  useEffect(() => {
    if (id === current) return;

    setPrevious(current);
    setCurrent(id);

    progress.current = 0;
    settled.current = false;
  }, [id, current]);

  useFrame((_, delta) => {
    if (progress.current >= 1) {
      // Park everything in its resting position exactly once.
      if (!settled.current) {
        settled.current = true;

        if (incoming.current) {
          incoming.current.rotation.set(0, 0, 0);
          incoming.current.position.z = 0;
          incoming.current.scale.setScalar(1);
          incoming.current.visible = true;
        }

        if (previous !== null) setPrevious(null);
      }

      return;
    }

    progress.current = Math.min(1, progress.current + delta / SWITCH_DURATION);

    const p = progress.current;

    // Depth dip and tilt run across the whole turn, so the two
    // halves join without a kink.
    const arc = Math.sin(p * Math.PI);
    const depth = -2.1 * arc;
    const tilt = 0.09 * arc;
    const shrink = 1 - 0.16 * arc;

    if (p < 0.5) {
      const q = easeIn(p * 2);

      if (outgoing.current) {
        outgoing.current.visible = true;
        outgoing.current.rotation.y = q * QUARTER;
        outgoing.current.rotation.x = tilt;
        outgoing.current.position.z = depth;
        outgoing.current.scale.setScalar(shrink);
      }

      if (incoming.current) incoming.current.visible = false;
    } else {
      const q = easeOut((p - 0.5) * 2);

      if (outgoing.current) outgoing.current.visible = false;

      if (incoming.current) {
        incoming.current.visible = true;
        incoming.current.rotation.y = -QUARTER * (1 - q);
        incoming.current.rotation.x = tilt;
        incoming.current.position.z = depth;
        incoming.current.scale.setScalar(shrink);
      }
    }
  });

  return (
    <>
      {previous && (
        <group ref={outgoing} key={previous}>
          <SceneBody id={previous} />
        </group>
      )}

      <group ref={incoming} key={current}>
        <SceneBody id={current} />
      </group>
    </>
  );
}

/* =========================================================
   FIT GROUP — keeps every scene inside the card on any width
========================================================= */

function FitGroup({ children }: { children: React.ReactNode }) {
  const { viewport } = useThree();

  // Scenes are authored for a ~7.6 unit wide viewport, which leaves
  // margin for the floating chips at the outer edges.
  const scale = Math.min(1, viewport.width / 7.6);

  return (
    <group scale={scale} position={[0, 0.22, 0]}>
      {children}
    </group>
  );
}

/* =========================================================
   ROOT
========================================================= */

export default function ServiceScene({ id }: { id: string }) {
  const accent = ACCENTS[id] ?? "#006FC9";

  return (
    <>
      <ambientLight intensity={1.35} />

      <directionalLight position={[4, 6, 6]} intensity={2.2} color="#FFFFFF" />

      <pointLight
        position={[0, 0.5, 3]}
        intensity={15}
        distance={12}
        color={accent}
      />

      <pointLight
        position={[-4, -2, 2]}
        intensity={9}
        distance={10}
        color="#22B8FF"
      />

      <FitGroup>
        <Turntable id={id} />

        <ContactShadows
          position={[0, -2.45, 0]}
          opacity={0.25}
          scale={9}
          blur={2.4}
          far={4.5}
        />
      </FitGroup>
    </>
  );
}
