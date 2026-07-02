"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Search,
  TrendingUp,
  Calculator,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Loader2,
  Sparkles,
  Copy,
  Check,
  Share2,
  RotateCcw,
  Cpu,
  Zap,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface CategoryScore {
  name: string;
  score: number;
  maxScore: number;
  description: string;
}

interface Finding {
  type: "success" | "warning" | "critical";
  text: string;
  detail?: string;
}

interface CompetitorBar {
  name: string;
  score: number;
  isUser: boolean;
}

interface MetricChip {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
}

interface AnalysisResult {
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

const tools = [
  {
    id: "website" as const,
    icon: Globe,
    title: "Website Scanner",
    shortTitle: "Website",
    description: "Real-time speed, SEO & UX audit — we actually fetch your page",
    placeholder: "Enter your website URL (e.g. example.com)",
    inputType: "url" as const,
    badge: "Live Fetch",
    examples: ["example.com", "wikipedia.org", "github.com"],
  },
  {
    id: "seo" as const,
    icon: Search,
    title: "SEO Dominance Analyzer",
    shortTitle: "SEO",
    description: "AI-powered keyword difficulty + ranking opportunity analysis",
    placeholder: "Enter your target keyword (e.g. seo services delhi)",
    inputType: "text" as const,
    badge: "AI Powered",
    examples: ["seo services delhi", "digital marketing mumbai", "real estate lawyer bangalore"],
  },
  {
    id: "growth" as const,
    icon: TrendingUp,
    title: "Growth Potential Calculator",
    shortTitle: "Growth",
    description: "Industry-specific growth benchmarks + untapped opportunity score",
    placeholder: "Select your industry",
    inputType: "select" as const,
    badge: "Benchmarks",
    examples: ["Real Estate", "E-Commerce", "Healthcare"],
  },
  {
    id: "roas" as const,
    icon: Calculator,
    title: "ROAS Calculator",
    shortTitle: "ROAS",
    description: "Project your return on ad spend with realistic Indian benchmarks",
    placeholder: "Enter monthly ad budget (₹)",
    inputType: "number" as const,
    badge: "Calculator",
    examples: ["50000", "100000", "500000"],
  },
];

const industries = [
  "Real Estate",
  "Healthcare",
  "Law Firms",
  "Education",
  "Beauty & Salon",
  "Restaurants",
  "E-Commerce",
  "Startups",
];

// Terminal scan lines for the live-loading feel
function buildTerminalLines(toolId: string, input: string): string[] {
  const base = [
    `[INIT] Booting AI Growth Lab v2.0...`,
    `[AUTH] Session verified · anonymous scan`,
    `[INPUT] Target acquired: ${input.slice(0, 50)}`,
    `[LOAD] Loading analysis modules...`,
    `[NET] Establishing secure connection...`,
    `[SCAN] Running diagnostics...`,
  ];
  const toolSpecific: Record<string, string[]> = {
    website: [
      `[FETCH] Downloading HTML document...`,
      `[PARSE] Extracting DOM structure...`,
      `[PERF] Measuring load metrics...`,
      `[SEO] Auditing on-page signals...`,
      `[A11Y] Checking accessibility...`,
    ],
    seo: [
      `[AI] Querying SERP intelligence...`,
      `[VOL] Estimating search volume...`,
      `[DIFF] Computing keyword difficulty...`,
      `[COMP] Analyzing competitor landscape...`,
      `[OPP] Scoring ranking opportunity...`,
    ],
    growth: [
      `[MKT] Loading industry benchmarks...`,
      `[ADOPT] Measuring digital adoption...`,
      `[COMP] Scoring competition density...`,
      `[PROJ] Modeling growth trajectory...`,
      `[OPP] Calculating first-mover advantage...`,
    ],
    roas: [
      `[BUDGET] Parsing budget input...`,
      `[CPC] Loading avg CPC benchmarks...`,
      `[FUNNEL] Modeling conversion funnel...`,
      `[WASTE] Estimating ad waste...`,
      `[PROJ] Projecting optimized ROAS...`,
    ],
  };
  return [...base, ...(toolSpecific[toolId] || []), `[DONE] Analysis complete ✓`];
}

function TrendIcon({ trend }: { trend?: "up" | "down" | "neutral" }) {
  if (trend === "up") return <ArrowUpRight className="w-3 h-3 text-emerald-400" />;
  if (trend === "down") return <ArrowDownRight className="w-3 h-3 text-rose-400" />;
  return <Minus className="w-3 h-3 text-sv-muted/60" />;
}

function scoreColor(score: number): string {
  if (score >= 75) return "#10b981"; // emerald
  if (score >= 50) return "#D4AF37"; // gold
  if (score >= 30) return "#f59e0b"; // amber
  return "#ef4444"; // red
}

function AnimatedScoreRing({ score, grade, label }: { score: number; grade: string; label: string }) {
  const [displayScore, setDisplayScore] = useState(0);
  const color = scoreColor(score);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (score <= 0) {
      // No animation needed; render path below uses `score` directly when 0.
      return;
    }
    let rafId = 0;
    const duration = 1200;
    const start = Date.now();
    const startVal = 0;
    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayScore(Math.round(startVal + (score - startVal) * eased));
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [score]);

  // When score resets to 0, snap the displayed value back to 0 without animating
  const effectiveDisplay = score <= 0 ? 0 : displayScore;

  // Unique gradient id per render to avoid collisions if multiple rings render
  const gradId = `scoreGrad-${grade}-${score}`;

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Outer pulsing glow */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-40 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}40 0%, transparent 70%)` }}
      />
      <svg className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 -rotate-90" viewBox="0 0 160 160">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
          <filter id="scoreGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="80" cy="80" r={radius} stroke="rgba(212,175,55,0.08)" strokeWidth="10" fill="none" />
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke={`url(#${gradId})`}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (effectiveDisplay / 100) * circumference}
          filter="url(#scoreGlow)"
          style={{ transition: "stroke-dashoffset 0.05s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={grade}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black"
          style={{ color }}
        >
          {grade}
        </motion.span>
        <span className="text-lg sm:text-xl md:text-2xl font-bold text-cream mt-0.5 sm:mt-1">
          {effectiveDisplay}
        </span>
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-sv-muted mt-0.5">
          {label}
        </span>
      </div>
    </div>
  );
}

function CategoryMiniCard({ category, index }: { category: CategoryScore; index: number }) {
  const color = scoreColor(category.score);
  const pct = Math.min(100, (category.score / Math.max(1, category.maxScore)) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08 }}
      className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-sv-surface/40 border border-white/5 hover:border-gold/20 hover:bg-sv-surface/60 transition-colors group"
    >
      <div className="flex items-start justify-between mb-2 gap-1.5">
        <span className="text-[10px] sm:text-[11px] font-medium text-sv-muted leading-tight flex-1 line-clamp-2">
          {category.name}
        </span>
        <span className="text-sm sm:text-base font-bold tabular-nums shrink-0" style={{ color }}>
          {category.score}
          <span className="text-sv-muted/40 text-[10px]">/{category.maxScore}</span>
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-sv-elevated/60 overflow-hidden">
        <motion.div
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.3 + index * 0.08 }}
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              animation: "shimmer 2s infinite",
            }}
          />
        </motion.div>
      </div>
      <p className="text-[9px] text-sv-muted/60 mt-1.5 leading-tight line-clamp-1">
        {category.description}
      </p>
    </motion.div>
  );
}

function CompetitorChart({ competitors }: { competitors: CompetitorBar[] }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  const maxScore = Math.max(...competitors.map((c) => c.score), 1);

  return (
    <div className="space-y-2.5">
      {competitors.map((comp, i) => {
        const color = comp.isUser ? "#D4AF37" : scoreColor(comp.score);
        const widthPct = animated ? (comp.score / maxScore) * 100 : 0;
        return (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[11px] sm:text-xs flex items-center gap-1 ${comp.isUser ? "text-gold font-bold" : "text-sv-muted"}`}>
                {comp.isUser && <Sparkles className="w-3 h-3" />}
                {comp.name}
              </span>
              <span className="text-[11px] sm:text-xs font-bold tabular-nums" style={{ color }}>
                {comp.score}
              </span>
            </div>
            <div className="h-5 sm:h-6 rounded-md bg-sv-elevated/40 overflow-hidden relative">
              <motion.div
                className="h-full rounded-md relative flex items-center justify-end pr-2"
                style={{
                  width: `${widthPct}%`,
                  background: comp.isUser
                    ? "linear-gradient(90deg, rgba(212,175,55,0.4), #D4AF37)"
                    : `linear-gradient(90deg, ${color}55, ${color}aa)`,
                  border: comp.isUser ? "1px solid rgba(212,175,55,0.6)" : "none",
                }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                {widthPct > 25 && (
                  <span className="text-[10px] font-bold text-sv-bg/80 tabular-nums">
                    {Math.round(widthPct)}%
                  </span>
                )}
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AnalysisLab() {
  const [activeTool, setActiveTool] = useState(tools[0]);
  const [inputValue, setInputValue] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [scanError, setScanError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal to bottom as lines appear
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  const handleScan = async () => {
    if (!inputValue.trim()) {
      toast({
        title: "Input required",
        description: `Please enter ${activeTool.id === "website" ? "a URL" : activeTool.id === "growth" ? "an industry" : "a value"} to scan.`,
        variant: "destructive",
      });
      return;
    }
    setScanning(true);
    setResult(null);
    setScanError(null);
    setTerminalLines([]);
    setCopied(false);

    const lines = buildTerminalLines(activeTool.id, inputValue);

    // Stream terminal lines while the API call runs in parallel
    const linePromises: Promise<void>[] = [];
    for (let i = 0; i < lines.length; i++) {
      linePromises.push(
        new Promise((r) => {
          setTimeout(() => {
            setTerminalLines((prev) => [...prev, lines[i]]);
            r();
          }, 220 + i * 180);
        })
      );
    }

    // Kick off the real API call in parallel
    const apiPromise = (async () => {
      try {
        const res = await fetch("/api/analysis-lab", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ toolId: activeTool.id, input: inputValue.trim() }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Scan failed");
        }
        return data as AnalysisResult;
      } catch (err) {
        throw err;
      }
    })();

    try {
      // Wait for both terminal animation AND api to finish (whichever takes longer)
      const [apiResult] = await Promise.all([apiPromise, Promise.all(linePromises)]);
      // Small hold at "DONE" for effect
      await new Promise((r) => setTimeout(r, 350));
      setResult(apiResult);
    } catch (err) {
      setScanError(err instanceof Error ? err.message : "Scan failed unexpectedly");
      toast({
        title: "Scan failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setScanning(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setTerminalLines([]);
    setScanError(null);
    setInputValue("");
    setCopied(false);
  };

  const handleCopyResults = () => {
    if (!result) return;
    const lines = [
      `═══ SOCIAL VIENS · AI GROWTH LAB REPORT ═══`,
      `Tool: ${activeTool.title}`,
      `Input: ${result.input}`,
      `Overall Score: ${result.overallScore}/100 (Grade: ${result.grade} — ${result.gradeLabel})`,
      ``,
      `▸ CATEGORIES`,
      ...result.categories.map((c) => `  · ${c.name}: ${c.score}/${c.maxScore}`),
      ``,
      `▸ KEY FINDINGS`,
      ...result.findings.map((f) => `  ${f.type === "success" ? "✓" : f.type === "warning" ? "!" : "✗"} ${f.text}`),
      ``,
      `▸ COMPETITORS`,
      ...result.competitors.map((c) => `  · ${c.name}: ${c.score}${c.isUser ? " (You)" : ""}`),
      ``,
      `▸ METRICS`,
      ...result.metrics.map((m) => `  · ${m.label}: ${m.value}`),
      ``,
      `▸ ACTION ITEMS`,
      ...result.actionItems.map((a, i) => `  ${i + 1}. ${a}`),
      ``,
      `▸ RECOMMENDATION`,
      `  ${result.recommendation}`,
      ``,
      `Generated free at socialviens.com`,
    ].join("\n");
    navigator.clipboard.writeText(lines);
    setCopied(true);
    toast({ title: "Report copied!", description: "Full analysis is in your clipboard." });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (!result) return;
    const shareText = `Just scanned "${result.input}" with Social Viens AI Growth Lab — scored ${result.overallScore}/100 (Grade ${result.grade}). Get your free scan at socialviens.com!`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "My AI Growth Lab Score", text: shareText, url: window.location.href });
      } else {
        navigator.clipboard.writeText(shareText);
        toast({ title: "Share text copied!", description: "Paste anywhere to share your score." });
      }
    } catch {
      // user cancelled — silent
    }
  };

  const totalTerminalLines = buildTerminalLines(activeTool.id, inputValue || "target").length;

  return (
    <section id="analysis" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Premium animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-sv-bg via-sv-surface/40 to-sv-bg" />

        {/* Floating gold radial glows (3 orbs) */}
        <motion.div
          className="absolute top-[15%] left-[10%] w-72 h-72 sm:w-96 sm:h-96 bg-gold/[0.07] rounded-full blur-[140px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[15%] right-[10%] w-64 h-64 sm:w-80 sm:h-80 bg-bronze/[0.08] rounded-full blur-[120px]"
          animate={{ x: [0, -25, 0], y: [0, 25, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-56 h-56 bg-gold/[0.05] rounded-full blur-[100px]"
          animate={{ x: [0, 20, 0], y: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-gold/25 bg-gold/5 mb-4 sm:mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
            <p className="text-[10px] sm:text-xs tracking-[0.25em] text-gold uppercase font-semibold">
              AI Growth Laboratory
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
            <span className="text-cream">Analyze. Score.</span>{" "}
            <span className="text-gold-gradient">Grow.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sv-muted text-sm sm:text-base md:text-lg px-3 leading-relaxed">
            Get instant, real AI-powered insights about your business. We actually fetch your website
            and analyze it live — no fake scores, no signup, completely free.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-5 sm:mt-6">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-sv-muted/80 px-2.5 sm:px-3 py-1 rounded-full bg-sv-surface/40 border border-white/5">
              <Cpu className="w-3 h-3 text-gold" /> 4 AI Tools
            </div>
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-sv-muted/80 px-2.5 sm:px-3 py-1 rounded-full bg-sv-surface/40 border border-white/5">
              <Zap className="w-3 h-3 text-gold" /> ~10 sec scan
            </div>
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-sv-muted/80 px-2.5 sm:px-3 py-1 rounded-full bg-sv-surface/40 border border-white/5">
              <Target className="w-3 h-3 text-gold" /> Real benchmarks
            </div>
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-sv-muted/80 px-2.5 sm:px-3 py-1 rounded-full bg-sv-surface/40 border border-white/5">
              <Check className="w-3 h-3 text-gold" /> No signup needed
            </div>
          </div>
        </motion.div>

        {/* Main premium card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Glow border wrapper */}
          <div className="absolute -inset-px rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gold/30 via-transparent to-bronze/30 opacity-60 blur-sm" />
          <div className="relative glass rounded-2xl sm:rounded-3xl overflow-hidden border border-gold/15">
            {/* Tool tabs — 2x2 grid on mobile, 4 cols on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 p-2 sm:p-3 border-b border-gold/10 bg-sv-surface/30">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const isActive = activeTool.id === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setActiveTool(tool);
                      handleReset();
                    }}
                    aria-pressed={isActive}
                    className={`group relative flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-left transition-all duration-300 min-h-[44px] ${
                      isActive
                        ? "bg-gradient-to-br from-gold/20 to-bronze/10 border border-gold/40 shadow-lg shadow-gold/10 scale-[1.02]"
                        : "bg-sv-surface/40 border border-white/5 hover:border-gold/20 hover:-translate-y-0.5 hover:bg-sv-surface/60"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform ${
                        isActive ? "text-gold scale-110" : "text-sv-muted group-hover:scale-110 group-hover:text-gold/70"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-xs sm:text-sm font-semibold truncate transition-colors ${
                          isActive ? "text-cream" : "text-sv-muted group-hover:text-cream"
                        }`}
                      >
                        {tool.shortTitle}
                      </div>
                      <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gold/70 font-medium truncate">
                        {tool.badge}
                      </div>
                    </div>
                    {isActive && (
                      <motion.span
                        layoutId="active-tool-glow"
                        className="absolute -z-10 inset-0 rounded-xl bg-gradient-to-br from-gold/10 to-transparent"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
                {/* Left — Input + Terminal (2 cols) */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-5">
                  {/* Tool header */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <activeTool.icon className="w-5 h-5 text-gold shrink-0" />
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-cream">
                        {activeTool.title}
                      </h3>
                      <span className="ml-auto text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20">
                        {activeTool.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-sv-muted leading-relaxed">
                      {activeTool.description}
                    </p>
                  </div>

                  {/* Premium input card */}
                  <div className="p-3 sm:p-4 rounded-xl bg-sv-surface/40 border border-gold/15 backdrop-blur-sm">
                    <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-sv-muted/70 font-medium block mb-2">
                      {activeTool.id === "website"
                        ? "Your Website URL"
                        : activeTool.id === "growth"
                        ? "Your Industry"
                        : activeTool.id === "roas"
                        ? "Monthly Ad Budget (₹)"
                        : "Target Keyword"}
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {activeTool.inputType === "select" ? (
                        <select
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          disabled={scanning}
                          className="flex-1 bg-sv-elevated border border-gold/15 rounded-lg px-4 py-3 text-cream text-sm focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all disabled:opacity-50 min-h-[44px] cursor-pointer appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10"
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23D4AF37' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
                          }}
                        >
                          <option value="">Select your industry...</option>
                          {industries.map((ind) => (
                            <option key={ind} value={ind}>
                              {ind}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Input
                          type={activeTool.inputType}
                          placeholder={activeTool.placeholder}
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          disabled={scanning}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !scanning && inputValue) handleScan();
                          }}
                          className="flex-1 bg-sv-elevated border-gold/15 focus:border-gold/50 focus:ring-gold/10 text-cream placeholder:text-sv-muted/50 h-11 sm:h-12 transition-all disabled:opacity-50 min-w-0"
                        />
                      )}
                      <Button
                        onClick={handleScan}
                        disabled={scanning || !inputValue}
                        className="bg-gradient-to-r from-gold to-bronze text-sv-bg font-semibold px-5 sm:px-6 h-11 sm:h-12 hover:shadow-lg hover:shadow-gold/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
                      >
                        {scanning ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                            <span>Analyzing...</span>
                          </>
                        ) : (
                          <>
                            <Search className="w-4 h-4 mr-1.5" />
                            Scan
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Example chips */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                      <span className="text-[10px] text-sv-muted/60 mr-0.5 font-medium">Try:</span>
                      {activeTool.examples.map((ex, i) => (
                        <button
                          key={i}
                          onClick={() => !scanning && setInputValue(ex)}
                          disabled={scanning}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-sv-elevated/60 text-sv-muted/80 border border-white/5 hover:border-gold/30 hover:text-gold hover:bg-gold/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {ex}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Premium terminal output */}
                  <div
                    ref={terminalRef}
                    className="bg-black/70 backdrop-blur rounded-xl p-3 sm:p-4 font-mono text-[11px] sm:text-xs h-44 sm:h-52 overflow-y-auto border border-gold/10 scrollbar-thin relative"
                  >
                    {/* Terminal header */}
                    <div className="flex items-center gap-2 mb-2 sm:mb-3 pb-2 border-b border-white/5 sticky top-0 bg-black/80 backdrop-blur -mx-3 sm:-mx-4 px-3 sm:px-4 -mt-3 sm:-mt-4 pt-3 sm:pt-4 z-10">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                      </div>
                      <span className="text-sv-muted/40 text-[9px] sm:text-[10px]">ai-growth-lab · v2.0</span>
                      {scanning && (
                        <span className="ml-auto flex items-center gap-1 text-[9px] sm:text-[10px] text-gold">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
                          </span>
                          analyzing
                        </span>
                      )}
                    </div>
                    {terminalLines.length === 0 && !scanning && (
                      <div className="text-sv-muted/40">
                        <div>$ awaiting input...</div>
                        <div className="mt-2 text-sv-muted/30">
                          ▸ Enter a value above and click <span className="text-gold/60">Scan</span> to begin
                        </div>
                      </div>
                    )}
                    {terminalLines.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`mb-1 leading-relaxed ${
                          line.includes("[DONE]")
                            ? "text-emerald-400 font-bold"
                            : line.includes("[INIT]") || line.includes("[AUTH]") || line.includes("[INPUT]")
                            ? "text-gold/80"
                            : line.includes("[ERROR]") || line.includes("[WARN]")
                            ? "text-amber-400"
                            : "text-sv-muted/70"
                        }`}
                      >
                        {line}
                      </motion.div>
                    ))}
                    {scanning && <span className="animate-blink text-gold inline-block">▊</span>}
                  </div>

                  {/* Premium progress bar (during scan) */}
                  <AnimatePresence>
                    {scanning && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] uppercase tracking-wider text-gold/80 flex items-center gap-1.5 font-semibold">
                            <Activity className="w-3 h-3" />
                            AI Analyzing
                          </span>
                          <span className="text-[10px] text-sv-muted/60 tabular-nums">
                            {terminalLines.length}/{totalTerminalLines}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-sv-elevated/60 overflow-hidden relative">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-gold via-bronze to-gold relative"
                            initial={{ width: "0%" }}
                            animate={{ width: `${Math.min(100, (terminalLines.length / totalTerminalLines) * 100)}%` }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          >
                            <div
                              className="absolute inset-0 opacity-50"
                              style={{
                                background:
                                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                                animation: "shimmer 1.5s infinite",
                              }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right — Results (3 cols) */}
                <div className="lg:col-span-3">
                  <AnimatePresence mode="wait">
                    {result ? (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4 sm:space-y-5"
                      >
                        {/* Top row: score ring (2 cols) + headline (3 cols) on desktop, stacked on mobile */}
                        <div className="grid sm:grid-cols-5 gap-4 sm:gap-6 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-sv-surface/60 to-sv-surface/20 border border-gold/15">
                          <div className="sm:col-span-2 flex items-center justify-center">
                            <AnimatedScoreRing
                              score={result.overallScore}
                              grade={result.grade}
                              label={result.gradeLabel}
                            />
                          </div>
                          <div className="sm:col-span-3 text-center sm:text-left flex flex-col justify-center">
                            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gold/70 mb-1">
                              {activeTool.title} · Result
                            </p>
                            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-cream mb-2 break-words">
                              {result.input.length > 40 ? result.input.slice(0, 40) + "…" : result.input}
                            </h4>
                            <p className="text-xs sm:text-sm text-sv-muted leading-relaxed">
                              {result.recommendation}
                            </p>
                          </div>
                        </div>

                        {/* Category scores — 2x2 grid mobile, 1x4 desktop */}
                        {result.categories.length > 0 && (
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                            {result.categories.map((cat, i) => (
                              <CategoryMiniCard key={i} category={cat} index={i} />
                            ))}
                          </div>
                        )}

                        {/* Metric chips — flex wrap */}
                        {result.metrics.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {result.metrics.map((m, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sv-surface/40 border border-white/5 hover:border-gold/20 hover:bg-sv-surface/60 transition-colors"
                              >
                                <TrendIcon trend={m.trend} />
                                <span className="text-[10px] uppercase tracking-wider text-sv-muted/60">
                                  {m.label}
                                </span>
                                <span className="text-xs font-bold text-cream tabular-nums">{m.value}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Two columns: findings + competitors */}
                        <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
                          {/* Findings with severity-colored left borders */}
                          {result.findings.length > 0 && (
                            <div className="p-3 sm:p-4 rounded-xl bg-sv-surface/30 border border-white/5">
                              <h5 className="text-xs sm:text-sm font-bold text-cream mb-3 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-gold" />
                                Key Findings
                              </h5>
                              <div className="space-y-2 max-h-72 overflow-y-auto scrollbar-thin pr-1">
                                {result.findings.map((f, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    className={`flex items-start gap-2.5 p-2 rounded-lg border-l-2 ${
                                      f.type === "success"
                                        ? "border-l-emerald-500/60 bg-emerald-500/5"
                                        : f.type === "warning"
                                        ? "border-l-amber-500/60 bg-amber-500/5"
                                        : "border-l-rose-500/60 bg-rose-500/5"
                                    }`}
                                  >
                                    {f.type === "success" ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                    ) : f.type === "warning" ? (
                                      <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                                    ) : (
                                      <AlertTriangle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <span className="text-xs sm:text-sm text-cream font-medium">{f.text}</span>
                                      {f.detail && (
                                        <p className="text-[11px] text-sv-muted/70 mt-0.5">{f.detail}</p>
                                      )}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Competitors */}
                          {result.competitors.length > 0 && (
                            <div className="p-3 sm:p-4 rounded-xl bg-sv-surface/30 border border-white/5">
                              <h5 className="text-xs sm:text-sm font-bold text-cream mb-3 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-gold" />
                                How You Compare
                              </h5>
                              <CompetitorChart competitors={result.competitors} />
                            </div>
                          )}
                        </div>

                        {/* Action items — numbered with gold gradient numbers */}
                        {result.actionItems.length > 0 && (
                          <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-gold/5 to-bronze/5 border border-gold/20">
                            <h5 className="text-xs sm:text-sm font-bold text-gold mb-3 flex items-center gap-2">
                              <Zap className="w-4 h-4" />
                              Recommended Action Plan ({result.actionItems.length})
                            </h5>
                            <ol className="space-y-2">
                              {result.actionItems.map((item, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.06 }}
                                  className="flex items-start gap-2.5 text-xs sm:text-sm p-2 rounded-lg bg-sv-surface/30"
                                >
                                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-gold to-bronze text-sv-bg text-[10px] font-bold flex items-center justify-center mt-0.5 shadow-sm">
                                    {i + 1}
                                  </span>
                                  <span className="text-sv-muted leading-relaxed">{item}</span>
                                </motion.li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-2">
                          <Button
                            asChild
                            className="flex-1 min-w-[140px] bg-gradient-to-r from-gold to-bronze text-sv-bg font-semibold hover:shadow-lg hover:shadow-gold/30 h-11"
                          >
                            <a href="#contact">
                              Get Detailed Audit
                              <ChevronRight className="ml-1 w-4 h-4" />
                            </a>
                          </Button>
                          <Button
                            onClick={handleCopyResults}
                            variant="outline"
                            className="border-gold/30 text-gold hover:bg-gold/10 hover:text-gold h-11"
                          >
                            {copied ? <Check className="w-4 h-4 mr-1.5" /> : <Copy className="w-4 h-4 mr-1.5" />}
                            {copied ? "Copied" : "Copy Report"}
                          </Button>
                          <Button
                            onClick={handleShare}
                            variant="outline"
                            className="border-gold/30 text-gold hover:bg-gold/10 hover:text-gold h-11"
                          >
                            <Share2 className="w-4 h-4 mr-1.5" />
                            Share
                          </Button>
                          <Button
                            onClick={handleReset}
                            variant="ghost"
                            className="text-sv-muted hover:text-cream hover:bg-white/5 h-11"
                          >
                            <RotateCcw className="w-4 h-4 mr-1.5" />
                            Reset
                          </Button>
                        </div>
                      </motion.div>
                    ) : scanError ? (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-6 sm:p-8"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">
                          <AlertTriangle className="w-8 h-8 text-rose-400" />
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-cream mb-2">Scan failed</h4>
                        <p className="text-xs sm:text-sm text-sv-muted mb-4 max-w-sm">{scanError}</p>
                        <Button
                          onClick={handleReset}
                          variant="outline"
                          className="border-gold/30 text-gold hover:bg-gold/10 h-11"
                        >
                          <RotateCcw className="w-4 h-4 mr-1.5" />
                          Try Again
                        </Button>
                      </motion.div>
                    ) : (
                      /* Premium empty state */
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-4 sm:p-6"
                      >
                        {/* Large animated icon with gold glow */}
                        <div className="relative mb-5 sm:mb-6">
                          <div className="absolute inset-0 animate-ping-slow rounded-full bg-gold/10 blur-md" />
                          <div className="absolute -inset-3 bg-gold/10 blur-xl rounded-full" />
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-gold/15 to-bronze/10 border border-gold/30 flex items-center justify-center shadow-lg shadow-gold/20">
                            <activeTool.icon className="w-10 h-10 sm:w-12 sm:h-12 text-gold/70" />
                          </div>
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-cream mb-2">Ready to analyze</h4>
                        <p className="text-xs sm:text-sm text-sv-muted max-w-sm mb-5 sm:mb-6 px-2">
                          Enter your{" "}
                          {activeTool.id === "website"
                            ? "website URL"
                            : activeTool.id === "growth"
                            ? "industry"
                            : activeTool.id === "roas"
                            ? "ad budget"
                            : "keyword"}{" "}
                          above and click <span className="text-gold font-medium">Scan</span> to get instant
                          AI-powered insights.
                        </p>

                        {/* 4 mini feature cards (all tools) */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-lg">
                          {tools.map((t) => {
                            const Icon = t.icon;
                            const isActive = activeTool.id === t.id;
                            return (
                              <button
                                key={t.id}
                                onClick={() => {
                                  setActiveTool(t);
                                  handleReset();
                                }}
                                className={`text-left p-2.5 rounded-lg border transition-all min-h-[68px] ${
                                  isActive
                                    ? "bg-gold/10 border-gold/30 shadow-sm shadow-gold/10"
                                    : "bg-sv-surface/30 border-white/5 hover:border-gold/20 hover:-translate-y-0.5"
                                }`}
                              >
                                <Icon
                                  className={`w-4 h-4 mb-1.5 ${isActive ? "text-gold" : "text-sv-muted"}`}
                                />
                                <p
                                  className={`text-[10px] font-semibold leading-tight ${
                                    isActive ? "text-cream" : "text-sv-muted"
                                  }`}
                                >
                                  {t.shortTitle}
                                </p>
                                <p className="text-[9px] text-sv-muted/60 leading-tight mt-0.5 line-clamp-2">
                                  {t.id === "website"
                                    ? "Audits 20+ live signals"
                                    : t.id === "seo"
                                    ? "AI keyword difficulty"
                                    : t.id === "growth"
                                    ? "Industry benchmarks"
                                    : "Project ad ROI"}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl glass border border-gold/10"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-cream">
                Want a deeper, human-audited report?
              </p>
              <p className="text-[11px] sm:text-xs text-sv-muted">
                Our experts will prepare a 15-page PDF audit — free, no obligation.
              </p>
            </div>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-gold to-bronze text-sv-bg font-semibold hover:shadow-lg hover:shadow-gold/30 shrink-0 h-11 w-full sm:w-auto"
          >
            <a href="#contact">
              Book Free Consultation
              <ChevronRight className="ml-1 w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
