import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notifyNewLead } from "@/lib/notification-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, business, message, source } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    const lead = await db.lead.create({
      data: {
        name,
        email,
        phone,
        business: business || null,
        message: message || null,
        source: source || "website",
        status: "new",
      },
    });

    // Fire-and-forget: notify admin about the new lead (non-fatal).
    // Don't await so the API response stays fast.
    notifyNewLead(lead).catch((e) =>
      console.error("[/api/leads] notification error:", e)
    );

    return NextResponse.json(
      { success: true, lead },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
