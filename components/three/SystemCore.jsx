"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { siJsonwebtokens, siMysql, siReact, siShopify, siSupabase } from "simple-icons";
import { systemNodes } from "@/lib/data";

const ORBIT_DIRECTION = 1;
const ORBIT_DURATION = 24;

// Ring radii, innermost (ring 1) to outermost (ring 6). Nodes reference a
// ring index instead of a raw radius so "which circle does this start on"
// is explicit and can't drift out of sync with the drawn rings below.
const RING_RADII = [225, 675, 1125, 1575, 2025, 2475];
const LANE_SPACING = RING_RADII[1] - RING_RADII[0];

// How far (in SVG units) a node drifts off its home ring as it orbits, and
// how many lane-changes it completes per full revolution. This is what
// makes a node weave across neighboring rings instead of tracing a single
// fixed circle forever.
const LANE_DRIFT_AMPLITUDE = LANE_SPACING * 0.85;
const MIN_ORBIT_RADIUS = 150;
const MAX_ORBIT_RADIUS = RING_RADII[RING_RADII.length - 1] + LANE_SPACING / 2;

const orbitNodes = [
  { ring: 3, accent: "signal", angle: 0, logo: siReact, driftCycles: 1, driftPhase: 0 },
  { ring: 1, accent: "verified", angle: 60, logo: siMysql, driftCycles: 1.5, driftPhase: 40 },
  { ring: 2, accent: "signal", angle: 120, logo: siSupabase, driftCycles: 1, driftPhase: 200 },
  { ring: 4, accent: "verified", angle: 180, logo: "api", driftCycles: 2, driftPhase: 90 },
  { ring: 5, accent: "signal", angle: 240, logo: siShopify, driftCycles: 1.5, driftPhase: 260 },
  { ring: 6, accent: "verified", angle: 300, logo: siJsonwebtokens, driftCycles: 1, driftPhase: 140 },
];

const logoTileClass = "flex h-14 w-14 shrink-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[38%] border bg-ink/95 font-mono text-[10px] font-semibold tracking-[0.08em] text-bone shadow-xl backdrop-blur-sm";

function TechnologyLogo({ logo, color }) {
  if (logo === "api") {
    return <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true"><path d="m11 8-6 8 6 8M21 8l6 8-6 8M18 6l-4 20" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" /></svg>;
  }

  return <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true"><path d={logo.path} fill={color} /></svg>;
}

function OrbitNode({ node, label, parentRotation }) {
  const orbitRotation = useMotionValue(node.angle);
  const labelRotation = useTransform(
    [orbitRotation, parentRotation],
    ([orbit, parent]) => -(orbit + parent),
  );

  useEffect(() => {
    const animation = animate(orbitRotation, node.angle + ORBIT_DIRECTION * 360, {
      duration: ORBIT_DURATION,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
    });

    return () => animation.stop();
  }, [node.angle, orbitRotation]);

  // The node's live distance from center: its home ring plus a sine drift
  // that carries it into neighboring lanes and back as it travels, instead
  // of holding a single fixed radius for the whole orbit.
  const baseRadius = RING_RADII[node.ring - 1];
  const orbitRadius = useTransform(orbitRotation, (angle) => {
    const travelled = angle - node.angle;
    const driftAngle = (travelled * node.driftCycles + node.driftPhase) * (Math.PI / 180);
    const drifted = baseRadius + LANE_DRIFT_AMPLITUDE * Math.sin(driftAngle);
    return Math.min(MAX_ORBIT_RADIUS, Math.max(MIN_ORBIT_RADIUS, drifted));
  });
  const orbitSize = useTransform(orbitRadius, (radius) => `${(radius / 2700) * 100}%`);

  const isSignal = node.accent === "signal";

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ width: orbitSize, height: orbitSize, x: "-50%", y: "-50%", rotate: orbitRotation, transformOrigin: "center" }}
    >
      <motion.div
        className="absolute left-1/2 top-0"
        style={{ rotate: labelRotation }}
      >
        <div
          role="img"
          aria-label={label}
          title={label}
          className={`${logoTileClass} ${isSignal ? "border-signal/60 shadow-[0_0_20px_rgba(232,150,60,0.18)]" : "border-verified/60 shadow-[0_0_20px_rgba(79,190,166,0.18)]"}`}
        >
          <span className={`absolute h-2 w-2 -translate-y-5 rounded-full ${isSignal ? "bg-signal shadow-[0_0_10px_#E8963C]" : "bg-verified shadow-[0_0_10px_#4FBEA6]"}`} />
          <TechnologyLogo logo={node.logo} color={isSignal ? "#E8963C" : "#4FBEA6"} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SystemCore({ scrollProgress }) {
  const rotation = useTransform(scrollProgress, [0, 1], [-7, 7]);
  const scale = useTransform(scrollProgress, [0, 1], [1, 1.04]);

  return (
    <motion.div className="relative mx-auto aspect-square h-full max-h-[900px] w-full max-w-[900px]" style={{ rotate: rotation, scale }}>
      <svg viewBox="0 0 5400 5400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {RING_RADII.map((radius, index) => <circle key={radius} cx="2700" cy="2700" r={radius} fill="none" stroke={index % 2 === 0 ? "#8A5F2C" : "#2F6E60"} strokeOpacity="0.42" strokeWidth="1.25" />)}
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div className="flex h-28 w-28 items-center justify-center rounded-[34%] border border-signal/60 bg-surface shadow-[0_0_70px_rgba(232,150,60,0.22)]" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
          <span className="h-12 w-12 rounded-[38%] border border-verified/70 bg-ink shadow-[0_0_34px_rgba(79,190,166,0.22)]" />
        </motion.div>
      </div>

      {orbitNodes.map((node, index) => {
        return <OrbitNode key={systemNodes[index]} node={node} label={systemNodes[index]} parentRotation={rotation} />;
      })}
    </motion.div>
  );
}
