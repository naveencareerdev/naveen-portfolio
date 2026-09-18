"use client";

import { motion, useTransform } from "framer-motion";
import { siGithub, siNodedotjs, siReact, siShopify, siSupabase, siVercel } from "simple-icons";
import OrbitImages from "@/components/ui/OrbitImages";

const iconColor = {
  signal: "#E8963C",
  verified: "#4FBEA6",
};

const logoSources = [
  { logo: siReact, label: "React", accent: "signal" },
  { logo: siNodedotjs, label: "Node.js", accent: "verified" },
  { logo: siSupabase, label: "Supabase", accent: "signal" },
  { logo: siGithub, label: "GitHub", accent: "verified" },
  { logo: siVercel, label: "Vercel", accent: "signal" },
  { logo: "https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/icons/file_type_vscode.svg", label: "VS Code", accent: "verified" },
  { logo: siShopify, label: "Shopify", accent: "signal" },
];

function logoDataUri(logo, color) {
  if (typeof logo === "string") return logo;
  const path = `<path d='${logo.path}' fill='COLOR'/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>${path.replace("COLOR", color)}`)}`;
}

export default function SystemCore({ scrollProgress }) {
  const rotation = useTransform(scrollProgress, [0, 1], [-7, 7]);
  const scale = useTransform(scrollProgress, [0, 1], [1, 1.04]);
  const images = logoSources.map((source) => ({
    src: logoDataUri(source.logo, iconColor[source.accent]),
    label: source.label,
  }));

  return (
    <motion.div className="relative mx-auto aspect-square h-full max-h-[900px] w-full max-w-[900px]" style={{ rotate: rotation, scale }}>
      <OrbitImages
        images={images}
        altPrefix="Technology"
        shape="circle"
        baseWidth={1400}
        radius={390}
        rotation={0}
        duration={24}
        itemSize={84}
        showPath
        pathColor="rgba(79, 190, 166, 0.28)"
        pathWidth={1.25}
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
