import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  ADMIN_SESSION_COOKIE,
  adminSessionMaxAge,
  canAttemptAdminLogin,
  clearAdminLoginAttempts,
  createAdminSession,
  hasAdminSessionSecret,
  hashAdminPassword,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    if (!hasAdminSessionSecret()) {
      return NextResponse.json(
        { error: "Secure admin sessions are not configured yet." },
        { status: 503 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { email, password } = body as { email?: string; password?: string };
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const identifier = `${request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"}:${email.toLowerCase()}`;
    if (!canAttemptAdminLogin(identifier)) {
      return NextResponse.json(
        { error: "Too many sign-in attempts. Please try again in 15 minutes." },
        { status: 429 }
      );
    }

    const user = await db.user.findUnique({ where: { email } });
    const passwordCheck = verifyAdminPassword(password, user?.password ?? null);
    if (!user || !passwordCheck.valid || user.role !== "admin") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (passwordCheck.needsUpgrade) {
      await db.user.update({
        where: { id: user.id },
        data: { password: hashAdminPassword(password) },
      });
    }
    clearAdminLoginAttempts(identifier);

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: createAdminSession({ id: user.id, email: user.email, role: user.role }),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: adminSessionMaxAge,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
