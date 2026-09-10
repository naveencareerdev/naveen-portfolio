export const personal = {
  name: "Naveen A",
  initials: "NA",
  role: "Full-Stack Developer",
  location: "Chennai, India",
  email: "naveen.careerdev@gmail.com",
  emailComposeUrl:
    "https://mail.google.com/mail/?view=cm&fs=1&to=naveen.careerdev@gmail.com",
  phone: "+91 88258 52442",
  social: {
    linkedin: "https://www.linkedin.com/in/naveen-a-1265311b7/",
    github: "https://github.com/naveencareerdev",
  },
  resumeFile: "/Naveen_A_Resume.pdf",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  headline: "I create digital experiences",
  intro:
    "I'm a full-stack developer in Chennai, building React interfaces wired to real APIs, real databases, and data that has to stay correct across every store, every role, every screen.",
  ctaPrimary: { label: "View My Work", href: "#work" },
  ctaSecondary: { label: "Let's Work Together", href: "#contact" },
};

export const about = {
  portraitLabel: "NA",
  bio: [
    "I build systems that keep data honest when it moves fast — a catalog syncing across a dozen storefronts, a document routing through the right approvals, and a dashboard number that matches reality. I work mostly in React on the front end, with PHP, MySQL, and Supabase underneath.",
    "I started by reconciling catalog mismatches store by store and ended up automating the whole process — the kind of work that's invisible when it's right and very visible the moment it isn't. That instinct for finding the quiet failure point before a customer does carries into everything I ship.",
  ],
  stats: [
    { value: "1+", label: "Working Year Experience" },
    { value: "13+", label: "Storefronts kept in sync" },
    { value: "2", label: "End-to-end systems shipped" },
  ],
  skillGroups: [
    {
      title: "Frontend",
      items: ["React.js", "React Hooks", "HTML5", "CSS3", "Tailwind CSS"],
    },
    {
      title: "Backend & APIs",
      items: ["REST APIs", "JWT Authentication", "PHP"],
    },
    {
      title: "Data",
      items: ["MySQL", "Supabase"],
    },
    {
      title: "Languages",
      items: ["JavaScript", "Java (Basics)"],
    },
    {
      title: "Tooling",
      items: ["Git", "GitHub", "npm", "Vite", "Vercel", "Shopify"],
    },
  ],
};

export const projects = [
  {
    id: "inventory-sync-dashboard",
    title: "Multi-Store Inventory Synchronization Dashboard",
    category: "Internal tooling, inventory & analytics",
    description:
      "A client-side reconciliation dashboard that imports vendor and storefront CSV exports, normalizes mismatched vendor schemas, and matches products by SKU — turning a manual, error-prone comparison into a five-minute check.",
    highlights: [
      "Configurable low-stock and critical-stock alerts across every connected store",
      "Interactive Chart.js analytics for inventory levels, match rate, and sync history",
      "Audit logging with CSV/ZIP export, deployed to GitHub Pages via automated Actions builds",
    ],
    stack: ["React.js", "Vite", "Tailwind CSS", "Chart.js", "PapaParse", "JSZip"],
    link: "https://naveencareerdev.github.io/inventory-sync-dashboard/",
    linkLabel: "View demo",
  },
  {
    id: "smart-document-approval-system",
    title: "Smart Document Processing & Approval System",
    category: "Full-stack web app, workflow automation",
    description:
      "A role-based approval workflow so documents move from the person who has them to the person who needs to sign off, without a shared inbox or a spreadsheet to track who's holding things up.",
    highlights: [
      "JWT authentication with Admin, Manager, and Employee roles via Supabase Auth + Row-Level Security",
      "Document version history and private, access-controlled file storage",
      "Full audit trail for every document and role action, deployed on Vercel with GitHub-based CD",
    ],
    workflow: ["Employee uploads", "Manager reviews", "Admin approves or rejects"],
    stack: ["React.js", "Supabase", "Vercel", "Tailwind CSS"],
    link: "https://docflow-f8wo.vercel.app/",
    linkLabel: "View demo",
  },
];

// Chronological, oldest first — a timeline reads as a story building to "now."
export const timeline = [
  {
    type: "education",
    period: "2022",
    title: "B.Sc. Computer Science",
    place: "Vellore Institute of Technology, Vellore",
    detail: "CGPA 8.56 / 10",
  },
  {
    type: "education",
    period: "2024",
    title: "Master of Computer Applications (MCA)",
    place: "Vellore Institute of Technology, Vellore",
    detail: "CGPA 8.35 / 10",
  },
  {
    type: "work",
    period: "Apr 2025 — May 2026",
    title: "Web Developer",
    place: "Imaje Technologies, Chennai",
    detail: "E-commerce — Shopify catalog & inventory systems",
    points: [
      "Automated inventory synchronization for a Shopify catalog with custom PHP scripts and REST APIs, replacing manual updates with near real-time consistency across internal systems and storefronts.",
      "Ran proactive inventory reconciliation between MySQL and live Shopify storefronts across 13+ stores, catching catalog discrepancies before customers saw them.",
      "Designed and optimized complex MySQL queries for high-volume product catalog storage, validation, and sync.",
      "Investigated and resolved production data-sync issues across APIs, databases, and storefronts, working cross-functionally on permanent fixes.",
    ],
  },
];

export const systemNodes = [
  "React.js",
  "MySQL",
  "Supabase",
  "REST APIs",
  "Shopify",
  "JWT Auth",
];

export const contact = {
  headline: "Let's build something great.",
  sub: "Have a system that needs to talk to another system? A dashboard that's still a spreadsheet? I'm open to new roles and freelance work.",
  ctaLabel: "Send an email",
};
