import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as cheerio from "cheerio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface CheckResult {
  name: string;
  passed: boolean;
  detail: string;
}

interface PageData {
  title: string;
  description: string;
  h1Count: number;
  imageCount: number;
  linkCount: number;
  wordCount: number;
  htmlSize: number;
  loadTimeMs: number;
}

interface WebsiteAnalysis {
  url: string;
  performanceScore: number;
  seoScore: number;
  overallScore: number;
  performanceChecks: CheckResult[];
  seoChecks: CheckResult[];
  pageData: PageData;
  error?: string;
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const BodySchema = z.object({
  url: z
    .string()
    .min(1, "URL is required")
    .transform((val) => {
      const trimmed = val.trim();
      if (!/^https?:\/\//i.test(trimmed)) {
        return `https://${trimmed}`;
      }
      return trimmed;
    })
    .refine((val) => {
      try {
        const parsed = new URL(val);
        return !!parsed.hostname && parsed.hostname.includes(".");
      } catch {
        return false;
      }
    }, "Please enter a valid URL (e.g., example.com)"),
});

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function fetchWithTimeout(
  targetUrl: string,
  timeoutMs: number,
  signal?: AbortSignal
): Promise<{ response: Response; html: string; loadTimeMs: number }> {
  return new Promise(async (resolve, reject) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error(`Request timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    // Chain external signal if provided so the 12s overall guard can abort too
    if (signal) {
      if (signal.aborted) controller.abort();
      else signal.addEventListener("abort", () => controller.abort(), { once: true });
    }

    const started = Date.now();
    try {
      const response = await fetch(targetUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; SocialViensDeepScan/1.0; +https://socialviens.com) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        redirect: "follow",
        signal: controller.signal,
      });

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("text/html") && !contentType.includes("application/xhtml")) {
        clearTimeout(timeoutId);
        reject(new Error(`URL did not return HTML (content-type: ${contentType || "unknown"})`));
        return;
      }

      const html = await response.text();
      const loadTimeMs = Date.now() - started;
      clearTimeout(timeoutId);
      resolve({ response, html, loadTimeMs });
    } catch (err) {
      clearTimeout(timeoutId);
      reject(err);
    }
  });
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function clampScore(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

/* ------------------------------------------------------------------ */
/* Main analysis                                                       */
/* ------------------------------------------------------------------ */

async function analyzeWebsite(rawUrl: string, externalSignal?: AbortSignal): Promise<WebsiteAnalysis> {
  const { response, html, loadTimeMs } = await fetchWithTimeout(rawUrl, 10000, externalSignal);

  let $: cheerio.CheerioAPI;
  try {
    $ = cheerio.load(html);
  } catch (err) {
    throw new Error(`Failed to parse HTML with Cheerio: ${(err as Error).message}`);
  }

  const htmlSize = Buffer.byteLength(html, "utf-8");

  /* ---------- Page data ---------- */
  const title = ($("title").first().text() || "").trim();
  const description = ($('meta[name="description"]').attr("content") || "").trim();
  const h1Count = $("h1").length;
  const imageCount = $("img").length;
  const linkCount = $("a[href]").length;
  const bodyText = $("body").text().replace(/\s+/g, " ").trim();
  const wordCount = bodyText ? bodyText.split(" ").filter(Boolean).length : 0;

  const pageData: PageData = {
    title,
    description,
    h1Count,
    imageCount,
    linkCount,
    wordCount,
    htmlSize,
    loadTimeMs,
  };

  /* ---------- Performance checks ---------- */
  const performanceChecks: CheckResult[] = [];

  // 1. GZIP enabled
  const contentEncoding = (response.headers.get("content-encoding") || "").toLowerCase();
  const gzipPassed = ["gzip", "br", "deflate", "zstd"].includes(contentEncoding);
  performanceChecks.push({
    name: "GZIP / Compression Enabled",
    passed: gzipPassed,
    detail: gzipPassed
      ? `Content-Encoding: ${contentEncoding.toUpperCase()} — response is compressed`
      : "No Content-Encoding header detected — uncompressed transfer increases payload size",
  });

  // 2. Cache headers
  const cacheControl = response.headers.get("cache-control");
  const etag = response.headers.get("etag");
  const cachePassed = !!(cacheControl || etag);
  performanceChecks.push({
    name: "Browser Caching Headers",
    passed: cachePassed,
    detail: cachePassed
      ? `Cache-Control: ${cacheControl || "(none)"} | ETag: ${etag ? "present" : "absent"}`
      : "Neither Cache-Control nor ETag header present — returning visitors re-download assets",
  });

  // 3. Image optimization — penalize missing width/height or alt
  const imgs = $("img").toArray();
  let unoptimizedImages = 0;
  let missingAlt = 0;
  for (const img of imgs) {
    const $img = $(img);
    const hasDims = $img.attr("width") && $img.attr("height");
    const hasAlt = $img.attr("alt") !== undefined;
    if (!hasDims) unoptimizedImages++;
    if (!hasAlt) missingAlt++;
  }
  const imageCount_safe = Math.max(imgs.length, 1);
  const imgOptPassed = imgs.length === 0 || unoptimizedImages / imageCount_safe < 0.3;
  performanceChecks.push({
    name: "Image Optimization",
    passed: imgOptPassed,
    detail:
      imgs.length === 0
        ? "No <img> tags found on page"
        : `${unoptimizedImages}/${imgs.length} images missing width/height attributes · ${missingAlt} missing alt text`,
  });

  // 4. Minification — heuristic: large inline <style>/<script> or high char-per-element ratio
  const inlineStyleSize = $("style")
    .toArray()
    .reduce((sum, el) => sum + ($(el).html() || "").length, 0);
  const inlineScriptSize = $("script:not([src])")
    .toArray()
    .reduce((sum, el) => sum + ($(el).html() || "").length, 0);
  const elementCount = $("*").length || 1;
  const charPerElement = htmlSize / elementCount;
  const minificationPassed = inlineStyleSize < 20000 && inlineScriptSize < 50000 && charPerElement < 800;
  performanceChecks.push({
    name: "HTML / Inline Asset Minification",
    passed: minificationPassed,
    detail: `${formatBytes(inlineStyleSize)} inline CSS · ${formatBytes(
      inlineScriptSize
    )} inline JS · ${Math.round(charPerElement)} chars/element`,
  });

  // 5. HTTPS
  let protocol = "http:";
  try {
    protocol = new URL(rawUrl).protocol;
  } catch {
    /* ignore */
  }
  const httpsPassed = protocol === "https:";
  performanceChecks.push({
    name: "HTTPS Secure Protocol",
    passed: httpsPassed,
    detail: httpsPassed
      ? "Page served over HTTPS — encrypted and trusted by browsers"
      : "Page served over HTTP — browsers flag as insecure; ranking penalty",
  });

  // 6. HTML size
  const htmlSizePassed = htmlSize <= 200 * 1024;
  performanceChecks.push({
    name: "Page HTML Size (≤ 200KB)",
    passed: htmlSizePassed,
    detail: `Document size: ${formatBytes(htmlSize)}${
      htmlSizePassed ? " — within recommended range" : " — exceeds 200KB threshold, consider trimming"
    }`,
  });

  // Performance score — weighted: each check contributes, with critical items weighted higher
  const weights = [1.0, 0.8, 1.0, 0.7, 1.2, 1.0];
  let perfWeightSum = 0;
  let perfScore = 0;
  performanceChecks.forEach((c, i) => {
    const w = weights[i] ?? 1;
    perfWeightSum += w;
    if (c.passed) perfScore += w * 100;
  });
  const performanceScore = clampScore(perfScore / perfWeightSum);

  /* ---------- SEO checks (10) ---------- */
  const seoChecks: CheckResult[] = [];

  // 1. Title tag present and length 30-60
  const titleLen = title.length;
  const titlePassed = titleLen >= 30 && titleLen <= 60;
  seoChecks.push({
    name: "Title Tag (30–60 chars)",
    passed: titlePassed,
    detail: titleLen === 0
      ? "Missing <title> tag entirely"
      : `Title length: ${titleLen} chars — ${titlePassed ? "optimal" : titleLen < 30 ? "too short" : "too long"}`,
  });

  // 2. Meta description 120-160
  const descLen = description.length;
  const descPassed = descLen >= 120 && descLen <= 160;
  seoChecks.push({
    name: "Meta Description (120–160 chars)",
    passed: descPassed,
    detail: descLen === 0
      ? "Missing meta description"
      : `Description length: ${descLen} chars — ${descPassed ? "optimal" : descLen < 120 ? "too short" : "too long"}`,
  });

  // 3. Exactly one H1
  const h1Passed = h1Count === 1;
  seoChecks.push({
    name: "Exactly One H1",
    passed: h1Passed,
    detail:
      h1Count === 0
        ? "No H1 found — page lacks primary heading"
        : h1Count === 1
        ? "Exactly one H1 — optimal structure"
        : `${h1Count} H1 tags found — should have exactly one`,
  });

  // 4. H2-H3 hierarchy
  const h2Count = $("h2").length;
  const h3Count = $("h3").length;
  const hierarchyPassed = h2Count >= 1;
  seoChecks.push({
    name: "H2/H3 Heading Hierarchy",
    passed: hierarchyPassed,
    detail: `${h2Count} H2 · ${h3Count} H3 — ${
      hierarchyPassed ? "good content structure" : "add H2 subheadings to break up content"
    }`,
  });

  // 5. Image alt tags >=80% coverage
  const imgsTotal = imgs.length;
  const imgsNoAlt = missingAlt;
  const altCoverage = imgsTotal === 0 ? 1 : (imgsTotal - imgsNoAlt) / imgsTotal;
  const altPassed = altCoverage >= 0.8;
  seoChecks.push({
    name: "Image Alt Text Coverage (≥80%)",
    passed: altPassed,
    detail:
      imgsTotal === 0
        ? "No images on page"
        : `${Math.round(altCoverage * 100)}% of ${imgsTotal} images have alt text (${imgsNoAlt} missing)`,
  });

  // 6. Canonical URL
  const canonical = $('link[rel="canonical"]').attr("href");
  const canonicalPassed = !!canonical;
  seoChecks.push({
    name: "Canonical URL",
    passed: canonicalPassed,
    detail: canonicalPassed ? `Canonical: ${canonical}` : "No <link rel='canonical'> — duplicate content risk",
  });

  // 7. Open Graph tags
  const ogTitle = $('meta[property="og:title"]').attr("content");
  const ogDesc = $('meta[property="og:description"]').attr("content");
  const ogImage = $('meta[property="og:image"]').attr("content");
  const ogTagsPresent = [ogTitle, ogDesc, ogImage].filter(Boolean).length;
  const ogPassed = ogTagsPresent >= 2;
  seoChecks.push({
    name: "Open Graph Tags",
    passed: ogPassed,
    detail: `og:title ${ogTitle ? "✓" : "✗"} · og:description ${ogDesc ? "✓" : "✗"} · og:image ${
      ogImage ? "✓" : "✗"
    } (${ogTagsPresent}/3 present)`,
  });

  // 8. Robots meta not noindex
  const robotsMeta = ($('meta[name="robots"]').attr("content") || "").toLowerCase();
  const robotsPassed = !robotsMeta.includes("noindex");
  seoChecks.push({
    name: "Robots Meta (Indexable)",
    passed: robotsPassed,
    detail: robotsPassed
      ? robotsMeta ? `robots: ${robotsMeta}` : "No robots meta — page is indexable by default"
      : `robots: ${robotsMeta} — page is blocked from indexing`,
  });

  // 9. Viewport meta
  const viewport = $('meta[name="viewport"]').attr("content");
  const viewportPassed = !!viewport;
  seoChecks.push({
    name: "Viewport Meta Tag",
    passed: viewportPassed,
    detail: viewportPassed ? `viewport: ${viewport}` : "Missing viewport meta — mobile ranking penalty",
  });

  // 10. Structured data (JSON-LD)
  const jsonLdCount = $('script[type="application/ld+json"]').length;
  const jsonLdPassed = jsonLdCount >= 1;
  seoChecks.push({
    name: "Structured Data (JSON-LD)",
    passed: jsonLdPassed,
    detail: jsonLdPassed
      ? `${jsonLdCount} JSON-LD block(s) detected — rich results eligible`
      : "No <script type='application/ld+json'> — missing schema markup",
  });

  const seoPassedCount = seoChecks.filter((c) => c.passed).length;
  const seoScore = clampScore((seoPassedCount / seoChecks.length) * 100);

  /* ---------- Overall (weighted) ---------- */
  const overallScore = clampScore(performanceScore * 0.45 + seoScore * 0.55);

  return {
    url: rawUrl,
    performanceScore,
    seoScore,
    overallScore,
    performanceChecks,
    seoChecks,
    pageData,
  };
}

/* ------------------------------------------------------------------ */
/* POST handler                                                        */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  // Overall 12s timeout guard — never let one request hang the server
  const overallController = new AbortController();
  const overallTimeout = setTimeout(() => overallController.abort(), 12000);

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = BodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message || "Invalid URL",
        },
        { status: 400 }
      );
    }

    const targetUrl = parsed.data.url;

    try {
      const result = await analyzeWebsite(targetUrl, overallController.signal);
      return NextResponse.json(result, { status: 200 });
    } catch (fetchErr) {
      const message = fetchErr instanceof Error ? fetchErr.message : "Unknown fetch error";
      // Return 200 with error payload so frontend can show friendly message
      return NextResponse.json(
        {
          url: targetUrl,
          performanceScore: 0,
          seoScore: 0,
          overallScore: 0,
          performanceChecks: [],
          seoChecks: [],
          pageData: {
            title: "",
            description: "",
            h1Count: 0,
            imageCount: 0,
            linkCount: 0,
            wordCount: 0,
            htmlSize: 0,
            loadTimeMs: 0,
          },
          error: `Could not fetch URL — ${message}`,
        },
        { status: 200 }
      );
    }
  } finally {
    clearTimeout(overallTimeout);
  }
}
