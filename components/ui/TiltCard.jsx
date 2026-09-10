"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TiltCard({ children, className, intensity = 7 }) {
  const ref = useRef(null);
  const glowRef = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.6 };
  const spx = useSpring(px, springConfig);
  const spy = useSpring(py, springConfig);

  const rotateX = useTransform(spy, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(spx, [0, 1], [-intensity, intensity]);

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    px.set(x);
    py.set(y);
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(520px circle at ${
        x * 100
      }% ${y * 100}%, rgba(237,238,234,0.07), transparent 70%)`;
    }
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
    if (glowRef.current) glowRef.current.style.background = "transparent";
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1300 }}
      className={cn("relative", className)}
    >
      {children}
      <div ref={glowRef} aria-hidden className="pointer-events-none absolute inset-0" />
    </motion.div>
  );
}
