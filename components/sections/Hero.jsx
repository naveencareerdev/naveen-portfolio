"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import { hero } from "@/lib/data";
import Button from "@/components/ui/Button";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

const words = hero.headline.split(" ");

export default function Hero() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink px-6"
    >
      {/* Ambient gradient layers drift slowly and independently of the
          cursor-driven 3D layer above them — two distinct speeds of motion
          in the same background. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 -top-1/4 h-[70vh] w-[70vh] animate-drift rounded-full bg-signal/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/4 -right-1/4 h-[65vh] w-[65vh] animate-drift rounded-full bg-verified/10 blur-[120px]"
        style={{ animationDelay: "-9s" }}
      />

      {!prefersReducedMotion && (
        <div className="absolute inset-0" aria-hidden="true">
          <HeroScene scrollProgress={scrollYProgress} />
        </div>
      )}

      <div className="relative z-10 flex max-w-4xl flex-col items-center px-2 text-center">
        <h1 className="text-clamp-hero font-display font-medium uppercase leading-[0.95] tracking-tightest text-bone">
          {words.map((word, i) => (
            <span
              key={word}
              className="inline-block overflow-hidden pb-1 pr-[0.2em] align-top last:pr-0"
            >
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-balance text-base text-mute sm:text-lg"
        >
          {hero.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href={hero.ctaPrimary.href} cursorLabel="View">
            {hero.ctaPrimary.label}
          </Button>
          <Button
            href={hero.ctaSecondary.href}
            variant="outline"
            cursorLabel="Open"
          >
            {hero.ctaSecondary.label}
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="relative h-12 w-px overflow-hidden bg-line">
          <motion.div
            className="absolute left-0 top-0 h-1/2 w-full bg-signal"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
