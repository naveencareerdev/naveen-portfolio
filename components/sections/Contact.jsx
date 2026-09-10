"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { contact, personal } from "@/lib/data";

const AmbientParticles = dynamic(
  () => import("@/components/three/AmbientParticles"),
  { ssr: false }
);

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative flex min-h-[90svh] flex-col items-center justify-center overflow-hidden bg-ink px-6 py-28 text-center"
    >
      {!prefersReducedMotion && (
        <div className="absolute inset-0" aria-hidden="true">
          <AmbientParticles />
        </div>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 animate-drift rounded-full bg-signal/5 blur-[160px]"
      />

      <div className="relative z-10 flex max-w-2xl flex-col items-center">
        <Reveal variant="blur">
          <h2 className="text-clamp-hero font-display font-medium uppercase leading-[0.98] tracking-tightest text-bone">
            {contact.headline}
          </h2>
        </Reveal>

        <Reveal variant="fade-up" delay={0.15}>
          <p className="mt-6 max-w-md text-balance text-mute">{contact.sub}</p>
        </Reveal>

        <Reveal variant="fade-up" delay={0.28}>
          <div className="mt-10">
            <Button
              href={personal.emailComposeUrl}
              target="_blank"
              rel="noreferrer"
              cursorLabel="Email"
            >
              {contact.ctaLabel}
            </Button>
          </div>
        </Reveal>

        <Reveal variant="fade" delay={0.4}>
          <div className="mt-14 flex flex-col items-center gap-4 text-sm text-mute sm:flex-row sm:gap-8">
            <a
              href={personal.emailComposeUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="Email"
              className="transition-colors hover:text-bone"
            >
              {personal.email}
            </a>
            <span className="hidden h-1 w-1 rounded-full bg-line sm:block" />
            <span className="flex items-center gap-1.5">
              <MapPin size={14} />
              {personal.location}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-line sm:block" />
            <div className="flex items-center gap-4">
              <a
                href={personal.social.github}
                data-cursor="Open"
                aria-label="GitHub"
                className="transition-colors hover:text-bone"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href={personal.social.linkedin}
                data-cursor="Open"
                aria-label="LinkedIn"
                className="transition-colors hover:text-bone"
              >
                <LinkedinIcon size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
