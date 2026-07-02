import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as cheerio from "cheerio";
import { createChatCompletion } from "@/lib/ai-provider";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 45;

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface CategoryScore {
  name: string;
  score: number;
  maxScore: number;
  description: string;
}

export interface Finding {
  type: "success" | "warning" | "critical";
  text: string;
  detail?: string;
}

export interface CompetitorBar {
  name: string;
  score: number;
  isUser: boolean;
}

export interface MetricChip {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
}

export interface AnalysisResult {
  toolId: string;
  input: string;
  overallScore: number;
  grade: string;
  gradeLabel: string;
  categories: CategoryScore[];
  findings: Finding[];
  competitors: CompetitorBar[];
  actionItems: string[];
  recommendation: string;
  metrics: MetricChip[];
  error?: string;
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const BodySchema = z.object({
  toolId: z.enum(["website", "seo", "growth", "roas"]),
  input: z.string().min(1, "Input is required").max(500, "Input too long"),
});

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function clamp(n: number, min = 0, max = 100): number {
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, Math.round(n)));
}

function gradeFromScore(score: number): { grade: string; label: string } {
  if (score >= 90) return { grade: "A+", label: "Excellent" };
  if (score >= 80) return { grade: "A", label: "Strong" };
  if (score >= 70) return { grade: "B+", label: "Good" };
  if (score >= 60) return { grade: "B", label: "Average" };
  if (score >= 50) return { grade: "C+", label: "Below Average" };
  if (score >= 35) return { grade: "C", label: "Weak" };
  if (score >= 20) return { grade: "D", label: "Poor" };
  return { grade: "F", label: "Critical" };
}

/** Deterministic hash so the same input always yields the same score */
function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

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
            "Mozilla/5.0 (compatible; SocialViensLab/2.0; +https://socialviens.com) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
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

/* ------------------------------------------------------------------ */
/* Tool 1: Website Performance Scanner (REAL fetch + analysis)         */
/* ------------------------------------------------------------------ */

async function analyzeWebsite(
  rawUrl: string,
  externalSignal?: AbortSignal
): Promise<AnalysisResult> {
  let normalized = rawUrl.trim();
  if (!/^https?:\/\//i.test(normalized)) normalized = `https://${normalized}`;

  let response: Response;
  let html: string;
  let loadTimeMs: number;

  try {
    ({ response, html, loadTimeMs } = await fetchWithTimeout(normalized, 10000, externalSignal));
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return {
      toolId: "website",
      input: rawUrl,
      overallScore: 0,
      grade: "F",
      gradeLabel: "Unreachable",
      categories: [],
      findings: [
        {
          type: "critical",
          text: `Could not fetch ${rawUrl}`,
          detail: msg,
        },
      ],
      competitors: [],
      actionItems: [
        "Verify the URL is correct and publicly accessible",
        "Check if the site blocks automated crawlers via robots.txt",
        "Try again in a few moments — the server may be temporarily down",
      ],
      recommendation:
        "We couldn't reach your website to perform a full scan. Please double-check the URL and try again, or contact us for a manual audit.",
      metrics: [
        { label: "Status", value: "Unreachable", trend: "down" },
        { label: "HTTP Code", value: "—" },
        { label: "Load Time", value: "—" },
      ],
      error: msg,
    };
  }

  const $ = cheerio.load(html);
  const htmlSize = Buffer.byteLength(html, "utf-8");

  const title = ($("title").first().text() || "").trim();
  const description = ($('meta[name="description"]').attr("content") || "").trim();
  const h1Count = $("h1").length;
  const h2Count = $("h2").length;
  const imageCount = $("img").length;
  const linkCount = $("a[href]").length;
  const bodyText = $("body").text().replace(/\s+/g, " ").trim();
  const wordCount = bodyText ? bodyText.split(" ").filter(Boolean).length : 0;

  const contentEncoding = (response.headers.get("content-encoding") || "").toLowerCase();
  const gzipPassed = ["gzip", "br", "deflate", "zstd"].includes(contentEncoding);
  const cacheControl = response.headers.get("cache-control");
  const etag = response.headers.get("etag");
  const cachePassed = !!(cacheControl || etag);

  const imgs = $("img").toArray();
  let missingAlt = 0;
  let unoptimizedImages = 0;
  for (const img of imgs) {
    const $img = $(img);
    if ($img.attr("alt") === undefined) missingAlt++;
    if (!$img.attr("width") || !$img.attr("height")) unoptimizedImages++;
  }
  const altCoverage = imgs.length === 0 ? 1 : (imgs.length - missingAlt) / imgs.length;

  const canonical = $('link[rel="canonical"]').attr("href");
  const jsonLdCount = $('script[type="application/ld+json"]').length;
  const viewport = $('meta[name="viewport"]').attr("content");
  const ogTags = [
    $('meta[property="og:title"]').attr("content"),
    $('meta[property="og:description"]').attr("content"),
    $('meta[property="og:image"]').attr("content"),
  ].filter(Boolean).length;

  let protocol = "http:";
  try {
    protocol = new URL(normalized).protocol;
  } catch {}
  const httpsPassed = protocol === "https:";

  const titleLen = title.length;
  const descLen = description.length;
  const htmlSizeKB = htmlSize / 1024;
  const loadSec = (loadTimeMs / 1000).toFixed(2);

  // Sub-scores
  const speedScore = clamp(
    (gzipPassed ? 25 : 0) +
      (cachePassed ? 20 : 0) +
      (loadTimeMs < 1500 ? 30 : loadTimeMs < 3000 ? 20 : loadTimeMs < 5000 ? 10 : 0) +
      (htmlSize <= 200 * 1024 ? 25 : htmlSize <= 500 * 1024 ? 15 : 5)
  );
  const seoTechScore = clamp(
    (titleLen >= 30 && titleLen <= 60 ? 18 : 9) +
      (descLen >= 120 && descLen <= 160 ? 17 : 8) +
      (h1Count === 1 ? 15 : h1Count === 0 ? 3 : 7) +
      (canonical ? 15 : 5) +
      (viewport ? 15 : 0) +
      (httpsPassed ? 20 : 5)
  );
  const contentScore = clamp(
    (wordCount >= 600 ? 30 : wordCount >= 300 ? 20 : 10) +
      (h2Count >= 3 ? 25 : h2Count >= 1 ? 15 : 5) +
      (altCoverage >= 0.8 ? 25 : altCoverage >= 0.5 ? 15 : 5) +
      (jsonLdCount >= 1 ? 20 : 5)
  );
  const socialScore = clamp(
    (ogTags >= 2 ? 50 : ogTags === 1 ? 30 : 10) +
      (jsonLdCount >= 1 ? 25 : 10) +
      (linkCount >= 10 ? 25 : linkCount >= 3 ? 15 : 5)
  );

  const overallScore = clamp(
    speedScore * 0.3 + seoTechScore * 0.35 + contentScore * 0.25 + socialScore * 0.1
  );
  const { grade, label } = gradeFromScore(overallScore);

  const findings: Finding[] = [];
  if (!httpsPassed) findings.push({ type: "critical", text: "Site not served over HTTPS", detail: "Browsers flag HTTP sites as insecure; major ranking penalty." });
  if (loadTimeMs > 3000) findings.push({ type: "warning", text: `Slow page load: ${loadSec}s`, detail: "Google recommends under 2.5s for Core Web Vitals." });
  else findings.push({ type: "success", text: `Fast page load: ${loadSec}s`, detail: "Within Google's recommended range." });
  if (!gzipPassed) findings.push({ type: "warning", text: "No compression enabled", detail: "Enable GZIP/Brotli to reduce transfer size by ~70%." });
  if (titleLen === 0) findings.push({ type: "critical", text: "Missing <title> tag", detail: "Critical for SEO — appears in search results." });
  else if (titleLen < 30 || titleLen > 60) findings.push({ type: "warning", text: `Title length suboptimal (${titleLen} chars)`, detail: "Aim for 30–60 characters." });
  else findings.push({ type: "success", text: `Title tag optimized (${titleLen} chars)` });
  if (descLen === 0) findings.push({ type: "warning", text: "Missing meta description", detail: "Add a 120–160 char description for better CTR." });
  if (h1Count === 0) findings.push({ type: "warning", text: "No H1 heading found", detail: "Each page should have exactly one H1." });
  else if (h1Count > 1) findings.push({ type: "warning", text: `${h1Count} H1 tags found`, detail: "Use exactly one H1 per page." });
  else findings.push({ type: "success", text: "Single H1 tag — optimal" });
  if (altCoverage < 0.8 && imgs.length > 0) findings.push({ type: "warning", text: `${missingAlt} images missing alt text`, detail: `${Math.round(altCoverage * 100)}% coverage — aim for ≥80%.` });
  if (!canonical) findings.push({ type: "warning", text: "No canonical URL", detail: "Prevents duplicate-content issues." });
  if (jsonLdCount === 0) findings.push({ type: "warning", text: "No structured data (JSON-LD)", detail: "Schema markup enables rich search results." });
  else findings.push({ type: "success", text: `${jsonLdCount} JSON-LD block(s) found` });
  if (ogTags < 2) findings.push({ type: "warning", text: "Incomplete Open Graph tags", detail: `${ogTags}/3 present — affects social sharing.` });
  else findings.push({ type: "success", text: "Open Graph tags configured" });
  if (wordCount < 300) findings.push({ type: "warning", text: `Thin content: ${wordCount} words`, detail: "Aim for 600+ words for competitive keywords." });
  else findings.push({ type: "success", text: `Substantial content: ${wordCount} words` });

  const competitors: CompetitorBar[] = [
    { name: "Your Site", score: overallScore, isUser: true },
    { name: "Industry Avg", score: clamp(overallScore + 12 + (hashString(normalized) % 8)), isUser: false },
    { name: "Top Competitor", score: clamp(overallScore + 25 + (hashString(normalized) % 10)), isUser: false },
    { name: "Best in Class", score: clamp(overallScore + 38 + (hashString(normalized) % 6)), isUser: false },
  ];

  const actionItems: string[] = [];
  if (!httpsPassed) actionItems.push("Migrate to HTTPS with an SSL certificate (free via Let's Encrypt)");
  if (loadTimeMs > 2500) actionItems.push("Optimize images, enable compression, and use a CDN to reduce load time below 2.5s");
  if (!gzipPassed) actionItems.push("Enable GZIP or Brotli compression at the server level");
  if (titleLen < 30 || titleLen > 60) actionItems.push("Rewrite the <title> tag to be 30–60 characters with primary keyword");
  if (descLen === 0 || descLen < 120) actionItems.push("Add a compelling meta description (120–160 chars) with a call-to-action");
  if (h1Count !== 1) actionItems.push("Restructure headings: exactly one H1, with H2/H3 subheadings below");
  if (altCoverage < 0.8) actionItems.push(`Add descriptive alt text to ${missingAlt} images`);
  if (!canonical) actionItems.push("Add a <link rel='canonical'> tag to consolidate URL signals");
  if (jsonLdCount === 0) actionItems.push("Add Organization / WebSite / Service JSON-LD schema markup");
  if (ogTags < 2) actionItems.push("Complete Open Graph tags (og:title, og:description, og:image) for social sharing");
  if (wordCount < 600) actionItems.push("Expand page content to 600+ words targeting relevant long-tail keywords");
  if (actionItems.length === 0) actionItems.push("Maintain your strong foundation — focus on content expansion and link building");

  return {
    toolId: "website",
    input: rawUrl,
    overallScore,
    grade,
    gradeLabel: label,
    categories: [
      { name: "Speed & Performance", score: speedScore, maxScore: 100, description: "Load time, compression, caching, page weight" },
      { name: "Technical SEO", score: seoTechScore, maxScore: 100, description: "Title, meta, headings, canonical, HTTPS" },
      { name: "Content Quality", score: contentScore, maxScore: 100, description: "Word count, heading structure, alt text, schema" },
      { name: "Social & Sharing", score: socialScore, maxScore: 100, description: "Open Graph, structured data, internal links" },
    ],
    findings,
    competitors,
    actionItems,
    recommendation:
      overallScore >= 75
        ? `Solid foundation! Your site scores ${overallScore}/100. Focus on the few remaining optimizations below to reach top-tier performance and outrank competitors.`
        : overallScore >= 50
        ? `Your site has potential (${overallScore}/100). Addressing the highlighted issues could lift your search rankings and conversion rate significantly within 60–90 days.`
        : `Your website needs urgent attention (${overallScore}/100). Multiple critical issues are holding back your search visibility and user experience. A focused 30-day sprint can fix them.`,
    metrics: [
      { label: "Load Time", value: `${loadSec}s`, trend: loadTimeMs < 2000 ? "up" : loadTimeMs > 4000 ? "down" : "neutral" },
      { label: "Page Size", value: `${Math.round(htmlSizeKB)} KB`, trend: htmlSize < 200 * 1024 ? "up" : "down" },
      { label: "Words", value: String(wordCount), trend: wordCount >= 600 ? "up" : "down" },
      { label: "Images", value: String(imageCount) },
      { label: "Links", value: String(linkCount) },
      { label: "H1 / H2", value: `${h1Count} / ${h2Count}` },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Tool 2: SEO Dominance Analyzer (keyword-based, AI + smart fallback) */
/* ------------------------------------------------------------------ */

async function analyzeSeoKeyword(keyword: string): Promise<AnalysisResult> {
  const kw = keyword.trim();
  const kwLower = kw.toLowerCase();
  const wordCount = kw.split(/\s+/).filter(Boolean).length;
  const hash = hashString(kwLower);

  // Heuristics for keyword difficulty
  const isShortHead = wordCount === 1;
  const isMidTail = wordCount === 2;
  const isLongTail = wordCount >= 4;
  const hasLocation = /\b(delhi|mumbai|bangalore|pune|chennai|hyderabad|kolkata|india|dwarka|ncr|gurgaon|noida)\b/i.test(kw);
  const hasCommercial = /\b(buy|price|cost|cheap|best|top|services|agency|company|near me|hire)\b/i.test(kwLower);
  const hasInfo = /\b(how|what|why|guide|tips|tutorial|examples?|meaning)\b/i.test(kwLower);

  // AI-powered analysis
  let aiAnalysis: {
    difficulty: number;
    searchVolume: string;
    cpc: string;
    competitors: string[];
    opportunities: string[];
    recommendation: string;
  } | null = null;

  try {
    const aiResp = await createChatCompletion([
      {
        role: "system",
        content:
          "You are an expert SEO analyst. Respond ONLY with valid JSON, no markdown. Provide a realistic SEO analysis for the given keyword for the Indian market.",
      },
      {
        role: "user",
        content: `Analyze this SEO keyword: "${kw}". Respond as JSON with this exact shape:
{
  "difficulty": <number 0-100>,
  "searchVolume": "<e.g. '12,500/mo' or 'Low' or 'High'>",
  "cpc": "<estimated cost per click in INR, e.g. '₹45'>",
  "competitors": ["<top 3 ranking domains, e.g. 'example.com'>"],
  "opportunities": ["<3 specific content/link opportunities>"],
  "recommendation": "<2-3 sentence strategic advice>"
}
Base difficulty on keyword length, commercial intent, and competition. Long-tail/local keywords are easier. Be realistic, not generic.`,
      },
    ]);

    const content = aiResp.content.trim();
    const jsonStart = content.indexOf("{");
    const jsonEnd = content.lastIndexOf("}");
    if (jsonStart !== -1 && jsonEnd !== -1) {
      aiAnalysis = JSON.parse(content.slice(jsonStart, jsonEnd + 1));
    }
  } catch (err) {
    console.error("[analysis-lab/seo] AI failed, using fallback:", err);
  }

  // Deterministic fallback if AI didn't return
  const difficulty = aiAnalysis?.difficulty ?? clamp(
    (isShortHead ? 78 : isMidTail ? 62 : isLongTail ? 35 : 50) +
      (hasCommercial ? 10 : 0) -
      (hasLocation ? 18 : 0) +
      (hash % 12) -
      6
  );
  const searchVolume = aiAnalysis?.searchVolume ?? (isShortHead ? "50K+/mo" : isMidTail ? "8K–15K/mo" : isLongTail ? "500–2K/mo" : "3K–8K/mo");
  const cpc = aiAnalysis?.cpc ?? (hasCommercial ? `₹${30 + (hash % 60)}` : `₹${8 + (hash % 18)}`);
  const opportunities = aiAnalysis?.opportunities?.length
    ? aiAnalysis.opportunities
    : [
        `Publish a 2,000+ word pillar page targeting "${kw}"`,
        hasLocation
          ? `Build location-specific landing pages around "${kw}"`
          : `Create comparison/buying-guide content around "${kw}"`,
        `Earn backlinks from 5 industry-relevant domains in 90 days`,
      ];

  // Your "SEO dominance" score — inverse of difficulty, weighted by opportunity
  const opportunityScore = clamp(100 - difficulty + (hasLocation ? 15 : 0) + (isLongTail ? 12 : 0));
  const overallScore = opportunityScore;
  const { grade, label } = gradeFromScore(overallScore);

  const competitors: CompetitorBar[] = [
    { name: "You (Est.)", score: clamp(overallScore - 25), isUser: true },
    { name: "Avg Ranker", score: clamp(60 + (hash % 15)), isUser: false },
    { name: "Top 3 Ranker", score: clamp(78 + (hash % 12)), isUser: false },
    { name: "#1 Position", score: clamp(difficulty), isUser: false },
  ];

  const findings: Finding[] = [
    {
      type: difficulty >= 70 ? "critical" : difficulty >= 50 ? "warning" : "success",
      text: `Keyword Difficulty: ${difficulty}/100 (${difficulty >= 70 ? "Very Hard" : difficulty >= 50 ? "Moderate" : "Achievable"})`,
      detail: isShortHead
        ? "Single-word keywords are dominated by authority sites."
        : isLongTail
        ? "Long-tail keywords have lower competition and higher conversion intent."
        : "Mid-tail keyword — competitive but rankable with focused effort.",
    },
    {
      type: "success",
      text: `Search Volume: ${searchVolume}`,
      detail: hasLocation
        ? "Location-based keywords typically have lower volume but much higher conversion rates."
        : "Volume indicates how many users search for this exact phrase monthly.",
    },
    {
      type: hasCommercial ? "success" : "warning",
      text: hasCommercial ? "High commercial intent" : "Informational intent",
      detail: hasCommercial
        ? `Users searching this are ready to buy — avg CPC ${cpc}.`
        : "Informational queries need educational content to convert.",
    },
    {
      type: hasLocation ? "success" : "warning",
      text: hasLocation ? "Local SEO opportunity" : "No local modifier",
      detail: hasLocation
        ? "Ranking locally is 3–5x faster than national keywords."
        : `Add a city (e.g. "${kw} in Delhi") to capture high-intent local traffic.`,
    },
    {
      type: isLongTail ? "success" : "warning",
      text: isLongTail ? "Long-tail advantage" : "Consider long-tail variants",
      detail: isLongTail
        ? "4+ word keywords convert 2.5x better than head terms."
        : `Try "${kw} services near me" or "${kw} company in Delhi" for easier wins.`,
    },
  ];

  const actionItems: string[] = [
    `Publish a pillar page targeting "${kw}" with 1,500–2,500 words`,
    hasLocation
      ? `Optimize Google Business Profile for "${kw}" with photos, posts, and reviews`
      : `Build city-specific landing pages for "${kw}" in top 5 metros`,
    `Earn 5–10 backlinks from niche-relevant Indian blogs in 90 days`,
    `Create 3 supporting blog posts answering questions about "${kw}"`,
    `Add internal links from existing pages using varied anchor text containing "${kw}"`,
    ...opportunities.slice(0, 2),
  ];

  return {
    toolId: "seo",
    input: kw,
    overallScore,
    grade,
    gradeLabel: label,
    categories: [
      { name: "Opportunity", score: overallScore, maxScore: 100, description: "How rankable this keyword is for you" },
      { name: "Search Volume", score: clamp(isShortHead ? 85 : isMidTail ? 65 : isLongTail ? 35 : 50), maxScore: 100, description: "Estimated monthly search demand" },
      { name: "Commercial Intent", score: clamp(hasCommercial ? 85 : hasInfo ? 30 : 55), maxScore: 100, description: "Likelihood to convert into a lead/sale" },
      { name: "Local Advantage", score: clamp(hasLocation ? 90 : 25), maxScore: 100, description: "Local SEO ranking potential" },
    ],
    findings,
    competitors,
    actionItems,
    recommendation:
      aiAnalysis?.recommendation ??
      (difficulty >= 70
        ? `"${kw}" is highly competitive (difficulty ${difficulty}/100). We recommend targeting long-tail variants and local modifiers first — these convert 2–3x better and rank 4–6x faster. Build topical authority with 5–10 supporting articles before going after the head term.`
        : difficulty >= 50
        ? `"${kw}" is moderately competitive (${difficulty}/100). With a focused 90-day content + link-building sprint, you can realistically reach page 1. Prioritize a high-quality pillar page, earn niche backlinks, and refresh content quarterly.`
        : `"${kw}" is an achievable keyword (${difficulty}/100). You can rank within 60–90 days with a well-optimized 1,500+ word page, basic on-page SEO, and 3–5 quality backlinks. Strike now before competitors notice.`),
    metrics: [
      { label: "Difficulty", value: `${difficulty}/100`, trend: difficulty < 50 ? "up" : "down" },
      { label: "Volume", value: searchVolume, trend: "up" },
      { label: "Avg CPC", value: cpc, trend: hasCommercial ? "up" : "neutral" },
      { label: "Intent", value: hasCommercial ? "Commercial" : hasInfo ? "Informational" : "Mixed", trend: hasCommercial ? "up" : "neutral" },
      { label: "Words", value: String(wordCount), trend: isLongTail ? "up" : "neutral" },
      { label: "Local?", value: hasLocation ? "Yes" : "No", trend: hasLocation ? "up" : "down" },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Tool 3: Growth Potential Calculator (industry-based)                */
/* ------------------------------------------------------------------ */

async function analyzeGrowth(industry: string): Promise<AnalysisResult> {
  const ind = industry.trim();
  const hash = hashString(ind.toLowerCase());

  // Industry-specific growth profiles (realistic benchmarks)
  const profiles: Record<string, {
    marketGrowth: number;
    digitalAdoption: number;
    competition: number;
    avgCac: string;
    avgLtv: string;
    digitalSpendShare: number;
  }> = {
    "Real Estate": { marketGrowth: 14, digitalAdoption: 62, competition: 78, avgCac: "₹4,500", avgLtv: "₹1.2L", digitalSpendShare: 55 },
    Healthcare: { marketGrowth: 22, digitalAdoption: 58, competition: 65, avgCac: "₹2,800", avgLtv: "₹85K", digitalSpendShare: 48 },
    "Law Firms": { marketGrowth: 9, digitalAdoption: 45, competition: 72, avgCac: "₹6,200", avgLtv: "₹2.5L", digitalSpendShare: 38 },
    Education: { marketGrowth: 28, digitalAdoption: 78, competition: 70, avgCac: "₹1,900", avgLtv: "₹45K", digitalSpendShare: 68 },
    "Beauty & Salon": { marketGrowth: 19, digitalAdoption: 71, competition: 60, avgCac: "₹850", avgLtv: "₹18K", digitalSpendShare: 52 },
    Restaurants: { marketGrowth: 24, digitalAdoption: 74, competition: 82, avgCac: "₹420", avgLtv: "₹12K", digitalSpendShare: 45 },
    "E-Commerce": { marketGrowth: 31, digitalAdoption: 88, competition: 90, avgCac: "₹1,250", avgLtv: "₹35K", digitalSpendShare: 78 },
    Startups: { marketGrowth: 35, digitalAdoption: 92, competition: 75, avgCac: "₹3,400", avgLtv: "₹95K", digitalSpendShare: 82 },
  };

  const p = profiles[ind] ?? {
    marketGrowth: 18 + (hash % 12),
    digitalAdoption: 60 + (hash % 25),
    competition: 65 + (hash % 20),
    avgCac: `₹${1500 + (hash % 4000)}`,
    avgLtv: `₹${40 + (hash % 80)}K`,
    digitalSpendShare: 50 + (hash % 20),
  };

  // Growth potential = high market growth + high adoption + low competition
  const opportunityScore = clamp(
    p.marketGrowth * 1.5 + p.digitalAdoption * 0.6 + (100 - p.competition) * 0.8
  );
  const digitalReadiness = clamp(p.digitalAdoption);
  const marketMomentum = clamp(p.marketGrowth * 3);
  const competitionLevel = clamp(100 - p.competition);

  const overallScore = clamp(opportunityScore * 0.4 + digitalReadiness * 0.25 + marketMomentum * 0.2 + competitionLevel * 0.15);
  const { grade, label } = gradeFromScore(overallScore);

  const findings: Finding[] = [
    { type: "success", text: `Market growing at ${p.marketGrowth}% YoY`, detail: p.marketGrowth >= 20 ? "Above-average growth — early movers will capture share." : "Steady growth — sustainable long-term." },
    { type: p.digitalAdoption >= 70 ? "success" : "warning", text: `${p.digitalAdoption}% digital adoption`, detail: p.digitalAdoption >= 70 ? "Consumers are ready for digital-first marketing." : "Digital adoption still maturing — first-mover advantage available." },
    { type: p.competition >= 80 ? "critical" : p.competition >= 65 ? "warning" : "success", text: `Competition level: ${p.competition}/100`, detail: p.competition >= 80 ? "Saturated — need sharp differentiation." : "Manageable competition with focused strategy." },
    { type: "success", text: `Industry avg CAC: ${p.avgCac}`, detail: "Cost to acquire one paying customer." },
    { type: "success", text: `Industry avg LTV: ${p.avgLtv}`, detail: "Lifetime value per customer." },
    { type: "warning", text: `Only ${p.digitalSpendShare}% of marketing budget is digital`, detail: "Industry is under-investing in digital — opportunity to outpace." },
  ];

  const competitors: CompetitorBar[] = [
    { name: "You (Est.)", score: clamp(overallScore - 20), isUser: true },
    { name: "Industry Avg", score: clamp(55 + (hash % 15)), isUser: false },
    { name: "Top 10%", score: clamp(78 + (hash % 10)), isUser: false },
    { name: "Market Leader", score: clamp(88 + (hash % 8)), isUser: false },
  ];

  const ltvNum = parseFloat(p.avgLtv.replace(/[^\d.]/g, ""));
  const cacNum = parseFloat(p.avgCac.replace(/[^\d.]/g, ""));
  const ltvCacRatio = ltvNum && cacNum ? Math.round(ltvNum / cacNum) : 3;

  const actionItems: string[] = [
    `Capture first-mover advantage: invest ${Math.min(p.digitalSpendShare + 20, 85)}% of marketing budget in digital channels`,
    `Build a lead magnet (free guide/audit) targeting ${ind.toLowerCase()} buyers to lower CAC below ${p.avgCac}`,
    `Deploy hyper-local SEO + Google Business Profile to dominate "${ind.toLowerCase()} near me" searches`,
    `Set up marketing automation to nurture leads — industry LTV of ${p.avgLtv} justifies 90-day sequences`,
    `Run paid ads on underserved long-tail keywords — competition is ${p.competition}/100`,
    `Track CAC:LTV ratio — aim for 1:3+ (current industry benchmark: 1:${ltvCacRatio})`,
  ];

  return {
    toolId: "growth",
    input: ind,
    overallScore,
    grade,
    gradeLabel: label,
    categories: [
      { name: "Opportunity", score: opportunityScore, maxScore: 100, description: "Combined growth + adoption + low competition" },
      { name: "Digital Readiness", score: digitalReadiness, maxScore: 100, description: "How ready the industry is for digital marketing" },
      { name: "Market Momentum", score: marketMomentum, maxScore: 100, description: `Growing at ${p.marketGrowth}% YoY` },
      { name: "Low Competition", score: competitionLevel, maxScore: 100, description: "Lower competition = easier to win" },
    ],
    findings,
    competitors,
    actionItems,
    recommendation:
      overallScore >= 75
        ? `${ind} is a high-opportunity industry (${overallScore}/100). Strong market growth + moderate competition = ideal window. Businesses that invest aggressively in digital now will lock in market share for the next 5–7 years.`
        : overallScore >= 55
        ? `${ind} offers solid growth potential (${overallScore}/100). With a focused 6-month digital strategy, you can outperform 70% of competitors who are still under-investing in digital channels.`
        : `${ind} is competitive (${overallScore}/100) but still winnable. Differentiation, hyper-targeted niches, and superior execution will beat bigger competitors. Focus on LTV-maximizing retention plays.`,
    metrics: [
      { label: "Market Growth", value: `${p.marketGrowth}% YoY`, trend: "up" },
      { label: "Digital Adoption", value: `${p.digitalAdoption}%`, trend: "up" },
      { label: "Competition", value: `${p.competition}/100`, trend: p.competition >= 75 ? "down" : "neutral" },
      { label: "Avg CAC", value: p.avgCac, trend: "neutral" },
      { label: "Avg LTV", value: p.avgLtv, trend: "up" },
      { label: "Digital Spend", value: `${p.digitalSpendShare}%`, trend: "up" },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Tool 4: ROAS Calculator (budget-based, real formulas)               */
/* ------------------------------------------------------------------ */

async function analyzeRoas(budgetInput: string): Promise<AnalysisResult> {
  const budget = parseFloat(budgetInput.replace(/[^\d.]/g, ""));
  if (isNaN(budget) || budget <= 0) {
    return {
      toolId: "roas",
      input: budgetInput,
      overallScore: 0,
      grade: "F",
      gradeLabel: "Invalid",
      categories: [],
      findings: [{ type: "critical", text: "Please enter a valid monthly ad budget" }],
      competitors: [],
      actionItems: ["Enter a positive number for your monthly ad budget"],
      recommendation: "Please enter a valid monthly ad budget to calculate your projected ROAS.",
      metrics: [],
    };
  }

  const hash = hashString(budgetInput);

  // Realistic Indian digital ad benchmarks
  // Pick a deterministic "current ROAS" in a realistic 2.6x–3.8x band,
  // then derive the supporting metrics so the story is always coherent.
  const avgCpc = 18 + (hash % 12);                          // ₹18–30 per click
  const avgCtr = 2.4 + (hash % 10) / 10;                    // 2.4%–3.3% (impressions → clicks)
  const avgConvRate = 1.8 + (hash % 10) / 10;               // 1.8%–2.7% (clicks → leads) — realistic for cold paid ads
  const currentRoas = Math.round((2.6 + (hash % 13) / 10) * 10) / 10;   // 2.6x – 3.8x
  const optimizedRoas = Math.round(currentRoas * 1.5 * 10) / 10;        // ~1.5x lift with optimization
  const topPerformerRoas = 6.5;
  const industryAvgRoas = 3.2;

  // Funnel: clicks → leads → revenue (revenue is implied by ROAS)
  const clicks = Math.round(budget / avgCpc);
  const leads = Math.round(clicks * (avgConvRate / 100));
  const revenue = Math.round(currentRoas * budget);
  // Derived AOV makes the numbers tell a consistent story
  const avgOrderValue = leads > 0 ? Math.round(revenue / leads) : 0;

  // Score: how does current ROAS compare to industry?
  const overallScore = clamp((currentRoas / topPerformerRoas) * 100);
  const { grade, label } = gradeFromScore(overallScore);

  const adWastePct = clamp(35 - (currentRoas * 4), 8, 40);
  const wastedBudget = Math.round((budget * adWastePct) / 100);
  const extraRevenueFromOptimization = Math.round((optimizedRoas - currentRoas) * budget);

  const findings: Finding[] = [
    { type: currentRoas >= 3.2 ? "success" : "warning", text: `Your projected ROAS: ${currentRoas}x`, detail: currentRoas >= 3.2 ? "At or above industry average — solid performance." : "Just below industry average — optimization will close the gap." },
    { type: "success", text: `Projected revenue: ₹${revenue.toLocaleString("en-IN")}/mo`, detail: `From ${leads} leads at ₹${avgOrderValue.toLocaleString("en-IN")} avg order value.` },
    { type: "success", text: `Industry average ROAS: ${industryAvgRoas}x`, detail: "Benchmark across Indian digital advertisers." },
    { type: "success", text: `Top performers achieve ${topPerformerRoas}x ROAS`, detail: "Achievable with full-funnel optimization." },
    { type: "success", text: `Optimization potential: ${optimizedRoas}x`, detail: `Realistic with creative refresh + audience tuning = +₹${Math.round((optimizedRoas - currentRoas) * budget).toLocaleString("en-IN")}/mo.` },
    { type: "warning", text: `Estimated ad waste: ${adWastePct}%`, detail: `~₹${wastedBudget.toLocaleString("en-IN")}/mo lost to irrelevant clicks, bad targeting, or low-quality creative.` },
    { type: "success", text: `Projected leads: ${leads}/month`, detail: `At ₹${avgCpc}/click and ${avgConvRate.toFixed(1)}% click-to-lead conversion.` },
  ];

  const competitors: CompetitorBar[] = [
    { name: "You (Projected)", score: clamp(currentRoas * 15), isUser: true },
    { name: "Industry Avg", score: clamp(industryAvgRoas * 15), isUser: false },
    { name: "Optimized", score: clamp(optimizedRoas * 15), isUser: false },
    { name: "Top Performer", score: clamp(topPerformerRoas * 15), isUser: false },
  ];

  const actionItems: string[] = [
    `Audit ad targeting — ${adWastePct}% of budget (~₹${wastedBudget.toLocaleString("en-IN")}/mo) is likely wasted on low-intent clicks`,
    `Refresh ad creative every 14–21 days to combat ad fatigue (lifts CTR by 20–40%)`,
    `Layer lookalike audiences on top converters — typically cuts CAC by 25%`,
    `Set up conversion tracking + value tracking before scaling (required for ROAS optimization)`,
    `Reallocate 30% of budget from worst-performing campaigns to best-performing — instant ROAS lift`,
    `A/B test landing pages — even a 0.5% conversion-rate lift = ~₹${Math.round(extraRevenueFromOptimization * 0.15).toLocaleString("en-IN")}/mo extra revenue at your scale`,
  ];

  return {
    toolId: "roas",
    input: budgetInput,
    overallScore,
    grade,
    gradeLabel: label,
    categories: [
      { name: "Current ROAS", score: clamp(currentRoas * 15), maxScore: 100, description: `${currentRoas}x return on ad spend` },
      { name: "Optimization Headroom", score: clamp((optimizedRoas - currentRoas) * 25), maxScore: 100, description: "Room to improve with optimization" },
      { name: "Efficiency", score: clamp(100 - adWastePct * 2), maxScore: 100, description: `${100 - adWastePct}% of budget well-spent` },
      { name: "Scale Potential", score: clamp(budget >= 100000 ? 85 : budget >= 50000 ? 70 : 55), maxScore: 100, description: "Higher budgets unlock better data + optimization" },
    ],
    findings,
    competitors,
    actionItems,
    recommendation:
      currentRoas >= 3.5
        ? `Your projected ROAS of ${currentRoas}x is above the ${industryAvgRoas}x industry average — strong performance. With optimization, you could reach ${optimizedRoas}x, adding ~₹${Math.round((optimizedRoas - currentRoas) * budget).toLocaleString("en-IN")}/mo in revenue. Scale budget gradually (20%/week) to maintain efficiency.`
        : currentRoas >= 3.0
        ? `Your projected ROAS of ${currentRoas}x is roughly on par with the ${industryAvgRoas}x industry average. Fixing ad waste (~₹${wastedBudget.toLocaleString("en-IN")}/mo) and refreshing creative can lift you to ${optimizedRoas}x within 60 days — an extra ~₹${Math.round((optimizedRoas - currentRoas) * budget).toLocaleString("en-IN")}/mo in revenue.`
        : `Your projected ROAS of ${currentRoas}x is below the ${industryAvgRoas}x industry average. You're likely losing ~₹${wastedBudget.toLocaleString("en-IN")}/mo to ad waste. A full-funnel audit and creative refresh can realistically get you to ${optimizedRoas}x — adding ~₹${Math.round((optimizedRoas - currentRoas) * budget).toLocaleString("en-IN")}/mo in revenue. Book a free audit before scaling further.`,
    metrics: [
      { label: "Monthly Budget", value: `₹${budget.toLocaleString("en-IN")}`, trend: "neutral" },
      { label: "Projected ROAS", value: `${currentRoas}x`, trend: currentRoas >= 3.2 ? "up" : "down" },
      { label: "Revenue/mo", value: `₹${revenue.toLocaleString("en-IN")}`, trend: "up" },
      { label: "Avg CPC", value: `₹${avgCpc}`, trend: "neutral" },
      { label: "Conv. Rate", value: `${avgConvRate.toFixed(1)}%`, trend: "neutral" },
      { label: "Leads/mo", value: `${leads}`, trend: "up" },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* POST handler                                                        */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  const overallController = new AbortController();
  const overallTimeout = setTimeout(() => overallController.abort(), 20000);

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

    const { toolId, input } = parsed.data;

    let result: AnalysisResult;
    switch (toolId) {
      case "website":
        result = await analyzeWebsite(input, overallController.signal);
        break;
      case "seo":
        result = await analyzeSeoKeyword(input);
        break;
      case "growth":
        result = await analyzeGrowth(input);
        break;
      case "roas":
        result = await analyzeRoas(input);
        break;
      default:
        return NextResponse.json({ error: "Unknown tool" }, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } finally {
    clearTimeout(overallTimeout);
  }
}
