"use client";

import { motion, useTransform } from "framer-motion";
import { systemNodes } from "@/lib/data";

const orbitNodes = [
  { radius: 112, accent: "signal", duration: 13, direction: 1, angle: 0 },
  { radius: 148, accent: "verified", duration: 17, direction: -1, angle: 52 },
  { radius: 184, accent: "signal", duration: 21, direction: 1, angle: 118 },
  { radius: 220, accent: "verified", duration: 25, direction: -1, angle: 186 },
  { radius: 254, accent: "signal", duration: 29, direction: 1, angle: 244 },
  { radius: 282, accent: "verified", duration: 33, direction: -1, angle: 306 },
];

export default function SystemCore({ scrollProgress }) {
  const rotation = useTransform(scrollProgress, [0, 1], [-7, 7]);
  const scale = useTransform(scrollProgress, [0, 1], [1, 1.04]);

  return (
    <motion.div className="relative mx-auto aspect-square h-full max-h-[620px] w-full max-w-[620px]" style={{ rotate: rotation, scale }}>
      <svg viewBox="0 0 620 620" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {orbitNodes.map((node, index) => <circle key={systemNodes[index]} cx="310" cy="310" r={node.radius} fill="none" stroke={index % 2 === 0 ? "#8A5F2C" : "#2F6E60"} strokeOpacity="0.42" strokeWidth="1.25" />)}
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div className="flex h-28 w-28 items-center justify-center rounded-[34%] border border-signal/60 bg-surface shadow-[0_0_70px_rgba(232,150,60,0.22)]" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
          <span className="h-12 w-12 rounded-[38%] border border-verified/70 bg-ink shadow-[0_0_34px_rgba(79,190,166,0.22)]" />
        </motion.div>
      </div>

      {orbitNodes.map((node, index) => {
        const label = systemNodes[index];
        const isSignal = node.accent === "signal";
        const orbitSize = `${(node.radius / 310) * 100}%`;
        return (
          <motion.div
            key={label}
            className="absolute left-1/2 top-1/2"
            style={{ width: orbitSize, height: orbitSize, x: "-50%", y: "-50%", rotate: node.angle, transformOrigin: "center" }}
            animate={{ rotate: node.angle + node.direction * 360 }}
            transition={{ duration: node.duration, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute left-1/2 top-0"
              animate={{ rotate: node.direction * -360 }}
              transition={{ duration: node.duration, repeat: Infinity, ease: "linear" }}
            >
              <div className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-ink/95 px-3 py-2 text-xs text-bone shadow-xl backdrop-blur-sm">
                <span className={`h-2 w-2 shrink-0 rounded-full ${isSignal ? "bg-signal shadow-[0_0_10px_#E8963C]" : "bg-verified shadow-[0_0_10px_#4FBEA6]"}`} />
                {label}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
