"use client";

import { motion } from "framer-motion";

const variantsMap = {
  "fade-up": {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(14px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0 },
  },
};

// Scroll-triggered reveal. `variant` picks from the brief's own motion
// vocabulary (fade / slide / blur-to-sharp / scale) so different content
// types get a treatment suited to them instead of one repeated effect.
export default function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.9,
  className,
  as = "div",
  once = true,
  amount = 0.3,
}) {
  const Component = motion[as] || motion.div;
  const chosen = variantsMap[variant] ?? variantsMap["fade-up"];

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={chosen}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
}
