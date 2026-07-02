import PDFDocument from "pdfkit";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export interface ReportCheck {
  category: string; // "Performance" | "SEO"
  name: string;
  status: "pass" | "fail" | "warning";
  description: string;
}

export interface ReportScores {
  performance?: number;
  seo?: number;
  overall?: number;
  visibility?: number;
}

export interface ReportData {
  toolName: string; // "Website Speed X-Ray" | "Google Dominance Analyzer" | etc.
  url: string;
  analyzedAt: Date;
  scores: ReportScores;
  checks: ReportCheck[];
  summary: string; // Human-readable summary
  recommendations: string[]; // Action items
}

/* ------------------------------------------------------------------ */
/* Brand palette                                                      */
/* ------------------------------------------------------------------ */

const BRAND = {
  gold: "#D4AF37",
  goldDark: "#A87842",
  goldLight: "#F5D680",
  cream: "#F5F0E8",
  ink: "#1A1A1A", // near-black
  inkSoft: "#2A2A2A",
  paper: "#FAFAFA",
  paperAlt: "#F0EDE3",
  green: "#0E8A5F",
  greenSoft: "#E7F5EE",
  amber: "#C68A1B",
  amberSoft: "#FBF1DC",
  red: "#B42318",
  redSoft: "#FBE7E5",
  muted: "#6B6B6B",
  rule: "#E0DCD0",
};

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function scoreColor(score: number): string {
  if (score >= 70) return BRAND.green;
  if (score >= 40) return BRAND.amber;
  return BRAND.red;
}

function statusIcon(status: "pass" | "fail" | "warning"): { glyph: string; color: string } {
  switch (status) {
    case "pass":
      return { glyph: "\u2713", color: BRAND.green }; // ✓
    case "fail":
      return { glyph: "\u2717", color: BRAND.red }; // ✗
    case "warning":
      return { glyph: "!", color: BRAND.amber }; // ⚠ (we use ! for cross-font safety)
  }
}

function clampScore(n: unknown): number | null {
  if (typeof n !== "number" || !isFinite(n)) return null;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function formatDate(d: Date): string {
  const pad = (x: number) => String(x).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

function truncate(text: string, max: number): string {
  if (!text) return "";
  return text.length > max ? text.slice(0, max - 1) + "\u2026" : text;
}

/* ------------------------------------------------------------------ */
/* Drawing primitives                                                 */
/* ------------------------------------------------------------------ */

function drawHeader(doc: PDFKit.PDFDocument, data: ReportData) {
  // Gold band across the top
  doc.rect(0, 0, 595.28, 90).fill(BRAND.gold);

  // "SOCIAL VIENS" wordmark
  doc
    .fillColor(BRAND.ink)
    .fontSize(24)
    .font("Helvetica-Bold")
    .text("SOCIAL VIENS", 50, 28, { continued: false });

  // Tagline
  doc
    .fontSize(9)
    .font("Helvetica")
    .fillColor(BRAND.ink)
    .text("PREMIUM DIGITAL MARKETING AGENCY", 50, 58);

  // Right side: report label
  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .fillColor(BRAND.ink)
    .text(data.toolName.toUpperCase(), 0, 32, {
      align: "right",
      width: 545.28,
    });
  doc
    .fontSize(8)
    .font("Helvetica")
    .fillColor(BRAND.ink)
    .text("Analysis Report", 0, 50, { align: "right", width: 545.28 });

  // Thin gold-dark rule beneath header band
  doc.rect(0, 90, 595.28, 3).fill(BRAND.goldDark);

  // Meta row: URL + date
  const metaY = 110;
  doc
    .fillColor(BRAND.muted)
    .fontSize(8)
    .font("Helvetica-Bold")
    .text("URL", 50, metaY);
  doc
    .fillColor(BRAND.ink)
    .fontSize(10)
    .font("Helvetica")
    .text(truncate(data.url, 90), 50, metaY + 11);

  doc
    .fillColor(BRAND.muted)
    .fontSize(8)
    .font("Helvetica-Bold")
    .text("ANALYZED", 50, metaY + 28);
  doc
    .fillColor(BRAND.ink)
    .fontSize(10)
    .font("Helvetica")
    .text(formatDate(data.analyzedAt), 50, metaY + 39);

  // Divider
  doc
    .moveTo(50, metaY + 58)
    .lineTo(545.28, metaY + 58)
    .strokeColor(BRAND.rule)
    .lineWidth(1)
    .stroke();
}

function drawScoreCircle(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  radius: number,
  label: string,
  score: number
) {
  const color = scoreColor(score);

  // Soft outer ring
  doc
    .circle(x, y, radius + 4)
    .lineWidth(1)
    .strokeColor(BRAND.rule)
    .fillColor(BRAND.paper)
    .fillAndStroke();

  // Solid colored disc
  doc.circle(x, y, radius).fill(color);

  // Score number
  doc
    .fillColor("#FFFFFF")
    .fontSize(radius * 0.9)
    .font("Helvetica-Bold")
    .text(String(score), x - radius, y - radius * 0.55, {
      width: radius * 2,
      align: "center",
    });

  // Label under the circle
  doc
    .fillColor(BRAND.ink)
    .fontSize(9)
    .font("Helvetica-Bold")
    .text(label.toUpperCase(), x - radius - 10, y + radius + 8, {
      width: (radius + 10) * 2,
      align: "center",
    });
}

function drawScoresSection(doc: PDFKit.PDFDocument, data: ReportData, startY: number): number {
  // Section title
  doc
    .fillColor(BRAND.ink)
    .fontSize(13)
    .font("Helvetica-Bold")
    .text("Performance Scores", 50, startY);

  // Gold accent line
  doc
    .rect(50, startY + 18, 40, 2)
    .fill(BRAND.gold);

  const y = startY + 38;
  const radius = 26;

  // Collect available scores
  const entries: { label: string; value: number }[] = [];
  const overall = clampScore(data.scores.overall);
  const perf = clampScore(data.scores.performance);
  const seo = clampScore(data.scores.seo);
  const vis = clampScore(data.scores.visibility);

  if (overall !== null) entries.push({ label: "Overall", value: overall });
  if (perf !== null) entries.push({ label: "Performance", value: perf });
  if (seo !== null) entries.push({ label: "SEO", value: seo });
  if (vis !== null) entries.push({ label: "Visibility", value: vis });

  if (entries.length === 0) {
    doc
      .fillColor(BRAND.muted)
      .fontSize(10)
      .font("Helvetica-Oblique")
      .text("No scores available for this report.", 50, y);
    return y + 30;
  }

  // Lay out circles evenly across the page width
  const pageWidth = 595.28;
  const margin = 50;
  const usable = pageWidth - margin * 2;
  const slotWidth = usable / entries.length;

  entries.forEach((entry, i) => {
    const cx = margin + slotWidth * (i + 0.5);
    drawScoreCircle(doc, cx, y + radius, radius, entry.label, entry.value);
  });

  return y + radius * 2 + 38; // account for circle + label
}

function drawSummarySection(doc: PDFKit.PDFDocument, data: ReportData, startY: number): number {
  let y = startY + 6;

  doc
    .fillColor(BRAND.ink)
    .fontSize(13)
    .font("Helvetica-Bold")
    .text("Executive Summary", 50, y);
  doc.rect(50, y + 18, 40, 2).fill(BRAND.gold);

  y += 30;

  // Summary box with paper-alt background
  doc.font("Helvetica").fontSize(10);
  const summaryHeight = doc.heightOfString(data.summary || "No summary available.", {
    width: 495.28,
    lineGap: 3,
  });

  doc
    .roundedRect(50, y, 495.28, summaryHeight + 24)
    .fill(BRAND.paperAlt)
    .strokeColor(BRAND.rule)
    .lineWidth(0.5);

  doc
    .fillColor(BRAND.ink)
    .fontSize(10)
    .font("Helvetica")
    .text(data.summary || "No summary available.", 62, y + 12, {
      width: 471.28,
      lineGap: 3,
    });

  return y + summaryHeight + 36;
}

function drawChecksSection(doc: PDFKit.PDFDocument, data: ReportData, startY: number): number {
  let y = startY + 6;

  doc
    .fillColor(BRAND.ink)
    .fontSize(13)
    .font("Helvetica-Bold")
    .text("Detailed Checks", 50, y);
  doc.rect(50, y + 18, 40, 2).fill(BRAND.gold);

  y += 36;

  const checks = data.checks || [];

  if (checks.length === 0) {
    doc
      .fillColor(BRAND.muted)
      .fontSize(10)
      .font("Helvetica-Oblique")
      .text("No detailed checks were recorded for this analysis.", 50, y);
    return y + 24;
  }

  // Table header
  const colX = {
    status: 50,
    category: 80,
    name: 160,
    description: 360,
  };
  const colWidths = {
    status: 24,
    category: 76,
    name: 196,
    description: 185,
  };

  doc
    .fillColor(BRAND.ink)
    .fontSize(8)
    .font("Helvetica-Bold")
    .text("STATUS", colX.status, y);
  doc.text("CATEGORY", colX.category, y);
  doc.text("CHECK", colX.name, y);
  doc.text("DETAIL", colX.description, y);

  y += 14;
  doc
    .moveTo(50, y)
    .lineTo(545.28, y)
    .strokeColor(BRAND.rule)
    .lineWidth(0.5)
    .stroke();
  y += 6;

  // Rows
  const rowPad = 5;
  for (const check of checks) {
    // Page break if needed
    if (y > 760) {
      doc.addPage();
      y = 60;
      // Re-draw header on new page
      doc
        .fillColor(BRAND.ink)
        .fontSize(8)
        .font("Helvetica-Bold")
        .text("STATUS", colX.status, y);
      doc.text("CATEGORY", colX.category, y);
      doc.text("CHECK", colX.name, y);
      doc.text("DETAIL", colX.description, y);
      y += 14;
      doc
        .moveTo(50, y)
        .lineTo(545.28, y)
        .strokeColor(BRAND.rule)
        .lineWidth(0.5)
        .stroke();
      y += 6;
    }

    const { glyph, color } = statusIcon(check.status);

    // Status pill
    doc.circle(colX.status + 6, y + 6, 7).fill(color);
    doc
      .fillColor("#FFFFFF")
      .fontSize(9)
      .font("Helvetica-Bold")
      .text(glyph, colX.status + 2, y + 1, { width: 10, align: "center" });

    // Category
    doc
      .fillColor(BRAND.muted)
      .fontSize(8)
      .font("Helvetica-Bold")
      .text((check.category || "—").toUpperCase(), colX.category, y + 1, {
        width: colWidths.category,
      });

    // Name
    doc
      .fillColor(BRAND.ink)
      .fontSize(9)
      .font("Helvetica-Bold")
      .text(check.name, colX.name, y + 1, { width: colWidths.name });

    // Description — wrap
    const descText = check.description || "";
    doc.font("Helvetica").fontSize(8);
    const descHeight = doc.heightOfString(descText, {
      width: colWidths.description,
      lineGap: 2,
    });
    doc
      .fillColor(BRAND.muted)
      .fontSize(8)
      .font("Helvetica")
      .text(descText, colX.description, y + 2, {
        width: colWidths.description,
        lineGap: 2,
      });

    const rowHeight = Math.max(16, descHeight + rowPad);
    y += rowHeight;

    // Faint divider
    doc
      .moveTo(50, y)
      .lineTo(545.28, y)
      .strokeColor(BRAND.rule)
      .lineWidth(0.25)
      .stroke();
    y += 4;
  }

  return y + 8;
}

function drawRecommendationsSection(
  doc: PDFKit.PDFDocument,
  data: ReportData,
  startY: number
): number {
  let y = startY + 6;

  doc
    .fillColor(BRAND.ink)
    .fontSize(13)
    .font("Helvetica-Bold")
    .text("Actionable Recommendations", 50, y);
  doc.rect(50, y + 18, 40, 2).fill(BRAND.gold);

  y += 36;

  const recs = data.recommendations && data.recommendations.length > 0
    ? data.recommendations
    : [
        "Improve page load speed by optimizing images and enabling compression.",
        "Add unique, descriptive meta descriptions to every page.",
        "Implement structured data (JSON-LD) for rich search results.",
        "Optimize for mobile-first indexing with a responsive layout.",
      ];

  recs.forEach((rec, i) => {
    if (y > 770) {
      doc.addPage();
      y = 60;
    }

    // Gold number badge
    doc.circle(60, y + 8, 9).fill(BRAND.gold);
    doc
      .fillColor(BRAND.ink)
      .fontSize(9)
      .font("Helvetica-Bold")
      .text(String(i + 1), 56, y + 4, { width: 10, align: "center" });

    // Recommendation text
    doc
      .fillColor(BRAND.ink)
      .fontSize(10)
      .font("Helvetica")
      .text(rec, 80, y + 2, { width: 460 });

    doc.font("Helvetica").fontSize(10);
    const blockHeight = doc.heightOfString(rec, {
      width: 460,
    });
    y += Math.max(22, blockHeight + 8);
  });

  return y + 8;
}

function drawFooter(doc: PDFKit.PDFDocument, data: ReportData) {
  // Ensure footer on every page
  // PDFKit exposes buffered pages via the internal _pageBuffer array when
  // `bufferPages: true` is set on the document options.
  const pageBuffer = (doc as unknown as { _pageBuffer: unknown[] })._pageBuffer;
  const pages = Array.isArray(pageBuffer) ? pageBuffer.length : 1;
  for (let i = 0; i < pages; i++) {
    doc.switchToPage(i);

    // Dark footer band
    doc.rect(0, 797, 595.28, 43).fill(BRAND.ink);

    // Gold accent above footer
    doc.rect(0, 794, 595.28, 3).fill(BRAND.gold);

    doc
      .fillColor(BRAND.gold)
      .fontSize(9)
      .font("Helvetica-Bold")
      .text("SOCIAL VIENS", 50, 806);

    doc
      .fillColor(BRAND.cream)
      .fontSize(8)
      .font("Helvetica")
      .text("socialviens.in   |   +91 81780 04800   |   hello@socialviens.in", 50, 820);

    doc
      .fillColor(BRAND.muted)
      .fontSize(7)
      .font("Helvetica")
      .text(
        `Generated by SOCIAL VIENS  \u00B7  ${formatDate(data.analyzedAt)}  \u00B7  Page ${i + 1} of ${pages}`,
        0,
        828,
        { align: "right", width: 545.28 }
      );
  }
}

/* ------------------------------------------------------------------ */
/* Main entry                                                         */
/* ------------------------------------------------------------------ */

export function generateAnalysisPDF(data: ReportData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
      bufferPages: true,
      info: {
        Title: `${data.toolName} Report — ${data.url}`,
        Author: "SOCIAL VIENS",
        Subject: `${data.toolName} analysis report for ${data.url}`,
        Producer: "SOCIAL VIENS PDF Engine",
      },
    });

    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // --- Layout ---
    drawHeader(doc, data);

    let y = 180;
    y = drawScoresSection(doc, data, y);
    y = drawSummarySection(doc, data, y);
    y = drawChecksSection(doc, data, y);
    y = drawRecommendationsSection(doc, data, y);

    // Final CTA block (only if room on last page)
    if (y < 720) {
      doc
        .roundedRect(50, y, 495.28, 56)
        .fill(BRAND.ink);

      doc
        .fillColor(BRAND.gold)
        .fontSize(11)
        .font("Helvetica-Bold")
        .text("Ready to boost your scores?", 62, y + 10, { width: 471 });

      doc
        .fillColor(BRAND.cream)
        .fontSize(9)
        .font("Helvetica")
        .text(
          "Book a free 30-minute consultation with our growth team — we\u2019ll turn this report into a 90-day action plan.",
          62,
          y + 26,
          { width: 471 }
        );
    } else {
      // Add a fresh page for the CTA
      doc.addPage();
      doc
        .roundedRect(50, 60, 495.28, 56)
        .fill(BRAND.ink);
      doc
        .fillColor(BRAND.gold)
        .fontSize(11)
        .font("Helvetica-Bold")
        .text("Ready to boost your scores?", 62, 70, { width: 471 });
      doc
        .fillColor(BRAND.cream)
        .fontSize(9)
        .font("Helvetica")
        .text(
          "Book a free 30-minute consultation with our growth team — we\u2019ll turn this report into a 90-day action plan.",
          62,
          86,
          { width: 471 }
        );
    }

    drawFooter(doc, data);

    doc.end();
  });
}
