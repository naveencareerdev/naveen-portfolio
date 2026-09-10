import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/400-italic.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/500-italic.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/600-italic.css";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Ribbons from "@/components/ui/Ribbons";

export const metadata = {
  title: "Naveen A — Full-Stack Developer",
  description:
    "Full-stack developer in Chennai building React interfaces and the systems underneath them — real-time inventory sync, role-based workflows, and dashboards that hold up in production.",
  authors: [{ name: "Naveen A" }],
  keywords: [
    "Naveen A",
    "Full-Stack Developer",
    "React Developer",
    "Chennai",
    "Portfolio",
  ],
  openGraph: {
    title: "Naveen A — Full-Stack Developer",
    description:
      "React, PHP, MySQL and Supabase — interfaces and the systems underneath them.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0A0F0E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-ink font-sans text-bone antialiased">
        <MotionConfig reducedMotion="user">
          <SmoothScroll>
            <Ribbons
              colors={["#4FBEA6", "#E8963C"]}
              baseThickness={18}
              speedMultiplier={0.5}
              maxAge={500}
              enableFade
              enableShaderEffect
              effectAmplitude={1.4}
            />
            <div className="grain-overlay" aria-hidden="true" />
            {children}
          </SmoothScroll>
        </MotionConfig>
      </body>
    </html>
  );
}
