import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Force Node.js runtime — uses Prisma (not Edge-compatible).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * PATCH /api/admin/notifications/[id]
 *
 * Update a notification's status.
 * Body: { status: "read" | "archived" | "unread" }
 */
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing notification id" },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const status = String(body?.status || "").toLowerCase();

    if (!["unread", "read", "archived"].includes(status)) {
      return NextResponse.json(
        {
          error:
            "Invalid status. Must be one of: unread, read, archived.",
        },
        { status: 400 }
      );
    }

    const updated = await (db as any).notification.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, notification: updated });
  } catch (error: any) {
    // P2025 = record not found in Prisma
    if (error?.code === "P2025") {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }
    console.error("Error updating notification:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/notifications/[id]
 *
 * Permanently delete a notification.
 */
export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing notification id" },
        { status: 400 }
      );
    }

    await (db as any).notification.delete({ where: { id } });

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    if (error?.code === "P2025") {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }
    console.error("Error deleting notification:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
