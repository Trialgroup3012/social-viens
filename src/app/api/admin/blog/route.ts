import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Force Node.js runtime — uses Prisma (not Edge-compatible).
export const runtime = "nodejs";

/** Parse the JSON-encoded tags string into an array. */
function parseTags(raw: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw as string[];
  if (typeof raw !== "string") return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return raw.split(",").map((t) => t.trim()).filter(Boolean);
  }
}

/**
 * GET /api/admin/blog
 * List all blog posts (including drafts) with optional search + pagination.
 * Query params:
 *   - q: search string (matches title, excerpt, content, or category)
 *   - page: 1-based page number (default 1)
 *   - limit: items per page (default 10, max 100)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("limit") || "10", 10) || 10)
    );

    // Build where clause — admin sees ALL posts (including drafts).
    const where: Record<string, unknown> = {};
    if (q) {
      where.OR = [
        { title: { contains: q } },
        { excerpt: { contains: q } },
        { content: { contains: q } },
        { category: { contains: q } },
      ];
    }

    const [total, posts] = await Promise.all([
      (db as any).blogPost.count({ where }),
      (db as any).blogPost.findMany({
        where,
        orderBy: [{ status: "asc" }, { createdAt: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    // Normalize tags (stored as JSON string in SQLite).
    const normalized = posts.map((p: any) => ({
      ...p,
      tags: parseTags(p.tags),
    }));

    return NextResponse.json({
      posts: normalized,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("[API /api/admin/blog GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/blog
 * Create a new blog post.
 * Required fields: title, slug, content, category.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const {
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      author,
      authorRole,
      authorBio,
      readTime,
      featuredImage,
      featured,
      status,
      metaTitle,
      metaDescription,
      ogImage,
    } = body;

    // Validate required fields.
    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }
    if (!slug || typeof slug !== "string" || !slug.trim()) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }
    if (!content || typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }
    if (!category || typeof category !== "string" || !category.trim()) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    // Enforce slug uniqueness.
    const existing = await (db as any).blogPost.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    const isPublished = status === "published";
    const tagArray = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean)
      : [];

    const post = await (db as any).blogPost.create({
      data: {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt?.trim() || null,
        content,
        category: category.trim(),
        tags: JSON.stringify(tagArray),
        author: author?.trim() || null,
        authorRole: authorRole?.trim() || null,
        authorBio: authorBio?.trim() || null,
        publishedAt: isPublished ? new Date() : null,
        readTime: readTime?.trim() || "5 min read",
        featuredImage: featuredImage?.trim() || null,
        featured: Boolean(featured),
        status: isPublished ? "published" : "draft",
        metaTitle: metaTitle?.trim() || null,
        metaDescription: metaDescription?.trim() || null,
        ogImage: ogImage?.trim() || null,
      },
    });

    return NextResponse.json(
      { ...post, tags: tagArray },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API /api/admin/blog POST] Error:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
