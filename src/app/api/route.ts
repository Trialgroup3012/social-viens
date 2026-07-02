import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    name: "Social Viens API",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}