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
 * GET /api/admin/portfolio
 * List all portfolio items with optional search + pagination.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("limit") || "50", 10) || 50)
    );

    const where: Record<string, unknown> = {};
    if (q) {
      where.OR = [
        { title: { contains: q } },
        { client: { contains: q } },
        { category: { contains: q } },
        { description: { contains: q } },
      ];
    }

    const [total, items] = await Promise.all([
      (db as any).portfolio.count({ where }),
      (db as any).portfolio.findMany({
        where,
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const normalized = items.map((p: any) => ({
      ...p,
      services: parseStringArray(p.services),
    }));

    return NextResponse.json({
      items: normalized,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("[API /api/admin/portfolio GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio items" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/portfolio
 * Create a new portfolio item.
 * Required: title, client, category, description.
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

    const { title, slug, client, category, description, results, image, services, featured, order } = body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!client || typeof client !== "string" || !client.trim()) {
      return NextResponse.json({ error: "Client is required" }, { status: 400 });
    }
    if (!category || typeof category !== "string" || !category.trim()) {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }
    if (!description || typeof description !== "string" || !description.trim()) {
      return NextResponse.json({ error: "Description is required" }, { status: 400 });
    }

    // Generate slug if not provided; ensure uniqueness.
    const finalSlug = (slug?.trim() ? slugify(slug) : slugify(title)) || `portfolio-${Date.now()}`;
    const conflict = await (db as any).portfolio.findUnique({
      where: { slug: finalSlug },
      select: { id: true },
    });
    if (conflict) {
      return NextResponse.json(
        { error: "A portfolio item with this slug already exists" },
        { status: 400 }
      );
    }

    const servicesArray = Array.isArray(services)
      ? services
      : typeof services === "string"
      ? services.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [];

    const item = await (db as any).portfolio.create({
      data: {
        slug: finalSlug,
        title: title.trim(),
        client: client.trim(),
        category: category.trim(),
        description: description.trim(),
        results: results?.trim() || null,
        image: image?.trim() || null,
        services: JSON.stringify(servicesArray),
        featured: Boolean(featured),
        order: Number.isFinite(order) ? Number(order) : 0,
      },
    });

    return NextResponse.json(
      { ...item, services: servicesArray },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API /api/admin/portfolio POST] Error:", error);
    return NextResponse.json(
      { error: "Failed to create portfolio item" },
      { status: 500 }
    );
  }
}
