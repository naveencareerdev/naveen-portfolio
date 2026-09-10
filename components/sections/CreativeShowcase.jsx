"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useScroll, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { systemNodes } from "@/lib/data";

const SystemCore = dynamic(() => import("@/components/three/SystemCore"), {
  ssr: false,
});

function StaticOrbit() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="mx-auto h-full max-h-[420px] w-full max-w-[420px]"
      aria-hidden="true"
    >
      <circle cx="200" cy="200" r="42" fill="#182420" stroke="#E8963C" strokeOpacity="0.5" />
      {[90, 130, 170].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#25332F" />
      ))}
      {systemNodes.map((label, i) => {
        const angle = (i / systemNodes.length) * Math.PI * 2;
        const r = 90 + (i % 3) * 40;
        const x = 200 + Math.cos(angle) * r;
        const y = 200 + Math.sin(angle) * r;
        return (
          <circle
            key={label}
            cx={x}
            cy={y}
            r="6"
            fill={i % 2 === 0 ? "#E8963C" : "#4FBEA6"}
          />
        );
      })}
    </svg>
  );
}

export default function CreativeShowcase() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="systems"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink px-6 py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 animate-drift rounded-full bg-verified/5 blur-[140px]"
      />

      <Reveal variant="fade-up" className="relative z-10 max-w-xl text-center">
        <p className="font-display italic text-mute">The stack, made visible</p>
        <h2 className="mt-4 text-clamp-h1 font-display font-medium leading-[1.05] text-bone">
          Every sync is a system, quietly holding together.
        </h2>
      </Reveal>

      <div className="relative z-10 mt-4 h-[65vh] w-full max-w-3xl">
        {prefersReducedMotion ? (
          <StaticOrbit />
        ) : (
          <SystemCore scrollProgress={scrollYProgress} />
        )}
      </div>
    </section>
  );
}
