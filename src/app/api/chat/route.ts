import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createChatCompletion, type ChatMessage } from '@/lib/ai-provider';

// Force Node.js runtime — uses Prisma (not Edge-compatible).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `You are the AI assistant for Social Viens, India's premium digital marketing agency. Your role is to:

1. Greet visitors warmly and professionally
2. Understand their business needs and marketing challenges
3. Recommend relevant services from Social Viens (Website Development, SEO, Local SEO, Google Business Profile, Paid Ads, Social Media Marketing, Branding, Marketing Automation, Lead Generation)
4. Qualify leads by asking about: their industry, current marketing efforts, budget range, and timeline
5. Encourage them to book a free strategy session or contact the team
6. Be knowledgeable about digital marketing trends and best practices
7. Keep responses concise (2-3 sentences max unless explaining something)
8. Always maintain a premium, professional tone matching the Social Viens brand

Key information about Social Viens:
- India's premium digital marketing agency based in New Delhi
- Serves: Real Estate, Healthcare, Law Firms, Education, Beauty, Restaurants, E-Commerce, Startups
- Pricing: Growth Starter ₹25K/mo, Business Accelerator ₹55K/mo, Enterprise Growth ₹1.2L/mo
- Results: 96% client retention, 300% avg ROAS, 350% avg ROI
- Contact: +91 81780 04800, socialviens@gmail.com
- Hours: Mon-Sat 10AM-7PM IST

If asked about pricing, mention the plans briefly and encourage a free strategy session for custom quotes.
If asked something unrelated to digital marketing, politely redirect to how Social Viens can help their business grow.`;

// Extract the visitor IP from request headers. We check the standard
// `x-forwarded-for` and `x-real-ip` headers (set by Caddy / proxies), and fall
// back to the socket address if neither is present.
function getClientIp(req: NextRequest): string | null {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) {
    // x-forwarded-for may be a comma-separated list; the first entry is the
    // original client.
    const first = xff.split(',')[0]?.trim();
    if (first) return first;
  }
  const xreal = req.headers.get('x-real-ip');
  if (xreal) return xreal.trim();
  return null;
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + '…';
}

// POST /api/chat — main chat handler. Persists every message to the database
// so admins can review conversations in the admin panel. DB errors are
// caught individually so a failure to persist never blocks the AI response.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const sessionId = typeof body?.sessionId === 'string' ? body.sessionId : '';
    const message = typeof body?.message === 'string' ? body.message : '';

    if (!sessionId || !message) {
      return NextResponse.json(
        { error: 'sessionId and message are required' },
        { status: 400 }
      );
    }

    const visitorIp = getClientIp(req);
    const userAgent = req.headers.get('user-agent') || null;

    // 1) Upsert the ChatSession. Find by sessionId, or create a new one with
    //    the firstMessage snapshot + visitor info.
    let session;
    try {
      session = await db.chatSession.upsert({
        where: { sessionId },
        update: {
          // Refresh visitor IP / UA on each request in case the original
          // session row was created before we had header access (defensive).
          ...(visitorIp ? { visitorIp } : {}),
          ...(userAgent ? { userAgent } : {}),
          status: 'active',
        },
        create: {
          sessionId,
          visitorIp,
          userAgent,
          firstMessage: truncate(message, 200),
          lastMessage: truncate(message, 200),
          status: 'active',
        },
      });
    } catch (err) {
      console.error('[chat] Failed to upsert ChatSession:', err);
      // We can still continue — try to fetch the session, or proceed without it.
      try {
        session = await db.chatSession.findUnique({ where: { sessionId } });
      } catch {
        session = null;
      }
    }

    // 2) Save the user's message.
    try {
      await db.chatMessage.create({
        data: {
          sessionId,
          role: 'user',
          content: message,
        },
      });
    } catch (err) {
      console.error('[chat] Failed to save user message:', err);
    }

    // 3) Load the last ~20 messages for context (oldest → newest so the AI
    //    sees them in chronological order). Prisma doesn't support "take last
    //    N ordered asc" directly, so we fetch the last 20 ordered desc and
    //    reverse them in memory.
    let recentMessages: Array<{ role: string; content: string }> = [];
    try {
      const last20 = await db.chatMessage.findMany({
        where: { sessionId },
        orderBy: { createdAt: 'desc' },
        take: 20,
      });
      recentMessages = last20
        .reverse()
        .map((m) => ({ role: m.role, content: m.content }));
    } catch (err) {
      console.error('[chat] Failed to load message history:', err);
      // Fall back to just the current message.
      recentMessages = [{ role: 'user', content: message }];
    }

    // 4) Build the payload: SYSTEM_PROMPT first, then history.
    const payload: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...recentMessages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
    ];

    // 5) Call the configured AI provider (OpenAI / Gemini / Z.AI fallback).
    //    The ai-provider lib reads config from DB (admin-controlled) + env.
    const result = await createChatCompletion(payload);
    const aiResponse = result.content;

    // 6) Save the AI response.
    try {
      await db.chatMessage.create({
        data: {
          sessionId,
          role: 'assistant',
          content: aiResponse,
        },
      });
    } catch (err) {
      console.error('[chat] Failed to save assistant message:', err);
    }

    // 7) Update the ChatSession: increment messageCount by 2 (user + AI),
    //    set lastMessage to the AI response (truncated), bump updatedAt.
    try {
      await db.chatSession.update({
        where: { sessionId },
        data: {
          messageCount: { increment: 2 },
          lastMessage: truncate(aiResponse, 200),
          status: 'active',
          // Touch updatedAt explicitly in case the increment alone doesn't.
          updatedAt: new Date(),
        },
      });
    } catch (err) {
      console.error('[chat] Failed to update ChatSession:', err);
    }

    // Reference `session` so TypeScript doesn't complain about unused var —
    // we may want to return session metadata in the future.
    void session;

    return NextResponse.json({
      success: true,
      response: aiResponse,
      sessionId,
      provider: result.provider,
      model: result.model,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get response' },
      { status: 500 }
    );
  }
}

// DELETE /api/chat?sessionId=xxx — end a conversation (mark status as "ended").
// We keep the messages for admin review rather than deleting them.
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');
  if (sessionId) {
    try {
      await db.chatSession.update({
        where: { sessionId },
        data: { status: 'ended' },
      });
    } catch (err) {
      console.error('[chat] Failed to mark session as ended:', err);
      // Non-fatal — the frontend still wants a 200 so its UI resets.
    }
  }
  return NextResponse.json({ success: true });
}
