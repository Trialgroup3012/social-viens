"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function upsertMeta(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
}

export default function SeoOverrides() {
  const pathname = usePathname();

  useEffect(() => {
    let active = true;
    const update = async () => {
      try {
        const response = await fetch(`/api/public/seo?path=${encodeURIComponent(pathname || "/")}`, { cache: "force-cache" });
        const data = await response.json();
        if (!active || !data.seo) return;
        document.title = data.seo.title;
        upsertMeta("description", data.seo.description);
        upsertMeta("og:title", data.seo.title);
        upsertMeta("og:description", data.seo.description);
      } catch {
        // Keep the statically rendered metadata if an override cannot load.
      }
    };
    void update();
    return () => { active = false; };
  }, [pathname]);

  return null;
}
