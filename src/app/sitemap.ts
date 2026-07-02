import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/schema";
import { getAllServiceSlugs } from "@/lib/services-data";
import { blogPosts, getAllCategories } from "@/lib/blog-data";
import { industryPages } from "@/lib/industry-data";
import { locationPages } from "@/lib/location-data";

/**
 * Dynamic sitemap for SOCIAL VIENS (Spec §9.1).
 * Includes: 13 static + 9 service detail + 8 blog posts + 5 blog categories
 * + 12 industry landing + 7 Delhi location + 7 Dwarka location = 61 URLs.
 */

type ChangeFreq =
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly";

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: ChangeFreq;
  priority: number;
}

const now = new Date();

function entry(
  path: string,
  changeFrequency: ChangeFreq,
  priority: number,
  lastModified: Date = now,
): SitemapEntry {
  return {
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

/** Convert a category label ("Social Media") into a kebab URL slug. */
function categorySlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: SitemapEntry[] = [
    entry("/", "daily", 1.0),
    entry("/about", "monthly", 0.8),
    entry("/services", "weekly", 0.9),
    entry("/portfolio", "weekly", 0.8),
    entry("/blog", "daily", 0.9),
    entry("/pricing", "monthly", 0.7),
    entry("/contact", "monthly", 0.7),
    entry("/testimonials", "monthly", 0.7),
    entry("/faq", "monthly", 0.7),
    entry("/privacy-policy", "yearly", 0.3),
    entry("/terms", "yearly", 0.3),
    entry("/locations/delhi-ncr", "monthly", 0.6),
    entry("/niches/doctors-clinics", "monthly", 0.6),
  ];

  // 9 service detail pages
  const serviceEntries: SitemapEntry[] = getAllServiceSlugs().map((slug) =>
    entry(`/services/${slug}`, "monthly", 0.8),
  );

  // 8 blog post pages (use publishedAt as lastModified)
  const blogEntries: SitemapEntry[] = blogPosts.map((post) =>
    entry(`/blog/${post.slug}`, "monthly", 0.7, new Date(post.publishedAt)),
  );

  // 5 blog category pages
  const categoryEntries: SitemapEntry[] = getAllCategories().map((category) =>
    entry(`/blog/category/${categorySlug(category)}`, "weekly", 0.6),
  );

  // 12 industry landing pages (Spec §5.2)
  const industryEntries: SitemapEntry[] = industryPages.map((p) =>
    entry(`/${p.slug}`, "monthly", 0.6),
  );

  // 14 location landing pages: 7 Delhi + 7 Dwarka (Spec §5.3, §5.4)
  const locationEntries: SitemapEntry[] = locationPages.map((p) =>
    entry(`/${p.slug}`, "monthly", 0.6),
  );

  return [
    ...staticEntries,
    ...serviceEntries,
    ...blogEntries,
    ...categoryEntries,
    ...industryEntries,
    ...locationEntries,
  ];
}
