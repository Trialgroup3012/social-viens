import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { normaliseSeoPath, parseSeoSetting, seoSettingKey } from "@/lib/page-seo";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const path = normaliseSeoPath(request.nextUrl.searchParams.get("path") || "");
  if (!path) return NextResponse.json({ seo: null }, { status: 400 });

  try {
    const row = await db.siteSetting.findUnique({ where: { key: seoSettingKey(path) } });
    return NextResponse.json(
      { seo: row ? parseSeoSetting(row.key, row.value) : null },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch {
    return NextResponse.json({ seo: null });
  }
}
