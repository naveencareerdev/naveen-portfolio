"use client";

import { motion, useTransform } from "framer-motion";

const nodes = [
  { x: "16%", y: "23%", size: 42, color: "#E8963C", delay: 0 },
  { x: "75%", y: "30%", size: 54, color: "#4FBEA6", delay: 0.7 },
  { x: "24%", y: "72%", size: 31, color: "#4FBEA6", delay: 1.2 },
  { x: "70%", y: "72%", size: 38, color: "#E8963C", delay: 1.8 },
  { x: "50%", y: "84%", size: 24, color: "#8B968F", delay: 2.2 },
];

export default function HeroScene({ scrollProgress }) {
  const y = useTransform(scrollProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollProgress, [0, 1], [0.75, 0.2]);

  return (
    <motion.div className="relative h-full w-full" style={{ y, opacity }}>
      <svg viewBox="0 0 1000 700" className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M160 165 L750 210 L700 505 L245 500 L500 590" fill="none" stroke="#25332F" strokeWidth="1.5" />
        <path d="M160 165 L245 500 M750 210 L500 590" fill="none" stroke="#33443F" strokeWidth="1" strokeDasharray="5 10" />
      </svg>
      {nodes.map((node, index) => (
        <motion.span
          key={`${node.x}-${node.y}`}
          className="absolute rounded-full border border-bone/20"
          style={{ left: node.x, top: node.y, width: node.size, height: node.size, backgroundColor: node.color, boxShadow: `0 0 36px ${node.color}` }}
          animate={{ y: [0, -14, 0], scale: [1, 1.12, 1], rotate: [0, 140, 280] }}
          transition={{ duration: 5 + index * 0.55, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
}
