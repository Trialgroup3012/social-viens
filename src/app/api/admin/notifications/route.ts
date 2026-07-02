import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Force Node.js runtime — uses Prisma (not Edge-compatible).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/admin/notifications
 *
 * Returns the most recent notifications + an unread count for the admin
 * bell badge. Supports an optional `?status=unread|read|archived` filter.
 *
 * Response shape:
 *   {
 *     notifications: Notification[],
 *     unreadCount: number,
 *     total: number
 *   }
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status")?.trim() || undefined;
    const limit = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("limit") || "50", 10) || 50)
    );

    const validStatuses = ["unread", "read", "archived"];
    const where: Record<string, unknown> =
      statusParam && validStatuses.includes(statusParam)
        ? { status: statusParam }
        : {};

    const [notifications, total, unreadCount] = await Promise.all([
      (db as any).notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
      }),
      (db as any).notification.count(),
      (db as any).notification.count({ where: { status: "unread" } }),
    ]);

    // Parse the JSON-encoded metadata field so the client gets a real object.
    const normalized = notifications.map((n: any) => {
      let metadata: Record<string, unknown> | null = null;
      if (n.metadata) {
        try {
          metadata = JSON.parse(n.metadata);
        } catch {
          metadata = null;
        }
      }
      return { ...n, metadata };
    });

    return NextResponse.json({
      notifications: normalized,
      unreadCount,
      total,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/notifications
 *
 * Bulk actions:
 *   { action: "markAllRead" }   — mark every unread notification as read
 *   { action: "markAllArchived" } — mark every notification as archived
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const action = String(body?.action || "").toLowerCase();

    if (action === "markallread") {
      const result = await (db as any).notification.updateMany({
        where: { status: "unread" },
        data: { status: "read" },
      });
      return NextResponse.json({
        success: true,
        updated: result?.count ?? 0,
        action: "markAllRead",
      });
    }

    if (action === "markallarchived") {
      const result = await (db as any).notification.updateMany({
        where: { status: { not: "archived" } },
        data: { status: "archived" },
      });
      return NextResponse.json({
        success: true,
        updated: result?.count ?? 0,
        action: "markAllArchived",
      });
    }

    return NextResponse.json(
      { error: "Unknown action. Use markAllRead or markAllArchived." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error performing bulk notification action:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
