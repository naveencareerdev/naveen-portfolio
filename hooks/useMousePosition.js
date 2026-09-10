"use client";

import { useEffect, useState } from "react";

// Tracks raw pixel position (x, y) and normalized (-1 to 1) position (nx, ny)
// for parallax and pointer-reactive effects.
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    function handleMove(e) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setPosition({ x: e.clientX, y: e.clientY, nx, ny });
    }
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return position;
}
