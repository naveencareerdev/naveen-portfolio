"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { timeline } from "@/lib/data";

const variantCycle = ["fade-up", "slide-right", "blur"];

export default function Experience() {
  const railRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start center", "end center"],
  });

  return (
    <section id="experience" className="relative bg-ink px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal variant="fade-up">
          <h2 className="text-clamp-h2 font-display font-medium leading-[1.05] text-bone">
            A short, steady climb.
          </h2>
        </Reveal>

        <div ref={railRef} className="relative mt-16 pl-8 sm:pl-10">
          <div className="absolute left-0 top-0 h-full w-px bg-line" />
          <motion.div
            className="absolute left-0 top-0 h-full w-px origin-top bg-signal"
            style={{ scaleY: scrollYProgress }}
          />

          <div className="space-y-14">
            {timeline.map((item, i) => (
              <Reveal
                key={item.title}
                variant={variantCycle[i % variantCycle.length]}
                className="relative"
              >
                <span
                  className="absolute -left-[38px] top-1.5 h-3 w-3 rounded-full border-2 border-ink sm:-left-[46px]"
                  style={{
                    backgroundColor:
                      item.type === "work" ? "#E8963C" : "#4FBEA6",
                  }}
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-xl text-bone">
                    {item.title}
                  </h3>
                  <span className="text-sm text-mute">{item.period}</span>
                </div>
                <p className="mt-1 flex items-center gap-2 text-sm text-mute">
                  {item.type === "work" ? (
                    <Briefcase size={13} />
                  ) : (
                    <GraduationCap size={13} />
                  )}
                  {item.place}
                </p>
                <p className="mt-2 text-sm text-signal">{item.detail}</p>

                {item.points && (
                  <ul className="mt-4 space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm text-mute">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-line" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
