import type { Metadata } from "next";
import { db } from "@/lib/db";
import { parseSeoSetting, seoSettingKey } from "@/lib/page-seo";

export async function withSeoOverride(path: string, metadata: Metadata): Promise<Metadata> {
  if (!process.env.DATABASE_URL) return metadata;

  try {
    const row = await db.siteSetting.findUnique({ where: { key: seoSettingKey(path) } });
    const override = row ? parseSeoSetting(row.key, row.value) : null;
    if (!override) return metadata;

    return {
      ...metadata,
      title: override.title,
      description: override.description,
      openGraph: {
        ...metadata.openGraph,
        title: override.title,
        description: override.description,
        images: metadata.openGraph?.images ?? ["/social-viens-logo.png"],
      },
      twitter: {
        ...metadata.twitter,
        title: override.title,
        description: override.description,
        images: metadata.twitter?.images ?? ["/social-viens-logo.png"],
      },
    };
  } catch {
    return metadata;
  }
}
