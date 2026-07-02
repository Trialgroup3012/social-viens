import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/admin/pages — list all pages
export async function GET() {
  try {
    const pages = await db.pageContent.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json({ pages });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/admin/pages — create a new page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, content, metaTitle, metaDescription, status } = body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!slug || typeof slug !== "string" || !slug.trim()) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    if (content === undefined || content === null || typeof content !== "string") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    // Check slug uniqueness
    const existing = await db.pageContent.findUnique({ where: { slug: slug.trim() } });
    if (existing) {
      return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
    }

    const finalStatus =
      status && ["draft", "published"].includes(status) ? status : "published";

    const created = await db.pageContent.create({
      data: {
        title: title.trim(),
        slug: slug.trim(),
        content,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        status: finalStatus,
      },
    });
    return NextResponse.json({ success: true, page: created }, { status: 201 });
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
