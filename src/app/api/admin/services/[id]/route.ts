import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

// GET /api/admin/services/[id]
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const service = await db.service.findUnique({ where: { id } });
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ service });
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/services/[id]
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      slug,
      icon,
      description,
      shortDescription,
      longDescription,
      benefits,
      results,
      startingPrice,
      popular,
      features,
      process,
      faqs,
      order,
    } = body;

    const existing = await db.service.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    if (title !== undefined && (typeof title !== "string" || !title.trim())) {
      return NextResponse.json({ error: "Title cannot be empty" }, { status: 400 });
    }
    if (slug !== undefined) {
      if (typeof slug !== "string" || !slug.trim()) {
        return NextResponse.json({ error: "Slug cannot be empty" }, { status: 400 });
      }
      // Check slug uniqueness (excluding this record)
      const slugClash = await db.service.findUnique({ where: { slug: slug.trim() } });
      if (slugClash && slugClash.id !== id) {
        return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
      }
    }

    const data: Record<string, unknown> = {};
    if (title !== undefined) data.title = String(title).trim();
    if (slug !== undefined) data.slug = String(slug).trim();
    if (icon !== undefined) data.icon = String(icon);
    if (description !== undefined) data.description = String(description).trim();
    if (shortDescription !== undefined)
      data.shortDescription = shortDescription === "" ? null : String(shortDescription);
    if (longDescription !== undefined)
      data.longDescription = longDescription === "" ? null : String(longDescription);
    if (results !== undefined) data.results = String(results);
    if (startingPrice !== undefined)
      data.startingPrice = startingPrice === "" ? null : String(startingPrice);
    if (popular !== undefined) data.popular = Boolean(popular);
    if (features !== undefined) data.features = features === "" ? null : String(features);
    if (process !== undefined) data.process = process === "" ? null : String(process);
    if (faqs !== undefined) data.faqs = faqs === "" ? null : String(faqs);
    if (order !== undefined) data.order = Number(order);

    if (benefits !== undefined) {
      let benefitsList: string[] = [];
      if (Array.isArray(benefits)) {
        benefitsList = benefits.filter((b) => typeof b === "string" && b.trim()).map((b) => b.trim());
      } else if (typeof benefits === "string") {
        benefitsList = benefits
          .split(/\r?\n|,/)
          .map((b) => b.trim())
          .filter(Boolean);
      }
      data.benefits = JSON.stringify(benefitsList);
    }

    const updated = await db.service.update({ where: { id }, data });
    return NextResponse.json({ success: true, service: updated });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/services/[id]
export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const existing = await db.service.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    await db.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
