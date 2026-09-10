"use client";

import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { personal } from "@/lib/data";
import { useLenis } from "./SmoothScroll";
import { scrollToTop } from "@/lib/utils";

export default function Footer() {
  const lenis = useLenis();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={() => scrollToTop(lenis)}
            data-cursor="Top"
            className="font-display text-xl italic text-bone"
          >
            {personal.name}
          </button>

          <div className="flex items-center gap-5">
            <a
              href={personal.social.github}
              data-cursor="Open"
              aria-label="GitHub"
              className="text-mute transition-colors duration-300 hover:text-bone"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={personal.social.linkedin}
              data-cursor="Open"
              aria-label="LinkedIn"
              className="text-mute transition-colors duration-300 hover:text-bone"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={personal.emailComposeUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="Email"
              aria-label="Email"
              className="text-mute transition-colors duration-300 hover:text-bone"
            >
              <Mail size={18} />
            </a>
          </div>

          <button
            type="button"
            onClick={() => scrollToTop(lenis)}
            data-cursor="Up"
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-mute transition-colors duration-300 hover:border-signal hover:text-signal"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-line/60 pt-6 text-xs text-mute sm:flex-row">
          <p>
            © {year} {personal.name}. All rights reserved.
          </p>
          <p>Built with Next.js, React Three Fiber &amp; Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
