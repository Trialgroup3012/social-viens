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
 * GET /api/admin/blog/[id]
 * Get a single blog post by ID (includes drafts).
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const post = await (db as any).blogPost.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ...post, tags: parseTags(post.tags) });
  } catch (error) {
    console.error("[API /api/admin/blog/[id] GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/blog/[id]
 * Update an existing blog post.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const existing = await (db as any).blogPost.findUnique({
      where: { id },
      select: { id: true, status: true, slug: true },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // If slug is being changed, ensure it stays unique.
    if (body.slug && body.slug !== existing.slug) {
      const conflict = await (db as any).blogPost.findUnique({
        where: { slug: body.slug },
        select: { id: true },
      });
      if (conflict && conflict.id !== id) {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Build the update payload — only set fields that are present.
    const updateData: Record<string, unknown> = {};
    const fields = [
      "title",
      "slug",
      "excerpt",
      "content",
      "category",
      "author",
      "authorRole",
      "authorBio",
      "readTime",
      "featuredImage",
      "metaTitle",
      "metaDescription",
      "ogImage",
    ];
    for (const f of fields) {
      if (body[f] !== undefined) {
        updateData[f] =
          typeof body[f] === "string" ? body[f].trim() || null : body[f];
      }
    }
    if (body.featured !== undefined) {
      updateData.featured = Boolean(body.featured);
    }
    if (body.status !== undefined) {
      const isPublished = body.status === "published";
      updateData.status = isPublished ? "published" : "draft";
      // Set publishedAt when transitioning to published (and not already set).
      if (isPublished && !existing.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }
    if (body.tags !== undefined) {
      const tagArray = Array.isArray(body.tags)
        ? body.tags
        : typeof body.tags === "string"
        ? body.tags
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean)
        : [];
      updateData.tags = JSON.stringify(tagArray);
    }

    const updated = await (db as any).blogPost.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      ...updated,
      tags: parseTags(updated.tags),
    });
  } catch (error) {
    console.error("[API /api/admin/blog/[id] PUT] Error:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/blog/[id]
 * Delete a blog post by ID.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const existing = await (db as any).blogPost.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    await (db as any).blogPost.delete({ where: { id } });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("[API /api/admin/blog/[id] DELETE] Error:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
