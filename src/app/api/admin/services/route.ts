import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/admin/services — list all services
export async function GET() {
  try {
    const services = await db.service.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ services });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/admin/services — create a new service
export async function POST(request: NextRequest) {
  try {
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

    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!slug || typeof slug !== "string" || !slug.trim()) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    if (!description || typeof description !== "string" || !description.trim()) {
      return NextResponse.json({ error: "Description is required" }, { status: 400 });
    }
    if (!icon || typeof icon !== "string") {
      return NextResponse.json({ error: "Icon name is required" }, { status: 400 });
    }

    // Check slug uniqueness
    const existing = await db.service.findUnique({ where: { slug: slug.trim() } });
    if (existing) {
      return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
    }

    // benefits: array or comma/newline-separated string
    let benefitsList: string[] = [];
    if (Array.isArray(benefits)) {
      benefitsList = benefits.filter((b) => typeof b === "string" && b.trim()).map((b) => b.trim());
    } else if (typeof benefits === "string" && benefits.trim()) {
      benefitsList = benefits
        .split(/\r?\n|,/)
        .map((b) => b.trim())
        .filter(Boolean);
    }

    const created = await db.service.create({
      data: {
        title: title.trim(),
        slug: slug.trim(),
        icon,
        description: description.trim(),
        shortDescription: shortDescription || null,
        longDescription: longDescription || null,
        benefits: JSON.stringify(benefitsList),
        results: results || "",
        startingPrice: startingPrice || null,
        popular: Boolean(popular),
        features: features && typeof features === "string" ? features : null,
        process: process && typeof process === "string" ? process : null,
        faqs: faqs && typeof faqs === "string" ? faqs : null,
        order: order !== undefined ? Number(order) : 0,
      },
    });
    return NextResponse.json({ success: true, service: created }, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
