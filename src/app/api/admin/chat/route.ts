import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Force Node.js runtime — uses Prisma (not Edge-compatible).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/admin/chat — list chat sessions with pagination + search.
// Query params:
//   ?page=1&limit=20&status=active|ended|converted&q=search
// Search matches firstMessage, lastMessage, sessionId, visitorIp.
// Returns: { sessions, total, page, limit, totalPages }
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') || '20')));
    const status = searchParams.get('status') || undefined;
    const q = searchParams.get('q')?.trim() || undefined;

    // Build the WHERE clause.
    const where: Record<string, unknown> = {};
    if (status && status !== 'all') {
      where.status = status;
    }
    if (q) {
      where.OR = [
        { firstMessage: { contains: q } },
        { lastMessage: { contains: q } },
        { sessionId: { contains: q } },
        { visitorIp: { contains: q } },
      ];
    }

    const [total, sessions] = await Promise.all([
      db.chatSession.count({ where }),
      db.chatSession.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        // List view: only session metadata, no messages (too heavy).
        select: {
          id: true,
          sessionId: true,
          messageCount: true,
          status: true,
          firstMessage: true,
          lastMessage: true,
          visitorIp: true,
          userAgent: true,
          leadId: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return NextResponse.json({
      sessions,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error: any) {
    console.error('[admin/chat] GET error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch chat sessions',
        details: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}
