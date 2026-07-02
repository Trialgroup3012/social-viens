import { NextRequest, NextResponse } from "next/server";
import { getServices, getServiceBySlug } from "@/lib/safe-db";

// Force Node.js runtime — these routes use Prisma (not Edge-compatible).
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  try {
    if (slug) {
      const service = await getServiceBySlug(slug);
      if (!service) {
        return NextResponse.json(
          { error: "Service not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ service });
    }

    const services = await getServices();
    return NextResponse.json({ services, count: services.length });
  } catch (error) {
    console.error("[API /services] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
