"use client";

import { useEffect, useState } from "react";

// True only for devices with a precise pointer (mouse/trackpad). Used to
// gate the custom cursor and heavier hover-driven 3D interactions so touch
// devices get the plain, native experience instead of a half-working one.
export function useFinePointer() {
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsFine(mq.matches);
    const handler = (e) => setIsFine(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isFine;
}
