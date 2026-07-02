"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Search,
  Zap,
  Gauge,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertTriangle,
  RefreshCw,
  Activity,
  ScanLine,
  FileText,
  Phone,
  Mail,
  User,
  ArrowRight,
  Sparkles,
  Hash,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadCaptureModal } from "@/components/LeadCaptureModal";

/* ---------- Types (mirror API responses) ---------- */

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

interface WebsiteResult {
  url: string;
  performanceScore: number;
  seoScore: number;
  overallScore: number;
  performanceChecks: CheckResult[];
  seoChecks: CheckResult[];
  pageData: PageData;
  error?: string;
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

interface SeoPageData {
  title: string;
  description: string;
  wordCount: number;
  imageCount: number;
  linkCount: number;
  loadTimeMs: number;
  h1Text: string;
  urlLength: number;
}

interface SeoResult {
  url: string;
  keyword: string;
  seoScore: number;
  visibilityScore: number;
  keywordAnalysis: KeywordAnalysis;
  seoChecks: CheckResult[];
  pageData: SeoPageData;
  error?: string;
}

type ScanState = "idle" | "scanning" | "results" | "error";

/* ---------- Scan steps ---------- */

const WEBSITE_STEPS = [
  { label: "Fetching page…", detail: "Sending HTTPS request with browser User-Agent" },
  { label: "Parsing HTML with Cheerio…", detail: "Loading DOM tree, extracting meta + assets" },
  { label: "Computing scores…", detail: "Running 16 performance + SEO heuristics" },
];

const SEO_STEPS = [
  { label: "Fetching page…", detail: "Retrieving raw HTML over HTTPS" },
  { label: "Parsing with Cheerio…", detail: "Extracting title, headings, body, links" },
  { label: "Analyzing keyword + SEO…", detail: "Scoring 15 ranking factors against target keyword" },
];

/* ---------- Helpers ---------- */

function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str.startsWith("http") ? str : `https://${str}`);
    return !!url.hostname && url.hostname.includes(".");
  } catch {
    return false;
  }
}

function scoreColor(score: number): string {
  if (score >= 80) return "#00FF88"; // neon green
  if (score >= 60) return "#D4AF37"; // gold
  return "#FF4D5E"; // red
}

function scoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Needs Work";
  return "Critical";
}

function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/* ---------- Circular Gauge ---------- */

function ScoreGauge({
  value,
  label,
  size = 140,
}: {
  value: number;
  label: string;
  size?: number;
}) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const strokeWidth = 9;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = animatedValue / 100;
  const strokeDashoffset = circumference * (1 - progress);
  const color = scoreColor(value);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 1300;
    const animate = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnimatedValue(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: "stroke-dashoffset 0.05s linear",
              filter: `drop-shadow(0 0 8px ${color}66)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color }}>
            {animatedValue}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-sv-muted/60 mt-0.5">
            {scoreLabel(value)}
          </span>
        </div>
      </div>
      <span className="text-xs font-medium text-cream/70 mt-3 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

/* ---------- Scan animation overlay ---------- */

function ScanAnimation({
  steps,
  currentStep,
  progressPercent,
  url,
}: {
  steps: { label: string; detail: string }[];
  currentStep: number;
  progressPercent: number;
  url: string;
}) {
  return (
    <div className="scan-interior scan-grid-bg rounded-2xl p-6 md:p-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full border-2 border-[#00FF88]/30 border-t-[#00FF88] flex items-center justify-center"
        >
          <ScanLine className="w-4 h-4 text-[#00FF88]" />
        </motion.div>
        <div>
          <p className="scan-text-glow text-sm font-bold">DEEP_SCAN_ACTIVE</p>
          <p className="text-xs text-sv-muted/60 font-mono truncate max-w-[280px] sm:max-w-md">
            target: {url}
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3 mb-6">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {i < currentStep ? (
                <CheckCircle2 className="w-4 h-4 text-[#00FF88]" />
              ) : i === currentStep ? (
                <Loader2 className="w-4 h-4 text-[#00FF88] animate-spin" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-[#00FF88]/20" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-mono transition-colors ${
                  i <= currentStep ? "scan-text-glow" : "text-sv-muted/40"
                }`}
              >
                {step.label}
                {i === currentStep && <span className="neon-cursor" />}
              </p>
              {i === currentStep && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-sv-muted/50 mt-0.5 font-mono"
                >
                  {step.detail}
                </motion.p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="scan-progress-bar mb-2">
        <span style={{ width: `${progressPercent}%` }} />
      </div>
      <div className="flex justify-between text-[10px] font-mono text-sv-muted/50">
        <span>progress</span>
        <span className="scan-text-glow">{progressPercent}%</span>
      </div>
    </div>
  );
}

/* ---------- Check row ---------- */

function CheckRow({ check, index }: { check: CheckResult; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.04 * index }}
      className="scan-check-row rounded-lg p-3 flex items-start gap-3"
    >
      {check.passed ? (
        <CheckCircle2 className="w-4 h-4 text-[#00FF88] flex-shrink-0 mt-0.5" />
      ) : (
        <XCircle className="w-4 h-4 text-[#FF4D5E] flex-shrink-0 mt-0.5" />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-cream/90 font-medium leading-tight">{check.name}</p>
        <p className="text-xs text-sv-muted/70 mt-0.5 font-mono">{check.detail}</p>
      </div>
    </motion.div>
  );
}

/* ---------- Lead Capture Mini Form ---------- */

/* ---------- Page Data Grid ---------- */

function PageDataGrid({ items }: { items: { label: string; value: string; icon: React.ReactNode }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 * i }}
          className="rounded-lg border border-white/5 bg-white/[0.02] p-3"
        >
          <div className="flex items-center gap-1.5 mb-1 text-sv-muted/60">
            {item.icon}
            <span className="text-[10px] uppercase tracking-wider">{item.label}</span>
          </div>
          <p className="text-sm font-mono text-cream truncate" title={item.value}>
            {item.value || "—"}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- Tab 1: Website X-Ray ---------- */

function WebsiteXRayTab() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<ScanState>("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [result, setResult] = useState<WebsiteResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const runScan = useCallback(async () => {
    if (!url.trim() || !isValidUrl(url.trim())) {
      setErrorMsg("Please enter a valid URL (e.g., example.com)");
      return;
    }
    setErrorMsg("");
    setState("scanning");
    setCurrentStep(0);
    setProgressPercent(0);
    setReportModalOpen(false);
    setResult(null);

    const stepMs = 900;
    const t1 = setTimeout(() => {
      setCurrentStep(1);
      setProgressPercent(33);
    }, stepMs);
    const t2 = setTimeout(() => {
      setCurrentStep(2);
      setProgressPercent(66);
    }, stepMs * 2);
    timersRef.current = [t1, t2];

    const targetUrl = url.startsWith("http") ? url : `https://${url}`;

    try {
      const res = await fetch("/api/analyze/website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });
      const data: WebsiteResult = await res.json();
      clearTimers();
      setProgressPercent(100);
      // Brief pause for the 100% bar to render
      setTimeout(() => {
        if (data.error) {
          setErrorMsg(data.error);
          setState("error");
        } else {
          setResult(data);
          setState("results");
        }
      }, 350);
    } catch (e) {
      clearTimers();
      setErrorMsg(e instanceof Error ? e.message : "Network error");
      setState("error");
    }
  }, [url, clearTimers]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const handleReset = () => {
    setState("idle");
    setResult(null);
    setErrorMsg("");
    setCurrentStep(0);
    setProgressPercent(0);
    setReportModalOpen(false);
  };

  // Build payload for /api/report from the current Website X-Ray result
  const reportAnalysisData = result
    ? {
        checks: [
          ...result.performanceChecks.map((c) => ({
            category: "Performance",
            name: c.name,
            status: c.passed ? "pass" : "fail",
            description: c.detail,
          })),
          ...result.seoChecks.map((c) => ({
            category: "SEO",
            name: c.name,
            status: c.passed ? "pass" : "fail",
            description: c.detail,
          })),
        ],
        summary: `Website Speed X-Ray analysis for ${result.url}. Overall score ${result.overallScore}/100 (Performance ${result.performanceScore}, SEO ${result.seoScore}).`,
        recommendations: [
          ...result.performanceChecks.filter((c) => !c.passed).map((c) => `Fix: ${c.name} — ${c.detail}`),
          ...result.seoChecks.filter((c) => !c.passed).map((c) => `Fix: ${c.name} — ${c.detail}`),
        ].slice(0, 8),
      }
    : undefined;

  const reportScores = result
    ? {
        performance: result.performanceScore,
        seo: result.seoScore,
        overall: result.overallScore,
      }
    : undefined;

  return (
    <div>
      {/* Input row — only visible when idle/error */}
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="scan-interior rounded-2xl p-5 md:p-6"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 scan-text-glow text-sm font-mono">
                  $
                </span>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && runScan()}
                  placeholder="https://example.com"
                  className="terminal-input w-full pl-9 pr-4 py-3.5 rounded-lg text-sm"
                />
              </div>
              <button
                onClick={runScan}
                disabled={!url.trim()}
                className="neon-btn px-6 py-3.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Scan Now
              </button>
            </div>
            {errorMsg && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-[#FF4D5E] mt-2 font-mono"
              >
                ⚠ {errorMsg}
              </motion.p>
            )}
            <p className="text-[10px] text-sv-muted/40 mt-3 font-mono">
              {"// Real server-side Cheerio analysis · 6 performance + 10 SEO checks · 12s timeout"}
            </p>
          </motion.div>
        )}

        {state === "scanning" && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ScanAnimation
              steps={WEBSITE_STEPS}
              currentStep={currentStep}
              progressPercent={progressPercent}
              url={url}
            />
          </motion.div>
        )}

        {state === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="scan-interior rounded-2xl p-6 md:p-8 text-center"
          >
            <AlertTriangle className="w-12 h-12 text-[#FF4D5E] mx-auto mb-3" />
            <p className="text-cream font-semibold mb-1">Scan Could Not Complete</p>
            <p className="text-sm text-sv-muted/70 font-mono mb-4 max-w-md mx-auto">{errorMsg}</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={runScan}
                className="neon-btn px-5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retry Scan
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-lg text-xs font-bold border border-gold/20 text-gold hover:bg-gold/10 transition-colors flex items-center justify-center gap-2"
              >
                Enter New URL
              </button>
            </div>
          </motion.div>
        )}

        {state === "results" && result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="scan-text-glow text-xs font-bold uppercase tracking-wider mb-1">
                  SCAN_COMPLETE
                </p>
                <h3 className="text-lg font-bold text-cream truncate">{result.url}</h3>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg text-xs font-bold border border-gold/20 text-gold hover:bg-gold/10 transition-colors flex items-center gap-2 flex-shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" /> New Scan
              </button>
            </div>

            {/* Gauges */}
            <div className="scan-interior rounded-2xl p-6">
              <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                <ScoreGauge value={result.performanceScore} label="Performance" />
                <ScoreGauge value={result.seoScore} label="SEO" />
                <ScoreGauge value={result.overallScore} label="Overall" />
              </div>
            </div>

            {/* Checks grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Gauge className="w-4 h-4 text-[#00FF88]" />
                  <h4 className="text-sm font-bold text-cream uppercase tracking-wider">
                    Performance Checks
                  </h4>
                </div>
                <div className="space-y-2">
                  {result.performanceChecks.map((c, i) => (
                    <CheckRow key={c.name} check={c} index={i} />
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Search className="w-4 h-4 text-[#00FF88]" />
                  <h4 className="text-sm font-bold text-cream uppercase tracking-wider">
                    SEO Checks
                  </h4>
                </div>
                <div className="space-y-2">
                  {result.seoChecks.map((c, i) => (
                    <CheckRow key={c.name} check={c} index={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* Page data */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-gold" />
                <h4 className="text-sm font-bold text-cream uppercase tracking-wider">
                  Page Data
                </h4>
              </div>
              <PageDataGrid
                items={[
                  { label: "Title", value: result.pageData.title, icon: <FileText className="w-3 h-3" /> },
                  {
                    label: "Description",
                    value: result.pageData.description,
                    icon: <FileText className="w-3 h-3" />,
                  },
                  {
                    label: "Words",
                    value: String(result.pageData.wordCount),
                    icon: <Hash className="w-3 h-3" />,
                  },
                  {
                    label: "Images",
                    value: String(result.pageData.imageCount),
                    icon: <Globe className="w-3 h-3" />,
                  },
                  {
                    label: "Links",
                    value: String(result.pageData.linkCount),
                    icon: <ArrowRight className="w-3 h-3" />,
                  },
                  {
                    label: "HTML Size",
                    value: formatBytes(result.pageData.htmlSize),
                    icon: <Activity className="w-3 h-3" />,
                  },
                  {
                    label: "H1 Count",
                    value: String(result.pageData.h1Count),
                    icon: <Hash className="w-3 h-3" />,
                  },
                  {
                    label: "Load Time",
                    value: `${result.pageData.loadTimeMs}ms`,
                    icon: <Zap className="w-3 h-3" />,
                  },
                ]}
              />
            </div>

            {/* PDF report CTA */}
            <motion.div
              key="cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                onClick={() => setReportModalOpen(true)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold text-sv-bg font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                Get My Free PDF Report
              </button>
              <p className="text-[10px] text-sv-muted/60 text-center mt-2">
                We&apos;ll email you a branded PDF with scores, checks &amp; recommendations.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lead capture modal — generates PDF + emails it */}
      <LeadCaptureModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        toolName="Website Speed X-Ray"
        url={result?.url}
        analysisData={reportAnalysisData}
        scores={reportScores}
        subtitle="We'll email you a detailed PDF of your Website X-Ray results — performance & SEO scores, every check, and a prioritized fix list."
      />
    </div>
  );
}

/* ---------- Tab 2: Google Dominance ---------- */

function GoogleDominanceTab() {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [state, setState] = useState<ScanState>("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [result, setResult] = useState<SeoResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const runScan = useCallback(async () => {
    if (!url.trim() || !isValidUrl(url.trim())) {
      setErrorMsg("Please enter a valid URL");
      return;
    }
    if (!keyword.trim()) {
      setErrorMsg("Please enter a target keyword");
      return;
    }
    setErrorMsg("");
    setState("scanning");
    setCurrentStep(0);
    setProgressPercent(0);
    setReportModalOpen(false);
    setResult(null);

    const stepMs = 900;
    const t1 = setTimeout(() => {
      setCurrentStep(1);
      setProgressPercent(33);
    }, stepMs);
    const t2 = setTimeout(() => {
      setCurrentStep(2);
      setProgressPercent(66);
    }, stepMs * 2);
    timersRef.current = [t1, t2];

    const targetUrl = url.startsWith("http") ? url : `https://${url}`;

    try {
      const res = await fetch("/api/analyze/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl, keyword: keyword.trim() }),
      });
      const data: SeoResult = await res.json();
      clearTimers();
      setProgressPercent(100);
      setTimeout(() => {
        if (data.error) {
          setErrorMsg(data.error);
          setState("error");
        } else {
          setResult(data);
          setState("results");
        }
      }, 350);
    } catch (e) {
      clearTimers();
      setErrorMsg(e instanceof Error ? e.message : "Network error");
      setState("error");
    }
  }, [url, keyword, clearTimers]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const handleReset = () => {
    setState("idle");
    setResult(null);
    setErrorMsg("");
    setCurrentStep(0);
    setProgressPercent(0);
    setReportModalOpen(false);
  };

  // Build payload for /api/report from the current Google Dominance result
  const reportAnalysisData = result
    ? {
        checks: result.seoChecks.map((c) => ({
          category: "SEO",
          name: c.name,
          status: c.passed ? "pass" : "fail",
          description: c.detail,
        })),
        summary: `Google Dominance analysis for ${result.url} (target keyword: "${result.keyword}"). SEO score ${result.seoScore}/100, visibility ${result.visibilityScore}/100. Keyword density ${result.keywordAnalysis.density}%.`,
        recommendations: result.seoChecks
          .filter((c) => !c.passed)
          .map((c) => `Fix: ${c.name} — ${c.detail}`)
          .slice(0, 8),
      }
    : undefined;

  const reportScores = result
    ? {
        seo: result.seoScore,
        visibility: result.visibilityScore,
        overall: Math.round((result.seoScore + result.visibilityScore) / 2),
      }
    : undefined;

  const locEntries: { key: keyof KeywordLocations; label: string }[] = [
    { key: "title", label: "Title Tag" },
    { key: "description", label: "Meta Description" },
    { key: "h1", label: "H1 Heading" },
    { key: "headings", label: "H2–H4 Headings" },
    { key: "content", label: "Body Content" },
    { key: "firstParagraph", label: "First Paragraph" },
    { key: "url", label: "URL Path" },
  ];

  return (
    <div>
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="scan-interior rounded-2xl p-5 md:p-6"
          >
            <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-3">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 scan-text-glow text-sm font-mono">
                  $
                </span>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && runScan()}
                  placeholder="https://example.com"
                  className="terminal-input w-full pl-9 pr-4 py-3.5 rounded-lg text-sm"
                />
              </div>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00FF88]/60" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && runScan()}
                  placeholder="target keyword"
                  className="terminal-input w-full pl-9 pr-4 py-3.5 rounded-lg text-sm"
                />
              </div>
              <button
                onClick={runScan}
                disabled={!url.trim() || !keyword.trim()}
                className="neon-btn px-6 py-3.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Analyze
              </button>
            </div>
            {errorMsg && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-[#FF4D5E] mt-2 font-mono"
              >
                ⚠ {errorMsg}
              </motion.p>
            )}
            <p className="text-[10px] text-sv-muted/40 mt-3 font-mono">
              {"// Real Cheerio parse · keyword presence in 7 locations · 15 SEO ranking checks · 12s timeout"}
            </p>
          </motion.div>
        )}

        {state === "scanning" && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ScanAnimation
              steps={SEO_STEPS}
              currentStep={currentStep}
              progressPercent={progressPercent}
              url={`${url} · kw="${keyword}"`}
            />
          </motion.div>
        )}

        {state === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="scan-interior rounded-2xl p-6 md:p-8 text-center"
          >
            <AlertTriangle className="w-12 h-12 text-[#FF4D5E] mx-auto mb-3" />
            <p className="text-cream font-semibold mb-1">Analysis Could Not Complete</p>
            <p className="text-sm text-sv-muted/70 font-mono mb-4 max-w-md mx-auto">{errorMsg}</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={runScan}
                className="neon-btn px-5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retry
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-lg text-xs font-bold border border-gold/20 text-gold hover:bg-gold/10 transition-colors"
              >
                Enter New URL
              </button>
            </div>
          </motion.div>
        )}

        {state === "results" && result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="scan-text-glow text-xs font-bold uppercase tracking-wider mb-1">
                  GOOGLE_DOMINANCE_REPORT
                </p>
                <h3 className="text-lg font-bold text-cream truncate">{result.url}</h3>
                <p className="text-xs text-sv-muted font-mono mt-0.5">
                  keyword: <span className="text-gold">&quot;{result.keyword}&quot;</span>
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg text-xs font-bold border border-gold/20 text-gold hover:bg-gold/10 transition-colors flex items-center gap-2 flex-shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" /> New Analysis
              </button>
            </div>

            {/* Gauges */}
            <div className="scan-interior rounded-2xl p-6">
              <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                <ScoreGauge value={result.seoScore} label="SEO Score" />
                <ScoreGauge value={result.visibilityScore} label="Visibility" />
              </div>
            </div>

            {/* Keyword analysis */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Hash className="w-4 h-4 text-[#00FF88]" />
                <h4 className="text-sm font-bold text-cream uppercase tracking-wider">
                  Keyword Presence
                </h4>
                <span className="text-xs text-sv-muted font-mono ml-auto">
                  density: <span className="text-gold">{result.keywordAnalysis.density}%</span>
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {locEntries.map((loc, i) => {
                  const found = result.keywordAnalysis.locations[loc.key];
                  return (
                    <motion.div
                      key={loc.key}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25, delay: 0.04 * i }}
                      className={`scan-check-row rounded-lg p-3 flex items-center gap-2 ${
                        found ? "border-[#00FF88]/25" : ""
                      }`}
                    >
                      {found ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88] flex-shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-[#FF4D5E]/70 flex-shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="text-xs text-cream/80 font-medium truncate">{loc.label}</p>
                        <p
                          className={`text-[10px] font-mono ${
                            found ? "text-[#00FF88]" : "text-sv-muted/50"
                          }`}
                        >
                          {found ? "FOUND" : "MISSING"}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* SEO checks */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-[#00FF88]" />
                <h4 className="text-sm font-bold text-cream uppercase tracking-wider">
                  SEO Ranking Checks ({result.seoChecks.filter((c) => c.passed).length}/
                  {result.seoChecks.length})
                </h4>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {result.seoChecks.map((c, i) => (
                  <CheckRow key={c.name} check={c} index={i} />
                ))}
              </div>
            </div>

            {/* Page data */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-gold" />
                <h4 className="text-sm font-bold text-cream uppercase tracking-wider">Page Data</h4>
              </div>
              <PageDataGrid
                items={[
                  { label: "Title", value: result.pageData.title, icon: <FileText className="w-3 h-3" /> },
                  {
                    label: "Description",
                    value: result.pageData.description,
                    icon: <FileText className="w-3 h-3" />,
                  },
                  {
                    label: "H1 Text",
                    value: result.pageData.h1Text,
                    icon: <Hash className="w-3 h-3" />,
                  },
                  {
                    label: "Words",
                    value: String(result.pageData.wordCount),
                    icon: <Hash className="w-3 h-3" />,
                  },
                  {
                    label: "Images",
                    value: String(result.pageData.imageCount),
                    icon: <Globe className="w-3 h-3" />,
                  },
                  {
                    label: "Links",
                    value: String(result.pageData.linkCount),
                    icon: <ArrowRight className="w-3 h-3" />,
                  },
                  {
                    label: "URL Length",
                    value: `${result.pageData.urlLength} chars`,
                    icon: <Hash className="w-3 h-3" />,
                  },
                  {
                    label: "Load Time",
                    value: `${result.pageData.loadTimeMs}ms`,
                    icon: <Zap className="w-3 h-3" />,
                  },
                ]}
              />
            </div>

            {/* PDF CTA */}
            <motion.div
              key="cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                onClick={() => setReportModalOpen(true)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold text-sv-bg font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                Get My Free PDF Report
              </button>
              <p className="text-[10px] text-sv-muted/60 text-center mt-2">
                We&apos;ll email you a branded PDF with visibility scores, keyword analysis &amp; SEO checks.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lead capture modal — generates PDF + emails it */}
      <LeadCaptureModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        toolName="Google Dominance Analyzer"
        url={result?.url}
        analysisData={reportAnalysisData}
        scores={reportScores}
        subtitle="We'll email you a detailed PDF of your Google Dominance analysis — visibility score, keyword presence, and SEO ranking checks."
      />
    </div>
  );
}

/* ---------- Main Component ---------- */

const TABS = [
  {
    id: "website" as const,
    label: "Website Speed X-Ray",
    icon: Zap,
  },
  {
    id: "seo" as const,
    label: "Google Dominance Analyzer",
    icon: Search,
  },
];

export default function DeepScan() {
  const [activeTab, setActiveTab] = useState<"website" | "seo">("website");

  return (
    <section id="deep-scan" className="relative py-20 md:py-28 overflow-hidden bg-gradient-maroon">
      {/* Gold divider at top */}
      <div className="gold-divider mb-16" />

      {/* Floating gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)" }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-20 w-[600px] h-[600px] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(circle, rgba(0,255,136,0.05), transparent 70%)" }}
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(168,120,66,0.06), transparent 70%)" }}
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Deep Scan Analysis
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
            <span className="text-cream">Real-Time</span>{" "}
            <span className="text-gold-gradient">Website X-Ray</span>
          </h2>

          <p className="max-w-2xl mx-auto text-sv-muted text-base md:text-lg leading-relaxed">
            This isn&apos;t a mockup. Our server performs a{" "}
            <span className="text-cream font-medium">live fetch</span> of your URL, parses the HTML with{" "}
            <span className="text-[#00FF88] font-mono">Cheerio</span>, and runs{" "}
            <span className="text-cream font-medium">25+ real ranking heuristics</span> — the same checks
            Googlebot runs when crawling your site.
          </p>
        </motion.div>

        {/* Main glass card with tabs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-strong rounded-3xl overflow-hidden border border-gold/15"
        >
          {/* Tab header */}
          <div className="flex relative border-b border-gold/10 bg-sv-bg/40">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-4 sm:py-5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? "text-cream" : "text-sv-muted/60 hover:text-cream/80"
                  }`}
                >
                  <tab.icon className={`w-4 h-4 ${isActive ? "text-[#00FF88]" : ""}`} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">
                    {tab.id === "website" ? "X-Ray" : "Google"}
                  </span>
                </button>
              );
            })}
            {/* Animated underline */}
            <motion.div
              className="absolute bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent"
              style={{ width: "50%", left: "0%" }}
              animate={{ left: activeTab === "website" ? "0%" : "50%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />
          </div>

          {/* Tab content */}
          <div className="p-5 md:p-8 scan-grid-bg">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: activeTab === "website" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeTab === "website" ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "website" ? <WebsiteXRayTab /> : <GoogleDominanceTab />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-sv-muted/50 mt-6 font-mono"
        >
          {"// Each scan = 1 live HTTP fetch + Cheerio parse · 12-second server-side timeout · No data stored"}
        </motion.p>
      </div>
    </section>
  );
}
