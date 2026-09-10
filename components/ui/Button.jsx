"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLenis } from "@/components/layout/SmoothScroll";
import { cn, scrollToSelector } from "@/lib/utils";

const variants = {
  solid: { wrapper: "bg-signal", textIdle: "text-ink" },
  outline: { wrapper: "border border-line", textIdle: "text-bone" },
};

export default function Button({
  href,
  children,
  variant = "solid",
  cursorLabel,
  className,
  ...props
}) {
  const lenis = useLenis();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 16, mass: 0.5 });

  const isAnchor = href?.startsWith("#");

  function handleClick(e) {
    if (isAnchor) {
      e.preventDefault();
      scrollToSelector(lenis, href);
    }
  }

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const v = variants[variant] ?? variants.solid;

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={cursorLabel}
      style={{ x: sx, y: sy }}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden px-7 py-3.5 text-[15px] font-medium tracking-wide",
        v.wrapper,
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 bg-bone transition-transform duration-500 ease-premium group-hover:scale-x-100"
      />
      <span
        className={cn(
          "relative z-10 transition-colors duration-500 ease-premium group-hover:text-ink",
          v.textIdle
        )}
      >
        {children}
      </span>
    </motion.a>
  );
}
