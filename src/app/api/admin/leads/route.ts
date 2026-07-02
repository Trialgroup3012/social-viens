import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/admin/leads — list all leads with optional filters:
//   ?status=new|read|replied  &q=search  &page=1  &limit=10
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const q = searchParams.get("q") || undefined;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(
      1,
      Math.min(100, parseInt(searchParams.get("limit") || "10", 10))
    );

    const where: Record<string, unknown> = {};
    if (
      status &&
      status !== "all" &&
      ["new", "read", "replied"].includes(status)
    ) {
      where.status = status;
    }
    if (q && q.trim()) {
      const trimmed = q.trim();
      where.OR = [
        { name: { contains: trimmed } },
        { email: { contains: trimmed } },
        { phone: { contains: trimmed } },
        { business: { contains: trimmed } },
      ];
    }

    const [leads, total] = await Promise.all([
      db.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.lead.count({ where }),
    ]);

    return NextResponse.json({
      leads,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
