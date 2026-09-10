"use client";

import Image from "next/image";
import { ArrowDownRight, Download, FileText, MapPin } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import DecryptedText from "@/components/ui/DecryptedText";
import { about, personal } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative bg-ink px-6 py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <Reveal variant="scale" className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
              <Image
                src="/naveen-portrait.png"
                alt="Naveen A"
                fill
                sizes="(min-width: 1024px) 384px, (min-width: 640px) 384px, calc(100vw - 3rem)"
                className="object-cover object-[center_18%]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-signal/5" />
              <div className="absolute inset-6 rounded-[1.35rem] border border-bone/20" />
              <div className="absolute bottom-6 left-6 flex items-center gap-2 border border-bone/20 bg-ink/65 px-3 py-2 text-xs font-medium tracking-[0.16em] text-bone/90 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-verified" />
                NAVEEN A
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-mute">
              <MapPin size={14} />
              <span>{personal.location}</span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Reveal variant="fade-up">
            <h2 className="max-w-4xl text-clamp-h2 font-display font-medium leading-[1.05] text-bone">
              <DecryptedText
                text="Systems that stay correct when everything else is moving."
                speed={45}
                maxIterations={8}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
                animateOn="view"
              />
            </h2>
          </Reveal>

          <div className="mt-8 max-w-none space-y-5">
            {about.bio.map((para, i) => (
              <Reveal key={i} variant="fade-up" delay={i * 0.08}>
                <p className="text-balance text-base leading-relaxed text-mute sm:text-lg">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal variant="fade-up" delay={0.12}>
            <a
              href={personal.resumeFile}
              download
              data-cursor="Download"
              className="group mt-10 flex w-full max-w-md items-center gap-4 border border-line bg-surface/60 p-4 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-signal/70 hover:bg-surface hover:shadow-[0_18px_50px_rgba(232,150,60,0.12)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-signal/40 bg-signal/10 text-signal transition-colors duration-500 group-hover:bg-signal group-hover:text-ink">
                <Download size={19} />
              </span>
              <span className="min-w-0 flex-1 text-left">
                <span className="flex items-center gap-2 font-display text-lg text-bone">
                  Download Resume
                  <FileText size={15} className="text-signal" />
                </span>
                <span className="mt-1 block text-xs text-mute">
                  PDF · A concise overview of my experience
                </span>
              </span>
              <ArrowDownRight
                size={20}
                className="shrink-0 text-mute transition-all duration-500 group-hover:translate-y-1 group-hover:translate-x-1 group-hover:text-signal"
              />
            </a>
          </Reveal>

          <Reveal variant="fade-up" delay={0.1}>
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-y border-line py-7">
              {about.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-4xl text-signal">
                    {stat.value}
                  </p>
                  <p className="mt-1 max-w-[12rem] text-sm text-mute">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 space-y-6">
            {about.skillGroups.map((group, i) => (
              <Reveal key={group.title} variant="fade" delay={i * 0.06}>
                <div className="grid gap-3 border-t border-line/70 pt-5 lg:grid-cols-[9.5rem_1fr] lg:gap-6">
                  <div className="flex items-center gap-3 lg:items-start">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-signal/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mute">
                      {group.title}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {group.items.map((item, itemIndex) => (
                      <div
                        key={item}
                        className="group relative overflow-hidden border border-line bg-surface/45 px-4 py-3 transition-all duration-500 ease-premium hover:-translate-y-0.5 hover:border-signal/60 hover:bg-surface"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute inset-y-0 left-0 w-0.5 bg-verified transition-colors duration-500 group-hover:bg-signal"
                        />
                        <span className="relative flex items-center justify-between gap-3 text-sm text-bone/90">
                          {item}
                          <span className="font-mono text-[10px] tracking-wider text-mute/60 transition-colors duration-500 group-hover:text-signal">
                            {String(itemIndex + 1).padStart(2, "0")}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
