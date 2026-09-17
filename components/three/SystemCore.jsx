"use client";

import { motion, useTransform } from "framer-motion";
import { siJsonwebtokens, siMysql, siReact, siShopify, siSupabase } from "simple-icons";
import OrbitImages from "@/components/ui/OrbitImages";
import { systemNodes } from "@/lib/data";

const iconColor = {
  signal: "#E8963C",
  verified: "#4FBEA6",
};

const logoSources = [
  { logo: siReact, accent: "signal" },
  { logo: siMysql, accent: "verified" },
  { logo: siSupabase, accent: "signal" },
  { logo: "api", accent: "verified" },
  { logo: siShopify, accent: "signal" },
  { logo: siJsonwebtokens, accent: "verified" },
];

function logoDataUri(logo, color) {
  const path = logo === "api"
    ? "<path d='m11 8-6 8 6 8M21 8l6 8-6 8M18 6l-4 20' fill='none' stroke='COLOR' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.2'/></svg>"
    : `<path d='${logo.path}' fill='COLOR'/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>${path.replace("COLOR", color)}`)}`;
}

function LogoTile({ source, label }) {
  const color = iconColor[source.accent];
  return (
    <div
      role="img"
      aria-label={label}
      title={label}
      className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[38%] border bg-ink/95 shadow-xl backdrop-blur-sm ${source.accent === "signal" ? "border-signal/60 shadow-[0_0_20px_rgba(232,150,60,0.18)]" : "border-verified/60 shadow-[0_0_20px_rgba(79,190,166,0.18)]"}`}
    >
      <span className={`absolute -top-2 h-2 w-2 rounded-full ${source.accent === "signal" ? "bg-signal shadow-[0_0_10px_#E8963C]" : "bg-verified shadow-[0_0_10px_#4FBEA6]"}`} />
      <img src={logoDataUri(source.logo, color)} alt="" className="h-7 w-7" draggable={false} />
    </div>
  );
}

export default function SystemCore({ scrollProgress }) {
  const rotation = useTransform(scrollProgress, [0, 1], [-7, 7]);
  const scale = useTransform(scrollProgress, [0, 1], [1, 1.04]);
  const images = logoSources.map((source) => ({
    src: logoDataUri(source.logo, iconColor[source.accent]),
    label: systemNodes[logoSources.indexOf(source)],
  }));

  return (
    <motion.div className="relative mx-auto aspect-square h-full max-h-[900px] w-full max-w-[900px]" style={{ rotate: rotation, scale }}>
      <OrbitImages
        images={images}
        altPrefix="Technology"
        shape="ellipse"
        baseWidth={1400}
        radiusX={530}
        radiusY={430}
        rotation={0}
        duration={24}
        itemSize={56}
        responsive
        centerContent={(
          <motion.div className="flex h-28 w-28 items-center justify-center rounded-[34%] border border-signal/60 bg-surface shadow-[0_0_70px_rgba(232,150,60,0.22)]" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
            <span className="h-12 w-12 rounded-[38%] border border-verified/70 bg-ink shadow-[0_0_34px_rgba(79,190,166,0.22)]" />
          </motion.div>
        )}
      />
      <div className="sr-only">{images.map((image) => image.label).join(", ")}</div>
    </motion.div>
  );
}
