# Naveen A — Portfolio

A cinematic, 3D-forward portfolio built with Next.js, React Three Fiber, and
Framer Motion, populated from the résumé content provided.

## Three placeholders to fill in before you share this

The source résumé listed "LinkedIn" and "GitHub" as link labels but no actual
URLs, so three spots use a `#` placeholder:

1. **`lib/data.js` → `personal.social.linkedin` / `personal.social.github`**
   — used in the footer, the contact section, and the "More on GitHub" panel
   at the end of the work section.
2. **`lib/data.js` → `projects[].link`** — the "View demo" link on each
   project. Point these at your live demo URLs or repo links.
3. **`public/Naveen_A_Resume.pdf`** — your uploaded résumé is included as-is
   for the "Download résumé" link in the About section. Replace the file
   (same name) whenever you update it, or change `personal.resumeFile` in
   `lib/data.js` if you rename it.

Everything else on the site — bio, stats, skills, project copy, timeline —
comes from your résumé and is editable in one place: `lib/data.js`.

## Tech stack

- **Next.js 15** (App Router) + **React 18**
- **Tailwind CSS 3** for styling
- **React Three Fiber / drei / three.js** for the hero background, the
  "systems" visualization in the Creative section, and the contact page's
  ambient particles
- **Framer Motion** for scroll reveals, parallax, and micro-interactions;
  **Lenis** for inertia smooth-scrolling
- **Fraunces + Inter**, self-hosted via Fontsource (no Google Fonts network
  call needed at build time)

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build for production

```bash
npm run build
npm run start
```

## Deploying

**Vercel (recommended — zero config for Next.js):**
1. Push this folder to a GitHub repo.
2. Go to vercel.com/new and import the repo.
3. The "Next.js" framework preset is auto-detected — click Deploy.

**Netlify:**
1. Push to GitHub.
2. "Add new site" → "Import an existing project" → pick the repo. Netlify's
   Next.js runtime is detected automatically; the default build command
   (`npm run build`) is correct as-is.

**Any Node host (Railway, Render, a VPS, etc.):**
```bash
npm install && npm run build && npm run start
```
Serves on port 3000 by default — set the `PORT` environment variable to
change it.

## Project structure

```
app/                   Next.js App Router entry — layout, page, global CSS
components/layout/     Navigation, footer, smooth scroll, custom cursor
components/sections/   One file per page section (Hero, About, Projects, ...)
components/three/      React Three Fiber scenes
components/ui/         Reusable primitives (Button, Reveal, TiltCard, icons)
lib/data.js            All résumé-derived content — start here to edit copy
lib/utils.js           Small shared helpers (scroll-to, class merging, etc.)
hooks/                 Client-side hooks (mouse position, media query, ...)
public/                Static files, including the downloadable résumé PDF
```

## A few design decisions, explained

- **The Creative section's 3D object isn't decorative.** It's a small hub
  with orbiting nodes labelled with your actual stack (React, MySQL,
  Supabase, REST APIs, Shopify, JWT), meant to visualize the kind of
  distributed-systems work described in your work experience, rather than
  being generic abstract art.
- **Color system**: a blackened-teal background (`ink`) with two functional
  accents — amber (`signal`) and teal (`verified`) — echoing the low-stock
  and synced/verified states from the inventory dashboard project, rather
  than an arbitrary brand palette. Defined in `tailwind.config.js`.
- **Reduced motion is a first-class path, not an afterthought.** The whole
  app is wrapped in `MotionConfig reducedMotion="user"`, so Framer Motion's
  animations automatically soften when a visitor's OS requests reduced
  motion. Independently, both heavier 3D canvases (hero, Creative section)
  skip entirely in favor of a static gradient or SVG, and Lenis's
  scroll-hijacking is skipped in favor of native smooth scrolling.
- **Performance**: all three 3D scenes are dynamically imported with
  `ssr: false` and use only procedural geometry and particles — no textures
  or HDRI environment maps to fetch, so there's nothing beyond the JS itself
  for a visitor's browser to download.
- **Horizontal scroll on desktop only.** The Work section pins and scrolls
  horizontally on screens ≥1024px; on smaller screens it falls back to a
  plain vertical stack of the same content, since the pinned-scroll trick is
  a rougher experience with touch input.

## One dependency note worth knowing about

`npm audit` reports one high and one moderate advisory, both in **Next.js's
own internal, bundled copy of PostCSS** — build-time tooling shipped inside
the `next` package itself, not the top-level `postcss` dependency this
project uses directly (already on a patched version). The only fix currently
offered is a major-version jump to Next.js 16, which was very new and not
yet something to pin confidently for a "ready to deploy" hand-off. This code
path only ever touches this project's own source files at build time — it's
not reachable by a visitor's request — so it's low-priority for a static
site with no API routes, middleware, or Server Actions, but worth running
`npm audit` again next time you touch dependencies.
