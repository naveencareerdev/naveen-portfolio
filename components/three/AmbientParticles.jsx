"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 24 }, (_, index) => ({ left: `${(index * 37) % 100}%`, top: `${(index * 61) % 100}%`, size: 2 + (index % 4), color: index % 2 ? "#4FBEA6" : "#E8963C", duration: 7 + (index % 6) }));

export default function AmbientParticles() {
  return <div className="relative h-full w-full overflow-hidden" aria-hidden="true">
    {particles.map((particle, index) => <motion.span key={index} className="absolute rounded-full" style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size, backgroundColor: particle.color, boxShadow: `0 0 12px ${particle.color}` }} animate={{ x: [0, index % 2 ? 34 : -34, 0], y: [0, -42, 0], opacity: [0.1, 0.7, 0.1] }} transition={{ duration: particle.duration, repeat: Infinity, ease: "easeInOut", delay: index * 0.12 }} />)}
  </div>;
}
