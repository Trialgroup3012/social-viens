// /home/z/my-project/src/lib/safe-db.ts
// Safe DB wrappers — always return data (fallback when DB unavailable).
//
// Every function in this module MUST resolve — never throw. If the DB query
// fails for any reason (network, schema mismatch, missing model, etc.), the
// corresponding fallback data is returned instead. This is the whole point of
// safe-db: the public-facing site keeps working even if the database is
// unavailable or the schema is incomplete.

import { db } from "./db";
import {
  fallbackServices,
  fallbackBlogPosts,
  fallbackPortfolio,
  fallbackTestimonials,
  fallbackPricingPackages,
  getAllCategories,
} from "./fallback-data";

// Helper: safely run a DB query, fall back on error
async function safeQuery<T>(query: Promise<T>, fallback: T): Promise<T> {
  try {
    return await query;
  } catch (error) {
    console.error("[safe-db] Query failed, using fallback:", error);
    return fallback;
  }
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export async function getServices() {
  return safeQuery(
    (async () => {
      const dbServices = await (db as any).service.findMany({
        orderBy: { order: "asc" },
      });
      if (dbServices && dbServices.length > 0) return dbServices;
      return fallbackServices;
    })(),
    fallbackServices
  );
}

export async function getServiceBySlug(slug: string) {
  return safeQuery(
    (async () => {
      const service = await (db as any).service.findUnique({
        where: { slug },
      });
      return (
        service ||
        fallbackServices.find((s: any) => s.slug === slug) ||
        null
      );
    })(),
    fallbackServices.find((s: any) => s.slug === slug) || null
  );
}

export async function getRelatedServices(slug: string, count = 4) {
  return safeQuery(
    (async () => {
      const related = await (db as any).service.findMany({
        where: { slug: { not: slug } },
        take: count,
      });
      if (related && related.length > 0) return related;
      return fallbackServices
        .filter((s: any) => s.slug !== slug)
        .slice(0, count);
    })(),
    fallbackServices.filter((s: any) => s.slug !== slug).slice(0, count)
  );
}

// ---------------------------------------------------------------------------
// Blog posts
// ---------------------------------------------------------------------------

export async function getPublishedPosts() {
  return safeQuery(
    (async () => {
      const posts = await (db as any).blogPost.findMany({
        where: { status: "published" },
        orderBy: { publishedAt: "desc" },
      });
      if (posts && posts.length > 0) return posts;
      return fallbackBlogPosts;
    })(),
    fallbackBlogPosts
  );
}

export async function getBlogPostBySlug(slug: string) {
  return safeQuery(
    (async () => {
      const post = await (db as any).blogPost.findUnique({
        where: { slug },
      });
      return post || fallbackBlogPosts.find((p: any) => p.slug === slug) || null;
    })(),
    fallbackBlogPosts.find((p: any) => p.slug === slug) || null
  );
}

export async function getRelatedPosts(slug: string, count = 3) {
  return safeQuery(
    (async () => {
      const related = await (db as any).blogPost.findMany({
        where: { slug: { not: slug }, status: "published" },
        take: count,
      });
      if (related && related.length > 0) return related;
      return fallbackBlogPosts.filter((p: any) => p.slug !== slug).slice(0, count);
    })(),
    fallbackBlogPosts.filter((p: any) => p.slug !== slug).slice(0, count)
  );
}

export async function getPostsByCategory(category: string) {
  return safeQuery(
    (async () => {
      const posts = await (db as any).blogPost.findMany({
        where: { category, status: "published" },
        orderBy: { publishedAt: "desc" },
      });
      if (posts && posts.length > 0) return posts;
      return fallbackBlogPosts.filter((p: any) => p.category === category);
    })(),
    fallbackBlogPosts.filter((p: any) => p.category === category)
  );
}

export async function getBlogCategories() {
  return safeQuery(
    (async () => {
      // Distinct categories from DB
      const result = await (db as any).blogPost.findMany({
        where: { status: "published" },
        select: { category: true },
        distinct: ["category"],
      });
      const cats = (result || []).map((r: any) => r.category).filter(Boolean);
      return cats.length > 0 ? cats : getAllCategories();
    })(),
    getAllCategories()
  );
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export async function getTestimonials() {
  return safeQuery(
    (async () => {
      const t = await (db as any).testimonial.findMany({
        orderBy: { order: "asc" },
      });
      if (t && t.length > 0) return t;
      return fallbackTestimonials;
    })(),
    fallbackTestimonials
  );
}

export async function getFeaturedTestimonials() {
  return safeQuery(
    (async () => {
      const t = await (db as any).testimonial.findMany({
        where: { featured: true },
        orderBy: { order: "asc" },
      });
      if (t && t.length > 0) return t;
      return fallbackTestimonials.filter((t: any) => t.featured);
    })(),
    fallbackTestimonials.filter((t: any) => t.featured)
  );
}

// ---------------------------------------------------------------------------
// Portfolio
// ---------------------------------------------------------------------------

export async function getPortfolioItems() {
  return safeQuery(
    (async () => {
      const p = await (db as any).portfolio.findMany({
        orderBy: { order: "asc" },
      });
      if (p && p.length > 0) return p;
      return fallbackPortfolio;
    })(),
    fallbackPortfolio
  );
}

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

export async function getPricingPackages() {
  return safeQuery(
    (async () => {
      const p = await (db as any).pricingPackage.findMany({
        orderBy: { order: "asc" },
      });
      if (p && p.length > 0) return p;
      return fallbackPricingPackages;
    })(),
    fallbackPricingPackages
  );
}
