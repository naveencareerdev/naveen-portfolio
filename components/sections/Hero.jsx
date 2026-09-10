"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/lib/data";
import Button from "@/components/ui/Button";
import { ShaderAnimation } from "@/components/ui/shader-animation";

const words = hero.headline.split(" ");

export default function Hero() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#080b0f] px-6"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {!prefersReducedMotion && <ShaderAnimation />}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,11,15,0.18)_48%,rgba(8,11,15,0.82)_100%)]" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

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
