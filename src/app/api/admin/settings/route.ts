import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-auth";
import { encryptSetting, isSensitiveSetting } from "@/lib/secure-settings";
import { refreshAIProviderConfig } from "@/lib/ai-provider";
import { refreshSmtpConfig } from "@/lib/email-service";

export const runtime = "nodejs";

function requireAdmin(request: NextRequest) {
  return getAdminSession(request)
    ? null
    : NextResponse.json({ error: "Authentication required" }, { status: 401 });
}

export async function GET(request: NextRequest) {
  const unauthorised = requireAdmin(request);
  if (unauthorised) return unauthorised;

  try {
    const rows = await db.siteSetting.findMany();
    const settings: Record<string, string> = {};
    const configuredKeys: string[] = [];

    for (const row of rows) {
      if (isSensitiveSetting(row.key)) {
        settings[row.key] = "";
        if (row.value) configuredKeys.push(row.key);
      } else {
        settings[row.key] = row.value;
      }
    }

    return NextResponse.json({ settings, configuredKeys });
  } catch (error) {
    console.error("Settings fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const unauthorised = requireAdmin(request);
  if (unauthorised) return unauthorised;

  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const updates: Array<{ key: string; value: string }> = [];
    if ("key" in body && typeof body.key === "string" && "value" in body) {
      updates.push({ key: body.key, value: String(body.value) });
    } else if ("settings" in body && body.settings && typeof body.settings === "object") {
      for (const [key, value] of Object.entries(body.settings)) {
        updates.push({ key, value: String(value) });
      }
    } else {
      return NextResponse.json(
        { error: "Provide { key, value } or { settings: { ... } }" },
        { status: 400 }
      );
    }

    let updated = 0;
    for (const update of updates) {
      if (!update.key.trim()) continue;
      if (isSensitiveSetting(update.key) && update.value.trim() === "") continue;

      const value = isSensitiveSetting(update.key)
        ? encryptSetting(update.value.trim())
        : update.value;
      await db.siteSetting.upsert({
        where: { key: update.key },
        create: { key: update.key, value },
        update: { value },
      });
      updated++;
    }

    if (updates.some((update) => update.key.startsWith("ai_"))) {
      refreshAIProviderConfig();
    }
    if (updates.some((update) => update.key.startsWith("smtp_"))) {
      refreshSmtpConfig();
    }

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
