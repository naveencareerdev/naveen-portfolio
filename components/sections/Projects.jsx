"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import Button from "@/components/ui/Button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { projects, personal } from "@/lib/data";

function SyncGraphic() {
  const bars = [42, 66, 30, 82, 52, 70, 46];
  return (
    <div className="relative flex h-full w-full items-end justify-center gap-2.5 p-10 sm:gap-3">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
          style={{ background: i % 3 === 0 ? "#E8963C" : "#25332F" }}
        />
      ))}
      <span className="absolute left-6 top-6 flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verified opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-verified" />
      </span>
    </div>
  );
}

function ApprovalGraphic() {
  const rows = [
    { role: "Employee", status: "Uploaded" },
    { role: "Manager", status: "Reviewing" },
    { role: "Admin", status: "Approved" },
  ];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-10">
      {rows.map((row, i) => (
        <motion.div
          key={row.role}
          initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full max-w-[230px] items-center justify-between border border-line bg-ink/50 px-4 py-3 text-xs"
          style={{ marginLeft: i * 16 }}
        >
          <span className="text-bone/85">{row.role}</span>
          <span className={i === 2 ? "text-verified" : "text-signal"}>
            {row.status}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function ProjectVisual({ project }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-surface">
      <div
        className="absolute inset-0"
        style={{
          background:
            project.id === "inventory-sync-dashboard"
              ? "radial-gradient(circle at 20% 15%, rgba(232,150,60,0.16), transparent 55%)"
              : "radial-gradient(circle at 80% 20%, rgba(79,190,166,0.16), transparent 55%)",
        }}
      />
      {project.id === "inventory-sync-dashboard" ? (
        <SyncGraphic />
      ) : (
        <ApprovalGraphic />
      )}
    </div>
  );
}

function IntroContent() {
  return (
    <>
      <p className="font-display italic text-mute">Selected work</p>
      <h2 className="mt-4 max-w-2xl text-clamp-h1 font-display font-medium leading-[1.02] text-bone">
        Two systems, built end to end, still running.
      </h2>
      <p className="mt-6 max-w-md text-mute">
        Everything here is live, or was — reconciling real inventories,
        routing real approvals.
      </p>
    </>
  );
}

function ProjectContent({ project }) {
  return (
    <div className="grid w-full gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
      <div>
        <p className="font-display italic text-mute">{project.category}</p>
        <h3 className="mt-3 text-clamp-h2 font-display font-medium leading-[1.05] text-bone">
          {project.title}
        </h3>
        <p className="mt-5 max-w-md text-mute">{project.description}</p>

        <ul className="mt-6 space-y-2.5">
          {project.highlights.map((point) => (
            <li key={point} className="flex gap-3 text-sm text-bone/85">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {project.workflow && (
          <div className="mt-7 flex flex-wrap items-center gap-2">
            {project.workflow.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-line px-3 py-1.5 text-xs text-verified">
                  {step}
                </span>
                {i < project.workflow.length - 1 && (
                  <ArrowRight size={13} className="text-line" />
                )}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line px-3 py-1 text-xs text-mute"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          data-cursor="View"
          className="mt-8 inline-flex items-center gap-1.5 text-sm text-signal"
        >
          {project.linkLabel}
          <ArrowUpRight size={15} />
        </a>
      </div>

      <TiltCard>
        <ProjectVisual project={project} />
      </TiltCard>
    </div>
  );
}

function OutroContent() {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="font-display italic text-mute">More on GitHub</p>
      <h3 className="mt-4 max-w-lg text-clamp-h2 font-display font-medium leading-[1.05] text-bone">
        A few more things live in the repositories.
      </h3>
      <div className="mt-8">
        <Button href={personal.social.github} variant="outline" cursorLabel="Open">
          Visit GitHub
        </Button>
      </div>
    </div>
  );
}

function DesktopTrack() {
  const containerRef = useRef(null);
  const panelCount = projects.length + 2;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const shift = ((panelCount - 1) / panelCount) * 100;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${shift}%`]);
  const panelWidth = `${100 / panelCount}%`;

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${panelCount * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="flex h-full"
          style={{ x, width: `${panelCount * 100}%` }}
        >
          <div
            className="flex h-full shrink-0 flex-col justify-center px-6 sm:px-16"
            style={{ width: panelWidth }}
          >
            <Reveal variant="blur">
              <IntroContent />
            </Reveal>
          </div>

          {projects.map((project) => (
            <div
              key={project.id}
              className="flex h-full shrink-0 items-center px-6 sm:px-16"
              style={{ width: panelWidth }}
            >
              <div className="mx-auto w-full max-w-6xl">
                <Reveal variant="fade-up">
                  <ProjectContent project={project} />
                </Reveal>
              </div>
            </div>
          ))}

          <div
            className="flex h-full shrink-0 flex-col items-center justify-center px-6"
            style={{ width: panelWidth }}
          >
            <Reveal variant="fade-up">
              <OutroContent />
            </Reveal>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function MobileStack() {
  return (
    <div className="flex flex-col gap-24 px-6 py-24">
      <Reveal variant="blur">
        <IntroContent />
      </Reveal>
      {projects.map((project) => (
        <Reveal key={project.id} variant="fade-up">
          <ProjectContent project={project} />
        </Reveal>
      ))}
      <Reveal variant="fade-up">
        <OutroContent />
      </Reveal>
    </div>
  );
}

export default function Projects() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="work" className="relative bg-ink">
      {isDesktop ? <DesktopTrack /> : <MobileStack />}
    </section>
  );
}
