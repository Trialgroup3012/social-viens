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

interface KeywordLocations {
  title: boolean;
  description: boolean;
  h1: boolean;
  headings: boolean;
  content: boolean;
  firstParagraph: boolean;
  url: boolean;
}

interface KeywordAnalysis {
  keyword: string;
  found: boolean;
  locations: KeywordLocations;
  density: number;
}

interface PageData {
  title: string;
  description: string;
  wordCount: number;
  imageCount: number;
  linkCount: number;
  loadTimeMs: number;
  h1Text: string;
  urlLength: number;
}

interface SeoAnalysis {
  url: string;
  keyword: string;
  seoScore: number;
  visibilityScore: number;
  keywordAnalysis: KeywordAnalysis;
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
  keyword: z
    .string()
    .min(2, "Keyword must be at least 2 characters")
    .max(100, "Keyword is too long")
    .transform((val) => val.trim()),
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

function clampScore(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function containsKeyword(haystack: string, needle: string): boolean {
  if (!needle) return false;
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

function wordCount(text: string): number {
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

/* ------------------------------------------------------------------ */
/* Main analysis                                                       */
/* ------------------------------------------------------------------ */

async function analyzeSeo(rawUrl: string, keyword: string, externalSignal?: AbortSignal): Promise<SeoAnalysis> {
  const { html, loadTimeMs } = await fetchWithTimeout(rawUrl, 10000, externalSignal);

  let $: cheerio.CheerioAPI;
  try {
    $ = cheerio.load(html);
  } catch (err) {
    throw new Error(`Failed to parse HTML with Cheerio: ${(err as Error).message}`);
  }

  /* ---------- Page data ---------- */
  const title = ($("title").first().text() || "").trim();
  const description = ($('meta[name="description"]').attr("content") || "").trim();
  const h1Text = ($("h1").first().text() || "").trim();
  const imageCount = $("img").length;
  const linkCount = $("a[href]").length;
  const bodyText = $("body").text().replace(/\s+/g, " ").trim();
  const wc = wordCount(bodyText);

  let urlPath = "";
  let urlLength = 0;
  try {
    const u = new URL(rawUrl);
    urlPath = u.pathname + u.search;
    urlLength = rawUrl.length;
  } catch {
    urlLength = rawUrl.length;
  }

  const pageData: PageData = {
    title,
    description,
    wordCount: wc,
    imageCount,
    linkCount,
    loadTimeMs,
    h1Text,
    urlLength,
  };

  /* ---------- Keyword analysis ---------- */
  const headingsText = $("h2, h3, h4").text();
  const firstParagraph = $("p").first().text().trim();
  const first100Words = bodyText.split(/\s+/).slice(0, 100).join(" ");

  const loc: KeywordLocations = {
    title: containsKeyword(title, keyword),
    description: containsKeyword(description, keyword),
    h1: containsKeyword(h1Text, keyword),
    headings: containsKeyword(headingsText, keyword),
    content: containsKeyword(bodyText, keyword),
    firstParagraph: containsKeyword(firstParagraph || first100Words, keyword),
    url: containsKeyword(decodeURIComponent(urlPath || rawUrl), keyword),
  };

  const locationsFound = Object.values(loc).filter(Boolean).length;
  const keywordFound = locationsFound > 0;

  // Density: occurrences per 100 words
  let occurrences = 0;
  if (keyword) {
    const lcBody = bodyText.toLowerCase();
    const lcKw = keyword.toLowerCase();
    let idx = lcBody.indexOf(lcKw);
    while (idx !== -1) {
      occurrences++;
      idx = lcBody.indexOf(lcKw, idx + lcKw.length);
    }
  }
  const density = wc > 0 ? (occurrences / wc) * 100 : 0;

  const keywordAnalysis: KeywordAnalysis = {
    keyword,
    found: keywordFound,
    locations: loc,
    density: Math.round(density * 100) / 100,
  };

  /* ---------- SEO checks (15) ---------- */
  const seoChecks: CheckResult[] = [];

  // 1. Title length
  const titleLen = title.length;
  const titlePassed = titleLen >= 30 && titleLen <= 60;
  seoChecks.push({
    name: "Title Length (30–60 chars)",
    passed: titlePassed,
    detail: titleLen === 0 ? "Missing title" : `${titleLen} chars — ${titlePassed ? "optimal" : titleLen < 30 ? "too short" : "too long"}`,
  });

  // 2. Description length
  const descLen = description.length;
  const descPassed = descLen >= 120 && descLen <= 160;
  seoChecks.push({
    name: "Meta Description Length (120–160 chars)",
    passed: descPassed,
    detail: descLen === 0 ? "Missing description" : `${descLen} chars — ${descPassed ? "optimal" : descLen < 120 ? "too short" : "too long"}`,
  });

  // 3. H1 count
  const h1Count = $("h1").length;
  const h1Passed = h1Count === 1;
  seoChecks.push({
    name: "Exactly One H1",
    passed: h1Passed,
    detail: h1Count === 0 ? "No H1 found" : h1Count === 1 ? "One H1 — optimal" : `${h1Count} H1s — should be exactly 1`,
  });

  // 4. H2 presence
  const h2Count = $("h2").length;
  const h2Passed = h2Count >= 1;
  seoChecks.push({
    name: "H2 Subheadings Present",
    passed: h2Passed,
    detail: `${h2Count} H2 tags — ${h2Passed ? "good structure" : "no subheadings"}`,
  });

  // 5. Keyword in title
  seoChecks.push({
    name: "Keyword in Title",
    passed: loc.title,
    detail: loc.title ? `Found "${keyword}" in title` : `"${keyword}" not present in title tag`,
  });

  // 6. Keyword in description
  seoChecks.push({
    name: "Keyword in Meta Description",
    passed: loc.description,
    detail: loc.description ? `Found "${keyword}" in description` : `"${keyword}" not in description`,
  });

  // 7. Keyword in H1
  seoChecks.push({
    name: "Keyword in H1",
    passed: loc.h1,
    detail: loc.h1 ? `Found "${keyword}" in H1` : h1Count === 0 ? "No H1 to check" : `"${keyword}" not in H1`,
  });

  // 8. Keyword in content
  seoChecks.push({
    name: "Keyword in Body Content",
    passed: loc.content,
    detail: loc.content ? `${occurrences} occurrence(s), ${keywordAnalysis.density}% density` : `"${keyword}" not found in body`,
  });

  // 9. Image alt coverage
  const imgs = $("img").toArray();
  const imgsNoAlt = imgs.filter((img) => $(img).attr("alt") === undefined).length;
  const altCoverage = imgs.length === 0 ? 1 : (imgs.length - imgsNoAlt) / imgs.length;
  const altPassed = altCoverage >= 0.8;
  seoChecks.push({
    name: "Image Alt Text Coverage (≥80%)",
    passed: altPassed,
    detail: imgs.length === 0 ? "No images" : `${Math.round(altCoverage * 100)}% (${imgs.length - imgsNoAlt}/${imgs.length})`,
  });

  // 10. Canonical
  const canonical = $('link[rel="canonical"]').attr("href");
  const canonicalPassed = !!canonical;
  seoChecks.push({
    name: "Canonical URL",
    passed: canonicalPassed,
    detail: canonicalPassed ? `Canonical: ${canonical}` : "Missing canonical tag",
  });

  // 11. Open Graph
  const ogTags = [
    $('meta[property="og:title"]').attr("content"),
    $('meta[property="og:description"]').attr("content"),
    $('meta[property="og:image"]').attr("content"),
  ].filter(Boolean).length;
  const ogPassed = ogTags >= 2;
  seoChecks.push({
    name: "Open Graph Tags",
    passed: ogPassed,
    detail: `${ogTags}/3 OG tags present`,
  });

  // 12. Structured data (JSON-LD)
  const jsonLdCount = $('script[type="application/ld+json"]').length;
  const jsonLdPassed = jsonLdCount >= 1;
  seoChecks.push({
    name: "Structured Data (JSON-LD)",
    passed: jsonLdPassed,
    detail: jsonLdPassed ? `${jsonLdCount} JSON-LD block(s)` : "No schema markup",
  });

  // 13. Viewport
  const viewport = $('meta[name="viewport"]').attr("content");
  const viewportPassed = !!viewport;
  seoChecks.push({
    name: "Viewport Meta Tag",
    passed: viewportPassed,
    detail: viewportPassed ? "Present" : "Missing — mobile penalty",
  });

  // 14. HTTPS
  let protocol = "http:";
  try {
    protocol = new URL(rawUrl).protocol;
  } catch {
    /* ignore */
  }
  const httpsPassed = protocol === "https:";
  seoChecks.push({
    name: "HTTPS Secure Protocol",
    passed: httpsPassed,
    detail: httpsPassed ? "Served over HTTPS" : "HTTP — insecure",
  });

  // 15. URL length / readability
  const urlReadable = urlLength <= 75 && !/[A-Z]/.test(urlPath) && !urlPath.includes("?");
  seoChecks.push({
    name: "URL is Short & Readable",
    passed: urlReadable,
    detail: `${urlLength} chars — ${urlReadable ? "clean URL" : urlLength > 75 ? "URL too long" : "consider lowercase / no query string"}`,
  });

  const passedCount = seoChecks.filter((c) => c.passed).length;
  const seoScore = clampScore((passedCount / seoChecks.length) * 100);

  /* ---------- Visibility score (keyword-weighted) ---------- */
  // Visibility = how well the keyword is positioned + base SEO foundation
  const keywordWeight = 0.55;
  const baseWeight = 0.45;
  const keywordVisibility = (locationsFound / 7) * 100;
  const visibilityScore = clampScore(
    keywordVisibility * keywordWeight + seoScore * baseWeight
  );

  return {
    url: rawUrl,
    keyword,
    seoScore,
    visibilityScore,
    keywordAnalysis,
    seoChecks,
    pageData,
  };
}

/* ------------------------------------------------------------------ */
/* POST handler                                                        */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
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
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { url: targetUrl, keyword } = parsed.data;

    try {
      const result = await analyzeSeo(targetUrl, keyword, overallController.signal);
      return NextResponse.json(result, { status: 200 });
    } catch (fetchErr) {
      const message = fetchErr instanceof Error ? fetchErr.message : "Unknown fetch error";
      return NextResponse.json(
        {
          url: targetUrl,
          keyword,
          seoScore: 0,
          visibilityScore: 0,
          keywordAnalysis: {
            keyword,
            found: false,
            locations: {
              title: false,
              description: false,
              h1: false,
              headings: false,
              content: false,
              firstParagraph: false,
              url: false,
            },
            density: 0,
          },
          seoChecks: [],
          pageData: {
            title: "",
            description: "",
            wordCount: 0,
            imageCount: 0,
            linkCount: 0,
            loadTimeMs: 0,
            h1Text: "",
            urlLength: targetUrl.length,
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
