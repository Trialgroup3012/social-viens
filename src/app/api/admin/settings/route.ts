import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Force Node.js runtime — uses Prisma (not Edge-compatible).
export const runtime = "nodejs";

// GET /api/admin/settings — Spec §7.3
// Returns all site settings as a flat { key: value } object.
export async function GET() {
  try {
    const rows = await db.siteSetting.findMany();
    const settings: Record<string, string> = {};
    for (const row of rows) {
      settings[row.key] = row.value;
    }
    return NextResponse.json({ settings });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to fetch settings",
        details: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

// PUT /api/admin/settings — Spec §7.3
// Accepts either:
//   { key: "siteName", value: "..." }                  — single update
//   { settings: { siteName: "...", phone: "..." } }    — bulk update
// Returns { success: true, updated: <count> }.
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const updates: Array<{ key: string; value: string }> = [];

    if (
      "key" in body &&
      typeof (body as any).key === "string" &&
      "value" in (body as any)
    ) {
      updates.push({
        key: String((body as any).key),
        value: String((body as any).value),
      });
    } else if (
      "settings" in body &&
      typeof (body as any).settings === "object" &&
      (body as any).settings !== null
    ) {
      for (const [k, v] of Object.entries((body as any).settings)) {
        updates.push({ key: String(k), value: String(v) });
      }
    } else {
      return NextResponse.json(
        { error: "Provide { key, value } or { settings: { ... } }" },
        { status: 400 }
      );
    }

    const results = await Promise.all(
      updates.map((u) =>
        db.siteSetting.upsert({
          where: { key: u.key },
          create: { key: u.key, value: u.value },
          update: { value: u.value },
        })
      )
    );

    return NextResponse.json({ success: true, updated: results.length });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to update settings",
        details: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}
