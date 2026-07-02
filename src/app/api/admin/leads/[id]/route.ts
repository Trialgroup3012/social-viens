import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

// GET /api/admin/leads/[id] — single lead
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const lead = await db.lead.findUnique({ where: { id } });
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json({ lead });
  } catch (error) {
    console.error("Error fetching lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/leads/[id] — update lead (mainly status + notes)
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, notes, name, email, phone, business, service, message, source, pageUrl } = body;

    const existing = await db.lead.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Validate status if provided
    if (status !== undefined && !["new", "read", "replied"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be new, read, or replied." },
        { status: 400 }
      );
    }

    const data: Record<string, unknown> = {};
    if (status !== undefined) data.status = status;
    if (notes !== undefined) data.notes = notes === "" ? null : notes;
    if (name !== undefined) data.name = String(name);
    if (email !== undefined) data.email = String(email);
    if (phone !== undefined) data.phone = String(phone);
    if (business !== undefined) data.business = business === "" ? null : String(business);
    if (service !== undefined) data.service = service === "" ? null : String(service);
    if (message !== undefined) data.message = message === "" ? null : String(message);
    if (source !== undefined) data.source = String(source);
    if (pageUrl !== undefined) data.pageUrl = pageUrl === "" ? null : String(pageUrl);

    const updated = await db.lead.update({ where: { id }, data });
    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/leads/[id] — delete lead
export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const existing = await db.lead.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    await db.lead.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
