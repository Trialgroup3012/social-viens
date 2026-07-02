// Shared category utils + types — safe to import from both server (page.tsx)
// and client (BlogCategoryClient.tsx). Cannot export generateMetadata here
// because that would make this module a client module.

import {
  blogPosts,
  getAllCategories,
  type BlogCategory,
} from "@/lib/blog-data";

// Slugify a category name for URL use: "Social Media" → "social-media".
export function slugifyCategory(cat: string): string {
  return cat.toLowerCase().replace(/\s+/g, "-");
}

// Reverse: "social-media" → "Social Media".
export function deslugifyCategory(slug: string): BlogCategory | null {
  const all = getAllCategories();
  for (const cat of all) {
    if (slugifyCategory(cat) === slug) return cat;
  }
  return null;
}

// Category descriptions (used in the client sidebar + meta).
export const categoryDescriptions: Record<BlogCategory, string> = {
  SEO:
    "Search engine optimisation strategies, technical SEO, local SEO for Delhi NCR, Google Business Profile optimisation, and content that ranks. Practical playbooks from our SEO practice.",
  "Social Media":
    "Instagram, LinkedIn, Facebook, and YouTube strategies that actually convert. Content calendars, growth tactics, community management, and paid social playbooks.",
  Branding:
    "Brand identity, positioning, visual design, and storytelling for ambitious businesses. How to build a premium brand from scratch — and refresh an existing one.",
  "Web Design":
    "Website design and development, conversion rate optimisation, landing page best practices, and the technical foundations of a high-performing site.",
  "Paid Ads":
    "Google Ads, Meta Ads, LinkedIn Ads, YouTube Ads — strategy, structuring, creative, bidding, and the ROAS maths that separates winners from losers.",
};

// Helper used by metadata + client to compute post counts.
export function getPostCountForCategory(category: BlogCategory): number {
  return blogPosts.filter((p) => p.category === category).length;
}
