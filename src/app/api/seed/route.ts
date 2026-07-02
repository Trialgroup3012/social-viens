import { NextResponse } from "next/server";
import {
  fallbackServices,
  fallbackBlogPosts,
  fallbackPortfolio,
  fallbackTestimonials,
  fallbackPricingPackages,
  fallbackSiteSettings,
} from "@/lib/fallback-data";
import { db } from "@/lib/db";
import { createHash } from "crypto";

// Force Node.js runtime — uses Prisma + node:crypto.
export const runtime = "nodejs";

// Simple non-bcrypt hash — sufficient for seeding a demo admin user.
// (Admin auth is out of scope for this task; this just stores something
// opaque that an admin login page can verify later.)
function hashPassword(plain: string): string {
  return createHash("sha256")
    .update(`sv$alt|${plain}`)
    .digest("hex");
}

// Generate a slug from a title (used for portfolio items that don't have one).
function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Tiny helper: run an async seeding step, count success, capture error.
async function runStep(
  label: string,
  fn: () => Promise<void>,
  results: { count: number; errors: string[] }
): Promise<void> {
  try {
    await fn();
    results.count++;
  } catch (e: any) {
    results.errors.push(`${label}: ${e?.message ?? String(e)}`);
  }
}

export async function GET() {
  const results = {
    services: 0,
    blogPosts: 0,
    portfolio: 0,
    testimonials: 0,
    pricing: 0,
    settings: 0,
    admin: 0,
    errors: [] as string[],
  };

  const serviceResults = { count: 0, errors: results.errors };
  const blogResults = { count: 0, errors: results.errors };
  const portfolioResults = { count: 0, errors: results.errors };
  const testimonialResults = { count: 0, errors: results.errors };
  const pricingResults = { count: 0, errors: results.errors };
  const settingResults = { count: 0, errors: results.errors };

  // -----------------------------------------------------------------------
  // Services
  // -----------------------------------------------------------------------
  await Promise.all(
    fallbackServices.map((s: any, idx: number) =>
      runStep(
        `Service ${s.slug}`,
        async () => {
          await (db as any).service.upsert({
            where: { slug: s.slug },
            create: {
              slug: s.slug,
              title: s.title,
              description: s.shortDescription || "",
              shortDescription: s.shortDescription || null,
              longDescription: s.longDescription || null,
              icon: s.icon || "Sparkles",
              benefits: JSON.stringify(s.benefits || []),
              results: s.results || "",
              startingPrice: s.startingPrice || null,
              popular: !!s.popular,
              features: JSON.stringify(s.features || []),
              process: JSON.stringify(s.process || []),
              faqs: JSON.stringify(s.faqs || []),
              order: idx,
            },
            update: {
              title: s.title,
              description: s.shortDescription || "",
              shortDescription: s.shortDescription || null,
              longDescription: s.longDescription || null,
              icon: s.icon || "Sparkles",
              benefits: JSON.stringify(s.benefits || []),
              results: s.results || "",
              startingPrice: s.startingPrice || null,
              popular: !!s.popular,
              features: JSON.stringify(s.features || []),
              process: JSON.stringify(s.process || []),
              faqs: JSON.stringify(s.faqs || []),
              order: idx,
            },
          });
        },
        serviceResults
      )
    )
  );

  // -----------------------------------------------------------------------
  // Blog posts
  // -----------------------------------------------------------------------
  await Promise.all(
    fallbackBlogPosts.map((p: any) =>
      runStep(
        `BlogPost ${p.slug}`,
        async () => {
          await (db as any).blogPost.upsert({
            where: { slug: p.slug },
            create: {
              slug: p.slug,
              title: p.title,
              excerpt: p.excerpt || null,
              content: p.content || "",
              category: p.category || "General",
              tags: JSON.stringify(p.tags || []),
              author: p.author || null,
              authorRole: p.authorRole || null,
              authorBio: p.authorBio || null,
              publishedAt: p.publishedAt ? new Date(p.publishedAt) : new Date(),
              readTime: `${p.readTime || 5} min read`,
              featuredImage: p.featuredImageColor || null,
              featured: !!p.featured,
              status: "published",
              metaTitle: p.title,
              metaDescription: p.excerpt || null,
              ogImage: p.featuredImageColor || null,
            },
            update: {
              title: p.title,
              excerpt: p.excerpt || null,
              content: p.content || "",
              category: p.category || "General",
              tags: JSON.stringify(p.tags || []),
              author: p.author || null,
              authorRole: p.authorRole || null,
              authorBio: p.authorBio || null,
              publishedAt: p.publishedAt ? new Date(p.publishedAt) : new Date(),
              readTime: `${p.readTime || 5} min read`,
              featuredImage: p.featuredImageColor || null,
              featured: !!p.featured,
              status: "published",
              metaTitle: p.title,
              metaDescription: p.excerpt || null,
              ogImage: p.featuredImageColor || null,
            },
          });
        },
        blogResults
      )
    )
  );

  // -----------------------------------------------------------------------
  // Portfolio items
  // -----------------------------------------------------------------------
  await Promise.all(
    fallbackPortfolio.map((item: any, idx: number) => {
      const slug = slugify(item.title);
      return runStep(
        `Portfolio ${slug}`,
        async () => {
          await (db as any).portfolio.upsert({
            where: { slug },
            create: {
              slug,
              title: item.title,
              client: item.client || "",
              category: item.category || "General",
              services: JSON.stringify([]),
              description: item.description || "",
              results: item.result || null,
              image: item.gradient || null,
              featured: !!item.featured,
              order: idx,
            },
            update: {
              title: item.title,
              client: item.client || "",
              category: item.category || "General",
              services: JSON.stringify([]),
              description: item.description || "",
              results: item.result || null,
              image: item.gradient || null,
              featured: !!item.featured,
              order: idx,
            },
          });
        },
        portfolioResults
      );
    })
  );

  // -----------------------------------------------------------------------
  // Testimonials (no unique natural key → findFirst then upsert/create)
  // -----------------------------------------------------------------------
  await Promise.all(
    fallbackTestimonials.map((t: any, idx: number) =>
      runStep(
        `Testimonial ${t.name}`,
        async () => {
          const existing = await (db as any).testimonial.findFirst({
            where: { name: t.name, business: t.business },
          });
          const data = {
            name: t.name,
            business: t.business,
            company: t.business,
            industry: t.industry,
            text: t.text,
            quote: t.text,
            rating: t.rating ?? 5,
            results: t.results,
            result: t.results,
            featured: !!t.featured,
            hasVideo: !!t.hasVideo,
            order: idx,
          };
          if (existing) {
            await (db as any).testimonial.update({
              where: { id: existing.id },
              data,
            });
          } else {
            await (db as any).testimonial.create({ data });
          }
        },
        testimonialResults
      )
    )
  );

  // -----------------------------------------------------------------------
  // Pricing packages (no slug → findFirst by name)
  // -----------------------------------------------------------------------
  await Promise.all(
    fallbackPricingPackages.map((p: any) =>
      runStep(
        `Pricing ${p.name}`,
        async () => {
          const existing = await (db as any).pricingPackage.findFirst({
            where: { name: p.name },
          });
          const data = {
            name: p.name,
            price: p.price,
            period: p.period,
            description: p.description,
            features: JSON.stringify(p.features || []),
            highlighted: !!p.highlighted,
            ctaText: p.ctaText,
            ctaLink: p.ctaLink,
            order: p.order,
          };
          if (existing) {
            await (db as any).pricingPackage.update({
              where: { id: existing.id },
              data,
            });
          } else {
            await (db as any).pricingPackage.create({ data });
          }
        },
        pricingResults
      )
    )
  );

  // -----------------------------------------------------------------------
  // Site settings (key/value pairs)
  // -----------------------------------------------------------------------
  await Promise.all(
    Object.entries(fallbackSiteSettings).map(([key, value]) =>
      runStep(
        `Setting ${key}`,
        async () => {
          await (db as any).siteSetting.upsert({
            where: { key },
            create: { key, value: String(value) },
            update: { value: String(value) },
          });
        },
        settingResults
      )
    )
  );

  // -----------------------------------------------------------------------
  // Admin user (idempotent — upsert by email)
  // -----------------------------------------------------------------------
  try {
    await (db as any).user.upsert({
      where: { email: "admin@socialviens.com" },
      create: {
        email: "admin@socialviens.com",
        name: "Admin",
        password: hashPassword("admin123"),
        role: "admin",
      },
      update: {
        name: "Admin",
        password: hashPassword("admin123"),
        role: "admin",
      },
    });
    results.admin = 1;
  } catch (e: any) {
    results.errors.push(`Admin user: ${e?.message ?? String(e)}`);
  }

  results.services = serviceResults.count;
  results.blogPosts = blogResults.count;
  results.portfolio = portfolioResults.count;
  results.testimonials = testimonialResults.count;
  results.pricing = pricingResults.count;
  results.settings = settingResults.count;

  return NextResponse.json({ success: true, results });
}
