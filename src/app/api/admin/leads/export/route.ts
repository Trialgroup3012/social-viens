import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/admin/leads/export?status=new|read|replied&q=search
// Returns a CSV file download with ALL matching leads (no pagination — exports everything)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const q = searchParams.get("q") || undefined;

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

    const leads = await db.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // CSV column headers (exact order per spec)
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Business",
      "Service",
      "Source",
      "Status",
      "Message",
      "Page URL",
      "Notes",
      "Created At",
      "Updated At",
    ];

    // Escape a single CSV cell value.
    // - Replace newlines with spaces (keep CSV clean)
    // - Double any existing double quotes
    // - Wrap in quotes if value contains comma, quote, or surrounding whitespace
    const escapeCell = (value: unknown): string => {
      if (value === null || value === undefined) return "";
      let str: string;
      if (value instanceof Date) {
        str = value.toISOString();
      } else if (typeof value === "string") {
        str = value;
      } else {
        str = String(value);
      }
      // Collapse newlines/carriage returns to a single space
      str = str.replace(/\r?\n|\r/g, " ");
      // Escape embedded double quotes
      str = str.replace(/"/g, '""');
      // Wrap in quotes if value contains comma, double-quote, or leading/trailing whitespace
      if (/[",]/.test(str) || /^\s|\s$/.test(str)) {
        str = `"${str}"`;
      }
      return str;
    };

    const rows: string[] = [headers.join(",")];

    for (const lead of leads) {
      const row = [
        escapeCell(lead.id),
        escapeCell(lead.name),
        escapeCell(lead.email),
        escapeCell(lead.phone),
        escapeCell(lead.business),
        escapeCell(lead.service),
        escapeCell(lead.source),
        escapeCell(lead.status),
        escapeCell(lead.message),
        escapeCell(lead.pageUrl),
        escapeCell(lead.notes),
        escapeCell(lead.createdAt),
        escapeCell(lead.updatedAt),
      ];
      rows.push(row.join(","));
    }

    const csv = rows.join("\n");
    const filename = `social-viens-leads-${new Date()
      .toISOString()
      .split("T")[0]}.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error exporting leads to CSV:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
