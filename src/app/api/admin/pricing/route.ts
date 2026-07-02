import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/admin/pricing — list all pricing packages
export async function GET() {
  try {
    const packages = await db.pricingPackage.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ packages });
  } catch (error) {
    console.error("Error fetching pricing packages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/admin/pricing — create a new pricing package
export async function POST(request: NextRequest) {
  try {
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

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (price === undefined || price === null || isNaN(Number(price))) {
      return NextResponse.json({ error: "Valid price is required" }, { status: 400 });
    }
    if (!period || typeof period !== "string") {
      return NextResponse.json({ error: "Period is required" }, { status: 400 });
    }
    if (!description || typeof description !== "string") {
      return NextResponse.json({ error: "Description is required" }, { status: 400 });
    }

    // features: accept string[] or string (comma/newline separated)
    let featuresList: string[] = [];
    if (Array.isArray(features)) {
      featuresList = features.filter((f) => typeof f === "string" && f.trim()).map((f) => f.trim());
    } else if (typeof features === "string" && features.trim()) {
      featuresList = features
        .split(/\r?\n|,/)
        .map((f) => f.trim())
        .filter(Boolean);
    }

    const created = await db.pricingPackage.create({
      data: {
        name: name.trim(),
        price: Number(price),
        period,
        description,
        features: JSON.stringify(featuresList),
        highlighted: Boolean(highlighted),
        ctaText: ctaText || "Get Started",
        ctaLink: ctaLink || "/contact",
        order: order !== undefined ? Number(order) : 0,
      },
    });
    return NextResponse.json({ success: true, package: created }, { status: 201 });
  } catch (error) {
    console.error("Error creating pricing package:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
