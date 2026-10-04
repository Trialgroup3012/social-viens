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
    "Guides to technical SEO, local search, Google Business Profile and useful content for organic visibility.",
  "Social Media":
    "Ideas for Instagram, LinkedIn, Facebook and YouTube content, community management and paid social.",
  Branding:
    "Articles on brand identity, positioning, visual design and storytelling for growing businesses.",
  "Web Design":
    "Advice on website design, development, landing pages and conversion-focused site improvements.",
  "Paid Ads":
    "Practical guidance for Google, Meta, LinkedIn and YouTube campaigns, from setup to measurement.",
};

// Helper used by metadata + client to compute post counts.
export function getPostCountForCategory(category: BlogCategory): number {
  return blogPosts.filter((p) => p.category === category).length;
}
