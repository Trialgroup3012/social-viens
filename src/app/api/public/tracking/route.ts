import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const revalidate = 300;

const TRACKING_KEYS = [
  "gtm_container_id",
  "ga_measurement_id",
  "google_site_verification",
  "meta_pixel_id",
] as const;

function validTrackingValue(key: string, value: string): boolean {
  if (key === "gtm_container_id") return /^GTM-[A-Z0-9]+$/i.test(value);
  if (key === "ga_measurement_id") return /^G-[A-Z0-9]+$/i.test(value);
  if (key === "meta_pixel_id") return /^\d{8,20}$/.test(value);
  if (key === "google_site_verification") return /^[A-Za-z0-9_-]{12,200}$/.test(value);
  return false;
}

export async function GET() {
  try {
    const rows = await db.siteSetting.findMany({
      where: { key: { in: [...TRACKING_KEYS] } },
      select: { key: true, value: true },
    });
    const tracking: Record<string, string> = {};
    for (const row of rows) {
      if (validTrackingValue(row.key, row.value)) tracking[row.key] = row.value;
    }

    return NextResponse.json(
      { tracking },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch {
    return NextResponse.json({ tracking: {} }, { status: 200 });
  }
}
