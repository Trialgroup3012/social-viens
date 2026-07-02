import { NextResponse } from "next/server";

// Force Node.js runtime — keeps parity with other admin endpoints.
export const runtime = "nodejs";

// Stateless demo auth — there's no server-side session store, so the logout
// endpoint simply acknowledges the request. The admin layout is responsible
// for clearing `admin_token` / `admin_user` from localStorage on the client.
export async function POST() {
  return NextResponse.json({ success: true });
}
