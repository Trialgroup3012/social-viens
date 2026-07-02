import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Force Node.js runtime — uses Prisma (not Edge-compatible).
export const runtime = "nodejs";

/**
 * GET /api/admin/testimonials/[id]
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

    const item = await (db as any).testimonial.findUnique({ where: { id } });
    if (!item) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("[API /api/admin/testimonials/[id] GET] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonial" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/testimonials/[id]
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

    const existing = await (db as any).testimonial.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    const updateData: Record<string, unknown> = {};
    const fields = [
      "name",
      "business",
      "company",
      "industry",
      "role",
      "text",
      "quote",
      "results",
      "result",
      "image",
      "avatar",
    ];
    for (const f of fields) {
      if (body[f] !== undefined) {
        updateData[f] =
          typeof body[f] === "string" ? body[f].trim() || null : body[f];
      }
    }
    if (body.rating !== undefined) {
      const ratingNum = Number(body.rating);
      updateData.rating =
        Number.isFinite(ratingNum) && ratingNum >= 1 && ratingNum <= 5
          ? Math.round(ratingNum)
          : 5;
    }
    if (body.featured !== undefined) {
      updateData.featured = Boolean(body.featured);
    }
    if (body.hasVideo !== undefined) {
      updateData.hasVideo = Boolean(body.hasVideo);
    }
    if (body.order !== undefined && Number.isFinite(Number(body.order))) {
      updateData.order = Number(body.order);
    }

    // Keep text/quote in sync if only one is provided.
    if (body.text !== undefined && body.quote === undefined) {
      updateData.quote = body.text?.trim() || null;
    }
    if (body.quote !== undefined && body.text === undefined) {
      updateData.text = body.quote?.trim() || null;
    }
    if (body.results !== undefined && body.result === undefined) {
      updateData.result = body.results?.trim() || null;
    }
    if (body.result !== undefined && body.results === undefined) {
      updateData.results = body.result?.trim() || null;
    }

    const updated = await (db as any).testimonial.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[API /api/admin/testimonials/[id] PUT] Error:", error);
    return NextResponse.json(
      { error: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/testimonials/[id]
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

    const existing = await (db as any).testimonial.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    await (db as any).testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("[API /api/admin/testimonials/[id] DELETE] Error:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
