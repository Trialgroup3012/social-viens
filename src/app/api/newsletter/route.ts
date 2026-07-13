import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-auth";

// Force Node.js runtime — uses Prisma (not Edge-compatible).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, source } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await db.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.active) {
        return NextResponse.json(
          { error: "This email is already subscribed" },
          { status: 409 }
        );
      }
      // Reactivate inactive subscriber
      await db.newsletterSubscriber.update({
        where: { email },
        data: { active: true, source: source || "newsletter", name: name || existing.name },
      });
      return NextResponse.json(
        { success: true, message: "Resubscribed successfully" },
        { status: 200 }
      );
    }

    // Create new subscriber
    const subscriber = await db.newsletterSubscriber.create({
      data: {
        email,
        name: name || "Newsletter Subscriber",
        source: source || "newsletter",
      },
    });

    return NextResponse.json(
      { success: true, subscriber: { id: subscriber.id, email: subscriber.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const subscribers = await db.newsletterSubscriber.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ subscribers, count: subscribers.length });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
