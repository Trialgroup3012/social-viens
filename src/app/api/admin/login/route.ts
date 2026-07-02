import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createHash } from "crypto";

// Force Node.js runtime — uses Prisma + node:crypto (not Edge-compatible).
export const runtime = "nodejs";

// Simple non-bcrypt hash — must match the hash used by /api/seed when
// bootstrapping the demo admin user (admin@socialviens.com / admin123).
// NOT for production — this is a demo-only auth scheme.
function hashPassword(plain: string): string {
  return createHash("sha256")
    .update(`sv$alt|${plain}`)
    .digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { email, password } = body as { email?: string; password?: string };

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({ where: { email } });
    if (!user || user.password !== hashPassword(password)) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Stateless demo token — base64 of `email:timestamp`. NOT cryptographically
    // secure; the layout only checks for presence of the token in localStorage.
    const token = Buffer.from(`${email}:${Date.now()}`).toString("base64");

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Login failed",
        details: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}
