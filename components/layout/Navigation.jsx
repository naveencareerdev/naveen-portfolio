"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, personal } from "@/lib/data";
import { useLenis } from "./SmoothScroll";
import { scrollToSelector, scrollToTop, cn } from "@/lib/utils";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleLogoClick(e) {
    e.preventDefault();
    setMenuOpen(false);
    scrollToTop(lenis);
  }

  function handleNavClick(e, href) {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSelector(lenis, href);
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 px-4 transition-all duration-500 ease-premium sm:px-6",
          scrolled ? "py-3" : "py-6"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ease-premium",
            scrolled
              ? "border border-line/70 bg-ink/70 backdrop-blur-md"
              : "border border-transparent bg-transparent"
          )}
        >
          <a
            href="#hero"
            onClick={handleLogoClick}
            data-cursor="Top"
            className="font-display text-lg italic tracking-tight text-bone"
          >
            {personal.name}
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                data-cursor="Go"
                className="text-sm text-mute transition-colors duration-300 hover:text-bone"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center text-bone md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ink/98 backdrop-blur-md md:hidden"
          >
            {nav.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                className="font-display text-3xl italic text-bone"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
