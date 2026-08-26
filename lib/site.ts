/**
 * Single source of truth for site-wide config and content.
 * Edit values here and they update across every page, the sitemap,
 * the structured data, and the llms.txt overview.
 */

export const site = {
  name: "Approachable Intelligence",
  shortName: "Approachable Intelligence",
  tagline: "Big Tech Energy. Small Business Soul.",
  // Production domain. Swap if the live domain changes.
  url: "https://approachableintelligence.ai",
  description:
    "Approachable Intelligence helps small and medium service businesses adopt AI and automation without losing the human touch that made them work. Based in Colorado.",
  email: "info@approachableintelligence.ai",
  // The primary CTA points here, the existing intake form.
  formUrl: "https://api.leadconnectorhq.com/widget/form/3ukPBytwlePhvbJz1Jok",
  founders: ["Ty", "Jordyn"],
  serviceAreas: ["Denver", "Roaring Fork Valley", "Colorado"],
  sameAs: [] as string[], // add social profile URLs when ready
} as const;

export type NavLink = { href: string; label: string };

export const nav: NavLink[] = [
  { href: "/#how-we-work", label: "How We Work" },
  { href: "/#who", label: "Who It's For" },
  { href: "/skills-library", label: "Skills Library" },
  { href: "/#founders", label: "Founders" },
];

export const ctaLabel = "Start the Conversation";
