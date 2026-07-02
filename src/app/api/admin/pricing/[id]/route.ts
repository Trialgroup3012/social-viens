import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

// GET /api/admin/pricing/[id]
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const pkg = await db.pricingPackage.findUnique({ where: { id } });
    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }
    return NextResponse.json({ package: pkg });
  } catch (error) {
    console.error("Error fetching pricing package:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/pricing/[id]
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      name,
      price,
      period,
      description,
      features,
      highlighted,
      ctaText,
      ctaLink,
      order,
    } = body;

    const existing = await db.pricingPackage.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    if (name !== undefined && (typeof name !== "string" || !name.trim())) {
      return NextResponse.json({ error: "Name cannot be empty" }, { status: 400 });
    }
    if (price !== undefined && isNaN(Number(price))) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }

    const data: Record<string, unknown> = {};
    if (name !== undefined) data.name = String(name).trim();
    if (price !== undefined) data.price = Number(price);
    if (period !== undefined) data.period = String(period);
    if (description !== undefined) data.description = String(description);
    if (highlighted !== undefined) data.highlighted = Boolean(highlighted);
    if (ctaText !== undefined) data.ctaText = String(ctaText);
    if (ctaLink !== undefined) data.ctaLink = String(ctaLink);
    if (order !== undefined) data.order = Number(order);

    if (features !== undefined) {
      let featuresList: string[] = [];
      if (Array.isArray(features)) {
        featuresList = features.filter((f) => typeof f === "string" && f.trim()).map((f) => f.trim());
      } else if (typeof features === "string") {
        featuresList = features
          .split(/\r?\n|,/)
          .map((f) => f.trim())
          .filter(Boolean);
      }
      data.features = JSON.stringify(featuresList);
    }

    const updated = await db.pricingPackage.update({ where: { id }, data });
    return NextResponse.json({ success: true, package: updated });
  } catch (error) {
    console.error("Error updating pricing package:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/pricing/[id]
export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const existing = await db.pricingPackage.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }
    await db.pricingPackage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting pricing package:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
