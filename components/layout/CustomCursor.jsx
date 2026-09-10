"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "@/hooks/useFinePointer";

// A small follower cursor that expands and shows a label over anything
// tagged with data-cursor="Label". Only ever mounts on fine-pointer
// (mouse/trackpad) devices — touch devices keep their native behaviour.
export default function CustomCursor() {
  const isFine = useFinePointer();
  const [label, setLabel] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { damping: 26, stiffness: 1600, mass: 0.08 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  useEffect(() => {
    if (!isFine) return;
    document.documentElement.classList.add("has-custom-cursor");

    function handleMove(e) {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target.closest && e.target.closest("[data-cursor]");
      if (target) {
        setIsHovering(true);
        setLabel(target.getAttribute("data-cursor") || "");
      } else {
        setIsHovering(false);
        setLabel("");
      }
    }
    function handleDown() {
      setIsPressed(true);
    }
    function handleUp() {
      setIsPressed(false);
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [isFine, x, y]);

  if (!isFine) return null;

  const size = isHovering ? 92 : isPressed ? 8 : 14;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        backgroundColor: isHovering ? "#EDEEEA" : "#E8963C",
      }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      {isHovering && label ? (
        <span className="whitespace-nowrap font-sans text-[11px] font-medium text-ink">
          {label}
        </span>
      ) : null}
    </motion.div>
  );
}
