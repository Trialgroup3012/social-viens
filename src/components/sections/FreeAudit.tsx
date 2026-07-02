"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Globe,
  Shield,
  Zap,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadCaptureModal } from "@/components/LeadCaptureModal";
import { FileText } from "lucide-react";

/* ---------- Types ---------- */

interface CategoryScore {
  label: string;
  icon: React.ReactNode;
  score: number;
  status: "good" | "warning" | "danger";
}

interface CriticalIssue {
  text: string;
  severity: "high" | "medium";
}

interface QuickWin {
  text: string;
  impact: "high" | "medium";
}

interface AuditResult {
  overallScore: number;
  categories: CategoryScore[];
  criticalIssues: CriticalIssue[];
  quickWins: QuickWin[];
}

/* ---------- Constants ---------- */

const SCAN_STEPS = [
  { label: "Scanning", description: "Crawling your website pages..." },
  { label: "Analyzing", description: "Evaluating SEO & performance metrics..." },
  { label: "Generating Report", description: "Compiling your audit results..." },
];

const SIMULATED_RESULT: AuditResult = {
  overallScore: 76,
  categories: [
    { label: "SEO Score", icon: <Search className="w-4 h-4" />, score: 72, status: "warning" },
    { label: "Performance", icon: <Zap className="w-4 h-4" />, score: 58, status: "danger" },
    { label: "Mobile-Friendly", icon: <Globe className="w-4 h-4" />, score: 89, status: "good" },
    { label: "Security", icon: <Shield className="w-4 h-4" />, score: 95, status: "good" },
    { label: "Accessibility", icon: <BarChart3 className="w-4 h-4" />, score: 64, status: "warning" },
    { label: "Content Quality", icon: <Search className="w-4 h-4" />, score: 76, status: "warning" },
  ],
  criticalIssues: [
    { text: "Page load speed exceeds 4.2s — 67% of users abandon at 3s+", severity: "high" },
    { text: "Missing meta descriptions on 12 key landing pages", severity: "high" },
    { text: "No structured data (Schema.org) detected on any page", severity: "medium" },
  ],
  quickWins: [
    { text: "Compress images — potential 40% size reduction", impact: "high" },
    { text: "Add alt tags to 23 untagged images", impact: "high" },
    { text: "Enable browser caching for static assets", impact: "medium" },
    { text: "Fix 4 broken internal links", impact: "medium" },
    { text: "Implement lazy loading for below-fold images", impact: "medium" },
  ],
};

/* ---------- Helpers ---------- */

function getStatusColor(status: "good" | "warning" | "danger") {
  switch (status) {
    case "good":
      return { bar: "bg-emerald-500", text: "text-emerald-400", ring: "#10B981" };
    case "warning":
      return { bar: "bg-amber-500", text: "text-amber-400", ring: "#F59E0B" };
    case "danger":
      return { bar: "bg-red-500", text: "text-red-400", ring: "#EF4444" };
  }
}

function getScoreStatus(score: number): "good" | "warning" | "danger" {
  if (score >= 80) return "good";
  if (score >= 50) return "warning";
  return "danger";
}

function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str.startsWith("http") ? str : `https://${str}`);
    return !!url.hostname && url.hostname.includes(".");
  } catch {
    return false;
  }
}

/* ---------- Sub-components ---------- */

function CircularProgressRing({
  value,
  maxValue = 100,
  size = 160,
  strokeWidth = 10,
}: {
  value: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
}) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = animatedValue / maxValue;
  const strokeDashoffset = circumference * (1 - progress);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const p = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      start = eased * value;
      setAnimatedValue(Math.round(start));
      if (p < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [value]);

  const status = getScoreStatus(value);
  const color = getStatusColor(status);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#F5D680" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(212,175,55,0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.05s linear" }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-gold-gradient">{animatedValue}</span>
        <span className="text-xs text-sv-muted mt-0.5">out of 100</span>
      </div>
    </div>
  );
}

function CategoryBar({ category, index }: { category: CategoryScore; index: number }) {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const color = getStatusColor(category.status);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(category.score);
    }, 300 + index * 150);
    return () => clearTimeout(timer);
  }, [category.score, index]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
      className="group rounded-xl bg-sv-elevated/60 border border-gold/10 p-4 hover:border-gold/25 transition-all duration-300 hover:bg-sv-elevated/80"
    >
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-md flex items-center justify-center ${category.status === "good" ? "bg-emerald-500/10" : category.status === "warning" ? "bg-amber-500/10" : "bg-red-500/10"}`}>
            <span className={color.text}>{category.icon}</span>
          </div>
          <span className="text-sm font-medium text-cream">{category.label}</span>
        </div>
        <span className={`text-sm font-bold ${color.text}`}>
          {category.score}/100
        </span>
      </div>
      <div className="h-2 rounded-full bg-sv-elevated overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color.bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${animatedWidth}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 + index * 0.15 }}
        />
      </div>
    </motion.div>
  );
}

/* ---------- Main Component ---------- */

export default function FreeAudit() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "results">("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(() => {
    setError("");

    if (!url.trim()) {
      setError("Please enter a website URL");
      inputRef.current?.focus();
      return;
    }

    if (!isValidUrl(url.trim())) {
      setError("Please enter a valid URL (e.g., example.com)");
      inputRef.current?.focus();
      return;
    }

    setState("loading");
    setCurrentStep(0);
    setProgressPercent(0);

    // Simulate 3-step progress animation over 2.5s
    const stepDuration = 2500 / 3;

    // Step 1: Scanning
    const t1 = setTimeout(() => {
      setCurrentStep(1);
      setProgressPercent(33);
    }, stepDuration);

    // Step 2: Analyzing
    const t2 = setTimeout(() => {
      setCurrentStep(2);
      setProgressPercent(66);
    }, stepDuration * 2);

    // Step 3: Generating Report → show results
    const t3 = setTimeout(() => {
      setProgressPercent(100);
      setTimeout(() => {
        setState("results");
      }, 300);
    }, stepDuration * 3);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [url]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const handleReset = () => {
    setState("idle");
    setUrl("");
    setError("");
    setCurrentStep(0);
    setProgressPercent(0);
  };

  return (
    <section id="free-audit" className="relative py-24 overflow-hidden">
      <div className="section-divider mb-16" />

      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-bronze/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Zap className="w-4 h-4" />
            Free Growth Tool
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-cream">Free Website</span>{" "}
            <span className="text-gold-gradient">SEO Audit</span>
          </h2>

          <p className="max-w-2xl mx-auto text-sv-muted text-lg leading-relaxed">
            Get an instant health check of your website&apos;s SEO, performance, and accessibility.
            Uncover hidden issues and discover quick wins to boost your rankings.
          </p>
        </motion.div>

        {/* Input Area */}
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="glass rounded-2xl p-6 md:p-8 border border-gold/10 max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        if (error) setError("");
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter your website URL (e.g., example.com)"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-sv-elevated/80 border border-gold/15 text-cream placeholder:text-sv-muted/50 text-sm focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                    />
                  </div>
                  <Button
                    onClick={handleSubmit}
                    className="py-4 px-8 text-sm font-semibold bg-gradient-to-r from-gold via-gold-light to-gold text-sv-bg hover:shadow-lg hover:shadow-gold/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 h-auto whitespace-nowrap rounded-xl"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Scan My Website
                  </Button>
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-3 flex items-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}

          {state === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="glass rounded-2xl p-8 md:p-10 border border-gold/10 text-center">
                {/* Animated globe icon */}
                <motion.div
                  className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Globe className="w-10 h-10 text-gold" />
                </motion.div>

                {/* Step labels */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  {SCAN_STEPS.map((step, i) => (
                    <div key={step.label} className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        {i < currentStep ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : i === currentStep ? (
                          <Loader2 className="w-4 h-4 text-gold animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-gold/20" />
                        )}
                        <span
                          className={`text-sm font-medium transition-colors duration-300 ${
                            i <= currentStep ? "text-cream" : "text-sv-muted/50"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {i < SCAN_STEPS.length - 1 && (
                        <div className="w-8 h-px bg-gold/15" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Current step description */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-sv-muted text-sm mb-8"
                  >
                    {SCAN_STEPS[currentStep]?.description}
                  </motion.p>
                </AnimatePresence>

                {/* Progress bar */}
                <div className="h-2 rounded-full bg-sv-elevated overflow-hidden max-w-md mx-auto">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-gold via-gold-light to-gold"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs text-sv-muted/50 mt-3">
                  Analyzing {url || "your website"}...
                </p>
              </div>
            </motion.div>
          )}

          {state === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass rounded-2xl p-6 md:p-8 border border-gold/10">
                {/* Results header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-cream flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-gold" />
                      Audit Results
                    </h3>
                    <p className="text-sm text-sv-muted mt-1">
                      {url.startsWith("http") ? url : `https://${url}`}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="text-sm border-gold/20 text-gold hover:bg-gold/10 hover:border-gold/40 transition-all duration-300"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Audit Another Site
                  </Button>
                </div>

                {/* Overall Score + Category Grid */}
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start mb-8">
                  {/* Circular progress ring */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col items-center justify-center"
                  >
                    <CircularProgressRing value={SIMULATED_RESULT.overallScore} />
                    <p className="text-sm text-sv-muted mt-3 font-medium">Overall Score</p>
                  </motion.div>

                  {/* Category scores */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SIMULATED_RESULT.categories.map((cat, i) => (
                      <CategoryBar key={cat.label} category={cat} index={i} />
                    ))}
                  </div>
                </div>

                {/* Critical Issues + Quick Wins */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Critical Issues */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <div className="rounded-xl bg-red-500/5 border border-red-500/15 p-5">
                      <h4 className="text-sm font-bold text-red-400 flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-4 h-4" />
                        Critical Issues Found
                      </h4>
                      <ul className="space-y-3">
                        {SIMULATED_RESULT.criticalIssues.map((issue, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                            className="flex items-start gap-2.5"
                          >
                            <AlertTriangle
                              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                issue.severity === "high" ? "text-red-400" : "text-amber-400"
                              }`}
                            />
                            <span className="text-sm text-cream/80 leading-relaxed">
                              {issue.text}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Quick Wins */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-5">
                      <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-4">
                        <CheckCircle2 className="w-4 h-4" />
                        Quick Wins
                      </h4>
                      <ul className="space-y-3">
                        {SIMULATED_RESULT.quickWins.map((win, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 1.0 + i * 0.08 }}
                            className="flex items-start gap-2.5"
                          >
                            <CheckCircle2
                              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                win.impact === "high" ? "text-emerald-400" : "text-emerald-400/70"
                              }`}
                            />
                            <span className="text-sm text-cream/80 leading-relaxed">
                              {win.text}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="pt-6 border-t border-gold/10 space-y-3"
                >
                  <button
                    onClick={() => setReportModalOpen(true)}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold text-sv-bg font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
                  >
                    <FileText className="w-4 h-4" />
                    Get My Free PDF Report
                  </button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full py-5 text-sm font-semibold border-gold/20 text-gold hover:bg-gold/10 hover:border-gold/40 transition-all duration-300 h-auto"
                  >
                    <a href="#contact-form">
                      Get Your Detailed Growth Plan
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <p className="text-center text-sv-muted/50 text-xs">
                    Get a branded PDF of these results, or contact us for a comprehensive, in-depth analysis.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lead capture modal — generates PDF + emails it */}
      <LeadCaptureModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        toolName="Free SEO Audit"
        url={url.startsWith("http") ? url : url ? `https://${url}` : undefined}
        analysisData={{
          checks: SIMULATED_RESULT.categories.map((cat) => ({
            category: cat.label,
            name: `${cat.label} Score: ${cat.score}/100`,
            status: cat.status === "good" ? "pass" : cat.status === "warning" ? "warning" : "fail",
            description: `Status: ${cat.status}. Score: ${cat.score}/100.`,
          })),
          summary: `Free SEO Audit summary for ${url || "your website"}. Overall score: ${SIMULATED_RESULT.overallScore}/100.`,
          recommendations: [
            ...SIMULATED_RESULT.quickWins.map((w) => w.text),
            ...SIMULATED_RESULT.criticalIssues.map((i) => `Critical: ${i.text}`),
          ],
        }}
        scores={{ overall: SIMULATED_RESULT.overallScore }}
        subtitle="We'll email you a branded PDF of your audit — overall score, category breakdown, critical issues, and quick wins."
      />
    </section>
  );
}
