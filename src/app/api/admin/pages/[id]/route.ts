import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

// GET /api/admin/pages/[id]
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const page = await db.pageContent.findUnique({ where: { id } });
    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }
    return NextResponse.json({ page });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/pages/[id]
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, slug, content, metaTitle, metaDescription, status } = body;

    const existing = await db.pageContent.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    if (title !== undefined && (typeof title !== "string" || !title.trim())) {
      return NextResponse.json({ error: "Title cannot be empty" }, { status: 400 });
    }
    if (slug !== undefined) {
      if (typeof slug !== "string" || !slug.trim()) {
        return NextResponse.json({ error: "Slug cannot be empty" }, { status: 400 });
      }
      const slugClash = await db.pageContent.findUnique({ where: { slug: slug.trim() } });
      if (slugClash && slugClash.id !== id) {
        return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
      }
    }
    if (status !== undefined && !["draft", "published"].includes(status)) {
      return NextResponse.json(
        { error: "Status must be draft or published" },
        { status: 400 }
      );
    }

    const data: Record<string, unknown> = {};
    if (title !== undefined) data.title = String(title).trim();
    if (slug !== undefined) data.slug = String(slug).trim();
    if (content !== undefined) data.content = String(content);
    if (metaTitle !== undefined)
      data.metaTitle = metaTitle === "" ? null : String(metaTitle);
    if (metaDescription !== undefined)
      data.metaDescription = metaDescription === "" ? null : String(metaDescription);
    if (status !== undefined) data.status = String(status);

    const updated = await db.pageContent.update({ where: { id }, data });
    return NextResponse.json({ success: true, page: updated });
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/pages/[id]
export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const existing = await db.pageContent.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }
    await db.pageContent.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
