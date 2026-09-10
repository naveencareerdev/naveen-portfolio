export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start, end, t) {
  return start + (end - start) * t;
}

// Maps a value from one range to another, clamped to the output range.
export function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return outMin + t * (outMax - outMin);
}

// Scrolls to a selector via the shared Lenis instance when available,
// falling back to native smooth scrolling (e.g. reduced-motion mode,
// where Lenis is never instantiated).
export function scrollToSelector(lenis, selector, offset = -88) {
  if (typeof document === "undefined") return;
  const el = document.querySelector(selector);
  if (!el) return;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(el, { offset, duration: 1.3 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function scrollToTop(lenis) {
  if (typeof window === "undefined") return;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(0, { duration: 1.2 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
