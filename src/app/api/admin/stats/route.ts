import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Force Node.js runtime — uses Prisma (not Edge-compatible).
export const runtime = "nodejs";

// GET /api/admin/stats — Spec §7.3, §8.2
// Returns high-level dashboard counts for the admin dashboard.
export async function GET() {
  try {
    const [
      blogCount,
      leadCount,
      portfolioCount,
      testimonialCount,
      publishedPosts,
      newLeads,
      pricingCount,
      serviceCount,
      chatSessionCount,
    ] = await Promise.all([
      db.blogPost.count(),
      db.lead.count(),
      db.portfolio.count(),
      db.testimonial.count(),
      db.blogPost.count({ where: { status: "published" } }),
      db.lead.count({ where: { status: "new" } }),
      db.pricingPackage.count(),
      db.service.count(),
      db.chatSession.count(),
    ]);

    return NextResponse.json({
      blogCount,
      leadCount,
      portfolioCount,
      testimonialCount,
      publishedPosts,
      newLeads,
      pricingCount,
      serviceCount,
      chatSessionCount,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to fetch stats",
        details: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}
