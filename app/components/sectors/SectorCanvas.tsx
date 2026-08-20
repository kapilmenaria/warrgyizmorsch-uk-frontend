"use client";

import { useMemo, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line, RoundedBox, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

export type SectorScene =
  | "factory"
  | "health"
  | "finance"
  | "retail"
  | "supply"
  | "property";

/* =========================================================
   CLEAN, CLASSY MATTE MATERIALS (NO HARSH REFLECTIONS)
========================================================= */

function MatteMaterial({
  color,
  roughness = 0.45,
  metalness = 0.08,
  emissive,
  emissiveIntensity = 0.12,
  transparent = false,
  opacity = 1,
}: {
  color: string;
  roughness?: number;
  metalness?: number;
  emissive?: string;
  emissiveIntensity?: number;
  transparent?: boolean;
  opacity?: number;
}) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={roughness}
      metalness={metalness}
      emissive={emissive ?? color}
      emissiveIntensity={emissiveIntensity}
      transparent={transparent}
      opacity={opacity}
    />
  );
}

function MatteWhite() {
  return <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.05} />;
}

function MatteSlate() {
  return <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.1} />;
}

function SoftAccentGlow({ color, intensity = 0.4 }: { color: string; intensity?: number }) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={intensity}
      roughness={0.35}
      metalness={0.05}
    />
  );
}

/* =========================================================
   1. MANUFACTURING (Classy Matte Robotic Arm & Gears)
========================================================= */

function Factory({ accent }: { accent: string }) {
  const armBaseRef = useRef<THREE.Group>(null);
  const elbowRef = useRef<THREE.Group>(null);
  const gear1Ref = useRef<THREE.Group>(null);
  const gear2Ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    const time = Date.now() * 0.0012;

    if (armBaseRef.current) {
      armBaseRef.current.rotation.y = Math.sin(time * 0.8) * 0.4;
    }
    if (elbowRef.current) {
      elbowRef.current.rotation.z = Math.sin(time * 1.2) * 0.22 - 0.25;
    }
    if (gear1Ref.current) gear1Ref.current.rotation.z += d * 1.2;
    if (gear2Ref.current) gear2Ref.current.rotation.z -= d * 1.2;
  });

  return (
    <group position={[0, -0.25, 0]}>
      {/* Clean Industrial Stand */}
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[1.2, 1.35, 0.25, 32]} />
        <MatteSlate />
      </mesh>
      <mesh position={[0, -0.96, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.06, 32]} />
        <SoftAccentGlow color={accent} intensity={0.5} />
      </mesh>

      {/* Articulated Robotic Arm */}
      <group ref={armBaseRef} position={[0, -0.9, 0]}>
        {/* Turret */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.5, 0.58, 0.4, 24]} />
          <MatteMaterial color="#334155" />
        </mesh>

        {/* Lower Arm */}
        <group position={[0, 0.4, 0]} rotation={[0, 0, 0.35]}>
          <RoundedBox args={[0.24, 1.15, 0.24]} radius={0.06} smoothness={4} position={[0, 0.5, 0]}>
            <MatteMaterial color={accent} />
          </RoundedBox>

          {/* Elbow Joint */}
          <group ref={elbowRef} position={[0, 1.0, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.32, 20]} />
              <MatteSlate />
            </mesh>

            {/* Forearm */}
            <group rotation={[0, 0, -0.65]}>
              <RoundedBox args={[0.2, 0.95, 0.2]} radius={0.05} smoothness={4} position={[0, 0.42, 0]}>
                <MatteWhite />
              </RoundedBox>

              {/* Nozzle Tool Head */}
              <group position={[0, 0.9, 0]}>
                <mesh position={[0, 0.08, 0]}>
                  <cylinderGeometry args={[0.14, 0.05, 0.22, 16]} />
                  <MatteSlate />
                </mesh>
                <mesh position={[0, -0.22, 0]}>
                  <sphereGeometry args={[0.07, 16, 16]} />
                  <SoftAccentGlow color={accent} intensity={1.5} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* Synchronized Precision Gears */}
      <Float speed={1.5} floatIntensity={0.2} rotationIntensity={0.1}>
        <group position={[-1.3, 0.5, -0.2]}>
          <group ref={gear1Ref}>
            <mesh>
              <cylinderGeometry args={[0.6, 0.6, 0.12, 24]} />
              <MatteSlate />
            </mesh>
            <mesh>
              <torusGeometry args={[0.61, 0.03, 16, 32]} />
              <SoftAccentGlow color={accent} intensity={0.6} />
            </mesh>
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <mesh key={deg} rotation={[0, 0, (deg * Math.PI) / 180]} position={[0.61, 0, 0]}>
                <boxGeometry args={[0.12, 0.1, 0.12]} />
                <MatteSlate />
              </mesh>
            ))}
          </group>
        </group>

        <group position={[-0.4, 1.25, -0.3]}>
          <group ref={gear2Ref}>
            <mesh>
              <cylinderGeometry args={[0.38, 0.38, 0.12, 18]} />
              <MatteMaterial color={accent} />
            </mesh>
            {[0, 90, 180, 270].map((deg) => (
              <mesh key={deg} rotation={[0, 0, (deg * Math.PI) / 180]} position={[0.39, 0, 0]}>
                <boxGeometry args={[0.1, 0.08, 0.12]} />
                <MatteMaterial color={accent} />
              </mesh>
            ))}
          </group>
        </group>
      </Float>

      {/* Machining Workpiece */}
      <group position={[0.65, -0.85, 0.3]}>
        <RoundedBox args={[0.7, 0.18, 0.7]} radius={0.05} smoothness={4}>
          <MatteMaterial color="#475569" />
        </RoundedBox>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.1, 16]} />
          <SoftAccentGlow color={accent} intensity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

/* =========================================================
   2. HEALTH & CARE (Classy Medical Cross, Capsule & Pulse)
========================================================= */

function Health({ accent }: { accent: string }) {
  const capsuleRef = useRef<THREE.Group>(null);
  const crossRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const pulseProg = useRef(0);

  const ecgPath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.1, -0.75, 0.3),
      new THREE.Vector3(-1.3, -0.75, 0.3),
      new THREE.Vector3(-0.9, -0.35, 0.3),
      new THREE.Vector3(-0.5, -1.2, 0.3),
      new THREE.Vector3(0.0, 0.65, 0.3),
      new THREE.Vector3(0.4, -0.85, 0.3),
      new THREE.Vector3(0.8, -0.75, 0.3),
      new THREE.Vector3(1.3, 0.05, 0.3),
      new THREE.Vector3(1.6, -0.75, 0.3),
      new THREE.Vector3(2.1, -0.75, 0.3),
    ]);
  }, []);

  const ecgPoints = useMemo(
    () => ecgPath.getPoints(36).map((v) => [v.x, v.y, v.z] as [number, number, number]),
    [ecgPath]
  );

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    const time = Date.now() * 0.0012;

    if (capsuleRef.current) {
      capsuleRef.current.rotation.y += d * 0.8;
      capsuleRef.current.rotation.x = Math.sin(time * 1.1) * 0.2 + 0.35;
    }
    if (crossRef.current) {
      crossRef.current.rotation.y = Math.sin(time * 0.8) * 0.18;
    }

    pulseProg.current = (pulseProg.current + d * 0.4) % 1;
    if (pulseRef.current) {
      pulseRef.current.position.copy(ecgPath.getPoint(pulseProg.current));
    }
  });

  return (
    <group position={[0, 0.05, 0]}>
      {/* 3D Medical Cross */}
      <Float speed={1.8} floatIntensity={0.25} rotationIntensity={0.12}>
        <group ref={crossRef} position={[-0.35, 0.15, -0.2]}>
          <RoundedBox args={[1.7, 0.52, 0.52]} radius={0.12} smoothness={5}>
            <MatteMaterial color={accent} />
          </RoundedBox>
          <RoundedBox args={[0.52, 1.7, 0.52]} radius={0.12} smoothness={5}>
            <MatteMaterial color={accent} />
          </RoundedBox>
          {/* Subtle Center Emblem */}
          <mesh scale={0.32}>
            <sphereGeometry args={[1, 24, 24]} />
            <MatteWhite />
          </mesh>
        </group>
      </Float>

      {/* Two-Tone Matte Capsule Pill */}
      <Float speed={2.4} floatIntensity={0.5} rotationIntensity={0.25}>
        <group ref={capsuleRef} position={[1.35, 0.65, 0.3]} rotation={[0.4, 0.2, 0.6]}>
          {/* Top Half */}
          <mesh position={[0, 0.32, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.45, 24]} />
            <MatteMaterial color={accent} />
          </mesh>
          <mesh position={[0, 0.54, 0]}>
            <sphereGeometry args={[0.28, 24, 16]} />
            <MatteMaterial color={accent} />
          </mesh>

          {/* Bottom Half */}
          <mesh position={[0, -0.13, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.45, 24]} />
            <MatteWhite />
          </mesh>
          <mesh position={[0, -0.35, 0]}>
            <sphereGeometry args={[0.28, 24, 16]} />
            <MatteWhite />
          </mesh>
        </group>
      </Float>

      {/* Heartbeat Line & Smooth Signal Dot */}
      <Line points={ecgPoints} color={accent} lineWidth={3} transparent opacity={0.8} />
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <SoftAccentGlow color="#ffffff" intensity={1.5} />
      </mesh>
    </group>
  );
}

/* =========================================================
   3. FINTECH (Classy Matte Payment Card, Shield & Coins)
========================================================= */

function Finance({ accent }: { accent: string }) {
  const cardRef = useRef<THREE.Group>(null);
  const coin1Ref = useRef<THREE.Group>(null);
  const coin2Ref = useRef<THREE.Group>(null);
  const shieldRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    const time = Date.now() * 0.0012;

    if (cardRef.current) {
      cardRef.current.rotation.y = Math.sin(time * 0.8) * 0.3 + 0.12;
      cardRef.current.rotation.x = Math.sin(time * 0.6) * 0.12 + 0.15;
    }
    if (coin1Ref.current) coin1Ref.current.rotation.y += d * 1.3;
    if (coin2Ref.current) coin2Ref.current.rotation.y -= d * 1.1;
    if (shieldRef.current) shieldRef.current.rotation.y = Math.sin(time * 1.0) * 0.2;
  });

  return (
    <group position={[0, -0.1, 0]}>
      {/* Matte Minimalist Smart Card */}
      <Float speed={1.8} floatIntensity={0.3} rotationIntensity={0.12}>
        <group ref={cardRef} position={[0.15, 0.15, 0]}>
          <RoundedBox args={[2.2, 1.4, 0.07]} radius={0.09} smoothness={5}>
            <MatteSlate />
          </RoundedBox>

          {/* Golden Matte Chip */}
          <group position={[-0.55, 0.18, 0.045]}>
            <RoundedBox args={[0.38, 0.28, 0.02]} radius={0.03} smoothness={3}>
              <MatteMaterial color="#f59e0b" metalness={0.2} roughness={0.3} />
            </RoundedBox>
          </group>

          {/* Contactless Wave Arc */}
          <mesh position={[0.0, 0.18, 0.045]} rotation={[0, 0, -Math.PI / 4]}>
            <ringGeometry args={[0.14, 0.17, 16, 1, 0, Math.PI / 2]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
          </mesh>

          {/* Accent Color Band */}
          <mesh position={[0.45, -0.32, 0.045]}>
            <boxGeometry args={[0.75, 0.07, 0.015]} />
            <MatteMaterial color={accent} />
          </mesh>
        </group>
      </Float>

      {/* Floating Bank Security Shield */}
      <Float speed={2.2} floatIntensity={0.4} rotationIntensity={0.15}>
        <group ref={shieldRef} position={[-1.4, 0.65, 0.25]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.7, 0.7, 0.12]} />
            <MatteMaterial color={accent} />
          </mesh>
          <mesh position={[0, 0.03, 0.08]}>
            <cylinderGeometry args={[0.07, 0.07, 0.05, 16]} />
            <MatteWhite />
          </mesh>
          <mesh position={[0, -0.07, 0.08]}>
            <boxGeometry args={[0.06, 0.12, 0.05]} />
            <MatteWhite />
          </mesh>
        </group>
      </Float>

      {/* Matte Currency Coins */}
      <Float speed={2.6} floatIntensity={0.4} rotationIntensity={0.2}>
        <group ref={coin1Ref} position={[-1.15, -0.65, 0.4]}>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <cylinderGeometry args={[0.34, 0.34, 0.07, 24]} />
            <MatteMaterial color="#f59e0b" metalness={0.2} roughness={0.35} />
          </mesh>
        </group>

        <group ref={coin2Ref} position={[1.4, -0.55, 0.35]}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.06, 24]} />
            <MatteMaterial color={accent} />
          </mesh>
        </group>
      </Float>

      {/* Candlestick Growth Columns */}
      {[-0.8, -0.25, 0.3, 0.85].map((x, i) => {
        const h = 0.45 + i * 0.32;
        return (
          <group key={i} position={[x, -1.2 + h / 2, -0.3]}>
            <RoundedBox args={[0.28, h, 0.28]} radius={0.04} smoothness={3}>
              <MatteMaterial color="#475569" />
            </RoundedBox>
            <mesh position={[0, h / 2 + 0.015, 0]}>
              <boxGeometry args={[0.3, 0.03, 0.3]} />
              <SoftAccentGlow color={accent} intensity={0.8} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* =========================================================
   4. RETAIL (Classy Matte Shopping Bag, Gift Box & Tag)
========================================================= */

function Retail({ accent }: { accent: string }) {
  const bagRef = useRef<THREE.Group>(null);
  const giftRef = useRef<THREE.Group>(null);
  const tagRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    const time = Date.now() * 0.0012;

    if (bagRef.current) {
      bagRef.current.rotation.y = Math.sin(time * 0.7) * 0.3;
    }
    if (giftRef.current) {
      giftRef.current.rotation.y += d * 0.9;
    }
    if (tagRef.current) {
      tagRef.current.rotation.z = Math.sin(time * 1.4) * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Matte Shopping Bag */}
      <Float speed={1.6} floatIntensity={0.25} rotationIntensity={0.12}>
        <group ref={bagRef} position={[-0.25, -0.1, 0]}>
          <RoundedBox args={[1.4, 1.6, 0.85]} radius={0.1} smoothness={5}>
            <MatteMaterial color={accent} />
          </RoundedBox>
          <mesh position={[0, 0.82, 0]}>
            <boxGeometry args={[1.44, 0.05, 0.89]} />
            <MatteWhite />
          </mesh>

          {/* Curved Handles */}
          {[-0.26, 0.26].map((z, i) => (
            <mesh key={i} position={[0, 1.0, z]}>
              <torusGeometry args={[0.34, 0.035, 16, 32, Math.PI]} />
              <MatteWhite />
            </mesh>
          ))}

          {/* Center Brand Emblem */}
          <mesh position={[0, 0.1, 0.44]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.03, 24]} />
            <MatteWhite />
          </mesh>
        </group>
      </Float>

      {/* Gift Box with Cross Ribbons */}
      <Float speed={2.2} floatIntensity={0.5} rotationIntensity={0.2}>
        <group ref={giftRef} position={[1.35, 0.55, 0.2]}>
          <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.08} smoothness={4}>
            <MatteWhite />
          </RoundedBox>
          <mesh>
            <boxGeometry args={[0.82, 0.82, 0.14]} />
            <MatteMaterial color={accent} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.14, 0.82, 0.82]} />
            <MatteMaterial color={accent} />
          </mesh>
          {/* Bow Knot */}
          <mesh position={[0, 0.46, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <MatteMaterial color={accent} />
          </mesh>
        </group>
      </Float>

      {/* Promo Tag */}
      <Float speed={2.0} floatIntensity={0.4} rotationIntensity={0.15}>
        <group ref={tagRef} position={[-1.35, 0.75, 0.25]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.55, 0.55, 0.07]} />
            <MatteSlate />
          </mesh>
          <mesh position={[0, 0, 0.045]}>
            <torusGeometry args={[0.12, 0.025, 16, 24]} />
            <SoftAccentGlow color={accent} intensity={1.2} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

/* =========================================================
   5. SUPPLY CHAIN (Classy Matte Shipping Container & Jet)
========================================================= */

function Supply({ accent }: { accent: string }) {
  const planeRef = useRef<THREE.Group>(null);
  const pinRef = useRef<THREE.Group>(null);
  const containerRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    const time = Date.now() * 0.001;

    // Banking transport aircraft
    if (planeRef.current) {
      const radius = 1.8;
      planeRef.current.position.x = Math.cos(time) * radius;
      planeRef.current.position.z = Math.sin(time) * radius * 0.55;
      planeRef.current.position.y = Math.sin(time * 1.4) * 0.35 + 0.55;
      planeRef.current.rotation.y = -time - Math.PI / 2;
      planeRef.current.rotation.z = 0.2;
    }

    if (pinRef.current) {
      pinRef.current.position.y = Math.sin(time * 1.8) * 0.1 + 0.85;
      pinRef.current.rotation.y += d * 0.8;
    }

    if (containerRef.current) {
      containerRef.current.rotation.y = Math.sin(time * 0.5) * 0.2 - 0.15;
    }
  });

  return (
    <group position={[0, -0.1, 0]}>
      {/* 3D Cargo Shipping Container */}
      <Float speed={1.4} floatIntensity={0.2} rotationIntensity={0.08}>
        <group ref={containerRef} position={[-0.1, -0.25, 0]}>
          <RoundedBox args={[2.3, 1.1, 1.1]} radius={0.06} smoothness={4}>
            <MatteMaterial color={accent} />
          </RoundedBox>

          {/* Clean Ribs */}
          {[-0.8, -0.4, 0.0, 0.4, 0.8].map((x) => (
            <mesh key={x} position={[x, 0, 0.56]}>
              <boxGeometry args={[0.05, 1.0, 0.03]} />
              <MatteSlate />
            </mesh>
          ))}

          {/* End Frames */}
          {[-1.13, 1.13].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]}>
              <boxGeometry args={[0.07, 1.12, 1.12]} />
              <MatteSlate />
            </mesh>
          ))}
        </group>
      </Float>

      {/* Matte Transport Plane */}
      <group ref={planeRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.09, 0.6, 16]} />
          <MatteWhite />
        </mesh>
        <mesh position={[0.33, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.07, 0.16, 16]} />
          <MatteWhite />
        </mesh>
        <mesh position={[0.04, 0, 0]}>
          <boxGeometry args={[0.16, 0.02, 0.78]} />
          <MatteMaterial color={accent} />
        </mesh>
        <mesh position={[-0.23, 0.1, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.1, 0.16, 0.02]} />
          <MatteMaterial color={accent} />
        </mesh>
      </group>

      {/* Floating Map Pin */}
      <group ref={pinRef} position={[1.35, 0.85, 0.2]}>
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.24, 24, 24]} />
          <MatteMaterial color={accent} />
        </mesh>
        <mesh position={[0, 0.22, 0.16]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <MatteWhite />
        </mesh>
        <mesh position={[0, -0.04, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.22, 0.4, 24]} />
          <MatteMaterial color={accent} />
        </mesh>
      </group>
    </group>
  );
}

/* =========================================================
   6. REAL ESTATE (Classy Matte Villa, Skyscraper & Key)
========================================================= */

function Property({ accent }: { accent: string }) {
  const cityRef = useRef<THREE.Group>(null);
  const keyRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    const time = Date.now() * 0.0012;

    if (cityRef.current) {
      cityRef.current.rotation.y = Math.sin(time * 0.6) * 0.3;
    }
    if (keyRef.current) {
      keyRef.current.rotation.y += d * 1.0;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      <Float speed={1.5} floatIntensity={0.2} rotationIntensity={0.08}>
        <group ref={cityRef}>
          {/* Glass High-Rise Tower */}
          <group position={[0.45, 0.25, -0.1]}>
            <RoundedBox args={[0.9, 2.5, 0.9]} radius={0.07} smoothness={4}>
              <MatteSlate />
            </RoundedBox>
            {/* Slanted Crown */}
            <mesh position={[0, 1.42, 0]} rotation={[0, Math.PI / 4, 0]}>
              <coneGeometry args={[0.64, 0.7, 4]} />
              <MatteMaterial color={accent} />
            </mesh>
            {/* Window Floor Stripes */}
            {[-0.7, -0.25, 0.2, 0.65, 1.0].map((y, i) => (
              <mesh key={i} position={[0, y, 0]}>
                <boxGeometry args={[0.92, 0.045, 0.92]} />
                <SoftAccentGlow color={accent} intensity={0.7} />
              </mesh>
            ))}
          </group>

          {/* Architectural House / Residence */}
          <group position={[-0.8, -0.32, 0.25]}>
            <RoundedBox args={[1.2, 0.95, 1.0]} radius={0.06} smoothness={4}>
              <MatteWhite />
            </RoundedBox>
            <mesh position={[0, 0.72, 0]} rotation={[0, Math.PI / 4, 0]}>
              <coneGeometry args={[0.98, 0.6, 4]} />
              <MatteMaterial color={accent} />
            </mesh>
            <mesh position={[0.22, 0.08, 0.51]}>
              <boxGeometry args={[0.4, 0.4, 0.03]} />
              <SoftAccentGlow color="#60C7FF" intensity={0.9} />
            </mesh>
            <mesh position={[-0.26, -0.15, 0.51]}>
              <boxGeometry args={[0.26, 0.5, 0.03]} />
              <MatteSlate />
            </mesh>
          </group>
        </group>
      </Float>

      {/* Floating Smart Key */}
      <Float speed={2.2} floatIntensity={0.4} rotationIntensity={0.2}>
        <group ref={keyRef} position={[-1.35, 0.75, 0.2]}>
          <mesh>
            <torusGeometry args={[0.22, 0.04, 16, 24]} />
            <MatteMaterial color="#f59e0b" metalness={0.2} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.35, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.4, 16]} />
            <MatteMaterial color="#f59e0b" metalness={0.2} roughness={0.3} />
          </mesh>
          <mesh position={[0.07, -0.45, 0]}>
            <boxGeometry args={[0.1, 0.05, 0.03]} />
            <MatteMaterial color="#f59e0b" metalness={0.2} roughness={0.3} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

/* =========================================================
   BUTTERY SMOOTH INCOMING TRANSITION & PARALLAX RIG
========================================================= */

function TransitionRig({
  scene,
  children,
}: {
  scene: SectorScene;
  children: React.ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const transitionProgress = useRef(0);
  const currentScene = useRef(scene);

  const scaleBase = Math.min(1.2, Math.max(0.78, viewport.width / 6.0));

  useEffect(() => {
    if (scene !== currentScene.current) {
      currentScene.current = scene;
      transitionProgress.current = 0; // Trigger smooth scale-in & settle
    }
  }, [scene]);

  useFrame(({ pointer }, delta) => {
    const d = Math.min(delta, 0.05);

    // Smooth ease-out curve on scene entry (0 -> 1)
    if (transitionProgress.current < 1) {
      transitionProgress.current = Math.min(1, transitionProgress.current + d * 3.2);
    }

    // Cubic smooth ease
    const t = transitionProgress.current;
    const ease = 1 - Math.pow(1 - t, 3);
    const enterScale = THREE.MathUtils.lerp(0.82, 1.0, ease);
    const enterY = THREE.MathUtils.lerp(-0.25, 0.0, ease);

    if (groupRef.current) {
      // Gentle pointer parallax tracking
      const targetRotX = pointer.y * 0.18 + 0.06;
      const targetRotY = pointer.x * 0.24;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * (d * 3.5);
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * (d * 3.5);

      const targetScale = scaleBase * enterScale;
      groupRef.current.scale.set(targetScale, targetScale, targetScale);
      groupRef.current.position.y = enterY;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

/* =========================================================
   SCENE ROUTER & STUDIO LIGHTING
========================================================= */

function SceneVisualContent({
  scene,
  accent,
}: {
  scene: SectorScene;
  accent: string;
}) {
  const visual = useMemo(() => {
    switch (scene) {
      case "factory":
        return <Factory accent={accent} />;
      case "health":
        return <Health accent={accent} />;
      case "finance":
        return <Finance accent={accent} />;
      case "retail":
        return <Retail accent={accent} />;
      case "supply":
        return <Supply accent={accent} />;
      case "property":
        return <Property accent={accent} />;
      default:
        return null;
    }
  }, [scene, accent]);

  return (
    <>
      {/* Soft Studio Ambient Fill & Key Light */}
      <ambientLight intensity={1.4} />
      <directionalLight position={[5, 8, 6]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[-5, -3, -3]} intensity={0.6} color="#f1f5f9" />
      <pointLight position={[0, 1.5, 4]} intensity={14} distance={10} color={accent} />

      {/* Smooth Incoming Transition & Parallax Rig */}
      <TransitionRig scene={scene}>{visual}</TransitionRig>

      {/* Soft, Subtle Ground Shadow */}
      <ContactShadows position={[0, -1.8, 0]} opacity={0.25} scale={7.5} blur={2.5} far={3.5} color="#0f172a" />
    </>
  );
}

export default function SectorCanvas({
  scene,
  accent,
  active = true,
}: {
  scene: SectorScene;
  accent: string;
  active?: boolean;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0.1, 6.8], fov: 40 }}
    >
      <Suspense fallback={null}>
        <SceneVisualContent scene={scene} accent={accent} />
      </Suspense>
    </Canvas>
  );
}
