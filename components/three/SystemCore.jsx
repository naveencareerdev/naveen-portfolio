"use client";

import { motion, useTransform } from "framer-motion";
import { systemNodes } from "@/lib/data";

const orbitNodes = [
  { x: 50, y: 10, accent: "signal" },
  { x: 82, y: 30, accent: "verified" },
  { x: 79, y: 71, accent: "signal" },
  { x: 53, y: 89, accent: "verified" },
  { x: 20, y: 71, accent: "signal" },
  { x: 17, y: 30, accent: "verified" },
];

export default function SystemCore({ scrollProgress }) {
  const rotation = useTransform(scrollProgress, [0, 1], [-7, 7]);
  const scale = useTransform(scrollProgress, [0, 1], [1, 1.04]);

  return (
    <motion.div className="relative mx-auto h-full w-full max-w-[620px]" style={{ rotate: rotation, scale }}>
      <svg viewBox="0 0 620 620" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[118, 188, 258].map((radius) => <circle key={radius} cx="310" cy="310" r={radius} fill="none" stroke="#25332F" strokeWidth="1.25" />)}
        {orbitNodes.map((node, index) => <line key={systemNodes[index]} x1="310" y1="310" x2={(node.x / 100) * 620} y2={(node.y / 100) * 620} stroke={index % 2 === 0 ? "#8A5F2C" : "#2F6E60"} strokeOpacity="0.42" strokeDasharray="5 12" />)}
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div className="flex h-28 w-28 items-center justify-center rounded-[34%] border border-signal/60 bg-surface shadow-[0_0_70px_rgba(232,150,60,0.22)]" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
          <span className="h-12 w-12 rounded-[38%] border border-verified/70 bg-ink shadow-[0_0_34px_rgba(79,190,166,0.22)]" />
        </motion.div>
      </div>

      {orbitNodes.map((node, index) => {
        const label = systemNodes[index];
        const isSignal = node.accent === "signal";
        return (
          <motion.div key={label} className="absolute" style={{ left: `${node.x}%`, top: `${node.y}%` }} animate={{ y: ["-50%", `calc(-50% + ${index % 2 ? 8 : -8}px)`, "-50%"] }} transition={{ duration: 4.5 + index * 0.35, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}>
            <div className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-ink/95 px-3 py-2 text-xs text-bone shadow-xl backdrop-blur-sm">
              <span className={`h-2 w-2 shrink-0 rounded-full ${isSignal ? "bg-signal shadow-[0_0_10px_#E8963C]" : "bg-verified shadow-[0_0_10px_#4FBEA6]"}`} />
              {label}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
