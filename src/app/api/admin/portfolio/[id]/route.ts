import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Force Node.js runtime — uses Prisma (not Edge-compatible).
export const runtime = "nodejs";

/** Parse a JSON-encoded string array safely. */
function parseStringArray(raw: unknown): string[] {
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

/** Generate a URL-safe slug from a string. */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/**
 * GET /api/admin/portfolio/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const item = await (db as any).portfolio.findUnique({ where: { id } });
    if (!item) {
      return NextResponse.json(
        { error: "Portfolio item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...item,
      services: parseStringArray(item.services),
    });
  } catch (error) {
    console.error("[API /api/admin/portfolio/[id] GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio item" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/portfolio/[id]
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const existing = await (db as any).portfolio.findUnique({
      where: { id },
      select: { id: true, slug: true },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Portfolio item not found" },
        { status: 404 }
      );
    }

    // If slug is changing, ensure uniqueness.
    if (body.slug && body.slug !== existing.slug) {
      const finalSlug = slugify(body.slug);
      const conflict = await (db as any).portfolio.findUnique({
        where: { slug: finalSlug },
        select: { id: true },
      });
      if (conflict && conflict.id !== id) {
        return NextResponse.json(
          { error: "A portfolio item with this slug already exists" },
          { status: 400 }
        );
      }
      body.slug = finalSlug;
    }

    const updateData: Record<string, unknown> = {};
    const fields = ["title", "slug", "client", "category", "description", "results", "image"];
    for (const f of fields) {
      if (body[f] !== undefined) {
        updateData[f] =
          typeof body[f] === "string" ? body[f].trim() || null : body[f];
      }
    }
    if (body.featured !== undefined) {
      updateData.featured = Boolean(body.featured);
    }
    if (body.order !== undefined && Number.isFinite(Number(body.order))) {
      updateData.order = Number(body.order);
    }
    if (body.services !== undefined) {
      const arr = Array.isArray(body.services)
        ? body.services
        : typeof body.services === "string"
        ? body.services.split(",").map((s: string) => s.trim()).filter(Boolean)
        : [];
      updateData.services = JSON.stringify(arr);
    }

    const updated = await (db as any).portfolio.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      ...updated,
      services: parseStringArray(updated.services),
    });
  } catch (error) {
    console.error("[API /api/admin/portfolio/[id] PUT] Error:", error);
    return NextResponse.json(
      { error: "Failed to update portfolio item" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/portfolio/[id]
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const existing = await (db as any).portfolio.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Portfolio item not found" },
        { status: 404 }
      );
    }

    await (db as any).portfolio.delete({ where: { id } });
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("[API /api/admin/portfolio/[id] DELETE] Error:", error);
    return NextResponse.json(
      { error: "Failed to delete portfolio item" },
      { status: 500 }
    );
  }
}
