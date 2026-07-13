import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-auth";
import {
  CORE_SEO_PAGES,
  normaliseSeoPath,
  parseSeoSetting,
  seoSettingKey,
  SEO_SETTING_PREFIX,
} from "@/lib/page-seo";

export const runtime = "nodejs";

function requireAdmin(request: NextRequest) {
  return getAdminSession(request)
    ? null
    : NextResponse.json({ error: "Authentication required" }, { status: 401 });
}

export async function GET(request: NextRequest) {
  const unauthorised = requireAdmin(request);
  if (unauthorised) return unauthorised;

  const rows = await db.siteSetting.findMany({
    where: { key: { startsWith: SEO_SETTING_PREFIX } },
    select: { key: true, value: true, updatedAt: true },
  });
  const overrides = new Map(
    rows
      .map((row) => [parseSeoSetting(row.key, row.value), row.updatedAt] as const)
      .filter((entry): entry is readonly [NonNullable<ReturnType<typeof parseSeoSetting>>, Date] => Boolean(entry[0]))
      .map(([seo, updatedAt]) => [seo.path, { ...seo, updatedAt: updatedAt.toISOString(), isOverride: true }])
  );

  const pages = CORE_SEO_PAGES.map((page) => overrides.get(page.path) || { ...page, updatedAt: null, isOverride: false });
  for (const [path, override] of overrides) {
    if (!CORE_SEO_PAGES.some((page) => page.path === path)) pages.push(override);
  }
  return NextResponse.json({ pages });
}

export async function PUT(request: NextRequest) {
  const unauthorised = requireAdmin(request);
  if (unauthorised) return unauthorised;

  const body = await request.json().catch(() => null);
  const path = normaliseSeoPath(typeof body?.path === "string" ? body.path : "");
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const description = typeof body?.description === "string" ? body.description.trim() : "";
  if (!path) return NextResponse.json({ error: "Enter a valid path beginning with /." }, { status: 400 });
  if (!title || title.length > 70) return NextResponse.json({ error: "Title is required and must be 70 characters or fewer." }, { status: 400 });
  if (!description || description.length > 170) return NextResponse.json({ error: "Description is required and must be 170 characters or fewer." }, { status: 400 });

  const value = JSON.stringify({ path, title, description });
  const saved = await db.siteSetting.upsert({
    where: { key: seoSettingKey(path) },
    create: { key: seoSettingKey(path), value },
    update: { value },
  });
  return NextResponse.json({ page: { path, title, description, updatedAt: saved.updatedAt.toISOString(), isOverride: true } });
}

export async function DELETE(request: NextRequest) {
  const unauthorised = requireAdmin(request);
  if (unauthorised) return unauthorised;

  const path = normaliseSeoPath(new URL(request.url).searchParams.get("path") || "");
  if (!path) return NextResponse.json({ error: "Enter a valid path." }, { status: 400 });
  await db.siteSetting.delete({ where: { key: seoSettingKey(path) } }).catch(() => null);
  return NextResponse.json({ success: true });
}
