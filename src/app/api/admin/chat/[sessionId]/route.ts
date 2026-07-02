import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Force Node.js runtime — uses Prisma (not Edge-compatible).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/admin/chat/[sessionId] — return a single chat session with all its
// messages (ordered oldest → newest).
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    const session = await db.chatSession.findUnique({
      where: { sessionId },
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Chat session not found' },
        { status: 404 }
      );
    }

    const messages = await db.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ session, messages });
  } catch (error: any) {
    console.error('[admin/chat/[sessionId]] GET error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch chat session',
        details: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/chat/[sessionId] — update session status and/or leadId.
// Body: { status?: "active" | "ended" | "converted", leadId?: string | null }
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const body = (await req.json().catch(() => ({} as Record<string, unknown>))) as {
      status?: string;
      leadId?: string | null;
    };

    const existing = await db.chatSession.findUnique({
      where: { sessionId },
    });
    if (!existing) {
      return NextResponse.json(
        { error: 'Chat session not found' },
        { status: 404 }
      );
    }

    const data: Record<string, unknown> = {};
    if (body.status) {
      const s = String(body.status).toLowerCase();
      if (!['active', 'ended', 'converted'].includes(s)) {
        return NextResponse.json(
          { error: 'Invalid status — must be active, ended, or converted' },
          { status: 400 }
        );
      }
      data.status = s;
    }
    if (body.leadId !== undefined) {
      data.leadId = body.leadId || null;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    const updated = await db.chatSession.update({
      where: { sessionId },
      data,
    });

    return NextResponse.json({ success: true, session: updated });
  } catch (error: any) {
    console.error('[admin/chat/[sessionId]] PATCH error:', error);
    return NextResponse.json(
      {
        error: 'Failed to update chat session',
        details: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/chat/[sessionId] — delete the entire session + its
// messages (cascade is configured in the Prisma schema).
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    const existing = await db.chatSession.findUnique({
      where: { sessionId },
    });
    if (!existing) {
      return NextResponse.json(
        { error: 'Chat session not found' },
        { status: 404 }
      );
    }

    await db.chatSession.delete({ where: { sessionId } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[admin/chat/[sessionId]] DELETE error:', error);
    return NextResponse.json(
      {
        error: 'Failed to delete chat session',
        details: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}
