import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Force Node.js runtime — uses Prisma (not Edge-compatible).
export const runtime = "nodejs";

/**
 * GET /api/admin/testimonials
 * List all testimonials with optional search + pagination.
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
        { name: { contains: q } },
        { business: { contains: q } },
        { company: { contains: q } },
        { industry: { contains: q } },
        { text: { contains: q } },
        { quote: { contains: q } },
      ];
    }

    const [total, items] = await Promise.all([
      (db as any).testimonial.count({ where }),
      (db as any).testimonial.findMany({
        where,
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("[API /api/admin/testimonials GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/testimonials
 * Create a new testimonial.
 * Required: name, industry.
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
      name,
      business,
      company,
      industry,
      role,
      text,
      quote,
      rating,
      results,
      result,
      image,
      avatar,
      featured,
      hasVideo,
      order,
    } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!industry || typeof industry !== "string" || !industry.trim()) {
      return NextResponse.json(
        { error: "Industry is required" },
        { status: 400 }
      );
    }

    const ratingNum = Number(rating);
    const safeRating =
      Number.isFinite(ratingNum) && ratingNum >= 1 && ratingNum <= 5
        ? Math.round(ratingNum)
        : 5;

    const testimonial = await (db as any).testimonial.create({
      data: {
        name: name.trim(),
        business: business?.trim() || null,
        company: (company?.trim() || business?.trim() || null) as string | null,
        industry: industry.trim(),
        role: role?.trim() || null,
        text: text?.trim() || quote?.trim() || null,
        quote: (quote?.trim() || text?.trim() || null) as string | null,
        rating: safeRating,
        results: results?.trim() || result?.trim() || null,
        result: (result?.trim() || results?.trim() || null) as string | null,
        image: image?.trim() || null,
        avatar: avatar?.trim() || null,
        featured: Boolean(featured),
        hasVideo: Boolean(hasVideo),
        order: Number.isFinite(order) ? Number(order) : 0,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("[API /api/admin/testimonials POST] Error:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
